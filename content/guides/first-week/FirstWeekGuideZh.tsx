"use client";

import { useState } from "react";

import { Badge } from "@/components/Badge";
import { Callout } from "@/components/Callout";
import { GiscusComments } from "@/components/GiscusComments";
import { Source } from "@/components/Source";
import { DataTable } from "@/components/Table";

const sections = [
  { id: "induction", icon: "🏥", title: "催产", subtitle: "接下来通常会发生什么" },
  { id: "hospital-bag", icon: "🎒", title: "待产包", subtitle: "要带什么" },
  { id: "labor-role", icon: "💪", title: "你在分娩中的角色", subtitle: "真正能帮上的地方" },
  { id: "newborn", icon: "👶", title: "新生儿护理", subtitle: "回家前后的关键事项" },
  { id: "feeding", icon: "🍼", title: "喂养", subtitle: "频率、量和观察重点" },
  { id: "sleep", icon: "😴", title: "安全睡眠", subtitle: "AAP 重点规则" },
  { id: "discharge", icon: "📋", title: "出院前", subtitle: "别遗漏这些确认项" },
  { id: "mother", icon: "❤️", title: "照顾妈妈", subtitle: "产后恢复与支持" },
  { id: "danger", icon: "🚨", title: "危险信号", subtitle: "什么时候该立刻求助" },
];

function InductionSection() {
  return (
    <div>
      <p className="text-stone-600 leading-relaxed mb-4">
        对低风险、初产的孕妇来说，<strong>39 周择期催产</strong>是有证据支持的。
        2018 年发表于《新英格兰医学杂志》的 ARRIVE 研究发现，在这一特定人群中，
        39 周催产反而可能<strong>降低</strong>剖宫产率。它并不等于所有 39 至 40
        周孕妇都该催产，但如果医生已经这样安排，你们仍然处在非常常规的流程里。
      </p>

      <h3 className="font-bold text-stone-800 mt-6 mb-3 text-lg">催产一般怎么进行</h3>
      <p className="text-stone-600 text-sm mb-2">
        催产通常分阶段进行。医生会根据宫颈成熟度来选择方法，常见参考指标叫 Bishop 评分。
      </p>

      <DataTable
        headers={["阶段", "方式", "会发生什么", "大致时间"]}
        rows={[
          [
            <Badge key="s1" color="blue">步骤 1</Badge>,
            "宫颈成熟",
            "使用前列腺素药物（如米索前列醇），或放置球囊帮助宫颈软化、扩张。",
            "通常是前一晚到过夜",
          ],
          [
            <Badge key="s2" color="blue">步骤 2</Badge>,
            "催产素静滴",
            "开始静脉滴注人工催产素，让宫缩启动或加强。",
            "多见于第二天白天",
          ],
          [
            <Badge key="s3" color="blue">步骤 3</Badge>,
            "人工破水",
            "医生用小器械破膜，过程通常很快，可能会有明显压力感或温热液体流出。",
            "宫口开到合适程度后",
          ],
          [
            <Badge key="s4" color="amber">视情况</Badge>,
            "硬膜外止痛",
            "用于镇痛，不代表失败，也不是意志力不够。",
            "她需要时都可以讨论",
          ],
        ]}
      />

      <Callout type="warn" title="通常会比你想得更久">
        初产妇从开始宫颈成熟到真正分娩，24 到 36 小时以上都很常见。准备好零食、
        充电线、娱乐内容和耐心。
      </Callout>

      <div className="mt-3 flex flex-wrap gap-3">
        <Source name="ACOG：Labor Induction" url="https://www.acog.org/womens-health/faqs/labor-induction" />
        <Source name="ACOG：Induction at 39 Weeks" url="https://www.acog.org/womens-health/faqs/induction-of-labor-at-39-weeks" />
        <Source name="ARRIVE Trial (NEJM)" url="https://www.nejm.org/doi/full/10.1056/NEJMoa1800566" />
      </div>
    </div>
  );
}

function HospitalBagSection() {
  return (
    <div>
      <p className="text-stone-600 leading-relaxed mb-4">
        从催产到产后恢复，你们可能总共要在医院待 2 到 4 天。东西按“给妈妈、给你、给宝宝”三类打包最省心。
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          {
            title: "给妈妈",
            color: "bg-rose-50 border-rose-200",
            items: [
              "身份证、医保卡、医院文件",
              "分娩计划打印版",
              "舒适睡袍或方便哺乳的衣服",
              "防滑拖鞋和洗澡拖鞋",
              "润唇膏、发绳、基础洗漱用品",
              "哺乳文胸和防溢乳垫",
              "回家衣物（仍按孕中期尺码准备）",
              "长充电线",
              "自己的枕头（换显眼枕套）",
            ],
          },
          {
            title: "给你",
            color: "bg-sky-50 border-sky-200",
            items: [
              "2 到 3 天换洗衣物",
              "洗漱用品和除味用品",
              "零食：能量棒、坚果、肉干",
              "充电器、充电宝",
              "少量现金或支付工具",
              "耳机、平板、书",
              "舒适鞋子和一件外套",
              "一只枕头和小毯子（陪床大概率不舒服）",
            ],
          },
          {
            title: "给宝宝",
            color: "bg-amber-50 border-amber-200",
            items: [
              "后向式婴儿安全座椅",
              "回家衣服（新生儿码和 0-3 月龄各一套）",
              "包巾或接生毯",
              "帽子和袜子/手套",
              "备用纸尿裤和湿巾",
              "简单襁褓毯",
            ],
          },
        ].map((col) => (
          <div key={col.title} className={`rounded-lg border p-4 ${col.color}`}>
            <h4 className="font-bold text-stone-800 mb-3">{col.title}</h4>
            <ul className="space-y-1.5">
              {col.items.map((item, index) => (
                <li key={index} className="text-sm text-stone-600 flex items-start gap-2">
                  <span className="text-stone-400 mt-0.5">▪</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <Callout type="tip" title="安全座椅别等到出院当天">
        大多数医院都会确认宝宝如何安全离院。请提前安装好后向式安全座椅，阅读座椅和车辆说明书，
        如果想多一层确认，可以预约 NHTSA 认证的安装检查点。
      </Callout>

      <div className="mt-3">
        <Source name="NHTSA：Car Seat Finder" url="https://www.nhtsa.gov/therightseat" />
      </div>
    </div>
  );
}

function LaborRoleSection() {
  return (
    <div>
      <p className="text-stone-600 leading-relaxed mb-4">
        你的核心任务可以概括成三句话：<strong>在场、镇定、替她发声</strong>。你不能替她承受疼痛，
        但你能明显改善整个过程的体验。
      </p>

      <DataTable
        headers={["阶段", "大致时长", "她会感受到什么", "你该做什么"]}
        rows={[
          [
            <span key="p1"><Badge color="green">潜伏期</Badge><br/><span className="text-xs text-stone-400">0–6 cm</span></span>,
            "几小时到一天以上",
            "宫缩逐渐规律，通常还能讲话和走动。",
            "提醒补水、进食（若允许）、休息，帮忙计时宫缩，保持环境稳定。",
          ],
          [
            <span key="p2"><Badge color="amber">活跃期</Badge><br/><span className="text-xs text-stone-400">6–8 cm</span></span>,
            "2–8 小时",
            "宫缩更强、更密集，讲话变得困难。",
            "做腰部反压、递冰块、一起慢呼吸，给明确而简单的鼓励。",
          ],
          [
            <span key="p3"><Badge color="red">过渡期</Badge><br/><span className="text-xs text-stone-400">8–10 cm</span></span>,
            "30 分钟到 2 小时",
            "最难熬的阶段，恶心、发抖、说“我不行了”都很常见。",
            "靠近她，一次只陪她过一阵宫缩。别和情绪对抗，也别把发火往心里去。",
          ],
          [
            <span key="p4"><Badge color="purple">用力期</Badge><br/><span className="text-xs text-stone-400">10 cm</span></span>,
            "20 分钟到 3 小时",
            "强烈下坠感和用力冲动。",
            "协助摆位，必要时托腿、扶背，按她希望的方式计数或鼓励。",
          ],
        ]}
      />

      <h3 className="font-bold text-stone-800 mt-6 mb-3 text-lg">什么话该说，什么话别说</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
          <h4 className="font-bold text-emerald-800 mb-2">✓ 可以说</h4>
          <ul className="text-sm text-emerald-700 space-y-1.5">
            <li>“你做得很好。”</li>
            <li>“我们一次只过这一阵宫缩。”</li>
            <li>“我在这。”</li>
            <li>“你现在最需要我做什么？”</li>
            <li>“跟着我一起慢慢呼吸。”</li>
            <li>“无论你怎么决定，都是对的。”</li>
          </ul>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <h4 className="font-bold text-red-800 mb-2">✗ 不要说</h4>
          <ul className="text-sm text-red-700 space-y-1.5">
            <li>“我懂你的感受。”</li>
            <li>“冷静一点。”</li>
            <li>“我妈说你应该……”</li>
            <li>“你确定要打无痛吗？”</li>
            <li>关于你自己有多累、多饿、多无聊的任何话。</li>
            <li>没有被要求时，不要直播现场细节。</li>
          </ul>
        </div>
      </div>

      <Callout type="info" title="你还是她的翻译">
        提前知道她的偏好和分娩计划。宫缩来时她可能没法完整表达，这时你要把重点需求清楚地传达给医护。
      </Callout>

      <div className="mt-3">
        <Source name="Cleveland Clinic：Labor Support" url="https://health.clevelandclinic.org/how-to-support-your-partner-during-labor" />
      </div>
    </div>
  );
}

function NewbornSection() {
  return (
    <div>
      <p className="text-stone-600 leading-relaxed mb-4">
        新生儿既比你想象中更脆弱，也比你想象中更能适应。第一周真正重要的是把高风险点先抓住。
      </p>

      <h3 className="font-bold text-stone-800 mt-4 mb-3 text-lg">出生后立刻会发生什么</h3>
      <DataTable
        headers={["项目", "重点说明"]}
        rows={[
          ["肌肤接触", "宝宝会优先趴在妈妈胸前，这有助于体温、心率和呼吸稳定。AAP 推荐至少 1 小时。爸爸也很适合做肌肤接触。"],
          ["第一次喂奶", "通常会在出生后 1 小时内尝试，不顺利也很常见。"],
          ["APGAR 评分", "医护会在 1 分钟和 5 分钟进行评分，7 分以上通常属于正常范围。"],
          ["常规预防", "包括维生素 K、红霉素眼膏，以及乙肝疫苗计划。"],
          ["新生儿筛查", "通常包括足跟血筛查、听力筛查和 CCHD 脉氧筛查。出院前应尽量完成。"],
          ["体重与身长", "出生后前几天体重下降是常见现象，但如果下降接近高个位数比例或 5 天后仍持续下降，需要更密切评估喂养。"],
        ]}
      />

      <h3 className="font-bold text-stone-800 mt-6 mb-3 text-lg">日常护理基础</h3>
      <DataTable
        headers={["任务", "怎么做", "频率"]}
        compact
        rows={[
          ["换尿布", "女孩从前往后擦。脐带残端未脱落前尽量保持干燥。男婴包皮环切后按医护建议护理。", "每天 8–12 次很常见"],
          ["脐带护理", "保持清洁和干燥，尿布边缘折到脐带下方。通常 1–3 周脱落。", "每次换尿布都看一眼"],
          ["洗澡", "脐带未脱落前以擦澡为主。只用温水和温和清洁用品，并一直托住头颈。", "每周 2–3 次即可"],
          ["测体温", "新生儿最可靠的是直肠温度。正常大致为 36.5–37.5°C。", "觉得宝宝过热或过冷时"],
          ["抱姿与支撑", "每次都要托住头和颈部。", "每一次抱起都如此"],
          ["趴着练习", "出生几天内就可以开始短时间 tummy time，前提是清醒且有人看护。", "一天几次，每次 3–5 分钟"],
        ]}
      />

      <h3 className="font-bold text-stone-800 mt-6 mb-3 text-lg">黄疸要看什么</h3>
      <p className="text-sm text-stone-600 mb-3">
        很多新生儿都会有不同程度的黄疸，通常在出生后第 3 到第 5 天达到高峰。医院应在出院前测胆红素，儿科第一次随访也会复查或复核风险。
      </p>

      <DataTable
        headers={["观察点", "怎么判断"]}
        compact
        rows={[
          ["第 5 天排泄量", "到第 5 天左右，通常希望看到 24 小时内至少 6 次湿尿布和至少 3 次大便。太少往往意味着吃得不够。"],
          ["黄染范围", "脸部轻微发黄常见；如果扩展到胸腹、腿部，或眼白发黄明显，要联系儿科。"],
          ["嗜睡与吃得差", "又黄又难叫醒、吃奶差，需要当天评估。"],
          ["复查安排", "出院前要拿到胆红素结果，或明确什么时候复查。"],
        ]}
      />

      <Callout type="warn" title="不要用晒太阳代替治疗">
        “抱去晒太阳就好”的说法并不可靠，也可能带来晒伤和体温不稳的风险。如果需要光疗，交给儿科安排。
      </Callout>

      <Callout type="tip" title="安抚宝宝的 5S 方法">
        Harvey Karp 的 5S 分别是：<strong>Swaddle</strong>（包裹）、<strong>Side/Stomach</strong>（抱着时侧位或俯位，睡觉时绝不这样放）、
        <strong>Shush</strong>（白噪音）、<strong>Swing</strong>（轻柔有节律的晃动）和 <strong>Suck</strong>（吸吮）。
      </Callout>

      <Callout type="info" title="尽快约第一次儿科复诊">
        AAP 建议宝宝在出生后 3 至 5 天、且离开医院后 48 至 72 小时内接受一次随访。如果还没约，现在就约。
      </Callout>

      <h3 className="font-bold text-stone-800 mt-6 mb-3 text-lg">访客与感染控制</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 my-4">
        {[
          "任何有症状的人都不要来看宝宝。",
          "接触宝宝、奶瓶或吸奶器部件前都先洗手。",
          "最好在见宝宝前 2 周完成 Tdap 和流感疫苗。",
          "感冒、RSV、流感、COVID 风险都要认真对待。",
          "不要在宝宝附近吸烟，衣物上的残留也算暴露。",
          "控制访客人数和停留时间，妈妈真正需要的是休息。",
        ].map((item, index) => (
          <div key={index} className="bg-stone-50 rounded-lg px-4 py-2.5 text-sm text-stone-700 flex items-start gap-2">
            <span className="text-amber-500 font-bold mt-0.5">•</span>
            {item}
          </div>
        ))}
      </div>

      <div className="mt-3 flex flex-wrap gap-3">
        <Source name="AAP：First Office Visit" url="https://www.aap.org/en/patient-care/newborn-and-infant-nutrition/newborn-and-infant-health-assessment-and-promotion/first-office-visit-3-5-days/" />
        <Source name="CDC：Newborn Breastfeeding Basics" url="https://www.cdc.gov/infant-toddler-nutrition/breastfeeding/newborn-basics.html" />
        <Source name="CDC：RSV Protection for Infants" url="https://www.cdc.gov/rsv/vaccines/protect-infants.html" />
        <Source name="HRSA：Newborn Screening" url="https://newbornscreening.hrsa.gov/your-state" />
      </div>
    </div>
  );
}

function FeedingSection() {
  return (
    <div>
      <p className="text-stone-600 leading-relaxed mb-4">
        第一周最花时间的事情就是喂养。无论是母乳、配方奶还是混合喂养，核心都是确认宝宝吃进去了、排出来了、体重没有掉得过头。
      </p>

      <h3 className="font-bold text-stone-800 mt-4 mb-3 text-lg">母乳喂养</h3>
      <p className="text-sm text-stone-600 mb-3">
        产后 2 到 5 天乳汁量才会明显上来。在此之前主要是<strong>初乳</strong>：量少但营养密度高、免疫价值高，而新生儿胃容量也非常小，所以这是正常设计，不代表“没奶”。
      </p>

      <DataTable
        headers={["时间", "胃容量大致", "单次量", "排泄参考（至少）"]}
        compact
        rows={[
          ["第 1 天", "樱桃大小（约 5–7 mL）", "每次 1–2 茶匙", "1 次尿 / 1 次便"],
          ["第 2 天", "核桃大小（约 15 mL）", "每次约 0.5 oz", "2 次尿 / 3 次便"],
          ["第 3 天", "核桃到杏子（约 25 mL）", "每次约 0.5–1 oz", "5 次尿 / 3 次便"],
          ["第 4 天", "鸡蛋大小（约 45–60 mL）", "每次约 1–2 oz", "6 次尿 / 3 次便"],
          ["第 5–7 天", "鸡蛋大小", "每次约 1–2 oz", "6+ 次尿 / 3+ 次黄便"],
          ["第 2 周后", "桃子大小", "每次 2–3 oz", "6+ 次尿 / 大便差异更大"],
        ]}
      />

      <Callout type="info" title="爸爸怎么帮母乳喂养">
        你虽然不能直接喂，但对母乳成功非常关键。给她递水、摆枕头、记录喂奶时间、帮拍嗝、尽量承包换尿布，并学习识别饥饿信号：找乳、舔嘴、吃拳头。
      </Callout>

      <h3 className="font-bold text-stone-800 mt-6 mb-3 text-lg">配方奶喂养</h3>
      <DataTable
        headers={["项目", "建议"]}
        rows={[
          ["喂养量", "前几天之后，多数宝宝每 2–3 小时约 2–3 oz。"],
          ["配方类型", "优先选择含铁配方奶。"],
          ["冲调", "严格按说明配比，不要自行稀释或加浓。不要微波炉加热。"],
          ["维生素 D", "纯母乳宝宝通常需要每日 400 IU 维生素 D。纯配方奶宝宝在每天达到 32 oz 以上前也可能仍需补充。"],
        ]}
      />

      <Callout type="warn" title="奶粉并不是无菌的">
        对于 <strong>2 个月以下</strong>、早产或免疫功能较弱的宝宝，CDC 提醒：奶粉可能带有少量细菌污染风险。
        条件允许时，即开即食液体配方更安全；如果必须用奶粉，注意按官方建议的高温冲调流程并及时冷却。
      </Callout>

      <h3 className="font-bold text-stone-800 mt-6 mb-3 text-lg">拍嗝</h3>
      <p className="text-sm text-stone-600">
        配方奶每喝 2–3 oz 或换边哺乳后都可以尝试拍嗝。常见姿势有趴肩、坐腿上托下巴、趴在腿上。力度不用太轻，但也不需要猛拍。
      </p>

      <div className="mt-4 flex flex-wrap gap-3">
        <Source name="AAP：Newborn Nutrition" url="https://www.aap.org/en/patient-care/newborn-and-infant-nutrition/" />
        <Source name="CDC：Breastfeeding Basics" url="https://www.cdc.gov/infant-toddler-nutrition/breastfeeding/newborn-basics.html" />
        <Source name="CDC：Formula Preparation" url="https://www.cdc.gov/infant-toddler-nutrition/formula-feeding/preparation-and-storage.html" />
      </div>
    </div>
  );
}

function SleepSection() {
  return (
    <div>
      <p className="text-stone-600 leading-relaxed mb-4">
        这是第一周里最不能靠感觉的一件事。安全睡眠规则看起来很简单，但确实直接关系到风险高低。
      </p>

      <div className="bg-stone-900 text-white rounded-xl p-6 my-4">
        <h3 className="text-lg font-bold mb-4 text-amber-400">安全睡眠 ABC（AAP 2022）</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-4xl font-black text-amber-400 mb-2">A</div>
            <div className="font-bold text-lg">Alone 独自睡</div>
            <p className="text-sm text-stone-300 mt-1">睡眠空间里只有宝宝和贴合床垫的床单，不要枕头、被子、玩偶或其他人。</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-black text-amber-400 mb-2">B</div>
            <div className="font-bold text-lg">Back 仰卧睡</div>
            <p className="text-sm text-stone-300 mt-1">每次白天小睡和夜间入睡都仰卧，至少坚持到 1 岁。</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-black text-amber-400 mb-2">C</div>
            <div className="font-bold text-lg">Crib 婴儿床</div>
            <p className="text-sm text-stone-300 mt-1">使用平整坚实、符合安全标准的婴儿床或摇篮，不用斜坡睡具、沙发或成人床。</p>
          </div>
        </div>
      </div>

      <DataTable
        headers={["规则", "原因"]}
        rows={[
          ["同房不同床", "让宝宝睡在你们房间里自己的床上，至少前 6 个月都值得努力。"],
          ["别把其他地方的睡着当成正式睡眠", "安全座椅、秋千、推车、躺椅不适合常规睡眠，睡着后尽快转移到平整睡面。"],
          ["不要把哺乳枕、豆荚窝、睡眠定位器当床", "只要不是通过安全标准认证的睡眠空间，就别用于睡觉。"],
          ["不要用加重襁褓或加重睡袋", "没有明确获益，反而可能增加风险。"],
          ["用睡袋代替毯子", "既保暖，也避免松散织物盖脸。"],
          ["出现翻身迹象就停止襁褓", "通常在 3–4 月龄开始出现，继续裹住会增加翻身后窒息风险。"],
          ["睡觉时可尝试安抚奶嘴", "与 SIDS 风险降低相关；如果纯母乳，通常等建立稳定后再引入。"],
          ["不要让宝宝接触烟雾", "二手烟是重要危险因素。"],
          ["不要过热", "一般比成人多穿一层即可；摸胸口发汗就说明太热。"],
        ]}
      />

      <Callout type="danger" title="最危险的往往不是婴儿床，而是大人太累">
        睡眠相关意外经常发生在大人抱着宝宝坐在沙发、躺椅或床边时不小心睡着。实在困得撑不住时，把宝宝先放回安全的婴儿床里。
      </Callout>

      <h3 className="font-bold text-stone-800 mt-6 mb-3 text-lg">新生儿睡眠现实</h3>
      <p className="text-sm text-stone-600 mb-2">
        新生儿一天通常会睡 16 到 17 小时，但都是 1 到 3 小时一段，没有昼夜概念。这个阶段的策略不是“训练睡整觉”，而是让大人尽量轮班休息并保证安全。
      </p>

      <div className="mt-4 flex flex-wrap gap-3">
        <Source name="CDC：Helping Babies Sleep Safely" url="https://www.cdc.gov/reproductive-health/features/babies-sleep.html" />
        <Source name="CDC：About SUID and SIDS" url="https://www.cdc.gov/sudden-infant-death/about/index.html" />
        <Source name="AAP：Safe Sleep Policy" url="https://publications.aap.org/pediatrics/article/150/1/e2022057990/188304/Sleep-Related-Infant-Deaths-Updated-2022" />
      </div>
    </div>
  );
}

function MotherSection() {
  return (
    <div>
      <p className="text-stone-600 leading-relaxed mb-4">
        很多爸爸没有被明确告知这一点：<strong>伴侣刚经历的是一次重大医疗事件</strong>。不管是顺产还是剖宫产，
        接下来几周她都需要你承担更多体力活、后勤和情绪支持。
      </p>

      <h3 className="font-bold text-stone-800 mt-4 mb-3 text-lg">身体恢复：常见情况与帮助方式</h3>
      <DataTable
        headers={["情况", "会发生什么", "你能怎么帮"]}
        rows={[
          ["会阴疼痛或撕裂", "很多顺产都会有不同程度撕裂，前一两周坐下会明显不舒服。", "准备冰敷、温水冲洗瓶、坐垫，不催她做体力活动。"],
          ["恶露出血", "前 2 到 4 周会像很重的月经一样逐渐减少。", "准备加长产妇卫生巾，注意是否出现每小时浸透 1 片以上的情况。"],
          ["子宫收缩痛", "哺乳时尤其明显，因为催产素会让子宫收缩。", "按医嘱用止痛药，准备热敷。"],
          ["涨奶", "通常在第 3 到第 5 天出现，胀、硬、痛都常见。", "喂奶前热敷、喂奶后冷敷，尽量帮助快速抱娃到位。"],
          ["激素变化", "夜汗、情绪波动、头发变化都很常见。", "多理解、少评判，先把现实任务接过去。"],
          ["便秘", "产后非常常见，也常让人害怕第一次排便。", "备好软便剂、纤维和水。"],
        ]}
      />

      <h3 className="font-bold text-stone-800 mt-6 mb-3 text-lg">如果转成剖宫产</h3>
      <DataTable
        headers={["信息", "对你意味着什么"]}
        compact
        rows={[
          ["住院 2–3 天", "比顺产更久，她上下床、去洗手间、抱娃都更需要帮助。"],
          ["6–8 周内避免提重物", "你会成为默认搬运工：安全座椅、推车、洗衣篮都由你来。"],
          ["切口护理", "注意红、肿、热、渗液等异常。"],
          ["疼痛管理", "帮她按时记录和提醒止痛药时间。"],
        ]}
      />

      <h3 className="font-bold text-stone-800 mt-6 mb-3 text-lg">如果孕期有高血压或子痫前期</h3>
      <Callout type="warn" title="产后血压随访一定别漏">
        ACOG 建议妊娠期高血压相关情况在产后 <strong>7 到 10 天内</strong>就复查血压。产后子痫前期可在分娩后 6 周内出现。
      </Callout>

      <h3 className="font-bold text-stone-800 mt-6 mb-3 text-lg">你每天可以直接承担的任务</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 my-4">
        {[
          "做饭或安排送餐",
          "拦访客，给她真正的休息时间",
          "洗衣服和收拾家里",
          "每次哺乳都主动递水",
          "尽量承担换尿布和部分夜班",
          "负责买菜、买药和跑腿",
          "接手宝宝，让她能洗澡、午睡、喘口气",
          "和家人沟通近况、设边界",
          "认真告诉她：她做得很好",
        ].map((task, index) => (
          <div key={index} className="bg-stone-50 rounded-lg px-4 py-2.5 text-sm text-stone-700 flex items-start gap-2">
            <span className="text-emerald-500 font-bold mt-0.5">→</span>
            {task}
          </div>
        ))}
      </div>

      <h3 className="font-bold text-stone-800 mt-6 mb-3 text-lg">心理健康</h3>
      <Callout type="warn" title="Baby Blues 和产后抑郁不是一回事">
        <strong>Baby Blues</strong> 很常见，通常在产后几天出现，两周内缓解，表现为爱哭、焦虑、情绪波动。
        <br /><br />
        <strong>产后抑郁</strong> 则更持续，可能表现为长期低落、无法入睡、对宝宝疏离、强烈自责，甚至有伤害自己或宝宝的念头。
        一旦超过两周仍明显存在，或者任何时候出现自伤/伤婴想法，都要马上求助专业人员。
      </Callout>

      <Callout type="info" title="爸爸也会受影响">
        父亲产后抑郁并不少见。长期睡眠不足、身份变化、关系压力和无力感都可能叠加。如果你状态明显不对，也值得主动求助。
      </Callout>

      <p className="text-sm text-stone-500 mt-2">
        ACOG 建议产后 3 周内先有一次早期随访，并在 6 到 12 周完成综合复查。
      </p>

      <div className="mt-3 flex flex-wrap gap-3">
        <Source name="ACOG：Optimizing Postpartum Care" url="https://www.acog.org/clinical/clinical-guidance/committee-opinion/articles/2018/05/optimizing-postpartum-care" />
        <Source name="ACOG：Postpartum Depression" url="https://www.acog.org/womens-health/faqs/postpartum-depression" />
        <Source name="CDC：Urgent Maternal Warning Signs" url="https://www.cdc.gov/hearher/maternal-warning-signs/index.html" />
      </div>
    </div>
  );
}

function DischargeSection() {
  return (
    <div>
      <p className="text-stone-600 leading-relaxed mb-4">
        出院往往是最容易掉链子的时刻。肾上腺素退了、睡眠不足、人一多就混乱，所以最好把该确认的事情逐项过一遍。
      </p>

      <h3 className="font-bold text-stone-800 mt-4 mb-3 text-lg">宝宝相关</h3>
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 my-4">
        <ul className="space-y-2.5 text-sm text-stone-700">
          {[
            ["新生儿筛查完成", "足跟血、听力和 CCHD 脉氧筛查都要确认，部分州还会要求后续复筛。"],
            ["黄疸计划明确", "拿到胆红素结果或明确复查时间。黄疸峰值常在回家后出现。"],
            ["喂养方案说清楚", "母乳、配方或混合喂养的频率、量和出现问题时联系谁。"],
            ["儿科复诊已预约", "通常在出院后 2–3 天或出生后 3–5 天。"],
            ["乙肝计划明确", "如果妈妈乙肝阳性或状态不明，出生剂次时间非常关键。"],
            ["RSV 保护方案明确", "确认是否由孕期母体疫苗覆盖，或宝宝是否需要长效抗体。"],
            ["安全座椅准备好", "确认安装、角度和固定方式。"],
          ].map(([title, desc], index) => (
            <li key={index} className="flex items-start gap-2">
              <span className="text-amber-600 mt-0.5">▪</span>
              <span><strong>{title}</strong> — {desc}</span>
            </li>
          ))}
        </ul>
      </div>

      <h3 className="font-bold text-stone-800 mt-6 mb-3 text-lg">妈妈相关</h3>
      <div className="bg-rose-50 border border-rose-200 rounded-xl p-4 my-4">
        <ul className="space-y-2.5 text-sm text-stone-700">
          {[
            ["处方药拿到手", "止痛药、软便剂、补铁等要在回家前准备好。"],
            ["复查时间已约", "常规产后复查、若有高血压则加血压复查。"],
            ["危险信号你也知道", "大出血、胸痛、呼吸困难、剧烈头痛、视力变化、单侧腿肿痛、自伤想法等。"],
            ["喂养支持联系方式", "泌乳顾问、医院热线或儿科喂养咨询电话。"],
          ].map(([title, desc], index) => (
            <li key={index} className="flex items-start gap-2">
              <span className="text-rose-500 mt-0.5">▪</span>
              <span><strong>{title}</strong> — {desc}</span>
            </li>
          ))}
        </ul>
      </div>

      <h3 className="font-bold text-stone-800 mt-6 mb-3 text-lg">这些电话先存好</h3>
      <Callout type="info" title="现在就加进通讯录">
        至少包括：儿科（白天和下班后）、产科/助产士、泌乳顾问、医院新生儿科，以及 <strong>Poison Control：1-800-222-1222</strong>。
      </Callout>

      <Callout type="tip" title="48 小时规则">
        如果你说不清“这肯定正常”，那就打电话问。出院头几天，儿科和产科本来就预期会接到很多此类电话。
      </Callout>

      <div className="mt-3 flex flex-wrap gap-3">
        <Source name="HRSA：Newborn Screening" url="https://newbornscreening.hrsa.gov/your-state" />
        <Source name="CDC：Hepatitis B" url="https://www.cdc.gov/media/releases/2025/fact-sheet-hepatitis-b-immunization.html" />
        <Source name="CDC：RSV Protection" url="https://www.cdc.gov/rsv/vaccines/protect-infants.html" />
        <Source name="CDC：Maternal Warning Signs" url="https://www.cdc.gov/hearher/maternal-warning-signs/index.html" />
      </div>
    </div>
  );
}

function DangerSection() {
  return (
    <div>
      <p className="text-stone-600 leading-relaxed mb-4">
        很多第一周看起来吓人的现象其实正常，但也有少数情况必须立刻处理。提前知道边界，能减少误判。
      </p>

      <h3 className="font-bold text-stone-800 mt-4 mb-3 text-lg">🚨 宝宝：联系儿科或直接去急诊</h3>
      <div className="bg-red-50 border border-red-200 rounded-xl p-4 my-4">
        <ul className="space-y-2 text-sm text-red-900">
          {[
            ["直肠体温 ≥ 38°C", "3 个月以下新生儿任何发热都算急症，不要先自行喂退烧药。"],
            ["呼吸费力", "鼻翼扇动、肋间凹陷、呻吟、嘴唇发青都要尽快处理。"],
            ["连续拒绝多次进食", "新生儿不应长时间不吃，伴随没精神时尤其紧急。"],
            ["尿布明显少于年龄应有水平", "特别是在喂养已经建立之后又突然变少。"],
            ["黄疸明显加重", "发黄扩展到腹腿或宝宝难叫醒时要尽快联系医生。"],
            ["喷射性呕吐", "普通溢奶常见，喷射性呕吐则不是。"],
            ["异常嗜睡或软塌", "难叫醒、无反应属于急症。"],
            ["脐带持续出血或有恶臭", "提示感染或处理异常。"],
          ].map(([title, desc], index) => (
            <li key={index}><strong>{title}</strong> — {desc}</li>
          ))}
        </ul>
      </div>

      <h3 className="font-bold text-stone-800 mt-6 mb-3 text-lg">🚨 妈妈：联系产科或直接去急诊</h3>
      <div className="bg-red-50 border border-red-200 rounded-xl p-4 my-4">
        <ul className="space-y-2 text-sm text-red-900">
          {[
            ["大出血或鸡蛋大小以上血块", "每小时浸透 1 片或以上卫生巾都不正常。"],
            ["恶臭分泌物或体温 ≥ 38°C", "可能提示子宫感染、切口感染或乳腺炎。"],
            ["剧烈头痛或视力变化", "可能是产后子痫前期。"],
            ["胸痛或呼吸困难", "可能涉及肺栓塞等严重情况。"],
            ["单侧腿肿、痛、红", "要警惕深静脉血栓。"],
            ["癫痫发作、晕厥、意识混乱", "立即拨打 911。"],
            ["伤害自己或宝宝的想法", "立刻求助急诊或拨打 / 发短信至 988。"],
          ].map(([title, desc], index) => (
            <li key={index}><strong>{title}</strong> — {desc}</li>
          ))}
        </ul>
      </div>

      <Callout type="danger" title="38°C 规则">
        对新生儿和妈妈来说，100.4°F / 38°C 都是很重要的门槛。尤其对 3 个月以下宝宝，发热就是急症。
      </Callout>

      <h3 className="font-bold text-stone-800 mt-6 mb-3 text-lg">这些看起来吓人但通常正常</h3>
      <DataTable
        headers={["你会看到什么", "为什么常常是正常的"]}
        compact
        rows={[
          ["头型一开始有点怪", "经过产道塑形，几天内会圆回来。"],
          ["脸上长疹子或红斑", "常与激素变化有关，多数会自行消退。"],
          ["黑绿色胎便", "前 1–2 天常见，之后会转成绿色再到黄色。"],
          ["惊跳或一抖一抖", "Moro 反射，属于正常神经反应。"],
          ["打嗝", "非常常见，不一定要处理。"],
          ["眼睛偶尔对不准", "眼肌还在发育，4 月龄前并不少见。"],
          ["打喷嚏", "多半是在清理鼻腔，不代表感冒。"],
        ]}
      />

      <div className="mt-4 flex flex-wrap gap-3">
        <Source name="CDC：Newborn Feeding Basics" url="https://www.cdc.gov/infant-toddler-nutrition/breastfeeding/newborn-basics.html" />
        <Source name="CDC：Maternal Warning Signs" url="https://www.cdc.gov/hearher/maternal-warning-signs/index.html" />
        <Source name="HealthyChildren：Getting Enough Milk" url="https://www.healthychildren.org/English/ages-stages/baby/breastfeeding/Pages/How-to-Tell-if-Baby-is-Getting-Enough-Milk.aspx" />
      </div>
    </div>
  );
}

const contentMap: Record<string, React.ReactNode> = {
  induction: <InductionSection />,
  "hospital-bag": <HospitalBagSection />,
  "labor-role": <LaborRoleSection />,
  newborn: <NewbornSection />,
  feeding: <FeedingSection />,
  sleep: <SleepSection />,
  discharge: <DischargeSection />,
  mother: <MotherSection />,
  danger: <DangerSection />,
};

export default function FirstWeekGuidePage() {
  const [activeSection, setActiveSection] = useState("induction");
  const active = sections.find((section) => section.id === activeSection)!;

  return (
    <div>
      <div className="bg-stone-900 text-white px-4 py-8 md:py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-amber-400 text-xs font-bold tracking-widest uppercase mb-3" style={{ fontFamily: "system-ui, sans-serif" }}>
            新手爸爸实战指南
          </div>
          <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-2">
            第一周你真正需要知道的事
          </h1>
          <p className="text-stone-400 text-lg">
            催产 → 分娩 → 新生儿护理 → 产后恢复
          </p>
          <p className="text-stone-500 text-xs mt-4" style={{ fontFamily: "system-ui, sans-serif" }}>
            主要参考 AAP、CDC、ACOG、HRSA、NHTSA 以及同行评审文献
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="flex flex-wrap gap-2 mb-8">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all ${
                activeSection === section.id
                  ? "bg-stone-900 text-white shadow-lg"
                  : "bg-white text-stone-600 hover:bg-stone-200 border border-stone-200"
              }`}
              style={{ fontFamily: "system-ui, sans-serif" }}
            >
              <span>{section.icon}</span>
              <span className="font-medium">{section.title}</span>
            </button>
          ))}
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-stone-200 p-6 md:p-8">
          <div className="flex items-center gap-3 mb-1">
            <span className="text-2xl">{active.icon}</span>
            <div>
              <h2 className="text-2xl font-bold text-stone-900">{active.title}</h2>
              <p className="text-stone-400 text-sm" style={{ fontFamily: "system-ui, sans-serif" }}>
                {active.subtitle}
              </p>
            </div>
          </div>
          <hr className="my-4 border-stone-200" />
          <div style={{ fontFamily: "system-ui, sans-serif" }}>
            {contentMap[activeSection]}
          </div>
        </div>

        <div className="flex justify-between mt-6 mb-12">
          {(() => {
            const index = sections.findIndex((section) => section.id === activeSection);
            const prev = index > 0 ? sections[index - 1] : null;
            const next = index < sections.length - 1 ? sections[index + 1] : null;

            return (
              <>
                {prev ? (
                  <button
                    onClick={() => setActiveSection(prev.id)}
                    className="text-sm text-stone-500 hover:text-stone-800 flex items-center gap-1"
                    style={{ fontFamily: "system-ui, sans-serif" }}
                  >
                    ← {prev.icon} {prev.title}
                  </button>
                ) : <div />}
                {next ? (
                  <button
                    onClick={() => setActiveSection(next.id)}
                    className="text-sm text-stone-500 hover:text-stone-800 flex items-center gap-1"
                    style={{ fontFamily: "system-ui, sans-serif" }}
                  >
                    {next.title} {next.icon} →
                  </button>
                ) : <div />}
              </>
            );
          })()}
        </div>

        <GiscusComments locale="zh" term="/guides/first-week" />
      </div>
    </div>
  );
}
