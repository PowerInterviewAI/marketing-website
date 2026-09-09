import React from 'react';

import {
  ArrowRight,
  EyeOff,
  Gauge,
  type LucideIcon,
  MessagesSquare,
  ShieldCheck,
  Sparkles,
  TrendingUp,
} from 'lucide-react';

import { DownloadCta } from '@/components/DownloadCta';
import { Glow } from '@/components/ui/glow';
import { Reveal } from '@/components/ui/reveal';
import { Section, SectionHeading } from '@/components/ui/section';
import { SECTIONS } from '@/config/routes';

interface Benefit {
  icon: LucideIcon;
  title: string;
  body: string;
}

const BENEFITS: Benefit[] = [
  {
    icon: Sparkles,
    title: 'Walk in already warmed up',
    body: 'Run the spoken mock the night before and the first question of the real interview is not the first time you have said any of it out loud. The uncertainty of a cold question is the thing rehearsal removes.',
  },
  {
    icon: TrendingUp,
    title: 'Find the weak answer before they do',
    body: 'The mock scorecard grades every answer on its own, says why it landed where it did, and writes a stronger version back. That is the gap you would otherwise only discover from a rejection email.',
  },
  {
    icon: MessagesSquare,
    title: 'Communicate more clearly',
    body: 'Real-time, context-aware suggestions on the live call help you articulate your thoughts more clearly and professionally. Exported transcripts reveal the communication patterns you would otherwise never see.',
  },
  {
    icon: Gauge,
    title: 'Cover every kind of question',
    body: 'Behavioural, technical, situational and closing questions in the mock; coding challenges and everything else in the live call. Both halves are scored or transcribed, so you can see where you were strong and where you were not.',
  },
  {
    icon: EyeOff,
    title: 'Stay private throughout',
    body: 'Stealth mode keeps the assistant invisible during screen sharing and screenshots, and your transcripts are never retained on our servers after the session ends.',
  },
  {
    icon: ShieldCheck,
    title: 'Keep control of your data',
    body: 'Bring your own OpenAI, Anthropic, or Google key and your prompts go to a provider you already trust. Payment is crypto-only, so there are no card details to store either.',
  },
];

export const BenefitsSection: React.FC = () => (
  <Section id={SECTIONS.benefits} aria-labelledby="benefits-heading">
    <SectionHeading
      id="benefits-heading"
      eyebrow="Benefits"
      title="Transform your interview performance"
      description="What actually changes once you have rehearsed against the AI interviewer and kept it running through the real call."
    />

    <div className="mx-auto mt-14 grid max-w-5xl gap-x-12 gap-y-10 sm:grid-cols-2">
      {BENEFITS.map((benefit, index) => (
        <Reveal key={benefit.title} delay={Math.min(index, 4) * 70}>
          <div className="flex gap-4">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <benefit.icon className="size-5" aria-hidden="true" />
            </span>
            <div className="flex flex-col gap-2">
              <h3 className="text-base font-semibold">{benefit.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{benefit.body}</p>
            </div>
          </div>
        </Reveal>
      ))}
    </div>

    <div className="relative isolate mx-auto mt-16 max-w-3xl overflow-hidden rounded-xl border border-border bg-card px-6 py-10 text-center">
      <Glow position="center" intensity="subtle" />
      <p className="font-display text-2xl font-semibold tracking-tight">
        Ready to transform your job search?
      </p>
      <p className="mx-auto mt-2 max-w-xl text-muted-foreground">
        One hour on the free model, enough for a couple of full mock sessions or a real call. No
        card, no bank details.
      </p>
      <DownloadCta size="lg" className="mt-6">
        Start with a free mock interview
        <ArrowRight />
      </DownloadCta>
    </div>
  </Section>
);

export default BenefitsSection;
