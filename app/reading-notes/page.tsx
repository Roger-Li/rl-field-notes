import { ContentCard } from "@/components/ContentCard";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reading Notes",
  description: "Summaries and action items from parenting and child development books.",
};

export default function ReadingNotesIndex() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      <h1 className="text-3xl font-bold text-stone-900 mb-2">Reading Notes</h1>
      <p className="text-stone-500 mb-8">
        Detailed summaries and action items from books on parenting, sleep, and child development.
      </p>
      <div className="grid gap-6">
        <ContentCard
          href="/reading-notes/twelve-hours-sleep"
          icon="📚"
          tag="Book Summary"
          title="Twelve Hours' Sleep by Twelve Weeks Old"
          description="Comprehensive summary and action items from Suzy Giordano's step-by-step sleep training method."
        />
      </div>
    </div>
  );
}
