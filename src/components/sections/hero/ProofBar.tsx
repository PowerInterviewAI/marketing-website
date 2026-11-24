'use client';

import React from 'react';

import { Briefcase, Languages, type LucideIcon, ShieldCheck, Volume2 } from 'lucide-react';

import Container from '@/components/Container';
import { LANGUAGE_COUNT, VOICE_LANGUAGE_COUNT } from '@/config/languages';
import { ROUTES } from '@/config/routes';
import { useLocale, useMessages } from '@/i18n/LocaleProvider';
import { LocalizedLink } from '@/i18n/LocalizedLink';
import { format, pluralize } from '@/i18n/format';

const Fact: React.FC<{ icon: LucideIcon; label: string; children: React.ReactNode }> = ({
  icon: Icon,
  label,
  children,
}) => (
  <div className="flex min-w-0 items-center gap-2.5">
    <Icon className="size-4 shrink-0 text-primary" aria-hidden="true" />
    <dt className="sr-only">{label}</dt>
    <dd className="min-w-0 text-sm font-medium text-foreground">{children}</dd>
  </div>
);

/** Verifiable product facts only. Counts derive from the language list. */
export const ProofBar: React.FC = () => {
  const { hero, common } = useMessages();
  const locale = useLocale();
  const t = hero.trust;

  return (
    <div className="border-y border-border bg-surface-1">
      <Container className="flex flex-col gap-5 py-5 lg:flex-row lg:items-center lg:justify-between">
        <dl className="grid grid-cols-1 gap-x-8 gap-y-3 min-[420px]:grid-cols-2 lg:flex lg:flex-wrap">
          <Fact icon={Languages} label={t.languagesLabel}>
            <LocalizedLink
              href={ROUTES.languages}
              prefetch={false}
              className="underline-offset-4 hover:text-primary hover:underline"
            >
              {LANGUAGE_COUNT} {pluralize(locale, LANGUAGE_COUNT, common.languageNoun)}
            </LocalizedLink>
          </Fact>
          <Fact icon={Volume2} label={t.languagesLabel}>
            {format(t.voices, { voices: VOICE_LANGUAGE_COUNT })}
          </Fact>
          <Fact icon={Briefcase} label={t.rolesLabel}>
            {t.roles}
          </Fact>
          <Fact icon={ShieldCheck} label={t.privacyLabel}>
            {t.privacy}
          </Fact>
        </dl>

        <a
          href="https://peerpush.net/p/power-interview-ai"
          target="_blank"
          rel="noopener"
          className="w-fit shrink-0 opacity-90 transition-opacity hover:opacity-100"
        >
          {/* Third-party live rating, so it bypasses image optimization. */}
          <img
            src="https://peerpush.net/p/power-interview-ai/rating-badge.png"
            alt={t.badgeAlt}
            width={680}
            height={130}
            loading="lazy"
            decoding="async"
            className="h-14 w-auto"
          />
        </a>
      </Container>
    </div>
  );
};

export default ProofBar;
