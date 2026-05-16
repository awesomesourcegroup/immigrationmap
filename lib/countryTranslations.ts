import * as fs from "fs";
import * as path from "path";
import type { Country } from "@/lib/types";
import type { LanguageCode } from "@/lib/translations";

const TRANS_DIR = path.join(process.cwd(), "data", "translations");

type TranslatableRoute = {
  name: string;
  description: string;
  estimatedDuration: string;
};

type TranslatablePath = {
  officialName: string;
  criteria: string[];
  routes: TranslatableRoute[];
};

type TranslatableVisaDetail = {
  fullName: string;
  description: string;
  timelineToPR: string;
  timelineToCitizenship: string;
  probabilityNote: string;
};

type Translation = {
  name: string;
  permanentResidence: TranslatablePath;
  citizenship: TranslatablePath;
  visaDetails: Record<string, TranslatableVisaDetail>;
};

function loadTranslation(countryId: string, lang: LanguageCode): Translation | null {
  if (lang === "en") return null;
  try {
    const filePath = path.join(TRANS_DIR, lang, `${countryId}.json`);
    const raw = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(raw) as Translation;
  } catch {
    return null;
  }
}

/** Returns a country with text fields replaced by the pre-translated version, or the original if no translation exists. */
export function getTranslatedCountry(country: Country, lang: LanguageCode): Country {
  const t = loadTranslation(country.id, lang);
  if (!t) return country;

  return {
    ...country,
    name: t.name ?? country.name,
    permanentResidence: {
      ...country.permanentResidence,
      officialName: t.permanentResidence?.officialName ?? country.permanentResidence.officialName,
      criteria: t.permanentResidence?.criteria ?? country.permanentResidence.criteria,
      routes: country.permanentResidence.routes.map((route, i) => ({
        ...route,
        name: t.permanentResidence?.routes?.[i]?.name ?? route.name,
        description: t.permanentResidence?.routes?.[i]?.description ?? route.description,
        estimatedDuration: t.permanentResidence?.routes?.[i]?.estimatedDuration ?? route.estimatedDuration,
      })),
    },
    citizenship: {
      ...country.citizenship,
      officialName: t.citizenship?.officialName ?? country.citizenship.officialName,
      criteria: t.citizenship?.criteria ?? country.citizenship.criteria,
      routes: country.citizenship.routes.map((route, i) => ({
        ...route,
        name: t.citizenship?.routes?.[i]?.name ?? route.name,
        description: t.citizenship?.routes?.[i]?.description ?? route.description,
        estimatedDuration: t.citizenship?.routes?.[i]?.estimatedDuration ?? route.estimatedDuration,
      })),
    },
    visaDetails: Object.fromEntries(
      Object.entries(country.visaDetails).map(([code, detail]) => [
        code,
        {
          ...detail,
          fullName: t.visaDetails?.[code]?.fullName ?? detail.fullName,
          description: t.visaDetails?.[code]?.description ?? detail.description,
          timelineToPR: t.visaDetails?.[code]?.timelineToPR ?? detail.timelineToPR,
          timelineToCitizenship: t.visaDetails?.[code]?.timelineToCitizenship ?? detail.timelineToCitizenship,
          probabilityNote: t.visaDetails?.[code]?.probabilityNote ?? detail.probabilityNote,
        },
      ])
    ),
  };
}

export function hasTranslation(countryId: string, lang: LanguageCode): boolean {
  if (lang === "en") return true;
  try {
    fs.accessSync(path.join(TRANS_DIR, lang, `${countryId}.json`));
    return true;
  } catch {
    return false;
  }
}
