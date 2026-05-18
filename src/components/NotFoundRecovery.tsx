'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useMemo, useRef } from 'react';
import { trackMonetizationClick, trackMonetizationImpression } from '@/lib/analytics';
import { getAdsterraDirectLink } from '@/lib/adsterra-direct-link';
import { i18n, type Locale } from '@/i18n/config';

const copy = {
  en: {
    eyebrow: '404',
    title: 'This developer tool page is not available',
    description: 'The link may have changed. Jump back into the tool library, browse popular categories, or read the latest developer guides.',
    home: 'Home',
    tools: 'All tools',
    blog: 'Blog',
    categoriesTitle: 'Popular tool categories',
    sponsorLabel: 'Sponsor DevToolBox',
    sponsorTitle: 'Reach developers even when links break',
    sponsorText: 'Place your developer product in recovery surfaces, tool pages, and high-intent workflows.',
    sponsorCta: 'Advertise with us',
    directCta: 'Sponsored offer',
    categories: [
      { slug: 'json-tools', label: 'JSON Tools' },
      { slug: 'formatter-tools', label: 'Formatters' },
      { slug: 'security-tools', label: 'Security Tools' },
      { slug: 'converter-tools', label: 'Converters' },
    ],
  },
  zh: {
    eyebrow: '404',
    title: '这个开发者工具页面暂不可用',
    description: '链接可能已经变更。你可以返回工具库、浏览热门分类，或继续阅读开发者指南。',
    home: '首页',
    tools: '全部工具',
    blog: '博客',
    categoriesTitle: '热门工具分类',
    sponsorLabel: '赞助 DevToolBox',
    sponsorTitle: '在链接失效时仍然触达开发者',
    sponsorText: '把你的开发者产品放到恢复页、工具页和高意图工作流旁边。',
    sponsorCta: '查看广告合作',
    directCta: '赞助推荐',
    categories: [
      { slug: 'json-tools', label: 'JSON 工具' },
      { slug: 'formatter-tools', label: '格式化工具' },
      { slug: 'security-tools', label: '安全工具' },
      { slug: 'converter-tools', label: '转换工具' },
    ],
  },
  ru: {
    eyebrow: '404',
    title: 'Эта страница инструмента недоступна',
    description: 'Ссылка могла измениться. Вернитесь в библиотеку инструментов, откройте популярные категории или почитайте свежие руководства.',
    home: 'Главная',
    tools: 'Все инструменты',
    blog: 'Блог',
    categoriesTitle: 'Популярные категории',
    sponsorLabel: 'Спонсировать DevToolBox',
    sponsorTitle: 'Охватите разработчиков даже при битых ссылках',
    sponsorText: 'Разместите продукт рядом со страницами восстановления, инструментами и рабочими процессами.',
    sponsorCta: 'Разместить рекламу',
    directCta: 'Спонсорский оффер',
    categories: [
      { slug: 'json-tools', label: 'JSON-инструменты' },
      { slug: 'formatter-tools', label: 'Форматтеры' },
      { slug: 'security-tools', label: 'Безопасность' },
      { slug: 'converter-tools', label: 'Конвертеры' },
    ],
  },
};

function getLocaleFromPath(pathname: string | null): Locale {
  const firstSegment = pathname?.split('/').filter(Boolean)[0];
  return i18n.locales.includes(firstSegment as Locale)
    ? (firstSegment as Locale)
    : i18n.defaultLocale;
}

export default function NotFoundRecovery() {
  const pathname = usePathname();
  const lang = getLocaleFromPath(pathname);
  const t = copy[lang];
  const placement = 'not-found-sponsor';
  const category = '404';
  const sponsorId = 'not-found-sponsor';
  const directLink = useMemo(
    () => getAdsterraDirectLink({ placement, category, lang }),
    [lang]
  );
  const containerRef = useRef<HTMLElement | null>(null);
  const trackedRef = useRef(false);
  const sponsorHref = `/${lang}/advertise/?source=${placement}&category=${category}&package=sitewide-sponsor`;

  useEffect(() => {
    const element = containerRef.current;
    if (!element || trackedRef.current) return;

    const track = () => {
      if (trackedRef.current) return;
      trackedRef.current = true;
      trackMonetizationImpression({
        type: 'sponsor',
        id: sponsorId,
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
  }, [directLink]);

  return (
    <div style={{ maxWidth: 980, margin: '0 auto', padding: '64px 24px 72px' }}>
      <section style={{ textAlign: 'center', marginBottom: 34 }}>
        <p style={{
          margin: '0 0 10px',
          color: 'var(--accent-emerald)',
          fontSize: 13,
          fontWeight: 850,
          letterSpacing: 0,
          textTransform: 'uppercase',
        }}>
          {t.eyebrow}
        </p>
        <h1 style={{
          margin: '0 auto 12px',
          maxWidth: 720,
          fontSize: 38,
          lineHeight: 1.12,
          fontWeight: 850,
          color: 'var(--text-primary)',
        }}>
          {t.title}
        </h1>
        <p style={{
          margin: '0 auto',
          maxWidth: 640,
          color: 'var(--text-secondary)',
          fontSize: 16,
          lineHeight: 1.65,
        }}>
          {t.description}
        </p>
      </section>

      <nav
        aria-label="404 recovery links"
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: 10,
          marginBottom: 34,
        }}
      >
        {[
          { href: `/${lang}/`, label: t.home, primary: true },
          { href: `/${lang}/tools/`, label: t.tools },
          { href: `/${lang}/blog/`, label: t.blog },
        ].map((item) => (
          <Link
            key={item.href}
            href={item.href}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              minHeight: 42,
              padding: '10px 15px',
              borderRadius: 8,
              border: item.primary ? '1px solid var(--accent-blue)' : '1px solid var(--border-color)',
              background: item.primary ? 'var(--accent-blue)' : 'var(--bg-card)',
              color: item.primary ? '#fff' : 'var(--text-primary)',
              fontSize: 14,
              fontWeight: 750,
              textDecoration: 'none',
            }}
          >
            {item.label}
          </Link>
        ))}
      </nav>

      <section style={{ margin: '0 auto 34px', maxWidth: 760 }}>
        <h2 style={{ margin: '0 0 14px', fontSize: 18, fontWeight: 800, color: 'var(--text-primary)' }}>
          {t.categoriesTitle}
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: 10,
        }}>
          {t.categories.map((categoryLink) => (
            <Link
              key={categoryLink.slug}
              href={`/${lang}/category/${categoryLink.slug}/`}
              style={{
                display: 'block',
                padding: '13px 14px',
                borderRadius: 8,
                border: '1px solid var(--border-color)',
                background: 'var(--bg-card)',
                color: 'var(--text-primary)',
                fontSize: 14,
                fontWeight: 700,
                textDecoration: 'none',
              }}
            >
              {categoryLink.label}
            </Link>
          ))}
        </div>
      </section>

      <aside
        ref={containerRef}
        style={{
          margin: '0 auto',
          maxWidth: 760,
          padding: 18,
          border: '1px solid rgba(59,130,246,0.28)',
          borderRadius: 10,
          background: 'linear-gradient(135deg, rgba(59,130,246,0.08), rgba(16,185,129,0.08))',
        }}
      >
        <p style={{ margin: '0 0 6px', fontSize: 12, fontWeight: 750, color: 'var(--accent-emerald)', textTransform: 'uppercase', letterSpacing: 0 }}>
          {t.sponsorLabel}
        </p>
        <h2 style={{ margin: '0 0 8px', fontSize: 18, lineHeight: 1.35, fontWeight: 800, color: 'var(--text-primary)' }}>
          {t.sponsorTitle}
        </h2>
        <p style={{ margin: '0 0 14px', fontSize: 13, lineHeight: 1.65, color: 'var(--text-secondary)' }}>
          {t.sponsorText}
        </p>
        <Link
          href={sponsorHref}
          onClick={() => trackMonetizationClick({
            type: 'sponsor',
            id: sponsorId,
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
          {t.sponsorCta}
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
    </div>
  );
}
