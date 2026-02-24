# DevToolBox 性能优化指南

## 📋 优化概览

本次优化涵盖三个关键领域：
1. **图片优化配置**
2. **关键资源预加载**
3. **Next.js 全局配置**

---

## 🖼️ 任务1：图片优化

### 修改文件：`next.config.ts`

#### 关键变更

| 配置项 | 优化前 | 优化后 | 说明 |
|--------|--------|--------|------|
| `unoptimized` | `true` | `false` | 启用 Next.js 图片优化 |
| `formats` | 默认 | `['avif', 'webp']` | 优先使用现代图片格式 |
| `deviceSizes` | 默认 | `[640, 750, 828, 1080, 1200, 1920, 2048, 3840]` | 响应式图片断点 |
| `imageSizes` | 默认 | `[16, 32, 48, 64, 96, 128, 256, 384]` | 固定尺寸图片断点 |
| `minimumCacheTTL` | 默认 | `2592000` (30天) | 图片缓存时间 |

### 图片优化优势

1. **AVIF 格式**：相比 WebP 可再节省 20-30% 文件大小
2. **自动响应式**：根据设备视口自动提供合适尺寸
3. **懒加载**：图片进入视口时才加载
4. **占位符**：支持 blur placeholder 提升感知性能

### 使用建议

```tsx
// 推荐的图片使用方式
import Image from 'next/image';

<Image
  src="/og-image.png"
  alt="DevToolBox"
  width={1200}
  height={630}
  priority          // 首屏图片添加 priority
  quality={85}      // 质量 85% 是性能与质量的平衡点
/>
```

---

## 🚀 任务2：关键资源预加载

### 修改文件：`src/app/[lang]/layout.tsx`

### 添加的预加载资源

#### 1. Google Fonts 预连接
```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
```
- **作用**：提前建立与字体服务器的 TCP 连接
- **收益**：字体加载时间减少 100-300ms

#### 2. Analytics DNS 预解析
```html
<link rel="dns-prefetch" href="https://www.googletagmanager.com" />
<link rel="dns-prefetch" href="https://pagead2.googlesyndication.com" />
```
- **作用**：提前解析第三方域名
- **收益**：Google Analytics 和 AdSense 加载更快

#### 3. Google Analytics 预连接
```html
<link rel="preconnect" href="https://www.google-analytics.com" />
```
- **作用**：提前建立与 GA 的连接

#### 4. 可选：关键图片预加载（如需）
```html
<link rel="preload" href="/hero-image.png" as="image" type="image/png" fetchPriority="high" />
```
- **适用场景**：首屏 Largest Contentful Paint (LCP) 图片

---

## ⚙️ 任务3：Next.js 全局配置

### 新增配置项说明

#### 1. `trailingSlash: true`
```ts
// URL 格式统一
// 优化前: https://viadreams.cc/en/tools
// 优化后: https://viadreams.cc/en/tools/
```
- **SEO 收益**：避免重复内容问题
- **统一性**：所有 URL 都带尾部斜杠

#### 2. `poweredByHeader: false`
- **安全收益**：隐藏 X-Powered-By: Next.js 头
- **减少信息泄露**：攻击者无法直接识别框架

#### 3. `compress: true`
- **性能收益**：启用 Gzip 压缩
- **减少传输大小**：HTML/JSON/CSS/JS 压缩 60-80%

#### 4. HTTP 安全头
```ts
// 新增的安全响应头
X-DNS-Prefetch-Control: on                    // 允许 DNS 预解析
Strict-Transport-Security: max-age=63072000    // HSTS 2年
X-Content-Type-Options: nosniff               // 防止 MIME 嗅探
Referrer-Policy: origin-when-cross-origin     // 控制 Referrer 信息
```

#### 5. 缓存策略配置

| 资源类型 | 缓存策略 | 说明 |
|---------|----------|------|
| `_next/static` | `max-age=31536000, immutable` | 永久缓存（文件哈希变化） |
| `_next/image` | `max-age=2592000, stale-while-revalidate=86400` | 30天 + 后台刷新 |
| 静态图片 | `max-age=2592000, must-revalidate` | 30天缓存 |

---

## 📊 性能预期收益

### Core Web Vitals 优化

| 指标 | 优化前估计 | 优化后目标 | 优化幅度 |
|------|-----------|-----------|----------|
| **LCP** (Largest Contentful Paint) | ~2.5s | < 2.0s | ↓ 20% |
| **FCP** (First Contentful Paint) | ~1.5s | < 1.2s | ↓ 20% |
| **TTFB** (Time to First Byte) | ~300ms | < 200ms | ↓ 33% |
| **CLS** (Cumulative Layout Shift) | ~0.05 | < 0.05 | 稳定 |

### 资源加载优化

- **图片大小**：AVIF 格式可减少 30-50%
- **字体加载**：预连接减少 100-300ms
- **第三方脚本**：DNS 预解析减少 50-100ms

---

## 🧪 验证优化效果

### 1. 本地测试
```bash
# 构建生产版本
npm run build

# 本地运行生产版本
npm start

# 或使用 Next.js 分析
ANALYZE=true npm run build
```

### 2. 在线测试工具

| 工具 | 用途 | 目标分数 |
|------|------|---------|
| [PageSpeed Insights](https://pagespeed.web.dev/) | Google 官方性能测试 | > 90 |
| [GTmetrix](https://gtmetrix.com/) | 详细性能报告 | Grade A |
| [WebPageTest](https://www.webpagetest.org/) | 多地点测试 | LCP < 2s |
| [Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci) | 持续集成测试 | > 90 |

### 3. 关键检查点

```bash
# 检查图片优化是否生效
curl -I https://viadreams.cc/_next/image?url=%2Fog-image.png&w=1200&q=75

# 检查缓存头
curl -I https://viadreams.cc/_next/static/...

# 检查安全头
curl -I https://viadreams.cc/en/
```

---

## ⚠️ 注意事项

### 1. 图片优化注意事项
- 首次构建可能会变慢（需要生成不同尺寸和格式）
- 如果使用 Vercel，图片优化是免费的
- 自托管时需要配置 `loader` 或使用默认优化器

### 2. 预连接注意事项
- 不要预连接过多域名（建议 < 6 个）
- 只预连接真正需要的资源

### 3. 缓存策略
- `_next/static` 文件有内容哈希，可以永久缓存
- `_next/image` 文件基于 URL 参数缓存

---

## 🔧 后续优化建议

### 短期（已实施）
- ✅ 启用图片优化
- ✅ 添加预连接
- ✅ 配置缓存策略

### 中期（可选）
- [ ] 实施 Service Worker 离线缓存
- [ ] 添加关键 CSS 内联
- [ ] 优化字体加载策略（使用 font-display: optional）

### 长期（可选）
- [ ] 启用 Next.js Partial Prerendering (PPR)
- [ ] 实施 Edge 运行时
- [ ] 添加 Real User Monitoring (RUM)

---

## 📚 参考资源

- [Next.js Image Optimization](https://nextjs.org/docs/app/building-your-application/optimizing/images)
- [Web Vitals](https://web.dev/vitals/)
- [Resource Hints](https://web.dev/resource-hints/)
- [HTTP Caching](https://web.dev/http-cache/)
