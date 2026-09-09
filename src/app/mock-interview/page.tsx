import type { Metadata } from 'next';

import { PageChrome } from '@/components/PageChrome';
import { InstallPanel, MockInterviewSection } from '@/components/sections';
import { buildMetadata } from '@/lib/metadata';

export const metadata: Metadata = buildMetadata({
  title: 'Mock Interview Practice',
  description:
    'Practice out loud against an AI interviewer that speaks its questions, presses on thin answers and returns a scored report you can export.',
  path: '/mock-interview',
});

export default function MockInterviewPage() {
  return (
    <PageChrome>
      <MockInterviewSection standalone />
      <InstallPanel />
    </PageChrome>
  );
}
