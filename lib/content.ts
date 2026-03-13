import type { Locale } from "@/lib/i18n";
import { withLocalePath } from "@/lib/i18n";

export type ContentEntryKey =
  | "guides/first-week"
  | "reading-notes/happiest-baby-on-the-block"
  | "reading-notes/twelve-hours-sleep";

type LocalizedContentEntry = {
  description: string;
  tag: string;
  title: string;
};

type ContentEntry = {
  giscusTerm: string;
  href: string;
  icon: string;
  locales: Record<Locale, LocalizedContentEntry>;
};

export const contentEntries: Record<ContentEntryKey, ContentEntry> = {
  "guides/first-week": {
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
  "reading-notes/happiest-baby-on-the-block": {
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
};

export const publicPagePaths = [
  "/",
  "/guides",
  "/guides/first-week",
  "/reading-notes",
  "/reading-notes/happiest-baby-on-the-block",
  "/reading-notes/twelve-hours-sleep",
  "/about",
] as const;

export function getLocalizedContentCard(locale: Locale, key: ContentEntryKey) {
  const entry = contentEntries[key];

  return {
    href: withLocalePath(locale, entry.href),
    icon: entry.icon,
    ...entry.locales[locale],
  };
}
