import { createPageMetadata } from "@/lib/metadata";
import ImmunizationScheduleEn from "@/content/guides/immunization-schedule/ImmunizationScheduleEn";

export const metadata = createPageMetadata({
  locale: "en",
  pathname: "/guides/immunization-schedule",
  title: "Childhood Immunization Guide (US, 2026)",
  description:
    "Complete vaccine-by-vaccine guide with AAP vs CDC schedule comparison, from birth to 16 years.",
});

export default function Page() {
  return <ImmunizationScheduleEn />;
}
