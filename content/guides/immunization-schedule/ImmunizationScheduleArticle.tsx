"use client";

import { startTransition, useState } from "react";
import { Newsreader, Source_Sans_3 } from "next/font/google";
import { AudioPlayer } from "@/components/AudioPlayer";
import { GiscusComments } from "@/components/GiscusComments";
import {
  STATUS_LABELS,
  milestones,
  pageCopy,
  references,
  vaccineItems,
  type AapCdcStatus,
  type ArticleLocale,
  type LocalizedText,
  type VaccineItem,
} from "@/content/guides/immunization-schedule/vaccineData";

const colors = {
  bg: "#F0F5FA",
  card: "#FFFFFF",
  accent: "#2B6CB0",
  accentLight: "#E8F0FE",
  navy: "#1A365D",
  teal: "#2C8C7C",
  tealLight: "#E0F5F0",
  green: "#2F855A",
  greenLight: "#E6F4EC",
  amber: "#C07D2B",
  amberLight: "#FDF0DB",
  rose: "#C53030",
  roseLight: "#FDE8E8",
  indigo: "#4C51BF",
  indigoLight: "#EBF0FF",
  gold: "#B7791F",
  goldLight: "#FEFCBF",
  text: "#1A365D",
  textLight: "#4A6785",
  border: "#D2DEE8",
  shadow: "0 18px 42px rgba(26, 54, 93, 0.08)",
};

const newsreader = Newsreader({
  subsets: ["latin"],
  weight: ["500", "700"],
});

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

const articleStyles = `
.immune-shell {
  min-height: 100vh;
}

.immune-max {
  max-width: 1120px;
  margin: 0 auto;
  padding: 0 24px;
}

.immune-hero-grid {
  display: grid;
  gap: 28px;
  grid-template-columns: minmax(0, 1.2fr) minmax(320px, 0.8fr);
  align-items: end;
}

.immune-stats {
  display: grid;
  gap: 14px;
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.immune-tab-strip {
  display: flex;
  gap: 0;
  overflow-x: auto;
  scrollbar-width: none;
}

.immune-tab-strip::-webkit-scrollbar {
  display: none;
}

.immune-overview-grid,
.immune-split-grid,
.immune-summary-grid,
.immune-bottom-grid {
  display: grid;
  gap: 20px;
}

.immune-overview-grid {
  grid-template-columns: minmax(0, 1.1fr) minmax(280px, 0.9fr);
}

.immune-split-grid {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.immune-summary-grid {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.immune-bottom-grid {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.immune-timeline-desktop {
  display: block;
}

.immune-timeline-mobile {
  display: none;
}

.immune-timeline-scroll {
  overflow-x: auto;
  padding-bottom: 12px;
}

.immune-timeline-track {
  display: flex;
  gap: 18px;
  min-width: 1580px;
  position: relative;
  padding: 28px 8px 8px;
}

.immune-timeline-track::before {
  content: "";
  position: absolute;
  left: 16px;
  right: 16px;
  top: 38px;
  height: 2px;
  background: linear-gradient(90deg, rgba(43, 108, 176, 0.18), rgba(44, 140, 124, 0.26), rgba(183, 121, 31, 0.24));
}

.immune-milestone {
  width: 184px;
  flex-shrink: 0;
  position: relative;
}

.immune-pill-stack {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 14px;
}

.immune-timeline-card-grid {
  display: grid;
  gap: 16px;
  grid-template-columns: minmax(120px, 160px) minmax(0, 1fr);
}

.immune-matrix {
  width: 100%;
  border-collapse: collapse;
  min-width: 760px;
}

.immune-matrix th,
.immune-matrix td {
  padding: 16px;
  text-align: left;
  vertical-align: top;
  border-bottom: 1px solid ${colors.border};
}

.immune-matrix thead th {
  color: ${colors.navy};
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  background: ${colors.accentLight};
}

.immune-card-copy p:last-child,
.immune-card-copy ul:last-child {
  margin-bottom: 0;
}

@media (max-width: 1024px) {
  .immune-hero-grid,
  .immune-overview-grid,
  .immune-bottom-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 820px) {
  .immune-split-grid,
  .immune-summary-grid,
  .immune-stats {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 720px) {
  .immune-max {
    padding: 0 18px;
  }

  .immune-timeline-card-grid {
    grid-template-columns: 1fr;
  }

  .immune-timeline-desktop {
    display: none;
  }

  .immune-timeline-mobile {
    display: block;
  }
}
`;

const vaccineLookup = new Map(vaccineItems.map((item) => [item.key, item]));
const tabKeys = {
  infant: ["hbv", "rotavirus", "pcv", "dtap-ipv-hib", "rsv", "influenza", "covid"],
  toddler: ["mmr", "hav", "varicella", "mmrv", "quadracel"],
  adolescent: ["hpv", "tdap", "menacwy"],
} as const;

const tabFirstItem = {
  infant: "hbv",
  toddler: "mmr",
  adolescent: "hpv",
} as const;

type TabId = "overview" | "infant" | "toddler" | "adolescent" | "comparison";

function textFor(locale: ArticleLocale, value: LocalizedText) {
  return value[locale];
}

function toneFor(status: AapCdcStatus) {
  if (status === "consensus") {
    return {
      bg: colors.greenLight,
      border: colors.green,
      text: colors.green,
    };
  }

  if (status === "protocol-diff") {
    return {
      bg: colors.indigoLight,
      border: colors.indigo,
      text: colors.indigo,
    };
  }

  return {
    bg: colors.amberLight,
    border: colors.amber,
    text: colors.amber,
  };
}

function Section({
  children,
  id,
}: {
  children: React.ReactNode;
  id?: string;
}) {
  return (
    <section id={id} style={{ padding: "36px 0 0" }}>
      <div className="immune-max">{children}</div>
    </section>
  );
}

function SectionTitle({
  eyebrow,
  subtitle,
  title,
}: {
  eyebrow?: string;
  subtitle?: string;
  title: string;
}) {
  return (
    <div style={{ marginBottom: 24 }}>
      {eyebrow ? (
        <div
          style={{
            color: colors.accent,
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            marginBottom: 10,
          }}
        >
          {eyebrow}
        </div>
      ) : null}
      <h2
        style={{
          color: colors.navy,
          fontFamily: newsreader.style.fontFamily,
          fontSize: 34,
          fontWeight: 700,
          lineHeight: 1.08,
          margin: 0,
        }}
      >
        {title}
      </h2>
      {subtitle ? (
        <p
          style={{
            color: colors.textLight,
            fontSize: 16,
            lineHeight: 1.7,
            margin: "12px 0 0",
            maxWidth: 780,
          }}
        >
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}

function Card({
  accent,
  children,
  style,
}: {
  accent?: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
}) {
  return (
    <div
      style={{
        background: colors.card,
        border: `1px solid ${colors.border}`,
        borderLeft: accent ? `4px solid ${accent}` : `1px solid ${colors.border}`,
        borderRadius: 22,
        boxShadow: colors.shadow,
        padding: 24,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function StatBox({
  color,
  label,
  value,
}: {
  color: string;
  label: string;
  value: string;
}) {
  return (
    <div
      style={{
        background: "rgba(255,255,255,0.08)",
        border: "1px solid rgba(255,255,255,0.12)",
        borderRadius: 18,
        padding: "18px 20px",
        backdropFilter: "blur(8px)",
      }}
    >
      <div
        style={{
          color,
          fontFamily: newsreader.style.fontFamily,
          fontSize: 34,
          fontWeight: 700,
          lineHeight: 1,
        }}
      >
        {value}
      </div>
      <div
        style={{
          color: "rgba(255,255,255,0.72)",
          fontSize: 12,
          fontWeight: 600,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          marginTop: 8,
        }}
      >
        {label}
      </div>
    </div>
  );
}

function StatusPill({
  locale,
  status,
}: {
  locale: ArticleLocale;
  status: AapCdcStatus;
}) {
  const tone = toneFor(status);

  return (
    <span
      style={{
        alignItems: "center",
        background: tone.bg,
        border: `1px solid ${tone.border}40`,
        borderRadius: 999,
        color: tone.text,
        display: "inline-flex",
        fontSize: 12,
        fontWeight: 700,
        gap: 8,
        letterSpacing: "0.04em",
        padding: "7px 12px",
        textTransform: "uppercase",
      }}
    >
      <span
        style={{
          background: tone.text,
          borderRadius: "50%",
          display: "inline-block",
          height: 8,
          width: 8,
        }}
      />
      {textFor(locale, STATUS_LABELS[status])}
    </span>
  );
}

function ComparisonBlock({
  item,
  locale,
  copy,
}: {
  item: VaccineItem;
  locale: ArticleLocale;
  copy: (typeof pageCopy)[ArticleLocale];
}) {
  const cdcTone = toneFor(item.status);

  return (
    <div
      className="immune-split-grid"
      style={{ marginTop: 20 }}
    >
      <Card
        accent={colors.green}
        style={{ background: colors.greenLight, boxShadow: "none" }}
      >
        <div
          style={{
            color: colors.green,
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: "0.12em",
            marginBottom: 12,
            textTransform: "uppercase",
          }}
        >
          {copy.comparisonHeaders.aap}
        </div>
        <ul
          style={{
            color: colors.text,
            lineHeight: 1.7,
            margin: 0,
            paddingInlineStart: 18,
          }}
        >
          {item.comparison.aap.map((entry, index) => (
            <li key={index} style={{ marginBottom: 10 }}>
              {textFor(locale, entry)}
            </li>
          ))}
        </ul>
      </Card>

      <Card
        accent={cdcTone.border}
        style={{ background: cdcTone.bg, boxShadow: "none" }}
      >
        <div
          style={{
            color: cdcTone.text,
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: "0.12em",
            marginBottom: 12,
            textTransform: "uppercase",
          }}
        >
          {copy.comparisonHeaders.cdc}
        </div>
        <ul
          style={{
            color: colors.text,
            lineHeight: 1.7,
            margin: 0,
            paddingInlineStart: 18,
          }}
        >
          {item.comparison.cdc.map((entry, index) => (
            <li key={index} style={{ marginBottom: 10 }}>
              {textFor(locale, entry)}
            </li>
          ))}
        </ul>
        {item.comparison.cdcNote ? (
          <p
            style={{
              borderTop: `1px solid ${cdcTone.border}30`,
              color: colors.textLight,
              fontSize: 14,
              lineHeight: 1.7,
              margin: "14px 0 0",
              paddingTop: 14,
            }}
          >
            {textFor(locale, item.comparison.cdcNote)}
          </p>
        ) : null}
      </Card>
    </div>
  );
}

function VaccineCard({
  copy,
  expanded,
  item,
  locale,
  onToggle,
}: {
  copy: (typeof pageCopy)[ArticleLocale];
  expanded: boolean;
  item: VaccineItem;
  locale: ArticleLocale;
  onToggle: () => void;
}) {
  const tone = toneFor(item.status);

  return (
    <Card
      accent={tone.border}
      style={{
        marginBottom: 18,
        padding: 0,
        overflow: "hidden",
      }}
    >
      <button
        onClick={onToggle}
        style={{
          background: "transparent",
          border: "none",
          cursor: "pointer",
          display: "block",
          padding: 0,
          textAlign: "left",
          width: "100%",
        }}
        type="button"
      >
        <div
          style={{
            alignItems: "flex-start",
            display: "flex",
            gap: 18,
            padding: 24,
          }}
        >
          <div
            style={{
              alignItems: "center",
              background: tone.bg,
              border: `1px solid ${tone.border}30`,
              borderRadius: 20,
              color: tone.text,
              display: "flex",
              flexShrink: 0,
              fontSize: 18,
              fontWeight: 700,
              gap: 10,
              justifyContent: "center",
              minWidth: 72,
              padding: "10px 12px",
            }}
          >
            <span>{item.icon}</span>
            <span>{item.id}</span>
          </div>

          <div style={{ flex: 1 }}>
            <div
              style={{
                alignItems: "center",
                display: "flex",
                flexWrap: "wrap",
                gap: 12,
                marginBottom: 10,
              }}
            >
              <StatusPill locale={locale} status={item.status} />
            </div>

            <h3
              style={{
                color: colors.navy,
                fontFamily: newsreader.style.fontFamily,
                fontSize: 28,
                fontWeight: 700,
                lineHeight: 1.05,
                margin: 0,
              }}
            >
              {textFor(locale, item.headline)}
            </h3>
            <div
              style={{
                color: colors.textLight,
                fontSize: 14,
                lineHeight: 1.5,
                marginTop: 8,
              }}
            >
              {textFor(locale, item.subheadline)}
            </div>

            <div
              style={{
                display: "grid",
                gap: 16,
                gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                marginTop: 18,
              }}
            >
              <div>
                <div
                  style={{
                    color: colors.accent,
                    fontSize: 12,
                    fontWeight: 700,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                  }}
                >
                  {copy.scheduleLabel}
                </div>
                <p
                  style={{
                    color: colors.text,
                    fontSize: 15,
                    lineHeight: 1.6,
                    margin: "8px 0 0",
                  }}
                >
                  {textFor(locale, item.scheduleSummary)}
                </p>
              </div>

              <div>
                <div
                  style={{
                    color: colors.accent,
                    fontSize: 12,
                    fontWeight: 700,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                  }}
                >
                  {copy.protectsLabel}
                </div>
                <p
                  style={{
                    color: colors.text,
                    fontSize: 15,
                    lineHeight: 1.6,
                    margin: "8px 0 0",
                  }}
                >
                  {textFor(locale, item.protectsAgainstSummary)}
                </p>
              </div>
            </div>

            <div
              style={{
                alignItems: "center",
                color: tone.text,
                display: "inline-flex",
                fontSize: 13,
                fontWeight: 700,
                gap: 8,
                letterSpacing: "0.08em",
                marginTop: 18,
                textTransform: "uppercase",
              }}
            >
              <span>{expanded ? "−" : "+"}</span>
              {expanded
                ? copy.detailsToggle.close
                : copy.detailsToggle.open}
            </div>
          </div>
        </div>
      </button>

      {expanded ? (
        <div
          style={{
            borderTop: `1px solid ${colors.border}`,
            padding: "0 24px 24px",
          }}
        >
          <div className="immune-card-copy">
            {item.detailBlocks.map((block) => (
              <div key={textFor(locale, block.title)} style={{ marginTop: 22 }}>
                <div
                  style={{
                    color: colors.navy,
                    fontFamily: newsreader.style.fontFamily,
                    fontSize: 22,
                    fontWeight: 700,
                    marginBottom: 10,
                  }}
                >
                  {textFor(locale, block.title)}
                </div>

                {block.paragraphs?.map((paragraph) => (
                  <p
                    key={textFor(locale, paragraph)}
                    style={{
                      color: colors.text,
                      fontSize: 15,
                      lineHeight: 1.8,
                      margin: "0 0 12px",
                    }}
                  >
                    {textFor(locale, paragraph)}
                  </p>
                ))}

                {block.bullets ? (
                  <ul
                    style={{
                      color: colors.text,
                      lineHeight: 1.8,
                      margin: 0,
                      paddingInlineStart: 20,
                    }}
                  >
                    {block.bullets.map((bullet) => (
                      <li
                        key={textFor(locale, bullet)}
                        style={{ marginBottom: 10 }}
                      >
                        {textFor(locale, bullet)}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            ))}
          </div>

          <ComparisonBlock item={item} locale={locale} copy={copy} />
        </div>
      ) : null}
    </Card>
  );
}

function VaccinePill({
  locale,
  vaccineKey,
}: {
  locale: ArticleLocale;
  vaccineKey: string;
}) {
  const item = vaccineLookup.get(vaccineKey);

  if (!item) {
    return null;
  }

  const tone = toneFor(item.status);

  return (
    <span
      style={{
        background: tone.bg,
        border: `1px solid ${tone.border}30`,
        borderRadius: 999,
        color: tone.text,
        display: "inline-flex",
        fontSize: 12,
        fontWeight: 700,
        lineHeight: 1,
        padding: "8px 10px",
      }}
    >
      {textFor(locale, item.headline)}
    </span>
  );
}

function ScheduleTimeline({
  locale,
}: {
  locale: ArticleLocale;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
      {milestones.map((milestone, index) => (
        <div
          key={milestone.id}
          style={{ display: "flex", gap: 16, alignItems: "stretch" }}
        >
          <div
            style={{
              alignItems: "center",
              display: "flex",
              flexDirection: "column",
              flexShrink: 0,
              width: 18,
            }}
          >
            <div
              style={{
                background: colors.accent,
                borderRadius: "50%",
                height: 14,
                marginTop: 16,
                width: 14,
              }}
            />
            {index < milestones.length - 1 ? (
              <div
                style={{
                  background: `${colors.accent}35`,
                  flex: 1,
                  marginTop: 6,
                  width: 2,
                }}
              />
            ) : null}
          </div>

          <Card style={{ boxShadow: "none", flex: 1, padding: 20 }}>
            <div className="immune-timeline-card-grid">
              <div>
                <div
                  style={{
                    color: colors.accent,
                    fontSize: 12,
                    fontWeight: 700,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                  }}
                >
                  {textFor(locale, milestone.ageLabel)}
                </div>
                <div
                  style={{
                    color: colors.navy,
                    fontFamily: newsreader.style.fontFamily,
                    fontSize: 24,
                    fontWeight: 700,
                    lineHeight: 1.1,
                    marginTop: 8,
                  }}
                >
                  {textFor(locale, milestone.shotsLabel)}
                </div>
              </div>

              <div>
                <div className="immune-pill-stack" style={{ marginTop: 0 }}>
                  {milestone.vaccineKeys.map((key) => (
                    <VaccinePill key={key} locale={locale} vaccineKey={key} />
                  ))}
                </div>
                {milestone.note ? (
                  <p
                    style={{
                      color: colors.textLight,
                      fontSize: 13,
                      lineHeight: 1.7,
                      margin: "12px 0 0",
                    }}
                  >
                    {textFor(locale, milestone.note)}
                  </p>
                ) : null}
              </div>
            </div>
          </Card>
        </div>
      ))}
    </div>
  );
}

export function ImmunizationScheduleArticle({
  locale,
}: {
  locale: ArticleLocale;
}) {
  const copy = pageCopy[locale];
  const [activeTab, setActiveTab] = useState<TabId>("overview");
  const [openCard, setOpenCard] = useState<string>("hbv");

  const tabLabelMap: Record<TabId, string> = {
    overview: copy.tabs.overview,
    infant: copy.tabs.infant,
    toddler: copy.tabs.toddler,
    adolescent: copy.tabs.adolescent,
    comparison: copy.tabs.comparison,
  };

  function handleTabChange(tab: TabId) {
    startTransition(() => {
      setActiveTab(tab);
      if (tab === "infant" || tab === "toddler" || tab === "adolescent") {
        setOpenCard(tabFirstItem[tab]);
      }
    });
  }

  return (
    <div
      className="immune-shell"
      style={{
        background:
          "radial-gradient(circle at top, rgba(43,108,176,0.1), transparent 28%), linear-gradient(180deg, #F7FAFC 0%, #F0F5FA 42%, #EDF3F8 100%)",
        color: colors.text,
        fontFamily: sourceSans.style.fontFamily,
      }}
    >
      <style>{articleStyles}</style>

      <section
        style={{
          background:
            "linear-gradient(135deg, #0F2747 0%, #183A67 52%, #1D4C84 100%)",
          color: "#FFFFFF",
          overflow: "hidden",
          padding: "56px 0 44px",
          position: "relative",
        }}
      >
        <div
          style={{
            background:
              "radial-gradient(circle at 18% 20%, rgba(255,255,255,0.14), transparent 22%), radial-gradient(circle at 82% 28%, rgba(255,255,255,0.1), transparent 18%), linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.06) 50%, transparent 100%)",
            inset: 0,
            position: "absolute",
          }}
        />
        <div className="immune-max" style={{ position: "relative" }}>
          <div className="immune-hero-grid">
            <div>
              <div
                style={{
                  color: "#8CC1FF",
                  fontSize: 12,
                  fontWeight: 700,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                }}
              >
                {copy.tag}
              </div>
              <h1
                style={{
                  fontFamily: newsreader.style.fontFamily,
                  fontSize: 52,
                  fontWeight: 700,
                  letterSpacing: "-0.03em",
                  lineHeight: 0.98,
                  margin: "14px 0 0",
                  maxWidth: 640,
                }}
              >
                {copy.title}
              </h1>
              <p
                style={{
                  color: "rgba(255,255,255,0.76)",
                  fontSize: 18,
                  lineHeight: 1.7,
                  margin: "18px 0 0",
                  maxWidth: 650,
                }}
              >
                {copy.description}
              </p>
              <p
                style={{
                  color: "#CDE3FF",
                  fontSize: 15,
                  lineHeight: 1.8,
                  margin: "20px 0 0",
                  maxWidth: 680,
                }}
              >
                {copy.heroIntro}
              </p>
              <div
                style={{
                  color: "rgba(255,255,255,0.62)",
                  fontSize: 13,
                  letterSpacing: "0.08em",
                  marginTop: 18,
                  textTransform: "uppercase",
                }}
              >
                {copy.updated}
              </div>
            </div>

            <div className="immune-stats">
              {copy.heroStats.map((stat, index) => (
                <StatBox
                  key={stat.label}
                  color={
                    [colors.gold, "#8CC1FF", "#6EE7D8", "#B9C4FF"][index] ??
                    colors.gold
                  }
                  label={stat.label}
                  value={stat.value}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="immune-max" style={{ marginTop: 22 }}>
        <AudioPlayer
          contentKey="guides/immunization-schedule"
          locale={locale}
        />
      </div>

      <div
        style={{
          backdropFilter: "blur(12px)",
          background: "rgba(240, 245, 250, 0.9)",
          borderBottom: `1px solid ${colors.border}`,
          position: "sticky",
          top: 0,
          zIndex: 20,
        }}
      >
        <div className="immune-max">
          <div className="immune-tab-strip">
            {(Object.keys(tabLabelMap) as TabId[]).map((tab) => (
              <button
                key={tab}
                onClick={() => handleTabChange(tab)}
                style={{
                  background: "transparent",
                  border: "none",
                  borderBottom:
                    activeTab === tab
                      ? `3px solid ${colors.accent}`
                      : "3px solid transparent",
                  color:
                    activeTab === tab ? colors.accent : colors.textLight,
                  cursor: "pointer",
                  fontFamily: sourceSans.style.fontFamily,
                  fontSize: 14,
                  fontWeight: activeTab === tab ? 700 : 600,
                  padding: "16px 18px 14px",
                  whiteSpace: "nowrap",
                }}
                type="button"
              >
                {tabLabelMap[tab]}
              </button>
            ))}
          </div>
        </div>
      </div>

      {activeTab === "overview" ? (
        <>
          <Section id="overview">
            <SectionTitle
              eyebrow={copy.sections.overview.title}
              subtitle={copy.sections.overview.subtitle}
              title={copy.tabs.overview}
            />
            <div className="immune-overview-grid">
              <Card accent={colors.accent}>
                <div
                  style={{
                    color: colors.accent,
                    fontSize: 12,
                    fontWeight: 700,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    marginBottom: 10,
                  }}
                >
                  {copy.backgroundTitle}
                </div>
                {copy.backgroundParagraphs.map((paragraph) => (
                  <p
                    key={paragraph}
                    style={{
                      color: colors.text,
                      fontSize: 15,
                      lineHeight: 1.8,
                      margin: "0 0 14px",
                    }}
                  >
                    {paragraph}
                  </p>
                ))}
              </Card>

              <Card accent={colors.teal}>
                <div
                  style={{
                    color: colors.teal,
                    fontSize: 12,
                    fontWeight: 700,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    marginBottom: 10,
                  }}
                >
                  {copy.legendTitle}
                </div>
                <p
                  style={{
                    color: colors.textLight,
                    fontSize: 15,
                    lineHeight: 1.7,
                    margin: "0 0 18px",
                  }}
                >
                  {copy.legendIntro}
                </p>
                {(
                  ["consensus", "conditional", "protocol-diff"] as AapCdcStatus[]
                ).map((status) => (
                  <div key={status} style={{ marginBottom: 16 }}>
                    <StatusPill locale={locale} status={status} />
                    <p
                      style={{
                        color: colors.textLight,
                        fontSize: 14,
                        lineHeight: 1.7,
                        margin: "10px 0 0",
                      }}
                    >
                      {copy.statusDescriptions[status]}
                    </p>
                  </div>
                ))}
              </Card>
            </div>
          </Section>

          <Section>
            <Card accent={colors.navy}>
              <ScheduleTimeline locale={locale} />
            </Card>
          </Section>

          <Section>
            <div className="immune-bottom-grid">
              <Card accent={colors.indigo}>
                <div
                  style={{
                    color: colors.indigo,
                    fontSize: 12,
                    fontWeight: 700,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    marginBottom: 10,
                  }}
                >
                  {copy.covidSupplementTitle}
                </div>
                <p
                  style={{
                    color: colors.text,
                    fontSize: 15,
                    lineHeight: 1.8,
                    margin: 0,
                  }}
                >
                  {copy.covidSupplementBody}
                </p>
              </Card>

              <Card accent={colors.gold}>
                <div
                  style={{
                    color: colors.gold,
                    fontSize: 12,
                    fontWeight: 700,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    marginBottom: 10,
                  }}
                >
                  {copy.seasonalNoteTitle}
                </div>
                <p
                  style={{
                    color: colors.text,
                    fontSize: 15,
                    lineHeight: 1.8,
                    margin: 0,
                  }}
                >
                  {copy.seasonalNoteBody}
                </p>
              </Card>
            </div>
          </Section>

          <Section>
            <Card accent={colors.rose}>
              <div
                style={{
                  color: colors.rose,
                  fontSize: 12,
                  fontWeight: 700,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  marginBottom: 10,
                }}
              >
                {copy.askCardTitle}
              </div>
              <blockquote
                style={{
                  borderLeft: `4px solid ${colors.rose}`,
                  color: colors.navy,
                  fontFamily: newsreader.style.fontFamily,
                  fontSize: 28,
                  lineHeight: 1.25,
                  margin: 0,
                  paddingLeft: 18,
                }}
              >
                {copy.askCardQuote}
              </blockquote>
              <p
                style={{
                  color: colors.text,
                  fontSize: 15,
                  lineHeight: 1.8,
                  margin: "16px 0 0",
                }}
              >
                {copy.askCardBody}
              </p>
            </Card>
          </Section>
        </>
      ) : null}

      {activeTab === "infant" ? (
        <Section id="infant">
          <SectionTitle
            eyebrow={copy.sections.infant.subtitle}
            subtitle={copy.sections.infant.intro}
            title={copy.sections.infant.title}
          />
          {tabKeys.infant.map((key) => {
            const item = vaccineLookup.get(key);
            if (!item) return null;

            return (
              <VaccineCard
                key={item.key}
                copy={copy}
                expanded={openCard === item.key}
                item={item}
                locale={locale}
                onToggle={() =>
                  setOpenCard((current) =>
                    current === item.key ? "" : item.key,
                  )
                }
              />
            );
          })}
        </Section>
      ) : null}

      {activeTab === "toddler" ? (
        <Section id="toddler">
          <SectionTitle
            eyebrow={copy.sections.toddler.subtitle}
            subtitle={copy.sections.toddler.intro}
            title={copy.sections.toddler.title}
          />
          {tabKeys.toddler.map((key) => {
            const item = vaccineLookup.get(key);
            if (!item) return null;

            return (
              <VaccineCard
                key={item.key}
                copy={copy}
                expanded={openCard === item.key}
                item={item}
                locale={locale}
                onToggle={() =>
                  setOpenCard((current) =>
                    current === item.key ? "" : item.key,
                  )
                }
              />
            );
          })}
        </Section>
      ) : null}

      {activeTab === "adolescent" ? (
        <Section id="adolescent">
          <SectionTitle
            eyebrow={copy.sections.adolescent.subtitle}
            subtitle={copy.sections.adolescent.intro}
            title={copy.sections.adolescent.title}
          />
          {tabKeys.adolescent.map((key) => {
            const item = vaccineLookup.get(key);
            if (!item) return null;

            return (
              <VaccineCard
                key={item.key}
                copy={copy}
                expanded={openCard === item.key}
                item={item}
                locale={locale}
                onToggle={() =>
                  setOpenCard((current) =>
                    current === item.key ? "" : item.key,
                  )
                }
              />
            );
          })}
        </Section>
      ) : null}

      {activeTab === "comparison" ? (
        <>
          <Section id="comparison">
            <SectionTitle
              eyebrow={copy.sections.comparison.subtitle}
              subtitle={copy.sections.comparison.intro}
              title={copy.sections.comparison.title}
            />
            <Card accent={colors.accent}>
              <div style={{ overflowX: "auto" }}>
                <table className="immune-matrix">
                  <thead>
                    <tr>
                      <th>{copy.comparisonHeaders.matrixItem}</th>
                      <th>{copy.comparisonHeaders.matrixAap}</th>
                      <th>{copy.comparisonHeaders.matrixCdc}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {vaccineItems.map((item) => (
                      <tr key={item.key}>
                        <td>
                          <div
                            style={{
                              alignItems: "center",
                              display: "flex",
                              gap: 12,
                            }}
                          >
                            <div
                              style={{
                                background: toneFor(item.status).bg,
                                border: `1px solid ${toneFor(item.status).border}30`,
                                borderRadius: 14,
                                display: "flex",
                                fontSize: 20,
                                height: 42,
                                justifyContent: "center",
                                lineHeight: "42px",
                                width: 42,
                              }}
                            >
                              {item.icon}
                            </div>
                            <div>
                              <div
                                style={{
                                  color: colors.navy,
                                  fontSize: 16,
                                  fontWeight: 700,
                                }}
                              >
                                {textFor(locale, item.headline)}
                              </div>
                              <div
                                style={{
                                  color: colors.textLight,
                                  fontSize: 13,
                                  lineHeight: 1.6,
                                  marginTop: 4,
                                }}
                              >
                                {textFor(locale, item.scheduleSummary)}
                              </div>
                              <div style={{ marginTop: 8 }}>
                                <StatusPill locale={locale} status={item.status} />
                              </div>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div
                            style={{
                              color: colors.text,
                              fontSize: 14,
                              lineHeight: 1.8,
                            }}
                          >
                            {textFor(locale, item.aapShort)}
                          </div>
                        </td>
                        <td>
                          <div
                            style={{
                              color: colors.text,
                              fontSize: 14,
                              lineHeight: 1.8,
                            }}
                          >
                            {textFor(locale, item.cdcShort)}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </Section>

          <Section>
            <div className="immune-summary-grid">
              <Card accent={colors.green}>
                <div
                  style={{
                    color: colors.green,
                    fontSize: 12,
                    fontWeight: 700,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    marginBottom: 12,
                  }}
                >
                  {copy.summaryCards.bothTitle}
                </div>
                <ul
                  style={{
                    color: colors.text,
                    lineHeight: 1.8,
                    margin: 0,
                    paddingInlineStart: 18,
                  }}
                >
                  {copy.summaryCards.bothItems.map((entry) => (
                    <li key={entry}>{entry}</li>
                  ))}
                </ul>
              </Card>

              <Card accent={colors.amber}>
                <div
                  style={{
                    color: colors.amber,
                    fontSize: 12,
                    fontWeight: 700,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    marginBottom: 12,
                  }}
                >
                  {copy.summaryCards.divergeTitle}
                </div>
                <ul
                  style={{
                    color: colors.text,
                    lineHeight: 1.8,
                    margin: 0,
                    paddingInlineStart: 18,
                  }}
                >
                  {copy.summaryCards.divergeItems.map((entry) => (
                    <li key={entry}>{entry}</li>
                  ))}
                </ul>
              </Card>
            </div>
            <p
              style={{
                color: colors.textLight,
                fontSize: 14,
                lineHeight: 1.8,
                margin: "18px 0 0",
              }}
            >
              {copy.comparisonNote}
            </p>
            <p
              style={{
                color: colors.textLight,
                fontSize: 14,
                lineHeight: 1.8,
                margin: "10px 0 0",
              }}
            >
              {copy.summaryCards.note}
            </p>
          </Section>

          <Section>
            <div className="immune-bottom-grid">
              <Card accent={colors.indigo}>
                <div
                  style={{
                    color: colors.indigo,
                    fontSize: 12,
                    fontWeight: 700,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    marginBottom: 12,
                  }}
                >
                  {copy.productChangesTitle}
                </div>
                <ul
                  style={{
                    color: colors.text,
                    lineHeight: 1.8,
                    margin: 0,
                    paddingInlineStart: 18,
                  }}
                >
                  {copy.productChanges.map((entry) => (
                    <li key={entry} style={{ marginBottom: 10 }}>
                      {entry}
                    </li>
                  ))}
                </ul>
              </Card>

              <Card accent={colors.gold}>
                <div
                  style={{
                    color: colors.gold,
                    fontSize: 12,
                    fontWeight: 700,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    marginBottom: 12,
                  }}
                >
                  {copy.insuranceTitle}
                </div>
                {copy.insuranceParagraphs.map((paragraph) => (
                  <p
                    key={paragraph}
                    style={{
                      color: colors.text,
                      fontSize: 15,
                      lineHeight: 1.8,
                      margin: "0 0 14px",
                    }}
                  >
                    {paragraph}
                  </p>
                ))}
              </Card>
            </div>
          </Section>

          <Section>
            <Card accent={colors.rose}>
              <div
                style={{
                  color: colors.rose,
                  fontSize: 12,
                  fontWeight: 700,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  marginBottom: 10,
                }}
              >
                {copy.askCardTitle}
              </div>
              <blockquote
                style={{
                  borderLeft: `4px solid ${colors.rose}`,
                  color: colors.navy,
                  fontFamily: newsreader.style.fontFamily,
                  fontSize: 28,
                  lineHeight: 1.25,
                  margin: 0,
                  paddingLeft: 18,
                }}
              >
                {copy.askCardQuote}
              </blockquote>
              <p
                style={{
                  color: colors.text,
                  fontSize: 15,
                  lineHeight: 1.8,
                  margin: "16px 0 0",
                }}
              >
                {copy.askCardBody}
              </p>
            </Card>
          </Section>

          <Section>
            <Card accent={colors.accent}>
              <div
                style={{
                  color: colors.accent,
                  fontSize: 12,
                  fontWeight: 700,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  marginBottom: 16,
                }}
              >
                {copy.referencesTitle}
              </div>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 12,
                }}
              >
                {references.map((reference) => (
                  <a
                    key={reference.url}
                    href={reference.url}
                    rel="noopener noreferrer"
                    target="_blank"
                    style={{
                      background: colors.accentLight,
                      border: `1px solid ${colors.accent}22`,
                      borderRadius: 999,
                      color: colors.accent,
                      display: "inline-flex",
                      fontSize: 13,
                      fontWeight: 700,
                      gap: 8,
                      padding: "10px 14px",
                      textDecoration: "none",
                    }}
                  >
                    <span>{textFor(locale, reference.name)}</span>
                    <span>↗</span>
                  </a>
                ))}
              </div>
              <p
                style={{
                  color: colors.textLight,
                  fontSize: 14,
                  lineHeight: 1.8,
                  margin: "18px 0 0",
                }}
              >
                {copy.disclaimer}
              </p>
            </Card>
          </Section>
        </>
      ) : null}

      <div className="immune-max" style={{ paddingBottom: 56, paddingTop: 40 }}>
        <GiscusComments
          locale={locale}
          term="/guides/immunization-schedule"
        />
      </div>
    </div>
  );
}
