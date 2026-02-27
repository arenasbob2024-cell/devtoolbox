---
title: "bcrypt Password Hashing: Why Slowness is a Feature (Node.js, Python, PHP)"
tags: security, nodejs, python, webdev
canonical_url: https://viadreams.cc/en/blog/bcrypt-generator-online-guide
published: true
---

Password hashing isn't just encoding — it's deliberately making attacks expensive. Here's why bcrypt is still the go-to choice in 2026.

## The bcrypt Hash Format

A bcrypt hash looks like this:

```
$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewEjuBTZxN6TKT.O
```

Breaking it down:
- `$2b$` — bcrypt algorithm version
- `12` — cost factor (2^12 = 4096 iterations)
- Next 22 chars — base64-encoded salt
- Final 31 chars — base64-encoded hash

## Cost Factor / Salt Rounds

The cost factor determines how slow the hashing is:

| Cost | Iterations | Approx. Time | Use Case |
|------|------------|--------------|----------|
| 10 | 1,024 | ~100ms | Web apps (default) |
| 12 | 4,096 | ~400ms | High security |
| 14 | 16,384 | ~1.5s | Banking/Healthcare |

Higher cost = slower attacks. A GPU can do billions of MD5 hashes per second but only thousands of bcrypt hashes.

## Node.js Implementation

```javascript
const bcrypt = require('bcrypt');
// or: const bcrypt = require('bcryptjs'); // pure JS, no native deps

const SALT_ROUNDS = 12;

// Hash a password
async function hashPassword(plaintext) {
  return await bcrypt.hash(plaintext, SALT_ROUNDS);
}

// Verify a password
async function verifyPassword(plaintext, hash) {
  return await bcrypt.compare(plaintext, hash);
}

// Example usage
const hash = await hashPassword('mySecretPassword');
console.log(hash); // $2b$12$...

const isValid = await verifyPassword('mySecretPassword', hash);
console.log(isValid); // true
```

## Python Implementation

```python
import bcrypt

# Hash a password
def hash_password(password: str) -> bytes:
    salt = bcrypt.gensalt(rounds=12)
    return bcrypt.hashpw(password.encode('utf-8'), salt)

# Verify a password
def verify_password(password: str, hashed: bytes) -> bool:
    return bcrypt.checkpw(password.encode('utf-8'), hashed)

# Usage
hashed = hash_password("mySecretPassword")
print(hashed)  # b'$2b$12$...'

print(verify_password("mySecretPassword", hashed))  # True
print(verify_password("wrongPassword", hashed))     # False
```

## PHP Implementation

```php
// Hash a password
$hash = password_hash('mySecretPassword', PASSWORD_BCRYPT, ['cost' => 12]);

// Verify a password
if (password_verify('mySecretPassword', $hash)) {
    echo "Password is correct!";
}

// Check if rehashing is needed (when upgrading cost factor)
if (password_needs_rehash($hash, PASSWORD_BCRYPT, ['cost' => 12])) {
    $hash = password_hash($newPassword, PASSWORD_BCRYPT, ['cost' => 12]);
    // Update hash in database
}
```

## The 72-Byte Limit

bcrypt only hashes the first 72 bytes of a password. For longer passwords:

```javascript
const crypto = require('crypto');
const bcrypt = require('bcrypt');

async function hashLongPassword(password) {
  // Pre-hash with SHA-256 to handle passwords > 72 bytes
  const sha256 = crypto.createHash('sha256').update(password).digest('base64');
  return await bcrypt.hash(sha256, 12);
}
```

## bcrypt vs Argon2id vs scrypt

| Property | bcrypt | Argon2id | scrypt |
|----------|--------|----------|--------|
| Memory hardness | ✗ | ✓ | ✓ |
| GPU resistance | ✓ | ✓✓ | ✓✓ |
| OWASP recommended | ✓ | ✓✓ | ✓ |
| Battle-tested | 25+ years | 2015+ | 2009+ |

**When to choose:**
- **bcrypt**: Legacy systems, Node.js/Python/PHP without Argon2
- **Argon2id**: New systems with OWASP compliance requirements
- **scrypt**: Memory-constrained environments needing hardness

## Common Mistakes

1. **Using bcrypt.hashSync() in Node.js web servers** — blocks the event loop
2. **Cost factor 4-6** — too low, modern GPUs crack in minutes
3. **Comparing raw strings with ==** — always use `compare()`, not `===`
4. **Hashing already-hashed passwords** — use `compare()` on login

## Quick Online Tool

For quick password testing and hash generation, try **[DevToolBox's bcrypt generator](https://viadreams.cc/en/tools/bcrypt-generator)** — paste a password, get an instant hash with configurable cost factor and hash verification.

---

*Generate and verify bcrypt hashes instantly with [DevToolBox's free bcrypt tool](https://viadreams.cc/en/tools/bcrypt-generator).*
