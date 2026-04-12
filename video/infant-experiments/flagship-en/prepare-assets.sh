#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/../../.." && pwd)"
BUNDLE="$ROOT/video/infant-experiments/flagship-en"

mkdir -p \
  "$BUNDLE/assets/ai-stills" \
  "$BUNDLE/assets/keynote-exports" \
  "$BUNDLE/exports"

python3 "$ROOT/scripts/generate-video-package.py" \
  --shotlist "$BUNDLE/shotlist.csv" \
  --srt-output "$BUNDLE/captions.en.srt" \
  --chapters-output "$BUNDLE/chapters.txt"

cat <<'EOF'
Prepared video bundle:
  - Ensured all asset directories exist
  - Rebuilt captions.en.srt and chapters.txt from shotlist.csv

Next steps:
  1. Generate Nano Banana base plates into assets/ai-stills/ (see prompts.md)
  2. npm run video:infant-experiments:render  (overlays + assembly + thumbnail)
  3. Review rough cut, then follow STEP_BY_STEP.md for caption splitting + upload

Note: The committed captions.en.srt and captions.zh.srt are short-entry versions.
Running this script regenerates captions.en.srt from the shotlist (long entries).
If you need short entries for upload, re-split using the ASS source of truth.
See STEP_BY_STEP.md Step 6 for details.
EOF
