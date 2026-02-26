'use client';

import Link from 'next/link';

export default function UuidGeneratorGuide({ lang }: { lang: string }) {
  return (
    <>
      {/* TL;DR Box */}
      <div style={{ background: '#f0f9ff', border: '1px solid #bae6fd', borderRadius: '8px', padding: '16px 20px', marginBottom: '24px' }}>
        <p style={{ fontWeight: 700, marginBottom: '8px', fontSize: '1.05em' }}>TL;DR</p>
        <p style={{ margin: 0 }}>
          A UUID (Universally Unique Identifier) is a 128-bit identifier used to uniquely tag records, messages, and resources without coordination between systems. UUID v4 (random) is the most common, but UUID v7 (time-ordered) is rapidly gaining adoption for database-friendly use cases. You can <Link href={`/${lang}/tools/uuid-generator`}>generate UUIDs online</Link> instantly, or use built-in libraries in JavaScript, Python, Go, Java, and Rust. This guide covers all UUID versions, code examples in 5+ languages, comparison with alternatives like ULID and NanoID, database best practices, and validation patterns.
        </p>
      </div>

      {/* Key Takeaways */}
      <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '16px 20px', marginBottom: '24px' }}>
        <p style={{ fontWeight: 700, marginBottom: '8px', fontSize: '1.05em' }}>Key Takeaways</p>
        <ul style={{ margin: 0, paddingLeft: '20px' }}>
          <li><strong>UUID v4</strong> uses cryptographically secure random numbers and is the most widely used version today.</li>
          <li><strong>UUID v7</strong> embeds a Unix timestamp in the first 48 bits, making it sortable and ideal for database primary keys.</li>
          <li>JavaScript has a native <code>crypto.randomUUID()</code> method available in all modern browsers and Node.js 19+.</li>
          <li>Python, Go, Java, and Rust all provide standard library or well-maintained packages for UUID generation.</li>
          <li>For database primary keys, prefer UUID v7 or ULID over UUID v4 to avoid index fragmentation and enable time-based sorting.</li>
          <li>UUID validation can be done with a single regex pattern that checks the 8-4-4-4-12 hexadecimal format.</li>
          <li>Alternatives like ULID (26 characters, Crockford Base32) and NanoID (21 characters, URL-safe) are more compact but less standardized.</li>
        </ul>
      </div>

      <h2>What Is a UUID?</h2>
      <p>
        A <strong>UUID</strong> (Universally Unique Identifier), also known as a GUID (Globally Unique Identifier) in Microsoft ecosystems, is a 128-bit label used to uniquely identify information in computer systems. Defined by <strong>RFC 9562</strong> (formerly RFC 4122), UUIDs are designed to be globally unique without requiring a central authority or coordination between the parties generating them.
      </p>
      <p>
        The standard text representation of a UUID is a 36-character string in the format <code>xxxxxxxx-xxxx-Mxxx-Nxxx-xxxxxxxxxxxx</code>, where <code>x</code> represents a hexadecimal digit (0-9, a-f), <code>M</code> indicates the UUID version (1-8), and <code>N</code> indicates the variant (typically 8, 9, a, or b for RFC 9562 UUIDs). Here is an example of a UUID v4:
      </p>
      <pre><code>{`550e8400-e29b-41d4-a716-446655440000`}</code></pre>
      <p>
        UUIDs are used extensively across software engineering: as database primary keys, distributed system identifiers, session tokens, correlation IDs in microservices, file names for uploaded content, and message queue deduplication keys. Their ubiquity stems from a simple guarantee: the probability of generating two identical UUID v4 values is so astronomically low (1 in 2^122, approximately 5.3 x 10^36) that for all practical purposes, every generated UUID is unique.
      </p>
      <p>
        If you need to quickly <strong>generate a UUID online</strong>, try our free <Link href={`/${lang}/tools/uuid-generator`}>UUID Generator tool</Link> that supports v1, v4, v7, and bulk generation.
      </p>

      <h2>UUID Versions Explained (v1, v4, v5, v7)</h2>
      <p>
        The UUID specification defines several versions, each using a different strategy to produce unique identifiers. Understanding the differences is crucial for choosing the right version for your application.
      </p>

      <h3>UUID v1 (Timestamp + MAC Address)</h3>
      <p>
        UUID v1 combines a 60-bit timestamp (measured in 100-nanosecond intervals since October 15, 1582) with the MAC address of the generating machine. This guarantees uniqueness across space (different machines) and time (different moments). However, UUID v1 has significant privacy concerns because it leaks the hardware MAC address and the exact time of generation. It is also not ideal for database indexing because the timestamp bits are split across non-contiguous positions in the UUID, making lexicographic sorting unreliable.
      </p>
      <pre><code>{`// UUID v1 example
// 6fc1bca0-c3e5-11ee-a506-325096b39f47
// |--------|    |--|
//  timestamp    version (1)
// MAC address is embedded in the last 12 hex digits`}</code></pre>

      <h3>UUID v4 (Random)</h3>
      <p>
        <strong>UUID v4</strong> is the most widely used version. It generates 122 random bits (6 bits are reserved for the version and variant fields), using a cryptographically secure random number generator (CSPRNG). UUID v4 has no dependency on timestamps, MAC addresses, or any external state, making it the simplest and most portable option.
      </p>
      <p>
        The trade-off is that UUID v4 values are completely random, which causes performance issues when used as database primary keys in B-tree indexes. Random insertions lead to page splits, higher write amplification, and cache inefficiency. Despite this, UUID v4 remains the default choice for most applications where database index performance is not a primary concern.
      </p>
      <pre><code>{`// UUID v4 structure (122 random bits)
// xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx
//                ^    ^
//          version=4  variant (8,9,a,b)`}</code></pre>

      <h3>UUID v5 (SHA-1 Namespace Hash)</h3>
      <p>
        UUID v5 produces a deterministic UUID by hashing a namespace UUID and a name using SHA-1 (UUID v3 uses MD5 instead). Given the same namespace and name, UUID v5 always produces the same output. This is useful for generating reproducible identifiers, such as mapping a URL or DNS name to a UUID. The specification defines four standard namespaces: DNS, URL, OID, and X.500.
      </p>
      <pre><code>{`// UUID v5 = SHA-1(namespace_uuid + name)
// Same input always produces the same UUID
// Namespace for DNS: 6ba7b810-9dad-11d1-80b4-00c04fd430c8
// uuid5(DNS, "example.com") -> always the same result`}</code></pre>

      <h3>UUID v7 (Unix Timestamp + Random)</h3>
      <p>
        <strong>UUID v7</strong> is the newest and most exciting version, specified in RFC 9562 (May 2024). It places a 48-bit Unix timestamp (millisecond precision) in the most significant bits, followed by 74 random bits. This design makes UUID v7 values <strong>monotonically increasing</strong> over time and <strong>lexicographically sortable</strong>, which dramatically improves B-tree index performance in databases.
      </p>
      <p>
        UUID v7 is rapidly becoming the recommended choice for new projects that need globally unique, time-sortable identifiers for database primary keys. It combines the simplicity of UUID v4 (no MAC address dependency) with the sortability benefits that UUID v1 attempted to provide.
      </p>
      <pre><code>{`// UUID v7 structure
// tttttttt-tttt-7xxx-yxxx-xxxxxxxxxxxx
// |------------|    ^    ^
//  48-bit ms    version=7  variant
//  timestamp
//
// Example: 018e4a2c-8b9f-7d12-a456-426614174000
// Timestamp: 2024-03-15T10:30:00.000Z (embedded in first 48 bits)`}</code></pre>

      <h3>Version Comparison Table</h3>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '16px' }}>
        <thead>
          <tr style={{ background: '#f1f5f9' }}>
            <th style={{ border: '1px solid #e2e8f0', padding: '8px 12px', textAlign: 'left' }}>Version</th>
            <th style={{ border: '1px solid #e2e8f0', padding: '8px 12px', textAlign: 'left' }}>Strategy</th>
            <th style={{ border: '1px solid #e2e8f0', padding: '8px 12px', textAlign: 'left' }}>Sortable</th>
            <th style={{ border: '1px solid #e2e8f0', padding: '8px 12px', textAlign: 'left' }}>Privacy</th>
            <th style={{ border: '1px solid #e2e8f0', padding: '8px 12px', textAlign: 'left' }}>Best For</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>v1</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Timestamp + MAC</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Partially</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Leaks MAC + time</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Legacy systems</td>
          </tr>
          <tr>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>v4</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>122 random bits</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>No</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Excellent</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>General purpose, tokens</td>
          </tr>
          <tr>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>v5</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>SHA-1 hash (deterministic)</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>No</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Good</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Reproducible IDs from names</td>
          </tr>
          <tr>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>v7</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>48-bit timestamp + random</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Yes (time-ordered)</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Good (leaks time only)</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>DB primary keys, event IDs</td>
          </tr>
        </tbody>
      </table>

      <h2>Generate UUIDs Online</h2>
      <p>
        The fastest way to <strong>generate a UUID</strong> is to use an online tool. Our <Link href={`/${lang}/tools/uuid-generator`}>free UUID Generator</Link> lets you:
      </p>
      <ul>
        <li>Generate single or bulk UUIDs (up to 1000 at once)</li>
        <li>Choose between UUID v1, v4, and v7</li>
        <li>Copy to clipboard with one click</li>
        <li>Toggle uppercase/lowercase and with/without hyphens</li>
        <li>Generate NIL UUID (all zeros) for testing</li>
      </ul>
      <p>
        Online UUID generators are convenient for quick tasks like populating test databases, creating configuration file identifiers, setting up environment variables, or generating unique file names. For production applications, you should use the language-specific methods described below to generate UUIDs programmatically.
      </p>

      <h2>UUID in JavaScript and TypeScript</h2>
      <p>
        Modern JavaScript provides a built-in <code>crypto.randomUUID()</code> method that generates RFC 4122-compliant UUID v4 values. This is available in all modern browsers (Chrome 92+, Firefox 95+, Safari 15.4+) and Node.js 19+.
      </p>
      <pre><code className="language-javascript">{`// Native UUID v4 generation (no dependencies!)
const uuid = crypto.randomUUID();
console.log(uuid);
// "550e8400-e29b-41d4-a716-446655440000"

// Node.js (also available via crypto module)
import { randomUUID } from 'node:crypto';
const id = randomUUID();
console.log(id);
// "f47ac10b-58cc-4372-a567-0e02b2c3d479"`}</code></pre>
      <p>
        For UUID v7 or other versions, use the popular <code>uuid</code> npm package:
      </p>
      <pre><code className="language-javascript">{`// Install: npm install uuid
import { v1, v4, v5, v7 } from 'uuid';

// UUID v1 (timestamp + MAC)
console.log(v1()); // "6fc1bca0-c3e5-11ee-a506-325096b39f47"

// UUID v4 (random)
console.log(v4()); // "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d"

// UUID v5 (namespace + name hash)
const MY_NAMESPACE = '6ba7b810-9dad-11d1-80b4-00c04fd430c8';
console.log(v5('example.com', MY_NAMESPACE));

// UUID v7 (timestamp-ordered, available in uuid v9.x+)
console.log(v7()); // "018e4a2c-8b9f-7d12-a456-426614174000"

// Validate a UUID string
import { validate, version } from 'uuid';
console.log(validate('not-a-uuid'));            // false
console.log(validate('9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d')); // true
console.log(version('9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'));  // 4`}</code></pre>
      <p>
        For TypeScript projects, the <code>uuid</code> package includes built-in type definitions. You can type your functions and interfaces with UUID strings:
      </p>
      <pre><code className="language-typescript">{`import { v4 as uuidv4 } from 'uuid';

interface User {
  id: string;  // UUID v4
  name: string;
  email: string;
}

function createUser(name: string, email: string): User {
  return {
    id: uuidv4(),
    name,
    email,
  };
}

// With branded types for extra safety
type UUID = string & { readonly __brand: unique symbol };
function generateUUID(): UUID {
  return crypto.randomUUID() as UUID;
}`}</code></pre>

      <h2>UUID in Python</h2>
      <p>
        Python includes a built-in <code>uuid</code> module in the standard library that supports UUID v1, v3, v4, and v5. For UUID v7, you need the third-party <code>uuid6</code> or <code>uuid-utils</code> package.
      </p>
      <pre><code className="language-python">{`import uuid

# UUID v1 (timestamp + MAC)
print(uuid.uuid1())
# UUID('6fc1bca0-c3e5-11ee-a506-325096b39f47')

# UUID v4 (random) - most common
print(uuid.uuid4())
# UUID('9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d')

# UUID v3 (MD5 namespace hash)
print(uuid.uuid3(uuid.NAMESPACE_DNS, 'example.com'))

# UUID v5 (SHA-1 namespace hash)
print(uuid.uuid5(uuid.NAMESPACE_DNS, 'example.com'))

# Convert UUID to different formats
my_uuid = uuid.uuid4()
print(str(my_uuid))          # '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'
print(my_uuid.hex)            # '9b1deb4d3b7d4bad9bdd2b0d7b3dcb6d'
print(my_uuid.int)            # 206008764582814420383325590819509755309
print(my_uuid.bytes)          # b'\\x9b\\x1d\\xeb...'
print(my_uuid.version)        # 4

# UUID v7 (requires: pip install uuid6)
from uuid6 import uuid7
print(uuid7())
# UUID('018e4a2c-8b9f-7d12-a456-426614174000')`}</code></pre>
      <p>
        In Django, you can use <code>UUIDField</code> as a model primary key:
      </p>
      <pre><code className="language-python">{`import uuid
from django.db import models

class Article(models.Model):
    id = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        editable=False
    )
    title = models.CharField(max_length=200)
    created_at = models.DateTimeField(auto_now_add=True)`}</code></pre>

      <h2>UUID in Go, Java, and Rust</h2>

      <h3>Go</h3>
      <p>
        The standard library does not include a UUID package, but the <code>google/uuid</code> package is the de facto standard:
      </p>
      <pre><code className="language-go">{`package main

import (
    "fmt"
    "github.com/google/uuid"
)

func main() {
    // UUID v4 (random)
    id := uuid.New()
    fmt.Println(id.String())
    // "550e8400-e29b-41d4-a716-446655440000"

    // UUID v7 (timestamp-ordered)
    id7, err := uuid.NewV7()
    if err != nil {
        panic(err)
    }
    fmt.Println(id7.String())
    // "018e4a2c-8b9f-7d12-a456-426614174000"

    // Parse a UUID string
    parsed, err := uuid.Parse("550e8400-e29b-41d4-a716-446655440000")
    if err != nil {
        fmt.Println("Invalid UUID")
    }
    fmt.Println(parsed.Version()) // 4
}`}</code></pre>

      <h3>Java</h3>
      <p>
        Java includes <code>java.util.UUID</code> in the standard library. It supports v3, v4, and v5 natively. For UUID v7, use a library like <code>com.fasterxml.uuid:java-uuid-generator</code>.
      </p>
      <pre><code className="language-java">{`import java.util.UUID;

public class UuidExample {
    public static void main(String[] args) {
        // UUID v4 (random)
        UUID uuid = UUID.randomUUID();
        System.out.println(uuid.toString());
        // "550e8400-e29b-41d4-a716-446655440000"

        // Parse a UUID string
        UUID parsed = UUID.fromString("550e8400-e29b-41d4-a716-446655440000");
        System.out.println(parsed.version()); // 4
        System.out.println(parsed.variant()); // 2 (RFC 4122)

        // UUID v5 (SHA-1 namespace hash)
        UUID namespace = UUID.fromString("6ba7b810-9dad-11d1-80b4-00c04fd430c8");
        UUID v5 = UUID.nameUUIDFromBytes("example.com".getBytes());
        System.out.println(v5);
    }
}

// For UUID v7 with JUG (Java UUID Generator):
// Maven: com.fasterxml.uuid:java-uuid-generator:5.0.0
import com.fasterxml.uuid.Generators;
import com.fasterxml.uuid.impl.TimeBasedEpochGenerator;

TimeBasedEpochGenerator gen = Generators.timeBasedEpochGenerator();
UUID uuidV7 = gen.generate(); // UUID v7`}</code></pre>

      <h3>Rust</h3>
      <p>
        The <code>uuid</code> crate is the standard choice for Rust:
      </p>
      <pre><code className="language-rust">{`// Cargo.toml:
// [dependencies]
// uuid = { version = "1", features = ["v4", "v7"] }

use uuid::Uuid;

fn main() {
    // UUID v4 (random)
    let id = Uuid::new_v4();
    println!("{}", id);
    // "550e8400-e29b-41d4-a716-446655440000"

    // UUID v7 (timestamp-ordered)
    let id_v7 = Uuid::now_v7();
    println!("{}", id_v7);
    // "018e4a2c-8b9f-7d12-a456-426614174000"

    // Parse a UUID string
    let parsed = Uuid::parse_str("550e8400-e29b-41d4-a716-446655440000");
    match parsed {
        Ok(uuid) => println!("Version: {}", uuid.get_version_num()),
        Err(e) => println!("Invalid UUID: {}", e),
    }

    // Convert to different formats
    println!("{}", id.as_hyphenated()); // with hyphens
    println!("{}", id.as_simple());     // without hyphens
    println!("{:?}", id.as_bytes());    // 16-byte array
}`}</code></pre>

      <h2>UUID vs ULID vs NanoID</h2>
      <p>
        While UUID is the most established identifier standard, alternatives like ULID and NanoID have emerged to address specific shortcomings. Here is a detailed comparison to help you choose:
      </p>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '16px' }}>
        <thead>
          <tr style={{ background: '#f1f5f9' }}>
            <th style={{ border: '1px solid #e2e8f0', padding: '8px 12px', textAlign: 'left' }}>Feature</th>
            <th style={{ border: '1px solid #e2e8f0', padding: '8px 12px', textAlign: 'left' }}>UUID v4</th>
            <th style={{ border: '1px solid #e2e8f0', padding: '8px 12px', textAlign: 'left' }}>UUID v7</th>
            <th style={{ border: '1px solid #e2e8f0', padding: '8px 12px', textAlign: 'left' }}>ULID</th>
            <th style={{ border: '1px solid #e2e8f0', padding: '8px 12px', textAlign: 'left' }}>NanoID</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Length</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>36 chars</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>36 chars</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>26 chars</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>21 chars (default)</td>
          </tr>
          <tr>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Encoding</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Hex (0-9, a-f)</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Hex (0-9, a-f)</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Crockford Base32</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>URL-safe (A-Za-z0-9_-)</td>
          </tr>
          <tr>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Sortable</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>No</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Yes</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Yes</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>No</td>
          </tr>
          <tr>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Timestamp</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>No</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>48-bit ms</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>48-bit ms</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>No</td>
          </tr>
          <tr>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Entropy bits</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>122</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>74</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>80</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>126 (21 chars)</td>
          </tr>
          <tr>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Standard</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>RFC 9562</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>RFC 9562</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Community spec</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>No formal spec</td>
          </tr>
          <tr>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>DB-friendly</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Poor (random scatter)</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Excellent</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Excellent</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Fair</td>
          </tr>
          <tr>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>URL-safe</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Yes (hex + hyphens)</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Yes (hex + hyphens)</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Yes</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Yes</td>
          </tr>
        </tbody>
      </table>
      <p>
        <strong>When to choose each:</strong>
      </p>
      <ul>
        <li><strong>UUID v4</strong>: Maximum compatibility, no timestamp needed, simple random IDs for tokens, API keys, or non-indexed fields.</li>
        <li><strong>UUID v7</strong>: Database primary keys, event sourcing, audit logs, anything that benefits from time-ordering. The best all-around choice for new projects in 2026.</li>
        <li><strong>ULID</strong>: When you want sortable IDs that are more compact (26 chars vs 36) and do not require strict RFC compliance. Great for systems that already use Crockford Base32.</li>
        <li><strong>NanoID</strong>: Frontend-generated IDs, URL slugs, short tokens, or anywhere a compact URL-safe string is preferred. Customizable alphabet and length.</li>
      </ul>
      <p>
        For a deeper dive into this comparison, read our full article: <Link href={`/${lang}/blog/uuid-v4-vs-v7-vs-ulid-vs-nanoid`}>UUID v4 vs UUID v7 vs ULID vs NanoID</Link>.
      </p>

      <h2>UUID as Database Primary Keys: Pros and Cons</h2>
      <p>
        Using UUIDs as database primary keys is one of the most debated topics in backend engineering. Here is a balanced analysis of the trade-offs:
      </p>

      <h3>Advantages</h3>
      <ul>
        <li><strong>Globally unique</strong>: IDs can be generated anywhere (client, server, different databases) without coordination or risk of collision.</li>
        <li><strong>Merge-friendly</strong>: When merging data from multiple databases or shards, UUIDs never conflict. Auto-increment IDs require complex remapping.</li>
        <li><strong>Security</strong>: UUIDs do not expose information about record count or creation order (unlike sequential integers). Attackers cannot guess or enumerate valid IDs.</li>
        <li><strong>Offline generation</strong>: Clients can generate IDs before the record reaches the server, enabling optimistic UI patterns and offline-first architectures.</li>
        <li><strong>Microservice-friendly</strong>: Each service can independently generate IDs without hitting a shared sequence generator.</li>
      </ul>

      <h3>Disadvantages</h3>
      <ul>
        <li><strong>Storage overhead</strong>: A UUID occupies 16 bytes in binary (128 bits), compared to 4 bytes for an integer or 8 bytes for a bigint. This adds up in tables with billions of rows and in every foreign key reference.</li>
        <li><strong>Index performance (v4)</strong>: Random UUID v4 values cause scattered insertions in B-tree indexes, leading to page splits, increased write amplification, and poor cache hit rates. This can degrade INSERT throughput by 2-5x compared to sequential keys.</li>
        <li><strong>Human readability</strong>: UUIDs are 36 characters long and difficult to read, compare, or communicate verbally. Debugging becomes harder.</li>
        <li><strong>Join performance</strong>: Larger keys mean larger index entries, reducing the number of keys per index page and increasing I/O for JOIN operations.</li>
      </ul>

      <h3>Best Practices for UUID Primary Keys</h3>
      <pre><code className="language-sql">{`-- PostgreSQL: Use uuid-ossp or pgcrypto for generation
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE users (
    -- Store as native UUID type (16 bytes, not 36-char string)
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) NOT NULL UNIQUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- For UUID v7 in PostgreSQL 17+:
-- CREATE TABLE events (
--     id UUID PRIMARY KEY DEFAULT uuidv7(),
--     event_type VARCHAR(100),
--     payload JSONB
-- );

-- MySQL 8.0+: Use BINARY(16) with BIN_TO_UUID/UUID_TO_BIN
CREATE TABLE orders (
    id BINARY(16) PRIMARY KEY DEFAULT (UUID_TO_BIN(UUID(), 1)),
    total DECIMAL(10, 2),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- The swap_flag=1 reorders timestamp bits for better index locality
-- Query with: SELECT BIN_TO_UUID(id, 1) AS id FROM orders;`}</code></pre>
      <p>
        <strong>Recommendation</strong>: If you need UUID primary keys, use <strong>UUID v7</strong> stored in a native UUID column type. The time-ordered nature of v7 eliminates the B-tree fragmentation problem, giving you the best of both worlds: global uniqueness and sequential index performance.
      </p>

      <h2>UUID Validation Regex</h2>
      <p>
        Validating whether a string is a properly formatted UUID is a common requirement. Here are regex patterns from strict to lenient:
      </p>
      <pre><code className="language-javascript">{`// Strict: validates format AND version (1-7) AND variant (8-b)
const UUID_STRICT = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-7][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

// Lenient: validates format only (any hex in version/variant positions)
const UUID_LENIENT = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

// Without hyphens (32 hex chars)
const UUID_NO_HYPHENS = /^[0-9a-f]{32}$/i;

// Version-specific patterns
const UUID_V4 = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const UUID_V7 = /^[0-9a-f]{8}-[0-9a-f]{4}-7[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

// Test examples
console.log(UUID_STRICT.test('550e8400-e29b-41d4-a716-446655440000')); // true
console.log(UUID_STRICT.test('not-a-valid-uuid'));                       // false
console.log(UUID_V4.test('9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'));    // true
console.log(UUID_V7.test('018e4a2c-8b9f-7d12-a456-426614174000'));     // true`}</code></pre>

      <p>Python validation:</p>
      <pre><code className="language-python">{`import re
import uuid

# Using regex
UUID_PATTERN = re.compile(
    r'^[0-9a-f]{8}-[0-9a-f]{4}-[1-7][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$',
    re.IGNORECASE
)

def is_valid_uuid(value: str) -> bool:
    return bool(UUID_PATTERN.match(value))

# Using the uuid module (recommended in Python)
def is_valid_uuid_python(value: str) -> bool:
    try:
        uuid.UUID(value)
        return True
    except ValueError:
        return False

print(is_valid_uuid('550e8400-e29b-41d4-a716-446655440000'))  # True
print(is_valid_uuid('not-a-uuid'))                              # False`}</code></pre>

      <h2>UUID Performance Benchmarks</h2>
      <p>
        Understanding the performance characteristics of UUID generation helps you make informed decisions, especially in high-throughput systems:
      </p>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '16px' }}>
        <thead>
          <tr style={{ background: '#f1f5f9' }}>
            <th style={{ border: '1px solid #e2e8f0', padding: '8px 12px', textAlign: 'left' }}>Operation</th>
            <th style={{ border: '1px solid #e2e8f0', padding: '8px 12px', textAlign: 'left' }}>Language</th>
            <th style={{ border: '1px solid #e2e8f0', padding: '8px 12px', textAlign: 'left' }}>Throughput</th>
            <th style={{ border: '1px solid #e2e8f0', padding: '8px 12px', textAlign: 'left' }}>Notes</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>UUID v4 gen</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>JavaScript (Node.js)</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>~5M/sec</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>crypto.randomUUID()</td>
          </tr>
          <tr>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>UUID v4 gen</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Python</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>~800K/sec</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>uuid.uuid4()</td>
          </tr>
          <tr>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>UUID v4 gen</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Go</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>~10M/sec</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>google/uuid</td>
          </tr>
          <tr>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>UUID v4 gen</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Rust</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>~20M/sec</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>uuid crate</td>
          </tr>
          <tr>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>UUID v7 gen</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>JavaScript (uuid pkg)</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>~4M/sec</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Includes timestamp read</td>
          </tr>
          <tr>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>DB INSERT (v4 PK)</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>PostgreSQL</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>~15K/sec</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Random scatter, page splits</td>
          </tr>
          <tr>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>DB INSERT (v7 PK)</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>PostgreSQL</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>~35K/sec</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Sequential append, 2-3x faster</td>
          </tr>
        </tbody>
      </table>
      <p>
        The key insight from these benchmarks is that UUID <em>generation</em> speed is rarely the bottleneck. The real performance difference appears at the <em>database layer</em>, where UUID v7 consistently outperforms UUID v4 for INSERT-heavy workloads by 2-3x due to sequential B-tree appends instead of random page splits.
      </p>

      <h2>Common UUID Mistakes and How to Avoid Them</h2>
      <p>
        Here are the most common pitfalls developers encounter when working with UUIDs:
      </p>
      <ol>
        <li>
          <strong>Storing UUIDs as VARCHAR(36)</strong>: This wastes storage (36 bytes string vs 16 bytes binary) and slows comparisons. Use native UUID types in PostgreSQL, or BINARY(16) in MySQL.
        </li>
        <li>
          <strong>Using UUID v4 as a clustered primary key</strong>: Random UUIDs cause severe index fragmentation. Switch to UUID v7 or use a separate auto-increment clustered index with UUID as a unique secondary index.
        </li>
        <li>
          <strong>Comparing UUIDs as strings with case sensitivity</strong>: UUID hex characters can be uppercase or lowercase. Always normalize to lowercase before comparison, or use language-specific UUID types that handle this.
        </li>
        <li>
          <strong>Using UUID v1 in public APIs</strong>: UUID v1 leaks the MAC address of the generating machine and the exact generation timestamp. Use UUID v4 or v7 instead.
        </li>
        <li>
          <strong>Not validating UUID input</strong>: Always validate UUIDs received from clients or external systems. An invalid UUID in a database query can cause errors or unexpected behavior.
        </li>
        <li>
          <strong>Generating UUIDs with Math.random()</strong>: Never use non-cryptographic random number generators. Always use <code>crypto.randomUUID()</code> or equivalent CSPRNG-backed functions.
        </li>
        <li>
          <strong>Ignoring UUID version in logs</strong>: When debugging, knowing whether an ID is v4 (random) or v7 (time-based) tells you whether you can extract creation timestamps from IDs. The version is the first digit of the third group.
        </li>
      </ol>

      <h2>Extracting Timestamps from UUID v7</h2>
      <p>
        One of the key advantages of UUID v7 is the embedded timestamp. Here is how to extract it in different languages:
      </p>
      <pre><code className="language-javascript">{`// JavaScript: Extract timestamp from UUID v7
function getTimestampFromUUIDv7(uuid) {
  // Remove hyphens and take first 12 hex chars (48 bits = timestamp)
  const hex = uuid.replace(/-/g, '').substring(0, 12);
  const timestamp = parseInt(hex, 16);
  return new Date(timestamp);
}

const uuid7 = '018e4a2c-8b9f-7d12-a456-426614174000';
console.log(getTimestampFromUUIDv7(uuid7));
// 2024-03-15T10:30:00.000Z (approximate)`}</code></pre>
      <pre><code className="language-python">{`# Python: Extract timestamp from UUID v7
from datetime import datetime, timezone

def get_timestamp_from_uuid7(uuid_str: str) -> datetime:
    hex_str = uuid_str.replace('-', '')[:12]
    timestamp_ms = int(hex_str, 16)
    return datetime.fromtimestamp(timestamp_ms / 1000, tz=timezone.utc)

uuid7 = '018e4a2c-8b9f-7d12-a456-426614174000'
print(get_timestamp_from_uuid7(uuid7))
# 2024-03-15 10:30:00+00:00`}</code></pre>

      <h2>UUID in Different Contexts</h2>

      <h3>UUID in GraphQL APIs</h3>
      <pre><code className="language-graphql">{`# GraphQL schema with UUID scalar
scalar UUID

type User {
  id: UUID!
  name: String!
  email: String!
}

type Mutation {
  createUser(name: String!, email: String!): User!
}`}</code></pre>

      <h3>UUID in Docker and Kubernetes</h3>
      <pre><code className="language-bash">{`# Generate a UUID in bash (Linux/macOS)
uuidgen
# 550e8400-e29b-41d4-a716-446655440000

# Use in Docker environment variables
docker run -e "INSTANCE_ID=$(uuidgen)" myapp

# Kubernetes ConfigMap with UUID
kubectl create configmap app-config \\
  --from-literal=instance-id=$(uuidgen)`}</code></pre>

      <h3>UUID in REST APIs</h3>
      <pre><code className="language-json">{`// POST /api/users
// Request body
{
  "name": "Alice",
  "email": "alice@example.com"
}

// Response (201 Created)
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "name": "Alice",
  "email": "alice@example.com",
  "created_at": "2026-02-27T10:30:00Z"
}

// GET /api/users/550e8400-e29b-41d4-a716-446655440000`}</code></pre>

      <h2>Frequently Asked Questions</h2>

      {/* FAQ Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              {
                '@type': 'Question',
                name: 'What is a UUID?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'A UUID (Universally Unique Identifier) is a 128-bit label used to uniquely identify information in computer systems. It follows the format xxxxxxxx-xxxx-Mxxx-Nxxx-xxxxxxxxxxxx where M is the version and N is the variant. UUIDs can be generated without a central authority and the probability of duplicates is negligible.',
                },
              },
              {
                '@type': 'Question',
                name: 'What is the difference between UUID v4 and UUID v7?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'UUID v4 uses 122 cryptographically random bits, making it completely random and unsortable. UUID v7 embeds a 48-bit Unix timestamp (millisecond precision) followed by 74 random bits, making it time-ordered and lexicographically sortable. UUID v7 is better for database primary keys because its sequential nature avoids B-tree index fragmentation.',
                },
              },
              {
                '@type': 'Question',
                name: 'How do I generate a UUID in JavaScript?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Use the native crypto.randomUUID() method available in all modern browsers and Node.js 19+. For example: const uuid = crypto.randomUUID(); This generates an RFC 4122-compliant UUID v4. For other versions, install the uuid npm package and use v1(), v4(), v5(), or v7() functions.',
                },
              },
              {
                '@type': 'Question',
                name: 'Can two UUIDs ever be the same?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'While theoretically possible, the probability of generating duplicate UUID v4 values is astronomically low: approximately 1 in 2^122 (5.3 x 10^36). You would need to generate about 2.71 quintillion UUIDs to have a 50% probability of a single collision. For all practical purposes, UUID v4 values are unique.',
                },
              },
              {
                '@type': 'Question',
                name: 'Should I use UUID or auto-increment integer for primary keys?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Use auto-increment integers for simple single-server applications where IDs do not need to be generated client-side. Use UUIDs (preferably v7) for distributed systems, microservices, multi-database setups, or when clients need to generate IDs before server round-trips. UUID v7 provides the sequential insert performance of integers with the global uniqueness of UUIDs.',
                },
              },
              {
                '@type': 'Question',
                name: 'What is the regex pattern to validate a UUID?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'A strict regex for validating UUIDs with version and variant checks is: /^[0-9a-f]{8}-[0-9a-f]{4}-[1-7][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i. A lenient pattern that only validates the 8-4-4-4-12 hex format is: /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.',
                },
              },
              {
                '@type': 'Question',
                name: 'Is UUID v7 better than ULID?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'UUID v7 and ULID serve similar purposes (time-ordered unique identifiers), but UUID v7 is standardized in RFC 9562 while ULID is a community specification. UUID v7 is 36 characters (hex) while ULID is 26 characters (Crockford Base32). Choose UUID v7 for maximum interoperability and standards compliance, or ULID for shorter identifiers.',
                },
              },
              {
                '@type': 'Question',
                name: 'How do I generate a UUID in Python?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Use the built-in uuid module: import uuid; my_uuid = uuid.uuid4(). This generates a random UUID v4. For UUID v1 use uuid.uuid1(), for UUID v5 use uuid.uuid5(namespace, name). For UUID v7, install the uuid6 package: from uuid6 import uuid7; my_uuid = uuid7().',
                },
              },
            ],
          }),
        }}
      />

      <div style={{ marginTop: '8px' }}>
        <h3>What is a UUID?</h3>
        <p>
          A UUID (Universally Unique Identifier) is a 128-bit label used to uniquely identify information in computer systems. It follows the format <code>xxxxxxxx-xxxx-Mxxx-Nxxx-xxxxxxxxxxxx</code> where <code>M</code> is the version and <code>N</code> is the variant. UUIDs can be generated without a central authority and the probability of duplicates is negligible.
        </p>

        <h3>What is the difference between UUID v4 and UUID v7?</h3>
        <p>
          UUID v4 uses 122 cryptographically random bits, making it completely random and unsortable. UUID v7 embeds a 48-bit Unix timestamp (millisecond precision) followed by 74 random bits, making it time-ordered and lexicographically sortable. UUID v7 is better for database primary keys because its sequential nature avoids B-tree index fragmentation.
        </p>

        <h3>How do I generate a UUID in JavaScript?</h3>
        <p>
          Use the native <code>crypto.randomUUID()</code> method available in all modern browsers and Node.js 19+. For example: <code>{'const uuid = crypto.randomUUID();'}</code>. This generates an RFC 4122-compliant UUID v4. For other versions, install the <code>uuid</code> npm package and use <code>v1()</code>, <code>v4()</code>, <code>v5()</code>, or <code>v7()</code> functions.
        </p>

        <h3>Can two UUIDs ever be the same?</h3>
        <p>
          While theoretically possible, the probability of generating duplicate UUID v4 values is astronomically low: approximately 1 in 2^122 (5.3 x 10^36). You would need to generate about 2.71 quintillion UUIDs to have a 50% probability of a single collision. For all practical purposes, UUID v4 values are unique.
        </p>

        <h3>Should I use UUID or auto-increment integer for primary keys?</h3>
        <p>
          Use auto-increment integers for simple single-server applications where IDs do not need to be generated client-side. Use UUIDs (preferably v7) for distributed systems, microservices, multi-database setups, or when clients need to generate IDs before server round-trips. UUID v7 provides the sequential insert performance of integers with the global uniqueness of UUIDs.
        </p>

        <h3>What is the regex pattern to validate a UUID?</h3>
        <p>
          A strict regex for validating UUIDs with version and variant checks is: <code>{'/^[0-9a-f]{8}-[0-9a-f]{4}-[1-7][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i'}</code>. A lenient pattern that only validates the 8-4-4-4-12 hex format is: <code>{'/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i'}</code>.
        </p>

        <h3>Is UUID v7 better than ULID?</h3>
        <p>
          UUID v7 and ULID serve similar purposes (time-ordered unique identifiers), but UUID v7 is standardized in RFC 9562 while ULID is a community specification. UUID v7 is 36 characters (hex) while ULID is 26 characters (Crockford Base32). Choose UUID v7 for maximum interoperability and standards compliance, or ULID for shorter identifiers.
        </p>

        <h3>How do I generate a UUID in Python?</h3>
        <p>
          Use the built-in <code>uuid</code> module: <code>import uuid; my_uuid = uuid.uuid4()</code>. This generates a random UUID v4. For UUID v1 use <code>uuid.uuid1()</code>, for UUID v5 use <code>uuid.uuid5(namespace, name)</code>. For UUID v7, install the <code>uuid6</code> package: <code>from uuid6 import uuid7; my_uuid = uuid7()</code>.
        </p>
      </div>
    </>
  );
}
