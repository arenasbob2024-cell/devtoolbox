export const i18n = {
  defaultLocale: 'en',
  locales: ['en', 'zh', 'ru'],
} as const;

export type Locale = (typeof i18n)['locales'][number];

export const localeNames: Record<Locale, string> = {
  en: 'English',
  zh: '中文',
  ru: 'Русский',
};

export const localeFlags: Record<Locale, string> = {
  en: '🇬🇧',
  zh: '🇨🇳',
  ru: '🇷🇺',
};
