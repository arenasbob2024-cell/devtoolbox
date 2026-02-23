import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Regex Tester Online - Test Regular Expressions in Real Time Free',
  description: 'Free online regex tester and debugger. Test regular expressions with live match highlighting, capture groups, flags selector, and match details. Instant results.',
  keywords: ['regex tester online', 'regular expression tester', 'regex debugger', 'test regex online', 'regex matcher', 'regular expression tool free'],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
