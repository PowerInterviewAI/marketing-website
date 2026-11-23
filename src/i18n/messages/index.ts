import type { Locale } from '@/i18n/config';

import { de } from './de';
import { en } from './en';
import { es } from './es';
import { fr } from './fr';
import { ja } from './ja';
import { ko } from './ko';
import { pt } from './pt';
import { ru } from './ru';
import { zh } from './zh';

/** Shape of the catalogue. English is the source; every other locale must match it. */
export type Messages = typeof en;

const MESSAGES: Record<Locale, Messages> = { en, de, es, fr, pt, ru, ja, ko, zh };

/** Full catalogue for a locale. Server Components only - see getClientMessages. */
export const getMessages = (locale: Locale): Messages => MESSAGES[locale];

/** The slice Client Components render, passed through <LocaleProvider>. */
export type ClientMessages = Pick<Messages, 'chrome' | 'common' | 'docs' | 'hero'>;

export const getClientMessages = (locale: Locale): ClientMessages => ({
  chrome: MESSAGES[locale].chrome,
  common: MESSAGES[locale].common,
  docs: MESSAGES[locale].docs,
  hero: MESSAGES[locale].hero,
});
