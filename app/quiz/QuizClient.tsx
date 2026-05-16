"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import Link from "next/link";
import { translations, languages, type Translations } from "@/lib/translations";
import { useLanguage } from "@/lib/languageContext";

// ─── Country data ─────────────────────────────────────────────────────────────

interface CountryData {
  id: string;
  name: string;
  flag: string;
  studentScore: number;
  workerScore: number;
  minBudgetStudent: number;
  minBudgetWorker: number;
  livingCostMin: number;
  livingCostMax: number;
  tuitionMin: number;
  tuitionMax: number;
  govFees: number;
  settlementFunds: number;
  prTimeline: string;
  bestRoute: string;
  pointsBased: boolean;
  ageBonus: boolean;
  primaryLang: string;
  englishSufficient: boolean;
  langBoost: number;
  langNote: string;
  note: string;
}

const COUNTRIES: CountryData[] = [
  {
    id: "canada",
    name: "Canada",
    flag: "🇨🇦",
    studentScore: 9,
    workerScore: 9,
    minBudgetStudent: 24000,
    minBudgetWorker: 14000,
    livingCostMin: 1400,
    livingCostMax: 2200,
    tuitionMin: 16000,
    tuitionMax: 32000,
    govFees: 1500,
    settlementFunds: 13000,
    prTimeline: "2–4 years",
    bestRoute: "Study → Post-Graduation Work Permit (PGWP) → Express Entry",
    pointsBased: true,
    ageBonus: true,
    primaryLang: "English",
    englishSufficient: true,
    langBoost: 3,
    langNote: "English is the primary language. French is an advantage in Québec and adds 6 bonus CRS points in Express Entry.",
    note: "The clearest student-to-PR pipeline in the world. PGWP gives open work rights, Express Entry gives PR in ~6 months.",
  },
  {
    id: "germany",
    name: "Germany",
    flag: "🇩🇪",
    studentScore: 9,
    workerScore: 8,
    minBudgetStudent: 11000,
    minBudgetWorker: 8000,
    livingCostMin: 1000,
    livingCostMax: 1800,
    tuitionMin: 500,
    tuitionMax: 3000,
    govFees: 500,
    settlementFunds: 5000,
    prTimeline: "5–8 years",
    bestRoute: "Study (near-free tuition) → Job Seeker Visa → Blue Card",
    pointsBased: false,
    ageBonus: false,
    primaryLang: "German",
    englishSufficient: false,
    langBoost: 10,
    langNote: "German is essential for most jobs and degree programs. English-only is viable in some international tech companies and English-taught master's programs, but severely limits your job market and long-term integration.",
    note: "Public university tuition is essentially free (~€300/semester). 18-month job seeker visa after graduation. German language skills are the single biggest factor in long-term success.",
  },
  {
    id: "australia",
    name: "Australia",
    flag: "🇦🇺",
    studentScore: 8,
    workerScore: 8,
    minBudgetStudent: 27000,
    minBudgetWorker: 12000,
    livingCostMin: 1600,
    livingCostMax: 2800,
    tuitionMin: 18000,
    tuitionMax: 38000,
    govFees: 1800,
    settlementFunds: 10000,
    prTimeline: "3–6 years",
    bestRoute: "Student Visa → Graduate Visa → Skilled Migration",
    pointsBased: true,
    ageBonus: true,
    primaryLang: "English",
    englishSufficient: true,
    langBoost: 2,
    langNote: "English is the sole working language. IELTS/PTE scores directly affect your skills assessment and migration points.",
    note: "Points-tested skilled migration rewards youth, education and English. Graduate visa gives 2–4 years to find a sponsor or gather points.",
  },
  {
    id: "portugal",
    name: "Portugal",
    flag: "🇵🇹",
    studentScore: 8,
    workerScore: 7,
    minBudgetStudent: 12000,
    minBudgetWorker: 7000,
    livingCostMin: 900,
    livingCostMax: 1600,
    tuitionMin: 4000,
    tuitionMax: 10000,
    govFees: 500,
    settlementFunds: 5000,
    prTimeline: "5 years",
    bestRoute: "Student Visa → Job Seeker → Residence",
    pointsBased: false,
    ageBonus: false,
    primaryLang: "Portuguese",
    englishSufficient: false,
    langBoost: 8,
    langNote: "Portuguese is required for most local jobs and daily life. English works in Lisbon's tech/startup scene and remote work, but is insufficient for full integration. A2 Portuguese is required for long-term residence.",
    note: "One of Europe's most affordable immigration destinations. Tech-friendly, growing startup scene, EU residency after 5 years opens doors to all of Europe.",
  },
  {
    id: "new-zealand",
    name: "New Zealand",
    flag: "🇳🇿",
    studentScore: 7,
    workerScore: 7,
    minBudgetStudent: 24000,
    minBudgetWorker: 11000,
    livingCostMin: 1400,
    livingCostMax: 2200,
    tuitionMin: 18000,
    tuitionMax: 32000,
    govFees: 1200,
    settlementFunds: 9000,
    prTimeline: "3–5 years",
    bestRoute: "Student Visa → Post-Study Work → Skilled Migrant",
    pointsBased: true,
    ageBonus: true,
    primaryLang: "English",
    englishSufficient: true,
    langBoost: 2,
    langNote: "English is the only working language. IELTS required for student visa and residency applications.",
    note: "Smaller skilled worker pool means less competition. Post-study work visa gives 3 years to find skilled employment and build PR points.",
  },
  {
    id: "netherlands",
    name: "Netherlands",
    flag: "🇳🇱",
    studentScore: 7,
    workerScore: 8,
    minBudgetStudent: 18000,
    minBudgetWorker: 10000,
    livingCostMin: 1300,
    livingCostMax: 2200,
    tuitionMin: 9000,
    tuitionMax: 16000,
    govFees: 800,
    settlementFunds: 7000,
    prTimeline: "5 years",
    bestRoute: "Student → Orientation Year → Highly Skilled Migrant",
    pointsBased: false,
    ageBonus: false,
    primaryLang: "Dutch",
    englishSufficient: true,
    langBoost: 5,
    langNote: "English is widely spoken and sufficient for most international companies and university programs. Dutch significantly expands your job options and is required for naturalization (citizenship). Many locals speak excellent English.",
    note: "Most programs taught in English. 1-year orientation visa after graduation to job hunt. Highly Skilled Migrant visa is fast-tracked for qualifying jobs.",
  },
  {
    id: "ireland",
    name: "Ireland",
    flag: "🇮🇪",
    studentScore: 7,
    workerScore: 7,
    minBudgetStudent: 22000,
    minBudgetWorker: 10000,
    livingCostMin: 1500,
    livingCostMax: 2500,
    tuitionMin: 12000,
    tuitionMax: 22000,
    govFees: 1000,
    settlementFunds: 8000,
    prTimeline: "5 years",
    bestRoute: "Student → Stay Back Permission → Critical Skills",
    pointsBased: false,
    ageBonus: false,
    primaryLang: "English",
    englishSufficient: true,
    langBoost: 2,
    langNote: "English-only country — a rare English-speaking EU member. No second language needed. This is a major advantage for English speakers.",
    note: "English-speaking EU country — rare and valuable. Strong tech hub (Google, Meta, Apple all based here). Stay Back permission gives 24 months to find work after graduation.",
  },
  {
    id: "sweden",
    name: "Sweden",
    flag: "🇸🇪",
    studentScore: 6,
    workerScore: 6,
    minBudgetStudent: 16000,
    minBudgetWorker: 9000,
    livingCostMin: 1200,
    livingCostMax: 2000,
    tuitionMin: 10000,
    tuitionMax: 18000,
    govFees: 700,
    settlementFunds: 6000,
    prTimeline: "4–5 years",
    bestRoute: "Student Visa → Job Seeker → Work Permit",
    pointsBased: false,
    ageBonus: false,
    primaryLang: "Swedish",
    englishSufficient: true,
    langBoost: 6,
    langNote: "English is sufficient for many jobs in tech, research and international companies. Swedish is necessary for government jobs, healthcare, and full social integration. Required at B1 level for permanent residence.",
    note: "High English proficiency among Swedes. Strong welfare system and work-life balance. Swedish makes you significantly more hireable outside the tech bubble.",
  },
  {
    id: "uk",
    name: "United Kingdom",
    flag: "🇬🇧",
    studentScore: 6,
    workerScore: 7,
    minBudgetStudent: 28000,
    minBudgetWorker: 10000,
    livingCostMin: 1400,
    livingCostMax: 2600,
    tuitionMin: 18000,
    tuitionMax: 38000,
    govFees: 1500,
    settlementFunds: 8000,
    prTimeline: "5 years",
    bestRoute: "Student Visa → Graduate Route (2 yrs) → Skilled Worker",
    pointsBased: true,
    ageBonus: false,
    primaryLang: "English",
    englishSufficient: true,
    langBoost: 2,
    langNote: "English is the only required language. IELTS B2 (or equivalent) is required for most visa categories.",
    note: "Graduate Route gives 2 years (3 for PhDs) to find a skilled job without a sponsor. Skilled Worker visa requires a job offer. ILR (PR) after 5 years continuous residence.",
  },
  {
    id: "singapore",
    name: "Singapore",
    flag: "🇸🇬",
    studentScore: 6,
    workerScore: 8,
    minBudgetStudent: 30000,
    minBudgetWorker: 15000,
    livingCostMin: 1800,
    livingCostMax: 3500,
    tuitionMin: 15000,
    tuitionMax: 32000,
    govFees: 1000,
    settlementFunds: 12000,
    prTimeline: "3–6 years",
    bestRoute: "Employment Pass → Permanent Residence (PR) Application",
    pointsBased: false,
    ageBonus: false,
    primaryLang: "English",
    englishSufficient: true,
    langBoost: 2,
    langNote: "English is the official business and government language. Mandarin is widely spoken but not required. English alone is fully sufficient.",
    note: "No formal points system — PR is discretionary but highly valued for top-earning professionals. Employment Pass is tied to salary thresholds. Strategic hub for Asia.",
  },
  {
    id: "spain",
    name: "Spain",
    flag: "🇪🇸",
    studentScore: 6,
    workerScore: 5,
    minBudgetStudent: 10000,
    minBudgetWorker: 7000,
    livingCostMin: 900,
    livingCostMax: 1600,
    tuitionMin: 2000,
    tuitionMax: 10000,
    govFees: 500,
    settlementFunds: 5000,
    prTimeline: "5 years",
    bestRoute: "Student Visa → Job Seeker Visa → Work Permit",
    pointsBased: false,
    ageBonus: false,
    primaryLang: "Spanish",
    englishSufficient: false,
    langBoost: 9,
    langNote: "Spanish is essential for virtually all jobs, daily life, and residency applications. English-only is viable only in a narrow set of international/remote roles. Spanish proficiency is the single biggest factor for success here.",
    note: "Affordable lifestyle and warm culture. Spanish opens doors to 20+ other countries. Digital Nomad Visa available. Slowest bureaucracy among Western European options.",
  },
  {
    id: "france",
    name: "France",
    flag: "🇫🇷",
    studentScore: 6,
    workerScore: 5,
    minBudgetStudent: 12000,
    minBudgetWorker: 8000,
    livingCostMin: 1100,
    livingCostMax: 2000,
    tuitionMin: 3000,
    tuitionMax: 12000,
    govFees: 600,
    settlementFunds: 5000,
    prTimeline: "5 years",
    bestRoute: "Student Visa → Temporary Stay Permit (APS) → Work Permit",
    pointsBased: false,
    ageBonus: false,
    primaryLang: "French",
    englishSufficient: false,
    langBoost: 9,
    langNote: "French is required for almost all local employment and is the language of instruction at most universities. English-only is only viable at a handful of international companies. B1 French is required for long-term residency.",
    note: "Very low public university tuition (~€170/year). APS temporary stay gives 12 months after graduation for job hunting.",
  },
  {
    id: "japan",
    name: "Japan",
    flag: "🇯🇵",
    studentScore: 5,
    workerScore: 5,
    minBudgetStudent: 13000,
    minBudgetWorker: 8000,
    livingCostMin: 900,
    livingCostMax: 1800,
    tuitionMin: 6000,
    tuitionMax: 14000,
    govFees: 500,
    settlementFunds: 5000,
    prTimeline: "5–10 years",
    bestRoute: "Student Visa → Work Visa → Permanent Residence (PR)",
    pointsBased: true,
    ageBonus: false,
    primaryLang: "Japanese",
    englishSufficient: false,
    langBoost: 10,
    langNote: "Japanese is essential for nearly all jobs, daily life, and long-term residency. English is only sufficient at a very small number of international tech companies. JLPT N2 or higher is expected by most employers. Without Japanese, your realistic options are extremely narrow.",
    note: "Highly safe and orderly society. Points-based Highly Skilled Professional visa can fast-track PR to 1–3 years for top candidates.",
  },
  {
    id: "south-korea",
    name: "South Korea",
    flag: "🇰🇷",
    studentScore: 5,
    workerScore: 5,
    minBudgetStudent: 11000,
    minBudgetWorker: 7000,
    livingCostMin: 900,
    livingCostMax: 1700,
    tuitionMin: 5000,
    tuitionMax: 12000,
    govFees: 500,
    settlementFunds: 5000,
    prTimeline: "5 years",
    bestRoute: "D-2 Student Visa → D-10 Job Seeker Visa → E-7 Skilled Work Visa",
    pointsBased: true,
    ageBonus: true,
    primaryLang: "Korean",
    englishSufficient: false,
    langBoost: 9,
    langNote: "Korean is required for most jobs and university programs. English teaching (EPIK) is the main English-only path, but is a niche route. TOPIK Level 4+ is expected by employers for most skilled roles.",
    note: "Growing tech economy. Point-based F-2 visa available for skilled workers with high scores. Strong government scholarships for international students.",
  },
  {
    id: "usa",
    name: "United States",
    flag: "🇺🇸",
    studentScore: 4,
    workerScore: 5,
    minBudgetStudent: 40000,
    minBudgetWorker: 15000,
    livingCostMin: 1800,
    livingCostMax: 4000,
    tuitionMin: 25000,
    tuitionMax: 55000,
    govFees: 2500,
    settlementFunds: 12000,
    prTimeline: "5–30+ years",
    bestRoute: "F-1 Student Visa → Optional Practical Training (OPT) / STEM OPT → H-1B Specialty Occupation Visa → Green Card",
    pointsBased: false,
    ageBonus: false,
    primaryLang: "English",
    englishSufficient: true,
    langBoost: 2,
    langNote: "English is the only required language. Spanish is widely spoken but not needed for immigration or most professional roles.",
    note: "World-class universities but extremely high cost and the H-1B lottery (23% chance/year) creates major uncertainty. Indian and Chinese nationals face 50+ year Green Card backlogs in some categories.",
  },
];

// ─── Scoring ──────────────────────────────────────────────────────────────────

type PathChoice = "student" | "worker" | "both";
type EducationLevel = "highschool" | "bachelor" | "master" | "phd";
type BudgetRange = "5" | "15" | "30" | "60" | "100";
type AgeRange = "18-24" | "25-30" | "31-35" | "36-40" | "40+";
type ExperienceRange = "0-1" | "2-4" | "5-9" | "10+";

export interface Profile {
  citizenship: string;
  path: PathChoice;
  budget: BudgetRange;
  age: AgeRange;
  education: EducationLevel;
  experience: ExperienceRange;
  languages: string[];
}

const BUDGET_VALUES: Record<BudgetRange, number> = {
  "5": 5000, "15": 15000, "30": 30000, "60": 60000, "100": 100000,
};

const AGE_MIDPOINTS: Record<AgeRange, number> = {
  "18-24": 22, "25-30": 27, "31-35": 33, "36-40": 38, "40+": 45,
};

function scoreCountry(c: CountryData, p: Profile): number {
  let score = 0;
  const budget = BUDGET_VALUES[p.budget];
  const age = AGE_MIDPOINTS[p.age];
  const langs = p.languages.map(l => l.toLowerCase());
  const speaksEnglish = langs.includes("english");
  const speaksPrimary = langs.includes(c.primaryLang.toLowerCase());

  const pathFit =
    p.path === "student" ? c.studentScore :
    p.path === "worker"  ? c.workerScore :
    (c.studentScore + c.workerScore) / 2;
  score += (pathFit / 10) * 28;

  const required =
    p.path === "student" ? c.minBudgetStudent :
    p.path === "worker"  ? c.minBudgetWorker :
    Math.min(c.minBudgetStudent, c.minBudgetWorker);
  if (budget >= required)             score += 22;
  else if (budget >= required * 0.75) score += 12;
  else if (budget >= required * 0.5)  score += 5;

  const eduPts: Record<EducationLevel, number> = {
    highschool: 4, bachelor: 9, master: 12, phd: 13,
  };
  score += eduPts[p.education];

  if (c.ageBonus || c.pointsBased) {
    if (age >= 25 && age <= 35)      score += 12;
    else if (age >= 22 && age <= 39) score += 8;
    else                             score += 3;
  } else {
    score += 8;
  }

  const expPts: Record<ExperienceRange, number> = {
    "0-1": 2, "2-4": 4, "5-9": 6, "10+": 8,
  };
  score += expPts[p.experience];

  if (c.englishSufficient) {
    if (speaksEnglish) score += 8;
    else               score -= 7;
    if (c.primaryLang !== "English" && speaksPrimary) {
      score += (c.langBoost / 10) * 4;
    }
  } else {
    if (speaksPrimary) {
      score += 10;
      if (speaksEnglish) score += 2;
    } else if (speaksEnglish) {
      score += 3;
      score -= Math.round((c.langBoost / 10) * 4);
    } else {
      score -= 10;
    }
  }

  return Math.max(0, Math.min(100, Math.round(score)));
}

// ─── Language options ─────────────────────────────────────────────────────────

const LANGUAGES = [
  { name: "English",    flag: "🇬🇧" },
  { name: "German",     flag: "🇩🇪" },
  { name: "French",     flag: "🇫🇷" },
  { name: "Spanish",    flag: "🇪🇸" },
  { name: "Portuguese", flag: "🇵🇹" },
  { name: "Dutch",      flag: "🇳🇱" },
  { name: "Swedish",    flag: "🇸🇪" },
  { name: "Japanese",   flag: "🇯🇵" },
  { name: "Korean",     flag: "🇰🇷" },
  { name: "Mandarin",   flag: "🇨🇳" },
  { name: "Arabic",     flag: "🇸🇦" },
];

const CITIZENSHIPS = [
  "Australia", "Bangladesh", "Brazil", "Canada", "China", "Colombia",
  "Egypt", "Ethiopia", "Ghana", "India", "Indonesia", "Iran", "Japan",
  "Kenya", "Mexico", "Morocco", "Nigeria", "Pakistan", "Philippines",
  "Russia", "South Africa", "South Korea", "Turkey", "Ukraine",
  "United Kingdom", "United States", "Vietnam", "Other",
];

// ─── Country name localisation ────────────────────────────────────────────────

const CITIZENSHIP_ISO: Record<string, string> = {
  "Australia": "AU", "Bangladesh": "BD", "Brazil": "BR",
  "Canada": "CA", "China": "CN", "Colombia": "CO",
  "Egypt": "EG", "Ethiopia": "ET", "Ghana": "GH",
  "India": "IN", "Indonesia": "ID", "Iran": "IR",
  "Japan": "JP", "Kenya": "KE", "Mexico": "MX",
  "Morocco": "MA", "Nigeria": "NG", "Pakistan": "PK",
  "Philippines": "PH", "Russia": "RU", "South Africa": "ZA",
  "South Korea": "KR", "Turkey": "TR", "Ukraine": "UA",
  "United Kingdom": "GB", "United States": "US", "Vietnam": "VN",
};

const OTHER_LABEL: Record<string, string> = {
  en: "Other", zh: "其他", hi: "अन्य", vi: "Khác", ar: "أخرى",
  ru: "Другое", es: "Otro", ko: "기타", ja: "その他",
  pt: "Outro", fr: "Autre", fil: "Iba pa", bn: "অন্যান্য",
};

function localizeCountryName(englishName: string, lang: string): string {
  const code = CITIZENSHIP_ISO[englishName];
  if (!code) return englishName;
  try {
    return new Intl.DisplayNames([lang], { type: "region" }).of(code) ?? englishName;
  } catch {
    return englishName;
  }
}

// ─── Currency helpers ─────────────────────────────────────────────────────────

interface CurrencyInfo {
  code: string;
  rate: number; // approximate USD → local
  locale: string;
}

const CITIZENSHIP_CURRENCY: Record<string, CurrencyInfo> = {
  "Australia":      { code: "AUD", rate: 1.53,   locale: "en-AU" },
  "Bangladesh":     { code: "BDT", rate: 110,    locale: "bn-BD" },
  "Brazil":         { code: "BRL", rate: 5.0,    locale: "pt-BR" },
  "Canada":         { code: "CAD", rate: 1.37,   locale: "en-CA" },
  "China":          { code: "CNY", rate: 7.2,    locale: "zh-CN" },
  "Colombia":       { code: "COP", rate: 3900,   locale: "es-CO" },
  "Egypt":          { code: "EGP", rate: 48,     locale: "ar-EG" },
  "Ethiopia":       { code: "ETB", rate: 56,     locale: "am-ET" },
  "Ghana":          { code: "GHS", rate: 14,     locale: "en-GH" },
  "India":          { code: "INR", rate: 83,     locale: "en-IN" },
  "Indonesia":      { code: "IDR", rate: 15700,  locale: "id-ID" },
  "Iran":           { code: "IRR", rate: 42000,  locale: "fa-IR" },
  "Japan":          { code: "JPY", rate: 155,    locale: "ja-JP" },
  "Kenya":          { code: "KES", rate: 130,    locale: "en-KE" },
  "Mexico":         { code: "MXN", rate: 17,     locale: "es-MX" },
  "Morocco":        { code: "MAD", rate: 10,     locale: "fr-MA" },
  "Nigeria":        { code: "NGN", rate: 1500,   locale: "en-NG" },
  "Pakistan":       { code: "PKR", rate: 280,    locale: "ur-PK" },
  "Philippines":    { code: "PHP", rate: 56,     locale: "en-PH" },
  "Russia":         { code: "RUB", rate: 90,     locale: "ru-RU" },
  "South Africa":   { code: "ZAR", rate: 18.5,   locale: "en-ZA" },
  "South Korea":    { code: "KRW", rate: 1350,   locale: "ko-KR" },
  "Turkey":         { code: "TRY", rate: 32,     locale: "tr-TR" },
  "Ukraine":        { code: "UAH", rate: 39,     locale: "uk-UA" },
  "United Kingdom": { code: "GBP", rate: 0.79,   locale: "en-GB" },
  "United States":  { code: "USD", rate: 1,      locale: "en-US" },
  "Vietnam":        { code: "VND", rate: 25000,  locale: "vi-VN" },
};

function getCurrency(citizenship: string): CurrencyInfo {
  return CITIZENSHIP_CURRENCY[citizenship] ?? { code: "USD", rate: 1, locale: "en-US" };
}

function fmtBudget(usd: number, c: CurrencyInfo): string {
  const amount = Math.round(usd * c.rate);
  try {
    return new Intl.NumberFormat(c.locale, {
      style: "currency",
      currency: c.code,
      maximumFractionDigits: 0,
      notation: "compact",
      compactDisplay: "short",
    }).format(amount);
  } catch {
    const k = amount >= 1_000_000
      ? `${(amount / 1_000_000).toFixed(1)}M`
      : `${Math.round(amount / 1_000)}K`;
    return `${c.code} ${k}`;
  }
}

// ─── UI components ────────────────────────────────────────────────────────────

function BrowseLink() {
  return (
    <div className="fixed top-0 right-0 p-5 sm:p-6 z-50">
      <Link
        href="/browse"
        className="tap inline-block text-sm font-semibold text-gray-400 hover:text-gray-900 transition-colors"
      >
        or browse →
      </Link>
    </div>
  );
}

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
    <div className="fixed top-0 left-0 p-5 sm:p-6 z-50" ref={ref}>
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
        <div className="absolute left-0 mt-1 w-44 bg-white border border-gray-200 rounded-xl shadow-lg z-50 py-1 max-h-72 overflow-y-auto pop-in">
          {languages.map((l) => (
            <button
              key={l.code}
              onClick={() => { setLang(l.code); setOpen(false); }}
              className={`tap flex items-center gap-2.5 w-full px-3 py-2 text-sm text-left transition-colors ${
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
  );
}

function StepBar({ step, total }: { step: number; total: number }) {
  return (
    <div className="flex items-center gap-1 mb-8">
      {Array.from({ length: total }, (_, i) => (
        <div
          key={i}
          className={`flex-1 h-0.5 transition-all duration-500 ${
            i < step ? "bg-[#FF4757]" : "bg-gray-200"
          }`}
        />
      ))}
    </div>
  );
}

function OptionButton({
  selected,
  onClick,
  children,
}: {
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full text-left px-5 py-4 rounded-xl border-2 font-medium transition-all duration-100 ${
        selected
          ? "border-[#FF4757] bg-[#FFF0F1] text-[#0D0D0D]"
          : "border-gray-100 bg-white text-gray-800 hover:border-gray-200 hover:bg-gray-50"
      }`}
    >
      {children}
    </button>
  );
}

function NavButtons({
  onBack,
  onNext,
  disabled,
  isLast,
  t,
}: {
  onBack: () => void;
  onNext: () => void;
  disabled: boolean;
  isLast?: boolean;
  t: Translations;
}) {
  return (
    <div className="flex gap-3 mt-10">
      <button
        type="button"
        onClick={onBack}
        className="px-5 py-3.5 text-gray-400 font-semibold text-sm hover:text-gray-800 transition-colors"
      >
        ← {t.quizBack}
      </button>
      <button
        type="button"
        onClick={onNext}
        disabled={disabled}
        className="flex-1 py-3.5 bg-[#0D0D0D] hover:bg-[#FF4757] active:bg-[#E53E4F] disabled:opacity-30 disabled:cursor-not-allowed text-white font-black text-sm rounded-xl transition-colors"
      >
        {isLast ? t.quizSeeResults : `${t.quizNext} →`}
      </button>
    </div>
  );
}

// ─── Results ──────────────────────────────────────────────────────────────────

function ScoreBar({ score }: { score: number }) {
  const color =
    score >= 80 ? "bg-emerald-500" :
    score >= 65 ? "bg-[#FF4757]" :
    score >= 45 ? "bg-amber-500" :
    "bg-gray-300";

  return (
    <div className="flex items-center gap-2 flex-shrink-0 w-24">
      <div className="flex-1 h-1 bg-gray-100 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full score-bar ${color}`}
          style={{ "--score-width": `${score}%` } as React.CSSProperties}
        />
      </div>
      <span className="text-xs font-bold text-gray-500 tabular-nums w-8 text-right">{score}</span>
    </div>
  );
}

function CostRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-center py-1.5 border-b border-gray-100 last:border-0">
      <span className="text-xs text-gray-500">{label}</span>
      <span className="text-xs font-semibold text-gray-800">{value}</span>
    </div>
  );
}

function ResultCard({ c, score, path, citizenship }: { c: CountryData; score: number; path: PathChoice; citizenship: string }) {
  const [open, setOpen] = useState(false);
  const { lang } = useLanguage();
  const t = translations[lang];
  const isStudent = path !== "worker";
  const cur = getCurrency(citizenship);

  const scoreColor =
    score >= 80 ? "text-emerald-600 bg-emerald-50" :
    score >= 65 ? "text-[#FF4757] bg-[#FFF0F1]" :
    score >= 45 ? "text-amber-600 bg-amber-50" :
    "text-gray-500 bg-gray-50";

  const scoreLabel =
    score >= 80 ? t.quizScoreExcellent :
    score >= 65 ? t.quizScoreGood :
    score >= 45 ? t.quizScorePossible :
    t.quizScoreChallenging;

  return (
    <div className="bg-white border-2 border-gray-100 rounded-xl overflow-hidden hover:border-gray-200 transition-colors">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-start gap-3 px-5 py-4 text-left"
      >
        <span className="text-2xl leading-none flex-shrink-0 mt-0.5">{c.flag}</span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2 mb-1">
            <p className="font-bold text-gray-900 text-sm">{c.name}</p>
            <div className="flex items-center gap-1.5 flex-shrink-0">
              <span className={`text-xs font-bold px-2 py-0.5 rounded-md ${scoreColor}`}>
                {scoreLabel}
              </span>
              <span className="text-xs font-bold text-gray-400 tabular-nums">{score}</span>
              <span className="text-gray-300 text-sm ml-0.5">{open ? "▴" : "▾"}</span>
            </div>
          </div>
          <p className="text-xs text-gray-400 leading-snug">{c.bestRoute}</p>
        </div>
      </button>

      {open && (
        <div className="px-5 pb-5 border-t border-gray-100 pt-4 space-y-4">
          <ScoreBar score={score} />
          <div className="bg-gray-50 rounded-xl p-4">
            <div className="flex items-center justify-between mb-3">
              <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                {t.quizCostTitle}
              </p>
              {cur.code !== "USD" && (
                <p className="text-[10px] font-semibold text-[#FF4757]">≈ {cur.code}</p>
              )}
            </div>
            <CostRow label={t.quizCostLiving} value={`${fmtBudget(c.livingCostMin, cur)} – ${fmtBudget(c.livingCostMax, cur)}/mo`} />
            {isStudent && (
              <CostRow label={t.quizCostTuition} value={`${fmtBudget(c.tuitionMin, cur)} – ${fmtBudget(c.tuitionMax, cur)}/yr`} />
            )}
            <CostRow label={t.quizCostGovFees} value={`~${fmtBudget(c.govFees, cur)}`} />
            {path !== "student" && (
              <CostRow label={t.quizCostSettlement} value={`~${fmtBudget(c.settlementFunds, cur)}`} />
            )}
            <CostRow
              label={isStudent ? t.quizCostFirstYear : t.quizCostMinStart}
              value={fmtBudget(isStudent ? c.minBudgetStudent : c.minBudgetWorker, cur)}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-gray-50 rounded-xl p-3 border border-gray-100">
              <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1">
                {t.quizTimelinePR}
              </p>
              <p className="text-sm font-semibold text-gray-900">{c.prTimeline}</p>
            </div>
            <div className={`rounded-xl p-3 border ${c.englishSufficient ? "bg-emerald-50 border-emerald-100" : "bg-amber-50 border-amber-100"}`}>
              <p className={`text-[10px] font-bold uppercase tracking-wider mb-1 ${c.englishSufficient ? "text-emerald-600" : "text-amber-600"}`}>
                {t.quizEnglishAlone}
              </p>
              <p className={`text-sm font-semibold ${c.englishSufficient ? "text-emerald-800" : "text-amber-800"}`}>
                {c.englishSufficient ? t.quizEnglishSufficient : `${c.primaryLang} ${t.quizLangNeeded}`}
              </p>
            </div>
          </div>

          <div className="bg-[#FFF0F1] border border-[#FF4757]/20 rounded-xl p-3">
            <p className="text-[10px] font-bold uppercase tracking-wider text-[#FF4757] mb-1">
              {t.quizLangReality}
            </p>
            <p className="text-xs text-gray-700 leading-relaxed">{c.langNote}</p>
          </div>

          <p className="text-sm text-gray-600 leading-relaxed">{c.note}</p>

          <Link
            href={`/${c.id}${lang !== "en" ? `?lang=${lang}` : ""}#permanentResidence-0`}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#0D0D0D] hover:bg-[#FF4757] text-white text-sm font-bold rounded-lg transition-colors"
          >
            {t.quizViewGuide} →
          </Link>
        </div>
      )}
    </div>
  );
}

function Results({ profile }: { profile: Profile }) {
  const { lang } = useLanguage();
  const t = translations[lang];
  const isRTL = lang === "ar";
  const scored = COUNTRIES
    .map((c) => ({ c, score: scoreCountry(c, profile) }))
    .sort((a, b) => b.score - a.score);

  const submitted = useRef(false);
  useEffect(() => {
    if (submitted.current) return;
    submitted.current = true;
    localStorage.setItem("quizProfile", JSON.stringify(profile));
    const top = scored[0];
    fetch("/api/quiz-submission", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        citizenship: profile.citizenship,
        path: profile.path,
        budget: profile.budget,
        age: profile.age,
        education: profile.education,
        experience: profile.experience,
        languages: profile.languages,
        topCountry: top.c.id,
        topScore: top.score,
      }),
    }).catch(() => {});
  }, []);

  const rankColors = [
    "bg-amber-400 text-amber-900",
    "bg-gray-200 text-gray-700",
    "bg-amber-700 text-white",
  ];

  return (
    <div dir={isRTL ? "rtl" : "ltr"} className="w-full overflow-x-hidden">
      <BrowseLink />
      <LangSwitcher />
      <div className="mb-12">
        <h2 className="text-4xl sm:text-5xl font-black text-[#0D0D0D] mb-2 leading-tight tracking-tight">
          {t.quizResultTitle}
        </h2>
        <p className="text-gray-400 text-sm">{t.quizResultDesc}</p>
      </div>
      <div className="space-y-2.5 mb-8">
        {scored.map(({ c, score }, i) => (
          <div key={c.id} className="flex items-start gap-3 min-w-0">
            <span
              className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold mt-3.5 ${
                i < 3 ? rankColors[i] : "bg-gray-100 text-gray-400"
              }`}
            >
              {i + 1}
            </span>
            <div className="flex-1 min-w-0">
              <ResultCard c={c} score={score} path={profile.path} citizenship={profile.citizenship} />
            </div>
          </div>
        ))}
      </div>
      <Link
        href="/browse"
        className="flex items-center justify-center gap-2 w-full py-4 rounded-xl border-2 border-gray-100 text-gray-500 font-bold text-sm hover:border-[#FF4757] hover:text-[#FF4757] transition-colors mb-3"
      >
        {t.quizBrowseAll}
      </Link>
      <Link
        href="/"
        className="flex items-center justify-center gap-2 w-full py-3 text-gray-400 font-semibold text-sm hover:text-gray-700 transition-colors"
      >
        ↺ Retake quiz
      </Link>
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────

const TOTAL_STEPS = 7;

export default function QuizClient({
  initialProfile,
  jumpToResults,
}: {
  initialProfile?: Profile;
  jumpToResults?: boolean;
} = {}) {
  const [step, setStep] = useState(jumpToResults ? TOTAL_STEPS : 0);
  const [profile, setProfile] = useState<Partial<Profile>>(initialProfile ?? { languages: [] });
  const { lang } = useLanguage();
  const t = translations[lang];
  const isRTL = lang === "ar";

  function stepLabel(n: number) {
    return t.quizStepOf.replace("{n}", String(n)).replace("{total}", "6");
  }

  function set<K extends keyof Profile>(key: K, value: Profile[K]) {
    setProfile((p) => ({ ...p, [key]: value }));
  }

  function toggleLang(l: string) {
    setProfile((p) => {
      const langs = p.languages ?? [];
      return {
        ...p,
        languages: langs.includes(l) ? langs.filter((x) => x !== l) : [...langs, l],
      };
    });
  }

  function next() { setStep((s) => s + 1); }
  function back() { setStep((s) => s - 1); }

  const p = profile as Profile;
  const langs = p.languages ?? [];

  const localizedCitizenships = useMemo(() => {
    const list = CITIZENSHIPS
      .filter((c) => c !== "Other")
      .map((c) => ({ value: c, label: localizeCountryName(c, lang) }))
      .sort((a, b) => a.label.localeCompare(b.label, lang));
    list.push({ value: "Other", label: OTHER_LABEL[lang] ?? "Other" });
    return list;
  }, [lang]);

  if (step === TOTAL_STEPS) {
    return (
      <main className="min-h-screen px-4 py-16 overflow-x-hidden bg-white">
        <div className="max-w-2xl mx-auto w-full">
          <Results profile={p} />
        </div>
      </main>
    );
  }

  const ghostNums = ["", "01", "02", "03", "04", "05", "06"];

  return (
    <main className="min-h-screen bg-white" dir={isRTL ? "rtl" : "ltr"}>
      <BrowseLink />
      <LangSwitcher />

      {step === 0 ? (
        /* ─── Intro screen ─────────────────────────────────────────────── */
        <div className="min-h-screen flex flex-col justify-center px-6 py-24">
          <div className="max-w-lg mx-auto w-full">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#FFF0F1] text-[#FF4757] text-xs font-black rounded-full mb-10 uppercase tracking-widest">
              {t.quizBadge}
            </div>

            <h1 className="text-5xl sm:text-7xl font-black text-[#0D0D0D] leading-[0.92] mb-8 tracking-tight">
              {t.quizBannerTitle}
            </h1>

            <p className="text-base text-gray-500 mb-12 max-w-xs leading-relaxed">
              {t.quizIntroDesc}
            </p>

            <button
              type="button"
              onClick={next}
              className="w-full py-5 bg-[#0D0D0D] hover:bg-[#FF4757] active:bg-[#E53E4F] text-white font-black text-lg rounded-2xl transition-colors"
            >
              {t.quizStart}
            </button>
          </div>
        </div>
      ) : (
        /* ─── Quiz steps ───────────────────────────────────────────────── */
        <div className="min-h-screen px-6 pt-20 sm:pt-14 pb-16">
          <div className="max-w-lg mx-auto">
            <StepBar step={step} total={6} />

            <div key={step} className="slide-up relative">
              {/* Ghost step number */}
              <span
                className="absolute -top-4 -right-2 text-[clamp(100px,20vw,160px)] font-black text-gray-100 leading-none select-none pointer-events-none"
                aria-hidden
              >
                {ghostNums[step]}
              </span>

              <div className="relative z-10">
                {/* Step 1: Citizenship */}
                {step === 1 && (
                  <div>
                    <h2 className="text-4xl sm:text-5xl font-black text-[#0D0D0D] mb-3 leading-tight tracking-tight">{t.quizQ1Title}</h2>
                    <p className="text-gray-500 text-sm mb-8">{t.quizQ1Desc}</p>
                    <select
                      value={p.citizenship ?? ""}
                      onChange={(e) => set("citizenship", e.target.value)}
                      className="w-full px-4 py-3.5 rounded-xl border-2 border-gray-100 text-gray-800 font-medium bg-white mb-2 focus:border-[#FF4757] focus:ring-2 focus:ring-[#FF4757]/20 focus:outline-none transition-colors text-sm"
                    >
                      <option value="">{t.quizQ1Placeholder}</option>
                      {localizedCitizenships.map(({ value, label }) => (
                        <option key={value} value={value}>{label}</option>
                      ))}
                    </select>
                    <NavButtons onBack={back} onNext={next} disabled={!p.citizenship} t={t} />
                  </div>
                )}

                {/* Step 2: Path */}
                {step === 2 && (
                  <div>
                    <h2 className="text-4xl sm:text-5xl font-black text-[#0D0D0D] mb-3 leading-tight tracking-tight">{t.quizQ2Title}</h2>
                    <p className="text-gray-500 text-sm mb-8">{t.quizQ2Desc}</p>
                    <div className="space-y-2.5 mb-2">
                      {[
                        { v: "student", label: t.quizPathStudent, sub: t.quizPathStudentSub },
                        { v: "worker",  label: t.quizPathWorker,  sub: t.quizPathWorkerSub  },
                        { v: "both",    label: t.quizPathBoth,    sub: t.quizPathBothSub    },
                      ].map(({ v, label, sub }) => (
                        <OptionButton key={v} selected={p.path === v} onClick={() => set("path", v as PathChoice)}>
                          <span className="font-bold text-sm">{label}</span>
                          <span className="block text-xs text-gray-400 mt-0.5">{sub}</span>
                        </OptionButton>
                      ))}
                    </div>
                    <NavButtons onBack={back} onNext={next} disabled={!p.path} t={t} />
                  </div>
                )}

                {/* Step 3: Budget */}
                {step === 3 && (() => {
                  const cur = getCurrency(p.citizenship ?? "");
                  const f = (usd: number) => fmtBudget(usd, cur);
                  const tiers = [
                    { v: "5",   label: `Under ${f(10_000)}`           },
                    { v: "15",  label: `${f(10_000)} – ${f(25_000)}`  },
                    { v: "30",  label: `${f(25_000)} – ${f(50_000)}`  },
                    { v: "60",  label: `${f(50_000)} – ${f(100_000)}` },
                    { v: "100", label: `Over ${f(100_000)}`           },
                  ];
                  return (
                    <div>
                      <h2 className="text-4xl sm:text-5xl font-black text-[#0D0D0D] mb-3 leading-tight tracking-tight">{t.quizQ3Title}</h2>
                      <p className="text-gray-500 text-sm mb-1">{t.quizQ3Desc}</p>
                      {cur.code !== "USD" && (
                        <p className="text-xs text-[#FF4757] font-semibold mb-8">
                          Showing amounts in {cur.code} (approx.)
                        </p>
                      )}
                      {cur.code === "USD" && <div className="mb-8" />}
                      <div className="space-y-2.5 mb-2">
                        {tiers.map(({ v, label }) => (
                          <OptionButton key={v} selected={p.budget === v} onClick={() => set("budget", v as BudgetRange)}>
                            <span className="font-bold text-sm">{label}</span>
                          </OptionButton>
                        ))}
                      </div>
                      <NavButtons onBack={back} onNext={next} disabled={!p.budget} t={t} />
                    </div>
                  );
                })()}

                {/* Step 4: Age */}
                {step === 4 && (
                  <div>
                    <h2 className="text-4xl sm:text-5xl font-black text-[#0D0D0D] mb-3 leading-tight tracking-tight">{t.quizQ4Title}</h2>
                    <p className="text-gray-500 text-sm mb-8">{t.quizQ4Desc}</p>
                    <div className="space-y-2.5 mb-2">
                      {[
                        { v: "18-24", label: "18–24"          },
                        { v: "25-30", label: "25–30"          },
                        { v: "31-35", label: "31–35"          },
                        { v: "36-40", label: "36–40"          },
                        { v: "40+",   label: t.quizAge40Label },
                      ].map(({ v, label }) => (
                        <OptionButton key={v} selected={p.age === v} onClick={() => set("age", v as AgeRange)}>
                          <span className="font-bold text-sm">{label}</span>
                        </OptionButton>
                      ))}
                    </div>
                    <NavButtons onBack={back} onNext={next} disabled={!p.age} t={t} />
                  </div>
                )}

                {/* Step 5: Education */}
                {step === 5 && (
                  <div>
                    <h2 className="text-4xl sm:text-5xl font-black text-[#0D0D0D] mb-3 leading-tight tracking-tight">{t.quizQ5Title}</h2>
                    <p className="text-gray-500 text-sm mb-8">{t.quizQ5Desc}</p>
                    <div className="space-y-2.5 mb-2">
                      {[
                        { v: "highschool", label: t.quizEduHighschool },
                        { v: "bachelor",   label: t.quizEduBachelor   },
                        { v: "master",     label: t.quizEduMaster     },
                        { v: "phd",        label: t.quizEduPhd        },
                      ].map(({ v, label }) => (
                        <OptionButton key={v} selected={p.education === v} onClick={() => set("education", v as EducationLevel)}>
                          <span className="font-bold text-sm">{label}</span>
                        </OptionButton>
                      ))}
                    </div>
                    <NavButtons onBack={back} onNext={next} disabled={!p.education} t={t} />
                  </div>
                )}

                {/* Step 6: Experience + Languages */}
                {step === 6 && (
                  <div>
                    <h2 className="text-4xl sm:text-5xl font-black text-[#0D0D0D] mb-3 leading-tight tracking-tight">{t.quizQ6Title}</h2>
                    <p className="text-gray-500 text-sm mb-8">{t.quizQ6Desc}</p>

                    <p className="text-sm font-bold text-[#0D0D0D] mb-3">{t.quizExpLabel}</p>
                    <div className="grid grid-cols-2 gap-2.5 mb-10">
                      {([
                        { v: "0-1", label: t.quizExp01 },
                        { v: "2-4", label: t.quizExp24 },
                        { v: "5-9", label: t.quizExp59 },
                        { v: "10+", label: t.quizExp10 },
                      ] as { v: ExperienceRange; label: string }[]).map(({ v, label }) => (
                        <button
                          key={v}
                          type="button"
                          onClick={() => set("experience", v)}
                          className={`py-3 px-4 rounded-xl border-2 text-sm font-bold transition-all ${
                            p.experience === v
                              ? "border-[#FF4757] bg-[#FFF0F1] text-[#0D0D0D]"
                              : "border-gray-100 bg-white text-gray-700 hover:border-gray-200 hover:bg-gray-50"
                          }`}
                        >
                          {label}
                        </button>
                      ))}
                    </div>

                    <p className="text-sm font-bold text-[#0D0D0D] mb-1">{t.quizLangLabel}</p>
                    <p className="text-xs text-gray-400 mb-4">{t.quizLangDesc}</p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {LANGUAGES.map(({ name, flag }) => {
                        const selected = langs.includes(name);
                        return (
                          <button
                            key={name}
                            type="button"
                            onClick={() => toggleLang(name)}
                            className={`flex items-center gap-1.5 px-3 py-2 rounded-full border-2 text-sm font-bold transition-all ${
                              selected
                                ? "border-[#FF4757] bg-[#FF4757] text-white"
                                : "border-gray-100 bg-white text-gray-700 hover:border-gray-200"
                            }`}
                          >
                            <span className="leading-none">{flag}</span>
                            <span>{name}</span>
                          </button>
                        );
                      })}
                    </div>

                    <NavButtons
                      onBack={back}
                      onNext={next}
                      disabled={!p.experience || langs.length === 0}
                      isLast
                      t={t}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
