import React from 'react';

import { AudioLines, FileDown, Languages, type LucideIcon, Sparkles } from 'lucide-react';
import Image from 'next/image';

import { DownloadCta } from '@/components/DownloadCta';
import { Reveal } from '@/components/ui/reveal';
import { Section, SectionHeading } from '@/components/ui/section';
import { LANGUAGE_COUNT } from '@/config/languages';
import { SECTIONS } from '@/config/routes';
import type { Locale } from '@/i18n/config';
import { format } from '@/i18n/format';
import { getMessages } from '@/i18n/messages';

// Same order as `story.live.points`.
const POINT_ICONS: LucideIcon[] = [AudioLines, Sparkles, Languages, FileDown];

/**
 * The live assistant's deep dive, the counterpart of PracticeSection. The
 * picture is the real app (scripted sample data), mirrored to the other side
 * of the row from the practice section so the two read as a pair.
 */
export const LiveSection: React.FC<{ locale: Locale }> = ({ locale }) => {
  const copy = getMessages(locale).story.live;

  return (
    <Section id={SECTIONS.liveInterview} aria-labelledby="live-heading">
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
        <div className="flex flex-col gap-7">
          <SectionHeading
            id="live-heading"
            align="left"
            eyebrow={copy.eyebrow}
            title={copy.title}
            description={copy.description}
          />

          <ul className="grid gap-5 sm:grid-cols-2">
            {copy.points.map((point, index) => {
              const Icon = POINT_ICONS[index];
              return (
                <li key={point.title} className="flex gap-3.5">
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Icon className="size-[18px]" aria-hidden="true" />
                  </span>
                  <span>
                    <span className="block font-semibold">{point.title}</span>
                    <span className="mt-0.5 block text-sm leading-relaxed text-muted-foreground">
                      {format(point.body, { count: LANGUAGE_COUNT })}
                    </span>
                  </span>
                </li>
              );
            })}
          </ul>

          <DownloadCta size="lg" className="w-fit max-w-full" placement="live">
            {copy.cta}
          </DownloadCta>
          <p className="text-xs leading-relaxed text-muted-foreground">{copy.note}</p>
        </div>

        <Reveal className="min-w-0 lg:order-first">
          <figure className="overflow-hidden rounded-xl border border-border-strong bg-card shadow-elevation-3">
            <Image
              src="/media/docs/app/overview.jpg"
              alt={copy.imageAlt}
              width={1560}
              height={1020}
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="h-auto w-full"
            />
            <figcaption className="border-t border-border px-4 py-2 text-xs text-muted-foreground">
              {copy.caption}
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </Section>
  );
};

export default LiveSection;
