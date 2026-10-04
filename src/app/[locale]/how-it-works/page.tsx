import type { Metadata } from 'next';

import { PageChrome } from '@/components/PageChrome';
import { HowItWorksSection, InstallPanel } from '@/components/sections';
import { buildMetadata } from '@/lib/metadata';

export const metadata: Metadata = buildMetadata({
  title: 'How It Works',
  description:
    'Install the desktop app, add your CV and the job description, rehearse against the AI interviewer, then join the real Zoom, Meet or Teams call.',
  path: '/how-it-works',
});

export default function HowItWorksPage() {
  return (
    <PageChrome>
      <HowItWorksSection standalone />
      <InstallPanel />
    </PageChrome>
  );
}
