import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Password Generator | DevToolBox',
  description: 'Free online password generator. Generate secure, random passwords with customizable options including length, special characters, and numbers. Create strong passwords instantly. No signup required.',
  keywords: ['password generator', 'random password', 'secure password', 'strong password', 'password creator', 'password maker', 'password generator online', 'generate password', 'random password generator'],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
