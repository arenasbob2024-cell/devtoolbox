const fs = require('fs');
const path = require('path');

const ROOT = '/var/www/devtoolbox';
const POSTS_DIR = path.join(ROOT, 'src/data/posts');
const BLOG_POSTS_FILE = path.join(ROOT, 'src/data/blog-posts.ts');
const SLUG_PAGE = path.join(ROOT, 'src/app/[lang]/blog/[slug]/page.tsx');

// 1. Copy cron guide template
const cronContent = fs.readFileSync(path.join(ROOT, 'scripts/cron-guide-template.tsx'), 'utf-8');
fs.writeFileSync(path.join(POSTS_DIR, 'cron-expression-complete-guide.tsx'), cronContent);
console.log('Created cron-expression-complete-guide.tsx');

// 2. Register new articles in blog-posts.ts
let blogPostsContent = fs.readFileSync(BLOG_POSTS_FILE, 'utf-8');

if (!blogPostsContent.includes("prisma-vs-drizzle-2026")) {
  const newEntry1 = [
    "  {",
    "    slug: 'prisma-vs-drizzle-2026',",
    "    title: 'Prisma vs Drizzle ORM 2026: The Definitive TypeScript ORM Comparison',",
    "    description: 'Updated 2026 comparison of Prisma 6 and Drizzle 1.0.',",
    "    date: '2026-03-14',",
    "    author: 'DevToolBox',",
    "    readingTime: '14 min read',",
    "    keywords: ['prisma', 'drizzle', 'orm', 'typescript', 'database', 'prisma vs drizzle 2026'],",
    "    relatedTools: ['json-to-typescript', 'sql-formatter', 'json-formatter'],",
    "    relatedPosts: ['prisma-vs-drizzle-2025', 'typescript-vs-javascript-when-to-convert'],",
    "    translations: {",
    "      en: { title: 'Prisma vs Drizzle ORM 2026', description: 'Updated 2026 comparison of Prisma 6 and Drizzle 1.0.' },",
    "      zh: { title: 'Prisma vs Drizzle ORM 2026：终极对比', description: '2026年Prisma 6和Drizzle 1.0对比。' },",
    "      ja: { title: 'Prisma vs Drizzle ORM 2026：完全比較', description: '2026年版比較。' },",
    "      ko: { title: 'Prisma vs Drizzle ORM 2026: 완전 비교', description: '2026년 비교.' },",
    "      fr: { title: 'Prisma vs Drizzle ORM 2026', description: 'Comparaison 2026.' },",
    "      de: { title: 'Prisma vs Drizzle ORM 2026', description: 'Vergleich 2026.' },",
    "      es: { title: 'Prisma vs Drizzle ORM 2026', description: 'Comparación 2026.' },",
    "      it: { title: 'Prisma vs Drizzle ORM 2026', description: 'Confronto 2026.' },",
    "      pt: { title: 'Prisma vs Drizzle ORM 2026', description: 'Comparação 2026.' },",
    "      nl: { title: 'Prisma vs Drizzle ORM 2026', description: 'Vergelijking 2026.' },",
    "      pl: { title: 'Prisma vs Drizzle ORM 2026', description: 'Porównanie 2026.' },",
    "      sv: { title: 'Prisma vs Drizzle ORM 2026', description: 'Jämförelse 2026.' },",
    "      no: { title: 'Prisma vs Drizzle ORM 2026', description: 'Sammenligning 2026.' },",
    "      id: { title: 'Prisma vs Drizzle ORM 2026', description: 'Perbandingan 2026.' },",
    "      th: { title: 'Prisma vs Drizzle ORM 2026', description: 'เปรียบเทียบ 2026' },",
    "    },",
    "  },",
  ].join("\n");

  const newEntry2 = [
    "  {",
    "    slug: 'cron-expression-complete-guide',",
    "    title: 'Cron Expression Complete Guide 2026: Syntax, Examples & Best Practices',",
    "    description: 'Master cron expressions with comprehensive guide.',",
    "    date: '2026-03-14',",
    "    author: 'DevToolBox',",
    "    readingTime: '15 min read',",
    "    keywords: ['cron', 'cron expression', 'crontab', 'cron job', 'cron schedule', 'cron syntax'],",
    "    relatedTools: ['cron-parser', 'cron-generator', 'json-formatter'],",
    "    relatedPosts: ['cron-expression-examples', 'cron-schedule-serverless'],",
    "    translations: {",
    "      en: { title: 'Cron Expression Complete Guide 2026', description: 'Master cron expressions.' },",
    "      zh: { title: 'Cron表达式完全指南 2026', description: '掌握cron表达式。' },",
    "      ja: { title: 'Cron式完全ガイド 2026', description: 'Cron式を完全に理解する。' },",
    "      ko: { title: 'Cron 표현식 완전 가이드 2026', description: 'cron 표현식 마스터.' },",
    "      fr: { title: 'Guide complet Cron 2026', description: 'Maîtrisez les expressions cron.' },",
    "      de: { title: 'Cron Komplettanleitung 2026', description: 'Meistern Sie Cron.' },",
    "      es: { title: 'Guía completa Cron 2026', description: 'Domine las expresiones cron.' },",
    "      it: { title: 'Guida completa Cron 2026', description: 'Padroneggia le espressioni cron.' },",
    "      pt: { title: 'Guia completo Cron 2026', description: 'Domine expressões cron.' },",
    "      nl: { title: 'Cron complete gids 2026', description: 'Beheers cron-expressies.' },",
    "      pl: { title: 'Kompletny przewodnik Cron 2026', description: 'Opanuj wyrażenia cron.' },",
    "      sv: { title: 'Cron komplett guide 2026', description: 'Bemästra cron-uttryck.' },",
    "      no: { title: 'Cron komplett guide 2026', description: 'Mestre cron-uttrykk.' },",
    "      id: { title: 'Panduan lengkap Cron 2026', description: 'Kuasai ekspresi cron.' },",
    "      th: { title: 'คู่มือ Cron Expression 2026', description: 'เชี่ยวชาญ cron expression' },",
    "    },",
    "  },",
  ].join("\n");

  // Insert before the closing ];
  blogPostsContent = blogPostsContent.replace(
    /(\s*)\];(\s*)$/,
    "\n" + newEntry1 + "\n" + newEntry2 + "\n];\n"
  );

  fs.writeFileSync(BLOG_POSTS_FILE, blogPostsContent);
  console.log('Added 2 new entries to blog-posts.ts');
} else {
  console.log('Entries already exist in blog-posts.ts');
}

// 3. Update dates for freshness
blogPostsContent = fs.readFileSync(BLOG_POSTS_FILE, 'utf-8');

// CSS Nesting date update
const cssIdx = blogPostsContent.indexOf("slug: 'css-nesting-native-2026'");
if (cssIdx > 0) {
  const cssDateIdx = blogPostsContent.indexOf("date: '", cssIdx);
  if (cssDateIdx > 0 && cssDateIdx < cssIdx + 300) {
    const endQuote = blogPostsContent.indexOf("'", cssDateIdx + 7);
    blogPostsContent = blogPostsContent.substring(0, cssDateIdx) + "date: '2026-03-14'" + blogPostsContent.substring(endQuote + 1);
    console.log('Updated CSS Nesting date to 2026-03-14');
  }
}

// Python vs JS date update
const pyIdx = blogPostsContent.indexOf("slug: 'python-vs-javascript'");
if (pyIdx > 0) {
  const pyDateIdx = blogPostsContent.indexOf("date: '", pyIdx);
  if (pyDateIdx > 0 && pyDateIdx < pyIdx + 300) {
    const endQuote = blogPostsContent.indexOf("'", pyDateIdx + 7);
    blogPostsContent = blogPostsContent.substring(0, pyDateIdx) + "date: '2026-03-14'" + blogPostsContent.substring(endQuote + 1);
    console.log('Updated Python vs JS date to 2026-03-14');
  }
}

fs.writeFileSync(BLOG_POSTS_FILE, blogPostsContent);

// 4. Register in slug page
let slugPage = fs.readFileSync(SLUG_PAGE, 'utf-8');

if (!slugPage.includes('PrismaVsDrizzle2026')) {
  // Add imports
  const importAnchor = "import ReactHooksGuide from '@/data/posts/react-hooks-guide';";
  const newImports = [
    "import PrismaVsDrizzle2026 from '@/data/posts/prisma-vs-drizzle-2026';",
    "import CronExpressionCompleteGuide from '@/data/posts/cron-expression-complete-guide';",
    importAnchor
  ].join("\n");
  slugPage = slugPage.replace(importAnchor, newImports);

  // Add mappings
  const mapAnchor = "'react-hooks-guide': ReactHooksGuide,";
  const newMaps = [
    mapAnchor,
    "  'prisma-vs-drizzle-2026': PrismaVsDrizzle2026,",
    "  'cron-expression-complete-guide': CronExpressionCompleteGuide,"
  ].join("\n");
  slugPage = slugPage.replace(mapAnchor, newMaps);

  fs.writeFileSync(SLUG_PAGE, slugPage);
  console.log('Updated slug page with imports and mappings');
} else {
  console.log('Slug page already updated');
}

console.log('\n=== All registration complete ===');
