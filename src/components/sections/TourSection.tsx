import React from 'react';

import { Backdrop } from '@/components/ui/backdrop';
import { Reveal } from '@/components/ui/reveal';
import { Section, SectionHeading } from '@/components/ui/section';
import { SECTIONS } from '@/config/routes';
import type { Locale } from '@/i18n/config';
import { getMessages } from '@/i18n/messages';

import { TourPlayer } from './TourPlayer';

/**
 * The 90-second narrated tour, on its own under the hero rather than mixed in
 * with the silent feature clips of the hero's "Watch demo" player. The app UI
 * in it is the real renderer with sample data and the people are generated, so
 * the copy says both; see MEDIA.md. Narration is English in every locale.
 */
export const TourSection: React.FC<{ locale: Locale }> = ({ locale }) => {
  const copy = getMessages(locale).story.tour;

  return (
    <Section id={SECTIONS.tour} aria-labelledby="tour-heading" size="sm">
      <Backdrop pattern="dots" fade="top" />
      <SectionHeading
        id="tour-heading"
        eyebrow={copy.eyebrow}
        title={copy.title}
        description={copy.description}
      />
      <Reveal className="mx-auto mt-10 max-w-5xl md:mt-12">
        <TourPlayer
          src="/media/demos/tour.mp4"
          poster="/media/demos/tour.webp"
          title={copy.title}
          play={copy.play}
          sample={copy.sample}
        />
      </Reveal>
    </Section>
  );
};

export default TourSection;
