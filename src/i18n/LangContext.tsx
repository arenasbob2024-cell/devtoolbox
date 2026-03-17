'use client';

import { createContext, useContext } from 'react';
import type { Locale } from './config';
import type { Dictionary, UIDictionary } from './getDictionary';
import { ToolDictContext } from './ToolDictContext';

interface LangContextType {
  lang: Locale;
  dict: UIDictionary & { tools: Record<string, unknown> };
}

const LangContext = createContext<LangContextType | null>(null);

export function LangProvider({
  lang,
  dict,
  children,
}: {
  lang: Locale;
  dict: UIDictionary;
  children: React.ReactNode;
}) {
  const value: LangContextType = {
    lang,
    dict: { ...dict, tools: {} },
  };
  return (
    <LangContext.Provider value={value}>
      {children}
    </LangContext.Provider>
  );
}

/**
 * Returns lang + dict.
 * On tool pages, dict.tools is automatically merged with tool-specific data
 * injected by ToolSeoServer via ToolDictContext.
 */
export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error('useLang must be used within a LangProvider');

  const toolCtx = useContext(ToolDictContext);
  if (toolCtx && Object.keys(toolCtx.toolsData).length > 0) {
    return {
      lang: ctx.lang,
      dict: {
        ...ctx.dict,
        tools: { ...ctx.dict.tools, ...toolCtx.toolsData },
      } as unknown as Dictionary,
    };
  }

  return {
    lang: ctx.lang,
    dict: ctx.dict as unknown as Dictionary,
  };
}
