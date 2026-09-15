import React from 'react';

import { FileText, Volume2 } from 'lucide-react';
import Link from 'next/link';

import { Badge } from '@/components/ui/badge';
import { Reveal } from '@/components/ui/reveal';
import { Section, SectionHeading } from '@/components/ui/section';
import {
  INTERVIEW_LANGUAGES,
  type InterviewLanguage,
  LANGUAGE_COUNT,
  VOICE_LANGUAGE_COUNT,
  isRtl,
} from '@/config/languages';
import { ROUTES, SECTIONS } from '@/config/routes';
import { cn } from '@/lib/utils';

/**
 * The full language list, rather than the count on its own.
 *
 * "28 interview languages" appears in the hero strip, the features grid and
 * the mock section, and a number is not an answer to the only question a
 * reader who does not interview in English actually has. Twenty-eight is a
 * large enough set that most readers assume theirs is in it, and a small
 * enough one that the assumption is wrong often enough to matter - and the
 * only other way to check was to download the app.
 *
 * It also has to say which of the two things a language supports, because the
 * product supports them separately: transcription and suggestions cover all of
 * them, the mock interviewer's voice covers seven. That is a difference a
 * reader meets in the first minute of a mock session, so it is marked per
 * language here rather than mentioned once in prose underneath.
 *
 * A Server Component with no filter box on purpose. Twenty-eight tiles fit on
 * one screen at desktop width and are one Ctrl+F away everywhere else, so a
 * search input would spend a client bundle and a hydration boundary on a list
 * shorter than the FAQ.
 */

const LanguageTile: React.FC<{ language: InterviewLanguage }> = ({ language }) => (
  <li
    className={cn(
      'flex items-center justify-between gap-3 rounded-lg border px-3.5 py-3',
      language.hasVoice ? 'border-primary/30 bg-primary/5' : 'border-border bg-card'
    )}
  >
    {/*
      Names wrap rather than truncate. This is a list whose only job is to let
      a reader find their own language in it, and at two columns on a phone
      "Bahasa Indonesia" is wide enough to lose its second word to an ellipsis
      - which reads as a different language rather than as a clipped one.
    */}
    <span className="flex min-w-0 flex-col gap-0.5">
      {/*
        `dir` off the data rather than `dir="auto"`. `auto` reads the first
        strong character, which is right for the two endonyms written in
        Arabic and Hebrew script and wrong for nothing currently in the list -
        but it stops being right, silently, the first time a name is added
        that opens with a Latin brand word or a digit. The list knows which
        languages are right-to-left; it should be the thing that says so.
      */}
      <span
        dir={isRtl(language) ? 'rtl' : 'ltr'}
        lang={language.code}
        className="text-sm font-semibold leading-snug text-foreground"
      >
        {language.nativeName}
      </span>
      <span className="text-xs text-muted-foreground">{language.name}</span>
    </span>

    {/*
      The icon is the only thing separating the two states, so it carries the
      whole distinction in text for a screen reader rather than a bare
      "voice" label that reads as a heading for the tile.
    */}
    {language.hasVoice ? (
      <>
        <Volume2 className="size-4 shrink-0 text-primary" aria-hidden="true" />
        <span className="sr-only">Mock questions are spoken aloud</span>
      </>
    ) : (
      <>
        <FileText className="size-4 shrink-0 text-muted-foreground/60" aria-hidden="true" />
        <span className="sr-only">Mock questions are written</span>
      </>
    )}
  </li>
);

export const LanguagesSection: React.FC = () => (
  <Section id={SECTIONS.languages} tone="muted" aria-labelledby="languages-heading">
    <SectionHeading
      id="languages-heading"
      eyebrow="Languages"
      title={`Interview in ${LANGUAGE_COUNT} languages`}
      description={`Transcription, live suggestions, mock questions, scoring and the exported report all follow one setting, and it changes mid-interview rather than only before you start. Every one of the ${LANGUAGE_COUNT} is transcribed and answered; ${VOICE_LANGUAGE_COUNT} of them the mock interviewer also speaks out loud.`}
    />

    <div className="mx-auto mt-10 flex max-w-5xl flex-wrap items-center justify-center gap-3">
      <Badge variant="primary" size="md">
        <Volume2 aria-hidden="true" />
        {VOICE_LANGUAGE_COUNT} spoken by the mock interviewer
      </Badge>
      <Badge variant="default" size="md">
        <FileText aria-hidden="true" />
        {LANGUAGE_COUNT - VOICE_LANGUAGE_COUNT} with written mock questions
      </Badge>
    </div>

    {/*
      One Reveal around the whole grid rather than one per tile. Every Reveal
      is a client component holding its own IntersectionObserver, and 28 of
      them staggered would also mean the last tiles fading in well after the
      reader has started scanning the list for their language.
    */}
    <Reveal className="mx-auto mt-8 max-w-5xl">
      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {INTERVIEW_LANGUAGES.map((language) => (
          <LanguageTile key={language.code} language={language} />
        ))}
      </ul>
    </Reveal>

    <p className="mx-auto mt-8 max-w-3xl text-center text-sm leading-relaxed text-muted-foreground">
      A language with no voice available is a complete mock interview, not a reduced one: the
      interviewer writes its questions instead of speaking them, and the follow-ups, the scoring and
      the exported report are unchanged. Arabic and Hebrew run right to left throughout the app.{' '}
      <Link
        href={ROUTES.mockInterview}
        className="font-medium text-foreground underline underline-offset-4 hover:text-primary"
      >
        More about the mock interview
      </Link>
      .
    </p>
  </Section>
);

export default LanguagesSection;
