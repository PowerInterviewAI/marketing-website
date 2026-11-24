import React from 'react';

import { INTERVIEW_LANGUAGES, type InterviewLanguage, isRtl } from '@/config/languages';
import { cn } from '@/lib/utils';

const half = Math.ceil(INTERVIEW_LANGUAGES.length / 2);
const ROWS = [INTERVIEW_LANGUAGES.slice(0, half), INTERVIEW_LANGUAGES.slice(half)] as const;

const Row: React.FC<{ languages: readonly InterviewLanguage[]; reverse?: boolean }> = ({
  languages,
  reverse,
}) => (
  // The list is rendered twice and the track slides by exactly half its width,
  // so the loop has no seam.
  <div
    className={cn(
      'flex w-max hover:[animation-play-state:paused]',
      reverse ? 'animate-marquee-reverse' : 'animate-marquee'
    )}
    // ~1px per frame at 97 names; the utilities' 40s default reads as a blur.
    style={{ animationDuration: reverse ? '110s' : '100s' }}
  >
    {[0, 1].map((copy) => (
      <ul key={copy} className="flex shrink-0 items-center gap-3 pe-3">
        {languages.map((language) => (
          <li
            key={language.code}
            dir={isRtl(language) ? 'rtl' : 'ltr'}
            className={cn(
              'whitespace-nowrap rounded-full border px-4 py-1.5 text-sm font-medium',
              language.hasVoice
                ? 'border-primary/30 bg-primary/5 text-foreground'
                : 'border-border bg-card/60 text-muted-foreground'
            )}
          >
            {language.nativeName}
          </li>
        ))}
      </ul>
    ))}
  </div>
);

/**
 * Every interview language by its own name, drifting past in two rows - a
 * break in the run of card sections and a lead-in to LanguagesSection.
 *
 * Decorative and `aria-hidden`: the same names follow as a real, searchable
 * list in LanguagesSection, so a screen reader would otherwise hear all 97
 * twice. Voiced languages carry the accent border, matching the tiles below.
 * Paused on hover; frozen by the global prefers-reduced-motion rule.
 */
export const LanguageMarquee: React.FC = () => (
  <div
    aria-hidden="true"
    className="relative flex flex-col gap-3 overflow-hidden border-y border-border bg-surface-1 py-6 [mask-image:linear-gradient(to_right,transparent,#000_10%,#000_90%,transparent)]"
    dir="ltr"
  >
    <Row languages={ROWS[0]} />
    <Row languages={ROWS[1]} reverse />
  </div>
);

export default LanguageMarquee;
