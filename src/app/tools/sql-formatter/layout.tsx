import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'SQL Formatter | DevToolBox',
  description: 'Free online SQL formatter and beautifier. Format and beautify SQL queries for better readability. Supports SELECT, INSERT, UPDATE, DELETE, and more. No signup required.',
  keywords: ['sql formatter', 'sql beautifier', 'sql format', 'format sql', 'sql prettifier', 'sql query formatter', 'sql online', 'sql beautify', 'sql code formatter'],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
