'use client';
import React from 'react';

const translations = {
  en: {
    title: 'Next.js Advanced Guide: App Router, Server Components, Caching, ISR, and Production Deployment',
    description: 'Master advanced Next.js: App Router architecture with layouts and templates, Server vs Client Components, data fetching with cache and revalidation, Server Actions for mutations, middleware patterns, route handlers and streaming, caching strategies, image and font optimization, internationalization, authentication with NextAuth.js, ISR and on-demand revalidation, parallel and intercepting routes, and production deployment with Docker and OpenTelemetry.',
    tldr: 'Next.js App Router introduces a new paradigm with React Server Components as the default, nested layouts, and colocated data fetching. Server Actions simplify mutations without API routes. The four-layer caching system (request memoization, data cache, full route cache, router cache) dramatically improves performance. Use ISR with revalidatePath/revalidateTag for incremental updates. Middleware handles auth, redirects, and i18n at the edge. Deploy with Vercel for zero-config or Docker for full control, and instrument with OpenTelemetry for observability.',
    tldrZh: 'Next.js App Router 引入了以 React Server Components 为默认的新范式、嵌套布局和数据获取共置。Server Actions 无需 API 路由即可简化数据变更。四层缓存系统（请求记忆化、数据缓存、完整路由缓存、路由缓存）显著提升性能。使用 ISR 配合 revalidatePath/revalidateTag 进行增量更新。中间件在边缘处理认证、重定向和国际化。使用 Vercel 零配置部署或 Docker 完全掌控，并通过 OpenTelemetry 实现可观测性。',
  },
  zh: {
    title: 'Next.js 高级指南：App Router、Server Components、缓存、ISR 与生产部署',
    description: '全面掌握 Next.js 高级用法：App Router 架构与布局模板、Server 与 Client Components 对比、fetch 缓存与重新验证的数据获取、Server Actions 数据变更、中间件模式、路由处理器与流式传输、缓存策略、图片与字体优化、国际化、NextAuth.js 认证、ISR 与按需重新验证、平行与拦截路由、Docker 与 OpenTelemetry 生产部署。',
    tldr: 'Next.js App Router 引入了以 React Server Components 为默认的新范式、嵌套布局和数据获取共置。Server Actions 无需 API 路由即可简化数据变更。四层缓存系统（请求记忆化、数据缓存、完整路由缓存、路由缓存）显著提升性能。使用 ISR 配合 revalidatePath/revalidateTag 进行增量更新。中间件在边缘处理认证、重定向和国际化。使用 Vercel 零配置部署或 Docker 完全掌控，并通过 OpenTelemetry 实现可观测性。',
    tldrZh: 'Next.js App Router 引入了以 React Server Components 为默认的新范式、嵌套布局和数据获取共置。Server Actions 无需 API 路由即可简化数据变更。四层缓存系统（请求记忆化、数据缓存、完整路由缓存、路由缓存）显著提升性能。使用 ISR 配合 revalidatePath/revalidateTag 进行增量更新。中间件在边缘处理认证、重定向和国际化。使用 Vercel 零配置部署或 Docker 完全掌控，并通过 OpenTelemetry 实现可观测性。',
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is the difference between Server Components and Client Components in Next.js?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Server Components render on the server and send HTML to the client with zero JavaScript bundle cost. Client Components (marked with "use client") hydrate on the client and support interactivity like useState, useEffect, and event handlers. Use Server Components by default for data fetching and static content, and Client Components only when you need browser APIs or interactivity.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does caching work in the Next.js App Router?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Next.js has four caching layers: Request Memoization deduplicates identical fetch calls in a single render pass. Data Cache persists fetch results across requests on the server. Full Route Cache stores the rendered HTML and RSC payload at build time. Router Cache stores prefetched route segments on the client. Each layer can be configured independently with cache, revalidate, and no-store options.',
      },
    },
    {
      '@type': 'Question',
      name: 'What are Server Actions in Next.js and how do they work?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Server Actions are async functions that run on the server, defined with the "use server" directive. They can be called directly from Client Components for form submissions and data mutations without creating separate API routes. They support progressive enhancement, integrate with revalidatePath/revalidateTag for cache invalidation, and can be used with useOptimistic for optimistic UI updates.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I implement ISR (Incremental Static Regeneration) in the App Router?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'In the App Router, ISR is configured via the revalidate option on fetch calls or via the route segment config export. For on-demand revalidation, call revalidatePath or revalidateTag inside Server Actions or Route Handlers when content changes, typically triggered by CMS webhooks.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I set up middleware in Next.js for authentication?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Create a middleware.ts file at the project root. Export a middleware function that checks for auth tokens or session cookies in the request. Use NextResponse.redirect() to send unauthenticated users to the login page. Configure the matcher to specify which routes the middleware should run on. Middleware executes at the edge before any route is rendered.',
      },
    },
    {
      '@type': 'Question',
      name: 'What are parallel and intercepting routes in Next.js?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Parallel routes using the @folder convention render multiple pages simultaneously in the same layout. Intercepting routes using the (.) convention let you show a route in a different context like a modal. Combined, they enable complex UI patterns like modal overlays with shareable URLs.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I optimize images and fonts in Next.js?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Use next/image for automatic image optimization with WebP/AVIF, responsive srcsets, lazy-loading, and layout shift prevention. Use next/font to self-host Google Fonts or local fonts with zero layout shift, automatic subsetting, and no external network requests. Add blur placeholders for a polished loading experience.',
      },
    },
    {
      '@type': 'Question',
      name: 'How should I deploy a Next.js app in production with Docker?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Use a multi-stage Dockerfile with output standalone in next.config.js. Copy only the standalone output, public folder, and .next/static to a minimal production image. Use health checks, set NODE_ENV production, run behind Nginx, and integrate OpenTelemetry with @vercel/otel for observability.',
      },
    },
  ],
};

export default function NextjsAdvancedGuide({ lang }: { lang: string }) {
  const t = translations[lang as keyof typeof translations] || translations.en;
  const isZh = lang === 'zh';

  const preStyle: React.CSSProperties = {
    background: '#0f172a',
    color: '#e2e8f0',
    padding: '24px',
    borderRadius: '8px',
    overflowX: 'auto',
    fontSize: '0.875rem',
    lineHeight: '1.65',
    marginBottom: '24px',
    fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
  };

  const h2Style: React.CSSProperties = {
    fontSize: '1.75rem',
    fontWeight: '700',
    marginTop: '48px',
    marginBottom: '16px',
    color: '#1e293b',
    borderBottom: '2px solid #e2e8f0',
    paddingBottom: '8px',
  };

  const h3Style: React.CSSProperties = {
    fontSize: '1.25rem',
    fontWeight: '600',
    marginTop: '28px',
    marginBottom: '12px',
    color: '#1e293b',
  };

  const pStyle: React.CSSProperties = {
    lineHeight: '1.8',
    color: '#374151',
    marginBottom: '16px',
  };

  const ulStyle: React.CSSProperties = {
    lineHeight: '1.8',
    color: '#374151',
    marginBottom: '16px',
    paddingLeft: '24px',
  };

  const tldrBoxStyle: React.CSSProperties = {
    background: '#f0f9ff',
    borderLeft: '4px solid #0ea5e9',
    padding: '16px 20px',
    borderRadius: '0 8px 8px 0',
    marginBottom: '24px',
    fontSize: '0.95rem',
    lineHeight: '1.7',
    color: '#0c4a6e',
  };

  const keyTakeawaysStyle: React.CSSProperties = {
    background: '#f8fafc',
    border: '1px solid #e2e8f0',
    padding: '20px 24px',
    borderRadius: '8px',
    marginBottom: '24px',
    fontSize: '0.95rem',
    lineHeight: '1.7',
  };

  const inlineCodeStyle: React.CSSProperties = {
    background: '#f1f5f9',
    color: '#dc2626',
    padding: '2px 6px',
    borderRadius: '4px',
    fontSize: '0.85em',
    fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
  };

  const strongStyle: React.CSSProperties = {
    color: '#0f172a',
  };

  const tipBoxStyle: React.CSSProperties = {
    background: '#fefce8',
    borderLeft: '4px solid #eab308',
    padding: '14px 18px',
    borderRadius: '0 8px 8px 0',
    marginBottom: '24px',
    fontSize: '0.9rem',
    lineHeight: '1.7',
    color: '#713f12',
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <h1 style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '16px', color: '#0f172a' }}>
        {t.title}
      </h1>
      <p style={pStyle}>{t.description}</p>

      {/* TL;DR Box */}
      <div style={tldrBoxStyle}>
        <strong style={{ display: 'block', marginBottom: '8px', color: '#0369a1', fontSize: '1.05rem' }}>
          TL;DR
        </strong>
        {isZh ? t.tldrZh : t.tldr}
      </div>

      {/* Key Takeaways */}
      <div style={keyTakeawaysStyle}>
        <strong style={{ display: 'block', marginBottom: '10px', color: '#1e293b', fontSize: '1.05rem' }}>
          {isZh ? '核心要点' : 'Key Takeaways'}
        </strong>
        <ul style={{ ...ulStyle, marginTop: '8px', marginBottom: '0' }}>
          <li>{isZh ? 'App Router 默认使用 React Server Components，显著减少客户端 JavaScript 包体积' : 'App Router defaults to React Server Components, significantly reducing client-side JavaScript bundle size'}</li>
          <li>{isZh ? 'Server Actions 取代了大多数 API 路由，支持渐进增强和乐观更新' : 'Server Actions replace most API routes, supporting progressive enhancement and optimistic updates'}</li>
          <li>{isZh ? '四层缓存系统（请求记忆化、数据缓存、完整路由缓存、路由器缓存）需要逐层理解' : 'Four-layer caching (request memoization, data cache, full route cache, router cache) requires layer-by-layer understanding'}</li>
          <li>{isZh ? '中间件在边缘运行，适合认证、重定向、国际化和 A/B 测试' : 'Middleware runs at the edge, ideal for auth, redirects, i18n, and A/B testing'}</li>
          <li>{isZh ? 'ISR 配合 revalidateTag 实现 CMS webhook 驱动的即时内容更新' : 'ISR with revalidateTag enables CMS webhook-driven instant content updates'}</li>
          <li>{isZh ? '平行路由和拦截路由实现模态框覆盖层等复杂 UI 模式' : 'Parallel and intercepting routes enable modal overlays and other complex UI patterns'}</li>
          <li>{isZh ? 'standalone 输出模式配合 Docker 多阶段构建是自托管的最佳实践' : 'Standalone output mode with multi-stage Docker builds is the self-hosting best practice'}</li>
        </ul>
      </div>

      {/* Introduction */}
      <p style={pStyle}>
        {isZh
          ? 'Next.js App Router 代表了 React 全栈开发的根本性转变。它引入了 React Server Components 作为默认渲染方式、嵌套布局系统、Server Actions 用于数据变更、以及多层缓存架构。本指南覆盖 13 个高级主题，每个部分都包含可直接使用的代码示例和生产环境最佳实践。'
          : 'The Next.js App Router represents a fundamental shift in full-stack React development. It introduces React Server Components as the default rendering method, a nested layout system, Server Actions for data mutations, and a multi-layer caching architecture. This guide covers 13 advanced topics, each with production-ready code examples and best practices.'}
      </p>
      <p style={pStyle}>
        {isZh
          ? '无论你是从 Pages Router 迁移还是从零构建新项目，理解这些概念将帮助你充分发挥 App Router 的能力。从架构设计到部署监控，让我们逐一深入。'
          : 'Whether you are migrating from the Pages Router or building a new project from scratch, understanding these concepts will help you fully leverage the App Router. From architecture design to deployment monitoring, let us dive into each topic.'}
      </p>
      <p style={pStyle}>
        {isZh
          ? '本指南中的所有代码示例都基于 Next.js 14+ 和 React 18+ 版本。建议使用 TypeScript 以获得最佳的类型安全和开发体验。如果你还在使用 Pages Router，本指南末尾包含了迁移建议部分。'
          : 'All code examples in this guide are based on Next.js 14+ and React 18+. TypeScript is recommended for optimal type safety and developer experience. If you are still using the Pages Router, this guide includes a migration recommendations section at the end.'}
      </p>
      <p style={pStyle}>
        {isZh
          ? '每个主题都包含一个实用代码示例、关键概念解释和最佳实践提示。建议按顺序阅读以建立完整的知识体系，也可以直接跳到你最关心的章节。'
          : 'Each topic includes a practical code example, key concept explanations, and best practice tips. Reading in order is recommended to build a complete knowledge framework, but you can also jump directly to the sections most relevant to you.'}
      </p>

      {/* Section 1 */}
      <h2 style={h2Style}>{isZh ? '1. App Router 架构' : '1. App Router Architecture'}</h2>
      <p style={pStyle}>
        {isZh
          ? 'App Router 基于文件系统约定构建路由。每个文件夹代表一个路由段，特殊文件名定义该段的 UI 行为。理解这些约定是使用 App Router 的基础。'
          : 'The App Router builds routing based on file system conventions. Each folder represents a route segment, and special filenames define the UI behavior for that segment. Understanding these conventions is fundamental to using the App Router.'}
      </p>
      <ul style={ulStyle}>
        <li><code style={inlineCodeStyle}>layout.tsx</code> — {isZh ? '持久布局，子路由导航时不重新渲染，保持滚动位置和状态' : 'Persistent layout that does not re-render on child navigation, preserving scroll position and state'}</li>
        <li><code style={inlineCodeStyle}>template.tsx</code> — {isZh ? '每次导航时重新挂载，适合进入/退出动画或每页 analytics 追踪' : 'Remounts on every navigation, ideal for enter/exit animations or per-page analytics tracking'}</li>
        <li><code style={inlineCodeStyle}>loading.tsx</code> — {isZh ? '自动包裹在 React Suspense 中的加载回退组件' : 'Loading fallback component automatically wrapped in React Suspense'}</li>
        <li><code style={inlineCodeStyle}>error.tsx</code> — {isZh ? '错误边界，捕获该段及子级的运行时错误，提供重试按钮' : 'Error boundary catching runtime errors in the segment and children, providing a retry button'}</li>
        <li><code style={inlineCodeStyle}>not-found.tsx</code> — {isZh ? '当调用 notFound() 函数或路径不匹配时显示的 404 页面' : '404 page displayed when notFound() is called or the path does not match'}</li>
      </ul>
      <pre style={preStyle}><code>{'// app/dashboard/layout.tsx — persistent layout\n' + 'export default function DashboardLayout({\n' + '  children,\n' + '}: {\n' + '  children: React.ReactNode;\n' + '}) {\n' + '  return (\n' + '    <section>\n' + '      <nav>Dashboard Sidebar</nav>\n' + '      <main>{children}</main>\n' + '    </section>\n' + '  );\n' + '}\n\n' + '// app/dashboard/loading.tsx — Suspense fallback\n' + 'export default function Loading() {\n' + '  return <div>Loading dashboard data...</div>;\n' + '}'}</code></pre>
      <p style={pStyle}>
        {isZh
          ? '布局在子路由间保持状态且不重新渲染。例如，仪表盘侧边栏在页面切换时不会闪烁。模板则在每次导航时创建新实例——在需要每页触发动画或重置表单状态的场景中使用模板而非布局。'
          : 'Layouts persist state across child routes and do not re-render. For example, a dashboard sidebar will not flash when switching pages. Templates create a new instance on each navigation — use templates instead of layouts when you need to trigger animations or reset form state on every page visit.'}
      </p>
      <div style={tipBoxStyle}>
        <strong>{isZh ? '提示：' : 'Tip:'}</strong>{' '}
        {isZh
          ? '路由组 (folder-name) 可以在不影响 URL 的情况下组织路由。例如 (marketing) 和 (shop) 可以共享不同的根布局。'
          : 'Route groups (folder-name) organize routes without affecting the URL. For example, (marketing) and (shop) can each have their own root layout.'}
      </div>

      <h3 style={h3Style}>{isZh ? '文件层级与渲染顺序' : 'File Hierarchy and Rendering Order'}</h3>
      <p style={pStyle}>
        {isZh
          ? '当请求到达一个路由段时，Next.js 按以下顺序渲染特殊文件：layout.tsx 包裹 template.tsx，template.tsx 包裹 error.tsx 错误边界，error.tsx 包裹 loading.tsx 的 Suspense 回退，最后是 page.tsx 的实际内容。理解这个嵌套关系有助于你正确放置错误处理和加载逻辑。'
          : 'When a request reaches a route segment, Next.js renders special files in this order: layout.tsx wraps template.tsx, template.tsx wraps error.tsx error boundary, error.tsx wraps loading.tsx Suspense fallback, and finally page.tsx contains the actual content. Understanding this nesting helps you place error handling and loading logic correctly.'}
      </p>
      <p style={pStyle}>
        {isZh
          ? '注意 error.tsx 无法捕获同级 layout.tsx 中的错误，因为错误边界是嵌套在布局内部的。要捕获根布局的错误，需要使用 global-error.tsx 文件。这个文件会替换整个根布局，因此必须包含自己的 html 和 body 标签。'
          : 'Note that error.tsx cannot catch errors in the same-level layout.tsx because the error boundary is nested inside the layout. To catch root layout errors, use the global-error.tsx file. This file replaces the entire root layout, so it must include its own html and body tags.'}
      </p>
      <p style={pStyle}>
        {isZh
          ? '使用路由组 (folder-name) 可以在不影响 URL 的情况下为不同部分的应用创建独立的布局。例如 (marketing)/layout.tsx 和 (app)/layout.tsx 可以拥有完全不同的导航栏和页脚，而 URL 路径中不会出现 marketing 或 app 前缀。'
          : 'Route groups (folder-name) let you create independent layouts for different parts of the app without affecting URLs. For example, (marketing)/layout.tsx and (app)/layout.tsx can have completely different navbars and footers, while the URL path will not contain marketing or app prefixes.'}
      </p>

      {/* Section 2 */}
      <h2 style={h2Style}>{isZh ? '2. Server Components 与 Client Components' : '2. Server Components vs Client Components'}</h2>
      <p style={pStyle}>
        {isZh
          ? '在 App Router 中，所有组件默认是 Server Components。它们在服务器上渲染，可以直接访问数据库和后端资源，且不向客户端发送任何 JavaScript。这是减少包体积的关键架构决策。'
          : 'In the App Router, all components are Server Components by default. They render on the server, can directly access databases and backend resources, and send zero JavaScript to the client. This is a key architectural decision for reducing bundle size.'}
      </p>
      <p style={pStyle}>
        {isZh
          ? '只有需要交互性（useState、useEffect、事件处理器）或浏览器 API（window、localStorage）的组件才需要标记 "use client"。关键原则是将 Client Components 推到组件树的叶子节点。'
          : 'Only components that need interactivity (useState, useEffect, event handlers) or browser APIs (window, localStorage) need the "use client" directive. The key principle is pushing Client Components to the leaves of your component tree.'}
      </p>
      <pre style={preStyle}><code>{'// Server Component (default) — direct database access\n' + 'async function ProductPage({ id }: { id: string }) {\n' + '  const product = await db.product.findUnique({ where: { id } });\n' + '  return (\n' + '    <div>\n' + '      <h1>{product.name}</h1>\n' + '      <p>{product.description}</p>\n' + '      <AddToCartButton productId={id} />\n' + '    </div>\n' + '  );\n' + '}\n\n' + "// Client Component — needs 'use client'\n" + "'use client';\n" + 'function AddToCartButton({ productId }: { productId: string }) {\n' + '  const [count, setCount] = useState(0);\n' + '  return <button onClick={() => setCount(c => c + 1)}>Add ({count})</button>;\n' + '}'}</code></pre>
      <p style={pStyle}>
        {isZh
          ? 'Server Components 可以渲染 Client Components，但反过来不行。如果需要在 Client Component 内部使用服务端内容，通过 children 或 props 传递。这种组合模式被称为"串联模式"，是 App Router 性能优化的核心。'
          : 'Server Components can render Client Components, but not vice versa. If you need server content inside a Client Component, pass it via children or props. This composition pattern, called the "donut pattern", is central to App Router performance optimization.'}
      </p>
      <div style={tipBoxStyle}>
        <strong>{isZh ? '提示：' : 'Tip:'}</strong>{' '}
        {isZh
          ? '"use client" 标记的是模块边界，不是单个组件。该文件中的所有导出和它导入的模块都成为客户端包的一部分。'
          : '"use client" marks a module boundary, not a single component. All exports from that file, and all modules it imports, become part of the client bundle.'}
      </div>

      <h3 style={h3Style}>{isZh ? '何时使用哪种组件' : 'When to Use Which Component'}</h3>
      <ul style={ulStyle}>
        <li><strong style={strongStyle}>{isZh ? '使用 Server Components：' : 'Use Server Components for:'}</strong> {isZh ? '数据获取、访问后端资源、渲染静态内容、SEO 关键内容、敏感信息（API 密钥）' : 'Data fetching, accessing backend resources, rendering static content, SEO-critical content, sensitive information (API keys)'}</li>
        <li><strong style={strongStyle}>{isZh ? '使用 Client Components：' : 'Use Client Components for:'}</strong> {isZh ? '用户交互（点击、输入）、useState/useEffect、浏览器 API（geolocation、localStorage）、第三方交互式库' : 'User interaction (clicks, inputs), useState/useEffect, browser APIs (geolocation, localStorage), third-party interactive libraries'}</li>
      </ul>
      <p style={pStyle}>
        {isZh
          ? '常见错误是将整个页面标记为 "use client"。这会导致该页面及其所有子组件都被打包到客户端 JavaScript 中，失去 Server Components 的零 JS 优势。始终先问自己：这个组件真的需要在客户端运行吗？'
          : 'A common mistake is marking an entire page as "use client". This causes that page and all its child components to be bundled into client JavaScript, losing the zero-JS advantage of Server Components. Always ask yourself: does this component really need to run on the client?'}
      </p>
      <p style={pStyle}>
        {isZh
          ? '第三方库的选择也很重要：许多 React 库（如状态管理库、动画库）依赖客户端 API，因此需要在 Client Component 边界内使用。你可以创建一个薄的 Client Component 包装器来封装这些库，保持页面的其余部分作为 Server Components。'
          : 'Third-party library choice matters too: many React libraries (like state management and animation libraries) depend on client APIs, so they must be used within Client Component boundaries. You can create thin Client Component wrappers to encapsulate these libraries while keeping the rest of the page as Server Components.'}
      </p>

      {/* Section 3 */}
      <h2 style={h2Style}>{isZh ? '3. 数据获取模式' : '3. Data Fetching Patterns'}</h2>
      <p style={pStyle}>
        {isZh
          ? 'App Router 使用扩展的 fetch API 进行数据获取。在 Server Components 中直接使用 async/await，配合缓存和重新验证选项控制数据新鲜度。React 自动对同一 render pass 中相同 URL 的请求进行记忆化去重。'
          : 'The App Router uses an extended fetch API for data fetching. Use async/await directly in Server Components, with cache and revalidation options to control data freshness. React automatically memoizes and deduplicates requests to the same URL within the same render pass.'}
      </p>
      <pre style={preStyle}><code>{'// Cached fetch with time-based revalidation\n' + 'async function getProducts() {\n' + "  const res = await fetch('https://api.example.com/products', {\n" + '    next: { revalidate: 3600 }, // revalidate every hour\n' + '  });\n' + '  return res.json();\n' + '}\n\n' + '// Parallel data fetching — avoid waterfalls\n' + 'async function Dashboard() {\n' + '  const [users, revenue, orders] = await Promise.all([\n' + '    getUsers(),\n' + '    getRevenue(),\n' + '    getRecentOrders(),\n' + '  ]);\n' + '  return <DashboardView users={users} revenue={revenue} orders={orders} />;\n' + '}'}</code></pre>
      <p style={pStyle}>
        {isZh
          ? '关键选项：cache: "no-store" 获取始终最新的动态数据。next: { tags: ["products"] } 为数据打标签以支持按需失效。next: { revalidate: 60 } 设置基于时间的自动刷新。避免在客户端组件中使用 useEffect 获取数据——尽可能在服务端获取。'
          : 'Key options: cache: "no-store" for always-fresh dynamic data. next: { tags: ["products"] } to tag data for on-demand invalidation. next: { revalidate: 60 } for time-based automatic refresh. Avoid fetching data with useEffect in client components — fetch on the server whenever possible.'}
      </p>
      <p style={pStyle}>
        {isZh
          ? '使用 Promise.all 并行获取独立数据可以显著减少总加载时间。如果某些数据不关键，可以配合 Suspense 实现流式加载——让页面的关键部分先显示，非关键部分异步加载。'
          : 'Using Promise.all to fetch independent data in parallel significantly reduces total load time. If some data is non-critical, combine with Suspense for streaming — let critical parts of the page render first while non-critical parts load asynchronously.'}
      </p>
      <div style={tipBoxStyle}>
        <strong>{isZh ? '注意：' : 'Note:'}</strong>{' '}
        {isZh
          ? '在 Server Components 中使用 fetch 时，不能传递 AbortController 或自定义 agent。如果你使用 ORM（如 Prisma）直接查询数据库而非 fetch API，请用 React 的 cache() 函数包装查询函数以获得请求去重能力。'
          : 'When using fetch in Server Components, you cannot pass AbortController or custom agents. If you use an ORM like Prisma to query databases directly instead of the fetch API, wrap query functions with React cache() to get request deduplication.'}
      </div>

      <h3 style={h3Style}>{isZh ? '数据获取最佳实践' : 'Data Fetching Best Practices'}</h3>
      <ul style={ulStyle}>
        <li>{isZh ? '在 Server Components 中获取数据，避免在 Client Components 中使用 useEffect + fetch 模式' : 'Fetch data in Server Components; avoid the useEffect + fetch pattern in Client Components'}</li>
        <li>{isZh ? '使用 Promise.all 并行获取互不依赖的数据，减少总延迟' : 'Use Promise.all to fetch independent data in parallel, reducing total latency'}</li>
        <li>{isZh ? '利用 Suspense 边界实现流式渲染——关键内容先显示，非关键内容异步加载' : 'Leverage Suspense boundaries for streaming — critical content shows first, non-critical loads async'}</li>
        <li>{isZh ? '为 fetch 请求设置合理的 revalidate 时间或 tags，而不是一律使用 no-store' : 'Set appropriate revalidate times or tags for fetch requests instead of always using no-store'}</li>
        <li>{isZh ? '使用 React cache() 函数包装数据库查询，确保同一 render pass 中的去重' : 'Wrap database queries with the React cache() function to ensure deduplication within the same render pass'}</li>
      </ul>
      <p style={pStyle}>
        {isZh
          ? '对于非 fetch API 的数据源（如直接数据库查询），使用 React 的 cache() 函数实现请求记忆化。对于需要客户端实时更新的数据（如在线状态、协作编辑），仍然需要在 Client Components 中使用 WebSocket 或轮询。'
          : 'For non-fetch data sources (such as direct database queries), use React cache() function for request memoization. For data requiring real-time client updates (like online status, collaborative editing), you still need WebSocket or polling in Client Components.'}
      </p>

      {/* Section 4 */}
      <h2 style={h2Style}>{isZh ? '4. Server Actions' : '4. Server Actions'}</h2>
      <p style={pStyle}>
        {isZh
          ? 'Server Actions 是在服务器上运行的异步函数，通过 "use server" 标记。它们可以从 Client Components 直接调用，取代传统 API 路由用于表单提交和数据变更。最大的优势是支持渐进增强——即使 JavaScript 未加载，HTML 表单也能提交。'
          : 'Server Actions are async functions that run on the server, marked with "use server". They can be called directly from Client Components, replacing traditional API routes for form submissions and data mutations. Their biggest advantage is progressive enhancement — HTML forms submit even before JavaScript loads.'}
      </p>
      <pre style={preStyle}><code>{"// app/actions.ts\n" + "'use server';\n" + "import { revalidatePath } from 'next/cache';\n\n" + 'export async function createTodo(formData: FormData) {\n' + "  const title = formData.get('title') as string;\n" + '  await db.todo.create({ data: { title } });\n' + "  revalidatePath('/todos');\n" + '}\n\n' + '// app/todos/page.tsx — works without JS!\n' + "import { createTodo } from '../actions';\n\n" + 'export default function TodoPage() {\n' + '  return (\n' + '    <form action={createTodo}>\n' + '      <input name="title" required />\n' + '      <button type="submit">Add Todo</button>\n' + '    </form>\n' + '  );\n' + '}'}</code></pre>
      <p style={pStyle}>
        {isZh
          ? 'useOptimistic hook 可以在等待服务器响应时立即更新 UI，提供即时反馈。useActionState 提供 pending 状态用于显示加载指示器并接收服务端返回的验证错误。Server Actions 不限于表单——它们可以在任何客户端事件中调用。'
          : 'The useOptimistic hook updates the UI immediately while waiting for the server response, providing instant feedback. useActionState provides a pending state for loading indicators and receives server-side validation errors. Server Actions are not limited to forms — they can be called from any client-side event.'}
      </p>
      <div style={tipBoxStyle}>
        <strong>{isZh ? '最佳实践：' : 'Best practice:'}</strong>{' '}
        {isZh
          ? '始终在 Server Actions 中验证输入数据。使用 zod 等库进行服务端验证，因为客户端验证可以被绕过。调用 revalidatePath 或 revalidateTag 确保缓存更新。'
          : 'Always validate input data in Server Actions. Use libraries like zod for server-side validation since client-side validation can be bypassed. Call revalidatePath or revalidateTag to ensure the cache updates.'}
      </div>

      <h3 style={h3Style}>{isZh ? 'Server Actions 与 API 路由的选择' : 'Server Actions vs API Routes'}</h3>
      <p style={pStyle}>
        {isZh
          ? 'Server Actions 适用于表单提交、数据变更、与 UI 紧密耦合的操作。API Routes (Route Handlers) 适用于第三方 webhook、公开 API 端点、文件下载/上传和 SSE 流。一般原则：如果操作由用户在前端触发，用 Server Actions；如果需要被外部系统调用，用 Route Handlers。'
          : 'Server Actions are ideal for form submissions, data mutations, and operations tightly coupled with the UI. API Routes (Route Handlers) are ideal for third-party webhooks, public API endpoints, file downloads/uploads, and SSE streams. General rule: if the operation is triggered by a user in the frontend, use Server Actions; if it needs to be called by external systems, use Route Handlers.'}
      </p>
      <p style={pStyle}>
        {isZh
          ? 'Server Actions 的另一大优势是类型安全——你可以直接在客户端代码中导入并调用服务端函数，TypeScript 会自动推导参数和返回值类型。这消除了手动定义 API 请求和响应类型的样板代码。'
          : 'Another major advantage of Server Actions is type safety — you can directly import and call server functions from client code, and TypeScript automatically infers parameter and return types. This eliminates the boilerplate of manually defining API request and response types.'}
      </p>

      {/* Section 5 */}
      <h2 style={h2Style}>{isZh ? '5. 中间件' : '5. Middleware'}</h2>
      <p style={pStyle}>
        {isZh
          ? 'Next.js 中间件在边缘运行，在请求到达任何路由之前执行。它适合认证检查、基于地理位置的重定向、请求头操作、A/B 测试和国际化语言检测。中间件文件必须放在项目根目录（与 app 目录同级）。'
          : 'Next.js Middleware runs at the edge, executing before a request reaches any route. It is ideal for authentication checks, geolocation-based redirects, header manipulation, A/B testing, and i18n locale detection. The middleware file must be at the project root (alongside the app directory).'}
      </p>
      <pre style={preStyle}><code>{'// middleware.ts\n' + "import { NextResponse } from 'next/server';\n" + "import type { NextRequest } from 'next/server';\n\n" + 'export function middleware(request: NextRequest) {\n' + "  const token = request.cookies.get('session-token')?.value;\n" + "  const isProtected = request.nextUrl.pathname.startsWith('/dashboard');\n\n" + '  if (isProtected && !token) {\n' + "    return NextResponse.redirect(new URL('/login', request.url));\n" + '  }\n\n' + '  const response = NextResponse.next();\n' + "  response.headers.set('x-request-id', crypto.randomUUID());\n" + '  return response;\n' + '}\n\n' + 'export const config = {\n' + "  matcher: ['/dashboard/:path*', '/api/:path*'],\n" + '};'}</code></pre>
      <p style={pStyle}>
        {isZh
          ? 'matcher 配置精确指定中间件应用的路由。避免使用 matcher: "/(.*)" 匹配所有路由——这会让静态资源请求也经过中间件。保持中间件逻辑简单快速，不要执行数据库查询或外部 API 调用。'
          : 'The matcher config precisely specifies routes for middleware. Avoid matcher: "/(.*)" which matches all routes — this would run middleware on static asset requests too. Keep middleware logic simple and fast; do not perform database queries or external API calls.'}
      </p>
      <p style={pStyle}>
        {isZh
          ? '常见中间件用例：检查 JWT token 有效性、根据 Accept-Language 头重定向到对应语言版本、为 A/B 测试设置 cookie 和重写 URL、添加安全相关的响应头（CSP、CORS）。'
          : 'Common middleware use cases: checking JWT token validity, redirecting to locale versions based on the Accept-Language header, setting cookies and rewriting URLs for A/B tests, and adding security-related response headers (CSP, CORS).'}
      </p>
      <div style={tipBoxStyle}>
        <strong>{isZh ? '注意：' : 'Note:'}</strong>{' '}
        {isZh
          ? '中间件只能使用 Edge Runtime 支持的 API。这意味着不能使用 Node.js 特定的模块如 fs、path 或大多数 npm 包。如果需要访问数据库，考虑使用支持边缘运行时的客户端（如 Planetscale 或 Neon）。'
          : 'Middleware can only use APIs supported by the Edge Runtime. This means no Node.js-specific modules like fs, path, or most npm packages. If you need database access, consider using edge-compatible clients like Planetscale or Neon.'}
      </div>

      {/* Section 6 */}
      <h2 style={h2Style}>{isZh ? '6. Route Handlers (API 路由)' : '6. Route Handlers (API Routes)'}</h2>
      <p style={pStyle}>
        {isZh
          ? 'Route Handlers 在 App Router 中创建 RESTful API 端点。使用 route.ts 文件定义 GET、POST、PUT、DELETE 等 HTTP 方法。它们使用 Web 标准 Request/Response API，支持流式响应和 Server-Sent Events。'
          : 'Route Handlers create RESTful API endpoints in the App Router. Use route.ts files to define GET, POST, PUT, DELETE and other HTTP methods. They use the Web standard Request/Response API, supporting streaming responses and Server-Sent Events.'}
      </p>
      <pre style={preStyle}><code>{'// app/api/stream/route.ts — Server-Sent Events\n' + 'export async function GET() {\n' + '  const encoder = new TextEncoder();\n' + '  const stream = new ReadableStream({\n' + '    async start(controller) {\n' + "      const events = ['Processing...', 'Analyzing...', 'Done!'];\n" + '      for (const event of events) {\n' + '        await new Promise(r => setTimeout(r, 1000));\n' + "        controller.enqueue(encoder.encode('data: ' + event + '\\n\\n'));\n" + '      }\n' + '      controller.close();\n' + '    },\n' + '  });\n' + '  return new Response(stream, {\n' + "    headers: { 'Content-Type': 'text/event-stream' },\n" + '  });\n' + '}'}</code></pre>
      <p style={pStyle}>
        {isZh
          ? 'GET Route Handlers 在不使用动态函数（cookies()、headers()、searchParams）时默认静态缓存。使用 export const dynamic = "force-dynamic" 禁用缓存。注意 route.ts 不能与同目录的 page.tsx 共存——它们会冲突。'
          : 'GET Route Handlers are statically cached by default when not using dynamic functions (cookies(), headers(), searchParams). Use export const dynamic = "force-dynamic" to disable caching. Note that route.ts cannot coexist with page.tsx in the same directory — they would conflict.'}
      </p>
      <p style={pStyle}>
        {isZh
          ? 'Route Handlers 适合第三方 webhook 接收端点、文件上传处理、SSE 流式推送、以及需要自定义响应头或状态码的场景。对于纯数据变更操作，优先使用 Server Actions 而非 Route Handlers。'
          : 'Route Handlers are ideal for third-party webhook endpoints, file upload handling, SSE streaming, and scenarios requiring custom response headers or status codes. For pure data mutations, prefer Server Actions over Route Handlers.'}
      </p>

      <h3 style={h3Style}>{isZh ? 'Route Handlers 高级模式' : 'Advanced Route Handler Patterns'}</h3>
      <p style={pStyle}>
        {isZh
          ? 'Route Handlers 支持所有 Web 标准 Response 类型。你可以返回 JSON、纯文本、二进制流、重定向和自定义状态码。对于文件下载场景，设置 Content-Disposition 头和正确的 Content-Type。对于 CORS 请求，在 OPTIONS 方法中返回适当的 Access-Control 头。'
          : 'Route Handlers support all Web standard Response types. You can return JSON, plain text, binary streams, redirects, and custom status codes. For file download scenarios, set the Content-Disposition header and correct Content-Type. For CORS requests, return appropriate Access-Control headers in the OPTIONS method.'}
      </p>
      <p style={pStyle}>
        {isZh
          ? '使用动态路由段（如 app/api/users/[id]/route.ts）创建 RESTful 端点。通过解构 params 参数获取动态值。Route Handlers 可以导出 GET、POST、PUT、PATCH、DELETE、HEAD 和 OPTIONS 方法。'
          : 'Use dynamic route segments (like app/api/users/[id]/route.ts) to create RESTful endpoints. Destructure the params argument to get dynamic values. Route Handlers can export GET, POST, PUT, PATCH, DELETE, HEAD, and OPTIONS methods.'}
      </p>
      <div style={tipBoxStyle}>
        <strong>{isZh ? '注意：' : 'Note:'}</strong>{' '}
        {isZh
          ? 'Route Handlers 默认运行在 Node.js 运行时。如果需要使用 Edge Runtime（更快的冷启动、更低的延迟），添加 export const runtime = "edge"。但 Edge Runtime 不支持所有 Node.js API，如 fs 模块和某些 npm 包。'
          : 'Route Handlers run in the Node.js runtime by default. For the Edge Runtime (faster cold starts, lower latency), add export const runtime = "edge". However, Edge Runtime does not support all Node.js APIs, such as the fs module and certain npm packages.'}
      </div>

      {/* Section 7 */}
      <h2 style={h2Style}>{isZh ? '7. 缓存策略' : '7. Caching Strategies'}</h2>
      <p style={pStyle}>
        {isZh
          ? 'Next.js 的缓存是性能优化的核心，也是最容易产生困惑的部分。App Router 引入了一个四层缓存体系，每层解决不同层级的缓存需求。理解每层的行为、持续时间和失效机制至关重要。'
          : 'Caching in Next.js is central to performance optimization and also the most confusing part. The App Router introduces a four-layer caching system, with each layer addressing caching needs at different levels. Understanding the behavior, duration, and invalidation mechanism of each layer is crucial.'}
      </p>
      <ul style={ulStyle}>
        <li><strong style={strongStyle}>{isZh ? '请求记忆化' : 'Request Memoization'}</strong> — {isZh ? '同一 render pass 中相同 fetch 自动去重，无需手动管理，组件树中多处获取相同数据只触发一次请求' : 'Identical fetch calls in the same render pass are deduplicated automatically; fetching the same data in multiple places in the component tree triggers only one request'}</li>
        <li><strong style={strongStyle}>{isZh ? '数据缓存' : 'Data Cache'}</strong> — {isZh ? '跨请求和部署持久化 fetch 结果，通过 revalidate 时间或 tags 标签控制失效' : 'Persists fetch results across requests and deployments, controlled via revalidate time or tags for invalidation'}</li>
        <li><strong style={strongStyle}>{isZh ? '完整路由缓存' : 'Full Route Cache'}</strong> — {isZh ? '构建时缓存渲染的 HTML 和 RSC Payload，用于静态路由的即时响应' : 'Caches rendered HTML and RSC Payload at build time for instant responses on static routes'}</li>
        <li><strong style={strongStyle}>{isZh ? '路由器缓存' : 'Router Cache'}</strong> — {isZh ? '客户端缓存预获取的路由段，实现前进/后退的即时导航体验' : 'Client-side cache of prefetched route segments, enabling instant forward/back navigation'}</li>
      </ul>
      <pre style={preStyle}><code>{'// Opting out of caching at each level\n\n' + '// No data cache — always fetch fresh data\n' + "const data = await fetch(url, { cache: 'no-store' });\n\n" + '// Time-based revalidation — refresh every 60s\n' + 'const data = await fetch(url, { next: { revalidate: 60 } });\n\n' + '// Tag-based invalidation\n' + "const data = await fetch(url, { next: { tags: ['products'] } });\n" + "// Invalidate: revalidateTag('products');\n\n" + '// Route segment config — disable full route cache\n' + "export const dynamic = 'force-dynamic';\n" + 'export const revalidate = 0;'}</code></pre>
      <p style={pStyle}>
        {isZh
          ? '在开发环境中，所有缓存层默认禁用以便调试。生产环境中，使用 router.refresh() 手动刷新客户端路由器缓存。如果你的页面数据总是过期，首先检查是否正确配置了 revalidate 选项。'
          : 'In development, all caching layers are disabled by default for easier debugging. In production, use router.refresh() to manually refresh the client-side Router Cache. If your page data is always stale, first check whether the revalidate option is correctly configured.'}
      </p>

      <h3 style={h3Style}>{isZh ? '缓存调试技巧' : 'Cache Debugging Tips'}</h3>
      <p style={pStyle}>
        {isZh
          ? '当缓存行为不符合预期时，可以通过以下方式排查：在 fetch 请求中添加自定义 header 检查请求是否真正发出、查看 Next.js 构建输出中的路由类型标记（静态 / 动态）、使用 next build 的输出日志确认哪些页面被静态生成。'
          : 'When caching behavior does not match expectations, debug by: adding custom headers to fetch requests to verify they are actually sent, checking route type markers (static/dynamic) in the Next.js build output, and using the build log to confirm which pages are statically generated.'}
      </p>
      <p style={pStyle}>
        {isZh
          ? '一个常见的混淆点：即使你在 fetch 中设置了 revalidate: 60，如果该路由的 generateStaticParams 没有返回对应的参数，页面仍然会在每次请求时动态渲染。确保你的静态生成参数配置正确。'
          : 'A common point of confusion: even if you set revalidate: 60 on a fetch call, if the route generateStaticParams does not return the corresponding parameters, the page will still dynamically render on every request. Make sure your static generation parameters are correctly configured.'}
      </p>
      <p style={pStyle}>
        {isZh
          ? '注意 Next.js 构建输出中的路由标记：圆圈 (○) 表示静态路由，lambda (λ) 表示动态路由。如果一个你期望是静态的路由被标记为动态，检查是否在该路由中使用了 cookies()、headers()、searchParams 或 cache: "no-store" 等动态 API。'
          : 'Pay attention to route markers in the Next.js build output: circle (○) indicates a static route, lambda (λ) indicates a dynamic route. If a route you expect to be static is marked as dynamic, check whether you are using dynamic APIs like cookies(), headers(), searchParams, or cache: "no-store" in that route.'}
      </p>

      {/* Section 8 */}
      <h2 style={h2Style}>{isZh ? '8. 图片与字体优化' : '8. Image & Font Optimization'}</h2>
      <p style={pStyle}>
        {isZh
          ? 'next/image 自动优化图片：转换 WebP/AVIF 格式、生成响应式 srcset、默认懒加载、通过强制 width/height 防止累积布局偏移 (CLS)。next/font 自托管字体，消除外部网络请求并通过 CSS size-adjust 实现零布局偏移。'
          : 'next/image automatically optimizes images: converts to WebP/AVIF formats, generates responsive srcsets, lazy-loads by default, and prevents Cumulative Layout Shift (CLS) by requiring width/height. next/font self-hosts fonts, eliminating external requests and achieving zero layout shift through CSS size-adjust.'}
      </p>
      <pre style={preStyle}><code>{"import Image from 'next/image';\n" + "import { Inter, Fira_Code } from 'next/font/google';\n\n" + "const inter = Inter({ subsets: ['latin'], display: 'swap' });\n" + "const firaCode = Fira_Code({\n" + "  subsets: ['latin'],\n" + "  weight: ['400', '700'],\n" + '});\n\n' + 'export default function Page() {\n' + '  return (\n' + '    <div style={{ fontFamily: inter.style.fontFamily }}>\n' + '      <Image\n' + '        src="/hero.jpg" alt="Hero"\n' + '        width={1200} height={630}\n' + '        placeholder="blur"\n' + '        blurDataURL="data:image/jpeg;base64,/9j/4AAQ..."\n' + '        priority\n' + '      />\n' + '    </div>\n' + '  );\n' + '}'}</code></pre>
      <p style={pStyle}>
        {isZh
          ? '对首屏可见图片使用 priority 预加载以提升 LCP 分数。使用 sizes 属性帮助浏览器选择正确的响应式尺寸。远程图片需在 next.config.js 的 images.remotePatterns 中配置允许的域名、协议和路径。生成 blurDataURL 可使用 plaiceholder 库或 Next.js 内置的静态导入 blur 功能。'
          : 'Use priority on above-the-fold images to improve LCP scores. Use the sizes prop to help browsers pick the correct responsive size. Remote images require allowed domains, protocols, and paths in images.remotePatterns in next.config.js. Generate blurDataURL using the plaiceholder library or the built-in blur feature for static imports.'}
      </p>

      <h3 style={h3Style}>{isZh ? '图片优化检查清单' : 'Image Optimization Checklist'}</h3>
      <ul style={ulStyle}>
        <li>{isZh ? '首屏可见图片添加 priority={true}，触发预加载' : 'Add priority={true} to above-the-fold images to trigger preloading'}</li>
        <li>{isZh ? '提供准确的 sizes 属性（如 "(max-width: 768px) 100vw, 50vw"）避免下载过大图片' : 'Provide accurate sizes prop (e.g., "(max-width: 768px) 100vw, 50vw") to avoid downloading oversized images'}</li>
        <li>{isZh ? '使用 placeholder="blur" 提供模糊占位符，减少视觉跳动' : 'Use placeholder="blur" for blur-up placeholders to reduce visual jank'}</li>
        <li>{isZh ? '为装饰性图片设置 aria-hidden 或空 alt 文本' : 'Set aria-hidden or empty alt text for decorative images'}</li>
        <li>{isZh ? '考虑使用 quality 属性（默认75）在质量和文件大小间取得平衡' : 'Consider using the quality prop (default 75) to balance between quality and file size'}</li>
      </ul>
      <p style={pStyle}>
        {isZh
          ? 'next/font 通过在构建时下载字体文件并作为静态资源提供，消除了运行时的外部字体请求。display: "swap" 确保文本在字体加载前使用后备字体显示。结合 variable 选项可以创建 CSS 变量用于在不同组件中引用字体。'
          : 'next/font eliminates runtime external font requests by downloading font files at build time and serving them as static assets. display: "swap" ensures text renders with fallback fonts before the custom font loads. Combined with the variable option, you can create CSS variables to reference fonts across different components.'}
      </p>

      {/* Section 9 */}
      <h2 style={h2Style}>{isZh ? '9. 国际化 (i18n)' : '9. Internationalization (i18n)'}</h2>
      <p style={pStyle}>
        {isZh
          ? 'App Router 通过 [lang] 动态路由段和中间件语言检测实现国际化。这种方式不依赖外部 i18n 库——使用字典文件管理翻译，通过 getDictionary(lang) 在 Server Components 中加载。'
          : 'The App Router implements i18n through [lang] dynamic route segments and middleware locale detection. This approach requires no external i18n library — translations are managed via dictionary files and loaded through getDictionary(lang) in Server Components.'}
      </p>
      <pre style={preStyle}><code>{'// middleware.ts — locale detection and redirect\n' + "import { match } from '@formatjs/intl-localematcher';\n" + "import Negotiator from 'negotiator';\n\n" + "const locales = ['en', 'zh', 'ja', 'de'];\n" + "const defaultLocale = 'en';\n\n" + 'function getLocale(request: Request): string {\n' + '  const headers = {\n' + "    'accept-language': request.headers.get('accept-language') || ''\n" + '  };\n' + '  const languages = new Negotiator({ headers }).languages();\n' + '  return match(languages, locales, defaultLocale);\n' + '}\n\n' + '// app/[lang]/layout.tsx — generate all locale params\n' + 'export async function generateStaticParams() {\n' + "  return [{ lang: 'en' }, { lang: 'zh' }, { lang: 'ja' }];\n" + '}'}</code></pre>
      <p style={pStyle}>
        {isZh
          ? '为每个语言使用 generateStaticParams 预渲染页面。如果语言版本过多导致构建时间过长，考虑只预渲染主要语言，其余使用 ISR 按需生成。将翻译字典文件放在 Server Components 中加载以避免增大客户端包体积。'
          : 'Use generateStaticParams to pre-render pages for each locale. If too many locales cause long build times, consider pre-rendering only the main locale and using ISR for the rest. Load translation dictionaries in Server Components to avoid bloating the client bundle.'}
      </p>
      <p style={pStyle}>
        {isZh
          ? '为不同语言版本配置 hreflang 标签以帮助搜索引擎理解页面间的语言关系。在 metadata 中使用 alternates.languages 对象自动生成这些标签。'
          : 'Configure hreflang tags for different language versions to help search engines understand the language relationship between pages. Use the alternates.languages object in metadata to automatically generate these tags.'}
      </p>

      <h3 style={h3Style}>{isZh ? 'i18n 性能优化' : 'i18n Performance Optimization'}</h3>
      <p style={pStyle}>
        {isZh
          ? '当支持的语言版本较多时（例如 15 种以上），在构建时预渲染所有语言的所有页面可能导致构建时间过长和输出体积过大。推荐策略是：只预渲染默认语言和流量最大的 2-3 种语言，其余语言使用 ISR 按需生成。这种方式可以将构建时间从数十分钟缩短到几分钟。'
          : 'When supporting many locale versions (e.g., 15+), pre-rendering all pages in all locales can cause long build times and excessive output size. The recommended strategy: only pre-render the default locale and the 2-3 highest-traffic locales, using ISR for the rest. This approach can reduce build time from tens of minutes to just a few minutes.'}
      </p>
      <p style={pStyle}>
        {isZh
          ? '将翻译字典文件保持在合理大小。如果翻译内容超过几百 KB，考虑按页面或功能模块拆分字典，只在需要时加载对应部分。在 Server Components 中加载字典不会增加客户端包体积。'
          : 'Keep translation dictionary files at a reasonable size. If translations exceed a few hundred KB, consider splitting dictionaries by page or feature module, loading only the relevant parts when needed. Loading dictionaries in Server Components does not add to the client bundle.'}
      </p>
      <div style={tipBoxStyle}>
        <strong>{isZh ? '提示：' : 'Tip:'}</strong>{' '}
        {isZh
          ? '使用 generateMetadata 函数为每个语言版本生成本地化的 SEO 元数据（title、description、Open Graph 标签）。这对多语言站点的搜索引擎排名至关重要。同时在 alternates 中设置 canonical URL 和 hreflang 链接。'
          : 'Use the generateMetadata function to produce localized SEO metadata (title, description, Open Graph tags) for each locale. This is crucial for search engine ranking on multilingual sites. Also set canonical URLs and hreflang links in alternates.'}
      </div>

      {/* Section 10 */}
      <h2 style={h2Style}>{isZh ? '10. 认证' : '10. Authentication'}</h2>
      <p style={pStyle}>
        {isZh
          ? 'NextAuth.js (Auth.js v5) 与 App Router 深度集成，提供 OAuth、Credentials 和 Magic Link 认证策略。Session 支持 JWT（无状态，适合边缘运行时）和数据库模式（适合需要服务端控制的会话管理）。'
          : 'NextAuth.js (Auth.js v5) integrates deeply with the App Router, providing OAuth, Credentials, and Magic Link authentication strategies. Session management supports JWT (stateless, ideal for edge runtimes) and database mode (ideal for server-controlled session management).'}
      </p>
      <pre style={preStyle}><code>{'// auth.ts — NextAuth.js v5 configuration\n' + "import NextAuth from 'next-auth';\n" + "import GitHub from 'next-auth/providers/github';\n\n" + 'export const { handlers, auth, signIn, signOut } = NextAuth({\n' + '  providers: [GitHub],\n' + '  callbacks: {\n' + '    authorized({ auth, request: { nextUrl } }) {\n' + '      const isLoggedIn = !!auth?.user;\n' + "      const isProtected = nextUrl.pathname.startsWith('/dashboard');\n" + '      if (isProtected && !isLoggedIn) return false;\n' + '      return true;\n' + '    },\n' + '  },\n' + '});\n\n' + '// app/dashboard/page.tsx — protected page\n' + "import { auth } from '@/auth';\n" + 'export default async function Dashboard() {\n' + '  const session = await auth();\n' + '  return <div>Welcome, {session?.user?.name}</div>;\n' + '}'}</code></pre>
      <p style={pStyle}>
        {isZh
          ? 'auth() 可在 Server Components、Route Handlers 和 Server Actions 中使用。authorized 回调配合中间件保护整个路由组。对于需要更细粒度控制的场景，在页面中调用 auth() 并根据角色条件渲染不同内容。'
          : 'auth() can be used in Server Components, Route Handlers, and Server Actions. The authorized callback combined with middleware protects entire route groups. For finer-grained control, call auth() in pages and conditionally render based on user roles.'}
      </p>
      <p style={pStyle}>
        {isZh
          ? '对于不使用 NextAuth 的场景，你可以在中间件中直接验证 JWT token，或使用 iron-session 等轻量级库管理加密 cookie 会话。核心思路保持不变：在中间件中做路由级保护，在组件中做细粒度权限检查。'
          : 'For scenarios not using NextAuth, you can verify JWT tokens directly in middleware, or use lightweight libraries like iron-session for encrypted cookie sessions. The core concept remains the same: route-level protection in middleware, fine-grained permission checks in components.'}
      </p>

      <h3 style={h3Style}>{isZh ? '认证安全最佳实践' : 'Authentication Security Best Practices'}</h3>
      <ul style={ulStyle}>
        <li>{isZh ? '使用 HttpOnly + Secure + SameSite=Lax 的 cookie 存储 session token，防止 XSS 和 CSRF 攻击' : 'Store session tokens in HttpOnly + Secure + SameSite=Lax cookies to prevent XSS and CSRF attacks'}</li>
        <li>{isZh ? '在中间件中只做快速的 token 存在性检查，将完整的 token 验证放在 Server Components 或 Route Handlers 中' : 'Only do quick token existence checks in middleware; put full token validation in Server Components or Route Handlers'}</li>
        <li>{isZh ? '使用 CSRF token 保护 Server Actions，NextAuth 默认提供此功能' : 'Protect Server Actions with CSRF tokens; NextAuth provides this by default'}</li>
        <li>{isZh ? '定期轮换 session secret，使用环境变量管理密钥' : 'Regularly rotate session secrets, manage keys through environment variables'}</li>
        <li>{isZh ? '对敏感操作实施速率限制，防止暴力破解攻击' : 'Implement rate limiting on sensitive operations to prevent brute-force attacks'}</li>
      </ul>
      <p style={pStyle}>
        {isZh
          ? '在多租户应用中，确保认证中间件不仅检查用户是否已登录，还要验证用户是否有权限访问请求的资源。将授权逻辑放在 Server Components 或 Server Actions 中，在数据层面进行细粒度的权限检查。'
          : 'In multi-tenant applications, ensure authentication middleware not only checks if the user is logged in but also verifies they have permission to access the requested resource. Place authorization logic in Server Components or Server Actions for fine-grained permission checks at the data level.'}
      </p>

      {/* Section 11 */}
      <h2 style={h2Style}>{isZh ? '11. ISR 与按需重新验证' : '11. ISR & On-Demand Revalidation'}</h2>
      <p style={pStyle}>
        {isZh
          ? 'ISR 让你在不重建整个站点的情况下更新静态页面。App Router 提供基于时间和按需两种重新验证方式。revalidatePath 按路径失效，revalidateTag 按数据标签失效——后者更灵活，因为一个标签可以关联多个页面的多个 fetch 调用。'
          : 'ISR lets you update static pages without rebuilding the entire site. The App Router provides both time-based and on-demand revalidation. revalidatePath invalidates by path, revalidateTag invalidates by data tag — the latter is more flexible since one tag can be associated with multiple fetch calls across multiple pages.'}
      </p>
      <pre style={preStyle}><code>{'// Time-based ISR — auto-revalidate every 60s\n' + 'export const revalidate = 60;\n\n' + 'async function BlogPost({ slug }: { slug: string }) {\n' + "  const post = await fetch('https://cms.example.com/posts/' + slug, {\n" + "    next: { tags: ['post-' + slug] },\n" + '  }).then(r => r.json());\n' + '  return <article>{post.title}</article>;\n' + '}\n\n' + '// On-demand revalidation via CMS webhook\n' + '// app/api/revalidate/route.ts\n' + "import { revalidateTag } from 'next/cache';\n\n" + 'export async function POST(request: Request) {\n' + '  const { slug } = await request.json();\n' + "  revalidateTag('post-' + slug);\n" + "  return Response.json({ revalidated: true });\n" + '}'}</code></pre>
      <p style={pStyle}>
        {isZh
          ? '典型流程：内容编辑在 CMS 中发布文章 -> CMS webhook 调用 /api/revalidate -> revalidateTag 标记相关数据为过期 -> 下一次请求触发重新生成。这比定时重新验证更高效，因为只在数据变更时才刷新。'
          : 'Typical flow: content editor publishes in CMS -> CMS webhook calls /api/revalidate -> revalidateTag marks related data as stale -> next request triggers regeneration. This is more efficient than time-based revalidation since it only refreshes when data actually changes.'}
      </p>
      <div style={tipBoxStyle}>
        <strong>{isZh ? '提示：' : 'Tip:'}</strong>{' '}
        {isZh
          ? '在 revalidation API 路由中添加密钥验证，防止未授权的缓存失效请求。使用环境变量存储密钥并在请求头中校验。'
          : 'Add secret key verification to the revalidation API route to prevent unauthorized cache invalidation requests. Store the secret in environment variables and verify it in the request headers.'}
      </div>

      <h3 style={h3Style}>{isZh ? 'ISR 与 SSG 的区别' : 'ISR vs SSG Differences'}</h3>
      <p style={pStyle}>
        {isZh
          ? '静态站点生成 (SSG) 在构建时一次性生成所有页面，之后不再更新。ISR 在此基础上增加了后台重新生成的能力——当 revalidate 时间到期或按需触发时，Next.js 在后台生成新版本，旧版本继续服务请求直到新版本就绪。这种 stale-while-revalidate 策略确保用户永远不会看到加载状态。'
          : 'Static Site Generation (SSG) generates all pages once at build time and never updates them. ISR adds background regeneration on top of this — when the revalidate time expires or on-demand revalidation triggers, Next.js generates a new version in the background while the old version continues serving requests. This stale-while-revalidate strategy ensures users never see a loading state.'}
      </p>
      <p style={pStyle}>
        {isZh
          ? '对于拥有大量内容的站点（如电商网站的数千个产品页），在构建时生成所有页面不现实。使用 dynamicParams: true（默认值）允许未在 generateStaticParams 中列出的路径在首次请求时按需生成并缓存。结合 revalidate 配置实现完美的 ISR 策略。'
          : 'For sites with massive content (like thousands of product pages on an e-commerce site), generating all pages at build time is impractical. Use dynamicParams: true (the default) to allow paths not listed in generateStaticParams to be generated on-demand upon first request and cached. Combined with revalidate configuration, this achieves a perfect ISR strategy.'}
      </p>
      <p style={pStyle}>
        {isZh
          ? '如果你需要在内容删除时返回 404 而非显示过期内容，可以在 Server Component 中检查数据是否存在，不存在时调用 notFound() 函数。这会触发最近的 not-found.tsx 文件渲染。'
          : 'If you need to return 404 when content is deleted instead of showing stale content, check whether data exists in the Server Component and call notFound() if it does not. This triggers the nearest not-found.tsx file to render.'}
      </p>

      {/* Section 12 */}
      <h2 style={h2Style}>{isZh ? '12. 平行路由与拦截路由' : '12. Parallel & Intercepting Routes'}</h2>
      <p style={pStyle}>
        {isZh
          ? '平行路由使用 @folder 约定在同一布局中同时渲染多个页面。每个 slot 独立加载和出错，非常适合仪表盘的独立面板。拦截路由使用 (.) 约定在不同上下文中展示路由——最典型的场景是照片画廊中的模态框。'
          : 'Parallel routes use the @folder convention to render multiple pages simultaneously in the same layout. Each slot loads and errors independently, perfect for independent dashboard panels. Intercepting routes use the (.) convention to show a route in a different context — the most typical scenario is a modal in a photo gallery.'}
      </p>
      <pre style={preStyle}><code>{'// Parallel routes — dashboard layout\n' + '// app/dashboard/layout.tsx\n' + 'export default function Layout({\n' + '  children,\n' + '  analytics,\n' + '  team,\n' + '}: {\n' + '  children: React.ReactNode;\n' + '  analytics: React.ReactNode;\n' + '  team: React.ReactNode;\n' + '}) {\n' + '  return (\n' + '    <div>\n' + '      {children}\n' + '      {analytics}  {/* @analytics/page.tsx */}\n' + '      {team}       {/* @team/page.tsx */}\n' + '    </div>\n' + '  );\n' + '}'}</code></pre>
      <p style={pStyle}>
        {isZh
          ? '拦截层级约定：(.) 匹配同级、(..) 上一级、(..)(..) 上两级、(...) 匹配根级。结合两者可以创建模态框体验——软导航（Link 点击）显示模态框叠加层，硬导航（直接访问 URL 或刷新）显示完整页面，且 URL 保持可共享。'
          : 'Interception level conventions: (.) matches same level, (..) one level up, (..)(..) two levels up, (...) matches root. Combining both creates a modal experience — soft navigation (Link click) shows a modal overlay, hard navigation (direct URL visit or refresh) shows the full page, and the URL remains shareable.'}
      </p>
      <p style={pStyle}>
        {isZh
          ? '为平行路由的每个 slot 提供 default.tsx 文件，定义当该 slot 没有匹配的活动路由时应该渲染的内容。这避免了 Next.js 在导航时因找不到匹配内容而返回 404。'
          : 'Provide a default.tsx file for each parallel route slot, defining what to render when the slot has no matching active route. This prevents Next.js from returning a 404 when no matching content is found during navigation.'}
      </p>

      <h3 style={h3Style}>{isZh ? '模态框路由实战模式' : 'Modal Route Pattern in Practice'}</h3>
      <p style={pStyle}>
        {isZh
          ? '实现模态框路由的典型结构：使用 @modal 平行 slot 配合拦截路由。例如照片画廊中，/photos/[id] 是完整页面，(.)photos/[id] 拦截该路由在模态框中展示。用户通过 Link 组件导航时看到模态框覆盖层；直接访问 URL 或刷新页面时看到完整的照片详情页。这提供了最佳的用户体验和 URL 可共享性。'
          : 'Typical structure for a modal route: use an @modal parallel slot with intercepting routes. For example in a photo gallery, /photos/[id] is the full page, and (.)photos/[id] intercepts the route to display it in a modal. Users navigating via Link components see a modal overlay; visiting the URL directly or refreshing shows the full photo detail page. This provides optimal user experience and URL shareability.'}
      </p>
      <p style={pStyle}>
        {isZh
          ? '在 @modal 的 default.tsx 中返回 null，这样当没有模态框活动时不渲染任何内容。在模态框组件内部处理关闭逻辑时使用 router.back() 返回上一页，保持浏览器历史记录的正确性。'
          : 'Return null in the @modal default.tsx so nothing renders when no modal is active. When handling close logic inside the modal component, use router.back() to go back, maintaining correct browser history.'}
      </p>

      {/* Section 13 */}
      <h2 style={h2Style}>{isZh ? '13. 部署与监控' : '13. Deployment & Monitoring'}</h2>
      <p style={pStyle}>
        {isZh
          ? '选择部署方式取决于你的需求：Vercel 提供零配置部署，自动处理边缘函数、ISR、图片优化和全球 CDN，是最省心的选择。自托管则提供完全的控制权，适合有特殊合规要求或已有基础设施的团队。'
          : 'Choosing a deployment approach depends on your needs: Vercel provides zero-config deployment, automatically handling edge functions, ISR, image optimization, and global CDN — the easiest choice. Self-hosting offers full control, suitable for teams with specific compliance requirements or existing infrastructure.'}
      </p>
      <p style={pStyle}>
        {isZh
          ? '自托管时，使用 output: "standalone" 生成精简的 Node.js 服务器，包含运行时需要的所有依赖。配合 Docker 多阶段构建将镜像缩到最小——通常可以从 1GB+ 缩到 100-200MB。OpenTelemetry 集成提供请求级别的追踪和性能监控。'
          : 'For self-hosting, use output: "standalone" to generate a minimal Node.js server including all runtime dependencies. Multi-stage Docker builds minimize image size — typically from 1GB+ down to 100-200MB. OpenTelemetry integration provides request-level tracing and performance monitoring.'}
      </p>
      <pre style={preStyle}><code>{'# Multi-stage Dockerfile for Next.js\n' + 'FROM node:20-alpine AS deps\n' + 'WORKDIR /app\n' + 'COPY package*.json ./\n' + 'RUN npm ci --only=production\n\n' + 'FROM node:20-alpine AS builder\n' + 'WORKDIR /app\n' + 'COPY . .\n' + 'RUN npm ci && npm run build\n\n' + 'FROM node:20-alpine AS runner\n' + 'WORKDIR /app\n' + 'ENV NODE_ENV=production\n' + 'COPY --from=builder /app/.next/standalone ./\n' + 'COPY --from=builder /app/.next/static ./.next/static\n' + 'COPY --from=builder /app/public ./public\n' + 'EXPOSE 3000\n' + 'CMD ["node", "server.js"]'}</code></pre>
      <p style={pStyle}>
        {isZh
          ? '在 next.config.js 中设置 output: "standalone"。创建 /api/health 健康检查端点供 Kubernetes 或负载均衡器使用。Nginx 反向代理处理 SSL 终止、gzip 压缩和静态资源长期缓存。使用 PM2 的 cluster 模式充分利用多核 CPU。'
          : 'Set output: "standalone" in next.config.js. Create a /api/health endpoint for Kubernetes or load balancers. Nginx reverse proxy handles SSL termination, gzip compression, and long-term caching of static assets. Use PM2 cluster mode to fully utilize multi-core CPUs.'}
      </p>
      <div style={tipBoxStyle}>
        <strong>{isZh ? '监控要点：' : 'Monitoring essentials:'}</strong>{' '}
        {isZh
          ? '集成 @vercel/otel 启用 OpenTelemetry 追踪。监控 Core Web Vitals（LCP、FID、CLS）。在 instrumentation.ts 文件中初始化 SDK，追踪服务端请求延迟和数据库查询耗时。'
          : 'Integrate @vercel/otel for OpenTelemetry tracing. Monitor Core Web Vitals (LCP, FID, CLS). Initialize the SDK in the instrumentation.ts file to trace server request latency and database query duration.'}
      </div>

      <h3 style={h3Style}>{isZh ? '生产部署检查清单' : 'Production Deployment Checklist'}</h3>
      <ul style={ulStyle}>
        <li>{isZh ? '在 next.config.js 中设置 output: "standalone" 以生成精简的独立服务器' : 'Set output: "standalone" in next.config.js to generate a minimal standalone server'}</li>
        <li>{isZh ? '创建 /api/health 端点返回 200 状态码，供负载均衡器和 Kubernetes 探针使用' : 'Create a /api/health endpoint returning 200 for load balancers and Kubernetes probes'}</li>
        <li>{isZh ? '配置 Nginx 反向代理：SSL 终止、gzip/brotli 压缩、_next/static 路径的长期缓存头' : 'Configure Nginx reverse proxy: SSL termination, gzip/brotli compression, long-term cache headers for _next/static paths'}</li>
        <li>{isZh ? '设置 NEXT_SHARP_PATH 环境变量确保 Docker 中 sharp 图片库正常工作' : 'Set NEXT_SHARP_PATH environment variable to ensure the sharp image library works in Docker'}</li>
        <li>{isZh ? '使用 PM2 cluster 模式运行，充分利用服务器的多核 CPU' : 'Run with PM2 cluster mode to fully utilize the server multi-core CPU'}</li>
        <li>{isZh ? '在 instrumentation.ts 中初始化 OpenTelemetry，追踪每个请求的完整生命周期' : 'Initialize OpenTelemetry in instrumentation.ts to trace the full lifecycle of each request'}</li>
        <li>{isZh ? '配置环境变量管理（不要在 Docker 镜像中硬编码密钥）' : 'Configure environment variable management (never hardcode secrets in Docker images)'}</li>
        <li>{isZh ? '设置日志聚合（如 Datadog、Grafana Loki）监控错误率和响应时间分布' : 'Set up log aggregation (e.g., Datadog, Grafana Loki) to monitor error rates and response time distribution'}</li>
      </ul>
      <p style={pStyle}>
        {isZh
          ? '对于 Kubernetes 部署，配置就绪探针（readiness probe）指向健康检查端点，设置合理的 CPU 和内存限制，并使用 HPA (Horizontal Pod Autoscaler) 根据负载自动扩缩容。Next.js standalone 输出的内存占用通常在 100-300MB 之间，具体取决于应用大小。'
          : 'For Kubernetes deployment, configure a readiness probe pointing to the health check endpoint, set reasonable CPU and memory limits, and use HPA (Horizontal Pod Autoscaler) for automatic scaling based on load. The Next.js standalone output memory footprint is typically 100-300MB, depending on application size.'}
      </p>

      {/* Summary */}
      <h2 style={h2Style}>{isZh ? '总结' : 'Summary'}</h2>
      <p style={pStyle}>
        {isZh
          ? 'Next.js App Router 代表了 React 全栈开发的未来。Server Components 减少客户端负担，Server Actions 简化数据变更，四层缓存提供细粒度性能控制。中间件处理边缘横切关注点，ISR 实现按需增量更新。平行和拦截路由支持复杂 UI 模式。掌握这 13 个主题，你可以构建真正高性能的现代 Web 应用。'
          : 'The Next.js App Router represents the future of full-stack React development. Server Components reduce client burden, Server Actions simplify mutations, and four-layer caching provides fine-grained performance control. Middleware handles cross-cutting concerns at the edge, ISR enables on-demand incremental updates. Parallel and intercepting routes support complex UI patterns. Mastering these 13 topics enables you to build truly high-performance modern web applications.'}
      </p>
      <p style={pStyle}>
        {isZh
          ? '从小处开始：在新项目中使用 App Router，逐步采用 Server Components 和 Server Actions，在需要时引入缓存和 ISR 策略。随着对每层抽象的理解加深，你会发现 App Router 的设计决策为构建可扩展应用提供了坚实的基础。'
          : 'Start small: use the App Router in new projects, gradually adopt Server Components and Server Actions, and introduce caching and ISR strategies as needed. As your understanding of each abstraction layer deepens, you will find that the App Router design decisions provide a solid foundation for building scalable applications.'}
      </p>

      <h3 style={h3Style}>{isZh ? '迁移建议' : 'Migration Recommendations'}</h3>
      <p style={pStyle}>
        {isZh
          ? '如果你正在从 Pages Router 迁移，不需要一次性重写整个应用。Next.js 支持 app 和 pages 目录共存。推荐的迁移策略是：从新页面开始使用 App Router，然后逐步将现有页面迁移。将 getServerSideProps 替换为 Server Components 中的 async/await fetch，将 getStaticProps 替换为带 revalidate 的 fetch，将 API routes 迁移为 Route Handlers。'
          : 'If you are migrating from the Pages Router, you do not need to rewrite the entire application at once. Next.js supports coexisting app and pages directories. The recommended strategy: start using the App Router for new pages, then gradually migrate existing ones. Replace getServerSideProps with async/await fetch in Server Components, replace getStaticProps with fetch and revalidate, and migrate API routes to Route Handlers.'}
      </p>
      <p style={pStyle}>
        {isZh
          ? '在迁移过程中，注意以下关键变化：useRouter 从 next/router 变为 next/navigation，pathname 获取方式改为 usePathname()，query 参数使用 useSearchParams()，redirect 从命令式变为声明式（从 next/navigation 导入 redirect 函数）。这些 API 变化反映了从客户端路由到服务端优先路由的范式转变。'
          : 'During migration, note these key changes: useRouter moves from next/router to next/navigation, pathname is obtained via usePathname(), query params use useSearchParams(), and redirect changes from imperative to declarative (import redirect function from next/navigation). These API changes reflect the paradigm shift from client-side to server-first routing.'}
      </p>

      <h3 style={h3Style}>{isZh ? '性能优化总结' : 'Performance Optimization Summary'}</h3>
      <ul style={ulStyle}>
        <li>{isZh ? '默认使用 Server Components，将 Client Components 推到叶子节点以最小化 JS 包体积' : 'Default to Server Components and push Client Components to leaves to minimize JS bundle size'}</li>
        <li>{isZh ? '使用 Promise.all 并行获取数据，配合 Suspense 实现流式渲染' : 'Use Promise.all for parallel data fetching combined with Suspense for streaming'}</li>
        <li>{isZh ? '合理配置缓存层级：为不同数据源选择合适的 revalidate 时间或 tags' : 'Configure caching layers appropriately: choose suitable revalidate times or tags for different data sources'}</li>
        <li>{isZh ? '首屏图片使用 priority 预加载，所有图片使用 next/image 自动优化' : 'Preload above-the-fold images with priority, auto-optimize all images with next/image'}</li>
        <li>{isZh ? '使用 next/font 自托管字体消除外部请求' : 'Self-host fonts with next/font to eliminate external requests'}</li>
        <li>{isZh ? '仅预渲染高流量语言版本，其余使用 ISR 按需生成以缩短构建时间' : 'Only pre-render high-traffic locale versions; use ISR for the rest to shorten build time'}</li>
        <li>{isZh ? '使用 standalone 输出配合 Docker 多阶段构建优化部署镜像' : 'Use standalone output with multi-stage Docker builds to optimize deployment images'}</li>
        <li>{isZh ? '集成 OpenTelemetry 追踪以识别生产环境中的性能瓶颈' : 'Integrate OpenTelemetry tracing to identify production performance bottlenecks'}</li>
      </ul>

      {/* FAQ Section */}
      <h2 style={h2Style}>{isZh ? '常见问题' : 'Frequently Asked Questions'}</h2>

      <h3 style={h3Style}>{isZh ? 'Server Components 和 Client Components 有什么区别？' : 'What is the difference between Server Components and Client Components?'}</h3>
      <p style={pStyle}>
        {isZh
          ? 'Server Components 在服务器渲染，不发送 JavaScript 到客户端，可直接访问后端资源。Client Components 用 "use client" 标记，支持 useState 和事件处理器等交互。默认使用 Server Components，仅在需要交互或浏览器 API 时使用 Client Components。'
          : 'Server Components render on the server, send zero JavaScript to the client, and can directly access backend resources. Client Components use "use client" and support interactivity like useState and event handlers. Default to Server Components; use Client Components only when you need interactivity or browser APIs.'}
      </p>

      <h3 style={h3Style}>{isZh ? 'App Router 的缓存如何工作？' : 'How does caching work in the App Router?'}</h3>
      <p style={pStyle}>
        {isZh
          ? '四层缓存：请求记忆化去重同一 render pass 的 fetch，数据缓存跨请求持久化结果，完整路由缓存存储构建时的 HTML/RSC Payload，路由器缓存在客户端缓存预取的路由段。每层通过 cache、revalidate、no-store 独立配置。'
          : 'Four layers: Request Memoization deduplicates fetch in the same render pass, Data Cache persists results across requests, Full Route Cache stores build-time HTML/RSC Payload, Router Cache stores prefetched segments on the client. Each is independently configured via cache, revalidate, and no-store.'}
      </p>

      <h3 style={h3Style}>{isZh ? 'Server Actions 如何工作？' : 'What are Server Actions and how do they work?'}</h3>
      <p style={pStyle}>
        {isZh
          ? 'Server Actions 是 "use server" 标记的异步函数，在服务器运行。它们可从表单 action 或客户端事件直接调用，支持渐进增强、useOptimistic 乐观更新、useActionState 加载状态，并通过 revalidatePath/revalidateTag 触发缓存失效。'
          : 'Server Actions are async functions marked "use server" that run on the server. They can be called directly from form actions or client events, support progressive enhancement, useOptimistic for instant UI updates, useActionState for loading states, and cache invalidation via revalidatePath/revalidateTag.'}
      </p>

      <h3 style={h3Style}>{isZh ? '如何在 App Router 中实现 ISR？' : 'How do I implement ISR in the App Router?'}</h3>
      <p style={pStyle}>
        {isZh
          ? '通过 fetch 的 next: { revalidate: 3600 } 选项或 export const revalidate = 3600 路由段配置实现基于时间的 ISR。按需重新验证在 Server Actions 或 Route Handlers 中调用 revalidatePath() 或 revalidateTag()，通常由 CMS webhook 触发。'
          : 'Time-based ISR uses fetch with next: { revalidate: 3600 } or route segment config export const revalidate = 3600. On-demand revalidation calls revalidatePath() or revalidateTag() in Server Actions or Route Handlers, typically triggered by CMS webhooks.'}
      </p>

      <h3 style={h3Style}>{isZh ? '如何设置认证中间件？' : 'How do I set up authentication middleware?'}</h3>
      <p style={pStyle}>
        {isZh
          ? '在项目根创建 middleware.ts，检查请求中的 session token 或 cookie。未认证用户用 NextResponse.redirect() 重定向到登录页。config.matcher 精确指定需要保护的路由模式。中间件在边缘运行，在任何路由渲染之前执行。'
          : 'Create middleware.ts at the project root, checking for session tokens or cookies in the request. Redirect unauthenticated users with NextResponse.redirect(). config.matcher precisely specifies route patterns to protect. Middleware runs at the edge, executing before any route renders.'}
      </p>

      <h3 style={h3Style}>{isZh ? '什么是平行路由和拦截路由？' : 'What are parallel and intercepting routes?'}</h3>
      <p style={pStyle}>
        {isZh
          ? '平行路由 (@folder) 在同一布局同时渲染多个独立页面，每个有自己的加载和错误状态。拦截路由 ((.) 约定) 在不同上下文展示路由，如模态框。两者结合实现软导航显示模态、硬导航显示完整页面的可共享 URL 模态体验。'
          : 'Parallel routes (@folder) render multiple independent pages in the same layout, each with their own loading and error states. Intercepting routes ((.) convention) display routes in different contexts like modals. Combined, they create shareable URL modals with soft navigation showing a modal and hard navigation showing the full page.'}
      </p>

      <h3 style={h3Style}>{isZh ? '如何优化图片和字体？' : 'How do I optimize images and fonts?'}</h3>
      <p style={pStyle}>
        {isZh
          ? 'next/image 自动处理 WebP/AVIF 转换、响应式 srcset、懒加载和布局偏移防护。首屏图片加 priority。next/font 自托管字体，零布局偏移且无外部请求。使用 sizes 属性优化响应式加载，remotePatterns 配置远程图片域名。'
          : 'next/image handles WebP/AVIF conversion, responsive srcsets, lazy-loading, and layout shift prevention automatically. Add priority for above-the-fold images. next/font self-hosts fonts with zero layout shift and no external requests. Use sizes for responsive loading optimization and remotePatterns for remote image domains.'}
      </p>

      <h3 style={h3Style}>{isZh ? '如何用 Docker 部署 Next.js？' : 'How should I deploy Next.js with Docker?'}</h3>
      <p style={pStyle}>
        {isZh
          ? '多阶段 Dockerfile：deps 阶段装依赖，builder 阶段构建（output: "standalone"），runner 阶段只复制 standalone 输出、public 和 .next/static。添加健康检查端点，设置 NODE_ENV=production，Nginx 反向代理处理 SSL 和压缩，@vercel/otel 集成 OpenTelemetry 追踪。'
          : 'Multi-stage Dockerfile: deps stage installs dependencies, builder stage builds (output: "standalone"), runner stage copies only standalone output, public, and .next/static. Add health check endpoint, set NODE_ENV=production, use Nginx reverse proxy for SSL and compression, integrate @vercel/otel for OpenTelemetry tracing.'}
      </p>
    </>
  );
}
