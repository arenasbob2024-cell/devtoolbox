---
title: "Regex Tester: Test and Debug Regular Expressions Online — Complete Guide"
tags: regex, javascript, python, devtools
canonical_url: https://viadreams.cc/en/blog/regex-tester-online-guide
published: true
---

Test and debug regular expressions online. Complete guide for JavaScript, Python, Go, and more.

## Common Regex Patterns

```javascript
// Email
/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

// URL
/(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?/

// IPv4
/^(\d{1,3}\.){3}\d{1,3}$/

// ISO Date (YYYY-MM-DD)
/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/

// Hex color
/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/

// Strong password (8+ chars, upper, lower, digit, special)
/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

// URL-friendly slug
/^[a-z0-9]+(?:-[a-z0-9]+)*$/
```

## JavaScript Regex API

```javascript
const pattern = /(\d{4})-(\d{2})-(\d{2})/g;
const text = "Events on 2024-01-15 and 2024-03-22";

// test — boolean
pattern.test("2024-01-15");  // true

// match — array of matches
"2024-01-15".match(/\d{4}/);     // ["2024"]
"2024-01-15".match(/\d+/g);      // ["2024", "01", "15"]

// matchAll — iterator (requires /g flag)
for (const m of text.matchAll(pattern)) {
  console.log(m[0], m[1], m[2], m[3]);
}

// replace
"hello world".replace(/\b\w/g, c => c.toUpperCase());  // "Hello World"

// split
"one,two,,three".split(/,+/);  // ["one", "two", "three"]
```

## Named Capture Groups

```javascript
// Named groups: (?<name>...)
const dateRe = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/;
const { groups } = "2024-01-15".match(dateRe);
console.log(groups.year, groups.month, groups.day);  // 2024 01 15

// In replace
"2024-01-15".replace(
  /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/,
  "$<day>/$<month>/$<year>"
);  // "15/01/2024"
```

## Lookahead and Lookbehind

```javascript
// Positive lookahead (?=...) — match X followed by Y
/\d+(?= dollars)/.exec("100 dollars");  // "100"

// Negative lookahead (?!...) — match X NOT followed by Y
/\d+(?! dollars)/.exec("100 euros");    // "100"

// Positive lookbehind (?<=...) — match X preceded by Y
/(?<=\$)\d+/.exec("$100");   // "100"

// Password: must contain uppercase, lowercase, digit
/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/
```

## Python Regex

```python
import re

text = "Events on 2024-01-15 and 2024-03-22"

# search — first match anywhere
m = re.search(r'\d{4}-\d{2}-\d{2}', text)
if m:
    print(m.group())  # "2024-01-15"

# findall — all matches
dates = re.findall(r'\d{4}-\d{2}-\d{2}', text)
# ["2024-01-15", "2024-03-22"]

# sub — replace
result = re.sub(r'\d{4}', 'YYYY', text)

# Named groups — (?P<name>...)
m = re.search(r'(?P<year>\d{4})-(?P<month>\d{2})', text)
print(m.group('year'))  # "2024"

# Compile for reuse (faster in loops)
pattern = re.compile(r'\d{4}-\d{2}-\d{2}', re.IGNORECASE)
```

## Multiline Mode

```javascript
// ^ and $ match line start/end with /m flag
const log = "ERROR: disk full\nINFO: started\nERROR: timeout";
const errors = log.match(/^ERROR:.+/gm);
// ["ERROR: disk full", "ERROR: timeout"]
```

## Regex in Go

```go
import "regexp"

re := regexp.MustCompile(`\d{4}-\d{2}-\d{2}`)

re.MatchString("2024-01-15")          // true
re.FindString("Date: 2024-01-15")     // "2024-01-15"
re.FindAllString(text, -1)            // all matches
re.ReplaceAllString(text, "DATE")     // replace all
```

## Quick Tool

For real-time regex testing with highlighting, use **[DevToolBox Regex Tester](https://viadreams.cc/en/tools/regex-tester)** — type your pattern, see matches highlighted instantly.

---

*Test regular expressions live with [DevToolBox's free Regex Tester](https://viadreams.cc/en/tools/regex-tester).*
