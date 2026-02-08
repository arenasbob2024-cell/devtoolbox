import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'DevToolBox privacy policy. We respect your privacy — all tools process data locally in your browser.',
};

export default function Privacy() {
  return (
    <div style={{ maxWidth: 700, margin: '0 auto', padding: '40px 24px' }}>
      <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 20 }}>Privacy Policy</h1>
      <div style={{ fontSize: 15, color: 'var(--text-secondary)', lineHeight: 1.8 }}>
        <p style={{ marginBottom: 16 }}><em>Last updated: February 2026</em></p>

        <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--text-primary)', marginTop: 30, marginBottom: 12 }}>Data Processing</h2>
        <p style={{ marginBottom: 16 }}>
          All tools on DevToolBox process data entirely within your web browser. <strong style={{ color: 'var(--text-primary)' }}>No data is ever sent to our servers or any third party.</strong> Your data stays on your device at all times.
        </p>

        <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--text-primary)', marginTop: 30, marginBottom: 12 }}>Cookies & Analytics</h2>
        <p style={{ marginBottom: 16 }}>
          We may use cookies for basic analytics (such as Google Analytics) to understand how our tools are used and to improve the user experience. We do not collect any personal data or input data.
        </p>

        <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--text-primary)', marginTop: 30, marginBottom: 12 }}>Advertising</h2>
        <p style={{ marginBottom: 16 }}>
          We display advertisements through Google AdSense to support the free operation of this website. Google may use cookies to serve ads based on your prior visits. You can opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-blue)' }}>Google Ads Settings</a>.
        </p>

        <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--text-primary)', marginTop: 30, marginBottom: 12 }}>Third-Party Services</h2>
        <p style={{ marginBottom: 16 }}>
          We may use the following third-party services:
        </p>
        <ul style={{ paddingLeft: 20, marginBottom: 16 }}>
          <li style={{ marginBottom: 8 }}>Google AdSense (advertising)</li>
          <li style={{ marginBottom: 8 }}>Google Analytics (website analytics)</li>
          <li style={{ marginBottom: 8 }}>Vercel (hosting)</li>
        </ul>

        <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--text-primary)', marginTop: 30, marginBottom: 12 }}>Contact</h2>
        <p>
          If you have questions about this privacy policy, please contact us via our GitHub repository.
        </p>
      </div>
    </div>
  );
}
