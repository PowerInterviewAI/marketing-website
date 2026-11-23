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
    lifestyle/                        Generated role photos and ambient loops
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
involved, so demos must stay labelled as samples.

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

## Open Graph image

`brand/open-graph.png` is 1200x630 and is rendered from the real report screenshot by
`node scripts/generate-og.mjs`. Re-run it when the language count or the report screen changes.
Social platforms cache this image by URL, so a replacement may take time to appear on links that
were already shared.

## Generated media

`media/lifestyle/*` was generated locally in ComfyUI with Qwen Image Edit and Wan 2.2. It shows
fictional people, so never caption it as customers or testimonials or use it as a product
screenshot. The loops stay at Wan's native 16 fps because motion interpolation smeared fast hand
movement.

## Testimonials

`media/testimonials/avatar-placeholder.png` is only a no-photo fallback. Testimonials must be real.
