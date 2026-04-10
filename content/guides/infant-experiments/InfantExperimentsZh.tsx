"use client";

import Image from "next/image";
import { useState } from "react";
import { GiscusComments } from "@/components/GiscusComments";

const colors = {
  bg: "#F0F7F4",
  card: "#FFFFFF",
  accent: "#3B8A7A",
  accentLight: "#E0F0EC",
  indigo: "#4A6FA5",
  indigoLight: "#E4EDF7",
  navy: "#1A3C32",
  gold: "#C49A3C",
  goldLight: "#FBF2DE",
  teal: "#2E9E8E",
  tealLight: "#DDF2EE",
  green: "#4E9960",
  greenLight: "#E5F3E8",
  rose: "#C46060",
  roseLight: "#FCF0F0",
  text: "#1A3C32",
  textLight: "#5A7A6E",
  border: "#CEDED6",
};

/* ── Local components ───────────────────────────────────────────── */

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
  <div style={{ background: colors.card, borderRadius: 16, padding: 28, border: `1px solid ${colors.border}`, borderLeft: accent ? `4px solid ${accent}` : undefined, marginBottom: 20, boxShadow: "0 2px 12px rgba(26,60,50,0.04)", ...style }}>{children}</div>
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

const WarnCard = ({ children, title }: { children: React.ReactNode; title?: string }) => (
  <div style={{ background: colors.roseLight, borderRadius: 16, padding: 28, border: `1px solid ${colors.rose}40`, borderLeft: `4px solid ${colors.rose}`, marginBottom: 20 }}>
    {title && <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 18, fontWeight: 700, color: colors.rose, marginBottom: 12 }}>{title}</div>}
    <div style={{ fontSize: 15, lineHeight: 1.7, color: colors.text }}>{children}</div>
  </div>
);

const WarnCheckItem = ({ children }: { children: React.ReactNode }) => (
  <div style={{ display: "flex", gap: 12, alignItems: "flex-start", marginBottom: 10 }}>
    <div style={{ width: 22, height: 22, borderRadius: "50%", background: colors.rose, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M3 3l6 6M9 3l-6 6" stroke="#fff" strokeWidth="2" strokeLinecap="round" /></svg>
    </div>
    <div style={{ fontSize: 15, lineHeight: 1.6, color: colors.text }}>{children}</div>
  </div>
);

/* ── Main component ─────────────────────────────────────────────── */

export default function InfantExperimentsZh() {
  const [activeTab, setActiveTab] = useState("start");
  const [openS, setOpenS] = useState(0);
  const [copied, setCopied] = useState(false);

  const tabs = [
    { id: "start", label: "准备工作" },
    { id: "peekaboo", label: "躲猫猫" },
    { id: "still-face", label: "静止脸实验" },
    { id: "kick", label: "踢腿联动" },
    { id: "imitation", label: "模仿套组" },
    { id: "record", label: "记录与反思" },
  ];

  const observationTemplate = `实验名称：
日期：
宝宝月龄：
状态/心情：
布置说明：
宝宝的表现：
意外发现：
备注：`;

  return (
    <div style={{ background: colors.bg, fontFamily: "'Source Sans 3', sans-serif", color: colors.text, minHeight: "100vh" }}>
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700;800&family=Source+Sans+3:wght@300;400;600;700&display=swap" rel="stylesheet" />

      {/* ═══════════════════════ HERO ═══════════════════════ */}
      <div style={{ background: `linear-gradient(135deg, ${colors.navy} 0%, #0f2b22 100%)`, padding: "56px 24px 48px", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, opacity: 0.06, background: "repeating-linear-gradient(45deg, transparent, transparent 30px, rgba(255,255,255,0.1) 30px, rgba(255,255,255,0.1) 60px)" }}></div>
        <div style={{ position: "relative", maxWidth: 720, margin: "0 auto" }}>
          <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", color: colors.accent, marginBottom: 16 }}>指南</div>
          <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 40, fontWeight: 800, color: "#fff", margin: 0, lineHeight: 1.15 }}>在家也能做的经典婴儿心理学实验</h1>
          <p style={{ fontSize: 17, color: "rgba(255,255,255,0.7)", marginTop: 12, lineHeight: 1.5 }}>四项标志性发展心理学研究的居家改编——写给4–6个月宝宝的好奇父母</p>
          <div style={{ display: "flex", justifyContent: "center", gap: 32, marginTop: 32, flexWrap: "wrap" }}>
            <StatBox num="4" label="个实验" color={colors.gold} />
            <StatBox num="4–6月龄" label="适用范围" color={colors.accent} />
            <StatBox num="~15分钟" label="每次时长" color={colors.teal} />
            <StatBox num="1+" label="位观察者" color={colors.indigo} />
          </div>
        </div>
      </div>

      {/* ═══════════════════════ NAV ═══════════════════════ */}
      <div style={{ background: colors.card, borderBottom: `1px solid ${colors.border}`, position: "sticky", top: 0, zIndex: 100, boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "flex", alignItems: "center", padding: "0 12px" }}>
          <div style={{ display: "flex", gap: 0, overflowX: "auto", flex: 1 }}>
            {tabs.map((t) => (
              <button key={t.id} onClick={() => { setActiveTab(t.id); setOpenS(0); }} style={{ background: "none", border: "none", padding: "14px 18px", fontFamily: "'Source Sans 3', sans-serif", fontSize: 14, fontWeight: activeTab === t.id ? 700 : 400, color: activeTab === t.id ? colors.accent : colors.textLight, borderBottom: activeTab === t.id ? `3px solid ${colors.accent}` : "3px solid transparent", cursor: "pointer", whiteSpace: "nowrap", transition: "all 0.15s" }}>{t.label}</button>
            ))}
          </div>
          <button
            onClick={() => {
              navigator.clipboard.writeText(window.location.href).then(() => {
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
              });
            }}
            style={{ background: "none", border: "none", display: "flex", alignItems: "center", gap: 4, padding: "8px 12px", fontSize: 12, color: copied ? colors.accent : colors.textLight, cursor: "pointer", whiteSpace: "nowrap", transition: "color 0.15s", flexShrink: 0 }}
          >
            {copied ? (
              <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
            ) : (
              <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101" /><path strokeLinecap="round" strokeLinejoin="round" d="M10.172 13.828a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.102 1.101" /></svg>
            )}
            {copied ? "已复制！" : "复制链接"}
          </button>
        </div>
      </div>

      {/* ═══════════════════════ TAB 1 — 准备工作 ═══════════════════════ */}
      {activeTab === "start" && (
        <>
          <Section>
            <SectionTitle sub="婴儿研究者关注的四种基本行为反应——也是你在家可以观察的信号。">婴儿实验测量什么</SectionTitle>

            {/* Figure 1: 四种测量指标 */}
            <Card>
              <div style={{ fontSize: 13, fontWeight: 600, color: colors.textLight, marginBottom: 16, textTransform: "uppercase", letterSpacing: 1 }}>图 1 · 四种基本观察指标</div>
              <svg viewBox="0 0 800 140" style={{ width: "100%", maxWidth: 800 }}>
                {/* 注视 */}
                <circle cx="100" cy="60" r="44" fill={colors.accentLight} stroke={colors.accent} strokeWidth="2" />
                <g transform="translate(100,52)">
                  <ellipse cx="0" cy="0" rx="14" ry="10" fill="none" stroke={colors.accent} strokeWidth="2" />
                  <circle cx="0" cy="0" r="5" fill={colors.accent} />
                </g>
                <text x="100" y="120" textAnchor="middle" fontFamily="'Source Sans 3', sans-serif" fontSize="14" fontWeight="600" fill={colors.accent}>注视</text>
                <text x="100" y="136" textAnchor="middle" fontFamily="'Source Sans 3', sans-serif" fontSize="11" fill={colors.textLight}>追踪宝宝目光的方向</text>

                {/* 预期 */}
                <circle cx="300" cy="60" r="44" fill={colors.goldLight} stroke={colors.gold} strokeWidth="2" />
                <g transform="translate(300,52)">
                  <circle cx="0" cy="0" r="14" fill="none" stroke={colors.gold} strokeWidth="2" />
                  <circle cx="-5" cy="-3" r="2" fill={colors.gold} />
                  <circle cx="5" cy="-3" r="2" fill={colors.gold} />
                  <path d="M-6 4 Q0 10 6 4" fill="none" stroke={colors.gold} strokeWidth="2" strokeLinecap="round" />
                </g>
                <text x="300" y="120" textAnchor="middle" fontFamily="'Source Sans 3', sans-serif" fontSize="14" fontWeight="600" fill={colors.gold}>预期</text>
                <text x="300" y="136" textAnchor="middle" fontFamily="'Source Sans 3', sans-serif" fontSize="11" fill={colors.textLight}>衡量宝宝对下一步的预判能力</text>

                {/* 踢腿 */}
                <circle cx="500" cy="60" r="44" fill={colors.tealLight} stroke={colors.teal} strokeWidth="2" />
                <g transform="translate(500,48)">
                  <line x1="-2" y1="-10" x2="-2" y2="4" stroke={colors.teal} strokeWidth="2.5" strokeLinecap="round" />
                  <line x1="-2" y1="4" x2="-8" y2="14" stroke={colors.teal} strokeWidth="2.5" strokeLinecap="round" />
                  <line x1="-2" y1="4" x2="6" y2="16" stroke={colors.teal} strokeWidth="2.5" strokeLinecap="round" />
                  <circle cx="-2" cy="-14" r="4" fill="none" stroke={colors.teal} strokeWidth="2" />
                </g>
                <text x="500" y="120" textAnchor="middle" fontFamily="'Source Sans 3', sans-serif" fontSize="14" fontWeight="600" fill={colors.teal}>踢腿</text>
                <text x="500" y="136" textAnchor="middle" fontFamily="'Source Sans 3', sans-serif" fontSize="11" fill={colors.textLight}>揭示因果关系学习</text>

                {/* 模仿 */}
                <circle cx="700" cy="60" r="44" fill={colors.indigoLight} stroke={colors.indigo} strokeWidth="2" />
                <g transform="translate(700,50)">
                  <path d="M-12,-4 Q-12,-12 -4,-12 L4,-12 Q12,-12 12,-4 L12,2 Q12,6 8,6 L-8,6 Q-12,6 -12,2 Z" fill="none" stroke={colors.indigo} strokeWidth="2" />
                  <path d="M-6,6 L-6,10" stroke={colors.indigo} strokeWidth="2" strokeLinecap="round" />
                  <path d="M6,6 L6,10" stroke={colors.indigo} strokeWidth="2" strokeLinecap="round" />
                </g>
                <text x="700" y="120" textAnchor="middle" fontFamily="'Source Sans 3', sans-serif" fontSize="14" fontWeight="600" fill={colors.indigo}>模仿</text>
                <text x="700" y="136" textAnchor="middle" fontFamily="'Source Sans 3', sans-serif" fontSize="11" fill={colors.textLight}>展示宝宝的复制能力</text>
              </svg>
            </Card>

            <Card accent={colors.accent}>
              <p style={{ fontSize: 15, lineHeight: 1.7, margin: 0 }}>这篇指南整理了四项真实发展心理学研究的居家趣味版本。它们不是诊断工具——任何单次家庭实验都无法诊断任何问题。我们的目标很简单：通过结构化的小游戏，观察宝宝已经具备的自然能力，同时顺便学一点关于婴儿认知发展的科学知识。</p>
            </Card>
          </Section>

          <Section bg={colors.card}>
            <SectionTitle color={colors.rose} sub="实验的前提是安全和愉快。如果出现以下任何一种情况，请立即停止。">安全第一——立即停止规则</SectionTitle>

            <WarnCard>
              <WarnCheckItem>宝宝哭闹或烦躁 → 立即停止，先安抚</WarnCheckItem>
              <WarnCheckItem>宝宝反复转头或弓背 → 他们不想玩了</WarnCheckItem>
              <WarnCheckItem>宝宝刚醒、刚吃完或过度疲倦 → 不是好时机</WarnCheckItem>
              <WarnCheckItem>任何设置感觉不安全 → 相信你的直觉</WarnCheckItem>
              <WarnCheckItem>你自己感到不舒服 → 这已经是足够的理由</WarnCheckItem>
            </WarnCard>

            <p style={{ fontSize: 14, lineHeight: 1.7, color: colors.textLight, fontStyle: "italic", marginTop: 8 }}>这些不是考试，没有及格与不及格。&ldquo;没有结果&rdquo;几乎总是说明时机不对，而不是宝宝有问题。</p>
          </Section>

          <Section>
            <SectionTitle sub="每个实验都需要这些基本条件。提前准备好，才能专注观察宝宝。">通用准备</SectionTitle>

            <Card accent={colors.accent}>
              <CheckItem>宝宝处于清醒、安静、警觉状态——清醒窗口中段最理想</CheckItem>
              <CheckItem>安静房间，减少视觉和听觉干扰</CheckItem>
              <CheckItem>一位主导家长（执行实验）+ 一位观察者（如果可能）</CheckItem>
              <CheckItem>每次 5–10 分钟，包括试次间休息</CheckItem>
              <CheckItem>家长身后背景干净——不要有电视、花纹墙纸等</CheckItem>
              <CheckItem>可选：手机从侧面录像，方便回看（不要举在宝宝视线中）</CheckItem>
            </Card>
          </Section>
        </>
      )}

      {/* ═══════════════════════ TAB 2 — 躲猫猫 ═══════════════════════ */}
      {activeTab === "peekaboo" && (
        <>
          <Section>
            <SectionTitle sub="从随意的小游戏变成结构化的社会预测实验——观察宝宝如何建立对社交序列的心理模型。">躲猫猫：社会预测实验</SectionTitle>

            <Card accent={colors.accent}>
              <p style={{ fontSize: 15, lineHeight: 1.7, margin: 0 }}>躲猫猫不只是游戏——它是婴儿社会认知领域研究最充分的范式之一。大约在4–5个月大时，宝宝开始预期&ldquo;揭开&rdquo;的瞬间，这说明他们正在建立关于社交序列中&ldquo;下一步会发生什么&rdquo;的心理模型。下面的版本把随意的躲猫猫变成了结构化实验方案。</p>
            </Card>
          </Section>

          {/* Figure 2: 房间布局 */}
          <Section bg={colors.card}>
            <div style={{ fontSize: 13, fontWeight: 600, color: colors.textLight, marginBottom: 16, textTransform: "uppercase", letterSpacing: 1 }}>图 2 · 房间布局（俯视图）</div>
            <Card>
              <svg viewBox="0 0 600 320" style={{ width: "100%", maxWidth: 600, display: "block", margin: "0 auto" }}>
                {/* 背景 */}
                <rect x="40" y="20" width="520" height="280" rx="16" fill={colors.accentLight} fillOpacity="0.3" stroke={colors.border} strokeWidth="1.5" strokeDasharray="6 3" />

                {/* 宝宝 */}
                <circle cx="300" cy="100" r="32" fill={colors.accentLight} stroke={colors.accent} strokeWidth="2" />
                <text x="300" y="96" textAnchor="middle" fontFamily="'Source Sans 3', sans-serif" fontSize="20">👶</text>
                <text x="300" y="152" textAnchor="middle" fontFamily="'Source Sans 3', sans-serif" fontSize="12" fontWeight="600" fill={colors.navy}>宝宝（坐在弹椅上）</text>

                {/* 距离线 */}
                <line x1="300" y1="130" x2="300" y2="200" stroke={colors.textLight} strokeWidth="1.5" strokeDasharray="4 3" />
                <text x="320" y="170" fontFamily="'Source Sans 3', sans-serif" fontSize="11" fill={colors.textLight}>~60 厘米</text>

                {/* 家长 */}
                <circle cx="300" cy="230" r="28" fill={colors.goldLight} stroke={colors.gold} strokeWidth="2" />
                <text x="300" y="226" textAnchor="middle" fontFamily="'Source Sans 3', sans-serif" fontSize="18">🧑</text>
                <text x="300" y="272" textAnchor="middle" fontFamily="'Source Sans 3', sans-serif" fontSize="12" fontWeight="600" fill={colors.navy}>家长</text>

                {/* 观察者/摄像头 */}
                <circle cx="500" cy="160" r="22" fill={colors.indigoLight} stroke={colors.indigo} strokeWidth="1.5" />
                <text x="500" y="156" textAnchor="middle" fontFamily="'Source Sans 3', sans-serif" fontSize="14">📷</text>
                <text x="500" y="196" textAnchor="middle" fontFamily="'Source Sans 3', sans-serif" fontSize="11" fontWeight="600" fill={colors.indigo}>观察者</text>

                {/* 说明 */}
                <text x="300" y="310" textAnchor="middle" fontFamily="'Source Sans 3', sans-serif" fontSize="11" fill={colors.textLight}>面对面设置，摄像头在侧方</text>
              </svg>
            </Card>
          </Section>

          {/* 材料 */}
          <Section>
            <SectionTitle sub="简单的日常用品就够了。">材料</SectionTitle>
            <Card accent={colors.teal}>
              <CheckItem>一块轻薄、不透光的布（纱布包巾即可）</CheckItem>
              <CheckItem>弹椅或有支撑的座椅</CheckItem>
              <CheckItem>计时器或心里默数</CheckItem>
              <CheckItem>可选：手机三脚架侧面拍摄</CheckItem>
            </Card>
          </Section>

          {/* 基线试次 */}
          <Section bg={colors.card}>
            <SectionTitle color={colors.accent} sub={"先建立一个稳定的节奏——这就是宝宝的\u201C预期\u201D基准。进行3–4次，时间和用词完全一致。"}>基线试次（3–4 次重复）</SectionTitle>

            <SCard num="1" title="就位" subtitle="面对面坐好" color={colors.accent} bg={colors.accentLight} icon="🪑" isOpen={openS === 1} toggle={() => setOpenS(openS === 1 ? 0 : 1)} details={<p>面对面坐好，相距约60厘米。宝宝在弹椅上，与你的眼睛同高。确保背景干净，没有分散注意力的物品。</p>} />
            <SCard num="2" title="准备提示" subtitle="吸引宝宝注意" color={colors.accent} bg={colors.accentLight} icon="👀" isOpen={openS === 2} toggle={() => setOpenS(openS === 2 ? 0 : 2)} details={<p>与宝宝对视，用明快一致的语气说&ldquo;准备好了吗？&rdquo;等宝宝看着你再继续。</p>} />
            <SCard num="3" title="遮挡" subtitle="用布挡住脸" color={colors.accent} bg={colors.accentLight} icon="🙈" isOpen={openS === 3} toggle={() => setOpenS(openS === 3 ? 0 : 3)} details={<p>双手举布遮住脸（正中位置），说&ldquo;我去哪里了？&rdquo;——每次用同样的词、同样的语气。布要完全遮住你的脸，不要偷看。</p>} />
            <SCard num="4" title="暂停" subtitle="保持静止" color={colors.gold} bg={colors.goldLight} icon="⏸️" isOpen={openS === 4} toggle={() => setOpenS(openS === 4 ? 0 : 4)} details={<p>在布后面保持2秒钟，不动，不偷看，不发出声音。这个暂停让宝宝有时间形成预期。</p>} />
            <SCard num="5" title="揭开" subtitle="大笑登场" color={colors.teal} bg={colors.tealLight} icon="😃" isOpen={openS === 5} toggle={() => setOpenS(openS === 5 ? 0 : 5)} details={<p>把布直直放下：&ldquo;躲——猫——猫！&rdquo;露出大笑。然后等宝宝的反应——给他们时间微笑、发声或表达惊喜。</p>} />
            <SCard num="6" title="重置" subtitle="短暂休息" color={colors.indigo} bg={colors.indigoLight} icon="💬" isOpen={openS === 6} toggle={() => setOpenS(openS === 6 ? 0 : 6)} details={<p>轻声聊天5秒钟，让宝宝放松。然后重复整个流程。</p>} />
            <SCard num="7" title="保持一致" subtitle="建立预期" color={colors.accent} bg={colors.accentLight} icon="🔁" isOpen={openS === 7} toggle={() => setOpenS(openS === 7 ? 0 : 7)} details={<p>进行3–4次基线试次，时间和用词完全一致。你在建立一种预期——只有当宝宝&ldquo;知道&rdquo;接下来会发生什么，测试试次中的变化才有意义。</p>} />
          </Section>

          {/* 测试试次 */}
          <Section>
            <SectionTitle sub="基线建立好之后，每次只变化一个要素。实验的力量来自与基线的对比。">测试试次（每次只选一种变化）</SectionTitle>

            <Card accent={colors.gold} style={{ background: colors.goldLight, border: `1px solid ${colors.gold}40` }}>
              <Badge color={colors.gold} bg={`${colors.gold}20`}>变化 1 · 延迟揭开</Badge>
              <p style={{ fontSize: 15, lineHeight: 1.7, margin: "8px 0 0" }}>同样的流程，但布后暂停<strong>4–5秒</strong>（而不是2秒）。</p>
              <p style={{ fontSize: 15, lineHeight: 1.7, margin: "8px 0 0" }}><strong>观察：</strong>暂停期间宝宝是否出现预期性微笑或身体扭动？他们是否表现出&ldquo;等不及了&rdquo;的样子？</p>
            </Card>

            <Card accent={colors.teal} style={{ background: colors.tealLight, border: `1px solid ${colors.teal}40` }}>
              <Badge color={colors.teal} bg={`${colors.teal}20`}>变化 2 · 侧面揭开</Badge>
              <p style={{ fontSize: 15, lineHeight: 1.7, margin: "8px 0 0" }}>同样遮挡和暂停，但从<strong>左侧或右侧</strong>探头，而不是正面放下布。</p>
              <p style={{ fontSize: 15, lineHeight: 1.7, margin: "8px 0 0" }}><strong>观察：</strong>宝宝的目光是否先看向正中（预期位置），再找到你？这种目光转移说明他们已经建立了对揭开位置的预期。</p>
            </Card>

            <Card accent={colors.indigo} style={{ background: colors.indigoLight, border: `1px solid ${colors.indigo}40` }}>
              <Badge color={colors.indigo} bg={`${colors.indigo}20`}>变化 3 · 空位揭开</Badge>
              <p style={{ fontSize: 15, lineHeight: 1.7, margin: "8px 0 0" }}>遮挡后在布后面悄悄把脸移到一侧。放下布——正中是<strong>空的</strong>。停顿1秒，再从侧面露出。</p>
              <p style={{ fontSize: 15, lineHeight: 1.7, margin: "8px 0 0" }}><strong>观察：</strong>宝宝对正中空位是否表现出惊讶？他们可能会多看一会儿空位，或者表情突然变化。违反预期往往会引起更长的注视时间。</p>
            </Card>

            <Card style={{ background: colors.accentLight, border: `1px solid ${colors.accent}40`, textAlign: "center" }}>
              <p style={{ fontSize: 14, lineHeight: 1.6, margin: 0, color: colors.navy, fontWeight: 600 }}>💡 每次只变化一个要素。实验的力量来自与基线的对比。</p>
            </Card>
          </Section>

          <Section bg={colors.card}>
            <Card style={{ padding: 20 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: colors.textLight, marginBottom: 12, textAlign: "center", textTransform: "uppercase", letterSpacing: 1 }}>图 3 · 躲猫猫四步骤面板</div>
              <Image
                src="/images/guides/infant-experiments/fig-3-peekaboo-sequence.png"
                alt="四格躲猫猫插画，展示准备提示、遮挡阶段、揭开和社交重置。"
                width={1408}
                height={768}
                sizes="(max-width: 948px) calc(100vw - 88px), 860px"
                style={{ width: "100%", height: "auto", borderRadius: 12, display: "block" }}
              />
              <p style={{ fontSize: 12, color: colors.textLight, textAlign: "center", marginTop: 12, marginBottom: 0, lineHeight: 1.6 }}>
                1 准备提示：先对视，布放下。&middot; 2 遮挡阶段：从正中遮住脸，台词保持一致。&middot; 3 揭开：放下布，温暖地重新出现。&middot; 4 社交重置：短暂、平静地重新连接。
              </p>
            </Card>
          </Section>

          {/* Figure 4: 测试试次对比 */}
          <Section>
            <div style={{ fontSize: 13, fontWeight: 600, color: colors.textLight, marginBottom: 16, textTransform: "uppercase", letterSpacing: 1 }}>图 4 · 测试试次对比</div>
            <Card>
              <svg viewBox="0 0 750 220" style={{ width: "100%", maxWidth: 750 }}>
                {/* 标准 */}
                <rect x="10" y="10" width="230" height="160" rx="12" fill={colors.accentLight} stroke={colors.accent} strokeWidth="1.5" />
                <text x="125" y="36" textAnchor="middle" fontFamily="'Source Sans 3', sans-serif" fontSize="14" fontWeight="700" fill={colors.navy}>标准</text>
                <circle cx="125" cy="80" r="20" fill={colors.accent} fillOpacity="0.2" stroke={colors.accent} strokeWidth="1.5" />
                <text x="125" y="85" textAnchor="middle" fontSize="16">🧑</text>
                <path d="M125 105 L125 130" stroke={colors.accent} strokeWidth="1.5" strokeDasharray="4 2" />
                <text x="125" y="148" textAnchor="middle" fontFamily="'Source Sans 3', sans-serif" fontSize="11" fill={colors.textLight}>从正中揭开</text>
                <text x="125" y="163" textAnchor="middle" fontFamily="'Source Sans 3', sans-serif" fontSize="11" fill={colors.textLight}>暂停 2 秒</text>

                {/* 延迟 */}
                <rect x="260" y="10" width="230" height="160" rx="12" fill={colors.goldLight} stroke={colors.gold} strokeWidth="1.5" />
                <text x="375" y="36" textAnchor="middle" fontFamily="'Source Sans 3', sans-serif" fontSize="14" fontWeight="700" fill={colors.navy}>延迟</text>
                <circle cx="375" cy="80" r="20" fill={colors.gold} fillOpacity="0.2" stroke={colors.gold} strokeWidth="1.5" />
                <text x="375" y="85" textAnchor="middle" fontSize="16">⏳</text>
                <path d="M375 105 L375 130" stroke={colors.gold} strokeWidth="1.5" strokeDasharray="4 2" />
                <text x="375" y="148" textAnchor="middle" fontFamily="'Source Sans 3', sans-serif" fontSize="11" fill={colors.textLight}>从正中揭开</text>
                <text x="375" y="163" textAnchor="middle" fontFamily="'Source Sans 3', sans-serif" fontSize="11" fill={colors.textLight}>暂停 4–5 秒</text>

                {/* 侧面 */}
                <rect x="510" y="10" width="230" height="160" rx="12" fill={colors.tealLight} stroke={colors.teal} strokeWidth="1.5" />
                <text x="625" y="36" textAnchor="middle" fontFamily="'Source Sans 3', sans-serif" fontSize="14" fontWeight="700" fill={colors.navy}>侧面</text>
                <circle cx="605" cy="80" r="20" fill={colors.teal} fillOpacity="0.2" stroke={colors.teal} strokeWidth="1.5" />
                <text x="605" y="85" textAnchor="middle" fontSize="16">🧑</text>
                <path d="M645 80 L640 80" stroke={colors.teal} strokeWidth="1.5" />
                <path d="M625 105 L625 130" stroke={colors.teal} strokeWidth="1.5" strokeDasharray="4 2" />
                <text x="625" y="148" textAnchor="middle" fontFamily="'Source Sans 3', sans-serif" fontSize="11" fill={colors.textLight}>从侧面探头</text>
                <text x="625" y="163" textAnchor="middle" fontFamily="'Source Sans 3', sans-serif" fontSize="11" fill={colors.textLight}>👁️ 目光先看正中？</text>

                {/* 底部说明 */}
                <text x="375" y="200" textAnchor="middle" fontFamily="'Source Sans 3', sans-serif" fontSize="12" fontWeight="600" fill={colors.navy}>观察要点：宝宝的目光是否朝向他们预期你出现的位置？</text>
              </svg>
            </Card>
          </Section>

          <Section bg={colors.card}>
            <Card style={{ padding: 20 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: colors.textLight, marginBottom: 12, textAlign: "center", textTransform: "uppercase", letterSpacing: 1 }}>图 5 · 家长行为示例</div>
              <Image
                src="/images/guides/infant-experiments/fig-5-parent-behavior-strip.png"
                alt="家长行为示例插画，展示遮挡、揭开、重置，以及一个不小心提示答案的反面示例。"
                width={1376}
                height={768}
                sizes="(max-width: 948px) calc(100vw - 88px), 860px"
                style={{ width: "100%", height: "auto", borderRadius: 12, display: "block" }}
              />
              <p style={{ fontSize: 12, color: colors.textLight, textAlign: "center", marginTop: 12, marginBottom: 0, lineHeight: 1.6 }}>
                1 推荐：遮挡时保持居中、稳定。&middot; 2 推荐：从正中揭开，表情温暖。&middot; 3 推荐：回到放松的重置状态。&middot; 4 不推荐：提前侧看或前倾，等于暗示答案。
              </p>
            </Card>
          </Section>

          {/* 观察要点 & 不要做的事 */}
          <Section>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 20 }}>
              <Card accent={colors.green} style={{ background: colors.greenLight, border: `1px solid ${colors.green}40` }}>
                <Badge color={colors.green} bg={`${colors.green}20`}>观察要点</Badge>
                <CheckItem>预期性微笑——在揭开之前就开始笑</CheckItem>
                <CheckItem>暂停期间身体紧张或扭动</CheckItem>
                <CheckItem>目光转向预期揭开位置（尤其是侧面揭开试次）</CheckItem>
                <CheckItem>违反预期时反应更强——更大的微笑、更长的注视、惊讶表情</CheckItem>
                <CheckItem>主动重新吸引注意——发声或伸手够布</CheckItem>
              </Card>

              <WarnCard title="不要做的事">
                <WarnCheckItem>不要同时改变多个变量</WarnCheckItem>
                <WarnCheckItem>不要在布后面偷看或发出声音</WarnCheckItem>
                <WarnCheckItem>不要在揭开时身体前倾（会给宝宝空间提示）</WarnCheckItem>
                <WarnCheckItem>如果宝宝失去兴趣就停下——3次好的试次胜过6次无聊的</WarnCheckItem>
              </WarnCard>
            </div>
          </Section>

          {/* 参考文献 */}
          <Section bg={colors.card}>
            <Card accent={colors.accent}>
              <Badge color={colors.accent} bg={colors.accentLight}>参考文献</Badge>
              <ul style={{ fontSize: 13, lineHeight: 2, margin: "8px 0 0", paddingLeft: 20, color: colors.textLight }}>
                <li>Bruner, J. S., &amp; Sherwood, V. (1976). Peekaboo and the learning of rule structures. In J. S. Bruner, A. Jolly, &amp; K. Sylva (Eds.), <em>Play: Its role in development and evolution</em>. Penguin.</li>
                <li>Montague, D. P. F., &amp; Walker-Andrews, A. S. (2001). Peekaboo: A new look at infants&apos; perception of emotion expressions. <em>Developmental Psychology</em>, 37(6), 826–838.</li>
              </ul>
            </Card>
          </Section>
        </>
      )}

      {/* ═══════════════════════ TAB 3 — 静止脸实验 ═══════════════════════ */}
      {activeTab === "still-face" && (
        <>
          <Section>
            <SectionTitle sub="婴儿社会情感研究中被引用最多的范式之一——揭示宝宝对社交回应的深层预期。">静止脸实验</SectionTitle>

            <WarnCard title="这个实验完全是可选的">
              <p style={{ margin: 0 }}>这是婴儿社会情感研究中被研究最多的范式，但也是最可能引起短暂不适的一个。它揭示了一个令人惊叹的事实：到4–5个月大时，婴儿已经预期社交对象会做出即时回应。这个实验完全是可选的。如果你对这个想法感到不舒服，直接跳过——你不会错过任何关键的东西。</p>
            </WarnCard>
          </Section>

          {/* Figure 6: 静止脸实验时间轴 */}
          <Section bg={colors.card}>
            <div style={{ fontSize: 13, fontWeight: 600, color: colors.textLight, marginBottom: 16, textTransform: "uppercase", letterSpacing: 1 }}>图 6 · 静止脸实验时间轴</div>
            <Card>
              <svg viewBox="0 0 750 160" style={{ width: "100%", maxWidth: 750 }}>
                {/* 互动阶段 */}
                <rect x="20" y="30" width="280" height="50" rx="8" fill={colors.greenLight} stroke={colors.green} strokeWidth="2" />
                <text x="160" y="52" textAnchor="middle" fontFamily="'Source Sans 3', sans-serif" fontSize="14" fontWeight="700" fill={colors.green}>互动</text>
                <text x="160" y="70" textAnchor="middle" fontFamily="'Source Sans 3', sans-serif" fontSize="11" fill={colors.textLight}>正常温暖互动</text>
                <text x="160" y="22" textAnchor="middle" fontFamily="'Source Sans 3', sans-serif" fontSize="11" fontWeight="600" fill={colors.green}>60 秒</text>

                {/* 静止脸阶段 */}
                <rect x="310" y="30" width="160" height="50" rx="8" fill={colors.roseLight} stroke={colors.rose} strokeWidth="2" />
                <text x="390" y="52" textAnchor="middle" fontFamily="'Source Sans 3', sans-serif" fontSize="14" fontWeight="700" fill={colors.rose}>静止脸</text>
                <text x="390" y="70" textAnchor="middle" fontFamily="'Source Sans 3', sans-serif" fontSize="11" fill={colors.textLight}>中性表情，不回应</text>
                <text x="390" y="22" textAnchor="middle" fontFamily="'Source Sans 3', sans-serif" fontSize="11" fontWeight="600" fill={colors.rose}>≤30 秒</text>

                {/* 重聚阶段 */}
                <rect x="480" y="30" width="250" height="50" rx="8" fill={colors.greenLight} stroke={colors.green} strokeWidth="2" />
                <text x="605" y="52" textAnchor="middle" fontFamily="'Source Sans 3', sans-serif" fontSize="14" fontWeight="700" fill={colors.green}>重聚</text>
                <text x="605" y="70" textAnchor="middle" fontFamily="'Source Sans 3', sans-serif" fontSize="11" fill={colors.textLight}>立即恢复温暖互动</text>

                {/* 箭头 */}
                <path d="M302 55 L308 55" stroke={colors.textLight} strokeWidth="1.5" markerEnd="url(#arrowSF)" />
                <path d="M472 55 L478 55" stroke={colors.textLight} strokeWidth="1.5" markerEnd="url(#arrowSF)" />
                <defs><marker id="arrowSF" viewBox="0 0 6 6" refX="6" refY="3" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0L6 3L0 6z" fill={colors.textLight} /></marker></defs>

                {/* 警告 */}
                <rect x="270" y="98" width="220" height="28" rx="14" fill={colors.roseLight} stroke={colors.rose} strokeWidth="1" />
                <text x="380" y="117" textAnchor="middle" fontFamily="'Source Sans 3', sans-serif" fontSize="12" fontWeight="700" fill={colors.rose}>⚠️ 宝宝一哭就立即停止</text>

                {/* 底部说明 */}
                <text x="375" y="150" textAnchor="middle" fontFamily="'Source Sans 3', sans-serif" fontSize="11" fill={colors.textLight}>最长30秒。出现不适立即结束。</text>
              </svg>
            </Card>
          </Section>

          {/* 三个阶段 */}
          <Section>
            <SectionTitle sub="三个阶段，顺序不能打乱。重聚阶段不是可选的。">实验流程</SectionTitle>

            <Card accent={colors.green} style={{ background: colors.greenLight, border: `1px solid ${colors.green}40` }}>
              <Badge color={colors.green} bg={`${colors.green}20`}>阶段 1 · 互动阶段 — 60 秒</Badge>
              <p style={{ fontSize: 15, lineHeight: 1.7, margin: "8px 0 0" }}>正常、温暖的面对面互动。说话、微笑、自然回应宝宝的声音和动作。像你平时跟宝宝聊天一样——这是接下来对比的基准。</p>
            </Card>

            <Card accent={colors.rose} style={{ background: colors.roseLight, border: `1px solid ${colors.rose}40` }}>
              <Badge color={colors.rose} bg={`${colors.rose}20`}>阶段 2 · 静止脸阶段 — 最长 30 秒</Badge>
              <p style={{ fontSize: 15, lineHeight: 1.7, margin: "8px 0 0" }}>停止说话、微笑、触碰。用放松的中性表情看着宝宝。</p>
              <div style={{ background: colors.card, borderRadius: 12, padding: 20, marginTop: 16 }}>
                <div style={{ fontWeight: 700, color: colors.navy, marginBottom: 8 }}>&ldquo;中性&rdquo;的含义：</div>
                <CheckItem>放松的面部，不紧绷</CheckItem>
                <CheckItem>直视但柔和的目光——看着宝宝，不要穿透他们</CheckItem>
                <CheckItem>不笑、不说话、不触碰、不点头</CheckItem>
                <CheckItem>不向前倾</CheckItem>
                <CheckItem>不皱眉——只是安静</CheckItem>
              </div>
              <div style={{ background: colors.card, borderRadius: 12, padding: 20, marginTop: 16 }}>
                <div style={{ fontWeight: 700, color: colors.rose, marginBottom: 8 }}>立即中止条件：</div>
                <WarnCheckItem>宝宝哭泣（不是小声嘟囔）</WarnCheckItem>
                <WarnCheckItem>表情崩溃或脸变红</WarnCheckItem>
                <WarnCheckItem>你感到不舒服</WarnCheckItem>
                <WarnCheckItem>到达30秒</WarnCheckItem>
              </div>
            </Card>

            <Card accent={colors.green} style={{ background: colors.greenLight, border: `1px solid ${colors.green}40` }}>
              <Badge color={colors.green} bg={`${colors.green}20`}>阶段 3 · 重聚阶段 — 立即开始</Badge>
              <p style={{ fontSize: 15, lineHeight: 1.7, margin: "8px 0 0" }}>静止脸一结束就<strong>立即</strong>恢复温暖互动。大笑、温暖声音、如果宝宝想抱就抱起来。这个阶段不是可选的——它是实验的核心修复环节。</p>
            </Card>
          </Section>

          {/* 你可能会看到什么 */}
          <Section bg={colors.card}>
            <SectionTitle color={colors.accent} sub="大多数宝宝会经历一个清晰的行为序列。">你可能会看到什么</SectionTitle>

            <Card accent={colors.gold}>
              <Badge color={colors.gold} bg={colors.goldLight}>静止脸期间</Badge>
              <p style={{ fontSize: 15, lineHeight: 1.7, margin: "8px 0 0" }}>宝宝可能会尝试重新吸引你——微笑、咕咕叫、伸手、挥臂。如果这些都不管用，可能出现困惑的表情或轻微不安。这恰恰说明他们已经建立了对社交回应的预期——你的沉默打破了这个预期。</p>
            </Card>

            <Card accent={colors.teal}>
              <Badge color={colors.teal} bg={colors.tealLight}>重聚期间</Badge>
              <p style={{ fontSize: 15, lineHeight: 1.7, margin: "8px 0 0" }}>你可能会注意到短暂的警惕——宝宝恢复互动可能比静止脸前稍慢一点。这叫&ldquo;延续效应&rdquo;（carry-over effect），是完全正常的。几分钟内就会完全恢复。</p>
            </Card>
          </Section>

          <Section>
            <SectionTitle sub="这个小实验揭示的发展里程碑比你想象的更深刻。">说明了什么</SectionTitle>

            <Card accent={colors.accent}>
              <p style={{ fontSize: 15, lineHeight: 1.7, margin: 0 }}>到4–5个月，宝宝已经建立了精密的社会互动模型。他们预期你会回应、会互动。静止脸打断了这个预期，他们的反应——先尝试修复，再表现出困惑——表明社会认知的发展远比我们以为的更早。这不是&ldquo;难过&rdquo;，而是&ldquo;等等，这不对&rdquo;。</p>
            </Card>

            <Card style={{ background: colors.greenLight, border: `1px solid ${colors.green}40` }}>
              <Badge color={colors.green} bg={`${colors.green}20`}>始终以温暖的重新连接结束</Badge>
              <p style={{ fontSize: 15, lineHeight: 1.7, margin: "8px 0 0" }}>大笑、拥抱、温暖的话语。让宝宝知道你一直在这里。修复是这个实验中最重要的部分。</p>
            </Card>
          </Section>

          {/* 参考文献 */}
          <Section bg={colors.card}>
            <Card accent={colors.accent}>
              <Badge color={colors.accent} bg={colors.accentLight}>参考文献</Badge>
              <ul style={{ fontSize: 13, lineHeight: 2, margin: "8px 0 0", paddingLeft: 20, color: colors.textLight }}>
                <li>Tronick, E., Als, H., Adamson, L., Wise, S., &amp; Brazelton, T. B. (1978). The infant&apos;s response to entrapment between contradictory messages in face-to-face interaction. <em>Journal of the American Academy of Child Psychiatry</em>, 17(1), 1–13.</li>
                <li>Adamson, L. B., &amp; Frick, J. E. (2003). The still-face: A history of a shared experimental paradigm. <em>Infancy</em>, 4(4), 451–473.</li>
              </ul>
            </Card>
          </Section>
        </>
      )}

      {/* ═══════════════════════ TAB 4 — 踢腿联动 ═══════════════════════ */}
      {activeTab === "kick" && (
        <>
          <Section>
            <SectionTitle sub={"观察宝宝如何发现\u201C我的动作导致了那个效果\u201D——因果关系学习的最早证据之一。"}>踢腿联动：偶联学习实验</SectionTitle>

            <Card accent={colors.accent}>
              <p style={{ fontSize: 15, lineHeight: 1.7, margin: 0 }}>1969年，Carolyn Rovee 和 David Rovee 发现了一件令人惊讶的事：当把一条丝带从3个月大婴儿的脚踝连接到头顶的悬挂玩具时，宝宝很快学会踢腿会让玩具动起来——然后踢得更多、更有力。这是最早证明幼小婴儿能发现因果关系的实验之一。我们的居家版本使用健身架和软丝带来重现这个经典发现。</p>
            </Card>
          </Section>

          {/* 安全须知 */}
          <Section bg={colors.card}>
            <WarnCard title="⚠️ 安全须知——请先阅读">
              <Badge color={colors.rose} bg={`${colors.rose}20`}>安全须知</Badge>
              <div style={{ marginTop: 8 }}>
                <WarnCheckItem><strong>全程监护</strong>——家长始终在伸手可及的范围内</WarnCheckItem>
                <WarnCheckItem><strong>只使用柔软布料丝带或环</strong>——不会缠绕手脚的材质</WarnCheckItem>
                <WarnCheckItem>试次结束后<strong>立即取下连接</strong></WarnCheckItem>
                <WarnCheckItem><strong>绝不</strong>在睡觉或无人看管时使用</WarnCheckItem>
                <WarnCheckItem>宝宝有任何不适立即断开</WarnCheckItem>
                <WarnCheckItem>只在地面健身架上使用，<strong>不用</strong>婴儿床悬挂式</WarnCheckItem>
                <WarnCheckItem>每次结束都彻底取下丝带</WarnCheckItem>
              </div>
            </WarnCard>
          </Section>

          {/* Figure 7: 设置示意图 */}
          <Section>
            <div style={{ fontSize: 13, fontWeight: 600, color: colors.textLight, marginBottom: 16, textTransform: "uppercase", letterSpacing: 1 }}>图 7 · 踢腿联动设置示意图</div>
            <Card>
              <svg viewBox="0 0 600 340" style={{ width: "100%", maxWidth: 600, display: "block", margin: "0 auto" }}>
                {/* 地面 */}
                <rect x="50" y="260" width="500" height="4" rx="2" fill={colors.border} />

                {/* 健身架拱形 */}
                <path d="M150 260 Q150 60 300 60 Q450 60 450 260" fill="none" stroke={colors.accent} strokeWidth="3" />

                {/* 悬挂玩具 */}
                <line x1="300" y1="100" x2="300" y2="140" stroke={colors.accent} strokeWidth="1.5" />
                <circle cx="300" cy="152" r="14" fill={colors.goldLight} stroke={colors.gold} strokeWidth="2" />
                <text x="300" y="157" textAnchor="middle" fontSize="12">⭐</text>

                {/* 宝宝 */}
                <ellipse cx="300" cy="230" rx="60" ry="25" fill={colors.tealLight} stroke={colors.teal} strokeWidth="1.5" />
                <circle cx="260" cy="220" r="14" fill={colors.tealLight} stroke={colors.teal} strokeWidth="1.5" />
                <text x="260" y="225" textAnchor="middle" fontSize="10">👶</text>

                {/* 脚踝 */}
                <circle cx="370" cy="240" r="6" fill={colors.tealLight} stroke={colors.teal} strokeWidth="1.5" />

                {/* 丝带（虚线） */}
                <path d="M370 234 Q380 180 300 160" fill="none" stroke={colors.gold} strokeWidth="2" strokeDasharray="6 3" />

                {/* 标签 */}
                <text x="300" y="280" textAnchor="middle" fontFamily="'Source Sans 3', sans-serif" fontSize="12" fontWeight="600" fill={colors.navy}>宝宝仰卧</text>
                <text x="405" y="230" fontFamily="'Source Sans 3', sans-serif" fontSize="11" fill={colors.gold} fontWeight="600">踢腿 → 玩具动</text>

                {/* 安全标注 */}
                <rect x="70" y="295" width="200" height="24" rx="12" fill={colors.roseLight} stroke={colors.rose} strokeWidth="1" />
                <text x="170" y="312" textAnchor="middle" fontFamily="'Source Sans 3', sans-serif" fontSize="11" fontWeight="700" fill={colors.rose}>⚠️ 全程监护</text>

                <rect x="330" y="295" width="220" height="24" rx="12" fill={colors.goldLight} stroke={colors.gold} strokeWidth="1" />
                <text x="440" y="312" textAnchor="middle" fontFamily="'Source Sans 3', sans-serif" fontSize="11" fontWeight="600" fill={colors.gold}>柔软丝带，松松套住——不要系紧</text>
              </svg>
            </Card>
          </Section>

          {/* 材料 */}
          <Section bg={colors.card}>
            <SectionTitle sub="确保所有材料安全、柔软、不可缠绕。">材料</SectionTitle>
            <Card accent={colors.teal}>
              <CheckItem>带悬挂玩具的健身架</CheckItem>
              <CheckItem>柔软布料丝带（约50厘米）</CheckItem>
              <CheckItem>计时器</CheckItem>
              <CheckItem>观察者（带笔记本或手机录像）</CheckItem>
            </Card>
          </Section>

          {/* 三阶段方案 */}
          <Section>
            <SectionTitle sub="基线 → 联动 → 断开——三个阶段揭示宝宝是否注意到了因果关系。">实验方案</SectionTitle>

            <Card accent={colors.indigo} style={{ background: colors.indigoLight, border: `1px solid ${colors.indigo}40` }}>
              <Badge color={colors.indigo} bg={`${colors.indigo}20`}>阶段 1 · 基线 — 2 分钟</Badge>
              <p style={{ fontSize: 15, lineHeight: 1.7, margin: "8px 0 0" }}>宝宝仰卧在健身架下方，脚靠近悬挂玩具但<strong>不连接丝带</strong>。记录宝宝自然踢腿的次数——这就是你的基线数据。</p>
            </Card>

            <FlowArrow />

            <Card accent={colors.accent} style={{ background: colors.accentLight, border: `1px solid ${colors.accent}40` }}>
              <Badge color={colors.accent} bg={`${colors.accent}20`}>阶段 2 · 联动 — 3–5 分钟</Badge>
              <p style={{ fontSize: 15, lineHeight: 1.7, margin: "8px 0 0" }}>把丝带松松套在脚踝和悬挂玩具之间——踢腿会让玩具动起来或发出声响。<strong>保持在伸手可及的距离内。</strong>不要用语言提示宝宝注意连接，不要指向丝带。让宝宝自己发现。</p>
            </Card>

            <FlowArrow />

            <Card accent={colors.gold} style={{ background: colors.goldLight, border: `1px solid ${colors.gold}40` }}>
              <Badge color={colors.gold} bg={`${colors.gold}20`}>阶段 3 · 断开 — 2 分钟</Badge>
              <p style={{ fontSize: 15, lineHeight: 1.7, margin: "8px 0 0" }}>轻轻取下丝带。继续观察宝宝的行为变化——踢腿频率是否先增加（试图恢复效果），然后逐渐减少？</p>
            </Card>
          </Section>

          {/* 观察要点 */}
          <Section bg={colors.card}>
            <SectionTitle color={colors.green} sub="如果宝宝注意到了联系，你会看到清晰的行为变化。">观察要点</SectionTitle>

            <Card accent={colors.green} style={{ background: colors.greenLight, border: `1px solid ${colors.green}40` }}>
              <CheckItem>联动阶段踢腿频率增加（与基线对比）</CheckItem>
              <CheckItem>踢腿时目光看向玩具</CheckItem>
              <CheckItem>踢腿变得更有意识、更有力</CheckItem>
              <CheckItem>断开后：一阵更密集的踢腿（试图恢复效果）</CheckItem>
              <CheckItem>断开后：期待地看着玩具</CheckItem>
              <CheckItem>断开后：放弃后踢腿减少</CheckItem>
            </Card>
          </Section>

          {/* 谨慎解读 */}
          <Section>
            <Card style={{ background: colors.goldLight, border: `1px solid ${colors.gold}40` }}>
              <Badge color={colors.gold} bg={`${colors.gold}20`}>谨慎解读</Badge>
              <p style={{ fontSize: 15, lineHeight: 1.7, margin: "8px 0 0" }}>这展示的是<strong>偶联检测</strong>——宝宝注意到&ldquo;我的动作导致了那个效果&rdquo;。单次家庭实验无法得出关于记忆或学习能力的结论。原始研究在实验室条件下进行了多天多次实验。你能在家观察的是当下的&ldquo;恍然大悟&rdquo;——宝宝是否注意到了踢腿和玩具运动之间的联系。</p>
            </Card>
          </Section>

          {/* 参考文献 */}
          <Section bg={colors.card}>
            <Card accent={colors.accent}>
              <Badge color={colors.accent} bg={colors.accentLight}>参考文献</Badge>
              <ul style={{ fontSize: 13, lineHeight: 2, margin: "8px 0 0", paddingLeft: 20, color: colors.textLight }}>
                <li>Rovee, C. K., &amp; Rovee, D. T. (1969). Conjugate reinforcement of infant exploratory behavior. <em>Journal of Experimental Child Psychology</em>, 8(1), 33–39.</li>
                <li>Rovee-Collier, C. (1999). The development of infant memory. <em>Current Directions in Psychological Science</em>, 8(3), 80–85.</li>
              </ul>
            </Card>
          </Section>
        </>
      )}

      {/* ═══════════════════════ TAB 5 — 模仿套组 ═══════════════════════ */}
      {activeTab === "imitation" && (
        <>
          <Section>
            <SectionTitle sub="从即时物体模仿到延迟回忆——三个难度递增的变体，观察宝宝的学习与复制能力。">模仿套组</SectionTitle>

            <Card accent={colors.accent}>
              <p style={{ fontSize: 15, lineHeight: 1.7, margin: 0 }}>模仿是发展心理学中争议最大的话题之一。过去认为新生儿能模仿面部表情的说法（Meltzoff &amp; Moore, 1977）已被大规模重复实验质疑。但到4–6个月，有确凿证据表明婴儿能模仿新颖的物体导向动作——而且年龄越大，能跨越的延迟时间越长。以下是三个变体，从最容易到最令人印象深刻。</p>
            </Card>
          </Section>

          {/* Figure 8: 模仿变体对比矩阵 */}
          <Section bg={colors.card}>
            <div style={{ fontSize: 13, fontWeight: 600, color: colors.textLight, marginBottom: 16, textTransform: "uppercase", letterSpacing: 1 }}>图 8 · 模仿变体对比矩阵</div>
            <Card>
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14, lineHeight: 1.6 }}>
                  <thead>
                    <tr style={{ background: colors.accentLight }}>
                      <th style={{ padding: "12px 14px", textAlign: "left", fontWeight: 700, color: colors.navy, borderBottom: `2px solid ${colors.accent}` }}></th>
                      <th style={{ padding: "12px 14px", textAlign: "center", fontWeight: 700, color: colors.gold, borderBottom: `2px solid ${colors.gold}` }}>变体 A</th>
                      <th style={{ padding: "12px 14px", textAlign: "center", fontWeight: 700, color: colors.teal, borderBottom: `2px solid ${colors.teal}` }}>变体 B</th>
                      <th style={{ padding: "12px 14px", textAlign: "center", fontWeight: 700, color: colors.indigo, borderBottom: `2px solid ${colors.indigo}` }}>变体 C</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { label: "类型", a: "即时物体模仿", b: "短延迟延迟模仿", c: "木偶式模仿" },
                      { label: "最佳月龄", a: "4–5个月", b: "5–6个月", c: "5–6个月" },
                      { label: "示范次数", a: "3次", b: "3次", c: "3次" },
                      { label: "延迟", a: "无", b: "10+ 分钟", c: "10+ 分钟" },
                      { label: "成功标准", a: "动作的任何部分", b: "延迟后的任何部分", c: "够到并发出声响" },
                      { label: "难度", a: "★", b: "★★", c: "★★★" },
                    ].map((row, i) => (
                      <tr key={i} style={{ borderBottom: `1px solid ${colors.border}` }}>
                        <td style={{ padding: "10px 14px", fontWeight: 600, color: colors.navy }}>{row.label}</td>
                        <td style={{ padding: "10px 14px", textAlign: "center" }}>{row.a}</td>
                        <td style={{ padding: "10px 14px", textAlign: "center" }}>{row.b}</td>
                        <td style={{ padding: "10px 14px", textAlign: "center" }}>{row.c}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </Section>

          {/* 变体 A */}
          <Section>
            <Card accent={colors.gold} style={{ background: colors.goldLight, border: `1px solid ${colors.gold}40` }}>
              <Badge color={colors.gold} bg={`${colors.gold}20`}>最容易 — 4–5个月</Badge>
              <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 22, fontWeight: 700, color: colors.navy, margin: "8px 0 16px" }}>变体 A：即时物体模仿</h3>

              <SCard num="1" title="选择物体" subtitle="选一个简单的物品" color={colors.gold} bg={`${colors.gold}15`} icon="🎯" isOpen={openS === 11} toggle={() => setOpenS(openS === 11 ? 0 : 11)} details={<p>选择简单物体——摇铃、杯子、软积木都可以。关键是选宝宝能抓握的东西。</p>} />
              <SCard num="2" title="设计不寻常动作" subtitle="宝宝不会自发做的" color={colors.gold} bg={`${colors.gold}15`} icon="🎭" isOpen={openS === 12} toggle={() => setOpenS(openS === 12 ? 0 : 12)} details={<div><p>做一个宝宝不会自发做的不寻常动作。例如：</p><ul style={{ paddingLeft: 20, marginTop: 8 }}><li>用摇铃在桌上敲出特定的3下节奏</li><li>用手背按按钮</li><li>把杯子翻过来敲杯底</li></ul></div>} />
              <SCard num="3" title="慢速示范" subtitle="清晰、夸张地重复3次" color={colors.gold} bg={`${colors.gold}15`} icon="🔄" isOpen={openS === 13} toggle={() => setOpenS(openS === 13 ? 0 : 13)} details={<p>慢速、清晰地示范3次。动作夸张一些，聚精会神，让宝宝能看清楚每一步。</p>} />
              <SCard num="4" title="递交物体" subtitle="立即把物体递给宝宝" color={colors.gold} bg={`${colors.gold}15`} icon="🤲" isOpen={openS === 14} toggle={() => setOpenS(openS === 14 ? 0 : 14)} details={<p>示范结束后立即把物体递给宝宝。不要说&ldquo;你试试！&rdquo;，不指向物体，不再示范。</p>} />
              <SCard num="5" title="安静等待" subtitle="观察30秒" color={colors.gold} bg={`${colors.gold}15`} icon="⏱️" isOpen={openS === 15} toggle={() => setOpenS(openS === 15 ? 0 : 15)} details={<p>安静等待，观察30秒。不要催促、不要提示。让宝宝自己决定做什么。</p>} />

              <div style={{ background: colors.card, borderRadius: 12, padding: 16, marginTop: 12 }}>
                <p style={{ fontSize: 14, lineHeight: 1.6, margin: 0, color: colors.navy }}><strong>成功标准：</strong>宝宝执行了动作的任何部分——不需要完美复制。</p>
              </div>
            </Card>
          </Section>

          {/* 变体 B */}
          <Section bg={colors.card}>
            <Card accent={colors.teal} style={{ background: colors.tealLight, border: `1px solid ${colors.teal}40` }}>
              <Badge color={colors.teal} bg={`${colors.teal}20`}>更难 — 5–6个月</Badge>
              <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 22, fontWeight: 700, color: colors.navy, margin: "8px 0 16px" }}>变体 B：短延迟延迟模仿</h3>

              <p style={{ fontSize: 15, lineHeight: 1.7, margin: "0 0 16px" }}>与变体 A 相同的示范流程，但加入了延迟：</p>

              <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                <FlowBox color={colors.teal} bg={`${colors.teal}10`}>🔄 <strong>示范3次</strong>——同样的慢速、夸张、清晰</FlowBox>
                <FlowArrow />
                <FlowBox color={colors.gold} bg={colors.goldLight}>📦 <strong>收起物体</strong>——放到宝宝看不到的地方</FlowBox>
                <FlowArrow />
                <FlowBox color={colors.indigo} bg={colors.indigoLight}>⏳ <strong>做其他活动10分钟</strong>——换尿布、唱歌、随便做点别的</FlowBox>
                <FlowArrow />
                <FlowBox color={colors.teal} bg={`${colors.teal}10`}>🤲 <strong>重新拿出物体</strong>——不提示、不再示范，直接递给宝宝</FlowBox>
                <FlowArrow />
                <FlowBox color={colors.accent} bg={colors.accentLight}>👀 <strong>安静等待</strong>——观察30秒</FlowBox>
              </div>

              <div style={{ background: colors.card, borderRadius: 12, padding: 16, marginTop: 16 }}>
                <p style={{ fontSize: 14, lineHeight: 1.6, margin: 0, color: colors.navy }}><strong>成功标准：</strong>在延迟后、没有重新看到示范的情况下执行动作的任何部分。这需要记忆——比即时模仿更令人印象深刻。</p>
              </div>
            </Card>
          </Section>

          {/* 变体 C */}
          <Section>
            <Card accent={colors.indigo} style={{ background: colors.indigoLight, border: `1px solid ${colors.indigo}40` }}>
              <Badge color={colors.indigo} bg={`${colors.indigo}20`}>最令人印象深刻 — 5–6个月</Badge>
              <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 22, fontWeight: 700, color: colors.navy, margin: "8px 0 16px" }}>变体 C：木偶式模仿</h3>

              <p style={{ fontSize: 15, lineHeight: 1.7, margin: "0 0 8px" }}>基于 Barr 和 Hayne 的经典木偶范式：</p>

              <SCard num="1" title="准备手偶" subtitle="带铃铛或摇铃的手偶/手套" color={colors.indigo} bg={`${colors.indigo}10`} icon="🧤" isOpen={openS === 21} toggle={() => setOpenS(openS === 21 ? 0 : 21)} details={<p>找一个手偶或带铃铛/摇铃的手套。关键是它能发出声响。</p>} />
              <SCard num="2" title="示范" subtitle="戴上手偶，摇动发声" color={colors.indigo} bg={`${colors.indigo}10`} icon="🎵" isOpen={openS === 22} toggle={() => setOpenS(openS === 22 ? 0 : 22)} details={<p>戴上手偶，摇动发出声响——清晰夸张地示范3次。让宝宝看到动作和听到结果之间的联系。</p>} />
              <SCard num="3" title="取下并延迟" subtitle="等待10分钟以上" color={colors.indigo} bg={`${colors.indigo}10`} icon="⏳" isOpen={openS === 23} toggle={() => setOpenS(openS === 23 ? 0 : 23)} details={<p>取下手偶，做其他活动至少10分钟。</p>} />
              <SCard num="4" title="递给宝宝" subtitle="观察宝宝的反应" color={colors.indigo} bg={`${colors.indigo}10`} icon="👀" isOpen={openS === 24} toggle={() => setOpenS(openS === 24 ? 0 : 24)} details={<p>延迟后把手偶递给宝宝。观察：宝宝是否够取并尝试发出声响？</p>} />

              <div style={{ background: colors.card, borderRadius: 12, padding: 16, marginTop: 12 }}>
                <p style={{ fontSize: 14, lineHeight: 1.6, margin: 0, color: colors.navy }}><strong>成功标准：</strong>产生声响的任何动作。宝宝不需要完美复制你的动作——任何导致手偶发出声音的尝试都算成功。</p>
              </div>
            </Card>
          </Section>

          {/* 所有变体通用提示 */}
          <Section bg={colors.card}>
            <Card accent={colors.accent}>
              <Badge color={colors.accent} bg={colors.accentLight}>所有变体通用提示</Badge>
              <div style={{ marginTop: 8 }}>
                <CheckItem><strong>要有表演感：</strong>慢速、夸张、清晰的示范——你是在上演一出小型表演</CheckItem>
                <CheckItem><strong>不要过度暗示：</strong>不说&ldquo;轮到你了！&rdquo;，不指着物体看，不用期待的眼神盯着宝宝</CheckItem>
                <CheckItem><strong>3次示范刚刚好：</strong>多了可能厌烦，少了可能没注意到</CheckItem>
                <CheckItem><strong>部分成功就是成功：</strong>婴儿的模仿是近似的，不是精确复制</CheckItem>
                <CheckItem><strong>性格因素影响很大：</strong>谨慎型宝宝可能专注观看但不动手——这不是失败，而是一种不同的参与方式</CheckItem>
                <CheckItem><strong>试试不同的清醒时段：</strong>上午精力充沛时和下午疲倦时，表现可能截然不同</CheckItem>
              </div>
            </Card>
          </Section>

          {/* 参考文献 */}
          <Section>
            <Card accent={colors.accent}>
              <Badge color={colors.accent} bg={colors.accentLight}>参考文献</Badge>
              <ul style={{ fontSize: 13, lineHeight: 2, margin: "8px 0 0", paddingLeft: 20, color: colors.textLight }}>
                <li>Collie, R., &amp; Hayne, H. (1999). Deferred imitation by 6- and 9-month-old infants: More evidence for declarative memory. <em>Developmental Psychobiology</em>, 35(2), 83–90.</li>
                <li>Barr, R., Dowden, A., &amp; Hayne, H. (1996). Developmental changes in deferred imitation by 6- to 24-month-old infants. <em>Infant Behavior and Development</em>, 19(2), 159–170.</li>
              </ul>
            </Card>
          </Section>
        </>
      )}

      {/* ═══════════════════════ TAB 6 — 记录与反思 ═══════════════════════ */}
      {activeTab === "record" && (
        <>
          <Section>
            <SectionTitle sub="好的观察 = 写下你看到的。好的科学 = 不急着解读。">观察而不过度解读</SectionTitle>

            <Card accent={colors.accent}>
              <CheckItem><strong>写下你看到的，不是你认为它意味着什么。</strong>&ldquo;宝宝踢得更多了&rdquo;是观察，&ldquo;宝宝理解了因果关系&rdquo;是解读。</CheckItem>
              <CheckItem><strong>一次试验 ≠ 结论。</strong>发展心理学研究需要大量样本和多次重复——你的一次家庭实验只是一个有趣的观察点。</CheckItem>
              <CheckItem><strong>性格和时机是巨大的干扰因素。</strong>同一个宝宝上午10点可能表现出色，下午4点可能完全没兴趣。</CheckItem>
              <CheckItem><strong>在不同天重复实验最有参考价值。</strong>一致的模式比一次惊艳的表现更有意义。</CheckItem>
            </Card>
          </Section>

          {/* Figure 9: 观察模板 */}
          <Section bg={colors.card}>
            <div style={{ fontSize: 13, fontWeight: 600, color: colors.textLight, marginBottom: 16, textTransform: "uppercase", letterSpacing: 1 }}>图 9 · 观察记录模板</div>
            <Card accent={colors.accent}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                <Badge color={colors.accent} bg={colors.accentLight}>复制到剪贴板即可使用</Badge>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(observationTemplate).then(() => {
                      setCopied(true);
                      setTimeout(() => setCopied(false), 2000);
                    });
                  }}
                  style={{
                    background: copied ? colors.green : colors.accent,
                    color: "#fff",
                    border: "none",
                    borderRadius: 8,
                    padding: "8px 20px",
                    fontSize: 14,
                    fontWeight: 600,
                    cursor: "pointer",
                    transition: "background 0.2s",
                    fontFamily: "'Source Sans 3', sans-serif",
                  }}
                >
                  {copied ? "已复制 ✓" : "复制到剪贴板"}
                </button>
              </div>
              <pre style={{
                background: colors.bg,
                borderRadius: 12,
                padding: 20,
                fontSize: 14,
                lineHeight: 2,
                color: colors.text,
                fontFamily: "'Source Sans 3', sans-serif",
                whiteSpace: "pre-wrap",
                border: `1px solid ${colors.border}`,
                margin: 0,
              }}>
                {observationTemplate}
              </pre>
            </Card>
          </Section>

          {/* "我们会回来更新" */}
          <Section>
            <Card style={{ background: colors.goldLight, border: `1px solid ${colors.gold}40` }}>
              <Badge color={colors.gold} bg={`${colors.gold}20`}>我们会回来更新</Badge>
              <p style={{ fontSize: 15, lineHeight: 1.7, margin: "8px 0 0" }}>我们还没有做这些实验——宝宝即将进入适合的月龄窗口。我们计划在接下来几周尝试，并在这里更新实际观察：什么有效、什么出乎意料、宝宝最喜欢哪个实验。</p>
            </Card>
          </Section>

          {/* 完整参考文献 */}
          <Section bg={colors.card}>
            <SectionTitle sub="本指南引用的发展心理学文献。">参考文献</SectionTitle>

            <Card accent={colors.accent}>
              <ol style={{ fontSize: 13, lineHeight: 2.2, margin: 0, paddingLeft: 20, color: colors.textLight }}>
                <li>Adamson, L. B., &amp; Frick, J. E. (2003). The still-face: A history of a shared experimental paradigm. <em>Infancy</em>, 4(4), 451–473.</li>
                <li>Barr, R., Dowden, A., &amp; Hayne, H. (1996). Developmental changes in deferred imitation by 6- to 24-month-old infants. <em>Infant Behavior and Development</em>, 19(2), 159–170.</li>
                <li>Bruner, J. S., &amp; Sherwood, V. (1976). Peekaboo and the learning of rule structures. In J. S. Bruner, A. Jolly, &amp; K. Sylva (Eds.), <em>Play: Its role in development and evolution</em>. Penguin.</li>
                <li>Collie, R., &amp; Hayne, H. (1999). Deferred imitation by 6- and 9-month-old infants: More evidence for declarative memory. <em>Developmental Psychobiology</em>, 35(2), 83–90.</li>
                <li>Montague, D. P. F., &amp; Walker-Andrews, A. S. (2001). Peekaboo: A new look at infants&apos; perception of emotion expressions. <em>Developmental Psychology</em>, 37(6), 826–838.</li>
                <li>Rovee, C. K., &amp; Rovee, D. T. (1969). Conjugate reinforcement of infant exploratory behavior. <em>Journal of Experimental Child Psychology</em>, 8(1), 33–39.</li>
                <li>Rovee-Collier, C. (1999). The development of infant memory. <em>Current Directions in Psychological Science</em>, 8(3), 80–85.</li>
                <li>Tronick, E., Als, H., Adamson, L., Wise, S., &amp; Brazelton, T. B. (1978). The infant&apos;s response to entrapment between contradictory messages in face-to-face interaction. <em>Journal of the American Academy of Child Psychiatry</em>, 17(1), 1–13.</li>
              </ol>
            </Card>
          </Section>
        </>
      )}

      {/* ═══════════════════════ CONCLUSION FOOTER ═══════════════════════ */}
      <div style={{ background: `linear-gradient(135deg, ${colors.navy} 0%, #0f2b22 50%, #163028 100%)`, padding: "56px 24px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, opacity: 0.05, background: "radial-gradient(circle at 70% 30%, rgba(59,138,122,0.4) 0%, transparent 60%)" }}></div>
        <div style={{ position: "relative", maxWidth: 720, margin: "0 auto", textAlign: "center" }}>
          <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", color: colors.accent, marginBottom: 12 }}>总结</div>
          <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 28, fontWeight: 800, color: "#fff", margin: 0, lineHeight: 1.3 }}>4 个实验 · 8 项标志性研究 · 1 个好奇的宝宝</h2>
          <p style={{ fontSize: 17, color: "rgba(255,255,255,0.7)", marginTop: 16, lineHeight: 1.7, maxWidth: 600, margin: "16px auto 0" }}>记住：这是探索，不是评估。</p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 16, marginTop: 32 }}>
            {[
              { icon: "👀", stat: "躲猫猫", label: "社会预测" },
              { icon: "😶", stat: "静止脸", label: "社交回应预期" },
              { icon: "🦵", stat: "踢腿", label: "因果关系发现" },
              { icon: "🪞", stat: "模仿", label: "观察学习能力" },
            ].map((item, i) => (
              <div key={i} style={{ background: "rgba(255,255,255,0.08)", borderRadius: 14, padding: 20, border: "1px solid rgba(255,255,255,0.1)" }}>
                <div style={{ fontSize: 28 }}>{item.icon}</div>
                <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 20, fontWeight: 700, color: colors.accent, marginTop: 8 }}>{item.stat}</div>
                <div style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", marginTop: 4, lineHeight: 1.4 }}>{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div style={{ background: colors.navy, padding: "32px 24px", textAlign: "center" }}>
        <p style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", margin: 0, lineHeight: 1.6 }}>基于发展心理学经典文献的居家改编<br />这些是观察活动，不是诊断工具——不能替代专业评估。</p>
      </div>

      {/* COMMENTS */}
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 24px 48px" }}>
        <GiscusComments locale="zh" term="/guides/infant-experiments" />
      </div>
    </div>
  );
}
