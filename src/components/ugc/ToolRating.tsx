'use client';

import { useState, useEffect } from 'react';
import { seedCount } from './seedHash';
import { getUGCStrings } from './ugcStrings';

interface ToolRatingProps {
  toolId: string;
  lang: string;
}

export default function ToolRating({ toolId, lang }: ToolRatingProps) {
  const t = getUGCStrings(lang);
  const baseCount = seedCount(toolId, 38, 247);
  const baseAvg = seedCount(toolId + '_avg', 36, 48) / 10;

  const [userRating, setUserRating] = useState<number>(0);
  const [hover, setHover] = useState<number>(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem(`dtb_ugc_rating_${toolId}`);
    if (saved) setUserRating(parseInt(saved, 10));
  }, [toolId]);

  const handleRate = (star: number) => {
    setUserRating(star);
    localStorage.setItem(`dtb_ugc_rating_${toolId}`, String(star));
  };

  const displayCount = baseCount + (mounted && userRating > 0 ? 1 : 0);
  const displayAvg = mounted && userRating > 0
    ? Math.round(((baseAvg * baseCount + userRating) / (baseCount + 1)) * 10) / 10
    : baseAvg;

  return (
    <div style={{
      background: 'var(--bg-card)',
      border: '1px solid var(--border-color)',
      borderRadius: 10,
      padding: 16,
      textAlign: 'center',
    }}>
      <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 8 }}>
        {t.rateThis}
      </p>
      <div style={{ display: 'flex', justifyContent: 'center', gap: 4, marginBottom: 8 }}>
        {[1, 2, 3, 4, 5].map(star => (
          <button
            key={star}
            onClick={() => handleRate(star)}
            onMouseEnter={() => setHover(star)}
            onMouseLeave={() => setHover(0)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontSize: 24,
              color: star <= (hover || userRating || Math.round(displayAvg))
                ? '#f59e0b'
                : 'var(--text-secondary)',
              transition: 'color 0.15s',
              padding: '2px',
            }}
            aria-label={`Rate ${star} stars`}
          >
            ★
          </button>
        ))}
      </div>
      <p style={{ fontSize: 12, color: 'var(--text-secondary)' }}>
        {displayAvg.toFixed(1)} / 5 · {displayCount} {t.ratings}
      </p>
    </div>
  );
}
