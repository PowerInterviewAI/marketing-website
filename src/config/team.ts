/**
 * The team roster: who is on the page, plus everything about them GitHub's API
 * cannot supply.
 *
 * Profile data (name, avatar, follower and repo counts, bio, location, X
 * handle) is fetched live from GitHub by `getTeam()` in src/lib/team.ts. What
 * stays here by hand is:
 *
 * - **Contact links.** The public API returns `email: null` unless a user makes
 *   their email public, and it has no field for Telegram or LinkedIn, so these
 *   cannot come from GitHub at all.
 * - **`fallback`.** The last known GitHub values, rendered when GitHub is
 *   unreachable, rate-limited or no longer has the account. Without it a failed
 *   fetch would render a card with no name or avatar. It is a fallback, not the
 *   source: don't hand-edit counts here to "fix" the page.
 *
 * Bio and location are GitHub's own words and render as written in every
 * locale - they are the member's profile, not site copy, so they are not
 * translated.
 */
export interface TeamRosterEntry {
  /** GitHub login. */
  username: string;
  email: string | null;
  telegram: string | null;
  linkedin: string | null;
  /** Used only when GitHub reports no `twitter_username`. */
  x: string | null;
  fallback: {
    name: string;
    avatarUrl: string;
    followers: number;
    repos: number;
    bio: string;
    location: string;
  };
}

export const TEAM_ROSTER: TeamRosterEntry[] = [
  {
    username: 'alpha5611331',
    email: 'alpha5611331@gmail.com',
    telegram: 'https://t.me/alpha5611331',
    linkedin: null,
    x: 'https://x.com/alpha5611331',
    fallback: {
      name: 'alpha',
      avatarUrl: 'https://avatars.githubusercontent.com/u/156915037?v=4',
      followers: 12,
      repos: 75,
      bio: 'Senior Software Engineer | Agentic AI • LLM • Backend • Frontend',
      location: 'Universe',
    },
  },
  {
    username: 'anton-karlovskiy',
    email: 'antonkarlovskiy@outlook.com',
    telegram: 'https://t.me/anton_karlovskiy',
    linkedin: 'https://www.linkedin.com/in/anton-karlovskiy',
    x: 'https://x.com/antonkarlovskiy',
    fallback: {
      name: 'Anton K.',
      avatarUrl: 'https://avatars.githubusercontent.com/u/49653735?v=4',
      followers: 533,
      repos: 159,
      bio: 'Full-stack AI/Blockchain/Web Engineer',
      location: 'Universe',
    },
  },
];
