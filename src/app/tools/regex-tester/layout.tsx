import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Regex Tester - Test Regular Expressions Online',
  description: 'Test regular expressions with real-time matching and highlighting. Free online regex tester with capture group support.',
  keywords: ['regex tester', 'regular expression tester', 'regex online', 'regex match', 'regex pattern', 'regex checker'],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
