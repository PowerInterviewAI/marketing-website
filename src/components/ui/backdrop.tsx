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

/**
 * Deterministic 0..1 noise from an index: the same layout on every render
 * (Math.random() would differ between server and client), dense enough that
 * nobody tunes forty entries by hand, and stable when the counts change.
 */
const noise = (i: number, salt: number) => {
  const x = Math.sin(i * 12.9898 + salt * 78.233) * 43758.5453;
  return x - Math.floor(x);
};
const between = (i: number, salt: number, min: number, max: number) =>
  min + noise(i, salt) * (max - min);

const BEAM_COUNT = { h: 9, v: 7 } as const;
const BEAMS = (['h', 'v'] as const).flatMap((axis) =>
  Array.from({ length: BEAM_COUNT[axis] }, (_, i) => ({
    axis,
    // Spread evenly across the section, nudged off the even spacing.
    at: `${((i + 0.5) / BEAM_COUNT[axis]) * 100 + between(i, axis === 'h' ? 1 : 2, -3, 3)}%`,
    duration: between(i, axis === 'h' ? 3 : 4, 6, 12),
    delay: between(i, axis === 'h' ? 5 : 6, 0, 10),
  }))
);

const EMBER_COUNT = 36;
const EMBERS = Array.from({ length: EMBER_COUNT }, (_, i) => ({
  left: ((i + noise(i, 7)) / EMBER_COUNT) * 100,
  size: Math.round(between(i, 8, 2, 4.6)),
  duration: between(i, 9, 11, 22),
  delay: between(i, 10, 0, 22),
  opacity: between(i, 11, 0.35, 0.75),
}));

// A dozen-plus scripts the interviewer actually runs in.
const GLYPH_SET = 'あ한عЖह中éßতΩñאกქΣ語ыç文ಕşΔ'.split('');
const GLYPHS = GLYPH_SET.map((glyph, i) => ({
  glyph,
  left: ((i + noise(i, 12)) / GLYPH_SET.length) * 100,
  size: Math.round(between(i, 13, 26, 52)),
  duration: between(i, 14, 20, 34),
  delay: between(i, 15, 0, 34),
}));

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
const chip = (text: string) => <span className="text-sm font-semibold">{text}</span>;
const pill = 'rounded-full px-4 py-2';

const FLOATERS: { style: Vars; content: React.ReactNode; className?: string }[] = [
  // Left margin
  {
    style: { left: '1%', top: '8%', '--float-d': '9s', '--float-y': '-14px' },
    content: <Waveform />,
    className: 'rounded-full px-4 py-3',
  },
  {
    style: { left: '2.2%', top: '28%', '--float-d': '12s', '--float-y': '10px', rotate: '4deg' },
    content: chip('한국어'),
    className: pill,
  },
  {
    style: { left: '1.2%', top: '47%', '--float-d': '11s', '--float-y': '12px', rotate: '-6deg' },
    content: <ScoreRing />,
    className: 'rounded-2xl p-2',
  },
  {
    style: { left: '2.6%', top: '68%', '--float-d': '10s', '--float-y': '-10px', rotate: '-3deg' },
    content: chip('Deutsch'),
    className: pill,
  },
  {
    style: { left: '0.8%', top: '86%', '--float-d': '13s', '--float-y': '8px', rotate: '5deg' },
    content: <Sparkles className="size-5 text-primary" />,
    className: 'rounded-xl p-3',
  },
  // Right margin
  {
    style: { right: '1%', top: '6%', '--float-d': '10s', '--float-y': '10px', rotate: '5deg' },
    content: chip('日本語'),
    className: pill,
  },
  {
    style: { right: '2.4%', top: '24%', '--float-d': '12s', '--float-y': '-12px', rotate: '-4deg' },
    content: <Sparkles className="size-5 text-primary" />,
    className: 'rounded-xl p-3',
  },
  {
    style: { right: '0.8%', top: '42%', '--float-d': '9s', '--float-y': '11px', rotate: '3deg' },
    content: <Waveform />,
    className: 'rounded-full px-4 py-3',
  },
  {
    style: { right: '2%', top: '60%', '--float-d': '8s', '--float-y': '9px', rotate: '3deg' },
    content: chip('Español'),
    className: pill,
  },
  {
    style: { right: '1.2%', top: '78%', '--float-d': '11s', '--float-y': '-9px', rotate: '-5deg' },
    content: chip('العربية'),
    className: pill,
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
        {GLYPHS.map((glyph, index) => (
          <span
            key={glyph.glyph}
            className="backdrop-glyph"
            style={
              {
                left: `${glyph.left}%`,
                fontSize: `${glyph.size}px`,
                '--rise-d': `${glyph.duration}s`,
                '--rise-delay': `-${glyph.delay}s`,
                '--rise-o': '1',
                '--sway': `${index % 2 ? 24 : -24}px`,
              } as Vars
            }
          >
            {glyph.glyph}
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
