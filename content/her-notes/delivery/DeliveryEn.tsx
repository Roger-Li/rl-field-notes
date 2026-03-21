"use client";

import { AudioPlayer } from "@/components/AudioPlayer";
import { GiscusComments } from "@/components/GiscusComments";
import { HerNotesBackground } from "@/components/HerNotesBackground";

export default function DeliveryEn() {
  return (
    <HerNotesBackground>
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      <header className="mb-10">
        <span className="text-xs font-semibold uppercase tracking-wide text-violet-700">
          Her Notes
        </span>
        <h1 className="mt-2 text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight">
          Induction Diary (Part 1)
        </h1>
        <p className="mt-3 text-stone-500 leading-relaxed">
          A mother&apos;s firsthand account of the final weeks of pregnancy and
          the road to an elective induction at 39 weeks.
        </p>
      </header>

      <AudioPlayer contentKey="her-notes/delivery" locale="en" />

      <article className="prose prose-stone max-w-none">
        <h2 className="text-xl font-bold text-violet-900 mt-10 mb-4">Mid-to-Late Pregnancy</h2>
        <p>
          At 24 weeks I passed the glucose tolerance test with flying colors. By
          28 weeks I&apos;d gained only about 2–3 kg from my pre-pregnancy weight.
          The 30-week growth scan put the baby&apos;s estimated weight right at
          the median — everything was tracking around the 50th percentile except
          for a larger-than-average biparietal diameter (BPD).
        </p>

        <h2 className="text-xl font-bold text-violet-900 mt-10 mb-4">Late Pregnancy (Weeks 30–36)</h2>
        <p>
          Between weeks 30 and 36, my belly grew noticeably fast and everything
          felt much heavier. I still kept up my routine — gym at least three
          times a week, 30 minutes each session, and mostly healthy meals — but
          between the pregnancy sweet tooth and work pressure (in the last two
          months of the third trimester, right after the holiday season, I
          finished writing an R01 as lead PI, completed major revisions on three
          papers, submitted a new manuscript, managed two ongoing MPI projects,
          and dealt with various co-author papers), I didn&apos;t fully commit
          to a diabetic-style low-carb diet. At the 36-week growth scan, on top
          of the already-large head, the baby had jumped to the 75th percentile
          for weight (3.2 kg) and the 89th percentile for abdominal
          circumference. Devastating.
        </p>
        <p>
          On my OB&apos;s recommendation, I learned about the ARRIVE Trial
          (elective induction at 39 weeks) and decided to make it our birth
          plan — choosing to try an early vaginal delivery over a scheduled
          C-section, since the latter is more invasive even though the outcome is
          more predictable.
        </p>

        <h2 className="text-xl font-bold text-violet-900 mt-10 mb-4">From 36 Weeks</h2>
        <p>
          Stretch marks appeared overnight and multiplied by the day. The strict
          sugar and carb control also took a toll on my mental state. But the
          numbers suggested it was working: during the controlled period the baby
          gained roughly 200 g per week (after 36 weeks), compared to about
          250 g per week during the uncontrolled stretch (weeks 30–36).
        </p>

        <h2 className="text-xl font-bold text-violet-900 mt-10 mb-4">39-Week Checkup</h2>
        <p>
          The cervical exam showed a soft cervix with the baby&apos;s head
          sitting low — good conditions for induction. My OB said we probably
          wouldn&apos;t need the full series of scary-sounding procedures (even
          though I studied medicine in undergrad, learning how to perform
          procedures on patients versus being the patient yourself are very
          different experiences). Sublingual misoprostol plus IV Pitocin should
          be enough. The whole discussion left us feeling pretty pumped.
        </p>

        <h2 className="text-xl font-bold text-violet-900 mt-10 mb-4">Waiting for Admission</h2>
        <p>
          Since this was an elective induction with no medical emergency, we were
          added to the hospital&apos;s waitlist with no guaranteed admission
          time. With the mindset of &quot;already full-term, the sooner the
          better,&quot; we spent the following days on call, checking in with the
          hospital daily, until we finally got the word: come in at 39 weeks and
          4 days, early morning. My partner and I packed up our massive suitcase,
          nerves and excitement buzzing, and headed to the Labor &amp; Delivery
          building we&apos;d studied so many times during our prenatal prep.
        </p>
      </article>

      <GiscusComments locale="en" term="/her-notes/delivery" />
    </div>
    </HerNotesBackground>
  );
}
