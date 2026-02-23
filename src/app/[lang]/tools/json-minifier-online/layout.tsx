import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'JSON Minifier Online - Compress JSON Free',
  description: 'Free online JSON minifier. Remove whitespace and compress JSON data instantly.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
