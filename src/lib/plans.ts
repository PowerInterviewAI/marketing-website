import { Plan } from '@/types';

/**
 * The plans, mirrored from backend/app/cfg/payment.py's SUBSCRIPTION_PLANS and
 * TRIAL_INITIAL_CREDITS: a free hour once, then prepaid passes of $20 for 30
 * days or $96 for 365 days ($8 a month), each unlimited on the SOTA model.
 *
 * Hardcoded rather than fetched: /pricing and the home page used to wait on a
 * backend round trip just to show a price list that changes rarely. There is
 * no shared source between the two repos, so if the plans change in the
 * backend, update this list to match by hand.
 */
const PLANS: Plan[] = [
  { plan: 'free', price_usd: 0, price_per_month_usd: 0, days: null, popular: false },
  { plan: 'monthly', price_usd: 20, price_per_month_usd: 20, days: 30, popular: false },
  { plan: 'yearly', price_usd: 96, price_per_month_usd: 8, days: 365, popular: true },
];

export function getPlans(): Plan[] {
  return PLANS;
}

/** The paid plans only, for the figures that compare them. */
export function getPaidPlans(): Plan[] {
  return PLANS.filter((plan) => plan.price_usd > 0);
}

/**
 * How much cheaper a plan is per month than the dearest paid one, in whole
 * percent. Derived rather than written into copy, so a price change cannot
 * leave a stale "save 60%" behind.
 */
export function savingPercent(plan: Plan): number {
  const dearest = Math.max(...getPaidPlans().map((p) => p.price_per_month_usd));
  if (plan.price_usd <= 0 || dearest <= 0) return 0;
  return Math.round(((dearest - plan.price_per_month_usd) / dearest) * 100);
}
