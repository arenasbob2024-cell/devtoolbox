'use client';

import React from 'react';

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'Raycast vs Algolia: Search Solution Comparison',
    intro: 'Raycast and Algolia serve different search needs but are often compared for developer productivity tools. Raycast is a macOS productivity launcher with local search capabilities, while Algolia is a cloud-based search-as-a-service platform. This comparison examines their search capabilities, use cases, and integration options.',
    
    tldrTitle: 'TL;DR - Quick Summary',
    tldrContent: 'Choose Raycast for personal productivity, macOS workflow automation, and local search across apps and files. Choose Algolia for building search functionality into web applications, e-commerce sites, and SaaS products. They serve different markets: Raycast for end-user productivity, Algolia for developers building search.',
    
    takeawaysTitle: 'Key Takeaways',
    takeaway1: 'Raycast is a macOS productivity launcher, not a search API',
    takeaway2: 'Algolia provides search infrastructure for applications',
    takeaway3: 'Raycast offers local search and workflow automation',
    takeaway4: 'Algolia excels at full-text and faceted search at scale',
    takeaway5: 'Raycast is free for individuals, Algolia is usage-based pricing',
    takeaway6: 'Both integrate with popular tools but serve different audiences',
    
    whatIsRaycastTitle: 'What is Raycast?',
    whatIsRaycastContent: 'Raycast is a blazingly fast, totally extendable macOS productivity tool launched in 2020. It replaces Spotlight with powerful features including clipboard history, window management, script commands, and extensions for popular services like GitHub, Jira, and Notion. Raycast focuses on individual developer productivity.',
    
    whatIsAlgoliaTitle: 'What is Algolia?',
    whatIsAlgoliaContent: 'Algolia is a hosted search and discovery platform founded in 2012. It provides search-as-a-service APIs that enable developers to implement fast, relevant search in their applications. Used by companies like Stripe, Twitch, and Medium, Algolia handles billions of searches monthly with sub-50ms response times.',
    
    performanceTitle: 'Feature Comparison',
    performanceIntro: 'Comparing core capabilities:',
    
    featuresTitle: 'Detailed Feature Matrix',
    featuresIntro: 'Side-by-side comparison of key features:',
    
    codeExampleTitle: 'Integration Examples',
    codeExampleIntro: 'How to integrate each tool:',
    
    raycastExampleTitle: 'Raycast Extension',
    algoliaExampleTitle: 'Algolia Search API',
    
    dataSourceTitle: 'Search Capabilities',
    dataSourceIntro: 'Search features and performance:',
    
    alertingTitle: 'Use Case Scenarios',
    alertingIntro: 'When to use each solution:',
    
    useCasesTitle: 'Best Use Cases',
    raycastBestFor: 'Raycast is Best For:',
    algoliaBestFor: 'Algolia is Best For:',
    
    conclusionTitle: 'Conclusion',
    conclusionContent: 'Raycast and Algolia serve fundamentally different purposes and rarely compete directly. Raycast enhances personal productivity on macOS with quick access to apps, files, and workflows. Algolia provides the infrastructure for search functionality in applications and websites. Use Raycast to boost your development workflow; use Algolia to build search into your products.',
    
    faq1q: 'Can I use Raycast search in my application?',
    faq1a: 'No, Raycast is a desktop productivity tool for macOS, not a search API. It cannot be integrated into web or mobile applications. For application search, you need Algolia or similar services like Meilisearch, Elasticsearch, or Typesense.',
    
    faq2q: 'Is Algolia only for large companies?',
    faq2a: 'No, Algolia offers a free tier suitable for small projects and startups. The free plan includes 10,000 records and 10,000 search requests per month. Paid plans scale based on usage, making it accessible for projects of all sizes.',
    
    faq3q: 'Can Raycast search the web?',
    faq3a: 'Yes, Raycast can search the web through quicklinks and extensions. You can configure custom search engines, search Google, DuckDuckGo, or specific sites like Stack Overflow and GitHub directly from Raycast.',
    
    faq4q: 'How fast is Algolia search?',
    faq4a: 'Algolia typically returns search results in under 50ms worldwide. It uses a distributed network of servers and optimized indexing to provide near-instantaneous search experiences. Speed is one of Algolia\'s key selling points.',
    
    faq5q: 'Is Raycast available on Windows or Linux?',
    faq5a: 'No, Raycast is macOS-only. It relies heavily on macOS-specific APIs and technologies. There are no announced plans for Windows or Linux versions. Alternatives for other platforms include Alfred (macOS), Wox (Windows), and Ulauncher (Linux).',
    
    faq6q: 'Can Algolia search images and files?',
    faq6a: 'Yes, Algolia can index and search any data you provide, including image metadata, file attributes, and content. However, you need to send the data to Algolia\'s servers. It does not crawl or index local files automatically.',
    
    faq7q: 'What are Raycast extensions written in?',
    faq7a: 'Raycast extensions are written in TypeScript/JavaScript using React. The Raycast API provides components and utilities for building extensions. You can create custom commands, views, and integrations with external services.',
    
    faq8q: 'Does Algolia support Chinese and other languages?',
    faq8a: 'Yes, Algolia supports over 50 languages including Chinese, Japanese, Korean, and Arabic. It provides language-specific tokenization, stemming, and stop word removal. It handles CJK (Chinese, Japanese, Korean) text segmentation automatically.',
    
    tryTools: 'Try Our Related Tools',
  },
  zh: {
    title: 'Raycast vs Algolia：搜索解决方案对比',
    intro: 'Raycast 和 Algolia 满足不同的搜索需求，但经常在开发人员生产力工具方面进行比较。Raycast 是具有本地搜索功能的 macOS 生产力启动器，而 Algolia 是基于云的搜索即服务平台。本比较考察它们的搜索能力、用例和集成选项。',
    
    tldrTitle: 'TL;DR - 快速总结',
    tldrContent: '选择 Raycast 用于个人生产力、macOS 工作流自动化以及跨应用和文件的本地搜索。选择 Algolia 用于在 Web 应用、电商网站和 SaaS 产品中构建搜索功能。它们服务于不同的市场：Raycast 面向终端用户生产力，Algolia 面向构建搜索功能的开发者。',
    
    takeawaysTitle: '核心要点',
    takeaway1: 'Raycast 是 macOS 生产力启动器，不是搜索 API',
    takeaway2: 'Algolia 为应用程序提供搜索基础设施',
    takeaway3: 'Raycast 提供本地搜索和工作流自动化',
    takeaway4: 'Algolia 擅长大规模全文和分面搜索',
    takeaway5: 'Raycast 对个人免费，Algolia 采用基于使用量的定价',
    takeaway6: '两者都与流行工具集成，但服务于不同的受众',
    
    whatIsRaycastTitle: '什么是 Raycast？',
    whatIsRaycastContent: 'Raycast 是一个极快、完全可扩展的 macOS 生产力工具，于 2020 年推出。它用强大的功能替换 Spotlight，包括剪贴板历史、窗口管理、脚本命令和流行服务的扩展，如 GitHub、Jira 和 Notion。Raycast 专注于个人开发人员生产力。',
    
    whatIsAlgoliaTitle: '什么是 Algolia？',
    whatIsAlgoliaContent: 'Algolia 是一个托管搜索和发现平台，成立于 2012 年。它提供搜索即服务 API，使开发者能够在他们的应用中实现快速、相关的搜索。被 Stripe、Twitch 和 Medium 等公司使用，Algolia 每月处理数十亿次搜索，响应时间低于 50ms。',
    
    performanceTitle: '功能对比',
    performanceIntro: '比较核心功能：',
    
    featuresTitle: '详细功能矩阵',
    featuresIntro: '关键功能的并排比较：',
    
    codeExampleTitle: '集成示例',
    codeExampleIntro: '如何集成每个工具：',
    
    raycastExampleTitle: 'Raycast 扩展',
    algoliaExampleTitle: 'Algolia 搜索 API',
    
    dataSourceTitle: '搜索能力',
    dataSourceIntro: '搜索功能和性能：',
    
    alertingTitle: '用例场景',
    alertingIntro: '何时使用每个解决方案：',
    
    useCasesTitle: '最佳用例',
    raycastBestFor: 'Raycast 最适合：',
    algoliaBestFor: 'Algolia 最适合：',
    
    conclusionTitle: '结论',
    conclusionContent: 'Raycast 和 Algolia 服务于根本不同的目的，很少直接竞争。Raycast 通过快速访问应用、文件和工作流来增强 macOS 上的个人生产力。Algolia 为应用程序和网站中的搜索功能提供基础设施。使用 Raycast 提升你的开发工作流程；使用 Algolia 在你的产品中构建搜索。',
    
    faq1q: '我可以在我的应用中使用 Raycast 搜索吗？',
    faq1a: '不可以，Raycast 是 macOS 的桌面生产力工具，不是搜索 API。它不能集成到 Web 或移动应用程序中。对于应用搜索，你需要 Algolia 或类似服务如 Meilisearch、Elasticsearch 或 Typesense。',
    
    faq2q: 'Algolia 只适合大公司吗？',
    faq2a: '不是，Algolia 提供适合小项目和初创公司的免费层。免费计划包括 10,000 条记录和每月 10,000 次搜索请求。付费计划根据使用量扩展，适合各种规模的项目。',
    
    faq3q: 'Raycast 可以搜索网络吗？',
    faq3a: '是的，Raycast 可以通过快速链接和扩展搜索网络。你可以配置自定义搜索引擎、搜索 Google、DuckDuckGo 或直接从 Raycast 搜索 Stack Overflow 和 GitHub 等特定网站。',
    
    faq4q: 'Algolia 搜索有多快？',
    faq4a: 'Algolia 通常在 50ms 内返回全球搜索结果。它使用分布式服务器网络和优化的索引来提供近乎即时的搜索体验。速度是 Algolia 的主要卖点之一。',
    
    faq5q: 'Raycast 在 Windows 或 Linux 上可用吗？',
    faq5a: '不可以，Raycast 仅限 macOS。它严重依赖 macOS 特定的 API 和技术。没有宣布 Windows 或 Linux 版本的计划。其他平台的替代品包括 Alfred (macOS)、Wox (Windows) 和 Ulauncher (Linux)。',
    
    faq6q: 'Algolia 可以搜索图片和文件吗？',
    faq6a: '是的，Algolia 可以索引和搜索你提供的任何数据，包括图片元数据、文件属性和内容。但是，你需要将数据发送到 Algolia 的服务器。它不会自动爬取或索引本地文件。',
    
    faq7q: 'Raycast 扩展用什么编写？',
    faq7a: 'Raycast 扩展使用 TypeScript/JavaScript 和 React 编写。Raycast API 提供构建扩展的组件和工具。你可以创建自定义命令、视图和与外部服务的集成。',
    
    faq8q: 'Algolia 支持中文和其他语言吗？',
    faq8a: '是的，Algolia 支持 50 多种语言，包括中文、日文、韩文和阿拉伯文。它提供特定语言的分词、词干提取和停用词去除。它自动处理 CJK（中文、日文、韩文）文本分段。',
    
    tryTools: '试试我们的相关工具',
  },
};

export default function RaycastVsAlgolia({ lang }: { lang: string }) {
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

      <h3 style={h3Style}>{ct.whatIsRaycastTitle}</h3>
      <p style={pStyle}>{ct.whatIsRaycastContent}</p>

      <h3 style={h3Style}>{ct.whatIsAlgoliaTitle}</h3>
      <p style={pStyle}>{ct.whatIsAlgoliaContent}</p>

      <h2 style={h2Style}>{ct.performanceTitle}</h2>
      <p style={pStyle}>{ct.performanceIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '特性' : 'Feature'}</th>
              <th style={thStyle}>Raycast</th>
              <th style={thStyle}>Algolia</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '产品类型' : 'Product Type', isZh ? '桌面生产力工具' : 'Desktop productivity tool', isZh ? '搜索即服务 API' : 'Search-as-a-service API'],
              [isZh ? '平台支持' : 'Platform Support', 'macOS only', isZh ? '跨平台（云服务）' : 'Cross-platform (cloud)'],
              [isZh ? '搜索范围' : 'Search Scope', isZh ? '本地应用、文件、扩展' : 'Local apps, files, extensions', isZh ? '应用数据、网站内容' : 'App data, website content'],
              [isZh ? '响应速度' : 'Response Speed', isZh ? '即时本地' : 'Instant local', '< 50ms global'],
              [isZh ? '可扩展性' : 'Scalability', isZh ? '单用户' : 'Single user', isZh ? '数十亿请求' : 'Billions of requests'],
              [isZh ? '目标用户' : 'Target Users', isZh ? '个人开发者' : 'Individual developers', isZh ? '应用开发者' : 'App developers'],
              [isZh ? '定价模式' : 'Pricing Model', isZh ? '免费（高级功能付费）' : 'Free (paid Pro)', isZh ? '基于使用量' : 'Usage-based'],
              [isZh ? 'API 访问' : 'API Access', isZh ? '扩展 API' : 'Extension API', isZh ? '完整 REST API' : 'Full REST API'],
            ].map(([feature, raycast, algolia], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{feature}</td>
                <td style={tdStyle}>{raycast}</td>
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
              <th style={thStyle}>{isZh ? '功能' : 'Capability'}</th>
              <th style={thStyle}>Raycast</th>
              <th style={thStyle}>Algolia</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '全文搜索' : 'Full-text Search', isZh ? '本地文件搜索' : 'Local file search', isZh ? '强大的全文索引' : 'Powerful full-text indexing'],
              [isZh ? '模糊搜索' : 'Fuzzy Search', isZh ? '支持' : 'Supported', isZh ? '可配置容错' : 'Configurable typo tolerance'],
              [isZh ? '分面搜索' : 'Faceted Search', isZh ? '无' : 'No', isZh ? '完整支持' : 'Full support'],
              [isZh ? '同义词' : 'Synonyms', isZh ? '有限' : 'Limited', isZh ? '高级同义词管理' : 'Advanced synonym management'],
              [isZh ? '多语言' : 'Multi-language', isZh ? '系统语言' : 'System language', '50+ languages'],
              [isZh ? '实时索引' : 'Real-time Indexing', isZh ? '自动' : 'Automatic', isZh ? 'API 推送' : 'API push'],
              [isZh ? '分析统计' : 'Analytics', isZh ? '无' : 'No', isZh ? '详细分析仪表板' : 'Detailed analytics dashboard'],
              [isZh ? 'A/B 测试' : 'A/B Testing', isZh ? '无' : 'No', isZh ? '内置支持' : 'Built-in support'],
            ].map(([cap, raycast, algolia], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{cap}</td>
                <td style={tdStyle}>{raycast}</td>
                <td style={tdStyle}>{algolia}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={h2Style}>{ct.codeExampleTitle}</h2>
      <p style={pStyle}>{ct.codeExampleIntro}</p>

      <h3 style={{ ...h3Style, color: '#ff6363' }}>{ct.raycastExampleTitle}</h3>
      <pre style={codeStyle}><code>{'// Raycast Extension - Search GitHub Repos\n// File: src/search-github.tsx\n\nimport { Action, ActionPanel, List, showToast, Toast } from "@raycast/api";\nimport { useState, useEffect } from "react";\n\ninterface GitHubRepo {\n  id: number;\n  name: string;\n  full_name: string;\n  description: string;\n  html_url: string;\n  stargazers_count: number;\n}\n\nexport default function SearchGitHub() {\n  const [query, setQuery] = useState("");\n  const [results, setResults] = useState<GitHubRepo[]>([]);\n  const [isLoading, setIsLoading] = useState(false);\n\n  useEffect(() => {\n    if (query.length === 0) {\n      setResults([]);\n      return;\n    }\n\n    setIsLoading(true);\n    fetch(\n      "https://api.github.com/search/repositories?q=" + \n      encodeURIComponent(query) + \n      "&sort=stars&order=desc"\n    )\n      .then((res) => res.json())\n      .then((data) => {\n        setResults(data.items || []);\n        setIsLoading(false);\n      })\n      .catch(() => {\n        showToast({ style: Toast.Style.Failure, title: "Search failed" });\n        setIsLoading(false);\n      });\n  }, [query]);\n\n  return (\n    <List \n      isLoading={isLoading} \n      onSearchTextChange={setQuery}\n      searchBarPlaceholder="Search GitHub repositories..."\n    >\n      {results.map((repo) => (\n        <List.Item\n          key={repo.id}\n          title={repo.full_name}\n          subtitle={repo.description}\n          accessories={[{ text: "★ " + repo.stargazers_count }]}\n          actions={\n            <ActionPanel>\n              <Action.OpenInBrowser url={repo.html_url} />\n            </ActionPanel>\n          }\n        />\n      ))}\n    </List>\n  );\n}'}</code></pre>

      <h3 style={{ ...h3Style, color: '#5468ff' }}>{ct.algoliaExampleTitle}</h3>
      <pre style={codeStyle}><code>{'// Algolia Search Integration - E-commerce Example\n// Install: npm install algoliasearch\n\nimport algoliasearch from "algoliasearch";\n\n// Initialize client\nconst client = algoliasearch("YOUR_APP_ID", "YOUR_API_KEY");\nconst index = client.initIndex("products");\n\n// Index products\nasync function indexProducts(products) {\n  try {\n    const { objectIDs } = await index.saveObjects(products, {\n      autoGenerateObjectIDIfNotExist: true,\n    });\n    console.log("Indexed " + objectIDs.length + " products");\n  } catch (error) {\n    console.error("Indexing error:", error);\n  }\n}\n\n// Search with filters and facets\nasync function searchProducts(query, filters = {}) {\n  try {\n    const { hits, nbHits, facets } = await index.search(query, {\n      filters: filters.category \n        ? "category:" + filters.category \n        : undefined,\n      facets: ["category", "brand", "price_range"],\n      maxValuesPerFacet: 10,\n      hitsPerPage: 20,\n      page: filters.page || 0,\n    });\n\n    return {\n      products: hits,\n      totalResults: nbHits,\n      facets: facets,\n    };\n  } catch (error) {\n    console.error("Search error:", error);\n    throw error;\n  }\n}\n\n// Example usage\nindexProducts([\n  { name: "iPhone 15 Pro", category: "Phones", brand: "Apple", price: 999 },\n  { name: "MacBook Pro", category: "Laptops", brand: "Apple", price: 1999 },\n]);\n\nsearchProducts("apple", { category: "Phones" })\n  .then((results) => console.log("Found:", results.totalResults));'}</code></pre>

      <h2 style={h2Style}>{ct.dataSourceTitle}</h2>
      <p style={pStyle}>{ct.dataSourceIntro}</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
        <div style={{ padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderLeft: '4px solid #ff6363' }}>
          <strong style={{ color: '#ff6363' }}>Raycast Search</strong>
          <p style={{ margin: '6px 0 0', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            {isZh ? '本地优先搜索，可以搜索应用、文件、剪贴板历史、窗口、联系人等。通过扩展可以搜索 GitHub issues、Jira 工单、Notion 页面等在线服务。速度极快，无需网络延迟。' : 'Local-first search across apps, files, clipboard history, windows, contacts, and more. Extensions enable searching GitHub issues, Jira tickets, Notion pages, and other online services. Blazing fast with no network latency.'}
          </p>
        </div>
        <div style={{ padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderLeft: '4px solid #5468ff' }}>
          <strong style={{ color: '#5468ff' }}>Algolia Search</strong>
          <p style={{ margin: '6px 0 0', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            {isZh ? '云端搜索服务，支持全文搜索、分面搜索、地理搜索、同义词、自定义排序等。响应时间 < 50ms，支持自动完成、高亮显示、分页、筛选。适用于电商、文档、SaaS 产品等场景。' : 'Cloud search service supporting full-text search, faceted search, geo search, synonyms, custom ranking, and more. < 50ms response time with autocomplete, highlighting, pagination, and filtering. Ideal for e-commerce, documentation, and SaaS products.'}
          </p>
        </div>
      </div>

      <h2 style={h2Style}>{ct.useCasesTitle}</h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16, marginBottom: 24 }}>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #ff6363' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#ff6363' }}>{ct.raycastBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? '个人生产力提升' : 'Personal productivity boost'}</li>
            <li>{isZh ? '快速启动应用和文件' : 'Quick app and file launching'}</li>
            <li>{isZh ? '剪贴板历史管理' : 'Clipboard history management'}</li>
            <li>{isZh ? '窗口管理自动化' : 'Window management automation'}</li>
            <li>{isZh ? '脚本命令执行' : 'Script command execution'}</li>
            <li>{isZh ? 'macOS 工作流优化' : 'macOS workflow optimization'}</li>
          </ul>
        </div>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #5468ff' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#5468ff' }}>{ct.algoliaBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? '电商产品搜索' : 'E-commerce product search'}</li>
            <li>{isZh ? '文档和知识库搜索' : 'Documentation and knowledge base search'}</li>
            <li>{isZh ? 'SaaS 应用内搜索' : 'In-app SaaS search'}</li>
            <li>{isZh ? '内容网站搜索' : 'Content website search'}</li>
            <li>{isZh ? '地理位置搜索' : 'Geo-location search'}</li>
            <li>{isZh ? '高并发搜索场景' : 'High-traffic search scenarios'}</li>
          </ul>
        </div>
      </div>

      <h2 style={h2Style}>{ct.conclusionTitle}</h2>
      <p style={pStyle}>{ct.conclusionContent}</p>

      <div style={{ padding: 20, background: 'linear-gradient(135deg, rgba(59,130,246,0.1), rgba(139,92,246,0.1))', borderRadius: 12, border: '1px solid rgba(59,130,246,0.3)', textAlign: 'center', marginTop: 30, marginBottom: 30 }}>
        <p style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{ct.tryTools}</p>
        <a href={"/" + lang + "/tools/json-formatter"} style={{ color: '#3b82f6', textDecoration: 'none' }}>JSON Formatter</a> • {' '}
        <a href={"/" + lang + "/tools/regex-tester"} style={{ color: '#3b82f6', textDecoration: 'none' }}>Regex Tester</a> • {' '}
        <a href={"/" + lang + "/tools/url-encoder"} style={{ color: '#3b82f6', textDecoration: 'none' }}>URL Encoder</a>
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
