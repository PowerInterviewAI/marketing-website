import type { Metadata } from 'next';

import { DocsLayout } from '@/components/docs/DocsLayout';
import { DocsNotFoundBody } from '@/components/docs/DocsNotFoundBody';
import { getAllDocs, getDocNavItems } from '@/lib/docs';

/**
 * 404 for an unknown /docs/<slug>.
 *
 * The root not-found only offers "Back to Home", which drops a reader who
 * mistyped a doc URL all the way out of the documentation. This keeps the
 * docs chrome - sidebar included - and points at the index.
 *
 * Not-found files get no route params, so the text is rendered by
 * DocsNotFoundBody, which reads the locale from context.
 */
// Without this the page inherits the root layout's `index, follow`, so a 404
// advertised itself as indexable. The root not-found already sets this.
export const metadata: Metadata = {
  title: 'Page Not Found - Power Interview AI',
  robots: { index: false, follow: false },
};

export default function DocNotFound() {
  const navItems = getDocNavItems();
  const suggestions = getAllDocs()
    .slice(0, 4)
    .map(({ slug, title }) => ({ slug, title }));

  return (
    <DocsLayout docs={navItems}>
      <DocsNotFoundBody suggestions={suggestions} />
    </DocsLayout>
  );
}
