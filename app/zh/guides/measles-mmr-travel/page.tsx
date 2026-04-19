import { createPageMetadata } from "@/lib/metadata";
import MeaslesMmrTravelGuideZh from "@/content/guides/measles-mmr-travel/MeaslesMmrTravelGuideZh";

export const metadata = createPageMetadata({
  locale: "zh",
  pathname: "/guides/measles-mmr-travel",
  title: "麻疹、MMR 与带婴儿出行（美国，2026 年 4 月）",
  description:
    "面向 12 月龄以下婴儿家庭的快速指南：常规 MMR 接种时间、6–11 个月旅行加种以及暴露前后的应对要点。",
});

export default function Page() {
  return <MeaslesMmrTravelGuideZh />;
}
