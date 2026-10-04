import type { MetadataRoute } from 'next';

import { SITEMAP_ROUTES, docPath, isEnglishOnly } from '@/config/routes';
import { DEFAULT_LOCALE, LOCALES, LOCALE_META, localizePath } from '@/i18n/config';
import { getDocLastModified, getDocSlugs } from '@/lib/docs';

const SITE_URL = 'https://www.powerinterviewai.com';

const absolute = (path: string) => (path === '/' ? SITE_URL : `${SITE_URL}${path}`);

/** hreflang map for a translated page, `x-default` pointing at the English URL. */
const languagesFor = (route: string) => ({
  ...Object.fromEntries(
    LOCALES.map((locale) => [LOCALE_META[locale].htmlLang, absolute(localizePath(locale, route))])
  ),
  'x-default': absolute(localizePath(DEFAULT_LOCALE, route)),
});

// Generated from src/config/routes.ts + the docs system's own slug list, so it
// can't drift out of sync with the actual routes the way the old
// hand-maintained public/sitemap.xml did (which still listed a /legal-notice
// URL with no corresponding page). SITEMAP_ROUTES holds only pages in their own
// right - a sitemap should never list a URL that 3xx's, which rules out the
// four legacy routes that now redirect to home-page anchors.
//
// A translated page is listed once per locale, each entry carrying the full
// hreflang set. English-only pages (see ENGLISH_ONLY_ROUTES) are listed once,
// in English: /ru/privacy is the same English text and is not a URL to promote.
export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries: MetadataRoute.Sitemap = SITEMAP_ROUTES.flatMap((route) => {
    const isHome = route === '/';
    const entry = {
      lastModified: new Date(),
      changeFrequency: isHome ? ('weekly' as const) : ('monthly' as const),
      priority: isHome ? 1 : 0.7,
    };

    if (isEnglishOnly(route)) {
      return [{ url: absolute(route), ...entry }];
    }

    return LOCALES.map((locale) => ({
      url: absolute(localizePath(locale, route)),
      ...entry,
      alternates: { languages: languagesFor(route) },
    }));
  });

  // lastModified comes off the markdown file itself rather than the clock, so
  // a doc that didn't change doesn't claim it did on every deploy.
  const docEntries: MetadataRoute.Sitemap = getDocSlugs().map((slug) => ({
    url: `${SITE_URL}${docPath(slug)}`,
    lastModified: getDocLastModified(slug),
    changeFrequency: 'monthly',
    priority: 0.5,
  }));

  return [...staticEntries, ...docEntries];
}
