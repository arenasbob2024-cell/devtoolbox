'use client';

import { useEffect, useMemo, useRef } from 'react';
import { useLang } from '@/i18n/LangContext';
import { trackMonetizationClick, trackMonetizationImpression } from '@/lib/analytics';
import { getAdsterraDirectLink } from '@/lib/adsterra-direct-link';

const copy: Record<string, {
  support: string;
  direct: string;
}> = {
  en: {
    support: 'Buy Me a Coffee',
    direct: 'Sponsored offer',
  },
  zh: {
    support: '支持免费工具',
    direct: '赞助推荐',
  },
  ru: {
    support: 'Buy Me a Coffee',
    direct: 'Sponsored offer',
  },
};

export default function SupportButton({
  placement = 'unknown',
  category,
}: {
  placement?: string;
  category?: string;
}) {
  const { lang } = useLang();
  const t = copy[lang] || copy.en;
  const containerRef = useRef<HTMLDivElement | null>(null);
  const trackedRef = useRef(false);
  const directPlacement = `${placement}-support-direct-link`;
  const directLink = useMemo(
    () => getAdsterraDirectLink({
      placement: directPlacement,
      category,
      lang,
    }),
    [category, directPlacement, lang]
  );

  useEffect(() => {
    const element = containerRef.current;
    if (!element || trackedRef.current) return;

    const track = () => {
      if (trackedRef.current) return;
      trackedRef.current = true;
      trackMonetizationImpression({
        type: 'support',
        id: 'buy-me-a-coffee',
        category,
        placement,
      });

      if (directLink) {
        trackMonetizationImpression({
          type: 'adsterra',
          id: directLink.id,
          category,
          placement: directPlacement,
        });
      }
    };

    if (!('IntersectionObserver' in window)) {
      track();
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      if (entries.some(entry => entry.isIntersecting)) {
        track();
        observer.disconnect();
      }
    }, { threshold: 0.5 });

    observer.observe(element);

    return () => observer.disconnect();
  }, [category, directLink, directPlacement, placement]);

  return (
    <div
      ref={containerRef}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
      }}
    >
      <a
        href={process.env.NEXT_PUBLIC_SUPPORT_URL || 'https://buymeacoffee.com/devtoolbox'}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackMonetizationClick({
          type: 'support',
          id: 'buy-me-a-coffee',
          category,
          placement,
        })}
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
        <span>{t.support}</span>
      </a>
      {directLink && (
        <a
          href={directLink.url}
          target="_blank"
          rel="noopener sponsored nofollow"
          onClick={() => trackMonetizationClick({
            type: 'adsterra',
            id: directLink.id,
            category,
            placement: directPlacement,
          })}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '8px 12px',
            borderRadius: 8,
            border: '1px solid var(--border-color)',
            color: 'var(--accent-blue)',
            fontSize: 12,
            fontWeight: 700,
            textDecoration: 'none',
          }}
        >
          {t.direct}
        </a>
      )}
    </div>
  );
}
