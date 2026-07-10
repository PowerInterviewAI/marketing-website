'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export interface DocNavItem {
  slug: string;
  title: string;
}

interface DocsSidebarProps {
  docs: DocNavItem[];
  className?: string;
  onLinkClick?: () => void;
}

export const DocsSidebar: React.FC<DocsSidebarProps> = ({ docs, className = '', onLinkClick }) => {
  const pathname = usePathname();

  return (
    <aside className={`w-64 shrink-0 border-r p-4 ${className}`}>
      <nav>
        <h4 className="mb-2 text-sm font-semibold">Documentation</h4>
        <ul className="flex flex-col gap-2">
          {docs.map((d) => (
            <li key={d.slug}>
              <Link
                href={`/docs/${d.slug}`}
                onClick={onLinkClick}
                className={`block rounded px-2 py-1 text-sm capitalize transition-colors hover:bg-muted-foreground/5 ${
                  pathname === `/docs/${d.slug}`
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
