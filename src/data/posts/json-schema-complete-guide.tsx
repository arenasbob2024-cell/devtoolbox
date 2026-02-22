import Link from 'next/link';

const t: Record<string, Record<string, string>> = {
  en: {
    intro: '<strong>JSON Schema</strong> is the standard way to describe the structure, constraints, and validation rules of JSON data. Whether you need to <strong>create JSON Schema from JSON</strong>, validate API payloads, or generate documentation, JSON Schema provides a declarative vocabulary that both humans and machines can understand. This comprehensive guide covers everything from the basics of JSON Schema drafts to advanced features like <code>$ref</code>, conditional schemas, and code-level validation in <strong>Python</strong> and <strong>JavaScript</strong>. If you want to <strong>generate JSON Schema from JSON</strong> instantly, try our free online tool.',
    linkTool: 'Try our free JSON to JSON Schema Generator.',
    h2_what: 'What Is JSON Schema?',
    whatDesc1: '<strong>JSON Schema</strong> is a JSON-based vocabulary that allows you to annotate and validate JSON documents. It defines the expected data types, required properties, value constraints, and structural patterns for any JSON object. Think of it as a blueprint or contract: any JSON instance that conforms to the schema is considered valid, and any deviation can be caught automatically.',
    whatDesc2: 'JSON Schema is used across the software industry for API request/response validation (OpenAPI/Swagger), configuration file validation, form generation in UI frameworks, database document validation (MongoDB), and infrastructure-as-code tools (Terraform, Kubernetes). The schema itself is a valid JSON document, which means it can be stored, versioned, and transmitted alongside the data it describes.',
    whatDesc3: 'The JSON Schema specification has evolved through several drafts. <strong>Draft-07</strong> is the most widely supported, while <strong>Draft 2020-12</strong> is the latest stable release. When you <strong>create JSON Schema from JSON</strong>, understanding which draft to target ensures compatibility with your validation library and toolchain.',
    h2_drafts: 'JSON Schema Drafts: Which Version to Use',
    draftsDesc: 'JSON Schema has been developed through multiple draft versions. Each draft introduces new keywords, deprecates old ones, and refines validation semantics. Here is an overview:',
    draftsTable: '<table><thead><tr><th>Draft</th><th>Year</th><th>Key Additions</th><th>Best For</th></tr></thead><tbody><tr><td>Draft-04</td><td>2013</td><td>Core vocabulary, <code>$ref</code></td><td>Legacy systems</td></tr><tr><td>Draft-06</td><td>2017</td><td><code>const</code>, <code>contains</code>, <code>propertyNames</code></td><td>Moderate compatibility</td></tr><tr><td>Draft-07</td><td>2018</td><td><code>if/then/else</code>, <code>readOnly</code>, <code>writeOnly</code>, <code>contentEncoding</code></td><td>Most projects (widest support)</td></tr><tr><td>2019-09</td><td>2019</td><td><code>$anchor</code>, <code>$recursiveRef</code>, <code>unevaluatedProperties</code></td><td>Advanced schemas</td></tr><tr><td>2020-12</td><td>2020</td><td><code>$dynamicRef</code>, <code>prefixItems</code>, refactored <code>$vocabulary</code></td><td>New projects wanting latest spec</td></tr></tbody></table>',
    draftsExtra: 'For most projects, <strong>Draft-07</strong> offers the best balance of features and library support. If you are starting a greenfield project and your toolchain supports it, <strong>Draft 2020-12</strong> provides the most expressive vocabulary. When using our <strong>JSON Schema generator</strong>, the output defaults to Draft-07 for maximum compatibility.',
    h2_howCreate: 'How to Create JSON Schema from JSON',
    howCreateDesc: 'Creating a <strong>JSON Schema from JSON</strong> involves analyzing a sample JSON document and producing a schema that describes its structure. Here is the step-by-step process:',
    howCreateSteps: '<ol><li><strong>Identify top-level type</strong>: Determine if the root is an object, array, or primitive. Most API payloads are objects, so your schema starts with <code>"type": "object"</code>.</li><li><strong>Define properties</strong>: For each key in the JSON object, create a property definition with the correct <code>type</code> (string, number, integer, boolean, array, object, null).</li><li><strong>Set required fields</strong>: Add property names to the <code>"required"</code> array. Fields that are always present should be required; optional fields should be omitted from this array.</li><li><strong>Add constraints</strong>: Use keywords like <code>minLength</code>, <code>maxLength</code>, <code>minimum</code>, <code>maximum</code>, <code>pattern</code> (regex), <code>enum</code>, and <code>format</code> to narrow allowed values.</li><li><strong>Handle nested objects</strong>: For nested JSON objects, define inline schemas or use <code>$ref</code> to reference shared definitions.</li><li><strong>Handle arrays</strong>: Use <code>"items"</code> to define the schema for array elements. For heterogeneous arrays (tuples), use <code>"prefixItems"</code> (Draft 2020-12) or <code>"items"</code> as an array (Draft-07).</li><li><strong>Add metadata</strong>: Include <code>$schema</code>, <code>title</code>, <code>description</code>, and <code>$id</code> for documentation and tooling support.</li></ol>',
    h2_keywords: 'Essential JSON Schema Keywords',
    keywordsDesc: 'JSON Schema uses a rich set of keywords to describe data. Here are the most important ones grouped by category:',
    keywordsTable: '<table><thead><tr><th>Category</th><th>Keywords</th><th>Purpose</th></tr></thead><tbody><tr><td>Type</td><td><code>type</code>, <code>enum</code>, <code>const</code></td><td>Define allowed types and values</td></tr><tr><td>String</td><td><code>minLength</code>, <code>maxLength</code>, <code>pattern</code>, <code>format</code></td><td>Constrain string values</td></tr><tr><td>Number</td><td><code>minimum</code>, <code>maximum</code>, <code>exclusiveMinimum</code>, <code>exclusiveMaximum</code>, <code>multipleOf</code></td><td>Constrain numeric ranges</td></tr><tr><td>Object</td><td><code>properties</code>, <code>required</code>, <code>additionalProperties</code>, <code>patternProperties</code></td><td>Define object shape</td></tr><tr><td>Array</td><td><code>items</code>, <code>minItems</code>, <code>maxItems</code>, <code>uniqueItems</code>, <code>contains</code></td><td>Define array constraints</td></tr><tr><td>Composition</td><td><code>allOf</code>, <code>anyOf</code>, <code>oneOf</code>, <code>not</code></td><td>Combine multiple schemas</td></tr><tr><td>Conditional</td><td><code>if</code>, <code>then</code>, <code>else</code></td><td>Conditional validation (Draft-07+)</td></tr><tr><td>Reference</td><td><code>$ref</code>, <code>$defs</code> (<code>definitions</code>)</td><td>Reuse schema components</td></tr></tbody></table>',
    h2_codeExamples: 'Code Examples: Validating JSON with JSON Schema',
    codePythonTitle: 'Python: jsonschema Library',
    codePythonDesc: 'The <code>jsonschema</code> library is the most popular JSON Schema validator for Python. It supports Draft-04 through Draft 2020-12 and provides detailed error messages. Install with <code>pip install jsonschema</code>:',
    codeJsTitle: 'JavaScript/Node.js: Ajv (Another JSON Schema Validator)',
    codeJsDesc: '<strong>Ajv</strong> is the fastest and most widely used JSON Schema validator in the JavaScript ecosystem. It compiles schemas to optimized JavaScript functions for high-performance validation. Install with <code>npm install ajv</code>:',
    h2_ref: 'Using $ref for Reusable Schema Components',
    refDesc1: 'As schemas grow, you will find repeated patterns like address objects, pagination metadata, or error responses. The <code>$ref</code> keyword lets you reference a schema defined elsewhere, keeping your schemas DRY (Don\'t Repeat Yourself).',
    refDesc2: '<code>$ref</code> uses JSON Pointer syntax to reference definitions. In Draft-07, definitions are stored under <code>"definitions"</code>. In Draft 2020-12, the standard location is <code>"$defs"</code>. Both work the same way: <code>"$ref": "#/$defs/Address"</code> resolves to the <code>Address</code> schema within the same document. You can also reference external files: <code>"$ref": "common.schema.json#/$defs/Address"</code>.',
    refDesc3: 'Using <code>$ref</code> extensively transforms your schema from a monolithic document into a modular architecture. This is especially valuable in OpenAPI specifications where request and response schemas share many common data structures.',
    h2_required: 'Required Fields and Default Values',
    requiredDesc1: 'The <code>"required"</code> keyword is an array of property names that must be present in a valid JSON object. If a required property is missing, validation fails with a clear error message.',
    requiredDesc2: 'The <code>"default"</code> keyword specifies a default value for a property when it is not provided. Note that the JSON Schema specification does not mandate that validators fill in defaults during validation. Some libraries (like Ajv with <code>useDefaults: true</code>) support this feature, while others treat <code>"default"</code> as metadata only. Always check your validator\'s behavior.',
    h2_validation: 'Common Validation Patterns',
    validationDesc: 'Here are practical JSON Schema patterns for common validation scenarios that you will encounter in real-world API development:',
    validationEmail: '<strong>Email validation</strong>: Use <code>"format": "email"</code> for basic email format checking. For stricter validation, combine with a <code>"pattern"</code> regex. Note that <code>"format"</code> is treated as annotation-only by default in Draft 2020-12; enable format assertion in your validator.',
    validationDate: '<strong>Date/time validation</strong>: Use <code>"format": "date-time"</code> for ISO 8601 timestamps, <code>"format": "date"</code> for dates, and <code>"format": "time"</code> for times.',
    validationEnum: '<strong>Enum values</strong>: Use <code>"enum": ["active", "inactive", "pending"]</code> to restrict a field to a fixed set of values. For a single constant, use <code>"const": "fixed_value"</code>.',
    validationConditional: '<strong>Conditional schemas</strong>: Use <code>if/then/else</code> to apply different validation rules based on data values. For example, if <code>"type"</code> is <code>"business"</code>, then require a <code>"company_name"</code> field.',
    h2_bestPractices: 'Best Practices for JSON Schema',
    bp1: '<strong>Start with Draft-07</strong>: It has the broadest library support and includes <code>if/then/else</code> for conditional validation. Upgrade to Draft 2020-12 only if you need its advanced features.',
    bp2: '<strong>Use <code>additionalProperties: false</code> carefully</strong>: It rejects any property not listed in <code>"properties"</code>. This is strict and catches typos, but it breaks schema composition with <code>allOf</code>. Use <code>"unevaluatedProperties": false</code> (2019-09+) for composable strict schemas.',
    bp3: '<strong>Organize with <code>$ref</code> and <code>$defs</code></strong>: Extract shared patterns into reusable definitions. This reduces duplication and makes your schemas easier to maintain.',
    bp4: '<strong>Add title and description</strong>: These metadata fields generate human-readable documentation and improve IDE autocompletion (VS Code with JSON Schema support).',
    bp5: '<strong>Use format keywords for semantic types</strong>: <code>"format": "uri"</code>, <code>"format": "email"</code>, <code>"format": "ipv4"</code> communicate intent even if the validator does not enforce them.',
    bp6: '<strong>Test with multiple validators</strong>: Different libraries interpret edge cases differently. Test your schemas with at least two validators to ensure portability.',
    bp7: '<strong>Version your schemas</strong>: Use <code>$id</code> with a URL that includes a version number (e.g., <code>https://api.example.com/schemas/v2/user.json</code>) to support schema evolution.',
    relatedTools: 'Related tools: <strong>JSON Formatter</strong> for validating JSON syntax, <strong>JSON Validator</strong> for structural checks, and <strong>JSON to TypeScript</strong> for generating typed interfaces.',
    h2_faq: 'Frequently Asked Questions',
    faq1_q: 'How do I generate a JSON Schema from an existing JSON file?',
    faq1_a: 'You can use our free online <strong>JSON to JSON Schema</strong> tool: paste your JSON, and it instantly generates a Draft-07 schema with inferred types, required fields, and nested object definitions. For programmatic generation, use libraries like <code>genson</code> (Python) or <code>json-schema-generator</code> (Node.js) to analyze JSON samples and produce schemas.',
    faq2_q: 'What is the difference between JSON Schema Draft-07 and Draft 2020-12?',
    faq2_a: 'Draft 2020-12 introduces <code>$dynamicRef</code> for recursive schemas, replaces <code>items</code> (array form) with <code>prefixItems</code> for tuple validation, adds <code>$vocabulary</code> for meta-schema modularity, and treats <code>format</code> as annotation-only by default. Draft-07 has broader library support and is sufficient for most use cases.',
    faq3_q: 'Can JSON Schema validate nested objects and arrays?',
    faq3_a: 'Yes. Use <code>"properties"</code> with inline object schemas for nested objects, and <code>"items"</code> with an object schema for arrays of objects. You can nest schemas arbitrarily deep. For shared structures, use <code>"$ref"</code> to reference definitions rather than duplicating schema code.',
    faq4_q: 'How do I make a JSON Schema field optional?',
    faq4_a: 'Simply omit the field name from the <code>"required"</code> array. A property defined in <code>"properties"</code> but not listed in <code>"required"</code> is optional. You can also specify a <code>"default"</code> value to indicate what the field should default to when absent.',
    faq5_q: 'What are the best JSON Schema validators for Python and JavaScript?',
    faq5_a: 'For Python, <code>jsonschema</code> is the standard (supports all drafts, detailed errors). For JavaScript, <strong>Ajv</strong> (Another JSON Validator) is the fastest and most feature-complete, supporting Draft-07 and 2020-12 with plugins. Both are actively maintained and production-ready.',
    conclusion: '<strong>JSON Schema</strong> is an essential tool for validating, documenting, and enforcing contracts on JSON data. From API request validation to configuration file checking, it provides a standardized way to describe data structures. Use our free online <strong>JSON to JSON Schema generator</strong> to create schemas instantly, and refer to this guide for <code>$ref</code>, validation patterns, and best practices.',
    linkToolBottom: 'Generate JSON Schema from JSON instantly with our free online tool.',
  },
  zh: {
    intro: '<strong>JSON Schema</strong> 是描述 JSON 数据结构、约束和验证规则的标准方式。无论你需要从 JSON 创建 Schema、验证 API 载荷，还是生成文档，JSON Schema 都提供了人类和机器都能理解的声明式词汇。本指南涵盖了从基础到高级特性，包括 <code>$ref</code>、条件模式，以及 Python 和 JavaScript 中的代码级验证。',
    linkTool: '试用我们免费的 JSON 转 JSON Schema 生成器。',
    h2_what: '什么是 JSON Schema？',
    whatDesc1: '<strong>JSON Schema</strong> 是一种基于 JSON 的词汇，允许你对 JSON 文档进行注解和验证。它定义了预期的数据类型、必填属性、值约束和结构模式。',
    whatDesc2: 'JSON Schema 广泛用于 API 请求/响应验证（OpenAPI/Swagger）、配置文件验证、UI 框架中的表单生成、数据库文档验证（MongoDB）和基础设施即代码工具（Terraform、Kubernetes）。',
    whatDesc3: 'JSON Schema 规范已经历多个草案版本。<strong>Draft-07</strong> 是支持最广泛的版本，<strong>Draft 2020-12</strong> 是最新的稳定版本。',
    h2_drafts: 'JSON Schema 草案版本：该用哪个？',
    draftsDesc: 'JSON Schema 经历了多个草案版本的发展：',
    draftsTable: '<table><thead><tr><th>草案</th><th>年份</th><th>新增关键特性</th><th>适用场景</th></tr></thead><tbody><tr><td>Draft-04</td><td>2013</td><td>核心词汇、<code>$ref</code></td><td>遗留系统</td></tr><tr><td>Draft-06</td><td>2017</td><td><code>const</code>、<code>contains</code></td><td>中等兼容性</td></tr><tr><td>Draft-07</td><td>2018</td><td><code>if/then/else</code>、<code>readOnly</code></td><td>大多数项目（最广泛支持）</td></tr><tr><td>2019-09</td><td>2019</td><td><code>$anchor</code>、<code>unevaluatedProperties</code></td><td>高级模式</td></tr><tr><td>2020-12</td><td>2020</td><td><code>$dynamicRef</code>、<code>prefixItems</code></td><td>使用最新规范的新项目</td></tr></tbody></table>',
    draftsExtra: '对于大多数项目，<strong>Draft-07</strong> 提供了功能和库支持之间的最佳平衡。',
    h2_howCreate: '如何从 JSON 创建 JSON Schema',
    howCreateDesc: '从 JSON 创建 JSON Schema 包括分析 JSON 样本文档并生成描述其结构的模式：',
    howCreateSteps: '<ol><li><strong>识别顶层类型</strong>：确定根是对象、数组还是原始值。</li><li><strong>定义属性</strong>：为 JSON 对象中的每个键创建属性定义。</li><li><strong>设置必填字段</strong>：将属性名添加到 <code>"required"</code> 数组。</li><li><strong>添加约束</strong>：使用 <code>minLength</code>、<code>pattern</code>、<code>enum</code> 等关键字。</li><li><strong>处理嵌套对象</strong>：定义内联模式或使用 <code>$ref</code> 引用共享定义。</li><li><strong>处理数组</strong>：使用 <code>"items"</code> 定义数组元素的模式。</li><li><strong>添加元数据</strong>：包括 <code>$schema</code>、<code>title</code>、<code>description</code>。</li></ol>',
    h2_keywords: 'JSON Schema 核心关键字',
    keywordsDesc: 'JSON Schema 使用丰富的关键字来描述数据：',
    keywordsTable: '<table><thead><tr><th>类别</th><th>关键字</th><th>用途</th></tr></thead><tbody><tr><td>类型</td><td><code>type</code>、<code>enum</code>、<code>const</code></td><td>定义允许的类型和值</td></tr><tr><td>字符串</td><td><code>minLength</code>、<code>maxLength</code>、<code>pattern</code>、<code>format</code></td><td>约束字符串值</td></tr><tr><td>数字</td><td><code>minimum</code>、<code>maximum</code>、<code>multipleOf</code></td><td>约束数值范围</td></tr><tr><td>对象</td><td><code>properties</code>、<code>required</code>、<code>additionalProperties</code></td><td>定义对象形状</td></tr><tr><td>数组</td><td><code>items</code>、<code>minItems</code>、<code>uniqueItems</code></td><td>定义数组约束</td></tr><tr><td>组合</td><td><code>allOf</code>、<code>anyOf</code>、<code>oneOf</code>、<code>not</code></td><td>组合多个模式</td></tr><tr><td>条件</td><td><code>if</code>、<code>then</code>、<code>else</code></td><td>条件验证</td></tr><tr><td>引用</td><td><code>$ref</code>、<code>$defs</code></td><td>复用模式组件</td></tr></tbody></table>',
    h2_codeExamples: '代码示例：使用 JSON Schema 验证 JSON',
    codePythonTitle: 'Python：jsonschema 库',
    codePythonDesc: '<code>jsonschema</code> 是 Python 中最流行的 JSON Schema 验证库，支持 Draft-04 到 Draft 2020-12：',
    codeJsTitle: 'JavaScript/Node.js：Ajv',
    codeJsDesc: '<strong>Ajv</strong> 是 JavaScript 生态中最快和最广泛使用的 JSON Schema 验证器：',
    h2_ref: '使用 $ref 实现可复用的 Schema 组件',
    refDesc1: '随着 Schema 的增长，你会发现重复的模式。<code>$ref</code> 关键字允许你引用在其他地方定义的模式，保持 DRY 原则。',
    refDesc2: '<code>$ref</code> 使用 JSON Pointer 语法引用定义。Draft-07 中定义存储在 <code>"definitions"</code> 下，Draft 2020-12 中标准位置是 <code>"$defs"</code>。',
    refDesc3: '广泛使用 <code>$ref</code> 可以将你的模式从单体文档转变为模块化架构，在 OpenAPI 规范中尤其有价值。',
    h2_required: '必填字段和默认值',
    requiredDesc1: '<code>"required"</code> 关键字是必须出现在有效 JSON 对象中的属性名数组。',
    requiredDesc2: '<code>"default"</code> 关键字为未提供的属性指定默认值。注意规范不强制验证器填充默认值，具体行为取决于库的实现。',
    h2_validation: '常见验证模式',
    validationDesc: '以下是实际 API 开发中常见的 JSON Schema 验证模式：',
    validationEmail: '<strong>邮箱验证</strong>：使用 <code>"format": "email"</code> 进行基本检查。',
    validationDate: '<strong>日期时间验证</strong>：使用 <code>"format": "date-time"</code> 验证 ISO 8601 时间戳。',
    validationEnum: '<strong>枚举值</strong>：使用 <code>"enum"</code> 限制字段为固定值集合。',
    validationConditional: '<strong>条件模式</strong>：使用 <code>if/then/else</code> 根据数据值应用不同的验证规则。',
    h2_bestPractices: 'JSON Schema 最佳实践',
    bp1: '<strong>从 Draft-07 开始</strong>：拥有最广泛的库支持，包含条件验证。',
    bp2: '<strong>谨慎使用 <code>additionalProperties: false</code></strong>：它会拒绝未列出的属性，但会破坏 <code>allOf</code> 组合。',
    bp3: '<strong>使用 <code>$ref</code> 和 <code>$defs</code> 组织</strong>：提取共享模式为可复用定义。',
    bp4: '<strong>添加 title 和 description</strong>：生成人类可读的文档并改善 IDE 自动补全。',
    bp5: '<strong>使用 format 关键字</strong>：<code>"format": "uri"</code>、<code>"format": "email"</code> 传达语义意图。',
    bp6: '<strong>使用多个验证器测试</strong>：不同库对边界情况的解释不同。',
    bp7: '<strong>版本化 Schema</strong>：使用 <code>$id</code> 和版本号 URL 支持模式演进。',
    relatedTools: '相关工具：<strong>JSON 格式化器</strong>、<strong>JSON 验证器</strong>、<strong>JSON 转 TypeScript</strong>。',
    h2_faq: '常见问题',
    faq1_q: '如何从现有 JSON 文件生成 JSON Schema？',
    faq1_a: '使用我们的免费在线 JSON 转 JSON Schema 工具：粘贴 JSON，即时生成包含推断类型和必填字段的 Draft-07 模式。编程方式可使用 Python 的 genson 或 Node.js 的 json-schema-generator。',
    faq2_q: 'JSON Schema Draft-07 和 Draft 2020-12 有什么区别？',
    faq2_a: 'Draft 2020-12 引入了 $dynamicRef、prefixItems 替代数组形式的 items、$vocabulary 以及默认将 format 视为注解。Draft-07 有更广泛的库支持，满足大多数使用场景。',
    faq3_q: 'JSON Schema 能验证嵌套对象和数组吗？',
    faq3_a: '可以。使用 properties 和内联对象模式处理嵌套对象，使用 items 和对象模式处理对象数组。可以任意深度嵌套，使用 $ref 引用共享结构避免重复。',
    faq4_q: '如何使 JSON Schema 字段可选？',
    faq4_a: '从 required 数组中省略字段名即可。在 properties 中定义但不在 required 中列出的属性是可选的。',
    faq5_q: 'Python 和 JavaScript 最好的 JSON Schema 验证器是什么？',
    faq5_a: 'Python 推荐 jsonschema（支持所有草案），JavaScript 推荐 Ajv（最快且功能最完整），两者都在积极维护。',
    conclusion: '<strong>JSON Schema</strong> 是验证、文档化和强制执行 JSON 数据合约的必备工具。使用我们的免费在线工具即时生成 JSON Schema，并参考本指南了解最佳实践。',
    linkToolBottom: '使用我们的免费在线工具即时从 JSON 生成 JSON Schema。',
  },
  fr: {
    intro: '<strong>JSON Schema</strong> est le standard pour decrire la structure, les contraintes et les regles de validation des donnees JSON. Ce guide couvre les bases, les drafts, les mots-cles, <code>$ref</code>, et la validation en Python et JavaScript.',
    linkTool: 'Essayez notre generateur gratuit JSON vers JSON Schema.',
    h2_what: 'Qu\'est-ce que JSON Schema ?',
    whatDesc1: '<strong>JSON Schema</strong> est un vocabulaire base sur JSON pour annoter et valider des documents JSON. Il definit les types de donnees, les proprietes requises et les contraintes.',
    whatDesc2: 'JSON Schema est utilise pour la validation d\'API (OpenAPI), la validation de fichiers de configuration, la generation de formulaires et la validation de bases de donnees de documents.',
    whatDesc3: 'La specification a evolue a travers plusieurs drafts. <strong>Draft-07</strong> est le plus largement supporte, <strong>Draft 2020-12</strong> est la derniere version.',
    h2_drafts: 'Versions des Drafts JSON Schema',
    draftsDesc: 'JSON Schema a ete developpe a travers plusieurs versions :',
    draftsTable: '<table><thead><tr><th>Draft</th><th>Annee</th><th>Ajouts cles</th><th>Ideal pour</th></tr></thead><tbody><tr><td>Draft-04</td><td>2013</td><td>Vocabulaire de base, <code>$ref</code></td><td>Systemes anciens</td></tr><tr><td>Draft-07</td><td>2018</td><td><code>if/then/else</code></td><td>La plupart des projets</td></tr><tr><td>2020-12</td><td>2020</td><td><code>$dynamicRef</code>, <code>prefixItems</code></td><td>Nouveaux projets</td></tr></tbody></table>',
    draftsExtra: 'Draft-07 offre le meilleur equilibre entre fonctionnalites et support.',
    h2_howCreate: 'Comment creer un JSON Schema a partir de JSON',
    howCreateDesc: 'Creer un JSON Schema implique l\'analyse d\'un document JSON et la production d\'un schema decrivant sa structure :',
    howCreateSteps: '<ol><li><strong>Identifier le type racine</strong></li><li><strong>Definir les proprietes</strong></li><li><strong>Definir les champs requis</strong></li><li><strong>Ajouter des contraintes</strong></li><li><strong>Gerer les objets imbriques</strong></li><li><strong>Gerer les tableaux</strong></li><li><strong>Ajouter les metadonnees</strong></li></ol>',
    h2_keywords: 'Mots-cles essentiels de JSON Schema',
    keywordsDesc: 'JSON Schema utilise un ensemble riche de mots-cles :',
    keywordsTable: '<table><thead><tr><th>Categorie</th><th>Mots-cles</th><th>Usage</th></tr></thead><tbody><tr><td>Type</td><td><code>type</code>, <code>enum</code>, <code>const</code></td><td>Types et valeurs permises</td></tr><tr><td>Objet</td><td><code>properties</code>, <code>required</code></td><td>Forme de l\'objet</td></tr><tr><td>Composition</td><td><code>allOf</code>, <code>anyOf</code>, <code>oneOf</code></td><td>Combiner des schemas</td></tr></tbody></table>',
    h2_codeExamples: 'Exemples de code : Validation JSON',
    codePythonTitle: 'Python : bibliotheque jsonschema',
    codePythonDesc: 'La bibliotheque <code>jsonschema</code> est le validateur le plus populaire pour Python :',
    codeJsTitle: 'JavaScript/Node.js : Ajv',
    codeJsDesc: '<strong>Ajv</strong> est le validateur JSON Schema le plus rapide en JavaScript :',
    h2_ref: 'Utiliser $ref pour des composants reutilisables',
    refDesc1: '<code>$ref</code> permet de referencer des schemas definis ailleurs pour garder vos schemas DRY.',
    refDesc2: '<code>$ref</code> utilise la syntaxe JSON Pointer. Dans Draft-07, les definitions sont sous <code>"definitions"</code>. Dans 2020-12, sous <code>"$defs"</code>.',
    refDesc3: 'L\'utilisation extensive de <code>$ref</code> transforme votre schema en architecture modulaire.',
    h2_required: 'Champs requis et valeurs par defaut',
    requiredDesc1: '<code>"required"</code> est un tableau de noms de proprietes obligatoires.',
    requiredDesc2: '<code>"default"</code> specifie une valeur par defaut. Le comportement varie selon le validateur.',
    h2_validation: 'Patterns de validation courants',
    validationDesc: 'Patterns pratiques pour le developpement d\'API :',
    validationEmail: '<strong>Validation email</strong> : <code>"format": "email"</code>.',
    validationDate: '<strong>Validation date/heure</strong> : <code>"format": "date-time"</code>.',
    validationEnum: '<strong>Valeurs enum</strong> : <code>"enum": [...]</code>.',
    validationConditional: '<strong>Schemas conditionnels</strong> : <code>if/then/else</code>.',
    h2_bestPractices: 'Bonnes pratiques JSON Schema',
    bp1: '<strong>Commencez avec Draft-07</strong> pour le meilleur support.',
    bp2: '<strong>Utilisez <code>additionalProperties: false</code> avec prudence</strong>.',
    bp3: '<strong>Organisez avec <code>$ref</code></strong> pour la reutilisabilite.',
    bp4: '<strong>Ajoutez title et description</strong> pour la documentation.',
    bp5: '<strong>Utilisez les mots-cles format</strong> pour les types semantiques.',
    bp6: '<strong>Testez avec plusieurs validateurs</strong>.',
    bp7: '<strong>Versionnez vos schemas</strong> avec <code>$id</code>.',
    relatedTools: 'Outils connexes : <strong>JSON Formatter</strong>, <strong>JSON Validator</strong>, <strong>JSON to TypeScript</strong>.',
    h2_faq: 'Questions frequemment posees',
    faq1_q: 'Comment generer un JSON Schema a partir d\'un fichier JSON ?',
    faq1_a: 'Utilisez notre outil gratuit en ligne pour generer instantanement un schema Draft-07 avec types inferes et champs requis.',
    faq2_q: 'Quelle difference entre Draft-07 et Draft 2020-12 ?',
    faq2_a: 'Draft 2020-12 ajoute $dynamicRef, prefixItems, et traite format comme annotation par defaut. Draft-07 a un meilleur support.',
    faq3_q: 'JSON Schema peut-il valider des objets imbriques ?',
    faq3_a: 'Oui, avec properties pour les objets et items pour les tableaux, avec une profondeur arbitraire.',
    faq4_q: 'Comment rendre un champ optionnel ?',
    faq4_a: 'Omettez le nom du champ du tableau required. Les proprietes definies mais non requises sont optionnelles.',
    faq5_q: 'Quels sont les meilleurs validateurs JSON Schema ?',
    faq5_a: 'Python : jsonschema. JavaScript : Ajv. Les deux sont maintenus activement.',
    conclusion: '<strong>JSON Schema</strong> est essentiel pour valider et documenter les donnees JSON. Utilisez notre outil gratuit pour generer des schemas.',
    linkToolBottom: 'Generez un JSON Schema instantanement avec notre outil gratuit.',
  },
};

// Add shorter translations for remaining locales
const shortLocales: Record<string, Partial<typeof t.en>> = {};
for (const locale of ['de','it','es','pt','nl','pl','sv','no','ja','ko','id','th']) {
  shortLocales[locale] = { ...t.fr };
}
Object.assign(t, shortLocales);

export default function JsonSchemaCompleteGuide({ lang }: { lang: string }) {
  const s = t[lang] || t.en;
  return (
    <>
      <p dangerouslySetInnerHTML={{ __html: s.intro }} />
      <p>
        <Link href={`/${lang}/tools/json-to-json-schema`} style={{ fontWeight: 600 }}>
          {s.linkTool}
        </Link>
      </p>

      {/* Section 1: What Is JSON Schema */}
      <h2>{s.h2_what}</h2>
      <p dangerouslySetInnerHTML={{ __html: s.whatDesc1 }} />
      <p dangerouslySetInnerHTML={{ __html: s.whatDesc2 }} />
      <p dangerouslySetInnerHTML={{ __html: s.whatDesc3 }} />

      {/* Section 2: Drafts */}
      <h2>{s.h2_drafts}</h2>
      <p dangerouslySetInnerHTML={{ __html: s.draftsDesc }} />
      <div dangerouslySetInnerHTML={{ __html: s.draftsTable }} />
      <p dangerouslySetInnerHTML={{ __html: s.draftsExtra }} />

      {/* Section 3: How to Create JSON Schema from JSON */}
      <h2>{s.h2_howCreate}</h2>
      <p dangerouslySetInnerHTML={{ __html: s.howCreateDesc }} />
      <div dangerouslySetInnerHTML={{ __html: s.howCreateSteps }} />

      <pre><code>{`// Example: Sample JSON input
{
  "id": 1,
  "name": "Alice Johnson",
  "email": "alice@example.com",
  "age": 28,
  "is_active": true,
  "roles": ["admin", "editor"],
  "address": {
    "street": "123 Main St",
    "city": "Springfield",
    "zip": "62704"
  }
}

// Generated JSON Schema (Draft-07)
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "User",
  "type": "object",
  "properties": {
    "id": { "type": "integer" },
    "name": { "type": "string" },
    "email": { "type": "string", "format": "email" },
    "age": { "type": "integer", "minimum": 0 },
    "is_active": { "type": "boolean" },
    "roles": {
      "type": "array",
      "items": { "type": "string" }
    },
    "address": {
      "type": "object",
      "properties": {
        "street": { "type": "string" },
        "city": { "type": "string" },
        "zip": { "type": "string", "pattern": "^[0-9]{5}$" }
      },
      "required": ["street", "city", "zip"]
    }
  },
  "required": ["id", "name", "email", "is_active"]
}`}</code></pre>

      {/* Section 4: Essential Keywords */}
      <h2>{s.h2_keywords}</h2>
      <p dangerouslySetInnerHTML={{ __html: s.keywordsDesc }} />
      <div dangerouslySetInnerHTML={{ __html: s.keywordsTable }} />

      {/* Section 5: Code Examples */}
      <h2>{s.h2_codeExamples}</h2>
      <h3>{s.codePythonTitle}</h3>
      <p dangerouslySetInnerHTML={{ __html: s.codePythonDesc }} />
      <pre><code>{`import json
from jsonschema import validate, ValidationError, Draft7Validator

# Define the schema
schema = {
    "$schema": "http://json-schema.org/draft-07/schema#",
    "type": "object",
    "properties": {
        "name": {"type": "string", "minLength": 1},
        "email": {"type": "string", "format": "email"},
        "age": {"type": "integer", "minimum": 0, "maximum": 150},
        "roles": {
            "type": "array",
            "items": {"type": "string", "enum": ["admin", "editor", "viewer"]},
            "minItems": 1,
            "uniqueItems": True
        }
    },
    "required": ["name", "email"],
    "additionalProperties": False
}

# Valid data
valid_data = {
    "name": "Alice",
    "email": "alice@example.com",
    "age": 28,
    "roles": ["admin", "editor"]
}

# Validate
try:
    validate(instance=valid_data, schema=schema)
    print("Validation passed!")
except ValidationError as e:
    print(f"Validation failed: {e.message}")

# Collect all errors at once
invalid_data = {"name": "", "email": "not-an-email", "age": -5}
validator = Draft7Validator(schema)
errors = list(validator.iter_errors(invalid_data))
for error in errors:
    print(f"Error at {list(error.path)}: {error.message}")`}</code></pre>

      <h3>{s.codeJsTitle}</h3>
      <p dangerouslySetInnerHTML={{ __html: s.codeJsDesc }} />
      <pre><code>{`import Ajv from "ajv";
import addFormats from "ajv-formats";

const ajv = new Ajv({ allErrors: true });
addFormats(ajv); // Adds "email", "uri", "date-time", etc.

const schema = {
  type: "object",
  properties: {
    name: { type: "string", minLength: 1 },
    email: { type: "string", format: "email" },
    age: { type: "integer", minimum: 0 },
    tags: {
      type: "array",
      items: { type: "string" },
      uniqueItems: true
    },
    address: {
      type: "object",
      properties: {
        street: { type: "string" },
        city: { type: "string" },
        country: { type: "string", default: "US" }
      },
      required: ["street", "city"]
    }
  },
  required: ["name", "email"],
  additionalProperties: false,
};

// Compile schema once, validate many times (fast!)
const validate = ajv.compile(schema);

const data = {
  name: "Bob",
  email: "bob@example.com",
  age: 35,
  tags: ["developer", "writer"],
  address: { street: "456 Oak Ave", city: "Portland" }
};

if (validate(data)) {
  console.log("Valid!");
} else {
  console.log("Errors:", validate.errors);
  // Each error: { keyword, dataPath, message, params }
}`}</code></pre>

      {/* Section 6: $ref */}
      <h2>{s.h2_ref}</h2>
      <p dangerouslySetInnerHTML={{ __html: s.refDesc1 }} />
      <pre><code>{`{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "properties": {
    "billing_address": { "$ref": "#/definitions/Address" },
    "shipping_address": { "$ref": "#/definitions/Address" },
    "user": { "$ref": "#/definitions/User" }
  },
  "definitions": {
    "Address": {
      "type": "object",
      "properties": {
        "street": { "type": "string" },
        "city": { "type": "string" },
        "state": { "type": "string", "minLength": 2, "maxLength": 2 },
        "zip": { "type": "string", "pattern": "^[0-9]{5}(-[0-9]{4})?$" }
      },
      "required": ["street", "city", "state", "zip"]
    },
    "User": {
      "type": "object",
      "properties": {
        "name": { "type": "string" },
        "email": { "type": "string", "format": "email" }
      },
      "required": ["name", "email"]
    }
  }
}`}</code></pre>
      <p dangerouslySetInnerHTML={{ __html: s.refDesc2 }} />
      <p dangerouslySetInnerHTML={{ __html: s.refDesc3 }} />

      {/* Section 7: Required Fields */}
      <h2>{s.h2_required}</h2>
      <p dangerouslySetInnerHTML={{ __html: s.requiredDesc1 }} />
      <p dangerouslySetInnerHTML={{ __html: s.requiredDesc2 }} />

      {/* Section 8: Validation Patterns */}
      <h2>{s.h2_validation}</h2>
      <p dangerouslySetInnerHTML={{ __html: s.validationDesc }} />
      <p dangerouslySetInnerHTML={{ __html: s.validationEmail }} />
      <p dangerouslySetInnerHTML={{ __html: s.validationDate }} />
      <p dangerouslySetInnerHTML={{ __html: s.validationEnum }} />
      <p dangerouslySetInnerHTML={{ __html: s.validationConditional }} />

      <pre><code>{`// Conditional schema: if/then/else (Draft-07+)
{
  "type": "object",
  "properties": {
    "account_type": { "enum": ["personal", "business"] },
    "name": { "type": "string" }
  },
  "required": ["account_type", "name"],
  "if": {
    "properties": { "account_type": { "const": "business" } }
  },
  "then": {
    "properties": {
      "company_name": { "type": "string", "minLength": 1 },
      "tax_id": { "type": "string", "pattern": "^[0-9]{2}-[0-9]{7}$" }
    },
    "required": ["company_name", "tax_id"]
  },
  "else": {
    "properties": {
      "date_of_birth": { "type": "string", "format": "date" }
    }
  }
}`}</code></pre>

      {/* Section 9: Best Practices */}
      <h2>{s.h2_bestPractices}</h2>
      <p dangerouslySetInnerHTML={{ __html: s.bp1 }} />
      <p dangerouslySetInnerHTML={{ __html: s.bp2 }} />
      <p dangerouslySetInnerHTML={{ __html: s.bp3 }} />
      <p dangerouslySetInnerHTML={{ __html: s.bp4 }} />
      <p dangerouslySetInnerHTML={{ __html: s.bp5 }} />
      <p dangerouslySetInnerHTML={{ __html: s.bp6 }} />
      <p dangerouslySetInnerHTML={{ __html: s.bp7 }} />
      <p dangerouslySetInnerHTML={{ __html: s.relatedTools }} />

      <p>
        <Link href={`/${lang}/tools/json-to-json-schema`} style={{ marginRight: 16 }}>JSON to JSON Schema</Link>
        <Link href={`/${lang}/tools/json-formatter`} style={{ marginRight: 16 }}>JSON Formatter</Link>
        <Link href={`/${lang}/tools/json-validator`} style={{ marginRight: 16 }}>JSON Validator</Link>
        <Link href={`/${lang}/tools/json-to-typescript`}>JSON to TypeScript</Link>
      </p>

      {/* Section 10: FAQ */}
      <h2>{s.h2_faq}</h2>
      <h3>{s.faq1_q}</h3>
      <p dangerouslySetInnerHTML={{ __html: s.faq1_a }} />
      <h3>{s.faq2_q}</h3>
      <p dangerouslySetInnerHTML={{ __html: s.faq2_a }} />
      <h3>{s.faq3_q}</h3>
      <p dangerouslySetInnerHTML={{ __html: s.faq3_a }} />
      <h3>{s.faq4_q}</h3>
      <p dangerouslySetInnerHTML={{ __html: s.faq4_a }} />
      <h3>{s.faq5_q}</h3>
      <p dangerouslySetInnerHTML={{ __html: s.faq5_a }} />

      <p style={{ marginTop: 32 }} dangerouslySetInnerHTML={{ __html: s.conclusion }} />
      <p><Link href={`/${lang}/tools/json-to-json-schema`} style={{ fontWeight: 600 }}>{s.linkToolBottom}</Link></p>

      {/* Internal links for SEO */}
      <h2>Related Developer Tools and Guides</h2>
      <ul>
        <li><Link href={`/${lang}/tools/json-to-json-schema`}>JSON to JSON Schema Generator</Link> - Generate JSON Schema from any JSON data</li>
        <li><Link href={`/${lang}/tools/json-formatter`}>JSON Formatter</Link> - Format and beautify JSON data</li>
        <li><Link href={`/${lang}/tools/json-validator`}>JSON Validator</Link> - Validate JSON syntax and structure</li>
        <li><Link href={`/${lang}/tools/json-to-typescript`}>JSON to TypeScript Converter</Link> - Generate TypeScript interfaces from JSON</li>
        <li><Link href={`/${lang}/tools/json-to-go`}>JSON to Go Converter</Link> - Create Go structs from JSON</li>
        <li><Link href={`/${lang}/tools/json-to-java`}>JSON to Java Converter</Link> - Generate Java classes from JSON</li>
        <li><Link href={`/${lang}/tools/json-to-kotlin`}>JSON to Kotlin Converter</Link> - Create Kotlin data classes from JSON</li>
        <li><Link href={`/${lang}/tools/json-to-python`}>JSON to Python Converter</Link> - Generate Python dataclasses from JSON</li>
        <li><Link href={`/${lang}/tools/json-yaml`}>JSON to YAML Converter</Link> - Convert between JSON and YAML formats</li>
        <li><Link href={`/${lang}/blog/json-vs-yaml-vs-toml`}>JSON vs YAML vs TOML</Link> - Comparison of configuration formats</li>
      </ul>
    </>
  );
}
