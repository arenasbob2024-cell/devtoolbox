'use client';

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
    fitTitle: 'Best Fit',
    fit: 'Developer platforms, hosting, APIs, IDEs, security tools, database products, productivity tools, and technical education offers.',
    cta: 'Contact for sponsorship',
  },
  zh: {
    title: '在 DevToolBox 投放广告',
    intro: '触达正在格式化 JSON、测试 API、生成凭据、转换代码并解决实际开发问题的开发者用户。',
    audienceTitle: '受众',
    audience: ['正在使用实用工具的开发者', '来自搜索的高意图流量', '重视隐私且有复用价值的工作流页面'],
    optionsTitle: '合作方式',
    options: ['按工具分类投放侧边栏赞助位', '开发者指南博客赞助', '合作伙伴推荐位', '带点击追踪的定制测试活动'],
    fitTitle: '适合投放',
    fit: '开发者平台、云服务、API、IDE、安全工具、数据库产品、效率工具和技术教育类产品。',
    cta: '联系赞助合作',
  },
  ru: {
    title: 'Реклама на DevToolBox',
    intro: 'Охватите разработчиков, которые форматируют JSON, тестируют API, генерируют учетные данные, конвертируют код и решают практические задачи.',
    audienceTitle: 'Аудитория',
    audience: ['Разработчики, использующие практические инструменты', 'Высоконамеренный поисковый трафик', 'Страницы рабочих процессов с повторным использованием'],
    optionsTitle: 'Форматы сотрудничества',
    options: ['Спонсорство в боковой панели по категориям инструментов', 'Спонсорство статей и руководств для разработчиков', 'Партнерские рекомендательные размещения', 'Тестовые кампании с отслеживанием кликов'],
    fitTitle: 'Подходит для',
    fit: 'Платформы для разработчиков, хостинг, API, IDE, инструменты безопасности, базы данных, продукты для продуктивности и техническое обучение.',
    cta: 'Связаться по рекламе',
  },
};

export default function AdvertisePage() {
  const { lang } = useLang();
  const t = copy[lang as keyof typeof copy] || copy.en;
  const contactUrl = process.env.NEXT_PUBLIC_SPONSOR_CONTACT_URL
    || 'mailto:arenasbob.2024@gmail.com?subject=DevToolBox%20sponsorship%20inquiry';

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
            placement: 'advertise-page',
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

      <section className="card">
        <h2 style={{ fontSize: 18, fontWeight: 750, marginBottom: 10 }}>{t.fitTitle}</h2>
        <p style={{ margin: 0, color: 'var(--text-secondary)', lineHeight: 1.75 }}>
          {t.fit}
        </p>
      </section>
    </div>
  );
}
