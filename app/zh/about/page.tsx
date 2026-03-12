import { AboutPageContent } from "@/components/LocalizedPages";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  locale: "zh",
  pathname: "/about",
  title: "关于",
  description: "关于 RL Field Notes：一个写给新手爸爸的育儿知识站。",
});

export default function AboutPage() {
  return <AboutPageContent locale="zh" />;
}
