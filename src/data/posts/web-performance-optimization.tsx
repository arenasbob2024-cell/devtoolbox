'use client';

import Link from 'next/link';

export default function WebPerformanceOptimization({ lang }: { lang: string }) {
  return (
    <>
      <h2>Why Web Performance Matters</h2>
      <p>
        <strong>Web performance</strong> directly impacts user experience, conversion rates, and search engine rankings. Google uses Core Web Vitals as ranking signals, and studies consistently show that slow pages lead to higher bounce rates. A one-second delay in page load time can reduce conversions by 7%, and 53% of mobile users abandon pages that take longer than 3 seconds to load.
      </p>
      <p>
        This guide covers the essential metrics, tools, and optimization techniques every developer needs to build fast websites in 2026, from Core Web Vitals to advanced performance patterns.
      </p>

      <h2>Core Web Vitals Explained</h2>
      <p>
        Core Web Vitals are a set of specific metrics that Google considers important for user experience. They measure loading performance, interactivity, and visual stability.
      </p>
      <pre><code className="language-text">{`Core Web Vitals (2026):

Metric  Full Name                    What It Measures        Good    Needs Work  Poor
------  ---------                    ----------------        ----    ----------  ----
LCP     Largest Contentful Paint     Loading performance     <2.5s   2.5-4.0s    >4.0s
INP     Interaction to Next Paint    Responsiveness          <200ms  200-500ms   >500ms
CLS     Cumulative Layout Shift      Visual stability        <0.1    0.1-0.25    >0.25

Additional Important Metrics:
  FCP     First Contentful Paint     First visible content   <1.8s
  TTFB    Time to First Byte        Server response time    <800ms
  TBT     Total Blocking Time       Main thread blocking    <200ms
  SI      Speed Index                Visual progress         <3.4s`}</code></pre>

      <h2>Measuring Performance</h2>
      <p>
        Before optimizing, you need to measure. Use these tools to understand your current performance:
      </p>
      <pre><code className="language-text">{`Performance Measurement Tools:

Lab Tools (synthetic):
  - Lighthouse (Chrome DevTools)     -- Audit scores + recommendations
  - WebPageTest.org                  -- Detailed waterfall analysis
  - PageSpeed Insights               -- Google's online tool
  - Chrome DevTools Performance tab  -- Flame charts, timing

Field Tools (real user data):
  - Chrome UX Report (CrUX)          -- Real Chrome user data
  - web-vitals JS library            -- Measure in production
  - Google Search Console            -- Core Web Vitals report
  - Vercel Speed Insights            -- Real-time monitoring`}</code></pre>

      <h3>Measuring with JavaScript</h3>
      <pre><code className="language-javascript">{`// Using the web-vitals library
// npm install web-vitals
import { onCLS, onINP, onLCP, onFCP, onTTFB } from 'web-vitals';

function sendToAnalytics(metric) {
  const body = JSON.stringify({
    name: metric.name,
    value: metric.value,
    rating: metric.rating,  // "good", "needs-improvement", "poor"
    delta: metric.delta,
    id: metric.id,
    navigationType: metric.navigationType,
  });

  // Use sendBeacon for reliability
  if (navigator.sendBeacon) {
    navigator.sendBeacon('/api/analytics', body);
  } else {
    fetch('/api/analytics', { body, method: 'POST', keepalive: true });
  }
}

onCLS(sendToAnalytics);
onINP(sendToAnalytics);
onLCP(sendToAnalytics);
onFCP(sendToAnalytics);
onTTFB(sendToAnalytics);

// Performance Observer API for custom metrics
const observer = new PerformanceObserver((list) => {
  for (const entry of list.getEntries()) {
    console.log(\`\${entry.name}: \${entry.duration}ms\`);
  }
});

observer.observe({ entryTypes: ['resource', 'longtask', 'paint'] });`}</code></pre>

      <h2>Optimizing Largest Contentful Paint (LCP)</h2>
      <p>
        LCP measures when the largest visible content element finishes rendering. Common LCP elements are hero images, large text blocks, and video poster images.
      </p>
      <pre><code className="language-html">{`<!-- 1. Preload critical resources -->
<head>
  <!-- Preload hero image -->
  <link rel="preload" as="image" href="/hero.webp"
        fetchpriority="high" />

  <!-- Preload critical fonts -->
  <link rel="preload" as="font" type="font/woff2"
        href="/fonts/main.woff2" crossorigin />

  <!-- Preconnect to external origins -->
  <link rel="preconnect" href="https://cdn.example.com" />
  <link rel="dns-prefetch" href="https://analytics.example.com" />
</head>

<!-- 2. Optimize images -->
<img
  src="/hero.webp"
  srcset="/hero-400.webp 400w,
          /hero-800.webp 800w,
          /hero-1200.webp 1200w"
  sizes="(max-width: 768px) 100vw, 50vw"
  width="1200"
  height="600"
  alt="Hero image"
  fetchpriority="high"
  decoding="async"
/>

<!-- 3. Lazy load below-fold images -->
<img src="/below-fold.webp" loading="lazy" decoding="async"
     width="800" height="400" alt="..." />`}</code></pre>

      <pre><code className="language-javascript">{`// 4. Optimize server response (TTFB)
// Next.js: Use ISR or static generation
export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map(post => ({ slug: post.slug }));
}

// 5. Inline critical CSS
// next.config.js
module.exports = {
  experimental: {
    optimizeCss: true,  // Automatically inlines critical CSS
  },
};

// 6. Avoid render-blocking resources
// Move non-critical JS to defer/async
// <script src="analytics.js" defer></script>
// <script src="widget.js" async></script>`}</code></pre>

      <h2>Optimizing Interaction to Next Paint (INP)</h2>
      <p>
        INP measures how quickly the page responds to user interactions (clicks, taps, key presses). It replaced First Input Delay (FID) as a Core Web Vital in March 2024.
      </p>
      <pre><code className="language-javascript">{`// 1. Break up long tasks with scheduler
// Use scheduler.yield() (Chrome 129+)
async function processLargeList(items) {
  for (let i = 0; i < items.length; i++) {
    processItem(items[i]);

    // Yield to the main thread every 50 items
    if (i % 50 === 0 && 'scheduler' in globalThis) {
      await scheduler.yield();
    }
  }
}

// 2. Debounce expensive event handlers
function SearchInput() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  // Debounce search to avoid blocking main thread
  const debouncedSearch = useMemo(
    () => debounce((q) => {
      const filtered = performExpensiveSearch(q);
      setResults(filtered);
    }, 150),
    []
  );

  return (
    <input
      value={query}
      onChange={e => {
        setQuery(e.target.value);     // Update immediately
        debouncedSearch(e.target.value); // Debounce expensive work
      }}
    />
  );
}

// 3. Use requestIdleCallback for non-urgent work
function initNonCriticalFeatures() {
  requestIdleCallback(() => {
    loadAnalytics();
    initChatWidget();
    prefetchNextPage();
  });
}

// 4. Web Workers for CPU-intensive tasks
// worker.js
self.onmessage = (event) => {
  const result = heavyComputation(event.data);
  self.postMessage(result);
};

// main.js
const worker = new Worker('/worker.js');
worker.postMessage(largeDataset);
worker.onmessage = (e) => {
  updateUI(e.data);  // Back on main thread
};`}</code></pre>

      <h2>Optimizing Cumulative Layout Shift (CLS)</h2>
      <p>
        CLS measures unexpected layout shifts during the page lifecycle. Layout shifts frustrate users by moving content they are trying to interact with.
      </p>
      <pre><code className="language-html">{`<!-- 1. Always set width and height on images/videos -->
<img src="photo.webp" width="800" height="600" alt="..." />
<video width="1280" height="720" poster="thumb.webp">...</video>

<!-- 2. Use aspect-ratio for responsive containers -->
<style>
  .video-container {
    aspect-ratio: 16 / 9;
    width: 100%;
    background: #f0f0f0;  /* placeholder color */
  }

  .ad-slot {
    min-height: 250px;  /* Reserve space for ads */
  }
</style>

<!-- 3. Reserve space for dynamic content -->
<div class="ad-slot" style="min-height: 250px;">
  <!-- Ad loads here without shifting -->
</div>

<!-- 4. Avoid inserting content above existing content -->
<!-- BAD: Banner pushes everything down -->
<!-- GOOD: Use fixed/sticky positioning for banners -->`}</code></pre>

      <pre><code className="language-css">{`/* 5. Font display swap to prevent invisible text */
@font-face {
  font-family: 'CustomFont';
  src: url('/fonts/custom.woff2') format('woff2');
  font-display: swap;  /* Show fallback immediately, swap when loaded */
}

/* 6. Contain layout for dynamic elements */
.dynamic-content {
  contain: layout;  /* Isolate layout changes */
}

/* 7. Use transform animations instead of layout properties */
/* BAD */
.animate-bad {
  transition: top 0.3s, left 0.3s, width 0.3s;
}

/* GOOD */
.animate-good {
  transition: transform 0.3s, opacity 0.3s;
  will-change: transform;
}`}</code></pre>

      <h2>JavaScript Bundle Optimization</h2>
      <pre><code className="language-javascript">{`// 1. Code splitting with dynamic imports
// Next.js automatic code splitting
import dynamic from 'next/dynamic';

const HeavyChart = dynamic(() => import('./HeavyChart'), {
  loading: () => <div>Loading chart...</div>,
  ssr: false,  // Don't render on server
});

// React.lazy for other frameworks
const AdminPanel = React.lazy(() => import('./AdminPanel'));

function App() {
  return (
    <Suspense fallback={<Spinner />}>
      {isAdmin && <AdminPanel />}
    </Suspense>
  );
}

// 2. Tree shaking - import only what you need
// BAD: imports entire lodash (70KB+)
import _ from 'lodash';
_.debounce(fn, 300);

// GOOD: imports only debounce (2KB)
import debounce from 'lodash/debounce';
debounce(fn, 300);

// BEST: Use native or tiny alternatives
const debounce = (fn, ms) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), ms);
  };
};`}</code></pre>

      <h2>Image Optimization Checklist</h2>
      <pre><code className="language-text">{`Image Optimization Checklist:

Format Selection:
  [x] Use WebP for photos (30% smaller than JPEG)
  [x] Use AVIF for best compression (50% smaller than JPEG)
  [x] Use SVG for icons and logos
  [x] Use PNG only when transparency is needed with sharp edges

Sizing:
  [x] Serve responsive images with srcset
  [x] Never serve images larger than display size
  [x] Use width and height attributes to prevent CLS

Loading:
  [x] Lazy load below-fold images (loading="lazy")
  [x] Prioritize hero/LCP images (fetchpriority="high")
  [x] Use blur placeholders for perceived performance

Delivery:
  [x] Serve from CDN (Cloudflare, Vercel, AWS CloudFront)
  [x] Use image CDN for on-the-fly optimization (Cloudinary, imgix)
  [x] Enable HTTP/2 or HTTP/3
  [x] Set proper Cache-Control headers

Next.js Image Component (recommended):
  <Image
    src="/hero.jpg"
    width={1200}
    height={600}
    alt="Hero"
    priority        // For LCP images
    quality={85}
    placeholder="blur"
    blurDataURL="data:image/..."
  />`}</code></pre>

      <h2>Caching Strategies</h2>
      <pre><code className="language-text">{`Cache-Control Header Strategies:

Static assets (CSS, JS, images with hash):
  Cache-Control: public, max-age=31536000, immutable
  -> Cache for 1 year, never revalidate

HTML pages (dynamic content):
  Cache-Control: public, max-age=0, s-maxage=3600, stale-while-revalidate=86400
  -> CDN caches 1 hour, serves stale while revalidating

API responses:
  Cache-Control: private, max-age=60
  -> Browser caches 60 seconds, CDN doesn't cache

Sensitive data:
  Cache-Control: private, no-store
  -> Never cache anywhere

Service Worker Caching Strategies:
  Cache First     -> Static assets, fonts
  Network First   -> API data, HTML pages
  Stale While     -> Content that can be slightly stale
  Revalidate
  Cache Only      -> Offline fallback page
  Network Only    -> Real-time data, auth endpoints`}</code></pre>

      <h2>Performance Budget</h2>
      <pre><code className="language-text">{`Recommended Performance Budgets:

Resource Budgets:
  Total page weight:      < 1.5 MB (compressed)
  JavaScript:             < 300 KB (compressed)
  CSS:                    < 100 KB (compressed)
  Images:                 < 1 MB total
  Fonts:                  < 100 KB (2-3 weights max)
  Third-party scripts:    < 100 KB total

Timing Budgets:
  TTFB:                   < 600ms
  FCP:                    < 1.5s
  LCP:                    < 2.5s
  INP:                    < 200ms
  TTI (Time to Interactive): < 3.8s

Lighthouse Scores:
  Performance:            > 90
  Accessibility:          > 90
  Best Practices:         > 90
  SEO:                    > 90`}</code></pre>

      <h2>Quick Wins Checklist</h2>
      <pre><code className="language-text">{`Performance Quick Wins (highest impact, easiest to implement):

  [x] Enable compression (Brotli or gzip)
  [x] Use a CDN for static assets
  [x] Optimize and compress images (WebP/AVIF)
  [x] Set proper Cache-Control headers
  [x] Remove unused CSS and JavaScript
  [x] Defer non-critical JavaScript
  [x] Preconnect to required origins
  [x] Preload LCP image
  [x] Add width/height to all images
  [x] Use font-display: swap
  [x] Minimize third-party scripts
  [x] Enable HTTP/2 or HTTP/3
  [x] Lazy load below-fold images and iframes
  [x] Use responsive images with srcset
  [x] Minimize DOM size (< 1500 nodes ideal)`}</code></pre>

      <h2>Frequently Asked Questions</h2>

      <h3>What is a good Lighthouse score?</h3>
      <p>
        A Lighthouse Performance score of 90 or above is considered good. Scores between 50 and 89 need improvement, and below 50 is poor. Keep in mind that Lighthouse scores can vary between runs, so measure multiple times and focus on trends rather than individual scores. Real user data (field metrics) is more important than lab scores.
      </p>

      <h3>Does page speed affect SEO?</h3>
      <p>
        Yes. Google has used page speed as a ranking signal since 2010, and Core Web Vitals became ranking signals in 2021. While content relevance is still the primary ranking factor, page speed can be a tiebreaker between pages with similar content quality. Fast pages also reduce crawl budget waste and improve user engagement metrics.
      </p>

      <h3>How much should I invest in performance optimization?</h3>
      <p>
        Start with the quick wins -- image optimization, caching, and removing unused code typically deliver the biggest improvements with minimal effort. Beyond that, focus on the metrics that matter most for your specific user experience. A data dashboard with complex charts has different priorities than a content blog.
      </p>

      <h3>What is the most impactful single optimization?</h3>
      <p>
        Image optimization is typically the highest-impact single change. Converting to modern formats (WebP/AVIF), properly sizing images, and lazy loading below-fold images can reduce page weight by 50% or more and dramatically improve LCP.
      </p>

      <h2>Related Tools and Guides</h2>
      <ul>
        <li><Link href={`/${lang}/tools/image-compressor`}>Image Compressor</Link> - Compress images for the web</li>
        <li><Link href={`/${lang}/tools/css-minifier`}>CSS Minifier</Link> - Minify CSS for production</li>
        <li><Link href={`/${lang}/tools/javascript-minifier`}>JavaScript Minifier</Link> - Minify JS bundles</li>
        <li><Link href={`/${lang}/blog/css-animation-keyframes-examples`}>CSS Animation Guide</Link> - Performant animations</li>
        <li><Link href={`/${lang}/blog/meta-tags-guide`}>Meta Tags Guide</Link> - Complete meta tags reference</li>
      </ul>
    </>
  );
}
