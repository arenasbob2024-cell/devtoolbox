'use client';

import Link from 'next/link';

export default function NextjsSeoGuide({ lang }: { lang: string }) {
  return (
    <>
      <h2>Next.js SEO Optimization Complete Guide</h2>
      <p>
        <strong>Next.js</strong> is one of the most SEO-friendly React frameworks thanks to its
        built-in support for server-side rendering, static generation, metadata APIs, and structured
        data. This comprehensive guide covers every SEO technique available in Next.js 14/15 with the
        App Router — from basic metadata to advanced structured data, Core Web Vitals optimization,
        and international SEO.
      </p>

      <h2>Metadata API: The Foundation</h2>
      <p>
        Next.js App Router provides a powerful <code>Metadata</code> API that generates{' '}
        <code>{`<head>`}</code> tags server-side, making them crawlable by search engines:
      </p>
      <pre><code className="language-typescript">{`// app/layout.tsx - Root layout with site-wide defaults
import type { Metadata } from 'next';

export const metadata: Metadata = {
  // Basic
  title: {
    default: 'DevToolBox — Free Online Developer Tools',
    template: '%s | DevToolBox',    // Page titles: "JSON Formatter | DevToolBox"
  },
  description: 'Free online tools for developers: JSON formatter, base64 encoder, regex tester, and 200+ more tools.',
  keywords: ['developer tools', 'json formatter', 'base64 encoder', 'regex tester'],

  // Canonical URL
  metadataBase: new URL('https://viadreams.cc'),
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/en',
      'zh-CN': '/zh',
      'fr-FR': '/fr',
    },
  },

  // Open Graph
  openGraph: {
    type: 'website',
    siteName: 'DevToolBox',
    locale: 'en_US',
    url: 'https://viadreams.cc',
    title: 'DevToolBox — Free Online Developer Tools',
    description: '200+ free developer tools including JSON formatter, regex tester, and more.',
    images: [{
      url: '/og-image.png',
      width: 1200,
      height: 630,
      alt: 'DevToolBox - Free Developer Tools',
    }],
  },

  // Twitter/X Card
  twitter: {
    card: 'summary_large_image',
    site: '@devtoolbox',
    title: 'DevToolBox — Free Online Developer Tools',
    description: '200+ free developer tools for your workflow.',
    images: ['/twitter-image.png'],
  },

  // Robots
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  // Icons
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },

  // Verification
  verification: {
    google: 'your-google-verification-token',
    yandex: 'your-yandex-token',
  },
};`}</code></pre>

      <h2>Dynamic Metadata with generateMetadata</h2>
      <p>
        For dynamic pages like blog posts or product pages, use <code>generateMetadata</code> to
        create unique metadata per page:
      </p>
      <pre><code className="language-typescript">{`// app/[lang]/blog/[slug]/page.tsx
import type { Metadata, ResolvingMetadata } from 'next';

type Props = {
  params: { slug: string; lang: string };
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const post = await getPost(params.slug);

  // Access and extend parent metadata
  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: post.title,
    description: post.description,
    alternates: {
      canonical: \`/\${params.lang}/blog/\${params.slug}\`,
    },
    openGraph: {
      type: 'article',
      title: post.title,
      description: post.description,
      publishedTime: post.date,
      authors: [post.author],
      images: [
        {
          url: \`/api/og?title=\${encodeURIComponent(post.title)}\`,  // Dynamic OG image
          width: 1200,
          height: 630,
        },
        ...previousImages,
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
    },
  };
}`}</code></pre>

      <h2>Dynamic OG Image Generation</h2>
      <p>
        Next.js supports generating Open Graph images on-the-fly using the ImageResponse API:
      </p>
      <pre><code className="language-typescript">{`// app/api/og/route.tsx
import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get('title') ?? 'DevToolBox';
  const description = searchParams.get('description') ?? '';

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundImage: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
          padding: '60px',
        }}
      >
        <div
          style={{
            fontSize: 60,
            fontWeight: 800,
            color: 'white',
            textAlign: 'center',
            lineHeight: 1.2,
            marginBottom: 24,
          }}
        >
          {title}
        </div>
        {description && (
          <div style={{ fontSize: 24, color: '#94a3b8', textAlign: 'center', maxWidth: 800 }}>
            {description}
          </div>
        )}
        <div style={{ position: 'absolute', bottom: 40, fontSize: 18, color: '#64748b' }}>
          viadreams.cc
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}`}</code></pre>

      <h2>Structured Data (JSON-LD)</h2>
      <p>
        Structured data helps search engines understand your content and can result in rich snippets
        in search results. Add it with a script tag in your layouts:
      </p>
      <pre><code className="language-typescript">{`// components/StructuredData.tsx
export function ArticleSchema({ post }: { post: BlogPost }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.updatedAt ?? post.date,
    author: {
      '@type': 'Person',
      name: post.author,
      url: 'https://viadreams.cc/about',
    },
    publisher: {
      '@type': 'Organization',
      name: 'DevToolBox',
      logo: {
        '@type': 'ImageObject',
        url: 'https://viadreams.cc/logo.png',
      },
    },
    image: {
      '@type': 'ImageObject',
      url: \`https://viadreams.cc/api/og?title=\${encodeURIComponent(post.title)}\`,
      width: 1200,
      height: 630,
    },
    mainEntityOfPage: \`https://viadreams.cc/en/blog/\${post.slug}\`,
    keywords: post.keywords.join(', '),
    inLanguage: 'en-US',
    wordCount: post.wordCount,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// BreadcrumbList schema
export function BreadcrumbSchema({ items }: { items: { name: string; url: string }[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: items.map((item, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            name: item.name,
            item: item.url,
          })),
        }),
      }}
    />
  );
}

// SoftwareApplication schema for tools
export function ToolSchema({ tool }: { tool: Tool }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'SoftwareApplication',
          name: tool.name,
          description: tool.description,
          applicationCategory: 'DeveloperApplication',
          operatingSystem: 'Web Browser',
          offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
        }),
      }}
    />
  );
}`}</code></pre>

      <h2>Sitemap Generation</h2>
      <pre><code className="language-typescript">{`// app/sitemap.ts
import { MetadataRoute } from 'next';
import { blogPosts } from '@/data/blog-posts';
import { tools } from '@/lib/tools';

const locales = ['en', 'fr', 'de', 'zh', 'ja'];
const baseUrl = 'https://viadreams.cc';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // Static pages
  const staticPages = locales.flatMap(locale => [
    {
      url: \`\${baseUrl}/\${locale}\`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 1.0,
    },
    {
      url: \`\${baseUrl}/\${locale}/blog\`,
      lastModified: now,
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
  ]);

  // Blog posts
  const blogEntries = blogPosts.flatMap(post =>
    locales.map(locale => ({
      url: \`\${baseUrl}/\${locale}/blog/\${post.slug}\`,
      lastModified: new Date(post.date),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }))
  );

  // Tools
  const toolEntries = tools.flatMap(tool =>
    locales.map(locale => ({
      url: \`\${baseUrl}/\${locale}\${tool.path}\`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    }))
  );

  return [...staticPages, ...blogEntries, ...toolEntries];
}

// app/robots.ts
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/'],
      },
      {
        userAgent: 'GPTBot',
        allow: '/',
      },
    ],
    sitemap: 'https://viadreams.cc/sitemap.xml',
  };
}`}</code></pre>

      <h2>Core Web Vitals Optimization</h2>
      <p>
        Core Web Vitals (LCP, INP, CLS) directly impact search rankings. Here's how to optimize each
        in Next.js:
      </p>
      <pre><code className="language-typescript">{`// LCP: Optimize the Largest Contentful Paint element
// Use priority for above-the-fold images
import Image from 'next/image';

<Image
  src="/hero.png"
  alt="Hero image"
  width={1200}
  height={600}
  priority                        // Preloads the image
  sizes="(max-width: 768px) 100vw, 1200px"
/>

// CLS: Avoid layout shifts
// Always specify image dimensions
// Reserve space for dynamic content
<div style={{ minHeight: 300 }}>     {/* Reserve space before content loads */}
  <DynamicComponent />
</div>

// Use CSS aspect-ratio to reserve space
.video-container {
  aspect-ratio: 16 / 9;
  width: 100%;
}

// INP: Reduce interaction latency
// Use useTransition for non-urgent updates
import { useTransition } from 'react';

const [isPending, startTransition] = useTransition();

function handleSearch(query: string) {
  startTransition(() => {
    setSearchResults(filterResults(query));    // Non-urgent update
  });
}

// Defer non-critical JavaScript
const HeavyChart = dynamic(() => import('./HeavyChart'), {
  ssr: false,
  loading: () => <div className="h-64 animate-pulse bg-gray-200" />,
});`}</code></pre>

      <h2>International SEO with hreflang</h2>
      <pre><code className="language-typescript">{`// app/[lang]/blog/[slug]/page.tsx
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locales = ['en', 'fr', 'de', 'zh', 'ja', 'ko'];

  return {
    alternates: {
      canonical: \`/\${params.lang}/blog/\${params.slug}\`,
      languages: Object.fromEntries(
        locales.map(locale => [
          locale,
          \`/\${locale}/blog/\${params.slug}\`
        ])
      ),
    },
  };
}

// This generates:
// <link rel="canonical" href="/en/blog/my-post" />
// <link rel="alternate" hreflang="en" href="/en/blog/my-post" />
// <link rel="alternate" hreflang="fr" href="/fr/blog/my-post" />
// <link rel="alternate" hreflang="x-default" href="/en/blog/my-post" />`}</code></pre>

      <h2>SEO Checklist for Next.js Apps</h2>
      <pre><code className="language-text">{`Metadata
  [ ] Unique title and description for every page
  [ ] title.template set in root layout
  [ ] Open Graph images (1200x630) for all pages
  [ ] Twitter card metadata
  [ ] Canonical URLs set correctly

Content
  [ ] H1 tag on every page (only one per page)
  [ ] Heading hierarchy (h1 > h2 > h3)
  [ ] Images have descriptive alt text
  [ ] Internal links use descriptive anchor text
  [ ] No broken links

Technical
  [ ] sitemap.ts generates all URLs
  [ ] robots.ts configured correctly
  [ ] Core Web Vitals: LCP < 2.5s, INP < 200ms, CLS < 0.1
  [ ] All pages return correct HTTP status codes
  [ ] No duplicate content (use canonical tags)

Structured Data
  [ ] Article schema for blog posts
  [ ] BreadcrumbList on inner pages
  [ ] Organization/WebSite schema on homepage
  [ ] FAQ schema where applicable

International (if multi-language)
  [ ] hreflang tags for all locale variants
  [ ] x-default hreflang set
  [ ] Language in HTML lang attribute`}</code></pre>

      <h2>Frequently Asked Questions</h2>

      <h3>Does Next.js App Router support SSR for SEO?</h3>
      <p>
        Yes. By default, all React Server Components in the App Router are server-rendered, making
        them fully crawlable. Only components with <code>'use client'</code> are hydrated on the
        client. Metadata from <code>generateMetadata</code> is always server-rendered.
      </p>

      <h3>Should I use SSG or SSR for blog posts?</h3>
      <p>
        For blog posts that don't change frequently, SSG (Static Site Generation) with{' '}
        <code>generateStaticParams</code> is ideal — it's faster and cheaper. Use SSR or ISR for
        content that updates regularly.
      </p>

      <h3>How do I check if my structured data is valid?</h3>
      <p>
        Use Google's Rich Results Test (search.google.com/test/rich-results) and Schema.org's
        validator. After deploying, check Google Search Console for structured data errors.
      </p>

      <p>
        Use our <Link href={`/${lang}/tools/json-formatter`}>JSON Formatter</Link> to validate your
        JSON-LD structured data, or check out our{' '}
        <Link href={`/${lang}/blog/open-graph-twitter-card-meta-tags-guide`}>
          Open Graph Meta Tags Guide
        </Link>{' '}
        for more metadata tips.
      </p>
    </>
  );
}
