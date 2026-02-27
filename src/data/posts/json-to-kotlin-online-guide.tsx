'use client';
import React from 'react';
import Link from 'next/link';

/* ------------------------------------------------------------------ */
/*  JSON to Kotlin Data Class Online Guide                              */
/* ------------------------------------------------------------------ */

export default function JsonToKotlinOnlineGuide({ lang }: { lang: string }) {
  const l = lang || 'en';
  const toolLink = `/${l}/tools/json-to-kotlin`;

  /* ---------- translations ---------- */
  const translations: Record<string, {
    tldr: string;
    whyTitle: string;
    takeawaysTitle: string;
    tryTool: string;
    faqTitle: string;
  }> = {
    zh: {
      tldr: '使用 kotlinx.serialization 实现多平台支持，使用 Gson 简化 Android 开发，或使用 Moshi 进行基于注解的映射，将 JSON 转换为 Kotlin 数据类。数据类自动提供 equals、hashCode 和 copy() 方法。',
      whyTitle: '为什么使用 Kotlin 数据类？',
      takeawaysTitle: '核心要点',
      tryTool: '立即使用免费的 JSON 转 Kotlin 工具 \u2192',
      faqTitle: '常见问题',
    },
    en: {
      tldr: 'Convert JSON to Kotlin data classes using kotlinx.serialization for multiplatform, Gson for Android simplicity, or Moshi for annotation-based mapping. Data classes provide automatic equals, hashCode, and copy().',
      whyTitle: 'Why Use Kotlin Data Classes for JSON?',
      takeawaysTitle: 'Key Takeaways',
      tryTool: 'Try our free JSON to Kotlin Data Class tool \u2192',
      faqTitle: 'Frequently Asked Questions',
    },
  };

  const t = translations[l] || translations['en'];

  /* ---------- FAQ items ---------- */
  const faqItems = [
    {
      q: "What's the difference between data class and regular class for JSON?",
      a: "Data classes auto-generate structural equality (equals/hashCode), copy(), toString(), and destructuring declarations. Regular classes require manual implementation of these. For JSON deserialization, data classes work identically — the real benefit is the generated boilerplate. However, data classes require at least one constructor parameter, making them ideal for immutable value objects that map cleanly to JSON payloads.",
    },
    {
      q: 'Should I use kotlinx.serialization or Gson?',
      a: 'kotlinx.serialization is recommended for new projects — it is multiplatform (works on JVM, JS, Native), null-safe, and integrates deeply with Kotlin type system. It generates serializers at compile time, avoiding reflection. Gson is mature and simpler for Android-only projects but uses reflection and has quirks with Kotlin nullability. For new Kotlin Multiplatform (KMP) or Ktor projects, always choose kotlinx.serialization.',
    },
    {
      q: 'How do I handle snake_case JSON keys in Kotlin?',
      a: "Use @SerialName(\"snake_key\") for kotlinx.serialization to map JSON keys to idiomatic Kotlin camelCase property names. For Gson, use @SerializedName(\"snake_key\"). For Moshi, use @Json(name = \"snake_key\"). Alternatively, kotlinx.serialization supports a global NamingStrategy via JsonBuilder: Json { namingStrategy = JsonNamingStrategy.SnakeCase } to automatically convert all camelCase properties.",
    },
    {
      q: 'How do nullable fields work in Kotlin JSON parsing?',
      a: 'Declare fields as String? (nullable type) — they accept null JSON values. With kotlinx.serialization, a non-nullable field that receives JSON null will throw SerializationException. With Gson, null JSON values on non-nullable Kotlin types can cause NullPointerExceptions at runtime. Always mark optional JSON fields as nullable (String?) or provide default values (val name: String = "") to avoid crashes.',
    },
    {
      q: 'Can I use data classes with Room database?',
      a: 'Yes — annotate the data class with @Entity and Room treats it as a database entity. For complex nested types that are not primitive, use @TypeConverter to convert them to/from a storable type (usually JSON string). Example: convert a List<String> to a JSON string using Gson or kotlinx.serialization, then store it as a TEXT column. Data class properties annotated with @Embedded map nested objects to columns.',
    },
    {
      q: 'How do I parse JSON arrays in Kotlin?',
      a: 'Use List<T> — kotlinx.serialization handles it automatically. Example: val users = Json.decodeFromString<List<User>>(jsonString). For Gson: val users = gson.fromJson(jsonString, object : TypeToken<List<User>>() {}.type). For Moshi: val adapter = moshi.adapter<List<User>>(Types.newParameterizedType(List::class.java, User::class.java)) then adapter.fromJson(jsonString). Nested arrays become List<List<T>>.',
    },
    {
      q: 'What are sealed classes for in JSON?',
      a: "Sealed classes model discriminated unions where JSON has different shapes based on a \"type\" field. For example, a payment JSON might be {\"type\":\"card\",...} or {\"type\":\"paypal\",...}. With kotlinx.serialization, use @Serializable with polymorphism: add subclasses with SerializersModule and PolymorphicSerializer. Each subclass handles a different JSON shape, and you switch on the type discriminator to parse the correct variant.",
    },
    {
      q: 'How do I use default values for missing JSON fields?',
      a: 'Add default values in the constructor: val count: Int = 0 or val tags: List<String> = emptyList(). With kotlinx.serialization, you must also set Json { ignoreUnknownKeys = true } and the library will use defaults for missing keys. Gson also respects Kotlin default values when used with GsonBuilder and properly configured. Default values prevent crashes when the API evolves and adds or removes fields.',
    },
  ];

  const faqJsonLd = {
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
    "Kotlin data classes auto-generate equals(), hashCode(), toString(), and copy()",
    "@Serializable with kotlinx.serialization is the modern multiplatform approach",
    "@SerialName maps JSON keys to Kotlin property names",
    "Nullable types (String?) handle null JSON values safely",
    "Default parameter values let you skip optional JSON fields",
    "Sealed classes model discriminated union types from JSON",
    "Gson's @SerializedName and Moshi's @Json serve the same purpose as @SerialName",
  ];

  return (
    <article style={{ fontFamily: "'Inter', sans-serif", color: '#1e293b', lineHeight: 1.7 }}>
      {/* JSON-LD FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* Canonical hint */}
      <link rel="canonical" href="https://viadreams.cc/en/blog/json-to-kotlin-online-guide" />

      {/* TL;DR Box */}
      <div style={{
        background: '#f0f9ff',
        border: '1px solid #bae6fd',
        borderRadius: 10,
        padding: '18px 24px',
        marginBottom: 32,
      }}>
        <p style={{ margin: 0, fontWeight: 700, fontSize: 14, textTransform: 'uppercase', letterSpacing: 1, color: '#0369a1' }}>TL;DR</p>
        <p style={{ margin: '6px 0 0', color: '#0c4a6e', fontSize: 15 }}>{t.tldr}</p>
      </div>

      {/* Key Takeaways */}
      <div style={{
        background: '#f8fafc',
        border: '1px solid #e2e8f0',
        borderRadius: 10,
        padding: '18px 24px',
        marginBottom: 36,
      }}>
        <p style={{ margin: '0 0 10px', fontWeight: 700, fontSize: 15, color: '#1e293b' }}>{t.takeawaysTitle}</p>
        <ul style={{ margin: 0, paddingLeft: 20 }}>
          {takeaways.map((item, i) => (
            <li key={i} style={{ marginBottom: 6, color: '#334155', fontSize: 14 }}>{item}</li>
          ))}
        </ul>
      </div>

      {/* 1. Why Use Kotlin Data Classes */}
      <h2 style={{ fontSize: 24, fontWeight: 700, marginTop: 40, marginBottom: 12, color: '#0f172a' }}>
        {t.whyTitle}
      </h2>
      <p style={{ color: '#475569', marginBottom: 16 }}>
        Kotlin data classes are purpose-built for holding structured data. Unlike Java POJOs, they eliminate hundreds
        of lines of boilerplate — <code style={{ background: '#f1f5f9', padding: '2px 6px', borderRadius: 4, fontSize: 13 }}>equals()</code>,{' '}
        <code style={{ background: '#f1f5f9', padding: '2px 6px', borderRadius: 4, fontSize: 13 }}>hashCode()</code>,{' '}
        <code style={{ background: '#f1f5f9', padding: '2px 6px', borderRadius: 4, fontSize: 13 }}>toString()</code>, and{' '}
        <code style={{ background: '#f1f5f9', padding: '2px 6px', borderRadius: 4, fontSize: 13 }}>copy()</code> are all generated by the compiler.
      </p>
      <p style={{ color: '#475569', marginBottom: 16 }}>
        When deserializing JSON APIs, data classes give you compile-time type safety, IDE autocomplete, and
        Kotlin null safety — which prevents the null pointer exceptions that plague Java JSON code.
      </p>

      {/* Data class vs Java POJO comparison table */}
      <div style={{ overflowX: 'auto', marginBottom: 28 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
          <thead>
            <tr style={{ background: '#f1f5f9' }}>
              <th style={{ padding: '10px 14px', textAlign: 'left', borderBottom: '2px solid #e2e8f0', color: '#374151', fontWeight: 600 }}>Feature</th>
              <th style={{ padding: '10px 14px', textAlign: 'left', borderBottom: '2px solid #e2e8f0', color: '#374151', fontWeight: 600 }}>Kotlin data class</th>
              <th style={{ padding: '10px 14px', textAlign: 'left', borderBottom: '2px solid #e2e8f0', color: '#374151', fontWeight: 600 }}>Java POJO</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['equals/hashCode', 'Auto-generated', 'Manual or Lombok'],
              ['toString()', 'Auto-generated', 'Manual or Lombok'],
              ['copy()', 'Built-in', 'Not available'],
              ['Destructuring', 'componentN() built-in', 'Not available'],
              ['Null safety', 'Enforced by type system', 'Runtime NPE risk'],
              ['Immutability', 'val by default', 'Requires discipline'],
              ['Lines of code', '1 line', '30-50+ lines'],
            ].map(([feature, kotlin, java], i) => (
              <tr key={i} style={{ borderBottom: '1px solid #f1f5f9', background: i % 2 === 0 ? '#ffffff' : '#fafafa' }}>
                <td style={{ padding: '9px 14px', color: '#374151', fontWeight: 500 }}>{feature}</td>
                <td style={{ padding: '9px 14px', color: '#15803d' }}>{kotlin}</td>
                <td style={{ padding: '9px 14px', color: '#dc2626' }}>{java}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Tool CTA */}
      <div style={{ textAlign: 'center', margin: '24px 0 36px' }}>
        <Link href={toolLink} style={{
          display: 'inline-block',
          background: '#2563eb',
          color: '#fff',
          padding: '12px 28px',
          borderRadius: 8,
          fontWeight: 600,
          fontSize: 15,
          textDecoration: 'none',
        }}>
          {t.tryTool}
        </Link>
      </div>

      {/* 2. Basic Data Class from JSON */}
      <h2 style={{ fontSize: 24, fontWeight: 700, marginTop: 40, marginBottom: 12, color: '#0f172a' }}>
        Basic Data Class from JSON (kotlinx.serialization)
      </h2>
      <p style={{ color: '#475569', marginBottom: 16 }}>
        The modern, Kotlin-first approach uses{' '}
        <code style={{ background: '#f1f5f9', padding: '2px 6px', borderRadius: 4, fontSize: 13 }}>kotlinx.serialization</code>.
        It is multiplatform, generates serializers at compile time (no reflection), and integrates with Kotlin null safety.
      </p>
      <p style={{ color: '#475569', marginBottom: 12 }}>
        Given this JSON:
      </p>
      <pre style={{
        background: '#1e293b',
        color: '#e2e8f0',
        padding: '20px 24px',
        borderRadius: 10,
        overflowX: 'auto',
        fontSize: 13,
        lineHeight: 1.6,
        marginBottom: 16,
      }}>{`{
  "id": 42,
  "username": "alice",
  "email": "alice@example.com",
  "age": 30,
  "is_active": true,
  "bio": null
}`}</pre>
      <p style={{ color: '#475569', marginBottom: 12 }}>
        The Kotlin data class with <code style={{ background: '#f1f5f9', padding: '2px 6px', borderRadius: 4, fontSize: 13 }}>kotlinx.serialization</code>:
      </p>
      <pre style={{
        background: '#1e293b',
        color: '#e2e8f0',
        padding: '20px 24px',
        borderRadius: 10,
        overflowX: 'auto',
        fontSize: 13,
        lineHeight: 1.6,
        marginBottom: 16,
      }}>{`import kotlinx.serialization.Serializable
import kotlinx.serialization.SerialName

@Serializable
data class User(
    val id: Int,
    val username: String,
    val email: String,
    val age: Int,
    @SerialName("is_active")
    val isActive: Boolean,
    val bio: String? = null  // nullable + default value
)

// Deserialize
val user = Json.decodeFromString<User>(jsonString)

// Serialize back to JSON
val json = Json.encodeToString(user)`}</pre>
      <p style={{ color: '#475569', marginBottom: 8 }}>
        Add to <code style={{ background: '#f1f5f9', padding: '2px 6px', borderRadius: 4, fontSize: 13 }}>build.gradle.kts</code>:
      </p>
      <pre style={{
        background: '#1e293b',
        color: '#e2e8f0',
        padding: '20px 24px',
        borderRadius: 10,
        overflowX: 'auto',
        fontSize: 13,
        lineHeight: 1.6,
        marginBottom: 28,
      }}>{`plugins {
    kotlin("plugin.serialization") version "1.9.22"
}

dependencies {
    implementation("org.jetbrains.kotlinx:kotlinx-serialization-json:1.6.3")
}`}</pre>

      {/* 3. Gson Alternative */}
      <h2 style={{ fontSize: 24, fontWeight: 700, marginTop: 40, marginBottom: 12, color: '#0f172a' }}>
        Gson Alternative
      </h2>
      <p style={{ color: '#475569', marginBottom: 16 }}>
        Google\u0027s Gson is battle-tested on Android and requires zero code generation. Use it when you need a simple
        drop-in that works with existing Java libraries. Note that Gson uses reflection and does not understand Kotlin
        null safety — a null JSON field on a non-nullable Kotlin property causes a runtime crash.
      </p>
      <pre style={{
        background: '#1e293b',
        color: '#e2e8f0',
        padding: '20px 24px',
        borderRadius: 10,
        overflowX: 'auto',
        fontSize: 13,
        lineHeight: 1.6,
        marginBottom: 16,
      }}>{`import com.google.gson.annotations.SerializedName

// No @Serializable needed — Gson uses reflection
data class User(
    val id: Int,
    val username: String,
    val email: String,
    val age: Int,
    @SerializedName("is_active")
    val isActive: Boolean,
    val bio: String? = null
)

// Setup
val gson = GsonBuilder()
    .setLenient()
    .create()

// Deserialize
val user = gson.fromJson(jsonString, User::class.java)

// Serialize
val json = gson.toJson(user)`}</pre>
      <pre style={{
        background: '#1e293b',
        color: '#e2e8f0',
        padding: '20px 24px',
        borderRadius: 10,
        overflowX: 'auto',
        fontSize: 13,
        lineHeight: 1.6,
        marginBottom: 28,
      }}>{`// build.gradle.kts
dependencies {
    implementation("com.google.code.gson:gson:2.10.1")
}`}</pre>

      {/* 4. Moshi Alternative */}
      <h2 style={{ fontSize: 24, fontWeight: 700, marginTop: 40, marginBottom: 12, color: '#0f172a' }}>
        Moshi Alternative
      </h2>
      <p style={{ color: '#475569', marginBottom: 16 }}>
        Square\u0027s Moshi is designed with Kotlin in mind and supports both reflection and code generation (kapt/KSP).
        Unlike Gson, Moshi understands Kotlin null safety and throws <code style={{ background: '#f1f5f9', padding: '2px 6px', borderRadius: 4, fontSize: 13 }}>JsonDataException</code> for
        null mismatches instead of letting them pass silently.
      </p>
      <pre style={{
        background: '#1e293b',
        color: '#e2e8f0',
        padding: '20px 24px',
        borderRadius: 10,
        overflowX: 'auto',
        fontSize: 13,
        lineHeight: 1.6,
        marginBottom: 16,
      }}>{`import com.squareup.moshi.Json
import com.squareup.moshi.JsonClass

@JsonClass(generateAdapter = true)  // triggers KSP/kapt code generation
data class User(
    val id: Int,
    val username: String,
    val email: String,
    val age: Int,
    @Json(name = "is_active")
    val isActive: Boolean,
    val bio: String? = null
)

// Setup
val moshi = Moshi.Builder()
    .addLast(KotlinJsonAdapterFactory())
    .build()

val adapter = moshi.adapter(User::class.java)

// Deserialize
val user = adapter.fromJson(jsonString)

// Serialize
val json = adapter.toJson(user)`}</pre>
      <pre style={{
        background: '#1e293b',
        color: '#e2e8f0',
        padding: '20px 24px',
        borderRadius: 10,
        overflowX: 'auto',
        fontSize: 13,
        lineHeight: 1.6,
        marginBottom: 28,
      }}>{`// build.gradle.kts
plugins {
    id("com.google.devtools.ksp") version "1.9.22-1.0.17"
}

dependencies {
    implementation("com.squareup.moshi:moshi:1.15.1")
    implementation("com.squareup.moshi:moshi-kotlin:1.15.1")
    ksp("com.squareup.moshi:moshi-kotlin-codegen:1.15.1")
}`}</pre>

      {/* 5. Jackson with Kotlin */}
      <h2 style={{ fontSize: 24, fontWeight: 700, marginTop: 40, marginBottom: 12, color: '#0f172a' }}>
        Jackson with Kotlin
      </h2>
      <p style={{ color: '#475569', marginBottom: 16 }}>
        Jackson is the de-facto standard in Spring Boot projects. Add the{' '}
        <code style={{ background: '#f1f5f9', padding: '2px 6px', borderRadius: 4, fontSize: 13 }}>jackson-module-kotlin</code> to make
        it understand Kotlin data classes, nullable types, and default parameters.
      </p>
      <pre style={{
        background: '#1e293b',
        color: '#e2e8f0',
        padding: '20px 24px',
        borderRadius: 10,
        overflowX: 'auto',
        fontSize: 13,
        lineHeight: 1.6,
        marginBottom: 16,
      }}>{`import com.fasterxml.jackson.annotation.JsonProperty

// No special annotation needed if jackson-module-kotlin is registered
data class User(
    val id: Int,
    val username: String,
    val email: String,
    val age: Int,
    @JsonProperty("is_active")
    val isActive: Boolean,
    val bio: String? = null
)

// Setup with Kotlin module
val mapper = ObjectMapper().apply {
    registerModule(KotlinModule.Builder().build())
    configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false)
}

// Deserialize
val user = mapper.readValue<User>(jsonString)

// Serialize
val json = mapper.writeValueAsString(user)`}</pre>
      <pre style={{
        background: '#1e293b',
        color: '#e2e8f0',
        padding: '20px 24px',
        borderRadius: 10,
        overflowX: 'auto',
        fontSize: 13,
        lineHeight: 1.6,
        marginBottom: 28,
      }}>{`// build.gradle.kts (Spring Boot adds these automatically)
dependencies {
    implementation("com.fasterxml.jackson.module:jackson-module-kotlin:2.16.1")
    implementation("com.fasterxml.jackson.core:jackson-databind:2.16.1")
}`}</pre>

      {/* 6. Nested Objects and Lists */}
      <h2 style={{ fontSize: 24, fontWeight: 700, marginTop: 40, marginBottom: 12, color: '#0f172a' }}>
        Nested Objects and Lists
      </h2>
      <p style={{ color: '#475569', marginBottom: 12 }}>
        JSON with nested objects maps to separate data classes. Arrays map to{' '}
        <code style={{ background: '#f1f5f9', padding: '2px 6px', borderRadius: 4, fontSize: 13 }}>List&lt;T&gt;</code>.
      </p>
      <pre style={{
        background: '#1e293b',
        color: '#e2e8f0',
        padding: '20px 24px',
        borderRadius: 10,
        overflowX: 'auto',
        fontSize: 13,
        lineHeight: 1.6,
        marginBottom: 16,
      }}>{`// Input JSON
{
  "order_id": "ORD-001",
  "customer": {
    "id": 42,
    "name": "Alice"
  },
  "items": [
    { "sku": "ITEM-A", "quantity": 2, "price": 9.99 },
    { "sku": "ITEM-B", "quantity": 1, "price": 24.99 }
  ],
  "tags": ["priority", "gift"]
}`}</pre>
      <pre style={{
        background: '#1e293b',
        color: '#e2e8f0',
        padding: '20px 24px',
        borderRadius: 10,
        overflowX: 'auto',
        fontSize: 13,
        lineHeight: 1.6,
        marginBottom: 28,
      }}>{`import kotlinx.serialization.Serializable
import kotlinx.serialization.SerialName

@Serializable
data class Customer(
    val id: Int,
    val name: String
)

@Serializable
data class OrderItem(
    val sku: String,
    val quantity: Int,
    val price: Double
)

@Serializable
data class Order(
    @SerialName("order_id") val orderId: String,
    val customer: Customer,
    val items: List<OrderItem>,
    val tags: List<String> = emptyList()
)

// Parse entire hierarchy in one call
val order = Json.decodeFromString<Order>(jsonString)

// Access nested data
println(order.customer.name)       // Alice
println(order.items[0].sku)        // ITEM-A
println(order.items.sumOf { it.price * it.quantity })  // total cost`}</pre>

      {/* 7. Nullable Fields and Default Values */}
      <h2 style={{ fontSize: 24, fontWeight: 700, marginTop: 40, marginBottom: 12, color: '#0f172a' }}>
        Nullable Fields and Default Values
      </h2>
      <p style={{ color: '#475569', marginBottom: 16 }}>
        Kotlin\u0027s type system distinguishes nullable (<code style={{ background: '#f1f5f9', padding: '2px 6px', borderRadius: 4, fontSize: 13 }}>String?</code>) from
        non-nullable (<code style={{ background: '#f1f5f9', padding: '2px 6px', borderRadius: 4, fontSize: 13 }}>String</code>) types. Map JSON null values to nullable types,
        and use default values for optional JSON keys that may be absent entirely.
      </p>
      <pre style={{
        background: '#1e293b',
        color: '#e2e8f0',
        padding: '20px 24px',
        borderRadius: 10,
        overflowX: 'auto',
        fontSize: 13,
        lineHeight: 1.6,
        marginBottom: 16,
      }}>{`@Serializable
data class UserProfile(
    val id: Int,                           // required, never null
    val username: String,                  // required, never null
    val bio: String? = null,               // JSON null or absent -> null
    val avatarUrl: String? = null,         // JSON null or absent -> null
    val followersCount: Int = 0,           // absent in JSON -> defaults to 0
    val isVerified: Boolean = false,       // absent in JSON -> defaults to false
    val roles: List<String> = emptyList(), // absent in JSON -> empty list
    val metadata: Map<String, String> = emptyMap()
)

// Lenient parsing — ignores extra keys, uses defaults for missing keys
val json = Json {
    ignoreUnknownKeys = true
    coerceInputValues = true  // coerces invalid values to defaults
}

// Null-safe access
val profile = json.decodeFromString<UserProfile>(jsonString)
val displayBio = profile.bio ?: "No bio provided"
profile.avatarUrl?.let { loadAvatar(it) }  // safe call`}</pre>
      <p style={{ color: '#475569', marginBottom: 28 }}>
        With <code style={{ background: '#f1f5f9', padding: '2px 6px', borderRadius: 4, fontSize: 13 }}>ignoreUnknownKeys = true</code>, the parser silently ignores JSON fields that
        have no matching property in the data class — essential for robust API clients that must handle evolving APIs.
      </p>

      {/* 8. Enum Handling */}
      <h2 style={{ fontSize: 24, fontWeight: 700, marginTop: 40, marginBottom: 12, color: '#0f172a' }}>
        Enum Handling
      </h2>
      <p style={{ color: '#475569', marginBottom: 16 }}>
        JSON string values that represent a finite set of options map naturally to Kotlin enums. Both
        kotlinx.serialization and Gson support enum serialization out of the box.
      </p>
      <pre style={{
        background: '#1e293b',
        color: '#e2e8f0',
        padding: '20px 24px',
        borderRadius: 10,
        overflowX: 'auto',
        fontSize: 13,
        lineHeight: 1.6,
        marginBottom: 16,
      }}>{`import kotlinx.serialization.SerialName

@Serializable
enum class OrderStatus {
    @SerialName("pending") PENDING,
    @SerialName("processing") PROCESSING,
    @SerialName("shipped") SHIPPED,
    @SerialName("delivered") DELIVERED,
    @SerialName("cancelled") CANCELLED,
}

@Serializable
data class Order(
    val id: String,
    val status: OrderStatus,  // maps JSON "shipped" to OrderStatus.SHIPPED
    val amount: Double
)

// Usage
val order = Json.decodeFromString<Order>("""
    {"id": "ORD-1", "status": "shipped", "amount": 49.99}
""")
println(order.status)  // SHIPPED

// Unknown enum values — use lenient mode or provide a fallback
val lenientJson = Json {
    ignoreUnknownKeys = true
    isLenient = true
}

// With Gson — enums serialize by name automatically
val gson = Gson()
val json = gson.toJson(OrderStatus.SHIPPED)  // "SHIPPED"`}</pre>

      {/* 9. Date/Time with kotlinx.serialization */}
      <h2 style={{ fontSize: 24, fontWeight: 700, marginTop: 40, marginBottom: 12, color: '#0f172a' }}>
        Date/Time with kotlinx.serialization
      </h2>
      <p style={{ color: '#475569', marginBottom: 16 }}>
        <code style={{ background: '#f1f5f9', padding: '2px 6px', borderRadius: 4, fontSize: 13 }}>kotlinx-datetime</code> provides multiplatform date/time classes.
        Use <code style={{ background: '#f1f5f9', padding: '2px 6px', borderRadius: 4, fontSize: 13 }}>Instant</code> for timestamps (ISO 8601),{' '}
        <code style={{ background: '#f1f5f9', padding: '2px 6px', borderRadius: 4, fontSize: 13 }}>LocalDate</code> for dates without time.
      </p>
      <pre style={{
        background: '#1e293b',
        color: '#e2e8f0',
        padding: '20px 24px',
        borderRadius: 10,
        overflowX: 'auto',
        fontSize: 13,
        lineHeight: 1.6,
        marginBottom: 16,
      }}>{`import kotlinx.datetime.Instant
import kotlinx.datetime.LocalDate
import kotlinx.datetime.serializers.InstantIso8601Serializer

@Serializable
data class Event(
    val id: Int,
    val title: String,
    // ISO 8601 string in JSON: "2026-02-27T10:30:00Z"
    @Serializable(with = InstantIso8601Serializer::class)
    val createdAt: Instant,
    // Date string in JSON: "2026-03-01"
    val eventDate: LocalDate,
)

// build.gradle.kts
// implementation("org.jetbrains.kotlinx:kotlinx-datetime:0.5.0")

// For JVM-only (Gson/Jackson) with java.time
data class EventJvm(
    val id: Int,
    @JsonAdapter(InstantAdapter::class)  // Gson custom adapter
    val createdAt: java.time.Instant,
)

// Custom Gson TypeAdapter for Instant
class InstantAdapter : TypeAdapter<java.time.Instant>() {
    override fun write(out: JsonWriter, value: java.time.Instant) {
        out.value(value.toString())
    }
    override fun read(\`in\`: JsonReader): java.time.Instant {
        return java.time.Instant.parse(\`in\`.nextString())
    }
}`}</pre>

      {/* 10. Sealed Classes for Union Types */}
      <h2 style={{ fontSize: 24, fontWeight: 700, marginTop: 40, marginBottom: 12, color: '#0f172a' }}>
        Sealed Classes for Union Types
      </h2>
      <p style={{ color: '#475569', marginBottom: 16 }}>
        Sealed classes model JSON payloads that have different shapes based on a discriminator field.
        kotlinx.serialization supports polymorphism through{' '}
        <code style={{ background: '#f1f5f9', padding: '2px 6px', borderRadius: 4, fontSize: 13 }}>SerializersModule</code>.
      </p>
      <pre style={{
        background: '#1e293b',
        color: '#e2e8f0',
        padding: '20px 24px',
        borderRadius: 10,
        overflowX: 'auto',
        fontSize: 13,
        lineHeight: 1.6,
        marginBottom: 16,
      }}>{`// JSON variants:
// {"type": "card", "last4": "1234", "brand": "Visa"}
// {"type": "paypal", "email": "user@example.com"}
// {"type": "bank", "account_number": "****5678"}

@Serializable
sealed class PaymentMethod {
    abstract val type: String
}

@Serializable
@SerialName("card")
data class CardPayment(
    override val type: String = "card",
    val last4: String,
    val brand: String
) : PaymentMethod()

@Serializable
@SerialName("paypal")
data class PayPalPayment(
    override val type: String = "paypal",
    val email: String
) : PaymentMethod()

@Serializable
@SerialName("bank")
data class BankPayment(
    override val type: String = "bank",
    @SerialName("account_number") val accountNumber: String
) : PaymentMethod()

// Configure polymorphic serialization
val json = Json {
    serializersModule = SerializersModule {
        polymorphic(PaymentMethod::class) {
            subclass(CardPayment::class)
            subclass(PayPalPayment::class)
            subclass(BankPayment::class)
        }
    }
}

// Parse — Kotlin when expression gives exhaustive handling
val payment = json.decodeFromString<PaymentMethod>(jsonString)
when (payment) {
    is CardPayment  -> println("Card: \${payment.brand} *\${payment.last4}")
    is PayPalPayment -> println("PayPal: \${payment.email}")
    is BankPayment  -> println("Bank: \${payment.accountNumber}")
}`}</pre>

      {/* 11. Coroutines + Ktor Client */}
      <h2 style={{ fontSize: 24, fontWeight: 700, marginTop: 40, marginBottom: 12, color: '#0f172a' }}>
        Coroutines + Ktor Client Integration
      </h2>
      <p style={{ color: '#475569', marginBottom: 16 }}>
        Ktor is the Kotlin-native HTTP client that pairs naturally with kotlinx.serialization.
        It handles JSON content negotiation, request/response serialization, and coroutine integration.
      </p>
      <pre style={{
        background: '#1e293b',
        color: '#e2e8f0',
        padding: '20px 24px',
        borderRadius: 10,
        overflowX: 'auto',
        fontSize: 13,
        lineHeight: 1.6,
        marginBottom: 16,
      }}>{`import io.ktor.client.*
import io.ktor.client.call.*
import io.ktor.client.engine.cio.*
import io.ktor.client.plugins.contentnegotiation.*
import io.ktor.client.request.*
import io.ktor.serialization.kotlinx.json.*

@Serializable
data class GitHubUser(
    val login: String,
    val id: Int,
    val name: String?,
    @SerialName("public_repos") val publicRepos: Int,
    val bio: String? = null
)

// Create Ktor client with kotlinx.serialization
val client = HttpClient(CIO) {
    install(ContentNegotiation) {
        json(Json {
            ignoreUnknownKeys = true
            isLenient = true
        })
    }
}

// Suspend function — call from coroutine scope
suspend fun fetchUser(username: String): GitHubUser {
    return client.get("https://api.github.com/users/\$username") {
        header("Accept", "application/vnd.github.v3+json")
    }.body()
}

// Usage in coroutine
viewModelScope.launch {
    val user = fetchUser("octocat")
    println(user.name)         // The Octocat
    println(user.publicRepos)  // number of public repos
}

// POST with serialized body
suspend fun createUser(user: User): User {
    return client.post("https://api.example.com/users") {
        contentType(ContentType.Application.Json)
        setBody(user)
    }.body()
}`}</pre>
      <pre style={{
        background: '#1e293b',
        color: '#e2e8f0',
        padding: '20px 24px',
        borderRadius: 10,
        overflowX: 'auto',
        fontSize: 13,
        lineHeight: 1.6,
        marginBottom: 28,
      }}>{`// build.gradle.kts
dependencies {
    implementation("io.ktor:ktor-client-core:2.3.9")
    implementation("io.ktor:ktor-client-cio:2.3.9")
    implementation("io.ktor:ktor-client-content-negotiation:2.3.9")
    implementation("io.ktor:ktor-serialization-kotlinx-json:2.3.9")
}`}</pre>

      {/* 12. Android / Retrofit Integration */}
      <h2 style={{ fontSize: 24, fontWeight: 700, marginTop: 40, marginBottom: 12, color: '#0f172a' }}>
        Android / Retrofit Integration
      </h2>
      <p style={{ color: '#475569', marginBottom: 16 }}>
        Retrofit is the dominant Android HTTP client. Combine it with either Gson (traditional) or
        kotlinx.serialization (modern) converter factories.
      </p>
      <pre style={{
        background: '#1e293b',
        color: '#e2e8f0',
        padding: '20px 24px',
        borderRadius: 10,
        overflowX: 'auto',
        fontSize: 13,
        lineHeight: 1.6,
        marginBottom: 16,
      }}>{`// Data classes (same structure works with both converters)
@Serializable
data class Post(
    val id: Int,
    val title: String,
    val body: String,
    @SerialName("user_id") val userId: Int
)

// Retrofit interface
interface PostsApi {
    @GET("posts")
    suspend fun getPosts(): List<Post>

    @GET("posts/{id}")
    suspend fun getPost(@Path("id") id: Int): Post

    @POST("posts")
    suspend fun createPost(@Body post: Post): Post
}

// Option A: kotlinx.serialization converter (recommended)
val retrofit = Retrofit.Builder()
    .baseUrl("https://jsonplaceholder.typicode.com/")
    .addConverterFactory(
        Json { ignoreUnknownKeys = true }
            .asConverterFactory("application/json".toMediaType())
    )
    .build()

// Option B: Gson converter (simpler setup)
val retrofit = Retrofit.Builder()
    .baseUrl("https://jsonplaceholder.typicode.com/")
    .addConverterFactory(GsonConverterFactory.create())
    .build()

val api = retrofit.create(PostsApi::class.java)

// Usage in ViewModel
viewModelScope.launch {
    try {
        val posts = api.getPosts()  // returns List<Post>
        _uiState.value = UiState.Success(posts)
    } catch (e: Exception) {
        _uiState.value = UiState.Error(e.message ?: "Unknown error")
    }
}`}</pre>
      <pre style={{
        background: '#1e293b',
        color: '#e2e8f0',
        padding: '20px 24px',
        borderRadius: 10,
        overflowX: 'auto',
        fontSize: 13,
        lineHeight: 1.6,
        marginBottom: 28,
      }}>{`// build.gradle.kts (Android)
dependencies {
    // Retrofit
    implementation("com.squareup.retrofit2:retrofit:2.9.0")

    // Option A: kotlinx.serialization converter
    implementation("com.jakewharton.retrofit:retrofit2-kotlinx-serialization-converter:1.0.0")
    implementation("org.jetbrains.kotlinx:kotlinx-serialization-json:1.6.3")

    // Option B: Gson converter
    implementation("com.squareup.retrofit2:converter-gson:2.9.0")

    // Coroutines for Android
    implementation("org.jetbrains.kotlinx:kotlinx-coroutines-android:1.7.3")
}`}</pre>

      {/* 13. Tools */}
      <h2 style={{ fontSize: 24, fontWeight: 700, marginTop: 40, marginBottom: 12, color: '#0f172a' }}>
        Tools for JSON to Kotlin Conversion
      </h2>
      <p style={{ color: '#475569', marginBottom: 16 }}>
        Several tools automate Kotlin data class generation from JSON — saving time and preventing typos:
      </p>
      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
          <thead>
            <tr style={{ background: '#f1f5f9' }}>
              <th style={{ padding: '10px 14px', textAlign: 'left', borderBottom: '2px solid #e2e8f0', color: '#374151', fontWeight: 600 }}>Tool</th>
              <th style={{ padding: '10px 14px', textAlign: 'left', borderBottom: '2px solid #e2e8f0', color: '#374151', fontWeight: 600 }}>Best for</th>
              <th style={{ padding: '10px 14px', textAlign: 'left', borderBottom: '2px solid #e2e8f0', color: '#374151', fontWeight: 600 }}>Library support</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['DevToolBox JSON to Kotlin', 'Online, quick use', 'kotlinx.serialization, Gson, Moshi'],
              ['IntelliJ IDEA plugin', 'IDE integration', 'Gson, Jackson, kotlinx'],
              ['JsonToKotlinClass plugin', 'Complex nested JSON', 'All major libraries'],
              ['json-to-kotlin.com', 'Browser-based', 'kotlinx.serialization'],
              ['Moshi Kotlin codegen', 'Production Android', 'Moshi only'],
            ].map(([tool, best, lib], i) => (
              <tr key={i} style={{ borderBottom: '1px solid #f1f5f9', background: i % 2 === 0 ? '#ffffff' : '#fafafa' }}>
                <td style={{ padding: '9px 14px', color: '#2563eb', fontWeight: 500 }}>
                  {i === 0 ? (
                    <Link href={`https://viadreams.cc/en/tools/json-to-kotlin`} style={{ color: '#2563eb', textDecoration: 'none' }}>
                      {tool}
                    </Link>
                  ) : tool}
                </td>
                <td style={{ padding: '9px 14px', color: '#475569' }}>{best}</td>
                <td style={{ padding: '9px 14px', color: '#475569' }}>{lib}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p style={{ color: '#475569', marginBottom: 28 }}>
        The <Link href="https://viadreams.cc/en/tools/json-to-kotlin" style={{ color: '#2563eb' }}>DevToolBox JSON to Kotlin converter</Link> supports
        all three major libraries — paste your JSON and instantly get annotated data classes with proper{' '}
        <code style={{ background: '#f1f5f9', padding: '2px 6px', borderRadius: 4, fontSize: 13 }}>@SerialName</code>,{' '}
        <code style={{ background: '#f1f5f9', padding: '2px 6px', borderRadius: 4, fontSize: 13 }}>@SerializedName</code>, or{' '}
        <code style={{ background: '#f1f5f9', padding: '2px 6px', borderRadius: 4, fontSize: 13 }}>@Json(name)</code> annotations for snake_case fields.
      </p>

      {/* Tool CTA (mid-page) */}
      <div style={{ textAlign: 'center', margin: '24px 0 40px' }}>
        <Link href={toolLink} style={{
          display: 'inline-block',
          background: '#2563eb',
          color: '#fff',
          padding: '12px 28px',
          borderRadius: 8,
          fontWeight: 600,
          fontSize: 15,
          textDecoration: 'none',
        }}>
          {t.tryTool}
        </Link>
      </div>

      {/* 14. Common Pitfalls */}
      <h2 style={{ fontSize: 24, fontWeight: 700, marginTop: 40, marginBottom: 12, color: '#0f172a' }}>
        Common Pitfalls
      </h2>
      <p style={{ color: '#475569', marginBottom: 16 }}>
        Avoid these common mistakes when working with JSON and Kotlin data classes:
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 32 }}>
        {[
          {
            title: '1. Forgetting @Serializable on nested classes',
            desc: 'Every class in the hierarchy needs @Serializable with kotlinx.serialization — not just the root class. Missing annotations cause SerializationException at runtime.',
            code: '// Wrong\ndata class Address(val city: String)  // missing @Serializable\n\n// Correct\n@Serializable\ndata class Address(val city: String)',
          },
          {
            title: '2. Non-nullable type receiving JSON null',
            desc: 'If JSON has null but your Kotlin type is non-nullable, kotlinx.serialization throws SerializationException. Gson silently passes null and causes NPE later.',
            code: '// Dangerous with Gson\ndata class User(val name: String)  // crash if JSON has "name": null\n\n// Safe\ndata class User(val name: String? = null)',
          },
          {
            title: '3. Missing ignoreUnknownKeys',
            desc: 'By default, kotlinx.serialization throws on unknown JSON keys. Set ignoreUnknownKeys = true when consuming external APIs that may add new fields.',
            code: 'val json = Json { ignoreUnknownKeys = true }',
          },
          {
            title: '4. Forgetting to register KotlinModule with Jackson',
            desc: 'Without KotlinModule, Jackson cannot handle Kotlin default parameters, null safety, or data class constructors correctly.',
            code: 'val mapper = ObjectMapper().registerModule(KotlinModule.Builder().build())',
          },
          {
            title: '5. Using data class with Room as an @Embedded vs @TypeConverter',
            desc: 'Room cannot serialize complex nested objects to columns automatically. Use @Embedded for flat objects or @TypeConverter for List, Map, and custom types.',
            code: '@Entity\ndata class UserEntity(\n    @PrimaryKey val id: Int,\n    @Embedded val address: Address,  // flattened to columns\n    @TypeConverters val tags: List<String>  // needs TypeConverter\n)',
          },
          {
            title: '6. Snake_case mismatch',
            desc: 'JSON APIs typically use snake_case but Kotlin convention is camelCase. Always use @SerialName (kotlinx), @SerializedName (Gson), or @Json(name) (Moshi) for key mapping.',
            code: '// JSON: {"user_name": "alice"}\n@Serializable\ndata class User(\n    @SerialName("user_name") val userName: String  // correct mapping\n)',
          },
        ].map((pitfall, i) => (
          <div key={i} style={{ border: '1px solid #e2e8f0', borderRadius: 8, overflow: 'hidden' }}>
            <div style={{ background: '#fef2f2', padding: '10px 16px', borderBottom: '1px solid #fecaca' }}>
              <strong style={{ color: '#b91c1c', fontSize: 14 }}>{pitfall.title}</strong>
            </div>
            <div style={{ padding: '12px 16px', background: '#fff' }}>
              <p style={{ margin: '0 0 10px', color: '#475569', fontSize: 14 }}>{pitfall.desc}</p>
              <pre style={{
                background: '#1e293b',
                color: '#e2e8f0',
                padding: '12px 16px',
                borderRadius: 6,
                overflowX: 'auto',
                fontSize: 12,
                lineHeight: 1.5,
                margin: 0,
              }}>{pitfall.code}</pre>
            </div>
          </div>
        ))}
      </div>

      {/* Library comparison table */}
      <h2 style={{ fontSize: 24, fontWeight: 700, marginTop: 40, marginBottom: 12, color: '#0f172a' }}>
        Library Comparison Summary
      </h2>
      <div style={{ overflowX: 'auto', marginBottom: 36 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
          <thead>
            <tr style={{ background: '#f1f5f9' }}>
              <th style={{ padding: '10px 14px', textAlign: 'left', borderBottom: '2px solid #e2e8f0', color: '#374151', fontWeight: 600 }}>Criterion</th>
              <th style={{ padding: '10px 14px', textAlign: 'left', borderBottom: '2px solid #e2e8f0', color: '#374151', fontWeight: 600 }}>kotlinx.serialization</th>
              <th style={{ padding: '10px 14px', textAlign: 'left', borderBottom: '2px solid #e2e8f0', color: '#374151', fontWeight: 600 }}>Gson</th>
              <th style={{ padding: '10px 14px', textAlign: 'left', borderBottom: '2px solid #e2e8f0', color: '#374151', fontWeight: 600 }}>Moshi</th>
              <th style={{ padding: '10px 14px', textAlign: 'left', borderBottom: '2px solid #e2e8f0', color: '#374151', fontWeight: 600 }}>Jackson</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Multiplatform (KMP)', 'Yes', 'JVM only', 'JVM only', 'JVM only'],
              ['Kotlin null safety', 'Full support', 'Partial', 'Full support', 'With module'],
              ['Reflection', 'No (compile-time)', 'Yes', 'Optional (KSP)', 'Yes'],
              ['Setup complexity', 'Medium', 'Simple', 'Medium', 'Medium'],
              ['Spring Boot', 'Supported', 'Supported', 'Supported', 'Default'],
              ['Android Retrofit', 'Supported', 'Traditional', 'Supported', 'Supported'],
              ['Performance', 'Excellent', 'Good', 'Excellent', 'Good'],
              ['Recommendation', 'New KMP/Ktor projects', 'Simple Android', 'Android with codegen', 'Spring Boot'],
            ].map(([crit, kx, gson, moshi, jackson], i) => (
              <tr key={i} style={{ borderBottom: '1px solid #f1f5f9', background: i % 2 === 0 ? '#ffffff' : '#fafafa' }}>
                <td style={{ padding: '9px 14px', color: '#374151', fontWeight: 500 }}>{crit}</td>
                <td style={{ padding: '9px 14px', color: '#15803d' }}>{kx}</td>
                <td style={{ padding: '9px 14px', color: '#475569' }}>{gson}</td>
                <td style={{ padding: '9px 14px', color: '#475569' }}>{moshi}</td>
                <td style={{ padding: '9px 14px', color: '#475569' }}>{jackson}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* FAQ */}
      <h2 style={{ fontSize: 24, fontWeight: 700, marginTop: 40, marginBottom: 20, color: '#0f172a' }}>
        {t.faqTitle}
      </h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 40 }}>
        {faqItems.map((item, i) => (
          <div key={i} style={{
            border: '1px solid #e2e8f0',
            borderRadius: 8,
            overflow: 'hidden',
          }}>
            <div style={{ background: '#f8fafc', padding: '12px 16px', borderBottom: '1px solid #e2e8f0' }}>
              <strong style={{ color: '#1e293b', fontSize: 15 }}>Q: {item.q}</strong>
            </div>
            <div style={{ padding: '12px 16px', background: '#fff' }}>
              <p style={{ margin: 0, color: '#475569', fontSize: 14, lineHeight: 1.7 }}>A: {item.a}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Final CTA */}
      <div style={{
        background: '#f0f9ff',
        border: '1px solid #bae6fd',
        borderRadius: 10,
        padding: '24px',
        textAlign: 'center',
        marginBottom: 16,
      }}>
        <p style={{ margin: '0 0 16px', fontWeight: 600, fontSize: 16, color: '#0c4a6e' }}>
          Ready to convert your JSON to Kotlin data classes?
        </p>
        <Link href={toolLink} style={{
          display: 'inline-block',
          background: '#2563eb',
          color: '#fff',
          padding: '12px 32px',
          borderRadius: 8,
          fontWeight: 600,
          fontSize: 15,
          textDecoration: 'none',
        }}>
          {t.tryTool}
        </Link>
      </div>
    </article>
  );
}
