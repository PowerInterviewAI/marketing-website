'use client';

import React, { useEffect, useRef, useState } from 'react';

import { RotateCcw } from 'lucide-react';

import type { Story } from '@/i18n/messages/en/story';
import { cn } from '@/lib/utils';

const WEAK_SCORE = 54;
const STRONG_SCORE = 82;
const UPGRADE_DELAY_MS = 900;
const COUNT_MS = 900;
const RING_RADIUS = 46;
const RING_LENGTH = 2 * Math.PI * RING_RADIUS;

/** Shows the product's core payoff: the same answer, before and after the report. */
export const AnswerUpgrade: React.FC<{ copy: Story['answer'] }> = ({ copy }) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const [improved, setImproved] = useState(false);
  const [score, setScore] = useState(WEAK_SCORE);
  const scoreRef = useRef(WEAK_SCORE);
  const replayTimer = useRef<number | undefined>(undefined);

  useEffect(() => {
    const node = rootRef.current;
    if (!node) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      scoreRef.current = STRONG_SCORE;
      setImproved(true);
      setScore(STRONG_SCORE);
      return;
    }

    let timer = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        timer = window.setTimeout(() => setImproved(true), UPGRADE_DELAY_MS);
      },
      { threshold: 0.45 }
    );
    observer.observe(node);
    return () => {
      observer.disconnect();
      window.clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    const target = improved ? STRONG_SCORE : WEAK_SCORE;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      scoreRef.current = target;
      setScore(target);
      return;
    }

    let frame = 0;
    const from = scoreRef.current;
    const started = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - started) / COUNT_MS, 1);
      const eased = 1 - (1 - progress) ** 3;
      const next = Math.round(from + (target - from) * eased);
      scoreRef.current = next;
      setScore(next);
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [improved]);

  useEffect(() => () => window.clearTimeout(replayTimer.current), []);

  const choose = (value: boolean) => {
    window.clearTimeout(replayTimer.current);
    setImproved(value);
  };

  const replay = () => {
    choose(false);
    replayTimer.current = window.setTimeout(
      () => setImproved(true),
      UPGRADE_DELAY_MS + COUNT_MS / 2
    );
  };

  const tabs = [
    { value: false, label: copy.weakLabel },
    { value: true, label: copy.strongLabel },
  ];

  return (
    <div ref={rootRef} className="surface-card rounded-2xl p-5 md:p-6">
      <p className="text-lg font-semibold leading-snug">{copy.question}</p>

      <div className="mt-4 flex items-center justify-between gap-2">
        <div className="flex min-w-0 gap-1 rounded-lg bg-muted p-1">
          {tabs.map((tab) => (
            <button
              key={tab.label}
              type="button"
              aria-pressed={improved === tab.value}
              onClick={() => choose(tab.value)}
              className={cn(
                'min-h-8 rounded-md px-3 text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                improved === tab.value
                  ? 'bg-card text-foreground shadow-elevation-1'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={replay}
          aria-label={copy.replay}
          title={copy.replay}
          className="flex size-9 shrink-0 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <RotateCcw className="size-4" aria-hidden="true" />
        </button>
      </div>

      <div className="mt-4 grid gap-5 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center">
        <div className="grid">
          {[copy.weak, copy.strong].map((text, index) => {
            const active = improved === (index === 1);
            return (
              <p
                key={text}
                aria-hidden={!active}
                className={cn(
                  'rounded-lg border p-4 text-base leading-relaxed transition-opacity duration-500 [grid-area:1/1]',
                  index === 1 ? 'border-primary/40 bg-primary/5' : 'border-border bg-surface-1',
                  active ? 'visible opacity-100' : 'invisible opacity-0'
                )}
              >
                {text}
              </p>
            );
          })}
        </div>

        <div className="relative mx-auto size-28 shrink-0">
          <svg viewBox="0 0 108 108" className="size-full -rotate-90" aria-hidden="true">
            <circle
              cx="54"
              cy="54"
              r={RING_RADIUS}
              fill="none"
              strokeWidth="8"
              className="stroke-muted"
            />
            <circle
              cx="54"
              cy="54"
              r={RING_RADIUS}
              fill="none"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={RING_LENGTH}
              strokeDashoffset={RING_LENGTH * (1 - score / 100)}
              className={improved ? 'stroke-primary' : 'stroke-muted-foreground'}
            />
          </svg>
          <span className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="font-mono text-3xl font-medium tabular-nums">{score}</span>
            <span className="sr-only">{copy.scoreLabel}</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default AnswerUpgrade;
