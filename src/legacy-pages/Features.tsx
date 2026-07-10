import React, { useState } from 'react';

import Seo from '@/components/Seo';
import { FeaturesSection, FooterSection, Header } from '@/components/sections';
import { useTheme } from '@/hooks/useTheme';

const FeaturesPage: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');

  const description =
    'Explore Power Interview AI features: real-time transcription, intelligent reply suggestions, mock interview practice, meeting note taker, live coding assistance, bring-your-own LLM providers, and exportable interview and meeting reports.';

  return (
    <div className="min-h-screen bg-background">
      <Seo
        title="Features"
        description={description}
        url="https://www.powerinterviewai.com/features"
      />
      <Header
        theme={theme}
        mobileMenuOpen={mobileMenuOpen}
        toggleTheme={toggleTheme}
        setMobileMenuOpen={setMobileMenuOpen}
      />
      <main>
        <FeaturesSection />
      </main>
      <FooterSection />
    </div>
  );
};

export default FeaturesPage;
