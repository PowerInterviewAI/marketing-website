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
