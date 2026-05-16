# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # Start dev server on http://localhost:5200
npm run build      # Production build
npm run lint       # Run ESLint
npm run translate  # Run translation script (scripts/translate-countries.ts)
```

## Architecture

Next.js 16 App Router project with TypeScript and Tailwind CSS v4. React 19.

- `app/` — App Router pages and layouts. Add new routes as folders with `page.tsx`.
- `app/components/` — Shared UI components.
- `app/api/` — API route handlers (translate, quiz-submission).
- `data/` — All country data as JSON files. No database — read via `fs.readFileSync` in Server Components.
- `data/translations/{lang}/{country}.json` — Pre-translated country data for 13 languages.
- `lib/` — Shared types, context providers, utilities, Supabase client.
- `scripts/` — One-off data scripts (add countries, fix data, batch translate).

## Routes

| Route | File | Notes |
|-------|------|-------|
| `/` | `app/page.tsx` | Redirects to `/quiz` |
| `/quiz` | `app/quiz/page.tsx` → `QuizClient.tsx` | 6-step immigration matching quiz |
| `/quiz/results` | `app/quiz/results/page.tsx` | Saved results from `localStorage.quizProfile` |
| `/browse` | `app/browse/page.tsx` → `HomeClient.tsx` | 37 countries grouped by region |
| `/:countryId` | `app/[countryId]/page.tsx` → `CountryDetail.tsx` | Country immigration guide |
| `/compare` | `app/compare/page.tsx` → `CompareClient.tsx` | Side-by-side comparison via `?ids=` query param |

## Key components

- **QuizClient.tsx** — 6-question quiz (citizenship, path, budget, age, education, experience+languages). Scores 17 countries on a 0–100 scale. Saves profile to `localStorage.quizProfile` and fires quiz-submission to Supabase.
- **HomeClient.tsx** — Browse grid of all 37 countries with add-to-compare buttons.
- **CountryDetail.tsx** — Detailed country guide with PR/citizenship routes, step-by-step flow, visa detail modals.
- **CompareClient.tsx** — Grid comparison of PR routes, citizenship routes, and criteria for 2–3 countries.
- **CompareBar.tsx** — Sticky bottom bar for building a compare selection (max 3 countries).
- **Nav.tsx** — Sticky header with Browse/Quiz links and language switcher.
- **TX.tsx** — Translation wrapper: wraps English text, fetches via `/api/translate`, caches in `localStorage` with hash keys, deduplicates in-flight requests, queues with 80ms delay.
- `lib/languageContext.tsx` — `LanguageProvider` + `useLanguage()` hook; persists to `localStorage`.
- `lib/compareContext.tsx` — `CompareProvider` + `useCompare()` hook; manages up to 3 selected country IDs.

## Data layer

- **`data/countries.json`** — Array of 37 `Country` objects. Read server-side only via `lib/data.ts`.
- **`lib/types.ts`** — TypeScript types: `Country`, `ImmigrationPath`, `Route`, `VisaDetail`.
- `probabilityToPR` / `probabilityToCitizenship` are integers 0–100, or `-1` for N/A.

## Translation system (two-tier)

1. **Pre-translated static files** (`data/translations/{lang}/{country}.json`) — loaded server-side in `CountryDetail` via `lib/countryTranslations.ts`. Covers 13 languages for supported countries.
2. **On-demand via `TX` component** — calls `/api/translate` (Google Translate GTX endpoint) at runtime. Results cached in `localStorage` as `t:{lang}:{hash}`. Falls back to original English on error.

Supported language codes: `en`, `zh`, `hi`, `vi`, `ar`, `ru`, `es`, `ko`, `ja`, `pt`, `fr`, `tl`, `bn`.

## API routes

- **`POST /api/translate`** — Proxies to Google Translate. Body: `{ text, targetLang }`. Returns `{ translated }`. Retries once on failure; returns original text on error.
- **`POST /api/quiz-submission`** — Saves quiz responses to Supabase `quiz_submissions` table. Fire-and-forget from the client (errors are caught silently).

## External services

- **Supabase** — Quiz telemetry only (`quiz_submissions` table). Client in `lib/supabase.ts`. Requires `SUPABASE_URL` and `SUPABASE_ANON_KEY` env vars.
- **Google Translate** (GTX endpoint) — Used by `/api/translate` for on-demand translation. No API key required.
- **Vercel Analytics** — Injected in `app/layout.tsx`.

## Key conventions

- **Server Components by default** — fetch and translate data in `async` page/layout components; pass results down as props to Client Components.
- **No client-side data fetching** for country data — always server-side via `fs.readFileSync`.
- **`TX` for UI strings** — wrap any English UI text that should be translatable in `<TX>`. Don't wrap large blocks; those go in pre-translated JSON files.
- Port is hardcoded to **5200** in the dev script.

## Data rules for every country added

Every country entry in `data/countries.json` **must** include a student visa → PR pipeline route as the **first** item in `permanentResidence.routes`. Use the country's actual student visa name (e.g. "Study Permit" for Canada, "Student Visa (Tier 4/Student Route)" for UK, "Student Visa" for Australia). The route must have:
- `visaTypes` listing the student permit and the post-study work permit equivalent
- `visaDetails` entries for each visa type with `probabilityToPR`, `probabilityToCitizenship`, `probabilityNote`, full path descriptions, and timelines

See USA ("F-1 Student", "OPT / STEM OPT", "H-1B") and Canada ("Study Permit", "PGWP") as reference implementations.

## Adding a country to the quiz

The quiz scores a hardcoded subset of 17 countries defined in `QuizClient.tsx` as the `COUNTRIES` array. To add a country to the quiz (not just the browse/detail pages), add an entry there with: `pathFit`, `budgetMin`, `budgetFull`, `ageBonus`, `educationMin`, `experienceWeight`, `languageBonus`, `languagePenalty`, `primaryLanguages`, `currencyRate`, `currencyCode`, `currencyLocale`.
