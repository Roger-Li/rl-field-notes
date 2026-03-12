import type { ContentEntryKey } from "@/lib/content";
import type { Locale } from "@/lib/i18n";

type SiteCopy = {
  about: {
    contributingHeading: string;
    heading: string;
    metadataDescription: string;
    metadataTitle: string;
  };
  commentsHeading: string;
  footerTagline: string;
  guidesIndex: {
    heading: string;
    intro: string;
    metadataDescription: string;
    metadataTitle: string;
  };
  header: {
    mobileMenuLabel: string;
    switchToLabel: Record<Locale, string>;
    switchToShort: Record<Locale, string>;
  };
  home: {
    featured: ContentEntryKey[];
    heroDescription: string;
    heroTitle: string;
    metadataDescription: string;
  };
  nav: {
    about: string;
    guides: string;
    readingNotes: string;
  };
  readingNotesIndex: {
    heading: string;
    intro: string;
    metadataDescription: string;
    metadataTitle: string;
  };
  site: {
    brandName: string;
    defaultDescription: string;
    titleTemplate: string;
  };
};

export const siteCopy: Record<Locale, SiteCopy> = {
  en: {
    site: {
      brandName: "RL Field Notes",
      defaultDescription:
        "A new dad's knowledge hub — guides, reading notes, and lessons learned in the first year of parenting.",
      titleTemplate: "%s | RL Field Notes",
    },
    nav: {
      guides: "Guides",
      readingNotes: "Reading Notes",
      about: "About",
    },
    header: {
      mobileMenuLabel: "Toggle menu",
      switchToLabel: {
        en: "Switch to English",
        zh: "Switch to Chinese",
      },
      switchToShort: {
        en: "EN",
        zh: "中文",
      },
    },
    footerTagline: "Learning through experience, one episode at a time.",
    commentsHeading: "Comments",
    home: {
      heroTitle: "RL Field Notes",
      heroDescription:
        "Learning through experience, one episode at a time. A collection of guides and reading notes for navigating the first year of fatherhood.",
      metadataDescription:
        "A new dad's knowledge hub with practical guides and reading notes for the first year of parenting.",
      featured: ["guides/first-week", "reading-notes/twelve-hours-sleep"],
    },
    guidesIndex: {
      metadataTitle: "Guides",
      metadataDescription:
        "Practical guides for new dads — from labor and delivery to daily newborn care.",
      heading: "Guides",
      intro: "Practical, evidence-based guides for navigating fatherhood.",
    },
    readingNotesIndex: {
      metadataTitle: "Reading Notes",
      metadataDescription:
        "Summaries and action items from parenting and child development books.",
      heading: "Reading Notes",
      intro:
        "Detailed summaries and action items from books on parenting, sleep, and child development.",
    },
    about: {
      metadataTitle: "About",
      metadataDescription:
        "About RL Field Notes — a new dad's knowledge hub for caregiving.",
      heading: "About RL Field Notes",
      contributingHeading: "Contributing",
    },
  },
  zh: {
    site: {
      brandName: "RL Field Notes",
      defaultDescription:
        "一份写给新手爸爸的育儿知识站，收录实践指南、读书笔记和第一年育儿中的真实经验。",
      titleTemplate: "%s | RL Field Notes",
    },
    nav: {
      guides: "指南",
      readingNotes: "读书笔记",
      about: "关于",
    },
    header: {
      mobileMenuLabel: "切换菜单",
      switchToLabel: {
        en: "切换到英文",
        zh: "切换到中文",
      },
      switchToShort: {
        en: "EN",
        zh: "中文",
      },
    },
    footerTagline: "在一次次真实体验里学习，像每一回合训练那样迭代。",
    commentsHeading: "评论",
    home: {
      heroTitle: "RL Field Notes",
      heroDescription:
        "通过真实经历不断学习。这里收录了写给新手爸爸的实用指南与读书笔记，帮助你应对育儿第一年。",
      metadataDescription:
        "写给新手爸爸的双语育儿知识站，包含实用指南和读书笔记。",
      featured: ["guides/first-week", "reading-notes/twelve-hours-sleep"],
    },
    guidesIndex: {
      metadataTitle: "指南",
      metadataDescription:
        "写给新手爸爸的实用指南，从分娩准备到新生儿日常照护。",
      heading: "指南",
      intro: "围绕父职第一年的关键场景，整理出可执行、可查证的实用指南。",
    },
    readingNotesIndex: {
      metadataTitle: "读书笔记",
      metadataDescription:
        "围绕育儿、睡眠和儿童发展书籍的摘要与行动要点。",
      heading: "读书笔记",
      intro: "汇总育儿、睡眠与儿童发展相关书籍的重点内容与可执行建议。",
    },
    about: {
      metadataTitle: "关于",
      metadataDescription: "关于 RL Field Notes：一个写给新手爸爸的育儿知识站。",
      heading: "关于 RL Field Notes",
      contributingHeading: "参与贡献",
    },
  },
};
