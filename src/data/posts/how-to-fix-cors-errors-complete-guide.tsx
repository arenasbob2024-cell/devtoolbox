'use client';
import React from 'react';

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'How to Fix CORS Errors: The Complete Troubleshooting Guide',
    intro: 'CORS errors are one of the most frustrating issues in web development. You see the dreaded red console message, your API call fails, and nothing seems to work. This guide will help you understand exactly what CORS is, diagnose your specific error, and fix it with the right solution for your stack.',
    whatTitle: 'What is CORS? (30-Second Explanation)',
    whatDesc: 'Cross-Origin Resource Sharing (CORS) is a browser security feature that blocks web pages from making requests to a different domain than the one serving the page. When your frontend at http://localhost:3000 tries to fetch data from http://api.example.com, the browser checks if the API server explicitly allows this cross-origin request via special HTTP headers.',
    diagramTitle: 'How CORS Works: The Flow',
    diagramAllowed: 'When CORS is properly configured, the server responds with headers that tell the browser: "Yes, I allow requests from this origin."',
    diagramBlocked: 'When CORS is NOT configured, the browser blocks the response (even though the server may have processed the request successfully).',
    errorsTitle: '5 Most Common CORS Error Messages',
    error1: 'Error 1: No Access-Control-Allow-Origin Header',
    error1Msg: 'Access to fetch at \'https://api.example.com/data\' from origin \'http://localhost:3000\' has been blocked by CORS policy: No \'Access-Control-Allow-Origin\' header is present on the requested resource.',
    error1Meaning: 'Meaning: The server did not include the Access-Control-Allow-Origin header in its response. This is the most common CORS error and means the server has no CORS configuration at all.',
    error2: 'Error 2: Wildcard with Credentials',
    error2Msg: 'Access to fetch at \'https://api.example.com/data\' from origin \'http://localhost:3000\' has been blocked by CORS policy: The value of the \'Access-Control-Allow-Origin\' header in the response must not be the wildcard \'*\' when the request\'s credentials mode is \'include\'.',
    error2Meaning: 'Meaning: You are sending cookies or authorization headers (credentials: "include"), but the server responds with Access-Control-Allow-Origin: *. When credentials are involved, the server must specify the exact origin, not a wildcard.',
    error3: 'Error 3: Preflight Request Failed',
    error3Msg: 'Access to fetch at \'https://api.example.com/data\' from origin \'http://localhost:3000\' has been blocked by CORS policy: Response to preflight request doesn\'t pass access control check: No \'Access-Control-Allow-Origin\' header is present on the requested resource.',
    error3Meaning: 'Meaning: Before your actual request, the browser sent an OPTIONS request (preflight) to check permissions. The server either did not handle the OPTIONS method or did not include CORS headers in the preflight response.',
    error4: 'Error 4: Method Not Allowed',
    error4Msg: 'Access to fetch at \'https://api.example.com/data\' from origin \'http://localhost:3000\' has been blocked by CORS policy: Method PUT is not allowed by Access-Control-Allow-Methods in preflight response.',
    error4Meaning: 'Meaning: The server\'s Access-Control-Allow-Methods header does not include the HTTP method you are using (e.g., PUT, DELETE, PATCH). The server needs to explicitly allow these methods.',
    error5: 'Error 5: Header Not Allowed',
    error5Msg: 'Access to fetch at \'https://api.example.com/data\' from origin \'http://localhost:3000\' has been blocked by CORS policy: Request header field X-Custom-Header is not allowed by Access-Control-Allow-Headers in preflight response.',
    error5Meaning: 'Meaning: You are sending a custom header (like X-Custom-Header or Authorization) that the server has not explicitly allowed in its Access-Control-Allow-Headers response header.',
    flowchartTitle: 'Diagnosis Flowchart: Where Is the Problem?',
    flowchartDesc: 'Use this decision tree to quickly identify whether your CORS issue is a frontend problem, a backend problem, or a proxy configuration problem:',
    flowStep1: 'Step 1: Open browser DevTools > Network tab. Do you see an OPTIONS request before your actual request?',
    flowStep1Yes: 'YES -> The browser is sending a preflight request. Check if the OPTIONS response has status 200 and includes CORS headers. If not, your backend is not handling OPTIONS requests.',
    flowStep1No: 'NO -> This is a simple request (GET/POST with standard headers). The problem is that the server response is missing CORS headers.',
    flowStep2: 'Step 2: Does the error mention "preflight"?',
    flowStep2Yes: 'YES -> Backend problem. Your server needs to handle OPTIONS requests and return proper CORS headers.',
    flowStep2No: 'NO -> Check if you are using credentials (cookies, Authorization header). If yes, you cannot use wildcard (*) for Access-Control-Allow-Origin.',
    flowStep3: 'Step 3: Does the API work when called directly (e.g., via curl or Postman)?',
    flowStep3Yes: 'YES -> This confirms it is a CORS issue (browser-only). The server works fine but is missing CORS headers.',
    flowStep3No: 'NO -> This is NOT a CORS issue. The API itself has a problem (auth, routing, server error).',
    flowSummary: 'Summary: 90% of CORS errors are solved by configuring the correct headers on your backend server.',
    serverFixTitle: 'Server-Side Fixes by Framework',
    expressTitle: 'Express.js (Node.js)',
    djangoTitle: 'Django (Python)',
    flaskTitle: 'Flask (Python)',
    goTitle: 'Go (net/http)',
    nginxTitle: 'Nginx Configuration',
    proxyTitle: 'Reverse Proxy as CORS Middleware',
    proxyDesc: 'If you cannot modify the backend API (e.g., third-party API), use a reverse proxy to add CORS headers. This is the most reliable production solution.',
    nginxProxyTitle: 'Nginx Reverse Proxy',
    apacheProxyTitle: 'Apache Reverse Proxy',
    devTitle: 'Development-Only Solutions',
    devDesc: 'These solutions are for local development only. Never use these in production.',
    viteTitle: 'Vite Proxy',
    viteDesc: 'Vite\'s built-in proxy forwards requests from your dev server to the API, avoiding CORS entirely because the browser sees only same-origin requests:',
    webpackTitle: 'Webpack devServer Proxy',
    webpackDesc: 'Create React App and other webpack-based setups support a similar proxy:',
    nextjsTitle: 'Next.js Rewrites',
    nextjsDesc: 'Next.js can proxy API requests through its own server using rewrites:',
    pitfallsTitle: 'Common Pitfalls and Edge Cases',
    pitfall1Title: 'Pitfall 1: Wildcard (*) with Credentials',
    pitfall1Desc: 'When your frontend sends credentials (cookies, Authorization header), the server CANNOT use Access-Control-Allow-Origin: *. It must echo back the exact origin:',
    pitfall1Wrong: 'WRONG (will fail with credentials):',
    pitfall1Right: 'CORRECT (dynamic origin for credentials):',
    pitfall2Title: 'Pitfall 2: Missing OPTIONS Handler (Preflight)',
    pitfall2Desc: 'Non-simple requests trigger a preflight OPTIONS request. If your server returns 404 or 405 for OPTIONS, CORS fails before your actual request is even sent. Common triggers for preflight:',
    pitfall2List: 'Custom headers (Authorization, X-Request-ID, etc.) | HTTP methods other than GET, HEAD, POST | Content-Type other than application/x-www-form-urlencoded, multipart/form-data, text/plain',
    pitfall3Title: 'Pitfall 3: Cookies and SameSite',
    pitfall3Desc: 'Cross-origin cookies require three things to work together:',
    pitfall3List: 'Frontend: fetch() must use credentials: "include" | Backend: Must set Access-Control-Allow-Credentials: true AND specify exact origin | Cookie: Must have SameSite=None and Secure flag (HTTPS only)',
    pitfall4Title: 'Pitfall 4: Caching Preflight Responses',
    pitfall4Desc: 'Preflight (OPTIONS) requests can be slow. Use Access-Control-Max-Age to cache them:',
    pitfall4Note: 'Note: Chrome caps this at 7200 seconds (2 hours). Firefox caps at 86400 (24 hours).',
    pitfall5Title: 'Pitfall 5: CORS on Redirects',
    pitfall5Desc: 'If your API endpoint redirects (301/302) to another URL, the CORS headers must be present on BOTH the original response AND the redirected response. Many developers miss this. Avoid redirects in API endpoints when possible.',
    faqTitle: 'Frequently Asked Questions',
    faq1q: 'Can I disable CORS in the browser?',
    faq1a: 'Technically yes, by launching Chrome with --disable-web-security flag, but this is extremely dangerous and should never be used for anything other than quick debugging. It disables all browser security policies. For development, use a proxy (Vite, webpack) instead.',
    faq2q: 'Why does my API work in Postman but not in the browser?',
    faq2a: 'CORS is a browser-only security mechanism. Tools like Postman, curl, and server-to-server requests do not enforce CORS. The browser checks for CORS headers because it runs untrusted code (JavaScript from websites) and needs to protect users from malicious cross-origin requests.',
    faq3q: 'Is CORS a frontend or backend fix?',
    faq3a: 'CORS is almost always a backend fix. The server must send the correct Access-Control-Allow-Origin, Access-Control-Allow-Methods, and Access-Control-Allow-Headers response headers. The frontend cannot bypass CORS (by design). The only frontend workaround is to use a proxy so the request appears same-origin.',
    faq4q: 'Should I use Access-Control-Allow-Origin: * in production?',
    faq4a: 'Only for truly public APIs that do not use cookies or authentication. For any API that requires credentials, you must specify exact origins. Using * with credentials will always fail. For most applications, whitelist specific origins dynamically based on the request Origin header.',
    faq5q: 'What is a preflight request and why does it happen?',
    faq5a: 'A preflight request is an automatic OPTIONS request sent by the browser before the actual request. It happens when the request uses custom headers, non-simple HTTP methods (PUT, DELETE, PATCH), or a Content-Type other than form-encoded/multipart/text-plain. The preflight checks if the server allows the actual request. You must handle OPTIONS on your server.',
    faq6q: 'How do I fix CORS for WebSocket connections?',
    faq6a: 'WebSocket connections (ws:// or wss://) do not follow CORS rules. The initial HTTP upgrade handshake includes an Origin header, but the server must validate it manually. Most WebSocket libraries (Socket.IO, ws) have an origin option to whitelist allowed origins. If you see a CORS error with WebSockets, the issue is usually with the initial HTTP handshake endpoint, not the WebSocket itself.',
    quickRef: 'Quick Reference: CORS Headers',
    header: 'Header',
    purpose: 'Purpose',
    exampleValue: 'Example Value',
  },
  zh: {
    title: '如何修复 CORS 错误：完整排查指南',
    intro: 'CORS 错误是 Web 开发中最令人沮丧的问题之一。你看到控制台中可怕的红色错误消息，API 调用失败，似乎什么都不管用。本指南将帮助你准确理解什么是 CORS、诊断你的具体错误并使用正确的方案修复它。',
    whatTitle: '什么是 CORS？（30 秒解释）',
    whatDesc: '跨源资源共享（CORS）是一种浏览器安全机制，它阻止网页向与提供页面不同的域发出请求。当你的前端 http://localhost:3000 尝试从 http://api.example.com 获取数据时，浏览器会检查 API 服务器是否通过特殊的 HTTP 头显式允许了这个跨源请求。',
    diagramTitle: 'CORS 工作原理：流程图',
    diagramAllowed: '当 CORS 配置正确时，服务器响应中包含的头会告诉浏览器："是的，我允许来自这个源的请求。"',
    diagramBlocked: '当 CORS 未配置时，浏览器会阻止响应（即使服务器可能已经成功处理了请求）。',
    errorsTitle: '5 种最常见的 CORS 错误消息',
    error1: '错误 1：缺少 Access-Control-Allow-Origin 头',
    error1Msg: 'Access to fetch at \'https://api.example.com/data\' from origin \'http://localhost:3000\' has been blocked by CORS policy: No \'Access-Control-Allow-Origin\' header is present on the requested resource.',
    error1Meaning: '含义：服务器在响应中没有包含 Access-Control-Allow-Origin 头。这是最常见的 CORS 错误，意味着服务器完全没有 CORS 配置。',
    error2: '错误 2：通配符与凭据冲突',
    error2Msg: 'Access to fetch at \'https://api.example.com/data\' from origin \'http://localhost:3000\' has been blocked by CORS policy: The value of the \'Access-Control-Allow-Origin\' header in the response must not be the wildcard \'*\' when the request\'s credentials mode is \'include\'.',
    error2Meaning: '含义：你正在发送 Cookie 或 Authorization 头（credentials: "include"），但服务器返回了 Access-Control-Allow-Origin: *。当涉及凭据时，服务器必须指定确切的源，不能使用通配符。',
    error3: '错误 3：预检请求失败',
    error3Msg: 'Access to fetch at \'https://api.example.com/data\' from origin \'http://localhost:3000\' has been blocked by CORS policy: Response to preflight request doesn\'t pass access control check.',
    error3Meaning: '含义：在实际请求之前，浏览器发送了一个 OPTIONS 请求（预检）来检查权限。服务器要么没有处理 OPTIONS 方法，要么没有在预检响应中包含 CORS 头。',
    error4: '错误 4：方法不被允许',
    error4Msg: 'Method PUT is not allowed by Access-Control-Allow-Methods in preflight response.',
    error4Meaning: '含义：服务器的 Access-Control-Allow-Methods 头不包含你正在使用的 HTTP 方法（如 PUT、DELETE、PATCH）。服务器需要显式允许这些方法。',
    error5: '错误 5：请求头不被允许',
    error5Msg: 'Request header field X-Custom-Header is not allowed by Access-Control-Allow-Headers in preflight response.',
    error5Meaning: '含义：你发送了一个自定义头（如 X-Custom-Header 或 Authorization），服务器没有在 Access-Control-Allow-Headers 响应头中显式允许它。',
    flowchartTitle: '诊断流程图：问题在哪里？',
    flowchartDesc: '使用此决策树快速识别你的 CORS 问题是前端问题、后端问题还是代理配置问题：',
    flowStep1: '步骤 1：打开浏览器 DevTools > Network 标签。在实际请求之前你是否看到了 OPTIONS 请求？',
    flowStep1Yes: '是 -> 浏览器正在发送预检请求。检查 OPTIONS 响应是否有状态码 200 并包含 CORS 头。如果没有，你的后端没有处理 OPTIONS 请求。',
    flowStep1No: '否 -> 这是一个简单请求（GET/POST 配合标准头）。问题是服务器响应缺少 CORS 头。',
    flowStep2: '步骤 2：错误消息是否提到了"preflight"？',
    flowStep2Yes: '是 -> 后端问题。你的服务器需要处理 OPTIONS 请求并返回正确的 CORS 头。',
    flowStep2No: '否 -> 检查你是否使用了凭据（Cookie、Authorization 头）。如果是，不能使用通配符 (*)。',
    flowStep3: '步骤 3：直接调用 API（如使用 curl 或 Postman）是否正常工作？',
    flowStep3Yes: '是 -> 确认这是 CORS 问题（仅浏览器）。服务器本身没问题，只是缺少 CORS 头。',
    flowStep3No: '否 -> 这不是 CORS 问题。API 本身有问题（认证、路由、服务器错误）。',
    flowSummary: '总结：90% 的 CORS 错误通过在后端服务器上配置正确的头就能解决。',
    serverFixTitle: '各框架服务端修复方案',
    expressTitle: 'Express.js (Node.js)',
    djangoTitle: 'Django (Python)',
    flaskTitle: 'Flask (Python)',
    goTitle: 'Go (net/http)',
    nginxTitle: 'Nginx 配置',
    proxyTitle: '反向代理作为 CORS 中间件',
    proxyDesc: '如果你无法修改后端 API（如第三方 API），可以使用反向代理来添加 CORS 头。这是最可靠的生产环境方案。',
    nginxProxyTitle: 'Nginx 反向代理',
    apacheProxyTitle: 'Apache 反向代理',
    devTitle: '仅开发环境的解决方案',
    devDesc: '这些方案仅适用于本地开发，绝不要在生产环境中使用。',
    viteTitle: 'Vite 代理',
    viteDesc: 'Vite 内置代理将请求从开发服务器转发到 API，完全避免 CORS，因为浏览器只看到同源请求：',
    webpackTitle: 'Webpack devServer 代理',
    webpackDesc: 'Create React App 和其他基于 webpack 的项目支持类似的代理：',
    nextjsTitle: 'Next.js 重写',
    nextjsDesc: 'Next.js 可以通过自身服务器使用 rewrites 代理 API 请求：',
    pitfallsTitle: '常见陷阱和边界情况',
    pitfall1Title: '陷阱 1：通配符 (*) 与凭据',
    pitfall1Desc: '当前端发送凭据（Cookie、Authorization 头）时，服务器不能使用 Access-Control-Allow-Origin: *，必须回显确切的源：',
    pitfall1Wrong: '错误写法（凭据模式下会失败）：',
    pitfall1Right: '正确写法（动态源配合凭据）：',
    pitfall2Title: '陷阱 2：缺少 OPTIONS 处理器（预检）',
    pitfall2Desc: '非简单请求会触发预检 OPTIONS 请求。如果服务器对 OPTIONS 返回 404 或 405，CORS 在你的实际请求发送之前就会失败。常见的预检触发条件：',
    pitfall2List: '自定义头（Authorization, X-Request-ID 等）| GET、HEAD、POST 以外的 HTTP 方法 | Content-Type 不是 application/x-www-form-urlencoded、multipart/form-data 或 text/plain',
    pitfall3Title: '陷阱 3：Cookie 与 SameSite',
    pitfall3Desc: '跨源 Cookie 需要三个条件同时满足：',
    pitfall3List: '前端：fetch() 必须使用 credentials: "include" | 后端：必须设置 Access-Control-Allow-Credentials: true 并指定确切的源 | Cookie：必须设置 SameSite=None 和 Secure 标志（仅 HTTPS）',
    pitfall4Title: '陷阱 4：缓存预检响应',
    pitfall4Desc: '预检（OPTIONS）请求可能很慢。使用 Access-Control-Max-Age 来缓存它们：',
    pitfall4Note: '注意：Chrome 上限为 7200 秒（2 小时），Firefox 上限为 86400 秒（24 小时）。',
    pitfall5Title: '陷阱 5：重定向中的 CORS',
    pitfall5Desc: '如果你的 API 端点重定向（301/302）到另一个 URL，CORS 头必须同时存在于原始响应和重定向后的响应中。许多开发者会忽略这一点。尽量避免在 API 端点中使用重定向。',
    faqTitle: '常见问题',
    faq1q: '可以在浏览器中禁用 CORS 吗？',
    faq1a: '技术上可以，通过使用 --disable-web-security 参数启动 Chrome，但这非常危险，除了快速调试外不应使用。它会禁用所有浏览器安全策略。开发环境请改用代理（Vite、webpack）。',
    faq2q: '为什么我的 API 在 Postman 中可以用，在浏览器中不行？',
    faq2a: 'CORS 是仅浏览器的安全机制。Postman、curl 和服务器到服务器的请求不执行 CORS。浏览器检查 CORS 头是因为它运行不受信任的代码（网站的 JavaScript），需要保护用户免受恶意跨源请求的侵害。',
    faq3q: 'CORS 是前端修复还是后端修复？',
    faq3a: 'CORS 几乎总是后端修复。服务器必须发送正确的 Access-Control-Allow-Origin、Access-Control-Allow-Methods 和 Access-Control-Allow-Headers 响应头。前端无法绕过 CORS（设计如此）。唯一的前端变通方案是使用代理使请求看起来是同源的。',
    faq4q: '生产环境应该用 Access-Control-Allow-Origin: * 吗？',
    faq4a: '仅适用于不使用 Cookie 或认证的真正公开 API。任何需要凭据的 API 都必须指定确切的源。使用 * 配合凭据总是会失败。对于大多数应用，应根据请求的 Origin 头动态白名单特定源。',
    faq5q: '什么是预检请求，为什么会发生？',
    faq5a: '预检请求是浏览器在实际请求之前自动发送的 OPTIONS 请求。当请求使用自定义头、非简单 HTTP 方法（PUT、DELETE、PATCH）或非表单编码/multipart/纯文本的 Content-Type 时会触发。预检检查服务器是否允许实际请求。你必须在服务器上处理 OPTIONS。',
    faq6q: '如何修复 WebSocket 连接的 CORS？',
    faq6a: 'WebSocket 连接（ws:// 或 wss://）不遵循 CORS 规则。初始 HTTP 升级握手包含 Origin 头，但服务器必须手动验证。大多数 WebSocket 库（Socket.IO、ws）有 origin 选项来白名单允许的源。如果 WebSocket 出现 CORS 错误，问题通常在于初始 HTTP 握手端点，而不是 WebSocket 本身。',
    quickRef: '快速参考：CORS 头',
    header: '头名称',
    purpose: '用途',
    exampleValue: '示例值',
  },
  ja: {
    title: 'CORS エラーの修正方法：完全トラブルシューティングガイド',
    intro: 'CORSエラーはWeb開発で最もフラストレーションの溜まる問題の一つです。コンソールに赤いエラーメッセージが表示され、API呼び出しが失敗し、何も機能しないように見えます。このガイドでは、CORSとは何かを正確に理解し、具体的なエラーを診断し、適切なソリューションで修正する方法を解説します。',
    whatTitle: 'CORSとは？（30秒で解説）',
    whatDesc: 'Cross-Origin Resource Sharing（CORS）は、Webページがページを提供しているドメインとは異なるドメインにリクエストを送ることをブロックするブラウザのセキュリティ機能です。フロントエンドの http://localhost:3000 が http://api.example.com からデータを取得しようとすると、ブラウザはAPIサーバーが特別なHTTPヘッダーでこのクロスオリジンリクエストを明示的に許可しているか確認します。',
    diagramTitle: 'CORSの仕組み：フロー図',
    diagramAllowed: 'CORSが正しく設定されている場合、サーバーはブラウザに「はい、このオリジンからのリクエストを許可します」と伝えるヘッダーで応答します。',
    diagramBlocked: 'CORSが設定されていない場合、ブラウザはレスポンスをブロックします（サーバーがリクエストを正常に処理していても）。',
    errorsTitle: '最も一般的な5つのCORSエラーメッセージ',
    error1: 'エラー1：Access-Control-Allow-Originヘッダーがない',
    error1Msg: 'Access to fetch at \'https://api.example.com/data\' from origin \'http://localhost:3000\' has been blocked by CORS policy: No \'Access-Control-Allow-Origin\' header is present on the requested resource.',
    error1Meaning: '意味：サーバーがレスポンスにAccess-Control-Allow-Originヘッダーを含めていません。最も一般的なCORSエラーで、サーバーにCORS設定が全くないことを意味します。',
    error2: 'エラー2：ワイルドカードとクレデンシャルの競合',
    error2Msg: 'The value of the \'Access-Control-Allow-Origin\' header must not be the wildcard \'*\' when the request\'s credentials mode is \'include\'.',
    error2Meaning: '意味：Cookie や Authorization ヘッダー（credentials: "include"）を送信していますが、サーバーが Access-Control-Allow-Origin: * で応答しています。クレデンシャルが関わる場合、ワイルドカードではなく正確なオリジンを指定する必要があります。',
    error3: 'エラー3：プリフライトリクエストの失敗',
    error3Msg: 'Response to preflight request doesn\'t pass access control check.',
    error3Meaning: '意味：実際のリクエストの前に、ブラウザが権限を確認するOPTIONSリクエスト（プリフライト）を送信しました。サーバーがOPTIONSメソッドを処理していないか、プリフライトレスポンスにCORSヘッダーが含まれていません。',
    error4: 'エラー4：メソッドが許可されていない',
    error4Msg: 'Method PUT is not allowed by Access-Control-Allow-Methods in preflight response.',
    error4Meaning: '意味：サーバーの Access-Control-Allow-Methods ヘッダーに使用しているHTTPメソッド（PUT、DELETE、PATCHなど）が含まれていません。',
    error5: 'エラー5：ヘッダーが許可されていない',
    error5Msg: 'Request header field X-Custom-Header is not allowed by Access-Control-Allow-Headers.',
    error5Meaning: '意味：サーバーが Access-Control-Allow-Headers でカスタムヘッダーを明示的に許可していません。',
    flowchartTitle: '診断フローチャート：問題はどこにあるか？',
    flowchartDesc: 'この決定木を使って、CORSの問題がフロントエンド、バックエンド、プロキシ設定のどこにあるかを素早く特定します：',
    flowStep1: 'ステップ1：DevTools > Networkタブを開きます。実際のリクエストの前にOPTIONSリクエストが見えますか？',
    flowStep1Yes: 'はい -> プリフライトリクエストが送信されています。OPTIONSレスポンスがステータス200でCORSヘッダーを含んでいるか確認してください。',
    flowStep1No: 'いいえ -> シンプルリクエストです。サーバーレスポンスにCORSヘッダーがないのが問題です。',
    flowStep2: 'ステップ2：エラーメッセージに「preflight」と書かれていますか？',
    flowStep2Yes: 'はい -> バックエンドの問題です。サーバーでOPTIONSリクエストを処理し、CORSヘッダーを返す必要があります。',
    flowStep2No: 'いいえ -> クレデンシャルを使用しているか確認してください。使用している場合、ワイルドカード(*)は使えません。',
    flowStep3: 'ステップ3：APIを直接呼び出す（curl や Postman）と動作しますか？',
    flowStep3Yes: 'はい -> CORSの問題（ブラウザのみ）であることが確認できます。',
    flowStep3No: 'いいえ -> CORSの問題ではありません。API自体に問題があります。',
    flowSummary: 'まとめ：CORSエラーの90%はバックエンドサーバーで正しいヘッダーを設定することで解決できます。',
    serverFixTitle: 'フレームワーク別サーバーサイド修正',
    expressTitle: 'Express.js (Node.js)',
    djangoTitle: 'Django (Python)',
    flaskTitle: 'Flask (Python)',
    goTitle: 'Go (net/http)',
    nginxTitle: 'Nginx設定',
    proxyTitle: 'リバースプロキシをCORSミドルウェアとして使用',
    proxyDesc: 'バックエンドAPIを変更できない場合（サードパーティAPIなど）、リバースプロキシを使用してCORSヘッダーを追加します。',
    nginxProxyTitle: 'Nginx リバースプロキシ',
    apacheProxyTitle: 'Apache リバースプロキシ',
    devTitle: '開発環境専用ソリューション',
    devDesc: 'これらのソリューションはローカル開発専用です。本番環境では絶対に使用しないでください。',
    viteTitle: 'Vite プロキシ',
    viteDesc: 'Viteの組み込みプロキシは開発サーバーからAPIにリクエストを転送し、ブラウザは同一オリジンのリクエストしか見ないためCORSを完全に回避します：',
    webpackTitle: 'Webpack devServer プロキシ',
    webpackDesc: 'Create React Appなどwebpackベースのセットアップも同様のプロキシをサポートします：',
    nextjsTitle: 'Next.js リライト',
    nextjsDesc: 'Next.jsはrewritesを使用してAPIリクエストを自身のサーバー経由でプロキシできます：',
    pitfallsTitle: 'よくある落とし穴とエッジケース',
    pitfall1Title: '落とし穴1：ワイルドカード(*)とクレデンシャル',
    pitfall1Desc: 'フロントエンドがクレデンシャルを送信する場合、サーバーは Access-Control-Allow-Origin: * を使用できません。正確なオリジンを返す必要があります：',
    pitfall1Wrong: '間違い（クレデンシャルで失敗）：',
    pitfall1Right: '正解（クレデンシャル用の動的オリジン）：',
    pitfall2Title: '落とし穴2：OPTIONSハンドラーの欠如（プリフライト）',
    pitfall2Desc: '非シンプルリクエストはプリフライトOPTIONSリクエストを発生させます。サーバーがOPTIONSに404や405を返すと、実際のリクエストが送信される前にCORSが失敗します。',
    pitfall2List: 'カスタムヘッダー（Authorization, X-Request-IDなど）| GET、HEAD、POST以外のHTTPメソッド | Content-Typeがフォームエンコード/multipart/テキスト以外',
    pitfall3Title: '落とし穴3：CookieとSameSite',
    pitfall3Desc: 'クロスオリジンCookieには3つの条件が必要です：',
    pitfall3List: 'フロントエンド：fetch()でcredentials: "include"を使用 | バックエンド：Access-Control-Allow-Credentials: trueと正確なオリジンを設定 | Cookie：SameSite=NoneとSecureフラグ（HTTPSのみ）',
    pitfall4Title: '落とし穴4：プリフライトレスポンスのキャッシュ',
    pitfall4Desc: 'プリフライト（OPTIONS）リクエストは遅い場合があります。Access-Control-Max-Ageでキャッシュします：',
    pitfall4Note: '注意：Chromeの上限は7200秒（2時間）、Firefoxの上限は86400秒（24時間）です。',
    pitfall5Title: '落とし穴5：リダイレクトとCORS',
    pitfall5Desc: 'APIエンドポイントがリダイレクト（301/302）する場合、CORSヘッダーは元のレスポンスとリダイレクト先の両方に存在する必要があります。APIエンドポイントではリダイレクトを避けてください。',
    faqTitle: 'よくある質問',
    faq1q: 'ブラウザでCORSを無効にできますか？',
    faq1a: '技術的には可能です（Chromeを--disable-web-securityフラグで起動）が、非常に危険でデバッグ以外には使用すべきではありません。開発環境ではプロキシ（Vite、webpack）を使用してください。',
    faq2q: 'PostmanではAPIが動くのにブラウザでは動かないのはなぜ？',
    faq2a: 'CORSはブラウザ専用のセキュリティメカニズムです。Postman、curl、サーバー間リクエストはCORSを強制しません。ブラウザはユーザーを保護するためにCORSヘッダーを確認します。',
    faq3q: 'CORSはフロントエンドとバックエンドどちらの修正？',
    faq3a: 'ほぼ常にバックエンドの修正です。サーバーが正しいCORSレスポンスヘッダーを送信する必要があります。フロントエンドはCORSをバイパスできません。唯一の回避策はプロキシの使用です。',
    faq4q: '本番環境で Access-Control-Allow-Origin: * を使うべき？',
    faq4a: 'Cookieや認証を使用しない完全に公開されたAPIのみ。クレデンシャルが必要なAPIでは正確なオリジンを指定する必要があります。',
    faq5q: 'プリフライトリクエストとは何ですか？',
    faq5a: 'プリフライトリクエストは、ブラウザが実際のリクエストの前に自動送信するOPTIONSリクエストです。カスタムヘッダー、非シンプルHTTPメソッド、特殊なContent-Typeを使用する場合に発生します。',
    faq6q: 'WebSocket接続のCORSを修正するには？',
    faq6a: 'WebSocket接続はCORSルールに従いません。初期HTTPアップグレードハンドシェイクにOriginヘッダーが含まれますが、サーバーが手動で検証する必要があります。CORSエラーが出る場合、通常は初期HTTPハンドシェイクエンドポイントの問題です。',
    quickRef: 'クイックリファレンス：CORSヘッダー',
    header: 'ヘッダー',
    purpose: '目的',
    exampleValue: '値の例',
  },
  ko: {
    title: 'CORS 오류 해결 방법: 완전한 문제 해결 가이드',
    intro: 'CORS 오류는 웹 개발에서 가장 답답한 문제 중 하나입니다. 콘솔에 빨간 에러 메시지가 나타나고, API 호출이 실패하며, 아무것도 작동하지 않는 것처럼 보입니다. 이 가이드는 CORS가 무엇인지 정확히 이해하고, 구체적인 오류를 진단하고, 올바른 솔루션으로 수정하는 방법을 도와줍니다.',
    whatTitle: 'CORS란? (30초 설명)',
    whatDesc: 'Cross-Origin Resource Sharing(CORS)는 웹 페이지가 페이지를 제공하는 도메인과 다른 도메인으로 요청을 보내는 것을 차단하는 브라우저 보안 기능입니다. 프론트엔드 http://localhost:3000이 http://api.example.com에서 데이터를 가져오려고 할 때, 브라우저는 API 서버가 특별한 HTTP 헤더를 통해 이 크로스오리진 요청을 명시적으로 허용하는지 확인합니다.',
    diagramTitle: 'CORS 작동 원리: 흐름도',
    diagramAllowed: 'CORS가 올바르게 설정되면, 서버는 브라우저에 "네, 이 출처의 요청을 허용합니다"라고 알리는 헤더로 응답합니다.',
    diagramBlocked: 'CORS가 설정되지 않으면, 브라우저는 응답을 차단합니다(서버가 요청을 성공적으로 처리했더라도).',
    errorsTitle: '가장 흔한 5가지 CORS 오류 메시지',
    error1: '오류 1: Access-Control-Allow-Origin 헤더 없음',
    error1Msg: 'Access to fetch at \'https://api.example.com/data\' from origin \'http://localhost:3000\' has been blocked by CORS policy: No \'Access-Control-Allow-Origin\' header is present on the requested resource.',
    error1Meaning: '의미: 서버가 응답에 Access-Control-Allow-Origin 헤더를 포함하지 않았습니다. 가장 흔한 CORS 오류로, 서버에 CORS 설정이 전혀 없다는 의미입니다.',
    error2: '오류 2: 와일드카드와 자격 증명 충돌',
    error2Msg: 'The value of the \'Access-Control-Allow-Origin\' header must not be the wildcard \'*\' when the request\'s credentials mode is \'include\'.',
    error2Meaning: '의미: 쿠키나 Authorization 헤더(credentials: "include")를 보내고 있지만, 서버가 Access-Control-Allow-Origin: *로 응답합니다. 자격 증명이 관련된 경우 와일드카드가 아닌 정확한 출처를 지정해야 합니다.',
    error3: '오류 3: 사전 요청 실패',
    error3Msg: 'Response to preflight request doesn\'t pass access control check.',
    error3Meaning: '의미: 실제 요청 전에 브라우저가 권한을 확인하는 OPTIONS 요청(프리플라이트)을 보냈습니다. 서버가 OPTIONS 메서드를 처리하지 않거나 프리플라이트 응답에 CORS 헤더를 포함하지 않았습니다.',
    error4: '오류 4: 메서드 허용되지 않음',
    error4Msg: 'Method PUT is not allowed by Access-Control-Allow-Methods in preflight response.',
    error4Meaning: '의미: 서버의 Access-Control-Allow-Methods 헤더에 사용 중인 HTTP 메서드(PUT, DELETE, PATCH 등)가 포함되어 있지 않습니다.',
    error5: '오류 5: 헤더 허용되지 않음',
    error5Msg: 'Request header field X-Custom-Header is not allowed by Access-Control-Allow-Headers.',
    error5Meaning: '의미: 서버가 Access-Control-Allow-Headers에서 커스텀 헤더를 명시적으로 허용하지 않았습니다.',
    flowchartTitle: '진단 플로우차트: 문제가 어디에 있는가?',
    flowchartDesc: '이 결정 트리를 사용하여 CORS 문제가 프론트엔드, 백엔드, 프록시 설정 중 어디에 있는지 빠르게 식별합니다:',
    flowStep1: '단계 1: DevTools > Network 탭을 엽니다. 실제 요청 전에 OPTIONS 요청이 보이나요?',
    flowStep1Yes: '예 -> 프리플라이트 요청이 전송되고 있습니다. OPTIONS 응답이 상태 200이고 CORS 헤더를 포함하는지 확인하세요.',
    flowStep1No: '아니오 -> 단순 요청입니다. 서버 응답에 CORS 헤더가 없는 것이 문제입니다.',
    flowStep2: '단계 2: 오류 메시지에 "preflight"가 언급되어 있나요?',
    flowStep2Yes: '예 -> 백엔드 문제입니다. 서버에서 OPTIONS 요청을 처리하고 CORS 헤더를 반환해야 합니다.',
    flowStep2No: '아니오 -> 자격 증명을 사용하고 있는지 확인하세요. 사용 중이라면 와일드카드(*)를 사용할 수 없습니다.',
    flowStep3: '단계 3: API를 직접 호출(curl이나 Postman)하면 작동하나요?',
    flowStep3Yes: '예 -> CORS 문제(브라우저 전용)임이 확인됩니다.',
    flowStep3No: '아니오 -> CORS 문제가 아닙니다. API 자체에 문제가 있습니다.',
    flowSummary: '요약: CORS 오류의 90%는 백엔드 서버에서 올바른 헤더를 설정하면 해결됩니다.',
    serverFixTitle: '프레임워크별 서버 측 수정',
    expressTitle: 'Express.js (Node.js)',
    djangoTitle: 'Django (Python)',
    flaskTitle: 'Flask (Python)',
    goTitle: 'Go (net/http)',
    nginxTitle: 'Nginx 설정',
    proxyTitle: '리버스 프록시를 CORS 미들웨어로 사용',
    proxyDesc: '백엔드 API를 수정할 수 없는 경우(서드파티 API 등), 리버스 프록시를 사용하여 CORS 헤더를 추가합니다.',
    nginxProxyTitle: 'Nginx 리버스 프록시',
    apacheProxyTitle: 'Apache 리버스 프록시',
    devTitle: '개발 환경 전용 솔루션',
    devDesc: '이 솔루션들은 로컬 개발 전용입니다. 프로덕션에서는 절대 사용하지 마세요.',
    viteTitle: 'Vite 프록시',
    viteDesc: 'Vite의 내장 프록시는 개발 서버에서 API로 요청을 전달하여, 브라우저가 동일 출처 요청만 보기 때문에 CORS를 완전히 우회합니다:',
    webpackTitle: 'Webpack devServer 프록시',
    webpackDesc: 'Create React App 및 webpack 기반 설정도 유사한 프록시를 지원합니다:',
    nextjsTitle: 'Next.js 리라이트',
    nextjsDesc: 'Next.js는 rewrites를 사용하여 자체 서버를 통해 API 요청을 프록시할 수 있습니다:',
    pitfallsTitle: '흔한 함정과 엣지 케이스',
    pitfall1Title: '함정 1: 와일드카드(*)와 자격 증명',
    pitfall1Desc: '프론트엔드가 자격 증명을 보낼 때, 서버는 Access-Control-Allow-Origin: *를 사용할 수 없습니다. 정확한 출처를 반환해야 합니다:',
    pitfall1Wrong: '잘못된 방법(자격 증명에서 실패):',
    pitfall1Right: '올바른 방법(자격 증명용 동적 출처):',
    pitfall2Title: '함정 2: OPTIONS 핸들러 누락(프리플라이트)',
    pitfall2Desc: '비단순 요청은 프리플라이트 OPTIONS 요청을 트리거합니다. 서버가 OPTIONS에 404나 405를 반환하면 실제 요청 전에 CORS가 실패합니다.',
    pitfall2List: '커스텀 헤더(Authorization, X-Request-ID 등) | GET, HEAD, POST 이외의 HTTP 메서드 | Content-Type이 폼 인코딩/multipart/텍스트가 아닌 경우',
    pitfall3Title: '함정 3: 쿠키와 SameSite',
    pitfall3Desc: '크로스오리진 쿠키에는 세 가지 조건이 필요합니다:',
    pitfall3List: '프론트엔드: fetch()에서 credentials: "include" 사용 | 백엔드: Access-Control-Allow-Credentials: true와 정확한 출처 설정 | 쿠키: SameSite=None과 Secure 플래그(HTTPS만)',
    pitfall4Title: '함정 4: 프리플라이트 응답 캐싱',
    pitfall4Desc: '프리플라이트(OPTIONS) 요청은 느릴 수 있습니다. Access-Control-Max-Age로 캐싱합니다:',
    pitfall4Note: '참고: Chrome 최대값은 7200초(2시간), Firefox 최대값은 86400초(24시간)입니다.',
    pitfall5Title: '함정 5: 리다이렉트에서의 CORS',
    pitfall5Desc: 'API 엔드포인트가 리다이렉트(301/302)하는 경우, CORS 헤더가 원래 응답과 리다이렉트된 응답 모두에 있어야 합니다. API 엔드포인트에서 리다이렉트를 피하세요.',
    faqTitle: '자주 묻는 질문',
    faq1q: '브라우저에서 CORS를 비활성화할 수 있나요?',
    faq1a: '기술적으로 가능합니다(Chrome을 --disable-web-security 플래그로 실행). 하지만 매우 위험하며 빠른 디버깅 이외에는 사용해서는 안 됩니다. 개발 환경에서는 프록시(Vite, webpack)를 사용하세요.',
    faq2q: 'Postman에서는 API가 작동하는데 브라우저에서는 안 되는 이유는?',
    faq2a: 'CORS는 브라우저 전용 보안 메커니즘입니다. Postman, curl, 서버 간 요청은 CORS를 적용하지 않습니다. 브라우저는 사용자를 보호하기 위해 CORS 헤더를 확인합니다.',
    faq3q: 'CORS는 프론트엔드 수정인가요 백엔드 수정인가요?',
    faq3a: '거의 항상 백엔드 수정입니다. 서버가 올바른 CORS 응답 헤더를 보내야 합니다. 프론트엔드는 CORS를 우회할 수 없습니다. 유일한 해결책은 프록시 사용입니다.',
    faq4q: '프로덕션에서 Access-Control-Allow-Origin: *를 사용해야 하나요?',
    faq4a: '쿠키나 인증을 사용하지 않는 완전히 공개된 API에만 해당됩니다. 자격 증명이 필요한 API는 정확한 출처를 지정해야 합니다.',
    faq5q: '프리플라이트 요청이란 무엇이며 왜 발생하나요?',
    faq5a: '프리플라이트 요청은 브라우저가 실제 요청 전에 자동으로 보내는 OPTIONS 요청입니다. 커스텀 헤더, 비단순 HTTP 메서드, 특수 Content-Type을 사용할 때 발생합니다.',
    faq6q: 'WebSocket 연결의 CORS를 어떻게 수정하나요?',
    faq6a: 'WebSocket 연결은 CORS 규칙을 따르지 않습니다. 초기 HTTP 업그레이드 핸드셰이크에 Origin 헤더가 포함되지만 서버가 수동으로 검증해야 합니다. CORS 오류가 나타나면 보통 초기 HTTP 핸드셰이크 엔드포인트의 문제입니다.',
    quickRef: '빠른 참조: CORS 헤더',
    header: '헤더',
    purpose: '목적',
    exampleValue: '값 예시',
  },
  fr: {
    title: 'Comment corriger les erreurs CORS : guide complet de dépannage',
    intro: 'Les erreurs CORS sont l\'un des problèmes les plus frustrants du développement web. Vous voyez le redoutable message rouge dans la console, votre appel API échoue, et rien ne semble fonctionner. Ce guide vous aidera à comprendre exactement ce qu\'est CORS, diagnostiquer votre erreur et la corriger.',
    whatTitle: 'Qu\'est-ce que CORS ? (Explication en 30 secondes)',
    whatDesc: 'Le Cross-Origin Resource Sharing (CORS) est une fonctionnalité de sécurité du navigateur qui bloque les pages web qui tentent d\'envoyer des requêtes vers un domaine différent de celui qui sert la page. Quand votre frontend http://localhost:3000 essaie de récupérer des données depuis http://api.example.com, le navigateur vérifie si le serveur API autorise explicitement cette requête cross-origin via des en-têtes HTTP spéciaux.',
    diagramTitle: 'Comment fonctionne CORS : le flux',
    diagramAllowed: 'Quand CORS est correctement configuré, le serveur répond avec des en-têtes qui disent au navigateur : "Oui, j\'autorise les requêtes de cette origine."',
    diagramBlocked: 'Quand CORS n\'est PAS configuré, le navigateur bloque la réponse (même si le serveur a traité la requête avec succès).',
    errorsTitle: 'Les 5 messages d\'erreur CORS les plus courants',
    error1: 'Erreur 1 : En-tête Access-Control-Allow-Origin absent',
    error1Msg: 'No \'Access-Control-Allow-Origin\' header is present on the requested resource.',
    error1Meaning: 'Signification : Le serveur n\'a pas inclus l\'en-tête Access-Control-Allow-Origin. C\'est l\'erreur CORS la plus courante.',
    error2: 'Erreur 2 : Wildcard avec identifiants',
    error2Msg: 'The value of the \'Access-Control-Allow-Origin\' header must not be the wildcard \'*\' when the request\'s credentials mode is \'include\'.',
    error2Meaning: 'Signification : Vous envoyez des cookies ou des en-têtes Authorization, mais le serveur répond avec *. Avec les identifiants, le serveur doit spécifier l\'origine exacte.',
    error3: 'Erreur 3 : Requête preflight échouée',
    error3Msg: 'Response to preflight request doesn\'t pass access control check.',
    error3Meaning: 'Signification : Le navigateur a envoyé une requête OPTIONS (preflight) et le serveur n\'a pas géré correctement cette requête.',
    error4: 'Erreur 4 : Méthode non autorisée',
    error4Msg: 'Method PUT is not allowed by Access-Control-Allow-Methods.',
    error4Meaning: 'Signification : L\'en-tête Access-Control-Allow-Methods du serveur ne contient pas la méthode HTTP utilisée.',
    error5: 'Erreur 5 : En-tête non autorisé',
    error5Msg: 'Request header field X-Custom-Header is not allowed by Access-Control-Allow-Headers.',
    error5Meaning: 'Signification : Le serveur n\'a pas autorisé l\'en-tête personnalisé dans Access-Control-Allow-Headers.',
    flowchartTitle: 'Organigramme de diagnostic : où est le problème ?',
    flowchartDesc: 'Utilisez cet arbre de décision pour identifier rapidement si votre problème CORS est frontend, backend ou proxy :',
    flowStep1: 'Étape 1 : Ouvrez DevTools > onglet Network. Voyez-vous une requête OPTIONS avant votre requête ?',
    flowStep1Yes: 'OUI -> Le navigateur envoie une requête preflight. Vérifiez si la réponse OPTIONS a le statut 200 et contient les en-têtes CORS.',
    flowStep1No: 'NON -> C\'est une requête simple. Le problème est l\'absence d\'en-têtes CORS dans la réponse du serveur.',
    flowStep2: 'Étape 2 : L\'erreur mentionne-t-elle "preflight" ?',
    flowStep2Yes: 'OUI -> Problème backend. Votre serveur doit gérer les requêtes OPTIONS.',
    flowStep2No: 'NON -> Vérifiez si vous utilisez des identifiants. Si oui, vous ne pouvez pas utiliser le wildcard (*).',
    flowStep3: 'Étape 3 : L\'API fonctionne-t-elle en appel direct (curl, Postman) ?',
    flowStep3Yes: 'OUI -> C\'est bien un problème CORS (navigateur uniquement).',
    flowStep3No: 'NON -> Ce n\'est PAS un problème CORS. L\'API elle-même a un problème.',
    flowSummary: 'Résumé : 90% des erreurs CORS se résolvent en configurant les bons en-têtes sur votre serveur backend.',
    serverFixTitle: 'Corrections côté serveur par framework',
    expressTitle: 'Express.js (Node.js)',
    djangoTitle: 'Django (Python)',
    flaskTitle: 'Flask (Python)',
    goTitle: 'Go (net/http)',
    nginxTitle: 'Configuration Nginx',
    proxyTitle: 'Proxy inverse comme middleware CORS',
    proxyDesc: 'Si vous ne pouvez pas modifier l\'API backend (API tierce), utilisez un proxy inverse pour ajouter les en-têtes CORS.',
    nginxProxyTitle: 'Proxy inverse Nginx',
    apacheProxyTitle: 'Proxy inverse Apache',
    devTitle: 'Solutions pour le développement uniquement',
    devDesc: 'Ces solutions sont uniquement pour le développement local. Ne jamais les utiliser en production.',
    viteTitle: 'Proxy Vite',
    viteDesc: 'Le proxy intégré de Vite redirige les requêtes du serveur de développement vers l\'API, évitant CORS car le navigateur ne voit que des requêtes same-origin :',
    webpackTitle: 'Proxy Webpack devServer',
    webpackDesc: 'Create React App et les setups webpack supportent un proxy similaire :',
    nextjsTitle: 'Rewrites Next.js',
    nextjsDesc: 'Next.js peut proxifier les requêtes API via son propre serveur avec les rewrites :',
    pitfallsTitle: 'Pièges courants et cas particuliers',
    pitfall1Title: 'Piège 1 : Wildcard (*) avec identifiants',
    pitfall1Desc: 'Quand le frontend envoie des identifiants, le serveur NE PEUT PAS utiliser *. Il doit renvoyer l\'origine exacte :',
    pitfall1Wrong: 'FAUX (échouera avec les identifiants) :',
    pitfall1Right: 'CORRECT (origine dynamique pour les identifiants) :',
    pitfall2Title: 'Piège 2 : Absence de gestionnaire OPTIONS (preflight)',
    pitfall2Desc: 'Les requêtes non-simples déclenchent un preflight OPTIONS. Si votre serveur renvoie 404 ou 405 pour OPTIONS, CORS échoue.',
    pitfall2List: 'En-têtes personnalisés (Authorization, X-Request-ID, etc.) | Méthodes HTTP autres que GET, HEAD, POST | Content-Type autre que form-urlencoded, multipart, text/plain',
    pitfall3Title: 'Piège 3 : Cookies et SameSite',
    pitfall3Desc: 'Les cookies cross-origin nécessitent trois conditions :',
    pitfall3List: 'Frontend : fetch() avec credentials: "include" | Backend : Access-Control-Allow-Credentials: true et origine exacte | Cookie : SameSite=None et flag Secure (HTTPS uniquement)',
    pitfall4Title: 'Piège 4 : Cache des réponses preflight',
    pitfall4Desc: 'Les requêtes preflight peuvent être lentes. Utilisez Access-Control-Max-Age pour les mettre en cache :',
    pitfall4Note: 'Note : Chrome limite à 7200 secondes (2 heures). Firefox limite à 86400 (24 heures).',
    pitfall5Title: 'Piège 5 : CORS et redirections',
    pitfall5Desc: 'Si votre endpoint API redirige (301/302), les en-têtes CORS doivent être présents sur les DEUX réponses. Évitez les redirections dans les endpoints API.',
    faqTitle: 'Questions fréquemment posées',
    faq1q: 'Peut-on désactiver CORS dans le navigateur ?',
    faq1a: 'Techniquement oui, en lançant Chrome avec --disable-web-security, mais c\'est extrêmement dangereux. Pour le développement, utilisez un proxy (Vite, webpack).',
    faq2q: 'Pourquoi mon API fonctionne dans Postman mais pas dans le navigateur ?',
    faq2a: 'CORS est un mécanisme de sécurité du navigateur uniquement. Postman, curl et les requêtes serveur-à-serveur n\'appliquent pas CORS.',
    faq3q: 'CORS est-il un correctif frontend ou backend ?',
    faq3a: 'Presque toujours backend. Le serveur doit envoyer les bons en-têtes CORS. Le frontend ne peut pas contourner CORS. La seule solution frontend est d\'utiliser un proxy.',
    faq4q: 'Faut-il utiliser Access-Control-Allow-Origin: * en production ?',
    faq4a: 'Uniquement pour les API vraiment publiques sans cookies ni authentification. Pour les API avec identifiants, spécifiez les origines exactes.',
    faq5q: 'Qu\'est-ce qu\'une requête preflight ?',
    faq5a: 'C\'est une requête OPTIONS automatique envoyée par le navigateur avant la requête réelle. Elle se produit avec des en-têtes personnalisés, des méthodes non-simples ou un Content-Type spécial.',
    faq6q: 'Comment corriger CORS pour les connexions WebSocket ?',
    faq6a: 'Les WebSocket ne suivent pas les règles CORS. Le serveur doit valider l\'en-tête Origin manuellement. Si une erreur CORS apparaît, c\'est généralement le endpoint HTTP initial.',
    quickRef: 'Référence rapide : en-têtes CORS',
    header: 'En-tête',
    purpose: 'Objectif',
    exampleValue: 'Valeur exemple',
  },
  de: {
    title: 'CORS-Fehler beheben: Der vollständige Troubleshooting-Guide',
    intro: 'CORS-Fehler gehören zu den frustrierendsten Problemen in der Webentwicklung. Sie sehen die gefürchtete rote Konsolenmeldung, Ihr API-Aufruf schlägt fehl, und nichts scheint zu funktionieren. Dieser Guide hilft Ihnen, CORS genau zu verstehen, Ihren spezifischen Fehler zu diagnostizieren und mit der richtigen Lösung zu beheben.',
    whatTitle: 'Was ist CORS? (30-Sekunden-Erklärung)',
    whatDesc: 'Cross-Origin Resource Sharing (CORS) ist eine Browser-Sicherheitsfunktion, die Webseiten daran hindert, Anfragen an eine andere Domain als die sendende zu stellen. Wenn Ihr Frontend unter http://localhost:3000 Daten von http://api.example.com abrufen möchte, prüft der Browser, ob der API-Server diese Cross-Origin-Anfrage über spezielle HTTP-Header explizit erlaubt.',
    diagramTitle: 'Wie CORS funktioniert: Der Ablauf',
    diagramAllowed: 'Wenn CORS korrekt konfiguriert ist, antwortet der Server mit Headern, die dem Browser sagen: "Ja, ich erlaube Anfragen von diesem Ursprung."',
    diagramBlocked: 'Wenn CORS NICHT konfiguriert ist, blockiert der Browser die Antwort (auch wenn der Server die Anfrage erfolgreich verarbeitet hat).',
    errorsTitle: 'Die 5 häufigsten CORS-Fehlermeldungen',
    error1: 'Fehler 1: Kein Access-Control-Allow-Origin Header',
    error1Msg: 'No \'Access-Control-Allow-Origin\' header is present on the requested resource.',
    error1Meaning: 'Bedeutung: Der Server hat keinen Access-Control-Allow-Origin Header in seiner Antwort. Dies ist der häufigste CORS-Fehler.',
    error2: 'Fehler 2: Wildcard mit Anmeldedaten',
    error2Msg: 'The value of the \'Access-Control-Allow-Origin\' header must not be the wildcard \'*\' when credentials mode is \'include\'.',
    error2Meaning: 'Bedeutung: Sie senden Cookies oder Authorization-Header, aber der Server antwortet mit *. Bei Anmeldedaten muss der Server den genauen Ursprung angeben.',
    error3: 'Fehler 3: Preflight-Anfrage fehlgeschlagen',
    error3Msg: 'Response to preflight request doesn\'t pass access control check.',
    error3Meaning: 'Bedeutung: Der Browser hat eine OPTIONS-Anfrage (Preflight) gesendet und der Server hat diese nicht korrekt behandelt.',
    error4: 'Fehler 4: Methode nicht erlaubt',
    error4Msg: 'Method PUT is not allowed by Access-Control-Allow-Methods.',
    error4Meaning: 'Bedeutung: Der Access-Control-Allow-Methods Header des Servers enthält die verwendete HTTP-Methode nicht.',
    error5: 'Fehler 5: Header nicht erlaubt',
    error5Msg: 'Request header field X-Custom-Header is not allowed by Access-Control-Allow-Headers.',
    error5Meaning: 'Bedeutung: Der Server hat den benutzerdefinierten Header nicht in Access-Control-Allow-Headers erlaubt.',
    flowchartTitle: 'Diagnose-Flussdiagramm: Wo liegt das Problem?',
    flowchartDesc: 'Verwenden Sie diesen Entscheidungsbaum, um schnell zu identifizieren, ob Ihr CORS-Problem ein Frontend-, Backend- oder Proxy-Problem ist:',
    flowStep1: 'Schritt 1: Öffnen Sie DevTools > Network-Tab. Sehen Sie eine OPTIONS-Anfrage vor Ihrer eigentlichen Anfrage?',
    flowStep1Yes: 'JA -> Der Browser sendet eine Preflight-Anfrage. Prüfen Sie, ob die OPTIONS-Antwort Status 200 hat und CORS-Header enthält.',
    flowStep1No: 'NEIN -> Dies ist eine einfache Anfrage. Das Problem sind fehlende CORS-Header in der Serverantwort.',
    flowStep2: 'Schritt 2: Erwähnt die Fehlermeldung "preflight"?',
    flowStep2Yes: 'JA -> Backend-Problem. Ihr Server muss OPTIONS-Anfragen behandeln.',
    flowStep2No: 'NEIN -> Prüfen Sie, ob Sie Anmeldedaten verwenden. Wenn ja, können Sie keinen Wildcard (*) verwenden.',
    flowStep3: 'Schritt 3: Funktioniert die API bei direktem Aufruf (curl, Postman)?',
    flowStep3Yes: 'JA -> Es ist ein CORS-Problem (nur Browser).',
    flowStep3No: 'NEIN -> Kein CORS-Problem. Die API selbst hat ein Problem.',
    flowSummary: 'Zusammenfassung: 90% der CORS-Fehler werden durch korrekte Header-Konfiguration auf dem Backend-Server gelöst.',
    serverFixTitle: 'Server-seitige Fixes nach Framework',
    expressTitle: 'Express.js (Node.js)',
    djangoTitle: 'Django (Python)',
    flaskTitle: 'Flask (Python)',
    goTitle: 'Go (net/http)',
    nginxTitle: 'Nginx-Konfiguration',
    proxyTitle: 'Reverse Proxy als CORS-Middleware',
    proxyDesc: 'Wenn Sie die Backend-API nicht ändern können (z.B. Drittanbieter-API), verwenden Sie einen Reverse Proxy, um CORS-Header hinzuzufügen.',
    nginxProxyTitle: 'Nginx Reverse Proxy',
    apacheProxyTitle: 'Apache Reverse Proxy',
    devTitle: 'Nur-Entwicklung-Lösungen',
    devDesc: 'Diese Lösungen sind nur für die lokale Entwicklung. Niemals in der Produktion verwenden.',
    viteTitle: 'Vite Proxy',
    viteDesc: 'Vites eingebauter Proxy leitet Anfragen vom Dev-Server an die API weiter und vermeidet CORS komplett:',
    webpackTitle: 'Webpack devServer Proxy',
    webpackDesc: 'Create React App und andere webpack-basierte Setups unterstützen einen ähnlichen Proxy:',
    nextjsTitle: 'Next.js Rewrites',
    nextjsDesc: 'Next.js kann API-Anfragen über seinen eigenen Server mit Rewrites proxyen:',
    pitfallsTitle: 'Häufige Fallstricke und Grenzfälle',
    pitfall1Title: 'Fallstrick 1: Wildcard (*) mit Anmeldedaten',
    pitfall1Desc: 'Wenn das Frontend Anmeldedaten sendet, KANN der Server NICHT * verwenden. Er muss den genauen Ursprung zurückgeben:',
    pitfall1Wrong: 'FALSCH (schlägt mit Anmeldedaten fehl):',
    pitfall1Right: 'RICHTIG (dynamischer Ursprung für Anmeldedaten):',
    pitfall2Title: 'Fallstrick 2: Fehlender OPTIONS-Handler (Preflight)',
    pitfall2Desc: 'Nicht-einfache Anfragen lösen einen Preflight-OPTIONS-Request aus. Wenn der Server 404 oder 405 für OPTIONS zurückgibt, scheitert CORS.',
    pitfall2List: 'Benutzerdefinierte Header (Authorization, X-Request-ID, etc.) | HTTP-Methoden außer GET, HEAD, POST | Content-Type außer form-urlencoded, multipart, text/plain',
    pitfall3Title: 'Fallstrick 3: Cookies und SameSite',
    pitfall3Desc: 'Cross-Origin Cookies benötigen drei Bedingungen:',
    pitfall3List: 'Frontend: fetch() mit credentials: "include" | Backend: Access-Control-Allow-Credentials: true und genauen Ursprung | Cookie: SameSite=None und Secure-Flag (nur HTTPS)',
    pitfall4Title: 'Fallstrick 4: Preflight-Antworten cachen',
    pitfall4Desc: 'Preflight-Anfragen können langsam sein. Verwenden Sie Access-Control-Max-Age zum Cachen:',
    pitfall4Note: 'Hinweis: Chrome begrenzt auf 7200 Sekunden (2 Stunden). Firefox auf 86400 (24 Stunden).',
    pitfall5Title: 'Fallstrick 5: CORS bei Weiterleitungen',
    pitfall5Desc: 'Wenn Ihr API-Endpoint weiterleitet (301/302), müssen CORS-Header in BEIDEN Antworten vorhanden sein. Vermeiden Sie Weiterleitungen in API-Endpoints.',
    faqTitle: 'Häufig gestellte Fragen',
    faq1q: 'Kann man CORS im Browser deaktivieren?',
    faq1a: 'Technisch ja, durch Starten von Chrome mit --disable-web-security, aber das ist extrem gefährlich. Für die Entwicklung verwenden Sie einen Proxy (Vite, webpack).',
    faq2q: 'Warum funktioniert meine API in Postman, aber nicht im Browser?',
    faq2a: 'CORS ist ein reiner Browser-Sicherheitsmechanismus. Postman, curl und Server-zu-Server-Anfragen erzwingen kein CORS.',
    faq3q: 'Ist CORS ein Frontend- oder Backend-Fix?',
    faq3a: 'Fast immer Backend. Der Server muss die richtigen CORS-Header senden. Das Frontend kann CORS nicht umgehen. Die einzige Frontend-Lösung ist ein Proxy.',
    faq4q: 'Sollte man Access-Control-Allow-Origin: * in der Produktion verwenden?',
    faq4a: 'Nur für wirklich öffentliche APIs ohne Cookies oder Authentifizierung. Bei Anmeldedaten müssen genaue Ursprünge angegeben werden.',
    faq5q: 'Was ist eine Preflight-Anfrage?',
    faq5a: 'Eine automatische OPTIONS-Anfrage, die der Browser vor der eigentlichen Anfrage sendet. Tritt bei benutzerdefinierten Headern, nicht-einfachen Methoden oder speziellem Content-Type auf.',
    faq6q: 'Wie behebt man CORS bei WebSocket-Verbindungen?',
    faq6a: 'WebSocket-Verbindungen folgen nicht den CORS-Regeln. Der Server muss den Origin-Header manuell validieren. Bei CORS-Fehlern liegt das Problem meist beim initialen HTTP-Handshake-Endpoint.',
    quickRef: 'Schnellreferenz: CORS-Header',
    header: 'Header',
    purpose: 'Zweck',
    exampleValue: 'Beispielwert',
  },
  es: {
    title: 'Cómo solucionar errores CORS: guía completa de resolución de problemas',
    intro: 'Los errores CORS son uno de los problemas más frustrantes en el desarrollo web. Ves el temido mensaje rojo en la consola, tu llamada API falla, y nada parece funcionar. Esta guía te ayudará a entender exactamente qué es CORS, diagnosticar tu error específico y solucionarlo con la solución correcta.',
    whatTitle: '¿Qué es CORS? (Explicación en 30 segundos)',
    whatDesc: 'Cross-Origin Resource Sharing (CORS) es una función de seguridad del navegador que bloquea las páginas web para que no realicen peticiones a un dominio diferente al que sirve la página. Cuando tu frontend en http://localhost:3000 intenta obtener datos de http://api.example.com, el navegador verifica si el servidor API permite explícitamente esta petición cross-origin mediante cabeceras HTTP especiales.',
    diagramTitle: 'Cómo funciona CORS: el flujo',
    diagramAllowed: 'Cuando CORS está configurado correctamente, el servidor responde con cabeceras que le dicen al navegador: "Sí, permito peticiones de este origen."',
    diagramBlocked: 'Cuando CORS NO está configurado, el navegador bloquea la respuesta (aunque el servidor haya procesado la petición correctamente).',
    errorsTitle: 'Los 5 mensajes de error CORS más comunes',
    error1: 'Error 1: Sin cabecera Access-Control-Allow-Origin',
    error1Msg: 'No \'Access-Control-Allow-Origin\' header is present on the requested resource.',
    error1Meaning: 'Significado: El servidor no incluyó la cabecera Access-Control-Allow-Origin. Es el error CORS más común.',
    error2: 'Error 2: Wildcard con credenciales',
    error2Msg: 'The value of the \'Access-Control-Allow-Origin\' header must not be the wildcard \'*\' when credentials mode is \'include\'.',
    error2Meaning: 'Significado: Estás enviando cookies o cabeceras Authorization, pero el servidor responde con *. Con credenciales, el servidor debe especificar el origen exacto.',
    error3: 'Error 3: Petición preflight fallida',
    error3Msg: 'Response to preflight request doesn\'t pass access control check.',
    error3Meaning: 'Significado: El navegador envió una petición OPTIONS (preflight) y el servidor no la manejó correctamente.',
    error4: 'Error 4: Método no permitido',
    error4Msg: 'Method PUT is not allowed by Access-Control-Allow-Methods.',
    error4Meaning: 'Significado: La cabecera Access-Control-Allow-Methods del servidor no incluye el método HTTP que estás usando.',
    error5: 'Error 5: Cabecera no permitida',
    error5Msg: 'Request header field X-Custom-Header is not allowed by Access-Control-Allow-Headers.',
    error5Meaning: 'Significado: El servidor no ha permitido la cabecera personalizada en Access-Control-Allow-Headers.',
    flowchartTitle: 'Diagrama de diagnóstico: ¿dónde está el problema?',
    flowchartDesc: 'Usa este árbol de decisión para identificar rápidamente si tu problema CORS es frontend, backend o proxy:',
    flowStep1: 'Paso 1: Abre DevTools > pestaña Network. ¿Ves una petición OPTIONS antes de tu petición?',
    flowStep1Yes: 'SÍ -> El navegador envía una petición preflight. Verifica si la respuesta OPTIONS tiene estado 200 y contiene cabeceras CORS.',
    flowStep1No: 'NO -> Es una petición simple. El problema es que la respuesta del servidor no tiene cabeceras CORS.',
    flowStep2: 'Paso 2: ¿El error menciona "preflight"?',
    flowStep2Yes: 'SÍ -> Problema de backend. Tu servidor necesita manejar peticiones OPTIONS.',
    flowStep2No: 'NO -> Verifica si usas credenciales. Si es así, no puedes usar el wildcard (*).',
    flowStep3: 'Paso 3: ¿La API funciona al llamarla directamente (curl, Postman)?',
    flowStep3Yes: 'SÍ -> Confirmado que es un problema CORS (solo navegador).',
    flowStep3No: 'NO -> NO es un problema CORS. La API misma tiene un problema.',
    flowSummary: 'Resumen: El 90% de los errores CORS se resuelven configurando las cabeceras correctas en tu servidor backend.',
    serverFixTitle: 'Correcciones del lado del servidor por framework',
    expressTitle: 'Express.js (Node.js)',
    djangoTitle: 'Django (Python)',
    flaskTitle: 'Flask (Python)',
    goTitle: 'Go (net/http)',
    nginxTitle: 'Configuración Nginx',
    proxyTitle: 'Proxy inverso como middleware CORS',
    proxyDesc: 'Si no puedes modificar la API backend (API de terceros), usa un proxy inverso para añadir cabeceras CORS.',
    nginxProxyTitle: 'Proxy inverso Nginx',
    apacheProxyTitle: 'Proxy inverso Apache',
    devTitle: 'Soluciones solo para desarrollo',
    devDesc: 'Estas soluciones son solo para desarrollo local. Nunca las uses en producción.',
    viteTitle: 'Proxy Vite',
    viteDesc: 'El proxy integrado de Vite redirige las peticiones del servidor de desarrollo a la API, evitando CORS completamente:',
    webpackTitle: 'Proxy Webpack devServer',
    webpackDesc: 'Create React App y otros setups basados en webpack soportan un proxy similar:',
    nextjsTitle: 'Rewrites de Next.js',
    nextjsDesc: 'Next.js puede proxificar peticiones API a través de su propio servidor usando rewrites:',
    pitfallsTitle: 'Trampas comunes y casos especiales',
    pitfall1Title: 'Trampa 1: Wildcard (*) con credenciales',
    pitfall1Desc: 'Cuando el frontend envía credenciales, el servidor NO PUEDE usar *. Debe devolver el origen exacto:',
    pitfall1Wrong: 'INCORRECTO (fallará con credenciales):',
    pitfall1Right: 'CORRECTO (origen dinámico para credenciales):',
    pitfall2Title: 'Trampa 2: Falta manejador OPTIONS (preflight)',
    pitfall2Desc: 'Las peticiones no simples disparan un preflight OPTIONS. Si tu servidor devuelve 404 o 405 para OPTIONS, CORS falla.',
    pitfall2List: 'Cabeceras personalizadas (Authorization, X-Request-ID, etc.) | Métodos HTTP distintos de GET, HEAD, POST | Content-Type distinto de form-urlencoded, multipart, text/plain',
    pitfall3Title: 'Trampa 3: Cookies y SameSite',
    pitfall3Desc: 'Las cookies cross-origin requieren tres condiciones:',
    pitfall3List: 'Frontend: fetch() con credentials: "include" | Backend: Access-Control-Allow-Credentials: true y origen exacto | Cookie: SameSite=None y flag Secure (solo HTTPS)',
    pitfall4Title: 'Trampa 4: Cachear respuestas preflight',
    pitfall4Desc: 'Las peticiones preflight pueden ser lentas. Usa Access-Control-Max-Age para cachearlas:',
    pitfall4Note: 'Nota: Chrome limita a 7200 segundos (2 horas). Firefox a 86400 (24 horas).',
    pitfall5Title: 'Trampa 5: CORS en redirecciones',
    pitfall5Desc: 'Si tu endpoint API redirige (301/302), las cabeceras CORS deben estar en AMBAS respuestas. Evita redirecciones en endpoints API.',
    faqTitle: 'Preguntas frecuentes',
    faq1q: '¿Se puede desactivar CORS en el navegador?',
    faq1a: 'Técnicamente sí, lanzando Chrome con --disable-web-security, pero es extremadamente peligroso. Para desarrollo, usa un proxy (Vite, webpack).',
    faq2q: '¿Por qué mi API funciona en Postman pero no en el navegador?',
    faq2a: 'CORS es un mecanismo de seguridad solo del navegador. Postman, curl y peticiones servidor-a-servidor no aplican CORS.',
    faq3q: '¿CORS es una corrección de frontend o backend?',
    faq3a: 'Casi siempre backend. El servidor debe enviar las cabeceras CORS correctas. El frontend no puede eludir CORS. La única solución frontend es usar un proxy.',
    faq4q: '¿Se debe usar Access-Control-Allow-Origin: * en producción?',
    faq4a: 'Solo para APIs verdaderamente públicas sin cookies ni autenticación. Para APIs con credenciales, especifica orígenes exactos.',
    faq5q: '¿Qué es una petición preflight?',
    faq5a: 'Es una petición OPTIONS automática que el navegador envía antes de la petición real. Ocurre con cabeceras personalizadas, métodos no simples o Content-Type especial.',
    faq6q: '¿Cómo solucionar CORS para conexiones WebSocket?',
    faq6a: 'Las conexiones WebSocket no siguen las reglas CORS. El servidor debe validar la cabecera Origin manualmente. Si aparece un error CORS, generalmente es el endpoint HTTP inicial.',
    quickRef: 'Referencia rápida: cabeceras CORS',
    header: 'Cabecera',
    purpose: 'Propósito',
    exampleValue: 'Valor ejemplo',
  },
};

const codeStyle: React.CSSProperties = { background: 'var(--bg-input)', borderRadius: 8, padding: 16, overflowX: 'auto', fontSize: 13, lineHeight: 1.7, fontFamily: 'monospace', color: 'var(--text-primary)', border: '1px solid var(--border-color)', margin: '12px 0' };
const tableStyle: React.CSSProperties = { width: '100%', borderCollapse: 'collapse', fontSize: 14, margin: '16px 0' };
const thStyle: React.CSSProperties = { textAlign: 'left', padding: '10px 12px', borderBottom: '2px solid var(--border-color)', fontWeight: 700, color: 'var(--text-primary)', background: 'var(--bg-input)' };
const tdStyle: React.CSSProperties = { padding: '10px 12px', borderBottom: '1px solid var(--border-color)', color: 'var(--text-secondary)' };
const h2Style: React.CSSProperties = { fontSize: 22, fontWeight: 700, marginTop: 40, marginBottom: 16, color: 'var(--text-primary)' };
const h3Style: React.CSSProperties = { fontSize: 18, fontWeight: 600, marginTop: 32, marginBottom: 12, color: 'var(--text-primary)' };
const pStyle: React.CSSProperties = { color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 12 };
const errorBoxStyle: React.CSSProperties = { background: 'rgba(239, 68, 68, 0.08)', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: 8, padding: 16, margin: '12px 0' };
const warningBoxStyle: React.CSSProperties = { background: 'rgba(234, 179, 8, 0.08)', border: '1px solid rgba(234, 179, 8, 0.3)', borderRadius: 8, padding: 16, margin: '12px 0' };
const flowBoxStyle: React.CSSProperties = { background: 'var(--bg-input)', border: '1px solid var(--border-color)', borderRadius: 8, padding: 16, margin: '8px 0' };

export default function CorsErrorsGuide({ lang }: { lang: string }) {
  const t = translations[lang] || translations['en'];

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: t.faq1q, acceptedAnswer: { '@type': 'Answer', text: t.faq1a } },
      { '@type': 'Question', name: t.faq2q, acceptedAnswer: { '@type': 'Answer', text: t.faq2a } },
      { '@type': 'Question', name: t.faq3q, acceptedAnswer: { '@type': 'Answer', text: t.faq3a } },
      { '@type': 'Question', name: t.faq4q, acceptedAnswer: { '@type': 'Answer', text: t.faq4a } },
      { '@type': 'Question', name: t.faq5q, acceptedAnswer: { '@type': 'Answer', text: t.faq5a } },
      { '@type': 'Question', name: t.faq6q, acceptedAnswer: { '@type': 'Answer', text: t.faq6a } },
    ],
  };

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <p style={{ fontSize: 16, lineHeight: 1.8, color: 'var(--text-secondary)' }}>{t.intro}</p>

      {/* Section 1: What is CORS */}
      <h2 style={h2Style}>{t.whatTitle}</h2>
      <p style={pStyle}>{t.whatDesc}</p>

      <h3 style={h3Style}>{t.diagramTitle}</h3>
      <pre style={codeStyle}><code>{`┌─────────────────┐         ┌─────────────────────┐
│   Browser        │         │   API Server         │
│   (Frontend)     │         │   (Backend)          │
│                  │         │                      │
│ http://localhost │ ──────> │ https://api.example  │
│     :3000        │  fetch  │     .com             │
│                  │         │                      │
└─────────────────┘         └─────────────────────┘
                                    │
                    ┌───────────────┴───────────────┐
                    │                               │
              CORS Headers                   No CORS Headers
              Present?                       Present?
                    │                               │
                    ▼                               ▼
          ┌─────────────────┐            ┌──────────────────┐
          │  Response sent  │            │  Browser BLOCKS  │
          │  to JavaScript  │            │  the response    │
          └─────────────────┘            └──────────────────┘`}</code></pre>

      <p style={pStyle}>{t.diagramAllowed}</p>
      <pre style={codeStyle}><code>{`HTTP/1.1 200 OK
Access-Control-Allow-Origin: http://localhost:3000
Content-Type: application/json

{"data": "success"}`}</code></pre>

      <p style={pStyle}>{t.diagramBlocked}</p>
      <pre style={codeStyle}><code>{`HTTP/1.1 200 OK
Content-Type: application/json
# No Access-Control-Allow-Origin header!

{"data": "success"}  <-- Browser received this but BLOCKS JavaScript from reading it`}</code></pre>

      {/* Section 2: 5 Most Common CORS Errors */}
      <h2 style={h2Style}>{t.errorsTitle}</h2>

      <h3 style={h3Style}>{t.error1}</h3>
      <div style={errorBoxStyle}>
        <pre style={{ margin: 0, fontSize: 12, fontFamily: 'monospace', color: '#ef4444', whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}><code>{t.error1Msg}</code></pre>
      </div>
      <p style={pStyle}>{t.error1Meaning}</p>

      <h3 style={h3Style}>{t.error2}</h3>
      <div style={errorBoxStyle}>
        <pre style={{ margin: 0, fontSize: 12, fontFamily: 'monospace', color: '#ef4444', whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}><code>{t.error2Msg}</code></pre>
      </div>
      <p style={pStyle}>{t.error2Meaning}</p>

      <h3 style={h3Style}>{t.error3}</h3>
      <div style={errorBoxStyle}>
        <pre style={{ margin: 0, fontSize: 12, fontFamily: 'monospace', color: '#ef4444', whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}><code>{t.error3Msg}</code></pre>
      </div>
      <p style={pStyle}>{t.error3Meaning}</p>

      <h3 style={h3Style}>{t.error4}</h3>
      <div style={errorBoxStyle}>
        <pre style={{ margin: 0, fontSize: 12, fontFamily: 'monospace', color: '#ef4444', whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}><code>{t.error4Msg}</code></pre>
      </div>
      <p style={pStyle}>{t.error4Meaning}</p>

      <h3 style={h3Style}>{t.error5}</h3>
      <div style={errorBoxStyle}>
        <pre style={{ margin: 0, fontSize: 12, fontFamily: 'monospace', color: '#ef4444', whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}><code>{t.error5Msg}</code></pre>
      </div>
      <p style={pStyle}>{t.error5Meaning}</p>

      {/* Section 3: Diagnosis Flowchart */}
      <h2 style={h2Style}>{t.flowchartTitle}</h2>
      <p style={pStyle}>{t.flowchartDesc}</p>

      <div style={flowBoxStyle}>
        <p style={{ fontWeight: 700, color: 'var(--text-primary)', marginBottom: 8 }}>{t.flowStep1}</p>
        <p style={{ color: '#22c55e', marginBottom: 4, paddingLeft: 16 }}>{t.flowStep1Yes}</p>
        <p style={{ color: '#ef4444', paddingLeft: 16 }}>{t.flowStep1No}</p>
      </div>

      <div style={flowBoxStyle}>
        <p style={{ fontWeight: 700, color: 'var(--text-primary)', marginBottom: 8 }}>{t.flowStep2}</p>
        <p style={{ color: '#22c55e', marginBottom: 4, paddingLeft: 16 }}>{t.flowStep2Yes}</p>
        <p style={{ color: '#ef4444', paddingLeft: 16 }}>{t.flowStep2No}</p>
      </div>

      <div style={flowBoxStyle}>
        <p style={{ fontWeight: 700, color: 'var(--text-primary)', marginBottom: 8 }}>{t.flowStep3}</p>
        <p style={{ color: '#22c55e', marginBottom: 4, paddingLeft: 16 }}>{t.flowStep3Yes}</p>
        <p style={{ color: '#ef4444', paddingLeft: 16 }}>{t.flowStep3No}</p>
      </div>

      <div style={warningBoxStyle}>
        <p style={{ fontWeight: 700, color: '#eab308', margin: 0 }}>{t.flowSummary}</p>
      </div>

      {/* Section 4: Server-Side Fixes */}
      <h2 style={h2Style}>{t.serverFixTitle}</h2>

      <h3 style={h3Style}>{t.expressTitle}</h3>
      <pre style={codeStyle}><code>{`// Method 1: Using the cors package (recommended)
npm install cors

const express = require('express');
const cors = require('cors');
const app = express();

// Allow specific origins
app.use(cors({
  origin: ['http://localhost:3000', 'https://yoursite.com'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  maxAge: 86400 // Cache preflight for 24 hours
}));

// Method 2: Manual middleware
app.use((req, res, next) => {
  const allowedOrigins = ['http://localhost:3000', 'https://yoursite.com'];
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,PATCH');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');

  // Handle preflight
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Max-Age', '86400');
    return res.status(204).end();
  }
  next();
});`}</code></pre>

      <h3 style={h3Style}>{t.djangoTitle}</h3>
      <pre style={codeStyle}><code>{`# Install django-cors-headers
pip install django-cors-headers

# settings.py
INSTALLED_APPS = [
    ...
    'corsheaders',
    ...
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',  # Must be FIRST
    'django.middleware.common.CommonMiddleware',
    ...
]

# Option 1: Allow specific origins
CORS_ALLOWED_ORIGINS = [
    'http://localhost:3000',
    'https://yoursite.com',
]

# Option 2: Allow all origins (dev only!)
# CORS_ALLOW_ALL_ORIGINS = True

# Allow credentials (cookies, auth headers)
CORS_ALLOW_CREDENTIALS = True

# Allowed headers
CORS_ALLOW_HEADERS = [
    'content-type',
    'authorization',
    'x-requested-with',
]

# Allowed methods
CORS_ALLOW_METHODS = [
    'GET',
    'POST',
    'PUT',
    'PATCH',
    'DELETE',
    'OPTIONS',
]`}</code></pre>

      <h3 style={h3Style}>{t.flaskTitle}</h3>
      <pre style={codeStyle}><code>{`# Install flask-cors
pip install flask-cors

from flask import Flask
from flask_cors import CORS

app = Flask(__name__)

# Option 1: Allow specific origins
CORS(app, origins=['http://localhost:3000', 'https://yoursite.com'],
     supports_credentials=True,
     allow_headers=['Content-Type', 'Authorization'],
     methods=['GET', 'POST', 'PUT', 'DELETE', 'PATCH'])

# Option 2: Manual approach
@app.after_request
def after_request(response):
    origin = request.headers.get('Origin')
    allowed = ['http://localhost:3000', 'https://yoursite.com']
    if origin in allowed:
        response.headers['Access-Control-Allow-Origin'] = origin
        response.headers['Access-Control-Allow-Methods'] = 'GET,POST,PUT,DELETE'
        response.headers['Access-Control-Allow-Headers'] = 'Content-Type,Authorization'
        response.headers['Access-Control-Allow-Credentials'] = 'true'
    return response`}</code></pre>

      <h3 style={h3Style}>{t.goTitle}</h3>
      <pre style={codeStyle}><code>{`package main

import (
    "net/http"
    "strings"
)

func corsMiddleware(next http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        allowedOrigins := map[string]bool{
            "http://localhost:3000": true,
            "https://yoursite.com": true,
        }

        origin := r.Header.Get("Origin")
        if allowedOrigins[origin] {
            w.Header().Set("Access-Control-Allow-Origin", origin)
            w.Header().Set("Access-Control-Allow-Methods",
                strings.Join([]string{"GET","POST","PUT","DELETE","PATCH"}, ","))
            w.Header().Set("Access-Control-Allow-Headers",
                "Content-Type, Authorization")
            w.Header().Set("Access-Control-Allow-Credentials", "true")
            w.Header().Set("Access-Control-Max-Age", "86400")
        }

        // Handle preflight
        if r.Method == http.MethodOptions {
            w.WriteHeader(http.StatusNoContent)
            return
        }

        next.ServeHTTP(w, r)
    })
}

func main() {
    mux := http.NewServeMux()
    mux.HandleFunc("/api/data", handleData)

    handler := corsMiddleware(mux)
    http.ListenAndServe(":8080", handler)
}`}</code></pre>

      <h3 style={h3Style}>{t.nginxTitle}</h3>
      <pre style={codeStyle}><code>{`server {
    listen 80;
    server_name api.example.com;

    # CORS headers for all locations
    set $cors_origin "";
    if ($http_origin ~* "^https?://(localhost:3000|yoursite\\.com)$") {
        set $cors_origin $http_origin;
    }

    location /api/ {
        # CORS headers
        add_header 'Access-Control-Allow-Origin' $cors_origin always;
        add_header 'Access-Control-Allow-Methods' 'GET, POST, PUT, DELETE, PATCH, OPTIONS' always;
        add_header 'Access-Control-Allow-Headers' 'Content-Type, Authorization, X-Requested-With' always;
        add_header 'Access-Control-Allow-Credentials' 'true' always;
        add_header 'Access-Control-Max-Age' 86400 always;

        # Handle preflight requests
        if ($request_method = 'OPTIONS') {
            add_header 'Access-Control-Allow-Origin' $cors_origin always;
            add_header 'Access-Control-Allow-Methods' 'GET, POST, PUT, DELETE, PATCH, OPTIONS' always;
            add_header 'Access-Control-Allow-Headers' 'Content-Type, Authorization, X-Requested-With' always;
            add_header 'Access-Control-Allow-Credentials' 'true' always;
            add_header 'Access-Control-Max-Age' 86400;
            add_header 'Content-Length' 0;
            add_header 'Content-Type' 'text/plain';
            return 204;
        }

        proxy_pass http://backend:8080;
    }
}`}</code></pre>

      {/* Section 5: Reverse Proxy as CORS Middleware */}
      <h2 style={h2Style}>{t.proxyTitle}</h2>
      <p style={pStyle}>{t.proxyDesc}</p>

      <h3 style={h3Style}>{t.nginxProxyTitle}</h3>
      <pre style={codeStyle}><code>{`# Nginx as CORS proxy for a third-party API
server {
    listen 80;
    server_name cors-proxy.yoursite.com;

    location /proxy/ {
        # Add CORS headers
        add_header 'Access-Control-Allow-Origin' 'https://yoursite.com' always;
        add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS' always;
        add_header 'Access-Control-Allow-Headers' 'Content-Type, Authorization' always;

        if ($request_method = 'OPTIONS') {
            add_header 'Access-Control-Allow-Origin' 'https://yoursite.com';
            add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS';
            add_header 'Access-Control-Allow-Headers' 'Content-Type, Authorization';
            add_header 'Access-Control-Max-Age' 86400;
            return 204;
        }

        # Strip /proxy/ prefix and forward to third-party API
        rewrite ^/proxy/(.*) /$1 break;
        proxy_pass https://third-party-api.com;
        proxy_set_header Host third-party-api.com;
        proxy_set_header X-Real-IP $remote_addr;
    }
}

# Usage: fetch('https://cors-proxy.yoursite.com/proxy/endpoint')`}</code></pre>

      <h3 style={h3Style}>{t.apacheProxyTitle}</h3>
      <pre style={codeStyle}><code>{`# Apache as CORS proxy
<VirtualHost *:80>
    ServerName cors-proxy.yoursite.com

    # Enable required modules
    # a2enmod proxy proxy_http headers rewrite

    <Location "/proxy/">
        Header always set Access-Control-Allow-Origin "https://yoursite.com"
        Header always set Access-Control-Allow-Methods "GET, POST, PUT, DELETE, OPTIONS"
        Header always set Access-Control-Allow-Headers "Content-Type, Authorization"
        Header always set Access-Control-Allow-Credentials "true"

        # Handle preflight
        RewriteEngine On
        RewriteCond %{REQUEST_METHOD} OPTIONS
        RewriteRule ^(.*)$ $1 [R=204,L]

        # Proxy to backend
        ProxyPass "http://backend:8080/"
        ProxyPassReverse "http://backend:8080/"
    </Location>
</VirtualHost>`}</code></pre>

      {/* Section 6: Dev-Only Solutions */}
      <h2 style={h2Style}>{t.devTitle}</h2>
      <div style={warningBoxStyle}>
        <p style={{ fontWeight: 700, color: '#eab308', margin: 0 }}>{t.devDesc}</p>
      </div>

      <h3 style={h3Style}>{t.viteTitle}</h3>
      <p style={pStyle}>{t.viteDesc}</p>
      <pre style={codeStyle}><code>{`// vite.config.ts
import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    proxy: {
      // Proxy /api requests to backend
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        // Optional: rewrite path
        // rewrite: (path) => path.replace(/^\\/api/, ''),
      },
      // Proxy with WebSocket support
      '/ws': {
        target: 'ws://localhost:8080',
        ws: true,
      },
    },
  },
});

// In your code, use relative URLs:
// fetch('/api/users')  instead of  fetch('http://localhost:8080/api/users')`}</code></pre>

      <h3 style={h3Style}>{t.webpackTitle}</h3>
      <p style={pStyle}>{t.webpackDesc}</p>
      <pre style={codeStyle}><code>{`// package.json (Create React App)
{
  "proxy": "http://localhost:8080"
}

// Or for more control, create src/setupProxy.js
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:8080',
      changeOrigin: true,
    })
  );
};

// webpack.config.js (manual setup)
module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      },
    },
  },
};`}</code></pre>

      <h3 style={h3Style}>{t.nextjsTitle}</h3>
      <p style={pStyle}>{t.nextjsDesc}</p>
      <pre style={codeStyle}><code>{`// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:8080/api/:path*',
      },
    ];
  },
};

module.exports = nextConfig;

// In your code:
// fetch('/api/users')  -- proxied to http://localhost:8080/api/users`}</code></pre>

      {/* Section 7: Pitfalls */}
      <h2 style={h2Style}>{t.pitfallsTitle}</h2>

      <h3 style={h3Style}>{t.pitfall1Title}</h3>
      <p style={pStyle}>{t.pitfall1Desc}</p>
      <p style={{ ...pStyle, fontWeight: 600, color: '#ef4444' }}>{t.pitfall1Wrong}</p>
      <pre style={codeStyle}><code>{`// Frontend
fetch('https://api.example.com/data', {
  credentials: 'include'  // Sending cookies
});

// Backend response header:
Access-Control-Allow-Origin: *   // FAILS! Cannot use * with credentials`}</code></pre>
      <p style={{ ...pStyle, fontWeight: 600, color: '#22c55e' }}>{t.pitfall1Right}</p>
      <pre style={codeStyle}><code>{`// Backend (Express.js example)
app.use((req, res, next) => {
  // Echo back the exact origin
  const origin = req.headers.origin;
  const allowedOrigins = ['http://localhost:3000', 'https://yoursite.com'];

  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);  // Exact origin
  }
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  next();
});`}</code></pre>

      <h3 style={h3Style}>{t.pitfall2Title}</h3>
      <p style={pStyle}>{t.pitfall2Desc}</p>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>Trigger</th>
            <th style={thStyle}>Example</th>
          </tr>
        </thead>
        <tbody>
          {[
            ['Custom headers', 'Authorization, X-Request-ID, X-API-Key'],
            ['Non-simple methods', 'PUT, DELETE, PATCH'],
            ['Non-simple Content-Type', 'application/json, application/xml'],
            ['ReadableStream body', 'Streaming request body'],
          ].map(([trigger, example], i) => (
            <tr key={i}>
              <td style={{ ...tdStyle, fontWeight: 600 }}>{trigger}</td>
              <td style={{ ...tdStyle, fontFamily: 'monospace', fontSize: 12 }}>{example}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <pre style={codeStyle}><code>{`// Ensure your server handles OPTIONS for all API routes:
app.options('*', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', req.headers.origin || '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,PATCH');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');
  res.setHeader('Access-Control-Max-Age', '86400');
  res.status(204).end();
});`}</code></pre>

      <h3 style={h3Style}>{t.pitfall3Title}</h3>
      <p style={pStyle}>{t.pitfall3Desc}</p>
      <pre style={codeStyle}><code>{`// 1. Frontend: include credentials
fetch('https://api.example.com/data', {
  credentials: 'include'
});

// 2. Backend: allow credentials + exact origin
res.setHeader('Access-Control-Allow-Origin', 'https://yoursite.com');  // NOT *
res.setHeader('Access-Control-Allow-Credentials', 'true');

// 3. Cookie must have correct attributes
Set-Cookie: session=abc123; SameSite=None; Secure; HttpOnly; Path=/

// IMPORTANT: SameSite=None requires Secure (HTTPS).
// This means cross-origin cookies do NOT work on HTTP (localhost).
// For local dev, use a proxy instead of cross-origin cookies.`}</code></pre>

      <h3 style={h3Style}>{t.pitfall4Title}</h3>
      <p style={pStyle}>{t.pitfall4Desc}</p>
      <pre style={codeStyle}><code>{`// Server response header:
Access-Control-Max-Age: 86400  // Cache preflight for 24 hours

// Without this header, the browser sends a preflight OPTIONS
// request before EVERY non-simple request, adding latency.

// With caching, the browser remembers the CORS permissions
// and skips the preflight for subsequent requests.`}</code></pre>
      <p style={{ ...pStyle, fontStyle: 'italic', fontSize: 13 }}>{t.pitfall4Note}</p>

      <h3 style={h3Style}>{t.pitfall5Title}</h3>
      <p style={pStyle}>{t.pitfall5Desc}</p>
      <pre style={codeStyle}><code>{`// PROBLEM: API endpoint redirects
// GET https://api.example.com/users -> 301 -> https://api.example.com/v2/users
// CORS headers must be on BOTH responses!

// SOLUTION: Avoid redirects in API endpoints
// Option 1: Update the frontend URL
fetch('https://api.example.com/v2/users');  // Use final URL directly

// Option 2: Make the redirect include CORS headers
// (requires server configuration on both the old and new endpoint)`}</code></pre>

      {/* Quick Reference Table */}
      <h2 style={h2Style}>{t.quickRef}</h2>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>{t.header}</th>
            <th style={thStyle}>{t.purpose}</th>
            <th style={thStyle}>{t.exampleValue}</th>
          </tr>
        </thead>
        <tbody>
          {[
            ['Access-Control-Allow-Origin', 'Which origins can access the resource', 'https://yoursite.com  or  *'],
            ['Access-Control-Allow-Methods', 'Which HTTP methods are allowed', 'GET, POST, PUT, DELETE'],
            ['Access-Control-Allow-Headers', 'Which request headers are allowed', 'Content-Type, Authorization'],
            ['Access-Control-Allow-Credentials', 'Whether cookies/auth can be sent', 'true'],
            ['Access-Control-Max-Age', 'How long to cache preflight (seconds)', '86400'],
            ['Access-Control-Expose-Headers', 'Which response headers JS can read', 'X-Total-Count, X-Request-ID'],
          ].map(([header, purpose, example], i) => (
            <tr key={i}>
              <td style={{ ...tdStyle, fontFamily: 'monospace', fontWeight: 600, fontSize: 12 }}>{header}</td>
              <td style={tdStyle}>{purpose}</td>
              <td style={{ ...tdStyle, fontFamily: 'monospace', fontSize: 12 }}>{example}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Section 8: FAQ */}
      <h2 style={h2Style}>{t.faqTitle}</h2>
      {[
        { q: t.faq1q, a: t.faq1a },
        { q: t.faq2q, a: t.faq2a },
        { q: t.faq3q, a: t.faq3a },
        { q: t.faq4q, a: t.faq4a },
        { q: t.faq5q, a: t.faq5a },
        { q: t.faq6q, a: t.faq6a },
      ].map((faq, i) => (
        <details key={i} style={{ marginBottom: 12, padding: '12px 16px', background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)' }}>
          <summary style={{ fontWeight: 700, cursor: 'pointer', color: 'var(--text-primary)' }}>{faq.q}</summary>
          <p style={{ marginTop: 8, color: 'var(--text-secondary)', lineHeight: 1.7 }}>{faq.a}</p>
        </details>
      ))}
    </div>
  );
}
