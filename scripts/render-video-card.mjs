#!/usr/bin/env node

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";

function getArg(name, fallback = "") {
  const index = process.argv.indexOf(`--${name}`);
  if (index === -1 || index === process.argv.length - 1) return fallback;
  return process.argv[index + 1];
}

function escapeXml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function wrapText(text, maxChars) {
  const words = text.trim().split(/\s+/).filter(Boolean);
  if (!words.length) return [];

  const lines = [];
  let current = words[0];

  for (const word of words.slice(1)) {
    if (`${current} ${word}`.length <= maxChars) {
      current = `${current} ${word}`;
    } else {
      lines.push(current);
      current = word;
    }
  }

  lines.push(current);
  return lines;
}

function renderTextBlock(lines, x, y, size, lineHeight, color, weight = 700) {
  const escaped = lines.map((line) => escapeXml(line));
  if (!escaped.length) return "";

  return [
    `<text x="${x}" y="${y}" fill="${color}" font-family="Source Sans 3, Helvetica, Arial, sans-serif" font-size="${size}" font-weight="${weight}">`,
    ...escaped.map((line, index) =>
      `  <tspan x="${x}" dy="${index === 0 ? 0 : lineHeight}">${line}</tspan>`,
    ),
    "</text>",
  ].join("\n");
}

const output = getArg("output");
if (!output) {
  console.error("Missing required --output");
  process.exit(1);
}

const eyebrow = getArg("eyebrow", "RL FIELD NOTES");
const title = getArg("title", "Video Card");
const subtitle = getArg("subtitle", "");
const cta = getArg("cta", "");
const brand = getArg("brand", "RL Field Notes");

const titleLines = wrapText(title, 24);
const subtitleLines = wrapText(subtitle, 54);
const ctaLines = wrapText(cta, 54);

const titleY = 320;
const subtitleY = titleY + titleLines.length * 92 + 44;
const ctaY = subtitleY + subtitleLines.length * 52 + 72;

const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1920" height="1080" viewBox="0 0 1920 1080" fill="none">
  <defs>
    <linearGradient id="bg" x1="220" y1="120" x2="1700" y2="960" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="#1A3C32" />
      <stop offset="1" stop-color="#0F2B22" />
    </linearGradient>
    <radialGradient id="glow1" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(1540 220) rotate(90) scale(360 480)">
      <stop stop-color="#E0F0EC" stop-opacity="0.25" />
      <stop offset="1" stop-color="#E0F0EC" stop-opacity="0" />
    </radialGradient>
    <radialGradient id="glow2" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(420 920) rotate(90) scale(340 460)">
      <stop stop-color="#FBF2DE" stop-opacity="0.18" />
      <stop offset="1" stop-color="#FBF2DE" stop-opacity="0" />
    </radialGradient>
    <pattern id="grid" width="72" height="72" patternUnits="userSpaceOnUse">
      <path d="M 72 0 L 0 0 0 72" fill="none" stroke="rgba(255,255,255,0.05)" stroke-width="1"/>
    </pattern>
  </defs>

  <rect width="1920" height="1080" fill="url(#bg)" />
  <rect width="1920" height="1080" fill="url(#grid)" opacity="0.6" />
  <circle cx="1540" cy="220" r="360" fill="url(#glow1)" />
  <circle cx="420" cy="920" r="340" fill="url(#glow2)" />

  <rect x="180" y="156" width="270" height="44" rx="22" fill="#E0F0EC" opacity="0.12" />
  <text x="216" y="185" fill="#7BC6B5" font-family="Source Sans 3, Helvetica, Arial, sans-serif" font-size="28" font-weight="700" letter-spacing="4">${escapeXml(eyebrow.toUpperCase())}</text>

  ${renderTextBlock(titleLines, 180, titleY, 84, 92, "#FFFFFF", 800)}
  ${renderTextBlock(subtitleLines, 180, subtitleY, 40, 52, "rgba(255,255,255,0.78)", 600)}
  ${ctaLines.length ? renderTextBlock(ctaLines, 180, ctaY, 30, 40, "#F6D88A", 700) : ""}

  <rect x="180" y="924" width="420" height="1.5" fill="rgba(255,255,255,0.18)" />
  <text x="180" y="968" fill="rgba(255,255,255,0.58)" font-family="Source Sans 3, Helvetica, Arial, sans-serif" font-size="28" font-weight="600">${escapeXml(brand)}</text>
</svg>
`;

mkdirSync(dirname(resolve(output)), { recursive: true });
writeFileSync(resolve(output), svg, "utf8");
