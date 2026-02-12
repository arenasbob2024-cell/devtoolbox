'use client';
import React from 'react';
import Link from 'next/link';

const translations: Record<string, Record<string, string>> = {
  en: {
    intro: 'Every JWT is just three Base64URL-encoded strings separated by dots. You do not need <strong>jsonwebtoken</strong>, <strong>PyJWT</strong>, or any library to <em>read</em> what is inside. This guide gives you working one-liners in <strong>JavaScript, Node.js, Python, Bash, Go, and PHP</strong> so you can decode any JWT token instantly from any environment.',
    linkTool: 'Decode JWT tokens instantly with our JWT Decoder tool',

    h2Structure: '1. JWT Structure: header.payload.signature',
    pStructure: 'A JWT consists of exactly three parts separated by periods. The first two parts (header and payload) are Base64URL-encoded JSON objects. The third part is the cryptographic signature. You only need to decode the first two parts to read the token contents.',

    h2JsBrowser: '2. JavaScript One-Liner (Browser)',
    pJsBrowser: 'The browser provides <code>atob()</code> to decode Base64 strings. Combined with <code>JSON.parse()</code>, you get a single expression that decodes any JWT payload. Note that <code>atob()</code> expects standard Base64, so we must replace the URL-safe characters first.',

    h2Node: '3. Node.js One-Liner',
    pNode: 'Node.js does not have <code>atob()</code> in older versions, but <code>Buffer.from()</code> handles Base64URL natively since Node 15.7+. This is the cleanest approach for server-side JavaScript.',

    h2Python: '4. Python One-Liner',
    pPython: 'Python\'s <code>base64</code> module has <code>urlsafe_b64decode</code> which handles the URL-safe alphabet directly. The only catch is that you need to add padding, because JWT strips trailing <code>=</code> characters.',

    h2Bash: '5. Bash One-Liner',
    pBash: 'Using standard Unix tools (<code>cut</code>, <code>base64</code>, <code>jq</code>), you can decode JWTs directly in your terminal. This is invaluable for debugging in CI/CD pipelines, Docker containers, and SSH sessions.',

    h2Go: '6. Go One-Liner (Compact Function)',
    pGo: 'Go\'s standard library includes <code>encoding/base64</code> with <code>RawURLEncoding</code> which handles Base64URL without padding. No third-party packages needed.',

    h2Php: '7. PHP One-Liner',
    pPhp: 'PHP\'s <code>base64_decode()</code> is tolerant of missing padding and can handle URL-safe characters after a simple <code>strtr()</code> translation. This works in any PHP version.',

    h2Why: '8. Why This Works: Base64URL vs Base64',
    pWhy: 'JWT uses Base64URL encoding (RFC 4648 Section 5), which differs from standard Base64 in exactly two characters. Understanding this difference is the key to decoding JWTs without a library.',
    pWhy2: 'Standard Base64 uses <code>+</code> and <code>/</code> as the 62nd and 63rd characters, with <code>=</code> for padding. Base64URL replaces <code>+</code> with <code>-</code> and <code>/</code> with <code>_</code>, and strips the padding. This makes JWT tokens safe to embed in URLs, HTTP headers, and cookies without escaping.',

    h2Security: '9. Security Warning: Decode != Verify',
    pSecurity: 'Decoding a JWT does NOT verify it. Anyone can create a JWT with any payload. Decoding only reveals the claims inside the token; it tells you nothing about whether the token is authentic, unexpired, or unmodified.',
    sec1: 'Never trust decoded payload data without verifying the signature first.',
    sec2: 'Never use manual decoding for authentication or authorization decisions.',
    sec3: 'The signature (third part) requires the secret key or public key to verify.',
    sec4: 'Use a vetted library (jsonwebtoken, PyJWT, go-jwt) for any security-sensitive operation.',
    sec5: 'Manual decoding is only appropriate for debugging, logging, and inspecting token contents.',

    h2Pitfalls: '10. Common Pitfalls',
    pitfall1Title: 'Missing Padding',
    pitfall1Desc: 'JWT strips Base64 padding (<code>=</code>) to keep tokens compact. Most Base64 decoders expect padding. Fix: append <code>=</code> characters until the string length is a multiple of 4, or use a decoder that handles unpadded input (like Go\'s <code>RawURLEncoding</code> or Python\'s <code>urlsafe_b64decode</code> with manual padding).',
    pitfall2Title: 'URL-Safe Characters Not Replaced',
    pitfall2Desc: 'Standard <code>atob()</code> and many Base64 decoders only accept <code>+</code> and <code>/</code>. If you forget to replace <code>-</code> and <code>_</code> back to <code>+</code> and <code>/</code>, the decoder will throw an error or produce garbage output.',
    pitfall3Title: 'UTF-8 Encoding Issues',
    pitfall3Desc: 'If the JWT payload contains non-ASCII characters (e.g., names in Chinese, Arabic, or emoji), <code>atob()</code> will break because it returns Latin-1, not UTF-8. In browsers, wrap with <code>decodeURIComponent(escape(atob(...)))</code> or use <code>TextDecoder</code>. Node.js <code>Buffer</code> handles UTF-8 correctly by default.',
    pitfall4Title: 'Decoding the Signature',
    pitfall4Desc: 'The third part is a binary hash, not JSON. Do not try to <code>JSON.parse()</code> the signature. It will fail. The signature is only useful when verified against the header + payload using the signing key.',

    h2WhenLibrary: '11. When to Use a Library Instead',
    pWhenLibrary: 'Manual decoding is perfect for quick inspection, but you should use a proper JWT library when:',
    lib1: 'You need to verify the signature (authentication and authorization).',
    lib2: 'You need to check expiration (exp), not-before (nbf), and other time-based claims.',
    lib3: 'You are handling RS256/ES256 tokens with public/private key pairs.',
    lib4: 'You need to create (sign) new tokens, not just read existing ones.',
    lib5: 'You are building middleware that gates access to protected routes.',

    h2Faq: 'FAQ',
    faq1q: 'Can I decode a JWT without any library?',
    faq1a: 'Yes. A JWT payload is just a Base64URL-encoded JSON string. You can decode it with built-in Base64 functions available in every programming language. You only need a library to verify the signature.',
    faq2q: 'Is it safe to decode a JWT on the client side?',
    faq2a: 'Decoding on the client side is safe for display purposes (e.g., showing the user\'s name or checking the expiration time in the UI). However, never make security decisions based on client-side decoding alone, because the token could be forged. Always verify the signature on the server.',
    faq3q: 'Why does atob() fail on some JWT tokens?',
    faq3a: 'atob() expects standard Base64, but JWT uses Base64URL encoding which replaces + with - and / with _. You must convert these characters back before calling atob(). Additionally, atob() does not handle UTF-8 multi-byte characters correctly; use TextDecoder for non-ASCII payloads.',
    faq4q: 'What is the difference between Base64 and Base64URL?',
    faq4a: 'Base64URL (RFC 4648 Section 5) replaces + with - and / with _ to make the output URL-safe. It also strips padding (=) characters. JWT uses Base64URL so tokens can appear in URLs, cookies, and HTTP headers without encoding issues.',
    faq5q: 'Can I modify a decoded JWT and use it?',
    faq5a: 'You can decode and modify the payload, but the modified token will have an invalid signature. Any server that properly verifies signatures will reject it. This is exactly how JWT prevents tampering: the signature covers the exact header and payload bytes.',
  },
  zh: {
    intro: '每个 JWT 都只是三段 Base64URL 编码的字符串，用点号分隔。你不需要 <strong>jsonwebtoken</strong>、<strong>PyJWT</strong> 或任何库就能<em>读取</em>其中的内容。本指南提供 <strong>JavaScript、Node.js、Python、Bash、Go 和 PHP</strong> 的可用单行命令，让你在任何环境中即时解码 JWT 令牌。',
    linkTool: '使用我们的 JWT 解码工具即时解码 JWT 令牌',

    h2Structure: '1. JWT 结构：header.payload.signature',
    pStructure: 'JWT 由三个部分组成，用点号分隔。前两部分（header 和 payload）是 Base64URL 编码的 JSON 对象。第三部分是加密签名。你只需要解码前两部分就能读取令牌内容。',

    h2JsBrowser: '2. JavaScript 单行代码（浏览器）',
    pJsBrowser: '浏览器提供 <code>atob()</code> 来解码 Base64 字符串。配合 <code>JSON.parse()</code>，你可以用一个表达式解码任何 JWT 负载。注意 <code>atob()</code> 期望标准 Base64，所以我们必须先替换 URL 安全字符。',

    h2Node: '3. Node.js 单行代码',
    pNode: '旧版本的 Node.js 没有 <code>atob()</code>，但 <code>Buffer.from()</code> 从 Node 15.7+ 开始原生支持 Base64URL。这是服务端 JavaScript 最简洁的方式。',

    h2Python: '4. Python 单行代码',
    pPython: 'Python 的 <code>base64</code> 模块有 <code>urlsafe_b64decode</code>，直接处理 URL 安全字母表。唯一的问题是需要添加填充，因为 JWT 会去掉尾部的 <code>=</code> 字符。',

    h2Bash: '5. Bash 单行命令',
    pBash: '使用标准 Unix 工具（<code>cut</code>、<code>base64</code>、<code>jq</code>），你可以直接在终端解码 JWT。这在 CI/CD 流水线、Docker 容器和 SSH 会话中调试时非常有用。',

    h2Go: '6. Go 紧凑函数',
    pGo: 'Go 的标准库包含 <code>encoding/base64</code>，其 <code>RawURLEncoding</code> 可处理无填充的 Base64URL。无需第三方包。',

    h2Php: '7. PHP 单行代码',
    pPhp: 'PHP 的 <code>base64_decode()</code> 对缺少填充比较宽容，通过简单的 <code>strtr()</code> 转换即可处理 URL 安全字符。适用于任何 PHP 版本。',

    h2Why: '8. 原理：Base64URL vs Base64',
    pWhy: 'JWT 使用 Base64URL 编码（RFC 4648 第 5 节），与标准 Base64 只有两个字符的区别。理解这个区别是不依赖库解码 JWT 的关键。',
    pWhy2: '标准 Base64 使用 <code>+</code> 和 <code>/</code> 作为第 62 和 63 个字符，<code>=</code> 作为填充。Base64URL 将 <code>+</code> 替换为 <code>-</code>，<code>/</code> 替换为 <code>_</code>，并去掉填充。这使得 JWT 令牌可以安全地嵌入 URL、HTTP 头和 Cookie 中，无需转义。',

    h2Security: '9. 安全警告：解码 != 验证',
    pSecurity: '解码 JWT 并不等于验证它。任何人都可以创建包含任意负载的 JWT。解码只能揭示令牌中的声明，并不能告诉你令牌是否真实、未过期或未被修改。',
    sec1: '在验证签名之前，永远不要信任解码后的负载数据。',
    sec2: '永远不要使用手动解码来做认证或授权决策。',
    sec3: '签名（第三部分）需要密钥或公钥才能验证。',
    sec4: '对于任何安全敏感操作，使用经过验证的库（jsonwebtoken、PyJWT、go-jwt）。',
    sec5: '手动解码仅适用于调试、日志记录和检查令牌内容。',

    h2Pitfalls: '10. 常见陷阱',
    pitfall1Title: '缺少填充',
    pitfall1Desc: 'JWT 去掉 Base64 填充（<code>=</code>）以保持令牌紧凑。大多数 Base64 解码器期望有填充。解决方法：追加 <code>=</code> 字符直到字符串长度是 4 的倍数，或使用处理无填充输入的解码器（如 Go 的 <code>RawURLEncoding</code> 或 Python 的 <code>urlsafe_b64decode</code> 加手动填充）。',
    pitfall2Title: 'URL 安全字符未替换',
    pitfall2Desc: '标准 <code>atob()</code> 和许多 Base64 解码器只接受 <code>+</code> 和 <code>/</code>。如果忘记将 <code>-</code> 和 <code>_</code> 替换回 <code>+</code> 和 <code>/</code>，解码器会报错或产生乱码。',
    pitfall3Title: 'UTF-8 编码问题',
    pitfall3Desc: '如果 JWT 负载包含非 ASCII 字符（如中文、阿拉伯文或表情符号），<code>atob()</code> 会出错，因为它返回 Latin-1 而不是 UTF-8。在浏览器中用 <code>decodeURIComponent(escape(atob(...)))</code> 包裹或使用 <code>TextDecoder</code>。Node.js 的 <code>Buffer</code> 默认正确处理 UTF-8。',
    pitfall4Title: '试图解码签名',
    pitfall4Desc: '第三部分是二进制哈希，不是 JSON。不要尝试 <code>JSON.parse()</code> 签名部分，这会失败。签名只有在使用签名密钥验证 header + payload 时才有意义。',

    h2WhenLibrary: '11. 什么时候应该使用库',
    pWhenLibrary: '手动解码非常适合快速检查，但在以下情况下应该使用正规的 JWT 库：',
    lib1: '需要验证签名（认证和授权）。',
    lib2: '需要检查过期时间（exp）、生效时间（nbf）和其他时间相关的声明。',
    lib3: '处理使用公钥/私钥对的 RS256/ES256 令牌。',
    lib4: '需要创建（签名）新令牌，而不仅仅是读取现有令牌。',
    lib5: '构建保护路由访问的中间件。',

    h2Faq: '常见问题',
    faq1q: '可以不用任何库解码 JWT 吗？',
    faq1a: '可以。JWT 负载只是 Base64URL 编码的 JSON 字符串。你可以用每种编程语言都有的内置 Base64 函数来解码。只有验证签名时才需要库。',
    faq2q: '在客户端解码 JWT 安全吗？',
    faq2a: '客户端解码用于展示目的是安全的（如显示用户名或在 UI 中检查过期时间）。但不要仅基于客户端解码做安全决策，因为令牌可能是伪造的。始终在服务器端验证签名。',
    faq3q: '为什么 atob() 对某些 JWT 令牌会失败？',
    faq3a: 'atob() 期望标准 Base64，但 JWT 使用 Base64URL 编码，将 + 替换为 - ，/ 替换为 _。你必须在调用 atob() 之前转换这些字符。此外，atob() 不能正确处理 UTF-8 多字节字符，对于非 ASCII 负载请使用 TextDecoder。',
    faq4q: 'Base64 和 Base64URL 有什么区别？',
    faq4a: 'Base64URL（RFC 4648 第 5 节）将 + 替换为 -，/ 替换为 _，使输出 URL 安全。它还去掉填充（=）字符。JWT 使用 Base64URL，这样令牌可以出现在 URL、Cookie 和 HTTP 头中，不会有编码问题。',
    faq5q: '可以修改解码后的 JWT 然后使用吗？',
    faq5a: '你可以解码并修改负载，但修改后的令牌将有一个无效的签名。任何正确验证签名的服务器都会拒绝它。这正是 JWT 防止篡改的方式：签名覆盖了精确的 header 和 payload 字节。',
  },
};

export default function JwtDecodeWithoutLibrary({ lang }: { lang: string }) {
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
    ],
  };

  const codeStyle: React.CSSProperties = { background: 'var(--bg-input)', border: '1px solid var(--border-color)', borderRadius: 8, padding: '16px 20px', overflowX: 'auto', fontSize: 13, lineHeight: 1.8 };
  const h2Style: React.CSSProperties = { fontSize: 22, fontWeight: 700, marginTop: 40, marginBottom: 16, color: 'var(--text-primary)' };
  const h3Style: React.CSSProperties = { fontSize: 18, fontWeight: 600, marginTop: 24, marginBottom: 12 };
  const pStyle: React.CSSProperties = { lineHeight: 1.8, color: 'var(--text-secondary)', marginBottom: 16 };
  const thStyle: React.CSSProperties = { background: 'var(--bg-input)', border: '1px solid var(--border-color)', padding: '10px 14px', textAlign: 'left', fontWeight: 700 };
  const tdStyle: React.CSSProperties = { border: '1px solid var(--border-color)', padding: '10px 14px', fontSize: 13 };

  const sampleToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <p style={{ fontSize: 16, lineHeight: 1.8, color: 'var(--text-secondary)', marginBottom: 30 }} dangerouslySetInnerHTML={{ __html: t.intro }} />

      {/* ── 1. JWT Structure ── */}
      <h2 style={h2Style}>{t.h2Structure}</h2>
      <p style={pStyle}>{t.pStructure}</p>
      <pre style={codeStyle}><code>{`┌─────────────────────────────────────────────────────────────────────────────────┐
│                              JWT Token Layout                                   │
├──────────────────┬──────────────────────────────────┬──────────────────────────┤
│     HEADER       │           PAYLOAD                │       SIGNATURE          │
│  (algorithm)     │        (your data)               │    (verification)        │
├──────────────────┼──────────────────────────────────┼──────────────────────────┤
│ eyJhbGciOiJIUz   │ eyJzdWIiOiIxMjM0NTY3ODkwIiwi   │ SflKxwRJSMeKKF2QT4fw    │
│ I1NiIsInR5cCI6   │ bmFtZSI6IkpvaG4gRG9lIiwiaWF0   │ pMeJf36POk6yJV_adQss    │
│ IkpXVCJ9         │ IjoxNTE2MjM5MDIyfQ              │ w5c                      │
├──────────────────┼──────────────────────────────────┼──────────────────────────┤
│ Base64URL({      │ Base64URL({                      │ HMACSHA256(              │
│   "alg": "HS256" │   "sub": "1234567890",           │   header + "." +         │
│   "typ": "JWT"   │   "name": "John Doe",            │   payload,               │
│ })               │   "iat": 1516239022              │   secret                 │
│                  │ })                               │ )                        │
└──────────────────┴──────────────────────────────────┴──────────────────────────┘

Full token (dots separate the three parts):
${sampleToken}`}</code></pre>

      {/* ── 2. JavaScript Browser ── */}
      <h2 style={h2Style}>{t.h2JsBrowser}</h2>
      <p style={pStyle} dangerouslySetInnerHTML={{ __html: t.pJsBrowser }} />
      <pre style={codeStyle}><code>{`// Decode JWT payload in the browser — one line
JSON.parse(atob('${sampleToken}'.split('.')[1].replace(/-/g,'+').replace(/_/g,'/')))

// Result: { sub: "1234567890", name: "John Doe", iat: 1516239022 }

// Reusable function (handles UTF-8 payloads too):
const jwtDecode = (t) => JSON.parse(decodeURIComponent(atob(t.split('.')[1].replace(/-/g,'+').replace(/_/g,'/')).split('').map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join('')));

// Decode the header:
JSON.parse(atob('${sampleToken}'.split('.')[0].replace(/-/g,'+').replace(/_/g,'/')))`}</code></pre>

      {/* ── 3. Node.js ── */}
      <h2 style={h2Style}>{t.h2Node}</h2>
      <p style={pStyle} dangerouslySetInnerHTML={{ __html: t.pNode }} />
      <pre style={codeStyle}><code>{`// Node.js — decode JWT payload in one line
JSON.parse(Buffer.from('${sampleToken}'.split('.')[1], 'base64url').toString())

// Result: { sub: '1234567890', name: 'John Doe', iat: 1516239022 }

// Decode header:
JSON.parse(Buffer.from('${sampleToken}'.split('.')[0], 'base64url').toString())

// For Node < 15.7 (no 'base64url' encoding):
JSON.parse(Buffer.from('${sampleToken}'.split('.')[1].replace(/-/g,'+').replace(/_/g,'/'), 'base64').toString())`}</code></pre>

      {/* ── 4. Python ── */}
      <h2 style={h2Style}>{t.h2Python}</h2>
      <p style={pStyle} dangerouslySetInnerHTML={{ __html: t.pPython }} />
      <pre style={codeStyle}><code>{`# Python — decode JWT payload in one line
import json, base64; print(json.loads(base64.urlsafe_b64decode('${sampleToken}'.split('.')[1] + '==')))

# Result: {'sub': '1234567890', 'name': 'John Doe', 'iat': 1516239022}

# Proper padding (handles any token length):
import json, base64; p = '${sampleToken}'.split('.')[1]; print(json.loads(base64.urlsafe_b64decode(p + '=' * (-len(p) % 4))))

# Decode header:
import json, base64; h = '${sampleToken}'.split('.')[0]; print(json.loads(base64.urlsafe_b64decode(h + '=' * (-len(h) % 4))))

# Result: {'alg': 'HS256', 'typ': 'JWT'}`}</code></pre>

      {/* ── 5. Bash ── */}
      <h2 style={h2Style}>{t.h2Bash}</h2>
      <p style={pStyle} dangerouslySetInnerHTML={{ __html: t.pBash }} />
      <pre style={codeStyle}><code>{`# Bash — decode JWT payload with base64 and jq
echo '${sampleToken}' | cut -d. -f2 | base64 -d 2>/dev/null | jq .

# Output:
# {
#   "sub": "1234567890",
#   "name": "John Doe",
#   "iat": 1516239022
# }

# macOS (uses -D flag for base64 decode):
echo '${sampleToken}' | cut -d. -f2 | base64 -D 2>/dev/null | jq .

# Decode header (change -f2 to -f1):
echo '${sampleToken}' | cut -d. -f1 | base64 -d 2>/dev/null | jq .

# Handle padding automatically (works on both Linux and macOS):
jwt='${sampleToken}'; p=$(echo "$jwt" | cut -d. -f2); echo "$p"$(printf '%0.s=' $(seq 1 $((4 - \${#p} % 4)))) | base64 -d 2>/dev/null | jq .

# Without jq (Python fallback):
echo '${sampleToken}' | cut -d. -f2 | base64 -d 2>/dev/null | python3 -m json.tool`}</code></pre>

      {/* ── 6. Go ── */}
      <h2 style={h2Style}>{t.h2Go}</h2>
      <p style={pStyle} dangerouslySetInnerHTML={{ __html: t.pGo }} />
      <pre style={codeStyle}><code>{`package main

import (
    "encoding/base64"
    "encoding/json"
    "fmt"
    "strings"
)

func decodeJWT(token string) (header, payload map[string]interface{}, err error) {
    parts := strings.Split(token, ".")
    if len(parts) != 3 {
        return nil, nil, fmt.Errorf("invalid JWT: expected 3 parts, got %d", len(parts))
    }
    // Decode header
    hBytes, err := base64.RawURLEncoding.DecodeString(parts[0])
    if err != nil { return nil, nil, err }
    json.Unmarshal(hBytes, &header)
    // Decode payload
    pBytes, err := base64.RawURLEncoding.DecodeString(parts[1])
    if err != nil { return nil, nil, err }
    json.Unmarshal(pBytes, &payload)
    return header, payload, nil
}

func main() {
    token := "${sampleToken}"
    _, payload, _ := decodeJWT(token)
    fmt.Println(payload) // map[iat:1.516239022e+09 name:John Doe sub:1234567890]
}

// One-liner in Go playground:
// base64.RawURLEncoding.DecodeString(strings.Split(token, ".")[1])`}</code></pre>

      {/* ── 7. PHP ── */}
      <h2 style={h2Style}>{t.h2Php}</h2>
      <p style={pStyle} dangerouslySetInnerHTML={{ __html: t.pPhp }} />
      <pre style={codeStyle}><code>{`<?php
// PHP — decode JWT payload in one line
$payload = json_decode(base64_decode(strtr(explode('.', '${sampleToken}')[1], '-_', '+/')), true);
print_r($payload);

// Output:
// Array ( [sub] => 1234567890 [name] => John Doe [iat] => 1516239022 )

// Decode header:
$header = json_decode(base64_decode(strtr(explode('.', '${sampleToken}')[0], '-_', '+/')), true);
print_r($header);

// Output:
// Array ( [alg] => HS256 [typ] => JWT )

// As a reusable function:
function jwt_decode_payload(string $token): array {
    return json_decode(base64_decode(strtr(explode('.', $token)[1], '-_', '+/')), true);
}
?>`}</code></pre>

      {/* ── 8. Why This Works ── */}
      <h2 style={h2Style}>{t.h2Why}</h2>
      <p style={pStyle}>{t.pWhy}</p>
      <p style={pStyle} dangerouslySetInnerHTML={{ __html: t.pWhy2 }} />
      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>Character</th>
              <th style={thStyle}>Base64 (Standard)</th>
              <th style={thStyle}>Base64URL (JWT)</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['62nd character', '+', '-'],
              ['63rd character', '/', '_'],
              ['Padding', '= (required)', 'Stripped (omitted)'],
              ['URL-safe?', 'No (needs percent-encoding)', 'Yes'],
            ].map(([char, std, url], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{char}</td>
                <td style={tdStyle}><code>{std}</code></td>
                <td style={tdStyle}><code>{url}</code></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <pre style={codeStyle}><code>{`// Conversion formula (any language):
base64url_to_base64(s) = s.replace(/-/g, '+').replace(/_/g, '/') + '==='.slice(0, (4 - s.length % 4) % 4)
base64_to_base64url(s) = s.replace(/\\+/g, '-').replace(/\\//g, '_').replace(/=+$/, '')`}</code></pre>

      {/* ── 9. Security Warning ── */}
      <h2 style={{ ...h2Style, color: '#ef4444' }}>{t.h2Security}</h2>
      <div style={{ padding: 20, background: 'rgba(239,68,68,0.08)', borderRadius: 12, border: '1px solid rgba(239,68,68,0.3)', marginBottom: 24 }}>
        <p style={{ ...pStyle, fontWeight: 600, marginBottom: 12 }}>{t.pSecurity}</p>
        <ul style={{ lineHeight: 2.2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0 }}>
          <li>{t.sec1}</li>
          <li>{t.sec2}</li>
          <li>{t.sec3}</li>
          <li>{t.sec4}</li>
          <li>{t.sec5}</li>
        </ul>
      </div>
      <pre style={codeStyle}><code>{`// WRONG: Using decoded payload for auth decisions
const user = JSON.parse(atob(token.split('.')[1]));
if (user.role === 'admin') grantAccess(); // DANGEROUS — token could be forged!

// RIGHT: Verify first, then trust the payload
const verified = jwt.verify(token, SECRET_KEY);     // Throws if invalid
if (verified.role === 'admin') grantAccess();        // Safe — signature checked`}</code></pre>

      {/* ── 10. Common Pitfalls ── */}
      <h2 style={h2Style}>{t.h2Pitfalls}</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
        {[
          { title: t.pitfall1Title, desc: t.pitfall1Desc, color: '#f59e0b' },
          { title: t.pitfall2Title, desc: t.pitfall2Desc, color: '#ef4444' },
          { title: t.pitfall3Title, desc: t.pitfall3Desc, color: '#8b5cf6' },
          { title: t.pitfall4Title, desc: t.pitfall4Desc, color: '#3b82f6' },
        ].map((item, i) => (
          <div key={i} style={{ padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderLeft: `4px solid ${item.color}` }}>
            <strong style={{ color: item.color }}>{item.title}</strong>
            <p style={{ margin: '6px 0 0', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }} dangerouslySetInnerHTML={{ __html: item.desc }} />
          </div>
        ))}
      </div>
      <pre style={codeStyle}><code>{`// Fix padding issue (JavaScript):
const pad = (s) => s + '='.repeat((4 - s.length % 4) % 4);
JSON.parse(atob(pad(token.split('.')[1].replace(/-/g,'+').replace(/_/g,'/'))))

// Fix UTF-8 issue (Browser):
const decodeJWT = (token) => {
  const base64 = token.split('.')[1].replace(/-/g,'+').replace(/_/g,'/');
  const bytes = Uint8Array.from(atob(base64), c => c.charCodeAt(0));
  return JSON.parse(new TextDecoder().decode(bytes));
};`}</code></pre>

      {/* ── 11. When to Use a Library ── */}
      <h2 style={h2Style}>{t.h2WhenLibrary}</h2>
      <p style={pStyle}>{t.pWhenLibrary}</p>
      <ul style={{ lineHeight: 2.2, color: 'var(--text-secondary)', paddingLeft: 20, marginBottom: 24 }}>
        <li>{t.lib1}</li>
        <li>{t.lib2}</li>
        <li>{t.lib3}</li>
        <li>{t.lib4}</li>
        <li>{t.lib5}</li>
      </ul>
      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>Language</th>
              <th style={thStyle}>Library</th>
              <th style={thStyle}>Install</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Node.js', 'jsonwebtoken', 'npm install jsonwebtoken'],
              ['Python', 'PyJWT', 'pip install PyJWT'],
              ['Go', 'golang-jwt/jwt', 'go get github.com/golang-jwt/jwt/v5'],
              ['PHP', 'firebase/php-jwt', 'composer require firebase/php-jwt'],
              ['Java', 'jjwt', 'Maven: io.jsonwebtoken:jjwt-api'],
              ['Rust', 'jsonwebtoken', 'cargo add jsonwebtoken'],
            ].map(([lang, lib, install], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{lang}</td>
                <td style={tdStyle}><code>{lib}</code></td>
                <td style={tdStyle}><code style={{ fontSize: 12 }}>{install}</code></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ── CTA ── */}
      <div style={{ padding: 20, background: 'linear-gradient(135deg, rgba(59,130,246,0.1), rgba(139,92,246,0.1))', borderRadius: 12, border: '1px solid rgba(59,130,246,0.3)', textAlign: 'center', marginTop: 30, marginBottom: 30 }}>
        <p style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{t.linkTool}</p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href={`/${lang}/tools/jwt-decoder`} style={{ color: 'var(--accent-blue)', fontWeight: 700, fontSize: 15 }}>
            JWT Decoder →
          </Link>
          <Link href={`/${lang}/tools/base64`} style={{ color: 'var(--accent-blue)', fontWeight: 700, fontSize: 15 }}>
            Base64 Encoder →
          </Link>
        </div>
      </div>

      {/* ── FAQ ── */}
      <h2 style={h2Style}>{t.h2Faq}</h2>
      {[
        [t.faq1q, t.faq1a], [t.faq2q, t.faq2a], [t.faq3q, t.faq3a], [t.faq4q, t.faq4a], [t.faq5q, t.faq5a],
      ].map(([q, a], i) => (
        <div key={i} style={{ marginBottom: 16, padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)' }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 8, color: 'var(--text-primary)' }}>{q}</h3>
          <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7, margin: 0 }}>{a}</p>
        </div>
      ))}
    </div>
  );
}
