import React, { useEffect, useState } from 'react';

import { useLocation, useNavigate } from 'react-router-dom';

import Container from '@/components/Container';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Plan } from '@/types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://api.powerinterviewai.com/';

const planDescriptions: Record<string, string> = {
  starter: 'Perfect for trying out the platform',
  pro: 'Best value for serious job seekers',
  enterprise: 'For heavy users and teams',
};

const calculateDiscount = (plan: Plan, starterPricePerCredit: number): number => {
  const pricePerCredit = plan.price_usd / plan.credits;
  const discount = ((starterPricePerCredit - pricePerCredit) / starterPricePerCredit) * 100;
  return Math.round(discount);
};

export const PricingSection: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleGetStarted = () => {
    if (location.pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate('/');
    }
  };

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_BASE_URL}api/payment/plans`);
        if (!response.ok) {
          throw new Error('Failed to fetch plans');
        }
        const data: Plan[] = await response.json();
        setPlans(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        console.error('Error fetching plans:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();
  }, []);

  if (loading) {
    return (
      <section id="pricing" className="py-16 md:py-24" aria-labelledby="pricing-heading">
        <Container>
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Simple, Transparent Pricing
            </h2>
            <p className="text-lg text-muted-foreground">Loading plans...</p>
          </div>
        </Container>
      </section>
    );
  }

  if (error) {
    return (
      <section id="pricing" className="py-16 md:py-24" aria-labelledby="pricing-heading">
        <Container>
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Simple, Transparent Pricing
            </h2>
            <p className="text-lg text-destructive">
              Failed to load plans. Please try again later.
            </p>
          </div>
        </Container>
      </section>
    );
  }

  const starterPlan = plans.find((p) => p.plan.toLowerCase() === 'starter');
  const starterPricePerCredit = starterPlan ? starterPlan.price_usd / starterPlan.credits : 0;

  return (
    <section id="pricing" className="py-16 md:py-24" aria-labelledby="pricing-heading">
      <Container>
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Simple, Transparent Pricing
          </h2>
          <p className="text-lg text-muted-foreground">
            Choose the plan that fits your interview preparation needs
          </p>
          <div className="mt-6 inline-flex flex-col gap-2">
            <div className="rounded-lg bg-primary/10 px-6 py-3 text-center">
              <p className="text-sm font-semibold text-primary">
                🎁 New users can experience all features for free with rate limit!
              </p>
            </div>
            <p className="text-sm text-muted-foreground">
              Credit usage: 10 credits per minute of AI assistance
            </p>
            <div className="mt-2 rounded-lg border border-primary/20 bg-background px-4 py-2 text-center">
              <p className="text-xs font-medium text-foreground">
                💰 Payment: Coins only - No credit card, PayPal, or bank required
              </p>
            </div>
          </div>
        </div>

        <div className="mx-auto mb-10 grid max-w-5xl gap-6 md:grid-cols-2">
          <Card className="border-primary/30 bg-primary/5">
            <CardHeader>
              <CardTitle className="text-2xl">Free</CardTitle>
              <CardDescription>
                Unlimited interviews with fair-use limits for suggestions.
              </CardDescription>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                <li>
                  <span className="font-semibold text-foreground">AI suggestions:</span> 5 per hour
                </li>
                <li>
                  <span className="font-semibold text-foreground">Provided model:</span>{' '}
                  <code className="rounded bg-background px-1 py-0.5">
                    meta-llama/llama-4-scout-17b-16e-instruct
                  </code>
                </li>
                <li>
                  <span className="font-semibold text-foreground">Bring your own:</span> OpenAI,
                  Anthropic, Google, etc.
                </li>
              </ul>
            </CardHeader>
          </Card>

          <Card className="border-primary shadow-sm">
            <CardHeader>
              <CardTitle className="text-2xl">Paid</CardTitle>
              <CardDescription>Higher throughput plus provided SOTA models.</CardDescription>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                <li>
                  <span className="font-semibold text-foreground">AI suggestions:</span> higher rate
                  limits
                </li>
                <li>
                  <span className="font-semibold text-foreground">Provided model:</span>{' '}
                  <code className="rounded bg-background px-1 py-0.5">openai/gpt-5.4</code>
                </li>
                <li>
                  <span className="font-semibold text-foreground">Bring your own:</span> OpenAI,
                  Anthropic, Google, etc.
                </li>
              </ul>
            </CardHeader>
          </Card>
        </div>

        <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-3">
          {plans.map((plan) => {
            const planName = plan.plan.charAt(0).toUpperCase() + plan.plan.slice(1);
            const minutes = plan.credits / 10;
            const description = planDescriptions[plan.plan.toLowerCase()] || '';
            const discount =
              starterPricePerCredit > 0 ? calculateDiscount(plan, starterPricePerCredit) : 0;

            return (
              <Card
                key={plan.plan}
                className={`relative flex flex-col transition-shadow ${
                  plan.popular ? 'border-primary shadow-lg hover:shadow-xl' : 'hover:shadow-lg'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-0 right-0 flex justify-center">
                    <span className="rounded-full bg-primary px-4 py-1 text-sm font-semibold text-primary-foreground">
                      Most Popular
                    </span>
                  </div>
                )}
                <CardHeader className={'flex-1' + (plan.popular ? 'pt-8' : '')}>
                  <CardTitle className="text-2xl">{planName}</CardTitle>
                  <CardDescription>{description}</CardDescription>
                  <div className="mt-4 flex flex-wrap items-baseline gap-3">
                    <div>
                      <span className="text-4xl font-bold">${plan.price_usd}</span>
                      <span className="text-muted-foreground">
                        {' '}
                        / {plan.credits.toLocaleString()} credits
                      </span>
                    </div>
                    {discount > 0 && plan.plan.toLowerCase() === 'pro' && (
                      <span className="animate-pulse rounded-full bg-gradient-to-r from-green-500 to-emerald-600 px-4 py-1.5 text-sm font-bold text-white shadow-lg ring-2 ring-green-400/50">
                        💰 Save {discount}%
                      </span>
                    )}
                    {discount > 0 && plan.plan.toLowerCase() === 'enterprise' && (
                      <span className="animate-pulse rounded-full bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 px-4 py-1.5 text-sm font-bold text-white shadow-lg ring-2 ring-orange-400/50">
                        🔥 Save {discount}%
                      </span>
                    )}
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">
                    ~{minutes.toLocaleString()} minutes of AI assistance
                  </p>
                </CardHeader>
                <CardContent>
                  <Button
                    className="mt-6 w-full"
                    variant={plan.popular ? 'default' : 'outline'}
                    onClick={handleGetStarted}
                  >
                    Get Started
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </Container>
    </section>
  );
};

export default PricingSection;
