import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Color Converter - HEX, RGB, HSL Converter Online',
  description: 'Convert colors between HEX, RGB, and HSL formats with live preview. Free online color converter and picker.',
  keywords: ['color converter', 'hex to rgb', 'rgb to hex', 'hsl converter', 'color picker', 'color code converter'],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
