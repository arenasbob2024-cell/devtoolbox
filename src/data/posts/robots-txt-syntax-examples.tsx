'use client';
import React from 'react';
import Link from 'next/link';

export default function RobotsTxtSyntaxExamples({ lang }: { lang: string }) {
  const t: Record<string, Record<string, string>> = {
    en: {
      title: 'robots.txt Syntax & Examples: The Complete Guide for SEO',
      intro: 'The robots.txt file is the first thing search engine crawlers check when visiting your website. A properly configured robots.txt can protect private content, save crawl budget, and improve SEO. This guide covers every directive, wildcard pattern, and real-world example you need.',

      whatTitle: 'What is robots.txt?',
      whatDesc: 'robots.txt is a plain text file placed at the root of your website (e.g., https://example.com/robots.txt) that tells web crawlers which URLs they are allowed or forbidden to access. It follows the Robots Exclusion Protocol (REP), first proposed in 1994 and now an internet standard (RFC 9309).',
      whatHow: 'How crawlers use robots.txt:',
      whatStep1: 'A crawler arrives at your domain and requests /robots.txt before crawling any other page.',
      whatStep2: 'If the file exists, the crawler parses rules for its specific User-agent.',
      whatStep3: 'The crawler follows matching Disallow and Allow directives when deciding which URLs to fetch.',
      whatStep4: 'If no robots.txt is found (404), the crawler assumes everything is allowed.',
      whatNote: 'Important: robots.txt is advisory, not enforceable. Well-behaved bots (Googlebot, Bingbot) respect it, but malicious scrapers may ignore it entirely. For truly private content, use authentication or server-side access controls.',

      syntaxTitle: 'Syntax Rules & Directives',
      syntaxDesc: 'A robots.txt file is composed of one or more rule groups. Each group starts with a User-agent line followed by directives:',
      directiveUA: 'User-agent — Specifies which crawler the rules apply to. Use * for all crawlers.',
      directiveDisallow: 'Disallow — Blocks a URL path. An empty value (Disallow:) means nothing is blocked.',
      directiveAllow: 'Allow — Explicitly permits a URL path, overriding a broader Disallow. Supported by Googlebot and most modern crawlers.',
      directiveSitemap: 'Sitemap — Points to your XML sitemap. Can appear anywhere in the file, outside rule groups.',
      directiveCrawlDelay: 'Crawl-delay — Requests a delay (in seconds) between successive requests. Supported by Bing and Yandex but NOT by Google.',
      syntaxRules: 'Formatting rules:',
      syntaxRule1: 'One directive per line.',
      syntaxRule2: 'Lines starting with # are comments.',
      syntaxRule3: 'Blank lines separate rule groups.',
      syntaxRule4: 'Paths are case-sensitive (/Admin is different from /admin).',
      syntaxRule5: 'The file must be named exactly robots.txt and placed at the domain root.',
      syntaxExample: 'Basic syntax example:',

      wildcardTitle: 'Wildcard Patterns',
      wildcardDesc: 'Google, Bing, and most major crawlers support two wildcard characters in robots.txt paths:',
      wildcardStar: '* (asterisk) — Matches any sequence of characters (including empty).',
      wildcardDollar: '$ (dollar sign) — Anchors the match at the end of the URL.',
      wildcardExamples: 'Wildcard pattern examples:',
      wildcardNote: 'Note: The original robots.txt specification did not include wildcards. They are extensions supported by major search engines. Always test your patterns to ensure they match what you intend.',

      commonTitle: 'Common robots.txt Examples',
      commonBlockAll: 'Block all crawlers from the entire site:',
      commonAllowAll: 'Allow all crawlers (explicit):',
      commonBlockOne: 'Block a specific crawler:',
      commonBlockDir: 'Block a specific directory:',
      commonAllowOne: 'Block all but allow a specific path:',
      commonMultiple: 'Multiple rule groups:',

      wordpressTitle: 'WordPress robots.txt',
      wordpressDesc: 'WordPress sites have specific directories and files that should typically be blocked from crawlers to save crawl budget and prevent indexing of admin/utility pages:',
      wordpressNote: 'Tip: Do not block /wp-content/uploads/ — that is where your media files live, and you want them indexed. Also, never block your CSS/JS files as Google needs them for rendering.',

      nextjsTitle: 'Next.js / React SPA robots.txt',
      nextjsDesc: 'Modern JavaScript frameworks serve static assets and API routes that should not be indexed. Here is a recommended robots.txt for Next.js applications:',
      nextjsNote: 'In Next.js 13+, you can generate robots.txt programmatically by creating an app/robots.ts file that exports a metadata function. For static sites, place robots.txt in the public/ directory.',

      ecommerceTitle: 'E-commerce robots.txt',
      ecommerceDesc: 'E-commerce sites need careful robots.txt configuration to prevent crawling of user accounts, checkout flows, and faceted navigation that creates duplicate content:',
      ecommerceNote: 'Warning: Do not block product pages or category pages — those are your money pages. Only block utility paths, user-specific pages, and duplicate content generators like sort/filter parameters.',

      aiTitle: 'Block AI Crawlers',
      aiDesc: 'With the rise of large language models, many site owners want to prevent AI training crawlers from scraping their content. Here are the known AI crawler user agents and how to block them:',
      aiCrawlers: 'Known AI crawler user agents:',
      aiCrawler1: 'GPTBot — OpenAI\'s crawler for training data',
      aiCrawler2: 'ChatGPT-User — OpenAI\'s crawler for ChatGPT browsing feature',
      aiCrawler3: 'Google-Extended — Google\'s AI training crawler (Gemini/Bard)',
      aiCrawler4: 'anthropic-ai — Anthropic\'s crawler for Claude training data',
      aiCrawler5: 'ClaudeBot — Anthropic\'s web crawler',
      aiCrawler6: 'CCBot — Common Crawl bot (used by many AI companies)',
      aiCrawler7: 'Bytespider — ByteDance\'s crawler',
      aiCrawler8: 'Amazonbot — Amazon\'s crawler',
      aiNote: 'Note: Blocking AI crawlers in robots.txt does not retroactively remove content already collected. It only prevents future crawling. Also, new AI crawlers appear regularly, so review your robots.txt periodically.',

      sitemapTitle: 'Sitemap Directive',
      sitemapDesc: 'The Sitemap directive tells crawlers where to find your XML sitemap. This is especially useful because it does not require a specific User-agent block — it applies globally:',
      sitemapRules: 'Sitemap directive rules:',
      sitemapRule1: 'Must use a full absolute URL (including https://).',
      sitemapRule2: 'Can list multiple Sitemap directives for multiple sitemaps.',
      sitemapRule3: 'Can be placed anywhere in the file (not tied to a User-agent group).',
      sitemapRule4: 'Supports sitemap index files that reference other sitemaps.',
      sitemapBenefit: 'Benefit: Even if Google discovers your sitemap through Search Console, including it in robots.txt ensures all crawlers can find it automatically.',

      testingTitle: 'Testing & Validation',
      testingDesc: 'Always test your robots.txt before deploying to production. A single typo can accidentally block your entire site from search engines.',
      testingMethod1: 'Google Search Console — The "robots.txt Tester" tool lets you test specific URLs against your rules.',
      testingMethod2: 'curl command — Quickly check if your robots.txt is accessible:',
      testingMethod3: 'Online validators — Tools like Google\'s robots.txt tester or Merkle\'s robots.txt analyzer.',
      testingMistakes: 'Common mistakes to avoid:',
      testingMistake1: 'Placing robots.txt in a subdirectory instead of the domain root.',
      testingMistake2: 'Using relative URLs in the Sitemap directive (must be absolute).',
      testingMistake3: 'Blocking CSS/JS files that search engines need for rendering.',
      testingMistake4: 'Forgetting that Disallow: / blocks EVERYTHING including your homepage.',
      testingMistake5: 'Not testing after changes — always verify with Google Search Console.',
      testingMistake6: 'Using incorrect line endings or BOM characters (use UTF-8 without BOM).',

      comparisonTitle: 'robots.txt vs meta robots vs X-Robots-Tag',
      comparisonDesc: 'There are three main ways to control crawler behavior. Each serves a different purpose:',
      comparisonMethod: 'Method',
      comparisonScope: 'Scope',
      comparisonLocation: 'Location',
      comparisonCrawl: 'Prevents Crawling',
      comparisonIndex: 'Prevents Indexing',
      comparisonGranularity: 'Granularity',
      comparisonRobotsTxt: 'robots.txt',
      comparisonRobotsTxtScope: 'Entire paths / directories',
      comparisonRobotsTxtLocation: 'Domain root /robots.txt',
      comparisonRobotsTxtCrawl: 'Yes',
      comparisonRobotsTxtIndex: 'No (URLs can still appear in search results)',
      comparisonRobotsTxtGranularity: 'URL path level',
      comparisonMetaRobots: 'meta robots',
      comparisonMetaRobotsScope: 'Individual pages',
      comparisonMetaRobotsLocation: 'HTML <head> tag',
      comparisonMetaRobotsCrawl: 'No (page must be crawled to see the tag)',
      comparisonMetaRobotsIndex: 'Yes (noindex)',
      comparisonMetaRobotsGranularity: 'Per page',
      comparisonXRobots: 'X-Robots-Tag',
      comparisonXRobotsScope: 'Any resource (PDF, image, etc.)',
      comparisonXRobotsLocation: 'HTTP response header',
      comparisonXRobotsCrawl: 'No (resource must be fetched to see the header)',
      comparisonXRobotsIndex: 'Yes (noindex)',
      comparisonXRobotsGranularity: 'Per resource',
      comparisonTip: 'Tip: To truly prevent a page from appearing in search results, use meta robots noindex or X-Robots-Tag noindex. robots.txt alone does NOT prevent indexing — Google can still index URLs it discovers through links, even if it cannot crawl them.',

      tryTool: 'Generate your robots.txt file instantly',
      tryToolRobots: 'Robots.txt Generator',
      tryToolMeta: 'Meta Tag Generator',

      faq1q: 'Does robots.txt prevent pages from appearing in Google search results?',
      faq1a: 'No. robots.txt prevents crawling but not indexing. If other sites link to your blocked page, Google may still show the URL in search results (without a snippet). To prevent indexing, use a meta robots noindex tag or X-Robots-Tag: noindex HTTP header instead.',
      faq2q: 'Where should I place the robots.txt file?',
      faq2a: 'The robots.txt file must be placed at the root of your domain: https://example.com/robots.txt. It does not work in subdirectories. For subdomains (e.g., blog.example.com), you need a separate robots.txt at the subdomain root.',
      faq3q: 'Can I use robots.txt to block AI crawlers like GPTBot and ClaudeBot?',
      faq3a: 'Yes. Add User-agent: GPTBot followed by Disallow: / to block OpenAI\'s crawler. Similarly, use User-agent: ClaudeBot with Disallow: / for Anthropic\'s crawler. However, this only prevents future crawling and does not remove previously collected data.',
      faq4q: 'What happens if my site has no robots.txt file?',
      faq4a: 'If a crawler receives a 404 response for /robots.txt, it assumes there are no restrictions and will crawl all accessible pages on your site. This is the default behavior defined in the Robots Exclusion Protocol.',
      faq5q: 'What is the difference between Disallow: and Disallow: / in robots.txt?',
      faq5a: 'Disallow: (with an empty value) means nothing is disallowed — crawlers can access everything. Disallow: / (with a forward slash) means the entire site is blocked. This single-character difference is critical and a common source of misconfiguration.',
    },
    zh: {
      title: 'robots.txt 语法与示例：完整 SEO 指南',
      intro: 'robots.txt 文件是搜索引擎爬虫访问你网站时首先检查的文件。正确配置的 robots.txt 可以保护私密内容、节省抓取预算并改善 SEO。本指南涵盖了每个指令、通配符模式和你需要的实际示例。',

      whatTitle: '什么是 robots.txt？',
      whatDesc: 'robots.txt 是一个放置在网站根目录（例如 https://example.com/robots.txt）的纯文本文件，用于告诉网络爬虫哪些 URL 允许或禁止访问。它遵循 Robots 排除协议（REP），最初于 1994 年提出，现已成为互联网标准（RFC 9309）。',
      whatHow: '爬虫如何使用 robots.txt：',
      whatStep1: '爬虫到达你的域名后，在抓取任何其他页面之前先请求 /robots.txt。',
      whatStep2: '如果文件存在，爬虫会解析其特定 User-agent 的规则。',
      whatStep3: '爬虫在决定获取哪些 URL 时遵循匹配的 Disallow 和 Allow 指令。',
      whatStep4: '如果未找到 robots.txt（返回 404），爬虫假定所有内容都允许访问。',
      whatNote: '重要提示：robots.txt 是建议性的，不具有强制性。行为良好的机器人（Googlebot、Bingbot）会遵守它，但恶意爬虫可能完全忽略它。对于真正的私密内容，请使用身份验证或服务器端访问控制。',

      syntaxTitle: '语法规则与指令',
      syntaxDesc: 'robots.txt 文件由一个或多个规则组组成。每个组以 User-agent 行开头，后跟指令：',
      directiveUA: 'User-agent — 指定规则适用于哪个爬虫。使用 * 表示所有爬虫。',
      directiveDisallow: 'Disallow — 阻止 URL 路径。空值（Disallow:）表示不阻止任何内容。',
      directiveAllow: 'Allow — 明确允许 URL 路径，覆盖更广泛的 Disallow。Googlebot 和大多数现代爬虫支持。',
      directiveSitemap: 'Sitemap — 指向你的 XML 站点地图。可以出现在文件中的任何位置，不属于规则组。',
      directiveCrawlDelay: 'Crawl-delay — 请求连续请求之间的延迟（秒）。Bing 和 Yandex 支持，但 Google 不支持。',
      syntaxRules: '格式规则：',
      syntaxRule1: '每行一个指令。',
      syntaxRule2: '以 # 开头的行是注释。',
      syntaxRule3: '空行分隔规则组。',
      syntaxRule4: '路径区分大小写（/Admin 与 /admin 不同）。',
      syntaxRule5: '文件必须命名为 robots.txt 并放置在域名根目录。',
      syntaxExample: '基本语法示例：',

      wildcardTitle: '通配符模式',
      wildcardDesc: 'Google、Bing 和大多数主要爬虫支持 robots.txt 路径中的两个通配符：',
      wildcardStar: '*（星号）— 匹配任意字符序列（包括空字符串）。',
      wildcardDollar: '$（美元符号）— 将匹配锚定在 URL 末尾。',
      wildcardExamples: '通配符模式示例：',
      wildcardNote: '注意：最初的 robots.txt 规范不包含通配符。它们是主要搜索引擎支持的扩展。始终测试你的模式以确保它们匹配你的预期。',

      commonTitle: '常见 robots.txt 示例',
      commonBlockAll: '阻止所有爬虫访问整个网站：',
      commonAllowAll: '允许所有爬虫（显式声明）：',
      commonBlockOne: '阻止特定爬虫：',
      commonBlockDir: '阻止特定目录：',
      commonAllowOne: '阻止所有但允许特定路径：',
      commonMultiple: '多个规则组：',

      wordpressTitle: 'WordPress robots.txt',
      wordpressDesc: 'WordPress 网站有特定的目录和文件通常应该阻止爬虫访问，以节省抓取预算并防止索引管理/工具页面：',
      wordpressNote: '提示：不要阻止 /wp-content/uploads/ — 那是你的媒体文件所在的位置，你希望它们被索引。另外，永远不要阻止你的 CSS/JS 文件，因为 Google 需要它们来渲染页面。',

      nextjsTitle: 'Next.js / React SPA robots.txt',
      nextjsDesc: '现代 JavaScript 框架会提供不应被索引的静态资源和 API 路由。以下是 Next.js 应用程序推荐的 robots.txt：',
      nextjsNote: '在 Next.js 13+ 中，你可以通过创建 app/robots.ts 文件并导出 metadata 函数来程序化生成 robots.txt。对于静态网站，将 robots.txt 放在 public/ 目录中。',

      ecommerceTitle: '电子商务 robots.txt',
      ecommerceDesc: '电子商务网站需要仔细配置 robots.txt，以防止爬虫抓取用户账户、结账流程和产生重复内容的分面导航：',
      ecommerceNote: '警告：不要阻止产品页面或分类页面 — 那些是你的核心页面。只阻止工具路径、用户特定页面和排序/筛选参数等重复内容生成器。',

      aiTitle: '阻止 AI 爬虫',
      aiDesc: '随着大型语言模型的兴起，许多网站所有者希望阻止 AI 训练爬虫抓取其内容。以下是已知的 AI 爬虫用户代理及其阻止方法：',
      aiCrawlers: '已知的 AI 爬虫用户代理：',
      aiCrawler1: 'GPTBot — OpenAI 的训练数据爬虫',
      aiCrawler2: 'ChatGPT-User — OpenAI 的 ChatGPT 浏览功能爬虫',
      aiCrawler3: 'Google-Extended — Google 的 AI 训练爬虫（Gemini/Bard）',
      aiCrawler4: 'anthropic-ai — Anthropic 的 Claude 训练数据爬虫',
      aiCrawler5: 'ClaudeBot — Anthropic 的网络爬虫',
      aiCrawler6: 'CCBot — Common Crawl 机器人（被许多 AI 公司使用）',
      aiCrawler7: 'Bytespider — 字节跳动的爬虫',
      aiCrawler8: 'Amazonbot — 亚马逊的爬虫',
      aiNote: '注意：在 robots.txt 中阻止 AI 爬虫不会追溯删除已收集的内容。它只能阻止未来的抓取。此外，新的 AI 爬虫会定期出现，因此请定期检查你的 robots.txt。',

      sitemapTitle: 'Sitemap 指令',
      sitemapDesc: 'Sitemap 指令告诉爬虫在哪里找到你的 XML 站点地图。这特别有用，因为它不需要特定的 User-agent 块 — 它全局适用：',
      sitemapRules: 'Sitemap 指令规则：',
      sitemapRule1: '必须使用完整的绝对 URL（包括 https://）。',
      sitemapRule2: '可以列出多个 Sitemap 指令对应多个站点地图。',
      sitemapRule3: '可以放置在文件中的任何位置（不绑定到 User-agent 组）。',
      sitemapRule4: '支持引用其他站点地图的站点地图索引文件。',
      sitemapBenefit: '好处：即使 Google 通过 Search Console 发现了你的站点地图，在 robots.txt 中包含它可以确保所有爬虫都能自动找到它。',

      testingTitle: '测试与验证',
      testingDesc: '在部署到生产环境之前，务必测试你的 robots.txt。一个小的拼写错误可能会意外阻止搜索引擎抓取你的整个网站。',
      testingMethod1: 'Google Search Console — "robots.txt 测试工具"可以让你针对规则测试特定 URL。',
      testingMethod2: 'curl 命令 — 快速检查你的 robots.txt 是否可访问：',
      testingMethod3: '在线验证器 — 如 Google 的 robots.txt 测试工具或 Merkle 的 robots.txt 分析器。',
      testingMistakes: '要避免的常见错误：',
      testingMistake1: '将 robots.txt 放在子目录中而不是域名根目录。',
      testingMistake2: '在 Sitemap 指令中使用相对 URL（必须是绝对 URL）。',
      testingMistake3: '阻止搜索引擎渲染所需的 CSS/JS 文件。',
      testingMistake4: '忘记 Disallow: / 会阻止所有内容，包括你的主页。',
      testingMistake5: '更改后不测试 — 务必使用 Google Search Console 验证。',
      testingMistake6: '使用不正确的换行符或 BOM 字符（使用不带 BOM 的 UTF-8）。',

      comparisonTitle: 'robots.txt vs meta robots vs X-Robots-Tag',
      comparisonDesc: '有三种主要方式来控制爬虫行为。每种方式服务于不同的目的：',
      comparisonMethod: '方法',
      comparisonScope: '范围',
      comparisonLocation: '位置',
      comparisonCrawl: '阻止抓取',
      comparisonIndex: '阻止索引',
      comparisonGranularity: '粒度',
      comparisonRobotsTxt: 'robots.txt',
      comparisonRobotsTxtScope: '整个路径/目录',
      comparisonRobotsTxtLocation: '域名根目录 /robots.txt',
      comparisonRobotsTxtCrawl: '是',
      comparisonRobotsTxtIndex: '否（URL 仍可能出现在搜索结果中）',
      comparisonRobotsTxtGranularity: 'URL 路径级别',
      comparisonMetaRobots: 'meta robots',
      comparisonMetaRobotsScope: '单个页面',
      comparisonMetaRobotsLocation: 'HTML <head> 标签',
      comparisonMetaRobotsCrawl: '否（必须抓取页面才能看到标签）',
      comparisonMetaRobotsIndex: '是（noindex）',
      comparisonMetaRobotsGranularity: '每页',
      comparisonXRobots: 'X-Robots-Tag',
      comparisonXRobotsScope: '任何资源（PDF、图片等）',
      comparisonXRobotsLocation: 'HTTP 响应头',
      comparisonXRobotsCrawl: '否（必须获取资源才能看到头部）',
      comparisonXRobotsIndex: '是（noindex）',
      comparisonXRobotsGranularity: '每个资源',
      comparisonTip: '提示：要真正阻止页面出现在搜索结果中，请使用 meta robots noindex 或 X-Robots-Tag noindex。仅靠 robots.txt 不能阻止索引 — 即使 Google 无法抓取页面，它仍然可以通过链接发现并索引 URL。',

      tryTool: '立即生成你的 robots.txt 文件',
      tryToolRobots: 'Robots.txt 生成器',
      tryToolMeta: 'Meta 标签生成器',

      faq1q: 'robots.txt 能阻止页面出现在 Google 搜索结果中吗？',
      faq1a: '不能。robots.txt 阻止抓取但不阻止索引。如果其他网站链接到你被阻止的页面，Google 仍可能在搜索结果中显示该 URL（没有摘要）。要阻止索引，请改用 meta robots noindex 标签或 X-Robots-Tag: noindex HTTP 头。',
      faq2q: '我应该把 robots.txt 文件放在哪里？',
      faq2a: 'robots.txt 文件必须放在域名根目录：https://example.com/robots.txt。它在子目录中不起作用。对于子域名（例如 blog.example.com），你需要在子域名根目录单独放置一个 robots.txt。',
      faq3q: '我可以使用 robots.txt 阻止 GPTBot 和 ClaudeBot 等 AI 爬虫吗？',
      faq3a: '可以。添加 User-agent: GPTBot 后跟 Disallow: / 来阻止 OpenAI 的爬虫。类似地，使用 User-agent: ClaudeBot 配合 Disallow: / 来阻止 Anthropic 的爬虫。但这只能阻止未来的抓取，不能删除之前已收集的数据。',
      faq4q: '如果我的网站没有 robots.txt 文件会怎样？',
      faq4a: '如果爬虫对 /robots.txt 收到 404 响应，它会假定没有任何限制，将抓取你网站上所有可访问的页面。这是 Robots 排除协议中定义的默认行为。',
      faq5q: 'robots.txt 中 Disallow: 和 Disallow: / 有什么区别？',
      faq5a: 'Disallow:（空值）表示不禁止任何内容 — 爬虫可以访问所有内容。Disallow: /（带斜杠）表示整个网站被阻止。这一个字符的差异至关重要，是常见的配置错误来源。',
    },
  };
  const ct = t[lang] || t['en'];

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: ct.faq1q, acceptedAnswer: { '@type': 'Answer', text: ct.faq1a } },
      { '@type': 'Question', name: ct.faq2q, acceptedAnswer: { '@type': 'Answer', text: ct.faq2a } },
      { '@type': 'Question', name: ct.faq3q, acceptedAnswer: { '@type': 'Answer', text: ct.faq3a } },
      { '@type': 'Question', name: ct.faq4q, acceptedAnswer: { '@type': 'Answer', text: ct.faq4a } },
      { '@type': 'Question', name: ct.faq5q, acceptedAnswer: { '@type': 'Answer', text: ct.faq5a } },
    ],
  };

  const codeStyle: React.CSSProperties = { background: 'var(--bg-input)', border: '1px solid var(--border-color)', borderRadius: 8, padding: '16px 20px', overflowX: 'auto', fontSize: 13, lineHeight: 1.8 };
  const tableStyle: React.CSSProperties = { width: '100%', borderCollapse: 'collapse', fontSize: 13 };
  const thStyle: React.CSSProperties = { background: 'var(--bg-input)', border: '1px solid var(--border-color)', padding: '10px 14px', textAlign: 'left', fontWeight: 700 };
  const tdStyle: React.CSSProperties = { border: '1px solid var(--border-color)', padding: '10px 14px' };
  const h2Style: React.CSSProperties = { fontSize: 22, fontWeight: 700, marginTop: 40, marginBottom: 16, color: 'var(--text-primary)' };

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <p style={{ fontSize: 16, lineHeight: 1.8, color: 'var(--text-secondary)', marginBottom: 30 }}>{ct.intro}</p>

      {/* Section 1: What is robots.txt */}
      <h2 style={h2Style}>{ct.whatTitle}</h2>
      <p style={{ lineHeight: 1.8, color: 'var(--text-secondary)', marginBottom: 16 }}>{ct.whatDesc}</p>
      <p style={{ lineHeight: 1.8, color: 'var(--text-secondary)', marginBottom: 8, fontWeight: 600 }}>{ct.whatHow}</p>
      <ol style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, marginBottom: 16 }}>
        <li>{ct.whatStep1}</li>
        <li>{ct.whatStep2}</li>
        <li>{ct.whatStep3}</li>
        <li>{ct.whatStep4}</li>
      </ol>
      <div style={{ padding: 16, background: 'rgba(245,158,11,0.1)', borderRadius: 8, border: '1px solid rgba(245,158,11,0.3)', marginBottom: 24 }}>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7, margin: 0 }}>{ct.whatNote}</p>
      </div>

      {/* Section 2: Syntax Rules */}
      <h2 style={h2Style}>{ct.syntaxTitle}</h2>
      <p style={{ lineHeight: 1.8, color: 'var(--text-secondary)', marginBottom: 16 }}>{ct.syntaxDesc}</p>
      <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, marginBottom: 16 }}>
        <li><code style={{ color: 'var(--accent-blue)' }}>User-agent</code> — {ct.directiveUA}</li>
        <li><code style={{ color: 'var(--accent-blue)' }}>Disallow</code> — {ct.directiveDisallow}</li>
        <li><code style={{ color: 'var(--accent-blue)' }}>Allow</code> — {ct.directiveAllow}</li>
        <li><code style={{ color: 'var(--accent-blue)' }}>Sitemap</code> — {ct.directiveSitemap}</li>
        <li><code style={{ color: 'var(--accent-blue)' }}>Crawl-delay</code> — {ct.directiveCrawlDelay}</li>
      </ul>
      <p style={{ lineHeight: 1.8, color: 'var(--text-secondary)', marginBottom: 8, fontWeight: 600 }}>{ct.syntaxRules}</p>
      <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, marginBottom: 16 }}>
        <li>{ct.syntaxRule1}</li>
        <li>{ct.syntaxRule2}</li>
        <li>{ct.syntaxRule3}</li>
        <li>{ct.syntaxRule4}</li>
        <li>{ct.syntaxRule5}</li>
      </ul>
      <p style={{ lineHeight: 1.8, color: 'var(--text-secondary)', marginBottom: 8 }}>{ct.syntaxExample}</p>
      <pre style={codeStyle}><code>{`# This is a comment
User-agent: *
Disallow: /private/
Disallow: /tmp/
Allow: /private/public-page.html

# Slow down Bingbot
User-agent: Bingbot
Crawl-delay: 10

Sitemap: https://example.com/sitemap.xml`}</code></pre>

      {/* Section 3: Wildcard Patterns */}
      <h2 style={h2Style}>{ct.wildcardTitle}</h2>
      <p style={{ lineHeight: 1.8, color: 'var(--text-secondary)', marginBottom: 16 }}>{ct.wildcardDesc}</p>
      <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, marginBottom: 16 }}>
        <li><code style={{ color: 'var(--accent-blue)' }}>*</code> — {ct.wildcardStar}</li>
        <li><code style={{ color: 'var(--accent-blue)' }}>$</code> — {ct.wildcardDollar}</li>
      </ul>
      <p style={{ lineHeight: 1.8, color: 'var(--text-secondary)', marginBottom: 8 }}>{ct.wildcardExamples}</p>
      <pre style={codeStyle}><code>{`User-agent: *

# Block all URLs containing "?sort="
Disallow: /*?sort=

# Block all .pdf files
Disallow: /*.pdf$

# Block all URLs with query parameters
Disallow: /*?*

# Block all .json API responses
Disallow: /*.json$

# Block paths containing /temp/ anywhere
Disallow: /*/temp/

# Allow specific .xml files (sitemaps)
Allow: /*.xml$`}</code></pre>
      <div style={{ padding: 16, background: 'rgba(59,130,246,0.1)', borderRadius: 8, border: '1px solid rgba(59,130,246,0.3)', marginBottom: 24, marginTop: 16 }}>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7, margin: 0 }}>{ct.wildcardNote}</p>
      </div>

      {/* Section 4: Common Examples */}
      <h2 style={h2Style}>{ct.commonTitle}</h2>

      <p style={{ lineHeight: 1.8, color: 'var(--text-secondary)', marginBottom: 8, fontWeight: 600 }}>{ct.commonBlockAll}</p>
      <pre style={codeStyle}><code>{`User-agent: *
Disallow: /`}</code></pre>

      <p style={{ lineHeight: 1.8, color: 'var(--text-secondary)', marginBottom: 8, marginTop: 20, fontWeight: 600 }}>{ct.commonAllowAll}</p>
      <pre style={codeStyle}><code>{`User-agent: *
Disallow:`}</code></pre>

      <p style={{ lineHeight: 1.8, color: 'var(--text-secondary)', marginBottom: 8, marginTop: 20, fontWeight: 600 }}>{ct.commonBlockOne}</p>
      <pre style={codeStyle}><code>{`User-agent: AhrefsBot
Disallow: /

User-agent: SemrushBot
Disallow: /`}</code></pre>

      <p style={{ lineHeight: 1.8, color: 'var(--text-secondary)', marginBottom: 8, marginTop: 20, fontWeight: 600 }}>{ct.commonBlockDir}</p>
      <pre style={codeStyle}><code>{`User-agent: *
Disallow: /admin/
Disallow: /private/
Disallow: /staging/`}</code></pre>

      <p style={{ lineHeight: 1.8, color: 'var(--text-secondary)', marginBottom: 8, marginTop: 20, fontWeight: 600 }}>{ct.commonAllowOne}</p>
      <pre style={codeStyle}><code>{`User-agent: *
Disallow: /api/
Allow: /api/public/`}</code></pre>

      <p style={{ lineHeight: 1.8, color: 'var(--text-secondary)', marginBottom: 8, marginTop: 20, fontWeight: 600 }}>{ct.commonMultiple}</p>
      <pre style={codeStyle}><code>{`# Default rules for all crawlers
User-agent: *
Disallow: /admin/
Disallow: /private/

# Googlebot gets special access
User-agent: Googlebot
Disallow: /admin/
Allow: /private/google-partner/

# Block aggressive SEO bots entirely
User-agent: AhrefsBot
Disallow: /

User-agent: SemrushBot
Disallow: /

Sitemap: https://example.com/sitemap.xml`}</code></pre>

      {/* Section 5: WordPress */}
      <h2 style={h2Style}>{ct.wordpressTitle}</h2>
      <p style={{ lineHeight: 1.8, color: 'var(--text-secondary)', marginBottom: 16 }}>{ct.wordpressDesc}</p>
      <pre style={codeStyle}><code>{`User-agent: *
# Block WordPress admin and login
Disallow: /wp-admin/
Allow: /wp-admin/admin-ajax.php

# Block WordPress includes
Disallow: /wp-includes/

# Block XML-RPC (security best practice)
Disallow: /xmlrpc.php

# Block trackbacks and pingbacks
Disallow: /trackback/
Disallow: /*/trackback/

# Block comment feeds
Disallow: /*/feed/
Disallow: /*/comments/

# Block search results pages
Disallow: /?s=
Disallow: /search/

# Block author archives (optional)
Disallow: /author/

# Block tag pages with thin content (optional)
Disallow: /tag/

# Allow all media uploads
Allow: /wp-content/uploads/

Sitemap: https://example.com/sitemap_index.xml`}</code></pre>
      <div style={{ padding: 16, background: 'rgba(34,197,94,0.1)', borderRadius: 8, border: '1px solid rgba(34,197,94,0.3)', marginBottom: 24, marginTop: 16 }}>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7, margin: 0 }}>{ct.wordpressNote}</p>
      </div>

      {/* Section 6: Next.js / React SPA */}
      <h2 style={h2Style}>{ct.nextjsTitle}</h2>
      <p style={{ lineHeight: 1.8, color: 'var(--text-secondary)', marginBottom: 16 }}>{ct.nextjsDesc}</p>
      <pre style={codeStyle}><code>{`User-agent: *
# Block Next.js internal routes
Disallow: /_next/
Disallow: /api/

# Block internal utility pages
Disallow: /404
Disallow: /500

# Block query parameter variations
Disallow: /*?*

# Allow static assets that search engines need
Allow: /_next/static/
Allow: /_next/image/

# Allow public API endpoints (if any)
Allow: /api/public/

Sitemap: https://example.com/sitemap.xml`}</code></pre>
      <div style={{ padding: 16, background: 'rgba(59,130,246,0.1)', borderRadius: 8, border: '1px solid rgba(59,130,246,0.3)', marginBottom: 24, marginTop: 16 }}>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7, margin: 0 }}>{ct.nextjsNote}</p>
      </div>

      {/* Section 7: E-commerce */}
      <h2 style={h2Style}>{ct.ecommerceTitle}</h2>
      <p style={{ lineHeight: 1.8, color: 'var(--text-secondary)', marginBottom: 16 }}>{ct.ecommerceDesc}</p>
      <pre style={codeStyle}><code>{`User-agent: *
# Block user account pages
Disallow: /account/
Disallow: /my-account/
Disallow: /login/
Disallow: /register/
Disallow: /password-reset/

# Block checkout and cart
Disallow: /cart/
Disallow: /checkout/
Disallow: /order-confirmation/

# Block wishlist and compare
Disallow: /wishlist/
Disallow: /compare/

# Block internal search results
Disallow: /search/
Disallow: /*?q=
Disallow: /*?search=

# Block faceted navigation (duplicate content)
Disallow: /*?sort=
Disallow: /*?order=
Disallow: /*?filter=
Disallow: /*?color=
Disallow: /*?size=
Disallow: /*?price=
Disallow: /*?page=

# Block review/rating sort variations
Disallow: /*?rating=

# Allow product and category pages
Allow: /products/
Allow: /category/
Allow: /collections/

Sitemap: https://example.com/sitemap.xml`}</code></pre>
      <div style={{ padding: 16, background: 'rgba(245,158,11,0.1)', borderRadius: 8, border: '1px solid rgba(245,158,11,0.3)', marginBottom: 24, marginTop: 16 }}>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7, margin: 0 }}>{ct.ecommerceNote}</p>
      </div>

      {/* Section 8: Block AI Crawlers */}
      <h2 style={h2Style}>{ct.aiTitle}</h2>
      <p style={{ lineHeight: 1.8, color: 'var(--text-secondary)', marginBottom: 16 }}>{ct.aiDesc}</p>
      <p style={{ lineHeight: 1.8, color: 'var(--text-secondary)', marginBottom: 8, fontWeight: 600 }}>{ct.aiCrawlers}</p>
      <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, marginBottom: 16 }}>
        <li><code style={{ color: '#ef4444' }}>GPTBot</code> — {ct.aiCrawler1}</li>
        <li><code style={{ color: '#ef4444' }}>ChatGPT-User</code> — {ct.aiCrawler2}</li>
        <li><code style={{ color: '#3b82f6' }}>Google-Extended</code> — {ct.aiCrawler3}</li>
        <li><code style={{ color: '#8b5cf6' }}>anthropic-ai</code> — {ct.aiCrawler4}</li>
        <li><code style={{ color: '#8b5cf6' }}>ClaudeBot</code> — {ct.aiCrawler5}</li>
        <li><code style={{ color: '#f59e0b' }}>CCBot</code> — {ct.aiCrawler6}</li>
        <li><code style={{ color: '#06b6d4' }}>Bytespider</code> — {ct.aiCrawler7}</li>
        <li><code style={{ color: '#06b6d4' }}>Amazonbot</code> — {ct.aiCrawler8}</li>
      </ul>
      <pre style={codeStyle}><code>{`# Block all known AI training crawlers
User-agent: GPTBot
Disallow: /

User-agent: ChatGPT-User
Disallow: /

User-agent: Google-Extended
Disallow: /

User-agent: anthropic-ai
Disallow: /

User-agent: ClaudeBot
Disallow: /

User-agent: CCBot
Disallow: /

User-agent: Bytespider
Disallow: /

User-agent: Amazonbot
Disallow: /

# Still allow regular search engine crawlers
User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /

User-agent: *
Allow: /

Sitemap: https://example.com/sitemap.xml`}</code></pre>
      <div style={{ padding: 16, background: 'rgba(239,68,68,0.1)', borderRadius: 8, border: '1px solid rgba(239,68,68,0.3)', marginBottom: 24, marginTop: 16 }}>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7, margin: 0 }}>{ct.aiNote}</p>
      </div>

      {/* Section 9: Sitemap Directive */}
      <h2 style={h2Style}>{ct.sitemapTitle}</h2>
      <p style={{ lineHeight: 1.8, color: 'var(--text-secondary)', marginBottom: 16 }}>{ct.sitemapDesc}</p>
      <pre style={codeStyle}><code>{`# Single sitemap
Sitemap: https://example.com/sitemap.xml

# Multiple sitemaps
Sitemap: https://example.com/sitemap-pages.xml
Sitemap: https://example.com/sitemap-posts.xml
Sitemap: https://example.com/sitemap-products.xml

# Sitemap index file
Sitemap: https://example.com/sitemap_index.xml`}</code></pre>
      <p style={{ lineHeight: 1.8, color: 'var(--text-secondary)', marginBottom: 8, marginTop: 16, fontWeight: 600 }}>{ct.sitemapRules}</p>
      <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, marginBottom: 16 }}>
        <li>{ct.sitemapRule1}</li>
        <li>{ct.sitemapRule2}</li>
        <li>{ct.sitemapRule3}</li>
        <li>{ct.sitemapRule4}</li>
      </ul>
      <div style={{ padding: 16, background: 'rgba(34,197,94,0.1)', borderRadius: 8, border: '1px solid rgba(34,197,94,0.3)', marginBottom: 24 }}>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7, margin: 0 }}>{ct.sitemapBenefit}</p>
      </div>

      {/* Section 10: Testing & Validation */}
      <h2 style={h2Style}>{ct.testingTitle}</h2>
      <p style={{ lineHeight: 1.8, color: 'var(--text-secondary)', marginBottom: 16 }}>{ct.testingDesc}</p>
      <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, marginBottom: 16 }}>
        <li><strong>Google Search Console</strong> — {ct.testingMethod1}</li>
        <li><strong>curl</strong> — {ct.testingMethod2}</li>
        <li><strong>Online</strong> — {ct.testingMethod3}</li>
      </ul>
      <pre style={codeStyle}><code>{`# Check if robots.txt is accessible
curl -I https://example.com/robots.txt

# View the full content
curl https://example.com/robots.txt

# Check what Googlebot sees (simulate Googlebot)
curl -A "Googlebot" https://example.com/robots.txt

# Test a specific URL against robots.txt (Python)
pip install robotexclusionrulesparser
python -c "
import robotexclusionrulesparser as rerp
rp = rerp.RobotExclusionRulesParser()
rp.fetch('https://example.com/robots.txt')
print(rp.is_allowed('Googlebot', '/private/page'))
"`}</code></pre>
      <p style={{ lineHeight: 1.8, color: 'var(--text-secondary)', marginBottom: 8, marginTop: 20, fontWeight: 600 }}>{ct.testingMistakes}</p>
      <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, marginBottom: 24 }}>
        <li>{ct.testingMistake1}</li>
        <li>{ct.testingMistake2}</li>
        <li>{ct.testingMistake3}</li>
        <li>{ct.testingMistake4}</li>
        <li>{ct.testingMistake5}</li>
        <li>{ct.testingMistake6}</li>
      </ul>

      {/* Section 11: Comparison Table */}
      <h2 style={h2Style}>{ct.comparisonTitle}</h2>
      <p style={{ lineHeight: 1.8, color: 'var(--text-secondary)', marginBottom: 16 }}>{ct.comparisonDesc}</p>
      <div style={{ overflowX: 'auto', marginBottom: 16 }}>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>{ct.comparisonMethod}</th>
              <th style={thStyle}>{ct.comparisonScope}</th>
              <th style={thStyle}>{ct.comparisonLocation}</th>
              <th style={thStyle}>{ct.comparisonCrawl}</th>
              <th style={thStyle}>{ct.comparisonIndex}</th>
              <th style={thStyle}>{ct.comparisonGranularity}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ ...tdStyle, fontWeight: 700 }}>{ct.comparisonRobotsTxt}</td>
              <td style={tdStyle}>{ct.comparisonRobotsTxtScope}</td>
              <td style={tdStyle}>{ct.comparisonRobotsTxtLocation}</td>
              <td style={tdStyle}>{ct.comparisonRobotsTxtCrawl}</td>
              <td style={tdStyle}>{ct.comparisonRobotsTxtIndex}</td>
              <td style={tdStyle}>{ct.comparisonRobotsTxtGranularity}</td>
            </tr>
            <tr>
              <td style={{ ...tdStyle, fontWeight: 700 }}>{ct.comparisonMetaRobots}</td>
              <td style={tdStyle}>{ct.comparisonMetaRobotsScope}</td>
              <td style={tdStyle}>{ct.comparisonMetaRobotsLocation}</td>
              <td style={tdStyle}>{ct.comparisonMetaRobotsCrawl}</td>
              <td style={tdStyle}>{ct.comparisonMetaRobotsIndex}</td>
              <td style={tdStyle}>{ct.comparisonMetaRobotsGranularity}</td>
            </tr>
            <tr>
              <td style={{ ...tdStyle, fontWeight: 700 }}>{ct.comparisonXRobots}</td>
              <td style={tdStyle}>{ct.comparisonXRobotsScope}</td>
              <td style={tdStyle}>{ct.comparisonXRobotsLocation}</td>
              <td style={tdStyle}>{ct.comparisonXRobotsCrawl}</td>
              <td style={tdStyle}>{ct.comparisonXRobotsIndex}</td>
              <td style={tdStyle}>{ct.comparisonXRobotsGranularity}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div style={{ padding: 16, background: 'rgba(139,92,246,0.1)', borderRadius: 8, border: '1px solid rgba(139,92,246,0.3)', marginBottom: 24 }}>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7, margin: 0 }}>{ct.comparisonTip}</p>
      </div>

      {/* CTA: Related Tools */}
      <div style={{ padding: 20, background: 'linear-gradient(135deg, rgba(59,130,246,0.1), rgba(139,92,246,0.1))', borderRadius: 12, border: '1px solid rgba(59,130,246,0.3)', textAlign: 'center', marginBottom: 30 }}>
        <p style={{ fontSize: 16, fontWeight: 600, marginBottom: 12 }}>{ct.tryTool}</p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 20, flexWrap: 'wrap' }}>
          <Link href={`/${lang}/tools/robots-generator`} style={{ color: 'var(--accent-blue)', fontWeight: 700, fontSize: 15 }}>
            {ct.tryToolRobots} →
          </Link>
          <Link href={`/${lang}/tools/meta-tag-generator`} style={{ color: 'var(--accent-blue)', fontWeight: 700, fontSize: 15 }}>
            {ct.tryToolMeta} →
          </Link>
        </div>
      </div>

      {/* Section 12: FAQ */}
      <h2 style={h2Style}>FAQ</h2>
      {[
        [ct.faq1q, ct.faq1a], [ct.faq2q, ct.faq2a], [ct.faq3q, ct.faq3a], [ct.faq4q, ct.faq4a], [ct.faq5q, ct.faq5a],
      ].map(([q, a], i) => (
        <div key={i} style={{ marginBottom: 16, padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)' }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 8, color: 'var(--text-primary)' }}>{q}</h3>
          <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7, margin: 0 }}>{a}</p>
        </div>
      ))}
    </div>
  );
}
