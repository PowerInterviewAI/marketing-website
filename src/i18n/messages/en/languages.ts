import type { PluralForms } from '@/i18n/format';

export const languages = {
  eyebrow: 'Languages',
  title: 'Interview in {count} {noun}',
  /** "in N languages" - the noun agrees with the count and the preposition. */
  titleNoun: { one: 'language', other: 'languages' } as PluralForms,
  description:
    'Transcription, live suggestions, mock questions, scoring and the exported report all follow one setting, and it changes mid-interview rather than only before you start. Every one of the {count} is transcribed and answered; {voices} of them the mock interviewer also speaks out loud.',
  spokenBadge: '{voices} spoken by the mock interviewer',
  writtenBadge: '{written} with written mock questions',
  spokenAria: 'Mock questions are spoken aloud',
  writtenAria: 'Mock questions are written',
  note: 'A language with no voice available is a complete mock interview, not a reduced one: the interviewer writes its questions instead of speaking them, and the follow-ups, the scoring and the exported report are unchanged. Arabic and Hebrew run right to left throughout the app.',
  link: 'More about the mock interview',
};

export type Languages = typeof languages;
