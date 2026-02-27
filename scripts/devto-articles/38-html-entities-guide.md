---
title: "HTML Entities: The Complete Guide to Special Characters and XSS Prevention"
tags: html, security, webdev, javascript
canonical_url: https://viadreams.cc/en/blog/html-entity-online-guide
published: true
---

HTML entities are the backbone of safe web content rendering. Getting them wrong leads to broken layouts, encoding issues, and XSS vulnerabilities.

## The 5 Characters You Must Always Encode

```html
<!-- These 5 MUST be encoded in HTML content -->
& → &amp;   <!-- Would be parsed as entity start -->
< → &lt;    <!-- Would start a tag -->
> → &gt;    <!-- Would end a tag -->
" → &quot;  <!-- In quoted attributes -->
' → &#39;   <!-- In single-quoted attributes -->
```

## Named vs Numeric Entities

Three equivalent ways to write the same character:

```html
<!-- Named entity (most readable) -->
&copy; → ©

<!-- Decimal numeric entity -->
&#169; → ©

<!-- Hex numeric entity -->
&#xA9; → ©
```

## Essential Entities Reference

**Typography:**
| Character | Entity | Code |
|-----------|--------|------|
| © | `&copy;` | Copyright |
| ® | `&reg;` | Registered |
| ™ | `&trade;` | Trademark |
| — | `&mdash;` | Em dash |
| – | `&ndash;` | En dash |
| … | `&hellip;` | Ellipsis |
| " | `&ldquo;` | Left double quote |
| " | `&rdquo;` | Right double quote |
|   | `&nbsp;` | Non-breaking space |

**Symbols:**
| Character | Entity |
|-----------|--------|
| × | `&times;` |
| ÷ | `&divide;` |
| ≤ | `&le;` |
| ≥ | `&ge;` |
| ≠ | `&ne;` |
| ∞ | `&infin;` |
| € | `&euro;` |
| £ | `&pound;` |

## JavaScript Encoding

```javascript
// Safe DOM API (auto-encodes) - PREFERRED
element.textContent = userInput;  // &amp; &lt; etc. handled automatically

// Manual encode (for inserting into HTML strings)
function encodeHTML(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// Manual decode
function decodeHTML(html) {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  return doc.documentElement.textContent;
}

// Library options
// npm install he
import he from 'he';
he.encode('<script>alert("xss")</script>');
// → '&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;'
```

## Python Encoding

```python
import html

# Encode
safe = html.escape('<script>alert("xss")</script>')
# → '&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;'

# Also encode single quotes (for use in attributes)
safe_attr = html.escape(user_input, quote=True)

# Decode
original = html.unescape('&lt;b&gt;Hello&lt;/b&gt;')
# → '<b>Hello</b>'
```

## PHP Encoding

```php
// htmlspecialchars: encodes &, <, >, ", '
$safe = htmlspecialchars($user_input, ENT_QUOTES | ENT_HTML5, 'UTF-8');

// htmlentities: encodes ALL applicable characters (accents, symbols, etc.)
$very_safe = htmlentities($input, ENT_QUOTES, 'UTF-8');

// Decode
$original = html_entity_decode($encoded, ENT_QUOTES | ENT_HTML5, 'UTF-8');
```

## React/JSX — Auto-Escaping

React automatically escapes content in JSX:

```jsx
// This is safe — React encodes user_input automatically
<div>{user_input}</div>  // → &lt;script&gt; in rendered HTML

// Avoid dangerouslySetInnerHTML unless you sanitize first
import DOMPurify from 'dompurify';
<div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(html_content) }} />

// Entities in JSX source (not in variables):
<span>Copyright &copy; 2026</span>
<span>Arrows: &larr; &rarr; &uarr; &darr;</span>
```

## XSS Prevention Context Table

Context encoding rules:

| Location | Required encoding |
|----------|-------------------|
| HTML content | `&amp; &lt; &gt;` |
| HTML attribute | `&amp; &lt; &gt; &quot; &#39;` |
| JavaScript string | `\x26 \x3c \x3e` or JSON.stringify |
| CSS value | `\00XX` hex encoding |
| URL parameter | `encodeURIComponent()` |

## Common Mistakes

1. **& in URLs** — `href="/search?a=1&b=2"` → `href="/search?a=1&amp;b=2"`
2. **Double encoding** — encoding already-encoded text
3. **innerHTML without sanitization** — use DOMPurify
4. **&nbsp; abuse** — for spacing, use CSS margin/padding instead

## Online Encoder

For quick entity conversion, use **[DevToolBox's HTML entity encoder](https://viadreams.cc/en/tools/html-entity)** — supports encode/decode, named entities, numeric decimal, and hex formats.

---

*Encode and decode HTML entities instantly with [DevToolBox's free HTML entity tool](https://viadreams.cc/en/tools/html-entity).*
