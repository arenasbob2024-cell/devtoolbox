'use client';
import React from 'react';
import Link from 'next/link';

/* ------------------------------------------------------------------ */
/*  JSON to Rust Struct Online Guide                                    */
/* ------------------------------------------------------------------ */

export default function JsonToRustOnlineGuide({ lang }: { lang: string }) {
  const l = lang || 'en';
  const toolLink = `/${l}/tools/json-to-rust`;

  /* ---------- translations ---------- */
  const translations: Record<string, {
    tldr: string;
    whyTitle: string;
    takeawaysTitle: string;
    tryTool: string;
    faqTitle: string;
  }> = {
    zh: {
      tldr: '使用 serde_json 和 #[derive(Serialize, Deserialize)] 将 JSON 转换为 Rust 结构体。添加 #[serde(rename_all = \'camelCase\')] 处理 JavaScript API，用 Option<T> 处理可空字段，用自定义实现处理特殊类型。',
      whyTitle: '为什么使用 Rust 结构体处理 JSON？',
      takeawaysTitle: '核心要点',
      tryTool: '立即使用免费的 JSON 转 Rust 工具 \u2192',
      faqTitle: '常见问题',
    },
    en: {
      tldr: 'Convert JSON to Rust structs using serde_json with #[derive(Serialize, Deserialize)]. Add #[serde(rename_all = \'camelCase\')] for JavaScript APIs, Option<T> for nullable fields, and custom de/serialize implementations for special types.',
      whyTitle: 'Why Use Rust Structs for JSON?',
      takeawaysTitle: 'Key Takeaways',
      tryTool: 'Try our free JSON to Rust Struct tool \u2192',
      faqTitle: 'Frequently Asked Questions',
    },
    ja: {
      tldr: 'serde_jsonと#[derive(Serialize, Deserialize)]を使用してJSONをRust構造体に変換します。JavaScript APIには#[serde(rename_all = \'camelCase\')]、nullable フィールドにはOption<T>、特殊型にはカスタム実装を追加します。',
      whyTitle: 'RustでJSONに構造体を使う理由',
      takeawaysTitle: '重要なポイント',
      tryTool: '無料のJSON to Rustツールを試す \u2192',
      faqTitle: 'よくある質問',
    },
    ko: {
      tldr: 'serde_json과 #[derive(Serialize, Deserialize)]를 사용하여 JSON을 Rust 구조체로 변환하세요. JavaScript API에는 #[serde(rename_all = \'camelCase\')], nullable 필드에는 Option<T>를 사용하세요.',
      whyTitle: 'JSON에 Rust 구조체를 사용하는 이유',
      takeawaysTitle: '핵심 요점',
      tryTool: '무료 JSON to Rust 도구 사용하기 \u2192',
      faqTitle: '자주 묻는 질문',
    },
    fr: {
      tldr: 'Convertissez JSON en structs Rust avec serde_json et #[derive(Serialize, Deserialize)]. Ajoutez #[serde(rename_all = \'camelCase\')] pour les API JavaScript et Option<T> pour les champs nullable.',
      whyTitle: 'Pourquoi utiliser des structs Rust pour JSON ?',
      takeawaysTitle: 'Points cl\u00e9s',
      tryTool: 'Essayez notre outil JSON to Rust gratuit \u2192',
      faqTitle: 'Questions fr\u00e9quemment pos\u00e9es',
    },
    de: {
      tldr: 'Konvertieren Sie JSON in Rust-Structs mit serde_json und #[derive(Serialize, Deserialize)]. F\u00fcgen Sie #[serde(rename_all = \'camelCase\')] f\u00fcr JavaScript-APIs und Option<T> f\u00fcr nullable Felder hinzu.',
      whyTitle: 'Warum Rust-Structs f\u00fcr JSON verwenden?',
      takeawaysTitle: 'Wichtige Erkenntnisse',
      tryTool: 'Kostenloses JSON to Rust Tool ausprobieren \u2192',
      faqTitle: 'H\u00e4ufig gestellte Fragen',
    },
    es: {
      tldr: 'Convierte JSON en structs de Rust usando serde_json con #[derive(Serialize, Deserialize)]. A\u00f1ade #[serde(rename_all = \'camelCase\')] para APIs JavaScript y Option<T> para campos nullable.',
      whyTitle: '\u00bfPor qu\u00e9 usar structs Rust para JSON?',
      takeawaysTitle: 'Puntos clave',
      tryTool: 'Prueba nuestra herramienta JSON to Rust gratuita \u2192',
      faqTitle: 'Preguntas frecuentes',
    },
    it: {
      tldr: 'Converti JSON in struct Rust con serde_json e #[derive(Serialize, Deserialize)]. Aggiungi #[serde(rename_all = \'camelCase\')] per le API JavaScript e Option<T> per i campi nullable.',
      whyTitle: 'Perch\u00e9 usare struct Rust per JSON?',
      takeawaysTitle: 'Punti chiave',
      tryTool: 'Prova il nostro strumento JSON to Rust gratuito \u2192',
      faqTitle: 'Domande frequenti',
    },
    pt: {
      tldr: 'Converta JSON em structs Rust usando serde_json com #[derive(Serialize, Deserialize)]. Adicione #[serde(rename_all = \'camelCase\')] para APIs JavaScript e Option<T> para campos nullable.',
      whyTitle: 'Por que usar structs Rust para JSON?',
      takeawaysTitle: 'Pontos-chave',
      tryTool: 'Experimente nossa ferramenta JSON to Rust gratuita \u2192',
      faqTitle: 'Perguntas frequentes',
    },
    nl: {
      tldr: 'Converteer JSON naar Rust structs met serde_json en #[derive(Serialize, Deserialize)]. Voeg #[serde(rename_all = \'camelCase\')] toe voor JavaScript API\'s en Option<T> voor nullable velden.',
      whyTitle: 'Waarom Rust structs gebruiken voor JSON?',
      takeawaysTitle: 'Belangrijkste punten',
      tryTool: 'Probeer onze gratis JSON to Rust tool \u2192',
      faqTitle: 'Veelgestelde vragen',
    },
    pl: {
      tldr: 'Konwertuj JSON na Rust structs za pomoc\u0105 serde_json i #[derive(Serialize, Deserialize)]. Dodaj #[serde(rename_all = \'camelCase\')] dla API JavaScript i Option<T> dla p\u00f3l nullable.',
      whyTitle: 'Dlaczego u\u017cywa\u0107 Rust structs dla JSON?',
      takeawaysTitle: 'Kluczowe wnioski',
      tryTool: 'Wypr\u00f3buj nasze darmowe narz\u0119dzie JSON to Rust \u2192',
      faqTitle: 'Cz\u0119sto zadawane pytania',
    },
    sv: {
      tldr: 'Konvertera JSON till Rust structs med serde_json och #[derive(Serialize, Deserialize)]. L\u00e4gg till #[serde(rename_all = \'camelCase\')] f\u00f6r JavaScript API:er och Option<T> f\u00f6r nullable f\u00e4lt.',
      whyTitle: 'Varf\u00f6r anv\u00e4nda Rust structs f\u00f6r JSON?',
      takeawaysTitle: 'Viktiga l\u00e4rdomar',
      tryTool: 'Prova v\u00e5rt gratis JSON to Rust-verktyg \u2192',
      faqTitle: 'Vanliga fr\u00e5gor',
    },
    no: {
      tldr: 'Konverter JSON til Rust structs med serde_json og #[derive(Serialize, Deserialize)]. Legg til #[serde(rename_all = \'camelCase\')] for JavaScript API-er og Option<T> for nullable felt.',
      whyTitle: 'Hvorfor bruke Rust structs for JSON?',
      takeawaysTitle: 'N\u00f8kkelpunkter',
      tryTool: 'Pr\u00f8v v\u00e5rt gratis JSON to Rust-verkt\u00f8y \u2192',
      faqTitle: 'Vanlige sp\u00f8rsm\u00e5l',
    },
    id: {
      tldr: 'Konversi JSON ke Rust struct menggunakan serde_json dengan #[derive(Serialize, Deserialize)]. Tambahkan #[serde(rename_all = \'camelCase\')] untuk API JavaScript dan Option<T> untuk field nullable.',
      whyTitle: 'Mengapa menggunakan Rust struct untuk JSON?',
      takeawaysTitle: 'Poin-poin utama',
      tryTool: 'Coba alat JSON to Rust gratis kami \u2192',
      faqTitle: 'Pertanyaan yang sering diajukan',
    },
    th: {
      tldr: 'แปลง JSON เป็น Rust structs โดยใช้ serde_json ด้วย #[derive(Serialize, Deserialize)] เพิ่ม #[serde(rename_all = \'camelCase\')] สำหรับ JavaScript API และ Option<T> สำหรับ nullable fields',
      whyTitle: 'ทำไมต้องใช้ Rust Structs สำหรับ JSON?',
      takeawaysTitle: 'ประเด็นสำคัญ',
      tryTool: 'ลองใช้เครื่องมือ JSON to Rust ฟรีของเรา \u2192',
      faqTitle: 'คำถามที่พบบ่อย',
    },
  };

  const tx = translations[l] || translations['en'];

  /* ---------- FAQ items ---------- */
  const faqItems = [
    {
      q: 'What is serde in Rust?',
      a: 'serde is Rust\'s de facto serialization framework. It provides generic Serialize and Deserialize traits that any type can implement, and serde_json is the concrete implementation for JSON. You derive these traits automatically on your structs using #[derive(Serialize, Deserialize)] — no manual implementation required for most cases.',
    },
    {
      q: 'How do I handle snake_case Rust fields with camelCase JSON?',
      a: 'Use #[serde(rename_all = "camelCase")] on the struct level. This automatically converts all field names: user_name becomes "userName" in JSON. You can also rename a single field with #[serde(rename = "specificKey")]. Available rename_all strategies include: camelCase, snake_case, PascalCase, SCREAMING_SNAKE_CASE, and kebab-case.',
    },
    {
      q: 'How does Option<T> work with serde_json?',
      a: 'Option::None serializes as null by default, and absent fields deserialize as None. To omit None fields from serialized output entirely, use #[serde(skip_serializing_if = "Option::is_none")]. To provide a default when a field is absent, combine with #[serde(default)]. Note: there is a difference between null (Some(None)) and absent — use Option<Option<T>> for fully nullable semantics.',
    },
    {
      q: 'How do I deserialize a JSON array in Rust?',
      a: 'Use Vec<T> — serde_json handles it automatically: let items: Vec<Item> = serde_json::from_str(json)?; In a struct, declare the field as items: Vec<Item>. For optional arrays that may be null, use Option<Vec<Item>>. Nested arrays become Vec<Vec<T>>, and heterogeneous arrays can use Vec<serde_json::Value>.',
    },
    {
      q: 'How do Rust enums map to JSON?',
      a: 'By default, enum variants are externally tagged: {"VariantName": {...data}}. Use #[serde(tag = "type")] for internal tagging like {"type": "Circle", "radius": 1.0}. Use #[serde(tag = "type", content = "data")] for adjacent tagging: {"type": "Circle", "data": {"radius": 1.0}}. Use #[serde(untagged)] for untagged — serde tries each variant in order.',
    },
    {
      q: 'What is serde_json::Value?',
      a: 'serde_json::Value is a dynamic JSON value enum with variants: Null, Bool, Number, String, Array(Vec<Value>), Object(Map<String, Value>). It is useful when JSON structure is unknown at compile time, for heterogeneous data, or for partial typed deserialization. Access values with v["key"] or v.get("key"), and cast with v.as_str(), v.as_i64(), etc.',
    },
    {
      q: 'How do I add default values for missing JSON fields?',
      a: 'Use #[serde(default)] on a field to call Default::default() when the field is absent from JSON. For custom defaults, use #[serde(default = "my_fn")] where my_fn is a function returning the desired default value. Example: #[serde(default = "default_page_size")] fn default_page_size() -> usize { 20 }',
    },
    {
      q: 'How does serde work with Axum?',
      a: 'Axum\'s Json extractor automatically deserializes request bodies using serde_json. Add the Json<T> extractor to your handler: async fn create_user(Json(payload): Json<CreateUserRequest>) -> Json<User>. Axum also serializes response types into JSON automatically when you return Json(value). For error handling, implement IntoResponse or use axum::response::Json with a result type.',
    },
  ];

  /* ---------- FAQ JSON-LD ---------- */
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map(item => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  };

  /* ---------- Key Takeaways ---------- */
  const takeaways = [
    'Add serde = { version = "1", features = ["derive"] } and serde_json to Cargo.toml',
    '#[derive(Serialize, Deserialize)] enables automatic JSON conversion for structs',
    '#[serde(rename = "field_name")] maps JSON keys to Rust field names',
    '#[serde(rename_all = "camelCase")] converts all fields to/from camelCase automatically',
    'Option<T> handles null/missing JSON fields — None serializes as null with #[serde(skip_serializing_if = "Option::is_none")]',
    'Enums with #[serde(tag = "type")] create internally tagged JSON discriminated unions',
    'serde_json::Value handles completely dynamic or unknown JSON structure',
  ];

  /* ---------- Code snippets ---------- */
  const cargoTomlCode = `[dependencies]
serde = { version = "1", features = ["derive"] }
serde_json = "1"`;

  const basicStructCode = `use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
struct User {
    id: u64,
    name: String,
    email: String,
    age: u32,
}

fn main() -> Result<(), serde_json::Error> {
    let json = r#"{
        "id": 1,
        "name": "Alice",
        "email": "alice@example.com",
        "age": 30
    }"#;

    // Deserialize: JSON -> Rust struct
    let user: User = serde_json::from_str(json)?;
    println!("{:?}", user);

    // Serialize: Rust struct -> JSON
    let json_out = serde_json::to_string_pretty(&user)?;
    println!("{}", json_out);

    Ok(())
}`;

  const renameCode = `use serde::{Deserialize, Serialize};

// rename_all converts every field to camelCase
#[derive(Debug, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
struct ApiResponse {
    user_id: u64,       // JSON key: "userId"
    first_name: String, // JSON key: "firstName"
    last_name: String,  // JSON key: "lastName"
    created_at: String, // JSON key: "createdAt"
}

// Individual field renaming
#[derive(Debug, Serialize, Deserialize)]
struct Product {
    #[serde(rename = "product_id")]
    id: u64,

    #[serde(rename = "product_name")]
    name: String,
}`;

  const optionCode = `use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
struct UserProfile {
    id: u64,
    name: String,

    // None if field is absent or null
    bio: Option<String>,

    // Omit from output when None
    #[serde(skip_serializing_if = "Option::is_none")]
    avatar_url: Option<String>,

    // Default to None if field absent
    #[serde(default)]
    phone: Option<String>,
}

fn main() -> Result<(), serde_json::Error> {
    let json = r#"{"id": 1, "name": "Alice", "bio": null}"#;
    let profile: UserProfile = serde_json::from_str(json)?;

    assert!(profile.bio.is_none());       // null -> None
    assert!(profile.avatar_url.is_none()); // absent -> None
    assert!(profile.phone.is_none());      // default -> None

    Ok(())
}`;

  const nestedCode = `use serde::{Deserialize, Serialize};

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
    author: Author,        // nested struct
    tags: Vec<Tag>,        // array of structs
    images: Vec<String>,   // array of strings
    metadata: Option<PostMeta>, // optional nested
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
}`;

  const enumCode = `use serde::{Deserialize, Serialize};

// Default: externally tagged
// JSON: {"Circle": {"radius": 1.0}}
#[derive(Debug, Serialize, Deserialize)]
enum Shape {
    Circle { radius: f64 },
    Rectangle { width: f64, height: f64 },
    Point,
}

// Internally tagged: {"type": "Circle", "radius": 1.0}
#[derive(Debug, Serialize, Deserialize)]
#[serde(tag = "type")]
enum Event {
    Login { user_id: u64, timestamp: String },
    Logout { user_id: u64 },
    Purchase { user_id: u64, amount: f64, item_id: u64 },
}

// Adjacently tagged: {"type": "Login", "data": {...}}
#[derive(Debug, Serialize, Deserialize)]
#[serde(tag = "type", content = "data")]
enum Notification {
    Email { to: String, subject: String },
    Push { device_token: String, message: String },
}

// Untagged: tries each variant in order
#[derive(Debug, Serialize, Deserialize)]
#[serde(untagged)]
enum StringOrNumber {
    Str(String),
    Num(f64),
}`;

  const customSerdeCode = `use serde::{Deserialize, Deserializer, Serialize, Serializer};
use std::fmt;

// Custom serialize for a type that represents millisecond timestamps
#[derive(Debug)]
struct Timestamp(u64);

impl Serialize for Timestamp {
    fn serialize<S: Serializer>(&self, s: S) -> Result<S::Ok, S::Error> {
        s.serialize_u64(self.0)
    }
}

impl<'de> Deserialize<'de> for Timestamp {
    fn deserialize<D: Deserializer<'de>>(d: D) -> Result<Self, D::Error> {
        let ms = u64::deserialize(d)?;
        Ok(Timestamp(ms))
    }
}

// Using #[serde(with = "...")] for inline custom logic
mod unix_ms {
    use serde::{Deserializer, Serializer};

    pub fn serialize<S: Serializer>(ts: &u64, s: S) -> Result<S::Ok, S::Error> {
        s.serialize_u64(*ts)
    }

    pub fn deserialize<'de, D: Deserializer<'de>>(d: D) -> Result<u64, D::Error> {
        use serde::Deserialize;
        u64::deserialize(d)
    }
}

#[derive(Serialize, Deserialize)]
struct Event {
    #[serde(with = "unix_ms")]
    timestamp: u64,
    name: String,
}`;

  const flattenCode = `use serde::{Deserialize, Serialize};
use serde_json::Value;
use std::collections::HashMap;

// #[serde(flatten)] inlines the nested struct fields
#[derive(Debug, Serialize, Deserialize)]
struct Pagination {
    page: u32,
    per_page: u32,
    total: u64,
}

#[derive(Debug, Serialize, Deserialize)]
struct UsersResponse {
    users: Vec<User>,

    // Inlines: {"page": 1, "per_page": 20, "total": 100, "users": [...]}
    #[serde(flatten)]
    pagination: Pagination,
}

// Capture unknown extra fields
#[derive(Debug, Serialize, Deserialize)]
struct ExtensibleConfig {
    name: String,
    version: u32,

    // All unrecognized fields go here
    #[serde(flatten)]
    extra: HashMap<String, Value>,
}

#[derive(Debug, Serialize, Deserialize)]
struct User {
    id: u64,
    name: String,
}`;

  const defaultCode = `use serde::{Deserialize, Serialize};

fn default_page_size() -> usize { 20 }
fn default_enabled() -> bool { true }
fn default_role() -> String { "viewer".to_string() }

#[derive(Debug, Deserialize)]
struct QueryParams {
    // Uses Default::default() (0 for numbers)
    #[serde(default)]
    page: usize,

    // Uses custom default function
    #[serde(default = "default_page_size")]
    per_page: usize,

    #[serde(default = "default_enabled")]
    enabled: bool,

    #[serde(default = "default_role")]
    role: String,
}

fn main() -> Result<(), serde_json::Error> {
    // {} — all fields missing, defaults apply
    let params: QueryParams = serde_json::from_str("{}")?;
    assert_eq!(params.page, 0);
    assert_eq!(params.per_page, 20);
    assert_eq!(params.enabled, true);
    assert_eq!(params.role, "viewer");
    Ok(())
}`;

  const errorHandlingCode = `use serde::Deserialize;

#[derive(Debug, Deserialize)]
struct Config {
    host: String,
    port: u16,
    debug: bool,
}

fn load_config(json: &str) -> Result<Config, serde_json::Error> {
    serde_json::from_str(json)
}

fn main() {
    match load_config(r#"{"host": "localhost", "port": 8080, "debug": true}"#) {
        Ok(config) => println!("Config loaded: {:?}", config),
        Err(e) => {
            eprintln!("Parse error: {}", e);
            // e.classify() -> Category::Data | Syntax | Io | Eof
            // e.line() / e.column() for position in input
            eprintln!("Error category: {:?}", e.classify());
        }
    }

    // Type mismatch error
    match load_config(r#"{"host": 123, "port": 8080, "debug": true}"#) {
        Ok(_) => unreachable!(),
        Err(e) => eprintln!("Type error at line {}: {}", e.line(), e),
    }
}`;

  const axumCode = `use axum::{
    extract::Json,
    http::StatusCode,
    response::IntoResponse,
    routing::post,
    Router,
};
use serde::{Deserialize, Serialize};

#[derive(Debug, Deserialize)]
struct CreateUserRequest {
    name: String,
    email: String,
    role: Option<String>,
}

#[derive(Debug, Serialize)]
struct CreateUserResponse {
    id: u64,
    name: String,
    email: String,
}

async fn create_user(
    Json(payload): Json<CreateUserRequest>,
) -> impl IntoResponse {
    // serde_json automatically parsed the request body
    println!("Creating user: {:?}", payload);

    let response = CreateUserResponse {
        id: 42,
        name: payload.name,
        email: payload.email,
    };

    // Json() serializes the struct to JSON response
    (StatusCode::CREATED, Json(response))
}

#[tokio::main]
async fn main() {
    let app = Router::new().route("/users", post(create_user));
    let listener = tokio::net::TcpListener::bind("0.0.0.0:3000").await.unwrap();
    axum::serve(listener, app).await.unwrap();
}`;

  const actixCode = `use actix_web::{post, web, App, HttpResponse, HttpServer, Responder};
use serde::{Deserialize, Serialize};

#[derive(Debug, Deserialize)]
struct LoginRequest {
    username: String,
    password: String,
}

#[derive(Debug, Serialize)]
struct LoginResponse {
    token: String,
    expires_in: u64,
}

#[post("/login")]
async fn login(req: web::Json<LoginRequest>) -> impl Responder {
    println!("Login attempt: {}", req.username);

    HttpResponse::Ok().json(LoginResponse {
        token: "jwt_token_here".to_string(),
        expires_in: 3600,
    })
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    HttpServer::new(|| App::new().service(login))
        .bind("127.0.0.1:8080")?
        .run()
        .await
}`;

  const dynamicValueCode = `use serde_json::{json, Value};

fn main() -> Result<(), serde_json::Error> {
    // Construct JSON dynamically
    let v: Value = json!({
        "name": "Alice",
        "scores": [98, 95, 100],
        "metadata": null
    });

    // Access fields
    println!("{}", v["name"].as_str().unwrap_or(""));
    println!("{}", v["scores"][0].as_i64().unwrap_or(0));

    // Check type
    if v["metadata"].is_null() {
        println!("metadata is null");
    }

    // Iterate an object
    if let Some(obj) = v.as_object() {
        for (key, val) in obj {
            println!("{}: {}", key, val);
        }
    }

    // Parse unknown JSON
    let raw = r#"{"type": "unknown", "payload": [1, 2, 3]}"#;
    let parsed: Value = serde_json::from_str(raw)?;
    println!("{:?}", parsed);

    Ok(())
}`;

  const pitfallsCode = `// Pitfall 1: Integer overflow — JSON numbers can be very large
// Use i64/u64 instead of i32/u32 for unknown data
#[derive(Deserialize)]
struct BadStruct {
    // id: i32, // WRONG: may overflow for large IDs
    id: i64,    // CORRECT: handles any safe integer

    // count: u32, // WRONG: if JSON sends -1 or large number
    count: i64,   // CORRECT: handles negative and large values
}

// Pitfall 2: Float precision — JSON numbers are IEEE 754
// Use f64 (not f32) and be careful with financial data
#[derive(Deserialize)]
struct PriceWrong {
    // price: f32, // WRONG: precision loss
    price: f64,   // BETTER: still imprecise for money
    // For financial data, deserialize as String then use Decimal crate
}

// Pitfall 3: camelCase vs snake_case mismatch
// JSON API returns "firstName" but Rust field is "first_name"
#[derive(Deserialize)]
// Missing: #[serde(rename_all = "camelCase")]
struct WontParse {
    first_name: String, // Won't match "firstName" without rename_all
}

// Pitfall 4: Unknown variant causes error by default
#[derive(Deserialize)]
enum Status { Active, Inactive }
// If JSON sends "Pending" -> error!
// Fix: #[serde(other)] on a catch-all variant
#[derive(Deserialize)]
enum StatusFixed {
    Active,
    Inactive,
    #[serde(other)]
    Unknown,
}`;

  return (
    <article style={{ maxWidth: '860px', margin: '0 auto', padding: '0 16px', fontFamily: 'system-ui, -apple-system, sans-serif', color: '#1e293b', lineHeight: 1.7 }}>

      {/* JSON-LD FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Title */}
      <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '12px', color: '#0f172a', lineHeight: 1.25 }}>
        JSON to Rust Struct: Complete Guide with serde_json and serde Derive
      </h1>
      <p style={{ color: '#64748b', fontSize: '0.95rem', marginBottom: '28px' }}>
        Updated February 2026 &mdash; covers serde 1.x, serde_json 1.x, Axum 0.7, and Actix-Web 4
      </p>

      {/* TL;DR */}
      <div style={{ background: '#f0f9ff', border: '1px solid #bae6fd', borderRadius: '10px', padding: '20px 24px', marginBottom: '32px' }}>
        <strong style={{ color: '#0369a1', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>TL;DR</strong>
        <p style={{ margin: '8px 0 0', color: '#0c4a6e', fontSize: '1rem' }}>{tx.tldr}</p>
      </div>

      {/* Key Takeaways */}
      <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '20px 24px', marginBottom: '36px' }}>
        <strong style={{ color: '#334155', fontSize: '1rem' }}>{tx.takeawaysTitle}</strong>
        <ul style={{ margin: '12px 0 0', paddingLeft: '20px', color: '#475569' }}>
          {takeaways.map((item, i) => (
            <li key={i} style={{ marginBottom: '6px' }}>{item}</li>
          ))}
        </ul>
      </div>

      {/* Try Tool CTA */}
      <p style={{ marginBottom: '36px' }}>
        <Link href={toolLink} style={{ display: 'inline-block', background: '#0ea5e9', color: '#fff', padding: '10px 22px', borderRadius: '8px', textDecoration: 'none', fontWeight: 600, fontSize: '0.97rem' }}>
          {tx.tryTool}
        </Link>
      </p>

      {/* Section 1: Why Rust Structs for JSON */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#0f172a', marginTop: '40px', marginBottom: '16px', borderBottom: '2px solid #e2e8f0', paddingBottom: '8px' }}>
        {tx.whyTitle}
      </h2>
      <p>Rust is a statically typed systems language — working with untyped <code style={{ background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px', fontSize: '0.9em' }}>serde_json::Value</code> for every JSON field leads to verbose runtime checks and potential panics. Generating typed structs from JSON gives you compile-time safety, IDE autocomplete, zero-cost abstractions, and significantly cleaner code.</p>
      <p>The <strong>serde</strong> ecosystem is Rust&apos;s gold standard for serialization. It works through Rust&apos;s procedural macro system — <code style={{ background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px', fontSize: '0.9em' }}>#[derive(Serialize, Deserialize)]</code> generates all the boilerplate at compile time, producing zero-overhead serialization code. No reflection, no runtime type lookup — just fast, safe, idiomatic Rust.</p>
      <p>Key advantages of typed Rust structs over dynamic <code style={{ background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px', fontSize: '0.9em' }}>Value</code>:</p>
      <ul style={{ paddingLeft: '24px', color: '#334155' }}>
        <li style={{ marginBottom: '8px' }}><strong>Compile-time safety</strong> — missing or wrongly typed fields are caught before runtime</li>
        <li style={{ marginBottom: '8px' }}><strong>IDE support</strong> — full autocomplete, go-to-definition, and rename refactoring</li>
        <li style={{ marginBottom: '8px' }}><strong>Performance</strong> — no HashMap allocation, no runtime type matching</li>
        <li style={{ marginBottom: '8px' }}><strong>Self-documenting</strong> — struct definitions serve as living documentation of the API shape</li>
        <li style={{ marginBottom: '8px' }}><strong>Exhaustive pattern matching</strong> — enums with serde give you type-safe discriminated unions</li>
      </ul>

      {/* Section 2: Cargo.toml Setup */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#0f172a', marginTop: '40px', marginBottom: '16px', borderBottom: '2px solid #e2e8f0', paddingBottom: '8px' }}>
        Cargo.toml Setup: serde and serde_json
      </h2>
      <p>Add serde and serde_json to your <code style={{ background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px', fontSize: '0.9em' }}>Cargo.toml</code>. The critical detail is enabling the <strong>derive</strong> feature for serde — this unlocks the proc-macro derive attributes:</p>
      <pre style={{ background: '#0f172a', color: '#e2e8f0', padding: '20px', borderRadius: '10px', overflowX: 'auto', fontSize: '0.87rem', lineHeight: 1.6, marginBottom: '20px' }}>
        <code>{cargoTomlCode}</code>
      </pre>
      <p>You can also add these optional but widely used companion crates:</p>
      <pre style={{ background: '#0f172a', color: '#e2e8f0', padding: '20px', borderRadius: '10px', overflowX: 'auto', fontSize: '0.87rem', lineHeight: 1.6, marginBottom: '20px' }}>
        <code>{`[dependencies]
serde = { version = "1", features = ["derive"] }
serde_json = "1"

# For date/time serialization
chrono = { version = "0.4", features = ["serde"] }

# For decimal/financial values
rust_decimal = { version = "1", features = ["serde"] }

# For UUID serialization
uuid = { version = "1", features = ["serde", "v4"] }`}</code>
      </pre>

      {/* Section 3: Basic Struct with serde */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#0f172a', marginTop: '40px', marginBottom: '16px', borderBottom: '2px solid #e2e8f0', paddingBottom: '8px' }}>
        Basic Struct with serde Derive
      </h2>
      <p>The simplest usage: annotate your struct with <code style={{ background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px', fontSize: '0.9em' }}>#[derive(Serialize, Deserialize)]</code> and serde handles the rest. JSON field names must match Rust field names exactly (both snake_case by default):</p>
      <pre style={{ background: '#0f172a', color: '#e2e8f0', padding: '20px', borderRadius: '10px', overflowX: 'auto', fontSize: '0.87rem', lineHeight: 1.6, marginBottom: '20px' }}>
        <code>{basicStructCode}</code>
      </pre>
      <p>Key functions:</p>
      <ul style={{ paddingLeft: '24px', color: '#334155' }}>
        <li style={{ marginBottom: '6px' }}><code style={{ background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px', fontSize: '0.9em' }}>serde_json::from_str(&amp;str)</code> — deserialize JSON string to Rust type</li>
        <li style={{ marginBottom: '6px' }}><code style={{ background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px', fontSize: '0.9em' }}>serde_json::from_slice(&amp;[u8])</code> — deserialize from byte slice</li>
        <li style={{ marginBottom: '6px' }}><code style={{ background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px', fontSize: '0.9em' }}>serde_json::from_reader(R)</code> — deserialize from any Read implementor</li>
        <li style={{ marginBottom: '6px' }}><code style={{ background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px', fontSize: '0.9em' }}>serde_json::to_string(&amp;T)</code> — serialize to compact JSON string</li>
        <li style={{ marginBottom: '6px' }}><code style={{ background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px', fontSize: '0.9em' }}>serde_json::to_string_pretty(&amp;T)</code> — serialize to indented JSON string</li>
        <li style={{ marginBottom: '6px' }}><code style={{ background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px', fontSize: '0.9em' }}>serde_json::to_vec(&amp;T)</code> — serialize to byte vector</li>
      </ul>

      {/* Section 4: Field Renaming */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#0f172a', marginTop: '40px', marginBottom: '16px', borderBottom: '2px solid #e2e8f0', paddingBottom: '8px' }}>
        Field Renaming: #[serde(rename)] and rename_all
      </h2>
      <p>Rust conventionally uses <code style={{ background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px', fontSize: '0.9em' }}>snake_case</code> for struct fields, but JavaScript APIs typically use <code style={{ background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px', fontSize: '0.9em' }}>camelCase</code>. serde provides two mechanisms to bridge this gap:</p>
      <pre style={{ background: '#0f172a', color: '#e2e8f0', padding: '20px', borderRadius: '10px', overflowX: 'auto', fontSize: '0.87rem', lineHeight: 1.6, marginBottom: '20px' }}>
        <code>{renameCode}</code>
      </pre>
      <p>Available <code style={{ background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px', fontSize: '0.9em' }}>rename_all</code> strategies:</p>
      <div style={{ overflowX: 'auto', marginBottom: '20px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
          <thead>
            <tr style={{ background: '#f1f5f9' }}>
              <th style={{ padding: '10px 14px', textAlign: 'left', border: '1px solid #e2e8f0' }}>Strategy</th>
              <th style={{ padding: '10px 14px', textAlign: 'left', border: '1px solid #e2e8f0' }}>Rust field</th>
              <th style={{ padding: '10px 14px', textAlign: 'left', border: '1px solid #e2e8f0' }}>JSON key</th>
            </tr>
          </thead>
          <tbody>
            {[
              { s: 'camelCase', r: 'first_name', j: 'firstName' },
              { s: 'PascalCase', r: 'first_name', j: 'FirstName' },
              { s: 'snake_case', r: 'firstName', j: 'first_name' },
              { s: 'SCREAMING_SNAKE_CASE', r: 'first_name', j: 'FIRST_NAME' },
              { s: 'kebab-case', r: 'first_name', j: 'first-name' },
            ].map(({ s, r, j }) => (
              <tr key={s}>
                <td style={{ padding: '10px 14px', border: '1px solid #e2e8f0' }}><code style={{ background: '#f1f5f9', padding: '2px 5px', borderRadius: '3px', fontSize: '0.85em' }}>{s}</code></td>
                <td style={{ padding: '10px 14px', border: '1px solid #e2e8f0', fontFamily: 'monospace', fontSize: '0.87em' }}>{r}</td>
                <td style={{ padding: '10px 14px', border: '1px solid #e2e8f0', fontFamily: 'monospace', fontSize: '0.87em' }}>&quot;{j}&quot;</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Section 5: Option<T> */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#0f172a', marginTop: '40px', marginBottom: '16px', borderBottom: '2px solid #e2e8f0', paddingBottom: '8px' }}>
        Optional and Nullable Fields with Option&lt;T&gt;
      </h2>
      <p>In Rust, <code style={{ background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px', fontSize: '0.9em' }}>Option&lt;T&gt;</code> is the idiomatic way to handle nullable or absent JSON fields. serde maps <code style={{ background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px', fontSize: '0.9em' }}>null</code> and missing fields to <code style={{ background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px', fontSize: '0.9em' }}>None</code> by default:</p>
      <pre style={{ background: '#0f172a', color: '#e2e8f0', padding: '20px', borderRadius: '10px', overflowX: 'auto', fontSize: '0.87rem', lineHeight: 1.6, marginBottom: '20px' }}>
        <code>{optionCode}</code>
      </pre>
      <div style={{ background: '#fffbeb', border: '1px solid #fde68a', borderRadius: '8px', padding: '14px 18px', marginBottom: '20px', fontSize: '0.92rem', color: '#78350f' }}>
        <strong>Note:</strong> By default, serde treats both <code style={{ background: '#fef3c7', padding: '2px 5px', borderRadius: '3px' }}>null</code> and absent fields as <code style={{ background: '#fef3c7', padding: '2px 5px', borderRadius: '3px' }}>None</code>. If you need to distinguish between null and absent, use <code style={{ background: '#fef3c7', padding: '2px 5px', borderRadius: '3px' }}>Option&lt;Option&lt;T&gt;&gt;</code> — outer <code>None</code> means absent, inner <code>None</code> means explicit null.
      </div>

      {/* Section 6: Nested Structs and Vectors */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#0f172a', marginTop: '40px', marginBottom: '16px', borderBottom: '2px solid #e2e8f0', paddingBottom: '8px' }}>
        Nested Structs and Vectors
      </h2>
      <p>serde handles arbitrary nesting automatically. Define separate struct types for nested objects and use <code style={{ background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px', fontSize: '0.9em' }}>Vec&lt;T&gt;</code> for JSON arrays:</p>
      <pre style={{ background: '#0f172a', color: '#e2e8f0', padding: '20px', borderRadius: '10px', overflowX: 'auto', fontSize: '0.87rem', lineHeight: 1.6, marginBottom: '20px' }}>
        <code>{nestedCode}</code>
      </pre>
      <p>Type mappings for common JSON patterns:</p>
      <ul style={{ paddingLeft: '24px', color: '#334155' }}>
        <li style={{ marginBottom: '6px' }}>JSON object &#8594; Rust struct or <code style={{ background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px', fontSize: '0.9em' }}>HashMap&lt;String, T&gt;</code></li>
        <li style={{ marginBottom: '6px' }}>JSON array &#8594; <code style={{ background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px', fontSize: '0.9em' }}>Vec&lt;T&gt;</code></li>
        <li style={{ marginBottom: '6px' }}>JSON string &#8594; <code style={{ background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px', fontSize: '0.9em' }}>String</code> or <code style={{ background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px', fontSize: '0.9em' }}>&amp;str</code></li>
        <li style={{ marginBottom: '6px' }}>JSON number (integer) &#8594; <code style={{ background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px', fontSize: '0.9em' }}>i64</code>, <code style={{ background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px', fontSize: '0.9em' }}>u64</code>, <code style={{ background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px', fontSize: '0.9em' }}>u32</code>, etc.</li>
        <li style={{ marginBottom: '6px' }}>JSON number (float) &#8594; <code style={{ background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px', fontSize: '0.9em' }}>f64</code></li>
        <li style={{ marginBottom: '6px' }}>JSON boolean &#8594; <code style={{ background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px', fontSize: '0.9em' }}>bool</code></li>
        <li style={{ marginBottom: '6px' }}>JSON null &#8594; <code style={{ background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px', fontSize: '0.9em' }}>Option&lt;T&gt;</code> as <code style={{ background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px', fontSize: '0.9em' }}>None</code></li>
      </ul>

      {/* Section 7: Enums */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#0f172a', marginTop: '40px', marginBottom: '16px', borderBottom: '2px solid #e2e8f0', paddingBottom: '8px' }}>
        Enums with serde: Tagged, Untagged, and Adjacently Tagged
      </h2>
      <p>Rust enums are perfect for discriminated unions — a powerful pattern for representing different shapes of JSON based on a type field. serde supports four tagging strategies:</p>
      <pre style={{ background: '#0f172a', color: '#e2e8f0', padding: '20px', borderRadius: '10px', overflowX: 'auto', fontSize: '0.87rem', lineHeight: 1.6, marginBottom: '20px' }}>
        <code>{enumCode}</code>
      </pre>
      <div style={{ overflowX: 'auto', marginBottom: '20px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
          <thead>
            <tr style={{ background: '#f1f5f9' }}>
              <th style={{ padding: '10px 14px', textAlign: 'left', border: '1px solid #e2e8f0' }}>Strategy</th>
              <th style={{ padding: '10px 14px', textAlign: 'left', border: '1px solid #e2e8f0' }}>Attribute</th>
              <th style={{ padding: '10px 14px', textAlign: 'left', border: '1px solid #e2e8f0' }}>JSON Shape</th>
            </tr>
          </thead>
          <tbody>
            {[
              { s: 'External', a: '(default)', j: '{"Circle": {"radius": 1.0}}' },
              { s: 'Internal', a: '#[serde(tag = "type")]', j: '{"type": "Circle", "radius": 1.0}' },
              { s: 'Adjacent', a: '#[serde(tag = "type", content = "data")]', j: '{"type": "Circle", "data": {"radius": 1.0}}' },
              { s: 'Untagged', a: '#[serde(untagged)]', j: '{"radius": 1.0} (tries each variant)' },
            ].map(({ s, a, j }) => (
              <tr key={s}>
                <td style={{ padding: '10px 14px', border: '1px solid #e2e8f0', fontWeight: 600 }}>{s}</td>
                <td style={{ padding: '10px 14px', border: '1px solid #e2e8f0', fontFamily: 'monospace', fontSize: '0.82em' }}>{a}</td>
                <td style={{ padding: '10px 14px', border: '1px solid #e2e8f0', fontFamily: 'monospace', fontSize: '0.82em' }}>{j}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Section 8: Custom Serialization */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#0f172a', marginTop: '40px', marginBottom: '16px', borderBottom: '2px solid #e2e8f0', paddingBottom: '8px' }}>
        Custom Serialization and Deserialization
      </h2>
      <p>When the default derive behavior is not sufficient — for example, custom date formats, encoded values, or special number handling — you can implement <code style={{ background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px', fontSize: '0.9em' }}>Serialize</code>/<code style={{ background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px', fontSize: '0.9em' }}>Deserialize</code> manually or use the <code style={{ background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px', fontSize: '0.9em' }}>#[serde(with)]</code> attribute for per-field customization:</p>
      <pre style={{ background: '#0f172a', color: '#e2e8f0', padding: '20px', borderRadius: '10px', overflowX: 'auto', fontSize: '0.87rem', lineHeight: 1.6, marginBottom: '20px' }}>
        <code>{customSerdeCode}</code>
      </pre>
      <p>The <code style={{ background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px', fontSize: '0.9em' }}>#[serde(with = "module")]</code> approach is the cleanest for reusable field-level customization. serde also provides built-in modules:</p>
      <ul style={{ paddingLeft: '24px', color: '#334155' }}>
        <li style={{ marginBottom: '6px' }}><code style={{ background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px', fontSize: '0.9em' }}>serde::de::IgnoredAny</code> — skip/ignore a field value</li>
        <li style={{ marginBottom: '6px' }}><code style={{ background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px', fontSize: '0.9em' }}>serde_json::RawValue</code> — capture raw JSON as a string</li>
        <li style={{ marginBottom: '6px' }}><code style={{ background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px', fontSize: '0.9em' }}>chrono::serde</code> — date/time serialization (with chrono crate)</li>
      </ul>

      {/* Section 9: Flatten and Unknown Fields */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#0f172a', marginTop: '40px', marginBottom: '16px', borderBottom: '2px solid #e2e8f0', paddingBottom: '8px' }}>
        Handling Unknown Fields: #[serde(flatten)] and Value
      </h2>
      <p>When working with APIs that may return additional fields you haven&apos;t typed, or when you want to inline nested struct fields at the parent level, <code style={{ background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px', fontSize: '0.9em' }}>#[serde(flatten)]</code> is the solution:</p>
      <pre style={{ background: '#0f172a', color: '#e2e8f0', padding: '20px', borderRadius: '10px', overflowX: 'auto', fontSize: '0.87rem', lineHeight: 1.6, marginBottom: '20px' }}>
        <code>{flattenCode}</code>
      </pre>
      <p>Two common patterns for unknown fields:</p>
      <ul style={{ paddingLeft: '24px', color: '#334155' }}>
        <li style={{ marginBottom: '8px' }}><strong>Capture with HashMap</strong> — use <code style={{ background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px', fontSize: '0.9em' }}>#[serde(flatten)] extra: HashMap&lt;String, Value&gt;</code> to collect all unknown fields</li>
        <li style={{ marginBottom: '8px' }}><strong>Ignore silently</strong> — by default serde_json ignores unknown fields; add <code style={{ background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px', fontSize: '0.9em' }}>#[serde(deny_unknown_fields)]</code> on the struct to make unknown fields an error</li>
      </ul>

      {/* Section 10: Default Values */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#0f172a', marginTop: '40px', marginBottom: '16px', borderBottom: '2px solid #e2e8f0', paddingBottom: '8px' }}>
        Default Values with #[serde(default)]
      </h2>
      <p>When a JSON field is absent (not null — absent), <code style={{ background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px', fontSize: '0.9em' }}>#[serde(default)]</code> provides a fallback value rather than returning an error:</p>
      <pre style={{ background: '#0f172a', color: '#e2e8f0', padding: '20px', borderRadius: '10px', overflowX: 'auto', fontSize: '0.87rem', lineHeight: 1.6, marginBottom: '20px' }}>
        <code>{defaultCode}</code>
      </pre>
      <p>You can also apply <code style={{ background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px', fontSize: '0.9em' }}>#[serde(default)]</code> at the struct level to make all fields use their <code style={{ background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px', fontSize: '0.9em' }}>Default::default()</code> when absent. This is useful for configuration structs where partial JSON is common.</p>

      {/* Section 11: Error Handling */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#0f172a', marginTop: '40px', marginBottom: '16px', borderBottom: '2px solid #e2e8f0', paddingBottom: '8px' }}>
        Error Handling with serde_json::Error
      </h2>
      <p><code style={{ background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px', fontSize: '0.9em' }}>serde_json::Error</code> provides rich error information including line/column position and error category. Use the <code style={{ background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px', fontSize: '0.9em' }}>?</code> operator to propagate errors up, or match on them for specific handling:</p>
      <pre style={{ background: '#0f172a', color: '#e2e8f0', padding: '20px', borderRadius: '10px', overflowX: 'auto', fontSize: '0.87rem', lineHeight: 1.6, marginBottom: '20px' }}>
        <code>{errorHandlingCode}</code>
      </pre>
      <p>Error categories from <code style={{ background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px', fontSize: '0.9em' }}>e.classify()</code>:</p>
      <ul style={{ paddingLeft: '24px', color: '#334155' }}>
        <li style={{ marginBottom: '6px' }}><code style={{ background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px', fontSize: '0.9em' }}>Category::Data</code> — valid JSON but wrong type/structure (e.g., expected string, got number)</li>
        <li style={{ marginBottom: '6px' }}><code style={{ background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px', fontSize: '0.9em' }}>Category::Syntax</code> — malformed JSON (unclosed brackets, invalid characters)</li>
        <li style={{ marginBottom: '6px' }}><code style={{ background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px', fontSize: '0.9em' }}>Category::Eof</code> — JSON ended unexpectedly (truncated data)</li>
        <li style={{ marginBottom: '6px' }}><code style={{ background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px', fontSize: '0.9em' }}>Category::Io</code> — underlying I/O error when reading from a stream</li>
      </ul>
      <p>For production applications, consider wrapping <code style={{ background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px', fontSize: '0.9em' }}>serde_json::Error</code> in your own error type using <code style={{ background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px', fontSize: '0.9em' }}>thiserror</code> or <code style={{ background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px', fontSize: '0.9em' }}>anyhow</code> for ergonomic error propagation.</p>

      {/* Section 12: Axum / Actix-Web */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#0f172a', marginTop: '40px', marginBottom: '16px', borderBottom: '2px solid #e2e8f0', paddingBottom: '8px' }}>
        Web Framework Integration: Axum and Actix-Web
      </h2>
      <p>Both major Rust web frameworks use serde_json under the hood for JSON request/response handling. The integration is seamless — just derive the traits and let the framework handle the rest.</p>

      <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#1e293b', marginTop: '28px', marginBottom: '12px' }}>Axum</h3>
      <p>Axum&apos;s <code style={{ background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px', fontSize: '0.9em' }}>Json&lt;T&gt;</code> extractor deserializes request bodies, and returning <code style={{ background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px', fontSize: '0.9em' }}>Json(value)</code> serializes responses:</p>
      <pre style={{ background: '#0f172a', color: '#e2e8f0', padding: '20px', borderRadius: '10px', overflowX: 'auto', fontSize: '0.87rem', lineHeight: 1.6, marginBottom: '20px' }}>
        <code>{axumCode}</code>
      </pre>

      <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#1e293b', marginTop: '28px', marginBottom: '12px' }}>Actix-Web</h3>
      <p>Actix-Web uses <code style={{ background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px', fontSize: '0.9em' }}>web::Json&lt;T&gt;</code> for JSON extraction and <code style={{ background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px', fontSize: '0.9em' }}>HttpResponse::Ok().json()</code> for serialization:</p>
      <pre style={{ background: '#0f172a', color: '#e2e8f0', padding: '20px', borderRadius: '10px', overflowX: 'auto', fontSize: '0.87rem', lineHeight: 1.6, marginBottom: '20px' }}>
        <code>{actixCode}</code>
      </pre>

      {/* Section 13: serde_json::Value / Dynamic */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#0f172a', marginTop: '40px', marginBottom: '16px', borderBottom: '2px solid #e2e8f0', paddingBottom: '8px' }}>
        Dynamic JSON with serde_json::Value
      </h2>
      <p>For truly dynamic JSON where the structure is unknown at compile time, or for building JSON programmatically, use <code style={{ background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px', fontSize: '0.9em' }}>serde_json::Value</code> and the <code style={{ background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px', fontSize: '0.9em' }}>json!</code> macro:</p>
      <pre style={{ background: '#0f172a', color: '#e2e8f0', padding: '20px', borderRadius: '10px', overflowX: 'auto', fontSize: '0.87rem', lineHeight: 1.6, marginBottom: '20px' }}>
        <code>{dynamicValueCode}</code>
      </pre>
      <p><code style={{ background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px', fontSize: '0.9em' }}>serde_json::Value</code> variants:</p>
      <ul style={{ paddingLeft: '24px', color: '#334155' }}>
        <li style={{ marginBottom: '6px' }}><code style={{ background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px', fontSize: '0.9em' }}>Value::Null</code> — JSON null</li>
        <li style={{ marginBottom: '6px' }}><code style={{ background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px', fontSize: '0.9em' }}>Value::Bool(bool)</code> — JSON boolean</li>
        <li style={{ marginBottom: '6px' }}><code style={{ background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px', fontSize: '0.9em' }}>Value::Number(Number)</code> — JSON number (integer or float)</li>
        <li style={{ marginBottom: '6px' }}><code style={{ background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px', fontSize: '0.9em' }}>Value::String(String)</code> — JSON string</li>
        <li style={{ marginBottom: '6px' }}><code style={{ background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px', fontSize: '0.9em' }}>Value::Array(Vec&lt;Value&gt;)</code> — JSON array</li>
        <li style={{ marginBottom: '6px' }}><code style={{ background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px', fontSize: '0.9em' }}>Value::Object(Map&lt;String, Value&gt;)</code> — JSON object</li>
      </ul>

      {/* Section 14: Tools */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#0f172a', marginTop: '40px', marginBottom: '16px', borderBottom: '2px solid #e2e8f0', paddingBottom: '8px' }}>
        Tools for JSON to Rust Conversion
      </h2>
      <p>Manually writing serde structs for complex JSON is tedious and error-prone. These tools automate the process:</p>
      <ul style={{ paddingLeft: '24px', color: '#334155' }}>
        <li style={{ marginBottom: '10px' }}>
          <strong><Link href="https://viadreams.cc/en/tools/json-to-rust" style={{ color: '#0ea5e9', textDecoration: 'none' }}>DevToolBox JSON to Rust</Link></strong> — paste any JSON and get complete serde-annotated Rust structs. Handles nested objects, arrays, optional fields, and applies proper naming conventions automatically.
        </li>
        <li style={{ marginBottom: '10px' }}>
          <strong>transform.tools</strong> — online JSON to Rust converter with multiple output format options
        </li>
        <li style={{ marginBottom: '10px' }}>
          <strong>json_typegen CLI</strong> — generates Rust types from JSON samples with cargo integration
        </li>
        <li style={{ marginBottom: '10px' }}>
          <strong>quicktype</strong> — generates Rust structs from JSON, JSON Schema, or TypeScript types
        </li>
      </ul>
      <p style={{ marginTop: '16px' }}>
        <Link href={toolLink} style={{ display: 'inline-block', background: '#0ea5e9', color: '#fff', padding: '10px 22px', borderRadius: '8px', textDecoration: 'none', fontWeight: 600, fontSize: '0.97rem' }}>
          {tx.tryTool}
        </Link>
      </p>

      {/* Section 15: Common Pitfalls */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#0f172a', marginTop: '40px', marginBottom: '16px', borderBottom: '2px solid #e2e8f0', paddingBottom: '8px' }}>
        Common Pitfalls
      </h2>
      <p>Avoid these common mistakes when working with serde_json in Rust:</p>
      <pre style={{ background: '#0f172a', color: '#e2e8f0', padding: '20px', borderRadius: '10px', overflowX: 'auto', fontSize: '0.87rem', lineHeight: 1.6, marginBottom: '20px' }}>
        <code>{pitfallsCode}</code>
      </pre>
      <p>Additional pitfalls to watch for:</p>
      <ul style={{ paddingLeft: '24px', color: '#334155' }}>
        <li style={{ marginBottom: '8px' }}><strong>Lifetime issues with &amp;str</strong> — you can deserialize into <code style={{ background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px', fontSize: '0.9em' }}>&amp;str</code> for zero-copy parsing, but the struct lifetime must be tied to the input. Use <code style={{ background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px', fontSize: '0.9em' }}>String</code> when the lifetime is unclear.</li>
        <li style={{ marginBottom: '8px' }}><strong>Large number precision</strong> — JSON numbers like <code style={{ background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px', fontSize: '0.9em' }}>9999999999999999</code> exceed f64 precision. Enable the <code style={{ background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px', fontSize: '0.9em' }}>arbitrary_precision</code> feature in serde_json for exact handling.</li>
        <li style={{ marginBottom: '8px' }}><strong>Missing derive import</strong> — ensure <code style={{ background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px', fontSize: '0.9em' }}>use serde::{'{'}Serialize, Deserialize{'}'};</code> is imported in every file where you use the derives.</li>
        <li style={{ marginBottom: '8px' }}><strong>Untagged enum performance</strong> — untagged enums try each variant in order, which can be slow with many variants and complex data. Prefer tagged enums when possible.</li>
      </ul>

      {/* FAQ Section */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#0f172a', marginTop: '48px', marginBottom: '20px', borderBottom: '2px solid #e2e8f0', paddingBottom: '8px' }}>
        {tx.faqTitle}
      </h2>
      <div>
        {faqItems.map((item, i) => (
          <div key={i} style={{ marginBottom: '20px', background: '#f8fafc', borderRadius: '10px', padding: '18px 22px', border: '1px solid #e2e8f0' }}>
            <p style={{ fontWeight: 700, color: '#0f172a', margin: '0 0 8px' }}>{item.q}</p>
            <p style={{ margin: 0, color: '#475569', lineHeight: 1.65 }}>{item.a}</p>
          </div>
        ))}
      </div>

      {/* Conclusion CTA */}
      <div style={{ background: '#f0f9ff', border: '1px solid #bae6fd', borderRadius: '10px', padding: '24px', marginTop: '48px', textAlign: 'center' }}>
        <p style={{ margin: '0 0 16px', fontSize: '1.05rem', fontWeight: 600, color: '#0c4a6e' }}>
          Ready to convert your JSON to Rust structs automatically?
        </p>
        <Link href={toolLink} style={{ display: 'inline-block', background: '#0ea5e9', color: '#fff', padding: '12px 28px', borderRadius: '8px', textDecoration: 'none', fontWeight: 700, fontSize: '1rem' }}>
          {tx.tryTool}
        </Link>
      </div>
    </article>
  );
}
