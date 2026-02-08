import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Markdown Preview | DevToolBox',
  description: 'Free online Markdown preview tool. Write Markdown and see the rendered HTML preview side by side in real-time. Perfect for writing documentation, README files, and formatted text. No signup required.',
  keywords: ['markdown preview', 'markdown editor', 'markdown renderer', 'markdown online', 'md preview', 'markdown viewer', 'markdown to html', 'markdown converter'],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
