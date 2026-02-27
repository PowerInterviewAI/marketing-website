import React, { useState } from 'react';

import Seo from '@/components/Seo';
import { FooterSection, Header, WhyChooseSection } from '@/components/sections';
import { useTheme } from '@/hooks/useTheme';

const WhyChoosePage: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');

  const description =
    'Why choose Power Interview AI — privacy-first design, face-swap, real-time assistance and high accuracy for interview practice.';

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
