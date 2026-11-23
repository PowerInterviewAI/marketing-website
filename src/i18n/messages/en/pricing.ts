import type { PluralForms } from '@/i18n/format';

export const pricing = {
  eyebrow: 'Pricing',
  title: 'One free hour, then unlimited',
  description:
    'Start with a free hour on the free model. When you want more, subscribe for unlimited live and mock interviews on the SOTA model - {monthly} a month, or {yearly} a month paid annually.',
  monthNoun: { one: 'month', other: 'months' } as PluralForms,
  coinsBadge: 'Crypto only - no card, PayPal, or bank details',

  billing: {
    title: 'How billing works',
    free: 'The free hour',
    freeText:
      'Live and mock sessions spend it by the minute. When it runs out the session stops, and a mock interview still gives you its report.',
    paid: 'A subscription',
    paidText:
      'Pay once in crypto for a month, a quarter or a year. Nothing renews automatically: buy another pass whenever you like, and its time is added after your current end date.',
  },

  plans: {
    free: 'Try every feature',
    monthly: 'For an interview coming up',
    quarterly: 'For an active job search',
    yearly: 'For a longer job search',
  },
  included: { every: 'Included in every plan', paid: 'With any paid plan' },
  popular: 'Recommended',
  save: 'Save {percent}%',
  planNames: { free: 'Free', monthly: 'Monthly', quarterly: 'Quarterly', yearly: 'Annual' },
  perMonth: '/ month',
  freeLine: '1 hour of interviews, once',
  billedAs: '{price} paid once for {months} {monthNoun}',
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
