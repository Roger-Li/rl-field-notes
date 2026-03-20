import { ContentCard } from "@/components/ContentCard";
import {
  getAllContentCardsSorted,
  getLocalizedContentCard,
} from "@/lib/content";
import type { Locale } from "@/lib/i18n";
import { siteCopy } from "@/lib/site-copy";

export function HomePage({ locale }: { locale: Locale }) {
  const copy = siteCopy[locale].home;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl sm:text-5xl font-bold text-stone-900 tracking-tight">
          {copy.heroTitle}
        </h1>
        <p className="mt-4 text-lg text-stone-500 max-w-xl mx-auto leading-relaxed">
          {copy.heroDescription}
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        {getAllContentCardsSorted(locale).map(({ key, ...card }) => (
          <ContentCard key={key} {...card} />
        ))}
      </div>
    </div>
  );
}

export function GuidesIndexPage({ locale }: { locale: Locale }) {
  const copy = siteCopy[locale].guidesIndex;
  const guideKeys: import("@/lib/content").ContentEntryKey[] = [
    "guides/formula-feeding",
    "guides/first-week",
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      <h1 className="text-3xl font-bold text-stone-900 mb-2">{copy.heading}</h1>
      <p className="text-stone-500 mb-8">{copy.intro}</p>
      <div className="grid gap-6 sm:grid-cols-2">
        {guideKeys.map((key) => (
          <ContentCard key={key} {...getLocalizedContentCard(locale, key)} />
        ))}
      </div>
    </div>
  );
}

export function ReadingNotesIndexPage({ locale }: { locale: Locale }) {
  const copy = siteCopy[locale].readingNotesIndex;
  const readingNoteKeys: import("@/lib/content").ContentEntryKey[] = [
    "reading-notes/twelve-hours-sleep",
    "reading-notes/happiest-baby-on-the-block",
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      <h1 className="text-3xl font-bold text-stone-900 mb-2">{copy.heading}</h1>
      <p className="text-stone-500 mb-8">{copy.intro}</p>
      <div className="grid gap-6 sm:grid-cols-2">
        {readingNoteKeys.map((key) => (
          <ContentCard key={key} {...getLocalizedContentCard(locale, key)} />
        ))}
      </div>
    </div>
  );
}

const timeline: {
  date: string;
  en: string;
  zh: string;
}[] = [
  {
    date: "2026-03-19",
    en: "Added read-aloud audio narration for all English articles",
    zh: "为所有英文文章添加了语音朗读功能",
  },
  {
    date: "2026-03-18",
    en: "Published \"How Much Formula Does My Baby Need?\" guide with interactive weight calculator",
    zh: "发布「宝宝每天需要喝多少配方奶？」指南，包含交互式体重计算器",
  },
  {
    date: "2026-03-13",
    en: "Published \"The Happiest Baby on the Block\" reading notes",
    zh: "发布「最快乐的宝宝」读书笔记",
  },
  {
    date: "2026-03-12",
    en: "Launched site with \"New Dad Field Guide\" and \"Twelve Hours' Sleep\" reading notes",
    zh: "网站上线，发布「新手爸爸实战指南」与「12 周睡整夜」读书笔记",
  },
];

export function AboutPageContent({ locale }: { locale: Locale }) {
  const copy = siteCopy[locale].about;

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-12">
      <h1 className="text-3xl font-bold text-stone-900 mb-6">{copy.heading}</h1>

      <div className="prose prose-stone max-w-none space-y-4 text-stone-600 leading-relaxed">
        {locale === "en" ? (
          <>
            <p>
              <strong>RL Field Notes</strong> is a knowledge hub for new dads
              — a collection of guides, reading notes, and lessons learned
              during the first year of parenting.
            </p>
            <p>
              The name is a nod to <em>Reinforcement Learning</em> — the branch
              of machine learning where an agent learns optimal behavior through
              trial, error, and reward signals. Parenting works the same way:
              you observe, you act, you learn from the outcome, and you try
              again. Every day is a new episode.
            </p>
            <p>
              All guides are sourced from evidence-based resources (AAP, CDC,
              ACOG, Mayo Clinic, peer-reviewed literature) and personal
              experience. Reading notes summarize key parenting books with
              actionable takeaways.
            </p>
          </>
        ) : (
          <>
            <p>
              <strong>RL Field Notes</strong>{" "}
              是一个写给新手爸爸的知识站，收录实用指南、读书笔记，以及育儿第一年里边做边学的经验。
            </p>
            <p>
              这个名字借用了 <em>Reinforcement Learning</em>
              （强化学习）的概念：智能体通过尝试、反馈与奖励信号不断修正策略。育儿其实也很像这个过程：观察、行动、复盘，然后在下一天继续迭代。每一天都是新的一集。
            </p>
            <p>
              站内指南以循证资料与亲身经验为基础，主要参考 AAP、CDC、ACOG、Mayo Clinic
              以及同行评审文献；读书笔记则提炼育儿书中的关键观点与可执行建议。
            </p>
          </>
        )}

        <h2 className="text-xl font-bold text-stone-800 mt-8 mb-3">
          {copy.featuresHeading}
        </h2>
        <ul>
          {locale === "en" ? (
            <>
              <li>Bilingual content in English and Simplified Chinese</li>
              <li>Read-aloud audio narration for hands-free listening (English)</li>
              <li>Interactive calculators and reference charts</li>
              <li>Giscus-powered comments on every article</li>
            </>
          ) : (
            <>
              <li>中英双语内容</li>
              <li>英文文章支持语音朗读，方便解放双手收听</li>
              <li>交互式计算器与参考图表</li>
              <li>每篇文章底部支持 Giscus 评论</li>
            </>
          )}
        </ul>

        <h2 className="text-xl font-bold text-stone-800 mt-8 mb-3">
          {copy.timelineHeading}
        </h2>
        <div className="space-y-3 not-prose">
          {timeline.map((entry) => (
            <div key={entry.date} className="flex gap-3 text-sm">
              <time className="text-stone-400 tabular-nums shrink-0 pt-0.5">
                {entry.date}
              </time>
              <span className="text-stone-600">
                {locale === "en" ? entry.en : entry.zh}
              </span>
            </div>
          ))}
        </div>

        <h2 className="text-xl font-bold text-stone-800 mt-8 mb-3">
          {copy.contributingHeading}
        </h2>
        <p>
          {locale === "en"
            ? "Have feedback or a book recommendation? Leave a comment on any page using the Giscus comment section at the bottom, or open an issue on "
            : "如果你有反馈或想推荐一本育儿书，欢迎在页面底部通过 Giscus 留言，或者直接到 "}
          <a
            href="https://github.com/Roger-Li/rl-field-notes"
            target="_blank"
            rel="noopener noreferrer"
            className="text-amber-700 underline underline-offset-2 hover:text-amber-900"
          >
            GitHub
          </a>
          {locale === "en" ? "." : " 提交 issue。"}
        </p>
      </div>
    </div>
  );
}
