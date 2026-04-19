# Plan: Measles, MMR, and Travel With Babies (U.S., April 2026)

> This file is BOTH (1) the editorial content brief and (2) the implementation plan.
> The implementing session should first copy the **Content Brief** section into
> `content/guides/measles-mmr-travel/CONTENT_BRIEF.md` (or `docs/measles-mmr-travel-brief.md`)
> so it lives in the repo, then execute the **Implementation Plan**.

---

## Context

Topic #3 from [docs/content-ideation-2026-04-19.md](docs/content-ideation-2026-04-19.md) — the only time-sensitive item in the batch and the recommended next publish. Parents with infants too young for routine MMR (the schedule starts at 12 months) are actively searching for guidance, especially when traveling internationally to see grandparents.

The article is a fast-follow guide tightly scoped to parent decisions: when does routine MMR start, when does an infant need an early travel dose at 6–11 months, what counts as "protected," and what to do after exposure. It deliberately avoids becoming a general vaccine-debate piece.

**Freshness note (must appear in the article footer/header):** Checked against CDC measles guidance on April 19, 2026. Case counts can change weekly.

---

## Content Brief (editorial source of truth)

> Save this section verbatim into the repo at `content/guides/measles-mmr-travel/CONTENT_BRIEF.md` as the first implementation step.

### Title and lede
- **Title:** `Measles, MMR, and Travel With Babies (U.S., April 2026)`
- **Lede:** `If you are traveling with a baby, the key measles questions are practical, not political: when routine MMR starts, when a 6–11 month infant should get an early travel dose, what counts as actually protected, and what to do right away after an exposure.`

### Hero quick answers (4-card strip above the tabs)
1. `Routine MMR starts at 12–15 months.`
2. `Babies 6–11 months old who will travel internationally should get 1 early MMR dose before departure.`
3. `That early dose does not count toward the routine 2-dose series after the first birthday.`
4. `After exposure, call ahead immediately; MMR may help within 72 hours and immune globulin may help within 6 days.`

### Section content

**1. Why now**
- Open with the dated CDC snapshot: on **April 17, 2026**, CDC reported **1,748 confirmed U.S. cases as of April 16, 2026**.
- Explain why families care: measles is extremely contagious, can linger in the air for up to 2 hours, and spreads easily to people who are not immune.
- Make the parent angle explicit: the hardest group is babies who are not yet at the routine first MMR dose.
- Design note: one strong number card plus a short "why this matters for babies" paragraph.

**2. Routine MMR schedule**
- Say plainly: routine MMR dose 1 is at `12–15 months`; routine dose 2 is at `4–6 years`.
- Add one practical note: if a child is already `12+ months` and traveling internationally, the second dose can be given earlier as long as it is at least `28 days` after dose 1.
- Table:
  - `Dose 1 | 12–15 months | starts routine protection`
  - `Dose 2 | 4–6 years | completes routine series`
  - `Travel exception | 12+ months with trip coming | dose 2 can be accelerated if dose 1 was at least 28 days ago`
- Cross-link to the existing immunization guide.

**3. Early travel dose for infants 6–11 months**
- Core message: this is the key decision point for the target reader.
- Say: infants `6–11 months` who will travel internationally should get `1` MMR dose before departure.
- Say: CDC advises vaccination ideally at least `2 weeks` before travel, but if the trip is sooner, getting a dose is still recommended.
- Warn clearly: this early dose does `not` replace the `2` routine doses after age `12 months`.
- Add the under-6-month rule: CDC does not recommend measles vaccine for infants younger than `6 months`.
- Table:
  - `0–5 months | no MMR travel dose | call pediatrician about exposure planning`
  - `6–11 months | 1 early MMR dose before international travel | still needs 2 more doses later`
  - `12+ months | finish age-appropriate 2-dose protection before travel if possible`

**4. What "protected" actually means**
- Use badges or chips.
- `Protected / acceptable evidence`: written vaccine records, lab evidence of immunity, lab-confirmed prior measles, or birth before 1957.
- `Important nuance`: for most international travelers born during or after 1957, `2 documented doses` is the standard to aim for.
- `Not enough`: a family memory without records.
- Helpful parent note: if an adult is unsure and has no written proof, CDC says there is no harm in getting another MMR dose.

**5. Before international travel** (timeline checklist)
- `As soon as the trip is booked`: check everyone's vaccine records, not memory.
- `2+ weeks before departure`: get needed MMR doses if possible.
- `Less than 2 weeks before departure`: still get a dose if not protected.
- `Before leaving`: check the CDC destination page and travel notices.
- `After return`: watch for symptoms for `3 weeks`.
- Design note: this is a good `DataTable` with columns `When`, `What to do`, `Why it matters`.

**6. After exposure or suspected exposure** (operational, not descriptive)
- First line: `Call your pediatrician or clinic immediately and say you may have measles exposure. Do not walk into a waiting room without calling ahead.`
- Say that post-exposure options are time-sensitive:
  - `MMR may help if given within 72 hours of exposure`
  - `Immune globulin may help if given within 6 days`
- Say that clinicians and public health decide which option fits the child.
- Say that MMR and immune globulin should not be given at the same time.
- Symptom block: fever, cough, runny nose, red watery eyes, then rash starting on the face and spreading downward.
- Danger callout should emphasize `call ahead` and `same-day action`, not just symptoms.

**7. Travel checklist** (final printable bullets)
- `Check written vaccine records for every traveler`
- `If baby is 6–11 months and traveling internationally, ask for an early MMR dose`
- `If child is 12+ months and not fully vaccinated, ask whether dose 2 should be accelerated before travel`
- `Save your pediatrician's after-hours number`
- `Watch for fever + rash for 3 weeks after return`
- `If measles is possible, stay home and call before going in`

### Frontend notes
- The article must answer the main decision in the first screen, before the user scrolls into long prose.
- Add a `4-card quick answer strip` above the tabs (stronger than a plain hero).
- Keep the palette in the normal `Guide` amber system, not the custom immunization visual language.
- Add a visible freshness note: `Checked against CDC measles guidance on April 19, 2026. Case counts can change weekly.`

### Sources to cite (via `<Source>`)
- [CDC Measles Cases and Outbreaks](https://www.cdc.gov/measles/data-research/index.html)
- [CDC Plan for Travel](https://www.cdc.gov/measles/travel/index.html)
- [CDC Measles Vaccine Recommendations](https://www.cdc.gov/measles/hcp/vaccine-considerations/index.html)
- [CDC Questions About Measles](https://www.cdc.gov/measles/about/questions.html)
- [CDC How Measles Spreads](https://www.cdc.gov/measles/causes/index.html)
- [CDC Measles Symptoms and Complications](https://www.cdc.gov/measles/signs-symptoms/index.html)
- [CDC Child Immunization Schedule Notes](https://www.cdc.gov/vaccines/hcp/imz-schedules/child-adolescent-notes.html)

---

## Implementation Plan

### Style / scope decision

**Style: regular sectioned guide** (not the heavy custom-CSS Folio approach used by `immunization-schedule`, and not MDX). Closest template is [first-week](content/guides/first-week/FirstWeekGuideEn.tsx): tabbed sections in a single `*En.tsx` / `*Zh.tsx` client component, using shared `Callout`, `Badge`, `DataTable`, `Source` components inside `prose prose-stone` containers. Keep the palette in the standard `Guide` amber system.

The one extension over the `first-week` template: a **4-card quick-answer strip** rendered above the sticky tab nav (see "Hero quick answers" in the brief).

**Audio: yes.** Standard for guides. Generate after transcripts land.

**Slug:** `measles-mmr-travel` (under `guides/`).
**Component name:** `MeaslesMmrTravelGuide` (matching `FirstWeekGuide` / `FormulaFeedingGuide`).
**Icon:** `✈️` (travel signal, distinguishes from the existing `💉` immunization entry).
**Date:** `2026-04-19`.

### Files to create

```
docs/measles-mmr-travel-brief.md                              # first: copy the Content Brief here
app/(en)/guides/measles-mmr-travel/page.tsx
app/zh/guides/measles-mmr-travel/page.tsx
content/guides/measles-mmr-travel/MeaslesMmrTravelGuideEn.tsx
content/guides/measles-mmr-travel/MeaslesMmrTravelGuideZh.tsx
content/guides/measles-mmr-travel/transcript.en.txt
content/guides/measles-mmr-travel/transcript.zh.txt
```

(Either `docs/measles-mmr-travel-brief.md` or `content/guides/measles-mmr-travel/CONTENT_BRIEF.md` is fine for the brief — `docs/` matches the existing `docs/content-ideation-2026-04-19.md` pattern.)

### Files to edit

- [lib/content.ts](lib/content.ts) — add a new entry to `_contentEntries` near the other `guides/*` keys around lines 80–99. `publicPagePaths` and `ContentEntryKey` derive automatically.
- [components/LocalizedPages.tsx](components/LocalizedPages.tsx:90) — prepend a new entry to the `timeline` array (newest first).

### `lib/content.ts` entry to add

```typescript
"guides/measles-mmr-travel": {
  date: "2026-04-19",
  href: "/guides/measles-mmr-travel",
  icon: "✈️",
  giscusTerm: "/guides/measles-mmr-travel",
  locales: {
    en: {
      tag: "Guide",
      title: "Measles, MMR, and Travel With Babies (U.S., April 2026)",
      description:
        "Fast-follow guide for parents with infants under 12 months: routine MMR timing, the 6–11 month travel dose, and what to do before and after exposure.",
    },
    zh: {
      tag: "指南",
      title: "麻疹、MMR 与带婴儿出行（美国，2026 年 4 月）",
      description:
        "面向 12 月龄以下婴儿家庭的快速指南：常规 MMR 接种时间、6–11 个月旅行加种以及暴露前后的应对要点。",
    },
  },
},
```

### `LocalizedPages.tsx` timeline entry to prepend

```typescript
{
  date: "2026-04-19",
  en: 'Published "Measles, MMR, and Travel With Babies (U.S., April 2026)" — fast-follow guide on routine MMR timing, the 6–11 month travel dose, and post-exposure steps',
  zh: "发布「麻疹、MMR 与带婴儿出行（美国，2026 年 4 月）」——常规 MMR 接种、6–11 个月旅行加种与暴露后处理的快速指南",
},
```

### Route wrappers

Both `app/(en)/guides/measles-mmr-travel/page.tsx` and `app/zh/guides/measles-mmr-travel/page.tsx` follow the exact pattern of [app/(en)/guides/immunization-schedule/page.tsx](app/(en)/guides/immunization-schedule/page.tsx): import `createPageMetadata` from `@/lib/metadata`, set `pathname: "/guides/measles-mmr-travel"` (no `/zh/` prefix), and render the matching `*En` / `*Zh` content component.

### Content components

Both `MeaslesMmrTravelGuideEn.tsx` and `MeaslesMmrTravelGuideZh.tsx` are `"use client"` components shaped like [FirstWeekGuideEn.tsx](content/guides/first-week/FirstWeekGuideEn.tsx):

1. `<header>` with tag pill (`text-amber-700` for guides), `<h1>` title, the lede from the brief, and the **freshness note** (`Checked against CDC measles guidance on April 19, 2026. Case counts can change weekly.`).
2. **Quick-answer strip** — 4 cards on desktop / stacked on mobile, each holding one of the four hero answers. Use the `Guide` amber palette (`bg-amber-50`, `border-amber-200`, `text-stone-900`).
3. `<AudioPlayer contentKey="guides/measles-mmr-travel" locale="en" />` — already includes the copy-link/share control.
4. Sticky tab nav over the 7 sections from the brief (`why-now`, `routine-schedule`, `travel-dose`, `protected`, `before-travel`, `after-exposure`, `travel-checklist`).
5. Section components rendering inside `prose prose-stone max-w-none` using `Callout` / `Badge` / `DataTable` / `Source` — sources from the brief's source list.
6. `<GiscusComments locale="en" term="/guides/measles-mmr-travel" />` at the bottom — same `term` for both locales so they share one discussion thread.

The Chinese component mirrors the structure 1:1 with translated copy. **Do not** auto-translate at runtime — write the Chinese editorially per [CLAUDE.md](CLAUDE.md) translation workflow.

### Transcripts

Plain text in `transcript.en.txt` and `transcript.zh.txt`, paragraph-per-line, written for narration (no markdown, no tables — describe the table content in prose so the audio version still makes sense). Open with the lede; close with the travel checklist.

### Verification

1. `npm run validate-content` — confirms all 6 created article files plus the 2 edits are wired up.
2. `npm run lint` — TypeScript / ESLint clean.
3. `npm run build` — full static build; both `/guides/measles-mmr-travel` and `/zh/guides/measles-mmr-travel` should appear in the route manifest, plus the localized sitemap entries.
4. `npm run dev` and visit both routes — confirm the 4-card quick-answer strip renders above the tabs, AudioPlayer placeholder shows (before audio is generated), Giscus iframe loads, source links resolve.
5. After transcripts are finalized: `source ~/ml-env/bin/activate && npm run generate-audio -- --only measles-mmr-travel` to produce both `guides--measles-mmr-travel--en.mp3` and `guides--measles-mmr-travel--zh.mp3` under `public/audio/`.
6. Confirm the new entry appears (a) on the homepage card list, (b) under `/guides`, and (c) on the About-page timeline.

### Out of scope

- General vaccine-debate / hesitancy framing.
- Adult MMR catch-up beyond what's in "What 'protected' actually means."
- Country-by-country measles incidence — link to CDC travel pages instead.
- Updating the `immunization-schedule` article; this guide cross-links to it but stays self-contained.