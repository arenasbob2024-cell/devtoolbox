import type { Metadata, Viewport } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';

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

function getHttpOrigin(url: string | undefined) {
  if (!url) return undefined;

  try {
    const normalizedUrl = url.startsWith('//') ? `https:${url}` : url;
    const parsedUrl = new URL(normalizedUrl);

    if (parsedUrl.protocol !== 'http:' && parsedUrl.protocol !== 'https:') {
      return undefined;
    }

    return parsedUrl.origin;
  } catch {
    return undefined;
  }
}

export const metadata: Metadata = {
  title: 'DevToolBox - Free Online Developer Tools',
  description: 'Free online developer tools collection - JSON formatter, Base64 encoder/decoder, URL encoder, timestamp converter, and more essential developer utilities.',
  keywords: ['developer tools', 'JSON formatter', 'Base64', 'URL encoder', 'online tools', 'developer utilities'],
  authors: [{ name: 'DevToolBox' }],
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'DevToolBox',
  },
  icons: {
    icon: [
      { url: '/icons/icon-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icons/icon-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/icons/icon-192x192.png', sizes: '192x192', type: 'image/png' },
    ],
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0f172a' },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const nativeAdOrigin = getHttpOrigin(process.env.NEXT_PUBLIC_ADSTERRA_NATIVE_SCRIPT);
  const adRuntimeConfigScript = `window.__DEVTOOLBOX_ADS__=${JSON.stringify({
    topKey: process.env.NEXT_PUBLIC_ADSTERRA_TOP_KEY || '',
    sidebarKey: process.env.NEXT_PUBLIC_ADSTERRA_SIDEBAR_KEY || '',
    mobileRectangleKey: process.env.NEXT_PUBLIC_ADSTERRA_MOBILE_RECTANGLE_KEY || '',
  }).replace(/</g, '\\u003c')};`;

  return (
    <html lang="en" dir="ltr" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <head>
        {/* PWA Manifest - Light Theme Default */}
        <link rel="manifest" href="/manifest.json" media="(prefers-color-scheme: light)" />
        <link rel="manifest" href="/manifest-dark.json" media="(prefers-color-scheme: dark)" />
        
        {/* Apple Touch Icon */}
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
        <link rel="apple-touch-icon" sizes="152x152" href="/icons/icon-152x152.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/icons/icon-192x192.png" />
        <link rel="apple-touch-icon" sizes="167x167" href="/icons/icon-152x152.png" />
        
        {/* Apple Web App Meta */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="DevToolBox" />
        
        {/* Microsoft Tiles */}
        <meta name="msapplication-TileColor" content="#0f172a" />
        <meta name="msapplication-TileImage" content="/icons/icon-144x144.png" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        
        {/* Safari Pinned Tab */}
        <link rel="mask-icon" href="/icons/safari-pinned-tab.svg" color="#0f172a" />

        {/* Resource hints for critical third-party services */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="https://www.highperformanceformat.com" />
        <link rel="preconnect" href="https://www.highperformanceformat.com" />
        {nativeAdOrigin && (
          <>
            <link rel="dns-prefetch" href={nativeAdOrigin} />
            <link rel="preconnect" href={nativeAdOrigin} />
          </>
        )}

        <link rel="llms" href="https://viadreams.cc/llms.txt" />

        {/* Google Analytics */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-85N12XK3TY" />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-85N12XK3TY');`,
          }}
        />

        {/* Public ad runtime config for client-side ad slot fallback. */}
        <script dangerouslySetInnerHTML={{ __html: adRuntimeConfigScript }} />

        {/* Microsoft Clarity - optional, enabled by env at build/runtime. */}
        {process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID && (
          <script
            dangerouslySetInnerHTML={{
              __html: `(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","${process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID}");`,
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
            }),
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
                target: 'https://viadreams.cc/en/tools/?q={search_term_string}',
                'query-input': 'required name=search_term_string',
              },
            }),
          }}
        />
      </head>
      <body
        className="antialiased"
        style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}
      >
        {children}
      </body>
    </html>
  );
}
