import { type ReactNode } from 'react';

import { SkipToContent } from '@/components/SkipToContent';
import { StickyDownloadBar } from '@/components/StickyDownloadBar';
import {
  CodingSection,
  FAQSection,
  FooterSection,
  Header,
  HeroSection,
  InstallPanel,
  LanguagesSection,
  PracticeSection,
  RolesSection,
} from '@/components/sections';
import type { Locale } from '@/i18n/config';

interface HomeContentProps {
  locale: Locale;
  howItWorksSection: ReactNode;
  pricingSection: ReactNode;
  testimonialsSection: ReactNode;
  contactSection: ReactNode;
}

// The order follows a visitor's questions: what is it, will it improve me, does
// it work in my language, does it fit my job, and how do developers use it.
// Cost and installation come once they want it. Long reference material lives
// on /mock-interview, /team and the docs.
export function HomeContent({
  locale,
  howItWorksSection,
  pricingSection,
  testimonialsSection,
  contactSection,
}: HomeContentProps) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SkipToContent />

      <Header />

      <main id="main" className="flex-1 scroll-mt-20">
        <HeroSection locale={locale} />
        <PracticeSection locale={locale} />
        <LanguagesSection locale={locale} />
        <RolesSection locale={locale} />
        <CodingSection locale={locale} />
        {howItWorksSection}
        {pricingSection}
        {testimonialsSection}
        <InstallPanel />
        <FAQSection locale={locale} />
        {contactSection}
      </main>

      <FooterSection />
      <StickyDownloadBar />
    </div>
  );
}

export default HomeContent;
