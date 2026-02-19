'use client';

export default function SupportButton() {
  return (
    <a
      href="https://buymeacoffee.com/devtoolbox"
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        padding: '10px 16px',
        background: 'linear-gradient(135deg, #FF813F, #FF5F5F)',
        color: '#fff',
        fontWeight: 700,
        fontSize: 14,
        borderRadius: 8,
        textDecoration: 'none',
        transition: 'opacity 0.2s, transform 0.2s',
        boxShadow: '0 2px 8px rgba(255, 129, 63, 0.3)',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.opacity = '0.9';
        e.currentTarget.style.transform = 'translateY(-1px)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.opacity = '1';
        e.currentTarget.style.transform = 'translateY(0)';
      }}
    >
      <span style={{ fontSize: 18 }}>☕</span>
      <span>Buy Me a Coffee</span>
    </a>
  );
}
