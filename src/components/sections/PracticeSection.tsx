import React from 'react';

import { Check } from 'lucide-react';
import Image from 'next/image';

import { DownloadCta } from '@/components/DownloadCta';
import { Reveal } from '@/components/ui/reveal';
import { Section, SectionHeading } from '@/components/ui/section';
import { SECTIONS } from '@/config/routes';
import type { Locale } from '@/i18n/config';
import { getMessages } from '@/i18n/messages';

import { AnswerUpgrade } from './AnswerUpgrade';

export const PracticeSection: React.FC<{ locale: Locale }> = ({ locale }) => {
  const { story, mockInterview } = getMessages(locale);
  const copy = story.answer;

  return (
    <Section id={SECTIONS.mockInterview} aria-labelledby="practice-heading">
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
        <div className="flex flex-col gap-6">
          <SectionHeading
            id="practice-heading"
            align="left"
            eyebrow={copy.eyebrow}
            title={copy.title}
            description={copy.description}
          />
          <ul className="flex flex-col gap-2.5">
            {copy.points.map((point) => (
              <li key={point} className="flex items-center gap-2.5 text-sm font-medium">
                <Check className="size-4 shrink-0 text-success" aria-hidden="true" />
                {point}
              </li>
            ))}
          </ul>
          <DownloadCta size="lg" className="w-fit max-w-full" placement="practice">
            {mockInterview.cta}
          </DownloadCta>
        </div>

        <Reveal className="min-w-0">
          <div className="relative aspect-[16/9] overflow-hidden rounded-xl border border-border">
            <Image
              src="/media/marketing/practice-desk.webp"
              alt=""
              fill
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="relative z-10 mx-3 -mt-10 sm:mx-8 sm:-mt-14">
            <AnswerUpgrade copy={copy} />
          </div>
        </Reveal>
      </div>
    </Section>
  );
};

export default PracticeSection;
