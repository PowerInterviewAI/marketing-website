import { SiGithub, SiX } from '@icons-pack/react-simple-icons';
import { LinkedinIcon, Mail, Send } from 'lucide-react';

import { Reveal } from '@/components/ui/reveal';
import type { Locale } from '@/i18n/config';
import { format, pluralize } from '@/i18n/format';
import { getMessages } from '@/i18n/messages';
import { getTeam } from '@/lib/team';

function getHandleFromUrl(url: string) {
  const trimmed = url.replace(/\/+$/, '');
  const segments = trimmed.split('/');
  return segments[segments.length - 1] || trimmed;
}

const LINK_CLASS =
  'inline-flex items-center gap-1.5 text-muted-foreground transition-colors hover:text-foreground';

/**
 * Team cards, from each member's public GitHub profile (see getTeam in
 * src/lib/team.ts - fetched server-side, cached for an hour, falling back to
 * the roster in src/config/team.ts when GitHub can't answer).
 *
 * Bio and location are shown as GitHub has them, in every locale: they are
 * the member's own profile text, not site copy.
 */
export const TeamCards = async ({ locale }: { locale: Locale }) => {
  const copy = getMessages(locale).team;
  const team = await getTeam();

  return (
    <div className="mx-auto mt-14 grid max-w-3xl gap-6 md:grid-cols-2">
      {team.map((member, index) => (
        <Reveal key={member.username} delay={index * 80}>
          <div className="surface-card flex h-full flex-col gap-4 rounded-2xl p-6">
            <div className="flex items-center gap-3">
              <a
                href={member.profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={format(copy.openProfile, { username: member.username })}
              >
                <img
                  src={member.avatarUrl}
                  alt=""
                  width={56}
                  height={56}
                  loading="lazy"
                  className="size-14 rounded-full border border-border transition-opacity hover:opacity-80"
                />
              </a>
              <div className="min-w-0">
                <p className="truncate text-lg font-semibold text-foreground">{member.name}</p>
                <p className="text-sm text-muted-foreground">{copy.role}</p>
              </div>
            </div>

            <p className="min-h-10 text-sm leading-relaxed text-muted-foreground">{member.bio}</p>

            <div className="flex gap-4 text-xs text-muted-foreground">
              <span>
                {member.followers} {pluralize(locale, member.followers, copy.followers)}
              </span>
              <span>
                {member.repos} {pluralize(locale, member.repos, copy.repos)}
              </span>
              {member.location ? <span>{member.location}</span> : null}
            </div>

            <div className="mt-auto flex flex-col gap-2 border-t border-border pt-4 text-sm">
              <a
                href={member.profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={LINK_CLASS}
              >
                <SiGithub className="size-4" />@{member.username}
              </a>
              {member.email ? (
                <a href={`mailto:${member.email}`} className={LINK_CLASS}>
                  <Mail className="size-4" />
                  {member.email}
                </a>
              ) : null}
              {member.x ? (
                <a href={member.x} target="_blank" rel="noopener noreferrer" className={LINK_CLASS}>
                  <SiX className="size-4" />@{getHandleFromUrl(member.x)}
                </a>
              ) : null}
              {member.telegram ? (
                <a
                  href={member.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={LINK_CLASS}
                >
                  <Send className="size-4" />@{getHandleFromUrl(member.telegram)}
                </a>
              ) : null}
              {member.linkedin ? (
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={LINK_CLASS}
                >
                  <LinkedinIcon className="size-4" />
                  {getHandleFromUrl(member.linkedin)}
                </a>
              ) : null}
            </div>
          </div>
        </Reveal>
      ))}
    </div>
  );
};

export default TeamCards;
