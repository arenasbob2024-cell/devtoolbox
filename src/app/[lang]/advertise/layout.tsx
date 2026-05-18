import type { Metadata } from 'next';
import { i18n, type Locale } from '@/i18n/config';

const BASE_URL = 'https://viadreams.cc';

const metadataCopy: Partial<Record<Locale, { title: string; description: string }>> = {
  en: {
    title: 'Advertise on DevToolBox',
    description: 'Reach developers with sponsorships, partner placements, and advertising on DevToolBox.',
  },
  zh: {
    title: '在 DevToolBox 投放广告',
    description: '通过 DevToolBox 的开发者工具页、博客和合作推荐位触达高意图开发者用户。',
  },
  ru: {
    title: 'Реклама на DevToolBox',
    description: 'Охватите разработчиков через спонсорские размещения, партнерские блоки и рекламу на DevToolBox.',
  },
};

const openGraphLocales: Partial<Record<Locale, string>> = {
  en: 'en_US',
  fr: 'fr_FR',
  de: 'de_DE',
  it: 'it_IT',
  es: 'es_ES',
  pt: 'pt_PT',
  nl: 'nl_NL',
  pl: 'pl_PL',
  sv: 'sv_SE',
  no: 'nb_NO',
  zh: 'zh_CN',
  ja: 'ja_JP',
  ko: 'ko_KR',
  id: 'id_ID',
  th: 'th_TH',
  ru: 'ru_RU',
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang: rawLang } = await params;
  const lang = (i18n.locales.includes(rawLang as Locale) ? rawLang : i18n.defaultLocale) as Locale;
  const copy = metadataCopy[lang] ?? metadataCopy.en!;
  const pageUrl = `${BASE_URL}/${lang}/advertise/`;

  return {
    title: copy.title,
    description: copy.description,
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: pageUrl,
      languages: {
        ...Object.fromEntries(
          i18n.locales.map(locale => [locale, `${BASE_URL}/${locale}/advertise/`])
        ),
        'x-default': `${BASE_URL}/en/advertise/`,
      },
    },
    openGraph: {
      title: copy.title,
      description: copy.description,
      url: pageUrl,
      type: 'website',
      locale: openGraphLocales[lang] ?? 'en_US',
      siteName: 'DevToolBox',
      images: [
        {
          url: `${BASE_URL}/og-image.png`,
          width: 1200,
          height: 630,
          alt: 'DevToolBox - Free Online Developer Tools',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: copy.title,
      description: copy.description,
      images: [`${BASE_URL}/og-image.png`],
    },
  };
}

export default function AdvertiseLayout({ children }: { children: React.ReactNode }) {
  return children;
}
