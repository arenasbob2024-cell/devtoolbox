import Link from 'next/link';

const t: Record<string, Record<string, string>> = {
  en: {
    intro: 'Converting <strong>JSON to Java</strong> classes is one of the most common tasks in backend and mobile development. When your application receives a JSON response from a REST API, you need well-structured <strong>Java classes</strong> (often called POJOs) to deserialize that data. Whether you are building a Spring Boot microservice, an Android app, or a data pipeline, a reliable <strong>JSON to Java class converter</strong> saves hours of manual coding. This comprehensive guide walks you through type mapping, parsing strategies, Jackson and Gson examples, Lombok integration, Java Records, and best practices for generating a <strong>Java class from JSON</strong>. If you need to <strong>convert JSON to Java online</strong> right now, try our free tool.',
    linkTool: 'Try our free online JSON to Java Class Converter instantly.',
    h2_what: 'What Is JSON to Java Class Conversion?',
    whatDesc1: 'JSON (JavaScript Object Notation) is the dominant data interchange format for web APIs, configuration files, and NoSQL databases. Java, on the other hand, is a statically typed language that requires explicit class definitions before data can be used programmatically. <strong>JSON to Java class conversion</strong> bridges this gap by analyzing a JSON document and producing the corresponding Java classes with properly typed fields, getters, setters, and annotations.',
    whatDesc2: 'In a typical Spring Boot application, a controller receives an HTTP request body as a JSON string. Before business logic can process this data, the framework must <strong>convert JSON to Java</strong> objects using a library such as Jackson or Gson. Without properly defined POJOs, deserialization fails at runtime with cryptic errors. A <strong>JSON to Java class converter</strong> automates the creation of these data classes so you can focus on logic instead of boilerplate.',
    whatDesc3: 'The same conversion is essential in Android development where Retrofit or Volley libraries parse API responses into Java objects. Whether you call it <strong>JSON to POJO</strong>, <strong>JSON to Java object</strong>, or <strong>generate Java class from JSON</strong>, the underlying process is identical: inspect the JSON structure, determine each field\'s type, handle nesting and arrays, and produce clean, annotated Java source code.',
    h2_typeMapping: 'JSON to Java: Type Mapping',
    typeMappingDesc: 'Understanding how JSON types map to Java types is the foundation of any <strong>JSON to Java</strong> conversion. The following table shows the standard mappings used by Jackson, Gson, and most code generators:',
    typeMappingTable: '<table><thead><tr><th>JSON Type</th><th>Example</th><th>Java Type(s)</th><th>Notes</th></tr></thead><tbody><tr><td>string</td><td><code>"hello"</code></td><td><code>String</code></td><td>Always maps to <code>java.lang.String</code></td></tr><tr><td>number (integer)</td><td><code>42</code></td><td><code>int</code>, <code>long</code>, <code>Integer</code>, <code>Long</code></td><td>Use <code>long</code> for values exceeding 2^31-1; use wrapper types when nullable</td></tr><tr><td>number (decimal)</td><td><code>3.14</code></td><td><code>double</code>, <code>Double</code>, <code>BigDecimal</code></td><td>Use <code>BigDecimal</code> for financial data to avoid floating-point errors</td></tr><tr><td>boolean</td><td><code>true</code></td><td><code>boolean</code>, <code>Boolean</code></td><td>Primitive for non-nullable; wrapper when the field can be absent</td></tr><tr><td>null</td><td><code>null</code></td><td><code>null</code></td><td>Only valid for reference types; primitives cannot be null</td></tr><tr><td>array</td><td><code>[1, 2, 3]</code></td><td><code>List&lt;T&gt;</code>, <code>T[]</code></td><td><code>List</code> preferred for flexibility; arrays for performance-critical paths</td></tr><tr><td>object</td><td><code>{"k": "v"}</code></td><td>Nested class or <code>Map&lt;String, Object&gt;</code></td><td>Strongly typed nested classes preferred over generic Maps</td></tr></tbody></table>',
    typeMappingExtra: 'When you <strong>generate Java class from JSON</strong>, choosing between primitive types (<code>int</code>, <code>boolean</code>) and their wrapper counterparts (<code>Integer</code>, <code>Boolean</code>) matters. Primitives cannot represent <code>null</code>, so if a JSON field might be absent or explicitly null, wrapper types are safer. For monetary values, always prefer <code>BigDecimal</code> over <code>double</code> to avoid precision loss. Arrays of objects should map to <code>List&lt;NestedClass&gt;</code> to leverage Java generics and collection utilities.',
    h2_howWorks: 'How JSON to Java Conversion Works',
    howWorksDesc: 'A <strong>JSON to Java class converter</strong> follows a systematic process to transform raw JSON into compilable Java source code:',
    howWorksSteps: '<ol><li><strong>Parse the JSON structure</strong>: The converter tokenizes the input JSON, building an abstract syntax tree (AST) of objects, arrays, and primitives. Invalid JSON is rejected at this stage.</li><li><strong>Infer field types</strong>: For each key-value pair, the converter determines the Java type. Strings become <code>String</code>, integers become <code>int</code> or <code>long</code>, decimals become <code>double</code> or <code>BigDecimal</code>, booleans become <code>boolean</code>, and nested objects become new classes.</li><li><strong>Generate class names</strong>: JSON keys like <code>user_address</code> or <code>shipping-info</code> are converted to PascalCase class names (<code>UserAddress</code>, <code>ShippingInfo</code>) following Java naming conventions. Field names follow camelCase.</li><li><strong>Handle nested objects</strong>: Each nested JSON object generates a separate Java class. Deeply nested structures produce a class hierarchy. Circular references are detected and handled.</li><li><strong>Handle arrays</strong>: JSON arrays are analyzed to determine the element type. Arrays of objects produce <code>List&lt;ElementClass&gt;</code>. Mixed-type arrays fall back to <code>List&lt;Object&gt;</code>.</li><li><strong>Add annotations</strong>: The converter optionally adds Jackson (<code>@JsonProperty</code>) or Gson (<code>@SerializedName</code>) annotations when the JSON key does not match Java naming conventions.</li><li><strong>Output source code</strong>: The final step emits properly formatted Java source with imports, package declarations, field declarations, constructors, getters, and setters.</li></ol>',
    h2_codeExamples: 'Code Examples: JSON to Java with Jackson and Gson',
    codeJacksonTitle: 'Jackson: ObjectMapper and Annotations',
    codeJacksonDesc: 'Jackson is the most widely used <strong>JSON to Java</strong> library in the Java ecosystem. Spring Boot uses it by default. Here is a complete example showing how to <strong>convert JSON to Java</strong> objects using Jackson\'s <code>ObjectMapper</code>, <code>@JsonProperty</code>, and custom deserializers:',
    codeGsonTitle: 'Gson: fromJson and TypeToken',
    codeGsonDesc: 'Google\'s Gson is popular in Android development and provides a simpler API for <strong>JSON to Java object</strong> conversion. It uses <code>@SerializedName</code> for field mapping and <code>TypeToken</code> for generic type handling:',
    codeManualTitle: 'Manual POJO Generation with Builder Pattern',
    codeManualDesc: 'When you need full control over your <strong>JSON to POJO</strong> classes, writing them manually with a builder pattern provides immutability, readability, and fluent construction:',
    codeLombokTitle: 'Lombok Integration for Concise POJOs',
    codeLombokDesc: 'Project Lombok eliminates Java boilerplate in your <strong>JSON to Java class</strong> definitions. With annotations like <code>@Data</code>, <code>@Builder</code>, <code>@NoArgsConstructor</code>, and <code>@AllArgsConstructor</code>, you can reduce a 100-line POJO to under 20 lines:',
    h2_nested: 'Working with Nested JSON Structures',
    nestedDesc1: 'Real-world APIs rarely return flat JSON. Most responses contain deeply nested objects, arrays of objects, and polymorphic types. Converting these complex structures into a <strong>Java class from JSON</strong> requires careful planning:',
    nestedDesc2: '<strong>Deeply nested objects</strong>: Each level of nesting produces a separate Java class. For a JSON structure like <code>{"user": {"address": {"city": "NYC"}}}</code>, you need three classes: the root class, a <code>User</code> class, and an <code>Address</code> class. Keep class files in the same package or use inner static classes for tightly coupled structures.',
    nestedDesc3: '<strong>Arrays of objects</strong>: A JSON field like <code>"items": [{"id": 1}, {"id": 2}]</code> maps to <code>List&lt;Item&gt;</code> in Java. The converter analyzes all elements in the array to determine the union of fields. In Jackson, use <code>TypeReference&lt;List&lt;Item&gt;&gt;</code> for correct generic deserialization.',
    nestedDesc4: '<strong>Polymorphic types</strong>: When a JSON field can hold different object shapes based on a discriminator, Jackson\'s <code>@JsonTypeInfo</code> and <code>@JsonSubTypes</code> annotations provide type-safe deserialization. Define a base class or interface and annotate the subtypes:',
    nestedCode: '// Example: polymorphic deserialization with Jackson\n@JsonTypeInfo(use = JsonTypeInfo.Id.NAME, property = "type")\n@JsonSubTypes({\n    @JsonSubTypes.Type(value = EmailNotification.class, name = "email"),\n    @JsonSubTypes.Type(value = SmsNotification.class, name = "sms"),\n    @JsonSubTypes.Type(value = PushNotification.class, name = "push")\n})\npublic abstract class Notification {\n    private String type;\n    private String message;\n    private Instant createdAt;\n    // getters and setters\n}\n\npublic class EmailNotification extends Notification {\n    private String recipient;\n    private String subject;\n    // getters and setters\n}\n\npublic class SmsNotification extends Notification {\n    private String phoneNumber;\n    // getters and setters\n}\n\npublic class PushNotification extends Notification {\n    private String deviceToken;\n    private String title;\n    // getters and setters\n}',
    h2_advanced: 'Advanced Patterns: Records, Sealed Interfaces, and Validation',
    advancedDesc1: 'Java 16+ introduced <strong>Records</strong> as immutable data carriers, making them an excellent fit for <strong>JSON to Java POJO</strong> replacement. Records automatically generate the constructor, getters, <code>equals()</code>, <code>hashCode()</code>, and <code>toString()</code>. Both Jackson (2.12+) and Gson (via custom adapters) support Record deserialization:',
    advancedRecordCode: '// Java Record as a JSON data class\npublic record Product(\n    @JsonProperty("product_id") long productId,\n    String name,\n    BigDecimal price,\n    @JsonProperty("in_stock") boolean inStock,\n    List<String> tags,\n    @JsonProperty("created_at") Instant createdAt\n) {}\n\n// Deserialization with Jackson\nObjectMapper mapper = new ObjectMapper();\nmapper.registerModule(new JavaTimeModule());\nProduct product = mapper.readValue(json, Product.class);',
    advancedDesc2: 'Java 17 <strong>sealed interfaces</strong> provide compile-time exhaustiveness for polymorphic JSON. Combined with pattern matching (Java 21+), they offer a type-safe alternative to <code>@JsonSubTypes</code>:',
    advancedSealedCode: '// Sealed interface for type-safe JSON polymorphism\npublic sealed interface Shape\n    permits Circle, Rectangle, Triangle {\n    String type();\n}\n\npublic record Circle(String type, double radius) implements Shape {}\npublic record Rectangle(String type, double width, double height) implements Shape {}\npublic record Triangle(String type, double base, double height) implements Shape {}',
    advancedDesc3: '<strong>Optional fields and null safety</strong>: Use <code>Optional&lt;T&gt;</code> for fields that may be absent in the JSON. Jackson supports <code>Optional</code> via the <code>jackson-datatype-jdk8</code> module. For validation, use Jakarta Bean Validation annotations like <code>@NotNull</code>, <code>@Size</code>, <code>@Min</code>, and <code>@Max</code> to enforce constraints at deserialization time:',
    advancedValidationCode: '// Validation annotations on a POJO\nimport jakarta.validation.constraints.*;\n\npublic class CreateUserRequest {\n    @NotNull(message = "Name is required")\n    @Size(min = 1, max = 100)\n    private String name;\n\n    @NotNull @Email\n    private String email;\n\n    @Min(0) @Max(150)\n    private int age;\n\n    @NotNull\n    @Size(min = 8, max = 128)\n    private String password;\n\n    private Optional<String> nickname;  // truly optional\n\n    // getters and setters\n}',
    h2_bestPractices: 'Best Practices for JSON to Java Conversion',
    bestPracticesDesc: 'Follow these best practices when you <strong>convert JSON to Java</strong> classes to build robust, maintainable applications:',
    bp1: '<strong>Use consistent naming conventions</strong>: Java fields should be camelCase. Use <code>@JsonProperty("snake_case_name")</code> or <code>@SerializedName("snake_case_name")</code> to map JSON keys that follow different conventions. Configure Jackson with <code>PropertyNamingStrategies.SNAKE_CASE</code> globally to avoid annotating every field.',
    bp2: '<strong>Handle unknown properties gracefully</strong>: APIs evolve over time and may add new fields. Annotate your classes with <code>@JsonIgnoreProperties(ignoreUnknown = true)</code> or configure the ObjectMapper with <code>DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES = false</code> to prevent deserialization failures when new fields appear.',
    bp3: '<strong>Parse dates and times properly</strong>: Register the <code>JavaTimeModule</code> with Jackson to support <code>Instant</code>, <code>LocalDate</code>, <code>LocalDateTime</code>, and <code>ZonedDateTime</code>. Disable <code>WRITE_DATES_AS_TIMESTAMPS</code> to serialize dates as ISO-8601 strings. Avoid using <code>java.util.Date</code> in new code.',
    bp4: '<strong>Use BigDecimal for monetary values</strong>: Never use <code>float</code> or <code>double</code> for money. JSON number <code>19.99</code> can lose precision as a floating-point type. Map financial fields to <code>BigDecimal</code> and configure Jackson with <code>DeserializationFeature.USE_BIG_DECIMAL_FOR_FLOATS</code>.',
    bp5: '<strong>Apply defensive copying</strong>: If your POJO contains mutable collections like <code>List</code> or <code>Map</code>, return defensive copies from getters to prevent external modification. Better yet, use <code>List.copyOf()</code> or <code>Collections.unmodifiableList()</code> in constructors for immutable POJOs.',
    bp6: '<strong>Prefer composition over inheritance</strong>: Instead of deep class hierarchies, compose your <strong>JSON to Java</strong> classes using contained objects. This makes the code easier to test, refactor, and evolve independently.',
    bp7: '<strong>Generate equals, hashCode, and toString</strong>: Every POJO used as a data carrier should implement these methods. Use Lombok\'s <code>@Data</code>, Java Records, or IDE-generated implementations. This ensures correct behavior in collections, logging, and debugging.',
    relatedTools: 'Related tools you might find useful: <strong>JSON to Kotlin</strong> for Android development with Kotlin, <strong>JSON to TypeScript</strong> for frontend interfaces, and <strong>JSON to C#</strong> for .NET applications.',
    h2_faq: 'Frequently Asked Questions',
    faq1_q: 'Jackson vs Gson: which library should I use for JSON to Java?',
    faq1_a: 'Jackson is the recommended choice for most Java projects. It is the default in Spring Boot, offers superior performance, supports streaming processing for large files, and has a richer annotation ecosystem. Gson is simpler to set up and popular in Android development due to its smaller footprint. Choose Jackson for enterprise backend services and Gson for lightweight Android apps. Both support Records, custom deserializers, and polymorphic type handling.',
    faq2_q: 'Should I use Java Records or traditional POJOs for JSON deserialization?',
    faq2_a: 'Use Java Records when you need immutable data carriers with minimal boilerplate (Java 16+). Records automatically generate constructors, getters, equals, hashCode, and toString. Use traditional POJOs when you need mutability, inheritance hierarchies, or compatibility with older Java versions. Lombok (@Data, @Builder) provides a middle ground with generated boilerplate on mutable classes. For Spring Boot 3+ projects targeting Java 17+, Records are the modern best practice.',
    faq3_q: 'How do I handle unknown JSON fields that are not in my Java class?',
    faq3_a: 'Add @JsonIgnoreProperties(ignoreUnknown = true) at the class level to silently ignore extra fields. Alternatively, configure Jackson globally with mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false). If you want to capture unknown fields, add a Map<String, Object> field annotated with @JsonAnySetter. In Gson, unknown fields are ignored by default. This defensive approach ensures your application does not break when the API adds new fields.',
    conclusion: 'Converting <strong>JSON to Java</strong> classes is a fundamental skill for every Java developer. From simple POJOs to advanced patterns with Records, sealed interfaces, and validation annotations, the right approach depends on your project\'s requirements. Use our free online <strong>JSON to Java class converter</strong> for instant code generation, and refer to this guide for best practices on type mapping, nested structures, and library selection.',
    linkToolBottom: 'Convert JSON to Java classes instantly with our free online tool.',
  },
  zh: {
    intro: '将 <strong>JSON 转换为 Java</strong> 类是后端和移动开发中最常见的任务之一。当应用程序从 REST API 接收 JSON 响应时，你需要结构良好的 Java 类（通常称为 POJO）来反序列化数据。无论你是构建 Spring Boot 微服务、Android 应用还是数据管道，可靠的 JSON 转 Java 类转换器都能节省数小时的手动编码时间。本指南全面介绍类型映射、解析策略、Jackson 和 Gson 示例、Lombok 集成、Java Records 以及从 JSON 生成 Java 类的最佳实践。',
    linkTool: '立即试用我们的免费在线 JSON 转 Java 类转换工具。',
    h2_what: '什么是 JSON 转 Java 类转换？',
    whatDesc1: 'JSON 是 Web API、配置文件和 NoSQL 数据库的主流数据交换格式。而 Java 是静态类型语言，需要在程序使用数据前定义显式的类。JSON 转 Java 类转换通过分析 JSON 文档并生成具有正确类型字段、getter、setter 和注解的对应 Java 类来弥合这一差距。',
    whatDesc2: '在典型的 Spring Boot 应用中，控制器接收 JSON 字符串格式的 HTTP 请求体。在业务逻辑处理数据前，框架必须使用 Jackson 或 Gson 等库将 JSON 转换为 Java 对象。没有正确定义的 POJO，反序列化会在运行时失败。JSON 转 Java 类转换器自动创建这些数据类，让你专注于业务逻辑。',
    whatDesc3: '在 Android 开发中，Retrofit 或 Volley 库将 API 响应解析为 Java 对象时，同样需要这种转换。无论你称之为 JSON 转 POJO、JSON 转 Java 对象还是从 JSON 生成 Java 类，底层过程都是相同的：检查 JSON 结构，确定每个字段的类型，处理嵌套和数组，生成干净的带注解的 Java 源代码。',
    h2_typeMapping: 'JSON 到 Java：类型映射',
    typeMappingDesc: '理解 JSON 类型如何映射到 Java 类型是任何 JSON 转 Java 转换的基础。下表展示了 Jackson、Gson 和大多数代码生成器使用的标准映射：',
    typeMappingTable: '<table><thead><tr><th>JSON 类型</th><th>示例</th><th>Java 类型</th><th>说明</th></tr></thead><tbody><tr><td>string</td><td><code>"hello"</code></td><td><code>String</code></td><td>始终映射为 <code>java.lang.String</code></td></tr><tr><td>number（整数）</td><td><code>42</code></td><td><code>int</code>、<code>long</code></td><td>超过 2^31-1 时使用 <code>long</code>；可空时使用包装类型</td></tr><tr><td>number（小数）</td><td><code>3.14</code></td><td><code>double</code>、<code>BigDecimal</code></td><td>金融数据使用 <code>BigDecimal</code></td></tr><tr><td>boolean</td><td><code>true</code></td><td><code>boolean</code>、<code>Boolean</code></td><td>不可空用基本类型；可能缺失时用包装类型</td></tr><tr><td>null</td><td><code>null</code></td><td><code>null</code></td><td>仅适用于引用类型</td></tr><tr><td>array</td><td><code>[1, 2, 3]</code></td><td><code>List&lt;T&gt;</code>、<code>T[]</code></td><td>推荐使用 <code>List</code></td></tr><tr><td>object</td><td><code>{"k": "v"}</code></td><td>嵌套类或 <code>Map</code></td><td>优先使用强类型嵌套类</td></tr></tbody></table>',
    typeMappingExtra: '在从 JSON 生成 Java 类时，选择基本类型（<code>int</code>、<code>boolean</code>）还是包装类型（<code>Integer</code>、<code>Boolean</code>）很重要。基本类型不能表示 <code>null</code>，因此如果 JSON 字段可能缺失或显式为 null，包装类型更安全。货币值始终使用 <code>BigDecimal</code> 而非 <code>double</code>。',
    h2_howWorks: 'JSON 转 Java 转换的工作原理',
    howWorksDesc: 'JSON 转 Java 类转换器遵循系统化流程将原始 JSON 转换为可编译的 Java 源代码：',
    howWorksSteps: '<ol><li><strong>解析 JSON 结构</strong>：转换器对输入 JSON 进行词法分析，构建对象、数组和基本类型的抽象语法树。</li><li><strong>推断字段类型</strong>：对每个键值对确定 Java 类型。字符串变为 <code>String</code>，整数变为 <code>int</code> 或 <code>long</code>，小数变为 <code>double</code> 或 <code>BigDecimal</code>。</li><li><strong>生成类名</strong>：将 JSON 键名转换为 PascalCase 类名和 camelCase 字段名。</li><li><strong>处理嵌套对象</strong>：每个嵌套 JSON 对象生成一个单独的 Java 类。</li><li><strong>处理数组</strong>：分析数组元素确定元素类型，对象数组生成 <code>List&lt;ElementClass&gt;</code>。</li><li><strong>添加注解</strong>：当 JSON 键不符合 Java 命名规范时，添加 <code>@JsonProperty</code> 或 <code>@SerializedName</code> 注解。</li><li><strong>输出源代码</strong>：生成格式化的 Java 源代码。</li></ol>',
    h2_codeExamples: '代码示例：使用 Jackson 和 Gson 实现 JSON 转 Java',
    codeJacksonTitle: 'Jackson：ObjectMapper 和注解',
    codeJacksonDesc: 'Jackson 是 Java 生态中最广泛使用的 JSON 转 Java 库，Spring Boot 默认使用它。以下是使用 Jackson 的 <code>ObjectMapper</code>、<code>@JsonProperty</code> 和自定义反序列化器的完整示例：',
    codeGsonTitle: 'Gson：fromJson 和 TypeToken',
    codeGsonDesc: 'Google 的 Gson 在 Android 开发中很受欢迎，提供更简单的 JSON 转 Java 对象 API。它使用 <code>@SerializedName</code> 进行字段映射，<code>TypeToken</code> 处理泛型类型：',
    codeManualTitle: '手动 POJO 生成与 Builder 模式',
    codeManualDesc: '当你需要完全控制 JSON 转 POJO 类时，使用 Builder 模式手动编写可提供不可变性、可读性和流式构造：',
    codeLombokTitle: 'Lombok 集成简化 POJO',
    codeLombokDesc: 'Lombok 消除了 JSON 转 Java 类定义中的样板代码。使用 <code>@Data</code>、<code>@Builder</code>、<code>@NoArgsConstructor</code>、<code>@AllArgsConstructor</code> 等注解，可以将 100 行 POJO 减少到 20 行以内：',
    h2_nested: '处理嵌套 JSON 结构',
    nestedDesc1: '实际 API 很少返回扁平 JSON。大多数响应包含深度嵌套对象、对象数组和多态类型。将这些复杂结构转换为 Java 类需要仔细规划：',
    nestedDesc2: '<strong>深度嵌套对象</strong>：每层嵌套生成一个单独的 Java 类。对于 <code>{"user": {"address": {"city": "NYC"}}}</code> 这样的结构，你需要三个类：根类、<code>User</code> 类和 <code>Address</code> 类。',
    nestedDesc3: '<strong>对象数组</strong>：<code>"items": [{"id": 1}, {"id": 2}]</code> 在 Java 中映射为 <code>List&lt;Item&gt;</code>。在 Jackson 中使用 <code>TypeReference&lt;List&lt;Item&gt;&gt;</code> 进行正确的泛型反序列化。',
    nestedDesc4: '<strong>多态类型</strong>：当 JSON 字段根据判别符持有不同对象形状时，Jackson 的 <code>@JsonTypeInfo</code> 和 <code>@JsonSubTypes</code> 注解提供类型安全的反序列化。',
    h2_advanced: '高级模式：Records、密封接口和验证',
    advancedDesc1: 'Java 16+ 引入的 Records 是不可变数据载体，是 JSON 转 Java POJO 的绝佳替代。Records 自动生成构造函数、getter、<code>equals()</code>、<code>hashCode()</code> 和 <code>toString()</code>。Jackson（2.12+）和 Gson 都支持 Record 反序列化：',
    advancedDesc2: 'Java 17 的<strong>密封接口</strong>为多态 JSON 提供编译时穷尽性检查。结合模式匹配（Java 21+），它们是 <code>@JsonSubTypes</code> 的类型安全替代方案。',
    advancedDesc3: '<strong>Optional 字段和空安全</strong>：对 JSON 中可能缺失的字段使用 <code>Optional&lt;T&gt;</code>。使用 Jakarta Bean Validation 注解（<code>@NotNull</code>、<code>@Size</code>）在反序列化时强制约束。',
    h2_bestPractices: 'JSON 转 Java 转换最佳实践',
    bestPracticesDesc: '将 JSON 转换为 Java 类时，遵循以下最佳实践以构建健壮、可维护的应用：',
    bp1: '<strong>使用一致的命名约定</strong>：Java 字段使用 camelCase，使用 <code>@JsonProperty</code> 映射 snake_case 的 JSON 键。全局配置 <code>PropertyNamingStrategies.SNAKE_CASE</code> 避免逐个注解。',
    bp2: '<strong>优雅处理未知属性</strong>：使用 <code>@JsonIgnoreProperties(ignoreUnknown = true)</code> 静默忽略多余字段，防止 API 添加新字段时反序列化失败。',
    bp3: '<strong>正确解析日期时间</strong>：注册 <code>JavaTimeModule</code> 支持 <code>Instant</code>、<code>LocalDate</code> 等类型。禁用 <code>WRITE_DATES_AS_TIMESTAMPS</code> 以 ISO-8601 格式序列化。',
    bp4: '<strong>货币值使用 BigDecimal</strong>：绝不使用 <code>float</code> 或 <code>double</code> 表示金额。配置 Jackson 的 <code>USE_BIG_DECIMAL_FOR_FLOATS</code>。',
    bp5: '<strong>应用防御性复制</strong>：对包含可变集合的 POJO，在 getter 中返回防御性副本，或在构造函数中使用 <code>List.copyOf()</code>。',
    bp6: '<strong>优先组合而非继承</strong>：使用组合而非深层类层次结构，使代码更易测试和重构。',
    bp7: '<strong>生成 equals、hashCode 和 toString</strong>：每个数据载体 POJO 都应实现这些方法。使用 Lombok 的 <code>@Data</code>、Java Records 或 IDE 生成。',
    relatedTools: '相关工具推荐：<strong>JSON 转 Kotlin</strong> 用于 Kotlin Android 开发，<strong>JSON 转 TypeScript</strong> 用于前端接口，<strong>JSON 转 C#</strong> 用于 .NET 应用。',
    h2_faq: '常见问题',
    faq1_q: 'Jackson 和 Gson 哪个更适合 JSON 转 Java？',
    faq1_a: 'Jackson 是大多数 Java 项目的推荐选择。它是 Spring Boot 的默认库，性能优越，支持流式处理大文件，注解生态更丰富。Gson 设置更简单，因体积小在 Android 开发中流行。企业后端选 Jackson，轻量 Android 应用选 Gson。两者都支持 Records、自定义反序列化器和多态类型处理。',
    faq2_q: '应该使用 Java Records 还是传统 POJO？',
    faq2_a: '当需要不可变数据载体且代码最简时使用 Java Records（Java 16+）。Records 自动生成构造函数、getter、equals、hashCode 和 toString。需要可变性、继承或兼容旧版 Java 时使用传统 POJO。Lombok 提供折中方案。Spring Boot 3+ 项目推荐使用 Records。',
    faq3_q: '如何处理 Java 类中没有的未知 JSON 字段？',
    faq3_a: '在类级别添加 @JsonIgnoreProperties(ignoreUnknown = true) 静默忽略多余字段。或全局配置 DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES = false。如需捕获未知字段，添加 @JsonAnySetter 注解的 Map。Gson 默认忽略未知字段。',
    conclusion: '将 JSON 转换为 Java 类是每个 Java 开发者的基本技能。从简单 POJO 到 Records、密封接口和验证注解的高级模式，正确方法取决于项目需求。使用我们的免费在线 JSON 转 Java 类转换器即时生成代码，参考本指南了解类型映射、嵌套结构和库选择的最佳实践。',
    linkToolBottom: '使用我们的免费在线工具即时将 JSON 转换为 Java 类。',
  },
  fr: {
    intro: 'La conversion de <strong>JSON en classes Java</strong> est l\'une des taches les plus courantes dans le developpement backend et mobile. Lorsque votre application recoit une reponse JSON d\'une API REST, vous avez besoin de classes Java bien structurees (souvent appelees POJOs) pour deserialiser ces donnees. Ce guide complet couvre le mapping des types, les exemples Jackson et Gson, l\'integration Lombok, les Java Records et les bonnes pratiques.',
    linkTool: 'Essayez notre convertisseur gratuit JSON vers Java en ligne.',
    h2_what: 'Qu\'est-ce que la conversion JSON vers Java ?',
    whatDesc1: 'JSON est le format d\'echange de donnees dominant pour les API web. Java, etant un langage a typage statique, necessite des definitions de classes explicites. La conversion JSON vers Java analyse un document JSON et produit les classes Java correspondantes avec des champs types, des getters, des setters et des annotations.',
    whatDesc2: 'Dans une application Spring Boot typique, un controleur recoit un corps de requete HTTP sous forme de chaine JSON. Le framework doit convertir ce JSON en objets Java a l\'aide de bibliotheques comme Jackson ou Gson. Un convertisseur JSON vers classe Java automatise la creation de ces classes de donnees.',
    whatDesc3: 'La meme conversion est essentielle dans le developpement Android ou les bibliotheques Retrofit ou Volley analysent les reponses API en objets Java. Le processus est identique : inspecter la structure JSON, determiner le type de chaque champ, gerer l\'imbrication et les tableaux.',
    h2_typeMapping: 'JSON vers Java : Mapping des types',
    typeMappingDesc: 'Comprendre comment les types JSON correspondent aux types Java est la base de toute conversion :',
    typeMappingTable: '<table><thead><tr><th>Type JSON</th><th>Exemple</th><th>Type(s) Java</th><th>Notes</th></tr></thead><tbody><tr><td>string</td><td><code>"hello"</code></td><td><code>String</code></td><td>Toujours <code>java.lang.String</code></td></tr><tr><td>number (entier)</td><td><code>42</code></td><td><code>int</code>, <code>long</code></td><td><code>long</code> pour les grandes valeurs</td></tr><tr><td>number (decimal)</td><td><code>3.14</code></td><td><code>double</code>, <code>BigDecimal</code></td><td><code>BigDecimal</code> pour les donnees financieres</td></tr><tr><td>boolean</td><td><code>true</code></td><td><code>boolean</code></td><td>Type wrapper si nullable</td></tr><tr><td>null</td><td><code>null</code></td><td><code>null</code></td><td>Types reference uniquement</td></tr><tr><td>array</td><td><code>[1,2]</code></td><td><code>List&lt;T&gt;</code></td><td><code>List</code> prefere</td></tr><tr><td>object</td><td><code>{"k":"v"}</code></td><td>Classe imbriquee</td><td>Classes typees preferees</td></tr></tbody></table>',
    typeMappingExtra: 'Lors de la generation de classes Java a partir de JSON, le choix entre types primitifs et wrappers est important. Les primitifs ne peuvent pas representer <code>null</code>. Pour les valeurs monetaires, utilisez toujours <code>BigDecimal</code>.',
    h2_howWorks: 'Comment fonctionne la conversion JSON vers Java',
    howWorksDesc: 'Un convertisseur JSON vers classe Java suit un processus systematique :',
    howWorksSteps: '<ol><li><strong>Analyser la structure JSON</strong> : Construction d\'un arbre syntaxique abstrait.</li><li><strong>Inferer les types</strong> : Determination du type Java pour chaque paire cle-valeur.</li><li><strong>Generer les noms de classes</strong> : Conversion en PascalCase et camelCase.</li><li><strong>Gerer les objets imbriques</strong> : Chaque objet imbrique genere une classe separee.</li><li><strong>Gerer les tableaux</strong> : Analyse des elements pour determiner le type.</li><li><strong>Ajouter les annotations</strong> : <code>@JsonProperty</code> ou <code>@SerializedName</code> si necessaire.</li><li><strong>Produire le code source</strong> : Code Java formate avec imports et declarations.</li></ol>',
    h2_codeExamples: 'Exemples de code : JSON vers Java avec Jackson et Gson',
    codeJacksonTitle: 'Jackson : ObjectMapper et annotations',
    codeJacksonDesc: 'Jackson est la bibliotheque JSON vers Java la plus utilisee dans l\'ecosysteme Java. Spring Boot l\'utilise par defaut :',
    codeGsonTitle: 'Gson : fromJson et TypeToken',
    codeGsonDesc: 'Gson de Google est populaire en developpement Android et offre une API plus simple pour la conversion JSON vers objet Java :',
    codeManualTitle: 'Generation manuelle de POJO avec pattern Builder',
    codeManualDesc: 'Pour un controle total sur vos classes POJO, le pattern Builder offre immutabilite et lisibilite :',
    codeLombokTitle: 'Integration Lombok pour des POJOs concis',
    codeLombokDesc: 'Lombok elimine le code repetitif avec <code>@Data</code>, <code>@Builder</code>, <code>@NoArgsConstructor</code> et <code>@AllArgsConstructor</code> :',
    h2_nested: 'Travailler avec des structures JSON imbriquees',
    nestedDesc1: 'Les API reelles retournent rarement du JSON plat. La plupart des reponses contiennent des objets profondement imbriques et des types polymorphes :',
    nestedDesc2: '<strong>Objets profondement imbriques</strong> : Chaque niveau d\'imbrication produit une classe Java separee.',
    nestedDesc3: '<strong>Tableaux d\'objets</strong> : Un champ comme <code>"items": [{"id": 1}]</code> correspond a <code>List&lt;Item&gt;</code> en Java.',
    nestedDesc4: '<strong>Types polymorphes</strong> : Les annotations <code>@JsonTypeInfo</code> et <code>@JsonSubTypes</code> de Jackson permettent une deserialisation type-safe.',
    h2_advanced: 'Patterns avances : Records, interfaces scellees et validation',
    advancedDesc1: 'Java 16+ a introduit les Records comme porteurs de donnees immuables, excellents pour remplacer les POJOs. Jackson (2.12+) et Gson supportent la deserialisation de Records :',
    advancedDesc2: 'Les <strong>interfaces scellees</strong> de Java 17 offrent une exhaustivite a la compilation pour le JSON polymorphe.',
    advancedDesc3: '<strong>Champs Optional et securite null</strong> : Utilisez <code>Optional&lt;T&gt;</code> et les annotations Jakarta Bean Validation.',
    h2_bestPractices: 'Bonnes pratiques pour la conversion JSON vers Java',
    bestPracticesDesc: 'Suivez ces bonnes pratiques pour construire des applications robustes :',
    bp1: '<strong>Conventions de nommage coherentes</strong> : Champs camelCase, <code>@JsonProperty</code> pour les cles snake_case.',
    bp2: '<strong>Gestion gracieuse des proprietes inconnues</strong> : <code>@JsonIgnoreProperties(ignoreUnknown = true)</code>.',
    bp3: '<strong>Analyse correcte des dates</strong> : Enregistrez <code>JavaTimeModule</code> avec Jackson.',
    bp4: '<strong>BigDecimal pour les valeurs monetaires</strong> : N\'utilisez jamais <code>float</code> ou <code>double</code> pour l\'argent.',
    bp5: '<strong>Copie defensive</strong> : Retournez des copies defensives des collections mutables.',
    bp6: '<strong>Composition plutot qu\'heritage</strong> : Composez vos classes avec des objets contenus.',
    bp7: '<strong>Generez equals, hashCode et toString</strong> : Utilisez Lombok ou Records.',
    relatedTools: 'Outils connexes : <strong>JSON vers Kotlin</strong>, <strong>JSON vers TypeScript</strong>, <strong>JSON vers C#</strong>.',
    h2_faq: 'Questions frequemment posees',
    faq1_q: 'Jackson ou Gson : quelle bibliotheque utiliser ?',
    faq1_a: 'Jackson est recommande pour la plupart des projets Java. C\'est le defaut de Spring Boot avec de meilleures performances. Gson est plus simple et populaire en Android. Choisissez Jackson pour les backends entreprise et Gson pour les apps Android legeres.',
    faq2_q: 'Records Java ou POJOs traditionnels ?',
    faq2_a: 'Utilisez les Records pour des porteurs de donnees immuables (Java 16+). Utilisez les POJOs traditionnels pour la mutabilite ou la compatibilite. Lombok offre un compromis. Pour Spring Boot 3+, les Records sont la pratique moderne.',
    faq3_q: 'Comment gerer les champs JSON inconnus ?',
    faq3_a: 'Ajoutez @JsonIgnoreProperties(ignoreUnknown = true) au niveau de la classe. Ou configurez Jackson globalement. Pour capturer les champs inconnus, utilisez @JsonAnySetter. Gson les ignore par defaut.',
    conclusion: 'La conversion JSON vers Java est une competence fondamentale. Utilisez notre outil gratuit pour une generation instantanee et consultez ce guide pour les bonnes pratiques.',
    linkToolBottom: 'Convertissez JSON en classes Java instantanement avec notre outil gratuit.',
  },
  de: {
    intro: 'Die Konvertierung von <strong>JSON in Java</strong>-Klassen ist eine der haufigsten Aufgaben in der Backend- und Mobilentwicklung. Wenn Ihre Anwendung eine JSON-Antwort von einer REST-API erhalt, benotigen Sie gut strukturierte Java-Klassen (oft POJOs genannt) zur Deserialisierung. Dieser umfassende Leitfaden behandelt Typ-Mapping, Jackson- und Gson-Beispiele, Lombok-Integration, Java Records und Best Practices.',
    linkTool: 'Testen Sie unseren kostenlosen Online JSON-zu-Java-Konverter.',
    h2_what: 'Was ist JSON-zu-Java-Klassenkonvertierung?',
    whatDesc1: 'JSON ist das dominierende Datenaustauschformat fur Web-APIs. Java als statisch typisierte Sprache erfordert explizite Klassendefinitionen. Die JSON-zu-Java-Konvertierung analysiert ein JSON-Dokument und erzeugt entsprechende Java-Klassen mit typisierten Feldern, Gettern, Settern und Annotationen.',
    whatDesc2: 'In einer typischen Spring Boot-Anwendung empfangt ein Controller den HTTP-Request-Body als JSON-String. Das Framework muss dieses JSON mit Bibliotheken wie Jackson oder Gson in Java-Objekte konvertieren. Ein JSON-zu-Java-Konverter automatisiert die Erstellung dieser Datenklassen.',
    whatDesc3: 'Die gleiche Konvertierung ist in der Android-Entwicklung wesentlich, wo Retrofit oder Volley API-Antworten in Java-Objekte parsen. Der Prozess ist identisch: JSON-Struktur inspizieren, Feldtypen bestimmen, Verschachtelung und Arrays behandeln.',
    h2_typeMapping: 'JSON zu Java: Typ-Mapping',
    typeMappingDesc: 'Das Verstandnis der Zuordnung von JSON-Typen zu Java-Typen ist die Grundlage jeder Konvertierung:',
    typeMappingTable: '<table><thead><tr><th>JSON-Typ</th><th>Beispiel</th><th>Java-Typ(en)</th><th>Hinweise</th></tr></thead><tbody><tr><td>string</td><td><code>"hello"</code></td><td><code>String</code></td><td>Immer <code>java.lang.String</code></td></tr><tr><td>number (ganzzahlig)</td><td><code>42</code></td><td><code>int</code>, <code>long</code></td><td><code>long</code> fur grosse Werte</td></tr><tr><td>number (dezimal)</td><td><code>3.14</code></td><td><code>double</code>, <code>BigDecimal</code></td><td><code>BigDecimal</code> fur Finanzdaten</td></tr><tr><td>boolean</td><td><code>true</code></td><td><code>boolean</code></td><td>Wrapper-Typ wenn nullable</td></tr><tr><td>null</td><td><code>null</code></td><td><code>null</code></td><td>Nur Referenztypen</td></tr><tr><td>array</td><td><code>[1,2]</code></td><td><code>List&lt;T&gt;</code></td><td><code>List</code> bevorzugt</td></tr><tr><td>object</td><td><code>{"k":"v"}</code></td><td>Verschachtelte Klasse</td><td>Stark typisierte Klassen bevorzugt</td></tr></tbody></table>',
    typeMappingExtra: 'Bei der Generierung von Java-Klassen aus JSON ist die Wahl zwischen primitiven Typen und Wrapper-Typen wichtig. Primitive konnen <code>null</code> nicht darstellen. Fur Geldwerte immer <code>BigDecimal</code> verwenden.',
    h2_howWorks: 'Wie die JSON-zu-Java-Konvertierung funktioniert',
    howWorksDesc: 'Ein JSON-zu-Java-Konverter folgt einem systematischen Prozess:',
    howWorksSteps: '<ol><li><strong>JSON-Struktur parsen</strong>: Aufbau eines abstrakten Syntaxbaums.</li><li><strong>Feldtypen ableiten</strong>: Java-Typ fur jedes Schlussel-Wert-Paar bestimmen.</li><li><strong>Klassennamen generieren</strong>: Konvertierung in PascalCase und camelCase.</li><li><strong>Verschachtelte Objekte behandeln</strong>: Jedes verschachtelte Objekt erzeugt eine separate Klasse.</li><li><strong>Arrays behandeln</strong>: Elementtyp-Analyse.</li><li><strong>Annotationen hinzufugen</strong>: <code>@JsonProperty</code> oder <code>@SerializedName</code>.</li><li><strong>Quellcode ausgeben</strong>: Formatierter Java-Code.</li></ol>',
    h2_codeExamples: 'Codebeispiele: JSON zu Java mit Jackson und Gson',
    codeJacksonTitle: 'Jackson: ObjectMapper und Annotationen',
    codeJacksonDesc: 'Jackson ist die am weitesten verbreitete JSON-zu-Java-Bibliothek. Spring Boot verwendet sie standardmassig:',
    codeGsonTitle: 'Gson: fromJson und TypeToken',
    codeGsonDesc: 'Googles Gson ist in der Android-Entwicklung beliebt und bietet eine einfachere API:',
    codeManualTitle: 'Manuelle POJO-Generierung mit Builder-Pattern',
    codeManualDesc: 'Fur volle Kontrolle uber Ihre POJOs bietet das Builder-Pattern Unveranderlichkeit und Lesbarkeit:',
    codeLombokTitle: 'Lombok-Integration fur kompakte POJOs',
    codeLombokDesc: 'Lombok eliminiert Boilerplate mit <code>@Data</code>, <code>@Builder</code>, <code>@NoArgsConstructor</code> und <code>@AllArgsConstructor</code>:',
    h2_nested: 'Arbeiten mit verschachtelten JSON-Strukturen',
    nestedDesc1: 'Reale APIs liefern selten flaches JSON. Die meisten Antworten enthalten tief verschachtelte Objekte und polymorphe Typen:',
    nestedDesc2: '<strong>Tief verschachtelte Objekte</strong>: Jede Verschachtelungsebene erzeugt eine separate Java-Klasse.',
    nestedDesc3: '<strong>Objekt-Arrays</strong>: Ein Feld wie <code>"items": [{"id": 1}]</code> wird zu <code>List&lt;Item&gt;</code> in Java.',
    nestedDesc4: '<strong>Polymorphe Typen</strong>: Jacksons <code>@JsonTypeInfo</code> und <code>@JsonSubTypes</code> ermoglichen typsichere Deserialisierung.',
    h2_advanced: 'Fortgeschrittene Muster: Records, versiegelte Interfaces und Validierung',
    advancedDesc1: 'Java 16+ fuhrte Records als unveranderliche Datentrager ein, ideal als POJO-Ersatz. Jackson (2.12+) und Gson unterstutzen Record-Deserialisierung:',
    advancedDesc2: 'Java 17 <strong>versiegelte Interfaces</strong> bieten Kompilierzeit-Vollstandigkeit fur polymorphes JSON.',
    advancedDesc3: '<strong>Optional-Felder und Null-Sicherheit</strong>: Verwenden Sie <code>Optional&lt;T&gt;</code> und Jakarta Bean Validation-Annotationen.',
    h2_bestPractices: 'Best Practices fur JSON-zu-Java-Konvertierung',
    bestPracticesDesc: 'Befolgen Sie diese Best Practices fur robuste Anwendungen:',
    bp1: '<strong>Konsistente Namenskonventionen</strong>: camelCase-Felder, <code>@JsonProperty</code> fur snake_case-Keys.',
    bp2: '<strong>Unbekannte Properties elegant behandeln</strong>: <code>@JsonIgnoreProperties(ignoreUnknown = true)</code>.',
    bp3: '<strong>Datum/Zeit korrekt parsen</strong>: <code>JavaTimeModule</code> bei Jackson registrieren.',
    bp4: '<strong>BigDecimal fur Geldwerte</strong>: Niemals <code>float</code> oder <code>double</code> fur Geld.',
    bp5: '<strong>Defensive Kopien</strong>: Defensive Kopien mutabler Collections zuruckgeben.',
    bp6: '<strong>Komposition statt Vererbung</strong>: Klassen durch enthaltene Objekte komponieren.',
    bp7: '<strong>equals, hashCode und toString generieren</strong>: Lombok oder Records verwenden.',
    relatedTools: 'Verwandte Tools: <strong>JSON zu Kotlin</strong>, <strong>JSON zu TypeScript</strong>, <strong>JSON zu C#</strong>.',
    h2_faq: 'Haufig gestellte Fragen',
    faq1_q: 'Jackson oder Gson: Welche Bibliothek soll ich verwenden?',
    faq1_a: 'Jackson wird fur die meisten Java-Projekte empfohlen. Es ist der Standard in Spring Boot mit besserer Performance. Gson ist einfacher und in der Android-Entwicklung beliebt. Wahlen Sie Jackson fur Enterprise-Backends und Gson fur leichtgewichtige Android-Apps.',
    faq2_q: 'Java Records oder traditionelle POJOs?',
    faq2_a: 'Verwenden Sie Records fur unveranderliche Datentrager (Java 16+). Verwenden Sie POJOs fur Veranderlichkeit oder Kompatibilitat. Lombok bietet einen Mittelweg. Fur Spring Boot 3+ sind Records die moderne Best Practice.',
    faq3_q: 'Wie gehe ich mit unbekannten JSON-Feldern um?',
    faq3_a: 'Fugen Sie @JsonIgnoreProperties(ignoreUnknown = true) auf Klassenebene hinzu. Oder konfigurieren Sie Jackson global. Um unbekannte Felder aufzufangen, verwenden Sie @JsonAnySetter. Gson ignoriert sie standardmassig.',
    conclusion: 'Die Konvertierung von JSON zu Java ist eine grundlegende Fahigkeit. Nutzen Sie unser kostenloses Tool fur sofortige Generierung und diesen Leitfaden fur Best Practices.',
    linkToolBottom: 'Konvertieren Sie JSON sofort in Java-Klassen mit unserem kostenlosen Tool.',
  },
  es: {
    intro: 'Convertir <strong>JSON a clases Java</strong> es una de las tareas mas comunes en el desarrollo backend y movil. Cuando tu aplicacion recibe una respuesta JSON de una API REST, necesitas clases Java bien estructuradas (llamadas POJOs) para deserializar los datos. Esta guia completa cubre mapeo de tipos, ejemplos con Jackson y Gson, integracion con Lombok, Java Records y mejores practicas.',
    linkTool: 'Prueba nuestro convertidor gratuito de JSON a Java en linea.',
    h2_what: 'Que es la conversion de JSON a clase Java?',
    whatDesc1: 'JSON es el formato de intercambio de datos dominante para APIs web. Java, al ser un lenguaje de tipado estatico, requiere definiciones de clases explicitas. La conversion de JSON a clase Java analiza un documento JSON y produce las clases Java correspondientes con campos tipados, getters, setters y anotaciones.',
    whatDesc2: 'En una aplicacion Spring Boot tipica, un controlador recibe el cuerpo de la solicitud HTTP como cadena JSON. El framework debe convertir ese JSON en objetos Java usando bibliotecas como Jackson o Gson. Un convertidor JSON a clase Java automatiza la creacion de estas clases de datos.',
    whatDesc3: 'La misma conversion es esencial en el desarrollo Android donde Retrofit o Volley analizan respuestas API en objetos Java. El proceso es identico: inspeccionar la estructura JSON, determinar el tipo de cada campo, manejar anidamiento y arrays.',
    h2_typeMapping: 'JSON a Java: Mapeo de tipos',
    typeMappingDesc: 'Entender como los tipos JSON se mapean a tipos Java es la base de cualquier conversion:',
    typeMappingTable: '<table><thead><tr><th>Tipo JSON</th><th>Ejemplo</th><th>Tipo(s) Java</th><th>Notas</th></tr></thead><tbody><tr><td>string</td><td><code>"hello"</code></td><td><code>String</code></td><td>Siempre <code>java.lang.String</code></td></tr><tr><td>number (entero)</td><td><code>42</code></td><td><code>int</code>, <code>long</code></td><td><code>long</code> para valores grandes</td></tr><tr><td>number (decimal)</td><td><code>3.14</code></td><td><code>double</code>, <code>BigDecimal</code></td><td><code>BigDecimal</code> para datos financieros</td></tr><tr><td>boolean</td><td><code>true</code></td><td><code>boolean</code></td><td>Tipo wrapper si nullable</td></tr><tr><td>null</td><td><code>null</code></td><td><code>null</code></td><td>Solo tipos referencia</td></tr><tr><td>array</td><td><code>[1,2]</code></td><td><code>List&lt;T&gt;</code></td><td><code>List</code> preferido</td></tr><tr><td>object</td><td><code>{"k":"v"}</code></td><td>Clase anidada</td><td>Clases tipadas preferidas</td></tr></tbody></table>',
    typeMappingExtra: 'Al generar clases Java desde JSON, la eleccion entre tipos primitivos y wrappers es importante. Los primitivos no pueden representar <code>null</code>. Para valores monetarios, usa siempre <code>BigDecimal</code>.',
    h2_howWorks: 'Como funciona la conversion JSON a Java',
    howWorksDesc: 'Un convertidor JSON a clase Java sigue un proceso sistematico:',
    howWorksSteps: '<ol><li><strong>Analizar la estructura JSON</strong>: Construccion de un arbol sintactico abstracto.</li><li><strong>Inferir tipos de campo</strong>: Determinar el tipo Java para cada par clave-valor.</li><li><strong>Generar nombres de clase</strong>: Conversion a PascalCase y camelCase.</li><li><strong>Manejar objetos anidados</strong>: Cada objeto anidado genera una clase separada.</li><li><strong>Manejar arrays</strong>: Analisis del tipo de elemento.</li><li><strong>Agregar anotaciones</strong>: <code>@JsonProperty</code> o <code>@SerializedName</code>.</li><li><strong>Producir codigo fuente</strong>: Codigo Java formateado.</li></ol>',
    h2_codeExamples: 'Ejemplos de codigo: JSON a Java con Jackson y Gson',
    codeJacksonTitle: 'Jackson: ObjectMapper y anotaciones',
    codeJacksonDesc: 'Jackson es la biblioteca JSON a Java mas utilizada. Spring Boot la usa por defecto:',
    codeGsonTitle: 'Gson: fromJson y TypeToken',
    codeGsonDesc: 'Gson de Google es popular en desarrollo Android y ofrece una API mas simple:',
    codeManualTitle: 'Generacion manual de POJO con patron Builder',
    codeManualDesc: 'Para control total sobre tus POJOs, el patron Builder ofrece inmutabilidad y legibilidad:',
    codeLombokTitle: 'Integracion Lombok para POJOs concisos',
    codeLombokDesc: 'Lombok elimina el codigo repetitivo con <code>@Data</code>, <code>@Builder</code>, <code>@NoArgsConstructor</code> y <code>@AllArgsConstructor</code>:',
    h2_nested: 'Trabajar con estructuras JSON anidadas',
    nestedDesc1: 'Las APIs reales rara vez devuelven JSON plano. La mayoria contiene objetos profundamente anidados y tipos polimorficos:',
    nestedDesc2: '<strong>Objetos profundamente anidados</strong>: Cada nivel de anidamiento produce una clase Java separada.',
    nestedDesc3: '<strong>Arrays de objetos</strong>: Un campo como <code>"items": [{"id": 1}]</code> se mapea a <code>List&lt;Item&gt;</code> en Java.',
    nestedDesc4: '<strong>Tipos polimorficos</strong>: Las anotaciones <code>@JsonTypeInfo</code> y <code>@JsonSubTypes</code> de Jackson permiten deserializacion type-safe.',
    h2_advanced: 'Patrones avanzados: Records, interfaces selladas y validacion',
    advancedDesc1: 'Java 16+ introdujo Records como portadores de datos inmutables, excelentes para reemplazar POJOs. Jackson (2.12+) y Gson soportan deserializacion de Records:',
    advancedDesc2: 'Las <strong>interfaces selladas</strong> de Java 17 ofrecen exhaustividad en tiempo de compilacion para JSON polimorfico.',
    advancedDesc3: '<strong>Campos Optional y seguridad null</strong>: Usa <code>Optional&lt;T&gt;</code> y anotaciones Jakarta Bean Validation.',
    h2_bestPractices: 'Mejores practicas para conversion JSON a Java',
    bestPracticesDesc: 'Sigue estas mejores practicas para aplicaciones robustas:',
    bp1: '<strong>Convenciones de nomenclatura consistentes</strong>: Campos camelCase, <code>@JsonProperty</code> para claves snake_case.',
    bp2: '<strong>Manejo elegante de propiedades desconocidas</strong>: <code>@JsonIgnoreProperties(ignoreUnknown = true)</code>.',
    bp3: '<strong>Analisis correcto de fechas</strong>: Registrar <code>JavaTimeModule</code> con Jackson.',
    bp4: '<strong>BigDecimal para valores monetarios</strong>: Nunca usar <code>float</code> o <code>double</code> para dinero.',
    bp5: '<strong>Copia defensiva</strong>: Devolver copias defensivas de colecciones mutables.',
    bp6: '<strong>Composicion sobre herencia</strong>: Componer clases con objetos contenidos.',
    bp7: '<strong>Generar equals, hashCode y toString</strong>: Usar Lombok o Records.',
    relatedTools: 'Herramientas relacionadas: <strong>JSON a Kotlin</strong>, <strong>JSON a TypeScript</strong>, <strong>JSON a C#</strong>.',
    h2_faq: 'Preguntas frecuentes',
    faq1_q: 'Jackson o Gson: cual biblioteca debo usar?',
    faq1_a: 'Jackson es la opcion recomendada para la mayoria de proyectos Java. Es el defecto de Spring Boot con mejor rendimiento. Gson es mas simple y popular en Android. Elige Jackson para backends empresariales y Gson para apps Android ligeras.',
    faq2_q: 'Java Records o POJOs tradicionales?',
    faq2_a: 'Usa Records para portadores de datos inmutables (Java 16+). Usa POJOs para mutabilidad o compatibilidad. Lombok ofrece un punto medio. Para Spring Boot 3+, Records son la practica moderna.',
    faq3_q: 'Como manejar campos JSON desconocidos?',
    faq3_a: 'Agrega @JsonIgnoreProperties(ignoreUnknown = true) a nivel de clase. O configura Jackson globalmente. Para capturar campos desconocidos, usa @JsonAnySetter. Gson los ignora por defecto.',
    conclusion: 'Convertir JSON a Java es una habilidad fundamental. Usa nuestra herramienta gratuita para generacion instantanea y consulta esta guia para mejores practicas.',
    linkToolBottom: 'Convierte JSON a clases Java al instante con nuestra herramienta gratuita.',
  },
  ja: {
    intro: '<strong>JSONからJava</strong>クラスへの変換は、バックエンドおよびモバイル開発で最も一般的なタスクの一つです。REST APIからJSON応答を受信する際、データをデシリアライズするために適切に構造化されたJavaクラス（POJO）が必要です。この包括的なガイドでは、型マッピング、JacksonとGsonの例、Lombok統合、Java Records、ベストプラクティスをカバーします。',
    linkTool: '無料オンラインJSON to Javaクラスコンバーターをお試しください。',
    h2_what: 'JSON to Javaクラス変換とは？',
    whatDesc1: 'JSONはWeb API、設定ファイル、NoSQLデータベースの主要なデータ交換フォーマットです。Javaは静的型付け言語であり、明示的なクラス定義が必要です。JSON to Javaクラス変換はJSONドキュメントを分析し、適切に型付けされたフィールド、ゲッター、セッター、アノテーションを持つ対応するJavaクラスを生成します。',
    whatDesc2: '典型的なSpring Bootアプリケーションでは、コントローラーがJSON文字列としてHTTPリクエストボディを受信します。フレームワークはJacksonやGsonなどのライブラリを使用してJSONをJavaオブジェクトに変換する必要があります。JSONからJavaクラスコンバーターはこれらのデータクラスの作成を自動化します。',
    whatDesc3: 'Android開発でもRetrofitやVolleyライブラリがAPIレスポンスをJavaオブジェクトにパースする際に同じ変換が必要です。プロセスは同一です：JSON構造の検査、各フィールドの型決定、ネストと配列の処理。',
    h2_typeMapping: 'JSON to Java：型マッピング',
    typeMappingDesc: 'JSONの型がJavaの型にどのようにマッピングされるかを理解することが変換の基盤です：',
    typeMappingTable: '<table><thead><tr><th>JSON型</th><th>例</th><th>Java型</th><th>備考</th></tr></thead><tbody><tr><td>string</td><td><code>"hello"</code></td><td><code>String</code></td><td>常に<code>java.lang.String</code></td></tr><tr><td>number（整数）</td><td><code>42</code></td><td><code>int</code>、<code>long</code></td><td>大きな値には<code>long</code></td></tr><tr><td>number（小数）</td><td><code>3.14</code></td><td><code>double</code>、<code>BigDecimal</code></td><td>金融データには<code>BigDecimal</code></td></tr><tr><td>boolean</td><td><code>true</code></td><td><code>boolean</code></td><td>null可能時はラッパー型</td></tr><tr><td>null</td><td><code>null</code></td><td><code>null</code></td><td>参照型のみ</td></tr><tr><td>array</td><td><code>[1,2]</code></td><td><code>List&lt;T&gt;</code></td><td><code>List</code>推奨</td></tr><tr><td>object</td><td><code>{"k":"v"}</code></td><td>ネストクラス</td><td>強い型付けクラス推奨</td></tr></tbody></table>',
    typeMappingExtra: 'JSONからJavaクラスを生成する際、プリミティブ型とラッパー型の選択が重要です。プリミティブは<code>null</code>を表現できません。金額には常に<code>BigDecimal</code>を使用してください。',
    h2_howWorks: 'JSON to Java変換の仕組み',
    howWorksDesc: 'JSON to Javaクラスコンバーターは体系的なプロセスに従います：',
    howWorksSteps: '<ol><li><strong>JSON構造を解析</strong>：抽象構文木を構築。</li><li><strong>フィールド型を推論</strong>：各キーバリューペアのJava型を決定。</li><li><strong>クラス名を生成</strong>：PascalCaseとcamelCaseに変換。</li><li><strong>ネストオブジェクトを処理</strong>：各ネストオブジェクトが別クラスを生成。</li><li><strong>配列を処理</strong>：要素型を分析。</li><li><strong>アノテーションを追加</strong>：<code>@JsonProperty</code>または<code>@SerializedName</code>。</li><li><strong>ソースコードを出力</strong>：フォーマットされたJavaコード。</li></ol>',
    h2_codeExamples: 'コード例：JacksonとGsonでJSON to Java',
    codeJacksonTitle: 'Jackson：ObjectMapperとアノテーション',
    codeJacksonDesc: 'Jacksonは最も広く使用されているJSON to Javaライブラリです。Spring Bootはデフォルトで使用します：',
    codeGsonTitle: 'Gson：fromJsonとTypeToken',
    codeGsonDesc: 'GoogleのGsonはAndroid開発で人気があり、よりシンプルなAPIを提供します：',
    codeManualTitle: 'Builderパターンによる手動POJO生成',
    codeManualDesc: 'POJOを完全にコントロールする必要がある場合、Builderパターンは不変性と可読性を提供します：',
    codeLombokTitle: '簡潔なPOJOのためのLombok統合',
    codeLombokDesc: 'Lombokは<code>@Data</code>、<code>@Builder</code>、<code>@NoArgsConstructor</code>、<code>@AllArgsConstructor</code>でボイラープレートを排除します：',
    h2_nested: 'ネストされたJSON構造の操作',
    nestedDesc1: '実際のAPIはフラットなJSONを返すことは稀です。ほとんどのレスポンスは深くネストされたオブジェクトとポリモーフィック型を含みます：',
    nestedDesc2: '<strong>深くネストされたオブジェクト</strong>：各ネストレベルが別のJavaクラスを生成します。',
    nestedDesc3: '<strong>オブジェクトの配列</strong>：<code>"items": [{"id": 1}]</code>はJavaで<code>List&lt;Item&gt;</code>にマッピングされます。',
    nestedDesc4: '<strong>ポリモーフィック型</strong>：Jacksonの<code>@JsonTypeInfo</code>と<code>@JsonSubTypes</code>アノテーションが型安全なデシリアライゼーションを可能にします。',
    h2_advanced: '高度なパターン：Records、シールドインターフェース、バリデーション',
    advancedDesc1: 'Java 16+はRecordsを不変データキャリアとして導入し、POJO置き換えに最適です。Jackson（2.12+）とGsonはRecordデシリアライゼーションをサポートします：',
    advancedDesc2: 'Java 17の<strong>シールドインターフェース</strong>はポリモーフィックJSONのコンパイル時網羅性を提供します。',
    advancedDesc3: '<strong>Optionalフィールドとnull安全</strong>：<code>Optional&lt;T&gt;</code>とJakarta Bean Validationアノテーションを使用してください。',
    h2_bestPractices: 'JSON to Java変換のベストプラクティス',
    bestPracticesDesc: '堅牢なアプリケーションを構築するためのベストプラクティス：',
    bp1: '<strong>一貫した命名規則</strong>：camelCaseフィールド、snake_caseキーには<code>@JsonProperty</code>。',
    bp2: '<strong>未知のプロパティを適切に処理</strong>：<code>@JsonIgnoreProperties(ignoreUnknown = true)</code>。',
    bp3: '<strong>日付時刻を正しくパース</strong>：Jacksonに<code>JavaTimeModule</code>を登録。',
    bp4: '<strong>金額にはBigDecimal</strong>：<code>float</code>や<code>double</code>を金額に使用しない。',
    bp5: '<strong>防御的コピー</strong>：可変コレクションの防御的コピーを返す。',
    bp6: '<strong>継承より合成</strong>：含有オブジェクトでクラスを構成。',
    bp7: '<strong>equals、hashCode、toStringを生成</strong>：LombokまたはRecordsを使用。',
    relatedTools: '関連ツール：<strong>JSON to Kotlin</strong>、<strong>JSON to TypeScript</strong>、<strong>JSON to C#</strong>。',
    h2_faq: 'よくある質問',
    faq1_q: 'JacksonとGson：どちらを使うべき？',
    faq1_a: 'Jacksonがほとんどのプロジェクトに推奨です。Spring Bootのデフォルトで高性能です。GsonはよりシンプルでAndroid開発で人気です。エンタープライズバックエンドにはJackson、軽量AndroidアプリにはGsonを選択してください。',
    faq2_q: 'Java Recordsか従来のPOJOか？',
    faq2_a: '不変データキャリアにはRecords（Java 16+）を使用。可変性や互換性が必要な場合はPOJO。Lombokは中間的選択肢。Spring Boot 3+ではRecordsがモダンなベストプラクティスです。',
    faq3_q: '未知のJSONフィールドをどう処理する？',
    faq3_a: 'クラスレベルで@JsonIgnoreProperties(ignoreUnknown = true)を追加。またはJacksonをグローバルに設定。未知フィールドをキャプチャするには@JsonAnySetterを使用。Gsonはデフォルトで無視します。',
    conclusion: 'JSONからJavaクラスへの変換はすべてのJava開発者の基本スキルです。無料オンラインツールで即座にコードを生成し、本ガイドでベストプラクティスを参照してください。',
    linkToolBottom: '無料オンラインツールでJSONをJavaクラスに即座に変換。',
  },
  ko: {
    intro: '<strong>JSON을 Java</strong> 클래스로 변환하는 것은 백엔드 및 모바일 개발에서 가장 일반적인 작업 중 하나입니다. REST API에서 JSON 응답을 받을 때 데이터를 역직렬화하기 위해 잘 구조화된 Java 클래스(POJO)가 필요합니다. 이 종합 가이드는 타입 매핑, Jackson과 Gson 예제, Lombok 통합, Java Records, 모범 사례를 다룹니다.',
    linkTool: '무료 온라인 JSON to Java 클래스 변환기를 사용해 보세요.',
    h2_what: 'JSON to Java 클래스 변환이란?',
    whatDesc1: 'JSON은 웹 API, 구성 파일, NoSQL 데이터베이스의 지배적인 데이터 교환 형식입니다. Java는 정적 타입 언어로 명시적 클래스 정의가 필요합니다. JSON to Java 클래스 변환은 JSON 문서를 분석하여 적절한 타입의 필드, getter, setter, 어노테이션을 가진 대응하는 Java 클래스를 생성합니다.',
    whatDesc2: '일반적인 Spring Boot 애플리케이션에서 컨트롤러는 JSON 문자열로 HTTP 요청 본문을 받습니다. 프레임워크는 Jackson이나 Gson 같은 라이브러리를 사용하여 JSON을 Java 객체로 변환해야 합니다. JSON to Java 클래스 변환기는 이러한 데이터 클래스 생성을 자동화합니다.',
    whatDesc3: 'Android 개발에서도 Retrofit이나 Volley 라이브러리가 API 응답을 Java 객체로 파싱할 때 동일한 변환이 필요합니다. 프로세스는 동일합니다: JSON 구조 검사, 각 필드의 타입 결정, 중첩과 배열 처리.',
    h2_typeMapping: 'JSON to Java: 타입 매핑',
    typeMappingDesc: 'JSON 타입이 Java 타입에 어떻게 매핑되는지 이해하는 것이 변환의 기초입니다:',
    typeMappingTable: '<table><thead><tr><th>JSON 타입</th><th>예시</th><th>Java 타입</th><th>참고</th></tr></thead><tbody><tr><td>string</td><td><code>"hello"</code></td><td><code>String</code></td><td>항상 <code>java.lang.String</code></td></tr><tr><td>number(정수)</td><td><code>42</code></td><td><code>int</code>, <code>long</code></td><td>큰 값에는 <code>long</code></td></tr><tr><td>number(소수)</td><td><code>3.14</code></td><td><code>double</code>, <code>BigDecimal</code></td><td>금융 데이터에는 <code>BigDecimal</code></td></tr><tr><td>boolean</td><td><code>true</code></td><td><code>boolean</code></td><td>null 가능시 래퍼 타입</td></tr><tr><td>null</td><td><code>null</code></td><td><code>null</code></td><td>참조 타입만</td></tr><tr><td>array</td><td><code>[1,2]</code></td><td><code>List&lt;T&gt;</code></td><td><code>List</code> 권장</td></tr><tr><td>object</td><td><code>{"k":"v"}</code></td><td>중첩 클래스</td><td>강한 타입 클래스 권장</td></tr></tbody></table>',
    typeMappingExtra: 'JSON에서 Java 클래스를 생성할 때 기본 타입과 래퍼 타입의 선택이 중요합니다. 기본 타입은 <code>null</code>을 표현할 수 없습니다. 금액에는 항상 <code>BigDecimal</code>을 사용하세요.',
    h2_howWorks: 'JSON to Java 변환 작동 원리',
    howWorksDesc: 'JSON to Java 클래스 변환기는 체계적인 프로세스를 따릅니다:',
    howWorksSteps: '<ol><li><strong>JSON 구조 파싱</strong>: 추상 구문 트리 구축.</li><li><strong>필드 타입 추론</strong>: 각 키-값 쌍의 Java 타입 결정.</li><li><strong>클래스 이름 생성</strong>: PascalCase와 camelCase로 변환.</li><li><strong>중첩 객체 처리</strong>: 각 중첩 객체가 별도 클래스 생성.</li><li><strong>배열 처리</strong>: 요소 타입 분석.</li><li><strong>어노테이션 추가</strong>: <code>@JsonProperty</code> 또는 <code>@SerializedName</code>.</li><li><strong>소스 코드 출력</strong>: 포맷된 Java 코드.</li></ol>',
    h2_codeExamples: '코드 예제: Jackson과 Gson으로 JSON to Java',
    codeJacksonTitle: 'Jackson: ObjectMapper와 어노테이션',
    codeJacksonDesc: 'Jackson은 가장 널리 사용되는 JSON to Java 라이브러리입니다. Spring Boot가 기본으로 사용합니다:',
    codeGsonTitle: 'Gson: fromJson과 TypeToken',
    codeGsonDesc: 'Google의 Gson은 Android 개발에서 인기가 있으며 더 간단한 API를 제공합니다:',
    codeManualTitle: 'Builder 패턴으로 수동 POJO 생성',
    codeManualDesc: 'POJO를 완전히 제어해야 할 때 Builder 패턴은 불변성과 가독성을 제공합니다:',
    codeLombokTitle: '간결한 POJO를 위한 Lombok 통합',
    codeLombokDesc: 'Lombok은 <code>@Data</code>, <code>@Builder</code>, <code>@NoArgsConstructor</code>, <code>@AllArgsConstructor</code>로 보일러플레이트를 제거합니다:',
    h2_nested: '중첩 JSON 구조 작업',
    nestedDesc1: '실제 API는 플랫 JSON을 반환하는 경우가 드뭅니다. 대부분 깊게 중첩된 객체와 다형적 타입을 포함합니다:',
    nestedDesc2: '<strong>깊게 중첩된 객체</strong>: 각 중첩 레벨이 별도의 Java 클래스를 생성합니다.',
    nestedDesc3: '<strong>객체 배열</strong>: <code>"items": [{"id": 1}]</code>은 Java에서 <code>List&lt;Item&gt;</code>으로 매핑됩니다.',
    nestedDesc4: '<strong>다형적 타입</strong>: Jackson의 <code>@JsonTypeInfo</code>와 <code>@JsonSubTypes</code> 어노테이션이 타입 안전한 역직렬화를 가능하게 합니다.',
    h2_advanced: '고급 패턴: Records, 봉인 인터페이스, 유효성 검사',
    advancedDesc1: 'Java 16+는 Records를 불변 데이터 캐리어로 도입했으며 POJO 대체에 이상적입니다. Jackson(2.12+)과 Gson은 Record 역직렬화를 지원합니다:',
    advancedDesc2: 'Java 17의 <strong>봉인 인터페이스</strong>는 다형적 JSON에 대한 컴파일 시간 완전성을 제공합니다.',
    advancedDesc3: '<strong>Optional 필드와 null 안전</strong>: <code>Optional&lt;T&gt;</code>와 Jakarta Bean Validation 어노테이션을 사용하세요.',
    h2_bestPractices: 'JSON to Java 변환 모범 사례',
    bestPracticesDesc: '견고한 애플리케이션 구축을 위한 모범 사례:',
    bp1: '<strong>일관된 명명 규칙</strong>: camelCase 필드, snake_case 키에는 <code>@JsonProperty</code>.',
    bp2: '<strong>알 수 없는 속성의 우아한 처리</strong>: <code>@JsonIgnoreProperties(ignoreUnknown = true)</code>.',
    bp3: '<strong>날짜/시간의 올바른 파싱</strong>: Jackson에 <code>JavaTimeModule</code> 등록.',
    bp4: '<strong>금액에는 BigDecimal</strong>: 금액에 <code>float</code>이나 <code>double</code> 사용 금지.',
    bp5: '<strong>방어적 복사</strong>: 가변 컬렉션의 방어적 복사본 반환.',
    bp6: '<strong>상속보다 합성</strong>: 포함된 객체로 클래스 구성.',
    bp7: '<strong>equals, hashCode, toString 생성</strong>: Lombok 또는 Records 사용.',
    relatedTools: '관련 도구: <strong>JSON to Kotlin</strong>, <strong>JSON to TypeScript</strong>, <strong>JSON to C#</strong>.',
    h2_faq: '자주 묻는 질문',
    faq1_q: 'Jackson과 Gson 중 어떤 라이브러리를 사용해야 하나요?',
    faq1_a: 'Jackson이 대부분의 프로젝트에 권장됩니다. Spring Boot의 기본이며 성능이 우수합니다. Gson은 더 간단하고 Android 개발에서 인기입니다. 엔터프라이즈 백엔드에는 Jackson, 경량 Android 앱에는 Gson을 선택하세요.',
    faq2_q: 'Java Records와 전통적인 POJO 중 무엇을 사용해야 하나요?',
    faq2_a: '불변 데이터 캐리어에는 Records(Java 16+)를 사용하세요. 가변성이나 호환성이 필요하면 POJO. Lombok은 중간적 선택입니다. Spring Boot 3+에서는 Records가 모던한 모범 사례입니다.',
    faq3_q: '알 수 없는 JSON 필드를 어떻게 처리하나요?',
    faq3_a: '클래스 레벨에서 @JsonIgnoreProperties(ignoreUnknown = true)를 추가하세요. 또는 Jackson을 전역으로 설정하세요. 알 수 없는 필드를 캡처하려면 @JsonAnySetter를 사용하세요. Gson은 기본적으로 무시합니다.',
    conclusion: 'JSON에서 Java 클래스로의 변환은 모든 Java 개발자의 기본 기술입니다. 무료 온라인 도구로 즉시 코드를 생성하고 본 가이드에서 모범 사례를 참조하세요.',
    linkToolBottom: '무료 온라인 도구로 JSON을 Java 클래스로 즉시 변환하세요.',
  },
};

export default function JsonToJavaClassConverterGuide({ lang }: { lang: string }) {
  const s = t[lang] || t['en'];

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: s.faq1_q, acceptedAnswer: { '@type': 'Answer', text: s.faq1_a } },
      { '@type': 'Question', name: s.faq2_q, acceptedAnswer: { '@type': 'Answer', text: s.faq2_a } },
      { '@type': 'Question', name: s.faq3_q, acceptedAnswer: { '@type': 'Answer', text: s.faq3_a } },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <p dangerouslySetInnerHTML={{ __html: s.intro }} />
      <p><Link href={`/${lang}/tools/json-to-java`} style={{ fontWeight: 600 }}>{s.linkTool}</Link></p>

      {/* Section 1: What is JSON to Java Class Conversion? */}
      <h2>{s.h2_what}</h2>
      <p dangerouslySetInnerHTML={{ __html: s.whatDesc1 }} />
      <p dangerouslySetInnerHTML={{ __html: s.whatDesc2 }} />
      <p dangerouslySetInnerHTML={{ __html: s.whatDesc3 }} />

      {/* Section 2: JSON to Java Type Mapping */}
      <h2>{s.h2_typeMapping}</h2>
      <p>{s.typeMappingDesc}</p>
      <div dangerouslySetInnerHTML={{ __html: s.typeMappingTable }} />
      <p dangerouslySetInnerHTML={{ __html: s.typeMappingExtra }} />

      {/* Section 3: How JSON to Java Conversion Works */}
      <h2>{s.h2_howWorks}</h2>
      <p dangerouslySetInnerHTML={{ __html: s.howWorksDesc }} />
      <div dangerouslySetInnerHTML={{ __html: s.howWorksSteps }} />

      {/* Section 4: Code Examples */}
      <h2>{s.h2_codeExamples}</h2>

      <h3>{s.codeJacksonTitle}</h3>
      <p dangerouslySetInnerHTML={{ __html: s.codeJacksonDesc }} />
      <pre><code>{`// === Sample JSON ===
// {
//   "user_id": 1001,
//   "user_name": "Alice",
//   "email": "alice@example.com",
//   "is_active": true,
//   "balance": 1250.75,
//   "tags": ["admin", "developer"],
//   "address": {
//     "street": "123 Main St",
//     "city": "Springfield",
//     "zip_code": "62704"
//   }
// }

// === Java POJO with Jackson annotations ===
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.DeserializationFeature;
import java.math.BigDecimal;
import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
public class User {
    @JsonProperty("user_id")
    private long userId;

    @JsonProperty("user_name")
    private String userName;

    private String email;

    @JsonProperty("is_active")
    private boolean isActive;

    private BigDecimal balance;

    private List<String> tags;

    private Address address;

    // Getters and setters
    public long getUserId() { return userId; }
    public void setUserId(long userId) { this.userId = userId; }
    public String getUserName() { return userName; }
    public void setUserName(String userName) { this.userName = userName; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public boolean isActive() { return isActive; }
    public void setActive(boolean active) { isActive = active; }
    public BigDecimal getBalance() { return balance; }
    public void setBalance(BigDecimal balance) { this.balance = balance; }
    public List<String> getTags() { return tags; }
    public void setTags(List<String> tags) { this.tags = tags; }
    public Address getAddress() { return address; }
    public void setAddress(Address address) { this.address = address; }
}

public class Address {
    private String street;
    private String city;

    @JsonProperty("zip_code")
    private String zipCode;

    // Getters and setters omitted for brevity
}

// === Deserialization with ObjectMapper ===
ObjectMapper mapper = new ObjectMapper();
mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
mapper.configure(DeserializationFeature.USE_BIG_DECIMAL_FOR_FLOATS, true);

// Single object
User user = mapper.readValue(jsonString, User.class);

// List of objects using TypeReference
List<User> users = mapper.readValue(
    jsonArrayString,
    new TypeReference<List<User>>() {}
);

// Custom deserializer for special cases
import com.fasterxml.jackson.databind.JsonDeserializer;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;

public class EpochToInstantDeserializer
    extends JsonDeserializer<Instant> {
    @Override
    public Instant deserialize(JsonParser p, DeserializationContext ctx) {
        return Instant.ofEpochSecond(p.getLongValue());
    }
}

// Usage: @JsonDeserialize(using = EpochToInstantDeserializer.class)
// private Instant createdAt;`}</code></pre>

      <h3>{s.codeGsonTitle}</h3>
      <p dangerouslySetInnerHTML={{ __html: s.codeGsonDesc }} />
      <pre><code>{`import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.annotations.SerializedName;
import com.google.gson.reflect.TypeToken;
import java.lang.reflect.Type;
import java.util.List;

public class User {
    @SerializedName("user_id")
    private long userId;

    @SerializedName("user_name")
    private String userName;

    private String email;

    @SerializedName("is_active")
    private boolean isActive;

    private double balance;

    private List<String> tags;

    private Address address;

    // Getters and setters
    public long getUserId() { return userId; }
    public String getUserName() { return userName; }
    public String getEmail() { return email; }
    public boolean isActive() { return isActive; }
    public double getBalance() { return balance; }
    public List<String> getTags() { return tags; }
    public Address getAddress() { return address; }
}

// === Deserialization with Gson ===
Gson gson = new GsonBuilder()
    .setDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSSZ")
    .create();

// Single object
User user = gson.fromJson(jsonString, User.class);

// List of objects using TypeToken
Type userListType = new TypeToken<List<User>>(){}.getType();
List<User> users = gson.fromJson(jsonArrayString, userListType);

// Custom TypeAdapter for special types
import com.google.gson.TypeAdapter;
import com.google.gson.stream.JsonReader;
import com.google.gson.stream.JsonWriter;
import java.time.Instant;

public class InstantAdapter extends TypeAdapter<Instant> {
    @Override
    public void write(JsonWriter out, Instant value) throws Exception {
        out.value(value.toString());
    }

    @Override
    public Instant read(JsonReader in) throws Exception {
        return Instant.parse(in.nextString());
    }
}

// Register: new GsonBuilder()
//   .registerTypeAdapter(Instant.class, new InstantAdapter())
//   .create();`}</code></pre>

      <h3>{s.codeManualTitle}</h3>
      <p dangerouslySetInnerHTML={{ __html: s.codeManualDesc }} />
      <pre><code>{`import java.math.BigDecimal;
import java.util.List;
import java.util.Objects;

public final class Product {
    private final long id;
    private final String name;
    private final BigDecimal price;
    private final boolean inStock;
    private final List<String> categories;

    private Product(Builder builder) {
        this.id = builder.id;
        this.name = Objects.requireNonNull(builder.name, "name required");
        this.price = Objects.requireNonNull(builder.price, "price required");
        this.inStock = builder.inStock;
        this.categories = builder.categories != null
            ? List.copyOf(builder.categories) : List.of();
    }

    // Getters (no setters for immutability)
    public long getId() { return id; }
    public String getName() { return name; }
    public BigDecimal getPrice() { return price; }
    public boolean isInStock() { return inStock; }
    public List<String> getCategories() { return categories; }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Product p)) return false;
        return id == p.id && inStock == p.inStock
            && Objects.equals(name, p.name)
            && Objects.equals(price, p.price)
            && Objects.equals(categories, p.categories);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name, price, inStock, categories);
    }

    @Override
    public String toString() {
        return "Product{id=%d, name='%s', price=%s, inStock=%s}"
            .formatted(id, name, price, inStock);
    }

    // Builder pattern
    public static Builder builder() { return new Builder(); }

    public static class Builder {
        private long id;
        private String name;
        private BigDecimal price;
        private boolean inStock;
        private List<String> categories;

        public Builder id(long id) { this.id = id; return this; }
        public Builder name(String name) { this.name = name; return this; }
        public Builder price(BigDecimal price) { this.price = price; return this; }
        public Builder inStock(boolean inStock) { this.inStock = inStock; return this; }
        public Builder categories(List<String> cats) { this.categories = cats; return this; }
        public Product build() { return new Product(this); }
    }
}

// Usage:
// Product p = Product.builder()
//     .id(42)
//     .name("Wireless Keyboard")
//     .price(new BigDecimal("79.99"))
//     .inStock(true)
//     .categories(List.of("electronics", "peripherals"))
//     .build();`}</code></pre>

      <h3>{s.codeLombokTitle}</h3>
      <p dangerouslySetInnerHTML={{ __html: s.codeLombokDesc }} />
      <pre><code>{`import lombok.Data;
import lombok.Builder;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.extern.jackson.Jacksonized;
import com.fasterxml.jackson.annotation.JsonProperty;
import java.math.BigDecimal;
import java.util.List;

// @Data generates getters, setters, toString, equals, hashCode
// @Builder generates the builder pattern
// @Jacksonized makes the builder work with Jackson deserialization
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Jacksonized
public class Order {
    @JsonProperty("order_id")
    private long orderId;

    @JsonProperty("customer_name")
    private String customerName;

    private BigDecimal total;

    private String status;

    @Builder.Default
    private List<OrderItem> items = List.of();

    @JsonProperty("created_at")
    private String createdAt;
}

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Jacksonized
public class OrderItem {
    @JsonProperty("product_id")
    private long productId;

    private String name;

    private int quantity;

    @JsonProperty("unit_price")
    private BigDecimal unitPrice;
}

// Deserialization works automatically:
// ObjectMapper mapper = new ObjectMapper();
// Order order = mapper.readValue(json, Order.class);

// Manual construction with builder:
// Order order = Order.builder()
//     .orderId(5001)
//     .customerName("Bob")
//     .total(new BigDecimal("159.98"))
//     .status("shipped")
//     .items(List.of(
//         OrderItem.builder()
//             .productId(42)
//             .name("Keyboard")
//             .quantity(2)
//             .unitPrice(new BigDecimal("79.99"))
//             .build()
//     ))
//     .build();`}</code></pre>

      {/* Section 5: Working with Nested JSON */}
      <h2>{s.h2_nested}</h2>
      <p dangerouslySetInnerHTML={{ __html: s.nestedDesc1 }} />
      <p dangerouslySetInnerHTML={{ __html: s.nestedDesc2 }} />
      <p dangerouslySetInnerHTML={{ __html: s.nestedDesc3 }} />
      <p dangerouslySetInnerHTML={{ __html: s.nestedDesc4 }} />
      <pre><code>{`// Example: polymorphic deserialization with Jackson
@JsonTypeInfo(use = JsonTypeInfo.Id.NAME, property = "type")
@JsonSubTypes({
    @JsonSubTypes.Type(value = EmailNotification.class, name = "email"),
    @JsonSubTypes.Type(value = SmsNotification.class, name = "sms"),
    @JsonSubTypes.Type(value = PushNotification.class, name = "push")
})
public abstract class Notification {
    private String type;
    private String message;
    private Instant createdAt;
    // getters and setters
}

public class EmailNotification extends Notification {
    private String recipient;
    private String subject;
    // getters and setters
}

public class SmsNotification extends Notification {
    private String phoneNumber;
    // getters and setters
}

public class PushNotification extends Notification {
    private String deviceToken;
    private String title;
    // getters and setters
}

// JSON input:
// {"type":"email","message":"Hello","recipient":"a@b.com","subject":"Hi"}
// Automatically deserializes to EmailNotification.class`}</code></pre>

      {/* Section 6: Advanced Patterns */}
      <h2>{s.h2_advanced}</h2>
      <p dangerouslySetInnerHTML={{ __html: s.advancedDesc1 }} />
      <pre><code>{`// Java Record as a JSON data class (Java 16+)
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import java.math.BigDecimal;
import java.time.Instant;
import java.util.List;

public record Product(
    @JsonProperty("product_id") long productId,
    String name,
    BigDecimal price,
    @JsonProperty("in_stock") boolean inStock,
    List<String> tags,
    @JsonProperty("created_at") Instant createdAt
) {}

// Deserialization with Jackson
ObjectMapper mapper = new ObjectMapper();
mapper.registerModule(new JavaTimeModule());
Product product = mapper.readValue(json, Product.class);

// Records are immutable: no setters needed
System.out.println(product.name());     // "Keyboard"
System.out.println(product.price());    // 79.99
System.out.println(product.tags());     // ["electronics"]`}</code></pre>

      <p dangerouslySetInnerHTML={{ __html: s.advancedDesc2 }} />
      <pre><code>{`// Sealed interface for type-safe JSON polymorphism (Java 17+)
public sealed interface Shape
    permits Circle, Rectangle, Triangle {
    String type();
}

public record Circle(String type, double radius) implements Shape {}
public record Rectangle(String type, double width, double height) implements Shape {}
public record Triangle(String type, double base, double height) implements Shape {}

// Pattern matching (Java 21+)
String describe(Shape shape) {
    return switch (shape) {
        case Circle c -> "Circle with radius " + c.radius();
        case Rectangle r -> "Rectangle " + r.width() + "x" + r.height();
        case Triangle t -> "Triangle base=" + t.base() + " height=" + t.height();
    };
}`}</code></pre>

      <p dangerouslySetInnerHTML={{ __html: s.advancedDesc3 }} />
      <pre><code>{`// Validation annotations on a POJO
import jakarta.validation.constraints.*;
import java.util.Optional;

public class CreateUserRequest {
    @NotNull(message = "Name is required")
    @Size(min = 1, max = 100)
    private String name;

    @NotNull @Email
    private String email;

    @Min(0) @Max(150)
    private int age;

    @NotNull
    @Size(min = 8, max = 128)
    private String password;

    private Optional<String> nickname;  // truly optional field

    // getters and setters
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public int getAge() { return age; }
    public void setAge(int age) { this.age = age; }
    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
    public Optional<String> getNickname() { return nickname; }
    public void setNickname(Optional<String> nickname) { this.nickname = nickname; }
}

// In Spring Boot controller:
// @PostMapping("/users")
// public ResponseEntity<User> createUser(
//     @Valid @RequestBody CreateUserRequest request) {
//     // Validation runs automatically before this method
// }`}</code></pre>

      {/* Section 7: Best Practices */}
      <h2>{s.h2_bestPractices}</h2>
      <p dangerouslySetInnerHTML={{ __html: s.bestPracticesDesc }} />
      <p dangerouslySetInnerHTML={{ __html: s.bp1 }} />
      <p dangerouslySetInnerHTML={{ __html: s.bp2 }} />
      <p dangerouslySetInnerHTML={{ __html: s.bp3 }} />
      <p dangerouslySetInnerHTML={{ __html: s.bp4 }} />
      <p dangerouslySetInnerHTML={{ __html: s.bp5 }} />
      <p dangerouslySetInnerHTML={{ __html: s.bp6 }} />
      <p dangerouslySetInnerHTML={{ __html: s.bp7 }} />
      <p dangerouslySetInnerHTML={{ __html: s.relatedTools }} />

      <p>
        <Link href={`/${lang}/tools/json-to-kotlin`} style={{ marginRight: 16 }}>JSON to Kotlin</Link>
        <Link href={`/${lang}/tools/json-to-typescript`} style={{ marginRight: 16 }}>JSON to TypeScript</Link>
        <Link href={`/${lang}/tools/json-to-csharp`}>JSON to C#</Link>
      </p>

      {/* Section 8: FAQ */}
      <h2>{s.h2_faq}</h2>
      <h3>{s.faq1_q}</h3>
      <p dangerouslySetInnerHTML={{ __html: s.faq1_a }} />
      <h3>{s.faq2_q}</h3>
      <p dangerouslySetInnerHTML={{ __html: s.faq2_a }} />
      <h3>{s.faq3_q}</h3>
      <p dangerouslySetInnerHTML={{ __html: s.faq3_a }} />

      <p style={{ marginTop: 32 }} dangerouslySetInnerHTML={{ __html: s.conclusion }} />
      <p><Link href={`/${lang}/tools/json-to-java`} style={{ fontWeight: 600 }}>{s.linkToolBottom}</Link></p>
    </>
  );
}
