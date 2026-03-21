import DeliveryTwoPage from "@/content/her-notes/delivery-2/DeliveryTwoEn";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  locale: "en",
  pathname: "/her-notes/delivery-2",
  title: "Induction Diary (Part 2)",
  description:
    "From hospital admission to full dilation — a timeline of the first stage of labor.",
});

export default function Page() {
  return <DeliveryTwoPage />;
}
