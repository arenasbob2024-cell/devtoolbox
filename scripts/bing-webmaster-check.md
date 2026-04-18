# Bing Webmaster Tools — 2 分钟操作清单

当前 Bing 带来了 **72% 的自然流量**，锁定这个基本盘的成本极低。按下面步骤走一遍，做完就关掉。

---

## 登录入口

https://www.bing.com/webmasters

（可以直接用 Microsoft 账号 或 Google/邮箱 登录）

---

## 第一步：确认站点已验证

1. 顶部站点下拉菜单选中 `viadreams.cc`
2. 如果没有这个站点，点 "添加站点" → 输入 `https://viadreams.cc`
3. 验证方式选 **BingSiteAuth.xml**（文件已部署在 `public/18c23d4fa0c24bb2b5765783a90c0f4d.txt`）或 **Meta tag**
4. 验证成功后进入 Dashboard

---

## 第二步：提交 Sitemap（重点）

左侧菜单 → **Sitemaps**

确认已提交以下 URL（如未提交，点 "Submit sitemap" 输入）：

```
https://viadreams.cc/sitemap.xml
```

> 这是 index sitemap，会自动展开到 `/api/sitemap?id=0...N`（每个 ≤500 URL）。

提交后状态应显示：
- **Status**: Success
- **URLs submitted**: 2700+（当前总页数约 2780）
- **Last read**: 24h 内

如果 URLs submitted 远少于 2700，说明解析失败，检查 `/sitemap.xml` 是否返回 200。

---

## 第三步：检查 URL Inspection（"网址检查"）

左侧菜单 → **URL Inspection**

随机测几个关键 URL：

```
https://viadreams.cc/en/
https://viadreams.cc/en/tools/json-formatter/
https://viadreams.cc/en/category/json-tools/
https://viadreams.cc/en/blog/ollama-guide/
```

每个点 "Inspect URL" → 查看：
- ✅ **URL can be indexed** → 正常
- ⚠️  **Discovered but not crawled** → 没问题，等
- ❌ **Excluded by noindex** / **robots.txt block** → 出问题了，截图反馈给我

---

## 第四步：IndexNow Key 绑定

左侧菜单 → **IndexNow**（在 Configure My Site 下）

确认：
- **API Key**: `20f1b836f28044618a828be72fb2fdff`
- **Key location**: `https://viadreams.cc/20f1b836f28044618a828be72fb2fdff.txt`
- **Status**: Active

这样每次 GitHub Action 推送 URL 时，Bing 会直接接收，无需等爬虫发现。

---

## 第五步：SEO Reports（5 秒扫一眼）

左侧菜单 → **SEO Reports** → **Site Health**

只看"Errors"一栏，常见问题：
- ⚠️ **Missing meta descriptions** → 忽略（已经都有）
- ⚠️ **Low word count** → 忽略（工具页面天然短）
- ❌ **Broken links (4xx)** → 截图反馈给我
- ❌ **Redirect loops** → 截图反馈给我

---

## 第六步：Search Performance（看现状）

左侧菜单 → **Search Performance**

切到 **最近 28 天**，按 **Clicks** 排序，看前 20 个关键词。

这就是你当前 Bing 的流量来源，通常会看到：
- `json formatter online`
- `base64 encoder`
- `uuid generator`
- `jwt decoder`
- …类似长尾 SEO 关键词

**发现趋势**：哪个工具/关键词曝光高但点击率低（CTR < 3%），就是下一步要优化的标题/描述对象。

---

## 第七步（可选）：绑定 Microsoft Clarity

https://clarity.microsoft.com → 新建 Project → 复制 Project ID

Clarity 是免费的 用户行为热力图工具，传言 Bing 会把 Clarity 数据作为排序信号（未官方证实但免费就值得装）。

拿到 Project ID 后告诉我，我把脚本自动加到 `src/app/[lang]/layout.tsx` 里。

---

## 做完之后

做完这 7 步，Bing 基本盘就锁死了。后续每次 `git push main` 后：
1. GitHub Action 自动触发 IndexNow → Bing 24h 内收录
2. Sitemap 自动更新 → Bing 爬虫周期性重抓
3. 无需人工干预

有任何报错截图给我。
