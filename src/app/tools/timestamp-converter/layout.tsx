import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Unix Timestamp Converter - Epoch Time Converter Online',
  description: 'Convert Unix timestamps to readable dates and vice versa. Auto-detects seconds and milliseconds. Free online epoch time converter.',
  keywords: ['unix timestamp converter', 'epoch converter', 'timestamp to date', 'date to timestamp', 'unix time'],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
