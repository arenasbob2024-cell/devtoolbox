import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { LangProvider } from '@/i18n/LangContext';
import { getDictionary } from '@/i18n/getDictionary';
import { i18n, type Locale } from '@/i18n/config';

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang: rawLang } = await params;
  const lang = (i18n.locales.includes(rawLang as Locale) ? rawLang : i18n.defaultLocale) as Locale;
  const dict = await getDictionary(lang);

  return {
    title: {
      default: dict.meta.homeTitle,
      template: '%s | DevToolBox',
    },
    description: dict.meta.homeDescription,
    keywords: ['developer tools', 'json formatter', 'base64 encoder', 'uuid generator', 'hash generator', 'url encoder', 'online tools', 'free tools', 'web developer', 'regex tester'],
    authors: [{ name: 'DevToolBox' }],
    openGraph: {
      title: dict.meta.homeTitle,
      description: dict.meta.homeDescription,
      type: 'website',
      locale: { en: 'en_US', fr: 'fr_FR', de: 'de_DE', it: 'it_IT', es: 'es_ES', zh: 'zh_CN', id: 'id_ID', th: 'th_TH' }[lang] || 'en_US',
      siteName: 'DevToolBox',
    },
    twitter: {
      card: 'summary_large_image',
      title: dict.meta.homeTitle,
      description: dict.meta.homeDescription,
    },
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      languages: Object.fromEntries(
        i18n.locales.map((l) => [l, `/${l}`])
      ),
    },
  };
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang: rawLang } = await params;
  const lang = (i18n.locales.includes(rawLang as Locale) ? rawLang : i18n.defaultLocale) as Locale;
  const dict = await getDictionary(lang);

  return (
    <html lang={lang}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet" />
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4725521983849501" crossOrigin="anonymous"></script>
      </head>
      <body style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <LangProvider lang={lang} dict={dict}>
          <Header />
          <main style={{ flex: 1 }}>
            {children}
          </main>
          <Footer />
        </LangProvider>
      </body>
    </html>
  );
}
