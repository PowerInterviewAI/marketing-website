import React from 'react';

import ReactMarkdown from 'react-markdown';
import { useParams } from 'react-router-dom';
import remarkGfm from 'remark-gfm';

import Seo from '@/components/Seo';
import DocsLayout from '@/layouts/DocsLayout';

// Render .mp4 links in markdown as autoplay muted looping videos
const MarkdownImage: React.FC<React.ImgHTMLAttributes<HTMLImageElement>> = ({ src, alt }) => {
  if (src?.endsWith('.mp4')) {
    return (
      <video
        src={src}
        title={alt}
        autoPlay
        muted
        loop
        playsInline
        className="my-4 w-full rounded-lg shadow"
      />
    );
  }
  return <img src={src} alt={alt} className="my-4 w-full rounded-lg shadow" />;
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

  const title = slug.replace(/-/g, ' ');

  return (
    <DocsLayout>
      <Seo
        title={title}
        description={`Documentation: ${title}`}
        url={`https://www.powerinterviewai.com/docs/${slug}`}
      />
      <main className="mx-auto max-w-4xl p-6">
        <article className="prose max-w-none">
          <ReactMarkdown remarkPlugins={[remarkGfm]} components={{ img: MarkdownImage }}>
            {content}
          </ReactMarkdown>
        </article>
      </main>
    </DocsLayout>
  );
};

export default DocsPage;
