'use client';

import { useEffect, useMemo, useRef, useState, type CSSProperties } from 'react';
import { trackMonetizationClick, trackMonetizationImpression } from '@/lib/analytics';
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
        price: 'Suggested test budget: US$299-US$799 per month.',
      },
      {
        id: 'article-sponsor',
        name: 'Article Sponsor',
        detail: 'Place your offer inside developer guides and comparison articles with tracked CTA clicks.',
        inventory: 'Article sponsor CTA, related tool block, and optional blog-list presence.',
        bestFor: 'API, hosting, IDE, database, security, and education offers.',
        budget: 'Best for content-led campaigns.',
        price: 'Suggested test budget: US$149-US$499 per article.',
      },
      {
        id: 'sitewide-sponsor',
        name: 'Sitewide Visibility',
        detail: 'Put your offer on high-visibility site surfaces including the homepage, mobile sticky sponsor bar, and global sponsor fallbacks.',
        inventory: 'Homepage inline sponsor/ad fallback, mobile sticky sponsor fallback, and selected sitewide fallback placements.',
        bestFor: 'Product launches, brand awareness, and broad developer-audience tests.',
        budget: 'Best for short launch windows and broad reach tests.',
        price: 'Suggested test budget: US$199-US$599 per week.',
      },
      {
        id: 'partner-test',
        name: 'Partner Test',
        detail: 'Run a short campaign across selected placements before committing to a larger buy.',
        inventory: 'One to three tracked placements chosen by category and traffic fit.',
        bestFor: 'New offers that need quick proof of intent.',
        budget: 'Best for small pilot budgets.',
        price: 'Suggested test budget: US$99-US$299 per test.',
      },
    ],
    inventoryTitle: 'Inventory',
    bestForTitle: 'Best for',
    budgetTitle: 'Budget fit',
    priceTitle: 'Starter budget',
    packageCta: 'Ask about this package',
    mediaKitTitle: 'Need details before contacting?',
    mediaKitDescription: 'Download the sponsorship media kit for package details, available inventory, measurement notes, and creative requirements.',
    mediaKitCta: 'Download media kit',
    recommendedTitle: 'Recommended starting point',
    recommendedFallback: 'Partner Test is the safest first buy when you want to compare placements before scaling.',
    trackingTitle: 'Measurement',
    tracking: 'Sponsor clicks and impressions are tracked by source, category, package, and placement so campaigns can be optimized after the first test window.',
    fitTitle: 'Best Fit',
    fit: 'Developer platforms, hosting, APIs, IDEs, security tools, database products, productivity tools, and technical education offers.',
    sourceTitle: 'Inquiry Source',
    sourceUnknown: 'Direct visit',
    cta: 'Contact for sponsorship',
    inquiryTitle: 'Send a sponsor brief',
    inquiryDescription: 'Share the product, package, budget, and timeline in one structured email so the first reply can focus on fit and inventory.',
    productLabel: 'Product or company',
    productPlaceholder: 'e.g. API monitoring platform',
    emailLabel: 'Work email',
    emailPlaceholder: 'name@company.com',
    websiteLabel: 'Website',
    websitePlaceholder: 'https://example.com',
    packageLabel: 'Package',
    budgetLabel: 'Budget range',
    budgetPlaceholder: 'Select a range',
    budgetOptions: ['US$99-US$299', 'US$149-US$499', 'US$199-US$599/week', 'US$299-US$799/month', 'Custom budget'],
    timelineLabel: 'Campaign timing',
    timelinePlaceholder: 'e.g. Launch in June, 4-week test',
    messageLabel: 'Campaign notes',
    messagePlaceholder: 'Target audience, preferred categories, countries, creative requirements, or tracking needs.',
    sendInquiryCta: 'Open email draft',
    copyBriefCta: 'Copy brief',
    submittedNote: 'If your email app did not open, copy the brief below and send it manually.',
    copiedNote: 'Sponsor brief copied.',
    copyErrorNote: 'Copy failed. Select the brief text and copy it manually.',
    briefPreviewTitle: 'Generated brief',
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
        price: '建议测试预算：每月 US$299-US$799。',
      },
      {
        id: 'article-sponsor',
        name: '文章赞助',
        detail: '在开发者指南和对比文章中展示产品，并追踪 CTA 点击。',
        inventory: '文章赞助 CTA、相关工具模块，以及可选博客列表曝光。',
        bestFor: 'API、云服务、IDE、数据库、安全和技术教育产品。',
        budget: '适合内容驱动型投放。',
        price: '建议测试预算：每篇 US$149-US$499。',
      },
      {
        id: 'sitewide-sponsor',
        name: '全站曝光',
        detail: '在首页、移动端 sticky 赞助条和全站高可见赞助兜底位展示产品。',
        inventory: '首页 inline 赞助/广告兜底、移动端 sticky 赞助兜底，以及精选全站兜底位置。',
        bestFor: '产品发布、品牌曝光和覆盖更广开发者流量的测试。',
        budget: '适合短期发布窗口和广覆盖测试。',
        price: '建议测试预算：每周 US$199-US$599。',
      },
      {
        id: 'partner-test',
        name: '合作测试',
        detail: '先在精选位置短期测试，再决定是否扩大预算。',
        inventory: '按分类和流量匹配选择 1-3 个可追踪位置。',
        bestFor: '需要快速验证意向的新产品或新 offer。',
        budget: '适合小预算试投。',
        price: '建议测试预算：每次 US$99-US$299。',
      },
    ],
    inventoryTitle: '可投放位置',
    bestForTitle: '适合',
    budgetTitle: '预算建议',
    priceTitle: '起投预算',
    packageCta: '咨询这个套餐',
    mediaKitTitle: '想先了解详细资料？',
    mediaKitDescription: '下载赞助媒体包，查看套餐、可投放位置、效果衡量方式和素材要求。',
    mediaKitCta: '下载媒体包',
    recommendedTitle: '推荐起投方案',
    recommendedFallback: '如果你想先比较不同位置的效果，合作测试是最稳妥的起投方式。',
    trackingTitle: '效果衡量',
    tracking: '赞助点击和曝光会按来源、分类、套餐和位置追踪，方便在首轮测试后优化投放。',
    fitTitle: '适合投放',
    fit: '开发者平台、云服务、API、IDE、安全工具、数据库产品、效率工具和技术教育类产品。',
    sourceTitle: '询盘来源',
    sourceUnknown: '直接访问',
    cta: '联系赞助合作',
    inquiryTitle: '发送赞助合作 brief',
    inquiryDescription: '一次性填写产品、套餐、预算和时间计划，第一封回复就可以直接讨论匹配度和可投放位置。',
    productLabel: '产品或公司',
    productPlaceholder: '例如：API 监控平台',
    emailLabel: '工作邮箱',
    emailPlaceholder: 'name@company.com',
    websiteLabel: '网站',
    websitePlaceholder: 'https://example.com',
    packageLabel: '套餐',
    budgetLabel: '预算范围',
    budgetPlaceholder: '选择预算范围',
    budgetOptions: ['US$99-US$299', 'US$149-US$499', '每周 US$199-US$599', '每月 US$299-US$799', '自定义预算'],
    timelineLabel: '投放时间',
    timelinePlaceholder: '例如：6 月上线，测试 4 周',
    messageLabel: '投放备注',
    messagePlaceholder: '目标受众、偏好的分类、国家/地区、素材要求或追踪需求。',
    sendInquiryCta: '打开邮件草稿',
    copyBriefCta: '复制 brief',
    submittedNote: '如果邮件应用没有打开，请复制下方 brief 后手动发送。',
    copiedNote: '赞助 brief 已复制。',
    copyErrorNote: '复制失败。请选中 brief 文本后手动复制。',
    briefPreviewTitle: '自动生成的 brief',
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
        price: 'Тестовый бюджет: US$299-US$799 в месяц.',
      },
      {
        id: 'article-sponsor',
        name: 'Спонсор статьи',
        detail: 'Разместите предложение в руководствах и сравнительных статьях с отслеживанием кликов.',
        inventory: 'CTA в статье, блок связанных инструментов и опциональное присутствие в списке блога.',
        bestFor: 'API, хостинг, IDE, базы данных, безопасность и обучение.',
        budget: 'Подходит для контентных кампаний.',
        price: 'Тестовый бюджет: US$149-US$499 за статью.',
      },
      {
        id: 'sitewide-sponsor',
        name: 'Широкая видимость',
        detail: 'Покажите оффер на заметных поверхностях сайта: главная страница, мобильная sticky-панель и глобальные спонсорские fallback-блоки.',
        inventory: 'Inline-блок на главной, мобильный sticky fallback и выбранные sitewide fallback-размещения.',
        bestFor: 'Запуски продуктов, узнаваемость бренда и широкие тесты на аудитории разработчиков.',
        budget: 'Подходит для коротких запусков и тестов с широким охватом.',
        price: 'Тестовый бюджет: US$199-US$599 в неделю.',
      },
      {
        id: 'partner-test',
        name: 'Тест партнерства',
        detail: 'Запустите короткую кампанию на выбранных позициях перед увеличением бюджета.',
        inventory: 'От одного до трех отслеживаемых размещений по категории и трафику.',
        bestFor: 'Новые предложения, которым нужно быстро проверить намерение.',
        budget: 'Подходит для небольших пилотных бюджетов.',
        price: 'Тестовый бюджет: US$99-US$299 за тест.',
      },
    ],
    inventoryTitle: 'Инвентарь',
    bestForTitle: 'Лучше всего для',
    budgetTitle: 'Бюджет',
    priceTitle: 'Стартовый бюджет',
    packageCta: 'Обсудить пакет',
    mediaKitTitle: 'Нужны детали перед обращением?',
    mediaKitDescription: 'Скачайте медиакит со спонсорскими пакетами, инвентарем, измерением и требованиями к материалам.',
    mediaKitCta: 'Скачать медиакит',
    recommendedTitle: 'Рекомендуемый старт',
    recommendedFallback: 'Partner Test - самый безопасный первый запуск, если нужно сравнить размещения перед масштабированием.',
    trackingTitle: 'Измерение',
    tracking: 'Клики и показы спонсорских блоков отслеживаются по источнику, категории, пакету и размещению, чтобы оптимизировать кампанию после первого теста.',
    fitTitle: 'Подходит для',
    fit: 'Платформы для разработчиков, хостинг, API, IDE, инструменты безопасности, базы данных, продукты для продуктивности и техническое обучение.',
    sourceTitle: 'Источник заявки',
    sourceUnknown: 'Прямой визит',
    cta: 'Связаться по рекламе',
    inquiryTitle: 'Отправить brief спонсора',
    inquiryDescription: 'Укажите продукт, пакет, бюджет и сроки в одном письме, чтобы первый ответ был уже о релевантности и доступном инвентаре.',
    productLabel: 'Продукт или компания',
    productPlaceholder: 'Например: платформа мониторинга API',
    emailLabel: 'Рабочая почта',
    emailPlaceholder: 'name@company.com',
    websiteLabel: 'Сайт',
    websitePlaceholder: 'https://example.com',
    packageLabel: 'Пакет',
    budgetLabel: 'Бюджет',
    budgetPlaceholder: 'Выберите диапазон',
    budgetOptions: ['US$99-US$299', 'US$149-US$499', 'US$199-US$599/неделя', 'US$299-US$799/месяц', 'Индивидуальный бюджет'],
    timelineLabel: 'Сроки кампании',
    timelinePlaceholder: 'Например: запуск в июне, тест 4 недели',
    messageLabel: 'Примечания',
    messagePlaceholder: 'Целевая аудитория, категории, страны, требования к креативам или трекингу.',
    sendInquiryCta: 'Открыть черновик email',
    copyBriefCta: 'Скопировать brief',
    submittedNote: 'Если почтовое приложение не открылось, скопируйте brief ниже и отправьте вручную.',
    copiedNote: 'Brief скопирован.',
    copyErrorNote: 'Не удалось скопировать. Выделите текст brief и скопируйте вручную.',
    briefPreviewTitle: 'Сгенерированный brief',
  },
};

type PackageId = 'category-sponsor' | 'article-sponsor' | 'sitewide-sponsor' | 'partner-test';

const packageIds: PackageId[] = ['category-sponsor', 'article-sponsor', 'sitewide-sponsor', 'partner-test'];

interface InquiryFormState {
  product: string;
  email: string;
  website: string;
  packageId: PackageId;
  budget: string;
  timeline: string;
  message: string;
}

const fieldStyle: CSSProperties = {
  width: '100%',
  padding: '10px 12px',
  borderRadius: 8,
  border: '1px solid var(--border-color)',
  background: 'var(--bg-input)',
  color: 'var(--text-primary)',
  fontSize: 13,
  outline: 'none',
};

const labelStyle: CSSProperties = {
  display: 'block',
  marginBottom: 6,
  color: 'var(--text-primary)',
  fontSize: 12,
  fontWeight: 750,
};

const actionButtonStyle: CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '10px 14px',
  borderRadius: 8,
  fontSize: 13,
  fontWeight: 750,
  cursor: 'pointer',
};

function buildInquiryBody({
  source,
  category,
  packageName,
  form,
}: {
  source: string;
  category: string;
  packageName: string;
  form: InquiryFormState;
}) {
  const lines = [
    'DevToolBox sponsorship inquiry',
    '',
    `Source: ${source || 'direct'}`,
    `Category: ${category || 'unknown'}`,
    `Package: ${packageName}`,
    `Budget: ${form.budget || 'Not selected'}`,
    `Timeline: ${form.timeline || 'Not provided'}`,
    '',
    `Product/company: ${form.product || 'Not provided'}`,
    `Email: ${form.email || 'Not provided'}`,
    `Website: ${form.website || 'Not provided'}`,
    '',
    'Campaign notes:',
    form.message || 'Not provided',
  ];

  return lines.join('\n');
}

function copyTextWithTextarea(text: string) {
  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.setAttribute('readonly', 'true');
  textarea.style.position = 'fixed';
  textarea.style.left = '-9999px';
  document.body.appendChild(textarea);
  textarea.select();
  const copied = document.execCommand('copy');
  document.body.removeChild(textarea);

  if (!copied) {
    return Promise.reject(new Error('copy failed'));
  }

  return Promise.resolve();
}

async function copyToClipboard(text: string) {
  if (navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return;
    } catch {
      // Fall through to the textarea copy path for browsers that expose
      // Clipboard API but reject it because of permissions or context.
    }
  }

  await copyTextWithTextarea(text);
}

function buildContactUrl(
  baseUrl: string,
  source: string,
  category: string,
  packageName?: string,
  bodyOverride?: string,
  inquiry?: InquiryFormState
) {
  const safeSource = source || 'direct';
  const safeCategory = category || 'unknown';
  const body = bodyOverride || `Source: ${safeSource}\nCategory: ${safeCategory}\nPackage: ${packageName || 'Not selected'}\n\nTell us about your product, target audience, preferred placements, and budget range.`;

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
  if (inquiry) {
    url.searchParams.set('product', inquiry.product);
    url.searchParams.set('email', inquiry.email);
    if (inquiry.website) url.searchParams.set('website', inquiry.website);
    if (inquiry.budget) url.searchParams.set('budget', inquiry.budget);
    if (inquiry.timeline) url.searchParams.set('timeline', inquiry.timeline);
    if (inquiry.message) url.searchParams.set('message', inquiry.message);
  }
  return url.toString();
}

function getRecommendedPackageId(source: string, category: string): PackageId {
  if (source.includes('blog')) {
    return 'article-sponsor';
  }

  if (
    source.includes('home') ||
    source.includes('mobile') ||
    source.includes('site-') ||
    source.includes('tools-index') ||
    category === 'home' ||
    category === 'mobile' ||
    category === 'site'
  ) {
    return 'sitewide-sponsor';
  }

  if (source.includes('partner') || source.includes('sidebar')) {
    return 'partner-test';
  }

  if (category && category !== 'home' && category !== 'tools-index' && category !== 'blog' && category !== 'site') {
    return 'category-sponsor';
  }

  return 'partner-test';
}

function normalizePackageId(value?: string): PackageId | undefined {
  return packageIds.includes(value as PackageId) ? value as PackageId : undefined;
}

interface AdvertisePageClientProps {
  source?: string;
  category?: string;
  packageId?: string;
}

function AdvertiseContent({
  source = '',
  category = '',
  packageId = '',
}: AdvertisePageClientProps) {
  const { lang } = useLang();
  const t = copy[lang as keyof typeof copy] || copy.en;
  const heroRef = useRef<HTMLElement | null>(null);
  const packagesRef = useRef<HTMLElement | null>(null);
  const mediaKitRef = useRef<HTMLElement | null>(null);
  const inquiryRef = useRef<HTMLElement | null>(null);
  const heroTrackedRef = useRef(false);
  const packagesTrackedRef = useRef(false);
  const mediaKitTrackedRef = useRef(false);
  const inquiryTrackedRef = useRef(false);
  const contactBaseUrl = process.env.NEXT_PUBLIC_SPONSOR_CONTACT_URL
    || 'mailto:arenasbob.2024@gmail.com?subject=DevToolBox%20sponsorship%20inquiry';
  const recommendedPackageId = normalizePackageId(packageId) || getRecommendedPackageId(source, category);
  const recommendedPackage = t.packages.find(pkg => pkg.id === recommendedPackageId)
    || t.packages.find(pkg => pkg.id === 'partner-test')
    || t.packages[t.packages.length - 1];
  const [formStatus, setFormStatus] = useState<'idle' | 'submitted' | 'copied' | 'copy-error'>('idle');
  const [formState, setFormState] = useState<InquiryFormState>(() => ({
    product: '',
    email: '',
    website: '',
    packageId: recommendedPackageId,
    budget: '',
    timeline: '',
    message: '',
  }));
  const selectedPackage = t.packages.find(pkg => pkg.id === formState.packageId) || recommendedPackage;
  const inquiryBody = useMemo(
    () => buildInquiryBody({
      source,
      category,
      packageName: selectedPackage.name,
      form: formState,
    }),
    [category, formState, selectedPackage.name, source]
  );
  const contactUrl = useMemo(
    () => buildContactUrl(contactBaseUrl, source, category, recommendedPackage.name),
    [contactBaseUrl, category, recommendedPackage.name, source]
  );
  const inquiryContactUrl = useMemo(
    () => buildContactUrl(contactBaseUrl, source, category, selectedPackage.name, inquiryBody, formState),
    [contactBaseUrl, category, formState, inquiryBody, selectedPackage.name, source]
  );

  const packageContactUrls = useMemo(
    () => Object.fromEntries(
      t.packages.map(pkg => [pkg.id, buildContactUrl(contactBaseUrl, source, category, pkg.name)])
    ),
    [contactBaseUrl, category, source, t.packages]
  ) as Record<PackageId, string>;

  const updateFormField = <K extends keyof InquiryFormState>(field: K, value: InquiryFormState[K]) => {
    setFormState(prev => ({
      ...prev,
      [field]: value,
    }));
    if (formStatus !== 'idle') {
      setFormStatus('idle');
    }
  };

  const handleInquirySubmit = (event: React.FormEvent) => {
    event.preventDefault();
    trackMonetizationClick({
      type: 'sponsor',
      id: 'advertise-inquiry-form-submit',
      category: category || undefined,
      placement: source || 'advertise-page',
    });
    setFormStatus('submitted');
    window.location.href = inquiryContactUrl;
  };

  const handleCopyBrief = async () => {
    try {
      await copyToClipboard(inquiryBody);
      trackMonetizationClick({
        type: 'sponsor',
        id: 'advertise-inquiry-copy',
        category: category || undefined,
        placement: source || 'advertise-page',
      });
      setFormStatus('copied');
    } catch {
      setFormStatus('copy-error');
    }
  };

  useEffect(() => {
    const element = heroRef.current;
    if (!element || heroTrackedRef.current) return;

    const track = () => {
      if (heroTrackedRef.current) return;
      heroTrackedRef.current = true;
      trackMonetizationImpression({
        type: 'sponsor',
        id: 'advertise-contact',
        category: category || undefined,
        placement: source || 'advertise-page',
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
  }, [category, source]);

  useEffect(() => {
    const element = packagesRef.current;
    if (!element || packagesTrackedRef.current) return;

    const track = () => {
      if (packagesTrackedRef.current) return;
      packagesTrackedRef.current = true;
      t.packages.forEach((pkg) => {
        trackMonetizationImpression({
          type: 'sponsor',
          id: `advertise-package-${pkg.id}`,
          category: category || undefined,
          placement: source || 'advertise-page',
        });
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
  }, [category, source, t.packages]);

  useEffect(() => {
    const element = mediaKitRef.current;
    if (!element || mediaKitTrackedRef.current) return;

    const track = () => {
      if (mediaKitTrackedRef.current) return;
      mediaKitTrackedRef.current = true;
      trackMonetizationImpression({
        type: 'sponsor',
        id: 'advertise-media-kit',
        category: category || undefined,
        placement: source || 'advertise-page',
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
  }, [category, source]);

  useEffect(() => {
    const element = inquiryRef.current;
    if (!element || inquiryTrackedRef.current) return;

    const track = () => {
      if (inquiryTrackedRef.current) return;
      inquiryTrackedRef.current = true;
      trackMonetizationImpression({
        type: 'sponsor',
        id: 'advertise-inquiry-form',
        category: category || undefined,
        placement: source || 'advertise-page',
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
  }, [category, source]);

  return (
    <div style={{ maxWidth: 920, margin: '0 auto', padding: '48px 24px' }}>
      <section ref={heroRef} style={{ marginBottom: 34 }}>
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

      <section
        ref={inquiryRef}
        className="card"
        style={{
          marginBottom: 24,
          padding: 18,
          borderColor: 'rgba(16,185,129,0.35)',
          background: 'linear-gradient(135deg, rgba(16,185,129,0.08), rgba(59,130,246,0.06))',
        }}
      >
        <div style={{ marginBottom: 16 }}>
          <h2 style={{ fontSize: 20, fontWeight: 800, marginBottom: 8 }}>
            {t.inquiryTitle}
          </h2>
          <p style={{ margin: 0, color: 'var(--text-secondary)', lineHeight: 1.7 }}>
            {t.inquiryDescription}
          </p>
        </div>

        <form onSubmit={handleInquirySubmit} style={{ display: 'grid', gap: 14 }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: 14,
          }}>
            <label>
              <span style={labelStyle}>{t.productLabel}</span>
              <input
                type="text"
                required
                value={formState.product}
                onChange={event => updateFormField('product', event.target.value)}
                placeholder={t.productPlaceholder}
                style={fieldStyle}
              />
            </label>
            <label>
              <span style={labelStyle}>{t.emailLabel}</span>
              <input
                type="email"
                required
                value={formState.email}
                onChange={event => updateFormField('email', event.target.value)}
                placeholder={t.emailPlaceholder}
                style={fieldStyle}
              />
            </label>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: 14,
          }}>
            <label>
              <span style={labelStyle}>{t.websiteLabel}</span>
              <input
                type="url"
                value={formState.website}
                onChange={event => updateFormField('website', event.target.value)}
                placeholder={t.websitePlaceholder}
                style={fieldStyle}
              />
            </label>
            <label>
              <span style={labelStyle}>{t.packageLabel}</span>
              <select
                value={formState.packageId}
                onChange={event => updateFormField('packageId', event.target.value as PackageId)}
                style={fieldStyle}
              >
                {t.packages.map(pkg => (
                  <option key={pkg.id} value={pkg.id}>{pkg.name}</option>
                ))}
              </select>
            </label>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: 14,
          }}>
            <label>
              <span style={labelStyle}>{t.budgetLabel}</span>
              <select
                required
                value={formState.budget}
                onChange={event => updateFormField('budget', event.target.value)}
                style={fieldStyle}
              >
                <option value="">{t.budgetPlaceholder}</option>
                {t.budgetOptions.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </label>
            <label>
              <span style={labelStyle}>{t.timelineLabel}</span>
              <input
                type="text"
                value={formState.timeline}
                onChange={event => updateFormField('timeline', event.target.value)}
                placeholder={t.timelinePlaceholder}
                style={fieldStyle}
              />
            </label>
          </div>

          <label>
            <span style={labelStyle}>{t.messageLabel}</span>
            <textarea
              value={formState.message}
              onChange={event => updateFormField('message', event.target.value)}
              placeholder={t.messagePlaceholder}
              style={{ ...fieldStyle, minHeight: 110, resize: 'vertical', fontFamily: 'var(--font-inter), sans-serif' }}
            />
          </label>

          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <button
              type="submit"
              style={{
                ...actionButtonStyle,
                border: 'none',
                background: 'linear-gradient(135deg, var(--accent-blue), var(--accent-purple))',
                color: '#fff',
              }}
            >
              {t.sendInquiryCta}
            </button>
            <button
              type="button"
              onClick={handleCopyBrief}
              style={{
                ...actionButtonStyle,
                border: '1px solid var(--border-color)',
                background: 'var(--bg-input)',
                color: 'var(--text-primary)',
              }}
            >
              {t.copyBriefCta}
            </button>
          </div>

          {formStatus !== 'idle' && (
            <p style={{
              margin: 0,
              color: formStatus === 'copy-error' ? 'var(--accent-rose)' : 'var(--accent-emerald)',
              fontSize: 12,
              fontWeight: 700,
            }}>
              {formStatus === 'submitted' && t.submittedNote}
              {formStatus === 'copied' && t.copiedNote}
              {formStatus === 'copy-error' && t.copyErrorNote}
            </p>
          )}

          <div>
            <p style={{ ...labelStyle, marginBottom: 8 }}>{t.briefPreviewTitle}</p>
            <textarea
              readOnly
              value={inquiryBody}
              style={{ ...fieldStyle, minHeight: 170, resize: 'vertical' }}
            />
          </div>
        </form>
      </section>

      <section
        ref={mediaKitRef}
        className="card"
        style={{
          marginBottom: 24,
          padding: 18,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 16,
          flexWrap: 'wrap',
        }}
      >
        <div style={{ minWidth: 240, flex: '1 1 360px' }}>
          <h2 style={{ fontSize: 18, fontWeight: 800, marginBottom: 8 }}>
            {t.mediaKitTitle}
          </h2>
          <p style={{ margin: 0, color: 'var(--text-secondary)', lineHeight: 1.7 }}>
            {t.mediaKitDescription}
          </p>
        </div>
        <a
          href="/devtoolbox-media-kit.md"
          download
          onClick={() => trackMonetizationClick({
            type: 'sponsor',
            id: 'advertise-media-kit-download',
            category: category || undefined,
            placement: source || 'advertise-page',
          })}
          style={{
            display: 'inline-flex',
            padding: '10px 14px',
            borderRadius: 8,
            background: 'var(--bg-input)',
            border: '1px solid var(--border-color)',
            color: 'var(--text-primary)',
            fontSize: 13,
            fontWeight: 750,
            textDecoration: 'none',
            whiteSpace: 'nowrap',
          }}
        >
          {t.mediaKitCta}
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

      <section ref={packagesRef} style={{ marginBottom: 24 }}>
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
                <div>
                  <dt style={{ fontSize: 11, fontWeight: 750, color: 'var(--text-primary)', marginBottom: 3 }}>
                    {t.priceTitle}
                  </dt>
                  <dd style={{ margin: 0, color: 'var(--text-secondary)', fontSize: 12, lineHeight: 1.55 }}>
                    {pkg.price}
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
