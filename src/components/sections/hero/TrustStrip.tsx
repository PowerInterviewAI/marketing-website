'use client';

import React from 'react';

import { Briefcase, Languages, MonitorSmartphone, ShieldCheck } from 'lucide-react';

import { LANGUAGE_COUNT } from '@/config/languages';
import { SECTIONS, homeAnchor } from '@/config/routes';
import { useLocale, useMessages } from '@/i18n/LocaleProvider';
import { LocalizedLink } from '@/i18n/LocalizedLink';
import { pluralize } from '@/i18n/format';

/**
 * Facts under the hero CTA.
 *
 * Used to also show a live "N interviews live now" count, polled from the
 * backend every 30s. Hardcoding that number would have meant a badge that
 * claims to be live while never changing - worse than not showing it - so it
 * was removed outright rather than frozen in place. If a genuine live count
 * is wanted back, it needs an actual live source, not a hardcoded one.
 */
export const TrustStrip: React.FC = () => {
  const t = useMessages().hero.trust;
  const locale = useLocale();

  return (
    <div className="flex flex-col items-center gap-6">
      <dl className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <MonitorSmartphone className="size-4 shrink-0" aria-hidden="true" />
          <dt className="sr-only">{t.platformsLabel}</dt>
          {/* macOS isn't ready to ship yet - see MACOS_SUPPORTED in
            DownloadButton.tsx. Update both when it lands. */}
          <dd>{t.platforms}</dd>
        </div>

        <div className="flex items-center gap-2">
          <Languages className="size-4 shrink-0" aria-hidden="true" />
          <dt className="sr-only">{t.languagesLabel}</dt>
          {/* The one fact in this strip a reader can disagree with, so it is the
            one that links: the full list is a section down the page, and
            "which 28?" is unanswerable from a number. */}
          <dd>
            <LocalizedLink
              href={homeAnchor(SECTIONS.languages)}
              className="underline-offset-4 transition-colors hover:text-foreground hover:underline"
            >
              <span className="font-semibold text-foreground">{LANGUAGE_COUNT}</span>{' '}
              {pluralize(locale, LANGUAGE_COUNT, t.languageNoun)}
            </LocalizedLink>
          </dd>
        </div>

        <div className="flex items-center gap-2">
          <Briefcase className="size-4 shrink-0" aria-hidden="true" />
          <dt className="sr-only">{t.rolesLabel}</dt>
          {/* Sits directly under a carousel that is three parts coding
            challenge. Without this line the demo is the only answer a reader
            gets to "is this for my job?", and it answers wrongly. */}
          <dd>{t.roles}</dd>
        </div>

        <div className="flex items-center gap-2">
          <ShieldCheck className="size-4 shrink-0" aria-hidden="true" />
          <dt className="sr-only">{t.privacyLabel}</dt>
          <dd>{t.privacy}</dd>
        </div>
      </dl>

      <a
        href="https://peerpush.net/p/power-interview-ai"
        target="_blank"
        rel="noopener"
        className="opacity-80 transition-opacity hover:opacity-100"
      >
        {/*
        A plain img rather than next/image: this badge is a live rating that
        should never be optimised into a stale cached copy, and it's on a
        third-party host. The explicit width/height is what actually matters
        here - the old markup sized it with an inline style and shifted the
        layout on load.
      */}
        <img
          src="https://peerpush.net/p/power-interview-ai/rating-badge.png"
          alt={t.badgeAlt}
          width={260}
          height={54}
          loading="lazy"
          decoding="async"
          className="h-auto w-[260px]"
        />
      </a>
    </div>
  );
};

export default TrustStrip;
