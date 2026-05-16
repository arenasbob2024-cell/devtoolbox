import type { Metadata, Viewport } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CookieConsent from '@/components/CookieConsent';
import CopySuccessNudge from '@/components/CopySuccessNudge';
import AdsterraNativeBanner from '@/components/AdsterraNativeBanner';
import AdsterraIframeBanner from '@/components/AdsterraIframeBanner';
import AdsterraMobileStickyBanner from '@/components/AdsterraMobileStickyBanner';
import { LangProvider } from '@/i18n/LangContext';
import { getDictionary, getUIDictionary } from '@/i18n/getDictionary';
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
  // Only pre-render English at build time to save disk space.
  // Other locales use ISR (rendered on first request and cached).
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
  const ui = await getUIDictionary(lang);

  return {
    title: {
      default: ui.meta.homeTitle,
      template: '%s | DevToolBox',
    },
    description: ui.meta.homeDescription,
    keywords: ['developer tools', 'json formatter', 'base64 encoder', 'uuid generator', 'hash generator', 'url encoder', 'online tools', 'free tools', 'web developer', 'regex tester'],
    authors: [{ name: 'DevToolBox' }],
    openGraph: {
      title: ui.meta.homeTitle,
      description: ui.meta.homeDescription,
      url: `https://viadreams.cc/${lang}`,
      type: 'website',
      locale: { en: 'en_US', zh: 'zh_CN', ru: 'ru_RU' }[lang] || 'en_US',
      siteName: 'DevToolBox',
      images: [{ url: 'https://viadreams.cc/og-image.png', width: 1200, height: 630, alt: 'DevToolBox - Free Online Developer Tools' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: ui.meta.homeTitle,
      description: ui.meta.homeDescription,
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
    // 预连接第三方资源
    other: {
      'dns-prefetch': 'https://fonts.googleapis.com',
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
        {/* ==========================================
            关键资源预加载 - 性能优化
            ========================================== */}
        
        {/* 1. Google Fonts 预连接 */}
        {/* 提前建立与字体服务器的连接，减少字体加载时间 */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* 2. Analytics DNS 预解析 */}
        {/* 提前解析 Analytics 域名，加速 GA 加载 */}
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        
        {/* 3. Google Analytics 预连接（可选，如果 GA 是关键资源） */}
        <link rel="preconnect" href="https://www.google-analytics.com" />
        
        {/* 4. 关键图片预加载（如 LCP 图片） */}
        {/* 如果有首屏关键图片，取消下面注释并修改路径 */}
        {/* <link rel="preload" href="/hero-image.png" as="image" type="image/png" fetchPriority="high" /> */}
        
        {/* 5. 关键 CSS 预加载（如果使用外部 CSS） */}
        {/* 当前项目使用 CSS-in-JS/Tailwind，不需要预加载外部 CSS */}
        
        {/* 6. LLMs.txt 链接 */}
        <link rel="llms" href="https://viadreams.cc/llms.txt" />
        
        {/* ==========================================
            第三方脚本加载
            ========================================== */}
        
        {/* Google Analytics */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-85N12XK3TY" />
        <script 
          dangerouslySetInnerHTML={{ 
            __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-85N12XK3TY');` 
          }} 
        />
        
        {/* Microsoft Clarity — Bing-owned behavior analytics (free, may boost Bing ranking signal) */}
        {/* To activate: set NEXT_PUBLIC_CLARITY_PROJECT_ID in .env.local then rebuild */}
        {process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID && (
          <script
            dangerouslySetInnerHTML={{
              __html: `(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","${process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID}");`
            }}
          />
        )}
        
        {/* Organization Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'DevToolBox',
              url: 'https://viadreams.cc',
              logo: 'https://viadreams.cc/og-image.png',
              description: 'Free online developer tools for encoding, formatting, generating, and converting data.',
              sameAs: [],
            })
          }}
        />

        {/* WebSite Schema with SearchAction - enables Google sitelinks search box */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'DevToolBox',
              url: 'https://viadreams.cc',
              potentialAction: {
                '@type': 'SearchAction',
                target: 'https://viadreams.cc/en/tools?q={search_term_string}',
                'query-input': 'required name=search_term_string'
              }
            })
          }}
        />
      </head>
      <body style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <LangProvider lang={lang} dict={dict}>
          <Header />
          {/* Top Adsterra Banner 728x90 (leaderboard, above the fold).
              Activates when NEXT_PUBLIC_ADSTERRA_TOP_KEY is set. */}
          <AdsterraIframeBanner
            adKey={process.env.NEXT_PUBLIC_ADSTERRA_TOP_KEY}
            width={728}
            height={90}
            placement="site-top-leaderboard"
            style={{ marginTop: 8, marginBottom: 0 }}
          />
          <main style={{ flex: 1 }}>
            {children}
            {/* Bottom Adsterra Native Banner — uses default NEXT_PUBLIC_ADSTERRA_NATIVE_* vars */}
            <AdsterraNativeBanner placement="site-bottom-native" />
          </main>
          <Footer />
          <CopySuccessNudge />
          {/* Lightweight cookie notice — informational only, does NOT gate ads */}
          <CookieConsent lang={lang} />
          {/* Optional high-viewability mobile anchor banner.
              Activates when NEXT_PUBLIC_ADSTERRA_MOBILE_STICKY_KEY is set. */}
          <AdsterraMobileStickyBanner
            adKey={process.env.NEXT_PUBLIC_ADSTERRA_MOBILE_STICKY_KEY}
            width={Number(process.env.NEXT_PUBLIC_ADSTERRA_MOBILE_STICKY_WIDTH || 320)}
            height={Number(process.env.NEXT_PUBLIC_ADSTERRA_MOBILE_STICKY_HEIGHT || 50)}
          />
        </LangProvider>
      </body>
    </html>
  );
}
