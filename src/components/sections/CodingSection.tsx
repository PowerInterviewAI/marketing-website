import React from 'react';

import { Code2, type LucideIcon, MessageSquareText, ScanText } from 'lucide-react';

import { DownloadCta } from '@/components/DownloadCta';
import { Kbd } from '@/components/ui/kbd';
import { Reveal } from '@/components/ui/reveal';
import { Section, SectionHeading } from '@/components/ui/section';
import { HOTKEYS, Hotkey } from '@/config/hotkeys';
import { SECTIONS } from '@/config/routes';
import type { Locale } from '@/i18n/config';
import { getMessages } from '@/i18n/messages';

const STEP_ICONS: LucideIcon[] = [ScanText, Code2, MessageSquareText];

const SAMPLE_CODE = `function merge(intervals: number[][]) {
  intervals.sort((a, b) => a[0] - b[0]);
  const merged: number[][] = [];

  for (const [start, end] of intervals) {
    const last = merged.at(-1);
    if (last && start <= last[1]) {
      last[1] = Math.max(last[1], end);
    } else {
      merged.push([start, end]);
    }
  }
  return merged;
}`;

export const CodingSection: React.FC<{ locale: Locale }> = ({ locale }) => {
  const copy = getMessages(locale).story.coding;

  return (
    <Section id={SECTIONS.coding} tone="muted" aria-labelledby="coding-heading">
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
        <div className="flex flex-col gap-7">
          <SectionHeading
            id="coding-heading"
            align="left"
            eyebrow={copy.eyebrow}
            title={copy.title}
            description={copy.description}
          />

          <ol className="flex flex-col gap-4">
            {copy.steps.map((step, index) => {
              const Icon = STEP_ICONS[index];
              return (
                <li key={step.title} className="flex gap-3.5">
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Icon className="size-[18px]" aria-hidden="true" />
                  </span>
                  <span>
                    <span className="block font-semibold">{step.title}</span>
                    <span className="mt-0.5 block text-sm leading-relaxed text-muted-foreground">
                      {step.body}
                    </span>
                  </span>
                </li>
              );
            })}
          </ol>

          <div className="flex flex-wrap items-center gap-4">
            <DownloadCta size="lg" className="max-w-full" placement="coding">
              {copy.cta}
            </DownloadCta>
            <Kbd combo={HOTKEYS[Hotkey.Capture].combo} />
          </div>
          <p className="text-xs leading-relaxed text-muted-foreground">{copy.note}</p>
        </div>

        <Reveal className="min-w-0">
          <div
            dir="ltr"
            className="tilt-media overflow-hidden rounded-xl border border-border-strong bg-card shadow-elevation-3"
          >
            <div className="flex items-center justify-between gap-3 border-b border-border px-4 py-2.5">
              <span className="text-xs font-semibold">{copy.panel}</span>
              <span className="font-mono text-xs text-muted-foreground">merge-intervals.ts</span>
            </div>
            <div className="border-b border-border bg-primary/5 px-4 py-3">
              <p className="text-xs font-semibold text-primary">{copy.approachLabel}</p>
              <p className="mt-1 text-sm">{copy.approach}</p>
            </div>
            <pre className="overflow-x-auto p-4 font-mono text-[13px] leading-relaxed text-foreground">
              <code>{SAMPLE_CODE}</code>
            </pre>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-border px-4 py-3 text-xs">
              <span className="font-semibold text-muted-foreground">{copy.complexityLabel}</span>
              <span className="font-mono">O(n log n) time · O(n) space</span>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
};

export default CodingSection;
