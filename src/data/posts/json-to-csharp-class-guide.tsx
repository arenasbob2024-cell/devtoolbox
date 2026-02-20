import Link from 'next/link';

const t: Record<string, Record<string, string>> = {
  en: {
    intro: 'Converting <strong>JSON to C#</strong> classes is an essential task in modern .NET development. Whether you are building an ASP.NET Core Web API, a Unity game, a Blazor WebAssembly app, or a MAUI mobile client, you need strongly typed C# classes to deserialize JSON responses from REST APIs and configuration files. A reliable <strong>JSON to C# class converter</strong> eliminates hours of manual coding and reduces runtime errors. This comprehensive guide covers type mapping, <strong>System.Text.Json</strong> and <strong>Newtonsoft.Json</strong> strategies, record types, POCO generation, nested structures, .NET 8 source generators, and best practices for generating a <strong>C# class from JSON</strong>. If you need to <strong>convert JSON to C# online</strong> right now, try our free tool.',
    linkTool: 'Try our free online JSON to C# Class Converter instantly.',
    h2_what: 'What Is JSON to C# Class Conversion?',
    whatDesc1: 'JSON (JavaScript Object Notation) is the universal data interchange format for web APIs, cloud services, and configuration systems. C# is a statically typed language that requires explicit class definitions before data can be consumed programmatically. <strong>JSON to C# class conversion</strong> bridges this gap by analyzing a JSON document and producing corresponding C# classes with properly typed properties, nullable annotations, and serialization attributes.',
    whatDesc2: 'In a typical ASP.NET Core application, a controller receives an HTTP request body as a JSON string. The framework must <strong>convert JSON to C#</strong> objects using either the built-in <strong>System.Text.Json</strong> serializer or the popular <strong>Newtonsoft.Json</strong> library. Without properly defined classes, <strong>C# JSON deserialize</strong> operations fail at runtime with cryptic exceptions. A <strong>JSON to C# class converter</strong> automates the creation of these data transfer objects so you can focus on business logic.',
    whatDesc3: 'The same conversion is critical in Unity game development where JSON configs define levels, items, and player data, in Blazor apps that consume third-party APIs, and in Azure Functions processing event payloads. Whether you call it <strong>JSON to C# class</strong>, <strong>JSON to POCO</strong>, or <strong>generate C# class from JSON</strong>, the underlying process is identical: inspect the JSON structure, determine each property\'s type, handle nesting and arrays, and produce clean, annotated C# source code.',
    h2_typeMapping: 'JSON to C#: Type Mapping',
    typeMappingDesc: 'Understanding how JSON types map to C# types is the foundation of any <strong>JSON to C#</strong> conversion. The following table shows the standard mappings used by <strong>System.Text.Json</strong>, <strong>Newtonsoft.Json</strong>, and most code generators:',
    typeMappingTable: '<table><thead><tr><th>JSON Type</th><th>Example</th><th>C# Type(s)</th><th>Notes</th></tr></thead><tbody><tr><td>string</td><td><code>"hello"</code></td><td><code>string</code></td><td>Always maps to <code>System.String</code></td></tr><tr><td>number (integer)</td><td><code>42</code></td><td><code>int</code>, <code>long</code></td><td>Use <code>long</code> for values exceeding 2^31-1; use <code>int?</code> when nullable</td></tr><tr><td>number (decimal)</td><td><code>3.14</code></td><td><code>double</code>, <code>decimal</code></td><td>Use <code>decimal</code> for financial data to avoid floating-point errors</td></tr><tr><td>boolean</td><td><code>true</code></td><td><code>bool</code></td><td>Use <code>bool?</code> when the field can be absent or null</td></tr><tr><td>null</td><td><code>null</code></td><td><code>null</code></td><td>Nullable reference types (<code>string?</code>) or nullable value types (<code>int?</code>)</td></tr><tr><td>array</td><td><code>[1, 2, 3]</code></td><td><code>List&lt;T&gt;</code>, <code>T[]</code></td><td><code>List&lt;T&gt;</code> preferred; <code>IReadOnlyList&lt;T&gt;</code> for immutability</td></tr><tr><td>object</td><td><code>{"k": "v"}</code></td><td>Nested class or <code>Dictionary&lt;string, object&gt;</code></td><td>Strongly typed nested classes preferred over dictionaries</td></tr></tbody></table>',
    typeMappingExtra: 'When you <strong>generate a C# class from JSON</strong>, choosing between value types (<code>int</code>, <code>bool</code>) and their nullable counterparts (<code>int?</code>, <code>bool?</code>) matters. With C# nullable reference types enabled (<code>#nullable enable</code>), properties that may be absent in the JSON should be declared nullable. For monetary values, always prefer <code>decimal</code> over <code>double</code> to avoid precision loss. Arrays of objects should map to <code>List&lt;NestedClass&gt;</code> to leverage generics and LINQ.',
    h2_howWorks: 'How JSON to C# Conversion Works',
    howWorksDesc: 'A <strong>JSON to C# class converter</strong> follows a systematic process to transform raw JSON into compilable C# source code:',
    howWorksSteps: '<ol><li><strong>Parse the JSON structure</strong>: The converter tokenizes the input JSON, building an abstract syntax tree of objects, arrays, and primitives. Invalid JSON is rejected at this stage.</li><li><strong>Infer property types</strong>: For each key-value pair, the converter determines the C# type. Strings become <code>string</code>, integers become <code>int</code> or <code>long</code>, decimals become <code>double</code> or <code>decimal</code>, booleans become <code>bool</code>, and nested objects become new classes.</li><li><strong>Generate class and property names</strong>: JSON keys like <code>user_name</code> or <code>shipping-info</code> are converted to PascalCase property names (<code>UserName</code>, <code>ShippingInfo</code>) following C# naming conventions.</li><li><strong>Handle nested objects</strong>: Each nested JSON object generates a separate C# class. Deeply nested structures produce a class hierarchy. Circular references are detected and handled.</li><li><strong>Handle arrays</strong>: JSON arrays are analyzed to determine the element type. Arrays of objects produce <code>List&lt;ElementClass&gt;</code>. Mixed-type arrays fall back to <code>List&lt;object&gt;</code>.</li><li><strong>Add serialization attributes</strong>: The converter optionally adds <code>[JsonPropertyName]</code> (System.Text.Json) or <code>[JsonProperty]</code> (Newtonsoft) attributes when the JSON key does not match C# naming conventions.</li><li><strong>Output source code</strong>: The final step emits properly formatted C# source with using directives, namespace declarations, property declarations, and optional nullable annotations.</li></ol>',
    h2_codeExamples: 'Code Examples: JSON to C# with System.Text.Json and Newtonsoft',
    codeSTJTitle: 'System.Text.Json (.NET 8+): JsonSerializer and Attributes',
    codeSTJDesc: '<strong>System.Text.Json</strong> is the built-in, high-performance JSON serializer in .NET. Starting with .NET 8, it supports source generators for AOT compilation, making it the recommended choice for new projects. Here is a complete example showing how to <strong>convert JSON to C#</strong> objects with <code>JsonSerializer</code>, <code>[JsonPropertyName]</code>, custom converters, and source generators:',
    codeNewtonsoftTitle: 'Newtonsoft.Json: JsonConvert and Attributes',
    codeNewtonsoftDesc: '<strong>Newtonsoft.Json</strong> (Json.NET) has been the de facto standard for <strong>C# JSON deserialize</strong> operations for over a decade. It offers a richer feature set including dynamic parsing with <code>JObject</code>, LINQ-to-JSON, and extensive customization through <code>JsonConverter</code>:',
    codeRecordsTitle: 'C# Records: Immutable Data Models',
    codeRecordsDesc: 'C# 9+ records provide a concise way to define immutable data models for <strong>JSON to C# class</strong> conversion. Records automatically generate <code>Equals</code>, <code>GetHashCode</code>, <code>ToString</code>, and support <code>with</code> expressions for non-destructive mutation:',
    codeManualTitle: 'Manual POCO: Class with Properties',
    codeManualDesc: 'When you need full control over your <strong>JSON to C#</strong> classes, a traditional POCO (Plain Old CLR Object) with explicit properties, <code>INotifyPropertyChanged</code> for data binding, or integration with AutoMapper provides maximum flexibility:',
    h2_nested: 'Working with Nested JSON Structures',
    nestedDesc1: 'Real-world APIs rarely return flat JSON. Most responses contain deeply nested objects, arrays of objects, and polymorphic types. Converting these complex structures into a <strong>C# class from JSON</strong> requires careful design:',
    nestedDesc2: '<strong>Deeply nested objects</strong>: Each level of nesting produces a separate C# class. For a JSON structure like <code>{"user": {"address": {"city": "NYC"}}}</code>, you need three classes: the root class, a <code>User</code> class, and an <code>Address</code> class. In C#, these can be separate files, nested classes, or records defined in the same file.',
    nestedDesc3: '<strong>Arrays of objects</strong>: A JSON field like <code>"items": [{"id": 1}, {"id": 2}]</code> maps to <code>List&lt;Item&gt;</code> in C#. Both System.Text.Json and Newtonsoft handle generic list deserialization automatically. For immutable collections, use <code>IReadOnlyList&lt;Item&gt;</code>.',
    nestedDesc4: '<strong>Polymorphic deserialization</strong>: When a JSON field can hold different object shapes based on a discriminator, .NET 7+ supports <code>[JsonDerivedType]</code> and <code>[JsonPolymorphic]</code> attributes for type-safe deserialization with System.Text.Json. Newtonsoft uses <code>TypeNameHandling</code> or custom <code>JsonConverter</code> implementations:',
    nestedCode: '// Polymorphic deserialization with .NET 7+ System.Text.Json\n[JsonPolymorphic(TypeDiscriminatorPropertyName = "type")]\n[JsonDerivedType(typeof(EmailNotification), "email")]\n[JsonDerivedType(typeof(SmsNotification), "sms")]\n[JsonDerivedType(typeof(PushNotification), "push")]\npublic abstract class Notification\n{\n    public string Type { get; set; } = "";\n    public string Message { get; set; } = "";\n    public DateTime CreatedAt { get; set; }\n}\n\npublic class EmailNotification : Notification\n{\n    public string Recipient { get; set; } = "";\n    public string Subject { get; set; } = "";\n}\n\npublic class SmsNotification : Notification\n{\n    public string PhoneNumber { get; set; } = "";\n}\n\npublic class PushNotification : Notification\n{\n    public string DeviceToken { get; set; } = "";\n    public string Title { get; set; } = "";\n}',
    h2_advanced: 'Advanced Patterns: Source Generators, AOT, and Nullable Reference Types',
    advancedDesc1: '.NET 8 <strong>source generators</strong> for System.Text.Json produce compile-time serialization code, eliminating reflection and enabling Native AOT deployment. This is critical for cloud-native microservices, serverless functions, and mobile apps where startup time matters:',
    advancedSourceGenCode: '// .NET 8 Source Generator for AOT-friendly serialization\nusing System.Text.Json.Serialization;\n\n[JsonSerializable(typeof(Product))]\n[JsonSerializable(typeof(List<Product>))]\n[JsonSourceGenerationOptions(\n    PropertyNamingPolicy = JsonKnownNamingPolicy.CamelCase,\n    DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull)]\npublic partial class AppJsonContext : JsonSerializerContext { }\n\n// Usage: zero-reflection serialization\nvar product = JsonSerializer.Deserialize(\n    json, AppJsonContext.Default.Product);\nvar jsonOut = JsonSerializer.Serialize(\n    product, AppJsonContext.Default.Product);',
    advancedDesc2: '<strong>Nullable reference types</strong> (NRT) in C# 8+ provide compile-time null safety for your <strong>JSON to C# class</strong> definitions. When enabled with <code>#nullable enable</code>, the compiler warns about potential null dereferences. Combined with <code>required</code> properties (C# 11+), you can enforce that mandatory JSON fields are always present:',
    advancedNullableCode: '// Nullable reference types + required properties (C# 11+)\n#nullable enable\n\npublic class UserProfile\n{\n    public required string Name { get; init; }\n    public required string Email { get; init; }\n    public string? Nickname { get; init; }     // optional\n    public int Age { get; init; }\n    public string? AvatarUrl { get; init; }     // optional\n    public required List<string> Roles { get; init; }\n}\n\n// Deserialization enforces required properties\nvar user = JsonSerializer.Deserialize<UserProfile>(json, options)\n    ?? throw new InvalidOperationException("Failed to deserialize");',
    advancedDesc3: '<strong>System.Text.Json vs Newtonsoft.Json comparison</strong>: System.Text.Json is 2-5x faster for most workloads, uses less memory, and supports source generators for AOT. Newtonsoft.Json offers richer features including LINQ-to-JSON, <code>JObject</code> dynamic access, better support for legacy serialization patterns, and more lenient parsing. For new .NET 8+ projects, System.Text.Json is recommended; for complex migration scenarios or when you need <code>JObject</code>-style dynamic parsing, Newtonsoft remains valuable.',
    h2_bestPractices: 'Best Practices for JSON to C# Conversion',
    bestPracticesDesc: 'Follow these best practices when you <strong>convert JSON to C#</strong> classes to build robust, maintainable .NET applications:',
    bp1: '<strong>Use PascalCase properties with serialization attributes</strong>: C# properties should be PascalCase. Use <code>[JsonPropertyName("snake_case")]</code> (System.Text.Json) or <code>[JsonProperty("snake_case")]</code> (Newtonsoft) to map JSON keys. Alternatively, set <code>JsonSerializerOptions.PropertyNamingPolicy = JsonNamingPolicy.CamelCase</code> globally.',
    bp2: '<strong>Enable nullable reference types</strong>: Add <code>#nullable enable</code> to your project and mark optional JSON properties as nullable (<code>string?</code>, <code>int?</code>). This catches potential null reference exceptions at compile time rather than runtime.',
    bp3: '<strong>Handle unknown properties gracefully</strong>: System.Text.Json ignores unknown properties by default. Newtonsoft throws by default, so set <code>MissingMemberHandling = MissingMemberHandling.Ignore</code> or use <code>[JsonExtensionData]</code> to capture unknown fields in a <code>Dictionary&lt;string, JsonElement&gt;</code>.',
    bp4: '<strong>Use decimal for monetary values</strong>: Never use <code>float</code> or <code>double</code> for money. JSON number <code>19.99</code> can lose precision as a floating-point type. Map financial fields to <code>decimal</code> for exact arithmetic.',
    bp5: '<strong>Prefer records for DTOs</strong>: Use C# records with <code>init</code>-only properties for data transfer objects. Records provide value-based equality, immutability, and concise syntax. Use <code>with</code> expressions when you need modified copies.',
    bp6: '<strong>Use source generators for performance</strong>: In .NET 8+ projects, use <code>[JsonSerializable]</code> source generators to eliminate reflection overhead. This is required for Native AOT and significantly improves cold start times in serverless environments.',
    bp7: '<strong>Validate deserialized data</strong>: Apply data annotations (<code>[Required]</code>, <code>[Range]</code>, <code>[StringLength]</code>) or FluentValidation rules to validate deserialized objects. Never trust that incoming JSON matches your expected schema without validation.',
    relatedTools: 'Related tools you might find useful: <strong>JSON to Java</strong> for Spring Boot and Android development, <strong>JSON to TypeScript</strong> for frontend interfaces, and <strong>JSON to Kotlin</strong> for Kotlin/Android projects.',
    h2_faq: 'Frequently Asked Questions',
    faq1_q: 'System.Text.Json vs Newtonsoft.Json: which should I use for JSON to C#?',
    faq1_a: 'For new .NET 8+ projects, System.Text.Json is recommended. It is built into the framework, offers 2-5x better performance, lower memory allocation, and supports source generators for Native AOT compilation. Newtonsoft.Json (Json.NET) remains valuable for legacy projects, complex scenarios requiring JObject/LINQ-to-JSON dynamic parsing, or when you need features like TypeNameHandling for polymorphic serialization. Both libraries support records, custom converters, and nullable reference types. If you are starting a new ASP.NET Core project, System.Text.Json is the default and should be your first choice.',
    faq2_q: 'Should I use C# records or traditional classes for JSON deserialization?',
    faq2_a: 'Use C# records when you need immutable data transfer objects with minimal boilerplate. Records (C# 9+) automatically generate Equals, GetHashCode, ToString, and support with expressions for non-destructive mutation. Both System.Text.Json and Newtonsoft support record deserialization. Use traditional classes when you need mutability, INotifyPropertyChanged for UI data binding, complex initialization logic, or EF Core entity support. For ASP.NET Core API DTOs and configuration models, records with init-only properties are the modern best practice.',
    faq3_q: 'How do I handle unknown JSON properties that are not in my C# class?',
    faq3_a: 'System.Text.Json ignores unknown properties by default, so no configuration is needed. To capture unknown fields, add a Dictionary<string, JsonElement> property with [JsonExtensionData]. In Newtonsoft.Json, unknown properties throw by default. Set MissingMemberHandling = MissingMemberHandling.Ignore on JsonSerializerSettings, or use [JsonExtensionData] with a Dictionary<string, JToken>. This defensive approach ensures your application does not break when APIs add new fields.',
    conclusion: 'Converting <strong>JSON to C#</strong> classes is a fundamental skill for every .NET developer. From simple POCOs to advanced patterns with records, source generators, nullable reference types, and polymorphic deserialization, the right approach depends on your project\'s requirements. Use our free online <strong>JSON to C# class converter</strong> for instant code generation, and refer to this guide for best practices on type mapping, nested structures, and choosing between <strong>System.Text.Json</strong> and <strong>Newtonsoft.Json</strong>.',
    linkToolBottom: 'Convert JSON to C# classes instantly with our free online tool.',
  },
  zh: {
    intro: '将 <strong>JSON 转换为 C#</strong> 类是现代 .NET 开发中的必备技能。无论你是构建 ASP.NET Core Web API、Unity 游戏、Blazor WebAssembly 应用还是 MAUI 移动客户端，都需要强类型 C# 类来反序列化 JSON 响应。本指南全面介绍类型映射、System.Text.Json 和 Newtonsoft.Json 策略、record 类型、POCO 生成、嵌套结构以及从 JSON 生成 C# 类的最佳实践。',
    linkTool: '立即试用我们的免费在线 JSON 转 C# 类转换工具。',
    h2_what: '什么是 JSON 转 C# 类转换？',
    whatDesc1: 'JSON 是 Web API、云服务和配置系统的通用数据交换格式。C# 是静态类型语言，需要在程序使用数据前定义显式的类。JSON 转 C# 类转换通过分析 JSON 文档并生成具有正确类型属性、可空注解和序列化特性的对应 C# 类来弥合这一差距。',
    whatDesc2: '在典型的 ASP.NET Core 应用中，控制器接收 JSON 字符串格式的 HTTP 请求体。框架必须使用内置的 System.Text.Json 或 Newtonsoft.Json 库将 JSON 转换为 C# 对象。没有正确定义的类，C# JSON 反序列化操作会在运行时失败。JSON 转 C# 类转换器自动创建这些数据传输对象。',
    whatDesc3: '在 Unity 游戏开发中 JSON 配置定义关卡和物品数据，在 Blazor 应用中消费第三方 API，以及在 Azure Functions 中处理事件载荷时，同样需要这种转换。无论称之为 JSON 转 C# 类、JSON 转 POCO 还是从 JSON 生成 C# 类，底层过程都相同。',
    h2_typeMapping: 'JSON 到 C#：类型映射',
    typeMappingDesc: '理解 JSON 类型如何映射到 C# 类型是任何 JSON 转 C# 转换的基础：',
    typeMappingTable: '<table><thead><tr><th>JSON 类型</th><th>示例</th><th>C# 类型</th><th>说明</th></tr></thead><tbody><tr><td>string</td><td><code>"hello"</code></td><td><code>string</code></td><td>始终映射为 <code>System.String</code></td></tr><tr><td>number（整数）</td><td><code>42</code></td><td><code>int</code>、<code>long</code></td><td>超过 2^31-1 时使用 <code>long</code>；可空时使用 <code>int?</code></td></tr><tr><td>number（小数）</td><td><code>3.14</code></td><td><code>double</code>、<code>decimal</code></td><td>金融数据使用 <code>decimal</code></td></tr><tr><td>boolean</td><td><code>true</code></td><td><code>bool</code></td><td>可空时使用 <code>bool?</code></td></tr><tr><td>null</td><td><code>null</code></td><td><code>null</code></td><td>可空引用类型 <code>string?</code> 或可空值类型 <code>int?</code></td></tr><tr><td>array</td><td><code>[1, 2, 3]</code></td><td><code>List&lt;T&gt;</code>、<code>T[]</code></td><td>推荐使用 <code>List&lt;T&gt;</code></td></tr><tr><td>object</td><td><code>{"k": "v"}</code></td><td>嵌套类或 <code>Dictionary</code></td><td>优先使用强类型嵌套类</td></tr></tbody></table>',
    typeMappingExtra: '在从 JSON 生成 C# 类时，选择值类型（<code>int</code>、<code>bool</code>）还是可空类型（<code>int?</code>、<code>bool?</code>）很重要。启用可空引用类型后，JSON 中可能缺失的属性应声明为可空。货币值始终使用 <code>decimal</code> 而非 <code>double</code>。',
    h2_howWorks: 'JSON 转 C# 转换的工作原理',
    howWorksDesc: 'JSON 转 C# 类转换器遵循系统化流程将原始 JSON 转换为可编译的 C# 源代码：',
    howWorksSteps: '<ol><li><strong>解析 JSON 结构</strong>：转换器对输入 JSON 进行词法分析，构建对象、数组和基本类型的抽象语法树。</li><li><strong>推断属性类型</strong>：对每个键值对确定 C# 类型。</li><li><strong>生成类名和属性名</strong>：将 JSON 键名转换为 PascalCase 属性名。</li><li><strong>处理嵌套对象</strong>：每个嵌套 JSON 对象生成一个单独的 C# 类。</li><li><strong>处理数组</strong>：分析数组元素确定元素类型。</li><li><strong>添加序列化特性</strong>：当 JSON 键不符合 C# 命名规范时添加 <code>[JsonPropertyName]</code> 或 <code>[JsonProperty]</code>。</li><li><strong>输出源代码</strong>：生成格式化的 C# 源代码。</li></ol>',
    h2_codeExamples: '代码示例：使用 System.Text.Json 和 Newtonsoft 实现 JSON 转 C#',
    codeSTJTitle: 'System.Text.Json（.NET 8+）：JsonSerializer 和特性',
    codeSTJDesc: 'System.Text.Json 是 .NET 内置的高性能 JSON 序列化器。从 .NET 8 开始支持源生成器和 AOT 编译。以下是使用 <code>JsonSerializer</code>、<code>[JsonPropertyName]</code> 和自定义转换器的完整示例：',
    codeNewtonsoftTitle: 'Newtonsoft.Json：JsonConvert 和特性',
    codeNewtonsoftDesc: 'Newtonsoft.Json 是 C# JSON 反序列化的事实标准库，提供丰富功能包括 <code>JObject</code> 动态解析、LINQ-to-JSON 和自定义 <code>JsonConverter</code>：',
    codeRecordsTitle: 'C# Records：不可变数据模型',
    codeRecordsDesc: 'C# 9+ 的 record 提供了简洁的方式定义不可变数据模型。Records 自动生成 <code>Equals</code>、<code>GetHashCode</code>、<code>ToString</code>，并支持 <code>with</code> 表达式：',
    codeManualTitle: '手动 POCO：带属性的类',
    codeManualDesc: '当需要完全控制 JSON 转 C# 类时，传统 POCO 配合 <code>INotifyPropertyChanged</code> 或 AutoMapper 提供最大灵活性：',
    h2_nested: '处理嵌套 JSON 结构',
    nestedDesc1: '实际 API 很少返回扁平 JSON。大多数响应包含深度嵌套对象、对象数组和多态类型。将这些复杂结构转换为 C# 类需要仔细设计：',
    nestedDesc2: '<strong>深度嵌套对象</strong>：每层嵌套生成一个单独的 C# 类。可以使用嵌套类、独立文件或在同一文件中定义的 records。',
    nestedDesc3: '<strong>对象数组</strong>：<code>"items": [{"id": 1}]</code> 映射为 <code>List&lt;Item&gt;</code>。不可变集合使用 <code>IReadOnlyList&lt;Item&gt;</code>。',
    nestedDesc4: '<strong>多态反序列化</strong>：.NET 7+ 支持 <code>[JsonDerivedType]</code> 和 <code>[JsonPolymorphic]</code> 特性进行类型安全的反序列化。',
    h2_advanced: '高级模式：源生成器、AOT 和可空引用类型',
    advancedDesc1: '.NET 8 的 System.Text.Json 源生成器在编译时生成序列化代码，消除反射并支持 Native AOT 部署：',
    advancedDesc2: 'C# 8+ 的<strong>可空引用类型</strong>为 JSON 转 C# 类定义提供编译时空安全。配合 C# 11+ 的 <code>required</code> 属性，可以强制要求必需的 JSON 字段始终存在：',
    advancedDesc3: '<strong>System.Text.Json vs Newtonsoft.Json</strong>：System.Text.Json 在大多数工作负载上快 2-5 倍，内存占用更低，支持源生成器。Newtonsoft 提供更丰富的功能。新 .NET 8+ 项目推荐 System.Text.Json。',
    h2_bestPractices: 'JSON 转 C# 转换最佳实践',
    bestPracticesDesc: '将 JSON 转换为 C# 类时，遵循以下最佳实践构建健壮的 .NET 应用：',
    bp1: '<strong>使用 PascalCase 属性配合序列化特性</strong>：C# 属性使用 PascalCase，用 <code>[JsonPropertyName]</code> 映射 JSON 键。',
    bp2: '<strong>启用可空引用类型</strong>：添加 <code>#nullable enable</code>，将可选 JSON 属性标记为可空。',
    bp3: '<strong>优雅处理未知属性</strong>：System.Text.Json 默认忽略未知属性。Newtonsoft 默认抛出异常，需配置 <code>MissingMemberHandling.Ignore</code>。',
    bp4: '<strong>货币值使用 decimal</strong>：绝不使用 <code>float</code> 或 <code>double</code> 表示金额。',
    bp5: '<strong>DTO 优先使用 records</strong>：使用 C# records 配合 init-only 属性定义数据传输对象。',
    bp6: '<strong>使用源生成器提升性能</strong>：在 .NET 8+ 项目中使用 <code>[JsonSerializable]</code> 消除反射开销。',
    bp7: '<strong>验证反序列化数据</strong>：应用数据注解或 FluentValidation 规则验证反序列化对象。',
    relatedTools: '相关工具推荐：<strong>JSON 转 Java</strong> 用于 Spring Boot 开发，<strong>JSON 转 TypeScript</strong> 用于前端接口，<strong>JSON 转 Kotlin</strong> 用于 Kotlin 项目。',
    h2_faq: '常见问题',
    faq1_q: 'System.Text.Json 和 Newtonsoft.Json 哪个更适合 JSON 转 C#？',
    faq1_a: '新 .NET 8+ 项目推荐 System.Text.Json。它内置于框架中，性能提升 2-5 倍，内存占用更低，支持 AOT 源生成器。Newtonsoft 适用于遗留项目和需要 JObject 动态解析的复杂场景。两者都支持 records、自定义转换器和可空引用类型。',
    faq2_q: '应该使用 C# records 还是传统类进行 JSON 反序列化？',
    faq2_a: '需要不可变 DTO 时使用 records（C# 9+）。Records 自动生成 Equals、GetHashCode、ToString，支持 with 表达式。需要可变性、INotifyPropertyChanged 或 EF Core 实体时使用传统类。ASP.NET Core API DTO 推荐使用 records。',
    faq3_q: '如何处理 C# 类中没有的未知 JSON 属性？',
    faq3_a: 'System.Text.Json 默认忽略未知属性。要捕获未知字段，添加 [JsonExtensionData] 标注的 Dictionary。Newtonsoft 默认抛出异常，需设置 MissingMemberHandling.Ignore。',
    conclusion: '将 JSON 转换为 C# 类是每个 .NET 开发者的基本技能。使用我们的免费在线 JSON 转 C# 类转换器即时生成代码，参考本指南了解最佳实践。',
    linkToolBottom: '使用我们的免费在线工具即时将 JSON 转换为 C# 类。',
  },
  fr: {
    intro: 'La conversion de <strong>JSON en classes C#</strong> est une tache essentielle dans le developpement .NET moderne. Que vous construisiez une API ASP.NET Core, un jeu Unity, une application Blazor ou un client MAUI, vous avez besoin de classes C# fortement typees pour deserialiser les reponses JSON. Ce guide couvre le mapping des types, System.Text.Json, Newtonsoft.Json, les records, la generation POCO et les bonnes pratiques.',
    linkTool: 'Essayez notre convertisseur gratuit JSON vers C# en ligne.',
    h2_what: 'Qu\'est-ce que la conversion JSON vers C# ?',
    whatDesc1: 'JSON est le format d\'echange de donnees universel pour les API web et les services cloud. C# etant un langage a typage statique, il necessite des definitions de classes explicites. La conversion JSON vers C# analyse un document JSON et produit les classes C# correspondantes avec des proprietes typees et des annotations de serialisation.',
    whatDesc2: 'Dans une application ASP.NET Core typique, un controleur recoit un corps de requete HTTP en JSON. Le framework doit convertir ce JSON en objets C# a l\'aide de System.Text.Json ou Newtonsoft.Json. Un convertisseur JSON vers C# automatise la creation de ces objets de transfert de donnees.',
    whatDesc3: 'La meme conversion est essentielle dans Unity, Blazor et Azure Functions. Le processus est identique : inspecter la structure JSON, determiner les types, gerer l\'imbrication et les tableaux.',
    h2_typeMapping: 'JSON vers C# : Mapping des types',
    typeMappingDesc: 'Comprendre comment les types JSON correspondent aux types C# est la base de toute conversion :',
    typeMappingTable: '<table><thead><tr><th>Type JSON</th><th>Exemple</th><th>Type(s) C#</th><th>Notes</th></tr></thead><tbody><tr><td>string</td><td><code>"hello"</code></td><td><code>string</code></td><td>Toujours <code>System.String</code></td></tr><tr><td>number (entier)</td><td><code>42</code></td><td><code>int</code>, <code>long</code></td><td><code>int?</code> si nullable</td></tr><tr><td>number (decimal)</td><td><code>3.14</code></td><td><code>double</code>, <code>decimal</code></td><td><code>decimal</code> pour les donnees financieres</td></tr><tr><td>boolean</td><td><code>true</code></td><td><code>bool</code></td><td><code>bool?</code> si nullable</td></tr><tr><td>null</td><td><code>null</code></td><td><code>null</code></td><td>Types nullable</td></tr><tr><td>array</td><td><code>[1,2]</code></td><td><code>List&lt;T&gt;</code></td><td><code>List</code> prefere</td></tr><tr><td>object</td><td><code>{"k":"v"}</code></td><td>Classe imbriquee</td><td>Classes typees preferees</td></tr></tbody></table>',
    typeMappingExtra: 'Lors de la generation de classes C# a partir de JSON, le choix entre types valeur et types nullable est important. Pour les valeurs monetaires, utilisez toujours <code>decimal</code>.',
    h2_howWorks: 'Comment fonctionne la conversion JSON vers C#',
    howWorksDesc: 'Un convertisseur JSON vers C# suit un processus systematique :',
    howWorksSteps: '<ol><li><strong>Analyser la structure JSON</strong> : Construction d\'un arbre syntaxique.</li><li><strong>Inferer les types</strong> : Determination du type C# pour chaque propriete.</li><li><strong>Generer les noms</strong> : Conversion en PascalCase.</li><li><strong>Gerer les objets imbriques</strong> : Chaque objet imbrique genere une classe separee.</li><li><strong>Gerer les tableaux</strong> : Analyse du type d\'element.</li><li><strong>Ajouter les attributs</strong> : <code>[JsonPropertyName]</code> ou <code>[JsonProperty]</code>.</li><li><strong>Produire le code source</strong> : Code C# formate.</li></ol>',
    h2_codeExamples: 'Exemples de code : JSON vers C# avec System.Text.Json et Newtonsoft',
    codeSTJTitle: 'System.Text.Json (.NET 8+) : JsonSerializer et attributs',
    codeSTJDesc: 'System.Text.Json est le serialiseur JSON haute performance integre a .NET. Depuis .NET 8, il supporte les generateurs de source pour la compilation AOT :',
    codeNewtonsoftTitle: 'Newtonsoft.Json : JsonConvert et attributs',
    codeNewtonsoftDesc: 'Newtonsoft.Json est le standard de fait pour la deserialisation JSON en C# avec JObject, LINQ-to-JSON et JsonConverter personnalise :',
    codeRecordsTitle: 'Records C# : Modeles de donnees immuables',
    codeRecordsDesc: 'Les records C# 9+ offrent une facon concise de definir des modeles immuables avec Equals, GetHashCode et expressions with :',
    codeManualTitle: 'POCO manuel : Classe avec proprietes',
    codeManualDesc: 'Pour un controle total, un POCO traditionnel avec INotifyPropertyChanged ou AutoMapper offre une flexibilite maximale :',
    h2_nested: 'Travailler avec des structures JSON imbriquees',
    nestedDesc1: 'Les API reelles contiennent des objets profondement imbriques et des types polymorphes :',
    nestedDesc2: '<strong>Objets imbriques</strong> : Chaque niveau d\'imbrication produit une classe C# separee.',
    nestedDesc3: '<strong>Tableaux d\'objets</strong> : <code>"items": [{"id": 1}]</code> correspond a <code>List&lt;Item&gt;</code>.',
    nestedDesc4: '<strong>Deserialisation polymorphe</strong> : .NET 7+ supporte <code>[JsonDerivedType]</code> et <code>[JsonPolymorphic]</code>.',
    h2_advanced: 'Patterns avances : Generateurs de source, AOT et types nullable',
    advancedDesc1: 'Les generateurs de source .NET 8 pour System.Text.Json produisent du code de serialisation a la compilation, eliminant la reflexion et permettant le deploiement AOT natif :',
    advancedDesc2: 'Les <strong>types reference nullable</strong> C# 8+ fournissent la securite null a la compilation. Combinez avec les proprietes <code>required</code> (C# 11+) :',
    advancedDesc3: '<strong>System.Text.Json vs Newtonsoft</strong> : System.Text.Json est 2-5x plus rapide, utilise moins de memoire et supporte les generateurs de source. Newtonsoft offre plus de fonctionnalites.',
    h2_bestPractices: 'Bonnes pratiques pour la conversion JSON vers C#',
    bestPracticesDesc: 'Suivez ces bonnes pratiques pour des applications .NET robustes :',
    bp1: '<strong>Proprietes PascalCase avec attributs</strong> : Utilisez <code>[JsonPropertyName]</code> pour mapper les cles JSON.',
    bp2: '<strong>Activez les types nullable</strong> : <code>#nullable enable</code> pour la securite null a la compilation.',
    bp3: '<strong>Gerez les proprietes inconnues</strong> : System.Text.Json les ignore par defaut. Configurez Newtonsoft avec <code>MissingMemberHandling.Ignore</code>.',
    bp4: '<strong>Decimal pour les valeurs monetaires</strong> : N\'utilisez jamais <code>float</code> ou <code>double</code> pour l\'argent.',
    bp5: '<strong>Preferez les records pour les DTO</strong> : Records avec proprietes init-only pour l\'immutabilite.',
    bp6: '<strong>Generateurs de source pour la performance</strong> : <code>[JsonSerializable]</code> dans .NET 8+.',
    bp7: '<strong>Validez les donnees deserialisees</strong> : Annotations de donnees ou FluentValidation.',
    relatedTools: 'Outils connexes : <strong>JSON vers Java</strong>, <strong>JSON vers TypeScript</strong>, <strong>JSON vers Kotlin</strong>.',
    h2_faq: 'Questions frequemment posees',
    faq1_q: 'System.Text.Json ou Newtonsoft : lequel utiliser ?',
    faq1_a: 'System.Text.Json est recommande pour les nouveaux projets .NET 8+. Il est integre, 2-5x plus rapide et supporte les generateurs de source AOT. Newtonsoft reste utile pour les projets existants et les scenarios complexes avec JObject.',
    faq2_q: 'Records C# ou classes traditionnelles ?',
    faq2_a: 'Utilisez les records pour les DTO immuables (C# 9+). Utilisez les classes pour la mutabilite ou INotifyPropertyChanged. Pour ASP.NET Core, les records sont la pratique moderne.',
    faq3_q: 'Comment gerer les proprietes JSON inconnues ?',
    faq3_a: 'System.Text.Json les ignore par defaut. Pour les capturer, utilisez [JsonExtensionData]. Newtonsoft leve une exception par defaut, configurez MissingMemberHandling.Ignore.',
    conclusion: 'La conversion JSON vers C# est une competence fondamentale. Utilisez notre outil gratuit pour une generation instantanee.',
    linkToolBottom: 'Convertissez JSON en classes C# instantanement avec notre outil gratuit.',
  },
  de: {
    intro: 'Die Konvertierung von <strong>JSON in C#</strong>-Klassen ist eine wesentliche Aufgabe in der modernen .NET-Entwicklung. Ob Sie eine ASP.NET Core Web-API, ein Unity-Spiel, eine Blazor-App oder einen MAUI-Client erstellen, Sie benotigen stark typisierte C#-Klassen zur Deserialisierung von JSON-Antworten. Dieser Leitfaden behandelt Typ-Mapping, System.Text.Json, Newtonsoft.Json, Records, POCO-Generierung und Best Practices.',
    linkTool: 'Testen Sie unseren kostenlosen Online JSON-zu-C#-Konverter.',
    h2_what: 'Was ist JSON-zu-C#-Klassenkonvertierung?',
    whatDesc1: 'JSON ist das universelle Datenaustauschformat fur Web-APIs und Cloud-Dienste. C# als statisch typisierte Sprache erfordert explizite Klassendefinitionen. Die JSON-zu-C#-Konvertierung analysiert ein JSON-Dokument und erzeugt entsprechende C#-Klassen mit typisierten Eigenschaften und Serialisierungsattributen.',
    whatDesc2: 'In einer typischen ASP.NET Core-Anwendung empfangt ein Controller den HTTP-Request-Body als JSON-String. Das Framework muss dieses JSON mit System.Text.Json oder Newtonsoft.Json in C#-Objekte konvertieren. Ein JSON-zu-C#-Konverter automatisiert die Erstellung dieser Datenobjekte.',
    whatDesc3: 'Die gleiche Konvertierung ist in Unity, Blazor und Azure Functions wesentlich. Der Prozess ist identisch: JSON-Struktur inspizieren, Typen bestimmen, Verschachtelung und Arrays behandeln.',
    h2_typeMapping: 'JSON zu C#: Typ-Mapping',
    typeMappingDesc: 'Das Verstandnis der Zuordnung von JSON-Typen zu C#-Typen ist die Grundlage jeder Konvertierung:',
    typeMappingTable: '<table><thead><tr><th>JSON-Typ</th><th>Beispiel</th><th>C#-Typ(en)</th><th>Hinweise</th></tr></thead><tbody><tr><td>string</td><td><code>"hello"</code></td><td><code>string</code></td><td>Immer <code>System.String</code></td></tr><tr><td>number (ganzzahlig)</td><td><code>42</code></td><td><code>int</code>, <code>long</code></td><td><code>int?</code> wenn nullable</td></tr><tr><td>number (dezimal)</td><td><code>3.14</code></td><td><code>double</code>, <code>decimal</code></td><td><code>decimal</code> fur Finanzdaten</td></tr><tr><td>boolean</td><td><code>true</code></td><td><code>bool</code></td><td><code>bool?</code> wenn nullable</td></tr><tr><td>null</td><td><code>null</code></td><td><code>null</code></td><td>Nullable-Typen</td></tr><tr><td>array</td><td><code>[1,2]</code></td><td><code>List&lt;T&gt;</code></td><td><code>List</code> bevorzugt</td></tr><tr><td>object</td><td><code>{"k":"v"}</code></td><td>Verschachtelte Klasse</td><td>Stark typisierte Klassen bevorzugt</td></tr></tbody></table>',
    typeMappingExtra: 'Bei der Generierung von C#-Klassen aus JSON ist die Wahl zwischen Werttypen und Nullable-Typen wichtig. Fur Geldwerte immer <code>decimal</code> verwenden.',
    h2_howWorks: 'Wie die JSON-zu-C#-Konvertierung funktioniert',
    howWorksDesc: 'Ein JSON-zu-C#-Konverter folgt einem systematischen Prozess:',
    howWorksSteps: '<ol><li><strong>JSON-Struktur parsen</strong>: Aufbau eines Syntaxbaums.</li><li><strong>Eigenschaftstypen ableiten</strong>: C#-Typ fur jede Eigenschaft bestimmen.</li><li><strong>Namen generieren</strong>: Konvertierung in PascalCase.</li><li><strong>Verschachtelte Objekte behandeln</strong>: Jedes verschachtelte Objekt erzeugt eine separate Klasse.</li><li><strong>Arrays behandeln</strong>: Elementtyp-Analyse.</li><li><strong>Attribute hinzufugen</strong>: <code>[JsonPropertyName]</code> oder <code>[JsonProperty]</code>.</li><li><strong>Quellcode ausgeben</strong>: Formatierter C#-Code.</li></ol>',
    h2_codeExamples: 'Codebeispiele: JSON zu C# mit System.Text.Json und Newtonsoft',
    codeSTJTitle: 'System.Text.Json (.NET 8+): JsonSerializer und Attribute',
    codeSTJDesc: 'System.Text.Json ist der integrierte Hochleistungs-JSON-Serialisierer in .NET. Ab .NET 8 mit Quellgeneratoren fur AOT-Kompilierung:',
    codeNewtonsoftTitle: 'Newtonsoft.Json: JsonConvert und Attribute',
    codeNewtonsoftDesc: 'Newtonsoft.Json ist der De-facto-Standard fur C# JSON-Deserialisierung mit JObject, LINQ-to-JSON und benutzerdefinierten JsonConverter:',
    codeRecordsTitle: 'C# Records: Unveranderliche Datenmodelle',
    codeRecordsDesc: 'C# 9+ Records bieten eine kompakte Art, unveranderliche Datenmodelle zu definieren mit Equals, GetHashCode und with-Ausdrucken:',
    codeManualTitle: 'Manuelles POCO: Klasse mit Eigenschaften',
    codeManualDesc: 'Fur volle Kontrolle bietet ein traditionelles POCO mit INotifyPropertyChanged oder AutoMapper maximale Flexibilitat:',
    h2_nested: 'Arbeiten mit verschachtelten JSON-Strukturen',
    nestedDesc1: 'Reale APIs enthalten tief verschachtelte Objekte und polymorphe Typen:',
    nestedDesc2: '<strong>Verschachtelte Objekte</strong>: Jede Verschachtelungsebene erzeugt eine separate C#-Klasse.',
    nestedDesc3: '<strong>Objekt-Arrays</strong>: <code>"items": [{"id": 1}]</code> wird zu <code>List&lt;Item&gt;</code>.',
    nestedDesc4: '<strong>Polymorphe Deserialisierung</strong>: .NET 7+ unterstutzt <code>[JsonDerivedType]</code> und <code>[JsonPolymorphic]</code>.',
    h2_advanced: 'Fortgeschrittene Muster: Quellgeneratoren, AOT und Nullable-Typen',
    advancedDesc1: '.NET 8 Quellgeneratoren fur System.Text.Json erzeugen Serialisierungscode zur Kompilierzeit und ermoglichen Native-AOT-Bereitstellung:',
    advancedDesc2: '<strong>Nullable-Referenztypen</strong> in C# 8+ bieten Kompilierzeit-Null-Sicherheit. Kombiniert mit <code>required</code>-Eigenschaften (C# 11+):',
    advancedDesc3: '<strong>System.Text.Json vs Newtonsoft</strong>: System.Text.Json ist 2-5x schneller, braucht weniger Speicher und unterstutzt Quellgeneratoren. Newtonsoft bietet mehr Funktionen.',
    h2_bestPractices: 'Best Practices fur JSON-zu-C#-Konvertierung',
    bestPracticesDesc: 'Befolgen Sie diese Best Practices fur robuste .NET-Anwendungen:',
    bp1: '<strong>PascalCase-Eigenschaften mit Attributen</strong>: <code>[JsonPropertyName]</code> fur JSON-Key-Mapping.',
    bp2: '<strong>Nullable-Typen aktivieren</strong>: <code>#nullable enable</code> fur Kompilierzeit-Null-Sicherheit.',
    bp3: '<strong>Unbekannte Eigenschaften behandeln</strong>: System.Text.Json ignoriert sie standardmassig. Newtonsoft mit <code>MissingMemberHandling.Ignore</code> konfigurieren.',
    bp4: '<strong>Decimal fur Geldwerte</strong>: Niemals <code>float</code> oder <code>double</code> fur Geld.',
    bp5: '<strong>Records fur DTOs bevorzugen</strong>: Records mit init-only-Eigenschaften fur Unveranderlichkeit.',
    bp6: '<strong>Quellgeneratoren fur Performance</strong>: <code>[JsonSerializable]</code> in .NET 8+.',
    bp7: '<strong>Deserialisierte Daten validieren</strong>: Datenannnotationen oder FluentValidation.',
    relatedTools: 'Verwandte Tools: <strong>JSON zu Java</strong>, <strong>JSON zu TypeScript</strong>, <strong>JSON zu Kotlin</strong>.',
    h2_faq: 'Haufig gestellte Fragen',
    faq1_q: 'System.Text.Json oder Newtonsoft: Welches soll ich verwenden?',
    faq1_a: 'System.Text.Json wird fur neue .NET 8+-Projekte empfohlen. Es ist integriert, 2-5x schneller und unterstutzt AOT-Quellgeneratoren. Newtonsoft bleibt nutzlich fur bestehende Projekte und komplexe JObject-Szenarien.',
    faq2_q: 'C# Records oder traditionelle Klassen?',
    faq2_a: 'Records fur unveranderliche DTOs (C# 9+). Klassen fur Veranderlichkeit oder INotifyPropertyChanged. Fur ASP.NET Core sind Records die moderne Best Practice.',
    faq3_q: 'Wie gehe ich mit unbekannten JSON-Eigenschaften um?',
    faq3_a: 'System.Text.Json ignoriert sie standardmassig. Zum Auffangen verwenden Sie [JsonExtensionData]. Newtonsoft wirft standardmassig, konfigurieren Sie MissingMemberHandling.Ignore.',
    conclusion: 'Die Konvertierung von JSON zu C# ist eine grundlegende Fahigkeit. Nutzen Sie unser kostenloses Tool fur sofortige Generierung.',
    linkToolBottom: 'Konvertieren Sie JSON sofort in C#-Klassen mit unserem kostenlosen Tool.',
  },
  es: {
    intro: 'Convertir <strong>JSON a clases C#</strong> es una tarea esencial en el desarrollo .NET moderno. Ya sea que construyas una API ASP.NET Core, un juego Unity, una app Blazor o un cliente MAUI, necesitas clases C# fuertemente tipadas para deserializar respuestas JSON. Esta guia cubre mapeo de tipos, System.Text.Json, Newtonsoft.Json, records, generacion POCO y mejores practicas.',
    linkTool: 'Prueba nuestro convertidor gratuito de JSON a C# en linea.',
    h2_what: 'Que es la conversion de JSON a clase C#?',
    whatDesc1: 'JSON es el formato universal de intercambio de datos para APIs web y servicios en la nube. C# es un lenguaje de tipado estatico que requiere definiciones de clases explicitas. La conversion de JSON a C# analiza un documento JSON y produce clases C# con propiedades tipadas y atributos de serializacion.',
    whatDesc2: 'En una aplicacion ASP.NET Core tipica, un controlador recibe el cuerpo de solicitud HTTP como cadena JSON. El framework debe convertir ese JSON en objetos C# usando System.Text.Json o Newtonsoft.Json. Un convertidor JSON a C# automatiza la creacion de estos objetos de transferencia de datos.',
    whatDesc3: 'La misma conversion es esencial en Unity, Blazor y Azure Functions. El proceso es identico: inspeccionar la estructura JSON, determinar tipos, manejar anidamiento y arrays.',
    h2_typeMapping: 'JSON a C#: Mapeo de tipos',
    typeMappingDesc: 'Entender como los tipos JSON se mapean a tipos C# es la base de cualquier conversion:',
    typeMappingTable: '<table><thead><tr><th>Tipo JSON</th><th>Ejemplo</th><th>Tipo(s) C#</th><th>Notas</th></tr></thead><tbody><tr><td>string</td><td><code>"hello"</code></td><td><code>string</code></td><td>Siempre <code>System.String</code></td></tr><tr><td>number (entero)</td><td><code>42</code></td><td><code>int</code>, <code>long</code></td><td><code>int?</code> si nullable</td></tr><tr><td>number (decimal)</td><td><code>3.14</code></td><td><code>double</code>, <code>decimal</code></td><td><code>decimal</code> para datos financieros</td></tr><tr><td>boolean</td><td><code>true</code></td><td><code>bool</code></td><td><code>bool?</code> si nullable</td></tr><tr><td>null</td><td><code>null</code></td><td><code>null</code></td><td>Tipos nullable</td></tr><tr><td>array</td><td><code>[1,2]</code></td><td><code>List&lt;T&gt;</code></td><td><code>List</code> preferido</td></tr><tr><td>object</td><td><code>{"k":"v"}</code></td><td>Clase anidada</td><td>Clases tipadas preferidas</td></tr></tbody></table>',
    typeMappingExtra: 'Al generar clases C# desde JSON, la eleccion entre tipos valor y tipos nullable es importante. Para valores monetarios, usa siempre <code>decimal</code>.',
    h2_howWorks: 'Como funciona la conversion JSON a C#',
    howWorksDesc: 'Un convertidor JSON a C# sigue un proceso sistematico:',
    howWorksSteps: '<ol><li><strong>Analizar la estructura JSON</strong>: Construccion de un arbol sintactico.</li><li><strong>Inferir tipos de propiedad</strong>: Determinar el tipo C# para cada propiedad.</li><li><strong>Generar nombres</strong>: Conversion a PascalCase.</li><li><strong>Manejar objetos anidados</strong>: Cada objeto anidado genera una clase separada.</li><li><strong>Manejar arrays</strong>: Analisis del tipo de elemento.</li><li><strong>Agregar atributos</strong>: <code>[JsonPropertyName]</code> o <code>[JsonProperty]</code>.</li><li><strong>Producir codigo fuente</strong>: Codigo C# formateado.</li></ol>',
    h2_codeExamples: 'Ejemplos de codigo: JSON a C# con System.Text.Json y Newtonsoft',
    codeSTJTitle: 'System.Text.Json (.NET 8+): JsonSerializer y atributos',
    codeSTJDesc: 'System.Text.Json es el serializador JSON de alto rendimiento integrado en .NET. Desde .NET 8 con generadores de codigo fuente para compilacion AOT:',
    codeNewtonsoftTitle: 'Newtonsoft.Json: JsonConvert y atributos',
    codeNewtonsoftDesc: 'Newtonsoft.Json es el estandar de facto para deserializacion JSON en C# con JObject, LINQ-to-JSON y JsonConverter personalizado:',
    codeRecordsTitle: 'Records C#: Modelos de datos inmutables',
    codeRecordsDesc: 'Los records C# 9+ ofrecen una forma concisa de definir modelos inmutables con Equals, GetHashCode y expresiones with:',
    codeManualTitle: 'POCO manual: Clase con propiedades',
    codeManualDesc: 'Para control total, un POCO tradicional con INotifyPropertyChanged o AutoMapper ofrece maxima flexibilidad:',
    h2_nested: 'Trabajar con estructuras JSON anidadas',
    nestedDesc1: 'Las APIs reales contienen objetos profundamente anidados y tipos polimorficos:',
    nestedDesc2: '<strong>Objetos anidados</strong>: Cada nivel de anidamiento produce una clase C# separada.',
    nestedDesc3: '<strong>Arrays de objetos</strong>: <code>"items": [{"id": 1}]</code> se mapea a <code>List&lt;Item&gt;</code>.',
    nestedDesc4: '<strong>Deserializacion polimorfica</strong>: .NET 7+ soporta <code>[JsonDerivedType]</code> y <code>[JsonPolymorphic]</code>.',
    h2_advanced: 'Patrones avanzados: Generadores de codigo, AOT y tipos nullable',
    advancedDesc1: 'Los generadores de codigo .NET 8 para System.Text.Json producen codigo de serializacion en tiempo de compilacion, eliminando reflexion y habilitando despliegue AOT nativo:',
    advancedDesc2: 'Los <strong>tipos referencia nullable</strong> C# 8+ proporcionan seguridad null en tiempo de compilacion. Combinados con propiedades <code>required</code> (C# 11+):',
    advancedDesc3: '<strong>System.Text.Json vs Newtonsoft</strong>: System.Text.Json es 2-5x mas rapido, usa menos memoria y soporta generadores de codigo. Newtonsoft ofrece mas funcionalidades.',
    h2_bestPractices: 'Mejores practicas para conversion JSON a C#',
    bestPracticesDesc: 'Sigue estas mejores practicas para aplicaciones .NET robustas:',
    bp1: '<strong>Propiedades PascalCase con atributos</strong>: <code>[JsonPropertyName]</code> para mapear claves JSON.',
    bp2: '<strong>Activar tipos nullable</strong>: <code>#nullable enable</code> para seguridad null en compilacion.',
    bp3: '<strong>Manejar propiedades desconocidas</strong>: System.Text.Json las ignora por defecto. Configurar Newtonsoft con <code>MissingMemberHandling.Ignore</code>.',
    bp4: '<strong>Decimal para valores monetarios</strong>: Nunca usar <code>float</code> o <code>double</code> para dinero.',
    bp5: '<strong>Preferir records para DTOs</strong>: Records con propiedades init-only para inmutabilidad.',
    bp6: '<strong>Generadores de codigo para rendimiento</strong>: <code>[JsonSerializable]</code> en .NET 8+.',
    bp7: '<strong>Validar datos deserializados</strong>: Anotaciones de datos o FluentValidation.',
    relatedTools: 'Herramientas relacionadas: <strong>JSON a Java</strong>, <strong>JSON a TypeScript</strong>, <strong>JSON a Kotlin</strong>.',
    h2_faq: 'Preguntas frecuentes',
    faq1_q: 'System.Text.Json o Newtonsoft: cual debo usar?',
    faq1_a: 'System.Text.Json es recomendado para nuevos proyectos .NET 8+. Esta integrado, es 2-5x mas rapido y soporta generadores de codigo AOT. Newtonsoft sigue siendo util para proyectos existentes y escenarios complejos con JObject.',
    faq2_q: 'Records C# o clases tradicionales?',
    faq2_a: 'Records para DTOs inmutables (C# 9+). Clases para mutabilidad o INotifyPropertyChanged. Para ASP.NET Core, records son la practica moderna.',
    faq3_q: 'Como manejar propiedades JSON desconocidas?',
    faq3_a: 'System.Text.Json las ignora por defecto. Para capturarlas, usa [JsonExtensionData]. Newtonsoft lanza excepcion por defecto, configura MissingMemberHandling.Ignore.',
    conclusion: 'Convertir JSON a C# es una habilidad fundamental. Usa nuestra herramienta gratuita para generacion instantanea.',
    linkToolBottom: 'Convierte JSON a clases C# al instante con nuestra herramienta gratuita.',
  },
  ja: {
    intro: '<strong>JSONからC#</strong>クラスへの変換は、現代の.NET開発において不可欠なタスクです。ASP.NET Core Web API、Unityゲーム、Blazorアプリ、MAUIモバイルクライアントのいずれを構築する場合でも、JSONレスポンスをデシリアライズするために強く型付けされたC#クラスが必要です。このガイドでは、型マッピング、System.Text.Json、Newtonsoft.Json、record型、POCO生成、ベストプラクティスをカバーします。',
    linkTool: '無料オンラインJSON to C#クラスコンバーターをお試しください。',
    h2_what: 'JSON to C#クラス変換とは？',
    whatDesc1: 'JSONはWeb API、クラウドサービス、設定システムの共通データ交換フォーマットです。C#は静的型付け言語であり、明示的なクラス定義が必要です。JSON to C#クラス変換はJSONドキュメントを分析し、適切に型付けされたプロパティとシリアル化属性を持つ対応するC#クラスを生成します。',
    whatDesc2: '典型的なASP.NET Coreアプリケーションでは、コントローラーがJSON文字列としてHTTPリクエストボディを受信します。フレームワークはSystem.Text.JsonまたはNewtonsoft.Jsonを使用してJSONをC#オブジェクトに変換する必要があります。',
    whatDesc3: 'Unity、Blazor、Azure Functionsでも同じ変換が必要です。プロセスは同一です：JSON構造の検査、型決定、ネストと配列の処理。',
    h2_typeMapping: 'JSON to C#：型マッピング',
    typeMappingDesc: 'JSONの型がC#の型にどのようにマッピングされるかを理解することが変換の基盤です：',
    typeMappingTable: '<table><thead><tr><th>JSON型</th><th>例</th><th>C#型</th><th>備考</th></tr></thead><tbody><tr><td>string</td><td><code>"hello"</code></td><td><code>string</code></td><td>常に<code>System.String</code></td></tr><tr><td>number（整数）</td><td><code>42</code></td><td><code>int</code>、<code>long</code></td><td>null可能時は<code>int?</code></td></tr><tr><td>number（小数）</td><td><code>3.14</code></td><td><code>double</code>、<code>decimal</code></td><td>金融データには<code>decimal</code></td></tr><tr><td>boolean</td><td><code>true</code></td><td><code>bool</code></td><td>null可能時は<code>bool?</code></td></tr><tr><td>null</td><td><code>null</code></td><td><code>null</code></td><td>Nullable型</td></tr><tr><td>array</td><td><code>[1,2]</code></td><td><code>List&lt;T&gt;</code></td><td><code>List</code>推奨</td></tr><tr><td>object</td><td><code>{"k":"v"}</code></td><td>ネストクラス</td><td>強い型付けクラス推奨</td></tr></tbody></table>',
    typeMappingExtra: 'JSONからC#クラスを生成する際、値型とNullable型の選択が重要です。金額には常に<code>decimal</code>を使用してください。',
    h2_howWorks: 'JSON to C#変換の仕組み',
    howWorksDesc: 'JSON to C#クラスコンバーターは体系的なプロセスに従います：',
    howWorksSteps: '<ol><li><strong>JSON構造を解析</strong>：構文木を構築。</li><li><strong>プロパティ型を推論</strong>：各プロパティのC#型を決定。</li><li><strong>名前を生成</strong>：PascalCaseに変換。</li><li><strong>ネストオブジェクトを処理</strong>：各ネストオブジェクトが別クラスを生成。</li><li><strong>配列を処理</strong>：要素型を分析。</li><li><strong>属性を追加</strong>：<code>[JsonPropertyName]</code>または<code>[JsonProperty]</code>。</li><li><strong>ソースコードを出力</strong>：フォーマットされたC#コード。</li></ol>',
    h2_codeExamples: 'コード例：System.Text.JsonとNewtonsoftでJSON to C#',
    codeSTJTitle: 'System.Text.Json（.NET 8+）：JsonSerializerと属性',
    codeSTJDesc: 'System.Text.Jsonは.NET組み込みの高性能JSONシリアライザーです。.NET 8からAOTコンパイル用のソースジェネレーターをサポートします：',
    codeNewtonsoftTitle: 'Newtonsoft.Json：JsonConvertと属性',
    codeNewtonsoftDesc: 'Newtonsoft.JsonはC# JSONデシリアライゼーションの事実上の標準ライブラリです。JObject、LINQ-to-JSON、カスタムJsonConverterを提供します：',
    codeRecordsTitle: 'C# Records：不変データモデル',
    codeRecordsDesc: 'C# 9+ recordsは不変データモデルを簡潔に定義できます。Equals、GetHashCode、with式を自動生成します：',
    codeManualTitle: '手動POCO：プロパティ付きクラス',
    codeManualDesc: '完全なコントロールが必要な場合、従来のPOCOとINotifyPropertyChangedまたはAutoMapperが最大の柔軟性を提供します：',
    h2_nested: 'ネストされたJSON構造の操作',
    nestedDesc1: '実際のAPIは深くネストされたオブジェクトとポリモーフィック型を含みます：',
    nestedDesc2: '<strong>ネストオブジェクト</strong>：各ネストレベルが別のC#クラスを生成します。',
    nestedDesc3: '<strong>オブジェクト配列</strong>：<code>"items": [{"id": 1}]</code>はC#で<code>List&lt;Item&gt;</code>にマッピングされます。',
    nestedDesc4: '<strong>ポリモーフィックデシリアライゼーション</strong>：.NET 7+は<code>[JsonDerivedType]</code>と<code>[JsonPolymorphic]</code>をサポートします。',
    h2_advanced: '高度なパターン：ソースジェネレーター、AOT、Nullable参照型',
    advancedDesc1: '.NET 8のSystem.Text.Jsonソースジェネレーターはコンパイル時にシリアライゼーションコードを生成し、リフレクションを排除してNative AOTデプロイメントを可能にします：',
    advancedDesc2: 'C# 8+の<strong>Nullable参照型</strong>はコンパイル時のnull安全を提供します。C# 11+の<code>required</code>プロパティと組み合わせて使用：',
    advancedDesc3: '<strong>System.Text.Json vs Newtonsoft</strong>：System.Text.Jsonは2-5倍高速で、メモリ使用量が少なく、ソースジェネレーターをサポート。Newtonsoftはより多くの機能を提供します。',
    h2_bestPractices: 'JSON to C#変換のベストプラクティス',
    bestPracticesDesc: '堅牢な.NETアプリケーションを構築するためのベストプラクティス：',
    bp1: '<strong>PascalCaseプロパティと属性</strong>：<code>[JsonPropertyName]</code>でJSONキーをマッピング。',
    bp2: '<strong>Nullable型を有効化</strong>：<code>#nullable enable</code>でコンパイル時のnull安全。',
    bp3: '<strong>未知のプロパティを処理</strong>：System.Text.Jsonはデフォルトで無視。Newtonsoftは<code>MissingMemberHandling.Ignore</code>を設定。',
    bp4: '<strong>金額にはdecimal</strong>：金額に<code>float</code>や<code>double</code>を使用しない。',
    bp5: '<strong>DTOにはrecordsを優先</strong>：init-onlyプロパティ付きrecordsで不変性を実現。',
    bp6: '<strong>パフォーマンスにはソースジェネレーター</strong>：.NET 8+で<code>[JsonSerializable]</code>。',
    bp7: '<strong>デシリアライズデータを検証</strong>：データアノテーションまたはFluentValidation。',
    relatedTools: '関連ツール：<strong>JSON to Java</strong>、<strong>JSON to TypeScript</strong>、<strong>JSON to Kotlin</strong>。',
    h2_faq: 'よくある質問',
    faq1_q: 'System.Text.JsonとNewtonsoft：どちらを使うべき？',
    faq1_a: '新しい.NET 8+プロジェクトにはSystem.Text.Jsonが推奨です。フレームワーク組み込みで、2-5倍高速、AOTソースジェネレーターをサポート。Newtonsoftは既存プロジェクトやJObjectが必要な複雑なシナリオに有用です。',
    faq2_q: 'C# Recordsか従来のクラスか？',
    faq2_a: '不変DTOにはRecords（C# 9+）を使用。可変性やINotifyPropertyChangedが必要な場合はクラス。ASP.NET CoreではRecordsがモダンなベストプラクティスです。',
    faq3_q: '未知のJSONプロパティをどう処理する？',
    faq3_a: 'System.Text.Jsonはデフォルトで無視します。キャプチャするには[JsonExtensionData]を使用。Newtonsoftはデフォルトで例外を投げるので、MissingMemberHandling.Ignoreを設定してください。',
    conclusion: 'JSONからC#クラスへの変換はすべての.NET開発者の基本スキルです。無料オンラインツールで即座にコードを生成してください。',
    linkToolBottom: '無料オンラインツールでJSONをC#クラスに即座に変換。',
  },
  ko: {
    intro: '<strong>JSON을 C#</strong> 클래스로 변환하는 것은 현대 .NET 개발에서 필수적인 작업입니다. ASP.NET Core Web API, Unity 게임, Blazor 앱, MAUI 모바일 클라이언트 중 무엇을 구축하든 JSON 응답을 역직렬화하기 위해 강력한 타입의 C# 클래스가 필요합니다. 이 가이드는 타입 매핑, System.Text.Json, Newtonsoft.Json, record 타입, POCO 생성, 모범 사례를 다룹니다.',
    linkTool: '무료 온라인 JSON to C# 클래스 변환기를 사용해 보세요.',
    h2_what: 'JSON to C# 클래스 변환이란?',
    whatDesc1: 'JSON은 웹 API, 클라우드 서비스, 구성 시스템의 보편적인 데이터 교환 형식입니다. C#은 정적 타입 언어로 명시적 클래스 정의가 필요합니다. JSON to C# 클래스 변환은 JSON 문서를 분석하여 적절한 타입의 속성과 직렬화 특성을 가진 대응하는 C# 클래스를 생성합니다.',
    whatDesc2: '일반적인 ASP.NET Core 애플리케이션에서 컨트롤러는 JSON 문자열로 HTTP 요청 본문을 받습니다. 프레임워크는 System.Text.Json이나 Newtonsoft.Json을 사용하여 JSON을 C# 객체로 변환해야 합니다.',
    whatDesc3: 'Unity, Blazor, Azure Functions에서도 동일한 변환이 필요합니다. 프로세스는 동일합니다: JSON 구조 검사, 타입 결정, 중첩과 배열 처리.',
    h2_typeMapping: 'JSON to C#: 타입 매핑',
    typeMappingDesc: 'JSON 타입이 C# 타입에 어떻게 매핑되는지 이해하는 것이 변환의 기초입니다:',
    typeMappingTable: '<table><thead><tr><th>JSON 타입</th><th>예시</th><th>C# 타입</th><th>참고</th></tr></thead><tbody><tr><td>string</td><td><code>"hello"</code></td><td><code>string</code></td><td>항상 <code>System.String</code></td></tr><tr><td>number(정수)</td><td><code>42</code></td><td><code>int</code>, <code>long</code></td><td>null 가능시 <code>int?</code></td></tr><tr><td>number(소수)</td><td><code>3.14</code></td><td><code>double</code>, <code>decimal</code></td><td>금융 데이터에는 <code>decimal</code></td></tr><tr><td>boolean</td><td><code>true</code></td><td><code>bool</code></td><td>null 가능시 <code>bool?</code></td></tr><tr><td>null</td><td><code>null</code></td><td><code>null</code></td><td>Nullable 타입</td></tr><tr><td>array</td><td><code>[1,2]</code></td><td><code>List&lt;T&gt;</code></td><td><code>List</code> 권장</td></tr><tr><td>object</td><td><code>{"k":"v"}</code></td><td>중첩 클래스</td><td>강한 타입 클래스 권장</td></tr></tbody></table>',
    typeMappingExtra: 'JSON에서 C# 클래스를 생성할 때 값 타입과 Nullable 타입의 선택이 중요합니다. 금액에는 항상 <code>decimal</code>을 사용하세요.',
    h2_howWorks: 'JSON to C# 변환 작동 원리',
    howWorksDesc: 'JSON to C# 클래스 변환기는 체계적인 프로세스를 따릅니다:',
    howWorksSteps: '<ol><li><strong>JSON 구조 파싱</strong>: 구문 트리 구축.</li><li><strong>속성 타입 추론</strong>: 각 속성의 C# 타입 결정.</li><li><strong>이름 생성</strong>: PascalCase로 변환.</li><li><strong>중첩 객체 처리</strong>: 각 중첩 객체가 별도 클래스 생성.</li><li><strong>배열 처리</strong>: 요소 타입 분석.</li><li><strong>특성 추가</strong>: <code>[JsonPropertyName]</code> 또는 <code>[JsonProperty]</code>.</li><li><strong>소스 코드 출력</strong>: 포맷된 C# 코드.</li></ol>',
    h2_codeExamples: '코드 예제: System.Text.Json과 Newtonsoft로 JSON to C#',
    codeSTJTitle: 'System.Text.Json (.NET 8+): JsonSerializer와 특성',
    codeSTJDesc: 'System.Text.Json은 .NET 내장 고성능 JSON 시리얼라이저입니다. .NET 8부터 AOT 컴파일을 위한 소스 제너레이터를 지원합니다:',
    codeNewtonsoftTitle: 'Newtonsoft.Json: JsonConvert와 특성',
    codeNewtonsoftDesc: 'Newtonsoft.Json은 C# JSON 역직렬화의 사실상 표준 라이브러리입니다. JObject, LINQ-to-JSON, 커스텀 JsonConverter를 제공합니다:',
    codeRecordsTitle: 'C# Records: 불변 데이터 모델',
    codeRecordsDesc: 'C# 9+ records는 불변 데이터 모델을 간결하게 정의합니다. Equals, GetHashCode, with 표현식을 자동 생성합니다:',
    codeManualTitle: '수동 POCO: 속성이 있는 클래스',
    codeManualDesc: '완전한 제어가 필요할 때 전통적인 POCO와 INotifyPropertyChanged 또는 AutoMapper가 최대 유연성을 제공합니다:',
    h2_nested: '중첩 JSON 구조 작업',
    nestedDesc1: '실제 API는 깊게 중첩된 객체와 다형적 타입을 포함합니다:',
    nestedDesc2: '<strong>중첩 객체</strong>: 각 중첩 레벨이 별도의 C# 클래스를 생성합니다.',
    nestedDesc3: '<strong>객체 배열</strong>: <code>"items": [{"id": 1}]</code>은 C#에서 <code>List&lt;Item&gt;</code>으로 매핑됩니다.',
    nestedDesc4: '<strong>다형적 역직렬화</strong>: .NET 7+는 <code>[JsonDerivedType]</code>와 <code>[JsonPolymorphic]</code>를 지원합니다.',
    h2_advanced: '고급 패턴: 소스 제너레이터, AOT, Nullable 참조 타입',
    advancedDesc1: '.NET 8 System.Text.Json 소스 제너레이터는 컴파일 시간에 직렬화 코드를 생성하여 리플렉션을 제거하고 Native AOT 배포를 가능하게 합니다:',
    advancedDesc2: 'C# 8+의 <strong>Nullable 참조 타입</strong>은 컴파일 시간 null 안전성을 제공합니다. C# 11+의 <code>required</code> 속성과 결합:',
    advancedDesc3: '<strong>System.Text.Json vs Newtonsoft</strong>: System.Text.Json은 2-5배 빠르고, 메모리 사용량이 적으며, 소스 제너레이터를 지원합니다. Newtonsoft는 더 많은 기능을 제공합니다.',
    h2_bestPractices: 'JSON to C# 변환 모범 사례',
    bestPracticesDesc: '견고한 .NET 애플리케이션 구축을 위한 모범 사례:',
    bp1: '<strong>PascalCase 속성과 특성</strong>: <code>[JsonPropertyName]</code>으로 JSON 키 매핑.',
    bp2: '<strong>Nullable 타입 활성화</strong>: <code>#nullable enable</code>으로 컴파일 시간 null 안전.',
    bp3: '<strong>알 수 없는 속성 처리</strong>: System.Text.Json은 기본적으로 무시. Newtonsoft는 <code>MissingMemberHandling.Ignore</code> 설정.',
    bp4: '<strong>금액에는 decimal</strong>: 금액에 <code>float</code>이나 <code>double</code> 사용 금지.',
    bp5: '<strong>DTO에는 records 우선</strong>: init-only 속성의 records로 불변성.',
    bp6: '<strong>성능을 위한 소스 제너레이터</strong>: .NET 8+에서 <code>[JsonSerializable]</code>.',
    bp7: '<strong>역직렬화 데이터 검증</strong>: 데이터 어노테이션 또는 FluentValidation.',
    relatedTools: '관련 도구: <strong>JSON to Java</strong>, <strong>JSON to TypeScript</strong>, <strong>JSON to Kotlin</strong>.',
    h2_faq: '자주 묻는 질문',
    faq1_q: 'System.Text.Json과 Newtonsoft 중 어떤 것을 사용해야 하나요?',
    faq1_a: '새로운 .NET 8+ 프로젝트에는 System.Text.Json이 권장됩니다. 프레임워크 내장이며, 2-5배 빠르고, AOT 소스 제너레이터를 지원합니다. Newtonsoft는 기존 프로젝트나 JObject가 필요한 복잡한 시나리오에 유용합니다.',
    faq2_q: 'C# Records와 전통적인 클래스 중 무엇을 사용해야 하나요?',
    faq2_a: '불변 DTO에는 Records(C# 9+)를 사용하세요. 가변성이나 INotifyPropertyChanged가 필요하면 클래스. ASP.NET Core에서는 Records가 모던한 모범 사례입니다.',
    faq3_q: '알 수 없는 JSON 속성을 어떻게 처리하나요?',
    faq3_a: 'System.Text.Json은 기본적으로 무시합니다. 캡처하려면 [JsonExtensionData]를 사용하세요. Newtonsoft는 기본적으로 예외를 던지므로 MissingMemberHandling.Ignore를 설정하세요.',
    conclusion: 'JSON에서 C# 클래스로의 변환은 모든 .NET 개발자의 기본 기술입니다. 무료 온라인 도구로 즉시 코드를 생성하세요.',
    linkToolBottom: '무료 온라인 도구로 JSON을 C# 클래스로 즉시 변환하세요.',
  },
};

export default function JsonToCsharpClassGuide({ lang }: { lang: string }) {
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
      <p><Link href={`/${lang}/tools/json-to-csharp`} style={{ fontWeight: 600 }}>{s.linkTool}</Link></p>

      {/* Section 1: What is JSON to C# Class Conversion? */}
      <h2>{s.h2_what}</h2>
      <p dangerouslySetInnerHTML={{ __html: s.whatDesc1 }} />
      <p dangerouslySetInnerHTML={{ __html: s.whatDesc2 }} />
      <p dangerouslySetInnerHTML={{ __html: s.whatDesc3 }} />

      {/* Section 2: JSON to C# Type Mapping */}
      <h2>{s.h2_typeMapping}</h2>
      <p>{s.typeMappingDesc}</p>
      <div dangerouslySetInnerHTML={{ __html: s.typeMappingTable }} />
      <p dangerouslySetInnerHTML={{ __html: s.typeMappingExtra }} />

      {/* Section 3: How JSON to C# Conversion Works */}
      <h2>{s.h2_howWorks}</h2>
      <p dangerouslySetInnerHTML={{ __html: s.howWorksDesc }} />
      <div dangerouslySetInnerHTML={{ __html: s.howWorksSteps }} />

      {/* Section 4: Code Examples */}
      <h2>{s.h2_codeExamples}</h2>

      <h3>{s.codeSTJTitle}</h3>
      <p dangerouslySetInnerHTML={{ __html: s.codeSTJDesc }} />
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

// === C# class with System.Text.Json attributes ===
using System.Text.Json;
using System.Text.Json.Serialization;

public class User
{
    [JsonPropertyName("user_id")]
    public long UserId { get; set; }

    [JsonPropertyName("user_name")]
    public string UserName { get; set; } = "";

    public string Email { get; set; } = "";

    [JsonPropertyName("is_active")]
    public bool IsActive { get; set; }

    public decimal Balance { get; set; }

    public List<string> Tags { get; set; } = new();

    public Address Address { get; set; } = new();
}

public class Address
{
    public string Street { get; set; } = "";
    public string City { get; set; } = "";

    [JsonPropertyName("zip_code")]
    public string ZipCode { get; set; } = "";
}

// === Deserialization with JsonSerializer ===
var options = new JsonSerializerOptions
{
    PropertyNameCaseInsensitive = true,
    DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull
};

// Single object
User? user = JsonSerializer.Deserialize<User>(jsonString, options);

// List of objects
List<User>? users = JsonSerializer.Deserialize<List<User>>(
    jsonArrayString, options);

// === Custom JsonConverter for special cases ===
public class EpochToDateTimeConverter : JsonConverter<DateTime>
{
    public override DateTime Read(
        ref Utf8JsonReader reader, Type typeToConvert,
        JsonSerializerOptions options)
    {
        return DateTimeOffset.FromUnixTimeSeconds(
            reader.GetInt64()).DateTime;
    }

    public override void Write(
        Utf8JsonWriter writer, DateTime value,
        JsonSerializerOptions options)
    {
        writer.WriteNumberValue(
            new DateTimeOffset(value).ToUnixTimeSeconds());
    }
}

// Usage: [JsonConverter(typeof(EpochToDateTimeConverter))]
// public DateTime CreatedAt { get; set; }

// === .NET 8 Source Generator (AOT-friendly) ===
[JsonSerializable(typeof(User))]
[JsonSerializable(typeof(List<User>))]
public partial class AppJsonContext : JsonSerializerContext { }

// Zero-reflection deserialization:
User? u = JsonSerializer.Deserialize(
    jsonString, AppJsonContext.Default.User);`}</code></pre>

      <h3>{s.codeNewtonsoftTitle}</h3>
      <p dangerouslySetInnerHTML={{ __html: s.codeNewtonsoftDesc }} />
      <pre><code>{`using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json.Converters;

public class User
{
    [JsonProperty("user_id")]
    public long UserId { get; set; }

    [JsonProperty("user_name")]
    public string UserName { get; set; } = "";

    public string Email { get; set; } = "";

    [JsonProperty("is_active")]
    public bool IsActive { get; set; }

    public decimal Balance { get; set; }

    public List<string> Tags { get; set; } = new();

    public Address Address { get; set; } = new();
}

// === Deserialization with JsonConvert ===
var settings = new JsonSerializerSettings
{
    MissingMemberHandling = MissingMemberHandling.Ignore,
    NullValueHandling = NullValueHandling.Ignore,
    DateFormatString = "yyyy-MM-ddTHH:mm:ssZ"
};

// Single object
User? user = JsonConvert.DeserializeObject<User>(
    jsonString, settings);

// List of objects
List<User>? users = JsonConvert.DeserializeObject<List<User>>(
    jsonArrayString, settings);

// === Dynamic parsing with JObject ===
JObject obj = JObject.Parse(jsonString);
string? name = (string?)obj["user_name"];
JArray? tags = (JArray?)obj["tags"];
int tagCount = tags?.Count ?? 0;

// LINQ-to-JSON queries
var activeUsers = JArray.Parse(jsonArrayString)
    .Where(u => (bool)u["is_active"]!)
    .Select(u => (string?)u["user_name"])
    .ToList();

// === Custom JsonConverter ===
public class BoolToIntConverter : JsonConverter<bool>
{
    public override bool ReadJson(
        JsonReader reader, Type objectType, bool existingValue,
        bool hasExistingValue, JsonSerializer serializer)
    {
        return Convert.ToInt32(reader.Value) == 1;
    }

    public override void WriteJson(
        JsonWriter writer, bool value,
        JsonSerializer serializer)
    {
        writer.WriteValue(value ? 1 : 0);
    }
}

// Usage: [JsonConverter(typeof(BoolToIntConverter))]
// public bool IsActive { get; set; }`}</code></pre>

      <h3>{s.codeRecordsTitle}</h3>
      <p dangerouslySetInnerHTML={{ __html: s.codeRecordsDesc }} />
      <pre><code>{`// C# Record classes for JSON deserialization (C# 9+)
using System.Text.Json.Serialization;

public record User(
    [property: JsonPropertyName("user_id")] long UserId,
    [property: JsonPropertyName("user_name")] string UserName,
    string Email,
    [property: JsonPropertyName("is_active")] bool IsActive,
    decimal Balance,
    List<string> Tags,
    Address Address
);

public record Address(
    string Street,
    string City,
    [property: JsonPropertyName("zip_code")] string ZipCode
);

// Deserialization works seamlessly with records
var options = new JsonSerializerOptions
{
    PropertyNameCaseInsensitive = true
};
User? user = JsonSerializer.Deserialize<User>(json, options);

// Records are immutable: use "with" for modified copies
User updated = user! with { Email = "new@example.com" };

// Init-only record class (C# 10+)
public record class Product
{
    public required long Id { get; init; }
    public required string Name { get; init; }
    public required decimal Price { get; init; }
    public bool InStock { get; init; }
    public List<string> Categories { get; init; } = new();
}

// Value-based equality: two records with same data are equal
var p1 = new Product { Id = 1, Name = "Keyboard", Price = 79.99m };
var p2 = new Product { Id = 1, Name = "Keyboard", Price = 79.99m };
Console.WriteLine(p1 == p2);  // True`}</code></pre>

      <h3>{s.codeManualTitle}</h3>
      <p dangerouslySetInnerHTML={{ __html: s.codeManualDesc }} />
      <pre><code>{`using System.ComponentModel;
using System.Runtime.CompilerServices;
using System.Text.Json.Serialization;

// POCO with INotifyPropertyChanged for WPF/MAUI data binding
public class Product : INotifyPropertyChanged
{
    private long _id;
    private string _name = "";
    private decimal _price;
    private bool _inStock;
    private List<string> _categories = new();

    [JsonPropertyName("product_id")]
    public long Id
    {
        get => _id;
        set => SetField(ref _id, value);
    }

    public string Name
    {
        get => _name;
        set => SetField(ref _name, value);
    }

    public decimal Price
    {
        get => _price;
        set => SetField(ref _price, value);
    }

    [JsonPropertyName("in_stock")]
    public bool InStock
    {
        get => _inStock;
        set => SetField(ref _inStock, value);
    }

    public List<string> Categories
    {
        get => _categories;
        set => SetField(ref _categories, value);
    }

    // INotifyPropertyChanged implementation
    public event PropertyChangedEventHandler? PropertyChanged;

    private void OnPropertyChanged(
        [CallerMemberName] string? name = null)
    {
        PropertyChanged?.Invoke(
            this, new PropertyChangedEventArgs(name));
    }

    private bool SetField<T>(
        ref T field, T value,
        [CallerMemberName] string? name = null)
    {
        if (EqualityComparer<T>.Default.Equals(field, value))
            return false;
        field = value;
        OnPropertyChanged(name);
        return true;
    }

    // Override ToString for debugging
    public override string ToString()
        => $"Product {{ Id={Id}, Name={Name}, Price={Price} }}";
}

// Usage with AutoMapper (DTO to domain model):
// var config = new MapperConfiguration(cfg =>
//     cfg.CreateMap<ProductDto, Product>());
// var mapper = config.CreateMapper();
// Product product = mapper.Map<Product>(dto);`}</code></pre>

      {/* Section 5: Working with Nested JSON */}
      <h2>{s.h2_nested}</h2>
      <p dangerouslySetInnerHTML={{ __html: s.nestedDesc1 }} />
      <p dangerouslySetInnerHTML={{ __html: s.nestedDesc2 }} />
      <p dangerouslySetInnerHTML={{ __html: s.nestedDesc3 }} />
      <p dangerouslySetInnerHTML={{ __html: s.nestedDesc4 }} />
      <pre><code>{`// Polymorphic deserialization with .NET 7+ System.Text.Json
using System.Text.Json.Serialization;

[JsonPolymorphic(TypeDiscriminatorPropertyName = "type")]
[JsonDerivedType(typeof(EmailNotification), "email")]
[JsonDerivedType(typeof(SmsNotification), "sms")]
[JsonDerivedType(typeof(PushNotification), "push")]
public abstract class Notification
{
    public string Type { get; set; } = "";
    public string Message { get; set; } = "";
    public DateTime CreatedAt { get; set; }
}

public class EmailNotification : Notification
{
    public string Recipient { get; set; } = "";
    public string Subject { get; set; } = "";
}

public class SmsNotification : Notification
{
    public string PhoneNumber { get; set; } = "";
}

public class PushNotification : Notification
{
    public string DeviceToken { get; set; } = "";
    public string Title { get; set; } = "";
}

// JSON input:
// {"type":"email","message":"Hello","recipient":"a@b.com","subject":"Hi"}
// Automatically deserializes to EmailNotification

// Nested classes with arrays example
public class ApiResponse
{
    public bool Success { get; set; }
    public UserData Data { get; set; } = new();
    public List<ErrorDetail> Errors { get; set; } = new();
}

public class UserData
{
    public User User { get; set; } = new();
    public List<Order> Orders { get; set; } = new();
    public Address BillingAddress { get; set; } = new();
    public Address ShippingAddress { get; set; } = new();
}

public class Order
{
    public long OrderId { get; set; }
    public decimal Total { get; set; }
    public List<OrderItem> Items { get; set; } = new();
}

public class OrderItem
{
    public long ProductId { get; set; }
    public string Name { get; set; } = "";
    public int Quantity { get; set; }
    public decimal UnitPrice { get; set; }
}`}</code></pre>

      {/* Section 6: Advanced Patterns */}
      <h2>{s.h2_advanced}</h2>
      <p dangerouslySetInnerHTML={{ __html: s.advancedDesc1 }} />
      <pre><code>{`// .NET 8 Source Generator for AOT-friendly serialization
using System.Text.Json;
using System.Text.Json.Serialization;

public record Product(
    [property: JsonPropertyName("product_id")] long ProductId,
    string Name,
    decimal Price,
    [property: JsonPropertyName("in_stock")] bool InStock,
    List<string> Tags,
    [property: JsonPropertyName("created_at")] DateTime CreatedAt
);

// Source generator context
[JsonSerializable(typeof(Product))]
[JsonSerializable(typeof(List<Product>))]
[JsonSourceGenerationOptions(
    PropertyNamingPolicy = JsonKnownNamingPolicy.CamelCase,
    DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull,
    GenerationMode = JsonSourceGenerationMode.Default)]
public partial class AppJsonContext : JsonSerializerContext { }

// Zero-reflection serialization (AOT-compatible)
var product = JsonSerializer.Deserialize(
    json, AppJsonContext.Default.Product);
var jsonOut = JsonSerializer.Serialize(
    product, AppJsonContext.Default.Product);

// Works with ASP.NET Core minimal APIs
var builder = WebApplication.CreateBuilder(args);
builder.Services.ConfigureHttpJsonOptions(options =>
{
    options.SerializerOptions.TypeInfoResolverChain
        .Insert(0, AppJsonContext.Default);
});`}</code></pre>

      <p dangerouslySetInnerHTML={{ __html: s.advancedDesc2 }} />
      <pre><code>{`// Nullable reference types + required properties (C# 11+)
#nullable enable

public class UserProfile
{
    public required string Name { get; init; }
    public required string Email { get; init; }
    public string? Nickname { get; init; }     // optional
    public int Age { get; init; }
    public string? AvatarUrl { get; init; }     // optional
    public required List<string> Roles { get; init; }
}

// Deserialization enforces required properties
var options = new JsonSerializerOptions
{
    PropertyNameCaseInsensitive = true
};
var user = JsonSerializer.Deserialize<UserProfile>(json, options)
    ?? throw new InvalidOperationException(
        "Failed to deserialize user profile");

// Compiler warning if you forget to set required properties:
// var profile = new UserProfile { Name = "Alice" };
// Error CS9035: Required member 'Email' must be set

// JsonRequired attribute for runtime enforcement
public class StrictModel
{
    [JsonRequired]
    public string Id { get; set; } = "";

    [JsonRequired]
    public string Name { get; set; } = "";

    public string? Description { get; set; }
}`}</code></pre>

      <p dangerouslySetInnerHTML={{ __html: s.advancedDesc3 }} />

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
        <Link href={`/${lang}/tools/json-to-kotlin`}>JSON to Kotlin</Link>
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
      <p><Link href={`/${lang}/tools/json-to-csharp`} style={{ fontWeight: 600 }}>{s.linkToolBottom}</Link></p>
    </>
  );
}
