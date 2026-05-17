"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { Country, ImmigrationPath, Route, VisaDetail } from "@/lib/types";
import { useLanguage } from "@/lib/languageContext";
import { translations, languages, type LanguageCode } from "@/lib/translations";
import { TX, useTranslatedText, useTranslatedLines, fetchTranslation } from "@/app/components/TX";
import { useCompare } from "@/lib/compareContext";
import { Flag } from "@/lib/flag";

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

const CATEGORY_META: Record<RouteCategory, { label: string }> = {
  student:     { label: "Student"     },
  employment:  { label: "Employment"  },
  family:      { label: "Family"      },
  lottery:     { label: "Lottery"     },
  asylum:      { label: "Asylum"      },
  citizenship: { label: "Citizenship" },
  investor:    { label: "Investor"    },
  regional:    { label: "Regional"    },
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
  const ctx = getStepContext(step);
  const diffLabel = { low: t.simple, medium: t.moderate, high: t.complex }[ctx.difficulty];
  const diffColor = { low: "text-emerald-600", medium: "text-amber-500", high: "text-red-600" }[ctx.difficulty];

  return (
    <div className="flex gap-4">
      <div className="flex flex-col items-center flex-shrink-0">
        <button
          onClick={() => setOpen((v) => !v)}
          className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 border-gray-200 bg-white text-gray-400 hover:border-gray-400 hover:text-gray-800 transition-all duration-100 active:scale-90 z-10 relative select-none flex-shrink-0"
        >
          {index + 1}
        </button>
        {!isLast && (
          <div className="w-px flex-1 min-h-6 bg-gray-200 my-1" />
        )}
      </div>
      <div className="flex-1 min-w-0 pb-5">
        <button onClick={() => setOpen((v) => !v)} className="text-left w-full group mt-1 transition-all duration-100 active:opacity-70">
          <div className="flex items-center gap-2 mb-0.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">{t.stepLabel} {index + 1}</span>
            <span className="text-[10px] text-gray-300">{open ? t.hide : t.info}</span>
          </div>
          <p className="text-sm font-medium text-gray-800 leading-snug group-hover:text-gray-950 transition-colors">{displayStep}</p>
        </button>
        {open && (
          <div className="pop-in mt-2 rounded-xl p-3 space-y-2.5 bg-gray-50 border border-gray-200">
            {ctx.duration && (
              <div className="text-xs">
                <span className="font-semibold text-gray-500">{t.durationLabel} </span>
                <TX className="text-gray-700">{ctx.duration}</TX>
              </div>
            )}
            {ctx.keyFact && (
              <div className="text-xs border-t border-gray-200 pt-2.5">
                <span className="font-semibold text-gray-500">{t.keyFactLabel} </span>
                <TX className="text-gray-700">{ctx.keyFact}</TX>
              </div>
            )}
            <div className="flex items-center gap-1.5 text-xs border-t border-gray-200 pt-2.5">
              <span className="text-gray-400">{t.durationLabel.replace(":", "")} complexity —</span>
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
  if (text.includes("\n")) return text.split("\n").map((s) => s.trim()).filter(Boolean);
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
  if (text.includes("\n")) return text.split("\n").map((s) => s.trim()).filter(Boolean);
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
  if (text.includes("\n")) return text.split("\n").map((s) => s.trim()).filter(Boolean);
  return text
    .split(/;\s*|\.\s+(?=[A-Z])/)
    .map((s) => s.trim().replace(/\.+$/, ""))
    .filter(Boolean);
}

// ─── Visa modal ───────────────────────────────────────────────────────────────

function VisaModal({ code, detail, onClose, preTranslated }: { code: string; detail: VisaDetail; onClose: () => void; preTranslated?: boolean }) {
  const { lang } = useLanguage();
  const t = translations[lang];
  const naPR = detail.pathToPR.startsWith("N/A");

  const descLinesT    = useTranslatedLines(detail.description, splitDescription);
  const prTimeLinesT  = useTranslatedLines(detail.timelineToPR, splitTimeline);
  const citTimeLinesT = useTranslatedLines(detail.timelineToCitizenship, splitTimeline);
  const noteLinesT    = useTranslatedLines(detail.probabilityNote, splitTimeline);
  const fullNameT     = useTranslatedText(detail.fullName);

  const descLines    = preTranslated ? splitDescription(detail.description) : descLinesT;
  const prTimeLines  = preTranslated ? splitTimeline(detail.timelineToPR) : prTimeLinesT;
  const citTimeLines = preTranslated ? splitTimeline(detail.timelineToCitizenship) : citTimeLinesT;
  const noteLines    = preTranslated ? splitTimeline(detail.probabilityNote) : noteLinesT;
  const fullName     = preTranslated ? detail.fullName : fullNameT;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/40 backdrop-blur-sm p-4 sm:p-8 overflow-y-auto"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl my-auto">
        <div className="flex items-start justify-between gap-4 px-6 pt-6 pb-4 border-b border-gray-100">
          <div>
            <span className="inline-block px-2.5 py-0.5 text-xs font-bold bg-blue-50 text-blue-400 rounded-full mb-2">{code}</span>
            <h2 className="text-xl font-bold text-gray-900 leading-tight">{fullName}</h2>
          </div>
          <button onClick={onClose} className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-700 transition-all duration-100 active:scale-90 text-xl">×</button>
        </div>
        <div className="px-6 py-5 space-y-7">
          <div className="space-y-3">
            <h3 className="text-xl font-bold text-gray-900">{t.statisticalProb}</h3>
            <ProbabilityBar label={t.chancePR} value={detail.probabilityToPR} />
            <ProbabilityBar label={t.chanceCit} value={detail.probabilityToCitizenship} />
          </div>
          <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
            <p className="text-base font-bold uppercase tracking-wider text-blue-400 mb-2">{t.overview}</p>
            <ul className="space-y-2">
              {descLines.map((line, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-300 flex-shrink-0" />
                  <span className="text-sm text-gray-700 leading-snug">{line}</span>
                </li>
              ))}
            </ul>
          </div>
          {!naPR && (
            <>
              <PathwayFlow path={detail.pathToPR} label={t.pathToPR} labelColor="text-blue-400" />
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
          <button onClick={onClose} className="w-full py-2.5 rounded-xl bg-gray-900 text-white text-sm font-medium hover:bg-gray-700 transition-all duration-100 active:scale-[0.98]">{t.close}</button>
        </div>
      </div>
    </div>
  );
}

// ─── Route card ───────────────────────────────────────────────────────────────

function RouteCard({ route, visaDetails, onVisaClick, initialOpen, preTranslated }: {
  route: Route;
  visaDetails: Record<string, VisaDetail>;
  onVisaClick: (code: string) => void;
  initialOpen?: boolean;
  preTranslated?: boolean;
}) {
  const [open, setOpen] = useState(initialOpen ?? false);
  const { lang } = useLanguage();
  const t = translations[lang];
  const category = getRouteCategory(route.name);
  const meta = CATEGORY_META[category];

  const routeNameT     = useTranslatedText(route.name);
  const descLinesT     = useTranslatedLines(route.description, splitDescription);
  const durationLinesT = useTranslatedLines(route.estimatedDuration, splitDuration);

  const routeName     = preTranslated ? route.name : routeNameT;
  const descLines     = preTranslated ? splitDescription(route.description) : descLinesT;
  const durationLines = preTranslated ? splitDuration(route.estimatedDuration) : durationLinesT;

  return (
    <div className="bg-white border-2 border-gray-100 rounded-xl overflow-hidden hover:border-gray-200 transition-colors">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center gap-3 px-5 py-4 text-left transition-all duration-100 active:scale-[0.99] active:bg-gray-50"
      >
        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded bg-gray-100 text-gray-500 flex-shrink-0">
          {meta.label}
        </span>
        <span className="flex-1 text-sm font-semibold text-gray-900 leading-snug">{routeName}</span>
        <span className="text-gray-300 text-sm ml-1 flex-shrink-0">{open ? "▴" : "▾"}</span>
      </button>

      {open && (
        <div className="px-5 pb-5 border-t border-gray-100 pt-4 space-y-4">
          <div className="space-y-2">
            <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-2">{t.visaTypesExplore}</p>
            {route.visaTypes.map((v, i) =>
              visaDetails[v] ? (
                <button key={i} onClick={() => onVisaClick(v)}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl border-2 border-gray-100 bg-white hover:border-gray-300 hover:shadow-sm transition-all duration-100 active:scale-[0.98] group cursor-pointer">
                  <span className="flex-1 text-left text-sm font-semibold text-gray-800">{v}</span>
                  <span className="text-gray-300 font-bold group-hover:text-gray-600 group-hover:translate-x-0.5 transition-all">›</span>
                </button>
              ) : (
                <div key={i} className="flex items-center px-4 py-3 rounded-xl border-2 border-gray-100">
                  <span className="text-sm font-medium text-gray-400">{v}</span>
                </div>
              )
            )}
          </div>

          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-2">{t.aboutRoute}</p>
            <div className="space-y-1.5">
              {descLines.map((line, i) => (
                <p key={i} className="text-sm text-gray-600 leading-relaxed">{line}</p>
              ))}
            </div>
          </div>

          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-2">{t.estimatedDuration}</p>
            <div className="space-y-1.5">
              {durationLines.map((line, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span className="mt-2 w-1 h-1 rounded-full bg-gray-300 flex-shrink-0" />
                  <span className="text-sm text-gray-600 leading-snug">{line}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Nav-stack view types ─────────────────────────────────────────────────────

type NavItem =
  | { type: "path"; key: PathKey }
  | { type: "route"; pathKey: PathKey; index: number }
  | { type: "visa"; code: string }

// ─── Path view (criteria + route list) ───────────────────────────────────────

function PathView({
  country, pathKey, onRouteClick, preTranslated,
}: {
  country: Country; pathKey: PathKey; onRouteClick: (i: number) => void; preTranslated?: boolean;
}) {
  const { lang } = useLanguage();
  const t = translations[lang];
  const path = country[pathKey];

  return (
    <div className="space-y-7">
      <div>
        <h2 className="text-2xl font-black text-[#0D0D0D] tracking-tight mb-1">
          {preTranslated ? path.officialName : <TX>{path.officialName}</TX>}
        </h2>
        <div className="h-0.5 w-12 bg-blue-300 rounded-full" />
      </div>
      <section>
        <h3 className="text-[11px] font-bold uppercase tracking-widest text-gray-400 mb-3">{t.requirements}</h3>
        <ul className="space-y-2">
          {path.criteria.map((item, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="mt-1 flex-shrink-0 w-2 h-2 rounded-full bg-blue-300" />
              {preTranslated
                ? <span className="text-gray-700 text-sm leading-relaxed">{item}</span>
                : <TX className="text-gray-700 text-sm leading-relaxed">{item}</TX>}
            </li>
          ))}
        </ul>
      </section>
      <section>
        <h3 className="text-[11px] font-bold uppercase tracking-widest text-gray-400 mb-3">{t.pathwaysVisa}</h3>
        <div className="flex flex-col gap-2">
          {path.routes.map((route, i) => {
            const category = getRouteCategory(route.name);
            const meta = CATEGORY_META[category];
            const nameT = preTranslated ? route.name : undefined;
            return (
              <button
                key={i}
                onClick={() => onRouteClick(i)}
                className="w-full flex items-center gap-3 px-5 py-4 bg-white border-2 border-gray-100 rounded-xl text-left hover:border-gray-200 hover:bg-gray-50 transition-all duration-100 active:scale-[0.99] group"
              >
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded bg-gray-100 text-gray-500 flex-shrink-0">
                  {meta.label}
                </span>
                <span className="flex-1 text-sm font-semibold text-gray-900 leading-snug">
                  {nameT ?? <TX>{route.name}</TX>}
                </span>
                <span className="text-gray-300 group-hover:text-gray-500 transition-colors">›</span>
              </button>
            );
          })}
        </div>
      </section>
    </div>
  );
}

// ─── Route view (detail + visa type list) ────────────────────────────────────

function RouteView({
  route, visaDetails, onVisaClick, preTranslated,
}: {
  route: Route; visaDetails: Record<string, VisaDetail>; onVisaClick: (code: string) => void; preTranslated?: boolean;
}) {
  const { lang } = useLanguage();
  const t = translations[lang];
  const category = getRouteCategory(route.name);
  const meta = CATEGORY_META[category];

  const descLinesT     = useTranslatedLines(route.description, splitDescription);
  const durationLinesT = useTranslatedLines(route.estimatedDuration, splitDuration);
  const descLines     = preTranslated ? splitDescription(route.description) : descLinesT;
  const durationLines = preTranslated ? splitDuration(route.estimatedDuration) : durationLinesT;

  return (
    <div className="space-y-7">
      <div>
        <span className="inline-block text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded bg-gray-100 text-gray-500 mb-3">
          {meta.label}
        </span>
        <h2 className="text-2xl font-black text-[#0D0D0D] tracking-tight mb-1">
          {preTranslated ? route.name : <TX>{route.name}</TX>}
        </h2>
        <div className="h-0.5 w-12 bg-blue-300 rounded-full" />
      </div>

      <section>
        <h3 className="text-[11px] font-bold uppercase tracking-widest text-gray-400 mb-3">{t.aboutRoute}</h3>
        <div className="space-y-1.5">
          {descLines.map((line, i) => (
            <p key={i} className="text-sm text-gray-600 leading-relaxed">{line}</p>
          ))}
        </div>
      </section>

      <section>
        <h3 className="text-[11px] font-bold uppercase tracking-widest text-gray-400 mb-3">{t.estimatedDuration}</h3>
        <div className="space-y-1.5">
          {durationLines.map((line, i) => (
            <div key={i} className="flex items-start gap-2">
              <span className="mt-2 w-1 h-1 rounded-full bg-gray-300 flex-shrink-0" />
              <span className="text-sm text-gray-600 leading-snug">{line}</span>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h3 className="text-[11px] font-bold uppercase tracking-widest text-gray-400 mb-3">{t.visaTypesExplore}</h3>
        <div className="flex flex-col gap-2">
          {route.visaTypes.map((v, i) =>
            visaDetails[v] ? (
              <button key={i} onClick={() => onVisaClick(v)}
                className="w-full flex items-center gap-3 px-4 py-3.5 rounded-xl border-2 border-gray-100 bg-white hover:border-gray-300 hover:bg-gray-50 transition-all duration-100 active:scale-[0.99] group">
                <span className="flex-1 text-left text-sm font-semibold text-gray-800">{v}</span>
                <span className="text-gray-300 font-bold group-hover:text-gray-600 group-hover:translate-x-0.5 transition-all">›</span>
              </button>
            ) : (
              <div key={i} className="flex items-center px-4 py-3 rounded-xl border-2 border-gray-100">
                <span className="text-sm font-medium text-gray-400">{v}</span>
              </div>
            )
          )}
        </div>
      </section>
    </div>
  );
}

// ─── Visa view (inline detail) ────────────────────────────────────────────────

function VisaView({ code, detail, preTranslated }: { code: string; detail: VisaDetail; preTranslated?: boolean }) {
  const { lang } = useLanguage();
  const t = translations[lang];
  const naPR = detail.pathToPR.startsWith("N/A");

  const descLinesT    = useTranslatedLines(detail.description, splitDescription);
  const prTimeLinesT  = useTranslatedLines(detail.timelineToPR, splitTimeline);
  const citTimeLinesT = useTranslatedLines(detail.timelineToCitizenship, splitTimeline);
  const noteLinesT    = useTranslatedLines(detail.probabilityNote, splitTimeline);
  const fullNameT     = useTranslatedText(detail.fullName);

  const descLines    = preTranslated ? splitDescription(detail.description) : descLinesT;
  const prTimeLines  = preTranslated ? splitTimeline(detail.timelineToPR) : prTimeLinesT;
  const citTimeLines = preTranslated ? splitTimeline(detail.timelineToCitizenship) : citTimeLinesT;
  const noteLines    = preTranslated ? splitTimeline(detail.probabilityNote) : noteLinesT;
  const fullName     = preTranslated ? detail.fullName : fullNameT;

  return (
    <div className="space-y-7">
      <div>
        <span className="inline-block px-2.5 py-0.5 text-xs font-bold bg-blue-50 text-blue-400 rounded-full mb-2">{code}</span>
        <h2 className="text-2xl font-black text-gray-900 tracking-tight leading-tight mb-1">{fullName}</h2>
        <div className="h-0.5 w-12 bg-blue-300 rounded-full" />
      </div>
      <div className="space-y-3">
        <h3 className="text-xl font-bold text-gray-900">{t.statisticalProb}</h3>
        <ProbabilityBar label={t.chancePR} value={detail.probabilityToPR} />
        <ProbabilityBar label={t.chanceCit} value={detail.probabilityToCitizenship} />
      </div>
      <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
        <p className="text-base font-bold uppercase tracking-wider text-blue-400 mb-2">{t.overview}</p>
        <ul className="space-y-2">
          {descLines.map((line, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-300 flex-shrink-0" />
              <span className="text-sm text-gray-700 leading-snug">{line}</span>
            </li>
          ))}
        </ul>
      </div>
      {!naPR && (
        <>
          <PathwayFlow path={detail.pathToPR} label={t.pathToPR} labelColor="text-blue-400" />
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
  );
}

// ─── Path selector button ─────────────────────────────────────────────────────

function PathButton({ label, description, active, onClick, type }: {
  label: string; description: string; active: boolean; onClick: () => void; type: "pr" | "citizenship";
}) {
  const didTouch = useRef(false);

  function handleTouch() {
    didTouch.current = true;
    onClick();
    setTimeout(() => { didTouch.current = false; }, 600);
  }

  function handleClick() {
    if (didTouch.current) return;
    onClick();
  }

  const isPR = type === "pr";

  return (
    <button
      type="button"
      onTouchStart={handleTouch}
      onClick={handleClick}
      style={{
        touchAction: "manipulation",
        WebkitTapHighlightColor: "transparent",
        WebkitAppearance: "none",
        cursor: "pointer",
      } as React.CSSProperties}
      className={`w-full text-left px-5 py-4 rounded-xl border-2 transition-all duration-100 active:scale-[0.98] ${
        active ? "border-blue-300 bg-blue-50" : "border-gray-100 bg-white hover:border-gray-200 hover:bg-gray-50"
      }`}
    >
      <div className="flex items-center gap-2.5 mb-1">
        {isPR ? (
          <svg className={`w-4 h-4 flex-shrink-0 ${active ? "text-blue-400" : "text-gray-400"}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
        ) : (
          <svg className={`w-4 h-4 flex-shrink-0 ${active ? "text-blue-400" : "text-gray-400"}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <path d="M2 10h20M2 14h20M6 6h1M6 18h1M17 6h1M17 18h1" />
            <rect x="2" y="4" width="20" height="16" rx="2" />
          </svg>
        )}
        <p className={`font-bold text-sm ${active ? "text-blue-500" : "text-gray-800"}`}>{label}</p>
      </div>
      <p className="text-xs text-gray-400 ml-[26px]">{description}</p>
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

// ─── Language switcher for country page ───────────────────────────────────────

function CountryLangSwitcher({
  currentLang,
  onSwitch,
}: {
  currentLang: LanguageCode;
  onSwitch: (lang: LanguageCode) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const current = languages.find((l) => l.code === currentLang) ?? languages[0];

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
        className="tap flex items-center gap-1 text-sm font-semibold text-gray-400 hover:text-gray-900 transition-colors"
      >
        <span className="text-base leading-none">{current.flag}</span>
        <svg className="w-3 h-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-44 bg-white border border-gray-200 rounded-xl shadow-lg z-50 py-1 max-h-72 overflow-y-auto pop-in">
          {languages.map((l) => (
            <button
              key={l.code}
              onClick={() => { onSwitch(l.code); setOpen(false); }}
              className={`tap flex items-center gap-2.5 w-full px-3 py-2 text-sm text-left transition-colors ${
                currentLang === l.code
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
      <div className="relative px-4 sm:px-8 pt-6 sm:pt-8 pb-6 sm:pb-8">
        {/* Mobile: vertical centered · Desktop: horizontal */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8">
          <div className="flex-shrink-0 flex sm:block justify-center">
            <Flag id={country.id} size="xl" className="shadow-md" />
          </div>
          <div className="flex-1 min-w-0 text-center sm:text-left">
            <span className="inline-block px-4 py-1 text-sm font-bold uppercase tracking-widest bg-black/8 text-gray-500 rounded-full mb-2 sm:mb-3">
              {t.regions[country.region] ?? country.region}
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-gray-900 leading-tight mb-4 sm:mb-6">{country.name}</h1>
            <div className="flex justify-center sm:justify-start gap-5 sm:gap-12 flex-wrap">
              {[
                { label: t.prRoutes,          value: prCount,   unit: prCount  !== 1 ? t.routesUnit : t.routeUnit },
                { label: t.citizenshipRoutes, value: citCount,  unit: citCount !== 1 ? t.routesUnit : t.routeUnit },
                { label: t.visaTypesLabel,    value: visaCount, unit: t.typesUnit },
              ].map(({ label, value, unit }) => (
                <div key={label}>
                  <p className="text-gray-500 text-[10px] sm:text-xs font-bold uppercase tracking-wider mb-1">{label}</p>
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

export default function CountryDetail({
  country,
  preTranslated = false,
  initialLang,
}: {
  country: Country;
  preTranslated?: boolean;
  initialLang?: LanguageCode;
}) {
  const [navStack, setNavStack] = useState<NavItem[]>([]);
  const { lang, setLang } = useLanguage();
  const router = useRouter();
  const t = translations[lang];

  useEffect(() => {
    if (initialLang && initialLang !== "en") setLang(initialLang);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const { toggle, isSelected, isFull } = useCompare();
  const sel = isSelected(country.id);

  const push = (item: NavItem) => setNavStack((s) => [...s, item]);
  const pop  = () => setNavStack((s) => s.slice(0, -1));
  const depth = navStack.length;
  const current = navStack[depth - 1];

  // Hash-based deep-linking
  useEffect(() => {
    const match = window.location.hash.match(/^#(permanentResidence|citizenship)(?:-(\d+))?$/);
    if (!match) return;
    const pathKey = match[1] as PathKey;
    const stack: NavItem[] = [{ type: "path", key: pathKey }];
    if (match[2] !== undefined) stack.push({ type: "route", pathKey, index: parseInt(match[2]) });
    setNavStack(stack);
  }, []);

  // Breadcrumb labels
  function crumbLabel(item: NavItem): string {
    if (item.type === "path") return item.key === "permanentResidence" ? t.permanentResidence : t.citizenshipBtn;
    if (item.type === "route") {
      const name = country[item.pathKey].routes[item.index]?.name ?? "";
      return name.length > 22 ? name.slice(0, 20) + "…" : name;
    }
    return item.code;
  }

  // Content key drives slide-up re-animation on each navigation
  const contentKey = depth === 0 ? "home" : JSON.stringify(current);

  return (
    <div>
      {/* Sticky top bar */}
      <div className="sticky top-0 z-40 bg-white border-b border-gray-100">
        <div className={`max-w-3xl mx-auto px-6 flex items-center justify-between ${depth === 0 ? "h-14" : "min-h-14 py-2"}`}>
          {depth === 0 ? (
            /* Original country top bar */
            <>
              <Link href="/browse" className="tap text-sm font-semibold text-gray-400 hover:text-gray-900 transition-colors shrink-0">
                {t.backLink}
              </Link>
              <div className="flex items-center gap-4 shrink-0">
                <button
                  onClick={() => toggle({ id: country.id, name: country.name, flagEmoji: country.flagEmoji })}
                  disabled={!sel && isFull}
                  className={`tap text-sm font-semibold transition-colors ${
                    sel ? "text-blue-500 hover:text-blue-700" : isFull ? "text-gray-300 cursor-not-allowed" : "text-gray-400 hover:text-gray-900"
                  }`}
                >
                  {sel ? "Remove" : "+ Compare"}
                </button>
                {OFFICIAL_SITES[country.id] && (
                  <a href={OFFICIAL_SITES[country.id]} target="_blank" rel="noopener noreferrer"
                    className="tap inline-flex items-center gap-1 text-sm font-semibold text-gray-400 hover:text-gray-900 transition-colors">
                    Official
                    <svg className="w-3 h-3" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                      <path d="M2 10L10 2M4 2h6v6" />
                    </svg>
                  </a>
                )}
                <CountryLangSwitcher
                  currentLang={initialLang ?? "en"}
                  onSwitch={(l) => { setLang(l); router.push(`/${country.id}${l === "en" ? "" : `?lang=${l}`}`); }}
                />
              </div>
            </>
          ) : (
            /* Breadcrumb nav — wraps on mobile, single line on desktop */
            <div className="flex flex-wrap items-center gap-y-1 w-full min-w-0">
              <button
                onClick={() => setNavStack([])}
                className="tap flex items-center gap-1.5 shrink-0 text-sm font-semibold text-gray-400 hover:text-gray-900 transition-colors"
              >
                <Flag id={country.id} size="sm" className="shrink-0" />
                <span>{country.name}</span>
              </button>
              {navStack.map((item, i) => {
                const isLast = i === depth - 1;
                return (
                  <React.Fragment key={i}>
                    <span className="text-gray-200 mx-2 shrink-0">›</span>
                    <button
                      onClick={() => !isLast && setNavStack(navStack.slice(0, i + 1))}
                      className={`tap text-sm font-semibold transition-colors ${
                        isLast ? "text-gray-900 cursor-default" : "text-gray-400 hover:text-gray-900"
                      }`}
                    >
                      {isLast && item.type === "route"
                        ? (country[item.pathKey].routes[item.index]?.name ?? "")
                        : crumbLabel(item)}
                    </button>
                  </React.Fragment>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Page content */}
      <div key={contentKey} className="max-w-3xl mx-auto px-6 py-8 slide-up">
        {depth === 0 && (
          <>
            <CountryHero country={country} />
            <div className="flex flex-col sm:flex-row gap-4">
              <PathButton label={t.permanentResidence} description={t.prSubtext} active={false} type="pr"
                onClick={() => push({ type: "path", key: "permanentResidence" })} />
              <PathButton label={t.citizenshipBtn} description={t.citizenshipSubtext} active={false} type="citizenship"
                onClick={() => push({ type: "path", key: "citizenship" })} />
            </div>
          </>
        )}

        {current?.type === "path" && (
          <PathView
            country={country}
            pathKey={current.key}
            onRouteClick={(i) => push({ type: "route", pathKey: current.key, index: i })}
            preTranslated={preTranslated}
          />
        )}

        {current?.type === "route" && (
          <RouteView
            route={country[current.pathKey].routes[current.index]}
            visaDetails={country.visaDetails}
            onVisaClick={(code) => push({ type: "visa", code })}
            preTranslated={preTranslated}
          />
        )}

        {current?.type === "visa" && country.visaDetails[current.code] && (
          <VisaView
            code={current.code}
            detail={country.visaDetails[current.code]}
            preTranslated={preTranslated}
          />
        )}
      </div>
    </div>
  );
}
