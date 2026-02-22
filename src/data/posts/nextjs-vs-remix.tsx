'use client';

import Link from 'next/link';

export default function NextjsVsRemix({ lang }: { lang: string }) {
  return (
    <>
      <h2>Next.js vs Remix: The React Framework Showdown</h2>
      <p>
        Choosing the right React framework can define the success of your project. <strong>Next.js</strong> and <strong>Remix</strong> are the two leading full-stack React frameworks, each with distinct philosophies on routing, data loading, and deployment. Next.js, developed by Vercel, has dominated the React ecosystem since 2016 with its hybrid rendering strategies. Remix, originally created by the React Router team and now part of Shopify, takes a web-standards-first approach that embraces progressive enhancement.
      </p>
      <p>
        This comprehensive comparison covers architecture, routing, data fetching, performance, deployment, and real-world use cases to help you make an informed decision in 2026.
      </p>

      <h2>Architecture and Philosophy</h2>
      <p>
        The fundamental difference between Next.js and Remix lies in their core philosophies. Next.js provides maximum flexibility -- you can choose between Static Site Generation (SSG), Server-Side Rendering (SSR), Incremental Static Regeneration (ISR), and client-side rendering on a per-page basis. Remix, on the other hand, embraces server-first rendering with a focus on web platform APIs like the Fetch API, FormData, and HTTP caching.
      </p>

      <h3>Next.js Architecture</h3>
      <pre><code className="language-typescript">{`// Next.js App Router (app directory)
// app/products/[id]/page.tsx

// Server Component by default
export default async function ProductPage({
  params,
}: {
  params: { id: string };
}) {
  const product = await fetch(
    \`https://api.example.com/products/\${params.id}\`,
    { next: { revalidate: 3600 } } // ISR: revalidate every hour
  ).then(r => r.json());

  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <AddToCartButton productId={product.id} />
    </div>
  );
}

// Generate static pages at build time
export async function generateStaticParams() {
  const products = await fetch('https://api.example.com/products').then(r => r.json());
  return products.map((p: any) => ({ id: p.id }));
}`}</code></pre>

      <h3>Remix Architecture</h3>
      <pre><code className="language-typescript">{`// Remix route module
// app/routes/products.$id.tsx

import type { LoaderFunctionArgs, ActionFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData, Form } from "@remix-run/react";

// Server-side data loading
export async function loader({ params }: LoaderFunctionArgs) {
  const product = await db.product.findUnique({
    where: { id: params.id },
  });
  if (!product) throw new Response("Not Found", { status: 404 });
  return json(product, {
    headers: { "Cache-Control": "public, max-age=3600" },
  });
}

// Server-side form handling
export async function action({ request, params }: ActionFunctionArgs) {
  const formData = await request.formData();
  const quantity = Number(formData.get("quantity"));
  await addToCart(params.id!, quantity);
  return json({ success: true });
}

export default function ProductPage() {
  const product = useLoaderData<typeof loader>();
  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <Form method="post">
        <input type="hidden" name="quantity" value="1" />
        <button type="submit">Add to Cart</button>
      </Form>
    </div>
  );
}`}</code></pre>

      <h2>Routing: File-Based vs Flat Routes</h2>
      <p>
        Both frameworks use file-system-based routing, but with different conventions.
      </p>

      <h3>Next.js App Router</h3>
      <pre><code className="language-text">{`app/
├── layout.tsx          # Root layout (wraps all pages)
├── page.tsx            # Home page (/)
├── about/
│   └── page.tsx        # /about
├── blog/
│   ├── page.tsx        # /blog
│   └── [slug]/
│       └── page.tsx    # /blog/:slug
├── (marketing)/        # Route group (no URL impact)
│   ├── pricing/
│   │   └── page.tsx    # /pricing
│   └── features/
│       └── page.tsx    # /features
└── api/
    └── users/
        └── route.ts    # API route: /api/users`}</code></pre>

      <h3>Remix Flat Routes</h3>
      <pre><code className="language-text">{`app/routes/
├── _index.tsx              # Home page (/)
├── about.tsx               # /about
├── blog._index.tsx         # /blog
├── blog.$slug.tsx          # /blog/:slug
├── _marketing.tsx          # Layout route (no URL segment)
├── _marketing.pricing.tsx  # /pricing (uses marketing layout)
├── _marketing.features.tsx # /features (uses marketing layout)
└── api.users.tsx           # /api/users`}</code></pre>

      <h3>Key Routing Differences</h3>
      <table>
        <thead>
          <tr><th>Feature</th><th>Next.js</th><th>Remix</th></tr>
        </thead>
        <tbody>
          <tr><td>Convention</td><td>Nested folders with page.tsx</td><td>Dot-delimited flat files</td></tr>
          <tr><td>Layouts</td><td>layout.tsx in parent folder</td><td>Parent route component with Outlet</td></tr>
          <tr><td>Route Groups</td><td>(groupName) folder</td><td>_prefix for pathless routes</td></tr>
          <tr><td>Dynamic Routes</td><td>[param] folder</td><td>$param in filename</td></tr>
          <tr><td>Catch-all</td><td>[...slug] folder</td><td>$.tsx file</td></tr>
          <tr><td>API Routes</td><td>route.ts files</td><td>Loader/action in route modules</td></tr>
          <tr><td>Parallel Routes</td><td>@slot convention</td><td>Not built-in</td></tr>
          <tr><td>Intercepting Routes</td><td>(..) convention</td><td>Not built-in</td></tr>
        </tbody>
      </table>

      <h2>Data Fetching Strategies</h2>
      <p>
        Data fetching is where these frameworks diverge most significantly.
      </p>

      <h3>Next.js: Multiple Strategies</h3>
      <pre><code className="language-typescript">{`// 1. Server Components (default in App Router)
async function ServerComponent() {
  const data = await fetch('https://api.example.com/data');
  return <div>{/* render data */}</div>;
}

// 2. Static Generation with revalidation (ISR)
async function ISRPage() {
  const data = await fetch('https://api.example.com/data', {
    next: { revalidate: 60 }, // Revalidate every 60 seconds
  });
  return <div>{/* render data */}</div>;
}

// 3. Dynamic rendering (SSR)
async function SSRPage() {
  const data = await fetch('https://api.example.com/data', {
    cache: 'no-store', // Always fresh
  });
  return <div>{/* render data */}</div>;
}

// 4. Client-side with React hooks
'use client';
import { useState, useEffect } from 'react';

function ClientComponent() {
  const [data, setData] = useState(null);
  useEffect(() => {
    fetch('/api/data').then(r => r.json()).then(setData);
  }, []);
  return <div>{/* render data */}</div>;
}`}</code></pre>

      <h3>Remix: Loader/Action Pattern</h3>
      <pre><code className="language-typescript">{`// Every route has a loader (GET) and action (POST/PUT/DELETE)
import { json, type LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData, useFetcher } from "@remix-run/react";

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const query = url.searchParams.get("q") || "";
  const products = await searchProducts(query);
  return json({ products, query });
}

export default function SearchPage() {
  const { products, query } = useLoaderData<typeof loader>();
  const fetcher = useFetcher();

  return (
    <div>
      {/* Form automatically calls loader on submit */}
      <Form method="get">
        <input name="q" defaultValue={query} />
        <button type="submit">Search</button>
      </Form>

      {/* Fetcher for non-navigation mutations */}
      {products.map(product => (
        <fetcher.Form method="post" action="/cart">
          <input type="hidden" name="productId" value={product.id} />
          <button type="submit">Add to Cart</button>
        </fetcher.Form>
      ))}
    </div>
  );
}`}</code></pre>

      <h2>Performance Comparison</h2>
      <p>
        Performance characteristics differ based on the rendering strategy you choose.
      </p>

      <table>
        <thead>
          <tr><th>Metric</th><th>Next.js</th><th>Remix</th></tr>
        </thead>
        <tbody>
          <tr><td>First Contentful Paint</td><td>Excellent with SSG/ISR</td><td>Good with streaming SSR</td></tr>
          <tr><td>Time to Interactive</td><td>Varies by strategy</td><td>Fast (minimal JS)</td></tr>
          <tr><td>Bundle Size</td><td>Larger (more features)</td><td>Smaller (web standards)</td></tr>
          <tr><td>Caching</td><td>Built-in ISR + CDN</td><td>HTTP Cache-Control headers</td></tr>
          <tr><td>Streaming</td><td>React Suspense + loading.tsx</td><td>Built-in defer() + Await</td></tr>
          <tr><td>Code Splitting</td><td>Automatic per route</td><td>Automatic per route</td></tr>
          <tr><td>Image Optimization</td><td>next/image built-in</td><td>Community packages</td></tr>
        </tbody>
      </table>

      <h3>Streaming and Suspense</h3>
      <pre><code className="language-typescript">{`// Next.js: loading.tsx for streaming
// app/dashboard/loading.tsx
export default function Loading() {
  return <DashboardSkeleton />;
}

// Remix: defer() for streaming
import { defer } from "@remix-run/node";
import { Await, useLoaderData } from "@remix-run/react";
import { Suspense } from "react";

export async function loader() {
  const criticalData = await getCriticalData(); // awaited
  const slowData = getSlowData(); // NOT awaited (promise)
  return defer({ criticalData, slowData });
}

export default function Dashboard() {
  const { criticalData, slowData } = useLoaderData<typeof loader>();
  return (
    <div>
      <h1>{criticalData.title}</h1>
      <Suspense fallback={<Skeleton />}>
        <Await resolve={slowData}>
          {(data) => <SlowComponent data={data} />}
        </Await>
      </Suspense>
    </div>
  );
}`}</code></pre>

      <h2>Error Handling</h2>

      <h3>Next.js Error Boundaries</h3>
      <pre><code className="language-typescript">{`// app/dashboard/error.tsx
'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div>
      <h2>Something went wrong!</h2>
      <button onClick={() => reset()}>Try again</button>
    </div>
  );
}

// app/not-found.tsx
export default function NotFound() {
  return <h1>404 - Page Not Found</h1>;
}`}</code></pre>

      <h3>Remix Error Boundaries</h3>
      <pre><code className="language-typescript">{`// app/routes/dashboard.tsx
import { isRouteErrorResponse, useRouteError } from "@remix-run/react";

export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <div>
        <h1>{error.status} {error.statusText}</h1>
        <p>{error.data}</p>
      </div>
    );
  }

  return (
    <div>
      <h1>Unexpected Error</h1>
      <p>{error instanceof Error ? error.message : "Unknown error"}</p>
    </div>
  );
}`}</code></pre>

      <h2>Deployment and Hosting</h2>
      <table>
        <thead>
          <tr><th>Platform</th><th>Next.js</th><th>Remix</th></tr>
        </thead>
        <tbody>
          <tr><td>Vercel</td><td>First-class support</td><td>Supported via adapter</td></tr>
          <tr><td>Cloudflare</td><td>Limited (Workers)</td><td>Excellent via adapter</td></tr>
          <tr><td>AWS Lambda</td><td>Supported (SST/OpenNext)</td><td>Supported via adapter</td></tr>
          <tr><td>Deno Deploy</td><td>Community support</td><td>Supported via adapter</td></tr>
          <tr><td>Node.js Server</td><td>Built-in server</td><td>Express/Fastify adapter</td></tr>
          <tr><td>Docker</td><td>Standalone output</td><td>Any Node adapter</td></tr>
          <tr><td>Static Export</td><td>output: 'export'</td><td>Not primary focus</td></tr>
        </tbody>
      </table>

      <h2>Ecosystem and Community</h2>
      <table>
        <thead>
          <tr><th>Aspect</th><th>Next.js</th><th>Remix</th></tr>
        </thead>
        <tbody>
          <tr><td>GitHub Stars</td><td>125K+</td><td>30K+</td></tr>
          <tr><td>npm Weekly Downloads</td><td>6M+</td><td>400K+</td></tr>
          <tr><td>First Release</td><td>2016</td><td>2021</td></tr>
          <tr><td>Backed By</td><td>Vercel</td><td>Shopify</td></tr>
          <tr><td>Learning Resources</td><td>Extensive</td><td>Growing</td></tr>
          <tr><td>Job Market</td><td>Very large</td><td>Growing</td></tr>
          <tr><td>UI Libraries</td><td>All React libraries</td><td>All React libraries</td></tr>
          <tr><td>Auth Solutions</td><td>NextAuth.js, Clerk</td><td>remix-auth, custom</td></tr>
          <tr><td>ORM Integration</td><td>Prisma, Drizzle</td><td>Prisma, Drizzle</td></tr>
        </tbody>
      </table>

      <h2>When to Choose Next.js</h2>
      <ul>
        <li><strong>Static-first sites</strong>: Blogs, marketing pages, documentation where SSG/ISR provides the best performance</li>
        <li><strong>Large teams</strong>: Extensive documentation, large community, and abundant hiring pool</li>
        <li><strong>Image-heavy applications</strong>: Built-in next/image optimization is excellent</li>
        <li><strong>Vercel deployment</strong>: Seamless integration with Vercel platform</li>
        <li><strong>Incremental adoption</strong>: Pages Router allows gradual migration from existing React apps</li>
        <li><strong>Complex rendering needs</strong>: When you need SSG, SSR, ISR, and CSR in the same app</li>
        <li><strong>Enterprise projects</strong>: Proven at scale by companies like Netflix, TikTok, and Notion</li>
      </ul>

      <h2>When to Choose Remix</h2>
      <ul>
        <li><strong>Web standards focus</strong>: When you prefer using native web APIs (Fetch, FormData, Response)</li>
        <li><strong>Progressive enhancement</strong>: Apps that should work without JavaScript</li>
        <li><strong>Edge deployment</strong>: Remix adapters make edge deployment straightforward</li>
        <li><strong>Form-heavy applications</strong>: The loader/action pattern excels for CRUD applications</li>
        <li><strong>Smaller bundle sizes</strong>: When minimizing client-side JavaScript is critical</li>
        <li><strong>Multi-platform deployment</strong>: Need to deploy to Cloudflare, Deno, or custom infrastructure</li>
        <li><strong>Real-time applications</strong>: Better server-sent events and WebSocket integration</li>
      </ul>

      <h2>Migration Considerations</h2>
      <pre><code className="language-typescript">{`// Migrating from Next.js Pages Router to App Router
// Before (Pages Router):
// pages/products/[id].tsx
export async function getServerSideProps({ params }) {
  const product = await getProduct(params.id);
  return { props: { product } };
}
export default function ProductPage({ product }) {
  return <h1>{product.name}</h1>;
}

// After (App Router):
// app/products/[id]/page.tsx
export default async function ProductPage({ params }) {
  const product = await getProduct(params.id);
  return <h1>{product.name}</h1>;
}

// Migrating from Remix to Next.js App Router:
// The loader pattern maps to server components
// The action pattern maps to Server Actions
'use server';
async function addToCart(formData: FormData) {
  const productId = formData.get('productId');
  await db.cart.add(productId);
  revalidatePath('/cart');
}`}</code></pre>

      <h2>Side-by-Side Feature Matrix</h2>
      <table>
        <thead>
          <tr><th>Feature</th><th>Next.js</th><th>Remix</th></tr>
        </thead>
        <tbody>
          <tr><td>Server Components</td><td>Yes (default)</td><td>Coming (React 19)</td></tr>
          <tr><td>Server Actions</td><td>Yes</td><td>Via action functions</td></tr>
          <tr><td>Middleware</td><td>Edge middleware</td><td>Express/loader middleware</td></tr>
          <tr><td>Internationalization</td><td>Built-in i18n routing</td><td>Manual setup</td></tr>
          <tr><td>Image Optimization</td><td>next/image</td><td>Third-party</td></tr>
          <tr><td>Font Optimization</td><td>next/font</td><td>Third-party</td></tr>
          <tr><td>SEO</td><td>Metadata API</td><td>meta() function</td></tr>
          <tr><td>TypeScript</td><td>First-class support</td><td>First-class support</td></tr>
          <tr><td>Testing</td><td>Any framework</td><td>Any framework</td></tr>
          <tr><td>Hot Module Replacement</td><td>Turbopack (fast)</td><td>Vite-based (fast)</td></tr>
        </tbody>
      </table>

      <h2>Conclusion</h2>
      <p>
        Both Next.js and Remix are excellent frameworks that can handle any React project. <strong>Next.js</strong> is the safer choice for most teams in 2026 -- it has a larger ecosystem, more deployment options, better documentation, and a proven track record at enterprise scale. <strong>Remix</strong> is the better choice if you value web standards, progressive enhancement, and want a framework that produces less client-side JavaScript.
      </p>
      <p>
        If you are starting a new project, consider these factors: team experience (most React developers already know Next.js), deployment target (Vercel vs edge platforms), and application type (content-heavy vs form-heavy). Either way, you are choosing a battle-tested framework backed by a strong company.
      </p>
      <p>
        Try our <Link href={`/${lang}/tools/json-formatter`}>JSON Formatter</Link> and other developer tools to speed up your workflow regardless of which framework you choose.
      </p>
    </>
  );
}
