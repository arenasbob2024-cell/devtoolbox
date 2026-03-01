import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Markdown to HTML Converter - Convert Markdown Online Free',
  description: 'Free online Markdown to HTML converter. Convert Markdown syntax to clean HTML instantly. Supports headers, bold, italic, links, code blocks, lists and more.',
  keywords: ['markdown to html', 'markdown converter online', 'markdown to html converter', 'convert markdown online', 'md to html', 'markdown html generator'],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
