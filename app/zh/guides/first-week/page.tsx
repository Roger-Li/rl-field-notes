import FirstWeekGuidePage from "@/content/guides/first-week/FirstWeekGuideZh";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  locale: "zh",
  pathname: "/guides/first-week",
  title: "新手爸爸实战指南：第一周",
  description:
    "从催产、分娩到回家后的头几天与安全睡眠，梳理新手爸爸最需要知道的关键事项。",
});

export default function Page() {
  return <FirstWeekGuidePage />;
}
