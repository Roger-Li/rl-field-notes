import { ContentCard } from "@/components/ContentCard";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Guides",
  description: "Practical guides for new dads — from labor and delivery to daily newborn care.",
};

export default function GuidesIndex() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      <h1 className="text-3xl font-bold text-stone-900 mb-2">Guides</h1>
      <p className="text-stone-500 mb-8">
        Practical, evidence-based guides for navigating fatherhood.
      </p>
      <div className="grid gap-6">
        <ContentCard
          href="/guides/first-week"
          icon="👶"
          tag="Guide"
          title="New Dad Field Guide: First Week"
          description="Everything you need to know for labor, delivery, and the first days at home — from induction to safe sleep."
        />
      </div>
    </div>
  );
}
