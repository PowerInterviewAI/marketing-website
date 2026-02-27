import React, { useState } from 'react';

import Seo from '@/components/Seo';
import { FeaturesSection, FooterSection, Header } from '@/components/sections';
import { useTheme } from '@/hooks/useTheme';

const FeaturesPage: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');

  const description =
    'Explore Power Interview AI features: real-time transcription, face-swap privacy, live coding assistance, intelligent reply suggestions, and secure crypto payments.';

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
