"use client";

import { AudioPlayer } from "@/components/AudioPlayer";
import { GiscusComments } from "@/components/GiscusComments";
import { HerNotesBackground } from "@/components/HerNotesBackground";

export default function DeliveryTwoEn() {
  return (
    <HerNotesBackground>
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      <header className="mb-10">
        <span className="text-xs font-semibold uppercase tracking-wide text-violet-700">
          Her Notes
        </span>
        <h1 className="mt-2 text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight">
          Induction Diary (Part 2)
        </h1>
        <p className="mt-3 text-stone-500 leading-relaxed">
          From hospital admission to full dilation — a timeline of the first
          stage of labor.
        </p>
      </header>

      <AudioPlayer contentKey="her-notes/delivery-2" locale="en" />

      <article className="prose prose-stone max-w-none">
        <p>
          Although the 39-week cervical exam suggested that I might not need too
          many interventions, the on-duty OB I met after admission still
          recommended going through the full protocol to shorten the first stage.
          What follows is a timeline — the later entries may not be perfectly
          precise, because things got quite hectic and my awareness was fading in
          and out.
        </p>

        <h2 className="text-xl font-bold text-violet-900 mt-10 mb-4">5:30 AM</h2>
        <p>Entered the Labor &amp; Delivery room.</p>

        <h2 className="text-xl font-bold text-violet-900 mt-10 mb-4">6:00 AM</h2>
        <p>
          Took the first misoprostol tablet, got an IV line placed, and had
          pre-labor blood drawn. I was still allowed to eat at this point, so my
          husband and I ordered some omelets — the last real food I&apos;d have
          that day.
        </p>

        <h2 className="text-xl font-bold text-violet-900 mt-10 mb-4">7:00 AM</h2>
        <p>
          Met my prenatal OB. She asked if she could do a cervical check — I
          agreed without clarifying what exactly she had in mind, and she went
          ahead and did a membrane sweep. Extremely painful, and quite a bit of
          bleeding. She then recommended placing a Foley balloon catheter to
          further ripen the cervix and shorten the first stage. While I could
          still move freely, I rushed to the bathroom — my last self-powered
          trip to the toilet that day.
        </p>

        <h2 className="text-xl font-bold text-violet-900 mt-10 mb-4">7:30 AM</h2>
        <p>
          Received a narcotic injection to reduce the pain of the balloon
          placement. Instantly felt knocked out.
        </p>

        <h2 className="text-xl font-bold text-violet-900 mt-10 mb-4">8:00 AM</h2>
        <p>
          The original OB was called away for surgery, so a different OB came to
          place the Foley balloon. Possibly because of the narcotic, the
          experience wasn&apos;t as terrifying as the membrane sweep. After the
          balloon was in place, a tube was taped to my thigh. I was told I was
          at 2–3 cm dilation — still able to move around.
        </p>

        <h2 className="text-xl font-bold text-violet-900 mt-10 mb-4">10:00–10:53 AM</h2>
        <p>
          Started a normal saline IV drip. Then, once the anesthesiologist was
          available, I got the epidural. I wasn&apos;t feeling many contractions
          at that point, so it went okay. They had me sit upright on the edge
          of the bed with my feet dangling, hugging a pillow. I felt incredibly
          cold and couldn&apos;t stop shaking.
        </p>

        <h2 className="text-xl font-bold text-violet-900 mt-10 mb-4">12:00 PM</h2>
        <p>
          Pitocin drip started. I began feeling contractions — the top of my
          uterus would harden and press against my ribs, but there was no pain.
        </p>

        <h2 className="text-xl font-bold text-violet-900 mt-10 mb-4">2:39 PM</h2>
        <p>
          Starving. I asked the nurse if I could have some orange juice. Told I
          could only have clear fluids — gave up. The nurse tried a gentle tug
          on the balloon, and it came right out. I was at 3–5 cm dilated.
        </p>

        <h2 className="text-xl font-bold text-violet-900 mt-10 mb-4">2:45 PM</h2>
        <p>
          Before the nurse could even notify the OB, I felt a distinct
          &quot;pop&quot; followed by a big gush of fluid. The nurse confirmed
          my membranes had ruptured spontaneously.
        </p>

        <h2 className="text-xl font-bold text-violet-900 mt-10 mb-4">3:12 PM</h2>
        <p>
          The epidural seemed to have a gap — my lower-left abdomen was in
          serious pain. I self-administered an extra dose (you&apos;re only
          allowed one every 20 minutes).
        </p>

        <h2 className="text-xl font-bold text-violet-900 mt-10 mb-4">3:25 PM</h2>
        <p>
          OB arrived for another cervical check — 7 cm dilated, in active labor.
        </p>

        <h2 className="text-xl font-bold text-violet-900 mt-10 mb-4">6:11 PM</h2>
        <p>
          OB checked again — fully dilated, baby at station +1. Time to push.
        </p>
      </article>

      <GiscusComments locale="en" term="/her-notes/delivery-2" />
    </div>
    </HerNotesBackground>
  );
}
