'use client';

import { useState, useEffect } from 'react';
import { seedCount } from './seedHash';
import { getUGCStrings } from './ugcStrings';

interface HelpfulButtonProps {
  slug: string;
  lang: string;
}

export default function HelpfulButton({ slug, lang }: HelpfulButtonProps) {
  const t = getUGCStrings(lang);
  const baseUp = seedCount(slug, 15, 89);
  const baseDown = seedCount(slug + '_down', 1, 8);

  const [vote, setVote] = useState<'up' | 'down' | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem(`dtb_ugc_helpful_${slug}`);
    if (saved === 'up' || saved === 'down') setVote(saved);
  }, [slug]);

  const handleVote = (v: 'up' | 'down') => {
    const newVote = vote === v ? null : v;
    setVote(newVote);
    if (newVote) {
      localStorage.setItem(`dtb_ugc_helpful_${slug}`, newVote);
    } else {
      localStorage.removeItem(`dtb_ugc_helpful_${slug}`);
    }
  };

  const upCount = baseUp + (mounted && vote === 'up' ? 1 : 0);
  const downCount = baseDown + (mounted && vote === 'down' ? 1 : 0);

  const btnBase: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 6,
    padding: '8px 16px',
    borderRadius: 8,
    border: '1px solid var(--border-color)',
    background: 'var(--bg-card)',
    fontSize: 14,
    cursor: 'pointer',
    transition: 'all 0.15s',
  };

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      marginTop: 16,
      marginBottom: 16,
      flexWrap: 'wrap',
    }}>
      <span style={{ fontSize: 14, color: 'var(--text-secondary)', fontWeight: 500 }}>
        {t.helpful}
      </span>
      <button
        onClick={() => handleVote('up')}
        style={{
          ...btnBase,
          color: vote === 'up' ? '#10b981' : 'var(--text-secondary)',
          borderColor: vote === 'up' ? '#10b981' : 'var(--border-color)',
        }}
      >
        👍 {t.yes} ({upCount})
      </button>
      <button
        onClick={() => handleVote('down')}
        style={{
          ...btnBase,
          color: vote === 'down' ? '#f43f5e' : 'var(--text-secondary)',
          borderColor: vote === 'down' ? '#f43f5e' : 'var(--border-color)',
        }}
      >
        👎 {t.no} ({downCount})
      </button>
    </div>
  );
}
