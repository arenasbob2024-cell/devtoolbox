import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'UUID Generator - Generate Random UUIDs Online',
  description: 'Generate random UUID v4 identifiers in bulk. Support uppercase, no-dash formats. Free online UUID generator, no signup required.',
  keywords: ['uuid generator', 'uuid v4', 'guid generator', 'random uuid', 'unique id generator', 'bulk uuid'],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
