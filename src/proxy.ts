import { type NextRequest, NextResponse } from 'next/server';

import { DEFAULT_LOCALE, LOCALES } from '@/i18n/config';

/**
 * Locale routing. Every page lives under `src/app/[locale]`, but the default
 * locale is never shown in the URL:
 *
 *   /pricing     -> served from /en/pricing (rewrite, URL unchanged)
 *   /ru/pricing  -> served as is
 *   /en/pricing  -> 308 to /pricing, so there is one URL per page
 *
 * There is deliberately no Accept-Language redirect: the same URL must return
 * the same page to a crawler and to a person, and the header's language switcher
 * is the way to choose.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === `/${DEFAULT_LOCALE}` || pathname.startsWith(`/${DEFAULT_LOCALE}/`)) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.slice(DEFAULT_LOCALE.length + 1) || '/';
    return NextResponse.redirect(url, 308);
  }

  const hasLocale = LOCALES.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  );
  if (hasLocale) return NextResponse.next();

  const url = request.nextUrl.clone();
  url.pathname = `/${DEFAULT_LOCALE}${pathname === '/' ? '' : pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  // Everything except Next internals and files with an extension (images,
  // manifest.json, llms.txt, sitemap.xml, robots.txt, favicon.ico ...).
  matcher: ['/((?!_next|.*\\..*).*)'],
};
