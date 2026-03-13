import { createPageMetadata } from "@/lib/metadata";
import HappiestBabySummary from "@/content/reading-notes/happiest-baby-on-the-block/HappiestBabyEn";

export const metadata = createPageMetadata({
  locale: "en",
  pathname: "/reading-notes/happiest-baby-on-the-block",
  title: "The Happiest Baby on the Block",
  description:
    "Comprehensive summary of Dr. Harvey Karp's science-backed method to calm crying and boost infant sleep.",
});

export default function Page() {
  return <HappiestBabySummary />;
}
