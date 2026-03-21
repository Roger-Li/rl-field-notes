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
      <div style={{ fontSize: 20, color: colors.textLight, transition: "transform 0.2s", transform: isOpen ? "rotate(180deg)" : "rotate(0)" }}>&#x25BC;</div>
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

export default function TwelveHoursSleepEn() {
  const [openS, setOpenS] = useState(0);
  const [activeTab, setActiveTab] = useState("core-method");

  const tabs = [
    { id: "core-method", label: "Core Method" },
    { id: "step-by-step", label: "Step-by-Step" },
    { id: "daily-schedule", label: "Daily Schedule" },
    { id: "checklists", label: "Checklists" },
    { id: "cautions", label: "Cautions" },
  ];

  return (
    <div style={{ background: colors.bg, fontFamily: "'Source Sans 3', sans-serif", color: colors.text, minHeight: "100vh" }}>
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700;800&family=Source+Sans+3:wght@300;400;600;700&display=swap" rel="stylesheet" />

      {/* HERO */}
      <div style={{ background: `linear-gradient(135deg, ${colors.navy} 0%, #1a2240 50%, #2a2a50 100%)`, padding: "56px 24px 48px", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, opacity: 0.06, background: "repeating-linear-gradient(135deg, transparent, transparent 40px, rgba(255,255,255,0.08) 40px, rgba(255,255,255,0.08) 80px)" }}></div>
        <div style={{ position: "absolute", inset: 0, opacity: 0.04, background: "radial-gradient(circle at 30% 50%, rgba(200,160,74,0.5) 0%, transparent 50%)" }}></div>
        <div style={{ position: "relative", maxWidth: 720, margin: "0 auto" }}>
          <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", color: colors.gold, marginBottom: 16 }}>Reading Notes</div>
          <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 40, fontWeight: 800, color: "#fff", margin: 0, lineHeight: 1.15 }}>Twelve Hours&apos; Sleep by Twelve Weeks Old</h1>
          <p style={{ fontSize: 17, color: "rgba(255,255,255,0.7)", marginTop: 12, lineHeight: 1.5 }}>By Suzy Giordano &amp; Lisa Abidin — A step-by-step plan for baby sleep success</p>
          <div style={{ display: "flex", justifyContent: "center", gap: 32, marginTop: 32, flexWrap: "wrap" }}>
            <StatBox num="12 Hrs" label="Nighttime sleep" color={colors.gold} />
            <StatBox num="12 Wks" label="Target timeline" color={colors.accent} />
            <StatBox num="4 Feeds" label="Per day" color={colors.teal} />
            <StatBox num="3 Steps" label="Core method" color={colors.rose} />
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "16px 24px 0" }}>
        <AudioPlayer locale="en" contentKey="reading-notes/twelve-hours-sleep" />
      </div>

      {/* SUPPORT THE AUTHOR */}
      <Section>
        <Callout type="warn" title="Support the author">
          This is a detailed summary for personal reference — not a reproduction of the book. Please purchase the book to support the author and get the full case studies, examples, and nuance. It&apos;s a short, fast read (~176 pages) and well worth owning.
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

      {/* ===== CORE METHOD TAB ===== */}
      {activeTab === "core-method" && (
        <>
          {/* About the Author */}
          <Section>
            <SectionTitle sub="Suzy Giordano, known as 'The Baby Coach,' started sleep training babies in 1992 and has trained over 1,500 babies across the US, UK, Australia, and India.">About the Author</SectionTitle>

            <Card>
              <p style={{ fontSize: 15, lineHeight: 1.7, margin: 0 }}>Suzy Giordano began when a close friend had triplets through IVF. She offered to help, and the method was born. She started with triplets and higher-order multiples (where sleep deprivation is existential-level), then expanded to twins, and eventually singletons. She&apos;s a mother of five, including fraternal twins, and has trained over 1,500 babies across the US, UK, Australia, and India. The method has been tested on singletons, twins, triplets, babies with colic, reflux, cleft palates, and developmental challenges — and Giordano claims it has never failed.</p>
            </Card>
          </Section>

          {/* The Big Idea */}
          <Section bg={colors.card}>
            <SectionTitle color={colors.indigo} sub="The entire book rests on one core insight that reframes everything about how parents think about sleep.">The Big Idea</SectionTitle>

            <Card style={{ background: colors.indigoLight, border: `2px solid ${colors.indigo}40` }}>
              <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 20, fontWeight: 700, color: colors.indigo, marginBottom: 12, textAlign: "center" }}>Sleep is a learned skill, not an innate ability.</div>
              <p style={{ fontSize: 15, lineHeight: 1.7, margin: 0, textAlign: "center" }}>Babies need to be <em>taught</em> to fall asleep independently, just like they&apos;ll later need to be taught to walk.</p>
            </Card>

            <Card style={{ marginTop: 4 }}>
              <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 17, fontWeight: 700, color: colors.navy, marginBottom: 8 }}>The Walking Analogy</div>
              <p style={{ fontSize: 15, lineHeight: 1.7, margin: 0 }}>Giordano uses a memorable analogy: rocking a 12-week-old to sleep every single time is like carrying a 2-year-old everywhere instead of letting them learn to walk. In both cases, the child has the <em>ability</em> — but the parents are constantly &quot;fixing it&quot; for them instead of guiding them to do it on their own.</p>
            </Card>

            <Callout type="info" title="Key insight">
              The book frames sleep training not as something you do <em>to</em> your baby, but something you do <em>for</em> your whole family. The goal is a well-rested baby AND well-rested parents, which means better parenting overall.
            </Callout>
          </Section>

          {/* The Two Pillars */}
          <Section>
            <SectionTitle sub="Everything in the book flows from two interconnected principles that create a virtuous cycle.">The Two Pillars of the Method</SectionTitle>

            <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
              <FlowBox color={colors.accent} bg={colors.accentLight}><strong>Pillar 1: Structured Daytime Feeding</strong><br /><span style={{ fontSize: 14, fontWeight: 400 }}>Get enough calories into the baby during the day so they don&apos;t <em>need</em> to eat at night. This is the metabolic foundation.</span></FlowBox>
              <FlowArrow />
              <FlowBox color={colors.teal} bg={colors.tealLight}><strong>Pillar 2: Teaching Self-Soothing</strong><br /><span style={{ fontSize: 14, fontWeight: 400 }}>The baby learns to fall asleep on their own in their crib — without props like rocking, swings, pacifiers, or nursing to sleep.</span></FlowBox>
            </div>

            <Card style={{ marginTop: 24, background: colors.goldLight, border: `1px solid ${colors.gold}40` }}>
              <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 17, fontWeight: 700, color: colors.navy, marginBottom: 8 }}>The Virtuous Cycle</div>
              <p style={{ fontSize: 15, lineHeight: 1.7, margin: 0 }}>These two pillars create a virtuous cycle: a well-fed baby can sleep longer stretches, and a well-rested baby feeds more efficiently during the day.</p>
            </Card>
          </Section>

          {/* Chapter 1: Why Sleep Matters */}
          <Section bg={colors.card}>
            <SectionTitle color={colors.accent} sub="Newborns sleep 16–18 hours per day, but in short 2–4 hour bursts. As they grow, these bursts naturally consolidate into longer periods.">Chapter 1: Why Sleep Matters</SectionTitle>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: 20 }}>
              <Card accent={colors.accent}>
                <Badge color={colors.accent} bg={colors.accentLight}>For Baby</Badge>
                <p style={{ fontSize: 15, lineHeight: 1.7, margin: "8px 0 0" }}>Sleep is crucial for health, growth, and brain development. Babies need consolidated sleep to thrive — short, fragmented bursts aren&apos;t enough as they mature.</p>
              </Card>
              <Card accent={colors.teal}>
                <Badge color={colors.teal} bg={colors.tealLight}>For Parents</Badge>
                <p style={{ fontSize: 15, lineHeight: 1.7, margin: "8px 0 0" }}>Sleep deprivation makes parents more impatient, less focused, and more prone to relationship strain. Well-rested parents are better parents.</p>
              </Card>
            </div>

            <Card style={{ marginTop: 4 }}>
              <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 17, fontWeight: 700, color: colors.navy, marginBottom: 8 }}>The Survival Mode Trap</div>
              <p style={{ fontSize: 15, lineHeight: 1.7, margin: 0 }}>Many parents fall into &quot;survival mode&quot; patterns (rocking to sleep, co-sleeping out of exhaustion, feeding at every whimper) that work short-term but create dependencies that are harder to break later. Giordano compares the pre-training period to the days before starting a diet: every time you give in to bad habits, you make it harder to establish good ones later.</p>
            </Card>
          </Section>

          {/* Chapter 2: Prerequisites */}
          <Section>
            <SectionTitle sub="The method is called '12 Hours by 12 Weeks' and it's built on simplicity and consistency. But three prerequisites must be met before starting.">Chapter 2: The Basics of the Plan</SectionTitle>

            <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 20, fontWeight: 700, color: colors.navy, marginBottom: 16 }}>Prerequisites — All Three Must Be Met</div>

            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", background: colors.card, borderRadius: 12, overflow: "hidden", boxShadow: "0 2px 12px rgba(30,42,74,0.04)" }}>
                <thead>
                  <tr style={{ background: colors.navy }}>
                    <th style={{ padding: "14px 20px", textAlign: "left", color: "#fff", fontFamily: "'Source Sans 3', sans-serif", fontSize: 14, fontWeight: 700, letterSpacing: 0.5 }}>Requirement</th>
                    <th style={{ padding: "14px 20px", textAlign: "left", color: "#fff", fontFamily: "'Source Sans 3', sans-serif", fontSize: 14, fontWeight: 700, letterSpacing: 0.5 }}>Threshold</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: `1px solid ${colors.border}` }}>
                    <td style={{ padding: "14px 20px", fontWeight: 700, fontSize: 15, color: colors.navy }}>Minimum Weight</td>
                    <td style={{ padding: "14px 20px", fontSize: 15, color: colors.text }}>9 pounds</td>
                  </tr>
                  <tr style={{ borderBottom: `1px solid ${colors.border}`, background: colors.accentLight + "40" }}>
                    <td style={{ padding: "14px 20px", fontWeight: 700, fontSize: 15, color: colors.navy }}>Daily Intake</td>
                    <td style={{ padding: "14px 20px", fontSize: 15, color: colors.text }}>At least 24 ounces of milk/formula per day</td>
                  </tr>
                  <tr>
                    <td style={{ padding: "14px 20px", fontWeight: 700, fontSize: 15, color: colors.navy }}>Minimum Age</td>
                    <td style={{ padding: "14px 20px", fontSize: 15, color: colors.text }}>4 weeks (singletons), 8 weeks (twins), 12 weeks (triplets) — adjusted age</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <Card style={{ marginTop: 20, background: colors.goldLight, border: `1px solid ${colors.gold}40` }}>
              <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 17, fontWeight: 700, color: colors.navy, marginBottom: 8 }}>Why These Thresholds?</div>
              <p style={{ fontSize: 15, lineHeight: 1.7, margin: 0 }}>These aren&apos;t arbitrary. A baby under 9 lbs may not have the caloric reserves to go long stretches without eating. The age minimums exist because premature babies (common with multiples) need more time for digestive and neurological systems to mature. <strong>Always confirm with your pediatrician before starting.</strong></p>
            </Card>

            <p style={{ fontSize: 15, lineHeight: 1.7, color: colors.textLight, marginTop: 16 }}>Giordano recommends beginning the process as early as possible — ideally around 2 weeks old for getting into the feeding rhythm, even though formal sleep training doesn&apos;t start until the prerequisites are met.</p>
          </Section>
        </>
      )}

      {/* ===== STEP-BY-STEP TAB ===== */}
      {activeTab === "step-by-step" && (
        <>
          <Section>
            <SectionTitle sub="The method consists of three sequential steps. Master each one before moving to the next. Click each card to expand the full details.">The Three Steps</SectionTitle>

            {[
              {
                num: "1",
                title: "Establish the 4-Hour Feeding Schedule",
                subtitle: "The metabolic foundation — without this, nothing else works",
                color: colors.accent,
                bg: colors.accentLight,
                icon: "\uD83C\uDF7C",
                details: (
                  <div>
                    <p><strong>How it works:</strong></p>
                    <ul style={{ paddingLeft: 20, margin: "8px 0" }}>
                      <li>Divide the day into two 12-hour blocks (e.g., 7 AM–7 PM = day, 7 PM–7 AM = night)</li>
                      <li>Schedule <strong>4 feedings</strong> during the daytime block, spaced <strong>4 hours apart</strong></li>
                      <li>Example schedule: <strong>7:00 AM &#x2192; 11:00 AM &#x2192; 3:00 PM &#x2192; 7:00 PM</strong></li>
                      <li>You can flex by about 15 minutes in either direction, using the previous feed as the anchor</li>
                    </ul>

                    <Card style={{ background: colors.indigoLight, border: `1px solid ${colors.indigo}40`, marginTop: 16 }}>
                      <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 16, fontWeight: 700, color: colors.indigo, marginBottom: 8 }}>Why 4 Hours Specifically?</div>
                      <p style={{ fontSize: 14, lineHeight: 1.7, margin: 0 }}>This is one of the more clever insights in the book. When babies eat small, frequent meals (every 1.5–2 hours), they never get truly hungry, so they never take a full feeding. By stretching to 4 hours, the baby arrives at each feeding genuinely hungry and eats a <em>larger volume</em>. This front-loads their caloric intake into the daytime — which is the key to dropping night feeds.</p>
                    </Card>

                    <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 16, fontWeight: 700, color: colors.navy, margin: "20px 0 12px" }}>The Transition (This Won&apos;t Happen Overnight)</div>
                    <ul style={{ paddingLeft: 20, margin: "8px 0" }}>
                      <li>If your baby currently eats every 2–3 hours, you gradually stretch the intervals</li>
                      <li>Each day, try to push feedings a little closer to the 4-hour target</li>
                      <li>During Step 1, focus exclusively on daytime feeds</li>
                      <li>Let the baby wake naturally at night and feed them whenever they wake up</li>
                      <li>Use the &quot;daytime toolbox&quot; (see below) to bridge the gap when baby fusses before the next feeding</li>
                    </ul>

                    <div style={{ background: colors.roseLight, padding: "14px 18px", borderRadius: 10, marginTop: 16, borderLeft: `4px solid ${colors.rose}` }}>
                      <div style={{ fontWeight: 700, fontSize: 14, color: colors.rose, marginBottom: 4 }}>Important Note for Breastfeeding Moms</div>
                      <p style={{ fontSize: 14, lineHeight: 1.7, margin: 0 }}>Giordano recommends using expressed breast milk in bottles during training so you can measure exact ounces. Going 12 hours overnight without nursing or pumping can reduce milk supply. Many lactation consultants recommend keeping at least one night feed or pumping session until 6–10 months old. You can still achieve great sleep results with one remaining night feed.</p>
                    </div>
                  </div>
                ),
              },
              {
                num: "2",
                title: "Gradually Eliminate Night Feedings",
                subtitle: "Metabolic retraining — done gradually, not cold turkey",
                color: colors.teal,
                bg: colors.tealLight,
                icon: "\uD83C\uDF19",
                details: (
                  <div>
                    <p><strong>The Method:</strong></p>
                    <ol style={{ paddingLeft: 20, margin: "8px 0" }}>
                      <li>Start with the <strong>second</strong> night feeding (it&apos;s usually the one where the baby drinks the least)</li>
                      <li>Reduce the amount by <strong>half an ounce</strong> every three nights</li>
                      <li>If the baby naturally drinks less than the target amount, go with the lower amount and hold it for three nights</li>
                      <li>Once the second night feeding is eliminated, repeat the process for the first night feeding</li>
                      <li>The gradual reduction trains the baby&apos;s body to shift those calories to daytime</li>
                    </ol>

                    <Card style={{ background: colors.accentLight, border: `1px solid ${colors.accent}40`, marginTop: 16 }}>
                      <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 16, fontWeight: 700, color: colors.accent, marginBottom: 8 }}>Example Timeline</div>
                      <ul style={{ paddingLeft: 20, margin: "8px 0", fontSize: 14, lineHeight: 1.7 }}>
                        <li>Night feeding is currently 3 oz &#x2192; reduce to 2.5 oz for 3 nights &#x2192; 2 oz for 3 nights &#x2192; 1.5 oz for 3 nights &#x2192; eliminate</li>
                        <li>If baby only drinks 1.5 oz when you offer 2.5, drop to 1.5 immediately and hold for 3 nights</li>
                        <li>Total timeline: roughly 2–3 weeks per feeding</li>
                      </ul>
                    </Card>

                    <Card style={{ background: colors.goldLight, border: `1px solid ${colors.gold}40`, marginTop: 4 }}>
                      <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 16, fontWeight: 700, color: colors.navy, marginBottom: 8 }}>Why This Works</div>
                      <p style={{ fontSize: 14, lineHeight: 1.7, margin: 0 }}>It&apos;s basically metabolic retraining. The baby&apos;s body learns to expect (and store) more calories during the day and stops signaling hunger at night.</p>
                    </Card>
                  </div>
                ),
              },
              {
                num: "3",
                title: "Teach Self-Soothing",
                subtitle: "The 'Limited Crying Solution' — a middle ground approach",
                color: colors.indigo,
                bg: colors.indigoLight,
                icon: "\uD83D\uDCA4",
                details: (
                  <div>
                    <p>Giordano&apos;s signature technique. She deliberately positions it as a middle ground between &quot;no crying ever&quot; (unrealistic for most families) and traditional &quot;cry it out&quot; (emotionally brutal for many parents).</p>

                    <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 16, fontWeight: 700, color: colors.navy, margin: "16px 0 12px" }}>The Process</div>
                    <ol style={{ paddingLeft: 20, margin: "8px 0" }}>
                      <li>Do your pre-sleep routine (bath, diaper, feeding, etc.)</li>
                      <li>Put the baby in the crib <strong>awake</strong> (this is critical — not drowsy, not asleep, <em>awake</em>)</li>
                      <li>Say goodnight and leave the room, closing the door</li>
                      <li>If baby doesn&apos;t cry — you&apos;re done. Celebrate.</li>
                      <li>If baby cries: <strong>wait 3–5 minutes</strong> before going in</li>
                      <li>If the baby stops crying during that interval, <strong>restart the timer</strong> (the pause in crying shows self-soothing is happening)</li>
                      <li>When you go in: <strong>do not pick the baby up.</strong> Soothe verbally, pat gently, but baby stays in the crib</li>
                      <li>Leave when the baby calms. If crying resumes, repeat the 3–5 minute wait</li>
                      <li>If crying escalates significantly, you can comfort the baby — but keep them in the crib</li>
                    </ol>

                    <Card style={{ background: colors.tealLight, border: `1px solid ${colors.teal}40`, marginTop: 16, textAlign: "center" }}>
                      <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 18, fontWeight: 700, color: colors.teal, fontStyle: "italic" }}>&quot;I cannot fix it for you, but I will go through it with you by your side.&quot;</div>
                    </Card>

                    <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 16, fontWeight: 700, color: colors.navy, margin: "20px 0 12px" }}>Key Principles</div>
                    <ul style={{ paddingLeft: 20, margin: "8px 0" }}>
                      <li>The brief waiting period teaches the baby that they CAN self-soothe — you&apos;re giving them the <em>opportunity</em> to discover this skill</li>
                      <li>Extended crying is usually counterproductive; it exhausts both baby and parent without teaching anything</li>
                      <li>Consistency is everything. If you sometimes pick them up after 5 minutes and sometimes don&apos;t, you&apos;ve just taught them that crying harder/longer eventually works</li>
                      <li>Most babies learn within a few days to a week</li>
                    </ul>
                  </div>
                ),
              },
            ].map((s, i) => (
              <SCard key={i} {...s} isOpen={openS === i} toggle={() => setOpenS(openS === i ? -1 : i)} />
            ))}
          </Section>

          {/* Chapter 4: Naps and Toolbox */}
          <Section bg={colors.card}>
            <SectionTitle color={colors.teal} sub="How to structure daytime sleep and what to do when baby fusses between feedings.">Chapter 4: Naps &amp; the Daytime Toolbox</SectionTitle>

            <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 20, fontWeight: 700, color: colors.navy, marginBottom: 16 }}>Nap Structure</div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16, marginBottom: 20 }}>
              <div style={{ padding: 20, background: colors.accentLight, borderRadius: 14, textAlign: "center" }}>
                <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 28, fontWeight: 700, color: colors.accent }}>~1 hr</div>
                <div style={{ fontSize: 14, color: colors.textLight, marginTop: 4 }}>Morning nap (mid-morning)</div>
              </div>
              <div style={{ padding: 20, background: colors.tealLight, borderRadius: 14, textAlign: "center" }}>
                <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 28, fontWeight: 700, color: colors.teal }}>~2 hrs</div>
                <div style={{ fontSize: 14, color: colors.textLight, marginTop: 4 }}>Afternoon nap</div>
              </div>
              <div style={{ padding: 20, background: colors.goldLight, borderRadius: 14, textAlign: "center" }}>
                <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 28, fontWeight: 700, color: colors.gold }}>~3 hrs</div>
                <div style={{ fontSize: 14, color: colors.textLight, marginTop: 4 }}>Total daytime sleep</div>
              </div>
            </div>

            <Callout type="info" title="Note from other experts">
              Many sleep consultants consider 2 naps insufficient for a 12-week-old. Most babies this age need 3–4 naps. If your baby seems overtired on 2 naps, trust your instincts and add a third short catnap before the evening routine.
            </Callout>

            <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 20, fontWeight: 700, color: colors.navy, margin: "32px 0 16px" }}>The &quot;Daytime Toolbox&quot;</div>
            <p style={{ fontSize: 15, lineHeight: 1.7, color: colors.textLight, marginBottom: 20 }}>One of the most practically useful parts of the book. The toolbox is a collection of strategies to bridge the gap when baby fusses between scheduled feedings.</p>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: 16 }}>
              {[
                { icon: "\uD83D\uDC76", name: "Pacifier", desc: "Useful for non-nutritive sucking needs, but caution against over-reliance" },
                { icon: "\uD83E\uDE91", name: "Bouncy Seat / Vibrating Chair", desc: "For soothing during fussy periods, NOT for regular sleep" },
                { icon: "\uD83C\uDFA0", name: "Swing", desc: "Reserved for truly inconsolable moments (e.g., colic, gas pain), not routine use" },
                { icon: "\uD83E\uDDF7", name: "Diaper Change", desc: "Sometimes the distraction of a change is enough to reset a fussy baby" },
                { icon: "\uD83C\uDF33", name: "Change of Scenery", desc: "Moving to a different room, going outside" },
                { icon: "\uD83D\uDCA7", name: "Gripe Water", desc: "For gas/digestive discomfort" },
                { icon: "\uD83D\uDCAA", name: "Tummy Time", desc: "Serves double duty as developmental activity and distraction" },
                { icon: "\uD83D\uDEB6", name: "Walking / Bouncing", desc: "Physical movement to soothe" },
              ].map((item, i) => (
                <div key={i} style={{ display: "flex", gap: 14, padding: 16, background: colors.card, borderRadius: 12, border: `1px solid ${colors.border}` }}>
                  <div style={{ fontSize: 24, flexShrink: 0 }}>{item.icon}</div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 14, color: colors.navy }}>{item.name}</div>
                    <div style={{ fontSize: 13, color: colors.textLight, marginTop: 4, lineHeight: 1.5 }}>{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            <Card style={{ marginTop: 20, background: colors.roseLight, border: `1px solid ${colors.rose}40` }}>
              <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 16, fontWeight: 700, color: colors.rose, marginBottom: 8 }}>Critical Rule</div>
              <p style={{ fontSize: 14, lineHeight: 1.7, margin: 0 }}>These are <em>tools</em>, not habits. Use them situationally when the baby is truly distressed, not as default soothing mechanisms.</p>
            </Card>
          </Section>

          {/* Chapter 5: Sleep Environment */}
          <Section>
            <SectionTitle sub="Creating the right conditions for sleep success.">Chapter 5: The Sleep Environment</SectionTitle>

            <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 20, fontWeight: 700, color: colors.navy, marginBottom: 16 }}>Creating the Ideal Setup</div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: 16 }}>
              {[
                { icon: "\uD83D\uDECF\uFE0F", title: "Consistent Sleep Location", desc: "Baby should sleep in their own crib for all sleep" },
                { icon: "\uD83C\uDF11", title: "Dark Room", desc: "Use blackout curtains. Darkness signals sleep" },
                { icon: "\uD83D\uDD0A", title: "White Noise", desc: "Can help, but shouldn't be so loud it becomes a prop" },
                { icon: "\uD83C\uDF21\uFE0F", title: "Temperature", desc: "Comfortable room temperature (68–72\u00B0F / 20–22\u00B0C)" },
                { icon: "\u2600\uFE0F", title: "Day vs. Night Distinction", desc: "Day: bright house, normal noise levels. Evening: dim lights, reduce stimulation" },
              ].map((item, i) => (
                <div key={i} style={{ display: "flex", gap: 14, padding: 16, background: colors.card, borderRadius: 12, border: `1px solid ${colors.border}` }}>
                  <div style={{ fontSize: 24, flexShrink: 0 }}>{item.icon}</div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 14, color: colors.navy }}>{item.title}</div>
                    <div style={{ fontSize: 13, color: colors.textLight, marginTop: 4, lineHeight: 1.5 }}>{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 20, fontWeight: 700, color: colors.navy, margin: "32px 0 16px" }}>Bedtime Routine</div>
            <Card>
              <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                <FlowBox color={colors.accent} bg={colors.accentLight}>Warm bath</FlowBox>
                <FlowArrow />
                <FlowBox color={colors.teal} bg={colors.tealLight}>Diaper change &#x2192; Pajamas</FlowBox>
                <FlowArrow />
                <FlowBox color={colors.indigo} bg={colors.indigoLight}>Short feeding</FlowBox>
                <FlowArrow />
                <FlowBox color={colors.gold} bg={colors.goldLight}>Place in crib <strong>awake</strong></FlowBox>
              </div>
              <p style={{ fontSize: 14, lineHeight: 1.7, color: colors.textLight, marginTop: 16, textAlign: "center" }}>Keep it brief, predictable, and calming. The same sequence every single night provides a clear signal that sleep is coming. Both parents should be on the same page and follow the same routine.</p>
            </Card>

            <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 20, fontWeight: 700, color: colors.navy, margin: "32px 0 16px" }}>Sleepy Cues to Watch For</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 12 }}>
              {[
                { icon: "\uD83E\uDD71", label: "Yawning" },
                { icon: "\uD83D\uDC40", label: "Rubbing eyes" },
                { icon: "\uD83D\uDE14", label: "Becoming less active" },
                { icon: "\uD83D\uDE2D", label: "Fussiness that escalates" },
                { icon: "\uD83D\uDE36", label: "Staring into space" },
              ].map((item, i) => (
                <div key={i} style={{ background: colors.card, borderRadius: 14, padding: 16, textAlign: "center", border: `1px solid ${colors.border}` }}>
                  <div style={{ fontSize: 28 }}>{item.icon}</div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: colors.navy, marginTop: 8 }}>{item.label}</div>
                </div>
              ))}
            </div>
            <p style={{ fontSize: 14, lineHeight: 1.7, color: colors.textLight, marginTop: 16, textAlign: "center" }}>When you see these cues, it&apos;s time to start the bedtime/naptime routine. Missing the window leads to overtiredness, which paradoxically makes it <em>harder</em> to fall asleep.</p>
          </Section>

          {/* Chapter 6: Maintaining the Schedule */}
          <Section bg={colors.card}>
            <SectionTitle color={colors.gold} sub="Think of the new routine as Jell-O setting in the fridge. It needs time to solidify before you can mess with it.">Chapter 6: The Jell-O Analogy</SectionTitle>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 20 }}>
              <Card accent={colors.rose}>
                <Badge color={colors.rose} bg={colors.roseLight}>First 6 Months: Be Rigid</Badge>
                <ul style={{ paddingLeft: 20, margin: "8px 0", fontSize: 14, lineHeight: 1.7 }}>
                  <li>Maintain the schedule as consistently as possible</li>
                  <li>When disruptions happen (doctor&apos;s appointment, travel), stay as close to the feeding/sleep cycles as you can</li>
                  <li>After a disruption, get back on schedule as quickly as possible</li>
                </ul>
              </Card>
              <Card accent={colors.green}>
                <Badge color={colors.green} bg={colors.greenLight}>After 6 Months: Introduce Flexibility</Badge>
                <ul style={{ paddingLeft: 20, margin: "8px 0", fontSize: 14, lineHeight: 1.7 }}>
                  <li>Once the routine is firmly established, small deviations won&apos;t derail everything</li>
                  <li>Sleeping in on a weekend, staying out a bit later for an event — these become manageable</li>
                  <li>Keep deviations to one day max to prevent the routine from unraveling</li>
                </ul>
              </Card>
            </div>

            <Card style={{ marginTop: 4 }}>
              <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 17, fontWeight: 700, color: colors.navy, marginBottom: 8 }}>Travel and Vacations</div>
              <ul style={{ paddingLeft: 20, margin: "8px 0", fontSize: 15, lineHeight: 1.7 }}>
                <li>Bring familiar items: portable crib, favorite sleep toy/blanket, white noise machine</li>
                <li>Maintain bedtime rituals even in unfamiliar environments</li>
                <li>Expect some regression — the baby may wake up in a new environment</li>
                <li>Upon returning home, get back on schedule immediately</li>
              </ul>
            </Card>
          </Section>

          {/* Chapter 7: Special Situations */}
          <Section>
            <SectionTitle sub="The method was literally designed for multiples — this is its origin story.">Chapter 7: Special Situations</SectionTitle>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: 20 }}>
              <Card accent={colors.accent}>
                <Badge color={colors.accent} bg={colors.accentLight}>Reflux</Badge>
                <ul style={{ paddingLeft: 20, margin: "8px 0", fontSize: 14, lineHeight: 1.7 }}>
                  <li>Position babies at an incline using bouncy seats</li>
                  <li>The core method remains the same — structured feeding, gradual night weaning, self-soothing</li>
                  <li>As reflux improves (usually by 4–6 months), transition to flat sleeping</li>
                </ul>
              </Card>
              <Card accent={colors.teal}>
                <Badge color={colors.teal} bg={colors.tealLight}>Colic</Badge>
                <ul style={{ paddingLeft: 20, margin: "8px 0", fontSize: 14, lineHeight: 1.7 }}>
                  <li>The toolbox becomes even more important during colicky periods</li>
                  <li>Maintain the structure as much as possible, but accept that colic periods will be harder</li>
                  <li>Colic typically peaks around 6 weeks and resolves by 3–4 months</li>
                </ul>
              </Card>
              <Card accent={colors.gold}>
                <Badge color={colors.gold} bg={colors.goldLight}>Twins &amp; Multiples</Badge>
                <ul style={{ paddingLeft: 20, margin: "8px 0", fontSize: 14, lineHeight: 1.7 }}>
                  <li>Train both babies simultaneously on the same schedule</li>
                  <li>Same feeding times, same bedtime, same routine</li>
                </ul>
              </Card>
              <Card accent={colors.rose}>
                <Badge color={colors.rose} bg={colors.roseLight}>Special Needs</Badge>
                <ul style={{ paddingLeft: 20, margin: "8px 0", fontSize: 14, lineHeight: 1.7 }}>
                  <li>The method may take longer and require more patience</li>
                  <li>Work closely with your pediatrician to adapt the specifics</li>
                </ul>
              </Card>
            </div>
          </Section>

          {/* Chapter 8: Challenges and Regressions */}
          <Section bg={colors.card}>
            <SectionTitle color={colors.rose} sub="These are the most common hurdles families face — and how to handle each one.">Chapter 8: Challenges &amp; Sleep Regressions</SectionTitle>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: 20 }}>
              <Card accent={colors.accent}>
                <Badge color={colors.accent} bg={colors.accentLight}>Sleep Regressions</Badge>
                <p style={{ fontSize: 14, lineHeight: 1.7, margin: "8px 0 0" }}>Periods when a baby who was sleeping well suddenly starts waking up again. Typically coincide with developmental milestones (rolling over, sitting up, teething). The #1 rule: <strong>stay consistent.</strong> Don&apos;t abandon the plan because of a regression. Regressions are temporary.</p>
              </Card>
              <Card accent={colors.gold}>
                <Badge color={colors.gold} bg={colors.goldLight}>Growth Spurts</Badge>
                <p style={{ fontSize: 14, lineHeight: 1.7, margin: "8px 0 0" }}>Baby may seem hungrier during the day — increase daytime feeding volume, not frequency. Don&apos;t reintroduce night feeds that have already been eliminated. Growth spurts typically last 2–3 days.</p>
              </Card>
              <Card accent={colors.teal}>
                <Badge color={colors.teal} bg={colors.tealLight}>Teething</Badge>
                <p style={{ fontSize: 14, lineHeight: 1.7, margin: "8px 0 0" }}>Use appropriate pain relief as recommended by your pediatrician. Maintain the routine — comfort the baby but don&apos;t create new sleep associations.</p>
              </Card>
              <Card accent={colors.rose}>
                <Badge color={colors.rose} bg={colors.roseLight}>Illness</Badge>
                <p style={{ fontSize: 14, lineHeight: 1.7, margin: "8px 0 0" }}>When a baby is sick, comfort takes priority over schedule. Once recovered, get back on schedule quickly.</p>
              </Card>
            </div>
          </Section>
        </>
      )}

      {/* ===== DAILY SCHEDULE TAB ===== */}
      {activeTab === "daily-schedule" && (
        <>
          <Section>
            <SectionTitle sub="This is the target schedule you work toward gradually. Don't try to implement it all at once.">Sample Daily Schedule (7 AM – 7 PM Window)</SectionTitle>

            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", background: colors.card, borderRadius: 12, overflow: "hidden", boxShadow: "0 2px 12px rgba(30,42,74,0.06)" }}>
                <thead>
                  <tr style={{ background: `linear-gradient(135deg, ${colors.navy}, #2a3660)` }}>
                    <th style={{ padding: "14px 20px", textAlign: "left", color: "#fff", fontFamily: "'Source Sans 3', sans-serif", fontSize: 14, fontWeight: 700, letterSpacing: 0.5, width: "30%" }}>Time</th>
                    <th style={{ padding: "14px 20px", textAlign: "left", color: "#fff", fontFamily: "'Source Sans 3', sans-serif", fontSize: 14, fontWeight: 700, letterSpacing: 0.5 }}>Activity</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { time: "7:00 AM", activity: "Wake up, first feeding", type: "feed" },
                    { time: "8:00–9:00 AM", activity: "Awake / play time", type: "play" },
                    { time: "9:00–10:00 AM", activity: "Morning nap (~1 hour)", type: "sleep" },
                    { time: "10:00–11:00 AM", activity: "Awake / play time", type: "play" },
                    { time: "11:00 AM", activity: "Second feeding", type: "feed" },
                    { time: "12:00–2:00 PM", activity: "Afternoon nap (~2 hours)", type: "sleep" },
                    { time: "2:00–3:00 PM", activity: "Awake / play time", type: "play" },
                    { time: "3:00 PM", activity: "Third feeding", type: "feed" },
                    { time: "3:30–5:30 PM", activity: "Awake / play time", type: "play" },
                    { time: "5:30–6:00 PM", activity: "Optional short catnap", type: "sleep" },
                    { time: "6:00–6:45 PM", activity: "Bedtime routine (bath, pajamas, etc.)", type: "routine" },
                    { time: "7:00 PM", activity: "Fourth feeding, place in crib awake", type: "feed" },
                    { time: "7:00 PM–7:00 AM", activity: "Sleep (12 hours)", type: "night" },
                  ].map((row, i) => {
                    const bgMap: Record<string, string> = {
                      feed: colors.accentLight + "60",
                      sleep: colors.indigoLight + "60",
                      play: "transparent",
                      routine: colors.goldLight + "80",
                      night: colors.navy + "0D",
                    };
                    const iconMap: Record<string, string> = {
                      feed: "\uD83C\uDF7C",
                      sleep: "\uD83D\uDCA4",
                      play: "\uD83C\uDFB2",
                      routine: "\uD83D\uDEC1",
                      night: "\uD83C\uDF19",
                    };
                    return (
                      <tr key={i} style={{ borderBottom: `1px solid ${colors.border}`, background: bgMap[row.type] || "transparent" }}>
                        <td style={{ padding: "12px 20px", fontWeight: 700, fontSize: 14, color: colors.navy, fontFamily: "'Source Sans 3', sans-serif" }}>{row.time}</td>
                        <td style={{ padding: "12px 20px", fontSize: 14, color: colors.text }}>
                          <span style={{ marginRight: 8 }}>{iconMap[row.type]}</span>
                          {row.activity}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <Card style={{ marginTop: 24, background: colors.goldLight, border: `1px solid ${colors.gold}40` }}>
              <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 17, fontWeight: 700, color: colors.navy, marginBottom: 8 }}>Remember</div>
              <p style={{ fontSize: 15, lineHeight: 1.7, margin: 0 }}>This is the <em>target</em> schedule. You work toward this gradually, not all at once. The feeding schedule (Step 1) comes first, then night weaning (Step 2), then self-soothing (Step 3).</p>
            </Card>
          </Section>

          {/* Visual Day/Night Block */}
          <Section bg={colors.card}>
            <SectionTitle color={colors.accent} sub="The entire method revolves around dividing the 24-hour day into two equal blocks.">The 12/12 Framework</SectionTitle>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
              <Card style={{ background: `linear-gradient(135deg, ${colors.goldLight}, #fff)`, border: `2px solid ${colors.gold}40` }}>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 36 }}>{"\u2600\uFE0F"}</div>
                  <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 22, fontWeight: 700, color: colors.navy, marginTop: 8 }}>Daytime Block</div>
                  <div style={{ fontSize: 15, color: colors.gold, fontWeight: 700, marginTop: 4 }}>7:00 AM – 7:00 PM</div>
                  <div style={{ marginTop: 16, textAlign: "left" }}>
                    <p style={{ fontSize: 14, lineHeight: 1.7, color: colors.text }}><strong>4 feedings</strong> spaced 4 hours apart</p>
                    <p style={{ fontSize: 14, lineHeight: 1.7, color: colors.text }}><strong>~3 hours</strong> of naps</p>
                    <p style={{ fontSize: 14, lineHeight: 1.7, color: colors.text }}><strong>24+ oz</strong> of milk/formula</p>
                    <p style={{ fontSize: 14, lineHeight: 1.7, color: colors.text }}>Active play, tummy time, stimulation</p>
                  </div>
                </div>
              </Card>
              <Card style={{ background: `linear-gradient(135deg, ${colors.navy}15, ${colors.indigoLight})`, border: `2px solid ${colors.indigo}30` }}>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 36 }}>{"\uD83C\uDF19"}</div>
                  <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 22, fontWeight: 700, color: colors.navy, marginTop: 8 }}>Nighttime Block</div>
                  <div style={{ fontSize: 15, color: colors.indigo, fontWeight: 700, marginTop: 4 }}>7:00 PM – 7:00 AM</div>
                  <div style={{ marginTop: 16, textAlign: "left" }}>
                    <p style={{ fontSize: 14, lineHeight: 1.7, color: colors.text }}><strong>0 feedings</strong> (goal)</p>
                    <p style={{ fontSize: 14, lineHeight: 1.7, color: colors.text }}><strong>12 hours</strong> uninterrupted sleep</p>
                    <p style={{ fontSize: 14, lineHeight: 1.7, color: colors.text }}>Dark room, minimal stimulation</p>
                    <p style={{ fontSize: 14, lineHeight: 1.7, color: colors.text }}>Baby self-soothes back to sleep</p>
                  </div>
                </div>
              </Card>
            </div>

            <Card style={{ marginTop: 20, background: colors.accentLight, border: `1px solid ${colors.accent}40` }}>
              <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 17, fontWeight: 700, color: colors.accent, marginBottom: 8 }}>The Core Logic</div>
              <p style={{ fontSize: 15, lineHeight: 1.7, margin: 0 }}>By concentrating all caloric intake into the 12-hour daytime window, the baby&apos;s body has no metabolic reason to wake for food at night. Combined with the self-soothing skill, the baby can sleep through any natural arousals during the 12-hour nighttime window.</p>
            </Card>
          </Section>

          {/* Gradual Night Weaning Timeline */}
          <Section>
            <SectionTitle sub="A visual roadmap showing how night feeds gradually disappear over time.">Night Weaning Timeline</SectionTitle>

            <TimelineItem age="Wk 1" title="Establish Daytime Rhythm" desc="Focus on getting closer to the 4-hour feeding schedule during the day. Feed on demand at night — don't restrict night feeds yet." color={colors.accent} />
            <TimelineItem age="Wk 2–3" title="Solidify 4 Daytime Feeds" desc="Baby should be consistently taking 4 feeds during the day, 4 hours apart, totaling 24+ oz. Night feeds continue as needed." color={colors.teal} />
            <TimelineItem age="Wk 3–5" title="Eliminate Second Night Feed" desc="Identify the night feed where baby drinks least. Reduce by 0.5 oz every 3 nights until eliminated. Usually takes 2–3 weeks." color={colors.indigo} />
            <TimelineItem age="Wk 5–8" title="Eliminate First Night Feed" desc="Repeat the gradual reduction process for the remaining night feed. Baby's body has been metabolically retrained to expect daytime calories." color={colors.gold} />
            <TimelineItem age="Wk 8–12" title="Teach Self-Soothing" desc="With night feeds gone, begin the Limited Crying Solution. Put baby in crib awake, wait 3–5 minutes before checking. Most babies learn within days." color={colors.rose} />
            <TimelineItem age="12 Wks" title="Goal: 12 Hours of Sleep" desc="Baby sleeps 7 PM to 7 AM without waking for food. Self-soothes through natural sleep cycle arousals. Parents reclaim their evenings and nights." color={colors.green} />
          </Section>
        </>
      )}

      {/* ===== CHECKLISTS TAB ===== */}
      {activeTab === "checklists" && (
        <>
          {/* Pre-Training Readiness */}
          <Section>
            <SectionTitle sub="Make sure all of these are in place before you begin.">Pre-Training Readiness Checklist</SectionTitle>

            <Card accent={colors.accent}>
              <CheckItem>Baby weighs at least 9 lbs</CheckItem>
              <CheckItem>Baby consumes at least 24 oz per day</CheckItem>
              <CheckItem>Baby meets minimum age: 4 weeks (singleton) / 8 weeks (twins) / 12 weeks (triplets)</CheckItem>
              <CheckItem>Pediatrician has given the green light</CheckItem>
              <CheckItem>Both parents have read the method and are on the same page</CheckItem>
              <CheckItem>You&apos;re mentally prepared to commit for at least 2–3 weeks</CheckItem>
              <CheckItem>Nursery / sleep space is set up (crib, blackout curtains, appropriate temperature)</CheckItem>
            </Card>
          </Section>

          {/* Equipment & Supplies */}
          <Section bg={colors.card}>
            <SectionTitle color={colors.teal} sub="Gather these before you start so you're not scrambling mid-training.">Equipment &amp; Supplies Checklist</SectionTitle>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
              <Card accent={colors.teal}>
                <Badge color={colors.teal} bg={colors.tealLight}>Sleep Essentials</Badge>
                <CheckItem>Crib in a dedicated sleep space</CheckItem>
                <CheckItem>Blackout curtains</CheckItem>
                <CheckItem>White noise machine (optional but helpful)</CheckItem>
                <CheckItem>Portable crib or travel crib (for maintaining routine away from home)</CheckItem>
              </Card>
              <Card accent={colors.accent}>
                <Badge color={colors.accent} bg={colors.accentLight}>Feeding Supplies</Badge>
                <CheckItem>Bottles (even if breastfeeding — for measured expressed milk during training)</CheckItem>
                <CheckItem>Breast pump (if breastfeeding)</CheckItem>
                <CheckItem>Sleep log / tracking chart</CheckItem>
              </Card>
              <Card accent={colors.gold}>
                <Badge color={colors.gold} bg={colors.goldLight}>Toolbox Items</Badge>
                <CheckItem>Bouncy seat / vibrating chair (for toolbox)</CheckItem>
                <CheckItem>Swing (for emergency soothing, not routine use)</CheckItem>
                <CheckItem>Pacifiers (use judiciously)</CheckItem>
                <CheckItem>Gripe water (for gas)</CheckItem>
              </Card>
            </div>
          </Section>

          {/* Step 1 Checklist */}
          <Section>
            <SectionTitle sub="The feeding schedule is the foundation of everything.">Step 1 Checklist: Daytime Feeding Schedule</SectionTitle>

            <Card accent={colors.accent} style={{ background: colors.accentLight + "40" }}>
              <CheckItem>Choose your 12-hour daytime window (e.g., 7 AM–7 PM)</CheckItem>
              <CheckItem>Map out 4 feeding times, 4 hours apart</CheckItem>
              <CheckItem>Start gradually stretching from current feeding interval toward 4 hours</CheckItem>
              <CheckItem>Use toolbox items to bridge gaps when baby fusses before next feeding</CheckItem>
              <CheckItem>Track ounces consumed at each feeding</CheckItem>
              <CheckItem>Confirm baby is getting at least 24 oz during the 12-hour day window</CheckItem>
              <CheckItem>Let baby wake naturally at night and feed on demand (for now)</CheckItem>
            </Card>
          </Section>

          {/* Step 2 Checklist */}
          <Section bg={colors.card}>
            <SectionTitle color={colors.teal} sub="Gradual reduction is the key — never go cold turkey.">Step 2 Checklist: Eliminating Night Feedings</SectionTitle>

            <Card accent={colors.teal} style={{ background: colors.tealLight + "40" }}>
              <CheckItem>Identify which night feeding the baby takes the least at (start there)</CheckItem>
              <CheckItem>Reduce that feeding by 0.5 oz</CheckItem>
              <CheckItem>Hold the new amount for 3 consecutive nights</CheckItem>
              <CheckItem>Continue reducing by 0.5 oz every 3 nights until eliminated</CheckItem>
              <CheckItem>If baby voluntarily drinks less than target, follow their lead</CheckItem>
              <CheckItem>Once the first night feed is gone, repeat for the remaining night feed</CheckItem>
              <CheckItem>Monitor that daytime intake stays at or above 24 oz to compensate</CheckItem>
            </Card>
          </Section>

          {/* Step 3 Checklist */}
          <Section>
            <SectionTitle sub="Consistency is everything — both parents, every sleep time, every day.">Step 3 Checklist: Teaching Self-Soothing</SectionTitle>

            <Card accent={colors.indigo} style={{ background: colors.indigoLight + "40" }}>
              <CheckItem>Establish a short, consistent bedtime routine (5–15 minutes)</CheckItem>
              <CheckItem>Place baby in crib awake (not drowsy, not asleep)</CheckItem>
              <CheckItem>Say goodnight and leave the room</CheckItem>
              <CheckItem>If crying: wait 3–5 minutes before checking</CheckItem>
              <CheckItem>If crying stops during the wait: restart the timer</CheckItem>
              <CheckItem>When checking: do NOT pick up the baby. Pat, shush, soothe verbally.</CheckItem>
              <CheckItem>Leave when baby calms. Repeat if crying resumes.</CheckItem>
              <CheckItem>Apply the same method for naps</CheckItem>
              <CheckItem>Stay consistent — both parents, every sleep time, every day</CheckItem>
            </Card>
          </Section>
        </>
      )}

      {/* ===== CAUTIONS TAB ===== */}
      {activeTab === "cautions" && (
        <>
          <Section>
            <SectionTitle sub="No book is perfect. These are important caveats to keep in mind alongside the method.">Honest Cautions &amp; Balanced Perspective</SectionTitle>

            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {[
                { num: "1", title: "Breastfeeding concerns", desc: "Going 12 hours without nursing or pumping can significantly reduce milk supply. Many lactation consultants suggest keeping one night feed or pumping session until 6–10 months.", color: colors.rose, bg: colors.roseLight },
                { num: "2", title: "Nap recommendations may be insufficient", desc: "Two naps totaling 3 hours may not be enough for a 12-week-old. Most sleep experts recommend 3–4 naps at that age.", color: colors.gold, bg: colors.goldLight },
                { num: "3", title: "Not all babies respond the same to 'limited crying'", desc: "Some babies do not calm without being picked up. If checks seem to escalate rather than soothe, you may need to adapt.", color: colors.accent, bg: colors.accentLight },
                { num: "4", title: "The 12-week timeline is ambitious", desc: "It works for many families, but some babies may take longer. That's okay.", color: colors.teal, bg: colors.tealLight },
                { num: "5", title: "Safe sleep guidelines", desc: "The book was originally published in 2006. Always follow current AAP safe sleep recommendations.", color: colors.indigo, bg: colors.indigoLight },
                { num: "6", title: "Every baby is different", desc: "You may need to combine elements of this approach with other methods. That's not failure — it's parenting.", color: colors.green, bg: colors.greenLight },
              ].map((item) => (
                <div key={item.num} style={{ display: "flex", gap: 16, padding: 20, background: item.bg, borderRadius: 14, border: `1px solid ${item.color}30` }}>
                  <div style={{ width: 36, height: 36, borderRadius: "50%", background: item.color, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontFamily: "'Playfair Display', Georgia, serif", fontSize: 16, fontWeight: 700, flexShrink: 0 }}>{item.num}</div>
                  <div>
                    <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 16, fontWeight: 700, color: colors.navy }}>{item.title}</div>
                    <p style={{ fontSize: 14, lineHeight: 1.7, margin: "6px 0 0", color: colors.text }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </Section>

          {/* Key Takeaways */}
          <Section bg={colors.card}>
            <SectionTitle color={colors.indigo} sub="The essential principles distilled from the entire book.">Key Takeaways — The TL;DR</SectionTitle>

            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {[
                { num: "1", text: "Sleep is a skill you teach, not a trait babies have. Remove the guilt.", color: colors.accent },
                { num: "2", text: "Structured daytime feeding is the foundation. 4 feeds, 4 hours apart, 24+ oz during the day.", color: colors.teal },
                { num: "3", text: "Gradually wean night feeds by reducing 0.5 oz every 3 nights. Don't go cold turkey.", color: colors.indigo },
                { num: "4", text: "Put the baby down awake. This is the single most important habit to build.", color: colors.gold },
                { num: "5", text: "The Limited Crying Solution = wait 3–5 min, soothe without picking up, leave when calm.", color: colors.rose },
                { num: "6", text: "Consistency is everything. Both parents, every time, no exceptions (especially the first 6 months).", color: colors.green },
                { num: "7", text: "Use the toolbox to bridge gaps — pacifier, bouncy seat, change of scenery — but don't let tools become dependencies.", color: colors.accent },
                { num: "8", text: "Regressions are normal and temporary. Stay the course.", color: colors.teal },
                { num: "9", text: "The Jell-O analogy: Let the routine set before you start bending it.", color: colors.indigo },
                { num: "10", text: "Trust your baby — they're more capable of self-soothing than you think. And trust yourself — you know your baby better than any book does.", color: colors.gold },
              ].map((item) => (
                <div key={item.num} style={{ display: "flex", gap: 14, alignItems: "flex-start", padding: "14px 18px", background: `${item.color}10`, borderRadius: 12, borderLeft: `4px solid ${item.color}` }}>
                  <div style={{ width: 28, height: 28, borderRadius: "50%", background: item.color, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, flexShrink: 0 }}>{item.num}</div>
                  <div style={{ fontSize: 15, lineHeight: 1.6, color: colors.text }}>{item.text}</div>
                </div>
              ))}
            </div>
          </Section>
        </>
      )}

      {/* CONCLUSION BANNER */}
      <div style={{ background: `linear-gradient(135deg, ${colors.navy} 0%, #1a2240 50%, #2a2a50 100%)`, padding: "56px 24px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, opacity: 0.05, background: "radial-gradient(circle at 70% 30%, rgba(200,160,74,0.4) 0%, transparent 60%)" }}></div>
        <div style={{ position: "relative", maxWidth: 720, margin: "0 auto", textAlign: "center" }}>
          <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", color: colors.gold, marginBottom: 12 }}>The Promise</div>
          <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 32, fontWeight: 800, color: "#fff", margin: 0, lineHeight: 1.2 }}>Well-Rested Baby, Well-Rested Family</h2>
          <p style={{ fontSize: 17, color: "rgba(255,255,255,0.7)", marginTop: 16, lineHeight: 1.7, maxWidth: 600, margin: "16px auto 0" }}>The method is simple. The execution requires patience and consistency. But the payoff — for your baby and your whole family — is immeasurable.</p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 16, marginTop: 32 }}>
            {[
              { icon: "\uD83C\uDF19", stat: "12 Hours", label: "Uninterrupted sleep" },
              { icon: "\uD83D\uDC76", stat: "Self-Soothe", label: "A skill for life" },
              { icon: "\u2764\uFE0F", stat: "Rested Parents", label: "Better for everyone" },
              { icon: "\uD83D\uDCAA", stat: "Consistency", label: "The key to success" },
            ].map((item, i) => (
              <div key={i} style={{ background: "rgba(255,255,255,0.08)", borderRadius: 14, padding: 20, border: "1px solid rgba(255,255,255,0.1)" }}>
                <div style={{ fontSize: 28 }}>{item.icon}</div>
                <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 20, fontWeight: 700, color: colors.gold, marginTop: 8 }}>{item.stat}</div>
                <div style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", marginTop: 4, lineHeight: 1.4 }}>{item.label}</div>
              </div>
            ))}
          </div>

          <div style={{ background: "rgba(255,255,255,0.06)", borderRadius: 16, padding: 24, marginTop: 32, border: "1px solid rgba(255,255,255,0.1)", textAlign: "left" }}>
            <p style={{ fontSize: 15, lineHeight: 1.8, color: "rgba(255,255,255,0.8)", margin: 0 }}>Sleep training is not about abandoning your baby. It&apos;s about teaching them one of the most fundamental skills they&apos;ll ever learn. A well-rested baby is happier, healthier, and more engaged during the day. Well-rested parents are more patient, more present, and more capable of giving their best.</p>
            <p style={{ fontSize: 15, lineHeight: 1.8, color: colors.gold, margin: "16px 0 0", fontFamily: "'Playfair Display', Georgia, serif", fontStyle: "italic" }}>Trust the process. Trust your baby. Trust yourself.</p>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div style={{ background: colors.navy, padding: "32px 24px", textAlign: "center" }}>
        <p style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", margin: 0, lineHeight: 1.6 }}>Summary based on <em>Twelve Hours&apos; Sleep by Twelve Weeks Old</em> by Suzy Giordano &amp; Lisa Abidin.<br />This is a study guide — not a substitute for medical advice. Always consult your pediatrician.</p>
      </div>

      {/* COMMENTS */}
      <Section>
        <GiscusComments locale="en" term="/reading-notes/twelve-hours-sleep" />
      </Section>
    </div>
  );
}
