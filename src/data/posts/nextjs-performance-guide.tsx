'use client';

import Link from 'next/link';

const translations = {
  en: {
    title: 'Next.js Performance Optimization Complete Guide — Core Web Vitals, Images, Caching & Edge',
    description: 'Maximize Next.js performance with this complete guide covering Core Web Vitals, image/font optimization, code splitting, Server Components, caching strategies, bundle analysis, ISR, Edge Runtime, and database query optimization.',
  },
  zh: {
    title: 'Next.js 性能优化完整指南 — Core Web Vitals、图片、缓存与 Edge',
    description: '全面优化 Next.js 性能，涵盖 Core Web Vitals、图片/字体优化、代码分割、服务器组件、缓存策略、Bundle 分析、ISR、Edge Runtime 及数据库查询优化的完整指南。',
  },
};

export default function NextjsPerformanceGuide({ lang = 'en' }: { lang?: string }) {
  const t = translations[lang as keyof typeof translations] || translations.en;

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What are Core Web Vitals and why do they matter for Next.js?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Core Web Vitals are Google\'s set of real-world performance metrics: LCP (Largest Contentful Paint — loading performance, target < 2.5s), FID/INP (Interaction to Next Paint — interactivity, target < 200ms), and CLS (Cumulative Layout Shift — visual stability, target < 0.1). They are ranking signals in Google Search. Next.js 13+ includes built-in Web Vitals reporting via the useReportWebVitals hook, and Vercel Analytics provides real user monitoring (RUM) data.',
        },
      },
      {
        '@type': 'Question',
        name: 'How does next/image improve performance compared to a regular img tag?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'next/image automatically converts images to modern formats (WebP/AVIF), resizes them to the exact display size using the sizes prop, lazy-loads images below the fold by default, prevents Cumulative Layout Shift by requiring width/height or fill, and serves images via an optimized CDN pipeline. It also supports blur placeholder for perceived performance and priority loading for above-the-fold images.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the difference between static generation and ISR in Next.js?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Static Generation (SSG) pre-renders pages at build time — pages are served as static HTML instantly. ISR (Incremental Static Regeneration) extends SSG by revalidating pages in the background after a specified interval (revalidate: 60) or on-demand via revalidatePath/revalidateTag. ISR gives you the speed of static with the freshness of server-side rendering, without rebuilding the entire site.',
        },
      },
      {
        '@type': 'Question',
        name: 'When should I use Server Components vs Client Components?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Use Server Components (default in Next.js 13+ App Router) for data fetching, database access, large dependencies, and content that doesn\'t need interactivity — they reduce JavaScript bundle size and enable streaming. Use Client Components (add "use client") only when you need browser APIs, event handlers, useState/useEffect, or third-party libraries that require a browser environment. The golden rule: push "use client" as deep in the component tree as possible.',
        },
      },
      {
        '@type': 'Question',
        name: 'How does Next.js caching work in the App Router?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Next.js App Router has four caching layers: Request Memoization (deduplicates fetch calls within a render), Data Cache (persists fetch results across requests, revalidated by time or on-demand), Full Route Cache (stores rendered RSC payload and HTML on the server), and Router Cache (client-side cache of RSC payloads for navigation). Use fetch with { next: { revalidate: 60 } } for time-based revalidation and revalidateTag/revalidatePath for on-demand cache invalidation.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I analyze and reduce my Next.js bundle size?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Install @next/bundle-analyzer and add ANALYZE=true npm run build to visualize bundle composition. Look for large dependencies in the treemap and replace them with lighter alternatives (e.g., date-fns instead of moment.js). Use dynamic imports for heavy components not needed on initial load. Check that libraries are tree-shakeable and only import named exports instead of the entire package. Run next build --debug to see per-page bundle sizes.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is Edge Runtime in Next.js and when should I use it?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Edge Runtime runs JavaScript at the network edge (Vercel Edge Network, Cloudflare Workers) — closer to the user with ultra-low cold-start latency (< 1ms). Use it for middleware (auth checks, redirects, A/B testing, geolocation-based routing) and API routes that need to run globally fast. Edge Runtime has limitations: no Node.js APIs, no filesystem access, and a 1-4MB size limit. For database connections or Node-specific libraries, use the Node.js runtime.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I prevent N+1 query problems in Next.js with Prisma?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The N+1 problem occurs when you fetch a list (1 query) then fetch related data per item (N queries). In Prisma, use nested include to fetch relations in a single query: findMany({ include: { author: true, tags: true } }). For more complex cases, use Prisma\'s select to limit fields, batch queries with Promise.all for parallel execution, and enable query logging with log: ["query"] to detect slow queries. DataLoader pattern can also batch and deduplicate queries within a request.',
        },
      },
    ],
  };

  return (
    <article style={{ maxWidth: 860, margin: '0 auto', padding: '0 16px', fontFamily: 'system-ui, -apple-system, sans-serif', color: '#1e293b', lineHeight: 1.7 }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: 8, lineHeight: 1.3 }}>{t.title}</h1>
      <p style={{ color: '#64748b', fontSize: '1.05rem', marginBottom: 32 }}>{t.description}</p>

      {/* TL;DR Box */}
      <div style={{ background: '#f0f9ff', borderLeft: '4px solid #0ea5e9', borderRadius: 8, padding: '16px 20px', marginBottom: 40 }}>
        <strong style={{ color: '#0369a1', fontSize: '0.95rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>TL;DR</strong>
        <p style={{ margin: '8px 0 0', color: '#0c4a6e' }}>
          Optimize Next.js performance by targeting Core Web Vitals, using next/image and next/font for zero-layout-shift asset loading, splitting code with dynamic imports, leveraging React Server Components to reduce bundle size, applying the four-layer caching strategy, analyzing bundles with @next/bundle-analyzer, using ISR for fresh static pages, and running latency-critical logic on Edge Runtime.
        </p>
      </div>

      {/* Section 1: Core Web Vitals */}
      <section style={{ marginBottom: 48 }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, borderBottom: '2px solid #e2e8f0', paddingBottom: 8, marginBottom: 20 }}>1. Core Web Vitals</h2>
        <p>Core Web Vitals are Google's user-centric performance metrics. They directly influence search rankings and measure real user experience across loading speed, interactivity, and visual stability.</p>

        <h3 style={{ fontSize: '1.15rem', fontWeight: 600, marginTop: 24, marginBottom: 12 }}>Metrics &amp; Targets</h3>
        <div style={{ overflowX: 'auto', marginBottom: 20 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
            <thead>
              <tr style={{ background: '#f1f5f9' }}>
                <th style={{ padding: '10px 14px', textAlign: 'left', border: '1px solid #e2e8f0' }}>Metric</th>
                <th style={{ padding: '10px 14px', textAlign: 'left', border: '1px solid #e2e8f0' }}>Measures</th>
                <th style={{ padding: '10px 14px', textAlign: 'left', border: '1px solid #e2e8f0' }}>Good</th>
                <th style={{ padding: '10px 14px', textAlign: 'left', border: '1px solid #e2e8f0' }}>Needs Work</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: '10px 14px', border: '1px solid #e2e8f0' }}><strong>LCP</strong></td>
                <td style={{ padding: '10px 14px', border: '1px solid #e2e8f0' }}>Largest element painted</td>
                <td style={{ padding: '10px 14px', border: '1px solid #e2e8f0', color: '#16a34a' }}>&lt; 2.5s</td>
                <td style={{ padding: '10px 14px', border: '1px solid #e2e8f0', color: '#dc2626' }}>&gt; 4.0s</td>
              </tr>
              <tr style={{ background: '#fafafa' }}>
                <td style={{ padding: '10px 14px', border: '1px solid #e2e8f0' }}><strong>INP</strong></td>
                <td style={{ padding: '10px 14px', border: '1px solid #e2e8f0' }}>Interaction latency</td>
                <td style={{ padding: '10px 14px', border: '1px solid #e2e8f0', color: '#16a34a' }}>&lt; 200ms</td>
                <td style={{ padding: '10px 14px', border: '1px solid #e2e8f0', color: '#dc2626' }}>&gt; 500ms</td>
              </tr>
              <tr>
                <td style={{ padding: '10px 14px', border: '1px solid #e2e8f0' }}><strong>CLS</strong></td>
                <td style={{ padding: '10px 14px', border: '1px solid #e2e8f0' }}>Layout shift score</td>
                <td style={{ padding: '10px 14px', border: '1px solid #e2e8f0', color: '#16a34a' }}>&lt; 0.1</td>
                <td style={{ padding: '10px 14px', border: '1px solid #e2e8f0', color: '#dc2626' }}>&gt; 0.25</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 style={{ fontSize: '1.15rem', fontWeight: 600, marginTop: 24, marginBottom: 12 }}>Measuring Web Vitals in Next.js</h3>
        <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem', lineHeight: 1.6 }}>
{`// app/layout.tsx — report Web Vitals to analytics
'use client';
import { useReportWebVitals } from 'next/web-vitals';

export function WebVitals() {
  useReportWebVitals((metric) => {
    switch (metric.name) {
      case 'LCP':
      case 'INP':
      case 'CLS':
      case 'FCP':
      case 'TTFB':
        // Send to your analytics
        window.gtag?.('event', metric.name, {
          value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
          metric_id: metric.id,
          metric_delta: metric.delta,
        });
        break;
    }
  });
  return null;
}`}
        </pre>

        <h3 style={{ fontSize: '1.15rem', fontWeight: 600, marginTop: 24, marginBottom: 12 }}>Lighthouse CI Automation</h3>
        <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem', lineHeight: 1.6 }}>
{`# .github/workflows/lighthouse.yml
- name: Run Lighthouse CI
  uses: treosh/lighthouse-ci-action@v11
  with:
    urls: |
      https://yoursite.com
      https://yoursite.com/about
    budgetPath: ./budget.json
    uploadArtifacts: true

# budget.json
[{
  "path": "/*",
  "timings": [
    { "metric": "largest-contentful-paint", "budget": 2500 },
    { "metric": "cumulative-layout-shift", "budget": 0.1 }
  ]
}]`}
        </pre>
      </section>

      {/* Section 2: Image Optimization */}
      <section style={{ marginBottom: 48 }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, borderBottom: '2px solid #e2e8f0', paddingBottom: 8, marginBottom: 20 }}>2. Image Optimization</h2>
        <p>Images are typically the largest resources on a page and the #1 cause of poor LCP. next/image handles format conversion, resizing, lazy loading, and CLS prevention automatically.</p>

        <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem', lineHeight: 1.6 }}>
{`import Image from 'next/image';

// Hero image — priority loading, prevents CLS
<Image
  src="/hero.jpg"
  alt="Hero banner"
  width={1200}
  height={600}
  priority          // Preload — use for above-the-fold images
  quality={85}
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,..."  // Tiny base64 preview
/>

// Responsive image with sizes prop — critical for performance
<Image
  src="/product.jpg"
  alt="Product"
  fill              // Fills parent container (position: relative required)
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
  style={{ objectFit: 'cover' }}
/>

// Remote images require remotePatterns in next.config.js
// next.config.js
module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
    ],
    formats: ['image/avif', 'image/webp'],  // AVIF first (better compression)
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    minimumCacheTTL: 60 * 60 * 24 * 30,    // 30 days
  },
};`}
        </pre>

        <div style={{ background: '#f0fdf4', borderLeft: '4px solid #22c55e', borderRadius: 8, padding: '12px 16px', marginTop: 16 }}>
          <strong>LCP Optimization:</strong> Identify your LCP element (usually the hero image or H1) and add <code>priority</code> to preload it. Avoid lazy loading above-the-fold images. Use the <code>sizes</code> prop to prevent the browser from downloading a 1200px image for a 400px slot.
        </div>
      </section>

      {/* Section 3: Font Optimization */}
      <section style={{ marginBottom: 48 }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, borderBottom: '2px solid #e2e8f0', paddingBottom: 8, marginBottom: 20 }}>3. Font Optimization</h2>
        <p>Custom fonts cause Cumulative Layout Shift when they swap in and FOUT (Flash of Unstyled Text). next/font eliminates layout shift by automatically sizing the fallback font to match your custom font metrics.</p>

        <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem', lineHeight: 1.6 }}>
{`// app/layout.tsx
import { Inter, Roboto_Mono } from 'next/font/google';
import localFont from 'next/font/local';

// Google Fonts — zero network request, zero layout shift
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',          // Shows fallback font, swaps when ready
  variable: '--font-inter', // CSS variable for use in Tailwind/CSS
  preload: true,
  fallback: ['system-ui', 'arial'],
});

// Variable font — single file for all weights
const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'optional',  // Don't swap if font not loaded within timeout
});

// Self-hosted font
const customFont = localFont({
  src: [
    { path: './fonts/MyFont-Regular.woff2', weight: '400', style: 'normal' },
    { path: './fonts/MyFont-Bold.woff2', weight: '700', style: 'normal' },
  ],
  variable: '--font-custom',
  display: 'swap',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={\`\${inter.variable} \${robotoMono.variable}\`}>
      <body className={inter.className}>{children}</body>
    </html>
  );
}`}
        </pre>

        <div style={{ background: '#fff7ed', borderLeft: '4px solid #f97316', borderRadius: 8, padding: '12px 16px', marginTop: 16 }}>
          <strong>display: swap vs optional:</strong> Use <code>swap</code> for body text (shows fallback immediately, swaps when loaded). Use <code>optional</code> for decorative fonts (uses cached version, or skips entirely — best for performance scores). Avoid loading more than 2-3 font families per page.
        </div>
      </section>

      {/* Section 4: Code Splitting */}
      <section style={{ marginBottom: 48 }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, borderBottom: '2px solid #e2e8f0', paddingBottom: 8, marginBottom: 20 }}>4. Code Splitting</h2>
        <p>Next.js automatically code-splits by route. Use dynamic imports to further split components that are large, conditionally rendered, or not needed on initial page load.</p>

        <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem', lineHeight: 1.6 }}>
{`import dynamic from 'next/dynamic';

// Basic dynamic import with loading state
const HeavyChart = dynamic(() => import('@/components/Chart'), {
  loading: () => <div style={{ height: 400, background: '#f1f5f9' }}>Loading chart...</div>,
  ssr: false,  // Disable SSR for browser-only components
});

// Dynamic import with named export
const Modal = dynamic(
  () => import('@/components/ui/Modal').then((mod) => mod.Modal),
  { ssr: false }
);

// Conditional loading — only load when needed
export default function Dashboard() {
  const [showChart, setShowChart] = useState(false);

  return (
    <div>
      <button onClick={() => setShowChart(true)}>Show Analytics</button>
      {showChart && <HeavyChart />}
    </div>
  );
}

// React Suspense with Server Components (App Router)
import { Suspense } from 'react';

export default function Page() {
  return (
    <div>
      <h1>Dashboard</h1>
      <Suspense fallback={<Skeleton />}>
        {/* Streams independently — doesn't block page render */}
        <SlowDataComponent />
      </Suspense>
      <Suspense fallback={<Skeleton />}>
        <AnotherSlowComponent />
      </Suspense>
    </div>
  );
}`}
        </pre>

        <div style={{ background: '#f0f9ff', borderLeft: '4px solid #0ea5e9', borderRadius: 8, padding: '12px 16px', marginTop: 16 }}>
          <strong>ssr: false use cases:</strong> Use for components that use <code>window</code>, <code>localStorage</code>, <code>document</code>, or browser-specific APIs. Also use for third-party widgets (maps, chat, payment forms) that don't need server rendering.
        </div>
      </section>

      {/* Section 5: Server Components */}
      <section style={{ marginBottom: 48 }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, borderBottom: '2px solid #e2e8f0', paddingBottom: 8, marginBottom: 20 }}>5. Server Components</h2>
        <p>React Server Components (RSC) run on the server, keeping large dependencies out of the client bundle. They enable streaming with Suspense and eliminate client-side waterfalls.</p>

        <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem', lineHeight: 1.6 }}>
{`// app/blog/[slug]/page.tsx — Server Component (no 'use client')
// Directly access DB, filesystem, secrets — zero client bundle cost

// BAD: Sequential waterfall (slow)
async function BadPage() {
  const user = await getUser();          // Wait...
  const posts = await getPosts(user.id); // Then wait...
  const comments = await getComments();  // Then wait...
  return <div />;
}

// GOOD: Parallel fetching (fast)
async function GoodPage() {
  const [user, posts, comments] = await Promise.all([
    getUser(),
    getPosts(),
    getComments(),
  ]);
  return <div />;
}

// BETTER: Streaming with Suspense (fastest perceived performance)
export default async function Page() {
  const criticalData = await getCriticalData(); // Awaited — blocks initial HTML

  return (
    <div>
      <CriticalContent data={criticalData} />

      {/* These stream in independently as data resolves */}
      <Suspense fallback={<PostsSkeleton />}>
        <Posts />           {/* Async Server Component */}
      </Suspense>
      <Suspense fallback={<CommentsSkeleton />}>
        <Comments />        {/* Async Server Component */}
      </Suspense>
    </div>
  );
}

// Async Server Component that fetches its own data
async function Posts() {
  const posts = await db.post.findMany({ take: 10 }); // Runs on server
  return <ul>{posts.map(p => <li key={p.id}>{p.title}</li>)}</ul>;
}`}
        </pre>
      </section>

      {/* Section 6: Caching Strategies */}
      <section style={{ marginBottom: 48 }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, borderBottom: '2px solid #e2e8f0', paddingBottom: 8, marginBottom: 20 }}>6. Caching Strategies</h2>
        <p>Next.js App Router has four distinct caching layers. Understanding each layer is essential for predictable performance and data freshness.</p>

        <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem', lineHeight: 1.6 }}>
{`// 1. Time-based revalidation
async function getProducts() {
  const res = await fetch('https://api.example.com/products', {
    next: { revalidate: 3600 }, // Revalidate every 1 hour
  });
  return res.json();
}

// 2. Tag-based cache + on-demand invalidation
async function getBlogPost(slug: string) {
  const res = await fetch(\`https://api.example.com/posts/\${slug}\`, {
    next: { tags: ['blog-posts', \`post-\${slug}\`] },
  });
  return res.json();
}

// app/api/revalidate/route.ts
import { revalidateTag, revalidatePath } from 'next/cache';
import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  const { tag, path, secret } = await req.json();
  if (secret !== process.env.REVALIDATE_SECRET) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }
  if (tag) revalidateTag(tag);         // Invalidate by tag
  if (path) revalidatePath(path);      // Invalidate by path
  return Response.json({ revalidated: true });
}

// 3. React cache() — deduplicate within a render
import { cache } from 'react';

export const getUser = cache(async (id: string) => {
  // Called 10 times? Only 1 DB query per render
  return db.user.findUnique({ where: { id } });
});

// 4. unstable_cache — persistent server-side caching
import { unstable_cache } from 'next/cache';

const getCachedStats = unstable_cache(
  async () => db.order.aggregate({ _sum: { total: true } }),
  ['dashboard-stats'],
  { revalidate: 300, tags: ['orders'] }
);`}
        </pre>

        <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 8, padding: '12px 16px', marginTop: 16 }}>
          <strong>Caching Layer Reference:</strong>
          <ul style={{ margin: '8px 0 0', paddingLeft: 20 }}>
            <li><strong>Request Memoization</strong> — Per-render, automatic for fetch</li>
            <li><strong>Data Cache</strong> — Persistent, controlled by <code>revalidate</code> / tags</li>
            <li><strong>Full Route Cache</strong> — Static route HTML + RSC payload on disk</li>
            <li><strong>Router Cache</strong> — Client-side, cleared on page refresh</li>
          </ul>
        </div>
      </section>

      {/* Section 7: Bundle Analysis */}
      <section style={{ marginBottom: 48 }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, borderBottom: '2px solid #e2e8f0', paddingBottom: 8, marginBottom: 20 }}>7. Bundle Analysis</h2>
        <p>Large JavaScript bundles are the primary cause of slow INP and TTI. Use @next/bundle-analyzer to visualize what's in your bundle and find opportunities to reduce size.</p>

        <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem', lineHeight: 1.6 }}>
{`# Install bundle analyzer
npm install @next/bundle-analyzer

# next.config.js
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer({
  // your config
});

# Generate report
ANALYZE=true npm run build
# Opens interactive treemap in browser`}
        </pre>

        <h3 style={{ fontSize: '1.15rem', fontWeight: 600, marginTop: 24, marginBottom: 12 }}>Common Bundle Bloat &amp; Fixes</h3>
        <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem', lineHeight: 1.6 }}>
{`// BAD: Imports entire lodash (70KB+)
import _ from 'lodash';
const result = _.debounce(fn, 300);

// GOOD: Named import (tree-shaken, ~2KB)
import { debounce } from 'lodash-es';

// BAD: Full date library (moment.js ~67KB)
import moment from 'moment';

// GOOD: Lightweight alternative (~5KB)
import { format } from 'date-fns';

// BAD: Full icon library (~500KB)
import { FaHome } from 'react-icons/fa';

// GOOD: Direct import (~1KB)
import FaHome from 'react-icons/fa/FaHome';

// Verify tree-shaking in package.json
// Look for: "sideEffects": false

// Check per-page bundle sizes
next build 2>&1 | grep -E "Route|Size|First Load"

// Dynamic import heavy editor
const RichEditor = dynamic(() => import('@/components/RichEditor'), {
  ssr: false,
  loading: () => <Textarea />,
});`}
        </pre>
      </section>

      {/* Section 8: Static Generation */}
      <section style={{ marginBottom: 48 }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, borderBottom: '2px solid #e2e8f0', paddingBottom: 8, marginBottom: 20 }}>8. Static Generation &amp; ISR</h2>
        <p>Static pages are served from a CDN instantly. ISR allows you to update static content without a full rebuild — the best of both worlds for content-heavy sites.</p>

        <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem', lineHeight: 1.6 }}>
{`// app/blog/[slug]/page.tsx

// Generate static paths at build time
export async function generateStaticParams() {
  const posts = await db.post.findMany({ select: { slug: true } });
  return posts.map((post) => ({ slug: post.slug }));
}

// ISR: revalidate every 60 seconds (page-level)
export const revalidate = 60;

// Or: opt-out of caching entirely
export const dynamic = 'force-dynamic'; // SSR every request

// On-demand ISR via webhook (e.g., CMS publish event)
// app/api/revalidate/route.ts
import { revalidatePath, revalidateTag } from 'next/cache';

export async function POST(req: Request) {
  const { slug } = await req.json();

  revalidatePath(\`/blog/\${slug}\`);         // Specific path
  revalidatePath('/blog', 'page');           // Blog index
  revalidateTag('blog-posts');              // All tagged fetches

  return Response.json({ success: true });
}

// generateStaticParams with fallback behavior
// next.config.js
module.exports = {
  // dynamicParams: true  — generate missing params on-demand (default)
  // dynamicParams: false — return 404 for params not in generateStaticParams
};`}
        </pre>

        <div style={{ background: '#f0fdf4', borderLeft: '4px solid #22c55e', borderRadius: 8, padding: '12px 16px', marginTop: 16 }}>
          <strong>ISR vs SSR decision:</strong> Choose ISR when data changes infrequently (blog posts, product listings, documentation). Choose SSR (<code>dynamic = 'force-dynamic'</code>) for real-time data (stock prices, live scores, user-specific dashboards).
        </div>
      </section>

      {/* Section 9: Edge Runtime */}
      <section style={{ marginBottom: 48 }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, borderBottom: '2px solid #e2e8f0', paddingBottom: 8, marginBottom: 20 }}>9. Edge Runtime</h2>
        <p>Edge Runtime executes code at CDN edge nodes worldwide with sub-millisecond cold starts. It's ideal for middleware, auth checks, geolocation routing, and latency-sensitive API routes.</p>

        <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem', lineHeight: 1.6 }}>
{`// middleware.ts — runs on Edge by default
import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';  // Edge-compatible JWT library

export const config = {
  matcher: ['/dashboard/:path*', '/api/private/:path*'],
};

export async function middleware(req: NextRequest) {
  const token = req.cookies.get('auth-token')?.value;

  // Auth check at the edge — no origin server round-trip
  if (!token) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  try {
    await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET));
    return NextResponse.next();
  } catch {
    return NextResponse.redirect(new URL('/login', req.url));
  }
}

// Geolocation-based routing
export function middleware(req: NextRequest) {
  const country = req.geo?.country ?? 'US';
  const locale = countryToLocale[country] ?? 'en';

  // Rewrite to locale-specific page
  return NextResponse.rewrite(new URL(\`/\${locale}\${req.nextUrl.pathname}\`, req.url));
}

// Edge API route with streaming response
export const runtime = 'edge'; // opt into Edge runtime

export async function GET() {
  const stream = new ReadableStream({
    async start(controller) {
      for (const chunk of generateChunks()) {
        controller.enqueue(new TextEncoder().encode(chunk));
        await new Promise(r => setTimeout(r, 100));
      }
      controller.close();
    },
  });

  return new Response(stream, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}`}
        </pre>

        <div style={{ background: '#fff7ed', borderLeft: '4px solid #f97316', borderRadius: 8, padding: '12px 16px', marginTop: 16 }}>
          <strong>Edge Limitations:</strong> No Node.js built-ins (fs, crypto, path), no native addons, 1-4MB size limit, no long-running connections. Use Node.js runtime for database clients (Prisma, pg), file operations, or Node-specific packages.
        </div>
      </section>

      {/* Section 10: Database Query Optimization */}
      <section style={{ marginBottom: 48 }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, borderBottom: '2px solid #e2e8f0', paddingBottom: 8, marginBottom: 20 }}>10. Database Query Optimization</h2>
        <p>Slow database queries are a common bottleneck in Next.js apps. Proper connection pooling, query batching, and N+1 prevention are essential for production performance.</p>

        <h3 style={{ fontSize: '1.15rem', fontWeight: 600, marginTop: 24, marginBottom: 12 }}>Connection Pooling</h3>
        <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem', lineHeight: 1.6 }}>
{`// lib/db.ts — singleton Prisma client (prevents connection exhaustion)
import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const db =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: process.env.NODE_ENV === 'development'
      ? ['query', 'warn', 'error']
      : ['warn', 'error'],
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db;

// For serverless/edge: use connection pooler (PgBouncer, Prisma Accelerate)
// DATABASE_URL="postgresql://user:pass@pooler.example.com:6543/db?pgbouncer=true"
// DIRECT_URL="postgresql://user:pass@db.example.com:5432/db"  (for migrations)`}
        </pre>

        <h3 style={{ fontSize: '1.15rem', fontWeight: 600, marginTop: 24, marginBottom: 12 }}>N+1 Prevention &amp; Query Optimization</h3>
        <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem', lineHeight: 1.6 }}>
{`// BAD: N+1 problem — 1 query for posts + N queries for authors
const posts = await db.post.findMany();
const postsWithAuthors = await Promise.all(
  posts.map(async (post) => ({
    ...post,
    author: await db.user.findUnique({ where: { id: post.authorId } }),
  }))
);

// GOOD: Single query with JOIN via Prisma include
const posts = await db.post.findMany({
  include: {
    author: {
      select: { id: true, name: true, avatar: true }, // Only needed fields
    },
    tags: true,
    _count: { select: { comments: true } },  // Count without loading records
  },
  where: { published: true },
  orderBy: { createdAt: 'desc' },
  take: 20,
  skip: (page - 1) * 20,
});

// Parallel queries — avoid sequential awaits
const [posts, totalCount, categories] = await Promise.all([
  db.post.findMany({ where: { published: true }, take: 20 }),
  db.post.count({ where: { published: true } }),
  db.category.findMany(),
]);

// Query logging in development
// Enable in Prisma client: log: ['query']
// Look for: duration > 100ms, queries with no index

// Raw SQL for complex queries
const result = await db.$queryRaw\`
  SELECT p.id, p.title, COUNT(c.id) as comment_count
  FROM posts p
  LEFT JOIN comments c ON c.post_id = p.id
  WHERE p.published = true
  GROUP BY p.id
  HAVING COUNT(c.id) > 5
  ORDER BY comment_count DESC
  LIMIT 10
\`;`}
        </pre>

        <h3 style={{ fontSize: '1.15rem', fontWeight: 600, marginTop: 24, marginBottom: 12 }}>Quick Tool: Format &amp; Validate Your JSON API Responses</h3>
        <p>
          Use the{' '}
          <Link href="https://viadreams.cc/en/tools/json-formatter" style={{ color: '#0ea5e9', textDecoration: 'underline' }}>
            JSON Formatter
          </Link>{' '}
          to inspect, validate, and pretty-print your API responses during development and debugging.
        </p>
      </section>

      {/* Section: Middleware & Security Headers */}
      <section style={{ marginBottom: 48 }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, borderBottom: '2px solid #e2e8f0', paddingBottom: 8, marginBottom: 20 }}>Middleware &amp; Security Headers</h2>
        <p>Middleware runs before every matching request and is the right place for auth checks, redirects, rewrites, and security headers. Adding HTTP security headers improves both security and Lighthouse scores.</p>

        <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem', lineHeight: 1.6 }}>
{`// next.config.js — security headers (affects all routes)
const securityHeaders = [
  { key: 'X-DNS-Prefetch-Control', value: 'on' },
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'origin-when-cross-origin' },
  {
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' *.googletagmanager.com",
      "style-src 'self' 'unsafe-inline' fonts.googleapis.com",
      "font-src 'self' fonts.gstatic.com",
      "img-src 'self' data: blob: *.unsplash.com",
      "connect-src 'self' vitals.vercel-insights.com",
    ].join('; '),
  },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
];

module.exports = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ];
  },
};`}
        </pre>

        <h3 style={{ fontSize: '1.15rem', fontWeight: 600, marginTop: 24, marginBottom: 12 }}>Middleware Performance Patterns</h3>
        <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem', lineHeight: 1.6 }}>
{`// middleware.ts — efficient request matching
import { NextRequest, NextResponse } from 'next/server';

export const config = {
  // Only run on specific paths — avoid running on all routes
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};

export async function middleware(req: NextRequest) {
  const response = NextResponse.next();

  // A/B testing via cookie-based routing
  const bucket = req.cookies.get('ab-bucket')?.value;
  if (!bucket) {
    const newBucket = Math.random() < 0.5 ? 'a' : 'b';
    response.cookies.set('ab-bucket', newBucket, { maxAge: 60 * 60 * 24 * 7 });
  }

  // Locale detection and redirect
  const acceptLanguage = req.headers.get('accept-language') ?? '';
  const locale = detectLocale(acceptLanguage);
  if (locale !== 'en' && !req.nextUrl.pathname.startsWith('/en')) {
    return NextResponse.redirect(
      new URL(\`/\${locale}\${req.nextUrl.pathname}\`, req.url)
    );
  }

  return response;
}`}
        </pre>
      </section>

      {/* Section: TypeScript & Build Optimization */}
      <section style={{ marginBottom: 48 }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, borderBottom: '2px solid #e2e8f0', paddingBottom: 8, marginBottom: 20 }}>TypeScript &amp; Build Optimization</h2>
        <p>Next.js build performance affects developer iteration speed. These configuration tweaks can dramatically reduce build times in large projects.</p>

        <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem', lineHeight: 1.6 }}>
{`// next.config.js — production build optimizations
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Reduce build output size
  output: 'standalone',           // Self-contained for Docker deployments

  // Experimental features for performance
  experimental: {
    optimizePackageImports: [     // Tree-shake package imports automatically
      'lucide-react',
      '@radix-ui/react-icons',
      'date-fns',
    ],
    turbo: {                      // Turbopack for dev (Next.js 14+)
      resolveAlias: {
        'lodash': 'lodash-es',   // Replace CJS with ESM version
      },
    },
  },

  // Compiler options
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production'
      ? { exclude: ['error', 'warn'] }  // Keep error/warn in prod
      : false,
  },

  // Webpack customization
  webpack: (config, { isServer, dev }) => {
    if (!dev && !isServer) {
      // Replace React with Preact in production (smaller bundle)
      // Object.assign(config.resolve.alias, { react: 'preact/compat', ... });
    }
    return config;
  },

  // Headers for static assets caching
  async headers() {
    return [
      {
        source: '/static/(.*)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
    ];
  },
};

module.exports = nextConfig;`}
        </pre>

        <h3 style={{ fontSize: '1.15rem', fontWeight: 600, marginTop: 24, marginBottom: 12 }}>Parallel Routes &amp; Intercepting Routes</h3>
        <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem', lineHeight: 1.6 }}>
{`// Parallel Routes — render multiple pages in the same layout
// app/layout.tsx
export default function Layout({
  children,
  modal,          // @modal slot
  sidebar,        // @sidebar slot
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
  sidebar: React.ReactNode;
}) {
  return (
    <div>
      {sidebar}
      {children}
      {modal}   {/* Renders independently, can have its own loading/error */}
    </div>
  );
}

// app/@modal/photo/[id]/page.tsx
// Intercepting route — show modal on client nav, full page on direct access
// app/(.)photo/[id]/page.tsx  — intercept same level
// app/(..)photo/[id]/page.tsx — intercept one level up`}
        </pre>

        <div style={{ background: '#f0f9ff', borderLeft: '4px solid #0ea5e9', borderRadius: 8, padding: '12px 16px', marginTop: 16 }}>
          <strong>Build Time Tips:</strong> Use <code>next build</code> with <code>--debug</code> to identify slow pages. Set <code>NODE_OPTIONS='--max-old-space-size=4096'</code> for large projects. Use <code>generateStaticParams</code> selectively — generating 10,000+ static params at build time significantly increases build duration.
        </div>
      </section>

      {/* Section: React Performance Patterns */}
      <section style={{ marginBottom: 48 }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, borderBottom: '2px solid #e2e8f0', paddingBottom: 8, marginBottom: 20 }}>React Performance Patterns</h2>
        <p>Excessive re-renders are the primary cause of poor INP scores in Next.js Client Components. Use memoization, state colocation, and virtualization to keep interactions fast.</p>

        <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem', lineHeight: 1.6 }}>
{`'use client';
import { memo, useMemo, useCallback, useTransition, useState } from 'react';

// memo — skip re-render if props unchanged
const ProductCard = memo(function ProductCard({ product }: { product: Product }) {
  return <div>{product.name}</div>;
});

// useMemo — expensive computation
function ProductList({ products, filters }: Props) {
  const filteredProducts = useMemo(
    () => products.filter(p => matchesFilters(p, filters)),
    [products, filters]  // Only recompute when these change
  );
  return <>{filteredProducts.map(p => <ProductCard key={p.id} product={p} />)}</>;
}

// useCallback — stable function reference for memo'd children
function Parent() {
  const [count, setCount] = useState(0);
  const handleClick = useCallback(() => {
    setCount(c => c + 1);
  }, []);  // Stable reference — ProductCard won't re-render

  return <ProductCard onAdd={handleClick} />;
}

// useTransition — mark non-urgent state updates (keeps UI responsive)
function SearchPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isPending, startTransition] = useTransition();

  function handleSearch(value: string) {
    setQuery(value);  // Urgent: update input immediately
    startTransition(() => {
      setResults(searchProducts(value));  // Non-urgent: can be interrupted
    });
  }

  return (
    <div>
      <input value={query} onChange={e => handleSearch(e.target.value)} />
      {isPending ? <Spinner /> : <Results data={results} />}
    </div>
  );
}

// Virtual list for long lists (react-virtual)
import { useVirtualizer } from '@tanstack/react-virtual';

function VirtualList({ items }: { items: Item[] }) {
  const parentRef = useRef<HTMLDivElement>(null);
  const virtualizer = useVirtualizer({
    count: items.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 72,  // Row height estimate
  });

  return (
    <div ref={parentRef} style={{ height: 600, overflow: 'auto' }}>
      <div style={{ height: virtualizer.getTotalSize() }}>
        {virtualizer.getVirtualItems().map(vRow => (
          <div key={vRow.key} style={{ position: 'absolute', top: vRow.start }}>
            <ItemRow item={items[vRow.index]} />
          </div>
        ))}
      </div>
    </div>
  );
}`}
        </pre>
      </section>

      {/* Key Takeaways */}
      <section style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 10, padding: '24px 28px', marginBottom: 48 }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: 16, marginTop: 0 }}>Key Takeaways</h2>
        <ul style={{ paddingLeft: 24, margin: 0 }}>
          <li style={{ marginBottom: 10 }}>Measure Core Web Vitals with real user monitoring — Lab data (Lighthouse) and field data (CrUX) often differ significantly.</li>
          <li style={{ marginBottom: 10 }}>Always add <code>priority</code> to your LCP image and use <code>sizes</code> prop on all responsive images to prevent downloading oversized assets.</li>
          <li style={{ marginBottom: 10 }}>Use next/font with <code>display: swap</code> to eliminate font-related CLS — fonts are self-hosted by Next.js with zero external network requests.</li>
          <li style={{ marginBottom: 10 }}>Default to Server Components; only add <code>use client</code> when you need interactivity or browser APIs. Push the boundary as deep as possible.</li>
          <li style={{ marginBottom: 10 }}>Use <code>Promise.all</code> for parallel data fetching in Server Components — sequential awaits create waterfalls that multiply latency.</li>
          <li style={{ marginBottom: 10 }}>Understand all four caching layers (Memoization, Data Cache, Route Cache, Router Cache) to avoid stale data bugs and unnecessary cache misses.</li>
          <li style={{ marginBottom: 10 }}>Run <code>ANALYZE=true npm run build</code> regularly to catch bundle bloat before it ships to users. Replace moment.js, lodash (CJS), and full icon libraries.</li>
          <li style={{ marginBottom: 10 }}>Use a singleton Prisma client and a connection pooler (PgBouncer/Prisma Accelerate) in serverless/edge environments to prevent connection pool exhaustion.</li>
        </ul>
      </section>

      {/* Section: Common Performance Anti-patterns */}
      <section style={{ marginBottom: 48 }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, borderBottom: '2px solid #e2e8f0', paddingBottom: 8, marginBottom: 20 }}>Common Performance Anti-patterns</h2>
        <p>Avoid these common mistakes that degrade Next.js performance. Each one has a specific diagnosis and recommended fix.</p>

        <h3 style={{ fontSize: '1.15rem', fontWeight: 600, marginTop: 24, marginBottom: 12 }}>1. Fetching Data in Client Components Unnecessarily</h3>
        <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem', lineHeight: 1.6 }}>
{`// BAD: Client component doing data fetch (adds waterfall + JS bundle cost)
'use client';
import { useEffect, useState } from 'react';

export function ProductList() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetch('/api/products').then(r => r.json()).then(setProducts);
  }, []);
  return <ul>{products.map(p => <li key={p.id}>{p.name}</li>)}</ul>;
}

// GOOD: Server Component fetches data (no client JS, no waterfall)
// app/products/page.tsx — NO 'use client'
export default async function ProductList() {
  const products = await db.product.findMany();
  return <ul>{products.map(p => <li key={p.id}>{p.name}</li>)}</ul>;
}`}
        </pre>

        <h3 style={{ fontSize: '1.15rem', fontWeight: 600, marginTop: 24, marginBottom: 12 }}>2. Not Using Loading UI / Streaming</h3>
        <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem', lineHeight: 1.6 }}>
{`// BAD: Entire page waits for slowest data source
export default async function Dashboard() {
  const [stats, feed, alerts] = await Promise.all([
    getStats(),   // 50ms
    getFeed(),    // 800ms — whole page blocked
    getAlerts(),  // 200ms
  ]);
  return <div />;
}

// GOOD: Stream each section independently
export default async function Dashboard() {
  const stats = await getStats(); // Fast — load synchronously
  return (
    <div>
      <Stats data={stats} />
      <Suspense fallback={<FeedSkeleton />}>
        <Feed />      {/* Streams in when ready */}
      </Suspense>
      <Suspense fallback={<AlertsSkeleton />}>
        <Alerts />    {/* Streams in when ready */}
      </Suspense>
    </div>
  );
}

// Also add app/dashboard/loading.tsx for instant loading state
export default function Loading() {
  return <DashboardSkeleton />;
}`}
        </pre>

        <h3 style={{ fontSize: '1.15rem', fontWeight: 600, marginTop: 24, marginBottom: 12 }}>3. Missing generateStaticParams for Dynamic Routes</h3>
        <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem', lineHeight: 1.6 }}>
{`// BAD: Dynamic route without generateStaticParams
// Every request hits the server — no static optimization
export default async function BlogPost({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug);
  return <Article post={post} />;
}

// GOOD: Pre-render known slugs at build time
export async function generateStaticParams() {
  const posts = await db.post.findMany({
    where: { published: true },
    select: { slug: true },
  });
  return posts.map(({ slug }) => ({ slug }));
}

// With ISR for fresh content
export const revalidate = 3600; // Revalidate every hour

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug);
  if (!post) notFound();
  return <Article post={post} />;
}`}
        </pre>

        <h3 style={{ fontSize: '1.15rem', fontWeight: 600, marginTop: 24, marginBottom: 12 }}>4. Forgetting to Memoize Expensive Operations</h3>
        <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem', lineHeight: 1.6 }}>
{`// BAD: Same DB query called 5 times in one render tree
// Each Server Component fetches independently

// GOOD: Use React cache() for request-level deduplication
import { cache } from 'react';

export const getUser = cache(async (id: string) => {
  console.log('DB query for user:', id); // Only fires ONCE per render
  return db.user.findUnique({ where: { id } });
});

// Used in multiple Server Components — only 1 query total
// UserCard.tsx: const user = await getUser(id);
// UserBadge.tsx: const user = await getUser(id);
// UserMenu.tsx:  const user = await getUser(id);

// BAD: Creating heavy regex/computed values on every render
function Component({ text }: { text: string }) {
  const pattern = new RegExp(complexPattern, 'gi'); // Recreated every render!
  return <div>{text.replace(pattern, '<mark>$1</mark>')}</div>;
}

// GOOD: useMemo for expensive Client Component computations
function Component({ text }: { text: string }) {
  const highlighted = useMemo(
    () => text.replace(new RegExp(complexPattern, 'gi'), '<mark>$1</mark>'),
    [text]
  );
  return <div dangerouslySetInnerHTML={{ __html: highlighted }} />;
}`}
        </pre>
      </section>

      {/* Section: Monitoring & Analytics */}
      <section style={{ marginBottom: 48 }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, borderBottom: '2px solid #e2e8f0', paddingBottom: 8, marginBottom: 20 }}>Monitoring Performance in Production</h2>
        <p>Lab metrics (Lighthouse) show potential issues; field metrics (real user monitoring) show what users actually experience. Use both to prioritize improvements.</p>

        <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem', lineHeight: 1.6 }}>
{`// app/providers.tsx — Vercel Speed Insights + Analytics
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/react';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <SpeedInsights />  {/* Real user Core Web Vitals */}
      <Analytics />      {/* Page view analytics */}
    </>
  );
}

// Custom performance observer for non-Vercel deployments
'use client';
import { useEffect } from 'react';

export function PerformanceMonitor() {
  useEffect(() => {
    // Observe Long Tasks (INP indicator)
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.duration > 50) {  // Tasks > 50ms can cause jank
          console.warn('Long task detected:', entry.duration + 'ms');
          // Send to your monitoring service
        }
      }
    });
    observer.observe({ entryTypes: ['longtask'] });
    return () => observer.disconnect();
  }, []);

  return null;
}

// OpenTelemetry tracing for server-side performance
// instrumentation.ts (Next.js 13.4+)
export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    const { NodeSDK } = await import('@opentelemetry/sdk-node');
    const { OTLPTraceExporter } = await import('@opentelemetry/exporter-trace-otlp-http');
    const sdk = new NodeSDK({
      traceExporter: new OTLPTraceExporter({ url: process.env.OTEL_ENDPOINT }),
    });
    sdk.start();
  }
}`}
        </pre>
      </section>

      {/* FAQ Section */}
      <section style={{ marginBottom: 48 }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, borderBottom: '2px solid #e2e8f0', paddingBottom: 8, marginBottom: 20 }}>Frequently Asked Questions</h2>

        {faqSchema.mainEntity.map((faq, idx) => (
          <div key={idx} style={{ marginBottom: 28 }}>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 600, marginBottom: 8, color: '#0f172a' }}>{faq.name}</h3>
            <p style={{ margin: 0, color: '#475569' }}>{faq.acceptedAnswer.text}</p>
          </div>
        ))}
      </section>
    </article>
  );
}
