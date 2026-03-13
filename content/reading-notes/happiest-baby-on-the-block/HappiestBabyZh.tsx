"use client";

import { useState } from "react";
import { Callout } from "@/components/Callout";
import { GiscusComments } from "@/components/GiscusComments";

const colors = {
  bg: "#FDF6EE",
  card: "#FFFFFF",
  accent: "#E8725A",
  accentLight: "#FFF0EC",
  teal: "#3A8A8C",
  tealLight: "#E8F4F4",
  navy: "#2C3E5A",
  gold: "#D4A853",
  goldLight: "#FDF5E6",
  lavender: "#7B6FA6",
  lavenderLight: "#F0ECF7",
  green: "#5A9E6F",
  greenLight: "#EDF7F0",
  rose: "#C75B7A",
  roseLight: "#FCEEF3",
  text: "#2C3E5A",
  textLight: "#6B7B94",
  border: "#E8DFD4",
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
  <div style={{ background: colors.card, borderRadius: 16, padding: 28, border: `1px solid ${colors.border}`, borderLeft: accent ? `4px solid ${accent}` : undefined, marginBottom: 20, boxShadow: "0 2px 12px rgba(44,62,90,0.04)", ...style }}>{children}</div>
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
      <div style={{ fontSize: 20, color: colors.textLight, transition: "transform 0.2s", transform: isOpen ? "rotate(180deg)" : "rotate(0)" }}>▼</div>
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

const TimelineItem = ({ age, title, desc, color }: { age: string; title: string; desc: string; color: string }) => (
  <div style={{ display: "flex", gap: 20, marginBottom: 24 }}>
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div style={{ width: 44, height: 44, borderRadius: "50%", background: `${color}20`, border: `2px solid ${color}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color }}>{age}</div>
      <div style={{ width: 2, flex: 1, background: colors.border, marginTop: 8 }}></div>
    </div>
    <div style={{ flex: 1 }}>
      <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 17, fontWeight: 700, color: colors.navy }}>{title}</div>
      <p style={{ fontSize: 14, lineHeight: 1.7, color: colors.textLight, marginTop: 4 }}>{desc}</p>
    </div>
  </div>
);

export default function HappiestBabySummaryZh() {
  const [openS, setOpenS] = useState(0);
  const [activeTab, setActiveTab] = useState("overview");

  const tabs = [
    { id: "overview", label: "概览" },
    { id: "why-cry", label: "为什么哭" },
    { id: "five-s", label: "5S 安抚法" },
    { id: "sleep", label: "睡眠指南" },
    { id: "more-remedies", label: "更多方法" },
    { id: "red-flags", label: "警示信号" },
  ];

  return (
    <div style={{ background: colors.bg, fontFamily: "'Source Sans 3', sans-serif", color: colors.text, minHeight: "100vh" }}>
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700;800&family=Source+Sans+3:wght@300;400;600;700&display=swap" rel="stylesheet" />

      {/* HERO */}
      <div style={{ background: `linear-gradient(135deg, ${colors.navy} 0%, #1a2a40 100%)`, padding: "56px 24px 48px", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, opacity: 0.06, background: "repeating-linear-gradient(45deg, transparent, transparent 30px, rgba(255,255,255,0.1) 30px, rgba(255,255,255,0.1) 60px)" }}></div>
        <div style={{ position: "relative", maxWidth: 720, margin: "0 auto" }}>
          <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", color: colors.gold, marginBottom: 16 }}>新手父母完整指南</div>
          <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 40, fontWeight: 800, color: "#fff", margin: 0, lineHeight: 1.15 }}>《最快乐的宝宝》读书笔记</h1>
          <p style={{ fontSize: 17, color: "rgba(255,255,255,0.7)", marginTop: 12, lineHeight: 1.5 }}>Harvey Karp 医学博士 著 — 基于科学研究的安抚哭闹、改善婴儿睡眠方法全面梳理</p>
          <div style={{ display: "flex", justifyContent: "center", gap: 32, marginTop: 32, flexWrap: "wrap" }}>
            <StatBox num="5S" label="核心安抚步骤" color={colors.gold} />
            <StatBox num="第四" label="孕期概念" color={colors.accent} />
            <StatBox num="0–4 月" label="关键窗口期" color={colors.teal} />
          </div>
        </div>
      </div>

      {/* SUPPORT THE AUTHOR */}
      <Section>
        <Callout type="warn" title="先支持原书作者">
          这是一份中文梳理版笔记，方便快速回顾核心方法，不是原书复刻。如果你觉得这套方法适合自己，建议直接购买原书 <em>The Happiest Baby on the Block</em>，阅读完整案例、背景和细节。
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

      {/* OVERVIEW TAB */}
      {activeTab === "overview" && (
        <>
          <Section>
            <SectionTitle sub="Karp 医生的整套方法建立在四个相互关联的核心理念之上，解释了宝宝为什么哭以及如何止哭。">四大核心原则</SectionTitle>

            <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
              <FlowBox color={colors.accent} bg={colors.accentLight}>🤰 <strong>缺失的"第四孕期"</strong><br /><span style={{ fontWeight: 400, fontSize: 14 }}>人类婴儿"早产"了 3 个月——出生后仍需要类似子宫的环境才能安稳</span></FlowBox>
              <FlowArrow />
              <FlowBox color={colors.teal} bg={colors.tealLight}>🧠 <strong>镇静反射</strong><br /><span style={{ fontWeight: 400, fontSize: 14 }}>一个神经层面的"止哭开关"——需要以正确的强度模拟子宫感觉才能触发</span></FlowBox>
              <FlowArrow />
              <FlowBox color={colors.lavender} bg={colors.lavenderLight}>🖐️ <strong>5S 安抚法</strong><br /><span style={{ fontWeight: 400, fontSize: 14 }}>襁褓（Swaddling）、侧卧/俯卧（Side/Stomach）、嘘声（Shushing）、摇晃（Swinging）、吮吸（Sucking）——模拟子宫的五个步骤</span></FlowBox>
              <FlowArrow />
              <FlowBox color={colors.gold} bg={colors.goldLight}>💛 <strong>拥抱疗法（Cuddle Cure）</strong><br /><span style={{ fontWeight: 400, fontSize: 14 }}>同时叠加多个 S——每个宝宝都有自己偏好的组合</span></FlowBox>
            </div>
          </Section>

          <Section bg={colors.card}>
            <SectionTitle color={colors.accent} sub="马、牛出生当天就能站立行走，但人类婴儿在出生时极度不成熟。因为大脑太大，必须提前'出生'，否则会卡在产道里。">为什么说「第四孕期」？</SectionTitle>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: 20 }}>
              <Card accent={colors.accent}>
                <Badge color={colors.accent} bg={colors.accentLight}>问题</Badge>
                <p style={{ fontSize: 15, lineHeight: 1.7, margin: "8px 0 0" }}>出生后，宝宝突然面对陌生的光线、声音、气味和触觉——同时又失去了子宫里持续的摇晃、温暖和噪音。这种<strong>过度刺激 + 感觉剥夺</strong>的组合才是引发哭闹的根本原因。</p>
              </Card>
              <Card accent={colors.teal}>
                <Badge color={colors.teal} bg={colors.tealLight}>解决方案</Badge>
                <p style={{ fontSize: 15, lineHeight: 1.7, margin: "8px 0 0" }}>在出生后的头 3–4 个月重建子宫体验。这不是"宠坏"孩子——而是给他们尚未成熟的神经系统提供必要的节奏性刺激，直到大脑成熟到足以应对外部世界（约 4 个月）。</p>
              </Card>
            </div>

            <Card style={{ marginTop: 20, background: colors.goldLight, border: `1px solid ${colors.gold}40` }}>
              <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 17, fontWeight: 700, color: colors.navy, marginBottom: 8 }}>💡 核心洞察：新生儿不会被"宠坏"</div>
              <p style={{ fontSize: 15, lineHeight: 1.7, margin: 0 }}>约翰·霍普金斯大学的研究（Bell & Ainsworth, 1972）表明，在婴儿早期迅速回应其需求的父母，孩子在一岁时反而<em>更加</em>从容、耐心和信任他人。通过持续的回应建立信任，形成"安全依恋"——这是终身情感健康的基础。设定界限和培养独立性在大约 9 个月后才合适。</p>
            </Card>
          </Section>

          <Section>
            <SectionTitle sub="在子宫里，宝宝 24 小时处于非常特定的环境中。这些条件就是安抚的关键。">子宫里的生活是什么样的</SectionTitle>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 16 }}>
              {[
                { icon: "🫂", label: "紧紧包裹", desc: "蜷缩的胎儿姿势，被子宫壁持续拥抱" },
                { icon: "🌊", label: "持续运动", desc: "妈妈每走一步都在摇晃和颠簸，包括运动时" },
                { icon: "🔊", label: "大声嘈杂", desc: "血液流经胎盘的嘶嘶声——比吸尘器还响" },
                { icon: "🌡️", label: "温暖舒适", desc: "恒定的温度，没有冷风或突然的变化" },
                { icon: "🤲", label: "持续触觉", desc: "子宫壁的丝绒般触感提供不间断的触觉刺激" },
              ].map((item, i) => (
                <div key={i} style={{ background: colors.card, borderRadius: 14, padding: 20, textAlign: "center", border: `1px solid ${colors.border}` }}>
                  <div style={{ fontSize: 32 }}>{item.icon}</div>
                  <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 15, fontWeight: 700, color: colors.navy, marginTop: 8 }}>{item.label}</div>
                  <div style={{ fontSize: 13, color: colors.textLight, marginTop: 6, lineHeight: 1.5 }}>{item.desc}</div>
                </div>
              ))}
            </div>
          </Section>

          <Section bg={colors.card}>
            <SectionTitle color={colors.gold} sub="肠绞痛并非普遍现象——它与文化密切相关。这些跨文化案例是 Karp 论证的核心：西方婴儿哭得更多，是因为我们无意中剥夺了他们类似子宫的照护。">跨文化证据</SectionTitle>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 20 }}>
              <Card accent={colors.gold}>
                <Badge color={colors.gold} bg={colors.goldLight}>博茨瓦纳 — !Kung San 族</Badge>
                <p style={{ fontSize: 14, lineHeight: 1.7 }}>母亲用皮革背带几乎 24 小时携带婴儿，每走一步都在颠簸。她们每天哺乳 50–100 次，包括整个夜间。持续性哭闹几乎不存在。</p>
              </Card>
              <Card accent={colors.teal}>
                <Badge color={colors.teal} bg={colors.tealLight}>巴厘岛</Badge>
                <p style={{ fontSize: 14, lineHeight: 1.7 }}>婴儿在出生后的前 105 天被持续抱着，几乎从不离开大人的怀抱。一个仪式专门标记婴儿双脚第一次触地的时刻——因为在此之前这种情况几乎不会发生。</p>
              </Card>
              <Card accent={colors.lavender}>
                <Badge color={colors.lavender} bg={colors.lavenderLight}>核心启示</Badge>
                <p style={{ fontSize: 14, lineHeight: 1.7 }}>这些文化的婴儿并不特殊——他们的育儿方式恰好无意中 24 小时重建了子宫环境。我们文化中的安静房间、平坦婴儿床和静止摇篮才是异类，不是他们。</p>
              </Card>
            </div>

            <Card style={{ marginTop: 20, background: colors.roseLight, border: `1px solid ${colors.rose}40` }}>
              <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 17, fontWeight: 700, color: colors.rose, marginBottom: 8 }}>📖 母乳喂养的近乎消亡</div>
              <p style={{ fontSize: 14, lineHeight: 1.7, margin: 0 }}>到 1950 年代，工业化生产的配方奶几乎取代了西方的母乳喂养。医生将其宣传为更"卫生"的选择。到 1960 年代，坚持母乳喂养的女性被视为异类。拉玛泽联盟和后续研究推动了回归，但文化断层意味着几代母亲失去了"第四孕期"照护的直觉知识——持续抱持、频繁哺乳和节奏性安抚——这些是其他文化从未放弃的。</p>
            </Card>
          </Section>
        </>
      )}

      {/* WHY BABIES CRY TAB */}
      {activeTab === "why-cry" && (
        <>
          <Section>
            <SectionTitle sub="理解婴儿为什么哭——以及为什么传统理论大多是错的——是解开谜题的关键。">肠绞痛之谜</SectionTitle>

            <Card>
              <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 18, fontWeight: 700, color: colors.navy, marginBottom: 12 }}>什么是肠绞痛？</div>
              <p style={{ fontSize: 15, lineHeight: 1.7, margin: 0 }}>旧的"三原则"（每天哭 3 小时以上、每周 3 天以上、持续 3 周以上）已基本被弃用。如今医生使用<strong>持续性或难以安抚的哭闹</strong>这一说法。约 50% 的婴儿每天烦躁 2 小时以上；10–15% 哭 3 小时以上。通常在出生后约 2 周开始，6–8 周达到高峰，3–4 个月时消退。</p>
            </Card>

            <Card style={{ marginTop: 4, background: colors.lavenderLight, border: `1px solid ${colors.lavender}40` }}>
              <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 17, fontWeight: 700, color: colors.lavender, marginBottom: 12 }}>🗣️ 宝宝的"三个词汇"</div>
              <p style={{ fontSize: 14, lineHeight: 1.7, marginBottom: 16 }}>哭声不是随机噪音——它是宝宝的语言。Karp 描述了三种递进的模式，每种都在传达不同的信息：</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {[
                  { level: "呜咽", desc: "轻柔的烦躁——宝宝在说「我有点不舒服」。通常是一个预热信号，说明有小问题需要处理（饿了、无聊、轻微不适）。", color: colors.green, bg: colors.greenLight },
                  { level: "哭泣", desc: "完整的、有节奏的哭声——标准的「我现在需要你」呼唤。足够大声，让你在房间另一头都能听到。大多数父母很快就能读懂这种哭声。", color: colors.gold, bg: colors.goldLight },
                  { level: "尖叫", desc: "撕心裂肺的、能震碎玻璃的尖叫——宝宝的紧急警报。一旦进入全力尖叫模式，婴儿会「因痛苦而失聪」，真的听不到你的安抚。你必须先匹配他们的强度才能突破。", color: colors.accent, bg: colors.accentLight },
                ].map((item, i) => (
                  <div key={i} style={{ display: "flex", gap: 14, padding: 14, background: item.bg, borderRadius: 10, borderLeft: `4px solid ${item.color}` }}>
                    <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 15, fontWeight: 700, color: item.color, minWidth: 50 }}>{item.level}</div>
                    <div style={{ fontSize: 14, lineHeight: 1.6, color: colors.text }}>{item.desc}</div>
                  </div>
                ))}
              </div>
              <p style={{ fontSize: 13, lineHeight: 1.6, color: colors.textLight, marginTop: 12, fontStyle: "italic" }}>核心要点：哭声越大越急迫，你的 5S 回应就必须越有力。轻柔的嘘声无法触及一个尖叫中的宝宝——你需要先匹配强度，然后随着宝宝平静下来逐渐降低。</p>
            </Card>

            <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 20, fontWeight: 700, color: colors.navy, margin: "32px 0 16px" }}>肠绞痛的 10 条普遍线索</div>
            <p style={{ fontSize: 15, lineHeight: 1.7, color: colors.textLight, marginBottom: 20 }}>真正的肠绞痛病因必须能解释<em>全部十条</em>规律。这正是 Karp 医生排除五种传统理论的方式：</p>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 12 }}>
              {[
                "约 2 周开始，约 8 周高峰，约 3 个月结束",
                "早产儿也会有肠绞痛，但从不在预产期之前",
                "哭声突然出现/消失，听起来像疼痛",
                "常在喂奶期间或喂奶后开始",
                "母乳宝宝和配方奶宝宝的肠绞痛发生率相同",
                "傍晚加重（'巫婆时刻'）",
                "第 5 个孩子和第 1 个一样可能发生——与经验无关",
                "剧烈摇晃、抱持或噪音可暂时止哭",
                "哭闹间隙宝宝表现快乐健康",
                "在某些文化中，肠绞痛罕见或不存在",
              ].map((clue, i) => (
                <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start", background: i % 2 === 0 ? colors.tealLight : colors.card, padding: 14, borderRadius: 10, border: `1px solid ${colors.border}` }}>
                  <div style={{ width: 28, height: 28, borderRadius: "50%", background: colors.teal, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, flexShrink: 0 }}>{i + 1}</div>
                  <div style={{ fontSize: 14, lineHeight: 1.5, color: colors.text }}>{clue}</div>
                </div>
              ))}
            </div>
          </Section>

          <Section bg={colors.card}>
            <SectionTitle color={colors.rose} sub="每种理论听起来都合理，但没有一种能解释全部 10 条线索。">五大理论——为什么（大多）是错的</SectionTitle>

            {[
              { theory: "肠胃小毛病（胀气、肠痉挛）", verdict: "胀气从出生起就存在，且在肠绞痛结束后仍然继续。所有婴儿都有胀气，但安静的宝宝不会哭。消胀气滴剂（西甲硅油）的效果并不比水好。如果胀气是原因，坐车就不该有用。", color: colors.accent },
              { theory: "肠胃大问题（过敏、反流、细菌）", verdict: "只有 5–10% 的肠绞痛有消化道原因。抗酸药的效果不比安慰剂好。益生菌结果喜忧参半。无乳糖配方奶没有帮助。如果反流是原因，摇晃只会更糟。", color: colors.lavender },
              { theory: "母亲焦虑", verdict: "焦虑的妈妈不是引起肠绞痛的原因——肠绞痛的宝宝才是引起焦虑的原因。如果焦虑导致肠绞痛，初产妈妈的宝宝应该比经验丰富的妈妈更烦躁，但发生率与胎次无关。", color: colors.rose },
              { theory: "大脑不成熟 / 过度刺激", verdict: "接近正确，但如果仅是不成熟导致肠绞痛，早产儿应该最严重。实际上并非如此。而且大脑同样不成熟的其他文化婴儿可以完全没有肠绞痛。", color: colors.teal },
              { theory: "性格难带", verdict: "性格确实有影响，但不能是根本原因——如果是的话，肠绞痛应该在 4 个月后加重（性格是终身的），而且每种文化的发生率应该相同。", color: colors.gold },
            ].map((item, i) => (
              <Card key={i} accent={item.color}>
                <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 16, fontWeight: 700, color: item.color }}>理论 {i + 1}：{item.theory}</div>
                <p style={{ fontSize: 14, lineHeight: 1.7, margin: "8px 0 0", color: colors.textLight }}>{item.verdict}</p>
              </Card>
            ))}

            <Card style={{ background: colors.accentLight, border: `2px solid ${colors.accent}` }}>
              <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 18, fontWeight: 700, color: colors.accent, marginBottom: 8 }}>✅ 真正的原因：缺失的第四孕期</div>
              <p style={{ fontSize: 15, lineHeight: 1.7, margin: 0 }}>当性格敏感或自我安抚能力差的婴儿被剥夺了子宫中的镇静节律时，肠绞痛就会发生。Karp 医生的公式：</p>
              <div style={{ background: colors.card, borderRadius: 10, padding: 16, marginTop: 12, textAlign: "center", fontFamily: "'Playfair Display', Georgia, serif", fontSize: 15, color: colors.navy }}>
                肠绞痛 = [过度刺激 + 完全静止] − 节律性安抚 ÷（性格 + 大脑成熟度）
              </div>
              <p style={{ fontSize: 14, lineHeight: 1.7, margin: "12px 0 0", color: colors.textLight }}>性格温和、自我安抚能力好的宝宝能顺利过渡。但敏感或激烈型的宝宝需要类似子宫的节律来触发镇静反射——而且需要以<em>正确的方式</em>执行。</p>
            </Card>
          </Section>

          <Section>
            <SectionTitle sub="两种性格类型在早期几个月尤其具有挑战性。">宝宝的性格类型</SectionTitle>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 20 }}>
              <Card accent={colors.green}>
                <Badge color={colors.green} bg={colors.greenLight}>随和型</Badge>
                <p style={{ fontSize: 14, lineHeight: 1.7 }}>这些"冲浪者"从容应对世界。轻微烦躁、容易安抚，只需 1–2 个 S。他们能轻松度过第四孕期。</p>
              </Card>
              <Card accent={colors.lavender}>
                <Badge color={colors.lavender} bg={colors.lavenderLight}>敏感型</Badge>
                <p style={{ fontSize: 14, lineHeight: 1.7 }}>警觉且敏锐——电话铃会吓一跳，强烈的味道会让他们叫起来。对一切都开放但无法自我安抚。喂奶时可能会转移目光（视线回避）——这表示"太近了"，不是"我不喜欢你"。</p>
              </Card>
              <Card accent={colors.accent}>
                <Badge color={colors.accent} bg={colors.accentLight}>激烈型 / 热情型</Badge>
                <p style={{ fontSize: 14, lineHeight: 1.7 }}>日常的小火花落在他们"炸药"般的性格上。一旦开始大哭，即使得到了想要的东西也很难停下来。需要 4–5 个 S 并且要有力度。往往日后会成为笑得最大声的孩子。</p>
              </Card>
            </div>
          </Section>
        </>
      )}

      {/* THE 5 S's TAB */}
      {activeTab === "five-s" && (
        <>
          <Section>
            <SectionTitle sub="把安抚宝宝想象成烘焙蛋糕——知道食材没用，你得知道每种用多少、什么顺序、什么力度。精确度很重要。">5S 安抚法：分步详解</SectionTitle>

            <Card style={{ background: colors.goldLight, border: `1px solid ${colors.gold}40`, marginBottom: 32 }}>
              <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 17, fontWeight: 700, color: colors.navy, marginBottom: 8 }}>⚡ 关键法则：反射是全有或全无的</div>
              <p style={{ fontSize: 15, lineHeight: 1.7, margin: 0 }}>就像膝跳反射一样，镇静反射需要<strong>在正确位置以足够强度触发</strong>。敲对膝盖的位置 = 100% 成功。偏差一英寸或力度太轻 = 100% 失败。这就是为什么很多父母尝试摇晃和嘘声却失败了——他们做得太轻、太松，或方式不对。</p>
            </Card>

            {[
              {
                num: "S1", title: "襁褓（Swaddling）", subtitle: "基石——必不可少的第一层", color: colors.accent, bg: colors.accentLight, icon: "🫧",
                details: (
                  <div>
                    <p><strong>为什么有效：</strong>模拟子宫中持续的触感和紧密拥抱。阻止让宝宝更加烦躁的手脚乱挥和惊跳。</p>
                    <p><strong>关键技巧：</strong></p>
                    <ul style={{ paddingLeft: 20 }}>
                      <li>手臂紧贴身体两侧伸直（不要交叉在胸前）</li>
                      <li>最后一折横跨两只手臂，像腰带一样</li>
                      <li>髋部和腿部必须保持松动——膝盖应能自由开合</li>
                      <li>毯子不应轻易松开</li>
                      <li>不要过热——耳朵应略微温暖，不烫</li>
                    </ul>
                    <p><strong>DUDU 包裹法——Karp 的专有技术：</strong></p>
                    <div style={{ background: colors.accentLight, borderRadius: 10, padding: 16, margin: "8px 0 12px" }}>
                      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 12 }}>
                        <div><strong style={{ color: colors.accent }}>D — Down（向下）</strong><br /><span style={{ fontSize: 13 }}>将宝宝右臂放在身侧，将毯子紧密拉过身体塞入左侧下方</span></div>
                        <div><strong style={{ color: colors.accent }}>U — Up（向上）</strong><br /><span style={{ fontSize: 13 }}>将毯子底角直接向上折叠盖住宝宝的脚</span></div>
                        <div><strong style={{ color: colors.accent }}>D — Down（向下）</strong><br /><span style={{ fontSize: 13 }}>将宝宝左臂放在身侧，把剩余的毯子拉过身体</span></div>
                        <div><strong style={{ color: colors.accent }}>U — Up（向上）</strong><br /><span style={{ fontSize: 13 }}>将最后一片向上折并塞到背后——像横跨两只手臂的腰带</span></div>
                      </div>
                      <p style={{ fontSize: 13, color: colors.textLight, margin: "10px 0 0", fontStyle: "italic" }}>名字容易记：下–上–下–上。先用玩偶或泰迪熊练习。练 5–10 次就能成为本能动作。</p>
                    </div>
                    <p><strong>常见错误：</strong>因为宝宝反抗就放弃。宝宝反抗是因为手臂在不自主地乱挥——他们控制不了。包裹能阻止乱挥，让宝宝能集中注意力接受下一个 S。<em>单独的襁褓很少能止哭——它是为下一步做准备。</em></p>
                    <p><strong>使用时长：</strong>从出生到 4–5 个月的所有睡眠都使用。通过先露出一只手臂几天来逐步脱离，然后完全停止。始终配合白噪音使用。</p>
                  </div>
                ),
              },
              {
                num: "S2", title: "侧卧/俯卧（Side/Stomach）", subtitle: "防坠落反射体位（切勿用于睡眠）", color: colors.teal, bg: colors.tealLight, icon: "↪️",
                details: (
                  <div>
                    <p><strong>为什么有效：</strong>仰卧可能触发莫罗反射（"我在坠落！"的反应），将惊吓变成挣扎和尖叫。侧身或俯卧能刺激内耳平衡中心产生类似子宫的感觉。</p>
                    <p><strong>关键技巧：</strong></p>
                    <ul style={{ paddingLeft: 20 }}>
                      <li>至少将宝宝稍微向腹部方向侧翻</li>
                      <li>可以放在你的前臂上（橄榄球抱法）或大腿上</li>
                      <li>对体位敏感的宝宝，即使稍微向后仰也会继续哭</li>
                    </ul>
                    <p style={{ background: "#FEE2E2", padding: "10px 14px", borderRadius: 8, fontWeight: 600 }}>⚠️ 关键安全提示：仰卧是唯一安全的睡眠姿势。侧卧/俯卧仅用于你抱着宝宝时的安抚。永远不要让宝宝侧卧或俯卧入睡。</p>
                    <p><strong>注意：</strong>如果宝宝侧卧时出现觅食反射（转头寻找乳头），先喂奶——他们的脸颊接触你的手臂触发了觅食反射。</p>
                  </div>
                ),
              },
              {
                num: "S3", title: "嘘声（Shushing）", subtitle: "宝宝最爱的声音——比你想象的要响", color: colors.lavender, bg: colors.lavenderLight, icon: "🔊",
                details: (
                  <div>
                    <p><strong>为什么有效：</strong>子宫<em>很吵</em>——血液流经胎盘产生的持续嘶嘶声比吸尘器还响。完全安静对新生儿来说是感觉剥夺。白噪音模拟了这一点，能有力地触发镇静反射。</p>
                    <p><strong>关键技巧：</strong></p>
                    <ul style={{ paddingLeft: 20 }}>
                      <li><strong>安抚哭闹时：</strong>将音量匹配到宝宝的哭声——85–90 分贝，紧贴耳朵。使用高音的"嘘——！"或嘶嘶声</li>
                      <li><strong>促进睡眠时：</strong>使用低沉的隆隆声（如屋顶上的雨声），约 65 分贝——大约淋浴的音量</li>
                      <li>整晚播放，所有睡眠时段，整个第一年</li>
                      <li>避免音调变化的自然音（海浪、蟋蟀）——变化可能唤醒宝宝</li>
                      <li>音乐可以助眠，但如果整晚播放，音调变化可能唤醒宝宝</li>
                    </ul>
                    <p><strong>常见错误：</strong>嘘声太轻。在宝宝耳边大声"嘘——！"感觉不礼貌，但他们喜欢，因为这就是他们在子宫里 24/7 听到的。哭声越大，嘘声就必须越响。</p>
                  </div>
                ),
              },
              {
                num: "S4", title: "摇晃（Swinging）", subtitle: "微小的、抖动的动作——不是大幅慢摇", color: colors.green, bg: colors.greenLight, icon: "〰️",
                details: (
                  <div>
                    <p><strong>为什么有效：</strong>你的宝宝在子宫里随你每一步颠簸了 9 个月。静静躺在平坦的床上对他们来说，就像水手在海上数月后踏上陆地一样陌生。</p>
                    <p><strong>关键技巧：</strong></p>
                    <ul style={{ paddingLeft: 20 }}>
                      <li><strong>安抚哭闹时：</strong>快速、微小的抖动——只需 1–2 英寸，左右摇晃，每秒 2–3 次。想象"颤抖"而非"摇椅"</li>
                      <li><strong>平静/入睡时：</strong>宝宝安静后改为缓慢、轻柔的摇晃</li>
                      <li>始终支撑头部和颈部</li>
                      <li>让头部在你手中微微抖动——像盘子上的果冻</li>
                      <li>秋千、弹力座椅、瑜伽球、开车兜风都有用</li>
                    </ul>
                    <p><strong>Karp 的专有动作：</strong></p>
                    <div style={{ background: colors.greenLight, borderRadius: 10, padding: 16, margin: "8px 0 12px" }}>
                      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                        <div><strong style={{ color: colors.green }}>奶昔摇（The Milk Shake）</strong> — 将包好的宝宝面朝上托在双手中，头枕在指尖。用微小的 1–2 英寸动作快速抖动，像颤抖一样。想象用很短的行程摇晃鸡尾酒摇壶。这是首选的起始动作。</div>
                        <div><strong style={{ color: colors.green }}>雨刷摇（The Windshield Wiper）</strong> — 宝宝趴在你的前臂或大腿上。轻轻左右摆动膝盖（或手臂），像雨刷一样做小弧度摆动。手臂累了时特别好用——用腿来产生运动。</div>
                        <div><strong style={{ color: colors.green }}>果冻头（The Jell-O Head）</strong> — 用张开的双手托住宝宝的头，让它随每个动作微微抖动——像盘子上的一碗果冻。头应该只微微晃动，绝不能甩动。内耳中的这种微小摇晃才是真正激活镇静反射的关键。</div>
                      </div>
                    </div>
                    <p style={{ background: "#FEE2E2", padding: "10px 14px", borderRadius: 8, fontWeight: 600 }}>⚠️ 关键安全提示：这是轻柔的抖动——微小的、可控的动作。永远不要摇晃婴儿。摇晃婴儿综合征涉及暴力的、鞭打式的猛烈晃动，与安全的、有支撑的轻微抖动完全不同。</p>
                    <p><strong>常见错误：</strong>使用大幅度、缓慢的 12 英寸摆动。那只能让安静的宝宝保持安静，对尖叫者没有用。快速、微小的动作才能触发反射。</p>
                  </div>
                ),
              },
              {
                num: "S5", title: "吮吸（Sucking）", subtitle: "锦上添花——将平静深化为安宁", color: colors.rose, bg: colors.roseLight, icon: "🍼",
                details: (
                  <div>
                    <p><strong>为什么有效：</strong>无论是营养性吮吸（母乳/奶瓶）还是非营养性吮吸（安抚奶嘴）都能触发镇静反射。母乳喂养还能缓解饥饿并产生脑内啡。有些文化每天让宝宝吃奶多达 100 次。</p>
                    <p><strong>关键技巧：</strong></p>
                    <ul style={{ paddingLeft: 20 }}>
                      <li>先用其他 S 安抚宝宝再给奶嘴——尖叫时很难含住</li>
                      <li>尝试不同品牌的奶嘴——宝宝有偏好</li>
                      <li><strong>反向心理学技巧：</strong>宝宝开始吮吸后，轻轻把奶嘴拉出来。宝宝会更用力地吸来留住它，增强含住的力量</li>
                      <li>睡前使用奶嘴可降低 SIDS 风险，即使入睡后掉了也有效</li>
                      <li>牙齿萌出后（约 3–4 个月），每次吮吸时间限制在 30 分钟以防龋齿</li>
                    </ul>
                    <p><strong>常见错误：</strong>在宝宝尖叫时就先尝试吮吸。吮吸作为最后一层效果最好，在其他 S 已经开始让宝宝安静下来之后。</p>
                  </div>
                ),
              },
            ].map((s, i) => (
              <SCard key={i} {...s} isOpen={openS === i} toggle={() => setOpenS(openS === i ? -1 : i)} />
            ))}
          </Section>

          <Section bg={colors.card}>
            <SectionTitle color={colors.navy} sub="把 5S 想象成蛋糕的层次。从底层向上搭建。">拥抱疗法：如何组合 5S</SectionTitle>

            <div style={{ position: "relative", padding: "20px 0" }}>
              {[
                { label: "S5：吮吸", color: colors.rose, desc: "蛋糕上的糖霜——维持反射" },
                { label: "S4：摇晃", color: colors.green, desc: "完全触发镇静反射" },
                { label: "S3：嘘声", color: colors.lavender, desc: "打破哭闹循环" },
                { label: "S2：侧卧/俯卧", color: colors.teal, desc: "消除坠落感" },
                { label: "S1：襁褓", color: colors.accent, desc: "基础——停止乱挥" },
              ].map((layer, i) => (
                <div key={i} style={{ background: `${layer.color}18`, borderLeft: `4px solid ${layer.color}`, padding: "14px 20px", marginBottom: 4, borderRadius: "0 10px 10px 0", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
                  <span style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 16, fontWeight: 700, color: layer.color }}>{layer.label}</span>
                  <span style={{ fontSize: 13, color: colors.textLight }}>{layer.desc}</span>
                </div>
              ))}
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16, marginTop: 24 }}>
              <Card accent={colors.green}>
                <Badge color={colors.green} bg={colors.greenLight}>随和型宝宝</Badge>
                <p style={{ fontSize: 14, lineHeight: 1.7 }}>只需 1–2 个 S。通常仅靠嘘声或襁褓 + 轻柔摇晃就能安静。</p>
              </Card>
              <Card accent={colors.gold}>
                <Badge color={colors.gold} bg={colors.goldLight}>中度烦躁型</Badge>
                <p style={{ fontSize: 14, lineHeight: 1.7 }}>需要 3–4 个 S 叠加使用。襁褓 + 侧卧 + 嘘声 + 摇晃通常就够了。</p>
              </Card>
              <Card accent={colors.accent}>
                <Badge color={colors.accent} bg={colors.accentLight}>激烈哭闹型</Badge>
                <p style={{ fontSize: 14, lineHeight: 1.7 }}>需要同时使用全部 5 个 S，且要有力度。哭声越大，襁褓越紧、嘘声越响、摇晃越快。</p>
              </Card>
            </div>

            <Card style={{ marginTop: 24, background: colors.tealLight, border: `1px solid ${colors.teal}40` }}>
              <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 17, fontWeight: 700, color: colors.teal, marginBottom: 8 }}>成功三要素</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16 }}>
                <div><strong>1. 精确</strong><br /><span style={{ fontSize: 14, color: colors.textLight }}>每个 S 都必须做对。手臂伸直（不交叉在胸前），抖动微小（不是大幅摆动），嘘声要响（不是耳语）。</span></div>
                <div><strong>2. 练习</strong><br /><span style={{ fontSize: 14, color: colors.textLight }}>从宝宝安静或睡着时开始练习。就像骑自行车——开始觉得怪，练 5–10 次就成自然。宝宝也会因为重复而学得更快。</span></div>
                <div><strong>3. 力度</strong><br /><span style={{ fontSize: 14, color: colors.textLight }}>最不直觉但最重要。哭声越急迫，你的回应就必须越有力。轻柔哼唱对尖叫是没用的。</span></div>
              </div>
            </Card>
          </Section>
        </>
      )}

      {/* SLEEP TAB */}
      {activeTab === "sleep" && (
        <>
          <Section>
            <SectionTitle sub="大多数新生儿每天睡 14–18 小时，但分成很多小段。就像用硬币凑 1000 美元。">第 6 个 S：睡眠</SectionTitle>

            <Card>
              <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 17, fontWeight: 700, color: colors.navy, marginBottom: 12 }}>婴儿睡眠入门</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16 }}>
                <div style={{ padding: 16, background: colors.tealLight, borderRadius: 10, textAlign: "center" }}>
                  <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 28, fontWeight: 700, color: colors.teal }}>14–18 小时</div>
                  <div style={{ fontSize: 13, color: colors.textLight }}>新生儿每日总睡眠</div>
                </div>
                <div style={{ padding: 16, background: colors.accentLight, borderRadius: 10, textAlign: "center" }}>
                  <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 28, fontWeight: 700, color: colors.accent }}>60 分钟</div>
                  <div style={{ fontSize: 13, color: colors.textLight }}>宝宝的睡眠周期（成人为 90 分钟）</div>
                </div>
                <div style={{ padding: 16, background: colors.lavenderLight, borderRadius: 10, textAlign: "center" }}>
                  <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 28, fontWeight: 700, color: colors.lavender }}>50/50</div>
                  <div style={{ fontSize: 13, color: colors.textLight }}>安静睡眠（NREM）与活跃睡眠（REM）各占一半</div>
                </div>
              </div>
              <p style={{ fontSize: 14, lineHeight: 1.7, marginTop: 16, color: colors.textLight }}>婴儿每晚有 8 小时的 REM 睡眠（成人只有 2 小时）。REM 是大脑回顾和储存新经历的时段——因为一切对婴儿来说都是新的，所以他们需要大量 REM。60 分钟的睡眠周期意味着他们更频繁地进入"浅睡眠"窗口，这就是为什么没有合适的睡眠线索他们会频繁醒来。</p>
            </Card>
          </Section>

          <Section bg={colors.card}>
            <SectionTitle color={colors.rose} sub="现代父母对婴儿睡眠有很多完全错误的认知。">睡眠迷思破解</SectionTitle>
            {[
              { myth: "婴儿需要完全安静才能入睡", truth: "子宫比吸尘器还吵。安静是感觉荒漠。低沉的白噪音才是婴儿需要的——它熟悉且令人安心。" },
              { myth: "襁褓应该在 2 个月停止", truth: "2 个月是最不该停的时候。哭闹在 2–4 个月达到高峰。继续使用襁褓到 4–5 个月，然后逐步脱离，先露出一只手臂。" },
              { myth: "永远不要叫醒睡着的宝宝", truth: "你应该在放下宝宝时短暂唤醒他们。'醒-睡'技巧能教会自我安抚。" },
              { myth: "摇着/喂着入睡会养成坏习惯", truth: "所有睡眠线索都会产生依赖——问题在于它们是否方便使用和容易脱离。襁褓 + 白噪音是最好的睡眠线索，因为它们易用又易脱离。" },
              { myth: "白天不让宝宝睡 = 晚上睡得好", truth: "这适得其反。过度疲劳的宝宝更抗拒入睡。白天每隔几小时就让宝宝小睡。" },
              { myth: "6 个月大多数宝宝就能睡整夜", truth: "没有人能睡整夜不醒。我们都会醒来 2–3 次，只是在条件不变时能立刻重新入睡。如果宝宝醒来发现情况变了（不再在怀里），他们就会完全清醒。" },
            ].map((item, i) => (
              <div key={i} style={{ display: "flex", gap: 16, marginBottom: 16, padding: 16, background: i % 2 === 0 ? colors.roseLight : colors.bg, borderRadius: 12 }}>
                <div style={{ fontSize: 20, flexShrink: 0 }}>❌</div>
                <div>
                  <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 15, fontWeight: 700, color: colors.rose, textDecoration: "line-through", textDecorationColor: colors.rose }}>{item.myth}</div>
                  <div style={{ fontSize: 14, lineHeight: 1.6, color: colors.text, marginTop: 6 }}>✅ {item.truth}</div>
                </div>
              </div>
            ))}
          </Section>

          <Section>
            <SectionTitle sub="一项革命性的技巧，从最初几天就教会宝宝自我安抚。">"醒-睡"技巧</SectionTitle>
            <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
              <FlowBox color={colors.teal} bg={colors.tealLight}>1. 准备：给宝宝裹好襁褓，打开低沉的白噪音</FlowBox>
              <FlowArrow />
              <FlowBox color={colors.lavender} bg={colors.lavenderLight}>2. 喂奶，让宝宝在你怀里或在乳房上入睡</FlowBox>
              <FlowArrow />
              <FlowBox color={colors.green} bg={colors.greenLight}>3. 轻轻将宝宝放入摇篮</FlowBox>
              <FlowArrow />
              <FlowBox color={colors.accent} bg={colors.accentLight}>4. 唤醒宝宝 5–10 秒（轻轻晃动或挠脚底）</FlowBox>
              <FlowArrow />
              <FlowBox color={colors.gold} bg={colors.goldLight}>5. 宝宝重新入睡——学会在没有被抱着、摇着或喂着的情况下自我安抚</FlowBox>
            </div>
            <p style={{ fontSize: 14, color: colors.textLight, marginTop: 16, textAlign: "center", lineHeight: 1.6 }}>如果宝宝无法重新入睡：加大白噪音音量，轻晃摇篮。还在哭？抱起来安抚，然后再试一次醒-睡步骤。</p>
          </Section>

          <Section bg={colors.card}>
            <SectionTitle color={colors.navy}>逐步脱离 5S 睡眠辅助</SectionTitle>
            <TimelineItem age="3–4 月" title="脱离摇晃" desc="将秋千速度降到最低。如果几天后仍然睡得好，停止秋千。转移到摇篮/婴儿床。" color={colors.green} />
            <TimelineItem age="4–5 月" title="脱离襁褓" desc="先露出一只手臂几天。如果仍然睡得好，完全停止包裹。同时使用白噪音会容易得多。" color={colors.accent} />
            <TimelineItem age="约 6 月" title="脱离奶嘴" desc="睡前奶嘴可降低 SIDS 风险。超过 6–7 个月再脱离会更难，因为情感依附会增强。" color={colors.rose} />
            <TimelineItem age="12 月+" title="脱离白噪音" desc="在 1–2 周内逐渐调低音量。最容易脱离的线索，随时可以重新启用（旅行、生病、出牙）。" color={colors.lavender} />
          </Section>

          <Section>
            <SectionTitle sub="每位父母都需要知道这些事实。">SIDS 与安全睡眠</SectionTitle>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16 }}>
              {[
                { icon: "✅", title: "始终仰卧睡觉", desc: "趴睡使 SIDS 风险增加 3–8 倍。仰卧是唯一安全的睡姿。" },
                { icon: "✅", title: "尽可能母乳喂养", desc: "将 SIDS 风险降低 50%。" },
                { icon: "✅", title: "无烟家庭", desc: "禁止香烟、燃木炉、熏香、蜡烛或壁炉（除非通风良好）。" },
                { icon: "✅", title: "同室不同床至少 6 个月", desc: "宝宝在你的房间（不是你的床上）可降低 SIDS 风险。" },
                { icon: "✅", title: "紧密襁褓 + 白噪音", desc: "减少翻身，减少不安全睡姿的需求。" },
                { icon: "✅", title: "睡前使用奶嘴", desc: "即使入睡后掉了也能降低 SIDS 风险。" },
                { icon: "🚫", title: "9 个月内不要同床", desc: "永远不要在沙发、躺椅或扶手椅上。沙发上的 SIDS 风险高 67 倍。" },
                { icon: "🚫", title: "空白婴儿床", desc: "移除枕头、玩具、围栏垫、厚毯子、定位器、羊皮。" },
                { icon: "✅", title: "室温 20–22°C", desc: "耳朵略微温暖，不烫。室内不戴帽子。" },
                { icon: "✅", title: "每天俯卧时间（有人看护）", desc: "锻炼颈部力量，让宝宝能将脸转离窒息风险。" },
              ].map((item, i) => (
                <div key={i} style={{ display: "flex", gap: 12, padding: 16, background: colors.card, borderRadius: 12, border: `1px solid ${colors.border}` }}>
                  <div style={{ fontSize: 20, flexShrink: 0 }}>{item.icon}</div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 14, color: colors.navy }}>{item.title}</div>
                    <div style={{ fontSize: 13, color: colors.textLight, marginTop: 4, lineHeight: 1.5 }}>{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </Section>
        </>
      )}

      {/* MORE REMEDIES TAB */}
      {activeTab === "more-remedies" && (
        <>
          <Section>
            <SectionTitle sub="5S 是主要方法，但书中还用了一整章介绍备用手段——'还能试什么？'当你需要更多工具时。">其他肠绞痛疗法</SectionTitle>

            <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 20, fontWeight: 700, color: colors.navy, marginBottom: 16 }}>奶奶的锦囊妙计</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20, marginBottom: 32 }}>
              <Card accent={colors.gold}>
                <Badge color={colors.gold} bg={colors.goldLight}>有效</Badge>
                <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 17, fontWeight: 700, color: colors.navy, marginBottom: 8 }}>按摩</div>
                <p style={{ fontSize: 14, lineHeight: 1.7, margin: 0 }}>Tiffany Field 的研究发现，每天接受 3 次、每次 15 分钟按摩的早产儿体重增加多 <strong>50%</strong>，提前近一周出院。一岁时，被按摩的宝宝 IQ 更高。足月宝宝每天 15 分钟按摩后哭得更少、更警觉、应激激素更低。他们的妈妈也更平静。</p>
              </Card>
              <Card accent={colors.green}>
                <Badge color={colors.green} bg={colors.greenLight}>有效</Badge>
                <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 17, fontWeight: 700, color: colors.navy, marginBottom: 8 }}>散步和新鲜空气</div>
                <p style={{ fontSize: 14, lineHeight: 1.7, margin: 0 }}>如果婴儿会说话，他们会恳求出门。微风的流动、移动的景物和轻柔的运动就像多感官白噪音。我们的远古祖先大部分时间在户外度过——许多婴儿烦躁部分是因为在家无聊。散步可以同时提振你和宝宝的心情。</p>
              </Card>
            </div>
          </Section>

          <Section bg={colors.card}>
            <SectionTitle color={colors.accent} sub="5–10% 的肠绞痛婴儿有医学原因。以下是最常见的喂养相关问题。">喂养问题</SectionTitle>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16 }}>
              <Card accent={colors.accent}>
                <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 16, fontWeight: 700, color: colors.navy, marginBottom: 8 }}>🍼 奶量不足</div>
                <p style={{ fontSize: 14, lineHeight: 1.7 }}>检查：醒来时乳房是否有胀感？喂奶开始时能否听到吞咽声？喂完后宝宝是否满足？每天排尿 5–8 次（清澈/淡黄色）？每周增重 4–7 盎司？如果有任何一项为"否"，请联系儿科医生。</p>
              </Card>
              <Card accent={colors.teal}>
                <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 16, fontWeight: 700, color: colors.navy, marginBottom: 8 }}>🌊 奶量过多（过度喷射）</div>
                <p style={{ fontSize: 14, lineHeight: 1.7 }}>宝宝喂奶时弓背后拉——不是因为不喜欢，而是被火龙头般的奶流呛到。迹象：喂一侧时另一侧喷奶；宝宝大声吞咽；流量开始时咳嗽/呛到。解决：喂奶前先挤出 1–2 盎司。用手指夹住乳头像夹烟一样，向内按压减缓流量。试着躺着喂，让宝宝在上面。</p>
              </Card>
              <Card accent={colors.lavender}>
                <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 16, fontWeight: 700, color: colors.navy, marginBottom: 8 }}>🧀 食物敏感（过敏）</div>
                <p style={{ fontSize: 14, lineHeight: 1.7 }}>肠绞痛的第一大医学原因（约占医学病因的 90%）。怀疑指征：全天烦躁（不仅是傍晚）、稀便、便中有血/黏液。<strong>排除饮食法：</strong>避免牛奶、鸡蛋、花生、坚果、小麦、大豆和鱼类 1 周。每天记录。如果哭闹改善，做食物挑战——每天重新引入一种可疑食物，持续 4 天。配方奶宝宝可以试深度水解配方（不只是换豆奶或无乳糖的——这些对肠绞痛没用）。</p>
              </Card>
              <Card accent={colors.rose}>
                <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 16, fontWeight: 700, color: colors.navy, marginBottom: 8 }}>💩 便秘</div>
                <p style={{ fontSize: 14, lineHeight: 1.7 }}>主要是配方奶宝宝的问题（母乳宝宝几乎不会有硬便）。尝试：换配方奶品牌，在配方奶中加入 1 汤匙有机西梅汁或 1 盎司水，每天 1–2 次。如果无效，给宝宝做蹬腿运动并按摩腹部。3 天以上不排便请联系医生。</p>
              </Card>
            </div>
          </Section>

          <Section>
            <SectionTitle sub="这些被广泛使用，但证据参差不齐。了解你在尝试什么。" color={colors.gold}>替代疗法：谨慎选择</SectionTitle>
            {[
              { name: "🌿 花草茶（洋甘菊、茴香、莳萝）", verdict: "部分证据", desc: "以色列的一项研究发现洋甘菊/茴香/甘草茶比安慰剂更能减少烦躁。意大利的一项研究发现洋甘菊/茴香/柠檬香蜂草滴剂有一定帮助。如果想试：将 2 茶匙莳萝或茴香籽压碎，用沸水浸泡 10 分钟，过滤冷却，每天给几次，每次 1 茶匙。Karp 医生不太倾向给婴儿口服补充剂，但认为这值得谨慎一试。", color: colors.green },
              { name: "💧 消胀气水（Gripe Water）", verdict: "未经证实", desc: "一种含有莳萝的民间疗法，但从未在研究中证明有效。通常含有不需要的糖和碳酸氢钠。在美国、英国和英联邦国家广泛销售。无害，但可能也没用。", color: colors.gold },
              { name: "🏠 顺势疗法", verdict: "无证据", desc: "基于'以毒攻毒'原理——给予微量在大剂量下会引起问题的物质。推荐的肠绞痛疗法包括洋甘菊、苦瓜和白头翁。有些父母发誓有效，但 NIH 已花费超过 25 亿美元测试替代疗法，几乎没有发现有效的顺势疗法。", color: colors.accent },
              { name: "🦴 脊椎按摩与整骨疗法", verdict: "无证据", desc: "一些从业者声称出生时的脊椎错位导致肠绞痛。没有令人信服的科学证据支持这一说法。书中将其归类为对婴儿肠绞痛的可疑治疗。", color: colors.accent },
            ].map((item, i) => (
              <Card key={i} accent={item.color}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
                  <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 16, fontWeight: 700, color: colors.navy }}>{item.name}</div>
                  <Badge color={item.color} bg={`${item.color}18`}>{item.verdict}</Badge>
                </div>
                <p style={{ fontSize: 14, lineHeight: 1.7, margin: "8px 0 0", color: colors.textLight }}>{item.desc}</p>
              </Card>
            ))}

            <Card style={{ background: "#FEE2E2", border: "1px solid #EF444440", marginTop: 8 }}>
              <div style={{ fontWeight: 700, fontSize: 15, color: "#991B1B" }}>⚠️ 警告：八角茶</div>
              <p style={{ fontSize: 14, lineHeight: 1.7, margin: "6px 0 0", color: "#991B1B" }}>永远不要给婴儿喝八角茶。它可能导致严重的神经系统问题，包括婴儿癫痫发作。</p>
            </Card>

            <Card style={{ background: colors.goldLight, border: `1px solid ${colors.gold}40`, marginTop: 20 }}>
              <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 17, fontWeight: 700, color: colors.navy, marginBottom: 8 }}>💡 额外疗法总结</div>
              <p style={{ fontSize: 14, lineHeight: 1.7, margin: 0 }}>5S 是主菜。按摩和散步是有坚实证据的优秀补充。喂养问题请咨询儿科医生。花草茶值得谨慎一试。其他都是弱证据或无证据——把精力和金钱省给真正有效的方法。</p>
            </Card>
          </Section>
        </>
      )}

      {/* RED FLAGS TAB */}
      {activeTab === "red-flags" && (
        <>
          <Section>
            <SectionTitle sub="大多数肠绞痛宝宝并不是生病了——他们只是'想家'（想念子宫）。但 5–10% 的持续性哭闹有医学原因。知道何时该找医生。">警示信号与紧急警报</SectionTitle>

            <Card style={{ background: "#FEF3C7", border: "1px solid #F59E0B40" }}>
              <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 17, fontWeight: 700, color: "#92400E", marginBottom: 8 }}>医生的三个关键问题</div>
              <p style={{ fontSize: 15, lineHeight: 1.7, margin: 0 }}>如果以下任何一个问题的答案是"否"，医生会进一步检查：</p>
              <div style={{ marginTop: 12, display: "flex", flexDirection: "column", gap: 8 }}>
                {["宝宝发育正常吗？", "宝宝在其他方面都正常吗？", "不哭的时候宝宝看起来快乐吗？"].map((q, i) => (
                  <div key={i} style={{ display: "flex", gap: 10, alignItems: "center", padding: "10px 14px", background: "#FEF9C3", borderRadius: 8 }}>
                    <div style={{ width: 24, height: 24, borderRadius: "50%", background: "#F59E0B", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700 }}>{i + 1}</div>
                    <div style={{ fontSize: 15, fontWeight: 600, color: "#92400E" }}>{q}</div>
                  </div>
                ))}
              </div>
            </Card>
          </Section>

          <Section bg={colors.card}>
            <SectionTitle color={colors.accent}>10 个警示信号</SectionTitle>
            <p style={{ fontSize: 15, lineHeight: 1.7, color: colors.textLight, marginBottom: 20 }}>如果宝宝出现以下任何症状，请联系医生：</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 12 }}>
              {[
                { flag: "持续呻吟", desc: "频繁的呻吟和微弱的哭声（不是平常有力的哭声）" },
                { flag: "尖锐的高音哭声", desc: "尖锐且异常——与正常的烦躁不同" },
                { flag: "呕吐", desc: "每次超过 1 盎司，每天超过 5 次，或任何绿色/黄色呕吐物" },
                { flag: "大便变化", desc: "便秘或腹泻，尤其是带血" },
                { flag: "吃奶时烦躁", desc: "喂奶期间或之后扭动、弓背、哭闹" },
                { flag: "体温异常", desc: "直肠温度低于 36.4°C 或高于 38°C" },
                { flag: "持续易怒", desc: "持续哭闹，几乎没有安静期" },
                { flag: "嗜睡", desc: "睡眠时间是平常的两倍，表现'不在状态'，吸吮无力" },
                { flag: "囟门鼓起", desc: "即使宝宝坐直时，前囟仍然鼓起" },
                { flag: "体重增长缓慢", desc: "每天增重不到半盎司" },
              ].map((item, i) => (
                <div key={i} style={{ display: "flex", gap: 12, padding: 14, background: i % 2 === 0 ? colors.accentLight : colors.bg, borderRadius: 10 }}>
                  <div style={{ width: 28, height: 28, borderRadius: "50%", background: colors.accent, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, flexShrink: 0 }}>!</div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 14, color: colors.navy }}>{item.flag}</div>
                    <div style={{ fontSize: 13, color: colors.textLight, lineHeight: 1.5 }}>{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </Section>

          <Section>
            <SectionTitle sub="这些情况更少见（大多不到 1%），但需要了解。">可能导致哭闹的医学状况</SectionTitle>
            {[
              { name: "食物敏感/过敏（5–10%）", desc: "唯一常见的医学原因。可能导致哭闹加皮疹、呕吐、腹泻或便中血性黏液。通常是牛奶蛋白；试排除饮食法或更换配方奶。" },
              { name: "胃食管反流（<1%）", desc: "仅在以下情况怀疑：每天呕吐超过 5 次、大多数喂奶时哭闹（包括早晨）、哭闹持续超过 3 个月、或出现声音嘶哑/喘息。抗酸药对大多数婴儿的效果不比安慰剂好。" },
              { name: "感染", desc: "中耳炎、尿路感染、脑膜炎（罕见）。生病的新生儿可能不发烧——注意嗜睡或持续易怒。" },
              { name: "毛发/线绳勒绕", desc: "一根细发或线紧紧缠绕在手指、脚趾或阴茎上。会导致突然的尖锐尖叫——一定要检查。" },
              { name: "鼻腔堵塞", desc: "婴儿用鼻子呼吸。过敏或感冒引起的鼻塞可导致急切的哭闹。使用生理盐水滴鼻和吸鼻器。" },
              { name: "鹅口疮", desc: "口腔念珠菌感染，导致口腔内出现擦不掉的乳白色斑块。容易治疗。" },
            ].map((item, i) => (
              <Card key={i} accent={colors.teal}>
                <div style={{ fontWeight: 700, fontSize: 15, color: colors.navy }}>{item.name}</div>
                <div style={{ fontSize: 14, color: colors.textLight, lineHeight: 1.7, marginTop: 6 }}>{item.desc}</div>
              </Card>
            ))}
          </Section>

          <Section bg={colors.card}>
            <SectionTitle color={colors.navy} sub="书末附录 B 是一份完整的十要点生存指南。以下是扩展版——包括大多数指南跳过的更难的内容。">新手父母生存指南</SectionTitle>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16 }}>
              {[
                { tip: "相信自己", desc: "你是一条延续了 10 万代的成功父母链条的一环。几十亿人在你之前做过这件事——他们并非都是火箭科学家。" },
                { tip: "降低期望", desc: "下午 5 点还穿着睡衣？这很正常。脏碗碟、未回复的邮件、没洗的头发——都没关系。你现在真正的工作只有喂养和安抚。" },
                { tip: "认真接受帮助", desc: "直到 100 年前，每位新妈妈每天都有几位有经验的大人帮忙。独自带娃是现代发明，不是美德。每一个帮忙的提议都说「好」。" },
                { tip: "和伴侣轮换", desc: "爸爸们通常很擅长 5S——包裹的工程性和摇晃的力度对他们来说很自然。换班。让不哺乳的那一方成为'安抚之王'。" },
                { tip: "保持幽默感", desc: "即使最有爱的父母也会有黑暗时刻。摇篮曲《Rock-a-Bye Baby》歌词那么阴暗是有原因的——精疲力尽的父母一直需要用笑来释放。笑不代表你是坏父母。" },
                { tip: "屏蔽糟糕的建议", desc: "美国真正的国民运动不是棒球——而是给新妈妈提供未经请求的建议。家人、朋友、超市里的陌生人。微笑、点头、信任你的儿科医生。" },
                { tip: "保护你们的关系", desc: "新宝宝是对每段关系的压力测试。每天哪怕安排 10 分钟成人对话。挫折和睡眠不足会让伴侣崩溃——说出感受，不要互相指责。" },
                { tip: "永远不要摇晃宝宝", desc: "摇晃婴儿综合征会导致脑损伤和死亡。如果你到了临界点：安全地放下宝宝，关上门，走开。给人打电话。哭声不会伤害他们。你的挫败感是正常的——但付诸行动不是。" },
              ].map((item, i) => (
                <div key={i} style={{ padding: 20, background: colors.bg, borderRadius: 12, border: `1px solid ${colors.border}` }}>
                  <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 16, fontWeight: 700, color: colors.navy }}>{item.tip}</div>
                  <div style={{ fontSize: 14, color: colors.textLight, marginTop: 8, lineHeight: 1.6 }}>{item.desc}</div>
                </div>
              ))}
            </div>

            <Card style={{ marginTop: 24, background: "#FEF3C7", border: "1px solid #F59E0B40" }}>
              <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 17, fontWeight: 700, color: "#92400E", marginBottom: 10 }}>⚠️ 产后抑郁与产后精神病——认识征兆</div>
              <p style={{ fontSize: 14, lineHeight: 1.7, margin: "0 0 12px" }}>产后抑郁影响 <strong>10–50% 的新妈妈</strong>，许多爸爸也会受影响。这不是软弱——这是一种由激素剧变、睡眠剥夺和哭闹宝宝的压力触发的医学状况。肠绞痛宝宝会大大增加风险。</p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 12 }}>
                <div style={{ background: "#FEF9C3", borderRadius: 8, padding: 14 }}>
                  <div style={{ fontWeight: 700, fontSize: 14, color: "#92400E", marginBottom: 6 }}>常见产后抑郁征兆：</div>
                  <div style={{ fontSize: 13, lineHeight: 1.6, color: "#78350F" }}>持续的悲伤或空虚感、无法控制的哭泣、严重的焦虑或恐慌、即使宝宝睡了也失眠、觉得自己不够好或内疚、对宝宝失去兴趣、难以集中注意力、有伤害自己的想法</div>
                </div>
                <div style={{ background: "#FEE2E2", borderRadius: 8, padding: 14 }}>
                  <div style={{ fontWeight: 700, fontSize: 14, color: "#991B1B", marginBottom: 6 }}>产后精神病（罕见但紧急）：</div>
                  <div style={{ fontSize: 13, lineHeight: 1.6, color: "#991B1B" }}>幻觉、妄想、严重混乱、偏执、有伤害宝宝的想法。这是精神科急症——立即联系医生或拨打急救电话。</div>
                </div>
              </div>
              <p style={{ fontSize: 13, lineHeight: 1.6, color: "#78350F", marginTop: 12, fontStyle: "italic" }}>如果以上任何描述符合你或你的伴侣：今天就告诉你的医生。产后抑郁很常见，也很容易治疗。你没有失败——你只是生病了，你值得被帮助。</p>
            </Card>
          </Section>
        </>
      )}

      {/* CONCLUSION */}
      <div style={{ background: `linear-gradient(135deg, ${colors.navy} 0%, #1a2a40 50%, #2a4a5a 100%)`, padding: "56px 24px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, opacity: 0.05, background: "radial-gradient(circle at 70% 30%, rgba(212,168,83,0.4) 0%, transparent 60%)" }}></div>
        <div style={{ position: "relative", maxWidth: 720, margin: "0 auto", textAlign: "center" }}>
          <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", color: colors.gold, marginBottom: 12 }}>结语</div>
          <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 32, fontWeight: 800, color: "#fff", margin: 0, lineHeight: 1.2 }}>第四孕期结束……彩虹出现了</h2>
          <p style={{ fontSize: 17, color: "rgba(255,255,255,0.7)", marginTop: 16, lineHeight: 1.7, maxWidth: 600, margin: "16px auto 0" }}>四个月时，你的宝宝终于准备好真正"出生"了——这次是真的。</p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 16, marginTop: 32 }}>
            {[
              { icon: "🧠", stat: "25%", label: "出生以来的大脑发育" },
              { icon: "😊", stat: "微笑", label: "隔着房间向你投射灿烂的笑容" },
              { icon: "🤲", stat: "抓握", label: "双手张开，伸向摇铃（和你的鼻子）" },
              { icon: "💬", stat: "咕咕", label: "原始对话——最初的来回'交谈'" },
            ].map((item, i) => (
              <div key={i} style={{ background: "rgba(255,255,255,0.08)", borderRadius: 14, padding: 20, border: "1px solid rgba(255,255,255,0.1)" }}>
                <div style={{ fontSize: 28 }}>{item.icon}</div>
                <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 24, fontWeight: 700, color: colors.gold, marginTop: 8 }}>{item.stat}</div>
                <div style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", marginTop: 4, lineHeight: 1.4 }}>{item.label}</div>
              </div>
            ))}
          </div>

          <div style={{ background: "rgba(255,255,255,0.06)", borderRadius: 16, padding: 24, marginTop: 32, border: "1px solid rgba(255,255,255,0.1)", textAlign: "left" }}>
            <p style={{ fontSize: 15, lineHeight: 1.8, color: "rgba(255,255,255,0.8)", margin: 0 }}>经过几个月模糊的凝视和漫长的睡眠，你四个月大的宝宝用笑声和咿呀声向全世界宣告：<em>"彩排结束了。我准备好首秀了！"</em></p>
            <p style={{ fontSize: 15, lineHeight: 1.8, color: "rgba(255,255,255,0.8)", margin: "16px 0 0" }}>而你不只是旁观者——你赢得了这一切。你忍受了疼痛、疲劳和焦虑。你学到的知识足以获得一个"宝宝学"博士学位。镇静反射从一种自动反应逐渐转变为一种熟悉的、令人安心的睡眠线索。你的宝宝正在掌握人类最重要的技能：轮流对话，从傻乎乎的来回咕咕声开始。</p>
            <p style={{ fontSize: 15, lineHeight: 1.8, color: colors.gold, margin: "16px 0 0", fontFamily: "'Playfair Display', Georgia, serif", fontStyle: "italic" }}>恭喜你。真正的乐趣才刚刚开始。</p>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div style={{ background: colors.navy, padding: "32px 24px", textAlign: "center" }}>
        <p style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", margin: 0, lineHeight: 1.6 }}>本摘要基于 Harvey Karp 医学博士所著 <em>The Happiest Baby on the Block</em>（第 2 版，2015 年）<br />这是学习笔记，不能替代医疗建议。请始终咨询你的儿科医生。</p>
      </div>

      {/* COMMENTS */}
      <Section>
        <GiscusComments locale="zh" term="/reading-notes/happiest-baby-on-the-block" />
      </Section>
    </div>
  );
}
