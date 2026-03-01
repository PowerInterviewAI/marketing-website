import React, { useMemo } from 'react';

import { Link } from 'react-router-dom';

import Seo from '@/components/Seo';
import DocsLayout from '@/layouts/DocsLayout';

const docs = import.meta.glob('/src/content/docs/*.md', { as: 'raw', eager: true }) as Record<
  string,
  string
>;

type DocItem = { slug: string; title: string; excerpt: string };

const buildDocsList = (): DocItem[] => {
  return Object.entries(docs).map(([p, raw]) => {
    const name = p.split('/').pop() || '';
    const slug = name.replace(/\.md$/, '');

    // Try to extract H1 title from markdown, fallback to filename
    const titleMatch = raw.match(/^#\s+(.+)$/m);
    const title = titleMatch ? titleMatch[1].trim() : slug.replace(/-/g, ' ');

    // Extract first meaningful paragraph as excerpt (skip headings, images, tables, separators)
    const blocks = raw
      .split(/\r?\n\r?\n/)
      .map((b) => b.replace(/\r?\n/g, ' ').trim())
      .filter(
        (b) => b && !/^#{1,6}\s/.test(b) && !/^!\[/.test(b) && !/^\|/.test(b) && !/^---/.test(b)
      );

    // Prefer the block after the H1 if present
    let excerpt;
    if (titleMatch) {
      const idx = blocks.findIndex((b) => b.includes(title));
      excerpt = blocks[idx + 1] || blocks[0] || '';
    } else {
      excerpt = blocks[0] || '';
    }

    // Truncate excerpt to ~220 chars
    if (excerpt.length > 220) excerpt = `${excerpt.slice(0, 217).trim()}...`;

    return { slug, title, excerpt };
  });
};

const DocsIndex: React.FC = () => {
  const list = useMemo(() => buildDocsList(), []);

  return (
    <DocsLayout>
      <Seo
        title="Documentation"
        description="Power Interview AI documentation and usage guides."
        url="https://www.powerinterviewai.com/docs"
      />
      <main className="mx-auto max-w-6xl p-6">
        <h1 className="mb-4 text-3xl font-bold">Documentation</h1>
        <p className="mb-6">
          A quick overview of guides and reference material — click any card to read more.
        </p>

        <ul className="grid gap-4 sm:grid-cols-2">
          {list.map((doc) => (
            <li key={doc.slug}>
              <Link
                to={`/docs/${doc.slug}`}
                className="block h-full rounded-lg border bg-card p-4 transition-shadow hover:shadow-lg"
              >
                <h3 className="text-lg font-semibold capitalize">{doc.title}</h3>
                {doc.excerpt ? (
                  <p className="mt-2 text-sm text-muted-foreground">{doc.excerpt}</p>
                ) : (
                  <p className="mt-2 text-sm italic text-muted-foreground">No preview available.</p>
                )}
                <span className="mt-3 inline-block text-sm text-primary">Read more →</span>
              </Link>
            </li>
          ))}
        </ul>
      </main>
    </DocsLayout>
  );
};

export default DocsIndex;
