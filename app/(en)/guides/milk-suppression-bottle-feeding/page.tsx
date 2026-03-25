import { createPageMetadata } from "@/lib/metadata";
import MilkSuppressionBottleFeedingEn from "@/content/guides/milk-suppression-bottle-feeding/MilkSuppressionBottleFeedingEn";

export const metadata = createPageMetadata({
  locale: "en",
  pathname: "/guides/milk-suppression-bottle-feeding",
  title: "Milk Suppression & Bottle Feeding",
  description:
    "Evidence-checked guidance for managing postpartum milk production and optimizing bottle feeding — from a Day 12 lactation consultation.",
});

export default function Page() {
  return <MilkSuppressionBottleFeedingEn />;
}
