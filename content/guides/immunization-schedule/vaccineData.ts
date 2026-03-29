export type ArticleLocale = "en" | "zh";

export type LocalizedText = {
  en: string;
  zh: string;
};

export type AapCdcStatus =
  | "consensus"
  | "conditional"
  | "protocol-diff";

export type VaccineItem = {
  id: number;
  key: string;
  phase: "infant" | "toddler" | "adolescent";
  category: "vaccine" | "combo" | "booster" | "monoclonal";
  icon: string;
  status: AapCdcStatus;
  headline: LocalizedText;
  subheadline: LocalizedText;
  scheduleSummary: LocalizedText;
  protectsAgainstSummary: LocalizedText;
  aapShort: LocalizedText;
  cdcShort: LocalizedText;
  detailBlocks: {
    title: LocalizedText;
    paragraphs?: LocalizedText[];
    bullets?: LocalizedText[];
  }[];
  comparison: {
    aap: LocalizedText[];
    cdc: LocalizedText[];
    cdcNote?: LocalizedText;
  };
};

export type Milestone = {
  id: number;
  ageLabel: LocalizedText;
  vaccineKeys: string[];
  shotsLabel: LocalizedText;
  note?: LocalizedText;
  sourceOverviewRow: true;
};

type PageCopy = {
  tag: string;
  title: string;
  description: string;
  updated: string;
  heroIntro: string;
  heroStats: { label: string; value: string }[];
  tabs: {
    adolescent: string;
    comparison: string;
    infant: string;
    overview: string;
    toddler: string;
  };
  sections: {
    adolescent: { intro: string; subtitle: string; title: string };
    comparison: { intro: string; subtitle: string; title: string };
    infant: { intro: string; subtitle: string; title: string };
    overview: { subtitle: string; title: string };
    toddler: { intro: string; subtitle: string; title: string };
  };
  backgroundTitle: string;
  backgroundParagraphs: string[];
  legendTitle: string;
  legendIntro: string;
  statusDescriptions: Record<AapCdcStatus, string>;
  scheduleLabel: string;
  protectsLabel: string;
  askCardTitle: string;
  askCardQuote: string;
  askCardBody: string;
  seasonalNoteTitle: string;
  seasonalNoteBody: string;
  covidSupplementTitle: string;
  covidSupplementBody: string;
  detailsToggle: { close: string; open: string };
  comparisonHeaders: {
    aap: string;
    cdc: string;
    matrixAap: string;
    matrixCdc: string;
    matrixItem: string;
  };
  comparisonNote: string;
  summaryCards: {
    bothItems: string[];
    bothTitle: string;
    divergeItems: string[];
    divergeTitle: string;
    note: string;
  };
  productChangesTitle: string;
  productChanges: string[];
  insuranceTitle: string;
  insuranceParagraphs: string[];
  referencesTitle: string;
  disclaimer: string;
};

export const STATUS_LABELS: Record<AapCdcStatus, LocalizedText> = {
  consensus: { en: "Both recommend", zh: "双方推荐" },
  conditional: { en: "CDC/HHS conditional", zh: "CDC/HHS 有条件" },
  "protocol-diff": { en: "Protocol differs", zh: "方案不同" },
};

export const pageCopy: Record<ArticleLocale, PageCopy> = {
  en: {
    tag: "Guide",
    title: "Childhood Immunization Guide (US, 2026)",
    description:
      "Vaccine-by-vaccine guide cross-checking the 2026 AAP schedule, the HHS-announced CDC changes, and the currently posted CDC schedule pages.",
    updated: "Last updated: March 28, 2026",
    heroIntro:
      "A vaccine-by-vaccine map of what stayed aligned, what HHS says changed in CDC policy, and where the currently posted CDC schedule pages still tell a broader story.",
    heroStats: [
      { label: "Diseases covered", value: "18" },
      { label: "Schedule items", value: "15" },
      { label: "Schedules compared", value: "2" },
      { label: "Milestones", value: "13" },
    ],
    tabs: {
      overview: "Schedule Overview",
      infant: "Infant (0-15 mo)",
      toddler: "Toddler & Pre-K (12 mo-6 yr)",
      adolescent: "Adolescent (11-16 yr)",
      comparison: "AAP vs CDC/HHS",
    },
    sections: {
      overview: {
        title: "Overview first",
        subtitle:
          "Use the AAP timeline as the practical backbone, but cross-check any claimed CDC change against the current CDC notes page because the January 2026 HHS announcement and the posted CDC schedule pages are not fully synchronized yet.",
      },
      infant: {
        title: "Infant vaccines and immunizing agents",
        subtitle: "Birth to 15 months",
        intro:
          "This is where the biggest implementation mismatch shows up: HHS announced narrower CDC language for HBV, rotavirus, influenza, and RSV, while the current CDC notes page still shows broader routine wording for several of those items.",
      },
      toddler: {
        title: "Toddler and pre-kindergarten boosters",
        subtitle: "12 months to 6 years",
        intro:
          "The toddler years still carry the first MMR, varicella, and hepatitis A doses, but HepA and first-dose MMRV wording need the closest source-by-source reading right now.",
      },
      adolescent: {
        title: "Adolescent schedule",
        subtitle: "11 to 16 years",
        intro:
          "The adolescent visit still carries the biggest cancer- and meningitis-prevention decisions, and HPV plus MenACWY are where the HHS-announced policy and the currently posted CDC notes page are furthest apart.",
      },
      comparison: {
        title: "AAP vs CDC/HHS at a glance",
        subtitle: "Line items first, diseases second",
        intro:
          "The matrix below tracks the AAP schedule against the HHS-announced CDC 2026 policy direction. Where the currently posted CDC notes page still says something broader, the item cards call that out explicitly.",
      },
    },
    backgroundTitle: "Why this guide exists",
    backgroundParagraphs: [
      "On January 5, 2026, HHS published a fact sheet describing a narrower CDC childhood schedule, with several vaccines reassigned to high-risk or shared clinical decision-making buckets.",
      "As of March 28, 2026, the official CDC Child and Adolescent Immunization Notes page I cross-checked is still dated December 8, 2025 and continues to show routine language for several of those same items, including HepA, HepB, rotavirus, influenza, MenACWY, HPV dosing, and infant RSV protection.",
      "The American Academy of Pediatrics published its own 2026 schedule and continues to recommend the broader routine pediatric schedule.",
      "Because those official pages are not fully synced yet, this guide treats the AAP schedule as the practical timeline and the CDC/HHS column as the announced 2026 policy direction rather than a perfectly settled single-page CDC source.",
    ],
    legendTitle: "How to read the labels",
    legendIntro:
      "Each line item shows how the AAP schedule compares with the HHS-announced CDC 2026 policy, with note text when the currently posted CDC notes page still says something broader.",
    statusDescriptions: {
      consensus:
        "AAP and the current official sources still broadly align on the item.",
      conditional:
        "AAP keeps a universal recommendation, while HHS announced a narrower CDC policy; some current CDC schedule pages still show broader routine wording.",
      "protocol-diff":
        "HHS announced a protocol change, but the currently posted CDC schedule pages may not yet fully reflect it.",
    },
    scheduleLabel: "Schedule",
    protectsLabel: "Protects against",
    askCardTitle: "Ask which schedule language the office is actually using",
    askCardQuote:
      "“Which childhood schedule are you using in practice right now?”",
    askCardBody:
      "Because the AAP schedule, HHS fact sheets, and the currently posted CDC notes page are not fully synchronized, ask whether your office is following the AAP schedule, the HHS-announced CDC policy shift, or the still-posted CDC notes language for items like HepB, rotavirus, influenza, RSV, HepA, MenACWY, and HPV.",
    seasonalNoteTitle: "Seasonal nuance to keep in mind",
    seasonalNoteBody:
      "Influenza is annual from 6 months onward. RSV depends on whether the baby is entering an RSV season without maternal RSV protection. COVID-19 begins at 6 months, but dose count and intervals vary by age and product.",
    covidSupplementTitle: "Also starting at 6+ months: COVID-19",
    covidSupplementBody:
      "COVID-19 appears in the detailed source sections and in the infant tab, but not as a separate row in the compact AAP overview table. It is shown here as a supplemental card so the timeline stays faithful to the source while still covering all 15 line items.",
    detailsToggle: {
      open: "Read details",
      close: "Hide details",
    },
    comparisonHeaders: {
      aap: "AAP 2026",
      cdc: "CDC/HHS 2026 policy",
      matrixItem: "Vaccine / prevention",
      matrixAap: "AAP 2026",
      matrixCdc: "CDC/HHS 2026 policy",
    },
    comparisonNote:
      "The matrix tracks the HHS-announced 2026 policy categories. Several item cards also note when the current CDC notes page still shows older, broader routine language.",
    summaryCards: {
      bothTitle: "11 diseases still in the universal bucket",
      bothItems: [
        "Diphtheria",
        "Tetanus",
        "Pertussis (whooping cough)",
        "Polio",
        "Hib",
        "Pneumococcal disease",
        "Measles",
        "Mumps",
        "Rubella",
        "Varicella (chickenpox)",
        "HPV",
      ],
      divergeTitle: "7 diseases HHS moved into conditional or high-risk buckets",
      divergeItems: [
        "Hepatitis B for low-risk infants",
        "Hepatitis A",
        "Rotavirus",
        "Influenza",
        "COVID-19",
        "RSV",
        "Meningococcal disease",
      ],
      note:
        "This summary switches from product-level line items to disease-level framing, which avoids double-counting combination products. The current CDC notes page still reads more broadly for several of the “conditional” items.",
    },
    productChangesTitle: "Product changes worth knowing",
    productChanges: [
      "PCV13 has effectively been replaced by PCV15 or PCV20 in current U.S. practice.",
      "Menactra is gone; current MenACWY products are Menveo and MenQuadfi.",
      "RSV monoclonal antibodies remain part of infant planning; the current CDC notes page names nirsevimab, and Enflonsia is now an FDA-approved additional option.",
      "Gardasil 9 is the only HPV vaccine still distributed in the U.S.",
    ],
    insuranceTitle: "Coverage and insurance",
    insuranceParagraphs: [
      "The January 5, 2026 HHS fact sheet says vaccines recommended by CDC as of December 31, 2025 remain covered without cost-sharing through ACA plans, Medicaid, CHIP, and Vaccines for Children.",
      "AAP’s immunization FAQ also says shared clinical decision-making still provides a payment pathway and that the Vaccines for Children program would continue distributing those vaccines.",
    ],
    referencesTitle: "Reference links",
    disclaimer:
      "This guide is informational and does not replace medical advice. Use it to prepare for pediatric visits, not to make timing or product decisions without a clinician.",
  },
  zh: {
    tag: "指南",
    title: "儿童疫苗接种指南（美国，2026）",
    description:
      "逐项对照 2026 年 AAP 时间表、HHS 公布的 CDC 政策变化，以及当前 CDC 官网时间表页面仍然保留的内容。",
    updated: "最后更新：2026 年 3 月 28 日",
    heroIntro:
      "把出生到青少年阶段的疫苗逐项拆开，帮你看清哪些项目仍然一致、哪些是 HHS 公布的新 CDC 政策方向，以及当前挂在 CDC 官网上的时间表页面还在哪些地方写得更宽。",
    heroStats: [
      { label: "涵盖疾病", value: "18" },
      { label: "时间表项目", value: "15" },
      { label: "对照方案", value: "2" },
      { label: "关键里程碑", value: "13" },
    ],
    tabs: {
      overview: "接种时间表",
      infant: "婴儿期（0-15月）",
      toddler: "幼儿期（12月-6岁）",
      adolescent: "青少年期（11-16岁）",
      comparison: "AAP 与 CDC/HHS 对比",
    },
    sections: {
      overview: {
        title: "先看整体",
        subtitle:
          "对大多数家庭来说，AAP 时间表仍然是更稳妥的主线；但凡是涉及“CDC 已经改了”的说法，都最好再对照当前 CDC notes 页面，因为 2026 年 1 月的 HHS 说明与现挂在 CDC 官网上的时间表还没有完全同步。",
      },
      infant: {
        title: "婴儿期疫苗与免疫制剂",
        subtitle: "出生到 15 个月",
        intro:
          "这里是现实执行最容易出现“政策文字不同步”的部分：HHS 对乙肝、轮状病毒、流感和 RSV 给出了更窄的 CDC 说法，但当前 CDC notes 页面里其中几项仍然保留着更宽的常规表述。",
      },
      toddler: {
        title: "幼儿与学龄前加强项目",
        subtitle: "12 个月到 6 岁",
        intro:
          "这一阶段仍然涵盖 MMR、水痘、甲肝的首剂，以及帮助学龄前减针的联合加强疫苗；但甲肝和首剂 MMRV 的表述现在最需要逐页核对来源。",
      },
      adolescent: {
        title: "青少年阶段",
        subtitle: "11 岁到 16 岁",
        intro:
          "青少年门诊依然是癌症预防和脑膜炎预防最集中的阶段，而 HPV 与 MenACWY 正是 HHS 公布的政策方向和当前 CDC notes 页面差距最大的两个位置。",
      },
      comparison: {
        title: "AAP 与 CDC/HHS 一眼看懂",
        subtitle: "先看时间表项目，再看疾病层面",
        intro:
          "下面的矩阵把 AAP 时间表和 HHS 公布的 CDC 2026 政策方向并排放在一起；如果当前 CDC notes 页面仍然保留更宽的常规写法，卡片正文会额外标出来。",
      },
    },
    backgroundTitle: "为什么需要这篇指南",
    backgroundParagraphs: [
      "2026 年 1 月 5 日，HHS 发布说明，把儿童时间表里的若干项目描述为新的 CDC 政策方向，包括转入高风险人群或共同临床决策类别。",
      "但截至 2026 年 3 月 28 日，我交叉核对到的 CDC《Child and Adolescent Immunization Notes》页面仍标注为 2025 年 12 月 8 日，并且在甲肝、乙肝、轮状病毒、流感、MenACWY、HPV 剂次和婴儿 RSV 保护等项目上仍然保留更宽的常规表述。",
      "美国儿科学会 AAP 也发布了自己的 2026 年时间表，并继续主张更完整的常规儿童免疫方案。",
      "因为这些官方页面目前还没有完全同步，这篇指南把 AAP 时间表当作实际阅读主线，而把 CDC/HHS 一栏理解为“2026 年已公布的政策方向”，而不是一个已经完全定稿、单页一致的 CDC 页面。",
    ],
    legendTitle: "状态标签怎么读",
    legendIntro:
      "每个项目的标签都表示 AAP 时间表与 HHS 公布的 CDC 2026 政策之间的关系；如果当前 CDC notes 页面仍然写得更宽，正文会补充说明。",
    statusDescriptions: {
      consensus: "AAP 与当前可查到的官方来源大体仍然一致。",
      conditional:
        "AAP 仍然面向所有儿童推荐，而 HHS 公布的是更窄的 CDC 政策；不过当前 CDC 某些时间表页面仍然保留更宽的常规表述。",
      "protocol-diff":
        "HHS 公布了方案变化，但当前挂出的 CDC 时间表页面未必已经完全改到同一版本。",
    },
    scheduleLabel: "接种时间",
    protectsLabel: "主要预防",
    askCardTitle: "先确认门诊到底按哪套表述在执行",
    askCardQuote:
      "“你们门诊现在实际是按哪套儿童时间表在执行？”",
    askCardBody:
      "因为 AAP 时间表、HHS 的说明页面，以及当前 CDC notes 页面还没有完全同步，这一句通常最能帮你弄清楚门诊到底是按 AAP、按 HHS 公布的 CDC 政策方向，还是按目前仍挂在 CDC 官网上的时间表文字在建议乙肝、轮状病毒、流感、RSV、甲肝、MenACWY 和 HPV。",
    seasonalNoteTitle: "几个季节性细节",
    seasonalNoteBody:
      "流感从 6 个月开始每年接种；RSV 是否需要取决于宝宝进入 RSV 季时是否已经通过母体疫苗获得保护；新冠从 6 个月开始，但剂次数和间隔会因年龄和产品不同而变化。",
    covidSupplementTitle: "另一个从 6 个月开始的项目：新冠疫苗",
    covidSupplementBody:
      "新冠疫苗出现在详细条目和婴儿期标签页里，但没有被放进紧凑版 AAP 总览表的单独一行。这里把它做成补充卡片，既保持总览忠于原表，也不会漏掉第 15 个项目。",
    detailsToggle: {
      open: "展开细节",
      close: "收起细节",
    },
    comparisonHeaders: {
      aap: "AAP 2026",
      cdc: "CDC/HHS 2026 政策",
      matrixItem: "疫苗 / 预防项目",
      matrixAap: "AAP 2026",
      matrixCdc: "CDC/HHS 2026 政策",
    },
    comparisonNote:
      "上面的矩阵跟的是 HHS 公布的 2026 年政策分类；而几个重点卡片还会额外注明当前 CDC notes 页面是否仍然保留更宽的旧表述。",
    summaryCards: {
      bothTitle: "仍在普遍推荐桶里的 11 种疾病",
      bothItems: [
        "白喉",
        "破伤风",
        "百日咳",
        "脊髓灰质炎",
        "Hib",
        "肺炎球菌相关疾病",
        "麻疹",
        "腮腺炎",
        "风疹",
        "水痘",
        "HPV",
      ],
      divergeTitle: "被 HHS 归入有条件或高风险路径的 7 类疾病",
      divergeItems: [
        "低风险婴儿的乙肝",
        "甲肝",
        "轮状病毒",
        "流感",
        "新冠",
        "RSV",
        "脑膜炎球菌相关疾病",
      ],
      note:
        "这里故意改用疾病维度总结，避免把联合疫苗或组合产品重复计算。需要注意的是，“有条件”那组里有几项在当前 CDC notes 页面上仍然写得更宽。",
    },
    productChangesTitle: "值得知道的产品更新",
    productChanges: [
      "美国目前的肺炎球菌结合疫苗已基本从 PCV13 过渡到 PCV15 或 PCV20。",
      "Menactra 已退出，现行 MenACWY 产品主要是 Menveo 和 MenQuadfi。",
      "RSV 单克隆抗体已经进入婴儿期规划；当前 CDC notes 页面点名的是 nirsevimab，而 Enflonsia 也已获得 FDA 批准。",
      "美国仍在使用的 HPV 疫苗只剩 Gardasil 9。",
    ],
    insuranceTitle: "保险覆盖怎么理解",
    insuranceParagraphs: [
      "HHS 在 2026 年 1 月 5 日的说明里写明：截至 2025 年 12 月 31 日已被 CDC 推荐过的儿童疫苗，仍将通过 ACA 计划、Medicaid、CHIP 和 Vaccines for Children 体系继续覆盖，且不额外分担费用。",
      "AAP 的免疫 FAQ 也写到：共同临床决策仍然提供支付路径，Vaccines for Children 项目也会继续分发这些疫苗。",
    ],
    referencesTitle: "参考链接",
    disclaimer:
      "本指南仅用于帮助家长理解时间表与就诊前准备，不能替代儿科医生的个体化建议。具体接种时点、产品选择与高风险判断仍应在门诊确认。",
  },
};

export const references: {
  name: LocalizedText;
  url: string;
}[] = [
  {
    name: {
      en: "AAP 2026 immunization schedule",
      zh: "AAP 2026 儿童与青少年接种时间表",
    },
    url: "https://publications.aap.org/pediatrics/article/157/3/e2025075754/206175/Recommended-Childhood-and-Adolescent-Immunization",
  },
  {
    name: {
      en: "AAP immunization FAQ",
      zh: "AAP 免疫接种 FAQ",
    },
    url: "https://www.aap.org/en/patient-care/immunizations/aap-immunization-faq/",
  },
  {
    name: {
      en: "HealthyChildren parent schedule",
      zh: "HealthyChildren 家长版接种时间表",
    },
    url: "https://www.healthychildren.org/English/safety-prevention/immunizations/Pages/Recommended-Immunization-Schedules.aspx",
  },
  {
    name: {
      en: "CDC child and adolescent notes",
      zh: "CDC 儿童与青少年接种 notes 页面",
    },
    url: "https://www.cdc.gov/vaccines/hcp/imz-schedules/child-adolescent-notes.html",
  },
  {
    name: {
      en: "CDC child and adolescent schedule by age",
      zh: "CDC 儿童与青少年按年龄时间表",
    },
    url: "https://www.cdc.gov/vaccines/hcp/imz-schedules/child-adolescent-age.html",
  },
  {
    name: {
      en: "HHS fact sheet on 2026 changes",
      zh: "HHS 关于 2026 调整的说明",
    },
    url: "https://www.hhs.gov/press-room/fact-sheet-cdc-childhood-immunization-recommendations.html",
  },
  {
    name: {
      en: "HHS hepatitis B press release",
      zh: "HHS 乙肝政策新闻稿",
    },
    url: "https://www.hhs.gov/press-room/cdc-adopts-individual-based-decision-making-for-hepatitis-b-immunization-for-infants-born-to-women-who-test-negative-for-the-hepatitis-b-virus.html",
  },
  {
    name: {
      en: "CDC MMR or MMRV clinician fact sheet",
      zh: "CDC MMR / MMRV 临床说明页",
    },
    url: "https://www.cdc.gov/vaccines/vpd/mmr/hcp/vacopt-factsheet-hcp.html",
  },
  {
    name: {
      en: "FDA REDEMPLO (clesrovimab) snapshot",
      zh: "FDA REDEMPLO（clesrovimab）说明页",
    },
    url: "https://www.fda.gov/drugs/drug-approvals-and-databases/drug-trials-snapshots-redemplo",
  },
];

export const milestones: Milestone[] = [
  {
    id: 1,
    ageLabel: { en: "Birth", zh: "出生" },
    vaccineKeys: ["hbv"],
    shotsLabel: { en: "1 shot", zh: "1 针" },
    sourceOverviewRow: true,
  },
  {
    id: 2,
    ageLabel: { en: "1 month", zh: "1 月" },
    vaccineKeys: ["hbv"],
    shotsLabel: { en: "1 shot", zh: "1 针" },
    sourceOverviewRow: true,
  },
  {
    id: 3,
    ageLabel: { en: "2 months", zh: "2 月" },
    vaccineKeys: ["rotavirus", "pcv", "dtap-ipv-hib"],
    shotsLabel: { en: "2 shots + 1 oral", zh: "2 针 + 1 次口服" },
    sourceOverviewRow: true,
  },
  {
    id: 4,
    ageLabel: { en: "4 months", zh: "4 月" },
    vaccineKeys: ["rotavirus", "pcv", "dtap-ipv-hib"],
    shotsLabel: { en: "2 shots + 1 oral", zh: "2 针 + 1 次口服" },
    sourceOverviewRow: true,
  },
  {
    id: 5,
    ageLabel: { en: "6 months", zh: "6 月" },
    vaccineKeys: ["hbv", "rotavirus", "dtap-ipv-hib"],
    shotsLabel: { en: "2 shots + 1 oral", zh: "2 针 + 1 次口服" },
    sourceOverviewRow: true,
  },
  {
    id: 6,
    ageLabel: { en: "6+ months", zh: "6 月+" },
    vaccineKeys: ["influenza"],
    shotsLabel: {
      en: "1-2 doses depending on season history",
      zh: "按既往接种史决定 1-2 剂",
    },
    sourceOverviewRow: true,
  },
  {
    id: 7,
    ageLabel: { en: "12-15 months", zh: "12-15 月" },
    vaccineKeys: ["mmr", "varicella", "hav", "pcv", "dtap-ipv-hib"],
    shotsLabel: { en: "4-5 shots", zh: "4-5 针" },
    note: {
      en: "Whether Hib is bundled depends on whether the primary series used Pentacel or Vaxelis.",
      zh: "Hib 是否能打包在同一次门诊里，取决于前面使用的是 Pentacel 还是 Vaxelis。",
    },
    sourceOverviewRow: true,
  },
  {
    id: 8,
    ageLabel: { en: "15-18 months", zh: "15-18 月" },
    vaccineKeys: ["dtap-ipv-hib"],
    shotsLabel: { en: "1 shot", zh: "1 针" },
    note: {
      en: "Pentacel can cover DTaP dose 4 when it is used for the Hib-containing visit.",
      zh: "如果这一针用的是 Pentacel，它可以同时覆盖 DTaP 第 4 剂。",
    },
    sourceOverviewRow: true,
  },
  {
    id: 9,
    ageLabel: { en: "18-23 months", zh: "18-23 月" },
    vaccineKeys: ["hav"],
    shotsLabel: { en: "1 shot", zh: "1 针" },
    sourceOverviewRow: true,
  },
  {
    id: 10,
    ageLabel: { en: "4-6 years", zh: "4-6 岁" },
    vaccineKeys: ["mmrv", "quadracel"],
    shotsLabel: { en: "2 shots", zh: "2 针" },
    sourceOverviewRow: true,
  },
  {
    id: 11,
    ageLabel: { en: "11-12 years", zh: "11-12 岁" },
    vaccineKeys: ["hpv", "tdap", "menacwy"],
    shotsLabel: { en: "3 shots", zh: "3 针" },
    sourceOverviewRow: true,
  },
  {
    id: 12,
    ageLabel: { en: "16 years", zh: "16 岁" },
    vaccineKeys: ["menacwy"],
    shotsLabel: { en: "1 shot", zh: "1 针" },
    sourceOverviewRow: true,
  },
  {
    id: 13,
    ageLabel: { en: "First RSV season", zh: "首个 RSV 季" },
    vaccineKeys: ["rsv"],
    shotsLabel: { en: "1 injection if indicated", zh: "符合条件时 1 次注射" },
    note: {
      en: "Maternal RSV vaccination changes whether an infant monoclonal antibody is needed.",
      zh: "如果孕期已经接种母体 RSV 疫苗，婴儿是否还需要单克隆抗体会随之改变。",
    },
    sourceOverviewRow: true,
  },
];

export const vaccineItems: VaccineItem[] = [
  {
    id: 1,
    key: "hbv",
    phase: "infant",
    category: "vaccine",
    icon: "🛡️",
    status: "conditional",
    headline: { en: "HBV", zh: "乙肝疫苗" },
    subheadline: {
      en: "乙型肝炎疫苗 · Hepatitis B vaccine",
      zh: "HBV · Hepatitis B vaccine",
    },
    scheduleSummary: {
      en: "Birth, 1 month, 6 months",
      zh: "出生、1 月、6 月",
    },
    protectsAgainstSummary: {
      en: "Hepatitis B, a liver infection that can become chronic and later lead to cirrhosis or liver cancer.",
      zh: "预防乙型肝炎病毒感染，这是一种可能慢性化并在以后导致肝硬化或肝癌的肝脏感染。",
    },
    aapShort: {
      en: "Universally recommended, with strong emphasis on the birth dose.",
      zh: "对所有婴儿常规推荐，并特别强调出生针。",
    },
    cdcShort: {
      en: "Current CDC notes still list routine birth-dose HepB for HBsAg-negative mothers; HHS announced shared decision-making for low-risk infants.",
      zh: "当前 CDC notes 页面仍把 HBsAg 阴性母亲所生婴儿的出生针写成常规安排；HHS 公布的方向则把低风险婴儿改为共同决策。",
    },
    detailBlocks: [
      {
        title: {
          en: "Why the birth dose matters",
          zh: "为什么出生针特别重要",
        },
        paragraphs: [
          {
            en: "If an infant acquires hepatitis B early in life, the infection becomes chronic in roughly 90% of cases. Adults, by contrast, clear the virus much more often.",
            zh: "如果婴儿在生命早期感染乙肝，约 90% 的情况会变成慢性感染；而成年人感染后发展为慢性的比例则低得多。",
          },
          {
            en: "That is why birth dosing has always carried extra weight in U.S. schedules: it closes the gap before later infant visits and protects babies whose maternal status is unknown or misclassified.",
            zh: "这也是美国时间表一直格外重视出生针的原因：它能在后续门诊前先建立保护，也能覆盖母亲状态未知或被误判的情况。",
          },
        ],
      },
      {
        title: {
          en: "Timing notes",
          zh: "时间点细节",
        },
        bullets: [
          {
            en: "Routine series: birth, 1 month, and 6 months.",
            zh: "常规程序为出生、1 月和 6 月，共 3 剂。",
          },
          {
            en: "Infants born to mothers who are HBsAg-positive or whose status is unknown still need prompt protection at birth.",
            zh: "如果母亲 HBsAg 阳性或状态不明，宝宝出生后仍需要尽快完成保护。",
          },
        ],
      },
    ],
    comparison: {
      aap: [
        {
          en: "Keeps hepatitis B as a universal routine vaccine for infants and treats the birth dose as foundational, not optional.",
          zh: "仍把乙肝列为所有婴儿的常规疫苗，并把出生针视为基础步骤而不是可选项。",
        },
      ],
      cdc: [
        {
          en: "HHS announced shared decision-making for low-risk infants, but the currently posted CDC notes page still shows a routine birth-dose series for infants of HBsAg-negative mothers.",
          zh: "HHS 公布的是把低风险婴儿转入共同临床决策，但当前挂出的 CDC notes 页面仍把 HBsAg 阴性母亲所生婴儿写成常规出生针程序。",
        },
      ],
    },
  },
  {
    id: 2,
    key: "rotavirus",
    phase: "infant",
    category: "vaccine",
    icon: "💧",
    status: "conditional",
    headline: { en: "Rotavirus", zh: "轮状病毒" },
    subheadline: {
      en: "轮状病毒疫苗（口服） · Rotavirus vaccine",
      zh: "Rotavirus vaccine · 口服轮状病毒疫苗",
    },
    scheduleSummary: {
      en: "2 and 4 months, plus 6 months for RotaTeq",
      zh: "2 月、4 月；RotaTeq 还需 6 月一剂",
    },
    protectsAgainstSummary: {
      en: "Severe infant diarrhea and vomiting that used to drive tens of thousands of U.S. hospitalizations each year.",
      zh: "预防导致婴儿严重腹泻和呕吐的轮状病毒；在疫苗普及前，美国每年都有大量住院病例。",
    },
    aapShort: {
      en: "Universally recommended; still treated as standard infant protection.",
      zh: "仍是所有婴儿的常规推荐项目。",
    },
    cdcShort: {
      en: "HHS fact sheet lists this under shared clinical decision-making; current CDC notes still list the routine 2- or 3-dose series.",
      zh: "HHS 说明把它列入共同临床决策，但当前 CDC notes 页面仍然写着常规 2 剂或 3 剂程序。",
    },
    detailBlocks: [
      {
        title: {
          en: "What makes this vaccine different",
          zh: "这个项目有什么特殊之处",
        },
        paragraphs: [
          {
            en: "Rotavirus vaccine is given by mouth, not by injection. That makes it one of the few oral products on the infant schedule.",
            zh: "轮状病毒疫苗是口服而不是注射，这让它成为婴儿时间表里少数的口服项目之一。",
          },
        ],
        bullets: [
          {
            en: "RotaTeq: 3-dose series at 2, 4, and 6 months.",
            zh: "RotaTeq：2、4、6 月共 3 剂。",
          },
          {
            en: "Rotarix: 2-dose series at 2 and 4 months.",
            zh: "Rotarix：2、4 月共 2 剂。",
          },
        ],
      },
      {
        title: {
          en: "The strict timing rule",
          zh: "最关键的窗口限制",
        },
        paragraphs: [
          {
            en: "The first dose must be started before 15 weeks of age, and the full series must be completed by 8 months. If the window is missed, the series is not started late.",
            zh: "首剂必须在 15 周龄前开始，整个程序必须在 8 月龄前完成；如果窗口错过了，通常不会再晚启动。",
          },
        ],
      },
    ],
    comparison: {
      aap: [
        {
          en: "Keeps rotavirus as a routine infant vaccine because it prevents severe dehydration and hospitalization in a narrow early-life window.",
          zh: "继续把轮状病毒列为常规婴儿疫苗，因为它能在最脆弱的早期阶段降低脱水和住院风险。",
        },
      ],
      cdc: [
        {
          en: "HHS announced clinician-parent shared decision-making, but the current CDC notes page still presents routine Rotarix and RotaTeq series.",
          zh: "HHS 公布的是医生与家长共同决策，但当前 CDC notes 页面仍按常规写着 Rotarix 和 RotaTeq 的标准程序。",
        },
      ],
    },
  },
  {
    id: 3,
    key: "pcv",
    phase: "infant",
    category: "vaccine",
    icon: "🫁",
    status: "consensus",
    headline: { en: "PCV15 / PCV20", zh: "肺炎球菌结合疫苗" },
    subheadline: {
      en: "15- or 20-valent pneumococcal conjugate vaccine",
      zh: "PCV15 / PCV20 · 15 价或 20 价肺炎球菌结合疫苗",
    },
    scheduleSummary: {
      en: "2, 4, 6, and 12-15 months",
      zh: "2、4、6 月，以及 12-15 月加强",
    },
    protectsAgainstSummary: {
      en: "Pneumococcal disease, including pneumonia, bloodstream infection, meningitis, and some ear infections.",
      zh: "预防肺炎球菌相关疾病，包括肺炎、菌血症、脑膜炎和部分中耳炎。",
    },
    aapShort: {
      en: "Universally recommended.",
      zh: "常规推荐。",
    },
    cdcShort: {
      en: "Universally recommended.",
      zh: "常规推荐。",
    },
    detailBlocks: [
      {
        title: {
          en: "Current products",
          zh: "目前常见产品",
        },
        paragraphs: [
          {
            en: "PCV15 (Vaxneuvance) covers 15 strains and PCV20 (Prevnar 20) covers 20 strains of Streptococcus pneumoniae.",
            zh: "PCV15（Vaxneuvance）覆盖 15 个血清型，PCV20（Prevnar 20）覆盖 20 个血清型。",
          },
          {
            en: "These products replaced the older PCV13 in current U.S. practice. Children who started with PCV13 can finish with PCV15 or PCV20 without restarting.",
            zh: "在当前美国实践中，这两种产品已经接替更早的 PCV13。已经以 PCV13 开始接种的孩子可以用 PCV15 或 PCV20 完成后续剂次，不需要重新开始。",
          },
        ],
      },
    ],
    comparison: {
      aap: [
        {
          en: "Maintains a standard 4-dose infant schedule with a booster at 12-15 months.",
          zh: "维持标准的 4 剂程序，并在 12-15 月安排加强。",
        },
      ],
      cdc: [
        {
          en: "Matches the routine infant schedule and currently available products.",
          zh: "与 AAP 在常规程序和当前产品选择上保持一致。",
        },
      ],
    },
  },
  {
    id: 4,
    key: "dtap-ipv-hib",
    phase: "infant",
    category: "combo",
    icon: "🧩",
    status: "consensus",
    headline: { en: "DTaP-IPV-Hib", zh: "五联 / 六联组合疫苗" },
    subheadline: {
      en: "Pentacel or Vaxelis combination series",
      zh: "Pentacel / Vaxelis · DTaP-IPV-Hib 组合程序",
    },
    scheduleSummary: {
      en: "Primary series at 2, 4, and 6 months; booster logic depends on product history",
      zh: "2、4、6 月完成基础系列；后续加强是否合并取决于前面用的产品",
    },
    protectsAgainstSummary: {
      en: "Diphtheria, tetanus, pertussis, polio, and Hib in fewer injections than separate shots.",
      zh: "把白喉、破伤风、百日咳、脊灰和 Hib 组合在更少针数里完成。",
    },
    aapShort: {
      en: "All components remain universally recommended.",
      zh: "所有组成成分都常规推荐。",
    },
    cdcShort: {
      en: "All components remain universally recommended.",
      zh: "所有组成成分都常规推荐。",
    },
    detailBlocks: [
      {
        title: {
          en: "What each part covers",
          zh: "每个成分在预防什么",
        },
        bullets: [
          {
            en: "DTaP: diphtheria, tetanus, and pertussis.",
            zh: "DTaP：白喉、破伤风、百日咳。",
          },
          {
            en: "IPV: polio.",
            zh: "IPV：脊髓灰质炎。",
          },
          {
            en: "Hib: Haemophilus influenzae type b, once a leading cause of pediatric bacterial meningitis.",
            zh: "Hib：乙型流感嗜血杆菌，曾是儿童细菌性脑膜炎的重要原因。",
          },
        ],
      },
      {
        title: {
          en: "Pentacel versus Vaxelis",
          zh: "Pentacel 和 Vaxelis 的区别",
        },
        bullets: [
          {
            en: "Pentacel is a 5-in-1 product licensed at 2, 4, 6, and 15-18 months.",
            zh: "Pentacel 是五联疫苗，许可程序为 2、4、6 月和 15-18 月。",
          },
          {
            en: "Vaxelis is a 6-in-1 product used at 2, 4, and 6 months only and is not used for the Hib booster dose.",
            zh: "Vaxelis 是六联疫苗，只用于 2、4、6 月的基础系列，不用于 Hib 加强剂。",
          },
          {
            en: "If the primary series used Vaxelis, the child still needs a separate Hib booster and a standalone DTaP dose 4 later.",
            zh: "如果前面用的是 Vaxelis，后面仍需要单独补 Hib 加强剂和 DTaP 第 4 剂。",
          },
        ],
      },
    ],
    comparison: {
      aap: [
        {
          en: "Keeps the standard U.S. combination-vaccine logic and routine DTaP, IPV, and Hib schedule.",
          zh: "维持美国现行的组合疫苗逻辑，以及 DTaP、IPV、Hib 的常规程序。",
        },
      ],
      cdc: [
        {
          en: "Matches the AAP on universal routine use for these components.",
          zh: "在这些成分上与 AAP 一致，仍面向所有儿童常规推荐。",
        },
      ],
    },
  },
  {
    id: 5,
    key: "mmr",
    phase: "toddler",
    category: "vaccine",
    icon: "🧒",
    status: "consensus",
    headline: { en: "MMR", zh: "麻腮风" },
    subheadline: {
      en: "Measles, mumps, and rubella vaccine",
      zh: "MMR · 麻疹、腮腺炎、风疹联合疫苗",
    },
    scheduleSummary: {
      en: "12-15 months and 4-6 years",
      zh: "12-15 月首剂，4-6 岁第 2 剂",
    },
    protectsAgainstSummary: {
      en: "Measles, mumps, and rubella, including severe measles pneumonia or encephalitis and congenital rubella syndrome.",
      zh: "预防麻疹、腮腺炎和风疹，包括严重的麻疹肺炎或脑炎，以及先天性风疹综合征。",
    },
    aapShort: {
      en: "Universally recommended.",
      zh: "常规推荐。",
    },
    cdcShort: {
      en: "Universally recommended.",
      zh: "常规推荐。",
    },
    detailBlocks: [
      {
        title: {
          en: "Why the first dose waits until 12 months",
          zh: "为什么首剂通常等到 12 月龄",
        },
        paragraphs: [
          {
            en: "Maternal antibodies help protect infants early, but those same antibodies can blunt vaccine response. By about 12 months, that interference is low enough for the baby to mount a stronger immune response.",
            zh: "母体抗体在早期能提供保护，但也会削弱疫苗应答。到约 12 月龄时，这种干扰已经下降到更适合宝宝自己建立免疫反应的程度。",
          },
        ],
      },
    ],
    comparison: {
      aap: [
        {
          en: "Keeps the routine two-dose schedule beginning at 12-15 months.",
          zh: "维持从 12-15 月开始的两剂常规程序。",
        },
      ],
      cdc: [
        {
          en: "Matches the routine two-dose schedule.",
          zh: "与 AAP 一样维持两剂常规程序。",
        },
      ],
    },
  },
  {
    id: 6,
    key: "hav",
    phase: "toddler",
    category: "vaccine",
    icon: "🍽️",
    status: "conditional",
    headline: { en: "HAV", zh: "甲肝疫苗" },
    subheadline: {
      en: "Hepatitis A vaccine",
      zh: "HAV · Hepatitis A vaccine",
    },
    scheduleSummary: {
      en: "Dose 1 at 12-23 months, dose 2 six to 18 months later",
      zh: "12-23 月首剂，6-18 个月后第 2 剂",
    },
    protectsAgainstSummary: {
      en: "Hepatitis A, a food- or water-borne infection that does not become chronic but can still cause weeks of fever, jaundice, fatigue, and nausea.",
      zh: "预防甲型肝炎，这种经食物、水或密切接触传播的感染通常不会慢性化，但仍可能带来数周的发热、黄疸、疲乏和恶心。",
    },
    aapShort: {
      en: "Universally recommended.",
      zh: "常规推荐。",
    },
    cdcShort: {
      en: "HHS fact sheet moves HepA to high-risk and shared decision-making buckets; current CDC notes still list a routine 2-dose toddler series.",
      zh: "HHS 说明把甲肝归入高风险加共同决策路径，但当前 CDC notes 页面仍写着幼儿期常规两剂程序。",
    },
    detailBlocks: [
      {
        title: {
          en: "Why it was added universally in the first place",
          zh: "为什么它当年会进入全民推荐",
        },
        paragraphs: [
          {
            en: "Before universal childhood vaccination was adopted in the U.S., hepatitis A caused repeated outbreaks and tens of thousands of reported cases. Childhood vaccination meaningfully reduced that reservoir.",
            zh: "在美国把甲肝纳入儿童普遍接种之前，甲肝曾反复造成暴发和大量病例。儿童普遍接种显著压低了这一传播储备。",
          },
        ],
      },
    ],
    comparison: {
      aap: [
        {
          en: "Keeps hepatitis A as a routine two-dose toddler vaccine.",
          zh: "继续把甲肝保留为幼儿期两剂常规疫苗。",
        },
      ],
      cdc: [
        {
          en: "HHS narrows HepA into high-risk or shared decision-making categories, while the currently posted CDC notes page still shows routine vaccination at 12-23 months.",
          zh: "HHS 把甲肝收窄到高风险或共同决策类别，但当前挂出的 CDC notes 页面仍把 12-23 月龄两剂程序写成常规接种。",
        },
      ],
    },
  },
  {
    id: 7,
    key: "varicella",
    phase: "toddler",
    category: "vaccine",
    icon: "🌤️",
    status: "consensus",
    headline: { en: "Varicella", zh: "水痘疫苗" },
    subheadline: {
      en: "Chickenpox vaccine",
      zh: "Varicella · Chickenpox vaccine",
    },
    scheduleSummary: {
      en: "12-15 months and 4-6 years",
      zh: "12-15 月首剂，4-6 岁第 2 剂",
    },
    protectsAgainstSummary: {
      en: "Chickenpox and the severe complications that once caused millions of cases, thousands of hospitalizations, and deaths each year in the U.S.",
      zh: "预防水痘及其严重并发症；在疫苗问世前，美国每年都有数百万病例、上万住院和相关死亡。",
    },
    aapShort: {
      en: "Universally recommended.",
      zh: "常规推荐。",
    },
    cdcShort: {
      en: "Universally recommended.",
      zh: "常规推荐。",
    },
    detailBlocks: [
      {
        title: {
          en: "Why chickenpox is not just a mild childhood illness",
          zh: "为什么水痘并不只是“小时候得一下就好”",
        },
        paragraphs: [
          {
            en: "Varicella-zoster virus stays in the body after infection and can reactivate later as shingles. Preventing the initial infection also changes that later-life risk picture.",
            zh: "水痘-带状疱疹病毒在感染后不会完全离开身体，未来还可能以带状疱疹的形式再次激活。预防第一次感染，也会改变之后的人生风险图谱。",
          },
        ],
      },
    ],
    comparison: {
      aap: [
        {
          en: "Keeps the routine two-dose schedule.",
          zh: "维持两剂常规程序。",
        },
      ],
      cdc: [
        {
          en: "Keeps the routine two-dose schedule.",
          zh: "维持两剂常规程序。",
        },
      ],
    },
  },
  {
    id: 8,
    key: "mmrv",
    phase: "toddler",
    category: "combo",
    icon: "🎒",
    status: "consensus",
    headline: { en: "ProQuad (MMRV)", zh: "麻腮风水痘联合疫苗" },
    subheadline: {
      en: "Second-dose MMRV combination",
      zh: "ProQuad / MMRV · 麻腮风水痘联合加强",
    },
    scheduleSummary: {
      en: "Typically used at 4-6 years for dose 2 of MMR and varicella",
      zh: "通常在 4-6 岁用于 MMR 与水痘的第 2 剂",
    },
    protectsAgainstSummary: {
      en: "The same four diseases as separate MMR plus varicella, but with one injection instead of two.",
      zh: "预防与分开打的 MMR 加水痘相同的四种疾病，但能少打一针。",
    },
    aapShort: {
      en: "Universally recommended as a practical second-dose option.",
      zh: "作为第 2 剂的实用组合方案，常规推荐。",
    },
    cdcShort: {
      en: "Routine second-dose option; current CDC guidance favors separate MMR plus varicella for the first dose at 12-47 months.",
      zh: "仍是常规第 2 剂选项；但当前 CDC 指南对 12-47 月龄首剂更倾向于分开打 MMR 和水痘。",
    },
    detailBlocks: [
      {
        title: {
          en: "Why the first dose is usually separate",
          zh: "为什么首剂通常还是分开打",
        },
        paragraphs: [
          {
            en: "For the first dose at 12-15 months, current CDC clinician guidance favors separate MMR and varicella vaccines for children 12-47 months unless parents specifically prefer MMRV after counseling, because the combination carries a higher febrile seizure risk in that age range.",
            zh: "对于 12-15 月龄的首剂，当前 CDC 给临床医生的指引是：对 12-47 月龄儿童，除非家长在充分知情后明确偏好 MMRV，否则更倾向于把 MMR 和水痘分开打，因为联合制剂在这个年龄段的热性惊厥风险更高。",
          },
        ],
        bullets: [
          {
            en: "By dose 2 at 4-6 years, that seizure-risk difference is no longer the main issue, so MMRV remains a routine way to reduce injections.",
            zh: "到了 4-6 岁的第 2 剂阶段，这种风险差异已不再是主要顾虑，因此 MMRV 仍然是减少针数的常规做法。",
          },
        ],
      },
    ],
    comparison: {
      aap: [
        {
          en: "Supports MMRV as the preferred low-injection second-dose strategy at 4-6 years.",
          zh: "支持在 4-6 岁把 MMRV 作为减少针数的优先第 2 剂方案。",
        },
      ],
      cdc: [
        {
          en: "Keeps MMRV as a routine second-dose option, but current CDC guidance does not treat it as the default first-dose product for children 12-47 months.",
          zh: "仍把 MMRV 保留为常规第 2 剂选择，但当前 CDC 指南并不把它当作 12-47 月龄首剂的默认产品。",
        },
      ],
    },
  },
  {
    id: 9,
    key: "quadracel",
    phase: "toddler",
    category: "booster",
    icon: "🚌",
    status: "consensus",
    headline: { en: "Quadracel", zh: "四联加强疫苗" },
    subheadline: {
      en: "DTaP-IPV booster for the pre-K visit",
      zh: "Quadracel · 学龄前 DTaP-IPV 加强针",
    },
    scheduleSummary: {
      en: "4-6 years",
      zh: "4-6 岁",
    },
    protectsAgainstSummary: {
      en: "Booster protection for diphtheria, tetanus, pertussis, and polio before school entry.",
      zh: "在入学前为白喉、破伤风、百日咳和脊灰重新拉高保护水平。",
    },
    aapShort: {
      en: "Universally recommended.",
      zh: "常规推荐。",
    },
    cdcShort: {
      en: "Universally recommended.",
      zh: "常规推荐。",
    },
    detailBlocks: [
      {
        title: {
          en: "Why Hib drops out here",
          zh: "为什么这里不再带 Hib",
        },
        paragraphs: [
          {
            en: "Hib disease risk falls sharply after age 5, so the pre-kindergarten booster focuses on the DTaP and IPV components instead of repeating Hib.",
            zh: "5 岁后 Hib 的疾病风险明显下降，所以学龄前加强通常只强调 DTaP 和 IPV，而不再重复 Hib。",
          },
        ],
      },
    ],
    comparison: {
      aap: [
        {
          en: "Keeps the routine pre-K DTaP-IPV booster.",
          zh: "维持学龄前常规 DTaP-IPV 加强。",
        },
      ],
      cdc: [
        {
          en: "Keeps the same pre-K booster schedule.",
          zh: "维持相同的学龄前加强安排。",
        },
      ],
    },
  },
  {
    id: 10,
    key: "hpv",
    phase: "adolescent",
    category: "vaccine",
    icon: "🎗️",
    status: "protocol-diff",
    headline: { en: "HPV (Gardasil 9)", zh: "HPV 疫苗" },
    subheadline: {
      en: "Human papillomavirus vaccine",
      zh: "Gardasil 9 · 人乳头瘤病毒疫苗",
    },
    scheduleSummary: {
      en: "Starts at 11-12 years; AAP keeps 2 doses before age 15, while HHS says CDC moved to 1 dose",
      zh: "11-12 岁开始；AAP 仍主张 15 岁前 2 剂，而 HHS 说明写的是 CDC 改为 1 剂",
    },
    protectsAgainstSummary: {
      en: "HPV-related cancers and genital warts, including cervical, throat, anal, and other cancers tied to persistent HPV infection.",
      zh: "预防与 HPV 持续感染相关的癌症和尖锐湿疣，包括宫颈癌、口咽癌、肛门癌等。",
    },
    aapShort: {
      en: "Universally recommended; 2 doses before age 15, 3 doses if starting later or immunocompromised.",
      zh: "常规推荐；15 岁前通常 2 剂，15 岁后或免疫功能受损者 3 剂。",
    },
    cdcShort: {
      en: "HHS fact sheet says 1 dose; the current CDC notes page still lists 2 or 3 doses depending on age at initiation.",
      zh: "HHS 说明写的是 1 剂，但当前 CDC notes 页面仍按起始年龄写 2 剂或 3 剂。",
    },
    detailBlocks: [
      {
        title: {
          en: "Why the age window matters",
          zh: "为什么 11-12 岁是关键窗口",
        },
        paragraphs: [
          {
            en: "The immune response is strongest before any likely HPV exposure, which is why the routine schedule starts in early adolescence rather than waiting until later teen years.",
            zh: "在可能接触 HPV 之前接种，免疫反应通常更强，所以常规起始年龄放在青春早期，而不是更晚的青少年阶段。",
          },
        ],
      },
      {
        title: {
          en: "What changed in the debate",
          zh: "争议真正变化在哪里",
        },
        paragraphs: [
          {
            en: "Gardasil 9 is still the only HPV vaccine distributed in the U.S. The disagreement is not about whether the vaccine is used, but about whether one dose is enough for routine protection.",
            zh: "美国目前仍只分发 Gardasil 9。双方争议的焦点不是“要不要打”，而是“常规保护是否一剂就够”。",
          },
          {
            en: "The AAP continues to favor the established 2-dose series before age 15 because long-term cancer-prevention evidence for a 1-dose strategy is still more limited, especially beyond cervical outcomes. The current CDC notes page has also not yet been updated to a 1-dose protocol.",
            zh: "AAP 继续支持 15 岁前的标准 2 剂方案，因为针对 1 剂策略的长期癌症预防证据仍相对有限，尤其是在宫颈癌以外的结局上。当前 CDC notes 页面也还没有改成 1 剂程序。",
          },
        ],
      },
    ],
    comparison: {
      aap: [
        {
          en: "Still recommends the established 2-dose schedule before age 15 and 3 doses for older or immunocompromised adolescents.",
          zh: "仍坚持 15 岁前 2 剂、年龄更大或免疫功能受损时 3 剂的既有方案。",
        },
      ],
      cdc: [
        {
          en: "HHS says the routine protocol drops to 1 dose, but the current CDC notes page still shows the older 2- or 3-dose schedule.",
          zh: "HHS 说明写的是常规程序降到 1 剂，但当前 CDC notes 页面仍然写着旧的 2 剂或 3 剂安排。",
        },
      ],
      cdcNote: {
        en: "This is the clearest example where the announced policy change and the currently posted CDC schedule text are still visibly out of sync.",
        zh: "这是最典型的一个例子：已公布的政策方向和当前挂在 CDC 页面上的时间表文字，仍然明显没有完全同步。",
      },
    },
  },
  {
    id: 11,
    key: "tdap",
    phase: "adolescent",
    category: "booster",
    icon: "🔁",
    status: "consensus",
    headline: { en: "Tdap", zh: "百白破加强针" },
    subheadline: {
      en: "Adolescent tetanus, diphtheria, and pertussis booster",
      zh: "Tdap · 青少年破伤风、白喉、百日咳加强",
    },
    scheduleSummary: {
      en: "11-12 years",
      zh: "11-12 岁",
    },
    protectsAgainstSummary: {
      en: "Refreshes protection against tetanus, diphtheria, and pertussis as childhood DTaP immunity wanes.",
      zh: "在儿童期 DTaP 保护逐渐减弱后，为破伤风、白喉和百日咳重新加固免疫。",
    },
    aapShort: {
      en: "Universally recommended.",
      zh: "常规推荐。",
    },
    cdcShort: {
      en: "Universally recommended.",
      zh: "常规推荐。",
    },
    detailBlocks: [
      {
        title: {
          en: "Why the letters change",
          zh: "为什么名字里的字母大小写变了",
        },
        paragraphs: [
          {
            en: "DTaP uses higher-dose diphtheria and pertussis components for young children. Tdap uses lower-dose components that are better matched to older children and adults.",
            zh: "DTaP 里的白喉和百日咳成分剂量更高，适合小龄儿童；Tdap 则把相关成分做成更适合大孩子和成人的较低剂量。",
          },
        ],
      },
    ],
    comparison: {
      aap: [
        {
          en: "Keeps the routine adolescent booster at 11-12 years.",
          zh: "维持 11-12 岁常规加强。",
        },
      ],
      cdc: [
        {
          en: "Keeps the same routine adolescent booster.",
          zh: "维持相同的常规加强安排。",
        },
      ],
    },
  },
  {
    id: 12,
    key: "menacwy",
    phase: "adolescent",
    category: "vaccine",
    icon: "🏫",
    status: "conditional",
    headline: { en: "MenACWY", zh: "流脑结合疫苗" },
    subheadline: {
      en: "Meningococcal A, C, W, Y conjugate vaccine",
      zh: "MenACWY · A、C、W、Y 群脑膜炎球菌结合疫苗",
    },
    scheduleSummary: {
      en: "11-12 years and 16 years",
      zh: "11-12 岁首剂，16 岁加强",
    },
    protectsAgainstSummary: {
      en: "Meningococcal meningitis and bloodstream infection, which can progress extremely quickly in teens and young adults.",
      zh: "预防脑膜炎球菌性脑膜炎和败血症，这类疾病在青少年和年轻成人中进展极快。",
    },
    aapShort: {
      en: "Universally recommended as a 2-dose adolescent series.",
      zh: "作为青少年两剂程序常规推荐。",
    },
    cdcShort: {
      en: "HHS fact sheet moved MenACWY to high-risk and shared decision-making buckets; current CDC notes still list routine adolescent doses.",
      zh: "HHS 说明把 MenACWY 归入高风险加共同决策路径，但当前 CDC notes 页面仍写着青少年常规剂次。",
    },
    detailBlocks: [
      {
        title: {
          en: "Current products",
          zh: "当前产品格局",
        },
        bullets: [
          {
            en: "Current MenACWY products include Menveo and MenQuadfi.",
            zh: "当前常见 MenACWY 产品是 Menveo 和 MenQuadfi。",
          },
          {
            en: "The older Menactra product has been discontinued.",
            zh: "较早的 Menactra 已经退出。",
          },
          {
            en: "Newer pentavalent products combine MenACWY with MenB for selected older children and adolescents.",
            zh: "更新的五价产品把 MenACWY 和 MenB 组合在一起，可用于部分更大年龄儿童和青少年。",
          },
        ],
      },
      {
        title: {
          en: "Why timing still matters",
          zh: "为什么 16 岁加强仍然重要",
        },
        paragraphs: [
          {
            en: "Risk rises again in later adolescence because of dorm-style living, team sports, military settings, and other close-contact environments. That is why the 16-year booster has remained a core part of the AAP view.",
            zh: "在更晚的青少年阶段，宿舍生活、运动队、军营等近距离环境会再次推高风险，所以 16 岁加强针一直是 AAP 视角里的核心环节。",
          },
        ],
      },
    ],
    comparison: {
      aap: [
        {
          en: "Keeps the standard 11-12 year dose plus the 16-year booster.",
          zh: "继续维持 11-12 岁首剂加 16 岁加强的标准安排。",
        },
      ],
      cdc: [
        {
          en: "HHS moves MenACWY toward high-risk or shared decision-making, while the currently posted CDC notes page still lists the 11-12 year dose plus the 16-year booster.",
          zh: "HHS 把 MenACWY 转向高风险或共同决策路径，但当前挂出的 CDC notes 页面仍写着 11-12 岁首剂加 16 岁加强。",
        },
      ],
    },
  },
  {
    id: 13,
    key: "rsv",
    phase: "infant",
    category: "monoclonal",
    icon: "🫧",
    status: "conditional",
    headline: { en: "RSV monoclonal antibody", zh: "RSV 单克隆抗体" },
    subheadline: {
      en: "Infant RSV prevention with passive antibodies",
      zh: "RSV prevention · 婴儿被动免疫保护",
    },
    scheduleSummary: {
      en: "One seasonal dose for infants under 8 months entering their first RSV season when maternal protection is absent",
      zh: "对进入首个 RSV 季、且未从母体获得保护的 8 月龄以下婴儿，季节性给 1 次",
    },
    protectsAgainstSummary: {
      en: "RSV, the leading cause of infant hospitalization for bronchiolitis and pneumonia in the U.S.",
      zh: "预防 RSV，它是美国婴儿细支气管炎和肺炎住院最常见的原因之一。",
    },
    aapShort: {
      en: "Recommended for infants under 8 months entering their first season if maternal RSV vaccination does not already cover them.",
      zh: "如果母体 RSV 疫苗没有提供足够保护，AAP 仍建议 8 月龄以下婴儿在首个季节前获得该项保护。",
    },
    cdcShort: {
      en: "HHS fact sheet groups RSV under certain high-risk categories, while the current CDC notes page still lays out routine infant nirsevimab logic.",
      zh: "HHS 说明把 RSV 归入某些高风险类别，但当前 CDC notes 页面仍然写着常规婴儿 nirsevimab 的使用逻辑。",
    },
    detailBlocks: [
      {
        title: {
          en: "This is not a traditional vaccine",
          zh: "这不是传统意义上的疫苗",
        },
        paragraphs: [
          {
            en: "RSV prevention here uses monoclonal antibodies, which provide ready-made passive protection for roughly one RSV season instead of stimulating the infant to build active immunity.",
            zh: "这里的 RSV 预防依靠单克隆抗体，提供的是大约覆盖一个 RSV 季的现成被动保护，而不是让婴儿自己建立主动免疫。",
          },
        ],
      },
      {
        title: {
          en: "Current options and maternal-vaccine interaction",
          zh: "当前产品与母体疫苗的关系",
        },
        bullets: [
          {
            en: "Beyfortus (nirsevimab) is the product named in the current CDC notes page, and Enflonsia (clesrovimab) is now an additional FDA-approved infant option.",
            zh: "当前 CDC notes 页面点名的是 Beyfortus（nirsevimab），而 Enflonsia（clesrovimab）现在也是一个已获 FDA 批准的新增婴儿选项。",
          },
          {
            en: "If the pregnant parent received maternal RSV vaccination, the newborn usually does not also need an infant monoclonal antibody.",
            zh: "如果孕期已经完成母体 RSV 疫苗，宝宝通常不需要再重复接受婴儿单克隆抗体。",
          },
          {
            en: "Exceptions include unknown maternal status, birth within 14 days of maternal vaccination, or clinical judgment that risk remains high.",
            zh: "例外情况包括母体状态不明、宝宝在母体接种后 14 天内出生，或医生判断宝宝仍然是高风险。",
          },
        ],
      },
    ],
    comparison: {
      aap: [
        {
          en: "Treats infant RSV protection as a practical routine planning question whenever a baby enters RSV season without maternal protection.",
          zh: "只要宝宝在进入 RSV 季时没有母体保护，AAP 就把这项保护视为需要常规规划的实际问题。",
        },
      ],
      cdc: [
        {
          en: "HHS places RSV into a narrower high-risk bucket, while the current CDC notes page still presents routine infant eligibility rules tied to maternal vaccination timing.",
          zh: "HHS 把 RSV 放进更窄的高风险类别，但当前 CDC notes 页面仍然按母体接种时间写着常规婴儿适用规则。",
        },
      ],
      cdcNote: {
        en: "This remains one of the hardest entries for parents to decode because the policy announcement and the posted CDC notes page are still not describing the same thing in the same way.",
        zh: "这仍然是家长最难读懂的项目之一，因为政策说明和当前挂出的 CDC notes 页面，写的还不是同一层级、同一种表达。",
      },
    },
  },
  {
    id: 14,
    key: "influenza",
    phase: "infant",
    category: "vaccine",
    icon: "❄️",
    status: "conditional",
    headline: { en: "Influenza", zh: "流感疫苗" },
    subheadline: {
      en: "Annual flu vaccine",
      zh: "Influenza · 季节性流感疫苗",
    },
    scheduleSummary: {
      en: "Annual vaccination from 6 months; first season usually needs 2 doses",
      zh: "从 6 月龄开始每年接种；首个接种季通常需要 2 剂",
    },
    protectsAgainstSummary: {
      en: "Seasonal influenza, which still causes pediatric hospitalization and death every year.",
      zh: "预防季节性流感；它每年仍会造成儿童住院甚至死亡。",
    },
    aapShort: {
      en: "Universally recommended every year from 6 months onward.",
      zh: "从 6 月龄开始每年常规推荐。",
    },
    cdcShort: {
      en: "HHS fact sheet lists influenza under shared clinical decision-making; current CDC notes still list annual routine vaccination.",
      zh: "HHS 说明把流感列入共同临床决策，但当前 CDC notes 页面仍写着每年常规接种。",
    },
    detailBlocks: [
      {
        title: {
          en: "The yearly pattern",
          zh: "每年的接种逻辑",
        },
        paragraphs: [
          {
            en: "Influenza is not a one-time series. The vaccine composition changes with circulating strains, so children need yearly updates.",
            zh: "流感不是打一轮就结束的项目。因为流行株会变化，疫苗成分也会更新，所以孩子需要每年重新接种。",
          },
        ],
        bullets: [
          {
            en: "The first influenza season usually requires 2 doses at least 4 weeks apart.",
            zh: "第一次接种流感时通常需要 2 剂，两剂之间至少间隔 4 周。",
          },
          {
            en: "Later seasons usually require 1 dose per year.",
            zh: "之后大多数年份通常每季 1 剂即可。",
          },
        ],
      },
    ],
    comparison: {
      aap: [
        {
          en: "Keeps annual influenza vaccination as routine pediatric care.",
          zh: "继续把年度流感接种视为常规儿科保健的一部分。",
        },
      ],
      cdc: [
        {
          en: "HHS moves annual influenza vaccination into shared decision-making, while the current CDC notes page still presents it as routine yearly care.",
          zh: "HHS 把年度流感接种转入共同决策，但当前 CDC notes 页面仍把它写成每年的常规护理内容。",
        },
      ],
    },
  },
  {
    id: 15,
    key: "covid",
    phase: "infant",
    category: "vaccine",
    icon: "🦠",
    status: "conditional",
    headline: { en: "COVID-19", zh: "新冠疫苗" },
    subheadline: {
      en: "Updated pediatric SARS-CoV-2 vaccine",
      zh: "COVID-19 · 儿童 SARS-CoV-2 更新疫苗",
    },
    scheduleSummary: {
      en: "Starts at 6 months; dose count varies by product and age at initiation",
      zh: "从 6 月龄开始；剂次数和间隔因产品及起始年龄而异",
    },
    protectsAgainstSummary: {
      en: "COVID-19 and its complications, using updated products similar to the annual flu model.",
      zh: "预防新冠及其并发症，采用类似流感那样会随时间更新的产品策略。",
    },
    aapShort: {
      en: "Recommended starting at 6 months.",
      zh: "从 6 月龄开始推荐。",
    },
    cdcShort: {
      en: "HHS and CDC announced a move to shared clinical decision-making in October 2025.",
      zh: "HHS 与 CDC 在 2025 年 10 月公布把它转入共同临床决策。",
    },
    detailBlocks: [
      {
        title: {
          en: "Why this sits outside the compact timeline",
          zh: "为什么它没有直接放进紧凑版总览表",
        },
        paragraphs: [
          {
            en: "The detailed schedule still covers COVID-19, but the compact AAP overview table does not create a dedicated milestone row for it. That is why the overview tab treats it as a supplemental card instead of inventing a new timeline node.",
            zh: "详细条目里仍然覆盖新冠，但紧凑版 AAP 总览表并没有专门给它单列一个里程碑，所以总览页把它做成补充卡片，而不是额外硬造一行时间轴。",
          },
        ],
      },
      {
        title: {
          en: "The practical parent takeaway",
          zh: "对家长最重要的实操点",
        },
        paragraphs: [
          {
            en: "The exact product, number of doses, and spacing depend on the child’s age at initiation and the currently available updated vaccine. This is a good place to ask your practice what they are stocking this season.",
            zh: "具体用哪种产品、总共几剂、间隔多久，都要看孩子开始接种时的年龄以及当季门诊实际供应的更新疫苗。就诊时最好直接问清楚门诊这季备的是哪一种。",
          },
        ],
      },
    ],
    comparison: {
      aap: [
        {
          en: "Keeps updated COVID-19 vaccination as part of routine pediatric prevention from 6 months onward.",
          zh: "继续把从 6 月龄开始的新冠更新接种视为常规儿童预防的一部分。",
        },
      ],
      cdc: [
        {
          en: "The October 2025 HHS and CDC announcement moved the decision into shared clinical decision-making rather than treating it as a universal default.",
          zh: "2025 年 10 月 HHS 与 CDC 的公告把它从普遍默认改成了共同临床决策。",
        },
      ],
    },
  },
];
