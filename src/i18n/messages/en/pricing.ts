import type { PluralForms } from '@/i18n/format';

export const pricing = {
  eyebrow: 'Pricing',
  title: 'Simple, transparent pricing',
  description:
    'Credits are consumed at {rate} per minute of AI assistance, so {hour} is about an hour. Buy what you need - there is no subscription.',
  creditNoun: { one: 'credit', other: 'credits' } as PluralForms,
  minuteNoun: { one: 'minute', other: 'minutes' } as PluralForms,
  trialBadge: 'New accounts: 1-hour free trial',
  coinsBadge: 'Coins only - no card, PayPal, or bank details',

  tier: {
    caption: 'Free trial compared with paid plans',
    whatYouGet: 'What you get',
    trial: 'Free trial',
    paid: 'Paid',
    included: 'Included',
    duration: {
      label: 'Duration',
      trial: '1 hour, new accounts',
      paid: 'As long as your credits last',
    },
    model: { label: 'Provided model', trial: 'Free model', paid: 'SOTA model' },
    live: 'Live suggestions',
    triggered: 'Triggered suggestions',
    rateLimit: { label: 'Rate limit', trial: 'None in practice', paid: 'None in practice' },
  },

  metering: {
    title: 'What a session spends',
    live: 'Live interview',
    liveText:
      '{rate} a minute while the assistant is running, so a 30-minute call is about {thirty}. It stops when your credits run out.',
    mock: 'Mock interview',
    mockText:
      '{rate} a minute from the first question to the report, so an 8-question session of about {minutes} costs about {session}. If your credits run out, it ends and you still get your report.',
  },

  plans: {
    starter: 'Ideal for individuals and first-time AI note takers',
    pro: 'Best value for professionals and serious job seekers',
    enterprise: 'Enterprise-ready meeting and interview note taking for teams',
  },
  popular: 'Most popular',
  save: 'Save {percent}%',
  planNames: { starter: 'Starter', pro: 'Pro', enterprise: 'Enterprise' },
  creditsLine: '{credits} {creditNoun} · ~{minutes} {minuteNoun}',
  features: {
    suggestions: 'Live and triggered suggestions',
    model: 'Provided SOTA model, no practical rate limit',
    oneOff: 'One-off purchase - no recurring charge',
  },
  getStarted: 'Get started',
};

export type Pricing = typeof pricing;
