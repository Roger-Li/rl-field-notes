#!/usr/bin/env node

/**
 * Shared utilities for the video production pipeline.
 * Extracted from render-infant-experiments-figures.mjs and render-video-card.mjs.
 */

import { existsSync, mkdirSync, readFileSync, renameSync, rmSync, writeFileSync } from "node:fs";
import { basename, dirname, join } from "node:path";
import { spawnSync } from "node:child_process";

export const colors = {
  bg: "#F0F7F4",
  card: "#FFFFFF",
  accent: "#3B8A7A",
  accentLight: "#E0F0EC",
  indigo: "#4A6FA5",
  indigoLight: "#E4EDF7",
  navy: "#1A3C32",
  gold: "#C49A3C",
  goldLight: "#FBF2DE",
  teal: "#2E9E8E",
  tealLight: "#DDF2EE",
  green: "#4E9960",
  greenLight: "#E5F3E8",
  rose: "#C46060",
  roseLight: "#FCF0F0",
  text: "#1A3C32",
  textLight: "#5A7A6E",
  border: "#CEDED6",
};

export const sans = "'Source Sans 3', 'Helvetica Neue', Arial, sans-serif";
export const serif = "Georgia, serif";

export function escapeXml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

export function getArg(name, fallback = "") {
  const index = process.argv.indexOf(`--${name}`);
  if (index === -1 || index === process.argv.length - 1) return fallback;
  return process.argv[index + 1];
}

export function hasFlag(name) {
  return process.argv.includes(`--${name}`);
}

export function wrapText(text, maxChars) {
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

export function textBlock({
  lines,
  x,
  y,
  size,
  lineHeight,
  color,
  weight = 600,
  anchor = "start",
  family = sans,
}) {
  if (!lines.length) return "";
  return [
    `<text x="${x}" y="${y}" text-anchor="${anchor}" fill="${color}" font-family="${escapeXml(family)}" font-size="${size}" font-weight="${weight}">`,
    ...lines.map((line, index) =>
      `  <tspan x="${x}" dy="${index === 0 ? 0 : lineHeight}">${escapeXml(line)}</tspan>`,
    ),
    "</text>",
  ].join("\n");
}

export function writeSvg(outputPath, contents) {
  mkdirSync(dirname(outputPath), { recursive: true });
  writeFileSync(outputPath, contents, "utf8");
}

export function rasterizeSvg(svgPath, outputDir, size = 1920) {
  mkdirSync(outputDir, { recursive: true });
  const result = spawnSync(
    "qlmanage",
    ["-t", "-s", String(size), "-o", outputDir, svgPath],
    { encoding: "utf8" },
  );

  if (result.status !== 0) {
    return {
      ok: false,
      reason: result.stderr || result.stdout || "Unknown qlmanage failure",
    };
  }

  const thumbnailPath = join(outputDir, `${basename(svgPath)}.png`);
  if (!existsSync(thumbnailPath)) {
    return { ok: false, reason: "qlmanage completed but PNG file was missing" };
  }

  const finalPath = join(outputDir, `${basename(svgPath, ".svg")}.png`);
  if (existsSync(finalPath)) rmSync(finalPath);
  renameSync(thumbnailPath, finalPath);
  return { ok: true, outputPath: finalPath };
}

export function run(cmd, args, opts = {}) {
  const result = spawnSync(cmd, args, {
    encoding: "utf8",
    stdio: opts.quiet ? "pipe" : "inherit",
    ...opts,
  });
  if (result.status !== 0) {
    const msg = result.stderr || result.stdout || `${cmd} exited with code ${result.status}`;
    if (opts.allowFailure) return { ok: false, reason: msg };
    throw new Error(`${cmd} failed: ${msg}`);
  }
  return { ok: true, stdout: result.stdout, stderr: result.stderr };
}

export function compositeImages(basePng, overlayPng, outputPng) {
  mkdirSync(dirname(outputPng), { recursive: true });
  return run("ffmpeg", [
    "-i", basePng,
    "-i", overlayPng,
    "-filter_complex", "[1:v]format=rgba[ov];[0:v][ov]overlay=0:0",
    "-y", outputPng,
  ], { quiet: true });
}

export function parseTimestamp(ts) {
  const parts = ts.trim().split(":");
  if (parts.length === 2) {
    return parseInt(parts[0], 10) * 60 + parseInt(parts[1], 10);
  }
  if (parts.length === 3) {
    return parseInt(parts[0], 10) * 3600 + parseInt(parts[1], 10) * 60 + parseInt(parts[2], 10);
  }
  return 0;
}

export function parseShotlistCsv(csvPath) {
  const raw = readFileSync(csvPath, "utf8").trim();
  const lines = raw.split("\n");
  const header = lines[0].split(",").map((h) => h.trim());
  const shots = [];
  for (let i = 1; i < lines.length; i++) {
    const values = parseCSVLine(lines[i]);
    const shot = {};
    for (let j = 0; j < header.length; j++) {
      shot[header[j]] = (values[j] || "").trim();
    }
    shot.startSec = parseTimestamp(shot.start);
    shot.endSec = parseTimestamp(shot.end);
    shot.duration = shot.endSec - shot.startSec;
    shot.index = i;
    shots.push(shot);
  }
  return shots;
}

function parseCSVLine(line) {
  const values = [];
  let current = "";
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (ch === "," && !inQuotes) {
      values.push(current);
      current = "";
    } else {
      current += ch;
    }
  }
  values.push(current);
  return values;
}
