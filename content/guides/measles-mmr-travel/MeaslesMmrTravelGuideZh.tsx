"use client";

import { useState } from "react";

import { AudioPlayer } from "@/components/AudioPlayer";
import { Badge } from "@/components/Badge";
import { Callout } from "@/components/Callout";
import { GiscusComments } from "@/components/GiscusComments";
import { Source } from "@/components/Source";
import { DataTable } from "@/components/Table";

const sections = [
  { id: "why-now", icon: "📈", title: "为什么现在要看", subtitle: "2026 年 4 月的情况" },
  { id: "routine-schedule", icon: "💉", title: "常规 MMR", subtitle: "12–15 月与 4–6 岁" },
  { id: "travel-dose", icon: "✈️", title: "6–11 月旅行加种", subtitle: "婴儿家庭的关键决定" },
  { id: "protected", icon: "🛡️", title: "什么才算「已免疫」", subtitle: "看记录，不靠记忆" },
  { id: "before-travel", icon: "🧳", title: "出行前", subtitle: "时间轴清单" },
  { id: "after-exposure", icon: "🚨", title: "暴露之后", subtitle: "先打电话，当天处理" },
  { id: "travel-checklist", icon: "✅", title: "出行检查清单", subtitle: "最终可打印清单" },
];

const quickAnswers = [
  {
    label: "常规接种",
    body: "常规 MMR 从 12–15 月龄开始接种。",
  },
  {
    label: "旅行加种",
    body: "6–11 月龄的宝宝如果要国际出行，应在出发前接种 1 剂 MMR 加种。",
  },
  {
    label: "不算一剂",
    body: "这一剂早打的加种不计入 12 月龄后常规 2 剂的接种序列。",
  },
  {
    label: "暴露之后",
    body: "发生暴露后要立刻打电话；MMR 在 72 小时内可能有用，免疫球蛋白在 6 天内可能有用。",
  },
];

function WhyNowSection() {
  return (
    <div>
      <p className="text-stone-600 leading-relaxed mb-4">
        2026 年，麻疹重新回到很多美国家长的关注范围。
        <strong>2026 年 4 月 17 日</strong>，CDC 公布
        <strong>截至 2026 年 4 月 16 日，美国已确诊 1,748 例麻疹病例</strong>
        。这是本文所依据的时间点快照——病例数每周都可能变化，这个数字只是一个参考，不是趋势预测。
      </p>

      <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 my-5 text-center">
        <div className="text-xs uppercase tracking-widest text-amber-700 font-semibold mb-2">
          CDC 最新数据
        </div>
        <div className="text-4xl md:text-5xl font-black text-stone-900 tabular-nums">
          1,748
        </div>
        <div className="text-sm text-stone-600 mt-1">
          截至 2026 年 4 月 16 日，美国确诊麻疹病例数
        </div>
      </div>

      <h3 className="font-bold text-stone-800 mt-6 mb-3 text-lg">
        为什么这件事对婴儿家庭特别重要
      </h3>
      <p className="text-stone-600 leading-relaxed mb-3">
        麻疹是目前已知传染性最强的病毒之一。带毒患者离开后，病毒仍可在空气和物体表面停留长达
        <strong>2 小时</strong>
        ，并轻易传播给附近所有没有免疫力的人。在完全无免疫力的人群里，一位感染者大约能让 10 位近距离接触者中的 9 位染病。
      </p>
      <p className="text-stone-600 leading-relaxed">
        最难保护的群体是
        <strong>12 月龄以下的婴儿</strong>
        ——因为他们还没到第一剂常规 MMR 的时间。对婴儿家庭来说，实际需要回答的问题很有限：常规免疫什么时候开始、宝宝什么时候需要一剂早打的旅行加种、怀疑暴露后该怎么做。
      </p>

      <div className="mt-4 flex flex-wrap gap-3">
        <Source
          name="CDC – 麻疹病例与疫情数据"
          url="https://www.cdc.gov/measles/data-research/index.html"
        />
        <Source
          name="CDC – 麻疹如何传播"
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
        美国常规 MMR 接种是 2 剂。第 1 剂在
        <strong>12–15 月龄</strong>
        接种，第 2 剂在
        <strong>4–6 岁</strong>
        接种。即使你要出门旅行，这个基本节奏也不变。
      </p>

      <DataTable
        headers={["剂次", "年龄", "作用"]}
        rows={[
          [
            <Badge key="d1" color="blue">
              第 1 剂
            </Badge>,
            "12–15 月龄",
            "建立常规保护",
          ],
          [
            <Badge key="d2" color="blue">
              第 2 剂
            </Badge>,
            "4–6 岁",
            "完成常规接种序列",
          ],
          [
            <Badge key="d3" color="amber">
              旅行例外
            </Badge>,
            "12 月龄以上且即将出行",
            "若距离第 1 剂已至少 28 天，可提前打第 2 剂",
          ],
        ]}
      />

      <Callout type="info" title="幼儿出行的实用提醒">
        如果孩子已经
        <strong>满 12 月龄</strong>
        且只打过第 1 剂 MMR，为了国际出行，第 2 剂可以提前到 4–6 岁窗口之前接种——前提是距离第 1 剂已至少
        <strong>28 天</strong>
        。可以和儿科医生商量是否在出发前加速第 2 剂。
      </Callout>

      <p className="text-sm text-stone-500 mt-4">
        如需对整个儿童接种时间表有更完整的了解，可参考
        <a
          href="/zh/guides/immunization-schedule"
          className="text-amber-700 underline underline-offset-2 hover:text-amber-900"
        >
          《儿童疫苗接种指南（美国，2026）》
        </a>
        。
      </p>

      <div className="mt-4 flex flex-wrap gap-3">
        <Source
          name="CDC – 麻疹疫苗接种建议"
          url="https://www.cdc.gov/measles/hcp/vaccine-considerations/index.html"
        />
        <Source
          name="CDC – 儿童与青少年免疫时间表说明"
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
        对家里有婴儿并计划国际出行的家庭来说，这是最关键的决策点。简单说：如果你的宝宝在
        <strong>6–11 月龄</strong>
        ，并且要出国，CDC 建议在出发前接种
        <strong>1 剂</strong>
        MMR。
      </p>

      <DataTable
        headers={["月龄", "怎么做", "说明"]}
        rows={[
          [
            <Badge key="a1" color="red">
              0–5 月龄
            </Badge>,
            "不接种 MMR 旅行加种",
            "请和儿科医生讨论暴露风险与目的地情况",
          ],
          [
            <Badge key="a2" color="amber">
              6–11 月龄
            </Badge>,
            "国际出行前接种 1 剂 MMR 加种",
            "之后仍需按常规序列再打 2 剂",
          ],
          [
            <Badge key="a3" color="green">
              12 月龄及以上
            </Badge>,
            "出行前尽量完成与月龄对应的 2 剂保护",
            "距离第 1 剂 28 天以上可提前打第 2 剂",
          ],
        ]}
      />

      <Callout type="tip" title="理想时机与现实时机">
        CDC 建议旅行加种
        <strong>最好在出发前至少 2 周</strong>
        接种，让免疫反应有时间形成。如果行程已经很近，
        <strong>仍应尽量打上一剂</strong>
        ——有部分保护总比没有好。
      </Callout>

      <Callout type="warn" title="早打的加种不替代常规 2 剂">
        12 月龄前接种的那一剂 MMR
        <strong>不计入</strong>
        常规 2 剂序列。举例来说，9 月龄接种过旅行加种的宝宝，仍然需要在 12–15 月龄打常规第 1 剂，然后在 4–6 岁打第 2 剂——总共 3 针，而不是 2 针。
      </Callout>

      <Callout type="danger" title="6 月龄以下：不接种麻疹疫苗">
        CDC
        <strong>不建议</strong>
        为
        <strong>6 月龄以下</strong>
        的婴儿接种麻疹疫苗。对这个月龄段的宝宝，保护手段是避免高风险暴露、让家里所有成年人都完成接种、以及在可能发生暴露时立刻联系儿科医生。
      </Callout>

      <div className="mt-4 flex flex-wrap gap-3">
        <Source
          name="CDC – 出行前接种计划"
          url="https://www.cdc.gov/measles/travel/index.html"
        />
        <Source
          name="CDC – 麻疹疫苗接种建议"
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
        「我们应该打过」不是一个可靠的免疫证明。出门前，请先搞清楚对全家每个出行者来说，什么才真正算作「已免疫」的证据。
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
        <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
          <h4 className="font-bold text-emerald-800 mb-2 flex items-center gap-2">
            <span>{"\u2713"}</span> 算作已免疫
          </h4>
          <ul className="text-sm text-emerald-900 space-y-1.5">
            <li>书面接种记录，显示与月龄相符的 MMR 剂次</li>
            <li>实验室免疫证据（麻疹 IgG 阳性）</li>
            <li>实验室确认的既往麻疹感染</li>
            <li>美国成年人中 1957 年以前出生</li>
          </ul>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <h4 className="font-bold text-red-800 mb-2 flex items-center gap-2">
            <span>{"\u2717"}</span> 不够算
          </h4>
          <ul className="text-sm text-red-900 space-y-1.5">
            <li>家人凭记忆说接种过，但没有书面记录</li>
            <li>「我好像小时候打过那一针」</li>
            <li>童年时的皮疹，没有做过化验确认是麻疹</li>
          </ul>
        </div>
      </div>

      <h3 className="font-bold text-stone-800 mt-6 mb-3 text-lg">
        标准剂数是多少
      </h3>
      <p className="text-stone-600 leading-relaxed mb-3">
        对大多数
        <strong>1957 年及以后</strong>
        出生的国际出行者来说，目标是
        <strong>有 2 剂书面记录</strong>
        。6–11 月龄的婴儿旅行加种是明确的例外——出发前打 1 剂，之后再按常规序列补足 2 剂。
      </p>

      <Callout type="tip" title="找不到书面记录？直接再补一剂">
        如果某位成年出行者不确定自己是否完成接种，也找不到书面记录，CDC 明确指出
        <strong>再打一剂 MMR 没有坏处</strong>
        。查抗体滴度也是一个选项，但对大多数家庭来说，直接补一剂更快、更便宜，也最省事。
      </Callout>

      <div className="mt-4 flex flex-wrap gap-3">
        <Source
          name="CDC – 麻疹相关问题解答"
          url="https://www.cdc.gov/measles/about/questions.html"
        />
        <Source
          name="CDC – 麻疹疫苗接种建议"
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
        麻疹出行的大部分工作都发生在出门之前。用反向时间轴来看——准备越早，可选方案越多。
      </p>

      <DataTable
        headers={["时间", "要做什么", "为什么重要"]}
        rows={[
          [
            <Badge key="t1" color="blue">
              行程一定下来
            </Badge>,
            "核查每个人的书面接种记录，不要只凭记忆",
            "联系儿科医生之前，最好手里已经有纸质或电子记录",
          ],
          [
            <Badge key="t2" color="green">
              出发前 2 周以上
            </Badge>,
            "如有需要，尽快补齐 MMR 剂次",
            "免疫反应有时间在出发前建立起来",
          ],
          [
            <Badge key="t3" color="amber">
              距离出发不足 2 周
            </Badge>,
            "如仍未免疫，也要打上一剂",
            "部分保护仍然好过没有保护",
          ],
          [
            <Badge key="t4" color="blue">
              出发前
            </Badge>,
            "查看 CDC 目的地页面与旅行通告",
            "当地疫情和行程风险变化得很快",
          ],
          [
            <Badge key="t5" color="purple">
              回国之后
            </Badge>,
            "持续观察症状 3 周",
            "麻疹潜伏期最长约 21 天",
          ],
        ]}
      />

      <Callout type="info" title="看书面记录，不靠记忆">
        儿科医生诊所或药房都可以打印接种记录，很多州也有在线免疫登记系统。能给医生看的截图或打印件，胜过任何以「我记得……」开头的对话。
      </Callout>

      <div className="mt-4 flex flex-wrap gap-3">
        <Source
          name="CDC – 出行前接种计划"
          url="https://www.cdc.gov/measles/travel/index.html"
        />
      </div>
    </div>
  );
}

function AfterExposureSection() {
  return (
    <div>
      <Callout type="danger" title="先打电话，不要直接走进候诊室">
        请立刻打电话给儿科医生或诊所，告诉他们可能发生了麻疹暴露。直接进入候诊室会把其他脆弱病人也暴露出去。多数诊所会安排单独入口、电话分诊或引导你到更合适的地方。
      </Callout>

      <h3 className="font-bold text-stone-800 mt-6 mb-3 text-lg">
        暴露后处理有严格时间窗
      </h3>
      <p className="text-stone-600 leading-relaxed mb-3">
        已知或怀疑暴露后，有两种可能的预防性处理，并且都有时间窗：
      </p>

      <DataTable
        headers={["选项", "时间窗", "一般适用对象"]}
        rows={[
          [
            <Badge key="o1" color="amber">
              MMR
            </Badge>,
            "暴露后 72 小时内",
            "符合接种条件且尚未免疫的接触者",
          ],
          [
            <Badge key="o2" color="blue">
              免疫球蛋白
            </Badge>,
            "暴露后 6 天内",
            "婴儿、没有免疫证据的孕妇、严重免疫抑制的患者",
          ],
        ]}
      />

      <Callout type="warn" title="到底用哪种，由医生和公共卫生部门判断">
        暴露后选 MMR 还是免疫球蛋白，取决于年龄、免疫状态、是否怀孕、距离暴露有多长时间等因素。儿科医生、诊所和当地公共卫生部门负责做判断——你需要做的只是尽快打电话，并把暴露细节说清楚。
      </Callout>

      <Callout type="info" title="两者不能同时使用">
        MMR 和免疫球蛋白
        <strong>不能</strong>
        同一天同时接种。其中一种会影响另一种后续的接种时机，这也是由医生决定先后顺序的原因之一。
      </Callout>

      <h3 className="font-bold text-stone-800 mt-6 mb-3 text-lg">
        麻疹看起来是什么样
      </h3>
      <p className="text-stone-600 leading-relaxed mb-3">
        症状通常在暴露后 7–14 天出现，并遵循一个比较明显的先后顺序：
      </p>
      <DataTable
        headers={["阶段", "表现"]}
        compact
        rows={[
          ["第 1–4 天", "发热、咳嗽、流涕、结膜红肿流泪（所谓「3 个 C」）"],
          ["第 3–5 天", "面颊内侧可能出现白色小斑点（Koplik 斑）"],
          [
            "第 4–7 天",
            "从面部发际线开始出现红色斑丘疹，由面部向躯干、四肢扩散",
          ],
        ]}
      />

      <Callout type="danger" title="按当天处理，不是放到下周再说">
        只要有怀疑——发热加皮疹、近期国际旅行、明确接触过病例——就当作当天要打电话的事。待在家里，宝宝也别外出，先打电话再决定去哪里。
      </Callout>

      <div className="mt-4 flex flex-wrap gap-3">
        <Source
          name="CDC – 麻疹疫苗接种建议"
          url="https://www.cdc.gov/measles/hcp/vaccine-considerations/index.html"
        />
        <Source
          name="CDC – 麻疹症状与并发症"
          url="https://www.cdc.gov/measles/signs-symptoms/index.html"
        />
        <Source
          name="CDC – 麻疹相关问题解答"
          url="https://www.cdc.gov/measles/about/questions.html"
        />
      </div>
    </div>
  );
}

function TravelChecklistSection() {
  const items = [
    "核查每位出行者的书面接种记录",
    "若宝宝 6–11 月龄且要国际出行，主动询问是否接种 1 剂早打的 MMR",
    "若孩子已满 12 月龄但未完成接种，询问是否在出发前提前打第 2 剂",
    "把儿科医生的夜间/紧急电话保存好",
    "回国后持续 3 周观察发热与皮疹",
    "一旦怀疑是麻疹，留在家里，打电话再说下一步",
  ];

  return (
    <div>
      <p className="text-stone-600 leading-relaxed mb-4">
        合上行李箱前可打印的一份短清单。只要其中任何一项答案是「否」，就先把那一项处理掉。
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
        延伸阅读：
        <a
          href="/zh/guides/immunization-schedule"
          className="text-amber-700 underline underline-offset-2 hover:text-amber-900"
        >
          《儿童疫苗接种指南（美国，2026）》
        </a>
        可用于了解完整接种时间表背景。
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

export default function MeaslesMmrTravelGuideZh() {
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
            指南 · 麻疹与出行
          </div>
          <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-3">
            麻疹、MMR 与带婴儿出行
            <span className="block text-stone-400 text-lg md:text-xl font-semibold mt-1">
              美国，2026 年 4 月
            </span>
          </h1>
          <p className="text-stone-300 text-base md:text-lg leading-relaxed">
            带婴儿出行时，关于麻疹真正要回答的问题是实际操作层面的，而不是立场层面的：常规 MMR 什么时候开始、6–11 月龄婴儿什么时候应该打一剂旅行加种、什么才算「已免疫」，以及发生暴露后该立刻做什么。
          </p>
          <p
            className="text-stone-500 text-xs mt-4"
            style={{ fontFamily: "system-ui, sans-serif" }}
          >
            本文依据 CDC 2026 年 4 月 19 日的麻疹指南核对；病例数每周都可能变化。
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
        <AudioPlayer locale="zh" contentKey="guides/measles-mmr-travel" />
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

        <GiscusComments locale="zh" term="/guides/measles-mmr-travel" />
      </div>
    </div>
  );
}
