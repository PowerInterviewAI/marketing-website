'use client';

import React from 'react';

import Link from 'next/link';

import { useLocale } from '@/i18n/LocaleProvider';
import { localizePath } from '@/i18n/config';

type LocalizedLinkProps = Omit<React.ComponentProps<typeof Link>, 'href'> & { href: string };

/**
 * `next/link` for internal destinations: prefixes the current locale
 * (`/pricing` -> `/ru/pricing`) so a reader who chose Russian stays in it.
 * Anything that is not a site path - absolute URLs, `mailto:`, a bare `#hash`
 * - passes through untouched.
 */
export const LocalizedLink = React.forwardRef<HTMLAnchorElement, LocalizedLinkProps>(
  ({ href, ...props }, ref) => {
    const locale = useLocale();
    const isSitePath = href.startsWith('/') && !href.startsWith('//');
    return <Link ref={ref} href={isSitePath ? localizePath(locale, href) : href} {...props} />;
  }
);
LocalizedLink.displayName = 'LocalizedLink';
