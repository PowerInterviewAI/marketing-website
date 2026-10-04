import type { Metadata } from 'next';

import { PageChrome } from '@/components/PageChrome';
import { InstallPanel, MockInterviewSection } from '@/components/sections';
import { type LocaleParams, getLocale } from '@/i18n/server';
import { buildMetadata } from '@/lib/metadata';

export const metadata: Metadata = buildMetadata({
  title: 'Mock Interview Practice',
  description:
    'Practice out loud against an AI interviewer that speaks its questions, presses on thin answers and returns a scored report you can export.',
  path: '/mock-interview',
});

export default async function MockInterviewPage(props: LocaleParams) {
  const locale = await getLocale(props);

  return (
    <PageChrome>
      <MockInterviewSection locale={locale} standalone />
      <InstallPanel />
    </PageChrome>
  );
}
