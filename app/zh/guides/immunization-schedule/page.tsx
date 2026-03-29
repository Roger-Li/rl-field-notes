import { createPageMetadata } from "@/lib/metadata";
import ImmunizationScheduleZh from "@/content/guides/immunization-schedule/ImmunizationScheduleZh";

export const metadata = createPageMetadata({
  locale: "zh",
  pathname: "/guides/immunization-schedule",
  title: "儿童疫苗接种指南（美国，2026）",
  description:
    "从出生到 16 岁的完整疫苗逐项指南，含 AAP 与 CDC 接种时间表对比。",
});

export default function Page() {
  return <ImmunizationScheduleZh />;
}
