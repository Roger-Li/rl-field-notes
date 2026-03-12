import { AboutPageContent } from "@/components/LocalizedPages";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  locale: "en",
  pathname: "/about",
  title: "About",
  description: "About RL Field Notes — a new dad's knowledge hub for caregiving.",
});

export default function AboutPage() {
  return <AboutPageContent locale="en" />;
}
