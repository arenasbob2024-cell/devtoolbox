'use client';
import Link from 'next/link';

/* ------------------------------------------------------------------ */
/*  JSON to C# Class Online Guide                                       */
/* ------------------------------------------------------------------ */

export default function JsonToCsharpOnlineGuide({ lang }: { lang: string }) {
  const l = lang || 'en';
  const toolLink = `/${l}/tools/json-to-csharp`;

  /* ---------- translations ---------- */
  const translations: Record<string, {
    tldr: string;
    keyTakeaways: string[];
    intro: string;
  }> = {
    en: {
      tldr: 'Paste any JSON into the tool and instantly get strongly-typed C# classes with correct property names, nullable annotations, and support for System.Text.Json or Newtonsoft.Json. No installation required.',
      keyTakeaways: [
        'Use System.Text.Json (built-in to .NET 6+) for new projects; use Newtonsoft.Json for legacy compatibility.',
        'Prefer C# 9+ record types for immutable data transfer objects.',
        'Enable #nullable enable to catch null-reference bugs at compile time.',
        'Use [JsonPropertyName] to map snake_case JSON to PascalCase C# properties.',
        'For arrays, generate List<T> or T[] depending on whether you need mutability.',
        'Validate deserialized data with DataAnnotations or FluentValidation in ASP.NET Core.',
      ],
      intro: 'Working with JSON APIs in C# means converting raw JSON into strongly-typed classes so the compiler and IDE can catch bugs before they reach production. This guide covers every aspect of JSON-to-C# conversion: from basic POCOs and nullable reference types through record types, enums, custom converters, inheritance, and ASP.NET Core integration.',
    },
    zh: {
      tldr: '将任意 JSON 粘贴到工具中，即可立即获得带有正确属性名、可空注解的强类型 C# 类，支持 System.Text.Json 或 Newtonsoft.Json。无需安装。',
      keyTakeaways: [
        '新项目使用内置于 .NET 6+ 的 System.Text.Json；旧版兼容性使用 Newtonsoft.Json。',
        '对不可变数据传输对象，优先使用 C# 9+ 的 record 类型。',
        '启用 #nullable enable，在编译时捕获空引用错误。',
        '使用 [JsonPropertyName] 将 snake_case JSON 映射到 PascalCase C# 属性。',
        '对于数组，根据是否需要可变性生成 List<T> 或 T[]。',
        '在 ASP.NET Core 中使用 DataAnnotations 或 FluentValidation 验证反序列化数据。',
      ],
      intro: '在 C# 中处理 JSON API 意味着将原始 JSON 转换为强类型类，以便编译器和 IDE 在生产前捕获错误。本指南涵盖 JSON 到 C# 转换的各个方面：从基本 POCO 和可空引用类型，到 record 类型、枚举、自定义转换器、继承和 ASP.NET Core 集成。',
    },
  };

  const t = translations[l] || translations['en'];

  /* ---------- FAQ items ---------- */
  const faqItems = [
    {
      q: 'What is the difference between System.Text.Json and Newtonsoft.Json?',
      a: 'System.Text.Json is built into .NET Core 3.0+ and .NET 5+, offering better performance and lower allocations. Newtonsoft.Json (Json.NET) is a third-party library with richer features like LINQ to JSON, more flexible converters, and broader legacy support. For new projects on .NET 6+ use System.Text.Json; add Newtonsoft.Json only when you need features it lacks or must integrate with existing code.',
    },
    {
      q: 'How do I deserialize JSON with snake_case keys into PascalCase C# properties?',
      a: 'With System.Text.Json, set JsonSerializerOptions.PropertyNamingPolicy = JsonNamingPolicy.SnakeCaseLower (available from .NET 8) or use [JsonPropertyName("snake_case_key")] on each property. With Newtonsoft.Json, set ContractResolver = new DefaultContractResolver { NamingStrategy = new SnakeCaseNamingStrategy() } or use [JsonProperty("snake_case_key")] attributes.',
    },
    {
      q: 'Should I use C# records or classes for deserialized JSON?',
      a: 'Records (C# 9+) are ideal for immutable DTOs: they support positional constructors, init-only setters, and built-in value equality. Use records when data should not change after deserialization. Use classes when you need mutable state, inheritance hierarchies, or complex initialization logic. Both work with System.Text.Json and Newtonsoft.Json.',
    },
    {
      q: 'How do I handle nullable JSON fields in C#?',
      a: 'Enable nullable reference types with #nullable enable (or project-wide in .csproj). Mark optional JSON fields as nullable: string? for reference types and int? for value types. System.Text.Json respects nullable annotations and will set null for missing JSON keys. Use [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)] to omit null properties from serialized output.',
    },
    {
      q: 'How do I deserialize JSON arrays into C# collections?',
      a: 'System.Text.Json automatically deserializes JSON arrays into List<T>, T[], IEnumerable<T>, IList<T>, and IReadOnlyList<T>. Use List<T> for mutable collections and IReadOnlyList<T> or T[] for read-only data. For dictionaries, use Dictionary<string, T> which maps to JSON objects with dynamic keys. Nested arrays deserialize into List<List<T>> or T[][].',
    },
    {
      q: 'How do I serialize and deserialize C# enums as strings?',
      a: 'With System.Text.Json, add JsonStringEnumConverter to the converters list in JsonSerializerOptions, or use [JsonConverter(typeof(JsonStringEnumConverter))] on the enum property. This converts enum values to their string names. With Newtonsoft.Json, add StringEnumConverter to JsonSerializerSettings.Converters or use [JsonConverter(typeof(StringEnumConverter))] on the property.',
    },
    {
      q: 'How do I handle date and time values in JSON with C#?',
      a: 'System.Text.Json handles DateTime and DateTimeOffset as ISO 8601 strings by default. .NET 6 adds DateOnly and TimeOnly types which also serialize to ISO 8601. For Newtonsoft.Json, use IsoDateTimeConverter (default) or configure DateFormatString. To handle Unix timestamps, implement a custom JsonConverter<DateTimeOffset> that reads a long value and converts it with DateTimeOffset.FromUnixTimeSeconds().',
    },
    {
      q: 'How do I use the JSON to C# tool to generate classes for ASP.NET Core?',
      a: 'Paste your JSON into the tool, select System.Text.Json or Newtonsoft.Json mode, then copy the generated classes into your ASP.NET Core project. For model binding, place the class in a Models folder and reference it as the controller action parameter. For HttpClient deserialization, use GetFromJsonAsync<MyClass>() from the System.Net.Http.Json package. Add DataAnnotations attributes like [Required] and [Range] for automatic model validation.',
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

  /* ---------- code styles ---------- */
  const pre: React.CSSProperties = {
    background: '#1e293b',
    color: '#e2e8f0',
    padding: '16px 20px',
    borderRadius: 8,
    overflowX: 'auto',
    fontSize: 13.5,
    lineHeight: 1.65,
    marginBottom: 24,
  };

  const inlineCode: React.CSSProperties = {
    background: '#e0f2fe',
    padding: '1px 5px',
    borderRadius: 3,
    fontSize: '0.9em',
    fontFamily: 'monospace',
  };

  const h2: React.CSSProperties = {
    fontSize: 22,
    fontWeight: 700,
    marginTop: 40,
    marginBottom: 14,
    borderBottom: '2px solid #e2e8f0',
    paddingBottom: 6,
  };

  const h3: React.CSSProperties = {
    fontSize: 18,
    fontWeight: 700,
    marginTop: 28,
    marginBottom: 10,
  };

  const p: React.CSSProperties = {
    marginBottom: 16,
    lineHeight: 1.75,
  };

  const li: React.CSSProperties = {
    marginBottom: 6,
    lineHeight: 1.7,
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
            Try our free JSON to C# tool &rarr;
          </Link>
        </p>
      </div>

      {/* ---- Key Takeaways ---- */}
      <div style={{
        background: '#f8fafc',
        border: '1px solid #e2e8f0',
        borderRadius: 8,
        padding: '16px 20px',
        marginBottom: 32,
      }}>
        <p style={{ fontWeight: 700, fontSize: 16, marginBottom: 10, marginTop: 0 }}>Key Takeaways</p>
        <ul style={{ margin: 0, paddingLeft: 20 }}>
          {t.keyTakeaways.map((item, i) => (
            <li key={i} style={li}>{item}</li>
          ))}
        </ul>
      </div>

      {/* ---- Intro ---- */}
      <p style={p}>{t.intro}</p>

      {/* ================================================================ */}
      {/* 1. Why Generate C# Classes from JSON                             */}
      {/* ================================================================ */}
      <h2 style={h2}>Why Generate C# Classes from JSON</h2>
      <p style={p}>
        When you consume a REST API or read a JSON file in C#, you have two choices: work with
        dynamic types like <code style={inlineCode}>JObject</code> or
        <code style={inlineCode}>JsonElement</code>, or deserialize into strongly-typed classes.
        Strongly-typed classes win on every dimension that matters in production code:
      </p>
      <ul style={{ paddingLeft: 24, marginBottom: 20 }}>
        <li style={li}><strong>Compile-time safety</strong> — the C# compiler rejects typos in property names and wrong types.</li>
        <li style={li}><strong>IntelliSense and refactoring</strong> — Visual Studio, Rider, and VS Code can autocomplete, rename, and navigate.</li>
        <li style={li}><strong>Null-reference prevention</strong> — with nullable reference types enabled, the compiler warns about unhandled nulls.</li>
        <li style={li}><strong>Performance</strong> — <code style={inlineCode}>JsonSerializer.Deserialize&lt;T&gt;()</code> is faster than navigating a dynamic object graph at runtime.</li>
        <li style={li}><strong>Testability</strong> — you can create typed instances in unit tests without string parsing.</li>
        <li style={li}><strong>.NET 6+ source generators</strong> — System.Text.Json can generate serialization code at compile time for zero-reflection, AOT-compatible performance.</li>
      </ul>
      <p style={p}>
        Generating classes manually from a large JSON response is error-prone and tedious.
        The <Link href={toolLink} style={{ color: '#2563eb' }}>JSON to C# tool</Link> handles
        nested objects, arrays, optional fields, and naming conventions automatically.
      </p>

      {/* ================================================================ */}
      {/* 2. C# Class Structure from JSON (POCOs)                          */}
      {/* ================================================================ */}
      <h2 style={h2}>C# Class Structure from JSON: POCOs</h2>
      <p style={p}>
        A <strong>POCO</strong> (Plain Old CLR Object) is a class with public properties that match
        the JSON structure. Given this JSON:
      </p>
      <pre style={pre}><code>{`{
  "user_id": 42,
  "full_name": "Alice Smith",
  "email": "alice@example.com",
  "is_active": true,
  "created_at": "2024-01-15T08:30:00Z"
}`}</code></pre>
      <p style={p}>The corresponding POCO with System.Text.Json attributes:</p>
      <pre style={pre}><code>{`#nullable enable
using System;
using System.Text.Json.Serialization;

public class User
{
    [JsonPropertyName("user_id")]
    public int UserId { get; set; }

    [JsonPropertyName("full_name")]
    public string FullName { get; set; } = string.Empty;

    [JsonPropertyName("email")]
    public string Email { get; set; } = string.Empty;

    [JsonPropertyName("is_active")]
    public bool IsActive { get; set; }

    [JsonPropertyName("created_at")]
    public DateTimeOffset CreatedAt { get; set; }
}`}</code></pre>
      <p style={p}>
        The <code style={inlineCode}>[JsonPropertyName]</code> attribute maps the snake_case JSON key
        to the PascalCase C# property. The <code style={inlineCode}>string.Empty</code> default prevents
        nullable warnings for required string properties.
      </p>

      {/* ================================================================ */}
      {/* 3. System.Text.Json (.NET Core 3+)                               */}
      {/* ================================================================ */}
      <h2 style={h2}>System.Text.Json (.NET Core 3+)</h2>
      <p style={p}>
        <code style={inlineCode}>System.Text.Json</code> is Microsoft&apos;s built-in JSON library,
        available from .NET Core 3.0 onward and included by default in ASP.NET Core. It prioritizes
        performance and correctness over convenience.
      </p>

      <h3 style={h3}>Deserializing JSON</h3>
      <pre style={pre}><code>{`using System.Text.Json;

string json = await httpClient.GetStringAsync("https://api.example.com/users/42");
User? user = JsonSerializer.Deserialize<User>(json);

// Or directly from HttpClient (System.Net.Http.Json):
User? user2 = await httpClient.GetFromJsonAsync<User>("https://api.example.com/users/42");`}</code></pre>

      <h3 style={h3}>Serializing to JSON</h3>
      <pre style={pre}><code>{`var user = new User
{
    UserId = 42,
    FullName = "Alice Smith",
    Email = "alice@example.com",
    IsActive = true,
    CreatedAt = DateTimeOffset.UtcNow,
};

string json = JsonSerializer.Serialize(user);
// {"user_id":42,"full_name":"Alice Smith","email":"alice@example.com","is_active":true,"created_at":"2024-01-15T08:30:00+00:00"}`}</code></pre>

      <h3 style={h3}>JsonSerializerOptions</h3>
      <pre style={pre}><code>{`var options = new JsonSerializerOptions
{
    PropertyNamingPolicy = JsonNamingPolicy.CamelCase,       // camelCase output
    PropertyNameCaseInsensitive = true,                       // case-insensitive read
    WriteIndented = true,                                     // pretty print
    DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull, // omit nulls
    Converters = { new JsonStringEnumConverter() },           // enums as strings
};

string json = JsonSerializer.Serialize(user, options);
User? result = JsonSerializer.Deserialize<User>(json, options);`}</code></pre>

      <h3 style={h3}>Key Attributes</h3>
      <pre style={pre}><code>{`[JsonPropertyName("api_key")]     // map to specific JSON key name
[JsonIgnore]                       // never serialize/deserialize
[JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]  // omit if null
[JsonRequired]                     // throw if key missing (System.Text.Json in .NET 7+)
[JsonInclude]                      // include non-public members
[JsonConverter(typeof(MyConverter))] // custom converter`}</code></pre>

      {/* ================================================================ */}
      {/* 4. Newtonsoft.Json (Json.NET)                                    */}
      {/* ================================================================ */}
      <h2 style={h2}>Newtonsoft.Json (Json.NET)</h2>
      <p style={p}>
        <strong>Json.NET</strong> by James Newton-King has been the dominant C# JSON library for
        over a decade. It remains popular for its rich feature set: LINQ to JSON, flexible
        converters, and support for older .NET Framework versions.
      </p>

      <h3 style={h3}>Deserializing with Newtonsoft.Json</h3>
      <pre style={pre}><code>{`using Newtonsoft.Json;

string json = File.ReadAllText("data.json");

// Deserialize to typed class:
User? user = JsonConvert.DeserializeObject<User>(json);

// Dynamic / partial parsing with JObject:
JObject obj = JObject.Parse(json);
string? name = obj["full_name"]?.Value<string>();
int userId = (int)obj["user_id"]!;`}</code></pre>

      <h3 style={h3}>Newtonsoft.Json Attributes</h3>
      <pre style={pre}><code>{`using Newtonsoft.Json;

public class User
{
    [JsonProperty("user_id")]
    public int UserId { get; set; }

    [JsonProperty("full_name")]
    public string FullName { get; set; } = string.Empty;

    [JsonIgnore]
    public string InternalNote { get; set; } = string.Empty;

    [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
    public string? OptionalField { get; set; }
}`}</code></pre>

      <h3 style={h3}>JsonSerializerSettings</h3>
      <pre style={pre}><code>{`var settings = new JsonSerializerSettings
{
    ContractResolver = new CamelCasePropertyNamesContractResolver(),
    NullValueHandling = NullValueHandling.Ignore,
    DateTimeZoneHandling = DateTimeZoneHandling.Utc,
    Formatting = Formatting.Indented,
    Converters = { new StringEnumConverter() },
};

string json = JsonConvert.SerializeObject(user, settings);`}</code></pre>

      <h3 style={h3}>LINQ to JSON</h3>
      <pre style={pre}><code>{`// Build JSON dynamically without a typed class:
var jObject = new JObject
{
    ["name"] = "Alice",
    ["scores"] = new JArray(95, 87, 92),
    ["meta"] = new JObject { ["active"] = true },
};

// Query deeply nested JSON without deserializing:
JArray? items = JArray.Parse(json);
var names = items.Select(x => x["name"]?.ToString()).ToList();`}</code></pre>

      {/* ================================================================ */}
      {/* 5. Record Types (C# 9+)                                          */}
      {/* ================================================================ */}
      <h2 style={h2}>Record Types (C# 9+)</h2>
      <p style={p}>
        C# 9 introduced <strong>record types</strong>: reference types with value-based equality,
        a concise positional syntax, and init-only setters. They are ideal for immutable DTOs that
        represent deserialized JSON payloads.
      </p>

      <h3 style={h3}>Positional Record</h3>
      <pre style={pre}><code>{`// Concise positional syntax — compiler generates constructor and Deconstruct:
public record UserRecord(
    [property: JsonPropertyName("user_id")] int UserId,
    [property: JsonPropertyName("full_name")] string FullName,
    [property: JsonPropertyName("email")] string Email
);

// Works with System.Text.Json:
var user = JsonSerializer.Deserialize<UserRecord>(json);
Console.WriteLine(user?.FullName);`}</code></pre>

      <h3 style={h3}>Standard Record with Init Setters</h3>
      <pre style={pre}><code>{`public record UserRecord
{
    [JsonPropertyName("user_id")]
    public int UserId { get; init; }

    [JsonPropertyName("full_name")]
    public required string FullName { get; init; }   // required = C# 11

    [JsonPropertyName("email")]
    public required string Email { get; init; }
}

// Immutable — properties can only be set during construction:
var user = new UserRecord { UserId = 1, FullName = "Bob", Email = "bob@x.com" };

// Non-destructive mutation with 'with':
var updated = user with { Email = "bob@y.com" };`}</code></pre>

      <h3 style={h3}>Value Records (record struct, C# 10+)</h3>
      <pre style={pre}><code>{`// Stack-allocated, value equality, no heap allocation for small types:
public readonly record struct Point(double X, double Y);

var p = new Point(1.5, 2.5);
var q = new Point(1.5, 2.5);
Console.WriteLine(p == q); // true — value equality`}</code></pre>

      {/* ================================================================ */}
      {/* 6. Nullable Reference Types                                      */}
      {/* ================================================================ */}
      <h2 style={h2}>Nullable Reference Types and the required Keyword</h2>
      <p style={p}>
        Enabling nullable reference types (<code style={inlineCode}>#nullable enable</code> or
        project-wide via <code style={inlineCode}>&lt;Nullable&gt;enable&lt;/Nullable&gt;</code> in
        .csproj) turns null-safety into a compiler feature.
      </p>

      <pre style={pre}><code>{`#nullable enable

public class Product
{
    // Non-nullable — must always be present:
    public required string Name { get; init; }   // C# 11 required
    public decimal Price { get; set; }

    // Nullable — may be missing from JSON:
    public string? Description { get; set; }
    public string? ImageUrl { get; set; }

    // Nullable value type:
    public int? StockCount { get; set; }
}`}</code></pre>

      <p style={p}>
        The <code style={inlineCode}>required</code> keyword (C# 11, .NET 7+) enforces that a
        property is set during object initialization and that System.Text.Json throws
        <code style={inlineCode}>JsonException</code> if the JSON key is missing (when using
        <code style={inlineCode}>[JsonRequired]</code> in conjunction).
      </p>

      <h3 style={h3}>MaybeNull and NotNull Attributes</h3>
      <pre style={pre}><code>{`using System.Diagnostics.CodeAnalysis;

public class Repository
{
    // Tells compiler this method might return null even though return type is string:
    [return: MaybeNull]
    public string GetCachedValue(string key) => cache.TryGetValue(key, out var v) ? v : null!;

    // Tells compiler: after this method returns, parameter is not null:
    public void EnsureNotNull([NotNull] string? value)
    {
        if (value is null) throw new ArgumentNullException(nameof(value));
    }
}`}</code></pre>

      {/* ================================================================ */}
      {/* 7. Nested Classes and Arrays                                     */}
      {/* ================================================================ */}
      <h2 style={h2}>Nested Classes and Arrays</h2>
      <p style={p}>
        JSON objects nest naturally into C# nested classes, and JSON arrays become
        <code style={inlineCode}>List&lt;T&gt;</code>,{' '}
        <code style={inlineCode}>T[]</code>, or{' '}
        <code style={inlineCode}>IReadOnlyList&lt;T&gt;</code> properties.
      </p>
      <pre style={pre}><code>{`// JSON:
// {
//   "order_id": "ORD-001",
//   "customer": { "id": 5, "name": "Alice" },
//   "items": [
//     { "sku": "A1", "qty": 2, "price": 9.99 },
//     { "sku": "B2", "qty": 1, "price": 24.99 }
//   ],
//   "tags": ["urgent", "fragile"]
// }

public class Order
{
    [JsonPropertyName("order_id")]
    public string OrderId { get; set; } = string.Empty;

    [JsonPropertyName("customer")]
    public Customer Customer { get; set; } = new();

    [JsonPropertyName("items")]
    public List<OrderItem> Items { get; set; } = new();

    [JsonPropertyName("tags")]
    public IReadOnlyList<string> Tags { get; set; } = Array.Empty<string>();
}

public class Customer
{
    [JsonPropertyName("id")]
    public int Id { get; set; }

    [JsonPropertyName("name")]
    public string Name { get; set; } = string.Empty;
}

public class OrderItem
{
    [JsonPropertyName("sku")]
    public string Sku { get; set; } = string.Empty;

    [JsonPropertyName("qty")]
    public int Qty { get; set; }

    [JsonPropertyName("price")]
    public decimal Price { get; set; }
}`}</code></pre>

      <h3 style={h3}>Dictionary for Dynamic Keys</h3>
      <pre style={pre}><code>{`// JSON: { "scores": { "alice": 95, "bob": 87, "carol": 91 } }
public class ScoreBoard
{
    [JsonPropertyName("scores")]
    public Dictionary<string, int> Scores { get; set; } = new();
}

// Nested dictionary:
// { "matrix": { "row1": { "a": 1, "b": 2 } } }
public Dictionary<string, Dictionary<string, int>> Matrix { get; set; } = new();`}</code></pre>

      {/* ================================================================ */}
      {/* 8. Enums with JSON                                               */}
      {/* ================================================================ */}
      <h2 style={h2}>Enums with JSON</h2>
      <p style={p}>
        By default, System.Text.Json serializes enums as integers. To serialize as strings
        (which is far more readable and stable in APIs), use{' '}
        <code style={inlineCode}>JsonStringEnumConverter</code>.
      </p>

      <pre style={pre}><code>{`using System.Text.Json.Serialization;

public enum OrderStatus
{
    Pending,
    Processing,
    Shipped,
    Delivered,
    Cancelled,
}

public class Order
{
    [JsonPropertyName("status")]
    [JsonConverter(typeof(JsonStringEnumConverter))]
    public OrderStatus Status { get; set; }
}

// Serialize: { "status": "Shipped" }
// Deserialize: "Shipped" -> OrderStatus.Shipped`}</code></pre>

      <h3 style={h3}>Global Enum Converter (System.Text.Json)</h3>
      <pre style={pre}><code>{`var options = new JsonSerializerOptions
{
    Converters = { new JsonStringEnumConverter(JsonNamingPolicy.CamelCase) },
};
// All enums serialized as camelCase strings: "shipped" instead of "Shipped"`}</code></pre>

      <h3 style={h3}>Enum with JsonEnumMemberName (.NET 9+)</h3>
      <pre style={pre}><code>{`// .NET 9 adds [JsonStringEnumMemberName] for custom string values:
[JsonConverter(typeof(JsonStringEnumConverter<Priority>))]
public enum Priority
{
    [JsonStringEnumMemberName("low")]    Low,
    [JsonStringEnumMemberName("med")]    Medium,
    [JsonStringEnumMemberName("high")]   High,
}
// JSON: "priority": "med"  <->  Priority.Medium`}</code></pre>

      <h3 style={h3}>Custom Enum Converter for Unknown Values</h3>
      <pre style={pre}><code>{`public class SafeEnumConverter<T> : JsonConverter<T> where T : struct, Enum
{
    public override T Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
    {
        string? value = reader.GetString();
        return Enum.TryParse<T>(value, ignoreCase: true, out var result)
            ? result
            : default;   // fall back to 0 (first enum value) for unknown strings
    }

    public override void Write(Utf8JsonWriter writer, T value, JsonSerializerOptions options)
        => writer.WriteStringValue(value.ToString());
}`}</code></pre>

      {/* ================================================================ */}
      {/* 9. Date and Time                                                 */}
      {/* ================================================================ */}
      <h2 style={h2}>Date and Time Handling</h2>

      <h3 style={h3}>DateTime vs DateTimeOffset vs DateOnly</h3>
      <ul style={{ paddingLeft: 24, marginBottom: 20 }}>
        <li style={li}><code style={inlineCode}>DateTime</code> — local or UTC, no offset stored. Avoid for APIs; can cause timezone bugs.</li>
        <li style={li}><code style={inlineCode}>DateTimeOffset</code> — stores offset from UTC. Prefer this for timestamps in APIs.</li>
        <li style={li}><code style={inlineCode}>DateOnly</code> (.NET 6+) — date without time. Ideal for birthdays, due dates, etc.</li>
        <li style={li}><code style={inlineCode}>TimeOnly</code> (.NET 6+) — time without date. Ideal for opening hours, schedules.</li>
      </ul>

      <pre style={pre}><code>{`public class Event
{
    [JsonPropertyName("start_time")]
    public DateTimeOffset StartTime { get; set; }    // "2024-03-15T09:00:00+00:00"

    [JsonPropertyName("date")]
    public DateOnly Date { get; set; }               // "2024-03-15"

    [JsonPropertyName("open_at")]
    public TimeOnly OpenAt { get; set; }             // "09:00:00"
}`}</code></pre>

      <h3 style={h3}>Unix Timestamp Custom Converter</h3>
      <pre style={pre}><code>{`public class UnixTimestampConverter : JsonConverter<DateTimeOffset>
{
    public override DateTimeOffset Read(ref Utf8JsonReader reader,
        Type typeToConvert, JsonSerializerOptions options)
        => DateTimeOffset.FromUnixTimeSeconds(reader.GetInt64());

    public override void Write(Utf8JsonWriter writer,
        DateTimeOffset value, JsonSerializerOptions options)
        => writer.WriteNumberValue(value.ToUnixTimeSeconds());
}

// Usage:
public class LoginEvent
{
    [JsonPropertyName("timestamp")]
    [JsonConverter(typeof(UnixTimestampConverter))]
    public DateTimeOffset Timestamp { get; set; }
}
// JSON: { "timestamp": 1710489600 }  -> DateTimeOffset(2024-03-15T08:00:00Z)`}</code></pre>

      {/* ================================================================ */}
      {/* 10. Custom Converters                                            */}
      {/* ================================================================ */}
      <h2 style={h2}>Custom Converters</h2>
      <p style={p}>
        When built-in deserialization does not handle a particular JSON format — such as a
        type that serializes differently depending on a discriminator field, a polymorphic number
        that can also be a string, or a compact binary format — implement
        <code style={inlineCode}>JsonConverter&lt;T&gt;</code>.
      </p>

      <pre style={pre}><code>{`// A converter that accepts both string and number for a "version" field:
// JSON: { "version": "3.1" } or { "version": 3 }
public class FlexibleVersionConverter : JsonConverter<Version>
{
    public override Version? Read(ref Utf8JsonReader reader,
        Type typeToConvert, JsonSerializerOptions options)
    {
        if (reader.TokenType == JsonTokenType.String)
        {
            return Version.TryParse(reader.GetString(), out var v) ? v : null;
        }
        if (reader.TokenType == JsonTokenType.Number)
        {
            return new Version(reader.GetInt32(), 0);
        }
        throw new JsonException($"Unexpected token: {reader.TokenType}");
    }

    public override void Write(Utf8JsonWriter writer,
        Version value, JsonSerializerOptions options)
        => writer.WriteStringValue(value.ToString());
}

// Register globally:
var options = new JsonSerializerOptions
{
    Converters = { new FlexibleVersionConverter() },
};`}</code></pre>

      <h3 style={h3}>JsonConverterFactory for Generic Types</h3>
      <pre style={pre}><code>{`// A factory that creates converters for any Wrapper<T>:
public class WrapperConverterFactory : JsonConverterFactory
{
    public override bool CanConvert(Type typeToConvert)
        => typeToConvert.IsGenericType
           && typeToConvert.GetGenericTypeDefinition() == typeof(Wrapper<>);

    public override JsonConverter? CreateConverter(Type typeToConvert,
        JsonSerializerOptions options)
    {
        Type itemType = typeToConvert.GetGenericArguments()[0];
        return (JsonConverter?)Activator.CreateInstance(
            typeof(WrapperConverter<>).MakeGenericType(itemType));
    }
}`}</code></pre>

      {/* ================================================================ */}
      {/* 11. Inheritance and Polymorphism                                 */}
      {/* ================================================================ */}
      <h2 style={h2}>Inheritance and Polymorphism</h2>
      <p style={p}>
        .NET 7+ System.Text.Json supports polymorphic serialization with
        <code style={inlineCode}>[JsonPolymorphic]</code> and{' '}
        <code style={inlineCode}>[JsonDerivedType]</code> attributes,
        replacing the manual discriminator patterns needed in earlier versions.
      </p>

      <pre style={pre}><code>{`using System.Text.Json.Serialization;

[JsonPolymorphic(TypeDiscriminatorPropertyName = "$type")]
[JsonDerivedType(typeof(CircleShape), typeDiscriminator: "circle")]
[JsonDerivedType(typeof(RectangleShape), typeDiscriminator: "rectangle")]
public abstract class Shape
{
    public string Color { get; set; } = "black";
}

public class CircleShape : Shape
{
    public double Radius { get; set; }
}

public class RectangleShape : Shape
{
    public double Width { get; set; }
    public double Height { get; set; }
}

// Serialize:
Shape shape = new CircleShape { Color = "red", Radius = 5.0 };
string json = JsonSerializer.Serialize<Shape>(shape);
// { "$type": "circle", "radius": 5.0, "color": "red" }

// Deserialize back to the correct subtype:
Shape? result = JsonSerializer.Deserialize<Shape>(json);
// result is CircleShape`}</code></pre>

      <h3 style={h3}>Manual Discriminator (older .NET / Newtonsoft.Json)</h3>
      <pre style={pre}><code>{`// With Newtonsoft.Json: use JsonSubTypes NuGet package
// or a custom converter that reads a discriminator field first:

public class ShapeConverter : JsonConverter
{
    public override object? ReadJson(JsonReader reader, Type objectType,
        object? existingValue, JsonSerializer serializer)
    {
        var obj = JObject.Load(reader);
        string? type = obj["$type"]?.Value<string>();
        return type switch
        {
            "circle"    => obj.ToObject<CircleShape>(serializer),
            "rectangle" => obj.ToObject<RectangleShape>(serializer),
            _           => throw new JsonException($"Unknown type: {type}"),
        };
    }

    public override bool CanConvert(Type objectType) => objectType == typeof(Shape);
    public override void WriteJson(JsonWriter w, object? v, JsonSerializer s)
        => throw new NotSupportedException();
}`}</code></pre>

      {/* ================================================================ */}
      {/* 12. Validation with DataAnnotations                              */}
      {/* ================================================================ */}
      <h2 style={h2}>Validation with DataAnnotations</h2>
      <p style={p}>
        After deserializing JSON into a C# class, validate the data before acting on it.
        The <code style={inlineCode}>System.ComponentModel.DataAnnotations</code> namespace provides
        attributes recognized by ASP.NET Core model binding and the
        <code style={inlineCode}>Validator</code> class.
      </p>

      <pre style={pre}><code>{`using System.ComponentModel.DataAnnotations;

public class CreateUserRequest
{
    [Required]
    [StringLength(50, MinimumLength = 2)]
    [JsonPropertyName("username")]
    public string Username { get; set; } = string.Empty;

    [Required]
    [EmailAddress]
    [JsonPropertyName("email")]
    public string Email { get; set; } = string.Empty;

    [Required]
    [Range(13, 120, ErrorMessage = "Age must be between 13 and 120.")]
    [JsonPropertyName("age")]
    public int Age { get; set; }

    [Url]
    [JsonPropertyName("website")]
    public string? Website { get; set; }

    [RegularExpression(@"^\+?[1-9]\d{7,14}$")]
    [JsonPropertyName("phone")]
    public string? Phone { get; set; }
}

// Manual validation outside ASP.NET Core:
var request = JsonSerializer.Deserialize<CreateUserRequest>(json)!;
var context = new ValidationContext(request);
var results = new List<ValidationResult>();
bool valid = Validator.TryValidateObject(request, context, results, validateAllProperties: true);

if (!valid)
{
    foreach (var error in results)
        Console.WriteLine(error.ErrorMessage);
}`}</code></pre>

      <h3 style={h3}>FluentValidation (Recommended for Complex Rules)</h3>
      <pre style={pre}><code>{`// Install: dotnet add package FluentValidation
using FluentValidation;

public class CreateUserRequestValidator : AbstractValidator<CreateUserRequest>
{
    public CreateUserRequestValidator()
    {
        RuleFor(x => x.Username)
            .NotEmpty()
            .Length(2, 50)
            .Matches(@"^[a-zA-Z0-9_]+$").WithMessage("Username can only contain letters, digits and underscores.");

        RuleFor(x => x.Email)
            .NotEmpty()
            .EmailAddress();

        RuleFor(x => x.Age)
            .InclusiveBetween(13, 120);
    }
}`}</code></pre>

      {/* ================================================================ */}
      {/* 13. ASP.NET Core Integration                                     */}
      {/* ================================================================ */}
      <h2 style={h2}>ASP.NET Core Integration</h2>
      <p style={p}>
        ASP.NET Core uses System.Text.Json by default for model binding and API responses.
        Your C# classes generated from JSON work directly as controller parameters and return types.
      </p>

      <h3 style={h3}>Controller Actions</h3>
      <pre style={pre}><code>{`[ApiController]
[Route("api/[controller]")]
public class UsersController : ControllerBase
{
    // POST body is automatically deserialized from JSON:
    [HttpPost]
    public IActionResult CreateUser([FromBody] CreateUserRequest request)
    {
        if (!ModelState.IsValid)
            return ValidationProblem(ModelState);

        // process...
        return CreatedAtAction(nameof(GetUser), new { id = 1 }, new { id = 1 });
    }

    // Return type is automatically serialized to JSON:
    [HttpGet("{id:int}")]
    public ActionResult<User> GetUser(int id)
    {
        var user = new User { UserId = id, FullName = "Alice", Email = "alice@x.com" };
        return Ok(user);
    }
}`}</code></pre>

      <h3 style={h3}>HttpClient with GetFromJsonAsync</h3>
      <pre style={pre}><code>{`// dotnet add package Microsoft.Extensions.Http
// Available via IHttpClientFactory in DI:
public class UserService
{
    private readonly HttpClient _http;

    public UserService(HttpClient http) => _http = http;

    public async Task<User?> GetUserAsync(int id)
    {
        // Deserializes response JSON automatically:
        return await _http.GetFromJsonAsync<User>($"/api/users/{id}");
    }

    public async Task CreateUserAsync(CreateUserRequest req)
    {
        // Serializes req to JSON and sends as POST body:
        var response = await _http.PostAsJsonAsync("/api/users", req);
        response.EnsureSuccessStatusCode();
    }
}`}</code></pre>

      <h3 style={h3}>Global JSON Options in Program.cs</h3>
      <pre style={pre}><code>{`// Program.cs (.NET 6+ minimal API):
builder.Services.ConfigureHttpJsonOptions(options =>
{
    options.SerializerOptions.PropertyNamingPolicy = JsonNamingPolicy.CamelCase;
    options.SerializerOptions.DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull;
    options.SerializerOptions.Converters.Add(new JsonStringEnumConverter());
});

// Or with AddControllers():
builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.PropertyNamingPolicy = JsonNamingPolicy.CamelCase;
        options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
    });`}</code></pre>

      <h3 style={h3}>Minimal API with JSON</h3>
      <pre style={pre}><code>{`// Minimal API — model binding and JSON serialization built in:
app.MapPost("/api/users", async (CreateUserRequest req, IValidator<CreateUserRequest> validator) =>
{
    var result = await validator.ValidateAsync(req);
    if (!result.IsValid)
        return Results.ValidationProblem(result.ToDictionary());

    return Results.Created("/api/users/1", new User { UserId = 1, FullName = req.Username });
});

app.MapGet("/api/users/{id:int}", (int id) =>
    Results.Ok(new User { UserId = id, FullName = "Alice", Email = "alice@x.com" }));`}</code></pre>

      {/* ================================================================ */}
      {/* 14. Tools for JSON-to-C# Generation                             */}
      {/* ================================================================ */}
      <h2 style={h2}>Tools for JSON-to-C# Class Generation</h2>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
          <thead>
            <tr style={{ background: '#f1f5f9' }}>
              <th style={{ padding: '10px 14px', textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>Tool</th>
              <th style={{ padding: '10px 14px', textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>Type</th>
              <th style={{ padding: '10px 14px', textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>Best For</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['DevToolBox JSON to C#', 'Online free tool', 'Quick POCO/record generation, no install'],
              ['Visual Studio "Paste JSON as Classes"', 'IDE built-in', 'Copy JSON from clipboard directly in VS'],
              ['quicktype (quicktype.io)', 'Online / CLI / plugins', 'Multi-language generation including C#'],
              ['NSwag', 'CLI / NuGet', 'Generate C# clients from OpenAPI/Swagger specs'],
              ['NJsonSchema', 'NuGet library', 'Generate C# classes from JSON Schema'],
              ['Newtonsoft.Json Schema', 'NuGet library', 'JSON Schema validation with Json.NET'],
              ['ReSharper / Rider', 'IDE plugin', 'Paste JSON as classes with advanced type inference'],
            ].map(([tool, type, use], i) => (
              <tr key={i} style={{ background: i % 2 === 0 ? '#fff' : '#f8fafc' }}>
                <td style={{ padding: '10px 14px', borderBottom: '1px solid #e2e8f0', fontWeight: 600 }}>{tool}</td>
                <td style={{ padding: '10px 14px', borderBottom: '1px solid #e2e8f0' }}>{type}</td>
                <td style={{ padding: '10px 14px', borderBottom: '1px solid #e2e8f0' }}>{use}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h3 style={h3}>Visual Studio: Paste JSON as Classes</h3>
      <p style={p}>
        In Visual Studio 2019+, copy JSON to clipboard, then go to{' '}
        <strong>Edit &rarr; Paste Special &rarr; Paste JSON as Classes</strong>. The IDE
        generates a complete class hierarchy using Newtonsoft.Json attributes. Limitations:
        it does not support nullable reference types or record types. Use the{' '}
        <Link href={toolLink} style={{ color: '#2563eb' }}>DevToolBox JSON to C# tool</Link> for
        modern output with System.Text.Json, records, and nullable annotations.
      </p>

      <h3 style={h3}>Source Generators (.NET 6+ AOT)</h3>
      <pre style={pre}><code>{`// Enable System.Text.Json source generation for AOT / trimming compatibility:
using System.Text.Json.Serialization;

[JsonSerializable(typeof(User))]
[JsonSerializable(typeof(List<User>))]
[JsonSerializable(typeof(CreateUserRequest))]
public partial class AppJsonContext : JsonSerializerContext { }

// Use context instead of default options:
string json = JsonSerializer.Serialize(user, AppJsonContext.Default.User);
User? result = JsonSerializer.Deserialize(json, AppJsonContext.Default.User);

// In minimal APIs:
app.MapGet("/user", () => new User { UserId = 1, FullName = "Alice" })
   .WithMetadata(AppJsonContext.Default.User);`}</code></pre>

      {/* ================================================================ */}
      {/* FAQ Section                                                      */}
      {/* ================================================================ */}
      <h2 style={h2}>Frequently Asked Questions</h2>
      <div>
        {faqItems.map((item, i) => (
          <div key={i} style={{
            borderBottom: '1px solid #e2e8f0',
            paddingBottom: 20,
            marginBottom: 20,
          }}>
            <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 8, marginTop: 0 }}>
              {item.q}
            </h3>
            <p style={{ margin: 0, lineHeight: 1.75 }}>{item.a}</p>
          </div>
        ))}
      </div>

      {/* ---- CTA ---- */}
      <div style={{
        background: '#f0f9ff',
        border: '1px solid #bae6fd',
        borderRadius: 8,
        padding: '20px 24px',
        marginTop: 40,
        textAlign: 'center',
      }}>
        <p style={{ fontWeight: 700, fontSize: 18, marginBottom: 8, marginTop: 0 }}>
          Generate C# Classes from JSON Instantly
        </p>
        <p style={{ margin: '0 0 14px', color: '#475569' }}>
          Paste your JSON and get ready-to-use C# classes with nullable types,
          System.Text.Json attributes, and record support.
        </p>
        <Link
          href={toolLink}
          style={{
            display: 'inline-block',
            background: '#2563eb',
            color: '#fff',
            padding: '10px 24px',
            borderRadius: 6,
            fontWeight: 600,
            textDecoration: 'none',
          }}
        >
          Open JSON to C# Tool &rarr;
        </Link>
      </div>
    </article>
  );
}
