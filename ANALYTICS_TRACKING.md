# 流量追踪文档

## 1. 每日追踪表格（7天）

| 日期 | UV | PV | 跳出率 | 会话时长 | 主要来源 | 次要来源 | 转化数 | 转化率 | 最佳渠道 |
|------|----|----|--------|----------|----------|----------|--------|--------|----------|
| Day 1 | - | - | - | - | - | - | - | - | - |
| Day 2 | - | - | - | - | - | - | - | - | - |
| Day 3 | - | - | - | - | - | - | - | - | - |
| Day 4 | - | - | - | - | - | - | - | - | - |
| Day 5 | - | - | - | - | - | - | - | - | - |
| Day 6 | - | - | - | - | - | - | - | - | - |
| Day 7 | - | - | - | - | - | - | - | - | - |
| **总计** | - | - | - | - | - | - | - | - | - |

---

## 2. 关键指标定义

### 核心指标

| 指标 | 全称 | 定义 | 计算方式 |
|------|------|------|----------|
| **UV** | Unique Visitors | 独立访客数，去重后的访问用户数 | GA > Audience > Overview > Users |
| **PV** | Page Views | 页面浏览量，所有页面被访问的总次数 | GA > Audience > Overview > Pageviews |
| **Bounce Rate** | 跳出率 | 只访问一个页面就离开的会话占比 | (单页会话数 / 总会话数) × 100% |
| **Session Duration** | 会话时长 | 用户单次访问的平均停留时间 | 总停留时长 / 会话数 |

### 流量来源分类

| 来源类型 | 定义 | 示例 | GA 维度路径 |
|----------|------|------|-------------|
| **直接流量 (Direct)** | 直接输入 URL 或书签访问 | 浏览器地址栏输入、书签 | Acquisition > All Traffic > Source/Medium |
| **自然搜索 (Organic Search)** | 搜索引擎自然排名 | Google、Bing、百度搜索结果 | Acquisition > All Traffic > Source/Medium |
| **社交流量 (Social)** | 社交媒体平台 | Twitter/X、LinkedIn、Reddit、V2EX | Acquisition > Social > Network Referrals |
| **外链引荐 (Referral)** | 其他网站的外部链接 | 博客推荐、目录网站、论坛帖子 | Acquisition > All Traffic > Referrals |

### 转化指标

| 指标 | 定义 | 追踪方式 |
|------|------|----------|
| **转化数** | 完成目标行为的用户数 | GA Goals / Events |
| **转化率** | 转化数 / UV × 100% | (转化数 / UV) × 100% |
| **转化类型** | 注册、下载、点击、付费等 | 根据业务目标定义 |

---

## 3. Google Analytics 查询链接

### 常用报告链接模板

> **注意**：将 `YOUR_VIEW_ID` 替换为实际的 GA View ID

```
# 实时用户
https://analytics.google.com/analytics/web/#/realtime/rt-overview/YOUR_VIEW_ID

# 受众概览（UV/PV）
https://analytics.google.com/analytics/web/#/report/visitors-overview/YOUR_VIEW_ID

# 流量来源
https://analytics.google.com/analytics/web/#/report/trafficsources-overview/YOUR_VIEW_ID

# 来源/媒介详情
https://analytics.google.com/analytics/web/#/report/acquisition-all-acquisition/YOUR_VIEW_ID

# 社交网络
https://analytics.google.com/analytics/web/#/report/social-networks/YOUR_VIEW_ID

# 转化目标
https://analytics.google.com/analytics/web/#/report/conversions-goals-overview/YOUR_VIEW_ID
```

### GA4 Data API 查询示例

```javascript
// 查询每日 UV/PV
{
  "dateRanges": [{"startDate": "7daysAgo", "endDate": "yesterday"}],
  "dimensions": [{"name": "date"}],
  "metrics": [
    {"name": "activeUsers"},
    {"name": "screenPageViews"},
    {"name": "bounceRate"},
    {"name": "averageSessionDuration"}
  ]
}

// 查询流量来源
{
  "dateRanges": [{"startDate": "7daysAgo", "endDate": "yesterday"}],
  "dimensions": [{"name": "sessionDefaultChannelGroup"}],
  "metrics": [
    {"name": "activeUsers"},
    {"name": "sessions"},
    {"name": "conversions"}
  ]
}
```

---

## 4. 成功标准

### Day 7 目标

| 指标 | 最低目标 | 理想目标 | 卓越目标 |
|------|----------|----------|----------|
| **UV（7日累计）** | 500 | 1,000 | 2,000+ |
| **PV（7日累计）** | 1,000 | 2,500 | 5,000+ |
| **平均跳出率** | < 60% | < 45% | < 30% |
| **平均会话时长** | > 1 分钟 | > 2 分钟 | > 3 分钟 |
| **转化率** | > 1% | > 3% | > 5% |
| **PV/UV 比** | > 2.0 | > 2.5 | > 3.0 |

### 各渠道预期

| 渠道 | 预期占比 | Day 7 UV 目标 | 转化率预期 |
|------|----------|---------------|------------|
| **自然搜索** | 30-40% | 150-400 | 3-5% |
| **社交媒体** | 25-35% | 125-350 | 1-3% |
| **直接访问** | 15-25% | 75-250 | 5-8% |
| **外链引荐** | 15-25% | 75-250 | 2-4% |
| **付费流量** | 0-10% | 0-100 | 2-6% |

### 增长基准

| 阶段 | 日均 UV | 周增长率 | 关键特征 |
|------|---------|----------|----------|
| **冷启动** | < 50 | - | 依赖种子用户、手动推广 |
| **早期增长** | 50-200 | 20-50% | 搜索引擎收录、口碑传播 |
| **稳定增长** | 200-1000 | 10-20% | 多渠道均衡、品牌认知建立 |
| **规模化** | > 1000 | 5-15% | 需要系统性增长策略 |

---

## 5. 优化建议（基于数据）

### 按场景决策树

```
跳出率 > 60%?
├── 是 → 检查页面加载速度、优化首屏内容、改进 CTA 位置
└── 否 → 继续优化内容深度和内链结构

PV/UV < 2.0?
├── 是 → 增加相关内容推荐、优化导航、添加内部链接
└── 否 → 保持内容质量，扩展主题覆盖

会话时长 < 60s?
├── 是 → 优化内容结构、增加多媒体、改进可读性
└── 否 → 测试更多互动元素和功能

转化率 < 1%?
├── 是 → 简化转化流程、优化 CTA 文案、A/B 测试
└── 否 → 扩大流量规模、尝试新渠道
```

### 渠道优化策略

| 渠道表现 | 优化动作 |
|----------|----------|
| **搜索流量低** | 1. 检查 Google Search Console 收录状态<br>2. 优化 meta title/description<br>3. 增加长尾关键词内容<br>4. 提交 sitemap |
| **社交流量低** | 1. 增加发布频率和时间测试<br>2. 尝试不同内容格式<br>3. 参与 relevant 社区讨论<br>4. 考虑 KOL 合作 |
| **外链引荐低** | 1. 主动联系相关博客/目录<br>2. 在 Product Hunt/Hacker News 发布<br>3. 撰写客座文章<br>4. 创建可链接资源 |
| **直接流量低** | 1. 强化品牌记忆点<br>2. 优化域名易记性<br>3. 鼓励用户收藏<br>4. 口碑传播激励 |

### 内容优化矩阵

| 内容表现 | 高 PV | 低 PV |
|----------|-------|-------|
| **高跳出率** | 优化入口体验，快速传递价值 | 提升标题吸引力，检查 SEO |
| **低跳出率** | 扩展相关内容，建立内容集群 | 优化标题与内容一致性 |

### 周度复盘清单

- [ ] 对比本周 vs 上周关键指标变化
- [ ] 识别流量增长最快的渠道
- [ ] 找出跳出率最高的页面
- [ ] 检查转化漏斗流失点
- [ ] 记录有效的推广动作
- [ ] 规划下周优化重点

---

## 6. 数据记录模板

### 每日记录

```
日期：YYYY-MM-DD

📊 核心指标
- UV: ___
- PV: ___
- PV/UV: ___
- 跳出率: ___%
- 会话时长: ___s

📈 流量来源
- 直接: ___% (___ UV)
- 搜索: ___% (___ UV)
- 社交: ___% (___ UV)
- 外链: ___% (___ UV)

🎯 转化
- 转化数: ___
- 转化率: ___%

💡 观察
- 最佳渠道: ___
- 异常数据: ___
- 可能原因: ___

📝 今日动作
- 推广活动: ___
- 内容更新: ___
```

---

## 附录：常用工具

| 工具 | 用途 | 链接 |
|------|------|------|
| Google Analytics | 流量分析 | https://analytics.google.com |
| Google Search Console | SEO 监控 | https://search.google.com/search-console |
| Plausible | 轻量级分析 | https://plausible.io |
| UTM Builder | 追踪链接生成 | https://ga-dev-tools.web.app/campaign-url-builder/ |
| PageSpeed Insights | 性能检测 | https://pagespeed.web.dev |
