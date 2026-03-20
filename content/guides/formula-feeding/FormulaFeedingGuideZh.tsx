"use client";

import { useState } from "react";
import { AudioPlayer } from "@/components/AudioPlayer";
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
        配方奶摄入量计算器
      </h3>
      <p className="text-sm text-stone-500 mb-5">
        输入宝宝体重，估算每日配方奶需求量
      </p>

      <div className="flex items-center gap-3 mb-6">
        <div className="relative flex-1 max-w-[200px]">
          <input
            type="number"
            inputMode="decimal"
            step="0.1"
            min="0"
            max={unit === "kg" ? "12" : "26"}
            placeholder={unit === "kg" ? "例如 4.5" : "例如 10"}
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
            公斤
          </button>
          <button
            onClick={() => setUnit("lb")}
            className={`px-3 py-2.5 text-sm font-medium transition-colors ${
              unit === "lb"
                ? "bg-stone-800 text-white"
                : "bg-white text-stone-500 hover:bg-stone-100"
            }`}
          >
            磅
          </button>
        </div>
      </div>

      {isValid && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white rounded-xl p-4 border border-amber-100 text-center">
            <div className="text-3xl font-black text-amber-600">{dailyMl}</div>
            <div className="text-xs text-stone-500 mt-1">毫升 / 天</div>
            <div className="text-sm text-stone-400">({dailyOz} 盎司)</div>
          </div>
          <div className="bg-white rounded-xl p-4 border border-amber-100 text-center">
            <div className="text-3xl font-black text-sky-600">
              {perFeedMl8}–{perFeedMl6}
            </div>
            <div className="text-xs text-stone-500 mt-1">毫升 / 每顿</div>
            <div className="text-sm text-stone-400">每天 6–8 顿</div>
          </div>
          <div className="bg-white rounded-xl p-4 border border-amber-100 text-center">
            <div className="text-3xl font-black text-emerald-600">
              {dailyMl > 960 ? "!" : "✓"}
            </div>
            <div className="text-xs text-stone-500 mt-1">
              {dailyMl > 960 ? "超过 960 mL 上限" : "在正常范围内"}
            </div>
            <div className="text-sm text-stone-400">
              {dailyMl > 960 ? "请咨询儿科医生" : "≤ 960 mL/天"}
            </div>
          </div>
        </div>
      )}

      {isValid && dailyMl > 960 && (
        <p className="text-sm text-amber-700 mt-3 bg-amber-100 rounded-lg px-3 py-2">
          预估摄入量超过了常规的 32 盎司（960 毫升）每日上限。建议咨询儿科医生——这并不意味着应该立即添加辅食。
        </p>
      )}
    </div>
  );
}

function AgeProgressionTimeline() {
  const stages = [
    {
      age: "出生 1–2 天",
      perFeed: "15–30 mL",
      perFeedOz: "0.5–1 盎司",
      feeds: "8–12",
      color: "bg-rose-100 border-rose-300 text-rose-800",
      dot: "bg-rose-400",
      note: "少量是正常的——胃只有弹珠大小",
    },
    {
      age: "第 1 周",
      perFeed: "30–60 mL",
      perFeedOz: "1–2 盎司",
      feeds: "8–12",
      color: "bg-orange-100 border-orange-300 text-orange-800",
      dot: "bg-orange-400",
      note: "随着胃容量增大，奶量逐渐增加",
    },
    {
      age: "2–4 周",
      perFeed: "60–120 mL",
      perFeedOz: "2–4 盎司",
      feeds: "6–8",
      color: "bg-amber-100 border-amber-300 text-amber-800",
      dot: "bg-amber-400",
      note: "每顿更多，频率略降",
    },
    {
      age: "约 2 个月",
      perFeed: "120–150 mL",
      perFeedOz: "4–5 盎司",
      feeds: "6–8",
      color: "bg-yellow-100 border-yellow-300 text-yellow-800",
      dot: "bg-yellow-500",
      note: "逐渐形成规律",
    },
    {
      age: "约 4 个月",
      perFeed: "150–180 mL",
      perFeedOz: "5–6 盎司",
      feeds: "5–6",
      color: "bg-lime-100 border-lime-300 text-lime-800",
      dot: "bg-lime-500",
      note: "奶瓶更大，喂奶次数更少",
    },
    {
      age: "约 6 个月",
      perFeed: "180–240 mL",
      perFeedOz: "6–8 盎司",
      feeds: "4–5",
      color: "bg-emerald-100 border-emerald-300 text-emerald-800",
      dot: "bg-emerald-500",
      note: "日总量趋于稳定，约 900–960 mL",
    },
  ];

  return (
    <div className="my-8">
      <h3 className="text-lg font-bold text-stone-800 mb-2">
        按月龄的喂养进程
      </h3>
      <p className="text-sm text-stone-500 mb-6">
        大致的每顿参考量——仅供参考，并非硬性标准
      </p>

      {/* Desktop: horizontal timeline */}
      <div className="hidden md:block">
        <div className="relative">
          <div className="absolute top-5 left-0 right-0 h-1 bg-gradient-to-r from-rose-300 via-amber-300 to-emerald-300 rounded-full" />

          <div className="grid grid-cols-6 gap-2 relative">
            {stages.map((s, i) => (
              <div key={i} className="flex flex-col items-center">
                <div
                  className={`w-3 h-3 rounded-full ${s.dot} ring-4 ring-white z-10 mb-3`}
                />
                <div
                  className={`${s.color} border rounded-xl p-3 w-full text-center`}
                >
                  <div className="font-bold text-xs mb-1">{s.age}</div>
                  <div className="text-lg font-black">{s.perFeed}</div>
                  <div className="text-xs opacity-70">{s.perFeedOz}</div>
                  <div className="text-xs mt-1 opacity-60">
                    每天 {s.feeds} 顿
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
            <div className="flex flex-col items-center">
              <div
                className={`w-3 h-3 rounded-full ${s.dot} ring-2 ring-white flex-shrink-0`}
              />
              {i < stages.length - 1 && (
                <div className="w-0.5 flex-1 bg-stone-200" />
              )}
            </div>
            <div className={`${s.color} border rounded-xl p-3 mb-3 flex-1`}>
              <div className="flex items-baseline justify-between">
                <span className="font-bold text-sm">{s.age}</span>
                <span className="text-xs opacity-60">每天 {s.feeds} 顿</span>
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
        速查表：体重 → 每日奶量
      </h3>
      <p className="text-sm text-stone-500 mb-4">
        基于 163 mL/kg/天的经验法则（≈ 75 mL/磅/天）
      </p>
      <DataTable
        headers={["体重", "每日总量", "每顿（6–8 顿）", "大致月龄"]}
        rows={[
          [
            "2.5 kg（5.5 磅）",
            "~408 mL（14 盎司）",
            "51–68 mL（1.7–2.3 盎司）",
            "早产儿 / 偏小新生儿",
          ],
          [
            "3.0 kg（6.6 磅）",
            "~489 mL（17 盎司）",
            "61–82 mL（2.1–2.8 盎司）",
            "新生儿",
          ],
          [
            "3.5 kg（7.7 磅）",
            "~571 mL（19 盎司）",
            "71–95 mL（2.4–3.2 盎司）",
            "新生儿",
          ],
          [
            "4.0 kg（8.8 磅）",
            "~652 mL（22 盎司）",
            "82–109 mL（2.8–3.7 盎司）",
            "约 2–4 周",
          ],
          [
            "5.0 kg（11 磅）",
            "~815 mL（28 盎司）",
            "102–136 mL（3.5–4.6 盎司）",
            "约 2 个月",
          ],
          [
            "6.0 kg（13.2 磅）",
            "~960 mL（32 盎司）",
            "120–160 mL（4–5.4 盎司）",
            "约 3–4 个月",
          ],
          [
            "7.0 kg（15.4 磅）",
            "~960 mL（32 盎司）*",
            "160–192 mL（5.4–6.5 盎司）",
            "约 4–5 个月",
          ],
          [
            "8.0 kg（17.6 磅）",
            "~960 mL（32 盎司）*",
            "160–240 mL（5.4–8 盎司）",
            "约 6 个月",
          ],
        ]}
      />
      <p className="text-xs text-stone-400 mt-2">
        * 日总量通常在 960 mL（32 盎司）附近达到上限。超过这个量，请咨询儿科医生，不要自行增加奶量。
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
            速查指南
          </div>
          <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-2">
            宝宝每天需要喝多少配方奶？
          </h1>
          <p className="text-stone-400 text-lg">
            基于体重的计算公式、按月龄参考表与在线计算器
          </p>
          <p
            className="text-stone-500 text-xs mt-4"
            style={{ fontFamily: "system-ui, sans-serif" }}
          >
            适用于健康足月配方奶喂养婴儿 &bull; 资料来源：AAP（美国儿科学会）、CDC（美国疾控中心）、西雅图儿童医院
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 pt-4">
        <AudioPlayer locale="zh" contentKey="guides/formula-feeding" />
      </div>

      <div
        className="max-w-4xl mx-auto px-4 py-8"
        style={{ fontFamily: "system-ui, sans-serif" }}
      >
        {/* The Master Rule */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-stone-900 mb-4">
            核心经验法则
          </h2>
          <p className="text-stone-600 leading-relaxed mb-6">
            AAP（美国儿科学会）给出了一个实用的平均参考：健康足月的配方奶宝宝，每天大约需要摄入{" "}
            <strong>每磅体重 2.5 盎司（每公斤体重 163 毫升）</strong>
            的配方奶。换算方式如下：
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
            {[
              {
                label: "按磅计算",
                value: "75 mL",
                sub: "2.5 盎司 / 磅 / 天",
                color: "border-sky-200 bg-sky-50",
                accent: "text-sky-700",
              },
              {
                label: "按公斤计算",
                value: "163 mL",
                sub: "≈ 5.5 盎司 / 公斤 / 天",
                color: "border-amber-200 bg-amber-50",
                accent: "text-amber-700",
              },
              {
                label: "每日上限",
                value: "960 mL",
                sub: "32 盎司——参考上限",
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
            这个法则的优雅之处在于它会随宝宝生长自动调整。3.5 公斤的新生儿每天约需 571 毫升；5 公斤的两月龄宝宝每天约需 815 毫升。公式会自行匹配。
          </p>

          <Callout type="warn" title="出生头几天是例外">
            出生后 1–2 天，宝宝的进食量通常很小——有时每顿只有约 0.5 盎司（15 毫升）。体重计算法则应视为喂养逐步建立后的平均目标，而非第一天就要达到的处方。建议从每 2–3 小时喂 1–2 盎司（30–60 毫升）开始，让宝宝引导你。
          </Callout>
        </section>

        {/* Calculator */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-stone-900 mb-2">
            计算宝宝的奶量需求
          </h2>
          <WeightCalculator />
        </section>

        {/* Age Progression */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-stone-900 mb-2">
            喂养量如何随月龄变化
          </h2>
          <p className="text-stone-600 leading-relaxed mb-4">
            一个简便的规律：大约每月每顿增加 1 盎司（约 30 毫升），直到 6 个月左右达到每顿 6–8 盎司。每日总量在 900–960 毫升附近趋于稳定，因为每顿变多但次数减少。
          </p>
          <AgeProgressionTimeline />
        </section>

        {/* Quick Reference Table */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-stone-900 mb-2">
            按体重速查表
          </h2>
          <QuickWeightTable />
        </section>

        {/* Why weight-based is better */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-stone-900 mb-4">
            为什么体重比月龄更重要
          </h2>
          <p className="text-stone-600 leading-relaxed mb-4">
            按月龄的参考表方便但不够精确——同样 2 周大的宝宝，90 百分位和 10 百分位的体重差异很大。按体重计算（163 mL/kg/天）自动考虑了这一点。不过，AAP 将其作为「实用平均参考」提出，而非硬性规定——宝宝的进食量每天都会有波动。
          </p>

          <Callout type="info" title="按信号喂养，不只是按数字">
            饥饿信号比任何计算器都更重要。留意宝宝的{" "}
            <strong>觅食反射</strong>（左右转头）、<strong>咂嘴</strong>
            以及<strong>吃手</strong>——这些是早期饥饿信号。哭闹其实是<em>晚期</em>饥饿信号——此时宝宝已经很烦躁了。
          </Callout>
        </section>

        {/* The 32 oz ceiling */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-stone-900 mb-4">
            32 盎司（960 mL）的上限
          </h2>
          <p className="text-stone-600 leading-relaxed mb-4">
            常用的每日上限参考约为 32 盎司（960 毫升）。如果宝宝持续需要远超或远低于预期的量，
            <strong>请咨询儿科医生</strong>，不要自行改变喂养策略。
          </p>
          <Callout type="warn" title="奶量大 ≠ 该添辅食了">
            不要仅因为配方奶量大就开始添加辅食。AAP 和 CDC 的现行指南建议在{" "}
            <strong>6 个月左右</strong>引入辅食，不建议在 4 个月前添加。如果宝宝持续超过 32 盎司/天，下一步是咨询儿科医生，而不是去买米糊。
          </Callout>
        </section>

        {/* Signs of adequate intake */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-stone-900 mb-4">
            如何判断宝宝吃够了
          </h2>
          <p className="text-stone-600 leading-relaxed mb-4">
            以下是最可靠的摄入充足指标：
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
            {[
              {
                icon: "📈",
                title: "稳定的体重增长",
                desc: "宝宝应在出生后约 10–14 天恢复出生体重，之后在头几个月每天增加约 30 克（1 盎司）。",
              },
              {
                icon: "🧷",
                title: "足够的湿尿布",
                desc: "出生 4–5 天后，每 24 小时至少应有 5–6 片湿尿布。",
              },
              {
                icon: "😌",
                title: "喂后表现满足",
                desc: "喂完奶后宝宝看起来满足、放松，不会马上觅食或烦躁。",
              },
              {
                icon: "💤",
                title: "清醒时精神好",
                desc: "宝宝在两顿奶之间有活跃清醒的时段，不会过度嗜睡或无精打采。",
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
              一页速查卡
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <span className="text-amber-400 font-bold text-lg">1</span>
                <p className="text-stone-200">
                  <strong className="text-white">
                    每日配方奶量 ≈ 体重（kg）× 163 mL
                  </strong>{" "}
                  ——或体重（磅）× 75 mL。这是平均值，不是硬性要求。
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-amber-400 font-bold text-lg">2</span>
                <p className="text-stone-200">
                  <strong className="text-white">
                    出生头 1–2 天是例外
                  </strong>{" "}
                  ——从每顿 0.5–2 盎司开始，奶量会在几天内迅速增加。
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-amber-400 font-bold text-lg">3</span>
                <p className="text-stone-200">
                  <strong className="text-white">
                    大约每月每顿增加 ~1 盎司
                  </strong>{" "}
                  ——直到 6 个月左右达到每顿 6–8 盎司。日总量稳定在约 960 mL。
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-amber-400 font-bold text-lg">4</span>
                <p className="text-stone-200">
                  <strong className="text-white">
                    上限约 32 盎司（960 mL）/天
                  </strong>{" "}
                  ——如果持续超过，请咨询儿科医生。不要在 4 个月前添加辅食。
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-amber-400 font-bold text-lg">5</span>
                <p className="text-stone-200">
                  <strong className="text-white">
                    关注信号，而非只看数字
                  </strong>{" "}
                  ——觅食、咂嘴、吃手 = 饿了。喂后满足、每天 5–6 片湿尿布、体重稳步增长 = 吃够了。
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Sources */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-stone-900 mb-4">参考来源</h2>
          <div className="flex flex-wrap gap-3">
            <Source
              name="AAP – 配方奶喂养的量与时间表"
              url="https://www.healthychildren.org/English/ages-stages/baby/formula-feeding/Pages/amount-and-schedule-of-formula-feedings.aspx"
            />
            <Source
              name="CDC – 配方奶喂多少、多久喂一次"
              url="https://www.cdc.gov/infant-toddler-nutrition/formula-feeding/how-much-and-how-often.html"
            />
            <Source
              name="AAP – 我的宝宝需要多少配方奶？"
              url="https://www.healthychildren.org/English/tips-tools/ask-the-pediatrician/Pages/How-much-formula-does-my-baby-need.aspx"
            />
            <Source
              name="西雅图儿童医院 – 奶瓶喂养常见问题"
              url="https://www.seattlechildrens.org/conditions/a-z/bottle-feeding-formula-questions/"
            />
          </div>
        </section>

        <GiscusComments locale="zh" term="/guides/formula-feeding" />
      </div>
    </div>
  );
}
