import React, { useState } from 'react';

import Seo from '@/components/Seo';
import { BenefitsSection, FooterSection, Header } from '@/components/sections';
import { useTheme } from '@/hooks/useTheme';

const BenefitsPage: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');

  const description =
    'Benefits of using Power Interview AI for interview practice, confidence building, and coding prep.';

  return (
    <div className="min-h-screen bg-background">
      <Seo
        title="Benefits"
        description={description}
        url="https://www.powerinterviewai.com/benefits"
      />
      <Header
        theme={theme}
        mobileMenuOpen={mobileMenuOpen}
        toggleTheme={toggleTheme}
        setMobileMenuOpen={setMobileMenuOpen}
      />
      <main>
        <BenefitsSection />
      </main>
      <FooterSection />
    </div>
  );
};

export default BenefitsPage;
