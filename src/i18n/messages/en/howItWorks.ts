export const howItWorks = {
  eyebrow: 'How it works',
  title: 'Practice it first, then sit it with backup',
  description:
    'Four steps, in the order you actually take them: install, add your context, rehearse against the AI interviewer, then keep the same app open for the interview itself. Whatever the job, and with no browser extension and no meeting bot joining the call on your behalf.',
  steps: [
    {
      title: 'Install and start your trial',
      body: 'Download the desktop app for Windows or macOS and sign in. New accounts get a full hour on the free model - no practical rate limit, no interruptions.',
    },
    {
      title: 'Add your CV and the job description',
      body: 'Paste your profile and the role you are interviewing for - any role, from a nursing post to a finance one to a staff engineering one. One profile drives both halves of the app: it writes the questions your mock interview asks and scores the answers, and it grounds the suggestions on the live call in your own experience. Your configuration follows you across devices.',
    },
    {
      title: 'Rehearse it as a mock interview',
      body: 'The first of the two features. An AI interviewer asks its questions out loud, presses on a thin answer the way a real one would, and hands back a scored report on every answer you gave. Do that in the days before the call, not in the post-mortem after it.',
    },
    {
      title: 'Then sit the live interview',
      body: 'The second feature, in the same app. Dual-channel transcription with speaker detection runs alongside Zoom, Google Meet or Teams, and suggestions stream into an overlay that stays out of screen shares and screenshots, driven entirely by hotkeys.',
    },
  ],
  cta: 'Download and try it',
};

export type HowItWorks = typeof howItWorks;
