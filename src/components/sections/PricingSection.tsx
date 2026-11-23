import React from 'react';

import { Check, ChevronDown } from 'lucide-react';

import { Reveal } from '@/components/ui/reveal';
import { Section, SectionHeading } from '@/components/ui/section';
import { LANGUAGE_COUNT } from '@/config/languages';
import { SECTIONS } from '@/config/routes';
import type { Locale } from '@/i18n/config';
import { format } from '@/i18n/format';
import { getMessages } from '@/i18n/messages';
import { formatUsd, getPaidPlans } from '@/lib/plans';

import { PricingCards } from './PricingCards';

const IncludedList: React.FC<{ title: string; items: string[] }> = ({ title, items }) => (
  <div>
    <h3 className="text-sm font-semibold">{title}</h3>
    <ul className="mt-3 flex flex-col gap-2 text-sm text-muted-foreground">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-2">
          <Check className="mt-0.5 size-4 shrink-0 text-success" aria-hidden="true" />
          {item}
        </li>
      ))}
    </ul>
  </div>
);

interface PricingSectionProps {
  locale: Locale;
  /** Set on the standalone /pricing route so the section owns the h1. */
  standalone?: boolean;
}

/**
 * Plans first, then what they share once, then the billing detail on request.
 *
 * Billing is prepaid crypto, which cannot be charged on a schedule, so "no
 * automatic renewal" is a property of the product rather than a promotion.
 * Prices come from PricingCards, which reads the constant in lib/plans.ts.
 */
export const PricingSection = ({ locale, standalone = false }: PricingSectionProps) => {
  const { pricing: copy, hero } = getMessages(locale);
  const { features, billing, included } = copy;

  // Cheapest last, so the description reads "$25 a month, or $15 a month paid annually".
  const monthly = [...getPaidPlans()].sort((a, b) => b.price_per_month_usd - a.price_per_month_usd);
  const usd = (amount: number) => formatUsd(amount, locale);

  return (
    <Section id={SECTIONS.pricing} aria-labelledby="pricing-heading">
      <SectionHeading
        id="pricing-heading"
        as={standalone ? 'h1' : 'h2'}
        eyebrow={copy.eyebrow}
        title={copy.title}
        description={format(copy.description, {
          monthly: usd(monthly[0]?.price_per_month_usd ?? 0),
          yearly: usd(monthly[monthly.length - 1]?.price_per_month_usd ?? 0),
        })}
      />

      <PricingCards locale={locale} />

      <Reveal className="mx-auto mt-4 max-w-6xl">
        <div className="grid gap-6 rounded-xl border border-border bg-surface-1 p-6 md:grid-cols-2 md:gap-10">
          <IncludedList
            title={included.every}
            items={[
              features.suggestions,
              features.mock,
              format(hero.surface.allLanguages, { count: LANGUAGE_COUNT }),
            ]}
          />
          <IncludedList
            title={included.paid}
            items={[features.sotaModel, features.unlimited, features.noRenewal, copy.coinsBadge]}
          />
        </div>
      </Reveal>

      <details className="group mx-auto mt-6 max-w-3xl">
        <summary className="mx-auto flex w-fit cursor-pointer list-none items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring [&::-webkit-details-marker]:hidden">
          <ChevronDown
            className="size-4 transition-transform group-open:rotate-180"
            aria-hidden="true"
          />
          {billing.title}
        </summary>
        <dl className="mt-3 grid gap-4 rounded-xl border border-border-subtle bg-surface-1 p-5 sm:grid-cols-2">
          <div>
            <dt className="text-sm font-medium text-foreground">{billing.free}</dt>
            <dd className="mt-1 text-sm leading-relaxed text-muted-foreground">
              {billing.freeText}
            </dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-foreground">{billing.paid}</dt>
            <dd className="mt-1 text-sm leading-relaxed text-muted-foreground">
              {billing.paidText}
            </dd>
          </div>
        </dl>
      </details>
    </Section>
  );
};

export default PricingSection;
