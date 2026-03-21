import type { Locale } from "@/lib/i18n";
import { withLocalePath } from "@/lib/i18n";

type LocalizedContentEntry = {
  description: string;
  tag: string;
  title: string;
};

type ContentEntry = {
  date: string;
  giscusTerm: string;
  href: string;
  icon: string;
  locales: Record<Locale, LocalizedContentEntry>;
  tagColor?: string;
};

const _contentEntries = {
  "guides/first-week": {
    date: "2026-03-12",
    href: "/guides/first-week",
    icon: "👶",
    giscusTerm: "/guides/first-week",
    locales: {
      en: {
        tag: "Guide",
        title: "New Dad Field Guide: First Week",
        description:
          "Everything you need to know for labor, delivery, and the first days at home — from induction to safe sleep.",
      },
      zh: {
        tag: "指南",
        title: "新手爸爸实战指南：第一周",
        description:
          "从催产、分娩到回家后的头几天与安全睡眠，梳理新手爸爸最需要知道的关键事项。",
      },
    },
  },
  "guides/formula-feeding": {
    date: "2026-03-18",
    href: "/guides/formula-feeding",
    icon: "🍼",
    giscusTerm: "/guides/formula-feeding",
    locales: {
      en: {
        tag: "Guide",
        title: "How Much Formula Does My Baby Need?",
        description:
          "Weight-based calculator, age-based feeding chart, and practical guidelines for formula-fed infants.",
      },
      zh: {
        tag: "指南",
        title: "宝宝每天需要喝多少配方奶？",
        description:
          "基于体重的配方奶计算器、按月龄喂养参考表和实用指南。",
      },
    },
  },
  "her-notes/delivery": {
    date: "2026-03-21",
    href: "/her-notes/delivery",
    icon: "💜",
    giscusTerm: "/her-notes/delivery",
    tagColor: "text-violet-700",
    locales: {
      en: {
        tag: "Her Notes",
        title: "Induction Diary (Part 1)",
        description:
          "A mother's firsthand account of the final weeks of pregnancy and the road to an elective induction at 39 weeks.",
      },
      zh: {
        tag: "她的笔记",
        title: "催产日记（一）",
        description:
          "一位新手妈妈的亲历记录：从产检到等待入院，漫长孕晚期的真实感受。",
      },
    },
  },
  "her-notes/delivery-2": {
    date: "2026-03-21",
    href: "/her-notes/delivery-2",
    icon: "💜",
    giscusTerm: "/her-notes/delivery-2",
    tagColor: "text-violet-700",
    locales: {
      en: {
        tag: "Her Notes",
        title: "Induction Diary (Part 2)",
        description:
          "From hospital admission to full dilation — a timeline of the first stage of labor.",
      },
      zh: {
        tag: "她的笔记",
        title: "催产日记（二）",
        description:
          "从入院到宫口全开：催产第一产程的完整时间轴记录。",
      },
    },
  },
  "her-notes/delivery-3": {
    date: "2026-03-21",
    href: "/her-notes/delivery-3",
    icon: "💜",
    giscusTerm: "/her-notes/delivery-3",
    tagColor: "text-violet-700",
    locales: {
      en: {
        tag: "Her Notes",
        title: "Induction Diary (Part 3)",
        description:
          "The second and third stages of labor, and the postpartum rollercoaster — from pushing to vacuum delivery to a fainting scare.",
      },
      zh: {
        tag: "她的笔记",
        title: "催产日记（三）",
        description:
          "二三产程以及产后的惊心动魄：从推挤到真空吸引，从昏厥到康复。",
      },
    },
  },
  "reading-notes/happiest-baby-on-the-block": {
    date: "2026-03-13",
    href: "/reading-notes/happiest-baby-on-the-block",
    icon: "📚",
    giscusTerm: "/reading-notes/happiest-baby-on-the-block",
    locales: {
      en: {
        tag: "Reading Notes",
        title: "The Happiest Baby on the Block",
        description:
          "Dr. Harvey Karp's science-backed 5 S's method to calm crying and boost infant sleep in the first months.",
      },
      zh: {
        tag: "读书笔记",
        title: "《最快乐的宝宝》读书笔记",
        description:
          "Harvey Karp 医生基于科学的 5S 安抚法完整梳理，帮助新生儿在头几个月减少哭闹、改善睡眠。",
      },
    },
  },
  "reading-notes/twelve-hours-sleep": {
    date: "2026-03-12",
    href: "/reading-notes/twelve-hours-sleep",
    icon: "📚",
    giscusTerm: "/reading-notes/twelve-hours-sleep",
    locales: {
      en: {
        tag: "Reading Notes",
        title: "Twelve Hours' Sleep by Twelve Weeks Old",
        description:
          "Comprehensive summary and action items from Suzy Giordano's step-by-step sleep training method.",
      },
      zh: {
        tag: "读书笔记",
        title: "《12 周睡整夜》读书笔记",
        description:
          "对 Suzy Giordano 睡眠训练方法的完整梳理，以及可直接执行的行动要点。",
      },
    },
  },
} satisfies Record<string, ContentEntry>;

/** Derived from the keys of `_contentEntries` — no manual union to maintain. */
export type ContentEntryKey = keyof typeof _contentEntries;
export const contentEntries: Record<ContentEntryKey, ContentEntry> =
  _contentEntries;

/** Auto-derived from contentEntries + static index paths. */
const staticPaths = [
  "/",
  "/guides",
  "/her-notes",
  "/reading-notes",
  "/about",
] as const;
type StaticPath = (typeof staticPaths)[number];
type ContentPath = `/${ContentEntryKey}`;
export type PublicPagePath = StaticPath | ContentPath;

export const publicPagePaths: PublicPagePath[] = [
  ...staticPaths,
  ...(Object.keys(contentEntries) as ContentEntryKey[]).map(
    (key): ContentPath => `/${key}`,
  ),
];

/** Return content keys matching a category prefix, sorted by date descending. */
export function getContentKeysByCategory(
  prefix: string,
): ContentEntryKey[] {
  return (Object.keys(contentEntries) as ContentEntryKey[])
    .filter((key) => key.startsWith(prefix))
    .sort((a, b) =>
      contentEntries[b].date.localeCompare(contentEntries[a].date),
    );
}

export function getLocalizedContentCard(locale: Locale, key: ContentEntryKey) {
  const entry = contentEntries[key];

  return {
    href: withLocalePath(locale, entry.href),
    icon: entry.icon,
    ...(entry.tagColor ? { tagColor: entry.tagColor } : {}),
    ...entry.locales[locale],
  };
}

export function getAllContentCardsSorted(locale: Locale) {
  return (Object.keys(contentEntries) as ContentEntryKey[])
    .sort(
      (a, b) =>
        contentEntries[b].date.localeCompare(contentEntries[a].date),
    )
    .map((key) => ({ key, ...getLocalizedContentCard(locale, key) }));
}
