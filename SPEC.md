# Power Interview AI — Project Spec

## Overview

Power Interview AI's marketing site: a static, client-rendered React SPA with no backend and no database. Built with Vite, deployed as static files to Vercel (`vercel.json`).

- **Name / version**: `power-interview-hero` — app version tracked in `src/config/constants.ts` (`APP_CONFIG.version`)
- **Stack**: React 18 + TypeScript + React Router DOM 7 + Tailwind CSS 3 + Vite 6
- **Deployment**: static build (`dist/`) served via Vercel

## Goals

- Present Power Interview AI's product (an AI interview coaching tool) through a marketing site: hero, features, pricing, FAQ, benefits, why-choose, contact.
- Host user-facing product documentation (`/docs`) rendered from Markdown at build time.
- Stay a zero-backend static site — all state is client-local (theme preference) or delegated to external services (analytics, forms via whatever `VITE_*` endpoints are configured).

## Routes

Defined in [`src/App.tsx`](src/App.tsx):

| Path | Page | Notes |
|---|---|---|
| `/` | `Home` | composed from `src/components/sections/*` |
| `/features` | `Features` | |
| `/pricing` | `Pricing` | |
| `/faq` | `FAQ` | |
| `/contact` | `Contact` | |
| `/why-choose` | `WhyChoose` | |
| `/benefits` | `Benefits` | |
| `/privacy` | `PrivacyPolicy` | |
| `/terms` | `TermsOfService` | |
| `/docs` | `DocsIndex` | listing, built from `import.meta.glob` over `src/content/docs/*.md` |
| `/docs/:slug` | `DocsPage` | individual doc, sidebar order controlled by `ORDER` array in `pages/docs/[slug].tsx` |
| `*` | redirect to `/` | catch-all |

## Home page composition

`Home.tsx` assembles, in order, the section components under `src/components/sections/`: `Header`, `HeroSection`, `InterviewCountBanner`, `BenefitsSection`, `FeaturesSection`, `WhyChooseSection`, `PricingSection`, `CoFoundersSection`, `FAQSection`, `ContactSection`, `FooterSection`.

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

Rendered with `react-markdown` + `remark-gfm`. Adding a doc requires: drop the `.md` file in `src/content/docs/` **and** add its slug to the `ORDER` array in `src/pages/docs/[slug].tsx`, or it won't appear in the sidebar.

## Configuration surface

- `src/config/constants.ts` — `APP_CONFIG` (name/description/version/author/repo), `ENV` (reads `VITE_*` vars, currently only `VITE_API_BASE_URL`); routing itself is hardcoded in `App.tsx` (see route table above)
- `src/types/index.ts` — shared types: `Status`, `ApiResponse<T>`, `User`, `Plan`, `Theme`
- Env vars must be prefixed `VITE_` to reach client code; copy `.env.example` → `.env.local`

## Theming

`src/hooks/useTheme.ts` manages light/dark/system via `localStorage`, toggling Tailwind's `dark` class on `<html>` (`darkMode: 'class'` in `tailwind.config.js`).

## Styling

Tailwind CSS with HSL CSS variable theming in `src/styles/index.css`, which also holds custom scrollbar and markdown "prose" styles. `cn()` (clsx + tailwind-merge) in `src/lib/utils.ts` is the standard way to compose conditional classnames — no ad hoc string concatenation for class lists.

## SEO

`src/components/Seo.tsx` sets per-page meta tags. `index.html` carries global JSON-LD structured data, Open Graph tags, and `gtag` (Google Analytics).

## Non-goals

- No server-rendered pages, API routes, or database — anything requiring persistence or auth is out of scope for this repo.
- No CMS integration for docs — Markdown files are static and ship with the build.

## Tooling / quality gates

- `npm run build` = `tsc && vite build` — type errors fail the build.
- `npm run lint` — ESLint, zero warnings allowed (`--max-warnings 0`).
- Husky + lint-staged run Prettier + ESLint on staged `.ts`/`.tsx` files pre-commit; Prettier auto-sorts imports (`@trivago/prettier-plugin-sort-imports`) and Tailwind classes (`prettier-plugin-tailwindcss`).
