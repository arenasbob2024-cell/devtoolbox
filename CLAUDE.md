# DevToolBox — Claude Code 项目上下文

> 本文件供 Claude Code 快速理解项目、承接后续任务。请在 Claude Code 中 @ 引用此文件或将其放在工作区根目录。

---

## 1. 项目概览

- **项目名**: DevToolBox
- **类型**: 多语言在线开发者工具站
- **线上地址**: https://viadreams.cc
- **仓库**: devtoolbox（GitHub 已同步）
- **技术栈**: Next.js 16 (App Router) + TypeScript + Tailwind CSS
- **部署**: Vultr VPS (137.220.59.5)，通过 PM2 + Nginx 自托管

---

## 2. 已完成工作摘要

| 类别 | 内容 |
|------|------|
| **工具数量** | 78 款（从 28 → 41 → 71 → 78） |
| **支持语言** | 15 种：en, fr, de, it, es, pt, nl, pl, sv, no, zh, ja, ko, id, th |
| **新增工具** | xml-formatter, csv-json, http-status, mime-types, escape-unescape, ip-calculator, fake-data, hmac-generator, url-parser, binary-text, pem-decoder, html-table, bcrypt-generator |
| **新增语言** | 欧洲：pt, nl, pl, sv, no；东亚：ja, ko |
| **修复** | zh.json 中文乱码（通过 scripts/fix-zh-encoding.js 修复） |
| **部署** | 已部署至 viadreams.cc |
| **代码同步** | 已提交并推送到 GitHub main 分支 |

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

# 部署到生产环境（服务器上执行）
# 方式1：使用 deploy.sh
bash /var/www/devtoolbox/deploy.sh

# 方式2：手动部署
cd /var/www/devtoolbox
git pull origin main
npm install --production=false
NODE_OPTIONS='--max-old-space-size=4096' npm run build
pm2 restart devtoolbox

# 修复 zh 编码（如需）
node scripts/fix-zh-encoding.js

# 生成 ja/ko 字典（如需扩展）
node scripts/generate-ja-ko.js
```

---

## 6. 用户偏好（记忆）

- 修改完成后**直接部署**到线上
- 修改完成后**同步提交并推送到 GitHub**
- 回复使用**简体中文**

---

## 7. 部署架构

| 组件 | 配置 |
|------|------|
| **服务器** | Vultr VPS (137.220.59.5) |
| **域名** | viadreams.cc / www.viadreams.cc |
| **系统** | Ubuntu 22.04 LTS |
| **应用运行** | PM2 (进程管理) |
| **反向代理** | Nginx + Let's Encrypt SSL |
| **Node.js** | v20.20.0 |
| **项目路径** | `/var/www/devtoolbox` |

### 部署流程
1. 代码推送到 GitHub main 分支
2. SSH 登录服务器执行 `bash /var/www/devtoolbox/deploy.sh`
3. 脚本自动拉取代码、安装依赖、构建、重启 PM2

### 常用运维命令
```bash
# 查看应用状态
pm2 status
pm2 logs devtoolbox

# 重启应用
pm2 restart devtoolbox

# Nginx 操作
systemctl status nginx
nginx -t  # 测试配置
systemctl reload nginx

# 查看 SSL 证书
 certbot certificates
```

---

## 8. 当前状态

- 线上站点：https://viadreams.cc，功能正常
- 15 种语言、88 款工具、93 篇博客已配置
- 邮件订阅组件（Buttondown）已集成到 Footer、工具页侧边栏、博客页
- 总索引页：2780 页
- 无已知未完成任务
- 可在此基础上继续扩展工具、语言或功能

---

## 9. 可选后续方向

- 新增更多工具
- 新增更多语言
- 改进 SEO / 结构化数据
- 接入更多广告位或变现方式
- 优化性能和首屏加载
