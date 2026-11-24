import * as React from 'react';

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
 *
 * Integer-only on purpose. The usual `fract(sin(x) * 43758.5453)` shader hash
 * is not portable: Math.sin's last bits differ between V8 builds, the multiply
 * amplifies them, and Node and the browser produced different embers - a
 * hydration mismatch, since this renders inside client components too.
 * Math.imul and shifts are exact everywhere.
 */
const noise = (i: number, salt: number) => {
  let h = Math.imul(i + 1, 0x9e3779b1) ^ Math.imul(salt + 1, 0x85ebca77);
  h = Math.imul(h ^ (h >>> 16), 0x7feb352d);
  h = Math.imul(h ^ (h >>> 15), 0x846ca68b);
  h ^= h >>> 16;
  return (h >>> 0) / 4294967296;
};
/** Rounded so the serialised style is short and identical on both sides. */
const between = (i: number, salt: number, min: number, max: number) =>
  Math.round((min + noise(i, salt) * (max - min)) * 1000) / 1000;
const percent = (n: number) => `${Math.round(n * 1000) / 1000}%`;

const BEAM_COUNT = { h: 9, v: 7 } as const;
const BEAMS = (['h', 'v'] as const).flatMap((axis) =>
  Array.from({ length: BEAM_COUNT[axis] }, (_, i) => ({
    axis,
    // Spread evenly across the section, nudged off the even spacing.
    at: percent(((i + 0.5) / BEAM_COUNT[axis]) * 100 + between(i, axis === 'h' ? 1 : 2, -3, 3)),
    duration: between(i, axis === 'h' ? 3 : 4, 6, 12),
    delay: between(i, axis === 'h' ? 5 : 6, 0, 10),
  }))
);

const EMBER_COUNT = 36;
const EMBERS = Array.from({ length: EMBER_COUNT }, (_, i) => ({
  left: percent(((i + noise(i, 7)) / EMBER_COUNT) * 100),
  size: Math.round(between(i, 8, 2, 4.6)),
  duration: between(i, 9, 11, 22),
  delay: between(i, 10, 0, 22),
  opacity: between(i, 11, 0.35, 0.75),
}));

// A dozen-plus scripts the interviewer actually runs in.
const GLYPH_SET = 'あ한عЖह中éßতΩñאกქΣ語ыç文ಕşΔ'.split('');
const GLYPHS = GLYPH_SET.map((glyph, i) => ({
  glyph,
  left: percent(((i + noise(i, 12)) / GLYPH_SET.length) * 100),
  size: Math.round(between(i, 13, 26, 52)),
  duration: between(i, 14, 20, 34),
  delay: between(i, 15, 0, 34),
}));

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
                left: ember.left,
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
                left: glyph.left,
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
  </div>
);

export { Backdrop };
