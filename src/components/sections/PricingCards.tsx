import { Check } from 'lucide-react';

import { DownloadCta } from '@/components/DownloadCta';
import { Badge } from '@/components/ui/badge';
import { Reveal } from '@/components/ui/reveal';
import type { Locale } from '@/i18n/config';
import { format, pluralize } from '@/i18n/format';
import { getMessages } from '@/i18n/messages';
import { getPlans, savingPercent } from '@/lib/plans';
import { cn } from '@/lib/utils';
import type { Plan } from '@/types';

const Feature: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <li className="flex items-start gap-2">
    <Check className="mt-0.5 size-4 shrink-0 text-success" aria-hidden="true" />
    {children}
  </li>
);

// The plans are a hardcoded constant (see plans.ts) rather than a fetch, so
// /pricing and the home page never wait on a backend round trip to render.
export const PricingCards: React.FC<{ locale: Locale }> = ({ locale }) => {
  const { pricing: copy } = getMessages(locale);
  const plans = getPlans();

  const usd = (amount: number) => `$${amount.toLocaleString(locale)}`;

  const priceLine = (plan: Plan) =>
    plan.days === null
      ? copy.freeLine
      : format(copy.billedAs, {
          price: usd(plan.price_usd),
          days: plan.days.toLocaleString(locale),
          dayNoun: pluralize(locale, plan.days, copy.dayNoun),
        });

  return (
    <div className="mx-auto mt-14 grid max-w-5xl items-start gap-6 md:grid-cols-3">
      {plans.map((plan, index) => {
        const free = plan.price_usd === 0;
        const saving = savingPercent(plan);

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
                <h3 className="text-lg font-semibold">{copy.planNames[plan.plan]}</h3>
                <p className="text-sm text-muted-foreground">{copy.plans[plan.plan]}</p>
              </div>

              <div className="flex flex-col gap-1">
                <div className="flex items-baseline gap-2">
                  <span className="font-display text-4xl font-semibold tracking-tight">
                    {usd(plan.price_per_month_usd)}
                  </span>
                  {!free && <span className="text-sm text-muted-foreground">{copy.perMonth}</span>}
                  {saving > 0 && (
                    <Badge variant="success" size="sm">
                      {format(copy.save, { percent: saving })}
                    </Badge>
                  )}
                </div>
                <p className="font-mono text-xs text-muted-foreground">{priceLine(plan)}</p>
              </div>

              <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
                <Feature>{copy.features.suggestions}</Feature>
                <Feature>{copy.features.mock}</Feature>
                <Feature>{free ? copy.features.freeModel : copy.features.sotaModel}</Feature>
                <Feature>{free ? copy.features.oneHour : copy.features.unlimited}</Feature>
                {!free && <Feature>{copy.features.noRenewal}</Feature>}
              </ul>

              <DownloadCta
                className="mt-auto w-full"
                variant={plan.popular ? 'default' : 'outline'}
              >
                {free ? copy.startFree : copy.getStarted}
              </DownloadCta>
            </div>
          </Reveal>
        );
      })}
    </div>
  );
};

export default PricingCards;
