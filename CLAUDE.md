# CLAUDE.md — RL Field Notes

## Project overview
A Next.js 16 statically generated bilingual site for new-dad caregiving knowledge. English routes live at the root, Simplified Chinese routes live under `/zh`. Comments are powered by Giscus (GitHub Discussions).

## Key directories
- `app/` — pages and routes (App Router)
  - `app/(en)/...` — English pages and layouts
  - `app/zh/...` — Simplified Chinese pages and layouts
  - `app/sitemap.ts` — localized sitemap entries
- `content/` — interactive long-form client components used by thin route wrappers
- `components/` — shared React components (ContentCard, Callout, Badge, Table, GiscusComments, etc.)
- `mdx-components.tsx` — MDX component overrides
- `lib/i18n.ts` — locale/path helpers
- `lib/site-copy.ts` — translated shared UI copy
- `lib/content.ts` — content card metadata and public route list

## How to add a new content page
1. Create the English route under `app/(en)/...`; for interactive pages, keep the client component under `content/...` and use a thin server route wrapper in `app/(en)/...`
2. Create the matching Simplified Chinese route under `app/zh/...` using the same slug
3. Add `createPageMetadata(...)` metadata for each locale and add any new public pathname to `publicPagePaths` in `lib/content.ts`
4. Add or update localized card metadata in `lib/content.ts` with a `date` field (YYYY-MM-DD) — the homepage automatically displays all entries sorted by most recent date
5. Every content page should include `<GiscusComments locale="..." term="/english-canonical-path" />` at the bottom so both locales share one discussion thread
6. Do not fall back to English article bodies on Chinese routes; untranslated content should stay unpublished

## Translation workflow
- English is the source of truth
- Chinese content is committed as separate editorial content, not generated at request time
- AI draft + manual review is the intended workflow
- Keep shared UI copy in `lib/site-copy.ts` rather than scattering hardcoded strings through components

## Locale conventions
- English URLs remain unprefixed
- Chinese URLs use `/zh/...`
- Use helpers from `lib/i18n.ts` for localized links and locale switching
- Use `NEXT_PUBLIC_SITE_URL` for canonical URLs and sitemap generation

## MDX and comments
- Available MDX components (auto-imported via `mdx-components.tsx`): `Callout`, `Badge`, `Source`, `DataTable`
- MDX pages can export metadata via `createPageMetadata(...)`
- Giscus mapping is `specific`, not `pathname`; keep the `term` stable across locales

## Commands
- `npm run dev` — local dev server on :3000
- `npm run build` — production build (all pages are statically generated)
- `npm run lint` — ESLint

## TTS audio generation
- Python virtualenv: `source ~/ml-env/bin/activate`
- Install deps: `uv pip install -r scripts/requirements.txt` (also requires `ffmpeg` via Homebrew)
- **English:** Qwen3-TTS (`Qwen/Qwen3-TTS-12Hz-1.7B-CustomVoice`) via mlx-audio, local (~5.3 GB per process), voice: Aiden
- **Chinese:** CosyVoice2 (`FunAudioLLM/CosyVoice2-0.5B`) via SiliconFlow API, voice: anna
- The orchestrator (`scripts/generate-audio.mjs`) routes `zh` to `tts_generate_api.py` (CosyVoice2) and `en` to `tts_generate.py` (Qwen3-TTS)
- API keys for Chinese TTS live in `scripts/.env` (gitignored); see `scripts/.env.example` for template
- Runs up to 4 processes in parallel
- Transcript files live alongside content at `content/<key>/transcript.<locale>.txt`
- Generated MP3s and `manifest.json` go to `public/audio/` (gitignored)
- Commands:
  - `source ~/ml-env/bin/activate && npm run generate-audio` — all articles, both locales
  - `npm run generate-audio -- --only first-week` — single article, both locales
  - `npm run generate-audio -- --only first-week --locale en` — single article, one locale
  - `npm run generate-audio -- --locale zh --force` — regenerate all Chinese audio
  - `npm run generate-audio -- --voice Ryan --force` — override voice, force regen
- TTS model comparison script: `python scripts/tts_compare.py` (see `scripts/.env.example` for API keys)

## Style conventions
- Tailwind CSS 4 utility classes; color palette is `stone-*` with `amber-*` accents
- Typography plugin (`prose prose-stone`) used for long-form content
- Keep pages mobile-friendly (`max-w-4xl mx-auto px-4 sm:px-6`)

## Deployment
- Vercel auto-deploys on push to `main`
- GitHub repo: Roger-Li/rl-field-notes
