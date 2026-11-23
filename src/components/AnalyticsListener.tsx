'use client';

import { useEffect } from 'react';

import { track } from '@/lib/analytics';

/**
 * Sends a click event for any element carrying `data-track`.
 *
 * Delegated so Server Components can report clicks with a data attribute rather
 * than becoming Client Components to hold a handler.
 */
export function AnalyticsListener() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (!(event.target instanceof Element)) return;
      const element = event.target.closest<HTMLElement>('[data-track]');
      if (!element?.dataset.track) return;
      track(element.dataset.track, { placement: element.dataset.placement ?? 'unknown' });
    };

    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  return null;
}
