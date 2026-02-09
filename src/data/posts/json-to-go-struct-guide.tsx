import Link from 'next/link';

const t: Record<string, Record<string, string>> = {
  en: {
    intro: 'Go is a statically typed language, which means you need <strong>explicit struct definitions</strong> to work with JSON data. Unlike JavaScript or Python, you can\'t just parse JSON into a dynamic map and access properties freely. Understanding how to map JSON to Go structs is essential for building robust Go applications.',
    linkTool: 'Convert JSON to Go structs instantly with our free tool \u2192',
    h2Why: 'Why Go Needs Struct Definitions',
    whyDesc: 'Go\'s <code>encoding/json</code> package uses struct tags and reflection to marshal and unmarshal JSON. Without a proper struct definition, you\'re limited to <code>map[string]interface{}</code>, which loses type safety and requires runtime type assertions.',
    whyList: '<ul><li><strong>Type safety</strong> \u2014 the compiler catches type mismatches at build time</li><li><strong>Performance</strong> \u2014 struct access is significantly faster than map lookups</li><li><strong>Autocompletion</strong> \u2014 your editor knows the available fields and their types</li><li><strong>Documentation</strong> \u2014 struct definitions serve as self-documenting API contracts</li></ul>',
    h2Types: 'Type Mappings',
    typesDesc: 'JSON types map to Go types as follows:',
    typesTable: '<table><thead><tr><th>JSON Type</th><th>Go Type</th><th>Notes</th></tr></thead><tbody><tr><td>string</td><td><code>string</code></td><td>UTF-8 encoded</td></tr><tr><td>number (int)</td><td><code>int</code> / <code>int64</code></td><td>Use int64 for large values</td></tr><tr><td>number (float)</td><td><code>float64</code></td><td>Default for JSON numbers</td></tr><tr><td>boolean</td><td><code>bool</code></td><td></td></tr><tr><td>null</td><td><code>*T</code> (pointer)</td><td>nil when null</td></tr><tr><td>array</td><td><code>[]T</code></td><td>Slice of typed elements</td></tr><tr><td>object</td><td><code>struct</code></td><td>Named struct type</td></tr></tbody></table>',
    h2Tags: 'JSON Struct Tags',
    tagsDesc: 'Go uses struct field tags to control how JSON keys map to struct fields. The <code>json</code> tag is essential:',
    tagsNote: 'Field names in Go must be exported (capitalized) to be visible to the JSON package. The struct tag maps the exported Go name to the lowercase JSON key.',
    h2Omitempty: 'The omitempty Option',
    omitemptyDesc: 'The <code>omitempty</code> tag option tells the JSON encoder to skip fields with zero values when marshaling. This is critical for building flexible API payloads:',
    omitemptyNote: '<strong>Zero values by type:</strong> <code>""</code> for strings, <code>0</code> for numbers, <code>false</code> for bools, <code>nil</code> for pointers/slices/maps. Use pointers (<code>*int</code>, <code>*string</code>) when you need to distinguish between "not set" and "zero value".',
    h2Nested: 'Nested Structs',
    nestedDesc: 'Complex JSON with nested objects requires separate struct types for each level:',
    nestedNote: 'Tip: For deeply nested JSON, define each struct separately. Avoid anonymous structs for reusable sub-objects. Use inline anonymous structs only for one-off, non-reusable shapes.',
    h2Patterns: 'Common Patterns',
    patternsDesc: 'Here are patterns you\'ll frequently encounter when working with JSON in Go:',
    h2Tool: 'Automate the Conversion',
    toolDesc: 'Writing Go structs by hand from large JSON payloads is tedious. Our <strong>JSON to Go</strong> converter automatically generates properly tagged struct definitions from any JSON input \u2014 including nested objects, arrays, and optional fields.',
    linkToolBottom: 'Try the JSON to Go converter now \u2192',
  },
  zh: {
    intro: 'Go 是静态类型语言，这意味着你需要<strong>显式的结构体定义</strong>来处理 JSON 数据。与 JavaScript 或 Python 不同，你不能将 JSON 解析成动态 map 然后自由访问属性。理解如何将 JSON 映射到 Go 结构体对于构建健壮的 Go 应用至关重要。',
    linkTool: '使用我们的免费工具即时将 JSON 转换为 Go 结构体 \u2192',
    h2Why: '为什么 Go 需要结构体定义',
    whyDesc: 'Go 的 <code>encoding/json</code> 包使用结构体标签和反射来序列化和反序列化 JSON。没有正确的结构体定义，你只能使用 <code>map[string]interface{}</code>，这会失去类型安全并需要运行时类型断言。',
    whyList: '<ul><li><strong>类型安全</strong>——编译器在构建时捕获类型不匹配</li><li><strong>性能</strong>——结构体访问比 map 查找快得多</li><li><strong>自动补全</strong>——编辑器知道可用的字段及其类型</li><li><strong>文档化</strong>——结构体定义可作为自文档化的 API 契约</li></ul>',
    h2Types: '类型映射',
    typesDesc: 'JSON 类型与 Go 类型的映射如下：',
    typesTable: '<table><thead><tr><th>JSON 类型</th><th>Go 类型</th><th>备注</th></tr></thead><tbody><tr><td>string</td><td><code>string</code></td><td>UTF-8 编码</td></tr><tr><td>number (整数)</td><td><code>int</code> / <code>int64</code></td><td>大值使用 int64</td></tr><tr><td>number (浮点数)</td><td><code>float64</code></td><td>JSON 数字的默认类型</td></tr><tr><td>boolean</td><td><code>bool</code></td><td></td></tr><tr><td>null</td><td><code>*T</code> (指针)</td><td>null 时为 nil</td></tr><tr><td>array</td><td><code>[]T</code></td><td>类型化元素的切片</td></tr><tr><td>object</td><td><code>struct</code></td><td>命名结构体类型</td></tr></tbody></table>',
    h2Tags: 'JSON 结构体标签',
    tagsDesc: 'Go 使用结构体字段标签来控制 JSON 键如何映射到结构体字段。<code>json</code> 标签至关重要：',
    tagsNote: 'Go 中的字段名必须导出（首字母大写）才能被 JSON 包识别。结构体标签将导出的 Go 名称映射到小写的 JSON 键。',
    h2Omitempty: 'omitempty 选项',
    omitemptyDesc: '<code>omitempty</code> 标签选项告诉 JSON 编码器在序列化时跳过零值字段。这对构建灵活的 API 请求体至关重要：',
    omitemptyNote: '<strong>各类型的零值：</strong>字符串为 <code>""</code>，数字为 <code>0</code>，布尔为 <code>false</code>，指针/切片/映射为 <code>nil</code>。当需要区分"未设置"和"零值"时，使用指针（<code>*int</code>、<code>*string</code>）。',
    h2Nested: '嵌套结构体',
    nestedDesc: '包含嵌套对象的复杂 JSON 需要为每个层级定义单独的结构体类型：',
    nestedNote: '提示：对于深度嵌套的 JSON，分别定义每个结构体。避免对可复用的子对象使用匿名结构体。仅对一次性、不可复用的结构使用内联匿名结构体。',
    h2Patterns: '常见模式',
    patternsDesc: '以下是在 Go 中处理 JSON 时经常遇到的模式：',
    h2Tool: '自动化转换',
    toolDesc: '从大型 JSON 负载手动编写 Go 结构体非常繁琐。我们的 <strong>JSON to Go</strong> 转换器可以从任何 JSON 输入自动生成带有正确标签的结构体定义——包括嵌套对象、数组和可选字段。',
    linkToolBottom: '立即试用 JSON to Go 转换器 \u2192',
  },
};

export default function JsonToGoStructGuide({ lang }: { lang: string }) {
  const s = t[lang] || t['en'];

  return (
    <>
      <p dangerouslySetInnerHTML={{ __html: s.intro }} />

      <p>
        <Link href={`/${lang}/tools/json-to-go`} style={{ fontWeight: 600 }}>
          {s.linkTool}
        </Link>
      </p>

      <h2>{s.h2Why}</h2>
      <p dangerouslySetInnerHTML={{ __html: s.whyDesc }} />
      <div dangerouslySetInnerHTML={{ __html: s.whyList }} />

      <h2>{s.h2Types}</h2>
      <p>{s.typesDesc}</p>
      <div dangerouslySetInnerHTML={{ __html: s.typesTable }} />

      <h2>{s.h2Tags}</h2>
      <p dangerouslySetInnerHTML={{ __html: s.tagsDesc }} />

      <pre><code>{`// JSON
{
  "user_name": "alice",
  "email_address": "alice@example.com",
  "is_active": true,
  "login_count": 42
}

// Go struct
type User struct {
	UserName     string \`json:"user_name"\`
	EmailAddress string \`json:"email_address"\`
	IsActive     bool   \`json:"is_active"\`
	LoginCount   int    \`json:"login_count"\`
}`}</code></pre>

      <p>{s.tagsNote}</p>

      <h2 dangerouslySetInnerHTML={{ __html: s.h2Omitempty }} />
      <p dangerouslySetInnerHTML={{ __html: s.omitemptyDesc }} />

      <pre><code>{`type UpdateRequest struct {
	Name    string  \`json:"name,omitempty"\`
	Email   string  \`json:"email,omitempty"\`
	Age     *int    \`json:"age,omitempty"\`     // pointer: distinguish 0 from absent
	Bio     *string \`json:"bio,omitempty"\`     // pointer: distinguish "" from absent
}

// Only "name" appears in the output:
req := UpdateRequest{Name: "Alice"}
data, _ := json.Marshal(req)
// {"name":"Alice"}`}</code></pre>

      <p dangerouslySetInnerHTML={{ __html: s.omitemptyNote }} />

      <h2>{s.h2Nested}</h2>
      <p>{s.nestedDesc}</p>

      <pre><code>{`// JSON
{
  "id": 1,
  "name": "Alice",
  "company": {
    "name": "Acme Corp",
    "address": {
      "city": "Springfield",
      "country": "US"
    }
  },
  "skills": ["go", "rust", "python"]
}

// Go structs
type Address struct {
	City    string \`json:"city"\`
	Country string \`json:"country"\`
}

type Company struct {
	Name    string  \`json:"name"\`
	Address Address \`json:"address"\`
}

type User struct {
	ID      int      \`json:"id"\`
	Name    string   \`json:"name"\`
	Company Company  \`json:"company"\`
	Skills  []string \`json:"skills"\`
}`}</code></pre>

      <p><em>{s.nestedNote}</em></p>

      <h2>{s.h2Patterns}</h2>
      <p>{s.patternsDesc}</p>

      <pre><code>{`// Pattern 1: API response wrapper
type APIResponse[T any] struct {
	Data    T      \`json:"data"\`
	Message string \`json:"message"\`
	Status  int    \`json:"status"\`
}

// Pattern 2: Flexible field with json.RawMessage
type Event struct {
	Type    string          \`json:"type"\`
	Payload json.RawMessage \`json:"payload"\` // decode later based on Type
}

// Pattern 3: Custom JSON key with "-" to ignore
type Internal struct {
	PublicID  string \`json:"id"\`
	SecretKey string \`json:"-"\`  // never marshaled/unmarshaled
}

// Pattern 4: Unmarshal usage
var user User
err := json.Unmarshal([]byte(jsonString), &user)
if err != nil {
	log.Fatal(err)
}
fmt.Println(user.Name) // "Alice"`}</code></pre>

      <h2>{s.h2Tool}</h2>
      <p dangerouslySetInnerHTML={{ __html: s.toolDesc }} />

      <p>
        <Link href={`/${lang}/tools/json-to-go`} style={{ fontWeight: 600 }}>
          {s.linkToolBottom}
        </Link>
      </p>
    </>
  );
}
