#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/../../.." && pwd)"
BUNDLE="$ROOT/video/infant-experiments/flagship-en"
OUTPUT="$BUNDLE/exports/flagship-en-aiden.mp3"

mkdir -p "$BUNDLE/exports"

source ~/ml-env/bin/activate

python "$ROOT/scripts/tts_generate.py" \
  --input "$BUNDLE/script.en.txt" \
  --output "$OUTPUT" \
  --lang en \
  --voice Aiden

if command -v ffprobe >/dev/null 2>&1; then
  duration_seconds="$(ffprobe -v error -show_entries format=duration -of default=nw=1:nk=1 "$OUTPUT")"
  printf "%s\n" "$duration_seconds" > "$BUNDLE/exports/flagship-en-aiden.duration.txt"
  echo "Audio duration (seconds): $duration_seconds"
fi
