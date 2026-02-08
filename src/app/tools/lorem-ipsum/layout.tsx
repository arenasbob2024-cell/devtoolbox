import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Lorem Ipsum Generator | DevToolBox',
  description: 'Free online Lorem Ipsum generator. Generate placeholder text in paragraphs, sentences, or words. Perfect for web design, mockups, and testing. Customize length and format. No signup required.',
  keywords: ['lorem ipsum generator', 'lorem ipsum', 'placeholder text', 'dummy text', 'filler text', 'lorem generator', 'placeholder generator', 'text generator', 'lorem ipsum online'],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
