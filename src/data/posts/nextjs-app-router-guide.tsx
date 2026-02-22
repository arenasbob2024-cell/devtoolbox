'use client';

import Link from 'next/link';

export default function NextjsAppRouterGuide({ lang }: { lang: string }) {
  return (
    <>
      <h2>What Is the Next.js App Router?</h2>
      <p>
        The <strong>Next.js App Router</strong> is a paradigm shift in how you build React applications. Introduced in Next.js 13 and stabilized in Next.js 14+, the App Router replaces the traditional Pages Router with a file-system based routing approach built on React Server Components. It enables streaming, nested layouts, server-side data fetching without <code>getServerSideProps</code>, and a fundamentally new mental model for building web applications.
      </p>
      <p>
        In 2026, the App Router is the recommended default for all new Next.js projects. If you are still on the Pages Router, migration is strongly encouraged. This guide walks you through the key concepts, migration strategies, and best practices for adopting the App Router in production.
      </p>

      <h2>Pages Router vs App Router: Key Differences</h2>
      <pre><code className="language-text">{`Feature              Pages Router              App Router
------------------   ----------------------    ----------------------
Directory            pages/                    app/
Components           Client by default         Server by default
Layouts              _app.tsx / per-page        layout.tsx (nested)
Data Fetching        getServerSideProps         async Server Components
                     getStaticProps             fetch() with caching
Loading UI           Manual                     loading.tsx
Error Handling       _error.tsx                 error.tsx (per-route)
Metadata             Head component             metadata export / generateMetadata
Streaming            Not supported              Built-in with Suspense
API Routes           pages/api/                 app/api/route.ts
Middleware           middleware.ts              middleware.ts (same)`}</code></pre>

      <h2>Project Structure with the App Router</h2>
      <p>
        The App Router uses the <code>app/</code> directory instead of <code>pages/</code>. Every folder inside <code>app/</code> corresponds to a URL segment. Special files like <code>page.tsx</code>, <code>layout.tsx</code>, <code>loading.tsx</code>, and <code>error.tsx</code> define the behavior for each route.
      </p>
      <pre><code className="language-text">{`app/
  layout.tsx          # Root layout (wraps entire app)
  page.tsx            # Home page (/)
  globals.css         # Global styles

  dashboard/
    layout.tsx        # Dashboard layout (persists across sub-routes)
    page.tsx          # /dashboard
    loading.tsx       # Loading UI for /dashboard
    error.tsx         # Error boundary for /dashboard

    settings/
      page.tsx        # /dashboard/settings

    [teamId]/
      page.tsx        # /dashboard/:teamId (dynamic route)

  blog/
    page.tsx          # /blog (list page)
    [slug]/
      page.tsx        # /blog/:slug (article page)

  api/
    users/
      route.ts        # API: GET/POST /api/users
      [id]/
        route.ts      # API: GET/PUT/DELETE /api/users/:id`}</code></pre>

      <h2>Server Components vs Client Components</h2>
      <p>
        In the App Router, all components are <strong>Server Components</strong> by default. They run on the server, can directly access databases, and never send JavaScript to the browser. To make a component interactive (using state, effects, or event handlers), you must explicitly opt in with the <code>&quot;use client&quot;</code> directive.
      </p>
      <pre><code className="language-typescript">{`// Server Component (default) - runs on the server only
// Can directly fetch data, access databases, read files
import { db } from '@/lib/database';

export default async function UserProfile({ params }: { params: { id: string } }) {
  // Direct database access - no API route needed
  const user = await db.user.findUnique({
    where: { id: params.id },
  });

  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
      {/* Client component for interactive parts */}
      <FollowButton userId={user.id} />
    </div>
  );
}

// Client Component - runs in the browser
// Must use "use client" directive
'use client';

import { useState } from 'react';

export function FollowButton({ userId }: { userId: string }) {
  const [following, setFollowing] = useState(false);

  return (
    <button onClick={() => setFollowing(!following)}>
      {following ? 'Unfollow' : 'Follow'}
    </button>
  );
}`}</code></pre>

      <h3>When to Use Server vs Client Components</h3>
      <pre><code className="language-text">{`Use Server Components when:
  - Fetching data from databases or APIs
  - Accessing backend resources (filesystem, env secrets)
  - Rendering static or non-interactive content
  - Large dependencies that should not be sent to the client

Use Client Components when:
  - Using React state (useState, useReducer)
  - Using effects (useEffect)
  - Using browser-only APIs (localStorage, window)
  - Adding event listeners (onClick, onChange)
  - Using React context providers`}</code></pre>

      <h2>Data Fetching in the App Router</h2>
      <p>
        The App Router eliminates the need for <code>getServerSideProps</code>, <code>getStaticProps</code>, and <code>getInitialProps</code>. Instead, you fetch data directly in Server Components using <code>async/await</code>. Next.js extends the native <code>fetch</code> API with automatic caching and revalidation.
      </p>
      <pre><code className="language-typescript">{`// Static data (cached by default, like getStaticProps)
async function getProducts() {
  const res = await fetch('https://api.example.com/products');
  return res.json();
}

// Dynamic data (no cache, like getServerSideProps)
async function getCurrentUser() {
  const res = await fetch('https://api.example.com/me', {
    cache: 'no-store',
  });
  return res.json();
}

// Revalidated data (ISR - Incremental Static Regeneration)
async function getPosts() {
  const res = await fetch('https://api.example.com/posts', {
    next: { revalidate: 3600 }, // revalidate every hour
  });
  return res.json();
}

// Tag-based revalidation
async function getPost(slug: string) {
  const res = await fetch(\`https://api.example.com/posts/\${slug}\`, {
    next: { tags: ['posts', \`post-\${slug}\`] },
  });
  return res.json();
}

// Revalidate by tag from a Server Action or Route Handler
import { revalidateTag } from 'next/cache';
revalidateTag('posts');`}</code></pre>

      <h2>Layouts and Nested Layouts</h2>
      <p>
        Layouts are one of the most powerful features of the App Router. They wrap page content, persist across navigations (no re-render), and can be nested. The root <code>layout.tsx</code> is required and replaces <code>_app.tsx</code> and <code>_document.tsx</code>.
      </p>
      <pre><code className="language-typescript">{`// app/layout.tsx - Root Layout (required)
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: { default: 'My App', template: '%s | My App' },
  description: 'A modern web application',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <nav>{/* Persistent navigation */}</nav>
        <main>{children}</main>
        <footer>{/* Persistent footer */}</footer>
      </body>
    </html>
  );
}

// app/dashboard/layout.tsx - Nested Layout
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      <aside className="w-64">
        {/* Sidebar persists across /dashboard/* routes */}
        <DashboardNav />
      </aside>
      <div className="flex-1">{children}</div>
    </div>
  );
}`}</code></pre>

      <h2>Loading UI and Streaming</h2>
      <p>
        The App Router supports instant loading states with <code>loading.tsx</code> and streaming with React Suspense. When a route segment is loading, Next.js automatically shows the loading UI while the server renders the content. This provides a much better user experience than blocking navigation.
      </p>
      <pre><code className="language-typescript">{`// app/dashboard/loading.tsx
export default function DashboardLoading() {
  return (
    <div className="animate-pulse">
      <div className="h-8 bg-gray-200 rounded w-1/3 mb-4" />
      <div className="h-4 bg-gray-200 rounded w-full mb-2" />
      <div className="h-4 bg-gray-200 rounded w-2/3" />
    </div>
  );
}

// Streaming with Suspense in page.tsx
import { Suspense } from 'react';

export default function DashboardPage() {
  return (
    <div>
      <h1>Dashboard</h1>
      {/* This section loads instantly */}
      <WelcomeMessage />

      {/* This streams in when ready */}
      <Suspense fallback={<ChartSkeleton />}>
        <RevenueChart />
      </Suspense>

      {/* This streams independently */}
      <Suspense fallback={<TableSkeleton />}>
        <RecentOrders />
      </Suspense>
    </div>
  );
}`}</code></pre>

      <h2>Error Handling</h2>
      <p>
        Each route segment can define its own <code>error.tsx</code> boundary. Errors are caught automatically without crashing the entire application. The error component receives the error and a reset function to attempt recovery.
      </p>
      <pre><code className="language-typescript">{`// app/dashboard/error.tsx
'use client'; // Error boundaries must be Client Components

import { useEffect } from 'react';

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log to error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="p-8 text-center">
      <h2>Something went wrong!</h2>
      <p>{error.message}</p>
      <button onClick={reset} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
        Try again
      </button>
    </div>
  );
}

// app/global-error.tsx - Catches root layout errors
'use client';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <h2>Something went wrong!</h2>
        <button onClick={reset}>Try again</button>
      </body>
    </html>
  );
}`}</code></pre>

      <h2>Server Actions</h2>
      <p>
        Server Actions let you run server-side code directly from your components without creating API routes. They are defined with the <code>&quot;use server&quot;</code> directive and can be used in both Server and Client Components.
      </p>
      <pre><code className="language-typescript">{`// app/actions.ts
'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { db } from '@/lib/database';

export async function createPost(formData: FormData) {
  const title = formData.get('title') as string;
  const content = formData.get('content') as string;

  // Server-side validation
  if (!title || title.length < 3) {
    return { error: 'Title must be at least 3 characters' };
  }

  // Direct database access
  await db.post.create({
    data: { title, content },
  });

  // Revalidate and redirect
  revalidatePath('/blog');
  redirect('/blog');
}

// Using Server Actions in a form (Server Component)
import { createPost } from './actions';

export default function NewPostPage() {
  return (
    <form action={createPost}>
      <input name="title" placeholder="Post title" required />
      <textarea name="content" placeholder="Write your post..." />
      <button type="submit">Publish</button>
    </form>
  );
}

// Using Server Actions in Client Components
'use client';

import { useTransition } from 'react';
import { createPost } from './actions';

export function PostForm() {
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (formData: FormData) => {
    startTransition(async () => {
      const result = await createPost(formData);
      if (result?.error) {
        alert(result.error);
      }
    });
  };

  return (
    <form action={handleSubmit}>
      <input name="title" disabled={isPending} />
      <button type="submit" disabled={isPending}>
        {isPending ? 'Publishing...' : 'Publish'}
      </button>
    </form>
  );
}`}</code></pre>

      <h2>Metadata and SEO</h2>
      <p>
        The App Router provides a powerful <code>Metadata</code> API that replaces the <code>Head</code> component. You can export static metadata or use <code>generateMetadata</code> for dynamic pages. Metadata automatically handles title templates, Open Graph tags, and more.
      </p>
      <pre><code className="language-typescript">{`// Static metadata
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about our team',
  openGraph: {
    title: 'About Us',
    description: 'Learn about our team',
    images: ['/og-about.png'],
  },
};

// Dynamic metadata with generateMetadata
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = await getPost(params.slug);

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.coverImage],
      type: 'article',
      publishedTime: post.date,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
    },
  };
}`}</code></pre>

      <h2>Migration Strategy: Pages Router to App Router</h2>
      <p>
        Next.js supports incremental adoption -- you can run both <code>pages/</code> and <code>app/</code> directories simultaneously. Here is a practical migration plan:
      </p>
      <pre><code className="language-text">{`Migration Checklist:

Phase 1: Setup
  [ ] Create app/ directory alongside pages/
  [ ] Move _app.tsx logic to app/layout.tsx
  [ ] Move _document.tsx logic to app/layout.tsx
  [ ] Set up global styles in app/globals.css

Phase 2: Static Pages First
  [ ] Move simple static pages (about, privacy, etc.)
  [ ] Convert getStaticProps to async Server Components
  [ ] Add metadata exports for SEO

Phase 3: Dynamic Pages
  [ ] Convert getServerSideProps pages
  [ ] Replace useRouter with useRouter from next/navigation
  [ ] Convert API routes to Route Handlers

Phase 4: Interactive Features
  [ ] Add "use client" to interactive components
  [ ] Convert data mutations to Server Actions
  [ ] Add loading.tsx and error.tsx boundaries

Phase 5: Cleanup
  [ ] Remove pages/ directory when fully migrated
  [ ] Remove legacy dependencies
  [ ] Update deployment configuration`}</code></pre>

      <h3>Common Migration Gotchas</h3>
      <pre><code className="language-typescript">{`// 1. useRouter changed import path
// Pages Router:
import { useRouter } from 'next/router';
// App Router:
import { useRouter } from 'next/navigation';

// 2. router.query is gone -- use useParams and useSearchParams
// Pages Router:
const { id } = router.query;
// App Router:
const params = useParams();  // for dynamic route params
const searchParams = useSearchParams();  // for ?key=value

// 3. getServerSideProps -> async Server Component
// Pages Router:
export async function getServerSideProps() {
  const data = await fetchData();
  return { props: { data } };
}
// App Router:
export default async function Page() {
  const data = await fetchData();
  return <div>{data.title}</div>;
}

// 4. Accessing cookies and headers
// Pages Router: req.cookies, req.headers
// App Router:
import { cookies, headers } from 'next/headers';
const cookieStore = cookies();
const headersList = headers();`}</code></pre>

      <h2>Route Handlers (API Routes)</h2>
      <p>
        In the App Router, API routes are replaced by Route Handlers defined in <code>route.ts</code> files. They use the standard <code>Request</code> and <code>Response</code> web APIs.
      </p>
      <pre><code className="language-typescript">{`// app/api/users/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const page = searchParams.get('page') || '1';

  const users = await db.user.findMany({
    take: 20,
    skip: (parseInt(page) - 1) * 20,
  });

  return NextResponse.json({ users, page });
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  const user = await db.user.create({ data: body });

  return NextResponse.json(user, { status: 201 });
}

// app/api/users/[id]/route.ts
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const user = await db.user.findUnique({
    where: { id: params.id },
  });

  if (!user) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  return NextResponse.json(user);
}`}</code></pre>

      <h2>Performance Best Practices</h2>
      <pre><code className="language-text">{`Performance Tips for App Router:

  1. Prefer Server Components
     - Less JavaScript sent to the client
     - Direct data access without API round-trips

  2. Use Parallel Data Fetching
     - Fetch multiple resources simultaneously with Promise.all
     - Use Suspense boundaries for streaming

  3. Optimize Images
     - Use next/image with proper width/height
     - Use priority prop for above-the-fold images

  4. Minimize Client Components
     - Push "use client" as deep as possible in the tree
     - Wrap only the interactive parts

  5. Cache Strategically
     - Default fetch caching for static data
     - Use revalidate for semi-dynamic data
     - Use no-store only when necessary

  6. Use Route Groups for Organization
     - (marketing)/ for public pages
     - (dashboard)/ for authenticated pages
     - Does not affect URL structure`}</code></pre>

      <h2>Frequently Asked Questions</h2>

      <h3>Can I use the Pages Router and App Router at the same time?</h3>
      <p>
        Yes. Next.js supports incremental adoption. You can run both <code>pages/</code> and <code>app/</code> directories in the same project. Routes in <code>app/</code> take priority over routes in <code>pages/</code> when they match the same URL. This lets you migrate page by page at your own pace.
      </p>

      <h3>Are Server Components the same as server-side rendering (SSR)?</h3>
      <p>
        No. Traditional SSR renders the full React component tree on the server and then hydrates it on the client, sending all the JavaScript. Server Components render on the server only and never send their JavaScript to the client. This results in smaller bundles and faster page loads. You can think of Server Components as a more granular form of SSR with zero client-side overhead.
      </p>

      <h3>Do I need to use Server Actions instead of API routes?</h3>
      <p>
        Not necessarily. Server Actions are ideal for form submissions and data mutations within your Next.js app. API routes (Route Handlers) are better for building public APIs consumed by external clients, webhooks, or when you need fine-grained control over the HTTP response. Many projects use both.
      </p>

      <h3>How do I handle authentication in the App Router?</h3>
      <p>
        Authentication in the App Router typically uses middleware for route protection, Server Components for session checks, and libraries like NextAuth.js (Auth.js) or Clerk. You can check the session in <code>layout.tsx</code> or individual pages, and use middleware to redirect unauthenticated users before they reach protected routes.
      </p>

      <h2>Related Tools and Guides</h2>
      <ul>
        <li><Link href={`/${lang}/tools/json-to-typescript`}>JSON to TypeScript Converter</Link> - Generate TypeScript interfaces from API responses</li>
        <li><Link href={`/${lang}/tools/jwt-decoder`}>JWT Decoder</Link> - Decode and inspect JWT authentication tokens</li>
        <li><Link href={`/${lang}/blog/typescript-generics-explained`}>TypeScript Generics Explained</Link> - Master generics for typed React components</li>
        <li><Link href={`/${lang}/blog/react-hooks-guide`}>React Hooks Complete Guide</Link> - All React Hooks explained with examples</li>
      </ul>
    </>
  );
}
