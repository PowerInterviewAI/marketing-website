import React, { useState } from 'react';

import Seo from '@/components/Seo';
import {
  BenefitsSection,
  ContactSection,
  FAQSection,
  FeaturesSection,
  FooterSection,
  Header,
  HeroSection,
  LegalNoticeSection,
  PricingSection,
  WhyChooseSection,
} from '@/components/sections';
import { useTheme } from '@/hooks/useTheme';

const Home: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

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

  const longDescription =
    'Transform your interview performance with Power Interview AI - the ultimate AI-powered interview assistant featuring advanced face-swap technology for privacy, live coding challenge assistance with real-time transcription and intelligent code suggestions, smart export functionality to save your sessions, and flexible cryptocurrency payment options. Get 100 free credits to start! No credit card, PayPal, or bank account required - pay securely with crypto. Perfect for technical interviews, coding assessments, and behavioral interviews with AI-driven real-time guidance.';

  return (
    <div className="min-h-screen bg-background">
      <Seo title="Home" description={longDescription} url="https://www.powerinterviewai.com/" />
      {/* Header */}
      <Header
        theme={theme}
        mobileMenuOpen={mobileMenuOpen}
        scrollToSection={scrollToSection}
        toggleTheme={toggleTheme}
        setMobileMenuOpen={setMobileMenuOpen}
      />

      <main>
        {/* Hero Section */}
        <HeroSection scrollToSection={scrollToSection} />

        {/* Features Section */}
        <FeaturesSection />

        {/* Benefits for Job Seekers Section */}
        <BenefitsSection />

        {/* Why Choose Power Interview AI Section */}
        <WhyChooseSection />

        {/* Pricing Section */}
        <PricingSection />

        {/* FAQ Section */}
        <FAQSection
          openFaqIndex={openFaqIndex}
          setOpenFaqIndex={setOpenFaqIndex}
          scrollToSection={scrollToSection}
        />

        {/* Contact Form Section */}
        <ContactSection />

        {/* Legal Notice Section */}
        <LegalNoticeSection />
      </main>

      {/* Footer */}
      <FooterSection scrollToSection={scrollToSection} />
    </div>
  );
};

export default Home;
