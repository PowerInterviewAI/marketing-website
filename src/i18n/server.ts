import { notFound } from 'next/navigation';

import { type Locale, isLocale } from '@/i18n/config';

/** Route params every page under src/app/[locale] receives. */
export type LocaleParams = { params: Promise<{ locale: string }> };

/** Resolves the `[locale]` segment to a known locale, or 404s. */
export async function getLocale({ params }: LocaleParams): Promise<Locale> {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return locale;
}
