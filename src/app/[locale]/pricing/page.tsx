import type { Metadata } from 'next';

import { PageChrome } from '@/components/PageChrome';
import { PricingSection } from '@/components/sections';
import { type LocaleParams, getLocale } from '@/i18n/server';
import { buildMetadata } from '@/lib/metadata';

export const metadata: Metadata = buildMetadata({
  title: 'Pricing',
  description:
    'Power Interview AI pricing: a 1-hour free trial, then credit packs with no subscription. Paid in coins only - no card, PayPal or bank details.',
  path: '/pricing',
});

export default async function PricingPage(props: LocaleParams) {
  const locale = await getLocale(props);

  return (
    <PageChrome>
      <PricingSection locale={locale} standalone />
    </PageChrome>
  );
}
