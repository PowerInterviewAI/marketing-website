import React from 'react';

import { Download, FileText, Radio, Volume2 } from 'lucide-react';

import { DownloadCta } from '@/components/DownloadCta';
import { Kbd } from '@/components/ui/kbd';
import { Reveal } from '@/components/ui/reveal';
import { Section, SectionHeading } from '@/components/ui/section';
import { HOTKEYS, Hotkey } from '@/config/hotkeys';
import { SECTIONS } from '@/config/routes';
import type { Locale } from '@/i18n/config';
import { format } from '@/i18n/format';
import { getMessages } from '@/i18n/messages';

// Same order as `howItWorks.steps` in src/i18n/messages.
const STEP_ICONS = [Download, FileText, Volume2, Radio] as const;

interface HowItWorksSectionProps {
  locale: Locale;
  /** Set on the standalone /how-it-works route so the section owns the h1. */
  standalone?: boolean;
}

/**
 * The full four-step walkthrough, with the hotkey callout, on the home page
 * and /how-it-works alike - not condensed to one line per step with a link
 * across, the way this section used to work. With the header nav always
 * pointing at the home anchor (see NAV_LINKS in routes.ts), a reader landing
 * here via the nav is already where they're going. /how-it-works itself is
 * unchanged - still a real, indexable page for direct links and search
 * results.
 *
 * The mock interview is step three and the live call is step four, which is
 * the order the site tells the whole story in: a reader meets the rehearsal
 * before the thing it rehearses for. This used to be three steps ending at
 * "join the call", with the mock relegated to a card further down the page.
 */
export const HowItWorksSection: React.FC<HowItWorksSectionProps> = ({
  locale,
  standalone = false,
}) => {
  const t = getMessages(locale);
  const copy = t.howItWorks;

  return (
    <Section id={SECTIONS.howItWorks} aria-labelledby="how-it-works-heading">
      <SectionHeading
        id="how-it-works-heading"
        as={standalone ? 'h1' : 'h2'}
        eyebrow={copy.eyebrow}
        title={copy.title}
        description={copy.description}
      />

      <ol className="mx-auto mt-14 grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {copy.steps.map((step, index) => {
          const Icon = STEP_ICONS[index];
          return (
            <Reveal as="li" key={step.title} delay={index * 90} className="relative">
              <div className="flex h-full flex-col rounded-xl border border-border bg-card transition-colors hover:border-border-strong">
                <div className="flex flex-1 flex-col gap-4 p-6">
                  <div className="flex items-center gap-3">
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Icon className="size-5" aria-hidden="true" />
                    </span>
                    <span className="font-mono text-xs font-medium text-muted-foreground">
                      {format(t.common.step, { n: index + 1 })}
                    </span>
                  </div>

                  <h3 className="text-lg font-semibold">{step.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{step.body}</p>

                  {index === 3 && (
                    <div className="mt-auto flex flex-wrap items-center gap-x-3 gap-y-2 pt-2">
                      <Kbd combo={HOTKEYS[Hotkey.ToggleStealth].combo} />
                      <span className="text-xs text-muted-foreground">
                        {t.common.hotkeys.toggleStealth}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </Reveal>
          );
        })}
      </ol>

      <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
        <DownloadCta size="lg">{copy.cta}</DownloadCta>
      </div>
    </Section>
  );
};

export default HowItWorksSection;
