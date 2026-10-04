export const benefits = {
  eyebrow: 'Benefits',
  title: 'Transform your interview performance',
  description:
    'What actually changes once you have rehearsed against the AI interviewer and kept it running through the real call - in whatever field you interview in.',
  /** Same order as the icons in BenefitsSection. */
  items: [
    {
      title: 'Walk in already warmed up',
      body: 'Run the spoken mock the night before and the first question of the real interview is not the first time you have said any of it out loud. The uncertainty of a cold question is the thing rehearsal removes.',
    },
    {
      title: 'Find the weak answer before they do',
      body: 'The mock scorecard grades every answer on its own, says why it landed where it did, and writes a stronger version back. That is the gap you would otherwise only discover from a rejection email.',
    },
    {
      title: 'Communicate more clearly, live',
      body: 'Real-time, context-aware suggestions on the live call help you articulate your thoughts more clearly and professionally. Exported transcripts reveal the communication patterns you would otherwise never see.',
    },
    {
      title: 'Whatever the round throws at you',
      body: 'A competency panel, a case study, a clinical scenario, a portfolio review, a coding challenge: the live assistant reads the conversation and the job description rather than a bank of software questions, so the help fits the interview you are actually in.',
    },
    {
      title: 'Stay private throughout',
      body: 'Stealth mode keeps the assistant invisible during screen sharing and screenshots, and your transcripts are never retained on our servers after the session ends - mock sessions and real calls alike.',
    },
    {
      title: 'Keep control of your data',
      body: 'Payment is crypto-only, so there are no card details to store and no subscription to cancel. Your session token and device settings stay on your machine rather than on our servers.',
    },
  ],
  ctaTitle: 'Ready to transform your job search?',
  ctaBody:
    'One hour on the free model, enough for a couple of full mock sessions or a real call. No card, no bank details.',
  ctaButton: 'Start with a free mock interview',
};

export type Benefits = typeof benefits;
