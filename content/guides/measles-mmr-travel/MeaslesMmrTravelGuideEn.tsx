"use client";

import { useState } from "react";

import { AudioPlayer } from "@/components/AudioPlayer";
import { Badge } from "@/components/Badge";
import { Callout } from "@/components/Callout";
import { GiscusComments } from "@/components/GiscusComments";
import { Source } from "@/components/Source";
import { DataTable } from "@/components/Table";

const sections = [
  { id: "why-now", icon: "📈", title: "Why now", subtitle: "The April 2026 picture" },
  { id: "routine-schedule", icon: "💉", title: "Routine MMR", subtitle: "12–15 months and 4–6 years" },
  { id: "travel-dose", icon: "✈️", title: "Travel dose 6–11 mo", subtitle: "The key infant decision" },
  { id: "protected", icon: "🛡️", title: "What counts as protected", subtitle: "Records, not memory" },
  { id: "before-travel", icon: "🧳", title: "Before travel", subtitle: "Timeline checklist" },
  { id: "after-exposure", icon: "🚨", title: "After exposure", subtitle: "Call ahead, same day" },
  { id: "travel-checklist", icon: "✅", title: "Travel checklist", subtitle: "Final printable list" },
];

const quickAnswers = [
  {
    label: "Routine start",
    body: "Routine MMR starts at 12–15 months.",
  },
  {
    label: "Travel dose",
    body: "Babies 6–11 months old who will travel internationally should get 1 early MMR dose before departure.",
  },
  {
    label: "Does not count",
    body: "That early dose does not count toward the routine 2-dose series after the first birthday.",
  },
  {
    label: "After exposure",
    body: "After exposure, call ahead immediately; MMR may help within 72 hours and immune globulin may help within 6 days.",
  },
];

function WhyNowSection() {
  return (
    <div>
      <p className="text-stone-600 leading-relaxed mb-4">
        Measles is back on many U.S. parents&apos; radars in 2026. On{" "}
        <strong>April 17, 2026</strong>, CDC reported{" "}
        <strong>1,748 confirmed U.S. cases as of April 16, 2026</strong>. That is
        the dated snapshot behind this guide — case counts can change week to
        week, so treat the number as a marker, not a forecast.
      </p>

      <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 my-5 text-center">
        <div className="text-xs uppercase tracking-widest text-amber-700 font-semibold mb-2">
          CDC snapshot
        </div>
        <div className="text-4xl md:text-5xl font-black text-stone-900 tabular-nums">
          1,748
        </div>
        <div className="text-sm text-stone-600 mt-1">
          confirmed U.S. measles cases as of April 16, 2026
        </div>
      </div>

      <h3 className="font-bold text-stone-800 mt-6 mb-3 text-lg">
        Why this matters for babies
      </h3>
      <p className="text-stone-600 leading-relaxed mb-3">
        Measles is one of the most contagious viruses known to medicine. The
        virus can linger in the air and on surfaces for up to{" "}
        <strong>2 hours</strong> after an infected person leaves the space, and
        it spreads easily to anyone nearby who is not immune. In a fully
        susceptible group, a single case can infect roughly 9 out of every 10
        close contacts.
      </p>
      <p className="text-stone-600 leading-relaxed">
        The hardest group to protect is <strong>babies under 12 months</strong>{" "}
        — too young for the routine first MMR dose. For families with infants,
        the practical questions are narrow: when does routine protection start,
        when does a baby need an early travel dose, and what do you do right
        away if you think you&apos;ve been exposed.
      </p>

      <div className="mt-4 flex flex-wrap gap-3">
        <Source
          name="CDC – Measles Cases and Outbreaks"
          url="https://www.cdc.gov/measles/data-research/index.html"
        />
        <Source
          name="CDC – How Measles Spreads"
          url="https://www.cdc.gov/measles/causes/index.html"
        />
      </div>
    </div>
  );
}

function RoutineScheduleSection() {
  return (
    <div>
      <p className="text-stone-600 leading-relaxed mb-4">
        The routine MMR schedule in the U.S. is two doses. Dose 1 is at{" "}
        <strong>12–15 months</strong>. Dose 2 is at <strong>4–6 years</strong>.
        That pattern does not change just because you are traveling.
      </p>

      <DataTable
        headers={["Dose", "Age", "What it does"]}
        rows={[
          [
            <Badge key="d1" color="blue">
              Dose 1
            </Badge>,
            "12–15 months",
            "Starts routine protection",
          ],
          [
            <Badge key="d2" color="blue">
              Dose 2
            </Badge>,
            "4–6 years",
            "Completes routine series",
          ],
          [
            <Badge key="d3" color="amber">
              Travel exception
            </Badge>,
            "12+ months with trip coming",
            "Dose 2 can be accelerated if dose 1 was at least 28 days ago",
          ],
        ]}
      />

      <Callout type="info" title="Practical travel note for toddlers">
        If your child is already <strong>12 months or older</strong> and has only
        had the first MMR dose, dose 2 can be given earlier than the usual 4–6
        year window for international travel — as long as it has been at least{" "}
        <strong>28 days</strong> since dose 1. Ask your pediatrician whether
        accelerating dose 2 makes sense for your trip.
      </Callout>

      <p className="text-sm text-stone-500 mt-4">
        For a broader look at the full childhood schedule, see{" "}
        <a
          href="/guides/immunization-schedule"
          className="text-amber-700 underline underline-offset-2 hover:text-amber-900"
        >
          Childhood Immunization Guide (US, 2026)
        </a>
        .
      </p>

      <div className="mt-4 flex flex-wrap gap-3">
        <Source
          name="CDC – Measles Vaccine Recommendations"
          url="https://www.cdc.gov/measles/hcp/vaccine-considerations/index.html"
        />
        <Source
          name="CDC – Child Immunization Schedule Notes"
          url="https://www.cdc.gov/vaccines/hcp/imz-schedules/child-adolescent-notes.html"
        />
      </div>
    </div>
  );
}

function TravelDoseSection() {
  return (
    <div>
      <p className="text-stone-600 leading-relaxed mb-4">
        This is the key decision for families with an infant and an
        international trip on the calendar. The short version: if your baby is{" "}
        <strong>6–11 months</strong> old and will travel internationally, CDC
        recommends <strong>one</strong> MMR dose <strong>before departure</strong>.
      </p>

      <DataTable
        headers={["Age", "What to do", "Notes"]}
        rows={[
          [
            <Badge key="a1" color="red">
              0–5 months
            </Badge>,
            "No MMR travel dose",
            "Call pediatrician about exposure planning and destination risk",
          ],
          [
            <Badge key="a2" color="amber">
              6–11 months
            </Badge>,
            "1 early MMR dose before international travel",
            "Still needs 2 more doses later on the routine schedule",
          ],
          [
            <Badge key="a3" color="green">
              12+ months
            </Badge>,
            "Finish age-appropriate 2-dose protection before travel if possible",
            "Dose 2 can be accelerated 28+ days after dose 1",
          ],
        ]}
      />

      <Callout type="tip" title="Ideal timing vs. realistic timing">
        CDC advises getting the travel dose ideally at least{" "}
        <strong>2 weeks before departure</strong> so the immune response has time
        to develop. If the trip is sooner than that, <strong>still get a dose</strong>
        — it is better to have partial protection than none at all.
      </Callout>

      <Callout type="warn" title="The early dose does not replace routine doses">
        An MMR dose given before the first birthday does{" "}
        <strong>not count</strong> toward the routine 2-dose series. A baby who
        gets an early travel dose at, say, 9 months still needs the regular dose
        at 12–15 months and a second dose at 4–6 years. Three total shots for
        that baby, not two.
      </Callout>

      <Callout type="danger" title="Under 6 months: no measles vaccine">
        CDC does <strong>not</strong> recommend measles vaccine for infants
        younger than <strong>6 months</strong>. For babies in that age range,
        protection relies on avoiding high-risk exposures, making sure every
        adult in the household is up to date, and calling your pediatrician
        immediately if exposure is possible.
      </Callout>

      <div className="mt-4 flex flex-wrap gap-3">
        <Source
          name="CDC – Plan for Travel"
          url="https://www.cdc.gov/measles/travel/index.html"
        />
        <Source
          name="CDC – Measles Vaccine Recommendations"
          url="https://www.cdc.gov/measles/hcp/vaccine-considerations/index.html"
        />
      </div>
    </div>
  );
}

function ProtectedSection() {
  return (
    <div>
      <p className="text-stone-600 leading-relaxed mb-4">
        &quot;We probably had it&quot; is not a protection plan. Before any
        trip, know what actually counts as evidence of immunity for every
        traveler in your party.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
        <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
          <h4 className="font-bold text-emerald-800 mb-2 flex items-center gap-2">
            <span>{"\u2713"}</span> Protected / acceptable evidence
          </h4>
          <ul className="text-sm text-emerald-900 space-y-1.5">
            <li>Written vaccine records showing age-appropriate MMR doses</li>
            <li>Lab evidence of immunity (positive measles IgG)</li>
            <li>Lab-confirmed prior measles infection</li>
            <li>Birth before 1957 (for U.S. adults)</li>
          </ul>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <h4 className="font-bold text-red-800 mb-2 flex items-center gap-2">
            <span>{"\u2717"}</span> Not enough
          </h4>
          <ul className="text-sm text-red-900 space-y-1.5">
            <li>Family memory without written records</li>
            <li>&quot;I think I had the shot as a kid&quot;</li>
            <li>A childhood rash that was never lab-confirmed</li>
          </ul>
        </div>
      </div>

      <h3 className="font-bold text-stone-800 mt-6 mb-3 text-lg">
        How many doses is the standard
      </h3>
      <p className="text-stone-600 leading-relaxed mb-3">
        For most international travelers born during or after{" "}
        <strong>1957</strong>, <strong>2 documented doses</strong> of MMR is the
        standard to aim for. Infants getting an early travel dose at 6–11 months
        are the explicit exception — one dose before travel, then two more on
        the routine schedule.
      </p>

      <Callout type="tip" title="No written record? Just get another dose">
        If an adult traveler is unsure whether they were fully vaccinated and
        can&apos;t find a written record, CDC says there is{" "}
        <strong>no harm in getting another MMR dose</strong>. Titers are an
        option too, but for most families another shot is faster, cheaper, and
        settles the question.
      </Callout>

      <div className="mt-4 flex flex-wrap gap-3">
        <Source
          name="CDC – Questions About Measles"
          url="https://www.cdc.gov/measles/about/questions.html"
        />
        <Source
          name="CDC – Measles Vaccine Recommendations"
          url="https://www.cdc.gov/measles/hcp/vaccine-considerations/index.html"
        />
      </div>
    </div>
  );
}

function BeforeTravelSection() {
  return (
    <div>
      <p className="text-stone-600 leading-relaxed mb-4">
        Most of the work happens before you leave the house. Use this timeline
        in reverse — the earlier you start, the more options you have.
      </p>

      <DataTable
        headers={["When", "What to do", "Why it matters"]}
        rows={[
          [
            <Badge key="t1" color="blue">
              Trip booked
            </Badge>,
            "Check everyone's vaccine records, not memory",
            "You want documents in hand before calling the pediatrician",
          ],
          [
            <Badge key="t2" color="green">
              2+ weeks before
            </Badge>,
            "Get needed MMR doses if possible",
            "Immune response has time to develop before departure",
          ],
          [
            <Badge key="t3" color="amber">
              Less than 2 weeks before
            </Badge>,
            "Still get a dose if not protected",
            "Partial protection is better than none",
          ],
          [
            <Badge key="t4" color="blue">
              Before leaving
            </Badge>,
            "Check the CDC destination page and travel notices",
            "Local outbreaks and itinerary risks change fast",
          ],
          [
            <Badge key="t5" color="purple">
              After return
            </Badge>,
            "Watch for symptoms for 3 weeks",
            "Measles can incubate up to ~21 days after exposure",
          ],
        ]}
      />

      <Callout type="info" title="Pull written records, not memory">
        Your pediatrician or pharmacy can print a vaccine record. Many states
        also have an online immunization registry. A screenshot or printout you
        can show a clinician beats any conversation that starts with &quot;I
        think…&quot;
      </Callout>

      <div className="mt-4 flex flex-wrap gap-3">
        <Source
          name="CDC – Plan for Travel"
          url="https://www.cdc.gov/measles/travel/index.html"
        />
      </div>
    </div>
  );
}

function AfterExposureSection() {
  return (
    <div>
      <Callout type="danger" title="Call ahead. Do not walk into a waiting room.">
        Call your pediatrician or clinic immediately and say you may have had a
        measles exposure. Walking into a shared waiting room with suspected
        measles can infect other vulnerable patients. Most clinics will route
        you to a separate entrance, triage by phone, or send you to the right
        place.
      </Callout>

      <h3 className="font-bold text-stone-800 mt-6 mb-3 text-lg">
        Post-exposure options are time-sensitive
      </h3>
      <p className="text-stone-600 leading-relaxed mb-3">
        Two possible preventive measures exist after a known or suspected
        measles exposure, and both have windows:
      </p>

      <DataTable
        headers={["Option", "Window", "When it is considered"]}
        rows={[
          [
            <Badge key="o1" color="amber">
              MMR
            </Badge>,
            "Within 72 hours of exposure",
            "For eligible contacts who are not already protected",
          ],
          [
            <Badge key="o2" color="blue">
              Immune globulin
            </Badge>,
            "Within 6 days of exposure",
            "For infants, pregnant people without evidence of immunity, and severely immunocompromised patients",
          ],
        ]}
      />

      <Callout type="warn" title="Clinicians and public health choose which option fits">
        The choice between post-exposure MMR and immune globulin depends on age,
        immune status, pregnancy, and how long ago the exposure was. Your
        pediatrician, the clinic, and local public health decide — your job is
        to call fast and share the exposure details accurately.
      </Callout>

      <Callout type="info" title="Not at the same time">
        MMR and immune globulin should <strong>not</strong> be given at the
        same time. Getting one changes when the other can be given, which is
        another reason clinicians make the call.
      </Callout>

      <h3 className="font-bold text-stone-800 mt-6 mb-3 text-lg">
        What measles looks like
      </h3>
      <p className="text-stone-600 leading-relaxed mb-3">
        Symptoms usually appear 7–14 days after exposure and follow a distinct
        pattern:
      </p>
      <DataTable
        headers={["Stage", "What you see"]}
        compact
        rows={[
          ["Days 1–4", "Fever, cough, runny nose, red watery eyes (the 3 C's)"],
          ["Days 3–5", "Tiny white spots (Koplik spots) can appear inside the cheeks"],
          [
            "Days 4–7",
            "Red, blotchy rash starting on the face at the hairline and spreading downward to the trunk, arms, and legs",
          ],
        ]}
      />

      <Callout type="danger" title="Same-day action, not next-week action">
        If measles is possible — fever plus rash, recent international travel,
        known exposure to a case — treat it as a same-day call. Stay home, keep
        the baby home, and phone before going anywhere.
      </Callout>

      <div className="mt-4 flex flex-wrap gap-3">
        <Source
          name="CDC – Measles Vaccine Recommendations"
          url="https://www.cdc.gov/measles/hcp/vaccine-considerations/index.html"
        />
        <Source
          name="CDC – Measles Symptoms and Complications"
          url="https://www.cdc.gov/measles/signs-symptoms/index.html"
        />
        <Source
          name="CDC – Questions About Measles"
          url="https://www.cdc.gov/measles/about/questions.html"
        />
      </div>
    </div>
  );
}

function TravelChecklistSection() {
  const items = [
    "Check written vaccine records for every traveler",
    "If baby is 6–11 months and traveling internationally, ask for an early MMR dose",
    "If child is 12+ months and not fully vaccinated, ask whether dose 2 should be accelerated before travel",
    "Save your pediatrician's after-hours number",
    "Watch for fever + rash for 3 weeks after return",
    "If measles is possible, stay home and call before going in",
  ];

  return (
    <div>
      <p className="text-stone-600 leading-relaxed mb-4">
        A short, printable pass before you lock the suitcase. If anything here
        is a no, that is the item to resolve first.
      </p>

      <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 my-4">
        <ul className="space-y-2.5 text-sm text-stone-800">
          {items.map((item, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="text-amber-700 mt-0.5 font-bold">{"\u25FB"}</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <p className="text-sm text-stone-500 mt-4">
        Cross-link:{" "}
        <a
          href="/guides/immunization-schedule"
          className="text-amber-700 underline underline-offset-2 hover:text-amber-900"
        >
          Childhood Immunization Guide (US, 2026)
        </a>{" "}
        for the full schedule context.
      </p>
    </div>
  );
}

const contentMap: Record<string, React.ReactNode> = {
  "why-now": <WhyNowSection />,
  "routine-schedule": <RoutineScheduleSection />,
  "travel-dose": <TravelDoseSection />,
  protected: <ProtectedSection />,
  "before-travel": <BeforeTravelSection />,
  "after-exposure": <AfterExposureSection />,
  "travel-checklist": <TravelChecklistSection />,
};

export default function MeaslesMmrTravelGuideEn() {
  const [activeSection, setActiveSection] = useState("why-now");
  const active = sections.find((s) => s.id === activeSection)!;

  return (
    <div>
      {/* Hero */}
      <div className="bg-stone-900 text-white px-4 py-8 md:py-12">
        <div className="max-w-4xl mx-auto">
          <div
            className="text-amber-400 text-xs font-bold tracking-widest uppercase mb-3"
            style={{ fontFamily: "system-ui, sans-serif" }}
          >
            Guide · Measles & Travel
          </div>
          <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-3">
            Measles, MMR, and Travel With Babies
            <span className="block text-stone-400 text-lg md:text-xl font-semibold mt-1">
              U.S., April 2026
            </span>
          </h1>
          <p className="text-stone-300 text-base md:text-lg leading-relaxed">
            If you are traveling with a baby, the key measles questions are
            practical, not political: when routine MMR starts, when a 6–11
            month infant should get an early travel dose, what counts as
            actually protected, and what to do right away after an exposure.
          </p>
          <p
            className="text-stone-500 text-xs mt-4"
            style={{ fontFamily: "system-ui, sans-serif" }}
          >
            Checked against CDC measles guidance on April 19, 2026. Case counts
            can change weekly.
          </p>
        </div>
      </div>

      {/* Quick-answer strip */}
      <div className="max-w-4xl mx-auto px-4 pt-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {quickAnswers.map((qa, i) => (
            <div
              key={i}
              className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex flex-col"
            >
              <div className="text-[10px] uppercase tracking-widest text-amber-700 font-semibold mb-1.5">
                {qa.label}
              </div>
              <p className="text-sm text-stone-900 leading-snug font-medium">
                {qa.body}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 pt-4">
        <AudioPlayer locale="en" contentKey="guides/measles-mmr-travel" />
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Section nav */}
        <div className="flex flex-wrap gap-2 mb-8">
          {sections.map((s) => (
            <button
              key={s.id}
              onClick={() => setActiveSection(s.id)}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all ${
                activeSection === s.id
                  ? "bg-stone-900 text-white shadow-lg"
                  : "bg-white text-stone-600 hover:bg-stone-200 border border-stone-200"
              }`}
              style={{ fontFamily: "system-ui, sans-serif" }}
            >
              <span>{s.icon}</span>
              <span className="font-medium">{s.title}</span>
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="bg-white rounded-xl shadow-sm border border-stone-200 p-6 md:p-8">
          <div className="flex items-center gap-3 mb-1">
            <span className="text-2xl">{active.icon}</span>
            <div>
              <h2 className="text-2xl font-bold text-stone-900">
                {active.title}
              </h2>
              <p
                className="text-stone-400 text-sm"
                style={{ fontFamily: "system-ui, sans-serif" }}
              >
                {active.subtitle}
              </p>
            </div>
          </div>
          <hr className="my-4 border-stone-200" />
          <div style={{ fontFamily: "system-ui, sans-serif" }}>
            {contentMap[activeSection]}
          </div>
        </div>

        {/* Footer nav */}
        <div className="flex justify-between mt-6 mb-12">
          {(() => {
            const idx = sections.findIndex((s) => s.id === activeSection);
            const prev = idx > 0 ? sections[idx - 1] : null;
            const next = idx < sections.length - 1 ? sections[idx + 1] : null;
            return (
              <>
                {prev ? (
                  <button
                    onClick={() => setActiveSection(prev.id)}
                    className="text-sm text-stone-500 hover:text-stone-800 flex items-center gap-1"
                    style={{ fontFamily: "system-ui, sans-serif" }}
                  >
                    {"\u2190"} {prev.icon} {prev.title}
                  </button>
                ) : (
                  <div />
                )}
                {next ? (
                  <button
                    onClick={() => setActiveSection(next.id)}
                    className="text-sm text-stone-500 hover:text-stone-800 flex items-center gap-1"
                    style={{ fontFamily: "system-ui, sans-serif" }}
                  >
                    {next.title} {next.icon} {"\u2192"}
                  </button>
                ) : (
                  <div />
                )}
              </>
            );
          })()}
        </div>

        <GiscusComments locale="en" term="/guides/measles-mmr-travel" />
      </div>
    </div>
  );
}
