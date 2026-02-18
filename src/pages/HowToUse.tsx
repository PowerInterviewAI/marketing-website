import React, { useEffect, useState } from 'react';

import { FooterSection, Header, HowToUseSection } from '@/components/custom/sections';
import { useTheme } from '@/hooks/useTheme';

const HowToUsePage: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'How to Use - Power Interview AI';

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        'content',
        'Learn how to use Power Interview AI: setup face swap, run live transcription, use AI suggestions and download sessions.'
      );
    }

    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', 'https://www.powerinterviewai.com/how-to-use');
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
        <HowToUseSection />
      </main>
      <FooterSection />
    </div>
  );
};

export default HowToUsePage;
