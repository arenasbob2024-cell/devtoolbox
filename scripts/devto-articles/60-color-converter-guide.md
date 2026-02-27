---
title: "Color Converter: Convert HEX, RGB, and HSL Online — Complete Guide"
tags: css, color, design, webdev
canonical_url: https://viadreams.cc/en/blog/color-converter-online-guide
published: true
---

Convert between HEX, RGB, HSL, and modern CSS color formats. Complete guide for developers and designers.

## Color Formats

| Format | Example | CSS | Human Readable |
|--------|---------|-----|----------------|
| HEX | `#ff6b6b` | ✓ | Medium |
| RGB | `rgb(255,107,107)` | ✓ | Medium |
| HSL | `hsl(0,100%,71%)` | ✓ | High |
| OKLCH | `oklch(70% 0.2 27)` | Modern | High |

## HEX ↔ RGB Conversion

```javascript
// HEX to RGB
function hexToRgb(hex) {
  const n = parseInt(hex.replace('#', ''), 16);
  return {
    r: (n >> 16) & 255,
    g: (n >> 8) & 255,
    b: n & 255
  };
}
hexToRgb('#ff6b6b'); // {r: 255, g: 107, b: 107}

// RGB to HEX
function rgbToHex(r, g, b) {
  return '#' + [r, g, b]
    .map(x => x.toString(16).padStart(2, '0'))
    .join('');
}
rgbToHex(255, 107, 107); // "#ff6b6b"
```

## RGB ↔ HSL Conversion

```javascript
function rgbToHsl(r, g, b) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;

  if (max === min) {
    h = s = 0;
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      case b: h = ((r - g) / d + 4) / 6; break;
    }
  }
  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
}

rgbToHsl(255, 107, 107); // {h: 0, s: 100, l: 71}
```

## CSS Color Functions

```css
/* All equivalent: */
color: #ff6b6b;
color: rgb(255, 107, 107);
color: hsl(0, 100%, 71%);

/* Modern CSS */
color: oklch(70% 0.2 27);
color: color-mix(in oklch, red 50%, blue);
color: color(display-p3 1 0.42 0.42);  /* Wide gamut */
```

## JavaScript with chroma.js

```javascript
import chroma from 'chroma-js';

chroma('#ff6b6b').rgb();        // [255, 107, 107]
chroma('#ff6b6b').hsl();        // [0, 1, 0.71]
chroma('#ff6b6b').oklch();      // [0.70, 0.20, 27]
chroma('#ff6b6b').luminance();  // 0.215

// Generate palette
chroma.scale(['#ff6b6b', '#4ecdc4']).colors(5);

// Darken/lighten
chroma('#ff6b6b').darken(1).hex();  // "#c44"
chroma('#ff6b6b').lighten(1).hex(); // "#ff9a9a"

// Contrast ratio
chroma.contrast('#ff6b6b', 'white'); // 2.95
```

## CSS Theming with HSL

```css
:root {
  --hue: 220;
  --color-primary: hsl(var(--hue), 90%, 56%);
  --color-primary-light: hsl(var(--hue), 90%, 70%);
  --color-primary-dark: hsl(var(--hue), 90%, 40%);
}

@media (prefers-color-scheme: dark) {
  :root {
    --color-primary: hsl(var(--hue), 80%, 65%);
  }
}
```

## Accessibility Contrast Ratios

| WCAG Level | Normal Text | Large Text |
|------------|-------------|------------|
| AA | 4.5:1 | 3:1 |
| AAA | 7:1 | 4.5:1 |

```javascript
// Calculate relative luminance
function luminance(r, g, b) {
  const [rs, gs, bs] = [r, g, b].map(c => {
    c /= 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

function contrastRatio(rgb1, rgb2) {
  const l1 = luminance(...rgb1);
  const l2 = luminance(...rgb2);
  return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
}
```

## Quick Tool

For instant color conversion, use **[DevToolBox Color Converter](https://viadreams.cc/en/tools/color-converter)** — paste any color format and see all conversions instantly.

---

*Convert colors between HEX, RGB, HSL, and more with [DevToolBox's free Color Converter](https://viadreams.cc/en/tools/color-converter).*
