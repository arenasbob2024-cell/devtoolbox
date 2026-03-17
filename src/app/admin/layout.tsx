import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin — DevToolBox',
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ background: 'var(--bg-primary)', minHeight: '100vh', color: 'var(--text-primary)' }}>
      {children}
    </div>
  );
}
