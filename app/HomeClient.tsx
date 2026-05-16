"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { languages, translations } from "@/lib/translations";
import { useLanguage } from "@/lib/languageContext";
import { TX } from "@/app/components/TX";
import type { Country } from "@/lib/types";

export default function HomeClient({ countries }: { countries: Country[] }) {
  const { lang, setLang } = useLanguage();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const t = translations[lang];
  const currentLang = languages.find((l) => l.code === lang)!;

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const byRegion = countries.reduce<Record<string, typeof countries>>(
    (acc, country) => {
      (acc[country.region] ??= []).push(country);
      return acc;
    },
    {}
  );

  const isRTL = lang === "ar";

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-12" dir={isRTL ? "rtl" : "ltr"}>
      <div className="max-w-4xl mx-auto">

        {/* Language selector */}
        <div className="flex justify-end mb-6" ref={dropdownRef}>
          <div className="relative inline-block">
            <button
              onClick={() => setOpen((o) => !o)}
              className="flex items-center gap-3 px-6 py-3 bg-white border border-gray-200 rounded-xl shadow-sm text-base font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <span className="text-xl">{currentLang.flag}</span>
              <span>{currentLang.nativeName}</span>
              <span className="text-gray-400 text-sm">▾</span>
            </button>
            {open && (
              <div className="absolute right-0 mt-2 w-52 bg-white border border-gray-200 rounded-xl shadow-lg z-50 py-1 max-h-80 overflow-y-auto">
                {languages.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => { setLang(l.code); setOpen(false); }}
                    className={`flex items-center gap-3 w-full px-4 py-2.5 text-sm text-left hover:bg-gray-50 transition-colors ${
                      lang === l.code ? "bg-blue-50 text-blue-600 font-semibold" : "text-gray-700"
                    }`}
                  >
                    <span className="text-lg">{l.flag}</span>
                    <span>{l.nativeName}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Quiz banner */}
        <a
          href="/quiz"
          className="flex items-center justify-center gap-3 w-full px-6 py-5 mb-8 rounded-2xl bg-orange-500 hover:bg-orange-600 active:bg-orange-700 transition-colors duration-150 text-white font-bold text-lg text-center shadow-md"
          style={{ touchAction: "manipulation" }}
        >
          <span className="flex flex-col items-center gap-1">
            <span className="text-2xl">🌍</span>
            <span>Which country can I immigrate to?</span>
            <span className="text-xl font-bold">Take the quiz →</span>
          </span>
        </a>

        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold text-gray-900 mb-3 leading-tight">
            {t.title}
          </h1>
          <p className="text-lg font-semibold text-gray-900 max-w-xl mx-auto">
            {t.subtitle}
          </p>
        </div>

        {Object.entries(byRegion).map(([region, list]) => (
          <section key={region} className="mb-12">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-4">
              {t.regions[region] ?? region}
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {list.map((country) => (
                <Link
                  key={country.id}
                  href={`/${country.id}`}
                  className="flex flex-col items-center justify-center gap-2 bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-blue-400 transition-all duration-150 cursor-pointer group"
                >
                  <span className="text-6xl">{country.flagEmoji}</span>
                  <TX className="text-sm font-medium text-gray-700 group-hover:text-blue-600 text-center">
                    {country.name}
                  </TX>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
