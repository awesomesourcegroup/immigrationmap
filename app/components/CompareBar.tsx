"use client";

import { useRouter } from "next/navigation";
import { useCompare } from "@/lib/compareContext";
import { useLanguage } from "@/lib/languageContext";
import { translations } from "@/lib/translations";
import { useState, useEffect, useRef } from "react";

type CountryOption = { id: string; name: string; flagEmoji: string };

export default function CompareBar({ countries }: { countries: CountryOption[] }) {
  const { selected, toggle, clear, isFull } = useCompare();
  const { lang } = useLanguage();
  const t = translations[lang];
  const router = useRouter();

  const [searching, setSearching] = useState(false);
  const [query, setQuery] = useState("");
  const pickerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const available = countries.filter((c) => !selected.find((s) => s.id === c.id));
  const filtered = available.filter((c) =>
    c.name.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    if (!searching) return;
    inputRef.current?.focus();
    function handler(e: MouseEvent) {
      if (pickerRef.current && !pickerRef.current.contains(e.target as Node)) {
        setSearching(false);
        setQuery("");
      }
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [searching]);

  useEffect(() => {
    if (!searching) return;
    function handler(e: KeyboardEvent) {
      if (e.key === "Escape") { setSearching(false); setQuery(""); }
    }
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [searching]);

  if (selected.length === 0) return null;

  const label = t.compareBar.replace("{n}", String(selected.length));

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 flex justify-center px-3 pb-3 pointer-events-none">
      <div ref={pickerRef} className="relative flex items-center gap-2 bg-gray-950 text-white px-3 py-2.5 rounded-2xl shadow-2xl shadow-black/20 pointer-events-auto w-full max-w-sm border border-white/10">

        {/* Country picker dropdown */}
        {searching && (
          <div className="absolute bottom-full mb-2 left-0 right-0 bg-gray-950 border border-white/10 rounded-xl overflow-hidden shadow-2xl">
            <input
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search countries…"
              className="w-full px-4 py-3 bg-transparent text-white text-base placeholder-white/30 outline-none border-b border-white/10"
            />
            <div className="max-h-52 overflow-y-auto">
              {filtered.length === 0 ? (
                <p className="px-4 py-3 text-xs text-white/30">No results</p>
              ) : (
                filtered.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => {
                      toggle(c);
                      setSearching(false);
                      setQuery("");
                    }}
                    className="flex items-center gap-3 w-full px-4 py-2.5 hover:bg-white/10 transition-colors text-left"
                  >
                    <span className="text-xl leading-none">{c.flagEmoji}</span>
                    <span className="text-sm font-medium text-white">{c.name}</span>
                  </button>
                ))
              )}
            </div>
          </div>
        )}

        {/* Slots */}
        <div className="flex gap-1.5 flex-1">
          {[0, 1, 2].map((i) => {
            const item = selected[i];
            const isEmpty = !item;
            const canAdd = isEmpty && !isFull;
            return (
              <button
                key={i}
                disabled={!canAdd && isEmpty}
                onClick={() => canAdd && setSearching((v) => !v)}
                className={`flex-1 h-9 rounded-lg flex items-center justify-center text-xl transition-all ${
                  item
                    ? "bg-white/10"
                    : canAdd
                    ? "bg-white/5 border border-dashed border-white/20 hover:bg-white/10 hover:border-white/40 cursor-pointer"
                    : "bg-white/5 border border-dashed border-white/10"
                }`}
              >
                {item ? (
                  <span className="leading-none">{item.flagEmoji}</span>
                ) : (
                  <span className={`text-xs font-bold ${canAdd ? "text-white/40 hover:text-white/60" : "text-white/20"}`}>+</span>
                )}
              </button>
            );
          })}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1.5 shrink-0">
          <span className="hidden sm:inline text-xs font-medium text-white/50">{label}</span>
          {selected.length >= 2 && (
            <button
              onClick={() => router.push(`/compare?ids=${selected.map((x) => x.id).join(",")}`)}
              className="px-2.5 py-1.5 bg-[#FF4757] hover:bg-[#E53E4F] text-white font-bold text-xs rounded-lg transition-colors whitespace-nowrap"
            >
              {t.compareNow}
            </button>
          )}
          <button
            onClick={clear}
            className="px-1.5 py-1.5 text-white/40 hover:text-white/70 text-xs transition-colors"
          >
            {t.compareClear}
          </button>
        </div>
      </div>
    </div>
  );
}
