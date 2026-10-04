import React from 'react';

import { SiProtonmail } from '@icons-pack/react-simple-icons';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Section, SectionHeading } from '@/components/ui/section';
import { FAQ_CATEGORIES, getFaqItems } from '@/config/faq';
import { SECTIONS, homeAnchor } from '@/config/routes';
import { LocalizedLink } from '@/i18n/LocalizedLink';
import type { Locale } from '@/i18n/config';
import { getMessages } from '@/i18n/messages';

interface FAQSectionProps {
  locale: Locale;
  /** Set on the standalone /faq route so the section owns the h1. */
  standalone?: boolean;
}

/**
 * The full, category-grouped question list, on the home page and /faq alike
 * - not condensed to the first few questions with a link across, the way
 * this section used to work. With the header nav always pointing at the home
 * anchor (see NAV_LINKS in routes.ts), a reader landing here via the nav is
 * already where they're going. /faq itself is unchanged - still a real,
 * indexable page for direct links and search results.
 */
export const FAQSection: React.FC<FAQSectionProps> = ({ locale, standalone = false }) => {
  const { faq: copy } = getMessages(locale);
  const allItems = getFaqItems(locale);

  return (
    <Section id={SECTIONS.faq} aria-labelledby="faq-heading">
      <SectionHeading
        id="faq-heading"
        as={standalone ? 'h1' : 'h2'}
        eyebrow={copy.eyebrow}
        title={copy.title}
        description={copy.description}
      />

      <div className="mx-auto mt-14 flex max-w-3xl flex-col gap-10">
        {FAQ_CATEGORIES.map((category) => {
          const items = allItems.filter((item) => item.category === category);
          if (items.length === 0) return null;

          return (
            <div key={category} className="flex flex-col gap-3">
              <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                {copy.categories[category]}
              </h3>

              <Accordion type="single" collapsible className="flex flex-col gap-2">
                {items.map((item) => (
                  <AccordionItem key={item.question} value={item.question}>
                    <AccordionTrigger>{item.question}</AccordionTrigger>
                    <AccordionContent>{item.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          );
        })}
      </div>

      <div className="mt-14 text-center">
        <p className="mb-4 text-muted-foreground">{copy.stillQuestions}</p>
        {/* One destination from everywhere. This used to scroll on the home page
            and be a raw <a> - a full page reload - on /faq. */}
        <Button variant="outline" asChild>
          <LocalizedLink href={homeAnchor(SECTIONS.contact)}>
            {copy.contact}
            <SiProtonmail className="size-4" />
          </LocalizedLink>
        </Button>
      </div>
    </Section>
  );
};

export default FAQSection;
