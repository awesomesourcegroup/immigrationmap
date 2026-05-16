"use client";

import React, { useState } from "react";
import Link from "next/link";
import type { Country, ImmigrationPath, Route, VisaDetail } from "@/lib/types";
import { useLanguage } from "@/lib/languageContext";
import { translations } from "@/lib/translations";
import { TX, useTranslatedText, useTranslatedLines, fetchTranslation } from "@/app/components/TX";

// ─── Route category ───────────────────────────────────────────────────────────

type RouteCategory = "student" | "employment" | "family" | "lottery" | "asylum" | "citizenship" | "investor" | "regional";

function getRouteCategory(name: string): RouteCategory {
  const n = name.toLowerCase();
  if (n.includes("student") || n.includes("study permit") || n.includes("f-1") || n.includes("pgwp")) return "student";
  if (n.includes("family") || n.includes("sponsor")) return "family";
  if (n.includes("lottery") || n.includes("diversity") || n.includes("dv ")) return "lottery";
  if (n.includes("refugee") || n.includes("asylee") || n.includes("asylum")) return "asylum";
  if (n.includes("naturali") || n.includes("citizenship") || n.includes("descent") || n.includes("born abroad")) return "citizenship";
  if (n.includes("start-up") || n.includes("startup") || n.includes("investor") || n.includes("entrepreneur")) return "investor";
  if (n.includes("provincial") || n.includes("pnp") || n.includes("atlantic") || n.includes("regional") || n.includes("aip")) return "regional";
  return "employment";
}

function getRouteEmoji(name: string, fallback: string): string {
  const n = name.toLowerCase();
  if (n.includes("marriage") || n.includes("spouse") || n.includes("3-year rule")) return "💍";
  if (n.includes("military") || n.includes("armed forces"))                        return "🎖️";
  if (n.includes("descent") || n.includes("born abroad"))                          return "🧬";
  if (n.includes("naturali") && (n.includes("5-year") || n.includes("general")))  return "📜";
  if (n.includes("naturali") && n.includes("3-year"))                              return "🏅";
  if (n.includes("naturali"))                                                       return "📜";
  if (n.includes("start-up") || n.includes("startup"))                             return "🚀";
  if (n.includes("atlantic") || n.includes("aip"))                                 return "🌊";
  if (n.includes("skilled worker") || n.includes("fsw"))                           return "🌍";
  if (n.includes("canadian experience") || n.includes("cec"))                      return "🏢";
  return fallback;
}

const CATEGORY_META: Record<RouteCategory, {
  emoji: string; pill: string; pillText: string; border: string; accent: string; accentText: string;
}> = {
  student:     { emoji: "🎓", pill: "bg-sky-100",     pillText: "text-sky-700",     border: "border-sky-200",    accent: "bg-sky-50",     accentText: "text-sky-600"     },
  employment:  { emoji: "💼", pill: "bg-indigo-100",  pillText: "text-indigo-700",  border: "border-indigo-200", accent: "bg-indigo-50",  accentText: "text-indigo-600"  },
  family:      { emoji: "👨‍👩‍👧", pill: "bg-rose-100",    pillText: "text-rose-700",    border: "border-rose-200",   accent: "bg-rose-50",    accentText: "text-rose-600"    },
  lottery:     { emoji: "🎲", pill: "bg-amber-100",   pillText: "text-amber-700",   border: "border-amber-200",  accent: "bg-amber-50",   accentText: "text-amber-600"   },
  asylum:      { emoji: "🕊️", pill: "bg-emerald-100", pillText: "text-emerald-700", border: "border-emerald-200",accent: "bg-emerald-50", accentText: "text-emerald-600" },
  citizenship: { emoji: "🛂", pill: "bg-yellow-100",  pillText: "text-yellow-700",  border: "border-yellow-200", accent: "bg-yellow-50",  accentText: "text-yellow-600"  },
  investor:    { emoji: "💰", pill: "bg-purple-100",  pillText: "text-purple-700",  border: "border-purple-200", accent: "bg-purple-50",  accentText: "text-purple-600"  },
  regional:    { emoji: "📍", pill: "bg-green-100",   pillText: "text-green-700",   border: "border-green-200",  accent: "bg-green-50",   accentText: "text-green-600"   },
};

// ─── Step helpers ─────────────────────────────────────────────────────────────

type StepStyle = { emoji: string; bg: string; ring: string; dot: string; text: string };

function getStepStyle(step: string): StepStyle {
  const s = step.toLowerCase();
  if (s.includes("citizen") || s.includes("oath") || s.includes("naturali") || s.includes("passport"))
    return { emoji: "🛂", bg: "bg-yellow-50",  ring: "ring-yellow-300", dot: "bg-gradient-to-b from-transparent via-yellow-400 to-transparent",  text: "text-yellow-700" };
  if (s.includes("green card") || s.includes("copr") || s.includes("receive pr") || (s.includes("permanent resident") && !s.includes("apply")))
    return { emoji: "🏠", bg: "bg-teal-50",    ring: "ring-teal-300",   dot: "bg-gradient-to-b from-transparent via-teal-400 to-transparent",    text: "text-teal-700"   };
  if (s.includes("lottery") || s.includes("random selec"))
    return { emoji: "🎲", bg: "bg-orange-50",  ring: "ring-orange-300", dot: "bg-gradient-to-b from-transparent via-orange-400 to-transparent",  text: "text-orange-700" };
  if (s.includes("study") || s.includes("graduate") || s.includes("degree") || s.includes("dli") || s.includes("university") || s.includes("college"))
    return { emoji: "🎓", bg: "bg-blue-50",    ring: "ring-blue-300",   dot: "bg-gradient-to-b from-transparent via-blue-400 to-transparent",    text: "text-blue-700"   };
  if (s.includes("opt") || s.includes("pgwp") || s.includes("work permit") || s.includes("open work"))
    return { emoji: "📄", bg: "bg-cyan-50",    ring: "ring-cyan-300",   dot: "bg-gradient-to-b from-transparent via-cyan-400 to-transparent",    text: "text-cyan-700"   };
  if (/\bperm\b/.test(s) || s.includes("labor cert") || s.includes("lmia"))
    return { emoji: "🏢", bg: "bg-indigo-50",  ring: "ring-indigo-300", dot: "bg-gradient-to-b from-transparent via-indigo-400 to-transparent",  text: "text-indigo-700" };
  if (s.includes("i-140") || s.includes("i-485") || s.includes("n-400") || s.includes("i-130") || s.includes("i-526") || s.includes("file") || s.includes("apply") || s.includes("submit") || s.includes("petition"))
    return { emoji: "📋", bg: "bg-violet-50",  ring: "ring-violet-300", dot: "bg-gradient-to-b from-transparent via-violet-400 to-transparent",  text: "text-violet-700" };
  if (s.includes("wait") || s.includes("priority date") || s.includes("backlog") || s.includes("queue"))
    return { emoji: "⏳", bg: "bg-amber-50",   ring: "ring-amber-300",  dot: "bg-gradient-to-b from-transparent via-amber-400 to-transparent",   text: "text-amber-700"  };
  if (s.includes("medical") || s.includes("health"))
    return { emoji: "🏥", bg: "bg-rose-50",    ring: "ring-rose-300",   dot: "bg-gradient-to-b from-transparent via-rose-400 to-transparent",    text: "text-rose-700"   };
  if (s.includes("background") || s.includes("check") || s.includes("security") || s.includes("biometric"))
    return { emoji: "🔍", bg: "bg-slate-50",   ring: "ring-slate-300",  dot: "bg-gradient-to-b from-transparent via-slate-400 to-transparent",   text: "text-slate-700"  };
  if (s.includes("interview"))
    return { emoji: "🤝", bg: "bg-sky-50",     ring: "ring-sky-300",    dot: "bg-gradient-to-b from-transparent via-sky-400 to-transparent",     text: "text-sky-700"    };
  if (s.includes("ita") || s.includes("invitation"))
    return { emoji: "✉️", bg: "bg-purple-50",  ring: "ring-purple-300", dot: "bg-gradient-to-b from-transparent via-purple-400 to-transparent",  text: "text-purple-700" };
  if (s.includes("land") || s.includes("enter") || s.includes("arrival") || s.includes("port of entry"))
    return { emoji: "✈️", bg: "bg-blue-50",    ring: "ring-blue-300",   dot: "bg-gradient-to-b from-transparent via-blue-400 to-transparent",    text: "text-blue-700"   };
  if (s.includes("employ") || s.includes("work") || s.includes("job") || s.includes("experience"))
    return { emoji: "💼", bg: "bg-emerald-50", ring: "ring-emerald-300",dot: "bg-gradient-to-b from-transparent via-emerald-400 to-transparent", text: "text-emerald-700"};
  if (s.includes("knowledge test") || s.includes("civics") || s.includes("test"))
    return { emoji: "📝", bg: "bg-pink-50",    ring: "ring-pink-300",   dot: "bg-gradient-to-b from-transparent via-pink-400 to-transparent",    text: "text-pink-700"   };
  return   { emoji: "📌", bg: "bg-gray-50",    ring: "ring-gray-300",   dot: "bg-gradient-to-b from-transparent via-gray-400 to-transparent",    text: "text-gray-600"   };
}

type StepContext = { duration?: string; keyFact?: string; difficulty: "low" | "medium" | "high" };

function getStepContext(step: string): StepContext {
  const s = step.toLowerCase();
  if (s.includes("h-1b") && (s.includes("lottery") || s.includes("win")))
    return { duration: "Registration: March · Results: April · Start: Oct", keyFact: "~23% selection rate (FY2025). U.S. master's holders get two chances — master's cap first, then regular cap.", difficulty: "high" };
  if (s.includes("stem opt"))
    return { duration: "24-month extension (36 months total with OPT)", keyFact: "Employer must be E-Verify enrolled and submit a training plan. Gives two extra H-1B lottery attempts.", difficulty: "low" };
  if (s.includes("opt") && !s.includes("stem"))
    return { duration: "12 months", keyFact: "Apply 90 days before graduation. USCIS processing takes 3–5 months — apply early. Your EAD must arrive before your start date.", difficulty: "low" };
  if (s.includes("pgwp"))
    return { duration: "Equal to program length, max 3 years", keyFact: "Apply within 180 days of final grades. Open permit — any employer, anywhere in Canada. Cannot be renewed after expiry.", difficulty: "low" };
  if (/\bperm\b/.test(s) || s.includes("labor certification"))
    return { duration: "6–18 months", keyFact: "Employer must advertise the job and prove no qualified U.S. workers applied. ~3% of cases get audited by the DOL, adding 6+ months.", difficulty: "high" };
  if (s.includes("lmia"))
    return { duration: "2–5 months processing", keyFact: "Employer pays ~$1,000 CAD per position. Some employers and occupations are LMIA-exempt (e.g., intra-company transferees, Free Trade Agreement workers).", difficulty: "medium" };
  if (s.includes("i-140"))
    return { duration: "6–12 months standard · 15 days premium ($2,805)", keyFact: "Approval locks in your priority date. Even if you change employers, an approved I-140 can preserve that date under AC21 portability.", difficulty: "medium" };
  if (s.includes("priority date") || s.includes("backlog") || s.includes("wait for"))
    return { duration: "Months to 50+ years depending on nationality", keyFact: "Track monthly USCIS Visa Bulletins. Indian/Chinese EB-2/EB-3 backlogs exceed 50 years. EB-1A and EB-2 NIW often have far shorter waits.", difficulty: "high" };
  if (s.includes("i-485") || s.includes("adjustment of status"))
    return { duration: "8–24 months", keyFact: "Filing I-485 gives you Advance Parole (travel doc) and an EAD (work for any employer). This is called 'portability' and is a major benefit.", difficulty: "medium" };
  if (s.includes("express entry") || s.includes("invitation to apply"))
    return { duration: "60 days to submit after receiving ITA", keyFact: "IRCC targets 6-month processing for Express Entry. A complete, accurate application is critical — misrepresentation causes permanent inadmissibility.", difficulty: "medium" };
  if (s.includes("medical"))
    return { duration: "1-day appointment · valid for 1 year", keyFact: "Use a USCIS Civil Surgeon (U.S.) or IRCC panel physician (Canada). Costs $200–$500. Some conditions are waivable.", difficulty: "low" };
  if (s.includes("biometric") || s.includes("background"))
    return { duration: "1–6 months", keyFact: "FBI fingerprints (U.S.) or RCMP check (Canada). If you've lived in multiple countries, all countries' records may be requested.", difficulty: "low" };
  if (s.includes("n-400"))
    return { duration: "8–24 months processing", keyFact: "Apply up to 90 days before your 5-year (or 3-year) PR anniversary. Interview tests both English and civics — 6 of 10 questions must be correct.", difficulty: "low" };
  if (s.includes("oath") || s.includes("ceremony"))
    return { duration: "Scheduled 1–6 months after interview approval", keyFact: "You are a citizen the moment you take the Oath. Bring your Green Card — it will be collected. Apply for a passport the same day.", difficulty: "low" };
  if (s.includes("green card") || s.includes("receive pr") || s.includes("pr card"))
    return { duration: "Card mailed 2–4 weeks after approval", keyFact: "Valid for 10 years (or 2 years if conditional). You can now work for any employer, sponsor immediate relatives, and travel freely.", difficulty: "low" };
  if (s.includes("graduate") || s.includes("graduation"))
    return { duration: "2–4 years of full-time study", keyFact: "Degree level matters significantly. A master's or PhD boosts CRS score (Canada) and opens EB-1/EB-2 paths (U.S.).", difficulty: "medium" };
  if (s.includes("knowledge test") || s.includes("civics test"))
    return { duration: "~30 minutes on test day", keyFact: "Canada: 20 questions from 'Discover Canada', 75% pass mark. U.S.: 10 questions from a 100-question bank, must answer 6 correctly.", difficulty: "low" };
  if (s.includes("provincial nomination") || s.includes("pnp") || (s.includes("province") && s.includes("nomin")))
    return { duration: "3–6 months for provincial decision", keyFact: "A provincial nomination through Express Entry adds 600 CRS points — virtually guaranteeing an ITA in the next federal draw.", difficulty: "medium" };
  if (s.includes("letter of support") || s.includes("incubator") || s.includes("venture capital") || s.includes("angel"))
    return { duration: "Highly variable — months to years to secure", keyFact: "This is the hardest step. Most incubators accept <5% of applicants. Your business must be innovative, scalable, and incorporated in Canada.", difficulty: "high" };
  return { difficulty: "medium" };
}

// ─── PathwayFlow ──────────────────────────────────────────────────────────────

function PathwayFlow({ path, label, labelColor }: { path: string; label: string; labelColor: string }) {
  const { lang } = useLanguage();
  const [displayPath, setDisplayPath] = useState(path);

  React.useEffect(() => {
    setDisplayPath(path);
    if (lang === "en") return;
    let alive = true;
    fetchTranslation(path, lang).then((t) => { if (alive) setDisplayPath(t); });
    return () => { alive = false; };
  }, [path, lang]);

  if (!path || path.startsWith("N/A")) return null;
  const origSteps = path.split(" → ").map((s) => s.trim()).filter(Boolean);
  const dispSteps = displayPath.split(" → ").map((s) => s.trim()).filter(Boolean);
  if (origSteps.length < 2) return null;

  return (
    <div>
      <p className={`text-base font-bold uppercase tracking-wider mb-4 ${labelColor}`}>{label}</p>
      <div className="pl-1">
        {origSteps.map((step, i) => (
          <StepNode key={i} step={step} displayStep={dispSteps[i] ?? step} index={i} isLast={i === origSteps.length - 1} />
        ))}
      </div>
    </div>
  );
}

function StepNode({ step, displayStep, index, isLast }: { step: string; displayStep: string; index: number; isLast: boolean }) {
  const [open, setOpen] = useState(false);
  const { lang } = useLanguage();
  const t = translations[lang];
  const style = getStepStyle(step);
  const ctx = getStepContext(step);
  const diffLabel = { low: t.simple, medium: t.moderate, high: t.complex }[ctx.difficulty];
  const diffDots  = { low: "●○○", medium: "●●○", high: "●●●" }[ctx.difficulty];
  const diffColor = { low: "text-emerald-600", medium: "text-amber-600", high: "text-red-600" }[ctx.difficulty];

  return (
    <div className="flex gap-3">
      <div className="flex flex-col items-center flex-shrink-0 w-11">
        <button
          onClick={() => setOpen((v) => !v)}
          className={`w-11 h-11 rounded-full flex items-center justify-center text-xl ring-2 ${style.bg} ${style.ring} shadow-sm hover:scale-110 active:scale-95 transition-transform duration-150 z-10 relative select-none`}
        >
          {style.emoji}
        </button>
        {!isLast && (
          <div className="relative w-0.5 flex-1 min-h-8 bg-gray-200 my-1 rounded-full overflow-hidden">
            <div className={`flow-dot ${style.dot}`} />
          </div>
        )}
      </div>
      <div className="flex-1 min-w-0 pb-4">
        <button onClick={() => setOpen((v) => !v)} className="text-left w-full group mt-2">
          <div className="flex items-center gap-2 mb-0.5">
            <span className={`text-[10px] font-bold uppercase tracking-wider ${style.text}`}>{t.stepLabel} {index + 1}</span>
            <span className={`text-[10px] transition-colors ${open ? style.text : "text-gray-400"}`}>{open ? t.hide : t.info}</span>
          </div>
          <p className="text-sm font-medium text-gray-800 leading-snug group-hover:text-gray-950 transition-colors">{displayStep}</p>
        </button>
        {open && (
          <div className={`pop-in mt-2 rounded-xl p-3 space-y-2 ${style.bg} ring-1 ${style.ring}`}>
            {ctx.duration && (
              <div className="flex gap-2 text-xs">
                <span className="text-base leading-none flex-shrink-0">⏱️</span>
                <p className="text-gray-700"><span className="font-semibold text-gray-900">{t.durationLabel} </span><TX>{ctx.duration}</TX></p>
              </div>
            )}
            {ctx.keyFact && (
              <div className="flex gap-2 text-xs">
                <span className="text-base leading-none flex-shrink-0">💡</span>
                <p className="text-gray-700"><span className="font-semibold text-gray-900">{t.keyFactLabel} </span><TX>{ctx.keyFact}</TX></p>
              </div>
            )}
            <div className="flex gap-2 text-xs items-center pt-1.5 border-t border-black/5">
              <span className="text-base leading-none flex-shrink-0">⚡</span>
              <span className={`font-bold ${diffColor}`}>{diffDots}</span>
              <span className={`font-semibold ${diffColor}`}>{diffLabel}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Probability bar ──────────────────────────────────────────────────────────

function ProbabilityBar({ label, value }: { label: string; value: number }) {
  const { lang } = useLanguage();
  const t = translations[lang];

  if (value === -1)
    return (
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">{label}</p>
        <p className="text-sm text-gray-400 italic">{t.notApplicable}</p>
      </div>
    );
  const { bar, text, badge } =
    value >= 80 ? { bar: "bg-green-500", text: "text-green-700", badge: t.high     } :
    value >= 60 ? { bar: "bg-blue-500",  text: "text-blue-700",  badge: t.good     } :
    value >= 35 ? { bar: "bg-amber-400", text: "text-amber-700", badge: t.moderate } :
                  { bar: "bg-red-500",   text: "text-red-700",   badge: t.low      };
  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">{label}</p>
        <span className={`text-sm font-bold ${text}`}>{value}% <span className="font-normal text-xs">({badge})</span></span>
      </div>
      <div className="h-2.5 w-full bg-gray-100 rounded-full overflow-hidden">
        <div className={`h-full rounded-full transition-all duration-500 ${bar}`} style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}

// ─── Timeline helpers ─────────────────────────────────────────────────────────

function splitDescription(text: string): string[] {
  const raw = text.split(/\.\s+(?=[A-Z])/).map((s) => s.trim());
  const merged: string[] = [];
  for (const part of raw) {
    const last = merged[merged.length - 1];
    if (last && /[A-Z]$/.test(last)) {
      merged[merged.length - 1] = last + ". " + part;
    } else {
      merged.push(part);
    }
  }
  return merged
    .flatMap((s) => s.split(/;\s+/))
    .map((s) => s.replace(/\.+$/, "").trim())
    .filter(Boolean);
}

function splitDuration(text: string): string[] {
  const colonMatch = text.match(/^(.+?):\s+([\s\S]+)$/);
  if (colonMatch) {
    const summary = colonMatch[1].trim();
    const breakdown = colonMatch[2].split(" + ").map((s) => s.trim());
    return [summary, ...breakdown].filter(Boolean);
  }
  return text
    .split(/;\s*|\.\s+(?=[A-Z])/)
    .map((s) => s.trim().replace(/\.+$/, ""))
    .filter(Boolean);
}

function splitTimeline(text: string): string[] {
  return text
    .split(/;\s*|\.\s+(?=[A-Z])/)
    .map((s) => s.trim().replace(/\.+$/, ""))
    .filter(Boolean);
}

// ─── Visa modal ───────────────────────────────────────────────────────────────

function VisaModal({ code, detail, onClose }: { code: string; detail: VisaDetail; onClose: () => void }) {
  const { lang } = useLanguage();
  const t = translations[lang];
  const naPR = detail.pathToPR.startsWith("N/A");

  const descLines    = useTranslatedLines(detail.description, splitDescription);
  const prTimeLines  = useTranslatedLines(detail.timelineToPR, splitTimeline);
  const citTimeLines = useTranslatedLines(detail.timelineToCitizenship, splitTimeline);
  const noteLines    = useTranslatedLines(detail.probabilityNote, splitTimeline);
  const fullName     = useTranslatedText(detail.fullName);

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/40 backdrop-blur-sm p-4 sm:p-8 overflow-y-auto"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl my-auto">
        <div className="flex items-start justify-between gap-4 px-6 pt-6 pb-4 border-b border-gray-100">
          <div>
            <span className="inline-block px-2.5 py-0.5 text-xs font-bold bg-blue-100 text-blue-700 rounded-full mb-2">{code}</span>
            <h2 className="text-xl font-bold text-gray-900 leading-tight">{fullName}</h2>
          </div>
          <button onClick={onClose} className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-700 transition-colors text-xl">×</button>
        </div>
        <div className="px-6 py-5 space-y-7">
          <div className="space-y-3">
            <h3 className="text-xl font-bold text-gray-900">{t.statisticalProb}</h3>
            <ProbabilityBar label={t.chancePR} value={detail.probabilityToPR} />
            <ProbabilityBar label={t.chanceCit} value={detail.probabilityToCitizenship} />
          </div>
          <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
            <p className="text-base font-bold uppercase tracking-wider text-blue-600 mb-2">{t.overview}</p>
            <ul className="space-y-2">
              {descLines.map((line, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                  <span className="text-sm text-gray-700 leading-snug">{line}</span>
                </li>
              ))}
            </ul>
          </div>
          {!naPR && (
            <>
              <PathwayFlow path={detail.pathToPR} label={t.pathToPR} labelColor="text-blue-600" />
              {detail.timelineToPR !== "N/A" && (
                <div className="bg-amber-50 border border-amber-100 rounded-xl p-4">
                  <p className="text-base font-bold uppercase tracking-wider text-amber-600 mb-2">{t.totalTimePR}</p>
                  <ul className="space-y-2">
                    {prTimeLines.map((line, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-amber-400 flex-shrink-0" />
                        <span className="text-sm text-gray-800 leading-snug">{line}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </>
          )}
          <PathwayFlow path={detail.pathToCitizenship} label={t.pathToCit} labelColor="text-purple-600" />
          <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-4">
            <p className="text-base font-bold uppercase tracking-wider text-indigo-600 mb-2">{t.totalTimeCit}</p>
            <ul className="space-y-2">
              {citTimeLines.map((line, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-indigo-400 flex-shrink-0" />
                  <span className="text-sm text-gray-800 leading-snug">{line}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-4">
            <p className="text-base font-bold text-gray-500 uppercase tracking-wider mb-3">{t.dataMethodology}</p>
            <ul className="space-y-2">
              {noteLines.map((line, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gray-400 flex-shrink-0" />
                  <span className="text-xs text-gray-600 leading-snug">{line}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="px-6 pb-6">
          <button onClick={onClose} className="w-full py-2.5 rounded-xl bg-gray-900 text-white text-sm font-medium hover:bg-gray-700 transition-colors">{t.close}</button>
        </div>
      </div>
    </div>
  );
}

// ─── Route card ───────────────────────────────────────────────────────────────

function RouteCard({ route, visaDetails, onVisaClick }: {
  route: Route;
  visaDetails: Record<string, VisaDetail>;
  onVisaClick: (code: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const { lang } = useLanguage();
  const t = translations[lang];
  const category = getRouteCategory(route.name);
  const meta = CATEGORY_META[category];

  const routeName     = useTranslatedText(route.name);
  const descLines     = useTranslatedLines(route.description, splitDescription);
  const durationLines = useTranslatedLines(route.estimatedDuration, splitDuration);

  return (
    <div className={`rounded-2xl overflow-hidden border-2 ${meta.border} ${meta.pill} shadow-sm hover:shadow-md transition-shadow duration-200`}>
      <button onClick={() => setOpen((v) => !v)} className="w-full block relative focus:outline-none group">
        <div className={`h-36 w-full flex items-center justify-center ${meta.pill}`}>
          <span className="text-7xl">{getRouteEmoji(route.name, meta.emoji)}</span>
          <span className={`absolute top-3 right-3 w-7 h-7 rounded-full border-2 ${meta.border} flex items-center justify-center font-bold text-base ${meta.pillText} bg-white/60`}>
            {open ? "−" : "+"}
          </span>
        </div>
        <div className={`w-full px-5 py-3 flex items-center justify-center gap-3 border-t ${meta.border}`}>
          <span className={`font-bold text-base leading-snug text-center ${meta.pillText}`}>{routeName}</span>
        </div>
      </button>

      {open && (
        <div className="px-5 pt-5 pb-6 space-y-4">
          <p className={`text-[11px] font-semibold uppercase tracking-wider text-center ${meta.accentText}`}>{t.visaTypesExplore}</p>
          <div className="space-y-2">
            {route.visaTypes.map((v, i) =>
              visaDetails[v] ? (
                <button key={i} onClick={() => onVisaClick(v)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border-2 ${meta.border} bg-white/70 hover:bg-white hover:shadow-md hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-150 shadow-sm group cursor-pointer`}>
                  <span className={`w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center text-sm font-bold ${meta.pill} ${meta.pillText}`}>ⓘ</span>
                  <span className={`flex-1 text-center text-sm font-semibold ${meta.pillText}`}>{v}</span>
                  <span className={`text-base font-bold ${meta.pillText} opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all`}>›</span>
                </button>
              ) : (
                <div key={i} className="flex items-center gap-3 px-4 py-3 rounded-xl border-2 border-black/10 bg-white/40">
                  <span className="w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center text-sm font-bold bg-black/10 text-gray-500">i</span>
                  <span className="flex-1 text-center text-sm font-medium text-gray-500">{v}</span>
                </div>
              )
            )}
          </div>
          <div className="bg-white/50 border border-black/10 rounded-xl p-4">
            <p className={`text-xs font-semibold uppercase tracking-wider ${meta.accentText} mb-2 text-center`}>{t.aboutRoute}</p>
            <ul className="space-y-1.5">
              {descLines.map((line, i) => (
                <li key={i} className={`text-sm leading-relaxed ${meta.pillText} opacity-80`}>{line}</li>
              ))}
            </ul>
          </div>
          <div className="bg-white/50 border border-black/10 rounded-xl p-4">
            <p className={`text-xs font-semibold uppercase tracking-wider ${meta.accentText} mb-2 text-center`}>{t.estimatedDuration}</p>
            <ul className="space-y-1.5">
              {durationLines.map((line, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className={`mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 opacity-50 ${meta.pill} border ${meta.border}`} />
                  <span className={`text-sm ${meta.pillText} leading-snug`}>{line}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Path selector button ─────────────────────────────────────────────────────

function PathButton({ label, icon, description, active, onClick }: {
  label: string; icon: string; description: string; active: boolean; onClick: () => void;
}) {
  return (
    <button onClick={onClick}
      className={`flex-1 text-left px-6 py-5 rounded-2xl border-2 transition-all duration-150 ${
        active ? "border-blue-500 bg-blue-50 shadow-sm" : "border-gray-200 bg-white hover:border-blue-300 hover:shadow-sm"
      }`}>
      <span className="text-3xl block mb-2">{icon}</span>
      <p className={`font-semibold text-base ${active ? "text-blue-700" : "text-gray-800"}`}>{label}</p>
      <p className="text-xs text-gray-500 mt-0.5">{description}</p>
    </button>
  );
}

// ─── Country hero ─────────────────────────────────────────────────────────────

function getCountryGradient(id: string): [string, string, string] {
  const map: Record<string, [string, string, string]> = {
    usa:              ["#EEF2FF", "#FEE2E2", "#DBEAFE"],
    canada:           ["#FFF1F2", "#FFF7F7", "#FFE4E6"],
    australia:        ["#FFF7ED", "#FEF3C7", "#ECFDF5"],
    "new-zealand":    ["#EFF6FF", "#FFF1F2", "#EEF2FF"],
    uk:               ["#EFF6FF", "#F0F9FF", "#FFF1F2"],
    japan:            ["#FFF5F5", "#FFF1F2", "#FEF2F2"],
    singapore:        ["#FFF1F2", "#F0FDF4", "#ECFDF5"],
    germany:          ["#FFFBEB", "#FEF9C3", "#FFF7ED"],
    france:           ["#EFF6FF", "#F5F3FF", "#FFF1F2"],
    netherlands:      ["#FFF7ED", "#FFEDD5", "#FEF3C7"],
    sweden:           ["#FEFCE8", "#EFF6FF", "#FEF9C3"],
    portugal:         ["#ECFDF5", "#F0FDF4", "#FFF1F2"],
    spain:            ["#FEF9C3", "#FFFBEB", "#FFF1F2"],
    italy:            ["#ECFDF5", "#F9FAFB", "#FFF1F2"],
    ireland:          ["#ECFDF5", "#F9FAFB", "#FFF7ED"],
    switzerland:      ["#FFF1F2", "#FFF5F5", "#FEE2E2"],
    denmark:          ["#FFF1F2", "#FFF5F5", "#FEE2E2"],
    austria:          ["#FFF1F2", "#FAFAFA", "#FEE2E2"],
    belgium:          ["#FFFBEB", "#FEF9C3", "#FFF7ED"],
    finland:          ["#EFF6FF", "#F0F9FF", "#E0F2FE"],
    greece:           ["#EFF6FF", "#E0F2FE", "#ECFEFF"],
    poland:           ["#FAFAFA", "#FFF1F2", "#FEE2E2"],
    "czech-republic": ["#EFF6FF", "#FFF1F2", "#ECFDF5"],
    hungary:          ["#FFF1F2", "#FAFAFA", "#ECFDF5"],
    romania:          ["#EFF6FF", "#FEF9C3", "#FFF1F2"],
    bulgaria:         ["#FFFFFF", "#FEF9C3", "#ECFDF5"],
    croatia:          ["#FFF1F2", "#FFFFFF", "#EFF6FF"],
    estonia:          ["#EFF6FF", "#ECFDF5", "#FFFBEB"],
    latvia:           ["#FFF1F2", "#FEE2E2", "#FAFAFA"],
    lithuania:        ["#FEF9C3", "#ECFDF5", "#FFF1F2"],
    luxembourg:       ["#FFF1F2", "#EFF6FF", "#EFF6FF"],
    malta:            ["#FFF1F2", "#FAFAFA", "#FEE2E2"],
    slovakia:         ["#EFF6FF", "#FAFAFA", "#FFF1F2"],
    slovenia:         ["#EFF6FF", "#FFFFFF", "#FFF1F2"],
    cyprus:           ["#FEF9C3", "#FFFBEB", "#ECFDF5"],
    "south-korea":    ["#FFF1F2", "#FFF5F5", "#EFF6FF"],
    "north-korea":    ["#FEE2E2", "#EFF6FF", "#FEE2E2"],
    thailand:         ["#FFF1F2", "#F0F9FF", "#FEF9C3"],
  };
  return map[id] ?? ["#F0F9FF", "#F5F3FF", "#FFF7ED"];
}

const OFFICIAL_SITES: Record<string, string> = {
  usa:              "https://www.uscis.gov",
  canada:           "https://www.canada.ca/en/immigration-refugees-citizenship.html",
  australia:        "https://immi.homeaffairs.gov.au",
  "new-zealand":    "https://www.immigration.govt.nz",
  uk:               "https://www.gov.uk/browse/visas-immigration",
  japan:            "https://www.moj.go.jp/isa/index.html",
  singapore:        "https://www.ica.gov.sg",
  germany:          "https://www.bamf.de/EN",
  france:           "https://france-visas.gouv.fr",
  netherlands:      "https://ind.nl/en",
  sweden:           "https://www.migrationsverket.se/English.html",
  portugal:         "https://aima.gov.pt",
  spain:            "https://extranjeros.inclusion.gob.es",
  italy:            "https://portaleimmigrazione.it",
  ireland:          "https://www.irishimmigration.ie",
  switzerland:      "https://www.sem.admin.ch/sem/en/home.html",
  denmark:          "https://www.nyidanmark.dk/en-GB",
  austria:          "https://www.migration.gv.at/en/",
  belgium:          "https://dofi.ibz.be/en",
  finland:          "https://migri.fi/en/frontpage",
  greece:           "https://migration.gov.gr/en/",
  poland:           "https://www.gov.pl/web/udsc-en",
  "czech-republic": "https://www.mvcr.cz/mvcren/",
  hungary:          "https://kivandorlas.hu/en/",
  romania:          "https://igi.mai.gov.ro/en/",
  bulgaria:         "https://www.mvr.bg/en",
  croatia:          "https://mup.gov.hr/aliens-282/282",
  estonia:          "https://www.politsei.ee/en/instructions/living-in-estonia/",
  latvia:           "https://www.pmlp.gov.lv/en/",
  lithuania:        "https://migracija.lt/en/",
  luxembourg:       "https://guichet.public.lu/en/citoyens/immigration.html",
  malta:            "https://identitymalta.com/",
  slovakia:         "https://www.minv.sk/?aliens",
  slovenia:         "https://www.gov.si/en/topics/residence-in-slovenia/",
  cyprus:           "https://www.moi.gov.cy/moi/crmd/crmd.nsf/index_en/index_en",
  "south-korea":    "https://www.immigration.go.kr/immigration_eng/index.do",
};

function CountryHero({ country }: { country: Country }) {
  const { lang } = useLanguage();
  const t = translations[lang];
  const prCount   = country.permanentResidence.routes.length;
  const citCount  = country.citizenship.routes.length;
  const visaCount = Object.keys(country.visaDetails).length;
  const [c1, c2, c3] = getCountryGradient(country.id);

  return (
    <div
      className="relative rounded-3xl overflow-hidden mb-10 shadow-md"
      style={{ background: `linear-gradient(135deg, ${c1} 0%, ${c2} 50%, ${c3} 100%)` }}
    >
      <div className="relative px-4 sm:px-8 pt-4 sm:pt-6 pb-6 sm:pb-8">
        <div className="flex items-center justify-between mb-5 sm:mb-7">
          <Link href="/" className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-800 transition-colors">
            {t.backLink}
          </Link>
          {OFFICIAL_SITES[country.id] && (
            <a
              href={OFFICIAL_SITES[country.id]}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-lg bg-white/70 hover:bg-white border border-black/10 text-[11px] sm:text-xs font-semibold text-gray-700 hover:text-gray-900 shadow-sm hover:shadow transition-all duration-150"
            >
              🌐 <span className="hidden xs:inline sm:inline">{t.officialWebsite}</span><span className="sm:hidden">{t.officialWebsite}</span>
              <span className="text-gray-400">↗</span>
            </a>
          )}
        </div>

        {/* Mobile: vertical centered · Desktop: horizontal */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8">
          <div className="flex-shrink-0 flex sm:block justify-center">
            <span className="text-7xl sm:text-[6rem] leading-none">{country.flagEmoji}</span>
          </div>
          <div className="flex-1 min-w-0 text-center sm:text-left">
            <span className="inline-block px-3 py-0.5 text-[10px] font-bold uppercase tracking-widest bg-black/8 text-gray-500 rounded-full mb-2 sm:mb-3">
              {t.regions[country.region] ?? country.region}
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-gray-900 leading-tight mb-4 sm:mb-6">{country.name}</h1>
            <div className="flex justify-center sm:justify-start gap-5 sm:gap-12 flex-wrap">
              {[
                { emoji: "🏠", label: t.prRoutes,          value: prCount,   unit: prCount  !== 1 ? t.routesUnit : t.routeUnit },
                { emoji: "🛂", label: t.citizenshipRoutes, value: citCount,  unit: citCount !== 1 ? t.routesUnit : t.routeUnit },
                { emoji: "📋", label: t.visaTypesLabel,    value: visaCount, unit: t.typesUnit },
              ].map(({ emoji, label, value, unit }) => (
                <div key={label}>
                  <p className="text-gray-500 text-[10px] sm:text-base font-bold uppercase tracking-wider mb-1">{emoji} {label}</p>
                  <p className="text-gray-900 leading-none">
                    <span className="text-3xl sm:text-4xl font-extrabold">{value}</span>
                    <span className="text-sm sm:text-base font-medium text-gray-400 ml-1">{unit}</span>
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────

type PathKey = "permanentResidence" | "citizenship";

export default function CountryDetail({ country }: { country: Country }) {
  const [selected, setSelected]     = useState<PathKey | null>(null);
  const [activeVisa, setActiveVisa] = useState<{ code: string; detail: VisaDetail } | null>(null);
  const { lang } = useLanguage();
  const t = translations[lang];

  const path: ImmigrationPath | null = selected ? country[selected] : null;

  function openVisa(code: string) {
    const detail = country.visaDetails[code];
    if (detail) setActiveVisa({ code, detail });
  }

  // Translate criteria for the current path
  const criteriaLines = useTranslatedLines(
    path ? path.criteria.join("\n") : "",
    (text) => text.split("\n").filter(Boolean),
  );

  const officialName = useTranslatedText(path?.officialName ?? "");

  return (
    <div>
      {activeVisa && (
        <VisaModal code={activeVisa.code} detail={activeVisa.detail} onClose={() => setActiveVisa(null)} />
      )}

      <CountryHero country={country} />

      <p className="text-sm text-gray-500 mb-4">{t.choosePathway}</p>
      <div className="flex flex-col sm:flex-row gap-4 mb-10">
        <PathButton label={t.permanentResidence} icon="🏠" description={t.prSubtext}
          active={selected === "permanentResidence"}
          onClick={() => setSelected((p) => p === "permanentResidence" ? null : "permanentResidence")} />
        <PathButton label={t.citizenshipBtn} icon="🛂" description={t.citizenshipSubtext}
          active={selected === "citizenship"}
          onClick={() => setSelected((p) => p === "citizenship" ? null : "citizenship")} />
      </div>

      {path && (
        <div className="space-y-8">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-1">{officialName}</h2>
            <div className="h-0.5 w-12 bg-blue-500 rounded-full" />
          </div>

          <section>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-3">{t.requirements}</h3>
            <ul className="space-y-2">
              {criteriaLines.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-1 flex-shrink-0 w-2 h-2 rounded-full bg-blue-500" />
                  <span className="text-gray-700 text-sm leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-4">{t.pathwaysVisa}</h3>
            <div className="flex flex-col gap-4">
              {path.routes.map((route, i) => (
                <RouteCard key={i} route={route} visaDetails={country.visaDetails} onVisaClick={openVisa} />
              ))}
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
