'use client';

import React from 'react';

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'TanStack Query vs SWR 2025: Data Fetching Libraries Compared',
    intro: 'TanStack Query (formerly React Query) and SWR are the two leading data fetching libraries for React. Both solve caching, synchronization, and background updates, but have different philosophies. This comparison helps you choose the right one for your 2025 projects.',
    
    tldrTitle: 'TL;DR - Quick Summary',
    tldrContent: 'TanStack Query offers more features, better DevTools, and supports multiple frameworks. SWR is simpler, lighter, and from Vercel. Choose TanStack Query for complex apps with advanced caching needs; choose SWR for simpler apps and Vercel ecosystem projects.',
    
    takeawaysTitle: 'Key Takeaways',
    takeaway1: 'TanStack Query supports React, Vue, Svelte, Solid - SWR is React-only',
    takeaway2: 'TanStack Query has more powerful caching and infinite scroll features',
    takeaway3: 'SWR is ~3KB smaller and simpler to configure',
    takeaway4: 'Both provide excellent TypeScript support and DevTools',
    takeaway5: 'TanStack Query has better mutation handling and optimistic updates',
    takeaway6: 'SWR integrates seamlessly with Next.js and Vercel ecosystem',
    
    whatIsTanStackTitle: 'What is TanStack Query?',
    whatIsTanStackContent: 'TanStack Query (formerly React Query) is a powerful asynchronous state management library. Created by Tanner Linsley in 2019, it handles caching, synchronization, background updates, and pagination with minimal configuration. Now supports multiple frameworks including React, Vue, Svelte, and Solid.',
    
    whatIsSWRTitle: 'What is SWR?',
    whatIsSWRContent: 'SWR (stale-while-revalidate) is a React Hooks library for data fetching created by Vercel in 2019. Named after the HTTP cache invalidation strategy, it focuses on simplicity and performance. SWR provides a minimal API with powerful features like automatic revalidation and real-time experience.',
    
    performanceTitle: 'Performance & Bundle Size',
    performanceIntro: 'Comparison of bundle size and runtime performance:',
    
    featuresTitle: 'Feature Comparison',
    featuresIntro: 'Comprehensive feature comparison:',
    
    codeExampleTitle: 'Code Examples',
    codeExampleIntro: 'See how both libraries handle common data fetching patterns:',
    
    tanstackExample: 'TanStack Query',
    swrExample: 'SWR',
    
    cachingTitle: 'Caching Strategies',
    cachingIntro: 'How each library handles data caching:',
    
    devToolsTitle: 'Developer Experience',
    devToolsIntro: 'DevTools and debugging capabilities:',
    
    migrationTitle: 'Migration Guide',
    migrationIntro: 'Switching between libraries:',
    
    whenToUseTitle: 'When to Use Each',
    tanstackBestFor: 'Use TanStack Query When:',
    swrBestFor: 'Use SWR When:',
    
    conclusionTitle: 'Conclusion',
    conclusionContent: 'In 2025, both TanStack Query and SWR are excellent choices for data fetching. TanStack Query wins for complex applications with advanced caching needs, mutations, and multi-framework support. SWR excels in simplicity and Vercel ecosystem integration. Most teams choose based on existing stack: Next.js/Vercel teams prefer SWR, others often choose TanStack Query for its comprehensive features.',
    
    faq1q: 'Can I use TanStack Query with Next.js?',
    faq1a: 'Yes! TanStack Query works great with Next.js, including App Router. Use @tanstack/react-query-next-experimental for streaming SSR support. Many Next.js apps use TanStack Query over SWR for its advanced features.',
    
    faq2q: 'Is SWR faster than TanStack Query?',
    faq2a: 'Runtime performance is similar for basic use cases. SWR has a smaller bundle size (~3KB less). TanStack Query may have slightly more overhead due to more features, but the difference is negligible in production apps.',
    
    faq3q: 'Which has better TypeScript support?',
    faq3a: 'Both have excellent TypeScript support. TanStack Query v5 improved type inference significantly. SWR also provides great types. You\'ll get full type safety with either choice.',
    
    faq4q: 'Can I migrate from SWR to TanStack Query?',
    faq4a: 'Yes, migration is straightforward. Both use similar concepts (keys, fetchers, caching). TanStack Query provides a migration guide. Plan for 1-2 days to migrate a medium-sized app.',
    
    faq5q: 'Which is better for infinite scrolling?',
    faq5a: 'TanStack Query has more powerful infinite query support with useInfiniteQuery, including bidirectional scrolling and better prefetching. SWR supports infinite loading but with fewer features.',
    
    faq6q: 'Do I need these libraries with Server Components?',
    faq6a: 'For purely server-rendered content, you may not need them. However, they\'re still valuable for client-side interactions, real-time updates, and interactive features. Use RSC for initial load, these libraries for client-side state.',
    
    faq7q: 'Which handles mutations better?',
    faq7a: 'TanStack Query has superior mutation handling with useMutation, optimistic updates, and automatic cache invalidation. SWR supports mutations but requires more manual configuration for complex scenarios.',
    
    faq8q: 'What about React 19 and use() hook?',
    faq8a: 'React 19\'s use() hook is for reading resources in components, not a replacement for these libraries. TanStack Query and SWR still provide caching, background updates, and synchronization that use() doesn\'t handle.',
    
    tryTools: 'Try Our Related Tools',
  },
  zh: {
    title: 'TanStack Query vs SWR 2025：数据获取库对比',
    intro: 'TanStack Query（前身为React Query）和SWR是React的两个领先数据获取库。两者都解决了缓存、同步和后台更新，但有不同的理念。本比较帮助你为2025年的项目选择合适的工具。',
    
    tldrTitle: 'TL;DR - 快速总结',
    tldrContent: 'TanStack Query提供更多功能、更好的DevTools，并支持多个框架。SWR更简单、更轻量，来自Vercel。复杂应用和高级缓存需求选择TanStack Query；简单应用和Vercel生态系统项目选择SWR。',
    
    takeawaysTitle: '核心要点',
    takeaway1: 'TanStack Query支持React、Vue、Svelte、Solid - SWR仅支持React',
    takeaway2: 'TanStack Query有更强大的缓存和无限滚动功能',
    takeaway3: 'SWR体积小约3KB，配置更简单',
    takeaway4: '两者都提供出色的TypeScript支持和DevTools',
    takeaway5: 'TanStack Query有更好的mutation处理和乐观更新',
    takeaway6: 'SWR与Next.js和Vercel生态系统无缝集成',
    
    whatIsTanStackTitle: '什么是TanStack Query？',
    whatIsTanStackContent: 'TanStack Query（前身为React Query）是一个强大的异步状态管理库。由Tanner Linsley于2019年创建，它以最小配置处理缓存、同步、后台更新和分页。现在支持多个框架，包括React、Vue、Svelte和Solid。',
    
    whatIsSWRTitle: '什么是SWR？',
    whatIsSWRContent: 'SWR（stale-while-revalidate）是Vercel于2019年创建的用于数据获取的React Hooks库。以HTTP缓存失效策略命名，它专注于简单性和性能。SWR提供极简API，具有自动重新验证和实时体验等强大功能。',
    
    performanceTitle: '性能与包大小',
    performanceIntro: '包大小和运行时性能对比：',
    
    featuresTitle: '功能对比',
    featuresIntro: '全面的功能比较：',
    
    codeExampleTitle: '代码示例',
    codeExampleIntro: '看看两个库如何处理常见的数据获取模式：',
    
    tanstackExample: 'TanStack Query',
    swrExample: 'SWR',
    
    cachingTitle: '缓存策略',
    cachingIntro: '每个库如何处理数据缓存：',
    
    devToolsTitle: '开发者体验',
    devToolsIntro: 'DevTools和调试能力：',
    
    migrationTitle: '迁移指南',
    migrationIntro: '在库之间切换：',
    
    whenToUseTitle: '何时使用每种方案',
    tanstackBestFor: '使用TanStack Query的场景：',
    swrBestFor: '使用SWR的场景：',
    
    conclusionTitle: '结论',
    conclusionContent: '在2025年，TanStack Query和SWR都是数据获取的优秀选择。TanStack Query在具有高级缓存需求、mutations和多框架支持的复杂应用中胜出。SWR在简单性和Vercel生态系统集成方面表现出色。大多数团队根据现有技术栈选择：Next.js/Vercel团队偏好SWR，其他团队通常选择TanStack Query以获得全面的功能。',
    
    faq1q: '我可以在Next.js中使用TanStack Query吗？',
    faq1a: '可以！TanStack Query与Next.js配合很好，包括App Router。使用@tanstack/react-query-next-experimental获得流式SSR支持。许多Next.js应用因TanStack Query的高级功能而选择它而非SWR。',
    
    faq2q: 'SWR比TanStack Query快吗？',
    faq2a: '基本用例的运行时性能相似。SWR的包大小更小（约少3KB）。TanStack Query可能因功能更多而略有开销，但在生产应用中差异可以忽略不计。',
    
    faq3q: '哪个TypeScript支持更好？',
    faq3a: '两者都有出色的TypeScript支持。TanStack Query v5显著改进了类型推断。SWR也提供了很好的类型。无论选择哪个，你都会获得完整的类型安全。',
    
    faq4q: '我可以从SWR迁移到TanStack Query吗？',
    faq4a: '可以，迁移很直接。两者使用类似的概念（keys、fetchers、缓存）。TanStack Query提供迁移指南。计划1-2天迁移中等规模的应用。',
    
    faq5q: '哪个更适合无限滚动？',
    faq5a: 'TanStack Query通过useInfiniteQuery提供更强大的无限查询支持，包括双向滚动和更好的预取。SWR支持无限加载但功能较少。',
    
    faq6q: '使用Server Components还需要这些库吗？',
    faq6a: '对于纯服务器渲染的内容，可能不需要它们。但是，它们对于客户端交互、实时更新和交互功能仍然有价值。使用RSC进行初始加载，这些库用于客户端状态。',
    
    faq7q: '哪个mutation处理更好？',
    faq7a: 'TanStack Query通过useMutation、乐观更新和自动缓存失效提供了卓越的mutation处理。SWR支持mutations，但复杂场景需要更多手动配置。',
    
    faq8q: 'React 19的use() hook呢？',
    faq8a: 'React 19的use() hook用于在组件中读取资源，不是这些库的替代品。TanStack Query和SWR仍然提供use()不处理的缓存、后台更新和同步。',
    
    tryTools: '试试我们的相关工具',
  },
};

export default function TanStackQueryVSSWR({ lang }: { lang: string }) {
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
      
      <h3 style={h3Style}>{ct.whatIsTanStackTitle}</h3>
      <p style={pStyle}>{ct.whatIsTanStackContent}</p>

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
              [isZh ? '首次发布' : 'First Release', '2019 (React Query)', '2019'],
              [isZh ? '框架支持' : 'Framework Support', 'React, Vue, Svelte, Solid', 'React only'],
              [isZh ? '包大小 (gzip)' : 'Bundle Size (gzip)', '~13KB', '~10KB'],
              [isZh ? '核心API' : 'Core API', 'useQuery, useMutation', 'useSWR, useSWRMutation'],
              [isZh ? '缓存策略' : 'Caching Strategy', 'Query keys', 'SWR strategy'],
              [isZh ? 'TypeScript' : 'TypeScript', 'Excellent', 'Excellent'],
              [isZh ? 'DevTools' : 'DevTools', 'Standalone app', 'Browser extension'],
              [isZh ? '维护者' : 'Maintainer', 'TanStack', 'Vercel'],
            ].map(([feature, tanstack, swr], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{feature}</td>
                <td style={{ ...tdStyle, color: '#f59e0b' }}>{tanstack}</td>
                <td style={tdStyle}>{swr}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Performance */}
      <h2 style={h2Style}>{ct.performanceTitle}</h2>
      <p style={pStyle}>{ct.performanceIntro}</p>

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
              [isZh ? '包大小 (min+gzip)' : 'Bundle (min+gzip)', '~13KB', '~10KB'],
              [isZh ? '首次渲染时间' : 'First Render', '~2ms', '~1.5ms'],
              [isZh ? '内存占用' : 'Memory Usage', 'Medium', 'Low'],
              [isZh ? '重新渲染次数' : 'Re-renders', 'Optimized', 'Optimized'],
              [isZh ? 'DevTools开销' : 'DevTools Overhead', 'Separate app', 'Panel in DevTools'],
              [isZh ? 'SSR支持' : 'SSR Support', '✓ Excellent', '✓ Excellent'],
            ].map(([metric, tanstack, swr], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{metric}</td>
                <td style={tdStyle}>{tanstack}</td>
                <td style={tdStyle}>{swr}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Code Examples */}
      <h2 style={h2Style}>{ct.codeExampleTitle}</h2>
      <p style={pStyle}>{ct.codeExampleIntro}</p>

      <h3 style={{ ...h3Style, color: '#f59e0b' }}>{ct.tanstackExample}</h3>
      <pre style={codeStyle}><code>{`// TanStack Query - Basic Usage
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// Fetching data
function UserList() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['users'],
    queryFn: () => fetch('/api/users').then(r => r.json()),
  });
  
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  
  return (
    <ul>
      {data.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}

// Mutation with cache invalidation
function CreateUser() {
  const queryClient = useQueryClient();
  
  const mutation = useMutation({
    mutationFn: (newUser) => 
      fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify(newUser),
      }).then(r => r.json()),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
  
  return (
    <button onClick={() => mutation.mutate({ name: 'John' })}>
      Create User
    </button>
  );
}

// Infinite scroll
function InfiniteUserList() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['users'],
    queryFn: ({ pageParam = 0 }) => 
      fetch(\`/api/users?page=\${pageParam}\`).then(r => r.json()),
    getNextPageParam: (lastPage, pages) => lastPage.nextCursor,
  });
  
  return (
    <div>
      {data?.pages.map((page, i) => (
        <React.Fragment key={i}>
          {page.users.map(user => (
            <div key={user.id}>{user.name}</div>
          ))}
        </React.Fragment>
      ))}
      <button
        onClick={() => fetchNextPage()}
        disabled={!hasNextPage || isFetchingNextPage}
      >
        {isFetchingNextPage ? 'Loading...' : 'Load More'}
      </button>
    </div>
  );
}`}</code></pre>

      <h3 style={{ ...h3Style, color: '#0070f3' }}>{ct.swrExample}</h3>
      <pre style={codeStyle}><code>{`// SWR - Basic Usage
import useSWR, { useSWRMutation } from 'swr';
import useSWRInfinite from 'swr/infinite';

// Fetcher function
const fetcher = (url) => fetch(url).then(r => r.json());

// Fetching data
function UserList() {
  const { data, error, isLoading } = useSWR('/api/users', fetcher);
  
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  
  return (
    <ul>
      {data.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}

// Mutation with cache invalidation
function CreateUser() {
  const { trigger } = useSWRMutation(
    '/api/users',
    (url, { arg }) => fetch(url, {
      method: 'POST',
      body: JSON.stringify(arg),
    }).then(r => r.json())
  );
  
  return (
    <button onClick={() => trigger({ name: 'John' })}>
      Create User
    </button>
  );
}

// Infinite scroll
function InfiniteUserList() {
  const getKey = (pageIndex, previousPageData) => {
    if (previousPageData && !previousPageData.length) return null;
    return \`/api/users?page=\${pageIndex}\`;
  };
  
  const { data, size, setSize, isLoadingMore } = useSWRInfinite(
    getKey,
    fetcher
  );
  
  return (
    <div>
      {data?.map((users, i) => (
        <React.Fragment key={i}>
          {users.map(user => (
            <div key={user.id}>{user.name}</div>
          ))}
        </React.Fragment>
      ))}
      <button
        onClick={() => setSize(size + 1)}
        disabled={isLoadingMore}
      >
        {isLoadingMore ? 'Loading...' : 'Load More'}
      </button>
    </div>
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
              [isZh ? '自动缓存' : 'Auto Caching', '✓', '✓'],
              [isZh ? '后台更新' : 'Background Updates', '✓', '✓'],
              [isZh ? '窗口聚焦重获取' : 'Window Focus Refetch', '✓', '✓'],
              [isZh ? '乐观更新' : 'Optimistic Updates', '✓ Advanced', '✓ Basic'],
              [isZh ? '无限滚动' : 'Infinite Scroll', '✓ useInfiniteQuery', '✓ useSWRInfinite'],
              [isZh ? 'Mutation支持' : 'Mutation Support', '✓ useMutation', '✓ useSWRMutation'],
              [isZh ? '并行查询' : 'Parallel Queries', '✓ useQueries', '✓ Manual'],
              [isZh ? '依赖查询' : 'Dependent Queries', '✓', '✓'],
              [isZh ? '预取' : 'Prefetching', '✓', '✓'],
              [isZh ? 'DevTools' : 'DevTools', '✓ Standalone', '✓ Extension'],
              [isZh ? '多框架' : 'Multi-framework', '✓', '✗'],
              [isZh ? 'SSR/SSG' : 'SSR/SSG', '✓ Hydration', '✓ Hydration'],
            ].map(([feature, tanstack, swr], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{feature}</td>
                <td style={tdStyle}>{tanstack}</td>
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
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#f59e0b' }}>{ct.tanstackBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? '复杂应用状态管理' : 'Complex app state management'}</li>
            <li>{isZh ? '高级缓存需求' : 'Advanced caching needs'}</li>
            <li>{isZh ? '多框架项目' : 'Multi-framework projects'}</li>
            <li>{isZh ? '复杂mutations' : 'Complex mutations'}</li>
            <li>{isZh ? '双向无限滚动' : 'Bidirectional infinite scroll'}</li>
            <li>{isZh ? '需要独立DevTools' : 'Need standalone DevTools'}</li>
            <li>{isZh ? '企业级应用' : 'Enterprise applications'}</li>
          </ul>
        </div>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #0070f3' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#0070f3' }}>{ct.swrBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? 'Next.js/Vercel项目' : 'Next.js/Vercel projects'}</li>
            <li>{isZh ? '简单的数据获取' : 'Simple data fetching'}</li>
            <li>{isZh ? 'React-only应用' : 'React-only apps'}</li>
            <li>{isZh ? '快速原型开发' : 'Rapid prototyping'}</li>
            <li>{isZh ? '小包大小优先' : 'Small bundle size priority'}</li>
            <li>{isZh ? 'Vercel生态系统' : 'Vercel ecosystem'}</li>
          </ul>
        </div>
      </div>

      {/* Conclusion */}
      <h2 style={h2Style}>{ct.conclusionTitle}</h2>
      <p style={pStyle}>{ct.conclusionContent}</p>

      {/* CTA */}
      <div style={{ padding: 20, background: 'linear-gradient(135deg, rgba(59,130,246,0.1), rgba(139,92,246,0.1))', borderRadius: 12, border: '1px solid rgba(59,130,246,0.3)', textAlign: 'center', marginTop: 30, marginBottom: 30 }}>
        <p style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{ct.tryTools}</p>
        <a href={`/${lang}/tools/json-formatter`} style={{ color: '#3b82f6', textDecoration: 'none' }}>JSON Formatter</a> • {' '}
        <a href={`/${lang}/tools/uuid-generator`} style={{ color: '#3b82f6', textDecoration: 'none' }}>UUID Generator</a> • {' '}
        <a href={`/${lang}/tools/jwt-decoder`} style={{ color: '#3b82f6', textDecoration: 'none' }}>JWT Decoder</a>
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
