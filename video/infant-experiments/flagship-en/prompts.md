# All-Nano Banana Prompt Pack

## Core direction

This prototype now uses a single visual system:

- Nano Banana generates every base image.
- Keynote adds all text, timelines, labels, and safety callouts.
- iMovie only handles timing, zooms, trims, and export.

Do not ask Nano Banana to render charts, captions, tables, or timeline text inside the image. Let it produce clean illustrated plates only.

## Global prompt prefix

Use this exact prefix for every base plate:

`warm editorial parenting-science illustration, soft gouache with clean shapes, muted sage, stone, oatmeal, and amber palette, same caregiver and same 5-month-old baby across the whole series, tidy sunlit living room, safe infant positioning, accurate anatomy, 16:9 horizontal composition, no text, no watermark, calm and curious mood`

## Negative prompt

Add this to every prompt:

`unsafe infant setup, unsupervised baby, crib bumper, blanket over face, obvious distress, crying, twisted limbs, extra fingers, warped hands, impossible anatomy, medical equipment, cluttered room, horror lighting, photo watermark, logo, subtitle text, infographic text`

## Generation workflow

1. Generate `hero-home-lab.png` first.
2. If Nano Banana supports reference images, feed `hero-home-lab.png` back in for every later image.
3. Keep the same caregiver, same baby, same room palette, and same overall rendering style across the full set.
4. Reject any image with unsafe body positioning, awkward hands, face drift, or a noticeably different home interior.
5. Generate all plates before opening Keynote so the whole overlay deck can be designed in one pass.

## Required base plates

### `hero-home-lab.png`

Prompt:

`warm editorial parenting-science illustration, soft gouache with clean shapes, muted sage, stone, oatmeal, and amber palette, same caregiver and same 5-month-old baby across the whole series, tidy sunlit living room, safe infant positioning, accurate anatomy, 16:9 horizontal composition, no text, no watermark, calm and curious mood, parent and baby on a soft play mat in a bright living room, muslin cloth nearby, simple rattle, open notebook and pen, floor play gym visible in the background, parent leaning in attentively, warm but research-minded atmosphere`

Use for:

- hook
- final end card
- montage anchor

### `four-abilities-vignettes.png`

Prompt:

`warm editorial parenting-science illustration, soft gouache with clean shapes, muted sage, stone, oatmeal, and amber palette, same caregiver and same 5-month-old baby across the whole series, tidy sunlit living room, safe infant positioning, accurate anatomy, 16:9 horizontal composition, no text, no watermark, calm and curious mood, a clean four-vignette editorial composition in one frame, showing baby tracking a caregiver's face, anticipating a peekaboo reveal, kicking beneath a play gym toy, and watching a caregiver demonstrate an object action, balanced composition with generous negative space`

Use for:

- intro explanation of prediction, social expectation, cause and effect, and memory

### `ground-rules-room.png`

Prompt:

`warm editorial parenting-science illustration, soft gouache with clean shapes, muted sage, stone, oatmeal, and amber palette, same caregiver and same 5-month-old baby across the whole series, tidy sunlit living room, safe infant positioning, accurate anatomy, 16:9 horizontal composition, no text, no watermark, calm and curious mood, calm setup before an observation session, caregiver seated at baby eye level, quiet uncluttered room, small notebook nearby, scene feels short, intentional, and low-stimulation`

Use for:

- ground rules section

### `peekaboo-face-to-face.png`

Prompt:

`warm editorial parenting-science illustration, soft gouache with clean shapes, muted sage, stone, oatmeal, and amber palette, same caregiver and same 5-month-old baby across the whole series, tidy sunlit living room, safe infant positioning, accurate anatomy, 16:9 horizontal composition, no text, no watermark, calm and curious mood, caregiver sitting face-to-face with baby, muslin cloth in both hands just before covering the face, playful anticipation, baby focused and alert, uncluttered background, intimate but gentle composition`

Use for:

- peekaboo chapter intro
- recap shot

### `peekaboo-variation-strip.png`

Prompt:

`warm editorial parenting-science illustration, soft gouache with clean shapes, muted sage, stone, oatmeal, and amber palette, same caregiver and same 5-month-old baby across the whole series, tidy sunlit living room, safe infant positioning, accurate anatomy, 16:9 horizontal composition, no text, no watermark, calm and curious mood, three side-by-side editorial panels in one image, same parent and baby in the same room, panel one standard peekaboo reveal, panel two delayed reveal with cloth still covering the face, panel three caregiver revealing from the wrong side, balanced composition with clear panel separation but no text`

Use for:

- protocol and variations overlays

### `still-face-neutral-setup.png`

Prompt:

`warm editorial parenting-science illustration, soft gouache with clean shapes, muted sage, stone, oatmeal, and amber palette, same caregiver and same 5-month-old baby across the whole series, tidy sunlit living room, safe infant positioning, accurate anatomy, 16:9 horizontal composition, no text, no watermark, calm and curious mood, parent and baby sitting face-to-face in a quiet room, parent with neutral relaxed expression, baby calm and alert, emotionally sensitive but not dramatic, soft side light, respectful and gentle atmosphere`

Use for:

- still-face chapter intro
- caution / interpretation beats

### `still-face-phase-strip.png`

Prompt:

`warm editorial parenting-science illustration, soft gouache with clean shapes, muted sage, stone, oatmeal, and amber palette, same caregiver and same 5-month-old baby across the whole series, tidy sunlit living room, safe infant positioning, accurate anatomy, 16:9 horizontal composition, no text, no watermark, calm and curious mood, three side-by-side editorial panels in one image, same parent and baby in the same room, panel one warm playful interaction, panel two brief neutral still face, panel three immediate reunion and warm reconnection, baby remains readable but not distressed`

Use for:

- still-face phases overlay

### `kick-wide-room.png`

Prompt:

`warm editorial parenting-science illustration, soft gouache with clean shapes, muted sage, stone, oatmeal, and amber palette, same caregiver and same 5-month-old baby across the whole series, tidy sunlit living room, safe infant positioning, accurate anatomy, 16:9 horizontal composition, no text, no watermark, calm and curious mood, wide view of a floor play gym in a living room, baby lying safely under the gym, parent seated close by observing attentively, lightweight toy hanging above, supervision emphasized by composition, no dangerous close-up detail`

Use for:

- kick-to-move chapter intro
- setup and recap

### `kick-phase-strip.png`

Prompt:

`warm editorial parenting-science illustration, soft gouache with clean shapes, muted sage, stone, oatmeal, and amber palette, same caregiver and same 5-month-old baby across the whole series, tidy sunlit living room, safe infant positioning, accurate anatomy, 16:9 horizontal composition, no text, no watermark, calm and curious mood, three side-by-side editorial panels in one image, same baby under the same play gym, panel one baseline with toy not moving, panel two contingent phase with toy visibly moving after a kick, panel three disconnect phase with baby still active but toy now still, supervision remains visible in the composition`

Use for:

- kick phase overlay

### `imitation-rattle-demo.png`

Prompt:

`warm editorial parenting-science illustration, soft gouache with clean shapes, muted sage, stone, oatmeal, and amber palette, same caregiver and same 5-month-old baby across the whole series, tidy sunlit living room, safe infant positioning, accurate anatomy, 16:9 horizontal composition, no text, no watermark, calm and curious mood, caregiver slowly demonstrating a three-tap rattle action while baby watches closely, object centered, clear teacher-and-observer relationship, simple clean background`

Use for:

- imitation chapter intro
- immediate imitation beat

### `imitation-delay-sequence.png`

Prompt:

`warm editorial parenting-science illustration, soft gouache with clean shapes, muted sage, stone, oatmeal, and amber palette, same caregiver and same 5-month-old baby across the whole series, tidy sunlit living room, safe infant positioning, accurate anatomy, 16:9 horizontal composition, no text, no watermark, calm and curious mood, three side-by-side editorial panels in one image, panel one caregiver demonstrates an unusual object action, panel two object is set aside during a short gap, panel three object returns and baby reaches toward it, memory-focused storytelling composition`

Use for:

- delayed imitation explanation

### `observation-notebook.png`

Prompt:

`warm editorial parenting-science illustration, soft gouache with clean shapes, muted sage, stone, oatmeal, and amber palette, same caregiver and same 5-month-old baby across the whole series, tidy sunlit living room, safe infant positioning, accurate anatomy, 16:9 horizontal composition, no text, no watermark, calm and curious mood, close-up of notebook and pen on the floor beside simple baby play objects, gentle documentary feel, organized observation setup, room tone consistent with the rest of the series`

Use for:

- record and reflect
- observation template overlay

## Overlay export list

> These overlays are now generated by code: `npm run video:infant-experiments:overlays`
> The spec below is kept as reference. The authoritative source is `scripts/render-overlay-pngs.mjs`.

- `01-intro-four-abilities.png`
  Base image: `four-abilities-vignettes.png`
  Overlay: four small labels for `Prediction`, `Social expectation`, `Cause and effect`, `Memory`

- `02-ground-rules-overlay.png`
  Base image: `ground-rules-room.png`
  Overlay: `Not diagnostic`, `Calm baby`, `Quiet room`, `Stop early`, `Keep it short`

- `03-peekaboo-title.png`
  Base image: `peekaboo-face-to-face.png`
  Overlay: `Experiment 1: Peekaboo`

- `04-peekaboo-protocol.png`
  Base image: `peekaboo-variation-strip.png`
  Overlay: `Ready`, `Hide`, `Pause`, `Reveal`

- `05-peekaboo-variations.png`
  Base image: `peekaboo-variation-strip.png`
  Overlay: `Standard`, `Delayed`, `Wrong-side`

- `06-still-face-title.png`
  Base image: `still-face-neutral-setup.png`
  Overlay: `Experiment 2: Still-face`

- `07-still-face-phases.png`
  Base image: `still-face-phase-strip.png`
  Overlay: `Play - about 60 seconds`, `Still-face - up to 30 seconds`, `Reunion now`, plus a small `Optional / stop early` banner

- `08-kick-title.png`
  Base image: `kick-wide-room.png`
  Overlay: `Experiment 3: Kick-to-move`

- `09-kick-safe-setup.png`
  Base image: `kick-wide-room.png`
  Overlay: `Soft ribbon`, `Lightweight toy`, `Parent nearby`

- `10-kick-phases.png`
  Base image: `kick-phase-strip.png`
  Overlay: `Baseline`, `Connected`, `Disconnect`

- `11-imitation-title.png`
  Base image: `imitation-rattle-demo.png`
  Overlay: `Experiment 4: Imitation`

- `12-imitation-versions.png`
  Base image: `imitation-delay-sequence.png`
  Overlay: `Immediate`, `Short delay`, `Jingly object`

- `13-record-reflect-title.png`
  Base image: `observation-notebook.png`
  Overlay: `Record what you saw`

- `14-observation-template.png`
  Base image: `observation-notebook.png`
  Overlay: two-column note template for `What I saw` and `What I think it means`, plus one example row

- `15-end-card.png`
  Base image: `hero-home-lab.png`
  Overlay: article CTA and site URL

## Thumbnail plan

> The thumbnail is now generated by code: `npm run video:infant-experiments:thumbnail`

The thumbnail uses crops from:

- `peekaboo-face-to-face.png`
- `kick-wide-room.png`
- `imitation-rattle-demo.png`

Then add:

- title text: `HOW BABIES THINK`
- warm stone background
- one amber accent line or block

## Safety rules

- No crying or red-faced baby imagery.
- No tied ribbon details or anything that could be misread as a safety instruction.
- No text embedded in the AI image itself.
- If a plate looks elegant but slightly unsafe, reject it and regenerate.
