---
title: "Password Generator: Generate Secure Random Passwords — Complete Guide"
tags: security, javascript, python, webdev
canonical_url: https://viadreams.cc/en/blog/password-generator-online-guide
published: true
---

Generate cryptographically secure passwords. Complete guide using JavaScript, Python, Go, and best practices for password strength.

## Never Use Math.random() for Passwords

```javascript
// ❌ WRONG: Math.random() is not cryptographically secure
const bad = Math.random().toString(36).slice(2);

// ✅ CORRECT: Use crypto.getRandomValues()
function generatePassword(length = 16, charset) {
  const chars = charset || 
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
  const array = new Uint32Array(length);
  crypto.getRandomValues(array);
  return Array.from(array, n => chars[n % chars.length]).join('');
}

generatePassword(16); // "aB3$kP9#mL7@xN2!"
```

## Character Sets

```javascript
const CHARSETS = {
  uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  lowercase: 'abcdefghijklmnopqrstuvwxyz',
  digits: '0123456789',
  symbols: '!@#$%^&*()-_=+[]{}|;:,.<>?',
  ambiguous: '0O1lI',  // confusing characters to avoid
};

function buildCharset(options) {
  let charset = '';
  if (options.uppercase) charset += CHARSETS.uppercase;
  if (options.lowercase) charset += CHARSETS.lowercase;
  if (options.digits) charset += CHARSETS.digits;
  if (options.symbols) charset += CHARSETS.symbols;
  if (options.excludeAmbiguous) {
    charset = charset.split('').filter(c => !CHARSETS.ambiguous.includes(c)).join('');
  }
  return charset;
}

// Ensure at least one character from each required category
function generateStrong(length = 20) {
  const array = new Uint32Array(length);
  crypto.getRandomValues(array);
  
  const required = [
    CHARSETS.uppercase[array[0] % CHARSETS.uppercase.length],
    CHARSETS.lowercase[array[1] % CHARSETS.lowercase.length],
    CHARSETS.digits[array[2] % CHARSETS.digits.length],
    CHARSETS.symbols[array[3] % CHARSETS.symbols.length],
  ];
  
  const full = CHARSETS.uppercase + CHARSETS.lowercase + CHARSETS.digits + CHARSETS.symbols;
  const rest = Array.from(array.slice(4), n => full[n % full.length]);
  
  // Shuffle to avoid predictable positions
  return [...required, ...rest].sort(() => {
    const n = new Uint32Array(1);
    crypto.getRandomValues(n);
    return n[0] % 2 === 0 ? 1 : -1;
  }).join('');
}
```

## Password Entropy

```javascript
// Entropy bits = log2(charset_size^length) = length * log2(charset_size)
function passwordEntropy(password) {
  const charsets = [
    [/[a-z]/, 26],
    [/[A-Z]/, 26],
    [/[0-9]/, 10],
    [/[^a-zA-Z0-9]/, 32],
  ];
  
  const charsetSize = charsets
    .filter(([regex]) => regex.test(password))
    .reduce((sum, [, size]) => sum + size, 0);
  
  return Math.floor(password.length * Math.log2(charsetSize));
}

// Entropy guide:
// < 40 bits: Weak
// 40-60 bits: Reasonable
// 60-80 bits: Strong
// > 80 bits: Very Strong
passwordEntropy('Correct-Horse-Battery-Staple');  // ~100 bits
passwordEntropy('P@ssw0rd');                       // ~50 bits
```

## Python — secrets module

```python
import secrets
import string

# Never use: random.choice() — not cryptographically secure!
# Always use: secrets module

# Simple random password
def generate_password(length=16, use_symbols=True):
    chars = string.ascii_letters + string.digits
    if use_symbols:
        chars += "!@#$%^&*()"
    return ''.join(secrets.choice(chars) for _ in range(length))

# Strong password with guaranteed categories
def generate_strong(length=20):
    uppercase = secrets.choice(string.ascii_uppercase)
    lowercase = secrets.choice(string.ascii_lowercase)
    digit = secrets.choice(string.digits)
    symbol = secrets.choice('!@#$%^&*')
    
    all_chars = string.ascii_letters + string.digits + '!@#$%^&*'
    rest = [secrets.choice(all_chars) for _ in range(length - 4)]
    
    password = list(f"{uppercase}{lowercase}{digit}{symbol}") + rest
    secrets.SystemRandom().shuffle(password)
    return ''.join(password)

# Passphrase (more memorable, equally secure)
def generate_passphrase(words=4, separator='-'):
    wordlist = ['correct', 'horse', 'battery', 'staple', 'purple', 'monkey']
    return separator.join(secrets.choice(wordlist) for _ in range(words))
```

## Diceware Passphrases

```javascript
// Passphrases are easier to remember and equally secure
// 4 random words ≈ 52 bits entropy (word list of 7776 = 6^5 = one dice roll)

const WORD_LIST = ['correct', 'horse', 'battery', 'staple', 'purple',
                   'monkey', 'cloud', 'delta', 'river', 'stone'];

function generatePassphrase(wordCount = 4, separator = '-') {
  const array = new Uint32Array(wordCount);
  crypto.getRandomValues(array);
  return Array.from(array, n => WORD_LIST[n % WORD_LIST.length]).join(separator);
}

generatePassphrase(4);  // "correct-horse-battery-staple"

// For real use, use the full EFF wordlist (7776 words)
// https://www.eff.org/files/2016/07/18/eff_large_wordlist.txt
```

## NIST Password Guidelines (SP 800-63B)

```
✅ DO:
  - Minimum 8 characters (12+ recommended)
  - Allow all printable ASCII + Unicode
  - Check against breach databases (HaveIBeenPwned)
  - Support long passphrases (64+ chars)
  - Use password managers

❌ DON'T:
  - Require periodic rotation (increases weak passwords)
  - Require specific character types (counter-productive)
  - Use knowledge-based authentication (KBA)
  - Truncate passwords
  - Use security questions
```

## Check Against Breached Passwords

```javascript
// k-Anonymity: only send first 5 chars of SHA-1 hash
async function isPasswordBreached(password) {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-1', data);
  const hashHex = Array.from(new Uint8Array(hashBuffer))
    .map(b => b.toString(16).padStart(2, '0')).join('').toUpperCase();
  
  const prefix = hashHex.slice(0, 5);
  const suffix = hashHex.slice(5);
  
  const r = await fetch(`https://api.pwnedpasswords.com/range/${prefix}`);
  const text = await r.text();
  
  return text.split('\n').some(line => line.startsWith(suffix));
}
```

## Quick Tool

Use **[DevToolBox Password Generator](https://viadreams.cc/en/tools/password-generator)** — generate cryptographically secure passwords instantly with custom options.

---

*Generate secure passwords online with [DevToolBox's free Password Generator](https://viadreams.cc/en/tools/password-generator).*
