import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'JSON to YAML Converter - Convert JSON to YAML Online Free',
  description: 'Free online JSON to YAML converter. Instantly convert JSON data to YAML format. Supports nested objects, arrays, and complex structures. No install required.',
  keywords: ['json to yaml', 'json to yaml converter online', 'convert json to yaml', 'yaml converter', 'json yaml online', 'json to yml'],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
