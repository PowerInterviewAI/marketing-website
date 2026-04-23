import React from 'react';

import { SiProtonmail } from '@icons-pack/react-simple-icons';

import Container from '@/components/Container';
import { Button } from '@/components/ui/button';

interface FAQSectionProps {
  openFaqIndex: number | null;
  setOpenFaqIndex: (index: number | null) => void;
  scrollToSection: (sectionId: string) => void;
}

const faqData = [
  {
    question: 'Is Power Interview AI legal to use?',
    answer:
      'Power Interview AI is designed for legitimate educational and interview preparation purposes. However, you are responsible for ensuring your use complies with applicable laws and the terms of service of platforms you use. Always use ethically and legally.',
  },
  {
    question: 'How does the privacy protection work?',
    answer:
      'Your data stays with you. All sensitive information is stored locally on your device using encrypted storage. Only necessary data (transcripts, screenshots) is sent to our AI services for suggestions. We never collect, sell, or share your personal information.',
  },
  {
    question: 'Can I use my own LLM provider?',
    answer:
      'Yes. All users can bring their own provider (OpenAI, Anthropic, Google, and more) using API keys they control. Depending on your plan, we also include a default model so you can get started instantly.',
  },
  {
    question: 'What platforms are supported?',
    answer: 'Power Interview AI currently supports both Windows and macOS.',
  },
  {
    question: 'Do I need special hardware to run Power Interview AI?',
    answer:
      'Power Interview AI runs on most modern Windows and macOS computers without special hardware requirements. A stable internet connection improves streaming performance, but you do not need a dedicated GPU.',
  },
  {
    question: 'How accurate is the AI transcription?',
    answer:
      'Our real-time transcription uses advanced ASR (Automatic Speech Recognition) with dual-channel support and speaker detection. Accuracy depends on audio quality, but it performs excellently in typical interview scenarios with clear audio.',
  },
  {
    question: 'Can I use this for coding interviews?',
    answer:
      'Absolutely! Power Interview AI includes specialized code suggestion features. It can analyze screenshots of coding problems and provide LLM-powered solutions with proper syntax highlighting. Perfect for technical interviews.',
  },
  {
    question: 'What is stealth mode?',
    answer:
      'Stealth mode allows you to operate the assistant discreetly during interviews. You can control everything via hotkeys, adjust window opacity, and position windows strategically-all without losing focus on your interview tab or application. Additionally, the window is not capturable in screenshots and remains invisible during full screen sharing, ensuring complete privacy during your interview.',
  },
  {
    question: 'How do credits work?',
    answer:
      'Credits are consumed at a rate of 10 credits per minute when using AI-powered features like reply suggestions, code analysis, and transcription. For example, a 30-minute interview session would use approximately 300 credits. You can purchase credit packs starting from 600 credits ($9 for ~60 minutes) up to 60,000 credits ($500 for ~6,000 minutes).',
  },
  {
    question: 'What payment methods do you accept?',
    answer:
      'We accept cryptocurrency coins only. No credit card, PayPal, or traditional bank payments are required. This ensures maximum privacy and security for your transactions. Simply purchase coins and use them to buy credit packs within the application.',
  },
  {
    question: 'Is there a free trial?',
    answer:
      'Yes! New users get a full 1-hour free trial powered by the Llama-4-Scout model - with no rate limits and no interruptions. Experience every feature at its full potential before committing to a paid plan.',
  },
  {
    question: 'Can I get a refund?',
    answer:
      'We stand behind our product. If you are not satisfied with Power Interview AI, please contact us at team@vectorleappulse.xyz within 14 days of purchase to discuss refund options.',
  },
];

export const FAQSection: React.FC<FAQSectionProps> = ({
  openFaqIndex,
  setOpenFaqIndex,
  scrollToSection,
}) => {
  return (
    <section id="faq" className="py-16 md:py-24" aria-labelledby="faq-heading">
      <Container>
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2
            id="faq-heading"
            className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl"
          >
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-muted-foreground">
            Everything you need to know about Power Interview AI
          </p>
        </div>

        <div className="mx-auto max-w-3xl space-y-4">
          {faqData.map((faq, index) => (
            <div key={index} className="rounded-lg border bg-background p-4">
              <button
                className="w-full text-left"
                onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">{faq.question}</h3>
                  <svg
                    className={`h-5 w-5 transition-transform ${
                      openFaqIndex === index ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </button>
              {openFaqIndex === index && (
                <div className="mt-3 text-muted-foreground">{faq.answer}</div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="mb-4 text-muted-foreground">Still have questions?</p>
          <Button variant="outline" onClick={() => scrollToSection('contact')}>
            Contact Us
            <SiProtonmail className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </Container>
    </section>
  );
};

export default FAQSection;
