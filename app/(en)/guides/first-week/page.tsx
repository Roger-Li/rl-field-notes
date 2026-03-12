import { createPageMetadata } from "@/lib/metadata";
import FirstWeekGuidePage from "@/content/guides/first-week/FirstWeekGuideEn";

export const metadata = createPageMetadata({
  locale: "en",
  pathname: "/guides/first-week",
  title: "New Dad Field Guide: First Week",
  description:
    "Everything you need to know for labor, delivery, and the first days at home — from induction to safe sleep.",
});

export default function Page() {
  return <FirstWeekGuidePage />;
}
