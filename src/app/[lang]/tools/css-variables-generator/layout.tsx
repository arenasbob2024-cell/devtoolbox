import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'CSS Variables Generator - Generate CSS Custom Properties Online Free',
  description: 'Free CSS variables generator. Create CSS custom properties and :root variables from color palettes and design tokens. Export ready-to-use CSS code instantly.',
  keywords: ['css variables generator', 'css custom properties generator', 'css root variables', 'design tokens css', 'css variables online', 'generate css variables'],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
