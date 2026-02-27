import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import Seo from '@/components/Seo';
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

  const description =
    'Frequently asked questions about Power Interview AI — features, privacy, payments, and usage.';

  return (
    <div className="min-h-screen bg-background">
      <Seo title="FAQ" description={description} url="https://www.powerinterviewai.com/faq" />
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
