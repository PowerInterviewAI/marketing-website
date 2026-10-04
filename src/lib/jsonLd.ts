/**
 * JSON-LD blocks, one per thing they describe.
 *
 * These used to all live in the root layout, which meant every route - /privacy,
 * /terms, every docs page - claimed to be a SoftwareApplication AND an FAQPage.
 * Structured data is supposed to describe the page it is on, so each block is
 * now mounted only where its content actually is:
 *
 *   Organization         root layout (site-wide identity, correct everywhere)
 *   SoftwareApplication  the home page, which is the page about the app
 *   FAQPage              /faq, the page that renders the full question list
 *
 * Everything asserted here must be true of the page it sits on and visible to a
 * reader of that page. Markup that contradicts the page - invented ratings,
 * prices that don't match the ones rendered, platforms with no build - is a
 * Search policy violation, and the penalty lands on the whole domain.
 */
import { getFaqItems } from '@/config/faq';
import { LANGUAGE_COUNT, VOICE_LANGUAGE_COUNT } from '@/config/languages';
import type { Locale } from '@/i18n/config';
import { format } from '@/i18n/format';
import { getMessages } from '@/i18n/messages';
import { Plan } from '@/types';

const SITE_URL = 'https://www.powerinterviewai.com';
const SITE_NAME = 'Power Interview AI';

/**
 * The home page's SoftwareApplication block.
 *
 * Takes the live plans so `offers` describes the packs the page actually
 * renders. It used to hardcode lowPrice 20 / highPrice 500 / offerCount 3
 * against a price list fetched at request time, so the markup was free to
 * drift from the visible pricing - and structured data that contradicts the
 * page is a Search policy violation, not just a stale number.
 *
 * There is deliberately no `aggregateRating`. It used to claim 4.8 from 156
 * ratings while `src/config/testimonials.ts` is an empty array and no rating,
 * review or vote appears anywhere on the site. Google requires review markup to
 * reflect ratings genuinely visible on the page; inventing them risks a manual
 * action against the whole domain. That file's own comment already spells this
 * out - "fabricated testimonials on a page that also emits Product/Review
 * structured data are both a trust problem and a search-policy violation" - and
 * this block was the violation it was warning about. Restore it only when real
 * ratings are collected and shown, and derive it from that same data.
 */
export function buildSoftwareApplicationJsonLd(plans: Plan[] | null, locale: Locale) {
  const { structured } = getMessages(locale).meta;
  const prices = (plans ?? []).map((plan) => plan.price_usd).filter((n) => Number.isFinite(n));

  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: SITE_NAME,
    url: locale === 'en' ? `${SITE_URL}/` : `${SITE_URL}/${locale}`,
    inLanguage: locale,
    applicationCategory: 'BusinessApplication',
    // macOS isn't ready to ship yet (see MACOS_SUPPORTED in DownloadButton.tsx)
    // - claiming a platform that isn't actually downloadable is exactly the
    // kind of drift this file's other comments already warn against. Add it
    // back once the macOS build is supported again.
    operatingSystem: 'Windows',
    description: structured.softwareDescription,
    author: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: `${SITE_URL}/`,
      logo: `${SITE_URL}/logo.png`,
      sameAs: ['https://github.com/PowerInterviewAI/client-app', 'https://t.me/power_interview_ai'],
    },
    // Real frames from the demo clips. This was /logo.png, which is not a
    // screenshot of anything.
    screenshot: [
      `${SITE_URL}/media/marketing/poster-live-interview.jpg`,
      `${SITE_URL}/media/marketing/poster-coding-1.jpg`,
    ],
    ...(prices.length > 0 && {
      offers: {
        '@type': 'AggregateOffer',
        lowPrice: String(Math.min(...prices)),
        highPrice: String(Math.max(...prices)),
        priceCurrency: 'USD',
        offerCount: String(prices.length),
      },
    }),
    // Grouped the way the page groups them: the mock interview first, the
    // live interview second, then what holds for both. A flat list here while
    // the page is organised around two named features is markup that no longer
    // describes the page it sits on.
    featureList: structured.featureList.map((feature) =>
      format(feature, { languages: LANGUAGE_COUNT, voices: VOICE_LANGUAGE_COUNT })
    ),
  };
}

export const buildOrganizationJsonLd = (locale: Locale) => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: SITE_NAME,
  url: `${SITE_URL}/`,
  logo: `${SITE_URL}/logo.png`,
  description: getMessages(locale).meta.structured.organizationDescription,
  email: 'team@vectorleappulse.xyz',
  sameAs: ['https://github.com/PowerInterviewAI/client-app', 'https://t.me/power_interview_ai'],
  contactPoint: {
    '@type': 'ContactPoint',
    email: 'team@vectorleappulse.xyz',
    contactType: 'Customer Support',
  },
});

/**
 * FAQPage for /faq (and /ru/faq). Derived from the same array FAQSection
 * renders, in the page's own language, so the rich result can't drift from the
 * page the way two hand-maintained copies did - and a Russian page never
 * carries English questions it does not show.
 */
export const buildFaqPageJsonLd = (locale: Locale) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  inLanguage: locale,
  mainEntity: getFaqItems(locale).map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.answer,
    },
  })),
});
