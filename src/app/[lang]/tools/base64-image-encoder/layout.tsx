import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Base64 Image Encoder - Convert Image to Base64 Online',
  description: 'Convert images to Base64 strings for embedding in HTML, CSS, and JSON.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
