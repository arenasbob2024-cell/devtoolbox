# 一键发布文案包 — 5 分钟搞定

> 所有内容已经写好、打磨过。你只需要登录各平台，复制粘贴，点 publish。
> 建议顺序：dev.to → Reddit(周六) → HN(下周二早上 PT)。三个渠道互推，链条效应最大。

---

## ✅ 渠道 1：dev.to（现在就做，10 分钟）

### 1. 打开 https://dev.to/new 登录

### 2. 切换到 Markdown 模式（右上角 toggle）

### 3. 复制 `content/devto-v2-building-88-tools.md` 第 10 行以后的所有内容（跳过 frontmatter）

或者直接用：https://github.com/你的repo/blob/main/content/devto-v2-building-88-tools.md

### 4. 填写字段

- **Title**: `I built 88 dev tools on a $5 VPS. Here's what broke and what I'd do differently.`
- **Cover image URL**: `https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&h=630`
- **Tags（最多 4 个）**: `webdev`, `showdev`, `nextjs`, `sideproject`
- **Canonical URL**: 留空（除非你想主链指向 viadreams.cc 的博客）

### 5. 点 "Publish"

### 6. 发布后立刻做的事

- 把 dev.to 文章链接记下来（等会儿 HN 和 Reddit 要用）
- 在 X/Twitter 发一条（见下方文案）

---

## ✅ 渠道 2：Reddit r/SideProject（周六做，5 分钟）

**最佳时段**：周六 UTC 14:00-20:00（北京时间 22:00-次日 04:00，或者下午早点发）

### 1. 打开 https://www.reddit.com/r/SideProject/submit

### 2. 选 "Text" 类型

### 3. 填写

**Title**:
```
DevToolBox — 88 privacy-first developer tools in 9 languages, runs entirely in your browser
```

**Body**（直接粘贴，注意替换 dev.to 链接）:
```
Hey r/SideProject,

Just hit a milestone with a side project I've been building for the last year: [DevToolBox](https://viadreams.cc) — a collection of 88 developer utilities (JSON formatter, regex tester, WHOIS lookup, JWT decoder, cron parser, base64, UUID gen, and a pile of others).

A few things that might be different from the other tool sites floating around:

- **Everything runs client-side.** Your data never touches my server. The WHOIS tool calls rdap.org directly from your browser. JSON formatting happens on your CPU.
- **No signup, no ads tracking, no cookies.** There's one AdSense banner to cover the $5 VPS bill, and that's it.
- **9 languages.** EN/FR/DE/IT/ES/PT/ZH/JA/KO. Picked these because I could keep the translations native-quality rather than auto-generated.
- **Dark mode + keyboard shortcuts** on most tools.

Stack is Next.js 16 + TypeScript, deployed on a single $5 Vultr VPS with PM2/Nginx. Total annual cost ~$75 including domain.

I just wrote up a long postmortem on dev.to about what I got wrong over the year (trailingSlash nightmare, over-translating into 15 languages then cutting back to 9, the IndexNow setup that actually worked): [link to dev.to]

Would love feedback — especially tools you'd want added, or UX problems you spot. AMA on the stack / hosting setup if that's interesting.
```

### 4. 点 "Post"

### 5. 发布后

- 自己文章下面评论一次，回答"How do you monetize?"之类常见问题（提前埋好，给别人看到你愿意回答）
- 看评论，真诚回复每一个

---

## ✅ 渠道 3：Hacker News "Show HN"（下周二或周三早上 PT 9-10 AM）

**最佳时段**：工作日 **太平洋时间 9:00-10:30 AM**（北京时间当日凌晨 00:00-01:30，或者当日下午 1-2 点如果是冬令时）

### 1. 打开 https://news.ycombinator.com/submit

### 2. 填写

- **Title**: `Show HN: DevToolBox – 88 client-side developer tools, no tracking, 9 languages`
- **URL**: `https://viadreams.cc/en/`
- **Text**: 留空

### 3. 点 "Submit"

### 4. 发布后 30 分钟内关键动作

- 在评论区自己回一条，简短介绍技术栈 + 为什么做：
```
(OP) Hey HN — brief context: built this over the last year to scratch my own itch of having 20 different tool sites bookmarked. Stack is Next.js 16 + TS on a $5 Vultr VPS. Everything is client-side so the VPS is basically just a static host. Happy to get into implementation details — the i18n setup and IndexNow automation were the two things that were genuinely non-trivial.

If you want the postmortem of what I got wrong: [link to dev.to]
```
- 刷新 HN "new" 标签，找到自己的帖子，分享 URL 给 3-5 个能在 **上线 30 分钟内 upvote 的朋友**（这是 HN 上首页的关键门槛）
- 耐心回复每一条评论，**不要辩护、不要说"thanks for the feedback!"，而是给出有信息量的回答**

### HN 观众重点关心的问题（提前想好答案）

- "Why another dev tools site?" → 因为我个人用不惯现有的，而且 100% client-side 的还真没见过
- "Monetization?" → 一条 AdSense banner，覆盖 VPS 成本，不是做生意
- "Why not [具体工具]?" → 具体工具可能已经有了，反问他们用到的场景
- "Open source?" → 目前不是，考虑中。可以坦白说担心维护负担

---

## 🐦 社交文案（X/Twitter + LinkedIn）

发完 dev.to 30 分钟内发：

**X/Twitter 版（280 字符内）**:
```
Spent a year building DevToolBox → 88 dev tools on a $5 VPS.

Just wrote up what I got wrong (trailingSlash, i18n over-reach) and what worked (IndexNow, full client-side):

[dev.to link]

No signup, no tracking, 9 languages.
```

**LinkedIn 版（稍长）**:
```
Published a postmortem on building DevToolBox — 88 client-side developer tools in 9 languages, running on a single $5/month VPS.

The core bet was "no backend for the tools themselves." Everything runs in the visitor's browser, which is why a tiny Vultr instance can serve 3k pages/day without breaking a sweat.

The year-long lessons: trailingSlash migration nightmares, the price of over-translating into 15 languages, and the quietly underrated IndexNow API that made Bing actually index new pages in 24-48h.

Full write-up with the stack breakdown and what I'd do differently:
[dev.to link]

Feedback especially welcome from anyone running similar side-projects on modest infrastructure.
```

---

## 📊 跟踪（发布后 7-14 天做一次）

- **GA4 → Traffic acquisition → Session source/medium**：看 `dev.to`, `news.ycombinator.com`, `reddit.com` 各带来多少 UV
- **GSC → Performance → Queries**：看有没有新的 query 因为文章讨论度开始进入排名
- **Bing Webmaster → URL Inspection**：新增的 `/whois-lookup/` 和 `/text-to-speech/` 是否已被索引
- **dev.to 后台**：看 reactions、reading time、referral sources

---

## ⏰ 三篇文章间的互推节奏（发完最后一个渠道就做）

- dev.to 文章**顶部或底部**加一行：`> Also discussed on [Hacker News](HN链接) and [r/SideProject](Reddit链接).`
- HN 评论区再回自己一贴，补上 dev.to 链接
- Reddit 帖子评论区补一句 "I wrote a longer postmortem on dev.to with the technical details: [link]"

这样**每个平台的读者都能看到其他平台的讨论**，增加可信度和跨平台流量。

---

## 🎯 一句话总结

**dev.to 上午先发** → **周六 Reddit 跟上** → **下周工作日早 HN 终结**。整个链条全走一遍只需 **3 次各 10-15 分钟的操作**，但收益是 6-12 个月的被动外链 + 单日 2k-10k UV 的流量峰值。
