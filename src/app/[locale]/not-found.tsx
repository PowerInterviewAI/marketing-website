import type { Metadata } from 'next';

import { NotFoundContent } from '@/components/NotFoundContent';
import { PageChrome } from '@/components/PageChrome';

// not-found files get no route params, so the title cannot follow the locale.
// The page is noindex anyway; the body is localized by NotFoundContent.
export const metadata: Metadata = {
  title: 'Page Not Found - Power Interview AI',
  robots: { index: false, follow: false },
};

/**
 * 404 for any unmatched path.
 *
 * Rendered inside PageChrome so a reader who mistyped a URL still gets the
 * header and footer - i.e. a route to everywhere else on the site. It used to
 * be a bare centred card whose only way out was a single "Back to Home" link,
 * which is a dead end for anyone who arrived from search.
 *
 * The docs have their own 404 at src/app/[locale]/docs/[slug]/not-found.tsx that
 * keeps the sidebar instead.
 */
export default function NotFound() {
  return (
    <PageChrome>
      <NotFoundContent />
    </PageChrome>
  );
}
