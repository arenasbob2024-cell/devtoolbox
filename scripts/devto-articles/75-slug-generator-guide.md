---
title: "URL Slug Generator: Create SEO-Friendly Permalinks Complete Guide"
tags: javascript, seo, webdev, python
canonical_url: https://viadreams.cc/en/blog/slug-generator-online-guide
published: true
---

# URL Slug Generator: Create SEO-Friendly Permalinks Complete Guide

A URL slug is the human-readable part of a URL that identifies a specific page. Getting slugs right improves SEO, readability, and shareability. This guide covers everything from a basic JavaScript implementation to multilingual slugs in production.

## What Is a URL Slug and Why Does It Matter?

A **slug** is the last segment of a URL path:

```
https://example.com/blog/how-to-build-a-rest-api
                         ^^^^^^^^^^^^^^^^^^^^^^^^
                         this is the slug
```

Well-formed slugs:
- Are lowercase and hyphen-separated
- Contain only ASCII-safe characters (`a-z`, `0-9`, `-`)
- Have no trailing slashes, spaces, or special characters
- Reflect the page's primary keyword

**SEO impact**: search engines read the slug as a strong relevance signal. A slug like `/best-javascript-frameworks-2025` outperforms `/post?id=4812` in click-through rate and ranking.

## JavaScript: Slug Function from Scratch

A robust pure function that handles Unicode, accents, and edge cases:

```js
function slugify(text) {
  return text
    .toString()
    .normalize('NFD')                     // decompose accented chars
    .replace(/[\u0300-\u036f]/g, '')      // strip combining diacritics
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')        // remove non-alphanumeric (keep spaces/hyphens)
    .replace(/[\s_]+/g, '-')             // spaces and underscores → hyphens
    .replace(/-+/g, '-')                 // collapse multiple hyphens
    .replace(/^-+|-+$/g, '');            // strip leading/trailing hyphens
}

slugify('Hello, World!');           // "hello-world"
slugify('Héllo Wörld');             // "hello-world"
slugify('  Trim  Me  ');            // "trim-me"
slugify('React & Vue: A Comparison'); // "react-vue-a-comparison"
slugify('100% Free — Open Source'); // "100-free-open-source"
```

The `normalize('NFD')` call is key — it decomposes characters like `é` into `e` + combining accent, which the next regex then strips cleanly.

## Using npm slugify

The `slugify` package handles an even wider range of edge cases and symbol mappings:

```bash
npm install slugify
```

```js
import slugify from 'slugify';

// Basic usage
slugify('Hello World');
// "Hello-World"

// Lowercase + strict mode (removes unmapped chars)
slugify('Hello World', { lower: true, strict: true });
// "hello-world"

// Custom replacement map
slugify('C++ is great & fast', {
  lower: true,
  strict: true,
  replacement: '-',
  locale: 'en',
});
// "c-is-great-fast"

// Preserve specific characters
slugify('$100 deal @ checkout', {
  lower: true,
  remove: /[*+~.()'"!:@]/g,
});
// "$100-deal-@-checkout"
```

For most projects, `{ lower: true, strict: true }` is the right default.

## Python: python-slugify

```bash
pip install python-slugify
```

```python
from slugify import slugify

slugify('Hello, World!')
# "hello-world"

slugify('Héllo Wörld')
# "hello-world"

slugify('Django & Flask: Python Web Frameworks')
# "django-flask-python-web-frameworks"

# Preserve specific stopwords
slugify('This is a Test', stopwords=['is', 'a'])
# "this-test"

# Max length
slugify('A very long title that exceeds our limit', max_length=20)
# "a-very-long-title"

# Custom separator
slugify('hello world', separator='_')
# "hello_world"
```

## Next.js Routing with Slugs

In Next.js App Router, dynamic slug routes live in bracket folders:

```
app/
  blog/
    [slug]/
      page.tsx
```

```tsx
// app/blog/[slug]/page.tsx
interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map(post => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props) {
  const post = await getPostBySlug(params.slug);
  return {
    title: post.title,
    alternates: { canonical: `https://example.com/blog/${params.slug}` },
  };
}

export default async function BlogPost({ params }: Props) {
  const post = await getPostBySlug(params.slug);
  if (!post) notFound();
  return <article>{post.content}</article>;
}
```

Always pair a slug route with `generateMetadata` to set the canonical URL — this is critical for SEO when content is accessible at multiple paths.

## Handling Duplicate Slugs in Prisma / Databases

Production apps need a uniqueness strategy. A common pattern: append a short suffix when a slug already exists.

```ts
import { PrismaClient } from '@prisma/client';
import slugify from 'slugify';

const prisma = new PrismaClient();

async function createUniqueSlug(title: string): Promise<string> {
  const base = slugify(title, { lower: true, strict: true });
  let slug = base;
  let suffix = 1;

  while (true) {
    const exists = await prisma.post.findUnique({ where: { slug } });
    if (!exists) return slug;
    slug = `${base}-${suffix}`;
    suffix++;
  }
}

// Usage
const slug = await createUniqueSlug('My First Post');
// First call  → "my-first-post"
// Second call → "my-first-post-1"
// Third call  → "my-first-post-2"

await prisma.post.create({ data: { title, slug, content } });
```

In your Prisma schema, mark the field as unique:

```prisma
model Post {
  id      Int    @id @default(autoincrement())
  title   String
  slug    String @unique
  content String
}
```

## Multilingual Slugs with limax

For apps with non-Latin content (Chinese, Arabic, Japanese, etc.), `limax` transliterates characters before slugifying:

```bash
npm install limax
```

```js
import limax from 'limax';

limax('日本語のタイトル');
// "ri-ben-yu-notaitoru"

limax('مرحبا بالعالم');
// "mrhba-balalm"

limax('Привет мир');
// "privet-mir"

// With options
limax('Héllo Wörld', { lang: 'de', maintainCase: false });
// "hello-world"
```

For CMS-driven multilingual sites, store the slug per locale:

```ts
interface Post {
  id: string;
  slugs: Record<string, string>; // { en: 'hello-world', ja: 'ri-ben-yu-notaitoru' }
}
```

## Quick Slug Checklist

Before saving a slug to your database, run through this checklist:

- [ ] Lowercase only
- [ ] Hyphens instead of spaces and underscores
- [ ] No special characters (`!`, `@`, `#`, `%`, `&`, etc.)
- [ ] No double hyphens
- [ ] No leading or trailing hyphens
- [ ] Max length respected (50–80 chars is a good target)
- [ ] Unique within the content type
- [ ] Accents and Unicode transliterated or stripped

## Quick Tool

Use **[DevToolBox Slug Generator](https://viadreams.cc/en/tools/slug-generator)** — convert any text to clean, SEO-friendly URL slugs instantly.

---

*Generate URL slugs with [DevToolBox's free Slug Generator](https://viadreams.cc/en/tools/slug-generator).*
