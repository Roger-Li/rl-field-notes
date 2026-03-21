import { createPageMetadata } from "@/lib/metadata";
import TwelveHoursSleepZh from "@/content/reading-notes/twelve-hours-sleep/TwelveHoursSleepZh";

export const metadata = createPageMetadata({
  locale: "zh",
  pathname: "/reading-notes/twelve-hours-sleep",
  title: "《12 周睡整夜》读书笔记",
  description:
    "对 Suzy Giordano 睡眠训练方法的完整梳理，以及可直接执行的行动要点。",
});

export default function Page() {
  return <TwelveHoursSleepZh />;
}
