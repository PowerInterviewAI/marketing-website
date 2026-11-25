import type { MetadataRoute } from 'next';

import { SITEMAP_ROUTES, docPath, isEnglishOnly } from '@/config/routes';
import { absoluteUrl as absolute } from '@/config/site';
import { DEFAULT_LOCALE, LOCALES, LOCALE_META, localizePath } from '@/i18n/config';
import { getDocLastModified, getDocSlugs } from '@/lib/docs';

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
    // No lastModified: these pages are assembled from components and the
    // message catalogue, so there is no single file whose date is the page's.
    // `new Date()` stamped every URL as changed on every deploy, which is the
    // kind of lastmod crawlers learn to ignore - for the docs below too.
    const entry = {
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
    url: absolute(docPath(slug)),
    lastModified: getDocLastModified(slug),
    changeFrequency: 'monthly',
    priority: 0.5,
  }));

  return [...staticEntries, ...docEntries];
}
