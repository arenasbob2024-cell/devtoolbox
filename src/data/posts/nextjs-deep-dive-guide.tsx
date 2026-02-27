'use client';
import React from 'react';

const translations = {
  en: {
    title: 'Next.js Deep Dive Guide 2026: App Router, Server Components, and Production Patterns',
    description:
      'A comprehensive guide to Next.js covering the App Router, React Server Components, data fetching, Server Actions, image optimization, middleware, and deployment strategies for production applications.',
    tldr:
      'Next.js 15 App Router is the recommended approach for new projects. Use Server Components by default, add "use client" only when you need interactivity. Server Actions replace API routes for mutations. ISR with revalidatePath gives you the best of static and dynamic.',
  },
  zh: {
    title: 'Next.js 深度指南 2026：App Router、服务端组件与生产模式',
    description:
      '全面介绍 Next.js，涵盖 App Router、React 服务端组件、数据获取、Server Actions、图片优化、中间件和生产部署策略。',
    tldr:
      'Next.js 15 App Router 是新项目的推荐方案。默认使用服务端组件，只在需要交互时添加 "use client"。Server Actions 替代 API 路由处理数据变更。结合 revalidatePath 的 ISR 兼顾静态与动态的优势。',
  },
};

export default function NextjsDeepDiveGuide({ lang }: { lang: string }) {
  const t = translations[lang as keyof typeof translations] || translations.en;
  const isZh = lang === 'zh';

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: isZh ? 'App Router 和 Pages Router 有什么区别？' : 'What is the difference between App Router and Pages Router?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: isZh
            ? 'App Router 使用 React 服务端组件（默认）、嵌套布局、流式传输和 Server Actions。Pages Router 使用 getStaticProps/getServerSideProps 的传统模式。新项目推荐 App Router，旧项目可以逐步迁移。'
            : 'App Router uses React Server Components by default, nested layouts, streaming, and Server Actions. Pages Router uses the traditional getStaticProps/getServerSideProps pattern. App Router is recommended for new projects; existing apps can migrate incrementally.',
        },
      },
      {
        '@type': 'Question',
        name: isZh ? '什么时候应该使用 "use client"？' : 'When should I use the "use client" directive?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: isZh
            ? '当组件需要以下功能时使用 "use client"：useState/useEffect 等 React 钩子、onClick/onChange 等事件监听器、浏览器 API（window、localStorage）、第三方客户端库。所有其他组件应保持为服务端组件以减少 JS 包大小。'
            : 'Use "use client" when a component needs: React hooks like useState/useEffect, event listeners like onClick/onChange, browser APIs (window, localStorage), or third-party client-side libraries. All other components should remain Server Components to reduce JS bundle size.',
        },
      },
      {
        '@type': 'Question',
        name: isZh ? 'Next.js 15 的缓存机制是如何工作的？' : 'How does caching work in Next.js 15?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: isZh
            ? 'Next.js 15 改变了默认缓存行为：fetch 请求默认不再缓存（从 force-cache 改为 no-store）。使用 cache: "force-cache" 或 next.revalidate 显式控制缓存。Route handlers 也默认不缓存。这使缓存行为更可预测。'
            : 'Next.js 15 changed default caching: fetch requests are no longer cached by default (changed from force-cache to no-store). Use cache: "force-cache" or next.revalidate to opt into caching explicitly. Route handlers are also uncached by default. This makes caching behavior more predictable.',
        },
      },
      {
        '@type': 'Question',
        name: isZh ? 'React 服务端组件（RSC）如何提升性能？' : 'How do React Server Components improve performance?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: isZh
            ? 'RSC 在服务器上渲染，不向客户端发送 JavaScript。这意味着：更小的 JS 包（组件代码不会被打包）、更快的 FCP（服务器直接发送 HTML）、安全的服务器端数据获取（可直接访问数据库和 API 密钥）、零客户端重新渲染（对于纯展示内容）。'
            : 'RSCs render on the server and send zero JavaScript to the client. This means: smaller JS bundles (component code is not bundled), faster FCP (server sends HTML directly), secure server-side data fetching (direct database access, API keys stay on server), and zero client re-renders for purely presentational content.',
        },
      },
      {
        '@type': 'Question',
        name: isZh ? 'Server Actions 是什么，如何使用它们？' : 'What are Server Actions and how do I use them?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: isZh
            ? 'Server Actions 是运行在服务器上的异步函数，用 "use server" 指令标记。它们可以直接在表单的 action 属性或事件处理器中调用。适合处理表单提交、数据库操作和文件上传，无需手动创建 API 路由。'
            : 'Server Actions are async functions marked with the "use server" directive that run on the server. They can be called directly from form action attributes or event handlers. They are ideal for form submissions, database mutations, and file uploads without manually creating API routes.',
        },
      },
      {
        '@type': 'Question',
        name: isZh ? 'ISR（增量静态再生）是什么？' : 'What is ISR (Incremental Static Regeneration)?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: isZh
            ? 'ISR 允许你在构建后更新静态页面，无需重建整个站点。使用 next.revalidate 选项设置重新验证间隔（秒），或使用 revalidatePath/revalidateTag 按需触发重新验证。结合了静态页面的性能和动态内容的灵活性。'
            : 'ISR lets you update static pages after build without rebuilding the entire site. Use the next.revalidate option to set a revalidation interval in seconds, or use revalidatePath/revalidateTag to trigger on-demand revalidation. It combines the performance of static pages with the flexibility of dynamic content.',
        },
      },
      {
        '@type': 'Question',
        name: isZh ? 'Next.js 中间件有什么用途？' : 'What can I use Next.js Middleware for?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: isZh
            ? 'Next.js 中间件在请求完成前运行，适用于：身份验证检查和重定向、A/B 测试（地理位置/cookies）、速率限制、请求头修改、国际化（根据语言重定向）、功能标志。中间件在 Edge Runtime 运行，延迟极低。'
            : 'Next.js Middleware runs before a request is completed and is suitable for: authentication checks and redirects, A/B testing (geolocation/cookies), rate limiting, request header modification, internationalization (locale-based redirects), and feature flags. Middleware runs on the Edge Runtime for minimal latency.',
        },
      },
      {
        '@type': 'Question',
        name: isZh ? 'Next.js 应该部署在 Vercel 还是自托管？' : 'Should I deploy Next.js on Vercel or self-host?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: isZh
            ? 'Vercel 提供最佳的 Next.js 集成，支持 ISR、Edge Functions、Analytics 和零配置部署，适合大多数项目。自托管（standalone 输出模式 + Docker）适合需要完全控制基础设施、有合规要求或成本敏感的项目。两种方式都完全支持所有 Next.js 功能。'
            : 'Vercel offers the best Next.js integration with ISR, Edge Functions, Analytics, and zero-config deployments, and is suitable for most projects. Self-hosting (standalone output mode + Docker) is ideal when you need full infrastructure control, have compliance requirements, or are cost-sensitive. Both fully support all Next.js features.',
        },
      },
    ],
  };

  const h2Style: React.CSSProperties = {
    fontSize: '1.5rem',
    fontWeight: 700,
    marginTop: '2.5rem',
    marginBottom: '1rem',
    paddingBottom: '0.5rem',
    borderBottom: '2px solid #e2e8f0',
  };

  const h3Style: React.CSSProperties = {
    fontSize: '1.25rem',
    fontWeight: 600,
    marginTop: '2rem',
    marginBottom: '0.75rem',
  };

  const pStyle: React.CSSProperties = {
    marginBottom: '1rem',
    lineHeight: '1.75',
    fontSize: '1rem',
  };

  const preStyle: React.CSSProperties = {
    backgroundColor: '#0f172a',
    color: '#e2e8f0',
    padding: '1.25rem',
    borderRadius: '0.5rem',
    overflowX: 'auto',
    fontSize: '0.85rem',
    lineHeight: '1.6',
    marginBottom: '1.5rem',
    fontFamily: '"Fira Code", "Cascadia Code", "Consolas", monospace',
  };

  const codeInlineStyle: React.CSSProperties = {
    backgroundColor: 'rgba(99,102,241,0.1)',
    color: '#6366f1',
    padding: '0.125rem 0.375rem',
    borderRadius: '0.25rem',
    fontFamily: 'monospace',
    fontSize: '0.875em',
  };

  const tableStyle: React.CSSProperties = {
    width: '100%',
    borderCollapse: 'collapse',
    marginBottom: '1.5rem',
    fontSize: '0.9rem',
  };

  const thStyle: React.CSSProperties = {
    backgroundColor: '#1e293b',
    color: '#f1f5f9',
    padding: '0.75rem 1rem',
    textAlign: 'left',
    border: '1px solid #334155',
    fontWeight: 600,
  };

  const tdStyle: React.CSSProperties = {
    padding: '0.625rem 1rem',
    border: '1px solid #334155',
    verticalAlign: 'top',
    lineHeight: '1.6',
  };

  const tdAltStyle: React.CSSProperties = {
    ...tdStyle,
    backgroundColor: 'rgba(30,41,59,0.3)',
  };

  const calloutStyle: React.CSSProperties = {
    backgroundColor: '#fff7ed',
    borderLeft: '4px solid #f97316',
    padding: '1rem 1.25rem',
    borderRadius: '0 0.5rem 0.5rem 0',
    marginBottom: '1.5rem',
  };

  const tipStyle: React.CSSProperties = {
    backgroundColor: '#f0fdf4',
    borderLeft: '4px solid #22c55e',
    padding: '1rem 1.25rem',
    borderRadius: '0 0.5rem 0.5rem 0',
    marginBottom: '1.5rem',
  };

  return (
    <article style={{ maxWidth: 'none' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* TL;DR Box */}
      <div
        style={{
          background: '#f0f9ff',
          borderLeft: '4px solid #0ea5e9',
          padding: '1.25rem 1.5rem',
          borderRadius: '0 0.5rem 0.5rem 0',
          marginBottom: '2rem',
        }}
      >
        <p style={{ fontWeight: 700, marginBottom: '0.5rem', color: '#0369a1', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          {isZh ? 'TL;DR — 核心要点' : 'TL;DR — Key Summary'}
        </p>
        <p style={{ margin: 0, lineHeight: '1.7', color: '#0c4a6e' }}>{t.tldr}</p>
      </div>

      {/* Key Takeaways */}
      <div
        style={{
          background: '#f8fafc',
          border: '1px solid #e2e8f0',
          padding: '1.25rem 1.5rem',
          borderRadius: '0.5rem',
          marginBottom: '2rem',
        }}
      >
        <p style={{ fontWeight: 700, marginBottom: '0.75rem', fontSize: '1rem', color: '#0f172a' }}>
          {isZh ? '关键要点' : 'Key Takeaways'}
        </p>
        <ul style={{ margin: 0, paddingLeft: '1.5rem', lineHeight: '1.8' }}>
          {isZh ? (
            <>
              <li>App Router 默认使用 React 服务端组件，减少客户端 JS，提升性能</li>
              <li>基于文件的路由系统：layout.tsx、loading.tsx、error.tsx 处理不同 UI 状态</li>
              <li>数据获取直接在组件中使用 async/await，通过 fetch 选项控制缓存策略</li>
              <li>Server Actions 简化表单处理和数据变更，无需手写 API 路由</li>
              <li>next/image 和 next/font 自动优化媒体资源，提升 Core Web Vitals</li>
              <li>中间件在 Edge Runtime 运行，适合身份验证和 A/B 测试</li>
              <li>standalone 输出模式支持 Docker 自托管部署</li>
            </>
          ) : (
            <>
              <li>App Router uses React Server Components by default, reducing client JS and improving performance</li>
              <li>File-based routing: layout.tsx, loading.tsx, error.tsx handle different UI states declaratively</li>
              <li>Data fetching uses async/await directly in components with fetch options to control caching</li>
              <li>Server Actions simplify form handling and mutations without writing API routes manually</li>
              <li>next/image and next/font automatically optimize media assets for better Core Web Vitals</li>
              <li>Middleware runs on the Edge Runtime and is ideal for authentication and A/B testing</li>
              <li>Standalone output mode enables Docker-based self-hosted deployment</li>
            </>
          )}
        </ul>
      </div>

      {/* Section 1: App Router vs Pages Router */}
      <h2 style={h2Style}>
        {isZh ? '1. App Router vs Pages Router：如何选择' : '1. App Router vs Pages Router: When to Use Each'}
      </h2>
      <p style={pStyle}>
        {isZh
          ? 'Next.js 13 引入了 App Router，这是一种基于 React Server Components 构建的新路由范式。它与原有的 Pages Router 并存，允许逐步迁移。理解两者的差异对于做出正确的架构决策至关重要。'
          : 'Next.js 13 introduced the App Router, a new routing paradigm built on React Server Components. It coexists with the original Pages Router, enabling incremental migration. Understanding their differences is critical for making the right architectural decisions.'}
      </p>

      <div style={{ overflowX: 'auto', marginBottom: '1.5rem' }}>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '特性' : 'Feature'}</th>
              <th style={thStyle}>{isZh ? 'App Router (推荐)' : 'App Router (Recommended)'}</th>
              <th style={thStyle}>{isZh ? 'Pages Router (旧版)' : 'Pages Router (Legacy)'}</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '默认渲染' : 'Default rendering', 'React Server Components', isZh ? '客户端组件' : 'Client Components'],
              [isZh ? '数据获取' : 'Data fetching', 'async/await + fetch cache', 'getStaticProps / getServerSideProps'],
              [isZh ? '布局' : 'Layouts', 'layout.tsx (嵌套)', '_app.tsx (全局)'],
              [isZh ? '加载状态' : 'Loading states', 'loading.tsx (Suspense)', isZh ? '手动实现' : 'Manual implementation'],
              [isZh ? '错误处理' : 'Error handling', 'error.tsx (Error Boundary)', isZh ? '手动实现' : 'Manual implementation'],
              [isZh ? 'Server Actions' : 'Server Actions', isZh ? '原生支持' : 'Native support', isZh ? '需要 API 路由' : 'Requires API routes'],
              [isZh ? '流式传输' : 'Streaming', isZh ? '内置支持' : 'Built-in', isZh ? '不支持' : 'Not supported'],
              [isZh ? '推荐场景' : 'Best for', isZh ? '所有新项目' : 'All new projects', isZh ? '维护现有项目' : 'Maintaining existing apps'],
            ].map(([feature, appRouter, pagesRouter], i) => (
              <tr key={i}>
                <td style={i % 2 === 0 ? tdStyle : tdAltStyle}><strong>{feature}</strong></td>
                <td style={i % 2 === 0 ? { ...tdStyle, color: '#16a34a' } : { ...tdAltStyle, color: '#16a34a' }}>{appRouter}</td>
                <td style={i % 2 === 0 ? tdStyle : tdAltStyle}>{pagesRouter}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h3 style={h3Style}>{isZh ? '迁移路径：从 Pages Router 到 App Router' : 'Migration Path: Pages Router to App Router'}</h3>
      <p style={pStyle}>
        {isZh
          ? 'Next.js 支持在同一项目中同时使用两种路由器。迁移策略是逐页进行，从非关键路由开始。'
          : 'Next.js supports using both routers in the same project. The migration strategy is to proceed page by page, starting with non-critical routes.'}
      </p>
      <pre style={preStyle}><code>{
'// Directory structure showing coexistence\n' +
'my-app/\n' +
'  app/                    // App Router\n' +
'    layout.tsx            // Root layout\n' +
'    page.tsx              // Home page (migrated)\n' +
'    dashboard/\n' +
'      layout.tsx          // Dashboard layout\n' +
'      page.tsx            // Dashboard page (migrated)\n' +
'  pages/                  // Pages Router (still active)\n' +
'    _app.tsx              // Global wrapper\n' +
'    old-feature.tsx       // Not yet migrated\n' +
'    api/\n' +
'      legacy-endpoint.ts  // API route (still works)\n' +
'\n' +
'// Migration checklist:\n' +
'// 1. Move page.tsx from pages/ to app/\n' +
'// 2. Replace getStaticProps with async component + fetch\n' +
'// 3. Replace getServerSideProps with async Server Component\n' +
'// 4. Add "use client" to components with hooks/events\n' +
'// 5. Create layout.tsx for shared UI\n' +
'// 6. Replace _document.tsx with root layout metadata'
      }</code></pre>

      {/* Section 2: Server vs Client Components */}
      <h2 style={h2Style}>
        {isZh ? '2. Server Components vs Client Components' : '2. Server Components vs Client Components'}
      </h2>
      <p style={pStyle}>
        {isZh
          ? 'React Server Components（RSC）是 App Router 的核心。理解服务端组件和客户端组件的边界对于编写高性能的 Next.js 应用至关重要。'
          : 'React Server Components (RSC) are the cornerstone of the App Router. Understanding the boundary between Server and Client Components is essential for writing high-performance Next.js applications.'}
      </p>

      <h3 style={h3Style}>{isZh ? '服务端组件（默认）' : 'Server Components (Default)'}</h3>
      <p style={pStyle}>
        {isZh
          ? '服务端组件在服务器上渲染，不向客户端发送任何 JavaScript。它们可以直接访问数据库、文件系统和私密 API。'
          : 'Server Components render on the server and send zero JavaScript to the client. They can directly access databases, file systems, and private APIs.'}
      </p>
      <pre style={preStyle}><code>{
'// app/dashboard/page.tsx - Server Component (no "use client")\n' +
'import { db } from "@/lib/db";\n' +
'import { cache } from "react";\n' +
'\n' +
'// cache() deduplicates requests across the render tree\n' +
'const getUser = cache(async (id: string) => {\n' +
'  return db.user.findUnique({ where: { id } });\n' +
'});\n' +
'\n' +
'export default async function DashboardPage() {\n' +
'  // Direct database access - secure, no API needed\n' +
'  const user = await getUser("user_123");\n' +
'  const stats = await db.analytics.findMany({\n' +
'    where: { userId: user.id },\n' +
'    orderBy: { date: "desc" },\n' +
'    take: 30,\n' +
'  });\n' +
'\n' +
'  return (\n' +
'    <div>\n' +
'      <h1>Welcome, {user.name}</h1>\n' +
'      {/* Client component for interactivity */}\n' +
'      <StatsChart data={stats} />\n' +
'    </div>\n' +
'  );\n' +
'}'
      }</code></pre>

      <h3 style={h3Style}>{isZh ? '客户端组件（"use client"）' : 'Client Components ("use client")'}</h3>
      <p style={pStyle}>
        {isZh
          ? '"use client" 指令将组件及其子树标记为客户端渲染。只在真正需要浏览器能力时使用它。'
          : 'The "use client" directive marks a component and its subtree as client-rendered. Use it only when you genuinely need browser capabilities.'}
      </p>
      <pre style={preStyle}><code>{
'"use client";\n' +
'\n' +
'// Must use "use client" when:\n' +
'// - Using useState, useEffect, useRef, useContext\n' +
'// - Adding event listeners (onClick, onChange, onSubmit)\n' +
'// - Using browser APIs (window, localStorage, navigator)\n' +
'// - Using third-party client-side libraries\n' +
'\n' +
'import { useState, useEffect } from "react";\n' +
'\n' +
'interface StatsChartProps {\n' +
'  data: { date: string; value: number }[];\n' +
'}\n' +
'\n' +
'export function StatsChart({ data }: StatsChartProps) {\n' +
'  const [activeIndex, setActiveIndex] = useState(0);\n' +
'  const [isVisible, setIsVisible] = useState(false);\n' +
'\n' +
'  useEffect(() => {\n' +
'    // Animate on mount - requires browser\n' +
'    setIsVisible(true);\n' +
'  }, []);\n' +
'\n' +
'  return (\n' +
'    <div\n' +
'      style={{ opacity: isVisible ? 1 : 0, transition: "opacity 0.3s" }}\n' +
'    >\n' +
'      {data.map((point, i) => (\n' +
'        <div\n' +
'          key={i}\n' +
'          onClick={() => setActiveIndex(i)}\n' +
'          style={{\n' +
'            background: i === activeIndex ? "#6366f1" : "#e2e8f0",\n' +
'            cursor: "pointer",\n' +
'          }}\n' +
'        >\n' +
'          {point.value}\n' +
'        </div>\n' +
'      ))}\n' +
'    </div>\n' +
'  );\n' +
'}'
      }</code></pre>

      <div style={calloutStyle}>
        <p style={{ margin: 0, fontWeight: 600, marginBottom: '0.25rem' }}>
          {isZh ? 'Component Boundary 规则' : 'Component Boundary Rule'}
        </p>
        <p style={{ margin: 0, fontSize: '0.9rem' }}>
          {isZh
            ? '"use client" 形成一个边界：该文件中的所有内容以及它导入的所有内容都变为客户端代码。将客户端组件放在组件树的叶子节点，保持服务端组件处理数据获取。'
            : '"use client" creates a boundary: everything in that file and everything it imports becomes client code. Keep client components at the leaves of the component tree, and let Server Components handle data fetching.'}
        </p>
      </div>

      {/* Section 3: File-based Routing */}
      <h2 style={h2Style}>
        {isZh ? '3. 文件系统路由：布局、模板与特殊文件' : '3. File-Based Routing: Layouts, Templates, and Special Files'}
      </h2>
      <p style={pStyle}>
        {isZh
          ? 'App Router 通过 app 目录中的文件和文件夹名称定义路由。特殊文件名约定控制每个路由段的行为。'
          : 'The App Router defines routes through file and folder names inside the app directory. Special filename conventions control behavior at each route segment.'}
      </p>

      <pre style={preStyle}><code>{
'app/\n' +
'  layout.tsx          // Required: root layout, wraps all pages\n' +
'  page.tsx            // Route: /\n' +
'  loading.tsx         // Automatic Suspense boundary\n' +
'  error.tsx           // Error boundary for this segment\n' +
'  not-found.tsx       // 404 for this segment\n' +
'  template.tsx        // Like layout but re-mounts on nav\n' +
'  global-error.tsx    // Root error boundary\n' +
'  blog/\n' +
'    layout.tsx        // Shared blog layout\n' +
'    page.tsx          // Route: /blog\n' +
'    [slug]/\n' +
'      page.tsx        // Route: /blog/:slug\n' +
'      opengraph-image.tsx  // OG image generation\n' +
'  (marketing)/        // Route group - no URL segment\n' +
'    about/\n' +
'      page.tsx        // Route: /about\n' +
'    pricing/\n' +
'      page.tsx        // Route: /pricing\n' +
'  @modal/             // Parallel route slot\n' +
'    (.)photo/[id]/    // Intercepted route\n' +
'      page.tsx'
      }</code></pre>

      <h3 style={h3Style}>{isZh ? 'Root Layout 必须包含的内容' : 'What the Root Layout Must Include'}</h3>
      <pre style={preStyle}><code>{
'// app/layout.tsx\n' +
'import type { Metadata } from "next";\n' +
'import { Inter } from "next/font/google";\n' +
'\n' +
'const inter = Inter({ subsets: ["latin"] });\n' +
'\n' +
'export const metadata: Metadata = {\n' +
'  title: {\n' +
'    template: "%s | My App",\n' +
'    default: "My App",\n' +
'  },\n' +
'  description: "My awesome application",\n' +
'  openGraph: {\n' +
'    type: "website",\n' +
'    siteName: "My App",\n' +
'  },\n' +
'};\n' +
'\n' +
'export default function RootLayout({\n' +
'  children,\n' +
'}: {\n' +
'  children: React.ReactNode;\n' +
'}) {\n' +
'  return (\n' +
'    <html lang="en">\n' +
'      <body className={inter.className}>\n' +
'        <Header />\n' +
'        <main>{children}</main>\n' +
'        <Footer />\n' +
'      </body>\n' +
'    </html>\n' +
'  );\n' +
'}'
      }</code></pre>

      <h3 style={h3Style}>{isZh ? 'loading.tsx 和 Suspense 流式传输' : 'loading.tsx and Suspense Streaming'}</h3>
      <p style={pStyle}>
        {isZh
          ? 'loading.tsx 自动将页面包裹在 React Suspense 中。服务器会立即发送 HTML 外壳，然后流式传输内容块。'
          : 'loading.tsx automatically wraps the page in a React Suspense boundary. The server immediately streams the HTML shell, then streams content chunks as they resolve.'}
      </p>
      <pre style={preStyle}><code>{
'// app/dashboard/loading.tsx\n' +
'// Shown instantly while dashboard/page.tsx loads\n' +
'export default function DashboardLoading() {\n' +
'  return (\n' +
'    <div style={{ padding: "2rem" }}>\n' +
'      <div style={{\n' +
'        height: "2rem",\n' +
'        width: "40%",\n' +
'        background: "#e2e8f0",\n' +
'        borderRadius: "0.25rem",\n' +
'        animation: "pulse 2s infinite"\n' +
'      }} />\n' +
'    </div>\n' +
'  );\n' +
'}\n' +
'\n' +
'// Fine-grained streaming with Suspense\n' +
'// app/dashboard/page.tsx\n' +
'import { Suspense } from "react";\n' +
'\n' +
'export default function DashboardPage() {\n' +
'  return (\n' +
'    <div>\n' +
'      {/* Renders immediately */}\n' +
'      <DashboardHeader />\n' +
'      \n' +
'      {/* Streams when data resolves */}\n' +
'      <Suspense fallback={<RevenueChartSkeleton />}>\n' +
'        <RevenueChart />\n' +
'      </Suspense>\n' +
'\n' +
'      <Suspense fallback={<LatestInvoicesSkeleton />}>\n' +
'        <LatestInvoices />\n' +
'      </Suspense>\n' +
'    </div>\n' +
'  );\n' +
'}'
      }</code></pre>

      {/* Section 4: Data Fetching */}
      <h2 style={h2Style}>
        {isZh ? '4. 数据获取：fetch、ISR 与动态路由' : '4. Data Fetching: fetch, ISR, and Dynamic Routes'}
      </h2>
      <p style={pStyle}>
        {isZh
          ? 'App Router 中的数据获取在服务端组件中使用扩展的 fetch API 完成。Next.js 扩展了原生 fetch，添加了细粒度的缓存和重新验证控制。'
          : 'Data fetching in the App Router is done in Server Components using an extended fetch API. Next.js extends the native fetch with fine-grained caching and revalidation control.'}
      </p>

      <h3 style={h3Style}>{isZh ? 'fetch 缓存策略' : 'fetch Caching Strategies'}</h3>
      <pre style={preStyle}><code>{
'// Next.js 15: fetch is NOT cached by default\n' +
'\n' +
'// 1. Static data (CDN cached indefinitely)\n' +
'const data = await fetch("https://api.example.com/static", {\n' +
'  cache: "force-cache",\n' +
'});\n' +
'\n' +
'// 2. Time-based revalidation (ISR)\n' +
'const posts = await fetch("https://api.example.com/posts", {\n' +
'  next: { revalidate: 3600 }, // Revalidate every hour\n' +
'});\n' +
'\n' +
'// 3. Tag-based revalidation\n' +
'const product = await fetch("https://api.example.com/products/1", {\n' +
'  next: { tags: ["product", "product-1"] },\n' +
'});\n' +
'\n' +
'// 4. Dynamic data (never cached)\n' +
'const userProfile = await fetch("https://api.example.com/me", {\n' +
'  cache: "no-store",\n' +
'  headers: { Authorization: "Bearer " + getToken() },\n' +
'});\n' +
'\n' +
'// Trigger on-demand revalidation from a Server Action\n' +
'import { revalidateTag, revalidatePath } from "next/cache";\n' +
'\n' +
'async function updateProduct(id: string, data: Partial<Product>) {\n' +
'  "use server";\n' +
'  await db.product.update({ where: { id }, data });\n' +
'  revalidateTag("product-" + id); // Invalidate cached product data\n' +
'  revalidatePath("/products");    // Revalidate product list page\n' +
'}'
      }</code></pre>

      <h3 style={h3Style}>{isZh ? 'generateStaticParams：SSG + 动态路由' : 'generateStaticParams: SSG with Dynamic Routes'}</h3>
      <pre style={preStyle}><code>{
'// app/blog/[slug]/page.tsx\n' +
'\n' +
'// Called at build time to pre-render pages\n' +
'export async function generateStaticParams() {\n' +
'  const posts = await fetch("https://api.example.com/posts").then(\n' +
'    (res) => res.json()\n' +
'  );\n' +
'\n' +
'  return posts.map((post: { slug: string }) => ({\n' +
'    slug: post.slug,\n' +
'  }));\n' +
'}\n' +
'\n' +
'// Optionally control what happens for slugs not in generateStaticParams\n' +
'// "blocking": generate on-demand and cache (default)\n' +
'// false: 404 for unknown slugs\n' +
'export const dynamicParams = true;\n' +
'\n' +
'// Metadata generation\n' +
'export async function generateMetadata({\n' +
'  params,\n' +
'}: {\n' +
'  params: { slug: string };\n' +
'}) {\n' +
'  const post = await getPost(params.slug);\n' +
'  return {\n' +
'    title: post.title,\n' +
'    description: post.excerpt,\n' +
'    openGraph: {\n' +
'      title: post.title,\n' +
'      images: [{ url: post.coverImage }],\n' +
'    },\n' +
'  };\n' +
'}\n' +
'\n' +
'export default async function BlogPost({\n' +
'  params,\n' +
'}: {\n' +
'  params: { slug: string };\n' +
'}) {\n' +
'  const post = await getPost(params.slug);\n' +
'  if (!post) notFound();\n' +
'\n' +
'  return (\n' +
'    <article>\n' +
'      <h1>{post.title}</h1>\n' +
'      <div dangerouslySetInnerHTML={{ __html: post.content }} />\n' +
'    </article>\n' +
'  );\n' +
'}'
      }</code></pre>

      {/* Section 5: Server Actions */}
      <h2 style={h2Style}>
        {isZh ? '5. Server Actions：表单处理与数据变更' : '5. Server Actions: Form Handling and Mutations'}
      </h2>
      <p style={pStyle}>
        {isZh
          ? 'Server Actions 是标记了 "use server" 的异步函数，直接在服务器上运行。它们消除了为简单的 CRUD 操作手动创建 API 路由的需要。'
          : 'Server Actions are async functions marked with "use server" that run directly on the server. They eliminate the need to manually create API routes for simple CRUD operations.'}
      </p>

      <h3 style={h3Style}>{isZh ? '基础 Server Action 与表单' : 'Basic Server Action with a Form'}</h3>
      <pre style={preStyle}><code>{
'// app/actions.ts\n' +
'"use server";\n' +
'\n' +
'import { revalidatePath } from "next/cache";\n' +
'import { redirect } from "next/navigation";\n' +
'import { z } from "zod";\n' +
'\n' +
'const CreatePostSchema = z.object({\n' +
'  title: z.string().min(3).max(100),\n' +
'  content: z.string().min(10),\n' +
'});\n' +
'\n' +
'export type ActionState = {\n' +
'  errors?: { title?: string[]; content?: string[] };\n' +
'  message?: string;\n' +
'};\n' +
'\n' +
'export async function createPost(\n' +
'  prevState: ActionState,\n' +
'  formData: FormData\n' +
'): Promise<ActionState> {\n' +
'  const validated = CreatePostSchema.safeParse({\n' +
'    title: formData.get("title"),\n' +
'    content: formData.get("content"),\n' +
'  });\n' +
'\n' +
'  if (!validated.success) {\n' +
'    return { errors: validated.error.flatten().fieldErrors };\n' +
'  }\n' +
'\n' +
'  try {\n' +
'    await db.post.create({ data: validated.data });\n' +
'  } catch (error) {\n' +
'    return { message: "Database error: Failed to create post." };\n' +
'  }\n' +
'\n' +
'  revalidatePath("/blog");\n' +
'  redirect("/blog");\n' +
'}'
      }</code></pre>

      <h3 style={h3Style}>{isZh ? '在客户端组件中使用 useFormState' : 'Using useFormState in Client Components'}</h3>
      <pre style={preStyle}><code>{
'"use client";\n' +
'\n' +
'import { useFormState, useFormStatus } from "react-dom";\n' +
'import { createPost, type ActionState } from "@/app/actions";\n' +
'\n' +
'function SubmitButton() {\n' +
'  const { pending } = useFormStatus();\n' +
'  return (\n' +
'    <button type="submit" disabled={pending}>\n' +
'      {pending ? "Creating..." : "Create Post"}\n' +
'    </button>\n' +
'  );\n' +
'}\n' +
'\n' +
'const initialState: ActionState = {};\n' +
'\n' +
'export function CreatePostForm() {\n' +
'  const [state, dispatch] = useFormState(createPost, initialState);\n' +
'\n' +
'  return (\n' +
'    <form action={dispatch}>\n' +
'      <div>\n' +
'        <label htmlFor="title">Title</label>\n' +
'        <input id="title" name="title" type="text" />\n' +
'        {state.errors?.title && (\n' +
'          <p style={{ color: "red" }}>{state.errors.title[0]}</p>\n' +
'        )}\n' +
'      </div>\n' +
'      <div>\n' +
'        <label htmlFor="content">Content</label>\n' +
'        <textarea id="content" name="content" />\n' +
'        {state.errors?.content && (\n' +
'          <p style={{ color: "red" }}>{state.errors.content[0]}</p>\n' +
'        )}\n' +
'      </div>\n' +
'      {state.message && (\n' +
'        <p style={{ color: "red" }}>{state.message}</p>\n' +
'      )}\n' +
'      <SubmitButton />\n' +
'    </form>\n' +
'  );\n' +
'}'
      }</code></pre>

      <div style={tipStyle}>
        <p style={{ margin: 0, fontWeight: 600, marginBottom: '0.25rem' }}>
          {isZh ? '最佳实践：Server Actions 与 API Routes' : 'Best Practice: Server Actions vs API Routes'}
        </p>
        <p style={{ margin: 0, fontSize: '0.9rem' }}>
          {isZh
            ? '对于从 Next.js 应用内部触发的表单提交和数据变更，优先使用 Server Actions。对于需要被外部系统（移动应用、第三方服务、Webhooks）调用的端点，继续使用 Route Handlers（app/api/route.ts）。'
            : 'Use Server Actions for form submissions and mutations triggered from within the Next.js app. Continue using Route Handlers (app/api/route.ts) for endpoints that need to be called by external systems like mobile apps, third-party services, or webhooks.'}
        </p>
      </div>

      {/* Section 6: Image and Font Optimization */}
      <h2 style={h2Style}>
        {isZh ? '6. 图片与字体优化' : '6. Image and Font Optimization'}
      </h2>
      <p style={pStyle}>
        {isZh
          ? 'next/image 和 next/font 是 Next.js 中两个最强大的内置优化工具，对 Core Web Vitals 分数有直接影响。'
          : 'next/image and next/font are two of the most powerful built-in optimization tools in Next.js, with a direct impact on Core Web Vitals scores.'}
      </p>

      <h3 style={h3Style}>{isZh ? 'next/image：自动格式转换与懒加载' : 'next/image: Automatic Format Conversion and Lazy Loading'}</h3>
      <pre style={preStyle}><code>{
'import Image from "next/image";\n' +
'\n' +
'// Local image: import for automatic size detection\n' +
'import heroImage from "@/public/hero.jpg";\n' +
'\n' +
'export function HeroSection() {\n' +
'  return (\n' +
'    <div style={{ position: "relative", height: "80vh" }}>\n' +
'      {/* LCP image: priority loads eagerly (no lazy) */}\n' +
'      <Image\n' +
'        src={heroImage}\n' +
'        alt="Hero illustration"\n' +
'        fill\n' +
'        priority         // Removes loading="lazy" for LCP\n' +
'        sizes="100vw"   // Responsive sizes hint\n' +
'        style={{ objectFit: "cover" }}\n' +
'        quality={85}    // Default: 75 (AVIF/WebP auto-selected)\n' +
'      />\n' +
'    </div>\n' +
'  );\n' +
'}\n' +
'\n' +
'// Remote image: requires explicit dimensions\n' +
'export function ProductCard({ product }: { product: Product }) {\n' +
'  return (\n' +
'    <Image\n' +
'      src={product.imageUrl}\n' +
'      alt={product.name}\n' +
'      width={400}\n' +
'      height={300}\n' +
'      loading="lazy"   // Default for non-priority images\n' +
'      placeholder="blur"\n' +
'      blurDataURL={product.blurHash}\n' +
'    />\n' +
'  );\n' +
'}'
      }</code></pre>

      <h3 style={h3Style}>{isZh ? '配置远程域名' : 'Configuring Remote Domains'}</h3>
      <pre style={preStyle}><code>{
'// next.config.ts\n' +
'import type { NextConfig } from "next";\n' +
'\n' +
'const nextConfig: NextConfig = {\n' +
'  images: {\n' +
'    remotePatterns: [\n' +
'      {\n' +
'        protocol: "https",\n' +
'        hostname: "cdn.example.com",\n' +
'        port: "",\n' +
'        pathname: "/images/**",\n' +
'      },\n' +
'      {\n' +
'        protocol: "https",\n' +
'        hostname: "**.cloudinary.com",\n' +
'      },\n' +
'    ],\n' +
'    formats: ["image/avif", "image/webp"], // Preferred order\n' +
'    minimumCacheTTL: 60 * 60 * 24 * 30,   // 30 days\n' +
'  },\n' +
'};\n' +
'\n' +
'export default nextConfig;'
      }</code></pre>

      <h3 style={h3Style}>{isZh ? 'next/font：零 CLS 字体加载' : 'next/font: Zero-CLS Font Loading'}</h3>
      <pre style={preStyle}><code>{
'// app/layout.tsx\n' +
'import { Inter, Fira_Code } from "next/font/google";\n' +
'import localFont from "next/font/local";\n' +
'\n' +
'const inter = Inter({\n' +
'  subsets: ["latin"],\n' +
'  display: "swap",       // Font display strategy\n' +
'  variable: "--font-inter",  // CSS variable for use in styles\n' +
'});\n' +
'\n' +
'const firaCode = Fira_Code({\n' +
'  subsets: ["latin"],\n' +
'  weight: ["400", "500"],\n' +
'  variable: "--font-fira-code",\n' +
'});\n' +
'\n' +
'// Self-hosted font\n' +
'const brandFont = localFont({\n' +
'  src: [\n' +
'    { path: "./fonts/Brand-Regular.woff2", weight: "400" },\n' +
'    { path: "./fonts/Brand-Bold.woff2", weight: "700" },\n' +
'  ],\n' +
'  variable: "--font-brand",\n' +
'});\n' +
'\n' +
'// Result: fonts are self-hosted by Next.js server,\n' +
'// no external requests = no CLS, no privacy concerns\n' +
'export default function RootLayout({ children }: { children: React.ReactNode }) {\n' +
'  return (\n' +
'    <html\n' +
'      lang="en"\n' +
'      className={inter.variable + " " + firaCode.variable + " " + brandFont.variable}\n' +
'    >\n' +
'      <body style={{ fontFamily: "var(--font-inter)" }}>{children}</body>\n' +
'    </html>\n' +
'  );\n' +
'}'
      }</code></pre>

      {/* Section 7: Middleware */}
      <h2 style={h2Style}>
        {isZh ? '7. 中间件与 Edge Runtime' : '7. Middleware and Edge Runtime'}
      </h2>
      <p style={pStyle}>
        {isZh
          ? 'Next.js 中间件在请求到达页面之前在 Edge Runtime（Vercel 的全球边缘网络，或本地 Node.js 的轻量化 V8 沙箱）运行，延迟极低。'
          : 'Next.js Middleware runs on the Edge Runtime (Vercel global edge network, or a lightweight V8 sandbox in Node.js locally) before a request reaches the page, resulting in minimal latency.'}
      </p>

      <h3 style={h3Style}>{isZh ? '身份验证与重定向中间件' : 'Authentication and Redirect Middleware'}</h3>
      <pre style={preStyle}><code>{
'// middleware.ts (at project root)\n' +
'import { NextResponse } from "next/server";\n' +
'import type { NextRequest } from "next/server";\n' +
'import { verifyJWT } from "@/lib/auth";\n' +
'\n' +
'export async function middleware(request: NextRequest) {\n' +
'  const { pathname } = request.nextUrl;\n' +
'\n' +
'  // --- Authentication check ---\n' +
'  if (pathname.startsWith("/dashboard")) {\n' +
'    const token = request.cookies.get("auth-token")?.value;\n' +
'\n' +
'    if (!token) {\n' +
'      return NextResponse.redirect(\n' +
'        new URL("/login?from=" + encodeURIComponent(pathname), request.url)\n' +
'      );\n' +
'    }\n' +
'\n' +
'    try {\n' +
'      const payload = await verifyJWT(token);\n' +
'      // Pass user info to the page via headers\n' +
'      const response = NextResponse.next();\n' +
'      response.headers.set("x-user-id", payload.sub);\n' +
'      response.headers.set("x-user-role", payload.role);\n' +
'      return response;\n' +
'    } catch {\n' +
'      return NextResponse.redirect(new URL("/login", request.url));\n' +
'    }\n' +
'  }\n' +
'\n' +
'  // --- A/B testing ---\n' +
'  if (pathname === "/pricing") {\n' +
'    const bucket = request.cookies.get("ab-bucket")?.value\n' +
'      ?? (Math.random() < 0.5 ? "a" : "b");\n' +
'    const response = NextResponse.rewrite(\n' +
'      new URL("/pricing-" + bucket, request.url)\n' +
'    );\n' +
'    response.cookies.set("ab-bucket", bucket, { maxAge: 60 * 60 * 24 * 30 });\n' +
'    return response;\n' +
'  }\n' +
'\n' +
'  // --- Geolocation-based redirect ---\n' +
'  const country = request.geo?.country ?? "US";\n' +
'  if (country === "DE" && !pathname.startsWith("/de")) {\n' +
'    return NextResponse.redirect(new URL("/de" + pathname, request.url));\n' +
'  }\n' +
'\n' +
'  return NextResponse.next();\n' +
'}\n' +
'\n' +
'// Control which routes middleware applies to\n' +
'export const config = {\n' +
'  matcher: [\n' +
'    // Match all routes except static files and API\n' +
'    "/((?!_next/static|_next/image|favicon.ico|api).*)",\n' +
'  ],\n' +
'};'
      }</code></pre>

      <div style={calloutStyle}>
        <p style={{ margin: 0, fontWeight: 600, marginBottom: '0.25rem' }}>
          {isZh ? 'Edge Runtime 限制' : 'Edge Runtime Limitations'}
        </p>
        <p style={{ margin: 0, fontSize: '0.9rem' }}>
          {isZh
            ? 'Edge Runtime 不支持所有 Node.js API。无法使用 fs 模块、原生 Node.js 加密模块（使用 Web Crypto API 代替）或需要 Node.js 特定 API 的数据库驱动程序。对于这些操作，使用 Route Handlers（在 Node.js 运行时中运行）。'
            : 'Edge Runtime does not support all Node.js APIs. You cannot use the fs module, native Node.js crypto (use Web Crypto API instead), or database drivers that require Node.js-specific APIs. For those operations, use Route Handlers which run in the Node.js runtime.'}
        </p>
      </div>

      {/* Section 8: Deployment */}
      <h2 style={h2Style}>
        {isZh ? '8. 部署：Vercel vs 自托管' : '8. Deployment: Vercel vs Self-Hosted'}
      </h2>
      <p style={pStyle}>
        {isZh
          ? 'Next.js 可以部署在任何支持 Node.js 的平台上。两种最常见的选择是 Vercel（官方平台）和使用 standalone 输出模式自托管。'
          : 'Next.js can be deployed on any platform that supports Node.js. The two most common options are Vercel (the official platform) and self-hosting using the standalone output mode.'}
      </p>

      <h3 style={h3Style}>{isZh ? 'Vercel 部署' : 'Vercel Deployment'}</h3>
      <pre style={preStyle}><code>{
'# Deploying to Vercel is a single command\n' +
'npx vercel\n' +
'\n' +
'# Or push to main branch with Git integration\n' +
'git push origin main  # Auto-deploys via GitHub integration\n' +
'\n' +
'# Environment variables\n' +
'# Set in: vercel.com/project/settings/environment-variables\n' +
'# Or via CLI:\n' +
'vercel env add DATABASE_URL production'
      }</code></pre>

      <h3 style={h3Style}>{isZh ? '独立模式 (standalone) + Docker' : 'Standalone Mode + Docker'}</h3>
      <pre style={preStyle}><code>{
'// next.config.ts\n' +
'const nextConfig: NextConfig = {\n' +
'  output: "standalone", // Creates minimal server bundle\n' +
'};\n' +
'\n' +
'// Dockerfile (multi-stage build)\n' +
'// Stage 1: Dependencies\n' +
'// FROM node:20-alpine AS deps\n' +
'// RUN apk add --no-cache libc6-compat\n' +
'// WORKDIR /app\n' +
'// COPY package.json package-lock.json ./\n' +
'// RUN npm ci\n' +
'//\n' +
'// Stage 2: Builder\n' +
'// FROM node:20-alpine AS builder\n' +
'// WORKDIR /app\n' +
'// COPY --from=deps /app/node_modules ./node_modules\n' +
'// COPY . .\n' +
'// ENV NEXT_TELEMETRY_DISABLED=1\n' +
'// RUN npm run build\n' +
'//\n' +
'// Stage 3: Runner (minimal image ~150MB)\n' +
'// FROM node:20-alpine AS runner\n' +
'// WORKDIR /app\n' +
'// ENV NODE_ENV=production\n' +
'// COPY --from=builder /app/.next/standalone ./\n' +
'// COPY --from=builder /app/.next/static ./.next/static\n' +
'// COPY --from=builder /app/public ./public\n' +
'// EXPOSE 3000\n' +
'// CMD ["node", "server.js"]'
      }</code></pre>

      <h3 style={h3Style}>{isZh ? '环境变量最佳实践' : 'Environment Variable Best Practices'}</h3>
      <pre style={preStyle}><code>{
'# .env.local (never commit - for local dev only)\n' +
'DATABASE_URL=postgresql://user:pass@localhost/mydb\n' +
'NEXTAUTH_SECRET=local-dev-secret\n' +
'\n' +
'# .env (safe defaults, can be committed)\n' +
'NEXT_PUBLIC_APP_URL=http://localhost:3000\n' +
'NEXT_PUBLIC_ANALYTICS_ID=\n' +
'\n' +
'// Accessing in code:\n' +
'\n' +
'// Server-only (NOT prefixed with NEXT_PUBLIC_)\n' +
'// Only accessible in Server Components, Route Handlers, Server Actions\n' +
'const db = new PrismaClient({\n' +
'  datasources: { db: { url: process.env.DATABASE_URL } }\n' +
'});\n' +
'\n' +
'// Client-accessible (NEXT_PUBLIC_ prefix)\n' +
'// Inlined at build time into the browser bundle\n' +
'const analyticsId = process.env.NEXT_PUBLIC_ANALYTICS_ID;\n' +
'\n' +
'// Type-safe env with T3 Env\n' +
'// npm install @t3-oss/env-nextjs zod\n' +
'import { createEnv } from "@t3-oss/env-nextjs";\n' +
'import { z } from "zod";\n' +
'\n' +
'export const env = createEnv({\n' +
'  server: {\n' +
'    DATABASE_URL: z.string().url(),\n' +
'    NEXTAUTH_SECRET: z.string().min(1),\n' +
'  },\n' +
'  client: {\n' +
'    NEXT_PUBLIC_APP_URL: z.string().url(),\n' +
'  },\n' +
'  runtimeEnv: process.env,\n' +
'});'
      }</code></pre>

      {/* Section 9: Comparison Table */}
      <h2 style={h2Style}>
        {isZh ? '9. 框架对比：Next.js vs Remix vs Nuxt vs SvelteKit' : '9. Framework Comparison: Next.js vs Remix vs Nuxt vs SvelteKit'}
      </h2>
      <p style={pStyle}>
        {isZh
          ? '选择 Web 框架是一个重大决策。以下是 2026 年四个主要全栈框架的详细对比。'
          : 'Choosing a web framework is a major decision. Here is a detailed comparison of the four leading full-stack frameworks in 2026.'}
      </p>

      <div style={{ overflowX: 'auto', marginBottom: '1.5rem' }}>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '维度' : 'Dimension'}</th>
              <th style={{ ...thStyle, color: '#60a5fa' }}>Next.js 15</th>
              <th style={{ ...thStyle, color: '#f472b6' }}>Remix 2</th>
              <th style={{ ...thStyle, color: '#4ade80' }}>Nuxt 3</th>
              <th style={{ ...thStyle, color: '#fb923c' }}>SvelteKit 2</th>
            </tr>
          </thead>
          <tbody>
            {[
              [
                isZh ? '底层框架' : 'Underlying Framework',
                'React 19',
                'React 19',
                'Vue 3',
                'Svelte 5',
              ],
              [
                isZh ? '默认渲染' : 'Default Rendering',
                isZh ? 'RSC (服务端)' : 'RSC (Server)',
                isZh ? 'SSR (服务端)' : 'SSR (Server)',
                isZh ? 'SSR (服务端)' : 'SSR (Server)',
                isZh ? 'SSR (服务端)' : 'SSR (Server)',
              ],
              [
                isZh ? '数据获取' : 'Data Fetching',
                'fetch + cache / Server Components',
                'loader() / action()',
                'useFetch() / useAsyncData()',
                'load() in +page.server.ts',
              ],
              [
                isZh ? '表单处理' : 'Form Handling',
                'Server Actions',
                'action() (native forms)',
                'useFetch / Server Routes',
                'form actions (+page.server.ts)',
              ],
              [
                isZh ? '路由类型' : 'Routing Type',
                isZh ? '文件系统 (app/)' : 'File system (app/)',
                isZh ? '文件系统 (routes/)' : 'File system (routes/)',
                isZh ? '文件系统 (pages/)' : 'File system (pages/)',
                isZh ? '文件系统 (+page.svelte)' : 'File system (+page.svelte)',
              ],
              [
                isZh ? '样式方案' : 'Styling',
                isZh ? '任意 (Tailwind 官方支持)' : 'Any (Tailwind official)',
                isZh ? '任意' : 'Any',
                isZh ? '任意 (UnoCSS 推荐)' : 'Any (UnoCSS recommended)',
                isZh ? 'Scoped CSS (内置)' : 'Scoped CSS (built-in)',
              ],
              [
                isZh ? 'TS 支持' : 'TypeScript Support',
                isZh ? '优秀 (内置)' : 'Excellent (built-in)',
                isZh ? '优秀 (内置)' : 'Excellent (built-in)',
                isZh ? '优秀 (内置)' : 'Excellent (built-in)',
                isZh ? '优秀 (内置)' : 'Excellent (built-in)',
              ],
              [
                isZh ? 'Bundle 大小 (框架)' : 'Bundle Size (framework)',
                '~85 KB (React runtime)',
                '~85 KB (React runtime)',
                '~100 KB (Vue runtime)',
                '~10-30 KB (compiled)',
              ],
              [
                isZh ? '学习曲线' : 'Learning Curve',
                isZh ? '中等 (RSC 概念)' : 'Medium (RSC concepts)',
                isZh ? '中等 (web standards)' : 'Medium (web standards)',
                isZh ? '低-中 (Vue 生态)' : 'Low-Medium (Vue ecosystem)',
                isZh ? '低 (Svelte 直观)' : 'Low (Svelte intuitive)',
              ],
              [
                isZh ? 'GitHub Stars' : 'GitHub Stars',
                '~130K',
                '~30K',
                '~55K',
                '~19K',
              ],
              [
                isZh ? '最适合' : 'Best For',
                isZh ? '全栈 React 应用、企业级' : 'Full-stack React, enterprise',
                isZh ? '以表单为中心的应用、Web 标准优先' : 'Form-heavy apps, web standards',
                isZh ? 'Vue 团队、内容站点' : 'Vue teams, content sites',
                isZh ? '性能优先、小型团队' : 'Performance-first, lean teams',
              ],
              [
                isZh ? '生态系统' : 'Ecosystem',
                isZh ? '非常庞大 (React)' : 'Very large (React)',
                isZh ? '大 (React)' : 'Large (React)',
                isZh ? '大 (Vue)' : 'Large (Vue)',
                isZh ? '中等 (成长中)' : 'Medium (growing)',
              ],
            ].map(([dimension, nextjs, remix, nuxt, sveltekit], i) => (
              <tr key={i}>
                <td style={i % 2 === 0 ? { ...tdStyle, fontWeight: 600 } : { ...tdAltStyle, fontWeight: 600 }}>{dimension}</td>
                <td style={i % 2 === 0 ? { ...tdStyle, color: '#93c5fd' } : { ...tdAltStyle, color: '#93c5fd' }}>{nextjs}</td>
                <td style={i % 2 === 0 ? { ...tdStyle, color: '#f9a8d4' } : { ...tdAltStyle, color: '#f9a8d4' }}>{remix}</td>
                <td style={i % 2 === 0 ? { ...tdStyle, color: '#86efac' } : { ...tdAltStyle, color: '#86efac' }}>{nuxt}</td>
                <td style={i % 2 === 0 ? { ...tdStyle, color: '#fdba74' } : { ...tdAltStyle, color: '#fdba74' }}>{sveltekit}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h3 style={h3Style}>{isZh ? '何时选择 Remix' : 'When to Choose Remix'}</h3>
      <p style={pStyle}>
        {isZh
          ? 'Remix 对 Web 标准（Fetch API、FormData、HTTP 语义）的强调使其代码更具可移植性，且不依赖框架抽象。如果你的团队重视表单的渐进增强（无 JavaScript 也能工作），Remix 是一个强有力的选择。'
          : 'Remix\'s emphasis on web standards (Fetch API, FormData, HTTP semantics) makes its code more portable and less dependent on framework abstractions. If your team values progressive enhancement for forms (working without JavaScript), Remix is a strong choice.'}
      </p>

      <h3 style={h3Style}>{isZh ? '何时选择 SvelteKit' : 'When to Choose SvelteKit'}</h3>
      <p style={pStyle}>
        {isZh
          ? 'Svelte 通过编译器消除虚拟 DOM，生成非常小的 bundle。SvelteKit 非常适合需要最佳运行时性能的项目，以及不需要 React 生态系统的中小型团队。'
          : 'Svelte eliminates the virtual DOM through a compiler, producing very small bundles. SvelteKit is ideal for projects that need the best runtime performance and small-to-medium teams that don\'t require the React ecosystem.'}
      </p>

      {/* Section 10: FAQ */}
      <h2 style={h2Style}>
        {isZh ? '10. 常见问题（FAQ）' : '10. Frequently Asked Questions'}
      </h2>

      {faqSchema.mainEntity.map((item, i) => (
        <div key={i} style={{ marginBottom: '1.5rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '1.5rem' }}>
          <h3 style={{ ...h3Style, marginTop: '1rem', color: '#0f172a' }}>
            Q{i + 1}: {item.name}
          </h3>
          <p style={{ ...pStyle, marginBottom: 0, color: '#334155' }}>
            {item.acceptedAnswer.text}
          </p>
        </div>
      ))}

      {/* Performance Tips Section */}
      <h2 style={h2Style}>
        {isZh ? '11. 生产环境性能优化清单' : '11. Production Performance Optimization Checklist'}
      </h2>
      <p style={pStyle}>
        {isZh
          ? '在将 Next.js 应用推向生产之前，请检查以下优化点以确保最佳性能。'
          : 'Before shipping your Next.js app to production, check these optimizations to ensure peak performance.'}
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
        {[
          {
            title: isZh ? '服务端组件' : 'Server Components',
            items: isZh ? [
              '最大化服务端组件的使用',
              '将 "use client" 推向组件树叶子',
              '避免在客户端组件中导入大型库',
              '使用 React.lazy() 动态导入',
            ] : [
              'Maximize Server Component usage',
              'Push "use client" to leaf nodes',
              'Avoid importing large libs in Client Components',
              'Use dynamic imports with React.lazy()',
            ],
          },
          {
            title: isZh ? '图片与字体' : 'Images and Fonts',
            items: isZh ? [
              '所有图片使用 next/image',
              'LCP 图片添加 priority prop',
              '提供正确的 sizes 属性',
              '使用 next/font 避免布局偏移',
            ] : [
              'Use next/image for all images',
              'Add priority prop to LCP images',
              'Provide correct sizes attribute',
              'Use next/font to eliminate CLS',
            ],
          },
          {
            title: isZh ? '缓存策略' : 'Caching Strategy',
            items: isZh ? [
              '静态内容使用 force-cache',
              '动态内容设置适当的 revalidate',
              '使用 unstable_cache 缓存数据库查询',
              '实施 revalidateTag 按需失效',
            ] : [
              'Use force-cache for static content',
              'Set appropriate revalidate for dynamic content',
              'Cache DB queries with unstable_cache',
              'Implement revalidateTag for on-demand invalidation',
            ],
          },
          {
            title: isZh ? '包大小' : 'Bundle Size',
            items: isZh ? [
              '使用 @next/bundle-analyzer 分析',
              '按需导入（避免 import * from）',
              '懒加载非关键第三方脚本',
              '使用 next/script 策略加载脚本',
            ] : [
              'Analyze with @next/bundle-analyzer',
              'Use named imports (avoid import * from)',
              'Lazy-load non-critical third-party scripts',
              'Use next/script strategy for external scripts',
            ],
          },
        ].map((card, i) => (
          <div key={i} style={{ border: '1px solid #e2e8f0', borderRadius: '0.5rem', padding: '1.25rem', backgroundColor: '#f8fafc' }}>
            <p style={{ fontWeight: 700, marginBottom: '0.75rem', color: '#0f172a', marginTop: 0 }}>{card.title}</p>
            <ul style={{ margin: 0, paddingLeft: '1.25rem', lineHeight: '1.8', fontSize: '0.9rem' }}>
              {card.items.map((item, j) => (
                <li key={j}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <h3 style={h3Style}>{isZh ? '使用 Bundle Analyzer 分析包大小' : 'Analyzing Bundle Size with Bundle Analyzer'}</h3>
      <pre style={preStyle}><code>{
'# Install bundle analyzer\n' +
'npm install @next/bundle-analyzer\n' +
'\n' +
'// next.config.ts\n' +
'import withBundleAnalyzer from "@next/bundle-analyzer";\n' +
'\n' +
'const withAnalyzer = withBundleAnalyzer({\n' +
'  enabled: process.env.ANALYZE === "true",\n' +
'});\n' +
'\n' +
'export default withAnalyzer(nextConfig);\n' +
'\n' +
'# Generate and open the bundle analysis report\n' +
'ANALYZE=true npm run build\n' +
'\n' +
'# Example: Dynamic import for heavy charting library\n' +
'import dynamic from "next/dynamic";\n' +
'\n' +
'const HeavyChart = dynamic(\n' +
'  () => import("@/components/HeavyChart"),\n' +
'  {\n' +
'    loading: () => <p>Loading chart...</p>,\n' +
'    ssr: false, // Skip SSR for browser-only lib\n' +
'  }\n' +
');\n' +
'\n' +
'// Third-party script with strategy\n' +
'import Script from "next/script";\n' +
'\n' +
'export function Analytics() {\n' +
'  return (\n' +
'    <Script\n' +
'      src="https://analytics.example.com/script.js"\n' +
'      strategy="lazyOnload"  // afterInteractive | lazyOnload | beforeInteractive\n' +
'      onLoad={() => console.log("Analytics loaded")}\n' +
'    />\n' +
'  );\n' +
'}'
      }</code></pre>

      {/* Conclusion */}
      <h2 style={h2Style}>
        {isZh ? '总结' : 'Conclusion'}
      </h2>
      <p style={pStyle}>
        {isZh
          ? 'Next.js 15 的 App Router 代表了 React 全栈开发的成熟范式。React 服务端组件减少了客户端 JavaScript，Server Actions 简化了数据变更流程，而内置的图片、字体优化和中间件使得构建生产级应用更加简单。'
          : 'Next.js 15 App Router represents a mature paradigm for full-stack React development. React Server Components reduce client-side JavaScript, Server Actions simplify data mutation flows, and built-in image, font optimization, and middleware make building production-grade applications more straightforward.'}
      </p>
      <p style={pStyle}>
        {isZh
          ? '关键建议：从 App Router 开始新项目，默认使用服务端组件，仅在需要交互性时使用 "use client"。用 Server Actions 替代简单的 API 路由，用 ISR（revalidate + revalidatePath）处理动态内容。部署时，Vercel 提供最少配置，而 standalone 模式 + Docker 给予完全的基础设施控制。'
          : 'Key recommendations: start new projects with the App Router, use Server Components by default, and reach for "use client" only when interactivity is required. Replace simple API routes with Server Actions, and handle dynamic content with ISR (revalidate + revalidatePath). For deployment, Vercel offers the least configuration overhead, while standalone mode + Docker provides complete infrastructure control.'}
      </p>

      <div style={{ backgroundColor: '#f0f9ff', border: '1px solid #bae6fd', borderRadius: '0.5rem', padding: '1.25rem', marginTop: '2rem' }}>
        <p style={{ margin: 0, fontWeight: 600, marginBottom: '0.5rem', color: '#0369a1' }}>
          {isZh ? '相关工具' : 'Related Tools on DevToolBox'}
        </p>
        <p style={{ margin: 0, fontSize: '0.9rem', lineHeight: '1.7', color: '#0c4a6e' }}>
          {isZh
            ? '使用 DevToolBox 的 JSON Formatter 调试 API 响应，Regex Tester 验证路由匹配模式，以及 JWT Decoder 检查 Next-Auth 生成的令牌。'
            : 'Use DevToolBox\'s JSON Formatter to debug API responses, Regex Tester to validate route matcher patterns, and JWT Decoder to inspect tokens generated by Next-Auth.'}
        </p>
      </div>
    </article>
  );
}
