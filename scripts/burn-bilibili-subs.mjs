#!/usr/bin/env node

/**
 * Burns bilingual subtitles into the video for Bilibili upload.
 * English at top, Chinese at bottom — both from their own short-entry SRTs.
 * Uses SVG→rsvg-convert→ffmpeg overlay (no libass required).
 *
 * Usage:
 *   node scripts/burn-bilibili-subs.mjs --bundle video/infant-experiments/flagship-en
 */

import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { join, resolve, dirname } from "node:path";

import {
  escapeXml,
  getArg,
  hasFlag,
  run,
} from "./video-utils.mjs";

const ROOT = resolve(dirname(new URL(import.meta.url).pathname), "..");
const bundle = resolve(ROOT, getArg("bundle", "video/infant-experiments/flagship-en"));
const exportsDir = join(bundle, "exports");
const tmpDir = join(exportsDir, ".tmp-bili");
const roughCut = join(exportsDir, "flagship-en-rough-cut.mp4");
const zhSrt = join(bundle, "captions.zh.srt");
const enSrt = join(bundle, "captions.en.bilibili.srt");
const keepTmp = hasFlag("keep-tmp");

const W = 1920;
const H = 1080;
const zhFont = "PingFang SC";
const enFont = "Helvetica Neue";

mkdirSync(tmpDir, { recursive: true });

// ---------------------------------------------------------------------------
// Parse SRT
// ---------------------------------------------------------------------------

function parseSrt(path) {
  const content = readFileSync(path, "utf8").trim();
  const blocks = content.split(/\n\n+/);
  return blocks.map((block) => {
    const lines = block.trim().split("\n");
    const index = parseInt(lines[0], 10);
    const [startStr, endStr] = lines[1].split(" --> ");
    const text = lines.slice(2).join(" ");
    return { index, start: srtToSeconds(startStr), end: srtToSeconds(endStr), text };
  });
}

function srtToSeconds(ts) {
  const [h, m, rest] = ts.trim().split(":");
  const [s, ms] = rest.split(",");
  return parseInt(h) * 3600 + parseInt(m) * 60 + parseInt(s) + parseInt(ms || 0) / 1000;
}

// ---------------------------------------------------------------------------
// Build merged bilingual timeline
// ---------------------------------------------------------------------------

function buildTimeline(zhSubs, enSubs) {
  // Collect all unique time boundaries
  const times = new Set();
  for (const s of [...zhSubs, ...enSubs]) {
    times.add(s.start);
    times.add(s.end);
  }
  const sorted = [...times].sort((a, b) => a - b);

  // For each time segment, find active ZH and EN text
  const segments = [];
  for (let i = 0; i < sorted.length - 1; i++) {
    const t = (sorted[i] + sorted[i + 1]) / 2; // midpoint
    const zh = zhSubs.find((s) => t >= s.start && t < s.end);
    const en = enSubs.find((s) => t >= s.start && t < s.end);
    if (!zh && !en) continue;
    segments.push({
      start: sorted[i],
      end: sorted[i + 1],
      zh: zh ? zh.text : "",
      en: en ? en.text : "",
    });
  }

  // Merge consecutive segments with identical text
  const merged = [segments[0]];
  for (let i = 1; i < segments.length; i++) {
    const prev = merged[merged.length - 1];
    const cur = segments[i];
    if (prev.zh === cur.zh && prev.en === cur.en) {
      prev.end = cur.end;
    } else {
      merged.push(cur);
    }
  }
  return merged;
}

// ---------------------------------------------------------------------------
// SVG rendering — EN top, ZH bottom, compact
// ---------------------------------------------------------------------------

function renderSubtitleSvg(zhText, enText) {
  const enSize = 26;
  const zhSize = 34;
  const padding = 14;

  let svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">`;

  // English at the top
  if (enText) {
    const enBoxH = enSize + padding * 2;
    svg += `\n  <rect x="0" y="0" width="${W}" height="${enBoxH}" fill="rgba(0,0,0,0.4)" />`;
    const ey = padding + enSize * 0.8;
    svg += `\n  <text x="${W / 2}" y="${ey}" text-anchor="middle" fill="rgba(220,220,220,0.85)" font-family="${escapeXml(enFont)}" font-size="${enSize}" font-weight="400">${escapeXml(enText)}</text>`;
  }

  // Chinese at the bottom
  if (zhText) {
    const zhBoxH = zhSize + padding * 2;
    const zhBoxY = H - zhBoxH - 16;
    svg += `\n  <rect x="0" y="${zhBoxY}" width="${W}" height="${zhBoxH + 16}" fill="rgba(0,0,0,0.45)" />`;
    const zy = zhBoxY + padding + zhSize * 0.8;
    svg += `\n  <text x="${W / 2}" y="${zy}" text-anchor="middle" fill="white" font-family="${escapeXml(zhFont)}" font-size="${zhSize}" font-weight="600">${escapeXml(zhText)}</text>`;
  }

  svg += "\n</svg>";
  return svg;
}

// ---------------------------------------------------------------------------
// Main pipeline
// ---------------------------------------------------------------------------

if (!existsSync(roughCut)) {
  console.error(`Missing rough cut: ${roughCut}`);
  console.error("Run: npm run video:infant-experiments:assemble");
  process.exit(1);
}

console.log("Parsing subtitle files...");
const zhSubs = parseSrt(zhSrt);
const enSubs = parseSrt(enSrt);
console.log(`  ZH: ${zhSubs.length} entries, EN: ${enSubs.length} entries`);

const timeline = buildTimeline(zhSubs, enSubs);
console.log(`  Merged timeline: ${timeline.length} segments`);

// Step 1: Generate subtitle overlay PNGs
console.log("\nStep 1: Generating subtitle overlay PNGs...");

for (let i = 0; i < timeline.length; i++) {
  const seg = timeline[i];
  const svgContent = renderSubtitleSvg(seg.zh, seg.en);
  const pad = String(i + 1).padStart(3, "0");
  const svgPath = join(tmpDir, `sub-${pad}.svg`);
  const pngPath = join(tmpDir, `sub-${pad}.png`);
  writeFileSync(svgPath, svgContent, "utf8");
  run("rsvg-convert", ["-w", String(W), "-h", String(H), "-o", pngPath, svgPath], { quiet: true });
}
console.log(`  Generated ${timeline.length} overlay PNGs`);

// Step 2: Build ffmpeg filter chain — batch overlay
console.log("\nStep 2: Building overlay filter chain...");

const batchSize = 8;
let currentInput = roughCut;
const totalBatches = Math.ceil(timeline.length / batchSize);

for (let batch = 0; batch < totalBatches; batch++) {
  const startIdx = batch * batchSize;
  const endIdx = Math.min(startIdx + batchSize, timeline.length);
  const batchSegs = timeline.slice(startIdx, endIdx);

  const inputs = ["-i", currentInput];
  for (let i = startIdx; i < endIdx; i++) {
    const pad = String(i + 1).padStart(3, "0");
    inputs.push("-i", join(tmpDir, `sub-${pad}.png`));
  }

  let filterParts = [];
  let prevLabel = "0:v";

  for (let j = 0; j < batchSegs.length; j++) {
    const seg = batchSegs[j];
    const inputIdx = j + 1;
    const outLabel = j === batchSegs.length - 1 ? "vout" : `v${j}`;
    const start = seg.start.toFixed(2);
    const end = seg.end.toFixed(2);
    filterParts.push(
      `[${prevLabel}][${inputIdx}:v]overlay=enable='between(t,${start},${end})':x=0:y=0[${outLabel}]`
    );
    prevLabel = outLabel;
  }

  const filterComplex = filterParts.join(";");
  const batchOutput = join(tmpDir, `batch-${batch}.mp4`);

  const args = [
    ...inputs,
    "-filter_complex", filterComplex,
    "-map", "[vout]",
    "-map", `0:a`,
    "-c:v", "libx264", "-preset", "fast", "-crf", "20",
    "-c:a", "copy",
    "-pix_fmt", "yuv420p",
    ...(batch === totalBatches - 1 ? ["-movflags", "+faststart"] : []),
    "-y", batchOutput,
  ];

  console.log(`  Batch ${batch + 1}/${totalBatches} (segs ${startIdx + 1}-${endIdx})...`);
  run("ffmpeg", args, { quiet: true });
  currentInput = batchOutput;
}

const outputPath = join(exportsDir, "bilibili-export.mp4");
run("mv", [currentInput, outputPath], { quiet: true });

if (!keepTmp) {
  try { rmSync(tmpDir, { recursive: true, force: true }); } catch { /* ignore */ }
}

console.log(`\nBilibili export complete: ${outputPath}`);
