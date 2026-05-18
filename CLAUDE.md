# DevToolBox — Claude Code 项目上下文

> 本文件供 Claude Code 快速理解项目、承接后续任务。请在 Claude Code 中 @ 引用此文件或将其放在工作区根目录。

---

## 1. 项目概览

- **项目名**: DevToolBox
- **类型**: 多语言在线开发者工具站
- **线上地址**: https://viadreams.cc
- **仓库**: devtoolbox（GitHub 已同步）
- **技术栈**: Next.js 16 (App Router) + TypeScript + Tailwind CSS
- **部署**: Vercel（主力，push main 自动触发）
- **Vercel 项目 ID**: prj_qL8lXCi9YXdLSvmOLh6eHnwBR6KW
- **Vercel API Token**: 不在文档中存放,使用时从 Vercel dashboard (Settings → Tokens) 单独生成
- **Vercel Team ID**: `team_CP5WhE4wensGmx92NAImRHjV`(slug: arenas-projects-ac293cdb)
- **Vercel 预览域名**: https://devtoolbox-lemon.vercel.app
- **域名商**: Gname.com（新加坡），账号：arenasbob.2024@gmail.com

---

## 2. 已完成工作摘要

| 类别 | 内容 |
|------|------|
| **工具数量** | 88 款 |
| **支持语言** | 15 种：en, fr, de, it, es, pt, nl, pl, sv, no, zh, ja, ko, id, th |
| **博客文章** | 93 篇 |
| **总索引页** | 约 2780 页 |
| **邮件订阅** | Buttondown 集成（Footer、工具页侧边栏、博客页） |
| **SEO 优化** | sitemap hreflang 重构、IndexNow 接入、博客多语言翻译（pt/it） |
| **迁移** | 已从 Vultr VPS 全量迁移至 Vercel，DNS 已切换完成 |
| **变现** | Adsterra Native Banner 已接入(2026-05-06),全站投放,带 Cookie 同意 |
| **代码同步** | 已提交并推送到 GitHub main 分支 |

### Adsterra 变现接入详情（2026-05-06）

- **账户**: arenasbob @ Adsterra(Publisher)
- **站点**: viadreams.cc(Website ID: 5768041,审核已通过 Active)
- **广告位**: NativeBanner_1(Ad Unit ID: 29254685,Format: Native Banner)
- **invoke.js**: `https://pl29355184.profitablecpmratenetwork.com/1996698ecc1a68bcd8a4b03d8e78d459/invoke.js`
- **Container Key**: `1996698ecc1a68bcd8a4b03d8e78d459`
- **组件文件**:
  - `src/components/CookieConsent.tsx`(GDPR 同意 banner,9 语言)
  - `src/components/AdsterraNativeBanner.tsx`(广告组件,Cookie 同意后才加载)
  - 集成位置: `src/app/[lang]/layout.tsx`(全站投放)
- **Vercel 环境变量**:
  - `NEXT_PUBLIC_ADSTERRA_NATIVE_SCRIPT` = invoke.js URL
  - `NEXT_PUBLIC_ADSTERRA_NATIVE_KEY` = container key
- **ads.txt**: `/ads.txt` 由 `src/app/ads.txt/route.ts` 提供，可通过 `ADSTERRA_ADS_TXT_SELLER_LINE` 注入 Adsterra 后台 seller line
- **注意**: 中文用户(CN 大陆)可能因 GFW 阻断 profitablecpmratenetwork.com 而看到空广告位。中文流量 eCPM 通常较低($0.05-0.30)。建议先观察 1-2 周数据再决定是否补充百度联盟等其他网络

### SEO 优化详情（2026-04）

- `src/app/api/sitemap/route.ts` 重构：英文页优先、添加 `xhtml:link` hreflang 标注（含 x-default）、新增分类页（12 个 category slug）
- `src/data/blog-posts.ts`：为 5 篇博文添加 pt / it 翻译（langchain-guide, rag-guide, vector-database-guide, cursor-vs-copilot-guide, caddy-server-guide）
- IndexNow key：`18c23d4fa0c24bb2b5765783a90c0f4d`（Yandex 端点已验证）
- `public/robots.txt` 已配置 AI 爬虫白名单（GPTBot、ClaudeBot、PerplexityBot 等）
- **注意**：`public/robots.txt` 静态文件优先级高于 `src/app/robots.ts`，修改 robots 规则应改静态文件

---

## 3. 关键路径与结构

```
devtoolbox/
├── src/
│   ├── app/[lang]/           # 动态语言路由
│   │   ├── layout.tsx        # 根布局、OpenGraph locale
│   │   ├── page.tsx          # 首页
│   │   ├── tools/[tool-id]/  # 各工具页面（layout.tsx + page.tsx）
│   │   ├── blog/             # 博客列表与文章
│   │   ├── about/
│   │   └── privacy/
│   ├── app/api/
│   │   ├── sitemap/route.ts        # 分片 sitemap（含 hreflang）
│   │   └── sitemap-index/route.ts  # sitemap 索引
│   ├── components/           # 通用组件（ToolLayout, CopyButton, Header 等）
│   ├── i18n/
│   │   ├── config.ts         # locales、localeNames、localeFlags
│   │   ├── getDictionary.ts  # 按语言加载字典
│   │   └── dictionaries/     # *.json 字典（每语言一个）
│   ├── lib/tools.ts          # 工具定义（id, name, category, path 等）
│   └── data/blog-posts.ts    # 博文元数据与 translations
├── scripts/
│   ├── fix-zh-encoding.js    # 修复 zh.json 中文乱码
│   └── generate-ja-ko.js     # 生成 ja.json、ko.json
├── content/                  # 待发布外链内容
│   ├── devto-article-productivity-tools-2026.md
│   └── social-media-copy.md
├── public/
│   └── robots.txt            # 静态 robots（优先于 src/app/robots.ts）
├── vercel.json               # Vercel 配置
└── package.json
```

---

## 4. 核心约定

### 新增工具
1. 在 `src/lib/tools.ts` 添加工具条目
2. 新建 `src/app/[lang]/tools/[tool-id]/layout.tsx` 和 `page.tsx`
3. 在各语言 `dictionaries/*.json` 的 `tools` 下添加 `[tool-id]` 的 name、description、pageTitle、pageDescription

### 新增语言
1. 在 `src/i18n/config.ts` 的 `locales`、`localeNames`、`localeFlags` 中添加
2. 在 `src/i18n/getDictionary.ts` 中添加字典导入
3. 新建 `src/i18n/dictionaries/[locale].json`（可参考 en.json 或运行 scripts）
4. 在 `src/app/[lang]/layout.tsx` 的 OpenGraph `locale` 映射中加入
5. 在 `src/data/blog-posts.ts` 中为各博文添加 `translations.[locale]`

### 字典结构
- 每语言 JSON 包含：`common`、`home`、`categories`、`tools`、`footer`、`about`、`meta`、`blog`、`privacy`
- `tools` 下每个工具至少需要：`name`、`description`、`pageTitle`、`pageDescription`
- 文件必须为 UTF-8 编码

---

## 5. 常用命令

```bash
# 开发
npm run dev

# 构建
npm run build

# 部署（push 到 GitHub 即自动触发 Vercel）
git add -A && git commit -m "描述" && git push origin main

# 修复 zh 编码（如需）
node scripts/fix-zh-encoding.js

# 生成 ja/ko 字典（如需扩展）
node scripts/generate-ja-ko.js
```

---

## 6. 用户偏好（记忆）

- 修改完成后**直接部署**到线上（push GitHub 即可，Vercel 自动构建）
- 修改完成后**同步提交并推送到 GitHub**
- 回复使用**简体中文**

---

## 7. 部署架构

| 组件 | 配置 |
|------|------|
| **平台** | Vercel（自动 CI/CD） |
| **Vercel 项目 ID** | prj_qL8lXCi9YXdLSvmOLh6eHnwBR6KW |
| **预览域名** | devtoolbox-lemon.vercel.app |
| **正式域名** | viadreams.cc / www.viadreams.cc |
| **自动部署** | push 到 GitHub main 分支即触发（约 3-4 分钟） |
| **旧 VPS（备用/闲置）** | Vultr 137.220.59.5，SSH: root/bbh19921222 |

### DNS 配置（已完成，2026-04-28）

域名商 Gname.com 当前生效记录：

| 主机记录 | 类型 | 记录值 | 状态 |
|---------|------|--------|------|
| `@` | A | `76.76.21.21`（Vercel） | ✅ 正常 |
| `www` | CNAME | `cname.vercel-dns.com` | ✅ 正常 |
| `@` | TXT | google-site-verification=... | ✅ 正常 |

DNS 服务器：`a.share-dns.com` / `b.share-dns.net`

### 旧 VPS 运维命令（仅紧急备用）

```bash
ssh root@137.220.59.5  # 密码: bbh19921222
pm2 status
pm2 logs devtoolbox
bash /var/www/devtoolbox/deploy.sh
```

---

## 8. 当前状态（2026-05-06）

- 线上站点：https://viadreams.cc，运行于 Vercel，HTTP 200 ✅
- 15 种语言、88 款工具、93 篇博客
- Sitemap 已重构，含 hreflang + x-default，分片每组 500 URL
- DNS 已从 VPS 迁移至 Vercel（2026-04-28 完成）
- Google 收录约 15 页（新站权重低，SEO 优化已做，待 Google 重新爬取）

---

## 9. 待办事项（下一步）

- [ ] **Google Search Console**：重新提交 sitemap.xml，对主要英文工具页逐一"请求索引"
- [ ] **发布外链内容**：`content/devto-article-productivity-tools-2026.md` 发布到 Dev.to；`content/social-media-copy.md` 发布到 Reddit 相关子版块
- [ ] 可继续新增工具、语言或博客
- [ ] 可接入更多广告位或变现方式
- [ ] 可优化首屏加载性能

---

## 10. 可选后续方向

- 新增更多工具（当前 88 款）
- 新增更多语言（当前 15 种）
- 改进结构化数据（JSON-LD Schema）
- 接入 Google AdSense 或其他变现
- 优化 Core Web Vitals / 首屏加载
