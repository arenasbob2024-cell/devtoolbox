export const i18n = {
  defaultLocale: 'en',
  locales: ['en', 'fr', 'de', 'it', 'es', 'zh', 'id', 'th'],
} as const;

export type Locale = (typeof i18n)['locales'][number];

export const localeNames: Record<Locale, string> = {
  en: 'English',
  fr: 'Français',
  de: 'Deutsch',
  it: 'Italiano',
  es: 'Español',
  zh: '中文',
  id: 'Bahasa Indonesia',
  th: 'ไทย',
};

export const localeFlags: Record<Locale, string> = {
  en: '🇬🇧',
  fr: '🇫🇷',
  de: '🇩🇪',
  it: '🇮🇹',
  es: '🇪🇸',
  zh: '🇨🇳',
  id: '🇮🇩',
  th: '🇹🇭',
};
