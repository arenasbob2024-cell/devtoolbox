export const i18n = {
  defaultLocale: 'en',
  locales: ['en', 'fr', 'de', 'it', 'es', 'pt', 'nl', 'pl', 'sv', 'no', 'zh', 'ja', 'ko', 'id', 'th', 'ru'],
} as const;

export type Locale = (typeof i18n)['locales'][number];

export const localeNames: Record<Locale, string> = {
  en: 'English',
  fr: 'Français',
  de: 'Deutsch',
  it: 'Italiano',
  es: 'Español',
  pt: 'Português',
  nl: 'Nederlands',
  pl: 'Polski',
  sv: 'Svenska',
  no: 'Norsk',
  zh: '中文',
  ja: '日本語',
  ko: '한국어',
  id: 'Bahasa Indonesia',
  th: 'ไทย',
  ru: 'Русский',
};

export const localeFlags: Record<Locale, string> = {
  en: '🇬🇧',
  fr: '🇫🇷',
  de: '🇩🇪',
  it: '🇮🇹',
  es: '🇪🇸',
  pt: '🇵🇹',
  nl: '🇳🇱',
  pl: '🇵🇱',
  sv: '🇸🇪',
  no: '🇳🇴',
  zh: '🇨🇳',
  ja: '🇯🇵',
  ko: '🇰🇷',
  id: '🇮🇩',
  th: '🇹🇭',
  ru: '🇷🇺',
};
