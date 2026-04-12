#!/usr/bin/env python3
"""Generate draft subtitles and chapter timestamps from a video shotlist CSV."""

from __future__ import annotations

import argparse
import csv
from pathlib import Path


def parse_timestamp(value: str) -> float:
    value = value.strip()
    if not value:
        raise ValueError("Empty timestamp")

    parts = value.split(":")
    if len(parts) == 2:
        minutes, seconds = parts
        return int(minutes) * 60 + float(seconds)
    if len(parts) == 3:
        hours, minutes, seconds = parts
        return int(hours) * 3600 + int(minutes) * 60 + float(seconds)

    raise ValueError(f"Unsupported timestamp format: {value}")


def format_srt_timestamp(seconds: float) -> str:
    total_ms = round(seconds * 1000)
    hours = total_ms // 3_600_000
    total_ms %= 3_600_000
    minutes = total_ms // 60_000
    total_ms %= 60_000
    secs = total_ms // 1000
    millis = total_ms % 1000
    return f"{hours:02d}:{minutes:02d}:{secs:02d},{millis:03d}"


def format_chapter_timestamp(seconds: float) -> str:
    total_seconds = int(seconds)
    hours = total_seconds // 3600
    minutes = (total_seconds % 3600) // 60
    secs = total_seconds % 60
    if hours:
      return f"{hours}:{minutes:02d}:{secs:02d}"
    return f"{minutes}:{secs:02d}"


def main() -> None:
    parser = argparse.ArgumentParser(
        description="Generate draft SRT captions and chapter timestamps from shotlist.csv",
    )
    parser.add_argument("--shotlist", required=True, help="Path to shotlist.csv")
    parser.add_argument("--srt-output", required=True, help="Path to output .srt file")
    parser.add_argument(
        "--chapters-output",
        required=True,
        help="Path to output text file with YouTube chapter timestamps",
    )
    args = parser.parse_args()

    rows = []
    with Path(args.shotlist).open("r", encoding="utf-8", newline="") as handle:
        reader = csv.DictReader(handle)
        for row in reader:
            start = parse_timestamp(row["start"])
            end = parse_timestamp(row["end"])
            if end <= start:
                raise ValueError(
                    f"Shot {row.get('order', '?')} has end <= start: {row['start']} -> {row['end']}"
                )
            rows.append({**row, "start_seconds": start, "end_seconds": end})

    rows.sort(key=lambda row: row["start_seconds"])
    for prev, current in zip(rows, rows[1:]):
        if current["start_seconds"] < prev["end_seconds"]:
            raise ValueError(
                f"Shot overlap between {prev.get('order', '?')} and {current.get('order', '?')}"
            )

    srt_lines = []
    for index, row in enumerate(rows, start=1):
        narration = row["narration"].strip()
        if not narration:
            continue
        srt_lines.extend(
            [
                str(index),
                f"{format_srt_timestamp(row['start_seconds'])} --> {format_srt_timestamp(row['end_seconds'])}",
                narration,
                "",
            ]
        )

    Path(args.srt_output).parent.mkdir(parents=True, exist_ok=True)
    Path(args.srt_output).write_text("\n".join(srt_lines).rstrip() + "\n", encoding="utf-8")

    chapters = []
    seen_titles = set()
    for row in rows:
        chapter = row.get("chapter", "").strip()
        if not chapter or chapter in seen_titles:
            continue
        seen_titles.add(chapter)
        chapters.append(f"{format_chapter_timestamp(row['start_seconds'])} {chapter}")

    Path(args.chapters_output).parent.mkdir(parents=True, exist_ok=True)
    Path(args.chapters_output).write_text("\n".join(chapters).rstrip() + "\n", encoding="utf-8")


if __name__ == "__main__":
    main()
