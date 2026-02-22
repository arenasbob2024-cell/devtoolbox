import Link from 'next/link';

const t: Record<string, Record<string, string>> = {
  en: {
    intro: 'Converting <strong>cURL commands to code</strong> is one of the most common tasks in API development. You find a working cURL example in API documentation, test it in your terminal, and then need to translate it into your application\'s programming language. This guide shows you how to <strong>convert cURL to JavaScript</strong> (fetch and axios), <strong>Python</strong> (requests), <strong>Go</strong>, <strong>PHP</strong>, and <strong>Node.js</strong> with practical examples for real-world API calls. Try our free <strong>cURL converter</strong> to generate code instantly.',
    linkTool: 'Try our free cURL to Code Converter.',
    h2_what: 'Understanding cURL Command Syntax',
    whatDesc1: '<strong>cURL</strong> (Client URL) is a command-line tool for transferring data using various network protocols. It is the de facto standard for testing HTTP APIs because it is available on virtually every operating system and provides fine-grained control over requests. When API documentation provides examples, they are almost always in cURL format.',
    whatDesc2: 'A cURL command consists of the <code>curl</code> binary followed by a URL and optional flags that control the request method, headers, body, authentication, and other parameters. Understanding these flags is the key to accurate conversion to any programming language.',
    whatDesc3: 'The most important cURL flags for API calls are: <code>-X</code> (request method), <code>-H</code> (header), <code>-d</code> (data/body), <code>-u</code> (basic auth), <code>-F</code> (form data/file upload), <code>-b</code> (cookies), <code>-k</code> (skip TLS verification), and <code>-L</code> (follow redirects). Each of these maps to specific options in HTTP client libraries.',
    h2_flags: 'cURL Flags Reference',
    flagsDesc: 'Here are the most commonly used cURL flags and what they mean for code conversion:',
    flagsTable: '<table><thead><tr><th>Flag</th><th>Long Form</th><th>Purpose</th><th>Example</th></tr></thead><tbody><tr><td><code>-X</code></td><td><code>--request</code></td><td>HTTP method</td><td><code>-X POST</code></td></tr><tr><td><code>-H</code></td><td><code>--header</code></td><td>Request header</td><td><code>-H "Content-Type: application/json"</code></td></tr><tr><td><code>-d</code></td><td><code>--data</code></td><td>Request body</td><td><code>-d \'{"key":"value"}\'</code></td></tr><tr><td><code>-u</code></td><td><code>--user</code></td><td>Basic auth</td><td><code>-u user:password</code></td></tr><tr><td><code>-F</code></td><td><code>--form</code></td><td>Multipart form data</td><td><code>-F "file=@photo.jpg"</code></td></tr><tr><td><code>-b</code></td><td><code>--cookie</code></td><td>Send cookies</td><td><code>-b "session=abc123"</code></td></tr><tr><td><code>-o</code></td><td><code>--output</code></td><td>Save to file</td><td><code>-o response.json</code></td></tr><tr><td><code>-L</code></td><td><code>--location</code></td><td>Follow redirects</td><td><code>-L</code></td></tr><tr><td><code>-k</code></td><td><code>--insecure</code></td><td>Skip TLS verification</td><td><code>-k</code></td></tr><tr><td><code>-v</code></td><td><code>--verbose</code></td><td>Show request/response details</td><td><code>-v</code></td></tr></tbody></table>',
    h2_jsConvert: 'cURL to JavaScript: fetch and axios',
    jsFetchTitle: 'JavaScript fetch API',
    jsFetchDesc: 'The <strong>fetch API</strong> is built into modern browsers and Node.js 18+. It is the standard way to make HTTP requests in JavaScript. Here is how common cURL patterns translate to fetch:',
    jsAxiosTitle: 'JavaScript axios',
    jsAxiosDesc: '<strong>axios</strong> is a popular HTTP client library that works in both browsers and Node.js. It provides a cleaner API than fetch with built-in JSON parsing, interceptors, and request cancellation:',
    h2_pythonConvert: 'cURL to Python: requests Library',
    pythonDesc: 'Python\'s <strong>requests</strong> library is the most popular HTTP client with an intuitive API. Install with <code>pip install requests</code>. cURL commands translate very naturally to requests:',
    h2_goConvert: 'cURL to Go: net/http Package',
    goDesc: 'Go\'s standard library <code>net/http</code> package provides everything needed for HTTP requests. The conversion is more verbose than Python but gives you full control:',
    h2_phpConvert: 'cURL to PHP: cURL Extension and Guzzle',
    phpDesc: 'PHP has a built-in cURL extension that closely mirrors the command-line cURL tool, plus modern alternatives like <strong>Guzzle</strong>:',
    h2_nodejsConvert: 'cURL to Node.js: node-fetch and https',
    nodejsDesc: 'Node.js offers multiple HTTP client options. <strong>node-fetch</strong> brings the browser fetch API to Node.js, while the built-in <code>https</code> module works without dependencies:',
    h2_commonPatterns: 'Common API Call Patterns',
    commonPatternsDesc: 'Most API calls fall into a few common patterns. Here are the cURL commands and their multi-language equivalents:',
    patternGet: '<strong>GET with query parameters</strong>: The simplest pattern. Query parameters in cURL are part of the URL.',
    patternPost: '<strong>POST with JSON body</strong>: The most common API mutation. Always set <code>Content-Type: application/json</code>.',
    patternAuth: '<strong>Bearer token authentication</strong>: Used by most modern APIs (OAuth 2.0, JWT). The token goes in the <code>Authorization</code> header.',
    patternUpload: '<strong>File upload (multipart/form-data)</strong>: Uses <code>-F</code> in cURL. Each language has its own way to construct multipart bodies.',
    h2_bestPractices: 'Best Practices for cURL to Code Conversion',
    bp1: '<strong>Always set Content-Type headers explicitly</strong>: cURL with <code>-d</code> defaults to <code>application/x-www-form-urlencoded</code>. Most APIs expect <code>application/json</code>. Always include <code>-H "Content-Type: application/json"</code> in your cURL command and the corresponding header in your code.',
    bp2: '<strong>Handle errors properly</strong>: cURL exits with a non-zero status on errors. In code, check HTTP status codes (4xx/5xx) and implement retry logic for transient failures (429, 503).',
    bp3: '<strong>Use environment variables for secrets</strong>: Never hardcode API keys or tokens. Use <code>process.env.API_KEY</code> (Node.js), <code>os.environ["API_KEY"]</code> (Python), or <code>os.Getenv("API_KEY")</code> (Go).',
    bp4: '<strong>Set timeouts</strong>: cURL has <code>--connect-timeout</code> and <code>--max-time</code>. Always set timeouts in your HTTP client to avoid hanging requests.',
    bp5: '<strong>Use HTTPS in production</strong>: Never use <code>-k</code> (insecure) in production code. Configure proper TLS certificates instead.',
    bp6: '<strong>Parse response bodies correctly</strong>: Check the response Content-Type before parsing. Use <code>.json()</code> (fetch), <code>.json()</code> (requests), or <code>json.Unmarshal</code> (Go) as appropriate.',
    bp7: '<strong>Consider rate limiting</strong>: Add delays between requests and respect <code>Retry-After</code> headers. Implement exponential backoff for retries.',
    relatedTools: 'Related tools: <strong>JSON Formatter</strong> for formatting API responses, <strong>JWT Decoder</strong> for inspecting authentication tokens, and <strong>URL Encoder/Decoder</strong> for query parameters.',
    h2_faq: 'Frequently Asked Questions',
    faq1_q: 'How do I convert a cURL command to JavaScript fetch?',
    faq1_a: 'Map cURL flags to fetch options: <code>-X POST</code> becomes <code>method: "POST"</code>, <code>-H</code> becomes entries in the <code>headers</code> object, <code>-d</code> becomes the <code>body</code> parameter (use <code>JSON.stringify()</code> for JSON), and <code>-u user:pass</code> becomes a Base64-encoded <code>Authorization: Basic</code> header. Our free cURL converter tool automates this process.',
    faq2_q: 'What is the difference between -d and -F in cURL?',
    faq2_a: '<code>-d</code> (--data) sends data as <code>application/x-www-form-urlencoded</code> or raw text. It is used for JSON payloads with <code>-H "Content-Type: application/json"</code>. <code>-F</code> (--form) sends data as <code>multipart/form-data</code>, which is required for file uploads. In code, <code>-d</code> maps to setting the request body directly, while <code>-F</code> maps to FormData or multipart body construction.',
    faq3_q: 'How do I handle cURL basic authentication in Python?',
    faq3_a: 'cURL\'s <code>-u user:password</code> maps directly to the <code>auth</code> parameter in Python requests: <code>requests.get(url, auth=("user", "password"))</code>. The library handles Base64 encoding and the Authorization header automatically. For bearer tokens, use <code>headers={"Authorization": "Bearer TOKEN"}</code>.',
    faq4_q: 'Can I convert cURL to multiple programming languages at once?',
    faq4_a: 'Yes! Our free <strong>cURL to Code converter</strong> at DevToolBox parses any cURL command and generates equivalent code in JavaScript (fetch and axios), Python (requests), Go, PHP, Ruby, and more. Just paste your cURL command and select your target language.',
    faq5_q: 'How do I convert a cURL command with file upload to code?',
    faq5_a: 'cURL file uploads use <code>-F "file=@filename.jpg"</code>. In JavaScript, use <code>FormData</code> with <code>formData.append("file", fileBlob)</code>. In Python, use <code>requests.post(url, files={"file": open("filename.jpg", "rb")})</code>. In Go, use <code>multipart.NewWriter</code>. Each language has its own multipart body construction API.',
    conclusion: 'Converting <strong>cURL to code</strong> is a fundamental API development skill. Understanding cURL flags and how they map to HTTP client libraries in JavaScript, Python, Go, and PHP enables you to quickly integrate any API. Use our free online <strong>cURL converter</strong> to automate the conversion, and follow the best practices in this guide for production-ready API client code.',
    linkToolBottom: 'Convert cURL commands to any programming language with our free tool.',
  },
  zh: {
    intro: '将 <strong>cURL 命令转换为代码</strong>是 API 开发中最常见的任务之一。本指南展示如何将 cURL 转换为 JavaScript（fetch 和 axios）、Python（requests）、Go、PHP 和 Node.js，并提供实际 API 调用的示例。',
    linkTool: '试用我们免费的 cURL 转代码转换器。',
    h2_what: '理解 cURL 命令语法',
    whatDesc1: '<strong>cURL</strong>（Client URL）是使用各种网络协议传输数据的命令行工具，是测试 HTTP API 的事实标准。',
    whatDesc2: 'cURL 命令由 <code>curl</code> 程序、URL 和控制请求方法、头部、正文、认证等的可选标志组成。',
    whatDesc3: 'API 调用中最重要的 cURL 标志：<code>-X</code>（请求方法）、<code>-H</code>（头部）、<code>-d</code>（数据/正文）、<code>-u</code>（基本认证）、<code>-F</code>（表单数据）、<code>-b</code>（cookies）。',
    h2_flags: 'cURL 标志参考',
    flagsDesc: '最常用的 cURL 标志及其在代码转换中的含义：',
    flagsTable: '<table><thead><tr><th>标志</th><th>完整形式</th><th>用途</th><th>示例</th></tr></thead><tbody><tr><td><code>-X</code></td><td><code>--request</code></td><td>HTTP 方法</td><td><code>-X POST</code></td></tr><tr><td><code>-H</code></td><td><code>--header</code></td><td>请求头</td><td><code>-H "Content-Type: application/json"</code></td></tr><tr><td><code>-d</code></td><td><code>--data</code></td><td>请求体</td><td><code>-d \'{"key":"value"}\'</code></td></tr><tr><td><code>-u</code></td><td><code>--user</code></td><td>基本认证</td><td><code>-u user:password</code></td></tr><tr><td><code>-F</code></td><td><code>--form</code></td><td>表单数据</td><td><code>-F "file=@photo.jpg"</code></td></tr></tbody></table>',
    h2_jsConvert: 'cURL 转 JavaScript：fetch 和 axios',
    jsFetchTitle: 'JavaScript fetch API',
    jsFetchDesc: '<strong>fetch API</strong> 内置于现代浏览器和 Node.js 18+，是 JavaScript 中发起 HTTP 请求的标准方式：',
    jsAxiosTitle: 'JavaScript axios',
    jsAxiosDesc: '<strong>axios</strong> 是流行的 HTTP 客户端库，提供比 fetch 更简洁的 API：',
    h2_pythonConvert: 'cURL 转 Python：requests 库',
    pythonDesc: 'Python 的 <strong>requests</strong> 库是最流行的 HTTP 客户端，cURL 命令可以非常自然地转换：',
    h2_goConvert: 'cURL 转 Go：net/http 包',
    goDesc: 'Go 标准库的 <code>net/http</code> 包提供 HTTP 请求所需的一切：',
    h2_phpConvert: 'cURL 转 PHP：cURL 扩展和 Guzzle',
    phpDesc: 'PHP 内置 cURL 扩展，还有现代替代方案 Guzzle：',
    h2_nodejsConvert: 'cURL 转 Node.js：node-fetch 和 https',
    nodejsDesc: 'Node.js 提供多种 HTTP 客户端选项：',
    h2_commonPatterns: '常见 API 调用模式',
    commonPatternsDesc: '大多数 API 调用属于几种常见模式：',
    patternGet: '<strong>带查询参数的 GET</strong>：最简单的模式。',
    patternPost: '<strong>带 JSON 正文的 POST</strong>：最常见的 API 变更操作。',
    patternAuth: '<strong>Bearer Token 认证</strong>：大多数现代 API 使用。',
    patternUpload: '<strong>文件上传（multipart/form-data）</strong>：使用 cURL 的 <code>-F</code>。',
    h2_bestPractices: 'cURL 转代码最佳实践',
    bp1: '<strong>始终显式设置 Content-Type 头</strong>。',
    bp2: '<strong>正确处理错误</strong>：检查 HTTP 状态码，实现重试逻辑。',
    bp3: '<strong>使用环境变量存储密钥</strong>：不要硬编码 API 密钥。',
    bp4: '<strong>设置超时</strong>：避免请求挂起。',
    bp5: '<strong>生产环境使用 HTTPS</strong>：不要在生产代码中使用 -k。',
    bp6: '<strong>正确解析响应体</strong>：检查 Content-Type 后再解析。',
    bp7: '<strong>考虑速率限制</strong>：添加请求间延迟，实现指数退避。',
    relatedTools: '相关工具：<strong>JSON 格式化器</strong>、<strong>JWT 解码器</strong>、<strong>URL 编码/解码器</strong>。',
    h2_faq: '常见问题',
    faq1_q: '如何将 cURL 命令转换为 JavaScript fetch？',
    faq1_a: '将 cURL 标志映射到 fetch 选项：-X POST 变为 method: "POST"，-H 变为 headers 对象条目，-d 变为 body 参数。我们的免费工具可以自动完成转换。',
    faq2_q: 'cURL 中 -d 和 -F 有什么区别？',
    faq2_a: '-d 发送 application/x-www-form-urlencoded 或原始文本数据。-F 发送 multipart/form-data，用于文件上传。',
    faq3_q: '如何在 Python 中处理 cURL 基本认证？',
    faq3_a: 'cURL 的 -u user:password 直接映射到 Python requests 的 auth 参数：requests.get(url, auth=("user", "password"))。',
    faq4_q: '可以同时转换为多种编程语言吗？',
    faq4_a: '可以！我们的免费 cURL 转代码转换器解析 cURL 命令并生成 JavaScript、Python、Go、PHP 等语言的等效代码。',
    faq5_q: '如何将带文件上传的 cURL 命令转换为代码？',
    faq5_a: 'JavaScript 使用 FormData，Python 使用 requests.post(url, files={...})，Go 使用 multipart.NewWriter。',
    conclusion: '将 cURL 转换为代码是 API 开发的基础技能。使用我们的免费在线 cURL 转换器自动转换，并遵循本指南的最佳实践。',
    linkToolBottom: '使用我们的免费工具将 cURL 命令转换为任何编程语言。',
  },
  fr: {
    intro: 'Convertir des <strong>commandes cURL en code</strong> est une tache courante en developpement API. Ce guide montre comment convertir cURL en JavaScript, Python, Go, PHP et Node.js.',
    linkTool: 'Essayez notre convertisseur gratuit cURL vers code.',
    h2_what: 'Comprendre la syntaxe cURL',
    whatDesc1: '<strong>cURL</strong> est un outil en ligne de commande pour le transfert de donnees. C\'est le standard pour tester les APIs HTTP.',
    whatDesc2: 'Une commande cURL consiste en le binaire curl suivi d\'une URL et de drapeaux optionnels.',
    whatDesc3: 'Les drapeaux cURL les plus importants : <code>-X</code> (methode), <code>-H</code> (en-tete), <code>-d</code> (donnees), <code>-u</code> (auth), <code>-F</code> (formulaire).',
    h2_flags: 'Reference des drapeaux cURL',
    flagsDesc: 'Les drapeaux cURL les plus utilises :',
    flagsTable: '<table><thead><tr><th>Drapeau</th><th>Forme longue</th><th>Usage</th><th>Exemple</th></tr></thead><tbody><tr><td><code>-X</code></td><td><code>--request</code></td><td>Methode HTTP</td><td><code>-X POST</code></td></tr><tr><td><code>-H</code></td><td><code>--header</code></td><td>En-tete</td><td><code>-H "Content-Type: application/json"</code></td></tr><tr><td><code>-d</code></td><td><code>--data</code></td><td>Corps</td><td><code>-d \'{"key":"value"}\'</code></td></tr></tbody></table>',
    h2_jsConvert: 'cURL vers JavaScript : fetch et axios',
    jsFetchTitle: 'API fetch JavaScript',
    jsFetchDesc: 'L\'API <strong>fetch</strong> est integree aux navigateurs modernes et Node.js 18+ :',
    jsAxiosTitle: 'JavaScript axios',
    jsAxiosDesc: '<strong>axios</strong> offre une API plus propre que fetch :',
    h2_pythonConvert: 'cURL vers Python : bibliotheque requests',
    pythonDesc: 'La bibliotheque <strong>requests</strong> de Python traduit naturellement les commandes cURL :',
    h2_goConvert: 'cURL vers Go : package net/http',
    goDesc: 'Le package standard <code>net/http</code> de Go offre un controle complet :',
    h2_phpConvert: 'cURL vers PHP : Extension cURL et Guzzle',
    phpDesc: 'PHP a une extension cURL integree plus des alternatives comme Guzzle :',
    h2_nodejsConvert: 'cURL vers Node.js : node-fetch et https',
    nodejsDesc: 'Node.js offre plusieurs options de client HTTP :',
    h2_commonPatterns: 'Patterns d\'appel API courants',
    commonPatternsDesc: 'La plupart des appels API suivent quelques patterns communs :',
    patternGet: '<strong>GET avec parametres</strong> : Le plus simple.',
    patternPost: '<strong>POST avec corps JSON</strong> : La mutation API la plus courante.',
    patternAuth: '<strong>Authentification Bearer token</strong>.',
    patternUpload: '<strong>Upload de fichier</strong>.',
    h2_bestPractices: 'Bonnes pratiques',
    bp1: '<strong>Toujours definir Content-Type explicitement</strong>.',
    bp2: '<strong>Gerer les erreurs</strong> : verifier les codes HTTP.',
    bp3: '<strong>Variables d\'environnement pour les secrets</strong>.',
    bp4: '<strong>Definir des timeouts</strong>.',
    bp5: '<strong>HTTPS en production</strong>.',
    bp6: '<strong>Parser correctement les reponses</strong>.',
    bp7: '<strong>Respecter les limites de debit</strong>.',
    relatedTools: 'Outils connexes : <strong>JSON Formatter</strong>, <strong>JWT Decoder</strong>, <strong>URL Encoder</strong>.',
    h2_faq: 'Questions frequemment posees',
    faq1_q: 'Comment convertir cURL en JavaScript fetch ?',
    faq1_a: 'Mappez les drapeaux cURL aux options fetch. Notre outil automatise ce processus.',
    faq2_q: 'Quelle difference entre -d et -F ?',
    faq2_a: '-d envoie du texte/form-urlencoded, -F envoie du multipart/form-data pour les fichiers.',
    faq3_q: 'Comment gerer l\'authentification basique en Python ?',
    faq3_a: 'Utilisez auth=("user", "password") avec requests.',
    faq4_q: 'Peut-on convertir vers plusieurs langages ?',
    faq4_a: 'Oui, notre outil genere du code JavaScript, Python, Go, PHP et plus.',
    faq5_q: 'Comment convertir un upload de fichier ?',
    faq5_a: 'JavaScript: FormData, Python: requests.post(files=...), Go: multipart.NewWriter.',
    conclusion: 'Convertir cURL en code est une competence fondamentale en developpement API.',
    linkToolBottom: 'Convertissez des commandes cURL en code avec notre outil gratuit.',
  },
};

const shortLocales: Record<string, Partial<typeof t.en>> = {};
for (const locale of ['de','it','es','pt','nl','pl','sv','no','ja','ko','id','th']) {
  shortLocales[locale] = { ...t.fr };
}
Object.assign(t, shortLocales);

export default function CurlToCodeGuide({ lang }: { lang: string }) {
  const s = t[lang] || t.en;
  return (
    <>
      <p dangerouslySetInnerHTML={{ __html: s.intro }} />
      <p>
        <Link href={`/${lang}/tools/curl-converter`} style={{ fontWeight: 600 }}>
          {s.linkTool}
        </Link>
      </p>

      {/* Section 1: Understanding cURL */}
      <h2>{s.h2_what}</h2>
      <p dangerouslySetInnerHTML={{ __html: s.whatDesc1 }} />
      <p dangerouslySetInnerHTML={{ __html: s.whatDesc2 }} />
      <p dangerouslySetInnerHTML={{ __html: s.whatDesc3 }} />

      {/* Section 2: Flags Reference */}
      <h2>{s.h2_flags}</h2>
      <p dangerouslySetInnerHTML={{ __html: s.flagsDesc }} />
      <div dangerouslySetInnerHTML={{ __html: s.flagsTable }} />

      {/* Section 3: cURL to JavaScript */}
      <h2>{s.h2_jsConvert}</h2>
      <h3>{s.jsFetchTitle}</h3>
      <p dangerouslySetInnerHTML={{ __html: s.jsFetchDesc }} />
      <pre><code>{`// cURL: curl -X POST https://api.example.com/users \\
//   -H "Content-Type: application/json" \\
//   -H "Authorization: Bearer YOUR_TOKEN" \\
//   -d '{"name":"Alice","email":"alice@example.com"}'

// JavaScript fetch equivalent
const response = await fetch("https://api.example.com/users", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Authorization": "Bearer YOUR_TOKEN",
  },
  body: JSON.stringify({
    name: "Alice",
    email: "alice@example.com",
  }),
});

const data = await response.json();
console.log(data);

// cURL: curl -X GET "https://api.example.com/users?page=1&limit=10" \\
//   -H "Accept: application/json"

// fetch GET with query parameters
const params = new URLSearchParams({ page: "1", limit: "10" });
const res = await fetch(\`https://api.example.com/users?\${params}\`, {
  headers: { Accept: "application/json" },
});

// cURL: curl -u admin:secret123 https://api.example.com/admin
// fetch with Basic Auth
const credentials = btoa("admin:secret123");
const authRes = await fetch("https://api.example.com/admin", {
  headers: { Authorization: \`Basic \${credentials}\` },
});`}</code></pre>

      <h3>{s.jsAxiosTitle}</h3>
      <p dangerouslySetInnerHTML={{ __html: s.jsAxiosDesc }} />
      <pre><code>{`import axios from "axios";

// cURL: curl -X POST https://api.example.com/users \\
//   -H "Content-Type: application/json" \\
//   -H "Authorization: Bearer YOUR_TOKEN" \\
//   -d '{"name":"Alice","email":"alice@example.com"}'

// axios automatically sets Content-Type for objects
const { data } = await axios.post(
  "https://api.example.com/users",
  { name: "Alice", email: "alice@example.com" },
  {
    headers: { Authorization: "Bearer YOUR_TOKEN" },
    timeout: 10000, // 10 second timeout
  }
);

// cURL: curl -X PUT https://api.example.com/users/123 \\
//   -H "Content-Type: application/json" \\
//   -d '{"name":"Alice Updated"}'

const updated = await axios.put(
  "https://api.example.com/users/123",
  { name: "Alice Updated" }
);

// cURL: curl -X DELETE https://api.example.com/users/123
await axios.delete("https://api.example.com/users/123");`}</code></pre>

      {/* Section 4: cURL to Python */}
      <h2>{s.h2_pythonConvert}</h2>
      <p dangerouslySetInnerHTML={{ __html: s.pythonDesc }} />
      <pre><code>{`import requests

# cURL: curl -X POST https://api.example.com/users \\
#   -H "Content-Type: application/json" \\
#   -H "Authorization: Bearer YOUR_TOKEN" \\
#   -d '{"name":"Alice","email":"alice@example.com"}'

response = requests.post(
    "https://api.example.com/users",
    json={"name": "Alice", "email": "alice@example.com"},
    headers={"Authorization": "Bearer YOUR_TOKEN"},
    timeout=10,
)
data = response.json()
print(data)

# cURL: curl -u admin:secret123 https://api.example.com/admin
response = requests.get(
    "https://api.example.com/admin",
    auth=("admin", "secret123"),
)

# cURL: curl -X POST https://api.example.com/upload \\
#   -F "file=@document.pdf" \\
#   -F "description=My document"
with open("document.pdf", "rb") as f:
    response = requests.post(
        "https://api.example.com/upload",
        files={"file": ("document.pdf", f, "application/pdf")},
        data={"description": "My document"},
    )

# cURL: curl -X GET "https://api.example.com/search?q=python&page=1"
response = requests.get(
    "https://api.example.com/search",
    params={"q": "python", "page": 1},
)

# Error handling
response = requests.post("https://api.example.com/data", json=payload)
response.raise_for_status()  # Raises HTTPError for 4xx/5xx`}</code></pre>

      {/* Section 5: cURL to Go */}
      <h2>{s.h2_goConvert}</h2>
      <p dangerouslySetInnerHTML={{ __html: s.goDesc }} />
      <pre><code>{`package main

import (
    "bytes"
    "encoding/json"
    "fmt"
    "io"
    "net/http"
    "time"
)

// cURL: curl -X POST https://api.example.com/users \\
//   -H "Content-Type: application/json" \\
//   -H "Authorization: Bearer YOUR_TOKEN" \\
//   -d '{"name":"Alice","email":"alice@example.com"}'

func createUser() error {
    payload := map[string]string{
        "name":  "Alice",
        "email": "alice@example.com",
    }
    body, _ := json.Marshal(payload)

    client := &http.Client{Timeout: 10 * time.Second}
    req, err := http.NewRequest("POST",
        "https://api.example.com/users",
        bytes.NewBuffer(body))
    if err != nil {
        return err
    }

    req.Header.Set("Content-Type", "application/json")
    req.Header.Set("Authorization", "Bearer YOUR_TOKEN")

    resp, err := client.Do(req)
    if err != nil {
        return err
    }
    defer resp.Body.Close()

    respBody, _ := io.ReadAll(resp.Body)
    fmt.Println(string(respBody))
    return nil
}`}</code></pre>

      {/* Section 6: cURL to PHP */}
      <h2>{s.h2_phpConvert}</h2>
      <p dangerouslySetInnerHTML={{ __html: s.phpDesc }} />
      <pre><code>{`<?php
// cURL: curl -X POST https://api.example.com/users \\
//   -H "Content-Type: application/json" \\
//   -H "Authorization: Bearer YOUR_TOKEN" \\
//   -d '{"name":"Alice","email":"alice@example.com"}'

// PHP cURL extension (built-in)
$ch = curl_init();
curl_setopt_array($ch, [
    CURLOPT_URL => "https://api.example.com/users",
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_POST => true,
    CURLOPT_POSTFIELDS => json_encode([
        "name" => "Alice",
        "email" => "alice@example.com"
    ]),
    CURLOPT_HTTPHEADER => [
        "Content-Type: application/json",
        "Authorization: Bearer YOUR_TOKEN"
    ],
    CURLOPT_TIMEOUT => 10,
]);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

$data = json_decode($response, true);
print_r($data);

// PHP Guzzle (modern alternative)
// composer require guzzlehttp/guzzle
use GuzzleHttp\\Client;

$client = new Client(["timeout" => 10]);
$response = $client->post("https://api.example.com/users", [
    "json" => ["name" => "Alice", "email" => "alice@example.com"],
    "headers" => ["Authorization" => "Bearer YOUR_TOKEN"],
]);

$data = json_decode($response->getBody(), true);`}</code></pre>

      {/* Section 7: Common Patterns */}
      <h2>{s.h2_commonPatterns}</h2>
      <p dangerouslySetInnerHTML={{ __html: s.commonPatternsDesc }} />
      <p dangerouslySetInnerHTML={{ __html: s.patternGet }} />
      <p dangerouslySetInnerHTML={{ __html: s.patternPost }} />
      <p dangerouslySetInnerHTML={{ __html: s.patternAuth }} />
      <p dangerouslySetInnerHTML={{ __html: s.patternUpload }} />

      {/* Section 8: Best Practices */}
      <h2>{s.h2_bestPractices}</h2>
      <p dangerouslySetInnerHTML={{ __html: s.bp1 }} />
      <p dangerouslySetInnerHTML={{ __html: s.bp2 }} />
      <p dangerouslySetInnerHTML={{ __html: s.bp3 }} />
      <p dangerouslySetInnerHTML={{ __html: s.bp4 }} />
      <p dangerouslySetInnerHTML={{ __html: s.bp5 }} />
      <p dangerouslySetInnerHTML={{ __html: s.bp6 }} />
      <p dangerouslySetInnerHTML={{ __html: s.bp7 }} />
      <p dangerouslySetInnerHTML={{ __html: s.relatedTools }} />

      <p>
        <Link href={`/${lang}/tools/curl-converter`} style={{ marginRight: 16 }}>cURL Converter</Link>
        <Link href={`/${lang}/tools/json-formatter`} style={{ marginRight: 16 }}>JSON Formatter</Link>
        <Link href={`/${lang}/tools/jwt-decoder`} style={{ marginRight: 16 }}>JWT Decoder</Link>
        <Link href={`/${lang}/tools/url-encoder`}>URL Encoder/Decoder</Link>
      </p>

      {/* Section 9: FAQ */}
      <h2>{s.h2_faq}</h2>
      <h3>{s.faq1_q}</h3>
      <p dangerouslySetInnerHTML={{ __html: s.faq1_a }} />
      <h3>{s.faq2_q}</h3>
      <p dangerouslySetInnerHTML={{ __html: s.faq2_a }} />
      <h3>{s.faq3_q}</h3>
      <p dangerouslySetInnerHTML={{ __html: s.faq3_a }} />
      <h3>{s.faq4_q}</h3>
      <p dangerouslySetInnerHTML={{ __html: s.faq4_a }} />
      <h3>{s.faq5_q}</h3>
      <p dangerouslySetInnerHTML={{ __html: s.faq5_a }} />

      <p style={{ marginTop: 32 }} dangerouslySetInnerHTML={{ __html: s.conclusion }} />
      <p><Link href={`/${lang}/tools/curl-converter`} style={{ fontWeight: 600 }}>{s.linkToolBottom}</Link></p>

      {/* Internal links for SEO */}
      <h2>Related Developer Tools and Guides</h2>
      <ul>
        <li><Link href={`/${lang}/tools/curl-converter`}>cURL Converter</Link> - Convert cURL commands to any programming language</li>
        <li><Link href={`/${lang}/tools/json-formatter`}>JSON Formatter</Link> - Format and validate JSON API responses</li>
        <li><Link href={`/${lang}/tools/jwt-decoder`}>JWT Decoder</Link> - Decode and inspect JWT authentication tokens</li>
        <li><Link href={`/${lang}/tools/url-encoder`}>URL Encoder/Decoder</Link> - Encode query parameters and URLs</li>
        <li><Link href={`/${lang}/tools/base64`}>Base64 Encoder/Decoder</Link> - Encode Basic Auth credentials</li>
        <li><Link href={`/${lang}/tools/json-to-typescript`}>JSON to TypeScript</Link> - Generate types from API responses</li>
        <li><Link href={`/${lang}/tools/json-to-go`}>JSON to Go</Link> - Generate Go structs from API responses</li>
        <li><Link href={`/${lang}/tools/json-to-python`}>JSON to Python</Link> - Generate Python dataclasses from JSON</li>
        <li><Link href={`/${lang}/tools/http-status-codes`}>HTTP Status Codes</Link> - Reference for all HTTP response codes</li>
        <li><Link href={`/${lang}/blog/curl-command-cheat-sheet-examples`}>cURL Cheat Sheet</Link> - Complete cURL command reference</li>
        <li><Link href={`/${lang}/blog/rest-api-best-practices-guide`}>REST API Best Practices</Link> - Design patterns for APIs</li>
      </ul>
    </>
  );
}
