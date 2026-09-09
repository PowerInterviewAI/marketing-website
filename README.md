# Power Interview AI

A modern interview preparation platform built with Next.js (App Router), TypeScript, and Tailwind CSS.

## 🚀 Features

- ▲ **Next.js 16 (App Router)** - server-rendered routes, per-page SEO metadata
- ⚛️ **React 18** - Latest React features
- 🎨 **Tailwind CSS** - Utility-first CSS framework
- 🎭 **shadcn/ui** - Beautiful, accessible components built with Radix UI
- 📝 **TypeScript** - Type safety and better developer experience
- 💅 **Prettier** - Code formatting with import sorting
- 🔍 **ESLint** - Code linting for best practices
- 🎣 **Husky & lint-staged** - Pre-commit hooks for code quality
- 📦 **Production-ready** - Optimized build configuration

## 📁 Project Structure

```
power-interview-hero/
├── src/
│   ├── app/             # Routes (Next.js App Router - file-based routing)
│   ├── components/      # Reusable React components
│   │   ├── docs/        # Docs section layout/sidebar/markdown rendering
│   │   ├── sections/    # Marketing sections (home page, and the pages that reuse them)
│   │   └── ui/          # shadcn/ui components
│   ├── config/          # routes.ts, faq.ts, hotkeys.ts, constants.ts, testimonials.ts
│   ├── content/docs/    # Markdown documentation content
│   ├── hooks/           # Custom React hooks
│   ├── lib/             # Utility libraries (cn function, metadata, docs, media, jsonLd)
│   ├── styles/          # Global styles
│   └── types/           # TypeScript type definitions
├── public/               # Public static files (media, llms.txt, logo)
└── package.json          # Project dependencies and scripts
```

## 🗺️ Pages

`src/config/routes.ts` is the single source of truth for every internal destination - the header, footer, sitemap and `next.config.ts` redirects all read from it. Add a route there, not in a second list.

| Route             | What it is                                                                      |
| ----------------- | ------------------------------------------------------------------------------- |
| `/`               | Home. Composes every marketing section in order: hero, how it works, mock interview, then the live-call material |
| `/how-it-works`   | Install, set up, rehearse a mock interview, then join the real call              |
| `/mock-interview` | The in-app spoken mock interview: setup, session loop, scored report, pricing    |
| `/pricing`        | Trial vs paid, and the credit packs                                              |
| `/faq`            | The FAQ, and the only page carrying `FAQPage` structured data                    |
| `/team`           | The people building it                                                           |
| `/docs`           | Docs index, with a page per markdown file under `src/content/docs/`              |
| `/privacy`, `/terms` | Legal                                                                        |

Sections that also have a page of their own (`HowItWorksSection`, `MockInterviewSection`, `PricingSection`, `FAQSection`, `TeamSection`) render in full in both places. Their `standalone` prop only moves the heading from `h2` to `h1` so the route owns its `h1`.

The home page tells the product's story mock-first: `MockInterviewSection` renders above `FeaturesSection`, the features grid leads with the mock card, and step three of `HowItWorksSection` is the rehearsal, step four the live call. Keep that order when adding sections - the rehearsal is what a reader can use the evening they download the app.

## 📚 Documentation content

The pages under `/docs` are markdown files in `src/content/docs/`, rendered server-side with `react-markdown` + `remark-gfm`.

To add one: drop the `.md` file in that folder and add its slug to the `ORDER` array in `src/lib/docs.ts`, which is what both the index listing and the sidebar read. Titles come from the file's `#` heading and meta descriptions from its opening paragraph, so write both for a reader.

Images live in `public/media/docs/`; their intrinsic size is read off the file at render time (`src/lib/media.ts`), and alt text doubles as the visible caption. `public/llms.txt` lists the routes and docs for crawlers and is **not** generated - update it when either changes.

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+ and [pnpm](https://pnpm.io/)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/power-interview-hero.git
   cd power-interview-hero
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

### Development

Start the development server:

```bash
pnpm dev
```

The application will be available at `http://localhost:3000`

### Building for Production

Build the application:

```bash
pnpm build
```

Serve the production build locally:

```bash
pnpm start
```

### Code Quality

Format code with Prettier:

```bash
pnpm format
```

Check formatting:

```bash
pnpm format:check
```

Lint code:

```bash
pnpm lint
```

## 🎨 shadcn/ui Components

This project uses [shadcn/ui](https://ui.shadcn.com/) for beautiful, accessible UI components.

### Available Components

In `src/components/ui/`: **Accordion**, **Badge**, **Button**, **Card**, **Glow**, **Kbd**, **Reveal**, **Section**/**SectionHeading**, **Sheet** and **Tabs**. Variants are declared with `cva`, and conditional classes always go through `cn()` from `src/lib/utils.ts`.

### Adding More Components

Due to peer dependency conflicts, components are added manually:

1. Install required dependencies:

   ```bash
   pnpm add @radix-ui/[package-name]
   ```

2. Copy component code from [ui.shadcn.com](https://ui.shadcn.com/) to `src/components/ui/`, adjusting it to the tokens in `src/styles/index.css`

### Using Components

```tsx
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

<Button variant="default" size="lg">
  Click me
</Button>;
```

Never nest a `<Button>` inside a `<Link>` - that renders a `<button>` inside an `<a>`. Use `<Button asChild><Link …/></Button>`.

## 📦 Deployment

This project deploys to [Vercel](https://vercel.com), which auto-detects Next.js - no custom build configuration needed beyond `vercel.json`'s build command.

## 🔧 Configuration

### Next.js Configuration

See [next.config.ts](next.config.ts) for Next.js configuration options.

### Tailwind Configuration

See [tailwind.config.js](tailwind.config.js) for Tailwind CSS customization.

### Prettier Configuration

See [.prettierrc](.prettierrc) for code formatting rules.

## 📝 License

This project is licensed under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 💬 Community & Support

- **Discord**: [Join our Discord community](https://discord.gg/TJJp5azK7Z)
- **Telegram**: [@power_interview_ai](https://t.me/power_interview_ai)
- **GitHub**: [PowerInterviewAI/client-app](https://github.com/PowerInterviewAI/client-app)
- **Email**: team@vectorleappulse.xyz
