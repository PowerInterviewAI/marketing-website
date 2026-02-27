import React, { useEffect, useState } from 'react';

import { FeaturesSection, FooterSection, Header } from '@/components/sections';
import { useTheme } from '@/hooks/useTheme';

const FeaturesPage: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Features - Power Interview AI';

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        'content',
        'Explore Power Interview AI features: real-time transcription, face-swap privacy, live coding assistance, intelligent reply suggestions, and secure crypto payments.'
      );
    }

    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', 'Features - Power Interview AI');

    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription)
      ogDescription.setAttribute(
        'content',
        'Explore Power Interview AI features: real-time transcription, face-swap privacy, live coding assistance, intelligent reply suggestions, and secure crypto payments.'
      );

    const twitterTitle = document.querySelector('meta[name="twitter:title"]');
    if (twitterTitle) twitterTitle.setAttribute('content', 'Features - Power Interview AI');

    const twitterDescription = document.querySelector('meta[name="twitter:description"]');
    if (twitterDescription)
      twitterDescription.setAttribute(
        'content',
        'Explore Power Interview AI features: real-time transcription, face-swap privacy, live coding assistance, intelligent reply suggestions, and secure crypto payments.'
      );

    // set canonical for this page
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', 'https://www.powerinterviewai.com/features');
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
        <FeaturesSection />
      </main>
      <FooterSection />
    </div>
  );
};

export default FeaturesPage;
