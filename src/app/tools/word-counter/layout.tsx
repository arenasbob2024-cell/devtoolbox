import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Word Counter | DevToolBox',
  description: 'Free online word counter tool. Count words, characters, sentences, and paragraphs in your text instantly. Perfect for writers, students, and content creators. No signup required.',
  keywords: ['word counter', 'character counter', 'word count', 'text counter', 'sentence counter', 'paragraph counter', 'word counter online', 'text analyzer', 'word count tool'],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
