'use client';
import React from 'react';
import Link from 'next/link';

const t: Record<string, Record<string, string>> = {
  en: {
    title: 'URL Encoding (Percent Encoding) Explained: What %20 and %3A Actually Mean',
    intro: 'Ever seen <code>%20</code>, <code>%3A</code>, or <code>%2F</code> in a URL and wondered what they mean? These are <strong>percent-encoded</strong> characters — the mechanism that allows URLs to carry special characters safely. This guide breaks down exactly how URL encoding works, from the byte-level mechanics to practical code examples in every major language.',
    linkTool: 'Try our URL Encoder/Decoder tool to encode or decode any string instantly →',

    h2_what: 'What Is URL Encoding (Percent Encoding)?',
    what_p1: 'URL encoding, formally called <strong>percent encoding</strong>, is a mechanism defined in <a href="https://datatracker.ietf.org/doc/html/rfc3986" target="_blank" rel="noopener noreferrer">RFC 3986</a> for representing characters in a URI that are not allowed or have special meaning. It works by replacing each target character with a <code>%</code> sign followed by two uppercase hexadecimal digits representing the byte value.',
    what_p2: 'URLs can only contain a limited set of characters from the ASCII character set. Characters are divided into <strong>reserved</strong> characters (which have structural meaning like <code>/</code>, <code>?</code>, <code>&</code>) and <strong>unreserved</strong> characters (letters, digits, <code>-</code>, <code>_</code>, <code>.</code>, <code>~</code>). Everything else must be percent-encoded before it can appear in a URL.',
    what_p3: 'For example, a space character (ASCII 32, hex 0x20) becomes <code>%20</code>. A colon (ASCII 58, hex 0x3A) becomes <code>%3A</code>. This is why you see URLs like <code>https://example.com/search?q=hello%20world</code> — the space between "hello" and "world" has been percent-encoded.',

    h2_table: 'URL Encoding Character Reference Table',
    table_desc: 'Below is a quick-reference table of the most commonly percent-encoded characters. Bookmark this for daily use.',
    th_char: 'Character',
    th_encoded: 'Encoded',
    th_name: 'Name / Purpose',

    h2_how: 'How URL Encoding Works (Step by Step)',
    how_p1: 'The encoding process follows three steps: (1) take the character, (2) convert it to its UTF-8 byte sequence, and (3) percent-encode each byte as <code>%XX</code>. For ASCII characters this produces a single <code>%XX</code> token. For multi-byte UTF-8 characters, each byte gets its own percent-encoded triplet.',
    how_p2: 'Let\'s walk through several examples to see this in action:',
    how_p3: 'Modern programming languages handle this automatically — you rarely need to do the byte conversion yourself. Use the built-in URL encoding functions shown later in this guide, or try our online tool.',
    how_link: 'Encode & decode any string with our URL Encoder tool →',

    h2_encodeuri: 'encodeURI vs encodeURIComponent in JavaScript',
    encodeuri_p1: 'JavaScript provides two URL encoding functions, and choosing the wrong one is a common source of bugs. Understanding the difference is critical for building correct URLs.',
    encodeuri_p2: '<strong>encodeURI()</strong> encodes a full URI. It preserves characters that have structural meaning in URLs: <code>: / ? # [ ] @ ! $ & \' ( ) * + , ; =</code>. Use it when you have a complete URL and want to fix spaces or non-ASCII characters without breaking the URL structure.',
    encodeuri_p3: '<strong>encodeURIComponent()</strong> encodes a URI component such as a query parameter value. It encodes everything except letters, digits, and <code>- _ . ~ ! \' ( ) *</code>. This means it WILL encode <code>& = + / : ?</code> — exactly what you want when the value itself might contain those characters.',
    encodeuri_rule: '<strong>Rule of thumb:</strong> Always use <code>encodeURIComponent()</code> for query parameter values. Only use <code>encodeURI()</code> when encoding an entire URL where you need to preserve the structure.',

    h2_languages: 'URL Encoding in Different Programming Languages',
    lang_desc: 'Every major language has built-in URL encoding functions. Here are the most common patterns:',

    h2_mistakes: 'Common URL Encoding Mistakes',
    mistake1_h3: '1. Double Encoding',
    mistake1_p: 'Double encoding occurs when you encode a string that is already encoded. The <code>%</code> in <code>%20</code> gets re-encoded to <code>%25</code>, producing <code>%2520</code>. The server then decodes it to <code>%20</code> (a literal string) instead of a space. Always encode raw values exactly once.',
    mistake2_h3: '2. Encoding the Entire URL',
    mistake2_p: 'Passing a full URL to <code>encodeURIComponent()</code> will encode the <code>://</code>, <code>/</code>, <code>?</code>, and <code>=</code> characters, completely breaking the URL. Only encode individual query parameter values or path segments that contain user data.',
    mistake3_h3: '3. Space as + vs %20',
    mistake3_p: 'In the <code>application/x-www-form-urlencoded</code> format (HTML forms), spaces are encoded as <code>+</code>. In RFC 3986 percent encoding, spaces are <code>%20</code>. Most servers handle both, but some strict APIs only accept one form. When building API requests, prefer <code>%20</code>.',
    mistake4_h3: '4. Not Encoding Query Parameter Values',
    mistake4_p: 'Forgetting to encode user-supplied values in query strings is a security risk (potential injection) and causes broken URLs. If a user searches for <code>Tom & Jerry</code>, the unencoded <code>&</code> will be interpreted as a parameter separator, splitting the value.',

    h2_best: 'Best Practices for URL Encoding',
    best_p1: '<strong>Always encode user input</strong> before inserting it into query strings or path segments. This prevents both broken URLs and potential injection attacks. Never trust that user-provided data is URL-safe.',
    best_p2: '<strong>Use library functions, not manual replacement.</strong> Functions like <code>encodeURIComponent()</code>, Python\'s <code>urllib.parse.quote()</code>, or Go\'s <code>url.QueryEscape()</code> handle UTF-8, edge cases, and the correct character sets. Rolling your own encoding logic is error-prone.',
    best_p3: '<strong>Test with special characters.</strong> Always test your URL-building code with inputs containing <code>& = ? / # + %</code> and non-ASCII characters like accented letters, CJK characters, and emoji. These are the inputs most likely to break.',
    best_p4: '<strong>Use URL-safe Base64 when embedding binary data.</strong> Standard Base64 uses <code>+</code> and <code>/</code> which conflict with URL syntax. URL-safe Base64 replaces them with <code>-</code> and <code>_</code>, avoiding the need for additional percent encoding.',

    h2_faq: 'Frequently Asked Questions',
    faq1_q: 'Why is space encoded as %20?',
    faq1_a: 'The space character has ASCII code 32, which is 0x20 in hexadecimal. Percent encoding represents a byte as <code>%</code> followed by its hex value, so space becomes <code>%20</code>. This is defined in RFC 3986.',
    faq2_q: 'What is the difference between + and %20 for spaces?',
    faq2_a: '<code>%20</code> comes from RFC 3986 (the URI standard) and is used in path segments and modern APIs. <code>+</code> comes from the <code>application/x-www-form-urlencoded</code> format used by HTML forms. In query strings most servers accept both, but <code>%20</code> is more universally correct.',
    faq3_q: 'Do I need to encode the entire URL?',
    faq3_a: 'No. You should only encode individual components — query parameter values, path segments that contain user data, and fragment identifiers. The structural characters (<code>://</code>, <code>/</code>, <code>?</code>, <code>=</code>, <code>&amp;</code>) must remain unencoded so the URL can be parsed correctly.',
    faq4_q: 'What is the difference between encodeURI and encodeURIComponent?',
    faq4_a: '<code>encodeURI()</code> encodes a complete URL, preserving structural characters like <code>/ ? & =</code>. <code>encodeURIComponent()</code> encodes a single component (like a query value) and DOES encode those structural characters. For query parameter values, always use <code>encodeURIComponent()</code>.',
    faq5_q: 'How do I decode a URL-encoded string?',
    faq5_a: 'In JavaScript use <code>decodeURIComponent()</code>. In Python use <code>urllib.parse.unquote()</code>. In Go use <code>url.QueryUnescape()</code>. In PHP use <code>urldecode()</code> or <code>rawurldecode()</code>. You can also use our online URL Decoder tool for quick decoding.',

    conclusion: 'URL encoding is one of those fundamental web concepts that every developer needs to understand. Once you know how percent encoding works at the byte level, debugging broken URLs and building correct API requests becomes straightforward. Keep this guide bookmarked for quick reference.',
    linkToolBottom: 'Try our URL Encoder/Decoder for instant encoding and decoding →',
  },
  zh: {
    title: 'URL 编码（百分号编码）详解：%20 和 %3A 到底是什么意思',
    intro: '在 URL 中见过 <code>%20</code>、<code>%3A</code> 或 <code>%2F</code> 吗？这些是<strong>百分号编码</strong>字符——使 URL 能够安全携带特殊字符的机制。本指南从字节级别的编码原理到各主流编程语言的实用代码示例，全面解析 URL 编码的工作原理。',
    linkTool: '使用我们的 URL 编码/解码工具即时编码或解码任何字符串 →',

    h2_what: '什么是 URL 编码（百分号编码）？',
    what_p1: 'URL 编码，正式名称为<strong>百分号编码</strong>，是 <a href="https://datatracker.ietf.org/doc/html/rfc3986" target="_blank" rel="noopener noreferrer">RFC 3986</a> 中定义的一种机制，用于表示 URI 中不允许或具有特殊含义的字符。它通过将每个目标字符替换为 <code>%</code> 符号加上两个大写十六进制数字（表示字节值）来工作。',
    what_p2: 'URL 只能包含 ASCII 字符集中的有限字符。字符分为<strong>保留</strong>字符（具有结构含义，如 <code>/</code>、<code>?</code>、<code>&</code>）和<strong>非保留</strong>字符（字母、数字、<code>-</code>、<code>_</code>、<code>.</code>、<code>~</code>）。其他所有字符在出现在 URL 中之前都必须进行百分号编码。',
    what_p3: '例如，空格字符（ASCII 32，十六进制 0x20）变为 <code>%20</code>。冒号（ASCII 58，十六进制 0x3A）变为 <code>%3A</code>。这就是你看到 <code>https://example.com/search?q=hello%20world</code> 这样 URL 的原因。',

    h2_table: 'URL 编码字符参考表',
    table_desc: '以下是最常见的百分号编码字符快速参考表。收藏此页面以便日常使用。',
    th_char: '字符',
    th_encoded: '编码形式',
    th_name: '名称 / 用途',

    h2_how: 'URL 编码的工作原理（逐步解析）',
    how_p1: '编码过程分三步：（1）取目标字符，（2）将其转换为 UTF-8 字节序列，（3）将每个字节百分号编码为 <code>%XX</code>。对于 ASCII 字符，这会生成一个 <code>%XX</code> 标记。对于多字节 UTF-8 字符，每个字节都有自己的百分号编码三元组。',
    how_p2: '让我们通过几个示例来了解这个过程：',
    how_p3: '现代编程语言会自动处理这些——你很少需要自己做字节转换。使用本指南后面展示的内置 URL 编码函数，或试试我们的在线工具。',
    how_link: '使用我们的 URL 编码工具编码和解码任何字符串 →',

    h2_encodeuri: 'JavaScript 中 encodeURI 与 encodeURIComponent 的区别',
    encodeuri_p1: 'JavaScript 提供两个 URL 编码函数，选错是常见的 bug 来源。理解它们的区别对于构建正确的 URL 至关重要。',
    encodeuri_p2: '<strong>encodeURI()</strong> 编码完整 URI。它保留在 URL 中有结构意义的字符：<code>: / ? # [ ] @ ! $ & \' ( ) * + , ; =</code>。当你有一个完整 URL 并想修复空格或非 ASCII 字符而不破坏 URL 结构时使用它。',
    encodeuri_p3: '<strong>encodeURIComponent()</strong> 编码 URI 组件（如查询参数值）。它编码除字母、数字和 <code>- _ . ~ ! \' ( ) *</code> 之外的所有字符。这意味着它会编码 <code>& = + / : ?</code>——当值本身可能包含这些字符时，这正是你需要的。',
    encodeuri_rule: '<strong>经验法则：</strong>对查询参数值始终使用 <code>encodeURIComponent()</code>。仅在编码需要保留结构的完整 URL 时使用 <code>encodeURI()</code>。',

    h2_languages: '不同编程语言中的 URL 编码',
    lang_desc: '每种主流语言都有内置的 URL 编码函数。以下是最常见的用法：',

    h2_mistakes: '常见 URL 编码错误',
    mistake1_h3: '1. 重复编码',
    mistake1_p: '重复编码发生在对已编码的字符串再次编码时。<code>%20</code> 中的 <code>%</code> 被重新编码为 <code>%25</code>，产生 <code>%2520</code>。服务器解码后得到 <code>%20</code>（字面字符串）而非空格。始终只编码原始值一次。',
    mistake2_h3: '2. 编码整个 URL',
    mistake2_p: '将完整 URL 传给 <code>encodeURIComponent()</code> 会编码 <code>://</code>、<code>/</code>、<code>?</code> 和 <code>=</code> 字符，完全破坏 URL。只编码包含用户数据的单个查询参数值或路径段。',
    mistake3_h3: '3. 空格用 + 还是 %20',
    mistake3_p: '在 <code>application/x-www-form-urlencoded</code> 格式（HTML 表单）中，空格编码为 <code>+</code>。在 RFC 3986 百分号编码中，空格为 <code>%20</code>。大多数服务器两者都处理，但某些严格的 API 只接受一种。构建 API 请求时，建议使用 <code>%20</code>。',
    mistake4_h3: '4. 未编码查询参数值',
    mistake4_p: '忘记编码查询字符串中的用户输入值是安全风险（潜在注入）并导致 URL 损坏。如果用户搜索 <code>Tom & Jerry</code>，未编码的 <code>&</code> 会被解释为参数分隔符。',

    h2_best: 'URL 编码最佳实践',
    best_p1: '<strong>始终编码用户输入</strong>，然后再将其插入查询字符串或路径段。这既防止 URL 损坏，又防止潜在的注入攻击。',
    best_p2: '<strong>使用库函数，而非手动替换。</strong>如 <code>encodeURIComponent()</code>、Python 的 <code>urllib.parse.quote()</code> 或 Go 的 <code>url.QueryEscape()</code> 等函数能正确处理 UTF-8、边界情况和字符集。',
    best_p3: '<strong>用特殊字符测试。</strong>始终用包含 <code>& = ? / # + %</code> 和非 ASCII 字符（如重音字母、中日韩字符和 emoji）的输入测试 URL 构建代码。',
    best_p4: '<strong>嵌入二进制数据时使用 URL 安全的 Base64。</strong>标准 Base64 使用 <code>+</code> 和 <code>/</code>，与 URL 语法冲突。URL 安全的 Base64 将它们替换为 <code>-</code> 和 <code>_</code>。',

    h2_faq: '常见问题',
    faq1_q: '为什么空格编码为 %20？',
    faq1_a: '空格字符的 ASCII 码是 32，十六进制为 0x20。百分号编码将字节表示为 <code>%</code> 加上其十六进制值，所以空格变为 <code>%20</code>。这在 RFC 3986 中定义。',
    faq2_q: '空格用 + 和 %20 有什么区别？',
    faq2_a: '<code>%20</code> 来自 RFC 3986（URI 标准），用于路径段和现代 API。<code>+</code> 来自 HTML 表单使用的 <code>application/x-www-form-urlencoded</code> 格式。在查询字符串中大多数服务器两者都接受，但 <code>%20</code> 更通用。',
    faq3_q: '需要编码整个 URL 吗？',
    faq3_a: '不需要。你只应编码单个组件——查询参数值、包含用户数据的路径段和片段标识符。结构字符（<code>://</code>、<code>/</code>、<code>?</code>、<code>=</code>、<code>&amp;</code>）必须保持未编码。',
    faq4_q: 'encodeURI 和 encodeURIComponent 有什么区别？',
    faq4_a: '<code>encodeURI()</code> 编码完整 URL，保留结构字符如 <code>/ ? & =</code>。<code>encodeURIComponent()</code> 编码单个组件（如查询值），会编码这些结构字符。对查询参数值始终使用 <code>encodeURIComponent()</code>。',
    faq5_q: '如何解码 URL 编码的字符串？',
    faq5_a: 'JavaScript 用 <code>decodeURIComponent()</code>，Python 用 <code>urllib.parse.unquote()</code>，Go 用 <code>url.QueryUnescape()</code>，PHP 用 <code>urldecode()</code> 或 <code>rawurldecode()</code>。也可以使用我们的在线 URL 解码工具。',

    conclusion: 'URL 编码是每个开发者都需要理解的基础 Web 概念。一旦你了解百分号编码在字节级别的工作原理，调试损坏的 URL 和构建正确的 API 请求就变得简单了。收藏此指南以便快速参考。',
    linkToolBottom: '试试我们的 URL 编码/解码工具，即时编码和解码 →',
  },
  fr: {
    title: 'Encodage URL (Percent Encoding) : Ce que %20 et %3A signifient vraiment',
    intro: 'Vous avez vu <code>%20</code>, <code>%3A</code> ou <code>%2F</code> dans une URL ? Ce sont des caractères <strong>encodés en pourcentage</strong> — le mécanisme qui permet aux URL de transporter des caractères spéciaux en toute sécurité. Ce guide explique exactement comment fonctionne l\'encodage URL.',
    linkTool: 'Essayez notre outil d\'encodage/décodage URL pour encoder ou décoder n\'importe quelle chaîne →',

    h2_what: 'Qu\'est-ce que l\'encodage URL (Percent Encoding) ?',
    what_p1: 'L\'encodage URL, appelé formellement <strong>percent encoding</strong>, est un mécanisme défini dans la <a href="https://datatracker.ietf.org/doc/html/rfc3986" target="_blank" rel="noopener noreferrer">RFC 3986</a> pour représenter les caractères non autorisés ou ayant une signification spéciale dans un URI. Il remplace chaque caractère cible par un signe <code>%</code> suivi de deux chiffres hexadécimaux.',
    what_p2: 'Les URL ne peuvent contenir qu\'un ensemble limité de caractères ASCII. Les caractères sont divisés en caractères <strong>réservés</strong> (avec une signification structurelle comme <code>/</code>, <code>?</code>, <code>&</code>) et <strong>non réservés</strong> (lettres, chiffres, <code>-</code>, <code>_</code>, <code>.</code>, <code>~</code>). Tout le reste doit être encodé.',
    what_p3: 'Par exemple, un espace (ASCII 32, hex 0x20) devient <code>%20</code>. Un deux-points (ASCII 58, hex 0x3A) devient <code>%3A</code>.',

    h2_table: 'Table de référence des caractères encodés',
    table_desc: 'Voici une table de référence rapide des caractères les plus couramment encodés.',
    th_char: 'Caractère',
    th_encoded: 'Encodé',
    th_name: 'Nom / Usage',

    h2_how: 'Comment fonctionne l\'encodage URL (étape par étape)',
    how_p1: 'Le processus suit trois étapes : (1) prendre le caractère, (2) le convertir en séquence d\'octets UTF-8, (3) encoder chaque octet en <code>%XX</code>. Pour les caractères ASCII, cela produit un seul triplet. Pour les caractères UTF-8 multi-octets, chaque octet est encodé séparément.',
    how_p2: 'Voici plusieurs exemples pour illustrer ce processus :',
    how_p3: 'Les langages modernes gèrent cela automatiquement. Utilisez les fonctions intégrées montrées dans ce guide ou notre outil en ligne.',
    how_link: 'Encodez et décodez avec notre outil URL Encoder →',

    h2_encodeuri: 'encodeURI vs encodeURIComponent en JavaScript',
    encodeuri_p1: 'JavaScript fournit deux fonctions d\'encodage URL. Choisir la mauvaise est une source courante de bugs.',
    encodeuri_p2: '<strong>encodeURI()</strong> encode un URI complet en préservant les caractères structurels : <code>: / ? # [ ] @ ! $ & \' ( ) * + , ; =</code>.',
    encodeuri_p3: '<strong>encodeURIComponent()</strong> encode un composant d\'URI (comme une valeur de paramètre). Il encode tout sauf les lettres, chiffres et <code>- _ . ~ ! \' ( ) *</code>.',
    encodeuri_rule: '<strong>Règle :</strong> Utilisez toujours <code>encodeURIComponent()</code> pour les valeurs de paramètres. N\'utilisez <code>encodeURI()</code> que pour encoder une URL complète.',

    h2_languages: 'Encodage URL dans différents langages',
    lang_desc: 'Chaque langage majeur a des fonctions intégrées pour l\'encodage URL :',

    h2_mistakes: 'Erreurs courantes d\'encodage URL',
    mistake1_h3: '1. Double encodage',
    mistake1_p: 'Le double encodage survient quand on encode une chaîne déjà encodée. <code>%20</code> devient <code>%2520</code>. Encodez toujours une seule fois.',
    mistake2_h3: '2. Encoder l\'URL entière',
    mistake2_p: 'Passer une URL complète à <code>encodeURIComponent()</code> casse la structure. N\'encodez que les valeurs individuelles.',
    mistake3_h3: '3. Espace : + vs %20',
    mistake3_p: 'Les formulaires HTML utilisent <code>+</code> pour les espaces. La RFC 3986 utilise <code>%20</code>. Pour les API, préférez <code>%20</code>.',
    mistake4_h3: '4. Oublier d\'encoder les paramètres',
    mistake4_p: 'Ne pas encoder les valeurs utilisateur dans les chaînes de requête est un risque de sécurité et cause des URL cassées.',

    h2_best: 'Bonnes pratiques pour l\'encodage URL',
    best_p1: '<strong>Encodez toujours les entrées utilisateur</strong> avant de les insérer dans des chaînes de requête ou des segments de chemin.',
    best_p2: '<strong>Utilisez les fonctions de bibliothèque</strong> comme <code>encodeURIComponent()</code> ou <code>urllib.parse.quote()</code> de Python.',
    best_p3: '<strong>Testez avec des caractères spéciaux</strong> : <code>& = ? / # + %</code> et des caractères non-ASCII.',
    best_p4: '<strong>Utilisez Base64 URL-safe</strong> pour les données binaires dans les URL.',

    h2_faq: 'Questions fréquentes',
    faq1_q: 'Pourquoi l\'espace est-il encodé en %20 ?',
    faq1_a: 'L\'espace a le code ASCII 32, soit 0x20 en hexadécimal. Le percent encoding représente un octet par <code>%</code> suivi de sa valeur hex.',
    faq2_q: 'Quelle est la différence entre + et %20 ?',
    faq2_a: '<code>%20</code> vient de la RFC 3986. <code>+</code> vient du format <code>application/x-www-form-urlencoded</code>. <code>%20</code> est plus universel.',
    faq3_q: 'Faut-il encoder l\'URL entière ?',
    faq3_a: 'Non. Encodez uniquement les composants individuels. Les caractères structurels doivent rester non encodés.',
    faq4_q: 'Quelle différence entre encodeURI et encodeURIComponent ?',
    faq4_a: '<code>encodeURI()</code> préserve les caractères structurels. <code>encodeURIComponent()</code> les encode. Utilisez <code>encodeURIComponent()</code> pour les valeurs de paramètres.',
    faq5_q: 'Comment décoder une chaîne encodée URL ?',
    faq5_a: 'En JavaScript : <code>decodeURIComponent()</code>. En Python : <code>urllib.parse.unquote()</code>. En PHP : <code>urldecode()</code>.',

    conclusion: 'L\'encodage URL est un concept fondamental du web. Gardez ce guide en favori pour référence rapide.',
    linkToolBottom: 'Essayez notre outil URL Encoder/Decoder →',
  },
  de: {
    title: 'URL-Encoding (Percent Encoding) erklärt: Was %20 und %3A wirklich bedeuten',
    intro: 'Haben Sie schon <code>%20</code>, <code>%3A</code> oder <code>%2F</code> in einer URL gesehen? Das sind <strong>prozent-kodierte</strong> Zeichen — der Mechanismus, der URLs erlaubt, Sonderzeichen sicher zu transportieren. Dieser Guide erklärt genau, wie URL-Encoding funktioniert.',
    linkTool: 'Testen Sie unser URL Encoder/Decoder Tool zum sofortigen Kodieren und Dekodieren →',

    h2_what: 'Was ist URL-Encoding (Percent Encoding)?',
    what_p1: 'URL-Encoding, formal <strong>Percent Encoding</strong> genannt, ist ein in <a href="https://datatracker.ietf.org/doc/html/rfc3986" target="_blank" rel="noopener noreferrer">RFC 3986</a> definierter Mechanismus zur Darstellung von Zeichen in einer URI, die nicht erlaubt sind oder eine besondere Bedeutung haben.',
    what_p2: 'URLs können nur eine begrenzte Menge von ASCII-Zeichen enthalten. Zeichen werden in <strong>reservierte</strong> (mit struktureller Bedeutung wie <code>/</code>, <code>?</code>, <code>&</code>) und <strong>nicht-reservierte</strong> Zeichen unterteilt.',
    what_p3: 'Ein Leerzeichen (ASCII 32, hex 0x20) wird zu <code>%20</code>. Ein Doppelpunkt (ASCII 58, hex 0x3A) wird zu <code>%3A</code>.',

    h2_table: 'URL-Encoding Zeichenreferenz',
    table_desc: 'Hier ist eine Schnellreferenz der am häufigsten kodierten Zeichen.',
    th_char: 'Zeichen',
    th_encoded: 'Kodiert',
    th_name: 'Name / Zweck',

    h2_how: 'Wie URL-Encoding funktioniert (Schritt für Schritt)',
    how_p1: 'Der Prozess folgt drei Schritten: (1) Zeichen nehmen, (2) in UTF-8-Bytefolge konvertieren, (3) jedes Byte als <code>%XX</code> kodieren.',
    how_p2: 'Hier sind mehrere Beispiele:',
    how_p3: 'Moderne Programmiersprachen erledigen dies automatisch. Nutzen Sie die eingebauten Funktionen oder unser Online-Tool.',
    how_link: 'Kodieren & dekodieren Sie mit unserem URL Encoder Tool →',

    h2_encodeuri: 'encodeURI vs encodeURIComponent in JavaScript',
    encodeuri_p1: 'JavaScript bietet zwei URL-Encoding-Funktionen. Die falsche zu wählen ist eine häufige Fehlerquelle.',
    encodeuri_p2: '<strong>encodeURI()</strong> kodiert eine komplette URI und bewahrt strukturelle Zeichen.',
    encodeuri_p3: '<strong>encodeURIComponent()</strong> kodiert eine URI-Komponente und kodiert auch strukturelle Zeichen wie <code>& = + /</code>.',
    encodeuri_rule: '<strong>Faustregel:</strong> Verwenden Sie immer <code>encodeURIComponent()</code> für Query-Parameter-Werte.',

    h2_languages: 'URL-Encoding in verschiedenen Sprachen',
    lang_desc: 'Jede große Sprache hat eingebaute URL-Encoding-Funktionen:',

    h2_mistakes: 'Häufige URL-Encoding-Fehler',
    mistake1_h3: '1. Doppelte Kodierung',
    mistake1_p: 'Doppelte Kodierung entsteht, wenn ein bereits kodierter String erneut kodiert wird. <code>%20</code> wird zu <code>%2520</code>.',
    mistake2_h3: '2. Die gesamte URL kodieren',
    mistake2_p: 'Eine komplette URL an <code>encodeURIComponent()</code> zu übergeben zerstört die URL-Struktur.',
    mistake3_h3: '3. Leerzeichen: + vs %20',
    mistake3_p: 'HTML-Formulare verwenden <code>+</code>, RFC 3986 verwendet <code>%20</code>. Für APIs bevorzugen Sie <code>%20</code>.',
    mistake4_h3: '4. Query-Parameter nicht kodieren',
    mistake4_p: 'Benutzereingaben in Query-Strings nicht zu kodieren ist ein Sicherheitsrisiko.',

    h2_best: 'Best Practices für URL-Encoding',
    best_p1: '<strong>Kodieren Sie immer Benutzereingaben</strong> bevor Sie sie in Query-Strings oder Pfadsegmente einfügen.',
    best_p2: '<strong>Nutzen Sie Bibliotheksfunktionen</strong> statt manueller Ersetzung.',
    best_p3: '<strong>Testen Sie mit Sonderzeichen:</strong> <code>& = ? / # + %</code> und Nicht-ASCII-Zeichen.',
    best_p4: '<strong>Verwenden Sie URL-sicheres Base64</strong> für Binärdaten in URLs.',

    h2_faq: 'Häufig gestellte Fragen',
    faq1_q: 'Warum wird das Leerzeichen als %20 kodiert?',
    faq1_a: 'Das Leerzeichen hat den ASCII-Code 32, also 0x20 hexadezimal. Percent Encoding stellt ein Byte als <code>%</code> gefolgt vom Hex-Wert dar.',
    faq2_q: 'Was ist der Unterschied zwischen + und %20?',
    faq2_a: '<code>%20</code> stammt aus RFC 3986. <code>+</code> stammt aus dem Formular-Format. <code>%20</code> ist universeller.',
    faq3_q: 'Muss ich die gesamte URL kodieren?',
    faq3_a: 'Nein. Kodieren Sie nur einzelne Komponenten. Strukturelle Zeichen müssen unkodiert bleiben.',
    faq4_q: 'Unterschied zwischen encodeURI und encodeURIComponent?',
    faq4_a: '<code>encodeURI()</code> bewahrt strukturelle Zeichen. <code>encodeURIComponent()</code> kodiert sie. Für Parameter-Werte immer <code>encodeURIComponent()</code> verwenden.',
    faq5_q: 'Wie dekodiere ich einen URL-kodierten String?',
    faq5_a: 'JavaScript: <code>decodeURIComponent()</code>. Python: <code>urllib.parse.unquote()</code>. PHP: <code>urldecode()</code>.',

    conclusion: 'URL-Encoding ist ein fundamentales Web-Konzept. Speichern Sie diesen Guide als Lesezeichen.',
    linkToolBottom: 'Testen Sie unseren URL Encoder/Decoder →',
  },
  es: {
    title: 'Codificación URL (Percent Encoding): Qué significan %20 y %3A realmente',
    intro: '¿Has visto <code>%20</code>, <code>%3A</code> o <code>%2F</code> en una URL? Son caracteres <strong>codificados en porcentaje</strong> — el mecanismo que permite a las URL transportar caracteres especiales de forma segura. Esta guía explica exactamente cómo funciona la codificación URL.',
    linkTool: 'Prueba nuestro codificador/decodificador URL para codificar o decodificar cualquier cadena →',

    h2_what: '¿Qué es la codificación URL (Percent Encoding)?',
    what_p1: 'La codificación URL, llamada formalmente <strong>percent encoding</strong>, es un mecanismo definido en la <a href="https://datatracker.ietf.org/doc/html/rfc3986" target="_blank" rel="noopener noreferrer">RFC 3986</a> para representar caracteres no permitidos o con significado especial en una URI.',
    what_p2: 'Las URL solo pueden contener un conjunto limitado de caracteres ASCII. Se dividen en caracteres <strong>reservados</strong> (con significado estructural como <code>/</code>, <code>?</code>, <code>&</code>) y <strong>no reservados</strong> (letras, dígitos, <code>-</code>, <code>_</code>, <code>.</code>, <code>~</code>).',
    what_p3: 'Un espacio (ASCII 32, hex 0x20) se convierte en <code>%20</code>. Dos puntos (ASCII 58, hex 0x3A) se convierte en <code>%3A</code>.',

    h2_table: 'Tabla de referencia de caracteres codificados',
    table_desc: 'Tabla de referencia rápida de los caracteres más comúnmente codificados.',
    th_char: 'Carácter',
    th_encoded: 'Codificado',
    th_name: 'Nombre / Uso',

    h2_how: 'Cómo funciona la codificación URL (paso a paso)',
    how_p1: 'El proceso sigue tres pasos: (1) tomar el carácter, (2) convertirlo a secuencia de bytes UTF-8, (3) codificar cada byte como <code>%XX</code>.',
    how_p2: 'Veamos varios ejemplos:',
    how_p3: 'Los lenguajes modernos manejan esto automáticamente. Usa las funciones integradas o nuestra herramienta en línea.',
    how_link: 'Codifica y decodifica con nuestro URL Encoder →',

    h2_encodeuri: 'encodeURI vs encodeURIComponent en JavaScript',
    encodeuri_p1: 'JavaScript proporciona dos funciones de codificación URL. Elegir la incorrecta es una fuente común de errores.',
    encodeuri_p2: '<strong>encodeURI()</strong> codifica una URI completa preservando caracteres estructurales.',
    encodeuri_p3: '<strong>encodeURIComponent()</strong> codifica un componente de URI, incluyendo caracteres estructurales como <code>& = + /</code>.',
    encodeuri_rule: '<strong>Regla:</strong> Usa siempre <code>encodeURIComponent()</code> para valores de parámetros de consulta.',

    h2_languages: 'Codificación URL en diferentes lenguajes',
    lang_desc: 'Cada lenguaje principal tiene funciones integradas para codificación URL:',

    h2_mistakes: 'Errores comunes de codificación URL',
    mistake1_h3: '1. Doble codificación',
    mistake1_p: 'Ocurre al codificar una cadena ya codificada. <code>%20</code> se convierte en <code>%2520</code>. Codifica siempre una sola vez.',
    mistake2_h3: '2. Codificar la URL completa',
    mistake2_p: 'Pasar una URL completa a <code>encodeURIComponent()</code> rompe la estructura. Solo codifica valores individuales.',
    mistake3_h3: '3. Espacio: + vs %20',
    mistake3_p: 'Los formularios HTML usan <code>+</code>. RFC 3986 usa <code>%20</code>. Para APIs, prefiere <code>%20</code>.',
    mistake4_h3: '4. No codificar valores de parámetros',
    mistake4_p: 'No codificar valores del usuario es un riesgo de seguridad y causa URLs rotas.',

    h2_best: 'Mejores prácticas para codificación URL',
    best_p1: '<strong>Siempre codifica la entrada del usuario</strong> antes de insertarla en cadenas de consulta o segmentos de ruta.',
    best_p2: '<strong>Usa funciones de biblioteca</strong> en lugar de reemplazo manual.',
    best_p3: '<strong>Prueba con caracteres especiales:</strong> <code>& = ? / # + %</code> y caracteres no-ASCII.',
    best_p4: '<strong>Usa Base64 URL-safe</strong> para datos binarios en URLs.',

    h2_faq: 'Preguntas frecuentes',
    faq1_q: '¿Por qué el espacio se codifica como %20?',
    faq1_a: 'El espacio tiene código ASCII 32, que es 0x20 en hexadecimal. El percent encoding representa un byte como <code>%</code> seguido de su valor hex.',
    faq2_q: '¿Cuál es la diferencia entre + y %20?',
    faq2_a: '<code>%20</code> viene de RFC 3986. <code>+</code> viene del formato de formularios. <code>%20</code> es más universal.',
    faq3_q: '¿Necesito codificar la URL completa?',
    faq3_a: 'No. Solo codifica componentes individuales. Los caracteres estructurales deben permanecer sin codificar.',
    faq4_q: '¿Diferencia entre encodeURI y encodeURIComponent?',
    faq4_a: '<code>encodeURI()</code> preserva caracteres estructurales. <code>encodeURIComponent()</code> los codifica. Para valores de parámetros usa <code>encodeURIComponent()</code>.',
    faq5_q: '¿Cómo decodifico una cadena codificada URL?',
    faq5_a: 'JavaScript: <code>decodeURIComponent()</code>. Python: <code>urllib.parse.unquote()</code>. PHP: <code>urldecode()</code>.',

    conclusion: 'La codificación URL es un concepto web fundamental. Guarda esta guía como referencia rápida.',
    linkToolBottom: 'Prueba nuestro URL Encoder/Decoder →',
  },
  ja: {
    title: 'URLエンコーディング（パーセントエンコーディング）解説：%20と%3Aの本当の意味',
    intro: 'URLで <code>%20</code>、<code>%3A</code>、<code>%2F</code> を見たことがありますか？これらは<strong>パーセントエンコード</strong>された文字です — URLが特殊文字を安全に運ぶための仕組みです。このガイドではバイトレベルの仕組みから各言語の実用的なコード例まで解説します。',
    linkTool: 'URLエンコーダー/デコーダーツールで即座にエンコード・デコード →',

    h2_what: 'URLエンコーディング（パーセントエンコーディング）とは？',
    what_p1: 'URLエンコーディング（正式名称：<strong>パーセントエンコーディング</strong>）は、<a href="https://datatracker.ietf.org/doc/html/rfc3986" target="_blank" rel="noopener noreferrer">RFC 3986</a>で定義されたURIで許可されない文字や特別な意味を持つ文字を表現するメカニズムです。',
    what_p2: 'URLにはASCII文字セットの限られた文字のみ使用できます。文字は<strong>予約</strong>文字（<code>/</code>、<code>?</code>、<code>&</code>のような構造的意味を持つ文字）と<strong>非予約</strong>文字（英数字、<code>-</code>、<code>_</code>、<code>.</code>、<code>~</code>）に分けられます。',
    what_p3: 'スペース（ASCII 32、16進数 0x20）は <code>%20</code> になります。コロン（ASCII 58、16進数 0x3A）は <code>%3A</code> になります。',

    h2_table: 'URLエンコーディング文字リファレンス表',
    table_desc: '最もよく使われるパーセントエンコード文字のクイックリファレンスです。',
    th_char: '文字',
    th_encoded: 'エンコード',
    th_name: '名前 / 用途',

    h2_how: 'URLエンコーディングの仕組み（ステップバイステップ）',
    how_p1: 'エンコードは3つのステップで行われます：(1) 文字を取得、(2) UTF-8バイト列に変換、(3) 各バイトを <code>%XX</code> でエンコード。',
    how_p2: 'いくつかの例を見てみましょう：',
    how_p3: 'モダンなプログラミング言語は自動的に処理します。組み込み関数またはオンラインツールをご利用ください。',
    how_link: 'URLエンコーダーツールでエンコード＆デコード →',

    h2_encodeuri: 'JavaScriptのencodeURI vs encodeURIComponent',
    encodeuri_p1: 'JavaScriptには2つのURLエンコード関数があります。間違った方を選ぶとバグの原因になります。',
    encodeuri_p2: '<strong>encodeURI()</strong>は完全なURIをエンコードし、構造的な文字を保持します。',
    encodeuri_p3: '<strong>encodeURIComponent()</strong>はURIコンポーネントをエンコードし、<code>& = + /</code>などの構造的文字もエンコードします。',
    encodeuri_rule: '<strong>原則：</strong>クエリパラメータ値には常に <code>encodeURIComponent()</code> を使用してください。',

    h2_languages: '各プログラミング言語でのURLエンコーディング',
    lang_desc: '主要な言語にはURLエンコード関数が組み込まれています：',

    h2_mistakes: 'よくあるURLエンコーディングのミス',
    mistake1_h3: '1. 二重エンコード',
    mistake1_p: '既にエンコードされた文字列を再度エンコードすると発生します。<code>%20</code> が <code>%2520</code> になります。',
    mistake2_h3: '2. URL全体をエンコード',
    mistake2_p: '完全なURLを <code>encodeURIComponent()</code> に渡すとURL構造が壊れます。個別の値のみエンコードしてください。',
    mistake3_h3: '3. スペース：+ vs %20',
    mistake3_p: 'HTMLフォームは <code>+</code>、RFC 3986は <code>%20</code> を使用します。APIでは <code>%20</code> を推奨。',
    mistake4_h3: '4. クエリパラメータ値の未エンコード',
    mistake4_p: 'ユーザー入力値をエンコードしないのはセキュリティリスクであり、URLの破損を引き起こします。',

    h2_best: 'URLエンコーディングのベストプラクティス',
    best_p1: '<strong>ユーザー入力は必ずエンコード</strong>してからクエリ文字列やパスセグメントに挿入してください。',
    best_p2: '<strong>手動置換ではなくライブラリ関数を使用</strong>してください。',
    best_p3: '<strong>特殊文字でテスト：</strong><code>& = ? / # + %</code> と非ASCII文字。',
    best_p4: '<strong>バイナリデータにはURL安全なBase64を使用</strong>してください。',

    h2_faq: 'よくある質問',
    faq1_q: 'なぜスペースは%20にエンコードされるのですか？',
    faq1_a: 'スペースのASCIIコードは32で、16進数では0x20です。パーセントエンコーディングはバイトを <code>%</code> + 16進値で表します。',
    faq2_q: '+と%20の違いは？',
    faq2_a: '<code>%20</code>はRFC 3986由来。<code>+</code>はフォーム形式由来。<code>%20</code>がより汎用的です。',
    faq3_q: 'URL全体をエンコードする必要がありますか？',
    faq3_a: 'いいえ。個別のコンポーネントのみエンコードしてください。構造的文字はエンコードしないでください。',
    faq4_q: 'encodeURIとencodeURIComponentの違いは？',
    faq4_a: '<code>encodeURI()</code>は構造的文字を保持。<code>encodeURIComponent()</code>はそれらもエンコード。パラメータ値には <code>encodeURIComponent()</code> を使用。',
    faq5_q: 'URLエンコードされた文字列をデコードするには？',
    faq5_a: 'JavaScript: <code>decodeURIComponent()</code>。Python: <code>urllib.parse.unquote()</code>。PHP: <code>urldecode()</code>。',

    conclusion: 'URLエンコーディングはすべての開発者が理解すべき基本的なWeb概念です。このガイドをブックマークしてご活用ください。',
    linkToolBottom: 'URLエンコーダー/デコーダーツールを試す →',
  },
  ko: {
    title: 'URL 인코딩(퍼센트 인코딩) 해설: %20과 %3A의 진짜 의미',
    intro: 'URL에서 <code>%20</code>, <code>%3A</code>, <code>%2F</code>를 본 적 있나요? 이것들은 <strong>퍼센트 인코딩</strong>된 문자입니다 — URL이 특수 문자를 안전하게 전달할 수 있게 하는 메커니즘입니다. 이 가이드는 바이트 수준의 동작 원리부터 각 언어의 실용적인 코드 예제까지 설명합니다.',
    linkTool: 'URL 인코더/디코더 도구로 즉시 인코딩 및 디코딩하세요 →',

    h2_what: 'URL 인코딩(퍼센트 인코딩)이란?',
    what_p1: 'URL 인코딩(정식 명칭: <strong>퍼센트 인코딩</strong>)은 <a href="https://datatracker.ietf.org/doc/html/rfc3986" target="_blank" rel="noopener noreferrer">RFC 3986</a>에서 정의된 URI에서 허용되지 않거나 특별한 의미를 가진 문자를 표현하는 메커니즘입니다.',
    what_p2: 'URL에는 제한된 ASCII 문자만 포함할 수 있습니다. 문자는 <strong>예약</strong> 문자(<code>/</code>, <code>?</code>, <code>&</code> 같은 구조적 의미)와 <strong>비예약</strong> 문자(영숫자, <code>-</code>, <code>_</code>, <code>.</code>, <code>~</code>)로 나뉩니다.',
    what_p3: '공백(ASCII 32, 16진수 0x20)은 <code>%20</code>이 됩니다. 콜론(ASCII 58, 16진수 0x3A)은 <code>%3A</code>가 됩니다.',

    h2_table: 'URL 인코딩 문자 참조 테이블',
    table_desc: '가장 자주 사용되는 퍼센트 인코딩 문자의 빠른 참조 테이블입니다.',
    th_char: '문자',
    th_encoded: '인코딩',
    th_name: '이름 / 용도',

    h2_how: 'URL 인코딩 동작 원리 (단계별)',
    how_p1: '인코딩 과정은 세 단계를 따릅니다: (1) 문자 가져오기, (2) UTF-8 바이트 시퀀스로 변환, (3) 각 바이트를 <code>%XX</code>로 인코딩.',
    how_p2: '여러 예제를 살펴보겠습니다:',
    how_p3: '최신 프로그래밍 언어는 이를 자동으로 처리합니다. 내장 함수 또는 온라인 도구를 사용하세요.',
    how_link: 'URL 인코더 도구로 인코딩 & 디코딩 →',

    h2_encodeuri: 'JavaScript의 encodeURI vs encodeURIComponent',
    encodeuri_p1: 'JavaScript는 두 가지 URL 인코딩 함수를 제공합니다. 잘못된 것을 선택하면 버그가 발생합니다.',
    encodeuri_p2: '<strong>encodeURI()</strong>는 전체 URI를 인코딩하며 구조적 문자를 보존합니다.',
    encodeuri_p3: '<strong>encodeURIComponent()</strong>는 URI 컴포넌트를 인코딩하며 <code>& = + /</code> 같은 구조적 문자도 인코딩합니다.',
    encodeuri_rule: '<strong>원칙:</strong> 쿼리 파라미터 값에는 항상 <code>encodeURIComponent()</code>를 사용하세요.',

    h2_languages: '각 프로그래밍 언어의 URL 인코딩',
    lang_desc: '주요 언어에는 URL 인코딩 함수가 내장되어 있습니다:',

    h2_mistakes: '흔한 URL 인코딩 실수',
    mistake1_h3: '1. 이중 인코딩',
    mistake1_p: '이미 인코딩된 문자열을 다시 인코딩하면 발생합니다. <code>%20</code>이 <code>%2520</code>이 됩니다.',
    mistake2_h3: '2. 전체 URL 인코딩',
    mistake2_p: '전체 URL을 <code>encodeURIComponent()</code>에 전달하면 URL 구조가 깨집니다.',
    mistake3_h3: '3. 공백: + vs %20',
    mistake3_p: 'HTML 폼은 <code>+</code>, RFC 3986은 <code>%20</code>을 사용합니다. API에는 <code>%20</code>을 권장합니다.',
    mistake4_h3: '4. 쿼리 파라미터 값 미인코딩',
    mistake4_p: '사용자 입력값을 인코딩하지 않으면 보안 위험이 있고 URL이 깨집니다.',

    h2_best: 'URL 인코딩 모범 사례',
    best_p1: '<strong>사용자 입력은 반드시 인코딩</strong>한 후 쿼리 문자열이나 경로 세그먼트에 삽입하세요.',
    best_p2: '<strong>수동 치환 대신 라이브러리 함수를 사용</strong>하세요.',
    best_p3: '<strong>특수 문자로 테스트:</strong> <code>& = ? / # + %</code> 및 비ASCII 문자.',
    best_p4: '<strong>바이너리 데이터에는 URL 안전 Base64를 사용</strong>하세요.',

    h2_faq: '자주 묻는 질문',
    faq1_q: '왜 공백이 %20으로 인코딩되나요?',
    faq1_a: '공백의 ASCII 코드는 32이고, 16진수로는 0x20입니다. 퍼센트 인코딩은 바이트를 <code>%</code> + 16진수 값으로 표현합니다.',
    faq2_q: '+와 %20의 차이는?',
    faq2_a: '<code>%20</code>은 RFC 3986에서 유래. <code>+</code>는 폼 형식에서 유래. <code>%20</code>이 더 범용적입니다.',
    faq3_q: '전체 URL을 인코딩해야 하나요?',
    faq3_a: '아니요. 개별 컴포넌트만 인코딩하세요. 구조적 문자는 인코딩하지 마세요.',
    faq4_q: 'encodeURI와 encodeURIComponent의 차이는?',
    faq4_a: '<code>encodeURI()</code>는 구조적 문자를 보존. <code>encodeURIComponent()</code>는 그것들도 인코딩. 파라미터 값에는 <code>encodeURIComponent()</code>를 사용.',
    faq5_q: 'URL 인코딩된 문자열을 디코딩하려면?',
    faq5_a: 'JavaScript: <code>decodeURIComponent()</code>. Python: <code>urllib.parse.unquote()</code>. PHP: <code>urldecode()</code>.',

    conclusion: 'URL 인코딩은 모든 개발자가 이해해야 할 기본적인 웹 개념입니다. 이 가이드를 북마크하여 활용하세요.',
    linkToolBottom: 'URL 인코더/디코더 도구를 사용해보세요 →',
  },
};

export default function UrlEncodingPercentEncodingGuide({ lang }: { lang: string }) {
  const l = t[lang] || t.en;

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: l.faq1_q, acceptedAnswer: { '@type': 'Answer', text: l.faq1_a } },
      { '@type': 'Question', name: l.faq2_q, acceptedAnswer: { '@type': 'Answer', text: l.faq2_a } },
      { '@type': 'Question', name: l.faq3_q, acceptedAnswer: { '@type': 'Answer', text: l.faq3_a } },
      { '@type': 'Question', name: l.faq4_q, acceptedAnswer: { '@type': 'Answer', text: l.faq4_a } },
      { '@type': 'Question', name: l.faq5_q, acceptedAnswer: { '@type': 'Answer', text: l.faq5_a } },
    ],
  };

  const thStyle: React.CSSProperties = { padding: '8px 12px', textAlign: 'left' };
  const tdStyle: React.CSSProperties = { padding: '8px 12px' };
  const rowStyle: React.CSSProperties = { borderBottom: '1px solid var(--border-color)' };
  const tableStyle: React.CSSProperties = { width: '100%', borderCollapse: 'collapse', marginBottom: 24 };
  const codeStyle: React.CSSProperties = { color: '#e53e3e', fontWeight: 600, fontFamily: 'monospace', fontSize: 13 };

  const charTable = [
    { char: '(space)', encoded: '%20', name: lang === 'zh' ? '空格' : lang === 'ja' ? 'スペース' : lang === 'ko' ? '공백' : 'Space' },
    { char: '&', encoded: '%26', name: lang === 'zh' ? '参数分隔符' : lang === 'ja' ? 'パラメータ区切り' : lang === 'ko' ? '파라미터 구분자' : 'Ampersand / query separator' },
    { char: '?', encoded: '%3F', name: lang === 'zh' ? '查询字符串起始符' : lang === 'ja' ? 'クエリ文字列開始' : lang === 'ko' ? '쿼리 문자열 시작' : 'Question mark / query start' },
    { char: '/', encoded: '%2F', name: lang === 'zh' ? '路径分隔符' : lang === 'ja' ? 'パス区切り' : lang === 'ko' ? '경로 구분자' : 'Forward slash / path separator' },
    { char: ':', encoded: '%3A', name: lang === 'zh' ? '冒号（协议分隔符）' : lang === 'ja' ? 'コロン（スキーム区切り）' : lang === 'ko' ? '콜론(스킴 구분자)' : 'Colon / scheme separator' },
    { char: '=', encoded: '%3D', name: lang === 'zh' ? '键值分隔符' : lang === 'ja' ? 'キーと値の区切り' : lang === 'ko' ? '키-값 구분자' : 'Equals / key-value separator' },
    { char: '#', encoded: '%23', name: lang === 'zh' ? '片段标识符' : lang === 'ja' ? 'フラグメント識別子' : lang === 'ko' ? '프래그먼트 식별자' : 'Hash / fragment identifier' },
    { char: '+', encoded: '%2B', name: lang === 'zh' ? '加号（表单中表示空格）' : lang === 'ja' ? 'プラス（フォームではスペース）' : lang === 'ko' ? '더하기(폼에서 공백)' : 'Plus sign (space in forms)' },
    { char: '@', encoded: '%40', name: lang === 'zh' ? 'AT 符号' : lang === 'ja' ? 'アットマーク' : lang === 'ko' ? '골뱅이' : 'At sign / userinfo separator' },
    { char: '%', encoded: '%25', name: lang === 'zh' ? '百分号（转义字符本身）' : lang === 'ja' ? 'パーセント（エスケープ文字自体）' : lang === 'ko' ? '퍼센트(이스케이프 문자)' : 'Percent (the escape char itself)' },
    { char: '!', encoded: '%21', name: lang === 'zh' ? '感叹号' : lang === 'ja' ? '感嘆符' : lang === 'ko' ? '느낌표' : 'Exclamation mark' },
    { char: '"', encoded: '%22', name: lang === 'zh' ? '双引号' : lang === 'ja' ? '二重引用符' : lang === 'ko' ? '큰따옴표' : 'Double quote' },
    { char: '<', encoded: '%3C', name: lang === 'zh' ? '小于号' : lang === 'ja' ? '小なり' : lang === 'ko' ? '작음 기호' : 'Less than' },
    { char: '>', encoded: '%3E', name: lang === 'zh' ? '大于号' : lang === 'ja' ? '大なり' : lang === 'ko' ? '큼 기호' : 'Greater than' },
    { char: '{', encoded: '%7B', name: lang === 'zh' ? '左花括号' : lang === 'ja' ? '左中括弧' : lang === 'ko' ? '왼쪽 중괄호' : 'Left curly brace' },
    { char: '}', encoded: '%7D', name: lang === 'zh' ? '右花括号' : lang === 'ja' ? '右中括弧' : lang === 'ko' ? '오른쪽 중괄호' : 'Right curly brace' },
    { char: '[', encoded: '%5B', name: lang === 'zh' ? '左方括号' : lang === 'ja' ? '左角括弧' : lang === 'ko' ? '왼쪽 대괄호' : 'Left square bracket' },
    { char: ']', encoded: '%5D', name: lang === 'zh' ? '右方括号' : lang === 'ja' ? '右角括弧' : lang === 'ko' ? '오른쪽 대괄호' : 'Right square bracket' },
    { char: '|', encoded: '%7C', name: lang === 'zh' ? '竖线' : lang === 'ja' ? 'パイプ' : lang === 'ko' ? '파이프' : 'Pipe / vertical bar' },
    { char: '\\', encoded: '%5C', name: lang === 'zh' ? '反斜杠' : lang === 'ja' ? 'バックスラッシュ' : lang === 'ko' ? '백슬래시' : 'Backslash' },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <p dangerouslySetInnerHTML={{ __html: l.intro }} />
      <p><Link href={`/${lang}/tools/url-encoder`} style={{ fontWeight: 600 }}>{l.linkTool}</Link></p>

      {/* Section 1: What Is URL Encoding */}
      <h2>{l.h2_what}</h2>
      <p dangerouslySetInnerHTML={{ __html: l.what_p1 }} />
      <p dangerouslySetInnerHTML={{ __html: l.what_p2 }} />
      <p dangerouslySetInnerHTML={{ __html: l.what_p3 }} />

      <pre><code>{`// URL encoding in action
Original:  https://example.com/search?q=hello world&lang=en
Encoded:   https://example.com/search?q=hello%20world&lang=en

// Reserved characters and their encoded forms:
//   space → %20    : → %3A    / → %2F
//   ? → %3F        & → %26    = → %3D
//   # → %23        + → %2B    @ → %40`}</code></pre>

      {/* Section 2: Character Reference Table */}
      <h2>{l.h2_table}</h2>
      <p>{l.table_desc}</p>
      <div style={{ overflowX: 'auto' }}>
        <table style={tableStyle}>
          <thead>
            <tr style={{ borderBottom: '2px solid var(--border-color)' }}>
              <th style={{ ...thStyle, width: 90 }}>{l.th_char}</th>
              <th style={{ ...thStyle, width: 100 }}>{l.th_encoded}</th>
              <th style={thStyle}>{l.th_name}</th>
            </tr>
          </thead>
          <tbody>
            {charTable.map((row, i) => (
              <tr key={i} style={rowStyle}>
                <td style={tdStyle}><code style={{ fontFamily: 'monospace', fontSize: 14 }}>{row.char}</code></td>
                <td style={tdStyle}><code style={codeStyle}>{row.encoded}</code></td>
                <td style={tdStyle}>{row.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Section 3: How URL Encoding Works */}
      <h2>{l.h2_how}</h2>
      <p dangerouslySetInnerHTML={{ __html: l.how_p1 }} />
      <p>{l.how_p2}</p>

      <pre><code>{`// Step-by-step: How characters become percent-encoded

// Example 1: ASCII character (space)
// Character: " " (space)
// ASCII code: 32 → hex: 0x20
// Encoded:    %20

// Example 2: ASCII character (ampersand)
// Character: "&"
// ASCII code: 38 → hex: 0x26
// Encoded:    %26

// Example 3: Multi-byte UTF-8 (accented letter)
// Character: "é"
// Unicode: U+00E9
// UTF-8 bytes: 0xC3 0xA9 (2 bytes)
// Encoded:     %C3%A9

// Example 4: Multi-byte UTF-8 (Chinese character)
// Character: "中"
// Unicode: U+4E2D
// UTF-8 bytes: 0xE4 0xB8 0xAD (3 bytes)
// Encoded:     %E4%B8%AD

// Example 5: Multi-byte UTF-8 (emoji)
// Character: "🚀"
// Unicode: U+1F680
// UTF-8 bytes: 0xF0 0x9F 0x9A 0x80 (4 bytes)
// Encoded:     %F0%9F%9A%80`}</code></pre>

      <p dangerouslySetInnerHTML={{ __html: l.how_p3 }} />
      <p><Link href={`/${lang}/tools/url-encoder`} style={{ fontWeight: 600 }}>{l.how_link}</Link></p>

      {/* Section 4: encodeURI vs encodeURIComponent */}
      <h2>{l.h2_encodeuri}</h2>
      <p dangerouslySetInnerHTML={{ __html: l.encodeuri_p1 }} />
      <p dangerouslySetInnerHTML={{ __html: l.encodeuri_p2 }} />

      <pre><code>{`// encodeURI() — preserves URL structure
const url = 'https://example.com/path name?q=hello world';
encodeURI(url);
// → "https://example.com/path%20name?q=hello%20world"
// ✓ :// / ? = are NOT encoded (structure preserved)`}</code></pre>

      <p dangerouslySetInnerHTML={{ __html: l.encodeuri_p3 }} />

      <pre><code>{`// encodeURIComponent() — encodes everything for use as a value
const value = 'price=100&discount=20%';
encodeURIComponent(value);
// → "price%3D100%26discount%3D20%25"
// ✓ = & % ARE encoded (they're data, not structure)

// Correct pattern: build URL piece by piece
const base = 'https://api.example.com/search';
const query = 'Tom & Jerry: The Movie';
const fullUrl = base + '?q=' + encodeURIComponent(query);
// → "https://api.example.com/search?q=Tom%20%26%20Jerry%3A%20The%20Movie"`}</code></pre>

      <p dangerouslySetInnerHTML={{ __html: l.encodeuri_rule }} />

      <pre><code>{`// Comparison table — which characters get encoded?
//
// Character  encodeURI()  encodeURIComponent()
// ─────────  ───────────  ────────────────────
// space      %20          %20
// /          /  (kept)    %2F (encoded)
// ?          ?  (kept)    %3F (encoded)
// &          &  (kept)    %26 (encoded)
// =          =  (kept)    %3D (encoded)
// #          #  (kept)    %23 (encoded)
// :          :  (kept)    %3A (encoded)
// +          +  (kept)    %2B (encoded)
// @          @  (kept)    %40 (encoded)
// é          %C3%A9       %C3%A9
// 中         %E4%B8%AD    %E4%B8%AD`}</code></pre>

      {/* Section 5: URL Encoding in Different Languages */}
      <h2>{l.h2_languages}</h2>
      <p>{l.lang_desc}</p>

      <h3>JavaScript</h3>
      <pre><code>{`// JavaScript — encodeURIComponent / URLSearchParams
// Encode a query parameter value
encodeURIComponent('hello world&key=val');
// → "hello%20world%26key%3Dval"

// Decode
decodeURIComponent('hello%20world%26key%3Dval');
// → "hello world&key=val"

// URLSearchParams (auto-encodes, uses + for spaces)
const params = new URLSearchParams({ q: 'Tom & Jerry', page: '1' });
params.toString(); // → "q=Tom+%26+Jerry&page=1"`}</code></pre>

      <h3>Python</h3>
      <pre><code>{`# Python 3 — urllib.parse
from urllib.parse import quote, quote_plus, unquote, urlencode

# Path encoding (spaces → %20)
quote('hello world/file')        # → "hello%20world/file"
quote('hello world/file', safe='')  # → "hello%20world%2Ffile"

# Query value encoding (spaces → +)
quote_plus('hello world&key=val')  # → "hello+world%26key%3Dval"

# Build query string from dict
urlencode({'q': 'Tom & Jerry', 'page': '1'})
# → "q=Tom+%26+Jerry&page=1"

# Decode
unquote('%E4%B8%AD%E6%96%87')  # → "中文"`}</code></pre>

      <h3>Java</h3>
      <pre><code>{`// Java — URLEncoder (spaces → +)
import java.net.URLEncoder;
import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;

String encoded = URLEncoder.encode(
    "hello world&key=val", StandardCharsets.UTF_8
);
// → "hello+world%26key%3Dval"

String decoded = URLDecoder.decode(encoded, StandardCharsets.UTF_8);
// → "hello world&key=val"`}</code></pre>

      <h3>Go</h3>
      <pre><code>{`// Go — net/url package
package main
import "net/url"

// Query value encoding (spaces → +)
url.QueryEscape("hello world&key=val")
// → "hello+world%26key%3Dval"

// Path segment encoding (spaces → %20)
url.PathEscape("hello world/file")
// → "hello%20world%2Ffile"

// Build URL safely with url.Values
vals := url.Values{}
vals.Set("q", "Tom & Jerry")
vals.Encode() // → "q=Tom+%26+Jerry"`}</code></pre>

      <h3>PHP</h3>
      <pre><code>{`<?php
// PHP — urlencode (spaces → +) / rawurlencode (spaces → %20)
urlencode('hello world&key=val');
// → "hello+world%26key%3Dval"

rawurlencode('hello world&key=val');
// → "hello%20world%26key%3Dval"

http_build_query(['q' => 'Tom & Jerry', 'page' => 1]);
// → "q=Tom+%26+Jerry&page=1"

urldecode('hello%20world');  // → "hello world"
?>`}</code></pre>

      <h3>Ruby</h3>
      <pre><code>{`# Ruby — CGI / URI
require 'cgi'
require 'uri'

CGI.escape('hello world&key=val')
# → "hello+world%26key%3Dval"

URI.encode_www_form('q' => 'Tom & Jerry', 'page' => '1')
# → "q=Tom+%26+Jerry&page=1"

CGI.unescape('hello%20world')  # → "hello world"`}</code></pre>

      {/* Section 6: Common Mistakes */}
      <h2>{l.h2_mistakes}</h2>

      <h3>{l.mistake1_h3}</h3>
      <p dangerouslySetInnerHTML={{ __html: l.mistake1_p }} />
      <pre><code>{`// Double encoding — a very common bug
const value = 'hello world';
const encoded = encodeURIComponent(value);  // "hello%20world"

// BUG: encoding again
encodeURIComponent(encoded);
// → "hello%2520world"  (%20 → %25 + 20)
// Server decodes to "%20" (literal) instead of " " (space)

// FIX: encode raw values exactly once`}</code></pre>

      <h3>{l.mistake2_h3}</h3>
      <p dangerouslySetInnerHTML={{ __html: l.mistake2_p }} />
      <pre><code>{`// WRONG: encoding entire URL
encodeURIComponent('https://example.com/api?q=test');
// → "https%3A%2F%2Fexample.com%2Fapi%3Fq%3Dtest"  (broken!)

// CORRECT: encode only the parameter value
'https://example.com/api?q=' + encodeURIComponent('test value');
// → "https://example.com/api?q=test%20value"`}</code></pre>

      <h3>{l.mistake3_h3}</h3>
      <p dangerouslySetInnerHTML={{ __html: l.mistake3_p }} />
      <pre><code>{`// Space encoding: + vs %20
// HTML form submission (application/x-www-form-urlencoded):
//   "hello world" → "hello+world"

// RFC 3986 (URI standard):
//   "hello world" → "hello%20world"

// JavaScript functions:
encodeURIComponent('hello world');  // → "hello%20world" (RFC 3986)
new URLSearchParams({q: 'hello world'}).toString(); // → "q=hello+world" (form)`}</code></pre>

      <h3>{l.mistake4_h3}</h3>
      <p dangerouslySetInnerHTML={{ __html: l.mistake4_p }} />
      <pre><code>{`// Missing encoding breaks URLs
const search = 'Tom & Jerry';

// WRONG: unencoded & splits the value
'/search?q=' + search;
// → "/search?q=Tom & Jerry"
// Server sees: q="Tom " and Jerry="" (two params!)

// CORRECT: encode the value
'/search?q=' + encodeURIComponent(search);
// → "/search?q=Tom%20%26%20Jerry"
// Server sees: q="Tom & Jerry" (one param)`}</code></pre>

      {/* Section 7: Best Practices */}
      <h2>{l.h2_best}</h2>
      <p dangerouslySetInnerHTML={{ __html: l.best_p1 }} />
      <p dangerouslySetInnerHTML={{ __html: l.best_p2 }} />
      <p dangerouslySetInnerHTML={{ __html: l.best_p3 }} />
      <p dangerouslySetInnerHTML={{ __html: l.best_p4 }} />

      <pre><code>{`// Best practice: use URL / URLSearchParams API
const url = new URL('https://api.example.com/search');
url.searchParams.set('q', 'Tom & Jerry: The Movie');
url.searchParams.set('lang', 'en');
url.toString();
// → "https://api.example.com/search?q=Tom+%26+Jerry%3A+The+Movie&lang=en"
// All encoding handled automatically!

// URL-safe Base64 (avoids + and / in URLs)
// Standard:  "SGVsbG8gV29ybGQ=" (may contain + / =)
// URL-safe:  "SGVsbG8gV29ybGQ"  (uses - _ instead)`}</code></pre>

      <p style={{ marginTop: 8 }}>
        <Link href={`/${lang}/tools/base64-encoder`} style={{ fontWeight: 600, marginRight: 16 }}>Base64 Encoder →</Link>
        <Link href={`/${lang}/tools/url-parser`} style={{ fontWeight: 600 }}>URL Parser →</Link>
      </p>

      {/* Section 8: FAQ */}
      <h2>{l.h2_faq}</h2>
      <h3>{l.faq1_q}</h3>
      <p dangerouslySetInnerHTML={{ __html: l.faq1_a }} />
      <h3>{l.faq2_q}</h3>
      <p dangerouslySetInnerHTML={{ __html: l.faq2_a }} />
      <h3>{l.faq3_q}</h3>
      <p dangerouslySetInnerHTML={{ __html: l.faq3_a }} />
      <h3>{l.faq4_q}</h3>
      <p dangerouslySetInnerHTML={{ __html: l.faq4_a }} />
      <h3>{l.faq5_q}</h3>
      <p dangerouslySetInnerHTML={{ __html: l.faq5_a }} />

      <p style={{ marginTop: 32 }}>{l.conclusion}</p>
      <p><Link href={`/${lang}/tools/url-encoder`} style={{ fontWeight: 600 }}>{l.linkToolBottom}</Link></p>
    </>
  );
}
