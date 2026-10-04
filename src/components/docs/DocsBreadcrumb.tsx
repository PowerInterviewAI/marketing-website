'use client';

import React from 'react';

import { ChevronRight } from 'lucide-react';

import { ROUTES } from '@/config/routes';
import { useMessages } from '@/i18n/LocaleProvider';
import { LocalizedLink } from '@/i18n/LocalizedLink';

interface DocsBreadcrumbProps {
  /** Title of the doc being read. Omit on the docs index itself. */
  current?: string;
}

const LINK_CLASS =
  'rounded transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring';

/**
 * Home / Documentation / <page>.
 *
 * The middle crumb is the route back to the docs root, which previously
 * existed nowhere on a doc page.
 */
export const DocsBreadcrumb: React.FC<DocsBreadcrumbProps> = ({ current }) => {
  const t = useMessages().docs.breadcrumb;

  return (
    <nav aria-label={t.label} className="mb-6">
      <ol className="flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground">
        <li>
          <LocalizedLink href={ROUTES.home} prefetch={false} className={LINK_CLASS}>
            {t.home}
          </LocalizedLink>
        </li>

        <ChevronRight className="size-3.5 shrink-0" aria-hidden="true" />

        <li>
          {current ? (
            <LocalizedLink href={ROUTES.docs} prefetch={false} className={LINK_CLASS}>
              {t.documentation}
            </LocalizedLink>
          ) : (
            <span aria-current="page" className="font-medium text-foreground">
              {t.documentation}
            </span>
          )}
        </li>

        {current && (
          <>
            <ChevronRight className="size-3.5 shrink-0" aria-hidden="true" />
            <li aria-current="page" className="font-medium capitalize text-foreground">
              {current}
            </li>
          </>
        )}
      </ol>
    </nav>
  );
};

export default DocsBreadcrumb;
