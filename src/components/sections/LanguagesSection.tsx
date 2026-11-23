import React from 'react';

import { ChevronDown, FileText, Volume2 } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Reveal } from '@/components/ui/reveal';
import { Section, SectionHeading } from '@/components/ui/section';
import {
  INTERVIEW_LANGUAGES,
  type InterviewLanguage,
  LANGUAGE_COUNT,
  VOICE_LANGUAGES,
  VOICE_LANGUAGE_COUNT,
  isRtl,
} from '@/config/languages';
import { ROUTES, SECTIONS } from '@/config/routes';
import { LocalizedLink } from '@/i18n/LocalizedLink';
import { LOCALE_META, type Locale } from '@/i18n/config';
import { format, pluralize } from '@/i18n/format';
import { getMessages } from '@/i18n/messages';
import { cn } from '@/lib/utils';

/**
 * The full language list, rather than the count on its own.
 *
 * The language count appears in the hero strip, the features grid and the mock
 * section, and a number is not an answer to the only question a reader who
 * does not interview in English actually has: is mine in it? The only other
 * way to check was to download the app.
 *
 * It also has to say which of the two things a language supports, because the
 * product supports them separately: transcription and suggestions cover all of
 * them, the mock interviewer's voice covers a subset. That is a difference a
 * reader meets in the first minute of a mock session, so it is marked per
 * language here rather than mentioned once in prose underneath.
 *
 * Voiced languages are shown first and the rest sit behind a native
 * `<details>` toggle. Ninety-seven tiles are several screens of scrolling, and
 * the voiced set holds the languages most readers interview in. A `<details>`
 * rather than a client toggle keeps this a Server Component, and the
 * collapsed tiles are still in the HTML, so Ctrl+F and search engines find
 * them.
 */

const LanguageTile: React.FC<{
  language: InterviewLanguage;
  /** Name of the language in the reader's own locale. */
  localName: string;
  spokenLabel: string;
  writtenLabel: string;
}> = ({ language, localName, spokenLabel, writtenLabel }) => (
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
        strong character, which is right for every right-to-left endonym
        currently in the list - but it stops being right, silently, the first
        time a name is added that opens with a Latin brand word or a digit. The list knows which
        languages are right-to-left; it should be the thing that says so.
      */}
      <span
        dir={isRtl(language) ? 'rtl' : 'ltr'}
        lang={language.code}
        className="text-sm font-semibold leading-snug text-foreground"
      >
        {language.nativeName}
      </span>
      <span className="text-xs text-muted-foreground">{localName}</span>
    </span>

    {/*
      The icon is the only thing separating the two states, so it carries the
      whole distinction in text for a screen reader rather than a bare
      "voice" label that reads as a heading for the tile.
    */}
    {language.hasVoice ? (
      <>
        <Volume2 className="size-4 shrink-0 text-primary" aria-hidden="true" />
        <span className="sr-only">{spokenLabel}</span>
      </>
    ) : (
      <>
        <FileText className="size-4 shrink-0 text-muted-foreground/60" aria-hidden="true" />
        <span className="sr-only">{writtenLabel}</span>
      </>
    )}
  </li>
);

/**
 * The tile's second line names the language in the reader's locale. English
 * keeps the name from the data file; any other locale asks the runtime's CLDR
 * data (Intl.DisplayNames), so a Russian reader sees "Испанский" under
 * "Español" without a second hand-translated table that would drift whenever a
 * language is added.
 */
// CLDR names `zh-HK` "Chinese (Hong Kong)", which is a region rather than the
// language being offered - the speech model is Cantonese. Ask for the codes
// that name what is actually spoken.
const DISPLAY_CODES: Record<string, string> = { 'zh-hk': 'yue', 'zh-tw': 'zh-Hant' };

function localNameFor(locale: Locale, language: InterviewLanguage): string {
  if (locale === 'en') return language.name;
  const name = new Intl.DisplayNames([locale], { type: 'language' }).of(
    DISPLAY_CODES[language.code] ?? language.code
  );
  if (!name) return language.name;
  return name.charAt(0).toLocaleUpperCase(locale) + name.slice(1);
}

const WRITTEN_LANGUAGES = INTERVIEW_LANGUAGES.filter((language) => !language.hasVoice);

export const LanguagesSection: React.FC<{ locale: Locale }> = ({ locale }) => {
  const { languages: copy } = getMessages(locale);
  const writtenCount = LANGUAGE_COUNT - VOICE_LANGUAGE_COUNT;
  const tile = (language: InterviewLanguage) => (
    <LanguageTile
      key={language.code}
      language={language}
      localName={localNameFor(locale, language)}
      spokenLabel={copy.spokenAria}
      writtenLabel={copy.writtenAria}
    />
  );

  return (
    <Section id={SECTIONS.languages} tone="muted" aria-labelledby="languages-heading">
      <SectionHeading
        id="languages-heading"
        eyebrow={copy.eyebrow}
        title={format(copy.title, {
          count: LANGUAGE_COUNT,
          noun: pluralize(locale, LANGUAGE_COUNT, copy.titleNoun),
        })}
        description={format(copy.description, {
          count: LANGUAGE_COUNT,
          voices: VOICE_LANGUAGE_COUNT,
        })}
      />

      <div className="mx-auto mt-10 flex max-w-5xl flex-wrap items-center justify-center gap-3">
        <Badge variant="primary" size="md">
          <Volume2 aria-hidden="true" />
          {format(copy.spokenBadge, { voices: VOICE_LANGUAGE_COUNT })}
        </Badge>
        <Badge variant="default" size="md">
          <FileText aria-hidden="true" />
          {format(copy.writtenBadge, { written: writtenCount })}
        </Badge>
      </div>

      {/*
        One Reveal around the whole list rather than one per tile. Every Reveal
        is a client component holding its own IntersectionObserver, and dozens
        of them staggered would also mean the last tiles fading in well after
        the reader has started scanning the list for their language.
      */}
      <Reveal className="mx-auto mt-8 max-w-5xl">
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {VOICE_LANGUAGES.map(tile)}
        </ul>
        <details className="group mt-6">
          <summary className="mx-auto flex w-fit cursor-pointer list-none items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-primary/40 [&::-webkit-details-marker]:hidden">
            <ChevronDown
              className="size-4 transition-transform group-open:rotate-180"
              aria-hidden="true"
            />
            {format(copy.showWritten, { written: writtenCount })}
          </summary>
          <ul className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {WRITTEN_LANGUAGES.map(tile)}
          </ul>
        </details>
      </Reveal>

      <p className="mx-auto mt-8 max-w-3xl text-center text-sm leading-relaxed text-muted-foreground">
        {copy.note}
        {LOCALE_META[locale].space}
        <LocalizedLink
          href={ROUTES.mockInterview}
          className="font-medium text-foreground underline underline-offset-4 hover:text-primary"
        >
          {copy.link}
        </LocalizedLink>
        {LOCALE_META[locale].period}
      </p>
    </Section>
  );
};

export default LanguagesSection;
