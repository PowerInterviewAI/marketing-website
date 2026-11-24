import { DownloadCta } from '@/components/DownloadCta';
import { Badge } from '@/components/ui/badge';
import { Reveal } from '@/components/ui/reveal';
import type { Locale } from '@/i18n/config';
import { format, pluralize } from '@/i18n/format';
import { getMessages } from '@/i18n/messages';
import { formatUsd, getPlans, savingPercent } from '@/lib/plans';
import { cn } from '@/lib/utils';
import type { Plan } from '@/types';

/**
 * Each card carries only what differs between plans: who it suits, the price
 * and the term. Features they share sit once in PricingSection, so comparing
 * plans does not mean reading the same list four times.
 *
 * The plans are a hardcoded constant (see plans.ts) rather than a fetch, so
 * /pricing and the home page never wait on a backend round trip to render.
 */
export const PricingCards: React.FC<{ locale: Locale }> = ({ locale }) => {
  const { pricing: copy } = getMessages(locale);
  const plans = getPlans();

  const usd = (amount: number) => formatUsd(amount, locale);

  const priceLine = (plan: Plan) =>
    plan.months === null
      ? `${copy.freeLine} · ${copy.features.freeModel}`
      : format(copy.billedAs, {
          price: usd(plan.price_usd),
          months: plan.months.toLocaleString(locale),
          monthNoun: pluralize(locale, plan.months, copy.monthNoun),
        });

  return (
    <div className="mx-auto mt-12 grid max-w-6xl gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {plans.map((plan, index) => {
        const free = plan.price_usd === 0;
        const saving = savingPercent(plan);

        return (
          <Reveal key={plan.plan} delay={index * 80} className="h-full">
            <div
              className={cn(
                'relative flex h-full flex-col gap-5 rounded-xl border bg-card p-6',
                plan.popular ? 'border-primary shadow-glow-sm' : 'border-border'
              )}
            >
              {plan.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap">
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
                <div className="flex flex-wrap items-baseline gap-2">
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
                <p className="text-xs leading-relaxed text-muted-foreground">{priceLine(plan)}</p>
              </div>

              <DownloadCta
                className="mt-auto w-full"
                variant={plan.popular ? 'default' : 'outline'}
                placement="pricing"
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
