export const mockInterview = {
  eyebrow: 'Mock interview',
  title: 'Rehearse the interview before you sit it',
  description:
    'A spoken mock interview inside the same desktop app. It asks, you answer out loud, and it hands back a scored report on what you actually said.',
  /** Same order as the icons in MockInterviewSection. */
  steps: [
    {
      title: 'Choose the shape of it',
      body: 'Seniority from junior to staff, difficulty, and 3, 5, 8 or 12 questions. Nothing else to fill in: the interview is built from the CV and job description already on your account, the same ones the live assistant reads.',
    },
    {
      title: 'The interviewer speaks',
      body: 'Behavioural, technical, situational and closing questions, asked out loud in your interview language. A thin answer draws up to two follow-ups on the same question, the way a real interviewer presses.',
    },
    {
      title: 'You answer out loud',
      body: 'Your microphone is transcribed as you speak, and you move on when you are ready. Suggestions from the live assistant stay off unless you turn them on: the point of the hour is that you do the thinking.',
    },
    {
      title: 'You get a scorecard',
      body: 'An overall score with your strengths and gaps, then every question scored on its own with why it landed where it did and a stronger version of the answer you gave.',
    },
  ],
  headphones: {
    badge: 'Headphones',
    text: 'Wear them for a mock session. On speakers, the tail of a spoken question can land at the start of the answer your microphone is transcribing.',
  },
  details: {
    scored: {
      title: 'Scored against your own material',
      body: 'Questions and scoring both run on the profile and job context saved to your account, so a mock session rehearses the role you are actually interviewing for.',
    },
    languages: {
      title: 'All {count} {noun}',
      body: 'One setting covers the live assistant and the mock alike. {voices} of them the interviewer speaks aloud; where a language has no voice available it writes its questions instead, and the follow-ups and the scoring are unchanged.',
    },
    pricing: {
      title: 'Priced by the question, not the clock',
      body: 'Think-time is free. You pay for each question, each follow-up and the final report; the transcription that runs the whole way through is not metered at all.',
    },
    report: {
      title: 'The report leaves with you',
      body: 'Export it as DOCX or Markdown, in the language you interviewed in, and keep it beside the notes from your real calls.',
    },
  },
  cta: 'Practice before the real one',
  guide: 'Read the mock interview guide',
  cost: 'What a session costs',
};

export type MockInterview = typeof mockInterview;
