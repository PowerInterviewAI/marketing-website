import React from 'react';

import { CalendarCheck, Check, Coins } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Reveal } from '@/components/ui/reveal';
import { Section, SectionHeading } from '@/components/ui/section';
import { SECTIONS } from '@/config/routes';
import type { Locale } from '@/i18n/config';
import { format } from '@/i18n/format';
import { getMessages } from '@/i18n/messages';
import { getPaidPlans } from '@/lib/plans';

import { PricingCards } from './PricingCards';

/** Free vs subscribed, so the difference is visible before the plan cards. */
type TierValue = string | true;

const TierValueCell: React.FC<{ value: TierValue; included: string }> = ({ value, included }) =>
  value === true ? (
    <>
      <Check className="size-4 text-success" aria-hidden="true" />
      <span className="sr-only">{included}</span>
    </>
  ) : (
    <span className="text-muted-foreground">{value}</span>
  );

/**
 * How the two halves are paid for: the free hour is spent by the minute and
 * stops a session at zero, and a subscription is a prepaid pass that never
 * renews by itself. Payment is crypto, which cannot be charged on a schedule,
 * so "no auto-renewal" is a property of the product rather than a promotion.
 */
const BillingNote: React.FC<{ locale: Locale }> = ({ locale }) => {
  const t = getMessages(locale).pricing.billing;

  return (
    <Reveal className="mx-auto mt-6 max-w-3xl">
      <div className="rounded-xl border border-border-subtle bg-surface-1 p-5">
        <h3 className="text-sm font-semibold">{t.title}</h3>
        <dl className="mt-3 grid gap-3 sm:grid-cols-2">
          <div>
            <dt className="text-sm font-medium text-foreground">{t.free}</dt>
            <dd className="mt-1 text-sm leading-relaxed text-muted-foreground">{t.freeText}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-foreground">{t.paid}</dt>
            <dd className="mt-1 text-sm leading-relaxed text-muted-foreground">{t.paidText}</dd>
          </div>
        </dl>
      </div>
    </Reveal>
  );
};

interface PricingSectionProps {
  locale: Locale;
  /** Set on the standalone /pricing route so the section owns the h1. */
  standalone?: boolean;
}

/**
 * Full pricing detail, on the home page and /pricing alike - not condensed
 * with a "compare plans" link across, the way this section used to work.
 * With the header nav always pointing at the home anchor (see NAV_LINKS in
 * routes.ts), a reader landing on this section via the nav is already where
 * they're going; a link to a separate page repeating the same content back
 * to them had nothing to add. /pricing itself is unchanged - still a real,
 * indexable page for direct links and search results.
 *
 * Plan prices come from PricingCards, which reads a hardcoded constant
 * (see lib/plans.ts) rather than fetching. That fetch used to be awaited
 * here, server-side, with no revalidate directive - which meant Next treated
 * /pricing as static and only paid that cost again on the first visit after
 * each deploy, freezing the page the same way TeamSection once froze /team.
 * Hardcoding removed the dependency entirely rather than just deferring it.
 *
 * The route-level loading fallback lives in Skeletons.tsx.
 */
export const PricingSection = ({ locale, standalone = false }: PricingSectionProps) => {
  const { pricing: copy } = getMessages(locale);
  const tier = copy.tier;

  const rows: { label: string; trial: TierValue; paid: TierValue }[] = [
    { label: tier.duration.label, trial: tier.duration.trial, paid: tier.duration.paid },
    { label: tier.model.label, trial: tier.model.trial, paid: tier.model.paid },
    { label: tier.live, trial: true, paid: true },
    { label: tier.triggered, trial: true, paid: true },
    { label: tier.mock, trial: true, paid: true },
    { label: tier.rateLimit.label, trial: tier.rateLimit.trial, paid: tier.rateLimit.paid },
  ];

  // Cheapest last, so the description reads "$20 a month, or $12 a month paid yearly".
  const monthly = [...getPaidPlans()].sort((a, b) => b.price_per_month_usd - a.price_per_month_usd);
  const usd = (amount: number) => `$${amount.toLocaleString(locale)}`;

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

      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Badge variant="success" size="lg" dot>
          {copy.trialBadge}
        </Badge>
        <Badge variant="outline" size="lg">
          <Coins aria-hidden="true" />
          {copy.coinsBadge}
        </Badge>
        <Badge variant="outline" size="lg">
          <CalendarCheck aria-hidden="true" />
          {copy.prepaidBadge}
        </Badge>
      </div>

      <Reveal className="mx-auto mt-12 max-w-3xl">
        <div className="overflow-x-auto rounded-xl border border-border bg-card">
          <table className="w-full min-w-[34rem] border-collapse text-sm">
            <caption className="sr-only">{tier.caption}</caption>
            <thead>
              <tr className="border-b border-border">
                <th scope="col" className="px-5 py-4 text-left font-medium text-muted-foreground">
                  {tier.whatYouGet}
                </th>
                <th scope="col" className="w-48 px-4 py-4 text-left font-semibold text-foreground">
                  {tier.trial}
                </th>
                <th
                  scope="col"
                  className="w-48 bg-primary/5 px-4 py-4 text-left font-semibold text-foreground"
                >
                  {tier.paid}
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.label} className="border-b border-border-subtle last:border-b-0">
                  <th scope="row" className="px-5 py-3 text-left font-normal text-foreground">
                    {row.label}
                  </th>
                  <td className="px-4 py-3">
                    <TierValueCell value={row.trial} included={tier.included} />
                  </td>
                  <td className="bg-primary/5 px-4 py-3">
                    <TierValueCell value={row.paid} included={tier.included} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Reveal>

      <BillingNote locale={locale} />

      <PricingCards locale={locale} />
    </Section>
  );
};

export default PricingSection;
