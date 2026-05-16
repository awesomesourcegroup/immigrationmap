"use client";

import { useRouter } from "next/navigation";
import { useCompare } from "@/lib/compareContext";
import { useLanguage } from "@/lib/languageContext";
import { translations } from "@/lib/translations";

export default function CompareBar() {
  const { selected, clear, isFull } = useCompare();
  const { lang } = useLanguage();
  const t = translations[lang];
  const router = useRouter();

  if (selected.length === 0) return null;

  const label = t.compareBar.replace("{n}", String(selected.length));

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 flex justify-center px-4 pb-4 pointer-events-none">
      <div className="flex items-center gap-3 bg-gray-900 text-white px-5 py-3.5 rounded-2xl shadow-2xl pointer-events-auto max-w-sm w-full">
        <div className="flex gap-1.5 flex-1">
          {[0, 1, 2].map((i) => {
            const item = selected[i];
            return (
              <div
                key={i}
                className={`flex-1 h-9 rounded-lg flex items-center justify-center text-xl transition-all ${
                  item ? "bg-white/15" : "bg-white/5 border border-white/10"
                }`}
              >
                {item ? item.flagEmoji : <span className="text-white/20 text-sm">+</span>}
              </div>
            );
          })}
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-sm font-medium text-white/70">{label}</span>
          {selected.length >= 2 && (
            <button
              onClick={() => router.push(`/compare?ids=${selected.map(x => x.id).join(",")}`)}
              className="px-3 py-1.5 bg-white text-gray-900 font-bold text-sm rounded-lg hover:bg-gray-100 active:bg-gray-200 transition-colors"
            >
              {t.compareNow}
            </button>
          )}
          <button
            onClick={clear}
            className="px-2 py-1.5 text-white/50 hover:text-white text-sm transition-colors"
          >
            {t.compareClear}
          </button>
        </div>
      </div>
    </div>
  );
}
