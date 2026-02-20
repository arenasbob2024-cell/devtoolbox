'use client';

import { useState, useEffect } from 'react';
import { seedCount } from './seedHash';
import { getUgcStrings } from './ugcStrings';

interface ToolRatingProps {
  toolId: string;
  lang: string;
}

export default function ToolRating({ toolId, lang }: ToolRatingProps) {
  const t = getUgcStrings(lang).rating;
  const [userRating, setUserRating] = useState<number | null>(null);
  const [hovered, setHovered] = useState<number | null>(null);

  const baseCount = seedCount(toolId, 38, 247);
  const baseAvg = seedCount(toolId + '_avg', 36, 48) / 10;

  useEffect(() => {
    try {
      const stored = localStorage.getItem(`dtb_ugc_rating_${toolId}`);
      if (stored) setUserRating(Number(stored));
    } catch { /* SSR or private mode */ }
  }, [toolId]);

  const handleRate = (stars: number) => {
    setUserRating(stars);
    try { localStorage.setItem(`dtb_ugc_rating_${toolId}`, String(stars)); } catch {}
  };

  const displayCount = baseCount + (userRating ? 1 : 0);
  const displayAvg = userRating
    ? Math.round(((baseAvg * baseCount + userRating) / (baseCount + 1)) * 10) / 10
    : baseAvg;

  const activeIndex = hovered ?? userRating ?? 0;

  return (
    <div style={{
      background: 'var(--bg-card)',
      border: '1px solid var(--border-color)',
      borderRadius: 10,
      padding: 16,
    }}>
      <h3 style={{
        fontSize: 14,
        fontWeight: 700,
        marginBottom: 8,
        color: 'var(--text-secondary)',
        textTransform: 'uppercase',
        letterSpacing: 1,
      }}>
        {t.title}
      </h3>

      {/* Average display */}
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 10 }}>
        <span style={{ fontSize: 28, fontWeight: 800, color: 'var(--accent-orange)' }}>{displayAvg.toFixed(1)}</span>
        <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>/ 5</span>
      </div>

      {/* Stars */}
      <div style={{ display: 'flex', gap: 4, marginBottom: 8 }}>
        {[1, 2, 3, 4, 5].map(star => (
          <button
            key={star}
            onClick={() => handleRate(star)}
            onMouseEnter={() => setHovered(star)}
            onMouseLeave={() => setHovered(null)}
            aria-label={`Rate ${star} out of 5`}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 2,
              fontSize: 24,
              lineHeight: 1,
              color: star <= activeIndex ? 'var(--accent-orange)' : 'var(--border-color)',
              transition: 'color 0.15s, transform 0.15s',
              transform: hovered === star ? 'scale(1.2)' : 'scale(1)',
            }}
          >
            ★
          </button>
        ))}
      </div>

      {/* Count */}
      <p style={{ fontSize: 12, color: 'var(--text-secondary)', margin: 0 }}>
        {t.peopleRated.replace('{count}', String(displayCount))}
      </p>
    </div>
  );
}
