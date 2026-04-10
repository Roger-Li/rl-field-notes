import { createPageMetadata } from "@/lib/metadata";
import InfantExperimentsEn from "@/content/guides/infant-experiments/InfantExperimentsEn";

export const metadata = createPageMetadata({
  locale: "en",
  pathname: "/guides/infant-experiments",
  title: "Classic Infant Psychology Experiments You Can Try at Home",
  description:
    "Hands-on adaptations of classic developmental psychology experiments — peekaboo, still-face, contingency learning, and imitation — for parents of 4–6 month olds.",
});

export default function Page() {
  return <InfantExperimentsEn />;
}
