---
title: "Hash Generator: Generate SHA-256, MD5, and HMAC Online — Complete Guide"
tags: security, javascript, python, crypto
canonical_url: https://viadreams.cc/en/blog/hash-generator-online-guide
published: true
---

Generate cryptographic hashes online. Complete guide for SHA-256, HMAC, password hashing in JavaScript, Python, and Go.

## Hash Algorithm Comparison

| Algorithm | Output | Speed | Security | Use Case |
|-----------|--------|-------|----------|----------|
| MD5 | 128-bit | Fastest | Broken | Legacy/checksums |
| SHA-1 | 160-bit | Fast | Broken | Git (legacy) |
| SHA-256 | 256-bit | Good | Strong | General purpose |
| SHA-512 | 512-bit | Slower | Strong | High-security |
| SHA-3-256 | 256-bit | Medium | Strong | Keccak-based |
| BLAKE3 | 256-bit | Fastest | Strong | High throughput |

## JavaScript — Web Crypto API

```javascript
async function sha256(text) {
  const data = new TextEncoder().encode(text);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

await sha256('Hello, World!');
// "dffd6021bb2bd5b0af676290809ec3a53191dd81c7f70a4b28688a362182986d"
```

## Node.js — crypto module

```javascript
const crypto = require('crypto');

// SHA-256
crypto.createHash('sha256').update('Hello, World!').digest('hex');
// "dffd6021bb2bd5b0af676290809ec3a53191dd81c7f70a4b28688a362182986d"

// File hashing (streaming)
const stream = fs.createReadStream('file.txt');
const hash = crypto.createHash('sha256');
stream.pipe(hash);
hash.on('finish', () => console.log(hash.digest('hex')));
```

## HMAC — Message Authentication

```javascript
const crypto = require('crypto');

// Create HMAC-SHA256
const secret = 'my-secret-key';
const message = 'Hello, World!';
const hmac = crypto.createHmac('sha256', secret)
  .update(message)
  .digest('hex');

// Verify HMAC securely (prevents timing attacks)
function verifyHmac(message, receivedHmac, secret) {
  const expected = crypto.createHmac('sha256', secret)
    .update(message)
    .digest('hex');
  return crypto.timingSafeEqual(
    Buffer.from(expected, 'hex'),
    Buffer.from(receivedHmac, 'hex')
  );
}

// GitHub webhook verification
function verifyGithubWebhook(payload, signature, secret) {
  const hmac = crypto.createHmac('sha256', secret)
    .update(payload)
    .digest('hex');
  return `sha256=${hmac}` === signature;
}
```

## Python — hashlib

```python
import hashlib

# SHA-256
hashlib.sha256(b'Hello, World!').hexdigest()
# "dffd6021bb2bd5b0af676290809ec3a53191dd81c7f70a4b28688a362182986d"

# Multiple algorithms
for algo in ['md5', 'sha1', 'sha256', 'sha512']:
    h = hashlib.new(algo, b'Hello, World!').hexdigest()
    print(f"{algo}: {h}")

# File integrity
def file_hash(filepath, algorithm='sha256'):
    h = hashlib.new(algorithm)
    with open(filepath, 'rb') as f:
        while chunk := f.read(8192):
            h.update(chunk)
    return h.hexdigest()

# HMAC
import hmac
hmac.new(b'secret-key', b'Hello', hashlib.sha256).hexdigest()
```

## Password Hashing — Never Use SHA-256!

```python
# ✅ Use bcrypt
import bcrypt
hashed = bcrypt.hashpw(b"password123", bcrypt.gensalt(rounds=12))
bcrypt.checkpw(b"password123", hashed)  # True

# ✅ Better: Use Argon2
from argon2 import PasswordHasher
ph = PasswordHasher(time_cost=3, memory_cost=65536, parallelism=4)
hashed = ph.hash("password123")
ph.verify(hashed, "password123")  # True

# ❌ WRONG: Never do this for passwords
hashlib.sha256(b"password123").hexdigest()  # Vulnerable to brute force!
```

## Go — crypto package

```go
import (
    "crypto/sha256"
    "crypto/hmac"
    "encoding/hex"
    "fmt"
)

// SHA-256
h := sha256.Sum256([]byte("Hello, World!"))
fmt.Println(hex.EncodeToString(h[:]))

// HMAC-SHA256
mac := hmac.New(sha256.New, []byte("secret-key"))
mac.Write([]byte("Hello, World!"))
signature := hex.EncodeToString(mac.Sum(nil))
```

## File Integrity Checking

```bash
# Linux/macOS: generate checksum
sha256sum file.txt
shasum -a 256 file.txt        # macOS

# Verify a downloaded file
echo "expected_hash  file.txt" | sha256sum -c

# Windows PowerShell
Get-FileHash file.txt -Algorithm SHA256
certutil -hashfile file.txt SHA256
```

## Quick Tool

Use **[DevToolBox Hash Generator](https://viadreams.cc/en/tools/hash-generator)** — generate SHA-256, MD5, SHA-512, and HMAC hashes instantly online.

---

*Generate cryptographic hashes online with [DevToolBox's free Hash Generator](https://viadreams.cc/en/tools/hash-generator).*
