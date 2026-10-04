import type { PluralForms } from '@/i18n/format';

export const team = {
  eyebrow: 'Team',
  title: 'Our Team',
  description: 'Meet the builders behind Power Interview AI.',
  role: 'Full Stack Developer',
  openProfile: "Open {username}'s GitHub profile",
  followers: { one: 'follower', other: 'followers' } as PluralForms,
  repos: { one: 'repo', other: 'repos' } as PluralForms,
  /** Keyed by GitHub username. These are snapshots of each member's public bio. */
  members: {
    alpha5611331: {
      bio: 'Senior Software Engineer | Agentic AI • LLM • Backend • Frontend',
      location: 'Universe',
    },
    'anton-karlovskiy': {
      bio: 'Full-stack AI/Blockchain/Web Engineer',
      location: 'Universe',
    },
    user2745: {
      bio: 'Building AI products and developer tools.',
      location: 'Global',
    },
  } as Record<string, { bio: string; location: string }>,
};

export type Team = typeof team;
