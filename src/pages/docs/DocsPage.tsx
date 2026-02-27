import React from 'react';

import ReactMarkdown from 'react-markdown';
import { Navigate, useParams } from 'react-router-dom';
import remarkGfm from 'remark-gfm';

const docs = import.meta.glob('/src/content/docs/*.md', { as: 'raw', eager: true }) as Record<
  string,
  string
>;

const DocsPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  if (!slug) return <Navigate to="/docs" replace />;

  const key = `/src/content/docs/${slug}.md`;
  const content = docs[key];

  if (!content) {
    return (
      <main className="mx-auto max-w-4xl p-6">
        <h1 className="mb-4 text-3xl font-bold">Not Found</h1>
        <p>
          No documentation found for <strong>{slug}</strong>.
        </p>
      </main>
    );
  }

  const title = slug.replace(/-/g, ' ');

  return (
    <main className="mx-auto max-w-4xl p-6">
      <h1 className="mb-4 text-3xl font-bold">{title}</h1>
      <article className="prose max-w-none">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
      </article>
    </main>
  );
};

export default DocsPage;
