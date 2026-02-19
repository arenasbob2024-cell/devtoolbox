import Link from 'next/link';

const t: Record<string, Record<string, string>> = {
  en: {
    intro: '<strong>Base64 encoding</strong> is one of the most fundamental data encoding schemes in computing. Every day, millions of developers use <strong>base64 encode</strong> and <strong>base64 decode</strong> operations to embed images in HTML, transmit binary data over text-based protocols, and handle authentication tokens. Whether you need a quick <strong>base64 encoder</strong> for a one-off task or want to understand the algorithm deeply, this comprehensive guide covers everything from the underlying 6-bit mapping to practical code examples in JavaScript, Python, Bash, and PowerShell. If you are looking to <strong>base64 encode decode online</strong>, our free tool makes it instant.',
    linkTool: 'Try our free online Base64 Encode/Decode tool instantly.',
    h2_what: 'What Is Base64 Encoding?',
    whatDesc1: 'Base64 is a binary-to-text encoding scheme that represents binary data using a set of 64 printable ASCII characters. The name "Base64" comes from the fact that it uses a 64-character alphabet: <code>A-Z</code> (26 characters), <code>a-z</code> (26 characters), <code>0-9</code> (10 characters), and two additional symbols <code>+</code> and <code>/</code>. A 65th character, <code>=</code>, is used for padding. The <strong>base64 encoder</strong> processes input data in groups of 3 bytes (24 bits) and converts them into 4 Base64 characters (4 x 6 bits = 24 bits).',
    whatDesc2: 'The algorithm works by taking every three bytes of input and splitting them into four 6-bit groups. Each 6-bit value (ranging from 0 to 63) maps to one character in the Base64 alphabet. When the input length is not a multiple of three, the encoder adds <code>=</code> padding characters to ensure the output length is always a multiple of four. One byte of remainder produces two Base64 characters followed by <code>==</code>, while two bytes of remainder produce three Base64 characters followed by <code>=</code>.',
    whatDesc3: 'Base64 encoding increases data size by approximately 33% (a ratio of 4:3). This overhead is the trade-off for being able to safely transmit binary data through text-only channels such as email, JSON, XML, and URL query parameters. Despite the size increase, <strong>base64 encode</strong> remains the standard choice because it is simple, universally supported, and does not require escaping special characters.',
    h2_howWorks: 'How Base64 Encode/Decode Works',
    howWorksDesc: 'Let us walk through the <strong>base64 encode</strong> process step by step, converting the ASCII string <code>Man</code> into Base64:',
    howWorksSteps: '<ol><li><strong>Convert to ASCII bytes</strong>: <code>M</code> = 77 (01001101), <code>a</code> = 97 (01100001), <code>n</code> = 110 (01101110).</li><li><strong>Concatenate the bits</strong>: 01001101 01100001 01101110 (24 bits total).</li><li><strong>Split into 6-bit groups</strong>: 010011 | 010110 | 000101 | 101110.</li><li><strong>Convert each 6-bit value to decimal</strong>: 19, 22, 5, 46.</li><li><strong>Map to Base64 characters</strong> using the alphabet table: 19 = <code>T</code>, 22 = <code>W</code>, 5 = <code>F</code>, 46 = <code>u</code>.</li></ol>',
    howWorksResult: 'The result is <code>TWFu</code>. To <strong>base64 decode</strong> this string, reverse the process: look up each character in the table to get 6-bit values, concatenate all bits, and split back into 8-bit bytes to recover the original data.',
    howWorksPadding: '<strong>Padding example</strong>: Encoding <code>Ma</code> (only 2 bytes = 16 bits) produces the bit string 01001101 01100001. We need 18 bits (three 6-bit groups) for three Base64 characters, so two zero bits are appended: 010011 | 010110 | 000100. This maps to <code>TWE</code> plus one <code>=</code> padding, giving the final result <code>TWE=</code>. For a single byte <code>M</code>, the result is <code>TQ==</code> with two padding characters.',
    h2_useCases: 'Common Base64 Use Cases',
    useCasesDesc: '<strong>Base64 encoding</strong> appears everywhere in modern software development. Here are the most important use cases:',
    useCase1: '<strong>Data URIs (Base64 encode image)</strong>: You can embed images directly in HTML or CSS using data URIs like <code>data:image/png;base64,iVBOR...</code>. This eliminates extra HTTP requests for small images such as icons, logos, and thumbnails. To <strong>base64 encode image</strong> files, you convert the binary image data to a Base64 string and embed it inline. This technique is widely used for email signatures, single-page applications, and CSS sprites.',
    useCase2: '<strong>Email attachments (MIME)</strong>: The MIME standard uses Base64 to encode binary attachments in email messages. Since email protocols (SMTP) were originally designed to transmit 7-bit ASCII text, binary files like images, PDFs, and documents must be Base64-encoded before being included as attachments. The <code>Content-Transfer-Encoding: base64</code> header tells the email client to decode the data.',
    useCase3: '<strong>API authentication (HTTP Basic Auth)</strong>: HTTP Basic Authentication encodes the <code>username:password</code> pair using Base64 and sends it in the <code>Authorization: Basic dXNlcjpwYXNz</code> header. While Base64 is not encryption (it is trivially reversible), it ensures the credentials are safely transmitted as ASCII text. Always use HTTPS to protect Base64-encoded credentials in transit.',
    useCase4: '<strong>JSON Web Tokens (JWT)</strong>: JWTs consist of three Base64URL-encoded segments separated by dots: <code>header.payload.signature</code>. The header and payload are JSON objects that are Base64URL-encoded (not encrypted) to form a compact, URL-safe token. Developers frequently need to <strong>base64 decode</strong> JWT segments for debugging and inspection.',
    useCase5: '<strong>URL-safe data transfer</strong>: When you need to pass binary or structured data through URLs, cookies, or query parameters, Base64 encoding ensures the data contains only safe ASCII characters. Base64URL (a variant using <code>-</code> and <code>_</code> instead of <code>+</code> and <code>/</code>) is specifically designed for URL contexts.',
    h2_codeExamples: 'Base64 Encode/Decode Code Examples',
    codeJsTitle: 'JavaScript Base64 Encode/Decode',
    codeJsDesc: 'In the browser, <strong>javascript base64 encode</strong> is done with <code>btoa()</code> and decoding with <code>atob()</code>. For Node.js, use the <code>Buffer</code> class. Note that <code>btoa()</code> only handles Latin-1 characters; for Unicode strings, you need to encode to UTF-8 first:',
    codePyTitle: 'Python Base64 Encode/Decode',
    codePyDesc: 'In Python, <strong>python base64 encode</strong> uses the built-in <code>base64</code> module. The module provides functions for standard Base64, URL-safe Base64, and other variants:',
    codeBashTitle: 'Bash / Linux Base64 Encode/Decode',
    codeBashDesc: 'On Linux and macOS, <strong>bash base64 encode</strong> uses the <code>base64</code> command-line utility. This is the simplest way to <strong>linux base64 encode</strong> data from the terminal:',
    codePsTitle: 'PowerShell Base64 Encode/Decode',
    codePsDesc: 'In Windows PowerShell, <strong>powershell base64 encode</strong> uses the .NET <code>[Convert]</code> class. PowerShell works with UTF-16LE encoding by default:',
    h2_table: 'Base64 Encoding Table',
    tableDesc: 'The complete Base64 alphabet maps each 6-bit value (0-63) to a printable ASCII character. This is the standard table defined in RFC 4648:',
    h2_urlSafe: 'Base64 URL-Safe Encoding',
    urlSafeDesc1: 'Standard Base64 uses <code>+</code> and <code>/</code> characters which have special meanings in URLs. <strong>Base64URL encoding</strong> replaces these with URL-safe alternatives: <code>+</code> becomes <code>-</code> (hyphen) and <code>/</code> becomes <code>_</code> (underscore). Additionally, the <code>=</code> padding is typically omitted since the data length can be inferred.',
    urlSafeDesc2: 'Base64URL is defined in RFC 4648 Section 5 and is the encoding used in JSON Web Tokens (JWT), OAuth 2.0 PKCE code verifiers, and many modern APIs. When you <strong>base64 encode</strong> data for use in URLs, query parameters, or filenames, always use the URL-safe variant to avoid encoding issues.',
    urlSafeCode: 'Here is a comparison of standard Base64 vs Base64URL encoding:',
    h2_imageEncode: 'Base64 Image Encoding',
    imageEncodeDesc1: 'One of the most popular uses of Base64 is embedding images directly in HTML and CSS. When you <strong>base64 encode image</strong> files, you create a data URI that can replace an image URL. The format is: <code>data:[media-type];base64,[encoded-data]</code>.',
    imageEncodeDesc2: 'Common use cases for <strong>base64 encode image</strong> include: inline images in HTML emails (where external URLs may be blocked), small icons and UI elements embedded directly in CSS (eliminating HTTP requests), embedding images in JSON API responses, and bundling assets in single-page applications.',
    imageEncodeDesc3: '<strong>Performance considerations</strong>: Base64-encoded images are approximately 33% larger than the original binary files. For images larger than a few kilobytes, it is usually more efficient to serve them as separate files with proper caching headers. Base64 embedding is best for small images (under 10KB), inline SVGs, and situations where reducing HTTP requests is critical.',
    imageEncodeHtml: 'Using Base64 images in HTML:',
    imageEncodeCss: 'Using Base64 images in CSS:',
    imageEncodeJs: 'Converting an image to Base64 in JavaScript (browser):',
    h2_faq: 'Frequently Asked Questions',
    faq1_q: 'What is Base64 encoding used for?',
    faq1_a: 'Base64 encoding is used to convert binary data into ASCII text so it can be safely transmitted over text-based protocols. The most common use cases include: embedding images in HTML/CSS via data URIs, encoding email attachments (MIME), transmitting binary data in JSON/XML APIs, HTTP Basic Authentication headers, JSON Web Tokens (JWT), and storing binary data in text-only databases or configuration files. Base64 encoding ensures that binary data is not corrupted during transport through systems that only support ASCII text.',
    faq2_q: 'How do I Base64 encode a string in JavaScript?',
    faq2_a: 'In the browser, use btoa() to Base64 encode a string: btoa("Hello World") returns "SGVsbG8gV29ybGQ=". For decoding, use atob("SGVsbG8gV29ybGQ=") which returns "Hello World". For Unicode strings, first encode to UTF-8: btoa(unescape(encodeURIComponent(text))). In Node.js, use Buffer.from("Hello World").toString("base64") for encoding, and Buffer.from(encoded, "base64").toString("utf-8") for decoding.',
    faq3_q: 'Is Base64 encoding the same as encryption?',
    faq3_a: 'No, Base64 encoding is NOT encryption. Base64 is a reversible encoding scheme that anyone can decode without a key. It provides zero security and should never be used to protect sensitive data. Base64 simply converts binary data to text format for safe transport. If you need to protect data, use proper encryption algorithms like AES-256 or RSA. Base64 is often confused with encryption because encoded strings look unreadable, but they can be decoded instantly by anyone.',
    conclusion: 'Base64 encoding is a foundational skill for every developer. From embedding images in data URIs to debugging JWT tokens, understanding how to <strong>base64 encode</strong> and <strong>base64 decode</strong> data is essential for modern web development. Bookmark this guide for quick reference, and use our free online tool for instant encoding and decoding.',
    linkToolBottom: 'Base64 encode and decode strings instantly with our free online tool.',
  },
  zh: {
    intro: '<strong>Base64 编码</strong>是计算机领域最基础的数据编码方案之一。每天有数百万开发者使用 <strong>base64 encode</strong> 和 <strong>base64 decode</strong> 操作来嵌入图片到 HTML、通过文本协议传输二进制数据以及处理认证令牌。无论你需要一个快速的 <strong>base64 编码器</strong>来处理一次性任务，还是想深入理解算法，本综合指南涵盖了从底层 6 位映射到 JavaScript、Python、Bash 和 PowerShell 实际代码示例的所有内容。如果你想在线进行 base64 编码解码，我们的免费工具可以即时完成。',
    linkTool: '立即试用我们的免费在线 Base64 编码/解码工具。',
    h2_what: '什么是 Base64 编码？',
    whatDesc1: 'Base64 是一种二进制到文本的编码方案，使用 64 个可打印 ASCII 字符来表示二进制数据。"Base64"这个名称来自它使用的 64 字符字母表：<code>A-Z</code>（26个）、<code>a-z</code>（26个）、<code>0-9</code>（10个）以及两个额外符号 <code>+</code> 和 <code>/</code>。第 65 个字符 <code>=</code> 用于填充。Base64 编码器以 3 字节（24 位）为一组处理输入数据，将其转换为 4 个 Base64 字符（4 x 6 位 = 24 位）。',
    whatDesc2: '该算法将每三个字节的输入拆分为四个 6 位组。每个 6 位值（范围 0 到 63）映射到 Base64 字母表中的一个字符。当输入长度不是三的倍数时，编码器添加 <code>=</code> 填充字符以确保输出长度始终是四的倍数。一个字节的余数产生两个 Base64 字符后跟 <code>==</code>，两个字节的余数产生三个 Base64 字符后跟 <code>=</code>。',
    whatDesc3: 'Base64 编码会使数据大小增加约 33%（4:3 的比率）。这种开销是为了能够通过纯文本通道（如电子邮件、JSON、XML 和 URL 查询参数）安全传输二进制数据而付出的代价。尽管体积增加，Base64 编码仍是标准选择，因为它简单、普遍支持，且不需要转义特殊字符。',
    h2_howWorks: 'Base64 编码/解码工作原理',
    howWorksDesc: '让我们逐步演示 base64 编码过程，将 ASCII 字符串 <code>Man</code> 转换为 Base64：',
    howWorksSteps: '<ol><li><strong>转换为 ASCII 字节</strong>：<code>M</code> = 77 (01001101)，<code>a</code> = 97 (01100001)，<code>n</code> = 110 (01101110)。</li><li><strong>连接位串</strong>：01001101 01100001 01101110（共 24 位）。</li><li><strong>分成 6 位组</strong>：010011 | 010110 | 000101 | 101110。</li><li><strong>将每个 6 位值转为十进制</strong>：19、22、5、46。</li><li><strong>查表映射为 Base64 字符</strong>：19 = <code>T</code>，22 = <code>W</code>，5 = <code>F</code>，46 = <code>u</code>。</li></ol>',
    howWorksResult: '结果是 <code>TWFu</code>。要 base64 解码此字符串，逆转过程：查表获取每个字符的 6 位值，连接所有位，再拆分为 8 位字节恢复原始数据。',
    howWorksPadding: '<strong>填充示例</strong>：编码 <code>Ma</code>（仅 2 字节 = 16 位）产生位串 01001101 01100001。需要 18 位（三个 6 位组）对应三个 Base64 字符，因此追加两个零位：010011 | 010110 | 000100。映射为 <code>TWE</code> 加一个 <code>=</code> 填充，最终结果为 <code>TWE=</code>。对于单字节 <code>M</code>，结果是 <code>TQ==</code>，带两个填充字符。',
    h2_useCases: '常见 Base64 使用场景',
    useCasesDesc: '<strong>Base64 编码</strong>在现代软件开发中无处不在。以下是最重要的使用场景：',
    useCase1: '<strong>数据 URI（Base64 编码图片）</strong>：你可以使用数据 URI 将图片直接嵌入 HTML 或 CSS，如 <code>data:image/png;base64,iVBOR...</code>。这消除了小图片（如图标、Logo 和缩略图）的额外 HTTP 请求。Base64 编码图片广泛用于电子邮件签名、单页应用和 CSS 精灵图。',
    useCase2: '<strong>电子邮件附件（MIME）</strong>：MIME 标准使用 Base64 编码电子邮件中的二进制附件。由于电子邮件协议（SMTP）最初设计为传输 7 位 ASCII 文本，图片、PDF 等二进制文件必须先进行 Base64 编码才能作为附件。',
    useCase3: '<strong>API 认证（HTTP Basic Auth）</strong>：HTTP 基本认证使用 Base64 编码 <code>username:password</code> 对，放入 <code>Authorization: Basic</code> 请求头。虽然 Base64 不是加密，但它确保凭据作为 ASCII 文本安全传输。始终使用 HTTPS 保护 Base64 编码的凭据。',
    useCase4: '<strong>JSON Web Token（JWT）</strong>：JWT 由三段 Base64URL 编码的部分组成：<code>header.payload.signature</code>。开发者经常需要 base64 解码 JWT 段进行调试和检查。',
    useCase5: '<strong>URL 安全数据传输</strong>：当需要通过 URL、Cookie 或查询参数传递二进制或结构化数据时，Base64 编码确保数据仅包含安全的 ASCII 字符。Base64URL 变体使用 <code>-</code> 和 <code>_</code> 替代 <code>+</code> 和 <code>/</code>，专为 URL 上下文设计。',
    h2_codeExamples: 'Base64 编码/解码代码示例',
    codeJsTitle: 'JavaScript Base64 编码/解码',
    codeJsDesc: '在浏览器中，JavaScript base64 编码使用 <code>btoa()</code>，解码使用 <code>atob()</code>。Node.js 中使用 <code>Buffer</code> 类。注意 <code>btoa()</code> 只处理 Latin-1 字符；对于 Unicode 字符串，需要先编码为 UTF-8：',
    codePyTitle: 'Python Base64 编码/解码',
    codePyDesc: 'Python 中 base64 编码使用内置的 <code>base64</code> 模块。该模块提供标准 Base64、URL 安全 Base64 等多种变体的函数：',
    codeBashTitle: 'Bash / Linux Base64 编码/解码',
    codeBashDesc: '在 Linux 和 macOS 上，bash base64 编码使用 <code>base64</code> 命令行工具。这是从终端进行 linux base64 编码的最简方式：',
    codePsTitle: 'PowerShell Base64 编码/解码',
    codePsDesc: '在 Windows PowerShell 中，base64 编码使用 .NET 的 <code>[Convert]</code> 类。PowerShell 默认使用 UTF-16LE 编码：',
    h2_table: 'Base64 编码表',
    tableDesc: '完整的 Base64 字母表将每个 6 位值（0-63）映射到一个可打印 ASCII 字符。这是 RFC 4648 定义的标准表：',
    h2_urlSafe: 'Base64 URL 安全编码',
    urlSafeDesc1: '标准 Base64 使用 <code>+</code> 和 <code>/</code> 字符，这些在 URL 中有特殊含义。<strong>Base64URL 编码</strong>用 URL 安全的替代字符：<code>+</code> 变为 <code>-</code>（连字符），<code>/</code> 变为 <code>_</code>（下划线）。此外，<code>=</code> 填充通常被省略，因为数据长度可以推断。',
    urlSafeDesc2: 'Base64URL 定义在 RFC 4648 第 5 节，是 JWT、OAuth 2.0 PKCE 代码验证器和许多现代 API 使用的编码。当你为 URL、查询参数或文件名进行 base64 编码时，始终使用 URL 安全变体以避免编码问题。',
    urlSafeCode: '以下是标准 Base64 与 Base64URL 编码的对比：',
    h2_imageEncode: 'Base64 图片编码',
    imageEncodeDesc1: 'Base64 最流行的用途之一是将图片直接嵌入 HTML 和 CSS。当你 base64 编码图片文件时，会创建一个数据 URI 来替代图片 URL。格式为：<code>data:[媒体类型];base64,[编码数据]</code>。',
    imageEncodeDesc2: 'Base64 编码图片的常见场景包括：HTML 邮件中的内联图片（外部 URL 可能被阻止）、直接嵌入 CSS 的小图标和 UI 元素（消除 HTTP 请求）、JSON API 响应中嵌入图片、以及单页应用中打包资源。',
    imageEncodeDesc3: '<strong>性能考虑</strong>：Base64 编码的图片比原始二进制文件大约大 33%。对于大于几 KB 的图片，通常以独立文件加适当缓存头的方式提供更高效。Base64 嵌入最适合小图片（10KB 以下）、内联 SVG 和需要减少 HTTP 请求的场景。',
    imageEncodeHtml: '在 HTML 中使用 Base64 图片：',
    imageEncodeCss: '在 CSS 中使用 Base64 图片：',
    imageEncodeJs: '在 JavaScript（浏览器）中将图片转换为 Base64：',
    h2_faq: '常见问题',
    faq1_q: 'Base64 编码用于什么？',
    faq1_a: 'Base64 编码用于将二进制数据转换为 ASCII 文本，以便通过文本协议安全传输。最常见的场景包括：通过数据 URI 在 HTML/CSS 中嵌入图片、编码电子邮件附件（MIME）、在 JSON/XML API 中传输二进制数据、HTTP 基本认证头、JWT 以及在纯文本数据库或配置文件中存储二进制数据。',
    faq2_q: '如何在 JavaScript 中 Base64 编码字符串？',
    faq2_a: '在浏览器中，使用 btoa() 进行 Base64 编码：btoa("Hello World") 返回 "SGVsbG8gV29ybGQ="。解码使用 atob("SGVsbG8gV29ybGQ=") 返回 "Hello World"。对于 Unicode 字符串，先编码为 UTF-8：btoa(unescape(encodeURIComponent(text)))。在 Node.js 中，使用 Buffer.from("Hello World").toString("base64") 编码。',
    faq3_q: 'Base64 编码和加密一样吗？',
    faq3_a: '不，Base64 编码不是加密。Base64 是一种可逆编码方案，任何人无需密钥即可解码。它不提供安全性，不应用于保护敏感数据。Base64 只是将二进制数据转换为文本格式以便安全传输。如果需要保护数据，请使用 AES-256 或 RSA 等加密算法。',
    conclusion: 'Base64 编码是每个开发者的基础技能。从在数据 URI 中嵌入图片到调试 JWT 令牌，理解如何 base64 编码和解码数据对于现代 Web 开发至关重要。收藏本指南以备参考，并使用我们的免费在线工具进行即时编码和解码。',
    linkToolBottom: '使用我们的免费在线工具即时 Base64 编码和解码字符串。',
  },
  fr: {
    intro: '<strong>L\'encodage Base64</strong> est l\'un des schemas d\'encodage de donnees les plus fondamentaux en informatique. Chaque jour, des millions de developpeurs utilisent les operations <strong>base64 encode</strong> et <strong>base64 decode</strong> pour integrer des images dans du HTML, transmettre des donnees binaires et gerer des jetons d\'authentification. Ce guide complet couvre tout, de l\'algorithme de mappage 6 bits aux exemples de code pratiques en JavaScript, Python, Bash et PowerShell.',
    linkTool: 'Essayez notre outil gratuit d\'encodage/decodage Base64 en ligne.',
    h2_what: 'Qu\'est-ce que l\'encodage Base64 ?',
    whatDesc1: 'Base64 est un schema d\'encodage binaire vers texte qui represente les donnees binaires en utilisant 64 caracteres ASCII imprimables. L\'alphabet comprend : <code>A-Z</code> (26), <code>a-z</code> (26), <code>0-9</code> (10), plus <code>+</code> et <code>/</code>. Le caractere <code>=</code> est utilise pour le remplissage. L\'encodeur traite les donnees par groupes de 3 octets (24 bits) et les convertit en 4 caracteres Base64.',
    whatDesc2: 'L\'algorithme prend chaque trois octets et les divise en quatre groupes de 6 bits. Chaque valeur 6 bits (0 a 63) correspond a un caractere de l\'alphabet Base64. Quand la longueur n\'est pas un multiple de trois, des caracteres de remplissage <code>=</code> sont ajoutes.',
    whatDesc3: 'L\'encodage Base64 augmente la taille des donnees d\'environ 33%. Ce surcout est le compromis pour transmettre des donnees binaires en toute securite via des canaux texte.',
    h2_howWorks: 'Comment fonctionne l\'encodage/decodage Base64',
    howWorksDesc: 'Voyons etape par etape le processus d\'encodage base64, en convertissant la chaine ASCII <code>Man</code> :',
    howWorksSteps: '<ol><li><strong>Convertir en octets ASCII</strong> : <code>M</code>=77, <code>a</code>=97, <code>n</code>=110.</li><li><strong>Concatener les bits</strong> : 24 bits au total.</li><li><strong>Diviser en groupes de 6 bits</strong> : 4 groupes.</li><li><strong>Convertir en decimal</strong> : 19, 22, 5, 46.</li><li><strong>Mapper aux caracteres Base64</strong> : T, W, F, u.</li></ol>',
    howWorksResult: 'Le resultat est <code>TWFu</code>. Pour decoder, inversez le processus.',
    howWorksPadding: '<strong>Exemple de remplissage</strong> : Encoder <code>Ma</code> (2 octets) donne <code>TWE=</code>. Pour un seul octet <code>M</code>, le resultat est <code>TQ==</code>.',
    h2_useCases: 'Cas d\'utilisation courants de Base64',
    useCasesDesc: 'L\'encodage Base64 est omnipresent dans le developpement logiciel moderne :',
    useCase1: '<strong>URIs de donnees (images Base64)</strong> : Integrez des images directement dans le HTML/CSS avec <code>data:image/png;base64,...</code>, eliminant les requetes HTTP supplementaires.',
    useCase2: '<strong>Pieces jointes email (MIME)</strong> : Le standard MIME utilise Base64 pour encoder les fichiers binaires dans les emails.',
    useCase3: '<strong>Authentification API (HTTP Basic Auth)</strong> : L\'authentification HTTP basique encode la paire <code>utilisateur:mot_de_passe</code> en Base64.',
    useCase4: '<strong>JSON Web Tokens (JWT)</strong> : Les JWT sont composes de trois segments encodes en Base64URL.',
    useCase5: '<strong>Transfert de donnees URL-safe</strong> : Base64 assure que les donnees ne contiennent que des caracteres ASCII surs pour les URL.',
    h2_codeExamples: 'Exemples de code Base64 encodage/decodage',
    codeJsTitle: 'JavaScript Base64 encodage/decodage',
    codeJsDesc: 'Dans le navigateur, utilisez <code>btoa()</code> pour encoder et <code>atob()</code> pour decoder. Pour Node.js, utilisez <code>Buffer</code> :',
    codePyTitle: 'Python Base64 encodage/decodage',
    codePyDesc: 'En Python, utilisez le module integre <code>base64</code> :',
    codeBashTitle: 'Bash / Linux Base64 encodage/decodage',
    codeBashDesc: 'Sur Linux/macOS, utilisez la commande <code>base64</code> :',
    codePsTitle: 'PowerShell Base64 encodage/decodage',
    codePsDesc: 'Dans PowerShell, utilisez la classe .NET <code>[Convert]</code> :',
    h2_table: 'Table d\'encodage Base64',
    tableDesc: 'L\'alphabet Base64 complet mappe chaque valeur 6 bits (0-63) a un caractere ASCII imprimable (RFC 4648) :',
    h2_urlSafe: 'Encodage Base64 URL-Safe',
    urlSafeDesc1: 'Le Base64 standard utilise <code>+</code> et <code>/</code> qui ont des significations speciales dans les URL. <strong>Base64URL</strong> les remplace par <code>-</code> et <code>_</code>, et omet generalement le remplissage <code>=</code>.',
    urlSafeDesc2: 'Base64URL est defini dans la RFC 4648 Section 5 et est utilise dans les JWT, OAuth 2.0 PKCE et de nombreuses API modernes.',
    urlSafeCode: 'Comparaison entre Base64 standard et Base64URL :',
    h2_imageEncode: 'Encodage d\'images en Base64',
    imageEncodeDesc1: 'L\'une des utilisations les plus populaires de Base64 est l\'integration d\'images dans le HTML/CSS via des URIs de donnees au format <code>data:[type-media];base64,[donnees]</code>.',
    imageEncodeDesc2: 'Cas courants : images inline dans les emails HTML, petites icones en CSS, images dans les reponses API JSON, et assets dans les SPA.',
    imageEncodeDesc3: '<strong>Performance</strong> : Les images Base64 sont environ 33% plus lourdes. Pour les images de plus de quelques KB, servez-les comme fichiers separes. L\'integration Base64 est ideale pour les petites images (moins de 10KB).',
    imageEncodeHtml: 'Utilisation d\'images Base64 en HTML :',
    imageEncodeCss: 'Utilisation d\'images Base64 en CSS :',
    imageEncodeJs: 'Conversion d\'une image en Base64 en JavaScript :',
    h2_faq: 'Questions frequemment posees',
    faq1_q: 'A quoi sert l\'encodage Base64 ?',
    faq1_a: 'L\'encodage Base64 convertit les donnees binaires en texte ASCII pour une transmission sure via des protocoles texte : URIs de donnees, pieces jointes email, APIs JSON/XML, authentification HTTP Basic, JWT et stockage de donnees binaires.',
    faq2_q: 'Comment encoder une chaine en Base64 en JavaScript ?',
    faq2_a: 'Utilisez btoa("Hello World") qui retourne "SGVsbG8gV29ybGQ=". Pour decoder : atob("SGVsbG8gV29ybGQ="). Pour l\'Unicode : btoa(unescape(encodeURIComponent(text))). En Node.js : Buffer.from("Hello World").toString("base64").',
    faq3_q: 'L\'encodage Base64 est-il equivalent au chiffrement ?',
    faq3_a: 'Non. Base64 est un encodage reversible sans cle. Il n\'offre aucune securite et ne doit jamais proteger des donnees sensibles. Utilisez AES-256 ou RSA pour le chiffrement.',
    conclusion: 'L\'encodage Base64 est une competence fondamentale pour tout developpeur. Utilisez notre outil gratuit pour un encodage et decodage instantanes.',
    linkToolBottom: 'Encodez et decodez Base64 instantanement avec notre outil gratuit.',
  },
  de: {
    intro: '<strong>Base64-Kodierung</strong> ist eines der grundlegendsten Datenkodierungsschemata in der Informatik. Taglich verwenden Millionen von Entwicklern <strong>Base64-Encode</strong>- und <strong>Base64-Decode</strong>-Operationen, um Bilder in HTML einzubetten, Binardaten uber textbasierte Protokolle zu ubertragen und Authentifizierungstoken zu verarbeiten. Dieser umfassende Leitfaden deckt alles ab, vom 6-Bit-Mapping-Algorithmus bis zu praktischen Codebeispielen in JavaScript, Python, Bash und PowerShell.',
    linkTool: 'Testen Sie unser kostenloses Online Base64 Encode/Decode Tool.',
    h2_what: 'Was ist Base64-Kodierung?',
    whatDesc1: 'Base64 ist ein Binar-zu-Text-Kodierungsschema, das Binardaten mit 64 druckbaren ASCII-Zeichen darstellt. Das Alphabet umfasst: <code>A-Z</code> (26), <code>a-z</code> (26), <code>0-9</code> (10) sowie <code>+</code> und <code>/</code>. Das Zeichen <code>=</code> dient als Padding. Der Encoder verarbeitet Eingabedaten in 3-Byte-Gruppen (24 Bits) und wandelt sie in 4 Base64-Zeichen um.',
    whatDesc2: 'Der Algorithmus teilt jede Drei-Byte-Eingabe in vier 6-Bit-Gruppen. Jeder 6-Bit-Wert (0-63) wird einem Zeichen im Base64-Alphabet zugeordnet. Bei nicht durch drei teilbarer Eingabelange werden <code>=</code>-Padding-Zeichen angehangt.',
    whatDesc3: 'Base64-Kodierung erhoht die Datenmenge um etwa 33%. Dieser Overhead ist der Preis fur die sichere Ubertragung von Binardaten uber reine Textkanale.',
    h2_howWorks: 'Wie Base64-Kodierung/Dekodierung funktioniert',
    howWorksDesc: 'Schritt fur Schritt: Konvertierung des ASCII-Strings <code>Man</code> in Base64:',
    howWorksSteps: '<ol><li><strong>In ASCII-Bytes konvertieren</strong>: <code>M</code>=77, <code>a</code>=97, <code>n</code>=110.</li><li><strong>Bits verketten</strong>: 24 Bits gesamt.</li><li><strong>In 6-Bit-Gruppen teilen</strong>: 4 Gruppen.</li><li><strong>In Dezimal umrechnen</strong>: 19, 22, 5, 46.</li><li><strong>Auf Base64-Zeichen abbilden</strong>: T, W, F, u.</li></ol>',
    howWorksResult: 'Das Ergebnis ist <code>TWFu</code>. Zum Dekodieren wird der Prozess umgekehrt.',
    howWorksPadding: '<strong>Padding-Beispiel</strong>: <code>Ma</code> (2 Bytes) ergibt <code>TWE=</code>. Ein einzelnes Byte <code>M</code> ergibt <code>TQ==</code>.',
    h2_useCases: 'Haufige Base64-Anwendungsfalle',
    useCasesDesc: 'Base64-Kodierung ist in der modernen Softwareentwicklung allgegenwartig:',
    useCase1: '<strong>Data URIs (Base64-Bildkodierung)</strong>: Betten Sie Bilder direkt in HTML/CSS ein mit <code>data:image/png;base64,...</code>.',
    useCase2: '<strong>E-Mail-Anhange (MIME)</strong>: Der MIME-Standard verwendet Base64 zur Kodierung binarer E-Mail-Anhange.',
    useCase3: '<strong>API-Authentifizierung (HTTP Basic Auth)</strong>: HTTP Basic Auth kodiert <code>Benutzer:Passwort</code> in Base64.',
    useCase4: '<strong>JSON Web Tokens (JWT)</strong>: JWTs bestehen aus drei Base64URL-kodierten Segmenten.',
    useCase5: '<strong>URL-sichere Datenubertragung</strong>: Base64 stellt sicher, dass Daten nur sichere ASCII-Zeichen enthalten.',
    h2_codeExamples: 'Base64 Encode/Decode Codebeispiele',
    codeJsTitle: 'JavaScript Base64 Encode/Decode',
    codeJsDesc: 'Im Browser verwenden Sie <code>btoa()</code> zum Kodieren und <code>atob()</code> zum Dekodieren. In Node.js verwenden Sie <code>Buffer</code>:',
    codePyTitle: 'Python Base64 Encode/Decode',
    codePyDesc: 'In Python verwenden Sie das eingebaute <code>base64</code>-Modul:',
    codeBashTitle: 'Bash / Linux Base64 Encode/Decode',
    codeBashDesc: 'Unter Linux/macOS verwenden Sie den <code>base64</code>-Befehl:',
    codePsTitle: 'PowerShell Base64 Encode/Decode',
    codePsDesc: 'In PowerShell verwenden Sie die .NET <code>[Convert]</code>-Klasse:',
    h2_table: 'Base64-Kodierungstabelle',
    tableDesc: 'Das vollstandige Base64-Alphabet bildet jeden 6-Bit-Wert (0-63) auf ein druckbares ASCII-Zeichen ab (RFC 4648):',
    h2_urlSafe: 'Base64 URL-sichere Kodierung',
    urlSafeDesc1: 'Standard-Base64 verwendet <code>+</code> und <code>/</code>, die in URLs Sonderbedeutung haben. <strong>Base64URL</strong> ersetzt diese durch <code>-</code> und <code>_</code> und lasst das <code>=</code>-Padding typischerweise weg.',
    urlSafeDesc2: 'Base64URL ist in RFC 4648 Abschnitt 5 definiert und wird in JWT, OAuth 2.0 PKCE und vielen modernen APIs verwendet.',
    urlSafeCode: 'Vergleich zwischen Standard-Base64 und Base64URL:',
    h2_imageEncode: 'Base64-Bildkodierung',
    imageEncodeDesc1: 'Eine der beliebtesten Verwendungen von Base64 ist das Einbetten von Bildern in HTML/CSS uber Data URIs im Format <code>data:[Medientyp];base64,[Daten]</code>.',
    imageEncodeDesc2: 'Anwendungsfalle: Inline-Bilder in HTML-E-Mails, kleine Icons in CSS, Bilder in JSON-API-Antworten und Assets in SPAs.',
    imageEncodeDesc3: '<strong>Performance</strong>: Base64-kodierte Bilder sind etwa 33% grosser. Fur Bilder uber einige KB sind separate Dateien mit Caching effizienter. Base64 eignet sich fur kleine Bilder (unter 10KB).',
    imageEncodeHtml: 'Base64-Bilder in HTML verwenden:',
    imageEncodeCss: 'Base64-Bilder in CSS verwenden:',
    imageEncodeJs: 'Bild in Base64 konvertieren mit JavaScript:',
    h2_faq: 'Haufig gestellte Fragen',
    faq1_q: 'Wofur wird Base64-Kodierung verwendet?',
    faq1_a: 'Base64 konvertiert Binardaten in ASCII-Text fur sichere Ubertragung: Data URIs, E-Mail-Anhange, JSON/XML-APIs, HTTP Basic Auth, JWT und Speicherung binarer Daten in Textdatenbanken.',
    faq2_q: 'Wie kodiert man einen String in Base64 mit JavaScript?',
    faq2_a: 'Verwenden Sie btoa("Hello World") = "SGVsbG8gV29ybGQ=". Dekodierung: atob("SGVsbG8gV29ybGQ="). Fur Unicode: btoa(unescape(encodeURIComponent(text))). In Node.js: Buffer.from("Hello World").toString("base64").',
    faq3_q: 'Ist Base64-Kodierung dasselbe wie Verschlusselung?',
    faq3_a: 'Nein. Base64 ist eine umkehrbare Kodierung ohne Schlussel. Sie bietet keine Sicherheit. Verwenden Sie AES-256 oder RSA fur echte Verschlusselung.',
    conclusion: 'Base64-Kodierung ist eine grundlegende Fahigkeit fur jeden Entwickler. Nutzen Sie unser kostenloses Tool fur sofortiges Kodieren und Dekodieren.',
    linkToolBottom: 'Base64 sofort kodieren und dekodieren mit unserem kostenlosen Online-Tool.',
  },
  es: {
    intro: '<strong>La codificacion Base64</strong> es uno de los esquemas de codificacion de datos mas fundamentales en informatica. Cada dia, millones de desarrolladores usan operaciones de <strong>base64 encode</strong> y <strong>base64 decode</strong> para incrustar imagenes en HTML, transmitir datos binarios y manejar tokens de autenticacion. Esta guia completa cubre desde el algoritmo de mapeo de 6 bits hasta ejemplos de codigo practicos en JavaScript, Python, Bash y PowerShell.',
    linkTool: 'Prueba nuestra herramienta gratuita de codificacion/decodificacion Base64 en linea.',
    h2_what: 'Que es la codificacion Base64?',
    whatDesc1: 'Base64 es un esquema de codificacion de binario a texto que representa datos binarios usando 64 caracteres ASCII imprimibles. El alfabeto incluye: <code>A-Z</code> (26), <code>a-z</code> (26), <code>0-9</code> (10), mas <code>+</code> y <code>/</code>. El caracter <code>=</code> se usa como relleno. El codificador procesa datos en grupos de 3 bytes (24 bits) y los convierte en 4 caracteres Base64.',
    whatDesc2: 'El algoritmo toma cada tres bytes y los divide en cuatro grupos de 6 bits. Cada valor de 6 bits (0-63) se mapea a un caracter del alfabeto Base64. Cuando la longitud no es multiplo de tres, se agregan caracteres de relleno <code>=</code>.',
    whatDesc3: 'La codificacion Base64 aumenta el tamano de los datos aproximadamente un 33%. Esta sobrecarga es el precio por transmitir datos binarios de forma segura a traves de canales de solo texto.',
    h2_howWorks: 'Como funciona la codificacion/decodificacion Base64',
    howWorksDesc: 'Veamos paso a paso el proceso de codificacion base64, convirtiendo la cadena ASCII <code>Man</code>:',
    howWorksSteps: '<ol><li><strong>Convertir a bytes ASCII</strong>: <code>M</code>=77, <code>a</code>=97, <code>n</code>=110.</li><li><strong>Concatenar bits</strong>: 24 bits en total.</li><li><strong>Dividir en grupos de 6 bits</strong>: 4 grupos.</li><li><strong>Convertir a decimal</strong>: 19, 22, 5, 46.</li><li><strong>Mapear a caracteres Base64</strong>: T, W, F, u.</li></ol>',
    howWorksResult: 'El resultado es <code>TWFu</code>. Para decodificar, se invierte el proceso.',
    howWorksPadding: '<strong>Ejemplo de relleno</strong>: Codificar <code>Ma</code> (2 bytes) da <code>TWE=</code>. Para un solo byte <code>M</code>, el resultado es <code>TQ==</code>.',
    h2_useCases: 'Casos de uso comunes de Base64',
    useCasesDesc: 'La codificacion Base64 esta en todas partes en el desarrollo de software moderno:',
    useCase1: '<strong>URIs de datos (imagenes Base64)</strong>: Incrusta imagenes directamente en HTML/CSS con <code>data:image/png;base64,...</code>.',
    useCase2: '<strong>Adjuntos de email (MIME)</strong>: El estandar MIME usa Base64 para codificar archivos binarios en emails.',
    useCase3: '<strong>Autenticacion API (HTTP Basic Auth)</strong>: La autenticacion HTTP basica codifica <code>usuario:contrasena</code> en Base64.',
    useCase4: '<strong>JSON Web Tokens (JWT)</strong>: Los JWT consisten en tres segmentos codificados en Base64URL.',
    useCase5: '<strong>Transferencia de datos URL-safe</strong>: Base64 asegura que los datos solo contengan caracteres ASCII seguros.',
    h2_codeExamples: 'Ejemplos de codigo Base64 codificacion/decodificacion',
    codeJsTitle: 'JavaScript Base64 codificacion/decodificacion',
    codeJsDesc: 'En el navegador, usa <code>btoa()</code> para codificar y <code>atob()</code> para decodificar. En Node.js, usa <code>Buffer</code>:',
    codePyTitle: 'Python Base64 codificacion/decodificacion',
    codePyDesc: 'En Python, usa el modulo incorporado <code>base64</code>:',
    codeBashTitle: 'Bash / Linux Base64 codificacion/decodificacion',
    codeBashDesc: 'En Linux/macOS, usa el comando <code>base64</code>:',
    codePsTitle: 'PowerShell Base64 codificacion/decodificacion',
    codePsDesc: 'En PowerShell, usa la clase .NET <code>[Convert]</code>:',
    h2_table: 'Tabla de codificacion Base64',
    tableDesc: 'El alfabeto Base64 completo mapea cada valor de 6 bits (0-63) a un caracter ASCII imprimible (RFC 4648):',
    h2_urlSafe: 'Codificacion Base64 URL-Safe',
    urlSafeDesc1: 'El Base64 estandar usa <code>+</code> y <code>/</code> que tienen significados especiales en URLs. <strong>Base64URL</strong> los reemplaza por <code>-</code> y <code>_</code>, y normalmente omite el relleno <code>=</code>.',
    urlSafeDesc2: 'Base64URL esta definido en RFC 4648 Seccion 5 y se usa en JWT, OAuth 2.0 PKCE y muchas APIs modernas.',
    urlSafeCode: 'Comparacion entre Base64 estandar y Base64URL:',
    h2_imageEncode: 'Codificacion de imagenes en Base64',
    imageEncodeDesc1: 'Uno de los usos mas populares de Base64 es incrustar imagenes en HTML/CSS mediante URIs de datos con formato <code>data:[tipo-media];base64,[datos]</code>.',
    imageEncodeDesc2: 'Casos comunes: imagenes inline en emails HTML, iconos pequenos en CSS, imagenes en respuestas API JSON y assets en SPAs.',
    imageEncodeDesc3: '<strong>Rendimiento</strong>: Las imagenes Base64 son aproximadamente un 33% mas grandes. Para imagenes mayores de unos KB, es mas eficiente servirlas como archivos separados. Base64 es ideal para imagenes pequenas (menos de 10KB).',
    imageEncodeHtml: 'Uso de imagenes Base64 en HTML:',
    imageEncodeCss: 'Uso de imagenes Base64 en CSS:',
    imageEncodeJs: 'Convertir imagen a Base64 en JavaScript:',
    h2_faq: 'Preguntas frecuentes',
    faq1_q: 'Para que se usa la codificacion Base64?',
    faq1_a: 'Base64 convierte datos binarios en texto ASCII para transmision segura: URIs de datos, adjuntos de email, APIs JSON/XML, HTTP Basic Auth, JWT y almacenamiento de datos binarios en bases de datos de texto.',
    faq2_q: 'Como codifico una cadena en Base64 con JavaScript?',
    faq2_a: 'Usa btoa("Hello World") = "SGVsbG8gV29ybGQ=". Decodificacion: atob("SGVsbG8gV29ybGQ="). Para Unicode: btoa(unescape(encodeURIComponent(text))). En Node.js: Buffer.from("Hello World").toString("base64").',
    faq3_q: 'Es la codificacion Base64 lo mismo que el cifrado?',
    faq3_a: 'No. Base64 es una codificacion reversible sin clave. No ofrece seguridad. Usa AES-256 o RSA para cifrado real.',
    conclusion: 'La codificacion Base64 es una habilidad fundamental para todo desarrollador. Usa nuestra herramienta gratuita para codificar y decodificar al instante.',
    linkToolBottom: 'Codifica y decodifica Base64 al instante con nuestra herramienta gratuita en linea.',
  },
  ja: {
    intro: '<strong>Base64エンコーディング</strong>はコンピューティングにおける最も基本的なデータエンコーディングスキームの一つです。毎日何百万もの開発者が<strong>base64エンコード</strong>と<strong>base64デコード</strong>操作を使用して、HTMLへの画像埋め込み、テキストベースプロトコルでのバイナリデータ送信、認証トークンの処理を行っています。この包括的なガイドでは、6ビットマッピングアルゴリズムからJavaScript、Python、Bash、PowerShellの実践的なコード例まで、すべてをカバーします。',
    linkTool: '無料オンラインBase64エンコード/デコードツールをお試しください。',
    h2_what: 'Base64エンコーディングとは？',
    whatDesc1: 'Base64は、64個の印刷可能なASCII文字を使ってバイナリデータを表現するバイナリからテキストへのエンコーディングスキームです。アルファベットは<code>A-Z</code>（26）、<code>a-z</code>（26）、<code>0-9</code>（10）、<code>+</code>と<code>/</code>で構成されます。<code>=</code>はパディングに使用されます。エンコーダーは入力を3バイト（24ビット）のグループで処理し、4つのBase64文字に変換します。',
    whatDesc2: 'アルゴリズムは3バイトごとに4つの6ビットグループに分割します。各6ビット値（0〜63）はBase64アルファベットの1文字にマッピングされます。入力長が3の倍数でない場合、<code>=</code>パディング文字が追加されます。',
    whatDesc3: 'Base64エンコーディングはデータサイズを約33%増加させます。これはテキストのみのチャネルでバイナリデータを安全に送信するためのトレードオフです。',
    h2_howWorks: 'Base64エンコード/デコードの仕組み',
    howWorksDesc: 'ASCII文字列<code>Man</code>をBase64に変換するプロセスをステップバイステップで見てみましょう：',
    howWorksSteps: '<ol><li><strong>ASCIIバイトに変換</strong>：<code>M</code>=77、<code>a</code>=97、<code>n</code>=110。</li><li><strong>ビットを連結</strong>：合計24ビット。</li><li><strong>6ビットグループに分割</strong>：4グループ。</li><li><strong>10進数に変換</strong>：19、22、5、46。</li><li><strong>Base64文字にマッピング</strong>：T、W、F、u。</li></ol>',
    howWorksResult: '結果は<code>TWFu</code>です。デコードするにはプロセスを逆にします。',
    howWorksPadding: '<strong>パディング例</strong>：<code>Ma</code>（2バイト）のエンコード結果は<code>TWE=</code>。1バイトの<code>M</code>は<code>TQ==</code>になります。',
    h2_useCases: 'Base64の一般的な使用例',
    useCasesDesc: 'Base64エンコーディングは現代のソフトウェア開発のあらゆる場所に存在します：',
    useCase1: '<strong>データURI（Base64画像エンコード）</strong>：<code>data:image/png;base64,...</code>でHTML/CSSに画像を直接埋め込み、追加のHTTPリクエストを削減できます。',
    useCase2: '<strong>メール添付ファイル（MIME）</strong>：MIME標準はメールのバイナリ添付ファイルをBase64でエンコードします。',
    useCase3: '<strong>API認証（HTTP Basic Auth）</strong>：HTTP基本認証は<code>ユーザー名:パスワード</code>をBase64でエンコードします。',
    useCase4: '<strong>JSON Web Token（JWT）</strong>：JWTはBase64URLでエンコードされた3つのセグメントで構成されます。',
    useCase5: '<strong>URL安全データ転送</strong>：Base64はデータが安全なASCII文字のみを含むことを保証します。',
    h2_codeExamples: 'Base64エンコード/デコードのコード例',
    codeJsTitle: 'JavaScript Base64エンコード/デコード',
    codeJsDesc: 'ブラウザでは<code>btoa()</code>でエンコード、<code>atob()</code>でデコードします。Node.jsでは<code>Buffer</code>を使用します：',
    codePyTitle: 'Python Base64エンコード/デコード',
    codePyDesc: 'Pythonでは組み込みの<code>base64</code>モジュールを使用します：',
    codeBashTitle: 'Bash / Linux Base64エンコード/デコード',
    codeBashDesc: 'Linux/macOSでは<code>base64</code>コマンドを使用します：',
    codePsTitle: 'PowerShell Base64エンコード/デコード',
    codePsDesc: 'PowerShellでは.NETの<code>[Convert]</code>クラスを使用します：',
    h2_table: 'Base64エンコーディングテーブル',
    tableDesc: '完全なBase64アルファベットは各6ビット値（0-63）を印刷可能なASCII文字にマッピングします（RFC 4648）：',
    h2_urlSafe: 'Base64 URL安全エンコーディング',
    urlSafeDesc1: '標準Base64は<code>+</code>と<code>/</code>を使用しますが、URLでは特別な意味を持ちます。<strong>Base64URL</strong>はこれらを<code>-</code>と<code>_</code>に置き換え、<code>=</code>パディングも通常省略します。',
    urlSafeDesc2: 'Base64URLはRFC 4648セクション5で定義され、JWT、OAuth 2.0 PKCE、多くのモダンAPIで使用されています。',
    urlSafeCode: '標準Base64とBase64URLの比較：',
    h2_imageEncode: 'Base64画像エンコーディング',
    imageEncodeDesc1: 'Base64の最も人気のある用途の一つは、データURIを使ってHTML/CSSに画像を直接埋め込むことです。形式：<code>data:[メディアタイプ];base64,[データ]</code>。',
    imageEncodeDesc2: '一般的な使用例：HTMLメールのインライン画像、CSSの小さなアイコン、JSON APIレスポンスの画像、SPAのアセットバンドル。',
    imageEncodeDesc3: '<strong>パフォーマンス</strong>：Base64画像は約33%大きくなります。数KB以上の画像は別ファイルとして提供する方が効率的です。Base64は小さな画像（10KB以下）に最適です。',
    imageEncodeHtml: 'HTMLでBase64画像を使用：',
    imageEncodeCss: 'CSSでBase64画像を使用：',
    imageEncodeJs: 'JavaScriptで画像をBase64に変換：',
    h2_faq: 'よくある質問',
    faq1_q: 'Base64エンコーディングは何に使われますか？',
    faq1_a: 'Base64はバイナリデータをASCIIテキストに変換してテキストプロトコルで安全に送信するために使用されます。データURI、メール添付ファイル、JSON/XML API、HTTP Basic Auth、JWT、テキストデータベースでのバイナリ格納が主な用途です。',
    faq2_q: 'JavaScriptで文字列をBase64エンコードするには？',
    faq2_a: 'btoa("Hello World")で"SGVsbG8gV29ybGQ="を返します。デコード：atob("SGVsbG8gV29ybGQ=")。Unicode：btoa(unescape(encodeURIComponent(text)))。Node.js：Buffer.from("Hello World").toString("base64")。',
    faq3_q: 'Base64エンコーディングは暗号化と同じですか？',
    faq3_a: 'いいえ。Base64は鍵なしで誰でも復元できる可逆エンコーディングです。セキュリティは一切ありません。データ保護にはAES-256やRSAなどの暗号化を使用してください。',
    conclusion: 'Base64エンコーディングはすべての開発者にとって基本的なスキルです。無料オンラインツールで即座にエンコードとデコードを行えます。',
    linkToolBottom: '無料オンラインツールでBase64を即座にエンコード・デコード。',
  },
  ko: {
    intro: '<strong>Base64 인코딩</strong>은 컴퓨팅에서 가장 기본적인 데이터 인코딩 체계 중 하나입니다. 매일 수백만 명의 개발자가 <strong>base64 encode</strong>와 <strong>base64 decode</strong> 작업을 사용하여 HTML에 이미지를 임베드하고, 텍스트 기반 프로토콜로 바이너리 데이터를 전송하며, 인증 토큰을 처리합니다. 이 종합 가이드는 6비트 매핑 알고리즘부터 JavaScript, Python, Bash, PowerShell의 실용적인 코드 예제까지 모든 것을 다룹니다.',
    linkTool: '무료 온라인 Base64 인코딩/디코딩 도구를 사용해 보세요.',
    h2_what: 'Base64 인코딩이란?',
    whatDesc1: 'Base64는 64개의 인쇄 가능한 ASCII 문자를 사용하여 바이너리 데이터를 표현하는 바이너리-텍스트 인코딩 체계입니다. 알파벳은 <code>A-Z</code>(26), <code>a-z</code>(26), <code>0-9</code>(10), <code>+</code>와 <code>/</code>로 구성됩니다. <code>=</code>는 패딩에 사용됩니다. 인코더는 입력을 3바이트(24비트) 그룹으로 처리하여 4개의 Base64 문자로 변환합니다.',
    whatDesc2: '알고리즘은 3바이트 입력을 4개의 6비트 그룹으로 분할합니다. 각 6비트 값(0-63)은 Base64 알파벳의 한 문자에 매핑됩니다. 입력 길이가 3의 배수가 아닌 경우 <code>=</code> 패딩 문자가 추가됩니다.',
    whatDesc3: 'Base64 인코딩은 데이터 크기를 약 33% 증가시킵니다. 이 오버헤드는 텍스트 전용 채널을 통해 바이너리 데이터를 안전하게 전송하기 위한 대가입니다.',
    h2_howWorks: 'Base64 인코딩/디코딩 작동 원리',
    howWorksDesc: 'ASCII 문자열 <code>Man</code>을 Base64로 변환하는 과정을 단계별로 살펴보겠습니다:',
    howWorksSteps: '<ol><li><strong>ASCII 바이트로 변환</strong>: <code>M</code>=77, <code>a</code>=97, <code>n</code>=110.</li><li><strong>비트 연결</strong>: 총 24비트.</li><li><strong>6비트 그룹으로 분할</strong>: 4개 그룹.</li><li><strong>10진수로 변환</strong>: 19, 22, 5, 46.</li><li><strong>Base64 문자에 매핑</strong>: T, W, F, u.</li></ol>',
    howWorksResult: '결과는 <code>TWFu</code>입니다. 디코딩하려면 프로세스를 역으로 수행합니다.',
    howWorksPadding: '<strong>패딩 예제</strong>: <code>Ma</code>(2바이트)를 인코딩하면 <code>TWE=</code>이 됩니다. 단일 바이트 <code>M</code>은 <code>TQ==</code>가 됩니다.',
    h2_useCases: '일반적인 Base64 사용 사례',
    useCasesDesc: 'Base64 인코딩은 현대 소프트웨어 개발 곳곳에 존재합니다:',
    useCase1: '<strong>데이터 URI(Base64 이미지 인코딩)</strong>: <code>data:image/png;base64,...</code>로 HTML/CSS에 이미지를 직접 임베드하여 추가 HTTP 요청을 제거합니다.',
    useCase2: '<strong>이메일 첨부파일(MIME)</strong>: MIME 표준은 이메일의 바이너리 첨부파일을 Base64로 인코딩합니다.',
    useCase3: '<strong>API 인증(HTTP Basic Auth)</strong>: HTTP 기본 인증은 <code>사용자:비밀번호</code>를 Base64로 인코딩합니다.',
    useCase4: '<strong>JSON Web Token(JWT)</strong>: JWT는 Base64URL로 인코딩된 3개 세그먼트로 구성됩니다.',
    useCase5: '<strong>URL 안전 데이터 전송</strong>: Base64는 데이터가 안전한 ASCII 문자만 포함하도록 보장합니다.',
    h2_codeExamples: 'Base64 인코딩/디코딩 코드 예제',
    codeJsTitle: 'JavaScript Base64 인코딩/디코딩',
    codeJsDesc: '브라우저에서 <code>btoa()</code>로 인코딩, <code>atob()</code>로 디코딩합니다. Node.js에서는 <code>Buffer</code>를 사용합니다:',
    codePyTitle: 'Python Base64 인코딩/디코딩',
    codePyDesc: 'Python에서는 내장 <code>base64</code> 모듈을 사용합니다:',
    codeBashTitle: 'Bash / Linux Base64 인코딩/디코딩',
    codeBashDesc: 'Linux/macOS에서는 <code>base64</code> 명령을 사용합니다:',
    codePsTitle: 'PowerShell Base64 인코딩/디코딩',
    codePsDesc: 'PowerShell에서는 .NET <code>[Convert]</code> 클래스를 사용합니다:',
    h2_table: 'Base64 인코딩 테이블',
    tableDesc: '완전한 Base64 알파벳은 각 6비트 값(0-63)을 인쇄 가능한 ASCII 문자에 매핑합니다(RFC 4648):',
    h2_urlSafe: 'Base64 URL 안전 인코딩',
    urlSafeDesc1: '표준 Base64는 URL에서 특별한 의미를 가진 <code>+</code>와 <code>/</code>를 사용합니다. <strong>Base64URL</strong>은 이를 <code>-</code>와 <code>_</code>로 대체하고, <code>=</code> 패딩을 보통 생략합니다.',
    urlSafeDesc2: 'Base64URL은 RFC 4648 섹션 5에 정의되어 있으며, JWT, OAuth 2.0 PKCE, 많은 최신 API에서 사용됩니다.',
    urlSafeCode: '표준 Base64와 Base64URL 비교:',
    h2_imageEncode: 'Base64 이미지 인코딩',
    imageEncodeDesc1: 'Base64의 가장 인기 있는 용도 중 하나는 데이터 URI를 사용하여 HTML/CSS에 이미지를 직접 임베드하는 것입니다. 형식: <code>data:[미디어타입];base64,[데이터]</code>.',
    imageEncodeDesc2: '일반적인 사용 사례: HTML 이메일의 인라인 이미지, CSS의 작은 아이콘, JSON API 응답의 이미지, SPA의 자산 번들링.',
    imageEncodeDesc3: '<strong>성능 고려사항</strong>: Base64 이미지는 약 33% 더 큽니다. 수 KB 이상의 이미지는 별도 파일로 제공하는 것이 효율적입니다. Base64는 작은 이미지(10KB 이하)에 최적입니다.',
    imageEncodeHtml: 'HTML에서 Base64 이미지 사용:',
    imageEncodeCss: 'CSS에서 Base64 이미지 사용:',
    imageEncodeJs: 'JavaScript에서 이미지를 Base64로 변환:',
    h2_faq: '자주 묻는 질문',
    faq1_q: 'Base64 인코딩은 무엇에 사용되나요?',
    faq1_a: 'Base64는 바이너리 데이터를 ASCII 텍스트로 변환하여 텍스트 프로토콜을 통해 안전하게 전송합니다. 주요 용도: 데이터 URI, 이메일 첨부파일, JSON/XML API, HTTP Basic Auth, JWT, 텍스트 데이터베이스에 바이너리 저장.',
    faq2_q: 'JavaScript에서 문자열을 Base64로 인코딩하려면?',
    faq2_a: 'btoa("Hello World")는 "SGVsbG8gV29ybGQ="를 반환합니다. 디코딩: atob("SGVsbG8gV29ybGQ="). Unicode: btoa(unescape(encodeURIComponent(text))). Node.js: Buffer.from("Hello World").toString("base64").',
    faq3_q: 'Base64 인코딩은 암호화와 같은 건가요?',
    faq3_a: '아닙니다. Base64는 키 없이 누구나 복원할 수 있는 가역적 인코딩입니다. 보안성이 전혀 없습니다. 데이터 보호에는 AES-256이나 RSA 같은 암호화를 사용하세요.',
    conclusion: 'Base64 인코딩은 모든 개발자에게 필수적인 기술입니다. 무료 온라인 도구로 즉시 인코딩과 디코딩을 수행하세요.',
    linkToolBottom: '무료 온라인 도구로 Base64를 즉시 인코딩하고 디코딩하세요.',
  },
};

export default function Base64EncodeDecodeGuide({ lang }: { lang: string }) {
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
      <p><Link href={`/${lang}/tools/base64-encode-decode`} style={{ fontWeight: 600 }}>{s.linkTool}</Link></p>

      {/* Section 1: What is Base64 Encoding? */}
      <h2>{s.h2_what}</h2>
      <p dangerouslySetInnerHTML={{ __html: s.whatDesc1 }} />
      <p dangerouslySetInnerHTML={{ __html: s.whatDesc2 }} />
      <p dangerouslySetInnerHTML={{ __html: s.whatDesc3 }} />

      {/* Section 2: How Base64 Encode/Decode Works */}
      <h2>{s.h2_howWorks}</h2>
      <p dangerouslySetInnerHTML={{ __html: s.howWorksDesc }} />
      <div dangerouslySetInnerHTML={{ __html: s.howWorksSteps }} />
      <p dangerouslySetInnerHTML={{ __html: s.howWorksResult }} />
      <p dangerouslySetInnerHTML={{ __html: s.howWorksPadding }} />

      {/* Section 3: Common Base64 Use Cases */}
      <h2>{s.h2_useCases}</h2>
      <p dangerouslySetInnerHTML={{ __html: s.useCasesDesc }} />
      <p dangerouslySetInnerHTML={{ __html: s.useCase1 }} />
      <p dangerouslySetInnerHTML={{ __html: s.useCase2 }} />
      <p dangerouslySetInnerHTML={{ __html: s.useCase3 }} />
      <p dangerouslySetInnerHTML={{ __html: s.useCase4 }} />
      <p dangerouslySetInnerHTML={{ __html: s.useCase5 }} />

      {/* Section 4: Code Examples */}
      <h2>{s.h2_codeExamples}</h2>

      <h3>{s.codeJsTitle}</h3>
      <p dangerouslySetInnerHTML={{ __html: s.codeJsDesc }} />
      <pre><code>{`// ===== Browser: btoa() and atob() =====

// Base64 encode a string
const encoded = btoa('Hello World');
console.log(encoded); // "SGVsbG8gV29ybGQ="

// Base64 decode a string
const decoded = atob('SGVsbG8gV29ybGQ=');
console.log(decoded); // "Hello World"

// Handle Unicode strings (btoa only supports Latin-1)
function base64EncodeUnicode(str) {
  return btoa(encodeURIComponent(str).replace(
    /%([0-9A-F]{2})/g,
    (_, p1) => String.fromCharCode(parseInt(p1, 16))
  ));
}

function base64DecodeUnicode(str) {
  return decodeURIComponent(
    Array.from(atob(str))
      .map(c => '%' + c.charCodeAt(0).toString(16).padStart(2, '0'))
      .join('')
  );
}

base64EncodeUnicode('Hello 🌍');  // "SGVsbG8g8J+MjQ=="
base64DecodeUnicode('SGVsbG8g8J+MjQ=='); // "Hello 🌍"

// ===== Node.js: Buffer =====

// Encode
const buf = Buffer.from('Hello World', 'utf-8');
const b64 = buf.toString('base64');
console.log(b64); // "SGVsbG8gV29ybGQ="

// Decode
const original = Buffer.from(b64, 'base64').toString('utf-8');
console.log(original); // "Hello World"

// URL-safe Base64 in Node.js
const urlSafe = buf.toString('base64url');
console.log(urlSafe); // "SGVsbG8gV29ybGQ"`}</code></pre>

      <h3>{s.codePyTitle}</h3>
      <p dangerouslySetInnerHTML={{ __html: s.codePyDesc }} />
      <pre><code>{`import base64

# Standard Base64 encode
text = "Hello World"
encoded = base64.b64encode(text.encode('utf-8'))
print(encoded)          # b'SGVsbG8gV29ybGQ='
print(encoded.decode())  # "SGVsbG8gV29ybGQ="

# Standard Base64 decode
decoded = base64.b64decode(encoded)
print(decoded.decode('utf-8'))  # "Hello World"

# URL-safe Base64 (replaces + with - and / with _)
url_encoded = base64.urlsafe_b64encode(text.encode('utf-8'))
print(url_encoded.decode())  # "SGVsbG8gV29ybGQ="

url_decoded = base64.urlsafe_b64decode(url_encoded)
print(url_decoded.decode('utf-8'))  # "Hello World"

# Encode a file (e.g., an image)
with open('image.png', 'rb') as f:
    image_b64 = base64.b64encode(f.read()).decode('utf-8')
    data_uri = f"data:image/png;base64,{image_b64}"

# Decode Base64 back to file
with open('output.png', 'wb') as f:
    f.write(base64.b64decode(image_b64))`}</code></pre>

      <h3>{s.codeBashTitle}</h3>
      <p dangerouslySetInnerHTML={{ __html: s.codeBashDesc }} />
      <pre><code>{`# Base64 encode a string (Linux)
echo -n "Hello World" | base64
# Output: SGVsbG8gV29ybGQ=

# Base64 decode a string (Linux)
echo "SGVsbG8gV29ybGQ=" | base64 --decode
# Output: Hello World

# macOS uses -D instead of --decode
echo "SGVsbG8gV29ybGQ=" | base64 -D
# Output: Hello World

# Base64 encode a file
base64 image.png > image_b64.txt

# Base64 decode a file
base64 --decode image_b64.txt > restored_image.png

# Encode and use inline (e.g., for curl auth header)
AUTH=$(echo -n "user:password" | base64)
curl -H "Authorization: Basic $AUTH" https://api.example.com/data

# Pipe from/to files
cat document.pdf | base64 > document_b64.txt
cat document_b64.txt | base64 --decode > restored.pdf

# Wrap lines at 76 characters (MIME standard)
echo -n "Long text..." | base64 -w 76`}</code></pre>

      <h3>{s.codePsTitle}</h3>
      <p dangerouslySetInnerHTML={{ __html: s.codePsDesc }} />
      <pre><code>{`# PowerShell Base64 encode (UTF-16LE by default)
$text = "Hello World"
$bytes = [System.Text.Encoding]::UTF8.GetBytes($text)
$encoded = [Convert]::ToBase64String($bytes)
Write-Output $encoded
# Output: SGVsbG8gV29ybGQ=

# PowerShell Base64 decode
$decoded = [Convert]::FromBase64String($encoded)
$original = [System.Text.Encoding]::UTF8.GetString($decoded)
Write-Output $original
# Output: Hello World

# Encode a file to Base64
$fileBytes = [IO.File]::ReadAllBytes("C:\\image.png")
$fileBase64 = [Convert]::ToBase64String($fileBytes)

# Decode Base64 to file
$decodedBytes = [Convert]::FromBase64String($fileBase64)
[IO.File]::WriteAllBytes("C:\\restored.png", $decodedBytes)

# One-liner for encoding strings (UTF-8)
[Convert]::ToBase64String(
  [Text.Encoding]::UTF8.GetBytes("Hello World")
)

# Using UTF-16LE (default Windows encoding)
$utf16 = [Convert]::ToBase64String(
  [Text.Encoding]::Unicode.GetBytes("Hello World")
)
# Note: UTF-16LE produces different output than UTF-8`}</code></pre>

      {/* Section 5: Base64 Encoding Table */}
      <h2>{s.h2_table}</h2>
      <p>{s.tableDesc}</p>
      <table>
        <thead>
          <tr>
            <th>Value</th><th>Char</th>
            <th>Value</th><th>Char</th>
            <th>Value</th><th>Char</th>
            <th>Value</th><th>Char</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>0</td><td><code>A</code></td><td>16</td><td><code>Q</code></td><td>32</td><td><code>g</code></td><td>48</td><td><code>w</code></td></tr>
          <tr><td>1</td><td><code>B</code></td><td>17</td><td><code>R</code></td><td>33</td><td><code>h</code></td><td>49</td><td><code>x</code></td></tr>
          <tr><td>2</td><td><code>C</code></td><td>18</td><td><code>S</code></td><td>34</td><td><code>i</code></td><td>50</td><td><code>y</code></td></tr>
          <tr><td>3</td><td><code>D</code></td><td>19</td><td><code>T</code></td><td>35</td><td><code>j</code></td><td>51</td><td><code>z</code></td></tr>
          <tr><td>4</td><td><code>E</code></td><td>20</td><td><code>U</code></td><td>36</td><td><code>k</code></td><td>52</td><td><code>0</code></td></tr>
          <tr><td>5</td><td><code>F</code></td><td>21</td><td><code>V</code></td><td>37</td><td><code>l</code></td><td>53</td><td><code>1</code></td></tr>
          <tr><td>6</td><td><code>G</code></td><td>22</td><td><code>W</code></td><td>38</td><td><code>m</code></td><td>54</td><td><code>2</code></td></tr>
          <tr><td>7</td><td><code>H</code></td><td>23</td><td><code>X</code></td><td>39</td><td><code>n</code></td><td>55</td><td><code>3</code></td></tr>
          <tr><td>8</td><td><code>I</code></td><td>24</td><td><code>Y</code></td><td>40</td><td><code>o</code></td><td>56</td><td><code>4</code></td></tr>
          <tr><td>9</td><td><code>J</code></td><td>25</td><td><code>Z</code></td><td>41</td><td><code>p</code></td><td>57</td><td><code>5</code></td></tr>
          <tr><td>10</td><td><code>K</code></td><td>26</td><td><code>a</code></td><td>42</td><td><code>q</code></td><td>58</td><td><code>6</code></td></tr>
          <tr><td>11</td><td><code>L</code></td><td>27</td><td><code>b</code></td><td>43</td><td><code>r</code></td><td>59</td><td><code>7</code></td></tr>
          <tr><td>12</td><td><code>M</code></td><td>28</td><td><code>c</code></td><td>44</td><td><code>s</code></td><td>60</td><td><code>8</code></td></tr>
          <tr><td>13</td><td><code>N</code></td><td>29</td><td><code>d</code></td><td>45</td><td><code>t</code></td><td>61</td><td><code>9</code></td></tr>
          <tr><td>14</td><td><code>O</code></td><td>30</td><td><code>e</code></td><td>46</td><td><code>u</code></td><td>62</td><td><code>+</code></td></tr>
          <tr><td>15</td><td><code>P</code></td><td>31</td><td><code>f</code></td><td>47</td><td><code>v</code></td><td>63</td><td><code>/</code></td></tr>
        </tbody>
      </table>
      <p><em>Padding: <code>=</code></em></p>

      {/* Section 6: Base64 URL-Safe Encoding */}
      <h2>{s.h2_urlSafe}</h2>
      <p dangerouslySetInnerHTML={{ __html: s.urlSafeDesc1 }} />
      <p dangerouslySetInnerHTML={{ __html: s.urlSafeDesc2 }} />
      <p>{s.urlSafeCode}</p>
      <pre><code>{`// Standard Base64 vs Base64URL comparison

// Standard Base64 (RFC 4648 Section 4)
// Alphabet: A-Z, a-z, 0-9, +, /
// Padding:  = (required)
"Hello World?" → "SGVsbG8gV29ybGQ/"   // contains /
"subjects?"    → "c3ViamVjdHM/"       // contains /
"<<???>>"     → "PDw/Pz8+Pg=="        // contains + and =

// Base64URL (RFC 4648 Section 5)
// Alphabet: A-Z, a-z, 0-9, -, _
// Padding:  omitted (optional)
"Hello World?" → "SGVsbG8gV29ybGQ_"   // / replaced with _
"subjects?"    → "c3ViamVjdHM_"       // / replaced with _
"<<???>>"     → "PDw_Pz8-Pg"          // + → -, / → _, no padding

// JavaScript conversion between formats
function base64ToBase64Url(base64) {
  return base64
    .replace(/\\+/g, '-')
    .replace(/\\//g, '_')
    .replace(/=+$/, '');
}

function base64UrlToBase64(base64url) {
  let base64 = base64url
    .replace(/-/g, '+')
    .replace(/_/g, '/');
  // Add padding
  while (base64.length % 4 !== 0) {
    base64 += '=';
  }
  return base64;
}`}</code></pre>

      {/* Section 7: Base64 Image Encoding */}
      <h2>{s.h2_imageEncode}</h2>
      <p dangerouslySetInnerHTML={{ __html: s.imageEncodeDesc1 }} />
      <p dangerouslySetInnerHTML={{ __html: s.imageEncodeDesc2 }} />
      <p dangerouslySetInnerHTML={{ __html: s.imageEncodeDesc3 }} />

      <h3>{s.imageEncodeHtml}</h3>
      <pre><code>{`<!-- Inline Base64 image in HTML -->
<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUA
AAAFCAYAAACNbyblAAAADElEQVQI12P4//8/AwAI/AL+hc2rNAAAAABJRU5E
rkJggg==" alt="Red dot" width="5" height="5" />

<!-- Base64 SVG in HTML -->
<img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDov
L3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAiIGhlaWdodD0iMT
AwIj48Y2lyY2xlIGN4PSI1MCIgY3k9IjUwIiByPSI0MCIgZmlsbD0icmVk
Ii8+PC9zdmc+" alt="Red circle" />

<!-- Base64 favicon -->
<link rel="icon" href="data:image/x-icon;base64,AAABAA..." />`}</code></pre>

      <h3>{s.imageEncodeCss}</h3>
      <pre><code>{`/* Base64 background image in CSS */
.icon-check {
  background-image: url('data:image/svg+xml;base64,PHN2ZyB4bW...');
  background-size: contain;
  width: 24px;
  height: 24px;
}

/* Base64 cursor in CSS */
.custom-cursor {
  cursor: url('data:image/png;base64,iVBORw0KGgo...'), auto;
}

/* Base64 font in CSS (@font-face) */
@font-face {
  font-family: 'CustomFont';
  src: url('data:font/woff2;base64,d09GMgABAAAAAD...') format('woff2');
}`}</code></pre>

      <h3>{s.imageEncodeJs}</h3>
      <pre><code>{`// Convert image file to Base64 data URI (browser)
function imageToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

// Usage with file input
const input = document.querySelector('input[type="file"]');
input.addEventListener('change', async (e) => {
  const file = e.target.files[0];
  const dataUri = await imageToBase64(file);
  console.log(dataUri);
  // "data:image/png;base64,iVBORw0KGgo..."
});

// Convert canvas to Base64
const canvas = document.getElementById('myCanvas');
const base64Image = canvas.toDataURL('image/png');
// "data:image/png;base64,iVBORw0KGgo..."

// Node.js: encode image file to Base64
const fs = require('fs');
const imageBuffer = fs.readFileSync('photo.jpg');
const base64String = imageBuffer.toString('base64');
const dataUri = \`data:image/jpeg;base64,\${base64String}\`;`}</code></pre>

      {/* Section 8: FAQ */}
      <h2>{s.h2_faq}</h2>
      <h3>{s.faq1_q}</h3>
      <p dangerouslySetInnerHTML={{ __html: s.faq1_a }} />
      <h3>{s.faq2_q}</h3>
      <p dangerouslySetInnerHTML={{ __html: s.faq2_a }} />
      <h3>{s.faq3_q}</h3>
      <p dangerouslySetInnerHTML={{ __html: s.faq3_a }} />

      <p style={{ marginTop: 32 }} dangerouslySetInnerHTML={{ __html: s.conclusion }} />
      <p><Link href={`/${lang}/tools/base64-encode-decode`} style={{ fontWeight: 600 }}>{s.linkToolBottom}</Link></p>
    </>
  );
}
