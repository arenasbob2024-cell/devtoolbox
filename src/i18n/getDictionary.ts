import type { Locale } from './config';

// UI dictionaries (~4-10KB each) — common, home, categories, footer, etc.
const uiDictionaries = {
  en: () => import('./dictionaries/en-ui.json').then((m) => m.default),
  fr: () => import('./dictionaries/fr-ui.json').then((m) => m.default),
  de: () => import('./dictionaries/de-ui.json').then((m) => m.default),
  it: () => import('./dictionaries/it-ui.json').then((m) => m.default),
  es: () => import('./dictionaries/es-ui.json').then((m) => m.default),
  pt: () => import('./dictionaries/pt-ui.json').then((m) => m.default),
  nl: () => import('./dictionaries/nl-ui.json').then((m) => m.default),
  pl: () => import('./dictionaries/pl-ui.json').then((m) => m.default),
  sv: () => import('./dictionaries/sv-ui.json').then((m) => m.default),
  no: () => import('./dictionaries/no-ui.json').then((m) => m.default),
  zh: () => import('./dictionaries/zh-ui.json').then((m) => m.default),
  ja: () => import('./dictionaries/ja-ui.json').then((m) => m.default),
  ko: () => import('./dictionaries/ko-ui.json').then((m) => m.default),
  id: () => import('./dictionaries/id-ui.json').then((m) => m.default),
  th: () => import('./dictionaries/th-ui.json').then((m) => m.default),
};

// Tools dictionaries (~650-710KB each) — only loaded on tool pages
const toolsDictionaries = {
  en: () => import('./dictionaries/en-tools.json').then((m) => m.default),
  fr: () => import('./dictionaries/fr-tools.json').then((m) => m.default),
  de: () => import('./dictionaries/de-tools.json').then((m) => m.default),
  it: () => import('./dictionaries/it-tools.json').then((m) => m.default),
  es: () => import('./dictionaries/es-tools.json').then((m) => m.default),
  pt: () => import('./dictionaries/pt-tools.json').then((m) => m.default),
  nl: () => import('./dictionaries/nl-tools.json').then((m) => m.default),
  pl: () => import('./dictionaries/pl-tools.json').then((m) => m.default),
  sv: () => import('./dictionaries/sv-tools.json').then((m) => m.default),
  no: () => import('./dictionaries/no-tools.json').then((m) => m.default),
  zh: () => import('./dictionaries/zh-tools.json').then((m) => m.default),
  ja: () => import('./dictionaries/ja-tools.json').then((m) => m.default),
  ko: () => import('./dictionaries/ko-tools.json').then((m) => m.default),
  id: () => import('./dictionaries/id-tools.json').then((m) => m.default),
  th: () => import('./dictionaries/th-tools.json').then((m) => m.default),
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
