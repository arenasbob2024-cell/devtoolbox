import type { Locale } from './config';

const dictionaries = {
  en: () => import('./dictionaries/en.json').then((m) => m.default),
  fr: () => import('./dictionaries/fr.json').then((m) => m.default),
  de: () => import('./dictionaries/de.json').then((m) => m.default),
  it: () => import('./dictionaries/it.json').then((m) => m.default),
  es: () => import('./dictionaries/es.json').then((m) => m.default),
  zh: () => import('./dictionaries/zh.json').then((m) => m.default),
  id: () => import('./dictionaries/id.json').then((m) => m.default),
  th: () => import('./dictionaries/th.json').then((m) => m.default),
};

export type Dictionary = Awaited<ReturnType<(typeof dictionaries)['en']>>;

export const getDictionary = async (locale: Locale): Promise<Dictionary> => {
  return dictionaries[locale]();
};
