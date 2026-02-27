---
title: "PEM Decoder: Decode SSL Certificates and Keys — Complete Guide"
tags: security, devops, javascript, webdev
canonical_url: https://viadreams.cc/en/blog/pem-decoder-online-guide
published: true
---

PEM files are everywhere in TLS/SSL infrastructure — server certificates, private keys, CA bundles, CSRs. Yet their base64 wrapper makes them opaque. This guide shows how to decode and inspect them with OpenSSL, Node.js, and Python.

## What Is a PEM File?

PEM (Privacy Enhanced Mail) encodes binary DER (Distinguished Encoding Rules) data as base64 wrapped between `-----BEGIN ...-----` and `-----END ...-----` headers.

```
-----BEGIN CERTIFICATE-----
MIIDazCCAlOgAwIBAgIUX... (base64-encoded DER)
-----END CERTIFICATE-----
```

Common PEM block types:

| Block header           | Contents                          |
|------------------------|-----------------------------------|
| `CERTIFICATE`          | X.509 server or CA certificate    |
| `CERTIFICATE REQUEST`  | CSR (Certificate Signing Request) |
| `PRIVATE KEY`          | PKCS#8 unencrypted private key    |
| `RSA PRIVATE KEY`      | PKCS#1 RSA private key (legacy)   |
| `EC PRIVATE KEY`       | Elliptic curve private key        |
| `PUBLIC KEY`           | Public key (SubjectPublicKeyInfo) |

---

## OpenSSL Commands

### View a Certificate

```bash
# Full human-readable dump
openssl x509 -in cert.pem -text -noout

# Key fields only
openssl x509 -in cert.pem -noout -subject -issuer -dates -fingerprint -sha256
```

Output:
```
subject=CN=example.com, O=Example Inc, C=US
issuer=CN=R11, O=Let's Encrypt, C=US
notBefore=Jan  1 00:00:00 2025 GMT
notAfter=Apr  1 00:00:00 2025 GMT
SHA256 Fingerprint=AB:CD:...
```

### Check a Private Key

```bash
openssl rsa  -in private.key -text -noout   # RSA
openssl ec   -in private.key -text -noout   # EC
openssl pkey -in private.key -noout -text 2>&1 | head -5
```

### Verify Certificate Chain

```bash
# Key/cert modulus must match
openssl x509 -noout -modulus -in cert.pem   | md5sum
openssl rsa  -noout -modulus -in private.key | md5sum

# Verify against CA bundle
openssl verify -CAfile ca-bundle.pem cert.pem   # → cert.pem: OK
```

### Convert Formats

```bash
# DER → PEM
openssl x509 -inform der -in cert.der -out cert.pem

# PEM → DER
openssl x509 -outform der -in cert.pem -out cert.der

# PFX/PKCS12 → PEM
openssl pkcs12 -in bundle.pfx -nocerts -nodes  -out key.pem
openssl pkcs12 -in bundle.pfx -nokeys  -clcerts -out cert.pem
```

---

## Node.js: Inspect Certificates

### `X509Certificate` (Node.js 15.6+)

```js
const { X509Certificate } = require('crypto');
const fs = require('fs');

const cert = new X509Certificate(fs.readFileSync('cert.pem', 'utf8'));

console.log('Subject:', cert.subject);
console.log('Issuer:', cert.issuer);
console.log('Valid from:', cert.validFrom);
console.log('Valid to:', cert.validTo);
console.log('SAN:', cert.subjectAltName);       // DNS:example.com, ...
console.log('Key type:', cert.publicKey.asymmetricKeyType);

// Check expiry
const daysLeft = Math.floor((new Date(cert.validTo) - Date.now()) / 86400000);
console.log(`Expires in ${daysLeft} days`);
```

---

## Python: Inspect Certificates

```bash
pip install cryptography
```

```python
from cryptography import x509
from cryptography.x509.oid import NameOID
import datetime

with open('cert.pem', 'rb') as f:
    cert = x509.load_pem_x509_certificate(f.read())

print('CN:', cert.subject.get_attributes_for_oid(NameOID.COMMON_NAME)[0].value)
print('Not after:', cert.not_valid_after_utc)
print('Serial:', cert.serial_number)

try:
    san = cert.extensions.get_extension_for_class(x509.SubjectAlternativeName)
    print('SANs:', san.value.get_values_for_type(x509.DNSName))
except x509.ExtensionNotFound:
    pass

delta = cert.not_valid_after_utc - datetime.datetime.now(datetime.timezone.utc)
print(f'Expires in {delta.days} days')
```

### Load a Private Key

```python
from cryptography.hazmat.primitives.serialization import load_pem_private_key

with open('private.key', 'rb') as f:
    key = load_pem_private_key(f.read(), password=None)

print(key.__class__.__name__, key.key_size)   # RSAPrivateKey 2048
```

---

## Self-Signed Certs with mkcert

`mkcert` creates locally trusted certs without manual CA setup — ideal for local dev.

```bash
brew install mkcert
mkcert -install                              # installs local CA into trust stores
mkcert localhost 127.0.0.1 ::1 myapp.local  # → localhost+3.pem + localhost+3-key.pem
```

```js
const https = require('https');
const fs = require('fs');

https.createServer({
  cert: fs.readFileSync('localhost+3.pem'),
  key:  fs.readFileSync('localhost+3-key.pem'),
}, app).listen(443);
```

---

## Let's Encrypt / ACME Basics

Let's Encrypt issues free 90-day certs via ACME; certbot automates renewal.

```bash
certbot --nginx -d example.com -d www.example.com   # issue + configure nginx
certbot renew --dry-run                              # test auto-renewal

# Files placed at:
# /etc/letsencrypt/live/example.com/fullchain.pem   (cert + intermediates)
# /etc/letsencrypt/live/example.com/privkey.pem     (private key)
```

Always serve `fullchain.pem`, not just `cert.pem` — clients need the full chain.

---

## Common SSL Errors and Fixes

| Error                              | Cause                          | Fix                              |
|------------------------------------|--------------------------------|----------------------------------|
| `certificate has expired`          | Past `notAfter`                | `certbot renew`                  |
| `unable to verify first certificate` | Missing intermediate CA      | Use `fullchain.pem`              |
| `ERR_CERT_COMMON_NAME_INVALID`     | No matching SAN                | Re-issue cert with correct SAN   |
| `UNABLE_TO_GET_ISSUER_CERT_LOCALLY`| Unknown/self-signed CA         | Add CA cert to trust store       |
| Key/cert mismatch                  | Wrong key paired with cert     | Verify MD5 modulus match         |

### Quick Remote Expiry Check

```bash
#!/bin/bash
DOMAIN=$1
echo | openssl s_client -connect "${DOMAIN}:443" -servername "${DOMAIN}" 2>/dev/null \
  | openssl x509 -noout -enddate
```

---

## Quick Tool

Use **[DevToolBox PEM Decoder](https://viadreams.cc/en/tools/pem-decoder)** — decode and inspect SSL certificates and PEM keys instantly online.

---

*Inspect certificates with [DevToolBox's free PEM Decoder](https://viadreams.cc/en/tools/pem-decoder).*
