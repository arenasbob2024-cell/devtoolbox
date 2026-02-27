'use client';
import React from 'react';
import Link from 'next/link';

const translations: Record<string, Record<string, string>> = {
  en: {
    tldr_title: 'TL;DR',
    tldr_body: 'Image to Base64 conversion encodes binary image data as ASCII text using the Base64 alphabet. The result is a data URI like <code>data:image/png;base64,iVBORw0KGgo...</code> that can be embedded directly in HTML, CSS, JavaScript, or email — eliminating an HTTP request. Images grow ~33% in size after encoding. Use Base64 for small images under 5 KB; serve larger images as external files for better caching and performance.',

    key_title: 'Key Takeaways',
    key_1: 'Base64 encodes every 3 bytes as 4 ASCII characters — a ~33% size increase.',
    key_2: 'Data URIs work in <code>img src</code>, CSS <code>url()</code>, JavaScript strings, and email attachments.',
    key_3: 'MIME types determine how browsers decode the data: <code>image/png</code>, <code>image/jpeg</code>, <code>image/svg+xml</code>, <code>image/webp</code>.',
    key_4: 'FileReader API (browser) and <code>fs.readFileSync</code> + Buffer (Node.js) are the two most common conversion paths.',
    key_5: 'Gmail strips data URIs — use CID embedding or external URLs for HTML email.',
    key_6: 'With gzip/brotli, the actual wire overhead drops to ~10–15% instead of 33%.',

    intro: 'Converting an image to Base64 means encoding the raw binary pixels as printable ASCII characters so the image can travel inside a text-based payload — an HTML file, a JSON object, a CSS stylesheet, or a MIME email. This guide covers <strong>everything you need to know</strong>: the data URI format, browser and Node.js conversion code, Python scripts, performance trade-offs, MIME types, email embedding, security considerations, and how to decode Base64 back to an image file.',

    try_tool: 'Try our free Image to Base64 Converter tool \u2192',

    h2_1: '1. What Is Image to Base64 Conversion?',
    p1_1: 'Base64 is a binary-to-text encoding scheme defined in <strong>RFC 4648</strong>. It maps every 6 bits of binary data to one of 64 printable ASCII characters (A–Z, a–z, 0–9, +, /). Because most text-based formats (HTTP headers, HTML attributes, CSS strings, JSON values) cannot contain arbitrary binary bytes, Base64 provides a universal way to embed any binary file as plain text.',
    p1_2: 'When you encode an image as Base64, the output is wrapped in a <strong>data URI</strong> (RFC 2397):',
    p1_3: 'The components are:',
    p1_list: '<ul><li><code>data:</code> — the URI scheme</li><li><code>image/png</code> — the MIME type (tells the browser how to interpret the bytes)</li><li><code>;base64</code> — the encoding indicator</li><li><code>,iVBORw0KGgo...</code> — the Base64-encoded image bytes</li></ul>',
    p1_4: 'Data URIs are supported by all modern browsers (Chrome, Firefox, Safari, Edge) and can be used anywhere a URL is accepted: <code>src</code> attributes, CSS <code>url()</code>, JavaScript <code>Image</code> objects, Canvas API, and more.',

    h2_2: '2. Data URLs in HTML and CSS',
    h3_2a: 'HTML img src',
    p2_1: 'The most common use of a Base64 image is replacing an <code>src</code> URL on an <code>&lt;img&gt;</code> tag. The browser decodes the data URI inline and renders the image without making a network request:',
    p2_2: 'A 1\u00d71 transparent tracking pixel — a classic use case that saves an HTTP round-trip:',
    p2_tip: '<strong>Accessibility tip:</strong> Always include <code>alt</code> text. For purely decorative images use <code>alt=""</code>.',

    h3_2b: 'CSS background-image',
    p2_3: 'Data URIs work inside the CSS <code>url()</code> function, making them ideal for small icons, gradients, and UI chrome that must load with the stylesheet:',
    p2_4: 'For SVG images embedded in CSS you have two choices:',
    p2_svg_list: '<ul><li><strong>Base64:</strong> <code>url(data:image/svg+xml;base64,...)</code> — universal browser support</li><li><strong>URL-encoded:</strong> <code>url("data:image/svg+xml,%3Csvg...")</code> — smaller output because SVG is already text; no binary-to-text overhead</li></ul>',
    p2_svg_tip: '<strong>Performance tip:</strong> Prefer URL-encoding SVGs over Base64 in CSS — the encoded output is smaller and the browser skips the Base64 decoding step.',

    h3_2c: 'JavaScript Image Objects and Canvas',
    p2_5: 'You can set <code>image.src</code> to a data URI just like a regular URL. This is useful for pre-loading images from a data source or an API:',

    h2_3: '3. Converting Images in JavaScript (Browser)',
    h3_3a: 'FileReader API — File Input',
    p3_1: 'The <strong>FileReader API</strong> is the standard browser way to convert a user-selected file to a Base64 data URI. It is fully asynchronous and works without any server involvement:',
    p3_promise: 'Promise-based wrapper for modern async/await code:',

    h3_3b: 'Canvas API — Cross-Origin and DOM Images',
    p3_2: 'For images already rendered in the DOM (or loaded from a URL), the <strong>Canvas API</strong> lets you draw the image and export it as a data URI. The output MIME type and quality are configurable:',
    p3_cors: '<strong>CORS note:</strong> Drawing a cross-origin image onto a Canvas taints the canvas and will throw a security error when you call <code>toDataURL()</code>. The remote server must set <code>Access-Control-Allow-Origin: *</code> and you must load the image with <code>crossOrigin="anonymous"</code>.',

    h3_3c: 'Fetch API — Remote URLs',
    p3_3: 'To convert an image at a remote URL (same-origin or CORS-enabled) to Base64:',

    h2_4: '4. Converting Images in Node.js',
    h3_4a: 'Synchronous: fs.readFileSync + Buffer',
    p4_1: 'Node.js has built-in Base64 support through <code>Buffer</code>. This is the simplest approach for build scripts and CLI tools:',

    h3_4b: 'Async: fs.promises.readFile',
    p4_2: 'For production servers, prefer the async version to avoid blocking the event loop:',

    h3_4c: 'Converting Back: Base64 to Image File',
    p4_3: 'To decode a Base64 string back to a binary file in Node.js:',

    h2_5: '5. Converting Images in Python',
    h3_5a: 'base64 Module',
    p5_1: 'Python\'s standard library <code>base64</code> module handles encoding and decoding with no external dependencies:',
    p5_2: 'Using <code>pathlib</code> for a more modern approach:',
    p5_tip: '<strong>Tip:</strong> Use <code>mimetypes.guess_type()</code> to automatically determine the correct MIME type from the file extension instead of hard-coding it.',

    h3_5b: 'Batch Processing Multiple Images',
    p5_3: 'Convert an entire directory of images to an inline CSS sprite file:',

    h2_6: '6. MIME Types for Common Image Formats',
    p6_1: 'The MIME type in the data URI tells the browser which image decoder to use. Getting it wrong causes the image to silently fail to render:',
    th_format: 'Format',
    th_mime: 'MIME Type',
    th_transparency: 'Transparency',
    th_animation: 'Animation',
    th_best_for: 'Best Use Case',
    td_png_for: 'Icons, UI elements, screenshots — lossless compression',
    td_jpeg_for: 'Photos — avoid Base64 (large file size)',
    td_svg_for: 'Logos, icons, illustrations — prefer URL-encoding in CSS',
    td_gif_for: 'Simple animations, tiny icons',
    td_webp_for: 'Modern PNG/JPEG replacement — smaller at same quality',
    td_avif_for: 'Next-gen format — smallest size but limited Base64 tooling',
    td_ico_for: 'Browser favicons (legacy support)',
    td_yes: 'Yes',
    td_no: 'No',
    td_partial: 'Partial',
    p6_note: '<strong>Note:</strong> For <code>image/svg+xml</code> you do not need Base64 at all in many contexts — you can use a URL-encoded SVG or even an inline <code>&lt;svg&gt;</code> element in HTML. Base64 is required when the value must be a single unbroken string without special characters.',

    h2_7: '7. CSS Sprites vs. Base64 Inline Images',
    p7_1: 'Before HTTP/2, CSS sprites were the dominant technique for reducing icon HTTP requests. Base64 inline images are an alternative with different trade-offs:',
    h3_7a: 'CSS Sprites',
    p7_sprite_pros: '<strong>Pros:</strong> Files are cached by the browser and shared across pages. The combined image is served once and stays in the browser cache indefinitely. Updating one icon does not bust the cache for the others.',
    p7_sprite_cons: '<strong>Cons:</strong> Requires a build step to generate the sprite sheet and update <code>background-position</code> values. Harder to maintain as the icon set grows. Cannot use CSS-only styling (color changes require a new sprite).',

    h3_7b: 'Base64 Inline Images',
    p7_inline_pros: '<strong>Pros:</strong> Zero HTTP requests. Self-contained — no external dependencies. Ideal for single-file HTML documents, email templates, and portable widgets.',
    p7_inline_cons: '<strong>Cons:</strong> Not cached separately — embedded in HTML/CSS, so each page load re-sends the image bytes. Every page that shares the same icon must include its own copy of the Base64 string.',
    p7_verdict: '<strong>Verdict:</strong> With HTTP/2, both sprites and Base64 are less important because the browser multiplexes many small requests over a single connection. Prefer external files with a CDN for most production cases.',

    h2_8: '8. Performance: When to Use Base64 vs. External Images',
    p8_1: 'Base64 embedding is a performance trade-off, not a universal optimization:',
    h3_8a: 'Use Base64 When:',
    p8_use: '<ul><li><strong>Image is under 5 KB</strong> — the saved HTTP request outweighs the 33% size overhead</li><li><strong>Image is used exactly once</strong> — no caching benefit would be lost</li><li><strong>Self-contained deliverable</strong> — email, portable HTML report, single-file widget</li><li><strong>Critical above-the-fold image</strong> — must render before the next paint without waiting for a network round-trip</li><li><strong>HTTP/1.1 connection overhead</strong> — each request carries ~200 B of headers; inlining tiny images avoids this (less relevant under HTTP/2)</li></ul>',
    h3_8b: 'Avoid Base64 When:',
    p8_avoid: '<ul><li><strong>Image is over 10 KB</strong> — size overhead exceeds the latency saved by eliminating one request</li><li><strong>Image is reused across many pages</strong> — an external file loads once and stays cached; Base64 is re-transmitted with every HTML/CSS response</li><li><strong>Image changes frequently</strong> — inlining busts the cache for the entire containing file every time the image changes</li><li><strong>Server-side rendering with many images</strong> — enlarges the HTML payload and delays First Contentful Paint</li><li><strong>HTTP/2 or HTTP/3 context</strong> — multiplexing neutralizes most of the request-count advantage of inlining</li></ul>',
    p8_rule: '<strong>Rule of thumb:</strong> If you would not create a separate file for the image (because it is that small), embed it. Otherwise, serve it externally and leverage the browser cache.',

    h2_9: '9. File Size Impact: The ~33% Overhead',
    p9_1: 'Base64 encodes 3 bytes of binary data as 4 ASCII characters (each character carries 6 bits, and 4 \u00d7 6 = 24 bits = 3 bytes). This ratio produces a <strong>33.33% size increase</strong> in the raw encoded string:',
    p9_2: 'Real-world size comparison:',
    th_original: 'Original',
    th_base64: 'Base64 Size',
    th_overhead: 'Overhead',
    th_verdict: 'Verdict',
    td_v1: 'Recommended — request savings outweigh cost',
    td_v2: 'Marginal — evaluate per use case',
    td_v3: 'Questionable — test carefully',
    td_v4: 'Not recommended — use external file',
    p9_gzip: '<strong>With gzip/brotli compression</strong>, the actual over-the-wire increase is only around <strong>10–15%</strong> rather than the full 33%, because Base64 output (repetitive ASCII patterns) compresses well. Most modern HTTP servers and CDNs apply gzip by default. Factor this into your decision — a 5 KB image at 33% overhead is 6.67 KB uncompressed but closer to 5.5 KB compressed.',
    p9_padding: '<strong>Padding:</strong> Base64 uses <code>=</code> padding characters to ensure the output length is always a multiple of 4. A 10-byte input produces 16 Base64 characters (14 data + 2 padding). Padding can be stripped in some contexts (like JWT) but must be preserved in data URIs.',

    h2_10: '10. Email Embedding: Content-Transfer-Encoding',
    p10_1: 'Email is one of the most important use cases for Base64, but the rules are different from HTML. The MIME email standard defines <strong>Content-Transfer-Encoding</strong> to indicate how a MIME part is encoded:',
    h3_10a: 'Approach A: Inline Data URI (Limited Support)',
    p10_2: 'Embedding a Base64 data URI directly in the <code>src</code> attribute works in Apple Mail and Thunderbird but <strong>Gmail strips it</strong> as a security measure. Outlook support is inconsistent:',
    p10_support: '<strong>Client support:</strong>',
    h3_10b: 'Approach B: CID (Content-ID) Embedding — Recommended',
    p10_3: 'The correct approach for production email is CID embedding using a multipart MIME message. The image is attached as a separate MIME part and referenced by a Content-ID:',
    p10_cid_note: 'CID embedding is supported by Gmail, Outlook, Apple Mail, Thunderbird, and virtually every other email client. It is the <strong>recommended approach</strong> for transactional and marketing email.',

    h2_11: '11. Security Considerations: Data URL XSS Risks',
    p11_1: 'Data URIs are powerful but come with security implications that every developer should understand:',
    h3_11a: 'HTML and JavaScript Injection via data:text/html and data:application/javascript',
    p11_2: 'Data URIs are not restricted to images. A malicious actor can craft a data URI that executes JavaScript:',
    p11_3: 'Modern browsers have progressively restricted data URIs:',
    p11_browser_list: '<ul><li><strong>Chrome 60+:</strong> Blocks <code>data:text/html</code> navigations from the top-level address bar</li><li><strong>Firefox:</strong> Blocks cross-origin <code>data:</code> navigations</li><li><strong>Safari:</strong> Restricts data URI usage in iframes</li><li><strong>Content Security Policy (CSP):</strong> The <code>img-src \'self\'</code> directive blocks external images but the <code>img-src data:</code> directive is required to allow data URIs</li></ul>',
    h3_11b: 'CSP Configuration for Data URIs',
    p11_4: 'In your Content Security Policy header, be explicit about allowing data URIs only for images:',
    p11_5: 'Avoid <code>default-src data:</code> — this would allow data URIs for scripts, styles, and other resource types, opening XSS vectors.',
    h3_11c: 'SVG-Specific Risks',
    p11_6: 'Embedded SVG images can contain <code>&lt;script&gt;</code> tags. When an SVG is loaded via <code>&lt;img src="data:image/svg+xml..."&gt;</code>, most browsers sandbox the scripts. However, if you render SVG as inline HTML (via <code>innerHTML</code>), scripts execute. Always sanitize user-supplied SVG content with a library like DOMPurify before rendering.',
    h3_11d: 'Gmail and Data URI Stripping',
    p11_7: 'Gmail deliberately strips all <code>data:</code> URI attributes from emails before rendering. This is a security feature to prevent phishing and XSS attacks via email. Use CID embedding or external HTTPS image URLs for email images.',

    h2_12: '12. Converting Base64 Back to Image',
    h3_12a: 'Browser: Trigger a Download',
    p12_1: 'To decode a Base64 data URI and download it as a file in the browser:',
    h3_12b: 'Browser: Display in an img Tag',
    p12_2: 'Assign the data URI directly to an image element — the browser handles decoding automatically:',
    h3_12c: 'Node.js: Write to Disk',
    p12_3: 'Use <code>Buffer.from()</code> with the <code>"base64"</code> encoding to convert back to binary:',
    h3_12d: 'Python: Decode with base64.b64decode',
    p12_4: 'Python\'s standard library handles the decoding in a single function call:',
    h3_12e: 'Command Line (Linux / macOS)',
    p12_5: 'Decode from a file containing only the Base64 string (no data URI prefix):',
    p12_6: 'You can also use our online tool to decode Base64 data URIs back to image files instantly — no installation required.',

    h2_faq: 'Frequently Asked Questions',

    faq1_q: 'What is the difference between Base64 and a data URI?',
    faq1_a: 'Base64 is the encoding algorithm. A data URI is a URL scheme that wraps Base64-encoded data with a MIME type prefix. So "data:image/png;base64,iVBOR..." is a data URI containing a Base64-encoded PNG. You cannot use a bare Base64 string in an img src — you need the full data URI including the scheme, MIME type, and encoding indicator.',

    faq2_q: 'How do I get the MIME type automatically when converting an image?',
    faq2_a: 'In the browser, the FileReader API returns the full data URI including the correct MIME type based on the file\'s magic bytes — you do not need to guess. In Node.js, use the "mime-types" npm package or "mimetypes" from the standard library in Python. You can also infer the MIME type from the file extension using a lookup table: { "png": "image/png", "jpg": "image/jpeg", "svg": "image/svg+xml", "webp": "image/webp" }.',

    faq3_q: 'Can I use Base64 images in React and Next.js?',
    faq3_a: 'Yes. In React, use a Base64 data URI as the src prop directly: <img src="data:image/png;base64,..." alt="..." />. In Next.js, the next/image component accepts data URIs in the blurDataURL prop for blur-up placeholder effects. For build-time optimization, import images at build time, convert them to data URIs, and export them as module constants. Avoid embedding large images — Next.js image optimization only works with external files.',

    faq4_q: 'Does Base64 embedding affect Core Web Vitals or SEO?',
    faq4_a: 'Base64-embedded images are not separately indexable by search engines — they cannot appear in Google Image Search. For LCP (Largest Contentful Paint), inlining a critical hero image as Base64 can actually improve LCP by eliminating the image request, but only if the image is small. Large Base64 images bloat the HTML payload, delay parsing, and hurt FCP and LCP. For SEO purposes, always use external URLs with descriptive filenames and alt text for content images.',

    faq5_q: 'What is the maximum size for a Base64 data URI?',
    faq5_a: 'RFC 2397 does not define a size limit. Practical browser limits vary: Internet Explorer had a 32 KB limit (legacy). Modern browsers (Chrome, Firefox, Edge, Safari) support data URIs up to several megabytes. However, the performance implications make anything over 10 KB inadvisable. CSS parsers in some older browsers also struggle with very long data URIs embedded in stylesheets.',

    faq6_q: 'Why does my Base64 image show as a broken image icon?',
    faq6_a: 'Common causes: (1) Wrong MIME type — "data:image/png;base64,..." but the data is actually a JPEG; (2) Truncated Base64 string — the string was cut off; Base64 length must be a multiple of 4 (pad with = if needed); (3) Missing or malformed data URI prefix — the "data:" scheme, MIME type, and ";base64," must all be present; (4) Newlines inside the Base64 string — some encoders insert line breaks every 76 characters; remove all whitespace before using in a data URI; (5) Double-encoding — the Base64 string was encoded a second time.',

    faq7_q: 'Is Base64 a form of encryption?',
    faq7_a: 'No. Base64 is purely an encoding scheme — it obscures data visually but provides zero security. Anyone can decode a Base64 string instantly. Do not use Base64 to "hide" sensitive information. For actual encryption, use AES-256 or similar cryptographic algorithms. Base64 is sometimes confused with encryption because encoded data looks like random characters, but it is fully reversible without any key.',

    faq8_q: 'How can I reduce the file size of a Base64-encoded image?',
    faq8_a: 'Optimize the source image before encoding: (1) Use an appropriate format — SVG for vector graphics, WebP or AVIF for photographs; (2) Reduce image dimensions — a 48x48 icon does not need to be 512x512; (3) Compress with tools like Squoosh, ImageOptim, or sharp before encoding; (4) For PNG icons, use indexed color (8-bit) instead of RGBA (32-bit); (5) Consider converting SVGs to URL-encoded format instead of Base64 — it is often 20–30% smaller. Our tool automatically strips unnecessary metadata before encoding.',
  },
  zh: {
    tldr_title: 'TL;DR（速览）',
    tldr_body: '图片 Base64 转换将二进制图像数据编码为 ASCII 文本，格式为 <code>data:image/png;base64,iVBORw0KGgo...</code> 这样的数据 URI，可直接嵌入 HTML、CSS、JavaScript 或邮件中，省去一次 HTTP 请求。编码后文件大小增加约 33%。5 KB 以下的小图适合用 Base64，较大的图像应作为外部文件提供以获得更好的缓存和性能。',

    key_title: '核心要点',
    key_1: 'Base64 将每 3 字节编码为 4 个 ASCII 字符，大小增加约 33%。',
    key_2: '数据 URI 适用于 <code>img src</code>、CSS <code>url()</code>、JavaScript 字符串和邮件附件。',
    key_3: 'MIME 类型决定浏览器如何解码数据：<code>image/png</code>、<code>image/jpeg</code>、<code>image/svg+xml</code>、<code>image/webp</code>。',
    key_4: 'FileReader API（浏览器）和 <code>fs.readFileSync</code> + Buffer（Node.js）是最常见的两种转换方式。',
    key_5: 'Gmail 会过滤数据 URI，HTML 邮件请使用 CID 嵌入或外部 URL。',
    key_6: '使用 gzip/brotli 压缩后，实际传输开销仅约 10–15%，而非 33%。',

    intro: '将图片转为 Base64，意味着将原始二进制像素编码为可打印的 ASCII 字符，使图片可以内嵌在文本负载中——HTML 文件、JSON 对象、CSS 样式表或 MIME 邮件。本指南涵盖<strong>你需要了解的一切</strong>：数据 URI 格式、浏览器和 Node.js 转换代码、Python 脚本、性能权衡、MIME 类型、邮件嵌入、安全注意事项，以及如何将 Base64 解码回图像文件。',

    try_tool: '试用我们的免费图片转 Base64 工具 \u2192',

    h2_1: '1. 什么是图片 Base64 转换？',
    p1_1: 'Base64 是 <strong>RFC 4648</strong> 定义的二进制转文本编码方案。它将每 6 位二进制数据映射为 64 个可打印 ASCII 字符之一（A–Z、a–z、0–9、+、/）。由于大多数文本格式（HTTP 头部、HTML 属性、CSS 字符串、JSON 值）不能包含任意二进制字节，Base64 提供了一种通用方式将任何二进制文件嵌入为纯文本。',
    p1_2: '将图片编码为 Base64 后，输出被包装在<strong>数据 URI</strong>（RFC 2397）中：',
    p1_3: '各部分的含义：',
    p1_list: '<ul><li><code>data:</code> — URI 方案</li><li><code>image/png</code> — MIME 类型（告诉浏览器如何解释字节）</li><li><code>;base64</code> — 编码指示符</li><li><code>,iVBORw0KGgo...</code> — Base64 编码的图像字节</li></ul>',
    p1_4: '所有现代浏览器（Chrome、Firefox、Safari、Edge）都支持数据 URI，可在任何接受 URL 的地方使用：<code>src</code> 属性、CSS <code>url()</code>、JavaScript <code>Image</code> 对象、Canvas API 等。',

    h2_2: '2. HTML 和 CSS 中的数据 URL',
    h3_2a: 'HTML img src',
    p2_1: 'Base64 图片最常见的用法是替换 <code>&lt;img&gt;</code> 标签的 <code>src</code> URL。浏览器内联解码数据 URI 并渲染图片，无需网络请求：',
    p2_2: '1\u00d71 透明追踪像素——节省一次 HTTP 往返的经典用例：',
    p2_tip: '<strong>无障碍提示：</strong>始终包含 <code>alt</code> 文本。纯装饰性图片使用 <code>alt=""</code>。',

    h3_2b: 'CSS background-image',
    p2_3: '数据 URI 可在 CSS <code>url()</code> 函数中使用，非常适合需要随样式表一起加载的小图标、渐变和 UI 元素：',
    p2_4: '在 CSS 中嵌入 SVG 图像有两种选择：',
    p2_svg_list: '<ul><li><strong>Base64：</strong><code>url(data:image/svg+xml;base64,...)</code> — 通用浏览器支持</li><li><strong>URL 编码：</strong><code>url("data:image/svg+xml,%3Csvg...")</code> — 输出更小，因为 SVG 已经是文本；没有二进制到文本的开销</li></ul>',
    p2_svg_tip: '<strong>性能提示：</strong>CSS 中优先对 SVG 使用 URL 编码而非 Base64——编码输出更小，浏览器还能跳过 Base64 解码步骤。',

    h3_2c: 'JavaScript Image 对象与 Canvas',
    p2_5: '你可以像普通 URL 一样将数据 URI 赋给 <code>image.src</code>。这对于从数据源或 API 预加载图片很有用：',

    h2_3: '3. 在 JavaScript（浏览器）中转换图片',
    h3_3a: 'FileReader API — 文件输入',
    p3_1: '<strong>FileReader API</strong> 是浏览器将用户选择的文件转换为 Base64 数据 URI 的标准方式。它完全异步且无需服务器介入：',
    p3_promise: '现代 async/await 代码的 Promise 封装：',

    h3_3b: 'Canvas API — 跨域和 DOM 图片',
    p3_2: '对于已在 DOM 中渲染（或从 URL 加载）的图片，<strong>Canvas API</strong> 允许你绘制图片并将其导出为数据 URI。输出 MIME 类型和质量可配置：',
    p3_cors: '<strong>CORS 注意：</strong>将跨域图片绘制到 Canvas 会污染画布，调用 <code>toDataURL()</code> 时会抛出安全错误。远程服务器必须设置 <code>Access-Control-Allow-Origin: *</code>，且你必须用 <code>crossOrigin="anonymous"</code> 加载图片。',

    h3_3c: 'Fetch API — 远程 URL',
    p3_3: '将远程 URL（同源或启用 CORS）的图片转换为 Base64：',

    h2_4: '4. 在 Node.js 中转换图片',
    h3_4a: '同步方式：fs.readFileSync + Buffer',
    p4_1: 'Node.js 通过 <code>Buffer</code> 内置支持 Base64。这是构建脚本和 CLI 工具最简单的方式：',

    h3_4b: '异步方式：fs.promises.readFile',
    p4_2: '对于生产服务器，优先使用异步版本以避免阻塞事件循环：',

    h3_4c: '反向转换：Base64 转图像文件',
    p4_3: '在 Node.js 中将 Base64 字符串解码回二进制文件：',

    h2_5: '5. 在 Python 中转换图片',
    h3_5a: 'base64 模块',
    p5_1: 'Python 标准库的 <code>base64</code> 模块无需外部依赖即可处理编码和解码：',
    p5_2: '使用 <code>pathlib</code> 的更现代写法：',
    p5_tip: '<strong>提示：</strong>使用 <code>mimetypes.guess_type()</code> 从文件扩展名自动确定正确的 MIME 类型，而不是硬编码。',

    h3_5b: '批量处理多张图片',
    p5_3: '将整个目录的图片转换为内联 CSS 精灵文件：',

    h2_6: '6. 常见图像格式的 MIME 类型',
    p6_1: '数据 URI 中的 MIME 类型告诉浏览器使用哪个图像解码器。类型错误会导致图片静默渲染失败：',
    th_format: '格式',
    th_mime: 'MIME 类型',
    th_transparency: '透明度',
    th_animation: '动画',
    th_best_for: '最佳用途',
    td_png_for: '图标、UI 元素、截图——无损压缩',
    td_jpeg_for: '照片——避免 Base64（文件较大）',
    td_svg_for: 'Logo、图标、插图——CSS 中优先 URL 编码',
    td_gif_for: '简单动画、微型图标',
    td_webp_for: 'PNG/JPEG 的现代替代——同质量下文件更小',
    td_avif_for: '下一代格式——最小体积但 Base64 工具链有限',
    td_ico_for: '浏览器 favicon（兼容旧版）',
    td_yes: '是',
    td_no: '否',
    td_partial: '部分支持',
    p6_note: '<strong>注意：</strong>对于 <code>image/svg+xml</code>，在很多场景下完全不需要 Base64——可以使用 URL 编码的 SVG，甚至在 HTML 中直接用内联 <code>&lt;svg&gt;</code> 元素。只有当值必须是不含特殊字符的单一连续字符串时，才需要 Base64。',

    h2_7: '7. CSS 精灵图 vs. Base64 内联图片',
    p7_1: 'HTTP/2 之前，CSS 精灵图是减少图标 HTTP 请求的主流技术。Base64 内联图片是另一种各有权衡的替代方案：',
    h3_7a: 'CSS 精灵图',
    p7_sprite_pros: '<strong>优点：</strong>文件被浏览器缓存并跨页面共享。合并图片只需下载一次并无限期留在浏览器缓存中。更新一个图标不会使其他图标的缓存失效。',
    p7_sprite_cons: '<strong>缺点：</strong>需要构建步骤来生成精灵表并更新 <code>background-position</code> 值。随着图标集增长维护难度增加。无法使用纯 CSS 样式（改变颜色需要新的精灵图）。',

    h3_7b: 'Base64 内联图片',
    p7_inline_pros: '<strong>优点：</strong>零 HTTP 请求。自包含——无外部依赖。非常适合单文件 HTML 文档、邮件模板和便携小部件。',
    p7_inline_cons: '<strong>缺点：</strong>无法单独缓存——嵌入在 HTML/CSS 中，每次页面加载都会重新发送图片字节。共享同一图标的每个页面都必须包含自己的 Base64 字符串副本。',
    p7_verdict: '<strong>结论：</strong>有了 HTTP/2，精灵图和 Base64 的重要性都降低了，因为浏览器可以通过单个连接多路复用许多小请求。大多数生产场景建议使用配合 CDN 的外部文件。',

    h2_8: '8. 性能：Base64 vs. 外部图片的选择',
    p8_1: 'Base64 嵌入是一种性能权衡，并非万能优化：',
    h3_8a: '适合使用 Base64 的情况：',
    p8_use: '<ul><li><strong>图片小于 5 KB</strong>——节省的 HTTP 请求超过 33% 的大小开销</li><li><strong>图片只使用一次</strong>——不会损失缓存收益</li><li><strong>自包含交付物</strong>——邮件、便携 HTML 报告、单文件小部件</li><li><strong>首屏关键图片</strong>——需要在下一次绘制前渲染，不能等待网络往返</li><li><strong>HTTP/1.1 连接开销</strong>——每个请求携带约 200 字节的头部；内联微型图片可避免此开销（HTTP/2 下不太相关）</li></ul>',
    h3_8b: '应该避免 Base64 的情况：',
    p8_avoid: '<ul><li><strong>图片大于 10 KB</strong>——大小开销超过消除一次请求节省的延迟</li><li><strong>图片在多个页面复用</strong>——外部文件只加载一次并保持缓存；Base64 随每次 HTML/CSS 响应重新传输</li><li><strong>图片频繁变更</strong>——内联会在图片每次变更时使整个包含文件的缓存失效</li><li><strong>服务端渲染包含大量图片</strong>——会增大 HTML 负载并延迟首次内容绘制</li><li><strong>HTTP/2 或 HTTP/3 环境</strong>——多路复用抵消了内联在请求数方面的大部分优势</li></ul>',
    p8_rule: '<strong>经验法则：</strong>如果这张图片小到你不会为它创建单独文件，就内联它。否则，作为外部文件提供并充分利用浏览器缓存。',

    h2_9: '9. 文件大小影响：约 33% 的开销',
    p9_1: 'Base64 将 3 字节二进制数据编码为 4 个 ASCII 字符（每个字符携带 6 位，4 \u00d7 6 = 24 位 = 3 字节）。这个比例使编码字符串的大小<strong>增加 33.33%</strong>：',
    p9_2: '真实大小对比：',
    th_original: '原始大小',
    th_base64: 'Base64 大小',
    th_overhead: '开销',
    th_verdict: '建议',
    td_v1: '推荐——节省请求超过开销',
    td_v2: '勉强——视具体情况评估',
    td_v3: '存疑——需仔细测试',
    td_v4: '不推荐——使用外部文件',
    p9_gzip: '<strong>使用 gzip/brotli 压缩后</strong>，实际传输增加仅约 <strong>10–15%</strong>，而非完整的 33%，因为 Base64 输出（重复的 ASCII 模式）压缩效果很好。大多数现代 HTTP 服务器和 CDN 默认应用 gzip。在决策时考虑这一点——一张 5 KB 的图片经过 33% 开销后未压缩为 6.67 KB，但压缩后约为 5.5 KB。',
    p9_padding: '<strong>填充：</strong>Base64 使用 <code>=</code> 填充字符确保输出长度始终是 4 的倍数。10 字节输入产生 16 个 Base64 字符（14 个数据字符 + 2 个填充字符）。填充在某些场景（如 JWT）中可以省略，但在数据 URI 中必须保留。',

    h2_10: '10. 邮件嵌入：Content-Transfer-Encoding',
    p10_1: '电子邮件是 Base64 最重要的使用场景之一，但规则与 HTML 不同。MIME 邮件标准定义了 <strong>Content-Transfer-Encoding</strong> 来指示 MIME 部分的编码方式：',
    h3_10a: '方法 A：内联数据 URI（支持有限）',
    p10_2: '将 Base64 数据 URI 直接嵌入 <code>src</code> 属性在 Apple Mail 和 Thunderbird 中有效，但 <strong>Gmail 会将其过滤</strong>作为安全措施。Outlook 的支持不一致：',
    p10_support: '<strong>客户端支持：</strong>',
    h3_10b: '方法 B：CID（Content-ID）嵌入——推荐',
    p10_3: '生产邮件的正确方式是使用多部分 MIME 消息进行 CID 嵌入。图片作为独立的 MIME 部分附加并通过 Content-ID 引用：',
    p10_cid_note: 'CID 嵌入被 Gmail、Outlook、Apple Mail、Thunderbird 以及几乎所有其他邮件客户端支持。这是<strong>事务性和营销邮件的推荐方式</strong>。',

    h2_11: '11. 安全注意事项：数据 URL XSS 风险',
    p11_1: '数据 URI 功能强大，但存在每位开发者都应了解的安全隐患：',
    h3_11a: '通过 data:text/html 和 data:application/javascript 注入 HTML 和 JavaScript',
    p11_2: '数据 URI 不限于图片。恶意行为者可以构造执行 JavaScript 的数据 URI：',
    p11_3: '现代浏览器已逐步限制数据 URI：',
    p11_browser_list: '<ul><li><strong>Chrome 60+：</strong>阻止从顶级地址栏导航至 <code>data:text/html</code></li><li><strong>Firefox：</strong>阻止跨域 <code>data:</code> 导航</li><li><strong>Safari：</strong>限制 iframe 中的数据 URI 使用</li><li><strong>内容安全策略（CSP）：</strong><code>img-src \'self\'</code> 指令会阻止外部图片，但允许数据 URI 需要 <code>img-src data:</code> 指令</li></ul>',
    h3_11b: '数据 URI 的 CSP 配置',
    p11_4: '在 Content Security Policy 头部中，明确指定仅允许图片使用数据 URI：',
    p11_5: '避免使用 <code>default-src data:</code>——这会允许脚本、样式等资源类型使用数据 URI，打开 XSS 攻击面。',
    h3_11c: 'SVG 特有风险',
    p11_6: '嵌入的 SVG 图片可以包含 <code>&lt;script&gt;</code> 标签。当 SVG 通过 <code>&lt;img src="data:image/svg+xml..."&gt;</code> 加载时，大多数浏览器会对脚本进行沙箱化。但如果通过 <code>innerHTML</code> 将 SVG 渲染为内联 HTML，脚本会执行。在渲染用户提供的 SVG 内容之前，始终使用 DOMPurify 等库进行净化。',
    h3_11d: 'Gmail 过滤数据 URI',
    p11_7: 'Gmail 在渲染前会故意从邮件中去除所有 <code>data:</code> URI 属性。这是防止邮件中钓鱼和 XSS 攻击的安全特性。邮件图片请使用 CID 嵌入或外部 HTTPS 图片 URL。',

    h2_12: '12. 将 Base64 解码回图片',
    h3_12a: '浏览器：触发下载',
    p12_1: '在浏览器中解码 Base64 数据 URI 并作为文件下载：',
    h3_12b: '浏览器：在 img 标签中显示',
    p12_2: '直接将数据 URI 赋给图片元素——浏览器自动处理解码：',
    h3_12c: 'Node.js：写入磁盘',
    p12_3: '使用带 <code>"base64"</code> 编码的 <code>Buffer.from()</code> 转换回二进制：',
    h3_12d: 'Python：使用 base64.b64decode 解码',
    p12_4: 'Python 标准库通过单个函数调用处理解码：',
    h3_12e: '命令行（Linux / macOS）',
    p12_5: '从仅包含 Base64 字符串（无数据 URI 前缀）的文件中解码：',
    p12_6: '你也可以使用我们的在线工具即时将 Base64 数据 URI 解码回图像文件——无需安装。',

    h2_faq: '常见问题',

    faq1_q: 'Base64 和数据 URI 有什么区别？',
    faq1_a: 'Base64 是编码算法。数据 URI 是一种 URL 方案，用 MIME 类型前缀包装 Base64 编码的数据。所以 "data:image/png;base64,iVBOR..." 是包含 Base64 编码 PNG 的数据 URI。你不能在 img src 中直接使用裸 Base64 字符串——需要完整的数据 URI，包括方案、MIME 类型和编码指示符。',

    faq2_q: '转换图片时如何自动获取 MIME 类型？',
    faq2_a: '在浏览器中，FileReader API 根据文件的魔术字节返回包含正确 MIME 类型的完整数据 URI——无需猜测。在 Node.js 中，使用 "mime-types" npm 包；在 Python 中使用标准库的 "mimetypes"。也可以通过文件扩展名查找表推断 MIME 类型：{ "png": "image/png", "jpg": "image/jpeg", "svg": "image/svg+xml", "webp": "image/webp" }。',

    faq3_q: '可以在 React 和 Next.js 中使用 Base64 图片吗？',
    faq3_a: '可以。在 React 中，直接将 Base64 数据 URI 用作 src 属性：<img src="data:image/png;base64,..." alt="..." />。在 Next.js 中，next/image 组件在 blurDataURL 属性中接受数据 URI 用于渐进式加载效果。对于构建时优化，在构建时导入图片，转换为数据 URI 并作为模块常量导出。避免嵌入大图——Next.js 图片优化仅适用于外部文件。',

    faq4_q: 'Base64 嵌入会影响核心 Web 指标或 SEO 吗？',
    faq4_a: 'Base64 嵌入的图片无法被搜索引擎单独索引——不会出现在 Google 图片搜索中。对于 LCP（最大内容绘制），将关键首图内联为 Base64 实际上可以通过消除图片请求改善 LCP，但仅适用于小图。大型 Base64 图片会使 HTML 负载膨胀，延迟解析，损害 FCP 和 LCP。出于 SEO 考虑，内容图片始终使用带描述性文件名和 alt 文本的外部 URL。',

    faq5_q: 'Base64 数据 URI 的最大大小是多少？',
    faq5_a: 'RFC 2397 未定义大小限制。实际浏览器限制各有不同：Internet Explorer 有 32 KB 的限制（旧版）。现代浏览器（Chrome、Firefox、Edge、Safari）支持数兆字节的数据 URI。但性能影响使超过 10 KB 的情况不可取。某些旧版浏览器的 CSS 解析器对嵌入样式表中的超长数据 URI 也存在问题。',

    faq6_q: '为什么我的 Base64 图片显示为损坏图标？',
    faq6_a: '常见原因：(1) MIME 类型错误——如写了 "data:image/png;base64,..." 但数据实际上是 JPEG；(2) Base64 字符串被截断——字符串被切断；Base64 长度必须是 4 的倍数（必要时用 = 填充）；(3) 数据 URI 前缀缺失或格式错误——"data:" 方案、MIME 类型和 ";base64," 必须全部存在；(4) Base64 字符串内有换行符——某些编码器每 76 个字符插入换行；在数据 URI 中使用前去除所有空白字符；(5) 双重编码——Base64 字符串被二次编码。',

    faq7_q: 'Base64 是一种加密方式吗？',
    faq7_a: '不是。Base64 纯粹是一种编码方案——它在视觉上混淆数据但提供零安全性。任何人都可以立即解码 Base64 字符串。不要使用 Base64 来"隐藏"敏感信息。真正的加密请使用 AES-256 等密码学算法。Base64 有时被误认为是加密，因为编码后的数据看起来像随机字符，但它完全可以无需密钥地逆转。',

    faq8_q: '如何减小 Base64 编码图片的文件大小？',
    faq8_a: '在编码前优化源图片：(1) 使用合适的格式——矢量图用 SVG，照片用 WebP 或 AVIF；(2) 减小图片尺寸——48x48 的图标不需要是 512x512；(3) 编码前用 Squoosh、ImageOptim 或 sharp 等工具压缩；(4) PNG 图标使用索引色（8 位）而非 RGBA（32 位）；(5) 考虑将 SVG 转换为 URL 编码格式而非 Base64——通常小 20–30%。我们的工具在编码前会自动去除不必要的元数据。',
  },
};

export default function ImageToBase64OnlineGuide({ lang }: { lang: string }) {
  const tx = translations[lang] || translations['en'];

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
      {
        '@type': 'Question',
        name: tx.faq6_q,
        acceptedAnswer: { '@type': 'Answer', text: tx.faq6_a },
      },
      {
        '@type': 'Question',
        name: tx.faq7_q,
        acceptedAnswer: { '@type': 'Answer', text: tx.faq7_a },
      },
      {
        '@type': 'Question',
        name: tx.faq8_q,
        acceptedAnswer: { '@type': 'Answer', text: tx.faq8_a },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* TL;DR Box */}
      <div style={{ background: '#f0f9ff', border: '1px solid #bae6fd', borderRadius: 8, padding: '16px 20px', marginBottom: 24 }}>
        <strong style={{ display: 'block', marginBottom: 6, color: '#0369a1', fontSize: 15 }}>{tx.tldr_title}</strong>
        <p style={{ margin: 0, lineHeight: 1.7 }} dangerouslySetInnerHTML={{ __html: tx.tldr_body }} />
      </div>

      {/* Key Takeaways Box */}
      <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 8, padding: '16px 20px', marginBottom: 28 }}>
        <strong style={{ display: 'block', marginBottom: 10, color: '#1e293b', fontSize: 15 }}>{tx.key_title}</strong>
        <ul style={{ margin: 0, paddingLeft: 20, lineHeight: 1.8 }}>
          <li dangerouslySetInnerHTML={{ __html: tx.key_1 }} />
          <li dangerouslySetInnerHTML={{ __html: tx.key_2 }} />
          <li dangerouslySetInnerHTML={{ __html: tx.key_3 }} />
          <li dangerouslySetInnerHTML={{ __html: tx.key_4 }} />
          <li dangerouslySetInnerHTML={{ __html: tx.key_5 }} />
          <li dangerouslySetInnerHTML={{ __html: tx.key_6 }} />
        </ul>
      </div>

      <p dangerouslySetInnerHTML={{ __html: tx.intro }} />

      <p>
        <Link href={`/${lang}/tools/base64-image-converter`} style={{ fontWeight: 600 }}>
          {tx.try_tool}
        </Link>
      </p>

      {/* Section 1 */}
      <h2>{tx.h2_1}</h2>
      <p dangerouslySetInnerHTML={{ __html: tx.p1_1 }} />
      <p dangerouslySetInnerHTML={{ __html: tx.p1_2 }} />
      <pre><code>{`data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==

# General syntax:
data:[<mediatype>][;base64],<data>

# Examples by format:
data:image/png;base64,iVBORw0KGgo...
data:image/jpeg;base64,/9j/4AAQSkZJRgAB...
data:image/svg+xml;base64,PHN2ZyB4bWxu...
data:image/webp;base64,UklGRlYAAABXRUJQ...
data:image/gif;base64,R0lGODlhAQABAAAAACH5...`}</code></pre>
      <p dangerouslySetInnerHTML={{ __html: tx.p1_3 }} />
      <div dangerouslySetInnerHTML={{ __html: tx.p1_list }} />
      <p dangerouslySetInnerHTML={{ __html: tx.p1_4 }} />

      {/* Section 2 */}
      <h2>{tx.h2_2}</h2>

      <h3>{tx.h3_2a}</h3>
      <p dangerouslySetInnerHTML={{ __html: tx.p2_1 }} />
      <pre><code>{`<!-- Base64 PNG in img src -->
<img
  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmH..."
  alt="App logo"
  width="64"
  height="64"
/>

<!-- Base64 SVG in img src -->
<img
  src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmci..."
  alt="Checkmark icon"
  width="24"
  height="24"
/>`}</code></pre>
      <p dangerouslySetInnerHTML={{ __html: tx.p2_2 }} />
      <pre><code>{`<!-- 1x1 transparent GIF tracking pixel -->
<img
  src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
  alt=""
  width="1"
  height="1"
  style="display:none"
/>

<!-- 1x1 transparent PNG (smaller alternative) -->
<img
  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="
  alt=""
/>`}</code></pre>
      <blockquote>
        <p dangerouslySetInnerHTML={{ __html: tx.p2_tip }} />
      </blockquote>

      <h3>{tx.h3_2b}</h3>
      <p dangerouslySetInnerHTML={{ __html: tx.p2_3 }} />
      <pre><code>{`/* Small PNG icon as CSS background */
.notification-dot {
  display: inline-block;
  width: 8px;
  height: 8px;
  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76L...);
  background-size: contain;
  background-repeat: no-repeat;
}

/* WebP hero background */
.hero {
  background-image: url(data:image/webp;base64,UklGRlYAAABXRUJQVlA4IEoA...);
  background-size: cover;
  background-position: center;
  height: 400px;
}`}</code></pre>
      <p dangerouslySetInnerHTML={{ __html: tx.p2_4 }} />
      <div dangerouslySetInnerHTML={{ __html: tx.p2_svg_list }} />
      <pre><code>{`/* SVG as Base64 in CSS */
.arrow-down {
  background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiI+PHBhdGggZD0iTTQgNmw0IDQgNC00IiBmaWxsPSJub25lIiBzdHJva2U9IiM2NjYiIHN0cm9rZS13aWR0aD0iMiIvPjwvc3ZnPg==);
}

/* SVG as URL-encoded in CSS (often 20% smaller) */
.arrow-down-alt {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16'%3E%3Cpath d='M4 6l4 4 4-4' fill='none' stroke='%23666' stroke-width='2'/%3E%3C/svg%3E");
}`}</code></pre>
      <blockquote>
        <p dangerouslySetInnerHTML={{ __html: tx.p2_svg_tip }} />
      </blockquote>

      <h3>{tx.h3_2c}</h3>
      <p dangerouslySetInnerHTML={{ __html: tx.p2_5 }} />
      <pre><code>{`// Preload an image from a Base64 data URI
const image = new Image();
image.src = 'data:image/png;base64,iVBORw0KGgoAAAAN...';
image.onload = () => {
  console.log('Image loaded — dimensions:', image.width, 'x', image.height);
  document.body.appendChild(image);
};

// Use in Canvas
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
image.onload = () => ctx.drawImage(image, 0, 0);`}</code></pre>

      {/* Section 3 */}
      <h2>{tx.h2_3}</h2>

      <h3>{tx.h3_3a}</h3>
      <p dangerouslySetInnerHTML={{ __html: tx.p3_1 }} />
      <pre><code>{`// FileReader API: convert file input to Base64 data URI
const fileInput = document.querySelector('input[type="file"]');

fileInput.addEventListener('change', (event) => {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();

  reader.onload = (e) => {
    const dataUri = e.target.result;
    // "data:image/png;base64,iVBORw0KGgoAAAAN..."

    // Preview in an <img>
    document.getElementById('preview').src = dataUri;

    // Extract just the Base64 part (without the prefix)
    const base64Only = dataUri.split(',')[1];

    // Get MIME type from the data URI
    const mimeType = dataUri.match(/data:([^;]+)/)[1]; // "image/png"
    console.log({ mimeType, base64Length: base64Only.length });
  };

  reader.onerror = () => console.error('FileReader error');
  reader.readAsDataURL(file);  // Triggers onload with data URI
});`}</code></pre>
      <p dangerouslySetInnerHTML={{ __html: tx.p3_promise }} />
      <pre><code>{`// Promise wrapper — use with async/await
function fileToDataUri(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload  = (e) => resolve(e.target.result);
    reader.onerror = ()  => reject(new Error('Failed to read file'));
    reader.readAsDataURL(file);
  });
}

// Usage
async function handleImageUpload(event) {
  const file = event.target.files[0];
  try {
    const dataUri = await fileToDataUri(file);
    const img = document.createElement('img');
    img.src = dataUri;
    document.body.appendChild(img);
  } catch (err) {
    console.error(err);
  }
}`}</code></pre>

      <h3>{tx.h3_3b}</h3>
      <p dangerouslySetInnerHTML={{ __html: tx.p3_2 }} />
      <pre><code>{`// Canvas API: render any image element and export as data URI
function imageElementToBase64(
  imgElement,
  format = 'image/png',   // 'image/jpeg', 'image/webp'
  quality = 0.92           // 0.0–1.0 (only used for JPEG/WebP)
) {
  const canvas = document.createElement('canvas');
  canvas.width  = imgElement.naturalWidth;
  canvas.height = imgElement.naturalHeight;

  const ctx = canvas.getContext('2d');
  ctx.drawImage(imgElement, 0, 0);

  return canvas.toDataURL(format, quality);
}

// Convert a DOM image
const img = document.querySelector('#my-logo');
img.onload = () => {
  const pngUri  = imageElementToBase64(img, 'image/png');
  const jpegUri = imageElementToBase64(img, 'image/jpeg', 0.8);
  const webpUri = imageElementToBase64(img, 'image/webp', 0.8);
  console.log('PNG  length:', pngUri.length);
  console.log('JPEG length:', jpegUri.length);  // Usually much smaller for photos
  console.log('WebP length:', webpUri.length);  // Usually smallest
};`}</code></pre>
      <blockquote>
        <p dangerouslySetInnerHTML={{ __html: tx.p3_cors }} />
      </blockquote>

      <h3>{tx.h3_3c}</h3>
      <p dangerouslySetInnerHTML={{ __html: tx.p3_3 }} />
      <pre><code>{`// Fetch + ArrayBuffer: convert remote image URL to Base64
async function urlToBase64(imageUrl) {
  const response = await fetch(imageUrl);
  const blob = await response.blob();

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload  = (e) => resolve(e.target.result);
    reader.onerror = ()  => reject(new Error('Conversion failed'));
    reader.readAsDataURL(blob);  // blob preserves the MIME type
  });
}

// Usage
const dataUri = await urlToBase64('https://example.com/logo.png');
document.getElementById('logo').src = dataUri;`}</code></pre>

      {/* Section 4 */}
      <h2>{tx.h2_4}</h2>

      <h3>{tx.h3_4a}</h3>
      <p dangerouslySetInnerHTML={{ __html: tx.p4_1 }} />
      <pre><code>{`const fs   = require('fs');
const path = require('path');

// MIME type lookup by extension
const MIME_TYPES = {
  png:  'image/png',
  jpg:  'image/jpeg',
  jpeg: 'image/jpeg',
  gif:  'image/gif',
  svg:  'image/svg+xml',
  webp: 'image/webp',
  avif: 'image/avif',
  ico:  'image/x-icon',
};

function imageToBase64(filePath) {
  const ext      = path.extname(filePath).slice(1).toLowerCase();
  const mimeType = MIME_TYPES[ext] || 'application/octet-stream';
  const data     = fs.readFileSync(filePath);         // Buffer
  const base64   = data.toString('base64');           // Base64 string
  return \`data:\${mimeType};base64,\${base64}\`;
}

// Usage
const dataUri = imageToBase64('./logo.png');
console.log(dataUri.substring(0, 60) + '...');
// data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABAAA...

// Extract just the Base64 string (no prefix) for APIs
const base64Only = fs.readFileSync('./logo.png').toString('base64');`}</code></pre>

      <h3>{tx.h3_4b}</h3>
      <p dangerouslySetInnerHTML={{ __html: tx.p4_2 }} />
      <pre><code>{`const fs   = require('fs/promises');
const path = require('path');

async function imageToBase64Async(filePath) {
  const ext      = path.extname(filePath).slice(1).toLowerCase();
  const mimeType = { png: 'image/png', jpg: 'image/jpeg', jpeg: 'image/jpeg',
                     gif: 'image/gif', svg: 'image/svg+xml', webp: 'image/webp' }[ext]
                   || 'application/octet-stream';
  const data   = await fs.readFile(filePath);    // Buffer (async)
  const base64 = data.toString('base64');
  return \`data:\${mimeType};base64,\${base64}\`;
}

// Express.js endpoint: convert uploaded image to Base64 JSON response
app.post('/api/image-to-base64', upload.single('image'), async (req, res) => {
  const dataUri = await imageToBase64Async(req.file.path);
  res.json({ dataUri, size: req.file.size, mimeType: req.file.mimetype });
});`}</code></pre>

      <h3>{tx.h3_4c}</h3>
      <p dangerouslySetInnerHTML={{ __html: tx.p4_3 }} />
      <pre><code>{`const fs = require('fs');

// Input: full data URI like "data:image/png;base64,iVBOR..."
function dataUriToFile(dataUri, outputPath) {
  // Strip the "data:image/png;base64," prefix
  const base64Data = dataUri.replace(/^data:[^;]+;base64,/, '');
  const buffer = Buffer.from(base64Data, 'base64');
  fs.writeFileSync(outputPath, buffer);
  console.log(\`Saved \${buffer.length} bytes to \${outputPath}\`);
}

// Input: bare Base64 string (no data URI prefix)
function base64ToFile(base64String, outputPath) {
  const buffer = Buffer.from(base64String, 'base64');
  fs.writeFileSync(outputPath, buffer);
}

// Usage
dataUriToFile('data:image/png;base64,iVBORw0KGgo...', './output.png');
base64ToFile('iVBORw0KGgoAAAANSUh...', './icon.png');`}</code></pre>

      {/* Section 5 */}
      <h2>{tx.h2_5}</h2>

      <h3>{tx.h3_5a}</h3>
      <p dangerouslySetInnerHTML={{ __html: tx.p5_1 }} />
      <pre><code>{`import base64
import mimetypes

def image_to_data_uri(file_path: str) -> str:
    """Convert an image file to a Base64 data URI."""
    # Auto-detect MIME type from file extension
    mime_type, _ = mimetypes.guess_type(file_path)
    if mime_type is None:
        mime_type = 'application/octet-stream'

    with open(file_path, 'rb') as f:
        raw_bytes = f.read()

    encoded = base64.b64encode(raw_bytes).decode('utf-8')
    return f'data:{mime_type};base64,{encoded}'


def data_uri_to_file(data_uri: str, output_path: str) -> None:
    """Decode a Base64 data URI back to a binary file."""
    # Split at the first comma: "data:image/png;base64," + "<data>"
    _header, data = data_uri.split(',', 1)
    binary = base64.b64decode(data)
    with open(output_path, 'wb') as f:
        f.write(binary)


# Usage
uri = image_to_data_uri('logo.png')
print(f"MIME: image/png, Length: {len(uri)} chars")
print(uri[:80] + '...')
# data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAA...

# Decode back
data_uri_to_file(uri, 'logo_copy.png')`}</code></pre>
      <p dangerouslySetInnerHTML={{ __html: tx.p5_2 }} />
      <pre><code>{`from pathlib import Path
import base64, mimetypes

def image_to_base64_pathlib(image_path: str | Path) -> str:
    path = Path(image_path)
    mime_type, _ = mimetypes.guess_type(path.name)
    mime_type = mime_type or 'application/octet-stream'
    encoded = base64.b64encode(path.read_bytes()).decode()
    return f'data:{mime_type};base64,{encoded}'

# Works with Path objects or string paths
print(image_to_base64_pathlib(Path('icons') / 'logo.svg')[:80])`}</code></pre>
      <blockquote>
        <p dangerouslySetInnerHTML={{ __html: tx.p5_tip }} />
      </blockquote>

      <h3>{tx.h3_5b}</h3>
      <p dangerouslySetInnerHTML={{ __html: tx.p5_3 }} />
      <pre><code>{`import base64, mimetypes
from pathlib import Path

def build_css_sprite(image_dir: str, output_css: str, class_prefix: str = 'img') -> None:
    """Convert all images in a directory to a CSS file with Base64 backgrounds."""
    image_dir = Path(image_dir)
    lines = ['/* Auto-generated Base64 CSS sprite */']

    for img_path in sorted(image_dir.glob('*')):
        if img_path.suffix.lower() not in {'.png', '.jpg', '.jpeg', '.svg', '.webp', '.gif'}:
            continue

        mime_type, _ = mimetypes.guess_type(img_path.name)
        mime_type = mime_type or 'application/octet-stream'
        encoded = base64.b64encode(img_path.read_bytes()).decode()
        data_uri = f'data:{mime_type};base64,{encoded}'

        class_name = f'{class_prefix}-{img_path.stem}'
        lines.append(f'.{class_name} {{')
        lines.append(f'  background-image: url({data_uri});')
        lines.append(f'  background-repeat: no-repeat;')
        lines.append(f'  background-size: contain;')
        lines.append(f'}}')
        lines.append('')

    Path(output_css).write_text('\\n'.join(lines), encoding='utf-8')
    print(f'Generated {output_css} with {len(lines)} lines')

build_css_sprite('./icons', './dist/icons.css', class_prefix='icon')`}</code></pre>

      {/* Section 6 */}
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
          <tr><td>PNG</td><td><code>image/png</code></td><td>{tx.td_yes}</td><td>{tx.td_no}</td><td>{tx.td_png_for}</td></tr>
          <tr><td>JPEG</td><td><code>image/jpeg</code></td><td>{tx.td_no}</td><td>{tx.td_no}</td><td>{tx.td_jpeg_for}</td></tr>
          <tr><td>SVG</td><td><code>image/svg+xml</code></td><td>{tx.td_yes}</td><td>{tx.td_yes}</td><td>{tx.td_svg_for}</td></tr>
          <tr><td>GIF</td><td><code>image/gif</code></td><td>{tx.td_yes}</td><td>{tx.td_yes}</td><td>{tx.td_gif_for}</td></tr>
          <tr><td>WebP</td><td><code>image/webp</code></td><td>{tx.td_yes}</td><td>{tx.td_yes}</td><td>{tx.td_webp_for}</td></tr>
          <tr><td>AVIF</td><td><code>image/avif</code></td><td>{tx.td_yes}</td><td>{tx.td_partial}</td><td>{tx.td_avif_for}</td></tr>
          <tr><td>ICO</td><td><code>image/x-icon</code></td><td>{tx.td_yes}</td><td>{tx.td_no}</td><td>{tx.td_ico_for}</td></tr>
        </tbody>
      </table>
      <p dangerouslySetInnerHTML={{ __html: tx.p6_note }} />

      {/* Section 7 */}
      <h2>{tx.h2_7}</h2>
      <p>{tx.p7_1}</p>

      <h3>{tx.h3_7a}</h3>
      <pre><code>{`/* CSS Sprites — external file, cached by browser */
.icon {
  background-image: url('/sprites/icons.png');
  background-repeat: no-repeat;
  display: inline-block;
  width: 24px;
  height: 24px;
}
.icon-home     { background-position:   0    0; }
.icon-settings { background-position: -24px  0; }
.icon-search   { background-position: -48px  0; }
.icon-user     { background-position: -72px  0; }`}</code></pre>
      <p dangerouslySetInnerHTML={{ __html: tx.p7_sprite_pros }} />
      <p dangerouslySetInnerHTML={{ __html: tx.p7_sprite_cons }} />

      <h3>{tx.h3_7b}</h3>
      <pre><code>{`/* Base64 inline — zero HTTP requests, not cached separately */
.icon-home {
  background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCI+PHBhdGggZD0iTTMgOWw5LTcgOSA3djExYTIgMiAwIDAgMS0yIDJINWEyIDIgMCAwIDEtMi0yeiIvPjwvc3ZnPg==);
  background-repeat: no-repeat;
  background-size: 24px;
  display: inline-block;
  width: 24px;
  height: 24px;
}`}</code></pre>
      <p dangerouslySetInnerHTML={{ __html: tx.p7_inline_pros }} />
      <p dangerouslySetInnerHTML={{ __html: tx.p7_inline_cons }} />
      <blockquote>
        <p dangerouslySetInnerHTML={{ __html: tx.p7_verdict }} />
      </blockquote>

      {/* Section 8 */}
      <h2>{tx.h2_8}</h2>
      <p>{tx.p8_1}</p>
      <h3>{tx.h3_8a}</h3>
      <div dangerouslySetInnerHTML={{ __html: tx.p8_use }} />
      <h3>{tx.h3_8b}</h3>
      <div dangerouslySetInnerHTML={{ __html: tx.p8_avoid }} />
      <blockquote>
        <p dangerouslySetInnerHTML={{ __html: tx.p8_rule }} />
      </blockquote>

      {/* Section 9 */}
      <h2>{tx.h2_9}</h2>
      <p dangerouslySetInnerHTML={{ __html: tx.p9_1 }} />
      <pre><code>{`# The math behind Base64 size increase:
# Base64 encodes 3 bytes → 4 characters
# Ratio: 4/3 = 1.3333... → 33.33% larger

# Example encoding:
# Input:   3 bytes   [0x48 0x65 0x6C]  (binary: "Hel")
# Binary:  01001000 01100101 01101100
# Split 6: 010010 000110 010101 101100
# Index:   18     6      21     44
# Chars:   S      G      V      s       ("SGVs")

# Padding: if input is not a multiple of 3, = is appended
# 1 remaining byte  → 2 Base64 chars + "=="
# 2 remaining bytes → 3 Base64 chars + "="`}</code></pre>
      <p>{tx.p9_2}</p>
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
      <p dangerouslySetInnerHTML={{ __html: tx.p9_gzip }} />
      <p dangerouslySetInnerHTML={{ __html: tx.p9_padding }} />

      {/* Section 10 */}
      <h2>{tx.h2_10}</h2>
      <p dangerouslySetInnerHTML={{ __html: tx.p10_1 }} />

      <h3>{tx.h3_10a}</h3>
      <p dangerouslySetInnerHTML={{ __html: tx.p10_2 }} />
      <pre><code>{`<!-- Inline data URI in email (Apple Mail + Thunderbird only) -->
<html>
<body>
  <img
    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEU..."
    alt="Company Logo"
    width="200"
    height="50"
    style="display:block;"
  />
  <p>Thank you for your order!</p>
</body>
</html>`}</code></pre>
      <p dangerouslySetInnerHTML={{ __html: tx.p10_support }} />
      <table>
        <thead>
          <tr>
            <th>Email Client</th>
            <th>Data URI Support</th>
            <th>CID Support</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>Gmail</td><td style={{ color: '#dc2626' }}>No (strips all data: URIs)</td><td style={{ color: '#16a34a' }}>Yes</td></tr>
          <tr><td>Outlook</td><td style={{ color: '#d97706' }}>Partial (version-dependent)</td><td style={{ color: '#16a34a' }}>Yes</td></tr>
          <tr><td>Apple Mail</td><td style={{ color: '#16a34a' }}>Yes</td><td style={{ color: '#16a34a' }}>Yes</td></tr>
          <tr><td>Thunderbird</td><td style={{ color: '#16a34a' }}>Yes</td><td style={{ color: '#16a34a' }}>Yes</td></tr>
          <tr><td>Yahoo Mail</td><td style={{ color: '#dc2626' }}>No</td><td style={{ color: '#16a34a' }}>Yes</td></tr>
        </tbody>
      </table>

      <h3>{tx.h3_10b}</h3>
      <p dangerouslySetInnerHTML={{ __html: tx.p10_3 }} />
      <pre><code>{`// Node.js + Nodemailer: CID image embedding (works in all clients)
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({ /* SMTP config */ });

await transporter.sendMail({
  from: 'no-reply@yourcompany.com',
  to: 'customer@example.com',
  subject: 'Your Order Confirmation',
  html: \`
    <div style="font-family: Arial, sans-serif;">
      <img
        src="cid:company-logo"
        alt="Company Logo"
        width="180"
        height="45"
        style="display:block; margin-bottom:20px;"
      />
      <h1>Order #12345 Confirmed!</h1>
      <p>Thanks for your purchase. We will ship within 24 hours.</p>
      <img
        src="cid:product-image"
        alt="Your product"
        width="300"
        height="300"
      />
    </div>
  \`,
  attachments: [
    {
      filename: 'logo.png',
      path: './assets/logo.png',
      cid: 'company-logo',     // matches src="cid:company-logo"
    },
    {
      filename: 'product.jpg',
      path: './assets/product.jpg',
      cid: 'product-image',    // matches src="cid:product-image"
    },
  ],
});`}</code></pre>
      <blockquote>
        <p dangerouslySetInnerHTML={{ __html: tx.p10_cid_note }} />
      </blockquote>

      {/* Section 11 */}
      <h2>{tx.h2_11}</h2>
      <p>{tx.p11_1}</p>

      <h3>{tx.h3_11a}</h3>
      <p dangerouslySetInnerHTML={{ __html: tx.p11_2 }} />
      <pre><code>{`// Malicious data URI examples — DO NOT execute
// data:text/html,<script>alert('XSS')</script>
// data:text/html;base64,PHNjcmlwdD5hbGVydCgnWFNTJyk8L3NjcmlwdD4=
// data:application/javascript,alert(document.cookie)

// These can be used to steal cookies, perform CSRF, and exfiltrate data
// if injected into an unsanitized innerHTML or href attribute`}</code></pre>
      <p dangerouslySetInnerHTML={{ __html: tx.p11_3 }} />
      <div dangerouslySetInnerHTML={{ __html: tx.p11_browser_list }} />

      <h3>{tx.h3_11b}</h3>
      <p dangerouslySetInnerHTML={{ __html: tx.p11_4 }} />
      <pre><code>{`# Nginx: strict CSP allowing data URIs only for images
add_header Content-Security-Policy "
  default-src 'self';
  img-src 'self' data: https:;
  script-src 'self';
  style-src 'self' 'unsafe-inline';
" always;

# Express.js with helmet
const helmet = require('helmet');
app.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc:  ["'self'"],
    imgSrc:      ["'self'", "data:", "https:"],
    scriptSrc:   ["'self'"],
    styleSrc:    ["'self'", "'unsafe-inline'"],
  },
}));`}</code></pre>
      <p dangerouslySetInnerHTML={{ __html: tx.p11_5 }} />

      <h3>{tx.h3_11c}</h3>
      <p dangerouslySetInnerHTML={{ __html: tx.p11_6 }} />
      <pre><code>{`// UNSAFE: rendering user-supplied SVG as innerHTML
// NEVER do this with untrusted input:
document.getElementById('icon').innerHTML = userSuppliedSvg;
// <svg><script>alert(1)</script></svg>  →  executes!

// SAFE: use DOMPurify to sanitize before rendering
import DOMPurify from 'dompurify';
const cleanSvg = DOMPurify.sanitize(userSuppliedSvg, {
  USE_PROFILES: { svg: true },   // Allow safe SVG elements
  FORBID_TAGS: ['script'],       // Explicit block (also covered by default)
});
document.getElementById('icon').innerHTML = cleanSvg;

// ALSO SAFE: load SVG via <img src="data:image/svg+xml;base64,...">
// Scripts inside SVGs are sandboxed in <img> context (cannot access parent DOM)`}</code></pre>

      <h3>{tx.h3_11d}</h3>
      <p dangerouslySetInnerHTML={{ __html: tx.p11_7 }} />

      {/* Section 12 */}
      <h2>{tx.h2_12}</h2>

      <h3>{tx.h3_12a}</h3>
      <p dangerouslySetInnerHTML={{ __html: tx.p12_1 }} />
      <pre><code>{`// Browser: trigger download of a Base64 image
function downloadBase64Image(dataUri, filename = 'image.png') {
  const link = document.createElement('a');
  link.href     = dataUri;      // full "data:image/png;base64,..." string
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// Usage
downloadBase64Image('data:image/png;base64,iVBORw0KGgo...', 'logo.png');
downloadBase64Image('data:image/svg+xml;base64,PHN2Zy...', 'icon.svg');`}</code></pre>

      <h3>{tx.h3_12b}</h3>
      <p dangerouslySetInnerHTML={{ __html: tx.p12_2 }} />
      <pre><code>{`// Browser: render decoded image without downloading
const base64String = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAY...';
const mimeType     = 'image/png';

const img = document.getElementById('output');
img.src = \`data:\${mimeType};base64,\${base64String}\`;
img.alt = 'Decoded image';`}</code></pre>

      <h3>{tx.h3_12c}</h3>
      <p dangerouslySetInnerHTML={{ __html: tx.p12_3 }} />
      <pre><code>{`const fs = require('fs');

// From a data URI string
const dataUri = 'data:image/png;base64,iVBORw0KGgoAAAAN...';
const base64  = dataUri.replace(/^data:[^;]+;base64,/, '');
fs.writeFileSync('decoded.png', Buffer.from(base64, 'base64'));

// From a bare Base64 string (no prefix)
const rawBase64 = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAY...';
fs.writeFileSync('icon.png', Buffer.from(rawBase64, 'base64'));

console.log('File written:', fs.statSync('decoded.png').size, 'bytes');`}</code></pre>

      <h3>{tx.h3_12d}</h3>
      <p dangerouslySetInnerHTML={{ __html: tx.p12_4 }} />
      <pre><code>{`import base64

# Decode from data URI
data_uri = 'data:image/png;base64,iVBORw0KGgoAAAAN...'
header, encoded = data_uri.split(',', 1)
image_bytes = base64.b64decode(encoded)
with open('decoded.png', 'wb') as f:
    f.write(image_bytes)

# Decode from bare Base64 string
raw_base64 = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAY...'
image_bytes = base64.b64decode(raw_base64)
with open('icon.png', 'wb') as f:
    f.write(image_bytes)

print(f'Decoded {len(image_bytes)} bytes')`}</code></pre>

      <h3>{tx.h3_12e}</h3>
      <p dangerouslySetInnerHTML={{ __html: tx.p12_5 }} />
      <pre><code>{`# Decode Base64 file to image (Linux / macOS)
base64 --decode < image.b64 > decoded.png

# Or using openssl
openssl base64 -d -in image.b64 -out decoded.png

# If the input has the data URI prefix, strip it first:
# data:image/png;base64,iVBOR... → iVBOR...
sed 's/^data:[^,]*,//' image-with-prefix.txt | base64 --decode > decoded.png

# PowerShell (Windows)
$base64 = Get-Content -Path 'image.b64' -Raw
$bytes = [Convert]::FromBase64String($base64.Trim())
[System.IO.File]::WriteAllBytes('decoded.png', $bytes)`}</code></pre>

      <p>
        <Link href={`/${lang}/tools/base64-image-converter`} style={{ fontWeight: 600 }}>
          {tx.try_tool}
        </Link>
      </p>

      {/* FAQ */}
      <h2>{tx.h2_faq}</h2>

      <h3>{tx.faq1_q}</h3>
      <p>{tx.faq1_a}</p>

      <h3>{tx.faq2_q}</h3>
      <p>{tx.faq2_a}</p>

      <h3>{tx.faq3_q}</h3>
      <p>{tx.faq3_a}</p>

      <h3>{tx.faq4_q}</h3>
      <p>{tx.faq4_a}</p>

      <h3>{tx.faq5_q}</h3>
      <p>{tx.faq5_a}</p>

      <h3>{tx.faq6_q}</h3>
      <p>{tx.faq6_a}</p>

      <h3>{tx.faq7_q}</h3>
      <p>{tx.faq7_a}</p>

      <h3>{tx.faq8_q}</h3>
      <p>{tx.faq8_a}</p>
    </>
  );
}
