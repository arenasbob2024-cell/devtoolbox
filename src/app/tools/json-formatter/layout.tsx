import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'JSON Formatter & Validator - Format, Beautify, Minify JSON Online',
  description: 'Free online JSON formatter, validator, and beautifier. Format, minify, and validate JSON with syntax highlighting. No signup required. 100% client-side.',
  keywords: ['json formatter', 'json validator', 'json beautifier', 'json minify', 'json pretty print', 'format json online', 'json lint'],
  openGraph: {
    title: 'JSON Formatter & Validator Online | DevToolBox',
    description: 'Format, beautify, minify, and validate JSON data online. Free, no signup required.',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
