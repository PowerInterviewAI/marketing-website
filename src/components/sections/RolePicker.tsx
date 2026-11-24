'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';

import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import Image from 'next/image';

import { format } from '@/i18n/format';
import type { Story } from '@/i18n/messages/en/story';
import { track } from '@/lib/analytics';
import { cn } from '@/lib/utils';

type RoleId = keyof Story['roles']['items'];

const ROLES: RoleId[] = ['sales', 'nurse', 'teacher', 'finance', 'developer'];

/** How long each slide stays up while the show is playing. */
const SLIDE_MS = 8000;
/** A horizontal drag longer than this, in px, turns the slide. */
const SWIPE_PX = 48;

const FOCUS =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background';

/**
 * The roles as a slide show. Each still pairs a generated, fictional candidate
 * with the real app's score card; the question stays in HTML so it is
 * translated. Stills rather than the role clips: the slide show already moves,
 * and a looping video inside a moving slide competed with the question for
 * attention. Each slide carries a 16:9 desktop and a 4:5 phone crop, and the
 * one hidden by the breakpoint is never fetched (lazy images skip
 * `display: none`).
 *
 * The show advances on the progress bar's `animationend`, so pausing the bar
 * pauses the show: it holds while the pointer or focus is inside, while it is
 * off screen or the tab is hidden, and never starts under reduced motion. The
 * pause button is there because moving content that runs longer than five
 * seconds needs one (WCAG 2.2.2).
 */
export const RolePicker: React.FC<{ copy: Story['roles'] }> = ({ copy }) => {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [held, setHeld] = useState(false);
  const [visible, setVisible] = useState(false);
  const [pageHidden, setPageHidden] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const dragStart = useRef<{ x: number; y: number } | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  // Off-screen slides must not take focus. React 18 has no `inert` prop, so
  // the attribute is set directly.
  useEffect(() => {
    Array.from(trackRef.current?.children ?? []).forEach((slide, i) =>
      slide.toggleAttribute('inert', i !== index)
    );
  }, [index]);

  useEffect(() => {
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) setPlaying(true);

    const onVisibility = () => setPageHidden(document.hidden);
    document.addEventListener('visibilitychange', onVisibility);

    const root = rootRef.current;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), {
      threshold: 0.35,
    });
    if (root) observer.observe(root);

    return () => {
      document.removeEventListener('visibilitychange', onVisibility);
      observer.disconnect();
    };
  }, []);

  const goTo = useCallback((next: number, source: string) => {
    const wrapped = (next + ROLES.length) % ROLES.length;
    setIndex(wrapped);
    if (source !== 'auto') track('role_select', { role: ROLES[wrapped], source });
  }, []);

  const step = (delta: number, source: string) => goTo(index + delta, source);

  const isRtl = () => rootRef.current?.closest('[dir]')?.getAttribute('dir') === 'rtl';

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
    event.preventDefault();
    const forward = event.key === 'ArrowRight' ? 1 : -1;
    step(isRtl() ? -forward : forward, 'key');
  };

  const onPointerDown = (event: React.PointerEvent) => {
    dragStart.current = { x: event.clientX, y: event.clientY };
  };

  const onPointerUp = (event: React.PointerEvent) => {
    const start = dragStart.current;
    dragStart.current = null;
    if (!start) return;
    const dx = event.clientX - start.x;
    if (Math.abs(dx) < SWIPE_PX || Math.abs(dx) < Math.abs(event.clientY - start.y)) return;
    const forward = dx < 0 ? 1 : -1;
    step(isRtl() ? -forward : forward, 'swipe');
  };

  const running = playing && !held && visible && !pageHidden;
  const role = ROLES[index];

  return (
    <div
      ref={rootRef}
      role="region"
      aria-roledescription="carousel"
      aria-label={copy.eyebrow}
      onKeyDown={onKeyDown}
      onPointerEnter={(event) => event.pointerType === 'mouse' && setHeld(true)}
      onPointerLeave={() => setHeld(false)}
      onFocus={() => setHeld(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setHeld(false);
      }}
      className="mx-auto mt-10 max-w-md lg:max-w-5xl"
    >
      <div className="surface-card overflow-hidden rounded-2xl">
        <div
          ref={trackRef}
          aria-live={running ? 'off' : 'polite'}
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
          onPointerCancel={() => (dragStart.current = null)}
          style={{ '--slide': index } as React.CSSProperties}
          className="flex touch-pan-y transition-transform duration-500 ease-out [transform:translateX(calc(var(--slide)*-100%))] motion-reduce:transition-none rtl:[transform:translateX(calc(var(--slide)*100%))]"
        >
          {ROLES.map((id, i) => {
            const active = i === index;
            return (
              <figure
                key={id}
                role="group"
                aria-roledescription="slide"
                aria-label={`${copy.items[id].label} - ${format(copy.controls.slide, {
                  n: i + 1,
                  total: ROLES.length,
                })}`}
                aria-hidden={!active}
                className="w-full shrink-0"
              >
                <div className="relative hidden aspect-video bg-black lg:block">
                  <Image
                    src={`/media/roles/${id}.webp`}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 1024px, 100vw"
                    className="object-cover"
                  />
                </div>
                <div className="relative aspect-[4/5] bg-black lg:hidden">
                  <Image
                    src={`/media/roles/${id}-mobile.webp`}
                    alt=""
                    fill
                    sizes="(min-width: 448px) 448px, 100vw"
                    className="object-cover"
                  />
                </div>
                <figcaption className="border-t border-border p-4 md:px-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                    {copy.items[id].label} · {copy.sample}
                  </p>
                  <p className="mt-1 text-balance text-lg font-semibold leading-snug">
                    {copy.items[id].question}
                  </p>
                </figcaption>
              </figure>
            );
          })}
        </div>

        {/* Arrows sit over the picture, clear of the caption below it. */}
        {(
          [
            { delta: -1, label: copy.controls.previous, Icon: ChevronLeft, side: 'start-3' },
            { delta: 1, label: copy.controls.next, Icon: ChevronRight, side: 'end-3' },
          ] as const
        ).map(({ delta, label, Icon, side }) => (
          <button
            key={delta}
            type="button"
            aria-label={label}
            title={label}
            onClick={() => step(delta, 'arrow')}
            className={cn(
              'absolute top-[40%] flex size-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/55 text-white backdrop-blur transition-colors hover:bg-black/75 lg:top-[42%]',
              side,
              FOCUS
            )}
          >
            <Icon className="size-5 rtl:rotate-180" aria-hidden="true" />
          </button>
        ))}
      </div>

      <div className="mt-4 flex items-center gap-2">
        <div
          role="group"
          aria-label={copy.eyebrow}
          className="flex min-w-0 flex-1 gap-2 overflow-x-auto pb-1 [scrollbar-width:none]"
        >
          {ROLES.map((id, i) => {
            const active = i === index;
            return (
              <button
                key={id}
                type="button"
                aria-pressed={active}
                onClick={() => goTo(i, 'tab')}
                className={cn(
                  'group relative min-h-10 min-w-[5.5rem] flex-1 shrink-0 overflow-hidden rounded-lg border px-3 text-sm font-semibold transition-colors',
                  FOCUS,
                  active
                    ? 'border-primary/60 bg-primary/10 text-foreground'
                    : 'border-border bg-card text-muted-foreground hover:border-border-strong hover:text-foreground'
                )}
              >
                {copy.items[id].label}
                <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-0.5 bg-border" />
                {active && (
                  <span
                    // Re-keyed per slide so the bar restarts from empty.
                    key={`${role}-${playing}`}
                    aria-hidden="true"
                    onAnimationEnd={() => goTo(index + 1, 'auto')}
                    style={{
                      animationDuration: `${SLIDE_MS}ms`,
                      animationPlayState: running ? 'running' : 'paused',
                    }}
                    className={cn(
                      'absolute inset-x-0 bottom-0 h-0.5 bg-primary',
                      playing
                        ? 'origin-left animate-[slide-progress_linear_forwards] rtl:origin-right'
                        : ''
                    )}
                  />
                )}
              </button>
            );
          })}
        </div>

        <button
          type="button"
          onClick={() => setPlaying((value) => !value)}
          aria-label={playing ? copy.controls.pause : copy.controls.play}
          title={playing ? copy.controls.pause : copy.controls.play}
          className={cn(
            'flex size-10 shrink-0 items-center justify-center rounded-lg border border-border bg-card text-muted-foreground transition-colors hover:border-border-strong hover:text-foreground',
            FOCUS
          )}
        >
          {playing ? <Pause className="size-4" /> : <Play className="size-4" />}
        </button>
      </div>
    </div>
  );
};

export default RolePicker;
