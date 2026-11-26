'use client';

import React, { useRef, useState } from 'react';

import { Play } from 'lucide-react';

import { track } from '@/lib/analytics';

interface TourPlayerProps {
  src: string;
  poster: string;
  /** Accessible name of the video and of the play button. */
  title: string;
  play: string;
  sample: string;
}

/**
 * The narrated tour. Nothing downloads until the visitor presses play: the
 * `<video>` has no `src` until then, so the page pays only for the poster.
 * Playback starts inside the click handler, which is the user gesture browsers
 * require before playing with sound.
 */
export const TourPlayer: React.FC<TourPlayerProps> = ({ src, poster, title, play, sample }) => {
  const ref = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(false);

  const start = () => {
    const video = ref.current;
    if (!video) return;
    setStarted(true);
    video.src = src;
    void video.play();
    track('tour_play', { placement: 'home' });
  };

  return (
    <div className="surface-card relative aspect-video overflow-hidden rounded-2xl bg-black shadow-elevation-3">
      <video
        ref={ref}
        poster={poster}
        title={title}
        controls={started}
        playsInline
        preload="none"
        className="size-full"
      />
      {!started && (
        // The whole poster is the button. The visible pill sits under the cover's headline,
        // left-aligned with it (the cover keeps its text in the left 6%-45% and the person on
        // the right), so it never lands on the title or a face. Re-place it if the cover changes.
        <button
          type="button"
          onClick={start}
          className="group absolute inset-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring"
        >
          <span className="absolute bottom-[8%] left-[6.25%] inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-elevation-3 ring-4 ring-primary/25 transition-transform group-hover:scale-105 sm:bottom-[26%] sm:gap-3 sm:px-6 sm:py-3 sm:text-base">
            <Play className="size-4 fill-current sm:size-5" aria-hidden="true" />
            {play}
          </span>
        </button>
      )}
      {!started && (
        <span className="pointer-events-none absolute right-3 top-3 rounded-md bg-background/80 px-2 py-0.5 text-[11px] font-medium text-muted-foreground backdrop-blur">
          {sample}
        </span>
      )}
    </div>
  );
};

export default TourPlayer;
