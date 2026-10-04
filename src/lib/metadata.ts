import type { Metadata } from 'next';

import { DEFAULT_LOCALE, LOCALES, LOCALE_META, type Locale, localizePath } from '@/i18n/config';

const SITE_NAME = 'Power Interview AI';

interface PageMetadataInput {
  title: string;
  description: string;
  /** Locale-neutral path of the page, e.g. `/pricing`. The locale prefix is added here. */
  path: string;
  locale?: Locale;
  /**
   * Use `title` verbatim instead of appending " - Power Interview AI".
   *
   * For the home page, whose title should be the brand-and-value line rather
   * than "Home - Power Interview AI" - the most valuable title on the site was
   * spending its first four characters on the word "Home".
   */
  absoluteTitle?: boolean;
  /**
   * False for a page whose body is still English under a non-default locale
   * (the legal pages and the docs). Such a page canonicalises to its English
   * URL and advertises no hreflang alternates: claiming `ru` for English text
   * is a mismatch crawlers penalise, and two indexable copies of one text
   * compete with each other.
   */
  translated?: boolean;
}

/**
 * Builds per-page title/description/canonical/OG/Twitter metadata, consistent
 * with the defaults set in the root layout (which this overrides per-route).
 *
 * Every translated page declares itself and its siblings: a self-referencing
 * canonical plus `hreflang` alternates for each locale and `x-default`, so
 * search engines serve /ru/... to Russian-language searches and / to the rest.
 *
 * Keep `description` to roughly 150-160 characters. Google truncates the
 * snippet around there, so anything past it is invisible and the sentence gets
 * cut mid-clause; several routes here used to run 260-570 characters.
 */
export function buildMetadata({
  title,
  description,
  path,
  locale = DEFAULT_LOCALE,
  absoluteTitle = false,
  translated = true,
}: PageMetadataInput): Metadata {
  const fullTitle = absoluteTitle ? title : `${title} - ${SITE_NAME}`;
  const pageLocale = translated ? locale : DEFAULT_LOCALE;
  const canonical = localizePath(pageLocale, path);

  const alternates: Metadata['alternates'] = translated
    ? {
        canonical,
        languages: {
          ...Object.fromEntries(
            LOCALES.map((alt) => [LOCALE_META[alt].htmlLang, localizePath(alt, path)])
          ),
          'x-default': localizePath(DEFAULT_LOCALE, path),
        },
      }
    : { canonical };

  return {
    title: fullTitle,
    description,
    alternates,
    openGraph: {
      type: 'website',
      siteName: SITE_NAME,
      title: fullTitle,
      description,
      url: canonical,
      locale: LOCALE_META[pageLocale].ogLocale,
      alternateLocale: translated
        ? LOCALES.filter((alt) => alt !== pageLocale).map((alt) => LOCALE_META[alt].ogLocale)
        : undefined,
      images: [
        {
          url: '/open-graph.png',
          width: 1200,
          height: 630,
          alt: SITE_NAME,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: ['/open-graph.png'],
    },
  };
}
