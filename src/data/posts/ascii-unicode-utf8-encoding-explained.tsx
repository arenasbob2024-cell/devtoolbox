'use client';
import React from 'react';
import Link from 'next/link';

const translations: Record<string, Record<string, string>> = {
  en: {
    intro: 'Character encoding is the foundation of all digital text. Whether you\'re debugging garbled emails, fixing database collation, or figuring out why your JSON file breaks on certain characters, understanding <strong>ASCII, Unicode, and UTF-8</strong> is essential. This comprehensive guide explains how text is represented in computers, the evolution from ASCII to Unicode, and why <strong>UTF-8 encoding</strong> became the universal standard for the modern web.',
    link_tool: 'Convert between binary and text with our Binary-Text Converter \u2192',

    h2_ascii: '1. ASCII \u2014 The 7-Bit Foundation',
    p_ascii_1: '<strong>ASCII</strong> (American Standard Code for Information Interchange) was published in 1963 and uses <strong>7 bits</strong> to represent <strong>128 characters</strong> (0\u2013127). It includes 33 control characters (0\u201331 and 127) and 95 printable characters (32\u2013126).',
    p_ascii_2: 'ASCII was designed for English text and teletype machines. Every character fits in a single byte, with the high bit (bit 7) unused or used for parity checking.',
    p_ascii_3: 'The 95 printable characters include uppercase letters (A\u2013Z), lowercase letters (a\u2013z), digits (0\u20139), and 33 punctuation/symbol characters. Control characters include NUL (0), TAB (9), LF (10), CR (13), and ESC (27).',
    th_dec: 'Decimal',
    th_hex: 'Hex',
    th_char: 'Character',
    th_desc: 'Description',
    th_binary: 'Binary',
    th_bytes: 'Bytes',
    th_range: 'Code Point Range',
    th_byte1: 'Byte 1',
    th_byte2: 'Byte 2',
    th_byte3: 'Byte 3',
    th_byte4: 'Byte 4',
    th_encoding: 'Encoding',
    th_size: 'Size',
    th_use: 'Primary Use',
    th_bom: 'BOM Bytes',
    th_name: 'Name',
    th_plane: 'Plane',
    th_codepoints: 'Code Points',
    th_content: 'Content',

    h2_extended: '2. Extended ASCII \u2014 The Code Page Chaos',
    p_extended_1: 'Since ASCII uses only 7 bits, the 8th bit in a byte (values 128\u2013255) was free. Different systems used this range for different characters, creating <strong>code pages</strong> \u2014 incompatible extensions of ASCII.',
    p_extended_2: '<strong>ISO 8859-1 (Latin-1)</strong> added Western European characters like \u00e9, \u00fc, \u00f1, and \u00e5. It was the default encoding for HTTP/1.1 and early HTML. <strong>Windows-1252</strong> is Microsoft\'s superset of ISO 8859-1, adding characters like curly quotes (\u201c \u201d), em dash (\u2014), and the euro sign (\u20ac) in the range 128\u2013159.',
    p_extended_3: 'The fundamental problem: <strong>byte 0xE9 means \u00e9 in Latin-1 but \u0449 in Windows-1251 (Cyrillic) and \u00e9 in Windows-1252.</strong> Without knowing which code page was used, you cannot correctly decode text. This is why "mojibake" (garbled text) was rampant in the early web.',
    p_extended_4: 'Other notable code pages include ISO 8859-5 (Cyrillic), ISO 8859-15 (Latin-9, replaced Latin-1 with the euro sign), Shift_JIS and EUC-JP (Japanese), Big5 (Traditional Chinese), and GB2312/GBK (Simplified Chinese).',

    h2_unicode: '3. Unicode \u2014 The Universal Character Set',
    p_unicode_1: '<strong>Unicode</strong> is a universal character set that assigns a unique <strong>code point</strong> to every character in every script. Code points are written as <code>U+</code> followed by 4\u20136 hex digits (e.g., <code>U+0041</code> = A, <code>U+4E16</code> = \u4E16, <code>U+1F600</code> = \uD83D\uDE00).',
    p_unicode_2: 'Unicode currently defines over <strong>154,000 characters</strong> covering 168 scripts, from Latin and Cyrillic to Egyptian hieroglyphs and emoji. The maximum code point is <code>U+10FFFF</code>, giving a theoretical limit of 1,114,112 code points.',
    p_unicode_3: 'Unicode is organized into 17 <strong>planes</strong>, each containing 65,536 code points:',
    p_unicode_4: '<strong>Key distinction:</strong> Unicode is a <em>character set</em> (mapping numbers to characters), not an encoding. The encoding determines how those numbers are stored as bytes. This is where UTF-8, UTF-16, and UTF-32 come in.',

    h2_utf8: '4. UTF-8 Encoding \u2014 Variable-Length Brilliance',
    p_utf8_1: '<strong>UTF-8</strong> (Unicode Transformation Format \u2014 8-bit) is a variable-length encoding that uses <strong>1 to 4 bytes</strong> per character. It was designed by Ken Thompson and Rob Pike in 1992 and is now the dominant encoding on the web (used by over 98% of websites).',
    p_utf8_2: 'UTF-8\'s design is elegant: it\'s <strong>backward compatible with ASCII</strong> (any valid ASCII file is also valid UTF-8), it\'s <strong>self-synchronizing</strong> (you can find character boundaries from any position), and it <strong>never produces zero bytes</strong> in non-NUL characters (safe for C strings).',
    p_utf8_3: 'The encoding algorithm uses a prefix system to indicate the number of bytes:',
    p_utf8_4: 'Let\'s trace through encoding the character \u00e9 (U+00E9, Latin small letter e with acute):',
    p_utf8_5: 'And a more complex example \u2014 the Chinese character \u4E16 (U+4E16, meaning "world"):',
    p_utf8_6: 'For emoji like \uD83D\uDE00 (U+1F600, grinning face):',

    h2_utf16_32: '5. UTF-16 and UTF-32 \u2014 Alternatives to UTF-8',
    p_utf16_1: '<strong>UTF-16</strong> uses 2 or 4 bytes per character. Characters in the BMP (U+0000\u2013U+FFFF) use 2 bytes. Characters outside the BMP use a <strong>surrogate pair</strong> \u2014 two 16-bit code units.',
    p_utf16_2: 'Surrogate pairs work as follows: subtract 0x10000 from the code point, split the 20 resulting bits into a <strong>high surrogate</strong> (0xD800\u20130xDBFF) and a <strong>low surrogate</strong> (0xDC00\u20130xDFFF).',
    p_utf16_3: 'For example, \uD83D\uDE00 (U+1F600): 0x1F600 - 0x10000 = 0xF600. High 10 bits: 0x3D \u2192 0xD800 + 0x3D = <code>0xD83D</code>. Low 10 bits: 0x200 \u2192 0xDC00 + 0x200 = <code>0xDE00</code>. So \uD83D\uDE00 in UTF-16 is <code>D83D DE00</code>.',
    p_utf16_4: '<strong>Where UTF-16 is used:</strong> JavaScript strings (<code>String.charCodeAt()</code> returns UTF-16 code units), Java <code>char</code> type, Windows APIs (wchar_t), and .NET <code>System.String</code>.',
    p_utf16_5: '<strong>UTF-32</strong> uses exactly 4 bytes per character. It\'s the simplest encoding (code point = stored value) but wastes space for Latin text (4x the size of ASCII). It\'s used internally in some programs for easy character indexing but rarely for storage or transmission.',

    h2_bom: '6. BOM (Byte Order Mark)',
    p_bom_1: 'The <strong>Byte Order Mark</strong> (BOM) is a special Unicode character <code>U+FEFF</code> placed at the beginning of a file to indicate its encoding and byte order.',
    p_bom_2: 'For <strong>UTF-16 and UTF-32</strong>, the BOM is essential \u2014 it tells the reader whether the file uses big-endian or little-endian byte order.',
    p_bom_3: '<strong>The UTF-8 BOM controversy:</strong> UTF-8 has no byte order issue (bytes are always in the same order), so a BOM is technically unnecessary. Microsoft tools (Notepad, Excel) add a UTF-8 BOM (<code>EF BB BF</code>) by default, which can cause problems:',
    bom_problem_1: 'PHP scripts may output the BOM before headers, causing "headers already sent" errors',
    bom_problem_2: 'Shell scripts may fail if the shebang line is preceded by BOM bytes',
    bom_problem_3: 'JSON parsers may reject files starting with a BOM (RFC 8259 forbids it)',
    bom_problem_4: 'Concatenating files can embed BOMs in the middle of the output',
    p_bom_4: '<strong>Recommendation:</strong> Do not use BOM for UTF-8 files unless required by a specific tool (e.g., Excel CSV import). Most modern editors and systems handle UTF-8 without a BOM.',

    h2_html: '7. Encoding in HTML',
    p_html_1: 'Correct encoding declaration ensures browsers render your pages correctly. There are three ways the browser determines encoding:',
    p_html_2: '<strong>1. HTTP Content-Type header</strong> (highest priority):',
    p_html_3: '<strong>2. HTML meta tag</strong> (must be within the first 1024 bytes):',
    p_html_4: '<strong>3. HTML character references</strong> for individual characters:',
    p_html_5: '<strong>Priority order:</strong> HTTP header > BOM > meta tag > encoding sniffing. Always set both the HTTP header and meta tag for maximum reliability.',
    p_html_6: 'For HTML5, the <code>&lt;meta charset="UTF-8"&gt;</code> declaration should always be the first element inside <code>&lt;head&gt;</code> to ensure it\'s parsed before any text content.',

    h2_programming: '8. Encoding in Programming Languages',
    p_prog_1: 'Different languages handle string encoding differently. Here\'s how the major languages work:',
    p_prog_python: '<strong>Python 3</strong> distinguishes between <code>str</code> (text, Unicode) and <code>bytes</code> (raw bytes). All strings are Unicode by default:',
    p_prog_js: '<strong>JavaScript / TypeScript</strong> uses UTF-16 internally. The <code>TextEncoder</code> and <code>TextDecoder</code> APIs handle encoding conversion:',
    p_prog_go: '<strong>Go</strong> uses the <code>rune</code> type (alias for <code>int32</code>) to represent Unicode code points. Strings are UTF-8 byte sequences:',

    h2_errors: '9. Common Encoding Errors',
    p_errors_1: '<strong>Mojibake</strong> (literally "character transformation" in Japanese) is garbled text caused by decoding bytes with the wrong encoding. Here are common patterns and fixes:',
    p_errors_2: 'Common mojibake patterns and their causes:',
    err_pattern_1: '<code>\u00c3\u00a9</code> instead of <code>\u00e9</code> \u2014 UTF-8 bytes interpreted as Latin-1',
    err_pattern_2: '<code>\u00e8\u0178\u00a9</code> instead of <code>\u4e16</code> \u2014 UTF-8 bytes interpreted as Latin-1 (3-byte character)',
    err_pattern_3: '<code>\ufffd\ufffd\ufffd</code> (replacement characters) \u2014 invalid byte sequences in UTF-8 decoding',
    err_pattern_4: '<code>???</code> (question marks) \u2014 characters not representable in target encoding',
    p_errors_3: '<strong>Debugging tools:</strong>',
    err_debug_1: '<code>xxd</code> or <code>hexdump</code> \u2014 inspect raw bytes in a file',
    err_debug_2: '<code>file -i filename</code> (Linux/macOS) \u2014 detect file encoding',
    err_debug_3: '<code>iconv -f FROM -t TO filename</code> \u2014 convert between encodings',
    err_debug_4: '<code>chardet</code> / <code>chardetect</code> (Python library) \u2014 auto-detect encoding',
    p_errors_4: 'Common fix with <code>iconv</code>:',
    p_errors_5: 'In Python, you can repair double-encoded text:',

    h2_emoji: '10. Emoji Encoding',
    p_emoji_1: 'Emoji are Unicode characters, mostly in the <strong>Supplementary Multilingual Plane</strong> (U+1F000\u2013U+1FFFF) and other supplementary planes. In UTF-8, most emoji require <strong>4 bytes</strong>.',
    p_emoji_2: '<strong>ZWJ (Zero Width Joiner) sequences</strong> combine multiple emoji into a single glyph using U+200D. For example, the family emoji is composed of individual person emoji joined with ZWJ:',
    p_emoji_3: '<strong>Variation selectors</strong> modify the presentation of a character. <code>U+FE0F</code> (VS16) requests emoji presentation, while <code>U+FE0E</code> (VS15) requests text presentation:',
    p_emoji_4: '<strong>Skin tone modifiers</strong> (U+1F3FB\u2013U+1F3FF) follow a base emoji to change skin tone. The base + modifier appear as a single character:',
    p_emoji_5: '<strong>Flag sequences</strong> use pairs of Regional Indicator Symbols (U+1F1E6\u2013U+1F1FF). Each letter corresponds to a country code:',
    p_emoji_6: 'Because of these combining mechanisms, a single visible "character" (grapheme cluster) can be many Unicode code points and many bytes long. The family emoji with skin tones can be over 25 bytes in UTF-8.',

    h2_best: '11. Best Practices',
    p_best_1: 'Follow these rules to avoid encoding issues in your projects:',
    best_1: '<strong>Always use UTF-8.</strong> Set it in your editor, your database, your HTTP headers, and your HTML meta tags. There is no reason to use any other encoding for new projects.',
    best_2: '<strong>Declare encoding explicitly.</strong> Never rely on encoding detection or defaults. Use <code>&lt;meta charset="UTF-8"&gt;</code> in HTML and <code>Content-Type: text/html; charset=utf-8</code> in HTTP headers.',
    best_3: '<strong>Database collation matters.</strong> Use <code>utf8mb4</code> (not <code>utf8</code>) in MySQL/MariaDB. MySQL\'s <code>utf8</code> only supports 3-byte characters (no emoji). For collation, use <code>utf8mb4_unicode_ci</code> or <code>utf8mb4_0900_ai_ci</code>.',
    best_4: '<strong>Save files as UTF-8 without BOM.</strong> Configure your editor to save in UTF-8. Avoid BOM unless specifically required.',
    best_5: '<strong>Handle encoding at the boundary.</strong> Decode bytes to strings as early as possible (at input), and encode strings to bytes as late as possible (at output).',
    best_6: '<strong>Test with non-ASCII data.</strong> Use strings like <code>"caf\u00e9 \u4e16\u754c \uD83D\uDE00"</code> in your test data to catch encoding bugs early.',
    best_7: '<strong>Use parameterized queries.</strong> Never construct SQL with string concatenation. Parameterized queries handle encoding correctly and prevent SQL injection.',
    best_8: '<strong>Normalize Unicode.</strong> Use NFC normalization for storage and comparison. The character \u00e9 can be represented as a single code point (U+00E9) or as e + combining acute (U+0065 U+0301). NFC ensures a consistent form.',
    p_best_2: 'Database creation example with proper encoding:',

    h2_faq: '12. Frequently Asked Questions',
    faq1_q: 'What is the difference between ASCII and UTF-8?',
    faq1_a: 'ASCII is a 7-bit character set with 128 characters (English letters, digits, symbols, and control characters). UTF-8 is a variable-length encoding that can represent all 154,000+ Unicode characters. UTF-8 is backward compatible with ASCII \u2014 the first 128 UTF-8 characters are identical to ASCII, using a single byte each. Characters beyond ASCII use 2\u20134 bytes in UTF-8.',
    faq2_q: 'Why should I use UTF-8 instead of UTF-16 or UTF-32?',
    faq2_a: 'UTF-8 is the most space-efficient for text that\'s primarily Latin-based (which includes most code, markup, and web content). It\'s backward compatible with ASCII, so existing ASCII tools work unchanged. It\'s also the standard for the web (98%+ of websites), JSON (required by RFC 8259), and most modern APIs. UTF-16 is used internally by JavaScript and Java, and UTF-32 is used for easy code point indexing, but neither is recommended for interchange or storage.',
    faq3_q: 'How do I fix mojibake (garbled characters) in my text?',
    faq3_a: 'First, identify the original encoding by examining the byte pattern. Common patterns: <code>\u00c3\u00a9</code> instead of <code>\u00e9</code> means UTF-8 was misread as Latin-1. Fix by re-encoding: in Python, use <code>text.encode("latin-1").decode("utf-8")</code>. For files, use <code>iconv -f WRONG_ENCODING -t utf-8 file.txt</code>. The <code>chardet</code> Python library can auto-detect the original encoding.',
    faq4_q: 'What is the difference between Unicode and UTF-8?',
    faq4_a: 'Unicode is a <em>character set</em> \u2014 a mapping from numbers (code points) to characters. For example, U+0041 = A, U+4E16 = \u4E16. UTF-8 is an <em>encoding</em> \u2014 the rules for converting those code points into bytes for storage and transmission. Think of Unicode as the dictionary and UTF-8 as the handwriting style. Other encodings like UTF-16 and UTF-32 can also represent Unicode characters, just using different byte patterns.',
    faq5_q: 'Why does MySQL utf8 not support emoji, and what should I use instead?',
    faq5_a: 'MySQL\'s <code>utf8</code> charset is actually a non-standard 3-byte-max subset of UTF-8. It cannot store characters that require 4 bytes in UTF-8, which includes all emoji (e.g., \uD83D\uDE00 U+1F600) and many CJK characters. Use <code>utf8mb4</code> instead, which supports the full UTF-8 range (1\u20134 bytes). When creating databases or tables, specify: <code>CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci</code>.',

    conclusion: 'Understanding character encoding is fundamental to building reliable software. The evolution from ASCII to Unicode to UTF-8 solved the global text representation problem. Always use UTF-8, declare it explicitly, and test with diverse characters to avoid encoding bugs.',
    link_binary: 'Convert text to binary and back with our Binary-Text Converter \u2192',
    link_html: 'Encode HTML entities with our HTML Entity Tool \u2192',
    link_base64: 'Encode and decode Base64 with our Base64 Tool \u2192',
  },
  zh: {
    intro: '字符编码是所有数字文本的基础。无论你是在调试乱码邮件、修复数据库排序规则，还是搞清楚为什么 JSON 文件在某些字符上出错，理解 <strong>ASCII、Unicode 和 UTF-8</strong> 都是必不可少的。本综合指南解释了计算机中文本的表示方式、从 ASCII 到 Unicode 的演进过程，以及为什么 <strong>UTF-8 编码</strong>成为了现代网络的通用标准。',
    link_tool: '使用我们的二进制-文本转换工具进行转换 \u2192',

    h2_ascii: '1. ASCII \u2014 7 位的基石',
    p_ascii_1: '<strong>ASCII</strong>（美国信息交换标准代码）于 1963 年发布，使用 <strong>7 位</strong>表示 <strong>128 个字符</strong>（0\u2013127）。包括 33 个控制字符（0\u201331 和 127）和 95 个可打印字符（32\u2013126）。',
    p_ascii_2: 'ASCII 专为英文文本和电传打字机设计。每个字符占一个字节，高位（第 7 位）未使用或用于奇偶校验。',
    p_ascii_3: '95 个可打印字符包括大写字母（A\u2013Z）、小写字母（a\u2013z）、数字（0\u20139）和 33 个标点/符号字符。控制字符包括 NUL（0）、TAB（9）、LF（10）、CR（13）和 ESC（27）。',
    th_dec: '十进制',
    th_hex: '十六进制',
    th_char: '字符',
    th_desc: '说明',
    th_binary: '二进制',
    th_bytes: '字节数',
    th_range: '码位范围',
    th_byte1: '字节 1',
    th_byte2: '字节 2',
    th_byte3: '字节 3',
    th_byte4: '字节 4',
    th_encoding: '编码',
    th_size: '大小',
    th_use: '主要用途',
    th_bom: 'BOM 字节',
    th_name: '名称',
    th_plane: '平面',
    th_codepoints: '码位',
    th_content: '内容',

    h2_extended: '2. 扩展 ASCII \u2014 代码页混战',
    p_extended_1: '由于 ASCII 只使用 7 位，一个字节中第 8 位（值 128\u2013255）是空闲的。不同系统用这个范围表示不同字符，产生了<strong>代码页</strong>\u2014\u2014不兼容的 ASCII 扩展。',
    p_extended_2: '<strong>ISO 8859-1（Latin-1）</strong>添加了西欧字符，如 \u00e9、\u00fc、\u00f1 和 \u00e5。它是 HTTP/1.1 和早期 HTML 的默认编码。<strong>Windows-1252</strong> 是微软对 ISO 8859-1 的超集，在 128\u2013159 范围内添加了弯引号（\u201c \u201d）、长破折号（\u2014）和欧元符号（\u20ac）等字符。',
    p_extended_3: '根本问题是：<strong>字节 0xE9 在 Latin-1 中表示 \u00e9，在 Windows-1251（西里尔文）中表示 \u0449，在 Windows-1252 中表示 \u00e9。</strong>如果不知道使用的是哪个代码页，就无法正确解码文本。这就是为什么"乱码"在早期互联网上如此猖獗。',
    p_extended_4: '其他著名的代码页包括 ISO 8859-5（西里尔文）、ISO 8859-15（Latin-9，用欧元符号替代了 Latin-1）、Shift_JIS 和 EUC-JP（日文）、Big5（繁体中文）以及 GB2312/GBK（简体中文）。',

    h2_unicode: '3. Unicode \u2014 统一字符集',
    p_unicode_1: '<strong>Unicode</strong> 是一个通用字符集，为每种文字中的每个字符分配一个唯一的<strong>码位</strong>。码位写成 <code>U+</code> 后跟 4\u20136 个十六进制数字（如 <code>U+0041</code> = A，<code>U+4E16</code> = \u4E16，<code>U+1F600</code> = \uD83D\uDE00）。',
    p_unicode_2: 'Unicode 目前定义了超过 <strong>154,000 个字符</strong>，涵盖 168 种文字，从拉丁文和西里尔文到埃及象形文字和表情符号。最大码位为 <code>U+10FFFF</code>，理论上限为 1,114,112 个码位。',
    p_unicode_3: 'Unicode 被组织为 17 个<strong>平面</strong>，每个平面包含 65,536 个码位：',
    p_unicode_4: '<strong>关键区别：</strong>Unicode 是一个<em>字符集</em>（将数字映射到字符），不是编码。编码决定了这些数字如何存储为字节。这就是 UTF-8、UTF-16 和 UTF-32 的作用。',

    h2_utf8: '4. UTF-8 编码 \u2014 可变长度的精妙设计',
    p_utf8_1: '<strong>UTF-8</strong>（Unicode 转换格式 \u2014 8 位）是一种可变长度编码，每个字符使用 <strong>1 到 4 个字节</strong>。它由 Ken Thompson 和 Rob Pike 于 1992 年设计，现在是网络上占主导地位的编码（超过 98% 的网站使用）。',
    p_utf8_2: 'UTF-8 的设计非常优雅：它与 <strong>ASCII 向后兼容</strong>（任何有效的 ASCII 文件也是有效的 UTF-8），它是<strong>自同步的</strong>（你可以从任何位置找到字符边界），而且<strong>非 NUL 字符永远不会产生零字节</strong>（对 C 字符串安全）。',
    p_utf8_3: '编码算法使用前缀系统来指示字节数：',
    p_utf8_4: '让我们跟踪编码字符 \u00e9（U+00E9，带尖音符的拉丁小写字母 e）的过程：',
    p_utf8_5: '一个更复杂的例子\u2014\u2014中文字符 \u4E16（U+4E16，意为"世界"）：',
    p_utf8_6: '对于表情符号如 \uD83D\uDE00（U+1F600，微笑脸）：',

    h2_utf16_32: '5. UTF-16 和 UTF-32 \u2014 UTF-8 的替代方案',
    p_utf16_1: '<strong>UTF-16</strong> 每个字符使用 2 或 4 个字节。BMP 中的字符（U+0000\u2013U+FFFF）使用 2 个字节。BMP 外的字符使用<strong>代理对</strong>\u2014\u2014两个 16 位代码单元。',
    p_utf16_2: '代理对的工作方式：从码位减去 0x10000，将得到的 20 位分成<strong>高代理</strong>（0xD800\u20130xDBFF）和<strong>低代理</strong>（0xDC00\u20130xDFFF）。',
    p_utf16_3: '例如，\uD83D\uDE00（U+1F600）：0x1F600 - 0x10000 = 0xF600。高 10 位：0x3D \u2192 0xD800 + 0x3D = <code>0xD83D</code>。低 10 位：0x200 \u2192 0xDC00 + 0x200 = <code>0xDE00</code>。所以 \uD83D\uDE00 在 UTF-16 中是 <code>D83D DE00</code>。',
    p_utf16_4: '<strong>UTF-16 的使用场景：</strong>JavaScript 字符串（<code>String.charCodeAt()</code> 返回 UTF-16 代码单元）、Java 的 <code>char</code> 类型、Windows API（wchar_t）以及 .NET 的 <code>System.String</code>。',
    p_utf16_5: '<strong>UTF-32</strong> 每个字符固定使用 4 个字节。它是最简单的编码（码位 = 存储值），但对拉丁文本浪费空间（ASCII 的 4 倍大小）。它在一些程序内部用于简化字符索引，但很少用于存储或传输。',

    h2_bom: '6. BOM（字节顺序标记）',
    p_bom_1: '<strong>字节顺序标记</strong>（BOM）是一个特殊的 Unicode 字符 <code>U+FEFF</code>，放在文件开头以指示其编码和字节顺序。',
    p_bom_2: '对于 <strong>UTF-16 和 UTF-32</strong>，BOM 是必不可少的\u2014\u2014它告诉读取器文件使用的是大端序还是小端序字节顺序。',
    p_bom_3: '<strong>UTF-8 BOM 争议：</strong>UTF-8 没有字节顺序问题（字节始终按相同顺序），所以 BOM 在技术上是不必要的。Microsoft 工具（记事本、Excel）默认添加 UTF-8 BOM（<code>EF BB BF</code>），这可能导致问题：',
    bom_problem_1: 'PHP 脚本可能在 headers 之前输出 BOM，导致"headers already sent"错误',
    bom_problem_2: '如果 shebang 行前面有 BOM 字节，Shell 脚本可能失败',
    bom_problem_3: 'JSON 解析器可能拒绝以 BOM 开头的文件（RFC 8259 禁止这样做）',
    bom_problem_4: '连接文件可能将 BOM 嵌入输出的中间',
    p_bom_4: '<strong>建议：</strong>除非特定工具要求（如 Excel CSV 导入），否则不要对 UTF-8 文件使用 BOM。大多数现代编辑器和系统无需 BOM 即可处理 UTF-8。',

    h2_html: '7. HTML 中的编码',
    p_html_1: '正确的编码声明确保浏览器正确渲染页面。浏览器通过三种方式确定编码：',
    p_html_2: '<strong>1. HTTP Content-Type 头</strong>（最高优先级）：',
    p_html_3: '<strong>2. HTML meta 标签</strong>（必须在前 1024 字节内）：',
    p_html_4: '<strong>3. HTML 字符引用</strong>用于单个字符：',
    p_html_5: '<strong>优先顺序：</strong>HTTP 头 > BOM > meta 标签 > 编码嗅探。始终同时设置 HTTP 头和 meta 标签以获得最大可靠性。',
    p_html_6: '对于 HTML5，<code>&lt;meta charset="UTF-8"&gt;</code> 声明应始终是 <code>&lt;head&gt;</code> 内的第一个元素，以确保在解析任何文本内容之前就被处理。',

    h2_programming: '8. 编程语言中的编码',
    p_prog_1: '不同编程语言处理字符串编码的方式不同。以下是主要语言的工作方式：',
    p_prog_python: '<strong>Python 3</strong> 区分 <code>str</code>（文本，Unicode）和 <code>bytes</code>（原始字节）。所有字符串默认为 Unicode：',
    p_prog_js: '<strong>JavaScript / TypeScript</strong> 内部使用 UTF-16。<code>TextEncoder</code> 和 <code>TextDecoder</code> API 处理编码转换：',
    p_prog_go: '<strong>Go</strong> 使用 <code>rune</code> 类型（<code>int32</code> 的别名）表示 Unicode 码位。字符串是 UTF-8 字节序列：',

    h2_errors: '9. 常见编码错误',
    p_errors_1: '<strong>乱码</strong>（日语中的"文字化け"）是用错误编码解码字节导致的乱码文本。以下是常见模式和修复方法：',
    p_errors_2: '常见乱码模式及其原因：',
    err_pattern_1: '<code>\u00c3\u00a9</code> 而不是 <code>\u00e9</code> \u2014 UTF-8 字节被当作 Latin-1 解读',
    err_pattern_2: '<code>\u00e8\u0178\u00a9</code> 而不是 <code>\u4e16</code> \u2014 UTF-8 字节被当作 Latin-1 解读（3 字节字符）',
    err_pattern_3: '<code>\ufffd\ufffd\ufffd</code>（替换字符）\u2014 UTF-8 解码中的无效字节序列',
    err_pattern_4: '<code>???</code>（问号）\u2014 字符在目标编码中无法表示',
    p_errors_3: '<strong>调试工具：</strong>',
    err_debug_1: '<code>xxd</code> 或 <code>hexdump</code> \u2014 检查文件中的原始字节',
    err_debug_2: '<code>file -i filename</code>（Linux/macOS）\u2014 检测文件编码',
    err_debug_3: '<code>iconv -f FROM -t TO filename</code> \u2014 在编码之间转换',
    err_debug_4: '<code>chardet</code> / <code>chardetect</code>（Python 库）\u2014 自动检测编码',
    p_errors_4: '使用 <code>iconv</code> 的常见修复方法：',
    p_errors_5: '在 Python 中，你可以修复双重编码的文本：',

    h2_emoji: '10. 表情符号编码',
    p_emoji_1: '表情符号是 Unicode 字符，主要位于<strong>补充多语言平面</strong>（U+1F000\u2013U+1FFFF）和其他补充平面。在 UTF-8 中，大多数表情符号需要 <strong>4 个字节</strong>。',
    p_emoji_2: '<strong>ZWJ（零宽连接符）序列</strong>使用 U+200D 将多个表情符号组合成单个字形。例如，家庭表情符号由单个人物表情符号通过 ZWJ 连接而成：',
    p_emoji_3: '<strong>变体选择器</strong>修改字符的呈现方式。<code>U+FE0F</code>（VS16）请求表情呈现，而 <code>U+FE0E</code>（VS15）请求文本呈现：',
    p_emoji_4: '<strong>肤色修饰符</strong>（U+1F3FB\u2013U+1F3FF）跟在基础表情符号后面以改变肤色。基础 + 修饰符显示为单个字符：',
    p_emoji_5: '<strong>国旗序列</strong>使用成对的区域指示符号（U+1F1E6\u2013U+1F1FF）。每个字母对应一个国家代码：',
    p_emoji_6: '由于这些组合机制，一个可见的"字符"（字素簇）可以包含许多 Unicode 码位和许多字节。带有肤色的家庭表情符号在 UTF-8 中可以超过 25 个字节。',

    h2_best: '11. 最佳实践',
    p_best_1: '遵循以下规则以避免项目中的编码问题：',
    best_1: '<strong>始终使用 UTF-8。</strong>在编辑器、数据库、HTTP 头和 HTML meta 标签中都设置它。新项目没有理由使用其他编码。',
    best_2: '<strong>显式声明编码。</strong>永远不要依赖编码检测或默认值。在 HTML 中使用 <code>&lt;meta charset="UTF-8"&gt;</code>，在 HTTP 头中使用 <code>Content-Type: text/html; charset=utf-8</code>。',
    best_3: '<strong>数据库排序规则很重要。</strong>在 MySQL/MariaDB 中使用 <code>utf8mb4</code>（而不是 <code>utf8</code>）。MySQL 的 <code>utf8</code> 仅支持 3 字节字符（不支持表情符号）。对于排序规则，使用 <code>utf8mb4_unicode_ci</code> 或 <code>utf8mb4_0900_ai_ci</code>。',
    best_4: '<strong>将文件保存为不带 BOM 的 UTF-8。</strong>配置编辑器以 UTF-8 格式保存。除非特别要求，否则避免使用 BOM。',
    best_5: '<strong>在边界处理编码。</strong>尽早将字节解码为字符串（在输入时），尽晚将字符串编码为字节（在输出时）。',
    best_6: '<strong>使用非 ASCII 数据测试。</strong>在测试数据中使用像 <code>"caf\u00e9 \u4e16\u754c \uD83D\uDE00"</code> 这样的字符串，以便尽早发现编码错误。',
    best_7: '<strong>使用参数化查询。</strong>永远不要用字符串拼接构造 SQL。参数化查询可以正确处理编码并防止 SQL 注入。',
    best_8: '<strong>规范化 Unicode。</strong>使用 NFC 规范化进行存储和比较。字符 \u00e9 可以表示为单个码位（U+00E9）或 e + 组合尖音符（U+0065 U+0301）。NFC 确保使用一致的形式。',
    p_best_2: '使用正确编码创建数据库的示例：',

    h2_faq: '12. 常见问题',
    faq1_q: 'ASCII 和 UTF-8 有什么区别？',
    faq1_a: 'ASCII 是一个 7 位字符集，包含 128 个字符（英文字母、数字、符号和控制字符）。UTF-8 是一种可变长度编码，可以表示所有 154,000 多个 Unicode 字符。UTF-8 向后兼容 ASCII\u2014\u2014前 128 个 UTF-8 字符与 ASCII 完全相同，各使用一个字节。ASCII 之外的字符在 UTF-8 中使用 2\u20134 个字节。',
    faq2_q: '为什么应该使用 UTF-8 而不是 UTF-16 或 UTF-32？',
    faq2_a: 'UTF-8 对于以拉丁文为主的文本（包括大多数代码、标记和网页内容）是最节省空间的。它向后兼容 ASCII，因此现有的 ASCII 工具无需更改即可使用。它也是网络（98% 以上的网站）、JSON（RFC 8259 要求）和大多数现代 API 的标准。UTF-16 在 JavaScript 和 Java 内部使用，UTF-32 用于方便的码位索引，但两者都不推荐用于交换或存储。',
    faq3_q: '如何修复文本中的乱码？',
    faq3_a: '首先，通过检查字节模式确定原始编码。常见模式：<code>\u00c3\u00a9</code> 而不是 <code>\u00e9</code> 意味着 UTF-8 被错误地当作 Latin-1 读取。修复方法：在 Python 中使用 <code>text.encode("latin-1").decode("utf-8")</code>。对于文件，使用 <code>iconv -f WRONG_ENCODING -t utf-8 file.txt</code>。Python 的 <code>chardet</code> 库可以自动检测原始编码。',
    faq4_q: 'Unicode 和 UTF-8 有什么区别？',
    faq4_a: 'Unicode 是一个<em>字符集</em>\u2014\u2014从数字（码位）到字符的映射。例如，U+0041 = A，U+4E16 = \u4E16。UTF-8 是一种<em>编码</em>\u2014\u2014将这些码位转换为字节以进行存储和传输的规则。可以把 Unicode 看作字典，UTF-8 看作书写风格。UTF-16 和 UTF-32 等其他编码也可以表示 Unicode 字符，只是使用不同的字节模式。',
    faq5_q: '为什么 MySQL 的 utf8 不支持表情符号，应该用什么替代？',
    faq5_a: 'MySQL 的 <code>utf8</code> 字符集实际上是一个非标准的最大 3 字节 UTF-8 子集。它无法存储在 UTF-8 中需要 4 个字节的字符，包括所有表情符号（如 \uD83D\uDE00 U+1F600）和许多 CJK 字符。请改用 <code>utf8mb4</code>，它支持完整的 UTF-8 范围（1\u20134 字节）。创建数据库或表时，请指定：<code>CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci</code>。',

    conclusion: '理解字符编码是构建可靠软件的基础。从 ASCII 到 Unicode 再到 UTF-8 的演进解决了全球文本表示问题。始终使用 UTF-8，显式声明编码，并使用多样化的字符进行测试以避免编码错误。',
    link_binary: '使用我们的二进制-文本转换器进行文本与二进制的转换 \u2192',
    link_html: '使用我们的 HTML 实体工具进行编码 \u2192',
    link_base64: '使用我们的 Base64 工具进行编码和解码 \u2192',
  },
};

export default function AsciiUnicodeUtf8EncodingExplained({ lang }: { lang: string }) {
  const t = translations[lang] || translations['en'];

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: t.faq1_q, acceptedAnswer: { '@type': 'Answer', text: t.faq1_a } },
      { '@type': 'Question', name: t.faq2_q, acceptedAnswer: { '@type': 'Answer', text: t.faq2_a } },
      { '@type': 'Question', name: t.faq3_q, acceptedAnswer: { '@type': 'Answer', text: t.faq3_a } },
      { '@type': 'Question', name: t.faq4_q, acceptedAnswer: { '@type': 'Answer', text: t.faq4_a } },
      { '@type': 'Question', name: t.faq5_q, acceptedAnswer: { '@type': 'Answer', text: t.faq5_a } },
    ],
  };

  const codeStyle: React.CSSProperties = { display: 'inline', background: 'rgba(139,92,246,0.1)', padding: '2px 6px', borderRadius: 4, fontFamily: 'monospace', fontSize: 13 };
  const thStyle: React.CSSProperties = { padding: '8px 12px', textAlign: 'left' };
  const tdStyle: React.CSSProperties = { padding: '8px 12px' };
  const headTr: React.CSSProperties = { borderBottom: '2px solid var(--border-color)' };
  const bodyTr: React.CSSProperties = { borderBottom: '1px solid var(--border-color)' };
  const tableStyle: React.CSSProperties = { width: '100%', borderCollapse: 'collapse', marginBottom: 24 };

  const R = ({ children }: { children: React.ReactNode }) => (
    <tr style={bodyTr}>{children}</tr>
  );
  const C = ({ children }: { children: React.ReactNode }) => (
    <td style={tdStyle}>{children}</td>
  );
  const Cd = ({ children }: { children: React.ReactNode }) => (
    <td style={tdStyle}><code style={codeStyle}>{children}</code></td>
  );

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <p dangerouslySetInnerHTML={{ __html: t.intro }} />
      <p><Link href={`/${lang}/tools/binary-text`} style={{ fontWeight: 600 }}>{t.link_tool}</Link></p>

      {/* Section 1: ASCII */}
      <h2>{t.h2_ascii}</h2>
      <p dangerouslySetInnerHTML={{ __html: t.p_ascii_1 }} />
      <p>{t.p_ascii_2}</p>
      <p>{t.p_ascii_3}</p>

      <table style={tableStyle}>
        <thead>
          <tr style={headTr}>
            <th style={thStyle}>{t.th_dec}</th>
            <th style={thStyle}>{t.th_hex}</th>
            <th style={thStyle}>{t.th_char}</th>
            <th style={thStyle}>{t.th_desc}</th>
          </tr>
        </thead>
        <tbody>
          <R><Cd>0</Cd><Cd>00</Cd><C>NUL</C><C>Null character</C></R>
          <R><Cd>9</Cd><Cd>09</Cd><C>TAB</C><C>Horizontal tab</C></R>
          <R><Cd>10</Cd><Cd>0A</Cd><C>LF</C><C>Line feed (newline)</C></R>
          <R><Cd>13</Cd><Cd>0D</Cd><C>CR</C><C>Carriage return</C></R>
          <R><Cd>27</Cd><Cd>1B</Cd><C>ESC</C><C>Escape</C></R>
          <R><Cd>32</Cd><Cd>20</Cd><C>(space)</C><C>Space</C></R>
          <R><Cd>48</Cd><Cd>30</Cd><C>0</C><C>Digit zero</C></R>
          <R><Cd>57</Cd><Cd>39</Cd><C>9</C><C>Digit nine</C></R>
          <R><Cd>65</Cd><Cd>41</Cd><C>A</C><C>Uppercase A</C></R>
          <R><Cd>90</Cd><Cd>5A</Cd><C>Z</C><C>Uppercase Z</C></R>
          <R><Cd>97</Cd><Cd>61</Cd><C>a</C><C>Lowercase a</C></R>
          <R><Cd>122</Cd><Cd>7A</Cd><C>z</C><C>Lowercase z</C></R>
          <R><Cd>127</Cd><Cd>7F</Cd><C>DEL</C><C>Delete</C></R>
        </tbody>
      </table>

      {/* Section 2: Extended ASCII */}
      <h2>{t.h2_extended}</h2>
      <p dangerouslySetInnerHTML={{ __html: t.p_extended_1 }} />
      <p dangerouslySetInnerHTML={{ __html: t.p_extended_2 }} />
      <p dangerouslySetInnerHTML={{ __html: t.p_extended_3 }} />
      <p>{t.p_extended_4}</p>

      <pre><code>{`# Same byte, different interpretations:
Byte: 0xE9

Latin-1 (ISO 8859-1):  é  (LATIN SMALL LETTER E WITH ACUTE)
Windows-1251 (Cyrillic): щ  (CYRILLIC SMALL LETTER SHCHA)
Windows-874 (Thai):     ้  (THAI CHARACTER MAI THO)

# This is why encoding metadata is critical!`}</code></pre>

      {/* Section 3: Unicode */}
      <h2>{t.h2_unicode}</h2>
      <p dangerouslySetInnerHTML={{ __html: t.p_unicode_1 }} />
      <p dangerouslySetInnerHTML={{ __html: t.p_unicode_2 }} />
      <p>{t.p_unicode_3}</p>

      <table style={tableStyle}>
        <thead>
          <tr style={headTr}>
            <th style={thStyle}>{t.th_plane}</th>
            <th style={thStyle}>{t.th_name}</th>
            <th style={thStyle}>{t.th_range}</th>
            <th style={thStyle}>{t.th_content}</th>
          </tr>
        </thead>
        <tbody>
          <R><Cd>0</Cd><C>Basic Multilingual Plane (BMP)</C><Cd>U+0000 - U+FFFF</Cd><C>Latin, Cyrillic, Greek, CJK, Arabic, Hebrew, most symbols</C></R>
          <R><Cd>1</Cd><C>Supplementary Multilingual Plane (SMP)</C><Cd>U+10000 - U+1FFFF</Cd><C>Emoji, historic scripts, musical notation, math symbols</C></R>
          <R><Cd>2</Cd><C>Supplementary Ideographic Plane (SIP)</C><Cd>U+20000 - U+2FFFF</Cd><C>Rare CJK ideographs</C></R>
          <R><Cd>3-13</Cd><C>Unassigned</C><Cd>U+30000 - U+DFFFF</Cd><C>Reserved for future use</C></R>
          <R><Cd>14</Cd><C>Supplementary Special-purpose Plane (SSP)</C><Cd>U+E0000 - U+EFFFF</Cd><C>Tag characters, variation selectors</C></R>
          <R><Cd>15-16</Cd><C>Private Use Areas</C><Cd>U+F0000 - U+10FFFF</Cd><C>Custom characters (not standardized)</C></R>
        </tbody>
      </table>

      <p dangerouslySetInnerHTML={{ __html: t.p_unicode_4 }} />

      <pre><code>{`# Unicode code points are abstract numbers:
U+0041  →  A          (Latin capital letter A)
U+00E9  →  é          (Latin small letter e with acute)
U+4E16  →  世         (CJK Unified Ideograph - "world")
U+1F600 →  😀         (Grinning face emoji)

# These are just numbers — the encoding determines
# how they become bytes in memory or files.`}</code></pre>

      {/* Section 4: UTF-8 */}
      <h2>{t.h2_utf8}</h2>
      <p dangerouslySetInnerHTML={{ __html: t.p_utf8_1 }} />
      <p dangerouslySetInnerHTML={{ __html: t.p_utf8_2 }} />
      <p>{t.p_utf8_3}</p>

      <table style={tableStyle}>
        <thead>
          <tr style={headTr}>
            <th style={thStyle}>{t.th_bytes}</th>
            <th style={thStyle}>{t.th_range}</th>
            <th style={thStyle}>{t.th_byte1}</th>
            <th style={thStyle}>{t.th_byte2}</th>
            <th style={thStyle}>{t.th_byte3}</th>
            <th style={thStyle}>{t.th_byte4}</th>
          </tr>
        </thead>
        <tbody>
          <R><Cd>1</Cd><Cd>U+0000 - U+007F</Cd><Cd>0xxxxxxx</Cd><C>-</C><C>-</C><C>-</C></R>
          <R><Cd>2</Cd><Cd>U+0080 - U+07FF</Cd><Cd>110xxxxx</Cd><Cd>10xxxxxx</Cd><C>-</C><C>-</C></R>
          <R><Cd>3</Cd><Cd>U+0800 - U+FFFF</Cd><Cd>1110xxxx</Cd><Cd>10xxxxxx</Cd><Cd>10xxxxxx</Cd><C>-</C></R>
          <R><Cd>4</Cd><Cd>U+10000 - U+10FFFF</Cd><Cd>11110xxx</Cd><Cd>10xxxxxx</Cd><Cd>10xxxxxx</Cd><Cd>10xxxxxx</Cd></R>
        </tbody>
      </table>

      <p dangerouslySetInnerHTML={{ __html: t.p_utf8_4 }} />
      <pre><code>{`# Encoding é (U+00E9) to UTF-8:
# Step 1: 0x00E9 = 0000 0000 1110 1001 in binary
# Step 2: U+00E9 falls in range U+0080–U+07FF → 2 bytes
# Step 3: Template: 110xxxxx 10xxxxxx
# Step 4: Fill in bits from right:
#   00E9 = 000 1110 1001
#   Byte 1: 110_00011 = 0xC3
#   Byte 2: 10_101001 = 0xA9
# Result: é = C3 A9 (2 bytes in UTF-8)

echo -n "é" | xxd
# Output: 00000000: c3a9`}</code></pre>

      <p dangerouslySetInnerHTML={{ __html: t.p_utf8_5 }} />
      <pre><code>{`# Encoding 世 (U+4E16) to UTF-8:
# Step 1: 0x4E16 = 0100 1110 0001 0110 in binary
# Step 2: U+4E16 falls in range U+0800–U+FFFF → 3 bytes
# Step 3: Template: 1110xxxx 10xxxxxx 10xxxxxx
# Step 4: Fill in bits:
#   4E16 = 0100 1110 0001 0110
#   Byte 1: 1110_0100 = 0xE4
#   Byte 2: 10_111000 = 0xB8
#   Byte 3: 10_010110 = 0x96
# Result: 世 = E4 B8 96 (3 bytes in UTF-8)

echo -n "世" | xxd
# Output: 00000000: e4b8 96`}</code></pre>

      <p dangerouslySetInnerHTML={{ __html: t.p_utf8_6 }} />
      <pre><code>{`# Encoding 😀 (U+1F600) to UTF-8:
# Step 1: 0x1F600 = 0001 1111 0110 0000 0000 in binary
# Step 2: U+1F600 falls in range U+10000–U+10FFFF → 4 bytes
# Step 3: Template: 11110xxx 10xxxxxx 10xxxxxx 10xxxxxx
# Step 4: Fill in bits:
#   1F600 = 0 0001 1111 0110 0000 0000
#   Byte 1: 11110_000 = 0xF0
#   Byte 2: 10_011111 = 0x9F
#   Byte 3: 10_011000 = 0x98
#   Byte 4: 10_000000 = 0x80
# Result: 😀 = F0 9F 98 80 (4 bytes in UTF-8)

echo -n "😀" | xxd
# Output: 00000000: f09f 9880`}</code></pre>

      {/* Section 5: UTF-16 and UTF-32 */}
      <h2>{t.h2_utf16_32}</h2>
      <p dangerouslySetInnerHTML={{ __html: t.p_utf16_1 }} />
      <p dangerouslySetInnerHTML={{ __html: t.p_utf16_2 }} />
      <p dangerouslySetInnerHTML={{ __html: t.p_utf16_3 }} />
      <p dangerouslySetInnerHTML={{ __html: t.p_utf16_4 }} />

      <pre><code>{`// JavaScript uses UTF-16 internally
const emoji = "😀";

// .length counts UTF-16 code units, NOT characters
console.log(emoji.length);          // 2 (surrogate pair)
console.log(emoji.charCodeAt(0));   // 55357 (0xD83D - high surrogate)
console.log(emoji.charCodeAt(1));   // 56832 (0xDE00 - low surrogate)

// Use codePointAt() for actual Unicode code points
console.log(emoji.codePointAt(0));  // 128512 (0x1F600)

// Use spread or Array.from for correct character counting
console.log([...emoji].length);     // 1 (correct!)
console.log(Array.from(emoji).length); // 1

// String.fromCodePoint handles supplementary characters
console.log(String.fromCodePoint(0x1F600)); // 😀`}</code></pre>

      <p dangerouslySetInnerHTML={{ __html: t.p_utf16_5 }} />

      <table style={tableStyle}>
        <thead>
          <tr style={headTr}>
            <th style={thStyle}>{t.th_encoding}</th>
            <th style={thStyle}>{t.th_size}</th>
            <th style={thStyle}>{t.th_use}</th>
          </tr>
        </thead>
        <tbody>
          <R><C>UTF-8</C><C>1-4 bytes/char</C><C>Web, files, APIs, JSON, databases</C></R>
          <R><C>UTF-16</C><C>2 or 4 bytes/char</C><C>JavaScript, Java, Windows, .NET</C></R>
          <R><C>UTF-32</C><C>4 bytes/char (fixed)</C><C>Internal processing, random access</C></R>
        </tbody>
      </table>

      {/* Section 6: BOM */}
      <h2>{t.h2_bom}</h2>
      <p dangerouslySetInnerHTML={{ __html: t.p_bom_1 }} />
      <p dangerouslySetInnerHTML={{ __html: t.p_bom_2 }} />

      <table style={tableStyle}>
        <thead>
          <tr style={headTr}>
            <th style={thStyle}>{t.th_encoding}</th>
            <th style={thStyle}>{t.th_bom}</th>
            <th style={thStyle}>{t.th_desc}</th>
          </tr>
        </thead>
        <tbody>
          <R><C>UTF-8</C><Cd>EF BB BF</Cd><C>Optional (discouraged)</C></R>
          <R><C>UTF-16 BE</C><Cd>FE FF</Cd><C>Big-endian byte order</C></R>
          <R><C>UTF-16 LE</C><Cd>FF FE</Cd><C>Little-endian byte order</C></R>
          <R><C>UTF-32 BE</C><Cd>00 00 FE FF</Cd><C>Big-endian byte order</C></R>
          <R><C>UTF-32 LE</C><Cd>FF FE 00 00</Cd><C>Little-endian byte order</C></R>
        </tbody>
      </table>

      <p dangerouslySetInnerHTML={{ __html: t.p_bom_3 }} />
      <ul>
        <li>{t.bom_problem_1}</li>
        <li>{t.bom_problem_2}</li>
        <li>{t.bom_problem_3}</li>
        <li>{t.bom_problem_4}</li>
      </ul>
      <p dangerouslySetInnerHTML={{ __html: t.p_bom_4 }} />

      <pre><code>{`# Check for BOM in a file:
xxd file.txt | head -1
# UTF-8 BOM: 00000000: efbb bf...

# Remove UTF-8 BOM with sed (Linux/macOS):
sed -i '1s/^\\xEF\\xBB\\xBF//' file.txt

# Remove BOM with Python:
with open('file.txt', 'rb') as f:
    content = f.read()
if content.startswith(b'\\xef\\xbb\\xbf'):
    content = content[3:]
with open('file.txt', 'wb') as f:
    f.write(content)`}</code></pre>

      {/* Section 7: Encoding in HTML */}
      <h2>{t.h2_html}</h2>
      <p>{t.p_html_1}</p>

      <p dangerouslySetInnerHTML={{ __html: t.p_html_2 }} />
      <pre><code>{`Content-Type: text/html; charset=utf-8`}</code></pre>

      <p dangerouslySetInnerHTML={{ __html: t.p_html_3 }} />
      <pre><code>{`<!-- HTML5 (recommended) -->
<meta charset="UTF-8">

<!-- HTML4 / XHTML equivalent -->
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">`}</code></pre>

      <p dangerouslySetInnerHTML={{ __html: t.p_html_4 }} />
      <pre><code>{`<!-- Named entity -->
<p>Copyright &copy; 2025</p>

<!-- Decimal numeric entity -->
<p>&#169; = &#233; = &#19990;</p>

<!-- Hex numeric entity -->
<p>&#xA9; = &#xE9; = &#x4E16;</p>

<!-- Emoji via hex entity -->
<p>&#x1F600; = 😀</p>`}</code></pre>

      <p dangerouslySetInnerHTML={{ __html: t.p_html_5 }} />
      <p dangerouslySetInnerHTML={{ __html: t.p_html_6 }} />

      <pre><code>{`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">  <!-- Must be first! -->
  <title>My Page</title>
</head>
<body>
  <p>café 世界 😀</p>  <!-- All render correctly with UTF-8 -->
</body>
</html>`}</code></pre>

      {/* Section 8: Encoding in Programming */}
      <h2>{t.h2_programming}</h2>
      <p>{t.p_prog_1}</p>

      <h3 dangerouslySetInnerHTML={{ __html: t.p_prog_python }} />
      <pre><code>{`# Python 3: str is Unicode, bytes is raw bytes
text = "café 世界 😀"       # str (Unicode)
encoded = text.encode('utf-8')  # bytes
decoded = encoded.decode('utf-8')  # back to str

print(type(text))      # <class 'str'>
print(type(encoded))   # <class 'bytes'>
print(encoded)         # b'caf\\xc3\\xa9 \\xe4\\xb8\\x96\\xe7\\x95\\x8c \\xf0\\x9f\\x98\\x80'
print(len(text))       # 8 (characters)
print(len(encoded))    # 18 (bytes)

# Handling encoding errors
bad_bytes = b'\\xc3\\x28'  # Invalid UTF-8
# text = bad_bytes.decode('utf-8')  # UnicodeDecodeError!
text = bad_bytes.decode('utf-8', errors='replace')  # '\\ufffd('
text = bad_bytes.decode('utf-8', errors='ignore')   # '('

# Reading files with explicit encoding
with open('file.txt', 'r', encoding='utf-8') as f:
    content = f.read()`}</code></pre>

      <h3 dangerouslySetInnerHTML={{ __html: t.p_prog_js }} />
      <pre><code>{`// JavaScript: strings are UTF-16, use TextEncoder for UTF-8
const text = "café 世界 😀";

// TextEncoder converts string → UTF-8 bytes
const encoder = new TextEncoder();
const bytes = encoder.encode(text);
console.log(bytes);  // Uint8Array(18) [99, 97, 102, ...]
console.log(bytes.length);  // 18 bytes

// TextDecoder converts UTF-8 bytes → string
const decoder = new TextDecoder('utf-8');
const decoded = decoder.decode(bytes);
console.log(decoded);  // "café 世界 😀"

// Handling errors
const badBytes = new Uint8Array([0xC3, 0x28]);
const strictDecoder = new TextDecoder('utf-8', { fatal: true });
try {
  strictDecoder.decode(badBytes);  // throws TypeError
} catch (e) {
  console.log('Invalid UTF-8 sequence');
}

// Correct character counting with Intl.Segmenter
const segmenter = new Intl.Segmenter();
const graphemes = [...segmenter.segment(text)];
console.log(graphemes.length);  // 8 (correct grapheme clusters)`}</code></pre>

      <h3 dangerouslySetInnerHTML={{ __html: t.p_prog_go }} />
      <pre><code>{`package main

import (
    "fmt"
    "unicode/utf8"
)

func main() {
    text := "café 世界 😀"

    // len() returns byte count
    fmt.Println(len(text))  // 18 bytes

    // utf8.RuneCountInString() returns character count
    fmt.Println(utf8.RuneCountInString(text))  // 8 runes

    // Range over string iterates by rune (not byte)
    for i, r := range text {
        fmt.Printf("byte %d: U+%04X %c (%d bytes)\\n",
            i, r, r, utf8.RuneLen(r))
    }
    // byte 0: U+0063 c (1 bytes)
    // byte 1: U+0061 a (1 bytes)
    // byte 2: U+0066 f (1 bytes)
    // byte 3: U+00E9 é (2 bytes)
    // byte 5: U+0020   (1 bytes)
    // byte 6: U+4E16 世 (3 bytes)
    // byte 9: U+754C 界 (3 bytes)
    // byte 12: U+0020   (1 bytes)
    // byte 13: U+1F600 😀 (4 bytes)
}`}</code></pre>

      {/* Section 9: Common Encoding Errors */}
      <h2>{t.h2_errors}</h2>
      <p dangerouslySetInnerHTML={{ __html: t.p_errors_1 }} />
      <p>{t.p_errors_2}</p>
      <ul>
        <li dangerouslySetInnerHTML={{ __html: t.err_pattern_1 }} />
        <li dangerouslySetInnerHTML={{ __html: t.err_pattern_2 }} />
        <li dangerouslySetInnerHTML={{ __html: t.err_pattern_3 }} />
        <li dangerouslySetInnerHTML={{ __html: t.err_pattern_4 }} />
      </ul>

      <pre><code>{`# Why does "é" become "Ã©"?
# UTF-8 encodes é as two bytes: C3 A9
# If those bytes are read as Latin-1:
#   C3 → Ã
#   A9 → ©
# Result: "Ã©" instead of "é"

# Why does "世" become "ä¸–"?
# UTF-8 encodes 世 as three bytes: E4 B8 96
# If those bytes are read as Latin-1:
#   E4 → ä    B8 → ¸    96 → (control char, often shown as –)
# Result: "ä¸–" instead of "世"`}</code></pre>

      <p dangerouslySetInnerHTML={{ __html: t.p_errors_3 }} />
      <ul>
        <li dangerouslySetInnerHTML={{ __html: t.err_debug_1 }} />
        <li dangerouslySetInnerHTML={{ __html: t.err_debug_2 }} />
        <li dangerouslySetInnerHTML={{ __html: t.err_debug_3 }} />
        <li dangerouslySetInnerHTML={{ __html: t.err_debug_4 }} />
      </ul>

      <p dangerouslySetInnerHTML={{ __html: t.p_errors_4 }} />
      <pre><code>{`# Convert from Latin-1 to UTF-8:
iconv -f ISO-8859-1 -t UTF-8 input.txt > output.txt

# Convert from Windows-1252 to UTF-8:
iconv -f WINDOWS-1252 -t UTF-8 input.txt > output.txt

# List all available encodings:
iconv -l

# Detect encoding with chardet (Python):
pip install chardet
chardetect file.txt
# file.txt: utf-8 with confidence 0.99`}</code></pre>

      <p dangerouslySetInnerHTML={{ __html: t.p_errors_5 }} />
      <pre><code>{`# Fix double-encoded UTF-8 in Python:
# If UTF-8 bytes were incorrectly decoded as Latin-1 then re-encoded
broken = "cafÃ©"  # é was double-encoded
fixed = broken.encode('latin-1').decode('utf-8')
print(fixed)  # "café"

# Using chardet to auto-detect encoding:
import chardet

with open('mystery.txt', 'rb') as f:
    raw = f.read()
    result = chardet.detect(raw)
    print(result)
    # {'encoding': 'utf-8', 'confidence': 0.99, 'language': ''}
    text = raw.decode(result['encoding'])`}</code></pre>

      {/* Section 10: Emoji Encoding */}
      <h2>{t.h2_emoji}</h2>
      <p dangerouslySetInnerHTML={{ __html: t.p_emoji_1 }} />

      <pre><code>{`# Simple emoji: single code point
😀 = U+1F600
UTF-8:  F0 9F 98 80 (4 bytes)
UTF-16: D83D DE00  (4 bytes, surrogate pair)`}</code></pre>

      <p dangerouslySetInnerHTML={{ __html: t.p_emoji_2 }} />
      <pre><code>{`# ZWJ (Zero Width Joiner) sequences:
# 👨‍👩‍👧‍👦 = Man + ZWJ + Woman + ZWJ + Girl + ZWJ + Boy
# U+1F468 U+200D U+1F469 U+200D U+1F467 U+200D U+1F466

# In JavaScript:
const family = "👨‍👩‍👧‍👦";
console.log(family.length);           // 11 (UTF-16 code units!)
console.log([...family].length);      // 7 (code points, still wrong!)

// Correct: use Intl.Segmenter
const seg = new Intl.Segmenter();
console.log([...seg.segment(family)].length);  // 1 (one grapheme cluster)

# In Python:
import unicodedata
family = "👨\\u200D👩\\u200D👧\\u200D👦"
print(len(family))  # 7 code points
# For grapheme clusters, use the 'grapheme' library`}</code></pre>

      <p dangerouslySetInnerHTML={{ __html: t.p_emoji_3 }} />
      <pre><code>{`# Variation selectors change presentation:
# ❤ (U+2764) + U+FE0F → ❤️  (emoji presentation, red heart)
# ❤ (U+2764) + U+FE0E → ❤︎  (text presentation, outline heart)

# ☺ (U+263A) + U+FE0F → ☺️  (emoji style)
# ☺ (U+263A) + U+FE0E → ☺︎  (text style)

# In HTML:
# <span>&#x2764;&#xFE0F;</span>  → red emoji heart
# <span>&#x2764;&#xFE0E;</span>  → text-style heart`}</code></pre>

      <p dangerouslySetInnerHTML={{ __html: t.p_emoji_4 }} />
      <pre><code>{`# Skin tone modifiers (Fitzpatrick scale):
# 👋 (U+1F44B) + 🏻 (U+1F3FB) → 👋🏻  (light skin)
# 👋 (U+1F44B) + 🏽 (U+1F3FD) → 👋🏽  (medium skin)
# 👋 (U+1F44B) + 🏿 (U+1F3FF) → 👋🏿  (dark skin)

# Each modifier adds 4 bytes in UTF-8:
# 👋 alone:  F0 9F 91 8B           (4 bytes)
# 👋🏽 :    F0 9F 91 8B F0 9F 8F BD  (8 bytes)`}</code></pre>

      <p dangerouslySetInnerHTML={{ __html: t.p_emoji_5 }} />
      <pre><code>{`# Flag emoji use Regional Indicator Symbols:
# 🇺🇸 = U+1F1FA (RI U) + U+1F1F8 (RI S) = US flag
# 🇯🇵 = U+1F1EF (RI J) + U+1F1F5 (RI P) = JP flag
# 🇩🇪 = U+1F1E9 (RI D) + U+1F1EA (RI E) = DE flag

# Each regional indicator is 4 bytes in UTF-8
# So each flag emoji is 8 bytes in UTF-8`}</code></pre>

      <p>{t.p_emoji_6}</p>

      {/* Section 11: Best Practices */}
      <h2>{t.h2_best}</h2>
      <p>{t.p_best_1}</p>
      <ol>
        <li dangerouslySetInnerHTML={{ __html: t.best_1 }} />
        <li dangerouslySetInnerHTML={{ __html: t.best_2 }} />
        <li dangerouslySetInnerHTML={{ __html: t.best_3 }} />
        <li dangerouslySetInnerHTML={{ __html: t.best_4 }} />
        <li dangerouslySetInnerHTML={{ __html: t.best_5 }} />
        <li dangerouslySetInnerHTML={{ __html: t.best_6 }} />
        <li dangerouslySetInnerHTML={{ __html: t.best_7 }} />
        <li dangerouslySetInnerHTML={{ __html: t.best_8 }} />
      </ol>

      <p dangerouslySetInnerHTML={{ __html: t.p_best_2 }} />
      <pre><code>{`-- MySQL / MariaDB: Always use utf8mb4
CREATE DATABASE myapp
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255),
  bio TEXT
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- PostgreSQL: UTF-8 is the default and recommended encoding
CREATE DATABASE myapp
  ENCODING 'UTF8'
  LC_COLLATE 'en_US.UTF-8'
  LC_CTYPE 'en_US.UTF-8';

-- Check current encoding:
-- MySQL:      SHOW VARIABLES LIKE 'character_set%';
-- PostgreSQL: SHOW server_encoding;`}</code></pre>

      <pre><code>{`# .editorconfig — enforce UTF-8 across your project
root = true

[*]
charset = utf-8
end_of_line = lf
insert_final_newline = true
trim_trailing_whitespace = true`}</code></pre>

      {/* Section 12: FAQ */}
      <h2>{t.h2_faq}</h2>
      <h3>{t.faq1_q}</h3>
      <p dangerouslySetInnerHTML={{ __html: t.faq1_a }} />
      <h3>{t.faq2_q}</h3>
      <p dangerouslySetInnerHTML={{ __html: t.faq2_a }} />
      <h3>{t.faq3_q}</h3>
      <p dangerouslySetInnerHTML={{ __html: t.faq3_a }} />
      <h3>{t.faq4_q}</h3>
      <p dangerouslySetInnerHTML={{ __html: t.faq4_a }} />
      <h3>{t.faq5_q}</h3>
      <p dangerouslySetInnerHTML={{ __html: t.faq5_a }} />

      <p style={{ marginTop: 32 }}>{t.conclusion}</p>
      <p><Link href={`/${lang}/tools/binary-text`} style={{ fontWeight: 600 }}>{t.link_binary}</Link></p>
      <p><Link href={`/${lang}/tools/html-entity`} style={{ fontWeight: 600 }}>{t.link_html}</Link></p>
      <p><Link href={`/${lang}/tools/base64`} style={{ fontWeight: 600 }}>{t.link_base64}</Link></p>
    </>
  );
}
