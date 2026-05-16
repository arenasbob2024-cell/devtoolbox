'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { useLang } from '@/i18n/LangContext';
import { trackMonetizationClick, trackMonetizationImpression } from '@/lib/analytics';

const copy = {
  en: {
    label: 'Sponsor DevToolBox',
    title: 'Reach developers at the moment they need a tool',
    description: 'Promote developer platforms, APIs, IDEs, cloud products, and technical education to high-intent visitors.',
    cta: 'Advertise with us',
  },
  zh: {
    label: '赞助 DevToolBox',
    title: '在开发者真正需要工具时触达他们',
    description: '向高意图开发者推广开发者平台、API、IDE、云服务和技术教育产品。',
    cta: '查看广告合作',
  },
  ru: {
    label: 'Спонсировать DevToolBox',
    title: 'Охватите разработчиков, когда им нужен инструмент',
    description: 'Продвигайте платформы для разработчиков, API, IDE, облачные продукты и техническое обучение.',
    cta: 'Разместить рекламу',
  },
};

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
  const sponsorHref = `/${lang}/advertise/?source=${encodeURIComponent(placement)}${
    category ? `&category=${encodeURIComponent(category)}` : ''
  }`;

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
  }, [category, id, placement]);

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
    </aside>
  );
}
