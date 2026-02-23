import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Python Formatter Online - Format Python Code Free',
  description: 'Free online Python code formatter. Format, indent and beautify Python code following PEP 8 standards instantly in your browser.',
  keywords: ['python formatter online', 'format python code online', 'python beautifier', 'pep8 formatter', 'python code formatter free'],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
