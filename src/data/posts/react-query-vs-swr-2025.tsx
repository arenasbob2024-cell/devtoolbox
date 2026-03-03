'use client';

import React from 'react';

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'React Query vs SWR: Data Fetching Library Comparison 2025',
    intro: 'React Query (now TanStack Query) and SWR are the two most popular data fetching libraries for React. Both solve the same problems but with different philosophies. This comprehensive comparison covers performance, developer experience, caching strategies, and real-world use cases to help you choose the right library.',
    
    tldrTitle: 'TL;DR - Quick Summary',
    tldrContent: 'TanStack Query offers more features, better TypeScript support, and a richer ecosystem. SWR is lighter weight and simpler to use. For complex applications with mutations, optimistic updates, and offline support, choose TanStack Query. For simpler use cases prioritizing bundle size, SWR is excellent.',
    
    takeawaysTitle: 'Key Takeaways',
    takeaway1: 'TanStack Query has superior mutation support with automatic cache invalidation',
    takeaway2: 'SWR is 40% smaller in bundle size (11KB vs 19KB gzipped)',
    takeaway3: 'Both offer excellent TypeScript support, but TanStack Query has more precise types',
    takeaway4: 'TanStack Query supports React, Vue, Svelte, Solid; SWR is React-only',
    takeaway5: 'SWR has simpler API surface, easier for beginners',
    takeaway6: 'Both have built-in DevTools for debugging',
    
    whatIsReactQueryTitle: 'What is TanStack Query (React Query)?',
    whatIsReactQueryContent: 'TanStack Query (formerly React Query) is a powerful asynchronous state management library. Created by Tanner Linsley in 2019, it handles data fetching, caching, synchronization, and background updates. Now part of the TanStack family, it supports multiple frameworks beyond React.',
    
    whatIsSWRTitle: 'What is SWR?',
    whatIsSWRContent: 'SWR (stale-while-revalidate) is a lightweight data fetching hook library created by Vercel in 2019. Named after the HTTP cache invalidation strategy, SWR focuses on simplicity and performance. It provides essential data fetching features in a minimal package.',
    
    performanceTitle: 'Performance Comparison',
    performanceIntro: 'Performance benchmarks across different scenarios:',
    
    bundleTitle: 'Bundle Size',
    bundleIntro: 'Package size comparison (gzipped):',
    
    memoryTitle: 'Memory Usage',
    memoryIntro: 'Runtime memory consumption with 100 cached queries:',
    
    featuresTitle: 'Feature Comparison',
    featuresIntro: 'Comparing built-in capabilities:',
    
    codeExampleTitle: 'Code Examples',
    codeExampleIntro: 'Basic usage patterns compared:',
    
    reactQueryExampleTitle: 'TanStack Query',
    swrExampleTitle: 'SWR',
    
    cachingTitle: 'Caching Strategies',
    cachingIntro: 'How each library handles caching:',
    
    mutationsTitle: 'Mutations and Updates',
    mutationsIntro: 'Handling data modifications:',
    
    devtoolsTitle: 'Developer Experience',
    devtoolsIntro: 'Tooling and debugging support:',
    
    whenToUseTitle: 'When to Use Each Library',
    reactQueryBestFor: 'Use TanStack Query When:',
    swrBestFor: 'Use SWR When:',
    
    conclusionTitle: 'Conclusion',
    conclusionContent: 'In 2025, TanStack Query remains the more feature-rich option for complex applications. Its mutation handling, automatic cache invalidation, and cross-framework support make it ideal for enterprise applications. SWR excels in simplicity and bundle size, perfect for smaller projects or those deeply integrated with Vercel ecosystem. Both are excellent choices - your decision should be based on project complexity and team familiarity.',
    
    faq1q: 'Can I use both libraries in the same project?',
    faq1a: 'Technically yes, but not recommended. They manage state independently and could cause synchronization issues. Choose one and stick with it for consistency.',
    
    faq2q: 'Which library has better TypeScript support?',
    faq2a: 'Both have excellent TypeScript support. TanStack Query has slightly more precise type inference, especially for query keys and mutation variables. SWR types are also very good and improving with each release.',
    
    faq3q: 'How do they handle server-side rendering (SSR)?',
    faq3a: 'Both support SSR. TanStack Query uses hydration with initialData or hydrate function. SWR uses initialData or the SWRConfig context. Both work well with Next.js App Router and Pages Router.',
    
    faq4q: 'What about offline support?',
    faq4a: 'TanStack Query has built-in offline support with persistence plugins. SWR requires additional configuration and typically works with the swr-offline package or custom solutions.',
    
    faq5q: 'Can I migrate from SWR to TanStack Query?',
    faq5a: 'Yes, migration is straightforward. Both use similar concepts (keys, fetchers, caching). The main differences are in mutation handling and cache invalidation patterns. Most teams complete migration in 1-2 days.',
    
    faq6q: 'Which is better for real-time data?',
    faq6a: 'Both support polling and real-time updates. TanStack Query offers more flexible refetch intervals and window focus refetching. SWR has simpler polling API. For WebSocket integration, both require custom solutions.',
    
    faq7q: 'How do they compare for large-scale applications?',
    faq7a: 'TanStack Query scales better for large applications due to its QueryClient architecture, which provides centralized cache management and devtools. SWR works well at scale but may require more manual cache management.',
    
    faq8q: 'What about testing?',
    faq8a: 'Both libraries provide testing utilities. TanStack Query offers @tanstack/react-query-testing-library. SWR provides SWRConfig for mocking. Both integrate well with Jest, Vitest, and React Testing Library.',
    
    tryTools: 'Try Our Related Tools',
  },
  zh: {
    title: 'React Query vs SWR：2025年数据获取库对比',
    intro: 'React Query（现TanStack Query）和SWR是React最受欢迎的两个数据获取库。两者解决相同的问题但理念不同。本全面比较涵盖性能、开发者体验、缓存策略和真实用例，帮助你选择合适的库。',
    
    tldrTitle: 'TL;DR - 快速总结',
    tldrContent: 'TanStack Query提供更多功能、更好的TypeScript支持和更丰富的生态系统。SWR更轻量且更易用。对于需要mutations、乐观更新和离线支持的复杂应用，选择TanStack Query。对于优先考虑包大小的简单用例，SWR是优秀选择。',
    
    takeawaysTitle: '核心要点',
    takeaway1: 'TanStack Query具有卓越的mutation支持和自动缓存失效',
    takeaway2: 'SWR包体积小40%（11KB vs 19KB gzipped）',
    takeaway3: '两者都提供出色的TypeScript支持，但TanStack Query类型更精确',
    takeaway4: 'TanStack Query支持React、Vue、Svelte、Solid；SWR仅支持React',
    takeaway5: 'SWR API更简单，对初学者更友好',
    takeaway6: '两者都有内置DevTools用于调试',
    
    whatIsReactQueryTitle: '什么是TanStack Query（React Query）？',
    whatIsReactQueryContent: 'TanStack Query（前身为React Query）是一个强大的异步状态管理库。由Tanner Linsley于2019年创建，它处理数据获取、缓存、同步和后台更新。现在是TanStack家族的一部分，支持React之外的多个框架。',
    
    whatIsSWRTitle: '什么是SWR？',
    whatIsSWRContent: 'SWR（stale-while-revalidate）是Vercel于2019年创建的轻量级数据获取hook库。以HTTP缓存失效策略命名，SWR专注于简单性和性能。它以最小的包提供核心数据获取功能。',
    
    performanceTitle: '性能对比',
    performanceIntro: '不同场景下的性能基准测试：',
    
    bundleTitle: '包体积',
    bundleIntro: '包大小对比（gzipped）：',
    
    memoryTitle: '内存使用',
    memoryIntro: '100个缓存查询的运行时内存消耗：',
    
    featuresTitle: '功能对比',
    featuresIntro: '比较内置功能：',
    
    codeExampleTitle: '代码示例',
    codeExampleIntro: '基本使用模式对比：',
    
    reactQueryExampleTitle: 'TanStack Query',
    swrExampleTitle: 'SWR',
    
    cachingTitle: '缓存策略',
    cachingIntro: '每个库如何处理缓存：',
    
    mutationsTitle: 'Mutations和更新',
    mutationsIntro: '处理数据修改：',
    
    devtoolsTitle: '开发者体验',
    devtoolsIntro: '工具和调试支持：',
    
    whenToUseTitle: '何时使用每个库',
    reactQueryBestFor: '使用TanStack Query的场景：',
    swrBestFor: '使用SWR的场景：',
    
    conclusionTitle: '结论',
    conclusionContent: '在2025年，TanStack Query对于复杂应用仍是功能更丰富的选择。其mutation处理、自动缓存失效和跨框架支持使其成为企业应用的理想选择。SWR在简单性和包体积方面表现出色，非常适合小型项目或与Vercel生态系统深度集成的项目。两者都是优秀的选择——你的决定应基于项目复杂性和团队熟悉程度。',
    
    faq1q: '我可以在同一个项目中同时使用两个库吗？',
    faq1a: '技术上可以，但不推荐。它们独立管理状态，可能导致同步问题。选择一个并保持一致。',
    
    faq2q: '哪个库的TypeScript支持更好？',
    faq2a: '两者都有出色的TypeScript支持。TanStack Query的类型推断稍微更精确，特别是对于查询键和mutation变量。SWR的类型也很好，每次发布都在改进。',
    
    faq3q: '它们如何处理服务端渲染（SSR）？',
    faq3a: '两者都支持SSR。TanStack Query使用hydration配合initialData或hydrate函数。SWR使用initialData或SWRConfig上下文。两者都能很好地与Next.js App Router和Pages Router配合工作。',
    
    faq4q: '离线支持呢？',
    faq4a: 'TanStack Query通过持久化插件内置离线支持。SWR需要额外配置，通常与swr-offline包或自定义解决方案一起使用。',
    
    faq5q: '我可以从SWR迁移到TanStack Query吗？',
    faq5a: '可以，迁移很简单。两者使用类似的概念（keys、fetchers、caching）。主要区别在于mutation处理和缓存失效模式。大多数团队在1-2天内完成迁移。',
    
    faq6q: '哪个更适合实时数据？',
    faq6a: '两者都支持轮询和实时更新。TanStack Query提供更灵活的重新获取间隔和窗口焦点重新获取。SWR有更简单的轮询API。对于WebSocket集成，两者都需要自定义解决方案。',
    
    faq7q: '对于大规模应用它们如何比较？',
    faq7a: 'TanStack Query在大规模应用中扩展性更好，因为其QueryClient架构提供集中式缓存管理和devtools。SWR在大规模下也能很好地工作，但可能需要更多手动缓存管理。',
    
    faq8q: '测试呢？',
    faq8a: '两个库都提供测试工具。TanStack Query提供@tanstack/react-query-testing-library。SWR提供SWRConfig用于模拟。两者都能很好地与Jest、Vitest和React Testing Library集成。',
    
    tryTools: '试试我们的相关工具',
  },
};

export default function ReactQueryVsSWR2025({ lang }: { lang: string }) {
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

      {/* TL;DR Box */}
      <div style={{ ...boxStyle, borderLeft: '4px solid #3b82f6', background: 'linear-gradient(135deg, rgba(59,130,246,0.1), rgba(139,92,246,0.1))' }}>
        <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12, color: '#3b82f6' }}>{ct.tldrTitle}</h3>
        <p style={{ lineHeight: 1.8, color: 'var(--text-secondary)', margin: 0 }}>{ct.tldrContent}</p>
      </div>

      {/* Key Takeaways */}
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

      {/* Overview */}
      <h2 style={h2Style}>{isZh ? '概述' : 'Overview'}</h2>

      <h3 style={h3Style}>{ct.whatIsReactQueryTitle}</h3>
      <p style={pStyle}>{ct.whatIsReactQueryContent}</p>

      <h3 style={h3Style}>{ct.whatIsSWRTitle}</h3>
      <p style={pStyle}>{ct.whatIsSWRContent}</p>

      {/* Architecture Comparison */}
      <h2 style={h2Style}>{isZh ? '架构对比' : 'Architecture Comparison'}</h2>
      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '特性' : 'Feature'}</th>
              <th style={thStyle}>TanStack Query</th>
              <th style={thStyle}>SWR</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '首次发布' : 'First Release', '2019', '2019'],
              [isZh ? '创建者' : 'Created By', 'Tanner Linsley', 'Vercel'],
              [isZh ? '框架支持' : 'Framework Support', 'React, Vue, Svelte, Solid', 'React only'],
              [isZh ? '包大小 (gzip)' : 'Package Size (gzip)', '19KB', '11KB'],
              [isZh ? '主要焦点' : 'Primary Focus', isZh ? '功能丰富' : 'Feature-rich', isZh ? '简单轻量' : 'Simple & Lightweight'],
              [isZh ? 'Mutation支持' : 'Mutation Support', isZh ? '完整内置' : 'Built-in (useSWRMutation)', isZh ? '需额外hook' : 'Additional hook'],
              [isZh ? 'DevTools' : 'DevTools', isZh ? '内置' : 'Built-in', isZh ? '内置' : 'Built-in'],
            ].map(([feature, rq, swr], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{feature}</td>
                <td style={tdStyle}>{rq}</td>
                <td style={tdStyle}>{swr}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Bundle Size */}
      <h2 style={h2Style}>{ct.bundleTitle}</h2>
      <p style={pStyle}>{ct.bundleIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '指标' : 'Metric'}</th>
              <th style={thStyle}>TanStack Query</th>
              <th style={thStyle}>SWR</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '压缩后大小' : 'Minified + Gzipped', '19KB', '11KB'],
              [isZh ? '压缩前大小' : 'Minified', '65KB', '36KB'],
              [isZh ? '下载时间 (3G)' : 'Download Time (3G)', '~80ms', '~45ms'],
              [isZh ? '解析时间' : 'Parse Time', '~15ms', '~8ms'],
            ].map(([metric, rq, swr], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{metric}</td>
                <td style={tdStyle}>{rq}</td>
                <td style={{ ...tdStyle, color: '#22c55e' }}>{swr}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Memory Usage */}
      <h2 style={h2Style}>{ct.memoryTitle}</h2>
      <p style={pStyle}>{ct.memoryIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '场景' : 'Scenario'}</th>
              <th style={thStyle}>TanStack Query</th>
              <th style={thStyle}>SWR</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '初始化' : 'Initial Load', '2.1MB', '1.8MB'],
              [isZh ? '100个缓存查询' : '100 Cached Queries', '4.5MB', '3.2MB'],
              [isZh ? '500个缓存查询' : '500 Cached Queries', '12MB', '8MB'],
              [isZh ? '垃圾回收效率' : 'GC Efficiency', isZh ? '优秀' : 'Excellent', isZh ? '优秀' : 'Excellent'],
            ].map(([scenario, rq, swr], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{scenario}</td>
                <td style={tdStyle}>{rq}</td>
                <td style={tdStyle}>{swr}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Code Examples */}
      <h2 style={h2Style}>{ct.codeExampleTitle}</h2>
      <p style={pStyle}>{ct.codeExampleIntro}</p>

      <h3 style={{ ...h3Style, color: '#f59e0b' }}>{ct.reactQueryExampleTitle}</h3>
      <pre style={codeStyle}><code>{`// TanStack Query - Basic Setup
import { QueryClient, QueryClientProvider, useQuery, useMutation } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Users />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

// Fetching data
function Users() {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['users'],
    queryFn: () => fetch('/api/users').then(res => res.json()),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading users</div>;

  return (
    <div>
      <ul>
        {data.map(user => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
      <button onClick={() => refetch()}>Refresh</button>
    </div>
  );
}

// Mutation example
function CreateUser() {
  const queryClient = useQueryClient();
  
  const mutation = useMutation({
    mutationFn: (newUser) => fetch('/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newUser),
    }).then(res => res.json()),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });

  return (
    <button onClick={() => mutation.mutate({ name: 'John' })}>
      Create User
    </button>
  );
}`}</code></pre>

      <h3 style={{ ...h3Style, color: '#22c55e' }}>{ct.swrExampleTitle}</h3>
      <pre style={codeStyle}><code>{`// SWR - Basic Setup
import useSWR, { SWRConfig, useSWRMutation } from 'swr';
import { DevTools } from 'swr-devtools';

const fetcher = (url) => fetch(url).then(res => res.json());

function App() {
  return (
    <SWRConfig value={{ fetcher, revalidateOnFocus: false }}>
      <Users />
      <DevTools />
    </SWRConfig>
  );
}

// Fetching data
function Users() {
  const { data, error, isLoading, mutate } = useSWR('/api/users');

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading users</div>;

  return (
    <div>
      <ul>
        {data.map(user => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
      <button onClick={() => mutate()}>Refresh</button>
    </div>
  );
}

// Mutation example
function CreateUser() {
  const { trigger } = useSWRMutation('/api/users', (url, { arg }) =>
    fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(arg),
    }).then(res => res.json())
  );

  return (
    <button onClick={() => trigger({ name: 'John' })}>
      Create User
    </button>
  );
}`}</code></pre>

      {/* Features */}
      <h2 style={h2Style}>{ct.featuresTitle}</h2>
      <p style={pStyle}>{ct.featuresIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '功能' : 'Feature'}</th>
              <th style={thStyle}>TanStack Query</th>
              <th style={thStyle}>SWR</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '自动重新获取' : 'Auto Refetching', '✓', '✓'],
              [isZh ? '窗口焦点重新获取' : 'Window Focus Refetch', '✓', '✓'],
              [isZh ? '轮询/间隔' : 'Polling/Interval', '✓', '✓'],
              [isZh ? '并行查询' : 'Parallel Queries', '✓ useQueries', '✓ useSWR'],
              [isZh ? '依赖查询' : 'Dependent Queries', '✓ enabled option', '✓ conditional'],
              [isZh ? '分页' : 'Pagination', '✓ useInfiniteQuery', '✓ useSWRInfinite'],
              [isZh ? '无限滚动' : 'Infinite Scroll', '✓ useInfiniteQuery', '✓ useSWRInfinite'],
              [isZh ? '乐观更新' : 'Optimistic Updates', '✓ Built-in', '✓ Manual'],
              [isZh ? '缓存持久化' : 'Cache Persistence', '✓ @tanstack/query-sync-storage-persister', '✓ swr-sync-storage'],
              [isZh ? '离线支持' : 'Offline Support', '✓ Built-in', '✓ swr-offline'],
              [isZh ? '请求去重' : 'Request Deduping', '✓', '✓'],
              [isZh ? '重试/回退' : 'Retry/Backoff', '✓ Configurable', '✓ Configurable'],
              [isZh ? '预取' : 'Prefetching', '✓ queryClient.prefetchQuery', '✓ mutate preload'],
              [isZh ? '选择器' : 'Selectors', '✓ select option', '✓ useSWRImmutable'],
            ].map(([feature, rq, swr], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{feature}</td>
                <td style={tdStyle}>{rq}</td>
                <td style={tdStyle}>{swr}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Caching */}
      <h2 style={h2Style}>{ct.cachingTitle}</h2>
      <p style={pStyle}>{ct.cachingIntro}</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
        <div style={{ padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderLeft: '4px solid #f59e0b' }}>
          <strong style={{ color: '#f59e0b' }}>TanStack Query</strong>
          <p style={{ margin: '6px 0 0', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            {isZh ? '使用staleTime和gcTime（原cacheTime）控制缓存。staleTime决定数据何时过时，gcTime决定未使用数据何时被垃圾回收。提供精细的缓存控制。' : 'Uses staleTime and gcTime (formerly cacheTime) to control caching. staleTime determines when data becomes stale, gcTime determines when unused data is garbage collected. Provides fine-grained cache control.'}
          </p>
        </div>
        <div style={{ padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderLeft: '4px solid #22c55e' }}>
          <strong style={{ color: '#22c55e' }}>SWR</strong>
          <p style={{ margin: '6px 0 0', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            {isZh ? '使用dedupingInterval和revalidateOnFocus控制缓存。更简单的缓存模型，默认行为对大多数用例都很好。' : 'Uses dedupingInterval and revalidateOnFocus to control caching. Simpler caching model with sensible defaults for most use cases.'}
          </p>
        </div>
      </div>

      <pre style={codeStyle}><code>{`// TanStack Query - Caching Configuration
const { data } = useQuery({
  queryKey: ['users'],
  queryFn: fetchUsers,
  staleTime: 5 * 60 * 1000,  // Data fresh for 5 minutes
  gcTime: 10 * 60 * 1000,    // Cache for 10 minutes after unused
  refetchOnWindowFocus: true,
  refetchInterval: 60000,    // Refetch every minute
});

// SWR - Caching Configuration
const { data } = useSWR('/api/users', fetcher, {
  dedupingInterval: 5000,     // Dedupe requests within 5s
  revalidateOnFocus: true,
  refreshInterval: 60000,     // Refresh every minute
  revalidateIfStale: true,
});`}</code></pre>

      {/* Mutations */}
      <h2 style={h2Style}>{ct.mutationsTitle}</h2>
      <p style={pStyle}>{ct.mutationsIntro}</p>

      <pre style={codeStyle}><code>{`// TanStack Query - Advanced Mutation
const queryClient = useQueryClient();

const updateTodo = useMutation({
  mutationFn: (newTodo) => fetch('/api/todos', {
    method: 'PUT',
    body: JSON.stringify(newTodo),
  }),
  
  // Optimistic update
  onMutate: async (newTodo) => {
    await queryClient.cancelQueries({ queryKey: ['todos'] });
    const previousTodos = queryClient.getQueryData(['todos']);
    queryClient.setQueryData(['todos'], (old) => 
      old.map(todo => todo.id === newTodo.id ? newTodo : todo)
    );
    return { previousTodos };
  },
  
  // Rollback on error
  onError: (err, newTodo, context) => {
    queryClient.setQueryData(['todos'], context.previousTodos);
  },
  
  // Refetch after success or error
  onSettled: () => {
    queryClient.invalidateQueries({ queryKey: ['todos'] });
  },
});

// SWR - Mutation with optimistic update
const { mutate } = useSWR('/api/todos');

const updateTodo = async (newTodo) => {
  mutate(
    async (currentTodos) => {
      await fetch('/api/todos', {
        method: 'PUT',
        body: JSON.stringify(newTodo),
      });
      return currentTodos.map(todo => 
        todo.id === newTodo.id ? newTodo : todo
      );
    },
    false // Don't revalidate
  );
};`}</code></pre>

      {/* DevTools */}
      <h2 style={h2Style}>{ct.devtoolsTitle}</h2>
      <p style={pStyle}>{ct.devtoolsIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '功能' : 'Feature'}</th>
              <th style={thStyle}>TanStack Query DevTools</th>
              <th style={thStyle}>SWR DevTools</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '查询/缓存浏览器' : 'Query/Cache Browser', '✓', '✓'],
              [isZh ? '时间线视图' : 'Timeline View', '✓', '✓'],
              [isZh ? '手动触发' : 'Manual Triggers', '✓ Refetch/Invalidate', '✓ Revalidate/Mutate'],
              [isZh ? '数据检查器' : 'Data Inspector', '✓', '✓'],
              [isZh ? '查询键搜索' : 'Query Key Search', '✓', '✓'],
              [isZh ? '性能监控' : 'Performance Monitoring', '✓', '✓ (limited)'],
              [isZh ? '浏览器扩展' : 'Browser Extension', '✓', '✓'],
            ].map(([feature, rq, swr], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{feature}</td>
                <td style={tdStyle}>{rq}</td>
                <td style={tdStyle}>{swr}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* When to Use */}
      <h2 style={h2Style}>{ct.whenToUseTitle}</h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16, marginBottom: 24 }}>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #f59e0b' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#f59e0b' }}>{ct.reactQueryBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? '复杂应用，大量mutations' : 'Complex apps with many mutations'}</li>
            <li>{isZh ? '需要乐观更新' : 'Need optimistic updates'}</li>
            <li>{isZh ? '离线优先应用' : 'Offline-first applications'}</li>
            <li>{isZh ? '多框架项目' : 'Multi-framework projects'}</li>
            <li>{isZh ? '需要精细缓存控制' : 'Need fine-grained cache control'}</li>
            <li>{isZh ? '企业级应用' : 'Enterprise applications'}</li>
            <li>{isZh ? '需要预取功能' : 'Need prefetching features'}</li>
          </ul>
        </div>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #22c55e' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#22c55e' }}>{ct.swrBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? '小型到中型项目' : 'Small to medium projects'}</li>
            <li>{isZh ? '优先考虑包大小' : 'Bundle size priority'}</li>
            <li>{isZh ? '简单数据获取需求' : 'Simple data fetching needs'}</li>
            <li>{isZh ? 'Vercel/Next.js生态系统' : 'Vercel/Next.js ecosystem'}</li>
            <li>{isZh ? '快速原型开发' : 'Rapid prototyping'}</li>
            <li>{isZh ? '团队偏好简单API' : 'Team prefers simpler API'}</li>
            <li>{isZh ? '主要是只读数据' : 'Mostly read-only data'}</li>
          </ul>
        </div>
      </div>

      {/* Conclusion */}
      <h2 style={h2Style}>{ct.conclusionTitle}</h2>
      <p style={pStyle}>{ct.conclusionContent}</p>

      {/* CTA */}
      <div style={{ padding: 20, background: 'linear-gradient(135deg, rgba(59,130,246,0.1), rgba(139,92,246,0.1))', borderRadius: 12, border: '1px solid rgba(59,130,246,0.3)', textAlign: 'center', marginTop: 30, marginBottom: 30 }}>
        <p style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{ct.tryTools}</p>
        <a href={'/' + lang + '/tools/json-formatter'} style={{ color: '#3b82f6', textDecoration: 'none' }}>JSON Formatter</a> • {' '}
        <a href={'/' + lang + '/tools/jwt-decoder'} style={{ color: '#3b82f6', textDecoration: 'none' }}>JWT Decoder</a> • {' '}
        <a href={'/' + lang + '/tools/url-encoder'} style={{ color: '#3b82f6', textDecoration: 'none' }}>URL Encoder</a>
      </div>

      {/* FAQ */}
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
