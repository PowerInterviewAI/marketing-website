import React, { useEffect, useState } from 'react';

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

  // Reset meta tags to default when returning to home
  useEffect(() => {
    document.title =
      'Power Interview AI - Privacy-First AI Interview Assistant | Ace Your Interviews';

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        'content',
        'Transform your interview performance with Power Interview AI - the ultimate AI-powered interview assistant featuring advanced face-swap technology for privacy, live coding challenge assistance with real-time transcription and intelligent code suggestions, smart export functionality to save your sessions, and flexible cryptocurrency payment options. Get 30 free credits to start! No credit card, PayPal, or bank account required - pay securely with crypto. Perfect for technical interviews, coding assessments, and behavioral interviews with AI-driven real-time guidance.'
      );
    }

    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', 'Power Interview AI - Privacy-First AI Interview Assistant');
    }

    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) {
      ogDescription.setAttribute(
        'content',
        'Transform your interview performance with Power Interview AI - the ultimate AI-powered interview assistant featuring advanced face-swap technology for privacy, live coding challenge assistance with real-time transcription and intelligent code suggestions, smart export functionality to save your sessions, and flexible cryptocurrency payment options. Get 30 free credits to start! No credit card, PayPal, or bank account required - pay securely with crypto. Perfect for technical interviews, coding assessments, and behavioral interviews with AI-driven real-time guidance.'
      );
    }

    const twitterTitle = document.querySelector('meta[name="twitter:title"]');
    if (twitterTitle) {
      twitterTitle.setAttribute(
        'content',
        'Power Interview AI - Privacy-First AI Interview Assistant'
      );
    }

    const twitterDescription = document.querySelector('meta[name="twitter:description"]');
    if (twitterDescription) {
      twitterDescription.setAttribute(
        'content',
        'Transform your interview performance with Power Interview AI - the ultimate AI-powered interview assistant featuring advanced face-swap technology for privacy, live coding challenge assistance with real-time transcription and intelligent code suggestions, smart export functionality to save your sessions, and flexible cryptocurrency payment options. Get 30 free credits to start! No credit card, PayPal, or bank account required - pay securely with crypto. Perfect for technical interviews, coding assessments, and behavioral interviews with AI-driven real-time guidance.'
      );
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">
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
