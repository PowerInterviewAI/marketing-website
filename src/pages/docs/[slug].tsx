import React from 'react';

import ReactMarkdown from 'react-markdown';
import { useParams } from 'react-router-dom';
import remarkGfm from 'remark-gfm';

import DocsLayout from '@/layouts/DocsLayout';

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

  const title = slug.replace(/-/g, ' ');

  return (
    <DocsLayout>
      <main className="mx-auto max-w-4xl p-6">
        <h1 className="mb-4 text-3xl font-bold">{title}</h1>
        <article className="prose max-w-none">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
        </article>
      </main>
    </DocsLayout>
  );
};

export default DocsPage;
