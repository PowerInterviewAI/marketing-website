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
}

/**
 * The narrated tour. Nothing downloads until the visitor presses play: the
 * `<video>` has no `src` until then, so the page pays only for the poster.
 * Playback starts inside the click handler, which is the user gesture browsers
 * require before playing with sound.
 */
export const TourPlayer: React.FC<TourPlayerProps> = ({ src, poster, title, play }) => {
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
        // The whole poster is the button. The visible pill is centred, which on the cover
        // (scripts/tour-cover) is the empty middle of the live window, clear of the labels and
        // the face. It is white rather than the primary orange so the hero keeps one primary
        // action, the download. Re-place it if the cover changes.
        <button
          type="button"
          onClick={start}
          className="group absolute inset-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring"
        >
          <span className="absolute left-1/2 top-1/2 inline-flex -translate-x-1/2 -translate-y-1/2 items-center gap-2.5 whitespace-nowrap rounded-full bg-white/95 py-1.5 pe-4 ps-1.5 text-sm font-semibold text-neutral-900 shadow-elevation-3 ring-4 ring-white/15 backdrop-blur transition-transform group-hover:scale-105 sm:gap-3 sm:py-2 sm:pe-5 sm:ps-2 sm:text-base">
            <span className="flex size-8 items-center justify-center rounded-full bg-primary text-primary-foreground sm:size-10">
              <Play className="size-4 translate-x-px fill-current sm:size-5" aria-hidden="true" />
            </span>
            {play}
          </span>
        </button>
      )}
    </div>
  );
};

export default TourPlayer;
