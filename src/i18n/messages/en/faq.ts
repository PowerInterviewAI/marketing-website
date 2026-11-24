export type FaqCategory = 'gettingStarted' | 'product' | 'privacy' | 'billing';

export interface FaqEntry {
  category: FaqCategory;
  question: string;
  answer: string;
}

/**
 * The site's FAQ, in display order. Answers are plain strings, not JSX,
 * because the FAQPage JSON-LD needs text. Every locale must list the same
 * questions in the same order, so the two FAQ pages and their JSON-LD
 * stay one list.
 */
export const faq = {
  eyebrow: 'FAQ',
  seeAll: 'See all questions',
  title: 'Frequently asked questions',
  description: 'Everything worth knowing before you install.',
  categories: {
    gettingStarted: 'Getting started',
    product: 'Product',
    privacy: 'Privacy & data',
    billing: 'Plans & billing',
  },
  stillQuestions: 'Still have questions?',
  contact: 'Contact us',
  items: [
    {
      question: 'Is Power Interview AI legal to use?',
      category: 'gettingStarted',
      answer:
        'Power Interview AI is designed for legitimate educational and interview preparation purposes. However, you are responsible for ensuring your use complies with applicable laws and the terms of service of platforms you use. Always use ethically and legally.',
    },
    {
      question: 'Can I practice with a mock interview?',
      category: 'product',
      answer:
        'Yes, and it runs inside the app rather than sending you to another tool. Pick a seniority, a difficulty and a length of 3, 5, 8 or 12 questions, and an AI interviewer speaks its questions out loud in your interview language, presses with up to two follow-ups when an answer leaves something open, and listens while you answer into your microphone. The questions and the scoring both use the CV and job description already saved to your account. At the end you get an overall score with strengths and gaps, plus every question scored on its own with a justification and a stronger version of your answer, exportable as DOCX or Markdown.',
    },
    {
      question: 'How does the privacy protection work?',
      category: 'privacy',
      answer:
        'Your interview configuration - full name, profile/CV, and context - is saved to your account so it follows you across devices. Transcripts and screenshots are sent to our AI services when you request a suggestion, and transcripts are never persisted on our servers: they exist only for the length of your session. Your session token and device settings stay on your machine. We never sell or share your personal information.',
    },
    {
      question: 'Which AI model powers the suggestions?',
      category: 'product',
      answer:
        'The model is provided for you - there is nothing to connect or configure. New accounts run on our free model for their free hour, and a subscription moves you to our SOTA model with no practical rate limit.',
    },
    {
      question: 'What platforms are supported?',
      category: 'gettingStarted',
      answer: 'Power Interview AI runs on Windows today. macOS support is in development.',
    },
    {
      question: 'What languages can I interview in?',
      category: 'product',
      answer:
        'Ninety-seven, from English, Spanish, Chinese and Hindi to Cantonese, Swahili, Persian and Tamil - the full list is in the Languages section on the home page, and the language picker in the app has a search box. The mock interviewer speaks 44 of them out loud and writes its questions in the rest. One setting decides which speech model transcribes the call, the language your suggestions come back in, and the language of your exported report. You can change it mid-interview - transcription reconnects on the new language while suggestions follow immediately. Arabic, Hebrew, Persian, Urdu and the other right-to-left scripts render right-to-left throughout.',
    },
    {
      question: 'Do I need special hardware to run Power Interview AI?',
      category: 'gettingStarted',
      answer:
        'Power Interview AI runs on most modern Windows computers without special hardware. A stable internet connection improves streaming quality.',
    },
    {
      question: 'How accurate is the AI transcription?',
      category: 'product',
      answer:
        'Our real-time transcription uses advanced ASR (Automatic Speech Recognition) with dual-channel support and speaker detection. Accuracy depends on audio quality, but it performs excellently in typical interview scenarios with clear audio.',
    },
    {
      question: 'Can I use this for coding interviews?',
      category: 'product',
      answer:
        'Yes. Capture up to four screenshots of a coding problem to get a suggested approach and syntax-highlighted code. Use it to practice explaining solutions, and in interviews that allow AI tools.',
    },
    {
      question: 'Can I use it during a real interview?',
      category: 'privacy',
      answer:
        'Live help can run beside Zoom, Google Meet or Teams, but some employers and assessment platforms do not allow AI assistance. Check the rules for each interview and use it only where it is permitted. The app window is excluded from screen capture by default to protect the personal details it shows.',
    },
    {
      question: 'What does a mock interview cost?',
      category: 'billing',
      answer:
        'Nothing on top of your plan. With a subscription mock interviews are unlimited. On the free hour a mock spends it by the minute, like the live assistant: a 5-question session usually runs about 13 minutes and an 8-question one about 20, so the hour covers a couple of full sessions. If your free time runs out mid-interview it ends there and you still get your report.',
    },
    {
      question: 'How does the subscription work?',
      category: 'billing',
      answer:
        'Every account starts with one free hour on the free model. After that, a subscription gives you unlimited live and mock interviews on the SOTA model: $25 for a month, $60 for a quarter ($20 a month), or $180 for a year ($15 a month). It is a prepaid pass, not a recurring charge - nothing renews on its own, and buying another pass while one is running adds its time after the current end date.',
    },
    {
      question: 'What payment methods do you accept?',
      category: 'billing',
      answer:
        'We accept cryptocurrency only. No credit card, PayPal, or traditional bank payments are required. This ensures maximum privacy and security for your transactions. Simply purchase coins and use them to pay for a monthly, quarterly or annual pass within the application.',
    },
    {
      question: 'Is there a free trial?',
      category: 'billing',
      answer:
        'Yes! New users get a full free hour powered by our free model - with no practical rate limit and no interruptions. It includes every feature: live suggestions, triggered suggestions and mock interview practice. A subscription moves you to the SOTA model with unlimited interview time.',
    },
    {
      question: 'Can I use my account on more than one computer?',
      category: 'billing',
      answer:
        'Yes. Your profile follows you to any computer you sign in on. An account runs one interview at a time, though: starting an interview on a second computer ends the one running on the first.',
    },
    {
      question: 'Can I get a refund?',
      category: 'billing',
      answer:
        'Refunds are handled by our support team. Email team@vectorleappulse.xyz within 14 days of purchase with your order ID. If your refund is approved, we end the subscription time it paid for and send the money back to you.',
    },
  ] as FaqEntry[],
};

export type Faq = typeof faq;
