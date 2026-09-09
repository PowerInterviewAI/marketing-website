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

export const HeroSection: React.FC = () => (
  <section
    id={SECTIONS.hero}
    className="relative isolate scroll-mt-20 pb-16 pt-12 md:pb-24 md:pt-20"
  >
    <Glow position="top" intensity="medium" grid />

    <Container>
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 text-center">
        <Badge variant="primary" size="lg" dot>
          1-hour free trial, no rate limits
        </Badge>

        <h1
          id="hero-heading"
          className="text-balance text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl lg:text-[4.25rem]"
        >
          Your AI interview coach, <span className="text-primary">before and during the call</span>
        </h1>

        <p className="text-pretty text-lg leading-relaxed text-muted-foreground md:text-xl">
          Rehearse against an AI interviewer that speaks its questions and scores every answer you
          give. Then keep the same desktop app open for the real call, hidden from screen share, for
          live transcription and suggestions grounded in your CV. Zoom, Google Meet and Teams.
        </p>

        <div className="mt-2 flex flex-col items-center gap-4">
          <DownloadButton />
          {/* Scrolls to the home page's MockInterviewSection, not the
              standalone /mock-interview page. Points at the rehearsal rather
              than the walkthrough: it is the half of the product a reader can
              use tonight, without a scheduled interview to use it on. */}
          <Button variant="ghost" size="sm" asChild>
            <Link href={homeAnchor(SECTIONS.mockInterview)}>
              Start with a mock interview
              <ArrowRight />
            </Link>
          </Button>
        </div>

        <p className="text-sm text-muted-foreground">
          One free hour covers both: practice sessions and live suggestions alike - triggered
          suggestions unlock on paid plans. Pay with coins only, no credit card required.
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
