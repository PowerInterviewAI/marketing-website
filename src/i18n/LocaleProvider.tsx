'use client';

import React, { createContext, useContext } from 'react';

import type { Locale } from '@/i18n/config';
import type { ClientMessages } from '@/i18n/messages';

interface LocaleContextValue {
  locale: Locale;
  messages: ClientMessages;
}

const LocaleContext = createContext<LocaleContextValue | null>(null);

/**
 * Hands the active locale, and the slice of the catalogue that Client
 * Components render, to the client tree. Server Components never use this: they
 * take `locale` as a prop and call `getMessages`, so the full catalogue is not
 * shipped to the browser.
 */
export const LocaleProvider: React.FC<LocaleContextValue & { children: React.ReactNode }> = ({
  locale,
  messages,
  children,
}) => <LocaleContext.Provider value={{ locale, messages }}>{children}</LocaleContext.Provider>;

function useLocaleContext(): LocaleContextValue {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error('useLocale/useMessages must be used inside <LocaleProvider>');
  return ctx;
}

export const useLocale = (): Locale => useLocaleContext().locale;
export const useMessages = (): ClientMessages => useLocaleContext().messages;
