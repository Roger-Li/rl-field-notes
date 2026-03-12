import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "About RL Field Notes — a new dad's knowledge hub for caregiving.",
};

export default function AboutPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-12">
      <h1 className="text-3xl font-bold text-stone-900 mb-6">About RL Field Notes</h1>

      <div className="prose prose-stone max-w-none space-y-4 text-stone-600 leading-relaxed">
        <p>
          <strong>RL Field Notes</strong> is a knowledge hub for new dads — a
          collection of guides, reading notes, and lessons learned during the
          first year of parenting.
        </p>
        <p>
          The name is a nod to <em>Reinforcement Learning</em> — the branch of
          machine learning where an agent learns optimal behavior through trial,
          error, and reward signals. Parenting works the same way: you observe,
          you act, you learn from the outcome, and you try again. Every day is a
          new episode.
        </p>
        <p>
          All guides are sourced from evidence-based resources (AAP, CDC, ACOG,
          Mayo Clinic, peer-reviewed literature) and personal experience. Reading
          notes summarize key parenting books with actionable takeaways.
        </p>

        <h2 className="text-xl font-bold text-stone-800 mt-8 mb-3">Contributing</h2>
        <p>
          Have feedback or a book recommendation? Leave a comment on any page
          using the Giscus comment section at the bottom, or open an issue on{" "}
          <a
            href="https://github.com/Roger-Li/rl-field-notes"
            target="_blank"
            rel="noopener noreferrer"
            className="text-amber-700 underline underline-offset-2 hover:text-amber-900"
          >
            GitHub
          </a>
          .
        </p>
      </div>
    </div>
  );
}
