import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'URL Encoder / Decoder Online',
  description: 'Free online URL encoder and decoder. Encode or decode URLs, URI components, and query parameters. Supports encodeURIComponent and encodeURI.',
  keywords: ['url encode', 'url decode', 'uri encoder', 'percent encoding', 'url escape', 'query string encoder'],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
