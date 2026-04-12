#!/usr/bin/env node

/**
 * Generates the YouTube thumbnail from three AI still crops + text overlay.
 * Output: 1280x720 PNG at assets/thumbnail.png
 *
 * Usage:
 *   node scripts/render-thumbnail.mjs --bundle video/infant-experiments/flagship-en
 */

import { existsSync, mkdirSync, rmSync } from "node:fs";
import { join, resolve, dirname } from "node:path";

import {
  colors,
  escapeXml,
  getArg,
  rasterizeSvg,
  run,
  sans,
  writeSvg,
} from "./video-utils.mjs";

const ROOT = resolve(dirname(new URL(import.meta.url).pathname), "..");
const bundle = resolve(ROOT, getArg("bundle", "video/infant-experiments/flagship-en"));
const stillsDir = join(bundle, "assets/ai-stills");
const outputDir = join(bundle, "assets");
const tmpDir = join(outputDir, ".tmp-thumb");

const TW = 1280;
const TH = 720;

mkdirSync(tmpDir, { recursive: true });

// Source stills for the three-panel crop
const strips = [
  { file: "peekaboo-face-to-face.png", cropX: 747 },
  { file: "kick-wide-room.png", cropX: 747 },
  { file: "imitation-rattle-demo.png", cropX: 747 },
];

// Check source stills exist
const missing = strips.filter((s) => !existsSync(join(stillsDir, s.file)));
if (missing.length) {
  console.error("Missing AI stills for thumbnail:");
  for (const m of missing) console.error(`  - ${m.file}`);
  process.exit(1);
}

// Step 1: Crop three vertical strips from source stills
const stripWidth = Math.floor(TW / 3);
const stripPaths = [];

for (let i = 0; i < strips.length; i++) {
  const src = join(stillsDir, strips[i].file);
  const out = join(tmpDir, `strip-${i}.png`);
  run("ffmpeg", [
    "-i", src,
    "-vf", `crop=${stripWidth}:${TH}:${strips[i].cropX}:180`,
    "-frames:v", "1",
    "-y", out,
  ], { quiet: true });
  stripPaths.push(out);
}

// Step 2: Composite strips side-by-side onto warm stone background
const basePath = join(tmpDir, "thumb-base.png");

run("ffmpeg", [
  "-f", "lavfi", "-i", `color=c=D4C5A9:s=${TW}x${TH}:d=1`,
  "-i", stripPaths[0],
  "-i", stripPaths[1],
  "-i", stripPaths[2],
  "-filter_complex",
  `[0:v][1:v]overlay=0:0[a];[a][2:v]overlay=${stripWidth}:0[b];[b][3:v]overlay=${stripWidth * 2}:0`,
  "-frames:v", "1",
  "-y", basePath,
], { quiet: true });

// Step 3: Generate text overlay SVG
const titleText = "HOW BABIES THINK";
const accentW = 200;
const accentH = 6;
const titleY = TH / 2 + 10;

const overlaySvg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${TW}" height="${TH}" viewBox="0 0 ${TW} ${TH}">
  <rect x="0" y="${TH / 2 - 100}" width="${TW}" height="200" fill="rgba(26,60,50,0.55)" />
  <text x="${TW / 2}" y="${titleY}" text-anchor="middle" fill="white" font-family="${escapeXml(sans)}" font-size="96" font-weight="900" letter-spacing="4">${escapeXml(titleText)}</text>
  <rect x="${(TW - accentW) / 2}" y="${titleY + 24}" width="${accentW}" height="${accentH}" rx="3" fill="${colors.gold}" />
</svg>`;

const overlaySvgPath = join(tmpDir, "thumb-text.svg");
writeSvg(overlaySvgPath, overlaySvg);

// Step 4: Rasterize text overlay
let overlayPngPath;
const rsvgResult = run("which", ["rsvg-convert"], { quiet: true, allowFailure: true });

if (rsvgResult.ok) {
  overlayPngPath = join(tmpDir, "thumb-text.png");
  run("rsvg-convert", ["-w", String(TW), "-h", String(TH), "-o", overlayPngPath, overlaySvgPath], { quiet: true });
} else {
  const rr = rasterizeSvg(overlaySvgPath, tmpDir, TW);
  if (!rr.ok) {
    console.error(`Failed to rasterize thumbnail text overlay: ${rr.reason}`);
    process.exit(1);
  }
  overlayPngPath = rr.outputPath;
}

// Step 5: Composite text overlay onto base
const outputPath = join(outputDir, "thumbnail.png");

run("ffmpeg", [
  "-i", basePath,
  "-i", overlayPngPath,
  "-filter_complex", "[1:v]format=rgba[ov];[0:v][ov]overlay=0:0",
  "-frames:v", "1",
  "-y", outputPath,
], { quiet: true });

// Clean up
try {
  rmSync(tmpDir, { recursive: true, force: true });
} catch {
  // ignore
}

console.log(`Thumbnail generated: ${outputPath}`);
