# DevToolBox 外链建设行动清单

> 目标：3个月内引荐域名从 10 → 50+，Authority Score 从 0 → 15+
> 每个目录提交大约需要 2-5 分钟

---

## 提交信息（复制粘贴用）

**名称:** DevToolBox
**网址:** https://viadreams.cc
**标语:** 98+ Free Online Developer Tools - JSON, Base64, Hash, CSS, Regex & More
**邮箱:** arenasbob.2024@gmail.com
**分类:** Developer Tools / Web Development
**定价:** Free

**短描述（英文）:**
DevToolBox offers 98+ free online developer tools. Format JSON, encode Base64, generate hashes, convert TypeScript, parse cron, resize images, and more. No signup, 100% client-side, available in 15 languages.

**短描述（中文）:**
DevToolBox 提供 98+ 免费在线开发者工具。JSON格式化、Base64编解码、哈希生成、TypeScript转换、Cron解析、图片处理等。无需注册，100%浏览器端运行，支持15种语言。

---

## 🔴 第一批（本周完成）- 高权重目录

| # | 目录 | DA | 提交链接 | 需注册 | 预计效果 |
|---|------|-----|---------|--------|---------|
| 1 | **Product Hunt** | 91 | https://www.producthunt.com/posts/new | ✅ GitHub | ⭐⭐⭐⭐⭐ |
| 2 | **DevHunt** | 45 | https://devhunt.org | ✅ GitHub | ⭐⭐⭐⭐ |
| 3 | **AlternativeTo** | 89 | https://alternativeto.net/submit/ | ✅ | ⭐⭐⭐⭐ |
| 4 | **Hacker News (Show HN)** | 91 | https://news.ycombinator.com/submit | ✅ | ⭐⭐⭐⭐⭐ |
| 5 | **Dev.to** | 90 | https://dev.to/new | ✅ GitHub | ⭐⭐⭐⭐ |
| 6 | **Reddit r/webdev** | 97 | https://reddit.com/r/webdev/submit | ✅ | ⭐⭐⭐⭐ |
| 7 | **Reddit r/programming** | 97 | https://reddit.com/r/programming/submit | ✅ | ⭐⭐⭐⭐ |
| 8 | **Indie Hackers** | 72 | https://www.indiehackers.com/new-post | ✅ | ⭐⭐⭐ |

### Show HN 帖子模板：
```
Title: Show HN: DevToolBox – 98+ Free Online Developer Tools (JSON, Base64, Regex, CSS, and more)

Body:
Hi HN! I built DevToolBox (https://viadreams.cc), a collection of 98+ free online developer tools.

Everything runs 100% in your browser — no data leaves your machine. No signup, no ads.

Popular tools include:
- JSON Formatter & Validator
- Base64 Encoder/Decoder
- Hash Generator (MD5, SHA-256)
- Regex Tester & Debugger
- TypeScript ↔ JavaScript Converter
- Cron Expression Parser
- CSS Glassmorphism/Neumorphism Generator
- Image Resizer & WebP Converter

Built with Next.js, available in 15 languages.

Would love to hear feedback on what tools you'd like to see next!
```

### Dev.to 文章模板：
```
Title: I Built 98+ Free Developer Tools That Run Entirely in Your Browser

Tags: webdev, tools, javascript, productivity

Intro: I've been building DevToolBox for the past few months...
(写一篇 500-800 字的介绍文章，附带截图)
```

### Dev.to 批量发布脚本：

`scripts/publish-devto-batch.py` 默认只做 dry run，不会创建文章。确认标题、canonical URL 和正文后，再用环境变量传入 Dev.to API key 并显式加 `--publish`：

```bash
python3 scripts/publish-devto-batch.py
DEVTO_API_KEY=... python3 scripts/publish-devto-batch.py --publish --limit=1
```

不要把 Dev.to API key 写进仓库；如果曾经提交过明文 key，应在 Dev.to 后台立即撤销并重新生成。

---

## 🟡 第二批（第2周完成）- 工具目录

| # | 目录 | 提交链接 | 需注册 |
|---|------|---------|--------|
| 9 | **ToolPilot.ai** | https://www.toolpilot.ai/submit | ✅ |
| 10 | **There's An AI For That** | https://theresanaiforthat.com/submit/ | ✅ |
| 11 | **Future Tools** | https://www.futuretools.io/submit-a-tool | ❌ 表单 |
| 12 | **Free Dev Tools** | https://freedevtools.org/submit | ❌ 表单 |
| 13 | **Untools** | https://untools.co/ (联系提交) | ✅ 邮件 |
| 14 | **SaaS Hub** | https://www.saashub.com/submit | ✅ |
| 15 | **GetApp** | https://www.getapp.com/submit | ✅ |
| 16 | **G2** | https://www.g2.com/products/new | ✅ |
| 17 | **Capterra** | https://www.capterra.com/vendors/sign-up | ✅ |
| 18 | **SourceForge** | https://sourceforge.net/create/ | ✅ |
| 19 | **Slant** | https://www.slant.co/ | ✅ |
| 20 | **StackShare** | https://stackshare.io/submit | ✅ |

---

## 🟢 第三批（第3-4周）- GitHub Awesome Lists

提交 PR 到以下 GitHub awesome 列表（每个都是 do-follow 外链）：

| # | Repo | Stars | PR 内容 |
|---|------|-------|---------|
| 21 | **awesome-developer-tools** | ~500 | 在 Online Tools 分类下添加 DevToolBox |
| 22 | **awesome-json** | ~1.5K | 添加 JSON Formatter, JSON Schema Validator 等 |
| 23 | **awesome-css** | ~5K | 添加 CSS Glassmorphism/Neumorphism Generator |
| 24 | **awesome-regex** | ~1K | 添加 Regex Tester |
| 25 | **awesome-seo-tools** | ~300 | 添加 Sitemap Generator, Meta Tag Generator |
| 26 | **awesome-webdev** | ~2K | 添加 DevToolBox 综合入口 |
| 27 | **awesome-free** | ~2K | 添加 DevToolBox 作为 free developer tools |

### PR 模板：
```markdown
## Add DevToolBox - Free Online Developer Tools

- [DevToolBox](https://viadreams.cc) - 98+ free online developer tools including JSON formatter, Base64 encoder, hash generator, regex tester, and more. 100% client-side, no signup required.
```

---

## 🔵 第四批（持续进行）- 社区推广

### 非英语社区（竞争更低）：

| 平台 | 语言 | 链接 |
|------|------|------|
| **Qiita** | 日语 | https://qiita.com/new |
| **Zenn** | 日语 | https://zenn.dev/new |
| **velog.io** | 韩语 | https://velog.io/ |
| **Juejin 掘金** | 中文 | https://juejin.cn/editor/drafts/new |
| **V2EX** | 中文 | https://v2ex.com/new |
| **SegmentFault** | 中文 | https://segmentfault.com/write |
| **CSDN** | 中文 | https://editor.csdn.net/md |
| **Hashnode** | 英语 | https://hashnode.com/create/story |

### 每个平台发一篇介绍文章，重点突出：
- 该语言版本的截图（如日语版截图发 Qiita）
- 工具的实际使用场景
- 链接回 viadreams.cc 对应语言版本

---

## 📊 进度追踪

| 日期 | 完成项 | 预计新引荐域名 |
|------|--------|---------------|
| 第1周 | #1-8 | +5-8 |
| 第2周 | #9-20 | +8-12 |
| 第3周 | #21-27 | +5-7 |
| 第4周+ | 社区推广 | +5-10/月 |

---

## ⚡ 执行建议

1. **Product Hunt + Show HN 选在周二/周三发**（流量最高）
2. **每天提交 2-3 个目录**，不要一天全部提交（看起来不自然）
3. **Dev.to / Reddit 文章要有价值**，不要只放链接（会被删）
4. **GitHub PR 要遵循格式**，认真写描述
5. **中文社区（掘金/V2EX）可以写更详细的技术分享**
