# Immigration Pathway

An interactive guide to immigration pathways, visa requirements, timelines, and citizenship routes for 37 countries. Helps people find the best country to immigrate to based on their profile.

## Features

- **Immigration matching quiz** — 6-question quiz scores 17 countries on a 0–100 scale based on citizenship, path type (student/worker), budget, age, education, and experience
- **Country guides** — Detailed PR and citizenship pathways with step-by-step flows, realistic probability data, timelines, and costs
- **Compare tool** — Side-by-side comparison of 2–3 countries
- **Browse** — All 37 countries organized by region
- **13 languages** — English, Chinese, Hindi, Vietnamese, Arabic, Russian, Spanish, Korean, Japanese, Portuguese, French, Filipino, Bengali

## Getting Started

```bash
npm install
npm run dev   # http://localhost:5200
```

### Environment variables

Create `.env.local`:

```
SUPABASE_URL=...
SUPABASE_ANON_KEY=...
```

Supabase is used only for quiz telemetry (`quiz_submissions` table). The app works without it — errors are caught silently.

## Project structure

```
app/
  quiz/            # 6-step quiz + results page
  browse/          # Country grid
  compare/         # Side-by-side comparison
  [countryId]/     # Country detail pages
  components/      # Nav, TX, CompareBar, RouteIllustrations
  api/
    translate/     # Proxies to Google Translate
    quiz-submission/ # Saves to Supabase
data/
  countries.json           # 37 countries with full immigration data
  translations/{lang}/     # Pre-translated country data (13 languages)
lib/
  types.ts                 # Country, Route, VisaDetail types
  data.ts                  # Server-side data access
  languageContext.tsx      # Language preference (localStorage)
  compareContext.tsx       # Compare selection state
  countryTranslations.ts   # Loads pre-translated JSON files
  supabase.ts              # Supabase client
scripts/
  translate-countries.ts   # Batch translation script
```

## Architecture

Next.js 16 App Router · React 19 · TypeScript · Tailwind CSS v4

**Data flow:** Country data lives in `data/countries.json`. Pages are Server Components that read data with `fs.readFileSync` and pass it to Client Components as props — no client-side data fetching for country data.

**Translation:** Two-tier. Static country content is pre-translated into JSON files under `data/translations/`. Dynamic UI strings use the `<TX>` component, which calls `/api/translate` on demand and caches results in `localStorage`.

**Quiz scoring:** Each of 17 countries has scoring parameters (path fit, budget, age bonus, education, experience, language). The quiz sums weighted scores into a 0–100 result and ranks countries.

## Scripts

```bash
npm run translate   # Batch-translate country data (scripts/translate-countries.ts)
```

One-off data scripts in `scripts/` were used to add countries and fix data — see filenames for context.
