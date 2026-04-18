import React, { useState } from 'react';

import Seo from '@/components/Seo';
import { FooterSection, Header, PricingSection } from '@/components/sections';
import { useTheme } from '@/hooks/useTheme';

const PricingPage: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');

  const description =
    'See Power Interview AI pricing plans and credit packs - secure crypto payments, flexible options for interview practice, mock interviews, meeting note taking, and live AI assistance.';

  return (
    <div className="min-h-screen bg-background">
      <Seo
        title="Pricing"
        description={description}
        url="https://www.powerinterviewai.com/pricing"
      />
      <Header
        theme={theme}
        mobileMenuOpen={mobileMenuOpen}
        toggleTheme={toggleTheme}
        setMobileMenuOpen={setMobileMenuOpen}
      />
      <main>
        <PricingSection />
      </main>
      <FooterSection />
    </div>
  );
};

export default PricingPage;
