import React from 'react';

import ReactMarkdown from 'react-markdown';
import { useParams } from 'react-router-dom';
import remarkGfm from 'remark-gfm';

import Seo from '@/components/Seo';
import DocsLayout from '@/layouts/DocsLayout';

// Dark-mode-aware table components
const mdComponents = {
  table: ({ children }: React.HTMLAttributes<HTMLTableElement>) => (
    <div className="my-4 w-full overflow-x-auto">
      <table className="w-full border-collapse text-sm">{children}</table>
    </div>
  ),
  thead: ({ children }: React.HTMLAttributes<HTMLTableSectionElement>) => (
    <thead className="bg-muted text-foreground">{children}</thead>
  ),
  tbody: ({ children }: React.HTMLAttributes<HTMLTableSectionElement>) => (
    <tbody className="divide-y divide-border">{children}</tbody>
  ),
  tr: ({ children }: React.HTMLAttributes<HTMLTableRowElement>) => (
    <tr className="even:bg-muted/40">{children}</tr>
  ),
  th: ({ children }: React.HTMLAttributes<HTMLTableCellElement>) => (
    <th className="border border-border px-3 py-2 text-left font-semibold text-foreground">
      {children}
    </th>
  ),
  td: ({ children }: React.HTMLAttributes<HTMLTableCellElement>) => (
    <td className="border border-border px-3 py-2 text-foreground">{children}</td>
  ),
  img: ({ src, alt }: React.ImgHTMLAttributes<HTMLImageElement>) =>
    src?.endsWith('.mp4') ? (
      <video
        src={src}
        title={alt}
        autoPlay
        muted
        loop
        playsInline
        className="my-4 w-full rounded-lg shadow"
      />
    ) : (
      <img src={src} alt={alt} className="my-4 w-full rounded-lg shadow" />
    ),
};

const docs = import.meta.glob('/src/content/docs/*.md', { as: 'raw', eager: true }) as Record<
  string,
  string
>;

const DocsPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  if (!slug) return null;

  const key = `/src/content/docs/${slug}.md`;
  const content = docs[key];

  if (!content) {
    return (
      <DocsLayout>
        <main className="mx-auto max-w-4xl p-6">
          <h1 className="mb-4 text-3xl font-bold">Not Found</h1>
          <p>
            No documentation found for <strong>{slug}</strong>.
          </p>
        </main>
      </DocsLayout>
    );
  }

  const title = slug.replace(/^\d+\.\s*/, '').replace(/-/g, ' ');

  return (
    <DocsLayout>
      <Seo
        title={title}
        description={`Documentation: ${title}`}
        url={`https://www.powerinterviewai.com/docs/${slug}`}
      />
      <main className="mx-auto max-w-4xl p-6">
        <article>
          <ReactMarkdown remarkPlugins={[remarkGfm]} components={mdComponents}>
            {content}
          </ReactMarkdown>
        </article>
      </main>
    </DocsLayout>
  );
};

export default DocsPage;
