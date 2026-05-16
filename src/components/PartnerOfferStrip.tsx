'use client';

import Link from 'next/link';
import { useEffect, useMemo, useRef } from 'react';
import { useLang } from '@/i18n/LangContext';
import { getRelevantAffiliateLinks } from '@/lib/affiliate-offers';
import { trackMonetizationClick, trackMonetizationImpression } from '@/lib/analytics';

const copy = {
  en: {
    heading: 'Partner Picks',
    title: 'Recommended developer products for this workflow',
    description: 'Relevant partner tools for visitors browsing this developer category.',
    sponsor: 'Sponsor this category',
  },
  zh: {
    heading: '合作推荐',
    title: '适合这个工作流的开发者产品',
    description: '面向正在浏览该开发者工具分类的访客展示相关合作产品。',
    sponsor: '赞助这个分类',
  },
  ru: {
    heading: 'Партнерские рекомендации',
    title: 'Рекомендуемые продукты для этого рабочего процесса',
    description: 'Релевантные партнерские инструменты для посетителей этой категории.',
    sponsor: 'Спонсировать категорию',
  },
};

interface PartnerOfferStripProps {
  category: string;
  keywords?: string[];
  placement: string;
}

export default function PartnerOfferStrip({
  category,
  keywords = [],
  placement,
}: PartnerOfferStripProps) {
  const { lang } = useLang();
  const t = copy[lang as keyof typeof copy] || copy.en;
  const offers = useMemo(
    () => getRelevantAffiliateLinks({ category, keywords, limit: 3 }),
    [category, keywords]
  );
  const containerRef = useRef<HTMLElement | null>(null);
  const trackedRef = useRef(false);

  useEffect(() => {
    const element = containerRef.current;
    if (!element || trackedRef.current || offers.length === 0) return;

    const track = () => {
      if (trackedRef.current) return;
      trackedRef.current = true;

      offers.forEach((offer) => {
        trackMonetizationImpression({
          type: 'affiliate',
          id: offer.id,
          category,
          placement,
        });
      });

      trackMonetizationImpression({
        type: 'sponsor',
        id: `${placement}-sponsor`,
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
  }, [category, offers, placement]);

  if (offers.length === 0) return null;

  const sponsorHref = `/${lang}/advertise/?source=${encodeURIComponent(placement)}&category=${encodeURIComponent(category)}`;

  return (
    <aside
      ref={containerRef}
      style={{
        margin: '24px 0',
        padding: 18,
        border: '1px solid rgba(16,185,129,0.26)',
        borderRadius: 8,
        background: 'rgba(15, 23, 42, 0.45)',
      }}
    >
      <p style={{ margin: '0 0 6px', fontSize: 12, fontWeight: 750, color: 'var(--accent-emerald)', textTransform: 'uppercase' }}>
        {t.heading}
      </p>
      <h2 style={{ margin: '0 0 8px', fontSize: 18, lineHeight: 1.35, fontWeight: 800, color: 'var(--text-primary)' }}>
        {t.title}
      </h2>
      <p style={{ margin: '0 0 14px', fontSize: 13, lineHeight: 1.65, color: 'var(--text-secondary)' }}>
        {t.description}
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', gap: 10 }}>
        {offers.map((offer) => (
          <a
            key={offer.id}
            href={offer.url}
            target="_blank"
            rel="noopener sponsored nofollow"
            onClick={() => trackMonetizationClick({
              type: 'affiliate',
              id: offer.id,
              category,
              placement,
            })}
            style={{
              display: 'block',
              padding: 12,
              borderRadius: 8,
              border: '1px solid var(--border-color)',
              background: 'var(--bg-input)',
              textDecoration: 'none',
            }}
          >
            <span style={{ display: 'block', fontSize: 13, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 3 }}>
              {offer.name}
            </span>
            <span style={{ display: 'block', fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              {offer.tagline}
            </span>
          </a>
        ))}
        <Link
          href={sponsorHref}
          onClick={() => trackMonetizationClick({
            type: 'sponsor',
            id: `${placement}-sponsor`,
            category,
            placement,
          })}
          style={{
            display: 'flex',
            alignItems: 'center',
            padding: 12,
            borderRadius: 8,
            border: '1px dashed rgba(59,130,246,0.45)',
            color: 'var(--accent-blue)',
            fontSize: 13,
            fontWeight: 800,
            textDecoration: 'none',
          }}
        >
          {t.sponsor}
        </Link>
      </div>
    </aside>
  );
}
