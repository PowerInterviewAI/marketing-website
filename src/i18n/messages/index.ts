import type { Locale } from '@/i18n/config';

import { en } from './en';
import { ru } from './ru';

/** Shape of the catalogue. English is the source; every other locale must match it. */
export type Messages = typeof en;

const MESSAGES: Record<Locale, Messages> = { en, ru };

/** Full catalogue for a locale. Server Components only - see getClientMessages. */
export const getMessages = (locale: Locale): Messages => MESSAGES[locale];

/** The slice Client Components render, passed through <LocaleProvider>. */
export type ClientMessages = Pick<Messages, 'chrome'>;

export const getClientMessages = (locale: Locale): ClientMessages => ({
  chrome: MESSAGES[locale].chrome,
});
