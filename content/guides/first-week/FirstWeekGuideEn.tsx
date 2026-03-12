"use client";

import { useState } from "react";
import { Badge } from "@/components/Badge";
import { DataTable } from "@/components/Table";
import { Callout } from "@/components/Callout";
import { Source } from "@/components/Source";
import { GiscusComments } from "@/components/GiscusComments";

const sections = [
  { id: "induction", icon: "\uD83C\uDFE5", title: "The Induction", subtitle: "What's about to happen" },
  { id: "hospital-bag", icon: "\uD83C\uDF92", title: "Hospital Bag", subtitle: "Pack checklist" },
  { id: "labor-role", icon: "\uD83D\uDCAA", title: "Your Role in Labor", subtitle: "How to actually help" },
  { id: "newborn", icon: "\uD83D\uDC76", title: "Newborn Care", subtitle: "First days survival" },
  { id: "feeding", icon: "\uD83C\uDF7C", title: "Feeding", subtitle: "Schedules & tracking" },
  { id: "sleep", icon: "\uD83D\uDE34", title: "Safe Sleep", subtitle: "AAP guidelines" },
  { id: "discharge", icon: "\uD83D\uDCCB", title: "Before Discharge", subtitle: "Don't leave without this" },
  { id: "mother", icon: "\u2764\uFE0F", title: "Caring for Mom", subtitle: "Postpartum recovery" },
  { id: "danger", icon: "\uD83D\uDEA8", title: "Red Flags", subtitle: "When to call 911" },
];

function InductionSection() {
  return (
    <div>
      <p className="text-stone-600 leading-relaxed mb-4">
        For low-risk first-time pregnancies, elective induction at <strong>39 weeks</strong> has evidence support. The ARRIVE trial (published in the New England Journal of Medicine, 2018) found that elective induction at 39 weeks in that specific group actually <strong>reduced</strong> C-section rates compared to waiting. That does <em>not</em> mean every 39-40 week induction is automatically recommended, but if this is the plan, you&apos;re still in very standard territory.
      </p>

      <h3 className="font-bold text-stone-800 mt-6 mb-3 text-lg">How induction typically works</h3>
      <p className="text-stone-600 text-sm mb-2">The process usually happens in stages. Your OB will pick methods based on how &quot;ready&quot; the cervix is (measured by something called a Bishop Score).</p>

      <DataTable
        headers={["Stage", "Method", "What Happens", "Timeline"]}
        rows={[
          [
            <Badge key="s1" color="blue">Step 1</Badge>,
            "Cervical Ripening",
            "Prostaglandin pill (misoprostol) placed vaginally or under tongue, OR a balloon catheter inserted into cervix",
            "Evening before → overnight",
          ],
          [
            <Badge key="s2" color="blue">Step 2</Badge>,
            "Pitocin IV",
            "Synthetic oxytocin drip started — causes contractions to begin/strengthen",
            "Morning after ripening",
          ],
          [
            <Badge key="s3" color="blue">Step 3</Badge>,
            "Breaking Water (AROM)",
            "Doctor uses a small hook to rupture the amniotic sac. Usually quick; may feel pressure or a gush of fluid, and experiences vary",
            "When cervix is dilated enough",
          ],
          [
            <Badge key="s4" color="amber">Variable</Badge>,
            "Epidural",
            "Anesthesia placed in the spine for pain management. Partner's choice — not a failure",
            "Whenever she requests it",
          ],
        ]}
      />

      <Callout type="warn" title="Expect it to take a while">
        For first-time mothers, inductions commonly take 24–36+ hours from the start of cervical ripening to delivery. Many hospitals admit you the evening before. Pack entertainment, snacks, and patience.
      </Callout>

      <div className="mt-3 flex flex-wrap gap-3">
        <Source name="ACOG – Labor Induction" url="https://www.acog.org/womens-health/faqs/labor-induction" />
        <Source name="ACOG – Induction at 39 Weeks" url="https://www.acog.org/womens-health/faqs/induction-of-labor-at-39-weeks" />
        <Source name="ARRIVE Trial (NEJM)" url="https://www.nejm.org/doi/full/10.1056/NEJMoa1800566" />
      </div>
    </div>
  );
}

function HospitalBagSection() {
  return (
    <div>
      <p className="text-stone-600 leading-relaxed mb-4">
        You may be there 2–4 days total (induction + recovery). Pack for both of you, plus baby&apos;s going-home outfit.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          {
            title: "For Her",
            color: "bg-rose-50 border-rose-200",
            items: [
              "ID, insurance card, hospital paperwork",
              "Birth plan (printed copies)",
              "Comfortable robe / nursing-friendly gown",
              "Slippers with grip + flip flops for shower",
              "Lip balm (hospitals are DRY)",
              "Hair ties, toiletries",
              "Nursing bra & breast pads",
              "Going-home outfit (maternity size — she'll still look ~6mo pregnant)",
              "Phone charger (long cable!)",
              "Pillow from home (put a colored case so it's not confused)",
            ],
          },
          {
            title: "For You",
            color: "bg-sky-50 border-sky-200",
            items: [
              "Change of clothes (2–3 days worth)",
              "Toiletries + deodorant",
              "Snacks (protein bars, nuts, jerky)",
              "Phone charger + portable battery",
              "Cash for vending machines / cafeteria",
              "Entertainment (book, tablet, headphones)",
              "Comfortable shoes",
              "A jacket (hospitals run cold)",
              "A pillow + blanket (your 'bed' will be a chair)",
            ],
          },
          {
            title: "For Baby",
            color: "bg-amber-50 border-amber-200",
            items: [
              "Infant rear-facing car seat",
              "Going-home outfit (newborn + 0-3mo size)",
              "Receiving blanket",
              "Hat and socks/mittens",
              "Diapers + wipes (hospital usually provides but bring backup)",
              "Swaddle blanket",
            ],
          },
        ].map((col) => (
          <div key={col.title} className={`rounded-lg border p-4 ${col.color}`}>
            <h4 className="font-bold text-stone-800 mb-3">{col.title}</h4>
            <ul className="space-y-1.5">
              {col.items.map((item, i) => (
                <li key={i} className="text-sm text-stone-600 flex items-start gap-2">
                  <span className="text-stone-400 mt-0.5">{"\u25FB"}</span> {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <Callout type="tip" title="Pro tip: Install the car seat NOW">
        You&apos;ll need an appropriate rear-facing car seat for discharge, and some hospitals may ask you to show safe setup before you leave. Install it before labor, read both the car-seat manual and your vehicle manual, and use an NHTSA-certified inspection station if you want a second set of eyes.
      </Callout>

      <div className="mt-3">
        <Source name="NHTSA – Car Seat Finder & Inspection Help" url="https://www.nhtsa.gov/therightseat" />
      </div>
    </div>
  );
}

function LaborRoleSection() {
  return (
    <div>
      <p className="text-stone-600 leading-relaxed mb-4">
        Your job is simple in concept, hard in execution: <strong>be present, be calm, be her advocate</strong>. You can&apos;t take the pain away, but you can make it more bearable. Here&apos;s a concrete breakdown.
      </p>

      <DataTable
        headers={["Phase", "Duration", "What She Feels", "What YOU Do"]}
        rows={[
          [
            <span key="p1"><Badge color="green">Early Labor</Badge><br/><span className="text-xs text-stone-400">0–6 cm</span></span>,
            "Hours to a day+",
            "Mild → moderate contractions, can still talk through them",
            "Keep her hydrated, fed (if allowed), relaxed. Time contractions. Watch shows together. Let her rest.",
          ],
          [
            <span key="p2"><Badge color="amber">Active Labor</Badge><br/><span className="text-xs text-stone-400">6–8 cm</span></span>,
            "2–8 hours",
            "Strong contractions 3–5 min apart, can't talk through them",
            "Counter-pressure on lower back. Ice chips. Breathing cues. Verbal encouragement. DON'T take mood changes personally.",
          ],
          [
            <span key="p3"><Badge color="red">Transition</Badge><br/><span className="text-xs text-stone-400">8–10 cm</span></span>,
            "30 min – 2 hrs",
            "Most intense phase. Nausea, shaking, \"I can't do this\" is common",
            "Stay close. One contraction at a time. Hold her hand. Wipe her face. She may yell at you — that's normal and not personal.",
          ],
          [
            <span key="p4"><Badge color="purple">Pushing</Badge><br/><span className="text-xs text-stone-400">10 cm</span></span>,
            "20 min – 3 hrs",
            "Urge to push, intense pressure",
            "Support her position (hold a leg, support her back). Count during pushes if she wants. Encourage. Stay near her head unless she wants you elsewhere.",
          ],
        ]}
      />

      <h3 className="font-bold text-stone-800 mt-6 mb-3 text-lg">Concrete things to say (and not say)</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
          <h4 className="font-bold text-emerald-800 mb-2">{"\u2713"} Say This</h4>
          <ul className="text-sm text-emerald-700 space-y-1.5">
            <li>&quot;You&apos;re doing amazing&quot;</li>
            <li>&quot;One contraction at a time&quot;</li>
            <li>&quot;I&apos;m right here&quot;</li>
            <li>&quot;What do you need right now?&quot;</li>
            <li>&quot;Breathe with me&quot; (then actually breathe slow)</li>
            <li>&quot;Whatever you decide is the right call&quot; (re: epidural, etc.)</li>
          </ul>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <h4 className="font-bold text-red-800 mb-2">{"\u2717"} Don&apos;t Say This</h4>
          <ul className="text-sm text-red-700 space-y-1.5">
            <li>&quot;I know how you feel&quot; (you don&apos;t)</li>
            <li>&quot;Calm down&quot; / &quot;Relax&quot;</li>
            <li>&quot;My mom says you should...&quot;</li>
            <li>&quot;Are you sure you need the epidural?&quot;</li>
            <li>Anything about how tired/hungry/bored YOU are</li>
            <li>Don&apos;t narrate what you see happening down there unless asked</li>
          </ul>
        </div>
      </div>

      <Callout type="info" title="You're also her translator">
        Know her birth plan. If she can&apos;t speak during contractions, YOU communicate her preferences to the nurses and doctors. This is one of the most valuable things you can do.
      </Callout>

      <div className="mt-3">
        <Source name="Cleveland Clinic – Labor Support" url="https://health.clevelandclinic.org/how-to-support-your-partner-during-labor" />
      </div>
    </div>
  );
}

function NewbornSection() {
  return (
    <div>
      <p className="text-stone-600 leading-relaxed mb-4">
        Newborns are simultaneously tougher and more fragile than you&apos;d expect. Here&apos;s the stuff that actually matters in the first week.
      </p>

      <h3 className="font-bold text-stone-800 mt-4 mb-3 text-lg">Immediately after birth</h3>
      <DataTable
        headers={["What Happens", "Details"]}
        rows={[
          ["Skin-to-skin contact", "Baby goes directly on mom's chest. This regulates baby's temperature, heart rate, and breathing. AAP recommends at least 1 hour. Dad gets skin-to-skin too — do it as much as possible."],
          ["First breastfeed", "Usually attempted within the first hour. Don't panic if it doesn't go perfectly."],
          ["APGAR scores", "Nurses score baby at 1 and 5 minutes (appearance, pulse, grimace, activity, respiration). Scale of 0-10. 7+ is normal."],
          ["Newborn procedures", "Vitamin K shot (prevents bleeding disorder), erythromycin eye ointment, and a hepatitis B plan before discharge."],
          ["Newborn screening", "Blood-spot newborn screening for the conditions on your state's panel, hearing screen, and CCHD pulse-ox screen (measures blood oxygen to detect heart defects). All three should happen before discharge."],
          ["Weight & measurements", "Average is 6–9 lbs, 19–21 inches. Some weight loss is expected in the first days, but if the loss is getting into the upper single digits or baby keeps losing after day 5, expect a closer feeding check."],
        ]}
      />

      <h3 className="font-bold text-stone-800 mt-6 mb-3 text-lg">Daily care basics</h3>
      <DataTable
        headers={["Task", "How-To", "Frequency"]}
        compact
        rows={[
          ["Diaper changes", "Wipe front to back (especially girls). Wait for the umbilical cord stump area to dry. Use petroleum jelly on circumcision site.", "8-12x/day"],
          ["Umbilical cord care", "Keep it dry and clean. Fold diaper below it. It falls off in 1–3 weeks. No rubbing alcohol needed (outdated advice).", "Every change"],
          ["Bathing", "Sponge baths ONLY until cord falls off. Warm water, mild soap. Support head/neck at all times.", "2-3x/week max"],
          ["Temperature check", "Rectal thermometer is the gold standard for newborns. Normal: 97.7–99.5°F (36.5–37.5°C).", "When baby feels warm/cool"],
          ["Holding/supporting", "ALWAYS support the head and neck. The neck muscles are very weak for the first ~4 months.", "Every single time"],
          ["Tummy time", "Start within days of birth. Short sessions (3–5 min) while baby is awake and supervised. Builds neck/core strength.", "Several times/day"],
        ]}
      />

      <h3 className="font-bold text-stone-800 mt-6 mb-3 text-lg">Jaundice — what you need to know</h3>
      <p className="text-sm text-stone-600 mb-3">
        Most newborns develop some degree of jaundice (yellowing of the skin/eyes) as their liver matures. It typically peaks around <strong>days 3–5</strong>. The hospital should measure bilirubin levels before discharge, and your pediatrician will recheck at the first visit.
      </p>
      <DataTable
        headers={["What to Watch", "Details"]}
        compact
        rows={[
          ["Adequate output by day 5", "By about day 5, look for at least 6 wet diapers and at least 3 stools in 24 hours. Fewer can mean baby is not taking enough in, which worsens jaundice."],
          ["Color progression", "Mild yellowing of the face is common. If it spreads to the chest, belly, or legs, or the whites of the eyes turn yellow, call your pediatrician."],
          ["Sleepiness + poor feeding", "A jaundiced baby who is hard to wake or feeding poorly needs same-day evaluation."],
          ["Follow-up plan", "Make sure you leave the hospital with a clear bilirubin result or recheck appointment (usually within 1–2 days of discharge)."],
        ]}
      />
      <Callout type="warn" title="Do NOT use sunlight to treat jaundice">
        An old wives&apos; tale says to put baby in sunlight. This is not a substitute for medical treatment and risks sunburn and temperature instability. If phototherapy is needed, your pediatrician will arrange it.
      </Callout>

      <Callout type="tip" title="The 5 S's — your secret weapon for soothing">
        From Dr. Harvey Karp&apos;s method, widely endorsed by pediatricians: <strong>Swaddle</strong> (snug wrap), <strong>Side/Stomach</strong> position (for holding — NOT sleeping), <strong>Shush</strong> (loud white noise), <strong>Swing</strong> (gentle rhythmic motion), <strong>Suck</strong> (pacifier or finger). These mimic the womb and can stop crying fast.
      </Callout>

      <Callout type="info" title="Schedule the first pediatrician visit">
        AAP recommends baby be seen 3–5 days after birth and within 48–72 hours of hospital discharge. Book this appointment NOW if you haven&apos;t already.
      </Callout>

      <Callout type="warn" title="RSV protection is a before-discharge question">
        CDC now frames this pretty simply: babies should usually be protected by <strong>one</strong> of two options - a maternal RSV vaccine during pregnancy, or an infant RSV antibody. Most babies do not need both. If mom did not get the maternal vaccine, her status is unknown, or baby was born within 14 days of maternal vaccination, ask before discharge whether your baby should get a long-acting RSV antibody this season. Babies born during RSV season in most of the U.S. who need it usually get it within 1 week after birth, ideally during the birth hospitalization.
      </Callout>

      <h3 className="font-bold text-stone-800 mt-6 mb-3 text-lg">Visitors & infection control</h3>
      <p className="text-sm text-stone-600 mb-3">
        You are the <strong>bouncer</strong>. Newborns have immature immune systems, so every visitor is a potential exposure.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 my-4">
        {[
          "No visits from anyone who is sick — period",
          "Everyone washes hands before touching baby, bottles, or pump parts",
          "Tdap and flu vaccines: ideally 2+ weeks before meeting baby (CDC)",
          "Anyone with cold symptoms stays away - RSV, flu, and COVID all count",
          "No smoking anywhere near the baby — smoke residue on clothes counts",
          "Limit visitor count and duration — mom needs rest, not an audience",
        ].map((item, i) => (
          <div key={i} className="bg-stone-50 rounded-lg px-4 py-2.5 text-sm text-stone-700 flex items-start gap-2">
            <span className="text-amber-500 font-bold mt-0.5">{"\u2022"}</span> {item}
          </div>
        ))}
      </div>

      <div className="mt-3 flex flex-wrap gap-3">
        <Source name="AAP – First Office Visit" url="https://www.aap.org/en/patient-care/newborn-and-infant-nutrition/newborn-and-infant-health-assessment-and-promotion/first-office-visit-3-5-days/" />
        <Source name="CDC – Newborn Breastfeeding Basics" url="https://www.cdc.gov/infant-toddler-nutrition/breastfeeding/newborn-basics.html" />
        <Source name="CDC – Immunizations to Protect Infants (RSV)" url="https://www.cdc.gov/rsv/vaccines/protect-infants.html" />
        <Source name="CDC – Vaccines for Family & Caregivers" url="https://www.cdc.gov/vaccines-pregnancy/about/vaccines-family-caregivers.html" />
        <Source name="HRSA – Newborn Screening in Your State" url="https://newbornscreening.hrsa.gov/your-state" />
      </div>
    </div>
  );
}

function FeedingSection() {
  return (
    <div>
      <p className="text-stone-600 leading-relaxed mb-4">
        Feeding is the #1 thing you&apos;ll be doing. Whether breast or formula, here&apos;s what to know.
      </p>

      <h3 className="font-bold text-stone-800 mt-4 mb-3 text-lg">Breastfeeding</h3>
      <p className="text-sm text-stone-600 mb-3">
        Interesting fact: breast milk doesn&apos;t &quot;come in&quot; for 2–5 days. Before that, the breasts produce <strong>colostrum</strong> — a thick, yellow, nutrient-dense liquid that&apos;s basically liquid gold for the baby&apos;s immune system. It comes in tiny amounts, but a newborn&apos;s stomach is only marble-sized, so it&apos;s enough.
      </p>

      <DataTable
        headers={["Day", "Baby's Stomach Size", "Feed Amount", "Expected Diapers (minimum wet/dirty)"]}
        compact
        rows={[
          ["Day 1", "Cherry (~5-7 mL)", "1-2 tsp per feed", "1 wet / 1 dirty"],
          ["Day 2", "Walnut (~15 mL)", "~0.5 oz per feed", "2 wet / 3 dirty"],
          ["Day 3", "Walnut-Apricot (~25 mL)", "~0.5-1 oz per feed", "5 wet / 3 dirty"],
          ["Day 4", "Egg (~45-60 mL)", "~1-2 oz per feed", "6 wet / 3 dirty"],
          ["Day 5-7", "Egg (~45-60 mL)", "1-2 oz per feed", "6+ wet / 3+ dirty (yellow, seedy)"],
          ["Week 2+", "Peach", "2-3 oz per feed", "6+ wet / stools vary more"],
        ]}
      />

      <Callout type="info" title="How YOU help with breastfeeding">
        You can&apos;t physically do this part, but you are CRITICAL to its success. Bring her water (she&apos;ll be incredibly thirsty). Get pillows arranged. Burp the baby after feeds. Track feeds in an app. Handle all diaper changes you can. Learn to spot hunger cues — rooting (turning head), lip smacking, fist sucking — before baby starts crying (crying is a late hunger signal).
      </Callout>

      <h3 className="font-bold text-stone-800 mt-6 mb-3 text-lg">Formula feeding</h3>
      <DataTable
        headers={["Detail", "Guidance"]}
        rows={[
          ["Amount", "~2-3 oz every 2-3 hours after the first few days (~20 oz/day)"],
          ["Type", "Always use iron-fortified formula (AAP recommendation)"],
          ["Prep", "Follow instructions EXACTLY. Don't dilute or concentrate. Use room-temp or warm water (never microwave)."],
          ["Vitamin D", "If breastfed: 400 IU liquid vitamin D drops daily, starting in first few days. Formula-fed: once baby drinks 32+ oz/day of formula, supplementation isn't needed."],
        ]}
      />

      <Callout type="warn" title="Powdered formula is NOT sterile">
        For babies <strong>under 2 months</strong>, premature, or immunocompromised, CDC says extra precautions matter: powdered formula is not sterile. When feasible, ready-to-feed liquid formula is the safer option. If you use powdered formula, mix it with water hot enough to kill potential <em>Cronobacter</em> bacteria (about 158°F / 70°C), then cool before feeding. Always discard any formula left in the bottle after a feed — never save and reheat it.
      </Callout>

      <h3 className="font-bold text-stone-800 mt-6 mb-3 text-lg">Burping</h3>
      <p className="text-sm text-stone-600">
        Burp after every 2-3 oz (formula) or when switching breasts. Three positions: over your shoulder, sitting on your lap with chin supported, or face-down across your lap. Pat gently but firmly on the back. Some burps take a minute — be patient.
      </p>

      <div className="mt-4 flex flex-wrap gap-3">
        <Source name="AAP – Newborn Nutrition" url="https://www.aap.org/en/patient-care/newborn-and-infant-nutrition/" />
        <Source name="CDC – Newborn Breastfeeding Basics" url="https://www.cdc.gov/infant-toddler-nutrition/breastfeeding/newborn-basics.html" />
        <Source name="CDC – Formula Preparation and Storage" url="https://www.cdc.gov/infant-toddler-nutrition/formula-feeding/preparation-and-storage.html" />
      </div>
    </div>
  );
}

function SleepSection() {
  return (
    <div>
      <p className="text-stone-600 leading-relaxed mb-4">
        This is life-or-death important. In 2022, about 3,700 U.S. babies died suddenly and unexpectedly. Safe-sleep rules matter because sleep environment is one of the biggest preventable risk factors you can control.
      </p>

      <div className="bg-stone-900 text-white rounded-xl p-6 my-4">
        <h3 className="text-lg font-bold mb-4 text-amber-400">The ABCs of Safe Sleep (AAP 2022 Guidelines)</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-4xl font-black text-amber-400 mb-2">A</div>
            <div className="font-bold text-lg">Alone</div>
            <p className="text-sm text-stone-300 mt-1">No blankets, pillows, bumpers, stuffed animals, or other people in the sleep space. Nothing but baby + fitted sheet.</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-black text-amber-400 mb-2">B</div>
            <div className="font-bold text-lg">Back</div>
            <p className="text-sm text-stone-300 mt-1">Always on their back. Every nap, every night. Until age 1. Even if they seem to prefer their side or stomach.</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-black text-amber-400 mb-2">C</div>
            <div className="font-bold text-lg">Crib</div>
            <p className="text-sm text-stone-300 mt-1">Firm, flat mattress in a safety-approved crib or bassinet. No incline. No Rock &apos;n Play. No couch. No adult bed.</p>
          </div>
        </div>
      </div>

      <DataTable
        headers={["Rule", "Why"]}
        rows={[
          ["Room-share (don't bed-share)", "Baby sleeps in YOUR room but in their own crib/bassinet. Reduces SIDS risk by up to 50%. Ideally for 6 months, at minimum."],
          ["Move baby after dozing off elsewhere", "Car seats, strollers, swings, infant carriers, and slings are not safe for routine sleep. If baby falls asleep there, move them to a firm, flat sleep surface as soon as possible."],
          ["No loungers, nests, or nursing pillows for sleep", "Skip Boppy-style nursing pillows, DockATot-style loungers, nests, pods, sleep positioners, and inclined sleepers. If it is not a safety-approved sleep space, it is not for sleep."],
          ["No weighted swaddles or sleep products", "No evidence they help. They may increase risk."],
          ["Use a wearable blanket (sleep sack)", "Keeps baby warm without loose fabric. Safer than blankets."],
          ["Stop swaddling when baby shows rolling signs", "Usually around 3–4 months. A swaddled baby who rolls to their stomach can suffocate."],
          ["Offer a pacifier at sleep time", "Associated with reduced SIDS risk. If breastfeeding, wait until breastfeeding is established (~3-4 weeks)."],
          ["No smoking around baby", "Secondhand smoke is a major SIDS risk factor."],
          ["Don't let baby overheat", "Dress in one layer more than you'd wear. Feel their chest — if sweaty, they're too warm."],
        ]}
      />

      <Callout type="danger" title="The most dangerous moments">
        The highest risk for sleep-related death is in the first 6 months, and it often happens when an exhausted parent falls asleep holding the baby on a couch or recliner. If you&apos;re too tired to stay awake, put the baby down in the crib. A briefly crying baby in a safe crib is infinitely safer than a sleeping baby on your chest while you doze off on a couch.
      </Callout>

      <h3 className="font-bold text-stone-800 mt-6 mb-3 text-lg">Newborn sleep patterns</h3>
      <p className="text-sm text-stone-600 mb-2">
        Newborns sleep 16–17 hours a day, but in 1–3 hour bursts. They have no concept of day vs. night. You cannot &quot;train&quot; a newborn to sleep through the night — they need to eat too frequently. Your strategy is survival: <strong>sleep when the baby sleeps</strong> and take shifts with your partner.
      </p>

      <div className="mt-4 flex flex-wrap gap-3">
        <Source name="CDC – Helping Babies Sleep Safely" url="https://www.cdc.gov/reproductive-health/features/babies-sleep.html" />
        <Source name="CDC – About SUID and SIDS" url="https://www.cdc.gov/sudden-infant-death/about/index.html" />
        <Source name="AAP – Safe Sleep Policy" url="https://publications.aap.org/pediatrics/article/150/1/e2022057990/188304/Sleep-Related-Infant-Deaths-Updated-2022" />
        <Source name="HealthyChildren.org – Unsafe Sleep Products" url="https://www.healthychildren.org/English/ages-stages/baby/sleep/Pages/Inclined-Sleepers-and-Other-Baby-Registry-Items-to-Avoid.aspx" />
      </div>
    </div>
  );
}

function MotherSection() {
  return (
    <div>
      <p className="text-stone-600 leading-relaxed mb-4">
        Here&apos;s the thing nobody tells dads directly enough: <strong>your partner just went through a major medical event</strong>. Even a &quot;normal&quot; vaginal delivery involves significant tissue damage, blood loss, and hormonal upheaval. Your job for the first 6 weeks is to be her teammate, protector, and personal assistant.
      </p>

      <h3 className="font-bold text-stone-800 mt-4 mb-3 text-lg">Physical recovery — what to expect</h3>
      <DataTable
        headers={["What", "Details", "How You Help"]}
        rows={[
          [
            "Vaginal pain / tearing",
            "Most women have some degree of tearing. Stitches dissolve on their own in 1–2 weeks. Sitting is painful.",
            "Have ice packs ready. Set up her peri bottle (squirt warm water while peeing). Get a donut pillow. Don't rush her to do anything physical.",
          ],
          [
            "Bleeding (lochia)",
            "Heavy vaginal bleeding for 2–4 weeks, tapering off. Similar to a very heavy period. This is the uterus shedding its lining.",
            "Stock up on heavy-duty maternity pads (NOT tampons). Don't be alarmed by clots — they can happen, but clots larger than an egg need urgent attention.",
          ],
          [
            "Uterine cramping",
            "The uterus contracts back to normal size. Worse during breastfeeding (oxytocin triggers contractions). Called 'afterpains.'",
            "OTC ibuprofen (ask her OB). Heating pad on belly.",
          ],
          [
            "Breast engorgement",
            "When milk comes in (~day 3–5), breasts become hard, swollen, and painful.",
            "Warm compresses before feeding, cold compresses after. Help her get the baby latched quickly. Have a lactation consultant's number ready.",
          ],
          [
            "Sweating / hormonal shifts",
            "Night sweats, hair changes, mood swings — all from the massive progesterone/estrogen drop after delivery.",
            "Keep extra sheets nearby. Be patient. This is biochemistry, not personality.",
          ],
          [
            "Constipation",
            "Very common. Fear of the first postpartum bowel movement is real.",
            "Stool softeners (colace), high-fiber foods, lots of water. Encourage her to not hold it.",
          ],
        ]}
      />

      <h3 className="font-bold text-stone-800 mt-6 mb-3 text-lg">If delivery becomes a C-section</h3>
      <p className="text-sm text-stone-600 mb-3">
        About 1 in 3 U.S. deliveries are cesarean. If this happens, recovery is slower and your role shifts significantly.
      </p>
      <DataTable
        headers={["Detail", "What It Means for You"]}
        compact
        rows={[
          ["Hospital stay: 2–3 days", "Longer than vaginal delivery. She'll need help getting in/out of bed, walking to the bathroom, and holding the baby for feeds."],
          ["No lifting >baby weight for 6–8 weeks", "You become the default lifter, carrier, and driver. Car seats, strollers, laundry baskets — all you."],
          ["Incision care", "Watch for redness, swelling, warmth, or oozing at the incision site. She should keep it clean and dry."],
          ["Pain management", "She'll likely have prescription pain meds initially, then transition to ibuprofen/acetaminophen. Track the schedule."],
        ]}
      />

      <h3 className="font-bold text-stone-800 mt-6 mb-3 text-lg">If she had hypertension or preeclampsia</h3>
      <Callout type="warn" title="Blood pressure follow-up is critical">
        ACOG recommends a blood pressure evaluation <strong>no later than 7–10 days postpartum</strong> for hypertensive disorders of pregnancy. Postpartum preeclampsia can develop up to 6 weeks after delivery — don&apos;t skip this appointment even if she feels fine.
      </Callout>

      <h3 className="font-bold text-stone-800 mt-6 mb-3 text-lg">Your concrete daily tasks</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 my-4">
        {[
          "Cook meals or organize meal deliveries",
          "Handle ALL visitors / gatekeep her rest",
          "Do laundry (you'll go through SO much laundry)",
          "Bring her water every time she nurses",
          "Change diapers — take the night shifts you can",
          "Handle groceries and errands",
          "Take baby so she can shower / nap / exist as a human",
          "Keep the house reasonably clean",
          "Manage communication with family (updates, photos, boundaries)",
          "Tell her she's doing a great job — and mean it",
        ].map((task, i) => (
          <div key={i} className="bg-stone-50 rounded-lg px-4 py-2.5 text-sm text-stone-700 flex items-start gap-2">
            <span className="text-emerald-500 font-bold mt-0.5">{"\u2192"}</span> {task}
          </div>
        ))}
      </div>

      <h3 className="font-bold text-stone-800 mt-6 mb-3 text-lg">Mental health — the big one</h3>
      <Callout type="warn" title="Baby Blues vs. Postpartum Depression">
        <strong>Baby blues</strong> (70–80% of mothers): Mood swings, tearfulness, anxiety, irritability. Starts a few days after birth, resolves within 2 weeks. This is normal hormonal adjustment.
        <br/><br/>
        <strong>Postpartum depression</strong> (10–15% of mothers): Symptoms persist beyond 2 weeks. Includes persistent sadness, withdrawal from baby, inability to sleep even when baby sleeps, loss of appetite, feelings of worthlessness, or thoughts of self-harm. <strong>This requires professional help immediately.</strong>
        <br/><br/>
        The AAP recommends screening with the Edinburgh Postnatal Depression Scale at 1, 2, 4, and 6 months. You don&apos;t need to wait — if you notice these signs, bring it up gently and contact her OB.
      </Callout>

      <Callout type="info" title="Don't forget about YOUR mental health">
        Paternal postpartum depression is real and affects roughly 8–10% of new dads. Sleep deprivation, identity shift, relationship stress, and feeling helpless are all legitimate struggles. If you&apos;re not okay, seek help too.
      </Callout>

      <p className="text-sm text-stone-500 mt-2">
        ACOG recommends postpartum evaluation within the first 3 weeks after delivery (phone or in-person), with a comprehensive visit within 6–12 weeks.
      </p>

      <div className="mt-3 flex flex-wrap gap-3">
        <Source name="ACOG – Optimizing Postpartum Care" url="https://www.acog.org/clinical/clinical-guidance/committee-opinion/articles/2018/05/optimizing-postpartum-care" />
        <Source name="ACOG – Postpartum Depression" url="https://www.acog.org/womens-health/faqs/postpartum-depression" />
        <Source name="CDC – Urgent Maternal Warning Signs" url="https://www.cdc.gov/hearher/maternal-warning-signs/index.html" />
      </div>
    </div>
  );
}

function DischargeSection() {
  return (
    <div>
      <p className="text-stone-600 leading-relaxed mb-4">
        The hospital discharge is where things fall through the cracks. Adrenaline is fading, you&apos;re sleep-deprived, and suddenly you&apos;re responsible for a tiny human at home. Print this list or screenshot it.
      </p>

      <h3 className="font-bold text-stone-800 mt-4 mb-3 text-lg">For baby</h3>
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 my-4">
        <ul className="space-y-2.5 text-sm text-stone-700">
          {[
            ["Newborn screening complete", "Blood-spot screening, hearing screen, and CCHD pulse-ox screen should all be done. Because blood-spot screening is state-based, ask whether your state requires a repeat screen if the first one was early or if your baby is in a two-screen state."],
            ["Bilirubin / jaundice plan", "Get the bilirubin result or a written plan for when to recheck. Jaundice peaks at days 3–5 — you may already be home."],
            ["Feeding plan confirmed", "Breast, formula, or combo — with clear guidance on frequency, amount, and who to call if latching isn't working or supply is a concern."],
            ["Pediatrician visit booked", "Should be 2–3 days after discharge (or around 3–5 days of age). Don't leave without this appointment scheduled."],
            ["Hepatitis B plan confirmed", "If mom is HBsAg-positive or status is unknown, the birth dose is time-sensitive and should be given within 12 hours. If mom is HBsAg-negative, CDC now uses individualized decision-making; AAP still recommends giving the first dose within 24 hours."],
            ["RSV protection plan confirmed", "Most babies should be protected either by maternal RSV vaccine during pregnancy or by an infant RSV antibody. If mom did not get the maternal vaccine, her status is unknown, or baby was born within 14 days of maternal vaccination, ask whether baby should get the antibody now. If needed during RSV season in most of the U.S., it is usually given within 1 week after birth."],
            ["Car seat ready for discharge", "Rear-facing in the back seat, installed according to the seat and vehicle manuals. Hospital staff may review setup, and an NHTSA inspection station can help if you want it checked."],
          ].map(([title, desc], i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="text-amber-600 mt-0.5">{"\u25FB"}</span>
              <span><strong>{title}</strong> — {desc}</span>
            </li>
          ))}
        </ul>
      </div>

      <h3 className="font-bold text-stone-800 mt-6 mb-3 text-lg">For mom</h3>
      <div className="bg-rose-50 border border-rose-200 rounded-xl p-4 my-4">
        <ul className="space-y-2.5 text-sm text-stone-700">
          {[
            ["Prescriptions filled", "Pain meds, stool softeners, iron supplements — whatever was prescribed. Fill them before leaving or have someone pick them up so they're ready when you get home."],
            ["Follow-up visit scheduled", "ACOG recommends contact within 3 weeks, comprehensive visit within 6–12 weeks. If she had hypertension/preeclampsia, BP check within 7–10 days."],
            ["Warning signs reviewed", "Make sure YOU (not just her) know the big ones: heavy bleeding soaking at least 1 pad per hour, clots bigger than an egg, bad-smelling discharge, chest pain, trouble breathing, severe headache, vision changes, one-sided leg swelling, seizure, or thoughts of self-harm or harming the baby."],
            ["Feeding support contacts", "Lactation consultant number, hospital's breastfeeding hotline, or the pediatrician's feeding advice line."],
          ].map(([title, desc], i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="text-rose-500 mt-0.5">{"\u25FB"}</span>
              <span><strong>{title}</strong> — {desc}</span>
            </li>
          ))}
        </ul>
      </div>

      <h3 className="font-bold text-stone-800 mt-6 mb-3 text-lg">Know who to call</h3>
      <Callout type="info" title="Save these numbers in your phone NOW">
        Before you walk out, make sure you have: <strong>pediatrician</strong> (daytime + after-hours), <strong>OB/midwife</strong> (daytime + after-hours), <strong>lactation consultant</strong>, <strong>hospital nursery</strong> (many answer questions 24/7 in the first few days), and <strong>Poison Control: 1-800-222-1222</strong>.
      </Callout>

      <Callout type="tip" title="The 48-hour rule">
        If anything feels off — baby&apos;s feeding, color, breathing, or mom&apos;s pain level, bleeding, mood — and you can&apos;t clearly say &quot;this is normal,&quot; call. In the first week, pediatricians and OBs expect calls. You are not bothering them. That&apos;s literally what they&apos;re there for.
      </Callout>

      <div className="mt-3 flex flex-wrap gap-3">
        <Source name="HRSA – Newborn Screening in Your State" url="https://newbornscreening.hrsa.gov/your-state" />
        <Source name="CDC – Hepatitis B Immunization Fact Sheet" url="https://www.cdc.gov/media/releases/2025/fact-sheet-hepatitis-b-immunization.html" />
        <Source name="HealthyChildren.org – AAP on Hep B Birth Dose" url="https://www.healthychildren.org/English/news/Pages/AAP-Recommends-that-Infants-Receive-First-Hepatitis-B-Dose-within-24-Hours-of-Birth.aspx" />
        <Source name="CDC – Immunizations to Protect Infants (RSV)" url="https://www.cdc.gov/rsv/vaccines/protect-infants.html" />
        <Source name="CDC – Urgent Maternal Warning Signs" url="https://www.cdc.gov/hearher/maternal-warning-signs/index.html" />
        <Source name="NHTSA – Car Seat Finder & Inspection Help" url="https://www.nhtsa.gov/therightseat" />
      </div>
    </div>
  );
}

function DangerSection() {
  return (
    <div>
      <p className="text-stone-600 leading-relaxed mb-4">
        Most issues are normal newborn stuff. But some things require immediate medical attention. Knowing these in advance means you won&apos;t panic about normal things AND you won&apos;t miss actual emergencies.
      </p>

      <h3 className="font-bold text-stone-800 mt-4 mb-3 text-lg">{"\uD83D\uDEA8"} Baby — Call the pediatrician or go to ER</h3>
      <div className="bg-red-50 border border-red-200 rounded-xl p-4 my-4">
        <ul className="space-y-2 text-sm text-red-900">
          {[
            ["Rectal temp \u2265 100.4°F (38°C)", "In a baby under 3 months, ANY fever is an emergency. Don't wait. Don't give Tylenol first. Go to the ER."],
            ["Difficulty breathing", "Look for nostril flaring, rib retractions (skin pulling in between ribs), grunting, or blueish lips/skin."],
            ["Won't eat / refuses multiple feeds", "Newborns should not go more than 4 hours without feeding. Lethargy + refusal = urgent."],
            ["Too few wet diapers for baby's age", "Think in 24-hour totals: about 1 on day 1, 2 on day 2, 5 on day 3, then 6 a day by day 4-5. Once feeds are established, a sudden drop in urine output is urgent."],
            ["Jaundice worsening", "Some yellowing is normal. But if it spreads to the belly/legs, or baby is very sleepy and hard to wake, call immediately."],
            ["Forceful/projectile vomiting", "Spitting up is normal. Vomiting that shoots out is not."],
            ["Extreme lethargy", "Hard to wake, floppy, unresponsive — emergency."],
            ["Cord bleeding that won't stop", "Some spotting is okay. Active bleeding or foul smell = infection."],
          ].map(([title, desc], i) => (
            <li key={i}><strong>{title}</strong> — {desc}</li>
          ))}
        </ul>
      </div>

      <h3 className="font-bold text-stone-800 mt-6 mb-3 text-lg">{"\uD83D\uDEA8"} Mother — Call her OB or go to ER</h3>
      <div className="bg-red-50 border border-red-200 rounded-xl p-4 my-4">
        <ul className="space-y-2 text-sm text-red-900">
          {[
            ["Heavy bleeding or egg-sized clots", "Soaking through 1 or more pads in an hour, passing clots bigger than an egg, or passing tissue is urgent."],
            ["Bad-smelling discharge or fever \u2265 100.4°F (38°C)", "Can signal uterine infection, wound infection, or mastitis."],
            ["Severe headache or vision changes", "Could be postpartum preeclampsia, which can happen up to 6 weeks after delivery. Especially urgent with swelling, high blood pressure, or shortness of breath."],
            ["Chest pain or trouble breathing", "Pulmonary embolism and other serious causes need emergency care now."],
            ["One-sided leg swelling, pain, or redness", "Could indicate a blood clot (deep vein thrombosis). Postpartum women are at higher risk."],
            ["Seizure, fainting, or sudden confusion", "Call 911. These are medical emergencies."],
            ["Thoughts of harming herself or the baby", "Get emergency help now. Postpartum psychosis is rare but serious. 988 Suicide & Crisis Lifeline: call or text 988."],
          ].map(([title, desc], i) => (
            <li key={i}><strong>{title}</strong> — {desc}</li>
          ))}
        </ul>
      </div>

      <Callout type="danger" title="The fever rule">
        For both mom and newborn, 100.4°F (38°C) is the magic number. Below that, monitor. At or above that, call a doctor immediately. For babies under 3 months, a fever is ALWAYS an emergency — they can deteriorate rapidly because their immune systems are immature.
      </Callout>

      <h3 className="font-bold text-stone-800 mt-6 mb-3 text-lg">Normal things that look scary</h3>
      <DataTable
        headers={["What You'll See", "Why It's Normal"]}
        compact
        rows={[
          ["Weird-shaped head", "Molding from the birth canal. Rounds out in days."],
          ["Baby acne / red blotches", "Hormone-related. Goes away on its own."],
          ["Black tarry poop (meconium)", "First 1-2 days. Transitions to green then yellow."],
          ["Startling / jerky movements", "Moro reflex. Totally normal neurological response."],
          ["Hiccups", "Very common. Don't require intervention."],
          ["Crossed eyes", "Eye muscles still developing. Normal until ~4 months."],
          ["Sneezing", "Clearing nasal passages. Not a cold."],
          ["Breast swelling (in baby)", "Maternal hormones. Goes away quickly."],
        ]}
      />

      <div className="mt-4 flex flex-wrap gap-3">
        <Source name="CDC – Newborn Breastfeeding Basics" url="https://www.cdc.gov/infant-toddler-nutrition/breastfeeding/newborn-basics.html" />
        <Source name="CDC – Urgent Maternal Warning Signs" url="https://www.cdc.gov/hearher/maternal-warning-signs/index.html" />
        <Source name="HealthyChildren.org – Getting Enough Milk" url="https://www.healthychildren.org/English/ages-stages/baby/breastfeeding/Pages/How-to-Tell-if-Baby-is-Getting-Enough-Milk.aspx" />
      </div>
    </div>
  );
}

const contentMap: Record<string, React.ReactNode> = {
  induction: <InductionSection />,
  "hospital-bag": <HospitalBagSection />,
  "labor-role": <LaborRoleSection />,
  newborn: <NewbornSection />,
  feeding: <FeedingSection />,
  sleep: <SleepSection />,
  discharge: <DischargeSection />,
  mother: <MotherSection />,
  danger: <DangerSection />,
};

export default function FirstWeekGuidePage() {
  const [activeSection, setActiveSection] = useState("induction");
  const active = sections.find((s) => s.id === activeSection)!;

  return (
    <div>
      {/* Hero */}
      <div className="bg-stone-900 text-white px-4 py-8 md:py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-amber-400 text-xs font-bold tracking-widest uppercase mb-3" style={{ fontFamily: "system-ui, sans-serif" }}>
            New Dad Field Guide
          </div>
          <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-2">
            Everything You Need to Know
          </h1>
          <p className="text-stone-400 text-lg">
            Induction {"\u2192"} Labor {"\u2192"} Newborn Care {"\u2192"} Postpartum Recovery
          </p>
          <p className="text-stone-500 text-xs mt-4" style={{ fontFamily: "system-ui, sans-serif" }}>
            Sourced from AAP, CDC, ACOG, HRSA, NHTSA, and peer-reviewed literature
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Section nav */}
        <div className="flex flex-wrap gap-2 mb-8">
          {sections.map((s) => (
            <button
              key={s.id}
              onClick={() => setActiveSection(s.id)}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all ${
                activeSection === s.id
                  ? "bg-stone-900 text-white shadow-lg"
                  : "bg-white text-stone-600 hover:bg-stone-200 border border-stone-200"
              }`}
              style={{ fontFamily: "system-ui, sans-serif" }}
            >
              <span>{s.icon}</span>
              <span className="font-medium">{s.title}</span>
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="bg-white rounded-xl shadow-sm border border-stone-200 p-6 md:p-8">
          <div className="flex items-center gap-3 mb-1">
            <span className="text-2xl">{active.icon}</span>
            <div>
              <h2 className="text-2xl font-bold text-stone-900">{active.title}</h2>
              <p className="text-stone-400 text-sm" style={{ fontFamily: "system-ui, sans-serif" }}>{active.subtitle}</p>
            </div>
          </div>
          <hr className="my-4 border-stone-200" />
          <div style={{ fontFamily: "system-ui, sans-serif" }}>
            {contentMap[activeSection]}
          </div>
        </div>

        {/* Footer nav */}
        <div className="flex justify-between mt-6 mb-12">
          {(() => {
            const idx = sections.findIndex((s) => s.id === activeSection);
            const prev = idx > 0 ? sections[idx - 1] : null;
            const next = idx < sections.length - 1 ? sections[idx + 1] : null;
            return (
              <>
                {prev ? (
                  <button
                    onClick={() => setActiveSection(prev.id)}
                    className="text-sm text-stone-500 hover:text-stone-800 flex items-center gap-1"
                    style={{ fontFamily: "system-ui, sans-serif" }}
                  >
                    {"\u2190"} {prev.icon} {prev.title}
                  </button>
                ) : <div />}
                {next ? (
                  <button
                    onClick={() => setActiveSection(next.id)}
                    className="text-sm text-stone-500 hover:text-stone-800 flex items-center gap-1"
                    style={{ fontFamily: "system-ui, sans-serif" }}
                  >
                    {next.title} {next.icon} {"\u2192"}
                  </button>
                ) : <div />}
              </>
            );
          })()}
        </div>

        <GiscusComments locale="en" term="/guides/first-week" />
      </div>
    </div>
  );
}
