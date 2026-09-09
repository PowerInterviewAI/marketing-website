import React from 'react';

import { Download, FileText, Radio, Volume2 } from 'lucide-react';

import { DownloadCta } from '@/components/DownloadCta';
import { Kbd } from '@/components/ui/kbd';
import { Reveal } from '@/components/ui/reveal';
import { Section, SectionHeading } from '@/components/ui/section';
import { HOTKEYS, Hotkey } from '@/config/hotkeys';
import { SECTIONS } from '@/config/routes';

const STEPS = [
  {
    icon: Download,
    title: 'Install and start your trial',
    body: 'Download the desktop app for Windows or macOS and sign in. New accounts get a full hour on the free model - no rate limits, no interruptions.',
  },
  {
    icon: FileText,
    title: 'Add your CV and the job description',
    body: 'Paste your profile and the role you are interviewing for - any role, from a nursing post to a finance one to a staff engineering one. One profile drives both halves of the app: it writes the questions your mock interview asks and scores the answers, and it grounds the suggestions on the live call in your own experience. Your configuration follows you across devices.',
  },
  {
    icon: Volume2,
    title: 'Rehearse it as a mock interview',
    body: 'The first of the two features. An AI interviewer asks its questions out loud, presses on a thin answer the way a real one would, and hands back a scored report on every answer you gave. Do that in the days before the call, not in the post-mortem after it.',
  },
  {
    icon: Radio,
    title: 'Then sit the live interview',
    body: 'The second feature, in the same app. Dual-channel transcription with speaker detection runs alongside Zoom, Google Meet or Teams, and suggestions stream into an overlay that stays out of screen shares and screenshots, driven entirely by hotkeys.',
  },
] as const;

interface HowItWorksSectionProps {
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
export const HowItWorksSection: React.FC<HowItWorksSectionProps> = ({ standalone = false }) => (
  <Section id={SECTIONS.howItWorks} aria-labelledby="how-it-works-heading">
    <SectionHeading
      id="how-it-works-heading"
      as={standalone ? 'h1' : 'h2'}
      eyebrow="How it works"
      title="Practice it first, then sit it with backup"
      description="Four steps, in the order you actually take them: install, add your context, rehearse against the AI interviewer, then keep the same app open for the interview itself. Whatever the job, and with no browser extension and no meeting bot joining the call on your behalf."
    />

    <ol className="mx-auto mt-14 grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {STEPS.map((step, index) => (
        <Reveal as="li" key={step.title} delay={index * 90} className="relative">
          <div className="flex h-full flex-col rounded-xl border border-border bg-card transition-colors hover:border-border-strong">
            <div className="flex flex-1 flex-col gap-4 p-6">
              <div className="flex items-center gap-3">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <step.icon className="size-5" aria-hidden="true" />
                </span>
                <span className="font-mono text-xs font-medium text-muted-foreground">
                  Step {index + 1}
                </span>
              </div>

              <h3 className="text-lg font-semibold">{step.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{step.body}</p>

              {index === 3 && (
                <div className="mt-auto flex flex-wrap items-center gap-x-3 gap-y-2 pt-2">
                  <Kbd combo={HOTKEYS[Hotkey.ToggleStealth].combo} />
                  <span className="text-xs text-muted-foreground">
                    {HOTKEYS[Hotkey.ToggleStealth].title}
                  </span>
                </div>
              )}
            </div>
          </div>
        </Reveal>
      ))}
    </ol>

    <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
      <DownloadCta size="lg">Download and try it</DownloadCta>
    </div>
  </Section>
);

export default HowItWorksSection;
