'use client';

const translations = {
  en: {
    title: 'Color Converter: Convert HEX, RGB, and HSL Online — Complete Guide',
    description:
      'Convert HEX to RGB, RGB to HSL, and more. Complete guide for CSS color formats, JavaScript libraries, accessibility contrast ratios, and design tokens.',
  },
  zh: {
    title: '颜色转换器：在线转换 HEX、RGB 和 HSL 完整指南',
    description:
      '在线转换 HEX 到 RGB、RGB 到 HSL 等颜色格式。CSS 颜色格式、JavaScript 库、无障碍对比度和设计令牌完整指南。',
  },
};

export default function ColorConverterOnlineGuide({ lang }: { lang: string }) {
  const t = translations[lang as keyof typeof translations] || translations.en;

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How do I convert HEX to RGB?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Parse each 2-character pair in the hex string and convert from base-16 to decimal. For #3B82F6: R=parseInt("3B",16)=59, G=parseInt("82",16)=130, B=parseInt("F6",16)=246. In JavaScript: const r=parseInt(hex.slice(1,3),16), g=parseInt(hex.slice(3,5),16), b=parseInt(hex.slice(5,7),16).',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I convert RGB to HEX?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Combine the three channels using bitwise operations and convert to a hex string: (r << 16 | g << 8 | b).toString(16).padStart(6, "0"). Prefix with # to get the full color code.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the difference between HSL and HSB/HSV?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Both share the same Hue axis. HSL uses Lightness (0%=black, 100%=white, 50%=pure color), while HSB/HSV uses Value/Brightness (0%=black, 100%=brightest color). Figma and Photoshop use HSB for color pickers because the brightness axis maps intuitively to visual perception. HSL is preferred for CSS because adjusting lightness creates natural tints and shades.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is OKLCH and why should I use it?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'OKLCH (Lightness, Chroma, Hue) is a perceptually uniform color space where equal numeric changes produce equal perceived changes. Unlike HSL, adjusting OKLCH lightness does not shift the perceived hue. It is ideal for generating accessible color palettes, gradient interpolation, and design tokens. Modern CSS supports oklch() natively and all major browsers support it.',
        },
      },
      {
        '@type': 'Question',
        name: 'What WCAG contrast ratio is required for accessibility?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'WCAG 2.1 Level AA requires a 4.5:1 contrast ratio for normal text (below 18pt/24px) and 3:1 for large text (18pt bold or 24px regular). Level AAA requires 7:1 for normal text. UI components and graphical objects require 3:1. Calculate using relative luminance: ratio = (L1 + 0.05) / (L2 + 0.05) where L1 is the lighter color.',
        },
      },
      {
        '@type': 'Question',
        name: 'Which JavaScript library is best for color conversion?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'chroma.js is the most comprehensive library, supporting many color spaces including OKLCH and LAB, with color scales and contrast ratio calculation. tinycolor2 is lighter and better for simple HEX/RGB/HSL conversions, dark/light detection, and hue rotation. For zero-dependency solutions, write the conversion functions directly using the mathematical formulas.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I use CSS custom properties for color theming?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Define color tokens as CSS custom properties using HSL for easy programmatic adjustment: --color-primary: hsl(220 90% 56%). For dark mode, override in a @media (prefers-color-scheme: dark) block. Separate the hue into its own variable (--hue: 220) to allow dynamic theme shifting. OKLCH tokens are increasingly popular for their perceptual uniformity.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the difference between sRGB, Display P3, and OKLCH color spaces?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'sRGB is the standard web color space supported everywhere. Display P3 (wide gamut) covers ~50% more colors and is supported by iPhone, Mac, and modern monitors — use color(display-p3 r g b) in CSS. OKLCH is a perceptually uniform space great for palette generation and gradient interpolation, not a display technology itself. Always provide sRGB fallbacks when using P3 or OKLCH.',
        },
      },
    ],
  };

  return (
    <article style={{ maxWidth: '800px', margin: '0 auto', padding: '1rem', fontFamily: 'system-ui, sans-serif', lineHeight: '1.7', color: '#334155' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <h1 style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '1rem', color: '#0f172a', lineHeight: '1.2' }}>
        {t.title}
      </h1>
      <p style={{ color: '#64748b', marginBottom: '1.5rem' }}>{t.description}</p>

      {/* TL;DR */}
      <div style={{ background: '#f0f9ff', border: '1px solid #bae6fd', borderRadius: '8px', padding: '1rem', marginBottom: '1.5rem' }}>
        <strong style={{ color: '#0369a1' }}>TL;DR</strong>
        <p style={{ margin: '0.5rem 0 0' }}>
          Color conversion transforms the same color between representations: HEX (#3B82F6), RGB (rgb(59,130,246)), HSL (hsl(217,91%,60%)), and modern formats like OKLCH. HEX and RGB are mathematically equivalent; HSL separates hue from brightness for design workflows. CSS now natively supports <code>oklch()</code>, <code>lab()</code>, and <code>color-mix()</code>. For accessibility, WCAG AA requires 4.5:1 contrast ratio for normal text. Use chroma.js or tinycolor2 in JavaScript; <code>colorsys</code> in Python.
        </p>
      </div>

      {/* Section 1: Color Formats Overview */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        1. Color Formats Overview
      </h2>
      <p>Modern CSS and design tools support many color representations. Each format has different strengths:</p>

      <div style={{ overflowX: 'auto', marginBottom: '1.5rem' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
          <thead>
            <tr style={{ background: '#f1f5f9' }}>
              <th style={{ padding: '0.6rem 0.8rem', textAlign: 'left', border: '1px solid #e2e8f0', fontWeight: '600' }}>Format</th>
              <th style={{ padding: '0.6rem 0.8rem', textAlign: 'left', border: '1px solid #e2e8f0', fontWeight: '600' }}>Human Readable</th>
              <th style={{ padding: '0.6rem 0.8rem', textAlign: 'left', border: '1px solid #e2e8f0', fontWeight: '600' }}>CSS Support</th>
              <th style={{ padding: '0.6rem 0.8rem', textAlign: 'left', border: '1px solid #e2e8f0', fontWeight: '600' }}>Perceptual</th>
              <th style={{ padding: '0.6rem 0.8rem', textAlign: 'left', border: '1px solid #e2e8f0', fontWeight: '600' }}>Best For</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['HEX', 'Medium', 'Universal', 'No', 'HTML/CSS shorthand, design specs'],
              ['RGB', 'Medium', 'Universal', 'No', 'Screen rendering, canvas, WebGL'],
              ['HSL', 'High', 'Universal', 'Partial', 'Design systems, theming, dark mode'],
              ['HSB/HSV', 'High', 'None (JS only)', 'Partial', 'Color pickers (Figma, Photoshop)'],
              ['OKLCH', 'Medium', 'Modern browsers', 'Yes', 'Generated palettes, gradients'],
              ['Named Colors', 'Highest', 'Universal', 'No', 'Prototyping, readability'],
            ].map(([fmt, readable, css, perceptual, bestFor]) => (
              <tr key={fmt} style={{ borderBottom: '1px solid #e2e8f0' }}>
                <td style={{ padding: '0.6rem 0.8rem', border: '1px solid #e2e8f0', fontWeight: '600', fontFamily: 'monospace' }}>{fmt}</td>
                <td style={{ padding: '0.6rem 0.8rem', border: '1px solid #e2e8f0' }}>{readable}</td>
                <td style={{ padding: '0.6rem 0.8rem', border: '1px solid #e2e8f0' }}>{css}</td>
                <td style={{ padding: '0.6rem 0.8rem', border: '1px solid #e2e8f0' }}>{perceptual}</td>
                <td style={{ padding: '0.6rem 0.8rem', border: '1px solid #e2e8f0' }}>{bestFor}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p>
        CSS Level 4 and 5 introduce powerful new color functions. <code>oklch()</code>, <code>lab()</code>, and <code>lch()</code> are perceptually uniform spaces. <code>color-mix()</code> (CSS Level 5) blends colors. <code>color(display-p3 r g b)</code> accesses wider gamuts on supported displays.
      </p>

      {/* Section 2: HEX ↔ RGB Conversion */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        2. HEX ↔ RGB Conversion
      </h2>
      <p>
        HEX is simply RGB encoded in base-16. The 6-character code splits into three 2-character pairs, each representing a channel value from <code>00</code> (0) to <code>FF</code> (255).
      </p>

      <h3 style={{ fontSize: '1.15rem', fontWeight: '600', marginTop: '1.5rem', marginBottom: '0.5rem', color: '#1e293b' }}>HEX to RGB</h3>
      <p>Parse each 2-character pair with <code>parseInt(hex, 16)</code>:</p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`function hexToRgb(hex) {
  // Remove # prefix
  const clean = hex.replace(/^#/, '');

  // Expand 3-char shorthand: #abc → #aabbcc
  const full = clean.length === 3
    ? clean.split('').map(c => c + c).join('')
    : clean;

  const r = parseInt(full.slice(0, 2), 16); // 0–255
  const g = parseInt(full.slice(2, 4), 16);
  const b = parseInt(full.slice(4, 6), 16);

  // Handle alpha from 8-char HEX (#rrggbbaa)
  const a = full.length === 8
    ? Math.round(parseInt(full.slice(6, 8), 16) / 255 * 100) / 100
    : 1;

  return { r, g, b, a };
}

// Example
hexToRgb('#3B82F6'); // { r: 59, g: 130, b: 246, a: 1 }
hexToRgb('#F00');    // { r: 255, g: 0, b: 0, a: 1 }
hexToRgb('#3B82F680'); // { r: 59, g: 130, b: 246, a: 0.5 }`}</code></pre>

      <h3 style={{ fontSize: '1.15rem', fontWeight: '600', marginTop: '1.5rem', marginBottom: '0.5rem', color: '#1e293b' }}>RGB to HEX</h3>
      <p>Combine channels using bitwise shift, then convert to a hex string:</p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`function rgbToHex(r, g, b) {
  return '#' + (r << 16 | g << 8 | b)
    .toString(16)
    .padStart(6, '0')
    .toUpperCase();
}

// With alpha (produces 8-char HEX)
function rgbaToHex(r, g, b, a = 1) {
  const alpha = Math.round(a * 255)
    .toString(16)
    .padStart(2, '0');
  return rgbToHex(r, g, b) + alpha.toUpperCase();
}

// Examples
rgbToHex(59, 130, 246);    // '#3B82F6'
rgbToHex(255, 0, 0);       // '#FF0000'
rgbaToHex(59, 130, 246, 0.5); // '#3B82F680'`}</code></pre>

      <p style={{ marginTop: '1rem' }}>
        <strong>Short HEX (#abc → #aabbcc):</strong> Duplicate each character. This is a lossless expansion — #abc is identical to #aabbcc.
      </p>
      <p>
        <strong>Alpha HEX (#rrggbbaa):</strong> The 8-character form appends an alpha channel where <code>FF</code> = fully opaque and <code>00</code> = fully transparent. Supported in all modern browsers.
      </p>

      {/* Section 3: RGB ↔ HSL Conversion */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        3. RGB ↔ HSL Conversion
      </h2>
      <p>
        HSL separates color into Hue (0–360°), Saturation (0–100%), and Lightness (0–100%). The conversion normalizes RGB to [0,1] and finds the min/max channels.
      </p>

      <h3 style={{ fontSize: '1.15rem', fontWeight: '600', marginTop: '1.5rem', marginBottom: '0.5rem', color: '#1e293b' }}>RGB to HSL</h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`function rgbToHsl(r, g, b) {
  // Normalize to [0, 1]
  r /= 255; g /= 255; b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const delta = max - min;

  // Lightness
  const l = (max + min) / 2;

  // Saturation
  let s = 0;
  if (delta !== 0) {
    s = delta / (1 - Math.abs(2 * l - 1));
  }

  // Hue (degrees)
  let h = 0;
  if (delta !== 0) {
    if (max === r) h = ((g - b) / delta) % 6;
    else if (max === g) h = (b - r) / delta + 2;
    else h = (r - g) / delta + 4;
    h = Math.round(h * 60);
    if (h < 0) h += 360;
  }

  return {
    h,
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}

// Example: rgb(255, 0, 0) → hsl(0, 100%, 50%)
rgbToHsl(255, 0, 0);   // { h: 0, s: 100, l: 50 }
rgbToHsl(59, 130, 246); // { h: 217, s: 91, l: 60 }`}</code></pre>

      <h3 style={{ fontSize: '1.15rem', fontWeight: '600', marginTop: '1.5rem', marginBottom: '0.5rem', color: '#1e293b' }}>HSL to RGB</h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`function hslToRgb(h, s, l) {
  s /= 100; l /= 100;

  const c = (1 - Math.abs(2 * l - 1)) * s; // Chroma
  const x = c * (1 - Math.abs((h / 60) % 2 - 1));
  const m = l - c / 2;

  let r = 0, g = 0, b = 0;
  if      (h < 60)  { r = c; g = x; b = 0; }
  else if (h < 120) { r = x; g = c; b = 0; }
  else if (h < 180) { r = 0; g = c; b = x; }
  else if (h < 240) { r = 0; g = x; b = c; }
  else if (h < 300) { r = x; g = 0; b = c; }
  else              { r = c; g = 0; b = x; }

  return {
    r: Math.round((r + m) * 255),
    g: Math.round((g + m) * 255),
    b: Math.round((b + m) * 255),
  };
}

// Example: hsl(0, 100%, 50%) → rgb(255, 0, 0)
hslToRgb(0, 100, 50);    // { r: 255, g: 0, b: 0 }
hslToRgb(217, 91, 60);   // { r: 59, g: 130, b: 246 }`}</code></pre>

      {/* Section 4: CSS Color Functions */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        4. CSS Color Functions
      </h2>
      <p>CSS has evolved significantly. Here are all major color functions with examples:</p>

      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`/* Legacy syntax */
color: rgb(59, 130, 246);
color: rgba(59, 130, 246, 0.5);    /* alpha */
color: hsl(217, 91%, 60%);
color: hsla(217, 91%, 60%, 0.5);   /* alpha */

/* Modern space-separated syntax (CSS Color Level 4) */
color: rgb(59 130 246);
color: rgb(59 130 246 / 0.5);      /* alpha with / */
color: hsl(217 91% 60%);
color: hsl(217 91% 60% / 0.5);

/* OKLCH — perceptually uniform (CSS Color Level 4) */
/* oklch(lightness chroma hue) */
color: oklch(0.62 0.18 264);       /* blue */
color: oklch(0.62 0.18 264 / 0.8); /* with alpha */

/* LAB — perceptually uniform */
color: lab(54% -38 57);            /* CSS Color Level 4 */

/* LCH — cylindrical LAB */
color: lch(54% 67 134);

/* color-mix() — blend two colors (CSS Level 5) */
color: color-mix(in srgb, blue 30%, white);
color: color-mix(in oklch, #3B82F6, transparent 50%);

/* color() — access wide gamuts */
color: color(display-p3 0.2 0.5 0.9);   /* P3 wide gamut */
color: color(srgb 0.23 0.51 0.96);       /* explicit sRGB */

/* color-contrast() — experimental, picks best contrast */
color: color-contrast(white vs black, navy, #666);`}</code></pre>

      <p style={{ marginTop: '1rem' }}>
        <strong>Browser support:</strong> <code>rgb()</code>, <code>hsl()</code>, and named colors work everywhere. <code>oklch()</code>, <code>lab()</code>, and <code>color-mix()</code> are supported in Chrome 111+, Firefox 113+, Safari 16.2+. <code>color-contrast()</code> is experimental (behind flags).
      </p>

      {/* Section 5: JavaScript — chroma.js */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        5. JavaScript — chroma.js
      </h2>
      <p>
        chroma.js is the most powerful JavaScript color library. It supports RGB, HSL, LAB, OKLCH, and can compute contrast ratios and generate scales.
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`// npm install chroma-js
import chroma from 'chroma-js';

/* ----- Basic Conversions ----- */
const c = chroma('#ff0000');
c.rgb();      // [255, 0, 0]
c.hsl();      // [0, 1, 0.5]        (normalized 0–1)
c.oklch();    // [0.627, 0.257, 29.2]
c.hex();      // '#ff0000'
c.css();      // 'rgb(255,0,0)'
c.css('hsl'); // 'hsl(0,100%,50%)'

/* ----- Luminance & Contrast ----- */
chroma('#3B82F6').luminance();         // 0.177
chroma.contrast('#3B82F6', '#ffffff'); // 3.04
chroma.contrast('#1d4ed8', '#ffffff'); // 7.08 (WCAG AAA)

/* ----- Manipulate Colors ----- */
chroma('#3B82F6').darken(1).hex();     // '#1a5dcc'
chroma('#3B82F6').lighten(1).hex();    // '#87b8ff'
chroma('#3B82F6').saturate(2).hex();   // '#0074ff'
chroma('#3B82F6').desaturate(1).hex(); // '#5c8ec2'
chroma('#3B82F6').alpha(0.5).css();    // 'rgba(59,130,246,0.5)'

/* ----- Mix Colors ----- */
chroma.mix('#ff0000', '#0000ff', 0.5, 'rgb').hex(); // '#7f007f'
chroma.mix('#ff0000', '#0000ff', 0.5, 'lab').hex(); // '#c0004e'
chroma.mix('#ff0000', '#0000ff', 0.5, 'oklch').hex(); // perceptually even

/* ----- Color Scales ----- */
const scale = chroma.scale(['yellow', 'navy']).mode('lab');
scale(0).hex();    // '#ffff00' (yellow)
scale(0.5).hex();  // midpoint in LAB space
scale(1).hex();    // '#000080' (navy)

// Generate a palette of 7 colors
chroma.scale(['#eff6ff', '#1d4ed8']).colors(7);`}</code></pre>

      {/* Section 6: JavaScript — tinycolor2 */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        6. JavaScript — tinycolor2
      </h2>
      <p>
        tinycolor2 is a lightweight (5KB) library focused on simple color conversions and manipulation. It accepts any CSS color string as input.
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`// npm install tinycolor2
import tinycolor from 'tinycolor2';

/* ----- Format Conversions ----- */
tinycolor('red').toHexString();      // '#ff0000'
tinycolor('#3B82F6').toRgbString();  // 'rgb(59, 130, 246)'
tinycolor('#3B82F6').toHslString();  // 'hsl(217, 91%, 60%)'
tinycolor('#3B82F6').toHsvString();  // 'hsv(217, 76%, 96%)'
tinycolor('hsl(217, 91%, 60%)').toHexString(); // '#3b82f6'

/* ----- Detect Light/Dark ----- */
tinycolor('#3B82F6').isLight(); // false
tinycolor('#3B82F6').isDark();  // true
tinycolor('#93c5fd').isLight(); // true
tinycolor('#3B82F6').getBrightness(); // 118 (0–255)

/* ----- Modify Colors ----- */
tinycolor('#3B82F6').darken(10).toHexString();   // '#1d68de'
tinycolor('#3B82F6').lighten(20).toHexString();  // '#a8c8fb'
tinycolor('#3B82F6').spin(30).toHexString();     // hue +30° → teal-blue
tinycolor('#3B82F6').spin(-30).toHexString();    // hue -30° → purple
tinycolor('#3B82F6').greyscale().toHexString();  // '#808080'

/* ----- Transparency ----- */
tinycolor('#3B82F6').setAlpha(0.5).toRgbString(); // 'rgba(59,130,246,0.5)'
tinycolor('rgba(59,130,246,0.5)').getAlpha();      // 0.5

/* ----- Readability (WCAG) ----- */
tinycolor.readability('#3B82F6', '#ffffff'); // 3.04
tinycolor.isReadable('#1d4ed8', '#ffffff', { level: 'AA', size: 'small' }); // true
tinycolor.isReadable('#3B82F6', '#ffffff', { level: 'AAA' }); // false

/* ----- Color Harmony ----- */
tinycolor('#3B82F6').complement().toHexString();   // opposite hue
tinycolor('#3B82F6').splitcomplement()[1].toHexString();
tinycolor('#3B82F6').triad()[1].toHexString();     // +120°
tinycolor('#3B82F6').analogous()[1].toHexString(); // +30°`}</code></pre>

      {/* Section 7: CSS Custom Properties for Theming */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        7. CSS Custom Properties for Theming
      </h2>
      <p>
        CSS custom properties (variables) enable dynamic, maintainable color systems. HSL is particularly well-suited because its three axes map to independent design decisions: hue (brand identity), saturation (vibrancy), and lightness (tint/shade).
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`:root {
  /* HSL-based token system */
  --hue-primary: 217;
  --hue-success: 142;
  --hue-danger: 0;

  /* Scale: adjust only L to create tints/shades */
  --color-primary-50:  hsl(var(--hue-primary) 91% 97%);
  --color-primary-100: hsl(var(--hue-primary) 91% 93%);
  --color-primary-200: hsl(var(--hue-primary) 91% 85%);
  --color-primary-300: hsl(var(--hue-primary) 91% 73%);
  --color-primary-400: hsl(var(--hue-primary) 91% 63%);
  --color-primary-500: hsl(var(--hue-primary) 91% 56%); /* base */
  --color-primary-600: hsl(var(--hue-primary) 91% 46%);
  --color-primary-700: hsl(var(--hue-primary) 91% 36%);
  --color-primary-800: hsl(var(--hue-primary) 91% 26%);
  --color-primary-900: hsl(var(--hue-primary) 91% 16%);

  /* Semantic tokens */
  --color-text: hsl(var(--hue-primary) 20% 15%);
  --color-bg: hsl(var(--hue-primary) 10% 99%);
  --color-surface: hsl(var(--hue-primary) 10% 96%);
  --color-border: hsl(var(--hue-primary) 20% 88%);
}

/* Dark mode override */
@media (prefers-color-scheme: dark) {
  :root {
    --color-text: hsl(var(--hue-primary) 20% 92%);
    --color-bg: hsl(var(--hue-primary) 20% 8%);
    --color-surface: hsl(var(--hue-primary) 20% 12%);
    --color-border: hsl(var(--hue-primary) 20% 24%);
  }
}

/* Using OKLCH for perceptually uniform tokens */
:root {
  --color-primary: oklch(0.62 0.18 264);
  --color-primary-light: oklch(0.82 0.10 264);
  --color-primary-dark: oklch(0.42 0.20 264);
}

/* Component usage */
.button-primary {
  background-color: var(--color-primary-500);
  color: white;
  border: 1px solid var(--color-primary-600);
}
.button-primary:hover {
  background-color: var(--color-primary-600);
}`}</code></pre>

      {/* Section 8: Accessibility — Contrast Ratios */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        8. Accessibility — WCAG Contrast Ratios
      </h2>
      <p>
        Color contrast affects readability for sighted users and is essential for users with low vision or color blindness (affecting ~8% of males). WCAG 2.1 defines contrast requirements based on relative luminance.
      </p>

      <div style={{ overflowX: 'auto', marginBottom: '1.5rem' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
          <thead>
            <tr style={{ background: '#f1f5f9' }}>
              <th style={{ padding: '0.6rem 0.8rem', textAlign: 'left', border: '1px solid #e2e8f0', fontWeight: '600' }}>WCAG Level</th>
              <th style={{ padding: '0.6rem 0.8rem', textAlign: 'left', border: '1px solid #e2e8f0', fontWeight: '600' }}>Normal Text</th>
              <th style={{ padding: '0.6rem 0.8rem', textAlign: 'left', border: '1px solid #e2e8f0', fontWeight: '600' }}>Large Text</th>
              <th style={{ padding: '0.6rem 0.8rem', textAlign: 'left', border: '1px solid #e2e8f0', fontWeight: '600' }}>UI Components</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
              <td style={{ padding: '0.6rem 0.8rem', border: '1px solid #e2e8f0', fontWeight: '600' }}>AA (Minimum)</td>
              <td style={{ padding: '0.6rem 0.8rem', border: '1px solid #e2e8f0' }}>4.5:1</td>
              <td style={{ padding: '0.6rem 0.8rem', border: '1px solid #e2e8f0' }}>3:1</td>
              <td style={{ padding: '0.6rem 0.8rem', border: '1px solid #e2e8f0' }}>3:1</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
              <td style={{ padding: '0.6rem 0.8rem', border: '1px solid #e2e8f0', fontWeight: '600' }}>AAA (Enhanced)</td>
              <td style={{ padding: '0.6rem 0.8rem', border: '1px solid #e2e8f0' }}>7:1</td>
              <td style={{ padding: '0.6rem 0.8rem', border: '1px solid #e2e8f0' }}>4.5:1</td>
              <td style={{ padding: '0.6rem 0.8rem', border: '1px solid #e2e8f0' }}>—</td>
            </tr>
          </tbody>
        </table>
      </div>

      <p><strong>Large text</strong> is defined as 18pt (24px) or 14pt (approximately 18.67px) bold.</p>

      <h3 style={{ fontSize: '1.15rem', fontWeight: '600', marginTop: '1.5rem', marginBottom: '0.5rem', color: '#1e293b' }}>Calculating Relative Luminance</h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`// Step 1: Linearize sRGB values (gamma correction)
function linearize(val) {
  const v = val / 255;
  return v <= 0.03928
    ? v / 12.92
    : Math.pow((v + 0.055) / 1.055, 2.4);
}

// Step 2: Apply BT.709 luminance coefficients
function relativeLuminance(r, g, b) {
  const R = linearize(r);
  const G = linearize(g);
  const B = linearize(b);
  return 0.2126 * R + 0.7152 * G + 0.0722 * B;
}

// Step 3: Compute contrast ratio
function contrastRatio(rgb1, rgb2) {
  const L1 = relativeLuminance(...rgb1);
  const L2 = relativeLuminance(...rgb2);
  const lighter = Math.max(L1, L2);
  const darker = Math.min(L1, L2);
  return (lighter + 0.05) / (darker + 0.05);
}

// Examples
contrastRatio([59, 130, 246], [255, 255, 255]); // ~3.04 (fails AA)
contrastRatio([29, 78, 216], [255, 255, 255]);   // ~7.08 (passes AAA)
contrastRatio([0, 0, 0], [255, 255, 255]);       // 21:1 (maximum)`}</code></pre>

      <p style={{ marginTop: '1rem' }}>
        <strong>CSS <code>color-contrast()</code> (experimental):</strong> A forthcoming CSS function that automatically picks the highest-contrast color from a list: <code>color: color-contrast(white vs black, navy, #666)</code>. Currently behind flags in browsers.
      </p>

      {/* Section 9: Python — colorsys */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        9. Python — colorsys and Pillow
      </h2>
      <p>
        Python's standard library includes the <code>colorsys</code> module for color space conversions. All values are normalized to [0.0, 1.0].
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`import colorsys

# RGB to HLS (note: HLS = Hue, Lightness, Saturation — different order from HSL!)
r, g, b = 59/255, 130/255, 246/255
h, l, s = colorsys.rgb_to_hls(r, g, b)
print(f"H={h*360:.0f}° S={s*100:.0f}% L={l*100:.0f}%")
# H=217° S=91% L=60%

# RGB to HSV
h, s, v = colorsys.rgb_to_hsv(r, g, b)
print(f"H={h*360:.0f}° S={s*100:.0f}% V={v*100:.0f}%")
# H=217° S=76% V=96%

# HLS to RGB
r2, g2, b2 = colorsys.hls_to_rgb(0.603, 0.60, 0.91)
print(tuple(round(x*255) for x in (r2, g2, b2)))
# (59, 130, 246)

# YIQ conversion (NTSC luminance model)
y, i, q = colorsys.rgb_to_yiq(r, g, b)
print(f"Y (luminance)={y:.3f}")

# --- Pillow ---
from PIL import Image

img = Image.open('photo.jpg').convert('RGB')
pixel = img.getpixel((100, 100))  # (r, g, b) tuple
h, l, s = colorsys.rgb_to_hls(*[v/255 for v in pixel])

# Convert entire image to HSV for processing
import numpy as np
arr = np.array(img) / 255.0  # shape (H, W, 3)
# Vectorized conversion would use skimage or opencv

# --- matplotlib ---
import matplotlib.colors as mcolors
# HEX to RGB (0–1 range)
rgb = mcolors.to_rgb('#3B82F6')  # (0.231, 0.510, 0.965)
# Named color to RGBA
rgba = mcolors.to_rgba('steelblue')
# HSV to RGB
rgb = mcolors.hsv_to_rgb([0.603, 0.76, 0.965])`}</code></pre>

      {/* Section 10: Design Token Workflow */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        10. Design Token Workflow
      </h2>
      <p>
        Modern design systems separate color decisions into layers: primitive tokens (raw values), semantic tokens (contextual meaning), and component tokens (specific usage).
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`/* ===== Layer 1: Primitive Tokens (raw palette) ===== */
:root {
  /* Blue scale */
  --blue-50:  #eff6ff;
  --blue-100: #dbeafe;
  --blue-200: #bfdbfe;
  --blue-300: #93c5fd;
  --blue-400: #60a5fa;
  --blue-500: #3b82f6;
  --blue-600: #2563eb;
  --blue-700: #1d4ed8;
  --blue-800: #1e40af;
  --blue-900: #1e3a8a;

  /* Neutral scale */
  --neutral-50:  #f8fafc;
  --neutral-900: #0f172a;
}

/* ===== Layer 2: Semantic Tokens (meaning) ===== */
:root {
  --color-action:      var(--blue-600);
  --color-action-hover: var(--blue-700);
  --color-text-primary: var(--neutral-900);
  --color-text-muted:   #64748b;
  --color-bg-primary:   #ffffff;
  --color-bg-subtle:    var(--neutral-50);
  --color-border:       #e2e8f0;
}

@media (prefers-color-scheme: dark) {
  :root {
    --color-action:       var(--blue-400);
    --color-action-hover: var(--blue-300);
    --color-text-primary: var(--neutral-50);
    --color-bg-primary:   var(--neutral-900);
    --color-bg-subtle:    #1e293b;
    --color-border:       #334155;
  }
}

/* ===== Layer 3: Component Tokens ===== */
.button {
  --btn-bg:     var(--color-action);
  --btn-bg-hover: var(--color-action-hover);
  --btn-text:   white;
  background: var(--btn-bg);
  color: var(--btn-text);
}
.button:hover { background: var(--btn-bg-hover); }`}</code></pre>

      <p style={{ marginTop: '1rem' }}>
        <strong>From Figma to CSS:</strong> Export Figma color styles as JSON using the Tokens Studio plugin or Figma's REST API. Transform with Style Dictionary (Amazon's open-source tool) to generate CSS custom properties, Sass variables, or TypeScript constants from a single source of truth.
      </p>

      {/* Section 11: Color Spaces for Web */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        11. Color Spaces for Web
      </h2>
      <p>
        Understanding color spaces helps you choose the right format for each use case:
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
        {[
          {
            name: 'sRGB',
            desc: 'The universal web standard. All CSS colors default to sRGB. Supported in every browser, tool, and image format. Use for maximum compatibility.',
            when: 'Default choice for all web colors.',
          },
          {
            name: 'Display P3',
            desc: 'Wide gamut covering ~50% more colors than sRGB. Supported by iPhone cameras, Macs, and modern OLED monitors. Use color(display-p3 r g b) in CSS.',
            when: 'Vibrant photos, video content, Apple platforms.',
          },
          {
            name: 'OKLCH',
            desc: 'Perceptually uniform — equal changes produce equal perceived differences. No hue shift when adjusting lightness. Ideal for generating accessible palettes programmatically.',
            when: 'Design tokens, gradient interpolation, palette generation.',
          },
        ].map(({ name, desc, when }) => (
          <div key={name} style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '1rem' }}>
            <strong style={{ display: 'block', fontSize: '1rem', color: '#1e293b', marginBottom: '0.4rem' }}>{name}</strong>
            <p style={{ margin: '0 0 0.5rem', fontSize: '0.875rem' }}>{desc}</p>
            <p style={{ margin: 0, fontSize: '0.8rem', color: '#64748b' }}><em>Best for: {when}</em></p>
          </div>
        ))}
      </div>

      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`/* Provide progressive enhancement with fallbacks */
.vivid-blue {
  /* Fallback for older browsers */
  color: #3B82F6;

  /* P3 wide gamut (more vibrant on supported displays) */
  @supports (color: color(display-p3 0 0 0)) {
    color: color(display-p3 0.17 0.46 0.99);
  }
}

/* Convert P3 to sRGB (values may clip outside sRGB gamut) */
/* #3B82F6 sRGB ≈ display-p3(0.2, 0.48, 0.96) */`}</code></pre>

      {/* Section 12: Color Palette Generation */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        12. Color Palette Generation
      </h2>
      <p>
        Generate color harmonies by rotating the hue axis in HSL. The following patterns are standard in color theory:
      </p>

      <div style={{ overflowX: 'auto', marginBottom: '1.5rem' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
          <thead>
            <tr style={{ background: '#f1f5f9' }}>
              <th style={{ padding: '0.6rem 0.8rem', textAlign: 'left', border: '1px solid #e2e8f0', fontWeight: '600' }}>Harmony</th>
              <th style={{ padding: '0.6rem 0.8rem', textAlign: 'left', border: '1px solid #e2e8f0', fontWeight: '600' }}>Hue Offsets</th>
              <th style={{ padding: '0.6rem 0.8rem', textAlign: 'left', border: '1px solid #e2e8f0', fontWeight: '600' }}>Description</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Complementary', '+180°', 'High contrast, opposite colors on wheel'],
              ['Triadic', '+120°, +240°', 'Three evenly spaced hues, vibrant'],
              ['Analogous', '±30°', 'Adjacent hues, harmonious and calm'],
              ['Split-Complementary', '+150°, +210°', 'Softer contrast than complementary'],
              ['Monochromatic', 'same hue', 'Vary only L (lightness) in HSL'],
            ].map(([harmony, offset, desc]) => (
              <tr key={String(harmony)} style={{ borderBottom: '1px solid #e2e8f0' }}>
                <td style={{ padding: '0.6rem 0.8rem', border: '1px solid #e2e8f0', fontWeight: '600' }}>{harmony}</td>
                <td style={{ padding: '0.6rem 0.8rem', border: '1px solid #e2e8f0', fontFamily: 'monospace' }}>{offset}</td>
                <td style={{ padding: '0.6rem 0.8rem', border: '1px solid #e2e8f0' }}>{desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`// Generate color harmonies from a base HSL color
function generateHarmonies(h, s, l) {
  const wrap = (deg) => ((deg % 360) + 360) % 360;
  return {
    base:            \`hsl(\${h} \${s}% \${l}%)\`,
    complementary:   \`hsl(\${wrap(h + 180)} \${s}% \${l}%)\`,
    triadic:        [\`hsl(\${wrap(h + 120)} \${s}% \${l}%)\`,
                     \`hsl(\${wrap(h + 240)} \${s}% \${l}%)\`],
    analogous:      [\`hsl(\${wrap(h - 30)} \${s}% \${l}%)\`,
                     \`hsl(\${wrap(h + 30)} \${s}% \${l}%)\`],
    splitComp:      [\`hsl(\${wrap(h + 150)} \${s}% \${l}%)\`,
                     \`hsl(\${wrap(h + 210)} \${s}% \${l}%)\`],
  };
}

// Generate a tint/shade scale (monochromatic)
function generateScale(h, s, steps = 9) {
  return Array.from({ length: steps }, (_, i) => {
    // Lightness from 95% (lightest) to 15% (darkest)
    const l = 95 - i * (80 / (steps - 1));
    return \`hsl(\${h} \${s}% \${Math.round(l)}%)\`;
  });
}

// Example: Blue (hue=217, saturation=91%)
const scale = generateScale(217, 91);
// ['hsl(217 91% 95%)', 'hsl(217 91% 85%)', ... , 'hsl(217 91% 15%)']

// In OKLCH — perceptually even scale
function oklchScale(l_start, l_end, c, h, steps) {
  return Array.from({ length: steps }, (_, i) => {
    const l = l_start + (l_end - l_start) * (i / (steps - 1));
    return \`oklch(\${l.toFixed(2)} \${c} \${h})\`;
  });
}
const blueScale = oklchScale(0.95, 0.25, 0.18, 264, 9);`}</code></pre>

      {/* Key Takeaways */}
      <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '1rem', marginTop: '2rem' }}>
        <strong style={{ display: 'block', fontSize: '1.05rem', color: '#1e293b', marginBottom: '0.75rem' }}>Key Takeaways</strong>
        <ul style={{ margin: 0, paddingLeft: '1.25rem', lineHeight: '1.8' }}>
          <li>HEX and RGB are mathematically equivalent — conversion is lossless and straightforward.</li>
          <li>HSL separates hue from brightness, making it ideal for design systems and dark mode theming.</li>
          <li>OKLCH is perceptually uniform: adjusting lightness does not shift the perceived hue — use it for generated palettes and gradients.</li>
          <li>CSS now natively supports <code>oklch()</code>, <code>lab()</code>, <code>lch()</code>, <code>color-mix()</code>, and <code>color(display-p3)</code> in modern browsers.</li>
          <li>WCAG AA requires 4.5:1 contrast for normal text; AAA requires 7:1. Use relative luminance to calculate.</li>
          <li>Use chroma.js for advanced color science (scales, LAB interpolation, contrast ratios); tinycolor2 for simple conversions and dark/light detection.</li>
          <li>Python's <code>colorsys</code> module provides HLS and HSV conversions; note it uses HLS order (Hue, Lightness, Saturation), not HSL.</li>
          <li>Design token systems separate primitive colors from semantic meaning, enabling consistent theming across light/dark modes and components.</li>
          <li>Always provide sRGB fallbacks when using wide-gamut (Display P3) or OKLCH colors.</li>
          <li>Generate harmonious palettes with hue rotation: complementary (+180°), triadic (+120°), analogous (±30°).</li>
        </ul>
      </div>
    </article>
  );
}
