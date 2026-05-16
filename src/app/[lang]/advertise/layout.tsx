import type { Metadata } from 'next';
import { i18n, type Locale } from '@/i18n/config';

const BASE_URL = 'https://viadreams.cc';

const metadataCopy: Record<Locale, { title: string; description: string }> = {
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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang: rawLang } = await params;
  const lang = (i18n.locales.includes(rawLang as Locale) ? rawLang : i18n.defaultLocale) as Locale;
  const copy = metadataCopy[lang];
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
      locale: { en: 'en_US', zh: 'zh_CN', ru: 'ru_RU' }[lang] || 'en_US',
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
