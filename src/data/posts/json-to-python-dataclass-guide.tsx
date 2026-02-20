import Link from 'next/link';

const t: Record<string, Record<string, string>> = {
  en: {
    intro: 'Converting <strong>JSON to Python</strong> dataclasses is one of the most common tasks in modern Python development. When your application receives a JSON response from a REST API, you need well-structured <strong>Python dataclasses</strong>, Pydantic models, or TypedDicts to work with that data safely. Whether you are building a FastAPI backend, a Django REST service, or a data pipeline, a reliable <strong>JSON to Python dataclass</strong> converter saves hours of manual coding. This comprehensive guide walks you through type mapping, <strong>python json parsing</strong> strategies, <strong>pydantic json</strong> models, attrs, TypedDicts, and best practices for generating a <strong>Python class from JSON</strong>. If you need to <strong>convert JSON to Python online</strong> right now, try our free tool.',
    linkTool: 'Try our free online JSON to Python Dataclass Converter instantly.',
    h2_what: 'What Is JSON to Python Dataclass Conversion?',
    whatDesc1: 'JSON (JavaScript Object Notation) is the dominant data interchange format for web APIs, configuration files, and NoSQL databases. Python, while dynamically typed, benefits enormously from explicit type definitions via <strong>dataclasses</strong>, Pydantic models, and TypedDicts. <strong>JSON to Python dataclass conversion</strong> bridges the gap by analyzing a JSON document and producing the corresponding Python classes with properly typed fields, default values, and validation logic.',
    whatDesc2: 'In a typical FastAPI application, a route handler receives an HTTP request body as a JSON string. Before business logic can process this data, the framework must <strong>convert JSON to Python</strong> objects using Pydantic\'s <code>BaseModel</code>. Without properly defined models, you are left working with raw dictionaries that offer no type safety, no autocompletion, and no validation. A <strong>JSON to Python class</strong> converter automates the creation of these data models so you can focus on logic instead of boilerplate.',
    whatDesc3: 'The same conversion is essential in Django REST Framework where serializers parse API payloads into Python objects, in data engineering pipelines where JSON records from Kafka or S3 need structured types, and in CLI tools that read JSON configuration files. Whether you call it <strong>json to python dataclass</strong>, <strong>python dataclass from json</strong>, or <strong>json to pydantic</strong>, the underlying process is identical: inspect the JSON structure, determine each field\'s type, handle nesting and arrays, and produce clean, typed Python source code.',
    h2_typeMapping: 'JSON to Python: Type Mapping',
    typeMappingDesc: 'Understanding how JSON types map to Python types is the foundation of any <strong>JSON to Python</strong> conversion. The following table shows the standard mappings used by Pydantic, dataclasses, and most code generators:',
    typeMappingTable: '<table><thead><tr><th>JSON Type</th><th>Example</th><th>Python Type(s)</th><th>Notes</th></tr></thead><tbody><tr><td>string</td><td><code>"hello"</code></td><td><code>str</code></td><td>Always maps to <code>str</code>; use <code>datetime</code> for ISO date strings</td></tr><tr><td>number (integer)</td><td><code>42</code></td><td><code>int</code></td><td>Python <code>int</code> has arbitrary precision, no overflow concern</td></tr><tr><td>number (float)</td><td><code>3.14</code></td><td><code>float</code>, <code>Decimal</code></td><td>Use <code>Decimal</code> for financial data to avoid floating-point errors</td></tr><tr><td>boolean</td><td><code>true</code></td><td><code>bool</code></td><td>Maps directly to Python <code>True</code>/<code>False</code></td></tr><tr><td>null</td><td><code>null</code></td><td><code>None</code></td><td>Use <code>Optional[T]</code> or <code>T | None</code> (Python 3.10+)</td></tr><tr><td>array</td><td><code>[1, 2, 3]</code></td><td><code>list[T]</code>, <code>List[T]</code></td><td>Use <code>list[T]</code> in Python 3.9+; <code>List[T]</code> from <code>typing</code> for older versions</td></tr><tr><td>object</td><td><code>{"k": "v"}</code></td><td>Nested dataclass or <code>dict[str, Any]</code></td><td>Strongly typed nested classes preferred over generic dicts</td></tr></tbody></table>',
    typeMappingExtra: 'When you generate a <strong>Python dataclass from JSON</strong>, choosing between <code>Optional[str]</code> and <code>str | None</code> depends on your Python version. Python 3.10+ supports the pipe syntax natively. For monetary values, always prefer <code>Decimal</code> over <code>float</code> to avoid precision loss. Arrays of objects should map to <code>list[NestedModel]</code> to leverage type checking and IDE autocompletion. The <strong>python dict to dataclass</strong> conversion also benefits from proper type annotations that enable mypy and pyright static analysis.',
    h2_howWorks: 'How JSON to Python Conversion Works',
    howWorksDesc: 'A <strong>JSON to Python dataclass</strong> converter follows a systematic process to transform raw JSON into typed Python source code:',
    howWorksSteps: '<ol><li><strong>Parse the JSON structure</strong>: The converter tokenizes the input JSON using Python\'s built-in <code>json</code> module, building a nested dictionary/list structure. Invalid JSON is rejected at this stage with a <code>json.JSONDecodeError</code>.</li><li><strong>Infer field types</strong>: For each key-value pair, the converter determines the Python type. Strings become <code>str</code>, integers become <code>int</code>, floats become <code>float</code>, booleans become <code>bool</code>, null becomes <code>None</code> (wrapped in <code>Optional</code>), and nested objects become new dataclasses.</li><li><strong>Generate class names</strong>: JSON keys like <code>user_address</code> or <code>shipping-info</code> are converted to PascalCase class names (<code>UserAddress</code>, <code>ShippingInfo</code>) following Python naming conventions. Field names follow snake_case.</li><li><strong>Handle nested objects</strong>: Each nested JSON object generates a separate Python dataclass or Pydantic model. Deeply nested structures produce a class hierarchy. Circular references are detected and handled.</li><li><strong>Handle arrays</strong>: JSON arrays are analyzed to determine the element type. Arrays of objects produce <code>list[ElementClass]</code>. Mixed-type arrays fall back to <code>list[Any]</code>.</li><li><strong>Add type annotations</strong>: The converter adds Python type hints using PEP 484/604 syntax. Fields with <code>null</code> values get <code>Optional[T]</code> annotations. Default values are assigned where applicable.</li><li><strong>Output source code</strong>: The final step emits properly formatted Python source with imports, class definitions, field declarations, and optional validators or serializers.</li></ol>',
    h2_codeExamples: 'Code Examples: JSON to Python with Pydantic, dataclasses, TypedDict, and attrs',
    codePydanticTitle: 'Pydantic v2: BaseModel, Field, and Validators',
    codePydanticDesc: 'Pydantic is the most widely used <strong>JSON to Python</strong> library in the Python ecosystem. FastAPI uses it by default. Here is a complete example showing how to <strong>convert JSON to Python</strong> objects using Pydantic v2\'s <code>BaseModel</code>, <code>Field</code>, validators, and <code>model_validate_json</code>:',
    codeDataclassTitle: 'dataclasses + json: @dataclass, dataclass_json, dacite',
    codeDataclassDesc: 'Python\'s built-in <code>dataclasses</code> module provides a lightweight alternative for <strong>JSON to Python class</strong> conversion. Combined with libraries like <code>dataclasses-json</code> or <code>dacite</code>, you get JSON parsing with minimal dependencies:',
    codeTypedDictTitle: 'TypedDict: Type Hints Without Runtime Overhead',
    codeTypedDictDesc: 'When you need <strong>python json parsing</strong> with type safety but zero runtime overhead, <code>TypedDict</code> provides structural typing for dictionaries. This approach is ideal when you work with <code>json.loads()</code> directly and want IDE autocompletion and mypy validation without any serialization library:',
    codeAttrsTitle: 'attrs: @define and cattrs for Structured Data',
    codeAttrsDesc: 'The <code>attrs</code> library predates dataclasses and offers more features, including validators, converters, and slots-based classes. Combined with <code>cattrs</code>, it provides powerful <strong>JSON to Python</strong> structuring and unstructuring:',
    h2_nested: 'Working with Nested JSON Structures',
    nestedDesc1: 'Real-world APIs rarely return flat JSON. Most responses contain deeply nested objects, arrays of objects, and polymorphic types. Converting these complex structures into a <strong>Python dataclass from JSON</strong> requires careful planning:',
    nestedDesc2: '<strong>Nested models</strong>: Each level of nesting produces a separate Python class. For a JSON structure like <code>{"user": {"address": {"city": "NYC"}}}</code>, you need three classes: the root model, a <code>User</code> model, and an <code>Address</code> model. In Pydantic, nested models are validated recursively. In dataclasses, you must handle nested dict-to-object conversion explicitly.',
    nestedDesc3: '<strong>List[Model] and Optional fields</strong>: A JSON field like <code>"items": [{"id": 1}, {"id": 2}]</code> maps to <code>list[Item]</code> in Python. Fields that can be <code>null</code> or absent should use <code>Optional[T]</code> with a default of <code>None</code>. Pydantic handles both cases automatically; with dataclasses, use <code>field(default=None)</code>.',
    nestedDesc4: '<strong>Union types and discriminated unions</strong>: When a JSON field can hold different object shapes based on a discriminator, Pydantic\'s <code>Discriminator</code> and <code>Tag</code> provide type-safe deserialization. Define a base model and use <code>Union[ModelA, ModelB]</code> with a discriminator field:',
    nestedCode: '# Discriminated union with Pydantic v2\nfrom pydantic import BaseModel, Discriminator, Tag\nfrom typing import Annotated, Literal, Union\n\nclass EmailNotification(BaseModel):\n    type: Literal["email"]\n    message: str\n    recipient: str\n    subject: str\n\nclass SmsNotification(BaseModel):\n    type: Literal["sms"]\n    message: str\n    phone_number: str\n\nclass PushNotification(BaseModel):\n    type: Literal["push"]\n    message: str\n    device_token: str\n    title: str\n\nNotification = Annotated[\n    Union[\n        Annotated[EmailNotification, Tag("email")],\n        Annotated[SmsNotification, Tag("sms")],\n        Annotated[PushNotification, Tag("push")],\n    ],\n    Discriminator("type"),\n]\n\n# Usage:\n# data = {"type": "email", "message": "Hello", "recipient": "a@b.com", "subject": "Hi"}\n# notif = TypeAdapter(Notification).validate_python(data)\n# isinstance(notif, EmailNotification)  # True',
    h2_advanced: 'Advanced Patterns: Pydantic Settings, JSON Schema, Custom Validators, and Computed Fields',
    advancedDesc1: '<strong>Pydantic Settings</strong> lets you load configuration from JSON files, environment variables, and .env files into a single typed model. This is ideal for application config in FastAPI or Django projects:',
    advancedSettingsCode: 'from pydantic_settings import BaseSettings, SettingsConfigDict\nfrom pydantic import Field\n\nclass AppSettings(BaseSettings):\n    model_config = SettingsConfigDict(\n        env_file=".env",\n        env_file_encoding="utf-8",\n        json_file="config.json",\n    )\n\n    app_name: str = "MyApp"\n    debug: bool = False\n    database_url: str = Field(alias="DATABASE_URL")\n    redis_url: str = "redis://localhost:6379"\n    max_connections: int = 100\n\n# Loads from config.json, .env, and environment variables\nsettings = AppSettings()',
    advancedDesc2: '<strong>JSON Schema generation</strong> is built into Pydantic v2. Every <code>BaseModel</code> can produce a JSON Schema for API documentation, validation, and code generation in other languages:',
    advancedSchemaCode: 'from pydantic import BaseModel\nimport json\n\nclass Product(BaseModel):\n    id: int\n    name: str\n    price: float\n    tags: list[str] = []\n\n# Generate JSON Schema\nschema = Product.model_json_schema()\nprint(json.dumps(schema, indent=2))\n# Output:\n# {\n#   "title": "Product",\n#   "type": "object",\n#   "properties": {\n#     "id": {"title": "Id", "type": "integer"},\n#     "name": {"title": "Name", "type": "string"},\n#     "price": {"title": "Price", "type": "number"},\n#     "tags": {"title": "Tags", "type": "array", "items": {"type": "string"}, "default": []}\n#   },\n#   "required": ["id", "name", "price"]\n# }',
    advancedDesc3: '<strong>Custom validators and serialization aliases</strong> allow you to transform data during parsing and control output field names. <strong>Computed fields</strong> (Pydantic v2) let you define derived properties that appear in serialized output:',
    advancedValidatorCode: 'from pydantic import BaseModel, Field, field_validator, computed_field\nfrom datetime import datetime\n\nclass User(BaseModel):\n    first_name: str = Field(alias="firstName")\n    last_name: str = Field(alias="lastName")\n    email: str\n    birth_date: datetime = Field(alias="birthDate")\n\n    @field_validator("email")\n    @classmethod\n    def validate_email(cls, v: str) -> str:\n        if "@" not in v:\n            raise ValueError("Invalid email address")\n        return v.lower().strip()\n\n    @computed_field\n    @property\n    def full_name(self) -> str:\n        return f"{self.first_name} {self.last_name}"\n\n    @computed_field\n    @property\n    def age(self) -> int:\n        today = datetime.now()\n        return today.year - self.birth_date.year\n\n# Parse from JSON with camelCase keys\nuser = User.model_validate_json(\'{"firstName":"Alice","lastName":"Smith","email":"ALICE@example.com","birthDate":"1990-05-15T00:00:00"}\')\nprint(user.full_name)  # "Alice Smith"\nprint(user.email)      # "alice@example.com"',
    h2_bestPractices: 'Best Practices for JSON to Python Conversion',
    bestPracticesDesc: 'Follow these best practices when you <strong>convert JSON to Python</strong> dataclasses to build robust, maintainable applications:',
    bp1: '<strong>Use Pydantic for API-facing code</strong>: When building REST APIs with FastAPI or processing external JSON data, Pydantic provides validation, serialization, and JSON Schema generation out of the box. Use <code>model_validate_json()</code> for direct string parsing without an intermediate <code>json.loads()</code> step.',
    bp2: '<strong>Use dataclasses for internal data structures</strong>: When you need lightweight data containers without validation overhead, Python\'s built-in <code>@dataclass</code> decorator is sufficient. Add <code>frozen=True</code> for immutability and <code>slots=True</code> (Python 3.10+) for memory efficiency.',
    bp3: '<strong>Handle optional and nullable fields explicitly</strong>: Use <code>Optional[T]</code> or <code>T | None</code> for fields that can be absent or null. Set default values with <code>Field(default=None)</code> in Pydantic or <code>field(default=None)</code> in dataclasses. Never use mutable default values like <code>[]</code> or <code>{}</code> directly.',
    bp4: '<strong>Use aliases for naming convention mismatches</strong>: JSON APIs often use camelCase while Python prefers snake_case. Use Pydantic\'s <code>Field(alias="camelCase")</code> or configure <code>model_config = ConfigDict(alias_generator=to_camel)</code> globally. For dataclasses, use <code>dataclasses-json</code> with <code>letter_case=LetterCase.CAMEL</code>.',
    bp5: '<strong>Validate early, fail fast</strong>: Add <code>@field_validator</code> decorators in Pydantic or <code>__post_init__</code> checks in dataclasses to validate data at construction time. This catches errors at the API boundary rather than deep in business logic.',
    bp6: '<strong>Use strict mode for type coercion control</strong>: Pydantic v2\'s <code>ConfigDict(strict=True)</code> prevents implicit type coercion (e.g., string <code>"42"</code> to int <code>42</code>). Enable strict mode when data integrity is critical, such as financial applications.',
    bp7: '<strong>Generate types from JSON Schema when available</strong>: If the API provides an OpenAPI/JSON Schema specification, use tools like <code>datamodel-code-generator</code> to auto-generate Pydantic models. This ensures your types stay in sync with the API contract.',
    relatedTools: 'Related tools you might find useful: <strong>JSON to Java</strong> for Spring Boot backend development, <strong>JSON to TypeScript</strong> for frontend interfaces, and <strong>JSON to Dart</strong> for Flutter applications.',
    h2_faq: 'Frequently Asked Questions',
    faq1_q: 'Pydantic vs dataclasses: which should I use for JSON to Python conversion?',
    faq1_a: 'Use Pydantic when you need data validation, JSON Schema generation, or FastAPI integration. Pydantic validates data at construction time, supports complex types like datetime and UUID natively, and generates API documentation automatically. Use dataclasses when you need lightweight data containers for internal use without validation overhead. Dataclasses are part of the standard library (Python 3.7+) and have no external dependencies. For the best of both worlds, consider Pydantic\'s dataclass decorator which adds validation to standard dataclasses.',
    faq2_q: 'How do I convert a Python dict to a dataclass automatically?',
    faq2_a: 'For Pydantic models, use model_validate() to convert a dict directly: User.model_validate({"name": "Alice", "age": 30}). For standard dataclasses, use the dacite library: dacite.from_dict(data_class=User, data=my_dict). Dacite handles nested structures, Optional fields, and Union types. Alternatively, use dataclasses-json which adds from_dict() and to_dict() methods to your dataclasses via a @dataclass_json decorator. For simple cases, you can unpack the dict directly: User(**my_dict).',
    faq3_q: 'How do I handle nested JSON with optional fields in Python?',
    faq3_a: 'In Pydantic, nested models are handled automatically. Define a nested BaseModel and reference it as a field type. For optional nested objects, use Optional[NestedModel] = None. Pydantic validates the entire tree recursively. In dataclasses, you must convert nested dicts manually in __post_init__ or use dacite/dataclasses-json. For Optional fields, always provide a default of None and use field(default=None) to avoid the mutable default argument pitfall. Python 3.10+ supports T | None as a cleaner alternative to Optional[T].',
    conclusion: 'Converting <strong>JSON to Python</strong> dataclasses is a fundamental skill for every Python developer working with APIs, configuration files, or data pipelines. From Pydantic v2 models with validation and JSON Schema to lightweight dataclasses and TypedDicts, the right approach depends on your project\'s requirements. Use our free <strong>JSON to Python online</strong> converter for instant code generation, and refer to this guide for best practices on type mapping, nested structures, and library selection.',
    linkToolBottom: 'Convert JSON to Python dataclasses instantly with our free online tool.',
  },
  zh: {
    intro: '将 <strong>JSON 转换为 Python</strong> dataclass 是现代 Python 开发中最常见的任务之一。当应用程序从 REST API 接收 JSON 响应时，你需要结构良好的 Python dataclass、Pydantic 模型或 TypedDict 来安全地处理数据。无论你是构建 FastAPI 后端、Django REST 服务还是数据管道，可靠的 JSON 转 Python dataclass 转换器都能节省大量手动编码时间。本指南全面介绍类型映射、Python JSON 解析策略、Pydantic、attrs、TypedDict 以及从 JSON 生成 Python 类的最佳实践。',
    linkTool: '立即试用我们的免费在线 JSON 转 Python Dataclass 转换工具。',
    h2_what: '什么是 JSON 转 Python Dataclass 转换？',
    whatDesc1: 'JSON 是 Web API、配置文件和 NoSQL 数据库的主流数据交换格式。Python 虽然是动态类型语言，但通过 dataclass、Pydantic 模型和 TypedDict 的显式类型定义可以极大受益。JSON 转 Python dataclass 转换通过分析 JSON 文档并生成具有正确类型字段、默认值和验证逻辑的对应 Python 类来弥合这一差距。',
    whatDesc2: '在典型的 FastAPI 应用中，路由处理器接收 JSON 字符串格式的 HTTP 请求体。在业务逻辑处理数据前，框架必须使用 Pydantic 的 <code>BaseModel</code> 将 JSON 转换为 Python 对象。没有正确定义的模型，你只能使用原始字典，没有类型安全、自动补全和验证。JSON 转 Python 类转换器自动创建这些数据模型。',
    whatDesc3: '在 Django REST Framework 中序列化器解析 API 载荷、在数据工程管道中处理来自 Kafka 或 S3 的 JSON 记录、以及在读取 JSON 配置文件的 CLI 工具中，同样需要这种转换。底层过程都是相同的：检查 JSON 结构，确定每个字段的类型，处理嵌套和数组，生成干净的带类型注解的 Python 源代码。',
    h2_typeMapping: 'JSON 到 Python：类型映射',
    typeMappingDesc: '理解 JSON 类型如何映射到 Python 类型是任何 JSON 转 Python 转换的基础：',
    typeMappingTable: '<table><thead><tr><th>JSON 类型</th><th>示例</th><th>Python 类型</th><th>说明</th></tr></thead><tbody><tr><td>string</td><td><code>"hello"</code></td><td><code>str</code></td><td>始终映射为 <code>str</code>；ISO 日期字符串使用 <code>datetime</code></td></tr><tr><td>number（整数）</td><td><code>42</code></td><td><code>int</code></td><td>Python <code>int</code> 支持任意精度</td></tr><tr><td>number（浮点数）</td><td><code>3.14</code></td><td><code>float</code>、<code>Decimal</code></td><td>金融数据使用 <code>Decimal</code></td></tr><tr><td>boolean</td><td><code>true</code></td><td><code>bool</code></td><td>直接映射为 <code>True</code>/<code>False</code></td></tr><tr><td>null</td><td><code>null</code></td><td><code>None</code></td><td>使用 <code>Optional[T]</code> 或 <code>T | None</code></td></tr><tr><td>array</td><td><code>[1, 2, 3]</code></td><td><code>list[T]</code></td><td>Python 3.9+ 使用 <code>list[T]</code></td></tr><tr><td>object</td><td><code>{"k": "v"}</code></td><td>嵌套类或 <code>dict</code></td><td>优先使用强类型嵌套类</td></tr></tbody></table>',
    typeMappingExtra: '从 JSON 生成 Python dataclass 时，选择 <code>Optional[str]</code> 还是 <code>str | None</code> 取决于 Python 版本。Python 3.10+ 原生支持管道语法。货币值始终使用 <code>Decimal</code> 而非 <code>float</code>。字典转 dataclass 的转换同样受益于正确的类型注解。',
    h2_howWorks: 'JSON 转 Python 转换的工作原理',
    howWorksDesc: 'JSON 转 Python dataclass 转换器遵循系统化流程将原始 JSON 转换为带类型的 Python 源代码：',
    howWorksSteps: '<ol><li><strong>解析 JSON 结构</strong>：使用 Python 内置 <code>json</code> 模块解析输入 JSON，构建嵌套字典/列表结构。</li><li><strong>推断字段类型</strong>：对每个键值对确定 Python 类型。字符串变为 <code>str</code>，整数变为 <code>int</code>，浮点数变为 <code>float</code>，null 变为 <code>Optional</code>。</li><li><strong>生成类名</strong>：将 JSON 键名转换为 PascalCase 类名和 snake_case 字段名。</li><li><strong>处理嵌套对象</strong>：每个嵌套 JSON 对象生成一个单独的 Python dataclass 或 Pydantic 模型。</li><li><strong>处理数组</strong>：分析数组元素确定元素类型，对象数组生成 <code>list[ElementClass]</code>。</li><li><strong>添加类型注解</strong>：使用 PEP 484/604 语法添加 Python 类型提示。</li><li><strong>输出源代码</strong>：生成格式化的 Python 源代码，包含导入、类定义和字段声明。</li></ol>',
    h2_codeExamples: '代码示例：使用 Pydantic、dataclasses、TypedDict 和 attrs 实现 JSON 转 Python',
    codePydanticTitle: 'Pydantic v2：BaseModel、Field 和验证器',
    codePydanticDesc: 'Pydantic 是 Python 生态中最广泛使用的 JSON 转 Python 库，FastAPI 默认使用它。以下是使用 Pydantic v2 的完整示例：',
    codeDataclassTitle: 'dataclasses + json：@dataclass、dataclass_json、dacite',
    codeDataclassDesc: 'Python 内置的 <code>dataclasses</code> 模块提供了轻量级的 JSON 转 Python 类替代方案。结合 <code>dataclasses-json</code> 或 <code>dacite</code> 库可实现 JSON 解析：',
    codeTypedDictTitle: 'TypedDict：无运行时开销的类型提示',
    codeTypedDictDesc: '当需要带类型安全但零运行时开销的 Python JSON 解析时，<code>TypedDict</code> 为字典提供结构化类型。适合直接使用 <code>json.loads()</code> 且需要 IDE 自动补全和 mypy 验证的场景：',
    codeAttrsTitle: 'attrs：@define 和 cattrs 结构化数据',
    codeAttrsDesc: '<code>attrs</code> 库先于 dataclasses 出现，提供更多功能，包括验证器、转换器和基于 slots 的类。结合 <code>cattrs</code> 提供强大的 JSON 到 Python 的结构化和解构化：',
    h2_nested: '处理嵌套 JSON 结构',
    nestedDesc1: '实际 API 很少返回扁平 JSON。大多数响应包含深度嵌套对象、对象数组和多态类型。将这些复杂结构转换为 Python dataclass 需要仔细规划：',
    nestedDesc2: '<strong>嵌套模型</strong>：每层嵌套生成一个单独的 Python 类。Pydantic 中嵌套模型会递归验证。在 dataclasses 中，你必须显式处理嵌套字典到对象的转换。',
    nestedDesc3: '<strong>List[Model] 和 Optional 字段</strong>：<code>"items": [{"id": 1}, {"id": 2}]</code> 在 Python 中映射为 <code>list[Item]</code>。可能为 null 或缺失的字段使用 <code>Optional[T]</code>，默认值为 <code>None</code>。',
    nestedDesc4: '<strong>Union 类型和判别联合</strong>：当 JSON 字段根据判别符持有不同对象形状时，Pydantic 的 <code>Discriminator</code> 和 <code>Tag</code> 提供类型安全的反序列化。',
    h2_advanced: '高级模式：Pydantic Settings、JSON Schema、自定义验证器和计算字段',
    advancedDesc1: '<strong>Pydantic Settings</strong> 让你从 JSON 文件、环境变量和 .env 文件加载配置到单个类型化模型中。适用于 FastAPI 或 Django 项目的应用配置：',
    advancedDesc2: '<strong>JSON Schema 生成</strong>内置于 Pydantic v2。每个 <code>BaseModel</code> 都可以生成用于 API 文档、验证和其他语言代码生成的 JSON Schema：',
    advancedDesc3: '<strong>自定义验证器和序列化别名</strong>允许在解析时转换数据并控制输出字段名。<strong>计算字段</strong>（Pydantic v2）让你定义出现在序列化输出中的派生属性：',
    h2_bestPractices: 'JSON 转 Python 转换最佳实践',
    bestPracticesDesc: '将 JSON 转换为 Python dataclass 时，遵循以下最佳实践以构建健壮、可维护的应用：',
    bp1: '<strong>API 代码使用 Pydantic</strong>：构建 REST API 或处理外部 JSON 数据时，Pydantic 提供开箱即用的验证、序列化和 JSON Schema 生成。使用 <code>model_validate_json()</code> 直接解析字符串。',
    bp2: '<strong>内部数据结构使用 dataclasses</strong>：需要无验证开销的轻量级数据容器时，Python 内置的 <code>@dataclass</code> 装饰器就够了。添加 <code>frozen=True</code> 实现不可变性。',
    bp3: '<strong>显式处理可选和可空字段</strong>：使用 <code>Optional[T]</code> 或 <code>T | None</code>。设置默认值为 <code>None</code>。永远不要直接使用可变默认值如 <code>[]</code> 或 <code>{}</code>。',
    bp4: '<strong>使用别名处理命名约定不匹配</strong>：JSON API 通常使用 camelCase，而 Python 偏好 snake_case。使用 Pydantic 的 <code>Field(alias="camelCase")</code> 或全局配置别名生成器。',
    bp5: '<strong>尽早验证，快速失败</strong>：在 Pydantic 中添加 <code>@field_validator</code>，在 dataclasses 中添加 <code>__post_init__</code> 检查，在构造时验证数据。',
    bp6: '<strong>使用严格模式控制类型强制</strong>：Pydantic v2 的 <code>ConfigDict(strict=True)</code> 防止隐式类型转换。在数据完整性关键的场景（如金融应用）中启用。',
    bp7: '<strong>从 JSON Schema 生成类型</strong>：如果 API 提供 OpenAPI/JSON Schema 规范，使用 <code>datamodel-code-generator</code> 自动生成 Pydantic 模型。',
    relatedTools: '相关工具推荐：<strong>JSON 转 Java</strong> 用于 Spring Boot 后端开发，<strong>JSON 转 TypeScript</strong> 用于前端接口，<strong>JSON 转 Dart</strong> 用于 Flutter 应用。',
    h2_faq: '常见问题',
    faq1_q: 'Pydantic 和 dataclasses 哪个更适合 JSON 转 Python？',
    faq1_a: '需要数据验证、JSON Schema 生成或 FastAPI 集成时使用 Pydantic。Pydantic 在构造时验证数据，原生支持 datetime 和 UUID 等复杂类型，并自动生成 API 文档。需要无验证开销的轻量级数据容器时使用 dataclasses。dataclasses 是标准库的一部分（Python 3.7+），无外部依赖。',
    faq2_q: '如何自动将 Python dict 转换为 dataclass？',
    faq2_a: 'Pydantic 模型使用 model_validate() 直接转换字典：User.model_validate({"name": "Alice", "age": 30})。标准 dataclasses 使用 dacite 库：dacite.from_dict(data_class=User, data=my_dict)。dacite 处理嵌套结构、Optional 字段和 Union 类型。对于简单情况，可以直接解包字典：User(**my_dict)。',
    faq3_q: '如何在 Python 中处理带可选字段的嵌套 JSON？',
    faq3_a: 'Pydantic 中嵌套模型自动处理。定义嵌套 BaseModel 并引用为字段类型。可选嵌套对象使用 Optional[NestedModel] = None。Pydantic 递归验证整个树。dataclasses 中需在 __post_init__ 中手动转换嵌套字典，或使用 dacite/dataclasses-json。Optional 字段始终提供 None 默认值。',
    conclusion: '将 JSON 转换为 Python dataclass 是每个处理 API、配置文件或数据管道的 Python 开发者的基本技能。从带验证和 JSON Schema 的 Pydantic v2 模型到轻量级 dataclasses 和 TypedDicts，正确方法取决于项目需求。使用我们的免费在线 JSON 转 Python 转换器即时生成代码。',
    linkToolBottom: '使用我们的免费在线工具即时将 JSON 转换为 Python dataclass。',
  },
  fr: {
    intro: 'La conversion de <strong>JSON en Python</strong> dataclasses est l\'une des taches les plus courantes dans le developpement Python moderne. Lorsque votre application recoit une reponse JSON d\'une API REST, vous avez besoin de dataclasses Python bien structurees, de modeles Pydantic ou de TypedDicts pour travailler avec ces donnees en toute securite. Ce guide complet couvre le mapping des types, les strategies de parsing JSON Python, Pydantic, attrs, TypedDict et les bonnes pratiques.',
    linkTool: 'Essayez notre convertisseur gratuit JSON vers Python Dataclass en ligne.',
    h2_what: 'Qu\'est-ce que la conversion JSON vers Python Dataclass ?',
    whatDesc1: 'JSON est le format d\'echange de donnees dominant pour les API web. Python, bien que dynamiquement type, beneficie enormement de definitions de types explicites via les dataclasses, les modeles Pydantic et les TypedDicts. La conversion JSON vers Python dataclass analyse un document JSON et produit les classes Python correspondantes.',
    whatDesc2: 'Dans une application FastAPI typique, un gestionnaire de route recoit un corps de requete HTTP sous forme de chaine JSON. Le framework doit convertir ce JSON en objets Python a l\'aide du <code>BaseModel</code> de Pydantic. Un convertisseur JSON vers classe Python automatise la creation de ces modeles.',
    whatDesc3: 'La meme conversion est essentielle dans Django REST Framework, dans les pipelines de donnees traitant des enregistrements JSON, et dans les outils CLI lisant des fichiers de configuration JSON. Le processus est identique : inspecter la structure, determiner les types, gerer l\'imbrication.',
    h2_typeMapping: 'JSON vers Python : Mapping des types',
    typeMappingDesc: 'Comprendre comment les types JSON correspondent aux types Python est la base de toute conversion :',
    typeMappingTable: '<table><thead><tr><th>Type JSON</th><th>Exemple</th><th>Type(s) Python</th><th>Notes</th></tr></thead><tbody><tr><td>string</td><td><code>"hello"</code></td><td><code>str</code></td><td>Toujours <code>str</code> ; <code>datetime</code> pour les dates ISO</td></tr><tr><td>number (entier)</td><td><code>42</code></td><td><code>int</code></td><td>Precision arbitraire en Python</td></tr><tr><td>number (decimal)</td><td><code>3.14</code></td><td><code>float</code>, <code>Decimal</code></td><td><code>Decimal</code> pour les donnees financieres</td></tr><tr><td>boolean</td><td><code>true</code></td><td><code>bool</code></td><td>Correspondance directe</td></tr><tr><td>null</td><td><code>null</code></td><td><code>None</code></td><td><code>Optional[T]</code> ou <code>T | None</code></td></tr><tr><td>array</td><td><code>[1,2]</code></td><td><code>list[T]</code></td><td><code>list[T]</code> en Python 3.9+</td></tr><tr><td>object</td><td><code>{"k":"v"}</code></td><td>Classe imbriquee</td><td>Classes typees preferees</td></tr></tbody></table>',
    typeMappingExtra: 'Lors de la generation de dataclasses Python a partir de JSON, le choix entre <code>Optional[str]</code> et <code>str | None</code> depend de votre version Python. Pour les valeurs monetaires, utilisez toujours <code>Decimal</code>.',
    h2_howWorks: 'Comment fonctionne la conversion JSON vers Python',
    howWorksDesc: 'Un convertisseur JSON vers Python dataclass suit un processus systematique :',
    howWorksSteps: '<ol><li><strong>Analyser la structure JSON</strong> : Parsing avec le module <code>json</code> integre de Python.</li><li><strong>Inferer les types</strong> : Determination du type Python pour chaque paire cle-valeur.</li><li><strong>Generer les noms de classes</strong> : Conversion en PascalCase et snake_case.</li><li><strong>Gerer les objets imbriques</strong> : Chaque objet imbrique genere une classe separee.</li><li><strong>Gerer les tableaux</strong> : Analyse des elements pour determiner le type.</li><li><strong>Ajouter les annotations de type</strong> : Syntaxe PEP 484/604.</li><li><strong>Produire le code source</strong> : Code Python formate avec imports et definitions.</li></ol>',
    h2_codeExamples: 'Exemples de code : JSON vers Python avec Pydantic, dataclasses, TypedDict et attrs',
    codePydanticTitle: 'Pydantic v2 : BaseModel, Field et validateurs',
    codePydanticDesc: 'Pydantic est la bibliotheque JSON vers Python la plus utilisee. FastAPI l\'utilise par defaut :',
    codeDataclassTitle: 'dataclasses + json : @dataclass, dataclass_json, dacite',
    codeDataclassDesc: 'Le module <code>dataclasses</code> integre de Python offre une alternative legere :',
    codeTypedDictTitle: 'TypedDict : annotations de type sans surcout',
    codeTypedDictDesc: 'Quand vous avez besoin de parsing JSON Python avec securite de type mais zero surcout, <code>TypedDict</code> fournit un typage structurel pour les dictionnaires :',
    codeAttrsTitle: 'attrs : @define et cattrs pour les donnees structurees',
    codeAttrsDesc: 'La bibliotheque <code>attrs</code> offre plus de fonctionnalites que dataclasses, incluant validateurs et convertisseurs :',
    h2_nested: 'Travailler avec des structures JSON imbriquees',
    nestedDesc1: 'Les API reelles retournent rarement du JSON plat. La plupart des reponses contiennent des objets imbriques et des types polymorphes :',
    nestedDesc2: '<strong>Modeles imbriques</strong> : Chaque niveau d\'imbrication produit une classe Python separee. Pydantic valide recursivement.',
    nestedDesc3: '<strong>List[Model] et champs Optional</strong> : Un champ comme <code>"items": [{"id": 1}]</code> correspond a <code>list[Item]</code> en Python.',
    nestedDesc4: '<strong>Types Union et unions discriminees</strong> : Le <code>Discriminator</code> de Pydantic offre une deserialisation type-safe.',
    h2_advanced: 'Patterns avances : Pydantic Settings, JSON Schema, validateurs et champs calcules',
    advancedDesc1: '<strong>Pydantic Settings</strong> permet de charger la configuration depuis des fichiers JSON, variables d\'environnement et fichiers .env :',
    advancedDesc2: '<strong>La generation JSON Schema</strong> est integree dans Pydantic v2. Chaque <code>BaseModel</code> peut produire un JSON Schema :',
    advancedDesc3: '<strong>Validateurs personnalises et alias de serialisation</strong> permettent de transformer les donnees et controler les noms de champs :',
    h2_bestPractices: 'Bonnes pratiques pour la conversion JSON vers Python',
    bestPracticesDesc: 'Suivez ces bonnes pratiques pour construire des applications robustes :',
    bp1: '<strong>Utilisez Pydantic pour le code API</strong> : Validation, serialisation et generation JSON Schema incluses.',
    bp2: '<strong>Utilisez dataclasses pour les structures internes</strong> : Conteneurs legers sans surcout de validation.',
    bp3: '<strong>Gerez les champs optionnels explicitement</strong> : <code>Optional[T]</code> ou <code>T | None</code> avec defaut <code>None</code>.',
    bp4: '<strong>Utilisez les alias pour les conventions de nommage</strong> : <code>Field(alias="camelCase")</code> dans Pydantic.',
    bp5: '<strong>Validez tot, echouez vite</strong> : Ajoutez des <code>@field_validator</code> dans Pydantic.',
    bp6: '<strong>Utilisez le mode strict</strong> : <code>ConfigDict(strict=True)</code> previent la coercion implicite.',
    bp7: '<strong>Generez les types depuis JSON Schema</strong> : Utilisez <code>datamodel-code-generator</code> pour auto-generer les modeles.',
    relatedTools: 'Outils connexes : <strong>JSON vers Java</strong>, <strong>JSON vers TypeScript</strong>, <strong>JSON vers Dart</strong>.',
    h2_faq: 'Questions frequemment posees',
    faq1_q: 'Pydantic ou dataclasses : lequel utiliser ?',
    faq1_a: 'Utilisez Pydantic pour la validation, la generation JSON Schema et l\'integration FastAPI. Utilisez dataclasses pour les conteneurs legers sans validation. Pydantic offre aussi un decorateur dataclass qui ajoute la validation aux dataclasses standard.',
    faq2_q: 'Comment convertir un dict Python en dataclass ?',
    faq2_a: 'Pydantic : User.model_validate({"name": "Alice"}). Dataclasses : dacite.from_dict(data_class=User, data=my_dict). Pour les cas simples : User(**my_dict).',
    faq3_q: 'Comment gerer les JSON imbriques avec champs optionnels ?',
    faq3_a: 'Pydantic gere automatiquement les modeles imbriques. Utilisez Optional[NestedModel] = None. Pydantic valide recursivement. Pour dataclasses, utilisez dacite ou dataclasses-json.',
    conclusion: 'La conversion JSON vers Python dataclass est une competence fondamentale. Utilisez notre outil gratuit pour une generation instantanee et consultez ce guide pour les bonnes pratiques.',
    linkToolBottom: 'Convertissez JSON en Python dataclasses instantanement avec notre outil gratuit.',
  },
  de: {
    intro: 'Die Konvertierung von <strong>JSON in Python</strong>-Dataclasses ist eine der haufigsten Aufgaben in der modernen Python-Entwicklung. Wenn Ihre Anwendung eine JSON-Antwort von einer REST-API erhalt, benotigen Sie gut strukturierte Python-Dataclasses, Pydantic-Modelle oder TypedDicts. Dieser Leitfaden behandelt Typ-Mapping, JSON-Parsing-Strategien, Pydantic, attrs, TypedDict und Best Practices.',
    linkTool: 'Testen Sie unseren kostenlosen Online JSON-zu-Python-Dataclass-Konverter.',
    h2_what: 'Was ist JSON-zu-Python-Dataclass-Konvertierung?',
    whatDesc1: 'JSON ist das dominierende Datenaustauschformat fur Web-APIs. Python profitiert enorm von expliziten Typdefinitionen uber Dataclasses, Pydantic-Modelle und TypedDicts. Die JSON-zu-Python-Konvertierung analysiert ein JSON-Dokument und erzeugt entsprechende Python-Klassen.',
    whatDesc2: 'In einer typischen FastAPI-Anwendung empfangt ein Route-Handler den HTTP-Request-Body als JSON-String. Das Framework muss dieses JSON mit Pydantics <code>BaseModel</code> in Python-Objekte konvertieren. Ein JSON-zu-Python-Konverter automatisiert die Erstellung dieser Datenmodelle.',
    whatDesc3: 'Die gleiche Konvertierung ist in Django REST Framework, in Datenpipelines und in CLI-Tools wesentlich. Der Prozess ist identisch: JSON-Struktur inspizieren, Feldtypen bestimmen, Verschachtelung und Arrays behandeln.',
    h2_typeMapping: 'JSON zu Python: Typ-Mapping',
    typeMappingDesc: 'Das Verstandnis der Zuordnung von JSON-Typen zu Python-Typen ist die Grundlage:',
    typeMappingTable: '<table><thead><tr><th>JSON-Typ</th><th>Beispiel</th><th>Python-Typ(en)</th><th>Hinweise</th></tr></thead><tbody><tr><td>string</td><td><code>"hello"</code></td><td><code>str</code></td><td>Immer <code>str</code>; <code>datetime</code> fur ISO-Daten</td></tr><tr><td>number (ganzzahlig)</td><td><code>42</code></td><td><code>int</code></td><td>Beliebige Prazision in Python</td></tr><tr><td>number (dezimal)</td><td><code>3.14</code></td><td><code>float</code>, <code>Decimal</code></td><td><code>Decimal</code> fur Finanzdaten</td></tr><tr><td>boolean</td><td><code>true</code></td><td><code>bool</code></td><td>Direkte Zuordnung</td></tr><tr><td>null</td><td><code>null</code></td><td><code>None</code></td><td><code>Optional[T]</code> oder <code>T | None</code></td></tr><tr><td>array</td><td><code>[1,2]</code></td><td><code>list[T]</code></td><td><code>list[T]</code> ab Python 3.9+</td></tr><tr><td>object</td><td><code>{"k":"v"}</code></td><td>Verschachtelte Klasse</td><td>Stark typisierte Klassen bevorzugt</td></tr></tbody></table>',
    typeMappingExtra: 'Bei der Generierung von Python-Dataclasses aus JSON hangt die Wahl zwischen <code>Optional[str]</code> und <code>str | None</code> von der Python-Version ab. Fur Geldwerte immer <code>Decimal</code> verwenden.',
    h2_howWorks: 'Wie die JSON-zu-Python-Konvertierung funktioniert',
    howWorksDesc: 'Ein JSON-zu-Python-Dataclass-Konverter folgt einem systematischen Prozess:',
    howWorksSteps: '<ol><li><strong>JSON-Struktur parsen</strong>: Parsing mit Pythons eingebautem <code>json</code>-Modul.</li><li><strong>Feldtypen ableiten</strong>: Python-Typ fur jedes Schlussel-Wert-Paar bestimmen.</li><li><strong>Klassennamen generieren</strong>: Konvertierung in PascalCase und snake_case.</li><li><strong>Verschachtelte Objekte behandeln</strong>: Jedes Objekt erzeugt eine separate Klasse.</li><li><strong>Arrays behandeln</strong>: Elementtyp-Analyse.</li><li><strong>Typ-Annotationen hinzufugen</strong>: PEP 484/604 Syntax.</li><li><strong>Quellcode ausgeben</strong>: Formatierter Python-Code.</li></ol>',
    h2_codeExamples: 'Codebeispiele: JSON zu Python mit Pydantic, dataclasses, TypedDict und attrs',
    codePydanticTitle: 'Pydantic v2: BaseModel, Field und Validatoren',
    codePydanticDesc: 'Pydantic ist die am weitesten verbreitete JSON-zu-Python-Bibliothek. FastAPI verwendet sie standardmassig:',
    codeDataclassTitle: 'dataclasses + json: @dataclass, dataclass_json, dacite',
    codeDataclassDesc: 'Pythons eingebautes <code>dataclasses</code>-Modul bietet eine leichtgewichtige Alternative:',
    codeTypedDictTitle: 'TypedDict: Typ-Hinweise ohne Laufzeit-Overhead',
    codeTypedDictDesc: 'Wenn Sie Python-JSON-Parsing mit Typsicherheit aber null Laufzeit-Overhead benotigen:',
    codeAttrsTitle: 'attrs: @define und cattrs fur strukturierte Daten',
    codeAttrsDesc: 'Die <code>attrs</code>-Bibliothek bietet mehr Funktionen als dataclasses, einschliesslich Validatoren und Konverter:',
    h2_nested: 'Arbeiten mit verschachtelten JSON-Strukturen',
    nestedDesc1: 'Reale APIs liefern selten flaches JSON. Die meisten Antworten enthalten verschachtelte Objekte und polymorphe Typen:',
    nestedDesc2: '<strong>Verschachtelte Modelle</strong>: Jede Verschachtelungsebene erzeugt eine separate Python-Klasse. Pydantic validiert rekursiv.',
    nestedDesc3: '<strong>List[Model] und Optional-Felder</strong>: Ein Feld wie <code>"items": [{"id": 1}]</code> wird zu <code>list[Item]</code> in Python.',
    nestedDesc4: '<strong>Union-Typen und diskriminierte Unions</strong>: Pydantics <code>Discriminator</code> bietet typsichere Deserialisierung.',
    h2_advanced: 'Fortgeschrittene Muster: Pydantic Settings, JSON Schema, Validatoren und berechnete Felder',
    advancedDesc1: '<strong>Pydantic Settings</strong> ladt Konfiguration aus JSON-Dateien, Umgebungsvariablen und .env-Dateien:',
    advancedDesc2: '<strong>JSON Schema-Generierung</strong> ist in Pydantic v2 eingebaut. Jedes <code>BaseModel</code> kann ein JSON Schema erzeugen:',
    advancedDesc3: '<strong>Benutzerdefinierte Validatoren und Serialisierungs-Aliase</strong> ermoglichen Datentransformation und Feldnamen-Kontrolle:',
    h2_bestPractices: 'Best Practices fur JSON-zu-Python-Konvertierung',
    bestPracticesDesc: 'Befolgen Sie diese Best Practices fur robuste Anwendungen:',
    bp1: '<strong>Pydantic fur API-Code</strong>: Validierung, Serialisierung und JSON Schema-Generierung inklusive.',
    bp2: '<strong>Dataclasses fur interne Strukturen</strong>: Leichtgewichtige Container ohne Validierungs-Overhead.',
    bp3: '<strong>Optionale Felder explizit behandeln</strong>: <code>Optional[T]</code> oder <code>T | None</code> mit Standard <code>None</code>.',
    bp4: '<strong>Aliase fur Namenskonventionen</strong>: <code>Field(alias="camelCase")</code> in Pydantic.',
    bp5: '<strong>Fruh validieren, schnell fehlschlagen</strong>: <code>@field_validator</code> in Pydantic hinzufugen.',
    bp6: '<strong>Strikten Modus verwenden</strong>: <code>ConfigDict(strict=True)</code> verhindert implizite Typkonvertierung.',
    bp7: '<strong>Typen aus JSON Schema generieren</strong>: <code>datamodel-code-generator</code> fur automatische Modellgenerierung.',
    relatedTools: 'Verwandte Tools: <strong>JSON zu Java</strong>, <strong>JSON zu TypeScript</strong>, <strong>JSON zu Dart</strong>.',
    h2_faq: 'Haufig gestellte Fragen',
    faq1_q: 'Pydantic oder dataclasses: Was soll ich verwenden?',
    faq1_a: 'Verwenden Sie Pydantic fur Validierung, JSON Schema und FastAPI-Integration. Verwenden Sie dataclasses fur leichtgewichtige Container. Pydantic bietet auch einen Dataclass-Dekorator, der Validierung zu Standard-Dataclasses hinzufugt.',
    faq2_q: 'Wie konvertiere ich ein Python-Dict in eine Dataclass?',
    faq2_a: 'Pydantic: User.model_validate({"name": "Alice"}). Dataclasses: dacite.from_dict(data_class=User, data=my_dict). Einfach: User(**my_dict).',
    faq3_q: 'Wie behandle ich verschachteltes JSON mit optionalen Feldern?',
    faq3_a: 'Pydantic behandelt verschachtelte Modelle automatisch. Verwenden Sie Optional[NestedModel] = None. Pydantic validiert rekursiv. Fur dataclasses verwenden Sie dacite oder dataclasses-json.',
    conclusion: 'Die Konvertierung von JSON zu Python-Dataclasses ist eine grundlegende Fahigkeit. Nutzen Sie unser kostenloses Tool fur sofortige Generierung und diesen Leitfaden fur Best Practices.',
    linkToolBottom: 'Konvertieren Sie JSON sofort in Python-Dataclasses mit unserem kostenlosen Tool.',
  },
  es: {
    intro: 'Convertir <strong>JSON a Python</strong> dataclasses es una de las tareas mas comunes en el desarrollo Python moderno. Cuando tu aplicacion recibe una respuesta JSON de una API REST, necesitas dataclasses Python, modelos Pydantic o TypedDicts bien estructurados. Esta guia completa cubre mapeo de tipos, estrategias de parsing JSON, Pydantic, attrs, TypedDict y mejores practicas.',
    linkTool: 'Prueba nuestro convertidor gratuito de JSON a Python Dataclass en linea.',
    h2_what: 'Que es la conversion de JSON a Python Dataclass?',
    whatDesc1: 'JSON es el formato de intercambio de datos dominante para APIs web. Python, aunque dinamicamente tipado, se beneficia enormemente de definiciones de tipos explicitas via dataclasses, modelos Pydantic y TypedDicts. La conversion JSON a Python dataclass analiza un documento JSON y produce las clases Python correspondientes.',
    whatDesc2: 'En una aplicacion FastAPI tipica, un manejador de ruta recibe el cuerpo de la solicitud HTTP como cadena JSON. El framework debe convertir ese JSON en objetos Python usando el <code>BaseModel</code> de Pydantic. Un convertidor JSON a clase Python automatiza la creacion de estos modelos.',
    whatDesc3: 'La misma conversion es esencial en Django REST Framework, en pipelines de datos y en herramientas CLI que leen archivos de configuracion JSON. El proceso es identico: inspeccionar la estructura, determinar tipos, manejar anidamiento.',
    h2_typeMapping: 'JSON a Python: Mapeo de tipos',
    typeMappingDesc: 'Entender como los tipos JSON se mapean a tipos Python es la base de cualquier conversion:',
    typeMappingTable: '<table><thead><tr><th>Tipo JSON</th><th>Ejemplo</th><th>Tipo(s) Python</th><th>Notas</th></tr></thead><tbody><tr><td>string</td><td><code>"hello"</code></td><td><code>str</code></td><td>Siempre <code>str</code>; <code>datetime</code> para fechas ISO</td></tr><tr><td>number (entero)</td><td><code>42</code></td><td><code>int</code></td><td>Precision arbitraria en Python</td></tr><tr><td>number (decimal)</td><td><code>3.14</code></td><td><code>float</code>, <code>Decimal</code></td><td><code>Decimal</code> para datos financieros</td></tr><tr><td>boolean</td><td><code>true</code></td><td><code>bool</code></td><td>Correspondencia directa</td></tr><tr><td>null</td><td><code>null</code></td><td><code>None</code></td><td><code>Optional[T]</code> o <code>T | None</code></td></tr><tr><td>array</td><td><code>[1,2]</code></td><td><code>list[T]</code></td><td><code>list[T]</code> en Python 3.9+</td></tr><tr><td>object</td><td><code>{"k":"v"}</code></td><td>Clase anidada</td><td>Clases tipadas preferidas</td></tr></tbody></table>',
    typeMappingExtra: 'Al generar dataclasses Python desde JSON, la eleccion entre <code>Optional[str]</code> y <code>str | None</code> depende de la version de Python. Para valores monetarios, usa siempre <code>Decimal</code>.',
    h2_howWorks: 'Como funciona la conversion JSON a Python',
    howWorksDesc: 'Un convertidor JSON a Python dataclass sigue un proceso sistematico:',
    howWorksSteps: '<ol><li><strong>Analizar la estructura JSON</strong>: Parsing con el modulo <code>json</code> integrado de Python.</li><li><strong>Inferir tipos de campo</strong>: Determinar el tipo Python para cada par clave-valor.</li><li><strong>Generar nombres de clase</strong>: Conversion a PascalCase y snake_case.</li><li><strong>Manejar objetos anidados</strong>: Cada objeto anidado genera una clase separada.</li><li><strong>Manejar arrays</strong>: Analisis del tipo de elemento.</li><li><strong>Agregar anotaciones de tipo</strong>: Sintaxis PEP 484/604.</li><li><strong>Producir codigo fuente</strong>: Codigo Python formateado.</li></ol>',
    h2_codeExamples: 'Ejemplos de codigo: JSON a Python con Pydantic, dataclasses, TypedDict y attrs',
    codePydanticTitle: 'Pydantic v2: BaseModel, Field y validadores',
    codePydanticDesc: 'Pydantic es la biblioteca JSON a Python mas utilizada. FastAPI la usa por defecto:',
    codeDataclassTitle: 'dataclasses + json: @dataclass, dataclass_json, dacite',
    codeDataclassDesc: 'El modulo <code>dataclasses</code> integrado de Python ofrece una alternativa ligera:',
    codeTypedDictTitle: 'TypedDict: anotaciones de tipo sin sobrecarga',
    codeTypedDictDesc: 'Cuando necesitas parsing JSON Python con seguridad de tipo pero cero sobrecarga en tiempo de ejecucion:',
    codeAttrsTitle: 'attrs: @define y cattrs para datos estructurados',
    codeAttrsDesc: 'La biblioteca <code>attrs</code> ofrece mas funciones que dataclasses, incluyendo validadores y conversores:',
    h2_nested: 'Trabajar con estructuras JSON anidadas',
    nestedDesc1: 'Las APIs reales rara vez devuelven JSON plano. La mayoria contiene objetos anidados y tipos polimorficos:',
    nestedDesc2: '<strong>Modelos anidados</strong>: Cada nivel de anidamiento produce una clase Python separada. Pydantic valida recursivamente.',
    nestedDesc3: '<strong>List[Model] y campos Optional</strong>: Un campo como <code>"items": [{"id": 1}]</code> se mapea a <code>list[Item]</code> en Python.',
    nestedDesc4: '<strong>Tipos Union y uniones discriminadas</strong>: El <code>Discriminator</code> de Pydantic ofrece deserializacion type-safe.',
    h2_advanced: 'Patrones avanzados: Pydantic Settings, JSON Schema, validadores y campos calculados',
    advancedDesc1: '<strong>Pydantic Settings</strong> permite cargar configuracion desde archivos JSON, variables de entorno y archivos .env:',
    advancedDesc2: '<strong>La generacion de JSON Schema</strong> esta integrada en Pydantic v2. Cada <code>BaseModel</code> puede producir un JSON Schema:',
    advancedDesc3: '<strong>Validadores personalizados y alias de serializacion</strong> permiten transformar datos y controlar nombres de campos:',
    h2_bestPractices: 'Mejores practicas para conversion JSON a Python',
    bestPracticesDesc: 'Sigue estas mejores practicas para aplicaciones robustas:',
    bp1: '<strong>Usa Pydantic para codigo API</strong>: Validacion, serializacion y generacion JSON Schema incluidas.',
    bp2: '<strong>Usa dataclasses para estructuras internas</strong>: Contenedores ligeros sin sobrecarga de validacion.',
    bp3: '<strong>Maneja campos opcionales explicitamente</strong>: <code>Optional[T]</code> o <code>T | None</code> con defecto <code>None</code>.',
    bp4: '<strong>Usa alias para convenciones de nombres</strong>: <code>Field(alias="camelCase")</code> en Pydantic.',
    bp5: '<strong>Valida temprano, falla rapido</strong>: Agrega <code>@field_validator</code> en Pydantic.',
    bp6: '<strong>Usa modo estricto</strong>: <code>ConfigDict(strict=True)</code> previene coercion implicita.',
    bp7: '<strong>Genera tipos desde JSON Schema</strong>: Usa <code>datamodel-code-generator</code> para auto-generar modelos.',
    relatedTools: 'Herramientas relacionadas: <strong>JSON a Java</strong>, <strong>JSON a TypeScript</strong>, <strong>JSON a Dart</strong>.',
    h2_faq: 'Preguntas frecuentes',
    faq1_q: 'Pydantic o dataclasses: cual debo usar?',
    faq1_a: 'Usa Pydantic para validacion, generacion JSON Schema e integracion FastAPI. Usa dataclasses para contenedores ligeros. Pydantic ofrece un decorador dataclass que agrega validacion a dataclasses estandar.',
    faq2_q: 'Como convierto un dict Python a dataclass?',
    faq2_a: 'Pydantic: User.model_validate({"name": "Alice"}). Dataclasses: dacite.from_dict(data_class=User, data=my_dict). Simple: User(**my_dict).',
    faq3_q: 'Como manejar JSON anidado con campos opcionales?',
    faq3_a: 'Pydantic maneja modelos anidados automaticamente. Usa Optional[NestedModel] = None. Pydantic valida recursivamente. Para dataclasses, usa dacite o dataclasses-json.',
    conclusion: 'Convertir JSON a Python dataclasses es una habilidad fundamental. Usa nuestra herramienta gratuita para generacion instantanea y consulta esta guia para mejores practicas.',
    linkToolBottom: 'Convierte JSON a Python dataclasses al instante con nuestra herramienta gratuita.',
  },
  ja: {
    intro: '<strong>JSONからPython</strong>データクラスへの変換は、モダンなPython開発で最も一般的なタスクの一つです。REST APIからJSON応答を受信する際、データを安全に扱うために適切に構造化されたPythonデータクラス、Pydanticモデル、またはTypedDictが必要です。この包括的なガイドでは、型マッピング、Python JSONパース戦略、Pydantic、attrs、TypedDict、ベストプラクティスをカバーします。',
    linkTool: '無料オンラインJSON to Pythonデータクラスコンバーターをお試しください。',
    h2_what: 'JSON to Pythonデータクラス変換とは？',
    whatDesc1: 'JSONはWeb API、設定ファイル、NoSQLデータベースの主要なデータ交換フォーマットです。Pythonは動的型付け言語ですが、データクラス、Pydanticモデル、TypedDictによる明示的な型定義から大きな恩恵を受けます。JSON to Pythonデータクラス変換はJSONドキュメントを分析し、対応するPythonクラスを生成します。',
    whatDesc2: '典型的なFastAPIアプリケーションでは、ルートハンドラーがJSON文字列としてHTTPリクエストボディを受信します。フレームワークはPydanticの<code>BaseModel</code>を使用してJSONをPythonオブジェクトに変換する必要があります。JSON to Pythonクラスコンバーターはこれらのデータモデルの作成を自動化します。',
    whatDesc3: 'Django REST Framework、データパイプライン、JSON設定ファイルを読むCLIツールでも同じ変換が必要です。プロセスは同一です：JSON構造の検査、型の決定、ネストと配列の処理。',
    h2_typeMapping: 'JSON to Python：型マッピング',
    typeMappingDesc: 'JSONの型がPythonの型にどのようにマッピングされるかを理解することが変換の基盤です：',
    typeMappingTable: '<table><thead><tr><th>JSON型</th><th>例</th><th>Python型</th><th>備考</th></tr></thead><tbody><tr><td>string</td><td><code>"hello"</code></td><td><code>str</code></td><td>常に<code>str</code>；ISO日付には<code>datetime</code></td></tr><tr><td>number（整数）</td><td><code>42</code></td><td><code>int</code></td><td>Pythonでは任意精度</td></tr><tr><td>number（小数）</td><td><code>3.14</code></td><td><code>float</code>、<code>Decimal</code></td><td>金融データには<code>Decimal</code></td></tr><tr><td>boolean</td><td><code>true</code></td><td><code>bool</code></td><td>直接対応</td></tr><tr><td>null</td><td><code>null</code></td><td><code>None</code></td><td><code>Optional[T]</code>または<code>T | None</code></td></tr><tr><td>array</td><td><code>[1,2]</code></td><td><code>list[T]</code></td><td>Python 3.9+で<code>list[T]</code></td></tr><tr><td>object</td><td><code>{"k":"v"}</code></td><td>ネストクラス</td><td>強い型付けクラス推奨</td></tr></tbody></table>',
    typeMappingExtra: 'JSONからPythonデータクラスを生成する際、<code>Optional[str]</code>と<code>str | None</code>の選択はPythonバージョンに依存します。金額には常に<code>Decimal</code>を使用してください。',
    h2_howWorks: 'JSON to Python変換の仕組み',
    howWorksDesc: 'JSON to Pythonデータクラスコンバーターは体系的なプロセスに従います：',
    howWorksSteps: '<ol><li><strong>JSON構造を解析</strong>：Python組み込みの<code>json</code>モジュールでパース。</li><li><strong>フィールド型を推論</strong>：各キーバリューペアのPython型を決定。</li><li><strong>クラス名を生成</strong>：PascalCaseとsnake_caseに変換。</li><li><strong>ネストオブジェクトを処理</strong>：各オブジェクトが別クラスを生成。</li><li><strong>配列を処理</strong>：要素型を分析。</li><li><strong>型アノテーションを追加</strong>：PEP 484/604構文。</li><li><strong>ソースコードを出力</strong>：フォーマットされたPythonコード。</li></ol>',
    h2_codeExamples: 'コード例：Pydantic、dataclasses、TypedDict、attrsでJSON to Python',
    codePydanticTitle: 'Pydantic v2：BaseModel、Field、バリデーター',
    codePydanticDesc: 'PydanticはPythonエコシステムで最も広く使用されているJSON to Pythonライブラリです。FastAPIはデフォルトで使用します：',
    codeDataclassTitle: 'dataclasses + json：@dataclass、dataclass_json、dacite',
    codeDataclassDesc: 'Python組み込みの<code>dataclasses</code>モジュールは軽量な代替手段を提供します：',
    codeTypedDictTitle: 'TypedDict：ランタイムオーバーヘッドなしの型ヒント',
    codeTypedDictDesc: '型安全だがゼロランタイムオーバーヘッドのPython JSONパースが必要な場合、<code>TypedDict</code>が辞書の構造的型付けを提供します：',
    codeAttrsTitle: 'attrs：@defineとcattrsで構造化データ',
    codeAttrsDesc: '<code>attrs</code>ライブラリはdataclassesより多くの機能を提供し、バリデーターとコンバーターを含みます：',
    h2_nested: 'ネストされたJSON構造の操作',
    nestedDesc1: '実際のAPIはフラットなJSONを返すことは稀です。ほとんどのレスポンスはネストされたオブジェクトとポリモーフィック型を含みます：',
    nestedDesc2: '<strong>ネストモデル</strong>：各ネストレベルが別のPythonクラスを生成します。Pydanticは再帰的に検証します。',
    nestedDesc3: '<strong>List[Model]とOptionalフィールド</strong>：<code>"items": [{"id": 1}]</code>はPythonで<code>list[Item]</code>にマッピングされます。',
    nestedDesc4: '<strong>Union型と判別ユニオン</strong>：Pydanticの<code>Discriminator</code>が型安全なデシリアライゼーションを提供します。',
    h2_advanced: '高度なパターン：Pydantic Settings、JSON Schema、カスタムバリデーター、計算フィールド',
    advancedDesc1: '<strong>Pydantic Settings</strong>はJSONファイル、環境変数、.envファイルから型付きモデルに設定を読み込みます：',
    advancedDesc2: '<strong>JSON Schema生成</strong>はPydantic v2に組み込まれています。各<code>BaseModel</code>がJSON Schemaを生成できます：',
    advancedDesc3: '<strong>カスタムバリデーターとシリアライゼーションエイリアス</strong>でデータ変換とフィールド名制御が可能です：',
    h2_bestPractices: 'JSON to Python変換のベストプラクティス',
    bestPracticesDesc: '堅牢なアプリケーションを構築するためのベストプラクティス：',
    bp1: '<strong>APIコードにはPydantic</strong>：バリデーション、シリアライゼーション、JSON Schema生成を含みます。',
    bp2: '<strong>内部構造にはdataclasses</strong>：バリデーションオーバーヘッドなしの軽量コンテナ。',
    bp3: '<strong>Optionalフィールドを明示的に処理</strong>：<code>Optional[T]</code>または<code>T | None</code>、デフォルト<code>None</code>。',
    bp4: '<strong>命名規則のミスマッチにエイリアスを使用</strong>：Pydanticの<code>Field(alias="camelCase")</code>。',
    bp5: '<strong>早期バリデーション、早期失敗</strong>：Pydanticで<code>@field_validator</code>を追加。',
    bp6: '<strong>厳格モードを使用</strong>：<code>ConfigDict(strict=True)</code>で暗黙の型変換を防止。',
    bp7: '<strong>JSON Schemaから型を生成</strong>：<code>datamodel-code-generator</code>でモデルを自動生成。',
    relatedTools: '関連ツール：<strong>JSON to Java</strong>、<strong>JSON to TypeScript</strong>、<strong>JSON to Dart</strong>。',
    h2_faq: 'よくある質問',
    faq1_q: 'Pydanticとdataclasses：どちらを使うべき？',
    faq1_a: 'バリデーション、JSON Schema生成、FastAPI統合にはPydanticを使用。軽量コンテナにはdataclassesを使用。Pydanticはdataclassデコレーターでdataclassesにバリデーションを追加することもできます。',
    faq2_q: 'PythonのdictをDataclassに自動変換するには？',
    faq2_a: 'Pydantic：User.model_validate({"name": "Alice"})。dataclasses：dacite.from_dict(data_class=User, data=my_dict)。シンプル：User(**my_dict)。',
    faq3_q: 'OptionalフィールドのあるネストされたJSONをどう処理する？',
    faq3_a: 'Pydanticはネストモデルを自動処理。Optional[NestedModel] = Noneを使用。Pydanticは再帰的に検証。dataclassesにはdaciteまたはdataclasses-jsonを使用。',
    conclusion: 'JSONからPythonデータクラスへの変換は、API、設定ファイル、データパイプラインを扱うすべてのPython開発者の基本スキルです。無料オンラインツールで即座にコードを生成し、本ガイドでベストプラクティスを参照してください。',
    linkToolBottom: '無料オンラインツールでJSONをPythonデータクラスに即座に変換。',
  },
  ko: {
    intro: '<strong>JSON을 Python</strong> 데이터클래스로 변환하는 것은 현대 Python 개발에서 가장 일반적인 작업 중 하나입니다. REST API에서 JSON 응답을 받을 때 데이터를 안전하게 다루기 위해 잘 구조화된 Python 데이터클래스, Pydantic 모델 또는 TypedDict가 필요합니다. 이 종합 가이드는 타입 매핑, Python JSON 파싱 전략, Pydantic, attrs, TypedDict, 모범 사례를 다룹니다.',
    linkTool: '무료 온라인 JSON to Python 데이터클래스 변환기를 사용해 보세요.',
    h2_what: 'JSON to Python 데이터클래스 변환이란?',
    whatDesc1: 'JSON은 웹 API, 구성 파일, NoSQL 데이터베이스의 지배적인 데이터 교환 형식입니다. Python은 동적 타입 언어이지만 데이터클래스, Pydantic 모델, TypedDict를 통한 명시적 타입 정의에서 큰 이점을 얻습니다. JSON to Python 데이터클래스 변환은 JSON 문서를 분석하여 대응하는 Python 클래스를 생성합니다.',
    whatDesc2: '일반적인 FastAPI 애플리케이션에서 라우트 핸들러는 JSON 문자열로 HTTP 요청 본문을 받습니다. 프레임워크는 Pydantic의 <code>BaseModel</code>을 사용하여 JSON을 Python 객체로 변환해야 합니다. JSON to Python 클래스 변환기는 이러한 데이터 모델 생성을 자동화합니다.',
    whatDesc3: 'Django REST Framework, 데이터 파이프라인, JSON 구성 파일을 읽는 CLI 도구에서도 동일한 변환이 필요합니다. 프로세스는 동일합니다: JSON 구조 검사, 타입 결정, 중첩과 배열 처리.',
    h2_typeMapping: 'JSON to Python: 타입 매핑',
    typeMappingDesc: 'JSON 타입이 Python 타입에 어떻게 매핑되는지 이해하는 것이 변환의 기초입니다:',
    typeMappingTable: '<table><thead><tr><th>JSON 타입</th><th>예시</th><th>Python 타입</th><th>참고</th></tr></thead><tbody><tr><td>string</td><td><code>"hello"</code></td><td><code>str</code></td><td>항상 <code>str</code>; ISO 날짜에는 <code>datetime</code></td></tr><tr><td>number(정수)</td><td><code>42</code></td><td><code>int</code></td><td>Python에서 임의 정밀도</td></tr><tr><td>number(소수)</td><td><code>3.14</code></td><td><code>float</code>, <code>Decimal</code></td><td>금융 데이터에는 <code>Decimal</code></td></tr><tr><td>boolean</td><td><code>true</code></td><td><code>bool</code></td><td>직접 대응</td></tr><tr><td>null</td><td><code>null</code></td><td><code>None</code></td><td><code>Optional[T]</code> 또는 <code>T | None</code></td></tr><tr><td>array</td><td><code>[1,2]</code></td><td><code>list[T]</code></td><td>Python 3.9+에서 <code>list[T]</code></td></tr><tr><td>object</td><td><code>{"k":"v"}</code></td><td>중첩 클래스</td><td>강한 타입 클래스 권장</td></tr></tbody></table>',
    typeMappingExtra: 'JSON에서 Python 데이터클래스를 생성할 때 <code>Optional[str]</code>과 <code>str | None</code>의 선택은 Python 버전에 따라 다릅니다. 금액에는 항상 <code>Decimal</code>을 사용하세요.',
    h2_howWorks: 'JSON to Python 변환 작동 원리',
    howWorksDesc: 'JSON to Python 데이터클래스 변환기는 체계적인 프로세스를 따릅니다:',
    howWorksSteps: '<ol><li><strong>JSON 구조 파싱</strong>: Python 내장 <code>json</code> 모듈로 파싱.</li><li><strong>필드 타입 추론</strong>: 각 키-값 쌍의 Python 타입 결정.</li><li><strong>클래스 이름 생성</strong>: PascalCase와 snake_case로 변환.</li><li><strong>중첩 객체 처리</strong>: 각 객체가 별도 클래스 생성.</li><li><strong>배열 처리</strong>: 요소 타입 분석.</li><li><strong>타입 어노테이션 추가</strong>: PEP 484/604 구문.</li><li><strong>소스 코드 출력</strong>: 포맷된 Python 코드.</li></ol>',
    h2_codeExamples: '코드 예제: Pydantic, dataclasses, TypedDict, attrs로 JSON to Python',
    codePydanticTitle: 'Pydantic v2: BaseModel, Field, 유효성 검사기',
    codePydanticDesc: 'Pydantic은 가장 널리 사용되는 JSON to Python 라이브러리입니다. FastAPI가 기본으로 사용합니다:',
    codeDataclassTitle: 'dataclasses + json: @dataclass, dataclass_json, dacite',
    codeDataclassDesc: 'Python 내장 <code>dataclasses</code> 모듈은 가벼운 대안을 제공합니다:',
    codeTypedDictTitle: 'TypedDict: 런타임 오버헤드 없는 타입 힌트',
    codeTypedDictDesc: '타입 안전하지만 제로 런타임 오버헤드의 Python JSON 파싱이 필요할 때:',
    codeAttrsTitle: 'attrs: @define과 cattrs로 구조화된 데이터',
    codeAttrsDesc: '<code>attrs</code> 라이브러리는 dataclasses보다 더 많은 기능을 제공합니다:',
    h2_nested: '중첩 JSON 구조 작업',
    nestedDesc1: '실제 API는 플랫 JSON을 반환하는 경우가 드뭅니다. 대부분 중첩된 객체와 다형적 타입을 포함합니다:',
    nestedDesc2: '<strong>중첩 모델</strong>: 각 중첩 레벨이 별도의 Python 클래스를 생성합니다. Pydantic은 재귀적으로 검증합니다.',
    nestedDesc3: '<strong>List[Model]과 Optional 필드</strong>: <code>"items": [{"id": 1}]</code>은 Python에서 <code>list[Item]</code>으로 매핑됩니다.',
    nestedDesc4: '<strong>Union 타입과 판별 유니온</strong>: Pydantic의 <code>Discriminator</code>가 타입 안전한 역직렬화를 제공합니다.',
    h2_advanced: '고급 패턴: Pydantic Settings, JSON Schema, 커스텀 유효성 검사기, 계산 필드',
    advancedDesc1: '<strong>Pydantic Settings</strong>는 JSON 파일, 환경 변수, .env 파일에서 타입화된 모델로 설정을 로드합니다:',
    advancedDesc2: '<strong>JSON Schema 생성</strong>은 Pydantic v2에 내장되어 있습니다. 각 <code>BaseModel</code>이 JSON Schema를 생성할 수 있습니다:',
    advancedDesc3: '<strong>커스텀 유효성 검사기와 직렬화 별칭</strong>으로 데이터 변환과 필드 이름 제어가 가능합니다:',
    h2_bestPractices: 'JSON to Python 변환 모범 사례',
    bestPracticesDesc: '견고한 애플리케이션 구축을 위한 모범 사례:',
    bp1: '<strong>API 코드에는 Pydantic</strong>: 유효성 검사, 직렬화, JSON Schema 생성 포함.',
    bp2: '<strong>내부 구조에는 dataclasses</strong>: 유효성 검사 오버헤드 없는 가벼운 컨테이너.',
    bp3: '<strong>Optional 필드를 명시적으로 처리</strong>: <code>Optional[T]</code> 또는 <code>T | None</code>, 기본값 <code>None</code>.',
    bp4: '<strong>이름 규칙 불일치에 별칭 사용</strong>: Pydantic의 <code>Field(alias="camelCase")</code>.',
    bp5: '<strong>조기 검증, 빠른 실패</strong>: Pydantic에서 <code>@field_validator</code> 추가.',
    bp6: '<strong>엄격 모드 사용</strong>: <code>ConfigDict(strict=True)</code>로 암묵적 타입 변환 방지.',
    bp7: '<strong>JSON Schema에서 타입 생성</strong>: <code>datamodel-code-generator</code>로 모델 자동 생성.',
    relatedTools: '관련 도구: <strong>JSON to Java</strong>, <strong>JSON to TypeScript</strong>, <strong>JSON to Dart</strong>.',
    h2_faq: '자주 묻는 질문',
    faq1_q: 'Pydantic과 dataclasses 중 어떤 것을 사용해야 하나요?',
    faq1_a: '유효성 검사, JSON Schema 생성, FastAPI 통합에는 Pydantic을 사용하세요. 가벼운 컨테이너에는 dataclasses를 사용하세요. Pydantic은 dataclass 데코레이터로 표준 dataclasses에 유효성 검사를 추가할 수도 있습니다.',
    faq2_q: 'Python dict를 Dataclass로 자동 변환하려면?',
    faq2_a: 'Pydantic: User.model_validate({"name": "Alice"}). dataclasses: dacite.from_dict(data_class=User, data=my_dict). 간단히: User(**my_dict).',
    faq3_q: 'Optional 필드가 있는 중첩 JSON을 어떻게 처리하나요?',
    faq3_a: 'Pydantic은 중첩 모델을 자동 처리합니다. Optional[NestedModel] = None을 사용하세요. Pydantic은 재귀적으로 검증합니다. dataclasses에는 dacite 또는 dataclasses-json을 사용하세요.',
    conclusion: 'JSON에서 Python 데이터클래스로의 변환은 API, 설정 파일, 데이터 파이프라인을 다루는 모든 Python 개발자의 기본 기술입니다. 무료 온라인 도구로 즉시 코드를 생성하고 본 가이드에서 모범 사례를 참조하세요.',
    linkToolBottom: '무료 온라인 도구로 JSON을 Python 데이터클래스로 즉시 변환하세요.',
  },
};

export default function JsonToPythonDataclassGuide({ lang }: { lang: string }) {
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
      <p><Link href={`/${lang}/tools/json-to-python`} style={{ fontWeight: 600 }}>{s.linkTool}</Link></p>

      {/* Section 1: What is JSON to Python Dataclass Conversion? */}
      <h2>{s.h2_what}</h2>
      <p dangerouslySetInnerHTML={{ __html: s.whatDesc1 }} />
      <p dangerouslySetInnerHTML={{ __html: s.whatDesc2 }} />
      <p dangerouslySetInnerHTML={{ __html: s.whatDesc3 }} />

      {/* Section 2: JSON to Python Type Mapping */}
      <h2>{s.h2_typeMapping}</h2>
      <p>{s.typeMappingDesc}</p>
      <div dangerouslySetInnerHTML={{ __html: s.typeMappingTable }} />
      <p dangerouslySetInnerHTML={{ __html: s.typeMappingExtra }} />

      {/* Section 3: How JSON to Python Conversion Works */}
      <h2>{s.h2_howWorks}</h2>
      <p dangerouslySetInnerHTML={{ __html: s.howWorksDesc }} />
      <div dangerouslySetInnerHTML={{ __html: s.howWorksSteps }} />

      {/* Section 4: Code Examples */}
      <h2>{s.h2_codeExamples}</h2>

      <h3>{s.codePydanticTitle}</h3>
      <p dangerouslySetInnerHTML={{ __html: s.codePydanticDesc }} />
      <pre><code>{`# === Sample JSON ===
# {
#   "user_id": 1001,
#   "user_name": "Alice",
#   "email": "alice@example.com",
#   "is_active": true,
#   "balance": 1250.75,
#   "tags": ["admin", "developer"],
#   "address": {
#     "street": "123 Main St",
#     "city": "Springfield",
#     "zip_code": "62704"
#   }
# }

# === Pydantic v2 Models ===
from pydantic import BaseModel, Field, field_validator, ConfigDict
from typing import Optional


class Address(BaseModel):
    street: str
    city: str
    zip_code: str = Field(alias="zipCode")

    model_config = ConfigDict(populate_by_name=True)


class User(BaseModel):
    user_id: int
    user_name: str
    email: str
    is_active: bool = True
    balance: float = 0.0
    tags: list[str] = []
    address: Optional[Address] = None

    @field_validator("email")
    @classmethod
    def validate_email(cls, v: str) -> str:
        if "@" not in v:
            raise ValueError("Invalid email address")
        return v.lower().strip()

    model_config = ConfigDict(populate_by_name=True)


# === Parsing JSON string directly ===
json_string = '{"user_id": 1001, "user_name": "Alice", ...}'
user = User.model_validate_json(json_string)

# === Parsing from dict ===
data = {"user_id": 1001, "user_name": "Alice", "email": "alice@example.com"}
user = User.model_validate(data)

# === Serialization ===
print(user.model_dump())          # dict output
print(user.model_dump_json())     # JSON string output

# === List of models ===
from pydantic import TypeAdapter

users_adapter = TypeAdapter(list[User])
users = users_adapter.validate_json(json_array_string)`}</code></pre>

      <h3>{s.codeDataclassTitle}</h3>
      <p dangerouslySetInnerHTML={{ __html: s.codeDataclassDesc }} />
      <pre><code>{`from dataclasses import dataclass, field
from typing import Optional
import json

# === Standard dataclass ===
@dataclass
class Address:
    street: str
    city: str
    zip_code: str

@dataclass
class User:
    user_id: int
    user_name: str
    email: str
    is_active: bool = True
    balance: float = 0.0
    tags: list[str] = field(default_factory=list)
    address: Optional[Address] = None

    def __post_init__(self):
        # Convert nested dict to Address if needed
        if isinstance(self.address, dict):
            self.address = Address(**self.address)

# === Parse from JSON ===
raw = json.loads(json_string)
user = User(**raw)

# === Using dacite for nested structures ===
import dacite

data = json.loads(json_string)
user = dacite.from_dict(data_class=User, data=data)
# dacite handles nested dicts, Optional, Union automatically

# === Using dataclasses-json ===
from dataclasses_json import dataclass_json, LetterCase, config

@dataclass_json(letter_case=LetterCase.CAMEL)
@dataclass
class Product:
    product_id: int
    product_name: str
    unit_price: float
    in_stock: bool = True

# Direct JSON parsing
product = Product.from_json('{"productId": 42, "productName": "Keyboard", ...}')

# Direct JSON serialization
json_output = product.to_json()

# === Frozen (immutable) dataclass ===
@dataclass(frozen=True, slots=True)
class ImmutableConfig:
    host: str
    port: int
    debug: bool = False`}</code></pre>

      <h3>{s.codeTypedDictTitle}</h3>
      <p dangerouslySetInnerHTML={{ __html: s.codeTypedDictDesc }} />
      <pre><code>{`from typing import TypedDict, NotRequired
import json

# === TypedDict definitions ===
class Address(TypedDict):
    street: str
    city: str
    zip_code: str

class User(TypedDict):
    user_id: int
    user_name: str
    email: str
    is_active: bool
    balance: float
    tags: list[str]
    address: NotRequired[Address]  # Python 3.11+

# === Parse JSON with type safety ===
raw: str = '{"user_id": 1001, "user_name": "Alice", ...}'
data: User = json.loads(raw)  # type checker knows the shape

# Access with full IDE autocompletion
print(data["user_name"])   # str
print(data["balance"])     # float
print(data["tags"])        # list[str]

# === TypedDict with total=False for all-optional ===
class PartialUpdate(TypedDict, total=False):
    user_name: str
    email: str
    is_active: bool

# === Combining Required and Optional fields ===
class BaseUser(TypedDict):
    user_id: int        # required
    user_name: str      # required

class FullUser(BaseUser, total=False):
    email: str          # optional
    is_active: bool     # optional
    tags: list[str]     # optional

# TypedDict has ZERO runtime overhead:
# no validation, no classes instantiated
# purely for static type checking with mypy/pyright`}</code></pre>

      <h3>{s.codeAttrsTitle}</h3>
      <p dangerouslySetInnerHTML={{ __html: s.codeAttrsDesc }} />
      <pre><code>{`import attrs
from attrs import define, field, validators
import cattrs
import json

# === attrs with @define (modern API) ===
@define
class Address:
    street: str
    city: str
    zip_code: str

@define
class User:
    user_id: int
    user_name: str
    email: str = field(validator=validators.matches_re(r".+@.+\\..+"))
    is_active: bool = True
    balance: float = 0.0
    tags: list[str] = field(factory=list)
    address: Address | None = None

# === cattrs for JSON structuring/unstructuring ===
converter = cattrs.Converter()

# Structure (dict -> attrs class)
raw = json.loads(json_string)
user = converter.structure(raw, User)

# Unstructure (attrs class -> dict)
data = converter.unstructure(user)
json_output = json.dumps(data)

# === Custom hooks for field name mapping ===
converter.register_structure_hook(
    User,
    cattrs.gen.make_dict_structure_fn(
        User,
        converter,
        user_id=cattrs.gen.override(rename="userId"),
        user_name=cattrs.gen.override(rename="userName"),
    )
)

# Now parses camelCase JSON keys to snake_case fields
camel_data = {"userId": 1, "userName": "Alice", "email": "a@b.com"}
user = converter.structure(camel_data, User)

# === Frozen attrs class (immutable) ===
@define(frozen=True)
class Config:
    host: str
    port: int
    debug: bool = False`}</code></pre>

      {/* Section 5: Working with Nested JSON */}
      <h2>{s.h2_nested}</h2>
      <p dangerouslySetInnerHTML={{ __html: s.nestedDesc1 }} />
      <p dangerouslySetInnerHTML={{ __html: s.nestedDesc2 }} />
      <p dangerouslySetInnerHTML={{ __html: s.nestedDesc3 }} />
      <p dangerouslySetInnerHTML={{ __html: s.nestedDesc4 }} />
      <pre><code>{`# Discriminated union with Pydantic v2
from pydantic import BaseModel, Discriminator, Tag, TypeAdapter
from typing import Annotated, Literal, Union


class EmailNotification(BaseModel):
    type: Literal["email"]
    message: str
    recipient: str
    subject: str


class SmsNotification(BaseModel):
    type: Literal["sms"]
    message: str
    phone_number: str


class PushNotification(BaseModel):
    type: Literal["push"]
    message: str
    device_token: str
    title: str


Notification = Annotated[
    Union[
        Annotated[EmailNotification, Tag("email")],
        Annotated[SmsNotification, Tag("sms")],
        Annotated[PushNotification, Tag("push")],
    ],
    Discriminator("type"),
]

# Usage:
data = {"type": "email", "message": "Hello", "recipient": "a@b.com", "subject": "Hi"}
notif = TypeAdapter(Notification).validate_python(data)
isinstance(notif, EmailNotification)  # True

# JSON input automatically resolves to the correct type
json_str = '{"type": "sms", "message": "Alert", "phone_number": "+1234567890"}'
sms = TypeAdapter(Notification).validate_json(json_str)
isinstance(sms, SmsNotification)  # True`}</code></pre>

      {/* Section 6: Advanced Patterns */}
      <h2>{s.h2_advanced}</h2>
      <p dangerouslySetInnerHTML={{ __html: s.advancedDesc1 }} />
      <pre><code>{`from pydantic_settings import BaseSettings, SettingsConfigDict
from pydantic import Field

class AppSettings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        json_file="config.json",
    )

    app_name: str = "MyApp"
    debug: bool = False
    database_url: str = Field(alias="DATABASE_URL")
    redis_url: str = "redis://localhost:6379"
    max_connections: int = 100

# Loads from config.json, .env, and environment variables
# Priority: env vars > .env file > json file > defaults
settings = AppSettings()
print(settings.database_url)
print(settings.max_connections)`}</code></pre>

      <p dangerouslySetInnerHTML={{ __html: s.advancedDesc2 }} />
      <pre><code>{`from pydantic import BaseModel
import json

class Product(BaseModel):
    id: int
    name: str
    price: float
    tags: list[str] = []

# Generate JSON Schema
schema = Product.model_json_schema()
print(json.dumps(schema, indent=2))
# Output:
# {
#   "title": "Product",
#   "type": "object",
#   "properties": {
#     "id": {"title": "Id", "type": "integer"},
#     "name": {"title": "Name", "type": "string"},
#     "price": {"title": "Price", "type": "number"},
#     "tags": {"title": "Tags", "type": "array",
#              "items": {"type": "string"}, "default": []}
#   },
#   "required": ["id", "name", "price"]
# }

# Use schema for API docs, validation, or code generation
# FastAPI uses this automatically for OpenAPI documentation`}</code></pre>

      <p dangerouslySetInnerHTML={{ __html: s.advancedDesc3 }} />
      <pre><code>{`from pydantic import BaseModel, Field, field_validator, computed_field
from datetime import datetime

class User(BaseModel):
    first_name: str = Field(alias="firstName")
    last_name: str = Field(alias="lastName")
    email: str
    birth_date: datetime = Field(alias="birthDate")

    @field_validator("email")
    @classmethod
    def validate_email(cls, v: str) -> str:
        if "@" not in v:
            raise ValueError("Invalid email address")
        return v.lower().strip()

    @computed_field
    @property
    def full_name(self) -> str:
        return f"{self.first_name} {self.last_name}"

    @computed_field
    @property
    def age(self) -> int:
        today = datetime.now()
        return today.year - self.birth_date.year

# Parse from JSON with camelCase keys
user = User.model_validate_json(
    '{"firstName":"Alice","lastName":"Smith",'
    '"email":"ALICE@example.com","birthDate":"1990-05-15T00:00:00"}'
)
print(user.full_name)  # "Alice Smith"
print(user.email)      # "alice@example.com"
print(user.age)        # computed from birth_date

# Computed fields appear in serialized output
print(user.model_dump())
# {"first_name": "Alice", "last_name": "Smith",
#  "email": "alice@example.com", "birth_date": ...,
#  "full_name": "Alice Smith", "age": 35}`}</code></pre>

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

      <p style={{ marginTop: 32 }} dangerouslySetInnerHTML={{ __html: s.conclusion }} />
      <p><Link href={`/${lang}/tools/json-to-python`} style={{ fontWeight: 600 }}>{s.linkToolBottom}</Link></p>
    </>
  );
}
