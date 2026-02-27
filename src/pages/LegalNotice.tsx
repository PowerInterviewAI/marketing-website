import React, { useState } from 'react';

import Seo from '@/components/Seo';
import { FooterSection, Header, LegalNoticeSection } from '@/components/sections';
import { useTheme } from '@/hooks/useTheme';

const LegalNoticePage: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');

  const description = 'Legal notices and important information for Power Interview AI users.';

  return (
    <div className="min-h-screen bg-background">
      <Seo
        title="Legal Notice"
        description={description}
        url="https://www.powerinterviewai.com/legal-notice"
      />
      <Header
        theme={theme}
        mobileMenuOpen={mobileMenuOpen}
        toggleTheme={toggleTheme}
        setMobileMenuOpen={setMobileMenuOpen}
      />
      <main>
        <LegalNoticeSection />
      </main>
      <FooterSection />
    </div>
  );
};

export default LegalNoticePage;
