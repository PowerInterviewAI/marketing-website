import type { Metadata } from 'next';

import { PageChrome } from '@/components/PageChrome';
import { HowItWorksSection, InstallPanel } from '@/components/sections';
import { getMessages } from '@/i18n/messages';
import { type LocaleParams, getLocale } from '@/i18n/server';
import { buildMetadata } from '@/lib/metadata';

export async function generateMetadata(props: LocaleParams): Promise<Metadata> {
  const locale = await getLocale(props);
  const t = getMessages(locale).meta.howItWorks;

  return buildMetadata({
    title: t.title,
    description: t.description,
    path: '/how-it-works',
    locale,
  });
}

export default async function HowItWorksPage(props: LocaleParams) {
  const locale = await getLocale(props);

  return (
    <PageChrome>
      <HowItWorksSection locale={locale} standalone />
      <InstallPanel />
    </PageChrome>
  );
}
