export default function NextjsCachingStrategies() {
  return (
    <>
      <h2>Next.js Caching Strategies: ISR, SSG, Fetch Cache, and Data Cache Explained</h2>
      <p>
        Next.js has one of the most sophisticated caching systems of any web framework. Understanding
        when data is cached, how long it is cached, and how to invalidate it is essential for building
        fast, correct applications. This guide covers every caching layer in Next.js 14/15 — from
        static generation to on-demand revalidation — with practical examples and common pitfalls.
      </p>

      <h2>The Four Caching Layers</h2>
      <table>
        <thead>
          <tr>
            <th>Layer</th>
            <th>What It Caches</th>
            <th>Where</th>
            <th>Duration</th>
            <th>Invalidation</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>Request Memoization</td><td>fetch() return values</td><td>Server (per request)</td><td>Single request lifecycle</td><td>Automatic</td></tr>
          <tr><td>Data Cache</td><td>fetch() responses</td><td>Server (persistent)</td><td>Indefinite or time-based</td><td>revalidatePath / revalidateTag</td></tr>
          <tr><td>Full Route Cache</td><td>Rendered HTML + RSC payload</td><td>Server (persistent)</td><td>Until revalidation</td><td>revalidatePath / revalidateTag</td></tr>
          <tr><td>Router Cache</td><td>RSC payloads</td><td>Client (in-memory)</td><td>Session or time-based</td><td>router.refresh() / revalidatePath</td></tr>
        </tbody>
      </table>

      <h2>Static Site Generation (SSG)</h2>
      <p>
        SSG renders pages at build time. The HTML is generated once and served from a CDN. This is the
        fastest option but only works for content that does not change between builds.
      </p>
      <pre><code className="language-typescript">{`// app/blog/[slug]/page.tsx — fully static at build time

// Generate all possible paths at build time
export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

// This page is rendered once at build time
export default async function BlogPost({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getPost(params.slug);

  return (
    <article>
      <h1>{post.title}</h1>
      <time>{post.publishedAt}</time>
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
    </article>
  );
}

// Force static rendering
export const dynamic = 'force-static';
export const revalidate = false; // Never revalidate — pure SSG`}</code></pre>

      <h2>Incremental Static Regeneration (ISR)</h2>
      <p>
        ISR combines the speed of static pages with the freshness of dynamic content. Pages are served
        statically but regenerated in the background after a configurable time period.
      </p>
      <pre><code className="language-typescript">{`// app/products/[id]/page.tsx — ISR with time-based revalidation

// Revalidate this page every 60 seconds
export const revalidate = 60;

export default async function ProductPage({
  params,
}: {
  params: { id: string };
}) {
  // This fetch is cached for 60 seconds
  const product = await fetch(
    \`https://api.example.com/products/\${params.id}\`,
    { next: { revalidate: 60 } }
  ).then((r) => r.json());

  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <span>Price: \${product.price}</span>
    </div>
  );
}

// How ISR works:
// 1. First request → generates static page, serves it
// 2. Subsequent requests within 60s → serves cached static page
// 3. Request after 60s → serves stale page, triggers regeneration in background
// 4. Next request → serves newly generated page`}</code></pre>

      <h3>On-Demand ISR with revalidateTag</h3>
      <pre><code className="language-typescript">{`// app/products/[id]/page.tsx — tag-based revalidation
export default async function ProductPage({
  params,
}: {
  params: { id: string };
}) {
  const product = await fetch(
    \`https://api.example.com/products/\${params.id}\`,
    {
      next: {
        tags: [\`product-\${params.id}\`, 'products'],  // Tag for invalidation
      },
    }
  ).then((r) => r.json());

  return (
    <div>
      <h1>{product.name}</h1>
      <p>Stock: {product.stock}</p>
    </div>
  );
}

// app/api/revalidate/route.ts — webhook endpoint
import { revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const { tag, secret } = await request.json();

  // Verify webhook secret
  if (secret !== process.env.REVALIDATION_SECRET) {
    return NextResponse.json({ error: 'Invalid secret' }, { status: 401 });
  }

  // Revalidate specific product
  revalidateTag(tag);  // e.g., 'product-42'

  // Or revalidate all products
  // revalidateTag('products');

  return NextResponse.json({ revalidated: true, tag });
}

// app/api/revalidate-path/route.ts — path-based revalidation
import { revalidatePath } from 'next/cache';

export async function POST(request: NextRequest) {
  const { path } = await request.json();

  // Revalidate a specific path
  revalidatePath(path);             // e.g., '/products/42'

  // Revalidate all pages under a layout
  revalidatePath('/products', 'layout');

  // Revalidate everything
  revalidatePath('/', 'layout');

  return NextResponse.json({ revalidated: true });
}`}</code></pre>

      <h2>Fetch Cache Configuration</h2>
      <pre><code className="language-typescript">{`// Different caching strategies per fetch call

// Cache indefinitely (default in App Router)
const data = await fetch('https://api.example.com/config');

// Cache with time-based revalidation
const products = await fetch('https://api.example.com/products', {
  next: { revalidate: 300 },  // Revalidate every 5 minutes
});

// No cache — always fetch fresh data
const user = await fetch('https://api.example.com/user/me', {
  cache: 'no-store',  // Never cache
});

// Cache with tags for on-demand revalidation
const post = await fetch(\`https://api.example.com/posts/\${id}\`, {
  next: { tags: [\`post-\${id}\`, 'posts'] },
});

// Force cache (useful when dynamic is set on the route)
const settings = await fetch('https://api.example.com/settings', {
  cache: 'force-cache',
});`}</code></pre>

      <h3>Request Memoization</h3>
      <pre><code className="language-typescript">{`// Next.js automatically deduplicates identical fetch calls
// within a single request/render cycle

// layout.tsx
export default async function Layout({ children }) {
  const user = await fetch('/api/user/me');  // Fetch #1
  return (
    <div>
      <Header user={user} />
      {children}
    </div>
  );
}

// page.tsx (child of layout)
export default async function Page() {
  const user = await fetch('/api/user/me');  // Same URL = memoized, NOT a second request
  return <Profile user={user} />;
}

// Both components get the same data from a single network request
// This only works for GET requests with the same URL and options

// Opt out of memoization
const data = await fetch('/api/data', {
  signal: AbortSignal.timeout(5000),  // Adding signal opts out of memoization
});`}</code></pre>

      <h2>Server Actions and Cache Invalidation</h2>
      <pre><code className="language-typescript">{`// app/products/[id]/actions.ts
'use server';

import { revalidateTag, revalidatePath } from 'next/cache';

export async function updateProduct(id: string, formData: FormData) {
  const name = formData.get('name') as string;
  const price = Number(formData.get('price'));

  // Update in database
  await db.products.update({
    where: { id },
    data: { name, price },
  });

  // Invalidate the product's cached data
  revalidateTag(\`product-\${id}\`);

  // Or invalidate the specific path
  revalidatePath(\`/products/\${id}\`);
}

export async function deleteProduct(id: string) {
  await db.products.delete({ where: { id } });

  // Invalidate multiple caches
  revalidateTag(\`product-\${id}\`);
  revalidateTag('products');         // Product listing pages
  revalidatePath('/products');       // Products index page
}

// app/products/[id]/page.tsx — using the action
import { updateProduct } from './actions';

export default async function ProductPage({ params }) {
  const product = await getProduct(params.id);

  return (
    <form action={updateProduct.bind(null, params.id)}>
      <input name="name" defaultValue={product.name} />
      <input name="price" type="number" defaultValue={product.price} />
      <button type="submit">Update</button>
    </form>
  );
}`}</code></pre>

      <h2>unstable_cache for Database Queries</h2>
      <pre><code className="language-typescript">{`// When you are not using fetch (e.g., direct database queries),
// use unstable_cache to opt into the Data Cache

import { unstable_cache } from 'next/cache';
import { db } from '@/lib/db';

const getCachedProducts = unstable_cache(
  async (category: string) => {
    return db.products.findMany({
      where: { category },
      orderBy: { createdAt: 'desc' },
    });
  },
  ['products'],           // Cache key parts
  {
    tags: ['products'],   // Tags for revalidation
    revalidate: 300,      // Revalidate every 5 minutes
  }
);

// Usage in a Server Component
export default async function ProductsPage({
  searchParams,
}: {
  searchParams: { category?: string };
}) {
  const products = await getCachedProducts(
    searchParams.category || 'all'
  );

  return (
    <ul>
      {products.map((p) => (
        <li key={p.id}>{p.name} — \${p.price}</li>
      ))}
    </ul>
  );
}

// Invalidate with:
// revalidateTag('products');`}</code></pre>

      <h2>Dynamic Rendering</h2>
      <pre><code className="language-typescript">{`// Force dynamic rendering for pages that need fresh data every request

// Option 1: Route segment config
export const dynamic = 'force-dynamic';

// Option 2: Using cookies or headers (auto-detected)
import { cookies, headers } from 'next/headers';

export default async function DashboardPage() {
  const cookieStore = cookies();           // Triggers dynamic rendering
  const headersList = headers();           // Also triggers dynamic rendering
  const token = cookieStore.get('session');

  const data = await fetch('/api/dashboard', {
    headers: { Authorization: \`Bearer \${token?.value}\` },
    cache: 'no-store',
  });

  return <Dashboard data={data} />;
}

// Option 3: Using searchParams
export default async function SearchPage({
  searchParams,
}: {
  searchParams: { q?: string };          // Using searchParams triggers dynamic
}) {
  const results = await search(searchParams.q);
  return <SearchResults results={results} />;
}`}</code></pre>

      <h2>Caching Decision Flowchart</h2>
      <pre><code className="language-text">{`Is the data the same for every user?
├── YES → Is it updated frequently?
│   ├── NO → SSG (revalidate: false)
│   └── YES → ISR (revalidate: N seconds)
│       └── Need instant updates? → On-demand revalidation (revalidateTag)
└── NO → Is it sensitive/personalized?
    ├── YES → Dynamic rendering (cache: 'no-store')
    └── NO → ISR with user-specific cache keys`}</code></pre>

      <h2>Common Pitfalls</h2>
      <ul>
        <li><strong>Forgetting cache: no-store for auth</strong> — user-specific data will show stale content to wrong users without it</li>
        <li><strong>Not tagging fetches</strong> — without tags, you cannot do surgical on-demand revalidation</li>
        <li><strong>Caching too aggressively</strong> — default App Router behavior caches everything; be explicit about what should be dynamic</li>
        <li><strong>Router Cache staleness</strong> — client-side cache can serve stale data; use router.refresh() when needed</li>
        <li><strong>Missing revalidation in Server Actions</strong> — always call revalidateTag/Path after mutations</li>
        <li><strong>Confusing revalidate values</strong> — route-level revalidate is a minimum; fetch-level revalidate can be shorter</li>
      </ul>

      <h2>Production Configuration</h2>
      <pre><code className="language-typescript">{`// next.config.ts — caching-related settings
import type { NextConfig } from 'next';

const config: NextConfig = {
  // Enable ISR for all pages by default
  experimental: {
    // PPR (Partial Prerendering) — Next.js 15+
    ppr: true,
  },

  // Custom cache handler for multi-instance deployments
  cacheHandler: process.env.NODE_ENV === 'production'
    ? require.resolve('./cache-handler.mjs')
    : undefined,
  cacheMaxMemorySize: 0,  // Disable in-memory cache (use Redis instead)

  // Headers for CDN caching
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=0, s-maxage=60, stale-while-revalidate=300',
          },
        ],
      },
      {
        source: '/api/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-store',
          },
        ],
      },
    ];
  },
};

export default config;`}</code></pre>

      <p>
        Test your API cache headers with our <a href="/en/tools/http-status-code">HTTP Status Code Lookup</a> tool.
        For understanding the JSON payloads in your cached responses, use our{" "}
        <a href="/en/tools/json-formatter">JSON Formatter</a>. For more on Next.js architecture, check out
        our <a href="/en/blog/nextjs-middleware">Next.js Middleware</a> guide.
      </p>
    </>
  );
}
