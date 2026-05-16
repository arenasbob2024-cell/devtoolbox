'use client';

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from 'react';
import {
  trackContentFeedback,
  trackMonetizationClick,
  trackMonetizationImpression,
} from '@/lib/analytics';
import { seedCount } from './seedHash';
import { getUGCStrings } from './ugcStrings';

interface HelpfulButtonProps {
  slug: string;
  lang: string;
}

type HelpfulVote = 'up' | 'down' | null;

const helpfulNudgeCopy: Record<string, {
  title: string;
  support: string;
  sponsor: string;
}> = {
  en: {
    title: 'Thanks for the vote.',
    support: 'Support free guides',
    sponsor: 'Sponsor this guide',
  },
  zh: {
    title: '\u611f\u8c22\u4f60\u7684\u6295\u7968\u3002',
    support: '\u652f\u6301\u514d\u8d39\u6307\u5357',
    sponsor: '\u8d5e\u52a9\u8fd9\u7bc7\u6307\u5357',
  },
  ru: {
    title: '\u0421\u043f\u0430\u0441\u0438\u0431\u043e \u0437\u0430 \u043e\u0446\u0435\u043d\u043a\u0443.',
    support: '\u041f\u043e\u0434\u0434\u0435\u0440\u0436\u0430\u0442\u044c \u0431\u0435\u0441\u043f\u043b\u0430\u0442\u043d\u044b\u0435 \u0433\u0430\u0439\u0434\u044b',
    sponsor: '\u0421\u0442\u0430\u0442\u044c \u0441\u043f\u043e\u043d\u0441\u043e\u0440\u043e\u043c',
  },
};

function getHelpfulKey(slug: string) {
  return `dtb_ugc_helpful_${slug}`;
}

function getHelpfulEventName(slug: string) {
  return `devtoolbox:helpful:${slug}`;
}

function readStoredVote(slug: string): HelpfulVote {
  if (typeof window === 'undefined') return null;
  try {
    const saved = window.localStorage.getItem(getHelpfulKey(slug));
    return saved === 'up' || saved === 'down' ? saved : null;
  } catch {
    return null;
  }
}

function subscribeStoredVote(slug: string, callback: () => void) {
  if (typeof window === 'undefined') return () => {};

  const eventName = getHelpfulEventName(slug);
  const onStorage = (event: StorageEvent) => {
    if (event.key === getHelpfulKey(slug)) callback();
  };

  window.addEventListener(eventName, callback);
  window.addEventListener('storage', onStorage);

  return () => {
    window.removeEventListener(eventName, callback);
    window.removeEventListener('storage', onStorage);
  };
}

export default function HelpfulButton({ slug, lang }: HelpfulButtonProps) {
  const t = getUGCStrings(lang);
  const nudge = helpfulNudgeCopy[lang] || helpfulNudgeCopy.en;
  const baseUp = seedCount(slug, 15, 89);
  const baseDown = seedCount(slug + '_down', 1, 8);
  const supportHref = process.env.NEXT_PUBLIC_SUPPORT_URL || 'https://buymeacoffee.com/devtoolbox';
  const sponsorHref = `/${lang}/advertise/?source=blog-helpful-thanks&category=${encodeURIComponent(slug)}`;
  const subscribeVote = useCallback(
    (callback: () => void) => subscribeStoredVote(slug, callback),
    [slug]
  );
  const getVoteSnapshot = useCallback(() => readStoredVote(slug), [slug]);

  const storedVote = useSyncExternalStore(subscribeVote, getVoteSnapshot, () => null);
  const [optimisticVote, setOptimisticVote] = useState<{ slug: string; vote: HelpfulVote } | null>(null);
  const [showNudge, setShowNudge] = useState(false);
  const nudgeTrackedSlugRef = useRef<string | null>(null);
  const vote = optimisticVote?.slug === slug ? optimisticVote.vote : storedVote;

  useEffect(() => {
    if (!showNudge || nudgeTrackedSlugRef.current === slug) return;
    nudgeTrackedSlugRef.current = slug;
    trackMonetizationImpression({
      type: 'support',
      id: 'blog-helpful-thanks',
      category: slug,
      placement: 'blog-helpful-thanks',
    });
  }, [showNudge, slug]);

  const handleVote = (v: Exclude<HelpfulVote, null>) => {
    const newVote = vote === v ? null : v;
    setOptimisticVote({ slug, vote: newVote });
    setShowNudge(newVote === 'up');
    try {
      if (newVote) {
        window.localStorage.setItem(getHelpfulKey(slug), newVote);
      } else {
        window.localStorage.removeItem(getHelpfulKey(slug));
      }
      window.dispatchEvent(new Event(getHelpfulEventName(slug)));
    } catch {
      // Keep the visible vote state even when localStorage is unavailable.
    }
    trackContentFeedback({
      contentType: 'blog',
      id: slug,
      value: newVote || 'cleared',
      placement: 'blog-helpful',
    });
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
    fontSize: 14,
    cursor: 'pointer',
    transition: 'all 0.15s',
  };

  return (
    <div style={{ marginTop: 16, marginBottom: 16 }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        flexWrap: 'wrap',
      }}>
        <span style={{ fontSize: 14, color: 'var(--text-secondary)', fontWeight: 500 }}>
          {t.helpful}
        </span>
        <button
          type="button"
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
          type="button"
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
      {showNudge ? (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            flexWrap: 'wrap',
            marginTop: 10,
            padding: '10px 12px',
            border: '1px solid var(--border-color)',
            borderRadius: 8,
            background: 'var(--bg-card)',
          }}
        >
          <span style={{ color: 'var(--text-secondary)', fontSize: 13 }}>
            {nudge.title}
          </span>
          <a
            href={supportHref}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackMonetizationClick({
              type: 'support',
              id: 'buy-me-a-coffee',
              category: slug,
              placement: 'blog-helpful-thanks',
            })}
            style={{
              color: '#fff',
              background: 'linear-gradient(135deg, #FF813F, #FF5F5F)',
              borderRadius: 6,
              padding: '6px 10px',
              fontSize: 12,
              fontWeight: 700,
              textDecoration: 'none',
            }}
          >
            {nudge.support}
          </a>
          <a
            href={sponsorHref}
            onClick={() => trackMonetizationClick({
              type: 'sponsor',
              id: 'blog-helpful-sponsor',
              category: slug,
              placement: 'blog-helpful-thanks',
            })}
            style={{
              color: 'var(--accent-blue)',
              border: '1px solid var(--border-color)',
              borderRadius: 6,
              padding: '6px 10px',
              fontSize: 12,
              fontWeight: 700,
              textDecoration: 'none',
            }}
          >
            {nudge.sponsor}
          </a>
        </div>
      ) : null}
    </div>
  );
}
