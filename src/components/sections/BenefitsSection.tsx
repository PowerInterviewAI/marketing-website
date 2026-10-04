import React from 'react';

import {
  ArrowRight,
  EyeOff,
  Gauge,
  type LucideIcon,
  MessagesSquare,
  ShieldCheck,
  Sparkles,
  TrendingUp,
} from 'lucide-react';

import { DownloadCta } from '@/components/DownloadCta';
import { Glow } from '@/components/ui/glow';
import { Reveal } from '@/components/ui/reveal';
import { Section, SectionHeading } from '@/components/ui/section';
import { SECTIONS } from '@/config/routes';
import type { Locale } from '@/i18n/config';
import { getMessages } from '@/i18n/messages';

/*
 * Two mock-interview benefits, then two live-interview ones, then the two that
 * hold for both - the same mock-before-live order the rest of the page runs
 * in. It used to interleave them, so a reader could not tell which half of the
 * app any given promise came from.
 *
 * The icons line up by index with `benefits.items` in src/i18n/messages.
 */
const BENEFIT_ICONS: LucideIcon[] = [
  Sparkles,
  TrendingUp,
  MessagesSquare,
  Gauge,
  EyeOff,
  ShieldCheck,
];

export const BenefitsSection: React.FC<{ locale: Locale }> = ({ locale }) => {
  const copy = getMessages(locale).benefits;

  return (
    <Section id={SECTIONS.benefits} aria-labelledby="benefits-heading">
      <SectionHeading
        id="benefits-heading"
        eyebrow={copy.eyebrow}
        title={copy.title}
        description={copy.description}
      />

      <div className="mx-auto mt-14 grid max-w-5xl gap-x-12 gap-y-10 sm:grid-cols-2">
        {copy.items.map((benefit, index) => {
          const Icon = BENEFIT_ICONS[index];
          return (
            <Reveal key={benefit.title} delay={Math.min(index, 4) * 70}>
              <div className="flex gap-4">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <div className="flex flex-col gap-2">
                  <h3 className="text-base font-semibold">{benefit.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{benefit.body}</p>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>

      <div className="relative isolate mx-auto mt-16 max-w-3xl overflow-hidden rounded-xl border border-border bg-card px-6 py-10 text-center">
        <Glow position="center" intensity="subtle" />
        <p className="font-display text-2xl font-semibold tracking-tight">{copy.ctaTitle}</p>
        <p className="mx-auto mt-2 max-w-xl text-muted-foreground">{copy.ctaBody}</p>
        <DownloadCta size="lg" className="mt-6">
          {copy.ctaButton}
          <ArrowRight />
        </DownloadCta>
      </div>
    </Section>
  );
};

export default BenefitsSection;
