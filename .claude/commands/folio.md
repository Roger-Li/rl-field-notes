---
description: Transform raw article text into a richly designed "Folio" editorial TSX component with custom color palette, hero section, tabbed navigation, and card-based layout
---

# Folio — Editorial Article Design

You are applying the "Folio" design pattern to create a richly designed article component. The user will provide raw text content (or point to a file), and you will generate a complete TSX component.

## Arguments

The user may provide: `/folio {content-key}` (e.g., `/folio guides/sleep-training`) or `/folio {content-key} {locale}` for a single locale.

If no arguments, ask which content key and locale(s) to work on.

## Step 1: Gather context

1. Read the raw content. Check these locations in order:
   - If the user pasted text inline, use that
   - `content/{content-key}/transcript.{locale}.txt` (transcript files)
   - `content/{content-key}/*En.tsx` or `*Zh.tsx` (existing component with content to redesign)
   - Ask the user if nothing is found
2. Read an existing Folio reference for the component architecture:
   - `content/reading-notes/happiest-baby-on-the-block/HappiestBabyEn.tsx` (warm palette)
   - `content/reading-notes/twelve-hours-sleep/TwelveHoursSleepEn.tsx` (cool palette)

## Step 2: Choose a color palette

Each Folio article gets its own color mood. The palette has 16 slots:

```js
const colors = {
  bg: "",           // very soft tinted page background
  card: "#FFFFFF",  // always white
  accent: "",       // primary accent color
  accentLight: "",  // light tint of accent
  indigo: "",       // deep emphasis color
  indigoLight: "",  // light tint
  navy: "",         // dark color for headings/text
  gold: "",         // warm highlight (always warm-toned)
  goldLight: "",    // light tint
  teal: "",         // secondary accent
  tealLight: "",    // light tint
  green: "",        // success/positive (checklists)
  greenLight: "",   // light tint
  rose: "",         // warning/caution
  roseLight: "",    // light tint
  text: "",         // body text (usually same as navy)
  textLight: "",    // secondary text
  border: "",       // subtle border color
};
```

### Palette mood guide
- **Sleep/calm articles**: Cool indigo, steel blue, moonlight gold
- **Feeding/nutrition**: Warm amber, soft orange, earthy tones
- **Safety/medical**: Clean blue, white, professional
- **Development**: Fresh green, teal, growth-oriented
- **Postpartum/emotional**: Soft rose, lavender, gentle
- **General parenting**: Warm coral, teal (like HappiestBaby)

### Existing palettes (do NOT reuse — each article should feel distinct)
- HappiestBaby: bg #FDF6EE, accent #E8725A (coral), navy #2C3E5A
- TwelveHoursSleep: bg #F0F0FA, accent #5B6ABB (steel blue), navy #1E2A4A

## Step 3: Plan content structure

Analyze the raw text and decide:

1. **Hero stats**: Pick 3-4 key numbers/facts for the StatBox row (e.g., "12 Hours", "5 S's", "4 Feeds")
2. **Tab structure**: Group content into 4-6 logical tabs. Good patterns:
   - Reading notes: "Overview" | "Chapter Guide" | "Key Methods" | "Checklists" | "Cautions"
   - Guides: "Basics" | "Step-by-Step" | "Schedule" | "Troubleshooting" | "References"
3. **Card mapping**: Identify which content blocks become Cards, SCards (expandable steps), FlowBoxes (processes), CheckItems (checklists), or TimelineItems
4. **Callouts**: Identify warnings, tips, and important notes that should use the Callout component

## Step 4: Generate the TSX component

Create a `"use client"` component following this exact structure:

```tsx
"use client";

import { useState } from "react";
import { AudioPlayer } from "@/components/AudioPlayer";
import { Callout } from "@/components/Callout";
import { GiscusComments } from "@/components/GiscusComments";

const colors = { /* 16-slot palette */ };

// --- Reusable local components (copy from reference, adjust colors) ---
const Section = ({ children, bg, id }: { children: React.ReactNode; bg?: string; id?: string }) => (
  <div id={id} style={{ background: bg || "transparent", padding: "48px 0" }}>
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 24px" }}>{children}</div>
  </div>
);

const SectionTitle = ({ children, sub, color }: { children: React.ReactNode; sub?: string; color?: string }) => ( /* ... */ );
const Card = ({ children, accent, style }: { children: React.ReactNode; accent?: string; style?: React.CSSProperties }) => ( /* ... */ );
const Badge = ({ children, color, bg }: { children: React.ReactNode; color: string; bg: string }) => ( /* ... */ );
const SCard = ({ num, title, subtitle, color, bg, icon, details, isOpen, toggle }: { /* ... */ }) => ( /* ... */ );
const FlowArrow = () => ( /* ... */ );
const FlowBox = ({ children, color, bg }: { children: React.ReactNode; color: string; bg: string }) => ( /* ... */ );
const StatBox = ({ num, label, color }: { num: string; label: string; color: string }) => ( /* ... */ );
const CheckItem = ({ children }: { children: React.ReactNode }) => ( /* ... */ );
const TimelineItem = ({ age, title, desc, color }: { age: string; title: string; desc: string; color: string }) => ( /* ... */ );

export default function ComponentName() {
  const [openS, setOpenS] = useState(0);
  const [activeTab, setActiveTab] = useState("first-tab-id");

  const tabs = [
    { id: "tab-id", label: "Tab Label" },
    // ...
  ];

  return (
    <div style={{ background: colors.bg, fontFamily: "'Source Sans 3', sans-serif", color: colors.text, minHeight: "100vh" }}>
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700;800&family=Source+Sans+3:wght@300;400;600;700&display=swap" rel="stylesheet" />

      {/* HERO — dark gradient, badge, title, subtitle, stat boxes */}
      {/* AUDIO PLAYER */}
      {/* CALLOUT (if applicable, e.g., "support the author") */}
      {/* TAB NAVIGATION — sticky horizontal scroll */}
      {/* TAB CONTENT SECTIONS */}
      {/* CONCLUSION FOOTER — dark gradient with summary stats */}
      {/* GISCUS COMMENTS */}
    </div>
  );
}
```

### Component patterns to use

| Content type | Component | When to use |
|---|---|---|
| Chapter/topic section | `Section` + `SectionTitle` | Top-level content grouping |
| Information block | `Card` with optional `accent` | Key concepts, summaries, tables |
| Step-by-step process | `SCard` (expandable) | Numbered procedures, methods |
| Sequential flow | `FlowBox` + `FlowArrow` | Cause-effect chains, pipelines |
| Key statistics | `StatBox` | Hero and footer stat rows |
| Checklist items | `CheckItem` | Action items, readiness checks |
| Chronological events | `TimelineItem` | Age-based milestones, schedules |
| Warning/tip/info | `Callout` component | Important notes, caveats |
| Category label | `Badge` | Section labels, tags |
| Data comparison | HTML `<table>` with inline styles | Prerequisites, schedules, comparisons |

### Tab navigation pattern

```tsx
{/* Sticky tab bar */}
<div style={{ position: "sticky", top: 0, zIndex: 20, background: colors.bg, borderBottom: `1px solid ${colors.border}`, padding: "0 24px" }}>
  <div style={{ maxWidth: 900, margin: "0 auto", display: "flex", gap: 0, overflowX: "auto" }}>
    {tabs.map((tab) => (
      <button
        key={tab.id}
        onClick={() => setActiveTab(tab.id)}
        style={{
          padding: "14px 20px",
          fontSize: 14,
          fontWeight: activeTab === tab.id ? 700 : 500,
          color: activeTab === tab.id ? colors.accent : colors.textLight,
          borderBottom: activeTab === tab.id ? `3px solid ${colors.accent}` : "3px solid transparent",
          background: "none",
          border: "none",
          cursor: "pointer",
          whiteSpace: "nowrap",
          transition: "all 0.2s",
          fontFamily: "'Source Sans 3', sans-serif",
        }}
      >
        {tab.label}
      </button>
    ))}
  </div>
</div>
```

### Table styling pattern

```tsx
<div style={{ overflowX: "auto" }}>
  <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14, lineHeight: 1.6 }}>
    <thead>
      <tr style={{ background: colors.accentLight }}>
        <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 700, color: colors.navy, borderBottom: `2px solid ${colors.accent}` }}>Header</th>
        {/* ... */}
      </tr>
    </thead>
    <tbody>
      <tr style={{ borderBottom: `1px solid ${colors.border}` }}>
        <td style={{ padding: "12px 16px" }}>Cell</td>
        {/* ... */}
      </tr>
    </tbody>
  </table>
</div>
```

## Step 5: Write the files

- Write the component to `content/{content-key}/{ComponentName}{En|Zh}.tsx`
- If both locales are requested, create both EN and ZH versions with the same color palette but translated content
- Component name: PascalCase from the slug + "En"/"Zh" suffix

## Step 6: Verify

1. Run `npm run build` to ensure the component compiles and the page renders
2. Run `npm run validate-content` to check all pieces are in place
3. Tell the user to preview at `http://localhost:3000/{content-path}`

## Important rules

- **ALL original content must be preserved** — never drop sections, skip details, or summarize
- Use `&apos;` for apostrophes, `&quot;` for quotes, `&amp;` for ampersands in JSX text
- Keep `AudioPlayer` with the correct `contentKey` and `locale`
- Keep `GiscusComments` with `locale` and `term="/{content-key}"` (canonical English path, no /zh prefix)
- Each article must have a UNIQUE color palette — don't copy hex values from existing articles
- The component must be `"use client"` since it uses `useState`
- Inline styles only (no Tailwind) for the article body — this keeps each Folio self-contained
- Prefer semantic HTML (`<strong>`, `<em>`, `<table>`, `<blockquote>`) within the styled containers
