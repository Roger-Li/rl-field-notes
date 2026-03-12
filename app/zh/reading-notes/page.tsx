import { ReadingNotesIndexPage } from "@/components/LocalizedPages";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  locale: "zh",
  pathname: "/reading-notes",
  title: "读书笔记",
  description: "围绕育儿、睡眠和儿童发展书籍的摘要与行动要点。",
});

export default function ReadingNotesPage() {
  return <ReadingNotesIndexPage locale="zh" />;
}
