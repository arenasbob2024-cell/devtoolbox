import Link from 'next/link';

const t: Record<string, Record<string, string>> = {
  en: {
    intro: '<strong>URL encoding</strong> (also known as <strong>percent encoding</strong>) is one of the most essential mechanisms in web development. Every time you submit a form, click a link with query parameters, or call a REST API, <strong>URL encode</strong> and <strong>URL decode</strong> operations happen behind the scenes. Whether you need a quick <strong>URL encoder</strong> for a one-off task, want to <strong>url encode online</strong> without installing anything, or need to understand why <code>encodeURIComponent</code> exists, this comprehensive guide covers everything from the RFC 3986 specification to practical code examples in JavaScript, Python, Bash, PHP, and Java. If you need to quickly <strong>urlencode</strong> or <strong>decode url online</strong>, try our free tool.',
    linkTool: 'Try our free online URL Encode/Decode tool instantly.',
    h2_what: 'What Is URL Encoding (Percent Encoding)?',
    whatDesc1: '<strong>URL encoding</strong>, formally defined in RFC 3986, is a mechanism for encoding information in a Uniform Resource Identifier (URI) by replacing unsafe or reserved characters with a percent sign (<code>%</code>) followed by two hexadecimal digits representing the character\'s byte value. For example, a space character (ASCII 32, hex 20) becomes <code>%20</code>. This process is also called <strong>percent encoding</strong> because every encoded character starts with the <code>%</code> symbol.',
    whatDesc2: 'URLs can only contain a limited set of characters from the US-ASCII character set. The <strong>url safe characters</strong> that do NOT need encoding are: uppercase letters (<code>A-Z</code>), lowercase letters (<code>a-z</code>), digits (<code>0-9</code>), and four special characters: hyphen (<code>-</code>), underscore (<code>_</code>), period (<code>.</code>), and tilde (<code>~</code>). These are called "unreserved characters" in RFC 3986. Every other character, including spaces, non-ASCII characters (like Chinese, Japanese, or emoji), and reserved delimiters, must be percent-encoded when used in contexts where they would otherwise be interpreted as URI delimiters.',
    whatDesc3: 'Why do URLs need encoding? URLs serve as universal addresses on the web, and they must be unambiguous. Characters like <code>&amp;</code>, <code>=</code>, <code>?</code>, and <code>#</code> have special structural meanings in URLs: <code>?</code> separates the path from the query string, <code>&amp;</code> separates query parameters, <code>=</code> separates keys from values, and <code>#</code> marks a fragment. If your data contains these characters (for example, a search query like "cats &amp; dogs"), they must be encoded (<code>cats%20%26%20dogs</code>) so the browser and server can distinguish data from URL structure. Without proper <strong>url encode</strong> operations, URLs would break or be misinterpreted.',
    h2_howWorks: 'How URL Encoding Works',
    howWorksDesc: 'The <strong>URL encode</strong> process follows a straightforward algorithm. For each character that needs encoding:',
    howWorksSteps: '<ol><li><strong>Convert the character to its byte representation</strong> using UTF-8 encoding. ASCII characters produce a single byte; non-ASCII characters (like <code>u00e9</code> or CJK characters) produce 2-4 bytes.</li><li><strong>For each byte</strong>, write a percent sign (<code>%</code>) followed by the two-digit uppercase hexadecimal value of that byte.</li><li><strong>Unreserved characters</strong> (<code>A-Z a-z 0-9 - _ . ~</code>) are left as-is without encoding.</li><li><strong>Reserved characters</strong> (<code>: / ? # [ ] @ ! $ &amp; \' ( ) * + , ; =</code>) are encoded only when they appear in a context where they would be misinterpreted (e.g., inside a query parameter value).</li></ol>',
    howWorksExample: '<strong>Example</strong>: Encoding the string <code>Hello World! Price: $5</code> produces <code>Hello%20World%21%20Price%3A%20%245</code>. Each space becomes <code>%20</code>, the exclamation mark becomes <code>%21</code>, the colon becomes <code>%3A</code>, and the dollar sign becomes <code>%24</code>.',
    howWorksUtf8: '<strong>UTF-8 multi-byte example</strong>: The character <code>e with accent (U+00E9)</code> encodes to two UTF-8 bytes <code>0xC3 0xA9</code>, which become <code>%C3%A9</code>. A Chinese character like <code>zhong (U+4E2D)</code> encodes to three UTF-8 bytes <code>0xE4 0xB8 0xAD</code>, producing <code>%E4%B8%AD</code>. The <strong>URL decoder</strong> reverses this process by reading the hex values, reconstructing the bytes, and converting back to UTF-8 characters.',
    h2_table: 'URL Encoding Reference Table',
    tableDesc: 'Here is a comprehensive reference table of commonly encoded characters. Bookmark this for quick lookup when you need to <strong>url encode</strong> special characters:',
    h2_space: 'Space Encoding: %20 vs + (Plus Sign)',
    spaceDesc1: 'One of the most confusing aspects of URL encoding is how spaces are handled. There are two valid ways to <strong>url encode space</strong> characters, and which one you should use depends on the context:',
    spaceDesc2: '<strong><code>%20</code> (Percent encoding)</strong>: This is the standard encoding defined by RFC 3986 for use in URIs. When you <strong>url encode</strong> a space in a URL path, query parameter name, or any generic URI component, use <code>%20</code>. For example: <code>https://example.com/my%20file.html</code> or <code>https://api.example.com/search?q=hello%20world</code>.',
    spaceDesc3: '<strong><code>+</code> (Plus sign)</strong>: This encoding is defined by the <code>application/x-www-form-urlencoded</code> content type specification (used by HTML forms). When an HTML form is submitted with <code>method="GET"</code> or <code>method="POST"</code> with default encoding, spaces in form values are encoded as <code>+</code>. For example: <code>?q=hello+world</code>. This is a legacy format from HTML 2.0 that persists in web browsers today.',
    spaceDesc4: '<strong>When to use which?</strong> If you are building a URL programmatically (API calls, REST endpoints, constructing links), always use <code>%20</code>. If you are encoding data specifically for <code>application/x-www-form-urlencoded</code> format (HTML form submission, <code>URLSearchParams</code> in JavaScript), the <code>+</code> encoding is used automatically. The <strong>URL decoder</strong> must be aware of the context to correctly interpret <code>+</code> signs: in form data, <code>+</code> means space; in a regular URI, <code>+</code> is a literal plus sign that should NOT be decoded to a space.',
    h2_codeExamples: 'URL Encode/Decode Code Examples',
    codeJsTitle: 'JavaScript URL Encode/Decode',
    codeJsDesc: 'JavaScript provides several built-in functions for URL encoding. The most important distinction is between <code>encodeURIComponent</code> and <code>encodeURI</code>. Understanding when to use each is critical for correct <strong>url encode</strong> operations:',
    codePyTitle: 'Python URL Encode/Decode',
    codePyDesc: 'Python\'s <code>urllib.parse</code> module provides comprehensive <strong>URL encode</strong> and <strong>URL decode</strong> functions. The <code>requests</code> library handles encoding automatically for API calls:',
    codeBashTitle: 'Bash / curl URL Encode/Decode',
    codeBashDesc: 'When working with curl or shell scripts, you often need to <strong>urlencode</strong> data for HTTP requests. The <code>--data-urlencode</code> flag is the simplest approach:',
    codePhpTitle: 'PHP URL Encode/Decode',
    codePhpDesc: 'PHP provides two pairs of functions for URL encoding. Understanding the difference between <code>urlencode()</code> and <code>rawurlencode()</code> is essential for correct <strong>percent encoding</strong>:',
    codeJavaTitle: 'Java URL Encode/Decode',
    codeJavaDesc: 'Java\'s <code>URLEncoder</code> and <code>URLDecoder</code> classes handle <strong>URL encode</strong> and <strong>URL decode</strong> operations. Always specify UTF-8 encoding explicitly:',
    h2_mistakes: 'Common URL Encoding Mistakes',
    mistakesDesc: 'Even experienced developers make these URL encoding errors. Here are the most common pitfalls to avoid:',
    mistake1: '<strong>Double encoding</strong>: This occurs when you encode a string that has already been encoded. For example, <code>hello world</code> becomes <code>hello%20world</code> after the first encoding, then <code>hello%2520world</code> after accidental double encoding (the <code>%</code> itself gets encoded to <code>%25</code>). This is the most common URL encoding bug. To fix it: always encode raw/unencoded values, and never pass already-encoded strings through an encoder again.',
    mistake2: '<strong>Encoding the entire URL</strong>: A frequent error is running the entire URL through <code>encodeURIComponent()</code>. This will encode the slashes, colons, and other structural characters, breaking the URL. For example, <code>https://example.com/path?q=value</code> becomes <code>https%3A%2F%2Fexample.com%2Fpath%3Fq%3Dvalue</code>, which is completely invalid as a URL. Instead, only encode the individual parameter values, not the entire URL structure. Use <code>encodeURI()</code> if you need to encode a full URL (it preserves structural characters), or use <code>encodeURIComponent()</code> only on individual query parameter values.',
    mistake3: '<strong>Forgetting UTF-8</strong>: In some languages (especially Java and older PHP), the default encoding might not be UTF-8. Java\'s <code>URLEncoder.encode(str, "UTF-8")</code> requires explicit charset specification. Always use UTF-8 for URL encoding, as mandated by RFC 3986 and the WHATWG URL specification. Using Latin-1 or other encodings will produce incorrect percent-encoded sequences for non-ASCII characters.',
    mistake4: '<strong>Not encoding path segments</strong>: Developers sometimes forget that URL path segments also need encoding. A file path like <code>/documents/my report.pdf</code> must become <code>/documents/my%20report.pdf</code>. Similarly, path parameters that contain slashes or other reserved characters must be encoded.',
    mistake5: '<strong>Mishandling the + sign</strong>: Treating <code>+</code> as a space in all contexts is wrong. In <code>application/x-www-form-urlencoded</code> format, <code>+</code> means space. But in a regular URL path or fragment, <code>+</code> is a literal plus sign. Using the wrong decoder can corrupt data containing actual plus signs.',
    h2_apis: 'URL Encoding in APIs and Web Applications',
    apisDesc: 'Understanding how to properly <strong>url encode</strong> data is critical when working with APIs and web applications. Here are the key contexts:',
    apisQuery: '<strong>Query parameters</strong>: When building API URLs with query parameters, each parameter name and value must be individually encoded. For example, if you are searching for <code>price &gt; 100 &amp; category = "electronics"</code>, the URL should be <code>/search?q=price%20%3E%20100%20%26%20category%20%3D%20%22electronics%22</code>. Most HTTP client libraries (axios, fetch, requests) handle this automatically when you pass parameters as objects.',
    apisPath: '<strong>Path parameters</strong>: Values embedded in URL paths must also be encoded. A REST API endpoint like <code>/users/{username}/repos</code> needs encoding if the username contains special characters: <code>/users/john%40example.com/repos</code>. Unlike query parameters, path segments should use standard percent encoding and never use <code>+</code> for spaces.',
    apisForm: '<strong>Form data</strong>: When sending <code>application/x-www-form-urlencoded</code> data in a POST request body, the encoding rules differ from standard URL encoding. Spaces are encoded as <code>+</code>, and the data is formatted as <code>key1=value1&amp;key2=value2</code>. Most frameworks handle this automatically, but be aware of the difference if you are constructing form-encoded bodies manually.',
    apisJson: '<strong>JSON payloads</strong>: When sending JSON in a request body (<code>application/json</code>), you do NOT need to URL-encode the JSON content. URL encoding is only for URL components (path, query string, fragment) and form-encoded bodies. However, if you ever need to pass JSON as a query parameter value, the entire JSON string must be URL-encoded.',
    h2_faq: 'Frequently Asked Questions',
    faq1_q: 'What is URL encoding and why is it needed?',
    faq1_a: 'URL encoding (percent encoding) is the process of converting characters into a format that can be safely transmitted in a URL. It replaces unsafe characters with a percent sign followed by two hex digits (e.g., space becomes %20). It is needed because URLs can only contain a limited set of ASCII characters. Special characters like &, =, ?, #, and spaces have structural meaning in URLs, so they must be encoded when used as data to prevent misinterpretation by browsers and servers. Non-ASCII characters (Unicode, CJK, emoji) must also be UTF-8 encoded then percent-encoded for inclusion in URLs.',
    faq2_q: 'What is the difference between encodeURI and encodeURIComponent?',
    faq2_a: 'encodeURI() encodes a complete URI, preserving characters that have special meaning in URLs such as :, /, ?, #, &, and =. Use it when you have a full URL string and want to encode only the unsafe characters while keeping the URL structure intact. encodeURIComponent() encodes everything except unreserved characters (A-Z, a-z, 0-9, -, _, ., ~), including the structural URL characters. Use it when encoding individual query parameter values, path segments, or any data that will be embedded in a URL. Using encodeURIComponent on a full URL will break it by encoding the slashes and colons.',
    faq3_q: 'Should I use %20 or + for spaces in URLs?',
    faq3_a: 'Use %20 for spaces in URL paths and when building URLs programmatically according to RFC 3986. Use + for spaces only in application/x-www-form-urlencoded content, which is the format used by HTML form submissions. In practice: JavaScript encodeURIComponent() produces %20, while URLSearchParams uses +. Python urllib.parse.quote() produces %20, while urllib.parse.urlencode() produces +. When in doubt, %20 is the safer and more universally correct choice, as it works in all URL contexts.',
    conclusion: '<strong>URL encoding</strong> is a fundamental web development skill that every developer encounters daily. From constructing API calls to handling form submissions, understanding how to properly <strong>url encode</strong> and <strong>url decode</strong> data prevents bugs, security vulnerabilities, and broken links. Bookmark this guide for quick reference, and use our free online tool for instant encoding and decoding.',
    linkToolBottom: 'URL encode and decode strings instantly with our free online tool.',
  },
  zh: {
    intro: '<strong>URL 编码</strong>（也称为<strong>百分号编码</strong>）是 Web 开发中最基本的机制之一。每当你提交表单、点击带有查询参数的链接或调用 REST API 时，<strong>URL 编码</strong>和<strong>URL 解码</strong>操作都在幕后进行。无论你需要一个快速的 <strong>URL 编码器</strong>来处理一次性任务，还是想在线进行 URL 编码解码，本综合指南涵盖了从 RFC 3986 规范到 JavaScript、Python、Bash、PHP 和 Java 实用代码示例的所有内容。',
    linkTool: '立即试用我们的免费在线 URL 编码/解码工具。',
    h2_what: '什么是 URL 编码（百分号编码）？',
    whatDesc1: '<strong>URL 编码</strong>在 RFC 3986 中正式定义，是一种通过将不安全或保留字符替换为百分号（<code>%</code>）后跟两个十六进制数字来编码 URI 信息的机制。例如，空格字符（ASCII 32，十六进制 20）变为 <code>%20</code>。由于每个编码字符都以 <code>%</code> 符号开头，因此这个过程也被称为<strong>百分号编码</strong>。',
    whatDesc2: 'URL 只能包含 US-ASCII 字符集中的有限字符集。不需要编码的 <strong>URL 安全字符</strong>包括：大写字母（<code>A-Z</code>）、小写字母（<code>a-z</code>）、数字（<code>0-9</code>）和四个特殊字符：连字符（<code>-</code>）、下划线（<code>_</code>）、句点（<code>.</code>）和波浪号（<code>~</code>）。在 RFC 3986 中这些被称为"非保留字符"。其他所有字符都必须进行百分号编码。',
    whatDesc3: '为什么 URL 需要编码？URL 作为 Web 上的通用地址，必须是明确的。<code>&amp;</code>、<code>=</code>、<code>?</code> 和 <code>#</code> 等字符在 URL 中有特殊的结构含义。如果你的数据包含这些字符，就必须进行编码，以便浏览器和服务器能够区分数据和 URL 结构。',
    h2_howWorks: 'URL 编码工作原理',
    howWorksDesc: '<strong>URL 编码</strong>过程遵循简单的算法。对于每个需要编码的字符：',
    howWorksSteps: '<ol><li><strong>使用 UTF-8 编码将字符转换为字节表示</strong>。ASCII 字符产生单个字节；非 ASCII 字符产生 2-4 个字节。</li><li><strong>对于每个字节</strong>，写一个百分号（<code>%</code>）后跟该字节的两位大写十六进制值。</li><li><strong>非保留字符</strong>（<code>A-Z a-z 0-9 - _ . ~</code>）保持原样不编码。</li><li><strong>保留字符</strong>（<code>: / ? # [ ] @ ! $ &amp; \' ( ) * + , ; =</code>）仅在会被误解时才编码。</li></ol>',
    howWorksExample: '<strong>示例</strong>：编码字符串 <code>Hello World! Price: $5</code> 产生 <code>Hello%20World%21%20Price%3A%20%245</code>。',
    howWorksUtf8: '<strong>UTF-8 多字节示例</strong>：中文字符"中"（U+4E2D）编码为三个 UTF-8 字节 <code>0xE4 0xB8 0xAD</code>，产生 <code>%E4%B8%AD</code>。URL 解码器通过读取十六进制值、重建字节并转换回 UTF-8 字符来逆转此过程。',
    h2_table: 'URL 编码参考表',
    tableDesc: '以下是常用编码字符的完整参考表。收藏此表以便在需要 URL 编码特殊字符时快速查找：',
    h2_space: '空格编码：%20 与 +（加号）',
    spaceDesc1: 'URL 编码中最令人困惑的方面之一是空格的处理方式。有两种有效的方式来编码空格字符，使用哪种取决于上下文：',
    spaceDesc2: '<strong><code>%20</code>（百分号编码）</strong>：这是 RFC 3986 为 URI 定义的标准编码。在 URL 路径、查询参数名或任何通用 URI 组件中编码空格时使用 <code>%20</code>。',
    spaceDesc3: '<strong><code>+</code>（加号）</strong>：此编码由 <code>application/x-www-form-urlencoded</code> 内容类型规范定义（HTML 表单使用）。HTML 表单提交时，表单值中的空格被编码为 <code>+</code>。',
    spaceDesc4: '<strong>何时使用哪个？</strong>如果你是以编程方式构建 URL（API 调用、REST 端点），始终使用 <code>%20</code>。如果你专门为表单编码格式编码数据，<code>+</code> 编码会自动使用。',
    h2_codeExamples: 'URL 编码/解码代码示例',
    codeJsTitle: 'JavaScript URL 编码/解码',
    codeJsDesc: 'JavaScript 提供了多个内置 URL 编码函数。最重要的区别是 <code>encodeURIComponent</code> 和 <code>encodeURI</code>。理解何时使用每个对于正确的 URL 编码操作至关重要：',
    codePyTitle: 'Python URL 编码/解码',
    codePyDesc: 'Python 的 <code>urllib.parse</code> 模块提供全面的 URL 编码和解码函数。<code>requests</code> 库会自动处理 API 调用的编码：',
    codeBashTitle: 'Bash / curl URL 编码/解码',
    codeBashDesc: '使用 curl 或 shell 脚本时，经常需要对 HTTP 请求的数据进行 URL 编码。<code>--data-urlencode</code> 参数是最简单的方法：',
    codePhpTitle: 'PHP URL 编码/解码',
    codePhpDesc: 'PHP 提供了两对 URL 编码函数。理解 <code>urlencode()</code> 和 <code>rawurlencode()</code> 的区别对于正确的百分号编码至关重要：',
    codeJavaTitle: 'Java URL 编码/解码',
    codeJavaDesc: 'Java 的 <code>URLEncoder</code> 和 <code>URLDecoder</code> 类处理 URL 编码和解码操作。始终显式指定 UTF-8 编码：',
    h2_mistakes: '常见 URL 编码错误',
    mistakesDesc: '即使是经验丰富的开发者也会犯这些 URL 编码错误。以下是需要避免的常见陷阱：',
    mistake1: '<strong>双重编码</strong>：当你对已编码的字符串再次编码时就会发生。例如，<code>%20</code> 变成 <code>%2520</code>。解决方法：始终编码原始值，不要将已编码的字符串再次通过编码器。',
    mistake2: '<strong>编码整个 URL</strong>：将整个 URL 通过 <code>encodeURIComponent()</code> 是常见错误。这会编码斜杠、冒号等结构字符，破坏 URL。应只编码单个参数值。',
    mistake3: '<strong>忘记 UTF-8</strong>：某些语言（尤其是 Java 和旧版 PHP）的默认编码可能不是 UTF-8。始终使用 UTF-8 进行 URL 编码。',
    mistake4: '<strong>未编码路径段</strong>：开发者有时忘记 URL 路径段也需要编码。文件路径如 <code>/documents/my report.pdf</code> 必须变为 <code>/documents/my%20report.pdf</code>。',
    mistake5: '<strong>错误处理 + 号</strong>：在所有上下文中将 <code>+</code> 视为空格是错误的。在表单编码格式中 <code>+</code> 表示空格，但在常规 URL 路径中 <code>+</code> 是字面加号。',
    h2_apis: 'API 和 Web 应用中的 URL 编码',
    apisDesc: '在使用 API 和 Web 应用时，理解如何正确进行 URL 编码至关重要。以下是关键场景：',
    apisQuery: '<strong>查询参数</strong>：构建带查询参数的 API URL 时，每个参数名和值必须单独编码。大多数 HTTP 客户端库会自动处理。',
    apisPath: '<strong>路径参数</strong>：嵌入 URL 路径中的值也必须编码。路径段应使用标准百分号编码，不要使用 <code>+</code> 表示空格。',
    apisForm: '<strong>表单数据</strong>：发送 <code>application/x-www-form-urlencoded</code> 数据时，编码规则与标准 URL 编码不同。空格编码为 <code>+</code>。',
    apisJson: '<strong>JSON 负载</strong>：发送 JSON 请求体时，不需要对 JSON 内容进行 URL 编码。但如果需要将 JSON 作为查询参数值传递，整个 JSON 字符串必须进行 URL 编码。',
    h2_faq: '常见问题',
    faq1_q: '什么是 URL 编码，为什么需要它？',
    faq1_a: 'URL 编码（百分号编码）是将字符转换为可在 URL 中安全传输的格式的过程。它用百分号后跟两个十六进制数字替换不安全字符（如空格变为 %20）。URL 只能包含有限的 ASCII 字符集，&、=、?、# 和空格等特殊字符在 URL 中有结构含义，作为数据使用时必须编码以防止误解。非 ASCII 字符（Unicode、中日韩文字、表情符号）也必须先进行 UTF-8 编码再百分号编码。',
    faq2_q: 'encodeURI 和 encodeURIComponent 有什么区别？',
    faq2_a: 'encodeURI() 编码完整 URI，保留 URL 中有特殊含义的字符如 :、/、?、#、& 和 =。encodeURIComponent() 编码除非保留字符外的所有内容。对完整 URL 使用 encodeURIComponent 会破坏 URL 结构。对单个查询参数值使用 encodeURIComponent，对完整 URL 使用 encodeURI。',
    faq3_q: 'URL 中空格应该用 %20 还是 +？',
    faq3_a: '在 URL 路径和编程构建 URL 时使用 %20（RFC 3986 标准）。仅在 application/x-www-form-urlencoded 内容中使用 +（HTML 表单提交格式）。JavaScript 的 encodeURIComponent() 产生 %20，URLSearchParams 使用 +。如有疑问，%20 是更安全且更通用的选择。',
    conclusion: '<strong>URL 编码</strong>是每个开发者日常遇到的基础 Web 开发技能。从构建 API 调用到处理表单提交，理解如何正确进行 URL 编码和解码可以防止 bug、安全漏洞和链接失效。收藏本指南以备参考，并使用我们的免费在线工具进行即时编码和解码。',
    linkToolBottom: '使用我们的免费在线工具即时 URL 编码和解码字符串。',
  },
  fr: {
    intro: '<strong>L\'encodage URL</strong> (egalement connu sous le nom d\'<strong>encodage pourcent</strong>) est l\'un des mecanismes les plus essentiels du developpement web. Chaque fois que vous soumettez un formulaire, cliquez sur un lien avec des parametres de requete ou appelez une API REST, des operations d\'encodage et de decodage URL se produisent. Ce guide complet couvre tout, de la specification RFC 3986 aux exemples de code pratiques en JavaScript, Python, Bash, PHP et Java.',
    linkTool: 'Essayez notre outil gratuit d\'encodage/decodage URL en ligne.',
    h2_what: 'Qu\'est-ce que l\'encodage URL (encodage pourcent) ?',
    whatDesc1: '<strong>L\'encodage URL</strong>, defini dans la RFC 3986, remplace les caracteres non securises par un signe pourcent (<code>%</code>) suivi de deux chiffres hexadecimaux. Par exemple, un espace devient <code>%20</code>.',
    whatDesc2: 'Les URLs ne peuvent contenir qu\'un ensemble limite de caracteres ASCII. Les <strong>caracteres surs</strong> qui n\'ont pas besoin d\'encodage sont : lettres, chiffres et quatre caracteres speciaux : <code>-</code>, <code>_</code>, <code>.</code>, <code>~</code>. Tous les autres caracteres doivent etre encodes.',
    whatDesc3: 'Les caracteres comme <code>&amp;</code>, <code>=</code>, <code>?</code> et <code>#</code> ont des significations structurelles dans les URLs. Sans encodage URL, les URLs seraient cassees ou mal interpretees.',
    h2_howWorks: 'Comment fonctionne l\'encodage URL',
    howWorksDesc: 'Le processus d\'encodage URL suit un algorithme simple :',
    howWorksSteps: '<ol><li><strong>Convertir le caractere en octets UTF-8</strong>.</li><li><strong>Pour chaque octet</strong>, ecrire <code>%</code> suivi de la valeur hexadecimale.</li><li><strong>Les caracteres non reserves</strong> restent inchanges.</li><li><strong>Les caracteres reserves</strong> ne sont encodes que dans les contextes ou ils seraient mal interpretes.</li></ol>',
    howWorksExample: '<strong>Exemple</strong> : <code>Hello World!</code> devient <code>Hello%20World%21</code>.',
    howWorksUtf8: '<strong>Exemple multi-octets UTF-8</strong> : Les caracteres non-ASCII produisent plusieurs octets percent-encodes.',
    h2_table: 'Table de reference d\'encodage URL',
    tableDesc: 'Table de reference des caracteres couramment encodes :',
    h2_space: 'Encodage des espaces : %20 vs +',
    spaceDesc1: 'Il existe deux facons d\'encoder les espaces dans les URLs :',
    spaceDesc2: '<strong><code>%20</code></strong> : Encodage standard RFC 3986 pour les URIs.',
    spaceDesc3: '<strong><code>+</code></strong> : Utilise par <code>application/x-www-form-urlencoded</code> (formulaires HTML).',
    spaceDesc4: '<strong>Lequel utiliser ?</strong> Utilisez <code>%20</code> pour construire des URLs programmatiquement. Le <code>+</code> est utilise automatiquement pour les formulaires.',
    h2_codeExamples: 'Exemples de code d\'encodage/decodage URL',
    codeJsTitle: 'JavaScript encodage/decodage URL',
    codeJsDesc: 'JavaScript offre <code>encodeURIComponent</code> et <code>encodeURI</code>. Comprendre quand utiliser chacun est essentiel :',
    codePyTitle: 'Python encodage/decodage URL',
    codePyDesc: 'Le module <code>urllib.parse</code> de Python fournit des fonctions completes d\'encodage URL :',
    codeBashTitle: 'Bash / curl encodage URL',
    codeBashDesc: 'Avec curl, le flag <code>--data-urlencode</code> est l\'approche la plus simple :',
    codePhpTitle: 'PHP encodage/decodage URL',
    codePhpDesc: 'PHP fournit <code>urlencode()</code> et <code>rawurlencode()</code> :',
    codeJavaTitle: 'Java encodage/decodage URL',
    codeJavaDesc: 'Les classes <code>URLEncoder</code> et <code>URLDecoder</code> de Java gerent l\'encodage URL :',
    h2_mistakes: 'Erreurs courantes d\'encodage URL',
    mistakesDesc: 'Les pieges les plus courants a eviter :',
    mistake1: '<strong>Double encodage</strong> : Encoder une chaine deja encodee. <code>%20</code> devient <code>%2520</code>.',
    mistake2: '<strong>Encoder l\'URL entiere</strong> : Utiliser <code>encodeURIComponent()</code> sur une URL complete casse la structure.',
    mistake3: '<strong>Oublier UTF-8</strong> : Toujours utiliser UTF-8 pour l\'encodage URL.',
    mistake4: '<strong>Ne pas encoder les segments de chemin</strong> : Les chemins avec espaces doivent aussi etre encodes.',
    mistake5: '<strong>Mauvaise gestion du signe +</strong> : <code>+</code> signifie espace dans les formulaires, mais c\'est un literal dans les URLs.',
    h2_apis: 'Encodage URL dans les APIs',
    apisDesc: 'Comprendre l\'encodage URL est crucial pour les APIs :',
    apisQuery: '<strong>Parametres de requete</strong> : Chaque nom et valeur de parametre doit etre encode individuellement.',
    apisPath: '<strong>Parametres de chemin</strong> : Les valeurs dans les chemins d\'URL doivent aussi etre encodees.',
    apisForm: '<strong>Donnees de formulaire</strong> : <code>application/x-www-form-urlencoded</code> utilise <code>+</code> pour les espaces.',
    apisJson: '<strong>Charges JSON</strong> : Le contenu JSON dans le corps d\'une requete n\'a pas besoin d\'encodage URL.',
    h2_faq: 'Questions frequemment posees',
    faq1_q: 'Qu\'est-ce que l\'encodage URL et pourquoi est-il necessaire ?',
    faq1_a: 'L\'encodage URL remplace les caracteres non securises par des sequences pourcent-hexadecimales pour une transmission sure dans les URLs. Les caracteres speciaux comme &, =, ? et # ont des significations structurelles et doivent etre encodes comme donnees.',
    faq2_q: 'Quelle est la difference entre encodeURI et encodeURIComponent ?',
    faq2_a: 'encodeURI() preserve les caracteres structurels de l\'URL (:, /, ?, #). encodeURIComponent() encode tout sauf les caracteres non reserves. Utilisez encodeURIComponent pour les valeurs de parametres individuels.',
    faq3_q: 'Faut-il utiliser %20 ou + pour les espaces ?',
    faq3_a: 'Utilisez %20 pour les URLs (RFC 3986). Utilisez + uniquement pour application/x-www-form-urlencoded. En cas de doute, %20 est le choix le plus sur.',
    conclusion: 'L\'encodage URL est une competence fondamentale du developpement web. Utilisez notre outil gratuit pour un encodage et decodage instantanes.',
    linkToolBottom: 'Encodez et decodez des URLs instantanement avec notre outil gratuit.',
  },
  de: {
    intro: '<strong>URL-Kodierung</strong> (auch bekannt als <strong>Prozent-Kodierung</strong>) ist einer der wichtigsten Mechanismen in der Webentwicklung. Jedes Mal, wenn Sie ein Formular absenden, auf einen Link mit Query-Parametern klicken oder eine REST-API aufrufen, finden URL-Kodierungs- und Dekodierungsoperationen statt. Dieser umfassende Leitfaden deckt alles ab, von der RFC-3986-Spezifikation bis zu praktischen Codebeispielen in JavaScript, Python, Bash, PHP und Java.',
    linkTool: 'Testen Sie unser kostenloses Online URL-Kodierungs/Dekodierungs-Tool.',
    h2_what: 'Was ist URL-Kodierung (Prozent-Kodierung)?',
    whatDesc1: '<strong>URL-Kodierung</strong>, definiert in RFC 3986, ersetzt unsichere Zeichen durch ein Prozentzeichen (<code>%</code>) gefolgt von zwei Hexadezimalziffern. Zum Beispiel wird ein Leerzeichen zu <code>%20</code>.',
    whatDesc2: 'URLs konnen nur eine begrenzte Menge von ASCII-Zeichen enthalten. Die <strong>URL-sicheren Zeichen</strong> sind: Buchstaben, Ziffern und vier Sonderzeichen: <code>-</code>, <code>_</code>, <code>.</code>, <code>~</code>. Alle anderen Zeichen mussen kodiert werden.',
    whatDesc3: 'Zeichen wie <code>&amp;</code>, <code>=</code>, <code>?</code> und <code>#</code> haben strukturelle Bedeutungen in URLs. Ohne URL-Kodierung wurden URLs brechen oder falsch interpretiert werden.',
    h2_howWorks: 'Wie URL-Kodierung funktioniert',
    howWorksDesc: 'Der URL-Kodierungsprozess folgt einem einfachen Algorithmus:',
    howWorksSteps: '<ol><li><strong>Zeichen in UTF-8-Bytes konvertieren</strong>.</li><li><strong>Fur jedes Byte</strong> ein <code>%</code> gefolgt vom Hexadezimalwert schreiben.</li><li><strong>Nicht reservierte Zeichen</strong> bleiben unverandert.</li><li><strong>Reservierte Zeichen</strong> werden nur bei Mehrdeutigkeit kodiert.</li></ol>',
    howWorksExample: '<strong>Beispiel</strong>: <code>Hello World!</code> wird zu <code>Hello%20World%21</code>.',
    howWorksUtf8: '<strong>UTF-8 Mehrbytebeispiel</strong>: Nicht-ASCII-Zeichen erzeugen mehrere prozentkodierte Bytes.',
    h2_table: 'URL-Kodierung Referenztabelle',
    tableDesc: 'Referenztabelle haufig kodierter Zeichen:',
    h2_space: 'Leerzeichenkodierung: %20 vs +',
    spaceDesc1: 'Es gibt zwei gultige Wege, Leerzeichen in URLs zu kodieren:',
    spaceDesc2: '<strong><code>%20</code></strong>: Standard-RFC-3986-Kodierung fur URIs.',
    spaceDesc3: '<strong><code>+</code></strong>: Verwendet von <code>application/x-www-form-urlencoded</code> (HTML-Formulare).',
    spaceDesc4: '<strong>Welches verwenden?</strong> Verwenden Sie <code>%20</code> beim programmatischen URL-Aufbau. <code>+</code> wird automatisch fur Formulardaten verwendet.',
    h2_codeExamples: 'URL-Kodierung/Dekodierung Codebeispiele',
    codeJsTitle: 'JavaScript URL-Kodierung/Dekodierung',
    codeJsDesc: 'JavaScript bietet <code>encodeURIComponent</code> und <code>encodeURI</code>:',
    codePyTitle: 'Python URL-Kodierung/Dekodierung',
    codePyDesc: 'Pythons <code>urllib.parse</code>-Modul bietet umfassende URL-Kodierungsfunktionen:',
    codeBashTitle: 'Bash / curl URL-Kodierung',
    codeBashDesc: 'Mit curl ist das <code>--data-urlencode</code>-Flag der einfachste Ansatz:',
    codePhpTitle: 'PHP URL-Kodierung/Dekodierung',
    codePhpDesc: 'PHP bietet <code>urlencode()</code> und <code>rawurlencode()</code>:',
    codeJavaTitle: 'Java URL-Kodierung/Dekodierung',
    codeJavaDesc: 'Javas <code>URLEncoder</code> und <code>URLDecoder</code> behandeln URL-Kodierung:',
    h2_mistakes: 'Haufige URL-Kodierungsfehler',
    mistakesDesc: 'Die haufigsten Fallstricke:',
    mistake1: '<strong>Doppelte Kodierung</strong>: Eine bereits kodierte Zeichenkette erneut kodieren. <code>%20</code> wird zu <code>%2520</code>.',
    mistake2: '<strong>Gesamte URL kodieren</strong>: <code>encodeURIComponent()</code> auf eine vollstandige URL anzuwenden zerstort die Struktur.',
    mistake3: '<strong>UTF-8 vergessen</strong>: Immer UTF-8 fur URL-Kodierung verwenden.',
    mistake4: '<strong>Pfadsegmente nicht kodieren</strong>: Pfade mit Leerzeichen mussen ebenfalls kodiert werden.',
    mistake5: '<strong>Falsche Behandlung von +</strong>: <code>+</code> bedeutet Leerzeichen in Formularen, ist aber ein Literal in URLs.',
    h2_apis: 'URL-Kodierung in APIs',
    apisDesc: 'Korrektes URL-Kodieren ist fur APIs entscheidend:',
    apisQuery: '<strong>Query-Parameter</strong>: Jeder Parametername und -wert muss einzeln kodiert werden.',
    apisPath: '<strong>Pfad-Parameter</strong>: In URL-Pfaden eingebettete Werte mussen ebenfalls kodiert werden.',
    apisForm: '<strong>Formulardaten</strong>: <code>application/x-www-form-urlencoded</code> verwendet <code>+</code> fur Leerzeichen.',
    apisJson: '<strong>JSON-Payloads</strong>: JSON im Request-Body muss nicht URL-kodiert werden.',
    h2_faq: 'Haufig gestellte Fragen',
    faq1_q: 'Was ist URL-Kodierung und warum wird sie benotigt?',
    faq1_a: 'URL-Kodierung ersetzt unsichere Zeichen durch Prozent-Hexadezimal-Sequenzen fur sichere Ubertragung in URLs. Sonderzeichen wie &, =, ? und # haben strukturelle Bedeutungen und mussen als Daten kodiert werden.',
    faq2_q: 'Was ist der Unterschied zwischen encodeURI und encodeURIComponent?',
    faq2_a: 'encodeURI() bewahrt strukturelle URL-Zeichen (:, /, ?, #). encodeURIComponent() kodiert alles ausser nicht reservierte Zeichen. Verwenden Sie encodeURIComponent fur einzelne Parameterwerte.',
    faq3_q: 'Sollte man %20 oder + fur Leerzeichen verwenden?',
    faq3_a: 'Verwenden Sie %20 fur URLs (RFC 3986). Verwenden Sie + nur fur application/x-www-form-urlencoded. Im Zweifelsfall ist %20 die sicherere Wahl.',
    conclusion: 'URL-Kodierung ist eine grundlegende Fahigkeit der Webentwicklung. Nutzen Sie unser kostenloses Tool fur sofortiges Kodieren und Dekodieren.',
    linkToolBottom: 'URLs sofort kodieren und dekodieren mit unserem kostenlosen Online-Tool.',
  },
  es: {
    intro: '<strong>La codificacion URL</strong> (tambien conocida como <strong>codificacion porcentual</strong>) es uno de los mecanismos mas esenciales del desarrollo web. Cada vez que envias un formulario, haces clic en un enlace con parametros o llamas a una API REST, se realizan operaciones de codificacion y decodificacion URL. Esta guia completa cubre desde la especificacion RFC 3986 hasta ejemplos de codigo practicos en JavaScript, Python, Bash, PHP y Java.',
    linkTool: 'Prueba nuestra herramienta gratuita de codificacion/decodificacion URL en linea.',
    h2_what: 'Que es la codificacion URL (codificacion porcentual)?',
    whatDesc1: '<strong>La codificacion URL</strong>, definida en RFC 3986, reemplaza caracteres inseguros con un signo de porcentaje (<code>%</code>) seguido de dos digitos hexadecimales. Por ejemplo, un espacio se convierte en <code>%20</code>.',
    whatDesc2: 'Las URLs solo pueden contener un conjunto limitado de caracteres ASCII. Los <strong>caracteres seguros</strong> son: letras, digitos y cuatro caracteres especiales: <code>-</code>, <code>_</code>, <code>.</code>, <code>~</code>. Todos los demas deben codificarse.',
    whatDesc3: 'Caracteres como <code>&amp;</code>, <code>=</code>, <code>?</code> y <code>#</code> tienen significados estructurales en URLs. Sin codificacion URL, las URLs se romperian o serian malinterpretadas.',
    h2_howWorks: 'Como funciona la codificacion URL',
    howWorksDesc: 'El proceso de codificacion URL sigue un algoritmo simple:',
    howWorksSteps: '<ol><li><strong>Convertir el caracter a bytes UTF-8</strong>.</li><li><strong>Para cada byte</strong>, escribir <code>%</code> seguido del valor hexadecimal.</li><li><strong>Caracteres no reservados</strong> permanecen sin cambios.</li><li><strong>Caracteres reservados</strong> solo se codifican cuando serian malinterpretados.</li></ol>',
    howWorksExample: '<strong>Ejemplo</strong>: <code>Hello World!</code> se convierte en <code>Hello%20World%21</code>.',
    howWorksUtf8: '<strong>Ejemplo multi-byte UTF-8</strong>: Los caracteres no ASCII producen multiples bytes codificados.',
    h2_table: 'Tabla de referencia de codificacion URL',
    tableDesc: 'Tabla de referencia de caracteres comunmente codificados:',
    h2_space: 'Codificacion de espacios: %20 vs +',
    spaceDesc1: 'Hay dos formas de codificar espacios en URLs:',
    spaceDesc2: '<strong><code>%20</code></strong>: Codificacion estandar RFC 3986 para URIs.',
    spaceDesc3: '<strong><code>+</code></strong>: Usado por <code>application/x-www-form-urlencoded</code> (formularios HTML).',
    spaceDesc4: '<strong>Cual usar?</strong> Usa <code>%20</code> para construir URLs programaticamente. <code>+</code> se usa automaticamente para formularios.',
    h2_codeExamples: 'Ejemplos de codigo de codificacion/decodificacion URL',
    codeJsTitle: 'JavaScript codificacion/decodificacion URL',
    codeJsDesc: 'JavaScript ofrece <code>encodeURIComponent</code> y <code>encodeURI</code>. Es esencial entender cuando usar cada uno:',
    codePyTitle: 'Python codificacion/decodificacion URL',
    codePyDesc: 'El modulo <code>urllib.parse</code> de Python proporciona funciones completas de codificacion URL:',
    codeBashTitle: 'Bash / curl codificacion URL',
    codeBashDesc: 'Con curl, el flag <code>--data-urlencode</code> es el enfoque mas simple:',
    codePhpTitle: 'PHP codificacion/decodificacion URL',
    codePhpDesc: 'PHP proporciona <code>urlencode()</code> y <code>rawurlencode()</code>:',
    codeJavaTitle: 'Java codificacion/decodificacion URL',
    codeJavaDesc: 'Las clases <code>URLEncoder</code> y <code>URLDecoder</code> de Java manejan la codificacion URL:',
    h2_mistakes: 'Errores comunes de codificacion URL',
    mistakesDesc: 'Las trampas mas comunes a evitar:',
    mistake1: '<strong>Doble codificacion</strong>: Codificar una cadena ya codificada. <code>%20</code> se convierte en <code>%2520</code>.',
    mistake2: '<strong>Codificar la URL completa</strong>: Usar <code>encodeURIComponent()</code> en una URL completa rompe su estructura.',
    mistake3: '<strong>Olvidar UTF-8</strong>: Siempre usa UTF-8 para codificacion URL.',
    mistake4: '<strong>No codificar segmentos de ruta</strong>: Las rutas con espacios tambien deben codificarse.',
    mistake5: '<strong>Mal manejo del signo +</strong>: <code>+</code> significa espacio en formularios, pero es literal en URLs.',
    h2_apis: 'Codificacion URL en APIs',
    apisDesc: 'La codificacion URL correcta es crucial para las APIs:',
    apisQuery: '<strong>Parametros de consulta</strong>: Cada nombre y valor debe codificarse individualmente.',
    apisPath: '<strong>Parametros de ruta</strong>: Los valores en rutas de URL tambien deben codificarse.',
    apisForm: '<strong>Datos de formulario</strong>: <code>application/x-www-form-urlencoded</code> usa <code>+</code> para espacios.',
    apisJson: '<strong>Cargas JSON</strong>: El contenido JSON en el cuerpo de la solicitud no necesita codificacion URL.',
    h2_faq: 'Preguntas frecuentes',
    faq1_q: 'Que es la codificacion URL y por que se necesita?',
    faq1_a: 'La codificacion URL reemplaza caracteres inseguros con secuencias porcentaje-hexadecimal para transmision segura en URLs. Caracteres como &, =, ? y # tienen significados estructurales y deben codificarse como datos.',
    faq2_q: 'Cual es la diferencia entre encodeURI y encodeURIComponent?',
    faq2_a: 'encodeURI() preserva caracteres estructurales (:, /, ?, #). encodeURIComponent() codifica todo excepto caracteres no reservados. Usa encodeURIComponent para valores de parametros individuales.',
    faq3_q: 'Debo usar %20 o + para espacios?',
    faq3_a: 'Usa %20 para URLs (RFC 3986). Usa + solo para application/x-www-form-urlencoded. En caso de duda, %20 es la opcion mas segura.',
    conclusion: 'La codificacion URL es una habilidad fundamental del desarrollo web. Usa nuestra herramienta gratuita para codificar y decodificar al instante.',
    linkToolBottom: 'Codifica y decodifica URLs al instante con nuestra herramienta gratuita en linea.',
  },
  ja: {
    intro: '<strong>URLエンコーディング</strong>（<strong>パーセントエンコーディング</strong>とも呼ばれる）は、Web開発における最も基本的なメカニズムの一つです。フォームの送信、クエリパラメータ付きリンクのクリック、REST APIの呼び出しのたびに、URLエンコードとURLデコード操作が行われています。この包括的なガイドでは、RFC 3986仕様からJavaScript、Python、Bash、PHP、Javaの実践的なコード例まで、すべてをカバーします。',
    linkTool: '無料オンラインURLエンコード/デコードツールをお試しください。',
    h2_what: 'URLエンコーディング（パーセントエンコーディング）とは？',
    whatDesc1: '<strong>URLエンコーディング</strong>はRFC 3986で定義されており、安全でない文字をパーセント記号（<code>%</code>）と2桁の16進数に置き換えます。例えば、スペースは<code>%20</code>になります。',
    whatDesc2: 'URLには限られたASCII文字セットしか含められません。エンコード不要な<strong>URL安全文字</strong>は：英字、数字、4つの特殊文字<code>-</code>、<code>_</code>、<code>.</code>、<code>~</code>です。その他すべての文字はエンコードが必要です。',
    whatDesc3: '<code>&amp;</code>、<code>=</code>、<code>?</code>、<code>#</code>などの文字はURLで構造的な意味を持ちます。適切なURLエンコードがなければ、URLは破損したり誤って解釈されたりします。',
    h2_howWorks: 'URLエンコーディングの仕組み',
    howWorksDesc: 'URLエンコードプロセスはシンプルなアルゴリズムに従います：',
    howWorksSteps: '<ol><li><strong>文字をUTF-8バイトに変換</strong>。</li><li><strong>各バイトに対して</strong>、<code>%</code>の後に16進数値を記述。</li><li><strong>非予約文字</strong>はそのまま。</li><li><strong>予約文字</strong>は曖昧な場合のみエンコード。</li></ol>',
    howWorksExample: '<strong>例</strong>：<code>Hello World!</code>は<code>Hello%20World%21</code>になります。',
    howWorksUtf8: '<strong>UTF-8マルチバイト例</strong>：非ASCII文字は複数のパーセントエンコードされたバイトを生成します。',
    h2_table: 'URLエンコーディング参照テーブル',
    tableDesc: 'よくエンコードされる文字の参照テーブル：',
    h2_space: 'スペースのエンコーディング：%20 vs +',
    spaceDesc1: 'URLでスペースをエンコードする方法は2つあります：',
    spaceDesc2: '<strong><code>%20</code></strong>：URIのRFC 3986標準エンコーディング。',
    spaceDesc3: '<strong><code>+</code></strong>：<code>application/x-www-form-urlencoded</code>（HTMLフォーム）で使用。',
    spaceDesc4: '<strong>どちらを使う？</strong>プログラムでURLを構築する場合は<code>%20</code>を使用。<code>+</code>はフォームデータで自動的に使用されます。',
    h2_codeExamples: 'URLエンコード/デコードのコード例',
    codeJsTitle: 'JavaScript URLエンコード/デコード',
    codeJsDesc: 'JavaScriptは<code>encodeURIComponent</code>と<code>encodeURI</code>を提供しています。それぞれの使い分けの理解が重要です：',
    codePyTitle: 'Python URLエンコード/デコード',
    codePyDesc: 'Pythonの<code>urllib.parse</code>モジュールは包括的なURLエンコード関数を提供します：',
    codeBashTitle: 'Bash / curl URLエンコード',
    codeBashDesc: 'curlの<code>--data-urlencode</code>フラグが最も簡単な方法です：',
    codePhpTitle: 'PHP URLエンコード/デコード',
    codePhpDesc: 'PHPは<code>urlencode()</code>と<code>rawurlencode()</code>を提供しています：',
    codeJavaTitle: 'Java URLエンコード/デコード',
    codeJavaDesc: 'Javaの<code>URLEncoder</code>と<code>URLDecoder</code>クラスがURLエンコードを処理します：',
    h2_mistakes: '一般的なURLエンコーディングの間違い',
    mistakesDesc: '避けるべき最も一般的な落とし穴：',
    mistake1: '<strong>二重エンコーディング</strong>：既にエンコードされた文字列を再度エンコード。<code>%20</code>が<code>%2520</code>になります。',
    mistake2: '<strong>URL全体をエンコード</strong>：完全なURLに<code>encodeURIComponent()</code>を使用するとURL構造が壊れます。',
    mistake3: '<strong>UTF-8の忘れ</strong>：URLエンコーディングには常にUTF-8を使用してください。',
    mistake4: '<strong>パスセグメントのエンコード漏れ</strong>：スペースを含むパスもエンコードが必要です。',
    mistake5: '<strong>+記号の誤処理</strong>：<code>+</code>はフォームではスペースを意味しますが、通常のURLではリテラルです。',
    h2_apis: 'APIでのURLエンコーディング',
    apisDesc: 'APIでの正しいURLエンコーディングは重要です：',
    apisQuery: '<strong>クエリパラメータ</strong>：各パラメータ名と値を個別にエンコードする必要があります。',
    apisPath: '<strong>パスパラメータ</strong>：URLパスに埋め込まれた値もエンコードが必要です。',
    apisForm: '<strong>フォームデータ</strong>：<code>application/x-www-form-urlencoded</code>はスペースに<code>+</code>を使用します。',
    apisJson: '<strong>JSONペイロード</strong>：リクエストボディのJSONコンテンツはURLエンコード不要です。',
    h2_faq: 'よくある質問',
    faq1_q: 'URLエンコーディングとは何ですか？なぜ必要ですか？',
    faq1_a: 'URLエンコーディングは、安全でない文字をパーセント-16進数シーケンスに置き換えてURLで安全に送信するためのプロセスです。&、=、?、#などの特殊文字は構造的な意味を持ち、データとして使用する場合はエンコードが必要です。',
    faq2_q: 'encodeURIとencodeURIComponentの違いは？',
    faq2_a: 'encodeURI()はURL構造文字(:、/、?、#)を保持します。encodeURIComponent()は非予約文字以外のすべてをエンコードします。個別のパラメータ値にはencodeURIComponentを使用してください。',
    faq3_q: 'スペースには%20と+のどちらを使うべき？',
    faq3_a: 'URL（RFC 3986）には%20を使用。application/x-www-form-urlencodedにのみ+を使用。迷った場合は%20がより安全な選択です。',
    conclusion: 'URLエンコーディングはすべての開発者が日常的に遭遇する基本的なWebスキルです。無料オンラインツールで即座にエンコードとデコードを行えます。',
    linkToolBottom: '無料オンラインツールでURLを即座にエンコード・デコード。',
  },
  ko: {
    intro: '<strong>URL 인코딩</strong>(<strong>퍼센트 인코딩</strong>이라고도 함)은 웹 개발에서 가장 필수적인 메커니즘 중 하나입니다. 폼을 제출하거나, 쿼리 매개변수가 있는 링크를 클릭하거나, REST API를 호출할 때마다 URL 인코딩/디코딩 작업이 수행됩니다. 이 종합 가이드는 RFC 3986 사양부터 JavaScript, Python, Bash, PHP, Java의 실용적인 코드 예제까지 모든 것을 다룹니다.',
    linkTool: '무료 온라인 URL 인코딩/디코딩 도구를 사용해 보세요.',
    h2_what: 'URL 인코딩(퍼센트 인코딩)이란?',
    whatDesc1: '<strong>URL 인코딩</strong>은 RFC 3986에 정의되어 있으며, 안전하지 않은 문자를 퍼센트 기호(<code>%</code>)와 2자리 16진수로 대체합니다. 예를 들어, 공백은 <code>%20</code>이 됩니다.',
    whatDesc2: 'URL에는 제한된 ASCII 문자 세트만 포함될 수 있습니다. 인코딩이 필요 없는 <strong>URL 안전 문자</strong>는: 영문자, 숫자, 4개의 특수 문자 <code>-</code>, <code>_</code>, <code>.</code>, <code>~</code>입니다. 다른 모든 문자는 인코딩이 필요합니다.',
    whatDesc3: '<code>&amp;</code>, <code>=</code>, <code>?</code>, <code>#</code> 같은 문자는 URL에서 구조적 의미를 가집니다. 적절한 URL 인코딩 없이는 URL이 손상되거나 잘못 해석됩니다.',
    h2_howWorks: 'URL 인코딩 작동 원리',
    howWorksDesc: 'URL 인코딩 프로세스는 간단한 알고리즘을 따릅니다:',
    howWorksSteps: '<ol><li><strong>문자를 UTF-8 바이트로 변환</strong>.</li><li><strong>각 바이트에 대해</strong> <code>%</code> 뒤에 16진수 값을 기록.</li><li><strong>비예약 문자</strong>는 그대로 유지.</li><li><strong>예약 문자</strong>는 모호한 경우에만 인코딩.</li></ol>',
    howWorksExample: '<strong>예제</strong>: <code>Hello World!</code>는 <code>Hello%20World%21</code>이 됩니다.',
    howWorksUtf8: '<strong>UTF-8 멀티바이트 예제</strong>: 비 ASCII 문자는 여러 퍼센트 인코딩된 바이트를 생성합니다.',
    h2_table: 'URL 인코딩 참조 테이블',
    tableDesc: '자주 인코딩되는 문자의 참조 테이블:',
    h2_space: '공백 인코딩: %20 vs +',
    spaceDesc1: 'URL에서 공백을 인코딩하는 두 가지 방법이 있습니다:',
    spaceDesc2: '<strong><code>%20</code></strong>: URI의 RFC 3986 표준 인코딩.',
    spaceDesc3: '<strong><code>+</code></strong>: <code>application/x-www-form-urlencoded</code>(HTML 폼)에서 사용.',
    spaceDesc4: '<strong>어떤 것을 사용할까?</strong> 프로그래밍으로 URL을 구성할 때는 <code>%20</code>을 사용하세요. <code>+</code>는 폼 데이터에서 자동으로 사용됩니다.',
    h2_codeExamples: 'URL 인코딩/디코딩 코드 예제',
    codeJsTitle: 'JavaScript URL 인코딩/디코딩',
    codeJsDesc: 'JavaScript는 <code>encodeURIComponent</code>와 <code>encodeURI</code>를 제공합니다. 각각의 사용 시점을 이해하는 것이 중요합니다:',
    codePyTitle: 'Python URL 인코딩/디코딩',
    codePyDesc: 'Python의 <code>urllib.parse</code> 모듈은 포괄적인 URL 인코딩 함수를 제공합니다:',
    codeBashTitle: 'Bash / curl URL 인코딩',
    codeBashDesc: 'curl의 <code>--data-urlencode</code> 플래그가 가장 간단한 방법입니다:',
    codePhpTitle: 'PHP URL 인코딩/디코딩',
    codePhpDesc: 'PHP는 <code>urlencode()</code>와 <code>rawurlencode()</code>를 제공합니다:',
    codeJavaTitle: 'Java URL 인코딩/디코딩',
    codeJavaDesc: 'Java의 <code>URLEncoder</code>와 <code>URLDecoder</code> 클래스가 URL 인코딩을 처리합니다:',
    h2_mistakes: '일반적인 URL 인코딩 실수',
    mistakesDesc: '피해야 할 가장 흔한 함정들:',
    mistake1: '<strong>이중 인코딩</strong>: 이미 인코딩된 문자열을 다시 인코딩. <code>%20</code>이 <code>%2520</code>이 됩니다.',
    mistake2: '<strong>전체 URL 인코딩</strong>: 전체 URL에 <code>encodeURIComponent()</code>를 사용하면 URL 구조가 깨집니다.',
    mistake3: '<strong>UTF-8 누락</strong>: URL 인코딩에는 항상 UTF-8을 사용하세요.',
    mistake4: '<strong>경로 세그먼트 인코딩 누락</strong>: 공백이 포함된 경로도 인코딩이 필요합니다.',
    mistake5: '<strong>+ 기호 잘못 처리</strong>: <code>+</code>는 폼에서 공백을 의미하지만 일반 URL에서는 리터럴입니다.',
    h2_apis: 'API에서의 URL 인코딩',
    apisDesc: 'API에서 올바른 URL 인코딩은 중요합니다:',
    apisQuery: '<strong>쿼리 매개변수</strong>: 각 매개변수 이름과 값을 개별적으로 인코딩해야 합니다.',
    apisPath: '<strong>경로 매개변수</strong>: URL 경로에 포함된 값도 인코딩이 필요합니다.',
    apisForm: '<strong>폼 데이터</strong>: <code>application/x-www-form-urlencoded</code>는 공백에 <code>+</code>를 사용합니다.',
    apisJson: '<strong>JSON 페이로드</strong>: 요청 본문의 JSON 콘텐츠는 URL 인코딩이 필요 없습니다.',
    h2_faq: '자주 묻는 질문',
    faq1_q: 'URL 인코딩이란 무엇이며 왜 필요한가요?',
    faq1_a: 'URL 인코딩은 안전하지 않은 문자를 퍼센트-16진수 시퀀스로 대체하여 URL에서 안전하게 전송하기 위한 프로세스입니다. &, =, ?, # 같은 특수 문자는 구조적 의미를 가지며 데이터로 사용할 때 인코딩이 필요합니다.',
    faq2_q: 'encodeURI와 encodeURIComponent의 차이점은?',
    faq2_a: 'encodeURI()는 URL 구조 문자(:, /, ?, #)를 보존합니다. encodeURIComponent()는 비예약 문자를 제외한 모든 것을 인코딩합니다. 개별 매개변수 값에는 encodeURIComponent를 사용하세요.',
    faq3_q: '공백에 %20과 + 중 어떤 것을 사용해야 하나요?',
    faq3_a: 'URL(RFC 3986)에는 %20을 사용하세요. application/x-www-form-urlencoded에만 +를 사용하세요. 확실하지 않으면 %20이 더 안전한 선택입니다.',
    conclusion: 'URL 인코딩은 모든 개발자가 매일 접하는 기본적인 웹 개발 기술입니다. 무료 온라인 도구로 즉시 인코딩과 디코딩을 수행하세요.',
    linkToolBottom: '무료 온라인 도구로 URL을 즉시 인코딩하고 디코딩하세요.',
  },
};

export default function UrlEncodeDecodeCompleteGuide({ lang }: { lang: string }) {
  const s = t[lang] || t['en'];

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: s.faq1_q, acceptedAnswer: { '@type': 'Answer', text: s.faq1_a } },
      { '@type': 'Question', name: s.faq2_q, acceptedAnswer: { '@type': 'Answer', text: s.faq2_a } },
      { '@type': 'Question', name: s.faq3_q, acceptedAnswer: { '@type': 'Answer', text: s.faq3_a } },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <p dangerouslySetInnerHTML={{ __html: s.intro }} />
      <p><Link href={`/${lang}/tools/url-encoder`} style={{ fontWeight: 600 }}>{s.linkTool}</Link></p>

      {/* Section 1: What is URL Encoding? */}
      <h2>{s.h2_what}</h2>
      <p dangerouslySetInnerHTML={{ __html: s.whatDesc1 }} />
      <p dangerouslySetInnerHTML={{ __html: s.whatDesc2 }} />
      <p dangerouslySetInnerHTML={{ __html: s.whatDesc3 }} />

      {/* Section 2: How URL Encoding Works */}
      <h2>{s.h2_howWorks}</h2>
      <p dangerouslySetInnerHTML={{ __html: s.howWorksDesc }} />
      <div dangerouslySetInnerHTML={{ __html: s.howWorksSteps }} />
      <p dangerouslySetInnerHTML={{ __html: s.howWorksExample }} />
      <p dangerouslySetInnerHTML={{ __html: s.howWorksUtf8 }} />

      {/* Section 3: URL Encoding Reference Table */}
      <h2>{s.h2_table}</h2>
      <p>{s.tableDesc}</p>
      <table>
        <thead>
          <tr>
            <th>Character</th><th>Encoded</th><th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr><td><code>(space)</code></td><td><code>%20</code></td><td>Space</td></tr>
          <tr><td><code>!</code></td><td><code>%21</code></td><td>Exclamation mark</td></tr>
          <tr><td><code>#</code></td><td><code>%23</code></td><td>Hash / Fragment</td></tr>
          <tr><td><code>$</code></td><td><code>%24</code></td><td>Dollar sign</td></tr>
          <tr><td><code>%</code></td><td><code>%25</code></td><td>Percent sign</td></tr>
          <tr><td><code>&amp;</code></td><td><code>%26</code></td><td>Ampersand</td></tr>
          <tr><td><code>&apos;</code></td><td><code>%27</code></td><td>Apostrophe</td></tr>
          <tr><td><code>(</code></td><td><code>%28</code></td><td>Left parenthesis</td></tr>
          <tr><td><code>)</code></td><td><code>%29</code></td><td>Right parenthesis</td></tr>
          <tr><td><code>*</code></td><td><code>%2A</code></td><td>Asterisk</td></tr>
          <tr><td><code>+</code></td><td><code>%2B</code></td><td>Plus sign</td></tr>
          <tr><td><code>,</code></td><td><code>%2C</code></td><td>Comma</td></tr>
          <tr><td><code>/</code></td><td><code>%2F</code></td><td>Forward slash</td></tr>
          <tr><td><code>:</code></td><td><code>%3A</code></td><td>Colon</td></tr>
          <tr><td><code>;</code></td><td><code>%3B</code></td><td>Semicolon</td></tr>
          <tr><td><code>=</code></td><td><code>%3D</code></td><td>Equals sign</td></tr>
          <tr><td><code>?</code></td><td><code>%3F</code></td><td>Question mark</td></tr>
          <tr><td><code>@</code></td><td><code>%40</code></td><td>At sign</td></tr>
          <tr><td><code>[</code></td><td><code>%5B</code></td><td>Left bracket</td></tr>
          <tr><td><code>]</code></td><td><code>%5D</code></td><td>Right bracket</td></tr>
          <tr><td><code>{`{`}</code></td><td><code>%7B</code></td><td>Left brace</td></tr>
          <tr><td><code>{`}`}</code></td><td><code>%7D</code></td><td>Right brace</td></tr>
          <tr><td><code>|</code></td><td><code>%7C</code></td><td>Pipe</td></tr>
          <tr><td><code>&lt;</code></td><td><code>%3C</code></td><td>Less than</td></tr>
          <tr><td><code>&gt;</code></td><td><code>%3E</code></td><td>Greater than</td></tr>
          <tr><td><code>&quot;</code></td><td><code>%22</code></td><td>Double quote</td></tr>
        </tbody>
      </table>

      {/* Section 4: Space Encoding %20 vs + */}
      <h2>{s.h2_space}</h2>
      <p dangerouslySetInnerHTML={{ __html: s.spaceDesc1 }} />
      <p dangerouslySetInnerHTML={{ __html: s.spaceDesc2 }} />
      <p dangerouslySetInnerHTML={{ __html: s.spaceDesc3 }} />
      <p dangerouslySetInnerHTML={{ __html: s.spaceDesc4 }} />
      <pre><code>{`// Space encoding comparison

// RFC 3986 (URI standard) — space = %20
"hello world"  →  "hello%20world"
// Used in: URL paths, API endpoints, general URIs

// application/x-www-form-urlencoded — space = +
"hello world"  →  "hello+world"
// Used in: HTML form submissions, URLSearchParams

// JavaScript comparison:
encodeURIComponent("hello world")  // "hello%20world"  (%20)
new URLSearchParams({q: "hello world"}).toString()  // "q=hello+world"  (+)

// Python comparison:
urllib.parse.quote("hello world")      # "hello%20world"  (%20)
urllib.parse.urlencode({"q": "hello world"})  # "q=hello+world"  (+)

// PHP comparison:
rawurlencode("hello world")  // "hello%20world"  (%20)
urlencode("hello world")     // "hello+world"    (+)`}</code></pre>

      {/* Section 5: Code Examples */}
      <h2>{s.h2_codeExamples}</h2>

      <h3>{s.codeJsTitle}</h3>
      <p dangerouslySetInnerHTML={{ __html: s.codeJsDesc }} />
      <pre><code>{`// ===== encodeURIComponent vs encodeURI =====

// encodeURIComponent — encodes EVERYTHING except: A-Z a-z 0-9 - _ . ~
// Use for: individual query parameter values, path segments
encodeURIComponent("hello world & goodbye");
// "hello%20world%20%26%20goodbye"

encodeURIComponent("price=100&category=books");
// "price%3D100%26category%3Dbooks"

// encodeURI — preserves URL structure characters: : / ? # & = @ + $
// Use for: encoding a complete URL
encodeURI("https://example.com/search?q=hello world&lang=en");
// "https://example.com/search?q=hello%20world&lang=en"

// WARNING: Do NOT use encodeURIComponent on full URLs!
encodeURIComponent("https://example.com/path");
// "https%3A%2F%2Fexample.com%2Fpath"  ← BROKEN URL!

// ===== Decoding =====
decodeURIComponent("hello%20world%20%26%20goodbye");
// "hello world & goodbye"

decodeURI("https://example.com/search?q=hello%20world");
// "https://example.com/search?q=hello world"

// ===== URLSearchParams (handles form encoding automatically) =====
const params = new URLSearchParams({
  query: "cats & dogs",
  page: "1",
  filter: "price > 50"
});
params.toString();
// "query=cats+%26+dogs&page=1&filter=price+%3E+50"
// Note: spaces become + (form encoding), & in values becomes %26

// Parse query string
const parsed = new URLSearchParams("?q=hello+world&lang=en");
parsed.get("q");  // "hello world" (+ decoded to space)
parsed.get("lang");  // "en"

// ===== Building URLs with the URL API =====
const url = new URL("https://api.example.com/search");
url.searchParams.set("q", "hello world & more");
url.searchParams.set("limit", "10");
url.toString();
// "https://api.example.com/search?q=hello+world+%26+more&limit=10"`}</code></pre>

      <h3>{s.codePyTitle}</h3>
      <p dangerouslySetInnerHTML={{ __html: s.codePyDesc }} />
      <pre><code>{`import urllib.parse

# ===== quote / unquote (RFC 3986 percent-encoding) =====

# Encode a string (spaces become %20)
urllib.parse.quote("hello world & goodbye")
# "hello%20world%20%26%20goodbye"

# By default, / is NOT encoded (safe="/")
urllib.parse.quote("/path/to/file name.txt")
# "/path/to/file%20name.txt"

# Encode everything including /
urllib.parse.quote("/path/to/file", safe="")
# "%2Fpath%2Fto%2Ffile"

# Decode
urllib.parse.unquote("hello%20world%20%26%20goodbye")
# "hello world & goodbye"

# ===== urlencode (for query strings, uses + for spaces) =====
params = {"q": "cats & dogs", "page": 1, "filter": "price > 50"}
urllib.parse.urlencode(params)
# "q=cats+%26+dogs&page=1&filter=price+%3E+50"

# ===== quote_plus (form encoding, spaces become +) =====
urllib.parse.quote_plus("hello world")
# "hello+world"

urllib.parse.unquote_plus("hello+world")
# "hello world"

# ===== With the requests library =====
import requests

# requests handles URL encoding automatically
response = requests.get(
    "https://api.example.com/search",
    params={"q": "hello world", "lang": "en"}
)
# Actual URL: https://api.example.com/search?q=hello+world&lang=en

# For path segments, encode manually
username = "john@example.com"
url = f"https://api.example.com/users/{urllib.parse.quote(username, safe='')}"
# "https://api.example.com/users/john%40example.com"`}</code></pre>

      <h3>{s.codeBashTitle}</h3>
      <p dangerouslySetInnerHTML={{ __html: s.codeBashDesc }} />
      <pre><code>{`# ===== curl --data-urlencode =====

# GET request with URL-encoded query parameter
curl -G "https://api.example.com/search" \\
  --data-urlencode "q=hello world & more" \\
  --data-urlencode "lang=en"
# Request URL: /search?q=hello%20world%20%26%20more&lang=en

# POST with form-encoded body
curl -X POST "https://api.example.com/submit" \\
  --data-urlencode "name=John Doe" \\
  --data-urlencode "message=Hello! How are you?"

# ===== Pure Bash URL encoding (using printf) =====
urlencode() {
  local string="\${1}"
  local strlen=\${#string}
  local encoded=""
  local pos c o
  for (( pos=0 ; pos<strlen ; pos++ )); do
    c=\${string:$pos:1}
    case "$c" in
      [-_.~a-zA-Z0-9]) o="\${c}" ;;
      *) printf -v o '%%%02X' "'$c" ;;
    esac
    encoded+="\${o}"
  done
  echo "\${encoded}"
}

urlencode "hello world & goodbye"
# "hello%20world%20%26%20goodbye"

# ===== Using Python one-liner in Bash =====
python3 -c "import urllib.parse; print(urllib.parse.quote('hello world'))"
# "hello%20world"

# ===== Decode URL-encoded strings =====
python3 -c "import urllib.parse; print(urllib.parse.unquote('hello%20world'))"
# "hello world"`}</code></pre>

      <h3>{s.codePhpTitle}</h3>
      <p dangerouslySetInnerHTML={{ __html: s.codePhpDesc }} />
      <pre><code>{`<?php
// ===== urlencode / urldecode =====
// Uses + for spaces (application/x-www-form-urlencoded)

echo urlencode("hello world & goodbye");
// "hello+world+%26+goodbye"

echo urldecode("hello+world+%26+goodbye");
// "hello world & goodbye"

// ===== rawurlencode / rawurldecode =====
// Uses %20 for spaces (RFC 3986)

echo rawurlencode("hello world & goodbye");
// "hello%20world%20%26%20goodbye"

echo rawurldecode("hello%20world%20%26%20goodbye");
// "hello world & goodbye"

// ===== When to use which? =====
// urlencode()    → for query string values (form-style)
// rawurlencode() → for URL path segments (RFC 3986)

// Building a URL with encoded path and query
$path = rawurlencode("my file.pdf");
$query = urlencode("search term & more");
$url = "https://example.com/files/{$path}?q={$query}";
// "https://example.com/files/my%20file.pdf?q=search+term+%26+more"

// ===== http_build_query (encode arrays as query strings) =====
$params = [
    "q" => "cats & dogs",
    "page" => 1,
    "tags" => ["php", "url encoding"]
];
echo http_build_query($params);
// "q=cats+%26+dogs&page=1&tags%5B0%5D=php&tags%5B1%5D=url+encoding"
?>`}</code></pre>

      <h3>{s.codeJavaTitle}</h3>
      <p dangerouslySetInnerHTML={{ __html: s.codeJavaDesc }} />
      <pre><code>{`import java.net.URLEncoder;
import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;

// ===== URLEncoder.encode (uses + for spaces) =====

// Always specify UTF-8 charset!
String encoded = URLEncoder.encode(
    "hello world & goodbye", StandardCharsets.UTF_8
);
// "hello+world+%26+goodbye"

// Decode
String decoded = URLDecoder.decode(
    "hello+world+%26+goodbye", StandardCharsets.UTF_8
);
// "hello world & goodbye"

// ===== Convert + to %20 for RFC 3986 compliance =====
String rfc3986 = URLEncoder.encode("hello world", StandardCharsets.UTF_8)
    .replace("+", "%20");
// "hello%20world"

// ===== Java 11+ URI encoding =====
import java.net.URI;

URI uri = URI.create("https://example.com/search");
// For building URLs with encoded parameters:
String query = "q=" + URLEncoder.encode("hello world", StandardCharsets.UTF_8);
URI fullUri = URI.create("https://example.com/search?" + query);
// https://example.com/search?q=hello+world

// ===== Encoding path segments =====
String pathSegment = URLEncoder.encode("my file.pdf", StandardCharsets.UTF_8)
    .replace("+", "%20");
String url = "https://example.com/files/" + pathSegment;
// "https://example.com/files/my%20file.pdf"`}</code></pre>

      {/* Section 6: Common Mistakes */}
      <h2>{s.h2_mistakes}</h2>
      <p dangerouslySetInnerHTML={{ __html: s.mistakesDesc }} />
      <p dangerouslySetInnerHTML={{ __html: s.mistake1 }} />
      <pre><code>{`// Double encoding example — a common bug!

const value = "hello world";

// Correct: encode once
const correct = encodeURIComponent(value);
// "hello%20world" ✓

// Bug: encode twice
const doubleEncoded = encodeURIComponent(encodeURIComponent(value));
// "hello%2520world" ✗  (%25 is the encoded form of %)

// How to detect double encoding:
// If you see %25 in your URLs, you likely have a double encoding issue
// %2520 = double-encoded space (%25 = %, 20 = space)
// %253A = double-encoded colon (%25 = %, 3A = :)`}</code></pre>
      <p dangerouslySetInnerHTML={{ __html: s.mistake2 }} />
      <pre><code>{`// Encoding the entire URL — WRONG!
const url = "https://example.com/path?q=hello world";

// WRONG: breaks URL structure
encodeURIComponent(url);
// "https%3A%2F%2Fexample.com%2Fpath%3Fq%3Dhello%20world"

// CORRECT option 1: use encodeURI for full URLs
encodeURI(url);
// "https://example.com/path?q=hello%20world"

// CORRECT option 2: encode only the value
const base = "https://example.com/path";
const query = encodeURIComponent("hello world");
const fullUrl = base + "?q=" + query;
// "https://example.com/path?q=hello%20world"`}</code></pre>
      <p dangerouslySetInnerHTML={{ __html: s.mistake3 }} />
      <p dangerouslySetInnerHTML={{ __html: s.mistake4 }} />
      <p dangerouslySetInnerHTML={{ __html: s.mistake5 }} />

      {/* Section 7: URL Encoding in APIs */}
      <h2>{s.h2_apis}</h2>
      <p dangerouslySetInnerHTML={{ __html: s.apisDesc }} />
      <p dangerouslySetInnerHTML={{ __html: s.apisQuery }} />
      <p dangerouslySetInnerHTML={{ __html: s.apisPath }} />
      <p dangerouslySetInnerHTML={{ __html: s.apisForm }} />
      <p dangerouslySetInnerHTML={{ __html: s.apisJson }} />
      <pre><code>{`// API URL encoding examples

// Query parameters — encode each value individually
const searchTerm = 'price > 100 & category = "electronics"';
const apiUrl = \`https://api.example.com/search?q=\${encodeURIComponent(searchTerm)}&limit=10\`;
// "https://api.example.com/search?q=price%20%3E%20100%20%26%20...&limit=10"

// Path parameters — encode values embedded in paths
const username = "john@example.com";
const profileUrl = \`https://api.example.com/users/\${encodeURIComponent(username)}/profile\`;
// "https://api.example.com/users/john%40example.com/profile"

// Form data (POST) — uses + for spaces
const formBody = new URLSearchParams({
  username: "john doe",
  password: "p@ss w0rd!"
}).toString();
// "username=john+doe&password=p%40ss+w0rd%21"

// JSON as query parameter — encode the entire JSON string
const filters = JSON.stringify({ price: { min: 10, max: 100 } });
const url = \`/api/products?filters=\${encodeURIComponent(filters)}\`;
// "/api/products?filters=%7B%22price%22%3A%7B%22min%22%3A10%2C%22max%22%3A100%7D%7D"`}</code></pre>

      {/* Section 8: FAQ */}
      <h2>{s.h2_faq}</h2>
      <h3>{s.faq1_q}</h3>
      <p dangerouslySetInnerHTML={{ __html: s.faq1_a }} />
      <h3>{s.faq2_q}</h3>
      <p dangerouslySetInnerHTML={{ __html: s.faq2_a }} />
      <h3>{s.faq3_q}</h3>
      <p dangerouslySetInnerHTML={{ __html: s.faq3_a }} />

      <p style={{ marginTop: 32 }} dangerouslySetInnerHTML={{ __html: s.conclusion }} />
      <p><Link href={`/${lang}/tools/url-encoder`} style={{ fontWeight: 600 }}>{s.linkToolBottom}</Link></p>
    </>
  );
}
