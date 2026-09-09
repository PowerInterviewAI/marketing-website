import React from 'react';

import { ArrowRight, Check, Minus, X } from 'lucide-react';

import { DownloadCta } from '@/components/DownloadCta';
import { Glow } from '@/components/ui/glow';
import { Reveal } from '@/components/ui/reveal';
import { Section, SectionHeading } from '@/components/ui/section';
import { SECTIONS } from '@/config/routes';
import { cn } from '@/lib/utils';

/** true = yes, false = no, string = a qualified answer rendered as-is. */
type Cell = boolean | string;

/**
 * Which half of the product a row is about. The table used to be a flat list
 * of eleven capabilities, so the two things the app does - the mock interview
 * and the live interview - had to be inferred from the wording of each row.
 */
type RowGroup = 'Mock interview' | 'Live interview' | 'Both';

interface ComparisonRow {
  group: RowGroup;
  capability: string;
  us: Cell;
  practice: Cell;
  coding: Cell;
}

/** Rendered in this order, mock before live, matching the rest of the page. */
const GROUPS: RowGroup[] = ['Mock interview', 'Live interview', 'Both'];

/*
 * Compared against categories rather than named products on purpose: a claim
 * about what a specific competitor does or doesn't do today goes stale the
 * moment they ship, and this table would then be wrong rather than merely
 * dated. The named examples live in the column headers as examples only.
 */
const ROWS: ComparisonRow[] = [
  {
    group: 'Mock interview',
    capability: 'An interviewer that speaks its questions and follows up',
    us: true,
    practice: 'Varies',
    coding: false,
  },
  {
    group: 'Mock interview',
    capability: 'Every answer scored, with a stronger version written back',
    us: true,
    practice: 'Varies',
    coding: false,
  },
  {
    group: 'Live interview',
    capability: 'Helps during a real, live interview',
    us: true,
    practice: false,
    coding: false,
  },
  {
    group: 'Live interview',
    capability: 'Hidden from screen share and screenshots',
    us: true,
    practice: false,
    coding: false,
  },
  {
    group: 'Live interview',
    capability: 'Dual-channel transcription with speaker detection',
    us: true,
    practice: 'Practice only',
    coding: false,
  },
  {
    group: 'Live interview',
    capability: 'Screenshot-based coding solutions in the moment',
    us: true,
    practice: false,
    coding: 'Practice problems',
  },
  {
    // Leads the shared group, because the claim is the combination: rehearsing
    // is what practice tools are for, and saying they can't would be the kind
    // of competitor claim the note above rules out.
    group: 'Both',
    capability: 'Spoken mock practice and live help in one app',
    us: true,
    practice: 'Practice only',
    coding: false,
  },
  {
    group: 'Both',
    capability: 'Works for any role, not just software engineering',
    us: true,
    practice: 'Varies',
    coding: false,
  },
  {
    group: 'Both',
    capability: 'Answers grounded in your CV and the job description',
    us: true,
    practice: 'Generic',
    coding: false,
  },
  {
    group: 'Both',
    capability: 'Runs as a desktop app - no extension, no meeting bot',
    us: true,
    practice: 'Varies',
    coding: 'Varies',
  },
  {
    group: 'Both',
    capability: 'Transcripts never retained after the session',
    us: true,
    practice: 'Varies',
    coding: 'Varies',
  },
  {
    group: 'Both',
    capability: 'Pay per use - no subscription',
    us: true,
    practice: false,
    coding: false,
  },
  {
    group: 'Both',
    capability: 'Crypto-only payment, no card details stored',
    us: true,
    practice: false,
    coding: false,
  },
];

const CellValue: React.FC<{ value: Cell; emphasis?: boolean }> = ({ value, emphasis }) => {
  if (value === true) {
    return (
      <>
        <Check
          className={cn('mx-auto size-5', emphasis ? 'text-primary' : 'text-success')}
          aria-hidden="true"
        />
        <span className="sr-only">Yes</span>
      </>
    );
  }

  if (value === false) {
    return (
      <>
        <X className="mx-auto size-5 text-muted-foreground/50" aria-hidden="true" />
        <span className="sr-only">No</span>
      </>
    );
  }

  return (
    <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
      <Minus className="size-3" aria-hidden="true" />
      {value}
    </span>
  );
};

export const WhyChooseSection: React.FC = () => (
  <Section id={SECTIONS.whyChoose} tone="muted" aria-labelledby="why-choose-heading">
    <SectionHeading
      id="why-choose-heading"
      eyebrow="Why us"
      title="Built for the rehearsal first, and the interview after it"
      description="Practice platforms coach you beforehand and coding sites drill you on problems, then leave when it matters. This one runs the spoken mock session, scores what you said, and is still open when the real interviewer joins the call - for whatever job you are interviewing for."
    />

    <Reveal className="mx-auto mt-14 max-w-5xl">
      {/* Wide content scrolls inside its own container rather than the page. */}
      <div className="overflow-x-auto rounded-xl border border-border bg-card">
        <table className="w-full min-w-[44rem] border-collapse text-sm">
          <caption className="sr-only">
            Power Interview AI compared with interview practice tools and coding practice platforms
          </caption>
          <thead>
            <tr className="border-b border-border">
              <th scope="col" className="px-5 py-4 text-left font-medium text-muted-foreground">
                Capability
              </th>
              <th scope="col" className="w-40 bg-primary/5 px-4 py-4 text-center">
                <span className="font-semibold text-foreground">Power Interview AI</span>
              </th>
              <th scope="col" className="w-44 px-4 py-4 text-center">
                <span className="font-medium text-foreground">Practice &amp; mock tools</span>
                <span className="mt-0.5 block text-xs font-normal text-muted-foreground">
                  Yoodli, Big Interview, Pramp
                </span>
              </th>
              <th scope="col" className="w-44 px-4 py-4 text-center">
                <span className="font-medium text-foreground">Coding platforms</span>
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
                  {group}
                </th>
              </tr>
              {ROWS.filter((row) => row.group === group).map((row) => (
                <tr key={row.capability} className="border-b border-border-subtle last:border-b-0">
                  <th scope="row" className="px-5 py-3.5 text-left font-normal text-foreground">
                    {row.capability}
                  </th>
                  <td className="bg-primary/5 px-4 py-3.5 text-center">
                    <CellValue value={row.us} emphasis />
                  </td>
                  <td className="px-4 py-3.5 text-center">
                    <CellValue value={row.practice} />
                  </td>
                  <td className="px-4 py-3.5 text-center">
                    <CellValue value={row.coding} />
                  </td>
                </tr>
              ))}
            </tbody>
          ))}
        </table>
      </div>

      <p className="mt-3 text-center text-xs text-muted-foreground">
        Competitor names are examples of each category, not a claim about any specific
        product&apos;s current feature set.
      </p>
    </Reveal>

    <div className="relative isolate mx-auto mt-14 max-w-3xl overflow-hidden rounded-xl border border-border bg-card px-6 py-10 text-center">
      <Glow position="center" intensity="subtle" />
      <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
        One standalone desktop app for both halves, and for any field - practice tonight, sit the
        interview next week. Download, install, start. No API wiring, no browser extension asking
        for permissions, no bot joining the call on your behalf.
      </p>
      <DownloadCta size="lg" className="mt-6">
        Experience the difference
        <ArrowRight />
      </DownloadCta>
    </div>
  </Section>
);

export default WhyChooseSection;
