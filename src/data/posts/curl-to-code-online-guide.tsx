'use client';
import Link from 'next/link';

const t: Record<string, Record<string, string>> = {
  en: {
    tldr_title: 'TL;DR',
    tldr: 'cURL is the universal command-line tool for HTTP requests, and converting cURL commands to production code is a daily task for API developers. This guide covers converting cURL to JavaScript (fetch, axios), Python (requests, httpx), Go (net/http), and PHP (cURL extension). We explain every common flag (-X, -H, -d, -b, -u, -k, -F, --data-raw), authentication patterns (Bearer, Basic, API key), file uploads with multipart/form-data, and debugging techniques. Use our free online converter to generate code instantly.',
    takeaways_title: 'Key Takeaways',
    takeaway1: 'cURL commands map directly to HTTP client libraries in every language: fetch (JS), requests (Python), net/http (Go), curl_exec (PHP).',
    takeaway2: 'The -d flag defaults to application/x-www-form-urlencoded. Always add -H "Content-Type: application/json" for JSON APIs.',
    takeaway3: 'Use -u user:pass for Basic auth, -H "Authorization: Bearer TOKEN" for OAuth/JWT, and query parameters or headers for API keys.',
    takeaway4: 'File uploads use -F "file=@path" which sends multipart/form-data. In code, use FormData (JS), files= (Python), or multipart.Writer (Go).',
    takeaway5: 'Never use -k (--insecure) in production. It disables TLS certificate verification and makes your app vulnerable to MITM attacks.',
    takeaway6: 'Use --verbose (-v) and --trace to debug cURL requests. These show full request/response headers and help diagnose API issues.',
    link_tool: 'Try our free cURL to Code Converter',

    h2_what: 'What Is cURL and Why Developers Use It',
    what_p1: '<strong>cURL</strong> (Client URL) is a command-line tool for transferring data over network protocols including HTTP, HTTPS, FTP, and more. It ships pre-installed on macOS, most Linux distributions, and Windows 10+. When API documentation provides request examples, they are almost always written as cURL commands because cURL is the universal lowest-common-denominator for HTTP testing.',
    what_p2: 'Developers use cURL to quickly test API endpoints before writing application code. You can copy a cURL command from browser DevTools (right-click a network request and select "Copy as cURL"), paste it into your terminal, and immediately see the response. The next step is converting that working cURL command into production code in your application language.',
    what_p3: 'A typical cURL command follows this structure: <code>curl [options] [URL]</code>. Options control the HTTP method, headers, request body, authentication, cookies, and connection behavior. Understanding these options is the key to accurate code conversion.',

    h2_flags: 'Common cURL Flags Explained',
    flags_p1: 'Before converting cURL to code, you need to understand what each flag does. Here are the flags you will encounter most frequently in API documentation:',
    flag_X: '<strong>-X, --request</strong>: Sets the HTTP method (GET, POST, PUT, PATCH, DELETE). If omitted, cURL defaults to GET. When -d is used, cURL automatically switches to POST.',
    flag_H: '<strong>-H, --header</strong>: Adds a request header. Can be repeated for multiple headers. Example: <code>-H "Content-Type: application/json" -H "Accept: application/json"</code>.',
    flag_d: '<strong>-d, --data</strong>: Sends data in the request body. Defaults to Content-Type: application/x-www-form-urlencoded. Automatically sets the method to POST. Use with <code>-H "Content-Type: application/json"</code> for JSON payloads.',
    flag_data_raw: '<strong>--data-raw</strong>: Like -d but does not interpret the @ character as a file reference. Useful when your JSON payload contains @ symbols.',
    flag_b: '<strong>-b, --cookie</strong>: Sends cookies with the request. Can be a string like <code>-b "session=abc123; theme=dark"</code> or a file path like <code>-b cookies.txt</code>.',
    flag_u: '<strong>-u, --user</strong>: Sets Basic authentication credentials. Format: <code>-u username:password</code>. cURL automatically Base64-encodes the credentials and adds the Authorization header.',
    flag_k: '<strong>-k, --insecure</strong>: Skips TLS certificate verification. Useful for local development with self-signed certificates but must never be used in production.',
    flag_F: '<strong>-F, --form</strong>: Sends multipart/form-data. Used for file uploads: <code>-F "file=@photo.jpg"</code>. Can include additional fields: <code>-F "name=avatar" -F "file=@photo.jpg"</code>.',
    flag_L: '<strong>-L, --location</strong>: Follows HTTP redirects (301, 302, 307, 308). Most HTTP libraries follow redirects by default, so this flag often needs no code equivalent.',
    flag_v: '<strong>-v, --verbose</strong>: Shows full request and response headers. Essential for debugging. Lines prefixed with <code>&gt;</code> are sent headers, <code>&lt;</code> are received headers.',
    flag_o: '<strong>-o, --output</strong>: Saves the response body to a file instead of printing to stdout. Example: <code>-o response.json</code>.',

    h2_js: 'Converting cURL to JavaScript',
    js_p1: 'JavaScript offers two primary HTTP clients: the built-in <strong>fetch API</strong> (available in browsers and Node.js 18+) and the popular <strong>axios</strong> library. Both can express any cURL command.',
    h3_fetch: 'fetch API',
    fetch_p1: 'The fetch API is the standard built-in HTTP client. It returns Promises and works in browsers, Node.js 18+, Deno, and Bun. Here is how to convert common cURL patterns:',
    h3_axios: 'axios',
    axios_p1: '<strong>axios</strong> is a popular HTTP client with automatic JSON parsing, interceptors, request cancellation, and better error handling than fetch. Install with <code>npm install axios</code>:',
    h3_nodefetch: 'node-fetch (Node.js < 18)',
    nodefetch_p1: 'For Node.js versions before 18, <strong>node-fetch</strong> provides a fetch-compatible API. Install with <code>npm install node-fetch</code>. The API is nearly identical to browser fetch:',

    h2_python: 'Converting cURL to Python',
    python_p1: 'Python has two excellent HTTP client libraries: <strong>requests</strong> (the classic standard) and <strong>httpx</strong> (the modern async-capable alternative).',
    h3_requests: 'requests Library',
    requests_p1: 'The <strong>requests</strong> library is the most popular Python HTTP client. Install with <code>pip install requests</code>. cURL commands map very naturally to requests:',
    h3_httpx: 'httpx Library',
    httpx_p1: '<strong>httpx</strong> is a modern HTTP client that supports both sync and async operations, HTTP/2, and has an API similar to requests. Install with <code>pip install httpx</code>:',

    h2_go: 'Converting cURL to Go',
    go_p1: 'Go\'s standard library <code>net/http</code> package handles all HTTP needs without third-party dependencies. The conversion is more verbose than Python or JavaScript but gives full control over every aspect of the request:',

    h2_php: 'Converting cURL to PHP',
    php_p1: 'PHP has a built-in <strong>cURL extension</strong> that closely mirrors the command-line cURL tool. It uses an imperative handle-based API with <code>curl_init()</code>, <code>curl_setopt()</code>, and <code>curl_exec()</code>:',

    h2_auth: 'Authentication Patterns in cURL',
    auth_p1: 'Authentication is a critical part of most API calls. Here are the three most common patterns and how they translate to code:',
    h3_bearer: 'Bearer Token (OAuth 2.0 / JWT)',
    bearer_p1: 'Bearer tokens are the most common authentication method for modern APIs. The token is sent in the Authorization header:',
    h3_basic: 'Basic Authentication',
    basic_p1: 'Basic auth encodes username:password in Base64. cURL handles this automatically with the <code>-u</code> flag:',
    h3_apikey: 'API Key Authentication',
    apikey_p1: 'API keys can be sent as query parameters, headers, or in the request body. The method depends on the API:',

    h2_upload: 'File Uploads with cURL',
    upload_p1: 'File uploads use the <code>-F</code> flag which sends data as <code>multipart/form-data</code>. This is required for sending binary files like images, PDFs, and archives. Each <code>-F</code> flag adds a form field.',
    upload_p2: 'The <code>@</code> prefix tells cURL to read from a file. Without it, the value is sent as a text field. You can mix file and text fields in a single request.',

    h2_debug: 'Debugging cURL Requests',
    debug_p1: 'When your API calls fail, cURL provides powerful debugging tools:',
    debug_verbose: '<strong>--verbose (-v)</strong>: Shows the complete request and response including headers, TLS handshake, and connection info. Lines starting with <code>*</code> are connection info, <code>&gt;</code> are request headers, <code>&lt;</code> are response headers.',
    debug_trace: '<strong>--trace or --trace-ascii</strong>: Dumps the full data transmitted and received in hex and ASCII. More detailed than verbose mode.',
    debug_write: '<strong>-w (--write-out)</strong>: Prints specific metrics after the request. Useful for performance debugging. Use <code>-w "\\nHTTP Code: %{http_code}\\nTime Total: %{time_total}s\\n"</code> to see status code and timing.',
    debug_fail: '<strong>-f (--fail)</strong>: Returns a non-zero exit code on HTTP errors (4xx/5xx). Useful in shell scripts to detect failures.',

    h2_mistakes: 'Common cURL Mistakes and How to Fix Them',
    mistakes_p1: 'These are the most frequent mistakes developers make when working with cURL commands:',
    mistake1_title: 'Missing Content-Type Header',
    mistake1: 'When sending JSON with <code>-d</code>, cURL defaults to <code>application/x-www-form-urlencoded</code>. Most APIs reject this. Always add <code>-H "Content-Type: application/json"</code>.',
    mistake2_title: 'Quoting Issues on Windows',
    mistake2: 'Windows cmd.exe uses double quotes for strings, so JSON payloads need escaped inner quotes: <code>-d "{\\"key\\":\\"value\\"}"</code>. Use PowerShell or WSL for easier cURL usage.',
    mistake3_title: 'Using -k in Production',
    mistake3: 'The <code>-k</code> flag disables TLS verification. In production code, configure proper CA certificates instead. In Python: <code>verify=True</code> (default). In Node.js: do not set <code>rejectUnauthorized: false</code>.',
    mistake4_title: 'Forgetting to URL-encode Query Parameters',
    mistake4: 'Special characters in query parameters must be percent-encoded. Use <code>--data-urlencode</code> for form data, or encode parameters in your code with <code>encodeURIComponent()</code> (JS) or <code>urllib.parse.quote()</code> (Python).',
    mistake5_title: 'Not Handling Response Errors',
    mistake5: 'cURL returns exit code 0 for HTTP 4xx/5xx responses by default. In code, always check the response status code and handle errors appropriately.',
    mistake6_title: 'Hardcoding Secrets',
    mistake6: 'Never put API keys or tokens directly in cURL commands saved to scripts or version control. Use environment variables: <code>-H "Authorization: Bearer $API_TOKEN"</code>.',

    h2_faq: 'Frequently Asked Questions',
    faq1_q: 'How do I convert a cURL command to JavaScript fetch?',
    faq1_a: 'Map cURL flags to fetch options: -X POST becomes method: "POST", -H values go into the headers object, -d becomes the body parameter (use JSON.stringify() for JSON), and -u user:pass becomes a Base64-encoded Authorization: Basic header. Our free cURL converter tool handles all these mappings automatically.',
    faq2_q: 'What is the difference between -d and --data-raw in cURL?',
    faq2_a: 'The -d (--data) flag treats the @ character as a file reference, so -d "@file.json" reads data from file.json. The --data-raw flag sends the data literally without interpreting @. Use --data-raw when your JSON payload contains @ symbols, such as email addresses in request bodies.',
    faq3_q: 'How do I handle cURL basic authentication in Python?',
    faq3_a: 'cURL -u user:password maps to the auth parameter in Python requests: requests.get(url, auth=("user", "password")). The library handles Base64 encoding and the Authorization header automatically. For bearer tokens, use headers={"Authorization": "Bearer TOKEN"}.',
    faq4_q: 'How do I convert a cURL file upload to code?',
    faq4_a: 'cURL file uploads use -F "file=@filename.jpg". In JavaScript, use FormData with formData.append("file", fileBlob). In Python, use requests.post(url, files={"file": open("filename.jpg", "rb")}). In Go, use multipart.NewWriter to construct the multipart body. Each language has its own multipart body construction API.',
    faq5_q: 'Why does my API return 415 Unsupported Media Type?',
    faq5_a: 'This usually happens because you are sending JSON data with -d but forgot to add -H "Content-Type: application/json". Without this header, cURL defaults to application/x-www-form-urlencoded, which the API does not accept for JSON endpoints. Always set the Content-Type header explicitly.',
    faq6_q: 'Can I convert cURL to multiple programming languages at once?',
    faq6_a: 'Yes! Our free cURL to Code converter at DevToolBox parses any cURL command and generates equivalent code in JavaScript (fetch and axios), Python (requests), Go (net/http), PHP, and more. Paste your cURL command and select your target language to get production-ready code instantly.',
    faq7_q: 'How do I debug a failing cURL command?',
    faq7_a: 'Use -v (--verbose) to see full request and response headers. Use --trace-ascii - for complete data dumps. Use -w to print timing and status code info. Check that your Content-Type header matches your body format, your authentication credentials are correct, and the URL is properly encoded.',
    faq8_q: 'Is it safe to use -k (--insecure) flag in cURL?',
    faq8_a: 'The -k flag skips TLS certificate verification. It is acceptable for local development with self-signed certificates, but you must never use it in production. It makes your connection vulnerable to man-in-the-middle attacks. In production, configure proper CA certificates and use the default secure verification.',

    conclusion: 'Converting <strong>cURL commands to code</strong> is a fundamental skill for API development. By understanding cURL flags and how they map to HTTP client libraries in JavaScript, Python, Go, and PHP, you can integrate any API quickly and correctly. Remember to always set Content-Type headers explicitly, use environment variables for secrets, handle errors properly, and never disable TLS verification in production.',
    link_tool_bottom: 'Convert any cURL command to production code with our free online tool.',
  },
  zh: {
    tldr_title: 'TL;DR',
    tldr: 'cURL 是通用的 HTTP 命令行工具，将 cURL 命令转换为生产代码是 API 开发者的日常任务。本指南涵盖转换到 JavaScript（fetch、axios）、Python（requests、httpx）、Go（net/http）和 PHP（cURL 扩展）。详解每个常用标志（-X、-H、-d、-b、-u、-k、-F、--data-raw）、认证模式（Bearer、Basic、API key）、文件上传和调试技巧。',
    takeaways_title: '核心要点',
    takeaway1: 'cURL 命令直接映射到每种语言的 HTTP 客户端库：fetch（JS）、requests（Python）、net/http（Go）、curl_exec（PHP）。',
    takeaway2: '-d 标志默认为 application/x-www-form-urlencoded。对于 JSON API 务必添加 -H "Content-Type: application/json"。',
    takeaway3: '使用 -u user:pass 进行 Basic 认证，-H "Authorization: Bearer TOKEN" 进行 OAuth/JWT 认证。',
    takeaway4: '文件上传使用 -F "file=@path" 发送 multipart/form-data。在代码中使用 FormData（JS）、files=（Python）或 multipart.Writer（Go）。',
    takeaway5: '生产环境中绝不使用 -k（--insecure），它会禁用 TLS 证书验证。',
    takeaway6: '使用 --verbose（-v）和 --trace 调试 cURL 请求，查看完整的请求/响应头。',
    link_tool: '试用我们的免费 cURL 转代码工具',
    h2_what: '什么是 cURL，为什么开发者使用它',
    what_p1: '<strong>cURL</strong>（Client URL）是通过网络协议传输数据的命令行工具，预装在 macOS、大多数 Linux 发行版和 Windows 10+ 上。API 文档几乎都使用 cURL 格式提供请求示例。',
    what_p2: '开发者使用 cURL 快速测试 API 端点。你可以从浏览器 DevTools 复制 cURL 命令，在终端中测试，然后将其转换为应用代码。',
    what_p3: '典型的 cURL 命令结构：<code>curl [选项] [URL]</code>。选项控制 HTTP 方法、头部、请求体、认证、Cookie 和连接行为。',
    h2_flags: '常用 cURL 标志详解',
    flags_p1: '转换 cURL 之前，需要理解每个标志的含义：',
    flag_X: '<strong>-X, --request</strong>：设置 HTTP 方法（GET、POST、PUT、PATCH、DELETE）。',
    flag_H: '<strong>-H, --header</strong>：添加请求头。可重复使用。',
    flag_d: '<strong>-d, --data</strong>：发送请求体数据。默认 Content-Type 为 application/x-www-form-urlencoded。',
    flag_data_raw: '<strong>--data-raw</strong>：类似 -d 但不解释 @ 字符。',
    flag_b: '<strong>-b, --cookie</strong>：发送 Cookie。',
    flag_u: '<strong>-u, --user</strong>：设置 Basic 认证凭据。',
    flag_k: '<strong>-k, --insecure</strong>：跳过 TLS 证书验证。仅用于本地开发。',
    flag_F: '<strong>-F, --form</strong>：发送 multipart/form-data，用于文件上传。',
    flag_L: '<strong>-L, --location</strong>：跟随 HTTP 重定向。',
    flag_v: '<strong>-v, --verbose</strong>：显示完整请求和响应头，用于调试。',
    flag_o: '<strong>-o, --output</strong>：将响应保存到文件。',
    h2_js: '将 cURL 转换为 JavaScript',
    js_p1: 'JavaScript 有两个主要 HTTP 客户端：内置的 <strong>fetch API</strong> 和流行的 <strong>axios</strong> 库。',
    h3_fetch: 'fetch API', fetch_p1: 'fetch API 是标准的内置 HTTP 客户端，在浏览器和 Node.js 18+ 中可用：',
    h3_axios: 'axios', axios_p1: '<strong>axios</strong> 提供自动 JSON 解析、拦截器和更好的错误处理。使用 <code>npm install axios</code> 安装：',
    h3_nodefetch: 'node-fetch (Node.js < 18)', nodefetch_p1: 'Node.js 18 之前的版本使用 <strong>node-fetch</strong> 提供兼容的 fetch API：',
    h2_python: '将 cURL 转换为 Python',
    python_p1: 'Python 有两个优秀的 HTTP 客户端库：<strong>requests</strong> 和 <strong>httpx</strong>。',
    h3_requests: 'requests 库', requests_p1: '<strong>requests</strong> 是最流行的 Python HTTP 客户端：',
    h3_httpx: 'httpx 库', httpx_p1: '<strong>httpx</strong> 是支持异步操作和 HTTP/2 的现代 HTTP 客户端：',
    h2_go: '将 cURL 转换为 Go',
    go_p1: 'Go 标准库的 <code>net/http</code> 包无需第三方依赖即可处理所有 HTTP 需求：',
    h2_php: '将 cURL 转换为 PHP',
    php_p1: 'PHP 内置的 <strong>cURL 扩展</strong>与命令行 cURL 工具密切对应：',
    h2_auth: 'cURL 中的认证模式',
    auth_p1: '认证是大多数 API 调用的关键部分。以下是三种最常见的模式：',
    h3_bearer: 'Bearer Token（OAuth 2.0 / JWT）', bearer_p1: 'Bearer 令牌是最常见的认证方法：',
    h3_basic: 'Basic 认证', basic_p1: 'Basic 认证将 username:password 进行 Base64 编码：',
    h3_apikey: 'API Key 认证', apikey_p1: 'API 密钥可通过查询参数、头部或请求体发送：',
    h2_upload: 'cURL 文件上传',
    upload_p1: '文件上传使用 <code>-F</code> 标志以 <code>multipart/form-data</code> 格式发送数据。',
    upload_p2: '<code>@</code> 前缀告诉 cURL 从文件读取。没有它，值作为文本字段发送。',
    h2_debug: '调试 cURL 请求',
    debug_p1: '当 API 调用失败时，cURL 提供强大的调试工具：',
    debug_verbose: '<strong>--verbose (-v)</strong>：显示完整的请求和响应。',
    debug_trace: '<strong>--trace</strong>：转储完整的传输数据。',
    debug_write: '<strong>-w</strong>：打印请求指标，用于性能调试。',
    debug_fail: '<strong>-f</strong>：HTTP 错误时返回非零退出码。',
    h2_mistakes: '常见 cURL 错误及修复方法',
    mistakes_p1: '开发者使用 cURL 时最常犯的错误：',
    mistake1_title: '缺少 Content-Type 头', mistake1: '发送 JSON 时使用 -d 但忘记添加 Content-Type 头。',
    mistake2_title: 'Windows 引号问题', mistake2: 'Windows cmd.exe 的引号处理不同，建议使用 PowerShell 或 WSL。',
    mistake3_title: '生产环境使用 -k', mistake3: '-k 标志禁用 TLS 验证，生产环境中应配置正确的 CA 证书。',
    mistake4_title: '忘记 URL 编码', mistake4: '查询参数中的特殊字符必须进行百分号编码。',
    mistake5_title: '未处理响应错误', mistake5: '在代码中始终检查响应状态码并适当处理错误。',
    mistake6_title: '硬编码密钥', mistake6: '使用环境变量而非直接将 API 密钥写入脚本。',
    h2_faq: '常见问题',
    faq1_q: '如何将 cURL 命令转换为 JavaScript fetch？', faq1_a: '将 cURL 标志映射到 fetch 选项：-X POST 变为 method: "POST"，-H 值放入 headers 对象，-d 变为 body 参数。我们的免费工具可自动处理。',
    faq2_q: 'cURL 中 -d 和 --data-raw 有什么区别？', faq2_a: '-d 将 @ 字符解释为文件引用，--data-raw 则按字面意思发送数据。当 JSON 包含 @ 符号时使用 --data-raw。',
    faq3_q: '如何在 Python 中处理 cURL 的 Basic 认证？', faq3_a: 'cURL -u user:password 映射到 requests 的 auth 参数：requests.get(url, auth=("user", "password"))。',
    faq4_q: '如何将 cURL 文件上传转换为代码？', faq4_a: '使用 FormData（JS）、files=参数（Python）或 multipart.Writer（Go）。',
    faq5_q: '为什么 API 返回 415 Unsupported Media Type？', faq5_a: '通常是因为发送 JSON 时忘记设置 Content-Type: application/json 头。',
    faq6_q: '可以一次转换为多种语言吗？', faq6_a: '可以！我们的工具支持 JavaScript、Python、Go、PHP 等多种语言。',
    faq7_q: '如何调试失败的 cURL 命令？', faq7_a: '使用 -v 查看完整请求头，--trace-ascii 查看数据转储，-w 查看性能指标。',
    faq8_q: '使用 -k 标志安全吗？', faq8_a: '-k 跳过 TLS 验证，仅可用于本地开发，生产环境中绝不使用。',
    conclusion: '将 <strong>cURL 命令转换为代码</strong>是 API 开发的基本技能。理解 cURL 标志及其在各语言中的映射，就能快速正确地集成任何 API。记住始终显式设置 Content-Type 头，使用环境变量存储密钥，正确处理错误，生产环境中不禁用 TLS 验证。',
    link_tool_bottom: '使用我们的免费在线工具将任何 cURL 命令转换为生产代码。',
  },
};

export default function CurlToCodeOnlineGuide({ lang }: { lang: string }) {
  const s = t[lang] || t['en'];

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: s.faq1_q, acceptedAnswer: { '@type': 'Answer', text: s.faq1_a } },
      { '@type': 'Question', name: s.faq2_q, acceptedAnswer: { '@type': 'Answer', text: s.faq2_a } },
      { '@type': 'Question', name: s.faq3_q, acceptedAnswer: { '@type': 'Answer', text: s.faq3_a } },
      { '@type': 'Question', name: s.faq4_q, acceptedAnswer: { '@type': 'Answer', text: s.faq4_a } },
      { '@type': 'Question', name: s.faq5_q, acceptedAnswer: { '@type': 'Answer', text: s.faq5_a } },
      { '@type': 'Question', name: s.faq6_q, acceptedAnswer: { '@type': 'Answer', text: s.faq6_a } },
      { '@type': 'Question', name: s.faq7_q, acceptedAnswer: { '@type': 'Answer', text: s.faq7_a } },
      { '@type': 'Question', name: s.faq8_q, acceptedAnswer: { '@type': 'Answer', text: s.faq8_a } },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* TL;DR Box */}
      <div style={{ background: '#f0f9ff', border: '1px solid #bae6fd', borderRadius: 8, padding: '16px 20px', marginBottom: 24 }}>
        <strong style={{ fontSize: 16 }}>{s.tldr_title}</strong>
        <p style={{ margin: '8px 0 0 0', lineHeight: 1.7 }}>{s.tldr}</p>
      </div>

      {/* Key Takeaways Box */}
      <div style={{ background: '#f8fafc', borderRadius: 8, padding: '16px 20px', marginBottom: 24 }}>
        <strong style={{ fontSize: 16 }}>{s.takeaways_title}</strong>
        <ul style={{ margin: '8px 0 0 0', paddingLeft: 20, lineHeight: 1.8 }}>
          <li>{s.takeaway1}</li>
          <li>{s.takeaway2}</li>
          <li>{s.takeaway3}</li>
          <li>{s.takeaway4}</li>
          <li>{s.takeaway5}</li>
          <li>{s.takeaway6}</li>
        </ul>
      </div>

      <p><Link href={`/${lang}/tools/curl-to-code`} style={{ fontWeight: 600, color: '#2563eb' }}>{s.link_tool} &rarr;</Link></p>

      {/* Section 1: What Is cURL */}
      <h2>{s.h2_what}</h2>
      <p dangerouslySetInnerHTML={{ __html: s.what_p1 }} />
      <p>{s.what_p2}</p>
      <p dangerouslySetInnerHTML={{ __html: s.what_p3 }} />

      {/* Section 2: Common cURL Flags */}
      <h2>{s.h2_flags}</h2>
      <p>{s.flags_p1}</p>

      <div style={{ overflowX: 'auto', marginBottom: 16 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
          <thead>
            <tr style={{ background: '#f1f5f9' }}>
              <th style={{ padding: '10px 12px', textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>Flag</th>
              <th style={{ padding: '10px 12px', textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>Long Form</th>
              <th style={{ padding: '10px 12px', textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>Purpose</th>
              <th style={{ padding: '10px 12px', textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>Example</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['-X', '--request', 'HTTP method', '-X POST'],
              ['-H', '--header', 'Request header', '-H "Content-Type: application/json"'],
              ['-d', '--data', 'Request body', '-d \'{"key":"value"}\''],
              ['', '--data-raw', 'Raw body (no @ interpretation)', '--data-raw \'{"email":"a@b.com"}\''],
              ['-u', '--user', 'Basic auth credentials', '-u user:password'],
              ['-F', '--form', 'Multipart form data / file upload', '-F "file=@photo.jpg"'],
              ['-b', '--cookie', 'Send cookies', '-b "session=abc123"'],
              ['-L', '--location', 'Follow redirects', '-L'],
              ['-k', '--insecure', 'Skip TLS verification', '-k'],
              ['-v', '--verbose', 'Show request/response details', '-v'],
              ['-o', '--output', 'Save response to file', '-o response.json'],
            ].map(([flag, long, purpose, example], i) => (
              <tr key={i} style={{ borderBottom: '1px solid #e2e8f0' }}>
                <td style={{ padding: '8px 12px', fontFamily: 'monospace', fontWeight: 600 }}>{flag}</td>
                <td style={{ padding: '8px 12px', fontFamily: 'monospace' }}>{long}</td>
                <td style={{ padding: '8px 12px' }}>{purpose}</td>
                <td style={{ padding: '8px 12px', fontFamily: 'monospace', fontSize: 12 }}>{example}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p dangerouslySetInnerHTML={{ __html: s.flag_X }} />
      <p dangerouslySetInnerHTML={{ __html: s.flag_H }} />
      <p dangerouslySetInnerHTML={{ __html: s.flag_d }} />
      <p dangerouslySetInnerHTML={{ __html: s.flag_data_raw }} />
      <p dangerouslySetInnerHTML={{ __html: s.flag_u }} />
      <p dangerouslySetInnerHTML={{ __html: s.flag_F }} />
      <p dangerouslySetInnerHTML={{ __html: s.flag_b }} />
      <p dangerouslySetInnerHTML={{ __html: s.flag_k }} />
      <p dangerouslySetInnerHTML={{ __html: s.flag_L }} />
      <p dangerouslySetInnerHTML={{ __html: s.flag_v }} />
      <p dangerouslySetInnerHTML={{ __html: s.flag_o }} />

      {/* Section 3: cURL to JavaScript */}
      <h2>{s.h2_js}</h2>
      <p dangerouslySetInnerHTML={{ __html: s.js_p1 }} />

      <h3>{s.h3_fetch}</h3>
      <p>{s.fetch_p1}</p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: 16, borderRadius: 8, overflowX: 'auto', fontSize: 13, lineHeight: 1.5 }}><code>{`// cURL: curl -X POST https://api.example.com/users \\
//   -H "Content-Type: application/json" \\
//   -H "Authorization: Bearer eyJhbGciOi..." \\
//   -d '{"name":"Alice","email":"alice@example.com"}'

const response = await fetch("https://api.example.com/users", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Authorization": "Bearer eyJhbGciOi..."
  },
  body: JSON.stringify({
    name: "Alice",
    email: "alice@example.com"
  })
});

const data = await response.json();
console.log(data);

// cURL: curl -X GET "https://api.example.com/users?page=1&limit=10" \\
//   -H "Accept: application/json"

const params = new URLSearchParams({ page: "1", limit: "10" });
const res = await fetch(\`https://api.example.com/users?\${params}\`, {
  headers: { "Accept": "application/json" }
});
const users = await res.json();`}</code></pre>

      <h3>{s.h3_axios}</h3>
      <p dangerouslySetInnerHTML={{ __html: s.axios_p1 }} />
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: 16, borderRadius: 8, overflowX: 'auto', fontSize: 13, lineHeight: 1.5 }}><code>{`import axios from "axios";

// cURL: curl -X POST https://api.example.com/users \\
//   -H "Content-Type: application/json" \\
//   -H "Authorization: Bearer TOKEN" \\
//   -d '{"name":"Alice"}'

const { data } = await axios.post(
  "https://api.example.com/users",
  { name: "Alice" },  // axios auto-serializes to JSON
  {
    headers: {
      "Authorization": "Bearer TOKEN"
    }
  }
);
console.log(data);

// cURL: curl -X PUT https://api.example.com/users/123 \\
//   -H "Content-Type: application/json" \\
//   -d '{"name":"Bob"}'

const updated = await axios.put(
  "https://api.example.com/users/123",
  { name: "Bob" }
);`}</code></pre>

      <h3>{s.h3_nodefetch}</h3>
      <p dangerouslySetInnerHTML={{ __html: s.nodefetch_p1 }} />
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: 16, borderRadius: 8, overflowX: 'auto', fontSize: 13, lineHeight: 1.5 }}><code>{`// npm install node-fetch
import fetch from "node-fetch";

// cURL: curl -X POST https://api.example.com/data \\
//   -H "Content-Type: application/json" \\
//   -d '{"key":"value"}'

const response = await fetch("https://api.example.com/data", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ key: "value" })
});
const result = await response.json();`}</code></pre>

      <p style={{ marginTop: 16 }}><Link href={`/${lang}/tools/curl-to-code`} style={{ fontWeight: 600, color: '#2563eb' }}>{s.link_tool} &rarr;</Link></p>

      {/* Section 4: cURL to Python */}
      <h2>{s.h2_python}</h2>
      <p dangerouslySetInnerHTML={{ __html: s.python_p1 }} />

      <h3>{s.h3_requests}</h3>
      <p dangerouslySetInnerHTML={{ __html: s.requests_p1 }} />
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: 16, borderRadius: 8, overflowX: 'auto', fontSize: 13, lineHeight: 1.5 }}><code>{`import requests

# cURL: curl -X POST https://api.example.com/users \\
#   -H "Content-Type: application/json" \\
#   -H "Authorization: Bearer TOKEN" \\
#   -d '{"name":"Alice","email":"alice@example.com"}'

response = requests.post(
    "https://api.example.com/users",
    json={"name": "Alice", "email": "alice@example.com"},
    headers={"Authorization": "Bearer TOKEN"}
)
data = response.json()
print(data)

# cURL: curl -u admin:secret123 https://api.example.com/admin/stats
response = requests.get(
    "https://api.example.com/admin/stats",
    auth=("admin", "secret123")
)

# cURL: curl -b "session=abc123; theme=dark" https://api.example.com/me
response = requests.get(
    "https://api.example.com/me",
    cookies={"session": "abc123", "theme": "dark"}
)`}</code></pre>

      <h3>{s.h3_httpx}</h3>
      <p dangerouslySetInnerHTML={{ __html: s.httpx_p1 }} />
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: 16, borderRadius: 8, overflowX: 'auto', fontSize: 13, lineHeight: 1.5 }}><code>{`import httpx

# Synchronous usage (like requests)
response = httpx.post(
    "https://api.example.com/users",
    json={"name": "Alice"},
    headers={"Authorization": "Bearer TOKEN"}
)

# Async usage (for high-performance applications)
async with httpx.AsyncClient() as client:
    response = await client.post(
        "https://api.example.com/users",
        json={"name": "Alice"},
        headers={"Authorization": "Bearer TOKEN"}
    )
    data = response.json()

# HTTP/2 support
client = httpx.Client(http2=True)
response = client.get("https://api.example.com/data")`}</code></pre>

      {/* Section 5: cURL to Go */}
      <h2>{s.h2_go}</h2>
      <p dangerouslySetInnerHTML={{ __html: s.go_p1 }} />
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: 16, borderRadius: 8, overflowX: 'auto', fontSize: 13, lineHeight: 1.5 }}><code>{`package main

import (
    "bytes"
    "encoding/json"
    "fmt"
    "io"
    "net/http"
)

// cURL: curl -X POST https://api.example.com/users \\
//   -H "Content-Type: application/json" \\
//   -H "Authorization: Bearer TOKEN" \\
//   -d '{"name":"Alice","email":"alice@example.com"}'

func createUser() error {
    payload := map[string]string{
        "name":  "Alice",
        "email": "alice@example.com",
    }
    body, err := json.Marshal(payload)
    if err != nil {
        return err
    }

    req, err := http.NewRequest("POST",
        "https://api.example.com/users",
        bytes.NewBuffer(body))
    if err != nil {
        return err
    }

    req.Header.Set("Content-Type", "application/json")
    req.Header.Set("Authorization", "Bearer TOKEN")

    client := &http.Client{}
    resp, err := client.Do(req)
    if err != nil {
        return err
    }
    defer resp.Body.Close()

    respBody, err := io.ReadAll(resp.Body)
    if err != nil {
        return err
    }

    fmt.Println(string(respBody))
    return nil
}

// cURL: curl -u admin:secret123 https://api.example.com/admin
func basicAuth() error {
    req, _ := http.NewRequest("GET",
        "https://api.example.com/admin", nil)
    req.SetBasicAuth("admin", "secret123")

    client := &http.Client{}
    resp, err := client.Do(req)
    if err != nil {
        return err
    }
    defer resp.Body.Close()
    // handle response...
    return nil
}`}</code></pre>

      {/* Section 6: cURL to PHP */}
      <h2>{s.h2_php}</h2>
      <p dangerouslySetInnerHTML={{ __html: s.php_p1 }} />
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: 16, borderRadius: 8, overflowX: 'auto', fontSize: 13, lineHeight: 1.5 }}><code>{`<?php
// cURL: curl -X POST https://api.example.com/users \\
//   -H "Content-Type: application/json" \\
//   -H "Authorization: Bearer TOKEN" \\
//   -d '{"name":"Alice","email":"alice@example.com"}'

$ch = curl_init();

curl_setopt_array($ch, [
    CURLOPT_URL => "https://api.example.com/users",
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_POST => true,
    CURLOPT_HTTPHEADER => [
        "Content-Type: application/json",
        "Authorization: Bearer TOKEN"
    ],
    CURLOPT_POSTFIELDS => json_encode([
        "name" => "Alice",
        "email" => "alice@example.com"
    ])
]);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

$data = json_decode($response, true);
print_r($data);

// cURL: curl -u admin:secret123 https://api.example.com/admin
$ch = curl_init();
curl_setopt_array($ch, [
    CURLOPT_URL => "https://api.example.com/admin",
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_USERPWD => "admin:secret123"
]);
$response = curl_exec($ch);
curl_close($ch);
?>`}</code></pre>

      <p style={{ marginTop: 16 }}><Link href={`/${lang}/tools/curl-to-code`} style={{ fontWeight: 600, color: '#2563eb' }}>{s.link_tool} &rarr;</Link></p>

      {/* Section 7: Authentication Patterns */}
      <h2>{s.h2_auth}</h2>
      <p>{s.auth_p1}</p>

      <h3>{s.h3_bearer}</h3>
      <p>{s.bearer_p1}</p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: 16, borderRadius: 8, overflowX: 'auto', fontSize: 13, lineHeight: 1.5 }}><code>{`# cURL: Bearer token authentication
curl -X GET https://api.example.com/me \\
  -H "Authorization: Bearer eyJhbGciOiJSUzI1NiIs..."

# JavaScript fetch
const res = await fetch("https://api.example.com/me", {
  headers: { "Authorization": "Bearer eyJhbGciOi..." }
});

# Python requests
response = requests.get(
    "https://api.example.com/me",
    headers={"Authorization": "Bearer eyJhbGciOi..."}
)

# Go net/http
req.Header.Set("Authorization", "Bearer eyJhbGciOi...")`}</code></pre>

      <h3>{s.h3_basic}</h3>
      <p dangerouslySetInnerHTML={{ __html: s.basic_p1 }} />
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: 16, borderRadius: 8, overflowX: 'auto', fontSize: 13, lineHeight: 1.5 }}><code>{`# cURL: Basic authentication
curl -u admin:secret123 https://api.example.com/admin

# JavaScript fetch (manual Base64 encoding)
const credentials = btoa("admin:secret123");
const res = await fetch("https://api.example.com/admin", {
  headers: { "Authorization": "Basic " + credentials }
});

# Python requests (automatic encoding)
response = requests.get(
    "https://api.example.com/admin",
    auth=("admin", "secret123")  # requests handles Base64
)

# Go net/http (built-in method)
req.SetBasicAuth("admin", "secret123")`}</code></pre>

      <h3>{s.h3_apikey}</h3>
      <p>{s.apikey_p1}</p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: 16, borderRadius: 8, overflowX: 'auto', fontSize: 13, lineHeight: 1.5 }}><code>{`# API key in header
curl -H "X-API-Key: sk_live_abc123" https://api.example.com/data

# API key in query parameter
curl "https://api.example.com/data?api_key=sk_live_abc123"

# JavaScript (header)
const res = await fetch("https://api.example.com/data", {
  headers: { "X-API-Key": process.env.API_KEY }
});

# Python (header)
response = requests.get(
    "https://api.example.com/data",
    headers={"X-API-Key": os.environ["API_KEY"]}
)`}</code></pre>

      {/* Section 8: File Uploads */}
      <h2>{s.h2_upload}</h2>
      <p dangerouslySetInnerHTML={{ __html: s.upload_p1 }} />
      <p dangerouslySetInnerHTML={{ __html: s.upload_p2 }} />
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: 16, borderRadius: 8, overflowX: 'auto', fontSize: 13, lineHeight: 1.5 }}><code>{`# cURL: File upload with multipart/form-data
curl -X POST https://api.example.com/upload \\
  -F "file=@photo.jpg" \\
  -F "description=Profile photo" \\
  -H "Authorization: Bearer TOKEN"

# JavaScript (browser)
const formData = new FormData();
formData.append("file", fileInput.files[0]);
formData.append("description", "Profile photo");

const res = await fetch("https://api.example.com/upload", {
  method: "POST",
  headers: { "Authorization": "Bearer TOKEN" },
  body: formData  // Do NOT set Content-Type; browser sets it with boundary
});

# Python requests
response = requests.post(
    "https://api.example.com/upload",
    files={"file": open("photo.jpg", "rb")},
    data={"description": "Profile photo"},
    headers={"Authorization": "Bearer TOKEN"}
)

# Go (multipart writer)
var buf bytes.Buffer
writer := multipart.NewWriter(&buf)
part, _ := writer.CreateFormFile("file", "photo.jpg")
io.Copy(part, fileReader)
writer.WriteField("description", "Profile photo")
writer.Close()

req, _ := http.NewRequest("POST",
    "https://api.example.com/upload", &buf)
req.Header.Set("Content-Type", writer.FormDataContentType())
req.Header.Set("Authorization", "Bearer TOKEN")`}</code></pre>

      {/* Section 9: Debugging */}
      <h2>{s.h2_debug}</h2>
      <p>{s.debug_p1}</p>
      <p dangerouslySetInnerHTML={{ __html: s.debug_verbose }} />
      <p dangerouslySetInnerHTML={{ __html: s.debug_trace }} />
      <p dangerouslySetInnerHTML={{ __html: s.debug_write }} />
      <p dangerouslySetInnerHTML={{ __html: s.debug_fail }} />
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: 16, borderRadius: 8, overflowX: 'auto', fontSize: 13, lineHeight: 1.5 }}><code>{`# Verbose output: see all headers and TLS info
curl -v https://api.example.com/health

# Output includes:
# * Connected to api.example.com (93.184.216.34) port 443
# > GET /health HTTP/2
# > Host: api.example.com
# > User-Agent: curl/8.4.0
# > Accept: */*
# < HTTP/2 200
# < content-type: application/json
# < x-request-id: abc-123

# Write-out: print timing and status info
curl -w "HTTP Code: %{http_code}\\nTime Total: %{time_total}s\\nTime Connect: %{time_connect}s\\nSize: %{size_download} bytes\\n" \\
  -o /dev/null -s https://api.example.com/data

# Trace: complete hex/ASCII dump of all data
curl --trace-ascii - https://api.example.com/health

# Fail silently on HTTP errors (useful in scripts)
curl -f -s https://api.example.com/data || echo "Request failed"`}</code></pre>

      {/* Section 10: Common Mistakes */}
      <h2>{s.h2_mistakes}</h2>
      <p>{s.mistakes_p1}</p>

      <div style={{ marginBottom: 16 }}>
        {[
          { title: s.mistake1_title, desc: s.mistake1 },
          { title: s.mistake2_title, desc: s.mistake2 },
          { title: s.mistake3_title, desc: s.mistake3 },
          { title: s.mistake4_title, desc: s.mistake4 },
          { title: s.mistake5_title, desc: s.mistake5 },
          { title: s.mistake6_title, desc: s.mistake6 },
        ].map((item, i) => (
          <div key={i} style={{ background: i % 2 === 0 ? '#fef2f2' : '#fffbeb', borderRadius: 8, padding: '12px 16px', marginBottom: 8 }}>
            <strong>{i + 1}. {item.title}</strong>
            <p style={{ margin: '4px 0 0 0' }} dangerouslySetInnerHTML={{ __html: item.desc }} />
          </div>
        ))}
      </div>

      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: 16, borderRadius: 8, overflowX: 'auto', fontSize: 13, lineHeight: 1.5 }}><code>{`# WRONG: Missing Content-Type (server gets form-urlencoded)
curl -X POST https://api.example.com/users \\
  -d '{"name":"Alice"}'

# RIGHT: Explicit Content-Type for JSON
curl -X POST https://api.example.com/users \\
  -H "Content-Type: application/json" \\
  -d '{"name":"Alice"}'

# WRONG: Hardcoded API key in script
curl -H "Authorization: Bearer sk_live_abc123" https://api.example.com/data

# RIGHT: Use environment variable
curl -H "Authorization: Bearer $API_TOKEN" https://api.example.com/data

# WRONG: Using -k in production
curl -k https://api.example.com/data  # INSECURE!

# RIGHT: Configure CA certificates properly
curl --cacert /path/to/ca-bundle.crt https://api.example.com/data`}</code></pre>

      <p style={{ marginTop: 16 }}><Link href={`/${lang}/tools/curl-to-code`} style={{ fontWeight: 600, color: '#2563eb' }}>{s.link_tool} &rarr;</Link></p>

      {/* Section 11: FAQ */}
      <h2>{s.h2_faq}</h2>
      <h3>{s.faq1_q}</h3>
      <p>{s.faq1_a}</p>
      <h3>{s.faq2_q}</h3>
      <p>{s.faq2_a}</p>
      <h3>{s.faq3_q}</h3>
      <p>{s.faq3_a}</p>
      <h3>{s.faq4_q}</h3>
      <p>{s.faq4_a}</p>
      <h3>{s.faq5_q}</h3>
      <p>{s.faq5_a}</p>
      <h3>{s.faq6_q}</h3>
      <p>{s.faq6_a}</p>
      <h3>{s.faq7_q}</h3>
      <p>{s.faq7_a}</p>
      <h3>{s.faq8_q}</h3>
      <p>{s.faq8_a}</p>

      {/* Conclusion */}
      <p style={{ marginTop: 32 }} dangerouslySetInnerHTML={{ __html: s.conclusion }} />
      <p><Link href={`/${lang}/tools/curl-to-code`} style={{ fontWeight: 600, color: '#2563eb' }}>{s.link_tool_bottom} &rarr;</Link></p>
    </>
  );
}
