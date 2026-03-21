import DeliveryPage from "@/content/her-notes/delivery/DeliveryEn";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  locale: "en",
  pathname: "/her-notes/delivery",
  title: "Induction Diary (Part 1)",
  description:
    "A mother's firsthand account of the final weeks of pregnancy and the road to an elective induction at 39 weeks.",
});

export default function Page() {
  return <DeliveryPage />;
}
