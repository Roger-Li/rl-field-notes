import { createPageMetadata } from "@/lib/metadata";
import TwelveHoursSleepEn from "@/content/reading-notes/twelve-hours-sleep/TwelveHoursSleepEn";

export const metadata = createPageMetadata({
  locale: "en",
  pathname: "/reading-notes/twelve-hours-sleep",
  title: "Twelve Hours' Sleep by Twelve Weeks Old",
  description:
    "Comprehensive summary and action items from Suzy Giordano's step-by-step sleep training method.",
});

export default function Page() {
  return <TwelveHoursSleepEn />;
}
