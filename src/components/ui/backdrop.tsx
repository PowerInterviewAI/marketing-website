import * as React from 'react';

import { cn } from '@/lib/utils';

interface BackdropProps {
  /** Slow-drifting colour fields in the brand hue. */
  aurora?: 'subtle' | 'strong';
  /** A fine texture under the content: hairline grid or dot matrix. */
  pattern?: 'grid' | 'dots';
  /** Where the texture is visible; it fades out everywhere else. */
  fade?: 'top' | 'center' | 'bottom';
  className?: string;
}

const FADE_CLASS = {
  top: 'backdrop-fade-top',
  center: 'backdrop-fade-center',
  bottom: 'backdrop-fade-bottom',
} as const;

/**
 * Decorative, animated section background - the counterweight to a page that
 * is otherwise card after card on a flat ground.
 *
 * Pure CSS (see the "Backdrop" block in src/styles/index.css) and a Server
 * Component: no client JS, no animation dependency, and every moving layer
 * animates `transform` only, so it composites on the GPU rather than
 * repainting a full-width gradient each frame. The global
 * prefers-reduced-motion rule freezes it in place.
 *
 * Absolutely positioned behind the content, so the parent needs `relative`
 * and `isolate` - which <Section> and the hero already set.
 */
const Backdrop: React.FC<BackdropProps> = ({ aurora, pattern, fade = 'center', className }) => (
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
  </div>
);

export { Backdrop };
