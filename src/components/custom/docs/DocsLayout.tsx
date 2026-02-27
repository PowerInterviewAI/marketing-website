import React, { useState } from 'react';

import Container from '@/components/custom/Container';
import { FooterSection } from '@/components/custom/sections/FooterSection';
import { Header } from '@/components/custom/sections/Header';
import { useTheme } from '@/hooks/useTheme';

import DocsSidebar from './DocsSidebar';

const DocsLayout: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const { theme, setTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
        <div className="mx-auto flex w-full max-w-6xl gap-6 py-8">
          <DocsSidebar />

          <div className="prose markdown-body w-full max-w-none">{children}</div>
        </div>
      </Container>

      <FooterSection />
    </div>
  );
};

export default DocsLayout;
