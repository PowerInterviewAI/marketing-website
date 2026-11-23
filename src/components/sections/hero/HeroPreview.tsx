'use client';

import React, { useEffect, useState } from 'react';

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

type Mode = 'mock' | 'live';
type Labels = ReturnType<typeof useMessages>['hero']['surface'];

const CYCLE_MS = 4200;
const RING_RADIUS = 34;
const RING_LENGTH = 2 * Math.PI * RING_RADIUS;
const FOCUS =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card';

const ScoreRing: React.FC<{ active: boolean }> = ({ active }) => (
  <div className="relative size-20 shrink-0">
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
    <span className="absolute inset-0 flex items-center justify-center font-mono text-2xl font-medium">
      {HERO_DEMO_SCORE}
    </span>
  </div>
);

const MockPane: React.FC<{ item: HeroDemoLanguage; labels: Labels; active: boolean }> = ({
  item,
  labels,
  active,
}) => (
  <div dir={item.dir} className="flex h-full flex-col gap-3">
    <div>
      <p className="text-xs font-medium text-muted-foreground">{labels.interviewer}</p>
      <p lang={item.code} dir={item.dir} className="mt-1 text-lg font-semibold leading-snug">
        {item.question}
      </p>
    </div>
    <div className="rounded-lg border border-border bg-surface-1 p-3">
      <p className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
        <Mic className="size-3 text-primary" aria-hidden="true" />
        {labels.you}
      </p>
      <p lang={item.code} dir={item.dir} className="mt-1 text-sm leading-relaxed">
        {item.answer}
      </p>
    </div>
    <div className="mt-auto flex items-center gap-4 rounded-lg border border-border bg-surface-1 p-3">
      <ScoreRing active={active} />
      <dl className="min-w-0 flex-1 space-y-2 text-sm">
        <div>
          <dt className="text-xs font-medium text-success">{labels.strength}</dt>
          <dd lang={item.code} dir={item.dir}>
            {item.strength}
          </dd>
        </div>
        <div>
          <dt className="text-xs font-medium text-primary">{labels.gap}</dt>
          <dd lang={item.code} dir={item.dir}>
            {item.gap}
          </dd>
        </div>
      </dl>
      <span className="sr-only">
        {labels.score}: {HERO_DEMO_SCORE}
      </span>
    </div>
  </div>
);

const LivePane: React.FC<{ item: HeroDemoLanguage; labels: Labels }> = ({ item, labels }) => (
  <div dir={item.dir} className="flex h-full flex-col gap-3">
    <div>
      <p className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
        <span className="size-1.5 rounded-full bg-success" aria-hidden="true" />
        {labels.interviewer}
      </p>
      <p lang={item.code} dir={item.dir} className="mt-1 text-lg font-semibold leading-snug">
        {item.question}
      </p>
    </div>
    <div className="mt-auto rounded-lg border border-primary/30 bg-primary/5 p-4">
      <p className="flex items-center gap-1.5 text-xs font-medium text-primary">
        <Lightbulb className="size-3.5" aria-hidden="true" />
        {labels.suggestion}
      </p>
      <p lang={item.code} dir={item.dir} className="mt-2 text-lg font-semibold">
        {item.hint}
      </p>
      <ul lang={item.code} dir={item.dir} className="mt-2 space-y-1 text-sm">
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

/**
 * The hero's proof: one interview, in the visitor's language.
 *
 * Every pane stays in the same grid cell so the tallest language sets the
 * height and switching never moves the page. The automatic tour stops for good
 * on the first choice, because the visitor is then reading their own language.
 */
export const HeroPreview: React.FC<{ className?: string }> = ({ className }) => {
  const locale = useLocale();
  const t = useMessages().hero.surface;
  const [mode, setMode] = useState<Mode>('mock');
  const [code, setCode] = useState<string>(
    HERO_DEMO_LANGUAGES.some((item) => item.code === locale) ? locale : 'en'
  );
  const [playing, setPlaying] = useState(false);
  const [browserCode, setBrowserCode] = useState<string | null>(null);

  useEffect(() => {
    const browser = navigator.language.split('-')[0].toLowerCase();
    if (HERO_DEMO_LANGUAGES.some((item) => item.code === browser)) setBrowserCode(browser);
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) setPlaying(true);
  }, []);

  useEffect(() => {
    if (!playing) return;

    const timer = window.setInterval(() => {
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

  const chooseMode = (next: Mode) => {
    setMode(next);
    track('hero_mode_select', { mode: next });
  };

  return (
    <div
      role="group"
      aria-label={t.preview}
      className={cn(
        'overflow-hidden rounded-xl border border-border-strong bg-card shadow-elevation-3',
        className
      )}
    >
      <div className="flex items-center justify-between gap-3 border-b border-border p-2">
        <div className="flex min-w-0 gap-1 rounded-lg bg-muted p-1">
          {(['mock', 'live'] as const).map((item) => (
            <button
              key={item}
              type="button"
              aria-pressed={mode === item}
              onClick={() => chooseMode(item)}
              className={cn(
                'min-h-8 truncate rounded-md px-3 text-xs font-semibold transition-colors',
                FOCUS,
                mode === item
                  ? 'bg-card text-foreground shadow-elevation-1'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              {t[item]}
            </button>
          ))}
        </div>
        <div className="flex shrink-0 items-center gap-2 pr-1 text-xs text-muted-foreground">
          <span>{t.sample}</span>
          <span className="hidden font-mono sm:inline">
            {format(t.question, HERO_DEMO_QUESTION)}
          </span>
        </div>
      </div>

      <div className="border-b border-border p-2">
        <div className="flex items-start gap-1">
          <div
            role="group"
            aria-label={t.language}
            className="flex min-w-0 flex-1 gap-1 overflow-x-auto [scrollbar-width:none] sm:flex-wrap"
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
      </div>

      <div className="grid p-4">
        {HERO_DEMO_LANGUAGES.flatMap((item) =>
          (['mock', 'live'] as const).map((paneMode) => {
            const active = item.code === code && paneMode === mode;
            return (
              <div
                key={`${item.code}-${paneMode}`}
                aria-hidden={!active}
                className={cn(
                  'transition-opacity duration-300 [grid-area:1/1]',
                  active ? 'visible opacity-100' : 'invisible opacity-0'
                )}
              >
                {paneMode === 'mock' ? (
                  <MockPane item={item} labels={t} active={active} />
                ) : (
                  <LivePane item={item} labels={t} />
                )}
              </div>
            );
          })
        )}
      </div>

      <LocalizedLink
        href={ROUTES.languages}
        prefetch={false}
        data-track="languages_link"
        data-placement="hero_preview"
        className="flex items-center justify-center gap-1.5 border-t border-border p-2.5 text-xs font-semibold text-primary transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring"
      >
        {format(t.allLanguages, { count: LANGUAGE_COUNT.toLocaleString(locale) })}
        <ArrowRight className="size-3.5 rtl:rotate-180" aria-hidden="true" />
      </LocalizedLink>
    </div>
  );
};

export default HeroPreview;
