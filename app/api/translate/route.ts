import { type NextRequest } from "next/server";
import { type LanguageCode } from "@/lib/translations";

const GT_LANG: Record<LanguageCode, string> = {
  en: "en", zh: "zh-CN", hi: "hi", vi: "vi", ar: "ar",
  ru: "ru", es: "es", ko: "ko", ja: "ja", pt: "pt",
  fr: "fr", tl: "tl", bn: "bn",
};

export async function POST(req: NextRequest) {
  let text = "";
  let targetLang: LanguageCode = "en";
  try {
    const body = await req.json();
    text = body.text ?? "";
    targetLang = body.targetLang ?? "en";

    if (!text || targetLang === "en") return Response.json({ translated: text });

    const tl = GT_LANG[targetLang] ?? targetLang;
    const url =
      `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${tl}&dt=t&q=${encodeURIComponent(text)}`;

    const res = await fetch(url, {
      headers: { "User-Agent": "Mozilla/5.0 (compatible; TranslationProxy/1.0)" },
      next: { revalidate: 86400 },
    });

    if (!res.ok) throw new Error(`GT ${res.status}`);

    const data = await res.json();
    // data[0] is array of [translatedSegment, originalSegment, ...]
    const translated = (data[0] as [string, string][]).map((seg) => seg[0]).join("");
    return Response.json({ translated });
  } catch {
    return Response.json({ translated: text });
  }
}
