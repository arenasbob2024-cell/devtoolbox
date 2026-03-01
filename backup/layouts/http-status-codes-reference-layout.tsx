import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'HTTP Status Codes Reference - Complete List of HTTP Error Codes',
  description: 'Complete HTTP status codes reference guide. All 1xx, 2xx, 3xx, 4xx, 5xx codes with descriptions, use cases, and examples. Searchable HTTP error codes list.',
  keywords: ['http status codes', 'http error codes list', 'http status code reference', '404 error', '500 error', 'http response codes', 'rest api status codes'],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
