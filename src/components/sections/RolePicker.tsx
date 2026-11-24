'use client';

import React, { useState } from 'react';

import { AmbientVideo } from '@/components/ui/ambient-video';
import type { Story } from '@/i18n/messages/en/story';
import { track } from '@/lib/analytics';
import { cn } from '@/lib/utils';

type RoleId = keyof Story['roles']['items'];

const ROLES: RoleId[] = ['developer', 'sales', 'nurse', 'teacher', 'finance'];

/**
 * Each clip pairs a generated, fictional candidate with a recording of the real
 * app UI. Only the selected role is mounted, and only the variant on screen
 * downloads its video. The question stays in HTML so it is translated.
 */
export const RolePicker: React.FC<{ copy: Story['roles'] }> = ({ copy }) => {
  const [active, setActive] = useState<RoleId>('developer');

  const choose = (id: RoleId) => {
    setActive(id);
    track('role_select', { role: id });
  };

  return (
    <div className="mt-10">
      <div
        role="group"
        aria-label={copy.eyebrow}
        className="flex gap-2 overflow-x-auto pb-2 [scrollbar-width:none] md:justify-center"
      >
        {ROLES.map((id) => (
          <button
            key={id}
            type="button"
            aria-pressed={active === id}
            onClick={() => choose(id)}
            className={cn(
              'min-h-10 shrink-0 rounded-lg border px-4 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
              active === id
                ? 'border-primary bg-primary text-primary-foreground'
                : 'border-border bg-card text-muted-foreground hover:border-border-strong hover:text-foreground'
            )}
          >
            {copy.items[id].label}
          </button>
        ))}
      </div>

      <figure className="mx-auto mt-4 max-w-md overflow-hidden rounded-xl border border-border bg-card shadow-elevation-2 lg:max-w-5xl">
        <div key={active} className="duration-300 animate-in fade-in">
          <div className="relative hidden aspect-video bg-black lg:block">
            <AmbientVideo
              src={`/media/roles/${active}.mp4`}
              poster={`/media/roles/${active}.webp`}
            />
          </div>
          <div className="relative aspect-[4/5] bg-black lg:hidden">
            <AmbientVideo
              src={`/media/roles/${active}-mobile.mp4`}
              poster={`/media/roles/${active}-mobile.webp`}
            />
          </div>
        </div>
        <figcaption className="border-t border-border p-4 md:px-6">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
            {copy.sample}
          </p>
          <p aria-live="polite" className="mt-1 text-balance text-lg font-semibold leading-snug">
            {copy.items[active].question}
          </p>
        </figcaption>
      </figure>
    </div>
  );
};

export default RolePicker;
