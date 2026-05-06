import type { Locale } from './config';

// UI dictionaries (~4-10KB each) — common, home, categories, footer, etc.
const uiDictionaries = {
  en: () => import('./dictionaries/en-ui.json').then((m) => m.default),
  zh: () => import('./dictionaries/zh-ui.json').then((m) => m.default),
  ru: () => import('./dictionaries/ru-ui.json').then((m) => m.default),
};

// Tools dictionaries (~650-710KB each) — only loaded on tool pages
const toolsDictionaries = {
  en: () => import('./dictionaries/en-tools.json').then((m) => m.default),
  zh: () => import('./dictionaries/zh-tools.json').then((m) => m.default),
  ru: () => import('./dictionaries/ru-tools.json').then((m) => m.default),
};

export type UIDictionary = Awaited<ReturnType<(typeof uiDictionaries)['en']>>;
export type ToolsDictionary = Awaited<ReturnType<(typeof toolsDictionaries)['en']>>;
export type Dictionary = UIDictionary & { tools: ToolsDictionary };

/** Load full dictionary (UI + all tools). Use only when you need all tools. */
export const getDictionary = async (locale: Locale): Promise<Dictionary> => {
  const [ui, toolsData] = await Promise.all([
    uiDictionaries[locale](),
    toolsDictionaries[locale](),
  ]);
  return { ...ui, tools: toolsData } as unknown as Dictionary;
};

/** Load only UI strings — no tools section (~4-10KB). Use for root layouts. */
export const getUIDictionary = async (locale: Locale): Promise<UIDictionary> => {
  return uiDictionaries[locale]();
};

/** Load a single tool's translation entry. Use in tool page metadata. */
export const getToolEntry = async (
  locale: Locale,
  toolId: string
): Promise<Record<string, unknown> | undefined> => {
  const toolsData = await toolsDictionaries[locale]();
  return (toolsData as Record<string, unknown>)[toolId] as Record<string, unknown> | undefined;
};
