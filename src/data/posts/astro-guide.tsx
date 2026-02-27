'use client';
import React from 'react';

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'Astro Framework Guide 2026: Islands Architecture, Content Collections, and Performance',
    intro: 'Astro is a modern web framework designed for content-driven websites that ships zero JavaScript by default. With its unique islands architecture, Astro renders pages to static HTML at build time while allowing interactive components to hydrate independently. Whether you are building a blog, documentation site, marketing page, or e-commerce storefront, Astro delivers exceptional performance with a developer experience that supports React, Vue, Svelte, and Solid components in a single project.',
    tldr: 'Astro is a content-first web framework that ships zero JS by default, uses islands architecture for selective interactivity, supports multiple UI frameworks (React, Vue, Svelte), and delivers outstanding Core Web Vitals scores. It features content collections for type-safe data, view transitions for smooth navigation, SSR and SSG modes, and integrates seamlessly with Tailwind, MDX, and image optimization.',
    keyTakeaway1: 'Astro ships zero JavaScript by default, resulting in faster page loads and better Core Web Vitals than traditional SPA frameworks.',
    keyTakeaway2: 'Islands architecture allows mixing React, Vue, Svelte, and Solid components on the same page, each hydrating independently.',
    keyTakeaway3: 'Content Collections provide type-safe access to Markdown, MDX, YAML, and JSON data with automatic schema validation using Zod.',
    keyTakeaway4: 'View Transitions API enables smooth page animations without a client-side router or JavaScript framework.',
    keyTakeaway5: 'Astro supports both static site generation (SSG) and on-demand server-side rendering (SSR) with adapters for Vercel, Netlify, and Cloudflare.',
    keyTakeaway6: 'Astro DB provides a built-in SQL database powered by LibSQL for structured data with full TypeScript type safety.',

    h2WhatIs: 'What Is Astro and How Does It Work?',
    whatIsDesc: 'Astro is a web framework that takes a fundamentally different approach from React-based frameworks like Next.js or Remix. Instead of building a JavaScript application that renders HTML, Astro builds an HTML website that can optionally include JavaScript. Pages are rendered to static HTML at build time by default, and interactive components are loaded only where needed using a technique called islands architecture.',
    whatIsDesc2: 'Astro uses a component format (.astro files) that combines a frontmatter script section with an HTML template. The frontmatter runs at build time (or request time in SSR mode) and never reaches the browser. This means you can safely import Node.js modules, query databases, and fetch APIs directly in your components.',

    h2Islands: 'Islands Architecture Explained',
    islandsDesc: 'The islands architecture is the core innovation that makes Astro unique. In a traditional SPA, the entire page is a single JavaScript application. In Astro, the page is static HTML with interactive "islands" that hydrate independently. Each island is a self-contained widget that loads its own JavaScript bundle.',
    islandsDesc2: 'You control when and how each island hydrates using client directives. This means a page with a static header, a dynamic search bar, and an interactive chart only loads JavaScript for the search bar and chart. The header remains pure HTML with zero JavaScript overhead.',
    h3ClientDirectives: 'Client Hydration Directives',
    clientDirectivesDesc: 'Astro provides several client directives to control island hydration timing:',
    directiveLoad: 'client:load - Hydrate immediately on page load. Use for above-the-fold interactive elements.',
    directiveIdle: 'client:idle - Hydrate once the browser is idle (requestIdleCallback). Use for lower-priority interactive elements.',
    directiveVisible: 'client:visible - Hydrate when the element enters the viewport (IntersectionObserver). Use for below-the-fold elements.',
    directiveMedia: 'client:media - Hydrate when a CSS media query matches. Use for mobile-only or desktop-only interactivity.',
    directiveOnly: 'client:only - Skip server rendering and only render on the client. Use for components that depend on browser APIs.',

    h2ContentCollections: 'Content Collections and Type Safety',
    contentCollDesc: 'Content Collections are one of Astro most powerful features. They provide a structured way to organize, validate, and query your content with full TypeScript type safety. Collections live in the src/content directory and are defined with a schema using Zod validation.',
    contentCollDesc2: 'When you define a collection schema, Astro generates TypeScript types automatically. If a Markdown frontmatter field is missing or has the wrong type, you get a build-time error instead of a runtime surprise. This is especially valuable for blogs with hundreds of posts.',

    h2Components: 'Astro Components vs Framework Components',
    componentsDesc: 'Astro has its own component format (.astro files) that is specifically optimized for building HTML output. However, you can also use components from React, Vue, Svelte, Solid, Preact, and Lit within Astro pages. Understanding when to use each is key to getting the best performance.',
    h3AstroComponents: 'Astro Components (.astro)',
    astroComponentsDesc: 'Astro components are HTML-first templates with a JavaScript frontmatter section. They render entirely at build time and produce zero JavaScript output. Use them for layouts, page structures, and any non-interactive UI.',
    h3FrameworkComponents: 'Framework Components (React, Vue, Svelte)',
    frameworkComponentsDesc: 'Use framework components when you need client-side interactivity. Astro renders them to HTML on the server and then hydrates them on the client when you add a client directive. You can mix multiple frameworks on the same page.',

    h2SSG: 'Static Site Generation and Server-Side Rendering',
    ssgDesc: 'Astro supports two primary output modes: static (default) and server. You can also use hybrid mode to mix static and server-rendered pages in the same project.',
    h3StaticMode: 'Static Mode (Default)',
    staticModeDesc: 'In static mode, Astro pre-renders every page to HTML at build time. This produces a directory of HTML files that can be deployed to any static hosting provider. Static sites are the fastest and most reliable option.',
    h3ServerMode: 'Server Mode (SSR)',
    serverModeDesc: 'In server mode, pages are rendered on the server for each request. This enables dynamic features like user authentication, personalized content, and database queries at request time. You need a server adapter (Vercel, Netlify, Cloudflare, Node.js) to deploy SSR sites.',
    h3HybridMode: 'Hybrid Mode',
    hybridModeDesc: 'Hybrid mode lets you pre-render most pages statically while opting specific pages into server rendering. This is ideal for sites where most content is static but a few pages need dynamic data.',

    h2ViewTransitions: 'View Transitions and Page Animations',
    viewTransitionsDesc: 'Astro includes built-in support for the View Transitions API, enabling smooth animated page transitions without a client-side router. When a user navigates between pages, Astro intercepts the navigation and applies CSS-based transitions for a seamless experience.',
    viewTransitionsDesc2: 'You can customize transitions per element, persist state across navigations, and even animate elements between pages using the transition:name directive. This gives you SPA-like navigation without the JavaScript overhead of a full client-side router.',

    h2AstroDB: 'Astro DB and the Data Layer',
    astroDBDesc: 'Astro DB is a built-in SQL database designed for content sites. Powered by LibSQL (a fork of SQLite), it provides a fully typed database with automatic migrations and a simple query API. Astro DB runs locally during development and can be deployed to Astro Studio for production.',
    astroDBDesc2: 'The data layer extends content collections with support for any data source. You can define loaders that pull data from external APIs, CMS platforms, or databases and make it available through the same type-safe content collections API.',

    h2Middleware: 'Middleware and API Endpoints',
    middlewareDesc: 'Astro supports middleware for intercepting requests before they reach your pages. Middleware runs on the server and can modify the request context, add authentication checks, redirect users, or set response headers.',
    h3APIEndpoints: 'API Endpoints',
    apiEndpointsDesc: 'Astro can serve JSON API endpoints alongside your pages. Create .ts or .js files in the src/pages directory that export HTTP method handlers (GET, POST, PUT, DELETE). This is useful for form submissions, webhooks, and building lightweight APIs.',

    h2Integrations: 'Integrations: Tailwind, MDX, and Image Optimization',
    integrationsDesc: 'Astro has a rich ecosystem of official and community integrations. The most commonly used integrations include Tailwind CSS for styling, MDX for interactive Markdown, and the built-in image optimization service.',
    h3Tailwind: 'Tailwind CSS Integration',
    tailwindDesc: 'Astro has first-class Tailwind CSS support. The integration handles configuration, PostCSS setup, and purging unused styles automatically.',
    h3MDX: 'MDX Integration',
    mdxDesc: 'MDX lets you use JSX components inside Markdown files. With the MDX integration, you can embed interactive components, charts, and custom layouts within your content.',
    h3ImageOpt: 'Image Optimization',
    imageOptDesc: 'Astro includes a built-in image optimization service that automatically resizes, converts, and optimizes images. The Image component generates responsive srcset attributes and supports lazy loading out of the box.',

    h2Deployment: 'Deployment to Vercel, Netlify, and Cloudflare',
    deploymentDesc: 'Astro supports deployment to every major hosting platform through official adapters. Each adapter handles the platform-specific configuration for SSR, serverless functions, and edge runtime.',
    h3Vercel: 'Deploying to Vercel',
    h3Netlify: 'Deploying to Netlify',
    h3Cloudflare: 'Deploying to Cloudflare Pages',

    h2Performance: 'Performance Optimization and Best Practices',
    perfDesc: 'Astro delivers excellent performance out of the box, but there are several techniques to optimize further.',
    bp1: 'Use client:visible instead of client:load for below-the-fold interactive components to defer JavaScript loading.',
    bp2: 'Leverage content collections for type-safe content with build-time validation instead of runtime data fetching.',
    bp3: 'Use the built-in Image component for automatic image optimization with responsive srcset generation.',
    bp4: 'Enable view transitions for smooth navigation without loading a client-side router framework.',
    bp5: 'Prefer Astro components over framework components for non-interactive UI to eliminate JavaScript overhead.',
    bp6: 'Use hybrid rendering mode to pre-render static pages while keeping dynamic pages server-rendered.',
    bp7: 'Split large interactive components into smaller islands to reduce individual bundle sizes.',
    bp8: 'Configure prefetching for anticipated navigation to improve perceived performance.',
    bp9: 'Use Astro built-in asset handling for fonts, scripts, and stylesheets to benefit from automatic hashing and caching.',
    bp10: 'Profile your build output with the astro build --profile flag to identify large bundles and optimization opportunities.',

    h2Faq: 'Frequently Asked Questions',
    faq1Q: 'What is Astro used for?',
    faq1A: 'Astro is primarily used for content-driven websites including blogs, documentation sites, marketing pages, portfolios, and e-commerce storefronts. Its zero-JavaScript-by-default approach makes it ideal for sites where performance and SEO are critical. Astro can also handle full-stack applications with its SSR mode and API endpoints.',
    faq2Q: 'How does Astro islands architecture work?',
    faq2A: 'Astro renders every page to static HTML by default. When you need interactivity, you add a client directive (client:load, client:idle, client:visible) to a framework component. That component becomes an independent island that hydrates separately from the rest of the page. Each island loads its own JavaScript bundle, so a page with one interactive widget only loads JavaScript for that widget.',
    faq3Q: 'Can I use React components in Astro?',
    faq3A: 'Yes. Astro supports React, Vue, Svelte, Solid, Preact, and Lit components. You can even mix multiple frameworks on the same page. Install the framework integration (e.g., @astrojs/react) and use client directives to control hydration. Astro handles server-rendering and client-side hydration automatically.',
    faq4Q: 'Is Astro better than Next.js?',
    faq4A: 'Astro and Next.js serve different primary use cases. Astro excels at content-heavy websites where performance and minimal JavaScript are priorities. Next.js is better for complex interactive web applications that need full-stack React features. For blogs, docs, and marketing sites, Astro typically delivers faster page loads and better Core Web Vitals.',
    faq5Q: 'How do Astro content collections work?',
    faq5A: 'Content collections organize your Markdown, MDX, YAML, and JSON files in the src/content directory. You define a schema using Zod for each collection, and Astro generates TypeScript types automatically. This gives you build-time validation of frontmatter fields, type-safe querying, and autocompletion in your editor.',
    faq6Q: 'Does Astro support server-side rendering?',
    faq6A: 'Yes. Astro supports both static site generation (SSG) and server-side rendering (SSR). Use the server or hybrid output mode and install an adapter for your deployment platform (Vercel, Netlify, Cloudflare, or Node.js). In hybrid mode, you can mix static and server-rendered pages in the same project.',
    faq7Q: 'What are Astro view transitions?',
    faq7A: 'Astro view transitions use the browser View Transitions API to animate page navigations. When enabled, Astro intercepts link clicks and applies CSS transitions between the old and new page. You can customize transitions per element, persist component state across navigations, and create complex multi-element animations.',
    faq8Q: 'How do I deploy an Astro site?',
    faq8A: 'For static sites, build with astro build and deploy the dist directory to any static host (GitHub Pages, Vercel, Netlify, Cloudflare Pages). For SSR sites, install the appropriate adapter (@astrojs/vercel, @astrojs/netlify, @astrojs/cloudflare, @astrojs/node) and deploy to that platform. Most platforms auto-detect Astro projects.',
  },
  zh: {
    title: 'Astro 框架指南 2026：岛屿架构、内容集合与性能优化',
    intro: 'Astro 是一个现代 Web 框架，专为内容驱动型网站设计，默认不发送任何 JavaScript。凭借独特的岛屿架构，Astro 在构建时将页面渲染为静态 HTML，同时允许交互组件独立水合。无论你是构建博客、文档站点、营销页面还是电商前端，Astro 都能提供卓越的性能和支持 React、Vue、Svelte、Solid 的开发体验。',
    tldr: 'Astro 是一个内容优先的 Web 框架，默认零 JS、使用岛屿架构实现选择性交互、支持多种 UI 框架（React、Vue、Svelte），提供出色的 Core Web Vitals 分数。具备内容集合、视图过渡、SSR/SSG 模式，并与 Tailwind、MDX 和图片优化无缝集成。',
    keyTakeaway1: 'Astro 默认不发送 JavaScript，页面加载更快，Core Web Vitals 优于传统 SPA 框架。',
    keyTakeaway2: '岛屿架构允许在同一页面混合使用 React、Vue、Svelte 和 Solid 组件，各自独立水合。',
    keyTakeaway3: '内容集合通过 Zod 验证提供类型安全的 Markdown、MDX、YAML 和 JSON 数据访问。',
    keyTakeaway4: '视图过渡 API 无需客户端路由或 JavaScript 框架即可实现平滑的页面动画。',
    keyTakeaway5: 'Astro 同时支持静态站点生成（SSG）和按需服务端渲染（SSR），适配 Vercel、Netlify 和 Cloudflare。',
    keyTakeaway6: 'Astro DB 提供基于 LibSQL 的内置 SQL 数据库，具有完整的 TypeScript 类型安全。',

    h2WhatIs: '什么是 Astro，它是如何工作的？',
    whatIsDesc: 'Astro 采用了与 Next.js 或 Remix 等基于 React 的框架截然不同的方法。Astro 构建的是一个 HTML 网站，可以选择性地包含 JavaScript，而不是构建一个渲染 HTML 的 JavaScript 应用。',
    whatIsDesc2: 'Astro 使用独特的组件格式（.astro 文件），将 frontmatter 脚本部分与 HTML 模板结合。frontmatter 在构建时运行，永远不会到达浏览器。',

    h2Islands: '岛屿架构详解',
    islandsDesc: '岛屿架构是 Astro 的核心创新。在传统 SPA 中，整个页面是一个 JavaScript 应用。在 Astro 中，页面是静态 HTML，带有独立水合的交互"岛屿"。',
    islandsDesc2: '你可以通过客户端指令控制每个岛屿的水合时机和方式。',
    h3ClientDirectives: '客户端水合指令',
    clientDirectivesDesc: 'Astro 提供多种客户端指令来控制岛屿水合时机：',
    directiveLoad: 'client:load - 页面加载时立即水合。用于首屏交互元素。',
    directiveIdle: 'client:idle - 浏览器空闲时水合。用于低优先级交互元素。',
    directiveVisible: 'client:visible - 元素进入视口时水合。用于首屏以下元素。',
    directiveMedia: 'client:media - CSS 媒体查询匹配时水合。用于仅移动端或桌面端的交互。',
    directiveOnly: 'client:only - 跳过服务端渲染，仅在客户端渲染。用于依赖浏览器 API 的组件。',

    h2ContentCollections: '内容集合与类型安全',
    contentCollDesc: '内容集合是 Astro 最强大的功能之一，提供结构化的方式来组织、验证和查询内容，具有完整的 TypeScript 类型安全。',
    contentCollDesc2: '定义集合模式后，Astro 自动生成 TypeScript 类型。如果 Markdown frontmatter 字段缺失或类型错误，你会在构建时收到错误。',

    h2Components: 'Astro 组件 vs 框架组件',
    componentsDesc: 'Astro 有自己的组件格式（.astro 文件），专门优化用于 HTML 输出。你也可以使用 React、Vue、Svelte 等框架组件。',
    h3AstroComponents: 'Astro 组件（.astro）',
    astroComponentsDesc: 'Astro 组件是 HTML 优先的模板，带有 JavaScript frontmatter 部分。它们完全在构建时渲染，不产生 JavaScript 输出。',
    h3FrameworkComponents: '框架组件（React、Vue、Svelte）',
    frameworkComponentsDesc: '需要客户端交互时使用框架组件。添加 client 指令后，Astro 在服务端渲染它们并在客户端水合。',

    h2SSG: '静态站点生成与服务端渲染',
    ssgDesc: 'Astro 支持两种主要输出模式：static（默认）和 server。还可以使用 hybrid 模式在同一项目中混合静态和服务端渲染页面。',
    h3StaticMode: '静态模式（默认）',
    staticModeDesc: '静态模式下，Astro 在构建时预渲染每个页面为 HTML。产生的 HTML 文件可部署到任何静态托管提供商。',
    h3ServerMode: '服务端模式（SSR）',
    serverModeDesc: '服务端模式下，页面在每次请求时在服务器上渲染，支持用户认证、个性化内容和数据库查询等动态功能。',
    h3HybridMode: '混合模式',
    hybridModeDesc: '混合模式允许大部分页面静态预渲染，同时将特定页面选择为服务端渲染。',

    h2ViewTransitions: '视图过渡与页面动画',
    viewTransitionsDesc: 'Astro 内置支持视图过渡 API，无需客户端路由即可实现平滑的页面过渡动画。',
    viewTransitionsDesc2: '你可以按元素自定义过渡效果，跨导航保持状态，甚至使用 transition:name 在页面之间动画化元素。',

    h2AstroDB: 'Astro DB 与数据层',
    astroDBDesc: 'Astro DB 是为内容站点设计的内置 SQL 数据库，基于 LibSQL，提供完整类型化的数据库和简单的查询 API。',
    astroDBDesc2: '数据层将内容集合扩展到任何数据源，可以从外部 API、CMS 平台或数据库拉取数据。',

    h2Middleware: '中间件与 API 端点',
    middlewareDesc: 'Astro 支持中间件来拦截请求，可以修改请求上下文、添加认证检查、重定向用户或设置响应头。',
    h3APIEndpoints: 'API 端点',
    apiEndpointsDesc: 'Astro 可以在页面旁提供 JSON API 端点。在 src/pages 目录创建导出 HTTP 方法处理程序的 .ts 文件。',

    h2Integrations: '集成：Tailwind、MDX 和图片优化',
    integrationsDesc: 'Astro 拥有丰富的官方和社区集成生态。最常用的包括 Tailwind CSS、MDX 和内置图片优化。',
    h3Tailwind: 'Tailwind CSS 集成',
    tailwindDesc: 'Astro 对 Tailwind CSS 有一流支持，集成自动处理配置、PostCSS 设置和未使用样式的清除。',
    h3MDX: 'MDX 集成',
    mdxDesc: 'MDX 允许在 Markdown 文件中使用 JSX 组件，可以在内容中嵌入交互组件、图表和自定义布局。',
    h3ImageOpt: '图片优化',
    imageOptDesc: 'Astro 内置图片优化服务，自动调整大小、转换格式和优化图片。Image 组件生成响应式 srcset 属性。',

    h2Deployment: '部署到 Vercel、Netlify 和 Cloudflare',
    deploymentDesc: 'Astro 通过官方适配器支持部署到所有主要托管平台。',
    h3Vercel: '部署到 Vercel',
    h3Netlify: '部署到 Netlify',
    h3Cloudflare: '部署到 Cloudflare Pages',

    h2Performance: '性能优化与最佳实践',
    perfDesc: 'Astro 开箱即用就有出色的性能，但还有一些技巧可以进一步优化。',
    bp1: '首屏以下交互组件使用 client:visible 而非 client:load 来延迟 JavaScript 加载。',
    bp2: '使用内容集合进行构建时验证，而非运行时数据获取。',
    bp3: '使用内置 Image 组件自动优化图片并生成响应式 srcset。',
    bp4: '启用视图过渡实现平滑导航，无需加载客户端路由框架。',
    bp5: '非交互 UI 优先使用 Astro 组件而非框架组件，消除 JavaScript 开销。',
    bp6: '使用混合渲染模式预渲染静态页面，保持动态页面服务端渲染。',
    bp7: '将大型交互组件拆分为更小的岛屿，减少单个包大小。',
    bp8: '配置预取以改善感知性能。',
    bp9: '使用 Astro 内置资源处理获得自动哈希和缓存。',
    bp10: '使用 astro build --profile 分析构建输出，识别大包和优化机会。',

    h2Faq: '常见问题',
    faq1Q: 'Astro 用来做什么？',
    faq1A: 'Astro 主要用于内容驱动型网站，包括博客、文档站点、营销页面、作品集和电商前端。其零 JavaScript 默认方式使其成为性能和 SEO 至关重要的站点的理想选择。',
    faq2Q: 'Astro 的岛屿架构如何工作？',
    faq2A: 'Astro 默认将每个页面渲染为静态 HTML。需要交互时，添加 client 指令使框架组件成为独立的岛屿，各自单独水合和加载 JavaScript。',
    faq3Q: '可以在 Astro 中使用 React 组件吗？',
    faq3A: '可以。Astro 支持 React、Vue、Svelte、Solid、Preact 和 Lit 组件，甚至可以在同一页面混合多个框架。',
    faq4Q: 'Astro 比 Next.js 好吗？',
    faq4A: 'Astro 和 Next.js 服务于不同的用例。Astro 擅长内容密集型网站，Next.js 更适合复杂的交互式 Web 应用。',
    faq5Q: 'Astro 内容集合如何工作？',
    faq5A: '内容集合在 src/content 目录中组织文件，使用 Zod 定义模式，Astro 自动生成 TypeScript 类型，提供构建时验证。',
    faq6Q: 'Astro 支持服务端渲染吗？',
    faq6A: '支持。Astro 同时支持 SSG 和 SSR，使用 server 或 hybrid 输出模式并安装部署平台的适配器即可。',
    faq7Q: '什么是 Astro 视图过渡？',
    faq7A: 'Astro 视图过渡使用浏览器的 View Transitions API 为页面导航添加动画，无需客户端路由器。',
    faq8Q: '如何部署 Astro 站点？',
    faq8A: '静态站点使用 astro build 构建后部署 dist 目录。SSR 站点安装相应适配器后部署到对应平台。',
  },
};

export default function AstroGuide({ lang }: { lang: string }) {
  const t = translations[lang] || translations.en;

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: t.faq1Q, acceptedAnswer: { '@type': 'Answer', text: t.faq1A } },
      { '@type': 'Question', name: t.faq2Q, acceptedAnswer: { '@type': 'Answer', text: t.faq2A } },
      { '@type': 'Question', name: t.faq3Q, acceptedAnswer: { '@type': 'Answer', text: t.faq3A } },
      { '@type': 'Question', name: t.faq4Q, acceptedAnswer: { '@type': 'Answer', text: t.faq4A } },
      { '@type': 'Question', name: t.faq5Q, acceptedAnswer: { '@type': 'Answer', text: t.faq5A } },
      { '@type': 'Question', name: t.faq6Q, acceptedAnswer: { '@type': 'Answer', text: t.faq6A } },
      { '@type': 'Question', name: t.faq7Q, acceptedAnswer: { '@type': 'Answer', text: t.faq7A } },
      { '@type': 'Question', name: t.faq8Q, acceptedAnswer: { '@type': 'Answer', text: t.faq8A } },
    ],
  };

  const sectionTitle: React.CSSProperties = { fontSize: '1.5rem', fontWeight: 700, marginTop: '2.5rem', marginBottom: '1rem' };
  const subTitle: React.CSSProperties = { fontSize: '1.25rem', fontWeight: 600, marginTop: '2rem', marginBottom: '0.75rem' };
  const para: React.CSSProperties = { marginBottom: '1rem', lineHeight: '1.7' };
  const codeBlock: React.CSSProperties = { backgroundColor: '#111827', padding: '1rem', borderRadius: '0.5rem', overflowX: 'auto', fontSize: '0.875rem', marginBottom: '1.5rem', color: '#e5e7eb' };
  const listItem: React.CSSProperties = { marginBottom: '0.5rem', lineHeight: '1.6' };

  return (
    <article style={{ maxWidth: 'none' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <p style={{ fontSize: '1.125rem', lineHeight: '1.75', marginBottom: '2rem' }}>{t.intro}</p>

      {/* TL;DR */}
      <div style={{ background: '#f0f9ff', borderLeft: '4px solid #0ea5e9', padding: '1rem 1.5rem', marginBottom: '2rem', borderRadius: '0 0.5rem 0.5rem 0' }}>
        <strong style={{ fontSize: '1.1rem' }}>TL;DR</strong>
        <p style={{ marginTop: '0.5rem', lineHeight: '1.7' }}>{t.tldr}</p>
      </div>

      {/* Key Takeaways */}
      <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: '1.5rem', borderRadius: '0.5rem', marginBottom: '2rem' }}>
        <strong style={{ fontSize: '1.1rem' }}>Key Takeaways</strong>
        <ul style={{ marginTop: '0.75rem', paddingLeft: '1.5rem' }}>
          <li style={listItem}>{t.keyTakeaway1}</li>
          <li style={listItem}>{t.keyTakeaway2}</li>
          <li style={listItem}>{t.keyTakeaway3}</li>
          <li style={listItem}>{t.keyTakeaway4}</li>
          <li style={listItem}>{t.keyTakeaway5}</li>
          <li style={listItem}>{t.keyTakeaway6}</li>
        </ul>
      </div>

      {/* What Is Astro */}
      <h2 style={sectionTitle}>{t.h2WhatIs}</h2>
      <p style={para}>{t.whatIsDesc}</p>
      <p style={para}>{t.whatIsDesc2}</p>
      <pre style={codeBlock}><code>{'---\n'
        + '// src/pages/index.astro\n'
        + 'import Layout from "../layouts/Layout.astro";\n'
        + 'import Card from "../components/Card.astro";\n'
        + 'import Counter from "../components/Counter.tsx";\n'
        + '\n'
        + '// This runs at build time (or request time in SSR)\n'
        + '// It never reaches the browser\n'
        + 'const response = await fetch("https://api.example.com/posts");\n'
        + 'const posts = await response.json();\n'
        + '---\n'
        + '\n'
        + '<Layout title="My Blog">\n'
        + '  <h1>Latest Posts</h1>\n'
        + '\n'
        + '  <!-- Static HTML: zero JavaScript -->\n'
        + '  {posts.map((post) => (\n'
        + '    <Card title={post.title} url={"/blog/" + post.slug} />\n'
        + '  ))}\n'
        + '\n'
        + '  <!-- Interactive island: only this loads JS -->\n'
        + '  <Counter client:visible initialCount={0} />\n'
        + '</Layout>'}</code></pre>

      {/* Islands Architecture */}
      <h2 style={sectionTitle}>{t.h2Islands}</h2>
      <p style={para}>{t.islandsDesc}</p>
      <p style={para}>{t.islandsDesc2}</p>

      <h3 style={subTitle}>{t.h3ClientDirectives}</h3>
      <p style={para}>{t.clientDirectivesDesc}</p>
      <ul style={{ paddingLeft: '1.5rem', marginBottom: '1.5rem' }}>
        <li style={listItem}><strong>{t.directiveLoad.split(' - ')[0]}</strong>{' - ' + t.directiveLoad.split(' - ')[1]}</li>
        <li style={listItem}><strong>{t.directiveIdle.split(' - ')[0]}</strong>{' - ' + t.directiveIdle.split(' - ')[1]}</li>
        <li style={listItem}><strong>{t.directiveVisible.split(' - ')[0]}</strong>{' - ' + t.directiveVisible.split(' - ')[1]}</li>
        <li style={listItem}><strong>{t.directiveMedia.split(' - ')[0]}</strong>{' - ' + t.directiveMedia.split(' - ')[1]}</li>
        <li style={listItem}><strong>{t.directiveOnly.split(' - ')[0]}</strong>{' - ' + t.directiveOnly.split(' - ')[1]}</li>
      </ul>

      <pre style={codeBlock}><code>{'---\n'
        + '// src/pages/dashboard.astro\n'
        + 'import Header from "../components/Header.astro";\n'
        + 'import SearchBar from "../components/SearchBar.tsx";\n'
        + 'import Chart from "../components/Chart.svelte";\n'
        + 'import Newsletter from "../components/Newsletter.vue";\n'
        + '---\n'
        + '\n'
        + '<!-- Pure HTML, zero JS -->\n'
        + '<Header />\n'
        + '\n'
        + '<!-- Hydrate immediately for above-the-fold search -->\n'
        + '<SearchBar client:load placeholder="Search tools..." />\n'
        + '\n'
        + '<!-- Hydrate when visible (below the fold) -->\n'
        + '<Chart client:visible data={chartData} />\n'
        + '\n'
        + '<!-- Hydrate when idle (low priority) -->\n'
        + '<Newsletter client:idle />\n'
        + '\n'
        + '<!-- Only hydrate on mobile screens -->\n'
        + '<MobileMenu client:media="(max-width: 768px)" />\n'
        + '\n'
        + '<!-- Client-only: skip SSR for browser-API-dependent code -->\n'
        + '<MapWidget client:only="react" />'}</code></pre>

      {/* Content Collections */}
      <h2 style={sectionTitle}>{t.h2ContentCollections}</h2>
      <p style={para}>{t.contentCollDesc}</p>
      <p style={para}>{t.contentCollDesc2}</p>

      <pre style={codeBlock}><code>{'// src/content.config.ts\n'
        + 'import { defineCollection, z } from "astro:content";\n'
        + 'import { glob } from "astro/loaders";\n'
        + '\n'
        + 'const blog = defineCollection({\n'
        + '  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/data/blog" }),\n'
        + '  schema: z.object({\n'
        + '    title: z.string(),\n'
        + '    description: z.string(),\n'
        + '    pubDate: z.coerce.date(),\n'
        + '    updatedDate: z.coerce.date().optional(),\n'
        + '    heroImage: z.string().optional(),\n'
        + '    tags: z.array(z.string()).default([]),\n'
        + '    draft: z.boolean().default(false),\n'
        + '    author: z.string().default("Anonymous"),\n'
        + '  }),\n'
        + '});\n'
        + '\n'
        + 'const docs = defineCollection({\n'
        + '  loader: glob({ pattern: "**/*.md", base: "./src/data/docs" }),\n'
        + '  schema: z.object({\n'
        + '    title: z.string(),\n'
        + '    section: z.enum(["getting-started", "guides", "reference"]),\n'
        + '    order: z.number(),\n'
        + '  }),\n'
        + '});\n'
        + '\n'
        + 'export const collections = { blog, docs };'}</code></pre>

      <pre style={codeBlock}><code>{'---\n'
        + '// src/pages/blog/[slug].astro\n'
        + 'import { getCollection, getEntry, render } from "astro:content";\n'
        + 'import Layout from "../../layouts/Layout.astro";\n'
        + '\n'
        + '// Generate static pages for all non-draft blog posts\n'
        + 'export async function getStaticPaths() {\n'
        + '  const posts = await getCollection("blog", ({ data }) => {\n'
        + '    return data.draft !== true;\n'
        + '  });\n'
        + '  return posts.map((post) => ({\n'
        + '    params: { slug: post.id },\n'
        + '    props: { post },\n'
        + '  }));\n'
        + '}\n'
        + '\n'
        + 'const { post } = Astro.props;\n'
        + 'const { Content, headings } = await render(post);\n'
        + '---\n'
        + '\n'
        + '<Layout title={post.data.title}>\n'
        + '  <article>\n'
        + '    <h1>{post.data.title}</h1>\n'
        + '    <p>{post.data.description}</p>\n'
        + '    <time datetime={post.data.pubDate.toISOString()}>\n'
        + '      {post.data.pubDate.toLocaleDateString()}\n'
        + '    </time>\n'
        + '    <div class="tags">\n'
        + '      {post.data.tags.map((tag) => <span>{tag}</span>)}\n'
        + '    </div>\n'
        + '    <Content />\n'
        + '  </article>\n'
        + '</Layout>'}</code></pre>

      {/* Components */}
      <h2 style={sectionTitle}>{t.h2Components}</h2>
      <p style={para}>{t.componentsDesc}</p>

      <h3 style={subTitle}>{t.h3AstroComponents}</h3>
      <p style={para}>{t.astroComponentsDesc}</p>
      <pre style={codeBlock}><code>{'---\n'
        + '// src/components/Card.astro\n'
        + 'interface Props {\n'
        + '  title: string;\n'
        + '  description: string;\n'
        + '  url: string;\n'
        + '  tags?: string[];\n'
        + '}\n'
        + '\n'
        + 'const { title, description, url, tags = [] } = Astro.props;\n'
        + '---\n'
        + '\n'
        + '<a href={url} class="card">\n'
        + '  <h3>{title}</h3>\n'
        + '  <p>{description}</p>\n'
        + '  {tags.length > 0 && (\n'
        + '    <div class="tags">\n'
        + '      {tags.map((tag) => <span class="tag">{tag}</span>)}\n'
        + '    </div>\n'
        + '  )}\n'
        + '</a>\n'
        + '\n'
        + '<style>\n'
        + '  .card {\n'
        + '    display: block;\n'
        + '    padding: 1.5rem;\n'
        + '    border: 1px solid #e2e8f0;\n'
        + '    border-radius: 0.5rem;\n'
        + '    text-decoration: none;\n'
        + '    transition: box-shadow 0.2s;\n'
        + '  }\n'
        + '  .card:hover {\n'
        + '    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);\n'
        + '  }\n'
        + '</style>'}</code></pre>

      <h3 style={subTitle}>{t.h3FrameworkComponents}</h3>
      <p style={para}>{t.frameworkComponentsDesc}</p>
      <pre style={codeBlock}><code>{'// src/components/Counter.tsx (React island)\n'
        + 'import { useState } from "react";\n'
        + '\n'
        + 'export default function Counter({ initialCount = 0 }) {\n'
        + '  const [count, setCount] = useState(initialCount);\n'
        + '\n'
        + '  return (\n'
        + '    <div>\n'
        + '      <button onClick={() => setCount(count - 1)}>-</button>\n'
        + '      <span>{count}</span>\n'
        + '      <button onClick={() => setCount(count + 1)}>+</button>\n'
        + '    </div>\n'
        + '  );\n'
        + '}'}</code></pre>

      <pre style={codeBlock}><code>{'<!-- src/components/Toggle.svelte (Svelte island) -->\n'
        + '<script>\n'
        + '  let isOpen = false;\n'
        + '</script>\n'
        + '\n'
        + '<button on:click={() => isOpen = !isOpen}>\n'
        + '  {isOpen ? "Close" : "Open"}\n'
        + '</button>\n'
        + '\n'
        + '{#if isOpen}\n'
        + '  <div class="panel">\n'
        + '    <slot />\n'
        + '  </div>\n'
        + '{/if}'}</code></pre>

      <pre style={codeBlock}><code>{'---\n'
        + '// Using multiple frameworks on one page\n'
        + 'import Counter from "../components/Counter.tsx";      // React\n'
        + 'import Toggle from "../components/Toggle.svelte";     // Svelte\n'
        + 'import Carousel from "../components/Carousel.vue";    // Vue\n'
        + '---\n'
        + '\n'
        + '<Counter client:load initialCount={5} />\n'
        + '<Toggle client:visible>Content inside Svelte slot</Toggle>\n'
        + '<Carousel client:idle images={images} />'}</code></pre>

      {/* SSG and SSR */}
      <h2 style={sectionTitle}>{t.h2SSG}</h2>
      <p style={para}>{t.ssgDesc}</p>

      <h3 style={subTitle}>{t.h3StaticMode}</h3>
      <p style={para}>{t.staticModeDesc}</p>
      <pre style={codeBlock}><code>{'// astro.config.mjs - Static mode (default)\n'
        + 'import { defineConfig } from "astro/config";\n'
        + '\n'
        + 'export default defineConfig({\n'
        + '  output: "static",  // This is the default\n'
        + '  site: "https://example.com",\n'
        + '});'}</code></pre>

      <h3 style={subTitle}>{t.h3ServerMode}</h3>
      <p style={para}>{t.serverModeDesc}</p>
      <pre style={codeBlock}><code>{'// astro.config.mjs - Server mode\n'
        + 'import { defineConfig } from "astro/config";\n'
        + 'import vercel from "@astrojs/vercel";\n'
        + '\n'
        + 'export default defineConfig({\n'
        + '  output: "server",\n'
        + '  adapter: vercel(),\n'
        + '});'}</code></pre>

      <h3 style={subTitle}>{t.h3HybridMode}</h3>
      <p style={para}>{t.hybridModeDesc}</p>
      <pre style={codeBlock}><code>{'// astro.config.mjs - Hybrid mode\n'
        + 'import { defineConfig } from "astro/config";\n'
        + 'import netlify from "@astrojs/netlify";\n'
        + '\n'
        + 'export default defineConfig({\n'
        + '  output: "hybrid",\n'
        + '  adapter: netlify(),\n'
        + '});\n'
        + '\n'
        + '// --- src/pages/about.astro (pre-rendered at build time) ---\n'
        + '// Pages are static by default in hybrid mode\n'
        + '---\n'
        + '<h1>About Us</h1>\n'
        + '<p>This page is pre-rendered at build time.</p>\n'
        + '---\n'
        + '\n'
        + '// --- src/pages/dashboard.astro (server-rendered) ---\n'
        + '// Opt into server rendering for this page\n'
        + 'export const prerender = false;\n'
        + '---\n'
        + 'const user = await getUser(Astro.cookies.get("session"));\n'
        + '---\n'
        + '<h1>Welcome, {user.name}</h1>'}</code></pre>

      {/* View Transitions */}
      <h2 style={sectionTitle}>{t.h2ViewTransitions}</h2>
      <p style={para}>{t.viewTransitionsDesc}</p>
      <p style={para}>{t.viewTransitionsDesc2}</p>
      <pre style={codeBlock}><code>{'---\n'
        + '// src/layouts/Layout.astro\n'
        + 'import { ViewTransitions } from "astro:transitions";\n'
        + '---\n'
        + '\n'
        + '<html>\n'
        + '  <head>\n'
        + '    <ViewTransitions />\n'
        + '  </head>\n'
        + '  <body>\n'
        + '    <nav transition:persist>\n'
        + '      <!-- Nav persists across navigations -->\n'
        + '      <a href="/">Home</a>\n'
        + '      <a href="/blog">Blog</a>\n'
        + '    </nav>\n'
        + '    <main transition:animate="slide">\n'
        + '      <slot />\n'
        + '    </main>\n'
        + '  </body>\n'
        + '</html>'}</code></pre>

      <pre style={codeBlock}><code>{'---\n'
        + '// Custom transitions with transition:name\n'
        + '// Blog listing page\n'
        + '---\n'
        + '{posts.map((post) => (\n'
        + '  <a href={"/blog/" + post.slug}>\n'
        + '    <img\n'
        + '      src={post.image}\n'
        + '      transition:name={"hero-" + post.slug}\n'
        + '    />\n'
        + '    <h2 transition:name={"title-" + post.slug}>\n'
        + '      {post.title}\n'
        + '    </h2>\n'
        + '  </a>\n'
        + '))}\n'
        + '\n'
        + '// --- Blog detail page ---\n'
        + '// Same transition:name creates a shared element transition\n'
        + '<img\n'
        + '  src={post.image}\n'
        + '  transition:name={"hero-" + post.slug}\n'
        + '/>\n'
        + '<h1 transition:name={"title-" + post.slug}>\n'
        + '  {post.title}\n'
        + '</h1>'}</code></pre>

      {/* Astro DB */}
      <h2 style={sectionTitle}>{t.h2AstroDB}</h2>
      <p style={para}>{t.astroDBDesc}</p>
      <p style={para}>{t.astroDBDesc2}</p>
      <pre style={codeBlock}><code>{'// db/config.ts - Define your database schema\n'
        + 'import { defineDb, defineTable, column } from "astro:db";\n'
        + '\n'
        + 'const Comment = defineTable({\n'
        + '  columns: {\n'
        + '    id: column.number({ primaryKey: true }),\n'
        + '    postSlug: column.text(),\n'
        + '    author: column.text(),\n'
        + '    body: column.text(),\n'
        + '    createdAt: column.date({ default: "NOW" }),\n'
        + '  },\n'
        + '});\n'
        + '\n'
        + 'const Like = defineTable({\n'
        + '  columns: {\n'
        + '    id: column.number({ primaryKey: true }),\n'
        + '    postSlug: column.text(),\n'
        + '    count: column.number({ default: 0 }),\n'
        + '  },\n'
        + '});\n'
        + '\n'
        + 'export default defineDb({\n'
        + '  tables: { Comment, Like },\n'
        + '});'}</code></pre>

      <pre style={codeBlock}><code>{'---\n'
        + '// Querying Astro DB in a page\n'
        + 'import { db, Comment, eq } from "astro:db";\n'
        + '\n'
        + 'const { slug } = Astro.params;\n'
        + 'const comments = await db\n'
        + '  .select()\n'
        + '  .from(Comment)\n'
        + '  .where(eq(Comment.postSlug, slug))\n'
        + '  .orderBy(Comment.createdAt);\n'
        + '---\n'
        + '\n'
        + '<h2>Comments</h2>\n'
        + '{comments.map((c) => (\n'
        + '  <div class="comment">\n'
        + '    <strong>{c.author}</strong>\n'
        + '    <p>{c.body}</p>\n'
        + '    <time>{c.createdAt.toLocaleDateString()}</time>\n'
        + '  </div>\n'
        + '))}'}</code></pre>

      {/* Middleware and API Endpoints */}
      <h2 style={sectionTitle}>{t.h2Middleware}</h2>
      <p style={para}>{t.middlewareDesc}</p>
      <pre style={codeBlock}><code>{'// src/middleware.ts\n'
        + 'import { defineMiddleware, sequence } from "astro:middleware";\n'
        + '\n'
        + 'const auth = defineMiddleware(async (context, next) => {\n'
        + '  const token = context.cookies.get("session")?.value;\n'
        + '\n'
        + '  if (context.url.pathname.startsWith("/dashboard")) {\n'
        + '    if (!token) {\n'
        + '      return context.redirect("/login");\n'
        + '    }\n'
        + '    const user = await verifyToken(token);\n'
        + '    context.locals.user = user;\n'
        + '  }\n'
        + '\n'
        + '  return next();\n'
        + '});\n'
        + '\n'
        + 'const logging = defineMiddleware(async (context, next) => {\n'
        + '  const start = Date.now();\n'
        + '  const response = await next();\n'
        + '  const duration = Date.now() - start;\n'
        + '  console.log(context.url.pathname + " - " + duration + "ms");\n'
        + '  return response;\n'
        + '});\n'
        + '\n'
        + 'export const onRequest = sequence(logging, auth);'}</code></pre>

      <h3 style={subTitle}>{t.h3APIEndpoints}</h3>
      <p style={para}>{t.apiEndpointsDesc}</p>
      <pre style={codeBlock}><code>{'// src/pages/api/comments.ts\n'
        + 'import type { APIRoute } from "astro";\n'
        + 'import { db, Comment } from "astro:db";\n'
        + '\n'
        + 'export const GET: APIRoute = async ({ url }) => {\n'
        + '  const slug = url.searchParams.get("slug");\n'
        + '  if (!slug) {\n'
        + '    return new Response(\n'
        + '      JSON.stringify({ error: "slug is required" }),\n'
        + '      { status: 400 }\n'
        + '    );\n'
        + '  }\n'
        + '\n'
        + '  const comments = await db\n'
        + '    .select()\n'
        + '    .from(Comment)\n'
        + '    .where(eq(Comment.postSlug, slug));\n'
        + '\n'
        + '  return new Response(JSON.stringify(comments), {\n'
        + '    headers: { "Content-Type": "application/json" },\n'
        + '  });\n'
        + '};\n'
        + '\n'
        + 'export const POST: APIRoute = async ({ request }) => {\n'
        + '  const body = await request.json();\n'
        + '  const { postSlug, author, content } = body;\n'
        + '\n'
        + '  await db.insert(Comment).values({\n'
        + '    postSlug,\n'
        + '    author,\n'
        + '    body: content,\n'
        + '  });\n'
        + '\n'
        + '  return new Response(\n'
        + '    JSON.stringify({ success: true }),\n'
        + '    { status: 201 }\n'
        + '  );\n'
        + '};'}</code></pre>

      {/* Integrations */}
      <h2 style={sectionTitle}>{t.h2Integrations}</h2>
      <p style={para}>{t.integrationsDesc}</p>

      <h3 style={subTitle}>{t.h3Tailwind}</h3>
      <p style={para}>{t.tailwindDesc}</p>
      <pre style={codeBlock}><code>{'# Install Tailwind integration\n'
        + 'npx astro add tailwind\n'
        + '\n'
        + '# This automatically:\n'
        + '# 1. Installs @astrojs/tailwind and tailwindcss\n'
        + '# 2. Adds the integration to astro.config.mjs\n'
        + '# 3. Creates a tailwind.config.mjs file'}</code></pre>

      <pre style={codeBlock}><code>{'// astro.config.mjs\n'
        + 'import { defineConfig } from "astro/config";\n'
        + 'import tailwind from "@astrojs/tailwind";\n'
        + '\n'
        + 'export default defineConfig({\n'
        + '  integrations: [\n'
        + '    tailwind({\n'
        + '      // Apply base styles automatically\n'
        + '      applyBaseStyles: true,\n'
        + '      // Path to custom config\n'
        + '      configFile: "./tailwind.config.mjs",\n'
        + '    }),\n'
        + '  ],\n'
        + '});'}</code></pre>

      <h3 style={subTitle}>{t.h3MDX}</h3>
      <p style={para}>{t.mdxDesc}</p>
      <pre style={codeBlock}><code>{'# Install MDX integration\n'
        + 'npx astro add mdx\n'
        + '\n'
        + '# Now you can use .mdx files in content collections\n'
        + '# and import components directly in Markdown'}</code></pre>

      <pre style={codeBlock}><code>{'---\n'
        + '// src/data/blog/interactive-post.mdx\n'
        + 'title: "Interactive Tutorial"\n'
        + 'pubDate: 2026-01-15\n'
        + '---\n'
        + 'import CodePlayground from "../../components/CodePlayground.tsx";\n'
        + 'import Chart from "../../components/Chart.svelte";\n'
        + '\n'
        + '# Interactive Tutorial\n'
        + '\n'
        + 'Here is a live code playground:\n'
        + '\n'
        + '<CodePlayground client:visible code="console.log(42)" />\n'
        + '\n'
        + 'And a dynamic chart:\n'
        + '\n'
        + '<Chart client:idle type="bar" data={[10, 20, 30]} />'}</code></pre>

      <h3 style={subTitle}>{t.h3ImageOpt}</h3>
      <p style={para}>{t.imageOptDesc}</p>
      <pre style={codeBlock}><code>{'---\n'
        + '// Using the Image component\n'
        + 'import { Image } from "astro:assets";\n'
        + 'import heroImage from "../assets/hero.png";\n'
        + '---\n'
        + '\n'
        + '<!-- Automatic optimization: resize, format, lazy load -->\n'
        + '<Image\n'
        + '  src={heroImage}\n'
        + '  alt="Hero banner"\n'
        + '  width={1200}\n'
        + '  height={600}\n'
        + '  format="webp"\n'
        + '  quality={80}\n'
        + '/>\n'
        + '\n'
        + '<!-- Remote images with dimensions -->\n'
        + '<Image\n'
        + '  src="https://example.com/photo.jpg"\n'
        + '  alt="Remote photo"\n'
        + '  width={800}\n'
        + '  height={400}\n'
        + '  inferSize\n'
        + '/>\n'
        + '\n'
        + '<!-- Picture component for art direction -->\n'
        + 'import { Picture } from "astro:assets";\n'
        + '\n'
        + '<Picture\n'
        + '  src={heroImage}\n'
        + '  formats={["avif", "webp"]}\n'
        + '  alt="Responsive hero"\n'
        + '  widths={[400, 800, 1200]}\n'
        + '  sizes="(max-width: 800px) 100vw, 800px"\n'
        + '/>'}</code></pre>

      {/* Deployment */}
      <h2 style={sectionTitle}>{t.h2Deployment}</h2>
      <p style={para}>{t.deploymentDesc}</p>

      <h3 style={subTitle}>{t.h3Vercel}</h3>
      <pre style={codeBlock}><code>{'# Install the Vercel adapter\n'
        + 'npx astro add vercel\n'
        + '\n'
        + '# astro.config.mjs\n'
        + 'import { defineConfig } from "astro/config";\n'
        + 'import vercel from "@astrojs/vercel";\n'
        + '\n'
        + 'export default defineConfig({\n'
        + '  output: "server",  // or "hybrid"\n'
        + '  adapter: vercel({\n'
        + '    // Enable ISR with 60-second revalidation\n'
        + '    isr: {\n'
        + '      expiration: 60,\n'
        + '    },\n'
        + '    // Enable image optimization\n'
        + '    imageService: true,\n'
        + '    // Enable Web Analytics\n'
        + '    webAnalytics: { enabled: true },\n'
        + '  }),\n'
        + '});'}</code></pre>

      <h3 style={subTitle}>{t.h3Netlify}</h3>
      <pre style={codeBlock}><code>{'# Install the Netlify adapter\n'
        + 'npx astro add netlify\n'
        + '\n'
        + '# astro.config.mjs\n'
        + 'import { defineConfig } from "astro/config";\n'
        + 'import netlify from "@astrojs/netlify";\n'
        + '\n'
        + 'export default defineConfig({\n'
        + '  output: "server",\n'
        + '  adapter: netlify({\n'
        + '    // Use edge functions for faster cold starts\n'
        + '    edgeMiddleware: true,\n'
        + '    // Cache static assets\n'
        + '    cacheOnDemandPages: true,\n'
        + '  }),\n'
        + '});'}</code></pre>

      <h3 style={subTitle}>{t.h3Cloudflare}</h3>
      <pre style={codeBlock}><code>{'# Install the Cloudflare adapter\n'
        + 'npx astro add cloudflare\n'
        + '\n'
        + '# astro.config.mjs\n'
        + 'import { defineConfig } from "astro/config";\n'
        + 'import cloudflare from "@astrojs/cloudflare";\n'
        + '\n'
        + 'export default defineConfig({\n'
        + '  output: "server",\n'
        + '  adapter: cloudflare({\n'
        + '    mode: "directory",\n'
        + '    // Access Cloudflare bindings (KV, D1, R2)\n'
        + '    platformProxy: {\n'
        + '      enabled: true,\n'
        + '    },\n'
        + '  }),\n'
        + '});\n'
        + '\n'
        + '// Access Cloudflare bindings in your pages\n'
        + '// src/pages/api/data.ts\n'
        + 'export const GET: APIRoute = async ({ locals }) => {\n'
        + '  const { runtime } = locals;\n'
        + '  const kv = runtime.env.MY_KV_NAMESPACE;\n'
        + '  const value = await kv.get("key");\n'
        + '  return new Response(JSON.stringify({ value }));\n'
        + '};'}</code></pre>

      {/* Performance */}
      <h2 style={sectionTitle}>{t.h2Performance}</h2>
      <p style={para}>{t.perfDesc}</p>
      <ul style={{ paddingLeft: '1.5rem', marginBottom: '1.5rem' }}>
        <li style={listItem}>{t.bp1}</li>
        <li style={listItem}>{t.bp2}</li>
        <li style={listItem}>{t.bp3}</li>
        <li style={listItem}>{t.bp4}</li>
        <li style={listItem}>{t.bp5}</li>
        <li style={listItem}>{t.bp6}</li>
        <li style={listItem}>{t.bp7}</li>
        <li style={listItem}>{t.bp8}</li>
        <li style={listItem}>{t.bp9}</li>
        <li style={listItem}>{t.bp10}</li>
      </ul>

      <pre style={codeBlock}><code>{'// Performance-optimized astro.config.mjs\n'
        + 'import { defineConfig } from "astro/config";\n'
        + 'import tailwind from "@astrojs/tailwind";\n'
        + 'import compress from "astro-compress";\n'
        + 'import sitemap from "@astrojs/sitemap";\n'
        + '\n'
        + 'export default defineConfig({\n'
        + '  site: "https://example.com",\n'
        + '  integrations: [\n'
        + '    tailwind(),\n'
        + '    sitemap(),\n'
        + '    compress({\n'
        + '      CSS: true,\n'
        + '      HTML: true,\n'
        + '      JavaScript: true,\n'
        + '      Image: true,\n'
        + '      SVG: true,\n'
        + '    }),\n'
        + '  ],\n'
        + '  prefetch: {\n'
        + '    prefetchAll: false,\n'
        + '    defaultStrategy: "viewport",\n'
        + '  },\n'
        + '  image: {\n'
        + '    service: { entrypoint: "astro/assets/services/sharp" },\n'
        + '    remotePatterns: [\n'
        + '      { protocol: "https", hostname: "**.example.com" },\n'
        + '    ],\n'
        + '  },\n'
        + '  vite: {\n'
        + '    build: {\n'
        + '      cssMinify: "lightningcss",\n'
        + '      rollupOptions: {\n'
        + '        output: {\n'
        + '          manualChunks: {\n'
        + '            react: ["react", "react-dom"],\n'
        + '          },\n'
        + '        },\n'
        + '      },\n'
        + '    },\n'
        + '  },\n'
        + '});'}</code></pre>

      {/* FAQ */}
      <h2 style={sectionTitle}>{t.h2Faq}</h2>
      {[
        { q: t.faq1Q, a: t.faq1A },
        { q: t.faq2Q, a: t.faq2A },
        { q: t.faq3Q, a: t.faq3A },
        { q: t.faq4Q, a: t.faq4A },
        { q: t.faq5Q, a: t.faq5A },
        { q: t.faq6Q, a: t.faq6A },
        { q: t.faq7Q, a: t.faq7A },
        { q: t.faq8Q, a: t.faq8A },
      ].map((faq, i) => (
        <div key={i} style={{ marginBottom: '1.5rem' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.5rem' }}>{faq.q}</h3>
          <p style={{ lineHeight: '1.7' }}>{faq.a}</p>
        </div>
      ))}
    </article>
  );
}
