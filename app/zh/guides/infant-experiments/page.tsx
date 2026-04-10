import { createPageMetadata } from "@/lib/metadata";
import InfantExperimentsZh from "@/content/guides/infant-experiments/InfantExperimentsZh";

export const metadata = createPageMetadata({
  locale: "zh",
  pathname: "/guides/infant-experiments",
  title: "在家也能做的经典婴儿心理学实验",
  description:
    "经典婴儿心理学实验的居家改编——躲猫猫、静止脸、踢腿联动与模仿——附详细步骤与安全指引，适合4–6个月宝宝。",
});

export default function Page() {
  return <InfantExperimentsZh />;
}
