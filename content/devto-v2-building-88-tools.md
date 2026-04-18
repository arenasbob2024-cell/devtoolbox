---
title: "I built 88 dev tools on a $5 VPS. Here's what broke and what I'd do differently."
description: "A year of building DevToolBox — 88 client-side developer tools in 9 languages, running on a single Vultr instance. What actually matters, what doesn't, and what I got wrong."
tags: ["webdev", "showdev", "nextjs", "sideproject"]
cover_image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&h=630"
published: false
canonical_url: "https://viadreams.cc/en/blog/building-88-tools-lessons"
---

# I built 88 dev tools on a $5 VPS. Here's what broke and what I'd do differently.

About a year ago I started building [DevToolBox](https://viadreams.cc) — a collection of small utilities for things I kept opening fresh browser tabs for: JSON formatting, regex testing, JWT decoding, cron parsing, WHOIS lookups. Today it has **88 tools in 9 languages**, serves about 3k pages a day, and runs on a single $5/month Vultr VPS.

This isn't a "how to 10x your traffic" post. It's a postmortem of decisions that worked and ones that didn't. If you're building something similar — or thinking about it — hopefully some of this saves you a weekend.

## The core bet: everything runs in the browser

The original decision that shaped everything else: **no backend for the tools themselves.** JSON formatting happens in your browser. Regex matching happens in your browser. Even the WHOIS tool calls `rdap.org` directly from the client — the server never sees the domain you're looking up.

This isn't a privacy flex for marketing copy. It's the reason a $5 VPS can serve 3k pages/day without breaking a sweat. The server's only job is to hand out static HTML and JS bundles. There are no per-request compute costs. The tool itself runs on the visitor's CPU.

The unexpected side effect: **the site feels fast everywhere.** A developer in São Paulo running regex against 10kB of text gets the same latency as one in San Francisco, because the actual work happens locally. There's no "deploy to edge regions" checkbox to click.

The tradeoff: anything that genuinely needs a server — like sending email from a contact form — becomes a friction point. I eventually just moved contact to a `mailto:` link and moved on with my life.

## The i18n rabbit hole

I initially launched with English only. Then I got a GSC search query for "formateador json" (Spanish), noticed that ranking was easier in less-competitive locales, and added Spanish. Then French. Then I got greedy and tried to support 15 languages.

That broke me. Here's the honest breakdown:

**What scaled well**: Next.js App Router's `[lang]` dynamic segment, JSON dictionary files (`en.json`, `zh.json`, etc.), and `generateStaticParams` pre-rendering every locale at build time. Adding a new language was a ~30-minute task once the scaffolding was right.

**What didn't scale**: content quality. Machine-translated `pageTitle` and `pageDescription` work fine for crawlers but produce cringe-worthy copy in Thai, Polish, and Swedish that no native speaker would trust. I eventually trimmed back to **9 locales I could keep reasonably high-quality** (en/fr/de/it/es/pt/zh/ja/ko).

The lesson: SEO value of a mediocre translation is negative, not zero. A page that ranks for "przekonwertuj JSON na YAML" but reads like a broken robot gets 0% CTR and teaches Google that your site is low-quality for that intent.

## A deployment detail that bit me: trailingSlash

Next.js has a `trailingSlash: true` option. Turning it on means `/tools/json-formatter` 308-redirects to `/tools/json-formatter/`. Seems harmless.

It wasn't. I had sitemap URLs without trailing slashes, OpenGraph `og:url` without trailing slashes, and internal `<Link>` refs mixing both styles. Google indexed the non-slash versions, then started seeing the canonical point to the slash version, then got confused about which one was authoritative. I spent two weeks losing Search Console impressions before I realized every single internal URL needed to match.

**If you're starting fresh**: pick one and stick with it. If you turn on `trailingSlash` midway through a project's life, audit every `<Link href>`, every sitemap entry, every schema-org object, every canonical tag, and every OG URL. Miss one and you pay for it in GSC for weeks.

## The stack, and what each piece actually costs

```
Next.js 16 (App Router)  ←  free, 0 cost
TypeScript               ←  free
Tailwind CSS             ←  free
Vultr VPS ($5/month)     ←  $60/year
PM2 + Nginx              ←  free
Let's Encrypt SSL        ←  free
Domain registration      ←  $10-15/year
Cloudflare (free tier)   ←  $0, handles DDoS / CDN edge
-----
Total                       ~$75/year
```

Revenue: AdSense earns enough to cover the domain + VPS with some left over for coffee. Not a business. Not trying to be.

What I wasted money on: tried Vercel Pro ($20/month) for a while. The free tier hit function execution limits because of how many locales × pages I was generating. Switched to self-hosted on Vultr and haven't looked back. **If your site is mostly static and you're not using Vercel's edge features, self-hosting is genuinely cheaper and gives you more control.**

## IndexNow: the underrated win

Google's indexing pipeline is a black box. Bing's [IndexNow](https://www.indexnow.org/) is a public, push-based API: you POST a list of changed URLs, Bing and Yandex pick them up within a day.

I set up a GitHub Action that watches for changes in `src/lib/tools.ts` and `src/app/[lang]/tools/**` and automatically pings IndexNow on every push to main. Cost: 30 lines of YAML. Benefit: Bing typically indexes new pages within 24-48 hours vs. 2-3 weeks for Google.

```yaml
# .github/workflows/indexnow.yml (simplified)
on:
  push:
    branches: [main]
    paths:
      - 'src/lib/tools.ts'
      - 'src/app/[lang]/tools/**'
      - 'src/i18n/dictionaries/**'
jobs:
  ping:
    runs-on: ubuntu-latest
    steps:
      - run: node scripts/indexnow-priority.js
```

The `indexnow-priority.js` script reads the tools list, builds URLs across all locales, and submits them to `api.indexnow.org`, Bing, and Yandex. Bing traffic went from near-zero to a meaningful chunk within two weeks of enabling this.

## llms.txt: preparing for AI search

This is speculative, but cheap. I added a `/llms.txt` file — a proposed standard for helping AI search engines (ChatGPT Search, Perplexity, etc.) understand your site's structure. It's basically a markdown index of your top pages with short descriptions.

Whether this actually moves the needle for AI search traffic is unclear — the standard is new. But it costs nothing and some percentage of visitors are now coming from ChatGPT-referred URLs with the specific format these crawlers use, so something is working.

I also explicitly whitelisted AI crawlers (`GPTBot`, `ClaudeBot`, `PerplexityBot`, `OAI-SearchBot`, etc.) in `robots.txt`. Many devs block them out of principle. I don't — they're a growing referral source and blocking them in 2026 is like blocking Googlebot in 2006.

## What I'd do differently if starting over

1. **Trailing slash decision on day one.** Not day 200.
2. **Fewer languages, higher quality.** Start with 3-4 languages you can keep native-quality, not 15 auto-translated.
3. **Client-side analytics from the start.** I added Plausible → removed it for privacy → added Google Analytics → now adding Microsoft Clarity. Churn is expensive. Pick one and commit.
4. **Write for humans before writing for crawlers.** Every tool page I added with the mental model "what would Google's SERP want?" under-performed. Every page I added thinking "what would I, a developer looking for this tool, want?" did well.
5. **Ship smaller.** My first 10 tools took 6 weeks. My last 10 took 2 days. The marginal complexity of adding a new tool is nearly zero once the scaffolding is right. Front-load the scaffolding, not the features.

## What's next

I'm experimenting with a Chrome extension that surfaces relevant tools based on page content — e.g. when you're on a page with a base64 string, it offers a one-click decode. And I want to add live collaborative editing to a few of the tools (a shared regex tester where two people can iterate together).

If you want to see the actual implementation, the site is at [viadreams.cc](https://viadreams.cc). No signup, no cookies, no ads tracking. Just the tools.

Happy to answer questions in the comments about any of the specifics — the IndexNow setup, the i18n architecture, the VPS configuration, whatever. This was a year of yak-shaving and I'm happy to save someone else the time.

---

*Runs on: Next.js 16, TypeScript, Vultr, PM2, Nginx. Source & architecture details in the comments if there's interest.*
