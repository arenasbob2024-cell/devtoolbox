import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About DevToolBox',
  description: 'DevToolBox provides free online developer tools. All tools run entirely in your browser for maximum privacy and speed.',
};

export default function About() {
  return (
    <div style={{ maxWidth: 700, margin: '0 auto', padding: '40px 24px' }}>
      <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 20 }}>About DevToolBox</h1>
      <div style={{ fontSize: 15, color: 'var(--text-secondary)', lineHeight: 1.8 }}>
        <p style={{ marginBottom: 16 }}>
          <strong style={{ color: 'var(--text-primary)' }}>DevToolBox</strong> is a collection of free, online developer tools built for programmers, designers, and everyone who works with data.
        </p>
        <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--text-primary)', marginTop: 30, marginBottom: 12 }}>Our Mission</h2>
        <p style={{ marginBottom: 16 }}>
          We believe developer tools should be free, fast, and private. Every tool on DevToolBox processes data entirely in your browser — nothing is ever sent to a server.
        </p>
        <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--text-primary)', marginTop: 30, marginBottom: 12 }}>Features</h2>
        <ul style={{ paddingLeft: 20, marginBottom: 16 }}>
          <li style={{ marginBottom: 8 }}>20+ essential developer tools</li>
          <li style={{ marginBottom: 8 }}>100% client-side processing — your data never leaves your browser</li>
          <li style={{ marginBottom: 8 }}>No signup, no accounts, no tracking</li>
          <li style={{ marginBottom: 8 }}>Works on desktop, tablet, and mobile</li>
          <li style={{ marginBottom: 8 }}>Fast and lightweight</li>
        </ul>
        <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--text-primary)', marginTop: 30, marginBottom: 12 }}>Contact</h2>
        <p>
          Have feedback or suggestions? Open an issue on our <a href="https://github.com" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-blue)' }}>GitHub repository</a>.
        </p>
      </div>
    </div>
  );
}
