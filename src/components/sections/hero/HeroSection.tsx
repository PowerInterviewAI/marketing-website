import React from 'react';

import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

import Container from '@/components/Container';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Glow } from '@/components/ui/glow';
import { SECTIONS, homeAnchor } from '@/config/routes';

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
export const HeroSection: React.FC = () => (
  <section
    id={SECTIONS.hero}
    className="relative isolate scroll-mt-20 pb-16 pt-12 md:pb-24 md:pt-20"
  >
    <Glow position="top" intensity="medium" grid />

    <Container>
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 text-center">
        <Badge variant="primary" size="lg" dot>
          Mock interview + live interview, 1 hour free
        </Badge>

        <h1
          id="hero-heading"
          className="text-balance text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl lg:text-[4.25rem]"
        >
          Rehearse the interview, then{' '}
          <span className="text-primary">sit the real one with live help</span>
        </h1>

        <p className="text-pretty text-lg leading-relaxed text-muted-foreground md:text-xl">
          <span className="font-medium text-foreground">Mock interview:</span> an AI interviewer
          speaks its questions, presses on a thin answer, and scores every one you give.{' '}
          <span className="font-medium text-foreground">Live interview:</span> the same desktop app
          stays open on the real Zoom, Google Meet or Teams call, hidden from screen share,
          transcribing both sides and suggesting what to say.
        </p>

        <p className="text-pretty text-base text-muted-foreground">
          Both are built from the CV and job description you paste in, so it fits{' '}
          <span className="font-medium text-foreground">any role</span> - sales, finance, nursing,
          teaching, consulting, engineering - not just software.
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
              <Link href={homeAnchor(SECTIONS.mockInterview)}>
                Start with a mock interview
                <ArrowRight />
              </Link>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <Link href={homeAnchor(SECTIONS.features)}>
                See the live interview features
                <ArrowRight />
              </Link>
            </Button>
          </div>
        </div>

        <p className="text-sm text-muted-foreground">
          One free hour covers everything: practice sessions, live suggestions and triggered
          suggestions alike. Pay with coins only, no credit card required.
        </p>
      </div>

      <ProductSurface className="mx-auto mt-14 max-w-5xl" />

      <div className="mt-12">
        <TrustStrip />
      </div>
    </Container>
  </section>
);

export default HeroSection;
