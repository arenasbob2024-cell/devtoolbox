# 一文多投：外链建设执行手册

本文是给你的操作指南 —— 把 `devto-article-productivity-tools-2026.md` 同一篇内容撬动 **3 个外链渠道**，每个渠道都有针对性的小改动。

目标：每周 1-2 小时投入，获得 3-5 个高权重外链 + 数百次首次访问流量。

---

## 渠道 1：dev.to（最简单，优先做）

**预期收益：DR 84 域名权重，可能爆文带来 5k-20k 曝光**

### 步骤

1. 注册/登录 https://dev.to/new
2. 右上角点 "Write a post"
3. 切到 "Markdown" 模式
4. 复制粘贴 `content/devto-article-productivity-tools-2026.md` 的**第 8 行之后所有内容**（跳过 frontmatter）
5. 标题填：`10 Essential Free Online Developer Tools That Will Boost Your Productivity in 2026`
6. Tags 填（最多 4 个）：`productivity`, `webdev`, `tools`, `beginners`
7. 封面图用 frontmatter 里 Unsplash 那张 URL
8. 点 "Publish"（**不要**点 "Save draft"）

### 发布后

- 把文章链接提交到 Hacker News 的 "Show HN"（见渠道 2）
- 在 Twitter/X 发布链接（见渠道 3 的社交文案）

---

## 渠道 2：Hacker News（最高权重，但难度也高）

**预期收益：DR 91，如果上首页 10 万级曝光**

### HN 的规则

- 不喜欢显式营销 → 要讲成 "I built / I use" 而不是 "check out my site"
- 标题要简短 + 有钩子
- 发布后 30 分钟内需要至少 3-5 个 upvote 才能进入"新帖"前列

### 推荐标题（三选一）

1. `Show HN: DevToolBox – 88 privacy-first developer utilities that run entirely in your browser`
2. `Show HN: A collection of 88 developer tools, all client-side, no ads tracking`
3. `Show HN: I built a multilingual dev tools site (JSON, regex, hash, JWT) – no backend, no cookies`

### 步骤

1. 登录 https://news.ycombinator.com/submit
2. Title: 用上面 #1
3. URL: `https://viadreams.cc/en/` （不用 blog 内页，用首页）
4. Text 框留空
5. 提交

**第一小时关键**：如果能在 6 个朋友/同事的 HN 账号里各拿 1 个 upvote 就容易进新帖前 30 名。

---

## 渠道 3：Reddit r/webdev + r/sideproject

**预期收益：DR 91，r/webdev 170 万订阅，好内容可带数千访问**

### r/webdev 的规则

- 周四/周五有 "Showoff Saturday" 置顶贴 → 在那里发链接不会被删
- 平日发贴容易被 mod 删，除非带"教程"价值
- 标题不要 clickbait

### 帖子模板 A：Showoff Saturday (推荐)

**日期**：每周六发
**Subreddit**：r/webdev  
**标题**：`I built DevToolBox – 88 developer tools, privacy-first, multilingual`  
**正文**（直接粘贴）：

```
Hey r/webdev,

I spent the last few months building https://viadreams.cc — a collection of
free developer tools (JSON formatter, base64, regex tester, UUID generator,
JWT decoder, etc.).

What makes it different from the other 50 tool sites out there:

- Everything runs 100% client-side. No data uploaded, ever.
- No ads, no tracking, no signup.
- Available in 9 languages (EN/ES/FR/DE/PT/IT/ZH/JA/KO).
- Dark mode + keyboard shortcuts on most tools.

I built it because I was tired of bookmarking 20 different sites. Tech stack
is Next.js 16 + TypeScript + Tailwind, deployed on a $5 Vultr VPS with PM2.

Happy to answer any questions on the implementation. Would love feedback on
the UX or tools you think are missing.
```

### 帖子模板 B：r/sideproject

**日期**：任何时候都可以
**Subreddit**：r/sideproject
**标题**：`[Side Project] DevToolBox – privacy-first developer tools, 88 utilities, 9 languages`

正文同上 A，可以多加一段"收入/流量"如果你想做 "build in public" 风格。

---

## 3 个渠道的互推链式打法

做完这 3 个渠道后，每个渠道可以互相引用：

- dev.to 文章底部加："Also on Hacker News: [link]"（发完 HN 回来加）
- HN 评论区回复你自己的帖子，贴 dev.to 文章链接 + Reddit 帖子链接
- Reddit 帖子里提一句 "I wrote a longer article on dev.to about this"

这样每个平台都会看到你在别的平台有存在，增加可信度和点击率。

---

## 社交媒体配文（Twitter/X / LinkedIn）

发了 dev.to 后 30 分钟内发这条推：

```
Just published: "10 Essential Free Online Developer Tools That Will Boost
Your Productivity in 2026"

All free, all privacy-respecting, all client-side.

Covers: JSON formatter, regex tester, cron parser, UUID gen, JWT decoder,
timestamp converter, and more.

Read: [dev.to link]
```

---

## 跟踪

发布后 7 天，你可以：
1. GA4 → Traffic Acquisition → Session source/medium 看有没有 `dev.to / referral`, `news.ycombinator.com / referral`, `reddit.com / referral`
2. GSC → Performance → Discover 看有没有文章被 Google Discover 推荐
3. Bing Webmaster → Search Performance 看有没有新的"dev tools 2026"相关关键词开始显示

---

## 后续发文节奏建议

- 每 2 周发一篇新文章（dev.to 首发 + 同步到 Medium/Hashnode）
- 每月做一次 "Show HN"（每次换主题，不要重复）
- 每周六固定投 r/webdev Showoff Saturday

一篇文章的外链价值会持续 6-12 个月，所以稳定输出比爆一次更重要。
