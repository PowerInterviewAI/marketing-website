'use client';

import React, { useState } from 'react';

import Image from 'next/image';

import { AmbientVideo } from '@/components/ui/ambient-video';
import type { Story } from '@/i18n/messages/en/story';
import { track } from '@/lib/analytics';
import { cn } from '@/lib/utils';

type RoleId = keyof Story['roles']['items'];

const ROLES: { id: RoleId; image: string; video?: { src: string; poster: string } }[] = [
  {
    id: 'developer',
    image: '/media/marketing/roles/engineer.webp',
    video: { src: '/media/lifestyle/developer.mp4', poster: '/media/lifestyle/developer.webp' },
  },
  { id: 'sales', image: '/media/marketing/roles/sales.webp' },
  {
    id: 'nurse',
    image: '/media/marketing/roles/nurse.webp',
    video: { src: '/media/lifestyle/nurse.mp4', poster: '/media/lifestyle/nurse.webp' },
  },
  { id: 'teacher', image: '/media/marketing/roles/teacher.webp' },
  { id: 'finance', image: '/media/marketing/roles/finance.webp' },
];

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
        {ROLES.map(({ id }) => (
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

      <div className="relative mt-4 aspect-[4/3] overflow-hidden rounded-xl border border-border bg-card sm:aspect-[16/9] lg:aspect-[21/9]">
        {ROLES.map(({ id, image, video }) => {
          const visibility = cn(
            'object-[center_30%] transition-opacity duration-500',
            active === id ? 'opacity-100' : 'opacity-0'
          );
          return video ? (
            <AmbientVideo
              key={id}
              src={video.src}
              poster={video.poster}
              active={active === id}
              className={visibility}
            />
          ) : (
            <Image
              key={id}
              src={image}
              alt=""
              fill
              sizes="(min-width: 1280px) 1216px, 100vw"
              className={cn('object-cover', visibility)}
            />
          );
        })}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/55 to-transparent p-5 pt-20 md:p-8 md:pt-24">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-white/75">
            {copy.sample}
          </p>
          <p
            aria-live="polite"
            className="mt-2 max-w-3xl text-balance text-xl font-semibold leading-snug text-white md:text-3xl"
          >
            {copy.items[active].question}
          </p>
        </div>
      </div>
    </div>
  );
};

export default RolePicker;
