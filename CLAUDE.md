# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev             # Start dev server at http://localhost:3000
pnpm build           # TypeScript check + Next.js production build
pnpm start           # Serve the production build locally
pnpm lint            # ESLint (strict, zero warnings allowed)
pnpm format          # Prettier format (auto-sorts imports + Tailwind classes)
pnpm format:check    # Check formatting without writing
```

Pre-commit hooks run Prettier + ESLint on staged TypeScript files automatically via Husky.

## Architecture

This is a **Next.js App Router marketing site** for Power Interview AI — no database, deployed to Vercel with normal server rendering. All routes live under `src/app/[locale]/` - see **Localization** below.

### Routing & Pages

**`src/config/routes.ts` is the single source of truth for every internal destination.** `ROUTES` (page paths), `SECTIONS` (home-page anchor ids), `NAV_LINKS`, `SITEMAP_ROUTES` and `LEGACY_ANCHOR_REDIRECTS` all live there, and the header, footer, `sitemap.ts` and `next.config.ts` read from it. They each used to keep their own hand-written list and had already drifted — the footer pointed "Pricing" at a scroll target while the header pointed it at `/pricing`. Add a route in one place; don't reintroduce a second list.

File-based routing under `src/app/[locale]/` (the `[locale]` segment is one of `LOCALES` - `en`, `de`, `es`, `fr`, `pt`, `ru`, `ja`, `ko`, `zh`; English URLs carry no prefix):

- `src/app/[locale]/page.tsx` — home route (`/`), a Server Component rendering `HomeContent`. Both are Server Components; the async data-fetching sections are rendered by the page and passed to `HomeContent` as already-resolved elements
- `src/app/[locale]/how-it-works/`, `mock-interview/`, `pricing/`, `faq/`, `team/`, `privacy/`, `terms/` — standalone pages
- `src/app/[locale]/docs/page.tsx` + `src/app/[locale]/docs/[slug]/page.tsx` — docs listing and individual doc pages (Server Components, `generateStaticParams` prerenders all slugs)
- `src/app/[locale]/not-found.tsx` — 404 for unmatched paths, rendered inside `PageChrome` so it still offers the full nav. Reached through the `[locale]/[...rest]` catch-all, which calls `notFound()`
- `src/app/sitemap.ts` / `src/app/robots.ts` — generated from `SITEMAP_ROUTES` + `src/lib/docs.ts`'s slug list, not hand-maintained

Every page except the docs (which have their own sidebar layout) uses `PageChrome` (`src/components/PageChrome.tsx`) for the Header/Footer.

### The routing rules

**1. Every navigation destination is a link.** `NavLink` (`src/components/NavLink.tsx`) always renders a link (a `LocalizedLink`, i.e. `next/link` that keeps the active locale). Its predecessor, `SectionNavLink`, rendered a `<button>` calling `scrollIntoView` whenever the target was a section of the page you were already on — so the same nav item was a link on `/pricing` and not a link on `/`. That cost the URL in the status bar, middle-click and cmd-click, copy-link, crawlability, and left the address bar reading `/` after you'd scrolled to Features. **Never render a nav destination as a `<button>`.**

**2. The primary nav is routes only; anchors live in the footer.** `NAV_LINKS` is How it works / Languages / Pricing / FAQ / Docs — all real pages. Mock interview is a real page too and deliberately stays out of it, even though it now leads the home page: seven items is more than the bar fits at `md`, and the section is reached from the hero's secondary CTA, the head of the Features grid, the top of the footer's Product column and the docs. Add it to `NAV_LINKS` only alongside a nav that can hold it. Features, Why Us and Contact are still home-page sections, reached by scrolling and linked from the footer as `/#features` etc., which is conventional there and is a real, shareable URL. The bar used to mix the two with identical styling, which meant one nav with two behaviours and an active state that needed two rules to describe it (`pathname` for pages, a scroll-spy for anchors). Active state is now `pathname` alone — `useScrollSpy` is gone, along with the document-wide `MutationObserver` it ran.

**3. Hash scrolling is the browser's job.** `<Link href="/#features">` emits a real `<a>` and the browser scrolls to the id. `html { scroll-behavior: smooth }` and `:target { scroll-margin-top: 5rem }` in `src/styles/index.css`, plus `scroll-mt-20` on the `Section` variants, are what used to be a `scrollToSection` callback threaded from the page down through Header/Hero/FAQ/Footer — except that version also dropped every target behind the 4rem sticky header. **Don't reintroduce a `scrollToSection` prop.**

**4. The home page is the short version; each route owns the full detail.** `HowItWorksSection`, `PricingSection` and `FAQSection` take a single `standalone` prop, which moves the heading from `h2` to `h1`. On home, `FAQSection` also shows the first two questions per category and links to `/faq`, the complete list that carries the FAQPage JSON-LD. `/mock-interview` and `/team` are routes and are not rendered on home. `next.config.ts` 308s the old `/features`, `/benefits`, `/why-choose` and `/contact` routes to home-page anchors; they were exact duplicates of the home sections and competed with the home page for ranking. A sitemap must never list a URL that 3xx's, so `SITEMAP_ROUTES` excludes them.

**5. An anchor target must be unique and must survive.** `PricingSkeleton` deliberately carries no `id`: it used to be `id="pricing"` as well, so the streamed HTML held two elements with that id and `/#pricing` resolved to the fallback, which is then thrown away.

**6. One label, one destination.** Every "Download" control uses `DownloadCta` (`src/components/DownloadCta.tsx`) and goes to `DOWNLOAD_HREF` (`/#install`). It replaced `GoHomeButton`/`useGoHome`, a `<button>` that pushed `/` from other pages and scrolled to the top of the home page — so a control labelled "Download Power Interview AI" offered no download, while the footer's "Download" link three columns away went to GitHub releases.

JSON-LD is scoped the same way (`src/lib/jsonLd.ts`): `Organization` is site-wide and stays in the root layout, `SoftwareApplication` is on the home page, `FAQPage` is on `/faq`. Structured data has to describe the page it sits on — all three used to be emitted on every route, including `/privacy` and every docs page.

### Localization

The site ships in nine languages, the same set as the app's interface: English (default, unprefixed: `/pricing`), German, Spanish, French, Portuguese (written as Brazilian), Russian, Japanese, Korean and Simplified Chinese (`/de/pricing`, `/ja/pricing` ...). Everything about it hangs off `src/i18n/`:

- **Routing.** Every page lives under `src/app/[locale]/`. `src/proxy.ts` rewrites unprefixed requests onto the hidden `/en` segment and 308s `/en/...` back to the clean URL, so there is one URL per page. There is deliberately **no `Accept-Language` redirect**: a crawler and a person must get the same page from the same URL; the header's language menu (`LanguageSwitcher`, a native `<details>` of real `<a hreflang>` links that keep the hash, so it works without JavaScript and every translation stays crawlable) is how a reader chooses. It lists endonyms in `LOCALES` order - English first, then alphabetical by endonym, the same order as the app's picker. `src/i18n/config.ts` is the single source of truth (`LOCALES`, `localizePath`, `stripLocale`) and, like `routes.ts`, must stay free of imports because the proxy and `next.config.ts` read it outside the app bundle.
- **Copy lives in the catalogue, not in components.** `src/i18n/messages/<locale>/<namespace>.ts`, one namespace per area (`chrome`, `hero`, `features`, `faq`, `meta` ...), aggregated by each locale's `index.ts`. **English is the source type**: `Messages = typeof en`, and every other locale's file is annotated with the English type, so a missing or extra key is a `tsc` error. Adding a namespace is an edit per locale plus each locale's `index.ts`.
- **Server vs client.** Server Components take a `locale` prop and call `getMessages(locale)`; pages get it from `getLocale(props)` (`src/i18n/server.ts`). Client Components cannot take the full catalogue (it would ship both languages), so `<LocaleProvider>` in the `[locale]` layout hands them only the slice in `getClientMessages` (`chrome`, `common`, `docs`, `hero`) via `useMessages()` / `useLocale()`. A string a Client Component renders must live in one of those namespaces. `not-found.tsx` and `loading.tsx` receive **no route params**, so their text is rendered by client components (`NotFoundContent`, `Skeletons`, `DocsNotFoundBody`) that read the provider.
- **Strings are plain data.** No functions in messages (they cannot cross the server/client boundary). `{name}` placeholders go through `format()`; `**phrase**` marks emphasis and is rendered by `RichText` so a translation can bold the right words; counts that agree with a noun go through `pluralize()` (Russian needs four forms: 1 язык, 2 языка, 5 языков), and `LANGUAGE_COUNT` / the plans in `src/lib/plans.ts` stay the source of every derived number - pass them in, don't write them into a message. The restated-number exceptions: the FAQ answers, `meta.ts` page descriptions, the docs markdown and `public/llms.txt` quote the plan prices ($25 a month, $60 a quarter, $180 a year) as text, so a price change is `src/lib/plans.ts`, `faq.ts` and `meta.ts` in **each** locale, the markdown, `llms.txt`, and the backend.
- **Language names** in the Languages section come from `Intl.DisplayNames` for non-English locales instead of a second hand-written table.
- **English-only pages.** The legal pages and the docs (markdown in `src/content/docs/`) are not translated yet. Their *chrome* is, and under `/ru` an `EnglishOnlyNotice` links to the English page. They are listed in `ENGLISH_ONLY_ROUTES` (`src/config/routes.ts`): `buildMetadata({ translated: false })` canonicalises `/ru/privacy` to `/privacy` with no hreflang, and `sitemap.ts` lists them once, in English - claiming `ru` for English text is a mismatch, and two indexable copies compete. **When a page gets translated, remove it from that list and drop `translated: false`.**
- **SEO.** `buildMetadata` takes `locale` and emits a self-referencing canonical plus hreflang for every locale and `x-default`; the sitemap lists each translated page once per locale with the same alternates. JSON-LD (`Organization`, `SoftwareApplication`, `FAQPage`) is built per locale from the catalogue, so a Russian page never carries English structured data. The legacy anchor and doc redirects in `next.config.ts` are generated for every locale.
- **Adding a locale**: add it to `LOCALES` and `LOCALE_META`, add the files to every namespace (tsc lists what is missing), register it in `src/i18n/messages/index.ts`, add its `Intl` plural forms where `PluralForms` are written, and check `public/llms.txt`.
- **`LOCALE_META` carries more than a label.** `htmlLang` (also the hreflang) names the variant the copy is written in - `pt-BR`, `zh-CN` - while the URL segment stays the bare code; `zh-CN` is also what makes the browser pick a Chinese rather than a Japanese fallback font for Han characters. `space` is the separator for a sentence assembled from parts (the hero's bold phrases, the link after a paragraph in Features, Languages and `EnglishOnlyNotice`): empty in Japanese and Chinese, which do not put spaces between words. `period` closes a sentence whose last part is a link (`。` in Japanese and Chinese) - never write `{' '}` or a literal `.` around a translated string. The Japanese and Chinese copy does keep a space between a digit or Latin word and CJK text (`97 言語`); that is house style, not the same thing.
- **Check new copy at phone width.** German, French and Russian run longest; the install tabs wrap and hyphenate inside their third of the row because a nowrap label once pushed the whole page wider than a 390px screen.
- **Translations beyond English and Russian were written by Claude** and want a native-speaker pass, the landing copy and the FAQ first.

`public/llms.txt` is hand-written: an "Other languages" section lists every locale's prefix and pages, and Russian keeps its own section with translated link text. Update it when a locale or a translated route is added.

### Documentation System

Markdown files live in `src/content/docs/`. `src/lib/docs.ts` reads them via Node `fs` (there's no `import.meta.glob` equivalent in Next.js) and holds the **single canonical `ORDER` array** used by both the docs index and the sidebar — don't add a second one. Adding a new doc: drop the `.md` file in `src/content/docs/` and add its slug to `ORDER` in `src/lib/docs.ts`.

The markdown render pipeline (`src/app/[locale]/docs/[slug]/page.tsx`) uses `react-markdown` + `remark-gfm` server-side; only the image renderer (`src/components/docs/MarkdownImage.tsx`) is a client component, since it's the only genuinely interactive piece (click-to-preview lightbox; `.mp4` sources render as a `<video>` with `controls` + `preload="metadata"` instead). Alt text doubles as the visible figure caption, so write a real description — obvious filler (`![Image](…)`) is detected and suppressed from the caption.

**Every doc surface must offer a route back to `/docs`.** The docs root is reachable from the sidebar's "All documentation" entry (`DocsSidebar`), the breadcrumb (`DocsBreadcrumb`), the foot-of-page pager (`DocsPager`, which also does prev/next from `getDocNeighbours`), and the docs-scoped 404 at `src/app/[locale]/docs/[slug]/not-found.tsx`. Don't drop one without replacing it — a reader landing on a doc from search previously had no way to the index at all on mobile.

`.markdown-body` (github-markdown-css) is scoped to the `<article>` holding the rendered markdown, **not** to the whole content column. It restyles every `ol`/`ul`/`a` beneath it, which turned the breadcrumb into a numbered list and put bullets on the index cards. Keep page chrome outside it.

Demo videos live in `public/media/` (kebab-case, no tooling suffixes like `_compressed`); `public/media/docs/` holds the smaller screenshots/diagrams. Docs markdown references the shared clips in `public/media/` directly rather than keeping a second copy under `public/media/docs/`. Markdown can't carry `width`/`height`, so `src/lib/media.ts` reads each asset's intrinsic size off its file header at render time (PNG/JPEG/SVG) and stamps it on — that's what keeps screenshots from reflowing the prose as they decode. It also maps the embedded `.mp4`s to their posters; add an entry there for any new clip or it paints a black rectangle.

The six pending docs screenshots are still placeholders, generated by `node scripts/generate-placeholders.mjs`, which is the source of truth for their exact pixel sizes. `public/media/marketing/` is no longer placeholder art: the four hero posters are real frames cut from the demo clips and annotated by `python scripts/generate-posters.py` (needs ffmpeg + Pillow), and the testimonial avatar is a generated default avatar. Don't add the posters back to `generate-placeholders.mjs` — that would overwrite photographs with grid cards. Each folder's `README.md` has the details.

### Component Architecture

- `src/components/sections/` — the modular sections composing the Home page (Header, Hero, Features, Pricing, FAQ, Footer, etc.). Most are Server Components; only the genuinely interactive ones (`Header` for the mobile sheet, `InstallPanel` for the tabs and clipboard, the hero's `DownloadButton`/`HeroPreview`/`ProofBar`, plus `AnswerUpgrade`, `RolePicker` and `LanguageChecker`) are `'use client'`. Removing the `scrollToSection` plumbing took the client boundary off the whole home page
- `src/components/ui/` — shadcn/ui base components (Button, Card) with `cva` variants
- `src/components/docs/` — `DocsLayout.tsx` + `DocsSidebar.tsx` for the docs section (client components; the doc slug list is resolved server-side in the page and passed down as a prop, since `fs` isn't available in a browser bundle)
- `cn()` utility in `src/lib/utils.ts` (clsx + tailwind-merge) — always use this for conditional classnames
- Always use `LocalizedLink` (`src/i18n/LocalizedLink.tsx`, a `next/link` that prefixes the active locale) for internal navigation, never a bare `next/link` `Link` (it would drop a Russian reader back into English) and never a raw `<a href="/...">` (a full page reload) and never a `<button>` with a scroll handler. `react-router-dom` isn't a dependency anymore
- Never nest a `<Button>` inside a `<Link>` — that renders a `<button>` inside an `<a>`. Use `<Button asChild><LocalizedLink …/></Button>`

### The two things the product does, in order

The site sells a mock interview *and* a live assistant, and both are first-party features of the desktop app. **The mock interview comes first everywhere** - it is the half a reader can use the evening they download the app, without a scheduled interview to use it on, and the live assistant is what the rehearsal is for. Concretely, that ordering is carried by:

- `HomeContent` renders `PracticeSection` directly under the hero, ahead of the languages, role picker and developer sections. `/mock-interview` keeps the full `MockInterviewSection`
- `HowItWorksSection` is four steps, not three: install, add your CV and the job description, rehearse as a mock interview, then join the real call
- `RolesSection` carries the legacy `#benefits` and `#why-choose` anchors, and `CodingSection` carries `#features`, because `LEGACY_ANCHOR_REDIRECTS` still points old URLs there. Developers are the first role and have a dedicated section, but coding help is pitched for practice and interviews that allow AI tools. Keep hiding from screen share out of marketing copy, metadata and demos
- The `faq.items` array in `src/i18n/messages/<locale>/faq.ts` (read through `getFaqItems` in `src/config/faq.ts`) leads its Product category with the mock question and its Plans & billing category with mock pricing, followed by how the subscription works
- `ORDER` in `src/lib/docs.ts` puts `mock-interview` ahead of `live-interview`, and `public/llms.txt` matches
- Hero and `PracticeSection` copy open on the rehearsal

Don't reorder any of those back without moving all of them: half the site leading with practice and half with the live call is how the copy drifted the first time. That is recent: `mock-interview.md` used to tell readers to open ChatGPT's voice mode and paste a prompt, because the app could not run a session itself, and the marketing copy still promised "AI-guided mock interviews" over the top of it. The workaround now survives only as the last section of that doc, for readers who would rather not spend their free hour.

Anything describing the mock interview has to match the client (`../client`), which is where the behaviour actually lives:

- Setup is seniority (junior/mid/senior/staff), difficulty (easy/standard/hard) and 3/5/8/12 questions. The role is **not** collected: it comes from the account's job context, and the same profile drives the questions and the scoring
- The interviewer speaks its questions, gates the microphone while it does, and can follow up **twice** on one question. A language with no voice makes it write them instead
- The session ends in a scored report: overall score, strengths, gaps, then per-question score, justification and a stronger answer, exportable as DOCX or Markdown
- Pricing is a subscription (`SUBSCRIPTION_PLANS` in `../backend/app/cfg/payment.py`): a free hour once on the free model, then a prepaid $25 monthly, $60 quarterly or $180 annual pass with unlimited live and mock interviews on the SOTA model, never auto-renewed. On the free hour a session spends free time by the minute, needs a minute left to start and stops when it runs out; a mock still delivers its report. Copy that quotes credits, credit packs or a per-minute price for paying users is stale - credits were the model before subscriptions

`src/lib/plans.ts` mirrors the plans for the components (the cards, the pricing description and the JSON-LD offers read it; `savingPercent` derives the yearly saving rather than writing it into copy). Markdown can't import it, so the docs restate the prices and the session lengths as text, as do the FAQ answers (`src/config/faq.ts` reads those for the JSON-LD); a price change is those places plus the backend.

### The language list is data, not copy

`src/config/languages.ts` is the site's single source of truth for every language an interview can run in, hand-mirrored from `Language` / `DEEPGRAM_TTS_VOICES` in `../backend/app/schemas/language.py` and `LANGUAGES` in `../client/src/renderer/types/language.ts`. There is no shared package across the three repos, so adding a language to the product is this file plus those two, the same way `src/lib/plans.ts` mirrors the backend plans above.

**The two columns are two different guarantees and must not be collapsed.** The transcription set is total: every entry is a language the speech model streams, and the backend rejects a streaming handshake for anything outside it. `hasVoice` is a strict subset (44 of the 97), and a language without a voice is a fully supported state rather than a gap - the mock interviewer writes its questions instead of speaking them, and the follow-ups, the scoring and the report are identical. That is why `LanguagesSection` marks the voiced languages rather than warning on the rest.

**Nothing writes the count as a literal any more.** `LANGUAGE_COUNT` and `VOICE_LANGUAGE_COUNT` are derived from the array and read by the hero, `ProofBar`, `LanguagesSection`, the `All N interview languages` detail in `MockInterviewSection` and the JSON-LD `featureList`. A hardcoded count in four files is four chances to add a language and ship three of them. Markdown and `public/llms.txt` can't import it, so `llms.txt` restates the list in full - it is what an assistant answering "does it support Korean?" actually reads - and the docs restate the count; a language change is those places plus the two repos above.

`LanguagesSection` (`/#languages`, rendered under the features grid) prints the whole list rather than the number, because a count is not an answer to the only question a reader who does not interview in English has. At 97 languages it shows the voiced ones first and collapses the rest behind a native `<details>`, which keeps the list server-rendered, with `LanguageChecker` as a client-side enhancement above it, and leaves every tile in the HTML for Ctrl+F and search engines. `dir` on each endonym comes from `isRtl()` in the config rather than `dir="auto"`: `auto` is right for every right-to-left endonym today and stops being right, silently, for the first name added that opens with a Latin word or a digit. The tile's localized name asks `Intl.DisplayNames` for `yue` / `zh-Hant` rather than `zh-hk` / `zh-tw`, which CLDR names as regions ("Chinese (Hong Kong)") rather than the languages offered.

### SEO / Metadata

Every route exports `metadata` (static pages) or `generateMetadata` (`/docs/[slug]`) via `src/lib/metadata.ts`'s `buildMetadata()`, which produces consistent title/description/canonical/OG/Twitter output. There's no `Seo.tsx` component; that pattern (a client `useEffect` mutating `document.title`) meant non-JS crawlers only ever saw the homepage's tags for every route.

- **Descriptions belong in the 120–160 character band.** Google truncates the snippet around there. Home used to run 566 characters, `/how-it-works` 262, `/pricing` 182 — everything past the cut is invisible and the sentence ends mid-clause.
- **The home page passes `absoluteTitle: true`** so its title is the brand-and-value line rather than `Home - Power Interview AI`. The most valuable title on the site was spending its first four characters on the word "Home".
- **Doc descriptions come from the doc.** `getDocDescription()` in `src/lib/docs.ts` reuses `getDocExcerpt()` to take the opening paragraph as plain text. They used to be `Documentation: ${title}` — 27–39 characters, identical in shape across all seven pages, which is a snippet Google discards.
- **Any page that 404s must be `noindex`.** Both `src/app/[locale]/not-found.tsx` and `src/app/[locale]/docs/[slug]/not-found.tsx` set it; without it they inherit the root layout's `index, follow`.
- **`sitemap.ts` never lists a URL that 3xx's**, and doc `lastModified` comes from the markdown file's mtime (`getDocLastModified`), not `new Date()` — a lastmod that moves for pages that didn't change is a signal crawlers learn to ignore.
- **`public/llms.txt` lists routes too.** It is not generated; update it when routes change. It had been advertising `/features`, `/benefits`, `/why-choose` and `/contact` as canonical URLs long after they became redirects.

**Structured data must be true of the page it sits on and visible to a reader of that page.** `src/lib/jsonLd.ts` scopes each block: `Organization` site-wide in the root layout, `SoftwareApplication` on the home page, `FAQPage` on `/faq`. All three used to be emitted on every route, including `/privacy` and every docs page.

- `buildSoftwareApplicationJsonLd(plans)` takes the live plans from `src/lib/plans.ts` so `offers` matches the plans the page renders (free, $25, $60 and $180). It used to hardcode lowPrice 20 / highPrice 500 against an endpoint actually returning 5–150 - wrong at both ends.
- **There is deliberately no `aggregateRating`.** It claimed 4.8 from 156 ratings while `src/config/testimonials.ts` is an empty array and no rating or review appears anywhere on the site. Google requires review markup to reflect ratings genuinely visible on the page; inventing them risks a manual action against the domain. Restore it only when real ratings are collected and shown, and derive it from that data — the same rule `testimonials.ts` already states for quotes.
- Don't claim a platform there's no build for (`operatingSystem` was `Windows, macOS, Linux`) or pass a logo off as a `screenshot`.

The root layout (`src/app/[locale]/layout.tsx`) holds the sitewide default metadata, `metadataBase`, the `Organization` JSON-LD, the anti-FOUC theme-init script, and Google Analytics via `next/script`.

### Model naming

Power Interview AI's own included/default models are referred to generically as **"free model"** (the free hour) and **"SOTA model"** (subscribers) throughout the site's copy - not by their actual underlying model name, which changes over time. Don't reintroduce a specific model name into marketing copy.

Bring-your-own-key was removed from the product, so the site no longer offers it anywhere: no "bring your own provider/key" copy, no LLM-vendor names (OpenAI, Anthropic, Groq, Google) as a thing the user connects, and no BYOK entry in the pricing tables, comparison table, JSON-LD `featureList`, metadata keywords, `public/llms.txt`, or the docs. The model is always the provided one.

### Theme System

`src/hooks/useTheme.ts` manages light/dark/system theme via localStorage. It defaults to `'dark'` during the initial render (matching the root layout's anti-FOUC script) and only reads `localStorage` inside a `useEffect` — reading it in a `useState` lazy initializer crashes during server rendering, since client components are still rendered server-side for their initial HTML.

### Configuration

- `src/config/routes.ts` — every internal route, section id and redirect (see **Routing & Pages**). Imported by `next.config.ts` directly, so it must stay free of imports and contain nothing but plain data
- `src/config/team.ts` — the team roster: who is on the page, their hand-curated contact links (GitHub's public API returns no email, Telegram or LinkedIn) and a last-known `fallback`. Name, avatar, counts, bio, location and X handle are fetched live by `getTeam()` in `src/lib/team.ts`, server-side through Next's fetch cache with a one-hour revalidate - one call per member an hour, however many visitors, so `/team` is ISR (`1h` in the build table). Bio and location are the member's own GitHub text and render untranslated in every locale - there is no `team.members` in the catalogue
- `src/config/constants.ts` — `APP_CONFIG`, `ENV` (reads `NEXT_PUBLIC_*` env vars and `process.env.NODE_ENV`)
- `src/types/index.ts` — shared types: `Status`, `ApiResponse<T>`, `User`, `Plan`, `Theme`
- Path alias `@/*` maps to `src/*` (configured in `tsconfig.json`)

### Environment Variables

Copy `.env.example` to `.env.local`. Variables must be prefixed `NEXT_PUBLIC_` to be exposed to client code, accessed via `process.env.NEXT_PUBLIC_*`. `GITHUB_TOKEN` is the exception: optional and server-only, it lifts the team fetch from GitHub's 60 unauthenticated calls an hour to 5,000 if a shared build IP ever runs out.

### Styling

Tailwind CSS with custom HSL CSS variables for theming (defined in `src/styles/index.css`, imported globally in `src/app/[locale]/layout.tsx`). Custom scrollbar and markdown prose styles are also in that file. Tailwind config in `tailwind.config.js` uses `darkMode: 'class'`.
