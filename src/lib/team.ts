import { TEAM_ROSTER, type TeamRosterEntry } from '@/config/team';

/** One team card, after merging live GitHub data over the roster. */
export interface TeamMember {
  username: string;
  profileUrl: string;
  name: string;
  avatarUrl: string;
  followers: number;
  repos: number;
  /** GitHub's own text, shown untranslated in every locale. */
  bio: string | null;
  location: string | null;
  email: string | null;
  x: string | null;
  telegram: string | null;
  linkedin: string | null;
}

/** The subset of GET /users/{username} the cards read. */
interface GitHubUser {
  login: string;
  name: string | null;
  avatar_url: string;
  html_url: string;
  bio: string | null;
  location: string | null;
  followers: number;
  public_repos: number;
  twitter_username: string | null;
}

/**
 * Hourly. Each refresh spends one call per member - three an hour against
 * GitHub's unauthenticated limit of 60 an hour per IP - however many people
 * visit in between, since they are all served the cached page.
 */
const REVALIDATE_SECONDS = 60 * 60;

/**
 * Bounds the only wait anyone can see - the build, or the very first render
 * of a cache entry. Visitors are otherwise served the cached page while it
 * refreshes in the background (stale-while-revalidate), so a slow GitHub
 * never holds up /team or the home page the way the old uncached fetch did.
 */
const TIMEOUT_MS = 5000;

async function fetchGitHubUser(username: string): Promise<GitHubUser | null> {
  const headers: Record<string, string> = {
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
  };
  // Optional and server-only (no NEXT_PUBLIC_ prefix): raises the limit to
  // 5,000 an hour if the build host's shared IP ever exhausts the 60.
  if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;

  try {
    const response = await fetch(`https://api.github.com/users/${encodeURIComponent(username)}`, {
      headers,
      signal: AbortSignal.timeout(TIMEOUT_MS),
      next: { revalidate: REVALIDATE_SECONDS },
    });
    if (!response.ok) return null;
    return (await response.json()) as GitHubUser;
  } catch {
    // Timeout, offline build, DNS - all non-fatal, the card falls back.
    return null;
  }
}

function merge(entry: TeamRosterEntry, user: GitHubUser | null): TeamMember {
  const { fallback } = entry;
  return {
    username: entry.username,
    profileUrl: user?.html_url ?? `https://github.com/${entry.username}`,
    name: user?.name || user?.login || fallback.name,
    avatarUrl: user?.avatar_url ?? fallback.avatarUrl,
    followers: user?.followers ?? fallback.followers,
    repos: user?.public_repos ?? fallback.repos,
    bio: user ? user.bio?.trim() || null : fallback.bio,
    location: user ? user.location?.trim() || null : fallback.location,
    email: entry.email,
    x: user?.twitter_username ? `https://x.com/${user.twitter_username}` : entry.x,
    telegram: entry.telegram,
    linkedin: entry.linkedin,
  };
}

/**
 * The team, with each member's public GitHub profile fetched live and merged
 * over the roster in src/config/team.ts. Never throws: a member GitHub cannot
 * answer for renders from the roster's `fallback` instead.
 */
export async function getTeam(): Promise<TeamMember[]> {
  const users = await Promise.all(TEAM_ROSTER.map((entry) => fetchGitHubUser(entry.username)));
  return TEAM_ROSTER.map((entry, index) => merge(entry, users[index] ?? null));
}
