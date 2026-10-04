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
import { getMessages } from '@/i18n/messages';
import { type LocaleParams, getLocale } from '@/i18n/server';
import { buildMetadata } from '@/lib/metadata';

export async function generateMetadata(props: LocaleParams): Promise<Metadata> {
  const locale = await getLocale(props);
  const t = getMessages(locale).meta.home;

  return buildMetadata({
    title: t.title,
    description: t.description,
    path: '/',
    locale,
    absoluteTitle: true,
  });
}

export default async function Home(props: LocaleParams) {
  const locale = await getLocale(props);

  return (
    <>
      {/* The page that is actually about the app carries its schema. */}
      <SoftwareApplicationJsonLd locale={locale} />
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
