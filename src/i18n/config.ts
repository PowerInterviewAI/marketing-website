/**
 * Locale configuration - the single source of truth for which languages the
 * site is published in and how a path is turned into a localized URL.
 *
 * English is the default and lives at the unprefixed URLs (`/pricing`);
 * every other locale is prefixed (`/ru/pricing`). The proxy in src/proxy.ts
 * rewrites unprefixed requests onto the hidden `/en` segment, so `[locale]` is
 * always present inside the app.
 *
 * Keep this file free of imports: src/proxy.ts runs outside the app bundle.
 */

/**
 * English first, as the default, then alphabetical by endonym - the same order as the app's
 * interface-language picker, and the conventional one for a language switcher.
 */
export const LOCALES = ['en', 'de', 'es', 'fr', 'pt', 'ru', 'ja', 'ko', 'zh'] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = 'en';

export const isLocale = (value: string): value is Locale =>
  (LOCALES as readonly string[]).includes(value);

/**
 * Autonym shown in the language switcher, `lang` of the switcher link and OG locale.
 *
 * The URL segment is the bare code, but `htmlLang` (also the hreflang) names the variant the copy
 * is actually written in: Portuguese is Brazilian, and Chinese is Simplified for Mainland China.
 * The tag is also what picks a CJK fallback font - a bare `zh` can draw Han characters with
 * Japanese glyph shapes.
 *
 * `space` is what separates the clauses of a sentence the site assembles from
 * parts (a bold phrase between two plain ones): a space everywhere except in
 * Japanese and Chinese, which do not put one between words.
 */
export const LOCALE_META: Record<
  Locale,
  { label: string; htmlLang: string; ogLocale: string; space: string }
> = {
  en: { label: 'English', htmlLang: 'en', ogLocale: 'en_US', space: ' ' },
  de: { label: 'Deutsch', htmlLang: 'de', ogLocale: 'de_DE', space: ' ' },
  es: { label: 'Español', htmlLang: 'es', ogLocale: 'es_ES', space: ' ' },
  fr: { label: 'Français', htmlLang: 'fr', ogLocale: 'fr_FR', space: ' ' },
  pt: { label: 'Português', htmlLang: 'pt-BR', ogLocale: 'pt_BR', space: ' ' },
  ru: { label: 'Русский', htmlLang: 'ru', ogLocale: 'ru_RU', space: ' ' },
  ja: { label: '日本語', htmlLang: 'ja', ogLocale: 'ja_JP', space: '' },
  ko: { label: '한국어', htmlLang: 'ko', ogLocale: 'ko_KR', space: ' ' },
  zh: { label: '中文', htmlLang: 'zh-CN', ogLocale: 'zh_CN', space: '' },
};

/**
 * Prefixes a site path (`/pricing`, `/#install`, `/docs/hotkeys`) with the
 * locale. The default locale stays unprefixed. Hash and query survive.
 */
export function localizePath(locale: Locale, path: string): string {
  if (locale === DEFAULT_LOCALE) return path;
  if (path === '/') return `/${locale}`;
  if (path.startsWith('/#') || path.startsWith('/?')) return `/${locale}${path.slice(1)}`;
  return `/${locale}${path}`;
}

/** Removes a leading locale segment: `/ru/pricing` -> `/pricing`, `/ru` -> `/`. */
export function stripLocale(pathname: string): string {
  for (const locale of LOCALES) {
    if (pathname === `/${locale}`) return '/';
    if (pathname.startsWith(`/${locale}/`)) return pathname.slice(locale.length + 1);
  }
  return pathname;
}
