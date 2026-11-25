/**
 * Emits one JSON-LD block. `<` is escaped so a string in the data (an FAQ
 * answer, a doc title) can never close the script element early.
 */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
    />
  );
}

export default JsonLd;
