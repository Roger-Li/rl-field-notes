#!/usr/bin/env node

/**
 * Replaces iMovie in the video production pipeline.
 * Reads shotlist.csv + all visual assets + narration MP3 and produces a rough-cut MP4.
 *
 * Two-pass approach:
 *   Pass 1 — generate per-shot video clips with Ken Burns (zoompan)
 *   Pass 2 — concatenate all clips and mix narration audio
 *
 * Usage:
 *   node scripts/assemble-video.mjs --bundle video/infant-experiments/flagship-en
 *   node scripts/assemble-video.mjs --bundle video/infant-experiments/flagship-en --shot 14
 *   node scripts/assemble-video.mjs --bundle video/infant-experiments/flagship-en --no-zoom
 */

import { existsSync, mkdirSync, rmSync, writeFileSync } from "node:fs";
import { join, resolve, dirname } from "node:path";

import {
  getArg,
  hasFlag,
  parseShotlistCsv,
  run,
} from "./video-utils.mjs";

const ROOT = resolve(dirname(new URL(import.meta.url).pathname), "..");
const bundle = resolve(ROOT, getArg("bundle", "video/infant-experiments/flagship-en"));
const shotlistPath = join(bundle, "shotlist.csv");
const exportsDir = join(bundle, "exports");
const tmpDir = join(exportsDir, ".tmp-shots");
const FPS = parseInt(getArg("fps", "30"), 10);
const singleShot = getArg("shot", "");
const noZoom = hasFlag("no-zoom");

mkdirSync(tmpDir, { recursive: true });

// ---------------------------------------------------------------------------
// Parse shotlist
// ---------------------------------------------------------------------------

const shots = parseShotlistCsv(shotlistPath);

if (!shots.length) {
  console.error("No shots found in shotlist.csv");
  process.exit(1);
}

console.log(`Loaded ${shots.length} shots from shotlist.csv (total: ${shots[shots.length - 1].endSec}s)`);

// ---------------------------------------------------------------------------
// Locate narration audio
// ---------------------------------------------------------------------------

const audioPath = join(exportsDir, "flagship-en-aiden.mp3");
if (!existsSync(audioPath)) {
  console.error(`Missing narration audio: ${audioPath}`);
  console.error("Run: npm run video:infant-experiments:audio");
  process.exit(1);
}

// ---------------------------------------------------------------------------
// Ken Burns motion presets
// ---------------------------------------------------------------------------

// Each shot gets a motion style. Consecutive shots on the same image get alternating styles.
function getMotionStyle(shot, prevShot) {
  if (noZoom) return "static";
  const samePrev = prevShot && shot.visual_asset === prevShot.visual_asset;
  if (samePrev) return "drift-right";
  return "push-in";
}

function zoompanFilter(style, frames) {
  const W = 1920;
  const H = 1080;
  // Upscale factor: 8% headroom for zoom/pan
  const upW = Math.round(W * 1.08);
  const upH = Math.round(H * 1.08);
  const scale = `scale=${upW}:${upH}`;

  switch (style) {
    case "push-in":
      return `${scale},zoompan=z='min(1.06,1+0.0006*on)':x='(iw-iw/zoom)/2':y='(ih-ih/zoom)/2':d=${frames}:s=${W}x${H}:fps=${FPS}`;
    case "drift-right":
      return `${scale},zoompan=z='1.04':x='${Math.round(upW * 0.01)}+on*${((upW - W / 1.04) / frames).toFixed(4)}':y='(ih-ih/zoom)/2':d=${frames}:s=${W}x${H}:fps=${FPS}`;
    case "push-out":
      return `${scale},zoompan=z='max(1.0,1.06-0.0006*on)':x='(iw-iw/zoom)/2':y='(ih-ih/zoom)/2':d=${frames}:s=${W}x${H}:fps=${FPS}`;
    case "static":
    default:
      return `scale=${W}:${H}:force_original_aspect_ratio=decrease,pad=${W}:${H}:(ow-iw)/2:(oh-ih)/2:color=black`;
  }
}

// ---------------------------------------------------------------------------
// Montage for closing shots (31-32)
// ---------------------------------------------------------------------------

const montageStills = [
  "assets/ai-stills/hero-home-lab.png",
  "assets/ai-stills/peekaboo-face-to-face.png",
  "assets/ai-stills/still-face-neutral-setup.png",
  "assets/ai-stills/kick-wide-room.png",
  "assets/ai-stills/imitation-rattle-demo.png",
];

function generateMontageClip(duration, outputPath) {
  const clipDur = duration / montageStills.length;
  const subClips = [];

  for (let i = 0; i < montageStills.length; i++) {
    const stillPath = join(bundle, montageStills[i]);
    if (!existsSync(stillPath)) continue;
    const subPath = join(tmpDir, `montage-sub-${i}.mp4`);
    const frames = Math.max(1, Math.round(clipDur * FPS));
    const vf = zoompanFilter("push-in", frames);
    run("ffmpeg", [
      "-loop", "1", "-i", stillPath,
      "-vf", vf,
      "-t", String(clipDur),
      "-c:v", "libx264", "-pix_fmt", "yuv420p",
      "-y", subPath,
    ], { quiet: true });
    subClips.push(subPath);
  }

  if (!subClips.length) return false;

  const concatList = join(tmpDir, "montage-concat.txt");
  writeFileSync(concatList, subClips.map((p) => `file '${p}'`).join("\n"), "utf8");
  run("ffmpeg", [
    "-f", "concat", "-safe", "0", "-i", concatList,
    "-c:v", "libx264", "-pix_fmt", "yuv420p",
    "-y", outputPath,
  ], { quiet: true });
  return true;
}

// ---------------------------------------------------------------------------
// Pass 1: Generate per-shot clips
// ---------------------------------------------------------------------------

const targets = singleShot
  ? shots.filter((s) => String(s.order) === singleShot)
  : shots;

if (!targets.length) {
  console.error(`No shot found with order ${singleShot}`);
  process.exit(1);
}

console.log(`\nPass 1: Generating ${targets.length} shot clips (${noZoom ? "no zoom" : "with Ken Burns"})...`);

let pass1Fail = 0;

for (let i = 0; i < targets.length; i++) {
  const shot = targets[i];
  const prevShot = i > 0 ? targets[i - 1] : null;
  const order = String(shot.order).padStart(2, "0");
  const clipPath = join(tmpDir, `shot-${order}.mp4`);
  const assetPath = join(bundle, shot.visual_asset);

  if (!existsSync(assetPath)) {
    console.error(`  ✗ Shot ${shot.order}: missing ${shot.visual_asset}`);
    pass1Fail++;
    continue;
  }

  const duration = shot.duration;
  if (duration <= 0) {
    console.error(`  ✗ Shot ${shot.order}: zero or negative duration`);
    pass1Fail++;
    continue;
  }

  // Check if this is the montage shot (shot 31 mentions montage in visual_notes)
  const isMontage = shot.visual_notes && shot.visual_notes.toLowerCase().includes("montage");

  if (isMontage) {
    const ok = generateMontageClip(duration, clipPath);
    if (!ok) {
      console.error(`  ✗ Shot ${shot.order}: montage generation failed`);
      pass1Fail++;
      continue;
    }
  } else {
    const frames = Math.max(1, Math.round(duration * FPS));
    const style = getMotionStyle(shot, prevShot);
    const vf = zoompanFilter(style, frames);

    run("ffmpeg", [
      "-loop", "1", "-i", assetPath,
      "-vf", vf,
      "-t", String(duration),
      "-c:v", "libx264", "-pix_fmt", "yuv420p",
      "-y", clipPath,
    ], { quiet: true });
  }

  const label = shot.section || shot.chapter || "";
  console.log(`  ✓ Shot ${shot.order} (${duration}s) — ${label}`);
}

if (pass1Fail > 0) {
  console.error(`\n${pass1Fail} shots failed. Fix missing assets and re-run.`);
  if (singleShot) process.exit(1);
}

// If only rendering a single shot, stop here
if (singleShot) {
  console.log(`\nSingle shot rendered: ${join(tmpDir, `shot-${singleShot.padStart(2, "0")}.mp4`)}`);
  process.exit(pass1Fail > 0 ? 1 : 0);
}

// ---------------------------------------------------------------------------
// Pass 2: Concatenate all clips + mix audio
// ---------------------------------------------------------------------------

console.log("\nPass 2: Concatenating clips and mixing audio...");

const concatEntries = [];
for (const shot of shots) {
  const order = String(shot.order).padStart(2, "0");
  const clipPath = join(tmpDir, `shot-${order}.mp4`);
  if (existsSync(clipPath)) {
    concatEntries.push(`file '${clipPath}'`);
  }
}

if (!concatEntries.length) {
  console.error("No clips to concatenate.");
  process.exit(1);
}

const concatListPath = join(tmpDir, "concat-list.txt");
writeFileSync(concatListPath, concatEntries.join("\n"), "utf8");

const outputPath = join(exportsDir, "flagship-en-rough-cut.mp4");

run("ffmpeg", [
  "-f", "concat", "-safe", "0", "-i", concatListPath,
  "-i", audioPath,
  "-c:v", "libx264", "-c:a", "aac", "-b:a", "192k",
  "-shortest",
  "-pix_fmt", "yuv420p",
  "-movflags", "+faststart",
  "-y", outputPath,
]);

console.log(`\nRough cut assembled: ${outputPath}`);

// Clean up temp clips
if (!hasFlag("keep-tmp")) {
  try {
    rmSync(tmpDir, { recursive: true, force: true });
  } catch {
    // ignore
  }
}

console.log("Done.");
