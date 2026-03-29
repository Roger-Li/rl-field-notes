---
description: Scaffold all boilerplate files for a new bilingual article (routes, content stubs, transcripts, metadata registration, About timeline maintenance)
---

# New Article Scaffold

You are scaffolding a new bilingual article for the RL Field Notes site. The user may provide arguments inline (e.g. `/new-article guides/sleep-training "Sleep Training Guide" "睡眠训练指南"`), or you should ask for the missing details.

## Required information

Gather the following. If any are missing, use the AskUserQuestion tool to ask:

1. **Content key** — format: `{category}/{slug}` where category is one of `guides`, `reading-notes`, or `her-notes`. Example: `guides/sleep-training`
2. **English title** — the article title in English
3. **Chinese title** — the article title in Chinese
4. **English description** — one-line description for cards/SEO (English)
5. **Chinese description** — one-line description for cards/SEO (Chinese)
6. **Emoji icon** — single emoji for content cards (e.g. `👶`, `📚`, `💜`)

Derive the following automatically:
- **Component name**: PascalCase from the slug (e.g. `sleep-training` -> `SleepTraining`)
- **Tag** / **tag color**: Based on category:
  - `guides` -> tag: `"Guide"` / `"指南"`, no tagColor
  - `reading-notes` -> tag: `"Reading Notes"` / `"读书笔记"`, no tagColor
  - `her-notes` -> tag: `"Her Notes"` / `"她的笔记"`, tagColor: `"text-violet-700"`
- **Date**: Today's date in YYYY-MM-DD format
- **Giscus term**: `"/{content-key}"`

## Files to create

### 1. English route wrapper: `app/(en)/{category}/{slug}/page.tsx`

```tsx
import { createPageMetadata } from "@/lib/metadata";
import {ComponentName}En from "@/content/{category}/{slug}/{ComponentName}En";

export const metadata = createPageMetadata({
  locale: "en",
  pathname: "/{category}/{slug}",
  title: "{English title}",
  description: "{English description}",
});

export default function Page() {
  return <{ComponentName}En />;
}
```

### 2. Chinese route wrapper: `app/zh/{category}/{slug}/page.tsx`

```tsx
import { createPageMetadata } from "@/lib/metadata";
import {ComponentName}Zh from "@/content/{category}/{slug}/{ComponentName}Zh";

export const metadata = createPageMetadata({
  locale: "zh",
  pathname: "/{category}/{slug}",
  title: "{Chinese title}",
  description: "{Chinese description}",
});

export default function Page() {
  return <{ComponentName}Zh />;
}
```

### 3. English content stub: `content/{category}/{slug}/{ComponentName}En.tsx`

For `her-notes` category, wrap with `<HerNotesBackground>` and use violet accents:

```tsx
"use client";

import { AudioPlayer } from "@/components/AudioPlayer";
import { GiscusComments } from "@/components/GiscusComments";
import { HerNotesBackground } from "@/components/HerNotesBackground"; // only for her-notes

export default function {ComponentName}En() {
  return (
    <HerNotesBackground> {/* only for her-notes */}
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      <header className="mb-10">
        <span className="text-xs font-semibold uppercase tracking-wide text-{accent}-700">
          {Tag}
        </span>
        <h1 className="mt-2 text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight">
          {English title}
        </h1>
        <p className="mt-3 text-stone-500 leading-relaxed">
          {English description}
        </p>
      </header>

      <AudioPlayer contentKey="{category}/{slug}" locale="en" />

      <article className="prose prose-stone max-w-none">
        {/* TODO: Add English article content here */}
      </article>

      <GiscusComments locale="en" term="/{category}/{slug}" />
    </div>
    </HerNotesBackground> {/* only for her-notes */}
  );
}
```

- For `guides` and `reading-notes`, use `amber` accent color and omit HerNotesBackground
- For `her-notes`, use `violet` accent color and include HerNotesBackground

### 4. Chinese content stub: `content/{category}/{slug}/{ComponentName}Zh.tsx`

Same structure as English but with `locale="zh"`, Chinese tag, and Chinese title/description.

### 5. Transcript stubs

Create empty transcript files for the user to fill in:
- `content/{category}/{slug}/transcript.en.txt`
- `content/{category}/{slug}/transcript.zh.txt`

Write a single line: `TODO: Add {locale} transcript for TTS audio generation`

### 6. Register in `lib/content.ts`

Add a new entry to the `_contentEntries` object (before the closing `} satisfies`). Follow the existing pattern exactly:

```typescript
  "{category}/{slug}": {
    date: "{today YYYY-MM-DD}",
    href: "/{category}/{slug}",
    icon: "{emoji}",
    giscusTerm: "/{category}/{slug}",
    // tagColor: "text-violet-700",  // only for her-notes
    locales: {
      en: {
        tag: "{English tag}",
        title: "{English title}",
        description: "{English description}",
      },
      zh: {
        tag: "{Chinese tag}",
        title: "{Chinese title}",
        description: "{Chinese description}",
      },
    },
  },
```

### 7. Update the About page timeline in `components/LocalizedPages.tsx`

Append a new top entry to the curated `timeline` array for the release date of this article.

- Use the same date as the `lib/content.ts` entry
- Add both English and Chinese release-note copy
- Keep the timeline reverse-chronological (newest first)

## After scaffolding

1. Run `npm run validate-content` to verify all files are in place
2. Remind the user to:
   - Write the article content in the En/Zh component files
   - Write transcripts in the .txt files
   - Run `source ~/ml-env/bin/activate && npm run generate-audio -- --only {slug}` once transcripts are ready so the AudioPlayer narration and copy-link button become available
   - Run `npm run build` to verify the build passes
3. If you changed the content publishing workflow or `/new-article` instructions while doing this work, update both `CLAUDE.md` and `AGENTS.md` in the same edit so the mirrored guidance stays in sync

## Important rules

- Do NOT create content that doesn't exist — only scaffold the structure
- Use the Edit tool to modify `lib/content.ts`, not Write (to avoid overwriting)
- Respect existing code style (semicolons, trailing commas, 2-space indent)
- The `pathname` in `createPageMetadata` must NOT have a locale prefix (no `/zh/`)
- Both EN and ZH routes must use the same `pathname` and `giscusTerm`
- The About page timeline in `components/LocalizedPages.tsx` is a hand-written editorial changelog, not an auto-derived feed — update it explicitly for each newly published article
- The shared `AudioPlayer` already includes the article copy-link/share control, so an article is not publish-ready until transcripts exist and audio has been generated
- `CLAUDE.md` and `AGENTS.md` are mirrored workflow references; when one needs a workflow update, update the other in the same change
