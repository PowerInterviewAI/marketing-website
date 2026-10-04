'use client';

import React, { useEffect, useState } from 'react';

import { Menu, X } from 'lucide-react';

import Container from '@/components/Container';
import { EnglishOnlyNotice } from '@/components/EnglishOnlyNotice';
import { SkipToContent } from '@/components/SkipToContent';
import { FooterSection } from '@/components/sections/FooterSection';
import { Header } from '@/components/sections/Header';
import { useMessages } from '@/i18n/LocaleProvider';

import { DocNavItem, DocsSidebar } from './DocsSidebar';

interface DocsLayoutProps {
  docs: DocNavItem[];
  children?: React.ReactNode;
}

export const DocsLayout: React.FC<DocsLayoutProps> = ({ docs, children }) => {
  const t = useMessages().docs.sidebar;
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Lock body scroll while the mobile drawer is open, and let Escape close it -
  // tapping the shade used to be the only way out.
  useEffect(() => {
    if (!sidebarOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setSidebarOpen(false);
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [sidebarOpen]);

  return (
    <div className="flex min-h-screen flex-col">
      <SkipToContent />
      <Header />

      <Container>
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 py-8">
          {/* mobile toggle for docs sidebar */}
          <button
            className="mb-4 inline-flex items-center gap-2 self-start rounded-md border px-3 py-1.5 text-sm font-medium transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring md:hidden"
            onClick={() => setSidebarOpen(true)}
            aria-expanded={sidebarOpen}
          >
            <Menu className="size-4" aria-hidden="true" />
            {t.menu}
          </button>

          <div className="flex w-full gap-2">
            {/* desktop sidebar, hidden on small screens */}
            <DocsSidebar
              docs={docs}
              className="sticky top-20 hidden max-h-[calc(100vh-6rem)] self-start overflow-y-auto md:block"
              onLinkClick={() => setSidebarOpen(false)}
            />

            {/* Deliberately NOT .markdown-body - that class carries
                github-markdown-css, which restyles every ol/ul/a underneath
                it. The docs chrome (breadcrumb, pager, index cards) lives
                here; only the rendered markdown opts into it. */}
            <div id="main" className="w-full min-w-0">
              <EnglishOnlyNotice className="mx-2 mb-6 sm:mx-4" />
              {children}
            </div>
          </div>
        </div>
      </Container>

      {/* overlay sidebar for mobile */}
      {sidebarOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={t.menuDialog}
          className="fixed inset-0 z-50 flex md:hidden"
        >
          <div className="relative w-72 overflow-y-auto bg-background p-4 shadow-lg">
            <button
              onClick={() => setSidebarOpen(false)}
              aria-label={t.close}
              autoFocus
              className="absolute right-3 top-3 rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <X className="size-4" />
            </button>
            <DocsSidebar
              docs={docs}
              className="w-full border-r-0"
              onLinkClick={() => setSidebarOpen(false)}
            />
          </div>
          <div
            className="flex-grow bg-black/50"
            aria-hidden="true"
            onClick={() => setSidebarOpen(false)}
          />
        </div>
      )}

      <FooterSection />
    </div>
  );
};

export default DocsLayout;
