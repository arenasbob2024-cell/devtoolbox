import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Text Diff Checker | DevToolBox',
  description: 'Free online text diff checker. Compare two texts and highlight the differences side by side. Perfect for code reviews, document comparison, and finding changes. No signup required.',
  keywords: ['text diff', 'diff checker', 'text compare', 'text difference', 'compare text', 'diff tool', 'text diff tool', 'difference checker', 'text comparison'],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
