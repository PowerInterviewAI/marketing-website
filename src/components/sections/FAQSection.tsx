import React from 'react';

import { SiProtonmail } from '@icons-pack/react-simple-icons';
import { ArrowRight } from 'lucide-react';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Section, SectionHeading } from '@/components/ui/section';
import { FAQ_CATEGORIES, getFaqItems } from '@/config/faq';
import { ROUTES, SECTIONS, homeAnchor } from '@/config/routes';
import { LocalizedLink } from '@/i18n/LocalizedLink';
import type { Locale } from '@/i18n/config';
import { getMessages } from '@/i18n/messages';

const HOME_QUESTIONS_PER_CATEGORY = 2;

interface FAQSectionProps {
  locale: Locale;
  /** Set on the standalone /faq route so the section owns the h1 and shows every question. */
  standalone?: boolean;
}

/**
 * The home page answers the likeliest objections from each category and links
 * to /faq, which stays the complete, indexable list and carries the FAQPage
 * structured data.
 */
export const FAQSection: React.FC<FAQSectionProps> = ({ locale, standalone = false }) => {
  const { faq: copy } = getMessages(locale);
  const allItems = getFaqItems(locale);

  return (
    <Section id={SECTIONS.faq} aria-labelledby="faq-heading">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-14">
        <div className="flex flex-col items-start gap-6 lg:sticky lg:top-24 lg:self-start">
          <SectionHeading
            id="faq-heading"
            as={standalone ? 'h1' : 'h2'}
            align="left"
            eyebrow={copy.eyebrow}
            title={copy.title}
            description={copy.description}
          />
          <div className="flex flex-wrap gap-3">
            {!standalone && (
              <Button variant="outline" asChild>
                <LocalizedLink href={ROUTES.faq} prefetch={false}>
                  {copy.seeAll}
                  <ArrowRight className="rtl:rotate-180" />
                </LocalizedLink>
              </Button>
            )}
            <Button variant="ghost" asChild>
              <LocalizedLink href={homeAnchor(SECTIONS.contact)}>
                <SiProtonmail className="size-4" />
                {copy.contact}
              </LocalizedLink>
            </Button>
          </div>
        </div>

        <div className="flex min-w-0 flex-col gap-8">
          {FAQ_CATEGORIES.map((category) => {
            const categoryItems = allItems.filter((item) => item.category === category);
            const items = standalone
              ? categoryItems
              : categoryItems.slice(0, HOME_QUESTIONS_PER_CATEGORY);
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
      </div>
    </Section>
  );
};

export default FAQSection;
