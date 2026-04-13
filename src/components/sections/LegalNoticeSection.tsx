import React from 'react';

import Container from '@/components/Container';
import { Card, CardContent } from '@/components/ui/card';

export const LegalNoticeSection: React.FC = () => {
  return (
    <section
      className="border-y bg-amber-500/5 py-12 md:py-16"
      aria-labelledby="legal-notice-heading"
    >
      <Container>
        <div className="mx-auto max-w-4xl">
          <div className="mb-8 text-center">
            <h2
              id="legal-notice-heading"
              className="mb-4 text-2xl font-bold tracking-tight text-amber-900 dark:text-amber-400 sm:text-3xl"
            >
              ⚠️ Important Legal Notice
            </h2>
          </div>

          <Card className="border-amber-500/50 bg-background">
            <CardContent className="pt-6">
              <div className="space-y-6 text-sm leading-relaxed text-muted-foreground">
                <div>
                  <h3 className="mb-2 text-2xl font-semibold tracking-tight text-amber-900 dark:text-amber-300">
                    Ethical Use - Legal Use Only
                  </h3>
                  <p className="text-base">
                    This product is powerful and must be used{' '}
                    <span className="font-semibold text-amber-700 dark:text-amber-400">
                      responsibly and legally
                    </span>
                    . Using it to impersonate another person, misrepresent your identity, or deceive
                    interviewers can be{' '}
                    <span className="font-semibold text-foreground">illegal</span> and may lead to:
                  </p>
                  <ul className="ml-6 mt-4 list-disc space-y-1 text-sm">
                    <li>Criminal charges for fraud or identity theft</li>
                    <li>Civil liability for misrepresentation</li>
                    <li>Permanent bans from hiring platforms and companies</li>
                    <li>Damage to your professional reputation</li>
                  </ul>
                </div>

                <div className="rounded-lg border-2 border-amber-500 bg-amber-500/10 p-4">
                  <p className="font-semibold text-amber-900 dark:text-amber-400">
                    ⚖️ By using this product, you acknowledge that you will use it ethically,
                    legally, and only for legitimate practice and preparation scenarios. Do not use
                    it to deceive others.
                  </p>
                </div>

                <div className="text-center">
                  <p className="text-xs text-muted-foreground">
                    For questions about legal use, please contact:{' '}
                    <a
                      href="mailto:power-interview@protonmail.com"
                      className="font-medium text-primary hover:underline"
                    >
                      power-interview@protonmail.com
                    </a>
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </Container>
    </section>
  );
};

export default LegalNoticeSection;
