export const FAQ_CATEGORIES = [
  'Getting started',
  'Product',
  'Privacy & data',
  'Plans & billing',
] as const;

export type FaqCategory = (typeof FAQ_CATEGORIES)[number];

export interface FaqItem {
  question: string;
  answer: string;
  category: FaqCategory;
}

/**
 * The single source of truth for the site's FAQ.
 *
 * Read by both FAQSection and the FAQPage JSON-LD block in
 * src/app/layout.tsx. These two used to hold separate hand-maintained copies
 * of the same thirteen answers, which had already drifted apart in wording -
 * meaning the rich result Google indexed did not match the page.
 *
 * Answers are plain strings, not JSX, because the JSON-LD consumer needs text.
 */
export const FAQ_ITEMS: FaqItem[] = [
  {
    question: 'Is Power Interview AI legal to use?',
    category: 'Getting started',
    answer:
      'Power Interview AI is designed for legitimate educational and interview preparation purposes. However, you are responsible for ensuring your use complies with applicable laws and the terms of service of platforms you use. Always use ethically and legally.',
  },
  {
    question: 'Can I practice with a mock interview?',
    category: 'Product',
    answer:
      'Yes, and it runs inside the app rather than sending you to another tool. Pick a seniority, a difficulty and a length of 3, 5, 8 or 12 questions, and an AI interviewer speaks its questions out loud in your interview language, presses with up to two follow-ups when an answer leaves something open, and listens while you answer into your microphone. The questions and the scoring both use the CV and job description already saved to your account. At the end you get an overall score with strengths and gaps, plus every question scored on its own with a justification and a stronger version of your answer, exportable as DOCX or Markdown.',
  },
  {
    question: 'How does the privacy protection work?',
    category: 'Privacy & data',
    answer:
      'Your interview configuration - full name, profile/CV, and context - is saved to your account so it follows you across devices. Transcripts and screenshots are sent to our AI services when you request a suggestion, and transcripts are never persisted on our servers: they exist only for the length of your session. Your session token and device settings stay on your machine. We never sell or share your personal information.',
  },
  {
    question: 'Which AI model powers the suggestions?',
    category: 'Product',
    answer:
      'The model is provided for you - there is nothing to connect or configure. New accounts run on our free model for the length of the 1-hour trial, and buying credits moves you to our SOTA model with no rate limit.',
  },
  {
    question: 'What platforms are supported?',
    category: 'Getting started',
    answer: 'Power Interview AI supports both Windows and macOS.',
  },
  {
    question: 'What languages can I interview in?',
    category: 'Product',
    answer:
      'Twenty-eight: English, Spanish, German, French, Portuguese, Italian, Dutch, Polish, Russian, Ukrainian, Czech, Romanian, Greek, Hungarian, Swedish, Danish, Norwegian, Finnish, Turkish, Hindi, Japanese, Korean, Chinese, Vietnamese, Thai, Indonesian, Arabic, and Hebrew. One setting decides which speech model transcribes the call, the language your suggestions come back in, and the language of your exported report. You can change it mid-interview - transcription reconnects on the new language while suggestions follow immediately. Arabic and Hebrew render right-to-left throughout.',
  },
  {
    question: 'Do I need special hardware to run Power Interview AI?',
    category: 'Getting started',
    answer:
      'Power Interview AI runs on most modern Windows and macOS computers without special hardware requirements. A stable internet connection improves streaming performance, but you do not need a dedicated GPU.',
  },
  {
    question: 'How accurate is the AI transcription?',
    category: 'Product',
    answer:
      'Our real-time transcription uses advanced ASR (Automatic Speech Recognition) with dual-channel support and speaker detection. Accuracy depends on audio quality, but it performs excellently in typical interview scenarios with clear audio.',
  },
  {
    question: 'Can I use this for coding interviews?',
    category: 'Product',
    answer:
      'Absolutely! Power Interview AI includes specialized code suggestion features. It can analyze screenshots of coding problems and provide LLM-powered solutions with proper syntax highlighting. Perfect for technical interviews.',
  },
  {
    question: 'What is stealth mode?',
    category: 'Privacy & data',
    answer:
      'Stealth mode allows you to operate the assistant discreetly during interviews. You can control everything via hotkeys, adjust window opacity, and position windows strategically-all without losing focus on your interview tab or application. Additionally, the window is not capturable in screenshots and remains invisible during full screen sharing, ensuring complete privacy during your interview.',
  },
  {
    question: 'What does a mock interview cost?',
    category: 'Plans & billing',
    answer:
      'A mock interview is priced per question rather than per minute, so thinking about your answer is free. Each question costs 20 credits, each follow-up 10, and the report at the end 40; the transcription that runs throughout is not metered at all. A 5-question session is therefore 140 credits before follow-ups and an 8-question session 200, and the app quotes the price and checks your balance before the interview starts. Your 1-hour free trial is 600 credits, which covers a couple of full sessions.',
  },
  {
    question: 'How do credits work?',
    category: 'Plans & billing',
    answer:
      'A live session is metered by the clock: 10 credits per minute of reply suggestions, code analysis and transcription, so a 30-minute interview costs roughly 300 credits. A mock interview is priced by the work delivered instead - see the question above. You can purchase credit packs starting from 600 credits ($5 for ~60 minutes) up to 30,000 credits ($150 for ~3,000 minutes).',
  },
  {
    question: 'What payment methods do you accept?',
    category: 'Plans & billing',
    answer:
      'We accept cryptocurrency coins only. No credit card, PayPal, or traditional bank payments are required. This ensures maximum privacy and security for your transactions. Simply purchase coins and use them to buy credit packs within the application.',
  },
  {
    question: 'Is there a free trial?',
    category: 'Plans & billing',
    answer:
      'Yes! New users get a full 1-hour free trial powered by our free model - with no rate limits and no interruptions. The trial includes every feature: live suggestions, triggered suggestions and mock interview practice. Buying credits moves you to the SOTA model.',
  },
  {
    question: 'Can I get a refund?',
    category: 'Plans & billing',
    answer:
      'We stand behind our product. If you are not satisfied with Power Interview AI, please contact us at team@vectorleappulse.xyz within 14 days of purchase to discuss refund options.',
  },
];
