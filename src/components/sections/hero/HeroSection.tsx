import React from 'react';

import { Check } from 'lucide-react';

import Container from '@/components/Container';
import { Glow } from '@/components/ui/glow';
import { LANGUAGE_COUNT } from '@/config/languages';
import { SECTIONS } from '@/config/routes';
import type { Locale } from '@/i18n/config';
import { pluralize } from '@/i18n/format';
import { getMessages } from '@/i18n/messages';

import { DemoDialog } from './DemoDialog';
import { DownloadButton } from './DownloadButton';
import { HeroPreview } from './HeroPreview';
import { ProofBar } from './ProofBar';

/**
 * One promise covering both modes - practice before the interview, help during
 * it - one primary action, and the product beside them. The preview toggles
 * between the two and answers the question that decides this audience: does it
 * work in my language?
 */
export const HeroSection: React.FC<{ locale: Locale }> = ({ locale }) => {
  const { hero: t, common } = getMessages(locale);
  const reassurance = [
    t.free,
    t.noCard,
    `${LANGUAGE_COUNT} ${pluralize(locale, LANGUAGE_COUNT, common.languageNoun)}`,
  ];

  return (
    <section id={SECTIONS.hero} className="relative isolate scroll-mt-20">
      <Glow position="top" intensity="strong" />

      <Container className="grid items-center gap-10 py-8 md:py-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-14 xl:py-14">
        <div className="flex min-w-0 flex-col items-start gap-5">
          <h1 id="hero-heading" className="text-display text-balance">
            {t.title}
          </h1>
          <p className="max-w-xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
            {t.subtitle}
          </p>

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

        <HeroPreview className="min-w-0" />
      </Container>

      <ProofBar />
    </section>
  );
};

export default HeroSection;
