'use client';

import { useState, useEffect } from 'react';
import { seedCount } from './seedHash';
import { getUgcStrings } from './ugcStrings';

interface HelpfulButtonProps {
  slug: string;
  lang: string;
}

export default function HelpfulButton({ slug, lang }: HelpfulButtonProps) {
  const t = getUgcStrings(lang).helpful;
  const [vote, setVote] = useState<'up' | 'down' | null>(null);
  const [showThanks, setShowThanks] = useState(false);

  const baseUp = seedCount(slug, 15, 89);
  const baseDown = seedCount(slug + '_down', 1, 8);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(`dtb_ugc_helpful_${slug}`);
      if (stored === 'up' || stored === 'down') setVote(stored);
    } catch {}
  }, [slug]);

  const handleVote = (dir: 'up' | 'down') => {
    const newVote = vote === dir ? null : dir;
    setVote(newVote);
    try {
      if (newVote) {
        localStorage.setItem(`dtb_ugc_helpful_${slug}`, newVote);
      } else {
        localStorage.removeItem(`dtb_ugc_helpful_${slug}`);
      }
    } catch {}
    if (newVote && !showThanks) {
      setShowThanks(true);
      setTimeout(() => setShowThanks(false), 3000);
    }
  };

  const upCount = baseUp + (vote === 'up' ? 1 : 0);
  const downCount = baseDown + (vote === 'down' ? 1 : 0);

  const btnBase: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 6,
    padding: '8px 16px',
    borderRadius: 8,
    border: '1px solid var(--border-color)',
    background: 'var(--bg-card)',
    color: 'var(--text-secondary)',
    cursor: 'pointer',
    fontSize: 14,
    fontWeight: 600,
    transition: 'all 0.2s',
  };

  return (
    <div style={{
      marginTop: 24,
      marginBottom: 24,
      padding: '20px 24px',
      background: 'var(--bg-card)',
      border: '1px solid var(--border-color)',
      borderRadius: 12,
      textAlign: 'center',
    }}>
      <p style={{ fontSize: 15, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 14 }}>
        {t.question}
      </p>
      <div style={{ display: 'flex', justifyContent: 'center', gap: 12 }}>
        <button
          onClick={() => handleVote('up')}
          aria-label="Helpful"
          style={{
            ...btnBase,
            ...(vote === 'up' ? { borderColor: 'var(--accent-emerald)', color: 'var(--accent-emerald)', background: 'rgba(16,185,129,0.1)' } : {}),
          }}
        >
          <span style={{ fontSize: 18 }}>👍</span> {upCount}
        </button>
        <button
          onClick={() => handleVote('down')}
          aria-label="Not helpful"
          style={{
            ...btnBase,
            ...(vote === 'down' ? { borderColor: 'var(--accent-rose)', color: 'var(--accent-rose)', background: 'rgba(244,63,94,0.1)' } : {}),
          }}
        >
          <span style={{ fontSize: 18 }}>👎</span> {downCount}
        </button>
      </div>
      {showThanks && (
        <p style={{ fontSize: 13, color: 'var(--accent-emerald)', marginTop: 10, fontWeight: 600 }}>
          {t.thankYou}
        </p>
      )}
    </div>
  );
}
