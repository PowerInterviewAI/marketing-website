import type { Metadata } from 'next';

import { DocsBreadcrumb } from '@/components/docs/DocsBreadcrumb';
import { DocsLayout } from '@/components/docs/DocsLayout';
import { docPath } from '@/config/routes';
import { LocalizedLink } from '@/i18n/LocalizedLink';
import { getMessages } from '@/i18n/messages';
import { type LocaleParams, getLocale } from '@/i18n/server';
import { getAllDocs, getDocNavItems } from '@/lib/docs';
import { buildMetadata } from '@/lib/metadata';

export const metadata: Metadata = buildMetadata({
  title: 'Documentation',
  description:
    'Guides and reference for Power Interview AI: installation, mock interviews, live interview sessions, hotkeys, best practices and troubleshooting.',
  path: '/docs',
  translated: false,
});

export default async function DocsIndexPage(props: LocaleParams) {
  const locale = await getLocale(props);
  const t = getMessages(locale).docs;
  const list = getAllDocs();
  const navItems = getDocNavItems();

  return (
    <DocsLayout docs={navItems}>
      <main className="mx-auto max-w-6xl px-2 py-4 sm:px-4">
        <DocsBreadcrumb />

        <h1 className="mb-3 font-display text-3xl font-semibold tracking-tight">{t.index.title}</h1>
        <p className="mb-8 text-muted-foreground">{t.index.description}</p>

        <ul className="grid gap-4 sm:grid-cols-2">
          {list.map((doc) => (
            <li key={doc.slug}>
              <LocalizedLink
                href={docPath(doc.slug)}
                prefetch={false}
                className="flex h-full flex-col rounded-xl border border-border bg-card p-5 transition-colors hover:border-primary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <h2 className="text-lg font-semibold capitalize text-foreground">{doc.title}</h2>
                {doc.excerpt ? (
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {doc.excerpt}
                  </p>
                ) : (
                  <p className="mt-2 text-sm italic text-muted-foreground">{t.index.noPreview}</p>
                )}
                <span className="mt-auto pt-4 text-sm font-medium text-primary">
                  {t.index.readMore}
                </span>
              </LocalizedLink>
            </li>
          ))}
        </ul>
      </main>
    </DocsLayout>
  );
}
