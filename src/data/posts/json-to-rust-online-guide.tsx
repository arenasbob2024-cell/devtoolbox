'use client';

/* -----------------------------------------------------------------------
   JSON to Rust Struct: Complete Guide with Serde and serde_json
   Canonical: https://viadreams.cc/en/blog/json-to-rust-online-guide
----------------------------------------------------------------------- */

const translations = {
  en: {
    title: 'JSON to Rust Struct: Complete Guide with Serde and serde_json',
    description:
      'Convert JSON to Rust structs with Serde derive macros, custom attributes, and type-safe deserialization. Complete guide for Rust developers.',
  },
  zh: {
    title: 'JSON 转 Rust 结构体：Serde 完整指南',
    description:
      '使用 Serde derive 宏、自定义属性和类型安全反序列化将 JSON 转换为 Rust 结构体。',
  },
  ja: {
    title: 'JSONをRust構造体に変換：Serdeを使った完全ガイド',
    description:
      'Serdeのderiveマクロ、カスタム属性、型安全なデシリアライゼーションを使用してJSONをRust構造体に変換します。',
  },
  ko: {
    title: 'JSON을 Rust 구조체로 변환: Serde 완전 가이드',
    description:
      'Serde derive 매크로, 커스텀 속성, 타입 안전 역직렬화로 JSON을 Rust 구조체로 변환합니다.',
  },
  de: {
    title: 'JSON zu Rust Struct: Vollständiger Leitfaden mit Serde',
    description:
      'Konvertieren Sie JSON in Rust-Structs mit Serde-Derive-Makros, benutzerdefinierten Attributen und typsicherer Deserialisierung.',
  },
  fr: {
    title: 'JSON vers Struct Rust : Guide Complet avec Serde',
    description:
      'Convertissez JSON en structs Rust avec les macros derive Serde, attributs personnalisés et désérialisation type-safe.',
  },
  es: {
    title: 'JSON a Rust Struct: Guía Completa con Serde',
    description:
      'Convierte JSON a structs Rust con macros derive de Serde, atributos personalizados y deserialización con tipos seguros.',
  },
  it: {
    title: 'Da JSON a Rust Struct: Guida Completa con Serde',
    description:
      'Converti JSON in structs Rust con macro derive Serde, attributi personalizzati e deserializzazione type-safe.',
  },
  pt: {
    title: 'JSON para Rust Struct: Guia Completo com Serde',
    description:
      'Converta JSON em structs Rust com macros derive Serde, atributos personalizados e desserialização com segurança de tipos.',
  },
  nl: {
    title: 'JSON naar Rust Struct: Complete Gids met Serde',
    description:
      "Converteer JSON naar Rust-structs met Serde derive-macro's, aangepaste attributen en type-veilige deserialisatie.",
  },
  pl: {
    title: 'JSON do Rust Struct: Kompletny Przewodnik z Serde',
    description:
      'Konwertuj JSON na structs Rust za pomocą makr derive Serde, niestandardowych atrybutów i bezpiecznej deserializacji.',
  },
  sv: {
    title: 'JSON till Rust Struct: Komplett Guide med Serde',
    description:
      'Konvertera JSON till Rust-structs med Serde derive-makron, anpassade attribut och typsäker deserialisering.',
  },
  no: {
    title: 'JSON til Rust Struct: Komplett Guide med Serde',
    description:
      'Konverter JSON til Rust-structs med Serde derive-makroer, egendefinerte attributter og typesikker deserialisering.',
  },
  id: {
    title: 'JSON ke Rust Struct: Panduan Lengkap dengan Serde',
    description:
      'Konversi JSON ke structs Rust dengan macro derive Serde, atribut kustom, dan deserialisasi yang aman tipe.',
  },
  th: {
    title: 'JSON เป็น Rust Struct: คู่มือสมบูรณ์กับ Serde',
    description:
      'แปลง JSON เป็น Rust structs ด้วย Serde derive macros, custom attributes และการแปลงที่ปลอดภัยด้านประเภท',
  },
};

const faqData = [
  {
    q: 'What is Serde and why is it used for JSON in Rust?',
    a: 'Serde is Rust\'s de-facto serialization/deserialization framework. It provides generic Serialize and Deserialize traits. serde_json is the concrete implementation for JSON. Using #[derive(Serialize, Deserialize)] on your structs, Serde generates all the parsing and serialization code at compile time with zero runtime overhead.',
  },
  {
    q: 'How do I add Serde to my Rust project?',
    a: 'Add to Cargo.toml: serde = { version = "1", features = ["derive"] } and serde_json = "1". The "derive" feature enables the #[derive(Serialize, Deserialize)] macros. Then import with: use serde::{Deserialize, Serialize}; in each file that uses it.',
  },
  {
    q: 'How do I handle camelCase JSON keys with snake_case Rust fields?',
    a: 'Use #[serde(rename_all = "camelCase")] on the struct. This converts all field names automatically: user_name becomes "userName", created_at becomes "createdAt". For a single field use #[serde(rename = "specificKey")]. Supported strategies include camelCase, PascalCase, snake_case, SCREAMING_SNAKE_CASE, and kebab-case.',
  },
  {
    q: 'How does Option<T> work with serde_json for nullable fields?',
    a: 'Option<T> maps naturally: None serializes as null, absent keys deserialize as None. Use #[serde(skip_serializing_if = "Option::is_none")] to omit None fields from output. Use #[serde(default)] to treat absent keys as None. For fields that can be both absent and null, use Option<Option<T>>.',
  },
  {
    q: 'How do I deserialize JSON arrays in Rust?',
    a: 'Use Vec<T> where T implements Deserialize. Serde handles it automatically: let items: Vec<Item> = serde_json::from_str(json)?; In a struct field, declare tags: Vec<Tag>. For optional arrays use Option<Vec<T>>. For heterogeneous arrays use Vec<serde_json::Value>.',
  },
  {
    q: 'What are the different enum tagging strategies in Serde?',
    a: 'Serde supports four enum representations: External tagging (default) wraps data in the variant name key. Internal tagging (#[serde(tag = "type")]) adds a discriminant field inside the object. Adjacent tagging (#[serde(tag = "type", content = "data")]) keeps type and data separate. Untagged (#[serde(untagged)]) tries each variant in order — useful for union types.',
  },
  {
    q: 'When should I use serde_json::Value instead of a struct?',
    a: 'Use serde_json::Value when the JSON structure is unknown at compile time, for truly dynamic data, or when you need to inspect/modify JSON before converting. Value has variants: Null, Bool, Number, String, Array(Vec<Value>), Object(Map<String, Value>). Access with v["key"] and cast with v.as_str(), v.as_i64(), v.as_f64().',
  },
  {
    q: 'How do I integrate serde_json with Axum or Actix-web?',
    a: 'In Axum, use the Json extractor: async fn handler(Json(body): Json<MyRequest>) -> Json<MyResponse>. Axum automatically deserializes requests and serializes responses using serde_json. In Actix-web, use web::Json<T>: async fn handler(body: web::Json<MyRequest>) -> impl Responder. Both frameworks return 422 Unprocessable Entity on deserialization failure.',
  },
];

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqData.map((item) => ({
    '@type': 'Question',
    name: item.q,
    acceptedAnswer: { '@type': 'Answer', text: item.a },
  })),
};

export default function JsonToRustOnlineGuide({ lang }: { lang: string }) {
  const t = translations[lang as keyof typeof translations] || translations.en;

  return (
    <article style={{ maxWidth: '860px', margin: '0 auto', padding: '0 1rem', color: '#334155', lineHeight: 1.7, fontFamily: 'system-ui, sans-serif' }}>
      {/* SEO: canonical + JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <h1 style={{ fontSize: '2rem', fontWeight: '800', color: '#0f172a', marginBottom: '0.5rem', lineHeight: 1.3 }}>
        {t.title}
      </h1>
      <p style={{ color: '#64748b', marginBottom: '1.5rem', fontSize: '1rem' }}>
        {t.description}
      </p>

      {/* TL;DR Box */}
      <div style={{ background: '#f0f9ff', border: '1px solid #bae6fd', borderRadius: '8px', padding: '1rem', marginBottom: '1.5rem' }}>
        <strong style={{ color: '#0369a1' }}>TL;DR</strong>
        <p style={{ margin: '0.5rem 0 0', color: '#0c4a6e' }}>
          Add <code style={{ background: '#e0f2fe', padding: '2px 6px', borderRadius: '4px' }}>serde = {'{ version: "1", features: ["derive"] }'}</code> and{' '}
          <code style={{ background: '#e0f2fe', padding: '2px 6px', borderRadius: '4px' }}>serde_json = "1"</code> to Cargo.toml.
          Annotate your structs with <code style={{ background: '#e0f2fe', padding: '2px 6px', borderRadius: '4px' }}>#[derive(Serialize, Deserialize)]</code>.
          Use <code style={{ background: '#e0f2fe', padding: '2px 6px', borderRadius: '4px' }}>#[serde(rename_all = "camelCase")]</code> for JavaScript APIs,{' '}
          <code style={{ background: '#e0f2fe', padding: '2px 6px', borderRadius: '4px' }}>Option{'<T>'}</code> for nullable fields, and{' '}
          <code style={{ background: '#e0f2fe', padding: '2px 6px', borderRadius: '4px' }}>serde_json::Value</code> for fully dynamic JSON.
        </p>
      </div>

      {/* Section 1: Why Serde */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        1. Why Use Serde for JSON in Rust
      </h2>
      <p>
        Rust has several JSON libraries, but Serde with serde_json is the ecosystem standard. Here is how the main options compare:
      </p>
      <div style={{ overflowX: 'auto', marginBottom: '1.5rem' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
          <thead>
            <tr style={{ background: '#1e293b', color: '#f8fafc' }}>
              <th style={{ padding: '10px 14px', textAlign: 'left', border: '1px solid #334155' }}>Crate</th>
              <th style={{ padding: '10px 14px', textAlign: 'left', border: '1px solid #334155' }}>Performance</th>
              <th style={{ padding: '10px 14px', textAlign: 'left', border: '1px solid #334155' }}>Ease of Use</th>
              <th style={{ padding: '10px 14px', textAlign: 'left', border: '1px solid #334155' }}>Features</th>
              <th style={{ padding: '10px 14px', textAlign: 'left', border: '1px solid #334155' }}>Ecosystem Support</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ background: '#ffffff' }}>
              <td style={{ padding: '9px 14px', border: '1px solid #e2e8f0', fontWeight: '700', color: '#0f172a' }}>serde_json</td>
              <td style={{ padding: '9px 14px', border: '1px solid #e2e8f0' }}>Very fast</td>
              <td style={{ padding: '9px 14px', border: '1px solid #e2e8f0' }}>Excellent (derive)</td>
              <td style={{ padding: '9px 14px', border: '1px solid #e2e8f0' }}>Full: rename, skip, flatten, tag</td>
              <td style={{ padding: '9px 14px', border: '1px solid #e2e8f0' }}>Dominant standard</td>
            </tr>
            <tr style={{ background: '#f8fafc' }}>
              <td style={{ padding: '9px 14px', border: '1px solid #e2e8f0', fontWeight: '700', color: '#0f172a' }}>json crate</td>
              <td style={{ padding: '9px 14px', border: '1px solid #e2e8f0' }}>Moderate</td>
              <td style={{ padding: '9px 14px', border: '1px solid #e2e8f0' }}>Good (no derive)</td>
              <td style={{ padding: '9px 14px', border: '1px solid #e2e8f0' }}>Basic value parsing</td>
              <td style={{ padding: '9px 14px', border: '1px solid #e2e8f0' }}>Minimal, niche use</td>
            </tr>
            <tr style={{ background: '#ffffff' }}>
              <td style={{ padding: '9px 14px', border: '1px solid #e2e8f0', fontWeight: '700', color: '#0f172a' }}>simd-json</td>
              <td style={{ padding: '9px 14px', border: '1px solid #e2e8f0' }}>Fastest (SIMD)</td>
              <td style={{ padding: '9px 14px', border: '1px solid #e2e8f0' }}>Good (serde compat)</td>
              <td style={{ padding: '9px 14px', border: '1px solid #e2e8f0' }}>Mostly serde_json API</td>
              <td style={{ padding: '9px 14px', border: '1px solid #e2e8f0' }}>Growing, x86/x64 only</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        For most Rust projects, <strong>serde_json</strong> is the right choice. It integrates with the entire Rust ecosystem — Axum, Actix-web, Reqwest, SQLx, and hundreds of other crates all use Serde as their serialization layer.
      </p>

      {/* Section 2: Basic Serde Setup */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        2. Basic Serde Setup
      </h2>
      <p>Start by adding the dependencies to your <code>Cargo.toml</code>:</p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`[dependencies]
serde = { version = "1", features = ["derive"] }
serde_json = "1"`}</code></pre>
      <p style={{ marginTop: '1rem' }}>
        The <code>features = ["derive"]</code> flag enables the procedural macros. Now define a struct and derive both traits:
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
struct User {
    id: u64,
    name: String,
    email: String,
    age: u32,
    active: bool,
}

fn main() -> Result<(), serde_json::Error> {
    // Deserialize: JSON string -> Rust struct
    let json = r#"{
        "id": 1,
        "name": "Alice",
        "email": "alice@example.com",
        "age": 30,
        "active": true
    }"#;

    let user: User = serde_json::from_str(json)?;
    println!("Name: {}", user.name);

    // Serialize: Rust struct -> JSON string
    let json_out = serde_json::to_string_pretty(&user)?;
    println!("{}", json_out);

    // from_slice works on bytes instead of &str
    let bytes = json.as_bytes();
    let user2: User = serde_json::from_slice(bytes)?;
    println!("Age: {}", user2.age);

    Ok(())
}`}</code></pre>

      {/* Section 3: Field Renaming and Attributes */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        3. Field Renaming and Attributes
      </h2>
      <p>
        Serde provides a rich set of field-level and struct-level attributes for controlling serialization behavior:
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`use serde::{Deserialize, Serialize};

// rename_all: convert all fields to camelCase
#[derive(Debug, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
struct ApiResponse {
    user_id: u64,       // JSON key: "userId"
    first_name: String, // JSON key: "firstName"
    last_name: String,  // JSON key: "lastName"
    created_at: String, // JSON key: "createdAt"
}

#[derive(Debug, Serialize, Deserialize)]
struct Product {
    // Rename a single field
    #[serde(rename = "product_id")]
    id: u64,

    // Skip this field entirely (not serialized or deserialized)
    #[serde(skip)]
    internal_cache: Option<String>,

    // Use Default::default() when field is absent from JSON
    #[serde(default)]
    discount: f64,

    // Skip serializing if the value is None
    #[serde(skip_serializing_if = "Option::is_none")]
    coupon_code: Option<String>,

    // Skip serializing if condition is met
    #[serde(skip_serializing_if = "Vec::is_empty")]
    tags: Vec<String>,
}

// Supported rename_all strategies:
// "camelCase"          → userId
// "PascalCase"         → UserId
// "snake_case"         → user_id
// "SCREAMING_SNAKE_CASE" → USER_ID
// "kebab-case"         → user-id
// "SCREAMING-KEBAB-CASE" → USER-ID`}</code></pre>

      {/* Section 4: Optional and Default Fields */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        4. Optional and Default Fields
      </h2>
      <p>
        Handling nullable and missing fields is one of the most common JSON parsing challenges. Serde provides several tools:
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`use serde::{Deserialize, Serialize};

fn default_page_size() -> usize { 20 }
fn default_active() -> bool { true }

#[derive(Debug, Serialize, Deserialize)]
struct UserProfile {
    id: u64,
    name: String,

    // Nullable: field can be null or a string
    // None serializes as JSON null
    avatar_url: Option<String>,

    // Missing field → uses Default::default() → 0
    #[serde(default)]
    login_count: u32,

    // Missing field → calls default_page_size() → 20
    #[serde(default = "default_page_size")]
    page_size: usize,

    // Missing or null → true
    #[serde(default = "default_active")]
    is_active: bool,

    // Omit from serialized output when None
    #[serde(skip_serializing_if = "Option::is_none")]
    bio: Option<String>,
}

// Difference: null vs absent
// Option<T>: field present as null → Some? NO → None
//            field absent          → None
//            field present as value → Some(value)
//
// For truly three-state (absent / null / value):
#[derive(Debug, Serialize, Deserialize)]
struct Patch {
    // None = absent (not updated), Some(None) = set to null, Some(Some(v)) = set value
    #[serde(default, skip_serializing_if = "Option::is_none")]
    email: Option<Option<String>>,
}`}</code></pre>

      {/* Section 5: Nested Structs and Arrays */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        5. Nested Structs and Arrays
      </h2>
      <p>
        Serde handles nested structures and arrays automatically through Rust&apos;s type system:
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`use serde::{Deserialize, Serialize};
use std::collections::HashMap;

#[derive(Debug, Serialize, Deserialize)]
struct Address {
    street: String,
    city: String,
    country: String,
    zip_code: String,
}

#[derive(Debug, Serialize, Deserialize)]
struct Tag {
    id: u32,
    name: String,
}

#[derive(Debug, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
struct BlogPost {
    id: u64,
    title: String,
    author: Author,               // nested struct
    tags: Vec<Tag>,               // array of structs
    images: Vec<String>,          // array of strings
    metadata: Option<PostMeta>,   // optional nested
    // HashMap for dynamic keys: {"en": "Hello", "es": "Hola"}
    translations: HashMap<String, String>,
}

#[derive(Debug, Serialize, Deserialize)]
struct Author {
    id: u64,
    name: String,
    address: Option<Address>,
}

#[derive(Debug, Serialize, Deserialize)]
struct PostMeta {
    views: u64,
    likes: u32,
}

// Nested arrays
#[derive(Debug, Serialize, Deserialize)]
struct Matrix {
    data: Vec<Vec<f64>>,           // [[1.0, 2.0], [3.0, 4.0]]
}

// HashMap with struct values for dynamic objects
#[derive(Debug, Serialize, Deserialize)]
struct Config {
    settings: HashMap<String, serde_json::Value>,  // arbitrary values
}`}</code></pre>

      {/* Section 6: Enums with Serde */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        6. Enums with Serde
      </h2>
      <p>
        Serde supports four enum representation modes, giving you full control over how discriminated unions appear in JSON:
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`use serde::{Deserialize, Serialize};

// 1. External tagging (default)
// {"Circle": {"radius": 1.0}}
#[derive(Debug, Serialize, Deserialize)]
enum Shape {
    Circle { radius: f64 },
    Rectangle { width: f64, height: f64 },
    Point,
}

// 2. Internal tagging: {"type": "Login", "user_id": 42}
#[derive(Debug, Serialize, Deserialize)]
#[serde(tag = "type")]
enum Event {
    Login { user_id: u64, timestamp: String },
    Logout { user_id: u64 },
    Purchase { user_id: u64, amount: f64 },
}

// 3. Adjacent tagging: {"type": "Email", "data": {...}}
#[derive(Debug, Serialize, Deserialize)]
#[serde(tag = "type", content = "data")]
enum Notification {
    Email { to: String, subject: String },
    Push { device_token: String, message: String },
}

// 4. Untagged: tries each variant in order
// Useful for union types from external APIs
#[derive(Debug, Serialize, Deserialize)]
#[serde(untagged)]
enum StringOrNumber {
    Text(String),
    Integer(i64),
    Float(f64),
}

// Simple string enums map to JSON strings
#[derive(Debug, Serialize, Deserialize)]
#[serde(rename_all = "lowercase")]
enum Status {
    Active,    // "active"
    Inactive,  // "inactive"
    Pending,   // "pending"
}`}</code></pre>

      {/* Section 7: Custom Deserialize */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        7. Custom Deserialize with deserialize_with
      </h2>
      <p>
        For special types like dates, use <code>deserialize_with</code> and <code>serialize_with</code> to plug in custom functions:
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`use serde::{Deserialize, Deserializer, Serialize, Serializer};
use serde::de::Error;

// Custom date handling with chrono
// Cargo.toml: chrono = { version = "0.4", features = ["serde"] }
use chrono::{DateTime, Utc, NaiveDate};

fn deserialize_date<'de, D>(deserializer: D) -> Result<NaiveDate, D::Error>
where
    D: Deserializer<'de>,
{
    let s = String::deserialize(deserializer)?;
    NaiveDate::parse_from_str(&s, "%Y-%m-%d").map_err(D::Error::custom)
}

fn serialize_date<S>(date: &NaiveDate, serializer: S) -> Result<S::Ok, S::Error>
where
    S: Serializer,
{
    serializer.serialize_str(&date.format("%Y-%m-%d").to_string())
}

#[derive(Debug, Serialize, Deserialize)]
struct Event {
    name: String,

    #[serde(
        deserialize_with = "deserialize_date",
        serialize_with = "serialize_date"
    )]
    date: NaiveDate,

    // chrono's built-in serde support handles RFC 3339
    created_at: DateTime<Utc>,
}

// Implementing Deserialize manually for complex cases
use serde::de::{self, Visitor, MapAccess};
use std::fmt;

struct PointVisitor;

impl<'de> Visitor<'de> for PointVisitor {
    type Value = (f64, f64);

    fn expecting(&self, formatter: &mut fmt::Formatter) -> fmt::Result {
        formatter.write_str("an array [x, y] or object {x, y}")
    }

    fn visit_seq<A>(self, mut seq: A) -> Result<Self::Value, A::Error>
    where
        A: serde::de::SeqAccess<'de>,
    {
        let x = seq.next_element()?.ok_or_else(|| de::Error::invalid_length(0, &self))?;
        let y = seq.next_element()?.ok_or_else(|| de::Error::invalid_length(1, &self))?;
        Ok((x, y))
    }
}`}</code></pre>

      {/* Section 8: serde_json::Value */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        8. serde_json::Value for Dynamic JSON
      </h2>
      <p>
        When the JSON structure is unknown at compile time, use <code>serde_json::Value</code>:
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`use serde_json::{Value, json};

fn process_dynamic_json(json_str: &str) -> Result<(), serde_json::Error> {
    let v: Value = serde_json::from_str(json_str)?;

    // Navigate with bracket indexing (returns &Value::Null if missing)
    let name = &v["user"]["name"];
    println!("{}", name); // "Alice" or null

    // Type-safe access with as_ methods
    if let Some(id) = v["user"]["id"].as_i64() {
        println!("ID: {}", id);
    }
    if let Some(email) = v["user"]["email"].as_str() {
        println!("Email: {}", email);
    }
    if let Some(active) = v["user"]["active"].as_bool() {
        println!("Active: {}", active);
    }

    // Safer access with get()
    if let Some(user) = v.get("user") {
        if let Some(tags) = user.get("tags") {
            if let Some(arr) = tags.as_array() {
                for tag in arr {
                    println!("Tag: {}", tag.as_str().unwrap_or("unknown"));
                }
            }
        }
    }

    // Build JSON with the json! macro
    let response = json!({
        "status": "ok",
        "count": 42,
        "items": ["a", "b", "c"],
        "meta": {
            "page": 1,
            "per_page": 20
        }
    });
    println!("{}", serde_json::to_string_pretty(&response)?);

    Ok(())
}

// Mix: typed struct with a dynamic field
use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
struct ApiResponse {
    status: String,
    code: u32,
    // This field can be any JSON value
    data: Value,
}`}</code></pre>

      {/* Section 9: Error Handling */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        9. Error Handling
      </h2>
      <p>
        serde_json returns a <code>serde_json::Error</code> which tells you what went wrong and where:
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`use serde::{Deserialize, Serialize};
use serde_json::Error;

#[derive(Debug, Deserialize)]
struct Config {
    host: String,
    port: u16,
    debug: bool,
}

fn parse_config(input: &str) -> Result<Config, Error> {
    // from_str: parse &str
    serde_json::from_str(input)
}

fn parse_config_bytes(input: &[u8]) -> Result<Config, Error> {
    // from_slice: parse &[u8] (avoids UTF-8 validation overhead)
    serde_json::from_slice(input)
}

fn parse_config_reader<R: std::io::Read>(reader: R) -> Result<Config, Error> {
    // from_reader: streaming parse (ideal for files/network)
    serde_json::from_reader(reader)
}

fn main() {
    let bad_json = r#"{"host": "localhost", "port": "not-a-number"}"#;

    match serde_json::from_str::<Config>(bad_json) {
        Ok(config) => println!("Parsed: {:?}", config),
        Err(e) => {
            eprintln!("Parse error: {}", e);
            eprintln!("Line: {}, Column: {}", e.line(), e.column());
            // Check error category
            if e.is_data() {
                eprintln!("Type mismatch or constraint violation");
            } else if e.is_syntax() {
                eprintln!("Invalid JSON syntax");
            } else if e.is_eof() {
                eprintln!("Unexpected end of input");
            }
        }
    }

    // Use anyhow or thiserror in production for better error propagation
    // anyhow::Result<Config> = serde_json::from_str(json).context("parsing config")?;
}`}</code></pre>

      {/* Section 10: Performance Tips */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        10. Performance Tips
      </h2>
      <p>
        Serde is already very fast, but these techniques maximize throughput for performance-critical paths:
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`// 1. Use from_reader for large files — avoids loading everything into memory
use std::fs::File;
use std::io::BufReader;

fn load_large_json<T: serde::de::DeserializeOwned>(path: &str) -> serde_json::Result<T> {
    let file = File::open(path)?;
    let reader = BufReader::new(file);  // BufReader is crucial for performance
    serde_json::from_reader(reader)
}

// 2. simd-json for maximum throughput (x86/ARM SIMD acceleration)
// Cargo.toml: simd-json = { version = "0.13", features = ["serde_impl"] }
// simd-json requires &mut [u8] (modifies buffer in place)
// use simd_json;
// let mut buffer = json_bytes.to_vec();
// let value: MyStruct = simd_json::from_slice(&mut buffer)?;

// 3. Avoid serde_json::Value when struct type is known
// Value allocates a heap Map<String, Value> — much slower than typed parsing
// BAD:
// let v: Value = serde_json::from_str(json)?;
// let name = v["name"].as_str();
// GOOD:
// let user: User = serde_json::from_str(json)?;
// let name = &user.name;

// 4. Use &str instead of String for zero-copy deserialization
// The lifetime is tied to the input JSON string
use serde::Deserialize;

#[derive(Debug, Deserialize)]
struct ZeroCopy<'a> {
    #[serde(borrow)]
    name: &'a str,    // No allocation — borrows from input
    #[serde(borrow)]
    email: &'a str,
}

// 5. Serialize to writer directly instead of String
fn write_json_to_writer<W: std::io::Write>(
    value: &impl serde::Serialize,
    writer: W,
) -> serde_json::Result<()> {
    serde_json::to_writer(writer, value)
    // or serde_json::to_writer_pretty(writer, value)
}`}</code></pre>

      {/* Section 11: Axum/Actix Integration */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        11. Axum and Actix-web Integration
      </h2>
      <p>
        Both major Rust web frameworks use serde_json under the hood, making JSON handling seamless:
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`// === Axum ===
// Cargo.toml: axum = { version = "0.7", features = ["json"] }
use axum::{
    extract::Json,
    routing::{get, post},
    Router,
};
use serde::{Deserialize, Serialize};

#[derive(Debug, Deserialize)]
struct CreateUserRequest {
    name: String,
    email: String,
}

#[derive(Debug, Serialize)]
struct UserResponse {
    id: u64,
    name: String,
    email: String,
    created_at: String,
}

// Json extractor deserializes body; Json return serializes response
async fn create_user(
    Json(payload): Json<CreateUserRequest>,
) -> Json<UserResponse> {
    Json(UserResponse {
        id: 1,
        name: payload.name,
        email: payload.email,
        created_at: "2026-02-27T00:00:00Z".to_string(),
    })
}

// Error handling with axum
use axum::http::StatusCode;
use axum::response::{IntoResponse, Response};

async fn safe_create_user(
    Json(payload): Json<CreateUserRequest>,
) -> Result<Json<UserResponse>, (StatusCode, String)> {
    if payload.email.is_empty() {
        return Err((StatusCode::BAD_REQUEST, "Email is required".into()));
    }
    Ok(Json(UserResponse {
        id: 42,
        name: payload.name,
        email: payload.email,
        created_at: "2026-02-27T00:00:00Z".to_string(),
    }))
}

// === Actix-web ===
// Cargo.toml: actix-web = "4"
use actix_web::{web, App, HttpResponse, HttpServer, Responder};

async fn actix_create_user(body: web::Json<CreateUserRequest>) -> impl Responder {
    let response = UserResponse {
        id: 1,
        name: body.name.clone(),
        email: body.email.clone(),
        created_at: "2026-02-27T00:00:00Z".to_string(),
    };
    HttpResponse::Created().json(response)
}

// Actix-web: query parameters from JSON-like structs
use actix_web::web::Query;

#[derive(Debug, Deserialize)]
struct PaginationQuery {
    page: Option<u32>,
    per_page: Option<u32>,
}

async fn list_users(query: Query<PaginationQuery>) -> impl Responder {
    let page = query.page.unwrap_or(1);
    let per_page = query.per_page.unwrap_or(20);
    HttpResponse::Ok().json(serde_json::json!({
        "page": page,
        "per_page": per_page,
        "data": []
    }))
}`}</code></pre>

      {/* Section 12: Common Pitfalls */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        12. Common Pitfalls
      </h2>
      <p>Watch out for these issues when working with serde_json:</p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`use serde::{Deserialize, Serialize};
use std::borrow::Cow;

// PITFALL 1: Ownership vs borrowing — &str in structs requires lifetime
// This will NOT compile without a lifetime:
// struct Bad { name: &str }  // error: missing lifetime specifier

// Use String (owned) for most cases:
#[derive(Debug, Deserialize)]
struct OwnedVersion {
    name: String,  // Always works
}

// Use &str with lifetime for zero-copy (advanced):
#[derive(Debug, Deserialize)]
struct BorrowedVersion<'a> {
    #[serde(borrow)]
    name: &'a str,  // Borrows from input, input must outlive struct
}

// PITFALL 2: Cow<str> — flexible owned or borrowed
#[derive(Debug, Deserialize, Serialize)]
struct FlexibleStruct<'a> {
    #[serde(borrow)]
    name: Cow<'a, str>,  // Borrows if possible, owns if needed
}

// PITFALL 3: Integer overflow from JSON numbers
// JSON has no integer size constraints; Rust types do
// This panics on overflow in debug mode:
#[derive(Debug, Deserialize)]
struct OverflowRisk {
    count: u8,  // Fails if JSON has count: 300
}

// Use larger types or validate:
#[derive(Debug, Deserialize)]
struct SafeCount {
    count: u64,  // Safe for all positive JSON integers
}

// PITFALL 4: Recursive types must use Box<T>
// This will NOT compile (infinite size):
// struct Node { children: Vec<Node> }

// Correct: use Box for recursion
#[derive(Debug, Serialize, Deserialize)]
struct TreeNode {
    value: i32,
    children: Vec<Box<TreeNode>>,  // Box breaks infinite size
}

// PITFALL 5: Missing serde import causes cryptic errors
// Every file using #[derive(Serialize, Deserialize)] needs:
use serde::{Serialize as _Serialize, Deserialize as _Deserialize};
// Or: use serde::*; (less idiomatic but explicit)

// PITFALL 6: f64 precision for large integers
// JSON: {"id": 9007199254740993}
// f64 cannot represent this exactly — use i64 or u64
#[derive(Debug, Deserialize)]
struct Precise {
    id: u64,      // Correct: exact integer
    score: f64,   // OK: floating-point precision is expected
}`}</code></pre>

      {/* Key Takeaways */}
      <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '1rem', marginTop: '2rem' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: '700', marginTop: '0', marginBottom: '0.75rem', color: '#1e293b' }}>
          Key Takeaways
        </h2>
        <ul style={{ margin: '0', paddingLeft: '1.25rem', color: '#475569' }}>
          <li style={{ marginBottom: '0.5rem' }}>Add <code>serde = {'{ version: "1", features: ["derive"] }'}</code> and <code>serde_json = "1"</code> to Cargo.toml</li>
          <li style={{ marginBottom: '0.5rem' }}><code>#[derive(Serialize, Deserialize)]</code> generates all JSON parsing/writing code at compile time</li>
          <li style={{ marginBottom: '0.5rem' }}><code>#[serde(rename_all = "camelCase")]</code> maps all snake_case Rust fields to camelCase JSON keys</li>
          <li style={{ marginBottom: '0.5rem' }}><code>Option{'<T>'}</code> handles null/missing fields — <code>#[serde(skip_serializing_if = "Option::is_none")]</code> omits None in output</li>
          <li style={{ marginBottom: '0.5rem' }}>Use <code>#[serde(tag = "type")]</code> for internally tagged enums (discriminated unions)</li>
          <li style={{ marginBottom: '0.5rem' }}><code>serde_json::Value</code> handles fully dynamic JSON at the cost of heap allocations</li>
          <li style={{ marginBottom: '0.5rem' }}>Use <code>Box{'<T>'}</code> for recursive struct types and <code>BufReader</code> + <code>from_reader</code> for large files</li>
          <li style={{ marginBottom: '0' }}>Axum&apos;s <code>Json{'<T>'}</code> extractor and Actix-web&apos;s <code>web::Json{'<T>'}</code> both use serde_json transparently</li>
        </ul>
      </div>

      {/* FAQ Section */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        Frequently Asked Questions
      </h2>
      <div>
        {faqData.map((item, i) => (
          <div key={i} style={{ marginBottom: '1rem', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '1rem' }}>
            <p style={{ fontWeight: '700', color: '#0f172a', margin: '0 0 0.5rem' }}>Q: {item.q}</p>
            <p style={{ margin: '0', color: '#475569', lineHeight: '1.65' }}>{item.a}</p>
          </div>
        ))}
      </div>
    </article>
  );
}
