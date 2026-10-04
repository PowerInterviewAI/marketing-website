import type { Metadata } from 'next';

import { PageChrome } from '@/components/PageChrome';
import { FAQSection } from '@/components/sections';
import { getMessages } from '@/i18n/messages';
import { type LocaleParams, getLocale } from '@/i18n/server';
import { buildFaqPageJsonLd } from '@/lib/jsonLd';
import { buildMetadata } from '@/lib/metadata';

export async function generateMetadata(props: LocaleParams): Promise<Metadata> {
  const locale = await getLocale(props);
  const t = getMessages(locale).meta.faq;

  return buildMetadata({
    title: t.title,
    description: t.description,
    path: '/faq',
    locale,
  });
}

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
