#!/usr/bin/env node
/**
 * Validates that all content entries have the required files in place:
 *   - English route wrapper:   app/(en)/{category}/{slug}/page.tsx
 *   - Chinese route wrapper:   app/zh/{category}/{slug}/page.tsx
 *   - English transcript:      content/{key}/transcript.en.txt
 *   - Chinese transcript:      content/{key}/transcript.zh.txt
 *   - At least one content component (.tsx) under content/{key}/
 *
 * Also checks for orphaned content directories (dirs with transcripts
 * but no matching entry in lib/content.ts).
 *
 * Usage:
 *   npm run validate-content
 *   npm run validate-content -- --fix-hint   # show copy-pasteable hints
 */

import { existsSync, readdirSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");

// ---------------------------------------------------------------------------
// 1. Parse content entries from lib/content.ts
//    We extract keys from the _contentEntries object by regex since we can't
//    import TypeScript directly. This is intentionally simple — the keys are
//    always double-quoted string literals at the start of an object entry.
// ---------------------------------------------------------------------------

import { readFileSync } from "node:fs";

const contentTsPath = resolve(ROOT, "lib/content.ts");
const contentTs = readFileSync(contentTsPath, "utf-8");

const KEY_RE = /^\s+"([a-z-]+\/[a-z0-9-]+)":\s*\{/gm;
const contentKeys = [];
let match;
while ((match = KEY_RE.exec(contentTs)) !== null) {
  contentKeys.push(match[1]);
}

if (contentKeys.length === 0) {
  console.error("ERROR: Could not parse any content keys from lib/content.ts");
  process.exit(1);
}

// ---------------------------------------------------------------------------
// 2. Validate each content key
// ---------------------------------------------------------------------------

const errors = [];
const warnings = [];

for (const key of contentKeys) {
  const [category, slug] = key.split("/");

  // Route wrappers — accept page.tsx or page.mdx
  const enRouteDir = resolve(ROOT, "app/(en)", category, slug);
  const zhRouteDir = resolve(ROOT, "app/zh", category, slug);
  const hasEnRoute =
    existsSync(resolve(enRouteDir, "page.tsx")) ||
    existsSync(resolve(enRouteDir, "page.mdx"));
  const hasZhRoute =
    existsSync(resolve(zhRouteDir, "page.tsx")) ||
    existsSync(resolve(zhRouteDir, "page.mdx"));
  if (!hasEnRoute) {
    errors.push(`MISSING  EN route: app/(en)/${category}/${slug}/page.{tsx,mdx}  [key: ${key}]`);
  }
  if (!hasZhRoute) {
    errors.push(`MISSING  ZH route: app/zh/${category}/${slug}/page.{tsx,mdx}  [key: ${key}]`);
  }

  // MDX routes contain their own content; TSX routes need a content component
  const enIsMdx = existsSync(resolve(enRouteDir, "page.mdx"));
  if (!enIsMdx) {
    const contentDir = resolve(ROOT, "content", key);
    if (!existsSync(contentDir)) {
      errors.push(`MISSING  Content dir: content/${key}/  [key: ${key}]`);
    } else {
      const tsxFiles = readdirSync(contentDir).filter((f) => f.endsWith(".tsx"));
      if (tsxFiles.length === 0) {
        errors.push(`MISSING  Content component (.tsx) in content/${key}/  [key: ${key}]`);
      }
    }
  }

  // Transcript files
  const enTranscript = resolve(ROOT, "content", key, "transcript.en.txt");
  const zhTranscript = resolve(ROOT, "content", key, "transcript.zh.txt");
  if (!existsSync(enTranscript)) {
    warnings.push(`MISSING  EN transcript: content/${key}/transcript.en.txt  [key: ${key}]`);
  }
  if (!existsSync(zhTranscript)) {
    warnings.push(`MISSING  ZH transcript: content/${key}/transcript.zh.txt  [key: ${key}]`);
  }
}

// ---------------------------------------------------------------------------
// 3. Check for orphaned content directories (have transcripts but no entry)
// ---------------------------------------------------------------------------

const contentDir = resolve(ROOT, "content");
const contentKeySet = new Set(contentKeys);

for (const category of readdirSync(contentDir, { withFileTypes: true })) {
  if (!category.isDirectory()) continue;
  const catDir = resolve(contentDir, category.name);
  for (const slug of readdirSync(catDir, { withFileTypes: true })) {
    if (!slug.isDirectory()) continue;
    const key = `${category.name}/${slug.name}`;
    if (!contentKeySet.has(key)) {
      const slugDir = resolve(catDir, slug.name);
      const hasTranscript = readdirSync(slugDir).some(
        (f) => f.startsWith("transcript.") && f.endsWith(".txt"),
      );
      if (hasTranscript) {
        warnings.push(`ORPHAN   content/${key}/ has transcripts but no entry in lib/content.ts`);
      }
    }
  }
}

// ---------------------------------------------------------------------------
// 4. Report
// ---------------------------------------------------------------------------

const total = contentKeys.length;

if (errors.length === 0 && warnings.length === 0) {
  console.log(`\n  OK  All ${total} content entries validated.\n`);
  process.exit(0);
}

if (warnings.length > 0) {
  console.log("\nWarnings:");
  for (const w of warnings) console.log(`  ${w}`);
}

if (errors.length > 0) {
  console.log("\nErrors:");
  for (const e of errors) console.log(`  ${e}`);
  console.log(`\n  FAIL  ${errors.length} error(s) found across ${total} entries.\n`);
  process.exit(1);
} else {
  console.log(`\n  OK  ${total} entries validated (${warnings.length} warning(s)).\n`);
  process.exit(0);
}
