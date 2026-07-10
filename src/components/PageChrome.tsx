'use client';

import React, { useState } from 'react';

import { FooterSection, Header } from '@/components/sections';
import { useTheme } from '@/hooks/useTheme';

interface PageChromeProps {
  children: React.ReactNode;
  scrollToSection?: (sectionId: string) => void;
}

// Shared Header/Footer + theme/mobile-menu state for every page except Home
// (which needs its own in-page scrollToSection wiring) and the legal pages
// (which render no Header/Footer at all).
export const PageChrome: React.FC<PageChromeProps> = ({ children, scrollToSection }) => {
  const { theme, setTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');

  return (
    <div className="min-h-screen bg-background">
      <Header
        theme={theme}
        mobileMenuOpen={mobileMenuOpen}
        scrollToSection={scrollToSection}
        toggleTheme={toggleTheme}
        setMobileMenuOpen={setMobileMenuOpen}
      />
      <main>{children}</main>
      <FooterSection scrollToSection={scrollToSection} />
    </div>
  );
};

export default PageChrome;
