"use client";

import { AudioPlayer } from "@/components/AudioPlayer";
import { GiscusComments } from "@/components/GiscusComments";
import { HerNotesBackground } from "@/components/HerNotesBackground";

export default function DeliveryTwoZh() {
  return (
    <HerNotesBackground>
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      <header className="mb-10">
        <span className="text-xs font-semibold uppercase tracking-wide text-violet-700">
          她的笔记
        </span>
        <h1 className="mt-2 text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight">
          催产日记（二）
        </h1>
        <p className="mt-3 text-stone-500 leading-relaxed">
          从入院到宫口全开：催产第一产程的完整时间轴记录。
        </p>
      </header>

      <AudioPlayer contentKey="her-notes/delivery-2" locale="zh" />

      <article className="prose prose-stone max-w-none">
        <p>
          虽然39周内检显示也许催产操作不用特别多，但入院后见了另一位ob还是在缩短第一产程的建议下把能经历的操作经历了遍，以下按照时间轴，可能存在时间轴不完全精确因为后面确实操作比较密集以及有点神志不完全清楚。
        </p>

        <h2 className="text-xl font-bold text-violet-900 mt-10 mb-4">5:30am</h2>
        <p>进入labor &amp; delivery room。</p>

        <h2 className="text-xl font-bold text-violet-900 mt-10 mb-4">6:00am</h2>
        <p>
          服用第一颗miso，放置留置针开放静脉通路，抽产前血样。此时可以吃正常食物于是和老公点了一些omelet（当天最后的食物）。
        </p>

        <h2 className="text-xl font-bold text-violet-900 mt-10 mb-4">7:00am</h2>
        <p>
          见到了孕检的ob，问我能不能内检，大意了没问清楚她要干嘛，被顺便做了membrane sweep，巨痛并且出了不少血。被建议接下来一步继续为了缩短第一产程放置水囊缩短宫颈。趁着还能自由活动迅速下床上了个厕所（当天最后一次自己上厕所）。
        </p>

        <h2 className="text-xl font-bold text-violet-900 mt-10 mb-4">7:30am</h2>
        <p>为减少放置水囊疼痛注射了一针narcotic药，瞬间晕了。</p>

        <h2 className="text-xl font-bold text-violet-900 mt-10 mb-4">8:00am</h2>
        <p>
          原来的ob被叫走手术，来了另一位ob放置水囊。可能因为注射了麻醉药，体验并没有上一步恐怖。水囊放置完成后有根管子粘在大腿上，被告知已经开始2–3公分，此时尚且可以活动。
        </p>

        <h2 className="text-xl font-bold text-violet-900 mt-10 mb-4">10:00–10:53am</h2>
        <p>
          开始普通生理盐水静脉滴注，之后麻醉师有空后过来打上了无痛。无痛时没感受到太多宫缩所以还好，姿势要求在床沿坐直脚垂下抱着个枕头，somehow感觉很冷于是抖个不停。
        </p>

        <h2 className="text-xl font-bold text-violet-900 mt-10 mb-4">12:00pm</h2>
        <p>
          开始静脉滴注pitocin催产，开始感觉到宫缩（感受到宫底变硬抵住一侧肋骨，但是没有痛感）。
        </p>

        <h2 className="text-xl font-bold text-violet-900 mt-10 mb-4">2:39pm</h2>
        <p>
          感觉好饿问护士能不能喝橙汁，被告知只能clear fluid，于是放弃。护士试着拉水囊然后水囊就出来了，此时被告知开指3–5cm。
        </p>

        <h2 className="text-xl font-bold text-violet-900 mt-10 mb-4">2:45pm</h2>
        <p>
          护士还没来得及告知ob，我就感觉到&ldquo;砰&rdquo;的一声，然后一坨水出来了。护士检查后告知是羊水破了。
        </p>

        <h2 className="text-xl font-bold text-violet-900 mt-10 mb-4">3:12pm</h2>
        <p>
          似乎是无痛有个点cover不住，左下腹特别疼，于是自己加了无痛剂量（每20分钟才允许自己加一个dose）。
        </p>

        <h2 className="text-xl font-bold text-violet-900 mt-10 mb-4">3:25pm</h2>
        <p>ob来了再次内检，宫口已开7cm，in active labor。</p>

        <h2 className="text-xl font-bold text-violet-900 mt-10 mb-4">6:11pm</h2>
        <p>ob再次来内检，发现宫口全开，胎位+1，可以开始push了。</p>
      </article>

      <GiscusComments locale="zh" term="/her-notes/delivery-2" />
    </div>
    </HerNotesBackground>
  );
}
