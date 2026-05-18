'use client';

import { useState, useEffect, useRef, useCallback, useMemo, useSyncExternalStore } from 'react';
import { trackMonetizationClick, trackMonetizationImpression } from '@/lib/analytics';
import { getAdsterraDirectLink } from '@/lib/adsterra-direct-link';
import { seedCount } from './seedHash';
import { getUGCStrings } from './ugcStrings';

interface ToolRatingProps {
  toolId: string;
  lang: string;
}

const nudgeCopy: Record<string, {
  title: string;
  support: string;
  sponsor: string;
  direct: string;
}> = {
  en: {
    title: 'Thanks for the rating.',
    support: 'Support free tools',
    sponsor: 'Sponsor this tool',
    direct: 'Sponsored offer',
  },
  zh: {
    title: '\u611f\u8c22\u8bc4\u5206\u3002',
    support: '\u652f\u6301\u514d\u8d39\u5de5\u5177',
    sponsor: '\u8d5e\u52a9\u8fd9\u4e2a\u5de5\u5177',
    direct: '\u8d5e\u52a9\u63a8\u8350',
  },
  ru: {
    title: '\u0421\u043f\u0430\u0441\u0438\u0431\u043e \u0437\u0430 \u043e\u0446\u0435\u043d\u043a\u0443.',
    support: '\u041f\u043e\u0434\u0434\u0435\u0440\u0436\u0430\u0442\u044c \u0431\u0435\u0441\u043f\u043b\u0430\u0442\u043d\u044b\u0435 \u0438\u043d\u0441\u0442\u0440\u0443\u043c\u0435\u043d\u0442\u044b',
    sponsor: '\u0421\u0442\u0430\u0442\u044c \u0441\u043f\u043e\u043d\u0441\u043e\u0440\u043e\u043c',
    direct: 'Sponsored offer',
  },
};

function getRatingKey(toolId: string) {
  return `dtb_ugc_rating_${toolId}`;
}

function getRatingEventName(toolId: string) {
  return `devtoolbox:tool-rating:${toolId}`;
}

function readStoredRating(toolId: string) {
  if (typeof window === 'undefined') return 0;
  try {
    const saved = window.localStorage.getItem(getRatingKey(toolId));
    const rating = saved ? parseInt(saved, 10) : 0;
    return Number.isInteger(rating) && rating >= 1 && rating <= 5 ? rating : 0;
  } catch {
    return 0;
  }
}

function subscribeStoredRating(toolId: string, callback: () => void) {
  if (typeof window === 'undefined') return () => {};

  const eventName = getRatingEventName(toolId);
  const onStorage = (event: StorageEvent) => {
    if (event.key === getRatingKey(toolId)) callback();
  };

  window.addEventListener(eventName, callback);
  window.addEventListener('storage', onStorage);

  return () => {
    window.removeEventListener(eventName, callback);
    window.removeEventListener('storage', onStorage);
  };
}

export default function ToolRating({ toolId, lang }: ToolRatingProps) {
  const t = getUGCStrings(lang);
  const nudge = nudgeCopy[lang] || nudgeCopy.en;
  const baseCount = seedCount(toolId, 38, 247);
  const baseAvg = seedCount(toolId + '_avg', 36, 48) / 10;
  const supportHref = process.env.NEXT_PUBLIC_SUPPORT_URL || 'https://buymeacoffee.com/devtoolbox';
  const sponsorHref = `/${lang}/advertise/?source=tool-rating-thanks&category=${encodeURIComponent(toolId)}`;
  const directLink = useMemo(
    () => getAdsterraDirectLink({
      placement: 'tool-rating-thanks',
      category: toolId,
      lang,
    }),
    [lang, toolId]
  );
  const subscribeRating = useCallback(
    (callback: () => void) => subscribeStoredRating(toolId, callback),
    [toolId]
  );
  const getRatingSnapshot = useCallback(() => readStoredRating(toolId), [toolId]);

  const storedRating = useSyncExternalStore(subscribeRating, getRatingSnapshot, () => 0);
  const [hover, setHover] = useState<number>(0);
  const [showNudge, setShowNudge] = useState(false);
  const [optimisticRating, setOptimisticRating] = useState<{ toolId: string; rating: number } | null>(null);
  const trackedNudgeToolRef = useRef<string | null>(null);
  const userRating = optimisticRating?.toolId === toolId ? optimisticRating.rating : storedRating;

  useEffect(() => {
    if (!showNudge || trackedNudgeToolRef.current === toolId) return;
    trackedNudgeToolRef.current = toolId;
    trackMonetizationImpression({
      type: 'support',
      id: 'tool-rating-thanks',
      category: toolId,
      placement: 'tool-rating-thanks',
    });
    if (directLink) {
      trackMonetizationImpression({
        type: 'adsterra',
        id: directLink.id,
        category: toolId,
        placement: 'tool-rating-thanks',
      });
    }
  }, [directLink, showNudge, toolId]);

  const handleRate = (star: number) => {
    setOptimisticRating({ toolId, rating: star });
    setShowNudge(star >= 5);
    try {
      window.localStorage.setItem(getRatingKey(toolId), String(star));
      window.dispatchEvent(new Event(getRatingEventName(toolId)));
    } catch {
      // Rating UI should still work when localStorage is unavailable.
    }
  };

  const displayCount = baseCount + (userRating > 0 ? 1 : 0);
  const displayAvg = userRating > 0
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
            type="button"
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
      {showNudge ? (
        <div
          style={{
            marginTop: 12,
            paddingTop: 12,
            borderTop: '1px solid var(--border-color)',
            textAlign: 'left',
          }}
        >
          <p style={{ margin: '0 0 10px', fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.5 }}>
            {nudge.title}
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <a
              href={supportHref}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackMonetizationClick({
                type: 'support',
                id: 'buy-me-a-coffee',
                category: toolId,
                placement: 'tool-rating-thanks',
              })}
              style={{
                display: 'block',
                width: '100%',
                padding: '8px 10px',
                borderRadius: 6,
                background: 'linear-gradient(135deg, #FF813F, #FF5F5F)',
                color: '#fff',
                fontSize: 12,
                fontWeight: 700,
                textAlign: 'center',
                textDecoration: 'none',
              }}
            >
              {nudge.support}
            </a>
            <a
              href={sponsorHref}
              onClick={() => trackMonetizationClick({
                type: 'sponsor',
                id: 'tool-rating-sponsor',
                category: toolId,
                placement: 'tool-rating-thanks',
              })}
              style={{
                display: 'block',
                width: '100%',
                padding: '8px 10px',
                borderRadius: 6,
                border: '1px solid var(--border-color)',
                color: 'var(--accent-blue)',
                fontSize: 12,
                fontWeight: 700,
                textAlign: 'center',
                textDecoration: 'none',
              }}
            >
              {nudge.sponsor}
            </a>
            {directLink && (
              <a
                href={directLink.url}
                target="_blank"
                rel="noopener sponsored nofollow"
                onClick={() => trackMonetizationClick({
                  type: 'adsterra',
                  id: directLink.id,
                  category: toolId,
                  placement: 'tool-rating-thanks',
                })}
                style={{
                  display: 'block',
                  width: '100%',
                  padding: '8px 10px',
                  borderRadius: 6,
                  border: '1px solid var(--border-color)',
                  color: 'var(--accent-blue)',
                  fontSize: 12,
                  fontWeight: 700,
                  textAlign: 'center',
                  textDecoration: 'none',
                }}
              >
                {nudge.direct}
              </a>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
}
