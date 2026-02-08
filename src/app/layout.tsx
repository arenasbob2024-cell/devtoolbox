import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: {
    default: 'DevToolBox - Free Online Developer Tools',
    template: '%s | DevToolBox',
  },
  description: 'Free online developer tools: JSON formatter, Base64 encoder, UUID generator, regex tester, hash generator, and 20+ more. No signup required. All processing in your browser.',
  keywords: ['developer tools', 'json formatter', 'base64 encoder', 'uuid generator', 'hash generator', 'url encoder', 'online tools', 'free tools', 'web developer', 'regex tester'],
  authors: [{ name: 'DevToolBox' }],
  openGraph: {
    title: 'DevToolBox - Free Online Developer Tools',
    description: 'Free online developer tools. JSON formatter, Base64, UUID, Hash, Regex, and 20+ more tools. No signup. All processing in your browser.',
    type: 'website',
    locale: 'en_US',
    siteName: 'DevToolBox',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DevToolBox - Free Online Developer Tools',
    description: 'Free online developer tools. JSON formatter, Base64, UUID, Hash, Regex, and 20+ more tools.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet" />
        {/* Google AdSense - Replace with your ad client ID */}
        {/* <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXX" crossOrigin="anonymous"></script> */}
      </head>
      <body style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Header />
        <main style={{ flex: 1 }}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
