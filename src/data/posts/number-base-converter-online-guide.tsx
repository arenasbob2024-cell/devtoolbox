'use client';

import Link from 'next/link';

const translations = {
  en: {
    title: 'Number Base Converter: Convert Binary, Hex, Octal Online — Complete Guide',
    description: 'Convert between binary, octal, decimal, and hexadecimal. Complete guide with JavaScript parseInt, Python bin/hex/oct, bitmasking, two\'s complement, IEEE 754, and real-world use cases.',
    tldr: 'TL;DR',
    tldrText: 'A number base converter converts values between numeral systems: binary (base 2), octal (base 8), decimal (base 10), hexadecimal (base 16), and beyond. Use JavaScript parseInt(\'FF\', 16) and Number.prototype.toString(radix) for quick conversions. Python provides built-in bin(), oct(), hex(), and int() functions. Understanding bases is essential for bitmasking, color manipulation, Unix permissions, memory debugging, and low-level programming.',
    keyTakeaways: 'Key Takeaways',
  },
  zh: {
    title: '进制转换器：在线转换二进制、十六进制、八进制 — 完整指南',
    description: '二进制、八进制、十进制、十六进制互转完整指南。含 JavaScript parseInt、Python bin/hex/oct、位掩码、二进制补码、IEEE 754 浮点数和实际应用案例。',
    tldr: '概要',
    tldrText: '进制转换器在不同数制系统之间转换数值：二进制（基数 2）、八进制（基数 8）、十进制（基数 10）、十六进制（基数 16）及更多。JavaScript 使用 parseInt(\'FF\', 16) 和 Number.prototype.toString(radix) 快速转换。Python 内置 bin()、oct()、hex() 和 int() 函数。理解进制对于位掩码、颜色处理、Unix 权限、内存调试和底层编程至关重要。',
    keyTakeaways: '核心要点',
  },
};

export default function NumberBaseConverterOnlineGuide({ lang }: { lang: string }) {
  const t = translations[lang as keyof typeof translations] || translations.en;

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How do you convert a decimal number to binary?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'To convert decimal to binary, repeatedly divide the number by 2 and record remainders from bottom to top. For example, 13 ÷ 2 = 6 R1, 6 ÷ 2 = 3 R0, 3 ÷ 2 = 1 R1, 1 ÷ 2 = 0 R1. Reading remainders from bottom: 1101. In JavaScript: (13).toString(2) returns "1101". In Python: bin(13) returns "0b1101". The 0b prefix indicates binary notation.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the difference between binary, octal, decimal, and hexadecimal?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Binary (base 2) uses digits 0-1 and is the native language of computers — every bit is a 0 or 1. Octal (base 8) uses digits 0-7 and was historically used for Unix file permissions (e.g., chmod 755). Decimal (base 10) uses digits 0-9 and is the everyday number system. Hexadecimal (base 16) uses digits 0-9 and letters A-F, providing a compact representation of binary data — one hex digit represents exactly 4 bits (a nibble). Common prefixes: 0b for binary, 0o for octal, 0x for hexadecimal.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do you use JavaScript parseInt and toString for base conversion?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'JavaScript parseInt(string, radix) parses a string in the given base and returns a decimal integer. Example: parseInt("FF", 16) returns 255, parseInt("1101", 2) returns 13, parseInt("17", 8) returns 15. Number.prototype.toString(radix) converts a number to a string in the given base. Example: (255).toString(16) returns "ff", (255).toString(2) returns "11111111", (255).toString(8) returns "377". Always provide the radix argument to parseInt to avoid ambiguity.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is two\'s complement and how does it represent negative numbers?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Two\'s complement is the standard method for representing signed integers in binary. For an n-bit number, the most significant bit has a weight of -2^(n-1) instead of 2^(n-1). To negate a number: invert all bits (one\'s complement) then add 1. Example: for 8-bit, -1 is represented as 11111111 (255 unsigned). This allows CPUs to use the same addition circuit for both positive and negative numbers. The range for n-bit two\'s complement is -2^(n-1) to 2^(n-1)-1. For 8 bits: -128 to 127.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do bitwise operations work and what are they used for?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Bitwise operations work on individual bits of integer values. AND (&) sets a bit if both operands have it set — used for masking (extracting specific bits). OR (|) sets a bit if either operand has it — used for setting flags. XOR (^) sets a bit if exactly one operand has it — used for toggling and cryptography. NOT (~) inverts all bits. Left shift (<<) multiplies by 2^n. Right shift (>>) divides by 2^n. Practical uses include Unix permissions (chmod 755 = 0b111101101), RGB color extraction (color >> 16 & 0xFF), feature flags, and network subnet masks.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do you convert hex color codes to RGB and vice versa?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'To convert hex #FF5733 to RGB: split into pairs FF, 57, 33 and parse each as base 16. parseInt("FF", 16) = 255 (red), parseInt("57", 16) = 87 (green), parseInt("33", 16) = 51 (blue). In JavaScript: const [r, g, b] = [hex.slice(1,3), hex.slice(3,5), hex.slice(5,7)].map(h => parseInt(h, 16)). To convert RGB to hex: "#" + [r, g, b].map(v => v.toString(16).padStart(2, "0")).join(""). 8-digit hex includes alpha: #RRGGBBAA where AA is opacity (00=transparent, FF=opaque).',
        },
      },
      {
        '@type': 'Question',
        name: 'What is IEEE 754 floating point and why does 0.1 + 0.2 not equal 0.3?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'IEEE 754 is the standard for representing floating point numbers in binary. A 64-bit double has 1 sign bit, 11 exponent bits, and 52 mantissa bits. The problem with 0.1 + 0.2 is that 0.1 and 0.2 cannot be represented exactly in binary (like 1/3 in decimal). 0.1 in binary is 0.0001100110011... (repeating). When these approximations are added, the result is 0.30000000000000004. Solutions include using integer arithmetic (store cents not dollars), using the decimal.js library, or rounding with toFixed(). Never use == to compare floating point numbers — use Math.abs(a - b) < Number.EPSILON instead.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is Base64 encoding and when should you use it?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Base64 encodes binary data using 64 printable ASCII characters (A-Z, a-z, 0-9, +, /). Each 3 bytes of binary data become 4 Base64 characters, adding ~33% size overhead. Use Base64 when you need to transmit binary data over text channels (email, JSON, HTML data URIs, HTTP headers). URL-safe Base64 replaces + with - and / with _ to avoid percent-encoding in URLs. Base32 uses 32 characters (A-Z, 2-7) and is used in TOTP authentication codes and IPFS content identifiers because it is case-insensitive. In JavaScript: btoa() and atob() encode/decode Base64. In Node.js: Buffer.from(data).toString("base64") and Buffer.from(b64, "base64").',
        },
      },
    ],
  };

  return (
    <article style={{ lineHeight: '1.7', color: '#334155' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <link rel="canonical" href="https://viadreams.cc/en/blog/number-base-converter-online-guide" />

      {/* TL;DR Box */}
      <div style={{ background: '#f0f9ff', border: '1px solid #bae6fd', borderRadius: '8px', padding: '1rem', marginBottom: '1.5rem' }}>
        <p style={{ fontWeight: 700, marginBottom: '0.5rem', color: '#0369a1' }}>{t.tldr}</p>
        <p style={{ margin: 0 }}>
          A <strong>number base converter</strong> converts values between numeral systems: binary (base 2), octal (base 8),
          decimal (base 10), hexadecimal (base 16), and beyond. Use JavaScript{' '}
          <code>parseInt(&apos;FF&apos;, 16)</code> and <code>Number.prototype.toString(radix)</code> for quick conversions.
          Python provides built-in <code>bin()</code>, <code>oct()</code>, <code>hex()</code>, and <code>int()</code>.
          Understanding bases is essential for bitmasking, color manipulation, Unix permissions, memory debugging, and low-level programming.
          Try our free{' '}
          <Link href={`/${lang}/tools/number-base-converter`} style={{ color: '#0284c7' }}>online number base converter</Link>.
        </p>
      </div>

      {/* Section 1: Number Systems Overview */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        Number Systems Overview — Binary, Octal, Decimal, Hexadecimal
      </h2>
      <p>
        Every number system is characterized by its <strong>base (radix)</strong> — the number of unique digits it uses.
        Modern computing relies heavily on non-decimal systems because they align neatly with how digital hardware works.
      </p>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Digit Sets and Prefixes
      </h3>
      <div style={{ overflowX: 'auto', marginBottom: '1rem' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
          <thead>
            <tr style={{ background: '#f1f5f9' }}>
              <th style={{ padding: '10px 12px', textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>Base</th>
              <th style={{ padding: '10px 12px', textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>Name</th>
              <th style={{ padding: '10px 12px', textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>Digits</th>
              <th style={{ padding: '10px 12px', textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>Prefix</th>
              <th style={{ padding: '10px 12px', textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>Example</th>
              <th style={{ padding: '10px 12px', textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>Decimal Value</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}><strong>2</strong></td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Binary</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>0, 1</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}><code>0b</code></td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}><code>0b1101</code></td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>13</td>
            </tr>
            <tr style={{ background: '#fafafa' }}>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}><strong>8</strong></td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Octal</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>0&ndash;7</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}><code>0o</code></td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}><code>0o17</code></td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>15</td>
            </tr>
            <tr>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}><strong>10</strong></td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Decimal</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>0&ndash;9</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>(none)</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}><code>255</code></td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>255</td>
            </tr>
            <tr style={{ background: '#fafafa' }}>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}><strong>16</strong></td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Hexadecimal</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>0&ndash;9, A&ndash;F</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}><code>0x</code></td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}><code>0xFF</code></td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>255</td>
            </tr>
            <tr>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}><strong>32</strong></td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Base32</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>A&ndash;Z, 2&ndash;7</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>(none)</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}><code>H4</code></td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>varies</td>
            </tr>
            <tr style={{ background: '#fafafa' }}>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}><strong>64</strong></td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Base64</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>A&ndash;Z, a&ndash;z, 0&ndash;9, +, /</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>(none)</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}><code>aGVsbG8=</code></td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>binary encoding</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        <strong>Binary</strong> is the foundation of all digital computing. Computers store everything as bits (binary digits).
        <strong>Hexadecimal</strong> is the programmer&apos;s shorthand for binary — one hex digit represents exactly 4 bits
        (a nibble), so a byte (8 bits) is always two hex digits. <code>0xFF</code> is a byte with all bits set to 1.
        <strong>Octal</strong> appears frequently in Unix-like systems for file permissions.
      </p>

      {/* Section 2: Place Value and Conversion Algorithm */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        Place Value and How Conversion Works — Positional Notation
      </h2>
      <p>
        All positional numeral systems work on the same principle: each digit position has a <strong>weight</strong> equal to
        the base raised to the power of the position (counting from right, starting at 0).
      </p>
      <p>
        The decimal number <strong>1234</strong> means:
        1 &times; 10&sup3; + 2 &times; 10&sup2; + 3 &times; 10&sup1; + 4 &times; 10&sup0; = 1000 + 200 + 30 + 4 = 1234
      </p>
      <p>
        The binary number <strong>1101</strong> means:
        1 &times; 2&sup3; + 1 &times; 2&sup2; + 0 &times; 2&sup1; + 1 &times; 2&sup0; = 8 + 4 + 0 + 1 = 13
      </p>
      <p>
        The hexadecimal number <strong>2A</strong> means:
        2 &times; 16&sup1; + 10 &times; 16&sup0; = 32 + 10 = 42
      </p>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Manual Conversion Algorithm — Divide and Remainder Method
      </h3>
      <p>
        To convert a decimal number to any base, repeatedly divide by the target base and collect remainders.
        The remainders read from bottom to top give the result in the new base.
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`-- Converting 42 decimal to binary (base 2):
42 ÷ 2 = 21  remainder 0  ← least significant bit
21 ÷ 2 = 10  remainder 1
10 ÷ 2 = 5   remainder 0
 5 ÷ 2 = 2   remainder 1
 2 ÷ 2 = 1   remainder 0
 1 ÷ 2 = 0   remainder 1  ← most significant bit

Reading remainders bottom to top: 101010
So 42 decimal = 101010 binary = 0b101010

-- Converting 255 decimal to hexadecimal (base 16):
255 ÷ 16 = 15  remainder 15 (F)  ← least significant nibble
 15 ÷ 16 = 0   remainder 15 (F)  ← most significant nibble

Reading remainders bottom to top: FF
So 255 decimal = FF hexadecimal = 0xFF

-- Converting 42 decimal to octal (base 8):
42 ÷ 8 = 5  remainder 2
 5 ÷ 8 = 0  remainder 5

Reading remainders bottom to top: 52
So 42 decimal = 52 octal = 0o52`}</code></pre>
      <p>
        To convert from any base back to decimal, use the positional notation formula above — multiply each digit by its
        positional weight and sum the results.
      </p>

      {/* Section 3: JavaScript */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        JavaScript — parseInt, toString, and Number Literals
      </h2>
      <p>
        JavaScript provides built-in methods for base conversion. <code>parseInt(string, radix)</code> parses a string as a
        number in the specified base. <code>Number.prototype.toString(radix)</code> converts a number to a string in the
        specified base. Always specify the radix in <code>parseInt</code> — without it, strings beginning with{' '}
        <code>0x</code> are parsed as hex, but leading zeros may be treated as octal in older engines.
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`// parseInt(string, radix) — parse string in given base, returns decimal
parseInt('FF', 16)     // => 255  (hex to decimal)
parseInt('ff', 16)     // => 255  (case-insensitive)
parseInt('1101', 2)    // => 13   (binary to decimal)
parseInt('17', 8)      // => 15   (octal to decimal)
parseInt('42', 10)     // => 42   (explicit decimal)
parseInt('zz', 36)     // => 1295 (base36: 0-9 + a-z)

// ALWAYS provide radix — without it, behavior is ambiguous
parseInt('011')        // => 11 in modern engines (decimal)
parseInt('0x1f')       // => 31  (auto-detects hex prefix)

// Number.prototype.toString(radix) — number to string in given base
(255).toString(16)     // => "ff"       (decimal to hex)
(255).toString(2)      // => "11111111" (decimal to binary)
(255).toString(8)      // => "377"      (decimal to octal)
(255).toString(36)     // => "73"       (decimal to base36)

// Uppercase hex
(255).toString(16).toUpperCase()  // => "FF"

// Padded binary — always 8 bits wide
(13).toString(2).padStart(8, '0')  // => "00001101"

// Numeric literals in different bases
const binary  = 0b1101   // => 13
const octal   = 0o17     // => 15
const hex     = 0xFF     // => 255
const decimal = 42       // => 42

// BigInt for large numbers (> Number.MAX_SAFE_INTEGER)
BigInt('0x' + 'ff'.repeat(8)).toString(10)
// => "18446744073709551615" (64-bit max unsigned)`}</code></pre>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Building a Universal Converter in JavaScript
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`// Convert any base to any other base
function convertBase(value: string, fromBase: number, toBase: number): string {
  // Parse the input string from the source base
  const decimal = parseInt(value, fromBase);
  if (isNaN(decimal)) throw new Error(\`Invalid number "\${value}" in base \${fromBase}\`);

  // Convert the decimal result to the target base
  return decimal.toString(toBase).toUpperCase();
}

// Examples
convertBase('FF', 16, 2)   // => "11111111" (hex to binary)
convertBase('1101', 2, 16) // => "D"        (binary to hex)
convertBase('255', 10, 16) // => "FF"       (decimal to hex)
convertBase('17', 8, 2)    // => "1111"     (octal to binary)

// Full conversion object for a number
function allBases(decimal: number) {
  return {
    binary:  decimal.toString(2),
    octal:   decimal.toString(8),
    decimal: decimal.toString(10),
    hex:     decimal.toString(16).toUpperCase(),
    base32:  decimal.toString(32).toUpperCase(),
    base36:  decimal.toString(36).toUpperCase(),
  };
}

console.log(allBases(255));
// {
//   binary:  "11111111",
//   octal:   "377",
//   decimal: "255",
//   hex:     "FF",
//   base32:  "7V",
//   base36:  "73"
// }`}</code></pre>

      {/* Section 4: Hex ↔ RGB Color Conversion */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        Hex ↔ RGB Color Conversion — CSS Color Formats
      </h2>
      <p>
        Hexadecimal colors are ubiquitous in CSS and design tools. A 6-digit hex color like <code>#FF5733</code> represents
        three 8-bit values (0&ndash;255) for red, green, and blue channels. An 8-digit hex like <code>#FF5733CC</code> adds
        an alpha channel for transparency.
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`// Hex color to RGB
function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  // Remove # prefix and handle shorthand (#RGB → #RRGGBB)
  const normalized = hex.replace(/^#/, '');
  const expanded = normalized.length === 3
    ? normalized.split('').map(c => c + c).join('')
    : normalized;

  if (!/^[0-9A-Fa-f]{6}$/.test(expanded)) return null;

  return {
    r: parseInt(expanded.slice(0, 2), 16),
    g: parseInt(expanded.slice(2, 4), 16),
    b: parseInt(expanded.slice(4, 6), 16),
  };
}

hexToRgb('#FF5733')  // => { r: 255, g: 87, b: 51 }
hexToRgb('#0f0')     // => { r: 0, g: 255, b: 0 }

// RGB to hex
function rgbToHex(r: number, g: number, b: number): string {
  return '#' + [r, g, b]
    .map(v => Math.max(0, Math.min(255, v)).toString(16).padStart(2, '0'))
    .join('')
    .toUpperCase();
}

rgbToHex(255, 87, 51)  // => "#FF5733"
rgbToHex(0, 128, 0)    // => "#008000"

// 8-digit hex with alpha channel
function hexToRgba(hex: string): { r: number; g: number; b: number; a: number } | null {
  const normalized = hex.replace(/^#/, '');
  if (normalized.length !== 8) return hexToRgb(hex) ? { ...hexToRgb(hex)!, a: 1 } : null;

  return {
    r: parseInt(normalized.slice(0, 2), 16),
    g: parseInt(normalized.slice(2, 4), 16),
    b: parseInt(normalized.slice(4, 6), 16),
    a: parseInt(normalized.slice(6, 8), 16) / 255,  // 0-1 range
  };
}

hexToRgba('#FF5733CC')  // => { r: 255, g: 87, b: 51, a: 0.8 }

// RGB/RGBA to CSS color strings
const toRgbString = (r: number, g: number, b: number) => \`rgb(\${r}, \${g}, \${b})\`;
const toRgbaString = (r: number, g: number, b: number, a: number) => \`rgba(\${r}, \${g}, \${b}, \${a})\`;

// Using bit operations — fast alternative
function hexToRgbFast(hex: string): [number, number, number] {
  const n = parseInt(hex.replace('#', ''), 16);
  return [(n >> 16) & 0xFF, (n >> 8) & 0xFF, n & 0xFF];
}

hexToRgbFast('#FF5733')  // => [255, 87, 51]`}</code></pre>
      <p>
        CSS supports multiple color formats: <code>rgb(255, 87, 51)</code>, <code>rgba(255, 87, 51, 0.8)</code>,
        <code>hsl(9, 100%, 60%)</code>, and modern <code>color(display-p3 1 0.34 0.2)</code>. Hex is often used in
        design tools because it is compact and easy to copy/paste.
      </p>

      {/* Section 5: Binary Operations */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        Binary Operations — AND, OR, XOR, NOT, and Bit Shifts
      </h2>
      <p>
        Bitwise operators work on the binary representation of integers. JavaScript performs all bitwise operations on
        32-bit signed integers. Python supports arbitrary-precision bitwise operations.
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`// Bitwise AND (&) — both bits must be 1
// Use: masking (extract specific bits)
0b1100 & 0b1010  // => 0b1000 = 8
0xFF & 0x0F      // => 0x0F = 15 (keep lower nibble only)
255 & 0b00001111 // => 15

// Bitwise OR (|) — at least one bit must be 1
// Use: setting flags, combining values
0b1100 | 0b1010  // => 0b1110 = 14
0x00 | 0b00000001 // => 1 (set bit 0)

// Bitwise XOR (^) — exactly one bit must be 1
// Use: toggling bits, simple encryption, swap trick
0b1100 ^ 0b1010  // => 0b0110 = 6
0b1010 ^ 0b1010  // => 0b0000 = 0 (XOR with itself = 0)
0b0000 ^ 0b1111  // => 0b1111    (XOR with all-1s = NOT)

// Bitwise NOT (~) — inverts all bits (32-bit in JS)
~0      // => -1 (all bits set)
~255    // => -256 (in 32-bit two's complement)
~0b1111 // => -16

// Left shift (<<) — shift bits left, multiply by 2^n
1 << 4  // => 16   (1 × 2^4)
3 << 2  // => 12   (3 × 2^2)
1 << 8  // => 256

// Right shift (>>) — shift bits right, divide by 2^n (signed)
16 >> 4  // => 1   (16 ÷ 2^4)
255 >> 4 // => 15  (extract upper nibble)

// Unsigned right shift (>>>) — always fills with 0s
-1 >>> 0  // => 4294967295 (convert to unsigned 32-bit)
-1 >> 0   // => -1 (signed, fills with 1s)`}</code></pre>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Practical Bitwise Patterns
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`// Check if a number is even/odd (faster than %)
const isOdd = (n: number) => (n & 1) === 1;
const isEven = (n: number) => (n & 1) === 0;
isOdd(7)   // => true
isEven(8)  // => true

// Check if power of 2
const isPowerOf2 = (n: number) => n > 0 && (n & (n - 1)) === 0;
isPowerOf2(16)  // => true
isPowerOf2(15)  // => false

// Extract specific byte from a 32-bit number
const getByte = (n: number, byteIndex: number) => (n >> (byteIndex * 8)) & 0xFF;
getByte(0xDEADBEEF, 0)  // => 0xEF = 239 (byte 0, least significant)
getByte(0xDEADBEEF, 3)  // => 0xDE = 222 (byte 3, most significant)

// Set a specific bit
const setBit = (n: number, bit: number) => n | (1 << bit);
setBit(0b1000, 2)  // => 0b1100 = 12 (set bit 2)

// Clear a specific bit
const clearBit = (n: number, bit: number) => n & ~(1 << bit);
clearBit(0b1111, 2)  // => 0b1011 = 11 (clear bit 2)

// Toggle a specific bit
const toggleBit = (n: number, bit: number) => n ^ (1 << bit);
toggleBit(0b1010, 0)  // => 0b1011 = 11 (toggle bit 0)

// Check if a specific bit is set
const isBitSet = (n: number, bit: number) => ((n >> bit) & 1) === 1;
isBitSet(0b1010, 1)  // => true  (bit 1 is set)
isBitSet(0b1010, 0)  // => false (bit 0 is clear)`}</code></pre>

      {/* Section 6: Python */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        Python — bin(), oct(), hex(), int(), and Format Strings
      </h2>
      <p>
        Python provides built-in functions for converting to and from different bases, along with powerful format strings
        for display. Python integers are arbitrary-precision, so there is no overflow for bitwise operations.
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`# Built-in conversion functions
bin(255)    # => "0b11111111"  (decimal to binary string with prefix)
oct(255)    # => "0o377"       (decimal to octal string with prefix)
hex(255)    # => "0xff"        (decimal to hex string with prefix)

# Remove prefix: use [2:] or format()
bin(255)[2:]    # => "11111111"
oct(255)[2:]    # => "377"
hex(255)[2:]    # => "ff"
hex(255)[2:].upper()  # => "FF"

# int(string, base) — convert from any base
int("FF", 16)    # => 255  (hex string to decimal)
int("11111111", 2)  # => 255  (binary string to decimal)
int("377", 8)    # => 255  (octal string to decimal)
int("255", 10)   # => 255  (explicit decimal)
int("z", 36)     # => 35   (base36, max single digit)

# int() also handles prefixed strings
int("0xFF", 16)  # => 255
int("0b11111111", 2)  # => 255
int("0o377", 8)  # => 255

# Python format strings — powerful number formatting
f"{255:b}"    # => "11111111"   (binary, no prefix)
f"{255:o}"    # => "377"        (octal, no prefix)
f"{255:x}"    # => "ff"         (hex lowercase)
f"{255:X}"    # => "FF"         (hex uppercase)
f"{255:#b}"   # => "0b11111111" (binary with prefix)
f"{255:#o}"   # => "0o377"      (octal with prefix)
f"{255:#x}"   # => "0xff"       (hex with prefix)
f"{255:#X}"   # => "0XFF"       (hex uppercase with prefix)

# Padded with zeros
f"{13:08b}"   # => "00001101"  (8-bit binary)
f"{255:04x}"  # => "00ff"      (4-char hex)
f"{255:08X}"  # => "000000FF"  (8-char hex uppercase)

# Format function alternative
format(255, 'b')   # => "11111111"
format(255, '08b') # => "11111111"
format(255, '#010b') # => "0b11111111" (10 chars with prefix)

# Arbitrary-precision arithmetic
n = 2**64   # => 18446744073709551616 (no overflow!)
hex(n)      # => "0x10000000000000000"
bin(n)      # => "0b1" + "0"*64`}</code></pre>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Python Bitwise Operations
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`# Python supports the same bitwise operators as JavaScript
a = 0b1100  # 12
b = 0b1010  # 10

print(a & b)   # => 8    (AND)
print(a | b)   # => 14   (OR)
print(a ^ b)   # => 6    (XOR)
print(~a)      # => -13  (NOT, in two's complement)
print(a << 2)  # => 48   (left shift by 2)
print(a >> 1)  # => 6    (right shift by 1)

# Python has no unsigned right shift (>>> in JS)
# Use masking for unsigned behavior:
result = (~a) & 0xFFFFFFFF  # 32-bit unsigned NOT

# Counting set bits (popcount)
bin(255).count('1')  # => 8 (all bits set)
bin(42).count('1')   # => 3  (42 = 0b101010)

# int.bit_length() — minimum bits needed to represent
(255).bit_length()  # => 8
(1).bit_length()    # => 1
(0).bit_length()    # => 0`}</code></pre>

      {/* Section 7: Go — strconv */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        Go — strconv Package for Base Conversion
      </h2>
      <p>
        Go&apos;s <code>strconv</code> package provides <code>FormatInt</code>, <code>FormatUint</code>,
        <code>ParseInt</code>, and <code>ParseUint</code> for converting integers between bases.
        The <code>fmt</code> package also supports format verbs for binary, octal, and hexadecimal output.
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`package main

import (
    "fmt"
    "strconv"
)

func main() {
    // strconv.FormatInt(value, base) — int64 to string in given base
    fmt.Println(strconv.FormatInt(255, 2))   // => "11111111" (binary)
    fmt.Println(strconv.FormatInt(255, 8))   // => "377"      (octal)
    fmt.Println(strconv.FormatInt(255, 10))  // => "255"      (decimal)
    fmt.Println(strconv.FormatInt(255, 16))  // => "ff"       (hex lowercase)

    // strconv.FormatUint(value, base) — uint64 to string
    fmt.Println(strconv.FormatUint(^uint64(0), 16))  // => "ffffffffffffffff" (max uint64)

    // strconv.ParseInt(string, base, bitSize) — string to int64
    n, err := strconv.ParseInt("FF", 16, 64)
    if err == nil {
        fmt.Println(n)  // => 255
    }

    n2, _ := strconv.ParseInt("1101", 2, 64)
    fmt.Println(n2)  // => 13

    // ParseInt with base 0 auto-detects prefix (0b, 0o, 0x)
    n3, _ := strconv.ParseInt("0xFF", 0, 64)
    fmt.Println(n3)  // => 255

    n4, _ := strconv.ParseInt("0b1101", 0, 64)
    fmt.Println(n4)  // => 13

    // fmt format verbs for output
    fmt.Printf("%b\\n", 42)   // => 101010    (binary)
    fmt.Printf("%o\\n", 42)   // => 52        (octal)
    fmt.Printf("%d\\n", 42)   // => 42        (decimal)
    fmt.Printf("%x\\n", 255)  // => ff        (hex lowercase)
    fmt.Printf("%X\\n", 255)  // => FF        (hex uppercase)
    fmt.Printf("%#b\\n", 42)  // => 0b101010  (binary with prefix)
    fmt.Printf("%#o\\n", 42)  // => 052       (octal with prefix)
    fmt.Printf("%#x\\n", 255) // => 0xff      (hex with prefix)

    // Padded output
    fmt.Printf("%08b\\n", 13)  // => 00001101 (8-bit binary)
    fmt.Printf("%04x\\n", 255) // => 00ff     (4-char hex)

    // Sprintf for string conversion
    hexStr := fmt.Sprintf("%X", 255)  // => "FF"
    binStr := fmt.Sprintf("%08b", 42) // => "00101010"
    _ = hexStr
    _ = binStr
}`}</code></pre>

      {/* Section 8: Bitmasking Patterns */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        Bitmasking Patterns — Unix Permissions, Feature Flags, and Color Extraction
      </h2>
      <p>
        A <strong>bitmask</strong> is a value used with bitwise operations to set, clear, or test specific bits in another
        value. Bitmasks are memory-efficient — a single 32-bit integer can store 32 boolean flags.
      </p>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Unix File Permissions (chmod)
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`# Unix file permission structure (9 bits):
# Bit positions: rwxrwxrwx (owner | group | others)
# r=4, w=2, x=1

# chmod 755 = 0b111101101
# Owner:  111 = 4+2+1 = 7 (rwx — read, write, execute)
# Group:  101 = 4+0+1 = 5 (r-x — read, execute)
# Others: 101 = 4+0+1 = 5 (r-x — read, execute)

# chmod 644 = 0b110100100
# Owner:  110 = 4+2+0 = 6 (rw- — read, write)
# Group:  100 = 4+0+0 = 4 (r-- — read only)
# Others: 100 = 4+0+0 = 4 (r-- — read only)

# Python: checking permissions
permissions = 0o755  # octal literal
owner_read    = bool(permissions & 0o400)  # True
owner_write   = bool(permissions & 0o200)  # True
owner_execute = bool(permissions & 0o100)  # True
group_write   = bool(permissions & 0o020)  # False (755 has no group write)
others_write  = bool(permissions & 0o002)  # False

# Bit positions: 8=owner-r, 7=owner-w, 6=owner-x,
#                5=group-r, 4=group-w, 3=group-x,
#                2=other-r, 1=other-w, 0=other-x

# JavaScript equivalent
const perm = 0o755;
const canOwnerWrite = (perm & 0o200) !== 0;  // true
const canGroupWrite  = (perm & 0o020) !== 0;  // false`}</code></pre>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Feature Flags with Bitmasks
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`// Feature flags — store multiple features in a single integer
const FLAGS = {
  DARK_MODE:      1 << 0,  // 0b00000001 = 1
  NOTIFICATIONS:  1 << 1,  // 0b00000010 = 2
  BETA_FEATURES:  1 << 2,  // 0b00000100 = 4
  ANALYTICS:      1 << 3,  // 0b00001000 = 8
  PRO_FEATURES:   1 << 4,  // 0b00010000 = 16
} as const;

// User has dark mode + notifications + analytics enabled
let userFlags = FLAGS.DARK_MODE | FLAGS.NOTIFICATIONS | FLAGS.ANALYTICS;
// => 1 | 2 | 8 = 11 = 0b00001011

// Check if a feature is enabled
const hasFeature = (flags: number, flag: number) => (flags & flag) !== 0;
hasFeature(userFlags, FLAGS.DARK_MODE)     // => true
hasFeature(userFlags, FLAGS.BETA_FEATURES) // => false

// Enable a feature
userFlags |= FLAGS.BETA_FEATURES;  // set the bit
// => 11 | 4 = 15 = 0b00001111

// Disable a feature
userFlags &= ~FLAGS.NOTIFICATIONS;  // clear the bit
// => 15 & ~2 = 15 & 0b11111101 = 13 = 0b00001101

// Toggle a feature
userFlags ^= FLAGS.ANALYTICS;  // flip the bit

// Store as a compact integer in a database (instead of multiple boolean columns)
const savedToDb = userFlags;  // just one number!`}</code></pre>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        RGB Color Extraction with Bitmasks
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`// A 32-bit ARGB color: 0xAARRGGBB
const color = 0xFF5733CC;  // alpha=0xCC(204), R=0xFF(255), G=0x57(87), B=0x33(51)

// Extract channels using right shifts + mask
const alpha = (color >>> 24) & 0xFF;  // => 204 (use >>> for unsigned shift)
const red   = (color >> 16) & 0xFF;   // => 255
const green = (color >> 8)  & 0xFF;   // => 87
const blue  =  color        & 0xFF;   // => 51

console.log(\`rgba(\${red}, \${green}, \${blue}, \${alpha / 255})\`);
// => "rgba(255, 87, 51, 0.8)"

// Pack RGBA back into a 32-bit integer
function packRgba(r: number, g: number, b: number, a: number): number {
  return ((a & 0xFF) << 24) | ((r & 0xFF) << 16) | ((g & 0xFF) << 8) | (b & 0xFF);
}

// Network subnet mask (IPv4)
// 255.255.255.0 = /24
const subnetMask = (255 << 24) | (255 << 16) | (255 << 8) | 0;
const ip         = (192 << 24) | (168 << 16) | (1 << 8) | 100;
const network    = ip & subnetMask;
// => 192.168.1.0 (network address)`}</code></pre>

      {/* Section 9: Two's Complement */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        Two&apos;s Complement — How CPUs Represent Negative Numbers
      </h2>
      <p>
        <strong>Two&apos;s complement</strong> is the universally used method for representing signed integers in digital hardware.
        Its elegance lies in the fact that signed and unsigned addition use the same circuit — the CPU does not need to
        know whether numbers are signed or unsigned.
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`-- 8-bit signed integers (two's complement):
-- Most significant bit (MSB) has weight -128 instead of +128

  127 = 0111 1111  (max positive: 2^7 - 1)
    1 = 0000 0001
    0 = 0000 0000
   -1 = 1111 1111  (note: "all ones" = -1 in two's complement)
  -2 = 1111 1110
 -127 = 1000 0001
 -128 = 1000 0000  (min negative: -2^7)

-- To negate a number in two's complement:
-- Step 1: Invert all bits (one's complement)
-- Step 2: Add 1

Example: negate 42 (0010 1010)
Step 1: ~42 = 1101 0101  (one's complement)
Step 2: +1 = 1101 0110   (two's complement = -42)
Verify: 1101 0110 = -128 + 64 + 16 + 4 + 2 = -128 + 86 = -42 ✓

-- Overflow in 8-bit arithmetic:
-- 127 + 1 = 0111 1111 + 0000 0001 = 1000 0000 = -128 (overflow!)
-- -128 - 1 = -129 which wraps to 127 (overflow!)`}</code></pre>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`// JavaScript — all bitwise ops work on 32-bit two's complement
~0       // => -1   (flip all bits of 0)
~255     // => -256 (flip all bits of 255)

// Note: JS stores numbers as 64-bit floats but bitwise ops convert to 32-bit int
(-1 >>> 0).toString(16)  // => "ffffffff" (32 bits, all ones)

// Python — unlimited precision, no fixed width overflow
# Python's ~ is one's complement
~42     # => -43 (two's complement for fixed-width conceptually)
~(-1)   # => 0

# Python integers are always stored as signed with arbitrary precision
# There is no overflow — Python grows integers automatically

# To simulate 8-bit overflow in Python:
def to_int8(n: int) -> int:
    n = n & 0xFF  # keep only lower 8 bits
    return n if n < 128 else n - 256

to_int8(127)   # => 127
to_int8(128)   # => -128 (overflow)
to_int8(255)   # => -1
to_int8(256)   # => 0 (wraps around)

# Ranges for common integer types:
# int8:  -128 to 127
# uint8: 0 to 255
# int16: -32768 to 32767
# uint16: 0 to 65535
# int32: -2147483648 to 2147483647
# int64: -9223372036854775808 to 9223372036854775807`}</code></pre>

      {/* Section 10: IEEE 754 Floating Point */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        Floating Point Binary — IEEE 754 and Why 0.1 + 0.2 ≠ 0.3
      </h2>
      <p>
        <strong>IEEE 754</strong> is the international standard for floating point arithmetic, used by virtually every
        modern CPU and programming language. A 64-bit double-precision float has three parts:
        1 sign bit, 11 exponent bits, and 52 mantissa (significand) bits.
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`-- IEEE 754 double-precision (64-bit) layout:
-- [S] [EEEEEEEEEEE] [MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM]
--  1       11                             52
--
-- Value = (-1)^S × 2^(E-1023) × 1.M
-- (where E is the biased exponent, 1.M is the mantissa with implied leading 1)

-- Special values:
-- +Infinity:  S=0, E=all-1s (2047), M=all-0s
-- -Infinity:  S=1, E=all-1s (2047), M=all-0s
-- NaN:        S=any, E=all-1s (2047), M≠0
-- +0 and -0 both exist (differ by sign bit)

-- 0.1 in binary is 0.0001100110011... (recurring, like 1/3 in decimal)
-- The 52-bit mantissa truncates this, causing rounding error

-- Single-precision (32-bit): 1 sign + 8 exponent + 23 mantissa
-- Less precision (~7 decimal digits) but half the memory`}</code></pre>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`// JavaScript floating point gotchas
0.1 + 0.2         // => 0.30000000000000004 (NOT 0.3!)
0.1 + 0.2 === 0.3 // => false

// Correct float comparison
Math.abs((0.1 + 0.2) - 0.3) < Number.EPSILON  // => true

// Inspect float bits using DataView
function floatBits(n: number): string {
  const buf = new ArrayBuffer(8);
  new DataView(buf).setFloat64(0, n, false);  // big-endian
  return Array.from(new Uint8Array(buf))
    .map(b => b.toString(2).padStart(8, '0'))
    .join(' ');
}
floatBits(1.0)   // => "00111111 11110000 00000000 ..."
floatBits(0.1)   // => "00111111 10111001 10011001 ..."
floatBits(Infinity) // => "01111111 11110000 00000000 ..."
floatBits(NaN)   // => "01111111 11111000 00000000 ..."

// Safe integer operations
Number.MAX_SAFE_INTEGER  // => 9007199254740991 (2^53 - 1)
Number.MIN_SAFE_INTEGER  // => -9007199254740991
Number.EPSILON           // => 2.220446049250313e-16

// Precision loss beyond MAX_SAFE_INTEGER
9007199254740992 === 9007199254740993  // => true! (lost precision)

// Use BigInt for integers > 2^53
BigInt(9007199254740992) + 1n  // => 9007199254740993n (exact)

// Solutions for financial calculations
// 1. Use integers (store cents, not dollars)
const priceInCents = 1099;  // $10.99 — no floating point!

// 2. Round to specific decimal places
parseFloat((0.1 + 0.2).toFixed(10))  // => 0.3

// 3. Use a decimal library
// import Decimal from 'decimal.js';
// new Decimal('0.1').plus('0.2').toString()  // => "0.3"`}</code></pre>

      {/* Section 11: Base32 and Base64 */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        Base32 and Base64 — Encoding Binary Data as Text
      </h2>
      <p>
        When binary data must be transmitted through text-only channels (email, JSON APIs, URL parameters, HTML attributes),
        it needs to be encoded using only printable ASCII characters.
      </p>
      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Base64 — The Web Standard
      </h3>
      <p>
        Base64 uses 64 characters: A&ndash;Z (26), a&ndash;z (26), 0&ndash;9 (10), + (1), / (1). Each 3 bytes of input
        produce 4 Base64 characters. If the input is not a multiple of 3 bytes, <code>=</code> padding is added.
        This means Base64 increases size by 33% (4/3).
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`// JavaScript — browser built-ins (strings only)
btoa('hello')                // => "aGVsbG8="  (encode to Base64)
atob('aGVsbG8=')             // => "hello"     (decode from Base64)

// Note: btoa/atob only work with Latin-1 strings
// For Unicode/UTF-8, use TextEncoder:
const encode = (str: string) =>
  btoa(String.fromCharCode(...new TextEncoder().encode(str)));
const decode = (b64: string) =>
  new TextDecoder().decode(Uint8Array.from(atob(b64), c => c.charCodeAt(0)));

encode('こんにちは')  // => "44GT44KT44Gr44Gh44Gv"
decode('44GT44KT44Gr44Gh44Gv')  // => "こんにちは"

// Node.js — Buffer (handles any binary data)
Buffer.from('hello').toString('base64')          // => "aGVsbG8="
Buffer.from('aGVsbG8=', 'base64').toString()     // => "hello"
Buffer.from([0xFF, 0x00, 0xAB]).toString('base64') // => "/wCr"

// URL-safe Base64 (replaces + with -, / with _, removes padding)
Buffer.from('hello world').toString('base64url')  // => "aGVsbG8gd29ybGQ"
// vs standard: "aGVsbG8gd29ybGQ="

// Python — standard library
import base64

base64.b64encode(b'hello')          # => b'aGVsbG8='
base64.b64decode(b'aGVsbG8=')       # => b'hello'
base64.b64encode(b'\\xff\\x00\\xab')  # => b'/wCr'

# URL-safe variant (- and _ instead of + and /)
base64.urlsafe_b64encode(b'hello world')   # => b'aGVsbG8gd29ybGQ='
base64.urlsafe_b64decode(b'aGVsbG8gd29ybGQ=')  # => b'hello world'

# No padding
import base64
base64.b64encode(b'hello').rstrip(b'=')  # => b'aGVsbG8'

# Go
import "encoding/base64"
encoded := base64.StdEncoding.EncodeToString([]byte("hello"))  // "aGVsbG8="
decoded, _ := base64.StdEncoding.DecodeString("aGVsbG8=")     // []byte("hello")

// URL-safe Base64 (Go)
encoded = base64.URLEncoding.EncodeToString([]byte("hello world"))`}</code></pre>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Base32 — Case-Insensitive Encoding
      </h3>
      <p>
        Base32 uses 32 characters: A&ndash;Z and 2&ndash;7. It is case-insensitive (important for humans typing codes),
        avoids ambiguous characters (0/O, 1/I/l), and is used in TOTP authentication codes, IPFS CIDs, and some URL
        shorteners. The tradeoff is ~60% size overhead (5 bytes produce 8 characters).
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`# Python — Base32
import base64

base64.b32encode(b'hello')    # => b'NBSWY3DPEB3W64TMMQ======'
base64.b32decode(b'NBSWY3DPEB3W64TMMQ======')  # => b'hello'

# Case insensitive
base64.b32decode('nbswy3dpeb3w64tmmq======', casefold=True)  # => b'hello'

// TOTP secret is Base32-encoded (Google Authenticator format)
// The 16-character key shown in QR codes = 80-bit Base32 secret
// Example: JBSWY3DPEHPK3PXP = 10 bytes of raw secret

# JavaScript — implementing Base32 (no built-in)
const BASE32_ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';

function base32Decode(encoded: string): Uint8Array {
  const clean = encoded.toUpperCase().replace(/=+$/, '');
  const output: number[] = [];
  let buffer = 0, bitsLeft = 0;

  for (const char of clean) {
    const val = BASE32_ALPHABET.indexOf(char);
    if (val < 0) throw new Error(\`Invalid Base32 char: \${char}\`);
    buffer = (buffer << 5) | val;
    bitsLeft += 5;
    if (bitsLeft >= 8) {
      bitsLeft -= 8;
      output.push((buffer >> bitsLeft) & 0xFF);
    }
  }
  return new Uint8Array(output);
}`}</code></pre>

      {/* Section 12: Hex in Memory Debugging */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        Hexadecimal in Memory Debugging — Hexdumps and Byte Order
      </h2>
      <p>
        Memory is always read in hexadecimal in debuggers, memory dumping tools, and network packet analyzers.
        Understanding hex representation is essential for low-level debugging and reverse engineering.
      </p>
      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Reading a Hexdump
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`# xxd command — create hex dump
$ echo "Hello, World!" | xxd
00000000: 4865 6c6c 6f2c 2057 6f72 6c64 210a       Hello, World!.

# Format: [offset] [hex bytes in groups of 2] [ASCII representation]
# 0x48 = 'H', 0x65 = 'e', 0x6c = 'l', 0x6c = 'l', 0x6f = 'o'
# 0x2c = ',', 0x20 = ' ', 0x57 = 'W', 0x6f = 'o', 0x72 = 'r'
# 0x6c = 'l', 0x64 = 'd', 0x21 = '!', 0x0a = '\\n' (newline)

# hexdump command (BSD/Linux)
$ hexdump -C /bin/ls | head -5
00000000  7f 45 4c 46 02 01 01 00  00 00 00 00 00 00 00 00  |.ELF............|
00000010  02 00 3e 00 01 00 00 00  50 6d 40 00 00 00 00 00  |..>.....Pm@.....|

# First 4 bytes 7f 45 4c 46 = ELF magic number (every Linux binary starts with this)
# 'E'=0x45, 'L'=0x4c, 'F'=0x46

# Python hexdump
data = b'Hello, World!'
print(data.hex())          # => "48656c6c6f2c20576f726c6421"
print(data.hex(' '))       # => "48 65 6c 6c 6f 2c 20 57 6f 72 6c 64 21"

# Reverse: hex string back to bytes
bytes.fromhex('48656c6c6f')  # => b'Hello'`}</code></pre>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Byte Order — Big-Endian vs Little-Endian
      </h3>
      <p>
        <strong>Endianness</strong> determines which byte of a multi-byte integer is stored at the lowest memory address.
        This matters whenever you serialize binary data or read raw memory from different systems.
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`-- Value: 0x12345678 (decimal 305419896)
--
-- Big-endian (most significant byte first — "natural" order):
-- Address: 0x00  0x01  0x02  0x03
-- Value:   0x12  0x34  0x56  0x78
--
-- Little-endian (least significant byte first — x86/x64 native):
-- Address: 0x00  0x01  0x02  0x03
-- Value:   0x78  0x56  0x34  0x12
--
-- Examples:
-- Big-endian: network byte order (TCP/IP), Java, SPARC, PowerPC
-- Little-endian: x86, x64, ARM (usually), RISC-V`}</code></pre>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`// JavaScript — DataView for precise byte control
const buf = new ArrayBuffer(4);
const view = new DataView(buf);

// Write 0x12345678 in big-endian
view.setUint32(0, 0x12345678, false);  // false = big-endian
new Uint8Array(buf)  // => [0x12, 0x34, 0x56, 0x78]

// Write 0x12345678 in little-endian
view.setUint32(0, 0x12345678, true);   // true = little-endian
new Uint8Array(buf)  // => [0x78, 0x56, 0x34, 0x12]

// Read with proper endianness
const bigEndianValue    = view.getUint32(0, false);
const littleEndianValue = view.getUint32(0, true);

# Python — struct module for binary data
import struct
import sys

print(sys.byteorder)  # => "little" on x86, "big" on SPARC

n = 0x12345678
# Pack as big-endian 4-byte unsigned int
big = struct.pack('>I', n)     # => b'\\x12\\x34\\x56\\x78'
# Pack as little-endian 4-byte unsigned int
little = struct.pack('<I', n)  # => b'\\x78\\x56\\x34\\x12'

# Unpack
struct.unpack('>I', big)[0]    # => 305419896
struct.unpack('<I', little)[0] # => 305419896

# Swap byte order of a 32-bit integer
swapped = struct.unpack('>I', struct.pack('<I', n))[0]
# Or with int.to_bytes / int.from_bytes
swapped = int.from_bytes(n.to_bytes(4, 'little'), 'big')`}</code></pre>

      {/* Section 13: UUID, MAC, IPv6 */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        UUID, MAC Addresses, and IPv6 — Hex Notation in Networking
      </h2>
      <p>
        Many networking and identification standards use hexadecimal as their canonical representation.
        Understanding hex makes these formats easy to read and parse.
      </p>
      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        UUIDs — 128-bit Hex Identifiers
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`-- UUID format: 550e8400-e29b-41d4-a716-446655440000
-- Structure (128 bits = 16 bytes = 32 hex digits + 4 hyphens):
-- [time_low  ]-[time_mid]-[time_hi_and_version]-[clock_seq_and_reserved][node     ]
-- [8 hex     ]-[4 hex   ]-[4 hex              ]-[4 hex                 ]-[12 hex  ]
--
-- UUID v4 (random): version=4, variant=0b10xxxxxx
-- The 13th hex digit is always 4 (version)
-- The 17th hex digit is 8, 9, a, or b (variant)
--
-- 550e8400-e29b-[4]1d4-[a]716-446655440000
--                       ^           ^version  ^variant`}</code></pre>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`// JavaScript — parse UUID to bytes and back
function uuidToBytes(uuid: string): Uint8Array {
  const hex = uuid.replace(/-/g, '');
  const bytes = new Uint8Array(16);
  for (let i = 0; i < 16; i++) {
    bytes[i] = parseInt(hex.slice(i * 2, i * 2 + 2), 16);
  }
  return bytes;
}

function bytesToUuid(bytes: Uint8Array): string {
  const hex = Array.from(bytes, b => b.toString(16).padStart(2, '0')).join('');
  return [
    hex.slice(0, 8), hex.slice(8, 12),
    hex.slice(12, 16), hex.slice(16, 20), hex.slice(20)
  ].join('-');
}

// Generate UUID v4 (cryptographically random)
const uuid = crypto.randomUUID();  // => "550e8400-e29b-41d4-a716-446655440000"

// Python
import uuid
u = uuid.uuid4()
str(u)             # => "550e8400-e29b-41d4-a716-446655440000"
u.bytes            # => b'\\x55\\x0e...' (16 raw bytes)
u.int              # => 113059749145936325402354257176981405696 (integer)`}</code></pre>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        MAC Addresses and IPv6
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`-- MAC address: 6 bytes (48 bits) written as hex pairs
-- Format: 00:1A:2B:3C:4D:5E  or  00-1A-2B-3C-4D-5E  or  001A.2B3C.4D5E
-- First 3 bytes (OUI): manufacturer identifier
-- Last 3 bytes: device-specific
-- Bit 0 of byte 0: 0=unicast, 1=multicast
-- Bit 1 of byte 0: 0=globally unique, 1=locally administered

-- IPv6 address: 16 bytes (128 bits) written as 8 groups of 16-bit hex values
-- 2001:0db8:85a3:0000:0000:8a2e:0370:7334
-- Simplified: 2001:db8:85a3::8a2e:370:7334
-- (leading zeros in each group can be dropped, :: represents one group of all-zeros)

-- Loopback: ::1  (127 equivalent = 0000:...:0001)
-- Link-local: fe80::/10 (always starts with FE80)`}</code></pre>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`# Python — parse MAC and IPv6
import re
import ipaddress

# Parse MAC address
mac = "00:1A:2B:3C:4D:5E"
octets = [int(b, 16) for b in mac.split(':')]
# => [0, 26, 43, 60, 77, 94]

# Convert MAC to integer
mac_int = int(mac.replace(':', ''), 16)
# => 112394698424670

# Check if locally administered (bit 1 of first byte)
is_local = bool(octets[0] & 0x02)
# Check if multicast (bit 0 of first byte)
is_multicast = bool(octets[0] & 0x01)

# IPv6 parsing
ip = ipaddress.IPv6Address('2001:db8:85a3::8a2e:370:7334')
ip.packed         # => b'\\x20\\x01\\x0d\\xb8...' (16 bytes)
hex(int(ip))      # => "0x20010db885a3000000008a2e03707334"
ip.is_loopback    # => False
ip.is_link_local  # => False

# Convert integer back to IPv6
ipaddress.IPv6Address(0x20010db885a3000000008a2e03707334)
# => IPv6Address('2001:db8:85a3::8a2e:370:7334')

// JavaScript — IPv6 utilities
function ipv6ToBytes(ip: string): Uint8Array {
  // Expand :: shorthand and split into groups
  const expanded = expandIPv6(ip);
  const groups = expanded.split(':');
  const bytes = new Uint8Array(16);
  groups.forEach((g, i) => {
    const val = parseInt(g, 16);
    bytes[i * 2]     = (val >> 8) & 0xFF;
    bytes[i * 2 + 1] = val & 0xFF;
  });
  return bytes;
}`}</code></pre>

      {/* Key Takeaways */}
      <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '1rem', marginTop: '2rem' }}>
        <p style={{ fontWeight: 700, marginBottom: '0.5rem', color: '#1e293b' }}>{t.keyTakeaways}</p>
        <ul style={{ margin: 0, paddingLeft: '1.25rem', lineHeight: '1.8' }}>
          <li><strong>Hexadecimal</strong> is the programmer&apos;s shorthand for binary — one hex digit = 4 bits, two hex digits = 1 byte. Use it whenever you work with memory, colors, or binary protocols.</li>
          <li>In JavaScript, use <code>parseInt(str, radix)</code> to parse any base, and <code>(n).toString(radix)</code> to convert to any base. Always specify the radix explicitly.</li>
          <li>Python&apos;s <code>bin()</code>, <code>oct()</code>, <code>hex()</code>, and <code>int(n, base)</code> functions cover all common base conversions. Format strings (<code>f&apos;{'{n:08b}'}&apos;</code>) provide padded output.</li>
          <li>Go&apos;s <code>strconv.FormatInt(n, base)</code> and <code>strconv.ParseInt(s, base, bitSize)</code> handle base conversion with proper error handling.</li>
          <li><strong>Bitmasking</strong> with AND (&amp;), OR (|), XOR (^), and shifts (&lt;&lt;, &gt;&gt;) enables compact flag storage and efficient value extraction from packed data.</li>
          <li><strong>Two&apos;s complement</strong> is how all CPUs represent negative integers. Inverting all bits and adding 1 negates a value. Overflow wraps around (127 + 1 = &minus;128 in 8-bit).</li>
          <li><strong>IEEE 754</strong> means floating point cannot represent most decimal fractions exactly. Never use == for float comparison — use <code>Math.abs(a - b) &lt; epsilon</code> instead.</li>
          <li><strong>Base64</strong> (33% size overhead) is the standard for encoding binary in text. Use URL-safe Base64 in URLs and JWT tokens. Use <strong>Base32</strong> for human-readable codes (TOTP, IPFS).</li>
          <li>UUIDs are 128-bit (16-byte) values displayed as 32 hex digits. MAC addresses are 6-byte hex values. IPv6 addresses are 16-byte (128-bit) hex values in groups of 2 bytes.</li>
          <li><strong>Endianness</strong> determines byte order in memory: x86/x64 are little-endian (least significant byte first); network protocols use big-endian (most significant byte first).</li>
        </ul>
      </div>
    </article>
  );
}
