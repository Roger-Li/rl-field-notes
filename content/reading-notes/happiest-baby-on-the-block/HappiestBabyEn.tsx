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

export default function HappiestBabySummary() {
  const [openS, setOpenS] = useState(0);
  const [activeTab, setActiveTab] = useState("overview");

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "why-cry", label: "Why They Cry" },
    { id: "five-s", label: "The 5 S's" },
    { id: "sleep", label: "Sleep Guide" },
    { id: "more-remedies", label: "More Remedies" },
    { id: "red-flags", label: "Red Flags" },
  ];

  return (
    <div style={{ background: colors.bg, fontFamily: "'Source Sans 3', sans-serif", color: colors.text, minHeight: "100vh" }}>
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700;800&family=Source+Sans+3:wght@300;400;600;700&display=swap" rel="stylesheet" />

      {/* HERO */}
      <div style={{ background: `linear-gradient(135deg, ${colors.navy} 0%, #1a2a40 100%)`, padding: "56px 24px 48px", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, opacity: 0.06, background: "repeating-linear-gradient(45deg, transparent, transparent 30px, rgba(255,255,255,0.1) 30px, rgba(255,255,255,0.1) 60px)" }}></div>
        <div style={{ position: "relative", maxWidth: 720, margin: "0 auto" }}>
          <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", color: colors.gold, marginBottom: 16 }}>Complete Parent's Guide</div>
          <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 40, fontWeight: 800, color: "#fff", margin: 0, lineHeight: 1.15 }}>The Happiest Baby on the Block</h1>
          <p style={{ fontSize: 17, color: "rgba(255,255,255,0.7)", marginTop: 12, lineHeight: 1.5 }}>By Harvey Karp, M.D. — A comprehensive summary of the science-backed method to calm crying and boost infant sleep</p>
          <div style={{ display: "flex", justifyContent: "center", gap: 32, marginTop: 32, flexWrap: "wrap" }}>
            <StatBox num="5 S's" label="Core soothing steps" color={colors.gold} />
            <StatBox num="4th" label="Trimester concept" color={colors.accent} />
            <StatBox num="0–4 mo" label="Critical window" color={colors.teal} />
          </div>
        </div>
      </div>

      {/* SUPPORT THE AUTHOR */}
      <Section>
        <Callout type="warn" title="Support the author">
          This is a detailed summary for personal reference — not a reproduction of the book. Please purchase <em>The Happiest Baby on the Block</em> to support the author and get the full case studies, examples, and nuance that make the method click.
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
            <SectionTitle sub="Dr. Karp's entire approach rests on four interconnected ideas that explain why babies cry and how to stop it.">The Four Core Principles</SectionTitle>

            <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
              <FlowBox color={colors.accent} bg={colors.accentLight}>🤰 <strong>The Missing Fourth Trimester</strong><br /><span style={{ fontWeight: 400, fontSize: 14 }}>Human babies are born 3 months "too soon" — they need womb-like conditions to thrive</span></FlowBox>
              <FlowArrow />
              <FlowBox color={colors.teal} bg={colors.tealLight}>🧠 <strong>The Calming Reflex</strong><br /><span style={{ fontWeight: 400, fontSize: 14 }}>A neurological "off switch" for crying — triggered by womb sensations done at the right intensity</span></FlowBox>
              <FlowArrow />
              <FlowBox color={colors.lavender} bg={colors.lavenderLight}>🖐️ <strong>The 5 S's</strong><br /><span style={{ fontWeight: 400, fontSize: 14 }}>Swaddling, Side/Stomach, Shushing, Swinging, Sucking — five steps that mimic the womb</span></FlowBox>
              <FlowArrow />
              <FlowBox color={colors.gold} bg={colors.goldLight}>💛 <strong>The Cuddle Cure</strong><br /><span style={{ fontWeight: 400, fontSize: 14 }}>Combining multiple S's simultaneously — every baby has a unique preferred mix</span></FlowBox>
            </div>
          </Section>

          <Section bg={colors.card}>
            <SectionTitle color={colors.accent} sub="Unlike baby horses or cows that walk on day one, human babies are profoundly immature at birth. Their brains are too big — they must be 'evicted' early or they'd get stuck in the birth canal.">Why "The Fourth Trimester"?</SectionTitle>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: 20 }}>
              <Card accent={colors.accent}>
                <Badge color={colors.accent} bg={colors.accentLight}>The Problem</Badge>
                <p style={{ fontSize: 15, lineHeight: 1.7, margin: "8px 0 0" }}>After birth, your baby is assaulted by a jumble of new lights, sounds, smells, and sensations — while simultaneously deprived of the continuous rocking, warmth, and noise of the womb. This combination of <strong>overstimulation + understimulation</strong> is what triggers crying.</p>
              </Card>
              <Card accent={colors.teal}>
                <Badge color={colors.teal} bg={colors.tealLight}>The Solution</Badge>
                <p style={{ fontSize: 15, lineHeight: 1.7, margin: "8px 0 0" }}>Recreate the womb experience during the first 3–4 months after birth. This isn't about "babying" your child — it's about giving their immature nervous system the rhythmic sensations it needs until their brain matures enough to handle the outside world (around 4 months).</p>
              </Card>
            </div>

            <Card style={{ marginTop: 20, background: colors.goldLight, border: `1px solid ${colors.gold}40` }}>
              <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 17, fontWeight: 700, color: colors.navy, marginBottom: 8 }}>💡 Key Insight: You Cannot Spoil a Newborn</div>
              <p style={{ fontSize: 15, lineHeight: 1.7, margin: 0 }}>Research by Johns Hopkins (Bell & Ainsworth, 1972) showed that quickly meeting an infant's needs during the early months made them <em>more</em> poised, patient, and trusting at one year. Building trust through consistent responsiveness creates "secure attachment" — the foundation for lifelong emotional health. Limit-setting and teaching independence become appropriate after around 9 months.</p>
            </Card>
          </Section>

          <Section>
            <SectionTitle sub="Inside the womb, your baby experienced very specific conditions 24/7. These conditions are the key to calming.">What Life Was Like in the Womb</SectionTitle>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 16 }}>
              {[
                { icon: "🫂", label: "Tightly Held", desc: "Snug fetal position, continuously embraced by the uterine wall" },
                { icon: "🌊", label: "Constant Motion", desc: "Rocked and jiggled with every step mom takes, even during exercise" },
                { icon: "🔊", label: "Loud Sound", desc: "Blood whooshing through the placenta — louder than a vacuum cleaner" },
                { icon: "🌡️", label: "Warm & Cozy", desc: "Stable temperature, no cold drafts or sudden changes" },
                { icon: "🤲", label: "Touched Always", desc: "Velvet walls of the womb providing constant tactile stimulation" },
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
            <SectionTitle color={colors.gold} sub="Colic is not universal — it's culturally contingent. These cross-cultural examples are the backbone of Karp's argument that Western babies cry more because we accidentally deprive them of womb-like care.">The Cross-Cultural Evidence</SectionTitle>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 20 }}>
              <Card accent={colors.gold}>
                <Badge color={colors.gold} bg={colors.goldLight}>Botswana — !Kung San</Badge>
                <p style={{ fontSize: 14, lineHeight: 1.7 }}>Mothers carry babies in leather slings nearly 24 hours a day, bouncing with every step. They nurse 50–100 times a day, including all through the night. Persistent crying is virtually absent.</p>
              </Card>
              <Card accent={colors.teal}>
                <Badge color={colors.teal} bg={colors.tealLight}>Bali</Badge>
                <p style={{ fontSize: 14, lineHeight: 1.7 }}>Babies are held continuously for the first 105 days. They rarely leave adult arms. A ceremony marks the moment a baby's feet first touch the ground — because it almost never happens before then.</p>
              </Card>
              <Card accent={colors.lavender}>
                <Badge color={colors.lavender} bg={colors.lavenderLight}>The Key Lesson</Badge>
                <p style={{ fontSize: 14, lineHeight: 1.7 }}>These cultures don't have magic babies — they have practices that accidentally recreate womb conditions 24/7. Our culture's default of quiet rooms, flat cribs, and still bassinets is the anomaly, not theirs.</p>
              </Card>
            </div>

            <Card style={{ marginTop: 20, background: colors.roseLight, border: `1px solid ${colors.rose}40` }}>
              <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 17, fontWeight: 700, color: colors.rose, marginBottom: 8 }}>📖 The Near-Extinction of Breastfeeding</div>
              <p style={{ fontSize: 14, lineHeight: 1.7, margin: 0 }}>By the 1950s, mass-produced formula had nearly replaced breastfeeding in the West. Doctors promoted it as more "hygienic." By the 1960s, women who breastfed were considered oddball. La Leche League and later research spurred a comeback, but the cultural break meant that generations of mothers lost the intuitive knowledge of fourth-trimester care — constant holding, frequent nursing, and rhythmic soothing — that other cultures never abandoned.</p>
            </Card>
          </Section>
        </>
      )}

      {/* WHY BABIES CRY TAB */}
      {activeTab === "why-cry" && (
        <>
          <Section>
            <SectionTitle sub="Understanding why babies cry — and why conventional theories are mostly wrong — is essential to solving the puzzle.">The Colic Mystery</SectionTitle>

            <Card>
              <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 18, fontWeight: 700, color: colors.navy, marginBottom: 12 }}>What Is Colic?</div>
              <p style={{ fontSize: 15, lineHeight: 1.7, margin: 0 }}>The old "Rule of Threes" (crying 3+ hours/day, 3+ days/week, for 3+ weeks) has been largely abandoned. Today doctors use the term <strong>persistent or inconsolable crying</strong>. About 50% of babies fuss 2+ hours daily; 10–15% cry 3+ hours. It typically starts around 2 weeks, peaks at 6–8 weeks, and resolves by 3–4 months.</p>
            </Card>

            <Card style={{ marginTop: 4, background: colors.lavenderLight, border: `1px solid ${colors.lavender}40` }}>
              <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 17, fontWeight: 700, color: colors.lavender, marginBottom: 12 }}>🗣️ Your Baby's Three-Word Vocabulary</div>
              <p style={{ fontSize: 14, lineHeight: 1.7, marginBottom: 16 }}>Crying isn't random noise — it's your baby's language. Karp describes three escalating modes, each communicating something different:</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {[
                  { level: "Whimper", desc: "A soft, mild fussing — your baby's way of saying \"I'm a little uncomfortable.\" Often a warm-up signal that something small needs addressing (hunger, boredom, mild discomfort).", color: colors.green, bg: colors.greenLight },
                  { level: "Cry", desc: "A full, rhythmic wail — the standard \"I need you now\" call. Loud enough to get your attention from across the room. Most parents learn to read this one fast.", color: colors.gold, bg: colors.goldLight },
                  { level: "Shriek", desc: "An ear-splitting, glass-shattering scream — baby's emergency alarm. Once in full shriek, babies can become \"deaf with distress\" and literally can't hear your soothing. You have to match their intensity to break through.", color: colors.accent, bg: colors.accentLight },
                ].map((item, i) => (
                  <div key={i} style={{ display: "flex", gap: 14, padding: 14, background: item.bg, borderRadius: 10, borderLeft: `4px solid ${item.color}` }}>
                    <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 15, fontWeight: 700, color: item.color, minWidth: 70 }}>{item.level}</div>
                    <div style={{ fontSize: 14, lineHeight: 1.6, color: colors.text }}>{item.desc}</div>
                  </div>
                ))}
              </div>
              <p style={{ fontSize: 13, lineHeight: 1.6, color: colors.textLight, marginTop: 12, fontStyle: "italic" }}>Key insight: The louder and more desperate the cry, the more vigorous your 5 S's response must be. Gentle shushing won't reach a shrieking baby — you need to match the intensity first, then gradually dial down as they calm.</p>
            </Card>

            <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 20, fontWeight: 700, color: colors.navy, margin: "32px 0 16px" }}>The 10 Universal Colic Clues</div>
            <p style={{ fontSize: 15, lineHeight: 1.7, color: colors.textLight, marginBottom: 20 }}>The true cause of colic must explain <em>all ten</em> of these patterns. This is how Dr. Karp rules out the five conventional theories:</p>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 12 }}>
              {[
                "Starts ~2 weeks, peaks ~8 weeks, ends ~3 months",
                "Preemies get colic but never before their due date",
                "Cries come/go abruptly and sound like pain",
                "Often starts during or just after feeding",
                "Breast-fed babies have as much colic as bottle-fed",
                "Worsens in the evening (the 'witching hour')",
                "As likely with 5th baby as 1st — unrelated to experience",
                "Quiets temporarily with vigorous rocking, holding, or noise",
                "Baby is happy and healthy between crying bouts",
                "In some cultures, colic is rare or nonexistent",
              ].map((clue, i) => (
                <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start", background: i % 2 === 0 ? colors.tealLight : colors.card, padding: 14, borderRadius: 10, border: `1px solid ${colors.border}` }}>
                  <div style={{ width: 28, height: 28, borderRadius: "50%", background: colors.teal, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, flexShrink: 0 }}>{i + 1}</div>
                  <div style={{ fontSize: 14, lineHeight: 1.5, color: colors.text }}>{clue}</div>
                </div>
              ))}
            </div>
          </Section>

          <Section bg={colors.card}>
            <SectionTitle color={colors.rose} sub="Each sounds plausible, but none can explain all 10 colic clues.">Five Theories — And Why They're (Mostly) Wrong</SectionTitle>

            {[
              { theory: "Tiny Tummy Troubles (gas, cramps)", verdict: "Gas is present from birth and continues past colic. All babies have gas, but calm ones don't cry. Gas drops (simethicone) work no better than water. If gas caused colic, car rides wouldn't help.", color: colors.accent },
              { theory: "Big Tummy Troubles (allergies, reflux, bacteria)", verdict: "Only 5–10% of colic has a gastrointestinal cause. Antacid medicine works no better than placebo. Probiotics show mixed results. Lactose-free formulas don't help. If reflux caused colic, rocking would make it worse.", color: colors.lavender },
              { theory: "Maternal Anxiety", verdict: "Anxious moms aren't causing colic — colicky babies are causing anxiety. If anxiety caused colic, first-time moms would have fussier babies than experienced moms, but the rate is identical regardless of birth order.", color: colors.rose },
              { theory: "Brain Immaturity / Overstimulation", verdict: "Close, but if immaturity alone caused colic, premature babies would have the worst cases. They don't. And cultures where babies have equally immature brains can have zero colic.", color: colors.teal },
              { theory: "Challenging Temperament", verdict: "Temperament plays a role but can't be the root cause — if it were, colic would worsen after 4 months (temperament is lifelong), and every culture would have the same rate.", color: colors.gold },
            ].map((item, i) => (
              <Card key={i} accent={item.color}>
                <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 16, fontWeight: 700, color: item.color }}>Theory {i + 1}: {item.theory}</div>
                <p style={{ fontSize: 14, lineHeight: 1.7, margin: "8px 0 0", color: colors.textLight }}>{item.verdict}</p>
              </Card>
            ))}

            <Card style={{ background: colors.accentLight, border: `2px solid ${colors.accent}` }}>
              <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 18, fontWeight: 700, color: colors.accent, marginBottom: 8 }}>✅ The True Cause: The Missing Fourth Trimester</div>
              <p style={{ fontSize: 15, lineHeight: 1.7, margin: 0 }}>Colic occurs when babies with challenging temperaments or poor self-calming are deprived of the calming rhythms of the womb. Dr. Karp's formula:</p>
              <div style={{ background: colors.card, borderRadius: 10, padding: 16, marginTop: 12, textAlign: "center", fontFamily: "'Playfair Display', Georgia, serif", fontSize: 15, color: colors.navy }}>
                Colic = [Overstimulation + Total Stillness] − Rhythmic Calming ÷ (Temperament + Brain Maturity)
              </div>
              <p style={{ fontSize: 14, lineHeight: 1.7, margin: "12px 0 0", color: colors.textLight }}>Easy-tempered babies with good self-calming handle the transition. But sensitive or intense babies need womb-like rhythms to trigger the calming reflex — and they need them <em>done correctly</em>.</p>
            </Card>
          </Section>

          <Section>
            <SectionTitle sub="Two temperament types are especially challenging in the early months.">Baby Temperament Types</SectionTitle>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 20 }}>
              <Card accent={colors.green}>
                <Badge color={colors.green} bg={colors.greenLight}>Easy / Mellow</Badge>
                <p style={{ fontSize: 14, lineHeight: 1.7 }}>These "surfer dudes" take the world in stride. Mild fussing, easy to soothe, need just 1–2 S's. They sail smoothly through the fourth trimester.</p>
              </Card>
              <Card accent={colors.lavender}>
                <Badge color={colors.lavender} bg={colors.lavenderLight}>Sensitive</Badge>
                <p style={{ fontSize: 14, lineHeight: 1.7 }}>Alert and perceptive — jumps at phone rings, yelps at strong tastes. Open to everything but can't self-soothe. May look away during feeding (gaze aversion) — this means "too close," not "I don't like you."</p>
              </Card>
              <Card accent={colors.accent}>
                <Badge color={colors.accent} bg={colors.accentLight}>Intense / Passionate</Badge>
                <p style={{ fontSize: 14, lineHeight: 1.7 }}>Everyday sparks land on the "dynamite" of their volatile temperaments. Once wailing, stopping is hard even when they get what they want. Need 4–5 S's done vigorously. Often become the biggest laughers later.</p>
              </Card>
            </div>
          </Section>
        </>
      )}

      {/* THE 5 S's TAB */}
      {activeTab === "five-s" && (
        <>
          <Section>
            <SectionTitle sub="Think of baby calming like baking a cake — knowing the ingredients is useless without knowing how much of each to use, in what order, and at what intensity. Precision matters.">The 5 S's: Step-by-Step</SectionTitle>

            <Card style={{ background: colors.goldLight, border: `1px solid ${colors.gold}40`, marginBottom: 32 }}>
              <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 17, fontWeight: 700, color: colors.navy, marginBottom: 8 }}>⚡ Critical Rule: Reflexes Are All-or-Nothing</div>
              <p style={{ fontSize: 15, lineHeight: 1.7, margin: 0 }}>Like a knee-jerk reflex, the calming reflex requires <strong>precise triggers at sufficient intensity</strong>. Hit the knee in the right spot = 100% success. Miss by an inch or tap too gently = 100% failure. This is why many parents try rocking and shushing and fail — they do it too gently, too loosely, or in the wrong way.</p>
            </Card>

            {[
              {
                num: "S1", title: "Swaddling", subtitle: "The cornerstone — the essential first layer", color: colors.accent, bg: colors.accentLight, icon: "🫧",
                details: (
                  <div>
                    <p><strong>Why it works:</strong> Mimics the continuous touch and snug embrace of the womb. Stops the flailing and startling that makes babies even more upset.</p>
                    <p><strong>Key technique:</strong></p>
                    <ul style={{ paddingLeft: 20 }}>
                      <li>Arms snug and straight at baby's sides (not across chest)</li>
                      <li>The final fold goes across both arms like a belt</li>
                      <li>Hips and legs must stay loose — knees should open and close freely</li>
                      <li>Blanket should not pop open easily</li>
                      <li>Don't overheat — ears should feel slightly warm, not hot</li>
                    </ul>
                    <p><strong>The DUDU Wrap — Karp's named technique:</strong></p>
                    <div style={{ background: colors.accentLight, borderRadius: 10, padding: 16, margin: "8px 0 12px" }}>
                      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 12 }}>
                        <div><strong style={{ color: colors.accent }}>D — Down</strong><br /><span style={{ fontSize: 13 }}>Place baby's right arm at side, pull blanket snugly across body and tuck under the left side</span></div>
                        <div><strong style={{ color: colors.accent }}>U — Up</strong><br /><span style={{ fontSize: 13 }}>Fold the bottom corner of blanket straight up over baby's feet</span></div>
                        <div><strong style={{ color: colors.accent }}>D — Down</strong><br /><span style={{ fontSize: 13 }}>Hold baby's left arm at side, bring remaining blanket across body</span></div>
                        <div><strong style={{ color: colors.accent }}>U — Up</strong><br /><span style={{ fontSize: 13 }}>Fold the last flap up and snug it behind the back — like a belt across both arms</span></div>
                      </div>
                      <p style={{ fontSize: 13, color: colors.textLight, margin: "10px 0 0", fontStyle: "italic" }}>The name makes it stick: Down–Up–Down–Up. Practice on a doll or teddy bear first. After 5–10 tries it'll be second nature.</p>
                    </div>
                    <p><strong>Common mistake:</strong> Giving up because baby fights it. Babies fight because their arms are flailing involuntarily — they can't stop. Wrapping stops the flailing so they can focus on the next S's. <em>Swaddling alone rarely calms crying — it prepares the baby for the next steps.</em></p>
                    <p><strong>Duration:</strong> Use for all sleep from birth to 4–5 months. Wean by first doing one arm out for a few days, then stopping entirely. Always use with white noise.</p>
                  </div>
                ),
              },
              {
                num: "S2", title: "Side / Stomach Position", subtitle: "The anti-falling-reflex position (NEVER for sleep)", color: colors.teal, bg: colors.tealLight, icon: "↪️",
                details: (
                  <div>
                    <p><strong>Why it works:</strong> Lying on the back can trigger the Moro reflex (the "I'm falling!" response), turning startles into thrashing and screams. Rolling to side or stomach stimulates a womb-like sensation in the inner ear's balance center.</p>
                    <p><strong>Key technique:</strong></p>
                    <ul style={{ paddingLeft: 20 }}>
                      <li>Roll baby at least a bit toward the stomach</li>
                      <li>Can hold on your forearm (football hold) or on your lap</li>
                      <li>Position-sensitive babies keep crying if even slightly rolled toward the back</li>
                    </ul>
                    <p style={{ background: "#FEE2E2", padding: "10px 14px", borderRadius: 8, fontWeight: 600 }}>⚠️ CRITICAL SAFETY: The back is the ONLY safe position for sleep. Side/stomach is only for soothing while you're holding the baby. Never leave a baby to sleep on their side or stomach.</p>
                    <p><strong>Watch for:</strong> If baby roots (turns head searching for nipple) when on side, offer feeding first — their cheek touching your arm triggers the rooting reflex.</p>
                  </div>
                ),
              },
              {
                num: "S3", title: "Shushing", subtitle: "Your baby's favorite sound — louder than you think", color: colors.lavender, bg: colors.lavenderLight, icon: "🔊",
                details: (
                  <div>
                    <p><strong>Why it works:</strong> The womb is <em>loud</em> — the rushing of blood through the placenta creates a constant whooshing louder than a vacuum cleaner. Total silence is sensory deprivation for a newborn. White noise mimics this and powerfully triggers the calming reflex.</p>
                    <p><strong>Key technique:</strong></p>
                    <ul style={{ paddingLeft: 20 }}>
                      <li><strong>For calming crying:</strong> Match the volume to baby's cries — 85–90 dB, right near the ear. Use high-pitched "Shhhhh!" or hissy sounds</li>
                      <li><strong>For promoting sleep:</strong> Use low, rumbly sounds (like rain on a roof) at ~65 dB — about shower volume</li>
                      <li>Play sound all night, for all sleep, the entire first year</li>
                      <li>Avoid nature sounds with changing tones (ocean waves, crickets) — the variation can wake babies</li>
                      <li>Music can lull to sleep but can wake babies with changing tones if played all night</li>
                    </ul>
                    <p><strong>Common mistake:</strong> Shushing too softly. It feels rude to go "SHHHH!" near a baby's ear, but they love it because it's what they heard 24/7 in the womb. The louder the cry, the louder the shush must be.</p>
                  </div>
                ),
              },
              {
                num: "S4", title: "Swinging", subtitle: "Tiny, jiggly motions — NOT big slow rocking", color: colors.green, bg: colors.greenLight, icon: "〰️",
                details: (
                  <div>
                    <p><strong>Why it works:</strong> Your baby bounced with your every step for 9 months. Lying motionless on a flat bed is as foreign to them as a sailor stepping on dry land after months at sea.</p>
                    <p><strong>Key technique:</strong></p>
                    <ul style={{ paddingLeft: 20 }}>
                      <li><strong>For crying:</strong> Quick, tiny jiggles — just 1–2 inches, side to side, 2–3 times per second. Think "jittery" not "rocking chair"</li>
                      <li><strong>For calm/sleep:</strong> Slow, gentle rocking once baby has settled</li>
                      <li>Always support the head and neck</li>
                      <li>Let the head jiggle slightly in your hands — like Jell-O on a plate</li>
                      <li>Swings, bouncy seats, exercise balls, car rides all work</li>
                    </ul>
                    <p><strong>Karp's named moves:</strong></p>
                    <div style={{ background: colors.greenLight, borderRadius: 10, padding: 16, margin: "8px 0 12px" }}>
                      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                        <div><strong style={{ color: colors.green }}>The Milk Shake</strong> — Hold baby swaddled, face-up in your hands, head resting in your fingertips. Jiggle rapidly with tiny 1–2 inch movements, like trembling. Think of shaking a cocktail shaker with very short strokes. This is the go-to starting move.</div>
                        <div><strong style={{ color: colors.green }}>The Windshield Wiper</strong> — Baby lies on your forearm or lap, on their stomach. Gently swing your knees (or arm) side to side in short arcs, like a windshield wiper. Great for when your arms are tired — uses your legs to generate motion.</div>
                        <div><strong style={{ color: colors.green }}>The Jell-O Head</strong> — Support baby's head in your open hands and let it jiggle slightly with each motion — like a bowl of Jell-O on a plate. The head should wobble just a tiny bit, never flop. This small wiggle in the inner ear is what actually activates the calming reflex.</div>
                      </div>
                    </div>
                    <p style={{ background: "#FEE2E2", padding: "10px 14px", borderRadius: 8, fontWeight: 600 }}>⚠️ CRITICAL SAFETY: This is gentle jiggling — tiny, controlled movements. NEVER shake a baby. Shaken baby syndrome involves violent, whiplash-like jerking and is completely different from safe, supportive jiggly motion.</p>
                    <p><strong>Common mistake:</strong> Using big, slow, 12-inch swings. That keeps calm babies calm but does nothing for screamers. Fast, tiny movements are what trigger the reflex.</p>
                  </div>
                ),
              },
              {
                num: "S5", title: "Sucking", subtitle: "The icing on the cake — deepens calm into tranquility", color: colors.rose, bg: colors.roseLight, icon: "🍼",
                details: (
                  <div>
                    <p><strong>Why it works:</strong> Both nutritive sucking (breast/bottle) and non-nutritive sucking (pacifier) trigger the calming reflex. Breast-feeding adds hunger relief plus cerebral endorphins. Some cultures offer the breast up to 100 times per day.</p>
                    <p><strong>Key technique:</strong></p>
                    <ul style={{ paddingLeft: 20 }}>
                      <li>Calm baby first with other S's before offering pacifier — hard to latch while screaming</li>
                      <li>Try different pacifier brands — babies have preferences</li>
                      <li><strong>Reverse psychology trick:</strong> Once baby starts sucking, gently tug the pacifier out. Baby will suck harder to keep it, strengthening their grip</li>
                      <li>Pacifier at bedtime lowers SIDS risk, even if it falls out after sleep begins</li>
                      <li>Once teeth emerge (~3–4 months), limit sucking periods to 30 minutes to prevent cavities</li>
                    </ul>
                    <p><strong>Common mistake:</strong> Trying sucking first on a screaming baby. Sucking works best as the final layer after the other S's have started settling the baby down.</p>
                  </div>
                ),
              },
            ].map((s, i) => (
              <SCard key={i} {...s} isOpen={openS === i} toggle={() => setOpenS(openS === i ? -1 : i)} />
            ))}
          </Section>

          <Section bg={colors.card}>
            <SectionTitle color={colors.navy} sub="Think of the 5 S's as layers of a cake. Build from bottom to top.">The Cuddle Cure: How to Combine the S's</SectionTitle>

            <div style={{ position: "relative", padding: "20px 0" }}>
              {[
                { label: "S5: Sucking", color: colors.rose, desc: "Icing on the cake — keeps reflex on" },
                { label: "S4: Swinging", color: colors.green, desc: "Fully triggers the calming reflex" },
                { label: "S3: Shushing", color: colors.lavender, desc: "Breaks the crying cycle" },
                { label: "S2: Side/Stomach", color: colors.teal, desc: "Stops the falling sensation" },
                { label: "S1: Swaddling", color: colors.accent, desc: "Foundation — stops flailing" },
              ].map((layer, i) => (
                <div key={i} style={{ background: `${layer.color}18`, borderLeft: `4px solid ${layer.color}`, padding: "14px 20px", marginBottom: 4, borderRadius: "0 10px 10px 0", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
                  <span style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 16, fontWeight: 700, color: layer.color }}>{layer.label}</span>
                  <span style={{ fontSize: 13, color: colors.textLight }}>{layer.desc}</span>
                </div>
              ))}
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16, marginTop: 24 }}>
              <Card accent={colors.green}>
                <Badge color={colors.green} bg={colors.greenLight}>Easy Babies</Badge>
                <p style={{ fontSize: 14, lineHeight: 1.7 }}>Need just 1–2 S's. Often settle with just shushing or swaddling + gentle rocking.</p>
              </Card>
              <Card accent={colors.gold}>
                <Badge color={colors.gold} bg={colors.goldLight}>Moderate Fussers</Badge>
                <p style={{ fontSize: 14, lineHeight: 1.7 }}>Need 3–4 S's layered together. Swaddle + side + shush + swing usually does the trick.</p>
              </Card>
              <Card accent={colors.accent}>
                <Badge color={colors.accent} bg={colors.accentLight}>Intense Criers</Badge>
                <p style={{ fontSize: 14, lineHeight: 1.7 }}>Need all 5 S's simultaneously, done with vigor. The louder the cry, the snugger the swaddle, louder the shush, jigglier the swing.</p>
              </Card>
            </div>

            <Card style={{ marginTop: 24, background: colors.tealLight, border: `1px solid ${colors.teal}40` }}>
              <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 17, fontWeight: 700, color: colors.teal, marginBottom: 8 }}>Three Keys to Success</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16 }}>
                <div><strong>1. Precision</strong><br /><span style={{ fontSize: 14, color: colors.textLight }}>Each S must be done exactly right. Arms straight (not across chest), jiggles tiny (not swings), shush loud (not whispers).</span></div>
                <div><strong>2. Practice</strong><br /><span style={{ fontSize: 14, color: colors.textLight }}>Start when baby is calm or sleeping. Like riding a bike — strange at first, natural after 5–10 tries. Babies also learn faster with repetition.</span></div>
                <div><strong>3. Vigor</strong><br /><span style={{ fontSize: 14, color: colors.textLight }}>The least intuitive but most important. The more frantic the cry, the more energetic your response must be. Gentle singing won't cut it for screaming.</span></div>
              </div>
            </Card>
          </Section>
        </>
      )}

      {/* SLEEP TAB */}
      {activeTab === "sleep" && (
        <>
          <Section>
            <SectionTitle sub="Most newborns sleep 14–18 hours per day, but in short snippets. Like getting $1,000 in pennies.">The 6th S: Sleep</SectionTitle>

            <Card>
              <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 17, fontWeight: 700, color: colors.navy, marginBottom: 12 }}>Baby Sleep 101</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16 }}>
                <div style={{ padding: 16, background: colors.tealLight, borderRadius: 10, textAlign: "center" }}>
                  <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 28, fontWeight: 700, color: colors.teal }}>14–18 hrs</div>
                  <div style={{ fontSize: 13, color: colors.textLight }}>Total daily sleep for newborns</div>
                </div>
                <div style={{ padding: 16, background: colors.accentLight, borderRadius: 10, textAlign: "center" }}>
                  <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 28, fontWeight: 700, color: colors.accent }}>60 min</div>
                  <div style={{ fontSize: 13, color: colors.textLight }}>Baby's sleep cycle (vs. 90 min for adults)</div>
                </div>
                <div style={{ padding: 16, background: colors.lavenderLight, borderRadius: 10, textAlign: "center" }}>
                  <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 28, fontWeight: 700, color: colors.lavender }}>50/50</div>
                  <div style={{ fontSize: 13, color: colors.textLight }}>Split between quiet (NREM) and active (REM) sleep</div>
                </div>
              </div>
              <p style={{ fontSize: 14, lineHeight: 1.7, marginTop: 16, color: colors.textLight }}>Babies have 8 hours of REM sleep per night (vs. 2 for adults). REM is when the brain reviews and stores new experiences — since everything is new to a baby, they need massive amounts. Their 60-minute sleep cycles mean they hit "light sleep" windows more often, which is why they wake so frequently without the right sleep cues.</p>
            </Card>
          </Section>

          <Section bg={colors.card}>
            <SectionTitle color={colors.rose} sub="Modern parents believe many things about baby sleep that are flat-out wrong.">Sleep Myths Busted</SectionTitle>
            {[
              { myth: "Babies need complete silence to sleep", truth: "The womb was louder than a vacuum. Silence is a sensory desert. Rumbly white noise is what babies need — it's familiar and soothing." },
              { myth: "Swaddling should stop at 2 months", truth: "Two months is the WORST time to stop. Crying peaks at 2–4 months. Keep swaddling until 4–5 months, then wean one arm at a time." },
              { myth: "Never wake a sleeping baby", truth: "You should always briefly wake your baby when putting them down. The 'wake-and-sleep' technique teaches self-soothing." },
              { myth: "Rocking/nursing to sleep creates bad habits", truth: "All sleep cues create dependencies — the question is whether they're convenient and easy to wean. Swaddling + white noise are the best sleep cues because they're easy to use and easy to wean." },
              { myth: "Keeping baby awake during the day = better night sleep", truth: "This backfires. Overtired babies fight sleep harder. Nap your baby every couple of hours during the day." },
              { myth: "By 6 months most babies sleep through the night", truth: "No human sleeps through the night. We all wake 2–3 times but fall right back if conditions haven't changed. Babies who wake up and find things different (no longer in arms) fully awaken." },
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
            <SectionTitle sub="A game-changing technique for teaching your baby to self-soothe from the very first days.">Wake-and-Sleep Technique</SectionTitle>
            <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
              <FlowBox color={colors.teal} bg={colors.tealLight}>1. Prepare: Swaddle your baby and turn on rumbly white noise</FlowBox>
              <FlowArrow />
              <FlowBox color={colors.lavender} bg={colors.lavenderLight}>2. Feed and let baby fall asleep in your arms or at the breast</FlowBox>
              <FlowArrow />
              <FlowBox color={colors.green} bg={colors.greenLight}>3. Gently slide baby into bassinet</FlowBox>
              <FlowArrow />
              <FlowBox color={colors.accent} bg={colors.accentLight}>4. Wake baby for 5–10 seconds (jostle gently or scratch feet)</FlowBox>
              <FlowArrow />
              <FlowBox color={colors.gold} bg={colors.goldLight}>5. Baby falls back asleep — learning to self-soothe without being held, rocked, or nursed</FlowBox>
            </div>
            <p style={{ fontSize: 14, color: colors.textLight, marginTop: 16, textAlign: "center", lineHeight: 1.6 }}>If baby won't resettle: crank up white noise, jiggle bassinet. Still crying? Pick up, soothe, and try the wake step again.</p>
          </Section>

          <Section bg={colors.card}>
            <SectionTitle color={colors.navy}>Weaning the 5 S's for Sleep</SectionTitle>
            <TimelineItem age="3–4 Months" title="Wean Swinging" desc="Reduce swing speed to lowest setting. If still sleeping well after a few days, stop the swing. Move to bassinet/crib." color={colors.green} />
            <TimelineItem age="4–5 Months" title="Wean Swaddling" desc="First: one arm out for several days. If still sleeping well, stop wrapping entirely. Much easier if you're also using white noise." color={colors.accent} />
            <TimelineItem age="~6 Months" title="Wean Pacifier" desc="Bedtime pacifier lowers SIDS risk. Waiting past 6–7 months can make weaning harder as emotional attachment grows." color={colors.rose} />
            <TimelineItem age="12+ Months" title="Wean White Noise" desc="Gradually dial down volume over 1–2 weeks. Easiest cue to wean and can be restarted anytime (trips, illness, teething)." color={colors.lavender} />
          </Section>

          <Section>
            <SectionTitle sub="Every parent needs to know these facts.">SIDS & Safe Sleep</SectionTitle>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16 }}>
              {[
                { icon: "✅", title: "Always back sleeping", desc: "Stomach sleeping raises SIDS risk 3–8x. The back is the ONLY safe sleep position." },
                { icon: "✅", title: "Breast-feed if you can", desc: "Reduces SIDS by 50%." },
                { icon: "✅", title: "Smoke-free home", desc: "No cigarettes, woodstoves, incense, candles, or fireplaces unless well-vented." },
                { icon: "✅", title: "Room share for 6+ months", desc: "Baby in your room (not your bed) reduces SIDS risk." },
                { icon: "✅", title: "Snug swaddling + white noise", desc: "Reduces rolling, reduces need for unsafe sleeping positions." },
                { icon: "✅", title: "Pacifier at bedtime", desc: "Lowers SIDS risk even if it falls out soon after sleep." },
                { icon: "🚫", title: "No bed sharing for 9 months", desc: "Never on couches, recliners, or armchairs. 67x higher SIDS risk on sofas." },
                { icon: "🚫", title: "Bare crib", desc: "Remove pillows, toys, bumpers, thick blankets, positioners, lambskins." },
                { icon: "✅", title: "Room temp 68–72°F", desc: "Ears slightly warm, not hot. No hats indoors." },
                { icon: "✅", title: "Daily tummy time (supervised)", desc: "Builds neck strength to move face away from choking risks." },
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

      {/* MORE REMEDIES TAB - Chapter 14 */}
      {activeTab === "more-remedies" && (
        <>
          <Section>
            <SectionTitle sub="The 5 S's are the main event, but the book devotes an entire chapter to backup remedies — 'what else can I try?' when you need more tools.">Other Colic Remedies</SectionTitle>

            <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 20, fontWeight: 700, color: colors.navy, marginBottom: 16 }}>Grandma's Bag of Tricks</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20, marginBottom: 32 }}>
              <Card accent={colors.gold}>
                <Badge color={colors.gold} bg={colors.goldLight}>Proven</Badge>
                <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 17, fontWeight: 700, color: colors.navy, marginBottom: 8 }}>Massage</div>
                <p style={{ fontSize: 14, lineHeight: 1.7, margin: 0 }}>Tiffany Field's research found preemies massaged for 15 minutes, 3x daily, gained <strong>50% more weight</strong> and went home nearly a week earlier. At one year, massaged babies had higher IQs. Full-term babies who got 15-minute daily massages cried less, were more alert, and had lower stress hormones. Their moms felt calmer too.</p>
              </Card>
              <Card accent={colors.green}>
                <Badge color={colors.green} bg={colors.greenLight}>Proven</Badge>
                <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 17, fontWeight: 700, color: colors.navy, marginBottom: 8 }}>Walks & Fresh Air</div>
                <p style={{ fontSize: 14, lineHeight: 1.7, margin: 0 }}>If babies could talk, they'd beg to go outside. The entrancing flow of wind, passing shapes, and gentle motion acts like multisensory white noise. Our ancient relatives spent most of the day outdoors — many babies fuss partly because they're bored at home. A walk can lift both your spirits and your baby's mood.</p>
              </Card>
            </div>
          </Section>

          <Section bg={colors.card}>
            <SectionTitle color={colors.accent} sub="5–10% of colicky babies have a medical reason for fussiness. These are the top feeding-related issues.">Feeding Problems</SectionTitle>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16 }}>
              <Card accent={colors.accent}>
                <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 16, fontWeight: 700, color: colors.navy, marginBottom: 8 }}>🍼 Too Little Milk</div>
                <p style={{ fontSize: 14, lineHeight: 1.7 }}>Check: Do your breasts feel heavy on waking? Can you hear gulping at the start of feeds? Is baby serene after a meal? Does baby pee 5–8 times daily (clear/light yellow)? Gaining 4–7 oz per week? If "no" to any, call your pediatrician.</p>
              </Card>
              <Card accent={colors.teal}>
                <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 16, fontWeight: 700, color: colors.navy, marginBottom: 8 }}>🌊 Too Much Milk (Overactive Letdown)</div>
                <p style={{ fontSize: 14, lineHeight: 1.7 }}>Baby arches and pulls away during feeding — not from dislike, but from choking on a fire-hose flow. Signs: milk sprays from one breast while baby nurses the other; baby gulps loudly; coughing/sputtering when flow starts. Fix: Express 1–2 oz before feeding. Hold nipple between fingers like a cigarette, press inward to slow flow. Try nursing lying down with baby on top.</p>
              </Card>
              <Card accent={colors.lavender}>
                <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 16, fontWeight: 700, color: colors.navy, marginBottom: 8 }}>🧀 Food Sensitivity (Allergy)</div>
                <p style={{ fontSize: 14, lineHeight: 1.7 }}>The #1 medical cause of colic (~90% of medical cases). Suspect if: fussing all day (not just evenings), loose stools, blood/mucus in stool. <strong>Elimination diet:</strong> avoid cow's milk, eggs, peanuts, tree nuts, wheat, soy, and fish for 1 week. Keep a daily journal. If crying improves, do a food challenge — reintroduce suspected food 1x/day for 4 days. For formula-fed babies, try hydrolyzed formula (not just soy or lactose-free — these don't help colic).</p>
              </Card>
              <Card accent={colors.rose}>
                <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 16, fontWeight: 700, color: colors.navy, marginBottom: 8 }}>💩 Constipation</div>
                <p style={{ fontSize: 14, lineHeight: 1.7 }}>Mostly a bottle-fed problem (breast-fed babies almost never get hard stools). Try: switching formula brands, adding 1 tbsp organic prune juice or 1 oz water to formula 1–2x/day. If that fails, bicycle baby's legs and massage the bottom, or gently insert a Vaseline-greased thermometer tip (½ inch) into the anus — babies usually push it out along with the poop. Call doctor if 3+ days without a stool.</p>
              </Card>
            </div>
          </Section>

          <Section>
            <SectionTitle sub="These are widely used, but the evidence is mixed to poor. Know what you're getting into." color={colors.gold}>Alternative Remedies: Buyer Beware</SectionTitle>
            {[
              { name: "🌿 Herbal Teas (chamomile, fennel, dill)", verdict: "Some evidence", desc: "An Israeli study found a chamomile/fennel/licorice tea reduced fussing vs. placebo. An Italian study found chamomile/fennel/lemon balm drops helped somewhat. If you try: crush 2 tsp dill or fennel seeds, steep 10 min in boiling water, strain, cool, give 1 tsp several times a day. Karp prefers not giving babies oral supplements but considers this reasonable to try.", color: colors.green },
              { name: "💧 Gripe Water", verdict: "Not proven", desc: "A folk remedy containing dill, but never shown to be effective in studies. Often contains unwanted sugar and sodium bicarbonate. Widely sold in the US, UK, and Commonwealth nations. No harm, but probably no help either.", color: colors.gold },
              { name: "🏠 Homeopathy", verdict: "No evidence", desc: "Based on the 'like cures like' principle — giving tiny doses of substances that in large doses would cause the problem. Recommended remedies for colic include chamomile, colocynth, and pulsatilla. Some parents swear by them, but the NIH has spent over $2.5 billion testing alternative remedies and found almost no effective homeopathic treatments.", color: colors.accent },
              { name: "🦴 Chiropractic & Osteopathy", verdict: "No evidence", desc: "Some practitioners claim spinal misalignment from birth causes colic. There is no convincing scientific evidence supporting this. The book categorizes these as dubious treatments for infant colic.", color: colors.accent },
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
              <div style={{ fontWeight: 700, fontSize: 15, color: "#991B1B" }}>⚠️ Warning: Star Anise Tea</div>
              <p style={{ fontSize: 14, lineHeight: 1.7, margin: "6px 0 0", color: "#991B1B" }}>Never give tea made from star anise. It can cause serious neurological problems including seizures in infants.</p>
            </Card>

            <Card style={{ background: colors.goldLight, border: `1px solid ${colors.gold}40`, marginTop: 20 }}>
              <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 17, fontWeight: 700, color: colors.navy, marginBottom: 8 }}>💡 Bottom Line on Extra Remedies</div>
              <p style={{ fontSize: 14, lineHeight: 1.7, margin: 0 }}>The 5 S's are the main course. Massage and walks are excellent complements with solid evidence. For feeding problems, work with your pediatrician. Herbal teas are worth a cautious try. Everything else has weak or no evidence — save your money and energy for what works.</p>
            </Card>
          </Section>
        </>
      )}

      {/* RED FLAGS TAB */}
      {activeTab === "red-flags" && (
        <>
          <Section>
            <SectionTitle sub="Most colicky babies aren't ill — they're just 'homesick' for the womb. But 5–10% of persistent crying has a medical cause. Know when to call the doctor.">Red Flags & Red Alerts</SectionTitle>

            <Card style={{ background: "#FEF3C7", border: "1px solid #F59E0B40" }}>
              <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 17, fontWeight: 700, color: "#92400E", marginBottom: 8 }}>Your Doctor's Three Key Questions</div>
              <p style={{ fontSize: 15, lineHeight: 1.7, margin: 0 }}>If you answer "No" to any of these, your doctor will investigate further:</p>
              <div style={{ marginTop: 12, display: "flex", flexDirection: "column", gap: 8 }}>
                {["Is your baby growing well?", "Is your child normal in all other ways?", "Does your baby act happy when she's not crying?"].map((q, i) => (
                  <div key={i} style={{ display: "flex", gap: 10, alignItems: "center", padding: "10px 14px", background: "#FEF9C3", borderRadius: 8 }}>
                    <div style={{ width: 24, height: 24, borderRadius: "50%", background: "#F59E0B", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700 }}>{i + 1}</div>
                    <div style={{ fontSize: 15, fontWeight: 600, color: "#92400E" }}>{q}</div>
                  </div>
                ))}
              </div>
            </Card>
          </Section>

          <Section bg={colors.card}>
            <SectionTitle color={colors.accent}>10 Red Flag Symptoms</SectionTitle>
            <p style={{ fontSize: 15, lineHeight: 1.7, color: colors.textLight, marginBottom: 20 }}>Call your doctor if your baby shows any of these:</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 12 }}>
              {[
                { flag: "Persistent moaning", desc: "Frequent groans and weak cries (not the usual strong wail)" },
                { flag: "Shrill, high-pitched cry", desc: "Sharp and unusual — different from normal fussing" },
                { flag: "Vomiting", desc: ">1 oz per episode, >5x/day, or any green/yellow vomit" },
                { flag: "Stool changes", desc: "Constipation or diarrhea, especially with blood" },
                { flag: "Fussing during eating", desc: "Twisting, arching, crying during or right after feedings" },
                { flag: "Abnormal temperature", desc: "Rectal temp under 97.5°F or over 100.4°F" },
                { flag: "Constant irritability", desc: "Persistent crying with almost no calm periods" },
                { flag: "Lethargy", desc: "Sleeping twice as long as usual, acting 'out of it', poor sucking" },
                { flag: "Bulging soft spot", desc: "Fontanel bulges even when baby is sitting upright" },
                { flag: "Poor weight gain", desc: "Less than half an ounce per day" },
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
            <SectionTitle sub="These are much less common (most under 1% of fussy babies), but important to know about.">Medical Conditions That Can Cause Crying</SectionTitle>
            {[
              { name: "Food sensitivity/allergy (5–10%)", desc: "The only common medical cause. May cause crying plus rash, vomiting, diarrhea, or bloody mucus in stool. Usually cow's milk protein; try elimination diet or formula change." },
              { name: "Acid reflux (<1%)", desc: "Suspect only if: vomiting >5x/day, crying with most meals including mornings, crying persists past 3 months, or episodes of hoarseness/wheezing. Antacids work no better than placebo for most babies." },
              { name: "Infections", desc: "Ear infection, urinary infection, meningitis (rare). Sick newborns may not get fever — watch for lethargy or persistent irritability." },
              { name: "Hair/thread tourniquet", desc: "A fine hair or thread wrapped tightly around a finger, toe, or penis. Causes sudden sharp screaming — always check for this." },
              { name: "Nasal blockage", desc: "Babies are nose-breathers. Stuffy nose from allergies or colds can cause frantic crying. Use saline drops and nasal aspirator." },
              { name: "Thrush", desc: "Yeast infection causing milky white patches in mouth that can't be wiped away. Easy to treat." },
            ].map((item, i) => (
              <Card key={i} accent={colors.teal}>
                <div style={{ fontWeight: 700, fontSize: 15, color: colors.navy }}>{item.name}</div>
                <div style={{ fontSize: 14, color: colors.textLight, lineHeight: 1.7, marginTop: 6 }}>{item.desc}</div>
              </Card>
            ))}
          </Section>

          <Section bg={colors.card}>
            <SectionTitle color={colors.navy} sub="The book's Appendix B is a full ten-key survival guide. Here's the expanded version — including the harder stuff most guides skip.">New Parent Survival Guide</SectionTitle>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16 }}>
              {[
                { tip: "Trust yourself", desc: "You're part of a continuous chain of successful parents stretching back 100,000 generations. Billions have done this before you — they weren't all rocket scientists." },
                { tip: "Lower expectations", desc: "Still in pajamas at 5 PM? That's normal. Dirty dishes, unanswered emails, unwashed hair — all fine. Your only real jobs right now are feeding and comforting." },
                { tip: "Accept help — seriously", desc: "Until 100 years ago, every new mom had several baby-savvy adults helping daily. Solo parenting is a modern invention, not a virtue. Say yes to every offer." },
                { tip: "Tag team with your partner", desc: "Dads often excel at the 5 S's — the engineering of swaddling and the vigor of jiggling come naturally. Trade off shifts. Let the non-nursing parent become 'the king of calm.'" },
                { tip: "Keep your sense of humor", desc: "Even the most loving parents have dark moments. There's a reason lullabies like 'Rock-a-Bye Baby' have morbid lyrics — exhausted parents have always needed to vent with a chuckle. Laughing doesn't mean you're a bad parent." },
                { tip: "Tune out bad advice", desc: "America's real national pastime isn't baseball — it's giving new moms unsolicited advice. Family, friends, strangers in grocery stores. Smile, nod, trust your pediatrician." },
                { tip: "Protect your relationship", desc: "A new baby stress-tests every relationship. Schedule even 10 minutes of adult conversation daily. Frustration and sleep deprivation can make partners snap — name it, don't blame it." },
                { tip: "Never shake your baby", desc: "Shaken Baby Syndrome causes brain damage and death. If you're at the breaking point: put baby down safely, close the door, and walk away. Call someone. The crying will not hurt them. Your frustration is normal — acting on it isn't." },
              ].map((item, i) => (
                <div key={i} style={{ padding: 20, background: colors.bg, borderRadius: 12, border: `1px solid ${colors.border}` }}>
                  <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 16, fontWeight: 700, color: colors.navy }}>{item.tip}</div>
                  <div style={{ fontSize: 14, color: colors.textLight, marginTop: 8, lineHeight: 1.6 }}>{item.desc}</div>
                </div>
              ))}
            </div>

            <Card style={{ marginTop: 24, background: "#FEF3C7", border: "1px solid #F59E0B40" }}>
              <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 17, fontWeight: 700, color: "#92400E", marginBottom: 10 }}>⚠️ Postpartum Depression & Psychosis — Know the Signs</div>
              <p style={{ fontSize: 14, lineHeight: 1.7, margin: "0 0 12px" }}>PPD affects <strong>10–50% of new moms</strong> and many dads too. It's not weakness — it's a medical condition triggered by hormonal upheaval, sleep deprivation, and the stress of a crying baby. Colicky babies dramatically increase the risk.</p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 12 }}>
                <div style={{ background: "#FEF9C3", borderRadius: 8, padding: 14 }}>
                  <div style={{ fontWeight: 700, fontSize: 14, color: "#92400E", marginBottom: 6 }}>Common signs of PPD:</div>
                  <div style={{ fontSize: 13, lineHeight: 1.6, color: "#78350F" }}>Persistent sadness or emptiness, uncontrollable crying, severe anxiety or panic, insomnia even when baby sleeps, feelings of inadequacy or guilt, loss of interest in the baby, difficulty concentrating, thoughts of harming yourself</div>
                </div>
                <div style={{ background: "#FEE2E2", borderRadius: 8, padding: 14 }}>
                  <div style={{ fontWeight: 700, fontSize: 14, color: "#991B1B", marginBottom: 6 }}>Postpartum psychosis (rare but urgent):</div>
                  <div style={{ fontSize: 13, lineHeight: 1.6, color: "#991B1B" }}>Hallucinations, delusions, severe confusion, paranoia, thoughts of harming baby. This is a psychiatric emergency — call your doctor or 911 immediately.</div>
                </div>
              </div>
              <p style={{ fontSize: 13, lineHeight: 1.6, color: "#78350F", marginTop: 12, fontStyle: "italic" }}>If any of this sounds like you or your partner: tell your doctor today. PPD is common and very treatable. You are not failing — you are sick, and you deserve help.</p>
            </Card>
          </Section>
        </>
      )}

      {/* CONCLUSION — THE RAINBOW APPEARS */}
      <div style={{ background: `linear-gradient(135deg, ${colors.navy} 0%, #1a2a40 50%, #2a4a5a 100%)`, padding: "56px 24px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, opacity: 0.05, background: "radial-gradient(circle at 70% 30%, rgba(212,168,83,0.4) 0%, transparent 60%)" }}></div>
        <div style={{ position: "relative", maxWidth: 720, margin: "0 auto", textAlign: "center" }}>
          <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", color: colors.gold, marginBottom: 12 }}>Conclusion</div>
          <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 32, fontWeight: 800, color: "#fff", margin: 0, lineHeight: 1.2 }}>The Fourth Trimester Ends… and a Rainbow Appears</h2>
          <p style={{ fontSize: 17, color: "rgba(255,255,255,0.7)", marginTop: 16, lineHeight: 1.7, maxWidth: 600, margin: "16px auto 0" }}>At four months, your baby is finally ready to be born — for real this time.</p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 16, marginTop: 32 }}>
            {[
              { icon: "🧠", stat: "25%", label: "Brain growth since birth" },
              { icon: "😊", stat: "Smiles", label: "Broad grins shot across the room" },
              { icon: "🤲", stat: "Grasps", label: "Hands open, reaching for rattles (and your nose)" },
              { icon: "💬", stat: "Coos", label: "Proto-conversation — the first back-and-forth 'talking'" },
            ].map((item, i) => (
              <div key={i} style={{ background: "rgba(255,255,255,0.08)", borderRadius: 14, padding: 20, border: "1px solid rgba(255,255,255,0.1)" }}>
                <div style={{ fontSize: 28 }}>{item.icon}</div>
                <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 24, fontWeight: 700, color: colors.gold, marginTop: 8 }}>{item.stat}</div>
                <div style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", marginTop: 4, lineHeight: 1.4 }}>{item.label}</div>
              </div>
            ))}
          </div>

          <div style={{ background: "rgba(255,255,255,0.06)", borderRadius: 16, padding: 24, marginTop: 32, border: "1px solid rgba(255,255,255,0.1)", textAlign: "left" }}>
            <p style={{ fontSize: 15, lineHeight: 1.8, color: "rgba(255,255,255,0.8)", margin: 0 }}>After months of fuzzy stares and long sleeps, your four-month-old's laugh and gurgle announce to the world: <em>"Dress rehearsals are over. I'm ready for my debut!"</em></p>
            <p style={{ fontSize: 15, lineHeight: 1.8, color: "rgba(255,255,255,0.8)", margin: "16px 0 0" }}>And you're not just a spectator — you earned this. You've endured pain, fatigue, and anxiety. You've learned enough to earn a Ph.D. in Babyology. The calming reflex gradually shifts from an automatic response to a familiar, reassuring sleep cue. Your baby is mastering the most important human skill: taking turns in conversation, starting with silly little games of back-and-forth cooing.</p>
            <p style={{ fontSize: 15, lineHeight: 1.8, color: colors.gold, margin: "16px 0 0", fontFamily: "'Playfair Display', Georgia, serif", fontStyle: "italic" }}>Congratulations. The real fun is just beginning.</p>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div style={{ background: colors.navy, padding: "32px 24px", textAlign: "center" }}>
        <p style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", margin: 0, lineHeight: 1.6 }}>Summary based on <em>The Happiest Baby on the Block</em> (2nd Edition, 2015) by Harvey Karp, M.D.<br />This is a study guide — not a substitute for medical advice. Always consult your pediatrician.</p>
      </div>

      {/* COMMENTS */}
      <Section>
        <GiscusComments locale="en" term="/reading-notes/happiest-baby-on-the-block" />
      </Section>
    </div>
  );
}
