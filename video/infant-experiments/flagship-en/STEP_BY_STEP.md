# Step-by-Step Production Guide

Complete workflow for producing the `infant-experiments` YouTube + Bilibili video.

## Prerequisites

- Node.js, ffmpeg, librsvg (`brew install ffmpeg librsvg`)
- Python virtualenv with TTS dependencies (`source ~/ml-env/bin/activate`)

## Step 0: Prepare the bundle

```bash
npm run video:infant-experiments:prepare
```

Ensures folder structure exists and rebuilds `captions.en.srt` + `chapters.txt` from `shotlist.csv`.

## Step 1: Generate the Nano Banana base plates

Read `prompts.md` for the full prompt pack. Generate these 12 images into `assets/ai-stills/`:

1. `hero-home-lab.png`
2. `four-abilities-vignettes.png`
3. `ground-rules-room.png`
4. `peekaboo-face-to-face.png`
5. `peekaboo-variation-strip.png`
6. `still-face-neutral-setup.png`
7. `still-face-phase-strip.png`
8. `kick-wide-room.png`
9. `kick-phase-strip.png`
10. `imitation-rattle-demo.png`
11. `imitation-delay-sequence.png`
12. `observation-notebook.png`

Generate `hero-home-lab.png` first and use it as the reference image for all later plates.

### Reject bad generations early

Before proceeding, reject any plate with:

- unsafe infant positioning
- crying or distressed imagery
- tied-ribbon or ambiguous ribbon detail
- inconsistent caregiver/baby appearance across the set
- badly rendered hands
- text baked into the image

## Step 2: Render the narration

```bash
npm run video:infant-experiments:audio
```

Output: `exports/flagship-en-aiden.mp3`

## Step 3: Retime the shotlist

After generating audio, retiming is critical — hand-estimated timecodes will be out of sync.

```bash
node scripts/retime-shotlist.mjs --bundle video/infant-experiments/flagship-en
```

This rewrites `shotlist.csv` with timecodes derived from the actual audio (word-count proportional timing snapped to natural silences). Preview changes first:

```bash
node scripts/retime-shotlist.mjs --bundle video/infant-experiments/flagship-en --dry-run
```

Then regenerate captions and chapters from the updated shotlist:

```bash
npm run video:infant-experiments:prepare
```

## Step 4: Generate overlays and assemble

```bash
npm run video:infant-experiments:render
```

This runs three scripts in sequence:

1. **Overlay generation** — composites text onto AI stills, producing 15 PNGs in `assets/keynote-exports/`
2. **Video assembly** — reads `shotlist.csv`, generates per-shot clips with Ken Burns motion, concatenates with narration, outputs `exports/flagship-en-rough-cut.mp4`
3. **Thumbnail** — crops and composites three AI stills with title text into `assets/thumbnail.png`

### Iteration shortcuts

```bash
# Re-render a single shot
node scripts/assemble-video.mjs --bundle video/infant-experiments/flagship-en --shot 14

# Fast draft without Ken Burns
node scripts/assemble-video.mjs --bundle video/infant-experiments/flagship-en --no-zoom

# Test with placeholder stills before real AI images
node scripts/render-overlay-pngs.mjs --bundle video/infant-experiments/flagship-en --placeholder
```

## Step 5: Review the rough cut

Watch once on laptop and once on phone. Check:

- first 20 seconds feel clear and inviting
- still-face section feels calm, not alarming
- all text overlays are readable on phone
- no section drags visually for too long
- audio and visuals are in sync throughout

If audio drifts from visuals, re-run Step 3 (retime).

## Step 6: Generate captions

### Caption splitting

The 32-entry SRTs from the shotlist have paragraph-length text that exceeds platform limits. Split them into short entries:

The short-entry captions are already committed as `captions.en.srt` and `captions.zh.srt`. If you need to regenerate from scratch, the source of truth is `captions.bilibili.ass` (32 bilingual entries from the ASS file).

### YouTube captions

Upload both files as separate caption tracks:

- `captions.en.srt` — English (primary, ≤70 chars per entry)
- `captions.zh.srt` — Chinese Simplified (additional track, ≤40 chars per entry)

### Bilibili captions

Option A — Burn bilingual subtitles into video (recommended):

```bash
node scripts/burn-bilibili-subs.mjs --bundle video/infant-experiments/flagship-en
```

Output: `exports/bilibili-export.mp4` (EN at top, ZH at bottom)

Option B — Upload SRT separately on Bilibili. Use the short-entry `captions.en.srt` to avoid "单条字幕过长" errors.

## Step 7: Upload

### YouTube

Use `youtube.md` for the full upload package. Upload checklist:

1. Upload as Unlisted first
2. Upload `captions.en.srt` as English caption track
3. Upload `captions.zh.srt` as Chinese (Simplified) caption track
4. Verify description and chapter times match the final edit
5. Fix obvious proper-noun errors in auto-generated captions (Bruner, Tronick, Rovee, Barr, Hayne)
6. Check thumbnail at phone size
7. Publish when clean on both desktop and phone

### Bilibili

1. Upload `exports/bilibili-export.mp4` (with burned-in subtitles)
2. Use Chinese title: `在家做的4个经典婴儿心理学实验｜发展心理学科普`
3. Tags: 育儿, 发展心理学, 婴儿实验, 科普
4. Add article link and YouTube link in description

## File checklist

By upload time, these should exist:

| File | Source |
|------|--------|
| `assets/ai-stills/*.png` (12 plates) | Nano Banana (manual) |
| `assets/keynote-exports/*.png` (15 overlays) | `npm run overlays` |
| `assets/thumbnail.png` | `npm run thumbnail` |
| `exports/flagship-en-aiden.mp3` | `npm run audio` |
| `exports/flagship-en-rough-cut.mp4` | `npm run assemble` |
| `exports/bilibili-export.mp4` | `burn-bilibili-subs.mjs` |
| `captions.en.srt` (short entries) | committed |
| `captions.zh.srt` (short entries) | committed |
| `chapters.txt` | `npm run prepare` |
