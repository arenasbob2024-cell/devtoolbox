'use client';

import React from 'react';

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'Meilisearch vs Algolia: Search Engine Comparison',
    intro: 'Meilisearch and Algolia are both search-as-a-service platforms offering fast, typo-tolerant search experiences. While Algolia pioneered the search-as-a-service market, Meilisearch emerged as an open-source alternative with similar capabilities. This comparison examines their features, pricing, and ideal use cases.',
    
    tldrTitle: 'TL;DR - Quick Summary',
    tldrContent: 'Choose Algolia for enterprise features, extensive integrations, and managed reliability. Choose Meilisearch for cost-effective open-source solution, self-hosting control, and similar search quality. Meilisearch offers 90% of Algolia features at a fraction of the cost, but Algolia has more mature enterprise tooling.',
    
    takeawaysTitle: 'Key Takeaways',
    takeaway1: 'Algolia is proprietary; Meilisearch is open-source',
    takeaway2: 'Both offer typo-tolerant, instant search',
    takeaway3: 'Algolia has more integrations and enterprise features',
    takeaway4: 'Meilisearch significantly more cost-effective',
    takeaway5: 'Both support multi-tenant and faceted search',
    takeaway6: 'Algolia has larger index size limits',
    
    whatIsMeilisearchTitle: 'What is Meilisearch?',
    whatIsMeilisearchContent: 'Meilisearch is an open-source search engine written in Rust. Released in 2018, it provides typo-tolerant search, filtering, and ranking out of the box. Meilisearch focuses on simplicity and developer experience, offering a self-hosted solution with optional cloud hosting through Meilisearch Cloud.',
    
    whatIsAlgoliaTitle: 'What is Algolia?',
    whatIsAlgoliaContent: 'Algolia is a proprietary search-as-a-service platform founded in 2012. It pioneered instant search, typo tolerance, and relevance tuning. Algolia offers comprehensive APIs, extensive integrations, and enterprise features like AI-powered search and personalization. It is widely used by major e-commerce and SaaS companies.',
    
    performanceTitle: 'Performance & Features',
    performanceIntro: 'Performance and feature comparison:',
    
    featuresTitle: 'Feature Comparison',
    featuresIntro: 'Detailed feature matrix:',
    
    codeExampleTitle: 'Implementation Examples',
    codeExampleIntro: 'Search integration code:',
    
    meilisearchExampleTitle: 'Meilisearch Integration',
    algoliaExampleTitle: 'Algolia Integration',
    
    dataSourceTitle: 'Search Capabilities',
    dataSourceIntro: 'Search features and relevance:',
    
    alertingTitle: 'Pricing & Limits',
    alertingIntro: 'Pricing models and limitations:',
    
    useCasesTitle: 'Best Use Cases',
    meilisearchBestFor: 'Meilisearch is Best For:',
    algoliaBestFor: 'Algolia is Best For:',
    
    conclusionTitle: 'Conclusion',
    conclusionContent: 'Meilisearch and Algolia serve similar markets with different approaches. Algolia is the mature enterprise choice with extensive features, AI capabilities, and managed reliability. Meilisearch offers similar search quality at dramatically lower cost, ideal for teams wanting open-source and self-hosting control. For startups and cost-conscious projects, Meilisearch is compelling. For enterprises needing SLA guarantees and advanced features, Algolia remains the leader.',
    
    faq1q: 'Is Meilisearch as fast as Algolia?',
    faq1a: 'Both offer sub-50ms search response times. Algolia has larger global infrastructure for edge caching. Meilisearch performance is excellent but depends on your hosting. For most use cases, users will not notice performance differences.',
    
    faq2q: 'Can I migrate from Algolia to Meilisearch?',
    faq2a: 'Yes, migration is straightforward. Meilisearch has similar API concepts and supports data import. The main differences are in advanced features and query syntax. Most core search functionality can be migrated with minimal changes.',
    
    faq3q: 'What about typo tolerance?',
    faq3a: 'Both offer excellent typo tolerance out of the box. Algolia has more tuning options for typo sensitivity. Meilisearch provides default typo tolerance that works well for most cases. Both handle common typos effectively.',
    
    faq4q: 'Which has better documentation?',
    faq4a: 'Both have excellent documentation. Algolia has more comprehensive guides and tutorials accumulated over years. Meilisearch documentation is clear and developer-friendly but covers fewer edge cases. Both are well-documented.',
    
    faq5q: 'How do they handle large datasets?',
    faq5a: 'Algolia handles billions of records with distributed indexing. Meilisearch self-hosted is limited by your infrastructure. For very large datasets (100M+ records), Algolia has advantages. Meilisearch works well for datasets up to tens of millions of records.',
    
    faq6q: 'What about AI and semantic search?',
    faq6a: 'Algolia has built-in AI features including semantic search, neural search, and AI-powered ranking. Meilisearch has basic vector search support but AI features are more limited. For advanced AI search, Algolia is ahead.',
    
    faq7q: 'Which has better client libraries?',
    faq7a: 'Both offer official client libraries for major languages (JavaScript, Python, Ruby, PHP, etc.). Algolia has more comprehensive SDK support. Meilisearch covers main languages well. Both integrate easily with frontend frameworks.',
    
    faq8q: 'Can I self-host Algolia?',
    faq8a: 'No, Algolia is a managed service only. For self-hosting, Meilisearch or Elasticsearch are alternatives. Algolia does not offer an on-premise version. This is a key differentiator for teams requiring data sovereignty.',
    
    tryTools: 'Try Our Related Tools',
  },
  zh: {
    title: 'Meilisearch vs Algolia：搜索引擎对比',
    intro: 'Meilisearch 和 Algolia 都是搜索即服务平台，提供快速、容错的搜索体验。虽然 Algolia 开创了搜索即服务市场，但 Meilisearch 作为具有类似能力的开源替代方案出现。本比较考察它们的功能、定价和理想用例。',
    
    tldrTitle: 'TL;DR - 快速总结',
    tldrContent: '为企业功能、广泛集成和托管可靠性选择 Algolia。为成本效益的开源解决方案、自托管控制和类似的搜索质量选择 Meilisearch。Meilisearch 以 Algolia 一小部分的成本提供 90% 的功能，但 Algolia 拥有更成熟的企业工具。',
    
    takeawaysTitle: '核心要点',
    takeaway1: 'Algolia 是专有的；Meilisearch 是开源的',
    takeaway2: '两者都提供容错、即时搜索',
    takeaway3: 'Algolia 有更多集成和企业功能',
    takeaway4: 'Meilisearch 显著更具成本效益',
    takeaway5: '两者都支持多租户和分面搜索',
    takeaway6: 'Algolia 有更大的索引大小限制',
    
    whatIsMeilisearchTitle: '什么是 Meilisearch？',
    whatIsMeilisearchContent: 'Meilisearch 是一个用 Rust 编写的开源搜索引擎。2018 年发布，它提供开箱即用的容错搜索、过滤和排名。Meilisearch 专注于简单性和开发者体验，提供自托管解决方案和通过 Meilisearch Cloud 的可选云托管。',
    
    whatIsAlgoliaTitle: '什么是 Algolia？',
    whatIsAlgoliaContent: 'Algolia 是一个成立于 2012 年的专有搜索即服务平台。它开创了即时搜索、容错和相关性调整。Algolia 提供全面的 API、广泛的集成和企业功能，如 AI 驱动的搜索和个性化。它被主要电子商务和 SaaS 公司广泛使用。',
    
    performanceTitle: '性能与功能',
    performanceIntro: '性能和功能比较：',
    
    featuresTitle: '功能对比',
    featuresIntro: '详细功能矩阵：',
    
    codeExampleTitle: '实现示例',
    codeExampleIntro: '搜索集成代码：',
    
    meilisearchExampleTitle: 'Meilisearch 集成',
    algoliaExampleTitle: 'Algolia 集成',
    
    dataSourceTitle: '搜索能力',
    dataSourceIntro: '搜索功能和相关件：',
    
    alertingTitle: '定价与限制',
    alertingIntro: '定价模型和限制：',
    
    useCasesTitle: '最佳用例',
    meilisearchBestFor: 'Meilisearch 最适合：',
    algoliaBestFor: 'Algolia 最适合：',
    
    conclusionTitle: '结论',
    conclusionContent: 'Meilisearch 和 Algolia 以不同的方法服务于类似的市场。Algolia 是成熟的企业选择，具有广泛的功能、AI 能力和托管可靠性。Meilisearch 以显著更低的成本提供类似的搜索质量，非常适合想要开源和自托管控制的团队。对于初创公司和成本敏感项目，Meilisearch 很有吸引力。对于需要 SLA 保证和高级功能的企业，Algolia 仍然是领导者。',
    
    faq1q: 'Meilisearch 和 Algolia 一样快吗？',
    faq1a: '两者都提供低于 50ms 的搜索响应时间。Algolia 拥有更大的全球基础设施用于边缘缓存。Meilisearch 性能优秀但取决于你的托管。对于大多数用例，用户不会注意到性能差异。',
    
    faq2q: '我可以从 Algolia 迁移到 Meilisearch 吗？',
    faq2a: '是的，迁移很简单。Meilisearch 有类似的 API 概念并支持数据导入。主要区别在于高级功能和查询语法。大多数核心搜索功能可以以最小的更改迁移。',
    
    faq3q: '容错性怎么样？',
    faq3a: '两者都提供开箱即用的优秀容错性。Algolia 有更多的容错敏感度调整选项。Meilisearch 提供适用于大多数情况的默认容错性。两者都能有效地处理常见拼写错误。',
    
    faq4q: '哪个有更好的文档？',
    faq4a: '两者都有优秀的文档。Algolia 多年来积累了更全面的指南和教程。Meilisearch 文档清晰且对开发者友好，但涵盖的边缘情况较少。两者都有良好的文档。',
    
    faq5q: '它们如何处理大型数据集？',
    faq5a: 'Algolia 通过分布式索引处理数十亿条记录。Meilisearch 自托管受限于你的基础设施。对于非常大的数据集（1 亿+ 条记录），Algolia 有优势。Meilisearch 适用于多达数千万条记录的数据集。',
    
    faq6q: 'AI 和语义搜索怎么样？',
    faq6a: 'Algolia 具有内置 AI 功能，包括语义搜索、神经搜索和 AI 驱动的排名。Meilisearch 有基本的向量搜索支持，但 AI 功能更有限。对于高级 AI 搜索，Algolia 领先。',
    
    faq7q: '哪个有更好的客户端库？',
    faq7a: '两者都为主要语言（JavaScript、Python、Ruby、PHP 等）提供官方客户端库。Algolia 有更全面的 SDK 支持。Meilisearch 很好地覆盖了主要语言。两者都与前端框架轻松集成。',
    
    faq8q: '我可以自托管 Algolia 吗？',
    faq8a: '不，Algolia 仅是托管服务。对于自托管，Meilisearch 或 Elasticsearch 是替代方案。Algolia 不提供本地版本。这是需要数据主权的团队的关键区别因素。',
    
    tryTools: '试试我们的相关工具',
  },
};

export default function MeilisearchVsAlgolia({ lang }: { lang: string }) {
  const ct = translations[lang] || translations['en'];
  const isZh = lang === 'zh';

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: ct.faq1q, acceptedAnswer: { '@type': 'Answer', text: ct.faq1a } },
      { '@type': 'Question', name: ct.faq2q, acceptedAnswer: { '@type': 'Answer', text: ct.faq2a } },
      { '@type': 'Question', name: ct.faq3q, acceptedAnswer: { '@type': 'Answer', text: ct.faq3a } },
      { '@type': 'Question', name: ct.faq4q, acceptedAnswer: { '@type': 'Answer', text: ct.faq4a } },
      { '@type': 'Question', name: ct.faq5q, acceptedAnswer: { '@type': 'Answer', text: ct.faq5a } },
      { '@type': 'Question', name: ct.faq6q, acceptedAnswer: { '@type': 'Answer', text: ct.faq6a } },
      { '@type': 'Question', name: ct.faq7q, acceptedAnswer: { '@type': 'Answer', text: ct.faq7a } },
      { '@type': 'Question', name: ct.faq8q, acceptedAnswer: { '@type': 'Answer', text: ct.faq8a } },
    ],
  };

  const codeStyle: React.CSSProperties = { background: 'var(--bg-input)', border: '1px solid var(--border-color)', borderRadius: 8, padding: '16px 20px', overflowX: 'auto', fontSize: 13, lineHeight: 1.8 };
  const thStyle: React.CSSProperties = { background: 'var(--bg-input)', border: '1px solid var(--border-color)', padding: '10px 14px', textAlign: 'left', fontWeight: 700 };
  const tdStyle: React.CSSProperties = { border: '1px solid var(--border-color)', padding: '10px 14px', fontSize: 13 };
  const h2Style: React.CSSProperties = { fontSize: 22, fontWeight: 700, marginTop: 40, marginBottom: 16, color: 'var(--text-primary)' };
  const h3Style: React.CSSProperties = { fontSize: 18, fontWeight: 600, marginTop: 24, marginBottom: 12, color: '#3b82f6' };
  const pStyle: React.CSSProperties = { lineHeight: 1.8, color: 'var(--text-secondary)', marginBottom: 16 };
  const boxStyle: React.CSSProperties = { padding: 20, background: 'var(--bg-input)', borderRadius: 12, border: '1px solid var(--border-color)', marginBottom: 24 };

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <p style={{ fontSize: 16, lineHeight: 1.8, color: 'var(--text-secondary)', marginBottom: 30 }}>{ct.intro}</p>

      <div style={{ ...boxStyle, borderLeft: '4px solid #3b82f6', background: 'linear-gradient(135deg, rgba(59,130,246,0.1), rgba(139,92,246,0.1))' }}>
        <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12, color: '#3b82f6' }}>{ct.tldrTitle}</h3>
        <p style={{ lineHeight: 1.8, color: 'var(--text-secondary)', margin: 0 }}>{ct.tldrContent}</p>
      </div>

      <h2 style={h2Style}>{ct.takeawaysTitle}</h2>
      <div style={{ ...boxStyle, borderLeft: '4px solid #22c55e' }}>
        <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0 }}>
          <li>{ct.takeaway1}</li>
          <li>{ct.takeaway2}</li>
          <li>{ct.takeaway3}</li>
          <li>{ct.takeaway4}</li>
          <li>{ct.takeaway5}</li>
          <li>{ct.takeaway6}</li>
        </ul>
      </div>

      <h2 style={h2Style}>{isZh ? '概述' : 'Overview'}</h2>

      <h3 style={h3Style}>{ct.whatIsMeilisearchTitle}</h3>
      <p style={pStyle}>{ct.whatIsMeilisearchContent}</p>

      <h3 style={h3Style}>{ct.whatIsAlgoliaTitle}</h3>
      <p style={pStyle}>{ct.whatIsAlgoliaContent}</p>

      <h2 style={h2Style}>{ct.performanceTitle}</h2>
      <p style={pStyle}>{ct.performanceIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '指标' : 'Metric'}</th>
              <th style={thStyle}>Meilisearch</th>
              <th style={thStyle}>Algolia</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '响应时间' : 'Response Time', '< 50ms', '< 50ms'],
              [isZh ? '编程语言' : 'Language', 'Rust', isZh ? '专有（C++/Go）' : 'Proprietary (C++/Go)'],
              [isZh ? '许可证' : 'License', 'MIT (开源)', isZh ? '专有' : 'Proprietary'],
              [isZh ? '托管选项' : 'Hosting', isZh ? '自托管 + 云' : 'Self-hosted + Cloud', isZh ? '仅托管' : 'Managed only'],
              [isZh ? '全球 CDN' : 'Global CDN', isZh ? '云版本' : 'Cloud version', isZh ? '原生' : 'Native'],
              [isZh ? '最大索引大小' : 'Max Index Size', isZh ? '取决于硬件' : 'Hardware dependent', '100GB+ per index'],
            ].map(([feature, meilisearch, algolia], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{feature}</td>
                <td style={tdStyle}>{meilisearch}</td>
                <td style={tdStyle}>{algolia}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={h2Style}>{ct.featuresTitle}</h2>
      <p style={pStyle}>{ct.featuresIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '特性' : 'Feature'}</th>
              <th style={thStyle}>Meilisearch</th>
              <th style={thStyle}>Algolia</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '容错搜索' : 'Typo Tolerance', isZh ? '优秀' : 'Excellent', isZh ? '优秀' : 'Excellent'],
              [isZh ? '分面搜索' : 'Faceted Search', isZh ? '支持' : 'Supported', isZh ? '支持' : 'Supported'],
              [isZh ? '多租户' : 'Multi-tenancy', isZh ? '支持' : 'Supported', isZh ? '支持' : 'Supported'],
              [isZh ? 'AI/语义搜索' : 'AI/Semantic Search', isZh ? '基本' : 'Basic', isZh ? '高级' : 'Advanced'],
              [isZh ? '个性化' : 'Personalization', isZh ? '有限' : 'Limited', isZh ? '强大' : 'Powerful'],
              [isZh ? 'A/B 测试' : 'A/B Testing', isZh ? '无' : 'No', isZh ? '内置' : 'Built-in'],
              [isZh ? '分析' : 'Analytics', isZh ? '基础' : 'Basic', isZh ? '高级' : 'Advanced'],
              [isZh ? '同义词' : 'Synonyms', isZh ? '支持' : 'Supported', isZh ? '支持' : 'Supported'],
            ].map(([cap, meilisearch, algolia], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{cap}</td>
                <td style={tdStyle}>{meilisearch}</td>
                <td style={tdStyle}>{algolia}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={h2Style}>{ct.codeExampleTitle}</h2>
      <p style={pStyle}>{ct.codeExampleIntro}</p>

      <h3 style={{ ...h3Style, color: '#f46800' }}>{ct.meilisearchExampleTitle}</h3>
      <pre style={codeStyle}><code>{`// Meilisearch Setup (JavaScript)
import { MeiliSearch } from 'meilisearch';

const client = new MeiliSearch({
  host: 'http://localhost:7700',
  apiKey: 'masterKey',
});

// Create index
const index = client.index('products');

// Add documents
await index.addDocuments([
  {
    id: 1,
    name: 'iPhone 15 Pro',
    description: 'Latest Apple smartphone',
    category: 'Electronics',
    price: 999,
    brand: 'Apple'
  },
  {
    id: 2,
    name: 'Samsung Galaxy S24',
    description: 'Android flagship phone',
    category: 'Electronics',
    price: 899,
    brand: 'Samsung'
  }
]);

// Configure searchable attributes
await index.updateSearchableAttributes([
  'name',
  'description',
  'brand',
  'category'
]);

// Configure ranking rules
await index.updateRankingRules([
  'words',
  'typo',
  'proximity',
  'attribute',
  'sort',
  'exactness',
  'price:asc'
]);

// Search with filters and facets
const searchResults = await index.search('phone', {
  filter: ['category = Electronics', 'price < 1000'],
  facets: ['brand', 'category'],
  limit: 20,
  offset: 0,
});

// Typo-tolerant search
const results = await index.search('iphne'); // Finds iPhone

// Pagination and highlighting
const paginatedResults = await index.search('galaxy', {
  page: 1,
  hitsPerPage: 10,
  attributesToHighlight: ['name', 'description'],
  highlightPreTag: '<mark>',
  highlightPostTag: '</mark>',
});`}</code></pre>

      <h3 style={{ ...h3Style, color: '#00bfb3' }}>{ct.algoliaExampleTitle}</h3>
      <pre style={codeStyle}><code>{`// Algolia Setup (JavaScript)
import algoliasearch from 'algoliasearch';

const client = algoliasearch('APP_ID', 'API_KEY');
const index = client.initIndex('products');

// Add documents
await index.saveObjects([
  {
    objectID: '1',
    name: 'iPhone 15 Pro',
    description: 'Latest Apple smartphone',
    category: 'Electronics',
    price: 999,
    brand: 'Apple'
  },
  {
    objectID: '2',
    name: 'Samsung Galaxy S24',
    description: 'Android flagship phone',
    category: 'Electronics',
    price: 899,
    brand: 'Samsung'
  }
]);

// Configure index settings
await index.setSettings({
  searchableAttributes: [
    'name',
    'description',
    'brand',
    'category'
  ],
  ranking: [
    'typo',
    'geo',
    'words',
    'filters',
    'proximity',
    'attribute',
    'exact',
    'custom'
  ],
  customRanking: ['desc(price)'],
  attributesForFaceting: [
    'brand',
    'category',
    'price'
  ]
});

// Search with facets and filters
const { hits, facets } = await index.search('phone', {
  filters: 'category:Electronics AND price < 1000',
  facets: ['brand', 'category'],
  hitsPerPage: 20,
  page: 0,
});

// Typo-tolerant search (configurable)
const results = await index.search('iphne', {
  typoTolerance: true,
  minProximity: 1,
});

// Instant search with analytics
const searchResults = await index.search('galaxy', {
  analytics: true,
  clickAnalytics: true,
  attributesToHighlight: ['name', 'description'],
  highlightPreTag: '<mark>',
  highlightPostTag: '</mark>',
});

// Personalization (Algolia feature)
const personalizedResults = await index.search('phone', {
  userToken: 'user-123',
  enablePersonalization: true,
});`}</code></pre>

      <h2 style={h2Style}>{ct.dataSourceTitle}</h2>
      <p style={pStyle}>{ct.dataSourceIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '能力' : 'Capability'}</th>
              <th style={thStyle}>Meilisearch</th>
              <th style={thStyle}>Algolia</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '相关性调整' : 'Relevance Tuning', isZh ? '排名规则' : 'Ranking rules', isZh ? '排名 + 自定义' : 'Ranking + custom'],
              [isZh ? '过滤器' : 'Filters', isZh ? '表达式过滤' : 'Filter expressions', isZh ? '高级过滤' : 'Advanced filters'],
              [isZh ? '地理搜索' : 'Geo Search', isZh ? '支持' : 'Supported', isZh ? '支持' : 'Supported'],
              [isZh ? '排序' : 'Sorting', isZh ? '可配置' : 'Configurable', isZh ? '可配置 + 虚拟索引' : 'Configurable + virtual indices'],
              [isZh ? '高亮' : 'Highlighting', isZh ? '自动' : 'Automatic', isZh ? '自动 + 代码片段' : 'Automatic + snippets'],
              [isZh ? '推荐' : 'Recommendations', isZh ? '无' : 'No', isZh ? '有（AI 驱动）' : 'Yes (AI-powered)'],
            ].map(([cat, meilisearch, algolia], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{cat}</td>
                <td style={tdStyle}>{meilisearch}</td>
                <td style={tdStyle}>{algolia}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={h2Style}>{ct.alertingTitle}</h2>
      <p style={pStyle}>{ct.alertingIntro}</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
        <div style={{ padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderLeft: '4px solid #f46800' }}>
          <strong style={{ color: '#f46800' }}>Meilisearch Pricing</strong>
          <p style={{ margin: '6px 0 0', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            {isZh ? '开源免费（MIT 许可），Meilisearch Cloud 起价 $30/月（10万条记录），无请求成本，仅按索引大小付费，自我托管零成本（仅基础设施成本）。' : 'Free and open-source (MIT license), Meilisearch Cloud starts at $30/month (100K records), no request costs, pay only for index size, self-hosting is $0 (infrastructure costs only).'}
          </p>
        </div>
        <div style={{ padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderLeft: '4px solid #00bfb3' }}>
          <strong style={{ color: '#00bfb3' }}>Algolia Pricing</strong>
          <p style={{ margin: '6px 0 0', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            {isZh ? '免费层：1万条记录 + 1万次请求/月，Build 计划起价 $1/1000 次请求，Grow 计划起价 $500/月，Premium 企业定制定价，费用随使用量显著增加。' : 'Free tier: 10K records + 10K requests/month, Build plan starts at $1/1000 requests, Grow plan starts at $500/month, Premium enterprise custom pricing, costs increase significantly with usage.'}
          </p>
        </div>
      </div>

      <h2 style={h2Style}>{ct.useCasesTitle}</h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16, marginBottom: 24 }}>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #f46800' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#f46800' }}>{ct.meilisearchBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? '成本敏感项目' : 'Cost-sensitive projects'}</li>
            <li>{isZh ? '需要自托管' : 'Need for self-hosting'}</li>
            <li>{isZh ? '开源偏好' : 'Open-source preference'}</li>
            <li>{isZh ? '中小型电商' : 'Small to medium e-commerce'}</li>
            <li>{isZh ? '文档搜索' : 'Documentation search'}</li>
            <li>{isZh ? '初创公司' : 'Startups'}</li>
          </ul>
        </div>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #00bfb3' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#00bfb3' }}>{ct.algoliaBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? '企业级部署' : 'Enterprise deployments'}</li>
            <li>{isZh ? '需要 AI 功能' : 'Need for AI features'}</li>
            <li>{isZh ? '高级个性化' : 'Advanced personalization'}</li>
            <li>{isZh ? '大型电商' : 'Large e-commerce'}</li>
            <li>{isZh ? '需要 SLA 保证' : 'SLA guarantees needed'}</li>
            <li>{isZh ? '零运维偏好' : 'Zero-ops preference'}</li>
          </ul>
        </div>
      </div>

      <h2 style={h2Style}>{ct.conclusionTitle}</h2>
      <p style={pStyle}>{ct.conclusionContent}</p>

      <div style={{ padding: 20, background: 'linear-gradient(135deg, rgba(59,130,246,0.1), rgba(139,92,246,0.1))', borderRadius: 12, border: '1px solid rgba(59,130,246,0.3)', textAlign: 'center', marginTop: 30, marginBottom: 30 }}>
        <p style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{ct.tryTools}</p>
        <a href={"/" + lang + "/tools/json-formatter"} style={{ color: '#3b82f6', textDecoration: 'none' }}>JSON Formatter</a> • {' '}
        <a href={"/" + lang + "/tools/regex-tester"} style={{ color: '#3b82f6', textDecoration: 'none' }}>Regex Tester</a> • {' '}
        <a href={"/" + lang + "/tools/base64-encoder"} style={{ color: '#3b82f6', textDecoration: 'none' }}>Base64 Encoder</a>
      </div>

      <h2 style={h2Style}>FAQ</h2>
      {[
        [ct.faq1q, ct.faq1a],
        [ct.faq2q, ct.faq2a],
        [ct.faq3q, ct.faq3a],
        [ct.faq4q, ct.faq4a],
        [ct.faq5q, ct.faq5a],
        [ct.faq6q, ct.faq6a],
        [ct.faq7q, ct.faq7a],
        [ct.faq8q, ct.faq8a],
      ].map(([q, a], i) => (
        <div key={i} style={{ marginBottom: 16, padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)' }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 8, color: 'var(--text-primary)' }}>{q}</h3>
          <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7, margin: 0 }}>{a}</p>
        </div>
      ))}
    </div>
  );
}
