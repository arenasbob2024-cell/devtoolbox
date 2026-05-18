'use client';

import Link from 'next/link';
import { useEffect, useMemo, useRef } from 'react';
import { useLang } from '@/i18n/LangContext';
import { trackMonetizationClick, trackMonetizationImpression } from '@/lib/analytics';
import { getAdsterraDirectLink } from '@/lib/adsterra-direct-link';

const copy = {
  en: {
    label: 'Sponsor DevToolBox',
    title: 'Reach developers at the moment they need a tool',
    description: 'Promote developer platforms, APIs, IDEs, cloud products, and technical education to high-intent visitors.',
    packagePrefix: 'Starter package',
    packageHints: {
      'category-sponsor': 'Category Sponsor from US$299/month',
      'article-sponsor': 'Article Sponsor from US$149/article',
      'sitewide-sponsor': 'Sitewide Visibility from US$199/week',
      'partner-test': 'Partner Test from US$99',
    },
    cta: 'Advertise with us',
    directCta: 'Sponsored offer',
  },
  zh: {
    label: '赞助 DevToolBox',
    title: '在开发者真正需要工具时触达他们',
    description: '向高意图开发者推广开发者平台、API、IDE、云服务和技术教育产品。',
    packagePrefix: '推荐套餐',
    packageHints: {
      'category-sponsor': '分类赞助，每月 US$299 起',
      'article-sponsor': '文章赞助，每篇 US$149 起',
      'sitewide-sponsor': '全站曝光，每周 US$199 起',
      'partner-test': '合作测试，US$99 起',
    },
    cta: '查看广告合作',
    directCta: '赞助推荐',
  },
  ru: {
    label: 'Спонсировать DevToolBox',
    title: 'Охватите разработчиков, когда им нужен инструмент',
    description: 'Продвигайте платформы для разработчиков, API, IDE, облачные продукты и техническое обучение.',
    packagePrefix: 'Стартовый пакет',
    packageHints: {
      'category-sponsor': 'Спонсор категории от US$299/месяц',
      'article-sponsor': 'Спонсор статьи от US$149/статья',
      'sitewide-sponsor': 'Широкая видимость от US$199/неделя',
      'partner-test': 'Тест партнерства от US$99',
    },
    cta: 'Разместить рекламу',
    directCta: 'Спонсорский оффер',
  },
};

type SponsorPackageId = 'category-sponsor' | 'article-sponsor' | 'sitewide-sponsor' | 'partner-test';

function getSponsorPackageId(placement: string, category?: string): SponsorPackageId {
  const source = `${placement} ${category || ''}`.toLowerCase();

  if (source.includes('blog')) {
    return 'article-sponsor';
  }

  if (
    source.includes('home') ||
    source.includes('mobile') ||
    source.includes('site-') ||
    source.includes('tools-index') ||
    category === 'tools-index'
  ) {
    return 'sitewide-sponsor';
  }

  if (source.includes('partner') || source.includes('sidebar')) {
    return 'partner-test';
  }

  if (category && category !== 'blog' && category !== 'site') {
    return 'category-sponsor';
  }

  return 'partner-test';
}

export default function SponsorCta({
  placement,
  category,
  id = 'sponsor-cta',
}: {
  placement: string;
  category?: string;
  id?: string;
}) {
  const { lang } = useLang();
  const t = copy[lang as keyof typeof copy] || copy.en;
  const containerRef = useRef<HTMLElement | null>(null);
  const trackedRef = useRef(false);
  const packageId = getSponsorPackageId(placement, category);
  const directLink = useMemo(
    () => getAdsterraDirectLink({ placement, category, lang }),
    [category, lang, placement]
  );
  const sponsorHref = `/${lang}/advertise/?source=${encodeURIComponent(placement)}${
    category ? `&category=${encodeURIComponent(category)}` : ''
  }&package=${encodeURIComponent(packageId)}`;

  useEffect(() => {
    const element = containerRef.current;
    if (!element || trackedRef.current) return;

    const track = () => {
      if (trackedRef.current) return;
      trackedRef.current = true;
      trackMonetizationImpression({
        type: 'sponsor',
        id,
        category,
        placement,
      });

      if (directLink) {
        trackMonetizationImpression({
          type: 'adsterra',
          id: directLink.id,
          category,
          placement,
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
  }, [category, directLink, id, placement]);

  return (
    <aside
      ref={containerRef}
      style={{
        margin: '24px 0',
        padding: 18,
        border: '1px solid rgba(59,130,246,0.28)',
        borderRadius: 10,
        background: 'linear-gradient(135deg, rgba(59,130,246,0.08), rgba(16,185,129,0.08))',
      }}
    >
      <p style={{ margin: '0 0 6px', fontSize: 12, fontWeight: 750, color: 'var(--accent-emerald)', textTransform: 'uppercase', letterSpacing: 0 }}>
        {t.label}
      </p>
      <h2 style={{ margin: '0 0 8px', fontSize: 18, lineHeight: 1.35, fontWeight: 800, color: 'var(--text-primary)' }}>
        {t.title}
      </h2>
      <p style={{ margin: '0 0 14px', fontSize: 13, lineHeight: 1.65, color: 'var(--text-secondary)' }}>
        {t.description}
      </p>
      <p style={{
        margin: '0 0 14px',
        display: 'inline-flex',
        padding: '6px 9px',
        borderRadius: 8,
        border: '1px solid rgba(16,185,129,0.28)',
        background: 'rgba(16,185,129,0.08)',
        color: 'var(--text-primary)',
        fontSize: 12,
        fontWeight: 750,
        lineHeight: 1.35,
      }}>
        {t.packagePrefix}: {t.packageHints[packageId]}
      </p>
      <br />
      <Link
        href={sponsorHref}
        onClick={() => trackMonetizationClick({
          type: 'sponsor',
          id,
          category,
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
        {t.cta}
      </Link>
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
            display: 'inline-flex',
            marginLeft: 8,
            marginTop: 8,
            padding: '9px 14px',
            borderRadius: 8,
            border: '1px solid rgba(59,130,246,0.35)',
            color: 'var(--accent-blue)',
            fontSize: 13,
            fontWeight: 750,
            textDecoration: 'none',
          }}
        >
          {t.directCta}
        </a>
      )}
    </aside>
  );
}
