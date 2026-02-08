import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'CSS Minifier | DevToolBox',
  description: 'Free online CSS minifier and beautifier. Minify CSS for production or beautify for readability. Reduce file size and improve website performance. No signup required.',
  keywords: ['css minifier', 'css minify', 'css compressor', 'css beautifier', 'css formatter', 'minify css', 'compress css', 'css optimizer', 'css online'],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
