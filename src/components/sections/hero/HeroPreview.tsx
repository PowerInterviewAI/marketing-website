'use client';

import React, { useEffect, useRef, useState } from 'react';

import { ArrowRight, Lightbulb, Mic, Pause, Play } from 'lucide-react';

import {
  HERO_DEMO_LANGUAGES,
  HERO_DEMO_QUESTION,
  HERO_DEMO_SCORE,
  type HeroDemoLanguage,
} from '@/config/heroDemo';
import { LANGUAGE_COUNT } from '@/config/languages';
import { ROUTES } from '@/config/routes';
import { useLocale, useMessages } from '@/i18n/LocaleProvider';
import { LocalizedLink } from '@/i18n/LocalizedLink';
import { format } from '@/i18n/format';
import { track } from '@/lib/analytics';
import { cn } from '@/lib/utils';

type Labels = ReturnType<typeof useMessages>['hero']['surface'];

const CYCLE_MS = 4200;
const RING_RADIUS = 34;
const RING_LENGTH = 2 * Math.PI * RING_RADIUS;
const FOCUS =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card';

const ScoreRing: React.FC<{ active: boolean }> = ({ active }) => (
  <div className="relative size-16 shrink-0">
    <svg viewBox="0 0 80 80" className="size-full -rotate-90" aria-hidden="true">
      <circle
        cx="40"
        cy="40"
        r={RING_RADIUS}
        fill="none"
        strokeWidth="7"
        className="stroke-muted"
      />
      <circle
        cx="40"
        cy="40"
        r={RING_RADIUS}
        fill="none"
        strokeWidth="7"
        strokeLinecap="round"
        strokeDasharray={RING_LENGTH}
        strokeDashoffset={active ? RING_LENGTH * (1 - HERO_DEMO_SCORE / 100) : RING_LENGTH}
        className="stroke-primary transition-[stroke-dashoffset] duration-700 ease-out"
      />
    </svg>
    <span className="absolute inset-0 flex items-center justify-center font-mono text-xl font-medium">
      {HERO_DEMO_SCORE}
    </span>
  </div>
);

/** The question both sides answer: the hinge of the diptych. */
const QuestionPane: React.FC<{ item: HeroDemoLanguage }> = ({ item }) => (
  <blockquote
    lang={item.code}
    dir={item.dir}
    className="relative text-balance text-2xl font-semibold leading-snug tracking-tight sm:text-[1.75rem] lg:text-[1.65rem] xl:text-3xl"
  >
    <span aria-hidden="true" className="text-primary">
      “
    </span>
    {item.question}
    <span aria-hidden="true" className="text-primary">
      ”
    </span>
  </blockquote>
);

/** Before the call: your rehearsed answer, scored. */
const MockPane: React.FC<{ item: HeroDemoLanguage; labels: Labels; active: boolean }> = ({
  item,
  labels,
  active,
}) => (
  <div dir={item.dir} className="flex h-full flex-col gap-4">
    <div>
      <p className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
        <Mic className="size-3 text-primary" aria-hidden="true" />
        {labels.you}
      </p>
      <p lang={item.code} className="mt-1.5 text-sm leading-relaxed">
        {item.answer}
      </p>
    </div>
    <div className="mt-auto flex items-center gap-4 border-t border-dashed border-border-strong pt-4">
      <ScoreRing active={active} />
      <dl className="min-w-0 flex-1 space-y-1.5 text-sm">
        <div>
          <dt className="text-xs font-medium text-success">{labels.strength}</dt>
          <dd lang={item.code}>{item.strength}</dd>
        </div>
        <div>
          <dt className="text-xs font-medium text-primary">{labels.gap}</dt>
          <dd lang={item.code}>{item.gap}</dd>
        </div>
      </dl>
      <span className="sr-only">
        {labels.score}: {HERO_DEMO_SCORE}
      </span>
    </div>
  </div>
);

/** During the call: the talking points that appear beside it. */
const LivePane: React.FC<{ item: HeroDemoLanguage; labels: Labels }> = ({ item, labels }) => (
  <div dir={item.dir} className="flex h-full flex-col">
    <div className="rounded-lg border border-primary/30 bg-primary/[0.06] p-4">
      <p className="flex items-center gap-1.5 text-xs font-medium text-primary">
        <Lightbulb className="size-3.5" aria-hidden="true" />
        {labels.suggestion}
      </p>
      <p lang={item.code} className="mt-2 text-lg font-semibold leading-snug">
        {item.hint}
      </p>
      <ul lang={item.code} className="mt-2 space-y-1 text-sm">
        {item.hintPoints.map((point) => (
          <li key={point} className="flex items-center gap-2">
            <span className="size-1 shrink-0 rounded-full bg-primary" aria-hidden="true" />
            {point}
          </li>
        ))}
      </ul>
    </div>
  </div>
);

const LEVELS = [0.35, 0.7, 0.5, 0.95, 0.6, 0.8, 0.4, 0.65, 0.9, 0.45, 0.75, 0.3, 0.55, 0.85, 0.5];

/**
 * The call's audio as the assistant hears it: the interviewer is talking, and
 * the suggestion below is what it made of that. Decorative, so it moves only
 * while the language tour does and never under reduced motion.
 */
const CallLevel: React.FC<{ label: string; animate: boolean }> = ({ label, animate }) => (
  <div className="flex items-center gap-3 rounded-lg border border-border bg-surface-1 px-3 py-2.5">
    <span className="shrink-0 text-xs font-medium text-muted-foreground">{label}</span>
    <span className="flex h-6 flex-1 items-center gap-[3px]" aria-hidden="true">
      {LEVELS.map((level, index) => (
        <span
          key={index}
          style={{ height: `${level * 100}%`, animationDelay: `${(index % 5) * -0.18}s` }}
          className={cn(
            'w-[3px] origin-center rounded-full bg-muted-foreground/60',
            animate && 'animate-call-level motion-reduce:animate-none'
          )}
        />
      ))}
    </span>
  </div>
);

/**
 * Every language's pane in one grid cell, so the tallest sets the height and
 * the tour never moves the page. Before hydration only the active one renders,
 * so the HTML does not carry ten hidden languages search engines could read as
 * the page's content.
 */
function Stack({
  code,
  mounted,
  render,
}: {
  code: string;
  mounted: boolean;
  render: (item: HeroDemoLanguage, active: boolean) => React.ReactNode;
}) {
  return (
    <div className="grid">
      {HERO_DEMO_LANGUAGES.map((item) => {
        const active = item.code === code;
        if (!mounted && !active) return null;
        return (
          <div
            key={item.code}
            aria-hidden={!active}
            className={cn(
              'transition-opacity duration-300 [grid-area:1/1]',
              active ? 'visible opacity-100' : 'invisible opacity-0'
            )}
          >
            {render(item, active)}
          </div>
        );
      })}
    </div>
  );
}

const Wing: React.FC<{
  side: 'before' | 'during';
  tag: string;
  title: string;
  className?: string;
  children: React.ReactNode;
}> = ({ side, tag, title, className, children }) => (
  <div className={cn('flex min-w-0 flex-col gap-4 p-5 sm:p-6', className)}>
    <p className="flex items-baseline gap-2 text-sm">
      <span className="flex items-center gap-1.5 font-mono text-xs font-medium uppercase tracking-wider text-primary">
        {side === 'during' && (
          <span className="relative flex size-1.5" aria-hidden="true">
            <span className="absolute inset-0 animate-ping rounded-full bg-success opacity-75 motion-reduce:hidden" />
            <span className="relative size-1.5 rounded-full bg-success" />
          </span>
        )}
        {tag}
      </span>
      <span className="font-semibold">{title}</span>
    </p>
    {children}
  </div>
);

/**
 * The hero's proof, laid out as a diptych around one interview question: the
 * mock interview answers it before the call, the live assistant during it.
 * Both modes are on screen at once, left to right in the order a candidate
 * meets them, and the language tour changes all three panels together.
 *
 * The automatic tour pauses off screen and stops for good on the first choice.
 */
export const HeroPreview: React.FC<{ className?: string }> = ({ className }) => {
  const locale = useLocale();
  const t = useMessages().hero.surface;
  const [code, setCode] = useState<string>(
    HERO_DEMO_LANGUAGES.some((item) => item.code === locale) ? locale : 'en'
  );
  const [playing, setPlaying] = useState(false);
  const [browserCode, setBrowserCode] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const chipsRef = useRef<HTMLDivElement>(null);
  const onScreenRef = useRef(true);

  useEffect(() => {
    setMounted(true);
    const browser = navigator.language.split('-')[0].toLowerCase();
    if (HERO_DEMO_LANGUAGES.some((item) => item.code === browser)) setBrowserCode(browser);
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) setPlaying(true);

    const root = rootRef.current;
    if (!root) return;
    const observer = new IntersectionObserver(([entry]) => {
      onScreenRef.current = entry.isIntersecting;
    });
    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  // On phones the chips scroll sideways, and the tour must not select one out of sight.
  useEffect(() => {
    const chips = chipsRef.current;
    const chip = chips?.querySelector<HTMLElement>('[aria-pressed="true"]');
    if (!chips || !chip || chips.scrollWidth <= chips.clientWidth) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    chips.scrollTo({
      left: chip.offsetLeft - (chips.clientWidth - chip.offsetWidth) / 2,
      behavior: reduced ? 'auto' : 'smooth',
    });
  }, [code]);

  useEffect(() => {
    if (!playing) return;

    const timer = window.setInterval(() => {
      if (document.hidden || !onScreenRef.current) return;
      setCode((current) => {
        const index = HERO_DEMO_LANGUAGES.findIndex((item) => item.code === current);
        return HERO_DEMO_LANGUAGES[(index + 1) % HERO_DEMO_LANGUAGES.length].code;
      });
    }, CYCLE_MS);
    return () => window.clearInterval(timer);
  }, [playing]);

  const chooseLanguage = (next: string) => {
    setPlaying(false);
    setCode(next);
    track('hero_language_select', { language: next });
  };

  return (
    <div
      ref={rootRef}
      role="group"
      aria-label={t.preview}
      className={cn(
        'surface-card grid overflow-hidden rounded-2xl',
        'lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)_minmax(0,1fr)]',
        className
      )}
    >
      {/* The hinge: first on a phone, in the middle on a wide screen. */}
      <div className="flex min-w-0 flex-col gap-5 border-b border-border bg-surface-1 p-5 sm:p-6 lg:order-2 lg:border-x lg:border-b-0">
        <div className="flex items-center justify-between gap-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-2 font-medium">
            <span className="size-1.5 rounded-full bg-primary" aria-hidden="true" />
            {t.interviewer}
          </span>
          <span className="font-mono">{format(t.question, HERO_DEMO_QUESTION)}</span>
        </div>

        <Stack code={code} mounted={mounted} render={(item) => <QuestionPane item={item} />} />

        <div className="mt-auto flex items-start gap-1 border-t border-border pt-4">
          <div
            ref={chipsRef}
            role="group"
            aria-label={t.language}
            className="relative flex min-w-0 flex-1 gap-1 overflow-x-auto [scrollbar-width:none] sm:flex-wrap"
          >
            {HERO_DEMO_LANGUAGES.map((item) => (
              <button
                key={item.code}
                type="button"
                lang={item.code}
                aria-pressed={code === item.code}
                title={browserCode === item.code ? t.yours : undefined}
                onClick={() => chooseLanguage(item.code)}
                className={cn(
                  'relative min-h-8 shrink-0 rounded-md px-2.5 text-xs font-medium transition-colors',
                  FOCUS,
                  code === item.code
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:bg-accent hover:text-foreground'
                )}
              >
                {item.label}
                {browserCode === item.code && code !== item.code && (
                  <span
                    className="absolute right-1 top-1 size-1 rounded-full bg-primary"
                    aria-hidden="true"
                  />
                )}
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={() => setPlaying((value) => !value)}
            aria-label={playing ? t.pauseLanguages : t.playLanguages}
            title={playing ? t.pauseLanguages : t.playLanguages}
            className={cn(
              'flex size-8 shrink-0 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground',
              FOCUS
            )}
          >
            {playing ? <Pause className="size-3.5" /> : <Play className="size-3.5" />}
          </button>
        </div>
        <LocalizedLink
          href={ROUTES.languages}
          prefetch={false}
          data-track="languages_link"
          data-placement="hero_preview"
          className="-mt-2 flex w-fit items-center gap-1.5 rounded text-xs font-semibold text-primary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          {format(t.allLanguages, { count: LANGUAGE_COUNT.toLocaleString(locale) })}
          <ArrowRight className="size-3.5 rtl:rotate-180" aria-hidden="true" />
        </LocalizedLink>
      </div>

      <Wing
        side="before"
        tag={t.before}
        title={t.mock}
        className="border-b border-border lg:order-1 lg:border-b-0"
      >
        <Stack
          code={code}
          mounted={mounted}
          render={(item, active) => <MockPane item={item} labels={t} active={active} />}
        />
      </Wing>

      <Wing side="during" tag={t.during} title={t.live} className="lg:order-3">
        <CallLevel label={t.interviewer} animate={playing} />
        <div className="lg:mt-auto">
          <Stack
            code={code}
            mounted={mounted}
            render={(item) => <LivePane item={item} labels={t} />}
          />
        </div>
      </Wing>
    </div>
  );
};

export default HeroPreview;
