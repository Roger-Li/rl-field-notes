import DeliveryThreePage from "@/content/her-notes/delivery-3/DeliveryThreeEn";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  locale: "en",
  pathname: "/her-notes/delivery-3",
  title: "Induction Diary (Part 3)",
  description:
    "The second and third stages of labor, and the postpartum rollercoaster — from pushing to vacuum delivery to a fainting scare.",
});

export default function Page() {
  return <DeliveryThreePage />;
}
