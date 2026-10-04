import type { PluralForms } from '@/i18n/format';

/** Strings reused across sections. */
export const common = {
  step: 'Step {n}',
  languageNoun: { one: 'interview language', other: 'interview languages' } as PluralForms,
  /** Titles of the hotkeys the marketing copy names; the combos themselves are data. */
  hotkeys: {
    toggleStealth: 'Toggle Stealth',
    toggleProfessionalMode: 'Toggle Professional Mode',
  },
};

export type Common = typeof common;
