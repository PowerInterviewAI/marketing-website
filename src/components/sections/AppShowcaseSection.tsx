import React from 'react';

import { ArrowRight, FileDown, Languages } from 'lucide-react';
import Image from 'next/image';

import Container from '@/components/Container';
import { Eyebrow } from '@/components/ui/section';
import { LANGUAGE_COUNT } from '@/config/languages';
import { ROUTES } from '@/config/routes';
import { LocalizedLink } from '@/i18n/LocalizedLink';
import type { Locale } from '@/i18n/config';
import { pluralize } from '@/i18n/format';
import { getMessages } from '@/i18n/messages';
import { cn } from '@/lib/utils';

interface Shot {
  src: string;
  width: number;
  height: number;
}

const doc = (src: string): Shot => ({ src, width: 1560, height: 1020 });
const demo = (src: string): Shot => ({ src, width: 1920, height: 1080 });

/**
 * Real renderer captures with scripted sample data (see MEDIA.md), mock and
 * live mixed in every column so neither mode reads as the lead.
 */
const COLUMNS: readonly Shot[][] = [
  [
    doc('/media/docs/mock/setup.png'),
    doc('/media/docs/app/overview.jpg'),
    doc('/media/docs/app/account.png'),
  ],
  [
    doc('/media/docs/mock/report.png'),
    demo('/media/demos/live.webp'),
    doc('/media/docs/app/export-menu.png'),
  ],
  [
    demo('/media/demos/coding.webp'),
    doc('/media/docs/mock/session.png'),
    doc('/media/docs/app/first-run-setup.png'),
  ],
  [
    doc('/media/docs/app/language-menu.png'),
    demo('/media/demos/report.webp'),
    demo('/media/demos/mock.webp'),
  ],
];

/**
 * A tilted, slowly scrolling wall of real app screens with one frosted-glass
 * panel over it - the one place on the page that shows the whole app at once
 * rather than a card per feature.
 *
 * The wall is decorative (`aria-hidden`, empty alts): the panel says what it
 * is, and every screen also appears, captioned, in the docs. Each column is
 * its list twice and scrolls by exactly half, so the loop has no seam.
 * Pure CSS; frozen by the global prefers-reduced-motion rule.
 */
export const AppShowcaseSection: React.FC<{ locale: Locale }> = ({ locale }) => {
  const { story, common } = getMessages(locale);
  const copy = story.showcase;

  return (
    <section
      aria-labelledby="showcase-heading"
      className="relative isolate overflow-hidden border-y border-border bg-surface-1 py-24 md:py-36"
    >
      <div aria-hidden="true" className="showcase-stage absolute inset-0 -z-10">
        <div className="showcase-wall">
          {COLUMNS.map((column, index) => (
            <div
              key={index}
              className={cn('showcase-column', index % 2 === 1 && 'showcase-column-down')}
              style={{ animationDuration: `${60 + index * 9}s` }}
            >
              {[...column, ...column].map((shot, shotIndex) => (
                <Image
                  key={`${shot.src}-${shotIndex}`}
                  src={shot.src}
                  alt=""
                  width={shot.width}
                  height={shot.height}
                  sizes="420px"
                  loading="lazy"
                  className="h-auto w-full rounded-lg border border-border-strong shadow-elevation-3"
                />
              ))}
            </div>
          ))}
        </div>
        {/* Keeps the panel legible and sinks the wall's edges into the page. */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_60%_at_50%_50%,hsl(var(--surface-1)/0.6),transparent_65%,hsl(var(--surface-1))_100%)]" />
      </div>

      <Container className="relative">
        <div className="glass-panel relative mx-auto max-w-2xl rounded-2xl px-6 py-10 text-center sm:px-10 md:py-12">
          <Eyebrow className="mx-auto">{copy.eyebrow}</Eyebrow>
          <h2 id="showcase-heading" className="text-heading text-gradient mt-4 text-balance">
            {copy.title}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-pretty leading-relaxed text-muted-foreground md:text-lg">
            {copy.body}
          </p>
          <LocalizedLink
            href={ROUTES.docs}
            prefetch={false}
            data-track="showcase_docs"
            className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-primary underline-offset-4 hover:underline"
          >
            {copy.link}
            <ArrowRight className="size-4 rtl:rotate-180" aria-hidden="true" />
          </LocalizedLink>
          <p className="mt-6 text-xs text-muted-foreground">{copy.sample}</p>

          {/* Angled glass chips pinned to the panel's corners - desktop only, where there is room. */}
          <span className="glass-chip absolute -left-10 -top-5 hidden -rotate-6 md:inline-flex">
            <Languages className="size-4 text-primary" aria-hidden="true" />
            {LANGUAGE_COUNT} {pluralize(locale, LANGUAGE_COUNT, common.languageNoun)}
          </span>
          <span className="glass-chip absolute -bottom-5 -right-8 hidden rotate-3 md:inline-flex">
            <FileDown className="size-4 text-primary" aria-hidden="true" />
            DOCX · Markdown
          </span>
        </div>
      </Container>
    </section>
  );
};

export default AppShowcaseSection;
