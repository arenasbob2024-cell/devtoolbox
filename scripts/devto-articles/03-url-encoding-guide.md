---
title: "URL Encoding Explained: What %20, %3A, and %2F Actually Mean"
published: false
description: "Why do URLs have those weird percent signs? Here's everything you need to know about URL encoding -- common characters, language-specific functions, and the mistakes that break your API calls."
tags: webdev, javascript, beginners, tutorial
canonical_url: https://viadreams.cc/en/blog/url-encoding-percent-encoding-guide
cover_image: https://viadreams.cc/og-image.png
---

You've definitely seen URLs like this:

```
https://example.com/search?q=hello%20world&lang=en%2Cfr
```

Those `%20` and `%2C` tokens aren't random. They're **percent-encoded** characters -- and understanding them will save you from some truly annoying debugging sessions.

## How Percent Encoding Works

URLs can only contain a limited set of ASCII characters. Anything outside that set gets converted to its UTF-8 byte value, prefixed with `%`.

The process:
1. Take the character
2. Convert to UTF-8 bytes
3. Each byte becomes `%XX` (hex value)

**Space** (ASCII 32 = 0x20) becomes `%20`
**Colon** (ASCII 58 = 0x3A) becomes `%3A`
**Slash** (ASCII 47 = 0x2F) becomes `%2F`

For multi-byte characters like `cafe` with an accent on the `e`, each UTF-8 byte gets its own `%XX`.

## Quick Reference Table

| Character | Encoded | Purpose |
|-----------|---------|---------|
| (space) | `%20` | Most common encoding |
| `!` | `%21` | Exclamation |
| `#` | `%23` | Fragment identifier |
| `$` | `%24` | Dollar sign |
| `%` | `%25` | The escape character itself |
| `&` | `%26` | Query parameter separator |
| `+` | `%2B` | Plus sign |
| `/` | `%2F` | Path separator |
| `:` | `%3A` | Port separator |
| `=` | `%3D` | Key-value separator |
| `?` | `%3F` | Query string start |
| `@` | `%40` | Email / auth separator |

## The Big JavaScript Gotcha: encodeURI vs encodeURIComponent

JavaScript gives you two functions, and using the wrong one is a classic source of bugs.

**`encodeURI()`** -- Encodes a **full URL**. Preserves structural characters like `://`, `/`, `?`, `=`, `&`.

```javascript
encodeURI("https://example.com/path?q=hello world")
// "https://example.com/path?q=hello%20world"
// Structure preserved, only the space is encoded
```

**`encodeURIComponent()`** -- Encodes a **single component** (like a query value). Encodes everything including `/`, `?`, `&`, `=`.

```javascript
encodeURIComponent("Tom & Jerry")
// "Tom%20%26%20Jerry"
// The & is encoded so it won't be read as a parameter separator
```

**Rule of thumb:** Use `encodeURIComponent()` for query parameter values. Use `encodeURI()` only when encoding an entire URL.

## URL Encoding in Every Language

```javascript
// JavaScript
encodeURIComponent("hello world")  // "hello%20world"
decodeURIComponent("hello%20world") // "hello world"
```

```python
# Python
from urllib.parse import quote, unquote
quote("hello world")    # "hello%20world"
unquote("hello%20world") # "hello world"
```

```go
// Go
import "net/url"
url.QueryEscape("hello world")    // "hello+world"
url.PathEscape("hello world")     // "hello%20world"
```

```php
// PHP
urlencode("hello world");    // "hello+world"
rawurlencode("hello world"); // "hello%20world"
```

## 4 Mistakes That Will Waste Your Time

### 1. Double Encoding

You encode an already-encoded string. `%20` becomes `%2520`. The server decodes it to the literal string `%20` instead of a space.

```javascript
// BAD
encodeURIComponent(encodeURIComponent("hello world"))
// "hello%2520world" -- broken!

// GOOD -- encode exactly once
encodeURIComponent("hello world")
// "hello%20world"
```

### 2. Encoding the Entire URL

Passing a full URL to `encodeURIComponent()` encodes the `://`, `/`, `?`, and `=`, completely breaking the URL structure.

```javascript
// BAD
encodeURIComponent("https://api.example.com/search?q=test")
// "https%3A%2F%2Fapi.example.com%2Fsearch%3Fq%3Dtest" -- broken!

// GOOD -- only encode the parameter value
"https://api.example.com/search?q=" + encodeURIComponent("test")
```

### 3. Space: + vs %20

HTML forms encode spaces as `+`. RFC 3986 uses `%20`. Most servers handle both, but strict APIs may only accept one.

When building API requests, prefer `%20`.

### 4. Forgetting to Encode User Input

If a user searches for `Tom & Jerry`, the unencoded `&` splits it into two parameters. This is both a bug and a security risk.

## Best Practices

- **Always encode user input** before inserting into query strings
- **Use library functions**, not manual string replacement
- **Test with nasty inputs**: `& = ? / # + %` and non-ASCII characters
- **Use URL-safe Base64** when embedding binary data (standard Base64 uses `+` and `/` which conflict with URL syntax)

---

*Originally published on [DevToolBox](https://viadreams.cc/en/blog/url-encoding-percent-encoding-guide). Try our free [URL Encoder/Decoder](https://viadreams.cc/en/tools/url-encoder) -- encode and decode any string instantly, 100% client-side, no data leaves your browser.*
