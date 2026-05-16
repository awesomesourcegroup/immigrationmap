"use client";

import { useState, useEffect, useLayoutEffect } from "react";
import { useLanguage } from "@/lib/languageContext";
import { type LanguageCode } from "@/lib/translations";

// useLayoutEffect on client (runs before paint), useEffect on server (avoids SSR warning)
const useClientLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

function hash(str: string): number {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = (Math.imul(31, h) + str.charCodeAt(i)) | 0;
  }
  return Math.abs(h);
}

function getCached(text: string, lang: LanguageCode): string | null {
  try {
    return localStorage.getItem(`t:${lang}:${hash(text)}`);
  } catch {
    return null;
  }
}

// Serialize requests through a queue to avoid rate-limiting on the translate API
const queue: Array<() => Promise<void>> = [];
let processing = false;

async function runQueue() {
  if (processing) return;
  processing = true;
  while (queue.length > 0) {
    const task = queue.shift()!;
    await task();
    if (queue.length > 0) await new Promise(r => setTimeout(r, 80));
  }
  processing = false;
}

function enqueue<T>(fn: () => Promise<T>): Promise<T> {
  return new Promise((resolve, reject) => {
    queue.push(async () => {
      try { resolve(await fn()); } catch (e) { reject(e); }
    });
    runQueue();
  });
}

// Deduplicate concurrent requests for the same text+lang
const inFlight = new Map<string, Promise<string>>();

export async function fetchTranslation(text: string, lang: LanguageCode): Promise<string> {
  if (!text || lang === "en") return text;
  const key = `t:${lang}:${hash(text)}`;
  const hit = getCached(text, lang);
  if (hit !== null) return hit;

  const existing = inFlight.get(key);
  if (existing) return existing;

  const promise = enqueue(async () => {
    // Re-check cache in case a parallel request already populated it
    const hit2 = getCached(text, lang);
    if (hit2 !== null) return hit2;
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
  }).finally(() => { inFlight.delete(key); });

  inFlight.set(key, promise);
  return promise;
}

export function useTranslatedText(text: string): string {
  const { lang } = useLanguage();
  const [out, setOut] = useState(text);

  // Read from cache synchronously before the browser paints — eliminates flash for cached translations
  useClientLayoutEffect(() => {
    if (lang === "en" || !text) { setOut(text); return; }
    const cached = getCached(text, lang);
    setOut(cached ?? text);
  }, [text, lang]);

  // Fetch from API only when not cached
  useEffect(() => {
    if (lang === "en" || !text) return;
    if (getCached(text, lang) !== null) return;
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

  // Read from cache synchronously before the browser paints
  useClientLayoutEffect(() => {
    if (lang === "en" || !text) { setLines(splitFn(text)); return; }
    const cached = getCached(text, lang);
    setLines(splitFn(cached ?? text));
  }, [text, lang]);

  // Fetch from API only when not cached
  useEffect(() => {
    if (lang === "en" || !text) return;
    if (getCached(text, lang) !== null) return;
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
