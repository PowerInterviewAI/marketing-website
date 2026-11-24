import { SAMPLE_TESTIMONIALS } from './testimonials.samples';

export interface Testimonial {
  /** The quote itself. Keep it to two or three sentences. */
  quote: string;
  /** Who said it. */
  name: string;
  /** Role and/or company, e.g. "Backend engineer, hired at a FAANG". */
  role: string;
  /** Optional link to the public source of the quote (review, post, thread). */
  sourceUrl?: string;
  /** Optional avatar under public/ - e.g. '/media/testimonials/name.jpg'. */
  avatar?: string;
  /**
   * Fictional placeholder (school/demo use only). The card shows a visible
   * "Fictional example" badge. Never ship a sample entry to production.
   */
  sample?: boolean;
  /** Optional star rating out of 5, in half steps (e.g. 4.5). Visual only - never emitted as JSON-LD. */
  rating?: number;
  /** BCP 47 code of the language the quote is written in, e.g. 'es'. Sets `lang` (and `dir`) on the card. */
  lang?: string;
  /** Which part of the product the quote is about, shown as a tag on the card. */
  mode?: TestimonialMode;
}

export type TestimonialMode = 'mock' | 'live' | 'coding';

/**
 * Real customer quotes only.
 *
 * TestimonialsSection renders nothing while this array is empty, so the
 * section stays invisible until there is genuine feedback to show. Do not
 * populate it with invented or paraphrased quotes: fabricated testimonials on
 * a page that also emits Product/Review structured data are both a trust
 * problem and a search-policy violation.
 *
 * Every entry should be traceable to something a real person actually wrote -
 * prefer ones with a sourceUrl.
 */
// DEMO BRANCH ONLY (demo/testimonials): every sample entry is fictional and
// written for a school project. See testimonials.samples.ts.
export const TESTIMONIALS: Testimonial[] = SAMPLE_TESTIMONIALS;
