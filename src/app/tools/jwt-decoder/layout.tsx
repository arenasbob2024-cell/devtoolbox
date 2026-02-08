import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'JWT Decoder | DevToolBox',
  description: 'Free online JWT decoder tool. Decode and inspect JSON Web Tokens (JWT) - view header, payload, and signature. Perfect for debugging authentication tokens. No signup required.',
  keywords: ['jwt decoder', 'json web token', 'jwt decode', 'jwt parser', 'jwt inspector', 'jwt online', 'decode jwt', 'jwt header', 'jwt payload', 'authentication token'],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
