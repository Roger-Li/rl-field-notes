import { createPageMetadata } from "@/lib/metadata";
import MeaslesMmrTravelGuideEn from "@/content/guides/measles-mmr-travel/MeaslesMmrTravelGuideEn";

export const metadata = createPageMetadata({
  locale: "en",
  pathname: "/guides/measles-mmr-travel",
  title: "Measles, MMR, and Travel With Babies (U.S., April 2026)",
  description:
    "Fast-follow guide for parents with infants under 12 months: routine MMR timing, the 6–11 month travel dose, and what to do before and after exposure.",
});

export default function Page() {
  return <MeaslesMmrTravelGuideEn />;
}
