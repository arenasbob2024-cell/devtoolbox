---
title: "20 Regex Patterns Every Developer Needs: Copy-Paste Ready Examples"
published: true
description: "Stop writing regex from scratch. Here are 20 battle-tested patterns for email, URL, phone, password, IP address, and more."
tags: javascript, python, regex, webdev, productivity, tutorial
canonical_url: https://viadreams.cc/en/blog/regex-patterns-copy-paste-ready
date: 2026/03/01
---

Stop writing regex patterns from scratch. Here are **20 battle-tested patterns** that cover the most common validation and extraction needs. Each pattern includes an explanation and example matches.

---

## Validation Patterns

### 1. Email Address
```regex
^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$
```
- ✅ `user@example.com`, `john.doe+tag@company.co.uk`
- ❌ `user@`, `@example.com`, `user@.com`

### 2. URL (HTTP/HTTPS)
```regex
^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)$
```
- ✅ `https://example.com`, `http://www.site.co.uk/path?q=1`

### 3. Phone Number (International E.164)
```regex
^\+[1-9]\d{1,14}$
```
- ✅ `+14155552671`, `+442071234567`

### 4. US Phone Number
```regex
^(\+1)?[\s.-]?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$
```
- ✅ `(415) 555-2671`, `415-555-2671`, `+1 415.555.2671`

### 5. Strong Password
```regex
^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$
```
Requires: 8+ characters, uppercase, lowercase, digit, and special character.
- ✅ `MyP@ss1word`
- ❌ `password`, `12345678`

### 6. IPv4 Address
```regex
^((25[0-5]|(2[0-4]|1\d|[1-9]|)\d)\.?\b){4}$
```
- ✅ `192.168.1.1`, `10.0.0.255`
- ❌ `256.1.1.1`, `192.168.1`

### 7. IPv6 Address (Simplified)
```regex
^([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$
```
- ✅ `2001:0db8:85a3:0000:0000:8a2e:0370:7334`

### 8. Date (YYYY-MM-DD)
```regex
^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$
```
- ✅ `2026-01-15`, `2025-12-31`
- ❌ `2026-13-01`, `2026-00-15`

---

## Extraction Patterns

### 9. Extract All Emails from Text
```regex
[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}
```
Use with global flag (`g`) to find all email addresses in a block of text.

### 10. Extract All URLs from Text
```regex
https?:\/\/[^\s<>"']+
```
A simpler, more forgiving URL pattern for extraction (not strict validation).

### 11. Extract HTML Tags
```regex
<([a-zA-Z][a-zA-Z0-9]*)\b[^>]*>(.*?)<\/\1>
```
Captures tag name and content. Use `\1` backreference for matching close tags.

> ⚠️ **Warning**: For complex HTML, use a proper parser like DOMParser or cheerio.

### 12. Extract Numbers from String
```regex
-?\d+\.?\d*
```
Matches integers and decimals, positive and negative: `42`, `-3.14`, `0.5`

### 13. Extract Hashtags
```regex
#[a-zA-Z0-9_]+
```
- ✅ `#javascript`, `#dev_tools`, `#React18`

---

## Format Patterns

### 14. Credit Card Number (Basic)
```regex
^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|3[47][0-9]{13}|6(?:011|5[0-9]{2})[0-9]{12})$
```
Matches Visa, Mastercard, Amex, Discover.

> ⚠️ **Warning**: In production, always use a payment processor for validation—never rely solely on regex.

### 15. Hex Color Code
```regex
^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6}|[0-9A-Fa-f]{8})$
```
- ✅ `#FFF`, `#FF5733`, `#FF573380`

### 16. Semantic Version (SemVer)
```regex
^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?$
```
- ✅ `1.0.0`, `2.1.3-beta.1`, `1.0.0+build.123`

### 17. UUID (Any Version)
```regex
^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$
```
- ✅ `f47ac10b-58cc-4372-a567-0e02b2c3d479`

---

## Text Processing Patterns

### 18. Trim Whitespace (Leading + Trailing)
```regex
^\s+|\s+$
```
Use with replace:
```javascript
text.replace(/^\s+|\s+$/g, '')
```

### 19. Multiple Spaces to Single Space
```regex
\s{2,}
```
Replace with single space:
```javascript
text.replace(/\s{2,}/g, ' ')
```

### 20. Markdown Bold Text
```regex
\*\*(.+?)\*\*
```
Captures text between `**`, group 1 is the bold content.

---

## Using These Patterns in Code

```javascript
// JavaScript
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
emailRegex.test('user@example.com'); // true
```

```python
# Python
import re
pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
re.match(pattern, 'user@example.com')  # Match object
```

```java
// Java
Pattern pattern = Pattern.compile("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$");
pattern.matcher("user@example.com").matches(); // true
```

---

## FAQ

**Q: Are these patterns compatible with all programming languages?**

These patterns use standard regex syntax compatible with JavaScript, Python, Java, C#, Go, PHP, and Ruby. Minor syntax differences may exist, but the core patterns work across all major languages.

**Q: Should I use regex for email validation in production?**

For basic format checking, these patterns work well. However, the only way to truly validate an email is to send a confirmation email. Use regex for client-side UX validation, but never rely on it as the sole validation method.

**Q: What's the difference between greedy and lazy quantifiers?**

Greedy quantifiers (`*`, `+`, `?`) match as much text as possible. Lazy quantifiers (`*?`, `+?`, `??`) match as little as possible. For example, given `<b>bold</b>`, greedy `<.*>` matches the entire string, while lazy `<.*?>` matches only `<b>`.

---

🔗 **Test all these patterns live**: [DevToolBox Regex Tester](https://viadreams.cc/en/tools/regex-tester)

💡 Found this helpful? Check out [DevToolBox](https://viadreams.cc) for 300+ free developer tools including regex tester, JSON formatter, base64 encoder, and more.