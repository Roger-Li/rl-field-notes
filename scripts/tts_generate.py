#!/usr/bin/env python3
"""Generate an MP3 narration from a plain-text transcript using Qwen3-TTS via mlx-audio."""

import argparse
import re
import subprocess
import sys
import tempfile
import warnings
from pathlib import Path

# Suppress known upstream Qwen3-TTS tokenizer/model-type warnings.
import logging
import os

os.environ["TRANSFORMERS_VERBOSITY"] = "error"
logging.getLogger("transformers").setLevel(logging.ERROR)
warnings.filterwarnings("ignore", message=".*incorrect regex pattern.*")
warnings.filterwarnings("ignore", message=".*You are using a model of type.*")

MODEL_ID = "Qwen/Qwen3-TTS-12Hz-1.7B-CustomVoice"

# Default voice per language — native speakers for natural pronunciation.
# Available voices: Aiden, Ryan (EN), Vivian, Serena, Dylan, Uncle_Fu (ZH),
# Eric (Sichuan), Ono_Anna (JA), Sohee (KO).
DEFAULT_VOICES = {"en": "Aiden", "zh": "Vivian"}

# Silence duration (seconds) inserted between chunks
CHUNK_GAP = 0.4

# Merge consecutive paragraphs up to this many characters per chunk.
# Keeps headings attached to their body text for natural prosody.
# 800 chars ≈ 30-60s of English speech, well within the model's 4096 token limit.
MERGE_MAX_CHARS = 800


def split_paragraphs(text: str) -> list[str]:
    """Split text into non-empty paragraphs at blank-line boundaries."""
    chunks = re.split(r"\n{2,}", text.strip())
    return [c.strip() for c in chunks if c.strip()]


def merge_short_paragraphs(paragraphs: list[str], max_chars: int = MERGE_MAX_CHARS) -> list[str]:
    """Merge consecutive short paragraphs into larger chunks.

    Headings and short lines get joined with their following content so
    the model reads them with natural prosody instead of as isolated clips.
    """
    merged: list[str] = []
    buf: list[str] = []
    buf_len = 0
    for p in paragraphs:
        if buf and buf_len + len(p) + 1 > max_chars:
            merged.append("\n".join(buf))
            buf = [p]
            buf_len = len(p)
        else:
            buf.append(p)
            buf_len += len(p) + 1  # +1 for the joining newline
    if buf:
        merged.append("\n".join(buf))
    return merged


def generate(input_path: str, output_path: str, lang: str, voice: str) -> None:
    # Lazy imports so --help is instant
    import mlx.core as mx  # type: ignore[import-untyped]
    import numpy as np
    from mlx_audio.tts.utils import load_model  # type: ignore[import-untyped]

    text = Path(input_path).read_text(encoding="utf-8")
    paragraphs = split_paragraphs(text)
    if not paragraphs:
        print(f"Empty transcript: {input_path}", file=sys.stderr)
        sys.exit(1)

    chunks = merge_short_paragraphs(paragraphs)
    print(f"Loading model {MODEL_ID} ...")
    print(f"  {len(paragraphs)} paragraphs merged into {len(chunks)} chunks, voice={voice}")
    model = load_model(MODEL_ID)
    sample_rate = model.sample_rate

    all_audio: list[np.ndarray] = []
    silence = np.zeros(int(sample_rate * CHUNK_GAP), dtype=np.float32)

    for i, chunk in enumerate(chunks):
        preview = chunk.replace("\n", " ")[:72]
        print(f"  [{i + 1}/{len(chunks)}] {preview}...")

        # Call model.generate() directly — avoids per-chunk file I/O.
        # split_pattern="\n" lets the model handle newlines within a merged
        # chunk as natural sentence boundaries (no silence gap inserted).
        for result in model.generate(
            text=chunk,
            voice=voice,
            lang_code=lang,
            verbose=False,
            split_pattern="\n",
        ):
            audio_np = np.array(result.audio, copy=False)
            all_audio.append(audio_np)

        # Insert silence gap between merged chunks (section boundaries)
        all_audio.append(silence)

        # Prevent memory buildup
        mx.clear_cache()

    combined = np.concatenate(all_audio)

    # Write combined wav, then convert to mp3 via ffmpeg
    tmp_wav = Path(tempfile.mktemp(suffix=".wav", prefix="tts_"))
    import soundfile as sf

    sf.write(str(tmp_wav), combined, sample_rate)

    subprocess.run(
        [
            "ffmpeg",
            "-y",
            "-i",
            str(tmp_wav),
            "-codec:a",
            "libmp3lame",
            "-b:a",
            "128k",
            "-ar",
            "24000",
            str(output_path),
        ],
        check=True,
        capture_output=True,
    )

    tmp_wav.unlink(missing_ok=True)
    print(f"Done: {output_path}")


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Generate TTS audio from transcript")
    parser.add_argument("--input", required=True, help="Path to transcript .txt file")
    parser.add_argument("--output", required=True, help="Output .mp3 path")
    parser.add_argument(
        "--lang",
        required=True,
        choices=["en", "zh"],
        help="Language code",
    )
    parser.add_argument(
        "--voice",
        help="Speaker name (default: Aiden for EN, Vivian for ZH)",
    )
    args = parser.parse_args()
    voice = args.voice or DEFAULT_VOICES[args.lang]
    generate(args.input, args.output, args.lang, voice)
