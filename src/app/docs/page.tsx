import type { Metadata } from 'next';
import Link from 'next/link';

import { DocsLayout } from '@/components/docs/DocsLayout';
import { getAllDocs, getDocNavItems } from '@/lib/docs';
import { buildMetadata } from '@/lib/metadata';

export const metadata: Metadata = buildMetadata({
  title: 'Documentation',
  description: 'Power Interview AI documentation and usage guides.',
  path: '/docs',
});

export default function DocsIndexPage() {
  const list = getAllDocs();
  const navItems = getDocNavItems();

  return (
    <DocsLayout docs={navItems}>
      <main className="mx-auto max-w-6xl p-6">
        <h1 className="mb-4 text-3xl font-bold">Documentation</h1>
        <p className="mb-6">
          A quick overview of guides and reference material - click any card to read more.
        </p>

        <div className="marker:none grid gap-4 sm:grid-cols-2">
          {list.map((doc) => (
            <div key={doc.slug}>
              <Link
                href={`/docs/${doc.slug}`}
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
            </div>
          ))}
        </div>
      </main>
    </DocsLayout>
  );
}
