import { ContentCard } from "@/components/ContentCard";

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
      {/* Hero */}
      <div className="text-center mb-16">
        <h1 className="text-4xl sm:text-5xl font-bold text-stone-900 tracking-tight">
          RL Field Notes
        </h1>
        <p className="mt-4 text-lg text-stone-500 max-w-xl mx-auto leading-relaxed">
          Learning through experience, one episode at a time. A collection of
          guides and reading notes for navigating the first year of fatherhood.
        </p>
      </div>

      {/* Content cards */}
      <div className="grid gap-6 sm:grid-cols-2">
        <ContentCard
          href="/guides/first-week"
          icon="👶"
          tag="Guide"
          title="New Dad Field Guide: First Week"
          description="Everything you need to know for labor, delivery, and the first days at home — from induction to safe sleep."
        />
        <ContentCard
          href="/reading-notes/twelve-hours-sleep"
          icon="📚"
          tag="Reading Notes"
          title="Twelve Hours' Sleep by Twelve Weeks Old"
          description="Detailed summary and action items from Suzy Giordano's sleep training method."
        />
      </div>
    </div>
  );
}
