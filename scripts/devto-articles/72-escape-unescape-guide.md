---
title: "HTML Escape / Unescape: Encode Special Characters — Complete Guide"
tags: javascript, webdev, security, html
canonical_url: https://viadreams.cc/en/blog/escape-unescape-online-guide
published: true
---

Every web developer eventually runs into a broken page because an ampersand wasn't escaped, or worse — an XSS vulnerability because user input was rendered raw. This guide covers the escaping techniques you actually need.

## HTML Entity Escaping

The five characters that must always be escaped in HTML content:

| Character | Entity    | Reason                         |
|-----------|-----------|--------------------------------|
| `&`       | `&amp;`   | Starts all entities            |
| `<`       | `&lt;`    | Opens tags                     |
| `>`       | `&gt;`    | Closes tags                    |
| `"`       | `&quot;`  | Breaks attribute values        |
| `'`       | `&#39;`   | Breaks single-quoted attributes|

### JavaScript

```js
function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function unescapeHtml(str) {
  const txt = document.createElement('textarea');
  txt.innerHTML = str;
  return txt.value;
}

escapeHtml('<script>alert("xss")</script>');
// → '&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;'
```

### Python

```python
import html

html.escape('<b>Hello & "World"</b>')
# → '&lt;b&gt;Hello &amp; &quot;World&quot;&lt;/b&gt;'

html.unescape('&lt;b&gt;Hello&lt;/b&gt;')
# → '<b>Hello</b>'
```

### Go / Java

```go
html.EscapeString(`<script>alert("xss")</script>`)
// → "&lt;script&gt;alert(&#34;xss&#34;)&lt;/script&gt;"
```

```java
// Apache Commons Text
StringEscapeUtils.escapeHtml4("<b>Hello & \"World\"</b>");
// → "&lt;b&gt;Hello &amp; &quot;World&quot;&lt;/b&gt;"
```

---

## XSS Prevention via Escaping

XSS happens when attacker-controlled strings reach the DOM unescaped. Escape at the point of rendering, not on the way in.

```js
// UNSAFE
element.innerHTML = userInput;

// SAFE — textContent escapes automatically
element.textContent = userInput;

// SAFE — escape before injecting HTML
element.innerHTML = escapeHtml(userInput);
```

Stripping characters on input destroys data; escaping on output preserves it safely.

---

## URL Encoding vs HTML Encoding

These solve different problems — do not confuse them.

| Function               | Use case                             | `a=1&b=2` result  |
|------------------------|--------------------------------------|-------------------|
| `encodeURIComponent()` | Encode a single URL query value      | `a%3D1%26b%3D2`   |
| `encodeURI()`          | Encode a full URL, preserve structure| spaces → `%20`    |
| HTML entity            | Embed a URL inside an HTML attribute | `&` → `&amp;`     |

```js
const query = 'hello world & more';
const url = `https://example.com/search?q=${encodeURIComponent(query)}`;
// Embed in HTML attribute — escape again:
const link = `<a href="${escapeHtml(url)}">Search</a>`;
```

```python
from urllib.parse import quote, urlencode

quote('hello world & more')          # → 'hello%20world%20%26%20more'
urlencode({'q': 'hello', 'lang': 'en'})  # → 'q=hello&lang=en'
```

---

## JSON String Escaping

`JSON.stringify` and `json.dumps` handle escaping automatically — use them, never build JSON by hand.

```js
JSON.stringify({ msg: 'He said "hi"\nNew line' })
// → '{"msg":"He said \\"hi\\"\\nNew line"}'

// Embedding JSON inside <script> blocks — escape forward slashes:
const safe = JSON.stringify(data).replace(/\//g, '\\/');
```

```python
import json
json.dumps({"msg": 'He said "hi"\nNew line'})
# → '{"msg": "He said \\"hi\\"\\nNew line"}'
```

---

## SQL Injection Prevention

Never escape SQL manually. Use parameterized queries — the driver handles all escaping correctly.

```js
// Node.js + pg
const { rows } = await pool.query(
  'SELECT * FROM users WHERE email = $1',
  [userEmail]
);
```

```python
# Python + sqlite3
cursor.execute('SELECT * FROM users WHERE email = ?', (user_email,))
```

---

## Shell Escaping

Pass arguments as arrays, never build shell strings with user input.

```js
// Node.js — array form avoids shell interpolation
const { execFile } = require('child_process');
execFile('convert', [inputPath, '-resize', '100x100', outputPath], cb);
```

```python
import subprocess
# Safe: list form, shell=False (default)
subprocess.run(['convert', input_path, '-resize', '100x100', output_path])

# If you must build a shell string:
import shlex
shlex.quote(user_input)   # wraps in single quotes, escapes internal quotes
```

---

## Regex Escaping

Escape user-supplied strings before using them in a `RegExp`.

```js
function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
const re = new RegExp(escapeRegex('price (USD)'), 'i');
```

```python
import re
pattern = re.compile(re.escape('price (USD)'), re.IGNORECASE)
```

---

## Quick Reference

| Context   | Safe function                         | Never use                   |
|-----------|---------------------------------------|-----------------------------|
| HTML      | `escapeHtml()` / `html.escape()`      | `innerHTML = userInput`     |
| URL param | `encodeURIComponent()`                | Raw string concat in URL    |
| SQL       | Parameterized queries                 | String interpolation        |
| Shell     | `execFile([...args])`                 | `shell=True` + concat       |
| Regex     | `re.escape()` / `escapeRegex()`       | Raw user string in `RegExp` |
| JSON      | `JSON.stringify()` / `json.dumps()`   | Manual quote building       |

---

## Quick Tool

Use **[DevToolBox Escape/Unescape](https://viadreams.cc/en/tools/escape-unescape)** — encode/decode HTML entities, URL components, and more instantly.

---

*Encode safely with [DevToolBox's free Escape/Unescape tool](https://viadreams.cc/en/tools/escape-unescape).*
