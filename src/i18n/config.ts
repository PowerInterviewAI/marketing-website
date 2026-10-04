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

export const LOCALES = ['en', 'ru'] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = 'en';

export const isLocale = (value: string): value is Locale =>
  (LOCALES as readonly string[]).includes(value);

/** Autonym shown in the language switcher, `lang` of the switcher link and OG locale. */
export const LOCALE_META: Record<Locale, { label: string; htmlLang: string; ogLocale: string }> = {
  en: { label: 'English', htmlLang: 'en', ogLocale: 'en_US' },
  ru: { label: 'Русский', htmlLang: 'ru', ogLocale: 'ru_RU' },
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

/** The locale a pathname is served in. */
export function localeFromPathname(pathname: string): Locale {
  const first = pathname.split('/')[1] ?? '';
  return isLocale(first) && first !== DEFAULT_LOCALE ? first : DEFAULT_LOCALE;
}
