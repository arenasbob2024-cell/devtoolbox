import type { Metadata } from 'next';
import { getDictionary } from '@/i18n/getDictionary';
import { i18n, type Locale } from '@/i18n/config';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang: rawLang } = await params;
  const lang = (i18n.locales.includes(rawLang as Locale) ? rawLang : i18n.defaultLocale) as Locale;
  const dict = await getDictionary(lang);
  const url = `https://viadreams.cc/${lang}/tools/`;

  const title = dict.meta?.toolsIndexTitle || 'Free Online Developer Tools - JSON, Base64, Hash, CSS & More | DevToolBox';
  const description = dict.meta?.toolsIndexDescription || 'Browse 200+ free online developer tools. JSON formatter, Base64 encoder, hash generator, CSS tools, and more. No signup required, runs in your browser.';

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      type: 'website',
      siteName: 'DevToolBox',
      locale: {
        en: 'en_US', fr: 'fr_FR', de: 'de_DE', it: 'it_IT', es: 'es_ES',
        pt: 'pt_PT', nl: 'nl_NL', pl: 'pl_PL', sv: 'sv_SE', no: 'nb_NO',
        zh: 'zh_CN', ja: 'ja_JP', ko: 'ko_KR', id: 'id_ID', th: 'th_TH',
      }[lang] || 'en_US',
      images: [{ url: 'https://viadreams.cc/og-image.png', width: 1200, height: 630, alt: 'DevToolBox - Free Online Developer Tools' }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['https://viadreams.cc/og-image.png'],
    },
    alternates: {
      canonical: url,
      languages: {
        ...Object.fromEntries(
          i18n.locales.map((l) => [l, `https://viadreams.cc/${l}/tools/`])
        ),
        'x-default': 'https://viadreams.cc/en/tools/',
      },
    },
  };
}

export default function ToolsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
