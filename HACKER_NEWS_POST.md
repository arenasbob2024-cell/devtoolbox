# Hacker News Show HN 发布内容

## 1. 标题

```
Show HN: DevToolBox - 78 browser-based dev tools, zero backend, 15 languages
```

备选标题：
- `Show HN: DevToolBox - 78 free developer tools that run entirely in your browser`
- `Show HN: I built a dev toolbox with 78 tools - all client-side, no signup`

---

## 2. 正文内容

```
Hi HN,

I built DevToolBox, a collection of 78 browser-based developer tools that require no signup and process everything client-side.

What started as a personal need for quick JSON formatting evolved into:
- Encoders/Decoders: Base64, URL, JWT, HTML entities
- Formatters: JSON, SQL, CSS, XML, CSV
- Generators: UUID, QR codes, hashes, passwords, fake data
- Converters: Timestamps, color formats, number bases, binary/text
- Text tools: Regex tester, Markdown preview, diff checker
- And more...

Tech decisions:
- Next.js 16 + TypeScript + Tailwind
- All processing in the browser (your data never leaves)
- i18n support for 15 languages
- Self-hosted on a $5/mo VPS

Live at: https://viadreams.cc

Source and self-hosting instructions available. Happy to discuss architecture choices, performance optimizations, or tool suggestions.

Thanks for reading!
```

---

## 3. 首发评论（发布后立即添加）

```
Some context on why I built this:

1. Privacy-first: I work with sensitive data (API keys, JWTs, internal JSON) and don't want to paste them into random online tools.

2. Speed: No network round-trips for processing. A 10MB JSON file formats instantly.

3. Offline capability: Most tools work without internet once loaded.

4. No dark patterns: No signup walls, no "upgrade to pro" popups, no data collection.

The monetization is simple: display ads for non-sensitive pages (homepage, blog). Tool pages are ad-free to keep them clean.

Happy to answer questions about the implementation or take feature requests.
```

---

## 4. 发布时间建议

| 时区 | 推荐时间 |
|------|----------|
| PST (US West) | 周日 8:00 - 10:00 AM |
| EST (US East) | 周日 11:00 AM - 1:00 PM |
| UTC | 周日 16:00 - 18:00 |
| 北京时间 | 忌日 00:00 - 02:00 |

**最佳窗口**: PST 周日早上 9:00 AM（HN 流量高峰前，竞争较少）

---

## 5. 应对常见问题的回答

### Q: Why not just use CLI tools?
```
CLI tools are great for scripting and automation. DevToolBox is for:
- Quick one-off tasks when you're already in the browser
- Non-developers who need tools like QR generators
- Shared screenshots/outputs that need quick formatting
- Situations where you can't install software (work laptop restrictions)
```

### Q: How do you handle 15 languages? Machine translation?
```
English is hand-written. Other languages started with AI-assisted translation, then I manually reviewed and fixed technical terms. The i18n setup is straightforward - JSON dictionaries per language, loaded at build time.

Adding a new language takes ~2 hours: create the JSON file, add locale config, update OG metadata.
```

### Q: What's your traffic/revenue?
```
Launched recently, still building SEO. Early days. The architecture is designed to scale cheaply - static generation for most pages, minimal server costs.

Happy to share numbers once there's meaningful data.
```

### Q: Why self-host instead of Vercel/Netlify?
```
A few reasons:
1. Full control over caching headers and Nginx config
2. Learning experience (this is a side project)
3. Predictable $5/mo cost regardless of traffic spikes
4. Can add custom monitoring and logging

For most people, Vercel free tier is the better choice. I wrote about the setup in the repo README.
```

### Q: What's the most used tool?
```
JSON Formatter and Base64 encoder get the most use. The Regex Tester is surprisingly popular - real-time highlighting seems to help people debug patterns faster.
```

### Q: How do you ensure client-side processing is secure?
```
Good question. A few things:
1. No external API calls from tool pages - pure browser JS
2. Open source, so security researchers can audit
3. No cookies/localStorage on tool pages (no tracking)
4. CSP headers to prevent XSS from user input

That said, for truly sensitive data, self-host or use offline tools. Trust but verify.
```

### Q: Any plans for [specific tool]?
```
Always open to suggestions. Recent additions came from user requests:
- PEM decoder (someone needed to inspect SSL certs)
- Bcrypt generator (for password hash testing)
- Fake data generator (for mock APIs)

Drop a comment or open a GitHub issue.
```

---

## 6. 发布后注意事项

1. **监控前 30 分钟**: HN 排名算法对早期 upvote 敏感
2. **及时回复评论**: 前 1 小时是黄金期
3. **保持谦逊**: 避免辩解，接受建设性批评
4. **不要自我 upvote**: HN 会检测并惩罚
5. **准备 GitHub 链接**: 如果有人问源码

---

## 7. 语气检查清单

- [x] 标题不过度承诺
- [x] 提及技术栈（HN 人群喜欢）
- [x] 强调隐私/安全（社区重视）
- [x] 提及开源/可自托管
- [x] 避免 "revolutionary", "game-changing" 等词
- [x] 诚实说明变现方式
