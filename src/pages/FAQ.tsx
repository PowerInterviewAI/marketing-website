import React, { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { FAQSection, FooterSection, Header } from '@/components/sections';
import { useTheme } from '@/hooks/useTheme';

const FAQPage: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');
  const navigate = useNavigate();

  const scrollToSection = (sectionId: string) => {
    if (sectionId === 'contact') {
      navigate('/contact');
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'FAQ - Power Interview AI';

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        'content',
        'Frequently asked questions about Power Interview AI — features, privacy, payments, and usage.'
      );
    }

    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', 'https://www.powerinterviewai.com/faq');
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
        <FAQSection
          scrollToSection={scrollToSection}
          openFaqIndex={openFaqIndex}
          setOpenFaqIndex={setOpenFaqIndex}
        />
      </main>
      <FooterSection />
    </div>
  );
};

export default FAQPage;
