import type { Metadata } from 'next';

import { HomeContent } from '@/components/HomeContent';
import { SoftwareApplicationJsonLd } from '@/components/SoftwareApplicationJsonLd';
import {
  BenefitsSection,
  ContactSection,
  FeaturesSection,
  HowItWorksSection,
  MockInterviewSection,
  PricingSection,
  TeamSection,
  TestimonialsSection,
  WhyChooseSection,
} from '@/components/sections';
import { type LocaleParams, getLocale } from '@/i18n/server';
import { buildMetadata } from '@/lib/metadata';

export const metadata: Metadata = buildMetadata({
  title: 'Power Interview AI - AI Interview Coach & Meeting Note Taker',
  absoluteTitle: true,
  description:
    'Two features, any job: a spoken AI mock interview that scores every answer, then live suggestions on the real Zoom, Meet or Teams call. 1 hour free.',
  path: '/',
});

export default async function Home(props: LocaleParams) {
  const locale = await getLocale(props);

  return (
    <>
      {/* The page that is actually about the app carries its schema. */}
      <SoftwareApplicationJsonLd />
      <HomeContent
        locale={locale}
        howItWorksSection={<HowItWorksSection locale={locale} />}
        mockInterviewSection={<MockInterviewSection locale={locale} />}
        featuresSection={<FeaturesSection locale={locale} />}
        benefitsSection={<BenefitsSection locale={locale} />}
        whyChooseSection={<WhyChooseSection locale={locale} />}
        pricingSection={<PricingSection locale={locale} />}
        testimonialsSection={<TestimonialsSection locale={locale} />}
        contactSection={<ContactSection locale={locale} />}
        teamSection={<TeamSection locale={locale} />}
      />
    </>
  );
}
