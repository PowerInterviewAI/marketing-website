# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # Start dev server at http://localhost:3000
npm run build        # TypeScript check + Vite production build
npm run preview      # Preview production build locally
npm run lint         # ESLint (strict, zero warnings allowed)
npm run format       # Prettier format (auto-sorts imports + Tailwind classes)
npm run format:check # Check formatting without writing
```

Pre-commit hooks run Prettier + ESLint on staged TypeScript files automatically via Husky.

## Architecture

This is a **static React SPA marketing site** for Power Interview AI — no backend, no database, deployed as static files (Vite → `dist/`). Deployment config is in `vercel.json`.

### Routing & Pages

React Router DOM handles client-side routing. `App.tsx` defines all routes. Pages live in `src/pages/`:

- `Home.tsx` — main landing page, composed entirely of section components from `src/components/sections/`
- Standalone pages: `Benefits`, `Contact`, `FAQ`, `Features`, `Pricing`, `WhyChoose`, `PrivacyPolicy`, `TermsOfService`
- `pages/docs/index.tsx` — docs listing (uses `import.meta.glob` to discover markdown files)
- `pages/docs/[slug].tsx` — individual doc page with dynamic routing

### Documentation System

Markdown files live in `src/content/docs/`. The docs system uses Vite's `import.meta.glob` to load them at build time, renders with `react-markdown` + `remark-gfm`, and uses a hardcoded `ORDER` array in `[slug].tsx` to control sidebar order. Adding a new doc requires placing the `.md` file in `src/content/docs/` and adding its slug to the `ORDER` array.

### Component Architecture

- `src/components/sections/` — all modular sections composing the Home page (Header, Hero, Features, Pricing, FAQ, Footer, etc.)
- `src/components/ui/` — shadcn/ui base components (Button, Card) with `cva` variants
- `src/layouts/` — `DocsLayout.tsx` + `DocsSidebar.tsx` for the docs section
- `cn()` utility in `src/lib/utils.ts` (clsx + tailwind-merge) — always use this for conditional classnames

### Theme System

`src/hooks/useTheme.ts` manages light/dark/system theme via localStorage. Dark mode uses Tailwind's `class` strategy — the `dark` class is toggled on `<html>`.

### Configuration

- `src/config/constants.ts` — `APP_CONFIG`, `ENV` (reads `VITE_*` env vars), `ROUTES`
- `src/types/index.ts` — shared types: `Status`, `ApiResponse<T>`, `User`, `Plan`, `Theme`
- Path alias `@/*` maps to `src/*` (configured in both `vite.config.ts` and `tsconfig.json`)

### Environment Variables

Copy `.env.example` to `.env.local`. All variables must be prefixed `VITE_` to be exposed to client code and accessed via `import.meta.env.VITE_*`.

### Styling

Tailwind CSS with custom HSL CSS variables for theming (defined in `src/styles/index.css`). Custom scrollbar and markdown prose styles are also in that file. Tailwind config in `tailwind.config.js` uses `darkMode: 'class'`.

### SEO

`src/components/Seo.tsx` handles per-page meta tags. `index.html` contains global JSON-LD structured data, Open Graph tags, and Google Analytics (`gtag`).
