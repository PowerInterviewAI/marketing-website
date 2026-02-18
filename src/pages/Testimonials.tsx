import React, { useEffect, useState } from 'react';

import { FooterSection, Header, TestimonialsSection } from '@/components/custom/sections';
import { useTheme } from '@/hooks/useTheme';

const TestimonialsPage: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Testimonials - Power Interview AI';

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        'content',
        'Read user testimonials and success stories from Power Interview AI users who improved their interview outcomes.'
      );
    }

    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', 'https://www.powerinterviewai.com/testimonials');
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
        <TestimonialsSection />
      </main>
      <FooterSection />
    </div>
  );
};

export default TestimonialsPage;
