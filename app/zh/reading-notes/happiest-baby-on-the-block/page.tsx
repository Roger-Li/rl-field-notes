import HappiestBabySummaryZh from "@/content/reading-notes/happiest-baby-on-the-block/HappiestBabyZh";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  locale: "zh",
  pathname: "/reading-notes/happiest-baby-on-the-block",
  title: "《最快乐的宝宝》读书笔记",
  description:
    "Harvey Karp 医生基于科学的 5S 安抚法完整梳理，帮助新生儿在头几个月减少哭闹、改善睡眠。",
});

export default function Page() {
  return <HappiestBabySummaryZh />;
}
