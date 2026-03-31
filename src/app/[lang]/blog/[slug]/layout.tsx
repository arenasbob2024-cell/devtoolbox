import type { Metadata } from 'next';
import { i18n, type Locale } from '@/i18n/config';
import { getLocalizedPost, getAllSlugs } from '@/data/blog-posts';

export async function generateStaticParams() {
  // Only pre-render 'en' at build time; other locales use ISR (on-demand)
  const slugs = getAllSlugs();
  return slugs.map(slug => ({ lang: 'en', slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang: rawLang, slug } = await params;
  const lang = (i18n.locales.includes(rawLang as Locale) ? rawLang : i18n.defaultLocale) as Locale;
  const post = getLocalizedPost(slug, lang);

  if (!post) {
    return { title: 'Post Not Found' };
  }

  const url = `https://viadreams.cc/${lang}/blog/${slug}`;

  return {
    title: post.title,
    description: post.description,
    keywords: post.keywords,
    authors: [{ name: post.author }],
    openGraph: {
      title: `${post.title} | DevToolBox Blog`,
      description: post.description,
      url,
      type: 'article',
      siteName: 'DevToolBox',
      publishedTime: post.date,
      modifiedTime: post.date,
      authors: [post.author],
      locale: lang,
      images: [{ url: 'https://viadreams.cc/og-image.png', width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: ['https://viadreams.cc/og-image.png'],
    },
    alternates: {
      canonical: url,
      languages: {
        ...Object.fromEntries(
          i18n.locales.map((l) => [l, `https://viadreams.cc/${l}/blog/${slug}`])
        ),
        'x-default': `https://viadreams.cc/en/blog/${slug}`,
      },
    },
  };
}

export default async function BlogPostLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang: rawLang, slug } = await params;
  const lang = (i18n.locales.includes(rawLang as Locale) ? rawLang : i18n.defaultLocale) as Locale;
  const post = getLocalizedPost(slug, lang);

  return (
    <>
      {post && (
        <>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'Article',
                headline: post.title,
                description: post.description,
                datePublished: post.date,
                dateModified: post.date,
                inLanguage: lang,
                image: 'https://viadreams.cc/og-image.png',
                author: { '@type': 'Organization', name: 'DevToolBox', url: 'https://viadreams.cc' },
                publisher: {
                  '@type': 'Organization',
                  name: 'DevToolBox',
                  url: 'https://viadreams.cc',
                  logo: {
                    '@type': 'ImageObject',
                    url: 'https://viadreams.cc/og-image.png'
                  }
                },
                mainEntityOfPage: {
                  '@type': 'WebPage',
                  '@id': `https://viadreams.cc/${lang}/blog/${slug}`
                },
                isAccessibleForFree: true,
                keywords: post.keywords?.join(', ')
              })
            }}
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'BreadcrumbList',
                itemListElement: [
                  { '@type': 'ListItem', position: 1, name: 'Home', item: `https://viadreams.cc/${lang}` },
                  { '@type': 'ListItem', position: 2, name: 'Blog', item: `https://viadreams.cc/${lang}/blog` },
                  { '@type': 'ListItem', position: 3, name: post.title, item: `https://viadreams.cc/${lang}/blog/${slug}` }
                ]
              })
            }}
          />
        </>
      )}
      {children}
    </>
  );
}
