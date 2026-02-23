import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Binary to Hex Converter - Convert Binary to Hexadecimal Online Free',
  description: 'Free online binary to hex converter. Convert binary to hexadecimal and hex to binary instantly. Supports binary text, bytes, and bit grouping with copy button.',
  keywords: ['binary to hex converter', 'hex to binary online', 'binary hexadecimal', 'binary converter', 'hex converter online', 'convert binary to hex'],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
