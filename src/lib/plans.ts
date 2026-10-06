import { Plan } from '@/types';

/**
 * The credit packs, mirrored from backend/app/cfg/payment.py's CREDIT_PLANS
 * (as of writing: starter $5/600, pro $20/3000 - popular, enterprise
 * $175/30000).
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
  { plan: 'enterprise', credits: 30000, price_usd: 175, popular: false },
];

export function getPlans(): Plan[] {
  return PLANS;
}

/**
 * What credits are spent on, mirrored from the same backend config as the
 * packs above (CREDITS_PER_MINUTE in backend/app/cfg/payment.py).
 *
 * One rate for everything: a live session and a mock interview are both
 * metered by the minute, and both stop when the credits run out. Mock used to
 * be priced per question, follow-up and report; it no longer is.
 */
export const CREDIT_RATES = {
  perMinute: 10,
} as const;

/**
 * How long a mock interview of `questions` usually runs, in minutes. Mirrors
 * the desktop app's own estimate (`mockSessionMinutes`), so the site and the
 * setup screen quote the same figure.
 */
export function mockSessionMinutes(questions: number): number {
  return Math.round(questions * 2.5);
}
