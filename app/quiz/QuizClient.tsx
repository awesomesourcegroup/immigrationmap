"use client";

import { useState } from "react";
import Link from "next/link";

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
  // Language model
  primaryLang: string;          // the dominant working/study language
  englishSufficient: boolean;   // can you realistically work/study in English alone?
  langBoost: number;            // 1–10: how much knowing the primary language helps
  langNote: string;             // plain-English note about language reality
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
    bestRoute: "Study → PGWP → Express Entry",
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
    bestRoute: "Employment Pass → PR Application",
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
    bestRoute: "Student Visa → APS (Stay) → Work Permit",
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
    bestRoute: "Student Visa → Work Visa → PR",
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
    bestRoute: "D-2 Student → D-10 Job Search → E-7 Work",
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
    bestRoute: "F-1 Student → OPT/STEM OPT → H-1B (lottery) → Green Card",
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

interface Profile {
  citizenship: string;
  path: PathChoice;
  budget: BudgetRange;
  age: AgeRange;
  education: EducationLevel;
  experience: ExperienceRange;
  languages: string[];   // list of language names the user speaks
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

  // 1. Path fit (28 pts)
  const pathFit =
    p.path === "student" ? c.studentScore :
    p.path === "worker"  ? c.workerScore :
    (c.studentScore + c.workerScore) / 2;
  score += (pathFit / 10) * 28;

  // 2. Budget fit (22 pts)
  const required =
    p.path === "student" ? c.minBudgetStudent :
    p.path === "worker"  ? c.minBudgetWorker :
    Math.min(c.minBudgetStudent, c.minBudgetWorker);
  if (budget >= required)             score += 22;
  else if (budget >= required * 0.75) score += 12;
  else if (budget >= required * 0.5)  score += 5;

  // 3. Education (13 pts)
  const eduPts: Record<EducationLevel, number> = {
    highschool: 4, bachelor: 9, master: 12, phd: 13,
  };
  score += eduPts[p.education];

  // 4. Age (12 pts)
  if (c.ageBonus || c.pointsBased) {
    if (age >= 25 && age <= 35)      score += 12;
    else if (age >= 22 && age <= 39) score += 8;
    else                             score += 3;
  } else {
    score += 8;
  }

  // 5. Work experience (8 pts)
  const expPts: Record<ExperienceRange, number> = {
    "0-1": 2, "2-4": 4, "5-9": 6, "10+": 8,
  };
  score += expPts[p.experience];

  // 6. Language fit (17 pts) — the most nuanced section
  if (c.englishSufficient) {
    // English alone works here
    if (speaksEnglish) score += 10;
    else               score -= 15;   // hard block
    // Bonus for speaking the primary language (if it's not English)
    if (c.primaryLang !== "English" && speaksPrimary) {
      score += (c.langBoost / 10) * 7; // up to +7 bonus
    }
  } else {
    // English alone is NOT sufficient — primary language matters a lot
    if (speaksPrimary) {
      score += 15;  // huge boost — they can actually function here
      if (speaksEnglish) score += 2; // English is a nice-to-have extra
    } else if (speaksEnglish) {
      // English only but country doesn't run on English
      score += 3;   // minimal — very narrow options
      score -= Math.round((c.langBoost / 10) * 8); // penalty scaled by how critical local lang is
    } else {
      score -= 20;  // neither English nor local language — very hard
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

// ─── Other question data ──────────────────────────────────────────────────────

const CITIZENSHIPS = [
  "India", "China", "Philippines", "Nigeria", "Brazil", "Mexico", "Pakistan",
  "Bangladesh", "Vietnam", "Indonesia", "Egypt", "Turkey", "Iran", "Morocco",
  "Colombia", "South Africa", "Kenya", "Ghana", "Ethiopia", "Ukraine",
  "Russia", "United States", "United Kingdom", "Australia", "Canada",
  "South Korea", "Japan", "Other",
];

// ─── UI components ────────────────────────────────────────────────────────────

function ProgressBar({ step, total }: { step: number; total: number }) {
  return (
    <div className="w-full h-1.5 bg-gray-200 rounded-full mb-8">
      <div
        className="h-full bg-orange-500 rounded-full transition-all duration-500"
        style={{ width: `${(step / total) * 100}%` }}
      />
    </div>
  );
}

function OptionButton({ selected, onClick, children }: {
  selected: boolean; onClick: () => void; children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full text-left px-5 py-4 rounded-xl border-2 font-medium transition-colors duration-100 ${
        selected
          ? "border-orange-500 bg-orange-50 text-orange-800"
          : "border-gray-200 bg-white text-gray-700 hover:border-orange-300"
      }`}
    >
      {children}
    </button>
  );
}

// ─── Results ──────────────────────────────────────────────────────────────────

function ScoreBadge({ score }: { score: number }) {
  const { color, label } =
    score >= 80 ? { color: "bg-green-500",  label: "Excellent fit" } :
    score >= 65 ? { color: "bg-blue-500",   label: "Good fit"      } :
    score >= 45 ? { color: "bg-amber-500",  label: "Possible"      } :
                  { color: "bg-red-400",    label: "Challenging"   };
  return (
    <div className="flex items-center gap-2 flex-shrink-0">
      <span className={`text-white text-sm font-bold px-3 py-1 rounded-full ${color}`}>
        {score}%
      </span>
      <span className="text-xs text-gray-500 hidden sm:inline">{label}</span>
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

function ResultCard({ c, score, path }: { c: CountryData; score: number; path: PathChoice }) {
  const [open, setOpen] = useState(false);
  const isStudent = path !== "worker";

  return (
    <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <button
        type="button"
        onClick={() => setOpen(v => !v)}
        className="w-full flex items-center gap-4 px-5 py-4 text-left"
      >
        <span className="text-4xl flex-shrink-0">{c.flag}</span>
        <div className="flex-1 min-w-0">
          <p className="font-bold text-gray-900 text-base">{c.name}</p>
          <p className="text-xs text-gray-500 truncate">{c.bestRoute}</p>
        </div>
        <ScoreBadge score={score} />
        <span className="text-gray-400 text-lg ml-1">{open ? "▴" : "▾"}</span>
      </button>

      {open && (
        <div className="px-5 pb-5 border-t border-gray-100 pt-4 space-y-4">
          {/* Cost breakdown */}
          <div className="bg-gray-50 rounded-xl p-4">
            <p className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-3">Estimated Costs (USD)</p>
            <CostRow label="Monthly living (rent + food + transport)" value={`$${c.livingCostMin.toLocaleString()} – $${c.livingCostMax.toLocaleString()}`} />
            {isStudent && (
              <CostRow label="Annual tuition" value={`$${c.tuitionMin.toLocaleString()} – $${c.tuitionMax.toLocaleString()}`} />
            )}
            <CostRow label="Government / visa fees" value={`~$${c.govFees.toLocaleString()}`} />
            {path !== "student" && (
              <CostRow label="Required settlement funds" value={`~$${c.settlementFunds.toLocaleString()}`} />
            )}
            <CostRow
              label={isStudent ? "First year minimum budget" : "Minimum to get started"}
              value={`$${(isStudent ? c.minBudgetStudent : c.minBudgetWorker).toLocaleString()}`}
            />
          </div>

          {/* Key info grid */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-blue-50 rounded-xl p-3">
              <p className="text-[10px] font-bold uppercase tracking-wider text-blue-500 mb-1">Timeline to PR</p>
              <p className="text-sm font-semibold text-blue-900">{c.prTimeline}</p>
            </div>
            <div className={`rounded-xl p-3 ${c.englishSufficient ? "bg-green-50" : "bg-amber-50"}`}>
              <p className={`text-[10px] font-bold uppercase tracking-wider mb-1 ${c.englishSufficient ? "text-green-600" : "text-amber-600"}`}>
                English alone
              </p>
              <p className={`text-sm font-semibold ${c.englishSufficient ? "text-green-900" : "text-amber-900"}`}>
                {c.englishSufficient ? "Sufficient ✓" : `${c.primaryLang} needed`}
              </p>
            </div>
          </div>

          {/* Language reality box */}
          <div className="bg-orange-50 border border-orange-100 rounded-xl p-3">
            <p className="text-[10px] font-bold uppercase tracking-wider text-orange-600 mb-1">🗣 Language reality</p>
            <p className="text-xs text-gray-700 leading-relaxed">{c.langNote}</p>
          </div>

          <p className="text-sm text-gray-600 leading-relaxed">{c.note}</p>

          <Link
            href={`/${c.id}`}
            className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold rounded-xl transition-colors"
          >
            View full immigration guide →
          </Link>
        </div>
      )}
    </div>
  );
}

function Results({ profile }: { profile: Profile }) {
  const scored = COUNTRIES
    .map(c => ({ c, score: scoreCountry(c, profile) }))
    .sort((a, b) => b.score - a.score);

  return (
    <div>
      <div className="text-center mb-8">
        <span className="text-5xl">🌍</span>
        <h2 className="text-2xl font-extrabold text-gray-900 mt-3">Your immigration matches</h2>
        <p className="text-gray-500 text-sm mt-1">Tap any country to see full cost breakdown and language reality</p>
      </div>
      <div className="space-y-3 mb-8">
        {scored.map(({ c, score }, i) => (
          <div key={c.id} className="flex items-start gap-3">
            <span className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold mt-3.5 ${
              i === 0 ? "bg-yellow-400 text-yellow-900" :
              i === 1 ? "bg-gray-300 text-gray-700" :
              i === 2 ? "bg-amber-600 text-white" : "bg-gray-100 text-gray-500"
            }`}>
              {i + 1}
            </span>
            <div className="flex-1">
              <ResultCard c={c} score={score} path={profile.path} />
            </div>
          </div>
        ))}
      </div>
      <Link
        href="/"
        className="flex items-center justify-center gap-2 w-full py-3 rounded-xl border-2 border-gray-200 text-gray-600 font-semibold hover:border-orange-400 hover:text-orange-600 transition-colors"
      >
        ← Browse all countries
      </Link>
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────

const TOTAL_STEPS = 7;

export default function QuizClient() {
  const [step, setStep] = useState(0);
  const [profile, setProfile] = useState<Partial<Profile>>({ languages: [] });

  function set<K extends keyof Profile>(key: K, value: Profile[K]) {
    setProfile(p => ({ ...p, [key]: value }));
  }

  function toggleLang(lang: string) {
    setProfile(p => {
      const langs = p.languages ?? [];
      return {
        ...p,
        languages: langs.includes(lang)
          ? langs.filter(l => l !== lang)
          : [...langs, lang],
      };
    });
  }

  function next() { setStep(s => s + 1); }
  function back() { setStep(s => s - 1); }

  const p = profile as Profile;
  const langs = p.languages ?? [];

  if (step === TOTAL_STEPS) {
    return (
      <main className="min-h-screen bg-gray-50 px-4 py-10">
        <div className="max-w-2xl mx-auto">
          <Results profile={p} />
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="max-w-lg mx-auto">
        <Link href="/" className="text-sm text-gray-400 hover:text-gray-700 mb-6 inline-block">← Back to countries</Link>
        <ProgressBar step={step} total={TOTAL_STEPS} />

        {/* Step 0: Intro */}
        {step === 0 && (
          <div className="text-center">
            <span className="text-6xl">🌍</span>
            <h1 className="text-3xl font-extrabold text-gray-900 mt-4 mb-3">Which country can I immigrate to?</h1>
            <p className="text-gray-500 mb-8">Answer 6 quick questions. We'll rank every country by how realistically you can immigrate there — and show you exactly what it'll cost.</p>
            <button type="button" onClick={next} className="w-full py-4 bg-orange-500 hover:bg-orange-600 text-white font-bold text-lg rounded-2xl transition-colors">
              Start the quiz →
            </button>
          </div>
        )}

        {/* Step 1: Citizenship */}
        {step === 1 && (
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-orange-500 mb-2">Question 1 of 6</p>
            <h2 className="text-2xl font-extrabold text-gray-900 mb-1">Where are you currently from?</h2>
            <p className="text-gray-500 text-sm mb-6">Your current citizenship affects visa requirements and eligibility.</p>
            <select
              value={p.citizenship ?? ""}
              onChange={e => set("citizenship", e.target.value)}
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 text-gray-800 font-medium bg-white mb-6 focus:border-orange-400 focus:outline-none"
            >
              <option value="">Select your country...</option>
              {CITIZENSHIPS.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <div className="flex gap-3">
              <button type="button" onClick={back} className="px-5 py-3 rounded-xl border-2 border-gray-200 text-gray-600 font-semibold">Back</button>
              <button type="button" onClick={next} disabled={!p.citizenship} className="flex-1 py-3 bg-orange-500 hover:bg-orange-600 disabled:opacity-40 text-white font-bold rounded-xl transition-colors">Next →</button>
            </div>
          </div>
        )}

        {/* Step 2: Path */}
        {step === 2 && (
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-orange-500 mb-2">Question 2 of 6</p>
            <h2 className="text-2xl font-extrabold text-gray-900 mb-1">How do you plan to start?</h2>
            <p className="text-gray-500 text-sm mb-6">This shapes which visa routes we prioritize for you.</p>
            <div className="space-y-3 mb-6">
              {[
                { v: "student", icon: "🎓", label: "As a student",          sub: "Study first, work later" },
                { v: "worker",  icon: "💼", label: "Directly as a worker",  sub: "Job offer or skilled worker visa" },
                { v: "both",    icon: "🔄", label: "Open to both",          sub: "Show me all options" },
              ].map(({ v, icon, label, sub }) => (
                <OptionButton key={v} selected={p.path === v} onClick={() => set("path", v as PathChoice)}>
                  <span className="text-xl mr-3">{icon}</span>{label}
                  <span className="block text-xs text-gray-400 mt-0.5 ml-8">{sub}</span>
                </OptionButton>
              ))}
            </div>
            <div className="flex gap-3">
              <button type="button" onClick={back} className="px-5 py-3 rounded-xl border-2 border-gray-200 text-gray-600 font-semibold">Back</button>
              <button type="button" onClick={next} disabled={!p.path} className="flex-1 py-3 bg-orange-500 hover:bg-orange-600 disabled:opacity-40 text-white font-bold rounded-xl transition-colors">Next →</button>
            </div>
          </div>
        )}

        {/* Step 3: Budget */}
        {step === 3 && (
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-orange-500 mb-2">Question 3 of 6</p>
            <h2 className="text-2xl font-extrabold text-gray-900 mb-1">What's your total budget?</h2>
            <p className="text-gray-500 text-sm mb-6">Include savings you can allocate for fees, tuition, and living costs.</p>
            <div className="space-y-3 mb-6">
              {[
                { v: "5",   label: "Under $10,000",       sub: "Very limited — only a few countries are realistic" },
                { v: "15",  label: "$10,000 – $25,000",   sub: "Enough for affordable European countries (Germany, Portugal)" },
                { v: "30",  label: "$25,000 – $50,000",   sub: "Unlocks Canada, Australia, New Zealand" },
                { v: "60",  label: "$50,000 – $100,000",  sub: "Comfortable for most English-speaking countries" },
                { v: "100", label: "Over $100,000",       sub: "All countries accessible including USA" },
              ].map(({ v, label, sub }) => (
                <OptionButton key={v} selected={p.budget === v} onClick={() => set("budget", v as BudgetRange)}>
                  <span className="font-bold">{label}</span>
                  <span className="block text-xs text-gray-400 mt-0.5">{sub}</span>
                </OptionButton>
              ))}
            </div>
            <div className="flex gap-3">
              <button type="button" onClick={back} className="px-5 py-3 rounded-xl border-2 border-gray-200 text-gray-600 font-semibold">Back</button>
              <button type="button" onClick={next} disabled={!p.budget} className="flex-1 py-3 bg-orange-500 hover:bg-orange-600 disabled:opacity-40 text-white font-bold rounded-xl transition-colors">Next →</button>
            </div>
          </div>
        )}

        {/* Step 4: Age */}
        {step === 4 && (
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-orange-500 mb-2">Question 4 of 6</p>
            <h2 className="text-2xl font-extrabold text-gray-900 mb-1">How old are you?</h2>
            <p className="text-gray-500 text-sm mb-6">Many points-based immigration systems favor applicants under 35.</p>
            <div className="space-y-3 mb-6">
              {[
                { v: "18-24", label: "18–24",   sub: "Maximum age advantage in points-based systems" },
                { v: "25-30", label: "25–30",   sub: "Prime range — full points in most systems" },
                { v: "31-35", label: "31–35",   sub: "Still strong — good balance of experience and age" },
                { v: "36-40", label: "36–40",   sub: "Reduced age points but experience compensates" },
                { v: "40+",   label: "Over 40", sub: "Some routes limited; employer-sponsored paths still open" },
              ].map(({ v, label, sub }) => (
                <OptionButton key={v} selected={p.age === v} onClick={() => set("age", v as AgeRange)}>
                  <span className="font-bold">{label}</span>
                  <span className="block text-xs text-gray-400 mt-0.5">{sub}</span>
                </OptionButton>
              ))}
            </div>
            <div className="flex gap-3">
              <button type="button" onClick={back} className="px-5 py-3 rounded-xl border-2 border-gray-200 text-gray-600 font-semibold">Back</button>
              <button type="button" onClick={next} disabled={!p.age} className="flex-1 py-3 bg-orange-500 hover:bg-orange-600 disabled:opacity-40 text-white font-bold rounded-xl transition-colors">Next →</button>
            </div>
          </div>
        )}

        {/* Step 5: Education */}
        {step === 5 && (
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-orange-500 mb-2">Question 5 of 6</p>
            <h2 className="text-2xl font-extrabold text-gray-900 mb-1">Highest education level?</h2>
            <p className="text-gray-500 text-sm mb-6">Higher degrees unlock more routes and boost points scores.</p>
            <div className="space-y-3 mb-6">
              {[
                { v: "highschool", icon: "📘", label: "High school diploma", sub: "Limits points-based routes; trade skills can compensate" },
                { v: "bachelor",   icon: "🎓", label: "Bachelor's degree",   sub: "Qualifies for most skilled worker programs" },
                { v: "master",     icon: "🏅", label: "Master's degree",     sub: "Strong advantage in points-based systems" },
                { v: "phd",        icon: "🔬", label: "PhD / Doctorate",     sub: "Highest points; opens research and specialist routes" },
              ].map(({ v, icon, label, sub }) => (
                <OptionButton key={v} selected={p.education === v} onClick={() => set("education", v as EducationLevel)}>
                  <span className="text-xl mr-3">{icon}</span><span className="font-bold">{label}</span>
                  <span className="block text-xs text-gray-400 mt-0.5 ml-8">{sub}</span>
                </OptionButton>
              ))}
            </div>
            <div className="flex gap-3">
              <button type="button" onClick={back} className="px-5 py-3 rounded-xl border-2 border-gray-200 text-gray-600 font-semibold">Back</button>
              <button type="button" onClick={next} disabled={!p.education} className="flex-1 py-3 bg-orange-500 hover:bg-orange-600 disabled:opacity-40 text-white font-bold rounded-xl transition-colors">Next →</button>
            </div>
          </div>
        )}

        {/* Step 6: Experience + Languages */}
        {step === 6 && (
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-orange-500 mb-2">Question 6 of 6</p>
            <h2 className="text-2xl font-extrabold text-gray-900 mb-1">Experience & languages</h2>
            <p className="text-gray-500 text-sm mb-5">Language skills have a huge impact — especially for non-English countries.</p>

            <p className="text-sm font-semibold text-gray-700 mb-2">Years of skilled work experience</p>
            <div className="grid grid-cols-2 gap-3 mb-6">
              {(["0-1", "2-4", "5-9", "10+"] as ExperienceRange[]).map(v => (
                <button
                  key={v}
                  type="button"
                  onClick={() => set("experience", v)}
                  className={`py-3 px-4 rounded-xl border-2 text-sm font-semibold transition-colors ${
                    p.experience === v ? "border-orange-500 bg-orange-50 text-orange-800" : "border-gray-200 bg-white text-gray-700"
                  }`}
                >
                  {v === "0-1" ? "0–1 year" : v === "2-4" ? "2–4 years" : v === "5-9" ? "5–9 years" : "10+ years"}
                </button>
              ))}
            </div>

            <p className="text-sm font-semibold text-gray-700 mb-1">Which languages do you speak?</p>
            <p className="text-xs text-gray-400 mb-3">Select all that you can work or study in — you can choose multiple</p>
            <div className="flex flex-wrap gap-2 mb-6">
              {LANGUAGES.map(({ name, flag }) => {
                const selected = langs.includes(name);
                return (
                  <button
                    key={name}
                    type="button"
                    onClick={() => toggleLang(name)}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-full border-2 text-sm font-semibold transition-colors ${
                      selected
                        ? "border-orange-500 bg-orange-500 text-white"
                        : "border-gray-200 bg-white text-gray-700 hover:border-orange-300"
                    }`}
                  >
                    <span>{flag}</span>
                    <span>{name}</span>
                    {selected && <span className="text-xs">✓</span>}
                  </button>
                );
              })}
            </div>

            <div className="flex gap-3">
              <button type="button" onClick={back} className="px-5 py-3 rounded-xl border-2 border-gray-200 text-gray-600 font-semibold">Back</button>
              <button
                type="button"
                onClick={next}
                disabled={!p.experience || langs.length === 0}
                className="flex-1 py-3 bg-orange-500 hover:bg-orange-600 disabled:opacity-40 text-white font-bold rounded-xl transition-colors"
              >
                See my results →
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
