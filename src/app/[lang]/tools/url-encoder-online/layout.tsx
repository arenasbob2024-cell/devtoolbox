import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'URL Encoder Online - Encode URL & Query Strings Free',
  description: 'Free online URL encoder. Encode URLs and query strings for safe use in web addresses. Supports percent-encoding (URL encoding) instantly.',
  keywords: ['url encoder online', 'url encode online', 'encode url', 'percent encoding', 'url encoding tool free'],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
