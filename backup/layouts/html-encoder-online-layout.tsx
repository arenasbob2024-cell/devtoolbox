import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'HTML Encoder Online - Encode HTML Entities Free',
  description: 'Free online HTML encoder. Convert special characters to HTML entities (&amp;, &lt;, &gt;, &quot;) instantly in your browser.',
  keywords: ['html encoder online', 'html entity encoder', 'encode html online', 'html special characters encoder', 'html escape tool'],
  openGraph: {
    title: 'HTML Encoder Online - Encode HTML Entities Free',
    description: 'Encode and decode HTML entities instantly. Convert special characters online for free.',
    type: 'website',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
