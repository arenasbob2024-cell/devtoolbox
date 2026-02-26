import type { Locale } from './config';

const dictionaries = {
  en: () => import('./dictionaries/en.json').then((m) => m.default),
  fr: () => import('./dictionaries/fr.json').then((m) => m.default),
  de: () => import('./dictionaries/de.json').then((m) => m.default),
  it: () => import('./dictionaries/it.json').then((m) => m.default),
  es: () => import('./dictionaries/es.json').then((m) => m.default),
  pt: () => import('./dictionaries/pt.json').then((m) => m.default),
  nl: () => import('./dictionaries/nl.json').then((m) => m.default),
  pl: () => import('./dictionaries/pl.json').then((m) => m.default),
  sv: () => import('./dictionaries/sv.json').then((m) => m.default),
  no: () => import('./dictionaries/no.json').then((m) => m.default),
  zh: () => import('./dictionaries/zh.json').then((m) => m.default),
  ja: () => import('./dictionaries/ja.json').then((m) => m.default),
  ko: () => import('./dictionaries/ko.json').then((m) => m.default),
  id: () => import('./dictionaries/id.json').then((m) => m.default),
  th: () => import('./dictionaries/th.json').then((m) => m.default),
};

export type Dictionary = Awaited<ReturnType<(typeof dictionaries)['en']>>;

export const getDictionary = async (locale: Locale): Promise<Dictionary> => {
  // Other locales may not have all fields that en.json has (e.g., faqs)
  return dictionaries[locale]() as unknown as Promise<Dictionary>;
};
