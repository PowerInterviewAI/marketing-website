import { type ReactNode } from 'react';

import { SkipToContent } from '@/components/SkipToContent';
import { StickyDownloadBar } from '@/components/StickyDownloadBar';
import {
  AppShowcaseSection,
  CodingSection,
  FAQSection,
  FooterSection,
  Header,
  HeroSection,
  InstallPanel,
  LanguageMarquee,
  LanguagesSection,
  LiveSection,
  ModesSection,
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

// The order follows a visitor's questions. What is it: two modes of equal
// weight, shown side by side, then one deep dive each - the mock interview
// (before the call) and the live assistant (during it), with the coding helper
// as part of live. Then does it work in my language and for my job, how do I
// start, what does it cost. Long reference material lives on /mock-interview,
// /team and the docs.
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
        <ModesSection locale={locale} />
        <PracticeSection locale={locale} />
        <LiveSection locale={locale} />
        <CodingSection locale={locale} />
        <LanguageMarquee />
        <LanguagesSection locale={locale} />
        <RolesSection locale={locale} />
        <AppShowcaseSection locale={locale} />
        {howItWorksSection}
        {pricingSection}
        {testimonialsSection}
        <FAQSection locale={locale} />
        <InstallPanel />
        {contactSection}
      </main>

      <FooterSection showCta={false} />
      <StickyDownloadBar />
    </div>
  );
}

export default HomeContent;
