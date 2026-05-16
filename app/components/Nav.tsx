"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { languages } from "@/lib/translations";
import { useLanguage } from "@/lib/languageContext";

export default function Nav() {
  const { lang, setLang } = useLanguage();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const currentLang = languages.find((l) => l.code === lang)!;

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  function navLinkClass(href: string) {
    const active = pathname === href || (href !== "/" && pathname.startsWith(href));
    return `text-sm px-3 py-1.5 rounded-md transition-colors ${
      active
        ? "text-[#FF4757] bg-[#FFF0F1] font-semibold"
        : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
    }`;
  }

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-gray-100">
      <div className="max-w-5xl mx-auto px-6 h-14 flex items-center gap-4">
        <Link
          href="/"
          className="font-bold text-gray-900 text-sm tracking-tight shrink-0 hover:text-[#FF4757] transition-colors"
        >
          Pathway
        </Link>

        <nav className="flex items-center gap-0.5 flex-1">
          <Link href="/" className={navLinkClass("/")}>
            Browse
          </Link>
          <Link href="/quiz" className={navLinkClass("/quiz")}>
            Quiz
          </Link>
        </nav>

        <div className="relative" ref={ref}>
          <button
            onClick={() => setOpen((o) => !o)}
            className="tap flex items-center gap-1.5 px-2.5 py-1.5 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors"
          >
            <span className="text-base leading-none">{currentLang.flag}</span>
            <span className="hidden sm:inline text-xs font-medium">{currentLang.nativeName}</span>
            <svg className="w-3 h-3 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {open && (
            <div className="absolute right-0 mt-1 w-44 bg-white border border-gray-200 rounded-xl shadow-lg z-50 py-1 max-h-72 overflow-y-auto pop-in">
              {languages.map((l) => (
                <button
                  key={l.code}
                  onClick={() => { setLang(l.code); setOpen(false); }}
                  className={`flex items-center gap-2.5 w-full px-3 py-2 text-sm text-left transition-colors ${
                    lang === l.code
                      ? "bg-[#FFF0F1] text-[#FF4757] font-semibold"
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
      </div>
    </header>
  );
}
