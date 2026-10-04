import React from 'react';

import { ArrowRight } from 'lucide-react';

import Container from '@/components/Container';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Glow } from '@/components/ui/glow';
import { SECTIONS, homeAnchor } from '@/config/routes';
import { LocalizedLink } from '@/i18n/LocalizedLink';
import type { Locale } from '@/i18n/config';
import { getMessages } from '@/i18n/messages';

import { DownloadButton } from './DownloadButton';
import { ProductSurface } from './ProductSurface';
import { TrustStrip } from './TrustStrip';

/**
 * The hero names the two features the app actually has - the mock interview
 * and the live interview - in that order, and sends a reader to one or the
 * other. It used to open on the generic "AI interview coach", which is the
 * category rather than either half of the product, and offered a single
 * secondary link.
 *
 * The role-neutral clause is load-bearing: the demo carousel below is three
 * parts coding challenge, so copy that never says otherwise reads as a tool
 * for software engineers only. It works from whatever CV and job description
 * you paste in.
 */
export const HeroSection: React.FC<{ locale: Locale }> = ({ locale }) => {
  const t = getMessages(locale).hero;

  return (
    <section
      id={SECTIONS.hero}
      className="relative isolate scroll-mt-20 pb-16 pt-12 md:pb-24 md:pt-20"
    >
      <Glow position="top" intensity="medium" grid />

      <Container>
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 text-center">
          <Badge variant="primary" size="lg" dot>
            {t.badge}
          </Badge>

          <h1
            id="hero-heading"
            className="text-balance text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl lg:text-[4.25rem]"
          >
            {t.titleLead} <span className="text-primary">{t.titleAccent}</span>
          </h1>

          <p className="text-pretty text-lg leading-relaxed text-muted-foreground md:text-xl">
            <span className="font-medium text-foreground">{t.mockLabel}</span> {t.mockText}{' '}
            <span className="font-medium text-foreground">{t.liveLabel}</span> {t.liveText}
          </p>

          <p className="text-pretty text-base text-muted-foreground">
            {t.rolePre} <span className="font-medium text-foreground">{t.roleStrong}</span>{' '}
            {t.rolePost}
          </p>

          <div className="mt-2 flex flex-col items-center gap-4">
            <DownloadButton />

            {/* Both features get a way in, mock first. These scroll to the home
              page's own sections, not the standalone /mock-interview page:
              the rehearsal is the half a reader can use tonight, without a
              scheduled interview to use it on, and the live-call capabilities
              are the features grid directly below it. */}
            <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1">
              <Button variant="ghost" size="sm" asChild>
                <LocalizedLink href={homeAnchor(SECTIONS.mockInterview)}>
                  {t.ctaMock}
                  <ArrowRight />
                </LocalizedLink>
              </Button>
              <Button variant="ghost" size="sm" asChild>
                <LocalizedLink href={homeAnchor(SECTIONS.features)}>
                  {t.ctaLive}
                  <ArrowRight />
                </LocalizedLink>
              </Button>
            </div>
          </div>

          <p className="text-sm text-muted-foreground">{t.freeNote}</p>
        </div>

        <ProductSurface className="mx-auto mt-14 max-w-5xl" />

        <div className="mt-12">
          <TrustStrip />
        </div>
      </Container>
    </section>
  );
};

export default HeroSection;
