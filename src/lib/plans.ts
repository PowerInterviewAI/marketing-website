import { Plan } from '@/types';

/**
 * The plans, mirrored from backend/app/cfg/payment.py's SUBSCRIPTION_PLANS and
 * TRIAL_INITIAL_CREDITS: a free hour once, then prepaid passes of $25 for a
 * month, $60 for three months ($20 a month) or $180 for a year ($15 a month),
 * each a calendar period and unlimited on the SOTA model.
 *
 * Hardcoded rather than fetched: /pricing and the home page used to wait on a
 * backend round trip just to show a price list that changes rarely. There is
 * no shared source between the two repos, so if the plans change in the
 * backend, update this list to match by hand.
 */
const PLANS: Plan[] = [
  { plan: 'free', price_usd: 0, price_per_month_usd: 0, months: null, popular: false },
  { plan: 'monthly', price_usd: 25, price_per_month_usd: 25, months: 1, popular: false },
  { plan: 'quarterly', price_usd: 60, price_per_month_usd: 20, months: 3, popular: true },
  { plan: 'yearly', price_usd: 180, price_per_month_usd: 15, months: 12, popular: false },
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
 * leave a stale "save 40%" behind.
 */
export function savingPercent(plan: Plan): number {
  const dearest = Math.max(...getPaidPlans().map((p) => p.price_per_month_usd));
  if (plan.price_usd <= 0 || dearest <= 0) return 0;
  return Math.round(((dearest - plan.price_per_month_usd) / dearest) * 100);
}

/**
 * A plan price as the locale writes money: "$180" in English, "180 $" in Russian, matching the
 * prices the FAQ and docs quote as text. Cents only when a price has them.
 */
export function formatUsd(amount: number, locale: string): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);
}
