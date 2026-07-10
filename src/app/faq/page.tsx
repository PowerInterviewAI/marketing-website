import type { Metadata } from 'next';

import { buildMetadata } from '@/lib/metadata';

import { FAQPageContent } from './FAQPageContent';

export const metadata: Metadata = buildMetadata({
  title: 'FAQ',
  description:
    'Frequently asked questions about Power Interview AI - features, mock interviews, meeting note taking, privacy, payments, and usage.',
  path: '/faq',
});

export default function FAQPage() {
  return <FAQPageContent />;
}
