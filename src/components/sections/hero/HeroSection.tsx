import React from 'react';

import { Check } from 'lucide-react';

import Container from '@/components/Container';
import { Backdrop } from '@/components/ui/backdrop';
import { LANGUAGE_COUNT } from '@/config/languages';
import { SECTIONS } from '@/config/routes';
import type { Locale } from '@/i18n/config';
import { pluralize } from '@/i18n/format';
import { getMessages } from '@/i18n/messages';

import { DemoDialog } from './DemoDialog';
import { DownloadButton } from './DownloadButton';
import { HeroPreview } from './HeroPreview';
import { ProofBar } from './ProofBar';
import { TourPlayer } from './TourPlayer';

/**
 * One promise covering both modes and one primary action in a short row, then
 * the 90-second narrated tour (`#tour`) at full container width, so it is
 * large and on screen on arrival. It stays click-to-play with sound and is
 * kept apart from the silent "Watch demo" clips. Below, the product as a
 * full-width diptych: one interview question with the mock interview's scored
 * answer on one side and the live assistant's talking points on the other.
 */
export const HeroSection: React.FC<{ locale: Locale }> = ({ locale }) => {
  const { hero: t, common, story } = getMessages(locale);
  const tour = story.tour;
  const reassurance = [
    t.free,
    t.noCard,
    `${LANGUAGE_COUNT} ${pluralize(locale, LANGUAGE_COUNT, common.languageNoun)}`,
  ];

  return (
    <section id={SECTIONS.hero} className="relative isolate scroll-mt-20">
      <Backdrop aurora="strong" pattern="grid" fade="top" beams />

      <Container className="flex flex-col gap-8 pb-12 pt-8 md:pt-10 lg:gap-10 lg:pb-16 xl:pt-12">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-10">
          <div className="flex min-w-0 flex-col gap-4 lg:col-span-8">
            <h1
              id="hero-heading"
              className="text-hero text-gradient text-balance lg:text-[3rem] xl:text-[4rem]"
            >
              {t.title}
            </h1>
            <p className="max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
              {t.subtitle}
            </p>
          </div>

          <div className="flex min-w-0 flex-col items-start gap-4 lg:col-span-4 lg:pb-1">
            <div className="flex w-full flex-col items-start gap-3 sm:flex-row sm:flex-wrap">
              <DownloadButton align="start" placement="hero" className="w-full sm:w-auto" />
              <DemoDialog className="w-full sm:w-auto" />
            </div>

            <ul className="flex flex-wrap gap-x-5 gap-y-1.5 text-sm text-muted-foreground">
              {reassurance.map((item) => (
                <li key={item} className="flex items-center gap-1.5">
                  <Check className="size-4 shrink-0 text-success" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <figure id={SECTIONS.tour} className="min-w-0 scroll-mt-20">
          <TourPlayer
            src="/media/demos/tour.mp4"
            poster="/media/demos/tour.webp"
            title={tour.title}
            play={tour.play}
          />
          <figcaption className="mt-3 text-pretty text-center text-xs leading-relaxed text-muted-foreground">
            {tour.description}
          </figcaption>
        </figure>

        <HeroPreview className="min-w-0" />
      </Container>

      <ProofBar />
    </section>
  );
};

export default HeroSection;
