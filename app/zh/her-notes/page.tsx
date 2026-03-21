import { HerNotesIndexPage } from "@/components/LocalizedPages";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  locale: "zh",
  pathname: "/her-notes",
  title: "她的笔记",
  description:
    "来自妈妈视角的亲历记录——分娩、恢复与初为人母的日子。",
});

export default function HerNotesPage() {
  return <HerNotesIndexPage locale="zh" />;
}
