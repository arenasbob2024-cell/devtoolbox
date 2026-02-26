'use client';

import Link from 'next/link';

export default function JsonToKotlinDataClassGuide({ lang }: { lang: string }) {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is the best library for JSON to Kotlin data class conversion?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'For new projects, kotlinx.serialization is the recommended choice. It is maintained by JetBrains, uses compile-time code generation instead of reflection, supports Kotlin Multiplatform, and natively understands Kotlin null safety and default values. Moshi is excellent for Android projects already using Retrofit. Avoid Gson for new Kotlin projects as it does not respect Kotlin null safety.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I handle nullable fields when converting JSON to Kotlin?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Declare optional or nullable JSON fields using Kotlin nullable types with a default value: val nickname: String? = null. With kotlinx.serialization, properties that have default values are automatically treated as optional during deserialization. Enable ignoreUnknownKeys = true in the Json builder to gracefully handle API evolution.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I convert JSON to Kotlin data class online for free?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. DevToolBox offers a free online JSON to Kotlin converter that instantly generates Kotlin data classes with proper type inference, null safety annotations, and serialization annotations for kotlinx.serialization, Moshi, or Gson.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the difference between Kotlin data class and a regular class for JSON?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'A Kotlin data class automatically generates equals(), hashCode(), toString(), copy(), and componentN() functions based on its primary constructor parameters. This makes data classes ideal for JSON models because you get value-based equality, readable debug output, and easy immutable copying without writing boilerplate code. A regular class does not generate these methods.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I convert nested JSON arrays to Kotlin data classes?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'For nested JSON arrays, create a data class for the array element type and declare the field as List<ElementType> in the parent class. With kotlinx.serialization, nested lists work automatically. With Moshi, use Types.newParameterizedType(List::class.java, ElementType::class.java) to create the adapter. Always prefer List over Array in data classes for correct equals/hashCode behavior.',
        },
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* TL;DR Box */}
      <div style={{ background: '#f0f9ff', border: '1px solid #bae6fd', borderRadius: '8px', padding: '16px 20px', marginBottom: '24px' }}>
        <p style={{ fontWeight: 700, marginBottom: '8px', fontSize: '1.05em' }}>TL;DR</p>
        <p style={{ margin: 0 }}>
          Converting <strong>JSON to Kotlin data classes</strong> is essential for type-safe Android and server-side development. Use <strong>kotlinx.serialization</strong> for new projects, <strong>Moshi</strong> for Retrofit-heavy Android apps, and avoid Gson in new Kotlin code. Kotlin data classes give you null safety, default values, <code>copy()</code>, and destructuring out of the box. Need instant conversion? Try our <Link href={`/${lang}/tools/json-to-kotlin`}>free JSON to Kotlin converter</Link>.
        </p>
      </div>

      {/* Key Takeaways */}
      <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '16px 20px', marginBottom: '24px' }}>
        <p style={{ fontWeight: 700, marginBottom: '8px', fontSize: '1.05em' }}>Key Takeaways</p>
        <ul style={{ margin: 0, paddingLeft: '20px' }}>
          <li>Kotlin data classes map JSON objects to type-safe, immutable models with built-in <code>equals()</code>, <code>hashCode()</code>, and <code>copy()</code>.</li>
          <li><strong>kotlinx.serialization</strong> is the JetBrains-maintained library that uses compile-time codegen, supports Kotlin Multiplatform, and respects null safety.</li>
          <li>Use <code>@SerialName</code>, <code>@Json(name = ...)</code>, or <code>@SerializedName</code> to bridge snake_case JSON keys and camelCase Kotlin properties.</li>
          <li>Declare optional JSON fields as nullable with defaults (<code>val field: String? = null</code>) to prevent runtime crashes.</li>
          <li>Nested JSON objects produce separate data classes; arrays become <code>List&lt;T&gt;</code> instead of <code>Array&lt;T&gt;</code>.</li>
          <li>Sealed classes handle polymorphic JSON with compile-time exhaustiveness in <code>when</code> expressions.</li>
          <li>Retrofit, Ktor, and Spring Boot all integrate seamlessly with Kotlin serialization libraries for API consumption.</li>
        </ul>
      </div>

      {/* Section 1: Why Kotlin Data Classes for JSON */}
      <h2>Why Kotlin Data Classes for JSON</h2>
      <p>
        When your Android app or Kotlin backend consumes a REST API, the JSON response must be converted into strongly typed objects before your business logic can use it. Kotlin <strong>data classes</strong> are the ideal target for this conversion because they combine immutability, null safety, and auto-generated utility methods in a concise syntax.
      </p>
      <p>
        Unlike Java POJOs that require manually writing getters, setters, <code>equals()</code>, <code>hashCode()</code>, and <code>toString()</code>, a Kotlin data class generates all of these from its primary constructor parameters. This eliminates hundreds of lines of boilerplate in a typical API model layer. Combined with Kotlin null safety (<code>String</code> vs <code>String?</code>), you get compile-time protection against <code>NullPointerException</code> that Java cannot provide.
      </p>
      <p>
        Whether you are building with Retrofit on Android, Ktor for server-side Kotlin, or a Kotlin Multiplatform (KMP) shared module, a reliable <strong>JSON to Kotlin data class</strong> converter turns raw JSON into production-ready models in seconds. If you need to do this right now, use our <Link href={`/${lang}/tools/json-to-kotlin`}>online JSON to Kotlin converter</Link>.
      </p>

      {/* Section 2: Basic JSON to Kotlin Conversion */}
      <h2>Basic JSON to Kotlin Conversion</h2>
      <p>
        The foundation of <strong>JSON to Kotlin</strong> conversion is understanding how JSON types map to Kotlin types. Here is the complete mapping table:
      </p>
      <table>
        <thead>
          <tr><th>JSON Type</th><th>Example</th><th>Kotlin Type</th><th>Notes</th></tr>
        </thead>
        <tbody>
          <tr><td>string</td><td><code>{'"hello"'}</code></td><td><code>String</code></td><td>Non-nullable by default; use <code>String?</code> when nullable</td></tr>
          <tr><td>number (integer)</td><td><code>42</code></td><td><code>Int</code> / <code>Long</code></td><td>Use <code>Long</code> for values exceeding 2^31-1</td></tr>
          <tr><td>number (decimal)</td><td><code>3.14</code></td><td><code>Double</code> / <code>BigDecimal</code></td><td>Use <code>BigDecimal</code> for financial data</td></tr>
          <tr><td>boolean</td><td><code>true</code></td><td><code>Boolean</code></td><td>Non-nullable by default</td></tr>
          <tr><td>null</td><td><code>null</code></td><td><code>T?</code></td><td>Kotlin distinguishes nullable from non-nullable</td></tr>
          <tr><td>array</td><td><code>[1, 2]</code></td><td><code>{'List<T>'}</code></td><td>Prefer immutable <code>List</code> over <code>Array</code></td></tr>
          <tr><td>object</td><td><code>{'{}'}</code></td><td>Nested <code>data class</code></td><td>Strongly typed classes preferred over <code>{'Map<String, Any>'}</code></td></tr>
        </tbody>
      </table>
      <p>
        Here is a simple JSON payload and the resulting Kotlin data class:
      </p>
      <pre><code className="language-json">{`{
  "id": 1,
  "name": "Alice",
  "email": "alice@example.com",
  "is_active": true,
  "score": 98.5
}`}</code></pre>
      <pre><code className="language-kotlin">{`data class User(
    val id: Int,
    val name: String,
    val email: String,
    val isActive: Boolean,
    val score: Double
)`}</code></pre>
      <p>
        Notice how the JSON key <code>is_active</code> becomes <code>isActive</code> in camelCase. Serialization libraries use annotations to handle this mapping, which we cover in detail below. You can also generate this automatically with our <Link href={`/${lang}/tools/json-to-kotlin`}>JSON to Kotlin tool</Link>.
      </p>

      {/* Section 3: Nested Objects and Lists */}
      <h2>Nested Objects and Lists</h2>
      <p>
        Real-world APIs rarely return flat JSON. Most responses contain nested objects, arrays of objects, and deeply layered structures. Each nested JSON object should produce a separate Kotlin data class for maximum type safety and reusability.
      </p>
      <pre><code className="language-json">{`{
  "order_id": 5001,
  "customer": {
    "name": "Bob",
    "email": "bob@example.com",
    "address": {
      "street": "123 Main St",
      "city": "Springfield",
      "zip_code": "62704"
    }
  },
  "items": [
    { "product": "Keyboard", "quantity": 1, "price": 79.99 },
    { "product": "Mouse", "quantity": 2, "price": 29.99 }
  ],
  "total": 139.97
}`}</code></pre>
      <pre><code className="language-kotlin">{`import kotlinx.serialization.*

@Serializable
data class Order(
    @SerialName("order_id") val orderId: Long,
    val customer: Customer,
    val items: List<OrderItem>,
    val total: Double
)

@Serializable
data class Customer(
    val name: String,
    val email: String,
    val address: Address
)

@Serializable
data class Address(
    val street: String,
    val city: String,
    @SerialName("zip_code") val zipCode: String
)

@Serializable
data class OrderItem(
    val product: String,
    val quantity: Int,
    val price: Double
)`}</code></pre>
      <p>
        Each level of nesting produces a separate data class. Prefer top-level declarations over inner classes for better reusability across your codebase. For arrays of objects, always use <code>{'List<T>'}</code> instead of <code>{'Array<T>'}</code> because <code>List</code> participates correctly in <code>equals()</code> and <code>hashCode()</code> comparisons generated by data classes.
      </p>
      <p>
        If you also work with Java models, check out our <Link href={`/${lang}/tools/json-to-java`}>JSON to Java converter</Link> for generating POJOs from the same JSON.
      </p>

      {/* Section 4: Nullable Fields and Default Values */}
      <h2>Nullable Fields and Default Values</h2>
      <p>
        One of Kotlin greatest strengths over Java is its type system that distinguishes between nullable (<code>String?</code>) and non-nullable (<code>String</code>) types at compile time. When converting JSON to Kotlin, you must decide which properties can be <code>null</code> and which ones are always present.
      </p>
      <pre><code className="language-kotlin">{`@Serializable
data class UserProfile(
    val id: Long,
    val username: String,                       // required, never null
    val displayName: String? = null,            // optional, may be absent
    val bio: String = "",                       // optional with non-null default
    val followerCount: Int = 0,                 // numeric default
    val isVerified: Boolean = false,            // boolean default
    val avatarUrl: String? = null,              // nullable, may be absent
    val tags: List<String> = emptyList()        // empty list default
)`}</code></pre>
      <p>
        With <strong>kotlinx.serialization</strong>, properties that have default values are automatically treated as optional during deserialization. If the JSON payload omits <code>displayName</code>, the data class constructor uses <code>null</code> as the default. If the JSON omits <code>bio</code>, it defaults to an empty string. This behavior prevents crashes when APIs evolve and start omitting fields.
      </p>
      <p>
        Always enable <code>ignoreUnknownKeys = true</code> in your <code>Json</code> builder so new fields added by the backend do not break your client:
      </p>
      <pre><code className="language-kotlin">{`val json = Json {
    ignoreUnknownKeys = true    // ignore new fields from the server
    isLenient = true            // accept slightly malformed JSON
    coerceInputValues = true    // coerce nulls to defaults for non-null types
}`}</code></pre>

      {/* Section 5: kotlinx.serialization Setup and Usage */}
      <h2>kotlinx.serialization Setup and Usage</h2>
      <p>
        <strong>kotlinx.serialization</strong> is the official Kotlin serialization library maintained by JetBrains. It uses compile-time code generation instead of reflection, resulting in faster performance and smaller binary sizes. It is the recommended choice for all new Kotlin projects, including Android, KMP, and server-side.
      </p>
      <p>
        <strong>Gradle setup (Kotlin DSL):</strong>
      </p>
      <pre><code className="language-kotlin">{`// build.gradle.kts
plugins {
    kotlin("jvm") version "1.9.22"
    kotlin("plugin.serialization") version "1.9.22"
}

dependencies {
    implementation("org.jetbrains.kotlinx:kotlinx-serialization-json:1.6.3")
}`}</code></pre>
      <p>
        <strong>Complete usage example:</strong>
      </p>
      <pre><code className="language-json">{`{
  "user_id": 1001,
  "user_name": "Alice",
  "email": "alice@example.com",
  "is_active": true,
  "balance": 1250.75,
  "tags": ["admin", "developer"],
  "address": {
    "street": "123 Main St",
    "city": "Springfield",
    "zip_code": "62704"
  }
}`}</code></pre>
      <pre><code className="language-kotlin">{`import kotlinx.serialization.*
import kotlinx.serialization.json.*

@Serializable
data class User(
    @SerialName("user_id") val userId: Long,
    @SerialName("user_name") val userName: String,
    val email: String,
    @SerialName("is_active") val isActive: Boolean,
    val balance: Double,
    val tags: List<String> = emptyList(),
    val address: Address? = null
)

@Serializable
data class Address(
    val street: String,
    val city: String,
    @SerialName("zip_code") val zipCode: String
)

// Configure the Json instance
val json = Json {
    ignoreUnknownKeys = true
    isLenient = true
    coerceInputValues = true
}

// Deserialize a single object
val user: User = json.decodeFromString(jsonString)

// Deserialize a list of objects
val users: List<User> = json.decodeFromString(jsonArrayString)

// Serialize back to JSON
val outputJson: String = json.encodeToString(user)`}</code></pre>
      <p>
        The <code>@SerialName</code> annotation maps snake_case JSON keys to camelCase Kotlin properties. The <code>@Serializable</code> annotation triggers compile-time adapter generation, so no reflection is needed at runtime.
      </p>

      {/* Section 6: Gson and Moshi Alternatives */}
      <h2>Gson and Moshi Alternatives</h2>
      <p>
        While kotlinx.serialization is the recommended library, many Android projects use <strong>Moshi</strong> or <strong>Gson</strong>. Here is how both compare for <strong>JSON to Kotlin</strong> conversion.
      </p>

      <h3>Moshi (Recommended for Android with Retrofit)</h3>
      <pre><code className="language-kotlin">{`import com.squareup.moshi.*
import com.squareup.moshi.kotlin.reflect.KotlinJsonAdapterFactory

@JsonClass(generateAdapter = true)
data class User(
    @Json(name = "user_id") val userId: Long,
    @Json(name = "user_name") val userName: String,
    val email: String,
    @Json(name = "is_active") val isActive: Boolean,
    val balance: Double,
    val tags: List<String> = emptyList(),
    val address: Address? = null
)

// Build the Moshi instance
val moshi: Moshi = Moshi.Builder()
    .addLast(KotlinJsonAdapterFactory())
    .build()

// Deserialize
val adapter: JsonAdapter<User> = moshi.adapter(User::class.java)
val user: User? = adapter.fromJson(jsonString)

// Deserialize a list
val listType = Types.newParameterizedType(List::class.java, User::class.java)
val listAdapter: JsonAdapter<List<User>> = moshi.adapter(listType)
val users: List<User>? = listAdapter.fromJson(jsonArrayString)`}</code></pre>
      <p>
        Moshi respects Kotlin null safety and throws clear errors when a non-nullable field receives <code>null</code>. The <code>@JsonClass(generateAdapter = true)</code> annotation enables compile-time adapter generation, avoiding reflection overhead.
      </p>

      <h3>Gson (Legacy Projects Only)</h3>
      <pre><code className="language-kotlin">{`import com.google.gson.Gson
import com.google.gson.annotations.SerializedName

// WARNING: Gson does NOT respect Kotlin null safety!
data class User(
    @SerializedName("user_id") val userId: Long,
    @SerializedName("user_name") val userName: String,
    val email: String,
    @SerializedName("is_active") val isActive: Boolean,
    val balance: Double,
    val tags: List<String> = emptyList(),
    val address: Address? = null  // always use ? with Gson
)

val gson = Gson()
val user: User = gson.fromJson(jsonString, User::class.java)

// SAFETY TIP: validate after Gson deserialization
fun User.validate(): User {
    requireNotNull(userName) { "userName must not be null" }
    requireNotNull(email) { "email must not be null" }
    return this
}`}</code></pre>
      <p>
        <strong>Avoid Gson for new Kotlin projects.</strong> Gson was designed for Java and uses reflection that bypasses Kotlin constructors. It can silently assign <code>null</code> to non-nullable properties, leading to crashes far from the deserialization site. If you are maintaining a legacy codebase, always declare fields as nullable when using Gson or add explicit validation.
      </p>

      {/* Section 7: Retrofit Integration for API Calls */}
      <h2>Retrofit Integration for API Calls</h2>
      <p>
        Retrofit is the most popular HTTP client for Android development. It integrates with all three JSON libraries through converter factories. Here is a complete Retrofit setup using kotlinx.serialization:
      </p>
      <pre><code className="language-kotlin">{`import retrofit2.Retrofit
import retrofit2.http.GET
import retrofit2.http.Path
import com.jakewharton.retrofit2.converter.kotlinx.serialization.asConverterFactory
import kotlinx.serialization.json.Json
import okhttp3.MediaType.Companion.toMediaType

// Define your API interface
interface UserApi {
    @GET("users/{id}")
    suspend fun getUser(@Path("id") userId: Long): User

    @GET("users")
    suspend fun getUsers(): List<User>
}

// Create the Retrofit instance
val contentType = "application/json".toMediaType()
val json = Json { ignoreUnknownKeys = true }

val retrofit = Retrofit.Builder()
    .baseUrl("https://api.example.com/")
    .addConverterFactory(json.asConverterFactory(contentType))
    .build()

val api = retrofit.create(UserApi::class.java)

// Usage in a ViewModel or coroutine scope
val user = api.getUser(1001)
val allUsers = api.getUsers()`}</code></pre>
      <p>
        For <strong>Moshi</strong>, replace the converter factory with <code>MoshiConverterFactory.create(moshi)</code>. For <strong>Ktor</strong> on server-side or KMP projects, use the built-in <code>ContentNegotiation</code> plugin with <code>kotlinx.serialization</code>:
      </p>
      <pre><code className="language-kotlin">{`// Ktor client setup
val client = HttpClient(CIO) {
    install(ContentNegotiation) {
        json(Json { ignoreUnknownKeys = true })
    }
}

// Usage
val user: User = client.get("https://api.example.com/users/1001").body()`}</code></pre>
      <p>
        For Flutter/Dart projects consuming the same API, see our <Link href={`/${lang}/tools/json-to-dart`}>JSON to Dart converter</Link>.
      </p>

      {/* Section 8: Best Practices */}
      <h2>Best Practices: Naming, @SerializedName, and @Json</h2>
      <p>
        Follow these best practices when you <strong>convert JSON to Kotlin data classes</strong> for production applications:
      </p>
      <p>
        <strong>1. Use annotation-based name mapping.</strong> Most REST APIs use <code>snake_case</code> while Kotlin conventions use <code>camelCase</code>. Always annotate properties with the appropriate library annotation:
      </p>
      <pre><code className="language-kotlin">{`// kotlinx.serialization
@SerialName("created_at") val createdAt: String

// Moshi
@Json(name = "created_at") val createdAt: String

// Gson
@SerializedName("created_at") val createdAt: String`}</code></pre>
      <p>
        <strong>2. Keep data classes immutable.</strong> Use <code>val</code> (read-only) properties instead of <code>var</code>. Immutable data classes are thread-safe, predictable, and work correctly with <code>copy()</code>. When you need to update a field, use <code>copy(field = newValue)</code> to create a new instance.
      </p>
      <p>
        <strong>3. Validate at the boundary.</strong> Add validation in a companion object factory or an <code>init</code> block so invalid JSON data fails fast at deserialization time:
      </p>
      <pre><code className="language-kotlin">{`data class Product(
    val id: Long,
    val name: String,
    val price: Double
) {
    init {
        require(name.isNotBlank()) { "Product name cannot be blank" }
        require(price >= 0) { "Price must be non-negative" }
    }
}`}</code></pre>
      <p>
        <strong>4. Prefer kotlinx.serialization for new projects.</strong> It is the only library that is first-party Kotlin, supports KMP, avoids reflection, and fully respects null safety and default values.
      </p>
      <p>
        <strong>5. Use sealed classes for polymorphic JSON.</strong> When a JSON response contains objects with a type discriminator field, model them as a Kotlin sealed class hierarchy. This gives you exhaustive <code>when</code> expressions and eliminates unsafe casting:
      </p>
      <pre><code className="language-kotlin">{`@Serializable
sealed class Notification {
    abstract val message: String
}

@Serializable @SerialName("email")
data class EmailNotification(
    override val message: String,
    val recipient: String
) : Notification()

@Serializable @SerialName("push")
data class PushNotification(
    override val message: String,
    val title: String
) : Notification()

// Exhaustive when (compiler enforces all branches)
when (notification) {
    is EmailNotification -> sendEmail(notification.recipient)
    is PushNotification -> showPush(notification.title)
}`}</code></pre>
      <p>
        <strong>6. Use extension functions for clean parsing.</strong> Kotlin extension functions let you add deserialization helpers to <code>String</code> or other types:
      </p>
      <pre><code className="language-kotlin">{`inline fun <reified T> String.parseJson(): T =
    Json { ignoreUnknownKeys = true }.decodeFromString(this)

// Usage
val user: User = jsonString.parseJson()
val orders: List<Order> = jsonArrayString.parseJson()`}</code></pre>
      <p>
        <strong>7. Handle API evolution gracefully.</strong> Always set <code>ignoreUnknownKeys = true</code> and give optional properties default values. This prevents deserialization failures when the backend adds new fields or removes deprecated ones.
      </p>

      {/* Section 9: Kotlin vs Java for JSON Handling */}
      <h2>Kotlin vs Java for JSON Handling</h2>
      <p>
        Kotlin offers significant advantages over Java when working with JSON APIs. Here is a side-by-side comparison:
      </p>
      <table>
        <thead>
          <tr><th>Feature</th><th>Kotlin</th><th>Java</th></tr>
        </thead>
        <tbody>
          <tr><td>Null safety</td><td>Compile-time enforcement (<code>String?</code> vs <code>String</code>)</td><td>Runtime only (<code>@Nullable</code> is advisory)</td></tr>
          <tr><td>Boilerplate</td><td>Data class auto-generates equals/hashCode/toString/copy</td><td>Requires Lombok, Records (16+), or manual code</td></tr>
          <tr><td>Default values</td><td>Built into constructor syntax</td><td>Requires builder pattern or overloaded constructors</td></tr>
          <tr><td>Immutability</td><td><code>val</code> keyword, <code>copy()</code> for updates</td><td>Manual final fields, no built-in copy</td></tr>
          <tr><td>Extension functions</td><td><code>{'String.toUser()'}</code> adds parsing to any type</td><td>Not available; use static utility methods</td></tr>
          <tr><td>Sealed classes</td><td>Exhaustive <code>when</code> for polymorphic JSON</td><td>Sealed interfaces (Java 17+) with limited pattern matching</td></tr>
          <tr><td>Multiplatform</td><td>kotlinx.serialization works on JVM, JS, Native, WASM</td><td>JVM only</td></tr>
          <tr><td>Destructuring</td><td><code>{'val (id, name) = user'}</code></td><td>Not available</td></tr>
        </tbody>
      </table>
      <p>
        Kotlin data classes with kotlinx.serialization produce roughly 60-70% less code than equivalent Java POJOs with Jackson. The compile-time null safety alone prevents an entire category of runtime crashes that plague Java JSON parsing. If your project supports both languages, see our <Link href={`/${lang}/tools/json-to-java`}>JSON to Java converter</Link> for generating Java models.
      </p>
      <p>
        For TypeScript developers working on the frontend that consumes the same API, check out our <Link href={`/${lang}/blog/json-to-typescript-complete-guide`}>JSON to TypeScript complete guide</Link>.
      </p>

      {/* Section 10: FAQ */}
      <h2>Frequently Asked Questions</h2>

      <h3>What is the best library for JSON to Kotlin data class conversion?</h3>
      <p>
        For new projects, <strong>kotlinx.serialization</strong> is the recommended choice. It is maintained by JetBrains, uses compile-time code generation (no reflection), supports Kotlin Multiplatform, and natively understands Kotlin null safety and default values. <strong>Moshi</strong> is an excellent alternative for Android projects that already rely on Retrofit, as it also offers compile-time codegen and respects Kotlin nullability. Avoid <strong>Gson</strong> for new Kotlin projects because it was designed for Java and cannot enforce Kotlin null safety.
      </p>

      <h3>How do I handle nullable and optional fields when converting JSON to Kotlin?</h3>
      <p>
        Declare optional fields as nullable with a default value: <code>val nickname: String? = null</code>. With kotlinx.serialization, properties that have default values are automatically treated as optional during deserialization. With Moshi, the Kotlin codegen adapter handles nullable properties correctly. With Gson, always declare potentially absent fields as nullable because Gson will silently set them to <code>null</code> even if declared as non-nullable in Kotlin.
      </p>

      <h3>What is the difference between a Kotlin data class and a regular class for JSON?</h3>
      <p>
        A Kotlin <code>data class</code> automatically generates <code>equals()</code>, <code>hashCode()</code>, <code>toString()</code>, <code>copy()</code>, and <code>componentN()</code> (destructuring) functions based on its primary constructor parameters. This makes data classes ideal for JSON models because you get value-based equality, readable debug output, and immutable copying without writing any additional code. A regular class does not generate these functions. Use <code>data class</code> for all JSON models unless you need custom equality logic or class inheritance.
      </p>

      <h3>Can I convert JSON to Kotlin data class online without installing tools?</h3>
      <p>
        Yes. Our free online <Link href={`/${lang}/tools/json-to-kotlin`}>JSON to Kotlin converter</Link> at DevToolBox lets you paste any JSON and instantly generate Kotlin data classes with proper type inference, null safety annotations, and serialization annotations for kotlinx.serialization, Moshi, or Gson. No IDE plugin or CLI tool required.
      </p>

      <h3>How do I convert nested JSON arrays to Kotlin data classes?</h3>
      <p>
        For nested JSON arrays like <code>{'{"users": [{"name": "Alice"}, {"name": "Bob"}]}'}</code>, create a data class for the array element (<code>data class User(val name: String)</code>) and declare the field as <code>val users: List&lt;User&gt;</code> in the parent class. With kotlinx.serialization, this works automatically. With Moshi, use <code>Types.newParameterizedType(List::class.java, User::class.java)</code> to create the correct adapter. Our <Link href={`/${lang}/tools/json-to-kotlin`}>JSON to Kotlin tool</Link> handles nested arrays automatically.
      </p>

      {/* Conclusion */}
      <p style={{ marginTop: 32 }}>
        Converting <strong>JSON to Kotlin data classes</strong> is a foundational skill for every Kotlin developer working with APIs. From <strong>kotlinx.serialization</strong> for Kotlin Multiplatform to <strong>Moshi</strong> for Android Retrofit integration, choosing the right library and following idiomatic patterns ensures type-safe, null-safe, and maintainable code. Use our free online <Link href={`/${lang}/tools/json-to-kotlin`}>JSON to Kotlin converter</Link> for instant data class generation, and refer to this guide whenever you need to handle nested objects, nullable fields, or polymorphic JSON structures.
      </p>

      {/* Related Tools and Guides */}
      <h2>Related Developer Tools and Guides</h2>
      <ul>
        <li><Link href={`/${lang}/tools/json-to-kotlin`}>JSON to Kotlin Converter</Link> - Convert JSON to Kotlin data classes instantly</li>
        <li><Link href={`/${lang}/tools/json-to-java`}>JSON to Java Converter</Link> - Generate Java POJOs from JSON</li>
        <li><Link href={`/${lang}/tools/json-to-dart`}>JSON to Dart Converter</Link> - Generate Dart/Flutter models from JSON</li>
        <li><Link href={`/${lang}/blog/json-to-typescript-complete-guide`}>JSON to TypeScript Complete Guide</Link> - TypeScript interface generation guide</li>
        <li><Link href={`/${lang}/tools/json-to-typescript`}>JSON to TypeScript Converter</Link> - Create TypeScript interfaces from JSON</li>
        <li><Link href={`/${lang}/tools/json-to-python`}>JSON to Python Converter</Link> - Create Python dataclasses from JSON</li>
        <li><Link href={`/${lang}/tools/json-to-csharp`}>JSON to C# Converter</Link> - Generate C# classes from JSON</li>
        <li><Link href={`/${lang}/tools/json-to-go`}>JSON to Go Converter</Link> - Create Go structs from JSON</li>
        <li><Link href={`/${lang}/tools/json-formatter`}>JSON Formatter</Link> - Format and validate JSON data</li>
      </ul>
    </>
  );
}
