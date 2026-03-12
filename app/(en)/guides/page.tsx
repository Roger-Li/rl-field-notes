import { GuidesIndexPage } from "@/components/LocalizedPages";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  locale: "en",
  pathname: "/guides",
  title: "Guides",
  description: "Practical guides for new dads — from labor and delivery to daily newborn care.",
});

export default function GuidesIndex() {
  return <GuidesIndexPage locale="en" />;
}
