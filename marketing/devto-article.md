---
title: I Built 93 Free Developer Tools in One Site - Here's What I Learned
published: true
tags: webdev, javascript, tools, opensource, nextjs, typescript, seo
cover_image: https://viadreams.cc/og-image.png
---

# I Built 93 Free Developer Tools in One Site - Here's What I Learned

Four months ago, I was tired of clicking through 10+ different websites just to encode a string, format JSON, or decode a JWT token. So I decided to build them all in one place.

Today, [DevToolBox](https://viadreams.cc) has 93 free tools, supports 15 languages, and gets ~400 organic visits per week from Google. Here's what the journey taught me.

---

## The Boring Beginning (Month 1)

I started with 28 tools:
- Basic encoding/decoding (base64, URL)
- JSON formatter and validator
- Regex tester
- A few CSS generators

The tech stack was straightforward: **Next.js 16 (App Router) + TypeScript + Tailwind CSS**. I wanted to build something that felt fast and lightweight, not another bloated SaaS site.

The first tool took me about 3 hours to build. By the end of month 1, I had decent traffic... nowhere. Zero. Nada.

**Why? Because SEO doesn't happen overnight.**

---

## The Content Problem (Month 2)

I realized that tools alone aren't enough. People search for "how to decode JWT" or "JSON formatter online" - they want tutorials, not just the tool.

So I started writing blog posts. Not long, fluffy articles. Just practical guides:
- "How to Parse Cron Expressions" (answering real questions people ask)
- "Base64 Encoding/Decoding Explained"
- "JWT Claims and How to Validate Them"

I also discovered that **adding blog posts in multiple languages multiplies your reach**. A single tutorial in 15 languages = 15 different search surfaces.

By month 2 end: 200+ blog articles published (across all languages). Traffic: still ~50 visits/week.

---

## The Multi-Language Bet (Month 3)

Here's where it got interesting. I wanted to support:
- Western languages: English, French, German, Spanish, Italian, Dutch, Portuguese, Polish, Swedish, Norwegian
- Asian languages: Chinese, Japanese, Korean
- Southeast Asian: Indonesian, Thai

**The challenge?** Managing 15 language dictionaries, generating 920+ static pages, and ensuring hreflang tags were correct for SEO.

I wrote scripts to automate translations (not ML - just smart string management), and built a system where adding a new tool meant:

1. Define tool in `src/lib/tools.ts`
2. Create page component in `src/app/[lang]/tools/[tool-id]/page.tsx`
3. Add translations to `src/i18n/dictionaries/*.json` (15 files)
4. Run sitemap generator
5. Deploy

The payoff? A tool added once, accessible in 15 languages, indexed by search engines in 15 markets.

**Traffic impact:** Went from 50 to 200 visits/week.

---

## The SEO Realization (Month 3.5)

I made a mistake: I optimized tools for *tools people search for*, not *problems people are trying to solve*.

Example:
- **Bad:** A random "string reverse" tool (niche, 0 searches/month)
- **Good:** A "URL encoder" tool (10K+ searches/month, people actually need it)

I started tracking Google Search Console data and Ahrefs to identify high-intent tools that didn't exist yet:
- `json-schema-validator` → Added it
- `http-status-lookup` → Added it
- `qr-code-generator` → Added it

Each one drove 30-50 visits/week immediately.

**Lesson:** Don't build cool tools. Build tools people actually search for.

---

## The Tech Decisions That Mattered

### 1. Next.js App Router (not Pages Router)
- Easier to scale with dynamic `[lang]` and `[tool-id]` routing
- Built-in image optimization
- Server components for SEO metadata

### 2. Static Sitemap Generation
Instead of a dynamic sitemap endpoint, I generate a static one during build:
- 13,890 URLs across 35 sitemap files
- Indexed faster by Google
- Can submit to IndexNow (Yandex works, Google's api.indexnow.org returns 403)

```bash
node scripts/generate-static-sitemap.js
```

### 3. JSON-LD Structured Data
Every tool page includes:
```json
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "JSON Formatter",
  "description": "Format, validate, and beautify JSON online",
  "url": "https://viadreams.cc/en/tools/json-formatter"
}
```

This helps Google understand what the tool does.

### 4. Hreflang for All 15 Languages
Critical for multi-language sites:
```html
<link rel="alternate" hreflang="en" href="https://viadreams.cc/en/tools/json-formatter" />
<link rel="alternate" hreflang="zh" href="https://viadreams.cc/zh/tools/json-formatter" />
...
```

### 5. No Unnecessary Dependencies
I resisted the urge to add libraries for everything. Many tools use vanilla JavaScript. This keeps the bundle small and pages fast.

---

## The Popular Tools (Real Data)

After 4 months, here's what people actually use:

| Tool | Daily Visits |
|------|--------------|
| JSON Formatter | 158 |
| Hash Generator | 76 |
| Cron Parser | 75 |
| Base64 Encoder/Decoder | 74 |
| URL Encoder | 70 |
| JSON to GraphQL | 69 |
| Regex Tester | 65 |

The lesson? Boring, practical tools get consistent traffic. Flashy tools don't.

---

## The Monetization Question

I get asked: "Why free? How do you make money?"

**Honest answer:** Right now, I don't. But the foundation is there:
- Affiliate links (recommend tools, get commissions)
- Non-intrusive ads on high-traffic pages
- Eventually, a premium API tier (maybe)

**Why I'm not doing it yet:**
1. Rushing to monetize kills community trust
2. 400 visits/week isn't enough to make meaningful money anyway
3. I'd rather focus on adding the right tools than optimizing for ad CTR

---

## The Deployment Reality

I'm running this on a **Vultr VPS (4GB RAM, $18/month)** with:
- **Next.js** app via PM2 (process manager)
- **Nginx** as reverse proxy
- **Let's Encrypt** SSL (free)

The build takes 5 minutes and requires 4GB of memory (920+ pages).

```bash
NODE_OPTIONS='--max-old-space-size=4096' npm run build
```

It's not glamorous, but it works and costs ~$20/month.

---

## What I'd Do Differently

1. **Start with SEO research, not ideas.** Before building a tool, check if people search for it.
2. **Multi-language support from day 1.** Yes, it's hard. But it quadruples your addressable market.
3. **Blog posts matter as much as tools.** The tools are the demo. The blog posts are what convert search traffic.
4. **Don't over-optimize early.** I spent 2 weeks perfecting some tools that got 2 visits/month. Focus on the 80/20.

---

## What's Next

- **Adding 10+ more tools** based on search demand (SQL client, API tester, cURL converter)
- **Improving Core Web Vitals** (aim for all green in PageSpeed Insights)
- **Building external backlinks** (HN, Reddit, Dev.to, GitHub)
- **Keeping it ad-free** (for now)

---

## The Honest Numbers

- **Month 1:** 28 tools, 0 visits
- **Month 2:** 40 tools, 50 visits/week
- **Month 3:** 71 tools, 200 visits/week
- **Month 4:** 93 tools, 400 visits/week
- **Trend:** Not linear, but improving

If you're thinking about building a tools site, my advice: **start small, focus on real demand, and play the long SEO game.**

---

**Try it:** [https://viadreams.cc](https://viadreams.cc)

**Contribute:** [https://github.com/arenasbob2024-cell/devtoolbox](https://github.com/arenasbob2024-cell/devtoolbox)

**Popular tools to check out:**
- [JSON Formatter](https://viadreams.cc/en/tools/json-formatter) - Beautiful JSON visualization
- [Cron Parser](https://viadreams.cc/en/tools/cron-parser) - Decode cron expressions
- [JWT Decoder](https://viadreams.cc/en/tools/jwt-decoder) - Inspect JWT tokens
- [Regex Tester](https://viadreams.cc/en/tools/regex-tester) - Test regex patterns
- [CSS Flexbox Generator](https://viadreams.cc/en/tools/css-flexbox-generator) - Build flexbox layouts
