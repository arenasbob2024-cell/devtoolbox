# Title: I Built 93 Free Developer Tools (DevToolBox) – 200+ Blog Posts, 15 Languages, and Growing

**Subreddit:** r/SideProject

## TL;DR
DevToolBox is a collection of 93 free online developer tools (JSON formatter, regex tester, JWT decoder, CSS generators, hash generators, cron parsers, etc.). Built with Next.js, supports 15 languages, and pulling ~400 visits/week from organic search.

**Live:** https://viadreams.cc | **GitHub:** https://github.com/arenasbob2024-cell/devtoolbox

---

## The Problem
I was switching between 10+ different websites just to encode/decode base64, format JSON, test regex, or generate a quick hash. None of them worked great, all had ads or paywalls, and they weren't available in multiple languages.

## The Solution
Started building DevToolBox 4 months ago. Simple premise: collect the best developer tools in one place, make them fast, and support multiple languages from day one.

## What We Have Now
- **93 tools** across 14 categories:
  - JSON tools (formatter, validator, schema generator, path finder, JSON-to-X converters)
  - Regex (tester, matcher, builder)
  - Encoding/Decoding (base64, URL, HTML entities)
  - CSS generators (flexbox, grid, gradients, border-radius, animations)
  - Hashing (MD5, SHA1/256/512, HMAC)
  - JWT decoder/validator
  - Cron parser & scheduler
  - And much more

- **15 languages:** English, Chinese, Japanese, Korean, Spanish, German, French, Dutch, Italian, Portuguese, Polish, Swedish, Norwegian, Indonesian, Thai

- **200+ blog articles** with tutorials and guides (e.g., "How to Parse Cron Expressions", "JSON Schema Validation Tutorial")

- **920 static pages** generated at build time
- **13,890 URLs** in sitemap
- **~400 organic visits/week** from Google (and growing)

## Tech Stack
- **Frontend:** Next.js 16 (App Router), TypeScript, Tailwind CSS
- **Backend:** Node.js
- **Deployment:** Vultr VPS + PM2 + Nginx
- **SEO:** JSON-LD structured data, hreflang for all 15 languages, static sitemap
- **Analytics:** Basic Nginx logs (no tracking, no cookies forced)

## Top Performers (by daily visits)
1. JSON Formatter — 158 visits/day
2. Hash Generator — 76 visits/day
3. Cron Parser — 75 visits/day
4. Base64 Encoder/Decoder — 74 visits/day
5. URL Encoder — 70 visits/day

## Interesting Numbers
- 473 unique IPs per day
- Growing from 28 tools (month 1) to 93 tools (month 4)
- No paid ads, just organic search + word of mouth
- Each new tool takes ~2-3 hours to ship (including translations)

## Challenges & Lessons Learned
1. **Multi-language support at scale** - Managing 15 language dictionaries + generating static pages got complex fast. Automated scripts help.
2. **SEO is a long game** - Started with 0 traffic, now at ~400 visits/week. Takes months to see real results.
3. **Tool selection matters** - Tools that solve real problems (JSON formatter, cron parser) get 10x traffic vs. niche tools.
4. **Build for the tool, not the ads** - Resisted paywall/ads temptation. Free tools > trust > future monetization options.

## Open Source
Repo is public: https://github.com/arenasbob2024-cell/devtoolbox

**Contributing:** If you want to add a tool, fix a bug, or improve translations:
1. Add tool definition to `src/lib/tools.ts`
2. Create `src/app/[lang]/tools/[tool-id]/page.tsx` (use existing tools as templates)
3. Add translations to `src/i18n/dictionaries/*.json`
4. Run sitemap generator, build, and submit PR

## Next Steps
- Tracking search demand to add high-value tools next (SQL client, API tester, cURL converter)
- Improving Core Web Vitals
- Building community (collecting feedback from users)
- Exploring light monetization (affiliate links for recommended tools, ads on high-traffic pages)

Happy to answer questions! What tools do YOU wish existed?

---

**Links:**
- Live site: https://viadreams.cc
- GitHub: https://github.com/arenasbob2024-cell/devtoolbox
- Most popular tools: https://viadreams.cc/en/tools/json-formatter, https://viadreams.cc/en/tools/hash-generator
