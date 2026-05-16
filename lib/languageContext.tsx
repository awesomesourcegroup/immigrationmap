"use client";

import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { type LanguageCode } from "./translations";

interface LangCtx {
  lang: LanguageCode;
  setLang: (l: LanguageCode) => void;
}

const Ctx = createContext<LangCtx>({ lang: "en", setLang: () => {} });

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<LanguageCode>("en");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("lang") as LanguageCode | null;
      if (saved) setLangState(saved);
    } catch {}
  }, []);

  function setLang(l: LanguageCode) {
    setLangState(l);
    try { localStorage.setItem("lang", l); } catch {}
  }

  return <Ctx.Provider value={{ lang, setLang }}>{children}</Ctx.Provider>;
}

export function useLanguage() {
  return useContext(Ctx);
}
