import type { PluralForms } from '@/i18n/format';

export const pricing = {
  eyebrow: 'Pricing',
  title: 'One free hour, then unlimited',
  description:
    'Start with a free hour on the free model. When you want more, subscribe for unlimited live and mock interviews on the SOTA model - {monthly} a month, or {yearly} a month paid yearly.',
  dayNoun: { one: 'day', other: 'days' } as PluralForms,
  trialBadge: 'New accounts: 1 free hour',
  coinsBadge: 'Coins only - no card, PayPal, or bank details',
  prepaidBadge: 'Prepaid - never renews on its own',

  tier: {
    caption: 'The free plan compared with a subscription',
    whatYouGet: 'What you get',
    trial: 'Free',
    paid: 'Subscription',
    included: 'Included',
    duration: {
      label: 'Interview time',
      trial: '1 hour, once',
      paid: 'Unlimited',
    },
    model: { label: 'Provided model', trial: 'Free model', paid: 'SOTA model' },
    live: 'Live suggestions',
    triggered: 'Triggered suggestions',
    mock: 'Mock interviews with a scored report',
    rateLimit: { label: 'Rate limit', trial: 'None in practice', paid: 'None in practice' },
  },

  billing: {
    title: 'How billing works',
    free: 'The free hour',
    freeText:
      'Live and mock sessions spend it by the minute. When it runs out the session stops, and a mock interview still gives you its report.',
    paid: 'A subscription',
    paidText:
      'Pay once in coins for 30 or 365 days. Nothing renews automatically: buy another pass whenever you like, and its days are added after your current end date.',
  },

  plans: {
    free: 'Everything the app does, on the free model, for your first hour',
    monthly: 'Unlimited interviews on the SOTA model, a month at a time',
    yearly: 'Unlimited interviews on the SOTA model for a year, at the lowest price',
  },
  popular: 'Best value',
  save: 'Save {percent}%',
  planNames: { free: 'Free', monthly: 'Monthly', yearly: 'Yearly' },
  perMonth: '/ month',
  freeLine: '1 hour of interviews, once',
  billedAs: '{price} paid once for {days} {dayNoun}',
  features: {
    suggestions: 'Live and triggered suggestions',
    mock: 'Mock interviews with a scored report',
    freeModel: 'Free model',
    sotaModel: 'SOTA model, no practical rate limit',
    oneHour: 'One hour of interview time',
    unlimited: 'Unlimited interview time',
    noRenewal: 'No automatic renewal',
  },
  getStarted: 'Get started',
  startFree: 'Start free',
};

export type Pricing = typeof pricing;
