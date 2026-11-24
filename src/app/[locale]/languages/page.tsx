import type { Metadata } from 'next';

import { PageChrome } from '@/components/PageChrome';
import { InstallPanel, LanguagesSection } from '@/components/sections';
import { LANGUAGE_COUNT, VOICE_LANGUAGE_COUNT } from '@/config/languages';
import { ROUTES } from '@/config/routes';
import { format } from '@/i18n/format';
import { getMessages } from '@/i18n/messages';
import { type LocaleParams, getLocale } from '@/i18n/server';
import { buildMetadata } from '@/lib/metadata';

export async function generateMetadata(props: LocaleParams): Promise<Metadata> {
  const locale = await getLocale(props);
  const t = getMessages(locale).meta.languages;

  return buildMetadata({
    title: t.title,
    description: format(t.description, { count: LANGUAGE_COUNT, voices: VOICE_LANGUAGE_COUNT }),
    path: ROUTES.languages,
    locale,
  });
}

export default async function LanguagesPage(props: LocaleParams) {
  const locale = await getLocale(props);

  return (
    <PageChrome>
      <LanguagesSection locale={locale} standalone />
      <InstallPanel />
    </PageChrome>
  );
}
