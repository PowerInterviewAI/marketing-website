import type { Metadata } from 'next';

import { PageChrome } from '@/components/PageChrome';
import { HowItWorksSection, InstallPanel } from '@/components/sections';
import { type LocaleParams, getLocale } from '@/i18n/server';
import { buildMetadata } from '@/lib/metadata';

export const metadata: Metadata = buildMetadata({
  title: 'How It Works',
  description:
    'Install the desktop app, add your CV and the job description, rehearse against the AI interviewer, then join the real Zoom, Meet or Teams call.',
  path: '/how-it-works',
});

export default async function HowItWorksPage(props: LocaleParams) {
  const locale = await getLocale(props);

  return (
    <PageChrome>
      <HowItWorksSection locale={locale} standalone />
      <InstallPanel />
    </PageChrome>
  );
}
