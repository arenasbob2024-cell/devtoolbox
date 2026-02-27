'use client';

import Link from 'next/link';

const translations = {
  en: {
    title: 'PEM Decoder: Decode SSL Certificates and Keys Online — Complete Guide',
    description: 'Decode and inspect PEM files, SSL certificates, and private keys. Complete guide with OpenSSL commands, Node.js tls module, Python cryptography library, certificate chains, mTLS, and Let\'s Encrypt.',
  },
  zh: {
    title: 'PEM 解码器：在线解码 SSL 证书和密钥 — 完整指南',
    description: 'PEM 文件、SSL 证书和私钥的解码与检查完整指南。含 OpenSSL 命令、Node.js tls 模块、Python cryptography 库、证书链、mTLS 和 Let\'s Encrypt。',
  },
};

export default function PemDecoderOnlineGuide({ lang }: { lang: string }) {
  const t = translations[lang as keyof typeof translations] || translations.en;

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is a PEM file and what does it contain?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'PEM (Privacy Enhanced Mail) is a Base64-encoded container format used to store cryptographic objects such as X.509 certificates, private keys, certificate signing requests (CSRs), and certificate chains. A PEM file is a text file with a header line like "-----BEGIN CERTIFICATE-----", followed by Base64-encoded DER data, and closed with "-----END CERTIFICATE-----". PEM was originally designed for secure email but is now universally used for SSL/TLS certificates, SSH keys, and code signing. You can have multiple PEM blocks in a single file (useful for certificate chains).',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the difference between PEM, DER, PKCS#7, and PKCS#12 formats?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'PEM is a Base64-encoded text format (uses .pem, .crt, .cer, .key extensions) that is human-readable and supports multiple blocks. DER (Distinguished Encoding Rules) is the binary version of the same data (uses .der, .cer extensions) — it cannot be viewed as text. PKCS#7 (.p7b, .p7c) is a container that holds one or more certificates and optionally a certificate chain but cannot contain private keys. PKCS#12 (.pfx, .p12) is a binary format that can bundle a certificate, its private key, and the full certificate chain in a password-protected file — commonly used in Windows environments and for importing into browsers and keystores.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I decode a PEM certificate with OpenSSL?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'To decode a PEM certificate with OpenSSL, run: openssl x509 -in certificate.pem -text -noout. This displays all X.509 fields including subject, issuer, validity dates, subject alternative names (SANs), public key algorithm, key size, extensions, and the signature algorithm. For a CSR: openssl req -in request.csr -text -noout. For a private key: openssl rsa -in private.key -text -noout (RSA) or openssl ec -in private.key -text -noout (EC). To check if a certificate and private key match, compare their public key modulus using openssl x509 -noout -modulus -in cert.pem | md5sum and openssl rsa -noout -modulus -in key.pem | md5sum — they should be identical.',
        },
      },
      {
        '@type': 'Question',
        name: 'What are Subject Alternative Names (SANs) and why do they matter?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Subject Alternative Names (SANs) are X.509 certificate extensions that list all the domain names and IP addresses the certificate is valid for. Modern browsers require SANs — the Common Name (CN) field is no longer trusted for hostname validation since Chrome 58 (2017). A certificate might have SANs like: DNS:example.com, DNS:www.example.com, DNS:*.example.com (wildcard), IP:192.168.1.1. A wildcard SAN (*.example.com) covers all single-level subdomains (www.example.com, api.example.com) but not deeper nesting (sub.api.example.com). You can view SANs with: openssl x509 -in cert.pem -text -noout | grep -A1 "Subject Alternative Name".',
        },
      },
      {
        '@type': 'Question',
        name: 'How do certificate chains work and what is the chain of trust?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'A certificate chain consists of: (1) Root CA — a self-signed certificate from a trusted Certificate Authority, stored in the operating system or browser trust store. (2) Intermediate CA — a certificate signed by the root CA, used to sign end-entity certificates (insulates the root key from daily use). (3) Leaf certificate — the end-entity certificate for your domain, signed by the intermediate CA. Browsers verify the chain by working up from the leaf to a trusted root. A common error "certificate chain incomplete" occurs when the server does not send the intermediate certificate. You can verify a chain with: openssl verify -CAfile ca-bundle.pem certificate.pem.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is mTLS (mutual TLS) and when should I use it?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Mutual TLS (mTLS) requires both the client and server to present X.509 certificates during the TLS handshake, providing two-way authentication. Standard TLS only authenticates the server. mTLS use cases include: API-to-API authentication in microservices (service mesh like Istio uses mTLS internally), IoT device authentication, zero-trust network access, and high-security financial APIs. In mTLS, the server has a CA certificate that it uses to verify client certificates, and clients have their own certificate and private key. The handshake proves identity without usernames or API keys.',
        },
      },
      {
        '@type': 'Question',
        name: 'How does Let\'s Encrypt issue free SSL certificates?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Let\'s Encrypt uses the ACME (Automatic Certificate Management Environment) protocol. The process: (1) Your server requests a certificate for a domain. (2) Let\'s Encrypt issues a challenge (HTTP-01: place a file at /.well-known/acme-challenge/, or DNS-01: add a TXT record). (3) Let\'s Encrypt verifies you control the domain by checking the challenge. (4) Let\'s Encrypt issues a 90-day certificate signed by its intermediate CA. Certbot automates this: "certbot --nginx -d example.com" installs and configures the cert. Certificates renew automatically with "certbot renew" (typically run via a cron job). Wildcard certificates require DNS-01 challenge.',
        },
      },
      {
        '@type': 'Question',
        name: 'What causes SSL certificate errors and how do I fix them?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Common SSL errors and fixes: (1) ERR_CERT_AUTHORITY_INVALID — the certificate was issued by an untrusted CA (self-signed, expired root, or unknown CA). Fix: use a certificate from a trusted CA like Let\'s Encrypt, or add the CA to your trust store for internal use. (2) ERR_CERT_DATE_INVALID / Certificate expired — the certificate is past its validity period. Fix: renew the certificate immediately; set up automated renewal. (3) ERR_CERT_COMMON_NAME_INVALID / Hostname mismatch — the domain in the URL does not match any SAN or CN in the certificate. Fix: request a new certificate that includes the correct domains. (4) Incomplete chain — the server is not sending the intermediate certificate. Fix: concatenate the intermediate certificate to your server certificate file.',
        },
      },
    ],
  };

  return (
    <article style={{ lineHeight: '1.7', color: '#334155' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Canonical meta */}
      <link rel="canonical" href="https://viadreams.cc/en/blog/pem-decoder-online-guide" />

      {/* TL;DR Box */}
      <div style={{ background: '#f0f9ff', border: '1px solid #bae6fd', borderRadius: '8px', padding: '1rem', marginBottom: '1.5rem' }}>
        <p style={{ fontWeight: 700, marginBottom: '0.5rem', color: '#0369a1' }}>TL;DR</p>
        <p style={{ margin: 0 }}>
          A <strong>PEM file</strong> is a Base64-encoded container for X.509 certificates, private keys, and CSRs.
          Use <code>openssl x509 -in cert.pem -text -noout</code> to decode any certificate and inspect its subject,
          SANs, expiry, and chain. Use <strong>Node.js tls module</strong> or the <strong>Python cryptography library</strong>{' '}
          for programmatic certificate inspection. For local development, use <strong>mkcert</strong> to generate trusted
          self-signed certificates. For production, use <strong>Let&apos;s Encrypt + certbot</strong> for free, auto-renewing certs.
          Try our free{' '}
          <Link href={`/${lang}/tools/pem-decoder`} style={{ color: '#0284c7' }}>online PEM decoder</Link> to instantly
          inspect any certificate or key without installing tools.
        </p>
      </div>

      {/* Section 1: What is PEM Format */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        What Is PEM Format? Privacy Enhanced Mail Explained
      </h2>
      <p>
        <strong>PEM (Privacy Enhanced Mail)</strong> is a Base64-encoded text format used to store cryptographic
        objects. Despite its name — originally designed for securing email in the 1990s — PEM is now the universal
        format for SSL/TLS certificates, RSA and EC private keys, certificate signing requests, and Diffie-Hellman
        parameters. You interact with PEM files every time you configure HTTPS, deploy an SSH key, or generate a
        TLS certificate.
      </p>
      <p>
        A PEM file is identified by its <strong>header and footer lines</strong>. The data between them is Base64-encoded
        DER (Distinguished Encoding Rules) — the binary ASN.1 representation of the cryptographic structure. PEM files
        are plain text, making them easy to copy-paste, version-control, and transmit over email or Slack.
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`-----BEGIN CERTIFICATE-----
MIIFazCCA1OgAwIBAgIRAIIQz7DSQONZRGPgu2OCiwAwDQYJKoZIhvcNAQELBQAw
TzELMAkGA1UEBhMCVVMxKTAnBgNVBAoTIEludGVybmV0IFNlY3VyaXR5IFJlc2Vh
cmNoIEdyb3VwMRUwEwYDVQQDEwxJU1JHIFJvb3QgWDEwHhcNMTUwNjA0MTEwNDM4
WhcNMzUwNjA0MTEwNDM4WjBPMQswCQYDVQQGEwJVUzEpMCcGA1UEChMgSW50ZXJu
...
-----END CERTIFICATE-----`}</code></pre>
      <p>
        The header format <code>-----BEGIN TYPE-----</code> identifies the content. Common PEM types include:
      </p>
      <ul>
        <li><code>-----BEGIN CERTIFICATE-----</code> — an X.509 certificate (server, intermediate, or root CA)</li>
        <li><code>-----BEGIN PRIVATE KEY-----</code> — PKCS#8 unencrypted private key (RSA or EC)</li>
        <li><code>-----BEGIN RSA PRIVATE KEY-----</code> — PKCS#1 RSA private key (legacy OpenSSL format)</li>
        <li><code>-----BEGIN EC PRIVATE KEY-----</code> — raw EC private key</li>
        <li><code>-----BEGIN ENCRYPTED PRIVATE KEY-----</code> — password-protected PKCS#8 private key</li>
        <li><code>-----BEGIN CERTIFICATE REQUEST-----</code> — a CSR (Certificate Signing Request)</li>
        <li><code>-----BEGIN PUBLIC KEY-----</code> — a standalone public key</li>
        <li><code>-----BEGIN DH PARAMETERS-----</code> — Diffie-Hellman key exchange parameters</li>
      </ul>
      <p>
        A single PEM file can contain <strong>multiple blocks</strong>. This is commonly used for certificate chains:
        the leaf certificate first, followed by intermediate certificates, with the root CA last (or omitted, since
        it is in the trust store). Most web servers (Nginx, Apache, Caddy) expect the full chain in a single PEM file.
      </p>

      {/* Section 2: PEM vs DER vs PKCS formats */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        PEM vs DER vs PKCS#7 vs PKCS#12 vs JKS — Format Comparison
      </h2>
      <p>
        Choosing the right certificate format matters because different systems, tools, and platforms expect specific formats.
        Here is a complete comparison:
      </p>
      <div style={{ overflowX: 'auto', marginBottom: '1rem' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
          <thead>
            <tr style={{ background: '#f1f5f9' }}>
              <th style={{ padding: '10px 12px', textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>Format</th>
              <th style={{ padding: '10px 12px', textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>Extensions</th>
              <th style={{ padding: '10px 12px', textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>Encoding</th>
              <th style={{ padding: '10px 12px', textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>Can Hold Private Key</th>
              <th style={{ padding: '10px 12px', textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>Use Case</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}><strong>PEM</strong></td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>.pem, .crt, .cer, .key</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Base64 text</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0', color: '#16a34a' }}>Yes</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Linux/macOS servers, Nginx, Apache, Node.js, Python</td>
            </tr>
            <tr style={{ background: '#fafafa' }}>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}><strong>DER</strong></td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>.der, .cer</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Binary (ASN.1)</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0', color: '#16a34a' }}>Yes</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Java, Android, Windows CryptoAPI, some IoT devices</td>
            </tr>
            <tr>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}><strong>PKCS#7</strong></td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>.p7b, .p7c</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Base64 or binary</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0', color: '#dc2626' }}>No</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Windows IIS, certificate chain distribution, S/MIME email</td>
            </tr>
            <tr style={{ background: '#fafafa' }}>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}><strong>PKCS#12</strong></td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>.pfx, .p12</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Binary (password-protected)</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0', color: '#16a34a' }}>Yes (encrypted)</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Windows, Azure, AWS ACM import, browser client certs</td>
            </tr>
            <tr>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}><strong>JKS</strong></td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>.jks</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Binary (Java KeyStore)</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0', color: '#16a34a' }}>Yes (password-protected)</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Java (Tomcat, Spring Boot, Kafka) — replaced by PKCS#12 in Java 9+</td>
            </tr>
          </tbody>
        </table>
      </div>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`# Convert PEM to DER
openssl x509 -in cert.pem -outform DER -out cert.der

# Convert DER to PEM
openssl x509 -in cert.der -inform DER -outform PEM -out cert.pem

# Convert PEM certificate + key to PKCS#12
openssl pkcs12 -export -out bundle.pfx -inkey private.key -in cert.pem -certfile chain.pem

# Extract PEM certificate from PKCS#12
openssl pkcs12 -in bundle.pfx -nokeys -out cert.pem

# Extract private key from PKCS#12 (prompts for import password)
openssl pkcs12 -in bundle.pfx -nocerts -nodes -out private.key

# Convert PEM to PKCS#7 (for Windows IIS)
openssl crl2pkcs7 -nocrl -certfile cert.pem -certfile chain.pem -out bundle.p7b`}</code></pre>

      {/* Section 3: SSL/TLS Certificate Anatomy */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        SSL/TLS Certificate Anatomy — X.509 Fields Explained
      </h2>
      <p>
        An X.509 certificate is a structured data object that binds a public key to an identity. Understanding each
        field helps you debug certificate issues and make sense of OpenSSL output. Here is a detailed breakdown of
        every important field in a typical TLS certificate:
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`$ openssl x509 -in cert.pem -text -noout

Certificate:
    Data:
        Version: 3 (0x2)                    # X.509 version (v3 supports extensions)
        Serial Number:                       # Unique number assigned by the CA
            03:e5:b9:cd:2c:53:a4:5c:e0:db:d2:74:82:f9:6d:e4:4e:2f
        Signature Algorithm: sha256WithRSAEncryption   # Hash + signing algorithm
        Issuer: C=US, O=Let's Encrypt, CN=R3  # Who signed this certificate
        Validity
            Not Before: Jan 15 12:00:00 2026 GMT   # Start of validity period
            Not After : Apr 15 12:00:00 2026 GMT   # Expiry (90 days for LE)
        Subject: CN=example.com               # The entity this cert identifies
        Subject Public Key Info:
            Public Key Algorithm: rsaEncryption
                Public-Key: (2048 bit)        # RSA key size (prefer 2048 or 4096)
                Modulus: ...
                Exponent: 65537 (0x10001)
        X509v3 extensions:
            X509v3 Subject Alternative Name:  # CRITICAL: domains this cert covers
                DNS:example.com, DNS:www.example.com
            X509v3 Key Usage:
                Digital Signature, Key Encipherment
            X509v3 Extended Key Usage:
                TLS Web Server Authentication, TLS Web Client Authentication
            X509v3 Basic Constraints:
                CA:FALSE                      # FALSE = leaf cert, TRUE = CA cert
            X509v3 Authority Key Identifier:
                keyid:77:4B:B0:E3:...         # Links to issuer's public key
            X509v3 Subject Key Identifier:
                AB:CD:EF:01:...               # Fingerprint of this cert's public key
            Authority Information Access:
                OCSP - URI:http://r3.o.lencr.org    # Online cert status check
                CA Issuers - URI:http://r3.i.lencr.org/  # Where to get issuer cert
            X509v3 Certificate Policies:
                Policy: 2.23.140.1.2.1        # OV/DV/EV policy OID
            X509v3 CRL Distribution Points:
                URI:http://r3.crl.lencr.org   # Where to check revocation list
    Signature Algorithm: sha256WithRSAEncryption
        Signature: ...                        # CA's signature over all the above data`}</code></pre>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Key Fields Deep Dive
      </h3>
      <ul>
        <li>
          <strong>Subject vs Issuer</strong>: Subject is the entity the cert belongs to; Issuer is who signed it.
          For root CAs, Subject and Issuer are identical (self-signed). For leaf certs, Issuer is the intermediate CA.
        </li>
        <li>
          <strong>Subject Alternative Names (SANs)</strong>: The list of domains and IPs the cert covers. Chrome
          deprecated the CN field for hostname validation in 2017 — SANs are now required. Wildcard certs
          (<code>*.example.com</code>) cover one subdomain level only.
        </li>
        <li>
          <strong>Key Usage vs Extended Key Usage</strong>: Key Usage defines cryptographic operations (Digital
          Signature, Key Encipherment). Extended Key Usage specifies application-level use (TLS server auth,
          TLS client auth, code signing, email protection).
        </li>
        <li>
          <strong>Basic Constraints CA:FALSE</strong>: Prevents a leaf certificate from being used to sign other
          certificates. Certificate Authorities have CA:TRUE. This is critical for the chain of trust.
        </li>
        <li>
          <strong>OCSP and CRL</strong>: Online Certificate Status Protocol (OCSP) and Certificate Revocation
          Lists (CRL) let browsers check if a certificate has been revoked before trusting it. OCSP stapling
          allows servers to cache and serve the OCSP response, improving performance.
        </li>
      </ul>

      {/* Section 4: OpenSSL Commands */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        Essential OpenSSL Commands for PEM Files
      </h2>
      <p>
        OpenSSL is the Swiss Army knife of certificate operations. Here are the most important commands every
        developer and DevOps engineer should know:
      </p>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Inspecting Certificates and Keys
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`# Decode and display a certificate (most common command)
openssl x509 -in cert.pem -text -noout

# Show only specific fields
openssl x509 -in cert.pem -noout -subject      # Subject DN
openssl x509 -in cert.pem -noout -issuer       # Issuer DN
openssl x509 -in cert.pem -noout -dates        # Not Before / Not After
openssl x509 -in cert.pem -noout -fingerprint -sha256   # SHA-256 fingerprint
openssl x509 -in cert.pem -noout -serial       # Serial number

# Show Subject Alternative Names
openssl x509 -in cert.pem -text -noout | grep -A1 "Subject Alternative"

# Check certificate expiry (useful in scripts)
openssl x509 -in cert.pem -noout -enddate
# Output: notAfter=Apr 15 12:00:00 2026 GMT

# Check days until expiry (Unix trick)
openssl x509 -in cert.pem -noout -checkend 2592000  # 30 days in seconds
# Exit code 0 = still valid, 1 = expires within 30 days

# Decode a CSR
openssl req -in request.csr -text -noout

# Inspect a private key
openssl rsa -in private.key -text -noout   # RSA key
openssl ec -in ec.key -text -noout         # EC key

# Check if certificate and private key match (modulus should be identical)
openssl x509 -noout -modulus -in cert.pem | md5sum
openssl rsa -noout -modulus -in private.key | md5sum

# For EC keys
openssl x509 -noout -pubkey -in cert.pem | openssl md5
openssl ec -pubout -in ec.key 2>/dev/null | openssl md5`}</code></pre>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Verifying Certificate Chains and SSL Connections
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`# Verify a certificate against a CA bundle
openssl verify -CAfile /etc/ssl/certs/ca-certificates.crt cert.pem

# Verify against a specific CA file
openssl verify -CAfile ca.pem -untrusted intermediate.pem cert.pem

# Test an SSL connection to a live server (like curl -v for TLS)
openssl s_client -connect example.com:443

# Show the full certificate chain from a live server
openssl s_client -connect example.com:443 -showcerts 2>/dev/null | \
  openssl x509 -text -noout

# Check certificate expiry of a live server
openssl s_client -connect example.com:443 -servername example.com 2>/dev/null | \
  openssl x509 -noout -dates

# Test STARTTLS (for SMTP, IMAP, LDAP)
openssl s_client -connect mail.example.com:587 -starttls smtp
openssl s_client -connect imap.example.com:143 -starttls imap

# Save the server certificate to a file
openssl s_client -connect example.com:443 </dev/null 2>/dev/null | \
  openssl x509 -outform PEM -out server.pem

# Check if a specific TLS version is supported
openssl s_client -connect example.com:443 -tls1_2
openssl s_client -connect example.com:443 -tls1_3`}</code></pre>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Generating Keys and Certificates
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`# Generate a 4096-bit RSA private key
openssl genrsa -out private.key 4096

# Generate an EC key (P-256, recommended over RSA for new deployments)
openssl ecparam -name prime256v1 -genkey -noout -out ec.key

# Generate a CSR from an existing key
openssl req -new -key private.key -out request.csr \
  -subj "/C=US/ST=California/L=San Francisco/O=Example Corp/CN=example.com"

# Generate a CSR with SANs (using a config file)
cat > csr.conf << EOF
[req]
distinguished_name = req_distinguished_name
req_extensions = v3_req
prompt = no

[req_distinguished_name]
C = US
ST = California
O = Example Corp
CN = example.com

[v3_req]
subjectAltName = @alt_names

[alt_names]
DNS.1 = example.com
DNS.2 = www.example.com
DNS.3 = api.example.com
EOF

openssl req -new -key private.key -out request.csr -config csr.conf

# Self-signed certificate (for development only)
openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -days 365 -nodes \
  -subj "/CN=localhost"

# Self-signed certificate with SANs
openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -days 365 -nodes \
  -subj "/CN=localhost" \
  -addext "subjectAltName=DNS:localhost,IP:127.0.0.1"`}</code></pre>

      {/* Section 5: Node.js tls and crypto */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        Node.js — tls and crypto Modules for Certificate Inspection
      </h2>
      <p>
        Node.js provides built-in modules for working with PEM files. The <code>tls</code> module handles TLS
        connections, while <code>crypto</code> provides low-level certificate parsing. Use these for server-side
        certificate validation, expiry monitoring, and custom TLS configurations.
      </p>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Reading and Parsing PEM Certificate Details
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`import * as tls from 'tls';
import * as fs from 'fs';
import * as crypto from 'crypto';

// Read a PEM certificate and parse its details
function parseCertificate(pemPath: string) {
  const pem = fs.readFileSync(pemPath, 'utf8');

  // Use crypto.X509Certificate (Node.js 15.6+)
  const cert = new crypto.X509Certificate(pem);

  console.log('Subject:', cert.subject);
  // => CN=example.com

  console.log('Issuer:', cert.issuer);
  // => C=US\nO=Let's Encrypt\nCN=R3

  console.log('Valid From:', cert.validFrom);
  console.log('Valid To:', cert.validTo);

  console.log('SubjectAltName:', cert.subjectAltName);
  // => DNS:example.com, DNS:www.example.com

  console.log('Serial Number:', cert.serialNumber);
  console.log('Key Type:', cert.publicKey.asymmetricKeyType);   // 'rsa' | 'ec' | 'ed25519'
  console.log('Fingerprint SHA-256:', cert.fingerprint256);

  // Check if certificate is expired
  const now = new Date();
  const expiry = new Date(cert.validTo);
  const daysLeft = Math.floor((expiry.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

  if (daysLeft < 0) {
    console.error('Certificate EXPIRED', daysLeft, 'days ago');
  } else if (daysLeft < 30) {
    console.warn('Certificate expires in', daysLeft, 'days — renew soon!');
  } else {
    console.log('Certificate valid for', daysLeft, 'more days');
  }

  return cert;
}

parseCertificate('./cert.pem');`}</code></pre>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        tls.connect — Custom CA and Client Certificate Authentication
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`import * as tls from 'tls';
import * as fs from 'fs';

// Standard HTTPS connection with custom CA (for internal PKI)
const options: tls.ConnectionOptions = {
  host: 'internal-api.company.com',
  port: 443,
  ca: fs.readFileSync('./internal-ca.pem'), // Trust our internal CA
  checkServerIdentity: tls.checkServerIdentity, // Use default hostname check
};

const socket = tls.connect(options, () => {
  if (socket.authorized) {
    console.log('Connected, server authorized');
  } else {
    console.error('Server authorization failed:', socket.authorizationError);
  }

  // Inspect the server's certificate
  const serverCert = socket.getPeerCertificate(true); // true = include chain
  console.log('Server CN:', serverCert.subject.CN);
  console.log('SANs:', serverCert.subjectaltname);
  console.log('Issuer:', serverCert.issuer.CN);
  console.log('Valid Until:', serverCert.valid_to);

  socket.write('GET / HTTP/1.1\\r\\nHost: internal-api.company.com\\r\\n\\r\\n');
});

socket.on('data', (data) => {
  console.log('Response:', data.toString());
  socket.end();
});

// mTLS connection — client also presents a certificate
const mtlsOptions: tls.ConnectionOptions = {
  host: 'mtls-api.company.com',
  port: 8443,
  cert: fs.readFileSync('./client.pem'),        // Client certificate
  key: fs.readFileSync('./client-key.pem'),     // Client private key
  ca: fs.readFileSync('./server-ca.pem'),        // CA that signed the server cert
};

const mtlsSocket = tls.connect(mtlsOptions, () => {
  console.log('mTLS connection established');
  console.log('Server authorized:', mtlsSocket.authorized);
});`}</code></pre>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Certificate Expiry Monitoring Service
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`import * as tls from 'tls';
import * as crypto from 'crypto';

// Check certificate expiry for a live domain
function checkCertExpiry(hostname: string, port = 443): Promise<{
  hostname: string;
  daysLeft: number;
  validTo: Date;
  issuer: string;
  sans: string;
}> {
  return new Promise((resolve, reject) => {
    const socket = tls.connect({ host: hostname, port, servername: hostname }, () => {
      const cert = socket.getPeerCertificate();
      socket.destroy();

      const validTo = new Date(cert.valid_to);
      const daysLeft = Math.floor(
        (validTo.getTime() - Date.now()) / (1000 * 60 * 60 * 24)
      );

      resolve({
        hostname,
        daysLeft,
        validTo,
        issuer: cert.issuer.O || cert.issuer.CN,
        sans: cert.subjectaltname || '',
      });
    });

    socket.on('error', reject);
    socket.setTimeout(5000, () => {
      socket.destroy();
      reject(new Error(\`Timeout connecting to \${hostname}:\${port}\`));
    });
  });
}

// Monitor multiple domains
async function monitorCertificates(domains: string[]) {
  const results = await Promise.allSettled(
    domains.map(d => checkCertExpiry(d))
  );

  for (const result of results) {
    if (result.status === 'fulfilled') {
      const { hostname, daysLeft, validTo, issuer } = result.value;
      if (daysLeft < 14) {
        console.error(\`CRITICAL: \${hostname} expires in \${daysLeft} days (\${validTo.toDateString()})\`);
      } else if (daysLeft < 30) {
        console.warn(\`WARNING: \${hostname} expires in \${daysLeft} days\`);
      } else {
        console.log(\`OK: \${hostname} — \${daysLeft} days left (\${issuer})\`);
      }
    } else {
      console.error(\`ERROR: \${result.reason}\`);
    }
  }
}

await monitorCertificates([
  'example.com', 'api.example.com', 'admin.example.com'
]);`}</code></pre>

      {/* Section 6: Python cryptography library */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        Python — cryptography Library for PEM Parsing
      </h2>
      <p>
        The Python <code>cryptography</code> library (install: <code>pip install cryptography</code>) is the
        authoritative Python library for certificate and key operations. It provides high-level primitives for
        loading, inspecting, and validating X.509 certificates and private keys.
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`from cryptography import x509
from cryptography.hazmat.backends import default_backend
from cryptography.hazmat.primitives import hashes, serialization
from cryptography.x509.oid import NameOID, ExtensionOID
from datetime import datetime, timezone
import datetime as dt

# Load and parse a PEM certificate
def parse_pem_certificate(pem_path: str):
    with open(pem_path, 'rb') as f:
        cert = x509.load_pem_x509_certificate(f.read(), default_backend())

    # Subject fields
    try:
        cn = cert.subject.get_attributes_for_oid(NameOID.COMMON_NAME)[0].value
        print(f"Common Name: {cn}")
    except IndexError:
        print("No CN in subject")

    # Organization
    try:
        org = cert.subject.get_attributes_for_oid(NameOID.ORGANIZATION_NAME)[0].value
        print(f"Organization: {org}")
    except IndexError:
        pass

    # Issuer
    try:
        issuer_cn = cert.issuer.get_attributes_for_oid(NameOID.COMMON_NAME)[0].value
        print(f"Issuer: {issuer_cn}")
    except IndexError:
        pass

    # Validity dates
    # Use timezone-aware comparison (Python 3.11+ returns aware datetime)
    not_before = cert.not_valid_before_utc  # Python 3.11+
    not_after = cert.not_valid_after_utc
    print(f"Valid From: {not_before}")
    print(f"Valid To: {not_after}")

    now = datetime.now(timezone.utc)
    days_left = (not_after - now).days
    print(f"Days Until Expiry: {days_left}")

    # Serial number
    print(f"Serial Number: {hex(cert.serial_number)}")

    # Fingerprint
    fingerprint = cert.fingerprint(hashes.SHA256())
    print(f"SHA-256 Fingerprint: {fingerprint.hex()}")

    # Subject Alternative Names
    try:
        san_ext = cert.extensions.get_extension_for_oid(
            ExtensionOID.SUBJECT_ALTERNATIVE_NAME
        )
        sans = san_ext.value.get_values_for_type(x509.DNSName)
        ip_sans = san_ext.value.get_values_for_type(x509.IPAddress)
        print(f"DNS SANs: {', '.join(sans)}")
        print(f"IP SANs: {', '.join(str(ip) for ip in ip_sans)}")
    except x509.extensions.ExtensionNotFound:
        print("No SAN extension")

    # Key usage
    try:
        ku = cert.extensions.get_extension_for_oid(ExtensionOID.KEY_USAGE).value
        print(f"Key Usage: digital_signature={ku.digital_signature}, "
              f"key_encipherment={ku.key_encipherment}")
    except x509.extensions.ExtensionNotFound:
        pass

    # Basic constraints
    try:
        bc = cert.extensions.get_extension_for_oid(ExtensionOID.BASIC_CONSTRAINTS).value
        print(f"Is CA: {bc.ca}")
    except x509.extensions.ExtensionNotFound:
        pass

    return cert

cert = parse_pem_certificate("cert.pem")`}</code></pre>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Loading Private Keys and Certificate Chain Validation
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`from cryptography.hazmat.primitives.serialization import (
    load_pem_private_key, Encoding, PublicFormat
)
from cryptography.hazmat.backends import default_backend

# Load an unencrypted PEM private key
def load_private_key(key_path: str, password: bytes = None):
    with open(key_path, 'rb') as f:
        private_key = load_pem_private_key(
            f.read(),
            password=password,  # None if not password-protected
            backend=default_backend()
        )

    key_type = type(private_key).__name__
    print(f"Key Type: {key_type}")  # RSAPrivateKey, EllipticCurvePrivateKey, etc.

    if hasattr(private_key, 'key_size'):
        print(f"Key Size: {private_key.key_size} bits")  # RSA key size

    # Extract the public key (to compare with certificate)
    public_key = private_key.public_key()
    pub_pem = public_key.public_bytes(Encoding.PEM, PublicFormat.SubjectPublicKeyInfo)
    print(f"Public Key (PEM):\\n{pub_pem.decode()}")

    return private_key

# Verify that a certificate and private key match
def cert_key_match(cert_path: str, key_path: str) -> bool:
    from cryptography import x509
    with open(cert_path, 'rb') as f:
        cert = x509.load_pem_x509_certificate(f.read(), default_backend())
    with open(key_path, 'rb') as f:
        key = load_pem_private_key(f.read(), None, default_backend())

    # Extract public key from both and compare
    cert_pub = cert.public_key().public_bytes(Encoding.PEM, PublicFormat.SubjectPublicKeyInfo)
    key_pub = key.public_key().public_bytes(Encoding.PEM, PublicFormat.SubjectPublicKeyInfo)
    return cert_pub == key_pub

print("Key matches cert:", cert_key_match("cert.pem", "private.key"))

# Generate a certificate chain verification check
def check_cert_expiry_days(cert_path: str) -> int:
    from cryptography import x509
    from datetime import datetime, timezone
    with open(cert_path, 'rb') as f:
        cert = x509.load_pem_x509_certificate(f.read(), default_backend())
    return (cert.not_valid_after_utc - datetime.now(timezone.utc)).days`}</code></pre>

      {/* Section 7: Certificate Chain Validation */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        Certificate Chain Validation — Root CA, Intermediate CA, and Leaf
      </h2>
      <p>
        The certificate chain is the backbone of the PKI (Public Key Infrastructure) trust model. Understanding
        how chains work is essential for debugging SSL errors and configuring servers correctly.
      </p>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Chain Structure
      </h3>
      <ul>
        <li>
          <strong>Root CA Certificate</strong>: Self-signed certificate from a top-level Certificate Authority
          (DigiCert, Comodo, Let&apos;s Encrypt ISRG Root X1). Root certificates are pre-installed in operating systems
          and browsers. The root CA private key is kept offline in a Hardware Security Module (HSM) and used
          only to sign intermediate CA certificates.
        </li>
        <li>
          <strong>Intermediate CA Certificate</strong>: Signed by the root CA. Intermediate CAs do the day-to-day
          work of signing leaf certificates. If an intermediate CA is compromised, it can be revoked without
          invalidating the root. Modern PKIs use one or more intermediates between the root and leaf.
        </li>
        <li>
          <strong>Leaf Certificate</strong>: The end-entity certificate for your domain. Signed by the intermediate CA.
          This is what your web server presents to browsers. It should have <code>CA:FALSE</code> in Basic Constraints.
        </li>
      </ul>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`# Build and verify a certificate chain
# Step 1: Download the intermediate certificate (from Authority Information Access)
openssl x509 -in cert.pem -text -noout | grep "CA Issuers"
# => CA Issuers - URI:http://r3.i.lencr.org/

curl -s http://r3.i.lencr.org/ | openssl x509 -inform DER -out intermediate.pem

# Step 2: Assemble the chain file (leaf + intermediate)
cat cert.pem intermediate.pem > fullchain.pem

# Step 3: Verify the chain
openssl verify -CAfile /etc/ssl/certs/ca-certificates.crt \
  -untrusted intermediate.pem cert.pem
# => cert.pem: OK

# Step 4: Check what the server is sending
openssl s_client -connect example.com:443 -showcerts 2>/dev/null | \
  grep -E "^(subject|issuer|---)"

# Nginx configuration for full chain
# nginx.conf:
# ssl_certificate     /etc/ssl/fullchain.pem;  # Leaf + intermediate(s)
# ssl_certificate_key /etc/ssl/private.key;

# Apache configuration
# SSLCertificateFile    /etc/ssl/cert.pem
# SSLCertificateKeyFile /etc/ssl/private.key
# SSLCertificateChainFile /etc/ssl/intermediate.pem`}</code></pre>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Chain Validation in Python
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`# Python: verify a certificate chain using pyOpenSSL
# pip install pyopenssl
from OpenSSL import crypto

def verify_cert_chain(cert_pem: bytes, chain_pems: list[bytes], ca_pem: bytes) -> bool:
    """
    Verify that cert_pem is signed by one of the chain_pems,
    which is ultimately signed by ca_pem (trusted root).
    """
    store = crypto.X509Store()

    # Add trusted root CA
    root = crypto.load_certificate(crypto.FILETYPE_PEM, ca_pem)
    store.add_cert(root)

    # Create store context
    ctx = crypto.X509StoreContext(store,
        crypto.load_certificate(crypto.FILETYPE_PEM, cert_pem),
        [crypto.load_certificate(crypto.FILETYPE_PEM, c) for c in chain_pems]
    )

    try:
        ctx.verify_certificate()
        return True
    except crypto.X509StoreContextError as e:
        print(f"Chain validation failed: {e}")
        return False

# Usage
with open('cert.pem', 'rb') as f:
    cert_pem = f.read()
with open('intermediate.pem', 'rb') as f:
    chain_pems = [f.read()]
with open('root-ca.pem', 'rb') as f:
    ca_pem = f.read()

print("Valid chain:", verify_cert_chain(cert_pem, chain_pems, ca_pem))`}</code></pre>

      {/* Section 8: Self-signed Certificates */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        Self-Signed Certificates — Development, mkcert, and When to Use Them
      </h2>
      <p>
        A <strong>self-signed certificate</strong> is signed by its own private key (the subject and issuer are
        identical). Browsers and systems reject self-signed certificates by default because there is no chain
        to a trusted root CA — leading to security warnings. However, for local development and internal
        testing, self-signed certs are often the right choice.
      </p>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        mkcert — Locally Trusted Development Certificates
      </h3>
      <p>
        <strong>mkcert</strong> is the best tool for local development TLS. It creates a local CA, installs it
        in your system&apos;s and browsers&apos; trust stores, then issues certificates signed by that CA. The result:
        no browser warnings, proper HTTPS on localhost.
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`# Install mkcert
# macOS:
brew install mkcert
# Linux:
sudo apt install mkcert
# Windows (Chocolatey):
choco install mkcert

# Install the local CA into system trust stores (run once)
mkcert -install
# Installs CA into: macOS Keychain, Firefox NSS, system store

# Generate a certificate for localhost
mkcert localhost 127.0.0.1 ::1
# Creates: localhost+2.pem (cert) and localhost+2-key.pem (key)

# Generate for custom local domains
mkcert myapp.local api.myapp.local
# Creates: myapp.local+1.pem and myapp.local+1-key.pem

# Use with Node.js HTTPS server
import https from 'https';
import fs from 'fs';

const server = https.createServer({
  cert: fs.readFileSync('localhost+2.pem'),
  key: fs.readFileSync('localhost+2-key.pem'),
}, (req, res) => {
  res.end('Hello HTTPS!');
});

server.listen(443, () => console.log('https://localhost'));

# Use with Next.js dev server (next.config.js):
# npx next dev does not natively support HTTPS — use a reverse proxy or Caddy

# Caddy for automatic HTTPS (production):
# caddy reverse-proxy --from example.com --to localhost:3000
# (Caddy handles Let's Encrypt certificate issuance automatically)`}</code></pre>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        When to Use Self-Signed vs Proper CA Certificates
      </h3>
      <div style={{ overflowX: 'auto', marginBottom: '1rem' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
          <thead>
            <tr style={{ background: '#f1f5f9' }}>
              <th style={{ padding: '10px 12px', textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>Scenario</th>
              <th style={{ padding: '10px 12px', textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>Recommendation</th>
              <th style={{ padding: '10px 12px', textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>Tool</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Local development (localhost)</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0', color: '#16a34a' }}>mkcert (locally trusted)</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>mkcert</td>
            </tr>
            <tr style={{ background: '#fafafa' }}>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Internal services (not internet-facing)</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0', color: '#16a34a' }}>Internal CA or self-signed (with custom CA)</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>OpenSSL, step-ca, HashiCorp Vault PKI</td>
            </tr>
            <tr>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Production public-facing website</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0', color: '#16a34a' }}>Let&apos;s Encrypt (free, auto-renew)</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>certbot, Caddy, Traefik</td>
            </tr>
            <tr style={{ background: '#fafafa' }}>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>EV certificates for financial sites</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0', color: '#16a34a' }}>Paid CA (DigiCert, Sectigo)</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Manual CA validation process</td>
            </tr>
            <tr>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>IoT / mTLS (service auth)</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0', color: '#16a34a' }}>Private CA with short-lived certs</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>step-ca, Vault PKI Secrets Engine</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Section 9: Let's Encrypt and ACME */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        Let&apos;s Encrypt and ACME Protocol — Free Automated SSL
      </h2>
      <p>
        <strong>Let&apos;s Encrypt</strong> is a free, automated, open Certificate Authority run by the Internet Security
        Research Group (ISRG). It has issued over 3 billion certificates since 2015. The <strong>ACME protocol</strong>{' '}
        (Automatic Certificate Management Environment, RFC 8555) automates the entire certificate lifecycle:
        domain validation, issuance, and renewal.
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`# Install certbot (Ubuntu/Debian)
sudo apt install certbot python3-certbot-nginx

# Issue a certificate for Nginx (automatic config modification)
sudo certbot --nginx -d example.com -d www.example.com

# Issue a certificate for Apache
sudo certbot --apache -d example.com

# Issue standalone (temporarily binds to port 80)
sudo certbot certonly --standalone -d example.com

# Issue using webroot (non-disruptive, file placed in web root)
sudo certbot certonly --webroot -w /var/www/html -d example.com

# Wildcard certificate (requires DNS-01 challenge)
sudo certbot certonly --manual --preferred-challenges dns \
  -d example.com -d *.example.com
# You will need to add a TXT record: _acme-challenge.example.com

# Certificate files are stored in:
# /etc/letsencrypt/live/example.com/
#   fullchain.pem   — cert + intermediate(s) — use this for web servers
#   cert.pem        — just the leaf certificate
#   privkey.pem     — private key
#   chain.pem       — just the intermediate(s)

# Test renewal (dry run — does not issue a real cert)
sudo certbot renew --dry-run

# Set up automatic renewal (certbot installs a systemd timer or cron job)
# Check renewal timer:
systemctl status certbot.timer
# Or the cron job:
cat /etc/cron.d/certbot

# Nginx config using Let's Encrypt certs:
# server {
#     listen 443 ssl;
#     server_name example.com;
#     ssl_certificate     /etc/letsencrypt/live/example.com/fullchain.pem;
#     ssl_certificate_key /etc/letsencrypt/live/example.com/privkey.pem;
#     ssl_protocols TLSv1.2 TLSv1.3;
#     ssl_ciphers HIGH:!aNULL:!MD5;
# }`}</code></pre>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        ACME Challenges Explained
      </h3>
      <ul>
        <li>
          <strong>HTTP-01</strong>: Let&apos;s Encrypt requests a specific token file at{' '}
          <code>http://yourdomain.com/.well-known/acme-challenge/TOKEN</code>. Easiest to automate, requires
          port 80 to be accessible. Does not work for wildcard certificates.
        </li>
        <li>
          <strong>DNS-01</strong>: You add a TXT record <code>_acme-challenge.yourdomain.com</code> with a
          specific value. Works for wildcard certificates (<code>*.example.com</code>). Can be automated with
          DNS API integrations (certbot-dns-cloudflare, certbot-dns-route53, etc.).
        </li>
        <li>
          <strong>TLS-ALPN-01</strong>: Uses the ALPN extension during a TLS handshake on port 443. Useful when
          port 80 is blocked (some corporate firewalls). Less commonly used.
        </li>
      </ul>

      {/* Section 10: mTLS */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        mTLS (Mutual TLS) — Two-Way Certificate Authentication
      </h2>
      <p>
        Standard TLS only authenticates the server (client verifies the server&apos;s certificate). <strong>Mutual TLS (mTLS)</strong>{' '}
        requires both parties to present certificates. This enables strong machine-to-machine authentication
        without passwords, tokens, or API keys.
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`# Step 1: Create a CA (used to sign both server and client certs)
openssl genrsa -out ca.key 4096
openssl req -new -x509 -days 1826 -key ca.key -out ca.pem \
  -subj "/C=US/O=My Internal CA/CN=My CA"

# Step 2: Create server certificate
openssl genrsa -out server.key 4096
openssl req -new -key server.key -out server.csr \
  -subj "/C=US/CN=api.company.com"
openssl x509 -req -in server.csr -CA ca.pem -CAkey ca.key \
  -CAcreateserial -out server.pem -days 365 \
  -extfile <(echo "subjectAltName=DNS:api.company.com")

# Step 3: Create client certificate
openssl genrsa -out client.key 4096
openssl req -new -key client.key -out client.csr \
  -subj "/C=US/O=Client Service/CN=client-service-1"
openssl x509 -req -in client.csr -CA ca.pem -CAkey ca.key \
  -CAcreateserial -out client.pem -days 365

# Step 4: Node.js mTLS server — requires client certificate
import https from 'https';
import fs from 'fs';

const server = https.createServer({
  ca: fs.readFileSync('ca.pem'),          // CA that signed client certs
  cert: fs.readFileSync('server.pem'),    // Server certificate
  key: fs.readFileSync('server.key'),     // Server private key
  requestCert: true,                      // Request client certificate
  rejectUnauthorized: true,               // Reject clients without valid cert
}, (req, res) => {
  const clientCert = req.socket.getPeerCertificate();
  if (!req.socket.authorized) {
    res.writeHead(401);
    res.end('Unauthorized');
    return;
  }
  console.log('Client CN:', clientCert.subject.CN);
  res.end(\`Hello, \${clientCert.subject.CN}!\`);
});

server.listen(8443);

# Step 5: Node.js mTLS client
const https = require('https');

const options = {
  hostname: 'api.company.com',
  port: 8443,
  path: '/',
  ca: fs.readFileSync('ca.pem'),
  cert: fs.readFileSync('client.pem'),
  key: fs.readFileSync('client.key'),
};

https.get(options, (res) => {
  console.log('Status:', res.statusCode);
  res.pipe(process.stdout);
});`}</code></pre>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        mTLS Use Cases
      </h3>
      <ul>
        <li><strong>Service mesh</strong>: Istio, Linkerd, and Consul automatically inject mTLS between all microservices. No code changes needed — the sidecar proxy handles TLS termination and certificate rotation.</li>
        <li><strong>API authentication</strong>: High-security APIs (banking, government, healthcare) use mTLS as a more robust alternative to API keys. A client certificate proves the request came from a specific authorized system.</li>
        <li><strong>IoT security</strong>: Each device gets a unique client certificate. Compromised devices can be revoked individually without changing any other device&apos;s credentials.</li>
        <li><strong>Zero Trust networking</strong>: BeyondCorp and similar architectures use mTLS with short-lived certificates (SPIFFE/SPIRE) to authenticate every request, regardless of network location.</li>
      </ul>

      {/* Section 11: JWT vs SSL certificates */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        JWT vs SSL Certificates — Different Layers, Different Purposes
      </h2>
      <p>
        JWTs and SSL/TLS certificates are both cryptographic security mechanisms, but they operate at completely
        different layers and serve different purposes. Confusing the two is a common misconception.
      </p>
      <div style={{ overflowX: 'auto', marginBottom: '1rem' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
          <thead>
            <tr style={{ background: '#f1f5f9' }}>
              <th style={{ padding: '10px 12px', textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>Attribute</th>
              <th style={{ padding: '10px 12px', textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>JWT</th>
              <th style={{ padding: '10px 12px', textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>SSL/TLS Certificate</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Layer</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Application layer (HTTP)</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Transport layer (TCP/TLS)</td>
            </tr>
            <tr style={{ background: '#fafafa' }}>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Purpose</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>User/session authentication</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Server/domain identity + encrypted channel</td>
            </tr>
            <tr>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Format</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>JSON (Header.Payload.Signature)</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>X.509 (ASN.1/DER/PEM)</td>
            </tr>
            <tr style={{ background: '#fafafa' }}>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Issued by</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Your application/auth server</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Certificate Authority (Let&apos;s Encrypt, DigiCert)</td>
            </tr>
            <tr>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Lifetime</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Minutes to hours (15min access token)</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Days to years (90 days for LE, 1-2 years for paid)</td>
            </tr>
            <tr style={{ background: '#fafafa' }}>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Revocation</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>No standard (use short expiry + blocklist)</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>CRL / OCSP</td>
            </tr>
            <tr>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Transmitted in</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Authorization header / cookie</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>TLS handshake</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        Both are used together in a typical HTTPS API: the TLS certificate secures the connection channel (prevents
        eavesdropping, proves server identity), while the JWT authenticates the user making the request
        inside that secure channel.
      </p>

      {/* Section 12: CSR */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        CSR (Certificate Signing Request) — What It Is and How to Generate One
      </h2>
      <p>
        A <strong>Certificate Signing Request (CSR)</strong> is a block of encoded text that contains your public
        key and identifying information (domain, organization, country). You submit a CSR to a Certificate
        Authority, which verifies your domain ownership and issues a signed certificate.
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`# Generate a private key and CSR in one step
openssl req -new -newkey rsa:4096 -keyout private.key -out request.csr -nodes \
  -subj "/C=US/ST=California/L=San Francisco/O=Acme Corp/OU=Engineering/CN=example.com"

# Important fields:
# C  = Country (2-letter ISO code)
# ST = State/Province
# L  = Locality (city)
# O  = Organization name (must match your legal entity for OV/EV certs)
# OU = Organizational Unit (optional)
# CN = Common Name (primary domain for the certificate)

# View the CSR contents
openssl req -in request.csr -text -noout

# CSR with SAN extension (modern requirement — use a config file)
cat > san.conf << 'EOF'
[req]
default_bits       = 4096
prompt             = no
default_md         = sha256
distinguished_name = dn
req_extensions     = req_ext

[dn]
C  = US
ST = California
O  = Acme Corp
CN = example.com

[req_ext]
subjectAltName = @alt_names

[alt_names]
DNS.1 = example.com
DNS.2 = www.example.com
DNS.3 = api.example.com
EOF

openssl req -new -newkey rsa:4096 -keyout private.key -out request.csr \
  -nodes -config san.conf

# Verify the CSR includes the SANs
openssl req -in request.csr -text -noout | grep -A3 "Requested Extensions"

# CSR contains:
# 1. Public key (the CA will embed this in the signed certificate)
# 2. Subject information (domain, org, etc.)
# 3. Any requested extensions (SANs, key usage)
# 4. Signature with your private key (proves you own the private key)
#
# The private key NEVER leaves your server.
# Only the CSR is submitted to the CA.`}</code></pre>

      {/* Section 13: Common SSL Errors */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        Common SSL Certificate Errors and How to Fix Them
      </h2>
      <p>
        SSL errors can be cryptic. Here is a complete reference for the most common errors, their root causes,
        and step-by-step fixes.
      </p>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        ERR_CERT_AUTHORITY_INVALID — Untrusted Certificate Authority
      </h3>
      <ul>
        <li><strong>Cause</strong>: The certificate was signed by a CA not in the browser/OS trust store. Common
          with: self-signed certificates, internal/private CAs, expired root CAs, or incorrectly configured chains.</li>
        <li><strong>Fix (self-signed / internal CA)</strong>: Import the CA certificate into the system trust store.
          On macOS: <code>sudo security add-trusted-cert -d -r trustRoot -k /Library/Keychains/System.keychain ca.pem</code>.
          On Ubuntu: copy to <code>/usr/local/share/ca-certificates/</code> and run <code>sudo update-ca-certificates</code>.</li>
        <li><strong>Fix (production)</strong>: Use Let&apos;s Encrypt or another publicly trusted CA instead of self-signed certs.</li>
      </ul>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        ERR_CERT_DATE_INVALID — Certificate Expired or Not Yet Valid
      </h3>
      <ul>
        <li><strong>Cause</strong>: The current date is outside the certificate&apos;s validity period.</li>
        <li><strong>Fix (expired)</strong>: Renew the certificate immediately. Run <code>certbot renew</code> for Let&apos;s Encrypt.
          Set up automated renewal with a cron job or systemd timer.</li>
        <li><strong>Fix (not yet valid)</strong>: Check that server clock is synchronized. Run <code>timedatectl status</code>
          on Linux to check NTP sync. A mismatched server clock is a common cause.</li>
        <li><strong>Prevention</strong>: Set up monitoring alerts when certificates are within 30 days of expiry.
          Use <code>openssl x509 -checkend 2592000 -in cert.pem</code> in a cron job.</li>
      </ul>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        ERR_CERT_COMMON_NAME_INVALID — Hostname Mismatch
      </h3>
      <ul>
        <li><strong>Cause</strong>: The domain in the browser&apos;s address bar does not match any SAN or CN in the
          certificate. For example, visiting <code>api.example.com</code> with a cert only covering <code>example.com</code>.</li>
        <li><strong>Fix</strong>: Obtain a new certificate that includes the exact domain being visited. Add it to
          the SAN list. A wildcard cert (<code>*.example.com</code>) covers one level of subdomains.</li>
        <li><strong>Check</strong>: <code>openssl s_client -connect example.com:443 | openssl x509 -noout -text | grep "Subject Alternative"</code></li>
      </ul>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Incomplete Certificate Chain
      </h3>
      <ul>
        <li><strong>Cause</strong>: The server is sending only the leaf certificate without the intermediate CA
          certificate(s). Browsers may resolve intermediates via AIA (Authority Information Access) but mobile
          apps and API clients often cannot.</li>
        <li><strong>Fix</strong>: Concatenate the intermediate certificate(s) after the leaf cert:
          <code>cat cert.pem intermediate.pem &gt; fullchain.pem</code>.
          Configure Nginx to use <code>ssl_certificate fullchain.pem</code>.</li>
        <li><strong>Diagnose</strong>: Use <a href="https://www.ssllabs.com/ssltest/" style={{ color: '#0284c7' }} target="_blank" rel="noopener noreferrer">SSL Labs</a> to check your server&apos;s chain and get a full security grade.</li>
      </ul>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`# Diagnose SSL errors quickly with openssl s_client
openssl s_client -connect example.com:443 -servername example.com 2>&1 | \
  grep -E "Verify return code|depth|error"

# Common output interpretations:
# Verify return code: 0 (ok)                         => Certificate chain valid
# Verify return code: 10 (certificate has expired)   => Renew certificate
# Verify return code: 18 (self signed certificate)   => Untrusted CA
# Verify return code: 20 (unable to get local issuer certificate) => Missing intermediate
# Verify return code: 62 (hostname mismatch)         => Wrong domain in cert

# Check chain completeness
openssl s_client -connect example.com:443 -showcerts 2>/dev/null | \
  grep -c "BEGIN CERTIFICATE"
# If output is 1: only leaf cert sent (chain incomplete)
# If output is 2+: leaf + intermediate(s) sent (good)

# Quick health check script
#!/bin/bash
DOMAIN=example.com
THRESHOLD_DAYS=30

EXPIRY=$(openssl s_client -connect $DOMAIN:443 -servername $DOMAIN 2>/dev/null | \
  openssl x509 -noout -enddate | cut -d= -f2)

EXPIRY_EPOCH=$(date -d "$EXPIRY" +%s 2>/dev/null || \
  date -jf "%b %d %T %Y %Z" "$EXPIRY" +%s)  # macOS compatible
NOW_EPOCH=$(date +%s)
DAYS=$(( ($EXPIRY_EPOCH - $NOW_EPOCH) / 86400 ))

if [ $DAYS -lt $THRESHOLD_DAYS ]; then
  echo "WARNING: $DOMAIN expires in $DAYS days ($EXPIRY)"
  exit 1
else
  echo "OK: $DOMAIN expires in $DAYS days"
fi`}</code></pre>

      {/* Key Takeaways */}
      <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '1rem', marginTop: '2rem' }}>
        <p style={{ fontWeight: 700, marginBottom: '0.5rem', color: '#1e293b' }}>Key Takeaways</p>
        <ul style={{ margin: 0, paddingLeft: '1.25rem', lineHeight: '1.8' }}>
          <li><strong>PEM format</strong> is a Base64-encoded text wrapper around DER (binary ASN.1) data, used universally for SSL certificates, private keys, and CSRs.</li>
          <li>Use <code>openssl x509 -in cert.pem -text -noout</code> to decode any PEM certificate and inspect its SANs, expiry, issuer, and chain info.</li>
          <li><strong>Subject Alternative Names (SANs)</strong> are required by all modern browsers — the CN field is no longer trusted for hostname validation.</li>
          <li><strong>Certificate chains</strong> require the intermediate CA certificate to be sent alongside the leaf cert — missing intermediates cause client errors.</li>
          <li>Use <strong>mkcert</strong> for locally trusted development certificates and <strong>Let&apos;s Encrypt + certbot</strong> for production auto-renewing certificates.</li>
          <li><strong>mTLS</strong> provides two-way certificate authentication — both client and server present certificates — enabling strong machine-to-machine auth in microservices and IoT.</li>
          <li><strong>Node.js crypto.X509Certificate</strong> (v15.6+) and <strong>Python cryptography library&apos;s load_pem_x509_certificate()</strong> allow programmatic certificate inspection and expiry monitoring.</li>
          <li>JWT operates at the application layer (HTTP headers), while SSL/TLS certificates operate at the transport layer — they serve different, complementary purposes.</li>
          <li>For production, always configure <code>ssl_stapling on</code> in Nginx to enable OCSP stapling for faster and more private certificate revocation checks.</li>
        </ul>
      </div>
    </article>
  );
}
