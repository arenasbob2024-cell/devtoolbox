import Link from 'next/link';

const t: Record<string, Record<string, string>> = {
  en: {
    intro: '<strong>Base64 encoding</strong> is one of the most widely used data encoding schemes in software development. From embedding images in HTML and CSS to transmitting binary data through text-based protocols like HTTP and SMTP, Base64 is everywhere. This comprehensive guide explains how Base64 works at the bit level, covers all major use cases, provides working code examples in JavaScript, Python, and the command line, and discusses URL-safe Base64, performance considerations, and when to avoid Base64 altogether.',
    linkTool: 'Encode and decode Base64 instantly with our free online tool.',
    h2_what: 'What Is Base64 Encoding?',
    whatDesc1: 'Base64 is a binary-to-text encoding scheme that represents binary data using 64 printable ASCII characters. It was designed to safely transmit binary data through systems that only support text, such as email (MIME), URLs, and JSON payloads.',
    whatDesc2: 'The name "Base64" comes from the fact that it uses a 64-character alphabet: <code>A-Z</code> (26), <code>a-z</code> (26), <code>0-9</code> (10), <code>+</code> (1), and <code>/</code> (1). The <code>=</code> character is used for padding. Every 3 bytes of input data produces exactly 4 Base64 characters, which means Base64-encoded data is approximately <strong>33% larger</strong> than the original.',
    whatDesc3: 'Base64 is <strong>not encryption</strong>. It provides no security whatsoever. Anyone can decode Base64 data without a key. Its purpose is purely encoding: converting binary data into a text-safe format.',
    h2_how: 'How Base64 Works: Step-by-Step',
    howDesc1: 'The Base64 encoding process converts every group of 3 input bytes (24 bits) into 4 output characters (6 bits each). Here is the step-by-step process:',
    howSteps: '<ol><li>Take 3 bytes of input data (24 bits total).</li><li>Split these 24 bits into four 6-bit groups.</li><li>Map each 6-bit value (0-63) to its corresponding character in the Base64 alphabet.</li><li>If the input length is not a multiple of 3, add padding (<code>=</code>) to make the output length a multiple of 4.</li></ol>',
    howDesc2: 'Let us trace through encoding the string "Hi!" as an example:',
    h2_uses: 'Common Use Cases for Base64',
    usesDesc: 'Base64 encoding appears in many areas of web development and software engineering:',
    use1_title: '1. Data URIs (Embedding Images in HTML/CSS)',
    use1_desc: 'Data URIs allow you to embed small files directly in HTML or CSS, eliminating an HTTP request. This is especially useful for small icons, SVGs, and fonts:',
    use2_title: '2. JWT Tokens (JSON Web Tokens)',
    use2_desc: 'JWTs use Base64URL encoding (a URL-safe variant) to encode the header and payload segments. The token format is <code>header.payload.signature</code>, where header and payload are Base64URL-encoded JSON:',
    use3_title: '3. API Authentication (HTTP Basic Auth)',
    use3_desc: 'HTTP Basic Authentication encodes the username and password as a Base64 string in the Authorization header:',
    use4_title: '4. Email Attachments (MIME)',
    use4_desc: 'Email protocols (SMTP) were designed for 7-bit ASCII text. Binary attachments like images, PDFs, and documents are Base64-encoded before being included in the email body. The MIME standard (RFC 2045) defines Base64 as one of the Content-Transfer-Encoding methods.',
    use5_title: '5. Kubernetes Secrets',
    use5_desc: 'Kubernetes stores secret values as Base64-encoded strings in YAML manifests. This is not for security (Kubernetes secrets are not encrypted by default) but for safely storing binary data in YAML:',
    use6_title: '6. Storing Binary Data in JSON',
    use6_desc: 'JSON does not support binary data natively. When you need to include binary data (images, files, certificates) in a JSON payload, Base64 encoding is the standard approach:',
    h2_js: 'Base64 in JavaScript',
    jsDesc1: 'JavaScript provides built-in functions for Base64 encoding and decoding in both browser and Node.js environments:',
    jsDesc2: 'Important notes: <code>btoa()</code> and <code>atob()</code> only work with ASCII strings in browsers. For Unicode text, you need to encode to UTF-8 first. Node.js uses the <code>Buffer</code> class which handles binary data natively.',
    h2_python: 'Base64 in Python',
    pythonDesc: 'Python provides the <code>base64</code> module in its standard library with support for standard Base64, URL-safe Base64, and Base32/Base16 encoding:',
    h2_cli: 'Base64 on the Command Line',
    cliDesc: 'Both Linux/macOS and Windows provide built-in Base64 encoding and decoding tools:',
    h2_urlsafe: 'URL-Safe Base64 Encoding',
    urlsafeDesc1: 'Standard Base64 uses <code>+</code> and <code>/</code> characters which have special meaning in URLs. URL-safe Base64 (also called Base64URL, defined in RFC 4648) replaces these:',
    urlsafeTable: '<table><thead><tr><th>Character</th><th>Standard Base64</th><th>URL-Safe Base64</th></tr></thead><tbody><tr><td>62nd char</td><td><code>+</code></td><td><code>-</code> (hyphen)</td></tr><tr><td>63rd char</td><td><code>/</code></td><td><code>_</code> (underscore)</td></tr><tr><td>Padding</td><td><code>=</code></td><td>Usually omitted</td></tr></tbody></table>',
    urlsafeDesc2: 'URL-safe Base64 is used in JWT tokens, URL parameters, filename-safe encoding, and anywhere Base64 data appears in URLs or filenames.',
    h2_perf: 'Performance Considerations',
    perfDesc1: 'While Base64 is ubiquitous, it has performance implications you should be aware of:',
    perfTip1: '<strong>33% size overhead</strong>: Every 3 bytes become 4 characters. A 1MB image becomes ~1.37MB when Base64-encoded. For large files, this overhead is significant.',
    perfTip2: '<strong>CPU cost</strong>: Encoding and decoding require processing every byte. For bulk operations (thousands of files), consider binary transfer methods instead.',
    perfTip3: '<strong>No compression</strong>: Base64-encoded data does not compress well because the encoding destroys the patterns that compression algorithms rely on. Always compress before encoding, not after.',
    perfTip4: '<strong>Data URI limits</strong>: While modern browsers support large data URIs, embedding large Base64 images in HTML increases page weight and blocks rendering. Use data URIs only for images under 5KB.',
    perfTip5: '<strong>Alternative for large files</strong>: For files over 10KB, use proper binary transfer (multipart form data, binary WebSocket frames, or direct file downloads) instead of Base64.',
    h2_avoid: 'When NOT to Use Base64',
    avoidDesc: 'Base64 is not always the right choice. Avoid it in these situations:',
    avoidList: '<ul><li><strong>Large file transfers</strong>: Use multipart/form-data or binary protocols instead</li><li><strong>Security/encryption</strong>: Base64 is not encryption. Use AES, RSA, or similar algorithms</li><li><strong>Large images in HTML</strong>: Use regular <code>&lt;img&gt;</code> tags with proper caching headers</li><li><strong>Database storage</strong>: Most databases support BLOB types for binary data</li><li><strong>When bandwidth matters</strong>: The 33% overhead adds up on metered connections</li></ul>',
    h2_faq: 'Frequently Asked Questions',
    faq1_q: 'What is Base64 encoding used for?',
    faq1_a: 'Base64 encoding converts binary data to text so it can be safely transmitted through text-only systems. Common uses include embedding images in HTML/CSS (data URIs), JWT tokens, HTTP Basic authentication, email attachments (MIME), Kubernetes secrets, and storing binary data in JSON.',
    faq2_q: 'How do I Base64 encode a string in JavaScript?',
    faq2_a: 'In the browser, use btoa() to encode and atob() to decode ASCII strings. For Unicode strings, encode to UTF-8 first: btoa(unescape(encodeURIComponent(str))). In Node.js, use Buffer.from(str).toString("base64") to encode and Buffer.from(b64, "base64").toString() to decode.',
    faq3_q: 'Is Base64 encoding the same as encryption?',
    faq3_a: 'No. Base64 is an encoding scheme, not encryption. Anyone can decode Base64 data without a key. It provides zero security. For security, use proper encryption algorithms like AES or RSA. Base64 is only for converting binary data to a text-safe format.',
    faq4_q: 'Why does Base64 make data 33% larger?',
    faq4_a: 'Base64 represents each group of 3 bytes (24 bits) as 4 characters (6 bits each). Since 4/3 = 1.333, the output is 33% larger. Additionally, padding characters (=) may add a few extra bytes. This overhead is the trade-off for text-safe binary representation.',
    faq5_q: 'What is the difference between Base64 and Base64URL?',
    faq5_a: 'Standard Base64 uses + and / which have special meaning in URLs. Base64URL replaces + with - (hyphen) and / with _ (underscore), and usually omits the = padding. Base64URL is used in JWT tokens, URL parameters, and filenames where + and / would cause issues.',
    conclusion: '<strong>Base64 encoding</strong> is a fundamental tool in every developer\'s toolkit. It bridges the gap between binary data and text-based systems, enabling data URIs, JWT tokens, API authentication, and email attachments. Understanding how it works at the bit level, knowing when to use URL-safe variants, and being aware of the 33% size overhead will help you use Base64 effectively. For quick encoding and decoding, try our free online tool.',
    linkToolBottom: 'Encode and decode Base64 with our free online tool.',
  },
  zh: {
    intro: '<strong>Base64 编码</strong>是软件开发中最广泛使用的数据编码方案之一。从在 HTML 和 CSS 中嵌入图片到通过 HTTP 和 SMTP 等文本协议传输二进制数据，Base64 无处不在。本指南从位级别解释其工作原理，涵盖所有主要用例，提供 JavaScript、Python 和命令行代码示例。',
    linkTool: '使用我们的免费在线工具即时编码和解码 Base64。',
    h2_what: '什么是 Base64 编码？',
    whatDesc1: 'Base64 是一种二进制转文本的编码方案，使用 64 个可打印 ASCII 字符表示二进制数据。它设计用于通过仅支持文本的系统安全传输二进制数据。',
    whatDesc2: '"Base64" 名称来自使用 64 个字符的字母表：<code>A-Z</code>（26）、<code>a-z</code>（26）、<code>0-9</code>（10）、<code>+</code>（1）和 <code>/</code>（1）。<code>=</code> 用于填充。每 3 字节输入产生 4 个 Base64 字符，编码后数据约<strong>增大 33%</strong>。',
    whatDesc3: 'Base64 <strong>不是加密</strong>。它不提供任何安全性。任何人都可以解码。其目的纯粹是编码：将二进制数据转换为文本安全格式。',
    h2_how: 'Base64 工作原理：逐步解析',
    howDesc1: 'Base64 编码将每组 3 个输入字节（24 位）转换为 4 个输出字符（每个 6 位）：',
    howSteps: '<ol><li>取 3 字节输入数据（共 24 位）。</li><li>将 24 位分为四个 6 位组。</li><li>将每个 6 位值（0-63）映射到 Base64 字母表中的字符。</li><li>如果输入长度不是 3 的倍数，添加填充（<code>=</code>）。</li></ol>',
    howDesc2: '以编码字符串 "Hi!" 为例：',
    h2_uses: 'Base64 的常见用例',
    usesDesc: 'Base64 编码出现在 Web 开发和软件工程的许多领域：',
    use1_title: '1. Data URI（在 HTML/CSS 中嵌入图片）',
    use1_desc: 'Data URI 允许直接在 HTML 或 CSS 中嵌入小文件，消除 HTTP 请求。适合小图标和 SVG：',
    use2_title: '2. JWT 令牌',
    use2_desc: 'JWT 使用 Base64URL 编码（URL 安全变体）编码头部和载荷部分：',
    use3_title: '3. API 认证（HTTP Basic Auth）',
    use3_desc: 'HTTP 基本认证将用户名和密码编码为 Authorization 头中的 Base64 字符串：',
    use4_title: '4. 邮件附件（MIME）',
    use4_desc: 'SMTP 协议为 7 位 ASCII 设计。二进制附件在包含在邮件正文前需要 Base64 编码。',
    use5_title: '5. Kubernetes Secrets',
    use5_desc: 'Kubernetes 将秘密值存储为 YAML 清单中的 Base64 编码字符串：',
    use6_title: '6. 在 JSON 中存储二进制数据',
    use6_desc: 'JSON 原生不支持二进制数据。Base64 编码是在 JSON 载荷中包含二进制数据的标准方式：',
    h2_js: 'JavaScript 中的 Base64',
    jsDesc1: 'JavaScript 在浏览器和 Node.js 环境中提供内置的 Base64 编码和解码函数：',
    jsDesc2: '注意：<code>btoa()</code> 和 <code>atob()</code> 在浏览器中只处理 ASCII 字符串。Unicode 文本需要先编码为 UTF-8。',
    h2_python: 'Python 中的 Base64',
    pythonDesc: 'Python 标准库的 <code>base64</code> 模块支持标准 Base64、URL 安全 Base64 和 Base32/Base16 编码：',
    h2_cli: '命令行 Base64',
    cliDesc: 'Linux/macOS 和 Windows 都提供内置的 Base64 编码解码工具：',
    h2_urlsafe: 'URL 安全的 Base64 编码',
    urlsafeDesc1: '标准 Base64 使用在 URL 中有特殊含义的 <code>+</code> 和 <code>/</code> 字符。URL 安全 Base64 替换了这些：',
    urlsafeTable: '<table><thead><tr><th>字符</th><th>标准 Base64</th><th>URL 安全 Base64</th></tr></thead><tbody><tr><td>第 62 个字符</td><td><code>+</code></td><td><code>-</code>（连字符）</td></tr><tr><td>第 63 个字符</td><td><code>/</code></td><td><code>_</code>（下划线）</td></tr><tr><td>填充</td><td><code>=</code></td><td>通常省略</td></tr></tbody></table>',
    urlsafeDesc2: 'URL 安全 Base64 用于 JWT 令牌、URL 参数、文件名安全编码等场景。',
    h2_perf: '性能考量',
    perfDesc1: 'Base64 虽然无处不在，但有性能影响需要注意：',
    perfTip1: '<strong>33% 大小开销</strong>：每 3 字节变为 4 字符。1MB 图片编码后约 1.37MB。',
    perfTip2: '<strong>CPU 成本</strong>：编码解码需处理每个字节。批量操作考虑二进制传输。',
    perfTip3: '<strong>不利于压缩</strong>：Base64 数据压缩效果差。应先压缩后编码。',
    perfTip4: '<strong>Data URI 限制</strong>：大型 Base64 图片增加页面重量。仅对 5KB 以下图片使用。',
    perfTip5: '<strong>大文件替代方案</strong>：超过 10KB 的文件使用 multipart form data 或二进制 WebSocket。',
    h2_avoid: '何时不使用 Base64',
    avoidDesc: 'Base64 并非总是正确选择。在以下场景中避免使用：',
    avoidList: '<ul><li><strong>大文件传输</strong>：使用 multipart/form-data 或二进制协议</li><li><strong>安全/加密</strong>：Base64 不是加密，使用 AES、RSA 等算法</li><li><strong>HTML 中的大图片</strong>：使用带缓存头的普通 img 标签</li><li><strong>数据库存储</strong>：大多数数据库支持 BLOB 类型</li><li><strong>带宽敏感</strong>：33% 开销在计量连接上会累积</li></ul>',
    h2_faq: '常见问题',
    faq1_q: 'Base64 编码用于什么？',
    faq1_a: 'Base64 将二进制数据转换为文本以便安全传输。常见用途包括 Data URI、JWT 令牌、HTTP Basic 认证、邮件附件和 Kubernetes Secrets。',
    faq2_q: '如何在 JavaScript 中 Base64 编码字符串？',
    faq2_a: '浏览器中使用 btoa() 编码，atob() 解码。Unicode 需先 encodeURIComponent。Node.js 使用 Buffer.from(str).toString("base64")。',
    faq3_q: 'Base64 编码等同于加密吗？',
    faq3_a: '不是。Base64 是编码方案，不是加密。任何人无需密钥即可解码。安全需求请使用 AES 或 RSA。',
    faq4_q: '为什么 Base64 使数据增大 33%？',
    faq4_a: 'Base64 用 4 个字符表示 3 个字节。4/3 = 1.333，输出增大 33%。这是文本安全表示的代价。',
    faq5_q: 'Base64 和 Base64URL 有什么区别？',
    faq5_a: '标准 Base64 用 + 和 /，在 URL 中有特殊含义。Base64URL 用 - 替换 + ，用 _ 替换 /，通常省略填充。JWT 和 URL 参数使用 Base64URL。',
    conclusion: '<strong>Base64 编码</strong>是每个开发者工具箱中的基础工具。它连接了二进制数据和文本系统，实现了 Data URI、JWT、API 认证等功能。理解位级工作原理、URL 安全变体和 33% 大小开销将帮助您有效使用 Base64。',
    linkToolBottom: '使用我们的免费在线工具编码和解码 Base64。',
  },
  fr: {
    intro: 'L\'<strong>encodage Base64</strong> est l\'un des schemas d\'encodage les plus utilises. Ce guide explique son fonctionnement, ses cas d\'utilisation et fournit des exemples en JavaScript, Python et en ligne de commande.',
    linkTool: 'Encodez et decodez Base64 avec notre outil gratuit.',
    h2_what: 'Qu\'est-ce que l\'encodage Base64 ?',
    whatDesc1: 'Base64 est un schema d\'encodage binaire-vers-texte utilisant 64 caracteres ASCII imprimables.',
    whatDesc2: 'Le nom vient de l\'alphabet de 64 caracteres : A-Z, a-z, 0-9, + et /. = est utilise pour le padding.',
    whatDesc3: 'Base64 n\'est <strong>pas du chiffrement</strong>. Il ne fournit aucune securite.',
    h2_how: 'Comment fonctionne Base64',
    howDesc1: 'Le processus convertit chaque groupe de 3 octets en 4 caracteres :',
    howSteps: '<ol><li>Prenez 3 octets (24 bits).</li><li>Divisez en quatre groupes de 6 bits.</li><li>Mappez chaque valeur au caractere Base64.</li><li>Ajoutez du padding si necessaire.</li></ol>',
    howDesc2: 'Exemple avec la chaine "Hi!" :',
    h2_uses: 'Cas d\'utilisation courants',
    usesDesc: 'Base64 apparait dans de nombreux domaines :',
    use1_title: '1. Data URIs',
    use1_desc: 'Integration de fichiers directement dans HTML/CSS :',
    use2_title: '2. Tokens JWT',
    use2_desc: 'Les JWT utilisent Base64URL pour encoder l\'en-tete et le payload :',
    use3_title: '3. Authentification HTTP Basic',
    use3_desc: 'Le nom d\'utilisateur et mot de passe sont encodes en Base64 :',
    use4_title: '4. Pieces jointes email (MIME)',
    use4_desc: 'Les pieces jointes binaires sont encodees en Base64 pour SMTP.',
    use5_title: '5. Secrets Kubernetes',
    use5_desc: 'Kubernetes stocke les secrets en Base64 dans les manifestes YAML.',
    use6_title: '6. Donnees binaires en JSON',
    use6_desc: 'Base64 est le standard pour inclure des donnees binaires dans JSON.',
    h2_js: 'Base64 en JavaScript',
    jsDesc1: 'JavaScript fournit btoa() et atob() pour le navigateur, Buffer pour Node.js :',
    jsDesc2: 'btoa() et atob() ne fonctionnent qu\'avec l\'ASCII. Pour l\'Unicode, encodez d\'abord en UTF-8.',
    h2_python: 'Base64 en Python',
    pythonDesc: 'Le module base64 de Python supporte Base64 standard et URL-safe :',
    h2_cli: 'Base64 en ligne de commande',
    cliDesc: 'Linux/macOS et Windows fournissent des outils Base64 integres :',
    h2_urlsafe: 'Base64 URL-safe',
    urlsafeDesc1: 'Le Base64 standard utilise + et / qui ont une signification speciale dans les URLs.',
    urlsafeTable: '<table><thead><tr><th>Caractere</th><th>Base64 standard</th><th>Base64 URL-safe</th></tr></thead><tbody><tr><td>62e</td><td>+</td><td>- (tiret)</td></tr><tr><td>63e</td><td>/</td><td>_ (underscore)</td></tr><tr><td>Padding</td><td>=</td><td>Generalement omis</td></tr></tbody></table>',
    urlsafeDesc2: 'Utilise dans les JWT, parametres URL et noms de fichiers.',
    h2_perf: 'Considerations de performance',
    perfDesc1: 'Base64 a des implications de performance :',
    perfTip1: '<strong>33% de surcharge</strong> en taille.',
    perfTip2: '<strong>Cout CPU</strong> pour l\'encodage/decodage.',
    perfTip3: '<strong>Mauvaise compression</strong> des donnees Base64.',
    perfTip4: '<strong>Limites Data URI</strong> : uniquement pour les images < 5KB.',
    perfTip5: '<strong>Alternative</strong> : multipart form data pour les gros fichiers.',
    h2_avoid: 'Quand ne pas utiliser Base64',
    avoidDesc: 'Evitez Base64 dans ces situations :',
    avoidList: '<ul><li>Gros fichiers : multipart/form-data</li><li>Securite : AES, RSA</li><li>Grandes images en HTML : balise img avec cache</li><li>Stockage : BLOB en base de donnees</li></ul>',
    h2_faq: 'Questions frequentes',
    faq1_q: 'A quoi sert l\'encodage Base64 ?',
    faq1_a: 'Base64 convertit les donnees binaires en texte pour une transmission sure. Utilise pour les Data URIs, JWT, authentification HTTP et MIME.',
    faq2_q: 'Comment encoder en Base64 en JavaScript ?',
    faq2_a: 'btoa() pour encoder, atob() pour decoder. Buffer.from() en Node.js.',
    faq3_q: 'Base64 est-il du chiffrement ?',
    faq3_a: 'Non. Base64 est un encodage, pas du chiffrement. Utilisez AES ou RSA pour la securite.',
    faq4_q: 'Pourquoi Base64 augmente la taille de 33% ?',
    faq4_a: '3 octets deviennent 4 caracteres (4/3 = 1.333 soit 33% de plus).',
    faq5_q: 'Quelle difference entre Base64 et Base64URL ?',
    faq5_a: 'Base64URL remplace + par - et / par _ pour etre compatible avec les URLs.',
    conclusion: 'L\'<strong>encodage Base64</strong> est un outil fondamental. Utilisez notre outil en ligne pour l\'encodage et le decodage rapides.',
    linkToolBottom: 'Encodez et decodez Base64 avec notre outil gratuit.',
  },
};

export default function Base64EncodingGuide({ lang }: { lang: string }) {
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
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <p dangerouslySetInnerHTML={{ __html: s.intro }} />
      <p><Link href={`/${lang}/tools/base64`} style={{ fontWeight: 600 }}>{s.linkTool}</Link></p>

      {/* What Is Base64 */}
      <h2>{s.h2_what}</h2>
      <p dangerouslySetInnerHTML={{ __html: s.whatDesc1 }} />
      <p dangerouslySetInnerHTML={{ __html: s.whatDesc2 }} />
      <p dangerouslySetInnerHTML={{ __html: s.whatDesc3 }} />

      <pre><code className="language-text">{`The Base64 Alphabet (RFC 4648):
Index  Char    Index  Char    Index  Char    Index  Char
─────────────────────────────────────────────────────────
  0     A       16    Q       32    g       48    w
  1     B       17    R       33    h       49    x
  2     C       18    S       34    i       50    y
  3     D       19    T       35    j       51    z
  4     E       20    U       36    k       52    0
  5     F       21    V       37    l       53    1
  6     G       22    W       38    m       54    2
  7     H       23    X       39    n       55    3
  8     I       24    Y       40    o       56    4
  9     J       25    Z       41    p       57    5
 10     K       26    a       42    q       58    6
 11     L       27    b       43    r       59    7
 12     M       28    c       44    s       60    8
 13     N       29    d       45    t       61    9
 14     O       30    e       46    u       62    +
 15     P       31    f       47    v       63    /

Padding character: =`}</code></pre>

      {/* How It Works */}
      <h2>{s.h2_how}</h2>
      <p dangerouslySetInnerHTML={{ __html: s.howDesc1 }} />
      <div dangerouslySetInnerHTML={{ __html: s.howSteps }} />
      <p dangerouslySetInnerHTML={{ __html: s.howDesc2 }} />

      <pre><code className="language-text">{`Encoding "Hi!" step by step:

Step 1: Convert ASCII to binary
  'H' = 72  = 01001000
  'i' = 105 = 01101001
  '!' = 33  = 00100001

Step 2: Concatenate all bits
  01001000 01101001 00100001  (24 bits total)

Step 3: Split into 6-bit groups
  010010 | 000110 | 100100 | 100001
    18       6       36       33

Step 4: Map to Base64 alphabet
  18 → S
   6 → G
  36 → k
  33 → h

Result: "Hi!" → "SGkh"

─────────────────────────────────────────

Encoding "Hi" (only 2 bytes - needs padding):

  'H' = 01001000
  'i' = 01101001

  01001000 01101001 + 0000 (pad to 18 bits)

  010010 | 000110 | 100100
    18       6       36

  18 → S,  6 → G,  36 → k,  padding → =

Result: "Hi" → "SGk="`}</code></pre>

      {/* Use Cases */}
      <h2>{s.h2_uses}</h2>
      <p dangerouslySetInnerHTML={{ __html: s.usesDesc }} />

      <h3>{s.use1_title}</h3>
      <p dangerouslySetInnerHTML={{ __html: s.use1_desc }} />

      <pre><code className="language-html">{`<!-- Embedding a small PNG icon as a data URI -->
<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAAB
CAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII="
     alt="1x1 pixel" width="16" height="16" />

<!-- SVG data URI in CSS -->
<style>
.icon-arrow {
  background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz
0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2
h0PSIyNCI+PHBhdGggZD0iTTEyIDRsLTEuNDEgMS40MUwxNi4xNyAxMUg0dj
JoMTIuMTdsLTUuNTggNS41OUwxMiAyMGw4LTh6Ii8+PC9zdmc+');
  width: 24px;
  height: 24px;
}
</style>

<!-- Inline font as data URI (for critical fonts) -->
@font-face {
  font-family: 'CriticalFont';
  src: url('data:font/woff2;base64,d09GMgABAAAAA...') format('woff2');
  font-display: swap;
}`}</code></pre>

      <h3>{s.use2_title}</h3>
      <p dangerouslySetInnerHTML={{ __html: s.use2_desc }} />

      <pre><code className="language-javascript">{`// JWT token structure: header.payload.signature
// Each part is Base64URL-encoded

const header = {
  alg: "HS256",
  typ: "JWT"
};

const payload = {
  sub: "1234567890",
  name: "Alice",
  iat: 1516239022
};

// Base64URL encode (no padding, URL-safe chars)
function base64url(str) {
  return btoa(str)
    .replace(/\\+/g, '-')   // + → -
    .replace(/\\//g, '_')   // / → _
    .replace(/=+$/, '');    // remove padding
}

const encodedHeader = base64url(JSON.stringify(header));
// "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"

const encodedPayload = base64url(JSON.stringify(payload));
// "eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkFsaWNlIiwiaWF0IjoxNTE2MjM5MDIyfQ"

// Final JWT: header.payload.signature
// eyJhbGci...IkpXVCJ9.eyJzdWIi...MjM5MDIyfQ.signature_here`}</code></pre>

      <h3>{s.use3_title}</h3>
      <p dangerouslySetInnerHTML={{ __html: s.use3_desc }} />

      <pre><code className="language-javascript">{`// HTTP Basic Authentication
const username = 'admin';
const password = 'secret123';

// Encode credentials as Base64
const credentials = btoa(username + ':' + password);
// "YWRtaW46c2VjcmV0MTIz"

// Set the Authorization header
fetch('https://api.example.com/data', {
  headers: {
    'Authorization': 'Basic ' + credentials
    // "Authorization: Basic YWRtaW46c2VjcmV0MTIz"
  }
});

// Equivalent curl command:
// curl -H "Authorization: Basic YWRtaW46c2VjcmV0MTIz" https://api.example.com/data
// or simply:
// curl -u admin:secret123 https://api.example.com/data`}</code></pre>

      <h3>{s.use5_title}</h3>
      <p dangerouslySetInnerHTML={{ __html: s.use5_desc }} />

      <pre><code className="language-yaml">{`# Kubernetes Secret manifest
apiVersion: v1
kind: Secret
metadata:
  name: my-app-secrets
type: Opaque
data:
  # Values must be Base64-encoded
  # echo -n "mypassword" | base64 → bXlwYXNzd29yZA==
  database-password: bXlwYXNzd29yZA==
  # echo -n "sk-abc123xyz" | base64 → c2stYWJjMTIzeHl6
  api-key: c2stYWJjMTIzeHl6

---
# Using stringData (Kubernetes encodes automatically)
apiVersion: v1
kind: Secret
metadata:
  name: my-app-secrets-v2
type: Opaque
stringData:
  # Plain text - Kubernetes handles Base64 encoding
  database-password: mypassword
  api-key: sk-abc123xyz`}</code></pre>

      <h3>{s.use6_title}</h3>
      <p dangerouslySetInnerHTML={{ __html: s.use6_desc }} />

      <pre><code className="language-json">{`{
  "document": {
    "name": "report.pdf",
    "content_type": "application/pdf",
    "data": "JVBERi0xLjQKJeLjz9MKMSAwIG9iago8PC9UeXBlL..."
  },
  "avatar": {
    "format": "png",
    "width": 128,
    "height": 128,
    "data": "iVBORw0KGgoAAAANSUhEUgAAAIAAAACA..."
  }
}`}</code></pre>

      {/* JavaScript */}
      <h2>{s.h2_js}</h2>
      <p dangerouslySetInnerHTML={{ __html: s.jsDesc1 }} />

      <pre><code className="language-javascript">{`// ========== Browser: btoa() and atob() ==========

// Encode ASCII string to Base64
const encoded = btoa('Hello, World!');
console.log(encoded);  // "SGVsbG8sIFdvcmxkIQ=="

// Decode Base64 to ASCII string
const decoded = atob('SGVsbG8sIFdvcmxkIQ==');
console.log(decoded);  // "Hello, World!"

// ========== Unicode strings (browser) ==========

// btoa() fails with non-ASCII characters
// btoa('Hello ') → Error!

// Solution: encode to UTF-8 first
function utf8ToBase64(str) {
  return btoa(
    encodeURIComponent(str).replace(/%([0-9A-F]{2})/g,
      (_, p1) => String.fromCharCode(parseInt(p1, 16))
    )
  );
}

function base64ToUtf8(b64) {
  return decodeURIComponent(
    atob(b64).split('').map(c =>
      '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
    ).join('')
  );
}

// Modern approach (using TextEncoder/TextDecoder)
function encodeBase64(str) {
  const bytes = new TextEncoder().encode(str);
  const binString = Array.from(bytes, b => String.fromCodePoint(b)).join('');
  return btoa(binString);
}

function decodeBase64(b64) {
  const binString = atob(b64);
  const bytes = Uint8Array.from(binString, c => c.codePointAt(0));
  return new TextDecoder().decode(bytes);
}

// ========== Node.js: Buffer ==========

// Encode string to Base64
const base64 = Buffer.from('Hello, World!').toString('base64');
console.log(base64);  // "SGVsbG8sIFdvcmxkIQ=="

// Decode Base64 to string
const text = Buffer.from('SGVsbG8sIFdvcmxkIQ==', 'base64').toString('utf-8');
console.log(text);  // "Hello, World!"

// Encode binary data (file) to Base64
const fs = require('fs');
const imageBase64 = fs.readFileSync('image.png').toString('base64');
const dataUri = 'data:image/png;base64,' + imageBase64;

// URL-safe Base64 in Node.js
const urlSafe = Buffer.from('Hello!').toString('base64url');
console.log(urlSafe);  // "SGVsbG8h" (no padding, URL-safe chars)`}</code></pre>

      <p dangerouslySetInnerHTML={{ __html: s.jsDesc2 }} />

      {/* Python */}
      <h2>{s.h2_python}</h2>
      <p dangerouslySetInnerHTML={{ __html: s.pythonDesc }} />

      <pre><code className="language-python">{`import base64

# ========== Standard Base64 ==========

# Encode string to Base64
text = "Hello, World!"
encoded = base64.b64encode(text.encode('utf-8'))
print(encoded)  # b'SGVsbG8sIFdvcmxkIQ=='
print(encoded.decode('ascii'))  # "SGVsbG8sIFdvcmxkIQ=="

# Decode Base64 to string
decoded = base64.b64decode('SGVsbG8sIFdvcmxkIQ==')
print(decoded.decode('utf-8'))  # "Hello, World!"

# ========== URL-Safe Base64 ==========

data = b'\\xfb\\xff\\xfe'  # bytes with +/- in standard Base64
standard = base64.b64encode(data)        # b'+//+'
urlsafe  = base64.urlsafe_b64encode(data)  # b'-__-'

# Decode URL-safe Base64
decoded = base64.urlsafe_b64decode('-__-')

# ========== File encoding ==========

# Encode a file to Base64
with open('image.png', 'rb') as f:
    file_base64 = base64.b64encode(f.read()).decode('ascii')

# Decode Base64 to a file
with open('output.png', 'wb') as f:
    f.write(base64.b64decode(file_base64))

# ========== Working with JSON ==========
import json

payload = {
    "name": "document.pdf",
    "data": base64.b64encode(open('doc.pdf', 'rb').read()).decode('ascii')
}
json_str = json.dumps(payload)

# ========== Base32 and Base16 (Hex) ==========

base32 = base64.b32encode(b'Hello')  # b'JBSWY3DP'
hex_encoded = base64.b16encode(b'Hello')  # b'48656C6C6F'`}</code></pre>

      {/* Command Line */}
      <h2>{s.h2_cli}</h2>
      <p dangerouslySetInnerHTML={{ __html: s.cliDesc }} />

      <pre><code className="language-bash">{`# ========== Linux / macOS ==========

# Encode a string
echo -n "Hello, World!" | base64
# SGVsbG8sIFdvcmxkIQ==

# Decode a Base64 string
echo "SGVsbG8sIFdvcmxkIQ==" | base64 --decode
# Hello, World!

# Encode a file
base64 image.png > image.b64
# or
cat image.png | base64 > image.b64

# Decode a file
base64 --decode image.b64 > image_restored.png

# Pipe from curl - encode API response
curl -s https://api.example.com/data | base64

# One-liner: create a data URI from an image
echo "data:image/png;base64,$(base64 < icon.png)" > data-uri.txt

# ========== macOS-specific ==========
# macOS base64 uses -D instead of --decode
echo "SGVsbG8=" | base64 -D

# ========== OpenSSL (cross-platform) ==========
echo -n "Hello" | openssl base64
echo "SGVsbG8=" | openssl base64 -d

# ========== Windows PowerShell ==========
# Encode
[Convert]::ToBase64String([Text.Encoding]::UTF8.GetBytes("Hello"))

# Decode
[Text.Encoding]::UTF8.GetString([Convert]::FromBase64String("SGVsbG8="))`}</code></pre>

      {/* URL-Safe Base64 */}
      <h2>{s.h2_urlsafe}</h2>
      <p dangerouslySetInnerHTML={{ __html: s.urlsafeDesc1 }} />
      <div dangerouslySetInnerHTML={{ __html: s.urlsafeTable }} />
      <p dangerouslySetInnerHTML={{ __html: s.urlsafeDesc2 }} />

      <pre><code className="language-javascript">{`// URL-Safe Base64 encoding/decoding

// JavaScript (browser)
function toBase64Url(str) {
  return btoa(str)
    .replace(/\\+/g, '-')    // Replace + with -
    .replace(/\\//g, '_')    // Replace / with _
    .replace(/=+$/, '');     // Remove padding
}

function fromBase64Url(b64url) {
  // Restore standard Base64
  let b64 = b64url
    .replace(/-/g, '+')     // Restore +
    .replace(/_/g, '/');     // Restore /

  // Add padding if needed
  while (b64.length % 4 !== 0) {
    b64 += '=';
  }

  return atob(b64);
}

// Node.js (built-in support)
const encoded = Buffer.from('Hello!').toString('base64url');
// "SGVsbG8h"

const decoded = Buffer.from('SGVsbG8h', 'base64url').toString();
// "Hello!"

// Python
import base64
encoded = base64.urlsafe_b64encode(b'Hello!').rstrip(b'=')
# b'SGVsbG8h'

decoded = base64.urlsafe_b64decode(b'SGVsbG8h' + b'==')
# b'Hello!'`}</code></pre>

      {/* Performance */}
      <h2>{s.h2_perf}</h2>
      <p dangerouslySetInnerHTML={{ __html: s.perfDesc1 }} />
      <p dangerouslySetInnerHTML={{ __html: s.perfTip1 }} />
      <p dangerouslySetInnerHTML={{ __html: s.perfTip2 }} />
      <p dangerouslySetInnerHTML={{ __html: s.perfTip3 }} />
      <p dangerouslySetInnerHTML={{ __html: s.perfTip4 }} />
      <p dangerouslySetInnerHTML={{ __html: s.perfTip5 }} />

      <pre><code className="language-text">{`Base64 Size Overhead Examples:

Original Size    Base64 Size     Overhead
─────────────────────────────────────────
1 KB             1.37 KB         +37%
10 KB            13.7 KB         +37%
100 KB           137 KB          +37%
1 MB             1.37 MB         +37%
10 MB            13.7 MB         +37%

Note: Actual overhead varies slightly due to
padding and line breaks (MIME uses 76-char lines).

Best practice thresholds:
  < 5 KB   → Data URI (inline) is fine
  5-10 KB  → Consider external file
  > 10 KB  → Always use external file/binary transfer`}</code></pre>

      {/* When NOT to Use */}
      <h2>{s.h2_avoid}</h2>
      <p dangerouslySetInnerHTML={{ __html: s.avoidDesc }} />
      <div dangerouslySetInnerHTML={{ __html: s.avoidList }} />

      {/* FAQ */}
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
      <p><Link href={`/${lang}/tools/base64`} style={{ fontWeight: 600 }}>{s.linkToolBottom}</Link></p>

      {/* Internal links for SEO */}
      <h2>Related Developer Tools and Guides</h2>
      <ul>
        <li><Link href={`/${lang}/tools/base64`}>Base64 Encoder / Decoder</Link> - Encode and decode Base64 strings online</li>
        <li><Link href={`/${lang}/tools/image-base64`}>Image to Base64 Converter</Link> - Convert images to Base64 data URIs</li>
        <li><Link href={`/${lang}/tools/jwt-decoder`}>JWT Decoder</Link> - Decode and inspect JWT tokens</li>
        <li><Link href={`/${lang}/blog/base64-encoding-real-world-uses`}>Base64 Real-World Uses</Link> - 7 practical Base64 use cases</li>
        <li><Link href={`/${lang}/blog/base64-encode-decode-command-line`}>Base64 Command Line Guide</Link> - Encode and decode Base64 in the terminal</li>
        <li><Link href={`/${lang}/blog/base64-image-embed-html-css`}>Base64 Image Embedding</Link> - Embed Base64 images in HTML and CSS</li>
        <li><Link href={`/${lang}/blog/jwt-token-explained`}>JWT Token Explained</Link> - Understanding JSON Web Tokens</li>
        <li><Link href={`/${lang}/blog/api-authentication-oauth-jwt-apikey`}>API Authentication Guide</Link> - OAuth, JWT, and API key patterns</li>
      </ul>
    </>
  );
}
