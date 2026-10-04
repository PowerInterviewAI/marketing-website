import React from 'react';

import { ArrowRight, Check, Minus, X } from 'lucide-react';

import { DownloadCta } from '@/components/DownloadCta';
import { Glow } from '@/components/ui/glow';
import { Reveal } from '@/components/ui/reveal';
import { Section, SectionHeading } from '@/components/ui/section';
import { SECTIONS } from '@/config/routes';
import type { Locale } from '@/i18n/config';
import { getMessages } from '@/i18n/messages';
import type { WhyChoose } from '@/i18n/messages/en/whyChoose';
import { cn } from '@/lib/utils';

/** A qualified answer is a key into `whyChoose.cells`, so it is translated. */
type QualifiedCell = Exclude<keyof WhyChoose['cells'], 'yes' | 'no'>;

/** true = yes, false = no, string = a qualified answer. */
type Cell = boolean | QualifiedCell;

/**
 * Which half of the product a row is about. The table used to be a flat list
 * of eleven capabilities, so the two things the app does - the mock interview
 * and the live interview - had to be inferred from the wording of each row.
 */
type RowGroup = keyof WhyChoose['groups'];

interface ComparisonRow {
  group: RowGroup;
  us: Cell;
  practice: Cell;
  coding: Cell;
}

/** Rendered in this order, mock before live, matching the rest of the page. */
const GROUPS: RowGroup[] = ['mock', 'live', 'both'];

/*
 * Compared against categories rather than named products on purpose: a claim
 * about what a specific competitor does or doesn't do today goes stale the
 * moment they ship, and this table would then be wrong rather than merely
 * dated. The named examples live in the column headers as examples only.
 *
 * Row order matches `whyChoose.rows` in src/i18n/messages - the capability
 * text is looked up by index, so add or move a row in both places.
 */
const ROWS: ComparisonRow[] = [
  { group: 'mock', us: true, practice: 'varies', coding: false },
  { group: 'mock', us: true, practice: 'varies', coding: false },
  { group: 'live', us: true, practice: false, coding: false },
  { group: 'live', us: true, practice: false, coding: false },
  { group: 'live', us: true, practice: 'practiceOnly', coding: false },
  { group: 'live', us: true, practice: false, coding: 'practiceProblems' },
  // Leads the shared group, because the claim is the combination: rehearsing
  // is what practice tools are for, and saying they can't would be the kind
  // of competitor claim the note above rules out.
  { group: 'both', us: true, practice: 'practiceOnly', coding: false },
  { group: 'both', us: true, practice: 'varies', coding: false },
  { group: 'both', us: true, practice: 'generic', coding: false },
  { group: 'both', us: true, practice: 'varies', coding: 'varies' },
  { group: 'both', us: true, practice: 'varies', coding: 'varies' },
  { group: 'both', us: true, practice: false, coding: false },
  { group: 'both', us: true, practice: false, coding: false },
];

const CellValue: React.FC<{
  value: Cell;
  cells: WhyChoose['cells'];
  emphasis?: boolean;
}> = ({ value, cells, emphasis }) => {
  if (value === true) {
    return (
      <>
        <Check
          className={cn('mx-auto size-5', emphasis ? 'text-primary' : 'text-success')}
          aria-hidden="true"
        />
        <span className="sr-only">{cells.yes}</span>
      </>
    );
  }

  if (value === false) {
    return (
      <>
        <X className="mx-auto size-5 text-muted-foreground/50" aria-hidden="true" />
        <span className="sr-only">{cells.no}</span>
      </>
    );
  }

  return (
    <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
      <Minus className="size-3" aria-hidden="true" />
      {cells[value]}
    </span>
  );
};

export const WhyChooseSection: React.FC<{ locale: Locale }> = ({ locale }) => {
  const copy = getMessages(locale).whyChoose;

  return (
    <Section id={SECTIONS.whyChoose} tone="muted" aria-labelledby="why-choose-heading">
      <SectionHeading
        id="why-choose-heading"
        eyebrow={copy.eyebrow}
        title={copy.title}
        description={copy.description}
      />

      <Reveal className="mx-auto mt-14 max-w-5xl">
        {/* Wide content scrolls inside its own container rather than the page. */}
        <div className="overflow-x-auto rounded-xl border border-border bg-card">
          <table className="w-full min-w-[44rem] border-collapse text-sm">
            <caption className="sr-only">{copy.tableCaption}</caption>
            <thead>
              <tr className="border-b border-border">
                <th scope="col" className="px-5 py-4 text-left font-medium text-muted-foreground">
                  {copy.capability}
                </th>
                <th scope="col" className="w-40 bg-primary/5 px-4 py-4 text-center">
                  <span className="font-semibold text-foreground">Power Interview AI</span>
                </th>
                <th scope="col" className="w-44 px-4 py-4 text-center">
                  <span className="font-medium text-foreground">{copy.practiceTools}</span>
                  <span className="mt-0.5 block text-xs font-normal text-muted-foreground">
                    Yoodli, Big Interview, Pramp
                  </span>
                </th>
                <th scope="col" className="w-44 px-4 py-4 text-center">
                  <span className="font-medium text-foreground">{copy.codingPlatforms}</span>
                  <span className="mt-0.5 block text-xs font-normal text-muted-foreground">
                    LeetCode, HackerRank
                  </span>
                </th>
              </tr>
            </thead>
            {/* One tbody per feature, each headed by the feature it covers, so
                the table says which half of the app a capability comes from
                rather than leaving it to the wording of each row. */}
            {GROUPS.map((group) => (
              <tbody key={group}>
                <tr className="border-b border-border-subtle bg-surface-1">
                  <th
                    scope="colgroup"
                    colSpan={4}
                    className="px-5 py-2.5 text-left text-xs font-semibold uppercase tracking-[0.14em] text-primary"
                  >
                    {copy.groups[group]}
                  </th>
                </tr>
                {ROWS.flatMap((row, index) => (row.group === group ? [{ row, index }] : [])).map(
                  ({ row, index }) => (
                    <tr key={index} className="border-b border-border-subtle last:border-b-0">
                      <th scope="row" className="px-5 py-3.5 text-left font-normal text-foreground">
                        {copy.rows[index]}
                      </th>
                      <td className="bg-primary/5 px-4 py-3.5 text-center">
                        <CellValue value={row.us} cells={copy.cells} emphasis />
                      </td>
                      <td className="px-4 py-3.5 text-center">
                        <CellValue value={row.practice} cells={copy.cells} />
                      </td>
                      <td className="px-4 py-3.5 text-center">
                        <CellValue value={row.coding} cells={copy.cells} />
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            ))}
          </table>
        </div>

        <p className="mt-3 text-center text-xs text-muted-foreground">{copy.disclaimer}</p>
      </Reveal>

      <div className="relative isolate mx-auto mt-14 max-w-3xl overflow-hidden rounded-xl border border-border bg-card px-6 py-10 text-center">
        <Glow position="center" intensity="subtle" />
        <p className="mx-auto max-w-2xl text-lg text-muted-foreground">{copy.ctaBody}</p>
        <DownloadCta size="lg" className="mt-6">
          {copy.ctaButton}
          <ArrowRight />
        </DownloadCta>
      </div>
    </Section>
  );
};

export default WhyChooseSection;
