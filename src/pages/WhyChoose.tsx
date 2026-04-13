import React, { useState } from 'react';

import Seo from '@/components/Seo';
import { FooterSection, Header, WhyChooseSection } from '@/components/sections';
import { useTheme } from '@/hooks/useTheme';

const WhyChoosePage: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');

  const description =
    'Why choose Power Interview AI - privacy-first design, real-time assistance, bring-your-own LLM providers, and exportable interview reports.';

  return (
    <div className="min-h-screen bg-background">
      <Seo
        title="Why Choose"
        description={description}
        url="https://www.powerinterviewai.com/why-choose"
      />
      <Header
        theme={theme}
        mobileMenuOpen={mobileMenuOpen}
        toggleTheme={toggleTheme}
        setMobileMenuOpen={setMobileMenuOpen}
      />
      <main>
        <WhyChooseSection />
      </main>
      <FooterSection />
    </div>
  );
};

export default WhyChoosePage;
