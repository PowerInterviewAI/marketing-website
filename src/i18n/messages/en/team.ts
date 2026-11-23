import type { PluralForms } from '@/i18n/format';

export const team = {
  eyebrow: 'Team',
  title: 'Our Team',
  description: 'Meet the builders behind Power Interview AI.',
  role: 'Full Stack Developer',
  openProfile: "Open {username}'s GitHub profile",
  followers: { one: 'follower', other: 'followers' } as PluralForms,
  repos: { one: 'repo', other: 'repos' } as PluralForms,
};

export type Team = typeof team;
