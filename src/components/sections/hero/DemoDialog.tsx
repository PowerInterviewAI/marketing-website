'use client';

import React, { useState } from 'react';

import * as DialogPrimitive from '@radix-ui/react-dialog';
import { Play, X } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { useMessages } from '@/i18n/LocaleProvider';
import { track } from '@/lib/analytics';
import { cn } from '@/lib/utils';

import { DEMO_CLIPS } from './constants';

/**
 * Product demos, recorded from the real app UI with scripted sample data.
 * Nothing downloads until the visitor opens the player.
 */
export const DemoDialog: React.FC<{ className?: string }> = ({ className }) => {
  const t = useMessages().hero.demo;
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const clip = DEMO_CLIPS[index];

  const changeOpen = (next: boolean) => {
    setOpen(next);
    if (next) {
      setIndex(0);
      track('demo_open', { placement: 'hero' });
    }
  };

  const choose = (next: number) => {
    setIndex(next);
    track('demo_select', { clip: DEMO_CLIPS[next].id });
  };

  return (
    <DialogPrimitive.Root open={open} onOpenChange={changeOpen}>
      <DialogPrimitive.Trigger asChild>
        <Button variant="outline" size="xl" className={className}>
          <Play />
          {t.watch}
        </Button>
      </DialogPrimitive.Trigger>

      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <DialogPrimitive.Content className="fixed left-1/2 top-1/2 z-50 max-h-[94dvh] w-[min(96vw,1120px,calc((94dvh-190px)*16/9))] min-w-[min(96vw,340px)] -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-xl border border-border-strong bg-card shadow-elevation-3 focus:outline-none">
          <div className="flex items-start justify-between gap-4 p-4">
            <div className="min-w-0">
              <DialogPrimitive.Title className="text-lg font-semibold">
                {t.clips[clip.id].title}
              </DialogPrimitive.Title>
              <DialogPrimitive.Description className="mt-0.5 text-sm text-muted-foreground">
                {t.clips[clip.id].description}
              </DialogPrimitive.Description>
            </div>
            <DialogPrimitive.Close
              aria-label={t.close}
              className="flex size-10 shrink-0 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <X className="size-5" aria-hidden="true" />
            </DialogPrimitive.Close>
          </div>

          <div className="aspect-video bg-black">
            <video
              key={clip.src}
              src={clip.src}
              poster={clip.poster}
              title={t.clips[clip.id].title}
              className="size-full"
              preload="metadata"
              autoPlay
              muted
              playsInline
              controls
              onEnded={() => setIndex((current) => (current + 1) % DEMO_CLIPS.length)}
            />
          </div>

          <div
            role="group"
            aria-label={t.title}
            className="grid grid-cols-2 gap-2 p-3 lg:grid-cols-4"
          >
            {DEMO_CLIPS.map((item, itemIndex) => (
              <button
                key={item.id}
                type="button"
                aria-pressed={itemIndex === index}
                onClick={() => choose(itemIndex)}
                className={cn(
                  'min-h-10 rounded-lg border px-3 py-2 text-left text-xs font-semibold leading-snug transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:text-sm',
                  itemIndex === index
                    ? 'border-primary bg-primary/10'
                    : 'border-border hover:border-border-strong hover:bg-accent'
                )}
              >
                {t.clips[item.id].title}
              </button>
            ))}
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
};

export default DemoDialog;
