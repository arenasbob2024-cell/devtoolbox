'use client';
import React from 'react';
import Link from 'next/link';

const translations: Record<string, Record<string, string>> = {
  en: {
    intro: 'The <strong>nginx location block</strong> is the most critical directive for controlling how Nginx processes incoming requests. It determines which configuration applies to a given URL, enabling you to route traffic, serve files, proxy to backends, and apply security rules with surgical precision. This comprehensive guide covers <strong>location block syntax, regex modifiers, matching priority, and 30+ production-ready examples</strong> you can copy and adapt immediately.',
    link_nginx: 'Generate Nginx configs with our Nginx Config Generator',
    link_regex: 'Test your regex patterns with our Regex Tester',

    h2_syntax: '1. Location Block Syntax',
    p_syntax: 'Every location block follows the same fundamental structure: the <code>location</code> keyword, an optional modifier, a pattern to match against the request URI, and a block of directives enclosed in curly braces. The modifier determines how Nginx interprets the pattern -- as a literal prefix, an exact match, or a regular expression.',

    h2_modifiers: '2. Location Modifiers Explained',
    p_modifiers: 'Nginx provides five ways to match request URIs in location blocks. Understanding these modifiers is the single most important concept for mastering Nginx configuration. Each modifier changes how the pattern is interpreted and affects the priority of the match.',
    mod_exact: '<strong><code>=</code> (Exact Match)</strong> -- Matches the URI exactly. No more, no less. This is the fastest match because Nginx stops searching immediately when it finds an exact match. Use it for specific paths like the homepage or health check endpoints.',
    mod_regex_cs: '<strong><code>~</code> (Regex, Case-Sensitive)</strong> -- Treats the pattern as a PCRE regular expression with case-sensitive matching. Use for file extension matching on case-sensitive filesystems (Linux).',
    mod_regex_ci: '<strong><code>~*</code> (Regex, Case-Insensitive)</strong> -- Treats the pattern as a PCRE regular expression with case-insensitive matching. Preferred for web URLs since clients may use any case.',
    mod_prefix_pri: '<strong><code>^~</code> (Prefix Priority)</strong> -- A prefix match that, if it matches, prevents Nginx from checking any regex location blocks. Use when you want a prefix match to always win over regex patterns.',
    mod_none: '<strong>(No Modifier / Prefix Match)</strong> -- The default behavior. Matches if the URI starts with the given string. However, regex locations can override this match if they also match the URI.',

    h2_priority: '3. Matching Priority Order',
    p_priority: 'When a request comes in, Nginx evaluates location blocks in a specific priority order -- NOT in the order they appear in the config file. Understanding this order prevents countless hours of debugging unexpected routing behavior.',
    priority_1: '<strong>Step 1: Exact match (<code>=</code>)</strong> -- Nginx first checks all exact match locations. If one matches, it is used immediately and all other searching stops.',
    priority_2: '<strong>Step 2: Prefix matches (no modifier and <code>^~</code>)</strong> -- Nginx checks all prefix locations and remembers the longest matching prefix. If the longest match has the <code>^~</code> modifier, it is used immediately and regex checking is skipped.',
    priority_3: '<strong>Step 3: Regex matches (<code>~</code> and <code>~*</code>)</strong> -- Nginx checks regex locations in the order they appear in the config file. The first regex that matches wins.',
    priority_4: '<strong>Step 4: Longest prefix fallback</strong> -- If no regex matched, the longest prefix match from Step 2 is used.',
    p_priority_tip: 'Key insight: The order of regex blocks in your config file matters, but the order of prefix blocks does not. Nginx always picks the longest prefix match regardless of order.',

    h2_regex: '4. Regex Patterns for Location Blocks',
    p_regex: 'PCRE (Perl Compatible Regular Expressions) patterns in Nginx location blocks let you match complex URL patterns. Here are the most commonly used patterns with explanations.',

    h2_try_files: '5. The try_files Directive',
    p_try_files: 'The <code>try_files</code> directive is one of the most used directives inside location blocks. It tells Nginx to check for files in a specific order and serve the first one found, or fall back to a named location or error code. This is essential for SPAs, static sites with pretty URLs, and hybrid static/dynamic setups.',

    h2_proxy: '6. Proxy Pass in Location Blocks',
    p_proxy: 'Using <code>proxy_pass</code> inside location blocks is the standard way to route specific URL paths to different backend applications. This is the foundation of microservice routing, API gateways, and backend separation.',

    h2_static: '7. Static File Serving',
    p_static: 'Nginx excels at serving static files. Understanding the difference between <code>root</code> and <code>alias</code>, and how to set proper cache headers, is essential for performance optimization.',

    h2_rewrite: '8. Rewrite Rules in Location Blocks',
    p_rewrite: 'The <code>rewrite</code> directive modifies the request URI using regex, while <code>return</code> sends an immediate response. Understanding when to use each, and the difference between <code>last</code>, <code>break</code>, <code>permanent</code>, and <code>redirect</code> flags, is critical for URL management.',

    h2_rate_limiting: '9. Rate Limiting with Location Blocks',
    p_rate_limiting: 'Rate limiting protects specific endpoints from abuse. By applying <code>limit_req</code> inside targeted location blocks, you can set different rate limits for login pages, API endpoints, and static assets.',

    h2_security: '10. Security Headers in Location Blocks',
    p_security: 'Adding security headers inside location blocks gives you granular control over which headers apply to which paths. This is important because APIs, static assets, and HTML pages often need different security policies.',

    h2_patterns: '11. Common Real-World Patterns',
    p_patterns: 'Here are complete, production-tested location block configurations for the most popular frameworks and deployment scenarios.',

    h2_debugging: '12. Debugging Location Blocks',
    p_debugging: 'When your location blocks do not behave as expected, these tools and techniques will help you identify the issue quickly.',

    h2_faq: 'Frequently Asked Questions',
    faq1_q: 'What is the difference between location = / and location / in Nginx?',
    faq1_a: '"location = /" matches ONLY the exact root path (/), nothing else. It is the fastest match. "location /" is a prefix match that matches every URI since all URIs start with /. It acts as the default catch-all location. In practice, use "location = /" for homepage-specific config and "location /" as the fallback for everything else.',
    faq2_q: 'Why does my regex location block not match? How does Nginx location priority work?',
    faq2_a: 'Nginx evaluates locations in this strict order: (1) exact match = stops immediately, (2) longest prefix match with ^~ stops immediately, (3) regex blocks ~ and ~* are checked in config file order and the first match wins, (4) if no regex matches, the longest prefix match is used. If your regex does not match, check if a ^~ prefix block is intercepting the request first, or if another regex appearing earlier in the file is matching instead.',
    faq3_q: 'What is the difference between root and alias in Nginx location blocks?',
    faq3_a: 'With "root", Nginx appends the full URI to the root path. So "location /images/ { root /data; }" serves /data/images/photo.jpg for the URI /images/photo.jpg. With "alias", Nginx replaces the matched location prefix with the alias path. So "location /images/ { alias /data/photos/; }" serves /data/photos/photo.jpg for the same URI. Use alias when the filesystem path does not mirror the URL structure.',
    faq4_q: 'How do I make Nginx location blocks work with a React or Next.js SPA?',
    faq4_a: 'For SPAs, you need try_files to fall back to index.html for client-side routing: "location / { try_files $uri $uri/ /index.html; }". For Next.js with a Node.js backend, proxy all requests: "location / { proxy_pass http://localhost:3000; }". For Next.js static export, use the SPA pattern. Add separate location blocks for API routes and static assets with appropriate caching headers.',
    faq5_q: 'Can I use multiple regex patterns in a single Nginx location block?',
    faq5_a: 'No, each location block takes exactly one pattern. However, you can use regex alternation (the | operator) within a single regex pattern to match multiple patterns: "location ~* \\.(jpg|png|gif|webp)$ { ... }". This matches any URI ending in .jpg, .png, .gif, or .webp. For completely different patterns, create separate location blocks.',

    p_conclusion: 'Mastering Nginx location blocks is the key to building fast, secure, and maintainable web server configurations. Start with exact and prefix matches for simple cases, use regex only when needed, and always test with "nginx -t" before reloading. Use the tools below to generate and test your configurations.',
    link_nginx_bottom: 'Generate Nginx configs with our Nginx Config Generator',
    link_regex_bottom: 'Test your regex patterns with our Regex Tester',

    col_modifier: 'Modifier',
    col_type: 'Type',
    col_description: 'Description',
    col_priority: 'Priority',
  },
  zh: {
    intro: '<strong>nginx location 块</strong>是控制 Nginx 处理传入请求的最关键指令。它决定哪个配置适用于给定的 URL，使你能够精确地路由流量、提供文件、代理到后端以及应用安全规则。本全面指南涵盖了 <strong>location 块语法、正则修饰符、匹配优先级以及 30+ 个生产可用的示例</strong>，你可以立即复制和使用。',
    link_nginx: '使用我们的 Nginx 配置生成器生成 Nginx 配置',
    link_regex: '使用我们的正则测试器测试你的正则表达式',

    h2_syntax: '1. Location 块语法',
    p_syntax: '每个 location 块遵循相同的基本结构：<code>location</code> 关键字、可选的修饰符、用于匹配请求 URI 的模式，以及用花括号包围的指令块。修饰符决定了 Nginx 如何解释模式——作为字面前缀、精确匹配还是正则表达式。',

    h2_modifiers: '2. Location 修饰符详解',
    p_modifiers: 'Nginx 提供了五种匹配请求 URI 的方式。理解这些修饰符是掌握 Nginx 配置最重要的概念。每个修饰符改变了模式的解释方式，并影响匹配的优先级。',
    mod_exact: '<strong><code>=</code>（精确匹配）</strong>——完全匹配 URI，不多不少。这是最快的匹配方式，因为 Nginx 找到精确匹配后会立即停止搜索。用于特定路径，如首页或健康检查端点。',
    mod_regex_cs: '<strong><code>~</code>（正则，区分大小写）</strong>——将模式视为 PCRE 正则表达式，区分大小写。用于在区分大小写的文件系统（Linux）上匹配文件扩展名。',
    mod_regex_ci: '<strong><code>~*</code>（正则，不区分大小写）</strong>——将模式视为 PCRE 正则表达式，不区分大小写。由于客户端可能使用任何大小写，Web URL 推荐使用此修饰符。',
    mod_prefix_pri: '<strong><code>^~</code>（前缀优先）</strong>——前缀匹配，如果匹配成功，则阻止 Nginx 检查任何正则 location 块。当你希望前缀匹配始终优先于正则模式时使用。',
    mod_none: '<strong>（无修饰符 / 前缀匹配）</strong>——默认行为。如果 URI 以给定字符串开头则匹配。但如果正则 location 也匹配该 URI，则正则 location 可以覆盖此匹配。',

    h2_priority: '3. 匹配优先级顺序',
    p_priority: '当请求到达时，Nginx 按特定的优先级顺序评估 location 块——而不是按它们在配置文件中出现的顺序。理解此顺序可以避免无数小时的调试意外路由行为。',
    priority_1: '<strong>第一步：精确匹配（<code>=</code>）</strong>——Nginx 首先检查所有精确匹配 location。如果有匹配，立即使用并停止所有其他搜索。',
    priority_2: '<strong>第二步：前缀匹配（无修饰符和 <code>^~</code>）</strong>——Nginx 检查所有前缀 location 并记住最长匹配的前缀。如果最长匹配具有 <code>^~</code> 修饰符，则立即使用并跳过正则检查。',
    priority_3: '<strong>第三步：正则匹配（<code>~</code> 和 <code>~*</code>）</strong>——Nginx 按配置文件中出现的顺序检查正则 location。第一个匹配的正则获胜。',
    priority_4: '<strong>第四步：最长前缀回退</strong>——如果没有正则匹配，则使用第二步中最长的前缀匹配。',
    p_priority_tip: '关键洞察：配置文件中正则块的顺序很重要，但前缀块的顺序不重要。Nginx 总是选择最长的前缀匹配，无论顺序如何。',

    h2_regex: '4. Location 块的正则表达式模式',
    p_regex: 'Nginx location 块中的 PCRE（Perl 兼容正则表达式）模式让你可以匹配复杂的 URL 模式。以下是最常用的模式及其说明。',

    h2_try_files: '5. try_files 指令',
    p_try_files: '<code>try_files</code> 指令是 location 块内最常用的指令之一。它告诉 Nginx 按特定顺序检查文件并提供找到的第一个文件，或回退到命名 location 或错误代码。这对于 SPA、带漂亮 URL 的静态站点以及混合静态/动态设置至关重要。',

    h2_proxy: '6. Location 块中的 Proxy Pass',
    p_proxy: '在 location 块中使用 <code>proxy_pass</code> 是将特定 URL 路径路由到不同后端应用的标准方式。这是微服务路由、API 网关和后端分离的基础。',

    h2_static: '7. 静态文件服务',
    p_static: 'Nginx 擅长提供静态文件。理解 <code>root</code> 和 <code>alias</code> 的区别，以及如何设置正确的缓存头，对于性能优化至关重要。',

    h2_rewrite: '8. Location 块中的重写规则',
    p_rewrite: '<code>rewrite</code> 指令使用正则修改请求 URI，而 <code>return</code> 发送即时响应。理解何时使用每个指令，以及 <code>last</code>、<code>break</code>、<code>permanent</code> 和 <code>redirect</code> 标志之间的区别，对于 URL 管理至关重要。',

    h2_rate_limiting: '9. 使用 Location 块进行速率限制',
    p_rate_limiting: '速率限制保护特定端点免受滥用。通过在目标 location 块内应用 <code>limit_req</code>，你可以为登录页面、API 端点和静态资源设置不同的速率限制。',

    h2_security: '10. Location 块中的安全头',
    p_security: '在 location 块中添加安全头让你可以精细控制哪些头应用于哪些路径。这很重要，因为 API、静态资源和 HTML 页面通常需要不同的安全策略。',

    h2_patterns: '11. 常见实际应用模式',
    p_patterns: '以下是针对最流行框架和部署场景的完整、经过生产测试的 location 块配置。',

    h2_debugging: '12. 调试 Location 块',
    p_debugging: '当你的 location 块行为不符合预期时，以下工具和技术将帮助你快速识别问题。',

    h2_faq: '常见问题',
    faq1_q: 'Nginx 中 location = / 和 location / 有什么区别？',
    faq1_a: '"location = /" 仅匹配精确的根路径（/），不匹配其他任何内容。这是最快的匹配。"location /" 是前缀匹配，匹配所有 URI，因为所有 URI 都以 / 开头。它充当默认的全部捕获 location。实际使用中，"location = /" 用于首页特定配置，"location /" 用作其他所有内容的回退。',
    faq2_q: '为什么我的正则 location 块不匹配？Nginx location 优先级如何工作？',
    faq2_a: 'Nginx 按以下严格顺序评估 location：(1) 精确匹配 = 立即停止，(2) 带 ^~ 的最长前缀匹配立即停止，(3) 正则块 ~ 和 ~* 按配置文件顺序检查，第一个匹配获胜，(4) 如果没有正则匹配，使用最长的前缀匹配。如果你的正则不匹配，检查是否有 ^~ 前缀块先拦截了请求，或者文件中更早出现的另一个正则是否匹配了。',
    faq3_q: 'Nginx location 块中 root 和 alias 有什么区别？',
    faq3_a: '使用 "root" 时，Nginx 将完整 URI 附加到 root 路径。因此 "location /images/ { root /data; }" 对于 URI /images/photo.jpg 提供 /data/images/photo.jpg。使用 "alias" 时，Nginx 用 alias 路径替换匹配的 location 前缀。因此 "location /images/ { alias /data/photos/; }" 对于相同的 URI 提供 /data/photos/photo.jpg。当文件系统路径不反映 URL 结构时使用 alias。',
    faq4_q: '如何让 Nginx location 块与 React 或 Next.js SPA 配合工作？',
    faq4_a: '对于 SPA，你需要 try_files 回退到 index.html 以支持客户端路由："location / { try_files $uri $uri/ /index.html; }"。对于带 Node.js 后端的 Next.js，代理所有请求："location / { proxy_pass http://localhost:3000; }"。对于 Next.js 静态导出，使用 SPA 模式。为 API 路由和静态资源添加单独的 location 块并设置适当的缓存头。',
    faq5_q: '我可以在一个 Nginx location 块中使用多个正则模式吗？',
    faq5_a: '不可以，每个 location 块只接受一个模式。但你可以在单个正则模式中使用正则交替（| 运算符）来匹配多个模式："location ~* \\.(jpg|png|gif|webp)$ { ... }"。这匹配以 .jpg、.png、.gif 或 .webp 结尾的任何 URI。对于完全不同的模式，创建单独的 location 块。',

    p_conclusion: '掌握 Nginx location 块是构建快速、安全、可维护的 Web 服务器配置的关键。简单场景使用精确匹配和前缀匹配，仅在需要时使用正则，重载前始终用 "nginx -t" 测试。使用下方工具生成和测试你的配置。',
    link_nginx_bottom: '使用 Nginx 配置生成器生成配置',
    link_regex_bottom: '使用正则测试器测试你的正则表达式',

    col_modifier: '修饰符',
    col_type: '类型',
    col_description: '说明',
    col_priority: '优先级',
  },
};

/* -- shared styles ------------------------------------------------- */
const codeBlockStyle: React.CSSProperties = {
  background: 'var(--bg-input)',
  border: '1px solid var(--border-color)',
  borderRadius: 8,
  padding: '16px 20px',
  overflowX: 'auto',
  fontSize: 13,
  lineHeight: 1.6,
  fontFamily: '"Fira Code", "JetBrains Mono", "Cascadia Code", Consolas, monospace',
  color: 'var(--text-primary)',
  margin: '12px 0 24px',
};

const tableStyle: React.CSSProperties = {
  width: '100%',
  borderCollapse: 'collapse',
  margin: '12px 0 24px',
  fontSize: 14,
};

const thStyle: React.CSSProperties = {
  textAlign: 'left',
  padding: '10px 14px',
  borderBottom: '2px solid var(--border-color)',
  color: 'var(--text-primary)',
  fontWeight: 600,
  background: 'var(--bg-input)',
};

const tdStyle: React.CSSProperties = {
  padding: '10px 14px',
  borderBottom: '1px solid var(--border-color)',
  color: 'var(--text-secondary)',
  verticalAlign: 'top',
};

const codeTdStyle: React.CSSProperties = {
  ...tdStyle,
  fontFamily: '"Fira Code", "JetBrains Mono", Consolas, monospace',
  fontSize: 13,
  color: 'var(--accent-blue)',
};

const sectionStyle: React.CSSProperties = {
  margin: '32px 0',
};

const linkStyle: React.CSSProperties = {
  color: 'var(--accent-blue)',
  fontWeight: 600,
  textDecoration: 'none',
};

/* -- component ----------------------------------------------------- */
export default function NginxLocationBlockRegexGuide({ lang }: { lang: string }) {
  const s = translations[lang] || translations['en'];

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: s.faq1_q, acceptedAnswer: { '@type': 'Answer', text: s.faq1_a } },
      { '@type': 'Question', name: s.faq2_q, acceptedAnswer: { '@type': 'Answer', text: s.faq2_a } },
      { '@type': 'Question', name: s.faq3_q, acceptedAnswer: { '@type': 'Answer', text: s.faq3_a } },
      { '@type': 'Question', name: s.faq4_q, acceptedAnswer: { '@type': 'Answer', text: s.faq4_a } },
      { '@type': 'Question', name: s.faq5_q, acceptedAnswer: { '@type': 'Answer', text: s.faq5_a } },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* -- Intro --------------------------------------------------- */}
      <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: 16 }} dangerouslySetInnerHTML={{ __html: s.intro }} />

      <div style={{ margin: '16px 0 24px', display: 'flex', flexDirection: 'column', gap: 8 }}>
        <Link href={`/${lang}/tools/nginx-config`} style={linkStyle}>{s.link_nginx} &rarr;</Link>
        <Link href={`/${lang}/tools/regex-tester`} style={linkStyle}>{s.link_regex} &rarr;</Link>
      </div>

      {/* -- 1. Location Block Syntax -------------------------------- */}
      <div style={sectionStyle}>
        <h2 style={{ color: 'var(--text-primary)' }}>{s.h2_syntax}</h2>
        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }} dangerouslySetInnerHTML={{ __html: s.p_syntax }} />

        <pre style={codeBlockStyle}><code>{`# Location block syntax
# location [modifier] pattern { directives; }

# 1. Exact match -- highest priority
location = /api/health {
    return 200 "OK";
    add_header Content-Type text/plain;
}

# 2. Prefix priority -- stops regex evaluation
location ^~ /static/ {
    root /var/www;
    expires 30d;
}

# 3. Case-sensitive regex
location ~ \\.php$ {
    fastcgi_pass unix:/run/php/php-fpm.sock;
}

# 4. Case-insensitive regex
location ~* \\.(jpg|jpeg|png|gif|ico|svg|webp)$ {
    expires 365d;
    add_header Cache-Control "public, immutable";
}

# 5. Standard prefix (no modifier)
location /api/ {
    proxy_pass http://backend;
}

# 6. Default catch-all
location / {
    try_files $uri $uri/ /index.html;
}`}</code></pre>
      </div>

      {/* -- 2. Modifiers --------------------------------------------- */}
      <div style={sectionStyle}>
        <h2 style={{ color: 'var(--text-primary)' }}>{s.h2_modifiers}</h2>
        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>{s.p_modifiers}</p>

        <div style={{ overflowX: 'auto' }}>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>{s.col_modifier}</th>
                <th style={thStyle}>{s.col_type}</th>
                <th style={thStyle}>{s.col_description}</th>
                <th style={thStyle}>{s.col_priority}</th>
              </tr>
            </thead>
            <tbody>
              <tr><td style={codeTdStyle}>=</td><td style={tdStyle}>Exact</td><td style={tdStyle}>Exact URI match, stops immediately</td><td style={tdStyle}>1 (highest)</td></tr>
              <tr><td style={codeTdStyle}>^~</td><td style={tdStyle}>Prefix priority</td><td style={tdStyle}>Prefix match, skips regex if matched</td><td style={tdStyle}>2</td></tr>
              <tr><td style={codeTdStyle}>~</td><td style={tdStyle}>Regex (case-sensitive)</td><td style={tdStyle}>PCRE regex, first match in file order wins</td><td style={tdStyle}>3</td></tr>
              <tr><td style={codeTdStyle}>~*</td><td style={tdStyle}>Regex (case-insensitive)</td><td style={tdStyle}>PCRE regex, case-insensitive</td><td style={tdStyle}>3</td></tr>
              <tr><td style={codeTdStyle}>(none)</td><td style={tdStyle}>Prefix</td><td style={tdStyle}>Longest prefix match, can be overridden by regex</td><td style={tdStyle}>4 (lowest)</td></tr>
            </tbody>
          </table>
        </div>

        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }} dangerouslySetInnerHTML={{ __html: s.mod_exact }} />
        <pre style={codeBlockStyle}><code>{`# Exact match: only matches /login, not /login/ or /login?next=/
location = /login {
    proxy_pass http://auth-service:3000;
}

# Exact match for homepage -- fastest possible match
location = / {
    proxy_pass http://homepage-service:3000;
}`}</code></pre>

        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }} dangerouslySetInnerHTML={{ __html: s.mod_regex_cs }} />
        <pre style={codeBlockStyle}><code>{`# Case-sensitive regex: matches .php files
location ~ \\.php$ {
    include fastcgi_params;
    fastcgi_pass unix:/run/php/php-fpm.sock;
    fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
}

# Case-sensitive: matches /API/ but not /api/
location ~ ^/API/ {
    proxy_pass http://legacy-api:8080;
}`}</code></pre>

        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }} dangerouslySetInnerHTML={{ __html: s.mod_regex_ci }} />
        <pre style={codeBlockStyle}><code>{`# Case-insensitive regex: matches .JPG, .jpg, .Jpg, etc.
location ~* \\.(jpg|jpeg|png|gif|ico|svg|webp|avif)$ {
    root /var/www/static;
    expires 365d;
    add_header Cache-Control "public, immutable";
    access_log off;
}`}</code></pre>

        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }} dangerouslySetInnerHTML={{ __html: s.mod_prefix_pri }} />
        <pre style={codeBlockStyle}><code>{`# ^~ prefix priority: even if a regex matches /static/..., this wins
location ^~ /static/ {
    alias /var/www/app/static/;
    expires 30d;
    add_header Cache-Control "public";
}

# This regex will NOT override ^~ /static/ above
location ~* \\.(css|js)$ {
    expires 7d;
}`}</code></pre>

        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }} dangerouslySetInnerHTML={{ __html: s.mod_none }} />
        <pre style={codeBlockStyle}><code>{`# Prefix match (no modifier): matches /api/users, /api/orders, etc.
# But can be overridden by a regex location
location /api/ {
    proxy_pass http://api-backend:4000;
    proxy_set_header Host $host;
}

# This regex WILL override the prefix match above for .json requests
location ~* \\.json$ {
    add_header Content-Type application/json;
    try_files $uri =404;
}`}</code></pre>
      </div>

      {/* -- 3. Matching Priority ------------------------------------- */}
      <div style={sectionStyle}>
        <h2 style={{ color: 'var(--text-primary)' }}>{s.h2_priority}</h2>
        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>{s.p_priority}</p>

        <div style={{ margin: '16px 0', padding: '20px', background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)' }}>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, margin: '0 0 8px' }} dangerouslySetInnerHTML={{ __html: s.priority_1 }} />
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, margin: '0 0 8px' }} dangerouslySetInnerHTML={{ __html: s.priority_2 }} />
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, margin: '0 0 8px' }} dangerouslySetInnerHTML={{ __html: s.priority_3 }} />
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, margin: '0 0 8px' }} dangerouslySetInnerHTML={{ __html: s.priority_4 }} />
        </div>

        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontStyle: 'italic' }}>{s.p_priority_tip}</p>

        <pre style={codeBlockStyle}><code>{`# Priority demonstration -- request: GET /static/logo.png
# Nginx evaluates in this order:

# Step 1: Check exact matches
location = /static/logo.png { }       # Match? YES -> Use this, STOP
location = /index.html { }            # Not checked (already matched above)

# Step 2: If no exact match, check all prefix locations
location /static/ { }                 # Prefix matches (8 chars)
location /static/logo { }             # Prefix matches (12 chars) -- LONGEST
location ^~ /static/ { }              # If this existed, regex would be skipped

# Step 3: Check regex locations (in config file order)
location ~* \\.(png|jpg)$ { }          # Regex matches -> Use this, STOP
location ~* /static/.* { }            # Not checked (first regex already matched)

# Step 4: If no regex matched, use longest prefix from Step 2
# In this case: location /static/logo { }

# ---- Complete example showing priority ----
server {
    listen 80;
    server_name example.com;

    # Priority 1: Exact match (checked first)
    location = / {
        # Only matches GET /
        return 200 "Homepage";
    }

    # Priority 2: ^~ prefix (blocks regex override)
    location ^~ /assets/ {
        # All /assets/* requests come here, no regex can override
        root /var/www;
        expires 30d;
    }

    # Priority 3: Regex (checked in order, first match wins)
    location ~* \\.(css|js)$ {
        # Matches .css and .js files (except under /assets/)
        expires 7d;
    }

    location ~ /api/v[0-9]+/ {
        # Matches /api/v1/, /api/v2/, etc.
        proxy_pass http://api-backend;
    }

    # Priority 4: Longest prefix (fallback if no regex matches)
    location /api/ {
        proxy_pass http://default-backend;
    }

    location / {
        # Default catch-all (shortest prefix, lowest priority)
        try_files $uri $uri/ /index.html;
    }
}`}</code></pre>
      </div>

      {/* -- 4. Regex Patterns ---------------------------------------- */}
      <div style={sectionStyle}>
        <h2 style={{ color: 'var(--text-primary)' }}>{s.h2_regex}</h2>
        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>{s.p_regex}</p>

        <pre style={codeBlockStyle}><code>{`# ---- File Extension Patterns ----

# Match image files
location ~* \\.(jpg|jpeg|png|gif|ico|svg|webp|avif|bmp|tiff)$ {
    expires 365d;
    add_header Cache-Control "public, immutable";
}

# Match web font files
location ~* \\.(woff|woff2|ttf|eot|otf)$ {
    expires 365d;
    add_header Access-Control-Allow-Origin "*";
}

# Match CSS and JavaScript bundles (usually have hash in filename)
location ~* \\.(css|js)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}

# Match source maps (block in production)
location ~* \\.map$ {
    deny all;
    return 404;
}

# ---- Path-Based Patterns ----

# Match versioned API paths: /api/v1/, /api/v2/, /api/v10/
location ~ ^/api/v[0-9]+/ {
    proxy_pass http://api-backend;
}

# Match UUID in URL: /users/550e8400-e29b-41d4-a716-446655440000
location ~ ^/users/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$ {
    proxy_pass http://user-service;
}

# Match numeric IDs: /products/12345
location ~ ^/products/[0-9]+$ {
    proxy_pass http://product-service;
}

# Match language prefixes: /en/, /fr/, /zh/, /ja/
location ~ ^/(en|fr|de|es|zh|ja|ko)/ {
    try_files $uri $uri/ /index.html;
}

# ---- Negative Patterns (deny specific paths) ----

# Block access to hidden files (.git, .env, .htaccess)
location ~ /\\. {
    deny all;
    access_log off;
    log_not_found off;
}

# Block access to backup files
location ~* \\.(bak|old|orig|save|swp|swo)$ {
    deny all;
    return 404;
}

# Block access to configuration files
location ~* /(wp-config|config|configuration)\\.php$ {
    deny all;
}

# ---- Query String Matching (using if inside location) ----

# Note: location blocks match URI path only, not query strings.
# Use "if" for query string matching (use sparingly).
location /search {
    # Redirect old search format to new format
    if ($arg_q = "") {
        return 301 /;
    }
    proxy_pass http://search-service;
}`}</code></pre>
      </div>

      {/* -- 5. try_files --------------------------------------------- */}
      <div style={sectionStyle}>
        <h2 style={{ color: 'var(--text-primary)' }}>{s.h2_try_files}</h2>
        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }} dangerouslySetInnerHTML={{ __html: s.p_try_files }} />

        <pre style={codeBlockStyle}><code>{`# ---- try_files syntax ----
# try_files file1 file2 ... fallback;
# Tests each file path in order, serves the first one that exists.
# The last argument is special: it can be a URI (internal redirect)
# or an error code (=404, =500).

# ---- SPA Fallback (React, Vue, Angular) ----
location / {
    root /var/www/app/dist;
    # Try the exact file -> try as directory -> fall back to index.html
    try_files $uri $uri/ /index.html;
}

# ---- Static Site with Pretty URLs ----
location / {
    root /var/www/blog;
    # Try exact file -> try .html extension -> try as directory -> 404
    try_files $uri $uri.html $uri/ =404;
}

# ---- Static Files + Dynamic Backend ----
location / {
    root /var/www/static;
    # Try static file first, then proxy to backend
    try_files $uri $uri/ @backend;
}

# Named location for backend proxy
location @backend {
    proxy_pass http://127.0.0.1:3000;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
}

# ---- Maintenance Mode ----
location / {
    root /var/www;
    # If maintenance.html exists, serve it for all requests
    try_files /maintenance.html $uri $uri/ /index.html;
}

# ---- Multi-language SPA ----
location / {
    root /var/www/app;
    # Try language-specific file, then default, then SPA fallback
    try_files $uri $uri/ /$1/index.html /index.html;
}

# ---- try_files with PHP-FPM ----
location / {
    root /var/www/html;
    index index.php index.html;
    try_files $uri $uri/ /index.php?$query_string;
}

location ~ \\.php$ {
    root /var/www/html;
    fastcgi_pass unix:/run/php/php-fpm.sock;
    fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
    include fastcgi_params;
}`}</code></pre>
      </div>

      {/* -- 6. Proxy Pass -------------------------------------------- */}
      <div style={sectionStyle}>
        <h2 style={{ color: 'var(--text-primary)' }}>{s.h2_proxy}</h2>
        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }} dangerouslySetInnerHTML={{ __html: s.p_proxy }} />

        <pre style={codeBlockStyle}><code>{`# ---- Basic Proxy Pass ----
location /api/ {
    proxy_pass http://127.0.0.1:4000;
    # IMPORTANT: trailing slash behavior
    # proxy_pass http://127.0.0.1:4000;   -> /api/users -> /api/users
    # proxy_pass http://127.0.0.1:4000/;  -> /api/users -> /users (strips /api)
}

# ---- Strip Path Prefix ----
# Request: /api/v1/users -> Backend receives: /users
location /api/v1/ {
    proxy_pass http://backend-v1/;     # Note the trailing slash!
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
}

# ---- Upstream Block (Load Balancing) ----
upstream api_cluster {
    least_conn;                         # Send to server with fewest connections
    server 10.0.0.1:4000 weight=5;
    server 10.0.0.2:4000 weight=3;
    server 10.0.0.3:4000 backup;        # Only used when others are down

    keepalive 32;                        # Keep connections alive to backends
}

location /api/ {
    proxy_pass http://api_cluster;
    proxy_http_version 1.1;
    proxy_set_header Connection "";      # Required for keepalive

    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;

    # Timeouts
    proxy_connect_timeout 5s;
    proxy_send_timeout 30s;
    proxy_read_timeout 30s;

    # Retry on failure
    proxy_next_upstream error timeout http_502 http_503;
    proxy_next_upstream_tries 3;
}

# ---- WebSocket Proxy ----
location /ws/ {
    proxy_pass http://127.0.0.1:8080;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";
    proxy_set_header Host $host;
    proxy_read_timeout 86400s;           # Keep WebSocket alive for 24h
    proxy_send_timeout 86400s;
}

# ---- Microservice Routing ----
location /auth/ {
    proxy_pass http://auth-service:3001/;
}

location /users/ {
    proxy_pass http://user-service:3002/;
}

location /orders/ {
    proxy_pass http://order-service:3003/;
}

location /payments/ {
    proxy_pass http://payment-service:3004/;
}`}</code></pre>
      </div>

      {/* -- 7. Static File Serving ----------------------------------- */}
      <div style={sectionStyle}>
        <h2 style={{ color: 'var(--text-primary)' }}>{s.h2_static}</h2>
        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }} dangerouslySetInnerHTML={{ __html: s.p_static }} />

        <pre style={codeBlockStyle}><code>{`# ---- root vs alias ----

# ROOT: appends full URI to the root path
# Request: /images/photo.jpg -> File: /var/www/images/photo.jpg
location /images/ {
    root /var/www;
    # Nginx looks for: /var/www + /images/photo.jpg
}

# ALIAS: replaces the matched prefix with the alias path
# Request: /images/photo.jpg -> File: /data/photos/photo.jpg
location /images/ {
    alias /data/photos/;
    # Nginx looks for: /data/photos/ + photo.jpg
    # IMPORTANT: alias path MUST end with / when location ends with /
}

# ---- Autoindex (Directory Listing) ----
location /downloads/ {
    alias /var/www/files/;
    autoindex on;
    autoindex_exact_size off;           # Show human-readable sizes (KB, MB)
    autoindex_localtime on;             # Show local time instead of UTC
    autoindex_format html;              # html, xml, json, or jsonp
}

# ---- Cache Headers for Static Assets ----
# Hashed filenames (e.g., app.a1b2c3.js) -- cache forever
location ~* \\.[0-9a-f]{8,}\\.(css|js)$ {
    root /var/www/app;
    expires max;
    add_header Cache-Control "public, immutable";
    access_log off;
}

# Regular static assets -- cache for 30 days
location ~* \\.(jpg|jpeg|png|gif|ico|svg|webp|avif)$ {
    root /var/www/app;
    expires 30d;
    add_header Cache-Control "public";
    access_log off;
}

# Web fonts -- cache for 1 year, allow cross-origin
location ~* \\.(woff|woff2|ttf|eot|otf)$ {
    root /var/www/app;
    expires 1y;
    add_header Cache-Control "public, immutable";
    add_header Access-Control-Allow-Origin "*";
    access_log off;
}

# HTML files -- short cache, always revalidate
location ~* \\.html$ {
    root /var/www/app;
    expires 1h;
    add_header Cache-Control "public, must-revalidate";
}

# ---- Serving Pre-compressed Files ----
location /assets/ {
    root /var/www;

    # Try serving .br (Brotli) first, then .gz (Gzip), then original
    gzip_static on;                      # Serve .gz if it exists
    # brotli_static on;                  # Requires ngx_brotli module

    expires 1y;
    add_header Cache-Control "public, immutable";
}`}</code></pre>
      </div>

      {/* -- 8. Rewrite Rules ----------------------------------------- */}
      <div style={sectionStyle}>
        <h2 style={{ color: 'var(--text-primary)' }}>{s.h2_rewrite}</h2>
        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }} dangerouslySetInnerHTML={{ __html: s.p_rewrite }} />

        <pre style={codeBlockStyle}><code>{`# ---- return vs rewrite ----
# RETURN: simple, fast, sends immediate response (preferred when possible)
# REWRITE: regex-based URI modification, more powerful but slower

# ---- return examples ----
# 301 Permanent redirect (SEO-friendly, browsers cache this)
location = /old-page {
    return 301 /new-page;
}

# 302 Temporary redirect (not cached by browsers)
location = /promo {
    return 302 /summer-sale;
}

# Redirect HTTP to HTTPS
server {
    listen 80;
    server_name example.com;
    return 301 https://$server_name$request_uri;
}

# Redirect www to non-www
server {
    listen 443 ssl;
    server_name www.example.com;
    return 301 https://example.com$request_uri;
}

# Return a custom response body
location /api/maintenance {
    return 503 '{"status":"maintenance","retry_after":3600}';
    add_header Content-Type application/json;
    add_header Retry-After 3600;
}

# ---- rewrite examples ----
# Syntax: rewrite regex replacement [flag];
# Flags: last | break | redirect (302) | permanent (301)

# Rewrite: /blog/2024/my-post -> /posts?year=2024&slug=my-post
location /blog/ {
    rewrite ^/blog/([0-9]{4})/(.+)$ /posts?year=$1&slug=$2 last;
}

# Remove trailing slashes
location ~ ^(.+)/$ {
    rewrite ^(.+)/$ $1 permanent;
}

# Add trailing slashes to directories
location ~ ^/[^.]*[^/]$ {
    rewrite ^(.*)$ $1/ permanent;
}

# Clean URLs: /about -> /about.html
location / {
    rewrite ^/([^.]+)$ /$1.html last;
}

# ---- last vs break ----
# last:  stops current rewrite, restarts location matching with new URI
# break: stops current rewrite, continues processing in current location

# Example demonstrating the difference:
location /download/ {
    # 'last' restarts location search -- may match a different location
    rewrite ^/download/(.*)$ /files/$1 last;
}

location /internal/ {
    # 'break' stays in this location block
    rewrite ^/internal/(.*)$ /private/$1 break;
    root /var/www;
    # Serves /var/www/private/...
}`}</code></pre>
      </div>

      {/* -- 9. Rate Limiting ----------------------------------------- */}
      <div style={sectionStyle}>
        <h2 style={{ color: 'var(--text-primary)' }}>{s.h2_rate_limiting}</h2>
        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }} dangerouslySetInnerHTML={{ __html: s.p_rate_limiting }} />

        <pre style={codeBlockStyle}><code>{`# ---- Define rate limit zones (in http {} block) ----

# General pages: 10 requests/second per IP
limit_req_zone $binary_remote_addr zone=general:10m rate=10r/s;

# Login/auth endpoints: 5 requests/minute per IP (strict)
limit_req_zone $binary_remote_addr zone=auth:10m rate=5r/m;

# API endpoints: 30 requests/second per IP
limit_req_zone $binary_remote_addr zone=api:10m rate=30r/s;

# File uploads: 2 requests/second per IP
limit_req_zone $binary_remote_addr zone=upload:10m rate=2r/s;

# ---- Apply rate limits in location blocks ----

server {
    listen 80;
    server_name app.example.com;

    # Custom 429 error response
    error_page 429 = @rate_limited;
    location @rate_limited {
        default_type application/json;
        return 429 '{"error":"rate_limit_exceeded","message":"Too many requests. Please retry later.","retry_after":60}';
    }

    # General pages with generous burst
    location / {
        limit_req zone=general burst=20 nodelay;
        limit_req_status 429;
        proxy_pass http://frontend:3000;
    }

    # Strict rate limiting for auth endpoints
    location /api/auth/ {
        limit_req zone=auth burst=3 nodelay;
        limit_req_status 429;
        proxy_pass http://auth-service:4000;
    }

    # API with moderate burst
    location /api/ {
        limit_req zone=api burst=50 nodelay;
        limit_req_status 429;
        proxy_pass http://api-service:4000;
    }

    # Upload endpoint with strict limits
    location /api/upload {
        limit_req zone=upload burst=5;     # No nodelay: excess requests are delayed
        limit_req_status 429;
        client_max_body_size 100M;
        proxy_pass http://upload-service:4000;
    }

    # No rate limiting for static assets
    location ~* \\.(css|js|jpg|png|gif|ico|svg|woff2)$ {
        # No limit_req here -- static assets should always be fast
        root /var/www/static;
        expires 30d;
        access_log off;
    }

    # burst vs nodelay explained:
    # burst=20 nodelay  -> Accept 20 extra requests instantly, reject beyond that
    # burst=20          -> Accept 20 extra requests but delay them to match the rate
    # burst=20 delay=10 -> First 10 excess processed immediately, rest delayed
}`}</code></pre>
      </div>

      {/* -- 10. Security Headers ------------------------------------- */}
      <div style={sectionStyle}>
        <h2 style={{ color: 'var(--text-primary)' }}>{s.h2_security}</h2>
        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>{s.p_security}</p>

        <pre style={codeBlockStyle}><code>{`# ---- Security headers for HTML pages ----
location / {
    proxy_pass http://frontend:3000;

    # Prevent clickjacking
    add_header X-Frame-Options "SAMEORIGIN" always;

    # Block MIME-type sniffing
    add_header X-Content-Type-Options "nosniff" always;

    # Control referrer information
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;

    # Content Security Policy (customize per application)
    add_header Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline' https://cdn.example.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' https://fonts.gstatic.com; connect-src 'self' https://api.example.com; frame-ancestors 'self';" always;

    # HSTS: force HTTPS for 2 years
    add_header Strict-Transport-Security "max-age=63072000; includeSubDomains; preload" always;

    # Permissions Policy
    add_header Permissions-Policy "camera=(), microphone=(), geolocation=(), interest-cohort=()" always;
}

# ---- Relaxed headers for API endpoints ----
location /api/ {
    proxy_pass http://api-backend:4000;

    # APIs need CORS, not CSP
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-Frame-Options "DENY" always;

    # CORS headers
    add_header Access-Control-Allow-Origin "https://example.com" always;
    add_header Access-Control-Allow-Methods "GET, POST, PUT, DELETE, OPTIONS" always;
    add_header Access-Control-Allow-Headers "Authorization, Content-Type" always;
    add_header Access-Control-Max-Age 86400 always;

    # Handle preflight requests
    if ($request_method = OPTIONS) {
        return 204;
    }
}

# ---- Minimal headers for static assets ----
location ~* \\.(css|js|jpg|png|gif|svg|woff2|ico)$ {
    root /var/www/static;
    expires 30d;
    add_header Cache-Control "public, immutable";

    # Allow fonts to be loaded cross-origin
    add_header Access-Control-Allow-Origin "*";

    # No CSP or HSTS needed for static assets
    # (browsers apply the headers from the HTML page)
}

# ---- Block sensitive paths ----
# Block hidden files (.git, .env, .htaccess, .DS_Store)
location ~ /\\. {
    deny all;
    access_log off;
    log_not_found off;
    return 404;
}

# Block common sensitive files
location ~* /(composer\\.json|package\\.json|package-lock\\.json|yarn\\.lock|\\.env.*|Makefile|Dockerfile|docker-compose\\.ya?ml)$ {
    deny all;
    return 404;
}`}</code></pre>
      </div>

      {/* -- 11. Common Patterns -------------------------------------- */}
      <div style={sectionStyle}>
        <h2 style={{ color: 'var(--text-primary)' }}>{s.h2_patterns}</h2>
        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>{s.p_patterns}</p>

        <pre style={codeBlockStyle}><code>{`# ========================================
# WordPress Configuration
# ========================================
server {
    listen 80;
    server_name wordpress.example.com;
    root /var/www/wordpress;
    index index.php;

    # WordPress permalinks
    location / {
        try_files $uri $uri/ /index.php?$args;
    }

    # PHP processing
    location ~ \\.php$ {
        try_files $uri =404;
        fastcgi_pass unix:/run/php/php-fpm.sock;
        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
        include fastcgi_params;
        fastcgi_intercept_errors on;
    }

    # Block access to wp-config.php
    location = /wp-config.php {
        deny all;
    }

    # Block xmlrpc.php (common attack vector)
    location = /xmlrpc.php {
        deny all;
        return 403;
    }

    # Cache static assets
    location ~* \\.(css|js|jpg|jpeg|png|gif|ico|svg|woff|woff2)$ {
        expires 30d;
        add_header Cache-Control "public";
        access_log off;
    }
}

# ========================================
# Next.js (Node.js backend) Configuration
# ========================================
server {
    listen 80;
    server_name nextjs.example.com;

    # Proxy everything to Next.js server
    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }

    # Serve Next.js static files directly (/_next/static/)
    location /_next/static/ {
        alias /var/www/nextjs/.next/static/;
        expires 365d;
        add_header Cache-Control "public, immutable";
        access_log off;
    }

    # Serve public directory directly
    location /public/ {
        alias /var/www/nextjs/public/;
        expires 30d;
        access_log off;
    }
}

# ========================================
# React SPA (Static Build) Configuration
# ========================================
server {
    listen 80;
    server_name react.example.com;
    root /var/www/react/build;

    # SPA fallback -- all routes go to index.html
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache hashed assets forever
    location /static/ {
        expires 1y;
        add_header Cache-Control "public, immutable";
        access_log off;
    }

    # Do NOT cache index.html
    location = /index.html {
        expires -1;
        add_header Cache-Control "no-store, no-cache, must-revalidate";
    }

    # API proxy to backend
    location /api/ {
        proxy_pass http://127.0.0.1:4000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}

# ========================================
# API + Static Files (Microservice Style)
# ========================================
server {
    listen 80;
    server_name app.example.com;

    # Frontend (SPA)
    location / {
        root /var/www/frontend/dist;
        try_files $uri $uri/ /index.html;
    }

    # API v1 -> Service A
    location /api/v1/ {
        proxy_pass http://service-a:3001/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }

    # API v2 -> Service B
    location /api/v2/ {
        proxy_pass http://service-b:3002/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }

    # Uploads with size limit
    location /api/upload {
        client_max_body_size 50M;
        proxy_pass http://upload-service:3003;
        proxy_set_header Host $host;
    }

    # WebSocket endpoint
    location /ws {
        proxy_pass http://ws-service:3004;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }

    # Shared static assets
    location /assets/ {
        alias /var/www/shared-assets/;
        expires 30d;
        add_header Cache-Control "public";
    }
}`}</code></pre>
      </div>

      {/* -- 12. Debugging -------------------------------------------- */}
      <div style={sectionStyle}>
        <h2 style={{ color: 'var(--text-primary)' }}>{s.h2_debugging}</h2>
        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>{s.p_debugging}</p>

        <pre style={codeBlockStyle}><code>{`# ---- Step 1: Always Test Before Reloading ----
# Check configuration syntax
nginx -t
# Output: nginx: the configuration file /etc/nginx/nginx.conf syntax is ok
#         nginx: configuration file /etc/nginx/nginx.conf test is successful

# Test and show the full resolved configuration
nginx -T

# ---- Step 2: Enable Debug Logging ----
# In nginx.conf or server block:
error_log /var/log/nginx/error.log debug;

# Or enable debug for specific IPs only (less performance impact):
events {
    debug_connection 192.168.1.100;
    debug_connection 10.0.0.0/24;
}

# ---- Step 3: Add Debug Headers to Identify Which Location Matched ----
# Add this to each location block during debugging:

location = / {
    add_header X-Debug-Location "exact-root" always;
    # ... your config ...
}

location ^~ /static/ {
    add_header X-Debug-Location "prefix-priority-static" always;
    # ... your config ...
}

location ~* \\.(css|js)$ {
    add_header X-Debug-Location "regex-css-js" always;
    # ... your config ...
}

location / {
    add_header X-Debug-Location "default-prefix" always;
    # ... your config ...
}

# ---- Step 4: Test with curl ----
# Check which location handled the request by inspecting headers:
curl -I https://example.com/
curl -I https://example.com/static/style.css
curl -I https://example.com/api/users

# Check response headers:
curl -sI https://example.com/ | grep X-Debug-Location
# Output: X-Debug-Location: exact-root

# Test redirect behavior:
curl -L -v https://example.com/old-page 2>&1 | grep "< HTTP\\|< Location"

# ---- Step 5: Monitor Access and Error Logs ----
# Watch access log in real-time:
tail -f /var/log/nginx/access.log

# Filter for specific URI:
tail -f /var/log/nginx/access.log | grep "/api/"

# Watch error log for config issues:
tail -f /var/log/nginx/error.log

# ---- Step 6: Common Issues and Fixes ----

# Issue: "rewrite or internal redirection cycle"
# Cause: location blocks redirect to each other infinitely
# Fix: Check your rewrite rules and try_files for circular references

# Issue: "could not build server_names_hash"
# Fix: Increase hash bucket size in http {} block:
# server_names_hash_bucket_size 128;

# Issue: 403 Forbidden on static files
# Fix: Check file permissions and ensure nginx user can read:
# ls -la /var/www/
# chown -R nginx:nginx /var/www/
# chmod -R 755 /var/www/

# Issue: Regex location not matching
# Debug: Test your regex pattern at regex101.com
# Remember: Nginx uses PCRE, not JavaScript or Python regex
# Remember: Backslashes must be escaped in nginx.conf: \\. not \.

# ---- Reload After Fixing ----
nginx -t && nginx -s reload`}</code></pre>
      </div>

      {/* -- 13. FAQ -------------------------------------------------- */}
      <div style={sectionStyle}>
        <h2 style={{ color: 'var(--text-primary)' }}>{s.h2_faq}</h2>

        <div style={{ marginBottom: 20 }}>
          <h3 style={{ color: 'var(--text-primary)', marginBottom: 8 }}>{s.faq1_q}</h3>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>{s.faq1_a}</p>
        </div>
        <div style={{ marginBottom: 20 }}>
          <h3 style={{ color: 'var(--text-primary)', marginBottom: 8 }}>{s.faq2_q}</h3>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>{s.faq2_a}</p>
        </div>
        <div style={{ marginBottom: 20 }}>
          <h3 style={{ color: 'var(--text-primary)', marginBottom: 8 }}>{s.faq3_q}</h3>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>{s.faq3_a}</p>
        </div>
        <div style={{ marginBottom: 20 }}>
          <h3 style={{ color: 'var(--text-primary)', marginBottom: 8 }}>{s.faq4_q}</h3>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>{s.faq4_a}</p>
        </div>
        <div style={{ marginBottom: 20 }}>
          <h3 style={{ color: 'var(--text-primary)', marginBottom: 8 }}>{s.faq5_q}</h3>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>{s.faq5_a}</p>
        </div>
      </div>

      {/* -- Conclusion ----------------------------------------------- */}
      <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginTop: 24 }}>{s.p_conclusion}</p>

      <div style={{ margin: '16px 0 24px', display: 'flex', flexDirection: 'column', gap: 8 }}>
        <Link href={`/${lang}/tools/nginx-config`} style={linkStyle}>{s.link_nginx_bottom} &rarr;</Link>
        <Link href={`/${lang}/tools/regex-tester`} style={linkStyle}>{s.link_regex_bottom} &rarr;</Link>
      </div>
    </>
  );
}
