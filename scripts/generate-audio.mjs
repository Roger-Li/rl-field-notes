#!/usr/bin/env node
/**
 * Orchestrates TTS generation for all content entries.
 *
 * Usage:
 *   npm run generate-audio                                    # all articles, both locales
 *   npm run generate-audio -- --only first-week               # one article, both locales
 *   npm run generate-audio -- --only first-week --locale en   # one article, one locale
 *   npm run generate-audio -- --voice Ryan --force            # override voice, force regen
 *
 * For each content entry + locale:
 *   1. Checks if a transcript file exists
 *   2. Checks if the audio file is stale (transcript newer than audio)
 *   3. Spawns the Python TTS script to generate the MP3
 *   4. Writes public/audio/manifest.json with duration metadata
 *
 * Runs up to MAX_PARALLEL Python processes concurrently.
 * Each process loads its own copy of the model (~5.3 GB).
 */

import { spawn, spawnSync } from "node:child_process";
import { existsSync, statSync, writeFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { parseArgs } from "node:util";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");

const CONTENT_KEYS = [
  "guides/first-week",
  "guides/formula-feeding",
  "her-notes/delivery",
  "reading-notes/happiest-baby-on-the-block",
  "reading-notes/twelve-hours-sleep",
];

const LOCALES = ["en", "zh"];

// Each model instance uses ~5.3 GB. With 128 GB RAM this is very comfortable.
const MAX_PARALLEL = 4;

const AUDIO_DIR = resolve(ROOT, "public/audio");
const MANIFEST_PATH = resolve(AUDIO_DIR, "manifest.json");

const PYTHON_BIN = process.env.VIRTUAL_ENV
  ? resolve(process.env.VIRTUAL_ENV, "bin", "python3")
  : "python3";

function getTranscriptPath(contentKey, locale) {
  return resolve(ROOT, "content", contentKey, `transcript.${locale}.txt`);
}

function getAudioFileName(contentKey, locale) {
  return `${contentKey.replace(/\//g, "--")}--${locale}.mp3`;
}

function getAudioPath(contentKey, locale) {
  return resolve(AUDIO_DIR, getAudioFileName(contentKey, locale));
}

function isStale(transcriptPath, audioPath) {
  if (!existsSync(audioPath)) return true;
  const tMtime = statSync(transcriptPath).mtimeMs;
  const aMtime = statSync(audioPath).mtimeMs;
  return tMtime > aMtime;
}

function getAudioDuration(mp3Path) {
  try {
    const result = spawnSync(
      "ffprobe",
      [
        "-v",
        "error",
        "-show_entries",
        "format=duration",
        "-of",
        "csv=p=0",
        mp3Path,
      ],
      { encoding: "utf-8" },
    );
    return parseFloat(result.stdout.trim()) || 0;
  } catch {
    return 0;
  }
}

// Content keys that use a female voice (OpenAI nova for EN, CosyVoice2 anna for ZH).
const FEMALE_VOICE_KEYS = ["her-notes/"];

function pickTTSConfig(locale, contentKey) {
  const isFemale = FEMALE_VOICE_KEYS.some((prefix) => contentKey.startsWith(prefix));

  if (isFemale && locale === "en") {
    // OpenAI gpt-4o-mini-tts with "nova" — natural female English voice
    return { script: `${__dirname}/tts_generate_openai.py`, voice: "nova", engine: "OpenAI nova" };
  }
  if (locale === "zh") {
    // CosyVoice2 via SiliconFlow — female Chinese voice for her-notes, default for others
    const voice = isFemale ? "anna" : undefined;
    return { script: `${__dirname}/tts_generate_api.py`, voice, engine: "CosyVoice2 API" };
  }
  // Default: local Qwen3-TTS (male English)
  return { script: `${__dirname}/tts_generate.py`, voice: undefined, engine: "Qwen3-TTS local" };
}

/** Spawn a Python TTS process and return a promise that resolves with exit code. */
function spawnTTS(transcriptPath, audioPath, locale, label, voice, contentKey) {
  return new Promise((resolve) => {
    const config = pickTTSConfig(locale, contentKey);
    const effectiveVoice = voice || config.voice;
    console.log(`  GEN   ${label} (${config.engine}${effectiveVoice ? `, voice=${effectiveVoice}` : ""})`);
    const args = [config.script, "--input", transcriptPath, "--output", audioPath, "--lang", locale];
    if (effectiveVoice) {
      args.push("--voice", effectiveVoice);
    }
    const child = spawn(PYTHON_BIN, args, { stdio: "inherit" });
    child.on("close", (code) => resolve(code ?? 1));
    child.on("error", () => resolve(1));
  });
}

async function main() {
  const { values } = parseArgs({
    options: {
      only: { type: "string" },
      locale: { type: "string" },
      voice: { type: "string" },
      force: { type: "boolean", default: false },
    },
    strict: false,
  });

  const filterPattern = values.only;
  const localeFilter = values.locale;
  const voiceOverride = values.voice;
  const force = values.force;

  // Load existing manifest so up-to-date entries are preserved
  let manifest = {};
  if (existsSync(MANIFEST_PATH)) {
    try {
      manifest = JSON.parse(
        (await import("node:fs")).readFileSync(MANIFEST_PATH, "utf-8"),
      );
    } catch {
      /* start fresh */
    }
  }

  const jobs = [];

  // Collect work
  for (const key of CONTENT_KEYS) {
    if (filterPattern && !key.includes(filterPattern)) {
      continue;
    }

    for (const locale of LOCALES) {
      if (localeFilter && locale !== localeFilter) {
        continue;
      }

      const transcriptPath = getTranscriptPath(key, locale);
      const audioPath = getAudioPath(key, locale);
      const audioFileName = getAudioFileName(key, locale);

      if (!existsSync(transcriptPath)) {
        console.log(`  SKIP  ${audioFileName} (no transcript)`);
        continue;
      }

      if (!force && !isStale(transcriptPath, audioPath)) {
        console.log(`  OK    ${audioFileName} (up to date)`);
        const duration = getAudioDuration(audioPath);
        const size = statSync(audioPath).size;
        manifest[audioFileName] = { duration: Math.round(duration), size };
        continue;
      }

      jobs.push({ key, locale, transcriptPath, audioPath, audioFileName });
    }
  }

  if (jobs.length === 0) {
    console.log("\nNothing to generate.");
    writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2) + "\n");
    return;
  }

  console.log(`\n  ${jobs.length} file(s) to generate, ${MAX_PARALLEL} parallel\n`);

  // Process in batches of MAX_PARALLEL
  let generated = 0;
  for (let i = 0; i < jobs.length; i += MAX_PARALLEL) {
    const batch = jobs.slice(i, i + MAX_PARALLEL);
    const results = await Promise.all(
      batch.map((j) =>
        spawnTTS(
          j.transcriptPath,
          j.audioPath,
          j.locale,
          j.audioFileName,
          voiceOverride,
          j.key,
        ),
      ),
    );

    for (let k = 0; k < batch.length; k++) {
      const j = batch[k];
      if (results[k] !== 0) {
        console.error(`  FAIL  ${j.audioFileName}`);
        continue;
      }
      const duration = getAudioDuration(j.audioPath);
      const size = statSync(j.audioPath).size;
      manifest[j.audioFileName] = { duration: Math.round(duration), size };
      generated++;
    }
  }

  writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2) + "\n");
  console.log(
    `\nDone: ${generated} generated, ${jobs.length - generated} failed. Manifest: ${MANIFEST_PATH}`,
  );
}

main();
