'use client';
import React from 'react';

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'HTMX Guide 2026: Build Modern Web Apps Without JavaScript Frameworks',
    intro: 'HTMX is a lightweight library that allows you to access modern browser features directly from HTML, without writing JavaScript. By extending HTML with attributes like hx-get, hx-post, and hx-swap, HTMX enables dynamic, interactive web applications using a hypermedia-driven approach. In 2026, HTMX has become a serious alternative to React, Vue, and Angular for many use cases.',
    h2WhatIs: 'What Is HTMX?',
    whatIsDesc: 'HTMX is a dependency-free JavaScript library (about 14KB minified and gzipped) that extends HTML with custom attributes for making AJAX requests, handling server-sent events, WebSocket connections, CSS transitions, and more. Instead of sending JSON and rendering on the client, HTMX sends HTML fragments from the server and swaps them into the DOM.',
    h2CoreConcepts: 'Core Concepts',
    coreConceptsDesc: 'HTMX follows the hypermedia-as-the-engine-of-application-state (HATEOAS) principle. The server sends HTML, and the browser renders it. This simplifies the architecture by eliminating the need for a separate API layer, client-side state management, and complex build tooling.',
    h3Attributes: 'Core Attributes',
    attributesDesc: 'HTMX uses HTML attributes to declare behavior. The core attributes control what HTTP request to make and how to update the page.',
    h3Swapping: 'Content Swapping',
    swappingDesc: 'The hx-swap attribute controls how the response HTML replaces content in the DOM. Options include innerHTML (default), outerHTML, beforebegin, afterbegin, beforeend, afterend, delete, and none.',
    h3Targeting: 'Targeting Elements',
    targetingDesc: 'By default, HTMX replaces the content of the element that triggered the request. Use hx-target to specify a different element as the swap target using CSS selectors.',
    h3Triggers: 'Event Triggers',
    triggersDesc: 'The hx-trigger attribute controls when a request is sent. By default, buttons use click, inputs use change, and forms use submit. You can customize triggers with modifiers like delay, throttle, changed, and once.',
    h2Patterns: 'Common Patterns',
    patternsDesc: 'HTMX supports many interactive patterns that traditionally require significant JavaScript code.',
    h3ActiveSearch: 'Active Search',
    activeSearchDesc: 'Implement a search-as-you-type feature with a single attribute. The server returns matching results as HTML, and HTMX swaps them into the results container.',
    h3InfiniteScroll: 'Infinite Scroll',
    infiniteScrollDesc: 'Load more content as the user scrolls down. The revealed trigger fires when an element enters the viewport.',
    h3InlineEdit: 'Click-to-Edit',
    inlineEditDesc: 'Replace static content with an edit form on click, then swap back to the updated static content on save.',
    h3DeleteConfirm: 'Delete with Confirmation',
    deleteConfirmDesc: 'Use hx-confirm to show a browser confirmation dialog before sending a delete request.',
    h3LazyLoad: 'Lazy Loading',
    lazyLoadDesc: 'Load content lazily when elements enter the viewport or when the page loads.',
    h2ServerSide: 'Server-Side Integration',
    serverSideDesc: 'HTMX works with any server-side language or framework. The server returns HTML fragments instead of JSON. Here are examples with popular backend frameworks.',
    h3Express: 'Express.js (Node.js)',
    h3Python: 'Flask (Python)',
    h3Go: 'Go (net/http)',
    h2Advanced: 'Advanced Features',
    h3Headers: 'Request Headers',
    headersDesc: 'HTMX sends several useful headers with each request: HX-Request (always true), HX-Target (ID of target element), HX-Trigger (ID of triggered element), and HX-Current-URL (current page URL). Use these on the server to return different responses.',
    h3OOB: 'Out-of-Band Swaps',
    oobDesc: 'Update multiple parts of the page from a single response using hx-swap-oob. Elements with this attribute are swapped into matching elements by ID, regardless of the main target.',
    h3Extensions: 'Extensions',
    extensionsDesc: 'HTMX supports extensions for additional functionality including JSON encoding, server-sent events, WebSocket connections, preloading, and more.',
    h3CSS: 'CSS Transitions',
    cssDesc: 'HTMX adds CSS classes during swaps that you can use for animations. The htmx-added, htmx-settling, and htmx-swapping classes enable smooth transitions.',
    h2Comparison: 'HTMX vs JavaScript Frameworks',
    thCriteria: 'Criteria',
    thHtmx: 'HTMX',
    thReact: 'React/Vue/Angular',
    h2BestPractices: 'Best Practices',
    bp1: 'Return small HTML fragments, not full pages, for partial updates',
    bp2: 'Use hx-indicator to show loading states during requests',
    bp3: 'Leverage hx-push-url for proper browser history support',
    bp4: 'Use hx-boost on links and forms for progressive enhancement',
    bp5: 'Keep server responses idempotent where possible',
    bp6: 'Use hx-swap-oob for updating multiple page regions from one response',
    bp7: 'Implement proper error handling with hx-on::after-request',
    bp8: 'Use the preload extension for anticipated navigation',
    h2Faq: 'Frequently Asked Questions',
    faq1Q: 'Can HTMX replace React?',
    faq1A: 'For many applications, yes. HTMX excels at server-rendered applications with moderate interactivity: dashboards, admin panels, content sites, CRUD applications, and forms. For highly interactive client-side applications (real-time collaborative editing, complex data visualizations, offline-first apps), a JavaScript framework is still better suited.',
    faq2Q: 'Is HTMX SEO-friendly?',
    faq2A: 'Yes, extremely. Since HTMX serves HTML from the server, search engines can crawl and index your content without executing JavaScript. This is a major advantage over client-side rendered SPAs. You get server-side rendering by default.',
    faq3Q: 'Does HTMX work with REST APIs?',
    faq3A: 'HTMX is designed for hypermedia APIs that return HTML, not JSON. You can use it with existing REST APIs by adding a server-side layer that renders HTML templates. Alternatively, the json-enc extension lets HTMX send JSON requests.',
    faq4Q: 'What is the performance like?',
    faq4A: 'HTMX is extremely lightweight (14KB) compared to React (44KB+) or Vue (34KB+). Page loads are fast because there is no client-side rendering step. Network requests transfer small HTML fragments instead of JSON that needs to be parsed and rendered. The trade-off is that the server does more rendering work.',
    faq5Q: 'Can HTMX handle complex state management?',
    faq5A: 'HTMX moves state management to the server, which simplifies the client but requires your server to maintain state across requests. For complex client-side state (undo/redo, drag-and-drop, real-time collaboration), you may need to combine HTMX with targeted JavaScript using Alpine.js or vanilla JS.',
  },
  zh: {
    title: 'HTMX 指南 2026：无需 JavaScript 框架构建现代 Web 应用',
    intro: 'HTMX 是一个轻量级库，允许你直接从 HTML 访问现代浏览器功能，无需编写 JavaScript。通过使用 hx-get、hx-post 和 hx-swap 等属性扩展 HTML，HTMX 使用超媒体驱动的方式实现动态、交互式的 Web 应用。',
    h2WhatIs: '什么是 HTMX？',
    whatIsDesc: 'HTMX 是一个无依赖的 JavaScript 库（压缩后约 14KB），通过自定义属性扩展 HTML，支持 AJAX 请求、服务器发送事件、WebSocket 连接和 CSS 过渡。',
    h2CoreConcepts: '核心概念',
    coreConceptsDesc: 'HTMX 遵循 HATEOAS 原则。服务器发送 HTML，浏览器渲染它。这简化了架构，消除了单独 API 层和客户端状态管理的需求。',
    h3Attributes: '核心属性',
    attributesDesc: 'HTMX 使用 HTML 属性来声明行为。核心属性控制发送什么 HTTP 请求以及如何更新页面。',
    h3Swapping: '内容交换',
    swappingDesc: 'hx-swap 属性控制响应 HTML 如何替换 DOM 中的内容。选项包括 innerHTML、outerHTML 等。',
    h3Targeting: '目标元素',
    targetingDesc: '默认情况下，HTMX 替换触发请求的元素的内容。使用 hx-target 指定不同的元素作为交换目标。',
    h3Triggers: '事件触发器',
    triggersDesc: 'hx-trigger 属性控制何时发送请求。可以使用 delay、throttle、changed 和 once 等修饰符自定义触发器。',
    h2Patterns: '常见模式',
    patternsDesc: 'HTMX 支持许多传统上需要大量 JavaScript 代码的交互模式。',
    h3ActiveSearch: '实时搜索',
    activeSearchDesc: '用单个属性实现搜索即输入功能。服务器返回匹配结果的 HTML，HTMX 将其交换到结果容器中。',
    h3InfiniteScroll: '无限滚动',
    infiniteScrollDesc: '当用户向下滚动时加载更多内容。revealed 触发器在元素进入视口时触发。',
    h3InlineEdit: '点击编辑',
    inlineEditDesc: '点击时将静态内容替换为编辑表单，保存后交换回更新的静态内容。',
    h3DeleteConfirm: '删除确认',
    deleteConfirmDesc: '使用 hx-confirm 在发送删除请求前显示浏览器确认对话框。',
    h3LazyLoad: '延迟加载',
    lazyLoadDesc: '当元素进入视口或页面加载时延迟加载内容。',
    h2ServerSide: '服务端集成',
    serverSideDesc: 'HTMX 可与任何服务端语言或框架配合使用。服务器返回 HTML 片段而非 JSON。',
    h3Express: 'Express.js (Node.js)',
    h3Python: 'Flask (Python)',
    h3Go: 'Go (net/http)',
    h2Advanced: '高级特性',
    h3Headers: '请求头',
    headersDesc: 'HTMX 在每个请求中发送有用的请求头，可在服务器端使用这些头返回不同的响应。',
    h3OOB: '带外交换',
    oobDesc: '使用 hx-swap-oob 从单个响应更新页面的多个部分。',
    h3Extensions: '扩展',
    extensionsDesc: 'HTMX 支持扩展以提供额外功能，包括 JSON 编码、SSE、WebSocket 等。',
    h3CSS: 'CSS 过渡',
    cssDesc: 'HTMX 在交换期间添加 CSS 类，可用于动画效果。',
    h2Comparison: 'HTMX vs JavaScript 框架',
    thCriteria: '标准',
    thHtmx: 'HTMX',
    thReact: 'React/Vue/Angular',
    h2BestPractices: '最佳实践',
    bp1: '返回小的 HTML 片段，而非完整页面',
    bp2: '使用 hx-indicator 显示加载状态',
    bp3: '利用 hx-push-url 支持浏览器历史',
    bp4: '在链接和表单上使用 hx-boost 进行渐进增强',
    bp5: '尽可能保持服务器响应的幂等性',
    bp6: '使用 hx-swap-oob 从一个响应更新多个页面区域',
    bp7: '使用 hx-on::after-request 实现错误处理',
    bp8: '使用 preload 扩展预加载预期的导航',
    h2Faq: '常见问题',
    faq1Q: 'HTMX 能取代 React 吗？',
    faq1A: '对于许多应用来说，可以。HTMX 擅长服务端渲染的中等交互性应用。对于高度交互的客户端应用，JavaScript 框架仍然更合适。',
    faq2Q: 'HTMX 对 SEO 友好吗？',
    faq2A: '非常友好。由于 HTMX 从服务器提供 HTML，搜索引擎可以直接抓取和索引内容，无需执行 JavaScript。',
    faq3Q: 'HTMX 能与 REST API 配合使用吗？',
    faq3A: 'HTMX 设计用于返回 HTML 的超媒体 API。可以通过添加服务端渲染层来与现有 REST API 配合使用。',
    faq4Q: '性能表现如何？',
    faq4A: 'HTMX 非常轻量（14KB），页面加载快速，因为没有客户端渲染步骤。网络请求传输小的 HTML 片段而非 JSON。',
    faq5Q: 'HTMX 能处理复杂的状态管理吗？',
    faq5A: 'HTMX 将状态管理移到服务器端。对于复杂的客户端状态，可能需要结合 Alpine.js 或原生 JS 使用。',
  },
};

export default function HtmxGuide2026({ lang }: { lang: string }) {
  const t = translations[lang] || translations.en;

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: t.faq1Q, acceptedAnswer: { '@type': 'Answer', text: t.faq1A } },
      { '@type': 'Question', name: t.faq2Q, acceptedAnswer: { '@type': 'Answer', text: t.faq2A } },
      { '@type': 'Question', name: t.faq3Q, acceptedAnswer: { '@type': 'Answer', text: t.faq3A } },
      { '@type': 'Question', name: t.faq4Q, acceptedAnswer: { '@type': 'Answer', text: t.faq4A } },
      { '@type': 'Question', name: t.faq5Q, acceptedAnswer: { '@type': 'Answer', text: t.faq5A } },
    ],
  };

  return (
    <article style={{ maxWidth: 'none' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <p style={{ fontSize: '1.125rem', lineHeight: '1.75', marginBottom: '2rem' }}>{t.intro}</p>

      {/* What Is HTMX */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '2.5rem', marginBottom: '1rem' }}>{t.h2WhatIs}</h2>
      <p style={{ marginBottom: '1rem' }}>{t.whatIsDesc}</p>
      <pre style={{ backgroundColor: '#111827', padding: '1rem', borderRadius: '0.5rem', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`<!-- Add HTMX to your page -->
<script src="https://unpkg.com/htmx.org@2.0.0"></script>

<!-- A simple HTMX example: click to load content -->
<button hx-get="/api/greeting" hx-target="#result" hx-swap="innerHTML">
  Say Hello
</button>
<div id="result"></div>

<!-- The server returns HTML, not JSON -->
<!-- GET /api/greeting response: -->
<!-- <p>Hello, World! The time is 2026-02-23 10:30:00</p> -->`}</code></pre>

      {/* Core Concepts */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '2.5rem', marginBottom: '1rem' }}>{t.h2CoreConcepts}</h2>
      <p style={{ marginBottom: '1rem' }}>{t.coreConceptsDesc}</p>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: '2rem', marginBottom: '0.75rem' }}>{t.h3Attributes}</h3>
      <p style={{ marginBottom: '1rem' }}>{t.attributesDesc}</p>
      <pre style={{ backgroundColor: '#111827', padding: '1rem', borderRadius: '0.5rem', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`<!-- HTTP method attributes -->
<button hx-get="/api/items">Load Items</button>
<form hx-post="/api/items">...</form>
<button hx-put="/api/items/1">Update</button>
<button hx-patch="/api/items/1">Partial Update</button>
<button hx-delete="/api/items/1">Delete</button>

<!-- Include values with requests -->
<input type="text" name="search" hx-get="/api/search"
       hx-trigger="keyup changed delay:300ms"
       hx-target="#search-results" />

<!-- Send additional values -->
<button hx-post="/api/vote"
        hx-vals='{"itemId": 42, "direction": "up"}'>
  Upvote
</button>`}</code></pre>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: '2rem', marginBottom: '0.75rem' }}>{t.h3Swapping}</h3>
      <p style={{ marginBottom: '1rem' }}>{t.swappingDesc}</p>
      <pre style={{ backgroundColor: '#111827', padding: '1rem', borderRadius: '0.5rem', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`<!-- innerHTML: replace children (default) -->
<div hx-get="/items" hx-swap="innerHTML">Loading...</div>

<!-- outerHTML: replace the entire element -->
<div hx-get="/card" hx-swap="outerHTML">Old card</div>

<!-- beforeend: append to children -->
<ul hx-get="/more-items" hx-swap="beforeend">
  <li>Item 1</li>
</ul>

<!-- afterend: insert after the element -->
<tr hx-get="/next-row" hx-swap="afterend">...</tr>

<!-- Swap with transition timing -->
<div hx-get="/content" hx-swap="innerHTML swap:300ms settle:100ms">
  Content with transition
</div>`}</code></pre>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: '2rem', marginBottom: '0.75rem' }}>{t.h3Triggers}</h3>
      <p style={{ marginBottom: '1rem' }}>{t.triggersDesc}</p>
      <pre style={{ backgroundColor: '#111827', padding: '1rem', borderRadius: '0.5rem', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`<!-- Trigger on keyup with 300ms debounce -->
<input hx-get="/search" hx-trigger="keyup changed delay:300ms" />

<!-- Trigger once when element becomes visible -->
<div hx-get="/lazy-content" hx-trigger="revealed">Loading...</div>

<!-- Trigger every 5 seconds (polling) -->
<div hx-get="/live-data" hx-trigger="every 5s">Current data</div>

<!-- Trigger on intersection observer -->
<div hx-get="/more" hx-trigger="intersect threshold:0.5">
  Load when 50% visible
</div>

<!-- Multiple triggers -->
<input hx-get="/validate"
       hx-trigger="change, keyup delay:500ms changed" />`}</code></pre>

      {/* Common Patterns */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '2.5rem', marginBottom: '1rem' }}>{t.h2Patterns}</h2>
      <p style={{ marginBottom: '1rem' }}>{t.patternsDesc}</p>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: '2rem', marginBottom: '0.75rem' }}>{t.h3ActiveSearch}</h3>
      <p style={{ marginBottom: '1rem' }}>{t.activeSearchDesc}</p>
      <pre style={{ backgroundColor: '#111827', padding: '1rem', borderRadius: '0.5rem', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`<!-- Search as you type -->
<input type="search" name="q"
       hx-get="/api/search"
       hx-trigger="input changed delay:300ms, search"
       hx-target="#search-results"
       hx-indicator="#search-spinner"
       placeholder="Search users..." />

<span id="search-spinner" class="htmx-indicator">
  Searching...
</span>

<table>
  <thead><tr><th>Name</th><th>Email</th></tr></thead>
  <tbody id="search-results">
    <!-- Server returns <tr> elements -->
  </tbody>
</table>`}</code></pre>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: '2rem', marginBottom: '0.75rem' }}>{t.h3InfiniteScroll}</h3>
      <p style={{ marginBottom: '1rem' }}>{t.infiniteScrollDesc}</p>
      <pre style={{ backgroundColor: '#111827', padding: '1rem', borderRadius: '0.5rem', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`<!-- Infinite scroll -->
<div id="feed">
  <div class="post">Post 1</div>
  <div class="post">Post 2</div>
  <!-- Last element triggers loading more -->
  <div hx-get="/api/posts?page=2"
       hx-trigger="revealed"
       hx-swap="afterend"
       hx-select="div.post">
    Loading more...
  </div>
</div>`}</code></pre>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: '2rem', marginBottom: '0.75rem' }}>{t.h3InlineEdit}</h3>
      <p style={{ marginBottom: '1rem' }}>{t.inlineEditDesc}</p>
      <pre style={{ backgroundColor: '#111827', padding: '1rem', borderRadius: '0.5rem', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`<!-- Click to edit pattern -->
<div hx-get="/contacts/1/edit" hx-trigger="click" hx-swap="outerHTML">
  <p>Name: Alice Johnson</p>
  <p>Email: alice@example.com</p>
  <small>Click to edit</small>
</div>

<!-- Server returns edit form: -->
<!--
<form hx-put="/contacts/1" hx-swap="outerHTML">
  <input name="name" value="Alice Johnson" />
  <input name="email" value="alice@example.com" />
  <button type="submit">Save</button>
  <button hx-get="/contacts/1" hx-swap="outerHTML">Cancel</button>
</form>
-->`}</code></pre>

      {/* Server-Side Integration */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '2.5rem', marginBottom: '1rem' }}>{t.h2ServerSide}</h2>
      <p style={{ marginBottom: '1rem' }}>{t.serverSideDesc}</p>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: '2rem', marginBottom: '0.75rem' }}>{t.h3Express}</h3>
      <pre style={{ backgroundColor: '#111827', padding: '1rem', borderRadius: '0.5rem', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`// Express.js server for HTMX
const express = require("express");
const app = express();

app.get("/api/search", (req, res) => {
  const query = req.query.q || "";
  const results = searchUsers(query);

  // Return HTML fragment, not JSON
  const html = results.map(user =>
    \`<tr>
      <td>\${user.name}</td>
      <td>\${user.email}</td>
      <td>
        <button hx-delete="/api/users/\${user.id}"
                hx-target="closest tr"
                hx-swap="outerHTML swap:500ms"
                hx-confirm="Delete \${user.name}?">
          Delete
        </button>
      </td>
    </tr>\`
  ).join("");

  res.send(html);
});`}</code></pre>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: '2rem', marginBottom: '0.75rem' }}>{t.h3Python}</h3>
      <pre style={{ backgroundColor: '#111827', padding: '1rem', borderRadius: '0.5rem', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`# Flask server for HTMX
from flask import Flask, request, render_template_string

app = Flask(__name__)

@app.route("/api/search")
def search():
    query = request.args.get("q", "")
    results = search_users(query)

    return render_template_string("""
    {% for user in results %}
    <tr>
      <td>{{ user.name }}</td>
      <td>{{ user.email }}</td>
    </tr>
    {% endfor %}
    """, results=results)`}</code></pre>

      {/* Advanced Features */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '2.5rem', marginBottom: '1rem' }}>{t.h2Advanced}</h2>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: '2rem', marginBottom: '0.75rem' }}>{t.h3OOB}</h3>
      <p style={{ marginBottom: '1rem' }}>{t.oobDesc}</p>
      <pre style={{ backgroundColor: '#111827', padding: '1rem', borderRadius: '0.5rem', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`<!-- Out-of-band swaps: update multiple elements -->
<!-- Main response (swaps into target): -->
<div id="main-content">
  <p>Item saved successfully!</p>
</div>

<!-- Additional out-of-band updates: -->
<span id="notification-count" hx-swap-oob="true">3</span>
<div id="sidebar-stats" hx-swap-oob="innerHTML">
  <p>Total items: 42</p>
</div>
<tr id="item-row-5" hx-swap-oob="outerHTML">
  <td>Updated Item</td>
  <td>2026-02-23</td>
</tr>`}</code></pre>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: '2rem', marginBottom: '0.75rem' }}>{t.h3CSS}</h3>
      <p style={{ marginBottom: '1rem' }}>{t.cssDesc}</p>
      <pre style={{ backgroundColor: '#111827', padding: '1rem', borderRadius: '0.5rem', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`/* CSS transitions with HTMX */
.fade-in {
  opacity: 0;
  transition: opacity 300ms ease-in;
}
.fade-in.htmx-added {
  opacity: 0;
}
.fade-in.htmx-settling {
  opacity: 1;
}

/* Swapping out animation */
.htmx-swapping {
  opacity: 0;
  transition: opacity 200ms ease-out;
}

/* Loading indicator */
.htmx-indicator {
  display: none;
}
.htmx-request .htmx-indicator {
  display: inline-block;
}`}</code></pre>

      {/* Comparison */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '2.5rem', marginBottom: '1rem' }}>{t.h2Comparison}</h2>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead style={{ backgroundColor: 'rgba(55,65,81,0.5)' }}>
            <tr>
              <th style={{ border: '1px solid #374151', padding: '0.5rem 1rem', textAlign: 'left' }}>{t.thCriteria}</th>
              <th style={{ border: '1px solid #374151', padding: '0.5rem 1rem', textAlign: 'left' }}>{t.thHtmx}</th>
              <th style={{ border: '1px solid #374151', padding: '0.5rem 1rem', textAlign: 'left' }}>{t.thReact}</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Bundle size', '~14KB', '44KB+ (React + ReactDOM)'],
              ['Learning curve', 'Low (HTML attributes)', 'High (JSX, hooks, state)'],
              ['Build tooling', 'None required', 'Webpack/Vite/etc required'],
              ['TypeScript', 'Not needed', 'Strongly recommended'],
              ['State management', 'Server-side', 'Client-side (Redux, Zustand)'],
              ['SEO', 'Excellent (server HTML)', 'Requires SSR/SSG'],
              ['Offline support', 'Limited', 'Service workers + PWA'],
              ['Complex UI', 'Moderate', 'Excellent'],
              ['Server coupling', 'Tight', 'Loose (API-driven)'],
            ].map(([criteria, htmx, react], i) => (
              <tr key={i}>
                <td style={{ border: '1px solid #374151', padding: '0.5rem 1rem' }}>{criteria}</td>
                <td style={{ border: '1px solid #374151', padding: '0.5rem 1rem' }}>{htmx}</td>
                <td style={{ border: '1px solid #374151', padding: '0.5rem 1rem' }}>{react}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Best Practices */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '2.5rem', marginBottom: '1rem' }}>{t.h2BestPractices}</h2>
      <ul style={{ paddingLeft: '1.5rem', marginBottom: '1rem' }}>
        {[t.bp1, t.bp2, t.bp3, t.bp4, t.bp5, t.bp6, t.bp7, t.bp8].map((bp, i) => (
          <li key={i} style={{ marginBottom: '0.5rem' }}>{bp}</li>
        ))}
      </ul>

      {/* FAQ */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '2.5rem', marginBottom: '1rem' }}>{t.h2Faq}</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {[
          [t.faq1Q, t.faq1A], [t.faq2Q, t.faq2A], [t.faq3Q, t.faq3A],
          [t.faq4Q, t.faq4A], [t.faq5Q, t.faq5A],
        ].map(([q, a], i) => (
          <div key={i} style={{ border: '1px solid #374151', borderRadius: '0.5rem', padding: '1rem' }}>
            <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '0.5rem' }}>{q}</h3>
            <p style={{ color: '#d1d5db' }}>{a}</p>
          </div>
        ))}
      </div>
    </article>
  );
}
