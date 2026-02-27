'use client';
import Link from 'next/link';

/* ------------------------------------------------------------------ */
/*  JSON to Java Class Online Guide                                     */
/* ------------------------------------------------------------------ */

export default function JsonToJavaOnlineGuide({ lang }: { lang: string }) {
  const l = lang || 'en';
  const toolLink = `/${l}/tools/json-to-java`;

  /* ---------- translations ---------- */
  const translations: Record<string, {
    tldr: string;
    whyTitle: string;
    takeawaysTitle: string;
    tryTool: string;
    faqTitle: string;
  }> = {
    zh: {
      tldr: 'JSON 转 Java 类工具可以从任意 JSON 数据生成带有 Jackson 注解的 POJO、Lombok 数据类或 Java Record，消除手动编码并防止类型错误。',
      whyTitle: '为什么要将 JSON 转换为 Java 类？',
      takeawaysTitle: '核心要点',
      tryTool: '立即使用免费的 JSON 转 Java 类工具 \u2192',
      faqTitle: '常见问题',
    },
    en: {
      tldr: 'A JSON to Java class tool generates annotated POJOs, Lombok data classes, or Java Records from any JSON — eliminating manual coding and preventing type errors in your Spring Boot or Android projects.',
      whyTitle: 'Why Convert JSON to Java Classes?',
      takeawaysTitle: 'Key Takeaways',
      tryTool: 'Try our free JSON to Java Class tool \u2192',
      faqTitle: 'Frequently Asked Questions',
    },
  };

  const t = translations[l] || translations['en'];

  /* ---------- FAQ items ---------- */
  const faqItems = [
    {
      q: 'What is a Java POJO and how does it differ from a Java Record?',
      a: 'A Plain Old Java Object (POJO) is a regular Java class with private fields, a no-arg constructor, and public getters/setters. It is mutable by default and works with all Java versions. A Java Record (introduced in Java 16 as stable) is an immutable data carrier declared with the record keyword. Records automatically generate a canonical constructor, accessor methods, equals(), hashCode(), and toString(). Use Records for immutable data transfer objects and POJOs when mutability or legacy framework compatibility is required.',
    },
    {
      q: 'Which Jackson annotation maps a JSON field name to a differently named Java field?',
      a: '@JsonProperty is the annotation you need. Place it on the field or its getter: @JsonProperty("first_name") private String firstName; This tells Jackson to map the JSON key "first_name" to the Java field firstName during both deserialization (JSON \u2192 Java) and serialization (Java \u2192 JSON). When the JSON key and Java field name are identical, you can omit the annotation.',
    },
    {
      q: 'How do I deserialize a JSON array into a Java List with Jackson?',
      a: 'Use ObjectMapper.readValue() with a TypeReference to preserve generic type information at runtime: List<User> users = mapper.readValue(json, new TypeReference<List<User>>() {}); Without TypeReference, Java type erasure would lose the <User> parameter and Jackson would produce a List<LinkedHashMap> instead. For nested generics like List<Map<String, User>>, wrap the full type in the TypeReference.',
    },
    {
      q: 'What does @JsonIgnoreProperties(ignoreUnknown = true) do?',
      a: 'By default, Jackson throws an UnrecognizedPropertyException when the JSON contains a field that has no corresponding Java field. Adding @JsonIgnoreProperties(ignoreUnknown = true) at the class level instructs Jackson to silently skip any unknown fields during deserialization. This is recommended in production APIs where the server may add new fields in the future without breaking existing clients.',
    },
    {
      q: 'How do I use Lombok to reduce boilerplate in JSON-mapped Java classes?',
      a: 'Annotate your class with @Data (generates getters, setters, equals, hashCode, toString), @NoArgsConstructor (required by Jackson for deserialization), and @AllArgsConstructor. Add @Builder if you want a fluent builder pattern. Keep @JsonProperty on fields where the JSON key name differs from the Java field name. Make sure lombok is on the annotation processor path in Maven or Gradle.',
    },
    {
      q: 'How do I handle null fields and optional values in Jackson?',
      a: 'Annotate your class with @JsonInclude(JsonInclude.Include.NON_NULL) to prevent null fields from appearing in serialized JSON output. During deserialization, missing JSON fields are assigned null for objects or default values for primitives. You can also use Optional<T> fields, but you must register the Jdk8Module: mapper.registerModule(new Jdk8Module()); Alternatively, use @JsonSetter(nulls = Nulls.SKIP) to skip null assignment.',
    },
    {
      q: 'What is the difference between Jackson and Gson for JSON to Java conversion?',
      a: 'Jackson is the de-facto standard in Spring Boot and Spring Framework, offering superior performance, extensive configuration, and a rich annotation set. Gson, developed by Google, has a simpler API with @SerializedName for field mapping and uses TypeToken for generic types. Jackson handles more edge cases (polymorphism, property naming strategies, modules for Java 8 types and dates) but requires more dependency setup. Gson is a good choice for Android projects or simpler use cases.',
    },
    {
      q: 'How do I handle Java 8 date types like LocalDateTime with Jackson?',
      a: 'Register the JavaTimeModule and disable WRITE_DATES_AS_TIMESTAMPS: ObjectMapper mapper = new ObjectMapper(); mapper.registerModule(new JavaTimeModule()); mapper.disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS); Then annotate your date field: @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd\'T\'HH:mm:ss") private LocalDateTime createdAt; This serializes the date as an ISO-8601 string rather than a numeric timestamp.',
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
          <li>Use <code style={{ background: '#f1f5f9', padding: '1px 4px', borderRadius: 3 }}>@JsonProperty</code> to map JSON snake_case keys to Java camelCase fields without renaming your field.</li>
          <li>Always add <code style={{ background: '#f1f5f9', padding: '1px 4px', borderRadius: 3 }}>@JsonIgnoreProperties(ignoreUnknown = true)</code> to avoid breaking on API changes.</li>
          <li>For generic collections, use <code style={{ background: '#f1f5f9', padding: '1px 4px', borderRadius: 3 }}>TypeReference</code> with Jackson or <code style={{ background: '#f1f5f9', padding: '1px 4px', borderRadius: 3 }}>TypeToken</code> with Gson to preserve generic type info.</li>
          <li>Lombok <code style={{ background: '#f1f5f9', padding: '1px 4px', borderRadius: 3 }}>@Data</code> + <code style={{ background: '#f1f5f9', padding: '1px 4px', borderRadius: 3 }}>@NoArgsConstructor</code> reduces boilerplate while staying Jackson-compatible.</li>
          <li>Java Records (Java 16+) provide immutable POJOs with minimal code; add <code style={{ background: '#f1f5f9', padding: '1px 4px', borderRadius: 3 }}>@JsonCreator</code> for custom deserialization.</li>
          <li>Register <code style={{ background: '#f1f5f9', padding: '1px 4px', borderRadius: 3 }}>JavaTimeModule</code> to handle <code style={{ background: '#f1f5f9', padding: '1px 4px', borderRadius: 3 }}>LocalDateTime</code> and <code style={{ background: '#f1f5f9', padding: '1px 4px', borderRadius: 3 }}>ZonedDateTime</code> without numeric timestamps.</li>
        </ul>
      </div>

      {/* ---- Section 1: Why Convert JSON to Java Classes ---- */}
      <h2 style={{ fontSize: 26, fontWeight: 800, marginTop: 48, marginBottom: 16 }}>
        Why Convert JSON to Java Classes?
      </h2>
      <p style={{ fontSize: 15, marginBottom: 12 }}>
        JSON is the universal data exchange format for REST APIs, configuration files, and messaging queues. When
        you consume a JSON API in Java, you have three main approaches: parse it manually with a
        <code style={{ background: '#f1f5f9', padding: '1px 5px', borderRadius: 3 }}>JSONObject</code>, work with raw
        <code style={{ background: '#f1f5f9', padding: '1px 5px', borderRadius: 3 }}>Map&lt;String, Object&gt;</code> values, or
        deserialize into a strongly typed Java class. The third option is almost always the right one.
      </p>

      <h3 style={{ fontSize: 20, fontWeight: 700, marginTop: 24, marginBottom: 10 }}>POJO vs Records vs Lombok</h3>
      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14, textAlign: 'left' }}>
          <thead>
            <tr style={{ background: '#f1f5f9', borderBottom: '2px solid #e2e8f0' }}>
              <th style={{ padding: '10px 14px', fontWeight: 700 }}>Approach</th>
              <th style={{ padding: '10px 14px', fontWeight: 700 }}>Boilerplate</th>
              <th style={{ padding: '10px 14px', fontWeight: 700 }}>Mutable</th>
              <th style={{ padding: '10px 14px', fontWeight: 700 }}>Best For</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Plain POJO', 'High', 'Yes', 'Legacy code, JPA entities'],
              ['Lombok @Data', 'Low', 'Yes', 'Spring Boot services, DTOs'],
              ['Java Record', 'Minimal', 'No', 'Immutable DTOs, value objects'],
            ].map(([approach, boilerplate, mutable, bestFor], idx) => (
              <tr key={idx} style={{ borderBottom: '1px solid #e2e8f0', background: idx % 2 === 0 ? '#fff' : '#f8fafc' }}>
                <td style={{ padding: '8px 14px', fontFamily: 'monospace', fontWeight: 600 }}>{approach}</td>
                <td style={{ padding: '8px 14px' }}>{boilerplate}</td>
                <td style={{ padding: '8px 14px' }}>{mutable}</td>
                <td style={{ padding: '8px 14px' }}>{bestFor}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p style={{ fontSize: 15, marginBottom: 12 }}>
        Type-safe Java classes give you compile-time checking, IDE autocompletion, refactoring support,
        and self-documenting code. The Jackson and Gson libraries make the JSON-to-Java mapping automatic
        through annotations — no manual field extraction required.
      </p>
      <p style={{ fontSize: 15, marginBottom: 20 }}>
        <Link href={toolLink} style={{ color: '#2563eb', fontWeight: 600 }}>
          Generate Java classes from JSON instantly with our free tool &rarr;
        </Link>
      </p>

      {/* ---- Section 2: Java POJO Structure ---- */}
      <h2 style={{ fontSize: 26, fontWeight: 800, marginTop: 48, marginBottom: 16 }}>
        Java POJO Structure with Jackson Annotations
      </h2>
      <p style={{ fontSize: 15, marginBottom: 12 }}>
        A production-ready POJO for JSON deserialization uses Jackson annotations to control field mapping and
        robustness. Given this JSON:
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
  "user_id": 42,
  "first_name": "Alice",
  "last_name": "Smith",
  "email_address": "alice@example.com",
  "is_active": true
}`}
      </pre>
      <p style={{ fontSize: 15, marginBottom: 8 }}>The corresponding Java POJO:</p>
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
{`import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public class User {

    @JsonProperty("user_id")
    private int userId;

    @JsonProperty("first_name")
    private String firstName;

    @JsonProperty("last_name")
    private String lastName;

    @JsonProperty("email_address")
    private String emailAddress;

    @JsonProperty("is_active")
    private boolean isActive;

    // Required by Jackson for deserialization
    public User() {}

    public User(int userId, String firstName, String lastName,
                String emailAddress, boolean isActive) {
        this.userId = userId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.emailAddress = emailAddress;
        this.isActive = isActive;
    }

    // Getters and setters
    public int getUserId() { return userId; }
    public void setUserId(int userId) { this.userId = userId; }

    public String getFirstName() { return firstName; }
    public void setFirstName(String firstName) { this.firstName = firstName; }

    public String getLastName() { return lastName; }
    public void setLastName(String lastName) { this.lastName = lastName; }

    public String getEmailAddress() { return emailAddress; }
    public void setEmailAddress(String emailAddress) { this.emailAddress = emailAddress; }

    public boolean isActive() { return isActive; }
    public void setActive(boolean isActive) { this.isActive = isActive; }
}`}
      </pre>

      {/* ---- Section 3: Jackson Full Integration ---- */}
      <h2 style={{ fontSize: 26, fontWeight: 800, marginTop: 48, marginBottom: 16 }}>
        Jackson ObjectMapper: Full Integration Guide
      </h2>
      <p style={{ fontSize: 15, marginBottom: 12 }}>
        Jackson&apos;s <code style={{ background: '#f1f5f9', padding: '1px 5px', borderRadius: 3 }}>ObjectMapper</code> is the
        central class for all JSON operations. It is thread-safe after configuration and should be a singleton
        (or Spring bean) in your application.
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
{`import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;

// Configure ObjectMapper (do this once, reuse everywhere)
ObjectMapper mapper = new ObjectMapper()
    .registerModule(new JavaTimeModule())
    .disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS)
    .disable(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES)
    .enable(SerializationFeature.INDENT_OUTPUT);  // pretty print

// JSON string to Java object
String json = "{\\"user_id\\": 42, \\"first_name\\": \\"Alice\\"}";
User user = mapper.readValue(json, User.class);

// Java object to JSON string
String output = mapper.writeValueAsString(user);
// {"user_id":42,"first_name":"Alice",...}

// Read from File
User fromFile = mapper.readValue(new File("user.json"), User.class);

// Read from URL
User fromUrl = mapper.readValue(
    new URL("https://api.example.com/users/1"), User.class);

// Read from InputStream (e.g., HTTP response body)
User fromStream = mapper.readValue(inputStream, User.class);`}
      </pre>

      <h3 style={{ fontSize: 20, fontWeight: 700, marginTop: 24, marginBottom: 10 }}>Maven Dependency</h3>
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
{`<!-- pom.xml -->
<dependency>
  <groupId>com.fasterxml.jackson.core</groupId>
  <artifactId>jackson-databind</artifactId>
  <version>2.17.2</version>
</dependency>
<dependency>
  <groupId>com.fasterxml.jackson.datatype</groupId>
  <artifactId>jackson-datatype-jsr310</artifactId>
  <version>2.17.2</version>
</dependency>`}
      </pre>

      {/* ---- Section 4: Lombok Integration ---- */}
      <h2 style={{ fontSize: 26, fontWeight: 800, marginTop: 48, marginBottom: 16 }}>
        Lombok Integration: Eliminating Boilerplate
      </h2>
      <p style={{ fontSize: 15, marginBottom: 12 }}>
        Lombok generates getters, setters, constructors, and builders at compile time through annotations. The same
        <code style={{ background: '#f1f5f9', padding: '1px 5px', borderRadius: 3 }}>User</code> POJO with Lombok:
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
{`import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data                    // generates getters, setters, equals, hashCode, toString
@Builder                 // fluent builder: User.builder().userId(42).build()
@NoArgsConstructor       // required by Jackson for deserialization
@AllArgsConstructor      // used by @Builder internally
@JsonIgnoreProperties(ignoreUnknown = true)
public class User {

    @JsonProperty("user_id")
    private int userId;

    @JsonProperty("first_name")
    private String firstName;

    @JsonProperty("last_name")
    private String lastName;

    @JsonProperty("email_address")
    private String emailAddress;

    @JsonProperty("is_active")
    private boolean active;  // getter: isActive(), setter: setActive()
}`}
      </pre>
      <p style={{ fontSize: 15, marginBottom: 12 }}>
        Builder usage for cleaner test data construction:
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
{`User user = User.builder()
    .userId(42)
    .firstName("Alice")
    .lastName("Smith")
    .emailAddress("alice@example.com")
    .active(true)
    .build();`}
      </pre>

      <div style={{
        background: '#fefce8',
        border: '1px solid #fde047',
        borderRadius: 6,
        padding: '12px 16px',
        marginBottom: 24,
        fontSize: 14,
      }}>
        <strong>Lombok Gradle setup:</strong>{' '}
        <code style={{ background: '#fef9c3', padding: '1px 4px', borderRadius: 3 }}>compileOnly &apos;org.projectlombok:lombok:1.18.34&apos;</code> and{' '}
        <code style={{ background: '#fef9c3', padding: '1px 4px', borderRadius: 3 }}>annotationProcessor &apos;org.projectlombok:lombok:1.18.34&apos;</code>
        in your <code style={{ background: '#fef9c3', padding: '1px 4px', borderRadius: 3 }}>build.gradle</code>.
      </div>

      {/* ---- Section 5: Java Records ---- */}
      <h2 style={{ fontSize: 26, fontWeight: 800, marginTop: 48, marginBottom: 16 }}>
        Java Records (Java 16+): Immutable Data Carriers
      </h2>
      <p style={{ fontSize: 15, marginBottom: 12 }}>
        Java Records are a concise syntax for immutable data classes. They are ideal for API response DTOs where
        you don&apos;t need to modify the object after creation. Jackson supports Records natively from version 2.12:
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
{`import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

// Java Record — all fields are final, accessor methods auto-generated
@JsonIgnoreProperties(ignoreUnknown = true)
public record UserRecord(
    @JsonProperty("user_id") int userId,
    @JsonProperty("first_name") String firstName,
    @JsonProperty("last_name") String lastName,
    @JsonProperty("email_address") String emailAddress,
    @JsonProperty("is_active") boolean active
) {}

// Usage
ObjectMapper mapper = new ObjectMapper();
UserRecord user = mapper.readValue(json, UserRecord.class);
System.out.println(user.firstName()); // accessor, not getFirstName()
String out = mapper.writeValueAsString(user);`}
      </pre>
      <p style={{ fontSize: 15, marginBottom: 12 }}>
        For Records that need a custom constructor (e.g., validation or transformation), use
        <code style={{ background: '#f1f5f9', padding: '1px 5px', borderRadius: 3 }}>@JsonCreator</code>:
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
{`public record Product(String name, double price) {
    // Compact canonical constructor for validation
    public Product {
        if (price < 0) throw new IllegalArgumentException("Price cannot be negative");
        name = name.trim();
    }

    // Jackson uses @JsonCreator when field names differ from record components
    @JsonCreator
    public static Product of(
        @JsonProperty("product_name") String name,
        @JsonProperty("unit_price") double price
    ) {
        return new Product(name, price);
    }
}`}
      </pre>

      {/* ---- Section 6: Nested Objects and Arrays ---- */}
      <h2 style={{ fontSize: 26, fontWeight: 800, marginTop: 48, marginBottom: 16 }}>
        Nested Objects and Arrays
      </h2>
      <p style={{ fontSize: 15, marginBottom: 12 }}>
        Real-world JSON often contains nested objects and arrays. Jackson handles these automatically by matching
        the Java type structure to the JSON structure:
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
//   "order_id": "ORD-001",
//   "customer": { "name": "Alice", "email": "alice@example.com" },
//   "items": [
//     { "sku": "PROD-1", "quantity": 2, "price": 19.99 },
//     { "sku": "PROD-2", "quantity": 1, "price": 49.99 }
//   ],
//   "tags": ["express", "gift"],
//   "metadata": { "source": "web", "campaign": "sale2026" }
// }

@Data @NoArgsConstructor @AllArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class Order {

    @JsonProperty("order_id")
    private String orderId;

    private Customer customer;  // nested POJO - field name matches JSON key

    private List<OrderItem> items;  // JSON array

    private List<String> tags;  // array of primitives

    private Map<String, String> metadata;  // dynamic key-value pairs
}

@Data @NoArgsConstructor @AllArgsConstructor
public class Customer {
    private String name;
    private String email;
}

@Data @NoArgsConstructor @AllArgsConstructor
public class OrderItem {
    private String sku;
    private int quantity;
    private double price;
}

// Deserialization
Order order = mapper.readValue(json, Order.class);
System.out.println(order.getItems().size()); // 2
System.out.println(order.getMetadata().get("source")); // "web"`}
      </pre>

      <h3 style={{ fontSize: 20, fontWeight: 700, marginTop: 24, marginBottom: 10 }}>Generic List Deserialization</h3>
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
{`// Deserializing a JSON array at the top level
String jsonArray = "[{\\"name\\":\\"Alice\\"},{\\"name\\":\\"Bob\\"}]";

// Use TypeReference to preserve generic type parameter
List<User> users = mapper.readValue(jsonArray, new TypeReference<List<User>>() {});

// Or use JavaType
JavaType listType = mapper.getTypeFactory()
    .constructCollectionType(List.class, User.class);
List<User> users2 = mapper.readValue(jsonArray, listType);`}
      </pre>

      {/* ---- Section 7: Optional and Nullable Fields ---- */}
      <h2 style={{ fontSize: 26, fontWeight: 800, marginTop: 48, marginBottom: 16 }}>
        Optional and Nullable Fields
      </h2>
      <p style={{ fontSize: 15, marginBottom: 12 }}>
        Handling optional fields correctly prevents NullPointerExceptions and produces clean JSON output without
        redundant null values:
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
{`import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

// NON_NULL: exclude fields that are null from serialized JSON
@JsonInclude(Include.NON_NULL)
@JsonIgnoreProperties(ignoreUnknown = true)
public class Profile {

    private String username;      // required
    private String bio;           // optional — omitted from JSON when null
    private String avatarUrl;     // optional

    @JsonInclude(Include.NON_EMPTY)
    private List<String> roles;   // excluded if null or empty list

    // Optional<T> support — requires Jdk8Module
    // mapper.registerModule(new Jdk8Module());
    private Optional<String> phoneNumber = Optional.empty();
}`}
      </pre>

      <div style={{
        background: '#f0fdf4',
        border: '1px solid #bbf7d0',
        borderRadius: 6,
        padding: '12px 16px',
        marginBottom: 24,
        fontSize: 14,
      }}>
        <strong>Best practice:</strong> Use <code style={{ background: '#dcfce7', padding: '1px 4px', borderRadius: 3 }}>@JsonInclude(NON_NULL)</code> at
        the class level for DTOs sent to clients, so the response JSON is lean. Keep full nulls in internal domain
        objects where explicitness matters more than payload size.
      </div>

      {/* ---- Section 8: Gson Alternative ---- */}
      <h2 style={{ fontSize: 26, fontWeight: 800, marginTop: 48, marginBottom: 16 }}>
        Gson Alternative: Google&apos;s JSON Library
      </h2>
      <p style={{ fontSize: 15, marginBottom: 12 }}>
        Gson is Google&apos;s JSON library, widely used in Android and simpler Java projects. It uses
        <code style={{ background: '#f1f5f9', padding: '1px 5px', borderRadius: 3 }}>@SerializedName</code> instead of
        <code style={{ background: '#f1f5f9', padding: '1px 5px', borderRadius: 3 }}>@JsonProperty</code>, and{' '}
        <code style={{ background: '#f1f5f9', padding: '1px 5px', borderRadius: 3 }}>TypeToken</code> instead of{' '}
        <code style={{ background: '#f1f5f9', padding: '1px 5px', borderRadius: 3 }}>TypeReference</code>:
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
{`import com.google.gson.annotations.SerializedName;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.reflect.TypeToken;
import java.lang.reflect.Type;

public class UserGson {

    @SerializedName("user_id")
    private int userId;

    @SerializedName("first_name")
    private String firstName;

    @SerializedName("email_address")
    private String emailAddress;
}

// Configure Gson
Gson gson = new GsonBuilder()
    .setPrettyPrinting()
    .serializeNulls()                // include null fields
    .setDateFormat("yyyy-MM-dd")
    .create();

// Deserialize single object
String json = "{\\"user_id\\":1,\\"first_name\\":\\"Alice\\"}";
UserGson user = gson.fromJson(json, UserGson.class);

// Serialize back to JSON
String output = gson.toJson(user);

// Deserialize a List (TypeToken preserves generic type)
String jsonArray = "[{\\"user_id\\":1},{\\"user_id\\":2}]";
Type listType = new TypeToken<List<UserGson>>(){}.getType();
List<UserGson> users = gson.fromJson(jsonArray, listType);`}
      </pre>

      {/* ---- Section 9: JSON to Java Tools ---- */}
      <h2 style={{ fontSize: 26, fontWeight: 800, marginTop: 48, marginBottom: 16 }}>
        JSON to Java Tools and Automation
      </h2>
      <p style={{ fontSize: 15, marginBottom: 12 }}>
        For large JSON schemas with dozens of nested objects, manual POJO creation is error-prone. Several tools
        automate the generation:
      </p>

      <h3 style={{ fontSize: 20, fontWeight: 700, marginTop: 24, marginBottom: 10 }}>jsonschema2pojo (Maven Plugin)</h3>
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
{`<!-- pom.xml — generates POJOs from JSON schema at build time -->
<plugin>
  <groupId>org.jsonschema2pojo</groupId>
  <artifactId>jsonschema2pojo-maven-plugin</artifactId>
  <version>1.2.1</version>
  <configuration>
    <sourceDirectory>\${basedir}/src/main/resources/schema</sourceDirectory>
    <targetPackage>com.example.model</targetPackage>
    <annotationStyle>jackson2</annotationStyle>
    <includeAdditionalProperties>false</includeAdditionalProperties>
    <useLombokAnnotations>true</useLombokAnnotations>  <!-- Lombok support -->
    <generateBuilders>true</generateBuilders>
  </configuration>
  <executions>
    <execution>
      <goals><goal>generate</goal></goals>
    </execution>
  </executions>
</plugin>`}
      </pre>

      <h3 style={{ fontSize: 20, fontWeight: 700, marginTop: 24, marginBottom: 10 }}>IntelliJ IDEA JSON Plugin</h3>
      <p style={{ fontSize: 15, marginBottom: 8 }}>
        In IntelliJ IDEA Ultimate, paste a JSON string and use <strong>Edit &rarr; Paste JSON as Java Class</strong>.
        The community plugin <strong>JSON To Kotlin Class</strong> also supports Java. For a zero-install solution,
        use our online tool above which generates Jackson-annotated POJOs, Lombok classes, or Records from any
        JSON you paste.
      </p>
      <p style={{ fontSize: 15, marginBottom: 20 }}>
        <Link href={toolLink} style={{ color: '#2563eb', fontWeight: 600 }}>
          Try our free JSON to Java generator &rarr;
        </Link>
      </p>

      {/* ---- Section 10: Handling Unknown Fields ---- */}
      <h2 style={{ fontSize: 26, fontWeight: 800, marginTop: 48, marginBottom: 16 }}>
        Handling Unknown Fields
      </h2>
      <p style={{ fontSize: 15, marginBottom: 12 }}>
        APIs evolve over time and may add new fields. There are two strategies for handling unknown JSON fields
        in Jackson:
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
{`// Strategy 1: Ignore all unknown fields (recommended for API clients)
@JsonIgnoreProperties(ignoreUnknown = true)
public class ApiResponse {
    private String id;
    private String status;
    // any other JSON fields are silently ignored
}

// Strategy 2: Capture unknown fields in a Map (useful for logging/debugging)
public class FlexibleResponse {

    private String id;
    private String status;

    // Collects all fields that don't map to any declared property
    private Map<String, Object> additionalProperties = new HashMap<>();

    @JsonAnyGetter
    public Map<String, Object> getAdditionalProperties() {
        return additionalProperties;
    }

    @JsonAnySetter
    public void setAdditionalProperty(String name, Object value) {
        additionalProperties.put(name, value);
    }
}`}
      </pre>

      {/* ---- Section 11: Enum Handling ---- */}
      <h2 style={{ fontSize: 26, fontWeight: 800, marginTop: 48, marginBottom: 16 }}>
        Enum Handling with Jackson
      </h2>
      <p style={{ fontSize: 15, marginBottom: 12 }}>
        By default, Jackson serializes enums as their name string. Use
        <code style={{ background: '#f1f5f9', padding: '1px 5px', borderRadius: 3 }}>@JsonValue</code> and
        <code style={{ background: '#f1f5f9', padding: '1px 5px', borderRadius: 3 }}>@JsonCreator</code> for custom
        serialization logic:
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
{`public enum OrderStatus {
    PENDING("pending"),
    PROCESSING("processing"),
    SHIPPED("shipped"),
    DELIVERED("delivered"),
    CANCELLED("cancelled");

    private final String value;

    OrderStatus(String value) {
        this.value = value;
    }

    @JsonValue  // serializes as the value string, not the enum name
    public String getValue() { return value; }

    @JsonCreator  // deserializes from the value string
    public static OrderStatus fromValue(String value) {
        for (OrderStatus status : values()) {
            if (status.value.equalsIgnoreCase(value)) return status;
        }
        throw new IllegalArgumentException("Unknown status: " + value);
    }
}

// In your POJO:
public class Order {
    private String orderId;
    private OrderStatus status;  // serializes as "pending", not "PENDING"
}`}
      </pre>

      {/* ---- Section 12: Date and Time Handling ---- */}
      <h2 style={{ fontSize: 26, fontWeight: 800, marginTop: 48, marginBottom: 16 }}>
        Date and Time Handling: JavaTimeModule
      </h2>
      <p style={{ fontSize: 15, marginBottom: 12 }}>
        Java 8+ date/time types (<code style={{ background: '#f1f5f9', padding: '1px 5px', borderRadius: 3 }}>LocalDateTime</code>,
        <code style={{ background: '#f1f5f9', padding: '1px 5px', borderRadius: 3 }}>ZonedDateTime</code>,
        <code style={{ background: '#f1f5f9', padding: '1px 5px', borderRadius: 3 }}>Instant</code>) require the{' '}
        <code style={{ background: '#f1f5f9', padding: '1px 5px', borderRadius: 3 }}>jackson-datatype-jsr310</code> module:
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
{`import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.fasterxml.jackson.annotation.JsonFormat;
import java.time.LocalDateTime;
import java.time.ZonedDateTime;

// ObjectMapper setup
ObjectMapper mapper = new ObjectMapper();
mapper.registerModule(new JavaTimeModule());
mapper.disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);

// POJO with various date types
public class Event {

    private String title;

    // ISO-8601 format: "2026-02-27T14:30:00"
    @JsonFormat(shape = JsonFormat.Shape.STRING,
                pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime startTime;

    // With timezone: "2026-02-27T14:30:00+09:00"
    @JsonFormat(shape = JsonFormat.Shape.STRING,
                pattern = "yyyy-MM-dd'T'HH:mm:ssXXX")
    private ZonedDateTime endTime;

    // Unix epoch in milliseconds: 1740614400000
    @JsonFormat(shape = JsonFormat.Shape.NUMBER)
    private Instant createdAt;
}`}
      </pre>

      {/* ---- Section 13: Inheritance and Polymorphism ---- */}
      <h2 style={{ fontSize: 26, fontWeight: 800, marginTop: 48, marginBottom: 16 }}>
        Inheritance and Polymorphic Deserialization
      </h2>
      <p style={{ fontSize: 15, marginBottom: 12 }}>
        When JSON can represent multiple subtypes of a base class, use Jackson&apos;s
        <code style={{ background: '#f1f5f9', padding: '1px 5px', borderRadius: 3 }}>@JsonTypeInfo</code> and
        <code style={{ background: '#f1f5f9', padding: '1px 5px', borderRadius: 3 }}>@JsonSubTypes</code> to instruct
        the deserializer which concrete class to instantiate:
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
{`import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;

// JSON: {"type":"email","address":"alice@example.com","subject":"Hi"}
// JSON: {"type":"sms","phoneNumber":"+1234567890","message":"Hello"}

@JsonTypeInfo(
    use = JsonTypeInfo.Id.NAME,       // discriminator field holds a name
    include = JsonTypeInfo.As.PROPERTY,
    property = "type"                 // the JSON key that selects the subtype
)
@JsonSubTypes({
    @JsonSubTypes.Type(value = EmailNotification.class, name = "email"),
    @JsonSubTypes.Type(value = SmsNotification.class,   name = "sms"),
    @JsonSubTypes.Type(value = PushNotification.class,  name = "push"),
})
public abstract class Notification {
    public abstract String getType();
}

public class EmailNotification extends Notification {
    private String address;
    private String subject;
    public String getType() { return "email"; }
    // getters/setters
}

public class SmsNotification extends Notification {
    private String phoneNumber;
    private String message;
    public String getType() { return "sms"; }
    // getters/setters
}

// Deserialization automatically selects the right subclass
Notification n = mapper.readValue(json, Notification.class);
if (n instanceof EmailNotification email) {
    System.out.println(email.getAddress());
}`}
      </pre>

      {/* ---- Section 14: Validation ---- */}
      <h2 style={{ fontSize: 26, fontWeight: 800, marginTop: 48, marginBottom: 16 }}>
        Validation with Bean Validation (JSR-380)
      </h2>
      <p style={{ fontSize: 15, marginBottom: 12 }}>
        Jackson handles JSON mapping; Bean Validation (Hibernate Validator) handles data validation. Combine them
        in Spring Boot with
        <code style={{ background: '#f1f5f9', padding: '1px 5px', borderRadius: 3 }}>@Valid</code> on request bodies:
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
{`import jakarta.validation.constraints.*;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public class CreateUserRequest {

    @NotBlank(message = "Username is required")
    @Size(min = 3, max = 50, message = "Username must be 3-50 characters")
    @JsonProperty("username")
    private String username;

    @NotBlank
    @Email(message = "Must be a valid email address")
    @JsonProperty("email")
    private String email;

    @NotNull
    @Min(value = 18, message = "Must be at least 18 years old")
    @Max(value = 150)
    @JsonProperty("age")
    private Integer age;

    @Size(min = 8, message = "Password must be at least 8 characters")
    @Pattern(regexp = ".*[A-Z].*", message = "Must contain an uppercase letter")
    @JsonProperty("password")
    private String password;
}

// Spring Boot REST controller
@RestController
@RequestMapping("/api/users")
public class UserController {

    @PostMapping
    public ResponseEntity<User> createUser(@Valid @RequestBody CreateUserRequest req) {
        // Jackson deserializes JSON, then Spring validates with @Valid
        // Returns 400 Bad Request automatically if validation fails
        return ResponseEntity.ok(userService.create(req));
    }
}`}
      </pre>

      {/* ---- Section 15: FAQ ---- */}
      <h2 style={{ fontSize: 26, fontWeight: 800, marginTop: 48, marginBottom: 16 }}>
        {t.faqTitle}
      </h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        {faqItems.map((item, idx) => (
          <div key={idx} style={{
            border: '1px solid #e2e8f0',
            borderRadius: 8,
            overflow: 'hidden',
          }}>
            <div style={{
              background: '#f8fafc',
              padding: '12px 16px',
              fontWeight: 700,
              fontSize: 15,
            }}>
              Q: {item.q}
            </div>
            <div style={{ padding: '12px 16px', fontSize: 14, lineHeight: 1.7 }}>
              {item.a}
            </div>
          </div>
        ))}
      </div>

      {/* ---- CTA Footer ---- */}
      <div style={{
        background: '#f0f9ff',
        border: '1px solid #bae6fd',
        borderRadius: 8,
        padding: '20px 24px',
        marginTop: 48,
        textAlign: 'center',
      }}>
        <p style={{ fontSize: 17, fontWeight: 700, marginBottom: 8, marginTop: 0 }}>
          Ready to convert your JSON to Java?
        </p>
        <p style={{ fontSize: 14, color: '#475569', marginBottom: 16 }}>
          Paste any JSON and get Jackson-annotated POJOs, Lombok data classes, or Java Records instantly.
        </p>
        <Link href={toolLink} style={{
          display: 'inline-block',
          background: '#2563eb',
          color: '#fff',
          padding: '10px 24px',
          borderRadius: 6,
          fontWeight: 700,
          fontSize: 15,
          textDecoration: 'none',
        }}>
          Open JSON to Java Tool &rarr;
        </Link>
      </div>
    </article>
  );
}
