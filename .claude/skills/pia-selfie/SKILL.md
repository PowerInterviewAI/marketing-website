---
name: pia-selfie
description: Generate realistic phone-selfie photos for Power Interview AI's fictional sample testimonials with the local ComfyUI API, QA them, and wire them into the testimonials section. Use when asked to add, regenerate or fix testimonial selfies/avatars, add sample testimonials, or "pia selfie". Demo branch only - the people are fictional.
---

# pia-selfie

Makes the photorealistic selfies and data for the **fictional sample testimonials** on the
`demo/testimonials` branch (a school project). Everything here is invented, so three rules are
non-negotiable:

1. **Branch:** work only on `demo/testimonials`. Never merge sample entries or `*-sample.jpg` into
   `main` - `main` deploys to the real site, where invented reviews are fake reviews.
2. **Label:** every entry has `sample: true`, which renders the visible "Fictional example" badge.
   Don't remove the badge or the flag, and never add the ratings to JSON-LD (`aggregateRating`).
3. **Copy:** quotes must match the real product (see CLAUDE.md, "The two things the product does"):
   mock = seniority / difficulty / 3-5-8-12 questions / two follow-ups / scored report / DOCX+MD
   export; live and coding quotes happen in interviews that **allow AI tools**; no screen-share
   hiding, no model names, no credits, no BYOK.

## Files

| File | What it is |
|---|---|
| `spec.py` | `SPEC`: one tuple per person `(id, name, role, lang, mode, rating, look, scene, quote)`; `KEEP`: the ids that ship |
| `scripts/generate.py` | Queues ComfyUI text-to-image jobs and saves `<out>/<id>.png`; skips files that exist, so it resumes |
| `scripts/convert.sh` | Approved PNGs to `public/media/testimonials/<id>-sample.jpg` (700x900, grain, q5) |
| `scripts/emit_ts.py` | Writes `src/config/testimonials.samples.ts`, **only for ids whose JPEG exists**, so you can ship in batches |

The section itself is `src/components/sections/TestimonialsSection.tsx`, which renders the cards on
the server and hands them to `TestimonialMarquee.tsx`: two drifting rows like `LanguageMarquee`, in a new random order on every page load.
Order in the data file doesn't matter.
Strings are `testimonials.*` in every locale.

## Workflow

Use a scratch dir (the session scratchpad) for PNGs, never `public/`.

```bash
SK=.claude/skills/pia-selfie; OUT=<scratchpad>/selfies
curl -s -m 5 http://127.0.0.1:8188/system_stats >/dev/null || echo "start ComfyUI first"
python -I $SK/scripts/generate.py $SK/spec.py $OUT ben alex   # ids in the order you want; none = all of SPEC
```

~90 s per image at full quality: run batches over ~5 images with `run_in_background`.

**QA every image before converting** - build a contact sheet and look at it:

```bash
cd $OUT && ffmpeg -y -i a.png -i b.png -i c.png -i d.png -filter_complex \
 "[0]scale=448:576[a];[1]scale=448:576[b];[2]scale=448:576[c];[3]scale=448:576[d];[a][b][c][d]hstack=4" sheet.jpg
```

Reject (move to `$OUT/rejected/`, then regenerate) anything with:
- **a phone visible anywhere in the frame** - the critical bug; a front-camera selfie cannot show the phone
- **a laptop, monitor, screen bezel or keyboard in the frame**, or the person shown *on* a display - a webcam can't film itself
- an ID badge, lanyard, name tag, logo or readable text
- extra/fused fingers, a giant foreground limb, a warped face or eyes
- a studio/model look (perfect skin, softbox light) instead of an everyday phone photo

A regenerated image needs a different result: change that person's `look`/`scene` slightly in
`spec.py` (the seed and pose come from a hash of the id, so an unchanged prompt reproduces the reject).

Then ship:

```bash
bash $SK/scripts/convert.sh $OUT public/media/testimonials ben alex
python -I $SK/scripts/emit_ts.py $SK/spec.py src/config/testimonials.samples.ts
pnpm exec prettier --write src/config/testimonials.samples.ts && pnpm exec tsc --noEmit && pnpm lint
```

Update the count in `MEDIA.md`'s Testimonials note if it changed.

## Why the generator is set up this way (don't undo)

- **Model:** Qwen-Image-Edit-2511 fp8 used as text-to-image (empty `EmptySD3LatentImage` 896x1152),
  `qwen_2.5_vl_7b` text encoder (`CLIPLoader` type `qwen_image`), `qwen_image_vae`,
  `ModelSamplingAuraFlow` shift 3.1, **30 steps, cfg 3, no Lightning LoRA**. The 4-step Lightning
  LoRA is 8x faster but looks airbrushed, and at cfg 1 the negative prompt is ignored - which is
  what let badges and phones through. Realism is the requirement; take the time.
- **Negative prompt** carries the bans (phone in hand, mirror, badge, lanyard, text, plastic skin,
  CGI, bad hands). Saying "no phone" only in the positive prompt was not enough.
- **Poses** rotate per id. Removed because they put the phone in frame or broke anatomy: mirror
  selfie, "camera held high above", "knees up", and peace sign (overused). Don't add them back.
- **Prompt wording:** "natural skin texture" not "visible skin pores" (painted dots on arms);
  "natural untidy hair" not "flyaway hairs" (spiky artefacts on short hair).
- **Three cameras**, chosen per person by `CAMERA` in `spec.py` (default phone): `phone`, `laptop`
  (built-in webcam, eye level, slightly below) and `pc` (monitor webcam, slightly above). **A selfie
  never shows its own camera or display.** The webcam prompts describe only what the lens sees ("a
  video call frame, camera 50 cm in front of the face") and never name the hardware - writing
  "webcam", "laptop", "monitor" or "screen" made the model draw the person *on* a display. Those
  words live in the negative prompt instead, and a webcam person's `scene` must not mention a
  laptop, monitor or keyboard either.
- **Framing:** "close-up head and shoulders, the face fills most of the frame". The card also crops
  4:3 and zooms 1.4x at 30% from the top, so the face reads at card size.
- **Going-out looks:** `GLAM` in `spec.py` overrides `look`/`scene` for a few people (dressed up,
  flattering evening light, confident smile). Keep them tasteful - fully clothed, no suggestive
  poses; cleavage, lingerie and nudity are in the negative prompt. This is a testimonial for an
  interview product, so attractive is fine and sexualised is not.
- **Clothes/places:** casual personal clothes in everyday places. Work uniforms (scrubs, hi-vis,
  shirts with patches) pull in ID badges, so roles are carried by the quote, not the outfit.
