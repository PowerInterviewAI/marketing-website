import type { Locale } from '@/i18n/config';
import { getMessages } from '@/i18n/messages';
import type { FaqCategory, FaqEntry } from '@/i18n/messages/en/faq';

/** Display order of the category groups. Labels are translated in `faq.categories`. */
export const FAQ_CATEGORIES: readonly FaqCategory[] = [
  'gettingStarted',
  'product',
  'privacy',
  'billing',
];

export type FaqItem = FaqEntry;

/**
 * The site's FAQ for a locale.
 *
 * The text lives in src/i18n/messages/<locale>/faq.ts. Read by both FAQSection
 * and the FAQPage JSON-LD block (buildFaqPageJsonLd in src/lib/jsonLd.ts),
 * which used to hold separate hand-maintained copies of the same answers and
 * had drifted apart in wording - meaning the rich result Google indexed did
 * not match the page.
 *
 * Answers are plain strings, not JSX, because the JSON-LD consumer needs text.
 */
export const getFaqItems = (locale: Locale): FaqItem[] => getMessages(locale).faq.items;
