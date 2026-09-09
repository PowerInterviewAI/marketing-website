import { Plan } from '@/types';

/**
 * The credit packs, mirrored from backend/app/cfg/payment.py's CREDIT_PLANS
 * (as of writing: starter $5/600, pro $20/3000 - popular, enterprise
 * $150/30000).
 *
 * This used to be fetched live on every page load/click, which meant /pricing
 * and the home page waited on a backend round trip just to show a price list
 * that changes rarely. Hardcoded instead - there is no shared source between
 * the two repos, so if CREDIT_PLANS changes in the backend, update this list
 * to match by hand.
 */
const PLANS: Plan[] = [
  { plan: 'starter', credits: 600, price_usd: 5, popular: false },
  { plan: 'pro', credits: 3000, price_usd: 20, popular: true },
  { plan: 'enterprise', credits: 30000, price_usd: 150, popular: false },
];

export function getPlans(): Plan[] {
  return PLANS;
}

/**
 * What credits are spent on, mirrored from the same backend config as the
 * packs above (CREDITS_PER_MINUTE and the three MOCK_CREDITS_PER_* values in
 * backend/app/cfg/payment.py).
 *
 * The two halves are metered differently and the site has to say so: a live
 * session is charged by the minute, a mock interview by the question, the
 * follow-up and the report, with its transcription unmetered. Quoting only
 * the per-minute rate - which the FAQ did for as long as mock practice was a
 * ChatGPT workaround - now describes half the product.
 */
export const CREDIT_RATES = {
  livePerMinute: 10,
  mockPerQuestion: 20,
  mockPerFollowUp: 10,
  mockPerReport: 40,
} as const;

/** What a mock interview of `questions` costs before any follow-ups. */
export function mockSessionPrice(questions: number): number {
  return CREDIT_RATES.mockPerQuestion * questions + CREDIT_RATES.mockPerReport;
}
