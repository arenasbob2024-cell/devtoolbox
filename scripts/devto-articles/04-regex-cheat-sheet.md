---
title: "The Regex Cheat Sheet You'll Actually Keep Open in a Tab"
published: false
description: "Anchors, character classes, quantifiers, groups, lookarounds, and flags -- everything you need for regular expressions in one place. With examples for JavaScript, Python, and Go."
tags: javascript, python, beginners, tutorial
canonical_url: https://viadreams.cc/en/blog/regex-cheat-sheet
cover_image: https://viadreams.cc/og-image.png
---

I've been writing regex for years and I still can't remember the lookahead syntax off the top of my head. No shame in having a cheat sheet open. Here's the one I keep coming back to.

## Anchors (Where to Match)

Anchors match *positions*, not characters.

| Pattern | Matches |
|---------|---------|
| `^` | Start of string (or line with `m` flag) |
| `$` | End of string (or line with `m` flag) |
| `\b` | Word boundary |
| `\B` | Not a word boundary |

```javascript
/^hello/     // matches "hello world", not "say hello"
/world$/     // matches "hello world", not "world peace"
/\bcat\b/    // matches "cat" but not "category"
```

## Character Classes (What to Match)

| Pattern | Matches |
|---------|---------|
| `.` | Any character except newline |
| `\d` | Digit `[0-9]` |
| `\D` | Not a digit |
| `\w` | Word character `[a-zA-Z0-9_]` |
| `\W` | Not a word character |
| `\s` | Whitespace (space, tab, newline) |
| `\S` | Not whitespace |
| `[abc]` | Any of a, b, or c |
| `[^abc]` | Not a, b, or c |
| `[a-z]` | Any lowercase letter |

## Quantifiers (How Many Times)

| Pattern | Meaning |
|---------|---------|
| `*` | 0 or more |
| `+` | 1 or more |
| `?` | 0 or 1 |
| `{3}` | Exactly 3 |
| `{2,5}` | Between 2 and 5 |
| `{3,}` | 3 or more |

### Greedy vs Lazy

By default, quantifiers are **greedy** -- they grab as much as possible. Add `?` to make them **lazy**.

```javascript
// Given: "<b>bold</b> and <i>italic</i>"

/<.*>/     // greedy: matches "<b>bold</b> and <i>italic</i>"
/<.*?>/    // lazy:   matches "<b>"
```

This one difference solves 90% of "why is my regex matching too much" problems.

## Groups & Capturing

```javascript
// Capturing group -- extract matched text
/(hello) (world)/    // $1 = "hello", $2 = "world"

// Named group -- more readable
/(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/

// Non-capturing group -- group without capturing
/(?:https?):\/\//    // groups http/https but doesn't capture

// Alternation (OR)
/(cat|dog|bird)/     // matches any of the three
```

### Backreferences

Reference a previously captured group:

```javascript
/(hello) \1/    // matches "hello hello"
/(\w+)\s+\1/   // matches any repeated word
```

## Lookahead & Lookbehind

These match *positions* without consuming characters. Incredibly powerful for complex conditions.

| Pattern | Name | Meaning |
|---------|------|---------|
| `(?=...)` | Positive lookahead | Followed by ... |
| `(?!...)` | Negative lookahead | NOT followed by ... |
| `(?<=...)` | Positive lookbehind | Preceded by ... |
| `(?<!...)` | Negative lookbehind | NOT preceded by ... |

```javascript
// Password validation: at least one digit ahead
/(?=.*\d).{8,}/

// Price without dollar sign
/(?<=\$)\d+\.\d{2}/       // matches "9.99" in "$9.99"

// Word NOT followed by a specific word
/\bJava(?!Script)\b/      // matches "Java" but not "JavaScript"
```

**Note:** Lookbehinds work in JavaScript (ES2018+) and Python, but Go's RE2 engine does **not** support any lookarounds.

## Flags

| Flag | Meaning |
|------|---------|
| `g` | Global -- find all matches, not just first |
| `i` | Case-insensitive |
| `m` | Multiline -- `^` and `$` match line boundaries |
| `s` | Dotall -- `.` matches newlines too |
| `u` | Unicode support |

```javascript
/hello/gi     // find all "hello" regardless of case
/^start/m     // match "start" at beginning of any line
```

## Common Patterns (Copy-Paste Ready)

```javascript
// Email (simplified)
/^[\w.+-]+@[\w-]+\.[\w.]+$/

// URL
/^https?:\/\/[\w\-.]+(:\d+)?(\/\S*)?$/

// IPv4
/^(\d{1,3}\.){3}\d{1,3}$/

// Hex color
/^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/

// Date (YYYY-MM-DD)
/^\d{4}-\d{2}-\d{2}$/

// Phone (US)
/^\+?1?[\s.-]?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/

// Strong password (8+ chars, uppercase, lowercase, digit)
/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/
```

## Language Differences

**JavaScript:**
```javascript
const re = /pattern/flags;
"text".match(re);
"text".replace(re, "new");
re.test("text");
```

**Python:**
```python
import re
re.findall(r"pattern", text)
re.sub(r"pattern", "new", text)
re.match(r"pattern", text)
# Compile for reuse:
pattern = re.compile(r"pattern")
```

**Go:**
```go
import "regexp"
re := regexp.MustCompile(`pattern`)
re.FindString(text)
re.ReplaceAllString(text, "new")
// Note: Go uses RE2 -- no lookaheads/lookbehinds
```

## Performance Tips

1. **Be specific.** Use `[a-zA-Z]` instead of `.` when you know what to expect
2. **Avoid catastrophic backtracking.** Patterns like `(a+)+` cause exponential time
3. **Use non-capturing groups** `(?:...)` when you don't need the captured value
4. **Compile once, use many times** in Python and Go
5. **Build incrementally.** Test each piece before combining into a complex pattern

---

*Originally published on [DevToolBox](https://viadreams.cc/en/blog/regex-cheat-sheet). Try our free [Regex Tester](https://viadreams.cc/en/tools/regex-tester) -- paste your pattern, see matches highlighted in real time. 100% client-side, no data leaves your browser.*
