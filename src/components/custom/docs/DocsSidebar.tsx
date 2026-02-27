import React from 'react';

import { Link, useLocation } from 'react-router-dom';

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

export const DocsSidebar: React.FC = () => {
  const location = useLocation();

  return (
    <aside className="w-64 shrink-0 border-r p-4">
      <nav>
        <h4 className="mb-2 text-sm font-semibold">Docs</h4>
        <ul className="flex flex-col gap-2">
          {list.map((d) => (
            <li key={d.slug}>
              <Link
                to={`/docs/${d.slug}`}
                className={`block rounded px-2 py-1 text-sm transition-colors hover:bg-muted-foreground/5 ${
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
