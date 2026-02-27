import React from 'react';

import { Link } from 'react-router-dom';

import DocsLayout from '@/components/custom/docs/DocsLayout';

const docs = import.meta.glob('/src/docs/content/*.md', { as: 'raw', eager: true }) as Record<
  string,
  string
>;

const list = Object.keys(docs).map((p) => {
  const name = p.split('/').pop() || '';
  const slug = name.replace(/\.md$/, '');
  const title = slug.replace(/-/g, ' ');
  return { slug, title };
});

const DocsIndex: React.FC = () => {
  return (
    <DocsLayout>
      <main className="mx-auto max-w-4xl p-6">
        <h1 className="mb-4 text-3xl font-bold">Documentation</h1>
        <p className="mb-6">Welcome to the docs. Choose a page below:</p>
        <ul className="flex flex-col gap-2">
          {list.map((doc) => (
            <li key={doc.slug}>
              <Link to={`/docs/${doc.slug}`} className="text-primary underline">
                {doc.title}
              </Link>
            </li>
          ))}
        </ul>
      </main>
    </DocsLayout>
  );
};

export default DocsIndex;
