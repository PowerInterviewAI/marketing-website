import type { Metadata } from 'next';

import { PageChrome } from '@/components/PageChrome';
import { FAQSection } from '@/components/sections';
import { type LocaleParams, getLocale } from '@/i18n/server';
import { buildFaqPageJsonLd } from '@/lib/jsonLd';
import { buildMetadata } from '@/lib/metadata';

export const metadata: Metadata = buildMetadata({
  title: 'FAQ',
  description:
    'Answers on how Power Interview AI works: platform support, stealth mode and screen share, privacy and local data, mock interviews, billing and credits.',
  path: '/faq',
});

export default async function FAQPage(props: LocaleParams) {
  const locale = await getLocale(props);

  return (
    <PageChrome>
      {/* The only page rendering the full question list, so the only page that
          should claim FAQPage. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildFaqPageJsonLd(locale)) }}
      />
      <FAQSection locale={locale} standalone />
    </PageChrome>
  );
}
