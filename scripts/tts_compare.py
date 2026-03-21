#!/usr/bin/env python3
"""Compare TTS models side-by-side using a Chinese transcript segment.

Generates MP3 files in public/audio/comparison/ for manual listening comparison.
Models with missing API keys are skipped with a warning.

Usage:
    python scripts/tts_compare.py                        # all models (skips missing keys)
    python scripts/tts_compare.py --models qwen3,openai  # specific models
    python scripts/tts_compare.py --fish-voice <ref_id>  # custom Fish Audio voice
"""

import argparse
import base64
import json
import os
import subprocess
import sys
import tempfile
from pathlib import Path

from dotenv import load_dotenv

SCRIPT_DIR = Path(__file__).resolve().parent
PROJECT_ROOT = SCRIPT_DIR.parent
OUTPUT_DIR = PROJECT_ROOT / "public" / "audio" / "comparison"

# Load API keys from scripts/.env (does not override existing env vars)
load_dotenv(SCRIPT_DIR / ".env")

# Lines 6-22 from content/guides/first-week/transcript.zh.txt
# Covers labor induction: medical terminology, conversational tone, numbered steps, warnings.
TEST_TEXT = """\
催产

对低风险、初产的孕妇来说，39 周择期催产是有证据支持的。2018 年发表于《新英格兰医学杂志》的 ARRIVE 研究发现，在这一特定人群中，39 周催产反而可能降低剖宫产率。它并不等于所有 39 至 40 周孕妇都该催产，但如果医生已经这样安排，你们仍然处在非常常规的流程里。

催产一般怎么进行

催产通常分阶段进行。医生会根据宫颈成熟度来选择方法，常见参考指标叫 Bishop 评分。

步骤一是宫颈成熟。使用前列腺素药物，如米索前列醇，或放置球囊帮助宫颈软化、扩张。这一步通常是前一晚到过夜。

步骤二是催产素静滴。开始静脉滴注人工催产素，让宫缩启动或加强。这通常发生在第二天白天。

步骤三是人工破水。医生用小器械破膜，过程通常很快，可能会有明显压力感或温热液体流出。这在宫口开到合适程度后进行。

还有一个视情况而定的步骤，就是硬膜外止痛。它用于镇痛，不代表失败，也不是意志力不够。她需要时都可以讨论。

通常会比你想得更久。初产妇从开始宫颈成熟到真正分娩，24 到 36 小时以上都很常见。准备好零食、充电线、娱乐内容和耐心。"""


def normalize_audio(input_path: Path, output_path: Path) -> None:
    """Normalize audio to 24kHz mono 128kbps MP3 for fair comparison."""
    subprocess.run(
        [
            "ffmpeg", "-y",
            "-i", str(input_path),
            "-ac", "1",
            "-ar", "24000",
            "-codec:a", "libmp3lame",
            "-b:a", "128k",
            str(output_path),
        ],
        check=True,
        capture_output=True,
    )


# ---------------------------------------------------------------------------
# Model generators
# ---------------------------------------------------------------------------

def generate_qwen3(text: str, output_path: Path, **_kwargs) -> None:
    """Generate using local Qwen3-TTS via mlx-audio (reuses tts_generate.py)."""
    # Write test text to a temp file and call the existing generate function
    sys.path.insert(0, str(Path(__file__).resolve().parent))
    from tts_generate import generate

    with tempfile.NamedTemporaryFile(
        mode="w", suffix=".txt", prefix="tts_compare_", delete=False, encoding="utf-8"
    ) as f:
        f.write(text)
        tmp_input = Path(f.name)

    tmp_output = output_path.with_suffix(".tmp.mp3")
    try:
        generate(str(tmp_input), str(tmp_output), lang="zh", voice="Vivian")
        # Normalize for fair comparison
        normalize_audio(tmp_output, output_path)
    finally:
        tmp_input.unlink(missing_ok=True)
        tmp_output.unlink(missing_ok=True)


def generate_openai(text: str, output_path: Path, **_kwargs) -> None:
    """Generate using OpenAI gpt-4o-mini-tts API."""
    import httpx

    api_key = os.environ["OPENAI_API_KEY"]
    response = httpx.post(
        "https://api.openai.com/v1/audio/speech",
        headers={
            "Authorization": f"Bearer {api_key}",
            "Content-Type": "application/json",
        },
        json={
            "model": "gpt-4o-mini-tts",
            "input": text,
            "voice": "nova",
            "response_format": "mp3",
        },
        timeout=120,
    )
    response.raise_for_status()

    tmp = output_path.with_suffix(".tmp.mp3")
    tmp.write_bytes(response.content)
    normalize_audio(tmp, output_path)
    tmp.unlink(missing_ok=True)


def generate_fish(text: str, output_path: Path, **kwargs) -> None:
    """Generate using Fish Audio S2-Pro API."""
    import httpx

    api_key = os.environ["FISH_AUDIO_API_KEY"]
    fish_voice = kwargs.get("fish_voice")

    body: dict = {"text": text, "format": "mp3"}
    if fish_voice:
        body["reference_id"] = fish_voice

    response = httpx.post(
        "https://api.fish.audio/v1/tts",
        headers={
            "Authorization": f"Bearer {api_key}",
            "Content-Type": "application/json",
            "model": "s2-pro",
        },
        json=body,
        timeout=120,
    )
    response.raise_for_status()

    tmp = output_path.with_suffix(".tmp.mp3")
    tmp.write_bytes(response.content)
    normalize_audio(tmp, output_path)
    tmp.unlink(missing_ok=True)


def generate_minimax(text: str, output_path: Path, **_kwargs) -> None:
    """Generate using MiniMax Speech-02-HD API."""
    import httpx

    api_key = os.environ["MINIMAX_API_KEY"]
    group_id = os.environ["MINIMAX_GROUP_ID"]

    response = httpx.post(
        f"https://api.minimax.io/v1/t2a_v2?GroupId={group_id}",
        headers={
            "Authorization": f"Bearer {api_key}",
            "Content-Type": "application/json",
        },
        json={
            "model": "speech-02-hd",
            "text": text,
            "stream": False,
            "language_boost": "Chinese",
            "voice_setting": {
                "voice_id": "Chinese (Mandarin)_Sweet_Lady",
                "speed": 1.0,
                "vol": 1.0,
                "pitch": 0,
                "emotion": "neutral",
            },
            "audio_setting": {
                "format": "mp3",
                "sample_rate": 24000,
                "bitrate": 128000,
                "channel": 1,
            },
        },
        timeout=120,
    )
    response.raise_for_status()

    data = response.json()

    # Check for API error in base_resp
    base_resp = data.get("base_resp", {})
    if base_resp.get("status_code", 0) != 0:
        raise ValueError(
            f"MiniMax API error: {base_resp.get('status_msg', 'unknown')} "
            f"(code {base_resp.get('status_code')})"
        )

    # Audio is hex-encoded in data.audio
    audio_hex = data.get("data", {}).get("audio", "")
    if not audio_hex:
        raise ValueError(
            f"No audio in MiniMax response. Keys: {list(data.keys())}. "
            "Check https://platform.minimax.io/docs for current response format."
        )

    tmp = output_path.with_suffix(".tmp.mp3")
    tmp.write_bytes(bytes.fromhex(audio_hex))
    normalize_audio(tmp, output_path)
    tmp.unlink(missing_ok=True)


def generate_mimo(text: str, output_path: Path, **_kwargs) -> None:
    """Generate using MiMo-V2-TTS (Xiaomi) API.

    Note: MiMo-V2-TTS launched March 18-19, 2026 — the API is very new and
    the endpoint/format below is best-effort. If this fails, check
    https://platform.xiaomimimo.com for the actual docs.
    """
    import httpx

    api_key = os.environ["MIMO_API_KEY"]

    # Try the OpenAI-compatible endpoint convention with both auth styles
    endpoints = [
        ("https://api.xiaomimimo.com/v1/audio/speech", {"Authorization": f"Bearer {api_key}"}),
        ("https://api.xiaomimimo.com/v1/audio/speech", {"api-key": api_key}),
        ("https://api.mimo.xiaomi.com/v1/audio/speech", {"Authorization": f"Bearer {api_key}"}),
    ]

    last_error = None
    for url, auth_headers in endpoints:
        try:
            response = httpx.post(
                url,
                headers={**auth_headers, "Content-Type": "application/json"},
                json={
                    "model": "mimo-v2-tts",
                    "input": text,
                    "voice": "default",
                    "response_format": "mp3",
                },
                timeout=120,
            )
            response.raise_for_status()

            tmp = output_path.with_suffix(".tmp.mp3")
            tmp.write_bytes(response.content)
            normalize_audio(tmp, output_path)
            tmp.unlink(missing_ok=True)
            return
        except httpx.HTTPStatusError as e:
            last_error = e
            continue

    raise ValueError(
        f"All MiMo endpoint attempts failed. Last error: {last_error}. "
        "This API launched March 18-19, 2026 — the TTS endpoint may not be "
        "publicly available yet. Check https://platform.xiaomimimo.com for docs."
    )


def generate_cosyvoice2(text: str, output_path: Path, **_kwargs) -> None:
    """Generate using CosyVoice2-0.5B via SiliconFlow API."""
    import httpx

    api_key = os.environ["SILICONFLOW_API_KEY"]

    response = httpx.post(
        "https://api.siliconflow.cn/v1/audio/speech",
        headers={
            "Authorization": f"Bearer {api_key}",
            "Content-Type": "application/json",
        },
        json={
            "model": "FunAudioLLM/CosyVoice2-0.5B",
            "input": text,
            "voice": "FunAudioLLM/CosyVoice2-0.5B:alex",
            "response_format": "mp3",
        },
        timeout=120,
    )
    response.raise_for_status()

    tmp = output_path.with_suffix(".tmp.mp3")
    tmp.write_bytes(response.content)
    normalize_audio(tmp, output_path)
    tmp.unlink(missing_ok=True)


# ---------------------------------------------------------------------------
# Model registry
# ---------------------------------------------------------------------------

MODEL_REGISTRY = {
    "qwen3": {
        "fn": generate_qwen3,
        "env_vars": [],
        "description": "Qwen3-TTS (local, mlx-audio) — baseline",
    },
    "openai": {
        "fn": generate_openai,
        "env_vars": ["OPENAI_API_KEY"],
        "description": "OpenAI gpt-4o-mini-tts — voice: nova",
    },
    "fish": {
        "fn": generate_fish,
        "env_vars": ["FISH_AUDIO_API_KEY"],
        "description": "Fish Audio S2-Pro (Mar 2026)",
    },
    "cosyvoice2": {
        "fn": generate_cosyvoice2,
        "env_vars": ["SILICONFLOW_API_KEY"],
        "description": "CosyVoice2-0.5B via SiliconFlow",
    },
    "minimax": {
        "fn": generate_minimax,
        "env_vars": ["MINIMAX_API_KEY", "MINIMAX_GROUP_ID"],
        "description": "MiniMax Speech-02-HD",
    },
    "mimo": {
        "fn": generate_mimo,
        "env_vars": ["MIMO_API_KEY"],
        "description": "MiMo-V2-TTS (Xiaomi) — API may be unstable",
    },
}


def main() -> None:
    parser = argparse.ArgumentParser(
        description="Compare TTS models using a Chinese transcript segment"
    )
    parser.add_argument(
        "--models",
        help="Comma-separated list of models to run (default: all). "
        f"Available: {', '.join(MODEL_REGISTRY)}",
    )
    parser.add_argument(
        "--fish-voice",
        help="Fish Audio reference_id for a specific voice. "
        "Browse https://fish.audio to find one.",
    )
    args = parser.parse_args()

    selected = list(MODEL_REGISTRY.keys())
    if args.models:
        selected = [m.strip() for m in args.models.split(",")]
        unknown = [m for m in selected if m not in MODEL_REGISTRY]
        if unknown:
            print(f"Unknown models: {', '.join(unknown)}", file=sys.stderr)
            print(f"Available: {', '.join(MODEL_REGISTRY)}", file=sys.stderr)
            sys.exit(1)

    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

    print(f"Test text: {len(TEST_TEXT)} chars")
    print(f"Output dir: {OUTPUT_DIR}")
    print(f"Models: {', '.join(selected)}\n")

    results: dict[str, str] = {}

    for name in selected:
        entry = MODEL_REGISTRY[name]
        missing = [v for v in entry["env_vars"] if not os.environ.get(v)]
        if missing:
            print(f"[SKIP] {name}: missing env vars: {', '.join(missing)}")
            continue

        output_path = OUTPUT_DIR / f"comparison-{name}.mp3"
        print(f"[START] {name} — {entry['description']}")

        try:
            entry["fn"](TEST_TEXT, output_path, fish_voice=args.fish_voice)
            size_kb = output_path.stat().st_size / 1024
            print(f"[DONE] {name} — {output_path.name} ({size_kb:.0f} KB)")
            results[name] = "ok"
        except Exception as e:
            print(f"[FAIL] {name}: {e}", file=sys.stderr)
            results[name] = f"error: {e}"

    print(f"\n{'=' * 50}")
    print("Summary:")
    for name in selected:
        status = results.get(name, "skipped")
        print(f"  {name:10s} — {status}")
    print(f"\nOutput files in: {OUTPUT_DIR}")


if __name__ == "__main__":
    main()
