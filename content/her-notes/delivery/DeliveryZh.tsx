"use client";

import { AudioPlayer } from "@/components/AudioPlayer";
import { GiscusComments } from "@/components/GiscusComments";
import { HerNotesBackground } from "@/components/HerNotesBackground";

export default function DeliveryZh() {
  return (
    <HerNotesBackground>
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      <header className="mb-10">
        <span className="text-xs font-semibold uppercase tracking-wide text-violet-700">
          她的笔记
        </span>
        <h1 className="mt-2 text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight">
          催产日记（一）
        </h1>
        <p className="mt-3 text-stone-500 leading-relaxed">
          一位新手妈妈的亲历记录：从产检到等待入院，漫长孕晚期的真实感受。
        </p>
      </header>

      <AudioPlayer contentKey="her-notes/delivery" locale="zh" />

      <article className="prose prose-stone max-w-none">
        <h2 className="text-xl font-bold text-violet-900 mt-10 mb-4">孕中晚期</h2>
        <p>
          怀孕24周高分通过糖耐测试，28周较孕前体重增长2–3公斤左右，以及30周growth scan崽子体重估值中位数，除了双顶径大其他指标都在中位数附近。
        </p>

        <h2 className="text-xl font-bold text-violet-900 mt-10 mb-4">孕晚期（30–36周）</h2>
        <p>
          30–36周明显感觉腹围增长很迅速以及变沉重，虽然仍旧保证了一周至少三次每次半小时健身房以及正餐基本健康饮食，但可能因为怀孕嗜甜以及工作压力比较大（孕晚期最后两个月holiday season结束后作为lead PI写完了一个R01，改完了三篇文章major revision，另投出了一篇新文章，以及MPI两个on-going的项目，若干coauthor文章），没有完全戒零食遵循糖尿病/控碳水饮食。36周growth scan崽在双顶径大的基础上还变成了体重75%（3.2kg），腹围89%的大崽，天崩地裂。
        </p>
        <p>
          在OB的推荐下了解ARRIVE Trial（39周催产），决定作为接下来的生产计划——在直接剖和试试早点顺之间选择了后者，因为毕竟前者更invasive，虽然结局的不确定性小。
        </p>

        <h2 className="text-xl font-bold text-violet-900 mt-10 mb-4">36周开始</h2>
        <p>
          一夜爆纹，并且妊娠纹以天为单位生长。另外因为比较严格的控糖控碳水，心态有点崩。但事实证明可能确实有用，控糖期崽每周平均生长大概200g（36周以后），不控的话大概一周长250g（30–36周速率）。
        </p>

        <h2 className="text-xl font-bold text-violet-900 mt-10 mb-4">39周孕检</h2>
        <p>
          内检提示宫颈很软，胎头低，催产条件还不错，OB建议催产也许不需要一系列非常听起来scary的操作（虽然我本科学医但是学习如何使用在患者身上和自己就是患者体验非常不同），使用含服miso（前列腺素）+ 静脉催产素即可。一通讨论给我们整得很振奋。
        </p>

        <h2 className="text-xl font-bold text-violet-900 mt-10 mb-4">等待入院</h2>
        <p>
          因为是主动选择早催没有medical emergency，因此被加在医院的waitlist上不知道什么时间会被叫入院。本着已经足月越早越好的态度，接下来每天都在on call以及电话医院availability状态，直到被通知39+4凌晨入院。与队友非常紧张激动地收拾好一大箱行李来到了孕期学了很多遍的Labor &amp; Delivery building。
        </p>
      </article>

      <GiscusComments locale="zh" term="/her-notes/delivery" />
    </div>
    </HerNotesBackground>
  );
}
