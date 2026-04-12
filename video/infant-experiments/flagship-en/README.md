# Infant Experiments Flagship Video

This bundle contains the YouTube + Bilibili video for the `infant-experiments` article.

## What lives here

### Source files (checked in)

- `script.en.txt` ��� condensed English narration script (~7 minutes)
- `shotlist.csv` — edit timeline (32 shots) with timecodes, visuals, overlays, and narration
- `prompts.md` — Nano Banana prompt pack and overlay specifications for all 12 base plates
- `captions.en.srt` — English captions (short entries, ≤70 chars each)
- `captions.zh.srt` — Chinese captions (short entries, ≤40 chars each)
- `captions.bilibili.ass` — ASS format bilingual subtitles (original 32 entries, used as source of truth for caption text)
- `chapters.txt` — YouTube chapter timestamps
- `youtube.md` — YouTube/Bilibili upload package: title, description, pinned comment, tags, checklist
- `STEP_BY_STEP.md` — exact production workflow from image generation to upload
- `prepare-assets.sh` — ensures folder structure and rebuilds captions/chapters from shotlist
- `render-audio.sh` — renders narration MP3 via Qwen TTS

### Generated assets (gitignored — regenerate with `npm run`)

- `assets/ai-stills/*.png` — 12 Nano Banana base plates (~96 MB, manual generation)
- `assets/keynote-exports/*.png` — 15 overlay composites (~45 MB, code-generated)
- `assets/thumbnail.png` — YouTube thumbnail (code-generated)
- `exports/` — MP3 narration, rough-cut MP4, Bilibili export MP4 (~141 MB)

## Commands

### Full pipeline (overlays + video + thumbnail)

```bash
npm run video:infant-experiments:render
```

### Individual steps

```bash
# Step 0: Ensure folders exist, rebuild captions/chapters from shotlist
npm run video:infant-experiments:prepare

# Step 1: Render narration audio (requires ml-env virtualenv)
npm run video:infant-experiments:audio

# Step 2: Generate 15 overlay composites from AI stills
npm run video:infant-experiments:overlays

# Step 3: Assemble rough-cut MP4 with Ken Burns effects
npm run video:infant-experiments:assemble

# Step 4: Generate YouTube thumbnail
npm run video:infant-experiments:thumbnail
```

### Post-assembly tools

```bash
# Retime shotlist to match actual audio (after TTS, before final assembly)
node scripts/retime-shotlist.mjs --bundle video/infant-experiments/flagship-en

# Burn bilingual subtitles into video for Bilibili
node scripts/burn-bilibili-subs.mjs --bundle video/infant-experiments/flagship-en
```

### Iteration shortcuts

```bash
# Re-render a single shot
node scripts/assemble-video.mjs --bundle video/infant-experiments/flagship-en --shot 14

# Fast draft without Ken Burns
node scripts/assemble-video.mjs --bundle video/infant-experiments/flagship-en --no-zoom

# Test with placeholder stills (before real AI images)
node scripts/render-overlay-pngs.mjs --bundle video/infant-experiments/flagship-en --placeholder
```

## Production model

```
Nano Banana (manual) → npm run render → review → upload
```

1. **Base visuals** — Nano Banana generates 12 PNG base plates (the only manual step)
2. **Overlays** — code composites text onto base images (`render-overlay-pngs.mjs`)
3. **Audio** — Qwen TTS renders English narration (`render-audio.sh`)
4. **Assembly** — ffmpeg with Ken Burns effects reads shotlist.csv (`assemble-video.mjs`)
5. **Thumbnail** — programmatic crop + composite (`render-thumbnail.mjs`)
6. **Captions** — generated from shotlist, then split into short entries for platform limits
7. **Bilibili export** — bilingual subtitles burned in via SVG→PNG→ffmpeg overlay

## Key lessons learned

### Caption splitting

Both YouTube and Bilibili have per-entry character limits. The original 32-entry SRTs (one per shot) contained paragraph-length text that caused upload errors on Bilibili ("单条字幕过长"). The fix:

- Split English captions to ≤70 characters per entry (75 entries)
- Split Chinese captions to ≤40 characters per entry (50 entries)
- Split on word boundaries (EN) or punctuation boundaries (ZH)
- Distribute time proportionally by word count (EN) or character count (ZH)
- Merge short tails back to avoid orphaned words/punctuation
- Keep `captions.bilibili.ass` as the 32-entry source of truth for both languages

### Audio–visual sync

Hand-estimated timecodes in the shotlist will drift from actual TTS audio. After generating narration, always run `retime-shotlist.mjs` which:

1. Measures exact audio duration via ffprobe
2. Detects natural silence gaps via ffmpeg silencedetect
3. Distributes time proportionally by word count per shot
4. Snaps transitions to the nearest silence midpoint
5. Rewrites `shotlist.csv` with corrected timecodes

### Bilibili subtitle burn-in

macOS Homebrew ffmpeg lacks the `ass` filter (no libass). The workaround:

1. Parse both EN and ZH SRT files
2. Build a merged bilingual timeline (handles different entry counts)
3. Render per-segment SVG overlays (EN at top, ZH at bottom)
4. Rasterize via `rsvg-convert` (requires `brew install librsvg`)
5. Overlay PNGs onto video in batches of 8 using ffmpeg's `overlay` filter

## Repo management

### Checked in (source files + scripts, ~1.3 MB)

| File | Purpose |
|------|---------|
| `script.en.txt` | Narration script |
| `shotlist.csv` | Authoritative 32-shot timeline |
| `prompts.md` | Nano Banana prompt pack for all 12 base plates |
| `captions.en.srt` | English captions, short entries (≤70 chars, 75 entries) |
| `captions.zh.srt` | Chinese captions, short entries (≤40 chars, 50 entries) |
| `captions.bilibili.ass` | Bilingual ASS subtitles (32 entries, source of truth for caption text) |
| `chapters.txt` | YouTube chapter timestamps |
| `youtube.md` | Upload package for YouTube + Bilibili |
| `STEP_BY_STEP.md` | Production workflow guide |
| `README.md` | This file |
| `prepare-assets.sh` | Folder setup + caption/chapter rebuild |
| `render-audio.sh` | TTS narration rendering |
| `assets/thumbnail.png` | YouTube thumbnail (1.2 MB) |
| `scripts/video-utils.mjs` | Shared utilities |
| `scripts/render-overlay-pngs.mjs` | Overlay compositing (replaces Keynote) |
| `scripts/assemble-video.mjs` | Video assembly (replaces iMovie) |
| `scripts/render-thumbnail.mjs` | Thumbnail generation |
| `scripts/retime-shotlist.mjs` | Audio-visual sync tool |
| `scripts/burn-bilibili-subs.mjs` | Bilibili subtitle burn-in |
| `scripts/generate-video-package.py` | Caption + chapter generation from shotlist |

### Gitignored (large generated binaries, ~282 MB)

| Path | Size | Regenerate with |
|------|------|-----------------|
| `assets/ai-stills/*.png` | ~96 MB | Nano Banana (manual, see prompts.md) |
| `assets/keynote-exports/*.png` | ~45 MB | `npm run video:infant-experiments:overlays` |
| `exports/flagship-en-aiden.mp3` | ~7 MB | `npm run video:infant-experiments:audio` |
| `exports/flagship-en-rough-cut.mp4` | ~52 MB | `npm run video:infant-experiments:assemble` |
| `exports/bilibili-export.mp4` | ~65 MB | `node scripts/burn-bilibili-subs.mjs` |

### Deleted (stale/legacy)

| Path | Reason |
|------|--------|
| `assets/cards/*.svg` | Legacy prototype cards, zero references in codebase |
| `assets/article-figures/` | Generated output; website uses `public/images/` directly |
| `captions.en.original.srt` | Intermediate from caption splitting |
| `captions.zh.original.srt` | Intermediate from caption splitting |
| `captions.en.bilibili.srt` | Already uploaded, regenerable from ASS |

## Target output

- Format: 1920×1080, H.264 + AAC
- Runtime: ~7:13
- Tone: calm, curious, evidence-based
- Music: none
