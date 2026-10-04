'use client';

import React from 'react';

import { Section, SectionHeading } from '@/components/ui/section';
import { useMessages } from '@/i18n/LocaleProvider';

/**
 * Route-level loading.tsx fallbacks. They are Client Components because a
 * loading file receives no route params - the locale comes from the provider.
 *
 * Both deliberately carry no id. They used to be `id="pricing"` / `id="team"`
 * as well, so the streamed HTML contained two elements with that id and
 * `/#pricing` resolved to whichever came first - the fallback, which is then
 * thrown away. An anchor target has to be the element that survives.
 */

/** /pricing while its JS chunk loads - the only gap left to cover, now that
 *  PricingCards reads a hardcoded plan list instead of fetching one. */
export const PricingSkeleton: React.FC = () => {
  const { pricing } = useMessages().chrome.loading;

  return (
    <Section aria-label={pricing.aria}>
      <SectionHeading eyebrow={pricing.eyebrow} title={pricing.title} />
      <div className="mx-auto mt-14 grid max-w-5xl gap-6 md:grid-cols-3">
        {[0, 1, 2].map((i) => (
          <div key={i} className="h-72 animate-pulse rounded-xl border border-border bg-card" />
        ))}
      </div>
    </Section>
  );
};

/** /team while its JS chunk loads - TeamCards reads hardcoded profile data
 *  instead of fetching it from GitHub. */
export const TeamSkeleton: React.FC = () => {
  const { team } = useMessages().chrome.loading;

  return (
    <Section aria-label={team.aria}>
      <SectionHeading eyebrow={team.eyebrow} title={team.title} description={team.description} />
      <div className="mx-auto mt-14 grid max-w-5xl gap-6 md:grid-cols-3">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="flex h-full flex-col gap-4 rounded-xl border border-border bg-card p-6"
          >
            <div className="flex items-center gap-3">
              <div className="size-14 shrink-0 animate-pulse rounded-full bg-muted" />
              <div className="flex min-w-0 flex-1 flex-col gap-2">
                <div className="h-4 w-2/5 animate-pulse rounded bg-muted" />
                <div className="h-3 w-1/4 animate-pulse rounded bg-muted" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
};
