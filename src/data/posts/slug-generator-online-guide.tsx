'use client';

import Link from 'next/link';

const translations = {
  en: {
    title: 'URL Slug Generator: Create SEO-Friendly Permalinks — Complete Guide',
    description: 'Complete guide to URL slug generation covering JavaScript, Python, Go, Next.js routing, database uniqueness, multilingual transliteration, and SEO best practices for clean permalink URLs.',
  },
  zh: {
    title: 'URL Slug生成器：创建SEO友好的永久链接完整指南',
    description: '完整的URL slug生成指南，涵盖JavaScript、Python、Go、Next.js路由、数据库唯一性、多语言音译以及干净永久链接URL的SEO最佳实践。',
  },
};

export default function SlugGeneratorOnlineGuide({ lang = 'en' }: { lang?: string }) {
  const t = translations[lang as keyof typeof translations] || translations.en;

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is a URL slug and why is it important for SEO?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'A URL slug is the human-readable portion of a URL that identifies a specific page, appearing after the domain name. For example, in https://example.com/blog/how-to-create-url-slugs, the slug is "how-to-create-url-slugs". Slugs are critical for SEO because search engines read them to understand page content, they appear as clickable text in search results, and clean descriptive slugs get higher click-through rates. Google has confirmed that keywords in URLs are a lightweight ranking factor. Slugs should be lowercase, use hyphens as separators, avoid special characters, and be concise (under 60 characters).',
        },
      },
      {
        '@type': 'Question',
        name: 'What are the rules for creating a valid URL slug?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'A valid URL slug must follow these rules: (1) Use only lowercase letters — uppercase letters are technically allowed but create duplicate content issues. (2) Use hyphens (-) as word separators, never underscores (_) or spaces. Google treats hyphens as word separators but underscores as word joiners. (3) Remove all special characters: @, #, $, %, &, *, punctuation, and accented characters (or transliterate them). (4) Remove stop words for conciseness: a, an, the, and, or, but, in, on, at. (5) Keep slugs under 60 characters — longer slugs get truncated in search results. (6) Never start or end with a hyphen.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I handle duplicate slugs in a database?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Handle duplicate slugs by generating a unique suffix. The standard approach is to append a numeric counter: if "my-post" exists, try "my-post-2", "my-post-3", and so on. In practice: (1) Generate the base slug from the title. (2) Check if it exists in the database. (3) If it does, query for all slugs matching the pattern "base-slug*" or increment a counter. (4) Keep incrementing until you find a unique value. With Prisma, you can use findFirst with a startsWith filter, or use a raw query with LIKE. Always add a UNIQUE constraint on the slug column in your database schema to enforce uniqueness at the database level.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I generate slugs for Japanese, Chinese, or Arabic content?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Non-Latin scripts require transliteration — converting characters to their Latin equivalents. For Japanese, use the limax or unicode-slug npm package, which converts kanji and kana to romaji: "日本語" → "ri-ben-yu". For Chinese, use pinyin-based transliteration: "中文" → "zhong-wen". For Arabic, use transliteration libraries that map Arabic characters to Latin equivalents. The limax library handles 100+ languages and is the most comprehensive solution for Node.js. For Python, the python-slugify library with the unidecode dependency handles most scripts. Always test with your target language to ensure correct romanization.',
        },
      },
      {
        '@type': 'Question',
        name: 'Should I use hyphens or underscores in URL slugs?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Always use hyphens. Google\'s John Mueller has confirmed that Google treats hyphens as word separators in URLs, meaning "web-development" is parsed as two separate words: "web" and "development". Underscores are treated as character joiners, so "web_development" is treated as one word "webdevelopment", making it harder for search engines to extract keyword meaning. Stack Overflow famously switched from underscores to hyphens in their URLs years ago and saw significant SEO improvements. The hyphen preference is universal across modern CMSes, static site generators, and URL design guidelines.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the maximum recommended length for a URL slug?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The recommended maximum slug length is 50–60 characters for the slug portion, and under 2,000 characters for the full URL (a technical browser/server limit). In Google Search results, the full URL is displayed and truncated at around 35 characters in mobile and around 65 characters on desktop. Keeping slugs under 60 characters ensures the entire slug is visible in search results. For very long titles, remove stop words first (a, an, the, of, in, on, at, is, was, etc.), then truncate at a word boundary. A 4–6 word slug is ideal for both SEO and readability.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I handle slug changes and redirects?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'When a slug changes, you must implement 301 (permanent) redirects from the old slug to the new one to preserve SEO equity and avoid 404 errors. Store old slugs in a redirect table or a "slug_history" column. In Next.js, add redirects to next.config.js or use middleware to handle database-driven redirects. In WordPress, old slugs are stored in the wp_posts table as post_name, and WordPress automatically creates redirects. Never delete old slugs without redirects — broken links lose PageRank, confuse users, and frustrate search engine crawlers that have indexed the old URL.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the difference between slugify, limax, and speakingurl npm packages?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'These three packages serve different use cases: (1) slugify is the most popular and simplest package — great for English and Western European languages with accent transliteration. It has a tiny footprint and fast performance. (2) limax focuses on CJK (Chinese, Japanese, Korean) support with pinyin/romaji transliteration, plus good European language support. Best choice when your content includes Asian languages. (3) speakingurl is the most comprehensive with support for 100+ languages and extensive stop-word removal in each language. It was once the gold standard but has slowed development. For most projects, slugify is sufficient; add limax if you need CJK support.',
        },
      },
    ],
  };

  return (
    <article style={{ lineHeight: '1.7', color: '#334155' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <link rel="canonical" href="https://viadreams.cc/en/blog/slug-generator-online-guide" />

      {/* TL;DR Box */}
      <div style={{ background: '#f0f9ff', borderLeft: '4px solid #0ea5e9', borderRadius: '8px', padding: '1rem', marginBottom: '1.5rem' }}>
        <p style={{ fontWeight: 700, marginBottom: '0.5rem', color: '#0369a1' }}>TL;DR</p>
        <p style={{ margin: 0 }}>
          A <strong>URL slug</strong> is the human-readable part of a URL — lowercase, hyphen-separated, with special
          characters stripped. Generate slugs in JavaScript with a single regex pipeline, or use the{' '}
          <code>slugify</code> npm package for production. For Python, use <code>python-slugify</code>. For
          multilingual content (Japanese, Chinese, Arabic), use <code>limax</code> for transliteration. Always enforce
          uniqueness at the database level and implement 301 redirects when slugs change. Keep slugs under 60 characters
          and remove stop words for SEO. Use our{' '}
          <Link href={`/${lang}/tools/slug-generator`} style={{ color: '#0284c7' }}>online slug generator</Link>{' '}
          to convert any text instantly.
        </p>
      </div>

      {/* Section 1: What is a URL Slug */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        What Is a URL Slug? Definition, SEO Importance, and Rules
      </h2>
      <p>
        A <strong>URL slug</strong> is the part of a URL that comes after the domain name and identifies a specific
        page in a human-readable format. It is the final segment of a URL path, typically derived from the page title
        or content subject. Consider this URL:
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem', marginBottom: '1rem' }}><code>{`https://example.com/blog/how-to-create-seo-friendly-url-slugs
                      ↑                  ↑
                   base path           slug`}</code></pre>
      <p>
        The slug <code>how-to-create-seo-friendly-url-slugs</code> is the identifier. Slugs originated in publishing
        as a short label for an article before it was published. Web frameworks adopted the term for URL segments.
      </p>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        SEO Importance
      </h3>
      <p>
        URL slugs are a lightweight but real ranking factor. Google reads the URL to understand what a page is about
        before it even reads the content. A slug containing your target keyword signals strong topical relevance.
        Additionally:
      </p>
      <ul>
        <li>URLs appear in SERPs (search engine results pages) — clean slugs get higher click-through rates</li>
        <li>Shared URLs (social media, email) are more trustworthy when slugs are readable</li>
        <li>Anchor text in backlinks often copies the URL — a keyword-rich slug helps</li>
        <li>Google has confirmed that hyphens separate words in slugs (underscores do not)</li>
      </ul>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Slug Rules
      </h3>
      <div style={{ overflowX: 'auto', marginBottom: '1rem' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
          <thead>
            <tr style={{ background: '#f1f5f9' }}>
              <th style={{ padding: '10px 12px', textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>Rule</th>
              <th style={{ padding: '10px 12px', textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>Correct</th>
              <th style={{ padding: '10px 12px', textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>Wrong</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Lowercase only</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0', color: '#16a34a' }}><code>my-blog-post</code></td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0', color: '#dc2626' }}><code>My-Blog-Post</code></td>
            </tr>
            <tr style={{ background: '#fafafa' }}>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Hyphens as separators</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0', color: '#16a34a' }}><code>url-slug-guide</code></td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0', color: '#dc2626' }}><code>url_slug_guide</code></td>
            </tr>
            <tr>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>No special characters</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0', color: '#16a34a' }}><code>cafe-au-lait</code></td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0', color: '#dc2626' }}><code>café-au-lait</code></td>
            </tr>
            <tr style={{ background: '#fafafa' }}>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>No leading/trailing hyphens</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0', color: '#16a34a' }}><code>seo-best-practices</code></td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0', color: '#dc2626' }}><code>-seo-best-practices-</code></td>
            </tr>
            <tr>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Under 60 characters</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0', color: '#16a34a' }}><code>javascript-slug-generator</code></td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0', color: '#dc2626' }}><code>the-complete-and-very-long-guide-to-creating-url-slugs-for-seo</code></td>
            </tr>
            <tr style={{ background: '#fafafa' }}>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>No consecutive hyphens</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0', color: '#16a34a' }}><code>c-plus-plus-guide</code></td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0', color: '#dc2626' }}><code>c--plus--plus--guide</code></td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Section 2: JavaScript Slug Generator */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        JavaScript Slug Generator — Comprehensive Function with Unicode Support
      </h2>
      <p>
        The following function handles the full range of slug generation requirements: Unicode normalization,
        accent removal, special character stripping, consecutive hyphen collapsing, and trim. It works in both
        Node.js and modern browsers with zero dependencies.
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem', marginBottom: '1rem' }}><code>{`/**
 * Comprehensive URL slug generator
 * Handles Unicode, accents, special chars, consecutive hyphens
 * @param {string} text - Input text to slugify
 * @param {object} options - Configuration options
 * @returns {string} - URL-safe slug
 */
function generateSlug(text, options = {}) {
  const {
    separator = '-',
    lowercase = true,
    maxLength = 0,     // 0 = no limit
    stopWords = [],    // words to remove e.g. ['a', 'an', 'the']
    strict = false,    // only allow [a-z0-9] and separator if true
  } = options;

  if (!text || typeof text !== 'string') return '';

  let slug = text
    // Step 1: Normalize Unicode — decompose accented characters
    // e.g. "é" → "e\u0301" (e + combining acute accent)
    .normalize('NFD')

    // Step 2: Remove combining diacritical marks (accents)
    // Unicode range U+0300–U+036F = combining marks
    .replace(/[\u0300-\u036f]/g, '')

    // Step 3: Handle common special characters explicitly
    .replace(/[&]/g, ' and ')
    .replace(/[@]/g, ' at ')
    .replace(/[%]/g, ' percent ')
    .replace(/[+]/g, ' plus ')
    .replace(/[=]/g, ' equals ')

    // Step 4: Convert to lowercase
    .toLowerCase()

    // Step 5: Remove stop words if provided
    // Wrap in word boundaries to avoid partial matches
    // (only applied if stopWords array is non-empty)
    .replace(
      stopWords.length
        ? new RegExp('\\b(' + stopWords.join('|') + ')\\b', 'gi')
        : /(?!)/,
      ''
    );

  if (strict) {
    // Strict mode: only keep a-z, 0-9, and whitespace
    slug = slug.replace(/[^a-z0-9\s]/g, ' ');
  } else {
    // Normal mode: keep letters, numbers, whitespace; remove everything else
    slug = slug.replace(/[^\w\s-]/g, ' ');
  }

  slug = slug
    // Step 6: Replace whitespace and underscores with separator
    .replace(/[\s_]+/g, separator)

    // Step 7: Collapse consecutive separators into one
    .replace(new RegExp(separator.replace(/[-]/g, '\\-') + '+', 'g'), separator)

    // Step 8: Trim leading and trailing separators
    .replace(new RegExp('^' + separator.replace(/[-]/g, '\\-') + '+|' + separator.replace(/[-]/g, '\\-') + '+$', 'g'), '');

  // Step 9: Optional max length (truncate at word boundary)
  if (maxLength > 0 && slug.length > maxLength) {
    slug = slug.substring(0, maxLength);
    // Trim trailing separator if we cut mid-word
    slug = slug.replace(new RegExp(separator.replace(/[-]/g, '\\-') + '+$'), '');
  }

  return slug;
}

// Examples:
console.log(generateSlug('Hello World!'));
// → "hello-world"

console.log(generateSlug('Hello World — Unicode Text'));
// → "hello-world-unicode-text"

console.log(generateSlug('C++ Programming & Data Structures'));
// → "c-programming-and-data-structures"

console.log(generateSlug('The Complete Guide to URL Slugs', {
  stopWords: ['a', 'an', 'the', 'to'],
  maxLength: 50,
}));
// → "complete-guide-url-slugs"

console.log(generateSlug('100% Free @ Home + Garden = Life!'));
// → "100-percent-free-at-home-plus-garden-equals-life"

console.log(generateSlug('  ---Hello   World---  '));
// → "hello-world"

// TypeScript version:
function generateSlugTS(
  text: string,
  options: {
    separator?: string;
    lowercase?: boolean;
    maxLength?: number;
    stopWords?: string[];
    strict?: boolean;
  } = {}
): string {
  const { separator = '-', maxLength = 0, stopWords = [], strict = false } = options;

  if (!text) return '';

  let slug = text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[&]/g, ' and ')
    .replace(/[@]/g, ' at ')
    .toLowerCase();

  if (strict) {
    slug = slug.replace(/[^a-z0-9\s]/g, ' ');
  } else {
    slug = slug.replace(/[^\w\s-]/g, ' ');
  }

  if (stopWords.length) {
    slug = slug.replace(new RegExp('\\b(' + stopWords.join('|') + ')\\b', 'gi'), '');
  }

  slug = slug
    .replace(/[\s_]+/g, separator)
    .replace(/-+/g, separator)
    .replace(/^-+|-+$/g, '');

  if (maxLength > 0 && slug.length > maxLength) {
    slug = slug.substring(0, maxLength).replace(/-+$/, '');
  }

  return slug;
}`}</code></pre>

      {/* Section 3: slugify npm library */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        Using the slugify npm Library — Options, Custom Replacements, and Locale
      </h2>
      <p>
        The <code>slugify</code> package is the most widely used slug library in the Node.js ecosystem with over
        10 million weekly downloads. It handles accent removal, Unicode normalization, and provides a clean API
        with sensible defaults.
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem', marginBottom: '1rem' }}><code>{`# Install
npm install slugify

# With TypeScript types (included in package)
npm install slugify`}</code></pre>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem', marginBottom: '1rem' }}><code>{`import slugify from 'slugify';
// Or CommonJS:
// const slugify = require('slugify');

// Basic usage — converts to lowercase and replaces spaces with hyphens
slugify('Hello World');
// → 'Hello-World'   (note: lowercase not applied by default!)

// Always use { lower: true } for SEO-friendly slugs
slugify('Hello World', { lower: true });
// → 'hello-world'

// ===== ALL OPTIONS =====
slugify('My String Value!', {
  replacement: '-',        // replace spaces with this character (default: '-')
  remove: undefined,       // regex to remove characters (e.g. /[*+~.()'"!:@]/g)
  lower: true,             // convert to lowercase (default: false)
  strict: false,           // strip special characters except replacement (default: false)
  locale: 'de',            // language for character mappings (default: system)
  trim: true,              // trim leading/trailing replacement chars (default: true)
});

// ===== STRICT MODE =====
// strict: true only keeps [a-z], [0-9], and the replacement character
slugify('Hello@World #2024!', { lower: true, strict: true });
// → 'helloworld-2024'

// ===== CUSTOM CHARACTER REPLACEMENTS =====
// Extend the default character map with your own mappings
slugify.extend({
  '♥': 'love',     // ♥ → love
  '©': 'c',         // © → c
  '™': 'tm',        // ™ → tm
  '€': 'euro',      // € → euro
  '£': 'pound',     // £ → pound
  '$': 'dollar',    // $ → dollar
  '¥': 'yen',       // ¥ → yen
  '★': 'star',      // ★ → star
  '→': 'to',        // → → to
  '≥': 'gte',       // ≥ → gte
  '≤': 'lte',       // ≤ → lte
});

slugify('I ♥ JavaScript €100', { lower: true });
// → 'i-love-javascript-euro100'

// ===== LOCALE SUPPORT =====
// German: ü → ue, ö → oe, ä → ae, ß → ss
slugify('Schöne Grüße', { lower: true, locale: 'de' });
// → 'schone-gruse'   (without locale: 'de')
// → 'schoene-gruesse' (with locale: 'de') — more accurate German

// Turkish: ı → i, ğ → g, ş → s, ç → c, ö → o, ü → u
slugify('Merhaba Dünya', { lower: true, locale: 'tr' });
// → 'merhaba-dunya'

// Vietnamese: handles tonal diacritics
slugify('Thành phố Hồ Chí Minh', { lower: true, locale: 'vi' });
// → 'thanh-pho-ho-chi-minh'

// ===== REMOVE SPECIFIC CHARACTERS =====
// Remove characters matching a regex
slugify('Hello.World (2024) [v2]', {
  lower: true,
  remove: /[.*+~()'"!:@\[\]]/g,
});
// → 'hello-world-2024-v2'

// ===== REAL-WORLD EXAMPLE: Blog Post Slug =====
function createBlogSlug(title: string): string {
  return slugify(title, {
    lower: true,
    strict: true,
    remove: /[*+~.()'"!:@#$%^&]/g,
    trim: true,
  });
}

createBlogSlug('Top 10 JavaScript Tips & Tricks (2024)');
// → 'top-10-javascript-tips-tricks-2024'

createBlogSlug('What\'s New in React 19?');
// → 'whats-new-in-react-19'`}</code></pre>

      {/* Section 4: Python slugify */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        Python Slug Generation — python-slugify, Custom Stopwords, max_length
      </h2>
      <p>
        Python has several slugify libraries. The most full-featured is <code>python-slugify</code>, which uses
        <code>text-unidecode</code> (or optionally <code>unidecode</code>) for transliteration and supports
        stopwords, max length, and custom separators.
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem', marginBottom: '1rem' }}><code>{`# Install
pip install python-slugify

# Optional: better transliteration for non-Latin scripts
pip install python-slugify[unidecode]`}</code></pre>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem', marginBottom: '1rem' }}><code>{`from slugify import slugify

# Basic usage
slugify('Hello World')
# → 'hello-world'

slugify('Héllo Wörld')
# → 'hello-world'

# ===== ALL PARAMETERS =====
slugify(
    'My Title String!',
    entities=True,           # decode HTML entities (&amp; → and)
    decimal=True,            # decode decimal HTML entities (&#65; → a)
    hexadecimal=True,        # decode hex HTML entities (&#x41; → a)
    max_length=0,            # truncate to this length (0 = no limit)
    word_boundary=False,     # truncate at word boundary if True
    save_order=False,        # maintain word order after stopword removal
    separator='-',           # character between words
    stopwords=(),            # tuple/list of words to remove
    regex_pattern=None,      # custom regex for character replacement
    lowercase=True,          # convert to lowercase
    replacements=(),         # list of [original, replacement] pairs
    allow_unicode=False,     # allow unicode characters in output
)

# ===== STOPWORDS =====
slugify('The Complete Guide to Python Programming',
        stopwords=['the', 'to', 'a', 'an', 'of', 'in', 'and', 'or'])
# → 'complete-guide-python-programming'

slugify('A Journey Through Time and Space',
        stopwords=['a', 'and', 'through'])
# → 'journey-time-space'

# ===== MAX LENGTH WITH WORD BOUNDARY =====
# Without word_boundary: truncates exactly at max_length chars
slugify('This is a very long title that exceeds the limit',
        max_length=30)
# → 'this-is-a-very-long-title-tha'  (cuts mid-word!)

# With word_boundary: truncates at the nearest word boundary
slugify('This is a very long title that exceeds the limit',
        max_length=30,
        word_boundary=True)
# → 'this-is-a-very-long-title'  (clean word boundary)

# ===== CUSTOM REPLACEMENTS =====
# List of [from, to] pairs applied before slugification
slugify('C++ Programming & Web Development',
        replacements=[
            ['C++', 'cpp'],
            ['&', 'and'],
        ])
# → 'cpp-programming-and-web-development'

# ===== ALLOW UNICODE (for CJK or Cyrillic slugs) =====
slugify('Привет мир', allow_unicode=True)
# → 'привет-мир'   (Cyrillic preserved)

# ===== CUSTOM REGEX =====
import re
slugify('Hello---World   (2024)',
        regex_pattern=re.compile(r'[^a-z0-9]+'))
# → 'hello-world-2024'

# ===== PRACTICAL: Django/Flask slug field =====
from slugify import slugify as python_slugify

def create_unique_slug(title: str, existing_slugs: list[str]) -> str:
    """Generate a unique slug, appending a number if needed."""
    base = python_slugify(title, max_length=60, word_boundary=True)
    if base not in existing_slugs:
        return base
    counter = 2
    while f'{base}-{counter}' in existing_slugs:
        counter += 1
    return f'{base}-{counter}'

# Django model usage:
from django.db import models
from slugify import slugify as python_slugify

class Article(models.Model):
    title = models.CharField(max_length=200)
    slug = models.SlugField(unique=True, max_length=70)

    def save(self, *args, **kwargs):
        if not self.slug:
            base_slug = python_slugify(self.title, max_length=60, word_boundary=True)
            slug = base_slug
            n = 2
            while Article.objects.filter(slug=slug).exists():
                slug = f'{base_slug}-{n}'
                n += 1
            self.slug = slug
        super().save(*args, **kwargs)`}</code></pre>

      {/* Section 5: Next.js/Express URL params */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        Next.js and Express URL Routing with Slugs — Dynamic Routes and getStaticPaths
      </h2>
      <p>
        Slugs are the backbone of dynamic routing in modern web frameworks. Here is how to use slugs in both
        Next.js (App Router and Pages Router) and Express.js.
      </p>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Next.js App Router (Next.js 13+)
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem', marginBottom: '1rem' }}><code>{`// File: src/app/blog/[slug]/page.tsx
// URL: /blog/my-post-slug

import { notFound } from 'next/navigation';
import { getPostBySlug, getAllPosts } from '@/lib/posts';

interface PageProps {
  params: { slug: string };
}

// Generate static pages for all known slugs (SSG)
export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

// Generate dynamic metadata per page
export async function generateMetadata({ params }: PageProps) {
  const post = await getPostBySlug(params.slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.excerpt,
    alternates: {
      canonical: \`https://example.com/blog/\${params.slug}\`,
    },
    openGraph: {
      title: post.title,
      url: \`https://example.com/blog/\${params.slug}\`,
    },
  };
}

// Page component
export default async function BlogPost({ params }: PageProps) {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    notFound(); // Returns 404 page
  }

  return (
    <article>
      <h1>{post.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
    </article>
  );
}

// File: src/app/blog/[slug]/not-found.tsx
export default function NotFound() {
  return <div>Post not found. It may have moved.</div>;
}

// ===== CATCH-ALL SLUG (nested paths) =====
// File: src/app/docs/[...slug]/page.tsx
// Matches: /docs/api, /docs/api/auth, /docs/api/auth/tokens

interface CatchAllProps {
  params: { slug: string[] }; // Array of path segments
}

export default function DocsPage({ params }: CatchAllProps) {
  const slugPath = params.slug.join('/');
  // For /docs/api/auth → slugPath = 'api/auth'
  return <div>Docs: {slugPath}</div>;
}`}</code></pre>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Next.js Pages Router with getStaticPaths
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem', marginBottom: '1rem' }}><code>{`// File: pages/blog/[slug].tsx

import { GetStaticPaths, GetStaticProps } from 'next';
import { getPostBySlug, getAllPosts } from '@/lib/posts';

interface Post {
  title: string;
  slug: string;
  content: string;
}

interface Props {
  post: Post;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getAllPosts();

  return {
    paths: posts.map((post) => ({
      params: { slug: post.slug },
    })),
    fallback: 'blocking', // ISR: generate new pages on demand
    // fallback: false     → 404 for unknown slugs (good for finite content)
    // fallback: true      → show loading state, then generate
    // fallback: 'blocking'→ wait for generation, then serve (recommended)
  };
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const slug = params?.slug as string;
  const post = await getPostBySlug(slug);

  if (!post) {
    return { notFound: true }; // Returns 404
  }

  return {
    props: { post },
    revalidate: 3600, // ISR: regenerate every hour
  };
};

export default function BlogPost({ post }: Props) {
  return (
    <article>
      <h1>{post.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
    </article>
  );
}`}</code></pre>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Express.js Slug Routes
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem', marginBottom: '1rem' }}><code>{`import express from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

// GET /blog/:slug — fetch post by slug
router.get('/blog/:slug', async (req, res) => {
  const { slug } = req.params;

  // Validate slug format (security: prevent injection)
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
    return res.status(400).json({ error: 'Invalid slug format' });
  }

  try {
    const post = await prisma.post.findUnique({
      where: { slug },
    });

    if (!post) {
      // Check if there's a redirect
      const redirect = await prisma.slugRedirect.findUnique({
        where: { oldSlug: slug },
      });

      if (redirect) {
        return res.redirect(301, \`/blog/\${redirect.newSlug}\`);
      }

      return res.status(404).json({ error: 'Post not found' });
    }

    res.json(post);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST /blog — create post with auto-generated slug
router.post('/blog', async (req, res) => {
  const { title, content } = req.body;

  // Generate slug from title
  const baseSlug = generateSlug(title, { maxLength: 60, stopWords: ['a', 'an', 'the'] });

  // Ensure uniqueness
  const slug = await generateUniqueSlug(baseSlug);

  const post = await prisma.post.create({
    data: { title, content, slug },
  });

  res.status(201).json(post);
});

// Utility: find unique slug
async function generateUniqueSlug(baseSlug: string): Promise<string> {
  let slug = baseSlug;
  let counter = 2;

  while (await prisma.post.findUnique({ where: { slug } })) {
    slug = \`\${baseSlug}-\${counter}\`;
    counter++;
  }

  return slug;
}`}</code></pre>

      {/* Section 6: Handling Conflicts */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        Handling Slug Conflicts — Uniqueness in Databases and Auto-Increment Suffix
      </h2>
      <p>
        Slug conflicts occur when two pieces of content generate the same slug — for example, two articles titled
        &ldquo;JavaScript Tips&rdquo; and &ldquo;JavaScript Tips!&rdquo; both produce <code>javascript-tips</code>.
        The standard solution is to append an incrementing numeric suffix.
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem', marginBottom: '1rem' }}><code>{`// Prisma schema: enforce uniqueness at DB level
// schema.prisma
model Post {
  id        Int      @id @default(autoincrement())
  title     String
  slug      String   @unique   // ← DB-level UNIQUE constraint
  content   String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  // For redirect tracking
  slugHistory SlugHistory[]
}

model SlugHistory {
  id      Int    @id @default(autoincrement())
  oldSlug String @unique
  postId  Int
  post    Post   @relation(fields: [postId], references: [id])
}

// ===== APPROACH 1: Simple loop (best for low-concurrency) =====
async function generateUniqueSlug(
  prisma: PrismaClient,
  baseSlug: string,
  excludeId?: number  // exclude current post when updating
): Promise<string> {
  let slug = baseSlug;
  let counter = 2;

  while (true) {
    const existing = await prisma.post.findFirst({
      where: {
        slug,
        ...(excludeId ? { id: { not: excludeId } } : {}),
      },
    });

    if (!existing) break; // slug is available

    slug = \`\${baseSlug}-\${counter}\`;
    counter++;
  }

  return slug;
}

// Usage:
const slug = await generateUniqueSlug(prisma, 'javascript-tips');
// If 'javascript-tips' and 'javascript-tips-2' exist:
// → 'javascript-tips-3'

// ===== APPROACH 2: Count-based (fewer DB queries) =====
async function generateUniqueSlugFast(
  prisma: PrismaClient,
  baseSlug: string
): Promise<string> {
  // Find all slugs starting with the base slug
  const existing = await prisma.post.findMany({
    where: {
      slug: { startsWith: baseSlug },
    },
    select: { slug: true },
  });

  if (existing.length === 0) return baseSlug;

  const existingSlugs = new Set(existing.map((p) => p.slug));

  if (!existingSlugs.has(baseSlug)) return baseSlug;

  // Find the next available number
  let counter = 2;
  while (existingSlugs.has(\`\${baseSlug}-\${counter}\`)) {
    counter++;
  }

  return \`\${baseSlug}-\${counter}\`;
}

// ===== APPROACH 3: Raw SQL with advisory lock (high concurrency) =====
// For production systems with high concurrent post creation:
async function generateUniqueSlugAtomic(
  prisma: PrismaClient,
  baseSlug: string
): Promise<string> {
  // PostgreSQL: use WITH RECURSIVE to find next available slug atomically
  const result = await prisma.$queryRaw<[{ slug: string }]>\`
    WITH RECURSIVE slugs AS (
      SELECT slug FROM posts WHERE slug LIKE \${baseSlug + '%'}
    ),
    numbered AS (
      SELECT \${baseSlug}::text AS candidate, 1 AS n
      UNION ALL
      SELECT \${baseSlug} || '-' || (n + 1)::text, n + 1
      FROM numbered
      WHERE candidate IN (SELECT slug FROM slugs)
      AND n < 1000
    )
    SELECT candidate AS slug FROM numbered
    WHERE candidate NOT IN (SELECT slug FROM slugs)
    LIMIT 1
  \`;

  return result[0]?.slug ?? baseSlug;
}

// ===== UPDATE SLUG WITH HISTORY (for redirects) =====
async function updatePostSlug(
  prisma: PrismaClient,
  postId: number,
  newTitle: string
): Promise<string> {
  const post = await prisma.post.findUnique({ where: { id: postId } });
  if (!post) throw new Error('Post not found');

  const newBaseSlug = generateSlug(newTitle, { maxLength: 60 });

  if (newBaseSlug === post.slug) return post.slug; // no change

  const newSlug = await generateUniqueSlug(prisma, newBaseSlug, postId);

  // Update with history tracking (transaction)
  await prisma.$transaction([
    prisma.slugHistory.upsert({
      where: { oldSlug: post.slug },
      create: { oldSlug: post.slug, postId },
      update: {}, // already exists, no action
    }),
    prisma.post.update({
      where: { id: postId },
      data: { slug: newSlug },
    }),
  ]);

  return newSlug;
}`}</code></pre>

      {/* Section 7: Multilingual Slugs */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        Multilingual Slugs — Japanese, Chinese, Arabic Transliteration with limax and unicode-slug
      </h2>
      <p>
        When content is in non-Latin scripts, generating slugs requires <strong>transliteration</strong> — converting
        characters to their Latin phonetic equivalents. The standard approach uses the{' '}
        <strong>limax</strong> library for Node.js, which supports 100+ languages including CJK (Chinese, Japanese,
        Korean), Arabic, Hebrew, Cyrillic, and more.
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem', marginBottom: '1rem' }}><code>{`npm install limax unicode-slug`}</code></pre>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem', marginBottom: '1rem' }}><code>{`import limax from 'limax';
import unicodeSlug from 'unicode-slug';

// ===== limax: Best for CJK + multilingual =====

// Japanese — converts kanji/kana to romaji
limax('日本語のタイトル');
// → 'ri-ben-yu-notaitoru'

limax('東京都', { lang: 'ja' });
// → 'dong-jing-du'   (using Chinese reading of kanji — specify lang for accuracy)

limax('東京都', { lang: 'ja', tone: false });
// → 'dongjingdu'

// Chinese — converts to pinyin
limax('中文标题示例');
// → 'zhong-wen-biao-ti-shi-li'

limax('你好世界', { lang: 'zh' });
// → 'ni-hao-shi-jie'

// Korean — converts to romanized Hangul
limax('한국어 제목');
// → 'hangugeo-jemog'

// Arabic — transliterates to Latin
limax('مرحبا بالعالم');
// → 'mrhba-balealm'

// Russian — Cyrillic to Latin
limax('Привет мир');
// → 'privet-mir'

// Greek
limax('Γεια σου κόσμε');
// → 'geia-sou-kosme'

// ===== unicode-slug: Lighter alternative =====
// Less comprehensive but faster, good for European languages + some CJK
unicodeSlug('Héllo Wörld');
// → 'hello-world'

unicodeSlug('日本語');
// → 'ri-ben-yu'  (basic CJK support)

// ===== PRACTICAL: Language-aware slug function =====
interface SlugOptions {
  lang?: string;
  maxLength?: number;
  separator?: string;
}

async function generateMultilingualSlug(
  text: string,
  options: SlugOptions = {}
): Promise<string> {
  const { lang = 'en', maxLength = 60, separator = '-' } = options;

  // Detect if text contains non-Latin characters
  const hasNonLatin = /[^\u0000-\u007E]/.test(text);

  let slug: string;

  if (hasNonLatin) {
    // Use limax for transliteration
    slug = limax(text, {
      lang: lang as string,
      separator,
      tone: false,      // exclude tone marks from pinyin
      trim: true,
    });
  } else {
    // Pure ASCII — use simple approach
    slug = text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, separator)
      .replace(new RegExp(\`^\${separator}|\${separator}$\`, 'g'), '');
  }

  // Apply max length at word boundary
  if (maxLength > 0 && slug.length > maxLength) {
    slug = slug.substring(0, maxLength).replace(/-+$/, '');
  }

  return slug;
}

// Examples:
await generateMultilingualSlug('JavaScript Tutorial', { lang: 'en' });
// → 'javascript-tutorial'

await generateMultilingualSlug('JavaScriptチュートリアル', { lang: 'ja' });
// → 'javascriptchiyutoriaru'

await generateMultilingualSlug('JavaScript教程', { lang: 'zh' });
// → 'javascript-jiao-cheng'

await generateMultilingualSlug('دليل JavaScript', { lang: 'ar' });
// → 'dlyl-javascript'

// ===== ALLOW UNICODE SLUGS (modern approach) =====
// Modern browsers and servers support Unicode in URLs (percent-encoded)
// This preserves the original script — better UX for native speakers

function generateUnicodeSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    // Only remove truly special chars — keep Unicode letters/numbers
    .replace(/[^\p{L}\p{N}\s-]/gu, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

generateUnicodeSlug('مرحبا بالعالم');
// → 'مرحبا-بالعالم'   (Arabic preserved, URL-encoded when transmitted)

generateUnicodeSlug('中文标题');
// → '中文标题'   (Chinese preserved)

// Note: These display correctly in browsers but look like %E4%B8%AD%E6%96%87...
// in server logs. Choose transliteration vs Unicode based on your audience.`}</code></pre>

      {/* Section 8: Go slug package */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        Go Slug Generation — github.com/gosimple/slug, MakeSlug, and AddSub
      </h2>
      <p>
        Go has a well-maintained slug library at <code>github.com/gosimple/slug</code>. It handles Unicode
        transliteration, provides language-specific substitutions, and supports custom character mappings.
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem', marginBottom: '1rem' }}><code>{`# Install
go get github.com/gosimple/slug`}</code></pre>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem', marginBottom: '1rem' }}><code>{`package main

import (
    "fmt"
    "strings"
    "regexp"
    "github.com/gosimple/slug"
)

func main() {
    // ===== Basic slug generation =====
    fmt.Println(slug.Make("Hello World"))
    // → "hello-world"

    fmt.Println(slug.Make("Héllo Wörld"))
    // → "hello-world"

    fmt.Println(slug.Make("C++ Programming & Data Structures"))
    // → "c-programming-and-data-structures"

    // ===== MakeLang: language-specific substitutions =====
    // German: ü → ue, ö → oe, ä → ae, ß → ss
    fmt.Println(slug.MakeLang("Schöne Grüße", "de"))
    // → "schoene-gruesse"

    // Swedish: å → aa, ä → ae, ö → oe
    fmt.Println(slug.MakeLang("Öppen källkod", "sv"))
    // → "oppen-kallkod"

    // Turkish: ı → i, ğ → g, ş → s, ç → c
    fmt.Println(slug.MakeLang("Merhaba Dünya", "tr"))
    // → "merhaba-dunya"

    // ===== AddSub: add custom substitutions =====
    // Add language-specific or domain-specific character mappings
    // AddSub(character string, sub string, lang string)
    slug.AddSub("♥", "love", "en")
    slug.AddSub("→", "to", "en")
    slug.AddSub("≥", "gte", "en")
    slug.AddSub("€", "euro", "en")
    slug.AddSub("£", "pound", "en")

    fmt.Println(slug.Make("I ♥ Go → Fast Code ≥ €1000"))
    // → "i-love-go-to-fast-code-gte-euro1000"

    // German-specific
    slug.AddSub("ü", "ue", "de")
    slug.AddSub("ö", "oe", "de")
    slug.AddSub("ä", "ae", "de")
    slug.AddSub("ß", "ss", "de")

    fmt.Println(slug.MakeLang("Brücke über den Rhein", "de"))
    // → "bruecke-ueber-den-rhein"

    // ===== Custom separator =====
    slug.CustomSub = map[string]string{
        " ": "_",  // use underscore (not recommended for SEO)
    }
    // Note: Reset after custom use:
    slug.CustomSub = nil

    // ===== IsSlug: validate an existing slug =====
    fmt.Println(slug.IsSlug("hello-world"))      // true
    fmt.Println(slug.IsSlug("Hello World"))       // false (uppercase + space)
    fmt.Println(slug.IsSlug("hello--world"))      // false (double hyphen)
    fmt.Println(slug.IsSlug("-hello-world"))      // false (leading hyphen)

    // ===== Unique slug generator in Go =====
    fmt.Println(makeUniqueSlug("JavaScript Tips", []string{}))
    // → "javascript-tips"

    fmt.Println(makeUniqueSlug("JavaScript Tips", []string{"javascript-tips", "javascript-tips-2"}))
    // → "javascript-tips-3"
}

// makeUniqueSlug generates a slug unique within existingSlugs
func makeUniqueSlug(title string, existingSlugs []string) string {
    baseSlug := slug.Make(title)

    // Build set for O(1) lookup
    existing := make(map[string]bool, len(existingSlugs))
    for _, s := range existingSlugs {
        existing[s] = true
    }

    if !existing[baseSlug] {
        return baseSlug
    }

    for i := 2; i < 10000; i++ {
        candidate := fmt.Sprintf("%s-%d", baseSlug, i)
        if !existing[candidate] {
            return candidate
        }
    }

    return baseSlug // fallback (should never reach here)
}

// slugifyAndTruncate: slug with max length at word boundary
func slugifyAndTruncate(title string, maxLen int) string {
    s := slug.Make(title)
    if len(s) <= maxLen {
        return s
    }

    // Truncate at word boundary
    truncated := s[:maxLen]
    lastHyphen := strings.LastIndex(truncated, "-")
    if lastHyphen > 0 {
        truncated = truncated[:lastHyphen]
    }

    return truncated
}

// validateSlug: ensure a slug matches strict format
var slugRegex = regexp.MustCompile(\`^[a-z0-9]+(?:-[a-z0-9]+)*$\`)

func validateSlug(s string) bool {
    if len(s) == 0 || len(s) > 100 {
        return false
    }
    return slugRegex.MatchString(s)
}`}</code></pre>

      {/* Section 9: SEO Best Practices */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        SEO Best Practices — Max Length, Stop Words, Canonical URLs
      </h2>
      <p>
        Slug SEO optimization goes beyond just converting text. Strategic decisions about length, keyword inclusion,
        and canonical URL management have measurable ranking impact.
      </p>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Length Guidelines
      </h3>
      <div style={{ overflowX: 'auto', marginBottom: '1rem' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
          <thead>
            <tr style={{ background: '#f1f5f9' }}>
              <th style={{ padding: '10px 12px', textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>Length</th>
              <th style={{ padding: '10px 12px', textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>Assessment</th>
              <th style={{ padding: '10px 12px', textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>Example</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>3–30 chars</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0', color: '#16a34a' }}>Ideal</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}><code>javascript-promises</code></td>
            </tr>
            <tr style={{ background: '#fafafa' }}>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>31–60 chars</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0', color: '#ca8a04' }}>Acceptable</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}><code>complete-guide-javascript-promises-async-await</code></td>
            </tr>
            <tr>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>61–100 chars</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0', color: '#dc2626' }}>Too long</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}><code>the-complete-definitive-guide-to-understanding-javascript-promises-async-await-2024</code></td>
            </tr>
          </tbody>
        </table>
      </div>

      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem', marginBottom: '1rem' }}><code>{`// ===== SEO STOP WORDS (commonly removed from slugs) =====
const SEO_STOP_WORDS = [
  // Articles
  'a', 'an', 'the',
  // Prepositions
  'in', 'on', 'at', 'by', 'for', 'with', 'about', 'against',
  'between', 'into', 'through', 'during', 'before', 'after',
  'above', 'below', 'from', 'up', 'down', 'of', 'off', 'over', 'under',
  // Conjunctions
  'and', 'but', 'or', 'nor', 'so', 'yet',
  // Pronouns
  'i', 'me', 'my', 'myself', 'we', 'our', 'you', 'your',
  // Common verbs (in titles)
  'is', 'are', 'was', 'were', 'be', 'been', 'being',
  'have', 'has', 'had', 'do', 'does', 'did',
  // Other fillers
  'to', 'this', 'that', 'these', 'those',
];

function seoSlug(title: string): string {
  return generateSlug(title, {
    stopWords: SEO_STOP_WORDS,
    maxLength: 60,
    lowercase: true,
  });
}

seoSlug('The Complete Guide to Understanding JavaScript Promises');
// → 'complete-guide-understanding-javascript-promises'
// (removed: the, to)

seoSlug('A Beginner\'s Introduction to React and Next.js Development');
// → 'beginners-introduction-react-nextjs-development'
// (removed: a, to, and)

// ===== CANONICAL URL PATTERNS =====
// Always add canonical to prevent duplicate content

// In Next.js App Router metadata:
export const metadata = {
  alternates: {
    canonical: 'https://example.com/blog/javascript-promises',
  },
};

// Trailing slash consistency — pick one and stick with it:
// https://example.com/blog/slug    ← no trailing slash (most common)
// https://example.com/blog/slug/   ← trailing slash

// In Next.js next.config.js — enforce trailing slash:
/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: false,  // false = no trailing slash (default)
  // trailingSlash: true  // true = always add trailing slash
};

// ===== SLUG VS QUERY PARAMETER =====
// ✅ SEO-friendly (slug in path):
// https://example.com/blog/javascript-promises

// ❌ Not SEO-friendly (id in query string):
// https://example.com/blog?id=12345

// ❌ Avoid numeric-only slugs — no keyword value:
// https://example.com/blog/12345

// ✅ Best practice: slug only, no numeric ID in URL:
// https://example.com/blog/javascript-promises

// ===== URL STRUCTURE DEPTH =====
// Google recommends keeping URLs shallow (2-3 path segments):
// ✅ /blog/javascript-promises
// ✅ /docs/api/auth
// ❌ /blog/category/subcategory/2024/01/javascript-promises  (too deep)

// ===== REDIRECT CHAIN AVOIDANCE =====
// Never chain redirects: A → B → C (loses PageRank with each hop)
// Always point old slug directly to the current canonical slug:
// ✅ /old-slug → /current-slug (301)
// ❌ /old-slug → /intermediate-slug → /current-slug (chain!)`}</code></pre>

      {/* Section 10: WordPress/CMS Patterns */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        WordPress and CMS Patterns — sanitize_title(), Custom Post Types, Redirect Handling
      </h2>
      <p>
        WordPress has a mature slug generation system built in. Understanding how it works is essential for
        WordPress developers and useful as a reference for other CMS implementations.
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem', marginBottom: '1rem' }}><code>{`<?php
// ===== WordPress Core: sanitize_title() =====
// WordPress's built-in function for generating slugs
// Hooks: 'sanitize_title' filter allows customization

$title = 'Hello World! This Is My Post';
$slug  = sanitize_title($title);
// → 'hello-world-this-is-my-post'

// sanitize_title_with_dashes() — the underlying function
$slug = sanitize_title_with_dashes($title, null, 'save');
// → 'hello-world-this-is-my-post'

// The third parameter controls behavior:
// 'save'    → used when saving to DB (more aggressive stripping)
// 'display' → used for display purposes (more lenient)

// ===== Custom slug for new posts =====
// Hook: 'wp_insert_post_data' — runs before post is saved

add_filter('wp_insert_post_data', function($data, $postarr) {
    // Only for new posts without an explicit slug
    if (empty($postarr['ID']) && empty($data['post_name'])) {
        $base_slug = sanitize_title($data['post_title']);

        // Ensure uniqueness using WordPress's built-in function
        $unique_slug = wp_unique_post_slug(
            $base_slug,
            $postarr['ID'] ?? 0,
            $data['post_status'],
            $data['post_type'],
            $data['post_parent'] ?? 0
        );

        $data['post_name'] = $unique_slug;
    }
    return $data;
}, 10, 2);

// ===== Custom Post Type with custom slug prefix =====
// Register CPT with a custom rewrite slug

function register_product_cpt() {
    register_post_type('product', [
        'labels'      => ['name' => 'Products', 'singular_name' => 'Product'],
        'public'      => true,
        'has_archive' => true,
        'rewrite'     => [
            'slug'       => 'products',       // URL prefix: /products/product-name
            'with_front' => false,            // don't prepend blog base
            'feeds'      => true,
            'pages'      => true,
        ],
        'supports'    => ['title', 'editor', 'thumbnail', 'custom-fields'],
    ]);
}
add_action('init', 'register_product_cpt');

// Individual product URL: /products/blue-running-shoes
// Archive URL:           /products/

// ===== Redirect old slugs (after slug change) =====
// WordPress stores old slugs in postmeta as '_wp_old_slug'
// and handles redirects automatically via redirect_canonical()

// To manually redirect old slugs:
add_action('template_redirect', function() {
    global $wp_query;

    if ($wp_query->is_404()) {
        $requested_slug = get_query_var('name')
            ?: sanitize_title(basename($_SERVER['REQUEST_URI']));

        // Search in old slug history
        $post = get_page_by_path($requested_slug, OBJECT, ['post', 'page', 'product']);

        if (!$post) {
            // Check _wp_old_slug postmeta
            $args = [
                'post_type'  => 'any',
                'meta_key'   => '_wp_old_slug',
                'meta_value' => $requested_slug,
                'numberposts' => 1,
            ];
            $posts = get_posts($args);

            if (!empty($posts)) {
                $post = $posts[0];
            }
        }

        if ($post) {
            wp_redirect(get_permalink($post->ID), 301);
            exit;
        }
    }
});

// ===== Customize slug with stop words removal =====
add_filter('sanitize_title', function($slug, $raw_title, $context) {
    if ($context !== 'save') return $slug;

    $stop_words = ['a', 'an', 'the', 'and', 'or', 'but', 'in', 'on', 'at', 'to'];
    $pattern = '/\b(' . implode('|', $stop_words) . ')\b/i';

    $cleaned = preg_replace($pattern, '', $raw_title);
    $cleaned = sanitize_title_with_dashes($cleaned, null, 'save');

    return $cleaned ?: $slug; // fallback to original if empty
}, 10, 3);

// ===== Gutenberg/Block Editor: update slug programmatically =====
// In a WordPress plugin using wp.data (JavaScript):
/*
const { editPost } = wp.data.dispatch('core/editor');

function updateSlugFromTitle(title) {
    const slug = title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .trim()
        .replace(/\s+/g, '-');

    editPost({ slug });
}

// Subscribe to title changes:
wp.data.subscribe(() => {
    const title = wp.data.select('core/editor').getEditedPostAttribute('title');
    if (title) updateSlugFromTitle(title);
});
*/`}</code></pre>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Headless CMS Slug Patterns (Contentful, Sanity, Strapi)
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem', marginBottom: '1rem' }}><code>{`// ===== Contentful: slug field with validation =====
// In Contentful content model, add a "Short text" field with:
// - Field ID: slug
// - Appearance: Slug (auto-generates from title field)
// - Validation: Unique (prevents duplicates)
// - Regex validation: ^[a-z0-9]+(?:-[a-z0-9]+)*$

// Fetch by slug:
import { createClient } from 'contentful';

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID!,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
});

async function getPostBySlug(slug: string) {
  const entries = await client.getEntries({
    content_type: 'blogPost',
    'fields.slug': slug,
    limit: 1,
  });

  return entries.items[0] ?? null;
}

// ===== Sanity: slug type with custom generation =====
// In schema definition (sanity/schemas/post.ts):
export default {
  name: 'post',
  type: 'document',
  fields: [
    { name: 'title', type: 'string' },
    {
      name: 'slug',
      type: 'slug',
      options: {
        source: 'title',            // auto-generate from title
        maxLength: 60,
        slugify: (input: string) =>
          input
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[^a-z0-9\s-]/g, '')
            .trim()
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-'),
        isUnique: async (slug: string, context: { document: { _id: string }; getClient: Function }) => {
          const { document, getClient } = context;
          const client = getClient({ apiVersion: '2024-01-01' });
          const id = document._id.replace(/^drafts\./, '');
          const params = { draft: \`drafts.\${id}\`, published: id, slug };
          const query = \`!defined(*[!(_id in [$draft, $published]) && slug.current == $slug][0]._id)\`;
          return await client.fetch(query, params);
        },
      },
    },
  ],
};`}</code></pre>

      {/* Quick Tool CTA */}
      <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '8px', padding: '1rem', marginTop: '2rem', marginBottom: '2rem' }}>
        <p style={{ fontWeight: 700, marginBottom: '0.5rem', color: '#1e40af' }}>Try the Online Slug Generator</p>
        <p style={{ margin: '0 0 0.75rem' }}>
          Convert any title or text to a clean, SEO-friendly URL slug instantly — with options for stop word
          removal, custom separators, max length, and Unicode support.
        </p>
        <a
          href="https://viadreams.cc/en/tools/slug-generator"
          style={{
            display: 'inline-block',
            background: '#2563eb',
            color: '#fff',
            padding: '0.5rem 1.25rem',
            borderRadius: '6px',
            textDecoration: 'none',
            fontWeight: 600,
            fontSize: '0.9rem',
          }}
        >
          Open Slug Generator →
        </a>
      </div>

      {/* Key Takeaways */}
      <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '1rem', marginTop: '2rem' }}>
        <p style={{ fontWeight: 700, marginBottom: '0.5rem', color: '#1e293b' }}>Key Takeaways</p>
        <ul style={{ margin: 0, paddingLeft: '1.25rem', lineHeight: '1.8' }}>
          <li><strong>Use hyphens, not underscores</strong>: Google treats hyphens as word separators. <code>my-blog-post</code> ranks for both &ldquo;my&rdquo;, &ldquo;blog&rdquo;, and &ldquo;post&rdquo; separately.</li>
          <li><strong>Always lowercase</strong>: Uppercase slugs create duplicate content issues and confuse server routing on case-sensitive systems.</li>
          <li><strong>Remove accents via Unicode normalization</strong>: Use <code>.normalize('NFD').replace(/[\u0300-\u036f]/g, '')</code> before any other processing.</li>
          <li><strong>Keep slugs under 60 characters</strong>: Remove stop words (a, an, the, in, on, at) and truncate at word boundaries.</li>
          <li><strong>Enforce DB-level uniqueness</strong>: Always add a <code>UNIQUE</code> constraint on the slug column regardless of application-level checks.</li>
          <li><strong>Auto-increment suffix for conflicts</strong>: When a slug exists, append <code>-2</code>, <code>-3</code> etc. — never use random strings or timestamps.</li>
          <li><strong>301 redirect on slug change</strong>: Store old slugs and redirect permanently. Never leave broken URLs — they bleed PageRank and confuse crawlers.</li>
          <li><strong>Use limax for CJK content</strong>: The <code>limax</code> library handles Japanese, Chinese, Korean, Arabic, and 100+ other languages with accurate transliteration.</li>
          <li><strong>slugify npm for Western languages</strong>: Simple, fast, zero dependencies — perfect for English and European content with accent stripping.</li>
          <li><strong>Canonical URLs prevent duplicates</strong>: Always add <code>rel="canonical"</code> and be consistent about trailing slashes across your entire site.</li>
        </ul>
      </div>
    </article>
  );
}
