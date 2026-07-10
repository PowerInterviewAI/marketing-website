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
│   ├── assets/          # Static assets (images, fonts, etc.)
│   ├── components/      # Reusable React components
│   │   ├── docs/        # Docs section layout/sidebar/markdown rendering
│   │   ├── sections/    # Home page section components
│   │   └── ui/          # shadcn/ui components
│   ├── config/          # Configuration files
│   ├── content/docs/    # Markdown documentation content
│   ├── hooks/           # Custom React hooks
│   ├── lib/             # Utility libraries (cn function, metadata, docs)
│   ├── styles/          # Global styles
│   └── types/           # TypeScript type definitions
├── public/               # Public static files
└── package.json          # Project dependencies and scripts
```

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

- **Button** - Versatile button with multiple variants (default, destructive, outline, secondary, ghost, link)
- **Card** - Flexible card component for content grouping

### Adding More Components

Due to peer dependency conflicts, components are added manually:

1. Install required dependencies:

   ```bash
   pnpm add @radix-ui/[package-name]
   ```

2. Copy component code from [ui.shadcn.com](https://ui.shadcn.com/) to `src/components/ui/`

3. Export the component in `src/components/index.ts`

For detailed instructions, see [src/components/ui/README.md](src/components/ui/README.md).

### Using Components

```tsx
import { Button, Card, CardContent, CardHeader, CardTitle } from '@/components';

<Button variant="default" size="lg">
  Click me
</Button>

<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
  </CardHeader>
  <CardContent>
    Content goes here
  </CardContent>
</Card>
```

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
