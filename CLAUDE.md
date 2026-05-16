# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start dev server on http://localhost:5200
npm run build    # Production build
npm run lint     # Run ESLint
```

## Architecture

Next.js 16 App Router project with TypeScript and Tailwind CSS v4.

- `app/` — App Router pages and layouts. Add new routes as folders with `page.tsx`.
- `app/components/` — Shared UI components.
- `data/` — All app data lives here as JSON files. No database — read/write JSON directly in Server Components or API routes using `fs`.

## Key conventions

- **Data layer**: JSON files in `data/`. Read them server-side in Server Components (`async` page/component + `fs.readFileSync`). Mutate via `app/api/` route handlers that write back to the JSON files.
- **No client-side data fetching** unless the component genuinely needs interactivity — prefer Server Components by default.
- `react-simple-maps` and `d3-scale` are installed for map rendering and color scaling.
- Port is hardcoded to **5200** in the dev script.

## Data rules for every country added

Every country entry in `data/countries.json` **must** include a student visa → PR pipeline route as the **first** item in `permanentResidence.routes`. Use the country's actual student visa name (e.g. "Study Permit" for Canada, "Student Visa (Tier 4/Student Route)" for UK, "Student Visa" for Australia). The route must have:
- `visaTypes` listing the student permit and the post-study work permit equivalent
- `visaDetails` entries for each visa type with `probabilityToPR`, `probabilityToCitizenship`, `probabilityNote`, full path descriptions, and timelines

See USA ("F-1 Student", "OPT / STEM OPT", "H-1B") and Canada ("Study Permit", "PGWP") as reference implementations.
