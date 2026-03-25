"use client";

import { useState } from "react";
import { AudioPlayer } from "@/components/AudioPlayer";
import { Callout } from "@/components/Callout";
import { GiscusComments } from "@/components/GiscusComments";

const colors = {
  bg: "#F4F9F9",
  card: "#FFFFFF",
  accent: "#2D8E8E",
  accentLight: "#E3F2F0",
  indigo: "#3B6B8A",
  indigoLight: "#E6EFF5",
  navy: "#1C3D4D",
  gold: "#C9903D",
  goldLight: "#FAF0DE",
  teal: "#3AA08C",
  tealLight: "#E4F5F0",
  green: "#4C9A6E",
  greenLight: "#E8F5EB",
  rose: "#C75B5B",
  roseLight: "#FCEEED",
  text: "#1C3D4D",
  textLight: "#5A7282",
  border: "#D4E4E4",
};

const Section = ({ children, bg, id }: { children: React.ReactNode; bg?: string; id?: string }) => (
  <div id={id} style={{ background: bg || "transparent", padding: "48px 0" }}>
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 24px" }}>{children}</div>
  </div>
);

const SectionTitle = ({ children, sub, color }: { children: React.ReactNode; sub?: string; color?: string }) => (
  <div style={{ marginBottom: 32 }}>
    <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 32, fontWeight: 700, color: color || colors.navy, margin: 0, lineHeight: 1.2 }}>{children}</h2>
    {sub && <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 17, color: colors.textLight, marginTop: 8, lineHeight: 1.6 }}>{sub}</p>}
  </div>
);

const Card = ({ children, accent, style }: { children: React.ReactNode; accent?: string; style?: React.CSSProperties }) => (
  <div style={{ background: colors.card, borderRadius: 16, padding: 28, border: `1px solid ${colors.border}`, borderLeft: accent ? `4px solid ${accent}` : undefined, marginBottom: 20, boxShadow: "0 2px 12px rgba(28,61,77,0.04)", ...style }}>{children}</div>
);

const Badge = ({ children, color, bg }: { children: React.ReactNode; color: string; bg: string }) => (
  <span style={{ display: "inline-block", background: bg, color, fontFamily: "'Source Sans 3', sans-serif", fontSize: 12, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", padding: "4px 12px", borderRadius: 20, marginBottom: 8 }}>{children}</span>
);

const SCard = ({ num, title, subtitle, color, bg, icon, details, isOpen, toggle }: { num: string; title: string; subtitle: string; color: string; bg: string; icon: string; details: React.ReactNode; isOpen: boolean; toggle: () => void }) => (
  <div onClick={toggle} style={{ background: bg, borderRadius: 16, padding: 24, cursor: "pointer", border: `2px solid ${isOpen ? color : "transparent"}`, transition: "all 0.2s", marginBottom: 16 }}>
    <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
      <div style={{ width: 52, height: 52, borderRadius: "50%", background: color, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontFamily: "'Playfair Display', Georgia, serif", fontSize: 22, fontWeight: 700, flexShrink: 0 }}>{num}</div>
      <div style={{ flex: 1 }}>
        <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 20, fontWeight: 700, color: colors.navy }}>{icon} {title}</div>
        <div style={{ fontSize: 14, color: colors.textLight, marginTop: 4 }}>{subtitle}</div>
      </div>
      <div style={{ fontSize: 20, color: colors.textLight, transition: "transform 0.2s", transform: isOpen ? "rotate(180deg)" : "rotate(0)" }}>&#9660;</div>
    </div>
    {isOpen && (
      <div onClick={(e) => e.stopPropagation()} style={{ marginTop: 20, paddingTop: 20, borderTop: `1px solid ${color}30`, fontSize: 15, lineHeight: 1.7, color: colors.text }}>
        {details}
      </div>
    )}
  </div>
);

const FlowArrow = () => (
  <div style={{ display: "flex", justifyContent: "center", padding: "4px 0" }}>
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M12 4v16m0 0l-6-6m6 6l6-6" stroke={colors.textLight} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
  </div>
);

const FlowBox = ({ children, color, bg }: { children: React.ReactNode; color: string; bg: string }) => (
  <div style={{ background: bg, borderLeft: `4px solid ${color}`, borderRadius: "0 12px 12px 0", padding: "16px 20px", fontSize: 15, lineHeight: 1.6 }}>{children}</div>
);

const StatBox = ({ num, label, color }: { num: string; label: string; color: string }) => (
  <div style={{ textAlign: "center" }}>
    <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 28, fontWeight: 800, color }}>{num}</div>
    <div style={{ fontSize: 12, color: "rgba(255,255,255,0.6)", marginTop: 4, textTransform: "uppercase", letterSpacing: 1 }}>{label}</div>
  </div>
);

const CheckItem = ({ children }: { children: React.ReactNode }) => (
  <div style={{ display: "flex", gap: 12, alignItems: "flex-start", marginBottom: 10 }}>
    <div style={{ width: 22, height: 22, borderRadius: "50%", background: colors.green, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
    </div>
    <div style={{ fontSize: 15, lineHeight: 1.6, color: colors.text }}>{children}</div>
  </div>
);

const OpenCheckItem = ({ children }: { children: React.ReactNode }) => (
  <div style={{ display: "flex", gap: 12, alignItems: "flex-start", marginBottom: 10 }}>
    <div style={{ width: 22, height: 22, borderRadius: "50%", border: `2px solid ${colors.accent}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }} />
    <div style={{ fontSize: 15, lineHeight: 1.6, color: colors.text }}>{children}</div>
  </div>
);

const TimelineItem = ({ age, title, desc, color }: { age: string; title: string; desc: string; color: string }) => (
  <div style={{ display: "flex", gap: 20, marginBottom: 24 }}>
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div style={{ width: 52, height: 52, borderRadius: "50%", background: `${color}20`, border: `2px solid ${color}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color, textAlign: "center", lineHeight: 1.2 }}>{age}</div>
      <div style={{ width: 2, flex: 1, background: colors.border, marginTop: 8 }}></div>
    </div>
    <div style={{ flex: 1 }}>
      <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 17, fontWeight: 700, color: colors.navy }}>{title}</div>
      <p style={{ fontSize: 14, lineHeight: 1.7, color: colors.textLight, marginTop: 4 }}>{desc}</p>
    </div>
  </div>
);

const WarningStep = ({ num, title, desc, severity }: { num: number; title: string; desc: string; severity: number }) => {
  const opacity = 0.3 + severity * 0.14;
  return (
    <div style={{ display: "flex", gap: 16, alignItems: "flex-start", marginBottom: 16 }}>
      <div style={{ width: 40, height: 40, borderRadius: "50%", background: `rgba(199,91,91,${opacity})`, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, fontSize: 16, flexShrink: 0 }}>{num}</div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 16, fontWeight: 700, color: colors.navy }}>{title}</div>
        <p style={{ fontSize: 14, lineHeight: 1.6, color: colors.textLight, marginTop: 2, marginBottom: 0 }}>{desc}</p>
      </div>
    </div>
  );
};

export default function MilkSuppressionBottleFeedingZh() {
  const [openS, setOpenS] = useState(0);
  const [activeTab, setActiveTab] = useState("biology");

  const tabs = [
    { id: "biology", label: "生物机制" },
    { id: "protocol", label: "回奶方案" },
    { id: "timeline", label: "时间线与危险信号" },
    { id: "bottles", label: "瓶喂优化" },
    { id: "action", label: "行动清单" },
  ];

  return (
    <div style={{ background: colors.bg, fontFamily: "'Source Sans 3', sans-serif", color: colors.text, minHeight: "100vh" }}>
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700;800&family=Source+Sans+3:wght@300;400;600;700&display=swap" rel="stylesheet" />

      {/* HERO */}
      <div style={{ background: `linear-gradient(135deg, ${colors.navy} 0%, #14303d 100%)`, padding: "56px 24px 48px", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, opacity: 0.06, background: "repeating-linear-gradient(45deg, transparent, transparent 30px, rgba(255,255,255,0.1) 30px, rgba(255,255,255,0.1) 60px)" }}></div>
        <div style={{ position: "relative", maxWidth: 720, margin: "0 auto" }}>
          <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", color: colors.accent, marginBottom: 16 }}>指南</div>
          <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 40, fontWeight: 800, color: "#fff", margin: 0, lineHeight: 1.15 }}>回奶与瓶喂优化</h1>
          <p style={{ fontSize: 17, color: "rgba(255,255,255,0.7)", marginTop: 12, lineHeight: 1.5 }}>产后第12天泌乳咨询中的循证指导——IBCLC 泌乳咨询师</p>
          <div style={{ display: "flex", justifyContent: "center", gap: 32, marginTop: 32, flexWrap: "wrap" }}>
            <StatBox num="第12天" label="产后" color={colors.gold} />
            <StatBox num="~700 mL" label="每日奶量" color={colors.accent} />
            <StatBox num="7-8 分钟" label="每盎司" color={colors.teal} />
            <StatBox num="15 分钟" label="每瓶 2 oz" color={colors.indigo} />
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "16px 24px 0" }}>
        <AudioPlayer locale="zh" contentKey="guides/milk-suppression-bottle-feeding" />
      </div>

      {/* CONTEXT CALLOUT */}
      <Section>
        <Card accent={colors.accent}>
          <Badge color={colors.accent} bg={colors.accentLight}>背景</Badge>
          <p style={{ fontSize: 15, lineHeight: 1.7, margin: "8px 0 0" }}>如果你选择了配方奶喂养，有一件事可能没人提前告诉你：<strong>妈妈的身体并不在意你的喂养计划。</strong>无论是否打算母乳喂养，泌乳都会如期启动，而且需要数周才能完全消退。</p>
          <p style={{ fontSize: 15, lineHeight: 1.7, margin: "12px 0 0" }}>本指南基于产后第12天的泌乳咨询。到那时，最严重的涨奶期已经过去，出现了几个硬块（堵奶），其中一侧乳房仍在少量分泌乳汁。咨询涵盖了如何安全回奶、需要警惕的危险信号，以及实用的瓶喂优化建议。</p>
        </Card>
      </Section>

      {/* NAV */}
      <div style={{ background: colors.card, borderBottom: `1px solid ${colors.border}`, position: "sticky", top: 0, zIndex: 100, boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "flex", gap: 0, overflowX: "auto", padding: "0 12px" }}>
          {tabs.map((t) => (
            <button key={t.id} onClick={() => setActiveTab(t.id)} style={{ background: "none", border: "none", padding: "14px 18px", fontFamily: "'Source Sans 3', sans-serif", fontSize: 14, fontWeight: activeTab === t.id ? 700 : 400, color: activeTab === t.id ? colors.accent : colors.textLight, borderBottom: activeTab === t.id ? `3px solid ${colors.accent}` : "3px solid transparent", cursor: "pointer", whiteSpace: "nowrap", transition: "all 0.15s" }}>{t.label}</button>
          ))}
        </div>
      </div>

      {/* ═══════════════════════ TAB 1 — 生物机制 ═══════════════════════ */}
      {activeTab === "biology" && (
        <>
          <Section>
            <SectionTitle sub="为什么不管你是否打算母乳喂养，泌乳都会启动——以及那个精妙的蛋白质如何帮你关闭它。">为什么不哺乳也会来奶</SectionTitle>

            <Card accent={colors.accent}>
              <Badge color={colors.accent} bg={colors.accentLight}>孕酮开关</Badge>
              <p style={{ fontSize: 15, lineHeight: 1.7, margin: "8px 0 0" }}>怀孕期间，高水平的<strong>孕酮（progesterone）</strong>会主动抑制泌乳。胎盘娩出、与子宫壁分离的瞬间，孕酮水平骤降。这个激素骤变就是信号——身体随即开始大量产奶。</p>
              <blockquote style={{ margin: "16px 0 0", padding: "12px 20px", background: colors.accentLight, borderLeft: `4px solid ${colors.accent}`, borderRadius: "0 8px 8px 0", fontSize: 14, lineHeight: 1.7, color: colors.navy }}>
                <strong>关键含义：</strong>你无法阻止这个过程。即使你从第一天起就确定要配方奶喂养，泌乳启动（lactogenesis）也是由胎盘娩出触发的，而非由哺乳行为触发。这是一个激素事件，不是行为事件。
              </blockquote>
              <div style={{ marginTop: 12 }}>
                <Badge color={colors.green} bg={colors.greenLight}>已验证</Badge>
                <p style={{ fontSize: 13, lineHeight: 1.6, color: colors.textLight, margin: "4px 0 0" }}>PubMed 及多部内分泌学文献证实：产后雌激素和孕酮的撤退使催乳素（prolactin）占据主导地位，启动乳汁分泌。这是公认的生殖生理学基础知识。</p>
              </div>
            </Card>
          </Section>

          <Section bg={colors.card}>
            <SectionTitle color={colors.accent} sub="咨询中的核心知识点——你的身体有一套内置的泌乳关闭反馈回路。">泌乳反馈抑制蛋白 (FIL)——身体自带的关停开关</SectionTitle>

            <p style={{ fontSize: 15, lineHeight: 1.7, marginBottom: 24 }}>有一种蛋白质叫做 <strong>FIL（Feedback Inhibitor of Lactation，泌乳反馈抑制蛋白）</strong>——一种天然存在于母乳中的乳清蛋白。它的工作机制如下：</p>

            <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
              <FlowBox color={colors.accent} bg={colors.accentLight}>🥛 <strong>乳房充盈</strong>——乳汁未被移出</FlowBox>
              <FlowArrow />
              <FlowBox color={colors.teal} bg={colors.tealLight}>🧬 <strong>FIL 积聚</strong>——滞留乳汁中 FIL 浓度升高</FlowBox>
              <FlowArrow />
              <FlowBox color={colors.indigo} bg={colors.indigoLight}>📡 <strong>局部信号传递</strong>——FIL 告诉乳腺泌乳细胞（lactocytes）：停止继续产奶</FlowBox>
              <FlowArrow />
              <FlowBox color={colors.gold} bg={colors.goldLight}>📉 <strong>产量下降</strong>——每侧乳房独立调节（自分泌机制）</FlowBox>
            </div>

            <Card style={{ marginTop: 24, background: colors.accentLight, border: `1px solid ${colors.accent}40` }}>
              <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 17, fontWeight: 700, color: colors.navy, marginBottom: 8 }}>核心策略看似反直觉</div>
              <p style={{ fontSize: 15, lineHeight: 1.7, margin: 0 }}><strong>让乳汁留在那里。</strong>不要泵出来，不要挤出来。滞留的乳汁 = 更多 FIL = 更强的抑制信号。这就是为什么&quot;什么都不做&quot;反而有效——你是在让身体自己的反馈回路完成工作。</p>
            </Card>

            <div style={{ marginTop: 20 }}>
              <Badge color={colors.green} bg={colors.greenLight}>已验证</Badge>
              <p style={{ fontSize: 13, lineHeight: 1.6, color: colors.textLight, margin: "4px 0 0" }}>FIL 由 Peaker &amp; Wilde (1996) 在 <em>Journal of Mammary Gland Biology and Neoplasia</em> 中鉴定和描述。NCBI Bookshelf 的母乳喂养生理学章节将其描述为一种多肽，&quot;当乳房充盈时，通过可逆地阻断乳汁合成和分泌来控制泌乳。&quot;该蛋白也被 ABM 临床方案 #36（2022年）及多部泌乳学教材引用。</p>
            </div>

            <Card style={{ marginTop: 20, background: colors.indigoLight, border: `1px solid ${colors.indigo}40` }}>
              <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 17, fontWeight: 700, color: colors.navy, marginBottom: 8 }}>两侧不对称回奶是正常的</div>
              <p style={{ fontSize: 15, lineHeight: 1.7, margin: 0 }}>FIL 正是两侧乳房可以一边停产、另一边继续的原因——它们独立调节。这种左右不对称非常常见；每侧乳房有自己独立的供需回路，乳管结构差异或两侧积奶量不同都可能导致一侧先消退。</p>
            </Card>
          </Section>
        </>
      )}

      {/* ═══════════════════════ TAB 2 — 回奶方案 ═══════════════════════ */}
      {activeTab === "protocol" && (
        <>
          <Section>
            <SectionTitle sub="咨询师给出的循证行动方案，帮助安全地关闭泌乳。">回奶方案</SectionTitle>

            <Card>
              <Badge color={colors.accent} bg={colors.accentLight}>应该做什么</Badge>
              <div style={{ overflowX: "auto", marginTop: 12 }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14, lineHeight: 1.6 }}>
                  <thead>
                    <tr style={{ background: colors.accentLight }}>
                      <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 700, color: colors.navy, borderBottom: `2px solid ${colors.accent}` }}>措施</th>
                      <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 700, color: colors.navy, borderBottom: `2px solid ${colors.accent}` }}>具体做法</th>
                      <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 700, color: colors.navy, borderBottom: `2px solid ${colors.accent}` }}>原理</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={{ borderBottom: `1px solid ${colors.border}` }}>
                      <td style={{ padding: "12px 16px", fontWeight: 600 }}>不做任何刺激</td>
                      <td style={{ padding: "12px 16px" }}>不吸奶、不挤奶、不刺激乳房</td>
                      <td style={{ padding: "12px 16px" }}>滞留乳汁 &#8594; FIL 积聚 &#8594; 泌乳关闭</td>
                    </tr>
                    <tr style={{ borderBottom: `1px solid ${colors.border}` }}>
                      <td style={{ padding: "12px 16px", fontWeight: 600 }}>穿支撑性内衣</td>
                      <td style={{ padding: "12px 16px" }}>全天候穿运动内衣，但不要过紧</td>
                      <td style={{ padding: "12px 16px" }}>适度支撑有帮助；过紧可能堵塞乳管</td>
                    </tr>
                    <tr style={{ borderBottom: `1px solid ${colors.border}` }}>
                      <td style={{ padding: "12px 16px", fontWeight: 600 }}>冰敷</td>
                      <td style={{ padding: "12px 16px" }}>每隔几小时敷一次，重点敷硬块处</td>
                      <td style={{ padding: "12px 16px" }}>减轻炎症（类似扭伤后冰敷的原理）</td>
                    </tr>
                    <tr style={{ borderBottom: `1px solid ${colors.border}` }}>
                      <td style={{ padding: "12px 16px", fontWeight: 600 }}>布洛芬</td>
                      <td style={{ padding: "12px 16px" }}>按说明书剂量服用，缓解疼痛和炎症</td>
                      <td style={{ padding: "12px 16px" }}>抗炎 + 止痛；直接对抗肿胀</td>
                    </tr>
                    <tr style={{ borderBottom: `1px solid ${colors.border}` }}>
                      <td style={{ padding: "12px 16px", fontWeight: 600 }}>轻柔按摩</td>
                      <td style={{ padding: "12px 16px" }}>非常轻柔的抚触，<strong>朝腋下方向</strong></td>
                      <td style={{ padding: "12px 16px" }}>促进淋巴引流；腋窝处淋巴结负责排出多余液体</td>
                    </tr>
                    <tr>
                      <td style={{ padding: "12px 16px", fontWeight: 600 }}>监测并发症</td>
                      <td style={{ padding: "12px 16px" }}>关注危险信号（见&quot;时间线与危险信号&quot;标签页）</td>
                      <td style={{ padding: "12px 16px" }}>早期发现乳腺炎至关重要</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </Card>
          </Section>

          <Section bg={colors.card}>
            <SectionTitle color={colors.accent} sub="&quot;什么都不做&quot;的策略是分阶段的——区分阶段很重要。">早期 vs. 后期回奶</SectionTitle>

            <SCard
              num="1"
              title="涨奶高峰期（第3-5天）"
              subtitle="缓解压力——但不要排空"
              color={colors.rose}
              bg={colors.roseLight}
              icon="🔥"
              isOpen={openS === 1}
              toggle={() => setOpenS(openS === 1 ? 0 : 1)}
              details={
                <div>
                  <p>乳房可能会胀痛发热、明显肿胀。在这个阶段，可以<strong>少量排出一些乳汁</strong>——只需排出足以缓解最严重胀痛的量。目标不是排空乳房，而是防止积奶过多导致堵奶或乳腺炎。</p>
                  <p style={{ marginTop: 12, fontStyle: "italic", color: colors.textLight }}>到第12天时，大多数妈妈已经过了这个阶段。</p>
                </div>
              }
            />
            <SCard
              num="2"
              title="涨奶高峰后（第5天起）"
              subtitle="放手不管——让 FIL 发挥作用"
              color={colors.teal}
              bg={colors.tealLight}
              icon="✋"
              isOpen={openS === 2}
              toggle={() => setOpenS(openS === 2 ? 0 : 2)}
              details={
                <div>
                  <p>当严重胀满感消退后，策略就是完全不碰剩余的乳汁。留在里面的乳汁会触发 FIL，逐步抑制进一步的产奶。</p>
                  <p style={{ marginTop: 12, fontWeight: 600 }}>不要把&quot;绝对不挤&quot;当作一刀切的规则——在最严重的时候，适当缓解反而是更安全的选择。</p>
                </div>
              }
            />
          </Section>

          <Section>
            <SectionTitle sub="这些常见错误可能适得其反——反而增加产量或引发并发症。">不应该做什么</SectionTitle>

            <Card accent={colors.rose}>
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14, lineHeight: 1.6 }}>
                  <thead>
                    <tr style={{ background: colors.roseLight }}>
                      <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 700, color: colors.navy, borderBottom: `2px solid ${colors.rose}` }}>禁忌</th>
                      <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 700, color: colors.navy, borderBottom: `2px solid ${colors.rose}` }}>原因</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={{ borderBottom: `1px solid ${colors.border}` }}>
                      <td style={{ padding: "12px 16px", fontWeight: 600 }}>不要吸奶或挤奶</td>
                      <td style={{ padding: "12px 16px" }}>排出 = 需求信号 = 产更多奶。这与你的目标完全相反。（涨奶高峰期除外——见上文的阶段区分。）</td>
                    </tr>
                    <tr style={{ borderBottom: `1px solid ${colors.border}` }}>
                      <td style={{ padding: "12px 16px", fontWeight: 600 }}>不要用力按摩或使用振动设备</td>
                      <td style={{ padding: "12px 16px" }}>用电动牙刷按摩敏感的乳房组织<strong>会加重炎症</strong>。这曾是热门建议，但现在已不再推荐。</td>
                    </tr>
                    <tr style={{ borderBottom: `1px solid ${colors.border}` }}>
                      <td style={{ padding: "12px 16px", fontWeight: 600 }}>不要穿有钢圈的内衣</td>
                      <td style={{ padding: "12px 16px" }}>钢圈会产生压力点，阻塞乳管，增加乳腺炎风险。</td>
                    </tr>
                    <tr>
                      <td style={{ padding: "12px 16px", fontWeight: 600 }}>不要限制饮水</td>
                      <td style={{ padding: "12px 16px" }}>对回奶无效，还有脱水风险。</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div style={{ marginTop: 16 }}>
                <Badge color={colors.green} bg={colors.greenLight}>已验证</Badge>
                <p style={{ fontSize: 13, lineHeight: 1.6, color: colors.textLight, margin: "4px 0 0" }}><strong>用力按摩：</strong>ABM 临床方案 #36（2022年修订版）明确不建议深度按摩。La Leche League GB、Nest Collaborative 和 Minnesota WIC 的最新指导一致确认：新方案是&quot;冰敷、冰敷、再冰敷&quot;——而不是&quot;按摩、按摩、再按摩&quot;。方案转变的原因是研究表明，暴力手法会加重组织炎症，甚至可能恶化乳管狭窄。</p>
                <p style={{ fontSize: 13, lineHeight: 1.6, color: colors.textLight, margin: "8px 0 0" }}><strong>内衣建议：</strong>HonorHealth 和 NHS 均指出，历史上曾使用束胸来回奶，但现在已不推荐，因为它可能导致堵奶和乳腺炎。当前的建议是穿支撑性（而非紧束的）内衣。</p>
              </div>
            </Card>
          </Section>

          <Section bg={colors.card}>
            <SectionTitle color={colors.accent} sub="方向很重要——轻柔地朝腋下方向抚触，而不是朝乳头方向。">按摩方向很重要</SectionTitle>

            <Card accent={colors.teal}>
              <p style={{ fontSize: 15, lineHeight: 1.7, margin: 0 }}>咨询师特别强调要<strong>朝腋下方向</strong>按摩，而不是朝乳头方向。这是因为腋窝（腋下）淋巴结是多余液体排出的通道。这与 La Leche League 目前推荐的<strong>淋巴引流按摩</strong>技术一致，也是 ABM 方案中提及的方法。</p>
              <p style={{ fontSize: 15, lineHeight: 1.7, margin: "12px 0 0", fontStyle: "italic", color: colors.textLight }}>把它想象成顺着毛撸猫——非常轻柔的、朝腋下方向的单向抚触，而不是像揉面团一样使劲。</p>
              <div style={{ marginTop: 12 }}>
                <Badge color={colors.green} bg={colors.greenLight}>已验证</Badge>
                <p style={{ fontSize: 13, lineHeight: 1.6, color: colors.textLight, margin: "4px 0 0" }}>La Leche League GB 明确建议&quot;朝腋下方向进行轻柔的淋巴引流按摩&quot;，并提供了该技术的视频演示。</p>
              </div>
            </Card>
          </Section>

          <Section>
            <SectionTitle sub="我们问了&quot;回奶茶&quot;、薄荷和鼠尾草的效果。坦诚的回答是：可能有一点点作用。">草药茶真的有用吗？</SectionTitle>

            <Card>
              <p style={{ fontSize: 15, lineHeight: 1.7, margin: "0 0 16px" }}>咨询师的表述非常精准：<strong>泌乳主要由乳汁的移出（或不移出）来调控。</strong>草药疗法充其量是一个微弱的辅助作用。</p>
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14, lineHeight: 1.6 }}>
                  <thead>
                    <tr style={{ background: colors.tealLight }}>
                      <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 700, color: colors.navy, borderBottom: `2px solid ${colors.teal}` }}>草药</th>
                      <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 700, color: colors.navy, borderBottom: `2px solid ${colors.teal}` }}>证据等级</th>
                      <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 700, color: colors.navy, borderBottom: `2px solid ${colors.teal}` }}>备注</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={{ borderBottom: `1px solid ${colors.border}` }}>
                      <td style={{ padding: "12px 16px", fontWeight: 600 }}>鼠尾草</td>
                      <td style={{ padding: "12px 16px" }}>经验传闻 + 传统用法；无临床试验</td>
                      <td style={{ padding: "12px 16px" }}>KellyMom 建议断奶期每天3次、每次&frac14;茶匙干鼠尾草。LactMed 指出&quot;没有科学有效的临床试验支持此用途&quot;</td>
                    </tr>
                    <tr style={{ borderBottom: `1px solid ${colors.border}` }}>
                      <td style={{ padding: "12px 16px", fontWeight: 600 }}>薄荷</td>
                      <td style={{ padding: "12px 16px" }}>经验传闻；仅有体外/动物实验证据</td>
                      <td style={{ padding: "12px 16px" }}>LactMed (NCBI)：&quot;未发现证明人类泌乳抑制作用的临床试验&quot;。薄荷醇在细胞培养和小鼠实验中可抑制泌乳，但人类证据仅限于传闻</td>
                    </tr>
                    <tr>
                      <td style={{ padding: "12px 16px", fontWeight: 600 }}>木槿花</td>
                      <td style={{ padding: "12px 16px" }}>传统用法</td>
                      <td style={{ padding: "12px 16px" }}>在回奶方面的研究不如鼠尾草和薄荷充分</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p style={{ fontSize: 15, lineHeight: 1.7, margin: "16px 0 0" }}><strong>咨询师的看法：</strong>如果你喜欢喝茶，反正也需要补水，那就多喝一些——肯定没有坏处，也许有些微帮助。但你需要喝<strong>相当大的量</strong>才可能看到明显效果。真正驱动回奶的机制是不排出乳汁（FIL）。</p>
              <div style={{ marginTop: 12 }}>
                <Badge color={colors.green} bg={colors.greenLight}>已验证</Badge>
                <p style={{ fontSize: 13, lineHeight: 1.6, color: colors.textLight, margin: "4px 0 0" }}>LactMed（美国国立卫生研究院的药物与泌乳数据库）确认薄荷传统上被用于抑制泌乳，但&quot;未发现相关临床试验&quot;。KellyMom 指出薄荷茶是&quot;非常弱的薄荷形式，只有大量饮用（以升计）才可能减少奶量&quot;。这方面的证据基础几乎完全是经验性的。</p>
              </div>
            </Card>
          </Section>
        </>
      )}

      {/* ═══════════════════════ TAB 3 — 时间线与危险信号 ═══════════════════════ */}
      {activeTab === "timeline" && (
        <>
          <Section>
            <SectionTitle sub="逐日预期——回奶是一个需要数周的生理过程，无法加速。">时间线：各阶段预期</SectionTitle>

            <TimelineItem age="第1-3天" title="仅有初乳" desc="乳房可能感觉没什么变化。初乳已经存在，但成熟乳尚未到来。" color={colors.teal} />
            <TimelineItem age="第3-5天" title="涨奶高峰" desc="成熟乳到来。这是最不舒服的48小时。并发症风险在此时最高。乳房变得胀痛、发热、肿胀。" color={colors.rose} />
            <TimelineItem age="第5-12天" title="逐渐消退" desc="如果乳汁没有被移出，产量开始下降。可能出现二次肿胀——与宝宝的肌肤接触可能触发催产素驱动的泌乳再激活。" color={colors.accent} />
            <TimelineItem age="第2-4周+" title="缓慢收尾" desc="少量乳汁是正常的。两侧不对称回奶（一侧先于另一侧）很常见。每侧乳房按自己的 FIL 驱动时间线运作。" color={colors.indigo} />
            <TimelineItem age="数周后" title="完全消退" desc="无法加速——这就是正常的生理时间线。除了继续执行方案外，真的没有更多需要做的。" color={colors.gold} />
          </Section>

          <Section bg={colors.card}>
            <SectionTitle color={colors.accent} sub="抱宝宝可能会短暂重启你以为已经结束的泌乳。">催产素的意外干扰</SectionTitle>

            <Card accent={colors.gold}>
              <p style={{ fontSize: 15, lineHeight: 1.7, margin: 0 }}>进行肌肤接触或长时间抱宝宝可能会触发<strong>催产素（oxytocin）</strong>释放，这是负责射乳反射（&quot;let-down&quot;）的激素。在一次较长时间的抱抱之后，涨奶可能会短暂复发。这是正常的，但如果你以为最难的时候已经过了，可能会感到意外。</p>
              <div style={{ marginTop: 12 }}>
                <Badge color={colors.green} bg={colors.greenLight}>已验证</Badge>
                <p style={{ fontSize: 13, lineHeight: 1.6, color: colors.textLight, margin: "4px 0 0" }}>NCBI 母乳喂养生理学章节证实，催产素会在乳头感觉刺激及与婴儿亲密接触时释放。这是有充分文献记录的神经内分泌反射。</p>
              </div>
            </Card>

            <Card style={{ marginTop: 20, background: colors.greenLight, border: `1px solid ${colors.green}40` }}>
              <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 17, fontWeight: 700, color: colors.navy, marginBottom: 8 }}>第12天的安心话</div>
              <p style={{ fontSize: 15, lineHeight: 1.7, margin: 0 }}>咨询师非常肯定地说，到第12天，你<strong>很可能已经度过了最高风险期。</strong>涨奶期（第3-5天）是积奶和感染风险最危险的阶段，因为大量未排出的乳汁会造成严重积压。到第12天，剩余乳量已经足够低，情况恶化的几率大幅下降。</p>
              <p style={{ fontSize: 15, lineHeight: 1.7, margin: "12px 0 0" }}>她特别说：如果接下来几周还能看到少量乳汁，不用担心，这是正常的。这是一个缓慢消退的过程——无法加速。除了上述方案之外，真的没有更多需要做的。</p>
            </Card>
          </Section>

          <Section>
            <SectionTitle color={colors.rose} sub="咨询师列出了一个清晰的症状递进序列来识别乳腺炎。这是一个升级过程——不需要等到六项全中。">危险信号：何时联系医生</SectionTitle>

            <Card accent={colors.rose}>
              <Badge color={colors.rose} bg={colors.roseLight}>乳腺炎警告阶梯</Badge>
              <div style={{ marginTop: 16 }}>
                <WarningStep num={1} severity={1} title="出现硬块" desc="乳房中可触及的肿块" />
                <WarningStep num={2} severity={2} title="疼痛加剧" desc="该区域变得压痛" />
                <WarningStep num={3} severity={3} title="出现红斑" desc="局部变色区域" />
                <WarningStep num={4} severity={4} title="红斑扩大" desc="红色区域变大，可能出现放射状条纹" />
                <WarningStep num={5} severity={5} title="体温超过 38.4°C（101°F）" desc="即使在服用退烧药/止痛药的情况下，仍突破药效的发烧是警告信号" />
                <WarningStep num={6} severity={6} title="类流感症状" desc="&quot;像被卡车撞了一样&quot;的感觉、寒战、全身酸痛" />
              </div>
            </Card>

            <Callout type="warn" title="不要等到发烧才行动">
              这个阶梯是一个递进过程，不是需要六项全满的清单。持续恶化的疼痛、灼热或发红区域——或者硬块在变大而不是变小——就足以联系医生，即使没有发烧。这一点在你已经因为其他产后恢复（如三度会阴裂伤）而服用退烧药、扶他林或布洛芬时尤为重要，因为这些药物可能掩盖早期的体温升高。咨询师指出，真正的乳腺炎发烧通常会&quot;突破&quot;止痛药的效果，但不要把没发烧当作等待的理由。
            </Callout>

            <div style={{ marginTop: 20 }}>
              <Badge color={colors.green} bg={colors.greenLight}>已验证</Badge>
              <p style={{ fontSize: 13, lineHeight: 1.6, color: colors.textLight, margin: "4px 0 0" }}>ABM 临床方案 #36（2022年）将炎性乳腺炎描述为乳房组织逐渐加剧的疼痛、肿胀和变色，可能伴有发烧、寒战和心率加快等全身症状。重要的是，该方案指出全身性炎症反应可以在无感染的情况下发生。La Leche League International 建议在症状24-48小时内未改善、体温达到38.4°C（101°F）或以上时就医——但也包括你只是&quot;感觉更差了&quot;的情况。</p>
            </div>

            <Card style={{ marginTop: 20, background: colors.greenLight, border: `1px solid ${colors.green}40` }}>
              <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 17, fontWeight: 700, color: colors.navy, marginBottom: 8 }}>好消息</div>
              <p style={{ fontSize: 15, lineHeight: 1.7, margin: 0 }}>咨询师接诊的回奶困难案例，几乎都发生在更接近涨奶高峰期（第3-5天）的时候，那时大量未排出的乳汁造成了严重的积压。到第12天，风险已经大幅降低。</p>
              <p style={{ fontSize: 15, lineHeight: 1.7, margin: "12px 0 0" }}>她提到这些危险信号是&quot;让你了解应该留意什么&quot;——并不是因为大多数处于这一阶段的家长会遇到这些情况。</p>
            </Card>
          </Section>
        </>
      )}

      {/* ═══════════════════════ TAB 4 — 瓶喂优化 ═══════════════════════ */}
      {activeTab === "bottles" && (
        <>
          <Section>
            <SectionTitle sub="你可能以为瓶喂已经搞定了，但其实往往还有可以优化的地方。">瓶喂优化要点</SectionTitle>

            <Card accent={colors.indigo}>
              <Badge color={colors.indigo} bg={colors.indigoLight}>新生儿第12天喂养示例</Badge>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 12, marginTop: 12 }}>
                {[
                  { label: "奶瓶", value: "Dr. Brown\u2019s（窄口）" },
                  { label: "奶嘴", value: "Level 1（慢流速）" },
                  { label: "每顿", value: "2\u20132.5 oz" },
                  { label: "每日次数", value: "8\u201310 次" },
                  { label: "每日总量", value: "~700 mL（~24 oz）" },
                  { label: "体重", value: "8 磅 7 oz" },
                ].map((item, i) => (
                  <div key={i} style={{ background: colors.indigoLight, borderRadius: 10, padding: "10px 14px", textAlign: "center" }}>
                    <div style={{ fontSize: 12, color: colors.textLight, textTransform: "uppercase", letterSpacing: 0.5 }}>{item.label}</div>
                    <div style={{ fontSize: 15, fontWeight: 700, color: colors.navy, marginTop: 2 }}>{item.value}</div>
                  </div>
                ))}
              </div>
            </Card>
          </Section>

          <Section bg={colors.card}>
            <SectionTitle color={colors.accent} sub="咨询师注意到两个问题：奶从嘴角溢出，以及吞咽时有明显的咕嘟声。">流速可能太快了</SectionTitle>

            <Card accent={colors.rose}>
              <p style={{ fontSize: 15, lineHeight: 1.7, margin: 0 }}>这两个迹象都说明流速超过了他能舒适应对的范围。咨询师用了一个很生动的比喻：<em>&quot;就像对着奶瓶灌啤酒一样——奶来得太多太快，他跟不上。&quot;</em></p>
              <p style={{ fontSize: 15, lineHeight: 1.7, margin: "12px 0 0" }}>她还指出，喝得太快会导致宝宝<strong>过饱</strong>，引起<strong>肠胃不适</strong>——所以这不仅是弄脏衣服的问题，更是舒适度的问题。需要留意的信号（咕嘟声、奶从嘴角溢出）正是节奏超过他协调能力的提示。</p>
            </Card>
          </Section>

          <Section>
            <SectionTitle sub="大多数家长以为 Level 1 是最慢的。其实不是——下面还有三个更慢的级别。">Dr. Brown&apos;s 奶嘴流速等级体系</SectionTitle>

            <Card>
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14, lineHeight: 1.6 }}>
                  <thead>
                    <tr style={{ background: colors.accentLight }}>
                      <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 700, color: colors.navy, borderBottom: `2px solid ${colors.accent}` }}>奶嘴级别</th>
                      <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 700, color: colors.navy, borderBottom: `2px solid ${colors.accent}` }}>流速</th>
                      <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 700, color: colors.navy, borderBottom: `2px solid ${colors.accent}` }}>适用对象</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={{ borderBottom: `1px solid ${colors.border}`, background: colors.greenLight }}>
                      <td style={{ padding: "12px 16px", fontWeight: 600 }}>Ultra-Preemie（超早产）</td>
                      <td style={{ padding: "12px 16px" }}>最慢</td>
                      <td style={{ padding: "12px 16px" }}>NICU 婴儿、医学上脆弱的新生儿</td>
                    </tr>
                    <tr style={{ borderBottom: `1px solid ${colors.border}`, background: colors.greenLight }}>
                      <td style={{ padding: "12px 16px", fontWeight: 600 }}>Preemie (P)（早产）</td>
                      <td style={{ padding: "12px 16px" }}>非常慢</td>
                      <td style={{ padding: "12px 16px" }}>早产儿、需要更慢流速的宝宝</td>
                    </tr>
                    <tr style={{ borderBottom: `1px solid ${colors.border}`, background: colors.greenLight }}>
                      <td style={{ padding: "12px 16px", fontWeight: 600 }}>Transition (T)（过渡）</td>
                      <td style={{ padding: "12px 16px" }}>慢（介于 P 和 1 之间）</td>
                      <td style={{ padding: "12px 16px" }}>从母乳过渡到奶瓶的宝宝、觉得 Level 1 太快的宝宝</td>
                    </tr>
                    <tr style={{ borderBottom: `1px solid ${colors.border}` }}>
                      <td style={{ padding: "12px 16px", fontWeight: 600 }}>Level 1</td>
                      <td style={{ padding: "12px 16px" }}>标准慢速</td>
                      <td style={{ padding: "12px 16px" }}>大多数新生儿的默认起始级别</td>
                    </tr>
                    <tr style={{ borderBottom: `1px solid ${colors.border}` }}>
                      <td style={{ padding: "12px 16px", fontWeight: 600 }}>Level 2</td>
                      <td style={{ padding: "12px 16px" }}>中速</td>
                      <td style={{ padding: "12px 16px" }}>约3个月+</td>
                    </tr>
                    <tr style={{ borderBottom: `1px solid ${colors.border}` }}>
                      <td style={{ padding: "12px 16px", fontWeight: 600 }}>Level 3</td>
                      <td style={{ padding: "12px 16px" }}>快速</td>
                      <td style={{ padding: "12px 16px" }}>约6个月+</td>
                    </tr>
                    <tr style={{ borderBottom: `1px solid ${colors.border}` }}>
                      <td style={{ padding: "12px 16px", fontWeight: 600 }}>Level 4</td>
                      <td style={{ padding: "12px 16px" }}>非常快</td>
                      <td style={{ padding: "12px 16px" }}>约9个月+</td>
                    </tr>
                    <tr>
                      <td style={{ padding: "12px 16px", fontWeight: 600 }}>Y-Cut（Y型切口）</td>
                      <td style={{ padding: "12px 16px" }}>可变（宝宝自主控制）</td>
                      <td style={{ padding: "12px 16px" }}>加稠液体</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div style={{ marginTop: 16 }}>
                <Badge color={colors.green} bg={colors.greenLight}>已验证</Badge>
                <p style={{ fontSize: 13, lineHeight: 1.6, color: colors.textLight, margin: "4px 0 0" }}>Dr. Brown&apos;s 官方奶嘴级别指南及其医疗版奶嘴选择指南均确认了这一等级体系。一项 PMC 研究（Pados 等人）测得 Dr. Brown&apos;s Preemie 流速为 7.38 mL/min，而 Level 1 为 9.21 mL/min——可以看到 Preemie 奶嘴确实更慢。</p>
              </div>
            </Card>

            <Card style={{ background: colors.indigoLight, border: `1px solid ${colors.indigo}40` }}>
              <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 17, fontWeight: 700, color: colors.navy, marginBottom: 8 }}>咨询师的关键洞察</div>
              <p style={{ fontSize: 15, lineHeight: 1.7, margin: 0 }}>&quot;奶嘴级别就像婴儿衣服尺码——不同品牌之间没有统一标准。&quot;Dr. Brown&apos;s 的 Level 1 和 Avent 或 Lansinoh 的 Level 1 流速可能完全不同。而且反直觉的是，Dr. Brown&apos;s 的瓶子本来就以偏慢著称。但对某些宝宝来说，即便如此也太快了。</p>
            </Card>
          </Section>

          <Section bg={colors.card}>
            <SectionTitle color={colors.accent} sub="一个实用的经验法则——每顿喂奶应该花多长时间。">喂奶节奏：咨询师的经验法则</SectionTitle>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 20, marginBottom: 24 }}>
              <Card style={{ textAlign: "center", background: colors.accentLight, border: `1px solid ${colors.accent}40` }}>
                <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 36, fontWeight: 800, color: colors.accent }}>7-8 分钟</div>
                <div style={{ fontSize: 14, color: colors.textLight, marginTop: 4 }}>每盎司（新生儿）</div>
              </Card>
              <Card style={{ textAlign: "center", background: colors.goldLight, border: `1px solid ${colors.gold}40` }}>
                <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 36, fontWeight: 800, color: colors.gold }}>~15 分钟</div>
                <div style={{ fontSize: 14, color: colors.textLight, marginTop: 4 }}>一瓶 2 oz</div>
              </Card>
              <Card style={{ textAlign: "center", background: colors.tealLight, border: `1px solid ${colors.teal}40` }}>
                <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 36, fontWeight: 800, color: colors.teal }}>~5 分钟</div>
                <div style={{ fontSize: 14, color: colors.textLight, marginTop: 4 }}>每盎司（约6周时）</div>
              </Card>
            </div>

            <Card>
              <p style={{ fontSize: 15, lineHeight: 1.7, margin: 0 }}>如果他喝一瓶的速度远快于以上参考值，说明流速可能太快了。</p>
              <div style={{ marginTop: 12 }}>
                <Badge color={colors.gold} bg={colors.goldLight}>经验法则</Badge>
                <p style={{ fontSize: 13, lineHeight: 1.6, color: colors.textLight, margin: "4px 0 0" }}>这个&quot;每盎司几分钟&quot;的数字是咨询师的实用经验法则——并非 AAP 或指南支持的精确指标。多个节奏喂养资源（Minnesota WIC、Colorado WIC、Pampers/AAP）确实支持的是：新生儿单次喂奶总时长大约<strong>15-20分钟</strong>，吞咽声大、奶从嘴角溢出和眼睛瞪大是流速过快的信号。咨询师的&quot;每盎司&quot;框架是一种实用的量化方式，但不要把它当作精确标准。</p>
              </div>
            </Card>
          </Section>

          <Section>
            <SectionTitle sub="约6周时，随着协调能力提升，目标节奏会变化——烦躁表现就是调整的信号。">约6周时，节奏会变化</SectionTitle>

            <Card accent={colors.teal}>
              <p style={{ fontSize: 15, lineHeight: 1.7, margin: 0 }}>咨询师提到约6周时，随着宝宝协调能力提升，目标节奏会降至约<strong>每盎司5分钟</strong>。届时：</p>
              <ul style={{ fontSize: 15, lineHeight: 1.8, margin: "12px 0 0", paddingLeft: 20 }}>
                <li>他可能会对 Preemie 或 Transition 奶嘴感到烦躁——哭闹、放弃奶瓶、表现得不耐烦</li>
                <li>这种烦躁就是换回 Level 1 的信号</li>
                <li>如果 Level 1 最终也变得太慢，可以考虑换品牌奶瓶</li>
              </ul>
              <p style={{ fontSize: 15, lineHeight: 1.7, margin: "12px 0 0", fontWeight: 600 }}>她强调的核心原则是：让宝宝告诉你。如果慢奶嘴让他很费劲，就换回快的。如果快奶嘴让他呛奶溢奶，就换回慢的。</p>
              <div style={{ marginTop: 12 }}>
                <Badge color={colors.gold} bg={colors.goldLight}>经验法则</Badge>
                <p style={{ fontSize: 13, lineHeight: 1.6, color: colors.textLight, margin: "4px 0 0" }}>同样的说明：5分钟/盎司是她的实用参考，不是已发表的指南数字。</p>
              </div>
            </Card>
          </Section>

          <Section bg={colors.card}>
            <SectionTitle color={colors.accent} sub="咨询师更倾向于 Lansinoh 的宽奶嘴设计——但这是临床偏好，非硬性证据。">Lansinoh 奶瓶与奶嘴形状</SectionTitle>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: 20 }}>
              <Card accent={colors.indigo}>
                <Badge color={colors.indigo} bg={colors.indigoLight}>Dr. Brown&apos;s（窄口）</Badge>
                <p style={{ fontSize: 15, lineHeight: 1.7, margin: "8px 0 0" }}>奶嘴较小，新生儿更容易含住。适合作为最初几周的起始奶瓶。</p>
              </Card>
              <Card accent={colors.teal}>
                <Badge color={colors.teal} bg={colors.tealLight}>Lansinoh（宽口）</Badge>
                <p style={{ fontSize: 15, lineHeight: 1.7, margin: "8px 0 0" }}>奶嘴更宽，能更充分地填充上颚。咨询师认为这种设计更有利于上颚发育和口腔运动功能。</p>
              </Card>
            </div>

            <Card style={{ marginTop: 20 }}>
              <div style={{ marginTop: 0 }}>
                <Badge color={colors.gold} bg={colors.goldLight}>临床偏好</Badge>
                <p style={{ fontSize: 13, lineHeight: 1.6, color: colors.textLight, margin: "4px 0 0" }}>这是咨询师的临床偏好，直觉上也说得通——更宽的奶嘴形状更接近母乳亲喂。但 AAP 并未认可任何特定奶瓶或奶嘴形状对口腔发育更好。有一些证据表明奶嘴设计会影响喂养力学，但不足以得出&quot;X品牌在科学上优于Y品牌&quot;的结论。把这当作一个值得考虑的合理建议，而非硬性推荐。</p>
              </div>
              <p style={{ fontSize: 15, lineHeight: 1.7, margin: "16px 0 0" }}><strong>实际计划：</strong>目前继续用 Dr. Brown&apos;s 就好。大约6-8周时，如果宝宝准备好适应更快流速且你想尝试不同形状，可以试试 Lansinoh。它的流速通常比 Dr. Brown&apos;s 稍快，时机上正好合适。</p>
            </Card>

            <div style={{ marginTop: 20 }}>
              <Callout type="info" title="相关指南">
                关于每个体重和年龄阶段该喂多少配方奶，请参阅<a href="/zh/guides/formula-feeding" style={{ color: colors.accent, fontWeight: 600 }}>配方奶喂养计算器</a>指南。
              </Callout>
            </div>
          </Section>
        </>
      )}

      {/* ═══════════════════════ TAB 5 — 行动清单 ═══════════════════════ */}
      {activeTab === "action" && (
        <>
          <Section>
            <SectionTitle sub="整次咨询的所有建议，浓缩为具体的下一步行动。">行动清单总结</SectionTitle>

            <Card accent={colors.accent}>
              <Badge color={colors.accent} bg={colors.accentLight}>回奶相关</Badge>
              <div style={{ marginTop: 12 }}>
                <CheckItem>全天候穿运动内衣（不要太紧）</CheckItem>
                <CheckItem>每隔几小时冰敷一次，特别注意硬块部位</CheckItem>
                <CheckItem>按医嘱服用布洛芬（抗炎）</CheckItem>
                <CheckItem>朝腋下方向做轻柔淋巴引流按摩</CheckItem>
                <CheckItem>持续关注任何硬块——应当逐渐缩小</CheckItem>
                <CheckItem>留意乳腺炎警告信号：疼痛加剧、硬块变大、红肿/发热、条纹状红斑、类流感症状或体温超过38.4°C——不要仅以有无发烧为判断标准</CheckItem>
                <CheckItem>如果喜欢可以喝草药茶（效果微弱但无害）</CheckItem>
                <CheckItem>除此之外什么都不用做。让 FIL 发挥作用。接下来几周仍能看到少量乳汁是正常的、可预期的。</CheckItem>
              </div>
            </Card>

            <Card accent={colors.indigo}>
              <Badge color={colors.indigo} bg={colors.indigoLight}>瓶喂相关</Badge>
              <div style={{ marginTop: 12 }}>
                <CheckItem>如果流速似乎太快，尝试 Dr. Brown&apos;s <strong>Preemie</strong> 或 <strong>Transition (T)</strong> 奶嘴</CheckItem>
                <CheckItem>测试宝宝用更慢流速是否喂得更舒服</CheckItem>
                <CheckItem>目标约15分钟完成一瓶2 oz（咨询师的经验法则）</CheckItem>
                <CheckItem>如果宝宝表现出烦躁（哭闹、放弃奶瓶），就是换回 Level 1 的信号</CheckItem>
                <CheckItem>约6周时：重新评估节奏——随着协调能力提升，宝宝会喝得更快</CheckItem>
                <CheckItem>约6-8周时：可以尝试 Lansinoh 奶瓶，体验更宽的奶嘴形状（咨询师偏好，非硬性循证要求）</CheckItem>
              </div>
            </Card>
          </Section>

          <Section bg={colors.card}>
            <SectionTitle color={colors.accent} sub="本指南中的每一项建议都与已发表的医学文献进行了交叉核实。">交叉核实结论</SectionTitle>

            <Card>
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13, lineHeight: 1.6 }}>
                  <thead>
                    <tr style={{ background: colors.accentLight }}>
                      <th style={{ padding: "10px 14px", textAlign: "left", fontWeight: 700, color: colors.navy, borderBottom: `2px solid ${colors.accent}` }}>建议</th>
                      <th style={{ padding: "10px 14px", textAlign: "center", fontWeight: 700, color: colors.navy, borderBottom: `2px solid ${colors.accent}`, whiteSpace: "nowrap" }}>判定</th>
                      <th style={{ padding: "10px 14px", textAlign: "left", fontWeight: 700, color: colors.navy, borderBottom: `2px solid ${colors.accent}` }}>备注</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { advice: "孕酮下降触发泌乳", verdict: "verified", note: "标准生殖内分泌学知识" },
                      { advice: "FIL 蛋白在乳汁滞留时抑制产奶", verdict: "verified", note: "已发表研究（Peaker & Wilde 1996），NCBI 和 ABM 资料均有引用" },
                      { advice: "涨奶高峰后不排奶以促进回奶", verdict: "verified", note: "与供需生理学和现行 ABM 指南一致" },
                      { advice: "涨奶高峰期可少量排出缓解", verdict: "verified", note: "HonorHealth、NHS 和多个泌乳资源均支持" },
                      { advice: "避免用力按摩/电动牙刷按摩", verdict: "verified", note: "ABM 方案 #36（2022）明确从深度按摩转向" },
                      { advice: "朝腋下方向轻柔按摩", verdict: "verified", note: "La Leche League GB 和 IABLE 推荐的淋巴引流技术" },
                      { advice: "冰敷 + 布洛芬消炎", verdict: "verified", note: "更新版 ABM 方案中的一线治疗" },
                      { advice: "运动内衣（不要过紧）", verdict: "verified", note: "束胸已不推荐；建议穿支撑性内衣（HonorHealth、NHS）" },
                      { advice: "薄荷/鼠尾草茶——效果最多微弱", verdict: "verified", note: "LactMed：无人体临床试验；仅为经验传闻；需大量饮用" },
                      { advice: "完全消退需数周", verdict: "verified", note: "不刺激情况下约15天后自然减退，但少量可持续更久" },
                      { advice: "乳腺炎症状：硬块 \u2192 疼痛 \u2192 红肿 \u2192 发烧", verdict: "verified", note: "与 ABM 方案 #36 和 LLLI 指导一致；不要仅等发烧" },
                      { advice: "抱宝宝触发催产素可引起射乳", verdict: "verified", note: "公认的神经内分泌反射" },
                      { advice: "两侧产奶不均衡是正常的", verdict: "verified", note: "FIL 在每侧乳房独立运作；不对称很常见" },
                      { advice: "Dr. Brown\u2019s 在 Level 1 下还有 Preemie 和 Transition 级别", verdict: "verified", note: "Dr. Brown\u2019s 官方指南和医疗版奶嘴选择指南" },
                      { advice: "流速过快的信号：溢奶、吞咽声大", verdict: "verified", note: "所有节奏喂养资源（WIC、AAP 来源）一致认可" },
                      { advice: "目标约15分钟完成一瓶2 oz（新生儿）", verdict: "heuristic", note: "15-20分钟总喂奶时长被广泛引用；每盎司分钟数为咨询师经验法则" },
                      { advice: "现在7-8分钟/oz，6周后约5分钟/oz", verdict: "heuristic", note: "咨询师的实用参考，非已发表指南数字" },
                      { advice: "Lansinoh 奶嘴形状更利于口腔发育", verdict: "heuristic", note: "合理建议；AAP 未认可特定奶瓶形状对发育的优越性" },
                    ].map((row, i) => (
                      <tr key={i} style={{ borderBottom: `1px solid ${colors.border}` }}>
                        <td style={{ padding: "10px 14px" }}>{row.advice}</td>
                        <td style={{ padding: "10px 14px", textAlign: "center" }}>
                          {row.verdict === "verified" ? (
                            <span style={{ display: "inline-block", background: colors.greenLight, color: colors.green, fontSize: 11, fontWeight: 700, padding: "2px 8px", borderRadius: 10, textTransform: "uppercase" }}>已验证</span>
                          ) : (
                            <span style={{ display: "inline-block", background: colors.goldLight, color: colors.gold, fontSize: 11, fontWeight: 700, padding: "2px 8px", borderRadius: 10, textTransform: "uppercase" }}>经验法则</span>
                          )}
                        </td>
                        <td style={{ padding: "10px 14px", color: colors.textLight }}>{row.note}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p style={{ fontSize: 15, lineHeight: 1.7, margin: "16px 0 0" }}><strong>总结：</strong>咨询师的建议全面、前沿，与2022年 ABM 方案和成熟的泌乳生理学高度吻合。回奶指导有扎实的循证基础。瓶喂建议是实用且合理的临床经验——当你看到上表中 <span style={{ color: colors.green, fontWeight: 700 }}>已验证</span> 和 <span style={{ color: colors.gold, fontWeight: 700 }}>经验法则</span> 的区别时，请据此校准你的信心程度。</p>
            </Card>
          </Section>

          <Section>
            <SectionTitle sub="本指南引用的已发表医学文献和临床资源。">参考来源</SectionTitle>

            <Card accent={colors.accent}>
              <Badge color={colors.accent} bg={colors.accentLight}>泌乳与回奶</Badge>
              <ul style={{ fontSize: 14, lineHeight: 2, margin: "8px 0 0", paddingLeft: 20, color: colors.textLight }}>
                <li><a href="https://pubmed.ncbi.nlm.nih.gov/35576513/" style={{ color: colors.accent }}>ABM 临床方案 #36：乳腺炎谱系，2022年修订版 (PubMed)</a></li>
                <li><a href="https://www.ncbi.nlm.nih.gov/books/NBK148970/" style={{ color: colors.accent }}>NCBI Bookshelf — 母乳喂养的生理学基础</a></li>
                <li><a href="https://pubmed.ncbi.nlm.nih.gov/10887504/" style={{ color: colors.accent }}>Peaker &amp; Wilde (1996) — 乳汁的泌乳反馈控制 (PubMed)</a></li>
                <li><a href="https://www.ncbi.nlm.nih.gov/books/NBK501851/" style={{ color: colors.accent }}>LactMed — 薄荷 (NCBI)</a></li>
                <li><a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC6599849/" style={{ color: colors.accent }}>Cochrane 综述 — 抑制泌乳的治疗方法 (PMC)</a></li>
                <li><a href="https://kellymom.com/bf/can-i-breastfeed/herbs/herbs-oversupply/" style={{ color: colors.accent }}>KellyMom — 鼠尾草及草药减少奶量</a></li>
                <li><a href="https://llli.org/breastfeeding-info/mastitis/" style={{ color: colors.accent }}>La Leche League International — 乳腺炎与乳房疼痛</a></li>
                <li><a href="https://laleche.org.uk/mastitis/" style={{ color: colors.accent }}>La Leche League GB — 乳腺炎、堵奶与涨奶</a></li>
                <li><a href="https://www.honorhealth.com/medical-services/maternity/lactation-suppression" style={{ color: colors.accent }}>HonorHealth — 回奶建议</a></li>
                <li><a href="https://www.uhs.nhs.uk/Media/UHS-website-2019/Patientinformation/Pregnancyandbirth/Suppressing-your-breast-milk-supply-after-giving-birth-2907-PIL.pdf" style={{ color: colors.accent }}>NHS — 产后抑制泌乳</a></li>
              </ul>
            </Card>

            <Card accent={colors.indigo}>
              <Badge color={colors.indigo} bg={colors.indigoLight}>瓶喂</Badge>
              <ul style={{ fontSize: 14, lineHeight: 2, margin: "8px 0 0", paddingLeft: 20, color: colors.textLight }}>
                <li><a href="https://drbrownsbaby.com/blogs/articles/dr-browns-nipple-level-guide" style={{ color: colors.accent }}>Dr. Brown&apos;s 官方奶嘴级别指南</a></li>
                <li><a href="https://www.drbrownsmedical.com/resources/nipple-flow-guidelines/" style={{ color: colors.accent }}>Dr. Brown&apos;s Medical — 奶嘴流速指南</a></li>
                <li><a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC5033656/" style={{ color: colors.accent }}>Pados 等人 — 奶瓶奶嘴流速测量 (PMC)</a></li>
                <li><a href="https://www.coloradowic.gov/paced-bottle-feeding" style={{ color: colors.accent }}>Colorado WIC — 节奏瓶喂</a></li>
                <li><a href="https://www.health.state.mn.us/docs/people/wic/localagency/wedupdate/moyr/2017/topic/1115feeding.pdf" style={{ color: colors.accent }}>Minnesota WIC — 节奏瓶喂指南</a></li>
              </ul>
            </Card>
          </Section>
        </>
      )}

      {/* CONCLUSION FOOTER */}
      <div style={{ background: `linear-gradient(135deg, ${colors.navy} 0%, #14303d 50%, #1a4050 100%)`, padding: "56px 24px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, opacity: 0.05, background: "radial-gradient(circle at 70% 30%, rgba(45,142,142,0.4) 0%, transparent 60%)" }}></div>
        <div style={{ position: "relative", maxWidth: 720, margin: "0 auto", textAlign: "center" }}>
          <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", color: colors.accent, marginBottom: 12 }}>总结</div>
          <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 32, fontWeight: 800, color: "#fff", margin: 0, lineHeight: 1.2 }}>相信身体的智慧——它正在工作</h2>
          <p style={{ fontSize: 17, color: "rgba(255,255,255,0.7)", marginTop: 16, lineHeight: 1.7, maxWidth: 600, margin: "16px auto 0" }}>身体有一套精妙的内置系统来关闭泌乳。你要做的，主要就是不去干扰它。</p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 16, marginTop: 32 }}>
            {[
              { icon: "🧬", stat: "FIL", label: "身体自带的关停开关" },
              { icon: "🧊", stat: "冰敷", label: "一线舒缓措施" },
              { icon: "🍼", stat: "7-8 分钟/oz", label: "新生儿喂奶节奏参考" },
              { icon: "15/18", stat: "已验证", label: "经文献确认的建议" },
            ].map((item, i) => (
              <div key={i} style={{ background: "rgba(255,255,255,0.08)", borderRadius: 14, padding: 20, border: "1px solid rgba(255,255,255,0.1)" }}>
                <div style={{ fontSize: 28 }}>{item.icon}</div>
                <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 24, fontWeight: 700, color: colors.accent, marginTop: 8 }}>{item.stat}</div>
                <div style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", marginTop: 4, lineHeight: 1.4 }}>{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div style={{ background: colors.navy, padding: "32px 24px", textAlign: "center" }}>
        <p style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", margin: 0, lineHeight: 1.6 }}>基于 IBCLC 认证泌乳咨询师的专业咨询<br />已与 ABM、AAP、LactMed 及同行评审来源交叉核实。本指南为参考资料——不能替代专业医疗建议。</p>
      </div>

      {/* COMMENTS */}
      <Section>
        <GiscusComments locale="zh" term="/guides/milk-suppression-bottle-feeding" />
      </Section>
    </div>
  );
}
