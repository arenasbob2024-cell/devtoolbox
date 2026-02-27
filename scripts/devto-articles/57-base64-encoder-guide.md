---
title: "Base64 Encoder/Decoder: Encode and Decode Online — Complete Guide"
tags: base64, javascript, encoding, devtools
canonical_url: https://viadreams.cc/en/blog/base64-encoder-online-guide
published: true
---

Encode and decode Base64 in the browser, Node.js, Python, and Go. Complete guide.

## JavaScript — Browser

```javascript
// Standard Base64
btoa("Hello, World!");           // "SGVsbG8sIFdvcmxkIQ=="
atob("SGVsbG8sIFdvcmxkIQ==");   // "Hello, World!"

// ⚠️ btoa() fails on Unicode — use this pattern instead:
function toBase64(str) {
  return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g,
    (_, p1) => String.fromCharCode(parseInt(p1, 16))));
}

function fromBase64(b64) {
  return decodeURIComponent(
    atob(b64).split('').map(c =>
      '%' + c.charCodeAt(0).toString(16).padStart(2, '0')).join(''));
}
```

## JavaScript — Node.js

```javascript
// Encode string
Buffer.from("Hello World").toString('base64');         // "SGVsbG8gV29ybGQ="
Buffer.from("SGVsbG8gV29ybGQ=", 'base64').toString(); // "Hello World"

// URL-safe Base64 (no +/= chars)
Buffer.from("Hello World").toString('base64url');      // "SGVsbG8gV29ybGQ"

// Encode a file
const fs = require('fs');
const data = fs.readFileSync('image.png');
const b64 = data.toString('base64');
```

## Base64URL

Base64URL replaces `+` → `-`, `/` → `_`, and removes `=` padding. Used in JWTs, URLs, and cookies.

```javascript
// Convert standard → URL-safe
const toB64URL = (b64) => b64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
const fromB64URL = (b64u) => b64u.replace(/-/g, '+').replace(/_/g, '/') + '=='.slice((b64u.length * 3) % 4);
```

## Python

```python
import base64

# Encode / decode
encoded = base64.b64encode(b"Hello World")   # b"SGVsbG8gV29ybGQ="
decoded = base64.b64decode(encoded)          # b"Hello World"

# URL-safe (no +/)
url_safe = base64.urlsafe_b64encode(b"Hello World")   # b"SGVsbG8gV29ybGQ="
base64.urlsafe_b64decode(url_safe)

# Encode file
with open("image.png", "rb") as f:
    b64 = base64.b64encode(f.read()).decode()
```

## Image to Base64 (Browser)

```javascript
// FileReader API
const reader = new FileReader();
reader.onload = (e) => {
  const dataUrl = e.target.result;
  // "data:image/png;base64,iVBORw0KGgo..."
  document.getElementById('preview').src = dataUrl;
};
reader.readAsDataURL(file);

// ⚠️ Inline base64 is 33% larger than binary — no browser caching
// Use for small icons only, not large images
```

## Go

```go
import "encoding/base64"

// Standard encoding
encoded := base64.StdEncoding.EncodeToString([]byte("Hello World"))
decoded, _ := base64.StdEncoding.DecodeString(encoded)

// URL-safe without padding (for JWTs)
encoded := base64.RawURLEncoding.EncodeToString(data)
```

## Base64 in HTTP

```http
# Basic Authentication
Authorization: Basic dXNlcjpwYXNzd29yZA==
# = base64("user:password")

# Data URI in HTML
<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...">

# Data URI in CSS
background-image: url('data:image/svg+xml;base64,PHN2ZyB4...');
```

## Common Mistakes

```javascript
// ❌ btoa() on emoji/Unicode fails
btoa("Hello 🌍");  // InvalidCharacterError!

// ✅ Fix: encode first
btoa(unescape(encodeURIComponent("Hello 🌍")));

// ❌ Base64 ≠ encryption — it's just encoding
// Anyone can decode base64 instantly — don't use for secrets

// ❌ Forgetting URL-safe variant in URLs
"?token=" + btoa(data);  // breaks if data contains + or /
"?token=" + Buffer.from(data).toString('base64url');  // ✅
```

## Quick Tool

For instant Base64 encoding/decoding, use **[DevToolBox Base64 Encoder](https://viadreams.cc/en/tools/base64-encode-online)** — paste text or upload files, get Base64 instantly.

---

*Encode and decode Base64 instantly with [DevToolBox's free Base64 tool](https://viadreams.cc/en/tools/base64-encode-online).*
