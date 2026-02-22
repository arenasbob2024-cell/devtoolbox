import Link from 'next/link';

const t: Record<string, Record<string, string>> = {
  en: {
    intro: 'Working with JSON in Go requires defining <strong>struct types</strong> that mirror your JSON structure. Unlike dynamically typed languages where you can access JSON properties on the fly, Go demands explicit struct definitions with proper <strong>json tags</strong> for serialization and deserialization. This guide provides a thorough walkthrough of JSON to Go struct conversion, covering type mapping, nested structures, optional fields with pointer types, <code>omitempty</code> best practices, custom marshaling, and common real-world patterns you will encounter when building Go APIs and services.',
    linkTool: 'Convert JSON to Go structs instantly with our free online tool.',
    h2_basics: 'JSON to Go Type Mapping Basics',
    basicsDesc: 'Every JSON type has a corresponding Go type. Understanding these mappings is the foundation of writing correct Go struct definitions:',
    basicsNote: 'The most important distinction is how Go handles <code>null</code> values. A regular <code>string</code> or <code>int</code> field cannot be null in Go. To represent nullable fields, you must use pointer types (<code>*string</code>, <code>*int</code>). This is one of the most common mistakes when converting JSON to Go structs.',
    h2_tags: 'JSON Struct Tags: The Essential Guide',
    tagsDesc1: 'Struct tags tell Go\'s <code>encoding/json</code> package how to map between JSON keys and struct fields. The tag format is <code>`json:"key_name,options"`</code>:',
    tagsDesc2: 'Key rules for struct tags: fields must be exported (start with uppercase letter) to be visible to the JSON package. The tag maps the exported Go field name to the JSON key name. Multiple options are comma-separated with no spaces.',
    h2_nested: 'Handling Nested JSON Objects',
    nestedDesc1: 'Real-world JSON payloads are rarely flat. Nested objects require separate struct definitions for each level:',
    nestedDesc2: 'For deeply nested JSON, define each struct type separately rather than using inline anonymous structs. This improves readability, enables type reuse, and makes testing easier. Anonymous structs should only be used for one-off shapes that will never be reused.',
    h2_arrays: 'Arrays and Slices',
    arraysDesc: 'JSON arrays map to Go slices. The element type depends on the array contents:',
    h2_optional: 'Handling Optional and Nullable Fields',
    optionalDesc1: 'One of the trickiest parts of JSON to Go conversion is handling optional fields correctly. Go has three patterns for this:',
    optionalDesc2: 'Choose the right pattern based on your use case: use <code>omitempty</code> alone for fields where the zero value is acceptable, use pointer types when you need to distinguish between "not provided" and "zero value", and use <code>json.RawMessage</code> for polymorphic fields where the type depends on another field.',
    h2_custom: 'Custom JSON Marshaling and Unmarshaling',
    customDesc1: 'Sometimes the default JSON mapping is not sufficient. Go allows you to implement the <code>json.Marshaler</code> and <code>json.Unmarshaler</code> interfaces for custom serialization logic:',
    customDesc2: 'Common use cases for custom marshaling include: handling multiple date formats, converting between string and numeric representations, implementing enum types, and flattening nested structures during serialization.',
    h2_patterns: 'Real-World API Patterns',
    patternsDesc: 'Here are common JSON patterns you will encounter when working with REST APIs and how to model them in Go:',
    h2_tools: 'Automating JSON to Go Struct Generation',
    toolsDesc1: 'Manually writing struct definitions for large JSON payloads is tedious and error-prone. Our <strong>JSON to Go</strong> converter tool automatically generates properly tagged, correctly typed struct definitions from any JSON input. It handles nested objects, arrays, optional fields, and mixed types automatically.',
    toolsDesc2: 'For CI/CD integration, you can also use the <code>json-to-go</code> command-line tool or generate Go types from JSON Schema definitions using <code>go-jsonschema</code>.',
    h2_faq: 'Frequently Asked Questions',
    faq1_q: 'How do I convert JSON to a Go struct?',
    faq1_a: 'Define a Go struct with exported fields and json tags that match your JSON keys. Map JSON types to Go types (string to string, number to int/float64, boolean to bool, null to pointer types, object to struct, array to slice). Use our free online JSON to Go converter tool for automatic generation.',
    faq2_q: 'What is omitempty in Go JSON tags?',
    faq2_a: 'The omitempty option in a json struct tag tells the JSON encoder to skip the field when marshaling if it has a zero value (empty string, 0, false, nil pointer, empty slice/map). This is useful for PATCH API requests where you only want to send changed fields.',
    faq3_q: 'How do I handle null values in Go JSON?',
    faq3_a: 'Use pointer types (*string, *int, *bool) for fields that can be null in JSON. When the JSON value is null, the pointer will be nil in Go. Regular (non-pointer) types cannot represent null and will use their zero value instead.',
    faq4_q: 'Can I have different JSON field names than Go field names?',
    faq4_a: 'Yes, use struct tags. For example, `json:"user_name"` maps the JSON key "user_name" to whatever Go field name you choose (e.g., UserName). The json tag completely controls the JSON serialization name.',
    faq5_q: 'How do I handle dynamic or unknown JSON fields in Go?',
    faq5_a: 'Use map[string]interface{} (or map[string]any in Go 1.18+) for completely dynamic JSON, json.RawMessage for fields you want to delay parsing, or embed a map alongside known fields. For partially known structures, combine a struct with a map.',
    conclusion: 'Converting <strong>JSON to Go structs</strong> correctly is fundamental to writing robust Go applications. Understanding type mappings, pointer types for nullable fields, <code>omitempty</code> behavior, and custom marshaling patterns will make your JSON handling reliable and maintainable. For quick conversions, use our free online tool. For production codebases, establish consistent struct tag conventions and consider generating types from JSON Schema for API contracts.',
    linkToolBottom: 'Try the JSON to Go struct converter now.',
  },
  zh: {
    intro: '在 Go 中处理 JSON 需要定义与 JSON 结构匹配的<strong>结构体类型</strong>。与动态类型语言不同，Go 要求显式的结构体定义和正确的 <strong>json 标签</strong>。本指南详细介绍 JSON 到 Go 结构体的转换，包括类型映射、嵌套结构、指针类型处理可选字段、omitempty 最佳实践和自定义序列化。',
    linkTool: '使用我们的免费在线工具即时将 JSON 转换为 Go 结构体。',
    h2_basics: 'JSON 到 Go 类型映射基础',
    basicsDesc: '每种 JSON 类型都有对应的 Go 类型。理解这些映射是编写正确结构体定义的基础：',
    basicsNote: '最重要的区别是 Go 如何处理 <code>null</code> 值。普通的 <code>string</code> 或 <code>int</code> 字段不能为 null。要表示可空字段，必须使用指针类型（<code>*string</code>、<code>*int</code>）。',
    h2_tags: 'JSON 结构体标签：基础指南',
    tagsDesc1: '结构体标签告诉 Go 的 <code>encoding/json</code> 包如何在 JSON 键和结构体字段之间映射：',
    tagsDesc2: '关键规则：字段必须导出（首字母大写）才能被 JSON 包识别。标签将导出的 Go 字段名映射到 JSON 键名。',
    h2_nested: '处理嵌套 JSON 对象',
    nestedDesc1: '真实的 JSON 负载很少是扁平的。嵌套对象需要为每一层定义单独的结构体：',
    nestedDesc2: '深层嵌套的 JSON 应分别定义每个结构体类型，而不是使用内联匿名结构体，这样可以提高可读性和类型复用。',
    h2_arrays: '数组和切片',
    arraysDesc: 'JSON 数组映射到 Go 切片。元素类型取决于数组内容：',
    h2_optional: '处理可选和可空字段',
    optionalDesc1: 'JSON 转 Go 最棘手的部分之一是正确处理可选字段。Go 有三种模式：',
    optionalDesc2: '根据用例选择正确的模式：零值可接受时用 <code>omitempty</code>，需要区分"未提供"和"零值"时用指针类型，多态字段用 <code>json.RawMessage</code>。',
    h2_custom: '自定义 JSON 序列化和反序列化',
    customDesc1: '有时默认的 JSON 映射不够用。Go 允许实现 <code>json.Marshaler</code> 和 <code>json.Unmarshaler</code> 接口：',
    customDesc2: '自定义序列化的常见用例包括：处理多种日期格式、字符串和数值之间的转换、实现枚举类型、序列化时扁平化嵌套结构。',
    h2_patterns: '真实 API 模式',
    patternsDesc: '以下是使用 REST API 时常见的 JSON 模式及其在 Go 中的建模方式：',
    h2_tools: '自动化 JSON 到 Go 结构体生成',
    toolsDesc1: '我们的 <strong>JSON to Go</strong> 转换器工具从任何 JSON 输入自动生成正确标记和类型的结构体定义。',
    toolsDesc2: '对于 CI/CD 集成，也可以使用 json-to-go 命令行工具或从 JSON Schema 生成 Go 类型。',
    h2_faq: '常见问题',
    faq1_q: '如何将 JSON 转换为 Go 结构体？',
    faq1_a: '定义带有导出字段和 json 标签的 Go 结构体。将 JSON 类型映射到 Go 类型。使用我们的免费在线工具自动生成。',
    faq2_q: 'Go JSON 标签中的 omitempty 是什么？',
    faq2_a: 'omitempty 告诉 JSON 编码器在序列化时跳过零值字段。适用于 PATCH API 请求。',
    faq3_q: '如何在 Go JSON 中处理 null 值？',
    faq3_a: '对可能为 null 的字段使用指针类型（*string、*int、*bool）。JSON null 值时指针为 nil。',
    faq4_q: 'Go 字段名可以和 JSON 字段名不同吗？',
    faq4_a: '可以，使用结构体标签。例如 `json:"user_name"` 将 JSON 键映射到 Go 字段名。',
    faq5_q: '如何处理动态或未知的 JSON 字段？',
    faq5_a: '完全动态的 JSON 用 map[string]interface{}，延迟解析用 json.RawMessage，部分已知结构可以组合结构体和 map。',
    conclusion: '正确地将 <strong>JSON 转换为 Go 结构体</strong>是编写健壮 Go 应用的基础。理解类型映射、指针类型、omitempty 和自定义序列化将使 JSON 处理可靠且易维护。快速转换使用在线工具，生产代码建议建立一致的标签约定。',
    linkToolBottom: '立即试用 JSON 转 Go 结构体转换器。',
  },
  fr: {
    intro: 'Travailler avec JSON en Go necessite la definition de <strong>types struct</strong> qui correspondent a votre structure JSON. Ce guide couvre le mapping de types, les structures imbriquees, les champs optionnels et les bonnes pratiques.',
    linkTool: 'Convertissez JSON en structs Go avec notre outil gratuit.',
    h2_basics: 'Bases du mapping de types JSON vers Go',
    basicsDesc: 'Chaque type JSON a un type Go correspondant.',
    basicsNote: 'Pour les valeurs null, utilisez des types pointeurs (*string, *int).',
    h2_tags: 'Tags de struct JSON : Guide essentiel',
    tagsDesc1: 'Les tags indiquent au package encoding/json comment mapper les cles JSON aux champs.',
    tagsDesc2: 'Les champs doivent etre exportes (majuscule) pour etre visibles par le package JSON.',
    h2_nested: 'Objets JSON imbriques',
    nestedDesc1: 'Les objets imbriques necessitent des definitions de struct separees.',
    nestedDesc2: 'Definissez chaque type de struct separement pour la lisibilite et la reutilisation.',
    h2_arrays: 'Tableaux et slices',
    arraysDesc: 'Les tableaux JSON correspondent aux slices Go.',
    h2_optional: 'Champs optionnels et nullables',
    optionalDesc1: 'Go a trois patterns pour les champs optionnels :',
    optionalDesc2: 'Choisissez le pattern adapte : omitempty pour les valeurs zero acceptables, pointeurs pour distinguer "non fourni" et "valeur zero".',
    h2_custom: 'Marshaling JSON personnalise',
    customDesc1: 'Implementez json.Marshaler et json.Unmarshaler pour une logique personnalisee.',
    customDesc2: 'Cas courants : formats de date, conversion de types, enums, aplatissement de structures.',
    h2_patterns: 'Patterns API reels',
    patternsDesc: 'Patterns JSON courants avec les APIs REST et leur modelisation en Go.',
    h2_tools: 'Generation automatique de structs',
    toolsDesc1: 'Notre outil JSON to Go genere automatiquement des definitions de struct correctement taguees.',
    toolsDesc2: 'Pour CI/CD, utilisez json-to-go en ligne de commande ou go-jsonschema.',
    h2_faq: 'Questions frequentes',
    faq1_q: 'Comment convertir JSON en struct Go ?',
    faq1_a: 'Definissez un struct avec des champs exportes et des tags json. Utilisez notre outil en ligne.',
    faq2_q: 'Qu\'est-ce que omitempty en Go ?',
    faq2_a: 'omitempty saute les champs a valeur zero lors du marshaling. Utile pour les requetes PATCH.',
    faq3_q: 'Comment gerer les valeurs null ?',
    faq3_a: 'Utilisez des types pointeurs (*string, *int, *bool). Le pointeur sera nil quand JSON est null.',
    faq4_q: 'Peut-on avoir des noms JSON differents ?',
    faq4_a: 'Oui, avec les tags de struct : `json:"user_name"` mappe la cle JSON au champ Go.',
    faq5_q: 'Comment gerer les champs JSON dynamiques ?',
    faq5_a: 'map[string]interface{} pour du JSON dynamique, json.RawMessage pour le parsing differe.',
    conclusion: 'Convertir <strong>JSON en structs Go</strong> correctement est fondamental. Utilisez notre outil en ligne ou etablissez des conventions de tags coherentes.',
    linkToolBottom: 'Essayez le convertisseur JSON to Go.',
  },
};

export default function JsonToGolangStructConversionGuide({ lang }: { lang: string }) {
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
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <p dangerouslySetInnerHTML={{ __html: s.intro }} />
      <p><Link href={`/${lang}/tools/json-to-go`} style={{ fontWeight: 600 }}>{s.linkTool}</Link></p>

      {/* Type Mapping Basics */}
      <h2>{s.h2_basics}</h2>
      <p dangerouslySetInnerHTML={{ __html: s.basicsDesc }} />

      <pre><code className="language-text">{`JSON Type          Go Type              Example
─────────────────────────────────────────────────────────
string             string               "hello" → "hello"
number (integer)   int / int64          42 → 42
number (float)     float64              3.14 → 3.14
boolean            bool                 true → true
null               *T (pointer)         null → nil
object             struct               {...} → MyStruct{}
array of strings   []string             ["a","b"] → []string{"a","b"}
array of objects   []MyStruct           [{...}] → []MyStruct{...}
array of mixed     []interface{}        [1,"a",true] → []interface{}{...}
dynamic object     map[string]any       {...} → map[string]any{...}`}</code></pre>

      <p dangerouslySetInnerHTML={{ __html: s.basicsNote }} />

      {/* Struct Tags */}
      <h2>{s.h2_tags}</h2>
      <p dangerouslySetInnerHTML={{ __html: s.tagsDesc1 }} />

      <pre><code className="language-go">{`package main

import (
    "encoding/json"
    "fmt"
)

// Basic struct with json tags
type User struct {
    // Field name → json key mapping
    ID        int    \`json:"id"\`              // "id" in JSON
    FirstName string \`json:"first_name"\`      // "first_name" in JSON
    LastName  string \`json:"last_name"\`       // "last_name" in JSON
    Email     string \`json:"email"\`           // "email" in JSON
    Age       int    \`json:"age,omitempty"\`   // skip if zero value
    Password  string \`json:"-"\`               // always skip (never serialize)

    // Without tag - uses field name as-is (case-insensitive unmarshal)
    Username string                            // matches "Username", "username", etc.
}

func main() {
    jsonData := \`{
        "id": 1,
        "first_name": "Alice",
        "last_name": "Smith",
        "email": "alice@example.com",
        "age": 0,
        "Username": "alice123"
    }\`

    var user User
    if err := json.Unmarshal([]byte(jsonData), &user); err != nil {
        panic(err)
    }

    fmt.Printf("Name: %s %s\\n", user.FirstName, user.LastName)
    // Output: Name: Alice Smith

    // Marshal back - age is omitted because it's 0 (omitempty)
    output, _ := json.MarshalIndent(user, "", "  ")
    fmt.Println(string(output))
}`}</code></pre>

      <p dangerouslySetInnerHTML={{ __html: s.tagsDesc2 }} />

      {/* Nested Structs */}
      <h2>{s.h2_nested}</h2>
      <p dangerouslySetInnerHTML={{ __html: s.nestedDesc1 }} />

      <pre><code className="language-go">{`// JSON input:
// {
//   "id": 1,
//   "name": "Acme Corp",
//   "address": {
//     "street": "123 Main St",
//     "city": "Springfield",
//     "state": "IL",
//     "zip": "62701",
//     "coordinates": {
//       "lat": 39.7817,
//       "lng": -89.6501
//     }
//   },
//   "contacts": [
//     { "name": "Alice", "role": "CEO", "email": "alice@acme.com" },
//     { "name": "Bob", "role": "CTO", "email": "bob@acme.com" }
//   ]
// }

// Define separate structs for each nested level
type Coordinates struct {
    Lat float64 \`json:"lat"\`
    Lng float64 \`json:"lng"\`
}

type Address struct {
    Street      string      \`json:"street"\`
    City        string      \`json:"city"\`
    State       string      \`json:"state"\`
    Zip         string      \`json:"zip"\`
    Coordinates Coordinates \`json:"coordinates"\`
}

type Contact struct {
    Name  string \`json:"name"\`
    Role  string \`json:"role"\`
    Email string \`json:"email"\`
}

type Company struct {
    ID       int       \`json:"id"\`
    Name     string    \`json:"name"\`
    Address  Address   \`json:"address"\`
    Contacts []Contact \`json:"contacts"\`
}`}</code></pre>

      <p dangerouslySetInnerHTML={{ __html: s.nestedDesc2 }} />

      {/* Arrays and Slices */}
      <h2>{s.h2_arrays}</h2>
      <p dangerouslySetInnerHTML={{ __html: s.arraysDesc }} />

      <pre><code className="language-go">{`// Different array types in JSON → Go
type Product struct {
    Name       string   \`json:"name"\`
    Tags       []string \`json:"tags"\`        // ["electronics", "sale"]
    Prices     []float64 \`json:"prices"\`     // [29.99, 39.99, 49.99]
    Ratings    []int    \`json:"ratings"\`      // [5, 4, 5, 3]
    IsActive   []bool   \`json:"flags"\`        // [true, false, true]

    // Array of objects
    Reviews    []Review \`json:"reviews"\`

    // Nested array of arrays (matrix)
    Matrix     [][]int  \`json:"matrix"\`       // [[1,2],[3,4]]

    // Mixed-type array (rare but possible)
    Metadata   []interface{} \`json:"metadata"\` // [1, "hello", true]
}

type Review struct {
    Author  string \`json:"author"\`
    Rating  int    \`json:"rating"\`
    Comment string \`json:"comment"\`
}

// Empty arrays vs null arrays
type Response struct {
    // null in JSON → nil slice (len=0, cap=0, == nil)
    // [] in JSON → empty slice (len=0, cap=0, != nil)
    // omitempty skips nil slices but NOT empty slices
    Items []Item \`json:"items,omitempty"\`
}`}</code></pre>

      {/* Optional Fields */}
      <h2>{s.h2_optional}</h2>
      <p dangerouslySetInnerHTML={{ __html: s.optionalDesc1 }} />

      <pre><code className="language-go">{`// Pattern 1: omitempty - skip zero values when marshaling
type UpdateRequest struct {
    Name  string \`json:"name,omitempty"\`  // "" is skipped
    Age   int    \`json:"age,omitempty"\`   // 0 is skipped
    Admin bool   \`json:"admin,omitempty"\` // false is skipped
}

// Problem: Can't distinguish "age not provided" from "age is 0"

// Pattern 2: Pointer types - distinguish null/missing from zero
type UpdateRequestV2 struct {
    Name  *string \`json:"name,omitempty"\`  // nil = not provided, "" = empty
    Age   *int    \`json:"age,omitempty"\`   // nil = not provided, 0 = zero
    Admin *bool   \`json:"admin,omitempty"\` // nil = not provided, false = false
}

// Helper function to create pointers (Go doesn't allow &literal)
func ptr[T any](v T) *T { return &v }

// Usage:
// req := UpdateRequestV2{
//     Name: ptr("Alice"),
//     Age:  ptr(0),      // explicitly set to 0, not nil
// }

// Pattern 3: json.RawMessage - defer parsing
type Event struct {
    Type    string          \`json:"type"\`
    Payload json.RawMessage \`json:"payload"\` // raw JSON bytes
}

// Parse payload based on type
func (e *Event) ParsePayload() (interface{}, error) {
    switch e.Type {
    case "user_created":
        var u User
        return &u, json.Unmarshal(e.Payload, &u)
    case "order_placed":
        var o Order
        return &o, json.Unmarshal(e.Payload, &o)
    default:
        var m map[string]interface{}
        return &m, json.Unmarshal(e.Payload, &m)
    }
}`}</code></pre>

      <p dangerouslySetInnerHTML={{ __html: s.optionalDesc2 }} />

      {/* Custom Marshaling */}
      <h2>{s.h2_custom}</h2>
      <p dangerouslySetInnerHTML={{ __html: s.customDesc1 }} />

      <pre><code className="language-go">{`import (
    "encoding/json"
    "time"
    "fmt"
    "strings"
)

// Custom date format (JSON uses "2006-01-02", not RFC3339)
type Date struct {
    time.Time
}

const dateFormat = "2006-01-02"

func (d *Date) UnmarshalJSON(data []byte) error {
    // Remove quotes from JSON string
    s := strings.Trim(string(data), \`"\`)
    if s == "null" || s == "" {
        return nil
    }
    t, err := time.Parse(dateFormat, s)
    if err != nil {
        return fmt.Errorf("invalid date format: %s", s)
    }
    d.Time = t
    return nil
}

func (d Date) MarshalJSON() ([]byte, error) {
    if d.Time.IsZero() {
        return []byte("null"), nil
    }
    return json.Marshal(d.Time.Format(dateFormat))
}

// Usage in a struct
type Employee struct {
    Name      string \`json:"name"\`
    StartDate Date   \`json:"start_date"\`
    EndDate   *Date  \`json:"end_date,omitempty"\`
}

// Custom enum type
type Status string

const (
    StatusActive   Status = "active"
    StatusInactive Status = "inactive"
    StatusPending  Status = "pending"
)

func (s *Status) UnmarshalJSON(data []byte) error {
    var str string
    if err := json.Unmarshal(data, &str); err != nil {
        return err
    }
    switch Status(str) {
    case StatusActive, StatusInactive, StatusPending:
        *s = Status(str)
        return nil
    default:
        return fmt.Errorf("invalid status: %s", str)
    }
}`}</code></pre>

      <p dangerouslySetInnerHTML={{ __html: s.customDesc2 }} />

      {/* Real-World Patterns */}
      <h2>{s.h2_patterns}</h2>
      <p dangerouslySetInnerHTML={{ __html: s.patternsDesc }} />

      <pre><code className="language-go">{`// Pattern: Paginated API Response
type PaginatedResponse[T any] struct {
    Data       []T    \`json:"data"\`
    Total      int    \`json:"total"\`
    Page       int    \`json:"page"\`
    PerPage    int    \`json:"per_page"\`
    TotalPages int    \`json:"total_pages"\`
    NextURL    string \`json:"next_url,omitempty"\`
    PrevURL    string \`json:"prev_url,omitempty"\`
}

// Pattern: API Error Response
type APIError struct {
    Code    int               \`json:"code"\`
    Message string            \`json:"message"\`
    Details map[string]string \`json:"details,omitempty"\`
}

func (e *APIError) Error() string {
    return fmt.Sprintf("[%d] %s", e.Code, e.Message)
}

// Pattern: Wrapper for success/error responses
type APIResponse[T any] struct {
    Success bool      \`json:"success"\`
    Data    *T        \`json:"data,omitempty"\`
    Error   *APIError \`json:"error,omitempty"\`
}

// Pattern: Webhook payload with dynamic event data
type WebhookPayload struct {
    ID        string          \`json:"id"\`
    Event     string          \`json:"event"\`
    Timestamp time.Time       \`json:"timestamp"\`
    Data      json.RawMessage \`json:"data"\`
}

// Pattern: Configuration file with defaults
type Config struct {
    Host     string \`json:"host"\`
    Port     int    \`json:"port"\`
    Debug    bool   \`json:"debug"\`
    LogLevel string \`json:"log_level"\`
    Database struct {
        URL             string \`json:"url"\`
        MaxConnections  int    \`json:"max_connections"\`
        ConnectTimeout  int    \`json:"connect_timeout_ms"\`
    } \`json:"database"\`
}

// Set defaults before unmarshaling
func NewConfig() *Config {
    return &Config{
        Host:     "localhost",
        Port:     8080,
        LogLevel: "info",
    }
}

func LoadConfig(data []byte) (*Config, error) {
    cfg := NewConfig()
    if err := json.Unmarshal(data, cfg); err != nil {
        return nil, err
    }
    return cfg, nil
}`}</code></pre>

      {/* Automation Tools */}
      <h2>{s.h2_tools}</h2>
      <p dangerouslySetInnerHTML={{ __html: s.toolsDesc1 }} />
      <p><Link href={`/${lang}/tools/json-to-go`} style={{ fontWeight: 600 }}>{s.linkTool}</Link></p>
      <p dangerouslySetInnerHTML={{ __html: s.toolsDesc2 }} />

      <pre><code className="language-bash">{`# Generate Go structs from a JSON file
cat api-response.json | json-to-go

# Generate from a JSON Schema definition
go install github.com/atombender/go-jsonschema/cmd/gojsonschema@latest
gojsonschema -p models schema.json

# Validate your structs handle the JSON correctly
go test -run TestUnmarshal ./models/...`}</code></pre>

      {/* FAQ */}
      <h2>{s.h2_faq}</h2>
      <h3>{s.faq1_q}</h3>
      <p dangerouslySetInnerHTML={{ __html: s.faq1_a }} />
      <h3>{s.faq2_q}</h3>
      <p dangerouslySetInnerHTML={{ __html: s.faq2_a }} />
      <h3>{s.faq3_q}</h3>
      <p dangerouslySetInnerHTML={{ __html: s.faq3_a }} />
      <h3>{s.faq4_q}</h3>
      <p dangerouslySetInnerHTML={{ __html: s.faq4_a }} />
      <h3>{s.faq5_q}</h3>
      <p dangerouslySetInnerHTML={{ __html: s.faq5_a }} />

      <p style={{ marginTop: 32 }} dangerouslySetInnerHTML={{ __html: s.conclusion }} />
      <p><Link href={`/${lang}/tools/json-to-go`} style={{ fontWeight: 600 }}>{s.linkToolBottom}</Link></p>

      {/* Internal links for SEO */}
      <h2>Related Developer Tools and Guides</h2>
      <ul>
        <li><Link href={`/${lang}/tools/json-to-go`}>JSON to Go Converter</Link> - Generate Go struct definitions from JSON data instantly</li>
        <li><Link href={`/${lang}/tools/json-formatter`}>JSON Formatter</Link> - Format and validate JSON before conversion</li>
        <li><Link href={`/${lang}/tools/json-to-typescript`}>JSON to TypeScript</Link> - Generate TypeScript interfaces from JSON</li>
        <li><Link href={`/${lang}/tools/json-validator`}>JSON Validator</Link> - Validate your JSON structure before generating structs</li>
        <li><Link href={`/${lang}/blog/json-to-go-struct-guide`}>JSON to Go Struct Best Practices</Link> - Struct tag patterns and mapping strategies</li>
        <li><Link href={`/${lang}/blog/json-vs-yaml-vs-toml`}>JSON vs YAML vs TOML</Link> - Compare data serialization formats</li>
        <li><Link href={`/${lang}/blog/rest-api-best-practices-guide`}>REST API Best Practices</Link> - Design robust APIs with proper JSON structures</li>
        <li><Link href={`/${lang}/blog/protobuf-vs-json-grpc-rest`}>Protobuf vs JSON</Link> - When to use Protocol Buffers over JSON</li>
      </ul>
    </>
  );
}
