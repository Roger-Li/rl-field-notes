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

export default function MilkSuppressionBottleFeedingEn() {
  const [openS, setOpenS] = useState(0);
  const [activeTab, setActiveTab] = useState("biology");

  const tabs = [
    { id: "biology", label: "The Biology" },
    { id: "protocol", label: "Suppression Protocol" },
    { id: "timeline", label: "Timeline & Red Flags" },
    { id: "bottles", label: "Bottle Feeding" },
    { id: "action", label: "Action Items" },
  ];

  return (
    <div style={{ background: colors.bg, fontFamily: "'Source Sans 3', sans-serif", color: colors.text, minHeight: "100vh" }}>
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700;800&family=Source+Sans+3:wght@300;400;600;700&display=swap" rel="stylesheet" />

      {/* HERO */}
      <div style={{ background: `linear-gradient(135deg, ${colors.navy} 0%, #14303d 100%)`, padding: "56px 24px 48px", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, opacity: 0.06, background: "repeating-linear-gradient(45deg, transparent, transparent 30px, rgba(255,255,255,0.1) 30px, rgba(255,255,255,0.1) 60px)" }}></div>
        <div style={{ position: "relative", maxWidth: 720, margin: "0 auto" }}>
          <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", color: colors.accent, marginBottom: 16 }}>Guide</div>
          <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 40, fontWeight: 800, color: "#fff", margin: 0, lineHeight: 1.15 }}>Milk Suppression &amp; Bottle Feeding</h1>
          <p style={{ fontSize: 17, color: "rgba(255,255,255,0.7)", marginTop: 12, lineHeight: 1.5 }}>Evidence-checked guidance from a lactation consultation on Day 12 postpartum — with an IBCLC lactation consultant</p>
          <div style={{ display: "flex", justifyContent: "center", gap: 32, marginTop: 32, flexWrap: "wrap" }}>
            <StatBox num="Day 12" label="Postpartum" color={colors.gold} />
            <StatBox num="~700 mL" label="Daily intake" color={colors.accent} />
            <StatBox num="7-8 min" label="Per ounce" color={colors.teal} />
            <StatBox num="15 min" label="Per 2 oz bottle" color={colors.indigo} />
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "16px 24px 0" }}>
        <AudioPlayer locale="en" contentKey="guides/milk-suppression-bottle-feeding" />
      </div>

      {/* CONTEXT CALLOUT */}
      <Section>
        <Card accent={colors.accent}>
          <Badge color={colors.accent} bg={colors.accentLight}>Our Situation</Badge>
          <p style={{ fontSize: 15, lineHeight: 1.7, margin: "8px 0 0" }}>If you&apos;ve chosen formula feeding, here&apos;s the thing nobody warns you about: <strong>your body doesn&apos;t care about your feeding plan.</strong> Milk production kicks in regardless of whether you intend to breastfeed, and it takes weeks to fully resolve.</p>
          <p style={{ fontSize: 15, lineHeight: 1.7, margin: "12px 0 0" }}>This guide is based on a lactation consultation at Day 12 postpartum. By that point, the worst of engorgement had passed, a few hard lumps (plugged ducts) had appeared, and one breast was still producing some milk. The consultation covered how to safely shut down production, warning signs to watch for, and practical bottle-feeding optimization.</p>
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

      {/* ═══════════════════════ TAB 1 — THE BIOLOGY ═══════════════════════ */}
      {activeTab === "biology" && (
        <>
          <Section>
            <SectionTitle sub="Why milk production starts regardless of your feeding plan — and the elegant protein that shuts it down.">Why Milk Comes In Even If You Don&apos;t Breastfeed</SectionTitle>

            <Card accent={colors.accent}>
              <Badge color={colors.accent} bg={colors.accentLight}>The Progesterone Switch</Badge>
              <p style={{ fontSize: 15, lineHeight: 1.7, margin: "8px 0 0" }}>During pregnancy, high levels of <strong>progesterone</strong> actively suppress milk production. The moment the placenta separates from the uterine wall after delivery, progesterone levels plummet. That hormonal crash is the signal — the body immediately begins ramping up milk production.</p>
              <blockquote style={{ margin: "16px 0 0", padding: "12px 20px", background: colors.accentLight, borderLeft: `4px solid ${colors.accent}`, borderRadius: "0 8px 8px 0", fontSize: 14, lineHeight: 1.7, color: colors.navy }}>
                <strong>The implication:</strong> You cannot prevent this. Even if you know from day one that you&apos;re formula feeding, lactogenesis (milk production) is triggered by placental delivery, not by breastfeeding. It&apos;s a hormonal event, not a behavioral one.
              </blockquote>
              <div style={{ marginTop: 12 }}>
                <Badge color={colors.green} bg={colors.greenLight}>Verified</Badge>
                <p style={{ fontSize: 13, lineHeight: 1.6, color: colors.textLight, margin: "4px 0 0" }}>PubMed and multiple endocrinology sources confirm that the withdrawal of estrogen and progesterone postpartum allows prolactin to dominate and initiate milk secretion. This is well-established reproductive physiology.</p>
              </div>
            </Card>
          </Section>

          <Section bg={colors.card}>
            <SectionTitle color={colors.accent} sub="The key insight from the consultation — your body has a built-in feedback loop for shutting down milk production.">The FIL Protein — Your Body&apos;s Built-In Off Switch</SectionTitle>

            <p style={{ fontSize: 15, lineHeight: 1.7, marginBottom: 24 }}>There&apos;s a protein called <strong>FIL (Feedback Inhibitor of Lactation)</strong> — a whey protein naturally present in breast milk. Here&apos;s how it works:</p>

            <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
              <FlowBox color={colors.accent} bg={colors.accentLight}>🥛 <strong>Breasts are full</strong> — milk isn&apos;t being removed</FlowBox>
              <FlowArrow />
              <FlowBox color={colors.teal} bg={colors.tealLight}>🧬 <strong>FIL accumulates</strong> — concentration rises in retained milk</FlowBox>
              <FlowArrow />
              <FlowBox color={colors.indigo} bg={colors.indigoLight}>📡 <strong>Local signal sent</strong> — FIL tells lactocytes (milk-producing cells): stop making more</FlowBox>
              <FlowArrow />
              <FlowBox color={colors.gold} bg={colors.goldLight}>📉 <strong>Production decreases</strong> — each breast regulates itself independently (autocrine mechanism)</FlowBox>
            </div>

            <Card style={{ marginTop: 24, background: colors.accentLight, border: `1px solid ${colors.accent}40` }}>
              <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 17, fontWeight: 700, color: colors.navy, marginBottom: 8 }}>The Core Strategy Is Counterintuitive</div>
              <p style={{ fontSize: 15, lineHeight: 1.7, margin: 0 }}><strong>Leave the milk there.</strong> Don&apos;t pump it out, don&apos;t express it. The retained milk = more FIL = stronger suppression signal. This is why the &quot;do nothing&quot; approach actually works — you&apos;re letting the body&apos;s own feedback loop do its job.</p>
            </Card>

            <div style={{ marginTop: 20 }}>
              <Badge color={colors.green} bg={colors.greenLight}>Verified</Badge>
              <p style={{ fontSize: 13, lineHeight: 1.6, color: colors.textLight, margin: "4px 0 0" }}>FIL was identified and characterized by Peaker &amp; Wilde (1996) in the <em>Journal of Mammary Gland Biology and Neoplasia</em>. The NCBI Bookshelf&apos;s chapter on breastfeeding physiology describes it as a polypeptide that &quot;controls lactation by reversibly blocking milk synthesis and secretion when the breast is full.&quot; It&apos;s also referenced in the ABM Clinical Protocol #36 (2022) and multiple lactation textbooks.</p>
            </div>

            <Card style={{ marginTop: 20, background: colors.indigoLight, border: `1px solid ${colors.indigo}40` }}>
              <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 17, fontWeight: 700, color: colors.navy, marginBottom: 8 }}>Why Asymmetric Drying Is Normal</div>
              <p style={{ fontSize: 15, lineHeight: 1.7, margin: 0 }}>FIL is why one breast can stop producing milk while the other continues — they regulate independently. Side-to-side asymmetry is very common; each breast has its own local supply-and-demand loop, and differences in duct anatomy or how much milk accumulated on each side can lead one to resolve before the other.</p>
            </Card>
          </Section>
        </>
      )}

      {/* ═══════════════════════ TAB 2 — SUPPRESSION PROTOCOL ═══════════════════════ */}
      {activeTab === "protocol" && (
        <>
          <Section>
            <SectionTitle sub="The consultant&apos;s evidence-based action plan for safely shutting down milk production.">The Milk Suppression Protocol</SectionTitle>

            <Card>
              <Badge color={colors.accent} bg={colors.accentLight}>What to Do</Badge>
              <div style={{ overflowX: "auto", marginTop: 12 }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14, lineHeight: 1.6 }}>
                  <thead>
                    <tr style={{ background: colors.accentLight }}>
                      <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 700, color: colors.navy, borderBottom: `2px solid ${colors.accent}` }}>Action</th>
                      <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 700, color: colors.navy, borderBottom: `2px solid ${colors.accent}` }}>Details</th>
                      <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 700, color: colors.navy, borderBottom: `2px solid ${colors.accent}` }}>Why It Works</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={{ borderBottom: `1px solid ${colors.border}` }}>
                      <td style={{ padding: "12px 16px", fontWeight: 600 }}>Leave it alone</td>
                      <td style={{ padding: "12px 16px" }}>Don&apos;t pump, express, or stimulate the breasts</td>
                      <td style={{ padding: "12px 16px" }}>Retained milk &#8594; FIL accumulates &#8594; production shuts down</td>
                    </tr>
                    <tr style={{ borderBottom: `1px solid ${colors.border}` }}>
                      <td style={{ padding: "12px 16px", fontWeight: 600 }}>Wear a supportive bra</td>
                      <td style={{ padding: "12px 16px" }}>Sports bra 24/7, but not overly tight</td>
                      <td style={{ padding: "12px 16px" }}>Gentle compression helps; too-tight bras can block ducts</td>
                    </tr>
                    <tr style={{ borderBottom: `1px solid ${colors.border}` }}>
                      <td style={{ padding: "12px 16px", fontWeight: 600 }}>Ice packs</td>
                      <td style={{ padding: "12px 16px" }}>Apply every few hours, especially to hard spots</td>
                      <td style={{ padding: "12px 16px" }}>Reduces inflammation (think: sprained ankle treatment)</td>
                    </tr>
                    <tr style={{ borderBottom: `1px solid ${colors.border}` }}>
                      <td style={{ padding: "12px 16px", fontWeight: 600 }}>Ibuprofen</td>
                      <td style={{ padding: "12px 16px" }}>Take as directed for pain/inflammation</td>
                      <td style={{ padding: "12px 16px" }}>Anti-inflammatory + analgesic; directly counters the swelling</td>
                    </tr>
                    <tr style={{ borderBottom: `1px solid ${colors.border}` }}>
                      <td style={{ padding: "12px 16px", fontWeight: 600 }}>Gentle massage</td>
                      <td style={{ padding: "12px 16px" }}>Very light, stroking motion <strong>toward the armpit</strong></td>
                      <td style={{ padding: "12px 16px" }}>Helps lymphatic drainage; lymph nodes in the axillary area clear excess fluid</td>
                    </tr>
                    <tr>
                      <td style={{ padding: "12px 16px", fontWeight: 600 }}>Monitor for complications</td>
                      <td style={{ padding: "12px 16px" }}>Watch for red flags (see Timeline &amp; Red Flags tab)</td>
                      <td style={{ padding: "12px 16px" }}>Catching mastitis early is critical</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </Card>
          </Section>

          <Section bg={colors.card}>
            <SectionTitle color={colors.accent} sub="The &quot;leave it alone&quot; strategy is stage-specific — and the distinction matters.">Early vs. Late Suppression</SectionTitle>

            <SCard
              num="1"
              title="During Peak Engorgement (Days 3-5)"
              subtitle="Relieve pressure — but don&apos;t empty"
              color={colors.rose}
              bg={colors.roseLight}
              icon="🔥"
              isOpen={openS === 1}
              toggle={() => setOpenS(openS === 1 ? 0 : 1)}
              details={
                <div>
                  <p>Breasts can become painfully full, hot, and swollen. In this phase, it&apos;s okay to <strong>remove a small amount of milk</strong> — just enough to relieve the worst of the pressure. You&apos;re not trying to empty the breast, just prevent dangerous levels of backup that could lead to plugged ducts or mastitis.</p>
                  <p style={{ marginTop: 12, fontStyle: "italic", color: colors.textLight }}>By Day 12, most parents will be past this stage.</p>
                </div>
              }
            />
            <SCard
              num="2"
              title="After Peak Engorgement (Day 5+)"
              subtitle="Leave it alone — let FIL work"
              color={colors.teal}
              bg={colors.tealLight}
              icon="✋"
              isOpen={openS === 2}
              toggle={() => setOpenS(openS === 2 ? 0 : 2)}
              details={
                <div>
                  <p>Once the intense fullness has subsided, the move is to leave the remaining milk alone entirely. Whatever is still in there will trigger FIL and gradually suppress further production.</p>
                  <p style={{ marginTop: 12, fontWeight: 600 }}>Don&apos;t overgeneralize &quot;never express&quot; — during the worst of it, a little relief is the safer call.</p>
                </div>
              }
            />
          </Section>

          <Section>
            <SectionTitle sub="These common mistakes can backfire and actually increase production or risk complications.">What NOT to Do</SectionTitle>

            <Card accent={colors.rose}>
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14, lineHeight: 1.6 }}>
                  <thead>
                    <tr style={{ background: colors.roseLight }}>
                      <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 700, color: colors.navy, borderBottom: `2px solid ${colors.rose}` }}>Don&apos;t</th>
                      <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 700, color: colors.navy, borderBottom: `2px solid ${colors.rose}` }}>Why</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={{ borderBottom: `1px solid ${colors.border}` }}>
                      <td style={{ padding: "12px 16px", fontWeight: 600 }}>Don&apos;t pump or express milk</td>
                      <td style={{ padding: "12px 16px" }}>Removal = demand signal = more production. The opposite of what you want. (Past peak engorgement — see nuance above.)</td>
                    </tr>
                    <tr style={{ borderBottom: `1px solid ${colors.border}` }}>
                      <td style={{ padding: "12px 16px", fontWeight: 600 }}>Don&apos;t use vigorous massage or vibrating devices</td>
                      <td style={{ padding: "12px 16px" }}>Electric toothbrush massage on tender breast tissue <strong>increases inflammation</strong>. This was a popular recommendation but is no longer advised.</td>
                    </tr>
                    <tr style={{ borderBottom: `1px solid ${colors.border}` }}>
                      <td style={{ padding: "12px 16px", fontWeight: 600 }}>Don&apos;t wear underwire bras</td>
                      <td style={{ padding: "12px 16px" }}>Can create pressure points that block ducts, increasing mastitis risk.</td>
                    </tr>
                    <tr>
                      <td style={{ padding: "12px 16px", fontWeight: 600 }}>Don&apos;t restrict fluids</td>
                      <td style={{ padding: "12px 16px" }}>Ineffective for suppression and risks dehydration.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div style={{ marginTop: 16 }}>
                <Badge color={colors.green} bg={colors.greenLight}>Verified</Badge>
                <p style={{ fontSize: 13, lineHeight: 1.6, color: colors.textLight, margin: "4px 0 0" }}><strong>Vigorous massage:</strong> The ABM Clinical Protocol #36 (Revised 2022) explicitly recommends against deep massage. The updated guidance across La Leche League GB, Nest Collaborative, and Minnesota WIC all confirm: the new approach is &quot;ice, ice, ice&quot; — not &quot;massage, massage, massage.&quot; The protocol shift happened because research showed aggressive manipulation increases tissue inflammation and can worsen ductal narrowing.</p>
                <p style={{ fontSize: 13, lineHeight: 1.6, color: colors.textLight, margin: "8px 0 0" }}><strong>Bra guidance:</strong> HonorHealth and the NHS both note that historically, breast binding was used but is now discouraged as it can cause blocked ducts and mastitis. A supportive (not constrictive) bra is the current recommendation.</p>
              </div>
            </Card>
          </Section>

          <Section bg={colors.card}>
            <SectionTitle color={colors.accent} sub="Direction matters — gentle strokes toward the armpit, not the nipple.">The Massage Direction Matters</SectionTitle>

            <Card accent={colors.teal}>
              <p style={{ fontSize: 15, lineHeight: 1.7, margin: 0 }}>The consultant specifically said to massage <strong>toward the armpit</strong>, not toward the nipple. This is because the axillary (armpit) lymph nodes are where excess fluid drains. This is consistent with the <strong>lymphatic drainage massage</strong> technique now recommended by La Leche League and referenced in the ABM protocol.</p>
              <p style={{ fontSize: 15, lineHeight: 1.7, margin: "12px 0 0", fontStyle: "italic", color: colors.textLight }}>Think of it like petting a cat — very gentle, one-direction strokes toward the armpit. Not kneading bread.</p>
              <div style={{ marginTop: 12 }}>
                <Badge color={colors.green} bg={colors.greenLight}>Verified</Badge>
                <p style={{ fontSize: 13, lineHeight: 1.6, color: colors.textLight, margin: "4px 0 0" }}>La Leche League GB specifically recommends &quot;gentle lymphatic drainage massage towards your armpit&quot; and provides video demonstrations of this technique.</p>
              </div>
            </Card>
          </Section>

          <Section>
            <SectionTitle sub="What about &quot;No More Milk&quot; tea, peppermint, and sage? The honest answer: a little, maybe.">Do Herbal Teas Actually Help?</SectionTitle>

            <Card>
              <p style={{ fontSize: 15, lineHeight: 1.7, margin: "0 0 16px" }}>The consultant&apos;s framing was perfect: <strong>supply is primarily controlled by removal (or non-removal) of milk.</strong> Herbal remedies are, at best, a mild nudge.</p>
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14, lineHeight: 1.6 }}>
                  <thead>
                    <tr style={{ background: colors.tealLight }}>
                      <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 700, color: colors.navy, borderBottom: `2px solid ${colors.teal}` }}>Herb</th>
                      <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 700, color: colors.navy, borderBottom: `2px solid ${colors.teal}` }}>Evidence Level</th>
                      <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 700, color: colors.navy, borderBottom: `2px solid ${colors.teal}` }}>Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={{ borderBottom: `1px solid ${colors.border}` }}>
                      <td style={{ padding: "12px 16px", fontWeight: 600 }}>Sage</td>
                      <td style={{ padding: "12px 16px" }}>Anecdotal + traditional use; no clinical trials</td>
                      <td style={{ padding: "12px 16px" }}>KellyMom recommends &frac14; tsp dried sage 3x/day for weaning. LactMed says &quot;no scientifically valid clinical trials support this use&quot;</td>
                    </tr>
                    <tr style={{ borderBottom: `1px solid ${colors.border}` }}>
                      <td style={{ padding: "12px 16px", fontWeight: 600 }}>Peppermint</td>
                      <td style={{ padding: "12px 16px" }}>Anecdotal; in vitro/animal evidence only</td>
                      <td style={{ padding: "12px 16px" }}>LactMed (NCBI): &quot;no clinical trials have been found that demonstrate lactation suppression&quot; in humans. Menthol suppresses milk in cell culture and mice, but human evidence is limited to anecdote</td>
                    </tr>
                    <tr>
                      <td style={{ padding: "12px 16px", fontWeight: 600 }}>Hibiscus</td>
                      <td style={{ padding: "12px 16px" }}>Traditional use</td>
                      <td style={{ padding: "12px 16px" }}>Less studied than sage/peppermint for this purpose</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p style={{ fontSize: 15, lineHeight: 1.7, margin: "16px 0 0" }}><strong>The consultant&apos;s take:</strong> If you love tea and need to hydrate anyway, drink a lot of it — it certainly won&apos;t hurt and might help marginally. But you&apos;d need to drink <strong>a significant amount</strong> for a noticeable effect. The real mechanism driving suppression is non-removal (FIL).</p>
              <div style={{ marginTop: 12 }}>
                <Badge color={colors.green} bg={colors.greenLight}>Verified</Badge>
                <p style={{ fontSize: 13, lineHeight: 1.6, color: colors.textLight, margin: "4px 0 0" }}>LactMed (the NIH&apos;s drugs and lactation database) confirms that peppermint is traditionally used to suppress lactation but &quot;no clinical trials have been found.&quot; KellyMom notes that peppermint tea is &quot;a very weak form of peppermint and only large amounts (quarts) would be expected to decrease milk supply.&quot; The evidence base here is almost entirely anecdotal.</p>
              </div>
            </Card>
          </Section>
        </>
      )}

      {/* ═══════════════════════ TAB 3 — TIMELINE & RED FLAGS ═══════════════════════ */}
      {activeTab === "timeline" && (
        <>
          <Section>
            <SectionTitle sub="What to expect day by day — milk suppression is a biological process that takes weeks and cannot be rushed.">Timeline: What to Expect</SectionTitle>

            <TimelineItem age="Days 1-3" title="Colostrum Only" desc="Breasts may not feel very different. Colostrum is present but mature milk has not yet arrived." color={colors.teal} />
            <TimelineItem age="Days 3-5" title="Engorgement Peaks" desc="Mature milk arrives. This is the most uncomfortable 48 hours. Risk of complications is highest here. Breasts become painfully full, hot, and swollen." color={colors.rose} />
            <TimelineItem age="Days 5-12" title="Gradual Decrease" desc="If milk isn&apos;t being removed, production begins to slow. You may get a secondary swell — holding your baby skin-to-skin can trigger an oxytocin-driven re-engagement." color={colors.accent} />
            <TimelineItem age="Wk 2-4+" title="Slow Trickle-Down" desc="Small amounts of milk are normal. Asymmetric drying (one side before the other) is common. Each breast operates on its own FIL-driven timeline." color={colors.indigo} />
            <TimelineItem age="Several Weeks" title="Full Resolution" desc="Can&apos;t be rushed — this is just the biological timeline. There&apos;s really nothing more to do beyond the protocol." color={colors.gold} />
          </Section>

          <Section bg={colors.card}>
            <SectionTitle color={colors.accent} sub="Holding your baby can briefly restart what you thought was over.">The Oxytocin Curveball</SectionTitle>

            <Card accent={colors.gold}>
              <p style={{ fontSize: 15, lineHeight: 1.7, margin: 0 }}>Holding your baby skin-to-skin or for extended periods can trigger an <strong>oxytocin</strong> release, which is the hormone responsible for the milk ejection reflex (&quot;let-down&quot;). Engorgement can briefly relapse after a long holding session. This is normal but can be surprising if you thought you were past the worst.</p>
              <div style={{ marginTop: 12 }}>
                <Badge color={colors.green} bg={colors.greenLight}>Verified</Badge>
                <p style={{ fontSize: 13, lineHeight: 1.6, color: colors.textLight, margin: "4px 0 0" }}>The NCBI chapter on breastfeeding physiology confirms that oxytocin is released in response to sensory stimuli from the nipple and can be triggered by closeness with the infant. This is a well-documented neuroendocrine reflex.</p>
              </div>
            </Card>

            <Card style={{ marginTop: 20, background: colors.greenLight, border: `1px solid ${colors.green}40` }}>
              <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 17, fontWeight: 700, color: colors.navy, marginBottom: 8 }}>The Reassurance at Day 12</div>
              <p style={{ fontSize: 15, lineHeight: 1.7, margin: 0 }}>The consultant was pretty emphatic that by Day 12, you&apos;ve <strong>likely ridden out the highest-risk period.</strong> The engorgement phase (Days 3-5) is when the backup and infection risk are most dangerous because there&apos;s so much unreleased milk. At Day 12, the remaining volume is low enough that the chances of things going sideways drop significantly.</p>
              <p style={{ fontSize: 15, lineHeight: 1.7, margin: "12px 0 0" }}>She specifically said: don&apos;t be concerned if you still see some milk for a few more weeks. That&apos;s normal. It&apos;s a slow trickle-down — it cannot be rushed. There&apos;s really nothing more to do beyond following the protocol above.</p>
            </Card>
          </Section>

          <Section>
            <SectionTitle color={colors.rose} sub="The consultant outlined a clear progression of symptoms that would indicate mastitis. This is an escalation — don&apos;t wait for all six.">Red Flags: When to Call the Doctor</SectionTitle>

            <Card accent={colors.rose}>
              <Badge color={colors.rose} bg={colors.roseLight}>The Mastitis Warning Ladder</Badge>
              <div style={{ marginTop: 16 }}>
                <WarningStep num={1} severity={1} title="Hard spot develops" desc="A palpable lump in the breast" />
                <WarningStep num={2} severity={2} title="Pain increases" desc="The area becomes tender" />
                <WarningStep num={3} severity={3} title="Redness appears" desc="Localized discolored patch" />
                <WarningStep num={4} severity={4} title="Redness spreads" desc="Larger red area, possibly with streaking" />
                <WarningStep num={5} severity={5} title="Fever > 101&deg;F (38.4&deg;C)" desc="Even if taking Tylenol/ibuprofen, a fever that breaks through pain medication is a warning sign" />
                <WarningStep num={6} severity={6} title="Flu-like symptoms" desc="&quot;Hit by a truck&quot; feeling, chills, body aches" />
              </div>
            </Card>

            <Callout type="warn" title="Don&apos;t wait for fever">
              This ladder is a progression, not a checklist where you need all six. A worsening painful, hot, or red area — or a hard spot that&apos;s getting bigger instead of smaller — is reason enough to call the doctor, even without a fever. This is especially true when you&apos;re already taking Tylenol, Voltaren, or ibuprofen for other recovery (like a Grade 3 perineal tear), since those medications can mask early temperature rises. The consultant noted that a true mastitis fever would probably &quot;break through&quot; pain medication, but don&apos;t use the absence of fever as a reason to wait.
            </Callout>

            <div style={{ marginTop: 20 }}>
              <Badge color={colors.green} bg={colors.greenLight}>Verified</Badge>
              <p style={{ fontSize: 13, lineHeight: 1.6, color: colors.textLight, margin: "4px 0 0" }}>The ABM Clinical Protocol #36 (2022) describes inflammatory mastitis as presenting with increasingly painful, swollen, and discolored breast tissue along with possible systemic symptoms like fever, chills, and elevated heart rate. Importantly, the protocol notes that systemic inflammatory response can occur without infection. La Leche League International recommends calling a doctor if symptoms don&apos;t improve within 24-48 hours or if fever reaches 101&deg;F (38.4&deg;C) or higher — but also if you simply feel worse.</p>
            </div>

            <Card style={{ marginTop: 20, background: colors.greenLight, border: `1px solid ${colors.green}40` }}>
              <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 17, fontWeight: 700, color: colors.navy, marginBottom: 8 }}>The Good News</div>
              <p style={{ fontSize: 15, lineHeight: 1.7, margin: 0 }}>When the consultant sees people having trouble with milk suppression, it&apos;s almost always much closer to the peak engorgement phase (Days 3-5), when there&apos;s far more unreleased milk creating backup pressure. By Day 12, the risk profile is much lower.</p>
              <p style={{ fontSize: 15, lineHeight: 1.7, margin: "12px 0 0" }}>She shared these red flags as &quot;things to know, so you know what to look for&quot; — not because most parents at this stage are likely to see them.</p>
            </Card>
          </Section>
        </>
      )}

      {/* ═══════════════════════ TAB 4 — BOTTLE FEEDING ═══════════════════════ */}
      {activeTab === "bottles" && (
        <>
          <Section>
            <SectionTitle sub="You might think you have bottles figured out, but there&apos;s often more to optimize.">Bottle Feeding: What We Learned</SectionTitle>

            <Card accent={colors.indigo}>
              <Badge color={colors.indigo} bg={colors.indigoLight}>Sample Newborn Setup at Day 12</Badge>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 12, marginTop: 12 }}>
                {[
                  { label: "Bottle", value: "Dr. Brown\u2019s (narrow)" },
                  { label: "Nipple", value: "Level 1 (slow flow)" },
                  { label: "Per feed", value: "2\u20132.5 oz" },
                  { label: "Feeds/day", value: "8\u201310" },
                  { label: "Daily total", value: "~700 mL (~24 oz)" },
                  { label: "Weight", value: "8 lb 7 oz" },
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
            <SectionTitle color={colors.accent} sub="The consultant noticed two red flags: milk coming out of his mouth and audible gulping.">The Flow Rate Might Be Too Fast</SectionTitle>

            <Card accent={colors.rose}>
              <p style={{ fontSize: 15, lineHeight: 1.7, margin: 0 }}>Both suggest the flow rate is faster than he can comfortably manage. The analogy she used was great: <em>&quot;It&apos;s like doing a keg stand on the bottle — there&apos;s so much milk coming, he can&apos;t keep up.&quot;</em></p>
              <p style={{ fontSize: 15, lineHeight: 1.7, margin: "12px 0 0" }}>She also noted that drinking too fast can cause the baby to become <strong>overly full</strong> and lead to <strong>tummy discomfort</strong> — so it&apos;s not just a mess issue, it&apos;s a comfort issue. The signs to watch for (gulping, milk leaking from mouth) are the cues that the pace is outrunning his coordination.</p>
            </Card>
          </Section>

          <Section>
            <SectionTitle sub="Most parents assume Level 1 is the slowest. It&apos;s not — there are three levels below it.">Dr. Brown&apos;s Nipple Hierarchy</SectionTitle>

            <Card>
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14, lineHeight: 1.6 }}>
                  <thead>
                    <tr style={{ background: colors.accentLight }}>
                      <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 700, color: colors.navy, borderBottom: `2px solid ${colors.accent}` }}>Nipple Level</th>
                      <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 700, color: colors.navy, borderBottom: `2px solid ${colors.accent}` }}>Flow Rate</th>
                      <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 700, color: colors.navy, borderBottom: `2px solid ${colors.accent}` }}>Who It&apos;s For</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={{ borderBottom: `1px solid ${colors.border}`, background: colors.greenLight }}>
                      <td style={{ padding: "12px 16px", fontWeight: 600 }}>Ultra-Preemie</td>
                      <td style={{ padding: "12px 16px" }}>Slowest</td>
                      <td style={{ padding: "12px 16px" }}>NICU babies, medically fragile infants</td>
                    </tr>
                    <tr style={{ borderBottom: `1px solid ${colors.border}`, background: colors.greenLight }}>
                      <td style={{ padding: "12px 16px", fontWeight: 600 }}>Preemie (P)</td>
                      <td style={{ padding: "12px 16px" }}>Very slow</td>
                      <td style={{ padding: "12px 16px" }}>Premature babies, babies who need slower flow</td>
                    </tr>
                    <tr style={{ borderBottom: `1px solid ${colors.border}`, background: colors.greenLight }}>
                      <td style={{ padding: "12px 16px", fontWeight: 600 }}>Transition (T)</td>
                      <td style={{ padding: "12px 16px" }}>Slow (between P and 1)</td>
                      <td style={{ padding: "12px 16px" }}>Breastfed babies transitioning to bottle, babies who find Level 1 too fast</td>
                    </tr>
                    <tr style={{ borderBottom: `1px solid ${colors.border}` }}>
                      <td style={{ padding: "12px 16px", fontWeight: 600 }}>Level 1</td>
                      <td style={{ padding: "12px 16px" }}>Standard slow</td>
                      <td style={{ padding: "12px 16px" }}>Default starting point for most newborns</td>
                    </tr>
                    <tr style={{ borderBottom: `1px solid ${colors.border}` }}>
                      <td style={{ padding: "12px 16px", fontWeight: 600 }}>Level 2</td>
                      <td style={{ padding: "12px 16px" }}>Medium</td>
                      <td style={{ padding: "12px 16px" }}>~3 months+</td>
                    </tr>
                    <tr style={{ borderBottom: `1px solid ${colors.border}` }}>
                      <td style={{ padding: "12px 16px", fontWeight: 600 }}>Level 3</td>
                      <td style={{ padding: "12px 16px" }}>Fast</td>
                      <td style={{ padding: "12px 16px" }}>~6 months+</td>
                    </tr>
                    <tr style={{ borderBottom: `1px solid ${colors.border}` }}>
                      <td style={{ padding: "12px 16px", fontWeight: 600 }}>Level 4</td>
                      <td style={{ padding: "12px 16px" }}>Very fast</td>
                      <td style={{ padding: "12px 16px" }}>~9 months+</td>
                    </tr>
                    <tr>
                      <td style={{ padding: "12px 16px", fontWeight: 600 }}>Y-Cut</td>
                      <td style={{ padding: "12px 16px" }}>Variable (baby-controlled)</td>
                      <td style={{ padding: "12px 16px" }}>Thickened liquids</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div style={{ marginTop: 16 }}>
                <Badge color={colors.green} bg={colors.greenLight}>Verified</Badge>
                <p style={{ fontSize: 13, lineHeight: 1.6, color: colors.textLight, margin: "4px 0 0" }}>Dr. Brown&apos;s official nipple level guide and their Medical Nipple Selection Guide both confirm this hierarchy. A PMC study (Pados et al.) measured Dr. Brown&apos;s Preemie flow at 7.38 mL/min versus Level 1 at 9.21 mL/min — so the Preemie nipple is measurably slower.</p>
              </div>
            </Card>

            <Card style={{ background: colors.indigoLight, border: `1px solid ${colors.indigo}40` }}>
              <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 17, fontWeight: 700, color: colors.navy, marginBottom: 8 }}>Key Insight from the Consultant</div>
              <p style={{ fontSize: 15, lineHeight: 1.7, margin: 0 }}>&quot;Bottle nipple levels are like baby clothes sizing — they mean nothing consistent across brands.&quot; Dr. Brown&apos;s Level 1 might be a different flow rate than Avent&apos;s or Lansinoh&apos;s Level 1. And counterintuitively, Dr. Brown&apos;s bottles are already known for being on the slower end. Yet for some babies, even that&apos;s too fast.</p>
            </Card>
          </Section>

          <Section bg={colors.card}>
            <SectionTitle color={colors.accent} sub="A practical rule of thumb for how long a feed should take.">Pacing: The Consultant&apos;s Rule of Thumb</SectionTitle>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 20, marginBottom: 24 }}>
              <Card style={{ textAlign: "center", background: colors.accentLight, border: `1px solid ${colors.accent}40` }}>
                <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 36, fontWeight: 800, color: colors.accent }}>7-8 min</div>
                <div style={{ fontSize: 14, color: colors.textLight, marginTop: 4 }}>per ounce (newborn)</div>
              </Card>
              <Card style={{ textAlign: "center", background: colors.goldLight, border: `1px solid ${colors.gold}40` }}>
                <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 36, fontWeight: 800, color: colors.gold }}>~15 min</div>
                <div style={{ fontSize: 14, color: colors.textLight, marginTop: 4 }}>for a 2 oz bottle</div>
              </Card>
              <Card style={{ textAlign: "center", background: colors.tealLight, border: `1px solid ${colors.teal}40` }}>
                <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 36, fontWeight: 800, color: colors.teal }}>~5 min</div>
                <div style={{ fontSize: 14, color: colors.textLight, marginTop: 4 }}>per ounce at ~6 weeks</div>
              </Card>
            </div>

            <Card>
              <p style={{ fontSize: 15, lineHeight: 1.7, margin: 0 }}>If he&apos;s blowing through a bottle much faster than that, the flow is probably too fast.</p>
              <div style={{ marginTop: 12 }}>
                <Badge color={colors.gold} bg={colors.goldLight}>Heuristic</Badge>
                <p style={{ fontSize: 13, lineHeight: 1.6, color: colors.textLight, margin: "4px 0 0" }}>This minutes-per-ounce number is the consultant&apos;s practical heuristic — not a specific AAP or guideline-backed metric. What <em>is</em> well-supported across paced feeding resources (Minnesota WIC, Colorado WIC, Pampers/AAP) is that total bottle feed time for newborns should be roughly <strong>15-20 minutes</strong>, and that gulping, milk leaking from the mouth, and wide eyes are signs the flow is too fast. The consultant&apos;s per-ounce framing is a useful way to operationalize that, but don&apos;t treat it as a precise standard.</p>
              </div>
            </Card>
          </Section>

          <Section>
            <SectionTitle sub="At ~6 weeks, the target pace shifts as coordination improves — and frustration is the signal to adjust.">At ~6 Weeks, the Pace Changes</SectionTitle>

            <Card accent={colors.teal}>
              <p style={{ fontSize: 15, lineHeight: 1.7, margin: 0 }}>The consultant mentioned that around 6 weeks, the target pace shifts down to about <strong>5 minutes per ounce</strong> as the baby&apos;s coordination improves. At that point:</p>
              <ul style={{ fontSize: 15, lineHeight: 1.8, margin: "12px 0 0", paddingLeft: 20 }}>
                <li>He may get frustrated with a Preemie or Transition nipple — fussing, giving up on the bottle, acting annoyed</li>
                <li>That frustration is the signal to move back up to Level 1</li>
                <li>If Level 1 eventually becomes too slow, consider switching bottles entirely</li>
              </ul>
              <p style={{ fontSize: 15, lineHeight: 1.7, margin: "12px 0 0", fontWeight: 600 }}>The key principle she emphasized: let the baby tell you. If the slower nipple makes him struggle, go back up. If the faster nipple makes him gulp and spill, go back down.</p>
              <div style={{ marginTop: 12 }}>
                <Badge color={colors.gold} bg={colors.goldLight}>Heuristic</Badge>
                <p style={{ fontSize: 13, lineHeight: 1.6, color: colors.textLight, margin: "4px 0 0" }}>Same caveat: the 5 min/oz figure is her practical benchmark, not a published guideline number.</p>
              </div>
            </Card>
          </Section>

          <Section bg={colors.card}>
            <SectionTitle color={colors.accent} sub="The consultant preferred Lansinoh for its wider nipple shape — but this is clinical preference, not hard evidence.">The Lansinoh Bottle and Nipple Shape</SectionTitle>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: 20 }}>
              <Card accent={colors.indigo}>
                <Badge color={colors.indigo} bg={colors.indigoLight}>Dr. Brown&apos;s (Narrow)</Badge>
                <p style={{ fontSize: 15, lineHeight: 1.7, margin: "8px 0 0" }}>Smaller nipple, easier for newborns to latch onto. Good starting bottle for the early weeks.</p>
              </Card>
              <Card accent={colors.teal}>
                <Badge color={colors.teal} bg={colors.tealLight}>Lansinoh (Wide)</Badge>
                <p style={{ fontSize: 15, lineHeight: 1.7, margin: "8px 0 0" }}>Wider nipple that fills the palate more. The consultant described it as more ideal for palate development and oral motor function going forward.</p>
              </Card>
            </div>

            <Card style={{ marginTop: 20 }}>
              <div style={{ marginTop: 0 }}>
                <Badge color={colors.gold} bg={colors.goldLight}>Clinician Preference</Badge>
                <p style={{ fontSize: 13, lineHeight: 1.6, color: colors.textLight, margin: "4px 0 0" }}>This is the consultant&apos;s clinical preference, and it makes intuitive sense — a wider teat shape more closely mimics the breast. However, the AAP has not endorsed any specific bottle or nipple shape as better for oral development. There&apos;s some evidence that teat design affects feeding mechanics, but not enough to say &quot;Brand X is scientifically better than Brand Y.&quot; Treat this as a reasonable suggestion to consider, not a hard recommendation.</p>
              </div>
              <p style={{ fontSize: 15, lineHeight: 1.7, margin: "16px 0 0" }}><strong>The practical plan:</strong> Dr. Brown&apos;s is fine for now. Around 6-8 weeks, if your baby is ready for a faster flow and you want to try a different shape, the Lansinoh is worth testing. Its flow tends to be a bit faster than Dr. Brown&apos;s, so the timing lines up.</p>
            </Card>

            <div style={{ marginTop: 20 }}>
              <Callout type="info" title="Related guide">
                For how much formula to feed at each weight and age, see our <a href="/guides/formula-feeding" style={{ color: colors.accent, fontWeight: 600 }}>Formula Feeding Calculator</a> guide.
              </Callout>
            </div>
          </Section>
        </>
      )}

      {/* ═══════════════════════ TAB 5 — ACTION ITEMS ═══════════════════════ */}
      {activeTab === "action" && (
        <>
          <Section>
            <SectionTitle sub="Everything from the consultation distilled into concrete next steps.">Action Items Summary</SectionTitle>

            <Card accent={colors.accent}>
              <Badge color={colors.accent} bg={colors.accentLight}>For Milk Suppression</Badge>
              <div style={{ marginTop: 12 }}>
                <CheckItem>Wear a supportive sports bra 24/7 (not too tight)</CheckItem>
                <CheckItem>Ice every few hours, especially on hard spots</CheckItem>
                <CheckItem>Take ibuprofen as directed (anti-inflammatory)</CheckItem>
                <CheckItem>Add gentle lymphatic massage toward the armpit</CheckItem>
                <CheckItem>Monitor any hard spots — they should gradually shrink</CheckItem>
                <CheckItem>Watch for mastitis warning signs: worsening pain, enlarging hard spots, redness/heat, streaking, flu-like symptoms, or fever &gt; 101&deg;F — don&apos;t wait for fever alone</CheckItem>
                <CheckItem>Drink herbal tea if desired (marginal benefit, but harmless)</CheckItem>
                <CheckItem>Otherwise, do nothing. Let FIL do its work. Seeing some milk for several more weeks is normal and expected.</CheckItem>
              </div>
            </Card>

            <Card accent={colors.indigo}>
              <Badge color={colors.indigo} bg={colors.indigoLight}>For Bottle Feeding</Badge>
              <div style={{ marginTop: 12 }}>
                <CheckItem>Try Dr. Brown&apos;s <strong>Preemie</strong> or <strong>Transition (T)</strong> nipples if flow seems too fast</CheckItem>
                <CheckItem>Test whether your baby feeds more comfortably at a slower flow</CheckItem>
                <CheckItem>Target ~15 minutes for a 2 oz bottle (consultant&apos;s rule of thumb)</CheckItem>
                <CheckItem>If baby gets frustrated (fussing, giving up on the bottle), that&apos;s the signal to go back to Level 1</CheckItem>
                <CheckItem>Around 6 weeks: reassess pace — babies get faster as coordination improves</CheckItem>
                <CheckItem>Around 6-8 weeks: optionally try Lansinoh bottles for a wider nipple shape (consultant&apos;s preference, not a hard evidence-based requirement)</CheckItem>
              </div>
            </Card>
          </Section>

          <Section bg={colors.card}>
            <SectionTitle color={colors.accent} sub="Every claim in this guide was cross-checked against published medical literature.">Cross-Check Verdict</SectionTitle>

            <Card>
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13, lineHeight: 1.6 }}>
                  <thead>
                    <tr style={{ background: colors.accentLight }}>
                      <th style={{ padding: "10px 14px", textAlign: "left", fontWeight: 700, color: colors.navy, borderBottom: `2px solid ${colors.accent}` }}>Advice</th>
                      <th style={{ padding: "10px 14px", textAlign: "center", fontWeight: 700, color: colors.navy, borderBottom: `2px solid ${colors.accent}`, whiteSpace: "nowrap" }}>Verdict</th>
                      <th style={{ padding: "10px 14px", textAlign: "left", fontWeight: 700, color: colors.navy, borderBottom: `2px solid ${colors.accent}` }}>Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { advice: "Progesterone drop triggers lactation", verdict: "verified", note: "Standard reproductive endocrinology" },
                      { advice: "FIL protein suppresses production when milk retained", verdict: "verified", note: "Published research (Peaker & Wilde 1996), referenced in NCBI and ABM materials" },
                      { advice: "Leave milk alone to suppress (after peak engorgement)", verdict: "verified", note: "Consistent with supply-demand physiology and current ABM guidelines" },
                      { advice: "Small amount of removal okay during peak engorgement", verdict: "verified", note: "HonorHealth, NHS, and multiple lactation resources support this" },
                      { advice: "Avoid vigorous massage / electric toothbrush", verdict: "verified", note: "ABM Protocol #36 (2022) explicitly moved away from deep massage" },
                      { advice: "Gentle massage toward armpit", verdict: "verified", note: "Lymphatic drainage technique recommended by La Leche League GB and IABLE" },
                      { advice: "Ice + ibuprofen for inflammation", verdict: "verified", note: "First-line treatment in updated ABM protocol" },
                      { advice: "Sports bra (not too tight)", verdict: "verified", note: "Binding discouraged; supportive bra recommended (HonorHealth, NHS)" },
                      { advice: "Peppermint/sage tea — mild effect at best", verdict: "verified", note: "LactMed: no clinical trials in humans; anecdotal only; large amounts needed" },
                      { advice: "Several weeks for full resolution", verdict: "verified", note: "Spontaneous cessation typically occurs after ~15 days without stimulation, but small amounts can persist" },
                      { advice: "Mastitis signs: hard spot \u2192 pain \u2192 redness \u2192 fever", verdict: "verified", note: "Matches ABM Protocol #36 and LLLI guidance; don\u2019t wait for fever alone" },
                      { advice: "Oxytocin from holding baby can trigger let-down", verdict: "verified", note: "Well-established neuroendocrine reflex" },
                      { advice: "Uneven production between breasts is normal", verdict: "verified", note: "FIL operates independently per breast; asymmetry is common" },
                      { advice: "Dr. Brown\u2019s has Preemie and Transition levels below Level 1", verdict: "verified", note: "Dr. Brown\u2019s official guide and medical nipple selection guide" },
                      { advice: "Signs of too-fast flow: milk leaking, gulping", verdict: "verified", note: "Consistent across all paced feeding resources (WIC, AAP-sourced)" },
                      { advice: "Target ~15 min total for a 2 oz bottle (newborn)", verdict: "heuristic", note: "15\u201320 min total feed time is widely cited; the per-ounce breakdown is the consultant\u2019s heuristic" },
                      { advice: "7\u20138 min/oz now, ~5 min/oz at 6 weeks", verdict: "heuristic", note: "Consultant\u2019s practical benchmark, not a published guideline number" },
                      { advice: "Lansinoh nipple shape better for oral development", verdict: "heuristic", note: "Reasonable suggestion; AAP has not endorsed specific bottle shapes for developmental outcomes" },
                    ].map((row, i) => (
                      <tr key={i} style={{ borderBottom: `1px solid ${colors.border}` }}>
                        <td style={{ padding: "10px 14px" }}>{row.advice}</td>
                        <td style={{ padding: "10px 14px", textAlign: "center" }}>
                          {row.verdict === "verified" ? (
                            <span style={{ display: "inline-block", background: colors.greenLight, color: colors.green, fontSize: 11, fontWeight: 700, padding: "2px 8px", borderRadius: 10, textTransform: "uppercase" }}>Verified</span>
                          ) : (
                            <span style={{ display: "inline-block", background: colors.goldLight, color: colors.gold, fontSize: 11, fontWeight: 700, padding: "2px 8px", borderRadius: 10, textTransform: "uppercase" }}>Heuristic</span>
                          )}
                        </td>
                        <td style={{ padding: "10px 14px", color: colors.textLight }}>{row.note}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p style={{ fontSize: 15, lineHeight: 1.7, margin: "16px 0 0" }}><strong>Bottom line:</strong> The consultant&apos;s advice was thorough, current, and well-aligned with the 2022 ABM protocol and established lactation physiology. The milk suppression guidance is solidly evidence-based. The bottle-feeding tips are practical and sensible clinical advice — just calibrate your confidence accordingly when a <span style={{ color: colors.green, fontWeight: 700 }}>Verified</span> vs. <span style={{ color: colors.gold, fontWeight: 700 }}>Heuristic</span> appears above.</p>
            </Card>
          </Section>

          <Section>
            <SectionTitle sub="Published medical literature and clinical resources referenced throughout this guide.">Sources</SectionTitle>

            <Card accent={colors.accent}>
              <Badge color={colors.accent} bg={colors.accentLight}>Lactation &amp; Milk Suppression</Badge>
              <ul style={{ fontSize: 14, lineHeight: 2, margin: "8px 0 0", paddingLeft: 20, color: colors.textLight }}>
                <li><a href="https://pubmed.ncbi.nlm.nih.gov/35576513/" style={{ color: colors.accent }}>ABM Clinical Protocol #36: The Mastitis Spectrum, Revised 2022 (PubMed)</a></li>
                <li><a href="https://www.ncbi.nlm.nih.gov/books/NBK148970/" style={{ color: colors.accent }}>NCBI Bookshelf — The Physiological Basis of Breastfeeding</a></li>
                <li><a href="https://pubmed.ncbi.nlm.nih.gov/10887504/" style={{ color: colors.accent }}>Peaker &amp; Wilde (1996) — Feedback Control of Milk Secretion from Milk (PubMed)</a></li>
                <li><a href="https://www.ncbi.nlm.nih.gov/books/NBK501851/" style={{ color: colors.accent }}>LactMed — Peppermint (NCBI)</a></li>
                <li><a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC6599849/" style={{ color: colors.accent }}>Cochrane Review — Treatments for Suppression of Lactation (PMC)</a></li>
                <li><a href="https://kellymom.com/bf/can-i-breastfeed/herbs/herbs-oversupply/" style={{ color: colors.accent }}>KellyMom — Sage and Herbs for Decreasing Milk Supply</a></li>
                <li><a href="https://llli.org/breastfeeding-info/mastitis/" style={{ color: colors.accent }}>La Leche League International — Mastitis and Sore Breasts</a></li>
                <li><a href="https://laleche.org.uk/mastitis/" style={{ color: colors.accent }}>La Leche League GB — Mastitis, Blocked Ducts, and Engorgement</a></li>
                <li><a href="https://www.honorhealth.com/medical-services/maternity/lactation-suppression" style={{ color: colors.accent }}>HonorHealth — Lactation Suppression Tips</a></li>
                <li><a href="https://www.uhs.nhs.uk/Media/UHS-website-2019/Patientinformation/Pregnancyandbirth/Suppressing-your-breast-milk-supply-after-giving-birth-2907-PIL.pdf" style={{ color: colors.accent }}>NHS — Suppressing Your Breast Milk Supply After Giving Birth</a></li>
              </ul>
            </Card>

            <Card accent={colors.indigo}>
              <Badge color={colors.indigo} bg={colors.indigoLight}>Bottle Feeding</Badge>
              <ul style={{ fontSize: 14, lineHeight: 2, margin: "8px 0 0", paddingLeft: 20, color: colors.textLight }}>
                <li><a href="https://drbrownsbaby.com/blogs/articles/dr-browns-nipple-level-guide" style={{ color: colors.accent }}>Dr. Brown&apos;s Official Nipple Level Guide</a></li>
                <li><a href="https://www.drbrownsmedical.com/resources/nipple-flow-guidelines/" style={{ color: colors.accent }}>Dr. Brown&apos;s Medical — Nipple Flow Guidelines</a></li>
                <li><a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC5033656/" style={{ color: colors.accent }}>Pados et al. — Milk Flow Rates from Bottle Nipples (PMC)</a></li>
                <li><a href="https://www.coloradowic.gov/paced-bottle-feeding" style={{ color: colors.accent }}>Colorado WIC — Paced Bottle Feeding</a></li>
                <li><a href="https://www.health.state.mn.us/docs/people/wic/localagency/wedupdate/moyr/2017/topic/1115feeding.pdf" style={{ color: colors.accent }}>Minnesota WIC — Paced Bottle Feeding Guide</a></li>
              </ul>
            </Card>
          </Section>
        </>
      )}

      {/* CONCLUSION FOOTER */}
      <div style={{ background: `linear-gradient(135deg, ${colors.navy} 0%, #14303d 50%, #1a4050 100%)`, padding: "56px 24px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, opacity: 0.05, background: "radial-gradient(circle at 70% 30%, rgba(45,142,142,0.4) 0%, transparent 60%)" }}></div>
        <div style={{ position: "relative", maxWidth: 720, margin: "0 auto", textAlign: "center" }}>
          <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", color: colors.accent, marginBottom: 12 }}>Summary</div>
          <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 32, fontWeight: 800, color: "#fff", margin: 0, lineHeight: 1.2 }}>Trust the Biology — It&apos;s Working</h2>
          <p style={{ fontSize: 17, color: "rgba(255,255,255,0.7)", marginTop: 16, lineHeight: 1.7, maxWidth: 600, margin: "16px auto 0" }}>The body has an elegant built-in system for shutting down milk production. Your job is mostly to get out of its way.</p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 16, marginTop: 32 }}>
            {[
              { icon: "🧬", stat: "FIL", label: "Your body\u2019s own off switch" },
              { icon: "🧊", stat: "Ice", label: "First-line comfort measure" },
              { icon: "🍼", stat: "7-8 min/oz", label: "Pacing target for newborns" },
              { icon: "15/18", stat: "Verified", label: "Claims confirmed by literature" },
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
        <p style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", margin: 0, lineHeight: 1.6 }}>Based on a consultation with a board-certified lactation consultant (IBCLC)<br />Cross-referenced with ABM, AAP, LactMed, and peer-reviewed sources. This is a reference guide — not a substitute for medical advice.</p>
      </div>

      {/* COMMENTS */}
      <Section>
        <GiscusComments locale="en" term="/guides/milk-suppression-bottle-feeding" />
      </Section>
    </div>
  );
}
