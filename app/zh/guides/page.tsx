import { GuidesIndexPage } from "@/components/LocalizedPages";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  locale: "zh",
  pathname: "/guides",
  title: "指南",
  description: "写给新手爸爸的实用指南，从分娩准备到新生儿日常照护。",
});

export default function GuidesPage() {
  return <GuidesIndexPage locale="zh" />;
}
