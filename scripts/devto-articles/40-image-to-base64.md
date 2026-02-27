---
title: "Image to Base64: Complete Guide to Data URIs in HTML, CSS, and JavaScript"
tags: javascript, html, css, webdev
canonical_url: https://viadreams.cc/en/blog/image-to-base64-online-guide
published: true
---

Base64 image encoding eliminates separate HTTP requests but adds ~33% file size. Here's when and how to use it.

## What Is a Base64 Data URI?

```html
<!-- Traditional external image -->
<img src="/images/logo.png" alt="Logo">

<!-- Base64 data URI - no HTTP request needed -->
<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA..." alt="Logo">
```

Format: `data:[MIME type];base64,[base64-encoded-data]`

## Convert in JavaScript (Browser)

### FileReader API (for user-uploaded files)
```javascript
function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result); // "data:image/png;base64,..."
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

// Usage with file input
document.getElementById('file-input').addEventListener('change', async (e) => {
  const file = e.target.files[0];
  const dataUri = await fileToBase64(file);
  document.getElementById('preview').src = dataUri;
});
```

### Fetch API (for URLs)
```javascript
async function urlToBase64(url) {
  const response = await fetch(url);
  const blob = await response.blob();
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.readAsDataURL(blob);
  });
}
```

## Convert in Node.js

```javascript
const fs = require('fs');
const path = require('path');

// Synchronous
function imageToBase64(filePath) {
  const ext = path.extname(filePath).slice(1).toLowerCase();
  const mimeTypes = {
    png: 'image/png',
    jpg: 'image/jpeg', jpeg: 'image/jpeg',
    gif: 'image/gif',
    webp: 'image/webp',
    svg: 'image/svg+xml'
  };
  const mimeType = mimeTypes[ext] || 'image/png';
  const data = fs.readFileSync(filePath);
  return `data:${mimeType};base64,${data.toString('base64')}`;
}

// Async version
async function imageToBase64Async(filePath) {
  const ext = path.extname(filePath).slice(1);
  const data = await fs.promises.readFile(filePath);
  return `data:image/${ext};base64,${data.toString('base64')}`;
}
```

## Convert in Python

```python
import base64
from pathlib import Path

def image_to_base64(file_path: str) -> str:
    """Convert image file to base64 data URI."""
    path = Path(file_path)

    mime_types = {
        '.png': 'image/png',
        '.jpg': 'image/jpeg',
        '.jpeg': 'image/jpeg',
        '.gif': 'image/gif',
        '.webp': 'image/webp',
        '.svg': 'image/svg+xml',
    }

    mime_type = mime_types.get(path.suffix.lower(), 'image/png')

    with open(file_path, 'rb') as f:
        encoded = base64.b64encode(f.read()).decode('utf-8')

    return f"data:{mime_type};base64,{encoded}"

# Usage
uri = image_to_base64('logo.png')
print(uri[:50])  # data:image/png;base64,iVBORw0KGgoAAAANS...
```

## Use in CSS

```css
/* Background image */
.logo {
  background-image: url('data:image/png;base64,iVBORw0...');
}

/* Content pseudo-element */
.icon::before {
  content: url('data:image/svg+xml;base64,PHN2Zy...');
}

/* This increases CSS file size but eliminates an HTTP request */
```

## When to Use Base64

**Good use cases:**
- Small icons/logos (< 5KB)
- Email HTML (Gmail blocks external images by default)
- SVG icons in CSS
- Avoiding mixed content warnings (HTTP images on HTTPS pages)
- PWA offline assets

**Avoid for:**
- Large images (> 5KB) — the 33% size overhead is significant
- Images used on multiple pages — can't be cached separately
- Production hero images or backgrounds

## File Size Impact

Base64 adds approximately 33% to file size:
- 10KB PNG → ~13.3KB base64 string
- 100KB JPEG → ~133KB base64 string

The overhead comes from encoding 3 bytes into 4 ASCII characters.

## Security Considerations

SVG base64 can contain JavaScript — sanitize before embedding:
```javascript
import DOMPurify from 'dompurify';

function safeSvgToBase64(svgString) {
  const clean = DOMPurify.sanitize(svgString, {
    USE_PROFILES: { svg: true }
  });
  return `data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(clean)))}`;
}
```

## Quick Online Conversion

For one-off conversions, use **[DevToolBox's Image to Base64 converter](https://viadreams.cc/en/tools/base64-image-converter)** — drag and drop an image, get the data URI instantly with copy-to-clipboard.

---

*Convert images to Base64 data URIs instantly with [DevToolBox's free Image to Base64 tool](https://viadreams.cc/en/tools/base64-image-converter).*
