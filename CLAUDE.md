# CLAUDE.md — RL Field Notes

## Project overview
A Next.js 16 static site for new-dad caregiving knowledge. Content lives as MDX/TSX pages under `app/`. Comments powered by Giscus (GitHub Discussions).

## Key directories
- `app/` — pages and routes (App Router)
  - `app/guides/<slug>/page.mdx` — original guides
  - `app/reading-notes/<slug>/page.mdx` — book summaries
  - `app/guides/page.tsx` and `app/reading-notes/page.tsx` — index/listing pages
  - `app/page.tsx` — home page with featured content cards
- `components/` — shared React components (ContentCard, Callout, Badge, Table, GiscusComments, etc.)
- `mdx-components.tsx` — MDX component overrides (maps markdown elements to styled components)

## How to add a new content page
1. Create `app/<section>/<slug>/page.mdx` with MDX content
2. Add a `ContentCard` to the section's index page and optionally to `app/page.tsx`
3. Available MDX components (auto-imported via mdx-components.tsx): Callout, Badge, Source, Table
4. Every content page should include `<GiscusComments />` at the bottom for comments

## Commands
- `npm run dev` — local dev server on :3000
- `npm run build` — production build (all pages are statically generated)
- `npm run lint` — ESLint

## Style conventions
- Tailwind CSS 4 utility classes; color palette is `stone-*` with `amber-*` accents
- Typography plugin (`prose prose-stone`) used for long-form content
- Keep pages mobile-friendly (`max-w-4xl mx-auto px-4 sm:px-6`)

## Deployment
- Vercel auto-deploys on push to `main`
- GitHub repo: Roger-Li/rl-field-notes
