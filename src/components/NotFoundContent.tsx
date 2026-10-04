'use client';

import React from 'react';

import { ArrowLeft, BookOpen } from 'lucide-react';

import Container from '@/components/Container';
import { Button } from '@/components/ui/button';
import { ROUTES } from '@/config/routes';
import { useMessages } from '@/i18n/LocaleProvider';
import { LocalizedLink } from '@/i18n/LocalizedLink';

/**
 * Body of the 404 pages. A client component because not-found files receive no
 * route params, so the only way to know the locale is the provider in the
 * [locale] layout.
 */
export const NotFoundContent: React.FC = () => {
  const t = useMessages().chrome.notFound;

  return (
    <Container>
      <div className="mx-auto flex max-w-md flex-col items-center py-24 text-center md:py-32">
        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-primary">404</p>
        <h1 className="mb-4 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
          {t.heading}
        </h1>
        <p className="mb-8 text-muted-foreground">{t.body}</p>
        <div className="flex flex-wrap justify-center gap-3">
          {/* Was <Link><Button/></Link>, which nests a <button> inside an <a>. */}
          <Button asChild>
            <LocalizedLink href={ROUTES.home}>
              <ArrowLeft className="size-4" />
              {t.home}
            </LocalizedLink>
          </Button>
          <Button variant="outline" asChild>
            <LocalizedLink href={ROUTES.docs}>
              <BookOpen className="size-4" />
              {t.docs}
            </LocalizedLink>
          </Button>
        </div>
      </div>
    </Container>
  );
};

export default NotFoundContent;
