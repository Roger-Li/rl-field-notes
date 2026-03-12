import { ReadingNotesIndexPage } from "@/components/LocalizedPages";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  locale: "en",
  pathname: "/reading-notes",
  title: "Reading Notes",
  description: "Summaries and action items from parenting and child development books.",
});

export default function ReadingNotesIndex() {
  return <ReadingNotesIndexPage locale="en" />;
}
