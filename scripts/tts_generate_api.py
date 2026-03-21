#!/usr/bin/env python3
"""Generate an MP3 narration from a plain-text transcript using CosyVoice2 via SiliconFlow API.

Drop-in replacement for tts_generate.py for Chinese transcripts.
Same CLI interface: --input, --output, --lang, --voice.
"""

import argparse
import os
import subprocess
import sys
import tempfile
from pathlib import Path

from dotenv import load_dotenv

SCRIPT_DIR = Path(__file__).resolve().parent
load_dotenv(SCRIPT_DIR / ".env")

MODEL = "FunAudioLLM/CosyVoice2-0.5B"
DEFAULT_VOICE = "anna"  # CosyVoice2 Chinese female voice


def generate(input_path: str, output_path: str, lang: str, voice: str) -> None:
    import httpx

    api_key = os.environ.get("SILICONFLOW_API_KEY")
    if not api_key:
        print("SILICONFLOW_API_KEY not set. Cannot generate.", file=sys.stderr)
        sys.exit(1)

    text = Path(input_path).read_text(encoding="utf-8").strip()
    if not text:
        print(f"Empty transcript: {input_path}", file=sys.stderr)
        sys.exit(1)

    print(f"Generating via SiliconFlow CosyVoice2 ({len(text)} chars, voice={voice})")

    response = httpx.post(
        "https://api.siliconflow.cn/v1/audio/speech",
        headers={
            "Authorization": f"Bearer {api_key}",
            "Content-Type": "application/json",
        },
        json={
            "model": MODEL,
            "input": text,
            "voice": f"{MODEL}:{voice}",
            "response_format": "mp3",
            "stream": False,
        },
        timeout=300,
    )
    response.raise_for_status()

    # Normalize to 24kHz mono 128kbps to match existing pipeline output
    tmp = Path(tempfile.mktemp(suffix=".mp3", prefix="tts_api_"))
    tmp.write_bytes(response.content)

    subprocess.run(
        [
            "ffmpeg", "-y",
            "-i", str(tmp),
            "-ac", "1",
            "-ar", "24000",
            "-codec:a", "libmp3lame",
            "-b:a", "128k",
            str(output_path),
        ],
        check=True,
        capture_output=True,
    )
    tmp.unlink(missing_ok=True)
    print(f"Done: {output_path}")


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Generate TTS audio via SiliconFlow CosyVoice2")
    parser.add_argument("--input", required=True, help="Path to transcript .txt file")
    parser.add_argument("--output", required=True, help="Output .mp3 path")
    parser.add_argument("--lang", required=True, choices=["en", "zh"], help="Language code")
    parser.add_argument("--voice", help=f"Voice name (default: {DEFAULT_VOICE})")
    args = parser.parse_args()
    voice = args.voice or DEFAULT_VOICE
    generate(args.input, args.output, args.lang, voice)
