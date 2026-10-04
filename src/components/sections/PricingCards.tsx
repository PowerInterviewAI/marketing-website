import { Check, Minus } from 'lucide-react';

import { DownloadCta } from '@/components/DownloadCta';
import { Badge } from '@/components/ui/badge';
import { Reveal } from '@/components/ui/reveal';
import type { Locale } from '@/i18n/config';
import { format, pluralize } from '@/i18n/format';
import { getMessages } from '@/i18n/messages';
import { getPlans } from '@/lib/plans';
import { cn } from '@/lib/utils';
import { Plan } from '@/types';

const calculateDiscount = (plan: Plan, starterPricePerCredit: number): number => {
  const pricePerCredit = plan.price_usd / plan.credits;
  const discount = ((starterPricePerCredit - pricePerCredit) / starterPricePerCredit) * 100;
  return Math.round(discount);
};

// getPlans() used to be a live fetch awaited here, which meant /pricing (and
// the home page) waited on a backend round trip - a real request that could
// be slow, rate-limited or hit a cold start. It's a hardcoded constant now
// (see plans.ts), so this reads it directly rather than through a client
// fetch-and-skeleton dance that no longer has anything to wait for.
export const PricingCards: React.FC<{ locale: Locale }> = ({ locale }) => {
  const { pricing: copy } = getMessages(locale);
  const plans = getPlans();
  const starterPlan = plans.find((p) => p.plan.toLowerCase() === 'starter');
  const starterPricePerCredit = starterPlan ? starterPlan.price_usd / starterPlan.credits : 0;

  return (
    <div className="mx-auto mt-14 grid max-w-5xl items-start gap-6 md:grid-cols-3">
      {plans.map((plan, index) => {
        const key = plan.plan.toLowerCase() as keyof typeof copy.plans;
        const planName =
          copy.planNames[key] ?? plan.plan.charAt(0).toUpperCase() + plan.plan.slice(1);
        const minutes = plan.credits / 10;
        const description = copy.plans[key] || '';
        const discount =
          starterPricePerCredit > 0 ? calculateDiscount(plan, starterPricePerCredit) : 0;

        return (
          <Reveal key={plan.plan} delay={index * 80}>
            <div
              className={cn(
                'relative flex h-full flex-col gap-5 rounded-xl border bg-card p-6',
                plan.popular
                  ? 'border-primary shadow-glow-sm md:-mt-4 md:pb-8 md:pt-10'
                  : 'border-border'
              )}
            >
              {plan.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge variant="solid" size="md">
                    {copy.popular}
                  </Badge>
                </span>
              )}

              <div className="flex flex-col gap-1">
                <h3 className="text-lg font-semibold">{planName}</h3>
                <p className="text-sm text-muted-foreground">{description}</p>
              </div>

              <div className="flex flex-col gap-1">
                <div className="flex items-baseline gap-2">
                  <span className="font-display text-4xl font-semibold tracking-tight">
                    ${plan.price_usd}
                  </span>
                  {discount > 0 && (
                    <Badge variant="success" size="sm">
                      {format(copy.save, { percent: discount })}
                    </Badge>
                  )}
                </div>
                <p className="font-mono text-xs text-muted-foreground">
                  {format(copy.creditsLine, {
                    credits: plan.credits.toLocaleString(locale),
                    creditNoun: pluralize(locale, plan.credits, copy.creditNoun),
                    minutes: minutes.toLocaleString(locale),
                    minuteNoun: pluralize(locale, minutes, copy.minuteNoun),
                  })}
                </p>
              </div>

              <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <Check className="mt-0.5 size-4 shrink-0 text-success" aria-hidden="true" />
                  {copy.features.suggestions}
                </li>
                <li className="flex items-start gap-2">
                  <Check className="mt-0.5 size-4 shrink-0 text-success" aria-hidden="true" />
                  {copy.features.model}
                </li>
                <li className="flex items-start gap-2">
                  <Minus
                    className="mt-0.5 size-4 shrink-0 text-muted-foreground/60"
                    aria-hidden="true"
                  />
                  {copy.features.oneOff}
                </li>
              </ul>

              <DownloadCta
                className="mt-auto w-full"
                variant={plan.popular ? 'default' : 'outline'}
              >
                {copy.getStarted}
              </DownloadCta>
            </div>
          </Reveal>
        );
      })}
    </div>
  );
};

export default PricingCards;
