import * as React from 'react';

import { cn } from '@/lib/utils';

interface GlowProps {
  /** Where the light falls from. */
  position?: 'top' | 'center' | 'bottom';
  intensity?: 'subtle' | 'medium' | 'strong';
  className?: string;
}

const INTENSITY_OPACITY = {
  subtle: 'opacity-40',
  medium: 'opacity-70',
  strong: 'opacity-100',
} as const;

const POSITION_CLASS = {
  top: '-top-1/3 h-[80%]',
  center: 'top-0 h-full',
  bottom: 'bottom-0 h-[70%]',
} as const;

/**
 * Decorative ambient wash for hero and CTA surfaces.
 *
 * Absolutely positioned and `aria-hidden`, so the parent needs `relative` (or
 * the `isolate` that <Section> already sets). The glow itself is defined as a
 * component class in src/styles/index.css rather than inline gradients so both
 * themes drive it from the single --glow token.
 */
const Glow: React.FC<GlowProps> = ({ position = 'top', intensity = 'medium', className }) => (
  <div
    aria-hidden="true"
    className={cn(
      'pointer-events-none absolute inset-x-0 -z-10 overflow-hidden',
      POSITION_CLASS[position],
      className
    )}
  >
    <div className={cn('glow-surface absolute inset-0', INTENSITY_OPACITY[intensity])} />
  </div>
);

export { Glow };
