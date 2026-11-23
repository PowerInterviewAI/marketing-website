import type { PluralForms } from '@/i18n/format';

export const languages = {
  eyebrow: 'Languages',
  title: 'Interview in {count} {noun}',
  /** "in N languages" - the noun agrees with the count and the preposition. */
  titleNoun: { one: 'language', other: 'languages' } as PluralForms,
  description:
    'Practice, get scored, and export your report in the language you interview in. The AI interviewer speaks {voices} of the {count} aloud.',
  spokenBadge: '{voices} spoken by the mock interviewer',
  writtenBadge: '{written} with written mock questions',
  spokenAria: 'Mock questions are spoken aloud',
  writtenAria: 'Mock questions are written',
  showWritten: 'Show the other {written} languages',
  note: 'A language with no voice available is a complete mock interview, not a reduced one: the interviewer writes its questions instead of speaking them, and the follow-ups, the scoring and the exported report are unchanged. Arabic, Hebrew, Persian, Urdu and the other right-to-left scripts run right to left throughout the app.',
  link: 'More about the mock interview',
};

export type Languages = typeof languages;
