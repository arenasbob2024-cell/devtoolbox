'use client';

import Link from 'next/link';
import { useLang } from '@/i18n/LangContext';
import { trackMonetizationClick } from '@/lib/analytics';
import { getRelevantAffiliateLinks } from '@/lib/affiliate-offers';

const copy = {
  en: {
    heading: 'Partner Offers',
    sponsorTitle: 'Sponsor this spot',
    sponsorText: 'Reach developers using this workflow',
  },
  zh: {
    heading: '合作推荐',
    sponsorTitle: '赞助这个位置',
    sponsorText: '触达正在使用此工作流的开发者',
  },
  ru: {
    heading: 'Партнерские предложения',
    sponsorTitle: 'Спонсировать этот блок',
    sponsorText: 'Охватите разработчиков в этом рабочем процессе',
  },
};

export default function AffiliateCard({ category }: { category?: string }) {
  const { lang } = useLang();
  const t = copy[lang as keyof typeof copy] || copy.en;
  const relevant = getRelevantAffiliateLinks({ category, limit: 2 });

  const sponsorHref = `/${lang}/advertise/?source=tool-sidebar-partner-card${
    category ? `&category=${encodeURIComponent(category)}` : ''
  }`;

  return (
    <div className="card" style={{ padding: 16 }}>
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
            placement: 'tool-sidebar-partner-card',
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
      <Link
        href={sponsorHref}
        onClick={() => trackMonetizationClick({
          type: 'sponsor',
          id: 'tool-sidebar-sponsor',
          category,
          placement: 'tool-sidebar-partner-card',
        })}
        style={{
          display: 'block',
          padding: relevant.length > 0 ? '12px 0 0' : '4px 0 0',
          textDecoration: 'none',
        }}
      >
        <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--accent-blue)' }}>{t.sponsorTitle}</span>
        <span style={{ display: 'block', fontSize: 11, color: 'var(--text-secondary)', marginTop: 2 }}>{t.sponsorText}</span>
      </Link>
    </div>
  );
}
