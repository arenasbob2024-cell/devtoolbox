---
title: "URL Encoder/Decoder: Encode and Decode URLs Online — Complete Guide"
tags: url, javascript, encoding, webdev
canonical_url: https://viadreams.cc/en/blog/url-encoder-online-guide
published: true
---

Encode and decode URLs correctly. Complete guide for JavaScript, Python, and Go.

## encodeURI vs encodeURIComponent

```javascript
const url = "https://example.com?q=hello world&name=Alice & Bob";

// encodeURI — keeps :/?=&#, encodes spaces and special chars
encodeURI(url);
// "https://example.com?q=hello%20world&name=Alice%20&%20Bob"

// encodeURIComponent — encodes everything except unreserved chars
encodeURIComponent("hello world & more");
// "hello%20world%20%26%20more"

// Rule of thumb:
// - Full URL → encodeURI()
// - Single query param value → encodeURIComponent()
```

## URLSearchParams — Best Practice

```javascript
// Build query string safely
const params = new URLSearchParams({
  q: 'hello world',
  lang: 'zh',
  page: '1',
  tags: 'javascript,web'
});
params.toString();
// "q=hello+world&lang=zh&page=1&tags=javascript%2Cweb"

// Append multiple values for same key
params.append('filter', 'active');
params.append('filter', 'verified');
// ?filter=active&filter=verified

// Parse URL query string
const search = new URLSearchParams('?q=hello%20world&page=2');
search.get('q');    // "hello world" (auto-decoded)
search.get('page'); // "2"
```

## URL Object

```javascript
const url = new URL('https://example.com/path?q=hello world');
// URL constructor auto-encodes the space

console.log(url.href);     // "https://example.com/path?q=hello%20world"
console.log(url.pathname); // "/path"
console.log(url.search);   // "?q=hello%20world"
console.log(url.searchParams.get('q')); // "hello world" (decoded!)

// Modify and get encoded result
url.searchParams.set('lang', 'zh-TW');
url.toString(); // "https://example.com/path?q=hello%20world&lang=zh-TW"
```

## Python — urllib.parse

```python
from urllib.parse import quote, unquote, urlencode, urlparse, parse_qs

# Encode a path component (keeps /)
quote("/path/to file")       # "/path/to%20file"

# Encode a query value (encodes / too)
quote("hello world & more")  # "hello%20world%20%26%20more"

# Space as + (form encoding)
from urllib.parse import quote_plus
quote_plus("hello world")    # "hello+world"

# Build query string
urlencode({'q': 'hello world', 'page': 1})  # "q=hello+world&page=1"

# Parse URL
parsed = urlparse("https://example.com/path?q=hello+world")
print(parsed.query)  # "q=hello+world"

# Parse query params
parse_qs("q=hello+world&page=1")  # {'q': ['hello world'], 'page': ['1']}
```

## Go — net/url

```go
import "net/url"

// Encode path segment
url.PathEscape("hello world/path")    // "hello%20world%2Fpath"

// Encode query value (/ stays, space → +)
url.QueryEscape("hello world & more") // "hello+world+%26+more"

// Build query string
params := url.Values{}
params.Set("q", "hello world")
params.Set("lang", "en")
params.Encode() // "lang=en&q=hello+world" (sorted alphabetically)

// Parse URL
u, _ := url.Parse("https://example.com?q=hello+world")
q := u.Query()
q.Get("q") // "hello world" (decoded)
```

## Percent Encoding Reference

```
Space → %20 (or + in forms)
!     → %21
"     → %22
#     → %23
$     → %24
%     → %25
&     → %26
'     → %27
(     → %28
)     → %29
*     → %2A
+     → %2B
,     → %2C
/     → %2F
:     → %3A
;     → %3B
=     → %3D
?     → %3F
@     → %40
[     → %5B
]     → %5D
```

## Common Mistakes

```javascript
// ❌ Double-encoding
const param = "%20already encoded%20";
encodeURIComponent(param);  // "%2520already%20encoded%2520" — WRONG!

// ✅ Only encode once
encodeURIComponent("hello world");  // "hello%20world"

// ❌ Manual string concatenation
const url = "https://api.example.com/search?q=" + userInput;  // XSS risk!

// ✅ Always use URLSearchParams
const url = new URL("https://api.example.com/search");
url.searchParams.set('q', userInput);  // Safe
```

## Quick Tool

Use **[DevToolBox URL Encoder](https://viadreams.cc/en/tools/url-encoder)** — encode or decode URLs and query strings instantly online.

---

*Encode and decode URLs instantly with [DevToolBox's free URL Encoder](https://viadreams.cc/en/tools/url-encoder).*
