/**
 * Fills `{name}` placeholders in a message. Messages are plain strings (not
 * functions) so they can cross the server/client boundary, and so a translator
 * can reorder the words around a value - `Тема: {theme}` and `Theme: {theme}`
 * need the value in different places in other languages.
 */
export function format(template: string, values: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (match, key: string) =>
    key in values ? String(values[key]) : match
  );
}

/** Noun forms by CLDR plural category. English needs `one`/`other`; Russian all four. */
export type PluralForms = { one: string; few?: string; many?: string; other: string };

/**
 * Picks the noun form that agrees with `count`. Russian is why this exists:
 * "1 язык", "2 языка", "5 языков" - a single `{count} languages` string cannot be
 * right for a count that is derived from data and can change.
 */
export function pluralize(locale: string, count: number, forms: PluralForms): string {
  const category = new Intl.PluralRules(locale).select(count);
  return forms[category as keyof PluralForms] ?? forms.other;
}
