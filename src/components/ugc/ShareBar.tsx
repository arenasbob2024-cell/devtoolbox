'use client';

import { useState } from 'react';
import { getUGCStrings } from './ugcStrings';

interface ShareBarProps {
  url: string;
  title: string;
  lang: string;
}

export default function ShareBar({ url, title, lang }: ShareBarProps) {
  const t = getUGCStrings(lang);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`;
  const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;

  const btnStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 6,
    padding: '6px 14px',
    borderRadius: 6,
    border: '1px solid var(--border-color)',
    background: 'var(--bg-card)',
    color: 'var(--text-secondary)',
    fontSize: 13,
    cursor: 'pointer',
    textDecoration: 'none',
    transition: 'border-color 0.15s',
  };

  return (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 16, marginBottom: 8 }}>
      <a href={twitterUrl} target="_blank" rel="noopener noreferrer" style={btnStyle}>
        𝕏 Twitter
      </a>
      <a href={linkedinUrl} target="_blank" rel="noopener noreferrer" style={btnStyle}>
        in LinkedIn
      </a>
      <button onClick={handleCopy} style={btnStyle}>
        {copied ? t.copied : t.copyLink}
      </button>
    </div>
  );
}
