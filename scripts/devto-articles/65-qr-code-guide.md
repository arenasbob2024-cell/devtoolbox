---
title: "QR Code Generator: Create QR Codes Online — Complete Guide"
tags: webdev, javascript, python, tools
canonical_url: https://viadreams.cc/en/blog/qr-code-online-guide
published: true
---

Generate QR codes for URLs, WiFi, vCards, and more. Complete guide with JavaScript, Node.js, and Python.

## QR Code Structure

```
+--+--+--+--+--+--+--+
|FP|           |FP|
|  |  DATA     |  |
|  |           |  |
|  |     |TP|  |  |
|  |           |  |
|FP|           |  |
+--+--+--+--+--+--+--+
     |TP|

FP = Finder Pattern (7×7 squares)
TP = Timing Pattern (alternating B/W)
```

## Error Correction Levels

| Level | Recovery | Capacity | Use Case |
|-------|----------|----------|----------|
| L | 7% | Highest | Digital displays only |
| M | 15% | High | Most use cases (default) |
| Q | 25% | Medium | Industrial/print |
| H | 30% | Lowest | Logos embedded |

## JavaScript (Browser) — qrcode.js

```html
<!-- CDN -->
<script src="https://cdn.jsdelivr.net/npm/qrcode/build/qrcode.min.js"></script>
<canvas id="qr"></canvas>

<script>
QRCode.toCanvas(document.getElementById('qr'), 'https://viadreams.cc', {
  errorCorrectionLevel: 'M',
  width: 256,
  color: { dark: '#000000', light: '#ffffff' }
});
</script>
```

## Node.js — qrcode Package

```javascript
import QRCode from 'qrcode';

// Terminal output (for CLI tools)
QRCode.toString('https://viadreams.cc', { type: 'terminal' }, (err, str) => {
  console.log(str);
});

// Save as PNG
await QRCode.toFile('qr.png', 'https://viadreams.cc', {
  errorCorrectionLevel: 'M',
  width: 400,
});

// Data URL (for <img> tag)
const dataUrl = await QRCode.toDataURL('https://viadreams.cc', {
  errorCorrectionLevel: 'M',
  width: 300,
});

// SVG string (best for print)
const svg = await QRCode.toString('https://viadreams.cc', { type: 'svg' });
```

## Python — qrcode Library

```python
import qrcode

# Basic QR code
qr = qrcode.QRCode(
    version=None,  # Auto-determine size
    error_correction=qrcode.constants.ERROR_CORRECT_M,
    box_size=10,
    border=4,
)
qr.add_data('https://viadreams.cc')
qr.make(fit=True)

img = qr.make_image(fill_color='black', back_color='white')
img.save('qr.png')

# SVG output
import qrcode.image.svg
factory = qrcode.image.svg.SvgImage
img = qrcode.make('https://viadreams.cc', image_factory=factory)
img.save('qr.svg')
```

## WiFi QR Codes

```javascript
// WIFI: protocol format
// WIFI:T:<auth>;S:<ssid>;P:<password>;H:<hidden>;;
function wifiQR(ssid, password, auth = 'WPA') {
  // Escape special chars: ; " \ ,
  const escape = s => s.replace(/([;",\\])/g, '\\$1');
  return `WIFI:T:${auth};S:${escape(ssid)};P:${escape(password)};;`;
}

const wifiString = wifiQR('MyNetwork', 'P@ssw0rd!');
// "WIFI:T:WPA;S:MyNetwork;P:P@ssw0rd!;;"
await QRCode.toFile('wifi.png', wifiString, { errorCorrectionLevel: 'M' });
```

## Adding a Logo to Center

```javascript
import QRCode from 'qrcode';
import { createCanvas, loadImage } from 'canvas';

async function qrWithLogo(data, logoPath, outputPath) {
  // Use level H for logo overlay (30% error correction)
  const qrDataUrl = await QRCode.toDataURL(data, {
    errorCorrectionLevel: 'H',
    width: 400,
    margin: 2,
  });
  
  const canvas = createCanvas(400, 400);
  const ctx = canvas.getContext('2d');
  
  const qrImg = await loadImage(qrDataUrl);
  ctx.drawImage(qrImg, 0, 0);
  
  // Logo size: max 25-30% of QR width
  const logoSize = 80;
  const logoPos = (400 - logoSize) / 2;
  const logo = await loadImage(logoPath);
  
  // White background for logo
  ctx.fillStyle = 'white';
  ctx.fillRect(logoPos - 5, logoPos - 5, logoSize + 10, logoSize + 10);
  ctx.drawImage(logo, logoPos, logoPos, logoSize, logoSize);
  
  // Save PNG
  const fs = require('fs');
  fs.writeFileSync(outputPath, canvas.toBuffer('image/png'));
}
```

## SVG vs PNG

| Format | Best For | Scalable | File Size |
|--------|----------|----------|-----------|
| SVG | Print, web, logos | Yes | Small |
| PNG | Email, universal compat | No | Medium |
| Canvas/DataURL | Browser embedding | No | Variable |

## Quick Tool

Use **[DevToolBox QR Code Generator](https://viadreams.cc/en/tools/qr-code-generator)** — generate QR codes for URLs, WiFi, vCards instantly in your browser.

---

*Generate free QR codes online with [DevToolBox's QR Code Generator](https://viadreams.cc/en/tools/qr-code-generator).*
