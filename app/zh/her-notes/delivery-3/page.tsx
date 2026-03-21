import DeliveryThreePage from "@/content/her-notes/delivery-3/DeliveryThreeZh";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  locale: "zh",
  pathname: "/her-notes/delivery-3",
  title: "催产日记（三）",
  description:
    "二三产程以及产后的惊心动魄：从推挤到真空吸引，从昏厥到康复。",
});

export default function Page() {
  return <DeliveryThreePage />;
}
