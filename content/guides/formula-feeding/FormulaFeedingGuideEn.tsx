"use client";

import { useState } from "react";
import { DataTable } from "@/components/Table";
import { Callout } from "@/components/Callout";
import { Source } from "@/components/Source";
import { GiscusComments } from "@/components/GiscusComments";

function WeightCalculator() {
  const [unit, setUnit] = useState<"kg" | "lb">("kg");
  const [weight, setWeight] = useState("");

  const weightKg =
    unit === "kg" ? parseFloat(weight) : parseFloat(weight) * 0.453592;
  const isValid = !isNaN(weightKg) && weightKg > 0 && weightKg <= 12;
  const dailyMl = isValid ? Math.round(weightKg * 163) : 0;
  const dailyOz = isValid ? (dailyMl / 29.5735).toFixed(1) : "0";
  const perFeedMl6 = isValid ? Math.round(dailyMl / 6) : 0;
  const perFeedMl8 = isValid ? Math.round(dailyMl / 8) : 0;

  return (
    <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-6 md:p-8 my-8">
      <h3 className="text-lg font-bold text-stone-800 mb-1">
        Formula Intake Calculator
      </h3>
      <p className="text-sm text-stone-500 mb-5">
        Enter your baby&apos;s weight to estimate daily formula needs
      </p>

      <div className="flex items-center gap-3 mb-6">
        <div className="relative flex-1 max-w-[200px]">
          <input
            type="number"
            inputMode="decimal"
            step="0.1"
            min="0"
            max={unit === "kg" ? "12" : "26"}
            placeholder={unit === "kg" ? "e.g. 4.5" : "e.g. 10"}
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="w-full rounded-xl border border-stone-300 bg-white px-4 py-3 text-lg font-medium text-stone-800 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-200"
          />
        </div>
        <div className="flex rounded-lg border border-stone-300 overflow-hidden">
          <button
            onClick={() => setUnit("kg")}
            className={`px-3 py-2.5 text-sm font-medium transition-colors ${
              unit === "kg"
                ? "bg-stone-800 text-white"
                : "bg-white text-stone-500 hover:bg-stone-100"
            }`}
          >
            kg
          </button>
          <button
            onClick={() => setUnit("lb")}
            className={`px-3 py-2.5 text-sm font-medium transition-colors ${
              unit === "lb"
                ? "bg-stone-800 text-white"
                : "bg-white text-stone-500 hover:bg-stone-100"
            }`}
          >
            lb
          </button>
        </div>
      </div>

      {isValid && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white rounded-xl p-4 border border-amber-100 text-center">
            <div className="text-3xl font-black text-amber-600">{dailyMl}</div>
            <div className="text-xs text-stone-500 mt-1">mL / day</div>
            <div className="text-sm text-stone-400">({dailyOz} oz)</div>
          </div>
          <div className="bg-white rounded-xl p-4 border border-amber-100 text-center">
            <div className="text-3xl font-black text-sky-600">
              {perFeedMl8}–{perFeedMl6}
            </div>
            <div className="text-xs text-stone-500 mt-1">mL / feed</div>
            <div className="text-sm text-stone-400">6–8 feeds/day</div>
          </div>
          <div className="bg-white rounded-xl p-4 border border-amber-100 text-center">
            <div className="text-3xl font-black text-emerald-600">
              {dailyMl > 960 ? "!" : "✓"}
            </div>
            <div className="text-xs text-stone-500 mt-1">
              {dailyMl > 960 ? "Exceeds 960 mL ceiling" : "Within normal range"}
            </div>
            <div className="text-sm text-stone-400">
              {dailyMl > 960 ? "Talk to pediatrician" : "≤ 960 mL/day"}
            </div>
          </div>
        </div>
      )}

      {isValid && dailyMl > 960 && (
        <p className="text-sm text-amber-700 mt-3 bg-amber-100 rounded-lg px-3 py-2">
          The estimated intake exceeds the typical 32 oz (960 mL) daily ceiling.
          This is worth discussing with your pediatrician — it does not
          automatically mean you should start solids.
        </p>
      )}
    </div>
  );
}

function AgeProgressionTimeline() {
  const stages = [
    {
      age: "Day 1–2",
      perFeed: "15–30 mL",
      perFeedOz: "0.5–1 oz",
      feeds: "8–12",
      color: "bg-rose-100 border-rose-300 text-rose-800",
      dot: "bg-rose-400",
      note: "Tiny amounts are normal — stomach is marble-sized",
    },
    {
      age: "Week 1",
      perFeed: "30–60 mL",
      perFeedOz: "1–2 oz",
      feeds: "8–12",
      color: "bg-orange-100 border-orange-300 text-orange-800",
      dot: "bg-orange-400",
      note: "Ramping up as stomach grows",
    },
    {
      age: "2–4 weeks",
      perFeed: "60–120 mL",
      perFeedOz: "2–4 oz",
      feeds: "6–8",
      color: "bg-amber-100 border-amber-300 text-amber-800",
      dot: "bg-amber-400",
      note: "Feeds getting bigger, slightly less frequent",
    },
    {
      age: "~2 months",
      perFeed: "120–150 mL",
      perFeedOz: "4–5 oz",
      feeds: "6–8",
      color: "bg-yellow-100 border-yellow-300 text-yellow-800",
      dot: "bg-yellow-500",
      note: "Settling into a rhythm",
    },
    {
      age: "~4 months",
      perFeed: "150–180 mL",
      perFeedOz: "5–6 oz",
      feeds: "5–6",
      color: "bg-lime-100 border-lime-300 text-lime-800",
      dot: "bg-lime-500",
      note: "Bigger bottles, fewer feeds",
    },
    {
      age: "~6 months",
      perFeed: "180–240 mL",
      perFeedOz: "6–8 oz",
      feeds: "4–5",
      color: "bg-emerald-100 border-emerald-300 text-emerald-800",
      dot: "bg-emerald-500",
      note: "Plateau — daily total levels off around 900–960 mL",
    },
  ];

  return (
    <div className="my-8">
      <h3 className="text-lg font-bold text-stone-800 mb-2">
        Age-Based Feeding Progression
      </h3>
      <p className="text-sm text-stone-500 mb-6">
        Approximate per-feed amounts — these are examples, not strict rules
      </p>

      {/* Desktop: horizontal timeline */}
      <div className="hidden md:block">
        <div className="relative">
          {/* Timeline bar */}
          <div className="absolute top-5 left-0 right-0 h-1 bg-gradient-to-r from-rose-300 via-amber-300 to-emerald-300 rounded-full" />

          <div className="grid grid-cols-6 gap-2 relative">
            {stages.map((s, i) => (
              <div key={i} className="flex flex-col items-center">
                {/* Dot */}
                <div
                  className={`w-3 h-3 rounded-full ${s.dot} ring-4 ring-white z-10 mb-3`}
                />
                {/* Card */}
                <div
                  className={`${s.color} border rounded-xl p-3 w-full text-center`}
                >
                  <div className="font-bold text-xs mb-1">{s.age}</div>
                  <div className="text-lg font-black">{s.perFeed}</div>
                  <div className="text-xs opacity-70">{s.perFeedOz}</div>
                  <div className="text-xs mt-1 opacity-60">
                    {s.feeds} feeds/day
                  </div>
                </div>
                <p className="text-xs text-stone-400 mt-2 text-center leading-tight">
                  {s.note}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile: vertical timeline */}
      <div className="md:hidden space-y-0">
        {stages.map((s, i) => (
          <div key={i} className="flex gap-4">
            {/* Vertical line + dot */}
            <div className="flex flex-col items-center">
              <div
                className={`w-3 h-3 rounded-full ${s.dot} ring-2 ring-white flex-shrink-0`}
              />
              {i < stages.length - 1 && (
                <div className="w-0.5 flex-1 bg-stone-200" />
              )}
            </div>
            {/* Card */}
            <div className={`${s.color} border rounded-xl p-3 mb-3 flex-1`}>
              <div className="flex items-baseline justify-between">
                <span className="font-bold text-sm">{s.age}</span>
                <span className="text-xs opacity-60">{s.feeds} feeds/day</span>
              </div>
              <div className="text-xl font-black mt-1">
                {s.perFeed}{" "}
                <span className="text-sm font-normal opacity-70">
                  ({s.perFeedOz})
                </span>
              </div>
              <p className="text-xs opacity-60 mt-1">{s.note}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function QuickWeightTable() {
  return (
    <div className="my-8">
      <h3 className="text-lg font-bold text-stone-800 mb-2">
        Quick Reference: Weight → Daily Intake
      </h3>
      <p className="text-sm text-stone-500 mb-4">
        Based on the 163 mL/kg/day rule of thumb (≈ 2.5 oz/lb/day)
      </p>
      <DataTable
        headers={[
          "Weight",
          "Daily Total",
          "Per Feed (6–8 feeds)",
          "Typical Age",
        ]}
        rows={[
          [
            "2.5 kg (5.5 lb)",
            "~408 mL (14 oz)",
            "51–68 mL (1.7–2.3 oz)",
            "Premature / small newborn",
          ],
          [
            "3.0 kg (6.6 lb)",
            "~489 mL (17 oz)",
            "61–82 mL (2.1–2.8 oz)",
            "Newborn",
          ],
          [
            "3.5 kg (7.7 lb)",
            "~571 mL (19 oz)",
            "71–95 mL (2.4–3.2 oz)",
            "Newborn",
          ],
          [
            "4.0 kg (8.8 lb)",
            "~652 mL (22 oz)",
            "82–109 mL (2.8–3.7 oz)",
            "~2–4 weeks",
          ],
          [
            "5.0 kg (11 lb)",
            "~815 mL (28 oz)",
            "102–136 mL (3.5–4.6 oz)",
            "~2 months",
          ],
          [
            "6.0 kg (13.2 lb)",
            "~960 mL (32 oz)",
            "120–160 mL (4–5.4 oz)",
            "~3–4 months",
          ],
          [
            "7.0 kg (15.4 lb)",
            "~960 mL (32 oz)*",
            "160–192 mL (5.4–6.5 oz)",
            "~4–5 months",
          ],
          [
            "8.0 kg (17.6 lb)",
            "~960 mL (32 oz)*",
            "160–240 mL (5.4–8 oz)",
            "~6 months",
          ],
        ]}
      />
      <p className="text-xs text-stone-400 mt-2">
        * Daily totals plateau around 960 mL (32 oz). Above this, talk to your
        pediatrician rather than increasing formula on your own.
      </p>
    </div>
  );
}

export default function FormulaFeedingGuidePage() {
  return (
    <div>
      {/* Hero */}
      <div className="bg-stone-900 text-white px-4 py-8 md:py-12">
        <div className="max-w-4xl mx-auto">
          <div
            className="text-amber-400 text-xs font-bold tracking-widest uppercase mb-3"
            style={{ fontFamily: "system-ui, sans-serif" }}
          >
            Quick Reference Guide
          </div>
          <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-2">
            How Much Formula Does My Baby Need?
          </h1>
          <p className="text-stone-400 text-lg">
            A weight-based formula, age-based chart, and interactive calculator
          </p>
          <p
            className="text-stone-500 text-xs mt-4"
            style={{ fontFamily: "system-ui, sans-serif" }}
          >
            For healthy, full-term, formula-fed infants &bull; Sourced from AAP,
            CDC, and Seattle Children&apos;s Hospital
          </p>
        </div>
      </div>

      <div
        className="max-w-4xl mx-auto px-4 py-8"
        style={{ fontFamily: "system-ui, sans-serif" }}
      >
        {/* The Master Rule */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-stone-900 mb-4">
            The Rule of Thumb
          </h2>
          <p className="text-stone-600 leading-relaxed mb-6">
            The AAP offers a useful average guideline: a healthy, full-term,
            formula-fed baby should take in about{" "}
            <strong>2.5 ounces of formula per pound of body weight per day</strong>.
            This converts neatly:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
            {[
              {
                label: "Per pound",
                value: "75 mL",
                sub: "2.5 oz / lb / day",
                color: "border-sky-200 bg-sky-50",
                accent: "text-sky-700",
              },
              {
                label: "Per kilogram",
                value: "163 mL",
                sub: "≈ 5.5 oz / kg / day",
                color: "border-amber-200 bg-amber-50",
                accent: "text-amber-700",
              },
              {
                label: "Daily ceiling",
                value: "960 mL",
                sub: "32 oz — upper guideline",
                color: "border-stone-200 bg-stone-50",
                accent: "text-stone-700",
              },
            ].map((card) => (
              <div
                key={card.label}
                className={`${card.color} border rounded-xl p-5 text-center`}
              >
                <div className="text-xs font-medium text-stone-500 uppercase tracking-wide mb-1">
                  {card.label}
                </div>
                <div className={`text-3xl font-black ${card.accent}`}>
                  {card.value}
                </div>
                <div className="text-sm text-stone-400 mt-1">{card.sub}</div>
              </div>
            ))}
          </div>

          <p className="text-stone-600 leading-relaxed">
            This is elegant because it automatically scales with growth. A 3.5 kg
            newborn needs about 571 mL/day; a 5 kg two-month-old needs about
            815 mL/day. The formula self-adjusts.
          </p>

          <Callout type="warn" title="The first few days are different">
            In the first 1–2 days of life, babies often take much smaller
            volumes — sometimes only about 0.5 oz (15 mL) per feed. The
            weight-based rule is best treated as an average target that kicks in
            as feeding ramps up, not a day-1 prescription. Start by offering 1–2
            oz (30–60 mL) every 2–3 hours, and let baby guide you.
          </Callout>
        </section>

        {/* Calculator */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-stone-900 mb-2">
            Calculate Your Baby&apos;s Needs
          </h2>
          <WeightCalculator />
        </section>

        {/* Age Progression */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-stone-900 mb-2">
            How Feeding Changes Over Time
          </h2>
          <p className="text-stone-600 leading-relaxed mb-4">
            A handy pattern: you roughly add about 1 oz (~30 mL) per feed per
            month until baby hits 6–8 oz per feed around 6 months. The total
            daily volume plateaus around 900–960 mL because feeds get bigger but
            less frequent.
          </p>
          <AgeProgressionTimeline />
        </section>

        {/* Quick Reference Table */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-stone-900 mb-2">
            Weight-Based Quick Reference
          </h2>
          <QuickWeightTable />
        </section>

        {/* Why weight-based is better */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-stone-900 mb-4">
            Why Weight Matters More Than Age
          </h2>
          <p className="text-stone-600 leading-relaxed mb-4">
            The age-based chart is handy but imprecise — a 90th-percentile baby
            at 2 weeks weighs very differently from a 10th-percentile baby at 2
            weeks. The weight-based rule (163 mL/kg/day) accounts for this
            automatically. That said, the AAP presents it as a useful average,
            not a rigid mandate — babies regulate their own intake day to day.
          </p>

          <Callout type="info" title="Feed on cues, not just numbers">
            Hunger cues matter more than any calculator. Watch for{" "}
            <strong>rooting</strong> (turning head side to side),{" "}
            <strong>lip smacking</strong>, and <strong>fist sucking</strong>.
            These are early signals. Crying is actually a <em>late</em> hunger
            cue — by that point baby is already frustrated.
          </Callout>
        </section>

        {/* The 32 oz ceiling */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-stone-900 mb-4">
            The 32 oz (960 mL) Ceiling
          </h2>
          <p className="text-stone-600 leading-relaxed mb-4">
            A common upper guideline is about 32 oz (960 mL) per day on average.
            If your baby consistently wants much more or much less than expected,{" "}
            <strong>talk to your pediatrician</strong> rather than changing
            feeding strategy on your own.
          </p>
          <Callout type="warn" title="High intake ≠ time for solids">
            Don&apos;t start solids simply because formula volume is high.
            Current AAP/CDC guidance is that solids are introduced{" "}
            <strong>around 6 months</strong>, and introducing them before 4
            months is not recommended. If your baby consistently exceeds 32 oz/day,
            the next step is a conversation with your pediatrician, not a trip to
            the baby food aisle.
          </Callout>
        </section>

        {/* Signs of adequate intake */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-stone-900 mb-4">
            How to Know Baby Is Getting Enough
          </h2>
          <p className="text-stone-600 leading-relaxed mb-4">
            The most reassuring signs that intake is adequate are concrete and
            measurable:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
            {[
              {
                icon: "📈",
                title: "Steady weight gain",
                desc: "Baby should regain birth weight by about 10–14 days, then gain ~1 oz/day in the early months.",
              },
              {
                icon: "🧷",
                title: "Enough wet diapers",
                desc: "After the first 4–5 days, look for at least 5–6 wet diapers per 24 hours.",
              },
              {
                icon: "😌",
                title: "Satisfied after feeds",
                desc: "Baby seems content and relaxed after eating, not rooting or fussing immediately.",
              },
              {
                icon: "💤",
                title: "Alert when awake",
                desc: "Baby has periods of active alertness between feeds and is not excessively sleepy or lethargic.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-emerald-50 border border-emerald-200 rounded-xl p-4"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">{item.icon}</span>
                  <h4 className="font-bold text-stone-800">{item.title}</h4>
                </div>
                <p className="text-sm text-stone-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Summary cheat sheet */}
        <section className="mb-12">
          <div className="bg-stone-900 text-white rounded-2xl p-6 md:p-8">
            <h3 className="text-lg font-bold text-amber-400 mb-4">
              One-Screen Cheat Sheet
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <span className="text-amber-400 font-bold text-lg">1</span>
                <p className="text-stone-200">
                  <strong className="text-white">
                    Daily formula ≈ baby&apos;s weight (kg) × 163 mL
                  </strong>{" "}
                  — or weight (lb) × 75 mL. This is an average, not a mandate.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-amber-400 font-bold text-lg">2</span>
                <p className="text-stone-200">
                  <strong className="text-white">
                    First 1–2 days are an exception
                  </strong>{" "}
                  — start with 0.5–2 oz per feed, volumes rise quickly over
                  days.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-amber-400 font-bold text-lg">3</span>
                <p className="text-stone-200">
                  <strong className="text-white">
                    Add ~1 oz per feed per month
                  </strong>{" "}
                  — until 6–8 oz/feed around 6 months. Daily total plateaus near
                  960 mL.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-amber-400 font-bold text-lg">4</span>
                <p className="text-stone-200">
                  <strong className="text-white">
                    Cap at 32 oz (960 mL)/day
                  </strong>{" "}
                  — if consistently above, talk to pediatrician. Do not start
                  solids before 4 months.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-amber-400 font-bold text-lg">5</span>
                <p className="text-stone-200">
                  <strong className="text-white">
                    Watch for cues, not just numbers
                  </strong>{" "}
                  — rooting, lip smacking, fist sucking = hungry. Content after
                  feed, 5–6 wet diapers/day, steady weight gain = enough.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Sources */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-stone-900 mb-4">Sources</h2>
          <div className="flex flex-wrap gap-3">
            <Source
              name="AAP – Amount & Schedule of Formula Feedings"
              url="https://www.healthychildren.org/English/ages-stages/baby/formula-feeding/Pages/amount-and-schedule-of-formula-feedings.aspx"
            />
            <Source
              name="CDC – How Much and How Often to Feed Formula"
              url="https://www.cdc.gov/infant-toddler-nutrition/formula-feeding/how-much-and-how-often.html"
            />
            <Source
              name="AAP – How Much Formula Does My Baby Need?"
              url="https://www.healthychildren.org/English/tips-tools/ask-the-pediatrician/Pages/How-much-formula-does-my-baby-need.aspx"
            />
            <Source
              name="Seattle Children's – Bottle-Feeding Questions"
              url="https://www.seattlechildrens.org/conditions/a-z/bottle-feeding-formula-questions/"
            />
          </div>
        </section>

        <GiscusComments locale="en" term="/guides/formula-feeding" />
      </div>
    </div>
  );
}
