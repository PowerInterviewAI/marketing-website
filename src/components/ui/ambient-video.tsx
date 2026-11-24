'use client';

import * as React from 'react';

import { cn } from '@/lib/utils';

interface AmbientVideoProps {
  src: string;
  poster: string;
  className?: string;
  /** Lets a parent keep several clips mounted and play only the visible one. */
  active?: boolean;
  /** Start from the first frame each time `active` turns on (slide shows). */
  rewind?: boolean;
}

/**
 * A silent decorative loop. It downloads only once on screen, pauses off
 * screen, and stays on its poster for reduced motion and Data Saver.
 */
export const AmbientVideo: React.FC<AmbientVideoProps> = ({
  src,
  poster,
  className,
  active = true,
  rewind = false,
}) => {
  const ref = React.useRef<HTMLVideoElement>(null);

  React.useEffect(() => {
    const video = ref.current;
    if (!video) return;

    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } })
      .connection;
    const allowed =
      active &&
      !connection?.saveData &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!allowed) {
      video.pause();
      return;
    }
    if (rewind) video.currentTime = 0;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Autoplay can be refused. The poster remains a complete image.
          video.play().catch(() => undefined);
        } else {
          video.pause();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(video);
    return () => {
      observer.disconnect();
      video.pause();
    };
  }, [active, rewind]);

  return (
    <video
      ref={ref}
      src={src}
      poster={poster}
      aria-hidden="true"
      tabIndex={-1}
      preload="none"
      muted
      loop
      playsInline
      disablePictureInPicture
      className={cn('absolute inset-0 size-full object-cover', className)}
    />
  );
};

export default AmbientVideo;
