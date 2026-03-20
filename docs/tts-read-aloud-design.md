# Read Aloud (TTS) Feature Plan

## Context

The site is a bilingual (EN/ZH) statically-generated Next.js 16 site with 4 articles (8 locale variants). The user wants to add audio narration for all articles with a visible play/pause/stop player. The user has an M5 Max with 128GB unified memory and mlx installed for local TTS generation.

---

## TTS Model: Qwen3-TTS CustomVoice + MLX

**Model: `Qwen/Qwen3-TTS-12Hz-1.7B-CustomVoice`** — named speaker voices for consistent narration across articles.

| Criteria | Qwen3-TTS CustomVoice | Qwen3-TTS Base | Others |
|----------|----------------------|----------------|--------|
| Purpose | Dedicated TTS with named voices | Dedicated TTS (no stable speaker) | Various |
| EN + ZH | Excellent (10+ languages) | Same | Varies |
| MLX support | Yes (`mlx-audio` lib) | Yes | Limited |
| Memory | ~5.3 GB per process on MLX | ~5.3 GB | Varies |
| Voice consistency | Named speakers (Aiden, Vivian, etc.) | Random per segment | Varies |

**Default voices:** Aiden (English — sunny, clear midrange), Vivian (Chinese — bright, slightly edgy). Overridable via `--voice` flag.

**Available speakers:** Aiden, Ryan (EN), Vivian, Serena, Dylan, Uncle_Fu (ZH), Eric (Sichuan), Ono_Anna (JA), Sohee (KO).

**Why CustomVoice over Base:** The Base model uses zero speaker embeddings, resulting in inconsistent voices across paragraphs. CustomVoice ensures the same voice throughout an article.

---

## Architecture: Pre-Generated Audio Files

Since the site is fully static (deployed on Vercel with no server runtime), audio must be **pre-generated locally** and committed to the repo.

```
┌──────────────────┐     ┌──────────────────┐     ┌─────────────────┐
│ transcript.*.txt │ ──▶ │ scripts/         │ ──▶ │ public/audio/   │
│ (manual text)    │     │ generate-audio   │     │ *.mp3 + manifest│
└──────────────────┘     │ (Qwen3-TTS+MLX) │     └─────────────────┘
                         └──────────────────┘              │
                                                           ▼
                                                  ┌─────────────────┐
                                                  │ Vercel CDN      │
                                                  │ static serving   │
                                                  └─────────────────┘
```

### Why plain-text transcripts (not automated extraction)

- TSX client components have state-dependent, inline-styled text — automated extraction is fragile
- Tables should be narrated naturally ("For newborns zero to two weeks, expect six to ten feeds per day"), not cell-by-cell
- Interactive calculator outputs shouldn't be read
- Only 4 articles (growing slowly) — manual transcripts take ~30 min each and give full editorial control
- Transcripts double as accessible plain-text versions of each article

---

## Implementation Steps

### Step 1: Audio Player Component

**Create `components/AudioPlayer.tsx`** — a `"use client"` component.

**Props:**
```typescript
type AudioPlayerProps = {
  locale: Locale;
  contentKey: ContentEntryKey;
};
```

Derives audio URL: `/audio/${contentKey.replace(/\//g, '--')}--${locale}.mp3`

**UI Design (3 states):**

1. **Idle** — Compact bar below article title
   - Speaker icon + "Listen to this article" + estimated duration (e.g., "~8 min")
   - Style: `bg-stone-50 border border-stone-200 rounded-lg` with amber play icon

2. **Playing/Paused** — Expanded inline player
   - Play/Pause button (amber accent when playing)
   - Seekable progress bar (`bg-amber-500` fill on `bg-stone-200` track)
   - Current time / total time display
   - Speed toggle: 1x / 1.5x / 2x (small pill buttons)
   - Style: `bg-amber-50/50 border border-amber-200 rounded-lg`

3. **Sticky bottom bar** — When inline player scrolls out of view during playback
   - `fixed bottom-0 left-0 right-0 z-40` (below header's z-50)
   - Compact: play/pause + truncated title + mini progress bar + close
   - Uses `IntersectionObserver` to toggle visibility
   - Only appears while playing/paused, never in idle state

**Technical details:**
- Native HTML5 `<audio>` element (hidden), controlled via React refs
- `preload="none"` — don't fetch audio until user clicks play
- `sessionStorage` keyed by `${contentKey}--${locale}` to remember position across page navigations
- `playbackRate` for speed control
- Graceful degradation: if MP3 doesn't exist, hide the player entirely (fetch HEAD check or manifest lookup)

### Step 2: Bilingual Labels

**Modify `lib/site-copy.ts`** — add `audioPlayer` section:

```typescript
audioPlayer: {
  listen: string;       // "Listen to this article" / "收听本文"
  play: string;         // "Play" / "播放"
  pause: string;        // "Pause" / "暂停"
  speed: string;        // "Speed" / "速度"
  minutes: string;      // "min" / "分钟"
  resume: string;       // "Resume" / "继续播放"
}
```

### Step 3: Register in MDX + Integrate into All Pages

**Modify `mdx-components.tsx`** — add `AudioPlayer` to the component map.

**Modify 8 content files** to insert `<AudioPlayer>` after the title:

| File | Type |
|------|------|
| `content/guides/first-week/FirstWeekGuideEn.tsx` | Client component |
| `content/guides/first-week/FirstWeekGuideZh.tsx` | Client component |
| `content/guides/formula-feeding/FormulaFeedingGuideEn.tsx` | Client component |
| `content/guides/formula-feeding/FormulaFeedingGuideZh.tsx` | Client component |
| `content/reading-notes/happiest-baby-on-the-block/HappiestBabyEn.tsx` | Client component |
| `content/reading-notes/happiest-baby-on-the-block/HappiestBabyZh.tsx` | Client component |
| `app/(en)/reading-notes/twelve-hours-sleep/page.mdx` | MDX |
| `app/zh/reading-notes/twelve-hours-sleep/page.mdx` | MDX |

Placement: right below the `<h1>` title, before the first content section.

### Step 4: Transcript Files

**Create 8 transcript files** alongside content:

```
content/guides/first-week/transcript.en.txt
content/guides/first-week/transcript.zh.txt
content/guides/formula-feeding/transcript.en.txt
content/guides/formula-feeding/transcript.zh.txt
content/reading-notes/happiest-baby-on-the-block/transcript.en.txt
content/reading-notes/happiest-baby-on-the-block/transcript.zh.txt
content/reading-notes/twelve-hours-sleep/transcript.en.txt
content/reading-notes/twelve-hours-sleep/transcript.zh.txt
```

Each transcript is plain text with natural narration phrasing. Includes headings, paragraphs, callout text (prefixed "Note:" / "Tip:"), table data as natural sentences. Excludes: source URLs, interactive calculator I/O, GiscusComments, navigation elements.

### Step 5: Audio Generation Pipeline

**`scripts/tts_generate.py`:**
- Accepts `--input <transcript.txt> --output <output.mp3> --lang <en|zh> [--voice <name>]`
- Uses `mlx-audio` with Qwen3-TTS-1.7B-CustomVoice
- Merges short paragraphs into ~800-char chunks (headings attach to body for natural prosody)
- Calls `model.generate()` directly — audio collected in memory, no intermediate WAV files per chunk
- Inserts 0.4s silence between merged chunks (section boundaries)
- Concatenates and exports as MP3 (128kbps, 24kHz) via ffmpeg

**`scripts/generate-audio.mjs`:**
- Orchestrates parallel TTS generation (up to 4 processes, ~5.3 GB each)
- For each key + locale: checks transcript exists, checks if audio is stale (mtime comparison)
- Spawns Python subprocess per file, batched for parallelism
- Writes `public/audio/manifest.json` with duration + size per file
- CLI flags: `--only <substring>` to filter articles, `--voice <name>` to override, `--force` to regenerate

**`scripts/requirements.txt`:** `mlx-audio`

**`package.json`:** `"generate-audio": "node scripts/generate-audio.mjs"`

**Example commands:**
```bash
source ~/ml-env/bin/activate
npm run generate-audio                                      # all articles, both locales
npm run generate-audio -- --only first-week                 # single article, both locales
npm run generate-audio -- --only first-week --locale en     # single article, one locale
npm run generate-audio -- --voice Ryan --force              # override voice, force regen
```

### Step 6: Audio File Storage

- MP3 files go in `public/audio/` — served by Vercel CDN automatically
- Naming: `guides--first-week--en.mp3` (double-dash separator for path segments)
- Manifest: `public/audio/manifest.json` with duration/size metadata
- Estimated total size: ~40-120MB for 8 files (well within Vercel limits)
- Committed to git for now; migrate to Git LFS or Vercel Blob if >20 articles

---

## Files Summary

**New files (14):**
- `components/AudioPlayer.tsx` — Player component
- `scripts/generate-audio.mjs` — Node.js orchestrator
- `scripts/tts_generate.py` — Python TTS wrapper
- `scripts/requirements.txt` — Python deps
- `content/*/transcript.en.txt` (4 files) — English transcripts
- `content/*/transcript.zh.txt` (4 files) — Chinese transcripts
- `public/audio/manifest.json` — Generated metadata

**Modified files (11):**
- `lib/site-copy.ts` — Add `audioPlayer` labels
- `lib/content.ts` — Optional: add `hasAudio` field
- `mdx-components.tsx` — Register `AudioPlayer`
- 6 content TSX files — Insert `<AudioPlayer>`
- 2 MDX files — Insert `<AudioPlayer>`
- `package.json` — Add `generate-audio` script

---

## Verification

1. **UI**: `npm run dev` — verify player renders on all 8 article pages, test play/pause/seek/speed with a dummy MP3
2. **Styling**: Check mobile + desktop, verify sticky bottom bar appears/disappears correctly, verify z-index layering with header
3. **Audio generation**: `npm run generate-audio` — verify all 8 MP3s are generated, listen to samples for quality
4. **Build**: `npm run build` — verify static generation succeeds with audio files in `public/`
5. **Bilingual**: Test both EN and ZH player labels and audio files
6. **Edge cases**: Test with slow connection (preload=none), test sessionStorage resume, test Safari playbackRate
