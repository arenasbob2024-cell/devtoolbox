'use client';

/* ------------------------------------------------------------------ */
/*  JSON to Go Struct: Complete Guide with encoding/json and Struct Tags */
/* ------------------------------------------------------------------ */

const translations = {
  en: {
    title: 'JSON to Go Struct: Complete Guide with encoding/json and Struct Tags',
    description: 'Convert JSON to Go structs with encoding/json, custom tags, and type-safe parsing. Complete guide for Go developers.',
  },
  zh: {
    title: 'JSON 转 Go 结构体：完整指南',
    description: '使用 encoding/json、自定义标签和类型安全解析将 JSON 转换为 Go 结构体。',
  },
};

export default function JsonToGoOnlineGuide({ lang }: { lang: string }) {
  const t = translations[lang as keyof typeof translations] || translations.en;
  void t; // used for potential meta — content below is inline

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How do I convert JSON to Go struct online?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Use DevToolBox\'s JSON to Go converter — paste your JSON and get idiomatic Go struct definitions with json tags, pointer types for nullable fields, and proper Go naming conventions instantly.',
        },
      },
      {
        '@type': 'Question',
        name: 'Should I use json.Unmarshal or json.NewDecoder for HTTP responses?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Use json.NewDecoder(resp.Body).Decode(&v) for HTTP response bodies — it streams data without reading all bytes into memory first. Use json.Unmarshal(data, &v) when you already have a []byte in memory.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I handle nullable JSON fields in Go?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Use pointer types: *string, *int, *bool. A nil pointer marshals to JSON null. Always check for nil before dereferencing: if user.Bio != nil { use *user.Bio }.',
        },
      },
      {
        '@type': 'Question',
        name: 'What does omitempty do in a Go JSON struct tag?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'omitempty omits the field from JSON output when it has a zero value — 0 for numbers, "" for strings, false for booleans, nil for pointers/slices/maps. Combine with a pointer type like *string `json:"bio,omitempty"` to omit absent fields.',
        },
      },
      {
        '@type': 'Question',
        name: 'Why are my struct fields missing from Go JSON output?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Fields must be exported (start with uppercase) to be marshaled/unmarshaled by encoding/json. Unexported (lowercase) fields are always silently ignored. Also check you have not used `json:"-"` which explicitly excludes a field.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I implement a custom date format in Go JSON?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Create a custom type embedding time.Time and implement MarshalJSON/UnmarshalJSON. Use time.Parse("2006-01-02", s) and t.Format("2006-01-02") with Go\'s reference time layout.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I handle unknown JSON fields with DisallowUnknownFields?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Call dec := json.NewDecoder(r); dec.DisallowUnknownFields(); dec.Decode(&v). This returns an error if the JSON contains keys not present in your struct, useful for strict API validation.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the difference between encoding/json, easyjson, jsoniter, and sonic?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'encoding/json is the standard library, safe and correct. easyjson generates code at compile time for maximum speed. jsoniter is a drop-in replacement that is ~3x faster. sonic (ByteDance) uses SIMD instructions for ~6-10x speed on amd64. Use encoding/json unless performance is a bottleneck.',
        },
      },
    ],
  };

  const codeStyle = {
    background: '#1e293b',
    color: '#e2e8f0',
    padding: '1rem',
    borderRadius: '6px',
    overflowX: 'auto' as const,
    fontSize: '0.875rem',
    lineHeight: '1.6',
    margin: '0.75rem 0 1.25rem 0',
  };

  const h2Style = {
    fontSize: '1.5rem',
    fontWeight: '700' as const,
    marginTop: '2rem',
    marginBottom: '1rem',
    color: '#1e293b',
  };

  const h3Style = {
    fontSize: '1.15rem',
    fontWeight: '600' as const,
    marginTop: '1.25rem',
    marginBottom: '0.5rem',
    color: '#1e293b',
  };

  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse' as const,
    fontSize: '0.9rem',
    margin: '1rem 0 1.5rem 0',
  };

  const thStyle = {
    background: '#f1f5f9',
    border: '1px solid #e2e8f0',
    padding: '0.5rem 0.75rem',
    textAlign: 'left' as const,
    fontWeight: '600' as const,
    color: '#1e293b',
  };

  const tdStyle = {
    border: '1px solid #e2e8f0',
    padding: '0.5rem 0.75rem',
    verticalAlign: 'top' as const,
    color: '#334155',
  };

  return (
    <article style={{ maxWidth: '820px', lineHeight: '1.75', color: '#334155' }}>
      {/* FAQPage JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Canonical link hint (meta handled by parent layout) */}
      {/* https://viadreams.cc/en/blog/json-to-go-online-guide */}

      {/* TL;DR Box */}
      <div style={{ background: '#f0f9ff', border: '1px solid #bae6fd', borderRadius: '8px', padding: '1rem', marginBottom: '1.5rem' }}>
        <strong style={{ display: 'block', marginBottom: '0.4rem', color: '#0369a1' }}>TL;DR</strong>
        <p style={{ margin: 0 }}>
          Convert JSON to Go structs using <code>encoding/json</code> struct tags, pointer types for nullable fields,
          and <code>json.Decoder</code> for HTTP streaming. Define exported fields with <code>`json:"name"`</code> tags,
          use <code>*T</code> for optional values, and implement <code>UnmarshalJSON</code> for custom types like dates.
          For high-throughput services, replace <code>encoding/json</code> with <strong>jsoniter</strong> or <strong>sonic</strong> with zero code changes.
        </p>
      </div>

      {/* ── Section 1: Why Use Go Structs ── */}
      <h2 style={h2Style}>1. Why Use Go Structs for JSON?</h2>
      <p>
        Go is statically typed. When you reach for <code>map[string]interface{'{}'}</code> to handle JSON you trade
        compile-time safety for tedious type assertions and runtime panics. Proper struct definitions give you IDE
        autocompletion, exhaustive refactoring, and zero-overhead marshaling via reflection cache.
      </p>

      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>Approach</th>
            <th style={thStyle}>Type Safety</th>
            <th style={thStyle}>IDE Support</th>
            <th style={thStyle}>Performance</th>
            <th style={thStyle}>Maintainability</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={tdStyle}><strong>Go Struct</strong></td>
            <td style={{ ...tdStyle, color: '#16a34a' }}>Compile-time</td>
            <td style={{ ...tdStyle, color: '#16a34a' }}>Full autocomplete</td>
            <td style={{ ...tdStyle, color: '#16a34a' }}>Fast (cached reflection)</td>
            <td style={{ ...tdStyle, color: '#16a34a' }}>High — refactor-safe</td>
          </tr>
          <tr>
            <td style={tdStyle}><code>map[string]interface{'{}'}</code></td>
            <td style={{ ...tdStyle, color: '#dc2626' }}>None — panics at runtime</td>
            <td style={{ ...tdStyle, color: '#dc2626' }}>No completion</td>
            <td style={{ ...tdStyle, color: '#ca8a04' }}>Moderate</td>
            <td style={{ ...tdStyle, color: '#dc2626' }}>Low — string keys</td>
          </tr>
          <tr>
            <td style={tdStyle}><code>json.RawMessage</code></td>
            <td style={{ ...tdStyle, color: '#ca8a04' }}>Deferred only</td>
            <td style={{ ...tdStyle, color: '#ca8a04' }}>Partial</td>
            <td style={{ ...tdStyle, color: '#16a34a' }}>Fastest (skip parse)</td>
            <td style={{ ...tdStyle, color: '#ca8a04' }}>Medium — delayed decode</td>
          </tr>
        </tbody>
      </table>

      {/* ── Section 2: Basic json.Unmarshal ── */}
      <h2 style={h2Style}>2. Basic json.Unmarshal and json.Marshal</h2>
      <p>
        The <code>encoding/json</code> package is in the Go standard library — no dependencies needed.
        Struct fields must be <strong>exported</strong> (uppercase) and annotated with a <code>`json:"..."`</code> tag.
      </p>

      <h3 style={h3Style}>Defining the struct and unmarshaling</h3>
      <pre style={codeStyle}><code>{`package main

import (
    "encoding/json"
    "fmt"
    "log"
    "time"
)

// Exported fields + json tags are required for encoding/json to see them.
type User struct {
    ID        int       \`json:"id"\`
    Name      string    \`json:"name"\`
    Email     string    \`json:"email"\`
    Active    bool      \`json:"active"\`
    Score     float64   \`json:"score"\`
    CreatedAt time.Time \`json:"created_at"\`
}

func main() {
    data := []byte(\`{
        "id": 42,
        "name": "Alice",
        "email": "alice@example.com",
        "active": true,
        "score": 98.6,
        "created_at": "2026-01-15T09:00:00Z"
    }\`)

    var user User
    if err := json.Unmarshal(data, &user); err != nil {
        log.Fatal(err)
    }
    fmt.Printf("User: %s (%.1f)\\n", user.Name, user.Score)
    // User: Alice (98.6)
}`}</code></pre>

      <h3 style={h3Style}>Encoding (Marshal) back to JSON</h3>
      <pre style={codeStyle}><code>{`// Compact JSON
out, err := json.Marshal(user)
// {"id":42,"name":"Alice","email":"alice@example.com","active":true,"score":98.6,"created_at":"2026-01-15T09:00:00Z"}

// Pretty-printed JSON
out, err = json.MarshalIndent(user, "", "  ")
// {
//   "id": 42,
//   "name": "Alice",
//   ...
// }

// Write JSON directly to an http.ResponseWriter (no intermediate buffer)
func writeJSON(w http.ResponseWriter, v any) error {
    w.Header().Set("Content-Type", "application/json")
    return json.NewEncoder(w).Encode(v)
}`}</code></pre>

      <h3 style={h3Style}>Error handling best practice</h3>
      <pre style={codeStyle}><code>{`func parseUser(data []byte) (*User, error) {
    var u User
    if err := json.Unmarshal(data, &u); err != nil {
        return nil, fmt.Errorf("parseUser: %w", err)
    }
    if u.Name == "" {
        return nil, fmt.Errorf("parseUser: name is required")
    }
    return &u, nil
}`}</code></pre>

      {/* ── Section 3: JSON Tags ── */}
      <h2 style={h2Style}>3. JSON Struct Tags</h2>
      <p>
        Tags are raw string literals of the form <code>`json:"key,options"`</code>.
        They sit after the field type, surrounded by backticks.
      </p>

      <pre style={codeStyle}><code>{`type Product struct {
    // Map Go CamelCase to JSON snake_case
    ProductID   int     \`json:"product_id"\`

    // omitempty: skip field in output when zero-value ("", 0, false, nil)
    Description string  \`json:"description,omitempty"\`

    // "-": always exclude this field from JSON (passwords, internals)
    InternalRef string  \`json:"-"\`

    // "string": encode number as a quoted JSON string
    // Useful for JavaScript Number precision (int64 > 2^53)
    BigID       int64   \`json:"big_id,string"\`

    // No tag: uses the exact Go field name ("Type")
    Type        string
}

// Combined options: snake_case key + omitempty
type Event struct {
    StartedAt *time.Time \`json:"started_at,omitempty"\` // null or absent → omit
    EndedAt   *time.Time \`json:"ended_at,omitempty"\`
}`}</code></pre>

      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>Tag Option</th>
            <th style={thStyle}>Effect on Marshal</th>
            <th style={thStyle}>Effect on Unmarshal</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={tdStyle}><code>`json:"key"`</code></td>
            <td style={tdStyle}>Output key is <em>key</em></td>
            <td style={tdStyle}>Reads from JSON field <em>key</em></td>
          </tr>
          <tr>
            <td style={tdStyle}><code>`,omitempty`</code></td>
            <td style={tdStyle}>Skip if zero-value</td>
            <td style={tdStyle}>No effect</td>
          </tr>
          <tr>
            <td style={tdStyle}><code>`json:"-"`</code></td>
            <td style={tdStyle}>Always excluded</td>
            <td style={tdStyle}>Always ignored</td>
          </tr>
          <tr>
            <td style={tdStyle}><code>`,string`</code></td>
            <td style={tdStyle}>Number as quoted string</td>
            <td style={tdStyle}>Expects quoted string</td>
          </tr>
        </tbody>
      </table>

      {/* ── Section 4: Nested Structs and Arrays ── */}
      <h2 style={h2Style}>4. Nested Structs, Arrays, and Maps</h2>
      <p>
        Nest structs for JSON objects, use slices for JSON arrays, and maps for
        dictionary-like objects with dynamic keys.
      </p>

      <pre style={codeStyle}><code>{`// JSON:
// {
//   "id": 1,
//   "customer": { "name": "Alice", "address": { "city": "NYC", "zip": "10001" } },
//   "items": [{ "sku": "ABC", "qty": 2, "price": 9.99 }],
//   "tags": ["urgent", "vip"],
//   "meta": { "source": "web", "campaign": "summer" }
// }

type Order struct {
    ID       int               \`json:"id"\`
    Customer Customer          \`json:"customer"\`       // nested struct
    Items    []LineItem        \`json:"items"\`          // slice of structs
    Tags     []string          \`json:"tags"\`           // slice of primitives
    Meta     map[string]string \`json:"meta,omitempty"\` // map with string values
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

type LineItem struct {
    SKU      string  \`json:"sku"\`
    Quantity int     \`json:"qty"\`
    Price    float64 \`json:"price"\`
}

// Decode the whole nested tree at once:
var order Order
json.Unmarshal(data, &order)
fmt.Println(order.Customer.Address.City) // NYC
fmt.Println(order.Items[0].SKU)          // ABC`}</code></pre>

      <h3 style={h3Style}>Pointer fields for optional nested objects</h3>
      <pre style={codeStyle}><code>{`// If "shipping" may be absent from JSON:
type Order struct {
    ID       int       \`json:"id"\`
    Shipping *Address  \`json:"shipping,omitempty"\` // nil if absent/null
}

// Check before access:
if order.Shipping != nil {
    fmt.Println(order.Shipping.City)
}`}</code></pre>

      {/* ── Section 5: Optional Fields with Pointers ── */}
      <h2 style={h2Style}>5. Optional Fields with Pointer Types</h2>
      <p>
        In Go there is no concept of &quot;undefined&quot;. A <code>string</code> field missing from JSON
        gets the zero value <code>""</code> — indistinguishable from an empty string that was explicitly set.
        Use <code>*string</code>, <code>*int</code>, etc. to distinguish <em>absent</em> from <em>zero</em>.
      </p>

      <pre style={codeStyle}><code>{`// JSON variants:
// { "id": 1, "name": "Alice", "bio": null }  → bio is explicitly null
// { "id": 2, "name": "Bob" }                 → bio is absent
// { "id": 3, "name": "Carol", "bio": "Dev" } → bio has a value

type UserProfile struct {
    ID   int     \`json:"id"\`
    Name string  \`json:"name"\`
    Bio  *string \`json:"bio"\`              // nil for both null and absent
    Age  *int    \`json:"age,omitempty"\`    // omit entirely when nil
}

// Safe access pattern:
func displayBio(u UserProfile) string {
    if u.Bio != nil {
        return *u.Bio
    }
    return "(no bio)"
}

// Setting a pointer field:
bio := "Senior Gopher"
u := UserProfile{ID: 1, Name: "Alice", Bio: &bio}

// Helper to get a pointer to any value (Go 1.18+ generic):
func ptr[T any](v T) *T { return &v }

u2 := UserProfile{ID: 2, Name: "Bob", Bio: ptr("Backend Dev"), Age: ptr(30)}`}</code></pre>

      {/* ── Section 6: Custom UnmarshalJSON ── */}
      <h2 style={h2Style}>6. Custom UnmarshalJSON — Parsing Dates and Mixed Types</h2>
      <p>
        Implement the <code>json.Unmarshaler</code> interface (<code>UnmarshalJSON([]byte) error</code>) to
        control how a type is decoded. The reciprocal <code>json.Marshaler</code> interface controls encoding.
      </p>

      <h3 style={h3Style}>Custom date format (YYYY-MM-DD)</h3>
      <pre style={codeStyle}><code>{`// time.Time uses RFC3339 by default ("2006-01-02T15:04:05Z07:00")
// To parse plain dates like "2006-01-02":

type Date struct{ time.Time }

func (d *Date) UnmarshalJSON(b []byte) error {
    var s string
    if err := json.Unmarshal(b, &s); err != nil {
        return err
    }
    t, err := time.Parse("2006-01-02", s)
    if err != nil {
        return fmt.Errorf("Date.UnmarshalJSON: %w", err)
    }
    d.Time = t
    return nil
}

func (d Date) MarshalJSON() ([]byte, error) {
    return json.Marshal(d.Format("2006-01-02"))
}

type Subscription struct {
    UserID    int  \`json:"user_id"\`
    StartDate Date \`json:"start_date"\` // parses "2026-01-15"
    EndDate   Date \`json:"end_date"\`
}`}</code></pre>

      <h3 style={h3Style}>Mixed-type / discriminated union fields</h3>
      <pre style={codeStyle}><code>{`// JSON: { "type": "user", "data": { "name": "Alice" } }
//   or: { "type": "product", "data": { "sku": "ABC" } }

type Envelope struct {
    Type string          \`json:"type"\`
    Data json.RawMessage \`json:"data"\` // delay decode until type is known
}

func (e *Envelope) Decode() (any, error) {
    switch e.Type {
    case "user":
        var u User
        return &u, json.Unmarshal(e.Data, &u)
    case "product":
        var p Product
        return &p, json.Unmarshal(e.Data, &p)
    default:
        return nil, fmt.Errorf("unknown type: %s", e.Type)
    }
}`}</code></pre>

      {/* ── Section 7: json.Decoder for Streaming ── */}
      <h2 style={h2Style}>7. json.Decoder for Streaming Large JSON</h2>
      <p>
        <code>json.NewDecoder</code> wraps any <code>io.Reader</code> and streams data
        without loading everything into memory. This is the idiomatic approach for HTTP handlers.
      </p>

      <h3 style={h3Style}>Decode a single object from HTTP body</h3>
      <pre style={codeStyle}><code>{`func createUser(w http.ResponseWriter, r *http.Request) {
    dec := json.NewDecoder(r.Body)
    dec.DisallowUnknownFields() // reject unexpected keys

    var u User
    if err := dec.Decode(&u); err != nil {
        http.Error(w, err.Error(), http.StatusBadRequest)
        return
    }
    // u is now populated
    w.WriteHeader(http.StatusCreated)
    json.NewEncoder(w).Encode(u)
}`}</code></pre>

      <h3 style={h3Style}>Stream a large JSON array line by line</h3>
      <pre style={codeStyle}><code>{`// Process millions of JSON objects from a file without loading all into memory:
func streamUsers(r io.Reader) error {
    dec := json.NewDecoder(r)

    // Read opening '['
    if _, err := dec.Token(); err != nil {
        return err
    }

    for dec.More() {
        var u User
        if err := dec.Decode(&u); err != nil {
            return err
        }
        process(u) // handle each user without keeping all in memory
    }

    // Read closing ']'
    _, err := dec.Token()
    return err
}`}</code></pre>

      <h3 style={h3Style}>DisallowUnknownFields for strict validation</h3>
      <pre style={codeStyle}><code>{`// By default, extra JSON keys are silently ignored.
// Use DisallowUnknownFields to error on unexpected keys:

dec := json.NewDecoder(r.Body)
dec.DisallowUnknownFields()

var payload CreateUserRequest
if err := dec.Decode(&payload); err != nil {
    // err will mention "unknown field \\"extraKey\\"" if present
    http.Error(w, "invalid request: "+err.Error(), http.StatusBadRequest)
    return
}`}</code></pre>

      {/* ── Section 8: Struct Tags with Validation ── */}
      <h2 style={h2Style}>8. Struct Tags with go-playground/validator</h2>
      <p>
        Combine <code>json</code> tags with <code>validate</code> tags from the popular
        <code> github.com/go-playground/validator/v10</code> library to add input validation without
        separate validation logic.
      </p>

      <pre style={codeStyle}><code>{`// go get github.com/go-playground/validator/v10

import "github.com/go-playground/validator/v10"

type CreateUserRequest struct {
    Name     string \`json:"name"     validate:"required,min=2,max=100"\`
    Email    string \`json:"email"    validate:"required,email"\`
    Age      int    \`json:"age"      validate:"gte=0,lte=130"\`
    Role     string \`json:"role"     validate:"oneof=admin user viewer"\`
    Password string \`json:"password" validate:"required,min=8"\`
}

var validate = validator.New()

func createUserHandler(w http.ResponseWriter, r *http.Request) {
    var req CreateUserRequest
    if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
        http.Error(w, "bad JSON: "+err.Error(), http.StatusBadRequest)
        return
    }

    if err := validate.Struct(req); err != nil {
        // Returns structured validation errors
        errs := err.(validator.ValidationErrors)
        http.Error(w, errs.Error(), http.StatusUnprocessableEntity)
        return
    }

    // req is valid, proceed
}`}</code></pre>

      <h3 style={h3Style}>Common validator tags</h3>
      <pre style={codeStyle}><code>{`Name     string \`validate:"required,min=2,max=100"\`     // non-empty, length 2-100
Email    string \`validate:"required,email"\`              // RFC 5322 email format
Age      int    \`validate:"gte=0,lte=130"\`               // 0 ≤ age ≤ 130
URL      string \`validate:"url"\`                         // valid URL
UUID     string \`validate:"uuid4"\`                       // UUID v4 format
OneOf    string \`validate:"oneof=red green blue"\`        // enum check
Nested   *Inner \`validate:"required"\`                    // non-nil pointer`}</code></pre>

      {/* ── Section 9: Go 1.21+ encoding/json/v2 ── */}
      <h2 style={h2Style}>9. Go 1.21+ and the Upcoming encoding/json/v2</h2>
      <p>
        The Go team is developing <code>encoding/json/v2</code> (tracked in
        <code> golang.org/x/exp/jsonv2</code>) with several long-requested improvements.
        It is not yet stable but worth knowing about.
      </p>

      <pre style={codeStyle}><code>{`// Key improvements in encoding/json/v2 (experimental as of 2026):
//
// 1. omitzero: omit fields when they are the zero value of their type
//    (different from omitempty which uses interface-based zero check)
type Config struct {
    Timeout int \`json:",omitzero"\` // omit when Timeout == 0
}
//
// 2. Better error messages with field path info:
//    json: cannot unmarshal string into Go struct field User.age of type int
//    (previously just "cannot unmarshal")
//
// 3. Strict mode: unknown fields are errors by default
//    (flip of current behavior)
//
// 4. Deterministic map ordering (sorted keys)
//
// 5. Support for encoding.TextMarshaler on map keys
//
// Migration: the v2 API is largely compatible with v1.
// Change the import path and fix any breaking changes.`}</code></pre>

      {/* ── Section 10: Popular Libraries Comparison ── */}
      <h2 style={h2Style}>10. Popular JSON Libraries Comparison</h2>
      <p>
        <code>encoding/json</code> is correct and battle-tested. Switch to a faster library only when
        JSON parsing is a proven bottleneck in your profiler.
      </p>

      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>Library</th>
            <th style={thStyle}>Speed vs std</th>
            <th style={thStyle}>Key Feature</th>
            <th style={thStyle}>Best Use Case</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={tdStyle}><strong>encoding/json</strong></td>
            <td style={tdStyle}>Baseline (1x)</td>
            <td style={tdStyle}>Zero dependencies, stdlib</td>
            <td style={tdStyle}>Default for all Go projects</td>
          </tr>
          <tr>
            <td style={tdStyle}><strong>easyjson</strong></td>
            <td style={tdStyle}>~3–5x faster</td>
            <td style={tdStyle}>Code generation (no reflection)</td>
            <td style={tdStyle}>High-throughput APIs, fixed schemas</td>
          </tr>
          <tr>
            <td style={tdStyle}><strong>jsoniter</strong></td>
            <td style={tdStyle}>~2–3x faster</td>
            <td style={tdStyle}>Drop-in replacement (<code>import jsoniter "github.com/json-iterator/go"</code>)</td>
            <td style={tdStyle}>Performance upgrade with no refactoring</td>
          </tr>
          <tr>
            <td style={tdStyle}><strong>sonic</strong></td>
            <td style={tdStyle}>~6–10x faster</td>
            <td style={tdStyle}>SIMD JIT (amd64 only)</td>
            <td style={tdStyle}>Ultra-high throughput, Bytedance-scale</td>
          </tr>
        </tbody>
      </table>

      <pre style={codeStyle}><code>{`// Drop-in replacement with jsoniter (same API as encoding/json):
import jsoniter "github.com/json-iterator/go"

var json = jsoniter.ConfigCompatibleWithStandardLibrary

// Now use json.Marshal / json.Unmarshal / json.NewDecoder as before.
// No other code changes needed.`}</code></pre>

      {/* ── Section 11: HTTP API with JSON ── */}
      <h2 style={h2Style}>11. HTTP API with JSON — Full Pattern</h2>
      <p>
        The idiomatic Go pattern for JSON APIs uses <code>json.NewDecoder</code> for reading
        request bodies and <code>json.NewEncoder</code> for writing responses — both streaming
        without intermediate byte slices.
      </p>

      <h3 style={h3Style}>GET — fetch and decode JSON</h3>
      <pre style={codeStyle}><code>{`package main

import (
    "encoding/json"
    "fmt"
    "net/http"
    "time"
)

type GitHubUser struct {
    Login     string    \`json:"login"\`
    ID        int       \`json:"id"\`
    Name      string    \`json:"name"\`
    CreatedAt time.Time \`json:"created_at"\`
}

func fetchGitHubUser(username string) (*GitHubUser, error) {
    url := "https://api.github.com/users/" + username
    resp, err := http.Get(url)
    if err != nil {
        return nil, fmt.Errorf("GET %s: %w", url, err)
    }
    defer resp.Body.Close()

    if resp.StatusCode != http.StatusOK {
        return nil, fmt.Errorf("unexpected status: %d", resp.StatusCode)
    }

    var user GitHubUser
    if err := json.NewDecoder(resp.Body).Decode(&user); err != nil {
        return nil, fmt.Errorf("decode response: %w", err)
    }
    return &user, nil
}`}</code></pre>

      <h3 style={h3Style}>POST — encode and send JSON</h3>
      <pre style={codeStyle}><code>{`import (
    "bytes"
    "encoding/json"
    "fmt"
    "net/http"
)

type CreateUserReq struct {
    Name  string \`json:"name"\`
    Email string \`json:"email"\`
}

type CreateUserResp struct {
    ID   int    \`json:"id"\`
    Name string \`json:"name"\`
}

func createUser(baseURL string, req CreateUserReq) (*CreateUserResp, error) {
    var buf bytes.Buffer
    if err := json.NewEncoder(&buf).Encode(req); err != nil {
        return nil, err
    }

    resp, err := http.Post(baseURL+"/users", "application/json", &buf)
    if err != nil {
        return nil, err
    }
    defer resp.Body.Close()

    var result CreateUserResp
    if err := json.NewDecoder(resp.Body).Decode(&result); err != nil {
        return nil, fmt.Errorf("decode response: %w", err)
    }
    return &result, nil
}`}</code></pre>

      <h3 style={h3Style}>Full HTTP handler with validation</h3>
      <pre style={codeStyle}><code>{`// GET /users/:id — respond with JSON
func getUser(w http.ResponseWriter, r *http.Request) {
    id := r.PathValue("id") // Go 1.22+

    user, err := db.FindUser(id)
    if err != nil {
        writeError(w, http.StatusNotFound, "user not found")
        return
    }

    w.Header().Set("Content-Type", "application/json")
    json.NewEncoder(w).Encode(user)
}

// POST /users — accept JSON body
func postUser(w http.ResponseWriter, r *http.Request) {
    if r.Header.Get("Content-Type") != "application/json" {
        writeError(w, http.StatusUnsupportedMediaType, "Content-Type must be application/json")
        return
    }

    dec := json.NewDecoder(r.Body)
    dec.DisallowUnknownFields()

    var req CreateUserReq
    if err := dec.Decode(&req); err != nil {
        writeError(w, http.StatusBadRequest, err.Error())
        return
    }

    user, err := db.CreateUser(req)
    if err != nil {
        writeError(w, http.StatusInternalServerError, "could not create user")
        return
    }

    w.Header().Set("Content-Type", "application/json")
    w.WriteHeader(http.StatusCreated)
    json.NewEncoder(w).Encode(user)
}

func writeError(w http.ResponseWriter, code int, msg string) {
    w.Header().Set("Content-Type", "application/json")
    w.WriteHeader(code)
    json.NewEncoder(w).Encode(map[string]string{"error": msg})
}`}</code></pre>

      {/* ── Section 12: Common Pitfalls ── */}
      <h2 style={h2Style}>12. Common Pitfalls</h2>

      <h3 style={h3Style}>1. Unexported fields are silently ignored</h3>
      <pre style={codeStyle}><code>{`// ❌ Wrong — fields start with lowercase, invisible to encoding/json
type user struct {
    id   int
    name string
}
data, _ := json.Marshal(user{id: 1, name: "Alice"})
// Output: {}  ← empty!

// ✅ Correct — exported fields with json tags
type User struct {
    ID   int    \`json:"id"\`
    Name string \`json:"name"\`
}
data, _ = json.Marshal(User{ID: 1, Name: "Alice"})
// Output: {"id":1,"name":"Alice"}`}</code></pre>

      <h3 style={h3Style}>2. JSON numbers become float64 in interface{'{}'}</h3>
      <pre style={codeStyle}><code>{`var m map[string]interface{}
json.Unmarshal([]byte(\`{"count": 42}\`), &m)

// ❌ Panics — it's float64, not int!
count := m["count"].(int)

// ✅ Correct type assertion
count := int(m["count"].(float64))

// ✅ Better: use json.Number to preserve original representation
dec := json.NewDecoder(strings.NewReader(\`{"count": 42}\`))
dec.UseNumber()
dec.Decode(&m)
n, _ := m["count"].(json.Number).Int64() // 42 exactly`}</code></pre>

      <h3 style={h3Style}>3. Date format gotchas</h3>
      <pre style={codeStyle}><code>{`// ❌ time.Time only parses RFC3339 by default
// JSON: { "date": "2026-01-15" }  ← no time component
var s struct{ Date time.Time \`json:"date"\` }
json.Unmarshal(data, &s) // ERROR: cannot parse "2026-01-15" as RFC3339

// ✅ Use a custom Date type (see Section 6)
// OR use a string and parse manually:
var s2 struct{ Date string \`json:"date"\` }
json.Unmarshal(data, &s2)
t, _ := time.Parse("2006-01-02", s2.Date)`}</code></pre>

      <h3 style={h3Style}>4. Nil slice vs empty array</h3>
      <pre style={codeStyle}><code>{`// nil slice marshals as JSON null
var items []string         // nil
json.Marshal(items)        // null

// Initialized empty slice marshals as []
items = make([]string, 0)
json.Marshal(items)        // []

// This matters when your frontend expects an array, not null:
type Response struct {
    Items []string \`json:"items"\`
}
// Always initialize: Items: make([]string, 0)`}</code></pre>

      <h3 style={h3Style}>5. Circular references cause infinite loop</h3>
      <pre style={codeStyle}><code>{`// ❌ Circular reference — json.Marshal will panic with stack overflow
type Node struct {
    Value    int
    Children []*Node \`json:"children"\`
    Parent   *Node   \`json:"parent"\` // points back → cycle!
}

// ✅ Exclude back-references with json:"-"
type Node struct {
    Value    int
    Children []*Node \`json:"children"\`
    Parent   *Node   \`json:"-"\`        // excluded from JSON
}`}</code></pre>

      {/* ── FAQ ── */}
      <h2 style={h2Style}>Frequently Asked Questions</h2>

      <div style={{ marginBottom: '1.25rem' }}>
        <h3 style={h3Style}>How do I convert JSON to Go struct online?</h3>
        <p style={{ margin: 0 }}>
          Use DevToolBox&apos;s JSON to Go converter — paste your JSON and get idiomatic Go struct definitions
          with json tags, pointer types for nullable fields, and proper Go naming conventions instantly.
          It handles nested objects, arrays, and mixed types automatically.
        </p>
      </div>

      <div style={{ marginBottom: '1.25rem' }}>
        <h3 style={h3Style}>Should I use json.Unmarshal or json.NewDecoder?</h3>
        <p style={{ margin: 0 }}>
          Use <code>json.NewDecoder(r.Body).Decode(&amp;v)</code> for HTTP request/response bodies — it streams
          without buffering all bytes. Use <code>json.Unmarshal(data, &amp;v)</code> when you already have
          a <code>[]byte</code> in memory (e.g. from a database or file).
        </p>
      </div>

      <div style={{ marginBottom: '1.25rem' }}>
        <h3 style={h3Style}>How do I handle nullable JSON fields in Go?</h3>
        <p style={{ margin: 0 }}>
          Use pointer types: <code>*string</code>, <code>*int</code>, <code>*bool</code>. A nil pointer
          marshals to JSON <code>null</code>. Always check for nil before dereferencing:
          <code> if u.Bio != nil {'{'} use *u.Bio {'}'}</code>.
        </p>
      </div>

      <div style={{ marginBottom: '1.25rem' }}>
        <h3 style={h3Style}>What does omitempty do in a Go json tag?</h3>
        <p style={{ margin: 0 }}>
          <code>omitempty</code> omits the field from JSON output when it has its zero value — <code>""</code> for strings,
          <code> 0</code> for numbers, <code>false</code> for booleans, <code>nil</code> for pointers/slices/maps.
          Combine with a pointer: <code>*string `json:&quot;bio,omitempty&quot;`</code> to also omit null values.
        </p>
      </div>

      <div style={{ marginBottom: '1.25rem' }}>
        <h3 style={h3Style}>Why are struct fields missing from JSON output?</h3>
        <p style={{ margin: 0 }}>
          Fields must start with an uppercase letter to be exported. Lowercase (unexported) fields are
          silently ignored by <code>encoding/json</code>. Also verify you have not accidentally used
          the <code>`json:"-"`</code> tag which always excludes a field.
        </p>
      </div>

      <div style={{ marginBottom: '1.25rem' }}>
        <h3 style={h3Style}>How do I parse custom date formats in Go?</h3>
        <p style={{ margin: 0 }}>
          Create a custom type that embeds <code>time.Time</code> and implement <code>UnmarshalJSON</code>
          using <code>time.Parse(&quot;2006-01-02&quot;, s)</code>. Go&apos;s reference time is
          <code> Mon Jan 2 15:04:05 MST 2006</code> — use those exact values in your format string.
        </p>
      </div>

      <div style={{ marginBottom: '1.25rem' }}>
        <h3 style={h3Style}>How do I reject unknown JSON fields?</h3>
        <p style={{ margin: 0 }}>
          Use <code>dec.DisallowUnknownFields()</code> on a <code>json.Decoder</code>. By default,
          <code> encoding/json</code> silently ignores extra keys. Strict mode is useful for API handlers
          where unexpected fields may indicate a client bug or schema mismatch.
        </p>
      </div>

      <div style={{ marginBottom: '1.25rem' }}>
        <h3 style={h3Style}>Which JSON library is fastest in Go?</h3>
        <p style={{ margin: 0 }}>
          For amd64 workloads: <strong>sonic</strong> (ByteDance) is ~6-10x faster using SIMD JIT.
          <strong> jsoniter</strong> is a safe 2-3x improvement with zero code changes — just replace
          the import. <code>encoding/json</code> remains the best default unless JSON is a proven bottleneck.
        </p>
      </div>

      {/* Key Takeaways */}
      <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '1rem', marginTop: '2rem' }}>
        <strong style={{ display: 'block', marginBottom: '0.5rem', color: '#1e293b' }}>Key Takeaways</strong>
        <ul style={{ margin: 0, paddingLeft: '1.25rem', lineHeight: '1.9' }}>
          <li>Go struct fields must be <strong>exported</strong> (uppercase) to be visible to <code>encoding/json</code></li>
          <li>Use <code>`json:"field_name"`</code> tags to map Go names to JSON keys</li>
          <li>Use <code>`,omitempty`</code> to skip zero-value fields in JSON output</li>
          <li>Use <code>`json:"-"`</code> to permanently exclude sensitive fields</li>
          <li>Pointer types (<code>*string</code>, <code>*int</code>) model nullable / optional JSON fields</li>
          <li>Use <code>json.NewDecoder(r.Body)</code> for HTTP streams; <code>json.Unmarshal</code> for <code>[]byte</code></li>
          <li>Call <code>dec.DisallowUnknownFields()</code> for strict API validation</li>
          <li>Implement <code>UnmarshalJSON</code> / <code>MarshalJSON</code> for custom date formats and enums</li>
          <li>JSON numbers decode as <code>float64</code> into <code>interface{'{}'}</code> — use typed structs or <code>dec.UseNumber()</code></li>
          <li>Initialize slices with <code>make([]T, 0)</code> when the API must return <code>[]</code> not <code>null</code></li>
          <li>For high-throughput APIs, replace <code>encoding/json</code> with <strong>jsoniter</strong> or <strong>sonic</strong></li>
        </ul>
      </div>
    </article>
  );
}
