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
import Link from 'next/link';

import { DownloadCta } from '@/components/DownloadCta';
import { Badge } from '@/components/ui/badge';
import { Kbd } from '@/components/ui/kbd';
import { Reveal } from '@/components/ui/reveal';
import { Section, SectionHeading } from '@/components/ui/section';
import { HOTKEYS, Hotkey } from '@/config/hotkeys';
import { LANGUAGE_COUNT, VOICE_LANGUAGE_COUNT } from '@/config/languages';
import { ROUTES, SECTIONS, homeAnchor } from '@/config/routes';
import { cn } from '@/lib/utils';

/**
 * Which half of the product a capability belongs to. The app does two things -
 * the mock interview and the live interview - and the grid used to be a flat
 * list of nine cards that never said which was which, so "stealth mode" and
 * "an interviewer that speaks its questions" read as one undifferentiated
 * feature set.
 */
type FeatureScope = 'Mock interview' | 'Live interview' | 'Both';

interface Feature {
  id: string;
  icon: LucideIcon | typeof SiSuperuser;
  title: string;
  scope: FeatureScope;
  description: React.ReactNode;
  /** Column span at lg and up - drives the bento rhythm. A wide card fills
   *  two of the three columns, so every one of them is followed by exactly
   *  one narrow card in FEATURES; reorder them in a pair or the row before
   *  the next wide card is left with an empty cell. */
  wide?: boolean;
  footer?: React.ReactNode;
}

const Em: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span className="font-medium text-foreground">{children}</span>
);

/*
 * Mock interview leads the grid. It used to sit seventh, below every
 * live-call feature, which put the half of the product a reader can use
 * tonight - no scheduled interview required - underneath the half they
 * cannot try until one is booked.
 */
const FEATURES: Feature[] = [
  {
    id: 'mock',
    icon: SiSuperuser,
    title: 'Mock interview',
    scope: 'Mock interview',
    description: (
      <>
        An AI interviewer that <Em>speaks its questions</Em>, presses on a thin answer, and scores
        every one of yours against your CV and the job description. Behavioural, technical,
        situational and closing questions, written for the role you pasted in - a nursing post or a
        sales one as readily as an engineering one. Export the report as DOCX or Markdown.{' '}
        <Link
          className="font-medium text-primary underline-offset-4 hover:underline"
          href={ROUTES.mockInterview}
          prefetch={false}
        >
          How mock interviews work
        </Link>
        .
      </>
    ),
    wide: true,
  },
  {
    id: 'transcription',
    icon: Captions,
    title: 'Live transcription',
    scope: 'Live interview',
    description: (
      <>
        Dual-channel transcription with automatic speaker detection and full conversation history.
        Change your microphone <Em>mid-interview</Em> without stopping the session - no gap in the
        transcript, nothing to restart.
      </>
    ),
  },
  {
    id: 'stealth',
    icon: Ghost,
    title: 'Stealth mode',
    scope: 'Live interview',
    description: (
      <>
        Operate discreetly with hotkeys, opacity control, and smart window positioning. The window
        is <Em>not capturable in screenshots</Em> and stays invisible during full screen share.
      </>
    ),
    wide: true,
    footer: (
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
        <Kbd combo={HOTKEYS[Hotkey.ToggleStealth].combo} />
        <span className="text-xs text-muted-foreground">{HOTKEYS[Hotkey.ToggleStealth].title}</span>
      </div>
    ),
  },
  {
    id: 'languages',
    icon: Languages,
    title: `${LANGUAGE_COUNT} interview languages`,
    scope: 'Both',
    description: (
      <>
        One setting drives all three: which speech model transcribes the call, the language your
        suggestions come back in, and the language of your exported report. Switch it{' '}
        <Em>mid-interview</Em>, not just before you start. Full right-to-left support for Arabic and
        Hebrew, and <Em>{VOICE_LANGUAGE_COUNT}</Em> of them the mock interviewer speaks aloud.
      </>
    ),
    footer: (
      <Link
        href={homeAnchor(SECTIONS.languages)}
        className="inline-flex items-center gap-1.5 text-sm font-medium text-primary underline-offset-4 hover:underline"
      >
        See all {LANGUAGE_COUNT} languages
        <ArrowRight className="size-4" aria-hidden="true" />
      </Link>
    ),
  },
  {
    id: 'suggestions',
    icon: MessageSquareText,
    title: 'AI reply suggestions',
    scope: 'Live interview',
    description: (
      <>
        Personalised, context-aware responses grounded in your CV, the job description, and your{' '}
        <Em>full conversation history</Em>. Suggestions adapt to your communication style so you
        articulate your own experience rather than reading generic advice. Toggle{' '}
        <Em>Professional Mode</Em> for at-a-glance hints - a headline plus keyword bullets - instead
        of full sentences.
      </>
    ),
    wide: true,
    footer: (
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
        <Kbd combo={HOTKEYS[Hotkey.ToggleProfessionalMode].combo} />
        <span className="text-xs text-muted-foreground">
          {HOTKEYS[Hotkey.ToggleProfessionalMode].title}
        </span>
      </div>
    ),
  },
  {
    id: 'code',
    icon: MessageSquareCode,
    title: 'Code suggestions',
    scope: 'Live interview',
    description: (
      <>
        For the interviews that include a technical round: screenshot analysis with LLM-powered
        solutions for coding problems, complete with syntax highlighting. <Em>Optional</Em> - the
        rest of the live assistant works exactly the same on an interview that never shows you any
        code.
      </>
    ),
  },
  {
    id: 'export',
    icon: FileDown,
    title: 'AI note taker export',
    scope: 'Both',
    description: (
      <>
        <Em>Smart meeting export</Em> for interviews, mock interviews, and video calls. AI-generated
        summaries, action items, speaker-labelled transcripts, and follow-up notes. Exports to{' '}
        <Em>DOCX</Em> for easy sharing across individuals and enterprise teams.
      </>
    ),
  },
  {
    id: 'plans',
    icon: KeyRound,
    title: 'Every plan, every feature',
    scope: 'Both',
    description: (
      <>
        No feature is paywalled. The free hour runs the whole app on the <Em>free model</Em> - live
        suggestions, triggered suggestions and mock interviews alike. Credits move you to the{' '}
        <Em>SOTA model</Em>, and suggestions keep working on the free model once they run out.
      </>
    ),
  },
  {
    id: 'privacy',
    icon: UserLock,
    title: 'Privacy first',
    scope: 'Both',
    description: (
      <>
        Transcripts are never retained after your session - from a mock session and a real call
        alike. No data mining, and full control over your information.
      </>
    ),
  },
];

export const FeaturesSection: React.FC = () => (
  <Section id={SECTIONS.features} tone="muted" aria-labelledby="features-heading">
    <SectionHeading
      id="features-heading"
      eyebrow="Features"
      title="Everything the rehearsal needs, and everything the call can't see"
      description="Every capability, labelled with the half of the app it belongs to: the mock interview you rehearse in, the live interview you sit afterwards, or both. It runs off your own CV and job description, so the role can be anything - the coding help is one feature among nine, not the point of the app."
    />

    <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {FEATURES.map((feature, index) => (
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
                variant={feature.scope === 'Both' ? 'default' : 'outline'}
                size="sm"
                className="shrink-0"
              >
                {feature.scope}
              </Badge>
            </div>

            <h3 className="text-lg font-semibold">{feature.title}</h3>

            <p className="text-sm leading-relaxed text-muted-foreground">{feature.description}</p>

            {feature.footer && <div className="mt-auto pt-2">{feature.footer}</div>}
          </article>
        </Reveal>
      ))}
    </div>

    <div className="mt-14 flex justify-center">
      <DownloadCta size="lg">
        Download for free
        <ArrowRight />
      </DownloadCta>
    </div>
  </Section>
);

export default FeaturesSection;
