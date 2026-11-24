import * as React from 'react';

import { Sparkles } from 'lucide-react';

import { cn } from '@/lib/utils';

interface BackdropProps {
  /** Slow-drifting colour fields in the brand hue. */
  aurora?: 'subtle' | 'strong';
  /** A fine texture under the content: hairline grid or dot matrix. */
  pattern?: 'grid' | 'dots';
  /** Where the texture is visible; it fades out everywhere else. */
  fade?: 'top' | 'center' | 'bottom';
  /** Streaks of light running along hairlines, now and then. */
  beams?: boolean;
  /** Small glowing embers drifting upwards. */
  embers?: boolean;
  /** Letters from a dozen scripts drifting upwards - for the languages section. */
  glyphs?: boolean;
  /** Glass fragments of the product drifting in the side margins (wide screens only). */
  floaters?: boolean;
  className?: string;
}

const FADE_CLASS = {
  top: 'backdrop-fade-top',
  center: 'backdrop-fade-center',
  bottom: 'backdrop-fade-bottom',
} as const;

type Vars = React.CSSProperties & Record<`--${string}`, string>;

// Fixed tables rather than Math.random(): the server and the client must
// render the same markup, and a fixed layout can be tuned by eye.
const BEAMS: { axis: 'h' | 'v'; at: string; duration: number; delay: number }[] = [
  { axis: 'h', at: '18%', duration: 9, delay: 0 },
  { axis: 'h', at: '46%', duration: 12, delay: 4 },
  { axis: 'h', at: '78%', duration: 10, delay: 7 },
  { axis: 'v', at: '14%', duration: 11, delay: 2 },
  { axis: 'v', at: '63%', duration: 13, delay: 6 },
  { axis: 'v', at: '88%', duration: 9, delay: 9 },
];

const EMBERS = [
  [4, 3, 14, 0, 0.7],
  [11, 2, 18, 5, 0.5],
  [19, 4, 16, 9, 0.6],
  [27, 2, 21, 2, 0.45],
  [36, 3, 17, 12, 0.6],
  [44, 2, 23, 7, 0.4],
  [52, 3, 15, 3, 0.65],
  [61, 2, 19, 10, 0.5],
  [69, 4, 22, 6, 0.55],
  [77, 2, 16, 14, 0.45],
  [85, 3, 20, 1, 0.6],
  [93, 2, 18, 8, 0.5],
].map(([left, size, duration, delay, opacity]) => ({ left, size, duration, delay, opacity }));

const GLYPHS = [
  ['あ', 6, 30, 0],
  ['한', 15, 26, 9],
  ['ع', 24, 34, 4],
  ['Ж', 33, 28, 14],
  ['ह', 42, 32, 2],
  ['中', 51, 27, 11],
  ['é', 60, 31, 6],
  ['ß', 68, 29, 16],
  ['ত', 76, 33, 1],
  ['Ω', 84, 26, 8],
  ['ñ', 92, 30, 13],
] as const;

/** A tiny live-audio waveform; bars reuse the `call-level` keyframe. */
const Waveform: React.FC = () => (
  <span className="flex h-5 items-center gap-[3px]">
    {[0.55, 0.9, 0.4, 1, 0.65, 0.85, 0.5].map((height, index) => (
      <span
        key={index}
        className="w-[3px] origin-center animate-call-level rounded-full bg-primary"
        style={{ height: `${height * 100}%`, animationDelay: `${index * -0.13}s` }}
      />
    ))}
  </span>
);

const ScoreRing: React.FC = () => (
  <span className="relative flex size-14 items-center justify-center">
    <svg viewBox="0 0 36 36" className="absolute inset-0 -rotate-90">
      <circle cx="18" cy="18" r="15" fill="none" strokeWidth="3" className="stroke-foreground/10" />
      <circle
        cx="18"
        cy="18"
        r="15"
        fill="none"
        strokeWidth="3"
        strokeLinecap="round"
        strokeDasharray="77 94"
        className="stroke-primary"
      />
    </svg>
    <span className="text-sm font-bold tabular-nums">82</span>
  </span>
);

/**
 * No words in the floaters - they are on every locale's hero and are not
 * translated. Numbers, endonyms and a waveform read the same everywhere.
 */
const FLOATERS: { style: Vars; content: React.ReactNode; className?: string }[] = [
  {
    style: { left: '1%', top: '14%', '--float-d': '9s', '--float-y': '-14px' },
    content: <Waveform />,
    className: 'rounded-full px-4 py-3',
  },
  {
    style: { left: '1.2%', top: '60%', '--float-d': '11s', '--float-y': '12px', rotate: '-6deg' },
    content: <ScoreRing />,
    className: 'rounded-2xl p-2',
  },
  {
    style: { right: '1%', top: '10%', '--float-d': '10s', '--float-y': '10px', rotate: '5deg' },
    content: <span className="text-sm font-semibold">日本語</span>,
    className: 'rounded-full px-4 py-2',
  },
  {
    style: { right: '1.4%', top: '42%', '--float-d': '12s', '--float-y': '-12px', rotate: '-4deg' },
    content: <Sparkles className="size-5 text-primary" />,
    className: 'rounded-xl p-3',
  },
  {
    style: { right: '0.8%', top: '74%', '--float-d': '8s', '--float-y': '9px', rotate: '3deg' },
    content: <span className="text-sm font-semibold">Español</span>,
    className: 'rounded-full px-4 py-2',
  },
];

/**
 * Decorative, animated section background - the counterweight to a page that
 * is otherwise card after card on a flat ground.
 *
 * Pure CSS (see the "Backdrop" block in src/styles/index.css) and a Server
 * Component: no client JS, no animation dependency, and every moving layer
 * animates transform or opacity only, so it composites on the GPU rather than
 * repainting each frame. The global prefers-reduced-motion rule freezes it.
 *
 * Absolutely positioned behind the content, so the parent needs `relative`
 * and `isolate` - which <Section> and the hero already set.
 */
const Backdrop: React.FC<BackdropProps> = ({
  aurora,
  pattern,
  fade = 'center',
  beams,
  embers,
  glyphs,
  floaters,
  className,
}) => (
  <div
    aria-hidden="true"
    className={cn('pointer-events-none absolute inset-0 -z-10 overflow-hidden', className)}
  >
    {aurora && (
      <div className={cn('absolute inset-0', aurora === 'subtle' ? 'opacity-50' : 'opacity-100')}>
        <div className="backdrop-aurora backdrop-aurora-a" />
        <div className="backdrop-aurora backdrop-aurora-b" />
        <div className="backdrop-aurora backdrop-aurora-c" />
      </div>
    )}
    {pattern && (
      <div className={cn('absolute inset-0', FADE_CLASS[fade])}>
        <div className={pattern === 'grid' ? 'backdrop-grid' : 'backdrop-dots'} />
      </div>
    )}
    {beams && (
      <div className={cn('absolute inset-0', FADE_CLASS[fade])}>
        {BEAMS.map((beam, index) => (
          <span
            key={index}
            className={beam.axis === 'h' ? 'backdrop-beam-h' : 'backdrop-beam-v'}
            style={
              {
                [beam.axis === 'h' ? 'top' : 'left']: beam.at,
                '--beam-d': `${beam.duration}s`,
                '--beam-delay': `${beam.delay}s`,
              } as Vars
            }
          />
        ))}
      </div>
    )}
    {embers && (
      <div className="backdrop-rise">
        {EMBERS.map((ember, index) => (
          <span
            key={index}
            className="backdrop-ember"
            style={
              {
                left: `${ember.left}%`,
                '--size': `${ember.size}px`,
                '--rise-d': `${ember.duration}s`,
                '--rise-delay': `-${ember.delay}s`,
                '--rise-o': `${ember.opacity}`,
                '--sway': `${index % 2 ? 18 : -18}px`,
              } as Vars
            }
          />
        ))}
      </div>
    )}
    {glyphs && (
      <div className="backdrop-rise">
        {GLYPHS.map(([glyph, left, duration, delay], index) => (
          <span
            key={glyph}
            className="backdrop-glyph"
            style={
              {
                left: `${left}%`,
                fontSize: `${index % 3 === 0 ? 44 : index % 3 === 1 ? 30 : 36}px`,
                '--rise-d': `${duration}s`,
                '--rise-delay': `-${delay}s`,
                '--rise-o': '1',
                '--sway': `${index % 2 ? 24 : -24}px`,
              } as Vars
            }
          >
            {glyph}
          </span>
        ))}
      </div>
    )}
    {floaters && (
      <div className="absolute inset-0 hidden min-[1440px]:block">
        {FLOATERS.map((floater, index) => (
          <div
            key={index}
            className={cn('glass-panel backdrop-floater', floater.className)}
            style={floater.style}
          >
            {floater.content}
          </div>
        ))}
      </div>
    )}
  </div>
);

export { Backdrop };
