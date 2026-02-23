'use client';
import React from 'react';

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'Astro vs Next.js 2026: Static Sites, Server Rendering, and Performance',
    intro: 'Astro and Next.js are two of the most popular web frameworks in 2026, but they serve fundamentally different use cases. Astro excels at content-driven websites with its zero-JS-by-default approach and island architecture, while Next.js dominates full-stack web applications with its comprehensive React ecosystem. This guide compares their architectures, performance characteristics, and ideal use cases to help you choose the right framework.',
    h2Architecture: 'Architecture Overview',
    h3AstroArch: 'Astro: Content-First, Islands Architecture',
    astroArchDesc: 'Astro renders pages to static HTML at build time by default, shipping zero JavaScript to the client. Interactive components are loaded as isolated "islands" that hydrate independently. This means a blog post with one interactive widget only loads JavaScript for that widget, not the entire page.',
    h3NextArch: 'Next.js: Full-Stack React Framework',
    nextArchDesc: 'Next.js is a full-stack React framework that supports multiple rendering strategies: Static Site Generation (SSG), Server-Side Rendering (SSR), Incremental Static Regeneration (ISR), and React Server Components (RSC). The App Router (default in Next.js 14+) uses React Server Components by default, reducing client-side JavaScript.',
    h2Performance: 'Performance Comparison',
    perfDesc: 'Performance is where the architectural differences become most apparent.',
    thMetric: 'Metric',
    thAstro: 'Astro 5',
    thNext: 'Next.js 15',
    h2Rendering: 'Rendering Strategies',
    h3AstroRendering: 'Astro Rendering',
    astroRenderingDesc: 'Astro defaults to static HTML output. You can opt into server-side rendering per page or per component. The Content Collections API provides type-safe access to Markdown, MDX, and data files.',
    h3NextRendering: 'Next.js Rendering',
    nextRenderingDesc: 'Next.js offers the most rendering options of any framework. With the App Router, React Server Components are the default, and you opt into client-side rendering with the "use client" directive.',
    h2Islands: 'Islands Architecture vs React Server Components',
    islandsDesc: 'Both Astro and Next.js minimize client-side JavaScript, but they take different approaches.',
    h3AstroIslands: 'Astro Islands',
    astroIslandsDesc: 'In Astro, every component renders to static HTML by default. You explicitly opt into interactivity using client:* directives. Each island is independent, meaning a React counter and a Vue carousel can coexist on the same page.',
    h3NextRSC: 'React Server Components',
    nextRSCDesc: 'In Next.js, Server Components render on the server and send HTML to the client. Client Components are marked with "use client" and include their JavaScript bundle. The boundary between server and client is at the component level.',
    h2DX: 'Developer Experience',
    h3AstroDX: 'Astro Developer Experience',
    astroDXDesc: 'Astro uses a file-based routing system with .astro files that combine HTML template syntax with a JavaScript frontmatter section. It supports React, Vue, Svelte, Solid, and Preact components within the same project.',
    h3NextDX: 'Next.js Developer Experience',
    nextDXDesc: 'Next.js uses a file-based routing system with React components (.tsx files). The App Router introduces layouts, loading states, error boundaries, and parallel routes as file conventions. The ecosystem includes Vercel for deployment, next-auth for authentication, and extensive middleware support.',
    h2UseCases: 'Use Cases',
    h3ChooseAstro: 'Choose Astro When:',
    astroUseCases: 'Content-heavy websites (blogs, docs, marketing)|Static sites that need minimal interactivity|Portfolio and landing pages|Documentation sites (Starlight)|Multi-framework projects (React + Vue + Svelte)|Maximum performance with zero JS by default|SEO-critical content sites',
    h3ChooseNext: 'Choose Next.js When:',
    nextUseCases: 'Full-stack web applications|Complex interactive dashboards|E-commerce platforms|Apps requiring authentication and authorization|Real-time features (WebSockets, streaming)|Projects deeply invested in the React ecosystem|Serverless API routes alongside the frontend',
    h2Ecosystem: 'Ecosystem Comparison',
    thFeature: 'Feature',
    h2Migration: 'Migrating Between Frameworks',
    migrationDesc: 'If you are considering switching frameworks, here are the key differences to be aware of.',
    h2Faq: 'Frequently Asked Questions',
    faq1Q: 'Is Astro faster than Next.js?',
    faq1A: 'For content-heavy sites, yes. Astro ships zero JavaScript by default, resulting in faster page loads and better Core Web Vitals scores. For interactive applications, Next.js with React Server Components achieves comparable performance while offering more flexibility for dynamic features.',
    faq2Q: 'Can I use React with Astro?',
    faq2A: 'Yes. Astro supports React, Vue, Svelte, Solid, Preact, and Lit components. You can even mix frameworks on the same page. React components are rendered as interactive islands using client:load, client:idle, or client:visible directives.',
    faq3Q: 'Which is better for SEO?',
    faq3A: 'Both are excellent for SEO since they render HTML on the server. Astro has a slight edge for content sites because it generates pure static HTML with zero JavaScript overhead. Next.js is also great for SEO with Server Components and static generation.',
    faq4Q: 'Can Astro replace Next.js?',
    faq4A: 'For content sites and marketing pages, absolutely. For complex web applications with authentication, real-time features, and heavy client-side interactivity, Next.js remains the better choice. The frameworks serve different primary use cases.',
    faq5Q: 'Which has a larger community?',
    faq5A: 'Next.js has a significantly larger community and ecosystem due to its longer history and React backing. Astro is growing rapidly and has an enthusiastic community, but the library and plugin ecosystem is smaller. Both have excellent documentation.',
  },
  zh: {
    title: 'Astro vs Next.js 2026：静态站点、服务端渲染和性能',
    intro: 'Astro 和 Next.js 是 2026 年最流行的两个 Web 框架，但它们服务于根本不同的用例。Astro 以零 JS 默认方式和岛屿架构擅长内容驱动网站，而 Next.js 以其全面的 React 生态系统主导全栈 Web 应用。',
    h2Architecture: '架构概述',
    h3AstroArch: 'Astro：内容优先，岛屿架构',
    astroArchDesc: 'Astro 默认在构建时将页面渲染为静态 HTML，不向客户端发送 JavaScript。交互组件作为独立的"岛屿"加载并独立水合。',
    h3NextArch: 'Next.js：全栈 React 框架',
    nextArchDesc: 'Next.js 是一个全栈 React 框架，支持多种渲染策略：SSG、SSR、ISR 和 React 服务端组件（RSC）。',
    h2Performance: '性能比较',
    perfDesc: '性能是架构差异最明显的地方。',
    thMetric: '指标',
    thAstro: 'Astro 5',
    thNext: 'Next.js 15',
    h2Rendering: '渲染策略',
    h3AstroRendering: 'Astro 渲染',
    astroRenderingDesc: 'Astro 默认输出静态 HTML。可以按页面或组件启用服务端渲染。',
    h3NextRendering: 'Next.js 渲染',
    nextRenderingDesc: 'Next.js 提供最多的渲染选项。App Router 默认使用 React 服务端组件。',
    h2Islands: '岛屿架构 vs React 服务端组件',
    islandsDesc: 'Astro 和 Next.js 都最小化客户端 JavaScript，但采用不同的方法。',
    h3AstroIslands: 'Astro 岛屿',
    astroIslandsDesc: '在 Astro 中，每个组件默认渲染为静态 HTML。使用 client:* 指令显式启用交互性。',
    h3NextRSC: 'React 服务端组件',
    nextRSCDesc: '在 Next.js 中，服务端组件在服务器上渲染。客户端组件用 "use client" 标记。',
    h2DX: '开发者体验',
    h3AstroDX: 'Astro 开发者体验',
    astroDXDesc: 'Astro 使用基于文件的路由系统，.astro 文件结合 HTML 模板语法和 JavaScript frontmatter。支持多框架。',
    h3NextDX: 'Next.js 开发者体验',
    nextDXDesc: 'Next.js 使用基于文件的路由系统和 React 组件。App Router 引入布局、加载状态和错误边界。',
    h2UseCases: '使用场景',
    h3ChooseAstro: '选择 Astro 的场景：',
    astroUseCases: '内容密集型网站（博客、文档、营销）|需要最少交互的静态站点|作品集和着陆页|文档站点（Starlight）|多框架项目|零 JS 默认的最大性能|SEO 关键内容站点',
    h3ChooseNext: '选择 Next.js 的场景：',
    nextUseCases: '全栈 Web 应用|复杂交互式仪表板|电商平台|需要认证和授权的应用|实时功能|深度投入 React 生态的项目|前端旁边的无服务器 API 路由',
    h2Ecosystem: '生态系统比较',
    thFeature: '功能',
    h2Migration: '框架间迁移',
    migrationDesc: '如果你正在考虑切换框架，以下是需要注意的关键差异。',
    h2Faq: '常见问题',
    faq1Q: 'Astro 比 Next.js 快吗？',
    faq1A: '对于内容密集型站点，是的。Astro 默认不发送 JavaScript。对于交互式应用，Next.js 的 RSC 可实现相当的性能。',
    faq2Q: '可以在 Astro 中使用 React 吗？',
    faq2A: '可以。Astro 支持 React、Vue、Svelte、Solid 等组件，甚至可以在同一页面混合使用。',
    faq3Q: '哪个对 SEO 更好？',
    faq3A: '两者都非常适合 SEO。Astro 对内容站点有轻微优势，因为生成纯静态 HTML。',
    faq4Q: 'Astro 能取代 Next.js 吗？',
    faq4A: '对于内容站点可以。对于复杂的 Web 应用，Next.js 仍然是更好的选择。',
    faq5Q: '哪个社区更大？',
    faq5A: 'Next.js 社区更大。Astro 增长迅速但生态系统较小。两者都有出色的文档。',
  },
};

export default function AstroVsNextjs2026({ lang }: { lang: string }) {
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
    ],
  };

  return (
    <article style={{ maxWidth: 'none' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <p style={{ fontSize: '1.125rem', lineHeight: '1.75', marginBottom: '2rem' }}>{t.intro}</p>

      {/* Architecture */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '2.5rem', marginBottom: '1rem' }}>{t.h2Architecture}</h2>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: '2rem', marginBottom: '0.75rem' }}>{t.h3AstroArch}</h3>
      <p style={{ marginBottom: '1rem' }}>{t.astroArchDesc}</p>
      <pre style={{ backgroundColor: '#111827', padding: '1rem', borderRadius: '0.5rem', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`---
// src/pages/blog/[slug].astro
import Layout from "../../layouts/Layout.astro";
import { getEntry } from "astro:content";

const { slug } = Astro.params;
const post = await getEntry("blog", slug);
const { Content } = await post.render();
---

<Layout title={post.data.title}>
  <article>
    <h1>{post.data.title}</h1>
    <time>{post.data.date.toLocaleDateString()}</time>
    <Content />

    <!-- This React component is an "island" -->
    <!-- Only its JS is loaded, not the whole page -->
    <LikeButton client:visible postId={post.id} />
  </article>
</Layout>

<!-- Result: Static HTML + minimal JS for the button only -->`}</code></pre>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: '2rem', marginBottom: '0.75rem' }}>{t.h3NextArch}</h3>
      <p style={{ marginBottom: '1rem' }}>{t.nextArchDesc}</p>
      <pre style={{ backgroundColor: '#111827', padding: '1rem', borderRadius: '0.5rem', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`// app/blog/[slug]/page.tsx (Server Component by default)
import { notFound } from "next/navigation";
import { getPost } from "@/lib/posts";
import LikeButton from "@/components/LikeButton"; // Client Component

export default async function BlogPost({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getPost(params.slug);
  if (!post) notFound();

  return (
    <article>
      <h1>{post.title}</h1>
      <time>{post.date}</time>
      <div dangerouslySetInnerHTML={{ __html: post.content }} />

      {/* Client Component - includes its JS bundle */}
      <LikeButton postId={post.id} />
    </article>
  );
}

// Generate static params for SSG
export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}`}</code></pre>

      {/* Performance */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '2.5rem', marginBottom: '1rem' }}>{t.h2Performance}</h2>
      <p style={{ marginBottom: '1rem' }}>{t.perfDesc}</p>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead style={{ backgroundColor: 'rgba(55,65,81,0.5)' }}>
            <tr>
              <th style={{ border: '1px solid #374151', padding: '0.5rem 1rem', textAlign: 'left' }}>{t.thMetric}</th>
              <th style={{ border: '1px solid #374151', padding: '0.5rem 1rem', textAlign: 'left' }}>{t.thAstro}</th>
              <th style={{ border: '1px solid #374151', padding: '0.5rem 1rem', textAlign: 'left' }}>{t.thNext}</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['JS shipped (content page)', '0 KB (default)', '~80-150 KB (React runtime)'],
              ['First Contentful Paint', 'Excellent (~0.5s)', 'Good (~0.8-1.2s)'],
              ['Time to Interactive', 'Excellent (= FCP)', 'Good (hydration delay)'],
              ['Largest Contentful Paint', 'Excellent', 'Good'],
              ['Build time (1000 pages)', '~10-30s', '~30-90s'],
              ['Lighthouse score (content)', '95-100', '85-95'],
              ['Bundle size (framework)', '~7 KB (Astro runtime)', '~85 KB (React + Next)'],
            ].map(([metric, astro, next], i) => (
              <tr key={i}>
                <td style={{ border: '1px solid #374151', padding: '0.5rem 1rem' }}>{metric}</td>
                <td style={{ border: '1px solid #374151', padding: '0.5rem 1rem' }}>{astro}</td>
                <td style={{ border: '1px solid #374151', padding: '0.5rem 1rem' }}>{next}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Islands vs RSC */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '2.5rem', marginBottom: '1rem' }}>{t.h2Islands}</h2>
      <p style={{ marginBottom: '1rem' }}>{t.islandsDesc}</p>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: '2rem', marginBottom: '0.75rem' }}>{t.h3AstroIslands}</h3>
      <p style={{ marginBottom: '1rem' }}>{t.astroIslandsDesc}</p>
      <pre style={{ backgroundColor: '#111827', padding: '1rem', borderRadius: '0.5rem', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`---
// Astro islands with different hydration strategies
import ReactCounter from "../components/Counter.tsx";
import VueCarousel from "../components/Carousel.vue";
import SvelteForm from "../components/Form.svelte";
---

<!-- Load immediately -->
<ReactCounter client:load />

<!-- Load when browser is idle -->
<VueCarousel client:idle />

<!-- Load when visible in viewport (lazy) -->
<SvelteForm client:visible />

<!-- Load only on specific media query -->
<HeavyWidget client:media="(min-width: 768px)" />

<!-- No directive = static HTML only, zero JS -->
<StaticComponent />`}</code></pre>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: '2rem', marginBottom: '0.75rem' }}>{t.h3NextRSC}</h3>
      <p style={{ marginBottom: '1rem' }}>{t.nextRSCDesc}</p>
      <pre style={{ backgroundColor: '#111827', padding: '1rem', borderRadius: '0.5rem', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`// Server Component (default - no "use client")
// Runs on server only, zero JS shipped
async function PostList() {
  const posts = await db.query("SELECT * FROM posts");
  return (
    <ul>
      {posts.map(post => (
        <li key={post.id}>
          <a href={\`/blog/\${post.slug}\`}>{post.title}</a>
        </li>
      ))}
    </ul>
  );
}

// Client Component - JS is shipped to browser
"use client";
import { useState } from "react";

function LikeButton({ postId }: { postId: string }) {
  const [likes, setLikes] = useState(0);
  return (
    <button onClick={() => setLikes(l => l + 1)}>
      {likes} likes
    </button>
  );
}`}</code></pre>

      {/* Use Cases */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '2.5rem', marginBottom: '1rem' }}>{t.h2UseCases}</h2>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
        <div style={{ backgroundColor: 'rgba(168,85,247,0.1)', border: '1px solid rgba(168,85,247,0.3)', borderRadius: '0.5rem', padding: '1rem' }}>
          <h3 style={{ fontWeight: 600, marginBottom: '0.5rem', color: '#c084fc' }}>{t.h3ChooseAstro}</h3>
          <ul style={{ paddingLeft: '1.25rem', fontSize: '0.875rem' }}>
            {t.astroUseCases.split('|').map((item, i) => (
              <li key={i} style={{ marginBottom: '0.25rem' }}>{item}</li>
            ))}
          </ul>
        </div>
        <div style={{ backgroundColor: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.3)', borderRadius: '0.5rem', padding: '1rem' }}>
          <h3 style={{ fontWeight: 600, marginBottom: '0.5rem', color: '#60a5fa' }}>{t.h3ChooseNext}</h3>
          <ul style={{ paddingLeft: '1.25rem', fontSize: '0.875rem' }}>
            {t.nextUseCases.split('|').map((item, i) => (
              <li key={i} style={{ marginBottom: '0.25rem' }}>{item}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Ecosystem Comparison */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '2.5rem', marginBottom: '1rem' }}>{t.h2Ecosystem}</h2>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead style={{ backgroundColor: 'rgba(55,65,81,0.5)' }}>
            <tr>
              <th style={{ border: '1px solid #374151', padding: '0.5rem 1rem', textAlign: 'left' }}>{t.thFeature}</th>
              <th style={{ border: '1px solid #374151', padding: '0.5rem 1rem', textAlign: 'left' }}>Astro</th>
              <th style={{ border: '1px solid #374151', padding: '0.5rem 1rem', textAlign: 'left' }}>Next.js</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['UI framework', 'React, Vue, Svelte, Solid, Preact', 'React only'],
              ['Routing', 'File-based', 'File-based (App Router)'],
              ['API routes', 'Endpoints (.ts files)', 'Route handlers'],
              ['Database', 'Any (via API)', 'Any (Prisma, Drizzle popular)'],
              ['Auth', 'Any (Lucia, Auth.js)', 'next-auth / Auth.js'],
              ['CMS integration', 'Excellent (Content Collections)', 'Good (any headless CMS)'],
              ['Image optimization', 'Built-in (<Image />)', 'Built-in (next/image)'],
              ['Deployment', 'Any static host, Vercel, Netlify', 'Vercel (optimized), any Node host'],
              ['TypeScript', 'Full support', 'Full support'],
              ['Middleware', 'Astro middleware', 'Next.js middleware (Edge)'],
            ].map(([feat, astro, next], i) => (
              <tr key={i}>
                <td style={{ border: '1px solid #374151', padding: '0.5rem 1rem' }}>{feat}</td>
                <td style={{ border: '1px solid #374151', padding: '0.5rem 1rem' }}>{astro}</td>
                <td style={{ border: '1px solid #374151', padding: '0.5rem 1rem' }}>{next}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Data Fetching Comparison */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '2.5rem', marginBottom: '1rem' }}>Data Fetching</h2>
      <p style={{ marginBottom: '1rem' }}>Both frameworks support server-side data fetching, but with different APIs and patterns.</p>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: '2rem', marginBottom: '0.75rem' }}>Astro Data Fetching</h3>
      <pre style={{ backgroundColor: '#111827', padding: '1rem', borderRadius: '0.5rem', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`---
// Astro: fetch data in the frontmatter (runs at build time or SSR)
const response = await fetch("https://api.example.com/posts");
const posts = await response.json();

// Content Collections: type-safe local content
import { getCollection } from "astro:content";
const blogPosts = await getCollection("blog", ({ data }) => {
  return data.draft !== true;  // filter drafts
});
---

<ul>
  {posts.map(post => (
    <li><a href={post.url}>{post.title}</a></li>
  ))}
</ul>`}</code></pre>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: '2rem', marginBottom: '0.75rem' }}>Next.js Data Fetching</h3>
      <pre style={{ backgroundColor: '#111827', padding: '1rem', borderRadius: '0.5rem', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`// Next.js App Router: fetch in Server Components (default)
// Data is fetched on the server, HTML sent to client
export default async function PostsPage() {
  // Cached by default, revalidate every 60 seconds
  const response = await fetch("https://api.example.com/posts", {
    next: { revalidate: 60 },
  });
  const posts = await response.json();

  return (
    <ul>
      {posts.map(post => (
        <li key={post.id}>
          <a href={post.url}>{post.title}</a>
        </li>
      ))}
    </ul>
  );
}

// Dynamic data: no caching
// const res = await fetch(url, { cache: "no-store" });

// Static data: cached indefinitely
// const res = await fetch(url, { cache: "force-cache" });`}</code></pre>

      {/* Deployment Comparison */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '2.5rem', marginBottom: '1rem' }}>Deployment Comparison</h2>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead style={{ backgroundColor: 'rgba(55,65,81,0.5)' }}>
            <tr>
              <th style={{ border: '1px solid #374151', padding: '0.5rem 1rem', textAlign: 'left' }}>Platform</th>
              <th style={{ border: '1px solid #374151', padding: '0.5rem 1rem', textAlign: 'left' }}>Astro</th>
              <th style={{ border: '1px solid #374151', padding: '0.5rem 1rem', textAlign: 'left' }}>Next.js</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Vercel', 'Full support', 'Best-in-class (native)'],
              ['Netlify', 'Full support', 'Good support'],
              ['Cloudflare Pages', 'Full support', 'Partial (@opennextjs)'],
              ['AWS Amplify', 'Static only', 'Full support'],
              ['Static hosting (S3, GH Pages)', 'Excellent (default)', 'SSG mode only'],
              ['Docker / VPS', 'Node adapter', 'node server.js'],
              ['Edge Runtime', 'Via adapters', 'Native (middleware + routes)'],
            ].map(([platform, astro, next], i) => (
              <tr key={i}>
                <td style={{ border: '1px solid #374151', padding: '0.5rem 1rem' }}>{platform}</td>
                <td style={{ border: '1px solid #374151', padding: '0.5rem 1rem' }}>{astro}</td>
                <td style={{ border: '1px solid #374151', padding: '0.5rem 1rem' }}>{next}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* FAQ */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '2.5rem', marginBottom: '1rem' }}>{t.h2Faq}</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {[
          [t.faq1Q, t.faq1A], [t.faq2Q, t.faq2A], [t.faq3Q, t.faq3A],
          [t.faq4Q, t.faq4A], [t.faq5Q, t.faq5A],
        ].map(([q, a], i) => (
          <div key={i} style={{ border: '1px solid #374151', borderRadius: '0.5rem', padding: '1rem' }}>
            <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '0.5rem' }}>{q}</h3>
            <p style={{ color: '#d1d5db' }}>{a}</p>
          </div>
        ))}
      </div>
    </article>
  );
}
