import { createPageMetadata } from "@/lib/metadata";
import FormulaFeedingGuidePage from "@/content/guides/formula-feeding/FormulaFeedingGuideEn";

export const metadata = createPageMetadata({
  locale: "en",
  pathname: "/guides/formula-feeding",
  title: "How Much Formula Does My Baby Need?",
  description:
    "Weight-based formula calculator, age-based feeding chart, and practical guidelines for formula-fed infants — sourced from AAP, CDC, and Seattle Children's.",
});

export default function Page() {
  return <FormulaFeedingGuidePage />;
}
