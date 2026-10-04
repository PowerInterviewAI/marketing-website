import type { NextConfig } from 'next';

import { LEGACY_ANCHOR_REDIRECTS, LEGACY_DOC_REDIRECTS } from './src/config/routes';
import { LOCALES, localizePath } from './src/i18n/config';

const nextConfig: NextConfig = {
  // Sourced from src/config/routes.ts so the redirect table, the sitemap and
  // the nav can't drift apart - they each used to carry their own copy, and
  // had. See that file for why those four routes became anchors, and why
  // /docs/usage moved to /docs/live-interview.
  //
  // Deliberately NOT a `/` -> `/#home` entry: a server-issued redirect is a
  // fresh navigation, not a same-document hash change, so the browser
  // re-requests the target's *path* - which is still `/` - and the rule
  // matches itself again. Infinite redirect loop. Fragment-only redirects to
  // the same path can't work this way; Home's `/#home` link (see NAV_LINKS)
  // has to be enough on its own.
  async redirects() {
    // Each legacy URL also existed, or could be guessed, under /ru, so every
    // locale gets its own copy that stays inside that locale.
    return [...LEGACY_ANCHOR_REDIRECTS, ...LEGACY_DOC_REDIRECTS].flatMap(
      ({ source, destination }) =>
        LOCALES.map((locale) => ({
          source: localizePath(locale, source),
          destination: localizePath(locale, destination),
          permanent: true,
        }))
    );
  },
};

export default nextConfig;
