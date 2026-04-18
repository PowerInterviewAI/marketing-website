import React, { useState } from 'react';

import Seo from '@/components/Seo';
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
    'Transform your interview performance with Power Interview AI - a privacy-first AI interview assistant and meeting note taker with real-time transcription, intelligent reply and code suggestions, and exportable session reports. Use your own LLM provider (OpenAI, Anthropic, Google, etc.) and get started instantly with included models based on your plan. Perfect for technical interviews, mock interviews, coding assessments, behavioral interviews, and meeting note taking.';

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

        {/* Co-founders Section */}
        <CoFoundersSection />
      </main>

      {/* Footer */}
      <FooterSection scrollToSection={scrollToSection} />
    </div>
  );
};

export default Home;
