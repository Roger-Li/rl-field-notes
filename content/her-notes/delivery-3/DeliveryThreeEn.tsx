"use client";

import Image from "next/image";
import { AudioPlayer } from "@/components/AudioPlayer";
import { GiscusComments } from "@/components/GiscusComments";
import { HerNotesBackground } from "@/components/HerNotesBackground";

export default function DeliveryThreeEn() {
  return (
    <HerNotesBackground>
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      <header className="mb-10">
        <span className="text-xs font-semibold uppercase tracking-wide text-violet-700">
          Her Notes
        </span>
        <h1 className="mt-2 text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight">
          Induction Diary (Part 3)
        </h1>
        <p className="mt-3 text-stone-500 leading-relaxed">
          The second and third stages of labor, and the postpartum rollercoaster
          — from pushing to vacuum delivery to a fainting scare.
        </p>
      </header>

      <AudioPlayer contentKey="her-notes/delivery-3" locale="en" />

      <article className="prose prose-stone max-w-none">
        <h2 className="text-xl font-bold text-violet-900 mt-10 mb-4">Second Stage</h2>
        <p>
          Compared to the relatively smooth first stage, the drama came during
          the second and third stages — and after.
        </p>
        <p>
          Once I was fully dilated at 6:00 PM, I began pushing with the help
          of one OB, one RN, and my husband. I&apos;d kept up a weightlifting
          routine before and during pregnancy, so physically I didn&apos;t feel
          too exhausted. The real suffering came from the left lower abdomen that
          the epidural simply couldn&apos;t cover.
        </p>
        <p>
          During pushing I was asked to switch positions to match the baby&apos;s
          heart-rate patterns — left side, right side, adjusting the angle of my
          legs. The doctor was hilariously enthusiastic, letting out a battle cry
          with each of my three pushes per contraction. But things stalled
          quickly: despite my best effort, the baby&apos;s head never crowned.
          After two hours the OB could see I was tiring and suggested a 30-minute
          break. After the rest I pushed for another half hour, but progress
          remained poor.
        </p>

        <h2 className="text-xl font-bold text-violet-900 mt-10 mb-4">The Decision</h2>
        <p>
          Although I still felt I had stamina, the OB — experienced and
          matter-of-fact — sat us down for a talk. She felt the pushing progress
          was insufficient (the baby&apos;s head was only about 30 % visible),
          the baby&apos;s heart rate was showing decelerations, and recovery
          after contractions was too slow. She gave us two options:
        </p>
        <ol>
          <li>
            <strong>Vacuum extraction</strong> — attempt to suction the
            baby&apos;s head out. Because of the risk to the baby, a maximum of
            three attempts would be allowed. If unsuccessful, we would convert to
            a C-section. The vacuum would also mean a higher risk of scalp injury
            for the baby, and more severe perineal tearing or an episiotomy for
            me.
          </li>
          <li>
            <strong>Straight to C-section</strong> — but because the baby was
            already very low, they would first need to push him back up before
            operating (a scenario my undergrad obstetrics classes never quite
            covered — sounded terrifying).
          </li>
        </ol>
        <p>
          The OB told us to discuss and decide. My husband said it was my call.
          My reasoning: I knew that without assistance I could push forever and
          this big baby still wouldn&apos;t come out on his own. Vacuum carries
          less risk than forceps, and any scalp injury would most likely heal. It
          didn&apos;t make sense to skip straight to the worst-case scenario
          without trying. So I told my husband and the doctor: let&apos;s go
          with the vacuum first.
        </p>

        <h2 className="text-xl font-bold text-violet-900 mt-10 mb-4">Baby Is Born</h2>
        <p>
          The moment the decision was made, the room suddenly flooded with
          people — the NICU team had arrived. The atmosphere turned very
          serious, which frankly scared both my husband and me. With the next
          contraction, I pushed with everything I had while the OB attached a
          white device to the baby&apos;s head, and in one swift moment the baby
          was out and placed on my chest. My subjective experience? It felt like
          passing the biggest poop of my life. The baby was surprisingly heavy,
          crying and squirming non-stop. The nurse asked if I wanted to hold him.
          I declined — &quot;We haven&apos;t been properly introduced
          yet,&quot; I joked.
        </p>

        <h2 className="text-xl font-bold text-violet-900 mt-10 mb-4">Third Stage &amp; Stitching</h2>
        <p>
          The baby was taken to the warmer for his newborn assessment. The
          placenta delivered quickly and completely — I barely felt it, though
          my husband described it as &quot;an enormous bloody mass of flesh.&quot;
          Then came the stitching, which felt like it lasted forever — probably
          close to 30 minutes. I could feel the needle piercing, but no pain.
          I shook uncontrollably the entire time, feeling freezing cold.
          Afterward, I texted our families the news and promptly fell into a deep
          sleep.
        </p>

        <h2 className="text-xl font-bold text-violet-900 mt-10 mb-4">The Postpartum Scare</h2>
        <p>
          Some time later a new nurse came in and pressed down hard on my
          abdomen — they did this countless times throughout my stay, but since
          I didn&apos;t have a surgical incision I found it bearable. Each press
          squeezed out a wave of fluid (blood, presumably) and she checked my
          perineal wound. I drifted in and out of consciousness, vaguely aware of
          the nurse observing and charting beside my bed. About two or three
          hours later she woke me up.
        </p>
        <p>
          This time the anesthesiologist came to remove the epidural catheter
          from my back. Once the nurse confirmed I was okay, she told me to get
          up and go to the bathroom. I didn&apos;t feel quite ready, but once I
          was on my feet it wasn&apos;t too bad. I hung onto the nurse with both
          arms and shuffled to the toilet. Just as the nurse asked my husband to
          help me pull down my pants, a wave of nausea hit me…
        </p>
        <p>
          When I opened my eyes, it felt like I&apos;d been asleep for hours
          and had a vivid dream. The scene before me looked like something out
          of a TV show — except this time I was the patient, looking up at a
          circle of serious faces staring down at me: &quot;Do you know what
          happened?&quot; Very dramatic. I answered: &quot;No, I think I just
          blacked out.&quot; Apparently I had fainted — likely from blood loss,
          exhaustion, low blood sugar, or a vasovagal response. The nurse
          immediately pulled the emergency cord, and several staff rushed in to
          haul me back to the bed.
        </p>
        <p>
          Everyone says the big postpartum fear is not being able to pee and
          getting re-catheterized. Well, I achieved that milestone with flying
          colors: worried that a full bladder was impeding uterine contraction,
          the team promptly re-inserted a catheter to drain my bladder, ran an
          urgent bedside CBC, and injected another dose of a powerful uterine
          contraction drug. Thankfully the results were acceptable — no blood
          transfusion needed.
        </p>

        <h2 className="text-xl font-bold text-violet-900 mt-10 mb-4">Graduating from L&amp;D</h2>
        <p>
          After being handed a huge cup of ice-cold orange juice, I was allowed
          to sleep again. Around 5:00 AM the nurse offered a bedpan — another
          &quot;patient achievement&quot; unlocked (back in med school I was the
          one helping patients with this). I then managed independent bladder
          control without help. Finally, I graduated from Labor &amp; Delivery
          and was transferred to the postpartum ward.
        </p>
        <p>
          I&apos;m deeply grateful that we avoided a C-section conversion and
          delivered a healthy baby vaginally. Thank you to Dr. Bai from Korea
          and every incredible nurse on the floor. Thank you to our families for
          their unwavering support, and especially to my husband, who
          shouldered all the newborn care and kept my emotions from spiraling.
          This experience has genuinely expanded and enriched my life in ways
          I never expected. Recovery will be one step at a time.
        </p>
        <p className="text-violet-700 font-medium italic">
          But to every woman out there — I still won&apos;t tell you to have a
          baby. This is your own life choice, and you don&apos;t need to accept
          pressure from anyone.
        </p>

        <div className="mt-10 not-prose">
          <Image
            src="/images/her-notes/delivery-3.jpg"
            alt="Postpartum keepsake photo"
            width={800}
            height={600}
            className="rounded-xl shadow-md w-full h-auto"
          />
        </div>
      </article>

      <GiscusComments locale="en" term="/her-notes/delivery-3" />
    </div>
    </HerNotesBackground>
  );
}
