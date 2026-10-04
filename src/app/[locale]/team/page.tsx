import type { Metadata } from 'next';

import { PageChrome } from '@/components/PageChrome';
import { TeamSection } from '@/components/sections';
import { type LocaleParams, getLocale } from '@/i18n/server';
import { buildMetadata } from '@/lib/metadata';

export const metadata: Metadata = buildMetadata({
  title: 'Team',
  description:
    'Meet the team behind Power Interview AI - the developers building a privacy-first AI interview coach for Zoom, Google Meet and Teams.',
  path: '/team',
});

export default async function TeamPage(props: LocaleParams) {
  const locale = await getLocale(props);

  return (
    <PageChrome>
      <TeamSection locale={locale} standalone />
    </PageChrome>
  );
}
