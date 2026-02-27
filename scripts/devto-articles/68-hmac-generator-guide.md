---
title: "HMAC Generator: Create HMAC Signatures Online — Complete Guide"
tags: security, javascript, python, webdev
canonical_url: https://viadreams.cc/en/blog/hmac-generator-online-guide
published: true
---

Create HMAC-SHA256 and HMAC-SHA512 signatures for webhook verification, API authentication, and JWT. Complete guide with JavaScript, Python, and Go.

## What is HMAC?

HMAC (Hash-based Message Authentication Code) combines a cryptographic hash with a secret key. Unlike a plain hash, HMAC requires knowledge of the secret key to verify — making it resistant to forgery.

```
HMAC(K, m) = H((K' ⊕ opad) || H((K' ⊕ ipad) || m))
```

| Feature | Hash | HMAC | Digital Signature |
|---------|------|------|------------------|
| Key required | No | Yes (symmetric) | Yes (asymmetric) |
| Forgery resistant | No | Yes | Yes |
| Speed | Fast | Fast | Slow |
| Use case | Checksums | API auth, webhooks | Certificates, JWTs |

## Node.js — crypto module

```javascript
const crypto = require('crypto');

// Create HMAC-SHA256
const secret = 'my-secret-key';
const message = 'Hello, World!';
const hmac = crypto.createHmac('sha256', secret)
  .update(message)
  .digest('hex');
// "e92f0c5f4f4e0e7f5a..."

// Constant-time comparison (prevents timing attacks!)
function verifyHmac(message, received, secret) {
  const expected = crypto.createHmac('sha256', secret)
    .update(message).digest('hex');
  return crypto.timingSafeEqual(
    Buffer.from(expected, 'hex'),
    Buffer.from(received, 'hex')
  );
}
```

## GitHub Webhook Verification

```javascript
// Express middleware
function verifyGithubWebhook(req, res, next) {
  const signature = req.headers['x-hub-signature-256'];
  const payload = JSON.stringify(req.body);
  const secret = process.env.GITHUB_WEBHOOK_SECRET;
  
  const expected = 'sha256=' + crypto
    .createHmac('sha256', secret)
    .update(payload)
    .digest('hex');
  
  if (!crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expected)
  )) {
    return res.status(401).send('Invalid signature');
  }
  next();
}
```

## Python — hmac module

```python
import hmac
import hashlib

# Create HMAC-SHA256
secret = b'my-secret-key'
message = b'Hello, World!'
h = hmac.new(secret, message, hashlib.sha256)
print(h.hexdigest())

# Timing-safe comparison (use hmac.compare_digest, NOT ==)
def verify_hmac(message: bytes, received: str, secret: bytes) -> bool:
    expected = hmac.new(secret, message, hashlib.sha256).hexdigest()
    return hmac.compare_digest(expected, received)  # ✅ timing-safe
    # return expected == received  # ❌ vulnerable to timing attacks!
```

## Browser Web Crypto API

```javascript
// HMAC-SHA256 in browser (no Node.js required)
async function createHmac(secret, message) {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign', 'verify']
  );
  const signature = await crypto.subtle.sign(
    'HMAC',
    key,
    encoder.encode(message)
  );
  return Array.from(new Uint8Array(signature))
    .map(b => b.toString(16).padStart(2, '0')).join('');
}
```

## AWS Signature Version 4 (HMAC chain)

```javascript
// AWS SigV4 derives signing key through 4 HMAC rounds
function getSigningKey(secret, date, region, service) {
  const dateKey   = hmac('AWS4' + secret, date);
  const regionKey = hmac(dateKey, region);
  const serviceKey= hmac(regionKey, service);
  return           hmac(serviceKey, 'aws4_request');
}
```

## Security Best Practices

```
✅ Key Management:
  - Minimum 32 bytes (256-bit) key length
  - Use CSPRNG to generate keys (crypto.randomBytes(32))
  - Never use passwords directly — derive with HKDF or PBKDF2
  - Rotate keys regularly; support key versioning

✅ Timing Safety:
  - NEVER compare HMACs with === or ==
  - Always use timingSafeEqual (Node.js), compare_digest (Python), hmac.Equal (Go)
  - Even a 1-nanosecond difference leaks information about key bits

✅ Replay Attack Prevention:
  - Include timestamp in signed payload
  - Reject messages older than 5 minutes
  - Use nonce for critical operations
```

## Quick Tool

Use **[DevToolBox HMAC Generator](https://viadreams.cc/en/tools/hmac-generator)** — generate HMAC-SHA256, HMAC-SHA512 signatures instantly online.

---

*Generate HMAC signatures with [DevToolBox's free HMAC Generator](https://viadreams.cc/en/tools/hmac-generator).*
