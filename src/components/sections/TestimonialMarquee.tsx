'use client';

import React, { useEffect, useState } from 'react';

import { cn } from '@/lib/utils';

/** Fisher-Yates shuffle of 0..n-1. */
function shuffledIndices(n: number): number[] {
  const order = Array.from({ length: n }, (_, i) => i);
  for (let i = n - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [order[i], order[j]] = [order[j], order[i]];
  }
  return order;
}

/** Seconds per card: slow enough to read a short quote as it drifts by. */
const SECONDS_PER_CARD = 8;

const Row: React.FC<{ cards: React.ReactNode[]; indices: number[]; reverse?: boolean }> = ({
  cards,
  indices,
  reverse,
}) => (
  // Same seamless loop as LanguageMarquee: the list is rendered twice and the
  // track slides by exactly half its width. Only the first copy is exposed to
  // assistive tech; the second exists purely to close the loop.
  <div
    className={cn(
      'flex w-max hover:[animation-play-state:paused]',
      reverse ? 'animate-marquee-reverse' : 'animate-marquee'
    )}
    style={{ animationDuration: `${Math.max(indices.length, 4) * SECONDS_PER_CARD}s` }}
  >
    {[0, 1].map((copy) => (
      <ul
        key={copy}
        aria-hidden={copy === 1 ? true : undefined}
        className="flex shrink-0 items-stretch gap-3 pe-3"
      >
        {indices.map((cardIndex) => (
          <li key={cardIndex} className="w-60 shrink-0">
            {cards[cardIndex]}
          </li>
        ))}
      </ul>
    ))}
  </div>
);

/**
 * Testimonial cards drifting past in two rows, like LanguageMarquee.
 *
 * Cards are rendered on the server and passed in. The home page is
 * prerendered, so the first render keeps the server order (hydration matches,
 * every card is in the HTML), then a fresh shuffle on every page load decides
 * the order and which row each card is in. Paused on hover. Under
 * prefers-reduced-motion the global rule freezes the animation, so the rows
 * become horizontally scrollable instead and no card is out of reach.
 */
export const TestimonialMarquee: React.FC<{ cards: React.ReactNode[] }> = ({ cards }) => {
  const count = cards.length;
  const [order, setOrder] = useState<number[]>(() => Array.from({ length: count }, (_, i) => i));

  useEffect(() => {
    setOrder(shuffledIndices(count));
  }, [count]);

  const half = Math.ceil(order.length / 2);
  const rows = count < 8 ? [order] : [order.slice(0, half), order.slice(half)];

  return (
    <div
      className="relative mt-12 flex flex-col gap-3 overflow-hidden py-2 [mask-image:linear-gradient(to_right,transparent,#000_8%,#000_92%,transparent)] motion-reduce:overflow-x-auto"
      dir="ltr"
    >
      {rows.map((indices, i) => (
        <Row key={i} cards={cards} indices={indices} reverse={i === 1} />
      ))}
    </div>
  );
};

export default TestimonialMarquee;
