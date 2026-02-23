import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'SHA256 Hash Online - Generate SHA-256 Hash Free',
  description: 'Free online SHA-256 hash generator. Instantly compute SHA256 hashes for any text or string. No installation needed.',
  keywords: ['sha256 hash online', 'sha-256 generator', 'sha256 online', 'generate sha256', 'sha256 hash calculator'],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
