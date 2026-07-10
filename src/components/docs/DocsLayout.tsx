'use client';

import React, { useEffect, useState } from 'react';

import Container from '@/components/Container';
import { FooterSection } from '@/components/sections/FooterSection';
import { Header } from '@/components/sections/Header';
import { useTheme } from '@/hooks/useTheme';

import { DocNavItem, DocsSidebar } from './DocsSidebar';

interface DocsLayoutProps {
  docs: DocNavItem[];
  children?: React.ReactNode;
}

export const DocsLayout: React.FC<DocsLayoutProps> = ({ docs, children }) => {
  const { theme, setTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // lock body scroll when sidebar is open on mobile
  useEffect(() => {
    document.body.style.overflow = sidebarOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [sidebarOpen]);

  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');

  return (
    <div className="flex min-h-screen flex-col">
      <Header
        theme={theme}
        mobileMenuOpen={mobileMenuOpen}
        toggleTheme={toggleTheme}
        setMobileMenuOpen={setMobileMenuOpen}
      />

      <Container>
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 py-8">
          {/* mobile toggle for docs sidebar */}
          <button
            className="mb-4 self-start rounded border px-3 py-1 text-sm font-medium md:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            Docs menu
          </button>

          <div className="flex w-full">
            {/* desktop sidebar, hidden on small screens */}
            <DocsSidebar
              docs={docs}
              className="hidden md:block"
              onLinkClick={() => setSidebarOpen(false)}
            />

            <div className="prose markdown-body w-full max-w-none">{children}</div>
          </div>
        </div>
      </Container>

      {/* overlay sidebar for mobile */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div className="w-64 bg-background p-4 shadow-lg">
            <DocsSidebar docs={docs} onLinkClick={() => setSidebarOpen(false)} />
          </div>
          <div className="flex-grow bg-black/30" onClick={() => setSidebarOpen(false)} />
        </div>
      )}

      <FooterSection />
    </div>
  );
};

export default DocsLayout;
