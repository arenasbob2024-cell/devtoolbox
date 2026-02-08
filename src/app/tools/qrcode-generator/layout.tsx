import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'QR Code Generator | DevToolBox',
  description: 'Free online QR code generator. Create QR codes from text, URLs, or any data instantly. Download as PNG or SVG. No signup required. Perfect for marketing, events, and sharing information.',
  keywords: ['qr code generator', 'qr code', 'qrcode', 'qr generator', 'qr code maker', 'qr code online', 'generate qr code', 'barcode generator', 'qr code creator'],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
