# ⚙️ DevToolBox

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![GitHub stars](https://img.shields.io/github/stars/arenasbob2024-cell/devtoolbox?style=social)](https://github.com/arenasbob2024-cell/devtoolbox)
[![Website Status](https://img.shields.io/website?url=https%3A%2F%2Fviadreams.cc&style=flat&label=viadreams.cc)](https://viadreams.cc)
[![Next.js 16](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue?logo=typescript)](https://www.typescriptlang.org)

> 🚀 **93+ free online developer tools**. No signup, no limits. Ad-supported. All processing happens in your browser.
> Supporting 15 languages with SEO-optimized pages, contributing to your developer workflow.

![DevToolBox Preview](https://img.shields.io/badge/Tools-93%2B-brightgreen)
![Languages](https://img.shields.io/badge/Languages-15-brightgreen)
![Pages](https://img.shields.io/badge/Pages-920%2B-brightgreen)

---

## 🌐 Live Demo

**[Visit DevToolBox](https://viadreams.cc)** | Multi-language support: EN • FR • DE • IT • ES • PT • NL • PL • SV • NO • ZH • JA • KO • ID • TH

---

## 📊 Tool Categories (93+ Tools)

| Category | Count | Examples |
|----------|-------|----------|
| **JSON Tools** | 25+ | Formatter, Validator, Schema, to CSV/XML/GraphQL/Zod/MySQL |
| **Encoding/Decoding** | 17+ | Base64, URL, HTML Entity, Base64 Image, Hex |
| **CSS Tools** | 12+ | Gradient, Flexbox, Grid, Box Model, Triangle, Animation, Border Radius |
| **Regular Expressions** | 6+ | Tester, Matcher, Builder, Generator, Online Checker |
| **Hashing/Crypto** | 9+ | MD5, SHA-1, SHA-256, SHA-512, Multi-hash, HMAC, Bcrypt |
| **JWT Tools** | 7+ | Decoder, Validator, Parser, Debugger, Token Decoder |
| **Markdown** | 5+ | Preview, Editor, to HTML, Link Checker, Table Generator |
| **YAML** | 4+ | to JSON, Validator, Online Converter |
| **Web/Network** | 10+ | HTTP Status, Headers, DNS Lookup, IP Calculator, CORS Tester |
| **Text Tools** | 8+ | Counter, Diff, Binary, Lorem Ipsum, ASCII, Slug Generator |
| **Generators** | 7+ | UUID, Password, QR Code, Slug, Color Palette |
| **Color Tools** | 9+ | Picker, Converter, HEX/RGB/HSL, Palette, Tailwind Colors |
| **Converters** | 15+ | HTML to Markdown/React, SVG to PNG, CSV to JSON, XML to JSON |
| **Development** | 20+ | Cron Parser, Docker, TypeScript, JavaScript, SQL, Timestamp |

### ⭐ Top Tools by Traffic
- **JSON Formatter** - 158 weekly visitors
- **Hash Generator** - 76 weekly visitors
- **Cron Parser** - 75 weekly visitors
- **Base64** - 74 weekly visitors
- **URL Encoder** - 70 weekly visitors

---

## 🎯 Key Features

✅ **No Login Required** - All tools work without authentication
✅ **Client-Side Processing** - Your data never leaves your browser
✅ **Zero Limits** - Process files/text of any size
✅ **15 Languages** - English, French, German, Italian, Spanish, Portuguese, Dutch, Polish, Swedish, Norwegian, Chinese, Japanese, Korean, Indonesian, Thai
✅ **Mobile Responsive** - Perfect on desktop, tablet, mobile
✅ **Lightning Fast** - Built with Next.js 16 App Router
✅ **SEO Optimized** - 920+ pages, 13,890+ indexed URLs, structured data, hreflang
✅ **Ad-Supported** - Built-in monetization ready

## 💰 Adsterra Revenue Operations

The site has Adsterra inventory wired through environment variables. The revenue goal is measured with real Adsterra reporting data, not by checking whether ad slots render.

Required production configuration:
- `ADSTERRA_ADS_TXT_SELLER_LINE` - exact seller line copied from the Adsterra publisher dashboard
- `ADSTERRA_API_KEY` - publisher API token used only for revenue verification
- `NEXT_PUBLIC_ADSTERRA_TOP_KEY`, `NEXT_PUBLIC_ADSTERRA_SIDEBAR_KEY`, `NEXT_PUBLIC_ADSTERRA_NATIVE_SCRIPT`, `NEXT_PUBLIC_ADSTERRA_NATIVE_KEY`

Useful checks:

```bash
npm run adsterra:readiness -- --vercel-scope=arenas-projects-ac293cdb --site-url=https://viadreams.cc
ADSTERRA_API_KEY=... npm run adsterra:goal -- --days=7 --target=10
ADSTERRA_API_KEY=... ADSTERRA_ADS_TXT_SELLER_LINE='adsterra.com, <publisher-id>, DIRECT' npm run adsterra:gate -- --vercel-scope=arenas-projects-ac293cdb
```

The workflow template in `docs/adsterra-revenue-goal.workflow.yml` can be enabled as `.github/workflows/adsterra-revenue-goal.yml` with a GitHub token that has `workflow` scope. It passes only when live `ads.txt` contains the configured Adsterra seller line and the rolling Adsterra API report averages at least `$10/day`.

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | Next.js 16 (App Router) |
| **Language** | TypeScript 5.0+ |
| **Styling** | Tailwind CSS + CSS Variables |
| **i18n** | Custom multi-language system (15 locales) |
| **Deployment** | Vercel |
| **SEO** | JSON-LD Schema, Hreflang, Sitemap, IndexNow |
| **Analytics** | Vercel logs + search console reports |

---

## 📈 Traffic & Performance

**Current Metrics (2026-03-13)**
- 473 unique IPs per 24h
- 388 referrals/week from Google
- 13,890 URLs indexed in sitemaps
- 920+ generated pages
- 15 language versions

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or pnpm

### Development

```bash
# Clone the repository
git clone https://github.com/arenasbob2024-cell/devtoolbox.git
cd devtoolbox

# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:3000 in your browser
```

### Production Build

```bash
# Build with increased memory (920+ pages)
NODE_OPTIONS='--max-old-space-size=4096' npm run build

# Start production server
npm start
```

---

## 📁 Project Structure

```
devtoolbox/
├── src/
│   ├── app/[lang]/                    # Language-routed pages
│   │   ├── tools/[tool-id]/           # Individual tool pages
│   │   ├── blog/                      # Blog articles (607 pages)
│   │   ├── about/
│   │   └── privacy/
│   ├── components/                    # Reusable React components
│   │   ├── ToolLayout.tsx             # Tool page template
│   │   ├── ToolSeoServer.tsx          # Server-side SEO
│   │   ├── AdSlot.tsx                 # Monetization
│   │   └── ugc/                       # User feedback components
│   ├── i18n/                          # 15-language support
│   │   └── dictionaries/              # Language JSON files
│   ├── lib/tools.ts                   # Tool registry (93 tools)
│   └── data/blog-posts.ts             # Blog metadata
├── scripts/
│   ├── generate-static-sitemap.js     # Sitemap generation
│   └── fix-zh-encoding.js             # Chinese encoding fix
└── public/
    └── sitemaps/                      # 35 sitemap files
```

---

## 🔧 Adding a New Tool

### Step 1: Add tool metadata
Edit `src/lib/tools.ts`:
```typescript
{
  id: 'my-tool',
  name: 'My Tool',
  description: 'Tool description',
  category: 'JSON Tools',
  keywords: ['keyword1', 'keyword2'],
  icon: '🔧',
}
```

### Step 2: Create layout file
`src/app/[lang]/tools/my-tool/layout.tsx` - Use existing tool as template

### Step 3: Create tool component
`src/app/[lang]/tools/my-tool/page.tsx` - Implement tool logic

### Step 4: Add translations
Update all 15 language files in `src/i18n/dictionaries/`

### Step 5: Regenerate sitemap
```bash
node scripts/generate-static-sitemap.js
```

### Step 6: Deploy
```bash
npm run build
npm start
# Or use deploy.sh for automated deployment
```

---

## 🌍 Internationalization

Support for 15 languages:
- **European**: English, French, German, Italian, Spanish, Portuguese, Dutch, Polish, Swedish, Norwegian
- **Asian**: Simplified Chinese, Japanese, Korean, Indonesian, Thai

Each language has:
- Translated UI (`dictionaries/[lang].json`)
- Localized tool descriptions
- Language-specific keywords for SEO

### Adding a Language
1. Add locale to `src/i18n/config.ts`
2. Create `src/i18n/dictionaries/[locale].json`
3. Update blog post translations in `src/data/blog-posts.ts`
4. Run build to regenerate sitemaps

---

## 📊 SEO Architecture

### Implemented Optimizations
- ✅ **JSON-LD Schemas** - SoftwareApplication, FAQPage, BreadcrumbList
- ✅ **Hreflang Tags** - All 15 language alternates on every page
- ✅ **Canonical URLs** - Prevents duplicate content issues
- ✅ **Structured Data** - Rich snippets for tools and FAQs
- ✅ **Dynamic Sitemaps** - 35 files, 13,890 URLs
- ✅ **OpenGraph + Twitter Cards** - Social media optimization
- ✅ **IndexNow Integration** - Real-time search engine indexing
- ✅ **Meta Tags** - Unique titles, descriptions, keywords per tool

### Search Coverage
- **Google**: Active, ~388 referrals/week
- **Bing/Yandex**: Via IndexNow API
- **DuckDuckGo**: Via sitemap

---

## 💰 Monetization Strategy

### Current Implementation
- Google AdSense ad slots (pre-built)
- Newsletter signup (Buttondown)
- Affiliate card components
- Support/donation button

### Revenue Potential
- **50K daily visitors** → $1,000-3,000/month
- **100K+ daily visitors** → $3,000-10,000/month

---

## 🤝 Contributing

We welcome contributions! Here's how to help:

### Bug Reports
- Open an issue with reproduction steps
- Include browser/OS version
- Add screenshots if applicable

### Feature Requests
- Suggest new tools
- Recommend tool improvements
- Propose language additions

### Code Contributions
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-tool`)
3. Implement changes
4. Test thoroughly
5. Submit a pull request

### Add a Tool
- Follow the "Adding a New Tool" guide above
- Include multilingual support (all 15 languages)
- Add SEO content section
- Test on mobile and desktop
- Update sitemap and deploy

---

## 📜 License

MIT License © 2024-2026 DevToolBox

Free to use, modify, and distribute for commercial and personal projects.

---

## 🔗 Quick Links

| Link | Purpose |
|------|---------|
| [Live Site](https://viadreams.cc) | Full tool collection |
| [GitHub Repo](https://github.com/arenasbob2024-cell/devtoolbox) | Source code |
| [Issues](https://github.com/arenasbob2024-cell/devtoolbox/issues) | Bug reports & features |
| [Discussions](https://github.com/arenasbob2024-cell/devtoolbox/discussions) | Community chat |

---

## ⚡ Performance

- **Lighthouse Score**: 90+
- **First Contentful Paint**: <1s
- **Time to Interactive**: <2s
- **Core Web Vitals**: All green ✅

---

## 🎓 Learning Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [SEO Best Practices](https://developers.google.com/search/docs)

---

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/arenasbob2024-cell/devtoolbox/issues)
- **Discussions**: [GitHub Discussions](https://github.com/arenasbob2024-cell/devtoolbox/discussions)
- **Website**: [viadreams.cc](https://viadreams.cc)

---

**Made with ❤️ for developers. Star us on GitHub!** ⭐
