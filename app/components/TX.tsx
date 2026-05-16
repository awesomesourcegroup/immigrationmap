"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "@/lib/languageContext";
import { type LanguageCode } from "@/lib/translations";

function hash(str: string): number {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = (Math.imul(31, h) + str.charCodeAt(i)) | 0;
  }
  return Math.abs(h);
}

export async function fetchTranslation(text: string, lang: LanguageCode): Promise<string> {
  if (!text || lang === "en") return text;
  const key = `t:${lang}:${hash(text)}`;
  try {
    const hit = localStorage.getItem(key);
    if (hit !== null) return hit;
  } catch {}
  try {
    const r = await fetch("/api/translate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text, targetLang: lang }),
    });
    const { translated } = await r.json();
    try { localStorage.setItem(key, translated); } catch {}
    return translated;
  } catch {
    return text;
  }
}

export function useTranslatedText(text: string): string {
  const { lang } = useLanguage();
  const [out, setOut] = useState(text);

  useEffect(() => {
    setOut(text);
    if (lang === "en") return;
    let alive = true;
    fetchTranslation(text, lang).then((t) => { if (alive) setOut(t); });
    return () => { alive = false; };
  }, [text, lang]);

  return out;
}

export function useTranslatedLines(
  text: string,
  splitFn: (t: string) => string[],
): string[] {
  const { lang } = useLanguage();
  const [lines, setLines] = useState(() => splitFn(text));

  useEffect(() => {
    setLines(splitFn(text));
    if (lang === "en") return;
    let alive = true;
    fetchTranslation(text, lang).then((t) => { if (alive) setLines(splitFn(t)); });
    return () => { alive = false; };
  }, [text, lang]);

  return lines;
}

// Inline translating span
export function TX({ children, className }: { children: string; className?: string }) {
  const out = useTranslatedText(children);
  return <span className={className}>{out}</span>;
}
