import { HomePage } from "@/components/LocalizedPages";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  locale: "zh",
  pathname: "/",
  description: "写给新手爸爸的双语育儿知识站，包含实用指南和读书笔记。",
});

export default function Home() {
  return <HomePage locale="zh" />;
}
