'use client';
import Link from 'next/link';

/* ------------------------------------------------------------------ */
/*  JSON to Swift Struct Online Guide                                   */
/* ------------------------------------------------------------------ */

export default function JsonToSwiftOnlineGuide({ lang }: { lang: string }) {
  const l = lang || 'en';
  const toolLink = `/${l}/tools/json-to-swift`;

  /* ---------- translations ---------- */
  const translations: Record<string, {
    tldr: string;
    whyTitle: string;
    takeawaysTitle: string;
    tryTool: string;
    faqTitle: string;
  }> = {
    zh: {
      tldr: 'JSON 转 Swift 工具通过 Codable 协议从任意 JSON 数据生成类型安全的 Swift 结构体，利用 CodingKeys 自动处理 snake_case 到 camelCase 的映射，消除手动编码。',
      whyTitle: '为什么使用 Codable 将 JSON 转换为 Swift 结构体？',
      takeawaysTitle: '核心要点',
      tryTool: '立即使用免费的 JSON 转 Swift 工具 \u2192',
      faqTitle: '常见问题',
    },
    en: {
      tldr: 'A JSON to Swift tool generates type-safe structs using the Codable protocol from any JSON — handling snake_case to camelCase mapping via CodingKeys, optional properties, nested objects, and Date decoding automatically.',
      whyTitle: 'Why Use Codable to Convert JSON to Swift Structs?',
      takeawaysTitle: 'Key Takeaways',
      tryTool: 'Try our free JSON to Swift tool \u2192',
      faqTitle: 'Frequently Asked Questions',
    },
  };

  const t = translations[l] || translations['en'];

  /* ---------- FAQ items ---------- */
  const faqItems = [
    {
      q: 'What is the Codable protocol in Swift and why should I use it for JSON?',
      a: 'Codable is a type alias for the combination of Encodable and Decodable protocols introduced in Swift 4. Conforming a struct or class to Codable lets Swift automatically synthesize all the encoding and decoding logic at compile time — no manual key lookups or type casts required. JSONDecoder and JSONEncoder do the heavy lifting, giving you compile-time type safety, IDE autocomplete, and refactoring support that raw dictionary access cannot provide.',
    },
    {
      q: 'What is CodingKeys and when do I need it?',
      a: 'CodingKeys is a nested enum inside your Codable type that maps Swift property names to their corresponding JSON keys. You only need it when the JSON key names differ from the property names you want to use in Swift. For example, a JSON field "first_name" (snake_case) can be mapped to a Swift property firstName (camelCase) by declaring: case firstName = "first_name". If all names match, CodingKeys can be omitted and Swift synthesizes the mapping automatically. Alternatively, set decoder.keyDecodingStrategy = .convertFromSnakeCase to handle snake_case globally without per-type CodingKeys.',
    },
    {
      q: 'How do I handle optional or missing JSON fields in Swift Codable?',
      a: 'Declare the property as an Optional (e.g., var bio: String?) in your Swift struct. If the JSON key is absent or its value is null, JSONDecoder assigns nil to the optional property instead of throwing an error. If you want a default value instead of nil, implement a custom init(from:) and use decodeIfPresent together with the nil-coalescing operator: self.bio = try container.decodeIfPresent(String.self, forKey: .bio) ?? "No bio".',
    },
    {
      q: 'How do I decode a JSON array into a Swift array?',
      a: 'Pass an array type directly to JSONDecoder.decode: let users = try JSONDecoder().decode([User].self, from: data). Because Swift generics preserve type information at runtime (unlike Java type erasure), no extra wrapper is needed. For a top-level JSON array you decode [User].self; for a nested array field, simply declare the property as [Item] in your struct and Codable handles it automatically.',
    },
    {
      q: 'How do I decode JSON dates into Swift Date values?',
      a: 'Set the dateDecodingStrategy on your JSONDecoder before calling decode. The most common options are: .iso8601 for ISO 8601 strings like "2024-01-15T10:30:00Z"; .secondsSince1970 or .millisecondsSince1970 for numeric Unix timestamps; and .formatted(DateFormatter) for custom patterns. Example: let decoder = JSONDecoder(); decoder.dateDecodingStrategy = .iso8601; let event = try decoder.decode(Event.self, from: data). Declare the Swift property as Date and Codable handles the rest.',
    },
    {
      q: 'How do I map a JSON string value to a Swift enum?',
      a: 'Declare an enum that conforms to String and Codable (or just Decodable). Swift automatically maps JSON string values to enum cases by raw value. Example: enum Status: String, Codable { case active = "active"; case inactive = "inactive"; case pending = "pending" }. In your struct, use var status: Status. If the JSON contains an unexpected string, decoding throws a DecodingError.dataCorrupted. To be resilient, use an optional (var status: Status?) or add an unknown case.',
    },
    {
      q: 'What is the difference between struct and class for Codable in Swift?',
      a: 'Both structs and classes can conform to Codable. Structs are value types (copied on assignment), are thread-safe by default, and are the idiomatic Swift choice for data models. Classes are reference types and are useful when you need inheritance or shared mutable state. For JSON models, prefer structs unless you need class-specific features. The Codable synthesis works identically for both, but structs do not require an explicit initializer — the compiler generates a memberwise init automatically.',
    },
    {
      q: 'How do I implement a custom init(from:) for complex JSON transformations?',
      a: 'Implement init(from decoder: Decoder) throws manually when automatic synthesis is not sufficient. Inside, call decoder.container(keyedBy: CodingKeys.self) to get a keyed container, then use container.decode(_:forKey:) for required fields and container.decodeIfPresent(_:forKey:) for optional fields. You can also read a nested container with container.nestedContainer(keyedBy:forKey:) or decode arrays with container.decode([T].self, forKey:). This gives you full control over the transformation, including merging multiple JSON fields into one Swift property.',
    },
  ];

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map(item => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    })),
  };

  return (
    <article style={{ maxWidth: 820, margin: '0 auto', lineHeight: 1.75 }}>
      {/* FAQ Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* ---- TL;DR Box ---- */}
      <div style={{
        background: '#f0f9ff',
        border: '1px solid #bae6fd',
        borderRadius: 8,
        padding: '16px 20px',
        marginBottom: 32,
      }}>
        <p style={{ fontWeight: 700, fontSize: 16, marginBottom: 8, marginTop: 0 }}>TL;DR</p>
        <p style={{ margin: 0, fontSize: 15 }}>
          {t.tldr}{' '}
          <Link href={toolLink} style={{ color: '#2563eb', fontWeight: 600 }}>
            {t.tryTool}
          </Link>
        </p>
      </div>

      {/* ---- Key Takeaways ---- */}
      <div style={{
        background: '#f8fafc',
        borderRadius: 8,
        padding: '16px 20px',
        marginBottom: 40,
      }}>
        <p style={{ fontWeight: 700, fontSize: 16, marginBottom: 12, marginTop: 0 }}>{t.takeawaysTitle}</p>
        <ul style={{ margin: 0, paddingLeft: 20, fontSize: 15, display: 'flex', flexDirection: 'column', gap: 6 }}>
          <li>Conform your Swift struct to <code style={{ background: '#f1f5f9', padding: '1px 4px', borderRadius: 3 }}>Codable</code> and get automatic JSON encode/decode with zero boilerplate.</li>
          <li>Use <code style={{ background: '#f1f5f9', padding: '1px 4px', borderRadius: 3 }}>CodingKeys</code> to map snake_case JSON keys to camelCase Swift properties, or set <code style={{ background: '#f1f5f9', padding: '1px 4px', borderRadius: 3 }}>keyDecodingStrategy = .convertFromSnakeCase</code> globally.</li>
          <li>Declare properties as <code style={{ background: '#f1f5f9', padding: '1px 4px', borderRadius: 3 }}>Optional</code> (e.g., <code style={{ background: '#f1f5f9', padding: '1px 4px', borderRadius: 3 }}>String?</code>) to gracefully handle missing or null JSON fields.</li>
          <li>Set <code style={{ background: '#f1f5f9', padding: '1px 4px', borderRadius: 3 }}>decoder.dateDecodingStrategy = .iso8601</code> to decode ISO 8601 date strings directly into Swift <code style={{ background: '#f1f5f9', padding: '1px 4px', borderRadius: 3 }}>Date</code> values.</li>
          <li>Enum types conforming to <code style={{ background: '#f1f5f9', padding: '1px 4px', borderRadius: 3 }}>String, Codable</code> automatically map JSON string values to strongly typed enum cases.</li>
          <li>Use <code style={{ background: '#f1f5f9', padding: '1px 4px', borderRadius: 3 }}>async/await</code> with <code style={{ background: '#f1f5f9', padding: '1px 4px', borderRadius: 3 }}>URLSession.data(from:)</code> and <code style={{ background: '#f1f5f9', padding: '1px 4px', borderRadius: 3 }}>JSONDecoder</code> for clean, concise networking code.</li>
          <li>Implement a custom <code style={{ background: '#f1f5f9', padding: '1px 4px', borderRadius: 3 }}>init(from:)</code> for complex transformations that automatic synthesis cannot handle.</li>
        </ul>
      </div>

      {/* ---- Section 1: Why Codable ---- */}
      <h2 style={{ fontSize: 26, fontWeight: 800, marginTop: 48, marginBottom: 16 }}>
        {t.whyTitle}
      </h2>
      <p style={{ fontSize: 15, marginBottom: 12 }}>
        Before Swift 4, JSON parsing required manually casting values from <code style={{ background: '#f1f5f9', padding: '1px 5px', borderRadius: 3 }}>JSONSerialization</code> output — verbose, error-prone, and completely untyped. The Codable protocol changed everything by letting the Swift compiler synthesize all encoding and decoding logic automatically from your type declarations.
      </p>

      <h3 style={{ fontSize: 20, fontWeight: 700, marginTop: 24, marginBottom: 10 }}>Codable vs Manual Parsing vs JSONSerialization</h3>
      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14, textAlign: 'left' }}>
          <thead>
            <tr style={{ background: '#f1f5f9', borderBottom: '2px solid #e2e8f0' }}>
              <th style={{ padding: '10px 14px', fontWeight: 700 }}>Approach</th>
              <th style={{ padding: '10px 14px', fontWeight: 700 }}>Type Safety</th>
              <th style={{ padding: '10px 14px', fontWeight: 700 }}>Boilerplate</th>
              <th style={{ padding: '10px 14px', fontWeight: 700 }}>Best For</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Codable + JSONDecoder', 'Full', 'Minimal', 'All modern Swift projects'],
              ['JSONSerialization', 'None', 'High', 'Dynamic / unknown schemas'],
              ['SwiftyJSON / Argo', 'Partial', 'Medium', 'Legacy codebases'],
            ].map(([approach, safety, boilerplate, bestFor], idx) => (
              <tr key={idx} style={{ borderBottom: '1px solid #e2e8f0', background: idx % 2 === 0 ? '#fff' : '#f8fafc' }}>
                <td style={{ padding: '8px 14px', fontFamily: 'monospace', fontWeight: 600 }}>{approach}</td>
                <td style={{ padding: '8px 14px' }}>{safety}</td>
                <td style={{ padding: '8px 14px' }}>{boilerplate}</td>
                <td style={{ padding: '8px 14px' }}>{bestFor}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p style={{ fontSize: 15, marginBottom: 12 }}>
        With Codable, you describe <em>what</em> your data looks like through Swift types — the compiler figures out <em>how</em> to parse it. This gives you compile-time error detection, full IDE autocomplete, and easy refactoring support.
      </p>
      <p style={{ fontSize: 15, marginBottom: 20 }}>
        <Link href={toolLink} style={{ color: '#2563eb', fontWeight: 600 }}>
          Generate Swift structs from JSON instantly with our free tool &rarr;
        </Link>
      </p>

      {/* ---- Section 2: Basic Codable Struct ---- */}
      <h2 style={{ fontSize: 26, fontWeight: 800, marginTop: 48, marginBottom: 16 }}>
        Basic Swift Struct with Codable and JSONDecoder
      </h2>
      <p style={{ fontSize: 15, marginBottom: 12 }}>
        The simplest case: your JSON keys already match Swift property names exactly. Given this JSON:
      </p>
      <pre style={{
        background: '#1e293b',
        color: '#e2e8f0',
        padding: '16px 20px',
        borderRadius: 8,
        overflowX: 'auto',
        fontSize: 14,
        lineHeight: 1.6,
        marginBottom: 16,
      }}>
{`{
  "id": 1,
  "name": "Alice",
  "email": "alice@example.com",
  "isActive": true,
  "score": 98.5
}`}
      </pre>
      <p style={{ fontSize: 15, marginBottom: 8 }}>The corresponding Swift struct and decoding code:</p>
      <pre style={{
        background: '#1e293b',
        color: '#e2e8f0',
        padding: '16px 20px',
        borderRadius: 8,
        overflowX: 'auto',
        fontSize: 14,
        lineHeight: 1.6,
        marginBottom: 16,
      }}>
{`import Foundation

// 1. Declare your struct conforming to Codable
struct User: Codable {
    let id: Int
    let name: String
    let email: String
    let isActive: Bool
    let score: Double
}

// 2. Decode from JSON Data
let jsonString = """
{
    "id": 1,
    "name": "Alice",
    "email": "alice@example.com",
    "isActive": true,
    "score": 98.5
}
"""
let data = Data(jsonString.utf8)
let decoder = JSONDecoder()
let user = try decoder.decode(User.self, from: data)

print(user.name)    // "Alice"
print(user.score)   // 98.5

// 3. Encode back to JSON
let encoder = JSONEncoder()
encoder.outputFormatting = .prettyPrinted
let encoded = try encoder.encode(user)
print(String(data: encoded, encoding: .utf8)!)`}
      </pre>

      {/* ---- Section 3: CodingKeys ---- */}
      <h2 style={{ fontSize: 26, fontWeight: 800, marginTop: 48, marginBottom: 16 }}>
        CodingKeys: Mapping snake_case JSON to camelCase Swift
      </h2>
      <p style={{ fontSize: 15, marginBottom: 12 }}>
        REST APIs commonly return snake_case field names (<code style={{ background: '#f1f5f9', padding: '1px 5px', borderRadius: 3 }}>first_name</code>, <code style={{ background: '#f1f5f9', padding: '1px 5px', borderRadius: 3 }}>user_id</code>), while Swift convention prefers camelCase. Use a nested <code style={{ background: '#f1f5f9', padding: '1px 5px', borderRadius: 3 }}>CodingKeys</code> enum to bridge the gap:
      </p>
      <pre style={{
        background: '#1e293b',
        color: '#e2e8f0',
        padding: '16px 20px',
        borderRadius: 8,
        overflowX: 'auto',
        fontSize: 14,
        lineHeight: 1.6,
        marginBottom: 16,
      }}>
{`// JSON: { "user_id": 42, "first_name": "Bob", "last_name": "Jones", "email_address": "bob@example.com" }

struct User: Codable {
    let userId: Int
    let firstName: String
    let lastName: String
    let emailAddress: String

    enum CodingKeys: String, CodingKey {
        case userId       = "user_id"
        case firstName    = "first_name"
        case lastName     = "last_name"
        case emailAddress = "email_address"
    }
}

// Alternative: use keyDecodingStrategy to avoid per-type CodingKeys
let decoder = JSONDecoder()
decoder.keyDecodingStrategy = .convertFromSnakeCase
// Now "first_name" maps to firstName automatically — no CodingKeys needed`}
      </pre>
      <p style={{ fontSize: 15, marginBottom: 12 }}>
        <code style={{ background: '#f1f5f9', padding: '1px 5px', borderRadius: 3 }}>keyDecodingStrategy = .convertFromSnakeCase</code> is the global solution and eliminates repetitive CodingKeys for all your types at once. Use explicit CodingKeys when you need fine-grained control or when names do not follow a consistent pattern.
      </p>

      {/* ---- Section 4: Optional Properties ---- */}
      <h2 style={{ fontSize: 26, fontWeight: 800, marginTop: 48, marginBottom: 16 }}>
        Optional Properties and Null Handling
      </h2>
      <p style={{ fontSize: 15, marginBottom: 12 }}>
        APIs often return fields that may be absent or explicitly null. Swift optional types handle both cases seamlessly:
      </p>
      <pre style={{
        background: '#1e293b',
        color: '#e2e8f0',
        padding: '16px 20px',
        borderRadius: 8,
        overflowX: 'auto',
        fontSize: 14,
        lineHeight: 1.6,
        marginBottom: 16,
      }}>
{`struct UserProfile: Codable {
    let id: Int
    let username: String
    let bio: String?          // nil if absent or null in JSON
    let avatarUrl: URL?       // nil if absent or null
    let followersCount: Int   // required, throws if missing
}

// JSON with missing optional fields — decodes successfully
let json = """
{
    "id": 7,
    "username": "swiftdev",
    "followersCount": 320
}
"""
let profile = try JSONDecoder().decode(UserProfile.self, from: Data(json.utf8))
print(profile.bio ?? "No bio")         // "No bio"
print(profile.avatarUrl?.absoluteString ?? "No avatar")

// Provide default values with custom init(from:)
struct Config: Codable {
    let timeout: Int
    let retries: Int

    init(from decoder: Decoder) throws {
        let c = try decoder.container(keyedBy: CodingKeys.self)
        timeout = try c.decodeIfPresent(Int.self, forKey: .timeout) ?? 30
        retries = try c.decodeIfPresent(Int.self, forKey: .retries) ?? 3
    }
}`}
      </pre>

      {/* ---- Section 5: Nested Structs and Arrays ---- */}
      <h2 style={{ fontSize: 26, fontWeight: 800, marginTop: 48, marginBottom: 16 }}>
        Nested Structs and Arrays
      </h2>
      <p style={{ fontSize: 15, marginBottom: 12 }}>
        JSON often contains nested objects and arrays. Codable handles multiple levels of nesting recursively — simply declare nested Swift structs and arrays of the appropriate types:
      </p>
      <pre style={{
        background: '#1e293b',
        color: '#e2e8f0',
        padding: '16px 20px',
        borderRadius: 8,
        overflowX: 'auto',
        fontSize: 14,
        lineHeight: 1.6,
        marginBottom: 16,
      }}>
{`// JSON:
// {
//   "order": { "id": "ORD-001", "total": 149.99 },
//   "customer": { "name": "Alice", "email": "alice@example.com" },
//   "items": [
//     { "sku": "SWIFT-BOOK", "qty": 2, "price": 49.99 },
//     { "sku": "XCODE-PLUGIN", "qty": 1, "price": 50.01 }
//   ]
// }

struct OrderResponse: Codable {
    let order: Order
    let customer: Customer
    let items: [OrderItem]
}

struct Order: Codable {
    let id: String
    let total: Double
}

struct Customer: Codable {
    let name: String
    let email: String
}

struct OrderItem: Codable {
    let sku: String
    let qty: Int
    let price: Double
}

let response = try JSONDecoder().decode(OrderResponse.self, from: data)
print(response.order.id)          // "ORD-001"
print(response.items.count)       // 2
print(response.items[0].sku)      // "SWIFT-BOOK"

// Decode a top-level JSON array
let users = try JSONDecoder().decode([User].self, from: arrayData)`}
      </pre>

      {/* ---- Section 6: Enums ---- */}
      <h2 style={{ fontSize: 26, fontWeight: 800, marginTop: 48, marginBottom: 16 }}>
        Enums with RawRepresentable for JSON String Values
      </h2>
      <p style={{ fontSize: 15, marginBottom: 12 }}>
        When a JSON field has a fixed set of string values, model it as a Swift <code style={{ background: '#f1f5f9', padding: '1px 5px', borderRadius: 3 }}>enum</code> conforming to <code style={{ background: '#f1f5f9', padding: '1px 5px', borderRadius: 3 }}>String, Codable</code>. Swift automatically maps raw values to enum cases:
      </p>
      <pre style={{
        background: '#1e293b',
        color: '#e2e8f0',
        padding: '16px 20px',
        borderRadius: 8,
        overflowX: 'auto',
        fontSize: 14,
        lineHeight: 1.6,
        marginBottom: 16,
      }}>
{`enum SubscriptionTier: String, Codable {
    case free     = "free"
    case pro      = "pro"
    case enterprise = "enterprise"
}

enum NotificationStatus: String, Codable {
    case sent
    case delivered
    case failed
    // raw values default to case name strings: "sent", "delivered", "failed"
}

struct Account: Codable {
    let id: Int
    let tier: SubscriptionTier
    let lastNotification: NotificationStatus?
}

let json = """{ "id": 5, "tier": "pro", "lastNotification": "delivered" }"""
let account = try JSONDecoder().decode(Account.self, from: Data(json.utf8))
print(account.tier)  // SubscriptionTier.pro

// Handle unknown values gracefully with an unknown case
enum Status: String, Codable {
    case active, inactive, pending
    case unknown

    init(from decoder: Decoder) throws {
        let raw = try decoder.singleValueContainer().decode(String.self)
        self = Status(rawValue: raw) ?? .unknown
    }
}`}
      </pre>

      {/* ---- Section 7: Date Handling ---- */}
      <h2 style={{ fontSize: 26, fontWeight: 800, marginTop: 48, marginBottom: 16 }}>
        Date Handling with DateDecodingStrategy
      </h2>
      <p style={{ fontSize: 15, marginBottom: 12 }}>
        Configure <code style={{ background: '#f1f5f9', padding: '1px 5px', borderRadius: 3 }}>JSONDecoder.dateDecodingStrategy</code> before decoding to convert JSON date representations into Swift <code style={{ background: '#f1f5f9', padding: '1px 5px', borderRadius: 3 }}>Date</code> values:
      </p>
      <pre style={{
        background: '#1e293b',
        color: '#e2e8f0',
        padding: '16px 20px',
        borderRadius: 8,
        overflowX: 'auto',
        fontSize: 14,
        lineHeight: 1.6,
        marginBottom: 16,
      }}>
{`struct Event: Codable {
    let title: String
    let startsAt: Date
    let endsAt: Date
    let createdAt: Date
}

// ISO 8601 strings: "2024-06-15T09:00:00Z"
let isoDecoder = JSONDecoder()
isoDecoder.keyDecodingStrategy = .convertFromSnakeCase
isoDecoder.dateDecodingStrategy = .iso8601
let event = try isoDecoder.decode(Event.self, from: data)

// Unix timestamps (seconds since 1970)
let tsDecoder = JSONDecoder()
tsDecoder.dateDecodingStrategy = .secondsSince1970
// or: .millisecondsSince1970

// Custom date format: "2024-06-15 09:00:00"
let customDecoder = JSONDecoder()
let formatter = DateFormatter()
formatter.dateFormat = "yyyy-MM-dd HH:mm:ss"
formatter.locale = Locale(identifier: "en_US_POSIX")
customDecoder.dateDecodingStrategy = .formatted(formatter)

// Encoding dates
let encoder = JSONEncoder()
encoder.dateEncodingStrategy = .iso8601
let encoded = try encoder.encode(event)`}
      </pre>

      {/* ---- Section 8: Error Handling ---- */}
      <h2 style={{ fontSize: 26, fontWeight: 800, marginTop: 48, marginBottom: 16 }}>
        Error Handling with DecodingError
      </h2>
      <p style={{ fontSize: 15, marginBottom: 12 }}>
        JSONDecoder throws typed <code style={{ background: '#f1f5f9', padding: '1px 5px', borderRadius: 3 }}>DecodingError</code> values that tell you exactly which key or type caused the failure. Always handle these errors in production code:
      </p>
      <pre style={{
        background: '#1e293b',
        color: '#e2e8f0',
        padding: '16px 20px',
        borderRadius: 8,
        overflowX: 'auto',
        fontSize: 14,
        lineHeight: 1.6,
        marginBottom: 16,
      }}>
{`func decodeUser(from data: Data) -> User? {
    do {
        return try JSONDecoder().decode(User.self, from: data)
    } catch DecodingError.keyNotFound(let key, let context) {
        print("Missing key '\\(key.stringValue)' at: \\(context.codingPath)")
    } catch DecodingError.typeMismatch(let type, let context) {
        print("Type mismatch — expected \\(type) at: \\(context.codingPath)")
    } catch DecodingError.valueNotFound(let type, let context) {
        print("Null value for \\(type) at: \\(context.codingPath)")
    } catch DecodingError.dataCorrupted(let context) {
        print("Data corrupted: \\(context.debugDescription)")
    } catch {
        print("Unknown error: \\(error.localizedDescription)")
    }
    return nil
}

// Swift 5.7+ result builder style
func safeDecodingUser(data: Data) -> Result<User, Error> {
    Result { try JSONDecoder().decode(User.self, from: data) }
}`}
      </pre>

      {/* ---- Section 9: Custom init(from:) ---- */}
      <h2 style={{ fontSize: 26, fontWeight: 800, marginTop: 48, marginBottom: 16 }}>
        Custom init(from:) for Complex Transformations
      </h2>
      <p style={{ fontSize: 15, marginBottom: 12 }}>
        When automatic synthesis is not enough — such as when merging multiple JSON fields, transforming values, or reading from a non-keyed container — implement <code style={{ background: '#f1f5f9', padding: '1px 5px', borderRadius: 3 }}>init(from decoder: Decoder)</code> manually:
      </p>
      <pre style={{
        background: '#1e293b',
        color: '#e2e8f0',
        padding: '16px 20px',
        borderRadius: 8,
        overflowX: 'auto',
        fontSize: 14,
        lineHeight: 1.6,
        marginBottom: 16,
      }}>
{`// JSON: { "lat": 37.7749, "lng": -122.4194, "label": "San Francisco" }
// We want: struct Location with a CLLocationCoordinate2D property

import CoreLocation

struct Location: Decodable {
    let coordinate: CLLocationCoordinate2D
    let label: String

    enum CodingKeys: String, CodingKey {
        case lat, lng, label
    }

    init(from decoder: Decoder) throws {
        let c = try decoder.container(keyedBy: CodingKeys.self)
        let lat = try c.decode(Double.self, forKey: .lat)
        let lng = try c.decode(Double.self, forKey: .lng)
        coordinate = CLLocationCoordinate2D(latitude: lat, longitude: lng)
        label = try c.decode(String.self, forKey: .label)
    }
}

// Handling polymorphic JSON with a "type" discriminator
struct AnyShape: Decodable {
    let shape: any ShapeProtocol

    enum TypeKey: String, CodingKey { case type }

    init(from decoder: Decoder) throws {
        let meta = try decoder.container(keyedBy: TypeKey.self)
        let kind = try meta.decode(String.self, forKey: .type)
        switch kind {
        case "circle":
            shape = try Circle(from: decoder)
        case "rectangle":
            shape = try Rectangle(from: decoder)
        default:
            throw DecodingError.dataCorruptedError(
                forKey: .type, in: meta,
                debugDescription: "Unknown shape type: \\(kind)"
            )
        }
    }
}`}
      </pre>

      {/* ---- Section 10: Networking with URLSession ---- */}
      <h2 style={{ fontSize: 26, fontWeight: 800, marginTop: 48, marginBottom: 16 }}>
        Networking with URLSession and async/await
      </h2>
      <p style={{ fontSize: 15, marginBottom: 12 }}>
        Combining <code style={{ background: '#f1f5f9', padding: '1px 5px', borderRadius: 3 }}>URLSession</code> async/await with <code style={{ background: '#f1f5f9', padding: '1px 5px', borderRadius: 3 }}>JSONDecoder</code> produces clean, readable networking code with minimal ceremony:
      </p>
      <pre style={{
        background: '#1e293b',
        color: '#e2e8f0',
        padding: '16px 20px',
        borderRadius: 8,
        overflowX: 'auto',
        fontSize: 14,
        lineHeight: 1.6,
        marginBottom: 16,
      }}>
{`import Foundation

// Reusable API client
struct APIClient {
    private let decoder: JSONDecoder = {
        let d = JSONDecoder()
        d.keyDecodingStrategy = .convertFromSnakeCase
        d.dateDecodingStrategy = .iso8601
        return d
    }()

    func fetch<T: Decodable>(_ type: T.Type, from url: URL) async throws -> T {
        let (data, response) = try await URLSession.shared.data(from: url)
        guard let http = response as? HTTPURLResponse,
              (200...299).contains(http.statusCode) else {
            throw URLError(.badServerResponse)
        }
        return try decoder.decode(T.self, from: data)
    }
}

// Usage
struct Post: Decodable {
    let id: Int
    let title: String
    let body: String
    let userId: Int   // decoded from "user_id" via convertFromSnakeCase
}

let client = APIClient()
let url = URL(string: "https://jsonplaceholder.typicode.com/posts/1")!
let post = try await client.fetch(Post.self, from: url)
print(post.title)

// Fetch an array
let postsUrl = URL(string: "https://jsonplaceholder.typicode.com/posts")!
let posts = try await client.fetch([Post].self, from: postsUrl)
print("Loaded \\(posts.count) posts")`}
      </pre>

      {/* ---- Section 11: JSONEncoder Options ---- */}
      <h2 style={{ fontSize: 26, fontWeight: 800, marginTop: 48, marginBottom: 16 }}>
        JSONEncoder: Serializing Swift Structs to JSON
      </h2>
      <p style={{ fontSize: 15, marginBottom: 12 }}>
        <code style={{ background: '#f1f5f9', padding: '1px 5px', borderRadius: 3 }}>JSONEncoder</code> mirrors the decoder API. Use it to convert Swift structs back to JSON for API requests or local storage:
      </p>
      <pre style={{
        background: '#1e293b',
        color: '#e2e8f0',
        padding: '16px 20px',
        borderRadius: 8,
        overflowX: 'auto',
        fontSize: 14,
        lineHeight: 1.6,
        marginBottom: 16,
      }}>
{`struct CreateUserRequest: Encodable {
    let firstName: String
    let lastName: String
    let email: String
}

let encoder = JSONEncoder()
encoder.keyEncodingStrategy = .convertToSnakeCase  // camelCase → snake_case
encoder.outputFormatting = [.prettyPrinted, .sortedKeys]
encoder.dateEncodingStrategy = .iso8601

let request = CreateUserRequest(
    firstName: "Carol",
    lastName: "Chen",
    email: "carol@example.com"
)

let jsonData = try encoder.encode(request)
let jsonString = String(data: jsonData, encoding: .utf8)!
// Output:
// {
//   "email" : "carol@example.com",
//   "first_name" : "Carol",
//   "last_name" : "Chen"
// }

// Use in a URLRequest
var urlRequest = URLRequest(url: URL(string: "https://api.example.com/users")!)
urlRequest.httpMethod = "POST"
urlRequest.httpBody = jsonData
urlRequest.setValue("application/json", forHTTPHeaderField: "Content-Type")`}
      </pre>

      {/* ---- Section 12: Tool CTA ---- */}
      <div style={{
        background: '#f0f9ff',
        border: '1px solid #bae6fd',
        borderRadius: 8,
        padding: '20px 24px',
        marginTop: 48,
        marginBottom: 48,
      }}>
        <p style={{ fontWeight: 700, fontSize: 18, marginTop: 0, marginBottom: 8 }}>
          Generate Swift Structs from JSON Instantly
        </p>
        <p style={{ fontSize: 15, marginBottom: 16 }}>
          Paste your JSON and get ready-to-use Swift structs with Codable conformance, CodingKeys, and proper optionals — no manual typing required.
        </p>
        <Link href={toolLink} style={{
          display: 'inline-block',
          background: '#2563eb',
          color: '#fff',
          padding: '10px 22px',
          borderRadius: 6,
          fontWeight: 700,
          fontSize: 15,
          textDecoration: 'none',
        }}>
          Try JSON to Swift Tool &rarr;
        </Link>
      </div>

      {/* ---- FAQ Section ---- */}
      <h2 style={{ fontSize: 26, fontWeight: 800, marginTop: 48, marginBottom: 24 }}>
        {t.faqTitle}
      </h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        {faqItems.map((item, idx) => (
          <div key={idx} style={{
            borderLeft: '3px solid #bae6fd',
            paddingLeft: 16,
          }}>
            <p style={{ fontWeight: 700, fontSize: 16, marginTop: 0, marginBottom: 8 }}>
              {item.q}
            </p>
            <p style={{ fontSize: 15, margin: 0, color: '#374151' }}>
              {item.a}
            </p>
          </div>
        ))}
      </div>
    </article>
  );
}
