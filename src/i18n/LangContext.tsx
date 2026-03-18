'use client';

import { createContext, useContext } from 'react';
import type { Locale } from './config';
import type { Dictionary } from './getDictionary';

interface LangContextType {
  lang: Locale;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dict: any;
}

const LangContext = createContext<LangContextType | null>(null);

export function LangProvider({
  lang,
  dict,
  children,
}: {
  lang: Locale;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dict: any;
  children: React.ReactNode;
}) {
  return (
    <LangContext.Provider value={{ lang, dict }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  const context = useContext(LangContext);
  if (!context) {
    throw new Error('useLang must be used within a LangProvider');
  }
  return context as { lang: Locale; dict: Dictionary };
}
