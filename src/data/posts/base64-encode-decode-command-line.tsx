'use client';
import React from 'react';

const translations: Record<string, Record<string, string>> = {
  en: {
    intro: 'Base64 encoding and decoding is a daily task for developers working with APIs, certificates, Kubernetes secrets, and data pipelines. Instead of reaching for an online tool every time, learn the <strong>native commands</strong> available on Linux, macOS, and Windows so you can encode and decode Base64 directly from your terminal.',
    link_tool: 'Try our online Base64 Encoder/Decoder tool \u2192',
    h2_why: 'Why Base64 from the Command Line?',
    p_why_1: 'Online Base64 tools are convenient but come with trade-offs: you are sending potentially sensitive data (API keys, certificates, secrets) to a third-party server. The command line keeps everything local, is scriptable, and works even without internet access.',
    p_why_2: 'Common use cases for command-line Base64:',
    li_why_1: 'Creating Kubernetes secrets from literal values',
    li_why_2: 'Encoding API credentials for HTTP Basic Authentication',
    li_why_3: 'Embedding small images as data URIs in CSS/HTML',
    li_why_4: 'Encoding/decoding JWT token payloads for debugging',
    li_why_5: 'Processing binary data in shell scripts and CI/CD pipelines',
    h2_linux: 'Linux (GNU base64)',
    p_linux: 'Most Linux distributions include the <code>base64</code> command from GNU coreutils. It reads from standard input or a file and writes the result to standard output.',
    h3_linux_encode: 'Encode a String',
    h3_linux_decode: 'Decode a String',
    h3_linux_file: 'Encode/Decode Files',
    h3_linux_pipe: 'Pipe Usage',
    p_linux_pipe: 'The real power of command-line Base64 comes from piping. You can chain it with any command that produces output.',
    h3_linux_wrap: 'Line Wrapping',
    p_linux_wrap: 'By default, GNU <code>base64</code> wraps output at 76 characters. Use <code>-w 0</code> to disable wrapping (important for URLs, JSON, environment variables).',
    h2_macos: 'macOS (BSD base64)',
    p_macos: 'macOS uses the BSD version of <code>base64</code>, which has slightly different flags from the GNU version. The most notable difference is the decode flag.',
    h3_macos_encode: 'Encode a String',
    h3_macos_decode: 'Decode a String',
    p_macos_diff: '<strong>Key difference:</strong> macOS uses <code>-D</code> (uppercase) for decode, while Linux uses <code>-d</code> (lowercase). Some newer macOS versions also accept <code>-d</code>, but <code>-D</code> is the safe, portable choice.',
    h3_macos_file: 'Encode/Decode Files',
    h3_macos_wrap: 'Line Wrapping',
    p_macos_wrap: 'macOS <code>base64</code> does NOT wrap by default. To explicitly set line length, use <code>-b</code> (break):',
    h2_windows: 'Windows PowerShell',
    p_windows: 'Windows does not have a built-in <code>base64</code> command, but PowerShell provides .NET methods and <code>certutil</code> is available as a system tool.',
    h3_ps_encode: 'PowerShell: Encode',
    h3_ps_decode: 'PowerShell: Decode',
    h3_certutil: 'certutil (Legacy Method)',
    p_certutil: '<code>certutil</code> is a built-in Windows tool originally for certificate management, but it can encode/decode Base64 files. Note: it works with files, not inline strings.',
    h2_openssl: 'OpenSSL (Cross-Platform)',
    p_openssl: 'OpenSSL is installed on most systems (Linux, macOS, Windows via Git Bash or WSL) and provides a consistent Base64 interface across platforms.',
    h3_openssl_encode: 'Encode with OpenSSL',
    h3_openssl_decode: 'Decode with OpenSSL',
    h3_openssl_file: 'File Operations',
    h2_oneliners: 'Bash One-Liners',
    p_oneliners: 'Copy-paste ready one-liners for common Base64 tasks. These work on Linux and macOS (adjust the decode flag for macOS if needed).',
    h3_ol_encode_file: 'Encode a File to Base64 String',
    h3_ol_decode_file: 'Decode Base64 String to File',
    h3_ol_encode_pipe: 'Encode from Pipe',
    h3_ol_clipboard: 'Clipboard Integration',
    h3_ol_k8s: 'Kubernetes Secrets',
    h3_ol_jwt: 'Decode JWT Payload',
    h2_pitfalls: 'Common Pitfalls',
    p_pitfalls: 'These are the most frequent issues developers encounter when working with Base64 on the command line.',
    h3_pit_newline: '1. Trailing Newline in Input',
    p_pit_newline: '<code>echo</code> appends a newline character by default, which gets encoded into the Base64 output. This is the <strong>#1 source of bugs</strong> when encoding strings for API keys or passwords.',
    h3_pit_padding: '2. Padding Characters (=)',
    p_pit_padding: 'Base64 output is padded with <code>=</code> characters to make the length a multiple of 4. Some systems (like URLs or JWT) use Base64URL encoding which removes padding. Do not strip padding unless the receiving system expects Base64URL.',
    h3_pit_binary: '3. Binary vs Text Mode',
    p_pit_binary: 'On Windows, be careful with line endings. Windows uses <code>\\r\\n</code> (CRLF) while Linux/macOS uses <code>\\n</code> (LF). When encoding files across platforms, this can produce different Base64 output for the "same" text file.',
    h3_pit_wrap: '4. Line Wrapping Differences',
    p_pit_wrap: 'GNU <code>base64</code> wraps at 76 characters by default. macOS <code>base64</code> does not wrap. OpenSSL wraps at 64 characters. When comparing Base64 output across platforms, always normalize by removing newlines first.',
    h3_pit_url: '5. Base64 vs Base64URL',
    p_pit_url: 'Standard Base64 uses <code>+</code> and <code>/</code> which are not URL-safe. Base64URL replaces them with <code>-</code> and <code>_</code>. Most command-line tools only support standard Base64. For Base64URL, use <code>tr</code> or <code>sed</code>:',
    h2_reference: 'Quick Reference Table',
    p_reference: 'A side-by-side comparison of Base64 commands across all platforms. Bookmark this table.',
    th_task: 'Task',
    th_linux: 'Linux (GNU)',
    th_macos: 'macOS (BSD)',
    th_windows: 'Windows (PowerShell)',
    th_openssl: 'OpenSSL',
    h2_faq: 'Frequently Asked Questions',
    faq1_q: 'Why does echo "hello" | base64 give a different result than expected?',
    faq1_a: 'The echo command appends a trailing newline (\\n) to the string, so you are actually encoding "hello\\n" instead of "hello". Use echo -n "hello" (Linux) or printf "hello" (cross-platform) to avoid the trailing newline. This is the most common Base64 command-line mistake.',
    faq2_q: 'How do I Base64 encode a file without line breaks?',
    faq2_a: 'On Linux, use base64 -w 0 file.txt to disable line wrapping. On macOS, the output has no wrapping by default. With OpenSSL, pipe through tr -d "\\n" to remove line breaks: openssl base64 -in file.txt | tr -d "\\n".',
    faq3_q: 'What is the difference between base64 and base64url encoding?',
    faq3_a: 'Standard Base64 uses + and / characters, which are not safe in URLs. Base64URL replaces + with - and / with _, and typically omits padding (=). JWT tokens use Base64URL. Most CLI tools only support standard Base64, so you need to convert using tr or sed.',
    faq4_q: 'Can I use Base64 to encrypt sensitive data?',
    faq4_a: 'No. Base64 is an encoding, not encryption. Anyone can decode Base64 data instantly. It provides zero security. For protecting sensitive data, use proper encryption tools like openssl enc -aes-256-cbc, gpg, or age. Base64 is only for converting binary data to a text-safe format.',
    faq5_q: 'How do I decode Kubernetes secrets from the command line?',
    faq5_a: 'Use kubectl get secret my-secret -o jsonpath="{.data.key}" | base64 -d (Linux) or base64 -D (macOS). You can also decode all values at once using kubectl get secret my-secret -o json | jq ".data | map_values(@base64d)".',
    p_conclusion: 'Bookmark this reference and keep it handy for your next Base64 task. For quick encoding and decoding without opening a terminal, try our online tool.',
    link_tool_bottom: 'Try the Base64 Encoder/Decoder \u2192',
  },
  zh: {
    intro: 'Base64 编解码是开发者在处理 API、证书、Kubernetes secrets 和数据管道时的日常任务。与其每次都打开在线工具，不如掌握 Linux、macOS 和 Windows 上的<strong>原生命令</strong>，直接在终端中完成 Base64 编解码。',
    link_tool: '试试我们的在线 Base64 编解码工具 \u2192',
    h2_why: '为什么要在命令行中使用 Base64？',
    p_why_1: '在线 Base64 工具虽然方便，但有一个隐患：你可能将敏感数据（API 密钥、证书、密码）发送到第三方服务器。命令行操作完全在本地进行，可脚本化，且无需网络连接。',
    p_why_2: '命令行 Base64 的常见使用场景：',
    li_why_1: '从字面值创建 Kubernetes secrets',
    li_why_2: '为 HTTP Basic 认证编码 API 凭证',
    li_why_3: '将小图片编码为 CSS/HTML 中的 data URI',
    li_why_4: '编解码 JWT 令牌载荷用于调试',
    li_why_5: '在 shell 脚本和 CI/CD 管道中处理二进制数据',
    h2_linux: 'Linux（GNU base64）',
    p_linux: '大多数 Linux 发行版都包含 GNU coreutils 中的 <code>base64</code> 命令。它从标准输入或文件读取，将结果写入标准输出。',
    h3_linux_encode: '编码字符串',
    h3_linux_decode: '解码字符串',
    h3_linux_file: '编解码文件',
    h3_linux_pipe: '管道用法',
    p_linux_pipe: '命令行 Base64 的真正强大之处在于管道。你可以将它与任何产生输出的命令串联。',
    h3_linux_wrap: '换行控制',
    p_linux_wrap: '默认情况下，GNU <code>base64</code> 在第 76 个字符处换行。使用 <code>-w 0</code> 禁用换行（这对 URL、JSON、环境变量很重要）。',
    h2_macos: 'macOS（BSD base64）',
    p_macos: 'macOS 使用 BSD 版本的 <code>base64</code>，其标志与 GNU 版本略有不同。最显著的区别是解码标志。',
    h3_macos_encode: '编码字符串',
    h3_macos_decode: '解码字符串',
    p_macos_diff: '<strong>关键区别：</strong>macOS 使用大写 <code>-D</code> 解码，而 Linux 使用小写 <code>-d</code>。某些较新的 macOS 版本也接受 <code>-d</code>，但 <code>-D</code> 是安全、可移植的选择。',
    h3_macos_file: '编解码文件',
    h3_macos_wrap: '换行控制',
    p_macos_wrap: 'macOS <code>base64</code> 默认不换行。要显式设置行长度，使用 <code>-b</code>（break）：',
    h2_windows: 'Windows PowerShell',
    p_windows: 'Windows 没有内置的 <code>base64</code> 命令，但 PowerShell 提供了 .NET 方法，<code>certutil</code> 也可作为系统工具使用。',
    h3_ps_encode: 'PowerShell：编码',
    h3_ps_decode: 'PowerShell：解码',
    h3_certutil: 'certutil（传统方法）',
    p_certutil: '<code>certutil</code> 是 Windows 内置工具，最初用于证书管理，但也可以编解码 Base64 文件。注意：它只能处理文件，不能直接处理内联字符串。',
    h2_openssl: 'OpenSSL（跨平台）',
    p_openssl: 'OpenSSL 安装在大多数系统上（Linux、macOS、Windows 可通过 Git Bash 或 WSL 使用），提供跨平台一致的 Base64 接口。',
    h3_openssl_encode: '使用 OpenSSL 编码',
    h3_openssl_decode: '使用 OpenSSL 解码',
    h3_openssl_file: '文件操作',
    h2_oneliners: 'Bash 一行命令',
    p_oneliners: '常见 Base64 任务的即用一行命令。这些命令适用于 Linux 和 macOS（macOS 上需要调整解码标志）。',
    h3_ol_encode_file: '将文件编码为 Base64 字符串',
    h3_ol_decode_file: '将 Base64 字符串解码为文件',
    h3_ol_encode_pipe: '从管道编码',
    h3_ol_clipboard: '剪贴板集成',
    h3_ol_k8s: 'Kubernetes Secrets',
    h3_ol_jwt: '解码 JWT 载荷',
    h2_pitfalls: '常见陷阱',
    p_pitfalls: '以下是开发者在命令行中使用 Base64 时最常遇到的问题。',
    h3_pit_newline: '1. 输入末尾的换行符',
    p_pit_newline: '<code>echo</code> 默认会在字符串末尾添加换行符，该换行符会被编码到 Base64 输出中。这是编码 API 密钥或密码时<strong>最常见的 Bug 来源</strong>。',
    h3_pit_padding: '2. 填充字符（=）',
    p_pit_padding: 'Base64 输出使用 <code>=</code> 字符填充，使长度为 4 的倍数。某些系统（如 URL 或 JWT）使用去除填充的 Base64URL 编码。除非接收方期望 Base64URL，否则不要去除填充。',
    h3_pit_binary: '3. 二进制模式与文本模式',
    p_pit_binary: '在 Windows 上要注意换行符。Windows 使用 <code>\\r\\n</code>（CRLF），而 Linux/macOS 使用 <code>\\n</code>（LF）。跨平台编码文件时，"相同"的文本文件可能产生不同的 Base64 输出。',
    h3_pit_wrap: '4. 换行差异',
    p_pit_wrap: 'GNU <code>base64</code> 默认在 76 字符处换行。macOS <code>base64</code> 不换行。OpenSSL 在 64 字符处换行。比较跨平台 Base64 输出时，先删除换行符进行规范化。',
    h3_pit_url: '5. Base64 与 Base64URL',
    p_pit_url: '标准 Base64 使用 <code>+</code> 和 <code>/</code>，这些字符在 URL 中不安全。Base64URL 用 <code>-</code> 和 <code>_</code> 替换它们。大多数命令行工具只支持标准 Base64。转换为 Base64URL 可以使用 <code>tr</code> 或 <code>sed</code>：',
    h2_reference: '快速参考表',
    p_reference: '跨平台 Base64 命令对照表。收藏此表以备查阅。',
    th_task: '任务',
    th_linux: 'Linux（GNU）',
    th_macos: 'macOS（BSD）',
    th_windows: 'Windows（PowerShell）',
    th_openssl: 'OpenSSL',
    h2_faq: '常见问题',
    faq1_q: '为什么 echo "hello" | base64 的结果和预期不同？',
    faq1_a: 'echo 命令默认会在字符串末尾附加换行符（\\n），所以实际编码的是 "hello\\n" 而不是 "hello"。使用 echo -n "hello"（Linux）或 printf "hello"（跨平台）来避免尾部换行符。这是 Base64 命令行中最常见的错误。',
    faq2_q: '如何将文件编码为不换行的 Base64？',
    faq2_a: '在 Linux 上，使用 base64 -w 0 file.txt 禁用换行。macOS 上默认没有换行。使用 OpenSSL 时，通过管道 tr -d "\\n" 去除换行：openssl base64 -in file.txt | tr -d "\\n"。',
    faq3_q: 'base64 和 base64url 编码有什么区别？',
    faq3_a: '标准 Base64 使用 + 和 / 字符，这些在 URL 中不安全。Base64URL 用 - 替换 +，用 _ 替换 /，通常省略填充（=）。JWT 令牌使用 Base64URL。大多数 CLI 工具只支持标准 Base64，需要使用 tr 或 sed 进行转换。',
    faq4_q: '可以用 Base64 加密敏感数据吗？',
    faq4_a: '不可以。Base64 是编码，不是加密。任何人都可以立即解码 Base64 数据，它提供零安全性。要保护敏感数据，请使用正确的加密工具，如 openssl enc -aes-256-cbc、gpg 或 age。Base64 仅用于将二进制数据转换为文本安全格式。',
    faq5_q: '如何从命令行解码 Kubernetes secrets？',
    faq5_a: '使用 kubectl get secret my-secret -o jsonpath="{.data.key}" | base64 -d（Linux）或 base64 -D（macOS）。也可以使用 kubectl get secret my-secret -o json | jq ".data | map_values(@base64d)" 一次解码所有值。',
    p_conclusion: '收藏此参考指南，方便下次使用 Base64 时查阅。如果不想打开终端，也可以使用我们的在线工具快速编解码。',
    link_tool_bottom: '试试 Base64 编解码工具 \u2192',
  },
};

export default function Base64CommandLine({ lang }: { lang: string }) {
  const t = translations[lang] || translations.en;

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

  return (
    <article className="prose prose-invert max-w-none">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <p dangerouslySetInnerHTML={{ __html: t.intro }} />

      <p>
        <a href={`/${lang}/tools/base64`} style={{ fontWeight: 600, color: '#38bdf8' }}>
          {t.link_tool}
        </a>
      </p>

      {/* ============================================================ */}
      {/* 1. WHY BASE64 FROM THE COMMAND LINE? */}
      {/* ============================================================ */}
      <h2 className="text-2xl font-bold mt-10 mb-4">{t.h2_why}</h2>
      <p>{t.p_why_1}</p>
      <p>{t.p_why_2}</p>
      <ul>
        <li>{t.li_why_1}</li>
        <li>{t.li_why_2}</li>
        <li>{t.li_why_3}</li>
        <li>{t.li_why_4}</li>
        <li>{t.li_why_5}</li>
      </ul>

      {/* ============================================================ */}
      {/* 2. LINUX (GNU base64) */}
      {/* ============================================================ */}
      <h2 className="text-2xl font-bold mt-10 mb-4">{t.h2_linux}</h2>
      <p dangerouslySetInnerHTML={{ __html: t.p_linux }} />

      <h3 className="text-xl font-semibold mt-8 mb-3">{t.h3_linux_encode}</h3>
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`# Encode a string (note: echo -n avoids trailing newline)
echo -n "Hello, World!" | base64
# Output: SGVsbG8sIFdvcmxkIQ==

# WRONG: echo without -n includes a newline
echo "Hello, World!" | base64
# Output: SGVsbG8sIFdvcmxkIQo=  (different! encodes "Hello, World!\\n")

# Encode using printf (safer, more portable)
printf "Hello, World!" | base64
# Output: SGVsbG8sIFdvcmxkIQ==

# Encode a multi-line string
printf "line1\\nline2\\nline3" | base64
# Output: bGluZTEKbGluZTIKbGluZTM=`}</code></pre>

      <h3 className="text-xl font-semibold mt-8 mb-3">{t.h3_linux_decode}</h3>
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`# Decode a Base64 string
echo "SGVsbG8sIFdvcmxkIQ==" | base64 -d
# Output: Hello, World!

# Decode using printf
printf "SGVsbG8sIFdvcmxkIQ==" | base64 -d
# Output: Hello, World!

# Decode and show hex output (useful for binary data)
echo "SGVsbG8=" | base64 -d | xxd`}</code></pre>

      <h3 className="text-xl font-semibold mt-8 mb-3">{t.h3_linux_file}</h3>
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`# Encode a file
base64 input.txt > encoded.txt

# Encode a file without line wrapping
base64 -w 0 input.txt > encoded.txt

# Decode a file
base64 -d encoded.txt > decoded.txt

# Encode a binary file (image, PDF, etc.)
base64 -w 0 image.png > image_base64.txt

# Decode back to binary
base64 -d image_base64.txt > restored_image.png`}</code></pre>

      <h3 className="text-xl font-semibold mt-8 mb-3">{t.h3_linux_pipe}</h3>
      <p>{t.p_linux_pipe}</p>
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`# Encode the output of any command
cat /etc/hostname | base64

# Encode a curl response
curl -s https://api.example.com/data | base64 -w 0

# Decode and pipe to jq for JSON processing
echo "eyJuYW1lIjoiSm9obiJ9" | base64 -d | jq .

# Generate a random Base64 token
head -c 32 /dev/urandom | base64 -w 0

# Encode environment variable content
echo -n "$API_KEY" | base64 -w 0`}</code></pre>

      <h3 className="text-xl font-semibold mt-8 mb-3">{t.h3_linux_wrap}</h3>
      <p dangerouslySetInnerHTML={{ __html: t.p_linux_wrap }} />
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`# Default: wraps at 76 characters
echo -n "This is a long string that will demonstrate line wrapping behavior in base64 encoding output" | base64
# VGhpcyBpcyBhIGxvbmcgc3RyaW5nIHRoYXQgd2lsbCBkZW1vbnN0cmF0ZSBsaW5lIHdy
# YXBwaW5nIGJlaGF2aW9yIGluIGJhc2U2NCBlbmNvZGluZyBvdXRwdXQ=

# No wrapping: single line output
echo -n "This is a long string that will demonstrate line wrapping behavior in base64 encoding output" | base64 -w 0
# VGhpcyBpcyBhIGxvbmcgc3RyaW5nIHRoYXQgd2lsbCBkZW1vbnN0cmF0ZSBsaW5lIHdyYXBwaW5nIGJlaGF2aW9yIGluIGJhc2U2NCBlbmNvZGluZyBvdXRwdXQ=`}</code></pre>

      {/* ============================================================ */}
      {/* 3. macOS (BSD base64) */}
      {/* ============================================================ */}
      <h2 className="text-2xl font-bold mt-10 mb-4">{t.h2_macos}</h2>
      <p dangerouslySetInnerHTML={{ __html: t.p_macos }} />

      <h3 className="text-xl font-semibold mt-8 mb-3">{t.h3_macos_encode}</h3>
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`# Encode a string
echo -n "Hello, World!" | base64
# Output: SGVsbG8sIFdvcmxkIQ==

# Encode using printf
printf "Hello, World!" | base64
# Output: SGVsbG8sIFdvcmxkIQ==`}</code></pre>

      <h3 className="text-xl font-semibold mt-8 mb-3">{t.h3_macos_decode}</h3>
      <p dangerouslySetInnerHTML={{ __html: t.p_macos_diff }} />
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`# Decode with -D (uppercase) — macOS standard
echo "SGVsbG8sIFdvcmxkIQ==" | base64 -D
# Output: Hello, World!

# Some newer macOS versions also accept lowercase -d
echo "SGVsbG8sIFdvcmxkIQ==" | base64 -d
# Output: Hello, World!

# Decode from a file
base64 -D -i encoded.txt
# or
base64 -D < encoded.txt`}</code></pre>

      <h3 className="text-xl font-semibold mt-8 mb-3">{t.h3_macos_file}</h3>
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`# Encode a file
base64 -i input.txt -o encoded.txt

# Decode a file
base64 -D -i encoded.txt -o decoded.txt

# Encode a binary file
base64 -i image.png -o image_base64.txt

# Decode back to binary
base64 -D -i image_base64.txt -o restored_image.png`}</code></pre>

      <h3 className="text-xl font-semibold mt-8 mb-3">{t.h3_macos_wrap}</h3>
      <p dangerouslySetInnerHTML={{ __html: t.p_macos_wrap }} />
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`# macOS: no wrapping by default (unlike Linux)

# Force wrapping at 76 characters
echo -n "long string here" | base64 -b 76

# Force wrapping at 64 characters (MIME standard)
echo -n "long string here" | base64 -b 64`}</code></pre>

      {/* ============================================================ */}
      {/* 4. WINDOWS POWERSHELL */}
      {/* ============================================================ */}
      <h2 className="text-2xl font-bold mt-10 mb-4">{t.h2_windows}</h2>
      <p dangerouslySetInnerHTML={{ __html: t.p_windows }} />

      <h3 className="text-xl font-semibold mt-8 mb-3">{t.h3_ps_encode}</h3>
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`# Encode a string in PowerShell
[Convert]::ToBase64String([Text.Encoding]::UTF8.GetBytes("Hello, World!"))
# Output: SGVsbG8sIFdvcmxkIQ==

# Store in a variable
$encoded = [Convert]::ToBase64String([Text.Encoding]::UTF8.GetBytes("Hello, World!"))
Write-Output $encoded

# Encode from a variable
$mySecret = "api-key-12345"
[Convert]::ToBase64String([Text.Encoding]::UTF8.GetBytes($mySecret))

# Encode file contents
$bytes = [IO.File]::ReadAllBytes("C:\\path\\to\\file.txt")
[Convert]::ToBase64String($bytes)

# Encode file and save to another file
$bytes = [IO.File]::ReadAllBytes("C:\\path\\to\\input.txt")
$encoded = [Convert]::ToBase64String($bytes)
Set-Content -Path "C:\\path\\to\\encoded.txt" -Value $encoded`}</code></pre>

      <h3 className="text-xl font-semibold mt-8 mb-3">{t.h3_ps_decode}</h3>
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`# Decode a Base64 string in PowerShell
[Text.Encoding]::UTF8.GetString([Convert]::FromBase64String("SGVsbG8sIFdvcmxkIQ=="))
# Output: Hello, World!

# Decode and save to file
$decoded = [Convert]::FromBase64String("SGVsbG8sIFdvcmxkIQ==")
[IO.File]::WriteAllBytes("C:\\path\\to\\decoded.txt", $decoded)

# Decode from file content
$encoded = Get-Content -Path "C:\\path\\to\\encoded.txt" -Raw
[Text.Encoding]::UTF8.GetString([Convert]::FromBase64String($encoded.Trim()))`}</code></pre>

      <h3 className="text-xl font-semibold mt-8 mb-3">{t.h3_certutil}</h3>
      <p dangerouslySetInnerHTML={{ __html: t.p_certutil }} />
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`# Encode a file with certutil
certutil -encode input.txt encoded.txt

# Decode a file with certutil
certutil -decode encoded.txt decoded.txt

# Note: certutil adds "-----BEGIN CERTIFICATE-----" headers
# To get clean Base64, strip the first and last lines:
certutil -encode input.txt temp.txt
findstr /v CERTIFICATE temp.txt > clean_encoded.txt
del temp.txt`}</code></pre>

      {/* ============================================================ */}
      {/* 5. OPENSSL (Cross-Platform) */}
      {/* ============================================================ */}
      <h2 className="text-2xl font-bold mt-10 mb-4">{t.h2_openssl}</h2>
      <p>{t.p_openssl}</p>

      <h3 className="text-xl font-semibold mt-8 mb-3">{t.h3_openssl_encode}</h3>
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`# Encode a string
echo -n "Hello, World!" | openssl base64
# Output: SGVsbG8sIFdvcmxkIQ==

# Encode without line wrapping (single line)
echo -n "Hello, World!" | openssl base64 -A
# Output: SGVsbG8sIFdvcmxkIQ==

# Shorter alias: openssl enc -base64
echo -n "Hello, World!" | openssl enc -base64
# Output: SGVsbG8sIFdvcmxkIQ==`}</code></pre>

      <h3 className="text-xl font-semibold mt-8 mb-3">{t.h3_openssl_decode}</h3>
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`# Decode a string
echo "SGVsbG8sIFdvcmxkIQ==" | openssl base64 -d
# Output: Hello, World!

# Decode a single-line Base64 (no newlines)
echo -n "SGVsbG8sIFdvcmxkIQ==" | openssl base64 -d -A
# Output: Hello, World!

# Shorter alias
echo "SGVsbG8sIFdvcmxkIQ==" | openssl enc -base64 -d
# Output: Hello, World!`}</code></pre>

      <h3 className="text-xl font-semibold mt-8 mb-3">{t.h3_openssl_file}</h3>
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`# Encode a file
openssl base64 -in input.txt -out encoded.txt

# Encode without line wrapping
openssl base64 -A -in input.txt -out encoded.txt

# Decode a file
openssl base64 -d -in encoded.txt -out decoded.txt

# Encode a binary file (image, certificate, etc.)
openssl base64 -in image.png -out image_base64.txt

# Decode back to binary
openssl base64 -d -in image_base64.txt -out restored_image.png`}</code></pre>

      {/* ============================================================ */}
      {/* 6. BASH ONE-LINERS */}
      {/* ============================================================ */}
      <h2 className="text-2xl font-bold mt-10 mb-4">{t.h2_oneliners}</h2>
      <p>{t.p_oneliners}</p>

      <h3 className="text-xl font-semibold mt-8 mb-3">{t.h3_ol_encode_file}</h3>
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`# Linux: encode file to single-line Base64
base64 -w 0 myfile.txt && echo

# macOS: encode file (already single-line)
base64 -i myfile.txt

# Cross-platform with OpenSSL
openssl base64 -A -in myfile.txt && echo`}</code></pre>

      <h3 className="text-xl font-semibold mt-8 mb-3">{t.h3_ol_decode_file}</h3>
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`# Linux: decode Base64 string and save to file
echo "SGVsbG8sIFdvcmxkIQ==" | base64 -d > output.txt

# macOS
echo "SGVsbG8sIFdvcmxkIQ==" | base64 -D > output.txt

# Decode a Base64-encoded file
base64 -d encoded.txt > original.bin`}</code></pre>

      <h3 className="text-xl font-semibold mt-8 mb-3">{t.h3_ol_encode_pipe}</h3>
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`# Encode output of any command
date | base64

# Encode a JSON payload
echo -n '{"user":"admin","pass":"secret"}' | base64 -w 0

# Encode the contents of a web page
curl -s https://example.com | base64 -w 0 > page_encoded.txt

# Generate a random password and Base64 encode it
openssl rand 24 | base64 -w 0`}</code></pre>

      <h3 className="text-xl font-semibold mt-8 mb-3">{t.h3_ol_clipboard}</h3>
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`# macOS: encode clipboard contents
pbpaste | base64 | pbcopy

# macOS: decode clipboard contents
pbpaste | base64 -D | pbcopy

# Linux (with xclip): encode clipboard
xclip -selection clipboard -o | base64 -w 0 | xclip -selection clipboard

# Linux (with xclip): decode clipboard
xclip -selection clipboard -o | base64 -d | xclip -selection clipboard

# Linux (with xsel): encode clipboard
xsel --clipboard --output | base64 -w 0 | xsel --clipboard --input`}</code></pre>

      <h3 className="text-xl font-semibold mt-8 mb-3">{t.h3_ol_k8s}</h3>
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`# Create a Kubernetes secret value
echo -n "my-db-password" | base64 -w 0
# Output: bXktZGItcGFzc3dvcmQ=

# Decode a Kubernetes secret
kubectl get secret my-secret -o jsonpath="{.data.password}" | base64 -d

# Decode all secrets at once (requires jq)
kubectl get secret my-secret -o json | jq -r '.data | to_entries[] | "\\(.key): \\(.value | @base64d)"'

# Create a secret from a file
kubectl create secret generic my-secret --from-file=key.pem`}</code></pre>

      <h3 className="text-xl font-semibold mt-8 mb-3">{t.h3_ol_jwt}</h3>
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`# Decode JWT payload (second part between the dots)
JWT="eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMjM0IiwibmFtZSI6IkpvaG4ifQ.signature"

# Extract and decode the payload
echo "$JWT" | cut -d'.' -f2 | base64 -d 2>/dev/null | jq .
# Output: { "sub": "1234", "name": "John" }

# Handle Base64URL padding (JWT uses Base64URL)
PAYLOAD=$(echo "$JWT" | cut -d'.' -f2)
# Add padding if needed
MOD=$(($(echo -n "$PAYLOAD" | wc -c) % 4))
[ $MOD -eq 2 ] && PAYLOAD="$PAYLOAD=="
[ $MOD -eq 3 ] && PAYLOAD="$PAYLOAD="
echo "$PAYLOAD" | tr '_-' '/+' | base64 -d | jq .`}</code></pre>

      {/* ============================================================ */}
      {/* 7. COMMON PITFALLS */}
      {/* ============================================================ */}
      <h2 className="text-2xl font-bold mt-10 mb-4">{t.h2_pitfalls}</h2>
      <p>{t.p_pitfalls}</p>

      <h3 className="text-xl font-semibold mt-8 mb-3">{t.h3_pit_newline}</h3>
      <p dangerouslySetInnerHTML={{ __html: t.p_pit_newline }} />
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`# WRONG: includes trailing newline
echo "secret" | base64
# c2VjcmV0Cg==  (encodes "secret\\n")

# CORRECT: no trailing newline
echo -n "secret" | base64
# c2VjcmV0  (encodes "secret")

# SAFEST: use printf (works on all shells)
printf "secret" | base64
# c2VjcmV0`}</code></pre>

      <h3 className="text-xl font-semibold mt-8 mb-3">{t.h3_pit_padding}</h3>
      <p dangerouslySetInnerHTML={{ __html: t.p_pit_padding }} />
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`# Standard Base64 with padding
echo -n "a"  | base64   # YQ==   (2 padding chars)
echo -n "ab" | base64   # YWI=   (1 padding char)
echo -n "abc"| base64   # YWJj   (no padding needed)

# Do NOT strip padding unless the receiver expects Base64URL
# Many APIs will reject Base64 with missing padding`}</code></pre>

      <h3 className="text-xl font-semibold mt-8 mb-3">{t.h3_pit_binary}</h3>
      <p dangerouslySetInnerHTML={{ __html: t.p_pit_binary }} />
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`# Check line endings of a file
file myfile.txt
# myfile.txt: ASCII text, with CRLF line terminators  (Windows)
# myfile.txt: ASCII text                               (Unix/Mac)

# Convert Windows line endings to Unix before encoding
dos2unix myfile.txt && base64 -w 0 myfile.txt

# Or strip \\r inline
cat myfile.txt | tr -d '\\r' | base64 -w 0`}</code></pre>

      <h3 className="text-xl font-semibold mt-8 mb-3">{t.h3_pit_wrap}</h3>
      <p dangerouslySetInnerHTML={{ __html: t.p_pit_wrap }} />
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`# Normalize Base64 output for comparison
# Remove all newlines from Base64 output
base64 file.txt | tr -d '\\n'

# Compare Base64 from different platforms
diff <(base64 -w 0 file.txt) <(ssh mac-host 'base64 -i file.txt')`}</code></pre>

      <h3 className="text-xl font-semibold mt-8 mb-3">{t.h3_pit_url}</h3>
      <p dangerouslySetInnerHTML={{ __html: t.p_pit_url }} />
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`# Convert standard Base64 to Base64URL
echo -n "Hello+World/Foo==" | tr '+/' '-_' | tr -d '='
# Output: Hello-World_Foo

# Convert Base64URL back to standard Base64
B64URL="SGVsbG8tV29ybGRfRm9v"
# Add padding
PADDED=$(echo -n "$B64URL" | awk '{while(length%4) $0=$0"="; print}')
# Replace URL-safe chars
echo "$PADDED" | tr '_-' '/+'

# Full pipeline: encode as Base64URL
echo -n "Hello, World!" | base64 -w 0 | tr '+/' '-_' | tr -d '='`}</code></pre>

      {/* ============================================================ */}
      {/* 8. QUICK REFERENCE TABLE */}
      {/* ============================================================ */}
      <h2 className="text-2xl font-bold mt-10 mb-4">{t.h2_reference}</h2>
      <p>{t.p_reference}</p>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead className="bg-gray-800">
            <tr>
              <th className="border border-gray-700 px-4 py-2 text-left">{t.th_task}</th>
              <th className="border border-gray-700 px-4 py-2 text-left">{t.th_linux}</th>
              <th className="border border-gray-700 px-4 py-2 text-left">{t.th_macos}</th>
              <th className="border border-gray-700 px-4 py-2 text-left">{t.th_windows}</th>
              <th className="border border-gray-700 px-4 py-2 text-left">{t.th_openssl}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-700 px-4 py-2">Encode string</td>
              <td className="border border-gray-700 px-4 py-2"><code>echo -n &quot;str&quot; | base64</code></td>
              <td className="border border-gray-700 px-4 py-2"><code>echo -n &quot;str&quot; | base64</code></td>
              <td className="border border-gray-700 px-4 py-2"><code>[Convert]::ToBase64String([Text.Encoding]::UTF8.GetBytes(&quot;str&quot;))</code></td>
              <td className="border border-gray-700 px-4 py-2"><code>echo -n &quot;str&quot; | openssl base64</code></td>
            </tr>
            <tr>
              <td className="border border-gray-700 px-4 py-2">Decode string</td>
              <td className="border border-gray-700 px-4 py-2"><code>echo &quot;b64&quot; | base64 -d</code></td>
              <td className="border border-gray-700 px-4 py-2"><code>echo &quot;b64&quot; | base64 -D</code></td>
              <td className="border border-gray-700 px-4 py-2"><code>[Text.Encoding]::UTF8.GetString([Convert]::FromBase64String(&quot;b64&quot;))</code></td>
              <td className="border border-gray-700 px-4 py-2"><code>echo &quot;b64&quot; | openssl base64 -d</code></td>
            </tr>
            <tr>
              <td className="border border-gray-700 px-4 py-2">Encode file</td>
              <td className="border border-gray-700 px-4 py-2"><code>base64 file.txt</code></td>
              <td className="border border-gray-700 px-4 py-2"><code>base64 -i file.txt</code></td>
              <td className="border border-gray-700 px-4 py-2"><code>[Convert]::ToBase64String([IO.File]::ReadAllBytes(&quot;file&quot;))</code></td>
              <td className="border border-gray-700 px-4 py-2"><code>openssl base64 -in file.txt</code></td>
            </tr>
            <tr>
              <td className="border border-gray-700 px-4 py-2">Decode file</td>
              <td className="border border-gray-700 px-4 py-2"><code>base64 -d enc.txt &gt; out</code></td>
              <td className="border border-gray-700 px-4 py-2"><code>base64 -D -i enc.txt -o out</code></td>
              <td className="border border-gray-700 px-4 py-2"><code>certutil -decode enc.txt out</code></td>
              <td className="border border-gray-700 px-4 py-2"><code>openssl base64 -d -in enc.txt -out out</code></td>
            </tr>
            <tr>
              <td className="border border-gray-700 px-4 py-2">No line wrap</td>
              <td className="border border-gray-700 px-4 py-2"><code>base64 -w 0</code></td>
              <td className="border border-gray-700 px-4 py-2">(default)</td>
              <td className="border border-gray-700 px-4 py-2">(default)</td>
              <td className="border border-gray-700 px-4 py-2"><code>openssl base64 -A</code></td>
            </tr>
            <tr>
              <td className="border border-gray-700 px-4 py-2">Default wrap</td>
              <td className="border border-gray-700 px-4 py-2">76 chars</td>
              <td className="border border-gray-700 px-4 py-2">No wrap</td>
              <td className="border border-gray-700 px-4 py-2">No wrap</td>
              <td className="border border-gray-700 px-4 py-2">64 chars</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* ============================================================ */}
      {/* 9. FAQ */}
      {/* ============================================================ */}
      <h2 className="text-2xl font-bold mt-10 mb-4">{t.h2_faq}</h2>

      <h3 className="text-xl font-semibold mt-8 mb-3">{t.faq1_q}</h3>
      <p>{t.faq1_a}</p>

      <h3 className="text-xl font-semibold mt-8 mb-3">{t.faq2_q}</h3>
      <p>{t.faq2_a}</p>

      <h3 className="text-xl font-semibold mt-8 mb-3">{t.faq3_q}</h3>
      <p>{t.faq3_a}</p>

      <h3 className="text-xl font-semibold mt-8 mb-3">{t.faq4_q}</h3>
      <p>{t.faq4_a}</p>

      <h3 className="text-xl font-semibold mt-8 mb-3">{t.faq5_q}</h3>
      <p>{t.faq5_a}</p>

      {/* ============================================================ */}
      {/* CONCLUSION */}
      {/* ============================================================ */}
      <p className="mt-8">{t.p_conclusion}</p>
      <p>
        <a href={`/${lang}/tools/base64`} style={{ fontWeight: 600, color: '#38bdf8' }}>
          {t.link_tool_bottom}
        </a>
      </p>
    </article>
  );
}
