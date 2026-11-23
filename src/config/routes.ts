/**
 * The site's routing map - the single source of truth for every internal
 * destination.
 *
 * Header, footer, sitemap and the legacy redirects in next.config.ts all read
 * from here. They each used to carry their own hand-written list, which had
 * already drifted: the footer pointed "Pricing" at a scroll target while the
 * header pointed it at /pricing, and /benefits still 308'd to an anchor
 * nothing linked to.
 *
 * Keep this file free of imports and of anything but plain data - next.config.ts
 * imports it directly, outside the app bundle.
 */

/** Every route that renders a page of its own. */
export const ROUTES = {
  home: '/',
  howItWorks: '/how-it-works',
  mockInterview: '/mock-interview',
  languages: '/languages',
  pricing: '/pricing',
  faq: '/faq',
  team: '/team',
  docs: '/docs',
  privacy: '/privacy',
  terms: '/terms',
} as const;

/**
 * Ids of the home page's own sections.
 *
 * These are scroll targets, not routes. Nothing in the primary nav points at
 * one - see NAV_LINKS below - but the footer, the redirects and in-page CTAs
 * link to them as `/#id`, which is a real, shareable, crawlable URL.
 */
export const SECTIONS = {
  hero: 'home',
  howItWorks: 'how-it-works',
  features: 'features',
  mockInterview: 'mock-interview',
  languages: 'languages',
  benefits: 'benefits',
  whyChoose: 'why-choose',
  pricing: 'pricing',
  testimonials: 'testimonials',
  install: 'install',
  faq: 'faq',
  contact: 'contact',
  team: 'team',
} as const;

/** Builds the URL of a single documentation page. */
export const docPath = (slug: string) => `${ROUTES.docs}/${slug}`;

/** Builds the absolute URL of a home-page section. */
export const homeAnchor = (section: (typeof SECTIONS)[keyof typeof SECTIONS]) => `/#${section}`;

/** Where every "Download" call to action goes: the install options on the home page. */
export const DOWNLOAD_HREF = homeAnchor(SECTIONS.install);

export interface NavLinkDef {
  /** Key into the `chrome.nav` messages - the label is translated, not stored here. */
  id: 'howItWorks' | 'languages' | 'pricing' | 'faq' | 'docs';
  /** The item's own indexable route. Still a real, standalone page - still
   *  what search results, bookmarks and the footer's own links land on -
   *  even for an item the header always links to as `/#section` instead
   *  (see `section`). Also what `isActive` compares against off the home
   *  page, and where the header sends you for an item with no `section`. */
  href: string;
  /** Marks the item active for `/docs` *and* every `/docs/*` page beneath it. */
  matchSubtree?: boolean;
  /**
   * The matching home-page section id, for items that are also a home
   * section. When set, the header always links to `/#section` instead of
   * `href` - from any page, not only while on home - since the header is
   * meant to keep you on the single-page experience. `href` is untouched
   * everywhere else it's used (footer, sitemap, direct visits).
   */
  section?: (typeof SECTIONS)[keyof typeof SECTIONS];
  /** Opens in a new tab - for a destination that isn't a home-page section
   *  at all, currently just Docs. */
  newTab?: boolean;
}

/**
 * The primary navigation.
 *
 * Every item still has a real route (`href`) - Pricing, FAQ, Team and How it
 * works are indexable pages in their own right, not reconstructed from home
 * page anchors, and a direct visit, a search result or a footer link lands
 * on the page itself. `section` is what makes the *header's own* links
 * always point at the matching home anchor instead, regardless of which
 * page you're clicking it from - see NavLinkDef.section and Header.tsx for
 * how the two combine, and why that doesn't cost the page its SEO.
 *
 * Features, Why Us and Contact are home-page-only sections with no page of
 * their own; they're reached by scrolling and linked from the footer, where
 * anchors are conventional.
 *
 * Five items, each answering a question a visitor has before downloading. The
 * logo is the way home, and Team moved to the footer.
 */
export const NAV_LINKS: readonly NavLinkDef[] = [
  { id: 'howItWorks', href: ROUTES.howItWorks, section: SECTIONS.howItWorks },
  { id: 'languages', href: ROUTES.languages, section: SECTIONS.languages },
  { id: 'pricing', href: ROUTES.pricing, section: SECTIONS.pricing },
  { id: 'faq', href: ROUTES.faq, section: SECTIONS.faq },
  { id: 'docs', href: ROUTES.docs, matchSubtree: true, newTab: true },
] as const;

/**
 * Pages whose body is still English under every locale: the two legal texts
 * and the documentation (markdown in src/content/docs). Their chrome - header,
 * footer, sidebar - is translated, but their metadata canonicalises to the
 * English URL and the sitemap lists only the English one. A page leaves this
 * list the day its text is translated.
 */
export const ENGLISH_ONLY_ROUTES: readonly string[] = [ROUTES.privacy, ROUTES.terms, ROUTES.docs];

export const isEnglishOnly = (path: string): boolean =>
  ENGLISH_ONLY_ROUTES.some((route) => path === route || path.startsWith(`${route}/`));

/** Routes listed in the sitemap - pages in their own right, nothing that 3xx's. */
export const SITEMAP_ROUTES: readonly string[] = [
  ROUTES.home,
  ROUTES.howItWorks,
  ROUTES.mockInterview,
  ROUTES.languages,
  ROUTES.pricing,
  ROUTES.faq,
  ROUTES.team,
  ROUTES.privacy,
  ROUTES.terms,
  ROUTES.docs,
] as const;

/**
 * /features, /benefits, /why-choose and /contact used to be standalone routes
 * that re-rendered the identical home-page section component - same component,
 * same copy, so 100% duplicate content, each declaring itself canonical.
 *
 * They're home-page sections now. These 308s keep any indexed URL, inbound link
 * or bookmark working and move the ranking signals to the home page.
 */
export const LEGACY_ANCHOR_REDIRECTS = [
  { source: '/features', destination: homeAnchor(SECTIONS.features) },
  { source: '/benefits', destination: homeAnchor(SECTIONS.benefits) },
  { source: '/why-choose', destination: homeAnchor(SECTIONS.whyChoose) },
  { source: '/contact', destination: homeAnchor(SECTIONS.contact) },
] as const;

/**
 * /docs/usage is now /docs/live-interview: the sidebar entry read "usage"
 * where every other doc names what it covers, and the page is the guide to
 * the real interview as opposed to the mock one.
 *
 * The old URL is indexed and linked to from outside the site, so it 308s to
 * the new slug rather than 404ing.
 */
export const LEGACY_DOC_REDIRECTS = [
  { source: docPath('usage'), destination: docPath('live-interview') },
] as const;

/**
 * Public files that have moved. Search results, social cards and other sites
 * can still hold the old URLs, so each one keeps working.
 */
export const LEGACY_ASSET_REDIRECTS = [
  { source: '/logo.png', destination: '/brand/logo.png' },
  { source: '/favicon.png', destination: '/brand/favicon.png' },
  { source: '/favicon.svg', destination: '/brand/favicon.svg' },
  { source: '/open-graph.png', destination: '/brand/open-graph.png' },
  { source: '/media/docs/install-windows.png', destination: '/media/docs/install/windows.png' },
  { source: '/media/docs/install-macos.png', destination: '/media/docs/install/macos.png' },
  {
    source: '/media/docs/macos-update-permission-issue.png',
    destination: '/media/docs/macos/permission-issue.png',
  },
  {
    source: '/media/docs/macos-update-remove-old-app.png',
    destination: '/media/docs/macos/remove-old-app.png',
  },
  {
    source: '/media/docs/macos-update-add-new-app-1.png',
    destination: '/media/docs/macos/add-new-app-1.png',
  },
  {
    source: '/media/docs/macos-update-add-new-app-2.png',
    destination: '/media/docs/macos/add-new-app-2.png',
  },
  { source: '/media/docs/export-example.png', destination: '/media/docs/export/example.png' },
  { source: '/media/docs/export-example.docx', destination: '/media/docs/export/example.docx' },
  {
    source: '/media/docs/architecture-diagram.svg',
    destination: '/media/docs/diagrams/architecture.svg',
  },
  {
    source: '/media/docs/window-positioning.svg',
    destination: '/media/docs/diagrams/window-positioning.svg',
  },
  { source: '/media/docs/app-overview.jpg', destination: '/media/docs/app/overview.jpg' },
  { source: '/media/docs/language-menu.png', destination: '/media/docs/app/language-menu.png' },
  { source: '/media/docs/audio-options.png', destination: '/media/docs/app/audio-options.png' },
  { source: '/media/docs/export-interview.png', destination: '/media/docs/app/export-menu.png' },
  { source: '/media/docs/configuration-dialog.png', destination: '/media/docs/app/account.png' },
  { source: '/media/docs/first-run-setup.png', destination: '/media/docs/app/first-run-setup.png' },
  { source: '/media/live-interview-assistant.mp4', destination: '/media/demos/live.mp4' },
  { source: '/media/coding-challenge-1.mp4', destination: '/media/demos/coding.mp4' },
  { source: '/media/coding-challenge-2.mp4', destination: '/media/demos/coding.mp4' },
  { source: '/media/coding-challenge-3.mp4', destination: '/media/demos/coding.mp4' },
  { source: '/media/marketing/poster-live-interview.jpg', destination: '/media/demos/live.webp' },
  { source: '/media/marketing/poster-coding-1.jpg', destination: '/media/demos/coding.webp' },
  { source: '/media/marketing/poster-coding-2.jpg', destination: '/media/demos/coding.webp' },
  { source: '/media/marketing/poster-coding-3.jpg', destination: '/media/demos/coding.webp' },
] as const;
