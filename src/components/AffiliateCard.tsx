'use client';

import Link from 'next/link';
import { useEffect, useMemo, useRef } from 'react';
import { useLang } from '@/i18n/LangContext';
import { trackMonetizationClick, trackMonetizationImpression } from '@/lib/analytics';
import { getRelevantAffiliateLinks } from '@/lib/affiliate-offers';
import { getAdsterraDirectLink } from '@/lib/adsterra-direct-link';

const copy = {
  en: {
    heading: 'Partner Offers',
    sponsorTitle: 'Sponsor this spot',
    sponsorText: 'Reach developers using this workflow',
    directTitle: 'Sponsored developer offer',
    directText: 'Open a matched advertiser offer in a new tab',
  },
  zh: {
    heading: '合作推荐',
    sponsorTitle: '赞助这个位置',
    sponsorText: '触达正在使用此工作流的开发者',
    directTitle: '开发者赞助推荐',
    directText: '在新标签页打开匹配的广告主推荐',
  },
  ru: {
    heading: 'Партнерские предложения',
    sponsorTitle: 'Спонсировать этот блок',
    sponsorText: 'Охватите разработчиков в этом рабочем процессе',
    directTitle: 'Спонсорское предложение',
    directText: 'Открыть подходящее предложение рекламодателя в новой вкладке',
  },
};

export default function AffiliateCard({ category }: { category?: string }) {
  const { lang } = useLang();
  const t = copy[lang as keyof typeof copy] || copy.en;
  const placement = 'tool-sidebar-partner-card';
  const relevant = useMemo(
    () => getRelevantAffiliateLinks({ category, limit: 2 }),
    [category]
  );
  const directLink = useMemo(
    () => getAdsterraDirectLink({ placement, category, lang }),
    [category, lang]
  );
  const containerRef = useRef<HTMLDivElement | null>(null);
  const trackedRef = useRef(false);

  const sponsorHref = `/${lang}/advertise/?source=${placement}${
    category ? `&category=${encodeURIComponent(category)}` : ''
  }`;

  useEffect(() => {
    const element = containerRef.current;
    if (!element || trackedRef.current) return;

    const track = () => {
      if (trackedRef.current) return;
      trackedRef.current = true;

      relevant.forEach((link) => {
        trackMonetizationImpression({
          type: 'affiliate',
          id: link.id,
          category,
          placement,
        });
      });

      if (directLink) {
        trackMonetizationImpression({
          type: 'adsterra',
          id: directLink.id,
          category,
          placement,
        });
      }

      trackMonetizationImpression({
        type: 'sponsor',
        id: 'tool-sidebar-sponsor',
        category,
        placement,
      });
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
  }, [category, directLink, relevant]);

  return (
    <div ref={containerRef} className="card" style={{ padding: 16 }}>
      <h3 style={{ fontSize: 12, fontWeight: 700, marginBottom: 10, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: 0 }}>
        {t.heading}
      </h3>
      {relevant.map((link) => (
        <a
          key={link.id}
          href={link.url}
          target="_blank"
          rel="noopener sponsored nofollow"
          onClick={() => trackMonetizationClick({
            type: 'affiliate',
            id: link.id,
            category,
            placement,
          })}
          style={{
            display: 'block',
            padding: '10px 0',
            borderBottom: '1px solid var(--border-color)',
            textDecoration: 'none',
          }}
        >
          <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>{link.name}</span>
          <span style={{ display: 'block', fontSize: 11, color: 'var(--text-secondary)', marginTop: 2 }}>{link.tagline}</span>
        </a>
      ))}
      {directLink && (
        <a
          href={directLink.url}
          target="_blank"
          rel="noopener sponsored nofollow"
          onClick={() => trackMonetizationClick({
            type: 'adsterra',
            id: directLink.id,
            category,
            placement,
          })}
          style={{
            display: 'block',
            padding: '10px 0',
            borderBottom: '1px solid var(--border-color)',
            textDecoration: 'none',
          }}
        >
          <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>{t.directTitle}</span>
          <span style={{ display: 'block', fontSize: 11, color: 'var(--text-secondary)', marginTop: 2 }}>{t.directText}</span>
        </a>
      )}
      <Link
        href={sponsorHref}
        onClick={() => trackMonetizationClick({
          type: 'sponsor',
          id: 'tool-sidebar-sponsor',
          category,
          placement,
        })}
        style={{
          display: 'block',
          padding: relevant.length > 0 || directLink ? '12px 0 0' : '4px 0 0',
          textDecoration: 'none',
        }}
      >
        <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--accent-blue)' }}>{t.sponsorTitle}</span>
        <span style={{ display: 'block', fontSize: 11, color: 'var(--text-secondary)', marginTop: 2 }}>{t.sponsorText}</span>
      </Link>
    </div>
  );
}
