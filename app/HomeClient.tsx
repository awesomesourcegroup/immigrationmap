"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { translations, languages } from "@/lib/translations";
import { useLanguage } from "@/lib/languageContext";
import { useCompare } from "@/lib/compareContext";
import { TX } from "@/app/components/TX";
import { Flag } from "@/lib/flag";
import type { Country } from "@/lib/types";

function LangSwitcher() {
  const { lang, setLang } = useLanguage();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const currentLang = languages.find((l) => l.code === lang)!;

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((o) => !o)}
        className="tap flex items-center gap-1.5 text-sm font-semibold text-gray-400 hover:text-gray-900 transition-colors"
      >
        <span className="text-base leading-none">{currentLang.flag}</span>
        <span className="hidden sm:inline text-xs font-medium">{currentLang.nativeName}</span>
        <svg className="w-3 h-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-44 bg-white border border-gray-200 rounded-xl shadow-lg z-50 py-1 max-h-72 overflow-y-auto pop-in">
          {languages.map((l) => (
            <button
              key={l.code}
              onClick={() => { setLang(l.code); setOpen(false); }}
              className={`tap flex items-center gap-2.5 w-full px-3 py-2 text-sm text-left transition-colors ${
                lang === l.code
                  ? "bg-blue-50 text-blue-500 font-semibold"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              <span>{l.flag}</span>
              <span>{l.nativeName}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function HomeClient({ countries }: { countries: Country[] }) {
  const { lang } = useLanguage();
  const { toggle, isSelected, isFull } = useCompare();
  const t = translations[lang];
  const isRTL = lang === "ar";
  const [hasMatches, setHasMatches] = useState(false);

  useEffect(() => {
    setHasMatches(!!localStorage.getItem("quizProfile"));
  }, []);

  const byRegion = countries.reduce<Record<string, typeof countries>>(
    (acc, country) => {
      (acc[country.region] ??= []).push(country);
      return acc;
    },
    {}
  );

  return (
    <main className="min-h-screen bg-white pb-24" dir={isRTL ? "rtl" : "ltr"}>
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link
            href="/"
            className="tap inline-block text-sm font-semibold text-gray-900 hover:text-black transition-colors"
          >
            {t.backToQuiz}
          </Link>
          {hasMatches && (
            <Link
              href="/quiz/results"
              className="tap inline-block text-sm font-semibold text-[#FF4757] hover:text-[#E53E4F] transition-colors"
            >
              {t.myMatches}
            </Link>
          )}
          <LangSwitcher />
        </div>
      </div>

      {/* Page title */}
      <div className="max-w-5xl mx-auto px-6 pt-10 pb-6">
        <h1 className="text-4xl sm:text-5xl font-black text-[#0D0D0D] tracking-tight leading-tight mb-2">
          {t.browseHeadline}
        </h1>
        <p className="text-sm text-gray-400">{t.browseSubtitle}</p>
      </div>

      {/* Country grid */}
      <section className="max-w-5xl mx-auto px-6">
        {Object.entries(byRegion).map(([region, list]) => (
          <div key={region} className="mb-12">
            <h2 className="text-[11px] font-bold uppercase tracking-[0.14em] text-gray-400 mb-5 flex items-center gap-3">
              <span>{t.regions[region] ?? region}</span>
              <span className="flex-1 h-px bg-gray-100" />
              <span className="text-gray-300 font-normal">{list.length}</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
              {list.map((country) => {
                const sel = isSelected(country.id);
                return (
                  <div key={country.id} className="relative group">
                    <Link
                      href={`/${country.id}${lang !== "en" ? `?lang=${lang}` : ""}`}
                      className={`flex items-center gap-4 bg-white rounded-xl pl-4 pr-10 py-3.5 border-2 transition-all duration-200 active:scale-[0.98] ${
                        sel
                          ? "border-blue-300 shadow-md -translate-y-px"
                          : "border-gray-100 hover:border-[#FF4757]/25 hover:shadow-lg hover:-translate-y-0.5"
                      }`}
                    >
                      <Flag id={country.id} size="md" className="shadow-sm flex-shrink-0" />
                      <TX
                        className={`flex-1 text-sm font-semibold leading-snug ${
                          sel ? "text-blue-600" : "text-gray-800"
                        }`}
                      >
                        {country.name}
                      </TX>
                      <span className={`text-base flex-shrink-0 transition-all duration-200 ${
                        sel
                          ? "text-blue-300"
                          : "text-gray-200 group-hover:text-[#FF4757]/60 group-hover:translate-x-0.5"
                      }`}>›</span>
                    </Link>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        toggle({ id: country.id, name: country.name, flagEmoji: country.flagEmoji });
                      }}
                      disabled={!sel && isFull}
                      className={`absolute top-1/2 -translate-y-1/2 right-2.5 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold transition-all active:scale-90 ${
                        sel
                          ? "bg-blue-400 text-white opacity-100"
                          : isFull
                          ? "opacity-0 cursor-not-allowed"
                          : "bg-white border border-gray-200 text-gray-400 opacity-0 group-hover:opacity-100 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-500 shadow-sm"
                      }`}
                      title={sel ? t.compareRemove : t.compareAdd}
                    >
                      {sel ? "✓" : "+"}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}
