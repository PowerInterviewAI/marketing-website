'use client';

import React from 'react';

import { Languages } from 'lucide-react';
import { usePathname } from 'next/navigation';

import { useLocale, useMessages } from '@/i18n/LocaleProvider';
import { DEFAULT_LOCALE, stripLocale } from '@/i18n/config';

/**
 * Shown on pages whose text is still English under a non-English locale - the
 * legal pages and the docs. The chrome around them is translated, so without
 * this a Russian reader hits English prose with no explanation and no way back
 * to a page that is consistent. Renders nothing in the default locale.
 */
export const EnglishOnlyNotice: React.FC<{ className?: string }> = ({ className }) => {
  const locale = useLocale();
  const pathname = usePathname();
  const { englishOnly } = useMessages().chrome;

  if (locale === DEFAULT_LOCALE) return null;

  return (
    <p
      role="note"
      className={`flex items-start gap-2 rounded-lg border border-border bg-surface-1 px-4 py-3 text-sm text-muted-foreground ${className ?? ''}`}
    >
      <Languages className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
      <span>
        {englishOnly.text}{' '}
        <a
          href={stripLocale(pathname)}
          hrefLang="en"
          className="font-medium text-foreground underline underline-offset-4 hover:text-primary"
        >
          {englishOnly.link}
        </a>
      </span>
    </p>
  );
};

export default EnglishOnlyNotice;
