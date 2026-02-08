import type { Metadata } from 'next';
import { getDictionary } from '@/i18n/getDictionary';
import { i18n, type Locale } from '@/i18n/config';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang: rawLang } = await params;
  const lang = (i18n.locales.includes(rawLang as Locale) ? rawLang : i18n.defaultLocale) as Locale;
  const dict = await getDictionary(lang);
  const t = dict.tools['html-entity'];
  const url = `https://viadreams.cc/${lang}/tools/html-entity`;
  return {
    title: t.pageTitle,
    description: t.pageDescription,
    openGraph: {
      title: `${t.pageTitle} | DevToolBox`,
      description: t.pageDescription,
      url,
      type: 'website',
      siteName: 'DevToolBox',
      images: [{ url: 'https://viadreams.cc/og-image.png', width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${t.pageTitle} | DevToolBox`,
      description: t.pageDescription,
      images: ['https://viadreams.cc/og-image.png'],
    },
    alternates: {
      canonical: url,
      languages: Object.fromEntries(
        i18n.locales.map((l) => [l, `https://viadreams.cc/${l}/tools/html-entity`])
      ),
    },
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
