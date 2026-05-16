'use client';

import Link from 'next/link';
import { useEffect, useMemo, useRef } from 'react';
import { useLang } from '@/i18n/LangContext';
import { trackMonetizationClick, trackMonetizationImpression } from '@/lib/analytics';
import { getRelevantAffiliateLinks } from '@/lib/affiliate-offers';

const copy = {
  en: {
    heading: 'Partner Picks',
    title: 'Tools worth trying after this guide',
    description: 'Relevant developer products for this workflow. Partner clicks help fund DevToolBox.',
    sponsorTitle: 'Sponsor this article',
    sponsorText: 'Place your product next to this developer topic with tracked clicks.',
    sponsorCta: 'Ask about article sponsorship',
  },
  zh: {
    heading: '合作推荐',
    title: '读完这篇指南后值得尝试的工具',
    description: '与当前工作流相关的开发者产品。合作点击可支持 DevToolBox 持续运营。',
    sponsorTitle: '赞助这篇文章',
    sponsorText: '把你的产品放到这个开发者主题旁边，并追踪点击效果。',
    sponsorCta: '咨询文章赞助',
  },
  ru: {
    heading: 'Партнерские рекомендации',
    title: 'Инструменты, которые стоит попробовать после этого руководства',
    description: 'Релевантные продукты для этого рабочего процесса. Партнерские клики поддерживают DevToolBox.',
    sponsorTitle: 'Спонсировать статью',
    sponsorText: 'Разместите продукт рядом с этой темой для разработчиков с отслеживанием кликов.',
    sponsorCta: 'Обсудить спонсорство статьи',
  },
};

export default function BlogPartnerOffer({
  slug,
  keywords,
}: {
  slug: string;
  keywords: string[];
}) {
  const { lang } = useLang();
  const t = copy[lang as keyof typeof copy] || copy.en;
  const offers = useMemo(
    () => getRelevantAffiliateLinks({ category: slug, keywords, limit: 2 }),
    [keywords, slug]
  );
  const containerRef = useRef<HTMLElement | null>(null);
  const trackedRef = useRef(false);
  const placement = 'blog-article-partner-offer';
  const sponsorHref = `/${lang}/advertise/?source=${encodeURIComponent(placement)}&category=${encodeURIComponent(slug)}`;

  useEffect(() => {
    const element = containerRef.current;
    if (!element || trackedRef.current) return;

    const track = () => {
      if (trackedRef.current) return;
      trackedRef.current = true;

      if (offers.length > 0) {
        offers.forEach(offer => trackMonetizationImpression({
          type: 'affiliate',
          id: offer.id,
          category: slug,
          placement,
        }));
        return;
      }

      trackMonetizationImpression({
        type: 'sponsor',
        id: 'blog-article-sponsor-fallback',
        category: slug,
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
  }, [offers, slug]);

  return (
    <section
      ref={containerRef}
      className="card"
      style={{
        marginTop: 34,
        padding: 22,
        border: '1px solid rgba(59,130,246,0.24)',
      }}
    >
      <p style={{ margin: '0 0 6px', fontSize: 12, fontWeight: 750, color: 'var(--accent-emerald)', textTransform: 'uppercase', letterSpacing: 0 }}>
        {t.heading}
      </p>
      <h2 style={{ margin: '0 0 8px', fontSize: 19, fontWeight: 800, color: 'var(--text-primary)' }}>
        {offers.length > 0 ? t.title : t.sponsorTitle}
      </h2>
      <p style={{ margin: '0 0 14px', color: 'var(--text-secondary)', fontSize: 13, lineHeight: 1.65 }}>
        {offers.length > 0 ? t.description : t.sponsorText}
      </p>

      {offers.length > 0 ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 12 }}>
          {offers.map(offer => (
            <a
              key={offer.id}
              href={offer.url}
              target="_blank"
              rel="noopener sponsored nofollow"
              onClick={() => trackMonetizationClick({
                type: 'affiliate',
                id: offer.id,
                category: slug,
                placement,
              })}
              style={{
                display: 'block',
                padding: 14,
                borderRadius: 8,
                border: '1px solid var(--border-color)',
                background: 'var(--bg-input)',
                textDecoration: 'none',
              }}
            >
              <span style={{ display: 'block', fontSize: 14, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 4 }}>
                {offer.name}
              </span>
              <span style={{ display: 'block', fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.55 }}>
                {offer.tagline}
              </span>
            </a>
          ))}
        </div>
      ) : (
        <Link
          href={sponsorHref}
          onClick={() => trackMonetizationClick({
            type: 'sponsor',
            id: 'blog-article-sponsor-fallback',
            category: slug,
            placement,
          })}
          style={{
            display: 'inline-flex',
            padding: '9px 14px',
            borderRadius: 8,
            background: 'var(--accent-blue)',
            color: '#fff',
            fontSize: 13,
            fontWeight: 750,
            textDecoration: 'none',
          }}
        >
          {t.sponsorCta}
        </Link>
      )}
    </section>
  );
}
