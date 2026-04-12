#!/usr/bin/env node

/**
 * Retimes shotlist.csv to match the actual narration audio.
 *
 * The original shotlist timecodes were hand-estimated before TTS generation.
 * This script derives corrected timecodes from the actual audio duration using:
 *   1. Word count in each shot's narration as a proxy for speaking time
 *   2. Silence detection to find natural paragraph/section boundaries
 *   3. Snapping shot transitions to nearby silence gaps for clean cuts
 *
 * Usage:
 *   node scripts/retime-shotlist.mjs --bundle video/infant-experiments/flagship-en
 *   node scripts/retime-shotlist.mjs --bundle video/infant-experiments/flagship-en --dry-run
 */

import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { join, resolve, dirname } from "node:path";
import { spawnSync } from "node:child_process";

import { getArg, hasFlag, parseShotlistCsv } from "./video-utils.mjs";

const ROOT = resolve(dirname(new URL(import.meta.url).pathname), "..");
const bundle = resolve(ROOT, getArg("bundle", "video/infant-experiments/flagship-en"));
const shotlistPath = join(bundle, "shotlist.csv");
const audioPath = join(bundle, "exports/flagship-en-aiden.mp3");
const dryRun = hasFlag("dry-run");

// ---------------------------------------------------------------------------
// Step 1: Get exact audio duration
// ---------------------------------------------------------------------------

function getAudioDuration(path) {
  const result = spawnSync("ffprobe", [
    "-v", "quiet", "-show_entries", "format=duration",
    "-of", "csv=p=0", path,
  ], { encoding: "utf8" });
  return parseFloat(result.stdout.trim());
}

// ---------------------------------------------------------------------------
// Step 2: Detect silence boundaries in the audio
// ---------------------------------------------------------------------------

function detectSilences(path) {
  const result = spawnSync("ffmpeg", [
    "-i", path,
    "-af", "silencedetect=n=-30dB:d=0.3",
    "-f", "null", "-",
  ], { encoding: "utf8", stdio: ["pipe", "pipe", "pipe"] });

  const output = result.stderr || "";
  const silences = [];
  const startPattern = /silence_start:\s*([\d.]+)/g;
  const endPattern = /silence_end:\s*([\d.]+)\s*\|\s*silence_duration:\s*([\d.]+)/g;

  const starts = [];
  let match;
  while ((match = startPattern.exec(output)) !== null) {
    starts.push(parseFloat(match[1]));
  }

  let i = 0;
  while ((match = endPattern.exec(output)) !== null) {
    silences.push({
      start: starts[i] || 0,
      end: parseFloat(match[1]),
      duration: parseFloat(match[2]),
      midpoint: (starts[i] + parseFloat(match[1])) / 2,
    });
    i++;
  }

  return silences;
}

// ---------------------------------------------------------------------------
// Step 3: Compute proportional timing from word counts
// ---------------------------------------------------------------------------

function wordCount(text) {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

function computeProportionalTimes(shots, audioDuration) {
  // Count words per shot
  const wordCounts = shots.map((s) => wordCount(s.narration || ""));
  const totalWords = wordCounts.reduce((a, b) => a + b, 0);

  if (totalWords === 0) {
    throw new Error("No narration text found in shotlist");
  }

  // Leave a small buffer at the end for tail silence
  const usableDuration = audioDuration - 0.5;

  // Distribute time proportionally by word count
  const times = [];
  let cursor = 0;
  for (let i = 0; i < shots.length; i++) {
    const proportion = wordCounts[i] / totalWords;
    const duration = proportion * usableDuration;
    times.push({
      start: cursor,
      end: cursor + duration,
      duration,
      words: wordCounts[i],
    });
    cursor += duration;
  }

  return times;
}

// ---------------------------------------------------------------------------
// Step 4: Snap transition points to nearby silence gaps
// ---------------------------------------------------------------------------

function snapToSilence(transitionTime, silences, maxSnapDistance = 3.0) {
  let bestSilence = null;
  let bestDistance = Infinity;

  for (const s of silences) {
    const distance = Math.abs(s.midpoint - transitionTime);
    if (distance < bestDistance && distance <= maxSnapDistance) {
      bestDistance = distance;
      bestSilence = s;
    }
  }

  if (bestSilence) {
    // Snap to the midpoint of the silence gap (natural cut point)
    return bestSilence.midpoint;
  }
  return transitionTime;
}

function snapAllTransitions(proportionalTimes, silences) {
  const snapped = [...proportionalTimes.map((t) => ({ ...t }))];

  // Snap each transition point (except start of first and end of last)
  for (let i = 1; i < snapped.length; i++) {
    const rawTransition = snapped[i].start;
    const snappedTime = snapToSilence(rawTransition, silences);
    snapped[i].start = snappedTime;
    snapped[i - 1].end = snappedTime;
  }

  // Fix start and end
  snapped[0].start = 0;
  snapped[snapped.length - 1].end = proportionalTimes[proportionalTimes.length - 1].end;

  // Recalculate durations
  for (const t of snapped) {
    t.duration = t.end - t.start;
  }

  return snapped;
}

// ---------------------------------------------------------------------------
// Step 5: Format and write output
// ---------------------------------------------------------------------------

function formatTimestamp(seconds) {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${String(s).padStart(2, "0")}`;
}

function escapeCSV(value) {
  if (value.includes(",") || value.includes('"') || value.includes("\n")) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}

function writeShotlistCSV(shots, times, outputPath) {
  const header = "order,start,end,chapter,section,visual_asset,visual_notes,on_screen_text,narration";
  const rows = shots.map((shot, i) => {
    const t = times[i];
    return [
      shot.order,
      formatTimestamp(t.start),
      formatTimestamp(t.end),
      escapeCSV(shot.chapter || ""),
      escapeCSV(shot.section || ""),
      escapeCSV(shot.visual_asset || ""),
      escapeCSV(shot.visual_notes || ""),
      escapeCSV(shot.on_screen_text || ""),
      escapeCSV(shot.narration || ""),
    ].join(",");
  });

  writeFileSync(outputPath, [header, ...rows].join("\n") + "\n", "utf8");
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

if (!existsSync(audioPath)) {
  console.error(`Missing narration audio: ${audioPath}`);
  process.exit(1);
}

console.log("Step 1: Getting audio duration...");
const audioDuration = getAudioDuration(audioPath);
console.log(`  Audio: ${audioDuration.toFixed(2)}s (${formatTimestamp(audioDuration)})`);

console.log("Step 2: Detecting silences...");
const silences = detectSilences(audioPath);
console.log(`  Found ${silences.length} silence gaps`);

console.log("Step 3: Parsing shotlist...");
const shots = parseShotlistCsv(shotlistPath);
console.log(`  ${shots.length} shots`);

console.log("Step 4: Computing proportional timing from word counts...");
const proportionalTimes = computeProportionalTimes(shots, audioDuration);

console.log("Step 5: Snapping transitions to silence boundaries...");
const snappedTimes = snapAllTransitions(proportionalTimes, silences);

// Print comparison
console.log("\n  Shot | Original     | Retimed      | Shift  | Words");
console.log("  -----+--------------+--------------+--------+------");

for (let i = 0; i < shots.length; i++) {
  const shot = shots[i];
  const t = snappedTimes[i];
  const origStart = formatTimestamp(shot.startSec);
  const origEnd = formatTimestamp(shot.endSec);
  const newStart = formatTimestamp(t.start);
  const newEnd = formatTimestamp(t.end);
  const shift = (t.start - shot.startSec).toFixed(1);
  const shiftStr = parseFloat(shift) >= 0 ? `+${shift}s` : `${shift}s`;
  const label = (shot.section || shot.chapter || "").substring(0, 8);
  console.log(
    `  ${String(shot.order).padStart(4)} | ${origStart}-${origEnd} | ${newStart}-${newEnd} | ${shiftStr.padStart(6)} | ${t.words} ${label}`,
  );
}

if (dryRun) {
  console.log("\n--dry-run: No files written.");
  process.exit(0);
}

// Write retimed shotlist
console.log("\nWriting retimed shotlist.csv...");
writeShotlistCSV(shots, snappedTimes, shotlistPath);

// Regenerate captions and chapters
console.log("Regenerating captions.en.srt and chapters.txt...");
const prepareResult = spawnSync("bash", [join(bundle, "prepare-assets.sh")], {
  encoding: "utf8",
  stdio: "pipe",
});

if (prepareResult.status !== 0) {
  console.error("Warning: Failed to regenerate captions/chapters. Run manually:");
  console.error("  npm run video:infant-experiments:prepare");
}

console.log("\nDone. Re-run the video assembly to see the corrected sync:");
console.log("  npm run video:infant-experiments:assemble");
