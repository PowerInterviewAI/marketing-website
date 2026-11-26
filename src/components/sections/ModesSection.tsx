import React from 'react';

import { ArrowRight, Check } from 'lucide-react';

import { AmbientVideo } from '@/components/ui/ambient-video';
import { Backdrop } from '@/components/ui/backdrop';
import { Reveal } from '@/components/ui/reveal';
import { Section, SectionHeading } from '@/components/ui/section';
import { ROUTES, SECTIONS, docPath } from '@/config/routes';
import { LocalizedLink } from '@/i18n/LocalizedLink';
import type { Locale } from '@/i18n/config';
import { getMessages } from '@/i18n/messages';

/** Recorded from the real app with scripted sample data. */
const MODES = [
  {
    id: 'mock',
    href: ROUTES.mockInterview,
    video: { src: '/media/demos/mock.mp4', poster: '/media/demos/mock.webp' },
  },
  {
    id: 'live',
    href: docPath('live-interview'),
    video: { src: '/media/demos/live.mp4', poster: '/media/demos/live.webp' },
  },
] as const;

/**
 * The product in one screen: two modes of equal weight, side by side. Each
 * card shows its own demo clip, three facts and a link to the full story,
 * and the deep dives below (PracticeSection, LiveSection) follow in the same
 * order. Carries the `features` anchor that the footer and `/features` point at.
 */
export const ModesSection: React.FC<{ locale: Locale }> = ({ locale }) => {
  const copy = getMessages(locale).story.modes;

  return (
    <Section id={SECTIONS.features} aria-labelledby="modes-heading">
      <Backdrop pattern="dots" fade="top" />
      <SectionHeading
        id="modes-heading"
        eyebrow={copy.eyebrow}
        title={copy.title}
        description={copy.description}
      />

      <div className="mx-auto mt-12 grid max-w-6xl gap-6 md:mt-14 lg:grid-cols-2">
        {MODES.map((mode, index) => {
          const card = copy[mode.id];
          return (
            <Reveal key={mode.id} delay={index * 90} className="min-w-0">
              <article
                aria-labelledby={`mode-${mode.id}-heading`}
                className="surface-card surface-glass flex h-full flex-col overflow-hidden rounded-2xl"
              >
                <div className="relative aspect-video overflow-hidden border-b border-border bg-muted">
                  <AmbientVideo src={mode.video.src} poster={mode.video.poster} />
                </div>

                <div className="flex flex-1 flex-col gap-4 p-6 md:p-7">
                  <span className="w-fit rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold uppercase tracking-[0.12em] text-primary">
                    {card.tag}
                  </span>
                  <h3 id={`mode-${mode.id}-heading`} className="text-2xl font-semibold">
                    {card.title}
                  </h3>
                  <p className="text-pretty leading-relaxed text-muted-foreground">{card.body}</p>
                  <ul className="flex flex-col gap-2">
                    {card.points.map((point) => (
                      <li key={point} className="flex items-start gap-2.5 text-sm font-medium">
                        <Check className="mt-0.5 size-4 shrink-0 text-success" aria-hidden="true" />
                        {point}
                      </li>
                    ))}
                  </ul>
                  <LocalizedLink
                    href={mode.href}
                    prefetch={false}
                    data-track="mode_link"
                    data-placement={mode.id}
                    className="mt-auto inline-flex w-fit items-center gap-1.5 pt-2 text-sm font-semibold text-primary underline-offset-4 hover:underline"
                  >
                    {card.link}
                    <ArrowRight className="size-4 rtl:rotate-180" aria-hidden="true" />
                  </LocalizedLink>
                </div>
              </article>
            </Reveal>
          );
        })}
      </div>

      <p className="mx-auto mt-8 max-w-2xl text-pretty text-center text-sm text-muted-foreground">
        {copy.shared}
      </p>
    </Section>
  );
};

export default ModesSection;
