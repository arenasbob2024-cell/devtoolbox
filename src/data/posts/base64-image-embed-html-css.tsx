'use client';
import React from 'react';
import Link from 'next/link';

const t: Record<string, Record<string, string>> = {
  en: {
    intro: 'Embedding images directly into HTML, CSS, and email using Base64 data URIs eliminates extra HTTP requests and simplifies asset management. This <strong>complete guide</strong> covers everything from the data URI syntax to real-world use cases, performance trade-offs, and conversion methods across multiple languages and tools.',
    try_tool: 'Try our Base64 Encoder/Decoder tool \u2192',

    h2_1: '1. What Is a Data URI?',
    p1_1: 'A <strong>data URI</strong> (Uniform Resource Identifier) allows you to embed file content directly inside a document using a special URL scheme. Instead of pointing to an external file, the data is encoded inline \u2014 most commonly using Base64.',
    p1_2: 'The general syntax is:',
    p1_3: 'Each component serves a specific purpose:',
    p1_list: '<ul><li><code>data:</code> \u2014 The URI scheme identifier</li><li><code>[mediatype]</code> \u2014 The MIME type (e.g., <code>image/png</code>, <code>image/svg+xml</code>, <code>text/html</code>)</li><li><code>;base64</code> \u2014 Indicates the data is Base64-encoded (omit for plain text/percent-encoded data)</li><li><code>,data</code> \u2014 The actual encoded content</li></ul>',
    p1_4: 'Data URIs are defined in <strong>RFC 2397</strong> and are supported by all modern browsers. They work anywhere a URL is expected: <code>src</code> attributes, <code>url()</code> in CSS, <code>href</code> attributes, and more.',

    h2_2: '2. HTML img Tag: Embedding Base64 Images',
    p2_1: 'The most common use of Base64 image embedding is within the HTML <code>&lt;img&gt;</code> tag. Instead of referencing an external file, you place the entire encoded image in the <code>src</code> attribute:',
    p2_2: 'A real-world example with a tiny 1x1 transparent pixel (commonly used for tracking or layout):',
    p2_3: 'You can also use Base64 images in <code>&lt;picture&gt;</code> elements, <code>&lt;source&gt;</code> tags, and <code>&lt;input type="image"&gt;</code> \u2014 anywhere that accepts a <code>src</code> URL.',
    p2_tip: '<strong>Tip:</strong> Always include the <code>alt</code> attribute for accessibility, even for decorative images (use <code>alt=""</code> for decorative ones).',

    h2_3: '3. CSS background-image: Embedding Base64 in Stylesheets',
    p3_1: 'Base64 data URIs work inside the CSS <code>url()</code> function, making them ideal for background images, icons, and decorative elements:',
    p3_2: 'SVG images are particularly well-suited for CSS embedding because they are typically small, scalable, and can be further optimized:',
    p3_3: 'For SVG in CSS, you have two encoding options:',
    p3_list: '<ul><li><strong>Base64:</strong> <code>url(data:image/svg+xml;base64,...)</code> \u2014 Universal, works in all browsers</li><li><strong>URL-encoded:</strong> <code>url("data:image/svg+xml,%3Csvg...")</code> \u2014 Smaller output, no Base64 overhead, but requires careful escaping of special characters</li></ul>',
    p3_tip: '<strong>Tip:</strong> For CSS, prefer URL-encoding SVGs over Base64 when possible \u2014 the output is smaller since SVG is already text-based and does not need binary-to-text conversion.',

    h2_4: '4. HTML Email: Why Base64 Is Essential',
    p4_1: 'Email is one of the most important use cases for Base64 image embedding. Email clients have severe limitations compared to web browsers:',
    p4_list: '<ul><li>Many email clients <strong>block external images</strong> by default (Gmail, Outlook, Yahoo)</li><li>CSS <code>background-image</code> is <strong>not supported</strong> in most email clients</li><li>External image references require the user to "load images" manually</li><li>Corporate firewalls may block external image requests</li></ul>',
    p4_2: 'There are two primary approaches for embedding images in email:',
    h3_4a: 'Approach A: Inline Base64 Data URI',
    p4_3: 'You can embed the image directly in the <code>src</code> attribute, just like in HTML:',
    p4_4: '<strong>Support:</strong> Works in Apple Mail, Thunderbird, and some webmail clients. <strong>Does NOT work in Gmail</strong> (Gmail strips data URIs). Outlook support is inconsistent.',
    h3_4b: 'Approach B: CID (Content-ID) Embedding',
    p4_5: 'The more widely supported approach uses MIME multipart messages with Content-ID references:',
    p4_6: 'CID embedding is supported by virtually all email clients including Gmail, Outlook, Apple Mail, and Thunderbird. This is the <strong>recommended approach</strong> for production email.',
    p4_compare: '<strong>Comparison:</strong>',

    h2_5: '5. Converting Images to Base64',
    p5_1: 'There are multiple ways to convert images to Base64 across different platforms and languages:',
    h3_5a: 'Command Line (Linux/macOS)',
    h3_5b: 'Command Line (Windows PowerShell)',
    h3_5c: 'JavaScript (Browser)',
    p5_js: 'Use the <code>FileReader</code> API to convert files selected via an <code>&lt;input&gt;</code> element:',
    h3_5d: 'JavaScript (Canvas \u2014 Cross-Origin Images)',
    p5_canvas: 'For images already loaded in the DOM, use the Canvas API:',
    h3_5e: 'JavaScript (Node.js)',
    h3_5f: 'Python',
    convert_tool: 'Convert images to Base64 instantly with our tool \u2192',

    h2_6: '6. Supported Image Formats',
    p6_1: 'Data URIs support any MIME type, but here are the most commonly used image formats with their trade-offs:',
    th_format: 'Format',
    th_mime: 'MIME Type',
    th_transparency: 'Transparency',
    th_animation: 'Animation',
    th_best_for: 'Best For',
    td_png_for: 'Icons, screenshots, UI elements',
    td_jpeg_for: 'Photos (not ideal for Base64 due to size)',
    td_svg_for: 'Icons, logos, illustrations',
    td_gif_for: 'Simple animations, tiny icons',
    td_webp_for: 'Modern replacement for PNG/JPEG',
    td_ico_for: 'Favicons (legacy)',
    td_yes: 'Yes',
    td_no: 'No',
    td_na: 'N/A',

    h2_7: '7. Size Impact: The 33% Overhead',
    p7_1: 'Base64 encoding converts every 3 bytes of binary data into 4 ASCII characters. This means the encoded output is always approximately <strong>33% larger</strong> than the original file:',
    p7_2: 'Here is a real-world comparison:',
    th_original: 'Original Size',
    th_base64: 'Base64 Size',
    th_overhead: 'Overhead',
    th_verdict: 'Worth It?',
    td_v1: 'Yes \u2014 saves HTTP request',
    td_v2: 'Marginal \u2014 depends on context',
    td_v3: 'Usually no',
    td_v4: 'No \u2014 use external file',
    p7_3: '<strong>When it is still worth it:</strong> The 33% overhead is offset when it eliminates an HTTP request. Each HTTP request adds latency (DNS lookup, TCP handshake, TLS negotiation). For images under ~5KB, the saved request is almost always worth the extra bytes. Above 10KB, use external files.',
    p7_gzip: '<strong>Good news about gzip:</strong> Base64 data compresses reasonably well with gzip/brotli. The actual transfer size increase over the wire is typically 10-15% rather than the full 33%, since the server compresses the response.',

    h2_8: '8. Performance: When to Use vs When Not to Use',
    p8_1: 'Base64 embedding is a performance trade-off. Here is a definitive guide:',
    h3_8a: 'Use Base64 When:',
    p8_use: '<ul><li><strong>Small images under 5KB</strong> (icons, logos, simple graphics)</li><li><strong>Critical above-the-fold images</strong> that must render without waiting for additional requests</li><li><strong>Single-file distribution</strong> (HTML emails, portable documents, self-contained widgets)</li><li><strong>Reducing HTTP/1.1 connection overhead</strong> (less relevant with HTTP/2 multiplexing)</li><li><strong>Inlining in CSS</strong> to avoid render-blocking image requests during stylesheet parsing</li></ul>',
    h3_8b: 'Avoid Base64 When:',
    p8_avoid: '<ul><li><strong>Images larger than 10KB</strong> \u2014 the size overhead outweighs the saved request</li><li><strong>Images that change frequently</strong> \u2014 you lose the benefit of browser caching (each HTML/CSS change invalidates the cache)</li><li><strong>Multiple identical images</strong> across pages \u2014 external files get cached once, Base64 is re-downloaded on every page</li><li><strong>Server-side rendering with many images</strong> \u2014 bloats the initial HTML payload, delaying First Contentful Paint</li><li><strong>HTTP/2 or HTTP/3</strong> \u2014 multiplexing makes parallel small file requests nearly as fast as inline</li></ul>',
    p8_2: '<strong>Rule of thumb:</strong> If the image is small enough that you would not bother creating a separate file for it, embed it. Otherwise, serve it externally.',

    h2_9: '9. Real-World Use Cases',
    p9_1: 'Here are the most common production scenarios where Base64 image embedding shines:',
    h3_9a: 'Favicons in HTML',
    p9_fav: 'Embed your favicon directly in HTML to eliminate a separate request:',
    h3_9b: 'Small Icons in CSS',
    p9_icons: 'UI icons, arrows, checkmarks, and other small decorative elements are ideal Base64 candidates:',
    h3_9c: 'Email Signatures',
    p9_email: 'Company email signatures with logos are a perfect use case \u2014 the logo travels with the email:',
    h3_9d: 'Single-File HTML Documents',
    p9_single: 'For portable reports, documentation, or widgets that need to work as a single .html file:',
    h3_9e: 'Placeholder Images and Loading States',
    p9_placeholder: 'Tiny blurred placeholder images (LQIP \u2014 Low Quality Image Placeholder) for lazy loading:',

    h2_10: '10. Alternatives to Base64 Image Embedding',
    p10_1: 'Base64 is not always the best approach. Consider these alternatives:',
    h3_10a: 'CSS Sprites',
    p10_sprites: 'Combine multiple icons into a single image file and use CSS <code>background-position</code> to display individual icons. Reduces HTTP requests while keeping files cacheable.',
    h3_10b: 'Inline SVG',
    p10_svg: 'Instead of Base64-encoding SVGs, insert them directly as XML into your HTML. This is more efficient (no Base64 overhead) and allows CSS styling and JavaScript interaction:',
    h3_10c: 'CDN with HTTP/2',
    p10_cdn: 'With HTTP/2 multiplexing, a CDN can serve many small files in parallel over a single connection. The caching benefits often outweigh the minor latency savings of Base64 inlining.',
    h3_10d: 'CSS <code>image-set()</code> and <code>srcset</code>',
    p10_srcset: 'For responsive images, use <code>srcset</code> to serve different sizes rather than embedding a single Base64 version. This saves bandwidth on smaller screens.',
    p10_summary: '<strong>Summary:</strong> Use Base64 for small, critical, single-use images. Use external files (with CDN and HTTP/2) for everything else.',

    h2_faq: 'Frequently Asked Questions',
    faq1_q: 'What is the maximum size for a Base64 data URI?',
    faq1_a: 'There is no formal limit in the specification (RFC 2397). However, practical limits exist: Internet Explorer (legacy) had a 32KB limit; modern browsers like Chrome, Firefox, and Edge can handle data URIs of several megabytes. For performance reasons, keep Base64 images under 10KB \u2014 anything larger should be served as an external file.',
    faq2_q: 'Does Base64 embedding affect SEO?',
    faq2_a: 'Base64-embedded images cannot be independently crawled or indexed by search engines. If your images need to appear in Google Image Search, use regular external URLs with descriptive filenames and alt text. For decorative icons and small UI elements, Base64 has no SEO impact since these images would not appear in image search regardless.',
    faq3_q: 'Can I use Base64 images in React and Next.js?',
    faq3_a: 'Yes. In React, use Base64 data URIs directly in JSX: <code>&lt;img src="data:image/png;base64,..." /&gt;</code>. In Next.js, the <code>next/image</code> component also accepts data URIs for the <code>src</code> prop or the <code>blurDataURL</code> prop for placeholder blur effects. For build-time optimization, convert images during your build process and import them as string constants.',
    faq4_q: 'Why does Gmail strip Base64 data URI images?',
    faq4_a: 'Gmail strips data URIs as a security measure to prevent potential XSS attacks and tracking techniques that could be embedded in data URIs. Instead of data URIs, use CID (Content-ID) embedding for inline images in emails, or host images externally and reference them with https:// URLs.',
    faq5_q: 'How do I convert a Base64 string back to an image file?',
    faq5_a: 'In the browser, create a link element: <code>const a = document.createElement("a"); a.href = dataUri; a.download = "image.png"; a.click();</code>. In Node.js: <code>fs.writeFileSync("image.png", Buffer.from(base64String, "base64"));</code>. In Python: <code>open("image.png", "wb").write(base64.b64decode(b64_string))</code>. You can also use our Base64 decoder tool for instant conversion.',
  },
  zh: {
    intro: '使用 Base64 数据 URI 将图像直接嵌入到 HTML、CSS 和电子邮件中，可以消除额外的 HTTP 请求并简化资源管理。本<strong>完整指南</strong>涵盖了从数据 URI 语法到实际使用场景、性能权衡以及多种语言和工具的转换方法。',
    try_tool: '试试我们的 Base64 编码/解码工具 \u2192',

    h2_1: '1. 什么是数据 URI？',
    p1_1: '<strong>数据 URI</strong>（统一资源标识符）允许你使用特殊的 URL 方案将文件内容直接嵌入到文档中。数据不是指向外部文件，而是以内联方式编码 \u2014 最常见的是使用 Base64。',
    p1_2: '通用语法如下：',
    p1_3: '每个组成部分的作用：',
    p1_list: '<ul><li><code>data:</code> \u2014 URI 方案标识符</li><li><code>[mediatype]</code> \u2014 MIME 类型（如 <code>image/png</code>、<code>image/svg+xml</code>、<code>text/html</code>）</li><li><code>;base64</code> \u2014 表示数据是 Base64 编码的（纯文本/百分号编码数据可省略）</li><li><code>,data</code> \u2014 实际的编码内容</li></ul>',
    p1_4: '数据 URI 定义在 <strong>RFC 2397</strong> 中，所有现代浏览器都支持。它们可以在任何需要 URL 的地方使用：<code>src</code> 属性、CSS 中的 <code>url()</code>、<code>href</code> 属性等。',

    h2_2: '2. HTML img 标签：嵌入 Base64 图像',
    p2_1: 'Base64 图像嵌入最常见的用法是在 HTML <code>&lt;img&gt;</code> 标签中。你不需要引用外部文件，而是将整个编码图像放在 <code>src</code> 属性中：',
    p2_2: '一个真实的示例 \u2014 一个 1x1 透明像素（常用于跟踪或布局）：',
    p2_3: '你还可以在 <code>&lt;picture&gt;</code> 元素、<code>&lt;source&gt;</code> 标签和 <code>&lt;input type="image"&gt;</code> 中使用 Base64 图像 \u2014 任何接受 <code>src</code> URL 的地方都可以。',
    p2_tip: '<strong>提示：</strong>始终包含 <code>alt</code> 属性以确保无障碍访问，即使是装饰性图像（装饰性图像使用 <code>alt=""</code>）。',

    h2_3: '3. CSS background-image：在样式表中嵌入 Base64',
    p3_1: 'Base64 数据 URI 可以在 CSS <code>url()</code> 函数中使用，非常适合背景图像、图标和装饰元素：',
    p3_2: 'SVG 图像特别适合 CSS 嵌入，因为它们通常体积小、可缩放，并且可以进一步优化：',
    p3_3: '对于 CSS 中的 SVG，你有两种编码选择：',
    p3_list: '<ul><li><strong>Base64：</strong><code>url(data:image/svg+xml;base64,...)</code> \u2014 通用方案，所有浏览器都支持</li><li><strong>URL 编码：</strong><code>url("data:image/svg+xml,%3Csvg...")</code> \u2014 输出更小，没有 Base64 开销，但需要仔细转义特殊字符</li></ul>',
    p3_tip: '<strong>提示：</strong>在 CSS 中，尽可能使用 URL 编码 SVG 而不是 Base64 \u2014 由于 SVG 本身就是文本格式，不需要二进制到文本的转换，输出更小。',

    h2_4: '4. HTML 邮件：为什么 Base64 至关重要',
    p4_1: '电子邮件是 Base64 图像嵌入最重要的使用场景之一。与浏览器相比，邮件客户端有严格的限制：',
    p4_list: '<ul><li>许多邮件客户端<strong>默认阻止外部图像</strong>（Gmail、Outlook、Yahoo）</li><li>大多数邮件客户端<strong>不支持</strong> CSS <code>background-image</code></li><li>外部图像引用需要用户手动"加载图像"</li><li>企业防火墙可能阻止外部图像请求</li></ul>',
    p4_2: '在邮件中嵌入图像有两种主要方法：',
    h3_4a: '方法 A：内联 Base64 数据 URI',
    p4_3: '你可以像在 HTML 中一样，直接在 <code>src</code> 属性中嵌入图像：',
    p4_4: '<strong>兼容性：</strong>在 Apple Mail、Thunderbird 和部分网页邮件客户端中有效。<strong>在 Gmail 中无效</strong>（Gmail 会移除数据 URI）。Outlook 的支持不一致。',
    h3_4b: '方法 B：CID（Content-ID）嵌入',
    p4_5: '更广泛支持的方法是使用 MIME 多部分消息和 Content-ID 引用：',
    p4_6: 'CID 嵌入几乎所有邮件客户端都支持，包括 Gmail、Outlook、Apple Mail 和 Thunderbird。这是<strong>生产环境推荐的方法</strong>。',
    p4_compare: '<strong>对比：</strong>',

    h2_5: '5. 将图像转换为 Base64',
    p5_1: '在不同平台和语言中有多种方法将图像转换为 Base64：',
    h3_5a: '命令行（Linux/macOS）',
    h3_5b: '命令行（Windows PowerShell）',
    h3_5c: 'JavaScript（浏览器）',
    p5_js: '使用 <code>FileReader</code> API 转换通过 <code>&lt;input&gt;</code> 元素选择的文件：',
    h3_5d: 'JavaScript（Canvas \u2014 跨域图像）',
    p5_canvas: '对于已加载到 DOM 中的图像，使用 Canvas API：',
    h3_5e: 'JavaScript（Node.js）',
    h3_5f: 'Python',
    convert_tool: '使用我们的工具即时将图像转换为 Base64 \u2192',

    h2_6: '6. 支持的图像格式',
    p6_1: '数据 URI 支持任何 MIME 类型，以下是最常用的图像格式及其权衡：',
    th_format: '格式',
    th_mime: 'MIME 类型',
    th_transparency: '透明度',
    th_animation: '动画',
    th_best_for: '最适用于',
    td_png_for: '图标、截图、UI 元素',
    td_jpeg_for: '照片（由于体积较大，不太适合 Base64）',
    td_svg_for: '图标、Logo、插图',
    td_gif_for: '简单动画、小图标',
    td_webp_for: 'PNG/JPEG 的现代替代方案',
    td_ico_for: 'Favicon（传统格式）',
    td_yes: '是',
    td_no: '否',
    td_na: '不适用',

    h2_7: '7. 体积影响：33% 的开销',
    p7_1: 'Base64 编码将每 3 字节二进制数据转换为 4 个 ASCII 字符。这意味着编码输出总是比原始文件大约<strong>大 33%</strong>：',
    p7_2: '以下是实际对比：',
    th_original: '原始大小',
    th_base64: 'Base64 大小',
    th_overhead: '开销',
    th_verdict: '值得吗？',
    td_v1: '值得 \u2014 节省 HTTP 请求',
    td_v2: '勉强 \u2014 取决于具体情况',
    td_v3: '通常不值得',
    td_v4: '不值得 \u2014 使用外部文件',
    p7_3: '<strong>什么时候仍然值得：</strong>当消除一个 HTTP 请求时，33% 的开销可以被抵消。每个 HTTP 请求都会增加延迟（DNS 查询、TCP 握手、TLS 协商）。对于 5KB 以下的图像，节省的请求几乎总是值得额外的字节。超过 10KB 时，请使用外部文件。',
    p7_gzip: '<strong>关于 gzip 的好消息：</strong>Base64 数据在 gzip/brotli 压缩下表现还不错。实际传输大小的增加通常是 10-15%，而不是完整的 33%，因为服务器会压缩响应。',

    h2_8: '8. 性能：何时使用与何时不使用',
    p8_1: 'Base64 嵌入是一种性能权衡。以下是权威指南：',
    h3_8a: '何时使用 Base64：',
    p8_use: '<ul><li><strong>5KB 以下的小图像</strong>（图标、Logo、简单图形）</li><li><strong>首屏关键图像</strong>，需要在无需等待额外请求的情况下渲染</li><li><strong>单文件分发</strong>（HTML 邮件、便携文档、自包含小部件）</li><li><strong>减少 HTTP/1.1 连接开销</strong>（在 HTTP/2 多路复用下不太相关）</li><li><strong>在 CSS 中内联</strong>，避免样式表解析期间的渲染阻塞图像请求</li></ul>',
    h3_8b: '何时避免 Base64：',
    p8_avoid: '<ul><li><strong>大于 10KB 的图像</strong> \u2014 体积开销超过节省的请求</li><li><strong>频繁变化的图像</strong> \u2014 失去浏览器缓存的好处（每次 HTML/CSS 变更都会使缓存失效）</li><li><strong>多个页面使用相同图像</strong> \u2014 外部文件只缓存一次，Base64 在每个页面都重新下载</li><li><strong>包含大量图像的服务端渲染</strong> \u2014 使初始 HTML 负载膨胀，延迟首次内容绘制</li><li><strong>HTTP/2 或 HTTP/3</strong> \u2014 多路复用使并行小文件请求几乎与内联一样快</li></ul>',
    p8_2: '<strong>经验法则：</strong>如果图像小到你不想为它创建单独文件的程度，就嵌入它。否则，使用外部文件提供。',

    h2_9: '9. 实际使用场景',
    p9_1: '以下是 Base64 图像嵌入在生产环境中最常见的应用场景：',
    h3_9a: 'HTML 中的 Favicon',
    p9_fav: '将 favicon 直接嵌入 HTML 以消除额外请求：',
    h3_9b: 'CSS 中的小图标',
    p9_icons: 'UI 图标、箭头、复选标记和其他小型装饰元素是理想的 Base64 候选者：',
    h3_9c: '邮件签名',
    p9_email: '带有 Logo 的公司邮件签名是完美的使用场景 \u2014 Logo 随邮件一起传输：',
    h3_9d: '单文件 HTML 文档',
    p9_single: '对于需要作为单个 .html 文件工作的便携报告、文档或小部件：',
    h3_9e: '占位图像和加载状态',
    p9_placeholder: '用于懒加载的微型模糊占位图像（LQIP \u2014 低质量图像占位符）：',

    h2_10: '10. Base64 图像嵌入的替代方案',
    p10_1: 'Base64 并不总是最佳方案。请考虑以下替代方案：',
    h3_10a: 'CSS Sprites（雪碧图）',
    p10_sprites: '将多个图标合并到单个图像文件中，使用 CSS <code>background-position</code> 显示各个图标。减少 HTTP 请求的同时保持文件可缓存。',
    h3_10b: '内联 SVG',
    p10_svg: '不用 Base64 编码 SVG，而是直接将 SVG 作为 XML 插入到 HTML 中。这更高效（没有 Base64 开销），并且允许 CSS 样式和 JavaScript 交互：',
    h3_10c: '使用 HTTP/2 的 CDN',
    p10_cdn: '借助 HTTP/2 多路复用，CDN 可以通过单个连接并行提供许多小文件。缓存的好处通常超过 Base64 内联节省的少量延迟。',
    h3_10d: 'CSS <code>image-set()</code> 和 <code>srcset</code>',
    p10_srcset: '对于响应式图像，使用 <code>srcset</code> 提供不同尺寸，而不是嵌入单个 Base64 版本。这在小屏幕上节省带宽。',
    p10_summary: '<strong>总结：</strong>对于小型、关键、一次性使用的图像，使用 Base64。其他所有情况，使用外部文件（配合 CDN 和 HTTP/2）。',

    h2_faq: '常见问题',
    faq1_q: 'Base64 数据 URI 的最大大小是多少？',
    faq1_a: '规范（RFC 2397）中没有正式限制。但存在实际限制：Internet Explorer（旧版）有 32KB 的限制；Chrome、Firefox 和 Edge 等现代浏览器可以处理数兆字节的数据 URI。出于性能考虑，建议 Base64 图像保持在 10KB 以下 \u2014 更大的图像应作为外部文件提供。',
    faq2_q: 'Base64 嵌入会影响 SEO 吗？',
    faq2_a: 'Base64 嵌入的图像无法被搜索引擎独立抓取或索引。如果你的图像需要出现在 Google 图片搜索中，请使用带有描述性文件名和 alt 文本的常规外部 URL。对于装饰性图标和小型 UI 元素，Base64 不会影响 SEO，因为这些图像本来就不会出现在图片搜索中。',
    faq3_q: '我可以在 React 和 Next.js 中使用 Base64 图像吗？',
    faq3_a: '可以。在 React 中，直接在 JSX 中使用 Base64 数据 URI：<code>&lt;img src="data:image/png;base64,..." /&gt;</code>。在 Next.js 中，<code>next/image</code> 组件也接受数据 URI 作为 <code>src</code> 属性或 <code>blurDataURL</code> 属性用于占位模糊效果。对于构建时优化，可以在构建过程中转换图像并将它们作为字符串常量导入。',
    faq4_q: '为什么 Gmail 会移除 Base64 数据 URI 图像？',
    faq4_a: 'Gmail 移除数据 URI 是一种安全措施，用于防止可能嵌入在数据 URI 中的潜在 XSS 攻击和跟踪技术。请使用 CID（Content-ID）嵌入来实现邮件中的内联图像，或将图像托管在外部并使用 https:// URL 引用。',
    faq5_q: '如何将 Base64 字符串转回图像文件？',
    faq5_a: '在浏览器中，创建一个链接元素：<code>const a = document.createElement("a"); a.href = dataUri; a.download = "image.png"; a.click();</code>。在 Node.js 中：<code>fs.writeFileSync("image.png", Buffer.from(base64String, "base64"));</code>。在 Python 中：<code>open("image.png", "wb").write(base64.b64decode(b64_string))</code>。你也可以使用我们的 Base64 解码工具进行即时转换。',
  },
};

export default function Base64ImageEmbed({ lang }: { lang: string }) {
  const tx = t[lang] || t['en'];

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: tx.faq1_q,
        acceptedAnswer: { '@type': 'Answer', text: tx.faq1_a },
      },
      {
        '@type': 'Question',
        name: tx.faq2_q,
        acceptedAnswer: { '@type': 'Answer', text: tx.faq2_a },
      },
      {
        '@type': 'Question',
        name: tx.faq3_q,
        acceptedAnswer: { '@type': 'Answer', text: tx.faq3_a },
      },
      {
        '@type': 'Question',
        name: tx.faq4_q,
        acceptedAnswer: { '@type': 'Answer', text: tx.faq4_a },
      },
      {
        '@type': 'Question',
        name: tx.faq5_q,
        acceptedAnswer: { '@type': 'Answer', text: tx.faq5_a },
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <p dangerouslySetInnerHTML={{ __html: tx.intro }} />

      <p>
        <Link href={`/${lang}/tools/base64`} style={{ fontWeight: 600 }}>
          {tx.try_tool}
        </Link>
      </p>

      {/* Section 1: What Is a Data URI? */}
      <h2>{tx.h2_1}</h2>
      <p dangerouslySetInnerHTML={{ __html: tx.p1_1 }} />
      <p>{tx.p1_2}</p>
      <pre><code>{`data:[<mediatype>][;base64],<data>

# Examples:
data:image/png;base64,iVBORw0KGgo...
data:image/svg+xml;base64,PHN2ZyB4...
data:image/jpeg;base64,/9j/4AAQSk...
data:text/html;base64,PGgxPkhlbGx...
data:text/plain;charset=utf-8,Hello%20World`}</code></pre>
      <p>{tx.p1_3}</p>
      <div dangerouslySetInnerHTML={{ __html: tx.p1_list }} />
      <p dangerouslySetInnerHTML={{ __html: tx.p1_4 }} />

      {/* Section 2: HTML img Tag */}
      <h2>{tx.h2_2}</h2>
      <p dangerouslySetInnerHTML={{ __html: tx.p2_1 }} />
      <pre><code>{`<!-- Basic Base64 image in HTML -->
<img
  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAAB
       CAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII="
  alt="1x1 red pixel"
  width="100"
  height="100"
/>`}</code></pre>
      <p>{tx.p2_2}</p>
      <pre><code>{`<!-- 1x1 transparent pixel — commonly used for tracking -->
<img
  src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
  alt=""
  width="1"
  height="1"
/>

<!-- 1x1 transparent PNG -->
<img
  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="
  alt=""
/>`}</code></pre>
      <p dangerouslySetInnerHTML={{ __html: tx.p2_3 }} />
      <blockquote>
        <p dangerouslySetInnerHTML={{ __html: tx.p2_tip }} />
      </blockquote>

      {/* Section 3: CSS background-image */}
      <h2>{tx.h2_3}</h2>
      <p dangerouslySetInnerHTML={{ __html: tx.p3_1 }} />
      <pre><code>{`/* PNG background image */
.notification-badge {
  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEU...);
  background-size: 16px 16px;
  background-repeat: no-repeat;
  width: 16px;
  height: 16px;
}

/* Multiple Base64 backgrounds */
.decorated-box {
  background-image:
    url(data:image/png;base64,iVBORw0KG...),  /* top-left corner */
    url(data:image/png;base64,iVBORw0KG...);   /* bottom-right corner */
  background-position: top left, bottom right;
  background-repeat: no-repeat;
}`}</code></pre>
      <p dangerouslySetInnerHTML={{ __html: tx.p3_2 }} />
      <pre><code>{`/* SVG as Base64 in CSS */
.arrow-icon {
  background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiI+PHBhdGggZD0iTTQgNmw0IDQgNC00IiBmaWxsPSJub25lIiBzdHJva2U9IiMzMzMiIHN0cm9rZS13aWR0aD0iMiIvPjwvc3ZnPg==);
}

/* SVG as URL-encoded in CSS (often smaller) */
.arrow-icon-alt {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16'%3E%3Cpath d='M4 6l4 4 4-4' fill='none' stroke='%23333' stroke-width='2'/%3E%3C/svg%3E");
}`}</code></pre>
      <p>{tx.p3_3}</p>
      <div dangerouslySetInnerHTML={{ __html: tx.p3_list }} />
      <blockquote>
        <p dangerouslySetInnerHTML={{ __html: tx.p3_tip }} />
      </blockquote>

      {/* Section 4: HTML Email */}
      <h2>{tx.h2_4}</h2>
      <p dangerouslySetInnerHTML={{ __html: tx.p4_1 }} />
      <div dangerouslySetInnerHTML={{ __html: tx.p4_list }} />
      <p>{tx.p4_2}</p>

      <h3>{tx.h3_4a}</h3>
      <p dangerouslySetInnerHTML={{ __html: tx.p4_3 }} />
      <pre><code>{`<!-- Data URI in email (limited client support) -->
<table>
  <tr>
    <td>
      <img
        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEU..."
        alt="Company Logo"
        width="200"
        height="50"
        style="display: block;"
      />
    </td>
  </tr>
</table>`}</code></pre>
      <p dangerouslySetInnerHTML={{ __html: tx.p4_4 }} />

      <h3>{tx.h3_4b}</h3>
      <p>{tx.p4_5}</p>
      <pre><code>{`// Node.js with nodemailer — CID embedding
const nodemailer = require('nodemailer');

await transporter.sendMail({
  from: 'noreply@company.com',
  to: 'user@example.com',
  subject: 'Welcome!',
  html: \`
    <h1>Welcome to Our Service</h1>
    <img src="cid:company-logo" alt="Company Logo" width="200" />
    <p>Thank you for signing up!</p>
  \`,
  attachments: [
    {
      filename: 'logo.png',
      path: './assets/logo.png',
      cid: 'company-logo',  // Referenced in <img src="cid:company-logo">
    },
  ],
});`}</code></pre>
      <p dangerouslySetInnerHTML={{ __html: tx.p4_6 }} />

      <p dangerouslySetInnerHTML={{ __html: tx.p4_compare }} />
      <table>
        <thead>
          <tr>
            <th>Method</th>
            <th>Gmail</th>
            <th>Outlook</th>
            <th>Apple Mail</th>
            <th>Thunderbird</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>Data URI</td><td>No</td><td>Partial</td><td>Yes</td><td>Yes</td></tr>
          <tr><td>CID</td><td>Yes</td><td>Yes</td><td>Yes</td><td>Yes</td></tr>
          <tr><td>External URL</td><td>Yes*</td><td>Yes*</td><td>Yes</td><td>Yes</td></tr>
        </tbody>
      </table>
      <p><small>* Blocked by default; requires user to &quot;load images&quot;</small></p>

      {/* Section 5: Converting Images */}
      <h2>{tx.h2_5}</h2>
      <p>{tx.p5_1}</p>

      <h3>{tx.h3_5a}</h3>
      <pre><code>{`# Using base64 command (Linux/macOS)
base64 < image.png | tr -d '\\n'

# Using openssl
openssl base64 -in image.png -out image.b64

# Full data URI with MIME type
echo -n "data:image/png;base64,$(base64 < image.png | tr -d '\\n')"

# Pipe to clipboard (macOS)
echo -n "data:image/png;base64,$(base64 < image.png | tr -d '\\n')" | pbcopy

# Decode Base64 back to image
base64 --decode < image.b64 > decoded.png`}</code></pre>

      <h3>{tx.h3_5b}</h3>
      <pre><code>{`# PowerShell: Convert image to Base64
$bytes = [System.IO.File]::ReadAllBytes("image.png")
$base64 = [Convert]::ToBase64String($bytes)
$dataUri = "data:image/png;base64,$base64"

# Copy to clipboard
$dataUri | Set-Clipboard

# Decode back to file
$bytes = [Convert]::FromBase64String($base64)
[System.IO.File]::WriteAllBytes("decoded.png", $bytes)`}</code></pre>

      <h3>{tx.h3_5c}</h3>
      <p dangerouslySetInnerHTML={{ __html: tx.p5_js }} />
      <pre><code>{`// Browser: FileReader API
const input = document.querySelector('input[type="file"]');

input.addEventListener('change', (event) => {
  const file = event.target.files[0];
  const reader = new FileReader();

  reader.onload = () => {
    const dataUri = reader.result; // "data:image/png;base64,iVBOR..."
    console.log(dataUri);

    // Use it directly
    document.getElementById('preview').src = dataUri;

    // Extract just the Base64 part
    const base64Only = dataUri.split(',')[1];
  };

  reader.readAsDataURL(file);
});`}</code></pre>

      <h3>{tx.h3_5d}</h3>
      <p dangerouslySetInnerHTML={{ __html: tx.p5_canvas }} />
      <pre><code>{`// Canvas API: Convert a loaded image to Base64
function imageToBase64(imgElement, format = 'image/png', quality = 0.92) {
  const canvas = document.createElement('canvas');
  canvas.width = imgElement.naturalWidth;
  canvas.height = imgElement.naturalHeight;

  const ctx = canvas.getContext('2d');
  ctx.drawImage(imgElement, 0, 0);

  // Returns full data URI
  return canvas.toDataURL(format, quality);
}

// Usage
const img = document.querySelector('#my-image');
const dataUri = imageToBase64(img, 'image/jpeg', 0.8);

// For WebP (smaller output)
const webpUri = imageToBase64(img, 'image/webp', 0.8);`}</code></pre>

      <h3>{tx.h3_5e}</h3>
      <pre><code>{`// Node.js: Convert image file to Base64
const fs = require('fs');
const path = require('path');

function imageToDataUri(filePath) {
  const absolutePath = path.resolve(filePath);
  const ext = path.extname(filePath).slice(1);
  const mimeTypes = {
    png: 'image/png',
    jpg: 'image/jpeg',
    jpeg: 'image/jpeg',
    gif: 'image/gif',
    svg: 'image/svg+xml',
    webp: 'image/webp',
    ico: 'image/x-icon',
  };
  const mime = mimeTypes[ext] || 'application/octet-stream';
  const base64 = fs.readFileSync(absolutePath).toString('base64');
  return \`data:\${mime};base64,\${base64}\`;
}

console.log(imageToDataUri('icon.png'));
// → data:image/png;base64,iVBORw0KGgoAAAAN...`}</code></pre>

      <h3>{tx.h3_5f}</h3>
      <pre><code>{`import base64
import mimetypes

def image_to_data_uri(file_path: str) -> str:
    """Convert an image file to a Base64 data URI."""
    mime_type, _ = mimetypes.guess_type(file_path)
    if mime_type is None:
        mime_type = 'application/octet-stream'

    with open(file_path, 'rb') as f:
        encoded = base64.b64encode(f.read()).decode('utf-8')

    return f'data:{mime_type};base64,{encoded}'

# Usage
data_uri = image_to_data_uri('logo.png')
print(data_uri[:80] + '...')
# → data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAA...

# Decode back to file
def data_uri_to_file(data_uri: str, output_path: str):
    """Convert a data URI back to a file."""
    header, data = data_uri.split(',', 1)
    binary = base64.b64decode(data)
    with open(output_path, 'wb') as f:
        f.write(binary)

data_uri_to_file(data_uri, 'output.png')`}</code></pre>

      <p>
        <Link href={`/${lang}/tools/base64`} style={{ fontWeight: 600 }}>
          {tx.convert_tool}
        </Link>
      </p>

      {/* Section 6: Supported Formats */}
      <h2>{tx.h2_6}</h2>
      <p>{tx.p6_1}</p>
      <table>
        <thead>
          <tr>
            <th>{tx.th_format}</th>
            <th>{tx.th_mime}</th>
            <th>{tx.th_transparency}</th>
            <th>{tx.th_animation}</th>
            <th>{tx.th_best_for}</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>PNG</td><td>image/png</td><td>{tx.td_yes}</td><td>{tx.td_no}</td><td>{tx.td_png_for}</td></tr>
          <tr><td>JPEG</td><td>image/jpeg</td><td>{tx.td_no}</td><td>{tx.td_no}</td><td>{tx.td_jpeg_for}</td></tr>
          <tr><td>SVG</td><td>image/svg+xml</td><td>{tx.td_yes}</td><td>{tx.td_yes}</td><td>{tx.td_svg_for}</td></tr>
          <tr><td>GIF</td><td>image/gif</td><td>{tx.td_yes}</td><td>{tx.td_yes}</td><td>{tx.td_gif_for}</td></tr>
          <tr><td>WebP</td><td>image/webp</td><td>{tx.td_yes}</td><td>{tx.td_yes}</td><td>{tx.td_webp_for}</td></tr>
          <tr><td>ICO</td><td>image/x-icon</td><td>{tx.td_yes}</td><td>{tx.td_no}</td><td>{tx.td_ico_for}</td></tr>
        </tbody>
      </table>

      {/* Section 7: Size Impact */}
      <h2>{tx.h2_7}</h2>
      <p dangerouslySetInnerHTML={{ __html: tx.p7_1 }} />
      <pre><code>{`# The math behind 33% overhead:
# Base64 encodes 3 bytes → 4 characters (6 bits each)
# Ratio: 4/3 = 1.333... → ~33% increase

# Example:
# Original:  3 bytes  → [0x48, 0x65, 0x6C]
# Binary:    01001000 01100101 01101100
# Split 6:   010010 000110 010101 101100
# Base64:    S      G      V      s
# Result:    4 characters for 3 bytes`}</code></pre>
      <p>{tx.p7_2}</p>
      <table>
        <thead>
          <tr>
            <th>{tx.th_original}</th>
            <th>{tx.th_base64}</th>
            <th>{tx.th_overhead}</th>
            <th>{tx.th_verdict}</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>1 KB</td><td>1.37 KB</td><td>+370 B</td><td>{tx.td_v1}</td></tr>
          <tr><td>5 KB</td><td>6.67 KB</td><td>+1.67 KB</td><td>{tx.td_v2}</td></tr>
          <tr><td>10 KB</td><td>13.3 KB</td><td>+3.3 KB</td><td>{tx.td_v3}</td></tr>
          <tr><td>50 KB</td><td>66.7 KB</td><td>+16.7 KB</td><td>{tx.td_v4}</td></tr>
        </tbody>
      </table>
      <p dangerouslySetInnerHTML={{ __html: tx.p7_3 }} />
      <p dangerouslySetInnerHTML={{ __html: tx.p7_gzip }} />

      {/* Section 8: Performance */}
      <h2>{tx.h2_8}</h2>
      <p>{tx.p8_1}</p>
      <h3>{tx.h3_8a}</h3>
      <div dangerouslySetInnerHTML={{ __html: tx.p8_use }} />
      <h3>{tx.h3_8b}</h3>
      <div dangerouslySetInnerHTML={{ __html: tx.p8_avoid }} />
      <blockquote>
        <p dangerouslySetInnerHTML={{ __html: tx.p8_2 }} />
      </blockquote>

      {/* Section 9: Use Cases */}
      <h2>{tx.h2_9}</h2>
      <p>{tx.p9_1}</p>

      <h3>{tx.h3_9a}</h3>
      <p>{tx.p9_fav}</p>
      <pre><code>{`<!-- Inline favicon — no extra HTTP request -->
<link
  rel="icon"
  type="image/png"
  href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAB..."
/>

<!-- SVG favicon with dark mode support -->
<link
  rel="icon"
  type="image/svg+xml"
  href="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmci..."
/>`}</code></pre>

      <h3>{tx.h3_9b}</h3>
      <p>{tx.p9_icons}</p>
      <pre><code>{`/* Checkmark icon */
.success::before {
  content: '';
  display: inline-block;
  width: 16px;
  height: 16px;
  background: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiI+PHBhdGggZD0iTTMgOGw0IDQgNi02IiBmaWxsPSJub25lIiBzdHJva2U9IiMyMmMwNWUiIHN0cm9rZS13aWR0aD0iMiIvPjwvc3ZnPg==) no-repeat center;
}

/* Loading spinner */
.loading {
  background: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCI+PGNpcmNsZSBjeD0iMTIiIGN5PSIxMiIgcj0iMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzMzMyIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtZGFzaGFycmF5PSI0NyIgc3Ryb2tlLWRhc2hvZmZzZXQ9IjE1Ij48YW5pbWF0ZVRyYW5zZm9ybSBhdHRyaWJ1dGVOYW1lPSJ0cmFuc2Zvcm0iIHR5cGU9InJvdGF0ZSIgZnJvbT0iMCAxMiAxMiIgdG89IjM2MCAxMiAxMiIgZHVyPSIxcyIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiLz48L2NpcmNsZT48L3N2Zz4=) no-repeat center;
}`}</code></pre>

      <h3>{tx.h3_9c}</h3>
      <p>{tx.p9_email}</p>
      <pre><code>{`<!-- Email signature with embedded logo -->
<table cellpadding="0" cellspacing="0" style="font-family: Arial, sans-serif;">
  <tr>
    <td style="padding-right: 15px; vertical-align: top;">
      <img
        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEU..."
        alt="Company Logo"
        width="80"
        height="80"
        style="display: block; border-radius: 8px;"
      />
    </td>
    <td style="vertical-align: top;">
      <strong>Jane Smith</strong><br />
      Senior Developer<br />
      <a href="mailto:jane@company.com">jane@company.com</a>
    </td>
  </tr>
</table>`}</code></pre>

      <h3>{tx.h3_9d}</h3>
      <p>{tx.p9_single}</p>
      <pre><code>{`<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Self-Contained Report</title>
  <link rel="icon" href="data:image/svg+xml;base64,PHN2Zy..." />
  <style>
    body { font-family: system-ui; max-width: 800px; margin: 0 auto; }
    .logo { background: url(data:image/png;base64,iVBORw...) no-repeat; }
    .chart { /* embedded chart image */ }
  </style>
</head>
<body>
  <img src="data:image/png;base64,iVBOR..." alt="Company Logo" />
  <h1>Monthly Report — January 2026</h1>
  <img src="data:image/png;base64,iVBOR..." alt="Revenue Chart" />
  <!-- Entire document is self-contained in one .html file -->
</body>
</html>`}</code></pre>

      <h3>{tx.h3_9e}</h3>
      <p>{tx.p9_placeholder}</p>
      <pre><code>{`<!-- LQIP: Low Quality Image Placeholder -->
<!-- Tiny 10x7 blurred placeholder (~200 bytes as Base64) -->
<img
  src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAMCAgM..."
  data-src="/images/hero-full.jpg"
  alt="Hero image"
  style="filter: blur(20px); transition: filter 0.3s;"
  loading="lazy"
/>

<script>
// Lazy load: replace placeholder with full image
document.querySelectorAll('img[data-src]').forEach(img => {
  const fullImg = new Image();
  fullImg.onload = () => {
    img.src = img.dataset.src;
    img.style.filter = 'none';
  };
  fullImg.src = img.dataset.src;
});
</script>`}</code></pre>

      {/* Section 10: Alternatives */}
      <h2>{tx.h2_10}</h2>
      <p>{tx.p10_1}</p>

      <h3>{tx.h3_10a}</h3>
      <p dangerouslySetInnerHTML={{ __html: tx.p10_sprites }} />
      <pre><code>{`/* CSS Sprite example */
.icon {
  background-image: url('/sprites/icons.png');
  background-repeat: no-repeat;
  width: 24px;
  height: 24px;
}
.icon-home    { background-position: 0 0; }
.icon-search  { background-position: -24px 0; }
.icon-settings { background-position: -48px 0; }`}</code></pre>

      <h3 dangerouslySetInnerHTML={{ __html: tx.h3_10b }} />
      <p dangerouslySetInnerHTML={{ __html: tx.p10_svg }} />
      <pre><code>{`<!-- Inline SVG — no Base64 needed, fully styleable -->
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
     viewBox="0 0 24 24" fill="none" stroke="currentColor"
     stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
  <polyline points="9 22 9 12 15 12 15 22" />
</svg>

<style>
  /* Style inline SVGs with CSS */
  svg { color: #333; transition: color 0.2s; }
  svg:hover { color: #0066cc; }
</style>`}</code></pre>

      <h3 dangerouslySetInnerHTML={{ __html: tx.h3_10c }} />
      <p dangerouslySetInnerHTML={{ __html: tx.p10_cdn }} />

      <h3 dangerouslySetInnerHTML={{ __html: tx.h3_10d }} />
      <p dangerouslySetInnerHTML={{ __html: tx.p10_srcset }} />
      <pre><code>{`<!-- Responsive images with srcset -->
<img
  srcset="/images/hero-400w.webp 400w,
          /images/hero-800w.webp 800w,
          /images/hero-1200w.webp 1200w"
  sizes="(max-width: 600px) 400px, (max-width: 1000px) 800px, 1200px"
  src="/images/hero-800w.webp"
  alt="Hero image"
/>`}</code></pre>

      <p dangerouslySetInnerHTML={{ __html: tx.p10_summary }} />

      {/* FAQ */}
      <div className="faq-section">
        <h2>{tx.h2_faq}</h2>

        <h3>{tx.faq1_q}</h3>
        <p>{tx.faq1_a}</p>

        <h3>{tx.faq2_q}</h3>
        <p>{tx.faq2_a}</p>

        <h3>{tx.faq3_q}</h3>
        <p dangerouslySetInnerHTML={{ __html: tx.faq3_a }} />

        <h3>{tx.faq4_q}</h3>
        <p>{tx.faq4_a}</p>

        <h3>{tx.faq5_q}</h3>
        <p dangerouslySetInnerHTML={{ __html: tx.faq5_a }} />
      </div>
    </>
  );
}
