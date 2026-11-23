'use client';

import React, { useEffect, useRef, useState } from 'react';

import { Check, ChevronDown, Globe } from 'lucide-react';
import { usePathname } from 'next/navigation';

import { useLocale, useMessages } from '@/i18n/LocaleProvider';
import { LOCALES, LOCALE_META, localizePath, stripLocale } from '@/i18n/config';
import { cn } from '@/lib/utils';

/**
 * Language menu that lands on the same page in the chosen language.
 *
 * Each item is a real `<a hreflang>` rather than a button that sets a cookie,
 * so the translation is a URL a reader can copy and a crawler can follow. The
 * hash is read after mount (the server never sees it) so switching language on
 * `/#pricing` stays on Pricing instead of snapping back to the top.
 *
 * A native `<details>` rather than a scripted menu: nine languages no longer fit
 * the inline EN | RU toggle this replaced, and `<details>` keeps the links in the
 * HTML, opens without JavaScript, and needs no dependency. The script only adds
 * what `<details>` lacks - closing on Escape, on a click outside it and when
 * focus tabs out of it. Items are the endonyms, in the order of `LOCALES`:
 * someone who cannot read the current language scans for the one name they
 * recognise.
 */
export const LanguageSwitcher: React.FC<{ className?: string }> = ({ className }) => {
  const current = useLocale();
  const pathname = usePathname();
  const { language } = useMessages().chrome;
  const [hash, setHash] = useState('');
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    const update = () => setHash(window.location.hash);
    update();
    window.addEventListener('hashchange', update);
    return () => window.removeEventListener('hashchange', update);
  }, [pathname]);

  // Listeners only while the menu is open: the header renders one switcher per
  // breakpoint, and both sitting on the document for the life of the page is
  // two handlers per keystroke for a menu that is almost always closed.
  useEffect(() => {
    const details = ref.current;
    if (!open || !details) return;
    const close = () => {
      details.open = false;
    };
    const onPointer = (event: MouseEvent) => {
      if (!details.contains(event.target as Node)) close();
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      close();
      details.querySelector('summary')?.focus();
    };
    // Tabbing past the last language would otherwise leave the menu hanging
    // open over the page. `relatedTarget` is null when focus leaves the
    // window, which is not a reason to close.
    const onFocusOut = (event: FocusEvent) => {
      const next = event.relatedTarget as Node | null;
      if (next && !details.contains(next)) close();
    };
    document.addEventListener('mousedown', onPointer);
    document.addEventListener('keydown', onKey);
    details.addEventListener('focusout', onFocusOut);
    return () => {
      document.removeEventListener('mousedown', onPointer);
      document.removeEventListener('keydown', onKey);
      details.removeEventListener('focusout', onFocusOut);
    };
  }, [open]);

  const basePath = stripLocale(pathname);

  return (
    <details
      ref={ref}
      onToggle={(event) => setOpen(event.currentTarget.open)}
      className={cn('group relative', className)}
    >
      <summary
        aria-label={`${language.label}: ${LOCALE_META[current].label}`}
        className="flex cursor-pointer list-none items-center gap-1 rounded-md border border-border px-2 py-1 text-xs font-medium uppercase text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring [&::-webkit-details-marker]:hidden"
      >
        <Globe className="size-3.5" aria-hidden="true" />
        {current}
        <ChevronDown
          className="size-3 transition-transform group-open:rotate-180"
          aria-hidden="true"
        />
      </summary>
      <ul
        aria-label={language.label}
        className="absolute right-0 z-50 mt-1 min-w-40 rounded-md border border-border bg-popover p-1 text-sm text-popover-foreground shadow-md"
      >
        {LOCALES.map((locale) => {
          const active = locale === current;
          return (
            <li key={locale}>
              <a
                href={`${localizePath(locale, basePath)}${hash}`}
                hrefLang={LOCALE_META[locale].htmlLang}
                lang={LOCALE_META[locale].htmlLang}
                aria-current={active ? 'true' : undefined}
                className={cn(
                  'flex items-center justify-between gap-3 rounded px-2 py-1.5 transition-colors hover:bg-accent focus-visible:bg-accent focus-visible:outline-none',
                  active
                    ? 'font-medium text-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                {LOCALE_META[locale].label}
                {active && <Check className="size-3.5" aria-hidden="true" />}
              </a>
            </li>
          );
        })}
      </ul>
    </details>
  );
};

export default LanguageSwitcher;
