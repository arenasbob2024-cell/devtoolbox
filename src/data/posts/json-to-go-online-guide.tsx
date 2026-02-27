'use client';
import React from 'react';
import Link from 'next/link';

const t: Record<string, Record<string, string>> = {
  en: {
    tldr_title: 'TL;DR',
    tldr: 'Convert JSON to Go structs using json tags, pointers for nullable fields, and encoding/json for serialization. Use json-to-go tools for automatic generation, and json.Decoder for streaming large payloads.',
    takeaways_title: 'Key Takeaways',
    takeaway1: 'Go struct fields must be exported (uppercase) to be visible to encoding/json',
    takeaway2: 'Use json tags to map struct fields to JSON keys: `json:"field_name"`',
    takeaway3: 'Pointers (*string, *int) represent nullable/optional JSON fields',
    takeaway4: 'omitempty skips zero-value fields during marshaling',
    takeaway5: 'json.Decoder is more efficient than json.Unmarshal for HTTP response bodies',
    takeaway6: 'map[string]interface{} handles dynamic or unknown JSON structure',
    takeaway7: 'Custom MarshalJSON/UnmarshalJSON implement special serialization logic',
    link_tool: 'Try the JSON to Go Converter →',

    h2_why: 'Why Convert JSON to Go Structs?',
    why_p1: 'Go is a statically typed language — working with untyped interface{} for JSON leads to verbose type assertions and runtime panics. Generating typed structs from JSON gives you compile-time safety, IDE autocomplete, and clearer code.',
    why_p2: 'The standard library\'s encoding/json package is powerful but requires proper struct definitions to work correctly. This guide covers everything from basic struct generation to advanced patterns.',
    h2_basic: 'Basic Struct Generation',
    basic_p1: 'For a typical API response JSON, here\'s how the Go struct looks:',
    h2_tags: 'JSON Tags Explained',
    tags_p1: 'JSON tags control how struct fields map to JSON keys:',
    h2_nested: 'Nested Objects and Arrays',
    nested_p1: 'For nested JSON objects, create separate struct types. For arrays, use slices.',
    h2_nullable: 'Nullable and Optional Fields',
    nullable_p1: 'In Go, use pointer types to represent nullable/optional JSON fields. A nil pointer serializes to null:',
    h2_decode: 'Decoding JSON',
    decode_p1: 'Two main approaches for decoding JSON in Go:',
    h2_encode: 'Encoding JSON',
    encode_p1: 'Marshal Go structs back to JSON:',
    h2_dynamic: 'Dynamic JSON with map[string]interface{}',
    dynamic_p1: 'When the JSON structure is unknown at compile time:',
    h2_custom: 'Custom Marshaling',
    custom_p1: 'Implement MarshalJSON/UnmarshalJSON for special handling:',
    h2_time: 'Date and Time Handling',
    time_p1: 'time.Time marshals to RFC3339 format by default. For custom formats, implement a custom type:',
    h2_tools: 'Tools for JSON to Go Conversion',
    tools_p1: 'Several tools automate Go struct generation from JSON:',
    h2_pitfalls: 'Common Pitfalls',
    pitfalls_p1: 'Avoid these common mistakes when working with JSON in Go:',
    h2_faq: 'Frequently Asked Questions',
    faq1_q: 'How do I convert JSON to Go struct online?',
    faq1_a: 'Use DevToolBox\'s JSON to Go converter — paste your JSON and get idiomatic Go struct definitions with json tags, pointer types for nullable fields, and proper naming conventions.',
    faq2_q: 'Should I use json.Unmarshal or json.Decoder?',
    faq2_a: 'Use json.NewDecoder(r.Body).Decode(&v) for HTTP response bodies (streaming, no need to read all bytes first). Use json.Unmarshal(data, &v) when you already have the bytes in memory.',
    faq3_q: 'How do I handle nullable JSON fields in Go?',
    faq3_a: 'Use pointer types: *string, *int, *bool. A nil pointer marshals to JSON null. Check for nil before dereferencing: if user.Bio != nil { ... }',
    faq4_q: 'What does omitempty do in Go JSON tags?',
    faq4_a: 'omitempty omits the field from JSON output if it has a zero value: 0 for numbers, "" for strings, false for booleans, nil for pointers/slices/maps. Combine with pointer: *string `json:"bio,omitempty"` to omit absent fields.',
    faq5_q: 'How do I handle unknown JSON fields in Go?',
    faq5_a: 'encoding/json silently ignores unknown fields by default. To capture them, use json.RawMessage or embed a map: use struct with specific fields + additional map[string]interface{} with json:",squash" (via mapstructure) or just accept the defaults.',
    faq6_q: 'How do I marshal Go time.Time to a custom date format?',
    faq6_a: 'Create a custom type that wraps time.Time and implements MarshalJSON/UnmarshalJSON methods using your desired format string with time.Parse and time.Time.Format.',
    faq7_q: 'Why are my struct fields missing from the JSON output?',
    faq7_a: 'Fields must be exported (start with uppercase) to be visible to encoding/json. Unexported (lowercase) fields are always ignored. Also check that you haven\'t used json:"-" which explicitly excludes a field.',
    faq8_q: 'How do I convert JSON arrays to Go slices?',
    faq8_a: 'JSON arrays map to Go slices: []string, []int, []MyStruct. The field tag works the same: Tags []string `json:"tags"`. A JSON null for an array will set the slice to nil.',
    conclusion: 'Try the free JSON to Go converter →',
  },
  zh: {
    tldr_title: 'TL;DR',
    tldr: '使用 json 标签、指针表示可空字段和 encoding/json 进行序列化将 JSON 转换为 Go 结构体。使用 json-to-go 工具自动生成，并使用 json.Decoder 处理流式大负载。',
    takeaways_title: '关键要点',
    takeaway1: 'Go 结构体字段必须是导出的（大写开头）才能被 encoding/json 处理',
    takeaway2: '使用 json 标签将结构体字段映射到 JSON 键：`json:"field_name"`',
    takeaway3: '指针（*string、*int）表示 JSON 中的可空/可选字段',
    takeaway4: 'omitempty 在序列化时跳过零值字段',
    takeaway5: '对于 HTTP 响应体，json.Decoder 比 json.Unmarshal 更高效',
    takeaway6: 'map[string]interface{} 处理动态或未知的 JSON 结构',
    takeaway7: '自定义 MarshalJSON/UnmarshalJSON 实现特殊序列化逻辑',
    link_tool: '试用 JSON 转 Go 工具 →',

    h2_why: '为什么要将 JSON 转换为 Go 结构体？',
    why_p1: 'Go 是静态类型语言——使用无类型的 interface{} 处理 JSON 会导致繁琐的类型断言和运行时恐慌。从 JSON 生成类型化结构体可以获得编译时安全性、IDE 自动补全和更清晰的代码。',
    why_p2: '标准库的 encoding/json 包功能强大，但需要正确的结构体定义才能正常工作。本指南涵盖从基本结构体生成到高级模式的所有内容。',
    h2_basic: '基本结构体生成',
    basic_p1: '对于典型的 API 响应 JSON，Go 结构体如下所示：',
    h2_tags: 'JSON 标签说明',
    tags_p1: 'JSON 标签控制结构体字段如何映射到 JSON 键：',
    h2_nested: '嵌套对象和数组',
    nested_p1: '对于嵌套的 JSON 对象，创建独立的结构体类型。对于数组，使用切片。',
    h2_nullable: '可空和可选字段',
    nullable_p1: '在 Go 中，使用指针类型表示 JSON 中的可空/可选字段。nil 指针序列化为 null：',
    h2_decode: '解码 JSON',
    decode_p1: 'Go 中解码 JSON 的两种主要方式：',
    h2_encode: '编码 JSON',
    encode_p1: '将 Go 结构体序列化回 JSON：',
    h2_dynamic: '使用 map[string]interface{} 处理动态 JSON',
    dynamic_p1: '当编译时 JSON 结构未知时：',
    h2_custom: '自定义序列化',
    custom_p1: '实现 MarshalJSON/UnmarshalJSON 进行特殊处理：',
    h2_time: '日期和时间处理',
    time_p1: 'time.Time 默认序列化为 RFC3339 格式。自定义格式需实现自定义类型：',
    h2_tools: 'JSON 转 Go 的工具',
    tools_p1: '多种工具可以自动从 JSON 生成 Go 结构体：',
    h2_pitfalls: '常见陷阱',
    pitfalls_p1: '处理 Go 中的 JSON 时避免以下常见错误：',
    h2_faq: '常见问题',
    faq1_q: '如何在线将 JSON 转换为 Go 结构体？',
    faq1_a: '使用 DevToolBox 的 JSON 转 Go 工具——粘贴 JSON 即可获得带有 json 标签、可空字段指针类型和正确命名规范的惯用 Go 结构体定义。',
    faq2_q: '应该使用 json.Unmarshal 还是 json.Decoder？',
    faq2_a: '对 HTTP 响应体使用 json.NewDecoder(r.Body).Decode(&v)（流式，不需要先读取所有字节）。当内存中已有字节时使用 json.Unmarshal(data, &v)。',
    faq3_q: '如何处理 Go 中 JSON 的可空字段？',
    faq3_a: '使用指针类型：*string、*int、*bool。nil 指针序列化为 JSON null。在解引用前检查是否为 nil：if user.Bio != nil { ... }',
    faq4_q: 'Go JSON 标签中的 omitempty 有什么作用？',
    faq4_a: 'omitempty 在字段具有零值时从 JSON 输出中省略该字段：数字为 0，字符串为 ""，布尔值为 false，指针/切片/映射为 nil。与指针结合使用：*string `json:"bio,omitempty"` 可省略缺失字段。',
    faq5_q: '如何处理 Go 中的未知 JSON 字段？',
    faq5_a: 'encoding/json 默认静默忽略未知字段。要捕获它们，可使用 json.RawMessage 或嵌入 map[string]interface{}。',
    faq6_q: '如何将 Go 的 time.Time 序列化为自定义日期格式？',
    faq6_a: '创建一个包装 time.Time 的自定义类型，并使用所需格式字符串实现 MarshalJSON/UnmarshalJSON 方法。',
    faq7_q: '为什么我的结构体字段在 JSON 输出中丢失了？',
    faq7_a: '字段必须是导出的（大写开头）才能被 encoding/json 处理。未导出的（小写）字段始终被忽略。还要检查是否使用了 json:"-" 标签（显式排除字段）。',
    faq8_q: '如何将 JSON 数组转换为 Go 切片？',
    faq8_a: 'JSON 数组映射到 Go 切片：[]string、[]int、[]MyStruct。字段标签的使用方式相同：Tags []string `json:"tags"`。JSON null 数组会将切片设为 nil。',
    conclusion: '试用免费 JSON 转 Go 工具 →',
  },
};

export default function JsonToGoOnlineGuide({ lang }: { lang: string }) {
  const s = t[lang] || t['en'];

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: s.faq1_q, acceptedAnswer: { '@type': 'Answer', text: s.faq1_a } },
      { '@type': 'Question', name: s.faq2_q, acceptedAnswer: { '@type': 'Answer', text: s.faq2_a } },
      { '@type': 'Question', name: s.faq3_q, acceptedAnswer: { '@type': 'Answer', text: s.faq3_a } },
      { '@type': 'Question', name: s.faq4_q, acceptedAnswer: { '@type': 'Answer', text: s.faq4_a } },
      { '@type': 'Question', name: s.faq5_q, acceptedAnswer: { '@type': 'Answer', text: s.faq5_a } },
      { '@type': 'Question', name: s.faq6_q, acceptedAnswer: { '@type': 'Answer', text: s.faq6_a } },
      { '@type': 'Question', name: s.faq7_q, acceptedAnswer: { '@type': 'Answer', text: s.faq7_a } },
      { '@type': 'Question', name: s.faq8_q, acceptedAnswer: { '@type': 'Answer', text: s.faq8_a } },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* TL;DR Box */}
      <div style={{ background: '#f0f9ff', border: '1px solid #bae6fd', borderRadius: 8, padding: '16px 20px', marginBottom: 24 }}>
        <strong style={{ fontSize: 16 }}>{s.tldr_title}</strong>
        <p style={{ margin: '8px 0 0 0', lineHeight: 1.7 }}>{s.tldr}</p>
      </div>

      {/* Key Takeaways */}
      <div style={{ background: '#f8fafc', borderRadius: 8, padding: '16px 20px', marginBottom: 24 }}>
        <strong style={{ fontSize: 16 }}>{s.takeaways_title}</strong>
        <ul style={{ margin: '8px 0 0 0', paddingLeft: 20, lineHeight: 1.8 }}>
          <li>{s.takeaway1}</li>
          <li>{s.takeaway2}</li>
          <li>{s.takeaway3}</li>
          <li>{s.takeaway4}</li>
          <li>{s.takeaway5}</li>
          <li>{s.takeaway6}</li>
          <li>{s.takeaway7}</li>
        </ul>
      </div>

      <p><Link href={`/${lang}/tools/json-to-go`} style={{ fontWeight: 600, color: '#2563eb' }}>{s.link_tool}</Link></p>

      <h2>{s.h2_why}</h2>
      <p>{s.why_p1}</p>
      <p>{s.why_p2}</p>

      <h2>{s.h2_basic}</h2>
      <p>{s.basic_p1}</p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: 16, borderRadius: 8, overflowX: 'auto', fontSize: 13, lineHeight: 1.5 }}><code>{`// Input JSON:
// {
//   "id": 1,
//   "name": "Alice",
//   "email": "alice@example.com",
//   "active": true,
//   "score": 98.5,
//   "created_at": "2026-01-01T00:00:00Z"
// }

package main

import "time"

type User struct {
    ID        int       \`json:"id"\`
    Name      string    \`json:"name"\`
    Email     string    \`json:"email"\`
    Active    bool      \`json:"active"\`
    Score     float64   \`json:"score"\`
    CreatedAt time.Time \`json:"created_at"\`
}`}</code></pre>

      <h2>{s.h2_tags}</h2>
      <p>{s.tags_p1}</p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: 16, borderRadius: 8, overflowX: 'auto', fontSize: 13, lineHeight: 1.5 }}><code>{`type Product struct {
    // Map CamelCase Go name to snake_case JSON key
    ProductID   int     \`json:"product_id"\`

    // omitempty: skip field if zero value ("", 0, false, nil)
    Description string  \`json:"description,omitempty"\`

    // "-": always exclude from JSON (for passwords, internal fields)
    Password    string  \`json:"-"\`

    // "string": marshal number as JSON string (for JS Number precision)
    Price       float64 \`json:"price,string"\`

    // No tag: uses field name as-is (Go's default)
    Type        string  // marshals as "Type"
}`}</code></pre>

      <h2>{s.h2_nested}</h2>
      <p>{s.nested_p1}</p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: 16, borderRadius: 8, overflowX: 'auto', fontSize: 13, lineHeight: 1.5 }}><code>{`// Nested JSON:
// { "id": 1, "customer": {"name": "Alice", "address": {"city": "NYC"}},
//   "items": [{"sku": "ABC", "qty": 2}], "tags": ["urgent", "vip"] }

type Order struct {
    ID       int      \`json:"id"\`
    Customer Customer \`json:"customer"\`  // nested struct
    Items    []Item   \`json:"items"\`     // slice of structs
    Tags     []string \`json:"tags"\`      // slice of primitives
}

type Customer struct {
    Name    string  \`json:"name"\`
    Address Address \`json:"address"\`
}

type Address struct {
    City   string \`json:"city"\`
    Street string \`json:"street,omitempty"\`
    Zip    string \`json:"zip,omitempty"\`
}

type Item struct {
    SKU      string  \`json:"sku"\`
    Quantity int     \`json:"qty"\`
    Price    float64 \`json:"price,omitempty"\`
}`}</code></pre>

      <h2>{s.h2_nullable}</h2>
      <p>{s.nullable_p1}</p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: 16, borderRadius: 8, overflowX: 'auto', fontSize: 13, lineHeight: 1.5 }}><code>{`// JSON: { "id": 1, "name": "Alice", "bio": null, "avatar": null }
// OR:   { "id": 2, "name": "Bob",   "bio": "Gopher", "avatar": "/img.png" }

type UserProfile struct {
    ID     int     \`json:"id"\`
    Name   string  \`json:"name"\`
    Bio    *string \`json:"bio"\`              // null → nil pointer
    Avatar *string \`json:"avatar,omitempty"\` // null or absent → nil, omit in output
}

// Check before dereferencing
func displayBio(u UserProfile) string {
    if u.Bio != nil {
        return *u.Bio
    }
    return "No bio provided"
}

// Create with nullable field
bio := "Software Engineer"
user := UserProfile{ID: 1, Name: "Alice", Bio: &bio}`}</code></pre>

      <h2>{s.h2_decode}</h2>
      <p>{s.decode_p1}</p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: 16, borderRadius: 8, overflowX: 'auto', fontSize: 13, lineHeight: 1.5 }}><code>{`import (
    "encoding/json"
    "fmt"
    "net/http"
)

// --- Option 1: json.Unmarshal (when you have []byte) ---
data := []byte(\`{"id": 1, "name": "Alice"}\`)
var user User
if err := json.Unmarshal(data, &user); err != nil {
    return fmt.Errorf("unmarshal user: %w", err)
}
fmt.Println(user.Name) // Alice

// --- Option 2: json.Decoder (for io.Reader, HTTP bodies) ---
resp, err := http.Get("https://api.example.com/users/1")
if err != nil { /* handle */ }
defer resp.Body.Close()

var user User
if err := json.NewDecoder(resp.Body).Decode(&user); err != nil {
    return fmt.Errorf("decode user: %w", err)
}

// --- Decode JSON array ---
var users []User
json.NewDecoder(resp.Body).Decode(&users)

// --- Decode into map (unknown structure) ---
var result map[string]interface{}
json.Unmarshal(data, &result)`}</code></pre>

      <h2>{s.h2_encode}</h2>
      <p>{s.encode_p1}</p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: 16, borderRadius: 8, overflowX: 'auto', fontSize: 13, lineHeight: 1.5 }}><code>{`import (
    "encoding/json"
    "net/http"
)

user := User{ID: 1, Name: "Alice", Email: "alice@example.com"}

// To []byte (compact)
data, err := json.Marshal(user)
// {"id":1,"name":"Alice","email":"alice@example.com"}

// To []byte (pretty-printed)
data, err := json.MarshalIndent(user, "", "  ")

// To http.ResponseWriter
func handleUser(w http.ResponseWriter, r *http.Request) {
    w.Header().Set("Content-Type", "application/json")
    json.NewEncoder(w).Encode(user) // more efficient for large payloads
}`}</code></pre>

      <h2>{s.h2_dynamic}</h2>
      <p>{s.dynamic_p1}</p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: 16, borderRadius: 8, overflowX: 'auto', fontSize: 13, lineHeight: 1.5 }}><code>{`// Decode into map when structure is unknown
var result map[string]interface{}
json.Unmarshal(data, &result)

// Type assertions needed for nested access
if name, ok := result["name"].(string); ok {
    fmt.Println("Name:", name)
}
if age, ok := result["age"].(float64); ok { // JSON numbers → float64
    fmt.Printf("Age: %d\\n", int(age))
}

// json.RawMessage: delay decoding based on discriminator field
type Response struct {
    Type string          \`json:"type"\`
    Data json.RawMessage \`json:"data"\` // decode later
}

var resp Response
json.Unmarshal(data, &resp)

switch resp.Type {
case "user":
    var u User
    json.Unmarshal(resp.Data, &u)
case "product":
    var p Product
    json.Unmarshal(resp.Data, &p)
}`}</code></pre>

      <h2>{s.h2_custom}</h2>
      <p>{s.custom_p1}</p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: 16, borderRadius: 8, overflowX: 'auto', fontSize: 13, lineHeight: 1.5 }}><code>{`// Custom time format (default is RFC3339)
type CustomDate struct {
    time.Time
}

func (d CustomDate) MarshalJSON() ([]byte, error) {
    return json.Marshal(d.Format("2006-01-02"))
}

func (d *CustomDate) UnmarshalJSON(data []byte) error {
    var s string
    if err := json.Unmarshal(data, &s); err != nil {
        return err
    }
    t, err := time.Parse("2006-01-02", s)
    if err != nil {
        return err
    }
    d.Time = t
    return nil
}

// Usage:
type Event struct {
    Name      string     \`json:"name"\`
    StartDate CustomDate \`json:"start_date"\` // "2026-01-15" format
}

// Custom enum handling
type Status int

const (
    StatusActive  Status = iota
    StatusInactive
)

func (s Status) MarshalJSON() ([]byte, error) {
    switch s {
    case StatusActive:
        return json.Marshal("active")
    case StatusInactive:
        return json.Marshal("inactive")
    }
    return nil, fmt.Errorf("unknown status: %d", s)
}

func (s *Status) UnmarshalJSON(data []byte) error {
    var str string
    if err := json.Unmarshal(data, &str); err != nil {
        return err
    }
    switch str {
    case "active":
        *s = StatusActive
    case "inactive":
        *s = StatusInactive
    default:
        return fmt.Errorf("unknown status: %s", str)
    }
    return nil
}`}</code></pre>

      <h2>{s.h2_tools}</h2>
      <p>{s.tools_p1}</p>
      <ul style={{ lineHeight: 1.8, paddingLeft: 20 }}>
        <li><strong><Link href={`/${lang}/tools/json-to-go`} style={{ color: '#2563eb' }}>DevToolBox JSON to Go Converter</Link></strong> — paste JSON, get idiomatic Go struct instantly. Handles nested objects, arrays, nullable fields, and proper Go naming conventions.</li>
        <li><strong>quicktype CLI</strong>: <code>npm install -g quicktype && quicktype --lang go --out types.go data.json</code> — supports unions, optional fields, and multiple languages</li>
        <li><strong>json-to-go.com</strong> — the original web-based json-to-go tool by mholt</li>
        <li><strong>GoLand/VS Code</strong> — paste JSON and use code actions to generate struct definitions inline</li>
      </ul>

      <h2>{s.h2_pitfalls}</h2>
      <p>{s.pitfalls_p1}</p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: 16, borderRadius: 8, overflowX: 'auto', fontSize: 13, lineHeight: 1.5 }}><code>{`// ❌ 1. Unexported fields ignored by encoding/json
type user struct {
    id   int    // IGNORED - must be Id or ID
    name string // IGNORED
}

// ✅ Use exported fields
type User struct {
    ID   int    \`json:"id"\`
    Name string \`json:"name"\`
}

// ❌ 2. JSON numbers decode as float64 in interface{}
var data map[string]interface{}
json.Unmarshal([]byte(\`{"count": 42}\`), &data)
count := data["count"].(int) // PANICS: it's float64!

// ✅ Proper type assertion
count := int(data["count"].(float64)) // correct

// ❌ 3. Nil pointer dereference
var user *User
fmt.Println(user.Name) // PANICS

// ✅ Check for nil
if user != nil {
    fmt.Println(user.Name)
}

// ❌ 4. Using json.Unmarshal for HTTP bodies (reads all into memory first)
body, _ := io.ReadAll(resp.Body)
json.Unmarshal(body, &user)

// ✅ Use json.Decoder for streaming
json.NewDecoder(resp.Body).Decode(&user)

// ❌ 5. Null/nil slice marshals as null
var items []Item // nil slice
json.Marshal(items) // {"items": null}

// ✅ Initialize with make for empty array
items := make([]Item, 0)
json.Marshal(items) // {"items": []}`}</code></pre>

      <h2>{s.h2_faq}</h2>
      <div style={{ marginBottom: 24 }}>
        <h3 style={{ marginBottom: 8 }}>{s.faq1_q}</h3>
        <p style={{ margin: 0 }}>{s.faq1_a}</p>
      </div>
      <div style={{ marginBottom: 24 }}>
        <h3 style={{ marginBottom: 8 }}>{s.faq2_q}</h3>
        <p style={{ margin: 0 }}>{s.faq2_a}</p>
      </div>
      <div style={{ marginBottom: 24 }}>
        <h3 style={{ marginBottom: 8 }}>{s.faq3_q}</h3>
        <p style={{ margin: 0 }}>{s.faq3_a}</p>
      </div>
      <div style={{ marginBottom: 24 }}>
        <h3 style={{ marginBottom: 8 }}>{s.faq4_q}</h3>
        <p style={{ margin: 0 }}>{s.faq4_a}</p>
      </div>
      <div style={{ marginBottom: 24 }}>
        <h3 style={{ marginBottom: 8 }}>{s.faq5_q}</h3>
        <p style={{ margin: 0 }}>{s.faq5_a}</p>
      </div>
      <div style={{ marginBottom: 24 }}>
        <h3 style={{ marginBottom: 8 }}>{s.faq6_q}</h3>
        <p style={{ margin: 0 }}>{s.faq6_a}</p>
      </div>
      <div style={{ marginBottom: 24 }}>
        <h3 style={{ marginBottom: 8 }}>{s.faq7_q}</h3>
        <p style={{ margin: 0 }}>{s.faq7_a}</p>
      </div>
      <div style={{ marginBottom: 24 }}>
        <h3 style={{ marginBottom: 8 }}>{s.faq8_q}</h3>
        <p style={{ margin: 0 }}>{s.faq8_a}</p>
      </div>

      <div style={{ background: '#f0f9ff', border: '1px solid #bae6fd', borderRadius: 8, padding: '16px 20px', marginTop: 32 }}>
        <p style={{ margin: 0, fontWeight: 600 }}>
          <Link href={`/${lang}/tools/json-to-go`} style={{ color: '#2563eb' }}>{s.conclusion}</Link>
          {' '}— paste JSON, get idiomatic Go structs with proper json tags, pointer types, and Go naming conventions.
        </p>
      </div>
    </>
  );
}
