import React from 'react';

import {
  ArrowRight,
  ClipboardCheck,
  Coins,
  FileDown,
  Headphones,
  Languages,
  type LucideIcon,
  Mic,
  SlidersHorizontal,
  UserCheck,
  Volume2,
} from 'lucide-react';
import Link from 'next/link';

import { DownloadCta } from '@/components/DownloadCta';
import { Badge } from '@/components/ui/badge';
import { Reveal } from '@/components/ui/reveal';
import { Section, SectionHeading } from '@/components/ui/section';
import { LANGUAGE_COUNT, VOICE_LANGUAGE_COUNT } from '@/config/languages';
import { ROUTES, SECTIONS, docPath } from '@/config/routes';

interface Step {
  icon: LucideIcon;
  title: string;
  body: string;
}

/*
 * The four states a session actually moves through in the app - setup dialog,
 * spoken question, spoken answer, scored report. Kept in that order and at
 * that granularity on purpose: it is the loop a reader is deciding whether to
 * spend an evening in, and a step here that the app doesn't have is a promise
 * the download can't keep.
 */
const STEPS: Step[] = [
  {
    icon: SlidersHorizontal,
    title: 'Choose the shape of it',
    body: 'Seniority from junior to staff, difficulty, and 3, 5, 8 or 12 questions. Nothing else to fill in: the interview is built from the CV and job description already on your account, the same ones the live assistant reads.',
  },
  {
    icon: Volume2,
    title: 'The interviewer speaks',
    body: 'Behavioural, technical, situational and closing questions, asked out loud in your interview language. A thin answer draws up to two follow-ups on the same question, the way a real interviewer presses.',
  },
  {
    icon: Mic,
    title: 'You answer out loud',
    body: 'Your microphone is transcribed as you speak, and you move on when you are ready. Suggestions from the live assistant stay off unless you turn them on: the point of the hour is that you do the thinking.',
  },
  {
    icon: ClipboardCheck,
    title: 'You get a scorecard',
    body: 'An overall score with your strengths and gaps, then every question scored on its own with why it landed where it did and a stronger version of the answer you gave.',
  },
];

interface Detail {
  icon: LucideIcon;
  title: string;
  body: React.ReactNode;
}

const DETAILS: Detail[] = [
  {
    icon: UserCheck,
    title: 'Scored against your own material',
    body: 'Questions and scoring both run on the profile and job context saved to your account, so a mock session rehearses the role you are actually interviewing for.',
  },
  {
    icon: Languages,
    title: `All ${LANGUAGE_COUNT} interview languages`,
    body: `One setting covers the live assistant and the mock alike. ${VOICE_LANGUAGE_COUNT} of them the interviewer speaks aloud; where a language has no voice available it writes its questions instead, and the follow-ups and the scoring are unchanged.`,
  },
  {
    icon: Coins,
    title: 'Priced by the question, not the clock',
    body: 'Think-time is free. You pay for each question, each follow-up and the final report; the transcription that runs the whole way through is not metered at all.',
  },
  {
    icon: FileDown,
    title: 'The report leaves with you',
    body: 'Export it as DOCX or Markdown, in the language you interviewed in, and keep it beside the notes from your real calls.',
  },
];

interface MockInterviewSectionProps {
  /** Set on the standalone /mock-interview route so the section owns the h1. */
  standalone?: boolean;
}

/**
 * Mock practice as a first-party feature of the app.
 *
 * This used to be a single feature-grid card pointing at a docs page whose
 * advice was to open ChatGPT's voice mode and paste a prompt - a workaround
 * from before the app could run a session itself. It now leads the home page,
 * ahead of the features grid and the live-call material: it is the half of
 * the product a reader can use on the evening they download it, without
 * waiting for an interview to be booked.
 *
 * Full content on the home page and /mock-interview alike, `standalone` only
 * moving the heading level - the same arrangement How it works, Pricing, FAQ
 * and Team use.
 */
export const MockInterviewSection: React.FC<MockInterviewSectionProps> = ({
  standalone = false,
}) => (
  <Section id={SECTIONS.mockInterview} aria-labelledby="mock-interview-heading">
    <SectionHeading
      id="mock-interview-heading"
      as={standalone ? 'h1' : 'h2'}
      eyebrow="Mock interview"
      title="Rehearse the interview before you sit it"
      description="A spoken mock interview inside the same desktop app. It asks, you answer out loud, and it hands back a scored report on what you actually said."
    />

    <ol className="mx-auto mt-14 grid max-w-6xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {STEPS.map((step, index) => (
        <Reveal as="li" key={step.title} delay={index * 90}>
          <div className="flex h-full flex-col gap-4 rounded-xl border border-border bg-card p-6 transition-colors hover:border-primary/40">
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
          </div>
        </Reveal>
      ))}
    </ol>

    <Reveal className="mx-auto mt-4 max-w-6xl">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2 rounded-xl border border-border-subtle bg-surface-1 px-5 py-4">
        <Badge variant="outline" size="sm">
          <Headphones aria-hidden="true" />
          Headphones
        </Badge>
        <p className="text-sm text-muted-foreground">
          Wear them for a mock session. On speakers, the tail of a spoken question can land at the
          start of the answer your microphone is transcribing.
        </p>
      </div>
    </Reveal>

    <div className="mx-auto mt-6 grid max-w-6xl gap-4 sm:grid-cols-2">
      {DETAILS.map((detail, index) => (
        <Reveal key={detail.title} delay={Math.min(index, 3) * 60}>
          <article className="flex h-full gap-4 rounded-xl border border-border bg-card p-6">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <detail.icon className="size-5" aria-hidden="true" />
            </span>
            <div className="flex flex-col gap-2">
              <h3 className="text-base font-semibold">{detail.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{detail.body}</p>
            </div>
          </article>
        </Reveal>
      ))}
    </div>

    <div className="mt-12 flex flex-wrap items-center justify-center gap-x-4 gap-y-3">
      <DownloadCta size="lg">
        Practice before the real one
        <ArrowRight />
      </DownloadCta>
      <Link
        href={docPath('mock-interview')}
        prefetch={false}
        className="text-sm font-medium text-primary underline-offset-4 hover:underline"
      >
        Read the mock interview guide
      </Link>
      <Link
        href={ROUTES.pricing}
        prefetch={false}
        className="text-sm font-medium text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
      >
        What a session costs
      </Link>
    </div>
  </Section>
);

export default MockInterviewSection;
