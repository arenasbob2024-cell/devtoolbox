'use client'

const translations = {
  en: {
    title: 'Web Performance Optimization Guide: Core Web Vitals, Caching, and Speed Techniques',
    description:
      'Master web performance optimization with this comprehensive guide covering Core Web Vitals (LCP, INP, CLS, TTFB), image optimization, JavaScript bundling, caching strategies, font loading, server-side performance, React/Next.js patterns, and Lighthouse scoring — with real code examples and quick wins.',
    content: 'en',
  },
  zh: {
    title: 'Web 性能优化指南：核心 Web 指标、缓存与加速技术',
    description:
      '全面掌握 Web 性能优化，涵盖核心 Web 指标（LCP、INP、CLS、TTFB）、图片优化、JavaScript 打包、缓存策略、字体加载、服务端性能、React/Next.js 模式及 Lighthouse 评分——附真实代码示例与快速优化方案。',
    content: 'zh',
  },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What are Core Web Vitals and why do they matter for SEO?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Core Web Vitals are a set of real-world performance metrics defined by Google: Largest Contentful Paint (LCP) measures loading speed, Interaction to Next Paint (INP) measures responsiveness, and Cumulative Layout Shift (CLS) measures visual stability. They became Google ranking signals in 2021 via the Page Experience update. Good scores are LCP < 2.5s, INP < 200ms, and CLS < 0.1. They directly affect both user experience and organic search rankings.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the fastest way to improve Largest Contentful Paint (LCP)?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The fastest LCP improvements come from: (1) preloading the LCP image with <link rel="preload" fetchpriority="high">, (2) converting images to WebP or AVIF format (30–50% smaller), (3) serving images from a CDN, (4) eliminating render-blocking resources, and (5) improving server response time (TTFB) with caching or a CDN. Use fetchpriority="high" on the hero image and avoid lazy-loading it.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I fix Cumulative Layout Shift (CLS)?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Fix CLS by: (1) always specifying width and height attributes on images and videos so the browser reserves space, (2) using aspect-ratio CSS for responsive media containers, (3) reserving space for ads and embeds with min-height, (4) using font-display: swap and size-adjust to reduce font-swap layout shifts, and (5) avoiding inserting content above existing content dynamically. Avoid animations that change layout properties — use transform and opacity instead.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the difference between browser cache, CDN cache, and service worker cache?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Browser cache stores resources locally on the user\'s device (controlled by Cache-Control headers). CDN cache stores resources on edge servers geographically close to users (controlled by s-maxage and CDN config). Service worker cache is programmable JavaScript-controlled storage that enables offline support, custom caching strategies, and background sync. For best performance, use all three: CDN for global distribution, browser cache for repeat visits, and service worker for offline/resilience.',
      },
    },
    {
      '@type': 'Question',
      name: 'Should I use WebP or AVIF for images?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'AVIF offers better compression than WebP (typically 50% smaller than JPEG vs 30% for WebP), but has slightly less browser support (96% vs 97% in 2025). Use the picture element to provide both: <picture><source srcset="image.avif" type="image/avif"><source srcset="image.webp" type="image/webp"><img src="image.jpg"></picture>. This way browsers pick the best supported format. Next.js Image component handles this automatically.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is a good Lighthouse performance score?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A Lighthouse Performance score of 90 or above is considered "Good" (green), 50–89 is "Needs Improvement" (orange), and below 50 is "Poor" (red). However, Lighthouse lab scores can vary by 5–10 points between runs. Focus on field data from Chrome UX Report and real user metrics rather than chasing a specific lab score. The most important real metrics are the three Core Web Vitals measured in the field.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does code splitting improve JavaScript performance?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Code splitting breaks your JavaScript bundle into smaller chunks that are loaded on demand. Instead of downloading all code upfront, users download only the code needed for the current page. React.lazy() and dynamic import() enable component-level splitting. Next.js automatically splits by page. This reduces initial bundle size, speeds up Time to Interactive (TTI), and improves Lighthouse performance scores. Aim for an initial JS payload under 150KB compressed.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is stale-while-revalidate and when should I use it?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'stale-while-revalidate is a Cache-Control directive that tells the browser (or CDN) to serve a cached response immediately while fetching a fresh version in the background. Example: Cache-Control: max-age=60, stale-while-revalidate=86400 — serves cached content for up to 24 hours while revalidating in the background. Use it for content that can tolerate being slightly stale but must load fast: news articles, product listings, blog posts. Avoid it for real-time data, authenticated content, or checkout pages.',
      },
    },
  ],
}

const enContent = (
  <article>
    {/* TL;DR Box */}
    <div
      style={{
        background: '#f0f9ff',
        border: '2px solid #0ea5e9',
        borderRadius: '10px',
        padding: '20px 28px',
        marginBottom: '32px',
      }}
    >
      <strong style={{ fontSize: '1.1rem', color: '#0369a1', display: 'block', marginBottom: '8px' }}>
        TL;DR — Web Performance in 60 Seconds
      </strong>
      <ul style={{ margin: 0, paddingLeft: '20px', color: '#0c4a6e', lineHeight: '1.8' }}>
        <li>Core Web Vitals (LCP, INP, CLS) are Google ranking signals — target green thresholds</li>
        <li>Image optimization (WebP/AVIF + srcset + lazy loading) is the single highest-impact change</li>
        <li>Code splitting and tree shaking reduce JavaScript payload — aim for &lt;150KB compressed</li>
        <li>Cache aggressively: immutable for hashed assets, stale-while-revalidate for HTML</li>
        <li>Use <code>font-display: swap</code> and preload key fonts to prevent invisible text (FOIT)</li>
        <li>Brotli compression cuts transfer size by ~20% over gzip; enable on every server</li>
        <li>React Server Components and ISR dramatically reduce client-side JavaScript</li>
        <li>Measure with web-vitals JS in production — lab scores are a guide, not the goal</li>
      </ul>
    </div>

    {/* Introduction */}
    <h2 style={{ fontSize: '1.75rem', fontWeight: '700', marginTop: '0', marginBottom: '16px', color: '#1e293b' }}>
      Why Web Performance Is a Business Priority
    </h2>
    <p style={{ lineHeight: '1.8', color: '#374151', marginBottom: '16px' }}>
      Web performance is no longer a nice-to-have — it is a direct revenue and SEO driver. A 100ms improvement in load time increases Amazon's revenue by 1%. Google reports that as page load time goes from 1s to 3s, the probability of bounce increases 32%. The BBC found that every additional second of load time caused 10% of their users to leave.
    </p>
    <p style={{ lineHeight: '1.8', color: '#374151', marginBottom: '16px' }}>
      Beyond user experience, Google's Page Experience algorithm uses Core Web Vitals as explicit ranking signals. Pages that fail Core Web Vitals thresholds are at a systematic ranking disadvantage, regardless of content quality. This guide covers every layer of the performance stack — from bytes on the wire to React rendering — with measurement techniques, code examples, and prioritized quick wins.
    </p>

    {/* Key Takeaways */}
    <div
      style={{
        background: '#f8fafc',
        border: '1px solid #e2e8f0',
        borderRadius: '10px',
        padding: '20px 28px',
        marginBottom: '32px',
      }}
    >
      <strong style={{ fontSize: '1rem', color: '#1e293b', display: 'block', marginBottom: '12px' }}>
        Key Takeaways
      </strong>
      <ul style={{ margin: 0, paddingLeft: '20px', color: '#475569', lineHeight: '1.9' }}>
        <li>Measure real-user field data (CrUX, web-vitals.js) before and after optimizations</li>
        <li>The image optimization + CDN combo typically delivers the largest single performance gain</li>
        <li>JavaScript bundle size directly controls Time to Interactive — split aggressively</li>
        <li>HTTP cache headers and service workers together create a multi-layer caching system</li>
        <li>Lighthouse scores are useful signals but real-user Core Web Vitals determine ranking</li>
        <li>Performance budgets enforced in CI prevent regression over time</li>
      </ul>
    </div>

    {/* Section 1: Core Web Vitals */}
    <h2 style={{ fontSize: '1.75rem', fontWeight: '700', marginBottom: '16px', color: '#1e293b' }}>
      1. Core Web Vitals: Targets, Measurement, and What They Mean
    </h2>
    <p style={{ lineHeight: '1.8', color: '#374151', marginBottom: '16px' }}>
      Core Web Vitals are the subset of Web Vitals that Google considers most important for user experience. There are three: Largest Contentful Paint (LCP), Interaction to Next Paint (INP), and Cumulative Layout Shift (CLS). Each has three performance bands — Good, Needs Improvement, and Poor.
    </p>
    <pre style={{ background: '#0f172a', color: '#e2e8f0', borderRadius: '8px', padding: '20px', overflowX: 'auto', fontSize: '0.875rem', lineHeight: '1.7', marginBottom: '24px' }}>
      <code>{
'Core Web Vitals Reference (2025/2026):\n' +
'\n' +
'Metric   Full Name                    Measures              Good      Needs Work  Poor\n' +
'------   ---------                    --------              ----      ----------  ----\n' +
'LCP      Largest Contentful Paint     Loading performance   <2.5s     2.5-4.0s    >4.0s\n' +
'INP      Interaction to Next Paint    Responsiveness        <200ms    200-500ms   >500ms\n' +
'CLS      Cumulative Layout Shift      Visual stability      <0.1      0.1-0.25    >0.25\n' +
'\n' +
'Supporting Metrics (also important):\n' +
'FCP      First Contentful Paint       First visible render  <1.8s\n' +
'TTFB     Time to First Byte           Server response       <800ms\n' +
'TBT      Total Blocking Time          Main thread blocks    <200ms\n' +
'TTI      Time to Interactive          Fully interactive     <3.8s\n' +
'SI       Speed Index                  Visual progress       <3.4s\n' +
'\n' +
'INP replaced FID (First Input Delay) as a Core Web Vital in March 2024.\n' +
'INP measures all interactions during the page lifetime, not just the first.'
      }</code>
    </pre>

    <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '12px', color: '#1e293b' }}>
      Measuring Core Web Vitals in the Field
    </h3>
    <p style={{ lineHeight: '1.8', color: '#374151', marginBottom: '16px' }}>
      Field data (real user measurements) is what Google uses for ranking. Install the <code>web-vitals</code> library to collect real-user data from your production site:
    </p>
    <pre style={{ background: '#0f172a', color: '#e2e8f0', borderRadius: '8px', padding: '20px', overflowX: 'auto', fontSize: '0.875rem', lineHeight: '1.7', marginBottom: '24px' }}>
      <code>{
'// npm install web-vitals\n' +
'import { onCLS, onINP, onLCP, onFCP, onTTFB } from "web-vitals";\n' +
'\n' +
'function sendToAnalytics(metric) {\n' +
'  const body = JSON.stringify({\n' +
'    name: metric.name,         // "LCP", "INP", "CLS", etc.\n' +
'    value: metric.value,       // The metric value\n' +
'    rating: metric.rating,     // "good" | "needs-improvement" | "poor"\n' +
'    delta: metric.delta,       // Change from last reported value\n' +
'    id: metric.id,             // Unique ID for this page load\n' +
'    navigationType: metric.navigationType, // "navigate" | "reload" | "back-forward"\n' +
'  });\n' +
'\n' +
'  // sendBeacon is non-blocking — ideal for analytics\n' +
'  if (navigator.sendBeacon) {\n' +
'    navigator.sendBeacon("/api/vitals", body);\n' +
'  } else {\n' +
'    fetch("/api/vitals", { body, method: "POST", keepalive: true });\n' +
'  }\n' +
'}\n' +
'\n' +
'onCLS(sendToAnalytics);\n' +
'onINP(sendToAnalytics);\n' +
'onLCP(sendToAnalytics);\n' +
'onFCP(sendToAnalytics);\n' +
'onTTFB(sendToAnalytics);\n' +
'\n' +
'// PerformanceObserver for custom metrics\n' +
'const observer = new PerformanceObserver((list) => {\n' +
'  for (const entry of list.getEntries()) {\n' +
'    if (entry.duration > 50) {  // Long tasks (>50ms block the main thread)\n' +
'      console.warn("Long task detected:", entry.name, entry.duration + "ms");\n' +
'    }\n' +
'  }\n' +
'});\n' +
'observer.observe({ entryTypes: ["longtask", "resource", "navigation"] });'
      }</code>
    </pre>

    {/* Section 2: Image Optimization */}
    <h2 style={{ fontSize: '1.75rem', fontWeight: '700', marginBottom: '16px', color: '#1e293b' }}>
      2. Image Optimization: WebP/AVIF, Lazy Loading, Responsive Images
    </h2>
    <p style={{ lineHeight: '1.8', color: '#374151', marginBottom: '16px' }}>
      Images typically account for 50–70% of a page's total weight. A thorough image optimization strategy combines modern formats, responsive sizing, and smart loading priorities. The gains are dramatic — converting a 500KB JPEG to AVIF often produces a 200KB file with identical visual quality.
    </p>

    <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '12px', color: '#1e293b' }}>
      Modern Image Formats Comparison
    </h3>
    <div style={{ overflowX: 'auto', marginBottom: '24px' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
        <thead>
          <tr style={{ background: '#1e293b', color: '#f1f5f9' }}>
            <th style={{ padding: '12px 16px', textAlign: 'left' }}>Format</th>
            <th style={{ padding: '12px 16px', textAlign: 'left' }}>Size vs JPEG</th>
            <th style={{ padding: '12px 16px', textAlign: 'left' }}>Browser Support</th>
            <th style={{ padding: '12px 16px', textAlign: 'left' }}>Best For</th>
            <th style={{ padding: '12px 16px', textAlign: 'left' }}>Transparency</th>
          </tr>
        </thead>
        <tbody>
          {[
            { fmt: 'JPEG', size: 'Baseline', support: '100%', best: 'Photos (legacy)', alpha: 'No' },
            { fmt: 'PNG', size: '+10-50%', support: '100%', best: 'Sharp-edge graphics', alpha: 'Yes' },
            { fmt: 'SVG', size: 'Vector', support: '99%', best: 'Icons, logos', alpha: 'Yes' },
            { fmt: 'WebP', size: '-25-35%', support: '97%', best: 'Photos + graphics', alpha: 'Yes' },
            { fmt: 'AVIF', size: '-40-55%', support: '96%', best: 'Best compression', alpha: 'Yes' },
          ].map((row, i) => (
            <tr key={i} style={{ background: i % 2 === 0 ? '#f8fafc' : '#ffffff', borderBottom: '1px solid #e2e8f0' }}>
              <td style={{ padding: '10px 16px', fontWeight: '600', color: '#1e293b' }}>{row.fmt}</td>
              <td style={{ padding: '10px 16px', color: '#374151' }}>{row.size}</td>
              <td style={{ padding: '10px 16px', color: '#374151' }}>{row.support}</td>
              <td style={{ padding: '10px 16px', color: '#374151' }}>{row.best}</td>
              <td style={{ padding: '10px 16px', color: '#374151' }}>{row.alpha}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '12px', color: '#1e293b' }}>
      Responsive Images with srcset and picture
    </h3>
    <pre style={{ background: '#0f172a', color: '#e2e8f0', borderRadius: '8px', padding: '20px', overflowX: 'auto', fontSize: '0.875rem', lineHeight: '1.7', marginBottom: '24px' }}>
      <code>{
'<!-- picture element: serve AVIF, fall back to WebP, fall back to JPEG -->\n' +
'<picture>\n' +
'  <source\n' +
'    srcset="/hero-400.avif 400w, /hero-800.avif 800w, /hero-1200.avif 1200w"\n' +
'    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 75vw, 1200px"\n' +
'    type="image/avif"\n' +
'  />\n' +
'  <source\n' +
'    srcset="/hero-400.webp 400w, /hero-800.webp 800w, /hero-1200.webp 1200w"\n' +
'    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 75vw, 1200px"\n' +
'    type="image/webp"\n' +
'  />\n' +
'  <img\n' +
'    src="/hero-1200.jpg"\n' +
'    srcset="/hero-400.jpg 400w, /hero-800.jpg 800w, /hero-1200.jpg 1200w"\n' +
'    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 75vw, 1200px"\n' +
'    width="1200"\n' +
'    height="600"\n' +
'    alt="Hero image description"\n' +
'    fetchpriority="high"\n' +
'    decoding="async"\n' +
'  />\n' +
'</picture>\n' +
'\n' +
'<!-- LCP image: preload in <head> -->\n' +
'<link\n' +
'  rel="preload"\n' +
'  as="image"\n' +
'  href="/hero-1200.avif"\n' +
'  imagesrcset="/hero-400.avif 400w, /hero-800.avif 800w, /hero-1200.avif 1200w"\n' +
'  imagesizes="(max-width: 640px) 100vw, 1200px"\n' +
'  fetchpriority="high"\n' +
'/>\n' +
'\n' +
'<!-- Below-fold images: lazy load -->\n' +
'<img\n' +
'  src="/below-fold.webp"\n' +
'  loading="lazy"\n' +
'  decoding="async"\n' +
'  width="800"\n' +
'  height="450"\n' +
'  alt="Below fold image"\n' +
'/>'
      }</code>
    </pre>

    <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '12px', color: '#1e293b' }}>
      Next.js Image Component (Recommended)
    </h3>
    <pre style={{ background: '#0f172a', color: '#e2e8f0', borderRadius: '8px', padding: '20px', overflowX: 'auto', fontSize: '0.875rem', lineHeight: '1.7', marginBottom: '24px' }}>
      <code>{
'import Image from "next/image";\n' +
'\n' +
'// LCP hero image — use priority prop, not loading="lazy"\n' +
'<Image\n' +
'  src="/hero.jpg"\n' +
'  alt="Hero banner"\n' +
'  width={1200}\n' +
'  height={600}\n' +
'  priority           // Preloads as high-priority\n' +
'  quality={85}       // Balance quality vs size (default 75)\n' +
'  placeholder="blur" // Blur-up placeholder\n' +
'  blurDataURL="data:image/jpeg;base64,/9j/4AAQ..."  // Tiny inline LQIP\n' +
'  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 75vw, 1200px"\n' +
'/>\n' +
'\n' +
'// Regular below-fold image\n' +
'<Image\n' +
'  src="/card.jpg"\n' +
'  alt="Card image"\n' +
'  width={400}\n' +
'  height={300}\n' +
'  // lazy loading is the default\n' +
'/>\n' +
'\n' +
'// next.config.js — allow remote image domains\n' +
'module.exports = {\n' +
'  images: {\n' +
'    formats: ["image/avif", "image/webp"],\n' +
'    remotePatterns: [\n' +
'      { protocol: "https", hostname: "cdn.example.com" },\n' +
'    ],\n' +
'    deviceSizes: [640, 750, 828, 1080, 1200, 1920],\n' +
'    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],\n' +
'  },\n' +
'};'
      }</code>
    </pre>

    {/* Section 3: JavaScript Optimization */}
    <h2 style={{ fontSize: '1.75rem', fontWeight: '700', marginBottom: '16px', color: '#1e293b' }}>
      3. JavaScript Optimization: Code Splitting, Tree Shaking, Bundle Analysis
    </h2>
    <p style={{ lineHeight: '1.8', color: '#374151', marginBottom: '16px' }}>
      JavaScript is the most expensive resource on the web — not just in bytes, but in parse, compile, and execution time. 300KB of compressed JavaScript takes significantly longer to process than 300KB of compressed images. The goal is to minimize the amount of JS that must be parsed before the page becomes interactive.
    </p>

    <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '12px', color: '#1e293b' }}>
      Code Splitting with Dynamic Imports
    </h3>
    <pre style={{ background: '#0f172a', color: '#e2e8f0', borderRadius: '8px', padding: '20px', overflowX: 'auto', fontSize: '0.875rem', lineHeight: '1.7', marginBottom: '24px' }}>
      <code>{
'// React.lazy for component-level code splitting\n' +
'import React, { Suspense, lazy } from "react";\n' +
'\n' +
'const HeavyChart = lazy(() => import("./HeavyChart"));\n' +
'const AdminPanel = lazy(() => import("./AdminPanel"));\n' +
'const MapComponent = lazy(() => import("./MapComponent"));\n' +
'\n' +
'function App({ isAdmin }) {\n' +
'  return (\n' +
'    <Suspense fallback={<div>Loading...</div>}>\n' +
'      <HeavyChart />\n' +
'      {isAdmin && <AdminPanel />}\n' +
'    </Suspense>\n' +
'  );\n' +
'}\n' +
'\n' +
'// Next.js dynamic imports with additional options\n' +
'import dynamic from "next/dynamic";\n' +
'\n' +
'const RichTextEditor = dynamic(() => import("./RichTextEditor"), {\n' +
'  loading: () => <p>Loading editor...</p>,\n' +
'  ssr: false,           // Skip server-side rendering\n' +
'});\n' +
'\n' +
'const HeavyMap = dynamic(() => import("./HeavyMap"), {\n' +
'  loading: () => <div style={{ height: 400, background: "#f0f0f0" }} />,\n' +
'  ssr: false,\n' +
'});\n' +
'\n' +
'// Preload a chunk when user hovers\n' +
'// Useful for improving perceived load time on navigation\n' +
'const preloadAdmin = () => import("./AdminPanel");\n' +
'\n' +
'<button\n' +
'  onMouseEnter={preloadAdmin}\n' +
'  onClick={() => setShowAdmin(true)}\n' +
'>\n' +
'  Open Admin\n' +
'</button>'
      }</code>
    </pre>

    <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '12px', color: '#1e293b' }}>
      Tree Shaking: Import Only What You Use
    </h3>
    <pre style={{ background: '#0f172a', color: '#e2e8f0', borderRadius: '8px', padding: '20px', overflowX: 'auto', fontSize: '0.875rem', lineHeight: '1.7', marginBottom: '24px' }}>
      <code>{
'// BAD: imports entire lodash bundle (~70KB gzipped)\n' +
'import _ from "lodash";\n' +
'_.debounce(fn, 300);\n' +
'_.cloneDeep(obj);\n' +
'\n' +
'// GOOD: named imports from ES modules — tree-shakeable\n' +
'import { debounce, cloneDeep } from "lodash-es";\n' +
'\n' +
'// BETTER: import single functions directly\n' +
'import debounce from "lodash/debounce";  // ~2KB\n' +
'import cloneDeep from "lodash/cloneDeep"; // ~5KB\n' +
'\n' +
'// BEST: use native browser APIs or tiny utilities\n' +
'const debounce = (fn, delay) => {\n' +
'  let timer;\n' +
'  return (...args) => {\n' +
'    clearTimeout(timer);\n' +
'    timer = setTimeout(() => fn(...args), delay);\n' +
'  };\n' +
'};\n' +
'\n' +
'// Analyze your bundle with:\n' +
'// npx next build && npx next-bundle-analyzer\n' +
'// Or: npx vite-bundle-visualizer\n' +
'// Or: npx webpack-bundle-analyzer stats.json\n' +
'\n' +
'// Enable bundle analysis in Next.js:\n' +
'// npm install @next/bundle-analyzer\n' +
'const withBundleAnalyzer = require("@next/bundle-analyzer")({\n' +
'  enabled: process.env.ANALYZE === "true",\n' +
'});\n' +
'module.exports = withBundleAnalyzer({});'
      }</code>
    </pre>

    {/* Section 4: CSS Optimization */}
    <h2 style={{ fontSize: '1.75rem', fontWeight: '700', marginBottom: '16px', color: '#1e293b' }}>
      4. CSS Optimization: Critical CSS, Unused CSS, Containment
    </h2>
    <p style={{ lineHeight: '1.8', color: '#374151', marginBottom: '16px' }}>
      CSS is render-blocking by default — the browser cannot render any content until all CSS in the document is downloaded and parsed. Inlining critical CSS eliminates this render-blocking bottleneck for above-the-fold content.
    </p>
    <pre style={{ background: '#0f172a', color: '#e2e8f0', borderRadius: '8px', padding: '20px', overflowX: 'auto', fontSize: '0.875rem', lineHeight: '1.7', marginBottom: '24px' }}>
      <code>{
'/* Critical CSS technique: inline above-fold styles */\n' +
'/* In your HTML <head>: */\n' +
'<style>\n' +
'  /* Only the styles needed for above-fold content */\n' +
'  body { margin: 0; font-family: system-ui, sans-serif; }\n' +
'  header { display: flex; padding: 16px; }\n' +
'  .hero { min-height: 100svh; display: grid; place-items: center; }\n' +
'</style>\n' +
'\n' +
'/* Load non-critical CSS asynchronously */\n' +
'<link\n' +
'  rel="stylesheet"\n' +
'  href="/styles/non-critical.css"\n' +
'  media="print"\n' +
'  onload="this.media=\'all\'"\n' +
'/>\n' +
'<noscript><link rel="stylesheet" href="/styles/non-critical.css" /></noscript>\n' +
'\n' +
'/* CSS Containment — isolate layout/style changes */\n' +
'.widget {\n' +
'  contain: layout style;   /* Optimizes browser rendering pipeline */\n' +
'}\n' +
'\n' +
'.infinite-scroll-item {\n' +
'  contain: strict;         /* layout + style + size + paint */\n' +
'  content-visibility: auto; /* Skip rendering off-screen items */\n' +
'  contain-intrinsic-size: 200px; /* Reserve space to avoid CLS */\n' +
'}\n' +
'\n' +
'/* Remove unused CSS */\n' +
'/* Tools: PurgeCSS, UnCSS, Tailwind built-in purge */\n' +
'/* postcss.config.js */\n' +
'module.exports = {\n' +
'  plugins: [\n' +
'    require("@fullhuman/postcss-purgecss")({\n' +
'      content: ["./src/**/*.{html,js,ts,tsx}"],\n' +
'      defaultExtractor: (content) => content.match(/[\\w-/:]+(?<!:)/g) || [],\n' +
'    }),\n' +
'    require("cssnano")({ preset: "default" }),\n' +
'  ],\n' +
'};'
      }</code>
    </pre>

    {/* Section 5: Caching Strategies */}
    <h2 style={{ fontSize: '1.75rem', fontWeight: '700', marginBottom: '16px', color: '#1e293b' }}>
      5. Caching Strategies: Browser Cache, CDN, Service Worker, HTTP Headers
    </h2>
    <p style={{ lineHeight: '1.8', color: '#374151', marginBottom: '16px' }}>
      Caching is the most impactful server-side performance optimization. A cached response requires zero compute, zero database queries, and minimal bandwidth. A comprehensive caching strategy layers browser cache, CDN cache, and service worker cache.
    </p>

    <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '12px', color: '#1e293b' }}>
      HTTP Cache-Control Headers Cheat Sheet
    </h3>
    <pre style={{ background: '#0f172a', color: '#e2e8f0', borderRadius: '8px', padding: '20px', overflowX: 'auto', fontSize: '0.875rem', lineHeight: '1.7', marginBottom: '24px' }}>
      <code>{
'# Static assets with content hash in filename (e.g., app.abc123.js)\n' +
'Cache-Control: public, max-age=31536000, immutable\n' +
'# Browser and CDN cache for 1 year, never revalidate\n' +
'\n' +
'# HTML pages — fast delivery with background revalidation\n' +
'Cache-Control: public, max-age=0, s-maxage=3600, stale-while-revalidate=86400\n' +
'# CDN caches for 1h; serve stale for up to 24h while revalidating in background\n' +
'\n' +
'# API responses — user-specific\n' +
'Cache-Control: private, max-age=60\n' +
'# Browser caches 60s; CDN must NOT cache (private)\n' +
'\n' +
'# Real-time data (prices, stock, scores)\n' +
'Cache-Control: no-cache, no-store\n' +
'# Never cache anywhere\n' +
'\n' +
'# Authenticated pages\n' +
'Cache-Control: private, no-store\n' +
'Vary: Cookie, Authorization\n' +
'\n' +
'# Setting headers in Next.js (next.config.js)\n' +
'module.exports = {\n' +
'  async headers() {\n' +
'    return [\n' +
'      {\n' +
'        source: "/_next/static/(.*)",\n' +
'        headers: [\n' +
'          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },\n' +
'        ],\n' +
'      },\n' +
'      {\n' +
'        source: "/api/(.*)",\n' +
'        headers: [\n' +
'          { key: "Cache-Control", value: "private, max-age=60" },\n' +
'        ],\n' +
'      },\n' +
'    ];\n' +
'  },\n' +
'};'
      }</code>
    </pre>

    <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '12px', color: '#1e293b' }}>
      Service Worker Caching Strategies
    </h3>
    <pre style={{ background: '#0f172a', color: '#e2e8f0', borderRadius: '8px', padding: '20px', overflowX: 'auto', fontSize: '0.875rem', lineHeight: '1.7', marginBottom: '24px' }}>
      <code>{
'// service-worker.js — using Workbox strategies\n' +
'import { registerRoute } from "workbox-routing";\n' +
'import { CacheFirst, NetworkFirst, StaleWhileRevalidate } from "workbox-strategies";\n' +
'import { ExpirationPlugin } from "workbox-expiration";\n' +
'\n' +
'// Cache First: static assets (CSS, JS, fonts)\n' +
'// Fastest — serve from cache; update in background\n' +
'registerRoute(\n' +
'  ({ request }) => request.destination === "style" || request.destination === "script",\n' +
'  new CacheFirst({\n' +
'    cacheName: "static-assets",\n' +
'    plugins: [new ExpirationPlugin({ maxEntries: 50, maxAgeSeconds: 30 * 24 * 60 * 60 })],\n' +
'  })\n' +
');\n' +
'\n' +
'// Network First: API data\n' +
'// Always try network; fall back to cache if offline\n' +
'registerRoute(\n' +
'  ({ url }) => url.pathname.startsWith("/api/"),\n' +
'  new NetworkFirst({\n' +
'    cacheName: "api-cache",\n' +
'    plugins: [new ExpirationPlugin({ maxEntries: 100, maxAgeSeconds: 5 * 60 })],\n' +
'  })\n' +
');\n' +
'\n' +
'// Stale While Revalidate: HTML pages, blog posts\n' +
'// Serve from cache immediately; update in background\n' +
'registerRoute(\n' +
'  ({ request }) => request.mode === "navigate",\n' +
'  new StaleWhileRevalidate({\n' +
'    cacheName: "pages-cache",\n' +
'    plugins: [new ExpirationPlugin({ maxEntries: 50 })],\n' +
'  })\n' +
');'
      }</code>
    </pre>

    {/* Section 6: Font Optimization */}
    <h2 style={{ fontSize: '1.75rem', fontWeight: '700', marginBottom: '16px', color: '#1e293b' }}>
      6. Font Optimization: font-display, Preload, Subsetting, Variable Fonts
    </h2>
    <p style={{ lineHeight: '1.8', color: '#374151', marginBottom: '16px' }}>
      Custom fonts can cause Flash of Invisible Text (FOIT) or Flash of Unstyled Text (FOUT), both of which hurt CLS and perceived performance. The right font loading strategy eliminates these issues while keeping download sizes small.
    </p>
    <pre style={{ background: '#0f172a', color: '#e2e8f0', borderRadius: '8px', padding: '20px', overflowX: 'auto', fontSize: '0.875rem', lineHeight: '1.7', marginBottom: '24px' }}>
      <code>{
'/* 1. Self-host fonts and use font-display: swap */\n' +
'@font-face {\n' +
'  font-family: "Inter";\n' +
'  src:\n' +
'    url("/fonts/inter-var.woff2") format("woff2-variations"),\n' +
'    url("/fonts/inter-var.woff2") format("woff2");\n' +
'  font-weight: 100 900;       /* Variable font weight range */\n' +
'  font-style: normal;\n' +
'  font-display: swap;         /* Show fallback immediately */\n' +
'  unicode-range: U+0000-00FF; /* Only Latin characters (subsetting) */\n' +
'}\n' +
'\n' +
'/* 2. Match fallback font metrics to reduce CLS on font swap */\n' +
'@font-face {\n' +
'  font-family: "Inter-Fallback";\n' +
'  src: local("Arial");\n' +
'  ascent-override: 90%;       /* Adjust to match Inter metrics */\n' +
'  descent-override: 22.4%;\n' +
'  line-gap-override: 0%;\n' +
'  size-adjust: 107.5%;        /* Scale to match Inter\'s x-height */\n' +
'}\n' +
'\n' +
'body {\n' +
'  font-family: "Inter", "Inter-Fallback", system-ui, sans-serif;\n' +
'}\n' +
'\n' +
'/* 3. Preload critical font files in <head> */\n' +
'<link\n' +
'  rel="preload"\n' +
'  href="/fonts/inter-var.woff2"\n' +
'  as="font"\n' +
'  type="font/woff2"\n' +
'  crossorigin\n' +
'/>\n' +
'\n' +
'/* 4. Next.js built-in font optimization */\n' +
'import { Inter, Roboto_Mono } from "next/font/google";\n' +
'\n' +
'const inter = Inter({\n' +
'  subsets: ["latin"],\n' +
'  display: "swap",\n' +
'  variable: "--font-inter",\n' +
'  preload: true,\n' +
'});\n' +
'\n' +
'// Next.js automatically: self-hosts, subsets, and inlines preload hints\n' +
'export default function Layout({ children }) {\n' +
'  return <html className={inter.variable}>{children}</html>;\n' +
'}'
      }</code>
    </pre>

    {/* Section 7: Resource Hints */}
    <h2 style={{ fontSize: '1.75rem', fontWeight: '700', marginBottom: '16px', color: '#1e293b' }}>
      7. Resource Hints: preload, prefetch, preconnect, dns-prefetch
    </h2>
    <p style={{ lineHeight: '1.8', color: '#374151', marginBottom: '16px' }}>
      Resource hints tell the browser about resources it will need, allowing it to start network work early. Used correctly they dramatically reduce perceived load time; used incorrectly they waste bandwidth and delay other critical resources.
    </p>
    <pre style={{ background: '#0f172a', color: '#e2e8f0', borderRadius: '8px', padding: '20px', overflowX: 'auto', fontSize: '0.875rem', lineHeight: '1.7', marginBottom: '24px' }}>
      <code>{
'<head>\n' +
'  <!-- preconnect: establish TCP+TLS connection to critical 3rd-party origins -->\n' +
'  <!-- Use for origins you will load resources from on THIS page -->\n' +
'  <link rel="preconnect" href="https://fonts.googleapis.com" />\n' +
'  <link rel="preconnect" href="https://cdn.example.com" crossorigin />\n' +
'\n' +
'  <!-- dns-prefetch: only DNS resolution, lower priority -->\n' +
'  <!-- Use for origins you might use (analytics, ad networks) -->\n' +
'  <link rel="dns-prefetch" href="https://analytics.example.com" />\n' +
'\n' +
'  <!-- preload: fetch a critical resource ASAP, needed for current page -->\n' +
'  <!-- Must specify "as" attribute; browser will error without it -->\n' +
'  <link rel="preload" href="/fonts/inter.woff2" as="font" type="font/woff2" crossorigin />\n' +
'  <link rel="preload" href="/hero.avif" as="image" fetchpriority="high" />\n' +
'  <link rel="preload" href="/styles/critical.css" as="style" />\n' +
'\n' +
'  <!-- prefetch: fetch a resource that will be needed on NEXT navigation -->\n' +
'  <!-- Low priority; downloaded during idle time -->\n' +
'  <link rel="prefetch" href="/next-page.js" />\n' +
'  <link rel="prefetch" href="/next-page-hero.avif" />\n' +
'\n' +
'  <!-- modulepreload: preload an ES module and its dependencies -->\n' +
'  <link rel="modulepreload" href="/app.mjs" />\n' +
'</head>\n' +
'\n' +
'<!-- Resource Hint Strategy Guide:\n' +
'     preconnect  -> 3rd-party domains used on this page (limit to 2-3)\n' +
'     dns-prefetch -> 3rd-party domains that might be used\n' +
'     preload     -> LCP image, critical fonts, critical CSS/JS\n' +
'     prefetch    -> Resources needed on the next likely page\n' +
'     AVOID: preloading resources that are not used = wasted bandwidth -->'
      }</code>
    </pre>

    {/* Section 8: Server-Side Performance */}
    <h2 style={{ fontSize: '1.75rem', fontWeight: '700', marginBottom: '16px', color: '#1e293b' }}>
      8. Server-Side Performance: Brotli/gzip, HTTP/2, HTTP/3, Edge Computing
    </h2>
    <p style={{ lineHeight: '1.8', color: '#374151', marginBottom: '16px' }}>
      TTFB (Time to First Byte) directly impacts LCP. Every millisecond of server response time is milliseconds added to LCP. Server-side optimizations target TTFB by reducing compute time, reducing transfer size, and moving computation closer to the user.
    </p>
    <pre style={{ background: '#0f172a', color: '#e2e8f0', borderRadius: '8px', padding: '20px', overflowX: 'auto', fontSize: '0.875rem', lineHeight: '1.7', marginBottom: '24px' }}>
      <code>{
'# Nginx: enable Brotli and gzip compression\n' +
'# Brotli compresses ~20% better than gzip\n' +
'\n' +
'# nginx.conf\n' +
'http {\n' +
'  # Brotli (install nginx-module-brotli)\n' +
'  brotli on;\n' +
'  brotli_comp_level 6;\n' +
'  brotli_types\n' +
'    text/html text/css text/javascript application/javascript\n' +
'    application/json image/svg+xml font/woff2;\n' +
'\n' +
'  # Gzip fallback\n' +
'  gzip on;\n' +
'  gzip_comp_level 6;\n' +
'  gzip_vary on;\n' +
'  gzip_min_length 256;\n' +
'  gzip_types\n' +
'    text/html text/css application/javascript application/json\n' +
'    image/svg+xml font/woff font/woff2;\n' +
'\n' +
'  # Enable HTTP/2 (requires SSL)\n' +
'  server {\n' +
'    listen 443 ssl;\n' +
'    http2 on;         # Nginx 1.25+ syntax\n' +
'    # listen 443 ssl http2;  # Older Nginx syntax\n' +
'\n' +
'    # HTTP/3 / QUIC\n' +
'    listen 443 quic reuseport;\n' +
'    add_header Alt-Svc \'h3=":443"; ma=86400\';\n' +
'\n' +
'    # Push critical resources (HTTP/2 Server Push)\n' +
'    # Note: HTTP/2 push is deprecated in favor of preload hints\n' +
'  }\n' +
'}\n' +
'\n' +
'# Edge computing with Vercel Edge Functions\n' +
'// middleware.ts (Next.js)\n' +
'import { NextResponse } from "next/server";\n' +
'export const runtime = "edge";\n' +
'\n' +
'export function middleware(request) {\n' +
'  // Runs at the CDN edge — ~5ms latency globally\n' +
'  const country = request.geo?.country || "US";\n' +
'  const response = NextResponse.next();\n' +
'  response.headers.set("x-user-country", country);\n' +
'  return response;\n' +
'}'
      }</code>
    </pre>

    {/* Section 9: Database Query Optimization */}
    <h2 style={{ fontSize: '1.75rem', fontWeight: '700', marginBottom: '16px', color: '#1e293b' }}>
      9. Database Query Optimization: N+1 Problem, Indexes, Query Caching
    </h2>
    <p style={{ lineHeight: '1.8', color: '#374151', marginBottom: '16px' }}>
      Database query performance directly determines API response time and TTFB. The N+1 query problem is the most common performance killer — it occurs when fetching a list of N items triggers N additional database queries (one per item), turning one logical operation into hundreds of round trips.
    </p>
    <pre style={{ background: '#0f172a', color: '#e2e8f0', borderRadius: '8px', padding: '20px', overflowX: 'auto', fontSize: '0.875rem', lineHeight: '1.7', marginBottom: '24px' }}>
      <code>{
'// N+1 Problem (BAD): 1 query for posts + N queries for each author\n' +
'const posts = await db.post.findMany();  // 1 query\n' +
'for (const post of posts) {\n' +
'  post.author = await db.user.findUnique({ where: { id: post.authorId } }); // N queries!\n' +
'}\n' +
'\n' +
'// Solution: Use include/join to fetch all data in one query\n' +
'const posts = await db.post.findMany({\n' +
'  include: { author: true, tags: true, _count: { select: { comments: true } } },\n' +
'  where: { published: true },\n' +
'  orderBy: { createdAt: "desc" },\n' +
'  take: 20,\n' +
'  skip: (page - 1) * 20,\n' +
'});\n' +
'\n' +
'// Database indexes: add for fields used in WHERE/ORDER BY/JOIN\n' +
'-- PostgreSQL: create index concurrently (no table lock)\n' +
'CREATE INDEX CONCURRENTLY idx_posts_published_created\n' +
'  ON posts (published, created_at DESC)\n' +
'  WHERE published = true;\n' +
'\n' +
'-- Composite index for multi-column queries\n' +
'CREATE INDEX CONCURRENTLY idx_users_email_status\n' +
'  ON users (email, status);\n' +
'\n' +
'-- Prisma schema index definition\n' +
'model Post {\n' +
'  id        Int      @id\n' +
'  published Boolean\n' +
'  createdAt DateTime\n' +
'\n' +
'  @@index([published, createdAt(sort: Desc)])\n' +
'}\n' +
'\n' +
'// Query result caching with Redis\n' +
'import { createClient } from "redis";\n' +
'const redis = createClient();\n' +
'\n' +
'async function getCachedPosts(page) {\n' +
'  const key = "posts:page:" + page;\n' +
'  const cached = await redis.get(key);\n' +
'  if (cached) return JSON.parse(cached);\n' +
'\n' +
'  const posts = await db.post.findMany({ take: 20, skip: page * 20 });\n' +
'  await redis.setEx(key, 300, JSON.stringify(posts)); // Cache 5 minutes\n' +
'  return posts;\n' +
'}'
      }</code>
    </pre>

    {/* Section 10: Lighthouse Scoring */}
    <h2 style={{ fontSize: '1.75rem', fontWeight: '700', marginBottom: '16px', color: '#1e293b' }}>
      10. Lighthouse Scoring: How It Works and Key Improvement Strategies
    </h2>
    <p style={{ lineHeight: '1.8', color: '#374151', marginBottom: '16px' }}>
      Lighthouse is Google's open-source tool for measuring web page quality. It runs a series of audits in a simulated mobile environment and produces weighted scores for Performance, Accessibility, Best Practices, and SEO.
    </p>
    <pre style={{ background: '#0f172a', color: '#e2e8f0', borderRadius: '8px', padding: '20px', overflowX: 'auto', fontSize: '0.875rem', lineHeight: '1.7', marginBottom: '24px' }}>
      <code>{
'Lighthouse Performance Score Weights (approximate):\n' +
'\n' +
'Metric                    Weight    Target     Impact\n' +
'------                    ------    ------     ------\n' +
'LCP (Largest CP)          25%       < 2.5s     Loading\n' +
'TBT (Total Blocking)      30%       < 200ms    Interactivity\n' +
'CLS (Layout Shift)        15%       < 0.1      Stability\n' +
'FCP (First CP)            10%       < 1.8s     Loading\n' +
'SI  (Speed Index)         10%       < 3.4s     Visual progress\n' +
'TTI (Time to Interactive) 10%       < 3.8s     Interactivity\n' +
'\n' +
'Note: TBT (lab metric) correlates with INP (field metric)\n' +
'Reducing TBT in Lighthouse = reducing INP for real users\n' +
'\n' +
'Common Lighthouse Quick Wins by Score Impact:\n' +
'\n' +
'Issue                          Potential Gain    Fix\n' +
'-----                          --------------    ---\n' +
'Render-blocking resources      5-30 points       Defer CSS/JS\n' +
'Oversized images               5-25 points       Resize + compress\n' +
'Unused JavaScript              5-20 points       Tree shake, split\n' +
'Unused CSS                     5-15 points       PurgeCSS\n' +
'Missing image dimensions       5-10 points       Add width/height\n' +
'No text compression            5-10 points       Enable Brotli\n' +
'Inefficient cache policy       3-10 points       Set Cache-Control\n' +
'No lazy loading                3-8 points        loading="lazy"\n' +
'Multiple page redirects        2-5 points        Reduce redirects'
      }</code>
    </pre>

    {/* Section 11: Performance Budgets and Monitoring */}
    <h2 style={{ fontSize: '1.75rem', fontWeight: '700', marginBottom: '16px', color: '#1e293b' }}>
      11. Performance Budgets and Monitoring: Lighthouse CI, web-vitals JS
    </h2>
    <p style={{ lineHeight: '1.8', color: '#374151', marginBottom: '16px' }}>
      Performance budgets define upper limits for page weight, load time, and Lighthouse scores. Enforcing budgets in CI prevents performance regression — a pull request that adds a heavy dependency or forgets to optimize an image will fail the build before it reaches production.
    </p>
    <pre style={{ background: '#0f172a', color: '#e2e8f0', borderRadius: '8px', padding: '20px', overflowX: 'auto', fontSize: '0.875rem', lineHeight: '1.7', marginBottom: '24px' }}>
      <code>{
'# .lighthouserc.json — Lighthouse CI configuration\n' +
'{\n' +
'  "ci": {\n' +
'    "collect": {\n' +
'      "numberOfRuns": 3,\n' +
'      "url": ["http://localhost:3000/", "http://localhost:3000/blog"]\n' +
'    },\n' +
'    "assert": {\n' +
'      "assertions": {\n' +
'        "categories:performance": ["error", { "minScore": 0.9 }],\n' +
'        "categories:accessibility": ["error", { "minScore": 0.9 }],\n' +
'        "first-contentful-paint": ["error", { "maxNumericValue": 1800 }],\n' +
'        "largest-contentful-paint": ["error", { "maxNumericValue": 2500 }],\n' +
'        "total-blocking-time": ["error", { "maxNumericValue": 200 }],\n' +
'        "cumulative-layout-shift": ["error", { "maxNumericValue": 0.1 }],\n' +
'        "uses-optimized-images": "error",\n' +
'        "uses-webp-images": "warn",\n' +
'        "uses-text-compression": "error",\n' +
'        "uses-rel-preconnect": "warn"\n' +
'      }\n' +
'    },\n' +
'    "upload": {\n' +
'      "target": "temporary-public-storage"\n' +
'    }\n' +
'  }\n' +
'}\n' +
'\n' +
'# GitHub Actions workflow for Lighthouse CI\n' +
'# .github/workflows/lighthouse.yml\n' +
'name: Lighthouse CI\n' +
'on: [push, pull_request]\n' +
'jobs:\n' +
'  lighthouse:\n' +
'    runs-on: ubuntu-latest\n' +
'    steps:\n' +
'      - uses: actions/checkout@v4\n' +
'      - uses: actions/setup-node@v4\n' +
'      - run: npm ci && npm run build\n' +
'      - run: npm run start &\n' +
'      - run: npx @lhci/cli@0.14.x autorun\n' +
'        env:\n' +
'          LHCI_GITHUB_APP_TOKEN: ${{ secrets.LHCI_GITHUB_APP_TOKEN }}'
      }</code>
    </pre>

    {/* Section 12: React/Next.js Specific */}
    <h2 style={{ fontSize: '1.75rem', fontWeight: '700', marginBottom: '16px', color: '#1e293b' }}>
      12. React and Next.js Performance: React.memo, useMemo, Server Components, ISR
    </h2>
    <p style={{ lineHeight: '1.8', color: '#374151', marginBottom: '16px' }}>
      React's rendering model introduces unique performance challenges. Unnecessary re-renders, expensive computations on every render, and hydration costs all hurt INP and TTI. React 18 and Next.js 13+ introduce powerful primitives that solve these problems at an architectural level.
    </p>
    <pre style={{ background: '#0f172a', color: '#e2e8f0', borderRadius: '8px', padding: '20px', overflowX: 'auto', fontSize: '0.875rem', lineHeight: '1.7', marginBottom: '24px' }}>
      <code>{
'// React.memo: prevent re-renders when props have not changed\n' +
'const ExpensiveList = React.memo(function ExpensiveList({ items, onSelect }) {\n' +
'  return (\n' +
'    <ul>\n' +
'      {items.map(item => <li key={item.id} onClick={() => onSelect(item)}>{item.name}</li>)}\n' +
'    </ul>\n' +
'  );\n' +
'}, (prevProps, nextProps) => {\n' +
'  // Custom comparison: only re-render if items array reference changed\n' +
'  return prevProps.items === nextProps.items;\n' +
'});\n' +
'\n' +
'// useMemo: memoize expensive computations\n' +
'function Dashboard({ data }) {\n' +
'  // Re-computed only when data changes, not on every render\n' +
'  const processedData = useMemo(() => {\n' +
'    return data\n' +
'      .filter(item => item.active)\n' +
'      .sort((a, b) => b.score - a.score)\n' +
'      .slice(0, 100);\n' +
'  }, [data]);\n' +
'\n' +
'  // useCallback: stable function reference for child components\n' +
'  const handleSelect = useCallback((id) => {\n' +
'    setSelected(prev => new Set([...prev, id]));\n' +
'  }, []); // Empty deps = stable reference forever\n' +
'\n' +
'  return <ExpensiveList items={processedData} onSelect={handleSelect} />;\n' +
'}\n' +
'\n' +
'// React Server Components: zero JavaScript sent to client\n' +
'// app/blog/page.tsx — Server Component (default in Next.js App Router)\n' +
'async function BlogPage() {\n' +
'  // Runs only on server — no hydration overhead\n' +
'  const posts = await db.post.findMany({ orderBy: { createdAt: "desc" } });\n' +
'\n' +
'  return (\n' +
'    <main>\n' +
'      {posts.map(post => <BlogCard key={post.id} post={post} />)}\n' +
'    </main>\n' +
'  );\n' +
'}\n' +
'\n' +
'// ISR: Incremental Static Regeneration\n' +
'// Statically generate + revalidate in background\n' +
'export const revalidate = 3600; // Revalidate every hour\n' +
'\n' +
'// Or per-fetch revalidation:\n' +
'const data = await fetch("https://api.example.com/data", {\n' +
'  next: { revalidate: 60 },   // Cache for 60 seconds\n' +
'});\n' +
'\n' +
'// On-demand revalidation:\n' +
'// POST /api/revalidate\n' +
'import { revalidatePath, revalidateTag } from "next/cache";\n' +
'revalidatePath("/blog");      // Revalidate specific path\n' +
'revalidateTag("blog-posts");  // Revalidate by cache tag'
      }</code>
    </pre>

    {/* Section 13: Tools Comparison */}
    <h2 style={{ fontSize: '1.75rem', fontWeight: '700', marginBottom: '16px', color: '#1e293b' }}>
      13. Tools Comparison: Lighthouse vs WebPageTest vs GTmetrix
    </h2>
    <p style={{ lineHeight: '1.8', color: '#374151', marginBottom: '16px' }}>
      No single tool gives a complete picture of performance. Use Lighthouse for developer feedback loops, WebPageTest for detailed technical analysis, and real user monitoring (RUM) for production truth.
    </p>
    <div style={{ overflowX: 'auto', marginBottom: '24px' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
        <thead>
          <tr style={{ background: '#1e293b', color: '#f1f5f9' }}>
            <th style={{ padding: '12px 16px', textAlign: 'left' }}>Tool</th>
            <th style={{ padding: '12px 16px', textAlign: 'left' }}>Type</th>
            <th style={{ padding: '12px 16px', textAlign: 'left' }}>Best For</th>
            <th style={{ padding: '12px 16px', textAlign: 'left' }}>Limitations</th>
            <th style={{ padding: '12px 16px', textAlign: 'left' }}>Cost</th>
          </tr>
        </thead>
        <tbody>
          {[
            { tool: 'Lighthouse', type: 'Lab (synthetic)', best: 'CI/CD, dev feedback, quick audits', limit: 'Simulated throttling, no real users', cost: 'Free' },
            { tool: 'PageSpeed Insights', type: 'Lab + Field (CrUX)', best: 'See real user CrUX data alongside lab', limit: 'Only Google data, no waterfall', cost: 'Free' },
            { tool: 'WebPageTest', type: 'Lab (advanced)', best: 'Waterfall analysis, video, real devices', limit: 'Complex UI, no CI integration built-in', cost: 'Free/Paid' },
            { tool: 'GTmetrix', type: 'Lab (synthetic)', best: 'Reports, historical tracking', limit: 'Less detail than WebPageTest', cost: 'Free/Paid' },
            { tool: 'Chrome UX Report', type: 'Field (real users)', best: 'Real-world Core Web Vitals by URL', limit: '28-day aggregated, no page details', cost: 'Free' },
            { tool: 'Vercel Speed Insights', type: 'Field (RUM)', best: 'Real-time monitoring on Vercel', limit: 'Vercel-only, limited free tier', cost: 'Free/Paid' },
            { tool: 'Datadog RUM', type: 'Field (RUM)', best: 'Production monitoring at scale', limit: 'Requires SDK, costs scale with traffic', cost: 'Paid' },
          ].map((row, i) => (
            <tr key={i} style={{ background: i % 2 === 0 ? '#f8fafc' : '#ffffff', borderBottom: '1px solid #e2e8f0' }}>
              <td style={{ padding: '10px 16px', fontWeight: '600', color: '#1e293b' }}>{row.tool}</td>
              <td style={{ padding: '10px 16px', color: '#374151' }}>{row.type}</td>
              <td style={{ padding: '10px 16px', color: '#374151' }}>{row.best}</td>
              <td style={{ padding: '10px 16px', color: '#374151' }}>{row.limit}</td>
              <td style={{ padding: '10px 16px', color: '#374151' }}>{row.cost}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    {/* Section 14: Quick Wins Summary */}
    <h2 style={{ fontSize: '1.75rem', fontWeight: '700', marginBottom: '16px', color: '#1e293b' }}>
      14. Performance Quick Wins Checklist
    </h2>
    <p style={{ lineHeight: '1.8', color: '#374151', marginBottom: '16px' }}>
      If you are starting from scratch, implement these in order of impact. Each item is achievable in under a day and produces measurable results.
    </p>
    <pre style={{ background: '#0f172a', color: '#e2e8f0', borderRadius: '8px', padding: '20px', overflowX: 'auto', fontSize: '0.875rem', lineHeight: '1.7', marginBottom: '24px' }}>
      <code>{
'Performance Quick Wins — Ordered by Impact:\n' +
'\n' +
'Images (highest impact):\n' +
'  [x] Convert images to WebP or AVIF format\n' +
'  [x] Add srcset + sizes for responsive images\n' +
'  [x] Set width and height on all img elements\n' +
'  [x] Add loading="lazy" to below-fold images\n' +
'  [x] Preload LCP image with fetchpriority="high"\n' +
'  [x] Serve images from a CDN\n' +
'\n' +
'JavaScript:\n' +
'  [x] Enable code splitting (dynamic imports)\n' +
'  [x] Remove unused dependencies (tree shaking)\n' +
'  [x] Defer non-critical scripts (<script defer>)\n' +
'  [x] Analyze bundle with @next/bundle-analyzer\n' +
'\n' +
'Server:\n' +
'  [x] Enable Brotli compression (20% smaller than gzip)\n' +
'  [x] Set proper Cache-Control headers\n' +
'  [x] Enable HTTP/2 or HTTP/3\n' +
'  [x] Use a CDN for global edge delivery\n' +
'\n' +
'CSS & Fonts:\n' +
'  [x] Inline critical CSS for above-fold content\n' +
'  [x] Add font-display: swap to @font-face\n' +
'  [x] Preload critical fonts\n' +
'  [x] Remove unused CSS with PurgeCSS\n' +
'\n' +
'Miscellaneous:\n' +
'  [x] Add preconnect for critical 3rd-party origins\n' +
'  [x] Minimize DOM size (target < 1500 nodes)\n' +
'  [x] Reduce third-party scripts\n' +
'  [x] Set up Lighthouse CI to prevent regression\n' +
'  [x] Measure real users with web-vitals JS'
      }</code>
    </pre>

    {/* FAQ Section */}
    <h2 style={{ fontSize: '1.75rem', fontWeight: '700', marginBottom: '24px', color: '#1e293b' }}>
      Frequently Asked Questions
    </h2>

    {[
      {
        q: 'What are Core Web Vitals and why do they matter for SEO?',
        a: 'Core Web Vitals are three user-experience metrics Google uses as ranking signals: LCP (loading speed), INP (responsiveness), and CLS (visual stability). Pages in the "Good" threshold for all three get a ranking boost in the Page Experience system. While content quality remains the primary ranking factor, Core Web Vitals serve as a tiebreaker between pages of similar quality. Good thresholds: LCP < 2.5s, INP < 200ms, CLS < 0.1.',
      },
      {
        q: 'What is the fastest way to improve Largest Contentful Paint (LCP)?',
        a: 'The fastest LCP wins: (1) preload the LCP image with <link rel="preload" fetchpriority="high">, (2) convert images to WebP or AVIF, (3) serve from a CDN, (4) eliminate render-blocking scripts and stylesheets, (5) enable server-side caching to reduce TTFB. A single change — adding fetchpriority="high" to the hero image — often improves LCP by 200–500ms immediately.',
      },
      {
        q: 'How do I fix Cumulative Layout Shift (CLS)?',
        a: 'Fix CLS by: always setting width and height attributes on images and videos, using aspect-ratio CSS for responsive media, reserving space for ads and embeds with min-height, using font-display: swap with size-adjust to minimize font swap shifts, and avoiding dynamically inserting content above existing content. Transform and opacity animations do not cause layout shifts — use them instead of animating top/left/width/height.',
      },
      {
        q: 'What is the difference between browser cache, CDN cache, and service worker cache?',
        a: 'Browser cache: stored on the user\'s device, controlled by Cache-Control headers — reduces repeat visit load times. CDN cache: stored on geographically distributed edge servers, controlled by s-maxage and CDN settings — reduces TTFB globally. Service worker cache: programmable JavaScript storage in the browser — enables offline support, custom caching logic, and background sync. Best practice: use all three in combination for maximum resilience and speed.',
      },
      {
        q: 'Should I use WebP or AVIF for images?',
        a: 'Use both. AVIF compresses ~50% better than JPEG and ~20% better than WebP, with 96% browser support. WebP compresses ~30% better than JPEG with 97% support. Use the <picture> element to serve AVIF first, then WebP as fallback, then JPEG for maximum browser compatibility. Next.js Image component handles this automatically when you set formats: ["image/avif", "image/webp"] in next.config.js.',
      },
      {
        q: 'What is a good Lighthouse performance score?',
        a: 'A score of 90+ is "Good" (green), 50–89 "Needs Improvement" (orange), below 50 "Poor" (red). However, Lighthouse runs in a simulated throttled environment and can vary 5–10 points between runs. Prioritize real-user field data from Chrome UX Report and web-vitals.js over lab scores. A page can score 95 on Lighthouse but still fail Core Web Vitals in the field if real users have slow devices or connections.',
      },
      {
        q: 'How does code splitting improve JavaScript performance?',
        a: 'Code splitting divides your JavaScript bundle into smaller chunks loaded on demand. Instead of parsing and compiling all JS upfront, users download only what the current page needs. React.lazy() enables component-level splitting, and Next.js automatically splits by route. The goal is an initial JS payload under 150KB compressed. Every additional 100KB of unneeded JavaScript adds ~0.5s to Time to Interactive on mid-range Android devices.',
      },
      {
        q: 'What is stale-while-revalidate and when should I use it?',
        a: 'stale-while-revalidate is a Cache-Control directive that serves cached content immediately while fetching a fresh version in the background. Example: Cache-Control: max-age=60, stale-while-revalidate=86400 — browsers serve cached content for up to 24 hours, revalidating after the 60-second max-age expires. Ideal for blog posts, product listings, and any content that can tolerate being slightly stale. Avoid it for checkout, authentication, and real-time data.',
      },
    ].map(({ q, a }, i) => (
      <div key={i} style={{ borderBottom: '1px solid #e2e8f0', paddingBottom: '20px', marginBottom: '20px' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: '600', color: '#1e293b', marginBottom: '10px' }}>{q}</h3>
        <p style={{ lineHeight: '1.8', color: '#374151', margin: 0 }}>{a}</p>
      </div>
    ))}
  </article>
)

const zhContent = (
  <article>
    {/* TL;DR Box */}
    <div
      style={{
        background: '#f0f9ff',
        border: '2px solid #0ea5e9',
        borderRadius: '10px',
        padding: '20px 28px',
        marginBottom: '32px',
      }}
    >
      <strong style={{ fontSize: '1.1rem', color: '#0369a1', display: 'block', marginBottom: '8px' }}>
        TL;DR — 60秒掌握 Web 性能优化
      </strong>
      <ul style={{ margin: 0, paddingLeft: '20px', color: '#0c4a6e', lineHeight: '1.8' }}>
        <li>核心 Web 指标（LCP、INP、CLS）是 Google 排名信号——必须达到"良好"阈值</li>
        <li>图片优化（WebP/AVIF + srcset + 懒加载）是单次影响最大的改进</li>
        <li>代码分割和 Tree Shaking 减少 JavaScript 体积——压缩后目标低于 150KB</li>
        <li>哈希资源使用 immutable 缓存，HTML 使用 stale-while-revalidate</li>
        <li>使用 <code>font-display: swap</code> 并预加载关键字体防止不可见文本（FOIT）</li>
        <li>Brotli 压缩比 gzip 减小约 20% 体积——每台服务器都应启用</li>
        <li>React Server Components 和 ISR 大幅减少客户端 JavaScript</li>
        <li>用 web-vitals JS 在生产环境采集真实用户数据——实验室评分只是参考</li>
      </ul>
    </div>

    {/* Introduction */}
    <h2 style={{ fontSize: '1.75rem', fontWeight: '700', marginTop: '0', marginBottom: '16px', color: '#1e293b' }}>
      为什么 Web 性能是业务优先级
    </h2>
    <p style={{ lineHeight: '1.8', color: '#374151', marginBottom: '16px' }}>
      Web 性能已不再是可有可无的锦上添花——它直接影响收入和 SEO。加载时间每改善 100ms，亚马逊的收入就会增加 1%。Google 报告显示，当页面加载时间从 1 秒延长至 3 秒时，用户跳出概率增加 32%。BBC 发现每增加 1 秒加载时间，就有 10% 的用户离开。
    </p>
    <p style={{ lineHeight: '1.8', color: '#374151', marginBottom: '16px' }}>
      除了用户体验，Google 的页面体验算法将核心 Web 指标作为明确的排名信号。核心 Web 指标未达标的页面在搜索排名上处于系统性劣势，无论内容质量如何。本指南涵盖性能优化的每个层面——从网络传输字节到 React 渲染——附带测量技术、代码示例和优先级排序的快速优化方案。
    </p>

    {/* Key Takeaways */}
    <div
      style={{
        background: '#f8fafc',
        border: '1px solid #e2e8f0',
        borderRadius: '10px',
        padding: '20px 28px',
        marginBottom: '32px',
      }}
    >
      <strong style={{ fontSize: '1rem', color: '#1e293b', display: 'block', marginBottom: '12px' }}>
        关键要点
      </strong>
      <ul style={{ margin: 0, paddingLeft: '20px', color: '#475569', lineHeight: '1.9' }}>
        <li>优化前后都要采集真实用户字段数据（CrUX、web-vitals.js）</li>
        <li>图片优化 + CDN 组合通常能带来单次最大的性能提升</li>
        <li>JavaScript 包体积直接控制可交互时间——要激进地代码分割</li>
        <li>HTTP 缓存头和 Service Worker 共同构建多层缓存体系</li>
        <li>Lighthouse 评分是有用的信号，但真实用户的核心 Web 指标决定排名</li>
        <li>在 CI 中强制执行性能预算，防止性能随时间退化</li>
      </ul>
    </div>

    {/* Section 1 */}
    <h2 style={{ fontSize: '1.75rem', fontWeight: '700', marginBottom: '16px', color: '#1e293b' }}>
      1. 核心 Web 指标：目标阈值、测量方法与含义
    </h2>
    <p style={{ lineHeight: '1.8', color: '#374151', marginBottom: '16px' }}>
      核心 Web 指标是 Google 认为对用户体验最重要的 Web 指标子集，包含三项：最大内容绘制（LCP）、下次绘制交互时间（INP）和累积布局偏移（CLS）。每项指标都有三个性能段：良好、需改进和较差。
    </p>
    <pre style={{ background: '#0f172a', color: '#e2e8f0', borderRadius: '8px', padding: '20px', overflowX: 'auto', fontSize: '0.875rem', lineHeight: '1.7', marginBottom: '24px' }}>
      <code>{
'核心 Web 指标参考（2025/2026）：\n' +
'\n' +
'指标   全称                    衡量内容        良好      需改进       较差\n' +
'----   ----                    --------        ----      ------       ----\n' +
'LCP    最大内容绘制            加载性能        <2.5s     2.5-4.0s     >4.0s\n' +
'INP    下次绘制交互时间        响应性          <200ms    200-500ms    >500ms\n' +
'CLS    累积布局偏移            视觉稳定性      <0.1      0.1-0.25     >0.25\n' +
'\n' +
'辅助指标（同样重要）：\n' +
'FCP    首次内容绘制            首次可见渲染    <1.8s\n' +
'TTFB   首字节时间              服务器响应      <800ms\n' +
'TBT    总阻塞时间              主线程阻塞      <200ms\n' +
'TTI    可交互时间              完全可交互      <3.8s\n' +
'\n' +
'注意：INP 于 2024 年 3 月替代 FID（首次输入延迟）成为核心 Web 指标。\n' +
'INP 测量页面整个生命周期内的所有交互，而非仅第一次交互。'
      }</code>
    </pre>

    <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '12px', color: '#1e293b' }}>
      在生产环境中测量核心 Web 指标
    </h3>
    <p style={{ lineHeight: '1.8', color: '#374151', marginBottom: '16px' }}>
      字段数据（真实用户测量）是 Google 用于排名的依据。安装 <code>web-vitals</code> 库，从生产网站收集真实用户数据：
    </p>
    <pre style={{ background: '#0f172a', color: '#e2e8f0', borderRadius: '8px', padding: '20px', overflowX: 'auto', fontSize: '0.875rem', lineHeight: '1.7', marginBottom: '24px' }}>
      <code>{
'// npm install web-vitals\n' +
'import { onCLS, onINP, onLCP, onFCP, onTTFB } from "web-vitals";\n' +
'\n' +
'function sendToAnalytics(metric) {\n' +
'  const body = JSON.stringify({\n' +
'    name: metric.name,         // "LCP"、"INP"、"CLS" 等\n' +
'    value: metric.value,       // 指标值\n' +
'    rating: metric.rating,     // "good" | "needs-improvement" | "poor"\n' +
'    delta: metric.delta,       // 与上次上报的变化量\n' +
'    id: metric.id,\n' +
'  });\n' +
'\n' +
'  // sendBeacon 非阻塞，适合分析上报\n' +
'  if (navigator.sendBeacon) {\n' +
'    navigator.sendBeacon("/api/vitals", body);\n' +
'  } else {\n' +
'    fetch("/api/vitals", { body, method: "POST", keepalive: true });\n' +
'  }\n' +
'}\n' +
'\n' +
'onCLS(sendToAnalytics);\n' +
'onINP(sendToAnalytics);\n' +
'onLCP(sendToAnalytics);\n' +
'onFCP(sendToAnalytics);\n' +
'onTTFB(sendToAnalytics);'
      }</code>
    </pre>

    {/* Section 2 zh */}
    <h2 style={{ fontSize: '1.75rem', fontWeight: '700', marginBottom: '16px', color: '#1e293b' }}>
      2. 图片优化：WebP/AVIF、懒加载、响应式图片
    </h2>
    <p style={{ lineHeight: '1.8', color: '#374151', marginBottom: '16px' }}>
      图片通常占页面总体积的 50%–70%。全面的图片优化策略结合了现代格式、响应式尺寸和智能加载优先级。收益显著——将 500KB JPEG 转换为 AVIF，通常能以相同的视觉质量产出 200KB 文件。
    </p>
    <pre style={{ background: '#0f172a', color: '#e2e8f0', borderRadius: '8px', padding: '20px', overflowX: 'auto', fontSize: '0.875rem', lineHeight: '1.7', marginBottom: '24px' }}>
      <code>{
'<!-- 使用 picture 元素：提供 AVIF，回退到 WebP，再回退到 JPEG -->\n' +
'<picture>\n' +
'  <source\n' +
'    srcset="/hero-400.avif 400w, /hero-800.avif 800w, /hero-1200.avif 1200w"\n' +
'    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 75vw, 1200px"\n' +
'    type="image/avif"\n' +
'  />\n' +
'  <source\n' +
'    srcset="/hero-400.webp 400w, /hero-800.webp 800w, /hero-1200.webp 1200w"\n' +
'    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 75vw, 1200px"\n' +
'    type="image/webp"\n' +
'  />\n' +
'  <img\n' +
'    src="/hero-1200.jpg"\n' +
'    width="1200" height="600"\n' +
'    alt="主视觉图片"\n' +
'    fetchpriority="high"\n' +
'    decoding="async"\n' +
'  />\n' +
'</picture>\n' +
'\n' +
'<!-- LCP 图片：在 <head> 中预加载 -->\n' +
'<link rel="preload" as="image" href="/hero-1200.avif" fetchpriority="high" />\n' +
'\n' +
'<!-- 首屏以下图片：懒加载 -->\n' +
'<img src="/below-fold.webp" loading="lazy" decoding="async"\n' +
'     width="800" height="450" alt="首屏以下图片" />'
      }</code>
    </pre>

    {/* Section 3 zh */}
    <h2 style={{ fontSize: '1.75rem', fontWeight: '700', marginBottom: '16px', color: '#1e293b' }}>
      3. JavaScript 优化：代码分割、Tree Shaking、包分析
    </h2>
    <p style={{ lineHeight: '1.8', color: '#374151', marginBottom: '16px' }}>
      JavaScript 是 Web 上最昂贵的资源——不仅在字节数上，还在解析、编译和执行时间上。300KB 压缩后的 JavaScript 比 300KB 压缩后的图片需要多得多的处理时间。目标是最小化页面可交互前必须解析的 JS 量。
    </p>
    <pre style={{ background: '#0f172a', color: '#e2e8f0', borderRadius: '8px', padding: '20px', overflowX: 'auto', fontSize: '0.875rem', lineHeight: '1.7', marginBottom: '24px' }}>
      <code>{
'// React.lazy 实现组件级代码分割\n' +
'import { lazy, Suspense } from "react";\n' +
'\n' +
'const HeavyChart = lazy(() => import("./HeavyChart"));\n' +
'const AdminPanel = lazy(() => import("./AdminPanel"));\n' +
'\n' +
'function App({ isAdmin }) {\n' +
'  return (\n' +
'    <Suspense fallback={<div>加载中...</div>}>\n' +
'      <HeavyChart />\n' +
'      {isAdmin && <AdminPanel />}\n' +
'    </Suspense>\n' +
'  );\n' +
'}\n' +
'\n' +
'// Next.js dynamic 导入\n' +
'import dynamic from "next/dynamic";\n' +
'\n' +
'const RichEditor = dynamic(() => import("./RichEditor"), {\n' +
'  loading: () => <p>加载编辑器...</p>,\n' +
'  ssr: false,  // 跳过服务端渲染\n' +
'});\n' +
'\n' +
'// Tree Shaking：只导入需要的内容\n' +
'// 坏做法：导入整个 lodash（~70KB gzipped）\n' +
'import _ from "lodash";\n' +
'\n' +
'// 好做法：单独导入函数（~2KB）\n' +
'import debounce from "lodash/debounce";\n' +
'\n' +
'// 最佳：使用原生 API 或极小工具库\n' +
'const debounce = (fn, delay) => {\n' +
'  let timer;\n' +
'  return (...args) => { clearTimeout(timer); timer = setTimeout(() => fn(...args), delay); };\n' +
'};'
      }</code>
    </pre>

    {/* Section 4 zh */}
    <h2 style={{ fontSize: '1.75rem', fontWeight: '700', marginBottom: '16px', color: '#1e293b' }}>
      4. 缓存策略：浏览器缓存、CDN、Service Worker、HTTP 头
    </h2>
    <p style={{ lineHeight: '1.8', color: '#374151', marginBottom: '16px' }}>
      缓存是影响最大的服务端性能优化。缓存命中需要零计算量、零数据库查询和极少带宽。分层缓存策略结合浏览器缓存、CDN 缓存和 Service Worker 缓存。
    </p>
    <pre style={{ background: '#0f172a', color: '#e2e8f0', borderRadius: '8px', padding: '20px', overflowX: 'auto', fontSize: '0.875rem', lineHeight: '1.7', marginBottom: '24px' }}>
      <code>{
'# 文件名含内容哈希的静态资源（如 app.abc123.js）\n' +
'Cache-Control: public, max-age=31536000, immutable\n' +
'# 浏览器和 CDN 缓存 1 年，永不重新验证\n' +
'\n' +
'# HTML 页面——快速响应 + 后台重新验证\n' +
'Cache-Control: public, max-age=0, s-maxage=3600, stale-while-revalidate=86400\n' +
'# CDN 缓存 1 小时；在后台重新验证期间最多提供 24 小时的旧内容\n' +
'\n' +
'# API 响应——用户私有数据\n' +
'Cache-Control: private, max-age=60\n' +
'# 浏览器缓存 60 秒；CDN 不能缓存（private）\n' +
'\n' +
'# 实时数据（价格、库存、比分）\n' +
'Cache-Control: no-cache, no-store\n' +
'# 任何地方都不缓存\n' +
'\n' +
'# 在 Next.js 中设置缓存头（next.config.js）\n' +
'module.exports = {\n' +
'  async headers() {\n' +
'    return [\n' +
'      {\n' +
'        source: "/_next/static/(.*)",\n' +
'        headers: [\n' +
'          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },\n' +
'        ],\n' +
'      },\n' +
'    ];\n' +
'  },\n' +
'};'
      }</code>
    </pre>

    {/* Section 5 zh */}
    <h2 style={{ fontSize: '1.75rem', fontWeight: '700', marginBottom: '16px', color: '#1e293b' }}>
      5. 字体优化与资源提示
    </h2>
    <p style={{ lineHeight: '1.8', color: '#374151', marginBottom: '16px' }}>
      自定义字体会导致不可见文本闪烁（FOIT）或未样式化文本闪烁（FOUT），两者都会影响 CLS 和感知性能。正确的字体加载策略能消除这些问题，同时保持较小的下载体积。
    </p>
    <pre style={{ background: '#0f172a', color: '#e2e8f0', borderRadius: '8px', padding: '20px', overflowX: 'auto', fontSize: '0.875rem', lineHeight: '1.7', marginBottom: '24px' }}>
      <code>{
'/* 自托管字体 + font-display: swap */\n' +
'@font-face {\n' +
'  font-family: "Inter";\n' +
'  src: url("/fonts/inter-var.woff2") format("woff2-variations");\n' +
'  font-weight: 100 900;       /* 可变字体粗细范围 */\n' +
'  font-display: swap;         /* 立即显示备用字体 */\n' +
'  unicode-range: U+0000-00FF; /* 仅拉丁字符（子集化）*/\n' +
'}\n' +
'\n' +
'/* 调整备用字体指标以减少字体交换时的 CLS */\n' +
'@font-face {\n' +
'  font-family: "Inter-Fallback";\n' +
'  src: local("Arial");\n' +
'  ascent-override: 90%;\n' +
'  descent-override: 22.4%;\n' +
'  size-adjust: 107.5%;\n' +
'}\n' +
'\n' +
'/* 资源提示 */\n' +
'<head>\n' +
'  <!-- preconnect: 为关键第三方源建立 TCP+TLS 连接 -->\n' +
'  <link rel="preconnect" href="https://cdn.example.com" crossorigin />\n' +
'\n' +
'  <!-- dns-prefetch: 仅 DNS 解析，优先级更低 -->\n' +
'  <link rel="dns-prefetch" href="https://analytics.example.com" />\n' +
'\n' +
'  <!-- preload: 尽快获取当前页面的关键资源 -->\n' +
'  <link rel="preload" href="/fonts/inter.woff2" as="font" type="font/woff2" crossorigin />\n' +
'  <link rel="preload" href="/hero.avif" as="image" fetchpriority="high" />\n' +
'\n' +
'  <!-- prefetch: 获取下一次导航所需的资源（低优先级）-->\n' +
'  <link rel="prefetch" href="/next-page.js" />\n' +
'</head>'
      }</code>
    </pre>

    {/* Section 6 zh */}
    <h2 style={{ fontSize: '1.75rem', fontWeight: '700', marginBottom: '16px', color: '#1e293b' }}>
      6. 服务端性能、数据库优化与 React/Next.js 最佳实践
    </h2>
    <p style={{ lineHeight: '1.8', color: '#374151', marginBottom: '16px' }}>
      TTFB（首字节时间）直接影响 LCP。服务端的每一毫秒响应延迟都会增加 LCP。启用 Brotli 压缩、HTTP/2、边缘计算，以及解决数据库 N+1 问题，是快速降低 TTFB 的关键手段。
    </p>
    <pre style={{ background: '#0f172a', color: '#e2e8f0', borderRadius: '8px', padding: '20px', overflowX: 'auto', fontSize: '0.875rem', lineHeight: '1.7', marginBottom: '24px' }}>
      <code>{
'# Nginx 启用 Brotli 和 gzip 压缩\n' +
'http {\n' +
'  brotli on;\n' +
'  brotli_comp_level 6;\n' +
'  brotli_types text/html text/css application/javascript font/woff2;\n' +
'\n' +
'  gzip on;\n' +
'  gzip_comp_level 6;\n' +
'  gzip_vary on;\n' +
'\n' +
'  server {\n' +
'    listen 443 ssl;\n' +
'    http2 on;  # 启用 HTTP/2\n' +
'  }\n' +
'}\n' +
'\n' +
'// N+1 问题修复：用 include 一次性获取关联数据\n' +
'const posts = await db.post.findMany({\n' +
'  include: { author: true, tags: true },\n' +
'  where: { published: true },\n' +
'  orderBy: { createdAt: "desc" },\n' +
'  take: 20,\n' +
'});\n' +
'\n' +
'// React Server Components — 零客户端 JS\n' +
'// app/blog/page.tsx（Next.js App Router 默认）\n' +
'async function BlogPage() {\n' +
'  const posts = await db.post.findMany();  // 仅在服务端运行\n' +
'  return <main>{posts.map(p => <BlogCard key={p.id} post={p} />)}</main>;\n' +
'}\n' +
'\n' +
'// ISR 增量静态再生成\n' +
'export const revalidate = 3600; // 每小时重新验证一次\n' +
'\n' +
'// 按需重新验证\n' +
'import { revalidatePath } from "next/cache";\n' +
'revalidatePath("/blog"); // 在 webhook 或 API 路由中调用'
      }</code>
    </pre>

    {/* FAQ zh */}
    <h2 style={{ fontSize: '1.75rem', fontWeight: '700', marginBottom: '24px', color: '#1e293b' }}>
      常见问题
    </h2>

    {[
      {
        q: '核心 Web 指标是什么？为什么对 SEO 很重要？',
        a: '核心 Web 指标是 Google 用作排名信号的三项用户体验指标：LCP（加载速度）、INP（响应性）和 CLS（视觉稳定性）。这三项均达到"良好"阈值的页面会在页面体验系统中获得排名加成。良好阈值：LCP < 2.5s，INP < 200ms，CLS < 0.1。',
      },
      {
        q: '提升最大内容绘制（LCP）最快的方法是什么？',
        a: '最快的 LCP 改进：(1) 使用 fetchpriority="high" 预加载 LCP 图片；(2) 将图片转换为 WebP 或 AVIF 格式；(3) 从 CDN 提供服务；(4) 消除阻塞渲染的脚本和样式表；(5) 通过缓存降低 TTFB。仅为主视觉图片添加 fetchpriority="high" 这一项，通常就能立即改善 LCP 200–500ms。',
      },
      {
        q: '如何修复累积布局偏移（CLS）？',
        a: '修复 CLS 的方法：始终在图片和视频上设置 width 和 height 属性；使用 aspect-ratio CSS 处理响应式媒体容器；为广告和嵌入内容用 min-height 预留空间；使用 font-display: swap 配合 size-adjust 减少字体交换偏移；避免在现有内容上方动态插入内容。使用 transform 和 opacity 动画，而非 top/left/width/height，不会引发布局偏移。',
      },
      {
        q: '浏览器缓存、CDN 缓存和 Service Worker 缓存有什么区别？',
        a: '浏览器缓存存储在用户设备上，由 Cache-Control 头控制，减少重复访问的加载时间。CDN 缓存存储在地理上靠近用户的边缘服务器上，由 s-maxage 和 CDN 配置控制，全局降低 TTFB。Service Worker 缓存是可编程的 JavaScript 存储，支持离线功能、自定义缓存逻辑和后台同步。最佳实践：三者结合使用，以获得最大弹性和速度。',
      },
      {
        q: '应该使用 WebP 还是 AVIF 格式的图片？',
        a: '两者都用。AVIF 比 JPEG 压缩约 50%，比 WebP 好约 20%，浏览器支持率 96%。WebP 比 JPEG 压缩约 30%，支持率 97%。使用 <picture> 元素优先提供 AVIF，然后 WebP，最后 JPEG 作为兼容性兜底。Next.js Image 组件在 next.config.js 中设置 formats: ["image/avif", "image/webp"] 后会自动处理。',
      },
      {
        q: 'Lighthouse 性能评分多少算好？',
        a: '90 分及以上为"良好"（绿色），50–89 为"需改进"（橙色），低于 50 为"较差"（红色）。但 Lighthouse 在模拟限速环境下运行，两次测试之间可能相差 5–10 分。应优先关注来自 Chrome UX Report 和 web-vitals.js 的真实用户字段数据，而非实验室评分。一个页面 Lighthouse 评分可能高达 95，但如果真实用户设备或网络较慢，核心 Web 指标在实际中仍可能不达标。',
      },
      {
        q: '代码分割如何改善 JavaScript 性能？',
        a: '代码分割将 JavaScript 包分成按需加载的小块。用户只下载当前页面需要的代码，而不是预先下载所有代码。React.lazy() 实现组件级分割，Next.js 按路由自动分割。目标是初始 JS 负载低于 150KB（压缩后）。在中端 Android 设备上，每增加 100KB 不必要的 JavaScript，可交互时间（TTI）约增加 0.5 秒。',
      },
      {
        q: '什么是 stale-while-revalidate？何时应该使用？',
        a: 'stale-while-revalidate 是 Cache-Control 指令，让浏览器（或 CDN）立即提供缓存内容，同时在后台获取新版本。示例：Cache-Control: max-age=60, stale-while-revalidate=86400 — 在 60 秒 max-age 过期后，仍可提供长达 24 小时的旧内容，同时在后台重新验证。适合博客文章、产品列表等允许稍有延迟的内容。避免用于结账、认证和实时数据。',
      },
    ].map(({ q, a }, i) => (
      <div key={i} style={{ borderBottom: '1px solid #e2e8f0', paddingBottom: '20px', marginBottom: '20px' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: '600', color: '#1e293b', marginBottom: '10px' }}>{q}</h3>
        <p style={{ lineHeight: '1.8', color: '#374151', margin: 0 }}>{a}</p>
      </div>
    ))}
  </article>
)

export default function PerformanceOptimizationGuide({ lang }: { lang: string }) {
  const t = translations[lang as keyof typeof translations] || translations.en
  const isZh = lang === 'zh'

  return (
    <div style={{ maxWidth: '860px', margin: '0 auto', padding: '0 16px', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Header */}
      <header style={{ marginBottom: '40px' }}>
        <h1 style={{ fontSize: '2.25rem', fontWeight: '800', color: '#0f172a', lineHeight: '1.2', marginBottom: '16px' }}>
          {t.title}
        </h1>
        <p style={{ fontSize: '1.125rem', color: '#64748b', lineHeight: '1.7', margin: '0' }}>
          {t.description}
        </p>
      </header>

      {/* Main Content */}
      {isZh ? zhContent : enContent}

      {/* Tools comparison quick-ref */}
      {!isZh && (
        <section style={{ marginTop: '48px', marginBottom: '48px' }}>
          <h2 style={{ fontSize: '1.75rem', fontWeight: '700', marginBottom: '16px', color: '#1e293b' }}>
            Performance Monitoring Stack Reference
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
            {[
              { tool: 'web-vitals.js', use: 'Real user metric collection in production' },
              { tool: 'Lighthouse CI', use: 'Automated CI/CD performance gating' },
              { tool: 'Chrome DevTools', use: 'Flame charts, waterfall, memory profiling' },
              { tool: 'PageSpeed Insights', use: 'Real CrUX data + lab audit in one view' },
              { tool: 'WebPageTest', use: 'Advanced waterfall, filmstrip, video compare' },
              { tool: 'Chrome UX Report', use: 'Aggregate field data via BigQuery or API' },
              { tool: 'Vercel Analytics', use: 'Real-time CWV on Vercel deployments' },
              { tool: '@next/bundle-analyzer', use: 'Visualize Next.js bundle composition' },
            ].map(({ tool, use }, i) => (
              <div
                key={i}
                style={{
                  background: '#0f172a',
                  borderRadius: '8px',
                  padding: '14px 18px',
                }}
              >
                <code style={{ color: '#38bdf8', fontSize: '0.875rem', display: 'block', marginBottom: '6px' }}>{tool}</code>
                <span style={{ color: '#94a3b8', fontSize: '0.8rem' }}>{use}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {isZh && (
        <section style={{ marginTop: '48px', marginBottom: '48px' }}>
          <h2 style={{ fontSize: '1.75rem', fontWeight: '700', marginBottom: '16px', color: '#1e293b' }}>
            性能监控工具速查
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
            {[
              { tool: 'web-vitals.js', use: '在生产环境收集真实用户指标' },
              { tool: 'Lighthouse CI', use: '在 CI/CD 流水线中自动化性能门控' },
              { tool: 'Chrome DevTools', use: '火焰图、瀑布流、内存分析' },
              { tool: 'PageSpeed Insights', use: '在一个视图中查看真实 CrUX 数据 + 实验室审计' },
              { tool: 'WebPageTest', use: '高级瀑布流、胶片条、视频对比' },
              { tool: 'Chrome UX Report', use: '通过 BigQuery 或 API 获取聚合字段数据' },
              { tool: 'Vercel Analytics', use: 'Vercel 部署上的实时核心 Web 指标' },
              { tool: '@next/bundle-analyzer', use: '可视化 Next.js 包体积构成' },
            ].map(({ tool, use }, i) => (
              <div
                key={i}
                style={{
                  background: '#0f172a',
                  borderRadius: '8px',
                  padding: '14px 18px',
                }}
              >
                <code style={{ color: '#38bdf8', fontSize: '0.875rem', display: 'block', marginBottom: '6px' }}>{tool}</code>
                <span style={{ color: '#94a3b8', fontSize: '0.8rem' }}>{use}</span>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
