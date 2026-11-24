'use client';

import React, { useMemo, useState } from 'react';

import { Check, FileText, Search, Volume2 } from 'lucide-react';

import type { Story } from '@/i18n/messages/en/story';
import { track } from '@/lib/analytics';

export interface CheckerLanguage {
  code: string;
  name: string;
  nativeName: string;
  localName: string;
  hasVoice: boolean;
  dir: 'ltr' | 'rtl';
}

const MAX_RESULTS = 4;

const normalize = (value: string) =>
  value.normalize('NFD').replace(/\p{M}/gu, '').toLocaleLowerCase().trim();

export const LanguageChecker: React.FC<{
  copy: Story['checker'];
  languages: CheckerLanguage[];
}> = ({ copy, languages }) => {
  const [query, setQuery] = useState('');
  const needle = normalize(query);

  const results = useMemo(() => {
    if (!needle) return [];
    return languages
      .filter((language) =>
        [language.name, language.nativeName, language.localName, language.code].some((value) =>
          normalize(value).includes(needle)
        )
      )
      .slice(0, MAX_RESULTS);
  }, [languages, needle]);

  return (
    <div className="mx-auto mt-10 max-w-2xl">
      <label htmlFor="language-checker" className="mb-2 block text-center text-sm font-semibold">
        {copy.label}
      </label>
      <div className="relative">
        <Search
          className="pointer-events-none absolute start-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground"
          aria-hidden="true"
        />
        <input
          id="language-checker"
          type="search"
          value={query}
          autoComplete="off"
          placeholder={copy.placeholder}
          onChange={(event) => setQuery(event.target.value)}
          onBlur={() => needle && track('language_check', { found: results.length > 0 })}
          className="h-14 w-full rounded-xl border border-border-strong bg-card pe-4 ps-12 text-base shadow-elevation-2 outline-none transition-shadow placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring"
        />
      </div>

      <div aria-live="polite" className="mt-3 min-h-6">
        {needle && results.length === 0 && (
          <p className="text-center text-sm text-muted-foreground">{copy.none}</p>
        )}
        {results.length > 0 && (
          <ul className="grid gap-2 sm:grid-cols-2">
            {results.map((language) => (
              <li
                key={language.code}
                className="flex items-center gap-3 rounded-lg border border-success/40 bg-success/5 px-3.5 py-2.5"
              >
                <Check className="size-4 shrink-0 text-success" aria-hidden="true" />
                <span className="min-w-0 flex-1">
                  <span
                    lang={language.code}
                    dir={language.dir}
                    className="block text-sm font-semibold"
                  >
                    {language.nativeName}
                  </span>
                  <span className="block text-xs text-muted-foreground">{language.localName}</span>
                </span>
                <span className="flex shrink-0 items-center gap-1 text-xs font-medium text-muted-foreground">
                  {language.hasVoice ? (
                    <Volume2 className="size-3.5 text-primary" aria-hidden="true" />
                  ) : (
                    <FileText className="size-3.5" aria-hidden="true" />
                  )}
                  {language.hasVoice ? copy.voice : copy.written}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default LanguageChecker;
