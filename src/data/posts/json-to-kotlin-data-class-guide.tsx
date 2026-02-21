import Link from 'next/link';

const t: Record<string, Record<string, string>> = {
  en: {
    intro: 'Converting <strong>JSON to Kotlin</strong> data classes is an essential skill for modern Android and server-side Kotlin development. When your app consumes a REST API, you need well-defined <strong>Kotlin data classes</strong> to deserialize JSON responses in a type-safe, idiomatic way. Whether you are building an Android app with Retrofit, a Ktor backend, or a Kotlin Multiplatform project, a reliable <strong>JSON to Kotlin data class</strong> converter eliminates tedious boilerplate. This comprehensive guide covers type mapping, <strong>kotlinx.serialization</strong>, <strong>Moshi</strong>, <strong>Gson with Kotlin</strong>, nested structures, null safety, and best practices for generating a <strong>Kotlin data class from JSON</strong>. If you need to <strong>convert JSON to Kotlin online</strong> right now, try our free tool.',
    linkTool: 'Try our free online JSON to Kotlin Data Class Converter instantly.',
    h2_what: 'What Is JSON to Kotlin Data Class Conversion?',
    whatDesc1: 'JSON (JavaScript Object Notation) is the universal data interchange format for REST APIs, configuration files, and cloud services. Kotlin, as a modern statically typed language, requires explicit type declarations before data can be used programmatically. <strong>JSON to Kotlin data class conversion</strong> bridges this gap by analyzing a JSON document and producing idiomatic Kotlin data classes with properly typed properties, default values, and null-safety annotations.',
    whatDesc2: 'In a typical Android application, Retrofit or Ktor HTTP client receives a JSON response from a server. Before your ViewModel or repository can process this data, the networking layer must <strong>convert JSON to Kotlin</strong> objects using a serialization library such as kotlinx.serialization, Moshi, or Gson. Without properly defined data classes, deserialization fails at runtime or, worse, silently produces null values where they are not expected. A <strong>JSON to Kotlin class</strong> converter automates data class creation so you can focus on business logic.',
    whatDesc3: 'The same conversion pattern applies to server-side Kotlin with Ktor or Spring Boot, Kotlin Multiplatform Mobile (KMM) shared modules, and Compose Desktop applications. Whether you call it <strong>JSON to Kotlin data class</strong>, <strong>Kotlin JSON parsing</strong>, or <strong>generate Kotlin class from JSON</strong>, the underlying process is identical: inspect the JSON structure, determine each field\'s Kotlin type, handle nullability and nesting, and produce clean, annotated Kotlin source code.',
    h2_typeMapping: 'JSON to Kotlin: Type Mapping',
    typeMappingDesc: 'Understanding how JSON types map to Kotlin types is the foundation of any <strong>JSON to Kotlin</strong> conversion. The following table shows the standard mappings used by kotlinx.serialization, Moshi, and Gson:',
    typeMappingTable: '<table><thead><tr><th>JSON Type</th><th>Example</th><th>Kotlin Type(s)</th><th>Notes</th></tr></thead><tbody><tr><td>string</td><td><code>"hello"</code></td><td><code>String</code></td><td>Non-nullable by default; use <code>String?</code> if field can be null</td></tr><tr><td>number (integer)</td><td><code>42</code></td><td><code>Int</code>, <code>Long</code></td><td>Use <code>Long</code> for values exceeding 2^31-1; all are non-nullable by default</td></tr><tr><td>number (decimal)</td><td><code>3.14</code></td><td><code>Double</code>, <code>Float</code>, <code>BigDecimal</code></td><td>Use <code>BigDecimal</code> for financial data; import from <code>java.math</code></td></tr><tr><td>boolean</td><td><code>true</code></td><td><code>Boolean</code></td><td>Non-nullable; use <code>Boolean?</code> only if explicitly nullable in JSON</td></tr><tr><td>null</td><td><code>null</code></td><td><code>T?</code> (nullable type)</td><td>Kotlin\'s type system distinguishes nullable from non-nullable</td></tr><tr><td>array</td><td><code>[1, 2, 3]</code></td><td><code>List&lt;T&gt;</code></td><td>Immutable <code>List</code> preferred; use <code>MutableList</code> only when mutation is needed</td></tr><tr><td>object</td><td><code>{"k": "v"}</code></td><td>Nested <code>data class</code></td><td>Strongly typed nested data classes preferred over <code>Map&lt;String, Any&gt;</code></td></tr></tbody></table>',
    typeMappingExtra: 'When you <strong>generate a Kotlin data class from JSON</strong>, Kotlin\'s null safety system is a major advantage over Java. Every property must be explicitly declared as nullable (<code>String?</code>) or non-nullable (<code>String</code>). If a JSON field might be absent or null, declare it as nullable with a default value of <code>null</code>. For arrays, prefer <code>List&lt;T&gt;</code> over <code>Array&lt;T&gt;</code> because Kotlin lists have proper equality semantics in data classes. For monetary values, use <code>java.math.BigDecimal</code> to avoid floating-point precision loss.',
    h2_howWorks: 'How JSON to Kotlin Conversion Works',
    howWorksDesc: 'A <strong>JSON to Kotlin data class</strong> converter follows a systematic process to transform raw JSON into compilable Kotlin source code:',
    howWorksSteps: '<ol><li><strong>Parse the JSON structure</strong>: The converter tokenizes the input JSON, building a tree of objects, arrays, and primitives. Malformed JSON is rejected with a descriptive error at this stage.</li><li><strong>Infer property types</strong>: For each key-value pair, the converter determines the Kotlin type. Strings become <code>String</code>, integers become <code>Int</code> or <code>Long</code>, decimals become <code>Double</code>, booleans become <code>Boolean</code>, and nested objects become new data classes.</li><li><strong>Determine nullability</strong>: If a field\'s value is <code>null</code> in the sample JSON, or if the field appears in some array elements but not others, the converter marks the property as nullable (<code>T?</code>) and assigns a default value of <code>null</code>.</li><li><strong>Generate class names</strong>: JSON keys like <code>user_address</code> or <code>shipping-info</code> are converted to PascalCase class names (<code>UserAddress</code>, <code>ShippingInfo</code>) following Kotlin naming conventions. Property names follow camelCase.</li><li><strong>Handle nested objects</strong>: Each nested JSON object generates a separate Kotlin data class. Deeply nested structures produce a hierarchy of data classes that can be defined as nested classes or top-level classes.</li><li><strong>Handle arrays</strong>: JSON arrays are analyzed to determine the element type. Arrays of objects produce <code>List&lt;ElementClass&gt;</code>. Mixed-type arrays fall back to <code>List&lt;Any&gt;</code>.</li><li><strong>Add serialization annotations</strong>: The converter optionally adds <code>@SerialName</code> (kotlinx.serialization), <code>@Json(name = ...)</code> (Moshi), or <code>@SerializedName</code> (Gson) annotations when the JSON key does not match Kotlin naming conventions.</li><li><strong>Output source code</strong>: The final step emits properly formatted Kotlin source with imports, annotations, data class declarations, and default values.</li></ol>',
    h2_codeExamples: 'Code Examples: JSON to Kotlin with Popular Libraries',
    codeKotlinxTitle: 'kotlinx.serialization: @Serializable and Json.decodeFromString',
    codeKotlinxDesc: '<strong>kotlinx.serialization</strong> is the official Kotlin serialization library maintained by JetBrains. It is the recommended choice for Kotlin Multiplatform projects and modern Android development. It uses compile-time code generation instead of reflection, resulting in excellent performance and smaller APK sizes. Here is a complete example showing how to <strong>convert JSON to Kotlin</strong> objects using <code>@Serializable</code>, <code>@SerialName</code>, and custom serializers:',
    codeMoshiTitle: 'Moshi: @JsonClass and Custom Adapters',
    codeMoshiDesc: '<strong>Moshi</strong> is a modern JSON library for Android and Java by Square (the creators of Retrofit). With the <code>moshi-kotlin-codegen</code> artifact, Moshi generates adapters at compile time, avoiding reflection. It integrates seamlessly with Retrofit and is a popular choice for <strong>Kotlin JSON parsing</strong> in Android projects:',
    codeGsonTitle: 'Gson with Kotlin: fromJson and Null Safety Concerns',
    codeGsonDesc: 'Google\'s <strong>Gson</strong> works with Kotlin but was designed for Java. It uses reflection and does not understand Kotlin\'s null safety system, which means it can assign <code>null</code> to non-nullable Kotlin properties without throwing an error. Despite this limitation, Gson remains widely used in legacy Android projects. Here is how to use <strong>Gson with Kotlin</strong> safely:',
    codeManualTitle: 'Manual Data Class: Default Values, copy(), and Destructuring',
    codeManualDesc: 'When you need full control over your <strong>Kotlin data class from JSON</strong>, writing data classes manually lets you leverage Kotlin\'s powerful features like default parameter values, the <code>copy()</code> function, destructuring declarations, and companion object factory methods:',
    h2_nested: 'Working with Nested JSON',
    nestedDesc1: 'Real-world APIs rarely return flat JSON. Most responses contain deeply nested objects, arrays of objects, and polymorphic types. Converting these complex structures into <strong>Kotlin data classes</strong> requires careful planning and Kotlin-specific patterns:',
    nestedDesc2: '<strong>Nested data classes</strong>: Each level of nesting produces a separate Kotlin data class. For a JSON structure like <code>{"user": {"address": {"city": "NYC"}}}</code>, you need three data classes: the root class, a <code>User</code> data class, and an <code>Address</code> data class. In Kotlin, you can nest these as inner classes or keep them as top-level declarations. Top-level is generally preferred for reusability.',
    nestedDesc3: '<strong>Sealed classes for polymorphism</strong>: When a JSON field can hold different object shapes based on a discriminator (like a <code>"type"</code> field), Kotlin\'s sealed classes provide compile-time exhaustive handling. Combined with kotlinx.serialization\'s <code>@Polymorphic</code> or Moshi\'s <code>PolymorphicJsonAdapterFactory</code>, sealed classes ensure every variant is handled in <code>when</code> expressions:',
    nestedDesc4: '<strong>Arrays of objects</strong>: A JSON field like <code>"items": [{"id": 1}, {"id": 2}]</code> maps to <code>List&lt;Item&gt;</code> in Kotlin. With kotlinx.serialization, this works automatically. With Moshi, use <code>Types.newParameterizedType(List::class.java, Item::class.java)</code> for adapter creation. Always prefer <code>List</code> over <code>Array</code> in data classes because <code>List</code> participates in <code>equals()</code>/<code>hashCode()</code> correctly.',
    h2_kotlinFeatures: 'Kotlin-Specific Features for JSON Data Classes',
    kotlinFeaturesDesc1: '<strong>data class vs regular class</strong>: Kotlin <code>data class</code> automatically generates <code>equals()</code>, <code>hashCode()</code>, <code>toString()</code>, <code>copy()</code>, and <code>componentN()</code> functions. Always use <code>data class</code> for JSON models unless you need custom equality logic or inheritance. A data class must have at least one parameter in its primary constructor.',
    kotlinFeaturesDesc2: '<strong>Null safety with <code>?</code></strong>: Kotlin\'s type system distinguishes between <code>String</code> (never null) and <code>String?</code> (nullable). When converting <strong>JSON to Kotlin</strong>, mark properties as nullable only when the JSON field can genuinely be absent or null. This gives you compile-time protection against <code>NullPointerException</code>, a huge advantage over Java POJOs.',
    kotlinFeaturesDesc3: '<strong>Default values</strong>: Kotlin data class properties can have default values, which act as fallbacks when a JSON field is missing. For example, <code>val status: String = "pending"</code> ensures the property has a value even if the server omits it. With kotlinx.serialization, add <code>@EncodeDefault</code> to control whether defaults are included in serialization output.',
    kotlinFeaturesDesc4: '<strong>Companion object fromJson</strong>: A common Kotlin pattern is to define a <code>fromJson()</code> factory method inside a companion object. This encapsulates deserialization logic within the data class itself, making it easy to call <code>User.fromJson(jsonString)</code> from anywhere in your codebase without exposing serialization library details.',
    kotlinFeaturesDesc5: '<strong>Extension functions</strong>: Kotlin extension functions let you add deserialization helpers to existing types. For example, <code>fun String.toUser(): User</code> adds a <code>toUser()</code> method to all strings. This is idiomatic Kotlin and keeps your JSON parsing code clean and discoverable.',
    h2_bestPractices: 'Best Practices for JSON to Kotlin Conversion',
    bestPracticesDesc: 'Follow these best practices when you <strong>convert JSON to Kotlin</strong> data classes to build robust, maintainable applications:',
    bp1: '<strong>Prefer kotlinx.serialization for new projects</strong>: It is the official JetBrains library, supports Kotlin Multiplatform, uses compile-time code generation (no reflection), and integrates natively with Kotlin\'s type system including null safety and default values. For existing Android projects already using Moshi or Gson, migration is optional but recommended for KMP targets.',
    bp2: '<strong>Use <code>@SerialName</code> for snake_case JSON keys</strong>: Most REST APIs use <code>snake_case</code> while Kotlin conventions use <code>camelCase</code>. Annotate properties with <code>@SerialName("user_name")</code> (kotlinx.serialization), <code>@Json(name = "user_name")</code> (Moshi), or <code>@SerializedName("user_name")</code> (Gson) to bridge naming differences without custom naming strategies.',
    bp3: '<strong>Mark optional fields as nullable with defaults</strong>: If a JSON field might be absent, declare it as <code>val field: Type? = null</code>. This prevents crashes when the server omits fields and is safer than relying on library-specific lenient mode. With kotlinx.serialization, enable <code>ignoreUnknownKeys = true</code> in the <code>Json</code> builder to handle API evolution gracefully.',
    bp4: '<strong>Use sealed classes for polymorphic JSON</strong>: When a JSON response contains objects with a type discriminator, model them as a sealed class hierarchy. This gives you compile-time exhaustiveness in <code>when</code> expressions and eliminates unsafe casting. Both kotlinx.serialization and Moshi support polymorphic serialization out of the box.',
    bp5: '<strong>Avoid Gson for new Kotlin projects</strong>: Gson was designed for Java and does not respect Kotlin\'s null safety. It can silently assign <code>null</code> to non-nullable properties, leading to crashes far from the deserialization site. If you must use Gson, always declare properties as nullable or use a Kotlin-aware wrapper.',
    bp6: '<strong>Keep data classes immutable</strong>: Use <code>val</code> (read-only) properties instead of <code>var</code> (mutable). Immutable data classes are thread-safe, predictable, and work correctly with Kotlin\'s <code>copy()</code> function. If you need to modify data, use <code>copy(field = newValue)</code> to create a new instance.',
    bp7: '<strong>Validate at the boundary</strong>: Add validation logic in a companion object factory method or an <code>init</code> block rather than scattering checks throughout your codebase. For example, <code>init { require(age >= 0) { "Age must be non-negative" } }</code> ensures invalid JSON data fails fast at deserialization time.',
    relatedTools: 'Related tools you might find useful: <strong>JSON to Java</strong> for traditional Java POJOs, <strong>JSON to TypeScript</strong> for frontend interfaces, and <strong>JSON to Dart</strong> for Flutter development.',
    h2_faq: 'Frequently Asked Questions',
    faq1_q: 'kotlinx.serialization vs Moshi vs Gson: which library should I use for JSON to Kotlin?',
    faq1_a: 'For new Kotlin projects, kotlinx.serialization is the recommended choice. It is maintained by JetBrains, uses compile-time code generation (no reflection), supports Kotlin Multiplatform, and natively understands Kotlin null safety and default values. Moshi is an excellent alternative for Android-only projects, especially if you already use Retrofit, as it also offers codegen and respects Kotlin nullability. Avoid Gson for new Kotlin projects because it was designed for Java and cannot enforce Kotlin null safety, potentially assigning null to non-nullable properties. For legacy codebases already using Gson, consider gradually migrating to kotlinx.serialization or Moshi.',
    faq2_q: 'How do I handle nullable and optional fields when converting JSON to Kotlin data classes?',
    faq2_a: 'Declare optional fields as nullable with a default value: val nickname: String? = null. This ensures the data class can be instantiated even when the field is missing from the JSON. With kotlinx.serialization, properties with default values are automatically treated as optional. With Moshi, nullable properties are handled correctly by the Kotlin codegen adapter. With Gson, always declare potentially absent fields as nullable because Gson will silently set them to null even if declared as non-nullable in Kotlin.',
    faq3_q: 'What is the difference between a Kotlin data class and a regular class for JSON deserialization?',
    faq3_a: 'A Kotlin data class automatically generates equals(), hashCode(), toString(), copy(), and componentN() (destructuring) functions based on the primary constructor parameters. This makes data classes ideal for JSON models because you get value-based equality, readable debug output, and easy immutable copying for free. A regular class does not generate these functions, requiring manual implementation. Use data class for all JSON models unless you need custom equality logic, mutable state, or class inheritance hierarchies.',
    faq4_q: 'Can I convert JSON to Kotlin data class online without installing any tools?',
    faq4_a: 'Yes. Our free online <strong>JSON to Kotlin converter</strong> at DevToolBox lets you paste any JSON and instantly generate Kotlin data classes with proper type inference, null safety annotations, and serialization annotations. No IDE plugin or command-line tool needed. Just paste your JSON, select your preferred serialization library (kotlinx.serialization, Moshi, or Gson), and copy the generated Kotlin code directly into your project.',
    faq5_q: 'How do I convert a nested JSON array to Kotlin data classes?',
    faq5_a: 'For nested JSON arrays like <code>{"users": [{"name": "Alice"}, {"name": "Bob"}]}</code>, create a data class for the array element (<code>data class User(val name: String)</code>) and declare the field as <code>val users: List&lt;User&gt;</code> in the parent class. With kotlinx.serialization, this works automatically. With Moshi, use <code>Types.newParameterizedType(List::class.java, User::class.java)</code>. Our JSON to Kotlin tool handles nested arrays automatically.',
    conclusion: 'Converting <strong>JSON to Kotlin data classes</strong> is a foundational skill for every Kotlin developer working with APIs. From kotlinx.serialization for Kotlin Multiplatform to Moshi for Android Retrofit integration, choosing the right library and following idiomatic patterns ensures type-safe, null-safe, and maintainable code. Use our free online <strong>JSON to Kotlin</strong> converter for instant data class generation, and refer to this guide for best practices on <strong>Kotlin JSON parsing</strong>, sealed class polymorphism, and serialization library selection.',
    linkToolBottom: 'Convert JSON to Kotlin data classes instantly with our free online tool.',
  },
  zh: {
    intro: '将 <strong>JSON 转换为 Kotlin</strong> 数据类是现代 Android 和服务端 Kotlin 开发的必备技能。当应用使用 REST API 时，你需要定义良好的 Kotlin 数据类来以类型安全的方式反序列化 JSON 响应。无论是构建 Android 应用、Ktor 后端还是 Kotlin Multiplatform 项目，可靠的 JSON 转 Kotlin 数据类转换器可以消除繁琐的样板代码。本指南全面介绍类型映射、kotlinx.serialization、Moshi、Gson、嵌套结构、空安全和最佳实践。',
    linkTool: '立即试用我们的免费在线 JSON 转 Kotlin 数据类转换工具。',
    h2_what: '什么是 JSON 转 Kotlin 数据类转换？',
    whatDesc1: 'JSON 是 REST API、配置文件和云服务的通用数据交换格式。Kotlin 作为现代静态类型语言，需要在程序使用数据前进行显式类型声明。JSON 转 Kotlin 数据类转换通过分析 JSON 文档并生成具有正确类型属性、默认值和空安全注解的 Kotlin 数据类来弥合这一差距。',
    whatDesc2: '在典型的 Android 应用中，Retrofit 或 Ktor 客户端从服务器接收 JSON 响应。在 ViewModel 或 Repository 处理数据前，网络层必须使用 kotlinx.serialization、Moshi 或 Gson 等库将 JSON 转换为 Kotlin 对象。没有正确定义的数据类，反序列化会在运行时失败。',
    whatDesc3: '同样的转换模式适用于 Ktor 或 Spring Boot 的服务端 Kotlin、Kotlin Multiplatform 共享模块和 Compose Desktop 应用。底层过程是相同的：检查 JSON 结构，确定每个字段的 Kotlin 类型，处理可空性和嵌套，生成干净的带注解的 Kotlin 源代码。',
    h2_typeMapping: 'JSON 到 Kotlin：类型映射',
    typeMappingDesc: '理解 JSON 类型如何映射到 Kotlin 类型是任何 JSON 转 Kotlin 转换的基础：',
    typeMappingTable: '<table><thead><tr><th>JSON 类型</th><th>示例</th><th>Kotlin 类型</th><th>说明</th></tr></thead><tbody><tr><td>string</td><td><code>"hello"</code></td><td><code>String</code></td><td>默认不可空；可空时使用 <code>String?</code></td></tr><tr><td>number（整数）</td><td><code>42</code></td><td><code>Int</code>、<code>Long</code></td><td>超过 2^31-1 时使用 <code>Long</code></td></tr><tr><td>number（小数）</td><td><code>3.14</code></td><td><code>Double</code>、<code>BigDecimal</code></td><td>金融数据使用 <code>BigDecimal</code></td></tr><tr><td>boolean</td><td><code>true</code></td><td><code>Boolean</code></td><td>不可空；仅在 JSON 中明确可空时使用 <code>Boolean?</code></td></tr><tr><td>null</td><td><code>null</code></td><td><code>T?</code>（可空类型）</td><td>Kotlin 类型系统区分可空与不可空</td></tr><tr><td>array</td><td><code>[1, 2, 3]</code></td><td><code>List&lt;T&gt;</code></td><td>优先使用不可变 <code>List</code></td></tr><tr><td>object</td><td><code>{"k": "v"}</code></td><td>嵌套 <code>data class</code></td><td>优先使用强类型嵌套数据类</td></tr></tbody></table>',
    typeMappingExtra: '从 JSON 生成 Kotlin 数据类时，Kotlin 的空安全系统是相比 Java 的巨大优势。每个属性必须显式声明为可空（<code>String?</code>）或不可空（<code>String</code>）。对于可能缺失或为 null 的 JSON 字段，将其声明为可空并设置默认值 <code>null</code>。数组优先使用 <code>List&lt;T&gt;</code>。货币值使用 <code>BigDecimal</code>。',
    h2_howWorks: 'JSON 转 Kotlin 转换的工作原理',
    howWorksDesc: 'JSON 转 Kotlin 数据类转换器遵循系统化流程将原始 JSON 转换为可编译的 Kotlin 源代码：',
    howWorksSteps: '<ol><li><strong>解析 JSON 结构</strong>：对输入 JSON 进行词法分析，构建对象、数组和基本类型的树。</li><li><strong>推断属性类型</strong>：对每个键值对确定 Kotlin 类型。</li><li><strong>确定可空性</strong>：如果字段值为 <code>null</code> 或在部分数组元素中缺失，标记为可空（<code>T?</code>）。</li><li><strong>生成类名</strong>：将 JSON 键名转换为 PascalCase 类名和 camelCase 属性名。</li><li><strong>处理嵌套对象</strong>：每个嵌套 JSON 对象生成一个单独的 Kotlin 数据类。</li><li><strong>处理数组</strong>：分析数组元素确定元素类型。</li><li><strong>添加序列化注解</strong>：添加 <code>@SerialName</code>、<code>@Json(name = ...)</code> 或 <code>@SerializedName</code>。</li><li><strong>输出源代码</strong>：生成格式化的 Kotlin 源代码。</li></ol>',
    h2_codeExamples: '代码示例：使用流行库实现 JSON 转 Kotlin',
    codeKotlinxTitle: 'kotlinx.serialization：@Serializable 和 Json.decodeFromString',
    codeKotlinxDesc: 'kotlinx.serialization 是 JetBrains 维护的官方 Kotlin 序列化库，推荐用于 Kotlin Multiplatform 项目和现代 Android 开发。它使用编译时代码生成而非反射，性能出色且 APK 体积更小：',
    codeMoshiTitle: 'Moshi：@JsonClass 和自定义适配器',
    codeMoshiDesc: 'Moshi 是 Square（Retrofit 的创造者）为 Android 和 Java 设计的现代 JSON 库。使用 moshi-kotlin-codegen 可在编译时生成适配器，与 Retrofit 无缝集成：',
    codeGsonTitle: 'Gson 与 Kotlin：fromJson 和空安全问题',
    codeGsonDesc: 'Google 的 Gson 可与 Kotlin 配合使用，但它是为 Java 设计的，不理解 Kotlin 的空安全系统，可能将 null 赋值给不可空属性。尽管有此限制，Gson 在遗留项目中仍被广泛使用：',
    codeManualTitle: '手动数据类：默认值、copy() 和解构',
    codeManualDesc: '当需要完全控制 Kotlin 数据类时，手动编写数据类可以利用 Kotlin 的强大特性，如默认参数值、copy() 函数、解构声明和伴生对象工厂方法：',
    h2_nested: '处理嵌套 JSON',
    nestedDesc1: '实际 API 很少返回扁平 JSON。大多数响应包含深度嵌套对象、对象数组和多态类型。将这些复杂结构转换为 Kotlin 数据类需要仔细规划：',
    nestedDesc2: '<strong>嵌套数据类</strong>：每层嵌套生成一个单独的 Kotlin 数据类。可以定义为嵌套类或顶层声明，通常优先使用顶层声明以提高可复用性。',
    nestedDesc3: '<strong>密封类实现多态</strong>：当 JSON 字段根据判别符持有不同对象形状时，Kotlin 的密封类提供编译时穷尽处理。结合 kotlinx.serialization 的 <code>@Polymorphic</code> 或 Moshi 的 <code>PolymorphicJsonAdapterFactory</code>，确保 <code>when</code> 表达式处理所有变体。',
    nestedDesc4: '<strong>对象数组</strong>：<code>"items": [{"id": 1}]</code> 在 Kotlin 中映射为 <code>List&lt;Item&gt;</code>。在数据类中始终优先使用 <code>List</code> 而非 <code>Array</code>，因为 <code>List</code> 在 <code>equals()</code>/<code>hashCode()</code> 中行为正确。',
    h2_kotlinFeatures: 'Kotlin 特有的 JSON 数据类特性',
    kotlinFeaturesDesc1: '<strong>data class vs 普通 class</strong>：Kotlin data class 自动生成 equals()、hashCode()、toString()、copy() 和 componentN() 函数。JSON 模型始终使用 data class，除非需要自定义相等逻辑或继承。',
    kotlinFeaturesDesc2: '<strong>空安全 <code>?</code></strong>：Kotlin 类型系统区分 <code>String</code>（不可空）和 <code>String?</code>（可空）。JSON 转 Kotlin 时，仅在 JSON 字段确实可能缺失或为 null 时标记为可空，获得编译时空指针保护。',
    kotlinFeaturesDesc3: '<strong>默认值</strong>：Kotlin 数据类属性可以有默认值，当 JSON 字段缺失时作为后备。例如 <code>val status: String = "pending"</code>。',
    kotlinFeaturesDesc4: '<strong>伴生对象 fromJson</strong>：在伴生对象中定义 fromJson() 工厂方法，将反序列化逻辑封装在数据类内部。',
    kotlinFeaturesDesc5: '<strong>扩展函数</strong>：使用扩展函数为现有类型添加反序列化辅助方法，如 <code>fun String.toUser(): User</code>，这是地道的 Kotlin 风格。',
    h2_bestPractices: 'JSON 转 Kotlin 转换最佳实践',
    bestPracticesDesc: '将 JSON 转换为 Kotlin 数据类时，遵循以下最佳实践构建健壮、可维护的应用：',
    bp1: '<strong>新项目优先使用 kotlinx.serialization</strong>：JetBrains 官方库，支持 Kotlin Multiplatform，编译时代码生成，原生理解 Kotlin 空安全和默认值。',
    bp2: '<strong>对 snake_case 的 JSON 键使用 @SerialName</strong>：大多数 REST API 使用 snake_case，Kotlin 惯例使用 camelCase。使用注解桥接命名差异。',
    bp3: '<strong>可选字段声明为可空并带默认值</strong>：如 <code>val field: Type? = null</code>，防止服务器省略字段时崩溃。启用 <code>ignoreUnknownKeys = true</code> 优雅处理 API 演进。',
    bp4: '<strong>对多态 JSON 使用密封类</strong>：在 <code>when</code> 表达式中获得编译时穷尽性检查，消除不安全的类型转换。',
    bp5: '<strong>新 Kotlin 项目避免使用 Gson</strong>：Gson 为 Java 设计，不尊重 Kotlin 空安全。可静默将 null 赋给不可空属性。',
    bp6: '<strong>保持数据类不可变</strong>：使用 <code>val</code> 而非 <code>var</code>。不可变数据类线程安全，与 copy() 函数配合正确。',
    bp7: '<strong>在边界处验证</strong>：在伴生对象工厂方法或 init 块中添加验证逻辑，如 <code>init { require(age >= 0) }</code>。',
    relatedTools: '相关工具推荐：<strong>JSON 转 Java</strong> 用于传统 Java POJO，<strong>JSON 转 TypeScript</strong> 用于前端接口，<strong>JSON 转 Dart</strong> 用于 Flutter 开发。',
    h2_faq: '常见问题',
    faq1_q: 'kotlinx.serialization、Moshi 和 Gson 哪个更适合 Kotlin JSON 解析？',
    faq1_a: '新 Kotlin 项目推荐 kotlinx.serialization，它是 JetBrains 官方库，编译时代码生成，支持 Kotlin Multiplatform，原生理解空安全和默认值。Moshi 是 Android 项目的优秀替代，尤其是已使用 Retrofit 的项目。新 Kotlin 项目应避免 Gson，因为它为 Java 设计，无法强制 Kotlin 空安全。',
    faq2_q: 'JSON 转 Kotlin 数据类时如何处理可空和可选字段？',
    faq2_a: '将可选字段声明为可空并带默认值：val nickname: String? = null。这确保即使 JSON 中缺少字段也能实例化数据类。kotlinx.serialization 中带默认值的属性自动视为可选。Moshi 的 Kotlin codegen 适配器正确处理可空属性。Gson 中始终将可能缺失的字段声明为可空。',
    faq3_q: 'JSON 反序列化中 Kotlin data class 和普通 class 有什么区别？',
    faq3_a: 'Kotlin data class 基于主构造函数参数自动生成 equals()、hashCode()、toString()、copy() 和 componentN()（解构）函数。这使得 data class 非常适合 JSON 模型，因为你免费获得基于值的相等性、可读的调试输出和简便的不可变复制。普通 class 不生成这些函数，需要手动实现。',
    conclusion: '将 JSON 转换为 Kotlin 数据类是每个使用 API 的 Kotlin 开发者的基础技能。从 Kotlin Multiplatform 的 kotlinx.serialization 到 Android Retrofit 集成的 Moshi，选择正确的库并遵循地道模式确保类型安全、空安全和可维护的代码。',
    linkToolBottom: '使用我们的免费在线工具即时将 JSON 转换为 Kotlin 数据类。',
  },
  fr: {
    intro: 'La conversion de <strong>JSON en data classes Kotlin</strong> est une competence essentielle pour le developpement Android et Kotlin cote serveur. Lorsque votre application consomme une API REST, vous avez besoin de data classes Kotlin bien definies pour deserialiser les reponses JSON de maniere type-safe. Ce guide complet couvre le mapping des types, kotlinx.serialization, Moshi, Gson, les structures imbriquees et les bonnes pratiques.',
    linkTool: 'Essayez notre convertisseur gratuit JSON vers data class Kotlin en ligne.',
    h2_what: 'Qu\'est-ce que la conversion JSON vers data class Kotlin ?',
    whatDesc1: 'JSON est le format d\'echange de donnees universel pour les API REST. Kotlin, en tant que langage moderne a typage statique, necessite des declarations de types explicites. La conversion JSON vers data class Kotlin analyse un document JSON et produit des data classes Kotlin idiomatiques avec des proprietes correctement typees, des valeurs par defaut et la securite null.',
    whatDesc2: 'Dans une application Android typique, Retrofit ou le client HTTP Ktor recoit une reponse JSON. La couche reseau doit convertir ce JSON en objets Kotlin a l\'aide de bibliotheques comme kotlinx.serialization, Moshi ou Gson. Un convertisseur JSON vers data class Kotlin automatise la creation de ces classes.',
    whatDesc3: 'Le meme processus s\'applique au Kotlin cote serveur avec Ktor ou Spring Boot, aux modules partages Kotlin Multiplatform et aux applications Compose Desktop. Le processus est identique : inspecter la structure JSON, determiner les types, gerer la nullabilite et l\'imbrication.',
    h2_typeMapping: 'JSON vers Kotlin : Mapping des types',
    typeMappingDesc: 'Comprendre comment les types JSON correspondent aux types Kotlin est la base de toute conversion :',
    typeMappingTable: '<table><thead><tr><th>Type JSON</th><th>Exemple</th><th>Type(s) Kotlin</th><th>Notes</th></tr></thead><tbody><tr><td>string</td><td><code>"hello"</code></td><td><code>String</code></td><td>Non-nullable par defaut ; <code>String?</code> si nullable</td></tr><tr><td>number (entier)</td><td><code>42</code></td><td><code>Int</code>, <code>Long</code></td><td><code>Long</code> pour les grandes valeurs</td></tr><tr><td>number (decimal)</td><td><code>3.14</code></td><td><code>Double</code>, <code>BigDecimal</code></td><td><code>BigDecimal</code> pour les donnees financieres</td></tr><tr><td>boolean</td><td><code>true</code></td><td><code>Boolean</code></td><td>Non-nullable par defaut</td></tr><tr><td>null</td><td><code>null</code></td><td><code>T?</code></td><td>Kotlin distingue nullable et non-nullable</td></tr><tr><td>array</td><td><code>[1,2]</code></td><td><code>List&lt;T&gt;</code></td><td><code>List</code> immutable preferee</td></tr><tr><td>object</td><td><code>{"k":"v"}</code></td><td><code>data class</code></td><td>Data classes typees preferees</td></tr></tbody></table>',
    typeMappingExtra: 'Lors de la generation de data classes Kotlin a partir de JSON, le systeme de securite null de Kotlin est un avantage majeur par rapport a Java. Chaque propriete doit etre declaree nullable ou non-nullable. Pour les valeurs monetaires, utilisez <code>BigDecimal</code>.',
    h2_howWorks: 'Comment fonctionne la conversion JSON vers Kotlin',
    howWorksDesc: 'Un convertisseur JSON vers data class Kotlin suit un processus systematique :',
    howWorksSteps: '<ol><li><strong>Analyser la structure JSON</strong> : Construction d\'un arbre de tokens.</li><li><strong>Inferer les types de proprietes</strong> : Determination du type Kotlin pour chaque paire cle-valeur.</li><li><strong>Determiner la nullabilite</strong> : Marquage des champs potentiellement absents comme <code>T?</code>.</li><li><strong>Generer les noms de classes</strong> : Conversion en PascalCase et camelCase.</li><li><strong>Gerer les objets imbriques</strong> : Chaque objet genere une data class separee.</li><li><strong>Gerer les tableaux</strong> : Analyse des elements pour le type.</li><li><strong>Ajouter les annotations</strong> : <code>@SerialName</code>, <code>@Json</code> ou <code>@SerializedName</code>.</li><li><strong>Produire le code source</strong> : Code Kotlin formate.</li></ol>',
    h2_codeExamples: 'Exemples de code : JSON vers Kotlin avec les bibliotheques populaires',
    codeKotlinxTitle: 'kotlinx.serialization : @Serializable et Json.decodeFromString',
    codeKotlinxDesc: 'kotlinx.serialization est la bibliotheque officielle de JetBrains, recommandee pour Kotlin Multiplatform et le developpement Android moderne :',
    codeMoshiTitle: 'Moshi : @JsonClass et adaptateurs personnalises',
    codeMoshiDesc: 'Moshi est une bibliotheque JSON moderne de Square qui s\'integre parfaitement avec Retrofit :',
    codeGsonTitle: 'Gson avec Kotlin : fromJson et securite null',
    codeGsonDesc: 'Gson fonctionne avec Kotlin mais ne comprend pas la securite null de Kotlin, ce qui peut causer des problemes :',
    codeManualTitle: 'Data class manuelle : valeurs par defaut, copy() et destructuration',
    codeManualDesc: 'Pour un controle total, les data classes manuelles exploitent les fonctionnalites puissantes de Kotlin :',
    h2_nested: 'Travailler avec du JSON imbrique',
    nestedDesc1: 'Les API reelles contiennent des objets profondement imbriques et des types polymorphes :',
    nestedDesc2: '<strong>Data classes imbriquees</strong> : Chaque niveau d\'imbrication produit une data class separee. Les declarations top-level sont generalement preferees pour la reutilisabilite.',
    nestedDesc3: '<strong>Classes scellees pour le polymorphisme</strong> : Les sealed classes de Kotlin fournissent une gestion exhaustive a la compilation avec les expressions <code>when</code>.',
    nestedDesc4: '<strong>Tableaux d\'objets</strong> : Preferez <code>List</code> a <code>Array</code> dans les data classes pour un comportement correct de <code>equals()</code>/<code>hashCode()</code>.',
    h2_kotlinFeatures: 'Fonctionnalites specifiques a Kotlin pour les data classes JSON',
    kotlinFeaturesDesc1: '<strong>data class vs classe reguliere</strong> : Les data classes generent automatiquement equals(), hashCode(), toString(), copy() et componentN(). Utilisez toujours des data classes pour les modeles JSON.',
    kotlinFeaturesDesc2: '<strong>Securite null avec <code>?</code></strong> : Le systeme de types de Kotlin distingue les types nullables et non-nullables, offrant une protection a la compilation.',
    kotlinFeaturesDesc3: '<strong>Valeurs par defaut</strong> : Les proprietes peuvent avoir des valeurs par defaut comme fallback quand un champ JSON est absent.',
    kotlinFeaturesDesc4: '<strong>Companion object fromJson</strong> : Encapsulez la logique de deserialisation dans un companion object pour un appel propre.',
    kotlinFeaturesDesc5: '<strong>Fonctions d\'extension</strong> : Ajoutez des methodes de deserialisation aux types existants de maniere idiomatique.',
    h2_bestPractices: 'Bonnes pratiques pour la conversion JSON vers Kotlin',
    bestPracticesDesc: 'Suivez ces bonnes pratiques pour des applications robustes :',
    bp1: '<strong>Preferez kotlinx.serialization pour les nouveaux projets</strong> : Bibliotheque officielle JetBrains, supporte Kotlin Multiplatform, generation a la compilation.',
    bp2: '<strong>Utilisez @SerialName pour les cles snake_case</strong> : Annotez les proprietes pour relier les conventions de nommage.',
    bp3: '<strong>Declarez les champs optionnels comme nullables avec des valeurs par defaut</strong> : Activez <code>ignoreUnknownKeys = true</code>.',
    bp4: '<strong>Utilisez les sealed classes pour le JSON polymorphe</strong> : Exhaustivite a la compilation dans les expressions <code>when</code>.',
    bp5: '<strong>Evitez Gson pour les nouveaux projets Kotlin</strong> : Gson ne respecte pas la securite null de Kotlin.',
    bp6: '<strong>Gardez les data classes immutables</strong> : Utilisez <code>val</code> au lieu de <code>var</code>.',
    bp7: '<strong>Validez a la frontiere</strong> : Ajoutez la validation dans un companion object ou un bloc <code>init</code>.',
    relatedTools: 'Outils connexes : <strong>JSON vers Java</strong>, <strong>JSON vers TypeScript</strong>, <strong>JSON vers Dart</strong>.',
    h2_faq: 'Questions frequemment posees',
    faq1_q: 'kotlinx.serialization, Moshi ou Gson : quelle bibliotheque utiliser ?',
    faq1_a: 'kotlinx.serialization est recommande pour les nouveaux projets. Moshi est excellent pour Android avec Retrofit. Evitez Gson pour les nouveaux projets Kotlin car il ne respecte pas la securite null.',
    faq2_q: 'Comment gerer les champs nullables et optionnels ?',
    faq2_a: 'Declarez les champs optionnels comme val nickname: String? = null. Les proprietes avec valeurs par defaut sont automatiquement optionnelles avec kotlinx.serialization.',
    faq3_q: 'Quelle est la difference entre data class et classe reguliere ?',
    faq3_a: 'Les data classes generent automatiquement equals(), hashCode(), toString(), copy() et componentN(). Utilisez data class pour tous les modeles JSON.',
    conclusion: 'La conversion JSON vers data class Kotlin est une competence fondamentale. Utilisez notre outil gratuit et consultez ce guide pour les bonnes pratiques.',
    linkToolBottom: 'Convertissez JSON en data classes Kotlin instantanement avec notre outil gratuit.',
  },
  de: {
    intro: 'Die Konvertierung von <strong>JSON in Kotlin</strong> Data Classes ist eine wesentliche Fahigkeit fur moderne Android- und serverseitige Kotlin-Entwicklung. Wenn Ihre App eine REST-API nutzt, benotigen Sie gut definierte Kotlin Data Classes fur die typsichere Deserialisierung von JSON-Antworten. Dieser Leitfaden behandelt Typ-Mapping, kotlinx.serialization, Moshi, Gson, verschachtelte Strukturen und Best Practices.',
    linkTool: 'Testen Sie unseren kostenlosen Online JSON-zu-Kotlin-Data-Class-Konverter.',
    h2_what: 'Was ist JSON-zu-Kotlin-Data-Class-Konvertierung?',
    whatDesc1: 'JSON ist das universelle Datenaustauschformat fur REST-APIs. Kotlin als moderne statisch typisierte Sprache erfordert explizite Typdeklarationen. Die JSON-zu-Kotlin-Konvertierung analysiert ein JSON-Dokument und erzeugt idiomatische Kotlin Data Classes mit korrekt typisierten Properties, Standardwerten und Null-Sicherheitsannotationen.',
    whatDesc2: 'In einer typischen Android-Anwendung empfangt Retrofit oder der Ktor-HTTP-Client eine JSON-Antwort. Die Netzwerkschicht muss dieses JSON mit Bibliotheken wie kotlinx.serialization, Moshi oder Gson in Kotlin-Objekte konvertieren. Ein JSON-zu-Kotlin-Konverter automatisiert die Erstellung dieser Datenklassen.',
    whatDesc3: 'Das gleiche Konvertierungsmuster gilt fur serverseitiges Kotlin mit Ktor oder Spring Boot, Kotlin Multiplatform Module und Compose Desktop. Der Prozess ist identisch: JSON-Struktur inspizieren, Typen bestimmen, Nullbarkeit und Verschachtelung behandeln.',
    h2_typeMapping: 'JSON zu Kotlin: Typ-Mapping',
    typeMappingDesc: 'Das Verstandnis der Zuordnung von JSON-Typen zu Kotlin-Typen ist die Grundlage jeder Konvertierung:',
    typeMappingTable: '<table><thead><tr><th>JSON-Typ</th><th>Beispiel</th><th>Kotlin-Typ(en)</th><th>Hinweise</th></tr></thead><tbody><tr><td>string</td><td><code>"hello"</code></td><td><code>String</code></td><td>Nicht-nullable standard; <code>String?</code> wenn nullable</td></tr><tr><td>number (ganzzahlig)</td><td><code>42</code></td><td><code>Int</code>, <code>Long</code></td><td><code>Long</code> fur grosse Werte</td></tr><tr><td>number (dezimal)</td><td><code>3.14</code></td><td><code>Double</code>, <code>BigDecimal</code></td><td><code>BigDecimal</code> fur Finanzdaten</td></tr><tr><td>boolean</td><td><code>true</code></td><td><code>Boolean</code></td><td>Nicht-nullable standard</td></tr><tr><td>null</td><td><code>null</code></td><td><code>T?</code></td><td>Kotlin unterscheidet nullable und nicht-nullable</td></tr><tr><td>array</td><td><code>[1,2]</code></td><td><code>List&lt;T&gt;</code></td><td>Unveranderliche <code>List</code> bevorzugt</td></tr><tr><td>object</td><td><code>{"k":"v"}</code></td><td><code>data class</code></td><td>Stark typisierte Data Classes bevorzugt</td></tr></tbody></table>',
    typeMappingExtra: 'Bei der Generierung von Kotlin Data Classes aus JSON ist Kotlins Null-Sicherheitssystem ein grosser Vorteil gegenuber Java. Jede Property muss explizit als nullable oder nicht-nullable deklariert werden. Fur Geldwerte verwenden Sie <code>BigDecimal</code>.',
    h2_howWorks: 'Wie die JSON-zu-Kotlin-Konvertierung funktioniert',
    howWorksDesc: 'Ein JSON-zu-Kotlin-Data-Class-Konverter folgt einem systematischen Prozess:',
    howWorksSteps: '<ol><li><strong>JSON-Struktur parsen</strong>: Aufbau eines Token-Baums.</li><li><strong>Property-Typen ableiten</strong>: Kotlin-Typ fur jedes Schlussel-Wert-Paar bestimmen.</li><li><strong>Nullbarkeit bestimmen</strong>: Felder als <code>T?</code> markieren wenn potenziell absent.</li><li><strong>Klassennamen generieren</strong>: Konvertierung in PascalCase und camelCase.</li><li><strong>Verschachtelte Objekte behandeln</strong>: Jedes Objekt erzeugt eine separate Data Class.</li><li><strong>Arrays behandeln</strong>: Elementtyp-Analyse.</li><li><strong>Annotationen hinzufugen</strong>: <code>@SerialName</code>, <code>@Json</code> oder <code>@SerializedName</code>.</li><li><strong>Quellcode ausgeben</strong>: Formatierter Kotlin-Code.</li></ol>',
    h2_codeExamples: 'Codebeispiele: JSON zu Kotlin mit popularen Bibliotheken',
    codeKotlinxTitle: 'kotlinx.serialization: @Serializable und Json.decodeFromString',
    codeKotlinxDesc: 'kotlinx.serialization ist die offizielle JetBrains-Bibliothek, empfohlen fur Kotlin Multiplatform und moderne Android-Entwicklung:',
    codeMoshiTitle: 'Moshi: @JsonClass und benutzerdefinierte Adapter',
    codeMoshiDesc: 'Moshi ist eine moderne JSON-Bibliothek von Square, die sich nahtlos mit Retrofit integriert:',
    codeGsonTitle: 'Gson mit Kotlin: fromJson und Null-Sicherheit',
    codeGsonDesc: 'Gson funktioniert mit Kotlin, versteht aber nicht Kotlins Null-Sicherheit und kann null nicht-nullbaren Properties zuweisen:',
    codeManualTitle: 'Manuelle Data Class: Standardwerte, copy() und Destrukturierung',
    codeManualDesc: 'Fur volle Kontrolle nutzen manuelle Data Classes Kotlins leistungsfahige Funktionen:',
    h2_nested: 'Arbeiten mit verschachteltem JSON',
    nestedDesc1: 'Reale APIs enthalten tief verschachtelte Objekte und polymorphe Typen:',
    nestedDesc2: '<strong>Verschachtelte Data Classes</strong>: Jede Verschachtelungsebene erzeugt eine separate Data Class. Top-Level-Deklarationen sind fur Wiederverwendbarkeit bevorzugt.',
    nestedDesc3: '<strong>Sealed Classes fur Polymorphismus</strong>: Kotlins Sealed Classes bieten Kompilierzeit-Vollstandigkeit in <code>when</code>-Ausdrucken.',
    nestedDesc4: '<strong>Objekt-Arrays</strong>: Bevorzugen Sie <code>List</code> uber <code>Array</code> in Data Classes fur korrektes <code>equals()</code>/<code>hashCode()</code>-Verhalten.',
    h2_kotlinFeatures: 'Kotlin-spezifische Funktionen fur JSON Data Classes',
    kotlinFeaturesDesc1: '<strong>data class vs regulare Klasse</strong>: Data Classes generieren automatisch equals(), hashCode(), toString(), copy() und componentN(). Verwenden Sie immer Data Classes fur JSON-Modelle.',
    kotlinFeaturesDesc2: '<strong>Null-Sicherheit mit <code>?</code></strong>: Kotlins Typsystem unterscheidet nullable und nicht-nullable Typen und bietet Kompilierzeit-Schutz.',
    kotlinFeaturesDesc3: '<strong>Standardwerte</strong>: Properties konnen Standardwerte als Fallback haben, wenn ein JSON-Feld fehlt.',
    kotlinFeaturesDesc4: '<strong>Companion Object fromJson</strong>: Kapseln Sie die Deserialisierungslogik in einem Companion Object.',
    kotlinFeaturesDesc5: '<strong>Extension Functions</strong>: Fugen Sie Deserialisierungshilfen zu bestehenden Typen idiomatisch hinzu.',
    h2_bestPractices: 'Best Practices fur JSON-zu-Kotlin-Konvertierung',
    bestPracticesDesc: 'Befolgen Sie diese Best Practices fur robuste Anwendungen:',
    bp1: '<strong>kotlinx.serialization fur neue Projekte</strong>: Offizielle JetBrains-Bibliothek, Kotlin Multiplatform-Unterstutzung, Kompilierzeit-Codegenerierung.',
    bp2: '<strong>@SerialName fur snake_case-Keys</strong>: Annotieren Sie Properties zur Uberbruckung von Namenskonventionen.',
    bp3: '<strong>Optionale Felder nullable mit Standardwerten</strong>: <code>ignoreUnknownKeys = true</code> aktivieren.',
    bp4: '<strong>Sealed Classes fur polymorphes JSON</strong>: Kompilierzeit-Vollstandigkeit in <code>when</code>-Ausdrucken.',
    bp5: '<strong>Gson fur neue Kotlin-Projekte vermeiden</strong>: Gson respektiert Kotlins Null-Sicherheit nicht.',
    bp6: '<strong>Data Classes unveranderlich halten</strong>: <code>val</code> statt <code>var</code> verwenden.',
    bp7: '<strong>An der Grenze validieren</strong>: Validierung in Companion Object oder <code>init</code>-Block.',
    relatedTools: 'Verwandte Tools: <strong>JSON zu Java</strong>, <strong>JSON zu TypeScript</strong>, <strong>JSON zu Dart</strong>.',
    h2_faq: 'Haufig gestellte Fragen',
    faq1_q: 'kotlinx.serialization, Moshi oder Gson: Welche Bibliothek verwenden?',
    faq1_a: 'kotlinx.serialization wird fur neue Projekte empfohlen. Moshi ist hervorragend fur Android mit Retrofit. Vermeiden Sie Gson fur neue Kotlin-Projekte, da es Kotlins Null-Sicherheit nicht respektiert.',
    faq2_q: 'Wie behandle ich nullable und optionale Felder?',
    faq2_a: 'Deklarieren Sie optionale Felder als val nickname: String? = null. Properties mit Standardwerten sind automatisch optional bei kotlinx.serialization.',
    faq3_q: 'Was ist der Unterschied zwischen data class und regularer Klasse?',
    faq3_a: 'Data Classes generieren automatisch equals(), hashCode(), toString(), copy() und componentN(). Verwenden Sie data class fur alle JSON-Modelle.',
    conclusion: 'Die Konvertierung von JSON zu Kotlin Data Classes ist eine grundlegende Fahigkeit. Nutzen Sie unser kostenloses Tool und diesen Leitfaden fur Best Practices.',
    linkToolBottom: 'Konvertieren Sie JSON sofort in Kotlin Data Classes mit unserem kostenlosen Tool.',
  },
  es: {
    intro: 'Convertir <strong>JSON a data classes Kotlin</strong> es una habilidad esencial para el desarrollo Android moderno y Kotlin del lado del servidor. Cuando tu app consume una API REST, necesitas data classes Kotlin bien definidas para deserializar respuestas JSON de forma type-safe. Esta guia completa cubre mapeo de tipos, kotlinx.serialization, Moshi, Gson, estructuras anidadas y mejores practicas.',
    linkTool: 'Prueba nuestro convertidor gratuito de JSON a data class Kotlin en linea.',
    h2_what: 'Que es la conversion de JSON a data class Kotlin?',
    whatDesc1: 'JSON es el formato universal de intercambio de datos para APIs REST. Kotlin, como lenguaje moderno de tipado estatico, requiere declaraciones de tipos explicitas. La conversion de JSON a data class Kotlin analiza un documento JSON y produce data classes Kotlin idiomaticas con propiedades tipadas, valores por defecto y seguridad null.',
    whatDesc2: 'En una aplicacion Android tipica, Retrofit o el cliente HTTP de Ktor recibe una respuesta JSON. La capa de red debe convertir ese JSON en objetos Kotlin usando kotlinx.serialization, Moshi o Gson. Un convertidor JSON a data class Kotlin automatiza la creacion de estas clases.',
    whatDesc3: 'El mismo patron se aplica al Kotlin del lado del servidor con Ktor o Spring Boot, modulos compartidos de Kotlin Multiplatform y aplicaciones Compose Desktop. El proceso es identico: inspeccionar la estructura JSON, determinar tipos, manejar la nulabilidad y el anidamiento.',
    h2_typeMapping: 'JSON a Kotlin: Mapeo de tipos',
    typeMappingDesc: 'Entender como los tipos JSON se mapean a tipos Kotlin es la base de cualquier conversion:',
    typeMappingTable: '<table><thead><tr><th>Tipo JSON</th><th>Ejemplo</th><th>Tipo(s) Kotlin</th><th>Notas</th></tr></thead><tbody><tr><td>string</td><td><code>"hello"</code></td><td><code>String</code></td><td>No nulo por defecto; <code>String?</code> si nullable</td></tr><tr><td>number (entero)</td><td><code>42</code></td><td><code>Int</code>, <code>Long</code></td><td><code>Long</code> para valores grandes</td></tr><tr><td>number (decimal)</td><td><code>3.14</code></td><td><code>Double</code>, <code>BigDecimal</code></td><td><code>BigDecimal</code> para datos financieros</td></tr><tr><td>boolean</td><td><code>true</code></td><td><code>Boolean</code></td><td>No nulo por defecto</td></tr><tr><td>null</td><td><code>null</code></td><td><code>T?</code></td><td>Kotlin distingue nullable y no-nullable</td></tr><tr><td>array</td><td><code>[1,2]</code></td><td><code>List&lt;T&gt;</code></td><td><code>List</code> inmutable preferida</td></tr><tr><td>object</td><td><code>{"k":"v"}</code></td><td><code>data class</code></td><td>Data classes tipadas preferidas</td></tr></tbody></table>',
    typeMappingExtra: 'Al generar data classes Kotlin desde JSON, el sistema de seguridad null de Kotlin es una ventaja sobre Java. Cada propiedad debe declararse explicitamente como nullable o no-nullable. Para valores monetarios, usa <code>BigDecimal</code>.',
    h2_howWorks: 'Como funciona la conversion JSON a Kotlin',
    howWorksDesc: 'Un convertidor JSON a data class Kotlin sigue un proceso sistematico:',
    howWorksSteps: '<ol><li><strong>Analizar la estructura JSON</strong>: Construccion de un arbol de tokens.</li><li><strong>Inferir tipos de propiedades</strong>: Determinar el tipo Kotlin para cada par clave-valor.</li><li><strong>Determinar nulabilidad</strong>: Marcar campos potencialmente ausentes como <code>T?</code>.</li><li><strong>Generar nombres de clase</strong>: Conversion a PascalCase y camelCase.</li><li><strong>Manejar objetos anidados</strong>: Cada objeto genera una data class separada.</li><li><strong>Manejar arrays</strong>: Analisis del tipo de elemento.</li><li><strong>Agregar anotaciones</strong>: <code>@SerialName</code>, <code>@Json</code> o <code>@SerializedName</code>.</li><li><strong>Producir codigo fuente</strong>: Codigo Kotlin formateado.</li></ol>',
    h2_codeExamples: 'Ejemplos de codigo: JSON a Kotlin con bibliotecas populares',
    codeKotlinxTitle: 'kotlinx.serialization: @Serializable y Json.decodeFromString',
    codeKotlinxDesc: 'kotlinx.serialization es la biblioteca oficial de JetBrains, recomendada para Kotlin Multiplatform y desarrollo Android moderno:',
    codeMoshiTitle: 'Moshi: @JsonClass y adaptadores personalizados',
    codeMoshiDesc: 'Moshi es una biblioteca JSON moderna de Square que se integra perfectamente con Retrofit:',
    codeGsonTitle: 'Gson con Kotlin: fromJson y seguridad null',
    codeGsonDesc: 'Gson funciona con Kotlin pero no comprende la seguridad null de Kotlin, lo que puede causar problemas:',
    codeManualTitle: 'Data class manual: valores por defecto, copy() y destructuracion',
    codeManualDesc: 'Para control total, las data classes manuales aprovechan las potentes caracteristicas de Kotlin:',
    h2_nested: 'Trabajar con JSON anidado',
    nestedDesc1: 'Las APIs reales contienen objetos profundamente anidados y tipos polimorficos:',
    nestedDesc2: '<strong>Data classes anidadas</strong>: Cada nivel de anidamiento produce una data class separada. Las declaraciones top-level son preferidas para reutilizabilidad.',
    nestedDesc3: '<strong>Sealed classes para polimorfismo</strong>: Las sealed classes de Kotlin proporcionan manejo exhaustivo en tiempo de compilacion con expresiones <code>when</code>.',
    nestedDesc4: '<strong>Arrays de objetos</strong>: Prefiere <code>List</code> sobre <code>Array</code> en data classes para comportamiento correcto de <code>equals()</code>/<code>hashCode()</code>.',
    h2_kotlinFeatures: 'Caracteristicas especificas de Kotlin para data classes JSON',
    kotlinFeaturesDesc1: '<strong>data class vs clase regular</strong>: Las data classes generan automaticamente equals(), hashCode(), toString(), copy() y componentN(). Usa siempre data classes para modelos JSON.',
    kotlinFeaturesDesc2: '<strong>Seguridad null con <code>?</code></strong>: El sistema de tipos de Kotlin distingue tipos nullable y no-nullable, ofreciendo proteccion en tiempo de compilacion.',
    kotlinFeaturesDesc3: '<strong>Valores por defecto</strong>: Las propiedades pueden tener valores por defecto como respaldo cuando un campo JSON esta ausente.',
    kotlinFeaturesDesc4: '<strong>Companion object fromJson</strong>: Encapsula la logica de deserializacion en un companion object para llamadas limpias.',
    kotlinFeaturesDesc5: '<strong>Funciones de extension</strong>: Agrega metodos de deserializacion a tipos existentes de forma idiomatica.',
    h2_bestPractices: 'Mejores practicas para conversion JSON a Kotlin',
    bestPracticesDesc: 'Sigue estas mejores practicas para aplicaciones robustas:',
    bp1: '<strong>Prefiere kotlinx.serialization para nuevos proyectos</strong>: Biblioteca oficial JetBrains, soporte Kotlin Multiplatform, generacion en tiempo de compilacion.',
    bp2: '<strong>Usa @SerialName para claves snake_case</strong>: Anota propiedades para conectar convenciones de nomenclatura.',
    bp3: '<strong>Campos opcionales nullable con valores por defecto</strong>: Activa <code>ignoreUnknownKeys = true</code>.',
    bp4: '<strong>Sealed classes para JSON polimorfico</strong>: Exhaustividad en tiempo de compilacion en expresiones <code>when</code>.',
    bp5: '<strong>Evita Gson para nuevos proyectos Kotlin</strong>: Gson no respeta la seguridad null de Kotlin.',
    bp6: '<strong>Mantener data classes inmutables</strong>: Usa <code>val</code> en lugar de <code>var</code>.',
    bp7: '<strong>Valida en la frontera</strong>: Agrega validacion en companion object o bloque <code>init</code>.',
    relatedTools: 'Herramientas relacionadas: <strong>JSON a Java</strong>, <strong>JSON a TypeScript</strong>, <strong>JSON a Dart</strong>.',
    h2_faq: 'Preguntas frecuentes',
    faq1_q: 'kotlinx.serialization, Moshi o Gson: cual biblioteca usar?',
    faq1_a: 'kotlinx.serialization es recomendado para nuevos proyectos. Moshi es excelente para Android con Retrofit. Evita Gson para nuevos proyectos Kotlin porque no respeta la seguridad null.',
    faq2_q: 'Como manejar campos nullable y opcionales?',
    faq2_a: 'Declara campos opcionales como val nickname: String? = null. Las propiedades con valores por defecto son automaticamente opcionales con kotlinx.serialization.',
    faq3_q: 'Cual es la diferencia entre data class y clase regular?',
    faq3_a: 'Las data classes generan automaticamente equals(), hashCode(), toString(), copy() y componentN(). Usa data class para todos los modelos JSON.',
    conclusion: 'Convertir JSON a data classes Kotlin es una habilidad fundamental. Usa nuestra herramienta gratuita y consulta esta guia para mejores practicas.',
    linkToolBottom: 'Convierte JSON a data classes Kotlin al instante con nuestra herramienta gratuita.',
  },
  ja: {
    intro: '<strong>JSONからKotlin</strong>データクラスへの変換は、モダンなAndroidおよびサーバーサイドKotlin開発の必須スキルです。REST APIを使用する場合、型安全な方法でJSONレスポンスをデシリアライズするための適切に定義されたKotlinデータクラスが必要です。この包括的なガイドでは、型マッピング、kotlinx.serialization、Moshi、Gson、ネスト構造、ベストプラクティスをカバーします。',
    linkTool: '無料オンラインJSON to Kotlinデータクラスコンバーターをお試しください。',
    h2_what: 'JSON to Kotlinデータクラス変換とは？',
    whatDesc1: 'JSONはREST API、設定ファイル、クラウドサービスの普遍的なデータ交換フォーマットです。Kotlinはモダンな静的型付け言語であり、明示的な型宣言が必要です。JSON to Kotlinデータクラス変換はJSONドキュメントを分析し、適切に型付けされたプロパティ、デフォルト値、null安全アノテーションを持つKotlinデータクラスを生成します。',
    whatDesc2: '典型的なAndroidアプリケーションでは、RetrofitまたはKtor HTTPクライアントがサーバーからJSONレスポンスを受信します。ネットワーク層はkotlinx.serialization、Moshi、Gsonなどのライブラリを使用してJSONをKotlinオブジェクトに変換する必要があります。',
    whatDesc3: '同じパターンがKtor/Spring Bootのサーバーサイド、Kotlin Multiplatform共有モジュール、Compose Desktopアプリケーションにも適用されます。プロセスは同一です：JSON構造の検査、型の決定、null可能性とネストの処理。',
    h2_typeMapping: 'JSON to Kotlin：型マッピング',
    typeMappingDesc: 'JSONの型がKotlinの型にどのようにマッピングされるかを理解することが変換の基盤です：',
    typeMappingTable: '<table><thead><tr><th>JSON型</th><th>例</th><th>Kotlin型</th><th>備考</th></tr></thead><tbody><tr><td>string</td><td><code>"hello"</code></td><td><code>String</code></td><td>デフォルトで非null；null可能時は<code>String?</code></td></tr><tr><td>number（整数）</td><td><code>42</code></td><td><code>Int</code>、<code>Long</code></td><td>大きな値には<code>Long</code></td></tr><tr><td>number（小数）</td><td><code>3.14</code></td><td><code>Double</code>、<code>BigDecimal</code></td><td>金融データには<code>BigDecimal</code></td></tr><tr><td>boolean</td><td><code>true</code></td><td><code>Boolean</code></td><td>デフォルトで非null</td></tr><tr><td>null</td><td><code>null</code></td><td><code>T?</code></td><td>Kotlinはnull可能と非nullを区別</td></tr><tr><td>array</td><td><code>[1,2]</code></td><td><code>List&lt;T&gt;</code></td><td>不変<code>List</code>推奨</td></tr><tr><td>object</td><td><code>{"k":"v"}</code></td><td><code>data class</code></td><td>強い型付けデータクラス推奨</td></tr></tbody></table>',
    typeMappingExtra: 'JSONからKotlinデータクラスを生成する際、Kotlinのnull安全システムはJavaに対する大きな利点です。各プロパティはnull可能または非nullとして明示的に宣言する必要があります。金額には<code>BigDecimal</code>を使用してください。',
    h2_howWorks: 'JSON to Kotlin変換の仕組み',
    howWorksDesc: 'JSON to Kotlinデータクラスコンバーターは体系的なプロセスに従います：',
    howWorksSteps: '<ol><li><strong>JSON構造を解析</strong>：トークンツリーを構築。</li><li><strong>プロパティ型を推論</strong>：各キーバリューペアのKotlin型を決定。</li><li><strong>null可能性を判定</strong>：不在の可能性があるフィールドを<code>T?</code>としてマーク。</li><li><strong>クラス名を生成</strong>：PascalCaseとcamelCaseに変換。</li><li><strong>ネストオブジェクトを処理</strong>：各オブジェクトが別のデータクラスを生成。</li><li><strong>配列を処理</strong>：要素型を分析。</li><li><strong>アノテーションを追加</strong>：<code>@SerialName</code>、<code>@Json</code>、<code>@SerializedName</code>。</li><li><strong>ソースコードを出力</strong>：フォーマットされたKotlinコード。</li></ol>',
    h2_codeExamples: 'コード例：人気ライブラリでJSON to Kotlin',
    codeKotlinxTitle: 'kotlinx.serialization：@SerializableとJson.decodeFromString',
    codeKotlinxDesc: 'kotlinx.serializationはJetBrainsの公式ライブラリで、Kotlin Multiplatformとモダンなandroid開発に推奨されます：',
    codeMoshiTitle: 'Moshi：@JsonClassとカスタムアダプター',
    codeMoshiDesc: 'MoshiはSquareのモダンなJSONライブラリで、Retrofitとシームレスに統合されます：',
    codeGsonTitle: 'GsonとKotlin：fromJsonとnull安全の懸念',
    codeGsonDesc: 'GsonはKotlinで動作しますが、Kotlinのnull安全を理解せず、非nullプロパティにnullを代入する可能性があります：',
    codeManualTitle: '手動データクラス：デフォルト値、copy()、分解宣言',
    codeManualDesc: '完全な制御が必要な場合、手動データクラスはKotlinの強力な機能を活用できます：',
    h2_nested: 'ネストされたJSONの操作',
    nestedDesc1: '実際のAPIは深くネストされたオブジェクトとポリモーフィック型を含みます：',
    nestedDesc2: '<strong>ネストされたデータクラス</strong>：各ネストレベルが別のデータクラスを生成します。再利用性のためにトップレベル宣言が推奨されます。',
    nestedDesc3: '<strong>ポリモーフィズムのためのシールドクラス</strong>：Kotlinのシールドクラスは<code>when</code>式でコンパイル時の網羅性を提供します。',
    nestedDesc4: '<strong>オブジェクトの配列</strong>：データクラスでは<code>equals()</code>/<code>hashCode()</code>の正しい動作のために<code>Array</code>より<code>List</code>を優先してください。',
    h2_kotlinFeatures: 'JSONデータクラスのKotlin固有機能',
    kotlinFeaturesDesc1: '<strong>data class vs 通常class</strong>：データクラスはequals()、hashCode()、toString()、copy()、componentN()を自動生成します。JSONモデルには常にデータクラスを使用してください。',
    kotlinFeaturesDesc2: '<strong><code>?</code>によるnull安全</strong>：Kotlinの型システムはnull可能型と非null型を区別し、コンパイル時の保護を提供します。',
    kotlinFeaturesDesc3: '<strong>デフォルト値</strong>：JSONフィールドが欠如している場合のフォールバックとしてデフォルト値を持つことができます。',
    kotlinFeaturesDesc4: '<strong>Companion object fromJson</strong>：デシリアライゼーションロジックをcompanion objectにカプセル化します。',
    kotlinFeaturesDesc5: '<strong>拡張関数</strong>：既存の型にデシリアライゼーションヘルパーをイディオマティックに追加します。',
    h2_bestPractices: 'JSON to Kotlin変換のベストプラクティス',
    bestPracticesDesc: '堅牢なアプリケーションを構築するためのベストプラクティス：',
    bp1: '<strong>新プロジェクトにはkotlinx.serializationを優先</strong>：JetBrains公式、Kotlin Multiplatformサポート、コンパイル時コード生成。',
    bp2: '<strong>snake_caseキーには@SerialNameを使用</strong>：命名規則の違いをアノテーションで橋渡し。',
    bp3: '<strong>オプショナルフィールドはnull可能でデフォルト値付き</strong>：<code>ignoreUnknownKeys = true</code>を有効に。',
    bp4: '<strong>ポリモーフィックJSONにはシールドクラス</strong>：<code>when</code>式でコンパイル時の網羅性。',
    bp5: '<strong>新KotlinプロジェクトでGsonを避ける</strong>：GsonはKotlinのnull安全を尊重しません。',
    bp6: '<strong>データクラスを不変に保つ</strong>：<code>var</code>ではなく<code>val</code>を使用。',
    bp7: '<strong>境界で検証する</strong>：companion objectまたは<code>init</code>ブロックで検証ロジックを追加。',
    relatedTools: '関連ツール：<strong>JSON to Java</strong>、<strong>JSON to TypeScript</strong>、<strong>JSON to Dart</strong>。',
    h2_faq: 'よくある質問',
    faq1_q: 'kotlinx.serialization、Moshi、Gson：どれを使うべき？',
    faq1_a: '新プロジェクトにはkotlinx.serializationが推奨です。MoshiはRetrofitを使用するAndroidプロジェクトに優秀です。新KotlinプロジェクトではGsonを避けてください、null安全を尊重しません。',
    faq2_q: 'null可能とオプショナルフィールドをどう処理する？',
    faq2_a: 'オプショナルフィールドをval nickname: String? = nullと宣言します。kotlinx.serializationではデフォルト値付きプロパティは自動的にオプショナルです。',
    faq3_q: 'data classと通常classの違いは？',
    faq3_a: 'データクラスはequals()、hashCode()、toString()、copy()、componentN()を自動生成します。すべてのJSONモデルにdata classを使用してください。',
    conclusion: 'JSONからKotlinデータクラスへの変換はAPI開発の基礎スキルです。無料オンラインツールで即座にコードを生成し、本ガイドでベストプラクティスを参照してください。',
    linkToolBottom: '無料オンラインツールでJSONをKotlinデータクラスに即座に変換。',
  },
  ko: {
    intro: '<strong>JSON을 Kotlin</strong> 데이터 클래스로 변환하는 것은 모던 Android 및 서버사이드 Kotlin 개발의 필수 기술입니다. REST API를 사용할 때 타입 안전한 방식으로 JSON 응답을 역직렬화하기 위한 잘 정의된 Kotlin 데이터 클래스가 필요합니다. 이 종합 가이드는 타입 매핑, kotlinx.serialization, Moshi, Gson, 중첩 구조, 모범 사례를 다룹니다.',
    linkTool: '무료 온라인 JSON to Kotlin 데이터 클래스 변환기를 사용해 보세요.',
    h2_what: 'JSON to Kotlin 데이터 클래스 변환이란?',
    whatDesc1: 'JSON은 REST API, 설정 파일, 클라우드 서비스의 보편적인 데이터 교환 형식입니다. Kotlin은 모던한 정적 타입 언어로 명시적 타입 선언이 필요합니다. JSON to Kotlin 데이터 클래스 변환은 JSON 문서를 분석하여 적절한 타입의 속성, 기본값, null 안전 어노테이션을 가진 Kotlin 데이터 클래스를 생성합니다.',
    whatDesc2: '일반적인 Android 애플리케이션에서 Retrofit 또는 Ktor HTTP 클라이언트가 서버로부터 JSON 응답을 받습니다. 네트워크 레이어는 kotlinx.serialization, Moshi, Gson 같은 라이브러리를 사용하여 JSON을 Kotlin 객체로 변환해야 합니다.',
    whatDesc3: '같은 패턴이 Ktor/Spring Boot 서버사이드, Kotlin Multiplatform 공유 모듈, Compose Desktop 애플리케이션에도 적용됩니다. 프로세스는 동일합니다: JSON 구조 검사, 타입 결정, null 가능성과 중첩 처리.',
    h2_typeMapping: 'JSON to Kotlin: 타입 매핑',
    typeMappingDesc: 'JSON 타입이 Kotlin 타입에 어떻게 매핑되는지 이해하는 것이 변환의 기초입니다:',
    typeMappingTable: '<table><thead><tr><th>JSON 타입</th><th>예시</th><th>Kotlin 타입</th><th>참고</th></tr></thead><tbody><tr><td>string</td><td><code>"hello"</code></td><td><code>String</code></td><td>기본 non-null; nullable시 <code>String?</code></td></tr><tr><td>number(정수)</td><td><code>42</code></td><td><code>Int</code>, <code>Long</code></td><td>큰 값에는 <code>Long</code></td></tr><tr><td>number(소수)</td><td><code>3.14</code></td><td><code>Double</code>, <code>BigDecimal</code></td><td>금융 데이터에는 <code>BigDecimal</code></td></tr><tr><td>boolean</td><td><code>true</code></td><td><code>Boolean</code></td><td>기본 non-null</td></tr><tr><td>null</td><td><code>null</code></td><td><code>T?</code></td><td>Kotlin은 nullable과 non-null을 구분</td></tr><tr><td>array</td><td><code>[1,2]</code></td><td><code>List&lt;T&gt;</code></td><td>불변 <code>List</code> 권장</td></tr><tr><td>object</td><td><code>{"k":"v"}</code></td><td><code>data class</code></td><td>강한 타입 데이터 클래스 권장</td></tr></tbody></table>',
    typeMappingExtra: 'JSON에서 Kotlin 데이터 클래스를 생성할 때 Kotlin의 null 안전 시스템은 Java에 비해 큰 장점입니다. 각 속성은 nullable 또는 non-null로 명시적으로 선언해야 합니다. 금액에는 <code>BigDecimal</code>을 사용하세요.',
    h2_howWorks: 'JSON to Kotlin 변환 작동 원리',
    howWorksDesc: 'JSON to Kotlin 데이터 클래스 변환기는 체계적인 프로세스를 따릅니다:',
    howWorksSteps: '<ol><li><strong>JSON 구조 파싱</strong>: 토큰 트리 구축.</li><li><strong>속성 타입 추론</strong>: 각 키-값 쌍의 Kotlin 타입 결정.</li><li><strong>null 가능성 결정</strong>: 부재할 수 있는 필드를 <code>T?</code>로 표시.</li><li><strong>클래스 이름 생성</strong>: PascalCase와 camelCase로 변환.</li><li><strong>중첩 객체 처리</strong>: 각 객체가 별도 데이터 클래스 생성.</li><li><strong>배열 처리</strong>: 요소 타입 분석.</li><li><strong>어노테이션 추가</strong>: <code>@SerialName</code>, <code>@Json</code>, <code>@SerializedName</code>.</li><li><strong>소스 코드 출력</strong>: 포맷된 Kotlin 코드.</li></ol>',
    h2_codeExamples: '코드 예제: 인기 라이브러리로 JSON to Kotlin',
    codeKotlinxTitle: 'kotlinx.serialization: @Serializable과 Json.decodeFromString',
    codeKotlinxDesc: 'kotlinx.serialization은 JetBrains의 공식 라이브러리로 Kotlin Multiplatform과 모던 Android 개발에 권장됩니다:',
    codeMoshiTitle: 'Moshi: @JsonClass와 커스텀 어댑터',
    codeMoshiDesc: 'Moshi는 Square의 모던 JSON 라이브러리로 Retrofit과 원활하게 통합됩니다:',
    codeGsonTitle: 'Gson과 Kotlin: fromJson과 null 안전 우려',
    codeGsonDesc: 'Gson은 Kotlin과 작동하지만 Kotlin의 null 안전을 이해하지 못하며 non-null 속성에 null을 할당할 수 있습니다:',
    codeManualTitle: '수동 데이터 클래스: 기본값, copy(), 구조 분해',
    codeManualDesc: '완전한 제어가 필요할 때 수동 데이터 클래스는 Kotlin의 강력한 기능을 활용합니다:',
    h2_nested: '중첩 JSON 작업',
    nestedDesc1: '실제 API는 깊게 중첩된 객체와 다형적 타입을 포함합니다:',
    nestedDesc2: '<strong>중첩 데이터 클래스</strong>: 각 중첩 레벨이 별도의 데이터 클래스를 생성합니다. 재사용성을 위해 최상위 선언이 권장됩니다.',
    nestedDesc3: '<strong>다형성을 위한 sealed 클래스</strong>: Kotlin의 sealed 클래스는 <code>when</code> 식에서 컴파일 시간 완전성을 제공합니다.',
    nestedDesc4: '<strong>객체 배열</strong>: 데이터 클래스에서 <code>equals()</code>/<code>hashCode()</code>의 올바른 동작을 위해 <code>Array</code>보다 <code>List</code>를 선호하세요.',
    h2_kotlinFeatures: 'JSON 데이터 클래스의 Kotlin 고유 기능',
    kotlinFeaturesDesc1: '<strong>data class vs 일반 class</strong>: 데이터 클래스는 equals(), hashCode(), toString(), copy(), componentN()을 자동 생성합니다. JSON 모델에는 항상 데이터 클래스를 사용하세요.',
    kotlinFeaturesDesc2: '<strong><code>?</code>로 null 안전</strong>: Kotlin의 타입 시스템은 nullable과 non-null 타입을 구분하여 컴파일 시간 보호를 제공합니다.',
    kotlinFeaturesDesc3: '<strong>기본값</strong>: JSON 필드가 없을 때 폴백으로 기본값을 가질 수 있습니다.',
    kotlinFeaturesDesc4: '<strong>Companion object fromJson</strong>: 역직렬화 로직을 companion object에 캡슐화합니다.',
    kotlinFeaturesDesc5: '<strong>확장 함수</strong>: 기존 타입에 역직렬화 헬퍼를 관용적으로 추가합니다.',
    h2_bestPractices: 'JSON to Kotlin 변환 모범 사례',
    bestPracticesDesc: '견고한 애플리케이션 구축을 위한 모범 사례:',
    bp1: '<strong>새 프로젝트에는 kotlinx.serialization 우선</strong>: JetBrains 공식, Kotlin Multiplatform 지원, 컴파일 시간 코드 생성.',
    bp2: '<strong>snake_case 키에는 @SerialName 사용</strong>: 어노테이션으로 명명 규칙 차이를 연결.',
    bp3: '<strong>선택적 필드는 nullable + 기본값</strong>: <code>ignoreUnknownKeys = true</code> 활성화.',
    bp4: '<strong>다형적 JSON에는 sealed 클래스</strong>: <code>when</code> 식에서 컴파일 시간 완전성.',
    bp5: '<strong>새 Kotlin 프로젝트에서 Gson 회피</strong>: Gson은 Kotlin null 안전을 존중하지 않습니다.',
    bp6: '<strong>데이터 클래스를 불변으로 유지</strong>: <code>var</code> 대신 <code>val</code> 사용.',
    bp7: '<strong>경계에서 검증</strong>: companion object 또는 <code>init</code> 블록에서 검증 로직 추가.',
    relatedTools: '관련 도구: <strong>JSON to Java</strong>, <strong>JSON to TypeScript</strong>, <strong>JSON to Dart</strong>.',
    h2_faq: '자주 묻는 질문',
    faq1_q: 'kotlinx.serialization, Moshi, Gson 중 어떤 라이브러리를 사용해야 하나요?',
    faq1_a: '새 프로젝트에는 kotlinx.serialization이 권장됩니다. Moshi는 Retrofit을 사용하는 Android 프로젝트에 우수합니다. 새 Kotlin 프로젝트에서는 Gson을 피하세요, null 안전을 존중하지 않습니다.',
    faq2_q: 'nullable과 선택적 필드를 어떻게 처리하나요?',
    faq2_a: '선택적 필드를 val nickname: String? = null로 선언하세요. kotlinx.serialization에서 기본값이 있는 속성은 자동으로 선택적입니다.',
    faq3_q: 'data class와 일반 class의 차이점은 무엇인가요?',
    faq3_a: '데이터 클래스는 equals(), hashCode(), toString(), copy(), componentN()을 자동 생성합니다. 모든 JSON 모델에 data class를 사용하세요.',
    conclusion: 'JSON에서 Kotlin 데이터 클래스로의 변환은 API 개발의 기초 기술입니다. 무료 온라인 도구로 즉시 코드를 생성하고 본 가이드에서 모범 사례를 참조하세요.',
    linkToolBottom: '무료 온라인 도구로 JSON을 Kotlin 데이터 클래스로 즉시 변환하세요.',
  },
};

export default function JsonToKotlinDataClassGuide({ lang }: { lang: string }) {
  const s = t[lang] || t['en'];

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: s.faq1_q, acceptedAnswer: { '@type': 'Answer', text: s.faq1_a } },
      { '@type': 'Question', name: s.faq2_q, acceptedAnswer: { '@type': 'Answer', text: s.faq2_a } },
      { '@type': 'Question', name: s.faq3_q, acceptedAnswer: { '@type': 'Answer', text: s.faq3_a } },
      ...(s.faq4_q ? [{ '@type': 'Question', name: s.faq4_q, acceptedAnswer: { '@type': 'Answer', text: s.faq4_a } }] : []),
      ...(s.faq5_q ? [{ '@type': 'Question', name: s.faq5_q, acceptedAnswer: { '@type': 'Answer', text: s.faq5_a } }] : []),
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <p dangerouslySetInnerHTML={{ __html: s.intro }} />
      <p><Link href={`/${lang}/tools/json-to-kotlin`} style={{ fontWeight: 600 }}>{s.linkTool}</Link></p>

      {/* Section 1: What is JSON to Kotlin Data Class Conversion? */}
      <h2>{s.h2_what}</h2>
      <p dangerouslySetInnerHTML={{ __html: s.whatDesc1 }} />
      <p dangerouslySetInnerHTML={{ __html: s.whatDesc2 }} />
      <p dangerouslySetInnerHTML={{ __html: s.whatDesc3 }} />

      {/* Section 2: JSON to Kotlin Type Mapping */}
      <h2>{s.h2_typeMapping}</h2>
      <p>{s.typeMappingDesc}</p>
      <div dangerouslySetInnerHTML={{ __html: s.typeMappingTable }} />
      <p dangerouslySetInnerHTML={{ __html: s.typeMappingExtra }} />

      {/* Section 3: How JSON to Kotlin Conversion Works */}
      <h2>{s.h2_howWorks}</h2>
      <p dangerouslySetInnerHTML={{ __html: s.howWorksDesc }} />
      <div dangerouslySetInnerHTML={{ __html: s.howWorksSteps }} />

      {/* Section 4: Code Examples */}
      <h2>{s.h2_codeExamples}</h2>

      <h3>{s.codeKotlinxTitle}</h3>
      <p dangerouslySetInnerHTML={{ __html: s.codeKotlinxDesc }} />
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

// === Kotlin data class with kotlinx.serialization ===
import kotlinx.serialization.*
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

// === Deserialization with Json.decodeFromString ===
val json = Json {
    ignoreUnknownKeys = true
    isLenient = true
    coerceInputValues = true
}

// Single object
val user: User = json.decodeFromString(jsonString)

// List of objects
val users: List<User> = json.decodeFromString(jsonArrayString)

// Serialization back to JSON
val outputJson: String = json.encodeToString(user)

// === Custom serializer for special types ===
object InstantSerializer : KSerializer<Long> {
    override val descriptor = PrimitiveSerialDescriptor(
        "Instant", PrimitiveKind.LONG
    )
    override fun serialize(encoder: Encoder, value: Long) =
        encoder.encodeLong(value)
    override fun deserialize(decoder: Decoder): Long =
        decoder.decodeLong()
}

// Usage: @Serializable(with = InstantSerializer::class)
// val createdAt: Long`}</code></pre>

      <h3>{s.codeMoshiTitle}</h3>
      <p dangerouslySetInnerHTML={{ __html: s.codeMoshiDesc }} />
      <pre><code>{`import com.squareup.moshi.*
import com.squareup.moshi.kotlin.reflect.KotlinJsonAdapterFactory

// === Kotlin data class with Moshi annotations ===
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

@JsonClass(generateAdapter = true)
data class Address(
    val street: String,
    val city: String,
    @Json(name = "zip_code") val zipCode: String
)

// === Deserialization with Moshi ===
val moshi: Moshi = Moshi.Builder()
    .addLast(KotlinJsonAdapterFactory())
    .build()

// Single object
val userAdapter: JsonAdapter<User> = moshi.adapter(User::class.java)
val user: User? = userAdapter.fromJson(jsonString)

// List of objects using parameterized type
val listType = Types.newParameterizedType(
    List::class.java, User::class.java
)
val listAdapter: JsonAdapter<List<User>> = moshi.adapter(listType)
val users: List<User>? = listAdapter.fromJson(jsonArrayString)

// === Custom adapter for special types ===
class DateAdapter {
    @ToJson
    fun toJson(date: java.util.Date): String =
        date.time.toString()

    @FromJson
    fun fromJson(timestamp: String): java.util.Date =
        java.util.Date(timestamp.toLong())
}

// Register: Moshi.Builder().add(DateAdapter()).build()`}</code></pre>

      <h3>{s.codeGsonTitle}</h3>
      <p dangerouslySetInnerHTML={{ __html: s.codeGsonDesc }} />
      <pre><code>{`import com.google.gson.Gson
import com.google.gson.GsonBuilder
import com.google.gson.annotations.SerializedName
import com.google.gson.reflect.TypeToken

// === Kotlin data class with Gson annotations ===
// WARNING: Gson does NOT respect Kotlin null safety!
// It can assign null to non-nullable properties.
data class User(
    @SerializedName("user_id") val userId: Long,
    @SerializedName("user_name") val userName: String,
    val email: String,
    @SerializedName("is_active") val isActive: Boolean,
    val balance: Double,
    val tags: List<String> = emptyList(),
    val address: Address? = null  // always use ? with Gson
)

data class Address(
    val street: String,
    val city: String,
    @SerializedName("zip_code") val zipCode: String
)

// === Deserialization with Gson ===
val gson: Gson = GsonBuilder()
    .setDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSSZ")
    .create()

// Single object
val user: User = gson.fromJson(jsonString, User::class.java)

// List of objects using TypeToken
val userListType = object : TypeToken<List<User>>() {}.type
val users: List<User> = gson.fromJson(jsonArrayString, userListType)

// SAFETY TIP: Validate non-null fields after Gson deserialization
fun User.validate(): User {
    requireNotNull(userName) { "userName must not be null" }
    requireNotNull(email) { "email must not be null" }
    return this
}

val safeUser = gson.fromJson(jsonString, User::class.java).validate()`}</code></pre>

      <h3>{s.codeManualTitle}</h3>
      <p dangerouslySetInnerHTML={{ __html: s.codeManualDesc }} />
      <pre><code>{`// === Manual data class with Kotlin features ===
data class Product(
    val id: Long,
    val name: String,
    val price: Double,
    val inStock: Boolean = true,
    val categories: List<String> = emptyList(),
    val description: String? = null
) {
    // init block for validation
    init {
        require(name.isNotBlank()) { "Product name must not be blank" }
        require(price >= 0) { "Price must be non-negative" }
    }

    // Companion object with factory method
    companion object {
        fun fromJson(jsonString: String): Product {
            val json = kotlinx.serialization.json.Json {
                ignoreUnknownKeys = true
            }
            return json.decodeFromString(jsonString)
        }
    }
}

// === Using copy() for immutable updates ===
val original = Product(
    id = 42,
    name = "Wireless Keyboard",
    price = 79.99,
    categories = listOf("electronics", "peripherals")
)

// Create a modified copy without mutating the original
val discounted = original.copy(price = 59.99)
val outOfStock = original.copy(inStock = false)

// === Destructuring declarations ===
val (id, name, price) = original
println("Product #$id: $name costs $$price")

// === Extension function for deserialization ===
fun String.toProduct(): Product = Product.fromJson(this)
val product = jsonString.toProduct()

// === Using with collections ===
val products = listOf(original, discounted, outOfStock)
val availableProducts = products.filter { it.inStock }
val totalValue = products.sumOf { it.price }
val productMap = products.associateBy { it.id }`}</code></pre>

      {/* Section 5: Working with Nested JSON */}
      <h2>{s.h2_nested}</h2>
      <p dangerouslySetInnerHTML={{ __html: s.nestedDesc1 }} />
      <p dangerouslySetInnerHTML={{ __html: s.nestedDesc2 }} />
      <p dangerouslySetInnerHTML={{ __html: s.nestedDesc3 }} />
      <pre><code>{`// === Sealed class for polymorphic JSON deserialization ===
import kotlinx.serialization.*
import kotlinx.serialization.json.*

@Serializable
sealed class Notification {
    abstract val message: String
}

@Serializable
@SerialName("email")
data class EmailNotification(
    override val message: String,
    val recipient: String,
    val subject: String
) : Notification()

@Serializable
@SerialName("sms")
data class SmsNotification(
    override val message: String,
    @SerialName("phone_number") val phoneNumber: String
) : Notification()

@Serializable
@SerialName("push")
data class PushNotification(
    override val message: String,
    @SerialName("device_token") val deviceToken: String,
    val title: String
) : Notification()

// JSON input with type discriminator:
// {"type":"email","message":"Hello","recipient":"a@b.com","subject":"Hi"}

val json = Json {
    classDiscriminator = "type"
    ignoreUnknownKeys = true
}

val notification: Notification = json.decodeFromString(jsonString)

// Exhaustive when expression (compiler enforces all branches)
when (notification) {
    is EmailNotification -> println("Email to \${notification.recipient}")
    is SmsNotification -> println("SMS to \${notification.phoneNumber}")
    is PushNotification -> println("Push: \${notification.title}")
}`}</code></pre>
      <p dangerouslySetInnerHTML={{ __html: s.nestedDesc4 }} />

      {/* Section 6: Kotlin-Specific Features */}
      <h2>{s.h2_kotlinFeatures}</h2>
      <p dangerouslySetInnerHTML={{ __html: s.kotlinFeaturesDesc1 }} />
      <p dangerouslySetInnerHTML={{ __html: s.kotlinFeaturesDesc2 }} />
      <p dangerouslySetInnerHTML={{ __html: s.kotlinFeaturesDesc3 }} />
      <p dangerouslySetInnerHTML={{ __html: s.kotlinFeaturesDesc4 }} />
      <pre><code>{`// === Companion object factory pattern ===
import kotlinx.serialization.*
import kotlinx.serialization.json.*

@Serializable
data class ApiResponse<T>(
    val success: Boolean,
    val data: T? = null,
    val error: String? = null
) {
    companion object {
        inline fun <reified T> fromJson(jsonString: String): ApiResponse<T> {
            return Json { ignoreUnknownKeys = true }
                .decodeFromString(jsonString)
        }
    }
}

// Usage: val response = ApiResponse.fromJson<User>(jsonString)

// === Extension function pattern ===
inline fun <reified T> String.parseJson(): T {
    return Json { ignoreUnknownKeys = true }
        .decodeFromString(this)
}

// Usage: val user: User = jsonString.parseJson()
// Usage: val users: List<User> = jsonArrayString.parseJson()`}</code></pre>
      <p dangerouslySetInnerHTML={{ __html: s.kotlinFeaturesDesc5 }} />

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
        <Link href={`/${lang}/tools/json-to-java`} style={{ marginRight: 16 }}>JSON to Java</Link>
        <Link href={`/${lang}/tools/json-to-typescript`} style={{ marginRight: 16 }}>JSON to TypeScript</Link>
        <Link href={`/${lang}/tools/json-to-dart`}>JSON to Dart</Link>
      </p>

      {/* Section 8: FAQ */}
      <h2>{s.h2_faq}</h2>
      <h3>{s.faq1_q}</h3>
      <p dangerouslySetInnerHTML={{ __html: s.faq1_a }} />
      <h3>{s.faq2_q}</h3>
      <p dangerouslySetInnerHTML={{ __html: s.faq2_a }} />
      <h3>{s.faq3_q}</h3>
      <p dangerouslySetInnerHTML={{ __html: s.faq3_a }} />
      {s.faq4_q && <><h3>{s.faq4_q}</h3><p dangerouslySetInnerHTML={{ __html: s.faq4_a }} /></>}
      {s.faq5_q && <><h3>{s.faq5_q}</h3><p dangerouslySetInnerHTML={{ __html: s.faq5_a }} /></>}

      <p style={{ marginTop: 32 }} dangerouslySetInnerHTML={{ __html: s.conclusion }} />
      <p><Link href={`/${lang}/tools/json-to-kotlin`} style={{ fontWeight: 600 }}>{s.linkToolBottom}</Link></p>

      {/* Internal links for SEO */}
      <h2>Related Developer Tools and Guides</h2>
      <ul>
        <li><Link href={`/${lang}/tools/json-to-kotlin`}>JSON to Kotlin Converter</Link> - Convert JSON to Kotlin data classes instantly</li>
        <li><Link href={`/${lang}/tools/json-to-java`}>JSON to Java Converter</Link> - Generate Java POJOs from JSON</li>
        <li><Link href={`/${lang}/tools/json-to-typescript`}>JSON to TypeScript Converter</Link> - Create TypeScript interfaces from JSON</li>
        <li><Link href={`/${lang}/tools/json-to-dart`}>JSON to Dart Converter</Link> - Generate Dart/Flutter models from JSON</li>
        <li><Link href={`/${lang}/tools/json-to-python`}>JSON to Python Converter</Link> - Create Python dataclasses from JSON</li>
        <li><Link href={`/${lang}/tools/json-to-csharp`}>JSON to C# Converter</Link> - Generate C# classes from JSON</li>
        <li><Link href={`/${lang}/tools/json-to-go`}>JSON to Go Converter</Link> - Create Go structs from JSON</li>
        <li><Link href={`/${lang}/tools/json-formatter`}>JSON Formatter</Link> - Format and validate JSON data</li>
      </ul>
    </>
  );
}
