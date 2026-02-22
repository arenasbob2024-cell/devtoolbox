'use client';

import Link from 'next/link';

export default function RegexCheatSheet2026({ lang }: { lang: string }) {
  return (
    <>
      <h2>What Is Regex (Regular Expression)?</h2>
      <p>
        A <strong>regular expression</strong> (regex or regexp) is a sequence of characters that defines a search pattern. Regular expressions are used for string matching, searching, validation, and text manipulation in virtually every programming language. Whether you are validating email addresses, parsing log files, or performing find-and-replace operations, regex is an essential developer skill.
      </p>
      <p>
        This comprehensive cheat sheet covers every regex feature you need: character classes, quantifiers, groups, lookahead and lookbehind assertions, flags, and dozens of ready-to-use patterns for common tasks. Examples are provided in JavaScript, Python, and Go.
      </p>
      <p>
        <Link href={`/${lang}/tools/regex-tester`} style={{ fontWeight: 600 }}>Test your regular expressions instantly with our free online Regex Tester.</Link>
      </p>

      <h2>Character Classes</h2>
      <p>
        Character classes match a single character from a set of characters. They are the building blocks of every regex pattern.
      </p>
      <pre><code className="language-text">{`Character Class Reference:

Pattern    Matches                         Example
---------  ----------------------------    -------------------
.          Any character except newline     a.c  -> abc, a1c, a-c
\\d         Any digit [0-9]                  \\d{3} -> 123, 456
\\D         Any non-digit [^0-9]             \\D+  -> abc, ---
\\w         Word character [a-zA-Z0-9_]      \\w+  -> hello_123
\\W         Non-word character               \\W+  -> @#$, ---
\\s         Whitespace [ \\t\\n\\r\\f\\v]          a\\sb -> a b, a\\tb
\\S         Non-whitespace                   \\S+  -> hello, 123
\\b         Word boundary                    \\bcat\\b -> "cat" not "category"
\\B         Non-word boundary                \\Bcat -> "category" not "cat"

Custom Character Classes:
[abc]      Any one of a, b, or c            [aeiou] -> vowels
[^abc]     Any character NOT a, b, or c     [^0-9] -> non-digit
[a-z]      Any lowercase letter             [a-z]+ -> hello
[A-Z]      Any uppercase letter             [A-Z]+ -> HELLO
[0-9]      Any digit                        [0-9]{4} -> 2026
[a-zA-Z]   Any letter                       [a-zA-Z]+ -> Hello
[a-z0-9]   Lowercase letter or digit        [a-z0-9]+ -> abc123

Special Characters Inside []:
[\\-]       Literal hyphen (escape or put at start/end)
[\\]]       Literal closing bracket
[\\\\]       Literal backslash`}</code></pre>

      <h2>Quantifiers</h2>
      <p>
        Quantifiers specify how many times a character, group, or character class must occur.
      </p>
      <pre><code className="language-text">{`Quantifier Reference:

Pattern    Meaning                          Example
---------  ----------------------------     -------------------
*          0 or more (greedy)               a* -> "", a, aaa
+          1 or more (greedy)               a+ -> a, aaa (not "")
?          0 or 1 (optional)                colou?r -> color, colour
{n}        Exactly n times                  \\d{4} -> 2026
{n,}       n or more times                  \\d{2,} -> 12, 123, 1234
{n,m}      Between n and m times            \\d{2,4} -> 12, 123, 1234

Greedy vs Lazy (Non-Greedy):
*          Greedy: match as much as possible
*?         Lazy: match as little as possible
+          Greedy                            ".+" -> "a" and "b" (whole)
+?         Lazy                              ".+?" -> "a", "b" (separate)
{n,m}      Greedy
{n,m}?     Lazy

Possessive (no backtracking, some engines):
*+         Possessive greedy
++         Possessive greedy

Example - Greedy vs Lazy:
  Input:   <p>Hello</p><p>World</p>
  Greedy:  <.*>    matches "<p>Hello</p><p>World</p>"
  Lazy:    <.*?>   matches "<p>", "</p>", "<p>", "</p>"`}</code></pre>

      <h2>Anchors and Boundaries</h2>
      <pre><code className="language-text">{`Anchor Reference:

Pattern    Matches                          Example
---------  ----------------------------     -------------------
^          Start of string (or line with m) ^Hello -> "Hello world"
$          End of string (or line with m)   world$ -> "Hello world"
\\b         Word boundary                    \\bword\\b -> "word" not "sword"
\\B         Non-word boundary                \\Bword -> "sword" not "word"
\\A         Start of string (always)         \\AHello (ignores multiline flag)
\\Z         End of string (always)           world\\Z (ignores multiline flag)

Example:
  Pattern: ^\\d{4}-\\d{2}-\\d{2}$
  Matches: "2026-02-22" (entire string must be a date)
  Fails:   "Date: 2026-02-22" (has text before date)
  Fails:   "2026-02-22 extra" (has text after date)`}</code></pre>

      <h2>Groups and Capturing</h2>
      <pre><code className="language-text">{`Group Reference:

Pattern          Meaning                       Example
--------------   -------------------------     -------------------
(abc)            Capturing group               (\\d{4})-(\\d{2})-(\\d{2})
(?:abc)          Non-capturing group           (?:https?://)
(?<name>abc)     Named capturing group         (?<year>\\d{4})
\\1, \\2           Backreference to group 1, 2   (\\w+)\\s\\1 -> "hello hello"
(?P<name>abc)    Named group (Python syntax)   (?P<year>\\d{4})

Alternation:
a|b              Match a or b                  cat|dog -> "cat" or "dog"
(a|b)c           Group alternation             (cat|dog)s -> "cats" or "dogs"

Examples:
  Date parsing:
    Pattern: (?<year>\\d{4})-(?<month>\\d{2})-(?<day>\\d{2})
    Input:   "2026-02-22"
    Groups:  year="2026", month="02", day="22"

  Duplicate words:
    Pattern: \\b(\\w+)\\s+\\1\\b
    Matches: "the the", "is is", "hello hello"

  HTML tags:
    Pattern: <(\\w+)>(.*?)</\\1>
    Matches: <b>bold</b> -> tag="b", content="bold"`}</code></pre>

      <h2>Lookahead and Lookbehind Assertions</h2>
      <p>
        Lookahead and lookbehind are zero-width assertions that match a position without consuming characters. They are powerful for complex pattern matching.
      </p>
      <pre><code className="language-text">{`Lookaround Reference:

Pattern       Name                    Meaning
-----------   -------------------     ----------------------------
(?=abc)       Positive lookahead      Followed by abc
(?!abc)       Negative lookahead      NOT followed by abc
(?<=abc)      Positive lookbehind     Preceded by abc
(?<!abc)      Negative lookbehind     NOT preceded by abc

Examples:

  Positive lookahead - (?=...)
    Pattern: \\d+(?= dollars)
    Input:   "100 dollars and 50 euros"
    Match:   "100" (only digits followed by " dollars")

  Negative lookahead - (?!...)
    Pattern: \\d+(?! dollars)
    Input:   "100 dollars and 50 euros"
    Match:   "10", "50" (digits NOT followed by " dollars")

  Positive lookbehind - (?<=...)
    Pattern: (?<=\\$)\\d+
    Input:   "Price: $100 and EUR200"
    Match:   "100" (only digits preceded by $)

  Negative lookbehind - (?<!...)
    Pattern: (?<!\\$)\\d+
    Input:   "Price: $100 and EUR200"
    Match:   "00", "200" (digits NOT preceded by $)

  Password strength (combined lookaheads):
    Pattern: ^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&]).{8,}$
    Requires: lowercase + uppercase + digit + special char + 8+ chars`}</code></pre>

      <h2>Regex Flags (Modifiers)</h2>
      <pre><code className="language-text">{`Flag Reference:

Flag   Name             Effect
-----  ---------------  -------------------------------------------
g      Global           Find all matches, not just the first
i      Case-insensitive Ignore case (A matches a)
m      Multiline        ^ and $ match line starts/ends (not just string)
s      Dotall (single)  . matches newline characters too
u      Unicode          Enable full Unicode matching
x      Extended         Allow comments and whitespace in pattern
y      Sticky           Match at exact position (lastIndex)

Common combinations:
  /pattern/gi     Global, case-insensitive
  /pattern/gm     Global, multiline
  /pattern/gims   Global, case-insensitive, multiline, dotall

JavaScript:
  const re = /hello/gi;
  const re2 = new RegExp('hello', 'gi');

Python:
  import re
  re.findall(r'hello', text, re.IGNORECASE | re.MULTILINE)

Go:
  // Go uses (?flags) inline syntax
  re := regexp.MustCompile("(?i)hello")  // case-insensitive`}</code></pre>

      <h2>Common Regex Patterns</h2>
      <p>
        Here are battle-tested regex patterns for the most common validation and extraction tasks:
      </p>

      <h3>Email Address</h3>
      <pre><code className="language-text">{`# Basic email validation
^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$

# Examples:
#   user@example.com       -> MATCH
#   alice.jones@company.co -> MATCH
#   invalid@               -> NO MATCH
#   @example.com           -> NO MATCH`}</code></pre>

      <h3>URL</h3>
      <pre><code className="language-text">{`# URL validation (HTTP/HTTPS)
^https?:\\/\\/(www\\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)$

# Examples:
#   https://example.com         -> MATCH
#   http://sub.example.com/path -> MATCH
#   ftp://files.example.com     -> NO MATCH (ftp not matched)`}</code></pre>

      <h3>IP Address</h3>
      <pre><code className="language-text">{`# IPv4 address
^(?:(?:25[0-5]|2[0-4]\\d|[01]?\\d\\d?)\\.){3}(?:25[0-5]|2[0-4]\\d|[01]?\\d\\d?)$

# Examples:
#   192.168.1.1    -> MATCH
#   10.0.0.255     -> MATCH
#   256.1.1.1      -> NO MATCH
#   192.168.1      -> NO MATCH

# IPv6 address (simplified)
^([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$`}</code></pre>

      <h3>Phone Number</h3>
      <pre><code className="language-text">{`# US phone number (flexible)
^\\+?1?[-. (]*\\d{3}[-. )]*\\d{3}[-. ]*\\d{4}$

# Examples:
#   +1 (555) 123-4567  -> MATCH
#   555-123-4567       -> MATCH
#   5551234567         -> MATCH

# International phone (E.164)
^\\+[1-9]\\d{6,14}$`}</code></pre>

      <h3>Date Formats</h3>
      <pre><code className="language-text">{`# ISO 8601 date (YYYY-MM-DD)
^\\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\\d|3[01])$

# US date (MM/DD/YYYY)
^(0[1-9]|1[0-2])\\/(0[1-9]|[12]\\d|3[01])\\/\\d{4}$

# Date with time (ISO 8601)
^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}(\\.\\d+)?(Z|[+-]\\d{2}:\\d{2})?$

# Examples:
#   2026-02-22                    -> MATCH (ISO)
#   2026-02-22T14:30:00Z          -> MATCH (ISO with time)
#   02/22/2026                    -> MATCH (US)`}</code></pre>

      <h3>Password Strength</h3>
      <pre><code className="language-text">{`# Strong password: 8+ chars, uppercase, lowercase, digit, special char
^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$

# Medium password: 6+ chars, letters and digits
^(?=.*[a-zA-Z])(?=.*\\d)[A-Za-z\\d]{6,}$`}</code></pre>

      <h3>More Common Patterns</h3>
      <pre><code className="language-text">{`# Hex color code
^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$
  #FF5733, #fff, abc123

# UUID (v4)
^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$
  550e8400-e29b-41d4-a716-446655440000

# Semantic version
^v?(0|[1-9]\\d*)\\.(0|[1-9]\\d*)\\.(0|[1-9]\\d*)(-[\\da-zA-Z-]+(\\.[\\da-zA-Z-]+)*)?(\\+[\\da-zA-Z-]+(\\.[\\da-zA-Z-]+)*)?$
  1.0.0, v2.1.3-beta.1, 3.0.0+build.123

# Slug (URL-friendly string)
^[a-z0-9]+(-[a-z0-9]+)*$
  hello-world, my-blog-post-2026

# HTML tags
<([a-zA-Z][a-zA-Z0-9]*)\\b[^>]*>(.*?)<\\/\\1>
  <p>text</p>, <div class="x">content</div>

# Credit card (basic, Luhn check needed separately)
^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|3[47][0-9]{13})$

# Whitespace trimming
^\\s+|\\s+$     (matches leading/trailing whitespace)`}</code></pre>

      <h2>Regex in JavaScript</h2>
      <pre><code className="language-javascript">{`// ========== Creating Regex ==========
const re1 = /hello/gi;                        // Literal syntax
const re2 = new RegExp('hello', 'gi');         // Constructor syntax
const re3 = new RegExp(\`\\\\b\${variable}\\\\b\`);   // Dynamic pattern

// ========== Testing ==========
const isValid = /^\\d{4}-\\d{2}-\\d{2}$/.test('2026-02-22');  // true

// ========== Matching ==========
const str = 'Price: $100 and $200';

// match() - first match or all with /g
str.match(/\\$(\\d+)/);          // ["$100", "100"]
str.match(/\\$(\\d+)/g);         // ["$100", "$200"]

// matchAll() - all matches with capture groups
for (const m of str.matchAll(/\\$(\\d+)/g)) {
  console.log(m[0], m[1]);    // "$100" "100", "$200" "200"
}

// ========== Replacing ==========
// Simple replace
'hello world'.replace(/world/, 'regex');  // "hello regex"

// Replace all occurrences
'aaa'.replace(/a/g, 'b');                 // "bbb"
'aaa'.replaceAll('a', 'b');               // "bbb" (ES2021)

// Replace with capture groups
'2026-02-22'.replace(
  /(\\d{4})-(\\d{2})-(\\d{2})/,
  '$2/$3/$1'
);  // "02/22/2026"

// Replace with function
'hello WORLD'.replace(/\\b\\w+/g, word =>
  word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
);  // "Hello World"

// ========== Splitting ==========
'one, two,  three'.split(/,\\s*/);  // ["one", "two", "three"]

// ========== Named Groups ==========
const dateRe = /(?<year>\\d{4})-(?<month>\\d{2})-(?<day>\\d{2})/;
const match = dateRe.exec('2026-02-22');
console.log(match.groups.year);   // "2026"
console.log(match.groups.month);  // "02"
console.log(match.groups.day);    // "22"`}</code></pre>

      <h2>Regex in Python</h2>
      <pre><code className="language-python">{`import re

# ========== Basic Operations ==========

# Search - find first match anywhere in string
m = re.search(r'\\d+', 'abc 123 def 456')
print(m.group())  # "123"

# Match - match at the beginning of string
m = re.match(r'\\d+', '123 abc')
print(m.group())  # "123"

# Fullmatch - entire string must match (Python 3.4+)
m = re.fullmatch(r'\\d{4}-\\d{2}-\\d{2}', '2026-02-22')
print(m.group())  # "2026-02-22"

# Findall - all non-overlapping matches
prices = re.findall(r'\\$\\d+', 'Items: $100, $200, $50')
print(prices)  # ['$100', '$200', '$50']

# Finditer - iterator of match objects
for m in re.finditer(r'\\$(\\d+)', 'Items: $100, $200'):
    print(f"Price: {m.group(1)}")  # "100", "200"

# ========== Replace (sub) ==========
result = re.sub(r'\\d+', 'NUM', 'abc 123 def 456')
print(result)  # "abc NUM def NUM"

# Replace with function
def double(m):
    return str(int(m.group()) * 2)
result = re.sub(r'\\d+', double, 'Price: 50 and 100')
print(result)  # "Price: 100 and 200"

# ========== Named Groups ==========
m = re.search(r'(?P<year>\\d{4})-(?P<month>\\d{2})-(?P<day>\\d{2})', '2026-02-22')
print(m.group('year'))   # "2026"
print(m.group('month'))  # "02"

# ========== Compiled Regex ==========
email_re = re.compile(r'^[\\w.+-]+@[\\w-]+\\.[a-zA-Z]{2,}$')
print(email_re.match('user@example.com'))  # Match object
print(email_re.match('invalid'))           # None

# ========== Flags ==========
re.findall(r'hello', 'Hello HELLO', re.IGNORECASE)  # ['Hello', 'HELLO']
re.findall(r'^\\w+', 'line1\\nline2', re.MULTILINE)   # ['line1', 'line2']

# Verbose flag for readable patterns
phone_re = re.compile(r"""
    ^\\+?1?             # Optional country code
    [-. (]*             # Optional separators
    (\\d{3})            # Area code
    [-. )]*             # Optional separators
    (\\d{3})            # Exchange
    [-. ]*              # Optional separators
    (\\d{4})$           # Subscriber
""", re.VERBOSE)`}</code></pre>

      <h2>Regex in Go</h2>
      <pre><code className="language-go">{`package main

import (
    "fmt"
    "regexp"
)

func main() {
    // Compile regex (panics on invalid pattern)
    re := regexp.MustCompile(\`\\d{4}-\\d{2}-\\d{2}\`)

    // Test if string matches
    fmt.Println(re.MatchString("2026-02-22"))  // true

    // Find first match
    fmt.Println(re.FindString("Date: 2026-02-22 and 2026-03-01"))
    // "2026-02-22"

    // Find all matches
    fmt.Println(re.FindAllString("2026-02-22 and 2026-03-01", -1))
    // ["2026-02-22", "2026-03-01"]

    // Capture groups
    dateRe := regexp.MustCompile(\`(\\d{4})-(\\d{2})-(\\d{2})\`)
    match := dateRe.FindStringSubmatch("2026-02-22")
    fmt.Println(match[1]) // "2026" (year)
    fmt.Println(match[2]) // "02"   (month)
    fmt.Println(match[3]) // "22"   (day)

    // Named capture groups
    namedRe := regexp.MustCompile(\`(?P<year>\\d{4})-(?P<month>\\d{2})-(?P<day>\\d{2})\`)
    m := namedRe.FindStringSubmatch("2026-02-22")
    for i, name := range namedRe.SubexpNames() {
        if name != "" {
            fmt.Printf("%s: %s\\n", name, m[i])
        }
    }

    // Replace
    result := re.ReplaceAllString("Date: 2026-02-22", "YYYY-MM-DD")
    fmt.Println(result) // "Date: YYYY-MM-DD"

    // Replace with function
    result2 := re.ReplaceAllStringFunc("2026-02-22", func(s string) string {
        return "[" + s + "]"
    })
    fmt.Println(result2) // "[2026-02-22]"

    // Note: Go regex uses RE2 syntax (no lookahead/lookbehind)
    // No backreferences, no possessive quantifiers
    // Use (?i) for case-insensitive: (?i)hello
}`}</code></pre>

      <h2>Regex Performance Tips</h2>
      <pre><code className="language-text">{`Regex Performance Best Practices:

1. Be specific - avoid .* when you can use [^\\s]+ or [^"]+
   Slow: ".*"           (backtracks heavily)
   Fast: "[^"]*"        (no backtracking needed)

2. Use non-capturing groups when you don't need the match
   Slow: (https?|ftp)://
   Fast: (?:https?|ftp)://

3. Anchor your patterns when possible
   Slow: \\d{4}-\\d{2}-\\d{2}  (searches entire string)
   Fast: ^\\d{4}-\\d{2}-\\d{2}$ (checks from start)

4. Avoid catastrophic backtracking
   Dangerous: (a+)+$     (exponential backtracking on "aaaaab")
   Safe:      a+$        (same result, linear time)

5. Compile regex once, reuse many times
   // JavaScript
   const re = /pattern/g;  // Define once outside loop

   // Python
   compiled = re.compile(r'pattern')  # Compile once

   // Go
   re := regexp.MustCompile("pattern")  // Compile once

6. Use possessive quantifiers or atomic groups when available
   Greedy:     \\d+       (backtracks)
   Possessive: \\d++      (no backtracking, Java/PHP)

7. Order alternations by likelihood
   Slow: (rarely|sometimes|usually)
   Fast: (usually|sometimes|rarely)`}</code></pre>

      <h2>Frequently Asked Questions</h2>

      <h3>What is the difference between regex .* and .+?</h3>
      <p>
        <code>.*</code> matches zero or more of any character (can match an empty string), while <code>.+</code> matches one or more of any character (requires at least one character). Use <code>.*</code> when the part is optional and <code>.+</code> when at least one character is required.
      </p>

      <h3>How do I make regex case-insensitive?</h3>
      <p>
        Use the <code>i</code> flag. In JavaScript: <code>/pattern/i</code>. In Python: <code>re.IGNORECASE</code> or <code>re.I</code>. In Go: <code>(?i)pattern</code> inline syntax. This makes <code>hello</code> match &quot;Hello&quot;, &quot;HELLO&quot;, &quot;hElLo&quot;, etc.
      </p>

      <h3>What is the difference between greedy and lazy matching?</h3>
      <p>
        Greedy quantifiers (<code>*</code>, <code>+</code>) match as much text as possible, then backtrack if needed. Lazy quantifiers (<code>*?</code>, <code>+?</code>) match as little as possible, then expand if needed. For example, with input <code>&lt;b&gt;bold&lt;/b&gt;</code>, the pattern <code>&lt;.*&gt;</code> (greedy) matches the entire string, while <code>&lt;.*?&gt;</code> (lazy) matches just <code>&lt;b&gt;</code>.
      </p>

      <h3>Does Go support lookahead and lookbehind?</h3>
      <p>
        No. Go uses the RE2 regex engine which does not support lookahead, lookbehind, or backreferences. This is a deliberate design choice to guarantee linear-time matching. If you need lookaround in Go, you can often restructure your regex or use multiple passes.
      </p>

      <h3>How do I validate an email with regex?</h3>
      <p>
        A practical email regex is <code>^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]&#123;2,&#125;$</code>. This covers most real-world email addresses. However, the full RFC 5322 email specification is extremely complex and nearly impossible to express as a single regex. For production use, combine a basic regex check with actual email delivery verification.
      </p>

      <h2>Related Tools and Guides</h2>
      <ul>
        <li><Link href={`/${lang}/tools/regex-tester`}>Regex Tester</Link> - Test regular expressions with real-time matching</li>
        <li><Link href={`/${lang}/tools/regex-tester-online`}>Regex Tester Online</Link> - Advanced regex testing tool</li>
        <li><Link href={`/${lang}/blog/regex-patterns-copy-paste-ready`}>Regex Patterns Collection</Link> - Copy-paste ready regex patterns</li>
        <li><Link href={`/${lang}/blog/regex-match-email-phone-url-patterns`}>Regex for Email, Phone, URL</Link> - Validation patterns</li>
        <li><Link href={`/${lang}/blog/javascript-string-replace-regex`}>JavaScript String Replace with Regex</Link> - Replace patterns in JS</li>
        <li><Link href={`/${lang}/blog/regex-cheat-sheet`}>Regex Cheat Sheet</Link> - Quick reference card</li>
        <li><Link href={`/${lang}/blog/password-strength-requirements-2025`}>Password Strength Guide</Link> - Password validation patterns</li>
      </ul>
    </>
  );
}
