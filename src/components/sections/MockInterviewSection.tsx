import React from 'react';

import {
  ArrowRight,
  ClipboardCheck,
  Coins,
  FileDown,
  Headphones,
  Languages,
  type LucideIcon,
  Mic,
  SlidersHorizontal,
  UserCheck,
  Volume2,
} from 'lucide-react';

import { DownloadCta } from '@/components/DownloadCta';
import { Badge } from '@/components/ui/badge';
import { Reveal } from '@/components/ui/reveal';
import { Section, SectionHeading } from '@/components/ui/section';
import { LANGUAGE_COUNT, VOICE_LANGUAGE_COUNT } from '@/config/languages';
import { ROUTES, SECTIONS, docPath } from '@/config/routes';
import { LocalizedLink } from '@/i18n/LocalizedLink';
import type { Locale } from '@/i18n/config';
import { format, pluralize } from '@/i18n/format';
import { getMessages } from '@/i18n/messages';

// Same order as `mockInterview.steps` in src/i18n/messages.
const STEP_ICONS: LucideIcon[] = [SlidersHorizontal, Volume2, Mic, ClipboardCheck];

interface MockInterviewSectionProps {
  locale: Locale;
  /** Set on the standalone /mock-interview route so the section owns the h1. */
  standalone?: boolean;
}

/**
 * Mock practice as a first-party feature of the app.
 *
 * This used to be a single feature-grid card pointing at a docs page whose
 * advice was to open ChatGPT's voice mode and paste a prompt - a workaround
 * from before the app could run a session itself. It now leads the home page,
 * ahead of the features grid and the live-call material: it is the half of
 * the product a reader can use on the evening they download it, without
 * waiting for an interview to be booked.
 *
 * Full content on the home page and /mock-interview alike, `standalone` only
 * moving the heading level - the same arrangement How it works, Pricing, FAQ
 * and Team use.
 */
export const MockInterviewSection: React.FC<MockInterviewSectionProps> = ({
  locale,
  standalone = false,
}) => {
  const { mockInterview: copy, common } = getMessages(locale);
  const d = copy.details;

  // Language count and voice count are derived from the language list, so the
  // sentence is assembled around them instead of being written out in a message.
  const details: { icon: LucideIcon; title: string; body: string }[] = [
    { icon: UserCheck, ...d.scored },
    {
      icon: Languages,
      title: format(d.languages.title, {
        count: LANGUAGE_COUNT,
        noun: pluralize(locale, LANGUAGE_COUNT, common.languageNoun),
      }),
      body: format(d.languages.body, { voices: VOICE_LANGUAGE_COUNT }),
    },
    { icon: Coins, ...d.pricing },
    { icon: FileDown, ...d.report },
  ];

  return (
    <Section id={SECTIONS.mockInterview} aria-labelledby="mock-interview-heading">
      <SectionHeading
        id="mock-interview-heading"
        as={standalone ? 'h1' : 'h2'}
        eyebrow={copy.eyebrow}
        title={copy.title}
        description={copy.description}
      />

      <ol className="mx-auto mt-14 grid max-w-6xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {copy.steps.map((step, index) => {
          const Icon = STEP_ICONS[index];
          return (
            <Reveal as="li" key={step.title} delay={index * 90}>
              <div className="flex h-full flex-col gap-4 rounded-xl border border-border bg-card p-6 transition-colors hover:border-primary/40">
                <div className="flex items-center gap-3">
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  <span className="font-mono text-xs font-medium text-muted-foreground">
                    {format(common.step, { n: index + 1 })}
                  </span>
                </div>
                <h3 className="text-lg font-semibold">{step.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{step.body}</p>
              </div>
            </Reveal>
          );
        })}
      </ol>

      <Reveal className="mx-auto mt-4 max-w-6xl">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2 rounded-xl border border-border-subtle bg-surface-1 px-5 py-4">
          <Badge variant="outline" size="sm">
            <Headphones aria-hidden="true" />
            {copy.headphones.badge}
          </Badge>
          <p className="text-sm text-muted-foreground">{copy.headphones.text}</p>
        </div>
      </Reveal>

      <div className="mx-auto mt-6 grid max-w-6xl gap-4 sm:grid-cols-2">
        {details.map((detail, index) => (
          <Reveal key={detail.title} delay={Math.min(index, 3) * 60}>
            <article className="flex h-full gap-4 rounded-xl border border-border bg-card p-6">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <detail.icon className="size-5" aria-hidden="true" />
              </span>
              <div className="flex flex-col gap-2">
                <h3 className="text-base font-semibold">{detail.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{detail.body}</p>
              </div>
            </article>
          </Reveal>
        ))}
      </div>

      <div className="mt-12 flex flex-wrap items-center justify-center gap-x-4 gap-y-3">
        <DownloadCta size="lg">
          {copy.cta}
          <ArrowRight />
        </DownloadCta>
        <LocalizedLink
          href={docPath('mock-interview')}
          prefetch={false}
          className="text-sm font-medium text-primary underline-offset-4 hover:underline"
        >
          {copy.guide}
        </LocalizedLink>
        <LocalizedLink
          href={ROUTES.pricing}
          prefetch={false}
          className="text-sm font-medium text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
        >
          {copy.cost}
        </LocalizedLink>
      </div>
    </Section>
  );
};

export default MockInterviewSection;
