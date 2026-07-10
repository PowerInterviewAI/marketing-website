'use client';

import { useState } from 'react';

import {
  BenefitsSection,
  CoFoundersSection,
  ContactSection,
  FAQSection,
  FeaturesSection,
  FooterSection,
  Header,
  HeroSection,
  PricingSection,
  WhyChooseSection,
} from '@/components/sections';
import { useTheme } from '@/hooks/useTheme';

export function HomeContent() {
  const { theme, setTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header
        theme={theme}
        mobileMenuOpen={mobileMenuOpen}
        scrollToSection={scrollToSection}
        toggleTheme={toggleTheme}
        setMobileMenuOpen={setMobileMenuOpen}
      />

      <main>
        <HeroSection scrollToSection={scrollToSection} />
        <FeaturesSection />
        <BenefitsSection />
        <WhyChooseSection />
        <PricingSection />
        <FAQSection scrollToSection={scrollToSection} />
        <ContactSection />
        <CoFoundersSection />
      </main>

      <FooterSection scrollToSection={scrollToSection} />
    </div>
  );
}

export default HomeContent;
