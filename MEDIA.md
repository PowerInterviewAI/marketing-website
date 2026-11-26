# Public assets

Everything in `public/` is served at a public URL, so notes about these files live here rather
than beside them.

```text
public/
  favicon.ico, apple-touch-icon.png   Paths browsers request by convention
  manifest.json, llms.txt             Files that crawlers and browsers expect at the root
  google*.html                        Search Console verification, do not move
  brand/                              Logo, favicons, Open Graph card
  media/
    demos/                            Product demos and their posters
    lifestyle/                        Generated ambient practice loop
    roles/                            Role videos: generated person + real UI
    testimonials/                     Fallback avatar for real testimonials
    docs/
      app/                            App screenshots
      mock/                           Mock interview screenshots
      install/                        Installer screenshots
      macos/                          macOS permission screenshots
      export/                         Sample exported report
      diagrams/                       Hand-authored SVG diagrams
```

## Rules

- Use kebab-case names that describe the content, with no tooling suffixes.
- When a deployed asset moves, add its old URL to `LEGACY_ASSET_REDIRECTS` in
  `src/config/routes.ts`.
- Alt text is the visible caption in the docs, so write a real description.
- Markdown cannot carry image sizes. `src/lib/media.ts` reads PNG, JPEG, WebP and SVG headers.
  An embedded `.mp4` needs a poster entry in `VIDEO_POSTERS`.

## Product demos and screenshots

`media/demos/*` and most of `media/docs/{app,mock}/*` come from the real client renderer with its
Electron bridge replaced by scripted sample data. The UI is real, but no backend or live call is
involved.

Start the renderer in `../client-app`:

```bash
pnpm exec vite --port 15173 --strictPort
```

Then run one of these from this repo:

```bash
node scripts/demo-videos/record.mjs <output-dir> record
node scripts/demo-videos/capture-docs.mjs public/media/docs
```

Sessions are defined in `scripts/demo-videos/scenes.mjs`.

## Tour video

`media/demos/tour.mp4` is the 90-second narrated ad, played by `TourPlayer` in the hero
(click to play, with sound; nothing downloads before that). Its app UI is the real renderer with
sample data; the two leads and the role portraits are fictional people generated in ComfyUI
(Qwen Image Edit 2511 without the Lightning LoRA for photorealism, Wan 2.2 for motion), and the
narration is Kokoro-82M. The copy beside it says so, and it must never be captioned as customers.
`media/demos/tour.webp` is the cover, built by `scripts/tour-cover/cover.html`: the real mock
report and live session windows (labelled Before / During) beside the presenter, with no headline
because it sits under the hero's `h1`. `TourPlayer` centres its play button on the empty middle of
the live window, so re-place the button if the cover layout changes. Production files, prompts,
seeds and the full report live in `../pia-advertise/2026-11-26/assets/ad-90s/`.

## Open Graph image

`brand/open-graph.png` is 1200x630 and is rendered from the real report screenshot by
`node scripts/generate-og.mjs`. Re-run it when the language count or the report screen changes.
Social platforms cache this image by URL, so a replacement may take time to appear on links that
were already shared.

## Social covers

`brand/social/*.png` (outside `public/`, since the site never serves them) are the profile
banners for X, LinkedIn (profile and company page), Facebook, YouTube, the GitHub social preview
and the Product Hunt gallery. `node scripts/generate-covers.mjs [name...]` renders them from the
same real screenshots as the Open Graph card; each platform's size and safe area is listed at the
top of the script. Both scripts share `scripts/lib/render-html.mjs`. Re-run them together when the
hero copy or the language count changes.

## Generated media

`media/lifestyle/*` and the people in `media/roles/*` were generated locally in ComfyUI with Qwen
Image Edit and Wan 2.2. They are fictional, so never caption them as customers or testimonials.
The clips stay at Wan's native 16 fps because motion interpolation smeared fast hand movement.

Each role video overlays a recording of the real mock interview UI with sample data. Record it with
`scripts/demo-videos/role-ui.mjs`, then combine it with `scripts/demo-videos/compose-roles.mjs`.
Each role has a 16:9 desktop video and a 4:5 phone video.

## Testimonials

`media/testimonials/avatar-placeholder.png` is only a no-photo fallback.

`media/testimonials/*.jpg` are fictional 700x900 phone-style selfies generated
locally in ComfyUI (Qwen Image Edit 2511, Lightning 4-step, text-to-image), with
light grain added in ffmpeg. They pair with the fictional entries in `src/config/testimonials.ts`,
are used for a school demo, render with a "Fictional example" badge, and must never reach `main`.
