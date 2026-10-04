'use client';

import React from 'react';

import { ArrowLeft, LayoutGrid } from 'lucide-react';

import { DocsBreadcrumb } from '@/components/docs/DocsBreadcrumb';
import { Button } from '@/components/ui/button';
import { ROUTES, docPath } from '@/config/routes';
import { useMessages } from '@/i18n/LocaleProvider';
import { LocalizedLink } from '@/i18n/LocalizedLink';

/**
 * Body of the docs 404. A client component because not-found files receive no
 * route params; the locale comes from the provider. The suggestion list is
 * resolved on the server (it reads the docs directory) and passed in.
 */
export const DocsNotFoundBody: React.FC<{ suggestions: { slug: string; title: string }[] }> = ({
  suggestions,
}) => {
  const t = useMessages().docs;

  return (
    <main className="mx-auto max-w-4xl px-2 py-4 sm:px-4">
      <DocsBreadcrumb current={t.breadcrumb.notFound} />

      <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-primary">404</p>
      <h1 className="mb-4 font-display text-3xl font-semibold tracking-tight">
        {t.notFound.heading}
      </h1>
      <p className="mb-8 text-muted-foreground">{t.notFound.body}</p>

      <div className="mb-10 flex flex-wrap gap-3">
        <Button asChild>
          <LocalizedLink href={ROUTES.docs}>
            <LayoutGrid className="size-4" />
            {t.notFound.all}
          </LocalizedLink>
        </Button>
        <Button variant="outline" asChild>
          <LocalizedLink href={ROUTES.home}>
            <ArrowLeft className="size-4" />
            {t.notFound.home}
          </LocalizedLink>
        </Button>
      </div>

      <ul className="grid gap-3 sm:grid-cols-2">
        {suggestions.map((doc) => (
          <li key={doc.slug}>
            <LocalizedLink
              href={docPath(doc.slug)}
              className="block rounded-lg border border-border bg-card p-4 transition-colors hover:border-primary/40"
            >
              <span className="font-medium capitalize text-foreground">{doc.title}</span>
            </LocalizedLink>
          </li>
        ))}
      </ul>
    </main>
  );
};

export default DocsNotFoundBody;
