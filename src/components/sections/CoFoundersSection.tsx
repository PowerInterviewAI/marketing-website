import React, { useEffect, useState } from 'react';

import { AtSign, Mail, Send } from 'lucide-react';

import Container from '@/components/Container';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface CoFounderConfig {
  username: string;
  role: string;
  email?: string;
}

interface GitHubUser {
  login: string;
  avatar_url: string;
  email: string | null;
  html_url: string;
  name: string | null;
  bio: string | null;
  followers: number;
  public_repos: number;
  location: string | null;
  blog?: string;
}

interface GitHubSocialAccount {
  provider: string;
  url: string;
}

interface ContactLinks {
  email: string | null;
  x: string | null;
  telegram: string | null;
}

const coFounders: CoFounderConfig[] = [
  {
    username: 'alpha5611331',
    role: 'Full Stack Developer',
    email: 'alpha5611331@gmail.com',
  },
  {
    username: 'anton-karlovskiy',
    role: 'Full Stack Developer',
    email: 'antonkarlovskiy@outlook.com',
  },
];

export const CoFoundersSection: React.FC = () => {
  const [profiles, setProfiles] = useState<Record<string, GitHubUser>>({});
  const [contacts, setContacts] = useState<Record<string, ContactLinks>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const extractByRegex = (value: string | null | undefined, pattern: RegExp): string | null => {
      if (!value) return null;
      const match = value.match(pattern);
      return match?.[0] || null;
    };

    const fetchProfiles = async () => {
      try {
        const profileResponses = await Promise.all(
          coFounders.map(async (coFounder) => {
            const [profileResponse, socialResponse] = await Promise.all([
              fetch(`https://api.github.com/users/${coFounder.username}`, {
                headers: {
                  accept: 'application/vnd.github+json',
                },
              }),
              fetch(`https://api.github.com/users/${coFounder.username}/social_accounts`, {
                headers: {
                  accept: 'application/vnd.github+json',
                },
              }),
            ]);

            if (!profileResponse.ok) return null;

            const profile = (await profileResponse.json()) as GitHubUser;
            const socialAccounts = socialResponse.ok
              ? ((await socialResponse.json()) as GitHubSocialAccount[])
              : [];

            const xFromSocial = socialAccounts.find((account) =>
              /(?:x\.com|twitter\.com)/i.test(account.url)
            )?.url;
            const telegramFromSocial = socialAccounts.find((account) =>
              /(?:t\.me|telegram\.me)/i.test(account.url)
            )?.url;

            const xFromText =
              extractByRegex(profile.bio, /https?:\/\/(?:x\.com|twitter\.com)\/[A-Za-z0-9_]+/i) ||
              extractByRegex(profile.blog, /https?:\/\/(?:x\.com|twitter\.com)\/[A-Za-z0-9_]+/i);
            const telegramFromText =
              extractByRegex(profile.bio, /https?:\/\/(?:t\.me|telegram\.me)\/[A-Za-z0-9_]+/i) ||
              extractByRegex(profile.blog, /https?:\/\/(?:t\.me|telegram\.me)\/[A-Za-z0-9_]+/i);

            return {
              profile,
              contacts: {
                email: profile.email || coFounder.email || null,
                x: xFromSocial || xFromText,
                telegram: telegramFromSocial || telegramFromText,
              },
            };
          })
        );

        if (!isMounted) return;

        const mappedProfiles = profileResponses
          .filter(
            (result): result is { profile: GitHubUser; contacts: ContactLinks } => result !== null
          )
          .reduce<Record<string, GitHubUser>>((acc, result) => {
            acc[result.profile.login] = result.profile;
            return acc;
          }, {});

        const mappedContacts = profileResponses
          .filter(
            (result): result is { profile: GitHubUser; contacts: ContactLinks } => result !== null
          )
          .reduce<Record<string, ContactLinks>>((acc, result) => {
            acc[result.profile.login] = result.contacts;
            return acc;
          }, {});

        setProfiles(mappedProfiles);
        setContacts(mappedContacts);
      } catch (error) {
        console.warn('Failed to fetch co-founder GitHub profiles:', error);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchProfiles();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section id="co-founders" className="py-16 md:py-24" aria-labelledby="co-founders-heading">
      <Container>
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2
            id="co-founders-heading"
            className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl"
          >
            Co-founders
          </h2>
          <p className="text-lg text-muted-foreground">
            Meet the builders behind Power Interview AI.
          </p>
        </div>

        <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
          {coFounders.map((coFounder) => {
            const profile = profiles[coFounder.username];
            const contact = contacts[coFounder.username];

            return (
              <Card key={coFounder.username} className="border-primary/30 bg-primary/5">
                <CardHeader>
                  <div className="mb-3 flex items-center gap-3">
                    {profile?.avatar_url ? (
                      <a
                        href={profile?.html_url || `https://github.com/${coFounder.username}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Open ${coFounder.username} GitHub profile`}
                      >
                        <img
                          src={profile.avatar_url}
                          alt={`${profile.name || profile.login} avatar`}
                          className="h-14 w-14 rounded-full border transition-opacity hover:opacity-80"
                        />
                      </a>
                    ) : (
                      <div className="h-14 w-14 rounded-full border bg-muted" />
                    )}
                    <div>
                      <CardTitle className="text-2xl">
                        {profile?.name || `@${coFounder.username}`}
                      </CardTitle>
                      <CardDescription className="text-base">{coFounder.role}</CardDescription>
                    </div>
                  </div>

                  <p className="min-h-12 text-sm text-muted-foreground">
                    {loading
                      ? 'Loading profile details...'
                      : profile?.bio || 'Building AI products and developer tools.'}
                  </p>

                  <div className="mt-2 flex gap-4 text-sm text-muted-foreground">
                    <span>{profile?.followers ?? 0} followers</span>
                    <span>{profile?.public_repos ?? 0} repos</span>
                    {profile?.location ? <span>{profile.location}</span> : null}
                  </div>
                  <div className="mt-3 flex flex-wrap gap-4 text-sm">
                    {contact?.email ? (
                      <a
                        href={`mailto:${contact.email}`}
                        className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-foreground"
                      >
                        <Mail className="h-4 w-4" />
                        Email
                      </a>
                    ) : null}
                    {contact?.x ? (
                      <a
                        href={contact.x}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-foreground"
                      >
                        <AtSign className="h-4 w-4" />X
                      </a>
                    ) : null}
                    {contact?.telegram ? (
                      <a
                        href={contact.telegram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-foreground"
                      >
                        <Send className="h-4 w-4" />
                        Telegram
                      </a>
                    ) : null}
                  </div>
                </CardHeader>
              </Card>
            );
          })}
        </div>
      </Container>
    </section>
  );
};

export default CoFoundersSection;
