'use client';

import { useRouter } from 'next/navigation';

import { PageChrome } from '@/components/PageChrome';
import { FAQSection } from '@/components/sections';

// FAQ page has no in-page sections to scroll to, so its "Contact Us" button
// routes to the /contact page instead of scrolling like it does on Home.
export function FAQPageContent() {
  const router = useRouter();

  const scrollToSection = (sectionId: string) => {
    if (sectionId === 'contact') {
      router.push('/contact');
    }
  };

  return (
    <PageChrome>
      <FAQSection scrollToSection={scrollToSection} />
    </PageChrome>
  );
}
