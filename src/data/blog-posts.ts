export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  readingTime: string;
  keywords: string[];
  relatedTools: string[];
  relatedPosts: string[];
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'uuid-v4-vs-v7-vs-ulid-vs-nanoid',
    title: 'UUID v4 vs UUID v7 vs ULID vs NanoID: Which ID Should You Use?',
    description: 'A comprehensive comparison of UUID v4, UUID v7, ULID, and NanoID for database primary keys, distributed systems, and frontend applications. Includes performance benchmarks and a decision flowchart.',
    date: '2026-02-08',
    author: 'DevToolBox',
    readingTime: '10 min read',
    keywords: ['uuid v4 vs v7', 'uuid v7 vs ulid', 'nanoid vs uuid', 'unique id generator', 'database primary key'],
    relatedTools: ['uuid-generator'],
    relatedPosts: ['base64-encoding-real-world-uses'],
  },
  {
    slug: 'cron-schedule-serverless-github-actions-vercel-cloudflare',
    title: 'Cron Schedule for Serverless: GitHub Actions, Vercel Cron, and Cloudflare Workers',
    description: 'Master cron expressions across serverless platforms. Learn syntax differences, timezone pitfalls, and copy-paste schedule examples for GitHub Actions, Vercel, and Cloudflare Workers.',
    date: '2026-02-08',
    author: 'DevToolBox',
    readingTime: '9 min read',
    keywords: ['github actions cron schedule', 'vercel cron job', 'cloudflare workers cron', 'serverless cron', 'cron expression examples'],
    relatedTools: ['cron-parser'],
    relatedPosts: ['docker-compose-yaml-errors'],
  },
  {
    slug: 'base64-encoding-real-world-uses',
    title: 'Base64 Encoding in Practice: 7 Real-World Uses Every Developer Should Know',
    description: 'Discover 7 practical uses of Base64 encoding: from embedding images in HTML to Kubernetes secrets, JWT tokens, and data URIs. With code examples and live tools.',
    date: '2026-02-08',
    author: 'DevToolBox',
    readingTime: '8 min read',
    keywords: ['base64 encoding use cases', 'why use base64', 'base64 real world examples', 'base64 kubernetes secrets', 'data uri base64'],
    relatedTools: ['base64', 'jwt-decoder'],
    relatedPosts: ['uuid-v4-vs-v7-vs-ulid-vs-nanoid'],
  },
  {
    slug: 'regex-patterns-copy-paste-ready',
    title: '20 Regex Patterns Every Developer Needs: Copy-Paste Ready Examples',
    description: 'A curated collection of 20 battle-tested regex patterns for email, URL, phone, password, IP address, and more. Each pattern includes explanation, test cases, and a live regex tester link.',
    date: '2026-02-08',
    author: 'DevToolBox',
    readingTime: '11 min read',
    keywords: ['regex patterns copy paste', 'common regex examples', 'regex email validation', 'regex url validation', 'regex cheat sheet'],
    relatedTools: ['regex-tester'],
    relatedPosts: ['docker-compose-yaml-errors'],
  },
  {
    slug: 'docker-compose-yaml-errors',
    title: 'Docker Compose YAML Validation: 10 Common Syntax Errors and How to Fix Them',
    description: 'Stop wasting time on Docker Compose YAML errors. Learn to identify and fix the 10 most common syntax mistakes with exact error messages and solutions.',
    date: '2026-02-08',
    author: 'DevToolBox',
    readingTime: '9 min read',
    keywords: ['docker compose yaml error', 'docker compose syntax error', 'invalid yaml docker compose', 'yaml validation', 'docker compose troubleshoot'],
    relatedTools: ['json-yaml', 'json-formatter'],
    relatedPosts: ['cron-schedule-serverless-github-actions-vercel-cloudflare'],
  },
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find(p => p.slug === slug);
}

export function getAllSlugs(): string[] {
  return blogPosts.map(p => p.slug);
}
