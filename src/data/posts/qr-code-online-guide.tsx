'use client';
import Link from 'next/link';

const translations = {
  en: {
    title: 'QR Code Generator: Create QR Codes Online — Complete Guide',
    description: 'Everything you need to know about QR codes: structure, error correction, JavaScript & Python libraries, logos, styling, WiFi & vCard formats, SVG vs PNG, and capacity limits.',
  },
  zh: {
    title: 'QR 码生成器：在线创建二维码 — 完整指南',
    description: '关于二维码的全面指南：结构、纠错、JavaScript & Python 库、Logo嵌入、样式定制、WiFi 与 vCard 格式、SVG 与 PNG 对比，以及容量限制。',
  },
};

export default function QrCodeOnlineGuide({ lang }: { lang: string }) {
  const t = translations[lang as keyof typeof translations] || translations.en;

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What are the three finder patterns in a QR code and what do they do?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Finder patterns are the three large square patterns (7×7 modules each) located in the top-left, top-right, and bottom-left corners of every QR code. Their unique appearance — a solid 3×3 black square, surrounded by a white border, surrounded by a black ring — makes them instantly recognizable by any scanner regardless of orientation or rotation. Scanners use all three finder patterns to determine the presence of a QR code, locate its edges, calculate its angle of rotation, and establish the coordinate system for decoding the remaining modules. The bottom-right corner deliberately has no finder pattern to help the scanner determine the correct reading orientation.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the difference between QR code error correction levels L, M, Q, and H?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'QR codes use Reed-Solomon error correction with four levels: L (Low) restores up to 7% of damaged codewords and offers the highest data capacity; M (Medium) restores up to 15% and is the recommended default; Q (Quartile) restores up to 25% and suits industrial or outdoor settings; H (High) restores up to 30% and is required when overlaying a logo because the logo obscures part of the data. Higher error correction adds more redundant codewords, which increases the number of modules and the physical size required for the same printed dimensions, but makes the code scannable even when damaged, dirty, or partially obstructed.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I generate a QR code in JavaScript without any build tools?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Load the qrcode.js library from a CDN using a script tag, then call QRCode.toCanvas(canvasElement, text, options) or QRCode.toDataURL(text, options) and place the resulting data URL in an img tag. No build step or npm required. The library works entirely in the browser and supports all four error correction levels, custom colors, and sizes.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I add a logo to the center of a QR code?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Always generate the QR code at error correction level H (30% recovery) first. Then draw the QR code to an HTML canvas, draw the logo image on top of the canvas centered at (width/2, height/2) scaled to about 20-25% of the QR code width. The logo will cover some data modules, but level H error correction ensures the scanner can reconstruct the obscured data. Keep the logo under 30% of the total QR code area to stay within recovery limits. Export the canvas as a PNG or use the canvas 2D API to produce SVG.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I create a WiFi QR code that connects users automatically?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Encode WiFi credentials in the standard WIFI string format: WIFI:T:<type>;S:<SSID>;P:<password>;H:<hidden>;; where T is WPA, WEP, or nopass for open networks; S is the network name (SSID); P is the Wi-Fi password; H is true for hidden networks. Example: WIFI:T:WPA;S:HomeNetwork;P:MyPassword123;; When a smartphone camera scans this QR code it displays a prompt to join the network automatically. Special characters in the SSID or password must be escaped with a backslash.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the maximum data capacity of a QR code?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'A Version 40 QR code (177×177 modules, the largest size) at error correction level L stores up to 7,089 numeric characters, 4,296 alphanumeric characters, 2,953 bytes of binary data, or 1,817 Kanji/Kana characters. In practice, use the smallest version that fits your data. A typical HTTPS URL of 50-80 characters fits in a Version 3-5 code (29×29 to 37×37 modules), which prints clearly at sizes as small as 1.5cm × 1.5cm. Longer data requires more modules, which makes each module smaller and harder to scan at reduced sizes.',
        },
      },
      {
        '@type': 'Question',
        name: 'Should I output QR codes as SVG or PNG?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'SVG is preferred because it is a vector format that scales to any size with no pixelation, making it ideal for print, product packaging, and large-format signage. Use SVG as the master source file. Convert to PNG at a minimum of 1000×1000 pixels (300 DPI) when you need a raster format for social media, email, or embedding in Office documents. Never scale up a small PNG — blurry modules fail to scan on many devices. Generate PNG at the final target size or larger and do not scale up after generation.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I encode a vCard contact as a QR code?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Format the contact data as a vCard string starting with BEGIN:VCARD and ending with END:VCARD. Include fields like FN: (full name), ORG:, TEL:, EMAIL:, URL:, and ADR: on separate lines. Encode the entire vCard string as the QR code data. Most smartphone camera apps recognize the vCard format and offer to save the contact directly to the address book. Keep the vCard minimal — only include the most important fields — because more data means a denser QR code that is harder to scan at small sizes.',
        },
      },
    ],
  };

  return (
    <article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* TL;DR Box */}
      <div style={{ background: '#f0f9ff', border: '1px solid #bae6fd', borderRadius: '8px', padding: '16px 20px', marginBottom: '24px' }}>
        <p style={{ fontWeight: 700, marginBottom: '8px', fontSize: '1.05em', color: '#0c4a6e' }}>TL;DR</p>
        <p style={{ margin: 0, color: '#1e293b' }}>
          QR codes are two-dimensional matrix barcodes that encode data in a grid of black and white squares.
          Use <strong>error correction level M</strong> (15%) for most cases and <strong>level H</strong> (30%) when embedding a logo.
          Generate QR codes in JavaScript with the <code>qrcode</code> npm package or <code>QRCode.toCanvas()</code> in-browser.
          Use Python&#39;s <code>qrcode[pil]</code> library for server-side generation.
          Always export as <strong>SVG</strong> for print-quality output.
          WiFi codes use the <code>WIFI:T:WPA;S:SSID;P:password;;</code> format, and vCard codes use the standard vCard 3.0 schema.
          Try our free <Link href={`/${lang}/tools/qr-code-generator`} style={{ color: '#2563eb' }}>QR Code Generator</Link> to create codes instantly.
        </p>
      </div>

      {/* Key Takeaways */}
      <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '16px 20px', marginBottom: '24px' }}>
        <p style={{ fontWeight: 700, marginBottom: '8px', fontSize: '1.05em', color: '#0f172a' }}>Key Takeaways</p>
        <ul style={{ margin: 0, paddingLeft: '20px', color: '#1e293b' }}>
          <li><strong>Finder patterns</strong> — three 7×7 corner squares — let scanners detect orientation instantly, regardless of rotation.</li>
          <li><strong>Timing patterns</strong> alternate black/white modules and help scanners determine module size and grid alignment.</li>
          <li><strong>Error correction</strong> uses Reed-Solomon codes: L (7%), M (15%), Q (25%), H (30%) — higher levels sacrifice capacity for resilience.</li>
          <li><strong>Browser QR generation</strong>: use <code>qrcode</code> npm package&#39;s <code>QRCode.toCanvas()</code> or <code>QRCode.toDataURL()</code>.</li>
          <li><strong>Node.js terminal output</strong>: <code>QRCode.toString(data, &#123;type: &#39;terminal&#39;&#125;)</code> prints a scannable code to stdout.</li>
          <li><strong>Python</strong>: <code>pip install qrcode[pil]</code> then <code>qrcode.make(data).save(&#39;qr.png&#39;)</code>.</li>
          <li><strong>Logo overlay</strong>: always use level H error correction; keep the logo under 25% of QR code area.</li>
          <li><strong>WiFi QR syntax</strong>: <code>WIFI:T:WPA;S:NetworkName;P:Password;;</code> — smartphones auto-prompt to join.</li>
          <li><strong>vCard QR codes</strong>: encode the full vCard 3.0 string; cameras offer to save the contact directly.</li>
          <li><strong>Max capacity</strong> at level L: 7,089 numeric or 4,296 alphanumeric characters in a Version 40 (177×177) code.</li>
          <li><strong>SVG over PNG</strong>: SVG scales perfectly to any size; raster PNG should be generated at final target resolution.</li>
          <li><strong>Common use cases</strong>: URLs, payment links, restaurant menus, authentication (TOTP), event tickets, product packaging.</li>
        </ul>
      </div>

      {/* Section 1: QR Code Structure */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '2.5rem', marginBottom: '1rem' }}>QR Code Structure: Finder Patterns, Timing, and Data Modules</h2>
      <p>
        Every QR code is a matrix of black and white squares called <strong>modules</strong> arranged on a square grid. The grid size ranges from 21×21 modules (Version 1) to 177×177 modules (Version 40). Within this grid, several functional regions work together to make the code scannable under real-world conditions.
      </p>

      <h3 style={{ fontSize: '1.2rem', fontWeight: 600, marginTop: '1.5rem', marginBottom: '0.75rem' }}>Finder Patterns</h3>
      <p>
        The three large square patterns in the top-left, top-right, and bottom-left corners are called <strong>finder patterns</strong>. Each is a 7×7 module region: a solid 3×3 black square, surrounded by a 1-module white border, surrounded by a 1-module black ring. This distinctive nested-square appearance is uniquely recognizable by scanners and does not occur anywhere else in natural images.
      </p>
      <p>
        Finder patterns serve three critical functions: (1) they tell the scanner that a QR code is present, (2) they provide three reference points that define the code&#39;s position and orientation — even if the code is upside-down or rotated — and (3) they enable perspective correction so that codes photographed at an angle can still be decoded. The deliberate absence of a finder pattern in the bottom-right corner tells the scanner which corner is which.
      </p>
      <p>
        Separating each finder pattern from the data region is a 1-module-wide white <strong>separator</strong>. This white space prevents the finder pattern from blending into adjacent data modules.
      </p>

      <h3 style={{ fontSize: '1.2rem', fontWeight: 600, marginTop: '1.5rem', marginBottom: '0.75rem' }}>Timing Patterns</h3>
      <p>
        Running horizontally between the top two finder patterns and vertically between the top-left and bottom-left finder patterns are the <strong>timing patterns</strong>: alternating single-module-wide rows and columns of black and white modules (black-white-black-white...). These patterns allow the scanner to determine the size of individual modules across the entire grid, compensating for variations in print quality, camera angle, or code size. Without timing patterns, the scanner would have to guess module boundaries.
      </p>

      <h3 style={{ fontSize: '1.2rem', fontWeight: 600, marginTop: '1.5rem', marginBottom: '0.75rem' }}>Alignment Patterns</h3>
      <p>
        QR codes Version 2 and higher include <strong>alignment patterns</strong> — smaller 5×5 module squares (a 1×1 black center, white ring, black ring) placed at fixed positions throughout the code. Their role is to correct for perspective distortion when the QR code is on a curved or tilted surface. The number of alignment patterns grows with the version: Version 2 has one extra alignment pattern, while Version 40 has 46.
      </p>

      <h3 style={{ fontSize: '1.2rem', fontWeight: 600, marginTop: '1.5rem', marginBottom: '0.75rem' }}>Format and Version Information</h3>
      <p>
        A 15-bit <strong>format information</strong> strip, stored redundantly in two locations near the finder patterns, encodes the error correction level and the mask pattern number. This strip is the first thing the scanner reads after locating the finder patterns.
      </p>
      <p>
        QR codes Version 7 and above also contain 18-bit <strong>version information</strong> blocks near the top-right and bottom-left finder patterns. These tell the scanner the exact version number, which determines the grid dimensions and the positions of alignment patterns.
      </p>

      <h3 style={{ fontSize: '1.2rem', fontWeight: 600, marginTop: '1.5rem', marginBottom: '0.75rem' }}>Data Modules and the Quiet Zone</h3>
      <p>
        The remaining area of the grid holds the actual <strong>data codewords</strong> and <strong>error correction codewords</strong>, arranged in an 8-module-wide zigzag pattern that avoids the fixed functional regions. A <strong>mask pattern</strong> (one of eight predefined patterns) is XOR-applied to the data modules to prevent large uniform regions of the same color, which confuse scanners.
      </p>
      <p>
        Surrounding the entire QR code is the mandatory <strong>quiet zone</strong> — at least 4 modules of blank (white) space on every side. This border is the most frequently overlooked requirement: cropping or reducing the quiet zone is the single most common cause of scan failures in printed QR codes.
      </p>

      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '16px', borderRadius: '8px', overflowX: 'auto', fontSize: '0.82rem', lineHeight: '1.6', marginBottom: '24px' }}>
        <code>{`QR Code Module Layout (simplified, Version 1 — 21×21):

┌─────────────────────────────────┐   ← quiet zone (min 4 modules)
│  ┌───────┐  timing  ┌───────┐  │
│  │ FP 1  │──────────│ FP 2  │  │   FP = Finder Pattern (7×7)
│  └───────┘          └───────┘  │
│      │                         │   timing = alternating black/white
│      │         DATA REGION     │
│      │                         │
│  ┌───────┐                     │
│  │ FP 3  │                     │
│  └───────┘                     │
└─────────────────────────────────┘

Version → Module grid → Typical data (Level M)
  1     →  21 × 21    →  up to 14 alphanumeric chars
  3     →  29 × 29    →  up to 47 alphanumeric chars  (short URL)
  5     →  37 × 37    →  up to 90 alphanumeric chars  (standard URL)
  10    →  57 × 57    →  up to 219 alphanumeric chars (full vCard)
  40    → 177 × 177   →  up to 4296 alphanumeric chars (max)`}</code>
      </pre>

      {/* Section 2: Error Correction Levels */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '2.5rem', marginBottom: '1rem' }}>Error Correction Levels: L, M, Q, and H Explained</h2>
      <p>
        QR codes use <strong>Reed-Solomon error correction</strong>, a mathematical technique that allows a scanner to reconstruct data even when part of the code is damaged, obscured, or poorly printed. The QR standard defines four error correction levels, each identified by a letter:
      </p>

      <div style={{ overflowX: 'auto', marginBottom: '24px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.93rem' }}>
          <thead>
            <tr style={{ background: '#f1f5f9' }}>
              <th style={{ padding: '10px 14px', textAlign: 'left', borderBottom: '2px solid #cbd5e1' }}>Level</th>
              <th style={{ padding: '10px 14px', textAlign: 'left', borderBottom: '2px solid #cbd5e1' }}>Name</th>
              <th style={{ padding: '10px 14px', textAlign: 'left', borderBottom: '2px solid #cbd5e1' }}>Recovery Capacity</th>
              <th style={{ padding: '10px 14px', textAlign: 'left', borderBottom: '2px solid #cbd5e1' }}>Recommended Use</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: '9px 14px', borderBottom: '1px solid #e2e8f0', fontFamily: 'monospace', fontWeight: 700, color: '#0284c7' }}>L</td>
              <td style={{ padding: '9px 14px', borderBottom: '1px solid #e2e8f0' }}>Low</td>
              <td style={{ padding: '9px 14px', borderBottom: '1px solid #e2e8f0' }}>Up to 7% of codewords</td>
              <td style={{ padding: '9px 14px', borderBottom: '1px solid #e2e8f0' }}>Maximum data capacity; clean digital display only</td>
            </tr>
            <tr style={{ background: '#f8fafc' }}>
              <td style={{ padding: '9px 14px', borderBottom: '1px solid #e2e8f0', fontFamily: 'monospace', fontWeight: 700, color: '#16a34a' }}>M</td>
              <td style={{ padding: '9px 14px', borderBottom: '1px solid #e2e8f0' }}>Medium</td>
              <td style={{ padding: '9px 14px', borderBottom: '1px solid #e2e8f0' }}>Up to 15% of codewords</td>
              <td style={{ padding: '9px 14px', borderBottom: '1px solid #e2e8f0' }}>Default for most use cases: print, web, packaging</td>
            </tr>
            <tr>
              <td style={{ padding: '9px 14px', borderBottom: '1px solid #e2e8f0', fontFamily: 'monospace', fontWeight: 700, color: '#d97706' }}>Q</td>
              <td style={{ padding: '9px 14px', borderBottom: '1px solid #e2e8f0' }}>Quartile</td>
              <td style={{ padding: '9px 14px', borderBottom: '1px solid #e2e8f0' }}>Up to 25% of codewords</td>
              <td style={{ padding: '9px 14px', borderBottom: '1px solid #e2e8f0' }}>Industrial environments, outdoor signage, labels</td>
            </tr>
            <tr style={{ background: '#f8fafc' }}>
              <td style={{ padding: '9px 14px', borderBottom: '1px solid #e2e8f0', fontFamily: 'monospace', fontWeight: 700, color: '#dc2626' }}>H</td>
              <td style={{ padding: '9px 14px', borderBottom: '1px solid #e2e8f0' }}>High</td>
              <td style={{ padding: '9px 14px', borderBottom: '1px solid #e2e8f0' }}>Up to 30% of codewords</td>
              <td style={{ padding: '9px 14px', borderBottom: '1px solid #e2e8f0' }}>Required when embedding a logo over the QR code</td>
            </tr>
          </tbody>
        </table>
      </div>

      <p>
        Higher error correction levels work by adding more <strong>redundant codewords</strong> to the data. These extra codewords take up modules that would otherwise hold data, so the trade-off is reduced data capacity for the same version, or a larger version required to hold the same amount of data. For example, a Version 5 QR code at level L stores up to 109 alphanumeric characters, but at level H stores only 45.
      </p>
      <p>
        <strong>Choosing the right level:</strong> For digital display (screens, PDFs, emails), level M is sufficient. For printed materials that may experience wear — restaurant menus, business cards, event posters, product labels — use level M or Q. For QR codes printed on textured surfaces, applied as stickers, or used outdoors where dirt and UV damage are expected, use level Q or H. If you are embedding a logo, always use level H without exception.
      </p>

      {/* Section 3: JavaScript (Browser) */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '2.5rem', marginBottom: '1rem' }}>JavaScript qrcode Library: Browser Generation</h2>
      <p>
        The most popular QR code library for browser JavaScript is <strong>qrcode.js</strong> (package name <code>qrcode</code> on npm). It works without a build step via CDN and supports all four error correction levels, custom colors, canvas rendering, and data URL output.
      </p>

      <h3 style={{ fontSize: '1.2rem', fontWeight: 600, marginTop: '1.5rem', marginBottom: '0.75rem' }}>Via CDN (no build step)</h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '16px', borderRadius: '8px', overflowX: 'auto', fontSize: '0.85rem', lineHeight: '1.5', marginBottom: '16px' }}>
        <code>{`<!-- Load from CDN -->
<script src="https://cdn.jsdelivr.net/npm/qrcode@1/build/qrcode.min.js"></script>

<canvas id="qr-canvas"></canvas>
<img id="qr-img" alt="QR Code" />

<script>
  const data = 'https://viadreams.cc/en/tools/qr-code-generator';

  // Render to canvas
  QRCode.toCanvas(
    document.getElementById('qr-canvas'),
    data,
    { errorCorrectionLevel: 'M', width: 300, margin: 4 },
    (err) => { if (err) console.error(err); }
  );

  // Or get a data URL for an <img> tag
  QRCode.toDataURL(data, { errorCorrectionLevel: 'M', width: 300 })
    .then(url => { document.getElementById('qr-img').src = url; })
    .catch(console.error);
</script>`}</code>
      </pre>

      <h3 style={{ fontSize: '1.2rem', fontWeight: 600, marginTop: '1.5rem', marginBottom: '0.75rem' }}>Via npm (React / Next.js)</h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '16px', borderRadius: '8px', overflowX: 'auto', fontSize: '0.85rem', lineHeight: '1.5', marginBottom: '16px' }}>
        <code>{`npm install qrcode
npm install --save-dev @types/qrcode  # TypeScript`}</code>
      </pre>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '16px', borderRadius: '8px', overflowX: 'auto', fontSize: '0.85rem', lineHeight: '1.5', marginBottom: '16px' }}>
        <code>{`'use client';
import { useEffect, useRef, useState } from 'react';
import QRCode from 'qrcode';

interface QrDisplayProps {
  data: string;
  errorLevel?: 'L' | 'M' | 'Q' | 'H';
  size?: number;
}

export default function QrDisplay({ data, errorLevel = 'M', size = 256 }: QrDisplayProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [dataUrl, setDataUrl] = useState<string>('');

  useEffect(() => {
    if (!canvasRef.current || !data) return;

    QRCode.toCanvas(canvasRef.current, data, {
      errorCorrectionLevel: errorLevel,
      width: size,
      margin: 4,
      color: { dark: '#000000', light: '#ffffff' },
    });

    // Also produce a data URL for download
    QRCode.toDataURL(data, { errorCorrectionLevel: errorLevel, width: size, type: 'image/png' })
      .then(setDataUrl);
  }, [data, errorLevel, size]);

  return (
    <div>
      <canvas ref={canvasRef} />
      {dataUrl && (
        <a href={dataUrl} download="qrcode.png">Download PNG</a>
      )}
    </div>
  );
}`}</code>
      </pre>

      <h3 style={{ fontSize: '1.2rem', fontWeight: 600, marginTop: '1.5rem', marginBottom: '0.75rem' }}>SVG output in the browser</h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '16px', borderRadius: '8px', overflowX: 'auto', fontSize: '0.85rem', lineHeight: '1.5', marginBottom: '24px' }}>
        <code>{`import QRCode from 'qrcode';

// Get SVG string
const svgString = await QRCode.toString('https://example.com', {
  type: 'svg',
  errorCorrectionLevel: 'M',
  margin: 4,
});

// Inject into DOM
document.getElementById('qr-container').innerHTML = svgString;

// Or create a downloadable SVG Blob
const blob = new Blob([svgString], { type: 'image/svg+xml' });
const url = URL.createObjectURL(blob);
const link = document.createElement('a');
link.href = url;
link.download = 'qrcode.svg';
link.click();`}</code>
      </pre>

      {/* Section 4: Node.js */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '2.5rem', marginBottom: '1rem' }}>Node.js qrcode Package: Terminal and File Output</h2>
      <p>
        The same <code>qrcode</code> npm package works in Node.js for server-side generation, CLI tools, and build scripts. You can output QR codes directly to the terminal (useful for DevOps scripts), save as PNG files, or generate SVG strings to write to disk.
      </p>

      <h3 style={{ fontSize: '1.2rem', fontWeight: 600, marginTop: '1.5rem', marginBottom: '0.75rem' }}>Terminal output (print to stdout)</h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '16px', borderRadius: '8px', overflowX: 'auto', fontSize: '0.85rem', lineHeight: '1.5', marginBottom: '16px' }}>
        <code>{`// qr-terminal.mjs
import QRCode from 'qrcode';

const url = 'https://viadreams.cc/en/tools/qr-code-generator';

// Print as UTF-8 block characters (scannable in most terminals)
const terminalStr = await QRCode.toString(url, {
  type: 'terminal',
  small: true,           // uses half-block characters for smaller output
  errorCorrectionLevel: 'M',
});
console.log(terminalStr);

// Run: node qr-terminal.mjs`}</code>
      </pre>

      <h3 style={{ fontSize: '1.2rem', fontWeight: 600, marginTop: '1.5rem', marginBottom: '0.75rem' }}>Save as PNG file</h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '16px', borderRadius: '8px', overflowX: 'auto', fontSize: '0.85rem', lineHeight: '1.5', marginBottom: '16px' }}>
        <code>{`// save-qr.mjs
import QRCode from 'qrcode';
import { writeFileSync } from 'fs';

const data = 'https://viadreams.cc/en/tools/qr-code-generator';

// Save to PNG file
await QRCode.toFile('output.png', data, {
  errorCorrectionLevel: 'H',
  width: 1000,           // pixels — use large size for print quality
  margin: 4,
  color: {
    dark: '#000000',
    light: '#ffffff',
  },
});
console.log('QR code saved to output.png');

// Save as SVG
const svgString = await QRCode.toString(data, {
  type: 'svg',
  errorCorrectionLevel: 'M',
  margin: 4,
});
writeFileSync('output.svg', svgString);
console.log('QR code saved to output.svg');`}</code>
      </pre>

      <h3 style={{ fontSize: '1.2rem', fontWeight: 600, marginTop: '1.5rem', marginBottom: '0.75rem' }}>Batch generation in a script</h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '16px', borderRadius: '8px', overflowX: 'auto', fontSize: '0.85rem', lineHeight: '1.5', marginBottom: '24px' }}>
        <code>{`// batch-qr.mjs
import QRCode from 'qrcode';
import { mkdirSync } from 'fs';
import path from 'path';

const items = [
  { id: 'table-1', url: 'https://restaurant.com/menu?table=1' },
  { id: 'table-2', url: 'https://restaurant.com/menu?table=2' },
  { id: 'table-3', url: 'https://restaurant.com/menu?table=3' },
];

mkdirSync('./qr-codes', { recursive: true });

for (const item of items) {
  await QRCode.toFile(
    path.join('./qr-codes', \`\${item.id}.png\`),
    item.url,
    { errorCorrectionLevel: 'M', width: 500 }
  );
  console.log(\`Generated: \${item.id}.png\`);
}
// Run: node batch-qr.mjs`}</code>
      </pre>

      {/* Section 5: Python */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '2.5rem', marginBottom: '1rem' }}>Python qrcode Library: Complete Guide</h2>
      <p>
        The <code>qrcode</code> Python library is the standard tool for QR generation in Python projects. It requires Pillow (<code>PIL</code>) for PNG output, but can also generate SVG without Pillow.
      </p>

      <h3 style={{ fontSize: '1.2rem', fontWeight: 600, marginTop: '1.5rem', marginBottom: '0.75rem' }}>Installation</h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '16px', borderRadius: '8px', overflowX: 'auto', fontSize: '0.85rem', lineHeight: '1.5', marginBottom: '16px' }}>
        <code>{`# For PNG output (includes Pillow)
pip install qrcode[pil]

# For SVG output only (no Pillow required)
pip install qrcode`}</code>
      </pre>

      <h3 style={{ fontSize: '1.2rem', fontWeight: 600, marginTop: '1.5rem', marginBottom: '0.75rem' }}>Basic usage</h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '16px', borderRadius: '8px', overflowX: 'auto', fontSize: '0.85rem', lineHeight: '1.5', marginBottom: '16px' }}>
        <code>{`import qrcode
from qrcode.constants import ERROR_CORRECT_L, ERROR_CORRECT_M, ERROR_CORRECT_Q, ERROR_CORRECT_H

# Simple one-liner
img = qrcode.make('https://viadreams.cc/en/tools/qr-code-generator')
img.save('qr_simple.png')

# Full control with QRCode object
qr = qrcode.QRCode(
    version=None,              # None = auto-select minimum version
    error_correction=ERROR_CORRECT_M,
    box_size=10,               # pixels per module
    border=4,                  # quiet zone width in modules
)
qr.add_data('https://viadreams.cc/en/tools/qr-code-generator')
qr.make(fit=True)             # fit=True auto-adjusts version

img = qr.make_image(fill_color='black', back_color='white')
img.save('qr_full.png')
print(f'QR Version: {qr.version}, Data: {len(qr.data_list[0].data)} bytes')`}</code>
      </pre>

      <h3 style={{ fontSize: '1.2rem', fontWeight: 600, marginTop: '1.5rem', marginBottom: '0.75rem' }}>SVG output (no Pillow needed)</h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '16px', borderRadius: '8px', overflowX: 'auto', fontSize: '0.85rem', lineHeight: '1.5', marginBottom: '16px' }}>
        <code>{`import qrcode
import qrcode.image.svg

# SVG with rect elements (good for CSS styling)
factory = qrcode.image.svg.SvgPathImage   # or SvgImage, SvgFillImage

qr = qrcode.QRCode(error_correction=qrcode.constants.ERROR_CORRECT_M)
qr.add_data('https://viadreams.cc/en/tools/qr-code-generator')
qr.make(fit=True)

img = qr.make_image(image_factory=factory)
img.save('qr_code.svg')    # saves clean, scalable SVG`}</code>
      </pre>

      <h3 style={{ fontSize: '1.2rem', fontWeight: 600, marginTop: '1.5rem', marginBottom: '0.75rem' }}>In-memory bytes (for web APIs / Flask / Django)</h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '16px', borderRadius: '8px', overflowX: 'auto', fontSize: '0.85rem', lineHeight: '1.5', marginBottom: '24px' }}>
        <code>{`import qrcode
import io
from flask import Flask, Response, request

app = Flask(__name__)

@app.route('/qr')
def generate_qr():
    data = request.args.get('data', 'https://example.com')

    qr = qrcode.QRCode(error_correction=qrcode.constants.ERROR_CORRECT_M)
    qr.add_data(data)
    qr.make(fit=True)
    img = qr.make_image(fill_color='black', back_color='white')

    buf = io.BytesIO()
    img.save(buf, format='PNG')
    buf.seek(0)
    return Response(buf.getvalue(), mimetype='image/png')

# GET /qr?data=https://viadreams.cc → returns PNG`}</code>
      </pre>

      {/* Section 6: Logo in center */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '2.5rem', marginBottom: '1rem' }}>Adding a Logo to the Center of a QR Code</h2>
      <p>
        Embedding a brand logo in the center of a QR code is a popular design technique. It works because the error correction system can reconstruct the obscured data — but only if the logo covers less area than the recovery capacity of the error correction level. Always use level H (30% recovery).
      </p>
      <p>
        <strong>The rule:</strong> Keep the logo under 25% of the total QR code area (to leave a safety margin below the 30% limit). For a 300×300 pixel QR code, the logo should be at most about 75×75 pixels, centered.
      </p>

      <h3 style={{ fontSize: '1.2rem', fontWeight: 600, marginTop: '1.5rem', marginBottom: '0.75rem' }}>JavaScript / Canvas approach</h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '16px', borderRadius: '8px', overflowX: 'auto', fontSize: '0.85rem', lineHeight: '1.5', marginBottom: '16px' }}>
        <code>{`import QRCode from 'qrcode';

async function generateQrWithLogo(
  data: string,
  logoSrc: string,
  canvasElement: HTMLCanvasElement,
  qrSize = 400
) {
  // Step 1: Generate QR at level H (required for logo overlay)
  await QRCode.toCanvas(canvasElement, data, {
    errorCorrectionLevel: 'H',   // MUST be H when adding a logo
    width: qrSize,
    margin: 4,
  });

  // Step 2: Load the logo image
  const logo = new Image();
  logo.src = logoSrc;
  await new Promise<void>((resolve) => { logo.onload = () => resolve(); });

  // Step 3: Draw logo over the center of the QR code
  const ctx = canvasElement.getContext('2d')!;
  const logoSize = Math.floor(qrSize * 0.22);   // 22% of QR code size (safe under 25%)
  const logoX = (qrSize - logoSize) / 2;
  const logoY = (qrSize - logoSize) / 2;

  // Optional: white rounded background behind logo for contrast
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.roundRect(logoX - 6, logoY - 6, logoSize + 12, logoSize + 12, 8);
  ctx.fill();

  // Draw the logo
  ctx.drawImage(logo, logoX, logoY, logoSize, logoSize);
}

// Usage example
const canvas = document.getElementById('qr') as HTMLCanvasElement;
await generateQrWithLogo(
  'https://viadreams.cc/en/tools/qr-code-generator',
  '/logo.png',
  canvas,
  400
);`}</code>
      </pre>

      <h3 style={{ fontSize: '1.2rem', fontWeight: 600, marginTop: '1.5rem', marginBottom: '0.75rem' }}>Python: logo overlay with Pillow</h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '16px', borderRadius: '8px', overflowX: 'auto', fontSize: '0.85rem', lineHeight: '1.5', marginBottom: '24px' }}>
        <code>{`import qrcode
from PIL import Image

def generate_qr_with_logo(data: str, logo_path: str, output_path: str, qr_size: int = 600):
    # Step 1: Generate QR at level H
    qr = qrcode.QRCode(
        error_correction=qrcode.constants.ERROR_CORRECT_H,
        box_size=10,
        border=4,
    )
    qr.add_data(data)
    qr.make(fit=True)
    qr_img = qr.make_image(fill_color='black', back_color='white').convert('RGBA')
    qr_img = qr_img.resize((qr_size, qr_size), Image.LANCZOS)

    # Step 2: Open and resize logo to 22% of QR code size
    logo = Image.open(logo_path).convert('RGBA')
    logo_size = int(qr_size * 0.22)
    logo = logo.resize((logo_size, logo_size), Image.LANCZOS)

    # Step 3: Create white rounded background (optional but recommended)
    bg_size = logo_size + 20
    bg = Image.new('RGBA', (bg_size, bg_size), (255, 255, 255, 255))

    # Step 4: Paste logo onto white background, center on QR code
    bg.paste(logo, (10, 10), logo)
    pos = ((qr_size - bg_size) // 2, (qr_size - bg_size) // 2)
    qr_img.paste(bg, pos, bg)

    # Save final image
    qr_img.convert('RGB').save(output_path)
    print(f'Saved: {output_path}')

generate_qr_with_logo(
    'https://viadreams.cc/en/tools/qr-code-generator',
    'logo.png',
    'qr_with_logo.png'
)`}</code>
      </pre>

      {/* Section 7: Styling */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '2.5rem', marginBottom: '1rem' }}>Styling QR Codes: Colors and Rounded Corners</h2>
      <p>
        QR codes do not have to be black and white. You can use custom foreground and background colors, or even render rounded corners on modules for a softer look. There are two important constraints: maintain sufficient <strong>contrast ratio</strong> (dark modules on light background, never the reverse) and never use colors so similar that a scanner cannot distinguish dark from light.
      </p>

      <h3 style={{ fontSize: '1.2rem', fontWeight: 600, marginTop: '1.5rem', marginBottom: '0.75rem' }}>Custom colors with qrcode npm</h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '16px', borderRadius: '8px', overflowX: 'auto', fontSize: '0.85rem', lineHeight: '1.5', marginBottom: '16px' }}>
        <code>{`import QRCode from 'qrcode';

// Brand-colored QR code
await QRCode.toFile('branded.png', 'https://example.com', {
  errorCorrectionLevel: 'M',
  width: 500,
  margin: 4,
  color: {
    dark: '#1e3a5f',    // dark blue modules (must be darker than background)
    light: '#f0f9ff',   // light blue background
  },
});

// Transparent background (good for overlay on colored surfaces)
await QRCode.toFile('transparent.png', 'https://example.com', {
  errorCorrectionLevel: 'M',
  width: 500,
  color: {
    dark: '#000000',
    light: '#00000000',  // fully transparent background (alpha 00)
  },
});`}</code>
      </pre>

      <h3 style={{ fontSize: '1.2rem', fontWeight: 600, marginTop: '1.5rem', marginBottom: '0.75rem' }}>Rounded corners with Canvas API</h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '16px', borderRadius: '8px', overflowX: 'auto', fontSize: '0.85rem', lineHeight: '1.5', marginBottom: '16px' }}>
        <code>{`// Draw each module as a rounded rectangle using Canvas 2D API
import QRCode from 'qrcode';

async function roundedQR(data: string, canvas: HTMLCanvasElement) {
  // Get raw bit matrix
  const matrix = await QRCode.create(data, { errorCorrectionLevel: 'M' });
  const modules = matrix.modules;
  const size = modules.size;

  const moduleSize = canvas.width / (size + 8);  // 8 = 2 × 4 quiet zone modules
  canvas.height = canvas.width;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const offset = 4 * moduleSize;  // quiet zone offset
  const radius = moduleSize * 0.3; // 30% rounding

  ctx.fillStyle = '#000000';
  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      if (modules.get(row, col)) {
        const x = offset + col * moduleSize;
        const y = offset + row * moduleSize;
        ctx.beginPath();
        ctx.roundRect(x + 1, y + 1, moduleSize - 2, moduleSize - 2, radius);
        ctx.fill();
      }
    }
  }
}`}</code>
      </pre>

      <h3 style={{ fontSize: '1.2rem', fontWeight: 600, marginTop: '1.5rem', marginBottom: '0.75rem' }}>Color contrast rules</h3>
      <ul style={{ paddingLeft: '20px', lineHeight: '1.9', marginBottom: '24px' }}>
        <li>The dark modules must always be <strong>darker</strong> than the light modules. Never swap the colors (light modules on dark background can cause scan failures on some devices).</li>
        <li>Maintain a minimum contrast ratio of <strong>3:1</strong> between dark and light areas (WCAG AA standard).</li>
        <li>Avoid using red as the only differentiator — red and green look the same to color-blind users, and some camera algorithms are insensitive to red.</li>
        <li>Test your styled QR code on multiple devices (iOS camera, Android camera, dedicated QR scanner apps) before deployment.</li>
      </ul>

      {/* Section 8: SVG vs PNG */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '2.5rem', marginBottom: '1rem' }}>SVG vs PNG Output: When to Use Each</h2>
      <p>
        The choice between SVG and PNG output affects print quality, file size, browser performance, and use-case compatibility. Understanding the trade-offs helps you choose the right format for each context.
      </p>

      <div style={{ overflowX: 'auto', marginBottom: '24px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.93rem' }}>
          <thead>
            <tr style={{ background: '#f1f5f9' }}>
              <th style={{ padding: '10px 14px', textAlign: 'left', borderBottom: '2px solid #cbd5e1' }}>Property</th>
              <th style={{ padding: '10px 14px', textAlign: 'left', borderBottom: '2px solid #cbd5e1' }}>SVG</th>
              <th style={{ padding: '10px 14px', textAlign: 'left', borderBottom: '2px solid #cbd5e1' }}>PNG</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: '9px 14px', borderBottom: '1px solid #e2e8f0', fontWeight: 600 }}>Scaling</td>
              <td style={{ padding: '9px 14px', borderBottom: '1px solid #e2e8f0', color: '#16a34a' }}>Perfect at any size (vector)</td>
              <td style={{ padding: '9px 14px', borderBottom: '1px solid #e2e8f0', color: '#dc2626' }}>Pixelates when enlarged</td>
            </tr>
            <tr style={{ background: '#f8fafc' }}>
              <td style={{ padding: '9px 14px', borderBottom: '1px solid #e2e8f0', fontWeight: 600 }}>File size</td>
              <td style={{ padding: '9px 14px', borderBottom: '1px solid #e2e8f0' }}>Small (~5-20 KB)</td>
              <td style={{ padding: '9px 14px', borderBottom: '1px solid #e2e8f0' }}>Larger at high resolution</td>
            </tr>
            <tr>
              <td style={{ padding: '9px 14px', borderBottom: '1px solid #e2e8f0', fontWeight: 600 }}>Print quality</td>
              <td style={{ padding: '9px 14px', borderBottom: '1px solid #e2e8f0', color: '#16a34a' }}>Best — crisp at any DPI</td>
              <td style={{ padding: '9px 14px', borderBottom: '1px solid #e2e8f0' }}>Good only if generated large</td>
            </tr>
            <tr style={{ background: '#f8fafc' }}>
              <td style={{ padding: '9px 14px', borderBottom: '1px solid #e2e8f0', fontWeight: 600 }}>Browser support</td>
              <td style={{ padding: '9px 14px', borderBottom: '1px solid #e2e8f0', color: '#16a34a' }}>All modern browsers</td>
              <td style={{ padding: '9px 14px', borderBottom: '1px solid #e2e8f0', color: '#16a34a' }}>Universal</td>
            </tr>
            <tr>
              <td style={{ padding: '9px 14px', borderBottom: '1px solid #e2e8f0', fontWeight: 600 }}>Email embedding</td>
              <td style={{ padding: '9px 14px', borderBottom: '1px solid #e2e8f0', color: '#dc2626' }}>Not supported in most clients</td>
              <td style={{ padding: '9px 14px', borderBottom: '1px solid #e2e8f0', color: '#16a34a' }}>Works everywhere</td>
            </tr>
            <tr style={{ background: '#f8fafc' }}>
              <td style={{ padding: '9px 14px', borderBottom: '1px solid #e2e8f0', fontWeight: 600 }}>CSS styling</td>
              <td style={{ padding: '9px 14px', borderBottom: '1px solid #e2e8f0', color: '#16a34a' }}>Supported (fill, stroke, etc.)</td>
              <td style={{ padding: '9px 14px', borderBottom: '1px solid #e2e8f0', color: '#dc2626' }}>Not supported</td>
            </tr>
            <tr>
              <td style={{ padding: '9px 14px', borderBottom: '1px solid #e2e8f0', fontWeight: 600 }}>Office docs</td>
              <td style={{ padding: '9px 14px', borderBottom: '1px solid #e2e8f0' }}>Limited (Word, PowerPoint vary)</td>
              <td style={{ padding: '9px 14px', borderBottom: '1px solid #e2e8f0', color: '#16a34a' }}>Best compatibility</td>
            </tr>
            <tr style={{ background: '#f8fafc' }}>
              <td style={{ padding: '9px 14px', borderBottom: '1px solid #e2e8f0', fontWeight: 600 }}>Recommended for</td>
              <td style={{ padding: '9px 14px', borderBottom: '1px solid #e2e8f0' }}>Web, print, master source</td>
              <td style={{ padding: '9px 14px', borderBottom: '1px solid #e2e8f0' }}>Social media, email, Office</td>
            </tr>
          </tbody>
        </table>
      </div>

      <p>
        <strong>Best practice workflow:</strong> Generate and save your QR code as SVG. Use the SVG directly in web pages. When you need PNG — for email newsletters, social media posts, or Word documents — export from the SVG at 1000×1000 pixels or larger. Never scale up a small PNG; always generate at the target size or above.
      </p>

      {/* Section 9: WiFi QR Codes */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '2.5rem', marginBottom: '1rem' }}>QR Codes for WiFi Networks: The WIFI: Protocol</h2>
      <p>
        The WiFi QR code format is a de facto standard supported by iOS 11+ and Android 10+ (Android 9 and earlier require a separate app). Scanning a WiFi QR code on a supported device shows a prompt asking whether to join the network — no typing required.
      </p>

      <h3 style={{ fontSize: '1.2rem', fontWeight: 600, marginTop: '1.5rem', marginBottom: '0.75rem' }}>WiFi QR string format</h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '16px', borderRadius: '8px', overflowX: 'auto', fontSize: '0.85rem', lineHeight: '1.5', marginBottom: '16px' }}>
        <code>{`WIFI:T:<encryption>;S:<SSID>;P:<password>;H:<hidden>;;

Field values:
  T  = WPA   (WPA/WPA2/WPA3 — most common)
       WEP   (legacy, insecure — avoid if possible)
       nopass (open network, no password)
  S  = network SSID (name), e.g. MyHomeNetwork
  P  = Wi-Fi password (omit field entirely for open networks)
  H  = true  (hidden SSID — network does not broadcast its name)
       false (or omit — standard visible network)

Examples:
  WPA network:   WIFI:T:WPA;S:HomeNetwork;P:MySecurePass123;;
  Open network:  WIFI:T:nopass;S:CafeGuest;;
  Hidden WPA:    WIFI:T:WPA;S:HiddenNet;P:pass123;H:true;;`}</code>
      </pre>

      <h3 style={{ fontSize: '1.2rem', fontWeight: 600, marginTop: '1.5rem', marginBottom: '0.75rem' }}>Character escaping rules</h3>
      <p>
        If the SSID or password contains any of these characters: <code>\ ; , &quot; :</code> — you must escape them with a backslash.
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '16px', borderRadius: '8px', overflowX: 'auto', fontSize: '0.85rem', lineHeight: '1.5', marginBottom: '16px' }}>
        <code>{`// Characters that must be escaped: \\ ; , " :
// Example: SSID = "Cafe;Network" → escape semicolon
WIFI:T:WPA;S:Cafe\\;Network;P:pass;;

// Password with backslash: "my\\pass" → double the backslash
WIFI:T:WPA;S:MyNet;P:my\\\\pass;;

// JavaScript helper
function wifiQrString(ssid: string, password: string, encryption = 'WPA', hidden = false) {
  const escape = (s: string) => s.replace(/[\\\\;,"":]/g, c => '\\\\' + c);
  const T = encryption;
  const S = escape(ssid);
  const P = password ? \`P:\${escape(password)};\` : '';
  const H = hidden ? 'H:true;' : '';
  return \`WIFI:T:\${T};S:\${S};\${P}\${H};\`;
}

console.log(wifiQrString('HomeNet', 'secret;pass'));
// → WIFI:T:WPA;S:HomeNet;P:secret\\;pass;;`}</code>
      </pre>

      <h3 style={{ fontSize: '1.2rem', fontWeight: 600, marginTop: '1.5rem', marginBottom: '0.75rem' }}>Generate WiFi QR in Python</h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '16px', borderRadius: '8px', overflowX: 'auto', fontSize: '0.85rem', lineHeight: '1.5', marginBottom: '24px' }}>
        <code>{`import qrcode
import re

def wifi_qr_string(ssid: str, password: str, encryption: str = 'WPA', hidden: bool = False) -> str:
    def escape(s: str) -> str:
        return re.sub(r'([\\\\;,":?])', lambda m: '\\\\' + m.group(1), s)
    T = encryption
    S = escape(ssid)
    P = f'P:{escape(password)};' if password else ''
    H = 'H:true;' if hidden else ''
    return f'WIFI:T:{T};S:{S};{P}{H};'

wifi_string = wifi_qr_string('HomeNetwork', 'MyP@$$word!')
print(f'WiFi string: {wifi_string}')

qr = qrcode.QRCode(error_correction=qrcode.constants.ERROR_CORRECT_M)
qr.add_data(wifi_string)
qr.make(fit=True)
img = qr.make_image(fill_color='black', back_color='white')
img.save('wifi_qr.png')
print('WiFi QR saved to wifi_qr.png')`}</code>
      </pre>

      {/* Section 10: vCard QR codes */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '2.5rem', marginBottom: '1rem' }}>QR Codes for vCards: Digital Business Cards</h2>
      <p>
        vCard QR codes let people scan a code and instantly save a contact to their phone&#39;s address book. iOS and Android both recognize the vCard format natively. The QR code encodes a vCard string that begins with <code>BEGIN:VCARD</code> and ends with <code>END:VCARD</code>.
      </p>

      <h3 style={{ fontSize: '1.2rem', fontWeight: 600, marginTop: '1.5rem', marginBottom: '0.75rem' }}>vCard 3.0 format (most compatible)</h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '16px', borderRadius: '8px', overflowX: 'auto', fontSize: '0.85rem', lineHeight: '1.5', marginBottom: '16px' }}>
        <code>{`BEGIN:VCARD
VERSION:3.0
FN:Jane Smith
N:Smith;Jane;;;
ORG:DevToolBox Inc.
TITLE:Senior Developer
TEL;TYPE=WORK,VOICE:+1-415-555-0123
TEL;TYPE=CELL,VOICE:+1-415-555-0456
EMAIL;TYPE=WORK:jane@devtoolbox.com
URL:https://viadreams.cc
ADR;TYPE=WORK:;;123 Main St;San Francisco;CA;94102;USA
END:VCARD`}</code>
      </pre>

      <h3 style={{ fontSize: '1.2rem', fontWeight: 600, marginTop: '1.5rem', marginBottom: '0.75rem' }}>Generate vCard QR in JavaScript</h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '16px', borderRadius: '8px', overflowX: 'auto', fontSize: '0.85rem', lineHeight: '1.5', marginBottom: '16px' }}>
        <code>{`import QRCode from 'qrcode';

interface VCardData {
  firstName: string;
  lastName: string;
  org?: string;
  title?: string;
  phone?: string;
  email?: string;
  url?: string;
  address?: string;
}

function buildVCard(data: VCardData): string {
  const lines = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    \`FN:\${data.firstName} \${data.lastName}\`,
    \`N:\${data.lastName};\${data.firstName};;;\`,
    data.org   && \`ORG:\${data.org}\`,
    data.title && \`TITLE:\${data.title}\`,
    data.phone && \`TEL;TYPE=CELL,VOICE:\${data.phone}\`,
    data.email && \`EMAIL;TYPE=WORK:\${data.email}\`,
    data.url   && \`URL:\${data.url}\`,
    data.address && \`ADR;TYPE=WORK:;;\${data.address}\`,
    'END:VCARD',
  ].filter(Boolean) as string[];

  return lines.join('\\n');
}

const vCard = buildVCard({
  firstName: 'Jane',
  lastName: 'Smith',
  org: 'DevToolBox Inc.',
  title: 'Senior Developer',
  phone: '+1-415-555-0123',
  email: 'jane@devtoolbox.com',
  url: 'https://viadreams.cc',
});

// Use error correction M — level H if adding logo
const dataUrl = await QRCode.toDataURL(vCard, {
  errorCorrectionLevel: 'M',
  width: 400,
});
console.log('vCard QR data URL:', dataUrl.slice(0, 60), '...');`}</code>
      </pre>

      <h3 style={{ fontSize: '1.2rem', fontWeight: 600, marginTop: '1.5rem', marginBottom: '0.75rem' }}>vCard size considerations</h3>
      <p>
        A minimal vCard (name, phone, email only) is typically 80-120 bytes — well within the capacity of a Version 3-4 QR code. A full vCard with address, title, URL, and multiple phone numbers can reach 300-400 bytes, requiring a Version 7-9 code. Keep vCard data minimal: scanners work most reliably at lower QR versions. Omit fields that are not critical for the contact.
      </p>

      {/* Section 11: Capacity and Data Limits */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '2.5rem', marginBottom: '1rem' }}>QR Code Capacity and Data Limits</h2>
      <p>
        QR code capacity depends on three factors: the <strong>version</strong> (grid size), the <strong>error correction level</strong>, and the <strong>data mode</strong> (numeric, alphanumeric, binary, or Kanji). The four data modes offer different capacities for the same number of modules because they use different bit encodings.
      </p>

      <div style={{ overflowX: 'auto', marginBottom: '24px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
          <thead>
            <tr style={{ background: '#f1f5f9' }}>
              <th style={{ padding: '10px 12px', textAlign: 'left', borderBottom: '2px solid #cbd5e1' }}>Version</th>
              <th style={{ padding: '10px 12px', textAlign: 'left', borderBottom: '2px solid #cbd5e1' }}>Modules</th>
              <th style={{ padding: '10px 12px', textAlign: 'left', borderBottom: '2px solid #cbd5e1' }}>Level L Numeric</th>
              <th style={{ padding: '10px 12px', textAlign: 'left', borderBottom: '2px solid #cbd5e1' }}>Level M Alphanumeric</th>
              <th style={{ padding: '10px 12px', textAlign: 'left', borderBottom: '2px solid #cbd5e1' }}>Level H Binary (bytes)</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['1', '21×21', '41', '17', '7'],
              ['2', '25×25', '77', '32', '14'],
              ['3', '29×29', '127', '53', '24'],
              ['5', '37×37', '220', '93', '42'],
              ['10', '57×57', '652', '271', '122'],
              ['15', '77×77', '1249', '512', '227'],
              ['20', '97×97', '2061', '843', '370'],
              ['25', '117×117', '3011', '1220', '532'],
              ['40', '177×177', '7089', '2953', '1273'],
            ].map(([v, m, lNum, mAlpha, hBin], i) => (
              <tr key={v} style={{ background: i % 2 === 1 ? '#f8fafc' : 'transparent' }}>
                <td style={{ padding: '8px 12px', borderBottom: '1px solid #e2e8f0', fontFamily: 'monospace', fontWeight: 600 }}>{v}</td>
                <td style={{ padding: '8px 12px', borderBottom: '1px solid #e2e8f0', fontFamily: 'monospace' }}>{m}</td>
                <td style={{ padding: '8px 12px', borderBottom: '1px solid #e2e8f0' }}>{lNum}</td>
                <td style={{ padding: '8px 12px', borderBottom: '1px solid #e2e8f0' }}>{mAlpha}</td>
                <td style={{ padding: '8px 12px', borderBottom: '1px solid #e2e8f0' }}>{hBin}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p>
        <strong>Data modes explained:</strong>
      </p>
      <ul style={{ paddingLeft: '20px', lineHeight: '1.9', marginBottom: '16px' }}>
        <li><strong>Numeric mode:</strong> digits 0-9 only. Most efficient at 3.33 bits per character. Use for product codes, phone numbers.</li>
        <li><strong>Alphanumeric mode:</strong> uppercase A-Z, digits 0-9, and a small set of symbols (<code>$%*+-./:</code> and space). Efficient at 5.5 bits per character. Automatically selected for uppercase URLs.</li>
        <li><strong>Binary/Byte mode:</strong> all 256 ISO-8859-1 characters (Latin-1). Used for lowercase URLs, UTF-8 text, vCards. 8 bits per character. Mixed-case URLs like <code>https://example.com/Page?id=123</code> use binary mode and take up more space than purely uppercase content.</li>
        <li><strong>Kanji mode:</strong> double-byte characters from the Shift JIS encoding for Japanese text. 13 bits per character, more efficient than binary for Japanese.</li>
      </ul>
      <p>
        <strong>Practical tips for maximizing capacity:</strong> Shorten URLs with a URL shortener (reduces characters from 80+ to under 25). Use uppercase-only alphanumeric characters in URLs where possible (switches from binary to alphanumeric mode, roughly doubling effective capacity). Remove UTM parameters from QR code URLs and track analytics via server-side redirect instead.
      </p>

      {/* Section 12: Common Use Cases */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '2.5rem', marginBottom: '1rem' }}>Common Use Cases: URLs, Payments, and Authentication</h2>
      <p>
        QR codes are used across dozens of industries. Understanding the specific data format for each use case helps you generate codes that work correctly with standard device apps.
      </p>

      <h3 style={{ fontSize: '1.2rem', fontWeight: 600, marginTop: '1.5rem', marginBottom: '0.75rem' }}>URL / Website links</h3>
      <p>
        The most common use case. Simply encode the full URL including the protocol: <code>https://example.com/page?utm_source=qr</code>. Tip: use a URL shortener for long URLs to reduce module density and improve scan reliability at small print sizes.
      </p>

      <h3 style={{ fontSize: '1.2rem', fontWeight: 600, marginTop: '1.5rem', marginBottom: '0.75rem' }}>Payment QR codes</h3>
      <p>
        Payment QR codes encode payment data in application-specific formats. Common standards include:
      </p>
      <ul style={{ paddingLeft: '20px', lineHeight: '1.9', marginBottom: '16px' }}>
        <li><strong>EMVCo (ISO 18004):</strong> Used by WeChat Pay, Alipay, and most Asian payment systems. Encodes a structured TLV (type-length-value) payload with merchant ID, amount, and currency.</li>
        <li><strong>Bitcoin / Crypto:</strong> Format is <code>bitcoin:ADDRESS?amount=0.001&amp;label=Payment</code>. Most crypto wallets recognize the <code>bitcoin:</code> URI scheme natively.</li>
        <li><strong>PayPal.me / Stripe:</strong> Simply encode the payment URL, e.g. <code>https://paypal.me/username/50USD</code>.</li>
        <li><strong>UPI (India):</strong> Format is <code>upi://pay?pa=VPA&amp;pn=Name&amp;am=Amount&amp;cu=INR</code>, recognized by BHIM, Google Pay, PhonePe.</li>
      </ul>

      <h3 style={{ fontSize: '1.2rem', fontWeight: 600, marginTop: '1.5rem', marginBottom: '0.75rem' }}>Two-factor authentication (TOTP)</h3>
      <p>
        Authenticator apps (Google Authenticator, Authy, 1Password) use the <code>otpauth://</code> URI format to configure TOTP secrets via QR code scanning. This is the standard way to set up 2FA for web applications.
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '16px', borderRadius: '8px', overflowX: 'auto', fontSize: '0.85rem', lineHeight: '1.5', marginBottom: '16px' }}>
        <code>{`// TOTP QR code format (RFC 6238 / Google Authenticator standard)
// otpauth://totp/LABEL?secret=SECRET&issuer=ISSUER&algorithm=SHA1&digits=6&period=30

const totpUri = encodeURI(
  'otpauth://totp/DevToolBox:jane@example.com' +
  '?secret=JBSWY3DPEHPK3PXP' +  // base32-encoded TOTP secret
  '&issuer=DevToolBox' +
  '&algorithm=SHA1' +
  '&digits=6' +
  '&period=30'
);

// Generate QR at level M (level H if adding logo to setup screen)
import QRCode from 'qrcode';
const qrDataUrl = await QRCode.toDataURL(totpUri, {
  errorCorrectionLevel: 'M',
  width: 300,
});`}</code>
      </pre>

      <h3 style={{ fontSize: '1.2rem', fontWeight: 600, marginTop: '1.5rem', marginBottom: '0.75rem' }}>Restaurant menus and event tickets</h3>
      <p>
        Dynamic QR codes (redirect-URL codes) are ideal here because the destination can be changed without reprinting. Encode a short redirect URL, track scans per table or per ticket, and update the menu or event details at the redirect destination. For event tickets, QR codes typically encode a unique ticket ID that is validated against a database on scan — the QR code contains the token, not the ticket data itself.
      </p>

      <h3 style={{ fontSize: '1.2rem', fontWeight: 600, marginTop: '1.5rem', marginBottom: '0.75rem' }}>Other common formats</h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '16px', borderRadius: '8px', overflowX: 'auto', fontSize: '0.85rem', lineHeight: '1.5', marginBottom: '24px' }}>
        <code>{`// Email with subject and body pre-filled
mailto:contact@example.com?subject=QR%20Code%20Inquiry&body=Hello%2C

// SMS with pre-filled message
SMSTO:+15551234567:Hello from QR code

// Phone call
tel:+15551234567

// Map location (Google Maps)
https://www.google.com/maps?q=37.7749,-122.4194

// App Store / Play Store link
https://apps.apple.com/app/id123456789
https://play.google.com/store/apps/details?id=com.example.app

// Geo URI (lat/lng — supported by some apps)
geo:37.7749,-122.4194?q=37.7749,-122.4194(DevToolBox+HQ)`}</code>
      </pre>

      {/* Section 13: Best Practices */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '2.5rem', marginBottom: '1rem' }}>QR Code Best Practices and Troubleshooting</h2>

      <h3 style={{ fontSize: '1.2rem', fontWeight: 600, marginTop: '1.5rem', marginBottom: '0.75rem' }}>Design and printing guidelines</h3>
      <ul style={{ paddingLeft: '20px', lineHeight: '1.9', marginBottom: '16px' }}>
        <li><strong>Minimum print size:</strong> 1.5cm × 1.5cm (about 0.6 inches) for a simple URL at error correction level M. Complex codes with more data need to be larger.</li>
        <li><strong>Quiet zone:</strong> Always maintain at least 4 modules of white space on all four sides. This is where scanning most commonly fails.</li>
        <li><strong>Contrast:</strong> Dark modules on light background. Minimum contrast ratio of 3:1. Never dark-on-dark or light-on-light.</li>
        <li><strong>Avoid gradients:</strong> Gradients applied to QR codes can reduce contrast in some areas, causing scan failures. If using a gradient background, test thoroughly.</li>
        <li><strong>Resolution:</strong> For print, export PNG at minimum 300 DPI at the final print size. A 2cm × 2cm print at 300 DPI requires 236 × 236 pixels minimum.</li>
      </ul>

      <h3 style={{ fontSize: '1.2rem', fontWeight: 600, marginTop: '1.5rem', marginBottom: '0.75rem' }}>Common scan failure causes</h3>
      <ul style={{ paddingLeft: '20px', lineHeight: '1.9', marginBottom: '16px' }}>
        <li>Cropped or insufficient quiet zone (most common)</li>
        <li>Low contrast between modules and background</li>
        <li>Overly distorted or skewed code (over 30-40 degrees of perspective angle)</li>
        <li>Too much data for the physical size — use a URL shortener</li>
        <li>PNG generated at low resolution and scaled up in layout software</li>
        <li>Logo covering more than 25-30% of the code at level H</li>
        <li>Glossy laminate creating glare that washes out module contrast</li>
      </ul>

      <h3 style={{ fontSize: '1.2rem', fontWeight: 600, marginTop: '1.5rem', marginBottom: '0.75rem' }}>Testing checklist before deployment</h3>
      <ul style={{ paddingLeft: '20px', lineHeight: '1.9', marginBottom: '24px' }}>
        <li>Scan with iOS Camera app (native, no third-party app)</li>
        <li>Scan with Android Camera app (Pixel and Samsung)</li>
        <li>Scan with a dedicated QR app (QR Scanner, Barcode Scanner)</li>
        <li>Test at the smallest planned print size</li>
        <li>Test from the maximum expected scanning distance</li>
        <li>Test at 45-degree angle to simulate realistic user behavior</li>
        <li>Verify the decoded URL or data is correct</li>
        <li>For WiFi codes: verify network join on both iOS and Android</li>
      </ul>

      {/* Tool CTA */}
      <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '8px', padding: '20px 24px', marginTop: '2rem', marginBottom: '2rem' }}>
        <p style={{ fontWeight: 700, fontSize: '1.1em', marginBottom: '8px', color: '#1e3a8a' }}>
          Generate QR Codes Online — Free Tool
        </p>
        <p style={{ margin: '0 0 12px 0', color: '#1e293b' }}>
          Use our free <Link href={`/${lang}/tools/qr-code-generator`} style={{ color: '#2563eb', fontWeight: 600 }}>QR Code Generator</Link> to instantly create QR codes for URLs, WiFi, vCards, plain text, email, phone, and more.
          Supports all four error correction levels, custom colors, SVG and PNG download — no sign-up required.
        </p>
        <p style={{ margin: 0, color: '#475569', fontSize: '0.92em' }}>
          Related tools: <Link href={`/${lang}/tools/base64-encoder`} style={{ color: '#2563eb' }}>Base64 Encoder</Link> &bull; <Link href={`/${lang}/tools/url-encoder-decoder`} style={{ color: '#2563eb' }}>URL Encoder</Link> &bull; <Link href={`/${lang}/tools/hash-generator`} style={{ color: '#2563eb' }}>Hash Generator</Link>
        </p>
      </div>

      {/* FAQ Section */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '2.5rem', marginBottom: '1rem' }}>Frequently Asked Questions</h2>

      <h3 style={{ fontSize: '1.15rem', fontWeight: 600, marginTop: '1.5rem', marginBottom: '0.5rem' }}>What are the three finder patterns and why are they in three corners only?</h3>
      <p>
        Finder patterns are the three 7×7 corner squares that let scanners detect, orient, and decode a QR code from any angle. They are placed in exactly three corners (top-left, top-right, bottom-left) so that the scanner can determine the correct reading orientation. The absence of a finder pattern in the bottom-right corner is the cue that tells the scanner which corner is which.
      </p>

      <h3 style={{ fontSize: '1.15rem', fontWeight: 600, marginTop: '1.5rem', marginBottom: '0.5rem' }}>What error correction level should I use by default?</h3>
      <p>
        Use <strong>level M (15%)</strong> as the default for almost all use cases — it balances capacity with reasonable resilience to minor damage or printing imperfections. Use level H only when embedding a logo. Use level L only when you need maximum data capacity in a constrained space and the code will always be displayed on a clean digital screen.
      </p>

      <h3 style={{ fontSize: '1.15rem', fontWeight: 600, marginTop: '1.5rem', marginBottom: '0.5rem' }}>Why does my QR code not scan on some devices?</h3>
      <p>
        The most common causes are: insufficient quiet zone (less than 4 modules of white space on any side), low contrast between dark and light modules, code printed too small for the amount of data it contains, or a scaled-up low-resolution PNG. Start by checking the quiet zone and regenerating the code at a larger pixel size.
      </p>

      <h3 style={{ fontSize: '1.15rem', fontWeight: 600, marginTop: '1.5rem', marginBottom: '0.5rem' }}>Can I change a QR code after printing?</h3>
      <p>
        Static QR codes (the kind generated by most free tools) cannot be changed — the data is baked into the module pattern. If you need to change the destination after printing, use a dynamic QR code service that encodes a short redirect URL. You can then update the redirect target at any time without reprinting the physical code.
      </p>

      <h3 style={{ fontSize: '1.15rem', fontWeight: 600, marginTop: '1.5rem', marginBottom: '0.5rem' }}>Is there a license cost to use QR codes?</h3>
      <p>
        No. The QR code standard (ISO/IEC 18004) is open and royalty-free. Denso Wave, which invented the technology, holds the patent but has committed to never enforce it. You are free to generate, print, and use QR codes in commercial and personal projects without any licensing fees.
      </p>
    </article>
  );
}
