import React from 'react';

import { Link, useLocation } from 'react-router-dom';

const ORDER = [
  'introduction',
  'installation',
  'usage',
  'how-it-works',
  'best-practices',
  'troubleshooting',
];

const docPaths = Object.keys(import.meta.glob('/src/content/docs/*.md'));

const list = docPaths
  .map((p) => {
    const name = p.split('/').pop() || '';
    const slug = name.replace(/\.md$/, '');
    const title = slug.replace(/-/g, ' ');
    return { slug, title };
  })
  .sort((a, b) => {
    const ai = ORDER.indexOf(a.slug);
    const bi = ORDER.indexOf(b.slug);
    return (ai === -1 ? 999 : ai) - (bi === -1 ? 999 : bi);
  });

interface DocsSidebarProps {
  className?: string;
  onLinkClick?: () => void;
}

export const DocsSidebar: React.FC<DocsSidebarProps> = ({ className = '', onLinkClick }) => {
  const location = useLocation();

  return (
    <aside className={`w-64 shrink-0 border-r p-4 ${className}`}>
      <nav>
        <h4 className="mb-2 text-sm font-semibold">Documentation</h4>
        <ul className="flex flex-col gap-2">
          {list.map((d) => (
            <li key={d.slug}>
              <Link
                to={`/docs/${d.slug}`}
                onClick={onLinkClick}
                className={`block rounded px-2 py-1 text-sm capitalize transition-colors hover:bg-muted-foreground/5 ${
                  location.pathname === `/docs/${d.slug}`
                    ? 'font-semibold text-primary'
                    : 'text-muted-foreground'
                }`}
              >
                {d.title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default DocsSidebar;
