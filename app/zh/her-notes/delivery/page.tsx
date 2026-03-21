import DeliveryPage from "@/content/her-notes/delivery/DeliveryZh";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  locale: "zh",
  pathname: "/her-notes/delivery",
  title: "催产日记（一）",
  description:
    "一位新手妈妈的亲历记录：从产检到等待入院，漫长孕晚期的真实感受。",
});

export default function Page() {
  return <DeliveryPage />;
}
