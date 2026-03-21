import DeliveryTwoPage from "@/content/her-notes/delivery-2/DeliveryTwoZh";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  locale: "zh",
  pathname: "/her-notes/delivery-2",
  title: "催产日记（二）",
  description:
    "从入院到宫口全开：催产第一产程的完整时间轴记录。",
});

export default function Page() {
  return <DeliveryTwoPage />;
}
