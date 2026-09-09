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
import { buildMetadata } from '@/lib/metadata';

export const metadata: Metadata = buildMetadata({
  title: 'Power Interview AI - AI Interview Coach & Meeting Note Taker',
  absoluteTitle: true,
  description:
    'Two features, any job: a spoken AI mock interview that scores every answer, then live suggestions on the real Zoom, Meet or Teams call. 1 hour free.',
  path: '/',
});

export default function Home() {
  return (
    <>
      {/* The page that is actually about the app carries its schema. */}
      <SoftwareApplicationJsonLd />
      <HomeContent
        howItWorksSection={<HowItWorksSection />}
        mockInterviewSection={<MockInterviewSection />}
        featuresSection={<FeaturesSection />}
        benefitsSection={<BenefitsSection />}
        whyChooseSection={<WhyChooseSection />}
        pricingSection={<PricingSection />}
        testimonialsSection={<TestimonialsSection />}
        contactSection={<ContactSection />}
        teamSection={<TeamSection />}
      />
    </>
  );
}
