"use client";

import Image from "next/image";
import { useState } from "react";
import { AudioPlayer } from "@/components/AudioPlayer";
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
    {title && <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 20, fontWeight: 700, color: colors.rose, marginBottom: 12 }}>{title}</div>}
    <div style={{ fontSize: 15, lineHeight: 1.7, color: colors.text }}>{children}</div>
  </div>
);

const StopItem = ({ children }: { children: React.ReactNode }) => (
  <div style={{ display: "flex", gap: 12, alignItems: "flex-start", marginBottom: 10 }}>
    <div style={{ width: 22, height: 22, borderRadius: "50%", background: colors.rose, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M3 3l6 6M9 3l-6 6" stroke="#fff" strokeWidth="2" strokeLinecap="round" /></svg>
    </div>
    <div style={{ fontSize: 15, lineHeight: 1.6, color: colors.text }}>{children}</div>
  </div>
);

export default function InfantExperimentsEn() {
  const [activeTab, setActiveTab] = useState("start");
  const [openS, setOpenS] = useState(0);
  const [copied, setCopied] = useState(false);

  const tabs = [
    { id: "start", label: "Getting Started" },
    { id: "peekaboo", label: "Peekaboo" },
    { id: "still-face", label: "Still-Face" },
    { id: "kick", label: "Kick-to-Move" },
    { id: "imitation", label: "Imitation" },
    { id: "record", label: "Record & Reflect" },
  ];

  const templateText = `Experiment:
Date:
Baby's age:
Mood / state:
Setup notes:
What baby did:
Surprising observations:
Notes: `;

  return (
    <div style={{ background: colors.bg, fontFamily: "'Source Sans 3', sans-serif", color: colors.text, minHeight: "100vh" }}>
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700;800&family=Source+Sans+3:wght@300;400;600;700&display=swap" rel="stylesheet" />

      {/* HERO */}
      <div style={{ background: `linear-gradient(135deg, ${colors.navy} 0%, #0F2B22 100%)`, padding: "56px 24px 48px", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, opacity: 0.06, background: "repeating-linear-gradient(45deg, transparent, transparent 30px, rgba(255,255,255,0.1) 30px, rgba(255,255,255,0.1) 60px)" }}></div>
        <div style={{ position: "relative", maxWidth: 720, margin: "0 auto" }}>
          <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", color: colors.accent, marginBottom: 16 }}>Guide</div>
          <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 40, fontWeight: 800, color: "#fff", margin: 0, lineHeight: 1.15 }}>Classic Infant Psychology Experiments You Can Try at Home</h1>
          <p style={{ fontSize: 17, color: "rgba(255,255,255,0.7)", marginTop: 12, lineHeight: 1.5 }}>Hands-on adaptations of four landmark developmental studies — designed for curious parents of 4–6 month olds</p>
          <div style={{ display: "flex", justifyContent: "center", gap: 32, marginTop: 32, flexWrap: "wrap" }}>
            <StatBox num="4" label="Experiments" color={colors.gold} />
            <StatBox num="4–6 mo" label="Age Range" color={colors.accent} />
            <StatBox num="~15 min" label="Per Session" color={colors.teal} />
            <StatBox num="1+" label="Observers" color={colors.indigo} />
          </div>
        </div>
      </div>

      {/* AUDIO */}
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "16px 24px 0" }}>
        <AudioPlayer locale="en" contentKey="guides/infant-experiments" />
      </div>

      {/* VIDEO */}
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "16px 24px 0" }}>
        <div style={{ position: "relative", paddingBottom: "56.25%", borderRadius: 12, overflow: "hidden", boxShadow: "0 2px 12px rgba(26,60,50,0.08)" }}>
          <iframe
            src="https://www.youtube-nocookie.com/embed/yuoCwqRN5DU"
            title="4 Classic Baby Experiments That Reveal How Infants Think"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: "none" }}
          />
        </div>
        <div style={{ textAlign: "right", marginTop: 8 }}>
          <a href="https://www.bilibili.com/video/BV1ScDUBCEkR" target="_blank" rel="noopener noreferrer" style={{ fontSize: 13, color: colors.textLight, textDecoration: "none" }}>Also on <span style={{ fontWeight: 600, color: colors.accent }}>Bilibili</span> →</a>
        </div>
      </div>

      {/* NAV */}
      <div style={{ background: colors.card, borderBottom: `1px solid ${colors.border}`, position: "sticky", top: 0, zIndex: 100, boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "flex", alignItems: "center", padding: "0 12px" }}>
          <div style={{ display: "flex", gap: 0, overflowX: "auto", flex: 1 }}>
            {tabs.map((t) => (
              <button key={t.id} onClick={() => setActiveTab(t.id)} style={{ background: "none", border: "none", padding: "14px 18px", fontFamily: "'Source Sans 3', sans-serif", fontSize: 14, fontWeight: activeTab === t.id ? 700 : 400, color: activeTab === t.id ? colors.accent : colors.textLight, borderBottom: activeTab === t.id ? `3px solid ${colors.accent}` : "3px solid transparent", cursor: "pointer", whiteSpace: "nowrap", transition: "all 0.15s" }}>{t.label}</button>
            ))}
          </div>
        </div>
      </div>

      {/* ═══════════════════════ TAB 1 — GETTING STARTED ═══════════════════════ */}
      {activeTab === "start" && (
        <>
          <Section>
            <SectionTitle sub="Baby studies measure four basic responses — and each experiment in this guide maps to one.">What Infant Experiments Measure</SectionTitle>

            {/* Figure 1: Four Response Types */}
            <Card style={{ padding: 32 }}>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 24 }}>
                {/* Looking */}
                <div style={{ textAlign: "center" }}>
                  <div style={{ width: 80, height: 80, borderRadius: "50%", background: colors.accentLight, border: `3px solid ${colors.accent}`, margin: "0 auto 12px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                      <ellipse cx="18" cy="18" rx="14" ry="9" stroke={colors.accent} strokeWidth="2.5" fill="none" />
                      <circle cx="18" cy="18" r="5" fill={colors.accent} />
                      <circle cx="20" cy="16.5" r="1.5" fill="#fff" />
                    </svg>
                  </div>
                  <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 18, fontWeight: 700, color: colors.accent }}>Looking</div>
                  <div style={{ fontSize: 13, color: colors.textLight, marginTop: 4 }}>Where babies direct their gaze</div>
                </div>
                {/* Anticipating */}
                <div style={{ textAlign: "center" }}>
                  <div style={{ width: 80, height: 80, borderRadius: "50%", background: colors.goldLight, border: `3px solid ${colors.gold}`, margin: "0 auto 12px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                      <circle cx="18" cy="18" r="13" stroke={colors.gold} strokeWidth="2.5" fill="none" />
                      <circle cx="13" cy="15" r="1.5" fill={colors.gold} />
                      <circle cx="23" cy="15" r="1.5" fill={colors.gold} />
                      <path d="M12 22c1.5 3 4.5 4.5 6 4.5s4.5-1.5 6-4.5" stroke={colors.gold} strokeWidth="2" strokeLinecap="round" fill="none" />
                    </svg>
                  </div>
                  <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 18, fontWeight: 700, color: colors.gold }}>Anticipating</div>
                  <div style={{ fontSize: 13, color: colors.textLight, marginTop: 4 }}>When babies predict what comes next</div>
                </div>
                {/* Kicking */}
                <div style={{ textAlign: "center" }}>
                  <div style={{ width: 80, height: 80, borderRadius: "50%", background: colors.tealLight, border: `3px solid ${colors.teal}`, margin: "0 auto 12px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                      <path d="M16 8c-1 4-2 8-1 12 1 4 3 7 5 10" stroke={colors.teal} strokeWidth="2.5" strokeLinecap="round" fill="none" />
                      <ellipse cx="20" cy="30" rx="5" ry="3" fill={colors.teal} opacity="0.3" />
                      <ellipse cx="20" cy="30" rx="4" ry="2.5" stroke={colors.teal} strokeWidth="2" fill="none" />
                      <path d="M22 20l4-3" stroke={colors.teal} strokeWidth="2" strokeLinecap="round" strokeDasharray="3 3" />
                    </svg>
                  </div>
                  <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 18, fontWeight: 700, color: colors.teal }}>Kicking</div>
                  <div style={{ fontSize: 13, color: colors.textLight, marginTop: 4 }}>How babies learn cause and effect</div>
                </div>
                {/* Copying */}
                <div style={{ textAlign: "center" }}>
                  <div style={{ width: 80, height: 80, borderRadius: "50%", background: colors.indigoLight, border: `3px solid ${colors.indigo}`, margin: "0 auto 12px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                      <path d="M10 20c2-5 5-8 8-8s6 3 8 8" stroke={colors.indigo} strokeWidth="2.5" strokeLinecap="round" fill="none" />
                      <circle cx="13" cy="22" r="3" stroke={colors.indigo} strokeWidth="2" fill="none" />
                      <circle cx="23" cy="22" r="3" stroke={colors.indigo} strokeWidth="2" fill="none" />
                      <path d="M13 14v-4M23 14v-4" stroke={colors.indigo} strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </div>
                  <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 18, fontWeight: 700, color: colors.indigo }}>Copying</div>
                  <div style={{ fontSize: 13, color: colors.textLight, marginTop: 4 }}>What babies can reproduce</div>
                </div>
              </div>
              <p style={{ fontSize: 13, color: colors.textLight, textAlign: "center", marginTop: 20, marginBottom: 0, fontStyle: "italic" }}>Figure 1 — The four basic responses measured in infant developmental studies</p>
            </Card>

            <Card accent={colors.accent}>
              <p style={{ fontSize: 15, lineHeight: 1.7, margin: 0 }}>Each experiment in this guide is a playful home adaptation of real developmental research. They are <strong>not diagnostic tools</strong>. No experiment here can diagnose anything — not a delay, not giftedness, not anything in between. The goal is to observe natural capabilities in action: to see what your baby can already do and to share in the small wonder of watching cognition unfold in real time.</p>
              <p style={{ fontSize: 15, lineHeight: 1.7, margin: "12px 0 0" }}>The original studies were conducted in laboratories under controlled conditions with statistical analysis across many babies. A single home session is an observation, not a conclusion.</p>
            </Card>
          </Section>

          <Section bg={colors.card}>
            <SectionTitle color={colors.rose} sub="Read these before running any experiment. They are non-negotiable.">Safety First — Hard Stop Rules</SectionTitle>

            <WarnCard>
              <StopItem>Baby cries or fusses — stop immediately, comfort first</StopItem>
              <StopItem>Baby turns away or arches back repeatedly — they&apos;re done</StopItem>
              <StopItem>Baby just woke up, just ate, or is overtired — not a good time</StopItem>
              <StopItem>Any setup feels physically unsafe — trust your instinct</StopItem>
              <StopItem>You feel uncomfortable — that&apos;s reason enough to stop</StopItem>
              <p style={{ fontSize: 14, lineHeight: 1.7, marginTop: 16, marginBottom: 0, fontStyle: "italic", color: colors.textLight }}>These are not tests. There is no passing or failing. A &quot;negative result&quot; almost always means the timing was off, not that something is wrong.</p>
            </WarnCard>
          </Section>

          <Section>
            <SectionTitle sub="The same preparation applies to every experiment in this guide.">Universal Setup</SectionTitle>

            <Card accent={colors.accent}>
              <Badge color={colors.accent} bg={colors.accentLight}>Before Every Session</Badge>
              <div style={{ marginTop: 12 }}>
                <CheckItem>Calm, alert baby — middle of a wake window is ideal</CheckItem>
                <CheckItem>Quiet room with minimal distractions</CheckItem>
                <CheckItem>One lead parent (runs the experiment) + one observer if possible</CheckItem>
                <CheckItem>Keep sessions to 5–10 minutes max, including breaks</CheckItem>
                <CheckItem>Neutral background behind the parent (no TV, no bright patterns)</CheckItem>
                <CheckItem>Optional: phone camera from a side angle for later review (don&apos;t hold it in baby&apos;s line of sight)</CheckItem>
              </div>
            </Card>
          </Section>
        </>
      )}

      {/* ═══════════════════════ TAB 2 — PEEKABOO ═══════════════════════ */}
      {activeTab === "peekaboo" && (
        <>
          <Section>
            <SectionTitle sub="A structured protocol based on one of the best-studied paradigms in infant social cognition.">Experiment 1: Peekaboo as a Social-Prediction Protocol</SectionTitle>

            <Card accent={colors.accent}>
              <p style={{ fontSize: 15, lineHeight: 1.7, margin: 0 }}>Peekaboo isn&apos;t just a game — it&apos;s one of the best-studied paradigms in infant social cognition. By around 4–5 months, babies begin anticipating the &quot;reveal,&quot; which tells us they&apos;re building mental models of what comes next in a social sequence. This version turns casual peekaboo into a structured protocol so you can see anticipation in action.</p>
            </Card>
          </Section>

          <Section bg={colors.card}>
            <SectionTitle color={colors.accent}>Room Layout</SectionTitle>

            {/* Figure 2: Room Layout SVG */}
            <Card style={{ padding: 32 }}>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <svg width="400" height="280" viewBox="0 0 400 280" style={{ maxWidth: "100%", height: "auto" }}>
                  {/* Background */}
                  <rect x="20" y="20" width="360" height="240" rx="16" fill={colors.accentLight} stroke={colors.border} strokeWidth="1.5" />

                  {/* Parent */}
                  <circle cx="200" cy="70" r="28" fill={colors.accent} />
                  <text x="200" y="74" textAnchor="middle" fill="#fff" fontFamily="Source Sans 3, sans-serif" fontSize="11" fontWeight="700">Parent</text>
                  <text x="200" y="115" textAnchor="middle" fill={colors.textLight} fontFamily="Source Sans 3, sans-serif" fontSize="11">Parent</text>

                  {/* Baby */}
                  <circle cx="200" cy="210" r="24" fill={colors.gold} />
                  <text x="200" y="214" textAnchor="middle" fill="#fff" fontFamily="Source Sans 3, sans-serif" fontSize="10" fontWeight="700">Baby</text>
                  <text x="200" y="250" textAnchor="middle" fill={colors.textLight} fontFamily="Source Sans 3, sans-serif" fontSize="11">Baby (in bouncer)</text>

                  {/* Distance line */}
                  <line x1="230" y1="98" x2="230" y2="186" stroke={colors.navy} strokeWidth="1.5" strokeDasharray="6 4" />
                  <text x="255" y="148" fill={colors.navy} fontFamily="Source Sans 3, sans-serif" fontSize="12" fontWeight="600">~60 cm</text>

                  {/* Observer */}
                  <rect x="310" y="120" width="50" height="35" rx="8" fill={colors.indigoLight} stroke={colors.indigo} strokeWidth="1.5" />
                  <text x="335" y="142" textAnchor="middle" fill={colors.indigo} fontFamily="Source Sans 3, sans-serif" fontSize="10" fontWeight="600">&#x1F4F7;</text>
                  <text x="335" y="172" textAnchor="middle" fill={colors.textLight} fontFamily="Source Sans 3, sans-serif" fontSize="10">Observer</text>
                </svg>
              </div>
              <p style={{ fontSize: 13, color: colors.textLight, textAlign: "center", marginTop: 12, marginBottom: 0, fontStyle: "italic" }}>Figure 2 — Face-to-face setup, camera off to the side</p>
            </Card>
          </Section>

          <Section>
            <SectionTitle sub="Everything you need for a peekaboo session.">Materials</SectionTitle>
            <Card accent={colors.accent}>
              <CheckItem>Light, opaque cloth (muslin swaddle works well)</CheckItem>
              <CheckItem>Bouncer or supported seat</CheckItem>
              <CheckItem>Timer or mental count</CheckItem>
              <CheckItem>Optional: phone on tripod, side angle</CheckItem>
            </Card>
          </Section>

          <Section bg={colors.card}>
            <SectionTitle color={colors.accent} sub="Build the expectation first. Use identical timing, words, and tone for every baseline trial.">Baseline Trials (3–4 Reps)</SectionTitle>

            <SCard
              num="1"
              title="Position"
              subtitle="Set up the face-to-face arrangement"
              color={colors.accent}
              bg={colors.accentLight}
              icon="🪑"
              isOpen={openS === 1}
              toggle={() => setOpenS(openS === 1 ? 0 : 1)}
              details={
                <p>Sit face-to-face, approximately 60 cm apart. Baby should be in a bouncer or supported seat at your eye level. Make sure you&apos;re comfortable — you&apos;ll be holding a cloth up repeatedly.</p>
              }
            />
            <SCard
              num="2"
              title="Ready Cue"
              subtitle="Establish eye contact and signal the start"
              color={colors.accent}
              bg={colors.accentLight}
              icon="👀"
              isOpen={openS === 2}
              toggle={() => setOpenS(openS === 2 ? 0 : 2)}
              details={
                <p>Make eye contact. Say <strong>&quot;Ready?&quot;</strong> with a bright, consistent voice. Use the same word and the same tone every time — you&apos;re building a predictable sequence.</p>
              }
            />
            <SCard
              num="3"
              title="Hide"
              subtitle="Cover your face — same words, same position"
              color={colors.accent}
              bg={colors.accentLight}
              icon="🙈"
              isOpen={openS === 3}
              toggle={() => setOpenS(openS === 3 ? 0 : 3)}
              details={
                <p>Raise the cloth with both hands to cover your face (center). Say <strong>&quot;Where did I go?&quot;</strong> — same words, same tone every time. The consistency matters. You&apos;re creating a rule structure the baby can learn.</p>
              }
            />
            <SCard
              num="4"
              title="Pause"
              subtitle="Hold still for exactly 2 seconds"
              color={colors.accent}
              bg={colors.accentLight}
              icon="⏱️"
              isOpen={openS === 4}
              toggle={() => setOpenS(openS === 4 ? 0 : 4)}
              details={
                <p>Hold for exactly <strong>2 seconds</strong>. Stay still behind the cloth. No peeking, no noise, no movement. The pause is where anticipation builds.</p>
              }
            />
            <SCard
              num="5"
              title="Reveal"
              subtitle="Drop the cloth — big smile"
              color={colors.accent}
              bg={colors.accentLight}
              icon="🎉"
              isOpen={openS === 5}
              toggle={() => setOpenS(openS === 5 ? 0 : 5)}
              details={
                <p>Drop the cloth straight down: <strong>&quot;Peek-a-boo!&quot;</strong> Big smile. Wait for the baby&apos;s response — smile, vocalization, body movement. Let them react before you move on.</p>
              }
            />
            <SCard
              num="6"
              title="Reset"
              subtitle="Brief social pause before repeating"
              color={colors.accent}
              bg={colors.accentLight}
              icon="💬"
              isOpen={openS === 6}
              toggle={() => setOpenS(openS === 6 ? 0 : 6)}
              details={
                <p>5 seconds of gentle talk — &quot;There you are!&quot; or just a warm smile and eye contact. This is the social reset. Then repeat from the ready cue.</p>
              }
            />
            <SCard
              num="7"
              title="Consistency"
              subtitle="3–4 trials with identical timing"
              color={colors.accent}
              bg={colors.accentLight}
              icon="🔁"
              isOpen={openS === 7}
              toggle={() => setOpenS(openS === 7 ? 0 : 7)}
              details={
                <p>Run <strong>3–4 baseline trials</strong> with IDENTICAL timing, wording, and position. You&apos;re building an expectation. The test trials only work if the baseline is truly consistent — otherwise there&apos;s nothing to violate.</p>
              }
            />
          </Section>

          <Section>
            <SectionTitle sub="After 3–4 consistent baselines, pick ONE variation per session. The power comes from contrast.">Test Trials (Pick ONE Per Session)</SectionTitle>

            <Card accent={colors.gold} style={{ background: colors.goldLight, border: `1px solid ${colors.gold}40` }}>
              <Badge color={colors.gold} bg="#fff">Variation 1 — Delayed Reveal</Badge>
              <p style={{ fontSize: 15, lineHeight: 1.7, margin: "8px 0 0" }}>Same script as baseline, but hold the cloth for <strong>4–5 seconds</strong> instead of 2. Everything else stays identical — same words, same position, same voice.</p>
              <p style={{ fontSize: 15, lineHeight: 1.7, margin: "8px 0 0" }}><strong>What to watch:</strong> Does baby smile or wiggle <em>during the extra pause</em>, before you reveal? That anticipatory response — reacting to something that hasn&apos;t happened yet — is the finding.</p>
            </Card>

            <Card accent={colors.teal} style={{ background: colors.tealLight, border: `1px solid ${colors.teal}40` }}>
              <Badge color={colors.teal} bg="#fff">Variation 2 — Wrong-Side Reveal</Badge>
              <p style={{ fontSize: 15, lineHeight: 1.7, margin: "8px 0 0" }}>Same hide and pause as baseline. But instead of dropping the cloth straight down from center, peek out from the <strong>left or right side</strong>.</p>
              <p style={{ fontSize: 15, lineHeight: 1.7, margin: "8px 0 0" }}><strong>What to watch:</strong> Does baby&apos;s gaze go to center first (where they expect you) before finding you at the side? That initial misdirected look reveals they had a prediction about where you&apos;d appear.</p>
            </Card>

            <Card accent={colors.indigo} style={{ background: colors.indigoLight, border: `1px solid ${colors.indigo}40` }}>
              <Badge color={colors.indigo} bg="#fff">Variation 3 — Empty-Center Reveal</Badge>
              <p style={{ fontSize: 15, lineHeight: 1.7, margin: "8px 0 0" }}>During the 2-second pause, quietly shift your face to one side behind the cloth. Drop the cloth — center is <strong>empty</strong>. Pause 1 second, then peek from the side.</p>
              <p style={{ fontSize: 15, lineHeight: 1.7, margin: "8px 0 0" }}><strong>What to watch:</strong> Surprise at the empty center — wider eyes, stilling, or a brief confused expression before they find you. This is a violation-of-expectation response.</p>
            </Card>

            <Card style={{ background: colors.accentLight, border: `1px solid ${colors.accent}40`, textAlign: "center" }}>
              <p style={{ fontSize: 15, lineHeight: 1.7, margin: 0, fontWeight: 600, color: colors.navy }}>Only vary ONE thing per session. The power comes from contrast with the baseline.</p>
            </Card>
          </Section>

          <Section bg={colors.card}>
            <SectionTitle color={colors.accent}>Visual Guides</SectionTitle>

            <Card style={{ padding: 20, marginBottom: 24 }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: colors.textLight, marginBottom: 12, textAlign: "center" }}>Figure 3 — Four-Panel Peekaboo Sequence</div>
              <Image
                src="/images/guides/infant-experiments/fig-3-peekaboo-sequence.png"
                alt="Four-panel peekaboo sequence showing the ready cue, hide phase, reveal, and social reset between a caregiver and baby."
                width={1408}
                height={768}
                sizes="(max-width: 948px) calc(100vw - 88px), 860px"
                style={{ width: "100%", height: "auto", borderRadius: 12, display: "block" }}
              />
              <p style={{ fontSize: 12, color: colors.textLight, textAlign: "center", marginTop: 12, marginBottom: 0, lineHeight: 1.6 }}>
                1 Ready cue: eye contact, cloth down. &middot; 2 Hide: cover from center with the same script. &middot; 3 Reveal: drop the cloth and reappear warmly. &middot; 4 Reset: brief, calm social reconnection.
              </p>
            </Card>

            {/* Figure 4: Test-Trial Comparison SVG */}
            <Card style={{ padding: 32 }}>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 20 }}>
                {/* Standard */}
                <div style={{ background: colors.greenLight, borderRadius: 12, padding: 20, textAlign: "center" }}>
                  <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 16, fontWeight: 700, color: colors.green, marginBottom: 12 }}>Standard</div>
                  <svg width="120" height="100" viewBox="0 0 120 100" style={{ margin: "0 auto" }}>
                    <rect x="30" y="10" width="60" height="50" rx="4" fill={colors.border} opacity="0.5" />
                    <circle cx="60" cy="35" r="15" fill={colors.accent} />
                    <circle cx="55" cy="32" r="2" fill="#fff" />
                    <circle cx="65" cy="32" r="2" fill="#fff" />
                    <path d="M54 40c2 3 10 3 12 0" stroke="#fff" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                    <path d="M60 60v20" stroke={colors.green} strokeWidth="2.5" strokeLinecap="round" />
                    <path d="M52 72l8 8 8-8" stroke={colors.green} strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <div style={{ fontSize: 12, color: colors.textLight, marginTop: 8 }}>Cloth drops center</div>
                  <div style={{ color: colors.green, fontSize: 20, marginTop: 4 }}>&#10003;</div>
                </div>

                {/* Delayed */}
                <div style={{ background: colors.goldLight, borderRadius: 12, padding: 20, textAlign: "center" }}>
                  <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 16, fontWeight: 700, color: colors.gold, marginBottom: 12 }}>Delayed</div>
                  <svg width="120" height="100" viewBox="0 0 120 100" style={{ margin: "0 auto" }}>
                    <rect x="30" y="10" width="60" height="50" rx="4" fill={colors.border} opacity="0.5" />
                    <circle cx="60" cy="35" r="15" fill={colors.gold} opacity="0.3" />
                    {/* Clock icon */}
                    <circle cx="60" cy="35" r="12" stroke={colors.gold} strokeWidth="2" fill="none" />
                    <path d="M60 28v9l5 3" stroke={colors.gold} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    {/* Dotted anticipation arrow */}
                    <path d="M30 80c10-10 20-15 30-15" stroke={colors.gold} strokeWidth="2" strokeDasharray="4 3" fill="none" strokeLinecap="round" />
                    <text x="60" y="90" textAnchor="middle" fill={colors.gold} fontFamily="Source Sans 3, sans-serif" fontSize="9" fontWeight="600">anticipation</text>
                  </svg>
                  <div style={{ fontSize: 12, color: colors.textLight, marginTop: 8 }}>Extra pause — watch for smile</div>
                </div>

                {/* Wrong-Side */}
                <div style={{ background: colors.indigoLight, borderRadius: 12, padding: 20, textAlign: "center" }}>
                  <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 16, fontWeight: 700, color: colors.indigo, marginBottom: 12 }}>Wrong-Side</div>
                  <svg width="120" height="100" viewBox="0 0 120 100" style={{ margin: "0 auto" }}>
                    <rect x="30" y="10" width="60" height="50" rx="4" fill={colors.border} opacity="0.5" />
                    {/* Expected position (center, faded) */}
                    <circle cx="60" cy="35" r="12" fill={colors.indigo} opacity="0.15" strokeDasharray="4 3" stroke={colors.indigo} strokeWidth="1" />
                    <text x="60" y="39" textAnchor="middle" fill={colors.indigo} fontFamily="Source Sans 3, sans-serif" fontSize="8" opacity="0.6">expected</text>
                    {/* Actual position (offset) */}
                    <circle cx="25" cy="35" r="10" fill={colors.indigo} />
                    <circle cx="22" cy="33" r="1.5" fill="#fff" />
                    <circle cx="28" cy="33" r="1.5" fill="#fff" />
                    {/* Arrow from expected to actual */}
                    <path d="M48 38c-5 0-10 0-16 0" stroke={colors.indigo} strokeWidth="1.5" strokeDasharray="4 3" fill="none" markerEnd="url(#arrowIndigo)" />
                    <defs>
                      <marker id="arrowIndigo" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0 0L6 3L0 6" fill={colors.indigo} /></marker>
                    </defs>
                    <text x="60" y="82" textAnchor="middle" fill={colors.indigo} fontFamily="Source Sans 3, sans-serif" fontSize="9" fontWeight="600">gaze shifts?</text>
                  </svg>
                  <div style={{ fontSize: 12, color: colors.textLight, marginTop: 8 }}>Peek from side — watch gaze</div>
                </div>
              </div>
              <p style={{ fontSize: 13, color: colors.textLight, textAlign: "center", marginTop: 16, marginBottom: 0, fontStyle: "italic" }}>Figure 4 — What to watch: does baby&apos;s gaze go where they expect you to be?</p>
            </Card>

            <Card style={{ padding: 20 }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: colors.textLight, marginBottom: 12, textAlign: "center" }}>Figure 5 — Parent Behavior During Peekaboo</div>
              <Image
                src="/images/guides/infant-experiments/fig-5-parent-behavior-strip.png"
                alt="Instructional strip showing caregiver posture during hide, reveal, reset, and an anti-pattern that accidentally cues the reveal."
                width={1376}
                height={768}
                sizes="(max-width: 948px) calc(100vw - 88px), 860px"
                style={{ width: "100%", height: "auto", borderRadius: 12, display: "block" }}
              />
              <p style={{ fontSize: 12, color: colors.textLight, textAlign: "center", marginTop: 12, marginBottom: 0, lineHeight: 1.6 }}>
                1 Do: stay centered and neutral during the hide. &middot; 2 Do: reveal from center with a warm face. &middot; 3 Do: return to a relaxed reset. &middot; 4 Don&apos;t: glance sideways or lean early and cue the answer.
              </p>
            </Card>
          </Section>

          <Section>
            <SectionTitle sub="Signs that your baby is tracking the peekaboo pattern.">What to Watch For</SectionTitle>

            <Card accent={colors.green} style={{ background: colors.greenLight, border: `1px solid ${colors.green}40` }}>
              <CheckItem><strong>Anticipatory smile</strong> — smiling BEFORE you reveal</CheckItem>
              <CheckItem><strong>Body tensing or wiggling</strong> as the pause progresses</CheckItem>
              <CheckItem><strong>Gaze shifting</strong> to the expected reveal location (especially in wrong-side trials)</CheckItem>
              <CheckItem><strong>Stronger reaction on violation</strong> — bigger smile, longer stare, surprise expression</CheckItem>
              <CheckItem><strong>Re-engagement attempts</strong> — vocalizing or reaching toward the cloth</CheckItem>
            </Card>

            <WarnCard title="What NOT to Do">
              <StopItem>Don&apos;t vary multiple things at once — one change per session</StopItem>
              <StopItem>Don&apos;t peek or make noise behind the cloth</StopItem>
              <StopItem>Don&apos;t loom forward during the reveal</StopItem>
              <StopItem>Don&apos;t continue if baby loses interest — 3 good trials beat 6 bored ones</StopItem>
            </WarnCard>
          </Section>

          <Section bg={colors.card}>
            <Card style={{ background: colors.accentLight, border: `1px solid ${colors.accent}40` }}>
              <Badge color={colors.accent} bg="#fff">Citations</Badge>
              <p style={{ fontSize: 13, lineHeight: 1.7, color: colors.textLight, margin: "8px 0 0" }}>Bruner &amp; Sherwood (1976) — peekaboo as rule-structure learning, showing how infants internalize the sequential format of the game.</p>
              <p style={{ fontSize: 13, lineHeight: 1.7, color: colors.textLight, margin: "6px 0 0" }}>Montague &amp; Walker-Andrews (2001) — peekaboo and infant emotion perception, demonstrating that infants use the peekaboo context to process and respond to emotional expressions.</p>
            </Card>
          </Section>
        </>
      )}

      {/* ═══════════════════════ TAB 3 — STILL-FACE ═══════════════════════ */}
      {activeTab === "still-face" && (
        <>
          <Section>
            <SectionTitle sub="The most-studied paradigm in infant social-emotional research — and the most sensitive one in this guide.">Experiment 2: The Still-Face Paradigm</SectionTitle>

            <WarnCard title="Before You Begin — Read This Carefully">
              <p style={{ margin: "0 0 12px" }}>This is the most-studied paradigm in infant social-emotional research, but it&apos;s also the one most likely to cause brief distress. It reveals that by 4–5 months, babies already expect social partners to be contingently responsive — they notice when you stop responding, and they try to fix it.</p>
              <p style={{ margin: 0 }}>This experiment is <strong>entirely optional</strong>. If you&apos;re uncomfortable with the idea, skip it. The other three experiments in this guide are just as interesting and involve no intentional disruption of social interaction.</p>
            </WarnCard>
          </Section>

          <Section bg={colors.card}>
            <SectionTitle color={colors.accent}>Still-Face Timeline</SectionTitle>

            {/* Figure 6: Still-Face Timeline SVG */}
            <Card style={{ padding: 32 }}>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <svg width="100%" height="110" viewBox="0 0 700 110" style={{ maxWidth: 700 }} preserveAspectRatio="xMidYMid meet">
                  {/* Play phase */}
                  <rect x="20" y="30" width="340" height="40" rx="6" fill={colors.greenLight} stroke={colors.green} strokeWidth="1.5" />
                  <text x="190" y="55" textAnchor="middle" fill={colors.green} fontFamily="Source Sans 3, sans-serif" fontSize="13" fontWeight="700">Play — 60 seconds</text>
                  <text x="190" y="90" textAnchor="middle" fill={colors.textLight} fontFamily="Source Sans 3, sans-serif" fontSize="11">Normal warm interaction</text>

                  {/* Still-face phase */}
                  <rect x="365" y="30" width="175" height="40" rx="6" fill={colors.roseLight} stroke={colors.rose} strokeWidth="1.5" />
                  <text x="452" y="55" textAnchor="middle" fill={colors.rose} fontFamily="Source Sans 3, sans-serif" fontSize="13" fontWeight="700">Still-Face — ≤30 s</text>
                  <text x="452" y="90" textAnchor="middle" fill={colors.textLight} fontFamily="Source Sans 3, sans-serif" fontSize="11">Neutral, no response</text>

                  {/* Warning icon above still-face */}
                  <text x="452" y="20" textAnchor="middle" fill={colors.rose} fontFamily="Source Sans 3, sans-serif" fontSize="12" fontWeight="700">&#9888; Stop immediately if baby cries</text>

                  {/* Reunion phase */}
                  <rect x="545" y="30" width="135" height="40" rx="6 0 0 6" fill={colors.greenLight} stroke={colors.green} strokeWidth="1.5" strokeDasharray="0 0 4 0" />
                  <text x="612" y="55" textAnchor="middle" fill={colors.green} fontFamily="Source Sans 3, sans-serif" fontSize="13" fontWeight="700">Reunion</text>
                  <text x="612" y="90" textAnchor="middle" fill={colors.textLight} fontFamily="Source Sans 3, sans-serif" fontSize="11">Immediate warm reconnection</text>
                </svg>
              </div>
              <p style={{ fontSize: 13, color: colors.textLight, textAlign: "center", marginTop: 12, marginBottom: 0, fontStyle: "italic" }}>Figure 6 — Maximum 30 seconds of still-face. End sooner if baby shows distress.</p>
            </Card>
          </Section>

          <Section>
            <SectionTitle sub="Three phases, each with clear rules. The reunion phase is not optional.">The Three Phases</SectionTitle>

            <Card accent={colors.green} style={{ background: colors.greenLight, border: `1px solid ${colors.green}40` }}>
              <Badge color={colors.green} bg="#fff">Phase 1 — Play (60 Seconds)</Badge>
              <p style={{ fontSize: 15, lineHeight: 1.7, margin: "8px 0 0" }}>Normal, warm, face-to-face interaction. Talk, smile, respond naturally to your baby. Mirror their expressions, respond to their vocalizations, be the engaged social partner you normally are.</p>
              <p style={{ fontSize: 15, lineHeight: 1.7, margin: "8px 0 0" }}>This phase establishes your baseline as a <strong>contingently responsive</strong> partner — someone who reacts predictably to what the baby does. The still-face only matters because this phase came first.</p>
            </Card>

            <Card accent={colors.rose} style={{ background: colors.roseLight, border: `1px solid ${colors.rose}40` }}>
              <Badge color={colors.rose} bg="#fff">Phase 2 — Still-Face (30 Seconds Maximum)</Badge>
              <p style={{ fontSize: 15, lineHeight: 1.7, margin: "8px 0 0" }}>Stop talking, smiling, and touching. Look at your baby with a relaxed, neutral face. This is harder than it sounds.</p>
              <div style={{ marginTop: 16, marginBottom: 16 }}>
                <div style={{ fontWeight: 700, color: colors.navy, marginBottom: 8 }}>What &quot;neutral&quot; means:</div>
                <CheckItem>Relaxed face, not tense — soft muscles, not clenched jaw</CheckItem>
                <CheckItem>Direct but soft eye contact — look at baby, don&apos;t stare through them</CheckItem>
                <CheckItem>No smile, no speech, no touch, no head nodding</CheckItem>
                <CheckItem>Don&apos;t lean forward or loom</CheckItem>
                <CheckItem>Don&apos;t frown — just quiet</CheckItem>
              </div>
              <WarnCard title="Abort Immediately If:">
                <StopItem>Baby cries (not fussing — actual crying)</StopItem>
                <StopItem>Baby&apos;s face crumples or turns red</StopItem>
                <StopItem>You feel uncomfortable</StopItem>
                <StopItem>You hit 30 seconds</StopItem>
              </WarnCard>
            </Card>

            <Card accent={colors.green} style={{ background: colors.greenLight, border: `1px solid ${colors.green}40` }}>
              <Badge color={colors.green} bg="#fff">Phase 3 — Reunion (Immediate)</Badge>
              <p style={{ fontSize: 15, lineHeight: 1.7, margin: "8px 0 0" }}>As soon as the still-face ends — <strong>immediately</strong> return to warm interaction. Big smile, warm voice, pick baby up if they need it. Pour it on. This phase is NOT optional.</p>
              <p style={{ fontSize: 15, lineHeight: 1.7, margin: "8px 0 0" }}>In the research protocol, the reunion phase always happens. It&apos;s the repair. At home, same rule — you don&apos;t end on the still-face.</p>
            </Card>
          </Section>

          <Section bg={colors.card}>
            <SectionTitle color={colors.accent}>What You Might See</SectionTitle>

            <Card accent={colors.gold}>
              <Badge color={colors.gold} bg={colors.goldLight}>During Still-Face</Badge>
              <p style={{ fontSize: 15, lineHeight: 1.7, margin: "8px 0 0" }}>Baby may try to <strong>re-engage</strong> you: smiling bigger, cooing louder, reaching toward your face, waving arms. These are bids for interaction — the baby is trying to restart the social exchange they&apos;ve come to expect.</p>
              <p style={{ fontSize: 15, lineHeight: 1.7, margin: "8px 0 0" }}>If that doesn&apos;t work, you may see confusion, gaze aversion (looking away), or mild distress. Some babies self-soothe (thumb sucking, looking at their own hands). This range of responses IS the finding — it demonstrates that even at 4–5 months, babies have built sophisticated models of how social interaction is supposed to work.</p>
            </Card>

            <Card accent={colors.teal}>
              <Badge color={colors.teal} bg={colors.tealLight}>During Reunion</Badge>
              <p style={{ fontSize: 15, lineHeight: 1.7, margin: "8px 0 0" }}>You may notice a brief <strong>carry-over effect</strong> — a moment of wariness before baby returns to normal engagement. Some babies take a few seconds to &quot;trust&quot; that you&apos;re back. This is completely typical and resolves quickly.</p>
            </Card>
          </Section>

          <Section>
            <SectionTitle sub="What this paradigm reveals about early social cognition.">What It Shows</SectionTitle>

            <Card accent={colors.accent}>
              <p style={{ fontSize: 15, lineHeight: 1.7, margin: 0 }}>By 4–5 months, babies have built sophisticated models of social interaction. They expect <strong>contingent responsiveness</strong> — that when they smile, you smile back; when they coo, you respond. The still-face disrupts this expectation, and the baby&apos;s reaction reveals just how early these social-cognitive structures develop.</p>
              <p style={{ fontSize: 15, lineHeight: 1.7, margin: "12px 0 0" }}>The paradigm doesn&apos;t measure attachment strength, temperament, or anything about your relationship quality. It measures one specific thing: whether the baby has learned that social partners are supposed to be responsive.</p>
            </Card>

            <Card style={{ background: colors.greenLight, border: `1px solid ${colors.green}40` }}>
              <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 20, fontWeight: 700, color: colors.navy, marginBottom: 8 }}>Repair Is the Point</div>
              <p style={{ fontSize: 15, lineHeight: 1.7, margin: 0 }}>Always end with warm reconnection. The still-face paradigm was never designed as a sustained experience of non-responsiveness. It&apos;s a brief, controlled disruption followed by immediate repair. In the lab, the reunion phase always happens. At home, same rule. The repair is where the learning lives — both for the baby and for you.</p>
            </Card>
          </Section>

          <Section bg={colors.card}>
            <Card style={{ background: colors.accentLight, border: `1px solid ${colors.accent}40` }}>
              <Badge color={colors.accent} bg="#fff">Citations</Badge>
              <p style={{ fontSize: 13, lineHeight: 1.7, color: colors.textLight, margin: "8px 0 0" }}>Tronick, Als, Adamson, Wise, &amp; Brazelton (1978) — the original still-face experiment, documenting infant distress when a responsive partner becomes unresponsive.</p>
              <p style={{ fontSize: 13, lineHeight: 1.7, color: colors.textLight, margin: "6px 0 0" }}>Adamson &amp; Frick (2003) — a comprehensive history of the still-face paradigm as a shared experimental tool, reviewing decades of replication and extension.</p>
            </Card>
          </Section>
        </>
      )}

      {/* ═══════════════════════ TAB 4 — KICK-TO-MOVE ═══════════════════════ */}
      {activeTab === "kick" && (
        <>
          <Section>
            <SectionTitle sub="A home adaptation of the classic mobile paradigm — one of the first demonstrations that young infants detect causal contingencies.">Experiment 3: Kick-to-Move Contingency Learning</SectionTitle>

            <Card accent={colors.accent}>
              <p style={{ fontSize: 15, lineHeight: 1.7, margin: 0 }}>In 1969, Carolyn Rovee and David Rovee discovered that when a ribbon connected a 3-month-old&apos;s ankle to an overhead mobile, the baby quickly learned that kicking made it move — and kicked more. This was one of the first demonstrations that young infants can detect <strong>causal contingencies</strong>: the relationship between their own action and an event in the world.</p>
              <p style={{ fontSize: 15, lineHeight: 1.7, margin: "12px 0 0" }}>This home version uses a play gym and soft ribbon. It&apos;s one of the most visually rewarding experiments in the guide because the behavioral change — more kicking, more deliberate kicking — happens right in front of you.</p>
            </Card>
          </Section>

          <Section bg={colors.card}>
            <div style={{ marginBottom: 32 }}>
              <WarnCard>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                  <Badge color={colors.rose} bg="#fff">Safety — Read First</Badge>
                </div>
                <StopItem><strong>Full supervision</strong> — parent within arm&apos;s reach at ALL times</StopItem>
                <StopItem><strong>Soft fabric ribbon or loop only</strong> — nothing that wraps tightly</StopItem>
                <StopItem><strong>NEVER leave connection attached after trial</strong></StopItem>
                <StopItem><strong>NEVER use during sleep or unsupervised play</strong></StopItem>
                <StopItem><strong>Disconnect immediately</strong> if baby shows distress</StopItem>
                <StopItem><strong>Floor-level play gym only</strong>, no crib-mounted mobiles</StopItem>
                <StopItem><strong>Remove ribbon entirely when done</strong>, every time</StopItem>
              </WarnCard>
            </div>
          </Section>

          <Section>
            <SectionTitle color={colors.accent}>Setup Diagram</SectionTitle>

            {/* Figure 7: Setup Diagram SVG */}
            <Card style={{ padding: 32 }}>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <svg width="500" height="300" viewBox="0 0 500 300" style={{ maxWidth: "100%", height: "auto" }}>
                  {/* Floor */}
                  <rect x="50" y="250" width="400" height="8" rx="4" fill={colors.border} />

                  {/* Play gym arch */}
                  <path d="M120 250 Q120 100 250 80 Q380 100 380 250" stroke={colors.accent} strokeWidth="4" fill="none" strokeLinecap="round" />
                  {/* Gym legs */}
                  <rect x="112" y="240" width="16" height="18" rx="3" fill={colors.accent} />
                  <rect x="372" y="240" width="16" height="18" rx="3" fill={colors.accent} />

                  {/* Hanging toy */}
                  <line x1="250" y1="105" x2="250" y2="155" stroke={colors.gold} strokeWidth="2" />
                  <circle cx="250" cy="165" r="15" fill={colors.goldLight} stroke={colors.gold} strokeWidth="2" />
                  <text x="250" y="169" textAnchor="middle" fill={colors.gold} fontSize="14">&#9734;</text>

                  {/* Baby */}
                  <ellipse cx="250" cy="240" rx="55" ry="12" fill={colors.accentLight} stroke={colors.accent} strokeWidth="1" />
                  {/* Baby body */}
                  <ellipse cx="230" cy="225" rx="30" ry="15" fill={colors.tealLight} stroke={colors.teal} strokeWidth="1.5" />
                  {/* Baby head */}
                  <circle cx="195" cy="218" r="14" fill={colors.tealLight} stroke={colors.teal} strokeWidth="1.5" />
                  <circle cx="191" cy="216" r="1.5" fill={colors.navy} />
                  <circle cx="199" cy="216" r="1.5" fill={colors.navy} />
                  {/* Baby leg */}
                  <line x1="265" y1="228" x2="295" y2="210" stroke={colors.teal} strokeWidth="3" strokeLinecap="round" />
                  {/* Baby foot */}
                  <circle cx="298" cy="207" r="6" fill={colors.tealLight} stroke={colors.teal} strokeWidth="1.5" />

                  {/* Ribbon (dashed) from foot to toy */}
                  <path d="M298 201 Q300 180 265 170 Q255 168 250 165" stroke={colors.rose} strokeWidth="2" strokeDasharray="6 4" fill="none" />
                  <text x="315" y="185" fill={colors.rose} fontFamily="Source Sans 3, sans-serif" fontSize="11" fontWeight="600">ribbon</text>

                  {/* Kick arrow */}
                  <path d="M310 207 L340 195" stroke={colors.teal} strokeWidth="2" fill="none" markerEnd="url(#kickArrow)" />
                  <defs>
                    <marker id="kickArrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0 0L8 4L0 8" fill={colors.teal} /></marker>
                  </defs>
                  <text x="345" y="192" fill={colors.teal} fontFamily="Source Sans 3, sans-serif" fontSize="11" fontWeight="600">kick</text>

                  {/* Movement arrow on toy */}
                  <path d="M265 165 L275 155" stroke={colors.gold} strokeWidth="2" fill="none" markerEnd="url(#toyArrow)" />
                  <defs>
                    <marker id="toyArrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0 0L8 4L0 8" fill={colors.gold} /></marker>
                  </defs>
                  <text x="280" y="150" fill={colors.gold} fontFamily="Source Sans 3, sans-serif" fontSize="11" fontWeight="600">toy moves</text>

                  {/* Safety badge */}
                  <rect x="60" y="60" width="130" height="30" rx="15" fill={colors.roseLight} stroke={colors.rose} strokeWidth="1.5" />
                  <text x="125" y="80" textAnchor="middle" fill={colors.rose} fontFamily="Source Sans 3, sans-serif" fontSize="11" fontWeight="700">&#9888; Full supervision</text>

                  {/* Label */}
                  <text x="250" y="290" textAnchor="middle" fill={colors.textLight} fontFamily="Source Sans 3, sans-serif" fontSize="11">Soft ribbon, loosely looped — never tied</text>
                </svg>
              </div>
              <p style={{ fontSize: 13, color: colors.textLight, textAlign: "center", marginTop: 12, marginBottom: 0, fontStyle: "italic" }}>Figure 7 — Play gym setup with soft ribbon connection. Parent stays within arm&apos;s reach at all times.</p>
            </Card>
          </Section>

          <Section bg={colors.card}>
            <SectionTitle color={colors.accent} sub="Everything you need for a kick-to-move session.">Materials</SectionTitle>
            <Card accent={colors.accent}>
              <CheckItem>Play gym with overhead toys</CheckItem>
              <CheckItem>Soft fabric ribbon (~50 cm)</CheckItem>
              <CheckItem>Timer</CheckItem>
              <CheckItem>Observer with notepad or phone camera</CheckItem>
            </Card>
          </Section>

          <Section>
            <SectionTitle sub="Three phases: baseline, contingent, disconnect. The contrast between phases is where the observation lives.">Three-Phase Protocol</SectionTitle>

            <SCard
              num="1"
              title="Baseline"
              subtitle="2 minutes — observe natural kicking rate"
              color={colors.indigo}
              bg={colors.indigoLight}
              icon="📊"
              isOpen={openS === 1}
              toggle={() => setOpenS(openS === 1 ? 0 : 1)}
              details={
                <div>
                  <p>Place baby under the play gym on their back, with one foot near the hanging toy. The ribbon is <strong>NOT connected</strong>. For 2 minutes, simply count natural kicks. This is your baseline — how much does baby kick when there&apos;s no contingency?</p>
                  <p style={{ marginTop: 8 }}>If possible, have the observer keep a rough tally. Don&apos;t draw baby&apos;s attention to the toy or their foot.</p>
                </div>
              }
            />
            <SCard
              num="2"
              title="Contingent Phase"
              subtitle="3–5 minutes — kicking makes the toy move"
              color={colors.accent}
              bg={colors.accentLight}
              icon="🎯"
              isOpen={openS === 2}
              toggle={() => setOpenS(openS === 2 ? 0 : 2)}
              details={
                <div>
                  <p>Loosely loop the soft ribbon from baby&apos;s ankle to the hanging toy. Now kicking makes the toy move and jingle. Stay within arm&apos;s reach the entire time.</p>
                  <p style={{ marginTop: 8 }}><strong>Don&apos;t draw attention to the connection.</strong> Don&apos;t say &quot;look, you&apos;re making it move!&quot; The point is to see whether baby discovers the contingency on their own. Watch for the moment of recognition — it&apos;s often visible as a shift from random kicking to more deliberate, purposeful leg movements.</p>
                  <p style={{ marginTop: 8 }}>If baby shows no interest after 3 minutes, that&apos;s fine — end the trial. Some babies need multiple sessions on different days.</p>
                </div>
              }
            />
            <SCard
              num="3"
              title="Disconnect"
              subtitle="2 minutes — remove the ribbon and watch"
              color={colors.gold}
              bg={colors.goldLight}
              icon="✂️"
              isOpen={openS === 3}
              toggle={() => setOpenS(openS === 3 ? 0 : 3)}
              details={
                <div>
                  <p>Remove the ribbon. Watch what happens over the next 2 minutes. If baby noticed the contingency, you may see a <strong>burst of kicking</strong> (trying to restart the connection), followed by looking at the toy expectantly, and eventually a decrease when it doesn&apos;t work.</p>
                  <p style={{ marginTop: 8 }}>This disconnect phase is what makes the observation meaningful. The burst of kicking after disconnection is strong evidence that baby had learned the relationship between their action and the toy&apos;s movement.</p>
                </div>
              }
            />
          </Section>

          <Section bg={colors.card}>
            <SectionTitle color={colors.accent}>What to Watch For</SectionTitle>

            <Card accent={colors.green} style={{ background: colors.greenLight, border: `1px solid ${colors.green}40` }}>
              <CheckItem><strong>Increased kicking rate</strong> during the contingent phase compared to baseline</CheckItem>
              <CheckItem><strong>Gaze directed at toy</strong> while kicking — watching the effect of their action</CheckItem>
              <CheckItem><strong>More deliberate, vigorous kicks</strong> — the quality of movement changes</CheckItem>
              <CheckItem><strong>After disconnect: burst of kicking</strong> — trying to restart the effect</CheckItem>
              <CheckItem><strong>After disconnect: looking at toy expectantly</strong> — checking whether it&apos;s working</CheckItem>
              <CheckItem><strong>After disconnect: kicking decreases</strong> once they &quot;give up&quot;</CheckItem>
            </Card>

            <Card style={{ background: colors.goldLight, border: `1px solid ${colors.gold}40` }}>
              <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 20, fontWeight: 700, color: colors.navy, marginBottom: 8 }}>Frame This Carefully</div>
              <p style={{ fontSize: 15, lineHeight: 1.7, margin: 0 }}>What you&apos;re observing is <strong>contingency detection</strong> — baby noticing that their action causes an effect. From a single home session, you CANNOT draw conclusions about memory or learning capacity. The original research used multiple sessions over days under controlled conditions with groups of babies.</p>
              <p style={{ fontSize: 15, lineHeight: 1.7, margin: "12px 0 0" }}>What you CAN observe is the in-the-moment discovery: the shift from random movement to purposeful action. That&apos;s remarkable enough without overclaiming.</p>
            </Card>
          </Section>

          <Section>
            <Card style={{ background: colors.accentLight, border: `1px solid ${colors.accent}40` }}>
              <Badge color={colors.accent} bg="#fff">Citations</Badge>
              <p style={{ fontSize: 13, lineHeight: 1.7, color: colors.textLight, margin: "8px 0 0" }}>Rovee, C. K., &amp; Rovee, D. T. (1969) — the original conjugate reinforcement study, showing that 3-month-olds rapidly learn the kicking-mobile contingency.</p>
              <p style={{ fontSize: 13, lineHeight: 1.7, color: colors.textLight, margin: "6px 0 0" }}>Rovee-Collier (1999) — a review of decades of mobile paradigm research, covering memory development, contextual specificity, and the conditions under which infants retain contingency learning.</p>
            </Card>
          </Section>
        </>
      )}

      {/* ═══════════════════════ TAB 5 — IMITATION ═══════════════════════ */}
      {activeTab === "imitation" && (
        <>
          <Section>
            <SectionTitle sub="Three variants of imitation tasks, from easiest to most impressive — matched to your baby's age and temperament.">Experiment 4: The Imitation Suite</SectionTitle>

            <Card accent={colors.accent}>
              <p style={{ fontSize: 15, lineHeight: 1.7, margin: 0 }}>Imitation is one of the most debated topics in developmental psychology. The old claim that newborns imitate facial expressions (Meltzoff &amp; Moore, 1977) has been challenged by large-scale replication failures. But by 4–6 months, solid evidence shows babies can imitate <strong>novel object-directed actions</strong> — and the older they get, the longer the delay they can handle between seeing an action and reproducing it.</p>
              <p style={{ fontSize: 15, lineHeight: 1.7, margin: "12px 0 0" }}>This section gives you three variants, ordered from easiest to hardest. Start with Variant A and work up if your baby is in the right age window.</p>
            </Card>
          </Section>

          <Section bg={colors.card}>
            <SectionTitle color={colors.accent}>Imitation Variant Comparison</SectionTitle>

            {/* Figure 8: Imitation Matrix */}
            <Card style={{ padding: 0, overflow: "hidden" }}>
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14, lineHeight: 1.6, minWidth: 560 }}>
                  <thead>
                    <tr style={{ background: colors.accentLight }}>
                      <th style={{ padding: "14px 16px", textAlign: "left", fontWeight: 700, color: colors.navy, borderBottom: `2px solid ${colors.accent}` }}></th>
                      <th style={{ padding: "14px 16px", textAlign: "center", fontWeight: 700, color: colors.gold, borderBottom: `2px solid ${colors.gold}` }}>Variant A</th>
                      <th style={{ padding: "14px 16px", textAlign: "center", fontWeight: 700, color: colors.teal, borderBottom: `2px solid ${colors.teal}` }}>Variant B</th>
                      <th style={{ padding: "14px 16px", textAlign: "center", fontWeight: 700, color: colors.indigo, borderBottom: `2px solid ${colors.indigo}` }}>Variant C</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={{ borderBottom: `1px solid ${colors.border}` }}>
                      <td style={{ padding: "12px 16px", fontWeight: 600, color: colors.navy }}>Type</td>
                      <td style={{ padding: "12px 16px", textAlign: "center" }}>Immediate Object</td>
                      <td style={{ padding: "12px 16px", textAlign: "center" }}>Short-Delay Deferred</td>
                      <td style={{ padding: "12px 16px", textAlign: "center" }}>Puppet-Style</td>
                    </tr>
                    <tr style={{ borderBottom: `1px solid ${colors.border}`, background: colors.bg }}>
                      <td style={{ padding: "12px 16px", fontWeight: 600, color: colors.navy }}>Best age</td>
                      <td style={{ padding: "12px 16px", textAlign: "center" }}>4–5 months</td>
                      <td style={{ padding: "12px 16px", textAlign: "center" }}>5–6 months</td>
                      <td style={{ padding: "12px 16px", textAlign: "center" }}>5–6 months</td>
                    </tr>
                    <tr style={{ borderBottom: `1px solid ${colors.border}` }}>
                      <td style={{ padding: "12px 16px", fontWeight: 600, color: colors.navy }}>Demos</td>
                      <td style={{ padding: "12px 16px", textAlign: "center" }}>3 repetitions</td>
                      <td style={{ padding: "12px 16px", textAlign: "center" }}>3 repetitions</td>
                      <td style={{ padding: "12px 16px", textAlign: "center" }}>3 repetitions</td>
                    </tr>
                    <tr style={{ borderBottom: `1px solid ${colors.border}`, background: colors.bg }}>
                      <td style={{ padding: "12px 16px", fontWeight: 600, color: colors.navy }}>Delay</td>
                      <td style={{ padding: "12px 16px", textAlign: "center" }}>None</td>
                      <td style={{ padding: "12px 16px", textAlign: "center" }}>10+ minutes</td>
                      <td style={{ padding: "12px 16px", textAlign: "center" }}>10+ minutes</td>
                    </tr>
                    <tr style={{ borderBottom: `1px solid ${colors.border}` }}>
                      <td style={{ padding: "12px 16px", fontWeight: 600, color: colors.navy }}>Success</td>
                      <td style={{ padding: "12px 16px", textAlign: "center" }}>Any part of action</td>
                      <td style={{ padding: "12px 16px", textAlign: "center" }}>Any part after delay</td>
                      <td style={{ padding: "12px 16px", textAlign: "center" }}>Reaches &amp; makes sound</td>
                    </tr>
                    <tr>
                      <td style={{ padding: "12px 16px", fontWeight: 600, color: colors.navy }}>Difficulty</td>
                      <td style={{ padding: "12px 16px", textAlign: "center", fontSize: 18 }}>&#9733;</td>
                      <td style={{ padding: "12px 16px", textAlign: "center", fontSize: 18 }}>&#9733;&#9733;</td>
                      <td style={{ padding: "12px 16px", textAlign: "center", fontSize: 18 }}>&#9733;&#9733;&#9733;</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p style={{ fontSize: 13, color: colors.textLight, textAlign: "center", padding: "12px 16px 16px", marginBottom: 0, fontStyle: "italic" }}>Figure 8 — Three imitation variants compared</p>
            </Card>
          </Section>

          <Section>
            <Card accent={colors.gold} style={{ background: colors.goldLight, border: `1px solid ${colors.gold}40` }}>
              <Badge color={colors.gold} bg="#fff">Variant A — Immediate Object Imitation</Badge>
              <Badge color={colors.gold} bg="#fff">Easiest — 4–5 Months</Badge>
              <div style={{ marginTop: 12 }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 0, marginBottom: 16 }}>
                  <FlowBox color={colors.gold} bg="#fff"><strong>1.</strong> Choose a simple object: rattle, cup, or soft block</FlowBox>
                  <FlowArrow />
                  <FlowBox color={colors.gold} bg="#fff"><strong>2.</strong> Perform an unusual action: bang a rattle in a 3-tap pattern, push a button with the back of your hand, turn a cup upside-down and tap the bottom</FlowBox>
                  <FlowArrow />
                  <FlowBox color={colors.gold} bg="#fff"><strong>3.</strong> Demonstrate slowly, 3 times. Exaggerated movements. Make sure baby is watching.</FlowBox>
                  <FlowArrow />
                  <FlowBox color={colors.gold} bg="#fff"><strong>4.</strong> Immediately offer the object to baby</FlowBox>
                  <FlowArrow />
                  <FlowBox color={colors.gold} bg="#fff"><strong>5.</strong> Wait silently — no &quot;you try!&quot;, no pointing, no re-demonstrating</FlowBox>
                  <FlowArrow />
                  <FlowBox color={colors.gold} bg="#fff"><strong>6.</strong> Observe for 30 seconds</FlowBox>
                </div>
                <p style={{ fontSize: 15, lineHeight: 1.7, margin: 0 }}><strong>Success:</strong> Baby performs ANY part of the demonstrated action. A partial reproduction — one tap instead of three, touching the same part of the object — counts.</p>
              </div>
            </Card>

            <Card accent={colors.teal} style={{ background: colors.tealLight, border: `1px solid ${colors.teal}40` }}>
              <Badge color={colors.teal} bg="#fff">Variant B — Short-Delay Deferred Imitation</Badge>
              <Badge color={colors.teal} bg="#fff">Harder — 5–6 Months</Badge>
              <div style={{ marginTop: 12 }}>
                <p style={{ fontSize: 15, lineHeight: 1.7, margin: "0 0 12px" }}>Same demonstration as Variant A, but with a crucial difference:</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 0, marginBottom: 16 }}>
                  <FlowBox color={colors.teal} bg="#fff"><strong>1.</strong> Demonstrate the action 3 times (same as Variant A)</FlowBox>
                  <FlowArrow />
                  <FlowBox color={colors.teal} bg="#fff"><strong>2.</strong> Put the object away — out of sight</FlowBox>
                  <FlowArrow />
                  <FlowBox color={colors.teal} bg="#fff"><strong>3.</strong> Do a different activity for 10 minutes</FlowBox>
                  <FlowArrow />
                  <FlowBox color={colors.teal} bg="#fff"><strong>4.</strong> Bring the object back, no reminder, no re-demonstration</FlowBox>
                  <FlowArrow />
                  <FlowBox color={colors.teal} bg="#fff"><strong>5.</strong> Offer and wait silently</FlowBox>
                </div>
                <p style={{ fontSize: 15, lineHeight: 1.7, margin: 0 }}><strong>Success:</strong> Baby performs any part of the action after the delay, without seeing it again. This requires the baby to have <em>retained a representation</em> of the action — a much harder cognitive task than immediate imitation.</p>
              </div>
            </Card>

            <Card accent={colors.indigo} style={{ background: colors.indigoLight, border: `1px solid ${colors.indigo}40` }}>
              <Badge color={colors.indigo} bg="#fff">Variant C — Puppet-Style Imitation</Badge>
              <Badge color={colors.indigo} bg="#fff">Most Impressive — 5–6 Months</Badge>
              <div style={{ marginTop: 12 }}>
                <p style={{ fontSize: 15, lineHeight: 1.7, margin: "0 0 12px" }}>Based on the Barr/Hayne puppet paradigm — one of the clearest deferred imitation tasks in the literature:</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 0, marginBottom: 16 }}>
                  <FlowBox color={colors.indigo} bg="#fff"><strong>1.</strong> Use a hand puppet or mitten with a jingle bell attached inside</FlowBox>
                  <FlowArrow />
                  <FlowBox color={colors.indigo} bg="#fff"><strong>2.</strong> Put on the puppet, shake to make it jingle — 3 clear, exaggerated demonstrations</FlowBox>
                  <FlowArrow />
                  <FlowBox color={colors.indigo} bg="#fff"><strong>3.</strong> Remove the puppet, set it aside</FlowBox>
                  <FlowArrow />
                  <FlowBox color={colors.indigo} bg="#fff"><strong>4.</strong> After 10+ minutes of different activity, offer the puppet to baby</FlowBox>
                  <FlowArrow />
                  <FlowBox color={colors.indigo} bg="#fff"><strong>5.</strong> Watch: does baby try to make it jingle?</FlowBox>
                </div>
                <p style={{ fontSize: 15, lineHeight: 1.7, margin: 0 }}><strong>Success:</strong> Any movement that produces the sound — even accidental-looking at first. The baby doesn&apos;t need to put the puppet on correctly; any action directed at making it jingle counts as a meaningful response.</p>
              </div>
            </Card>
          </Section>

          <Section bg={colors.card}>
            <SectionTitle color={colors.accent}>Tips for All Variants</SectionTitle>

            <Card accent={colors.accent}>
              <CheckItem><strong>Be theatrical:</strong> slow, exaggerated demonstrations work better than natural-speed ones</CheckItem>
              <CheckItem><strong>Don&apos;t over-cue:</strong> no &quot;your turn!&quot;, no pointing, no gesturing toward the object</CheckItem>
              <CheckItem><strong>3 demos is the sweet spot</strong> — enough to register, not so many it becomes boring</CheckItem>
              <CheckItem><strong>Partial success IS success</strong> — one tap instead of three, touching the right part of the object</CheckItem>
              <CheckItem><strong>Temperament matters enormously</strong> — cautious babies may watch attentively but not act. That doesn&apos;t mean they didn&apos;t encode the action.</CheckItem>
              <CheckItem><strong>Try different wake windows</strong> — some babies are more exploratory in the morning, some in the afternoon</CheckItem>
            </Card>
          </Section>

          <Section>
            <Card style={{ background: colors.accentLight, border: `1px solid ${colors.accent}40` }}>
              <Badge color={colors.accent} bg="#fff">Citations</Badge>
              <p style={{ fontSize: 13, lineHeight: 1.7, color: colors.textLight, margin: "8px 0 0" }}>Collie &amp; Hayne (1999) — deferred imitation by 6- and 9-month-old infants, providing evidence for declarative memory in the first year.</p>
              <p style={{ fontSize: 13, lineHeight: 1.7, color: colors.textLight, margin: "6px 0 0" }}>Barr, Dowden, &amp; Hayne (1996) — developmental changes in deferred imitation, showing how the delay infants can tolerate increases with age from 6 to 24 months.</p>
            </Card>
          </Section>
        </>
      )}

      {/* ═══════════════════════ TAB 6 — RECORD & REFLECT ═══════════════════════ */}
      {activeTab === "record" && (
        <>
          <Section>
            <SectionTitle sub="The difference between a home experiment and just playing with your baby is how you observe and record.">Observing Without Overclaiming</SectionTitle>

            <Card accent={colors.accent}>
              <CheckItem><strong>Write down what you SAW, not what you think it means.</strong> &quot;Baby kicked more&quot; = observation. &quot;Baby understood cause and effect&quot; = interpretation.</CheckItem>
              <CheckItem><strong>One trial does not equal a conclusion.</strong> Any single observation could be coincidence, mood, timing, or temperament.</CheckItem>
              <CheckItem><strong>Temperament and timing are massive confounders.</strong> A bold, well-rested baby and a cautious, slightly tired baby will respond completely differently to the same setup.</CheckItem>
              <CheckItem><strong>Same baby, different answers.</strong> The same infant can look brilliant at 10am and uninterested at 4pm. This is normal, not diagnostic.</CheckItem>
              <CheckItem><strong>Most informative when repeated</strong> across different days, different times, and different moods. A pattern across sessions is more meaningful than any single trial.</CheckItem>
            </Card>
          </Section>

          <Section bg={colors.card}>
            <SectionTitle color={colors.accent}>Observation Template</SectionTitle>

            {/* Figure 9: Interactive Observation Template */}
            <Card style={{ background: "#F8FAF9", border: `2px solid ${colors.accent}40` }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 20, fontWeight: 700, color: colors.navy }}>Observation Record</div>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(templateText).then(() => {
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
                    fontFamily: "'Source Sans 3', sans-serif",
                    transition: "background 0.2s",
                  }}
                >
                  {copied ? "Copied \u2713" : "Copy to Clipboard"}
                </button>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {[
                  { label: "Experiment", placeholder: "e.g., Peekaboo — Delayed Reveal" },
                  { label: "Date", placeholder: "YYYY-MM-DD" },
                  { label: "Baby\u2019s age", placeholder: "e.g., 5 months, 2 weeks" },
                  { label: "Mood / state", placeholder: "e.g., Alert, calm, middle of wake window" },
                  { label: "Setup notes", placeholder: "e.g., Living room, morning light, dad observing" },
                  { label: "What baby did", placeholder: "Describe observable behaviors only" },
                  { label: "Surprising observations", placeholder: "Anything unexpected" },
                  { label: "Notes", placeholder: "Timing, ideas for next session, etc." },
                ].map((field, i) => (
                  <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                    <div style={{ width: 160, flexShrink: 0, fontSize: 14, fontWeight: 600, color: colors.navy, paddingTop: 10 }}>{field.label}:</div>
                    <div style={{ flex: 1, background: "#fff", border: `1px solid ${colors.border}`, borderRadius: 8, padding: "10px 14px", fontSize: 14, color: colors.textLight, lineHeight: 1.5, minHeight: field.label === "What baby did" || field.label === "Notes" ? 60 : 40 }}>{field.placeholder}</div>
                  </div>
                ))}
              </div>
              <p style={{ fontSize: 13, color: colors.textLight, textAlign: "center", marginTop: 16, marginBottom: 0, fontStyle: "italic" }}>Figure 9 — Copy this template and fill it in after each session</p>
            </Card>
          </Section>

          <Section>
            <Card style={{ background: colors.goldLight, border: `1px solid ${colors.gold}40` }}>
              <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 20, fontWeight: 700, color: colors.navy, marginBottom: 8 }}>We&apos;ll Report Back</div>
              <p style={{ fontSize: 15, lineHeight: 1.7, margin: 0 }}>We haven&apos;t run these experiments yet — our baby is approaching the right age window. We plan to try them over the coming weeks and update this section with what worked, what surprised us, and which experiments were favorites. Check back for real-world observations from a sample size of one very specific baby.</p>
            </Card>
          </Section>

          <Section bg={colors.card}>
            <SectionTitle color={colors.accent}>References</SectionTitle>

            <Card accent={colors.accent}>
              <div style={{ fontSize: 14, lineHeight: 1.8, color: colors.text }}>
                <p style={{ margin: "0 0 12px" }}>1. Adamson, L. B., &amp; Frick, J. E. (2003). The still-face: A history of a shared experimental paradigm. <em>Infancy</em>, 4(4), 451–473.</p>
                <p style={{ margin: "0 0 12px" }}>2. Barr, R., Dowden, A., &amp; Hayne, H. (1996). Developmental changes in deferred imitation by 6- to 24-month-old infants. <em>Infant Behavior and Development</em>, 19(2), 159–170.</p>
                <p style={{ margin: "0 0 12px" }}>3. Bruner, J. S., &amp; Sherwood, V. (1976). Peekaboo and the learning of rule structures. In J. S. Bruner, A. Jolly, &amp; K. Sylva (Eds.), <em>Play: Its role in development and evolution</em> (pp. 277–285). Penguin.</p>
                <p style={{ margin: "0 0 12px" }}>4. Collie, R., &amp; Hayne, H. (1999). Deferred imitation by 6- and 9-month-old infants: More evidence for declarative memory. <em>Developmental Psychobiology</em>, 35(2), 83–90.</p>
                <p style={{ margin: "0 0 12px" }}>5. Montague, D. P. F., &amp; Walker-Andrews, A. S. (2001). Peekaboo: A new look at infants&apos; perception of emotion expressions. <em>Developmental Psychology</em>, 37(6), 826–838.</p>
                <p style={{ margin: "0 0 12px" }}>6. Rovee, C. K., &amp; Rovee, D. T. (1969). Conjugate reinforcement of infant exploratory behavior. <em>Journal of Experimental Child Psychology</em>, 8(1), 33–39.</p>
                <p style={{ margin: "0 0 12px" }}>7. Rovee-Collier, C. (1999). The development of infant memory. <em>Current Directions in Psychological Science</em>, 8(3), 80–85.</p>
                <p style={{ margin: 0 }}>8. Tronick, E., Als, H., Adamson, L., Wise, S., &amp; Brazelton, T. B. (1978). The infant&apos;s response to entrapment between contradictory messages in face-to-face interaction. <em>Journal of the American Academy of Child Psychiatry</em>, 17(1), 1–13.</p>
              </div>
            </Card>
          </Section>
        </>
      )}

      {/* ═══════════════════════ CONCLUSION FOOTER ═══════════════════════ */}
      <div style={{ background: `linear-gradient(135deg, ${colors.navy} 0%, #0F2B22 100%)`, padding: "48px 24px", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, opacity: 0.06, background: "repeating-linear-gradient(45deg, transparent, transparent 30px, rgba(255,255,255,0.1) 30px, rgba(255,255,255,0.1) 60px)" }}></div>
        <div style={{ position: "relative", maxWidth: 600, margin: "0 auto" }}>
          <p style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 22, fontWeight: 700, color: "#fff", margin: 0, lineHeight: 1.4 }}>4 experiments &middot; 8 landmark studies &middot; 1 curious baby</p>
          <p style={{ fontSize: 15, color: "rgba(255,255,255,0.6)", marginTop: 12, lineHeight: 1.5 }}>Remember: these are explorations, not evaluations.</p>
        </div>
      </div>

      {/* FOOTER */}
      <div style={{ background: colors.navy, padding: "32px 24px", textAlign: "center" }}>
        <p style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", margin: 0, lineHeight: 1.6 }}>Home adaptations of published developmental psychology paradigms.<br />Not diagnostic tools. Not a substitute for professional evaluation.</p>
      </div>

      {/* COMMENTS */}
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 24px 48px" }}>
        <GiscusComments locale="en" term="/guides/infant-experiments" />
      </div>
    </div>
  );
}
