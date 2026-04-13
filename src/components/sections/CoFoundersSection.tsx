import React, { useEffect, useState } from 'react';

import { Github } from 'lucide-react';

import Container from '@/components/Container';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface CoFounderConfig {
  username: string;
  role: string;
}

interface GitHubUser {
  login: string;
  avatar_url: string;
  html_url: string;
  name: string | null;
  bio: string | null;
  followers: number;
  public_repos: number;
  location: string | null;
}

const coFounders: CoFounderConfig[] = [
  {
    username: 'alpha5611331',
    role: 'Backend & LLM Engineer',
  },
  {
    username: 'anton-karlovskiy',
    role: 'Frontend & LLM Engineer',
  },
];

export const CoFoundersSection: React.FC = () => {
  const [profiles, setProfiles] = useState<Record<string, GitHubUser>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchProfiles = async () => {
      try {
        const profileResponses = await Promise.all(
          coFounders.map(async (coFounder) => {
            const response = await fetch(`https://api.github.com/users/${coFounder.username}`, {
              headers: {
                accept: 'application/vnd.github+json',
              },
            });
            if (!response.ok) return null;
            return (await response.json()) as GitHubUser;
          })
        );

        if (!isMounted) return;

        const mappedProfiles = profileResponses
          .filter((profile): profile is GitHubUser => profile !== null)
          .reduce<Record<string, GitHubUser>>((acc, profile) => {
            acc[profile.login] = profile;
            return acc;
          }, {});

        setProfiles(mappedProfiles);
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

            return (
              <Card key={coFounder.username} className="border-primary/30 bg-primary/5">
                <CardHeader>
                  <div className="mb-3 flex items-center gap-3">
                    {profile?.avatar_url ? (
                      <img
                        src={profile.avatar_url}
                        alt={`${profile.name || profile.login} avatar`}
                        className="h-14 w-14 rounded-full border"
                      />
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

                  <a
                    href={profile?.html_url || `https://github.com/${coFounder.username}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
                  >
                    <Github className="h-4 w-4" />@{coFounder.username}
                  </a>
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
