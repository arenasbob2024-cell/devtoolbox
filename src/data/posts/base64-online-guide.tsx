'use client';
import Link from 'next/link';

const t: Record<string, Record<string, string>> = {
  en: {
    tldr_title: 'TL;DR',
    tldr: 'Base64 is a binary-to-text encoding that represents binary data using 64 ASCII characters. It is used in data URIs, JWT tokens, email attachments (MIME), API authentication, and Kubernetes secrets. Base64 increases data size by ~33% and is NOT encryption. Use our free online tool to encode and decode Base64 instantly.',
    takeaways_title: 'Key Takeaways',
    takeaway1: 'Base64 converts 3 bytes of binary data into 4 ASCII characters, resulting in a ~33% size increase.',
    takeaway2: 'In JavaScript, use btoa()/atob() in browsers and Buffer in Node.js. For Unicode, encode to UTF-8 first.',
    takeaway3: 'Base64URL replaces + with - and / with _ for safe use in URLs, filenames, and JWT tokens.',
    takeaway4: 'Base64 is encoding, NOT encryption. Anyone can decode it without a key. Never use it for security.',
    takeaway5: 'For files larger than 5-10KB, prefer binary transfer methods (multipart/form-data) over Base64 embedding.',
    takeaway6: 'Common real-world uses: data URIs, JWT tokens, HTTP Basic Auth, MIME email, Kubernetes secrets, CSS embedding.',
    link_tool: 'Try our free Base64 Encoder/Decoder tool',

    h2_what: 'What Is Base64 Encoding and Why Does It Exist?',
    what_p1: 'Base64 is a binary-to-text encoding scheme defined in <strong>RFC 4648</strong>. It converts arbitrary binary data into a string of printable ASCII characters using a 64-character alphabet: <code>A-Z</code> (26), <code>a-z</code> (26), <code>0-9</code> (10), <code>+</code> (1), and <code>/</code> (1), plus <code>=</code> for padding.',
    what_p2: 'Base64 was created to solve a fundamental problem: many systems and protocols (email via SMTP, HTML, JSON, XML, HTTP headers) were designed to handle only text data. When you need to transmit binary data (images, files, certificates, encrypted blobs) through these text-only channels, you need a way to represent binary as text. That is exactly what Base64 does.',
    what_p3: 'The encoding process takes every 3 bytes (24 bits) of input and splits them into four 6-bit groups. Each 6-bit value (0-63) maps to one character in the Base64 alphabet. If the input length is not a multiple of 3, the output is padded with <code>=</code> characters to make its length a multiple of 4.',

    h2_js: 'Base64 Encoding and Decoding in JavaScript',
    js_p1: 'JavaScript provides built-in Base64 functions in both browser and Node.js environments. Here are the essential methods you need to know:',
    h3_js_browser: 'Browser: btoa() and atob()',
    js_browser_p: '<code>btoa()</code> encodes a string to Base64, and <code>atob()</code> decodes Base64 back to a string. These functions only handle ASCII (Latin-1) characters in the browser.',
    h3_js_unicode: 'Handling Unicode in the Browser',
    js_unicode_p: 'Since <code>btoa()</code> throws an error on non-ASCII characters, you need to encode Unicode text to UTF-8 first. Here are two approaches:',
    h3_js_node: 'Node.js: Buffer',
    js_node_p: 'In Node.js, the <code>Buffer</code> class handles Base64 encoding natively and supports any encoding including UTF-8:',
    h3_js_file: 'File to Base64 in the Browser (FileReader)',
    js_file_p: 'To convert a file (image, PDF, etc.) to Base64 in the browser, use the FileReader API:',

    h2_python: 'Base64 Encoding and Decoding in Python',
    python_p1: 'Python includes the <code>base64</code> module in its standard library. It supports standard Base64, URL-safe Base64, and several other encoding variants:',
    h3_python_basic: 'Basic Encode and Decode',
    h3_python_urlsafe: 'URL-Safe Base64',
    h3_python_file: 'Encoding Files',

    h2_cli: 'Base64 on the Command Line',
    cli_p1: 'Every major operating system provides built-in tools for Base64 encoding and decoding directly from the terminal:',
    h3_cli_linux: 'Linux (GNU coreutils)',
    cli_linux_p: 'The <code>base64</code> command is available on most Linux distributions. Use <code>-w 0</code> to disable line wrapping:',
    h3_cli_macos: 'macOS (BSD base64)',
    cli_macos_p: 'macOS uses the BSD version with slightly different flags. The decode flag is <code>-D</code> (uppercase) instead of <code>-d</code>:',
    h3_cli_openssl: 'OpenSSL (Cross-Platform)',
    cli_openssl_p: 'OpenSSL provides a consistent Base64 interface across Linux, macOS, and Windows (via Git Bash or WSL):',
    h3_cli_windows: 'Windows PowerShell',
    cli_windows_p: 'PowerShell uses .NET methods for Base64 operations:',

    h2_data_uri: 'Data URIs: Embedding Images as Base64',
    data_uri_p1: 'A Data URI lets you embed file data directly in HTML or CSS, eliminating the need for a separate HTTP request. The format is:',
    data_uri_p2: 'This technique is most useful for small assets (icons, tiny images, SVGs) under 5KB. For larger files, the 33% Base64 overhead and the inability to cache the embedded data separately make regular file URLs a better choice.',
    h3_data_uri_html: 'Inline Image in HTML',
    h3_data_uri_css: 'Background Image in CSS',
    h3_data_uri_svg: 'SVG Data URI (No Base64 Needed)',
    data_uri_svg_p: 'SVGs are already text, so you can use a URL-encoded data URI without Base64 encoding, which is smaller:',

    h2_api: 'Base64 in APIs and Authentication',
    api_p1: 'Base64 plays a critical role in several API patterns:',
    h3_api_basic: 'HTTP Basic Authentication',
    api_basic_p: 'HTTP Basic Auth encodes the username:password pair as a Base64 string in the <code>Authorization</code> header. This is NOT secure on its own\u2014always use HTTPS:',
    h3_api_upload: 'File Uploads via JSON',
    api_upload_p: 'When an API requires file uploads via JSON (rather than multipart/form-data), the file is typically Base64-encoded:',
    h3_api_jwt: 'JWT (JSON Web Tokens)',
    api_jwt_p: 'JWTs consist of three Base64URL-encoded segments separated by dots: <code>header.payload.signature</code>. The header and payload are JSON objects encoded with Base64URL (not standard Base64):',

    h2_urlsafe: 'Base64URL-Safe Encoding vs Standard Base64',
    urlsafe_p1: 'Standard Base64 uses <code>+</code> and <code>/</code> characters, which have special meaning in URLs (+ means space, / is a path separator). Base64URL (RFC 4648 Section 5) replaces these characters to be URL-safe:',
    urlsafe_p2: 'Base64URL is used in JWT tokens, URL query parameters, filenames, and anywhere Base64 data appears in URLs. Many languages provide built-in URL-safe Base64 functions:',

    h2_perf: 'Performance Considerations: The 33% Size Increase',
    perf_p1: 'Base64 encoding increases data size by approximately 33% because it represents every 3 bytes as 4 characters (4/3 = 1.333). This has real-world implications:',
    perf_li1: '<strong>Network bandwidth</strong>: A 1MB image becomes ~1.37MB when Base64-encoded. On mobile networks, this adds up quickly.',
    perf_li2: '<strong>Page weight</strong>: Base64 images embedded in HTML/CSS cannot be cached separately. Every page load re-downloads the encoded data.',
    perf_li3: '<strong>Memory usage</strong>: The browser must decode the Base64 string into binary, so both the encoded string and decoded binary exist in memory simultaneously.',
    perf_li4: '<strong>Compression penalty</strong>: Base64-encoded data compresses poorly because encoding destroys the patterns that gzip/brotli rely on. Always compress BEFORE encoding.',
    perf_li5: '<strong>CPU overhead</strong>: While encoding/decoding is fast for small data, processing millions of Base64 strings (e.g., in ETL pipelines) adds measurable latency.',
    perf_p2: '<strong>Rule of thumb</strong>: Use Base64 data URIs for images under 5KB. For anything larger, serve the file separately and let the browser cache it.',

    h2_security: 'Security Warning: Base64 Is NOT Encryption',
    security_p1: 'This is one of the most common misconceptions in software development: <strong>Base64 encoding provides zero security</strong>. It is a reversible encoding, not encryption. Anyone can decode a Base64 string instantly without any key or password.',
    security_p2: 'Never use Base64 to "protect" sensitive data like passwords, API keys, tokens, or personal information. If you see Base64 used in a security context (like Kubernetes secrets), it is for encoding purposes only, not protection.',
    security_p3: 'For actual security, use:',
    security_li1: '<strong>Encryption</strong>: AES-256-GCM, ChaCha20-Poly1305, or RSA for data protection',
    security_li2: '<strong>Hashing</strong>: bcrypt, Argon2, or scrypt for passwords (with salt)',
    security_li3: '<strong>HTTPS/TLS</strong>: For data in transit',
    security_li4: '<strong>Signed tokens</strong>: HMAC-SHA256 for data integrity verification',

    h2_usecases: 'Common Use Cases for Base64',
    h3_use_email: '1. Email Attachments (MIME)',
    use_email_p: 'The SMTP protocol was designed for 7-bit ASCII text. Binary files (images, PDFs, archives) must be Base64-encoded before being included in email bodies. The MIME standard (RFC 2045) specifies Base64 as a Content-Transfer-Encoding method. Every email attachment you send goes through this process.',
    h3_use_jwt: '2. JWT Tokens',
    use_jwt_p: 'JSON Web Tokens use Base64URL encoding for the header and payload segments. The three-part structure <code>header.payload.signature</code> encodes JSON data in a URL-safe format suitable for HTTP headers and query parameters.',
    h3_use_css: '3. CSS Data URIs',
    use_css_p: 'Small images, fonts, and icons can be embedded directly in CSS files as Base64 data URIs. This eliminates HTTP requests for critical above-the-fold assets, improving perceived load time:',
    h3_use_k8s: '4. Kubernetes Secrets',
    use_k8s_p: 'Kubernetes stores secret values as Base64-encoded strings in YAML manifests. This is for safe YAML serialization of binary data, NOT for security. Always enable encryption at rest for Kubernetes secrets in production:',
    h3_use_upload: '5. API File Uploads',
    use_upload_p: 'REST APIs that accept file uploads via JSON payloads use Base64 encoding to transmit binary file data within JSON strings. This is simpler than multipart uploads but adds 33% overhead.',
    h3_use_websocket: '6. WebSocket Binary Data',
    use_websocket_p: 'When transmitting binary data over WebSocket text frames, Base64 encoding ensures the data survives the text-based transport without corruption.',

    h2_faq: 'Frequently Asked Questions',
    faq1_q: 'What is Base64 encoding used for?',
    faq1_a: 'Base64 encoding converts binary data to text so it can be safely transmitted through text-only systems. Common uses include embedding images in HTML/CSS (data URIs), JWT tokens, HTTP Basic authentication, email attachments (MIME), Kubernetes secrets, and storing binary data in JSON payloads.',
    faq2_q: 'How do I encode a string to Base64 in JavaScript?',
    faq2_a: 'In the browser, use btoa() to encode and atob() to decode ASCII strings. For Unicode, use TextEncoder: btoa(String.fromCharCode(...new TextEncoder().encode(str))). In Node.js, use Buffer.from(str).toString("base64") to encode and Buffer.from(b64, "base64").toString() to decode.',
    faq3_q: 'Is Base64 encoding secure? Can I use it to protect data?',
    faq3_a: 'No. Base64 is an encoding scheme, NOT encryption. Anyone can decode Base64 data instantly without a key. It provides zero security. For data protection, use proper encryption (AES-256, RSA) and always transmit sensitive data over HTTPS.',
    faq4_q: 'Why does Base64 increase the size of data by 33%?',
    faq4_a: 'Base64 represents every 3 bytes of input as 4 characters of output. Since 4/3 = 1.333, the encoded data is approximately 33% larger than the original. This is the trade-off for converting binary data into a text-safe format. Padding characters (=) may add a few extra bytes.',
    faq5_q: 'What is the difference between Base64 and Base64URL encoding?',
    faq5_a: 'Standard Base64 uses + and / characters which have special meaning in URLs. Base64URL (RFC 4648 Section 5) replaces + with - (hyphen) and / with _ (underscore), and typically omits padding (=). Base64URL is used in JWT tokens, URL query parameters, and filenames.',
    faq6_q: 'How do I convert an image to Base64 for use in HTML or CSS?',
    faq6_a: 'On the command line: base64 -w 0 image.png (Linux) or base64 image.png (macOS). In JavaScript browser: use FileReader.readAsDataURL(file). In Node.js: fs.readFileSync("image.png").toString("base64"). Then use the result in an img src attribute as data:image/png;base64,YOUR_STRING or in CSS as url(data:image/png;base64,YOUR_STRING). Only use this for small images under 5KB.',
    faq7_q: 'Can I use Base64 encoding on the command line?',
    faq7_a: 'Yes. On Linux use: echo -n "text" | base64 to encode and echo "dGV4dA==" | base64 -d to decode. On macOS the decode flag is -D (uppercase). OpenSSL works cross-platform: echo -n "text" | openssl base64. Windows PowerShell uses [Convert]::ToBase64String() and [Convert]::FromBase64String().',

    conclusion_title: 'Conclusion',
    conclusion: 'Base64 encoding is a foundational tool in every developer\u2019s toolkit. It bridges binary and text worlds, enabling data URIs, JWT tokens, API authentication, email attachments, and much more. Remember the key rules: it adds ~33% size overhead, it is NOT encryption, and for files over 5KB you should prefer binary transfer. For quick encoding and decoding tasks, use our free online tool.',
    link_tool_bottom: 'Encode and Decode Base64 Online',
  },
  zh: {
    tldr_title: '\u6458\u8981',
    tldr: 'Base64 \u662f\u4e00\u79cd\u4e8c\u8fdb\u5236\u8f6c\u6587\u672c\u7684\u7f16\u7801\u65b9\u6848\uff0c\u4f7f\u7528 64 \u4e2a ASCII \u5b57\u7b26\u8868\u793a\u4e8c\u8fdb\u5236\u6570\u636e\u3002\u5e38\u7528\u4e8e Data URI\u3001JWT \u4ee4\u724c\u3001\u90ae\u4ef6\u9644\u4ef6\uff08MIME\uff09\u3001API \u8ba4\u8bc1\u548c Kubernetes Secrets\u3002Base64 \u4f1a\u589e\u5927\u6570\u636e\u7ea6 33%\uff0c\u5e76\u4e14\u4e0d\u662f\u52a0\u5bc6\u3002\u4f7f\u7528\u6211\u4eec\u7684\u514d\u8d39\u5728\u7ebf\u5de5\u5177\u5373\u65f6\u7f16\u89e3\u7801 Base64\u3002',
    takeaways_title: '\u6838\u5fc3\u8981\u70b9',
    takeaway1: 'Base64 \u5c06 3 \u5b57\u8282\u4e8c\u8fdb\u5236\u6570\u636e\u8f6c\u6362\u4e3a 4 \u4e2a ASCII \u5b57\u7b26\uff0c\u5bfc\u81f4\u7ea6 33% \u7684\u5927\u5c0f\u589e\u52a0\u3002',
    takeaway2: '\u5728 JavaScript \u4e2d\uff0c\u6d4f\u89c8\u5668\u4f7f\u7528 btoa()/atob()\uff0cNode.js \u4f7f\u7528 Buffer\u3002Unicode \u9700\u5148\u7f16\u7801\u4e3a UTF-8\u3002',
    takeaway3: 'Base64URL \u7528 - \u66ff\u6362 +\uff0c\u7528 _ \u66ff\u6362 /\uff0c\u9002\u7528\u4e8e URL\u3001\u6587\u4ef6\u540d\u548c JWT \u4ee4\u724c\u3002',
    takeaway4: 'Base64 \u662f\u7f16\u7801\uff0c\u4e0d\u662f\u52a0\u5bc6\u3002\u4efb\u4f55\u4eba\u90fd\u53ef\u4ee5\u65e0\u5bc6\u94a5\u89e3\u7801\u3002\u5207\u52ff\u7528\u4e8e\u5b89\u5168\u4fdd\u62a4\u3002',
    takeaway5: '\u5bf9\u4e8e\u8d85\u8fc7 5-10KB \u7684\u6587\u4ef6\uff0c\u4f18\u5148\u4f7f\u7528\u4e8c\u8fdb\u5236\u4f20\u8f93\u65b9\u5f0f\uff08multipart/form-data\uff09\u3002',
    takeaway6: '\u5e38\u89c1\u7528\u9014\uff1aData URI\u3001JWT \u4ee4\u724c\u3001HTTP Basic Auth\u3001MIME \u90ae\u4ef6\u3001Kubernetes Secrets\u3001CSS \u5d4c\u5165\u3002',
    link_tool: '\u8bd5\u8bd5\u6211\u4eec\u7684\u514d\u8d39 Base64 \u7f16\u89e3\u7801\u5de5\u5177',

    h2_what: '\u4ec0\u4e48\u662f Base64 \u7f16\u7801\uff1f\u4e3a\u4ec0\u4e48\u9700\u8981\u5b83\uff1f',
    what_p1: 'Base64 \u662f\u4e00\u79cd\u5728 <strong>RFC 4648</strong> \u4e2d\u5b9a\u4e49\u7684\u4e8c\u8fdb\u5236\u8f6c\u6587\u672c\u7f16\u7801\u65b9\u6848\u3002\u5b83\u4f7f\u7528 64 \u4e2a\u5b57\u7b26\u7684\u5b57\u6bcd\u8868\u5c06\u4efb\u610f\u4e8c\u8fdb\u5236\u6570\u636e\u8f6c\u6362\u4e3a\u53ef\u6253\u5370\u7684 ASCII \u5b57\u7b26\u4e32\uff1a<code>A-Z</code>\uff0826\uff09\u3001<code>a-z</code>\uff0826\uff09\u3001<code>0-9</code>\uff0810\uff09\u3001<code>+</code>\uff081\uff09\u548c <code>/</code>\uff081\uff09\uff0c\u52a0\u4e0a <code>=</code> \u7528\u4e8e\u586b\u5145\u3002',
    what_p2: 'Base64 \u7684\u8bde\u751f\u662f\u4e3a\u4e86\u89e3\u51b3\u4e00\u4e2a\u57fa\u672c\u95ee\u9898\uff1a\u8bb8\u591a\u7cfb\u7edf\u548c\u534f\u8bae\uff08SMTP \u90ae\u4ef6\u3001HTML\u3001JSON\u3001HTTP \u5934\uff09\u4ec5\u652f\u6301\u6587\u672c\u6570\u636e\u3002\u5f53\u9700\u8981\u901a\u8fc7\u8fd9\u4e9b\u7eaf\u6587\u672c\u901a\u9053\u4f20\u8f93\u4e8c\u8fdb\u5236\u6570\u636e\u65f6\uff0c\u9700\u8981\u5c06\u4e8c\u8fdb\u5236\u8868\u793a\u4e3a\u6587\u672c\u3002',
    what_p3: '\u7f16\u7801\u8fc7\u7a0b\u5c06\u6bcf 3 \u5b57\u8282\uff0824 \u4f4d\uff09\u5206\u4e3a\u56db\u4e2a 6 \u4f4d\u7ec4\u3002\u6bcf\u4e2a 6 \u4f4d\u503c\uff080-63\uff09\u6620\u5c04\u5230 Base64 \u5b57\u6bcd\u8868\u4e2d\u7684\u4e00\u4e2a\u5b57\u7b26\u3002\u8f93\u5165\u957f\u5ea6\u4e0d\u662f 3 \u7684\u500d\u6570\u65f6\u7528 <code>=</code> \u586b\u5145\u3002',

    h2_js: 'JavaScript \u4e2d\u7684 Base64 \u7f16\u89e3\u7801',
    js_p1: 'JavaScript \u5728\u6d4f\u89c8\u5668\u548c Node.js \u73af\u5883\u4e2d\u90fd\u63d0\u4f9b\u4e86\u5185\u7f6e\u7684 Base64 \u51fd\u6570\uff1a',
    h3_js_browser: '\u6d4f\u89c8\u5668\uff1abtoa() \u548c atob()',
    js_browser_p: '<code>btoa()</code> \u5c06\u5b57\u7b26\u4e32\u7f16\u7801\u4e3a Base64\uff0c<code>atob()</code> \u5c06 Base64 \u89e3\u7801\u3002\u8fd9\u4e24\u4e2a\u51fd\u6570\u4ec5\u5904\u7406 ASCII \u5b57\u7b26\u3002',
    h3_js_unicode: '\u6d4f\u89c8\u5668\u4e2d\u5904\u7406 Unicode',
    js_unicode_p: '\u7531\u4e8e <code>btoa()</code> \u5bf9\u975e ASCII \u5b57\u7b26\u4f1a\u62a5\u9519\uff0c\u9700\u8981\u5148\u5c06 Unicode \u6587\u672c\u7f16\u7801\u4e3a UTF-8\uff1a',
    h3_js_node: 'Node.js\uff1aBuffer',
    js_node_p: 'Node.js \u7684 <code>Buffer</code> \u7c7b\u539f\u751f\u652f\u6301 Base64 \u7f16\u7801\uff0c\u5305\u62ec UTF-8\uff1a',
    h3_js_file: '\u6d4f\u89c8\u5668\u4e2d\u6587\u4ef6\u8f6c Base64\uff08FileReader\uff09',
    js_file_p: '\u4f7f\u7528 FileReader API \u5c06\u6587\u4ef6\u8f6c\u6362\u4e3a Base64\uff1a',

    h2_python: 'Python \u4e2d\u7684 Base64 \u7f16\u89e3\u7801',
    python_p1: 'Python \u6807\u51c6\u5e93\u5305\u542b <code>base64</code> \u6a21\u5757\uff0c\u652f\u6301\u6807\u51c6 Base64 \u548c URL \u5b89\u5168 Base64\uff1a',
    h3_python_basic: '\u57fa\u672c\u7f16\u89e3\u7801',
    h3_python_urlsafe: 'URL \u5b89\u5168 Base64',
    h3_python_file: '\u7f16\u7801\u6587\u4ef6',

    h2_cli: '\u547d\u4ee4\u884c Base64',
    cli_p1: '\u6240\u6709\u4e3b\u6d41\u64cd\u4f5c\u7cfb\u7edf\u90fd\u63d0\u4f9b\u4e86\u5185\u7f6e\u7684 Base64 \u7f16\u89e3\u7801\u5de5\u5177\uff1a',
    h3_cli_linux: 'Linux\uff08GNU coreutils\uff09',
    cli_linux_p: '\u5927\u591a\u6570 Linux \u53d1\u884c\u7248\u90fd\u5305\u542b <code>base64</code> \u547d\u4ee4\u3002\u4f7f\u7528 <code>-w 0</code> \u7981\u7528\u6362\u884c\uff1a',
    h3_cli_macos: 'macOS\uff08BSD base64\uff09',
    cli_macos_p: 'macOS \u4f7f\u7528 BSD \u7248\u672c\uff0c\u89e3\u7801\u6807\u5fd7\u662f <code>-D</code>\uff08\u5927\u5199\uff09\uff1a',
    h3_cli_openssl: 'OpenSSL\uff08\u8de8\u5e73\u53f0\uff09',
    cli_openssl_p: 'OpenSSL \u5728 Linux\u3001macOS \u548c Windows \u4e0a\u63d0\u4f9b\u4e00\u81f4\u7684 Base64 \u63a5\u53e3\uff1a',
    h3_cli_windows: 'Windows PowerShell',
    cli_windows_p: 'PowerShell \u4f7f\u7528 .NET \u65b9\u6cd5\u8fdb\u884c Base64 \u64cd\u4f5c\uff1a',

    h2_data_uri: 'Data URI\uff1a\u5c06\u56fe\u7247\u5d4c\u5165\u4e3a Base64',
    data_uri_p1: 'Data URI \u5141\u8bb8\u5c06\u6587\u4ef6\u6570\u636e\u76f4\u63a5\u5d4c\u5165 HTML \u6216 CSS\uff0c\u65e0\u9700\u989d\u5916\u7684 HTTP \u8bf7\u6c42\u3002\u683c\u5f0f\u4e3a\uff1a',
    data_uri_p2: '\u6b64\u6280\u672f\u9002\u7528\u4e8e 5KB \u4ee5\u4e0b\u7684\u5c0f\u8d44\u6e90\u3002\u66f4\u5927\u7684\u6587\u4ef6\u5e94\u4f7f\u7528\u666e\u901a\u6587\u4ef6 URL\u3002',
    h3_data_uri_html: 'HTML \u5185\u8054\u56fe\u7247',
    h3_data_uri_css: 'CSS \u80cc\u666f\u56fe\u7247',
    h3_data_uri_svg: 'SVG Data URI\uff08\u65e0\u9700 Base64\uff09',
    data_uri_svg_p: 'SVG \u5df2\u7ecf\u662f\u6587\u672c\u683c\u5f0f\uff0c\u53ef\u4ee5\u4f7f\u7528 URL \u7f16\u7801\u7684 Data URI\uff0c\u6bd4 Base64 \u66f4\u5c0f\uff1a',

    h2_api: 'Base64 \u5728 API \u548c\u8ba4\u8bc1\u4e2d\u7684\u4f7f\u7528',
    api_p1: 'Base64 \u5728\u591a\u79cd API \u6a21\u5f0f\u4e2d\u53d1\u6325\u5173\u952e\u4f5c\u7528\uff1a',
    h3_api_basic: 'HTTP Basic \u8ba4\u8bc1',
    api_basic_p: 'HTTP Basic Auth \u5c06 username:password \u7f16\u7801\u4e3a Base64 \u5b57\u7b26\u4e32\u3002\u8fd9\u672c\u8eab\u4e0d\u5b89\u5168\uff0c\u5fc5\u987b\u4f7f\u7528 HTTPS\uff1a',
    h3_api_upload: '\u901a\u8fc7 JSON \u4e0a\u4f20\u6587\u4ef6',
    api_upload_p: '\u5f53 API \u8981\u6c42\u901a\u8fc7 JSON \u4e0a\u4f20\u6587\u4ef6\u65f6\uff0c\u6587\u4ef6\u901a\u5e38\u88ab Base64 \u7f16\u7801\uff1a',
    h3_api_jwt: 'JWT\uff08JSON Web Tokens\uff09',
    api_jwt_p: 'JWT \u7531\u4e09\u4e2a Base64URL \u7f16\u7801\u7684\u6bb5\u7ec4\u6210\uff1a<code>header.payload.signature</code>\u3002',

    h2_urlsafe: 'Base64URL \u5b89\u5168\u7f16\u7801 vs \u6807\u51c6 Base64',
    urlsafe_p1: '\u6807\u51c6 Base64 \u4f7f\u7528\u5728 URL \u4e2d\u6709\u7279\u6b8a\u542b\u4e49\u7684 <code>+</code> \u548c <code>/</code>\u3002Base64URL \u66ff\u6362\u4e86\u8fd9\u4e9b\u5b57\u7b26\uff1a',
    urlsafe_p2: 'Base64URL \u7528\u4e8e JWT \u4ee4\u724c\u3001URL \u53c2\u6570\u3001\u6587\u4ef6\u540d\u7b49\u573a\u666f\u3002',

    h2_perf: '\u6027\u80fd\u8003\u91cf\uff1a33% \u5927\u5c0f\u589e\u52a0',
    perf_p1: 'Base64 \u7f16\u7801\u4f1a\u5c06\u6570\u636e\u5927\u5c0f\u589e\u52a0\u7ea6 33%\uff0c\u56e0\u4e3a\u6bcf 3 \u5b57\u8282\u8868\u793a\u4e3a 4 \u4e2a\u5b57\u7b26\uff1a',
    perf_li1: '<strong>\u7f51\u7edc\u5e26\u5bbd</strong>\uff1a1MB \u56fe\u7247\u7f16\u7801\u540e\u7ea6 1.37MB\u3002',
    perf_li2: '<strong>\u9875\u9762\u5927\u5c0f</strong>\uff1a\u5d4c\u5165\u7684 Base64 \u56fe\u7247\u65e0\u6cd5\u5355\u72ec\u7f13\u5b58\u3002',
    perf_li3: '<strong>\u5185\u5b58\u4f7f\u7528</strong>\uff1a\u7f16\u7801\u5b57\u7b26\u4e32\u548c\u89e3\u7801\u4e8c\u8fdb\u5236\u540c\u65f6\u5b58\u5728\u4e8e\u5185\u5b58\u4e2d\u3002',
    perf_li4: '<strong>\u538b\u7f29\u60e9\u7f5a</strong>\uff1aBase64 \u6570\u636e\u538b\u7f29\u6548\u679c\u5dee\u3002\u5e94\u5148\u538b\u7f29\u518d\u7f16\u7801\u3002',
    perf_li5: '<strong>CPU \u5f00\u9500</strong>\uff1a\u5927\u89c4\u6a21\u5904\u7406 Base64 \u5b57\u7b26\u4e32\u4f1a\u589e\u52a0\u5ef6\u8fdf\u3002',
    perf_p2: '<strong>\u7ecf\u9a8c\u6cd5\u5219</strong>\uff1a\u4ec5\u5bf9 5KB \u4ee5\u4e0b\u7684\u56fe\u7247\u4f7f\u7528 Base64 Data URI\u3002\u66f4\u5927\u7684\u6587\u4ef6\u5e94\u5355\u72ec\u63d0\u4f9b\u5e76\u5229\u7528\u7f13\u5b58\u3002',

    h2_security: '\u5b89\u5168\u8b66\u544a\uff1aBase64 \u4e0d\u662f\u52a0\u5bc6',
    security_p1: '\u8fd9\u662f\u8f6f\u4ef6\u5f00\u53d1\u4e2d\u6700\u5e38\u89c1\u7684\u8bef\u89e3\u4e4b\u4e00\uff1a<strong>Base64 \u7f16\u7801\u4e0d\u63d0\u4f9b\u4efb\u4f55\u5b89\u5168\u6027</strong>\u3002\u5b83\u662f\u53ef\u9006\u7684\u7f16\u7801\uff0c\u4e0d\u662f\u52a0\u5bc6\u3002',
    security_p2: '\u5207\u52ff\u4f7f\u7528 Base64 \u201c\u4fdd\u62a4\u201d\u5bc6\u7801\u3001API \u5bc6\u94a5\u6216\u4e2a\u4eba\u4fe1\u606f\u3002',
    security_p3: '\u5b9e\u9645\u5b89\u5168\u5e94\u4f7f\u7528\uff1a',
    security_li1: '<strong>\u52a0\u5bc6</strong>\uff1aAES-256-GCM\u3001ChaCha20-Poly1305 \u6216 RSA',
    security_li2: '<strong>\u54c8\u5e0c</strong>\uff1abcrypt\u3001Argon2 \u6216 scrypt\uff08\u52a0\u76d0\uff09',
    security_li3: '<strong>HTTPS/TLS</strong>\uff1a\u7528\u4e8e\u4f20\u8f93\u4e2d\u7684\u6570\u636e',
    security_li4: '<strong>\u7b7e\u540d\u4ee4\u724c</strong>\uff1aHMAC-SHA256 \u7528\u4e8e\u6570\u636e\u5b8c\u6574\u6027\u9a8c\u8bc1',

    h2_usecases: 'Base64 \u7684\u5e38\u89c1\u7528\u9014',
    h3_use_email: '1. \u90ae\u4ef6\u9644\u4ef6\uff08MIME\uff09',
    use_email_p: 'SMTP \u534f\u8bae\u4e3a 7 \u4f4d ASCII \u8bbe\u8ba1\u3002\u4e8c\u8fdb\u5236\u6587\u4ef6\u5728\u53d1\u9001\u524d\u5fc5\u987b Base64 \u7f16\u7801\u3002',
    h3_use_jwt: '2. JWT \u4ee4\u724c',
    use_jwt_p: 'JWT \u4f7f\u7528 Base64URL \u7f16\u7801\u5934\u90e8\u548c\u8f7d\u8377\u6bb5\u3002',
    h3_use_css: '3. CSS Data URI',
    use_css_p: '\u5c0f\u56fe\u7247\u548c\u56fe\u6807\u53ef\u76f4\u63a5\u5d4c\u5165 CSS \u6587\u4ef6\u4e2d\uff1a',
    h3_use_k8s: '4. Kubernetes Secrets',
    use_k8s_p: 'Kubernetes \u5c06\u79d8\u5bc6\u503c\u5b58\u50a8\u4e3a Base64 \u7f16\u7801\u5b57\u7b26\u4e32\u3002\u8fd9\u4e0d\u662f\u4e3a\u4e86\u5b89\u5168\uff0c\u800c\u662f\u4e3a\u4e86 YAML \u5e8f\u5217\u5316\uff1a',
    h3_use_upload: '5. API \u6587\u4ef6\u4e0a\u4f20',
    use_upload_p: 'REST API \u901a\u8fc7 JSON \u63a5\u53d7\u6587\u4ef6\u4e0a\u4f20\u65f6\u4f7f\u7528 Base64 \u7f16\u7801\u3002',
    h3_use_websocket: '6. WebSocket \u4e8c\u8fdb\u5236\u6570\u636e',
    use_websocket_p: '\u901a\u8fc7 WebSocket \u6587\u672c\u5e27\u4f20\u8f93\u4e8c\u8fdb\u5236\u6570\u636e\u65f6\uff0cBase64 \u7f16\u7801\u786e\u4fdd\u6570\u636e\u4e0d\u4f1a\u635f\u574f\u3002',

    h2_faq: '\u5e38\u89c1\u95ee\u9898',
    faq1_q: 'Base64 \u7f16\u7801\u7528\u4e8e\u4ec0\u4e48\uff1f',
    faq1_a: 'Base64 \u5c06\u4e8c\u8fdb\u5236\u6570\u636e\u8f6c\u6362\u4e3a\u6587\u672c\u4ee5\u4fbf\u5b89\u5168\u4f20\u8f93\u3002\u5e38\u89c1\u7528\u9014\u5305\u62ec Data URI\u3001JWT \u4ee4\u724c\u3001HTTP Basic \u8ba4\u8bc1\u3001\u90ae\u4ef6\u9644\u4ef6\u548c Kubernetes Secrets\u3002',
    faq2_q: '\u5982\u4f55\u5728 JavaScript \u4e2d\u5c06\u5b57\u7b26\u4e32\u7f16\u7801\u4e3a Base64\uff1f',
    faq2_a: '\u6d4f\u89c8\u5668\u4e2d\u4f7f\u7528 btoa() \u7f16\u7801\uff0catob() \u89e3\u7801\u3002Unicode \u9700\u5148\u7f16\u7801\u4e3a UTF-8\u3002Node.js \u4f7f\u7528 Buffer.from(str).toString("base64")\u3002',
    faq3_q: 'Base64 \u7f16\u7801\u5b89\u5168\u5417\uff1f\u53ef\u4ee5\u7528\u5b83\u4fdd\u62a4\u6570\u636e\u5417\uff1f',
    faq3_a: '\u4e0d\u5b89\u5168\u3002Base64 \u662f\u7f16\u7801\uff0c\u4e0d\u662f\u52a0\u5bc6\u3002\u4efb\u4f55\u4eba\u90fd\u53ef\u4ee5\u65e0\u5bc6\u94a5\u89e3\u7801\u3002\u8bf7\u4f7f\u7528 AES-256 \u6216 RSA \u8fdb\u884c\u52a0\u5bc6\u3002',
    faq4_q: '\u4e3a\u4ec0\u4e48 Base64 \u4f1a\u589e\u5927\u6570\u636e 33%\uff1f',
    faq4_a: 'Base64 \u7528 4 \u4e2a\u5b57\u7b26\u8868\u793a 3 \u4e2a\u5b57\u8282\u30024/3 = 1.333\uff0c\u5373\u589e\u5927 33%\u3002',
    faq5_q: 'Base64 \u548c Base64URL \u6709\u4ec0\u4e48\u533a\u522b\uff1f',
    faq5_a: '\u6807\u51c6 Base64 \u7528 + \u548c /\uff0c\u5728 URL \u4e2d\u6709\u7279\u6b8a\u542b\u4e49\u3002Base64URL \u7528 - \u66ff\u6362 +\uff0c\u7528 _ \u66ff\u6362 /\uff0c\u901a\u5e38\u7701\u7565\u586b\u5145\u3002\u7528\u4e8e JWT \u548c URL \u53c2\u6570\u3002',
    faq6_q: '\u5982\u4f55\u5c06\u56fe\u7247\u8f6c\u6362\u4e3a Base64 \u7528\u4e8e HTML \u6216 CSS\uff1f',
    faq6_a: '\u547d\u4ee4\u884c\uff1abase64 -w 0 image.png\uff08Linux\uff09\u6216 base64 image.png\uff08macOS\uff09\u3002JavaScript \u4f7f\u7528 FileReader.readAsDataURL()\u3002\u4ec5\u5bf9 5KB \u4ee5\u4e0b\u7684\u56fe\u7247\u4f7f\u7528\u3002',
    faq7_q: '\u53ef\u4ee5\u5728\u547d\u4ee4\u884c\u4e2d\u4f7f\u7528 Base64 \u7f16\u7801\u5417\uff1f',
    faq7_a: '\u53ef\u4ee5\u3002Linux\uff1aecho -n "text" | base64\u3002macOS \u89e3\u7801\u7528 -D\u3002OpenSSL \u8de8\u5e73\u53f0\uff1aecho -n "text" | openssl base64\u3002PowerShell \u7528 [Convert]::ToBase64String()\u3002',

    conclusion_title: '\u603b\u7ed3',
    conclusion: 'Base64 \u7f16\u7801\u662f\u6bcf\u4e2a\u5f00\u53d1\u8005\u5de5\u5177\u7bb1\u4e2d\u7684\u57fa\u7840\u5de5\u5177\u3002\u8bb0\u4f4f\u5173\u952e\u89c4\u5219\uff1a\u5b83\u589e\u52a0\u7ea6 33% \u7684\u5927\u5c0f\uff0c\u4e0d\u662f\u52a0\u5bc6\uff0c\u8d85\u8fc7 5KB \u7684\u6587\u4ef6\u5e94\u4f18\u5148\u4f7f\u7528\u4e8c\u8fdb\u5236\u4f20\u8f93\u3002',
    link_tool_bottom: '\u5728\u7ebf\u7f16\u89e3\u7801 Base64',
  },
};

export default function Base64OnlineGuide({ lang }: { lang: string }) {
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

      <p><Link href={`/${lang}/tools/base64`} style={{ fontWeight: 600, color: '#2563eb' }}>{s.link_tool} &rarr;</Link></p>

      {/* Section 1: What Is Base64 */}
      <h2>{s.h2_what}</h2>
      <p dangerouslySetInnerHTML={{ __html: s.what_p1 }} />
      <p>{s.what_p2}</p>
      <p dangerouslySetInnerHTML={{ __html: s.what_p3 }} />

      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: 16, borderRadius: 8, overflowX: 'auto', fontSize: 13, lineHeight: 1.5 }}><code>{`Base64 Alphabet (RFC 4648):
A B C D E F G H I J K L M N O P Q R S T U V W X Y Z   (0-25)
a b c d e f g h i j k l m n o p q r s t u v w x y z   (26-51)
0 1 2 3 4 5 6 7 8 9                                     (52-61)
+ /                                                       (62-63)
= (padding)

Encoding example: "Hi" (2 bytes, needs padding)
H = 0x48 = 01001000
i = 0x69 = 01101001

Binary:  010010 000110 100100 (pad)
Index:   18     6      36     =
Char:    S      G      k      =
Result:  "SGk="`}</code></pre>

      {/* Section 2: JavaScript */}
      <h2>{s.h2_js}</h2>
      <p>{s.js_p1}</p>

      <h3>{s.h3_js_browser}</h3>
      <p dangerouslySetInnerHTML={{ __html: s.js_browser_p }} />
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: 16, borderRadius: 8, overflowX: 'auto', fontSize: 13, lineHeight: 1.5 }}><code>{`// Encode to Base64
const encoded = btoa("Hello, World!");
console.log(encoded); // "SGVsbG8sIFdvcmxkIQ=="

// Decode from Base64
const decoded = atob("SGVsbG8sIFdvcmxkIQ==");
console.log(decoded); // "Hello, World!"

// Check if a string is valid Base64
function isBase64(str) {
  try {
    return btoa(atob(str)) === str;
  } catch (e) {
    return false;
  }
}`}</code></pre>

      <h3>{s.h3_js_unicode}</h3>
      <p dangerouslySetInnerHTML={{ __html: s.js_unicode_p }} />
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: 16, borderRadius: 8, overflowX: 'auto', fontSize: 13, lineHeight: 1.5 }}><code>{`// Method 1: TextEncoder (modern browsers)
function toBase64Unicode(str) {
  const bytes = new TextEncoder().encode(str);
  const binStr = Array.from(bytes, b => String.fromCodePoint(b)).join("");
  return btoa(binStr);
}

function fromBase64Unicode(b64) {
  const binStr = atob(b64);
  const bytes = Uint8Array.from(binStr, c => c.codePointAt(0));
  return new TextDecoder().decode(bytes);
}

// Method 2: encodeURIComponent (legacy support)
const encoded = btoa(unescape(encodeURIComponent("\u4f60\u597d\u4e16\u754c")));
const decoded = decodeURIComponent(escape(atob(encoded)));`}</code></pre>

      <h3>{s.h3_js_node}</h3>
      <p dangerouslySetInnerHTML={{ __html: s.js_node_p }} />
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: 16, borderRadius: 8, overflowX: 'auto', fontSize: 13, lineHeight: 1.5 }}><code>{`// Node.js: Encode
const encoded = Buffer.from("Hello, World!").toString("base64");
// "SGVsbG8sIFdvcmxkIQ=="

// Node.js: Decode
const decoded = Buffer.from("SGVsbG8sIFdvcmxkIQ==", "base64").toString();
// "Hello, World!"

// Node.js: Unicode works natively
const unicodeB64 = Buffer.from("\u4f60\u597d\u4e16\u754c").toString("base64");
const unicodeStr = Buffer.from(unicodeB64, "base64").toString("utf-8");

// Node.js: Base64URL encoding
const urlSafe = Buffer.from("data").toString("base64url");
// No + / or = characters`}</code></pre>

      <h3>{s.h3_js_file}</h3>
      <p>{s.js_file_p}</p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: 16, borderRadius: 8, overflowX: 'auto', fontSize: 13, lineHeight: 1.5 }}><code>{`function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file); // Returns "data:mime/type;base64,..."
  });
}

// Usage with an input element
const input = document.querySelector("input[type=file]");
input.addEventListener("change", async (e) => {
  const file = e.target.files[0];
  const dataUrl = await fileToBase64(file);
  console.log(dataUrl);
  // "data:image/png;base64,iVBORw0KGgo..."
});`}</code></pre>

      <p style={{ marginTop: 16 }}><Link href={`/${lang}/tools/base64`} style={{ fontWeight: 600, color: '#2563eb' }}>{s.link_tool} &rarr;</Link></p>

      {/* Section 3: Python */}
      <h2>{s.h2_python}</h2>
      <p dangerouslySetInnerHTML={{ __html: s.python_p1 }} />

      <h3>{s.h3_python_basic}</h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: 16, borderRadius: 8, overflowX: 'auto', fontSize: 13, lineHeight: 1.5 }}><code>{`import base64

# Encode a string (must be bytes)
encoded = base64.b64encode(b"Hello, World!")
print(encoded)  # b'SGVsbG8sIFdvcmxkIQ=='

# Decode back to bytes
decoded = base64.b64decode(encoded)
print(decoded)  # b'Hello, World!'

# String to Base64 string (common pattern)
text = "Hello, World!"
b64_str = base64.b64encode(text.encode("utf-8")).decode("ascii")
print(b64_str)  # "SGVsbG8sIFdvcmxkIQ=="

# Unicode works via UTF-8
unicode_b64 = base64.b64encode("\u4f60\u597d\u4e16\u754c".encode("utf-8"))
print(unicode_b64)  # b'5L2g5aW95LiW55WM'`}</code></pre>

      <h3>{s.h3_python_urlsafe}</h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: 16, borderRadius: 8, overflowX: 'auto', fontSize: 13, lineHeight: 1.5 }}><code>{`import base64

# URL-safe Base64 (replaces + with - and / with _)
data = b"subjects?abcd"
standard = base64.b64encode(data)
urlsafe  = base64.urlsafe_b64encode(data)

print(standard)  # b'c3ViamVjdHM/YWJjZA=='
print(urlsafe)   # b'c3ViamVjdHM_YWJjZA=='
#                          Note: / became _

# Decode URL-safe Base64
original = base64.urlsafe_b64decode(urlsafe)
print(original)  # b'subjects?abcd'`}</code></pre>

      <h3>{s.h3_python_file}</h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: 16, borderRadius: 8, overflowX: 'auto', fontSize: 13, lineHeight: 1.5 }}><code>{`import base64

# Encode a file to Base64
with open("image.png", "rb") as f:
    encoded = base64.b64encode(f.read()).decode("ascii")
print(f"data:image/png;base64,{encoded[:50]}...")

# Decode Base64 back to a file
with open("output.png", "wb") as f:
    f.write(base64.b64decode(encoded))

# One-liner for reading + encoding
b64 = base64.b64encode(open("doc.pdf", "rb").read()).decode()`}</code></pre>

      {/* Section 4: Command Line */}
      <h2>{s.h2_cli}</h2>
      <p>{s.cli_p1}</p>

      <h3>{s.h3_cli_linux}</h3>
      <p dangerouslySetInnerHTML={{ __html: s.cli_linux_p }} />
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: 16, borderRadius: 8, overflowX: 'auto', fontSize: 13, lineHeight: 1.5 }}><code>{`# Encode a string (use -n to avoid trailing newline!)
echo -n "Hello, World!" | base64
# SGVsbG8sIFdvcmxkIQ==

# Decode a string
echo "SGVsbG8sIFdvcmxkIQ==" | base64 -d
# Hello, World!

# Encode a file (no line wrapping)
base64 -w 0 image.png > image.b64

# Decode a file
base64 -d image.b64 > image_restored.png

# Pipe from curl
curl -s https://example.com/api | base64 -w 0`}</code></pre>

      <h3>{s.h3_cli_macos}</h3>
      <p dangerouslySetInnerHTML={{ __html: s.cli_macos_p }} />
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: 16, borderRadius: 8, overflowX: 'auto', fontSize: 13, lineHeight: 1.5 }}><code>{`# Encode a string
echo -n "Hello, World!" | base64
# SGVsbG8sIFdvcmxkIQ==

# Decode (note: uppercase -D on macOS)
echo "SGVsbG8sIFdvcmxkIQ==" | base64 -D
# Hello, World!

# Encode a file
base64 -i image.png -o image.b64

# Decode a file
base64 -D -i image.b64 -o image_restored.png`}</code></pre>

      <h3>{s.h3_cli_openssl}</h3>
      <p dangerouslySetInnerHTML={{ __html: s.cli_openssl_p }} />
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: 16, borderRadius: 8, overflowX: 'auto', fontSize: 13, lineHeight: 1.5 }}><code>{`# Encode with OpenSSL
echo -n "Hello, World!" | openssl base64
# SGVsbG8sIFdvcmxkIQ==

# Decode with OpenSSL
echo "SGVsbG8sIFdvcmxkIQ==" | openssl base64 -d
# Hello, World!

# Encode a file
openssl base64 -in image.png -out image.b64

# Decode a file
openssl base64 -d -in image.b64 -out image_restored.png

# One line (no wrapping) - pipe through tr
echo -n "Hello" | openssl base64 | tr -d "\\n"`}</code></pre>

      <h3>{s.h3_cli_windows}</h3>
      <p dangerouslySetInnerHTML={{ __html: s.cli_windows_p }} />
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: 16, borderRadius: 8, overflowX: 'auto', fontSize: 13, lineHeight: 1.5 }}><code>{`# PowerShell: Encode
$bytes = [System.Text.Encoding]::UTF8.GetBytes("Hello, World!")
[Convert]::ToBase64String($bytes)
# SGVsbG8sIFdvcmxkIQ==

# PowerShell: Decode
$decoded = [Convert]::FromBase64String("SGVsbG8sIFdvcmxkIQ==")
[System.Text.Encoding]::UTF8.GetString($decoded)
# Hello, World!

# PowerShell: Encode a file
$fileBytes = [IO.File]::ReadAllBytes("C:\\path\\to\\image.png")
[Convert]::ToBase64String($fileBytes) | Out-File image.b64`}</code></pre>

      {/* Section 5: Data URIs */}
      <h2>{s.h2_data_uri}</h2>
      <p>{s.data_uri_p1}</p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: 16, borderRadius: 8, overflowX: 'auto', fontSize: 13, lineHeight: 1.5 }}><code>{`data:[<mediatype>][;base64],<data>

Examples:
data:text/plain;base64,SGVsbG8=
data:image/png;base64,iVBORw0KGgoAAAANSUhEUg...
data:application/pdf;base64,JVBERi0xLjQK...`}</code></pre>
      <p>{s.data_uri_p2}</p>

      <h3>{s.h3_data_uri_html}</h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: 16, borderRadius: 8, overflowX: 'auto', fontSize: 13, lineHeight: 1.5 }}><code>{`<!-- Inline a small PNG icon -->
<img
  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAAB
       CAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII="
  alt="1x1 pixel"
  width="16"
  height="16"
/>

<!-- Inline a small GIF -->
<img
  src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
  alt="transparent pixel"
/>`}</code></pre>

      <h3>{s.h3_data_uri_css}</h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: 16, borderRadius: 8, overflowX: 'auto', fontSize: 13, lineHeight: 1.5 }}><code>{`.icon-check {
  background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxu...);
  background-size: contain;
  width: 24px;
  height: 24px;
}

@font-face {
  font-family: "CustomIcon";
  src: url(data:font/woff2;base64,d09GMgABAAAAA...) format("woff2");
}`}</code></pre>

      <h3>{s.h3_data_uri_svg}</h3>
      <p dangerouslySetInnerHTML={{ __html: s.data_uri_svg_p }} />
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: 16, borderRadius: 8, overflowX: 'auto', fontSize: 13, lineHeight: 1.5 }}><code>{`/* SVG as URL-encoded data URI (smaller than Base64) */
.icon {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z'/%3E%3C/svg%3E");
}`}</code></pre>

      <p style={{ marginTop: 16 }}><Link href={`/${lang}/tools/base64`} style={{ fontWeight: 600, color: '#2563eb' }}>{s.link_tool} &rarr;</Link></p>

      {/* Section 6: APIs */}
      <h2>{s.h2_api}</h2>
      <p>{s.api_p1}</p>

      <h3>{s.h3_api_basic}</h3>
      <p dangerouslySetInnerHTML={{ __html: s.api_basic_p }} />
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: 16, borderRadius: 8, overflowX: 'auto', fontSize: 13, lineHeight: 1.5 }}><code>{`// HTTP Basic Authentication
const username = "admin";
const password = "secret123";
const credentials = btoa(username + ":" + password);

fetch("https://api.example.com/data", {
  headers: {
    "Authorization": "Basic " + credentials
    // Authorization: Basic YWRtaW46c2VjcmV0MTIz
  }
});

// curl equivalent
// curl -u admin:secret123 https://api.example.com/data
// curl -H "Authorization: Basic YWRtaW46c2VjcmV0MTIz" https://api.example.com/data`}</code></pre>

      <h3>{s.h3_api_upload}</h3>
      <p dangerouslySetInnerHTML={{ __html: s.api_upload_p }} />
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: 16, borderRadius: 8, overflowX: 'auto', fontSize: 13, lineHeight: 1.5 }}><code>{`// File upload via JSON API
const fileInput = document.querySelector("input[type=file]");
const file = fileInput.files[0];
const reader = new FileReader();

reader.onload = () => {
  const base64Data = reader.result.split(",")[1]; // Remove data URI prefix

  fetch("https://api.example.com/upload", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      filename: file.name,
      contentType: file.type,
      data: base64Data  // Base64-encoded file contents
    })
  });
};

reader.readAsDataURL(file);`}</code></pre>

      <h3>{s.h3_api_jwt}</h3>
      <p dangerouslySetInnerHTML={{ __html: s.api_jwt_p }} />
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: 16, borderRadius: 8, overflowX: 'auto', fontSize: 13, lineHeight: 1.5 }}><code>{`// JWT structure: header.payload.signature
// Each part is Base64URL-encoded

// Decode a JWT payload (without verification)
function decodeJwtPayload(token) {
  const payload = token.split(".")[1];
  // Base64URL to standard Base64
  const base64 = payload.replace(/-/g, "+").replace(/_/g, "/");
  const padded = base64 + "=".repeat((4 - base64.length % 4) % 4);
  return JSON.parse(atob(padded));
}

const token = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMjM0NTY3ODkwIn0.dozjgNryP4J3jVmNHl0w5N_XgL0n3I9PlFUP0THsR8U";
console.log(decodeJwtPayload(token));
// { sub: "1234567890" }`}</code></pre>

      {/* Section 7: URL-Safe */}
      <h2>{s.h2_urlsafe}</h2>
      <p dangerouslySetInnerHTML={{ __html: s.urlsafe_p1 }} />

      <div style={{ overflowX: 'auto', marginBottom: 16 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
          <thead>
            <tr style={{ background: '#f1f5f9' }}>
              <th style={{ padding: '10px 16px', textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>Character</th>
              <th style={{ padding: '10px 16px', textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>Standard Base64</th>
              <th style={{ padding: '10px 16px', textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>Base64URL</th>
            </tr>
          </thead>
          <tbody>
            <tr><td style={{ padding: '10px 16px', borderBottom: '1px solid #e2e8f0' }}>62nd character</td><td style={{ padding: '10px 16px', borderBottom: '1px solid #e2e8f0' }}><code>+</code></td><td style={{ padding: '10px 16px', borderBottom: '1px solid #e2e8f0' }}><code>-</code> (hyphen)</td></tr>
            <tr><td style={{ padding: '10px 16px', borderBottom: '1px solid #e2e8f0' }}>63rd character</td><td style={{ padding: '10px 16px', borderBottom: '1px solid #e2e8f0' }}><code>/</code></td><td style={{ padding: '10px 16px', borderBottom: '1px solid #e2e8f0' }}><code>_</code> (underscore)</td></tr>
            <tr><td style={{ padding: '10px 16px', borderBottom: '1px solid #e2e8f0' }}>Padding</td><td style={{ padding: '10px 16px', borderBottom: '1px solid #e2e8f0' }}><code>=</code></td><td style={{ padding: '10px 16px', borderBottom: '1px solid #e2e8f0' }}>Usually omitted</td></tr>
          </tbody>
        </table>
      </div>

      <p>{s.urlsafe_p2}</p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: 16, borderRadius: 8, overflowX: 'auto', fontSize: 13, lineHeight: 1.5 }}><code>{`// JavaScript: Convert standard Base64 to Base64URL
function toBase64Url(base64) {
  return base64.replace(/\\+/g, "-").replace(/\\//g, "_").replace(/=+$/, "");
}

function fromBase64Url(base64url) {
  let base64 = base64url.replace(/-/g, "+").replace(/_/g, "/");
  const pad = base64.length % 4;
  if (pad) base64 += "=".repeat(4 - pad);
  return base64;
}

// Node.js: Built-in Base64URL support
Buffer.from("data").toString("base64url"); // No + / or = chars

// Python
import base64
base64.urlsafe_b64encode(b"data")  # b'ZGF0YQ=='

// Command line: Convert with tr
echo -n "data" | base64 | tr '+/' '-_' | tr -d '='`}</code></pre>

      {/* Section 8: Performance */}
      <h2>{s.h2_perf}</h2>
      <p>{s.perf_p1}</p>
      <ul style={{ lineHeight: 1.8, marginBottom: 16 }}>
        <li dangerouslySetInnerHTML={{ __html: s.perf_li1 }} />
        <li dangerouslySetInnerHTML={{ __html: s.perf_li2 }} />
        <li dangerouslySetInnerHTML={{ __html: s.perf_li3 }} />
        <li dangerouslySetInnerHTML={{ __html: s.perf_li4 }} />
        <li dangerouslySetInnerHTML={{ __html: s.perf_li5 }} />
      </ul>

      <div style={{ overflowX: 'auto', marginBottom: 16 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
          <thead>
            <tr style={{ background: '#f1f5f9' }}>
              <th style={{ padding: '10px 16px', textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>Original Size</th>
              <th style={{ padding: '10px 16px', textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>Base64 Size</th>
              <th style={{ padding: '10px 16px', textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>Overhead</th>
              <th style={{ padding: '10px 16px', textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>Recommendation</th>
            </tr>
          </thead>
          <tbody>
            <tr><td style={{ padding: '10px 16px', borderBottom: '1px solid #e2e8f0' }}>1 KB</td><td style={{ padding: '10px 16px', borderBottom: '1px solid #e2e8f0' }}>1.37 KB</td><td style={{ padding: '10px 16px', borderBottom: '1px solid #e2e8f0' }}>+370 bytes</td><td style={{ padding: '10px 16px', borderBottom: '1px solid #e2e8f0' }}>OK for data URIs</td></tr>
            <tr><td style={{ padding: '10px 16px', borderBottom: '1px solid #e2e8f0' }}>10 KB</td><td style={{ padding: '10px 16px', borderBottom: '1px solid #e2e8f0' }}>13.7 KB</td><td style={{ padding: '10px 16px', borderBottom: '1px solid #e2e8f0' }}>+3.7 KB</td><td style={{ padding: '10px 16px', borderBottom: '1px solid #e2e8f0' }}>Consider file URL instead</td></tr>
            <tr><td style={{ padding: '10px 16px', borderBottom: '1px solid #e2e8f0' }}>100 KB</td><td style={{ padding: '10px 16px', borderBottom: '1px solid #e2e8f0' }}>137 KB</td><td style={{ padding: '10px 16px', borderBottom: '1px solid #e2e8f0' }}>+37 KB</td><td style={{ padding: '10px 16px', borderBottom: '1px solid #e2e8f0' }}>Use binary transfer</td></tr>
            <tr><td style={{ padding: '10px 16px', borderBottom: '1px solid #e2e8f0' }}>1 MB</td><td style={{ padding: '10px 16px', borderBottom: '1px solid #e2e8f0' }}>1.37 MB</td><td style={{ padding: '10px 16px', borderBottom: '1px solid #e2e8f0' }}>+370 KB</td><td style={{ padding: '10px 16px', borderBottom: '1px solid #e2e8f0' }}>Always use binary transfer</td></tr>
          </tbody>
        </table>
      </div>

      <p dangerouslySetInnerHTML={{ __html: s.perf_p2 }} />

      {/* Section 9: Security */}
      <h2>{s.h2_security}</h2>
      <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 8, padding: '16px 20px', marginBottom: 16 }}>
        <p style={{ margin: 0 }} dangerouslySetInnerHTML={{ __html: s.security_p1 }} />
      </div>
      <p>{s.security_p2}</p>
      <p>{s.security_p3}</p>
      <ul style={{ lineHeight: 1.8, marginBottom: 16 }}>
        <li dangerouslySetInnerHTML={{ __html: s.security_li1 }} />
        <li dangerouslySetInnerHTML={{ __html: s.security_li2 }} />
        <li dangerouslySetInnerHTML={{ __html: s.security_li3 }} />
        <li dangerouslySetInnerHTML={{ __html: s.security_li4 }} />
      </ul>

      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: 16, borderRadius: 8, overflowX: 'auto', fontSize: 13, lineHeight: 1.5 }}><code>{`// WRONG: Base64 is NOT security
const encoded = btoa("my-secret-password");
// Anyone can do: atob("bXktc2VjcmV0LXBhc3N3b3Jk") => "my-secret-password"

// RIGHT: Use proper encryption
// Node.js example with AES-256-GCM
const crypto = require("crypto");
const key = crypto.randomBytes(32);
const iv = crypto.randomBytes(12);
const cipher = crypto.createCipheriv("aes-256-gcm", key, iv);
let encrypted = cipher.update("my-secret-password", "utf8", "base64");
encrypted += cipher.final("base64");
// Now Base64 is used to ENCODE the encrypted output, not to protect it`}</code></pre>

      {/* Section 10: Common Use Cases */}
      <h2>{s.h2_usecases}</h2>

      <h3>{s.h3_use_email}</h3>
      <p>{s.use_email_p}</p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: 16, borderRadius: 8, overflowX: 'auto', fontSize: 13, lineHeight: 1.5 }}><code>{`MIME-Version: 1.0
Content-Type: multipart/mixed; boundary="boundary123"

--boundary123
Content-Type: text/plain

Hello, please find the attachment.

--boundary123
Content-Type: image/png
Content-Transfer-Encoding: base64
Content-Disposition: attachment; filename="logo.png"

iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAA
DUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==

--boundary123--`}</code></pre>

      <h3>{s.h3_use_jwt}</h3>
      <p>{s.use_jwt_p}</p>

      <h3>{s.h3_use_css}</h3>
      <p>{s.use_css_p}</p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: 16, borderRadius: 8, overflowX: 'auto', fontSize: 13, lineHeight: 1.5 }}><code>{`/* Critical CSS: embed small icons to avoid render-blocking requests */
.loading-spinner {
  background-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0i...);
  animation: spin 1s linear infinite;
}

/* Favicon as data URI in HTML */
<link rel="icon" href="data:image/svg+xml;base64,PHN2ZyB4bWxucz0i..." />`}</code></pre>

      <h3>{s.h3_use_k8s}</h3>
      <p>{s.use_k8s_p}</p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: 16, borderRadius: 8, overflowX: 'auto', fontSize: 13, lineHeight: 1.5 }}><code>{`# Kubernetes Secret manifest
apiVersion: v1
kind: Secret
metadata:
  name: db-credentials
type: Opaque
data:
  username: YWRtaW4=         # echo -n "admin" | base64
  password: cGFzc3dvcmQxMjM= # echo -n "password123" | base64

# Create from command line
kubectl create secret generic db-credentials \\
  --from-literal=username=admin \\
  --from-literal=password=password123

# Decode a secret
kubectl get secret db-credentials -o jsonpath="{.data.password}" | base64 -d`}</code></pre>

      <h3>{s.h3_use_upload}</h3>
      <p>{s.use_upload_p}</p>

      <h3>{s.h3_use_websocket}</h3>
      <p>{s.use_websocket_p}</p>

      <p style={{ marginTop: 16 }}><Link href={`/${lang}/tools/base64`} style={{ fontWeight: 600, color: '#2563eb' }}>{s.link_tool} &rarr;</Link></p>

      {/* FAQ Section */}
      <h2>{s.h2_faq}</h2>
      {[
        { q: s.faq1_q, a: s.faq1_a },
        { q: s.faq2_q, a: s.faq2_a },
        { q: s.faq3_q, a: s.faq3_a },
        { q: s.faq4_q, a: s.faq4_a },
        { q: s.faq5_q, a: s.faq5_a },
        { q: s.faq6_q, a: s.faq6_a },
        { q: s.faq7_q, a: s.faq7_a },
      ].map((faq, i) => (
        <div key={i} style={{ marginBottom: 20, borderBottom: '1px solid #e2e8f0', paddingBottom: 16 }}>
          <h3 style={{ fontSize: 16, margin: '0 0 8px 0' }}>{faq.q}</h3>
          <p style={{ margin: 0, color: '#475569', lineHeight: 1.7 }}>{faq.a}</p>
        </div>
      ))}

      {/* Conclusion */}
      <h2>{s.conclusion_title}</h2>
      <p>{s.conclusion}</p>
      <p><Link href={`/${lang}/tools/base64`} style={{ fontWeight: 600, color: '#2563eb' }}>{s.link_tool_bottom} &rarr;</Link></p>
    </>
  );
}
