import fs from 'node:fs';
import path from 'node:path';

// Canonical order for every doc surface (index listing, sidebar nav).
// Previously the index page and sidebar each hardcoded their own list and
// had drifted out of sync (the index was missing two slugs) - this is now
// the single source of truth for both.
const ORDER = [
  'introduction',
  'installation',
  'usage',
  'how-it-works',
  'best-practices',
  'troubleshooting',
  'mock-interview',
  'beta-tester',
];

const DOCS_DIR = path.join(process.cwd(), 'src/content/docs');

export interface DocListItem {
  slug: string;
  title: string;
  excerpt: string;
}

function bySlugOrder(a: { slug: string }, b: { slug: string }): number {
  const ai = ORDER.indexOf(a.slug);
  const bi = ORDER.indexOf(b.slug);
  return (ai === -1 ? 999 : ai) - (bi === -1 ? 999 : bi);
}

export function getDocSlugs(): string[] {
  return fs
    .readdirSync(DOCS_DIR)
    .filter((f) => f.endsWith('.md'))
    .map((f) => f.replace(/\.md$/, ''))
    .sort((a, b) => bySlugOrder({ slug: a }, { slug: b }));
}

export function getDocContent(slug: string): string | null {
  const filePath = path.join(DOCS_DIR, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;
  return fs.readFileSync(filePath, 'utf-8');
}

export function getDocTitle(slug: string, raw: string): string {
  const titleMatch = raw.match(/^#\s+(.+)$/m);
  return titleMatch ? titleMatch[1].trim() : slug.replace(/-/g, ' ');
}

function getDocExcerpt(raw: string, title: string, titleMatched: boolean): string {
  const blocks = raw
    .split(/\r?\n\r?\n/)
    .map((b) => b.replace(/\r?\n/g, ' ').trim())
    .filter(
      (b) => b && !/^#{1,6}\s/.test(b) && !/^!\[/.test(b) && !/^\|/.test(b) && !/^---/.test(b)
    );

  let excerpt: string;
  if (titleMatched) {
    const idx = blocks.findIndex((b) => b.includes(title));
    excerpt = blocks[idx + 1] || blocks[0] || '';
  } else {
    excerpt = blocks[0] || '';
  }
  return excerpt.length > 220 ? `${excerpt.slice(0, 217).trim()}...` : excerpt;
}

export function getAllDocs(): DocListItem[] {
  return getDocSlugs().map((slug) => {
    const raw = getDocContent(slug) ?? '';
    const titleMatch = raw.match(/^#\s+(.+)$/m);
    const title = getDocTitle(slug, raw);
    return { slug, title, excerpt: getDocExcerpt(raw, title, Boolean(titleMatch)) };
  });
}

// Sidebar nav titles are slug-derived (not the doc's H1), matching the
// original DocsSidebar behavior - this can differ from getAllDocs()'s
// H1-extracted titles shown on the index page.
export function getDocNavItems(): { slug: string; title: string }[] {
  return getDocSlugs().map((slug) => ({ slug, title: slug.replace(/-/g, ' ') }));
}
