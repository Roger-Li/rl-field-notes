import { createPageMetadata } from "@/lib/metadata";
import MilkSuppressionBottleFeedingZh from "@/content/guides/milk-suppression-bottle-feeding/MilkSuppressionBottleFeedingZh";

export const metadata = createPageMetadata({
  locale: "zh",
  pathname: "/guides/milk-suppression-bottle-feeding",
  title: "回奶与瓶喂优化指南",
  description:
    "产后回奶管理与瓶喂优化的循证指南——来自产后第12天的泌乳咨询。",
});

export default function Page() {
  return <MilkSuppressionBottleFeedingZh />;
}
