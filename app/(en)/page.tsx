import { HomePage } from "@/components/LocalizedPages";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  locale: "en",
  pathname: "/",
  description:
    "A new dad's knowledge hub with practical guides and reading notes for the first year of parenting.",
});

export default function Home() {
  return <HomePage locale="en" />;
}
