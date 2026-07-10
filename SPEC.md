# Power Interview AI — Project Spec

## Overview

Power Interview AI's marketing site: a Next.js App Router app with no database, deployed to Vercel with normal server rendering.

- **Name / version**: `power-interview-hero` — app version tracked in `src/config/constants.ts` (`APP_CONFIG.version`)
- **Stack**: React 18 + TypeScript + Next.js 16 (App Router) + Tailwind CSS 3
- **Deployment**: Vercel, auto-detected Next.js build (no custom `vercel.json` framework overrides needed)

## Goals

- Present Power Interview AI's product (an AI interview coaching tool) through a marketing site: hero, features, pricing, FAQ, benefits, why-choose, contact.
- Host user-facing product documentation (`/docs`) rendered from Markdown at build time.
- Give every route real, server-rendered per-page metadata (title, description, canonical, Open Graph, Twitter) so crawlers and social previews see the right content per page — not just the homepage's.

## Routes

Defined by `src/app/`'s file-based routing:

| Path | Route file | Notes |
|---|---|---|
| `/` | `src/app/page.tsx` | renders `HomeContent`, composed from `src/components/sections/*` |
| `/features` | `src/app/features/page.tsx` | |
| `/pricing` | `src/app/pricing/page.tsx` | |
| `/faq` | `src/app/faq/page.tsx` | |
| `/contact` | `src/app/contact/page.tsx` | |
| `/why-choose` | `src/app/why-choose/page.tsx` | |
| `/benefits` | `src/app/benefits/page.tsx` | |
| `/privacy` | `src/app/privacy/page.tsx` | |
| `/terms` | `src/app/terms/page.tsx` | |
| `/docs` | `src/app/docs/page.tsx` | listing, built from `src/lib/docs.ts` reading `src/content/docs/*.md` |
| `/docs/[slug]` | `src/app/docs/[slug]/page.tsx` | individual doc; `generateStaticParams` prerenders all slugs |
| `/sitemap.xml` | `src/app/sitemap.ts` | generated from the real route list + doc slugs |
| `/robots.txt` | `src/app/robots.ts` | |
| unmatched paths | `src/app/not-found.tsx` | real 404 page (previously a silent redirect to `/`) |

## Home page composition

`src/components/HomeContent.tsx` (client component) assembles, in order, the section components under `src/components/sections/`: `Header`, `HeroSection`, `InterviewCountBanner`, `BenefitsSection`, `FeaturesSection`, `WhyChooseSection`, `PricingSection`, `CoFoundersSection`, `FAQSection`, `ContactSection`, `FooterSection`.

## Documentation content

Markdown docs live in `src/content/docs/`:

- `introduction.md`
- `installation.md`
- `how-it-works.md`
- `usage.md`
- `mock-interview.md`
- `best-practices.md`
- `beta-tester.md`
- `troubleshooting.md`

Rendered server-side with `react-markdown` + `remark-gfm`. Adding a doc requires: drop the `.md` file in `src/content/docs/` and add its slug to the `ORDER` array in `src/lib/docs.ts` (the single source of truth for both the index listing and sidebar order).

## Configuration surface

- `src/config/constants.ts` — `APP_CONFIG` (name/description/version/author/repo), `ENV` (reads `NEXT_PUBLIC_*` vars, currently only `NEXT_PUBLIC_API_BASE_URL`); routing itself is file-based under `src/app/` (see route table above)
- `src/types/index.ts` — shared types: `Status`, `ApiResponse<T>`, `User`, `Plan`, `Theme`
- Env vars must be prefixed `NEXT_PUBLIC_` to reach client code; copy `.env.example` → `.env.local`

## Theming

`src/hooks/useTheme.ts` manages light/dark/system via `localStorage` (read only inside `useEffect`, never during render), toggling Tailwind's `dark` class on `<html>` (`darkMode: 'class'` in `tailwind.config.js`). An inline script in `src/app/layout.tsx` sets the class before hydration to avoid a flash of the wrong theme.

## Styling

Tailwind CSS with HSL CSS variable theming in `src/styles/index.css` (imported globally in the root layout), which also holds custom scrollbar and markdown "prose" styles. `cn()` (clsx + tailwind-merge) in `src/lib/utils.ts` is the standard way to compose conditional classnames — no ad hoc string concatenation for class lists.

## SEO

Every page exports `metadata` or `generateMetadata` via the shared `buildMetadata()` helper in `src/lib/metadata.ts`. The root layout (`src/app/layout.tsx`) holds sitewide defaults, three JSON-LD `<script>` blocks (`SoftwareApplication`, `Organization`, `FAQPage`), and Google Analytics via `next/script`. `src/app/sitemap.ts` and `src/app/robots.ts` are generated, not hand-maintained; `public/llms.txt` is a plain-text product summary for AI systems.

## Model naming

Power Interview AI's own included/default models are referred to generically in all marketing copy as **"free model"** (free-trial and beta-tester tiers) and **"SOTA model"** (paid tier), not by a specific underlying model name — those change over time and the copy shouldn't need to chase them. "Bring your own provider" vendor names (OpenAI, Anthropic, Google) are unaffected by this and can be named directly.

## Non-goals

- No API routes, database, or auth — anything requiring persistence is out of scope for this repo. Server rendering is used for metadata/SEO correctness, not for dynamic data.
- No CMS integration for docs — Markdown files are static and ship with the build.

## Tooling / quality gates

- `pnpm build` = `next build` (TypeScript errors fail the build).
- `pnpm lint` — ESLint, zero warnings allowed (`--max-warnings 0`).
- Husky + lint-staged run Prettier + ESLint on staged `.ts`/`.tsx` files pre-commit; Prettier auto-sorts imports (`@trivago/prettier-plugin-sort-imports`) and Tailwind classes (`prettier-plugin-tailwindcss`).
