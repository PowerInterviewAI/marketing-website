/**
 * The site's identity: its production origin, its name and the public
 * profiles that belong to it.
 *
 * robots.ts, sitemap.ts, the root layout, llms-full.txt and the JSON-LD each
 * used to declare their own `SITE_URL`, and the Organization block's `sameAs`
 * listed two of the five channels the Contact section links to. Search engines
 * and AI assistants use `sameAs` to tie the brand to its profiles, so a short
 * list is a weaker entity, not just an untidy one.
 *
 * Plain data, no imports.
 */
export const SITE_URL = 'https://www.powerinterviewai.com';
export const SITE_NAME = 'Power Interview AI';
export const SUPPORT_EMAIL = 'team@vectorleappulse.xyz';

/** Every public profile the Contact section links to. */
export const SOCIAL_PROFILES = [
  'https://github.com/PowerInterviewAI/client-app',
  'https://t.me/power_interview_ai',
  'https://x.com/power_interview',
  'https://discord.gg/TJJp5azK7Z',
] as const;

/** Absolute URL of a site path; the home page is the bare origin, as in the canonical. */
export const absoluteUrl = (path: string) => (path === '/' ? SITE_URL : `${SITE_URL}${path}`);

/** Stable `@id`s, so the JSON-LD blocks on a page reference each other instead of repeating. */
export const ORGANIZATION_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;
export const SOFTWARE_ID = `${SITE_URL}/#software`;
