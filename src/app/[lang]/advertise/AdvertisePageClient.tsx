'use client';

import { useMemo } from 'react';
import { trackMonetizationClick } from '@/lib/analytics';
import { useLang } from '@/i18n/LangContext';

const copy = {
  en: {
    title: 'Advertise on DevToolBox',
    intro: 'Reach developers while they are actively formatting JSON, testing APIs, generating credentials, converting code, and solving implementation tasks.',
    audienceTitle: 'Audience',
    audience: ['Developers using practical tools in-session', 'High-intent traffic from search', 'Privacy-conscious workflow pages with repeat utility'],
    optionsTitle: 'Sponsorship Options',
    options: ['Tool sidebar sponsorships by category', 'Blog article sponsorships for developer guides', 'Partner recommendation placements', 'Custom campaign tests with tracked clicks'],
    packagesTitle: 'Starter Packages',
    packages: [
      {
        id: 'category-sponsor',
        name: 'Category Sponsor',
        detail: 'Own a high-intent tool category such as JSON, CSS, security, DevOps, or web tools.',
        inventory: 'Category page CTA, relevant tool sidebar CTA, and selected tool-page partner placement.',
        bestFor: 'Developer platforms with a clear category fit.',
        budget: 'Best for monthly tests and renewals.',
      },
      {
        id: 'article-sponsor',
        name: 'Article Sponsor',
        detail: 'Place your offer inside developer guides and comparison articles with tracked CTA clicks.',
        inventory: 'Article sponsor CTA, related tool block, and optional blog-list presence.',
        bestFor: 'API, hosting, IDE, database, security, and education offers.',
        budget: 'Best for content-led campaigns.',
      },
      {
        id: 'partner-test',
        name: 'Partner Test',
        detail: 'Run a short campaign across selected placements before committing to a larger buy.',
        inventory: 'One to three tracked placements chosen by category and traffic fit.',
        bestFor: 'New offers that need quick proof of intent.',
        budget: 'Best for small pilot budgets.',
      },
    ],
    inventoryTitle: 'Inventory',
    bestForTitle: 'Best for',
    budgetTitle: 'Budget fit',
    packageCta: 'Ask about this package',
    recommendedTitle: 'Recommended starting point',
    recommendedFallback: 'Partner Test is the safest first buy when you want to compare placements before scaling.',
    trackingTitle: 'Measurement',
    tracking: 'Sponsor clicks and impressions are tracked by source, category, package, and placement so campaigns can be optimized after the first test window.',
    fitTitle: 'Best Fit',
    fit: 'Developer platforms, hosting, APIs, IDEs, security tools, database products, productivity tools, and technical education offers.',
    sourceTitle: 'Inquiry Source',
    sourceUnknown: 'Direct visit',
    cta: 'Contact for sponsorship',
  },
  zh: {
    title: '在 DevToolBox 投放广告',
    intro: '触达正在格式化 JSON、测试 API、生成凭据、转换代码并解决实际开发问题的开发者用户。',
    audienceTitle: '受众',
    audience: ['正在使用实用工具的开发者', '来自搜索的高意图流量', '重视隐私且有复用价值的工作流页面'],
    optionsTitle: '合作方式',
    options: ['按工具分类投放侧边栏赞助位', '开发者指南博客赞助', '合作伙伴推荐位', '带点击追踪的定制测试活动'],
    packagesTitle: '基础合作套餐',
    packages: [
      {
        id: 'category-sponsor',
        name: '分类赞助',
        detail: '赞助 JSON、CSS、安全、DevOps、Web 工具等高意图分类页。',
        inventory: '分类页 CTA、相关工具侧边栏 CTA，以及精选工具页合作推荐位。',
        bestFor: '与某个开发者分类高度匹配的平台或工具。',
        budget: '适合按月测试和续投。',
      },
      {
        id: 'article-sponsor',
        name: '文章赞助',
        detail: '在开发者指南和对比文章中展示产品，并追踪 CTA 点击。',
        inventory: '文章赞助 CTA、相关工具模块，以及可选博客列表曝光。',
        bestFor: 'API、云服务、IDE、数据库、安全和技术教育产品。',
        budget: '适合内容驱动型投放。',
      },
      {
        id: 'partner-test',
        name: '合作测试',
        detail: '先在精选位置短期测试，再决定是否扩大预算。',
        inventory: '按分类和流量匹配选择 1-3 个可追踪位置。',
        bestFor: '需要快速验证意向的新产品或新 offer。',
        budget: '适合小预算试投。',
      },
    ],
    inventoryTitle: '可投放位置',
    bestForTitle: '适合',
    budgetTitle: '预算建议',
    packageCta: '咨询这个套餐',
    recommendedTitle: '推荐起投方案',
    recommendedFallback: '如果你想先比较不同位置的效果，合作测试是最稳妥的起投方式。',
    trackingTitle: '效果衡量',
    tracking: '赞助点击和曝光会按来源、分类、套餐和位置追踪，方便在首轮测试后优化投放。',
    fitTitle: '适合投放',
    fit: '开发者平台、云服务、API、IDE、安全工具、数据库产品、效率工具和技术教育类产品。',
    sourceTitle: '询盘来源',
    sourceUnknown: '直接访问',
    cta: '联系赞助合作',
  },
  ru: {
    title: 'Реклама на DevToolBox',
    intro: 'Охватите разработчиков, которые форматируют JSON, тестируют API, генерируют учетные данные, конвертируют код и решают практические задачи.',
    audienceTitle: 'Аудитория',
    audience: ['Разработчики, использующие практические инструменты', 'Высоконамеренный поисковый трафик', 'Страницы рабочих процессов с повторным использованием'],
    optionsTitle: 'Форматы сотрудничества',
    options: ['Спонсорство в боковой панели по категориям инструментов', 'Спонсорство статей и руководств для разработчиков', 'Партнерские рекомендательные размещения', 'Тестовые кампании с отслеживанием кликов'],
    packagesTitle: 'Стартовые пакеты',
    packages: [
      {
        id: 'category-sponsor',
        name: 'Спонсор категории',
        detail: 'Займите категорию с высоким намерением: JSON, CSS, безопасность, DevOps или web tools.',
        inventory: 'CTA на странице категории, CTA в боковой панели релевантных инструментов и партнерское размещение на выбранных страницах.',
        bestFor: 'Платформы и продукты с четким совпадением по категории.',
        budget: 'Подходит для месячных тестов и продлений.',
      },
      {
        id: 'article-sponsor',
        name: 'Спонсор статьи',
        detail: 'Разместите предложение в руководствах и сравнительных статьях с отслеживанием кликов.',
        inventory: 'CTA в статье, блок связанных инструментов и опциональное присутствие в списке блога.',
        bestFor: 'API, хостинг, IDE, базы данных, безопасность и обучение.',
        budget: 'Подходит для контентных кампаний.',
      },
      {
        id: 'partner-test',
        name: 'Тест партнерства',
        detail: 'Запустите короткую кампанию на выбранных позициях перед увеличением бюджета.',
        inventory: 'От одного до трех отслеживаемых размещений по категории и трафику.',
        bestFor: 'Новые предложения, которым нужно быстро проверить намерение.',
        budget: 'Подходит для небольших пилотных бюджетов.',
      },
    ],
    inventoryTitle: 'Инвентарь',
    bestForTitle: 'Лучше всего для',
    budgetTitle: 'Бюджет',
    packageCta: 'Обсудить пакет',
    recommendedTitle: 'Рекомендуемый старт',
    recommendedFallback: 'Partner Test - самый безопасный первый запуск, если нужно сравнить размещения перед масштабированием.',
    trackingTitle: 'Измерение',
    tracking: 'Клики и показы спонсорских блоков отслеживаются по источнику, категории, пакету и размещению, чтобы оптимизировать кампанию после первого теста.',
    fitTitle: 'Подходит для',
    fit: 'Платформы для разработчиков, хостинг, API, IDE, инструменты безопасности, базы данных, продукты для продуктивности и техническое обучение.',
    sourceTitle: 'Источник заявки',
    sourceUnknown: 'Прямой визит',
    cta: 'Связаться по рекламе',
  },
};

type PackageId = 'category-sponsor' | 'article-sponsor' | 'partner-test';

function buildContactUrl(baseUrl: string, source: string, category: string, packageName?: string) {
  const safeSource = source || 'direct';
  const safeCategory = category || 'unknown';
  const body = `Source: ${safeSource}\nCategory: ${safeCategory}\nPackage: ${packageName || 'Not selected'}\n\nTell us about your product, target audience, preferred placements, and budget range.`;

  if (baseUrl.startsWith('mailto:')) {
    const [address, query = ''] = baseUrl.split('?');
    const params = new URLSearchParams(query);

    if (!params.has('subject')) {
      params.set('subject', 'DevToolBox sponsorship inquiry');
    }
    params.set('body', body);

    return `${address}?${params.toString()}`;
  }

  const url = new URL(baseUrl, 'https://viadreams.cc');
  url.searchParams.set('source', safeSource);
  url.searchParams.set('category', safeCategory);
  if (packageName) {
    url.searchParams.set('package', packageName);
  }
  return url.toString();
}

function getRecommendedPackageId(source: string, category: string): PackageId {
  if (source.includes('blog')) {
    return 'article-sponsor';
  }

  if (source.includes('partner') || source.includes('sidebar')) {
    return 'partner-test';
  }

  if (category && category !== 'home' && category !== 'tools-index' && category !== 'blog') {
    return 'category-sponsor';
  }

  return 'partner-test';
}

interface AdvertisePageClientProps {
  source?: string;
  category?: string;
}

function AdvertiseContent({
  source = '',
  category = '',
}: AdvertisePageClientProps) {
  const { lang } = useLang();
  const t = copy[lang as keyof typeof copy] || copy.en;
  const contactBaseUrl = process.env.NEXT_PUBLIC_SPONSOR_CONTACT_URL
    || 'mailto:arenasbob.2024@gmail.com?subject=DevToolBox%20sponsorship%20inquiry';
  const recommendedPackageId = getRecommendedPackageId(source, category);
  const recommendedPackage = t.packages.find(pkg => pkg.id === recommendedPackageId) || t.packages[2];
  const contactUrl = useMemo(
    () => buildContactUrl(contactBaseUrl, source, category, recommendedPackage.name),
    [contactBaseUrl, category, recommendedPackage.name, source]
  );

  const packageContactUrls = useMemo(
    () => Object.fromEntries(
      t.packages.map(pkg => [pkg.id, buildContactUrl(contactBaseUrl, source, category, pkg.name)])
    ),
    [contactBaseUrl, category, source, t.packages]
  ) as Record<PackageId, string>;

  return (
    <div style={{ maxWidth: 920, margin: '0 auto', padding: '48px 24px' }}>
      <section style={{ marginBottom: 34 }}>
        <p style={{
          color: 'var(--accent-emerald)',
          fontSize: 13,
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: 0,
          marginBottom: 10,
        }}>
          DevToolBox
        </p>
        <h1 style={{ fontSize: 40, fontWeight: 850, lineHeight: 1.1, marginBottom: 14 }}>
          {t.title}
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: 17, lineHeight: 1.7, maxWidth: 760 }}>
          {t.intro}
        </p>
        <a
          href={contactUrl}
          onClick={() => trackMonetizationClick({
            type: 'sponsor',
            id: 'advertise-contact',
            category: category || undefined,
            placement: source || 'advertise-page',
          })}
          style={{
            display: 'inline-flex',
            marginTop: 22,
            padding: '12px 18px',
            borderRadius: 8,
            background: 'linear-gradient(135deg, var(--accent-blue), var(--accent-purple))',
            color: '#fff',
            fontWeight: 750,
            textDecoration: 'none',
          }}
        >
          {t.cta}
        </a>
        <p style={{ marginTop: 12, color: 'var(--text-secondary)', fontSize: 12 }}>
          {t.sourceTitle}: {source || t.sourceUnknown}{category ? ` / ${category}` : ''}
        </p>
      </section>

      <section className="card" style={{ marginBottom: 24, padding: 18 }}>
        <p style={{
          color: 'var(--accent-emerald)',
          fontSize: 12,
          fontWeight: 750,
          textTransform: 'uppercase',
          letterSpacing: 0,
          marginBottom: 8,
        }}>
          {t.recommendedTitle}
        </p>
        <h2 style={{ fontSize: 20, fontWeight: 800, marginBottom: 8 }}>
          {recommendedPackage.name}
        </h2>
        <p style={{ margin: 0, color: 'var(--text-secondary)', lineHeight: 1.7 }}>
          {category || source ? recommendedPackage.detail : t.recommendedFallback}
        </p>
      </section>

      <section style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
        gap: 18,
        marginBottom: 24,
      }}>
        <div className="card">
          <h2 style={{ fontSize: 18, fontWeight: 750, marginBottom: 14 }}>{t.audienceTitle}</h2>
          <ul style={{ margin: 0, paddingLeft: 18, color: 'var(--text-secondary)', lineHeight: 1.8 }}>
            {t.audience.map(item => <li key={item}>{item}</li>)}
          </ul>
        </div>
        <div className="card">
          <h2 style={{ fontSize: 18, fontWeight: 750, marginBottom: 14 }}>{t.optionsTitle}</h2>
          <ul style={{ margin: 0, paddingLeft: 18, color: 'var(--text-secondary)', lineHeight: 1.8 }}>
            {t.options.map(item => <li key={item}>{item}</li>)}
          </ul>
        </div>
      </section>

      <section style={{ marginBottom: 24 }}>
        <h2 style={{ fontSize: 18, fontWeight: 750, marginBottom: 14 }}>{t.packagesTitle}</h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: 14,
        }}>
          {t.packages.map(pkg => (
            <div key={pkg.name} className="card" style={{ padding: 16 }}>
              <h3 style={{ fontSize: 15, fontWeight: 800, marginBottom: 8 }}>{pkg.name}</h3>
              <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: 13, lineHeight: 1.65 }}>
                {pkg.detail}
              </p>
              <dl style={{ margin: '14px 0 0', display: 'grid', gap: 10 }}>
                <div>
                  <dt style={{ fontSize: 11, fontWeight: 750, color: 'var(--text-primary)', marginBottom: 3 }}>
                    {t.inventoryTitle}
                  </dt>
                  <dd style={{ margin: 0, color: 'var(--text-secondary)', fontSize: 12, lineHeight: 1.55 }}>
                    {pkg.inventory}
                  </dd>
                </div>
                <div>
                  <dt style={{ fontSize: 11, fontWeight: 750, color: 'var(--text-primary)', marginBottom: 3 }}>
                    {t.bestForTitle}
                  </dt>
                  <dd style={{ margin: 0, color: 'var(--text-secondary)', fontSize: 12, lineHeight: 1.55 }}>
                    {pkg.bestFor}
                  </dd>
                </div>
                <div>
                  <dt style={{ fontSize: 11, fontWeight: 750, color: 'var(--text-primary)', marginBottom: 3 }}>
                    {t.budgetTitle}
                  </dt>
                  <dd style={{ margin: 0, color: 'var(--text-secondary)', fontSize: 12, lineHeight: 1.55 }}>
                    {pkg.budget}
                  </dd>
                </div>
              </dl>
              <a
                href={packageContactUrls[pkg.id as PackageId]}
                onClick={() => trackMonetizationClick({
                  type: 'sponsor',
                  id: `advertise-package-${pkg.id}`,
                  category: category || undefined,
                  placement: source || 'advertise-page',
                })}
                style={{
                  display: 'inline-flex',
                  marginTop: 16,
                  padding: '9px 12px',
                  borderRadius: 8,
                  background: recommendedPackage.id === pkg.id ? 'var(--accent-blue)' : 'var(--bg-input)',
                  border: '1px solid var(--border-color)',
                  color: recommendedPackage.id === pkg.id ? '#fff' : 'var(--text-primary)',
                  fontSize: 12,
                  fontWeight: 750,
                  textDecoration: 'none',
                }}
              >
                {t.packageCta}
              </a>
            </div>
          ))}
        </div>
      </section>

      <section className="card" style={{ marginBottom: 24 }}>
        <h2 style={{ fontSize: 18, fontWeight: 750, marginBottom: 10 }}>{t.trackingTitle}</h2>
        <p style={{ margin: 0, color: 'var(--text-secondary)', lineHeight: 1.75 }}>
          {t.tracking}
        </p>
      </section>

      <section className="card">
        <h2 style={{ fontSize: 18, fontWeight: 750, marginBottom: 10 }}>{t.fitTitle}</h2>
        <p style={{ margin: 0, color: 'var(--text-secondary)', lineHeight: 1.75 }}>
          {t.fit}
        </p>
      </section>
    </div>
  );
}

export default function AdvertisePageClient(props: AdvertisePageClientProps) {
  return <AdvertiseContent {...props} />;
}
