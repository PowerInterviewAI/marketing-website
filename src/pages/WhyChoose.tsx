import React, { useEffect, useState } from 'react';

import { FooterSection, Header, WhyChooseSection } from '@/components/sections';
import { useTheme } from '@/hooks/useTheme';

const WhyChoosePage: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Why Choose Power Interview AI';

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        'content',
        'Why choose Power Interview AI — privacy-first design, face-swap, real-time assistance and high accuracy for interview practice.'
      );
    }

    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', 'https://www.powerinterviewai.com/why-choose');
  }, []);

  return (
    <div className="min-h-screen bg-background">
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
