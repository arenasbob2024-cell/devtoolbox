import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'JavaScript Obfuscator Online - Free JS Code Obfuscator',
  description: 'Free online JavaScript obfuscator. Protect your JS code from reverse engineering with our browser-based minifier and obfuscator tool.',
  keywords: ['javascript obfuscator online', 'js obfuscator', 'obfuscate javascript', 'js code protector', 'javascript minifier obfuscator'],
  openGraph: {
    title: 'JavaScript Obfuscator Online - Protect JS Code Free',
    description: 'Obfuscate and protect JavaScript code instantly in your browser. No installation needed.',
    type: 'website',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
