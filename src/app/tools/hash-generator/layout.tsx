import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Hash Generator - SHA-256, SHA-512, SHA-1 Online',
  description: 'Generate SHA-1, SHA-256, SHA-384, SHA-512 hashes from text online. Free hash calculator with copy support. All computed in your browser.',
  keywords: ['hash generator', 'sha256', 'sha512', 'sha1', 'hash calculator', 'checksum generator', 'online hash'],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
