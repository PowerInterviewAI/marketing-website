import type { Metadata } from 'next';

import { PageChrome } from '@/components/PageChrome';
import { InstallPanel, MockInterviewSection } from '@/components/sections';
import { getMessages } from '@/i18n/messages';
import { type LocaleParams, getLocale } from '@/i18n/server';
import { buildMetadata } from '@/lib/metadata';

export async function generateMetadata(props: LocaleParams): Promise<Metadata> {
  const locale = await getLocale(props);
  const t = getMessages(locale).meta.mockInterview;

  return buildMetadata({
    title: t.title,
    description: t.description,
    path: '/mock-interview',
    locale,
  });
}

export default async function MockInterviewPage(props: LocaleParams) {
  const locale = await getLocale(props);

  return (
    <PageChrome>
      <MockInterviewSection locale={locale} standalone />
      <InstallPanel />
    </PageChrome>
  );
}
