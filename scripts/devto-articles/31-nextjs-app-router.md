---
title: "Next.js App Router Complete Guide 2026: Server Components, Layouts, and Data Fetching"
tags: nextjs, react, javascript, webdev
canonical_url: https://viadreams.cc/en/blog/nextjs-app-router-guide
published: true
---

The Next.js App Router changed everything. If you're still on Pages Router, it's time to migrate. Here's everything you need to know.

## App Router vs Pages Router

The fundamental difference: **App Router uses React Server Components by default**.

```
app/
├── layout.tsx      # Root layout (always server component)
├── page.tsx        # Home page
├── about/
│   └── page.tsx    # /about
├── blog/
│   ├── layout.tsx  # Blog-specific layout
│   ├── page.tsx    # /blog
│   └── [slug]/
│       └── page.tsx # /blog/[slug]
└── api/
    └── users/
        └── route.ts # API endpoint
```

## Server Components (Default)

Server components run on the server. They can fetch data directly:

```tsx
// app/blog/page.tsx — Server Component (no 'use client' needed)
async function BlogPage() {
  // Direct database query — no useEffect needed!
  const posts = await db.query('SELECT * FROM posts ORDER BY created_at DESC');
  
  return (
    <div>
      {posts.map(post => (
        <article key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.excerpt}</p>
        </article>
      ))}
    </div>
  );
}

export default BlogPage;
```

Benefits: no client-side JavaScript, direct DB access, smaller bundle.

## Client Components

Add `'use client'` only when you need interactivity:

```tsx
'use client';
import { useState } from 'react';

export function LikeButton({ postId }: { postId: string }) {
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);
  
  const handleLike = async () => {
    if (liked) return;
    setLiked(true);
    setLikes(l => l + 1);
    await fetch(`/api/posts/${postId}/like`, { method: 'POST' });
  };
  
  return (
    <button onClick={handleLike} disabled={liked}>
      ❤️ {likes}
    </button>
  );
}
```

## Layouts

Layouts wrap pages and persist across navigation:

```tsx
// app/layout.tsx — Root layout
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: { template: '%s | My Site', default: 'My Site' },
  description: 'Your awesome site',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
```

### Nested Layouts

```tsx
// app/dashboard/layout.tsx
export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">{children}</div>
    </div>
  );
}
```

## Data Fetching

### Server Components (Recommended)

```tsx
// Parallel fetching
async function ProductPage({ params }: { params: { id: string } }) {
  const [product, reviews, recommendations] = await Promise.all([
    fetch(`/api/products/${params.id}`).then(r => r.json()),
    fetch(`/api/products/${params.id}/reviews`).then(r => r.json()),
    fetch(`/api/recommendations?productId=${params.id}`).then(r => r.json()),
  ]);
  
  return (
    <div>
      <ProductDetails product={product} />
      <Reviews reviews={reviews} />
      <Recommendations items={recommendations} />
    </div>
  );
}
```

### Caching

```tsx
// Cached for 60 seconds
const data = await fetch('/api/data', {
  next: { revalidate: 60 }
});

// Never cache (always fresh)
const data = await fetch('/api/live', {
  cache: 'no-store'
});

// Cache until explicitly revalidated
const data = await fetch('/api/static', {
  next: { tags: ['product'] }
});
```

### On-demand Revalidation

```ts
// app/api/revalidate/route.ts
import { revalidateTag } from 'next/cache';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { tag } = await request.json();
  revalidateTag(tag);
  return NextResponse.json({ revalidated: true });
}
```

## Route Handlers (API Routes)

```ts
// app/api/users/route.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const page = parseInt(searchParams.get('page') || '1');
  
  const users = await db.users.findMany({
    skip: (page - 1) * 20,
    take: 20,
  });
  
  return NextResponse.json({ users, page });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const user = await db.users.create({ data: body });
  return NextResponse.json(user, { status: 201 });
}
```

## Loading and Error States

```tsx
// app/blog/loading.tsx — Shown while page loads
export default function Loading() {
  return <div className="animate-pulse">Loading posts...</div>;
}

// app/blog/error.tsx — Shown on error
'use client';
export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div>
      <h2>Something went wrong!</h2>
      <button onClick={reset}>Try again</button>
    </div>
  );
}
```

## Metadata API

```tsx
// Static metadata
export const metadata: Metadata = {
  title: 'About',
  description: 'Learn about our company',
  openGraph: {
    images: ['/og-image.jpg'],
  },
};

// Dynamic metadata
export async function generateMetadata(
  { params }: { params: { slug: string } }
): Promise<Metadata> {
  const post = await getPost(params.slug);
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      images: [post.coverImage],
    },
  };
}
```

## Server Actions

```tsx
// Directly call server functions from forms
async function addTodo(formData: FormData) {
  'use server';
  const title = formData.get('title') as string;
  await db.todos.create({ data: { title } });
  revalidatePath('/todos');
}

export default function TodoForm() {
  return (
    <form action={addTodo}>
      <input name="title" />
      <button type="submit">Add Todo</button>
    </form>
  );
}
```

## Middleware

```ts
// middleware.ts (root of project)
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  
  if (!token && request.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: '/dashboard/:path*',
};
```

The App Router is the future of Next.js. Start migrating your Pages Router apps today. Use [DevToolBox's Next.js tools](https://viadreams.cc/en/tools/json-formatter) to help with your development workflow.
