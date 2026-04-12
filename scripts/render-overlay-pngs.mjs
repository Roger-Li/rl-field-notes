#!/usr/bin/env node

/**
 * Replaces Keynote in the video production pipeline.
 * Generates 15 overlay PNGs by compositing SVG text layers onto AI-still base images.
 *
 * Usage:
 *   node scripts/render-overlay-pngs.mjs --bundle video/infant-experiments/flagship-en
 *   node scripts/render-overlay-pngs.mjs --bundle video/infant-experiments/flagship-en --only 03
 */

import { existsSync, mkdirSync, readdirSync, rmSync } from "node:fs";
import { join, resolve, dirname } from "node:path";

import {
  colors,
  escapeXml,
  getArg,
  hasFlag,
  rasterizeSvg,
  run,
  sans,
  serif,
  writeSvg,
} from "./video-utils.mjs";

const ROOT = resolve(dirname(new URL(import.meta.url).pathname), "..");
const bundle = resolve(ROOT, getArg("bundle", "video/infant-experiments/flagship-en"));
const stillsDir = join(bundle, "assets/ai-stills");
const outputDir = join(bundle, "assets/keynote-exports");
const tmpDir = join(outputDir, ".tmp");
const onlyId = getArg("only", "");

mkdirSync(outputDir, { recursive: true });
mkdirSync(tmpDir, { recursive: true });

const W = 1920;
const H = 1080;

// ---------------------------------------------------------------------------
// Overlay definitions — maps directly to prompts.md Keynote export list
// ---------------------------------------------------------------------------

const overlays = [
  {
    id: "01",
    file: "01-intro-four-abilities.png",
    base: "four-abilities-vignettes.png",
    type: "labels",
    items: [
      { text: "Prediction", x: 480, y: 340 },
      { text: "Social expectation", x: 1440, y: 340 },
      { text: "Cause and effect", x: 480, y: 780 },
      { text: "Memory", x: 1440, y: 780 },
    ],
  },
  {
    id: "02",
    file: "02-ground-rules-overlay.png",
    base: "ground-rules-room.png",
    type: "labels",
    items: [
      { text: "Not diagnostic", x: 1480, y: 220 },
      { text: "Calm baby", x: 1480, y: 360 },
      { text: "Quiet room", x: 1480, y: 500 },
      { text: "Stop early", x: 1480, y: 640 },
      { text: "Keep it short", x: 1480, y: 780 },
    ],
  },
  {
    id: "03",
    file: "03-peekaboo-title.png",
    base: "peekaboo-face-to-face.png",
    type: "title",
    title: "Experiment 1: Peekaboo",
  },
  {
    id: "04",
    file: "04-peekaboo-protocol.png",
    base: "peekaboo-variation-strip.png",
    type: "strip-labels",
    labels: ["Ready", "Hide", "Pause", "Reveal"],
  },
  {
    id: "05",
    file: "05-peekaboo-variations.png",
    base: "peekaboo-variation-strip.png",
    type: "strip-labels",
    labels: ["Standard", "Delayed", "Wrong-side"],
  },
  {
    id: "06",
    file: "06-still-face-title.png",
    base: "still-face-neutral-setup.png",
    type: "title",
    title: "Experiment 2: Still-face",
  },
  {
    id: "07",
    file: "07-still-face-phases.png",
    base: "still-face-phase-strip.png",
    type: "strip-labels",
    labels: ["Play \u2014 ~60 s", "Still-face \u2014 \u226430 s", "Reunion now"],
    banner: { text: "Optional / stop early", color: colors.rose },
  },
  {
    id: "08",
    file: "08-kick-title.png",
    base: "kick-wide-room.png",
    type: "title",
    title: "Experiment 3: Kick-to-move",
  },
  {
    id: "09",
    file: "09-kick-safe-setup.png",
    base: "kick-wide-room.png",
    type: "labels",
    items: [
      { text: "Soft ribbon", x: 480, y: 340 },
      { text: "Lightweight toy", x: 960, y: 220 },
      { text: "Parent nearby", x: 1440, y: 340 },
    ],
  },
  {
    id: "10",
    file: "10-kick-phases.png",
    base: "kick-phase-strip.png",
    type: "strip-labels",
    labels: ["Baseline", "Connected", "Disconnect"],
  },
  {
    id: "11",
    file: "11-imitation-title.png",
    base: "imitation-rattle-demo.png",
    type: "title",
    title: "Experiment 4: Imitation",
  },
  {
    id: "12",
    file: "12-imitation-versions.png",
    base: "imitation-delay-sequence.png",
    type: "strip-labels",
    labels: ["Immediate", "Short delay", "Jingly object"],
  },
  {
    id: "13",
    file: "13-record-reflect-title.png",
    base: "observation-notebook.png",
    type: "title",
    title: "Record what you saw",
  },
  {
    id: "14",
    file: "14-observation-template.png",
    base: "observation-notebook.png",
    type: "template",
  },
  {
    id: "15",
    file: "15-end-card.png",
    base: "hero-home-lab.png",
    type: "endcard",
  },
];

// ---------------------------------------------------------------------------
// SVG overlay renderers — produce transparent-background 1920x1080 SVGs
// ---------------------------------------------------------------------------

function svgWrap(body) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
${body}
</svg>`;
}

function pill(text, cx, cy, { fontSize = 30, color = "white", bg = "rgba(26,60,50,0.78)", paddingX = 28, paddingY = 12, rx = 24 } = {}) {
  const charWidth = fontSize * 0.55;
  const textWidth = text.length * charWidth;
  const w = textWidth + paddingX * 2;
  const h = fontSize + paddingY * 2;
  return `  <rect x="${cx - w / 2}" y="${cy - h / 2}" width="${w}" height="${h}" rx="${rx}" fill="${bg}" />
  <text x="${cx}" y="${cy + fontSize * 0.35}" text-anchor="middle" fill="${color}" font-family="${escapeXml(sans)}" font-size="${fontSize}" font-weight="700">${escapeXml(text)}</text>`;
}

function renderTitle(overlay) {
  const bandY = 400;
  const bandH = 280;
  return svgWrap(`
  <rect x="0" y="${bandY}" width="${W}" height="${bandH}" fill="rgba(26,60,50,0.72)" />
  <text x="${W / 2}" y="${bandY + bandH / 2 + 12}" text-anchor="middle" fill="white" font-family="${escapeXml(sans)}" font-size="72" font-weight="800">${escapeXml(overlay.title)}</text>
  <rect x="${W / 2 - 60}" y="${bandY + bandH / 2 + 40}" width="120" height="3" rx="1.5" fill="${colors.gold}" />`);
}

function renderLabels(overlay) {
  const pills = overlay.items.map((item) => pill(item.text, item.x, item.y));
  return svgWrap(pills.join("\n"));
}

function renderStripLabels(overlay) {
  const labels = overlay.labels;
  const count = labels.length;
  const bandY = 830;
  const bandH = 250;
  const parts = [`  <rect x="0" y="${bandY}" width="${W}" height="${bandH}" fill="rgba(26,60,50,0.68)" />`];

  for (let i = 0; i < count; i++) {
    const cx = (W / count) * (i + 0.5);
    parts.push(
      `  <text x="${cx}" y="${bandY + 70}" text-anchor="middle" fill="white" font-family="${escapeXml(sans)}" font-size="38" font-weight="700">${escapeXml(labels[i])}</text>`,
    );
  }

  if (overlay.banner) {
    const bw = 340;
    const bh = 44;
    const bx = W - bw - 40;
    const by = 40;
    parts.push(
      `  <rect x="${bx}" y="${by}" width="${bw}" height="${bh}" rx="22" fill="${overlay.banner.color}" />`,
      `  <text x="${bx + bw / 2}" y="${by + bh / 2 + 7}" text-anchor="middle" fill="white" font-family="${escapeXml(sans)}" font-size="22" font-weight="700">${escapeXml(overlay.banner.text)}</text>`,
    );
  }

  return svgWrap(parts.join("\n"));
}

function renderTemplate() {
  const cardX = 240;
  const cardY = 140;
  const cardW = W - 480;
  const cardH = H - 280;
  const midX = W / 2;
  const headerY = cardY + 70;
  const dividerY = headerY + 30;
  const rowH = 80;

  const exampleLeft = "Smiled before reveal";
  const exampleRight = "May have predicted the timing";

  return svgWrap(`
  <rect x="${cardX}" y="${cardY}" width="${cardW}" height="${cardH}" rx="24" fill="rgba(255,255,255,0.92)" />
  <text x="${cardX + cardW / 4}" y="${headerY}" text-anchor="middle" fill="${colors.accent}" font-family="${escapeXml(sans)}" font-size="32" font-weight="700">What I saw</text>
  <text x="${cardX + (cardW * 3) / 4}" y="${headerY}" text-anchor="middle" fill="${colors.indigo}" font-family="${escapeXml(sans)}" font-size="32" font-weight="700">What I think it means</text>
  <line x1="${midX}" y1="${cardY + 20}" x2="${midX}" y2="${cardY + cardH - 20}" stroke="${colors.border}" stroke-width="1.5" />
  <line x1="${cardX + 30}" y1="${dividerY}" x2="${cardX + cardW - 30}" y2="${dividerY}" stroke="${colors.border}" stroke-width="1" />
  <text x="${cardX + cardW / 4}" y="${dividerY + rowH / 2 + 10}" text-anchor="middle" fill="${colors.text}" font-family="${escapeXml(sans)}" font-size="26" font-weight="500">${escapeXml(exampleLeft)}</text>
  <text x="${cardX + (cardW * 3) / 4}" y="${dividerY + rowH / 2 + 10}" text-anchor="middle" fill="${colors.textLight}" font-family="${escapeXml(sans)}" font-size="26" font-weight="500" font-style="italic">${escapeXml(exampleRight)}</text>
  <line x1="${cardX + 30}" y1="${dividerY + rowH}" x2="${cardX + cardW - 30}" y2="${dividerY + rowH}" stroke="${colors.border}" stroke-width="0.5" stroke-dasharray="6 4" />
  <line x1="${cardX + 30}" y1="${dividerY + rowH * 2}" x2="${cardX + cardW - 30}" y2="${dividerY + rowH * 2}" stroke="${colors.border}" stroke-width="0.5" stroke-dasharray="6 4" />
  <line x1="${cardX + 30}" y1="${dividerY + rowH * 3}" x2="${cardX + cardW - 30}" y2="${dividerY + rowH * 3}" stroke="${colors.border}" stroke-width="0.5" stroke-dasharray="6 4" />
  <text x="${W / 2}" y="${cardY + cardH - 40}" text-anchor="middle" fill="${colors.textLight}" font-family="${escapeXml(sans)}" font-size="20" font-weight="500">Look for patterns across different days</text>`);
}

function renderEndcard() {
  const scrimY = 480;
  const scrimH = H - scrimY;
  return svgWrap(`
  <rect x="0" y="${scrimY}" width="${W}" height="${scrimH}" fill="rgba(26,60,50,0.82)" />
  <rect x="${W / 2 - 120}" y="${scrimY + 40}" width="240" height="36" rx="18" fill="rgba(224,240,236,0.15)" />
  <text x="${W / 2}" y="${scrimY + 65}" text-anchor="middle" fill="${colors.accentLight}" font-family="${escapeXml(sans)}" font-size="20" font-weight="700" letter-spacing="3">RL FIELD NOTES</text>
  <text x="${W / 2}" y="${scrimY + 160}" text-anchor="middle" fill="white" font-family="${escapeXml(sans)}" font-size="52" font-weight="700">Read the full guide</text>
  <text x="${W / 2}" y="${scrimY + 230}" text-anchor="middle" fill="${colors.gold}" font-family="${escapeXml(sans)}" font-size="34" font-weight="600">rl-field-notes.vercel.app</text>
  <rect x="${W / 2 - 60}" y="${scrimY + 258}" width="120" height="3" rx="1.5" fill="${colors.gold}" opacity="0.6" />`);
}

const renderers = {
  title: renderTitle,
  labels: renderLabels,
  "strip-labels": renderStripLabels,
  template: renderTemplate,
  endcard: renderEndcard,
};

// ---------------------------------------------------------------------------
// Compositing pipeline
// ---------------------------------------------------------------------------

function detectRsvgConvert() {
  const r = run("which", ["rsvg-convert"], { quiet: true, allowFailure: true });
  return r.ok;
}

let useRsvg = false;

function rasterizeOverlaySvg(svgPath, pngPath) {
  if (useRsvg) {
    return run("rsvg-convert", ["-w", String(W), "-h", String(H), "-o", pngPath, svgPath], { quiet: true });
  }
  const result = rasterizeSvg(svgPath, tmpDir, W);
  return result;
}

function compositeOverlay(basePng, overlayPngPath, outputPath) {
  mkdirSync(dirname(outputPath), { recursive: true });
  const result = run("ffmpeg", [
    "-i", basePng,
    "-i", overlayPngPath,
    "-filter_complex",
    `[0:v]scale=${W}:${H}:force_original_aspect_ratio=decrease,pad=${W}:${H}:(ow-iw)/2:(oh-ih)/2:color=black[bg];[1:v]format=rgba[ov];[bg][ov]overlay=0:0`,
    "-frames:v", "1",
    "-y", outputPath,
  ], { quiet: true });
  return result;
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

const targets = onlyId
  ? overlays.filter((o) => o.id === onlyId)
  : overlays;

if (!targets.length) {
  console.error(`No overlay found with id "${onlyId}"`);
  process.exit(1);
}

// Check for rsvg-convert as a potentially better rasterizer for transparency
useRsvg = detectRsvgConvert();
if (useRsvg) {
  console.log("Using rsvg-convert for SVG rasterization (transparency-safe).");
} else {
  console.log("Using qlmanage for SVG rasterization. Install librsvg for better transparency: brew install librsvg");
}

// Check that base images exist
const missing = [];
for (const overlay of targets) {
  const basePath = join(stillsDir, overlay.base);
  if (!existsSync(basePath)) missing.push(overlay.base);
}

if (missing.length) {
  console.error(`\nMissing AI stills in ${stillsDir}:`);
  for (const m of missing) console.error(`  - ${m}`);
  console.error("\nGenerate these with Nano Banana first, or run with --placeholder to use solid-color stand-ins.");

  if (hasFlag("placeholder")) {
    console.log("\nGenerating placeholder stills...");
    const placeholderColors = [
      "#D4C5A9", "#B8C4B8", "#C4B8A0", "#A8B8A8", "#C0B090",
      "#B0C0B0", "#C8B898", "#A0B0A0", "#BCC0A8", "#D0C0A0",
      "#B4B8A4", "#C4C0B0",
    ];
    const allBases = [...new Set(overlays.map((o) => o.base))];
    for (let i = 0; i < allBases.length; i++) {
      const basePath = join(stillsDir, allBases[i]);
      if (!existsSync(basePath)) {
        mkdirSync(stillsDir, { recursive: true });
        const color = placeholderColors[i % placeholderColors.length];
        run("ffmpeg", [
          "-f", "lavfi", "-i", `color=c=${color}:s=${W}x${H}:d=1`,
          "-frames:v", "1", "-y", basePath,
        ], { quiet: true });
        console.log(`  Created placeholder: ${allBases[i]}`);
      }
    }
  } else {
    process.exit(1);
  }
}

let success = 0;
let failed = 0;

for (const overlay of targets) {
  const renderer = renderers[overlay.type];
  if (!renderer) {
    console.error(`Unknown overlay type: ${overlay.type} for ${overlay.id}`);
    failed++;
    continue;
  }

  const svgContent = renderer(overlay);
  const svgPath = join(tmpDir, `${overlay.id}-overlay.svg`);
  writeSvg(svgPath, svgContent);

  // Rasterize SVG to transparent PNG
  let overlayPngPath;
  if (useRsvg) {
    overlayPngPath = join(tmpDir, `${overlay.id}-overlay.png`);
    const rasterResult = run("rsvg-convert", [
      "-w", String(W), "-h", String(H),
      "-o", overlayPngPath, svgPath,
    ], { quiet: true, allowFailure: true });

    if (!rasterResult.ok) {
      console.error(`  Failed to rasterize ${overlay.id}: ${rasterResult.reason}`);
      failed++;
      continue;
    }
  } else {
    const rasterResult = rasterizeSvg(svgPath, tmpDir, W);
    if (!rasterResult.ok) {
      console.error(`  Failed to rasterize ${overlay.id}: ${rasterResult.reason}`);
      failed++;
      continue;
    }
    overlayPngPath = rasterResult.outputPath;
  }

  // Composite overlay onto base image
  const basePath = join(stillsDir, overlay.base);
  const outputPath = join(outputDir, overlay.file);

  const compResult = compositeOverlay(basePath, overlayPngPath, outputPath);
  if (!compResult.ok) {
    console.error(`  Failed to composite ${overlay.id}: ${compResult.reason}`);
    failed++;
    continue;
  }

  console.log(`  ✓ ${overlay.file}`);
  success++;
}

// Clean up temp directory
try {
  rmSync(tmpDir, { recursive: true, force: true });
} catch {
  // ignore cleanup failures
}

console.log(`\nOverlay generation complete: ${success} succeeded, ${failed} failed.`);
if (failed > 0) process.exit(1);
