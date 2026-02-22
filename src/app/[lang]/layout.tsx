import type { Metadata, Viewport } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { LangProvider } from '@/i18n/LangContext';
import { getDictionary } from '@/i18n/getDictionary';
import { i18n, type Locale } from '@/i18n/config';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
});

export async function generateStaticParams() {
  // Only pre-render 'en' at build time; other locales use ISR (on-demand)
  return [{ lang: 'en' }];
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0a0a0f',
};

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
      url: `https://viadreams.cc/${lang}`,
      type: 'website',
      locale: { en: 'en_US', fr: 'fr_FR', de: 'de_DE', it: 'it_IT', es: 'es_ES', pt: 'pt_PT', nl: 'nl_NL', pl: 'pl_PL', sv: 'sv_SE', no: 'nb_NO', zh: 'zh_CN', ja: 'ja_JP', ko: 'ko_KR', id: 'id_ID', th: 'th_TH' }[lang] || 'en_US',
      siteName: 'DevToolBox',
      images: [{ url: 'https://viadreams.cc/og-image.png', width: 1200, height: 630, alt: 'DevToolBox - Free Online Developer Tools' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: dict.meta.homeTitle,
      description: dict.meta.homeDescription,
      images: ['https://viadreams.cc/og-image.png'],
    },
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: `https://viadreams.cc/${lang}`,
      languages: {
        ...Object.fromEntries(
          i18n.locales.map((l) => [l, `https://viadreams.cc/${l}`])
        ),
        'x-default': `https://viadreams.cc/en`,
      },
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
    <html lang={lang} className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <head>
        <link rel="llms" href="https://viadreams.cc/llms.txt" />
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4725521983849501" crossOrigin="anonymous"></script>
        {/* Google Analytics */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-85N12XK3TY"></script>
        <script dangerouslySetInnerHTML={{ __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-85N12XK3TY');` }} />
        {/* Organization Schema */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: 'DevToolBox',
          url: 'https://viadreams.cc',
          logo: 'https://viadreams.cc/og-image.png',
          description: 'Free online developer tools for encoding, formatting, generating, and converting data.',
          sameAs: [],
        }) }} />
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
