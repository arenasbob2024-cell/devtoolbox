'use client';

import { createContext, useContext } from 'react';

interface ToolDictContextType {
  /** Sparse tools map — only the current tool (and optionally related tools) */
  toolsData: Record<string, unknown>;
}

export const ToolDictContext = createContext<ToolDictContextType | null>(null);

export function ToolDictProvider({
  toolsData,
  children,
}: {
  toolsData: Record<string, unknown>;
  children: React.ReactNode;
}) {
  return (
    <ToolDictContext.Provider value={{ toolsData }}>
      {children}
    </ToolDictContext.Provider>
  );
}

export function useToolDictContext() {
  return useContext(ToolDictContext);
}
