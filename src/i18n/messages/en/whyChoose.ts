export const whyChoose = {
  eyebrow: 'Why us',
  title: 'Built for the rehearsal first, and the interview after it',
  description:
    'Practice platforms coach you beforehand and coding sites drill you on problems, then leave when it matters. This one runs the spoken mock session, scores what you said, and is still open when the real interviewer joins the call - for whatever job you are interviewing for.',
  groups: { mock: 'Mock interview', live: 'Live interview', both: 'Both' },
  cells: {
    yes: 'Yes',
    no: 'No',
    varies: 'Varies',
    practiceOnly: 'Practice only',
    generic: 'Generic',
    practiceProblems: 'Practice problems',
  },
  /** Same order as ROWS in WhyChooseSection. */
  rows: [
    'An interviewer that speaks its questions and follows up',
    'Every answer scored, with a stronger version written back',
    'Helps during a real, live interview',
    'Hidden from screen share and screenshots',
    'Dual-channel transcription with speaker detection',
    'Screenshot-based coding solutions in the moment',
    'Spoken mock practice and live help in one app',
    'Works for any role, not just software engineering',
    'Answers grounded in your CV and the job description',
    'Runs as a desktop app - no extension, no meeting bot',
    'Transcripts never retained after the session',
    'Pay per use - no subscription',
    'Crypto-only payment, no card details stored',
  ],
  tableCaption:
    'Power Interview AI compared with interview practice tools and coding practice platforms',
  capability: 'Capability',
  practiceTools: 'Practice & mock tools',
  codingPlatforms: 'Coding platforms',
  disclaimer:
    "Competitor names are examples of each category, not a claim about any specific product's current feature set.",
  ctaBody:
    'One standalone desktop app for both halves, and for any field - practice tonight, sit the interview next week. Download, install, start. No API wiring, no browser extension asking for permissions, no bot joining the call on your behalf.',
  ctaButton: 'Experience the difference',
};

export type WhyChoose = typeof whyChoose;
