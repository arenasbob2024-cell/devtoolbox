'use client';

import { useEffect, useRef, useState } from 'react';
import {
  trackMonetizationClick,
  trackMonetizationImpression,
  trackToolShare,
} from '@/lib/analytics';
import { getUGCStrings } from './ugcStrings';

interface ShareBarProps {
  url: string;
  title: string;
  lang: string;
  toolId?: string;
  category?: string;
}

const shareNudgeCopy: Record<string, {
  title: string;
  support: string;
  sponsor: string;
}> = {
  en: {
    title: 'Thanks for sharing.',
    support: 'Support free tools',
    sponsor: 'Sponsor this tool',
  },
  zh: {
    title: '\u611f\u8c22\u5206\u4eab\u3002',
    support: '\u652f\u6301\u514d\u8d39\u5de5\u5177',
    sponsor: '\u8d5e\u52a9\u8fd9\u4e2a\u5de5\u5177',
  },
  ru: {
    title: '\u0421\u043f\u0430\u0441\u0438\u0431\u043e \u0437\u0430 \u0440\u0435\u043f\u043e\u0441\u0442.',
    support: '\u041f\u043e\u0434\u0434\u0435\u0440\u0436\u0430\u0442\u044c \u0431\u0435\u0441\u043f\u043b\u0430\u0442\u043d\u044b\u0435 \u0438\u043d\u0441\u0442\u0440\u0443\u043c\u0435\u043d\u0442\u044b',
    sponsor: '\u0421\u0442\u0430\u0442\u044c \u0441\u043f\u043e\u043d\u0441\u043e\u0440\u043e\u043c',
  },
};

export default function ShareBar({ url, title, lang, toolId, category }: ShareBarProps) {
  const t = getUGCStrings(lang);
  const nudge = shareNudgeCopy[lang] || shareNudgeCopy.en;
  const [copied, setCopied] = useState(false);
  const [showNudge, setShowNudge] = useState(false);
  const resetTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const nudgeTrackedRef = useRef(false);
  const trackingCategory = category || toolId || 'tool-share';
  const sponsorCategory = toolId || category || 'tool-share';
  const supportHref = process.env.NEXT_PUBLIC_SUPPORT_URL || 'https://buymeacoffee.com/devtoolbox';
  const sponsorHref = `/${lang}/advertise/?source=share-bar-thanks&category=${encodeURIComponent(sponsorCategory)}`;

  useEffect(() => {
    return () => {
      if (resetTimerRef.current) {
        clearTimeout(resetTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!showNudge || nudgeTrackedRef.current) return;
    nudgeTrackedRef.current = true;
    trackMonetizationImpression({
      type: 'support',
      id: 'share-bar-thanks',
      category: trackingCategory,
      placement: 'share-bar-thanks',
    });
  }, [showNudge, trackingCategory]);

  const handleShare = (method: 'x' | 'linkedin' | 'copy-link') => {
    trackToolShare({
      method,
      toolId,
      category,
      placement: 'share-bar',
    });
    setShowNudge(true);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      handleShare('copy-link');

      if (resetTimerRef.current) {
        clearTimeout(resetTimerRef.current);
      }
      resetTimerRef.current = setTimeout(() => setCopied(false), 2000);
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
    <div style={{ marginTop: 16, marginBottom: 8 }}>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <a
          href={twitterUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => handleShare('x')}
          style={btnStyle}
        >
          𝕏 Twitter
        </a>
        <a
          href={linkedinUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => handleShare('linkedin')}
          style={btnStyle}
        >
          in LinkedIn
        </a>
        <button type="button" onClick={handleCopy} style={btnStyle}>
          {copied ? t.copied : t.copyLink}
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
              category: trackingCategory,
              placement: 'share-bar-thanks',
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
              id: 'share-bar-sponsor',
              category: trackingCategory,
              placement: 'share-bar-thanks',
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
