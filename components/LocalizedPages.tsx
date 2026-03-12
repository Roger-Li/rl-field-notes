import { ContentCard } from "@/components/ContentCard";
import { getLocalizedContentCard } from "@/lib/content";
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
        {copy.featured.map((entryKey) => {
          const card = getLocalizedContentCard(locale, entryKey);

          return <ContentCard key={entryKey} {...card} />;
        })}
      </div>
    </div>
  );
}

export function GuidesIndexPage({ locale }: { locale: Locale }) {
  const copy = siteCopy[locale].guidesIndex;
  const card = getLocalizedContentCard(locale, "guides/first-week");

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      <h1 className="text-3xl font-bold text-stone-900 mb-2">{copy.heading}</h1>
      <p className="text-stone-500 mb-8">{copy.intro}</p>
      <div className="grid gap-6">
        <ContentCard {...card} />
      </div>
    </div>
  );
}

export function ReadingNotesIndexPage({ locale }: { locale: Locale }) {
  const copy = siteCopy[locale].readingNotesIndex;
  const card = getLocalizedContentCard(locale, "reading-notes/twelve-hours-sleep");

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      <h1 className="text-3xl font-bold text-stone-900 mb-2">{copy.heading}</h1>
      <p className="text-stone-500 mb-8">{copy.intro}</p>
      <div className="grid gap-6">
        <ContentCard {...card} />
      </div>
    </div>
  );
}

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
