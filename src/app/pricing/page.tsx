import type { Metadata } from 'next';

import { PageChrome } from '@/components/PageChrome';
import { PricingSection } from '@/components/sections';
import { buildMetadata } from '@/lib/metadata';

export const metadata: Metadata = buildMetadata({
  title: 'Pricing',
  description:
    'See Power Interview AI pricing plans and credit packs - secure crypto payments, flexible options for interview practice, mock interviews, meeting note taking, and live AI assistance.',
  path: '/pricing',
});

export default function PricingPage() {
  return (
    <PageChrome>
      <PricingSection />
    </PageChrome>
  );
}
