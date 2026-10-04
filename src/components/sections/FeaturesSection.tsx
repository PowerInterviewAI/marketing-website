import React from 'react';

import { SiSuperuser } from '@icons-pack/react-simple-icons';
import {
  ArrowRight,
  Captions,
  FileDown,
  Ghost,
  KeyRound,
  Languages,
  type LucideIcon,
  MessageSquareCode,
  MessageSquareText,
  UserLock,
} from 'lucide-react';

import { DownloadCta } from '@/components/DownloadCta';
import { RichText } from '@/components/RichText';
import { Badge } from '@/components/ui/badge';
import { Kbd } from '@/components/ui/kbd';
import { Reveal } from '@/components/ui/reveal';
import { Section, SectionHeading } from '@/components/ui/section';
import { HOTKEYS, Hotkey } from '@/config/hotkeys';
import { LANGUAGE_COUNT, VOICE_LANGUAGE_COUNT } from '@/config/languages';
import { ROUTES, SECTIONS, homeAnchor } from '@/config/routes';
import { LocalizedLink } from '@/i18n/LocalizedLink';
import type { Locale } from '@/i18n/config';
import { format, pluralize } from '@/i18n/format';
import { getMessages } from '@/i18n/messages';
import { cn } from '@/lib/utils';

/**
 * Which half of the product a capability belongs to. The app does two things -
 * the mock interview and the live interview - and the grid used to be a flat
 * list of nine cards that never said which was which, so "stealth mode" and
 * "an interviewer that speaks its questions" read as one undifferentiated
 * feature set.
 */
type FeatureScope = 'mock' | 'live' | 'both';

type FeatureId =
  | 'mock'
  | 'transcription'
  | 'stealth'
  | 'languages'
  | 'suggestions'
  | 'code'
  | 'export'
  | 'plans'
  | 'privacy';

interface Feature {
  id: FeatureId;
  icon: LucideIcon | typeof SiSuperuser;
  scope: FeatureScope;
  /** Column span at lg and up - drives the bento rhythm. A wide card fills
   *  two of the three columns, so every one of them is followed by exactly
   *  one narrow card in FEATURES; reorder them in a pair or the row before
   *  the next wide card is left with an empty cell. */
  wide?: boolean;
}

/*
 * Mock interview leads the grid. It used to sit seventh, below every
 * live-call feature, which put the half of the product a reader can use
 * tonight - no scheduled interview required - underneath the half they
 * cannot try until one is booked.
 */
const FEATURES: Feature[] = [
  { id: 'mock', icon: SiSuperuser, scope: 'mock', wide: true },
  { id: 'transcription', icon: Captions, scope: 'live' },
  { id: 'stealth', icon: Ghost, scope: 'live', wide: true },
  { id: 'languages', icon: Languages, scope: 'both' },
  { id: 'suggestions', icon: MessageSquareText, scope: 'live', wide: true },
  { id: 'code', icon: MessageSquareCode, scope: 'live' },
  { id: 'export', icon: FileDown, scope: 'both' },
  { id: 'plans', icon: KeyRound, scope: 'both' },
  { id: 'privacy', icon: UserLock, scope: 'both' },
];

export const FeaturesSection: React.FC<{ locale: Locale }> = ({ locale }) => {
  const { features: copy, common } = getMessages(locale);

  const languageCount = {
    count: LANGUAGE_COUNT,
    noun: pluralize(locale, LANGUAGE_COUNT, common.languageNoun),
  };

  // The per-card extras (a link, a hotkey chip) differ by feature, so they are
  // looked up here rather than carried on the FEATURES data.
  const footerFor = (id: FeatureId): React.ReactNode => {
    switch (id) {
      case 'stealth':
        return (
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
            <Kbd combo={HOTKEYS[Hotkey.ToggleStealth].combo} />
            <span className="text-xs text-muted-foreground">{common.hotkeys.toggleStealth}</span>
          </div>
        );
      case 'languages':
        return (
          <LocalizedLink
            href={homeAnchor(SECTIONS.languages)}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-primary underline-offset-4 hover:underline"
          >
            {format(copy.languages.link, { count: LANGUAGE_COUNT })}
            <ArrowRight className="size-4" aria-hidden="true" />
          </LocalizedLink>
        );
      case 'suggestions':
        return (
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
            <Kbd combo={HOTKEYS[Hotkey.ToggleProfessionalMode].combo} />
            <span className="text-xs text-muted-foreground">
              {common.hotkeys.toggleProfessionalMode}
            </span>
          </div>
        );
      default:
        return null;
    }
  };

  const titleFor = (id: FeatureId): string =>
    id === 'languages' ? format(copy.languages.title, languageCount) : copy[id].title;

  const descriptionFor = (id: FeatureId): string =>
    id === 'languages'
      ? format(copy.languages.description, { voices: VOICE_LANGUAGE_COUNT })
      : copy[id].description;

  return (
    <Section id={SECTIONS.features} tone="muted" aria-labelledby="features-heading">
      <SectionHeading
        id="features-heading"
        eyebrow={copy.eyebrow}
        title={copy.title}
        description={copy.description}
      />

      <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map((feature, index) => {
          const footer = footerFor(feature.id);
          return (
            <Reveal
              key={feature.id}
              delay={Math.min(index, 5) * 60}
              className={cn(feature.wide && 'lg:col-span-2')}
            >
              <article className="group flex h-full flex-col gap-4 rounded-xl border border-border bg-card p-6 transition-colors hover:border-primary/40">
                <div className="flex items-center justify-between gap-3">
                  <span className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary/15">
                    <feature.icon className="size-5" aria-hidden="true" />
                  </span>
                  {/* Which half of the product this belongs to. `default` for the
                      cross-cutting ones so the two named scopes stay the ones that
                      catch the eye. */}
                  <Badge
                    variant={feature.scope === 'both' ? 'default' : 'outline'}
                    size="sm"
                    className="shrink-0"
                  >
                    {copy.scope[feature.scope]}
                  </Badge>
                </div>

                <h3 className="text-lg font-semibold">{titleFor(feature.id)}</h3>

                <p className="text-sm leading-relaxed text-muted-foreground">
                  <RichText text={descriptionFor(feature.id)} />
                  {feature.id === 'mock' && (
                    <>
                      {' '}
                      <LocalizedLink
                        className="font-medium text-primary underline-offset-4 hover:underline"
                        href={ROUTES.mockInterview}
                        prefetch={false}
                      >
                        {copy.mock.link}
                      </LocalizedLink>
                      .
                    </>
                  )}
                </p>

                {footer && <div className="mt-auto pt-2">{footer}</div>}
              </article>
            </Reveal>
          );
        })}
      </div>

      <div className="mt-14 flex justify-center">
        <DownloadCta size="lg">
          {copy.cta}
          <ArrowRight />
        </DownloadCta>
      </div>
    </Section>
  );
};

export default FeaturesSection;
