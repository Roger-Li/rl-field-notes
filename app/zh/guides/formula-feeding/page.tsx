import { createPageMetadata } from "@/lib/metadata";
import FormulaFeedingGuidePage from "@/content/guides/formula-feeding/FormulaFeedingGuideZh";

export const metadata = createPageMetadata({
  locale: "zh",
  pathname: "/guides/formula-feeding",
  title: "宝宝每天需要喝多少配方奶？",
  description:
    "基于体重的配方奶计算器、按月龄喂养参考表和实用指南——资料来源：AAP、CDC、西雅图儿童医院。",
});

export default function Page() {
  return <FormulaFeedingGuidePage />;
}
