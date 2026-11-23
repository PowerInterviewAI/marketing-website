import { Section, SectionHeading } from '@/components/ui/section';
import { SECTIONS } from '@/config/routes';
import type { Locale } from '@/i18n/config';
import { getMessages } from '@/i18n/messages';

import { TeamCards } from './TeamCards';

interface TeamSectionProps {
  locale: Locale;
  /** Set on the standalone /team route so the section owns the h1. */
  standalone?: boolean;
}

/**
 * Full team profiles (bio, stats, contact links), on the home page and /team
 * alike - not condensed to avatar/name/role with a link across, the way this
 * section used to work. With the header nav always pointing at the home
 * anchor (see NAV_LINKS in routes.ts), a reader landing here via the nav is
 * already where they're going. /team itself is unchanged - still a real,
 * indexable page for direct links and search results.
 *
 * GitHub profile data (avatar, name, counts, bio) is fetched by TeamCards,
 * server-side, through Next's fetch cache with a one-hour revalidate - see
 * src/lib/team.ts. It used to be 6 uncached GitHub calls awaited on every
 * request, so a slow or rate-limited GitHub blocked navigation to /team and
 * the home page; then it was a hand-copied snapshot that went stale. Now a
 * visitor always gets the cached page and the refresh happens behind them,
 * and a failed refresh falls back to the roster in src/config/team.ts.
 *
 * The route-level loading fallback lives in Skeletons.tsx.
 */
export const TeamSection = ({ locale, standalone = false }: TeamSectionProps) => {
  const copy = getMessages(locale).team;

  return (
    <Section id={SECTIONS.team} tone="muted" aria-labelledby="team-heading">
      <SectionHeading
        id="team-heading"
        as={standalone ? 'h1' : 'h2'}
        eyebrow={copy.eyebrow}
        title={copy.title}
        description={copy.description}
      />

      <TeamCards locale={locale} />
    </Section>
  );
};

export default TeamSection;
