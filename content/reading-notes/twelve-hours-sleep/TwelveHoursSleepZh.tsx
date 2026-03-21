"use client";

import { useState } from "react";
import { AudioPlayer } from "@/components/AudioPlayer";
import { Callout } from "@/components/Callout";
import { GiscusComments } from "@/components/GiscusComments";

const colors = {
  bg: "#F0F0FA",
  card: "#FFFFFF",
  accent: "#5B6ABB",
  accentLight: "#ECEDF8",
  indigo: "#4338CA",
  indigoLight: "#EDE9FF",
  navy: "#1E2A4A",
  gold: "#C8A04A",
  goldLight: "#FBF4E4",
  teal: "#3A8A7A",
  tealLight: "#E4F4F4",
  green: "#4C9A6E",
  greenLight: "#E8F5EB",
  rose: "#C75B7A",
  roseLight: "#FCEEF3",
  text: "#1E2A4A",
  textLight: "#5A6380",
  border: "#DDDCE8",
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
  <div style={{ background: colors.card, borderRadius: 16, padding: 28, border: `1px solid ${colors.border}`, borderLeft: accent ? `4px solid ${accent}` : undefined, marginBottom: 20, boxShadow: "0 2px 12px rgba(30,42,74,0.04)", ...style }}>{children}</div>
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
  <div style={{ display: "flex", gap: 12, alignItems: "flex-start", marginBottom: 12 }}>
    <div style={{ width: 24, height: 24, borderRadius: "50%", background: colors.green, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 2 }}>
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 7l3 3 5-5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
    </div>
    <div style={{ fontSize: 15, lineHeight: 1.6, color: colors.text }}>{children}</div>
  </div>
);

export default function TwelveHoursSleepZh() {
  const [openStep, setOpenStep] = useState(0);
  const [activeTab, setActiveTab] = useState("overview");

  const tabs = [
    { id: "overview", label: "核心理念" },
    { id: "chapters", label: "分章梳理" },
    { id: "schedule", label: "目标作息" },
    { id: "checklist", label: "实操清单" },
    { id: "balance", label: "平衡视角" },
  ];

  return (
    <div style={{ background: colors.bg, fontFamily: "'Source Sans 3', sans-serif", color: colors.text, minHeight: "100vh" }}>
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700;800&family=Source+Sans+3:wght@300;400;600;700&display=swap" rel="stylesheet" />

      {/* HERO */}
      <div style={{ background: `linear-gradient(135deg, ${colors.navy} 0%, #1a2440 50%, #2a3a5a 100%)`, padding: "56px 24px 48px", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, opacity: 0.06, background: "repeating-linear-gradient(45deg, transparent, transparent 30px, rgba(255,255,255,0.1) 30px, rgba(255,255,255,0.1) 60px)" }}></div>
        <div style={{ position: "absolute", inset: 0, opacity: 0.08, background: "radial-gradient(circle at 70% 20%, rgba(200,160,74,0.4) 0%, transparent 50%)" }}></div>
        <div style={{ position: "relative", maxWidth: 720, margin: "0 auto" }}>
          <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", color: colors.gold, marginBottom: 16 }}>婴儿睡眠训练完整方案</div>
          <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 40, fontWeight: 800, color: "#fff", margin: 0, lineHeight: 1.15 }}>《12 周睡整夜》读书笔记</h1>
          <p style={{ fontSize: 17, color: "rgba(255,255,255,0.7)", marginTop: 12, lineHeight: 1.5 }}>Suzy Giordano &amp; Lisa Abidin 著 — 一套循序渐进的婴儿睡眠训练方案</p>
          <div style={{ display: "flex", justifyContent: "center", gap: 32, marginTop: 32, flexWrap: "wrap" }}>
            <StatBox num="12h" label="目标夜间睡眠" color={colors.gold} />
            <StatBox num="3 步" label="核心操作步骤" color={colors.accent} />
            <StatBox num="4h" label="白天喂养间隔" color={colors.teal} />
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "16px 24px 0" }}>
        <AudioPlayer locale="zh" contentKey="reading-notes/twelve-hours-sleep" />
      </div>

      {/* SUPPORT THE AUTHOR */}
      <Section>
        <Callout type="warn" title="先支持原书作者">
          这是一份中文梳理版笔记，方便快速回顾核心方法，不是原书复刻。如果你觉得这套方法适合自己，建议直接购买原书阅读完整案例、背景和细节。
        </Callout>
      </Section>

      {/* NAV */}
      <div style={{ background: colors.card, borderBottom: `1px solid ${colors.border}`, position: "sticky", top: 0, zIndex: 100, boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "flex", gap: 0, overflowX: "auto", padding: "0 12px" }}>
          {tabs.map((t) => (
            <button key={t.id} onClick={() => setActiveTab(t.id)} style={{ background: "none", border: "none", padding: "14px 18px", fontFamily: "'Source Sans 3', sans-serif", fontSize: 14, fontWeight: activeTab === t.id ? 700 : 400, color: activeTab === t.id ? colors.accent : colors.textLight, borderBottom: activeTab === t.id ? `3px solid ${colors.accent}` : "3px solid transparent", cursor: "pointer", whiteSpace: "nowrap", transition: "all 0.15s" }}>{t.label}</button>
          ))}
        </div>
      </div>

      {/* ==================== OVERVIEW TAB ==================== */}
      {activeTab === "overview" && (
        <>
          {/* Author Background */}
          <Section>
            <SectionTitle sub="Suzy Giordano 被称为 &quot;The Baby Coach&quot;。她最早是在 1992 年帮助一位通过 IVF 生下三胞胎的朋友时，逐渐形成这套方法。后来她从多胞胎家庭扩展到双胞胎、单胎家庭，自称已经帮助过上千个宝宝建立睡眠节律。">作者背景</SectionTitle>
          </Section>

          {/* Core Philosophy */}
          <Section bg={colors.card}>
            <SectionTitle color={colors.indigo} sub="这本书最重要的一句话是：睡眠不是宝宝天生就会的能力，而是一项需要学习的技能。">核心理念：睡眠是可以被教会的技能</SectionTitle>

            <Card style={{ background: colors.indigoLight, border: `2px solid ${colors.indigo}40` }}>
              <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 18, fontWeight: 700, color: colors.indigo, marginBottom: 12 }}>关键比喻</div>
              <p style={{ fontSize: 15, lineHeight: 1.7, margin: 0 }}>如果你每天都把 2 岁孩子抱着走路，他就很难学会自己走；如果你每次都靠摇睡、奶睡、抱睡来结束入睡过程，宝宝也很难学会自己入睡。</p>
            </Card>

            <Card style={{ marginTop: 4, background: colors.goldLight, border: `1px solid ${colors.gold}40` }}>
              <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 17, fontWeight: 700, color: colors.navy, marginBottom: 8 }}>&#128161; 这套说法的价值</div>
              <p style={{ fontSize: 15, lineHeight: 1.7, margin: 0 }}>它把父母从「是不是太狠心」的内疚里拉出来，转向「我是在教孩子建立长期能力」。</p>
            </Card>
          </Section>

          {/* Two Pillars */}
          <Section>
            <SectionTitle sub="整套方法建立在两个互相强化的支柱之上。">方法的两根支柱</SectionTitle>

            <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
              <FlowBox color={colors.accent} bg={colors.accentLight}>
                &#9790; <strong>支柱 1：白天吃够</strong><br />
                <span style={{ fontWeight: 400, fontSize: 14 }}>把足够多的奶量放在白天完成，让夜里醒来不是因为热量不足。</span>
              </FlowBox>
              <FlowArrow />
              <FlowBox color={colors.teal} bg={colors.tealLight}>
                &#128716; <strong>支柱 2：学会自我安抚</strong><br />
                <span style={{ fontWeight: 400, fontSize: 14 }}>让宝宝在床上、清醒状态下自己入睡，而不是依赖奶、抱、摇、奶嘴等外部条件。</span>
              </FlowBox>
            </div>

            <Card style={{ marginTop: 24, background: colors.accentLight, border: `1px solid ${colors.accent}40` }}>
              <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 17, fontWeight: 700, color: colors.accent, marginBottom: 8 }}>&#128260; 互相强化</div>
              <p style={{ fontSize: 15, lineHeight: 1.7, margin: 0 }}>白天吃得够，夜里更容易睡得长；夜里睡得更长，白天喂养也更稳定。</p>
            </Card>
          </Section>
        </>
      )}

      {/* ==================== CHAPTERS TAB ==================== */}
      {activeTab === "chapters" && (
        <>
          {/* Chapter 1 */}
          <Section>
            <SectionTitle sub="新生儿每天能睡 16 到 18 小时，但通常被切成很多 2 到 4 小时的小段。">第 1 章：为什么值得做睡眠训练</SectionTitle>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16 }}>
              <Card accent={colors.accent}>
                <Badge color={colors.accent} bg={colors.accentLight}>现状</Badge>
                <p style={{ fontSize: 15, lineHeight: 1.7, margin: "8px 0 0" }}>新生儿每天能睡 16 到 18 小时，但通常被切成很多 2 到 4 小时的小段。</p>
              </Card>
              <Card accent={colors.rose}>
                <Badge color={colors.rose} bg={colors.roseLight}>影响</Badge>
                <p style={{ fontSize: 15, lineHeight: 1.7, margin: "8px 0 0" }}>长期睡眠不足不仅伤害父母状态，也会让家庭更容易进入「怎么先挺过去怎么来」的临时模式。</p>
              </Card>
              <Card accent={colors.gold}>
                <Badge color={colors.gold} bg={colors.goldLight}>问题</Badge>
                <p style={{ fontSize: 15, lineHeight: 1.7, margin: "8px 0 0" }}>这些临时模式短期有效，但会慢慢固化成依赖。</p>
              </Card>
            </div>

            <Callout type="info" title="这本书的出发点">
              它不是把睡眠训练当成「对宝宝做的一件残忍的事」，而是当作「让全家都更可持续地运转」的方法。
            </Callout>
          </Section>

          {/* Chapter 2 */}
          <Section bg={colors.card}>
            <SectionTitle color={colors.teal} sub="作者给了三个硬门槛——这些门槛背后的逻辑是：宝宝需要有足够热量储备，也需要消化和神经系统发育到一定程度。">第 2 章：开始前的三个前提</SectionTitle>

            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", background: colors.card, borderRadius: 12, overflow: "hidden", fontSize: 15 }}>
                <thead>
                  <tr style={{ background: colors.teal, color: "#fff" }}>
                    <th style={{ padding: "14px 20px", textAlign: "left", fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 700 }}>条件</th>
                    <th style={{ padding: "14px 20px", textAlign: "left", fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 700 }}>标准</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: `1px solid ${colors.border}` }}>
                    <td style={{ padding: "14px 20px", fontWeight: 600, color: colors.navy }}>最低体重</td>
                    <td style={{ padding: "14px 20px", color: colors.text }}>9 磅</td>
                  </tr>
                  <tr style={{ borderBottom: `1px solid ${colors.border}`, background: colors.accentLight }}>
                    <td style={{ padding: "14px 20px", fontWeight: 600, color: colors.navy }}>每日摄入</td>
                    <td style={{ padding: "14px 20px", color: colors.text }}>至少 24 oz 奶</td>
                  </tr>
                  <tr>
                    <td style={{ padding: "14px 20px", fontWeight: 600, color: colors.navy }}>最低月龄</td>
                    <td style={{ padding: "14px 20px", color: colors.text }}>单胎 4 周、双胎 8 周、三胞胎 12 周（按矫正月龄）</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <Card style={{ marginTop: 20, background: colors.goldLight, border: `1px solid ${colors.gold}40` }}>
              <p style={{ fontSize: 15, lineHeight: 1.7, margin: 0 }}><strong>开始前最好先和儿科确认。</strong></p>
            </Card>
          </Section>

          {/* Chapter 3 */}
          <Section>
            <SectionTitle sub="这是整套方法的地基——把一天分成两个 12 小时区间。">第 3 章：白天 4 小时喂养节律</SectionTitle>

            <Card>
              <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 18, fontWeight: 700, color: colors.navy, marginBottom: 16 }}>操作框架</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16 }}>
                <div style={{ padding: 16, background: colors.accentLight, borderRadius: 10, textAlign: "center" }}>
                  <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 28, fontWeight: 700, color: colors.accent }}>12h</div>
                  <div style={{ fontSize: 13, color: colors.textLight }}>白天窗口（如 7:00–19:00）</div>
                </div>
                <div style={{ padding: 16, background: colors.tealLight, borderRadius: 10, textAlign: "center" }}>
                  <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 28, fontWeight: 700, color: colors.teal }}>4 次</div>
                  <div style={{ fontSize: 13, color: colors.textLight }}>白天喂奶次数</div>
                </div>
                <div style={{ padding: 16, background: colors.goldLight, borderRadius: 10, textAlign: "center" }}>
                  <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 28, fontWeight: 700, color: colors.gold }}>4h</div>
                  <div style={{ fontSize: 13, color: colors.textLight }}>每次喂奶间隔</div>
                </div>
              </div>
            </Card>

            <Card style={{ marginTop: 4 }}>
              <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 17, fontWeight: 700, color: colors.navy, marginBottom: 8 }}>示例时间表</div>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
                {["7:00", "11:00", "15:00", "19:00"].map((time, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={{ background: colors.accent, color: "#fff", padding: "8px 16px", borderRadius: 20, fontFamily: "'Playfair Display', Georgia, serif", fontSize: 16, fontWeight: 700 }}>{time}</div>
                    {i < 3 && <span style={{ color: colors.textLight, fontSize: 20 }}>&rarr;</span>}
                  </div>
                ))}
              </div>
            </Card>

            <Card style={{ marginTop: 4, background: colors.indigoLight, border: `1px solid ${colors.indigo}40` }}>
              <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 17, fontWeight: 700, color: colors.indigo, marginBottom: 8 }}>为什么是 4 小时？</div>
              <p style={{ fontSize: 15, lineHeight: 1.7, margin: 0 }}>如果宝宝总是 1.5 到 2 小时就吃一点，就很难真正饿到能完整吃下一顿。把间隔慢慢拉开，宝宝到点时会更饿，单次摄入量也更大，于是夜间对奶的依赖会下降。</p>
            </Card>

            <div style={{ marginTop: 20 }}>
              <Callout type="warn" title="关于母乳喂养的现实提醒">
                如果夜里连续 12 小时不哺乳或不泵奶，很多妈妈的奶量都会受影响。很多泌乳顾问更推荐保留一个夜奶或夜间泵奶时段，直到 6 到 10 个月。睡眠改善和奶量维持之间，需要根据家庭实际做权衡。
              </Callout>
            </div>
          </Section>

          {/* Chapter 4 */}
          <Section bg={colors.card}>
            <SectionTitle color={colors.gold} sub="作者不建议突然停掉夜奶，而是缓慢递减。这个过程本质上是让身体逐步把夜间热量需求挪回白天。">第 4 章：逐步取消夜奶</SectionTitle>

            <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
              <FlowBox color={colors.gold} bg={colors.goldLight}>
                <strong>第一步</strong> — 先从宝宝夜里喝得较少的那一顿开始
              </FlowBox>
              <FlowArrow />
              <FlowBox color={colors.accent} bg={colors.accentLight}>
                <strong>第二步</strong> — 每 3 个晚上减少 <strong>0.5 oz</strong>
              </FlowBox>
              <FlowArrow />
              <FlowBox color={colors.teal} bg={colors.tealLight}>
                <strong>第三步</strong> — 如果宝宝自己喝得比目标更少，就以更低的量为准
              </FlowBox>
              <FlowArrow />
              <FlowBox color={colors.green} bg={colors.greenLight}>
                <strong>第四步</strong> — 第一顿夜奶取消后，再处理另一顿
              </FlowBox>
            </div>
          </Section>

          {/* Chapter 5 */}
          <Section>
            <SectionTitle sub="这是这本书最有争议、也是最关键的一部分。">第 5 章：有限哭法与自我安抚</SectionTitle>

            <Card style={{ background: colors.indigoLight, border: `2px solid ${colors.indigo}40`, marginBottom: 24 }}>
              <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 18, fontWeight: 700, color: colors.indigo, marginBottom: 12 }}>作者的版本</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {[
                  "完成睡前流程",
                  "把宝宝在清醒状态下放进婴儿床",
                  "关灯、道晚安、离开房间",
                  "如果哭，先等 3 到 5 分钟",
                  "如果中途安静下来，计时重置",
                  "进去安抚时，尽量不抱起来",
                  "轻拍、口头安抚，平静后离开",
                  "如果又哭，再重复",
                ].map((step, i) => (
                  <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start", padding: "10px 14px", background: i % 2 === 0 ? `${colors.indigo}10` : "transparent", borderRadius: 8 }}>
                    <div style={{ width: 28, height: 28, borderRadius: "50%", background: colors.indigo, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, flexShrink: 0 }}>{i + 1}</div>
                    <div style={{ fontSize: 15, lineHeight: 1.6, color: colors.text }}>{step}</div>
                  </div>
                ))}
              </div>
            </Card>

            <Callout type="tip" title="作者的核心原则">
              你的角色不是替宝宝「把这件事做完」，而是陪他「学会自己做完」。
            </Callout>

            <Card style={{ marginTop: 20, background: colors.goldLight, border: `1px solid ${colors.gold}40` }}>
              <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 17, fontWeight: 700, color: colors.navy, marginBottom: 8 }}>&#128161; 一致性比技巧本身更重要</div>
              <p style={{ fontSize: 15, lineHeight: 1.7, margin: 0 }}>如果今天抱、明天不抱、后天再抱，宝宝只会学到「哭得更久就能等到变化」。</p>
            </Card>
          </Section>

          {/* Chapter 6 */}
          <Section bg={colors.card}>
            <SectionTitle color={colors.teal} sub="作者推荐在节律稳定后把白天睡眠收束成两大段。">第 6 章：白天小睡与安抚工具箱</SectionTitle>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 20, marginBottom: 24 }}>
              <Card accent={colors.teal}>
                <Badge color={colors.teal} bg={colors.tealLight}>上午</Badge>
                <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 24, fontWeight: 700, color: colors.teal }}>~1 小时</div>
                <p style={{ fontSize: 14, lineHeight: 1.7, margin: "8px 0 0" }}>上午小睡</p>
              </Card>
              <Card accent={colors.accent}>
                <Badge color={colors.accent} bg={colors.accentLight}>下午</Badge>
                <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 24, fontWeight: 700, color: colors.accent }}>~2 小时</div>
                <p style={{ fontSize: 14, lineHeight: 1.7, margin: "8px 0 0" }}>下午小睡</p>
              </Card>
            </div>

            <Card>
              <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 17, fontWeight: 700, color: colors.navy, marginBottom: 12 }}>&#128736; 白天工具箱（下次喂奶前的短暂过桥）</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 12 }}>
                {[
                  { icon: "&#128996;", label: "安抚奶嘴" },
                  { icon: "&#128186;", label: "小躺椅 / 震动椅" },
                  { icon: "&#127920;", label: "秋千" },
                  { icon: "&#128700;", label: "换尿布" },
                  { icon: "&#127795;", label: "换环境、出门走走" },
                  { icon: "&#128137;", label: "肚子不舒服时的辅助手段" },
                  { icon: "&#128118;", label: "趴着练习或轻微走动" },
                ].map((item, i) => (
                  <div key={i} style={{ background: colors.accentLight, borderRadius: 10, padding: "12px 16px", fontSize: 14, color: colors.text }}>
                    <span dangerouslySetInnerHTML={{ __html: item.icon }} /> {item.label}
                  </div>
                ))}
              </div>
            </Card>

            <div style={{ marginTop: 20 }}>
              <Callout type="info" title="需要结合宝宝状态判断">
                很多现代睡眠顾问会认为 12 周宝宝通常还需要 3 到 4 个小睡，而不只是 2 个。如果宝宝明显累过头，就不要被书里的固定节奏绑死。
              </Callout>
            </div>
          </Section>

          {/* Chapter 7 */}
          <Section>
            <SectionTitle sub="环境建议很经典，也和今天多数建议并不冲突。">第 7 章：睡眠环境</SectionTitle>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 16 }}>
              {[
                { icon: "&#128716;", label: "固定的睡眠地点" },
                { icon: "&#127761;", label: "尽量黑的房间" },
                { icon: "&#127925;", label: "白噪音可用，但别变成唯一睡眠道具" },
                { icon: "&#127777;&#65039;", label: "20–22\u00B0C 左右的舒适室温" },
                { icon: "&#9728;&#65039;", label: "明确区分白天和夜晚的光线与刺激水平" },
              ].map((item, i) => (
                <div key={i} style={{ background: colors.card, borderRadius: 14, padding: 20, textAlign: "center", border: `1px solid ${colors.border}` }}>
                  <div style={{ fontSize: 32 }} dangerouslySetInnerHTML={{ __html: item.icon }} />
                  <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 14, color: colors.text, marginTop: 10, lineHeight: 1.5 }}>{item.label}</div>
                </div>
              ))}
            </div>

            <Card style={{ marginTop: 24 }}>
              <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 17, fontWeight: 700, color: colors.navy, marginBottom: 12 }}>&#127769; 短而固定的睡前流程</div>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center", justifyContent: "center" }}>
                {["洗澡", "换尿布", "穿睡衣", "喂奶", "清醒放床"].map((step, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={{ background: colors.accentLight, color: colors.accent, padding: "8px 16px", borderRadius: 20, fontSize: 14, fontWeight: 600 }}>{step}</div>
                    {i < 4 && <span style={{ color: colors.textLight, fontSize: 18 }}>&rarr;</span>}
                  </div>
                ))}
              </div>
            </Card>
          </Section>

          {/* Chapter 8 */}
          <Section bg={colors.card}>
            <SectionTitle color={colors.gold} sub="作者用了一个很好记的比喻：刚建立的作息像刚放进冰箱的果冻，还没完全定型前，别老去晃它。">第 8 章：回归、波动与&quot;果冻定型&quot;比喻</SectionTitle>

            <Card style={{ background: colors.goldLight, border: `2px solid ${colors.gold}40` }}>
              <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 20, fontWeight: 700, color: colors.gold, marginBottom: 12, textAlign: "center" }}>&#129523; 果冻比喻</div>
              <p style={{ fontSize: 16, lineHeight: 1.7, margin: 0, textAlign: "center", color: colors.navy }}>刚建立的作息像刚放进冰箱的果冻，<strong>还没完全定型前，别老去晃它。</strong></p>
            </Card>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16, marginTop: 24 }}>
              <Card accent={colors.green}>
                <Badge color={colors.green} bg={colors.greenLight}>建议</Badge>
                <p style={{ fontSize: 15, lineHeight: 1.7, margin: "8px 0 0" }}>前 6 个月尽量严格执行</p>
              </Card>
              <Card accent={colors.gold}>
                <Badge color={colors.gold} bg={colors.goldLight}>波动期</Badge>
                <p style={{ fontSize: 15, lineHeight: 1.7, margin: "8px 0 0" }}>出现出牙、翻身、感冒等阶段性波动时，不要马上放弃方法</p>
              </Card>
              <Card accent={colors.teal}>
                <Badge color={colors.teal} bg={colors.tealLight}>生病时</Badge>
                <p style={{ fontSize: 15, lineHeight: 1.7, margin: "8px 0 0" }}>先照顾恢复；病好以后尽快回到节律</p>
              </Card>
            </div>
          </Section>
        </>
      )}

      {/* ==================== SCHEDULE TAB ==================== */}
      {activeTab === "schedule" && (
        <>
          <Section>
            <SectionTitle sub="这是目标状态，不是第一天就能直接做到的时间表。">一页看懂：作者推荐的目标作息</SectionTitle>

            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", background: colors.card, borderRadius: 12, overflow: "hidden", fontSize: 15 }}>
                <thead>
                  <tr style={{ background: `linear-gradient(135deg, ${colors.navy}, ${colors.accent})`, color: "#fff" }}>
                    <th style={{ padding: "14px 20px", textAlign: "left", fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 700, fontSize: 16 }}>&#128337; 时间</th>
                    <th style={{ padding: "14px 20px", textAlign: "left", fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 700, fontSize: 16 }}>&#128221; 事项</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { time: "7:00", event: "起床，第一顿奶", highlight: true },
                    { time: "9:00–10:00", event: "上午小睡", highlight: false },
                    { time: "11:00", event: "第二顿奶", highlight: true },
                    { time: "12:00–14:00", event: "下午小睡", highlight: false },
                    { time: "15:00", event: "第三顿奶", highlight: true },
                    { time: "17:30–18:00", event: "可选短小睡", highlight: false },
                    { time: "19:00", event: "第四顿奶，清醒放床", highlight: true },
                    { time: "19:00–7:00", event: "目标夜间长睡眠", highlight: false },
                  ].map((row, i) => (
                    <tr key={i} style={{ borderBottom: `1px solid ${colors.border}`, background: row.highlight ? colors.accentLight : colors.card }}>
                      <td style={{ padding: "14px 20px", fontWeight: 700, color: colors.navy, fontFamily: "'Playfair Display', Georgia, serif", fontSize: 15, whiteSpace: "nowrap" }}>{row.time}</td>
                      <td style={{ padding: "14px 20px", color: colors.text }}>{row.event}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <Card style={{ marginTop: 20, background: colors.goldLight, border: `1px solid ${colors.gold}40`, textAlign: "center" }}>
              <p style={{ fontSize: 15, lineHeight: 1.7, margin: 0, fontStyle: "italic", color: colors.navy }}>这是目标状态，不是第一天就能直接做到的时间表。</p>
            </Card>
          </Section>
        </>
      )}

      {/* ==================== CHECKLIST TAB ==================== */}
      {activeTab === "checklist" && (
        <>
          {/* Expandable 3-Step Cards */}
          <Section>
            <SectionTitle sub="三步走，循序渐进地建立整套睡眠节律。">实操清单</SectionTitle>

            {/* Prerequisites Checklist */}
            <Card style={{ marginBottom: 32, background: colors.indigoLight, border: `2px solid ${colors.indigo}40` }}>
              <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 20, fontWeight: 700, color: colors.indigo, marginBottom: 16 }}>&#9989; 开始前确认</div>
              <CheckItem>宝宝体重达到最低要求</CheckItem>
              <CheckItem>白天奶量能到 24 oz 以上</CheckItem>
              <CheckItem>月龄达到最低标准</CheckItem>
              <CheckItem>儿科医生没有反对意见</CheckItem>
              <CheckItem>两位照护者对方法达成一致</CheckItem>
              <CheckItem>婴儿床、遮光、温度等环境准备到位</CheckItem>
            </Card>

            <SCard
              num="1"
              title="白天拉开喂养间隔"
              subtitle="整套方法的地基"
              color={colors.accent}
              bg={colors.accentLight}
              icon="&#127860;"
              isOpen={openStep === 0}
              toggle={() => setOpenStep(openStep === 0 ? -1 : 0)}
              details={
                <div>
                  <CheckItem>先选定你的 12 小时白天窗口</CheckItem>
                  <CheckItem>逐步把喂奶间隔往 4 小时靠近</CheckItem>
                  <CheckItem>过渡阶段继续按需夜奶</CheckItem>
                  <CheckItem>记录每次摄入量与排泄量</CheckItem>
                </div>
              }
            />

            <SCard
              num="2"
              title="减少夜奶"
              subtitle="缓慢递减，不要突然硬停"
              color={colors.gold}
              bg={colors.goldLight}
              icon="&#127769;"
              isOpen={openStep === 1}
              toggle={() => setOpenStep(openStep === 1 ? -1 : 1)}
              details={
                <div>
                  <CheckItem>先从喝得较少的那顿开始</CheckItem>
                  <CheckItem>每 3 晚减少 0.5 oz</CheckItem>
                  <CheckItem>注意白天奶量是否补上来</CheckItem>
                  <CheckItem>取消一顿后再处理下一顿</CheckItem>
                </div>
              }
            />

            <SCard
              num="3"
              title="建立独立入睡"
              subtitle="最关键的一步：清醒放床"
              color={colors.teal}
              bg={colors.tealLight}
              icon="&#128716;"
              isOpen={openStep === 2}
              toggle={() => setOpenStep(openStep === 2 ? -1 : 2)}
              details={
                <div>
                  <CheckItem>流程尽量短且固定</CheckItem>
                  <CheckItem>清醒放床</CheckItem>
                  <CheckItem>哭时先等 3–5 分钟</CheckItem>
                  <CheckItem>进去安抚时尽量不抱起</CheckItem>
                  <CheckItem>所有照护者保持一致</CheckItem>
                </div>
              }
            />
          </Section>
        </>
      )}

      {/* ==================== BALANCE TAB ==================== */}
      {activeTab === "balance" && (
        <>
          <Section>
            <SectionTitle sub="这本书最值得保留和最需要保留怀疑的地方。">平衡视角</SectionTitle>

            <Callout type="warn" title="阅读这本书时要同时记住这几件事">
              <ol style={{ paddingLeft: 20, margin: "8px 0 0" }}>
                <li style={{ marginBottom: 8 }}><strong>对母乳家庭不够友好。</strong>夜间长时间不泵奶可能影响奶量。</li>
                <li style={{ marginBottom: 8 }}><strong>对小睡需求估计偏少。</strong>很多 12 周宝宝仍需要 3–4 个小睡。</li>
                <li style={{ marginBottom: 8 }}><strong>有限哭法并不适合所有宝宝。</strong>有些宝宝被放着哭会越哭越激烈。</li>
                <li style={{ marginBottom: 8 }}><strong>12 周睡整夜是一个很激进的目标。</strong>做不到不代表失败。</li>
                <li><strong>一定优先遵守当下的安全睡眠指南。</strong>原书较早出版，今天的 AAP 建议更重要。</li>
              </ol>
            </Callout>
          </Section>

          {/* TL;DR */}
          <Section bg={colors.card}>
            <SectionTitle color={colors.accent}>TL;DR</SectionTitle>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {[
                { num: "1", text: "睡眠可以被教，但前提是宝宝已经准备好。", color: colors.accent },
                { num: "2", text: "白天吃够，是夜里睡更长的基础。", color: colors.teal },
                { num: "3", text: "夜奶要慢慢减，不要突然硬停。", color: colors.gold },
                { num: "4", text: "清醒放床，是整套方法里最关键的动作。", color: colors.indigo },
                { num: "5", text: "一致性非常重要，但不应该凌驾于安全和家庭现实之上。", color: colors.rose },
                { num: "6", text: "这本书最适合拿来作为「建立结构感」的工具，而不是拿来严格逐字执行。", color: colors.green },
              ].map((item) => (
                <div key={item.num} style={{ display: "flex", gap: 16, alignItems: "flex-start", padding: "16px 20px", background: `${item.color}10`, borderRadius: 12, borderLeft: `4px solid ${item.color}` }}>
                  <div style={{ width: 36, height: 36, borderRadius: "50%", background: item.color, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Playfair Display', Georgia, serif", fontSize: 18, fontWeight: 700, flexShrink: 0 }}>{item.num}</div>
                  <p style={{ fontSize: 16, lineHeight: 1.6, margin: 0, color: colors.text }}>{item.text}</p>
                </div>
              ))}
            </div>
          </Section>
        </>
      )}

      {/* CONCLUSION */}
      <div style={{ background: `linear-gradient(135deg, ${colors.navy} 0%, #1a2440 50%, #2a3a5a 100%)`, padding: "56px 24px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, opacity: 0.05, background: "radial-gradient(circle at 70% 30%, rgba(200,160,74,0.4) 0%, transparent 60%)" }}></div>
        <div style={{ position: "relative", maxWidth: 720, margin: "0 auto", textAlign: "center" }}>
          <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", color: colors.gold, marginBottom: 12 }}>结语</div>
          <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 32, fontWeight: 800, color: "#fff", margin: 0, lineHeight: 1.2 }}>建立结构，尊重节奏</h2>
          <p style={{ fontSize: 17, color: "rgba(255,255,255,0.7)", marginTop: 16, lineHeight: 1.7, maxWidth: 600, margin: "16px auto 0" }}>睡眠训练的终极目标不是让宝宝服从时间表，而是让全家找到可持续的生活节奏。</p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 16, marginTop: 32 }}>
            {[
              { icon: "&#127769;", stat: "12h", label: "目标夜间长睡眠" },
              { icon: "&#9790;", stat: "4 次", label: "白天规律喂养" },
              { icon: "&#128716;", stat: "清醒", label: "放床时的理想状态" },
              { icon: "&#128165;", stat: "一致", label: "成功最重要的因素" },
            ].map((item, i) => (
              <div key={i} style={{ background: "rgba(255,255,255,0.08)", borderRadius: 14, padding: 20, border: "1px solid rgba(255,255,255,0.1)" }}>
                <div style={{ fontSize: 28 }} dangerouslySetInnerHTML={{ __html: item.icon }} />
                <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 24, fontWeight: 700, color: colors.gold, marginTop: 8 }}>{item.stat}</div>
                <div style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", marginTop: 4, lineHeight: 1.4 }}>{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div style={{ background: colors.navy, padding: "32px 24px", textAlign: "center" }}>
        <p style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", margin: 0, lineHeight: 1.6 }}>这份笔记基于公开可得的评论、摘要与讨论整理而成。<br />这是学习笔记，不能替代医疗建议。请始终咨询你的儿科医生。</p>
      </div>

      {/* COMMENTS */}
      <Section>
        <GiscusComments locale="zh" term="/reading-notes/twelve-hours-sleep" />
      </Section>
    </div>
  );
}
