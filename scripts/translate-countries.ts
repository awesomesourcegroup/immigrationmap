#!/usr/bin/env npx tsx
/**
 * Pre-translate all country data into all supported languages using Google Translate.
 * Output: data/translations/{lang}/{countryId}.json
 *
 * Usage: npx tsx scripts/translate-countries.ts [lang] [countryId]
 */

import * as fs from "fs";
import * as path from "path";

const LANGUAGES = ["zh", "hi", "vi", "ar", "ru", "es", "ko", "ja", "pt", "fr", "tl", "bn"] as const;
type Lang = (typeof LANGUAGES)[number];

const GT_LANG: Record<Lang, string> = {
  zh: "zh-CN", hi: "hi", vi: "vi", ar: "ar", ru: "ru",
  es: "es", ko: "ko", ja: "ja", pt: "pt", fr: "fr", tl: "tl", bn: "bn",
};

const DATA_DIR = path.join(process.cwd(), "data");
const TRANS_DIR = path.join(DATA_DIR, "translations");

// ── Google Translate ──────────────────────────────────────────────────────────

async function gt(text: string, lang: Lang): Promise<string> {
  if (!text || text === "N/A") return text;
  const tl = GT_LANG[lang];
  const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${tl}&dt=t&q=${encodeURIComponent(text)}`;
  const res = await fetch(url, {
    headers: { "User-Agent": "Mozilla/5.0 (compatible; TranslationBot/1.0)" },
  });
  if (!res.ok) throw new Error(`GT ${res.status}`);
  const data = await res.json() as [[string, string][]];
  return data[0].map((seg) => seg[0]).join("");
}

async function gtWithRetry(text: string, lang: Lang, retries = 3): Promise<string> {
  for (let i = 1; i <= retries; i++) {
    try {
      return await gt(text, lang);
    } catch (err) {
      if (i === retries) return text; // fallback to original
      await new Promise((r) => setTimeout(r, 500 * i));
    }
  }
  return text;
}

// Translate an array of strings, throttled to avoid rate limits
async function translateArray(items: string[], lang: Lang): Promise<string[]> {
  const results: string[] = [];
  for (const item of items) {
    results.push(await gtWithRetry(item, lang));
    await new Promise((r) => setTimeout(r, 50));
  }
  return results;
}

// ── Types ─────────────────────────────────────────────────────────────────────

type TranslatableRoute = { name: string; description: string; estimatedDuration: string };
type TranslatablePath = { officialName: string; criteria: string[]; routes: TranslatableRoute[] };
type TranslatableVisaDetail = {
  fullName: string; description: string;
  timelineToPR: string; timelineToCitizenship: string; probabilityNote: string;
};
type Translation = {
  name: string;
  permanentResidence: TranslatablePath;
  citizenship: TranslatablePath;
  visaDetails: Record<string, TranslatableVisaDetail>;
};

// ── Translation logic ─────────────────────────────────────────────────────────

async function translatePath(p: TranslatablePath, lang: Lang): Promise<TranslatablePath> {
  const routes: TranslatableRoute[] = [];
  for (const r of p.routes) {
    routes.push({
      name: await gtWithRetry(r.name, lang),
      description: await gtWithRetry(r.description, lang),
      estimatedDuration: await gtWithRetry(r.estimatedDuration, lang),
    });
    await new Promise((r) => setTimeout(r, 50));
  }
  return {
    officialName: await gtWithRetry(p.officialName, lang),
    criteria: await translateArray(p.criteria, lang),
    routes,
  };
}

async function translateVisaDetail(d: TranslatableVisaDetail, lang: Lang): Promise<TranslatableVisaDetail> {
  return {
    fullName: await gtWithRetry(d.fullName, lang),
    description: await gtWithRetry(d.description, lang),
    timelineToPR: await gtWithRetry(d.timelineToPR, lang),
    timelineToCitizenship: await gtWithRetry(d.timelineToCitizenship, lang),
    probabilityNote: await gtWithRetry(d.probabilityNote, lang),
  };
}

async function translateCountryData(country: Record<string, unknown>, lang: Lang): Promise<Translation> {
  const pr = country.permanentResidence as TranslatablePath;
  const cit = country.citizenship as TranslatablePath;
  const rawVisa = country.visaDetails as Record<string, Record<string, unknown>>;

  const visaDetailsInput: Record<string, TranslatableVisaDetail> = Object.fromEntries(
    Object.entries(rawVisa).map(([k, v]) => [k, {
      fullName: v.fullName as string,
      description: v.description as string,
      timelineToPR: v.timelineToPR as string,
      timelineToCitizenship: v.timelineToCitizenship as string,
      probabilityNote: v.probabilityNote as string,
    }])
  );

  const name = await gtWithRetry(country.name as string, lang);
  const prResult = await translatePath(pr, lang);
  const citResult = await translatePath(cit, lang);

  const visaResult: Record<string, TranslatableVisaDetail> = {};
  for (const [code, detail] of Object.entries(visaDetailsInput)) {
    visaResult[code] = await translateVisaDetail(detail, lang);
    await new Promise((r) => setTimeout(r, 50));
  }

  return { name, permanentResidence: prResult, citizenship: citResult, visaDetails: visaResult };
}

// ── File I/O ──────────────────────────────────────────────────────────────────

function outPath(lang: Lang, countryId: string) {
  return path.join(TRANS_DIR, lang, `${countryId}.json`);
}

function alreadyDone(lang: Lang, countryId: string) {
  return fs.existsSync(outPath(lang, countryId));
}

function save(lang: Lang, countryId: string, data: Translation) {
  fs.mkdirSync(path.join(TRANS_DIR, lang), { recursive: true });
  fs.writeFileSync(outPath(lang, countryId), JSON.stringify(data, null, 2));
}

// ── Main ──────────────────────────────────────────────────────────────────────

async function main() {
  const args = process.argv.slice(2);
  const targetLang = args[0] as Lang | undefined;
  const targetCountry = args[1];

  const raw = JSON.parse(fs.readFileSync(path.join(DATA_DIR, "countries.json"), "utf-8"));
  const countries: Array<Record<string, unknown>> = raw.countries;

  const langs = targetLang ? [targetLang] : [...LANGUAGES];
  const toProcess = targetCountry ? countries.filter((c) => c.id === targetCountry) : countries;

  console.log(`Translating ${toProcess.length} countries × ${langs.length} languages\n`);

  for (const lang of langs) {
    console.log(`\n── ${lang} ──`);
    for (const country of toProcess) {
      const id = country.id as string;
      if (alreadyDone(lang, id)) {
        process.stdout.write(`  ✓ ${id} (cached)\n`);
        continue;
      }
      try {
        const translated = await translateCountryData(country, lang);
        save(lang, id, translated);
        process.stdout.write(`  ✓ ${id}\n`);
      } catch (err) {
        process.stderr.write(`  ✗ ${id}: ${(err as Error).message}\n`);
      }
    }
  }

  console.log("\n✅ Done!");
}

main().catch((err) => { console.error(err); process.exit(1); });
