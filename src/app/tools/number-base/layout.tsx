import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Number Base Converter | DevToolBox',
  description: 'Free online number base converter. Convert numbers between binary, octal, decimal, and hexadecimal bases instantly. Perfect for programming, computer science, and math. No signup required.',
  keywords: ['number base converter', 'binary converter', 'hex converter', 'decimal converter', 'octal converter', 'base converter', 'hexadecimal converter', 'binary to decimal', 'hex to decimal'],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
