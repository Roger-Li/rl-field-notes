import { HerNotesIndexPage } from "@/components/LocalizedPages";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  locale: "en",
  pathname: "/her-notes",
  title: "Her Notes",
  description:
    "Personal narratives from the mother's perspective — delivery, recovery, and early motherhood.",
});

export default function HerNotesIndex() {
  return <HerNotesIndexPage locale="en" />;
}
