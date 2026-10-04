'use client';

import React, { useEffect, useState } from 'react';

import { usePathname } from 'next/navigation';

import { useLocale, useMessages } from '@/i18n/LocaleProvider';
import { LOCALES, LOCALE_META, localizePath, stripLocale } from '@/i18n/config';
import { cn } from '@/lib/utils';

/**
 * EN | RU toggle that lands on the same page in the other language.
 *
 * Each item is a real `<a hreflang>` rather than a button that sets a cookie,
 * so the translation is a URL a reader can copy and a crawler can follow. The
 * hash is read after mount (the server never sees it) so switching language on
 * `/#pricing` stays on Pricing instead of snapping back to the top.
 */
export const LanguageSwitcher: React.FC<{ className?: string }> = ({ className }) => {
  const current = useLocale();
  const pathname = usePathname();
  const { language } = useMessages().chrome;
  const [hash, setHash] = useState('');

  useEffect(() => {
    const update = () => setHash(window.location.hash);
    update();
    window.addEventListener('hashchange', update);
    return () => window.removeEventListener('hashchange', update);
  }, [pathname]);

  const basePath = stripLocale(pathname);

  return (
    <div
      role="group"
      aria-label={language.label}
      className={cn('flex items-center rounded-md border border-border p-0.5 text-xs', className)}
    >
      {LOCALES.map((locale) => {
        const active = locale === current;
        return (
          <a
            key={locale}
            href={`${localizePath(locale, basePath)}${hash}`}
            hrefLang={LOCALE_META[locale].htmlLang}
            lang={LOCALE_META[locale].htmlLang}
            title={LOCALE_META[locale].label}
            aria-current={active ? 'true' : undefined}
            className={cn(
              'rounded px-2 py-1 font-medium uppercase transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
              active ? 'bg-accent text-foreground' : 'text-muted-foreground hover:text-foreground'
            )}
          >
            {locale}
          </a>
        );
      })}
    </div>
  );
};

export default LanguageSwitcher;
