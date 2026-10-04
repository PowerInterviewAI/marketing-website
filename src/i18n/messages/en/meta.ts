/**
 * Titles and descriptions for <head>, plus the structured-data copy.
 *
 * Keep each description to roughly 120-160 characters: Google truncates the
 * snippet around there. Only pages translated into every locale appear here;
 * the legal pages and the docs are English-only for now and use their English
 * metadata under every locale (see `translated` in src/lib/metadata.ts).
 */
export const meta = {
  site: {
    title:
      'Power Interview AI - Interview Coach & AI Meeting Note Taker | Zoom, Google Meet, Teams',
    description:
      'New users get a full 1-hour free trial with our free model - no practical rate limit, no interruptions. Privacy-first AI interview coach and meeting note taker for Zoom, Google Meet, Microsoft Teams. Real-time transcription, AI reply suggestions, mock interview practice, and smart exports.',
    ogTitle: 'Power Interview AI - Interview Coach & Meeting Note Taker',
    ogAlt: 'Power Interview AI - AI interview coach and meeting note taker',
    twitterTitle: 'Power Interview AI - Interview Coach & AI Note Taker',
    twitterDescription:
      'New users get a full 1-hour free trial with our free model - no practical rate limit, no interruptions. Privacy-first AI interview coach for Zoom, Google Meet, Teams. Real-time transcription, AI suggestions, mock interviews, and smart exports.',
    keywords: [
      'AI interview assistant',
      'interview coach',
      'meeting note taker',
      'AI note taker',
      'mock interview',
      'free trial',
      '1-hour free trial',
      'free model',
      'no practical rate limit',
      'technical interview help',
      'coding interview assistant',
      'live coding challenge',
      'real-time transcription',
      'AI reply suggestions',
      'behavioral interview practice',
      'Zoom meeting notes',
      'Google Meet transcript',
      'Microsoft Teams recording',
      'smart export',
      'interview transcription',
      'stealth mode',
      'privacy-first',
      'cryptocurrency payment',
      'interview practice software',
      'desktop application',
      'Windows',
      'Mac',
      'interview companion',
      'interview preparation',
      'FAANG interview prep',
      'coding interview prep',
      'system design interview',
      'interview confidence',
      'get hired faster',
      'ace interviews',
    ],
  },
  home: {
    title: 'Power Interview AI - AI Interview Coach & Meeting Note Taker',
    description:
      'Two features, any job: a spoken AI mock interview that scores every answer, then live suggestions on the real Zoom, Meet or Teams call. 1 hour free.',
  },
  howItWorks: {
    title: 'How It Works',
    description:
      'Install the desktop app, add your CV and the job description, rehearse against the AI interviewer, then join the real Zoom, Meet or Teams call.',
  },
  mockInterview: {
    title: 'Mock Interview Practice',
    description:
      'Practice out loud against an AI interviewer that speaks its questions, presses on thin answers and returns a scored report you can export.',
  },
  pricing: {
    title: 'Pricing',
    description:
      'Power Interview AI pricing: a 1-hour free trial, then credit packs with no subscription. Paid in coins only - no card, PayPal or bank details.',
  },
  faq: {
    title: 'FAQ',
    description:
      'Answers on how Power Interview AI works: platform support, stealth mode and screen share, privacy and local data, mock interviews, billing and credits.',
  },
  team: {
    title: 'Team',
    description:
      'Meet the team behind Power Interview AI - the developers building a privacy-first AI interview coach for Zoom, Google Meet and Teams.',
  },
  structured: {
    organizationDescription:
      'Privacy-first AI interview coach and meeting note taker for mock interviews, live interviews, and business calls. Supports Zoom, Google Meet, Microsoft Teams, and more.',
    softwareDescription:
      'Privacy-first AI interview coach and meeting note taker with two features: spoken mock interviews with a scored report, then real-time transcription and live AI suggestions on Zoom, Google Meet and Microsoft Teams. Built from your own CV and job description, so it works for any role, with optional coding challenge assistance for technical rounds.',
    /** `{languages}` and `{voices}` are derived from src/config/languages.ts. */
    featureList: [
      'Mock interview: an AI interviewer that speaks its questions and follows up',
      'Mock interview: every answer scored, with a stronger version written back and exported as DOCX or Markdown',
      'Live interview: dual-channel transcription with speaker detection',
      'Live interview: AI reply suggestions grounded in your CV and the job description',
      'Live interview: stealth mode with hotkeys, hidden from screen share and screenshots',
      'Live interview: optional screenshot-based coding assistance for technical rounds',
      'Works for any role, not just software engineering - questions and scoring come from the job description you paste in',
      'AI meeting note taker for Zoom, Google Meet and Microsoft Teams, with AI summaries and action items',
      '{languages} interview languages across both the mock session and the live call, {voices} of them spoken aloud by the mock interviewer',
      '1-hour free trial with our free model - no practical rate limit, no interruptions',
      'Privacy-first: transcripts never retained after the session',
    ],
  },
};

export type Meta = typeof meta;
