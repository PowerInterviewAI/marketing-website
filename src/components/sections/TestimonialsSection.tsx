import React from 'react';

import { Quote, Star } from 'lucide-react';

import { TestimonialMarquee } from '@/components/sections/TestimonialMarquee';
import { Section, SectionHeading } from '@/components/ui/section';
import { SECTIONS } from '@/config/routes';
import { TESTIMONIALS, type Testimonial } from '@/config/testimonials';
import type { Locale } from '@/i18n/config';
import { format } from '@/i18n/format';
import { type Messages, getMessages } from '@/i18n/messages';
import { cn } from '@/lib/utils';

const RTL_LANGS = new Set(['ar', 'he', 'fa', 'ur']);

const MODE_STYLES: Record<NonNullable<Testimonial['mode']>, string> = {
  mock: 'bg-sky-500/10 text-sky-700 dark:text-sky-300',
  live: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300',
  coding: 'bg-violet-500/10 text-violet-700 dark:text-violet-300',
};

/** Five stars, each filled to 0, 50 or 100% of `rating`. Visual only. */
const StarRating: React.FC<{ rating: number; label: string }> = ({ rating, label }) => (
  <div className="flex items-center gap-0.5" role="img" aria-label={label}>
    {Array.from({ length: 5 }, (_, i) => {
      const fill = Math.max(0, Math.min(1, rating - i));
      return (
        <span key={i} className="relative size-3.5" aria-hidden="true">
          <Star className="absolute inset-0 size-3.5 text-amber-400/30" />
          {fill > 0 && (
            <span className="absolute inset-0 overflow-hidden" style={{ width: `${fill * 100}%` }}>
              <Star className="size-3.5 fill-amber-400 text-amber-400" />
            </span>
          )}
        </span>
      );
    })}
  </div>
);

const TestimonialCard: React.FC<{
  testimonial: Testimonial;
  locale: Locale;
  copy: Messages['testimonials'];
}> = ({ testimonial, locale, copy }) => {
  const dir = testimonial.lang && RTL_LANGS.has(testimonial.lang) ? 'rtl' : undefined;

  return (
    <figure className="surface-card flex h-full flex-col overflow-hidden rounded-xl">
      {testimonial.avatar && (
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
          <img
            src={testimonial.avatar}
            alt=""
            width={700}
            height={900}
            loading="lazy"
            decoding="async"
            className="size-full origin-[50%_30%] scale-[1.4] object-cover object-[center_30%]"
          />
          {testimonial.sample && (
            <span className="absolute left-2 top-2 rounded-full bg-black/60 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wide text-white backdrop-blur-sm">
              {copy.sampleBadge}
            </span>
          )}
        </div>
      )}

      <div className="flex flex-1 flex-col gap-2 p-3">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          {testimonial.rating !== undefined && (
            <StarRating
              rating={testimonial.rating}
              label={format(copy.ratingLabel, {
                rating: testimonial.rating.toLocaleString(locale),
              })}
            />
          )}
          {testimonial.mode && (
            <span
              className={cn(
                'rounded-full px-1.5 py-0.5 text-[10px] font-medium',
                MODE_STYLES[testimonial.mode]
              )}
            >
              {copy.modes[testimonial.mode]}
            </span>
          )}
          <Quote className="ml-auto size-3.5 shrink-0 text-primary/60" aria-hidden="true" />
        </div>

        <blockquote
          lang={testimonial.lang}
          dir={dir}
          className="flex-1 text-xs leading-relaxed text-foreground"
        >
          {testimonial.quote}
        </blockquote>
      </div>

      <figcaption className="mx-3 mb-3 flex items-center gap-2 border-t border-border pt-2">
        <span className="min-w-0" lang={testimonial.lang} dir={dir}>
          <span className="block truncate text-xs font-medium text-foreground">
            {testimonial.name}
          </span>
          <span className="block truncate text-[11px] text-muted-foreground">
            {testimonial.role}
          </span>
        </span>
        {testimonial.sample && !testimonial.avatar && (
          <span className="ml-auto shrink-0 rounded-full border border-border px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
            {copy.sampleBadge}
          </span>
        )}
        {testimonial.sourceUrl && (
          <a
            href={testimonial.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-auto shrink-0 text-xs text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
          >
            {copy.source}
          </a>
        )}
      </figcaption>
    </figure>
  );
};

/**
 * Renders nothing until src/config/testimonials.ts holds entries.
 *
 * Cards are rendered here on the server; TestimonialMarquee drifts them past
 * in two rows (like LanguageMarquee) in a new random order on every page load.
 */
export const TestimonialsSection: React.FC<{ locale: Locale }> = ({ locale }) => {
  if (TESTIMONIALS.length === 0) return null;

  const messages = getMessages(locale);
  const copy = messages.testimonials;
  const cards = TESTIMONIALS.map((testimonial, index) => (
    <TestimonialCard
      key={`${testimonial.name}-${index}`}
      testimonial={testimonial}
      locale={locale}
      copy={copy}
    />
  ));

  return (
    <Section id={SECTIONS.testimonials} tone="muted" aria-labelledby="testimonials-heading">
      <SectionHeading id="testimonials-heading" eyebrow={copy.eyebrow} title={copy.title} />

      <TestimonialMarquee cards={cards} />

      <p className="mx-auto mt-10 max-w-3xl text-center text-xs leading-relaxed text-muted-foreground">
        {messages.story.live.note}
      </p>
    </Section>
  );
};

export default TestimonialsSection;
