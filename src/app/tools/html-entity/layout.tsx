import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'HTML Entity Encoder | DevToolBox',
  description: 'Free online HTML entity encoder and decoder. Encode and decode HTML entities and special characters like &amp;, &lt;, &gt;, and more. Perfect for web development and escaping HTML. No signup required.',
  keywords: ['html entity encoder', 'html entity decoder', 'html encode', 'html decode', 'html escape', 'html entities', 'special characters', 'html entity converter', 'character encoding'],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
