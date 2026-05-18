import type { Metadata, Viewport } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CookieConsent from '@/components/CookieConsent';
import CopySuccessNudge from '@/components/CopySuccessNudge';
import AdsterraNativeBanner from '@/components/AdsterraNativeBanner';
import AdsterraIframeBanner from '@/components/AdsterraIframeBanner';
import AdsterraMobileStickyBanner from '@/components/AdsterraMobileStickyBanner';
import AdsterraSocialBar from '@/components/AdsterraSocialBar';
import { LangProvider } from '@/i18n/LangContext';
import { getDictionary, getUIDictionary } from '@/i18n/getDictionary';
import { i18n, type Locale } from '@/i18n/config';

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
      url: `https://viadreams.cc/${lang}/`,
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
      canonical: `https://viadreams.cc/${lang}/`,
      languages: {
        ...Object.fromEntries(
          i18n.locales.map((l) => [l, `https://viadreams.cc/${l}/`])
        ),
        'x-default': `https://viadreams.cc/en/`,
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
    <LangProvider lang={lang} dict={dict}>
      <div lang={lang} style={{ display: 'contents' }}>
        <Header />
        {/* Top Adsterra Banner 728x90 (leaderboard, above the fold).
            Activates when NEXT_PUBLIC_ADSTERRA_TOP_KEY is set. */}
        <AdsterraIframeBanner
          adKey={process.env.NEXT_PUBLIC_ADSTERRA_TOP_KEY}
          width={728}
          height={90}
          placement="site-top-leaderboard"
          fallbackToSponsor
          style={{ marginTop: 8, marginBottom: 0 }}
          loading="eager"
        />
        <main style={{ flex: 1 }}>
          {children}
          {/* Bottom Adsterra Native Banner - uses default NEXT_PUBLIC_ADSTERRA_NATIVE_* vars */}
          <AdsterraNativeBanner placement="site-bottom-native" fallbackToSponsor />
        </main>
        <Footer />
        <CopySuccessNudge />
        {/* Lightweight cookie notice - informational only, does NOT gate ads */}
        <CookieConsent lang={lang} />
        {/* Optional higher-yield Adsterra script format.
            Disabled unless NEXT_PUBLIC_ADSTERRA_SOCIAL_BAR_SCRIPT is configured. */}
        <AdsterraSocialBar
          scriptSrc={process.env.NEXT_PUBLIC_ADSTERRA_SOCIAL_BAR_SCRIPT}
          delayMs={Number(process.env.NEXT_PUBLIC_ADSTERRA_SOCIAL_BAR_DELAY_MS || 15000)}
          sessionCap={process.env.NEXT_PUBLIC_ADSTERRA_SOCIAL_BAR_SESSION_CAP !== 'false'}
        />
        {/* Optional high-viewability mobile anchor banner.
            Falls back to a compact sponsor CTA when the ad key is missing or empty. */}
        <AdsterraMobileStickyBanner
          adKey={process.env.NEXT_PUBLIC_ADSTERRA_MOBILE_STICKY_KEY}
          width={Number(process.env.NEXT_PUBLIC_ADSTERRA_MOBILE_STICKY_WIDTH || 320)}
          height={Number(process.env.NEXT_PUBLIC_ADSTERRA_MOBILE_STICKY_HEIGHT || 50)}
          fallbackToSponsor
        />
      </div>
    </LangProvider>
  );
}
