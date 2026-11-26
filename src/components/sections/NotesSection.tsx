import React from 'react';

import {
  FileDown,
  FileText,
  Hash,
  ListChecks,
  type LucideIcon,
  MessagesSquare,
} from 'lucide-react';

import { DownloadCta } from '@/components/DownloadCta';
import { Backdrop } from '@/components/ui/backdrop';
import { Reveal } from '@/components/ui/reveal';
import { Section, SectionHeading } from '@/components/ui/section';
import { SECTIONS } from '@/config/routes';
import type { Locale } from '@/i18n/config';
import { getMessages } from '@/i18n/messages';

// Same order as `story.notes.points`.
const POINT_ICONS: LucideIcon[] = [ListChecks, MessagesSquare, FileText, FileDown];

/**
 * What a live session leaves behind: the notes the app writes when the call
 * ends. Mirrors the client's export (`buildExportMarkdown` in ../client): the
 * model's summary - discussion, strengths, gaps, improvements, next steps -
 * then the transcript labelled by speaker, then every suggestion, saved as
 * Word or Markdown. The panel is an example of that document, built from
 * the same scripted call as the export-menu screenshot in the docs.
 *
 * It closes the live story (live -> coding -> notes) because that is when a
 * candidate meets it: after the call. The mock interview's counterpart is its
 * scored report, covered by PracticeSection and /mock-interview.
 */
export const NotesSection: React.FC<{ locale: Locale }> = ({ locale }) => {
  const copy = getMessages(locale).story.notes;
  const doc = copy.sample;

  return (
    <Section id={SECTIONS.interviewNotes} aria-labelledby="notes-heading">
      <Backdrop pattern="dots" fade="top" beams />
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
        <div className="flex flex-col gap-7">
          <SectionHeading
            id="notes-heading"
            align="left"
            eyebrow={copy.eyebrow}
            title={copy.title}
            description={copy.description}
          />

          <ul className="grid gap-5 sm:grid-cols-2">
            {copy.points.map((point, index) => {
              const Icon = POINT_ICONS[index];
              return (
                <li key={point.title} className="flex gap-3.5">
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary/25 to-primary/5 text-primary ring-1 ring-inset ring-primary/25">
                    <Icon className="size-[18px]" aria-hidden="true" />
                  </span>
                  <span>
                    <span className="block font-semibold">{point.title}</span>
                    <span className="mt-0.5 block text-sm leading-relaxed text-muted-foreground">
                      {point.body}
                    </span>
                  </span>
                </li>
              );
            })}
          </ul>

          <DownloadCta size="lg" className="w-fit max-w-full" placement="notes">
            {copy.cta}
          </DownloadCta>
          <p className="text-xs leading-relaxed text-muted-foreground">{copy.note}</p>
        </div>

        <Reveal className="min-w-0 lg:order-first">
          <figure className="surface-card tilt-media tilt-media-right overflow-hidden rounded-2xl">
            <div className="border-b border-border px-4 py-2.5">
              <span className="text-xs font-semibold">{copy.panel}</span>
            </div>

            <div className="flex flex-col gap-4 p-5 text-sm">
              <div>
                <p className="text-base font-semibold leading-snug">{doc.title}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">{doc.date}</p>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-primary">
                  {doc.summaryHeading}
                </p>
                <p className="mt-1 leading-relaxed">{doc.summary}</p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {[doc.strengths, doc.nextSteps].map((list) => (
                  <div key={list.heading}>
                    <p className="text-xs font-semibold uppercase tracking-wide text-primary">
                      {list.heading}
                    </p>
                    <ul className="mt-1 list-disc space-y-0.5 ps-4 leading-relaxed marker:text-muted-foreground">
                      {list.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <div className="border-t border-border pt-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-primary">
                  {doc.transcriptHeading}
                </p>
                <dl className="mt-2 space-y-1.5">
                  {doc.transcript.map((line) => (
                    <div key={line.text} className="grid grid-cols-[auto_1fr] gap-x-3">
                      <dt className="text-xs font-semibold leading-5 text-primary">
                        {line.speaker}
                      </dt>
                      <dd className="leading-5 text-muted-foreground">{line.text}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>

            <figcaption className="flex flex-wrap items-center justify-end gap-2 border-t border-border px-4 py-2.5 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1 rounded-md border border-border px-2 py-0.5">
                <FileText className="size-3" aria-hidden="true" />
                .docx
              </span>
              <span className="inline-flex items-center gap-1 rounded-md border border-border px-2 py-0.5">
                <Hash className="size-3" aria-hidden="true" />
                .md
              </span>
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </Section>
  );
};

export default NotesSection;
