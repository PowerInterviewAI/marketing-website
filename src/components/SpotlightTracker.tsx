'use client';

import { useEffect } from 'react';

/**
 * Feeds the pointer position to whichever `.surface-card` is under it, as
 * --mx / --my, for the card's spotlight (see "Modern surfaces" in
 * src/styles/index.css).
 *
 * One passive listener on the document instead of a handler per card: the
 * cards stay Server Components and the cost is one closest() lookup per
 * animation frame. Mouse and pen only - on touch there is no hover to light.
 */
export function SpotlightTracker() {
  useEffect(() => {
    let frame = 0;
    let last: PointerEvent | null = null;

    const update = () => {
      frame = 0;
      const event = last;
      if (!event || !(event.target instanceof Element)) return;
      const card = event.target.closest<HTMLElement>('.surface-card');
      if (!card) return;
      const rect = card.getBoundingClientRect();
      card.style.setProperty('--mx', `${event.clientX - rect.left}px`);
      card.style.setProperty('--my', `${event.clientY - rect.top}px`);
    };

    const onMove = (event: PointerEvent) => {
      if (event.pointerType === 'touch') return;
      last = event;
      if (!frame) frame = requestAnimationFrame(update);
    };

    document.addEventListener('pointermove', onMove, { passive: true });
    return () => {
      document.removeEventListener('pointermove', onMove);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return null;
}
