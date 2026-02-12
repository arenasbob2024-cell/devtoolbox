'use client';
import React from 'react';
import Link from 'next/link';

const t: Record<string, Record<string, string>> = {
  en: {
    intro: 'Protocol Buffers (Protobuf) and JSON are two fundamentally different approaches to data serialization. JSON dominates web APIs with its human-readable text format, while Protobuf powers high-performance microservices with compact binary encoding. This guide provides a <strong>comprehensive comparison</strong> of Protobuf vs JSON, gRPC vs REST, with real benchmarks, code examples, and practical migration strategies.',
    linkJsonProtobuf: 'Convert between JSON and Protobuf with our free JSON to Protobuf tool \u2192',
    linkJsonFormatter: 'Format and validate JSON with our free JSON Formatter tool \u2192',

    // Section 1: Quick Answer
    h2Quick: 'Quick Answer: Which Should You Use?',
    quickDesc: '<strong>Use JSON</strong> when building public web APIs, browser-facing applications, configuration files, or any scenario where human readability matters. JSON is universally supported, easy to debug, and requires no schema.<br/><br/><strong>Use Protobuf</strong> when building internal microservices, mobile apps with bandwidth constraints, IoT devices, or any high-throughput system where performance is critical. Protobuf produces 3\u201310x smaller payloads and is 2\u20135x faster to serialize/deserialize.',

    // Section 2: What is Protocol Buffers
    h2WhatIsProtobuf: 'What is Protocol Buffers?',
    whatIsProtobufDesc: 'Protocol Buffers (Protobuf) is a language-neutral, platform-neutral, extensible mechanism for serializing structured data, developed by Google. Instead of using text like JSON or XML, Protobuf encodes data into a compact binary format.',
    whatIsProtobufKey: 'Key concepts of Protocol Buffers:',
    whatIsProtobufList: '<ul><li><strong>.proto files</strong> \u2014 Schema definitions that describe your data structures using a special syntax</li><li><strong>Code generation</strong> \u2014 The <code>protoc</code> compiler generates type-safe classes in your target language (Go, Java, Python, C++, etc.)</li><li><strong>Binary encoding</strong> \u2014 Data is encoded using variable-length integers and field tags, producing much smaller payloads than text formats</li><li><strong>Field numbers</strong> \u2014 Each field has a unique number used for binary encoding, enabling backward/forward compatibility</li><li><strong>Strong typing</strong> \u2014 Every field has a defined type (int32, string, bool, enum, nested messages), enforced at compile time</li></ul>',

    // Section 3: Syntax Comparison
    h2Syntax: 'Syntax Comparison: Same Data in JSON vs Protobuf',
    syntaxDesc: 'Here is the same data structure expressed in JSON and as a Protobuf definition:',
    syntaxJsonLabel: 'JSON Data',
    syntaxProtoLabel: 'Protobuf Schema (.proto)',
    syntaxProtoUsage: 'Using the generated code (Go example)',

    // Section 4: Size Comparison
    h2Size: 'Size Comparison: Binary vs Text',
    sizeDesc: 'One of the biggest advantages of Protobuf is payload size. Binary encoding eliminates field name repetition and uses variable-length integers. Here are real measurements for the same data:',
    sizeDataType: 'Data Type',
    sizeJson: 'JSON Size',
    sizeProtobuf: 'Protobuf Size',
    sizeReduction: 'Reduction',
    sizeSimple: 'Simple object (5 fields)',
    sizeSimpleJson: '127 bytes',
    sizeSimpleProto: '34 bytes',
    sizeSimpleReduction: '73%',
    sizeArray: 'Array of 100 objects',
    sizeArrayJson: '12.7 KB',
    sizeArrayProto: '3.4 KB',
    sizeArrayReduction: '73%',
    sizeNested: 'Nested messages (3 levels)',
    sizeNestedJson: '2.1 KB',
    sizeNestedProto: '0.4 KB',
    sizeNestedReduction: '81%',
    sizeNumeric: 'Numeric-heavy data',
    sizeNumericJson: '8.5 KB',
    sizeNumericProto: '1.2 KB',
    sizeNumericReduction: '86%',
    sizeString: 'String-heavy data',
    sizeStringJson: '15.3 KB',
    sizeStringProto: '12.1 KB',
    sizeStringReduction: '21%',
    sizeNote: 'Note: The size reduction varies significantly by data type. Protobuf saves the most with numeric and boolean-heavy data because it uses variable-length encoding (varints). String-heavy data sees less reduction because the strings themselves are stored similarly in both formats \u2014 only the field names and structural overhead are eliminated.',

    // Section 5: Performance Benchmarks
    h2Perf: 'Performance Benchmarks',
    perfDesc: 'Typical performance characteristics when processing the same dataset (approximate values measured across Go, Java, and C++ implementations):',
    perfMetric: 'Metric',
    perfJson: 'JSON',
    perfProtobuf: 'Protobuf',
    perfSerialize: 'Serialization (10K objects)',
    serializeJson: '~45ms',
    serializeProtobuf: '~12ms',
    perfDeserialize: 'Deserialization (10K objects)',
    deserializeJson: '~55ms',
    deserializeProtobuf: '~10ms',
    perfMemory: 'Memory allocation (per op)',
    memoryJson: '~3.2 KB',
    memoryProtobuf: '~0.8 KB',
    perfPayload: 'Payload size (10K objects)',
    payloadJson: '~1.2 MB',
    payloadProtobuf: '~0.3 MB',
    perfGcPressure: 'GC pressure',
    gcJson: 'High (many string allocs)',
    gcProtobuf: 'Low (pre-allocated structs)',
    perfNote: 'Note: JSON performance varies widely by library. <code>encoding/json</code> in Go is relatively slow; libraries like <code>json-iterator</code> or <code>sonic</code> can close the gap significantly. In JavaScript, <code>JSON.parse</code> is highly optimized by V8 and may outperform Protobuf.js for small payloads. Always benchmark with your specific data and language.',

    // Section 6: gRPC vs REST
    h2GrpcVsRest: 'gRPC vs REST: Protocol Comparison',
    grpcVsRestDesc: 'Protobuf is the default serialization format for gRPC, while JSON is the standard for REST APIs. Here is how the two approaches compare:',
    grpcFeature: 'Feature',
    grpcRest: 'REST + JSON',
    grpcGrpc: 'gRPC + Protobuf',
    grpcTransport: 'Transport',
    transportRest: 'HTTP/1.1 or HTTP/2',
    transportGrpc: 'HTTP/2 only',
    grpcFormat: 'Data Format',
    formatRest: 'JSON (text)',
    formatGrpc: 'Protobuf (binary)',
    grpcContract: 'API Contract',
    contractRest: 'OpenAPI/Swagger (optional)',
    contractGrpc: '.proto file (required)',
    grpcCodegen: 'Code Generation',
    codegenRest: 'Optional (OpenAPI codegen)',
    codegenGrpc: 'Built-in (protoc)',
    grpcStreaming: 'Streaming',
    streamingRest: 'SSE, WebSocket (separate)',
    streamingGrpc: 'Native bidirectional streaming',
    grpcBrowser: 'Browser Support',
    browserRest: 'Native (fetch/XMLHttpRequest)',
    browserGrpc: 'Requires grpc-web proxy',
    grpcLoadBalance: 'Load Balancing',
    lbRest: 'Simple (HTTP-level)',
    lbGrpc: 'Requires L7 LB (Envoy, etc.)',
    grpcTimeout: 'Deadlines/Timeouts',
    timeoutRest: 'Manual implementation',
    timeoutGrpc: 'Built-in deadline propagation',
    grpcAuth: 'Authentication',
    authRest: 'Headers, OAuth, JWT',
    authGrpc: 'Metadata, TLS, interceptors',
    grpcCaching: 'Caching',
    cachingRest: 'HTTP caching (ETags, CDN)',
    cachingGrpc: 'No built-in caching',
    grpcServiceDef: 'Here is an example of the same API defined as REST and gRPC:',

    // Section 7: Schema Evolution
    h2SchemaEvolution: 'Schema Evolution: Backward & Forward Compatibility',
    schemaEvolutionDesc: 'One of Protobuf\'s strongest features is its support for schema evolution. You can evolve your data structures without breaking existing consumers.',
    schemaRules: 'Rules for safe schema evolution:',
    schemaRulesList: '<ul><li><strong>Never reuse field numbers</strong> \u2014 Once a field number is used, it should be considered permanently taken, even if the field is removed</li><li><strong>Use <code>reserved</code></strong> \u2014 Mark removed field numbers and names as reserved to prevent accidental reuse</li><li><strong>Add new fields freely</strong> \u2014 New fields with new numbers are backward-compatible; old clients simply ignore them</li><li><strong>Don\'t change field types</strong> \u2014 Changing a field\'s type (e.g., int32 to string) will corrupt data</li><li><strong>Use <code>oneof</code> for variants</strong> \u2014 When a field can be one of several types, use <code>oneof</code> instead of optional fields</li><li><strong>Use <code>optional</code> keyword</strong> \u2014 In proto3, all fields are optional by default, but explicitly marking them makes intent clear</li></ul>',
    schemaExample: 'Schema evolution example:',

    // Section 8: Type Safety
    h2TypeSafety: 'Type Safety: Strong Typing vs Dynamic',
    typeSafetyDesc: 'Protobuf\'s strong type system is a significant advantage over JSON\'s dynamic nature, especially in large codebases:',
    typeSafetyFeature: 'Feature',
    typeSafetyJson: 'JSON',
    typeSafetyProtobuf: 'Protobuf',
    tsFieldTypes: 'Field Types',
    tsFieldTypesJson: 'Any value for any key (dynamic)',
    tsFieldTypesProtobuf: 'Strictly defined (int32, string, bool, etc.)',
    tsEnum: 'Enums',
    tsEnumJson: 'Strings by convention only',
    tsEnumProtobuf: 'First-class enum type with validation',
    tsNullability: 'Nullability',
    tsNullabilityJson: 'null is a valid value for any field',
    tsNullabilityProtobuf: 'Optional wrapper types, no null',
    tsNested: 'Nested Types',
    tsNestedJson: 'Arbitrary nesting, no validation',
    tsNestedProtobuf: 'Defined message types, validated',
    tsCodegen: 'Code Generation',
    tsCodegenJson: 'Manual type definitions (TypeScript interfaces)',
    tsCodegenProtobuf: 'Auto-generated type-safe classes',
    tsCompileCheck: 'Compile-time Checks',
    tsCompileCheckJson: 'None (runtime errors only)',
    tsCompileCheckProtobuf: 'Full compile-time type checking',
    typeSafetyCodeDesc: 'Example: Type safety difference in practice:',

    // Section 9: Tooling
    h2Tooling: 'Tooling Ecosystem',
    toolingDesc: 'Both ecosystems have rich tooling, but they serve different workflows:',
    toolName: 'Tool',
    toolPurpose: 'Purpose',
    toolProtoc: 'protoc',
    toolProtocDesc: 'Official Protocol Buffers compiler. Generates code for 10+ languages from .proto files.',
    toolBuf: 'Buf',
    toolBufDesc: 'Modern Protobuf toolchain. Linting, breaking change detection, dependency management, and a schema registry (BSR).',
    toolGrpcurl: 'grpcurl',
    toolGrpcurlDesc: 'Command-line tool for interacting with gRPC servers, similar to curl for REST APIs.',
    toolGrpcui: 'grpcui',
    toolGrpcuiDesc: 'Web-based UI for gRPC services. Interactive request builder like Postman for gRPC.',
    toolPostman: 'Postman',
    toolPostmanDesc: 'Supports both REST and gRPC. Import .proto files, send requests, view responses.',
    toolBloomRpc: 'BloomRPC / Evans',
    toolBloomRpcDesc: 'Desktop gRPC clients with GUI. Load .proto files and make calls interactively.',
    toolProtoValidate: 'protovalidate',
    toolProtoValidateDesc: 'Field-level validation rules directly in .proto files (e.g., min/max, regex, required).',
    toolConnectRpc: 'Connect RPC',
    toolConnectRpcDesc: 'Modern gRPC-compatible framework. Works in browsers without a proxy, generates idiomatic TypeScript clients.',

    // Section 10: When to Use JSON
    h2WhenJson: 'When to Use JSON',
    whenJsonList: '<ul><li><strong>Public web APIs</strong> \u2014 JSON is universally understood by every HTTP client, browser, and mobile framework</li><li><strong>Browser frontends</strong> \u2014 <code>JSON.parse()</code> and <code>fetch()</code> work natively with zero dependencies</li><li><strong>Configuration files</strong> \u2014 package.json, tsconfig.json, ESLint configs are all JSON (human-readable and editable)</li><li><strong>Debugging and logging</strong> \u2014 JSON payloads can be read directly in logs, network inspectors, and terminal output</li><li><strong>Rapid prototyping</strong> \u2014 No schema definition or code generation step required; just send and receive data</li><li><strong>Third-party integrations</strong> \u2014 Webhooks, OAuth, payment APIs (Stripe, PayPal) all use JSON</li><li><strong>Small teams / simple services</strong> \u2014 The overhead of maintaining .proto files may not be justified</li></ul>',

    // Section 11: When to Use Protobuf
    h2WhenProtobuf: 'When to Use Protobuf',
    whenProtobufList: '<ul><li><strong>Internal microservices</strong> \u2014 Service-to-service communication benefits most from type safety and performance</li><li><strong>Mobile applications</strong> \u2014 Smaller payloads reduce battery usage and data consumption on cellular networks</li><li><strong>IoT devices</strong> \u2014 Constrained devices with limited bandwidth and processing power benefit from compact binary encoding</li><li><strong>High-throughput systems</strong> \u2014 Trading platforms, telemetry pipelines, and real-time analytics where every millisecond matters</li><li><strong>Polyglot architectures</strong> \u2014 Generated code ensures consistency across Go, Java, Python, C++, Rust, and more</li><li><strong>Streaming data</strong> \u2014 gRPC\'s native streaming support is ideal for real-time feeds, chat, and live updates</li><li><strong>Large organizations</strong> \u2014 Schema registry (Buf BSR) enables API governance, versioning, and breaking change detection</li></ul>',

    // Section 12: Migration Path
    h2Migration: 'Migration Path: JSON to Protobuf',
    migrationDesc: 'Migrating from REST/JSON to gRPC/Protobuf doesn\'t have to be all-or-nothing. Here is a practical, gradual adoption strategy:',
    h3MigStep1: 'Step 1: Define .proto schemas for existing JSON',
    migStep1Desc: 'Start by writing .proto definitions that match your existing JSON structures. This is a non-invasive first step.',
    h3MigStep2: 'Step 2: Use gRPC-Gateway for transcoding',
    migStep2Desc: 'gRPC-Gateway generates a reverse-proxy server that translates REST/JSON requests into gRPC calls. This lets you serve both REST and gRPC from the same backend:',
    h3MigStep3: 'Step 3: Internal services adopt gRPC first',
    migStep3Desc: 'Start with service-to-service communication. Keep public-facing APIs as REST/JSON while internal services communicate via gRPC:',
    h3MigStep4: 'Step 4: Gradual client migration',
    migStep4Desc: 'Migrate clients one at a time. Mobile apps benefit most from the switch due to smaller payloads and battery savings.',
    migWarning: '<strong>Important:</strong> Do not try to migrate everything at once. The most successful migrations follow a strangler fig pattern \u2014 new services use gRPC/Protobuf, existing services are migrated gradually, and the REST/JSON interface is maintained as a compatibility layer using gRPC-Gateway or Connect RPC\'s multi-protocol support.',

    // Section 13: FAQ
    h2Faq: 'Frequently Asked Questions',
    faq1Q: 'Is Protobuf always faster than JSON?',
    faq1A: 'In most cases, yes. Protobuf serialization/deserialization is typically 2\u20135x faster than JSON, and payloads are 3\u201310x smaller. However, in JavaScript environments, V8\'s highly optimized JSON.parse() can be competitive with Protobuf.js for small payloads. For large datasets and strongly-typed languages (Go, Java, C++), Protobuf\'s performance advantage is significant. Always benchmark with your specific data and runtime.',
    faq2Q: 'Can I use Protobuf without gRPC?',
    faq2A: 'Yes, absolutely. Protobuf is just a serialization format \u2014 it can be used independently of gRPC. You can serialize Protobuf messages and send them over REST APIs, message queues (Kafka, RabbitMQ), databases, or files. Many teams use Protobuf for Kafka messages while keeping REST/JSON for their HTTP APIs.',
    faq3Q: 'How do I debug binary Protobuf data?',
    faq3A: 'Several approaches: (1) Use <code>protoc --decode</code> to decode binary data to text format; (2) Use grpcurl or grpcui for interactive debugging of gRPC services; (3) Use Protobuf\'s JSON mapping (<code>jsonpb</code> in Go, <code>MessageToJson</code> in Java) to convert to readable JSON for logging; (4) Postman supports importing .proto files and displays decoded responses. In production, log the JSON representation of Protobuf messages for observability.',
    faq4Q: 'Does gRPC work in web browsers?',
    faq4A: 'Not directly. Browsers do not support HTTP/2 trailers, which gRPC requires. You have three options: (1) <strong>grpc-web</strong> \u2014 a protocol that works through an Envoy proxy; (2) <strong>Connect RPC</strong> \u2014 a modern framework that supports gRPC, gRPC-web, and a new Connect protocol that works natively in browsers without a proxy; (3) <strong>gRPC-Gateway</strong> \u2014 generates a REST/JSON reverse proxy in front of your gRPC services. Connect RPC is increasingly the recommended approach for new projects.',
    faq5Q: 'Should I use proto2 or proto3?',
    faq5A: 'Use <strong>proto3</strong> for all new projects. Proto3 is simpler (no required fields, no default values, no extensions), has better JSON mapping, and is the only version supported by many newer tools (Connect RPC, Buf). Proto2 is still supported but is mainly used in legacy Google-internal code. The main feature proto2 has that some miss is required fields, but the Protobuf team has determined that required fields cause more problems than they solve in practice.',
  },
  zh: {
    intro: 'Protocol Buffers（Protobuf）和 JSON 是两种根本不同的数据序列化方式。JSON 以其人类可读的文本格式主导着 Web API，而 Protobuf 则以紧凑的二进制编码驱动着高性能微服务。本指南提供 Protobuf 与 JSON、gRPC 与 REST 的<strong>全面对比分析</strong>，包含真实基准测试、代码示例和实用的迁移策略。',
    linkJsonProtobuf: '使用我们的免费 JSON 转 Protobuf 工具进行格式转换 \u2192',
    linkJsonFormatter: '使用我们的免费 JSON 格式化工具格式化和验证 JSON \u2192',

    // Section 1: Quick Answer
    h2Quick: '快速解答：应该使用哪个？',
    quickDesc: '<strong>使用 JSON</strong>：构建公共 Web API、面向浏览器的应用、配置文件，或任何需要人类可读性的场景。JSON 被广泛支持，易于调试，且不需要模式定义。<br/><br/><strong>使用 Protobuf</strong>：构建内部微服务、带宽受限的移动应用、IoT 设备，或任何性能至关重要的高吞吐系统。Protobuf 的载荷比 JSON 小 3\u201310 倍，序列化/反序列化速度快 2\u20135 倍。',

    // Section 2: What is Protocol Buffers
    h2WhatIsProtobuf: '什么是 Protocol Buffers？',
    whatIsProtobufDesc: 'Protocol Buffers（Protobuf）是 Google 开发的一种语言无关、平台无关、可扩展的结构化数据序列化机制。与 JSON 或 XML 使用文本不同，Protobuf 将数据编码为紧凑的二进制格式。',
    whatIsProtobufKey: 'Protocol Buffers 的关键概念：',
    whatIsProtobufList: '<ul><li><strong>.proto 文件</strong> \u2014 使用特殊语法描述数据结构的模式定义</li><li><strong>代码生成</strong> \u2014 <code>protoc</code> 编译器为目标语言（Go、Java、Python、C++ 等）生成类型安全的类</li><li><strong>二进制编码</strong> \u2014 数据使用变长整数和字段标签编码，产生比文本格式小得多的载荷</li><li><strong>字段编号</strong> \u2014 每个字段都有唯一的编号用于二进制编码，实现向前/向后兼容性</li><li><strong>强类型</strong> \u2014 每个字段都有定义的类型（int32、string、bool、enum、嵌套消息），在编译时强制执行</li></ul>',

    // Section 3: Syntax Comparison
    h2Syntax: '语法对比：JSON 与 Protobuf 中的相同数据',
    syntaxDesc: '以下是用 JSON 和 Protobuf 定义表达的相同数据结构：',
    syntaxJsonLabel: 'JSON 数据',
    syntaxProtoLabel: 'Protobuf 模式（.proto）',
    syntaxProtoUsage: '使用生成的代码（Go 示例）',

    // Section 4: Size Comparison
    h2Size: '大小对比：二进制 vs 文本',
    sizeDesc: 'Protobuf 最大的优势之一是载荷大小。二进制编码消除了字段名重复并使用变长整数。以下是相同数据的实际测量值：',
    sizeDataType: '数据类型',
    sizeJson: 'JSON 大小',
    sizeProtobuf: 'Protobuf 大小',
    sizeReduction: '缩减比例',
    sizeSimple: '简单对象（5 个字段）',
    sizeSimpleJson: '127 字节',
    sizeSimpleProto: '34 字节',
    sizeSimpleReduction: '73%',
    sizeArray: '100 个对象的数组',
    sizeArrayJson: '12.7 KB',
    sizeArrayProto: '3.4 KB',
    sizeArrayReduction: '73%',
    sizeNested: '嵌套消息（3 层）',
    sizeNestedJson: '2.1 KB',
    sizeNestedProto: '0.4 KB',
    sizeNestedReduction: '81%',
    sizeNumeric: '数字密集型数据',
    sizeNumericJson: '8.5 KB',
    sizeNumericProto: '1.2 KB',
    sizeNumericReduction: '86%',
    sizeString: '字符串密集型数据',
    sizeStringJson: '15.3 KB',
    sizeStringProto: '12.1 KB',
    sizeStringReduction: '21%',
    sizeNote: '注意：大小缩减因数据类型而异。Protobuf 对数字和布尔密集型数据节省最多，因为它使用变长编码（varints）。字符串密集型数据缩减较少，因为字符串本身在两种格式中的存储方式类似——只有字段名和结构开销被消除。',

    // Section 5: Performance Benchmarks
    h2Perf: '性能基准测试',
    perfDesc: '处理相同数据集的典型性能特征（基于 Go、Java 和 C++ 实现的近似测量值）：',
    perfMetric: '指标',
    perfJson: 'JSON',
    perfProtobuf: 'Protobuf',
    perfSerialize: '序列化（10K 对象）',
    serializeJson: '~45ms',
    serializeProtobuf: '~12ms',
    perfDeserialize: '反序列化（10K 对象）',
    deserializeJson: '~55ms',
    deserializeProtobuf: '~10ms',
    perfMemory: '内存分配（每次操作）',
    memoryJson: '~3.2 KB',
    memoryProtobuf: '~0.8 KB',
    perfPayload: '载荷大小（10K 对象）',
    payloadJson: '~1.2 MB',
    payloadProtobuf: '~0.3 MB',
    perfGcPressure: 'GC 压力',
    gcJson: '高（大量字符串分配）',
    gcProtobuf: '低（预分配结构体）',
    perfNote: '注意：JSON 性能因库而异。Go 的 <code>encoding/json</code> 相对较慢；<code>json-iterator</code> 或 <code>sonic</code> 等库可以显著缩小差距。在 JavaScript 中，V8 高度优化的 <code>JSON.parse</code> 对于小载荷可能优于 Protobuf.js。请始终使用你的具体数据和语言进行基准测试。',

    // Section 6: gRPC vs REST
    h2GrpcVsRest: 'gRPC vs REST：协议对比',
    grpcVsRestDesc: 'Protobuf 是 gRPC 的默认序列化格式，而 JSON 是 REST API 的标准。以下是两种方式的对比：',
    grpcFeature: '特性',
    grpcRest: 'REST + JSON',
    grpcGrpc: 'gRPC + Protobuf',
    grpcTransport: '传输协议',
    transportRest: 'HTTP/1.1 或 HTTP/2',
    transportGrpc: '仅 HTTP/2',
    grpcFormat: '数据格式',
    formatRest: 'JSON（文本）',
    formatGrpc: 'Protobuf（二进制）',
    grpcContract: 'API 契约',
    contractRest: 'OpenAPI/Swagger（可选）',
    contractGrpc: '.proto 文件（必需）',
    grpcCodegen: '代码生成',
    codegenRest: '可选（OpenAPI codegen）',
    codegenGrpc: '内置（protoc）',
    grpcStreaming: '流式传输',
    streamingRest: 'SSE、WebSocket（独立实现）',
    streamingGrpc: '原生双向流式传输',
    grpcBrowser: '浏览器支持',
    browserRest: '原生支持（fetch/XMLHttpRequest）',
    browserGrpc: '需要 grpc-web 代理',
    grpcLoadBalance: '负载均衡',
    lbRest: '简单（HTTP 层）',
    lbGrpc: '需要 L7 负载均衡器（Envoy 等）',
    grpcTimeout: '超时/截止时间',
    timeoutRest: '手动实现',
    timeoutGrpc: '内置截止时间传播',
    grpcAuth: '认证',
    authRest: 'Headers、OAuth、JWT',
    authGrpc: 'Metadata、TLS、拦截器',
    grpcCaching: '缓存',
    cachingRest: 'HTTP 缓存（ETags、CDN）',
    cachingGrpc: '无内置缓存机制',
    grpcServiceDef: '以下是同一个 API 分别用 REST 和 gRPC 定义的示例：',

    // Section 7: Schema Evolution
    h2SchemaEvolution: '模式演进：向前和向后兼容性',
    schemaEvolutionDesc: 'Protobuf 最强大的特性之一是对模式演进的支持。你可以在不破坏现有消费者的情况下演进数据结构。',
    schemaRules: '安全模式演进的规则：',
    schemaRulesList: '<ul><li><strong>永远不要重用字段编号</strong> \u2014 一旦使用了字段编号，即使删除该字段，也应视为永久占用</li><li><strong>使用 <code>reserved</code></strong> \u2014 将已删除的字段编号和名称标记为保留，防止意外重用</li><li><strong>自由添加新字段</strong> \u2014 使用新编号的新字段向后兼容；旧客户端会忽略它们</li><li><strong>不要更改字段类型</strong> \u2014 更改字段类型（如 int32 改为 string）会损坏数据</li><li><strong>对变体使用 <code>oneof</code></strong> \u2014 当字段可以是多种类型之一时，使用 <code>oneof</code> 而非可选字段</li><li><strong>使用 <code>optional</code> 关键字</strong> \u2014 在 proto3 中所有字段默认可选，但显式标记使意图更清晰</li></ul>',
    schemaExample: '模式演进示例：',

    // Section 8: Type Safety
    h2TypeSafety: '类型安全：强类型 vs 动态类型',
    typeSafetyDesc: 'Protobuf 的强类型系统相比 JSON 的动态特性是一个显著优势，尤其在大型代码库中：',
    typeSafetyFeature: '特性',
    typeSafetyJson: 'JSON',
    typeSafetyProtobuf: 'Protobuf',
    tsFieldTypes: '字段类型',
    tsFieldTypesJson: '任何键可以是任何值（动态）',
    tsFieldTypesProtobuf: '严格定义（int32、string、bool 等）',
    tsEnum: '枚举',
    tsEnumJson: '仅按约定使用字符串',
    tsEnumProtobuf: '一等公民枚举类型，带验证',
    tsNullability: '可空性',
    tsNullabilityJson: 'null 对任何字段都是有效值',
    tsNullabilityProtobuf: '可选包装类型，无 null',
    tsNested: '嵌套类型',
    tsNestedJson: '任意嵌套，无验证',
    tsNestedProtobuf: '定义的消息类型，已验证',
    tsCodegen: '代码生成',
    tsCodegenJson: '手动类型定义（TypeScript 接口）',
    tsCodegenProtobuf: '自动生成类型安全的类',
    tsCompileCheck: '编译时检查',
    tsCompileCheckJson: '无（仅运行时错误）',
    tsCompileCheckProtobuf: '完整的编译时类型检查',
    typeSafetyCodeDesc: '示例：类型安全在实践中的差异：',

    // Section 9: Tooling
    h2Tooling: '工具生态系统',
    toolingDesc: '两个生态系统都有丰富的工具，但它们服务于不同的工作流：',
    toolName: '工具',
    toolPurpose: '用途',
    toolProtoc: 'protoc',
    toolProtocDesc: '官方 Protocol Buffers 编译器。从 .proto 文件为 10+ 种语言生成代码。',
    toolBuf: 'Buf',
    toolBufDesc: '现代 Protobuf 工具链。代码检查、破坏性变更检测、依赖管理和模式注册表（BSR）。',
    toolGrpcurl: 'grpcurl',
    toolGrpcurlDesc: '与 gRPC 服务器交互的命令行工具，类似于 REST API 的 curl。',
    toolGrpcui: 'grpcui',
    toolGrpcuiDesc: 'gRPC 服务的 Web UI。类似 Postman 的交互式请求构建器。',
    toolPostman: 'Postman',
    toolPostmanDesc: '同时支持 REST 和 gRPC。导入 .proto 文件，发送请求，查看响应。',
    toolBloomRpc: 'BloomRPC / Evans',
    toolBloomRpcDesc: '带 GUI 的桌面 gRPC 客户端。加载 .proto 文件并交互式调用。',
    toolProtoValidate: 'protovalidate',
    toolProtoValidateDesc: '直接在 .proto 文件中定义字段级验证规则（如 min/max、正则、必填）。',
    toolConnectRpc: 'Connect RPC',
    toolConnectRpcDesc: '现代 gRPC 兼容框架。无需代理即可在浏览器中使用，生成地道的 TypeScript 客户端。',

    // Section 10: When to Use JSON
    h2WhenJson: '何时使用 JSON',
    whenJsonList: '<ul><li><strong>公共 Web API</strong> \u2014 JSON 被所有 HTTP 客户端、浏览器和移动框架广泛理解</li><li><strong>浏览器前端</strong> \u2014 <code>JSON.parse()</code> 和 <code>fetch()</code> 原生工作，零依赖</li><li><strong>配置文件</strong> \u2014 package.json、tsconfig.json、ESLint 配置都是 JSON（人类可读可编辑）</li><li><strong>调试和日志</strong> \u2014 JSON 载荷可以直接在日志、网络检查器和终端输出中阅读</li><li><strong>快速原型开发</strong> \u2014 无需模式定义或代码生成步骤；直接发送和接收数据</li><li><strong>第三方集成</strong> \u2014 Webhook、OAuth、支付 API（Stripe、PayPal）都使用 JSON</li><li><strong>小团队/简单服务</strong> \u2014 维护 .proto 文件的开销可能不值得</li></ul>',

    // Section 11: When to Use Protobuf
    h2WhenProtobuf: '何时使用 Protobuf',
    whenProtobufList: '<ul><li><strong>内部微服务</strong> \u2014 服务间通信从类型安全和性能中获益最多</li><li><strong>移动应用</strong> \u2014 更小的载荷减少蜂窝网络上的电池使用和数据消耗</li><li><strong>IoT 设备</strong> \u2014 带宽和处理能力受限的设备受益于紧凑的二进制编码</li><li><strong>高吞吐系统</strong> \u2014 交易平台、遥测管道和实时分析，每毫秒都很重要</li><li><strong>多语言架构</strong> \u2014 生成的代码确保 Go、Java、Python、C++、Rust 等之间的一致性</li><li><strong>流式数据</strong> \u2014 gRPC 的原生流式传输支持非常适合实时推送、聊天和实时更新</li><li><strong>大型组织</strong> \u2014 模式注册表（Buf BSR）支持 API 治理、版本控制和破坏性变更检测</li></ul>',

    // Section 12: Migration Path
    h2Migration: '迁移路径：JSON 到 Protobuf',
    migrationDesc: '从 REST/JSON 迁移到 gRPC/Protobuf 不必一步到位。以下是实用的渐进采用策略：',
    h3MigStep1: '步骤 1：为现有 JSON 定义 .proto 模式',
    migStep1Desc: '首先编写与现有 JSON 结构匹配的 .proto 定义。这是一个非侵入性的第一步。',
    h3MigStep2: '步骤 2：使用 gRPC-Gateway 进行转码',
    migStep2Desc: 'gRPC-Gateway 生成反向代理服务器，将 REST/JSON 请求转换为 gRPC 调用。这让你可以从同一个后端同时提供 REST 和 gRPC 服务：',
    h3MigStep3: '步骤 3：内部服务优先采用 gRPC',
    migStep3Desc: '从服务间通信开始。保持面向公众的 API 为 REST/JSON，同时内部服务通过 gRPC 通信：',
    h3MigStep4: '步骤 4：逐步迁移客户端',
    migStep4Desc: '逐个迁移客户端。移动应用因更小的载荷和电池节省而从切换中获益最多。',
    migWarning: '<strong>重要提示：</strong>不要试图一次性迁移所有内容。最成功的迁移遵循绞杀者模式（strangler fig pattern）——新服务使用 gRPC/Protobuf，现有服务逐步迁移，REST/JSON 接口通过 gRPC-Gateway 或 Connect RPC 的多协议支持作为兼容层维护。',

    // Section 13: FAQ
    h2Faq: '常见问题',
    faq1Q: 'Protobuf 总是比 JSON 快吗？',
    faq1A: '在大多数情况下是的。Protobuf 的序列化/反序列化速度通常比 JSON 快 2\u20135 倍，载荷小 3\u201310 倍。但在 JavaScript 环境中，V8 高度优化的 JSON.parse() 对于小载荷可以与 Protobuf.js 竞争。对于大型数据集和强类型语言（Go、Java、C++），Protobuf 的性能优势显著。请始终使用你的具体数据和运行时进行基准测试。',
    faq2Q: '可以不用 gRPC 而单独使用 Protobuf 吗？',
    faq2A: '完全可以。Protobuf 只是一种序列化格式——可以独立于 gRPC 使用。你可以序列化 Protobuf 消息并通过 REST API、消息队列（Kafka、RabbitMQ）、数据库或文件发送。许多团队在 Kafka 消息中使用 Protobuf，同时保持 HTTP API 使用 REST/JSON。',
    faq3Q: '如何调试二进制 Protobuf 数据？',
    faq3A: '有几种方法：(1) 使用 <code>protoc --decode</code> 将二进制数据解码为文本格式；(2) 使用 grpcurl 或 grpcui 交互式调试 gRPC 服务；(3) 使用 Protobuf 的 JSON 映射（Go 中的 <code>jsonpb</code>，Java 中的 <code>MessageToJson</code>）转换为可读 JSON 用于日志；(4) Postman 支持导入 .proto 文件并显示解码后的响应。在生产环境中，记录 Protobuf 消息的 JSON 表示以便于可观测性。',
    faq4Q: 'gRPC 能在 Web 浏览器中工作吗？',
    faq4A: '不能直接使用。浏览器不支持 gRPC 所需的 HTTP/2 trailers。你有三个选择：(1) <strong>grpc-web</strong>——通过 Envoy 代理工作的协议；(2) <strong>Connect RPC</strong>——支持 gRPC、gRPC-web 和新的 Connect 协议的现代框架，无需代理即可在浏览器中原生工作；(3) <strong>gRPC-Gateway</strong>——在 gRPC 服务前面生成 REST/JSON 反向代理。Connect RPC 越来越成为新项目的推荐方式。',
    faq5Q: '应该使用 proto2 还是 proto3？',
    faq5A: '所有新项目使用 <strong>proto3</strong>。Proto3 更简单（无 required 字段、无默认值、无 extensions），有更好的 JSON 映射，是许多新工具（Connect RPC、Buf）唯一支持的版本。Proto2 仍然受支持，但主要用于 Google 内部的遗留代码。Proto2 一些人怀念的主要特性是 required 字段，但 Protobuf 团队已确定 required 字段在实践中造成的问题比解决的问题更多。',
  },
};

export default function ProtobufVsJsonGrpcRest({ lang }: { lang: string }) {
  const ct = t[lang] || t['en'];

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: ct.faq1Q, acceptedAnswer: { '@type': 'Answer', text: ct.faq1A } },
      { '@type': 'Question', name: ct.faq2Q, acceptedAnswer: { '@type': 'Answer', text: ct.faq2A } },
      { '@type': 'Question', name: ct.faq3Q, acceptedAnswer: { '@type': 'Answer', text: ct.faq3A } },
      { '@type': 'Question', name: ct.faq4Q, acceptedAnswer: { '@type': 'Answer', text: ct.faq4A } },
      { '@type': 'Question', name: ct.faq5Q, acceptedAnswer: { '@type': 'Answer', text: ct.faq5A } },
    ],
  };

  /* Size comparison rows */
  const sizeRows = [
    { label: ct.sizeSimple, json: ct.sizeSimpleJson, proto: ct.sizeSimpleProto, reduction: ct.sizeSimpleReduction },
    { label: ct.sizeArray, json: ct.sizeArrayJson, proto: ct.sizeArrayProto, reduction: ct.sizeArrayReduction },
    { label: ct.sizeNested, json: ct.sizeNestedJson, proto: ct.sizeNestedProto, reduction: ct.sizeNestedReduction },
    { label: ct.sizeNumeric, json: ct.sizeNumericJson, proto: ct.sizeNumericProto, reduction: ct.sizeNumericReduction },
    { label: ct.sizeString, json: ct.sizeStringJson, proto: ct.sizeStringProto, reduction: ct.sizeStringReduction },
  ];

  /* Performance rows */
  const perfRows = [
    { label: ct.perfSerialize, json: ct.serializeJson, proto: ct.serializeProtobuf },
    { label: ct.perfDeserialize, json: ct.deserializeJson, proto: ct.deserializeProtobuf },
    { label: ct.perfMemory, json: ct.memoryJson, proto: ct.memoryProtobuf },
    { label: ct.perfPayload, json: ct.payloadJson, proto: ct.payloadProtobuf },
    { label: ct.perfGcPressure, json: ct.gcJson, proto: ct.gcProtobuf },
  ];

  /* gRPC vs REST rows */
  const grpcRows = [
    { label: ct.grpcTransport, rest: ct.transportRest, grpc: ct.transportGrpc },
    { label: ct.grpcFormat, rest: ct.formatRest, grpc: ct.formatGrpc },
    { label: ct.grpcContract, rest: ct.contractRest, grpc: ct.contractGrpc },
    { label: ct.grpcCodegen, rest: ct.codegenRest, grpc: ct.codegenGrpc },
    { label: ct.grpcStreaming, rest: ct.streamingRest, grpc: ct.streamingGrpc },
    { label: ct.grpcBrowser, rest: ct.browserRest, grpc: ct.browserGrpc },
    { label: ct.grpcLoadBalance, rest: ct.lbRest, grpc: ct.lbGrpc },
    { label: ct.grpcTimeout, rest: ct.timeoutRest, grpc: ct.timeoutGrpc },
    { label: ct.grpcAuth, rest: ct.authRest, grpc: ct.authGrpc },
    { label: ct.grpcCaching, rest: ct.cachingRest, grpc: ct.cachingGrpc },
  ];

  /* Type safety rows */
  const typeSafetyRows = [
    { label: ct.tsFieldTypes, json: ct.tsFieldTypesJson, proto: ct.tsFieldTypesProtobuf },
    { label: ct.tsEnum, json: ct.tsEnumJson, proto: ct.tsEnumProtobuf },
    { label: ct.tsNullability, json: ct.tsNullabilityJson, proto: ct.tsNullabilityProtobuf },
    { label: ct.tsNested, json: ct.tsNestedJson, proto: ct.tsNestedProtobuf },
    { label: ct.tsCodegen, json: ct.tsCodegenJson, proto: ct.tsCodegenProtobuf },
    { label: ct.tsCompileCheck, json: ct.tsCompileCheckJson, proto: ct.tsCompileCheckProtobuf },
  ];

  /* Tooling rows */
  const toolingRows = [
    { name: ct.toolProtoc, desc: ct.toolProtocDesc },
    { name: ct.toolBuf, desc: ct.toolBufDesc },
    { name: ct.toolGrpcurl, desc: ct.toolGrpcurlDesc },
    { name: ct.toolGrpcui, desc: ct.toolGrpcuiDesc },
    { name: ct.toolPostman, desc: ct.toolPostmanDesc },
    { name: ct.toolBloomRpc, desc: ct.toolBloomRpcDesc },
    { name: ct.toolProtoValidate, desc: ct.toolProtoValidateDesc },
    { name: ct.toolConnectRpc, desc: ct.toolConnectRpcDesc },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <p dangerouslySetInnerHTML={{ __html: ct.intro }} />

      <p>
        <Link href={`/${lang}/tools/json-to-protobuf`} style={{ fontWeight: 600 }}>
          {ct.linkJsonProtobuf}
        </Link>
      </p>

      {/* ===== Section 1: Quick Answer ===== */}
      <h2>{ct.h2Quick}</h2>
      <p dangerouslySetInnerHTML={{ __html: ct.quickDesc }} />

      {/* ===== Section 2: What is Protocol Buffers ===== */}
      <h2>{ct.h2WhatIsProtobuf}</h2>
      <p>{ct.whatIsProtobufDesc}</p>
      <p>{ct.whatIsProtobufKey}</p>
      <div dangerouslySetInnerHTML={{ __html: ct.whatIsProtobufList }} />

      <pre><code>{`// user.proto — A simple Protobuf schema
syntax = "proto3";

package user.v1;

option go_package = "github.com/example/user/v1;userv1";

// User represents a registered user in the system.
message User {
  int32 id = 1;
  string name = 2;
  string email = 3;
  UserRole role = 4;
  repeated string tags = 5;
  Address address = 6;
  google.protobuf.Timestamp created_at = 7;
}

enum UserRole {
  USER_ROLE_UNSPECIFIED = 0;
  USER_ROLE_ADMIN = 1;
  USER_ROLE_EDITOR = 2;
  USER_ROLE_VIEWER = 3;
}

message Address {
  string street = 1;
  string city = 2;
  string country = 3;
  string zip_code = 4;
}`}</code></pre>

      {/* ===== Section 3: Syntax Comparison ===== */}
      <h2>{ct.h2Syntax}</h2>
      <p>{ct.syntaxDesc}</p>

      <h3>{ct.syntaxJsonLabel}</h3>
      <pre><code>{`{
  "id": 12345,
  "name": "Alice Chen",
  "email": "alice@example.com",
  "role": "admin",
  "tags": ["engineering", "backend", "lead"],
  "address": {
    "street": "123 Main St",
    "city": "San Francisco",
    "country": "US",
    "zipCode": "94102"
  },
  "createdAt": "2024-01-15T09:30:00Z"
}`}</code></pre>

      <h3>{ct.syntaxProtoLabel}</h3>
      <pre><code>{`syntax = "proto3";

package user.v1;

import "google/protobuf/timestamp.proto";

message User {
  int32 id = 1;           // field number 1
  string name = 2;        // field number 2
  string email = 3;       // field number 3
  UserRole role = 4;      // enum type
  repeated string tags = 5;  // repeated = array
  Address address = 6;    // nested message
  google.protobuf.Timestamp created_at = 7;
}

enum UserRole {
  USER_ROLE_UNSPECIFIED = 0;
  USER_ROLE_ADMIN = 1;
  USER_ROLE_EDITOR = 2;
  USER_ROLE_VIEWER = 3;
}

message Address {
  string street = 1;
  string city = 2;
  string country = 3;
  string zip_code = 4;
}`}</code></pre>

      <h3>{ct.syntaxProtoUsage}</h3>
      <pre><code>{`package main

import (
    "fmt"
    "google.golang.org/protobuf/proto"
    "google.golang.org/protobuf/types/known/timestamppb"
    userv1 "github.com/example/user/v1"
)

func main() {
    // Create a user using generated code (type-safe!)
    user := &userv1.User{
        Id:    12345,
        Name:  "Alice Chen",
        Email: "alice@example.com",
        Role:  userv1.UserRole_USER_ROLE_ADMIN,
        Tags:  []string{"engineering", "backend", "lead"},
        Address: &userv1.Address{
            Street:  "123 Main St",
            City:    "San Francisco",
            Country: "US",
            ZipCode: "94102",
        },
        CreatedAt: timestamppb.Now(),
    }

    // Serialize to binary (34 bytes vs 280 bytes JSON)
    data, _ := proto.Marshal(user)
    fmt.Printf("Binary size: %d bytes\\n", len(data))

    // Deserialize
    parsed := &userv1.User{}
    proto.Unmarshal(data, parsed)
    fmt.Println(parsed.Name) // "Alice Chen"
}`}</code></pre>

      {/* ===== Section 4: Size Comparison ===== */}
      <h2>{ct.h2Size}</h2>
      <p>{ct.sizeDesc}</p>

      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.95rem' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #e2e8f0' }}>
              <th style={{ textAlign: 'left', padding: '12px 16px', fontWeight: 700 }}>{ct.sizeDataType}</th>
              <th style={{ textAlign: 'left', padding: '12px 16px', fontWeight: 700 }}>{ct.sizeJson}</th>
              <th style={{ textAlign: 'left', padding: '12px 16px', fontWeight: 700 }}>{ct.sizeProtobuf}</th>
              <th style={{ textAlign: 'left', padding: '12px 16px', fontWeight: 700 }}>{ct.sizeReduction}</th>
            </tr>
          </thead>
          <tbody>
            {sizeRows.map((row, i) => (
              <tr key={i} style={{ borderBottom: '1px solid #e2e8f0', background: i % 2 === 1 ? '#f7fafc' : undefined }}>
                <td style={{ padding: '10px 16px', fontWeight: 600 }}>{row.label}</td>
                <td style={{ padding: '10px 16px' }}>{row.json}</td>
                <td style={{ padding: '10px 16px', color: '#38a169' }}>{row.proto}</td>
                <td style={{ padding: '10px 16px', color: '#38a169', fontWeight: 600 }}>{row.reduction}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p>{ct.sizeNote}</p>

      {/* ===== Section 5: Performance Benchmarks ===== */}
      <h2>{ct.h2Perf}</h2>
      <p>{ct.perfDesc}</p>

      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.95rem' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #e2e8f0' }}>
              <th style={{ textAlign: 'left', padding: '12px 16px', fontWeight: 700 }}>{ct.perfMetric}</th>
              <th style={{ textAlign: 'left', padding: '12px 16px', fontWeight: 700 }}>{ct.perfJson}</th>
              <th style={{ textAlign: 'left', padding: '12px 16px', fontWeight: 700 }}>{ct.perfProtobuf}</th>
            </tr>
          </thead>
          <tbody>
            {perfRows.map((row, i) => (
              <tr key={i} style={{ borderBottom: '1px solid #e2e8f0', background: i % 2 === 1 ? '#f7fafc' : undefined }}>
                <td style={{ padding: '10px 16px', fontWeight: 600 }}>{row.label}</td>
                <td style={{ padding: '10px 16px' }}>{row.json}</td>
                <td style={{ padding: '10px 16px', color: '#38a169' }}>{row.proto}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p dangerouslySetInnerHTML={{ __html: ct.perfNote }} />

      {/* ===== Section 6: gRPC vs REST ===== */}
      <h2>{ct.h2GrpcVsRest}</h2>
      <p>{ct.grpcVsRestDesc}</p>

      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.95rem' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #e2e8f0' }}>
              <th style={{ textAlign: 'left', padding: '12px 16px', fontWeight: 700 }}>{ct.grpcFeature}</th>
              <th style={{ textAlign: 'left', padding: '12px 16px', fontWeight: 700 }}>{ct.grpcRest}</th>
              <th style={{ textAlign: 'left', padding: '12px 16px', fontWeight: 700 }}>{ct.grpcGrpc}</th>
            </tr>
          </thead>
          <tbody>
            {grpcRows.map((row, i) => (
              <tr key={i} style={{ borderBottom: '1px solid #e2e8f0', background: i % 2 === 1 ? '#f7fafc' : undefined }}>
                <td style={{ padding: '10px 16px', fontWeight: 600 }}>{row.label}</td>
                <td style={{ padding: '10px 16px' }}>{row.rest}</td>
                <td style={{ padding: '10px 16px' }}>{row.grpc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p>{ct.grpcServiceDef}</p>

      <h3>REST API (OpenAPI)</h3>
      <pre><code>{`# REST endpoint
GET  /api/v1/users/{id}
POST /api/v1/users
PUT  /api/v1/users/{id}

# Request (POST /api/v1/users)
curl -X POST https://api.example.com/api/v1/users \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "Alice Chen",
    "email": "alice@example.com",
    "role": "admin"
  }'

# Response
{
  "id": 12345,
  "name": "Alice Chen",
  "email": "alice@example.com",
  "role": "admin",
  "createdAt": "2024-01-15T09:30:00Z"
}`}</code></pre>

      <h3>gRPC Service (.proto)</h3>
      <pre><code>{`syntax = "proto3";

package user.v1;

service UserService {
  // Unary RPC — single request, single response
  rpc GetUser(GetUserRequest) returns (GetUserResponse);
  rpc CreateUser(CreateUserRequest) returns (CreateUserResponse);

  // Server streaming — single request, stream of responses
  rpc ListUsers(ListUsersRequest) returns (stream User);

  // Bidirectional streaming
  rpc SyncUsers(stream SyncRequest) returns (stream SyncResponse);
}

message GetUserRequest {
  int32 id = 1;
}

message GetUserResponse {
  User user = 1;
}

message CreateUserRequest {
  string name = 1;
  string email = 2;
  UserRole role = 3;
}

message CreateUserResponse {
  User user = 1;
}

message ListUsersRequest {
  int32 page_size = 1;
  string page_token = 2;
}

// Client call with grpcurl:
// grpcurl -plaintext -d '{"id": 12345}' \\
//   localhost:50051 user.v1.UserService/GetUser`}</code></pre>

      {/* ===== Section 7: Schema Evolution ===== */}
      <h2>{ct.h2SchemaEvolution}</h2>
      <p>{ct.schemaEvolutionDesc}</p>
      <p>{ct.schemaRules}</p>
      <div dangerouslySetInnerHTML={{ __html: ct.schemaRulesList }} />

      <p>{ct.schemaExample}</p>
      <pre><code>{`// Version 1 — Original schema
message User {
  int32 id = 1;
  string name = 2;
  string email = 3;
}

// Version 2 — Added new fields (backward compatible!)
message User {
  int32 id = 1;
  string name = 2;
  string email = 3;
  string phone = 4;        // NEW: old clients ignore this
  UserRole role = 5;       // NEW: old clients ignore this
}

// Version 3 — Removed a field (use reserved!)
message User {
  int32 id = 1;
  string name = 2;
  // field 3 removed — email moved to ContactInfo
  reserved 3;
  reserved "email";
  string phone = 4;
  UserRole role = 5;
  ContactInfo contact = 6; // NEW: structured contact info

  // Use oneof for variant fields
  oneof notification_preference {
    string email_address = 7;
    string sms_number = 8;
    PushConfig push_config = 9;
  }
}

// Compare with JSON — no built-in evolution support:
// {
//   "id": 123,
//   "name": "Alice",
//   "email": "alice@example.com"   // Removed? Renamed?
//                                   // No schema to enforce!
// }`}</code></pre>

      {/* ===== Section 8: Type Safety ===== */}
      <h2>{ct.h2TypeSafety}</h2>
      <p>{ct.typeSafetyDesc}</p>

      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.95rem' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #e2e8f0' }}>
              <th style={{ textAlign: 'left', padding: '12px 16px', fontWeight: 700 }}>{ct.typeSafetyFeature}</th>
              <th style={{ textAlign: 'left', padding: '12px 16px', fontWeight: 700 }}>{ct.typeSafetyJson}</th>
              <th style={{ textAlign: 'left', padding: '12px 16px', fontWeight: 700 }}>{ct.typeSafetyProtobuf}</th>
            </tr>
          </thead>
          <tbody>
            {typeSafetyRows.map((row, i) => (
              <tr key={i} style={{ borderBottom: '1px solid #e2e8f0', background: i % 2 === 1 ? '#f7fafc' : undefined }}>
                <td style={{ padding: '10px 16px', fontWeight: 600 }}>{row.label}</td>
                <td style={{ padding: '10px 16px', color: '#e53e3e' }}>{row.json}</td>
                <td style={{ padding: '10px 16px', color: '#38a169' }}>{row.proto}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p>{ct.typeSafetyCodeDesc}</p>
      <pre><code>{`// ---- JSON approach (TypeScript) ----
// You must manually define and maintain types
interface User {
  id: number;
  name: string;
  email: string;
  role: "admin" | "editor" | "viewer";
}

// Runtime: no guarantee the data matches the interface!
const response = await fetch("/api/users/123");
const user: User = await response.json();
// user.role could be "superadmin" — TypeScript won't catch it at runtime

// ---- Protobuf approach (generated code) ----
// Types are auto-generated from .proto — always in sync

// Go: compile error if you use wrong type
user := &userv1.User{
    Id:   12345,
    Name: "Alice",
    Role: userv1.UserRole_USER_ROLE_ADMIN,
    // Role: "admin",  // COMPILE ERROR: cannot use string as UserRole
}

// Java: compile error if field doesn't exist
User user = User.newBuilder()
    .setId(12345)
    .setName("Alice")
    .setRole(UserRole.USER_ROLE_ADMIN)
    // .setAge(30)  // COMPILE ERROR: no such method
    .build();

// Python: runtime validation with type hints
user = User(
    id=12345,
    name="Alice",
    role=UserRole.USER_ROLE_ADMIN,
    # role="admin"  # TypeError at runtime
)`}</code></pre>

      {/* ===== Section 9: Tooling ===== */}
      <h2>{ct.h2Tooling}</h2>
      <p>{ct.toolingDesc}</p>

      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.95rem' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #e2e8f0' }}>
              <th style={{ textAlign: 'left', padding: '12px 16px', fontWeight: 700 }}>{ct.toolName}</th>
              <th style={{ textAlign: 'left', padding: '12px 16px', fontWeight: 700 }}>{ct.toolPurpose}</th>
            </tr>
          </thead>
          <tbody>
            {toolingRows.map((row, i) => (
              <tr key={i} style={{ borderBottom: '1px solid #e2e8f0', background: i % 2 === 1 ? '#f7fafc' : undefined }}>
                <td style={{ padding: '10px 16px', fontWeight: 600 }}>{row.name}</td>
                <td style={{ padding: '10px 16px' }}>{row.desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <pre><code>{`# Install protoc (Protocol Buffers compiler)
# macOS
brew install protobuf

# Linux
apt install -y protobuf-compiler

# Install Go plugins
go install google.golang.org/protobuf/cmd/protoc-gen-go@latest
go install google.golang.org/grpc/cmd/protoc-gen-go-grpc@latest

# Generate Go code from .proto
protoc --go_out=. --go-grpc_out=. proto/user/v1/user.proto

# --- Buf (modern alternative to protoc) ---
# Install buf
brew install bufbuild/buf/buf

# Initialize buf module
buf mod init

# Lint .proto files
buf lint

# Detect breaking changes
buf breaking --against '.git#branch=main'

# Generate code (configured via buf.gen.yaml)
buf generate

# --- grpcurl (curl for gRPC) ---
# List services
grpcurl -plaintext localhost:50051 list

# Describe a service
grpcurl -plaintext localhost:50051 describe user.v1.UserService

# Call an RPC
grpcurl -plaintext -d '{"id": 123}' \\
  localhost:50051 user.v1.UserService/GetUser`}</code></pre>

      {/* ===== Section 10: When to Use JSON ===== */}
      <h2>{ct.h2WhenJson}</h2>
      <div dangerouslySetInnerHTML={{ __html: ct.whenJsonList }} />

      <pre><code>{`// JSON excels in web scenarios:

// 1. Browser fetch — zero dependencies
const response = await fetch("https://api.example.com/users/123");
const user = await response.json();
console.log(user.name); // Instantly usable

// 2. Configuration — human readable & editable
// tsconfig.json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "strict": true
  }
}

// 3. Webhook payload — universal format
app.post("/webhook", (req, res) => {
  const event = req.body; // JSON parsed automatically
  console.log(event.type); // "payment.completed"
});

// 4. Logging — readable in terminal
console.log(JSON.stringify({
  level: "info",
  message: "User created",
  userId: 123,
  timestamp: new Date().toISOString()
}));`}</code></pre>

      {/* ===== Section 11: When to Use Protobuf ===== */}
      <h2>{ct.h2WhenProtobuf}</h2>
      <div dangerouslySetInnerHTML={{ __html: ct.whenProtobufList }} />

      <pre><code>{`// Protobuf excels in backend/systems scenarios:

// 1. Microservice communication (Go)
func (s *OrderService) CreateOrder(ctx context.Context,
    req *orderv1.CreateOrderRequest,
) (*orderv1.CreateOrderResponse, error) {
    // Type-safe request — no parsing errors possible
    userId := req.GetUserId()      // int32, guaranteed
    items := req.GetItems()        // []*OrderItem, validated

    // Call another microservice via gRPC
    user, err := s.userClient.GetUser(ctx,
        &userv1.GetUserRequest{Id: userId})
    // ...
}

// 2. Kafka message serialization
producer.Send(&kafka.Message{
    Topic: "orders",
    Value: proto.Marshal(&orderv1.OrderEvent{
        Type:    orderv1.EventType_ORDER_CREATED,
        OrderId: 12345,
        UserId:  67890,
    }), // ~28 bytes vs ~180 bytes JSON
})

// 3. Mobile app (Kotlin/Android)
val channel = ManagedChannelBuilder
    .forAddress("api.example.com", 443)
    .useTransportSecurity()
    .build()
val stub = UserServiceGrpc.newBlockingStub(channel)
val user = stub.getUser(
    GetUserRequest.newBuilder().setId(123).build()
) // 73% smaller payload = less battery drain`}</code></pre>

      {/* ===== Section 12: Migration Path ===== */}
      <h2>{ct.h2Migration}</h2>
      <p>{ct.migrationDesc}</p>

      <h3>{ct.h3MigStep1}</h3>
      <p>{ct.migStep1Desc}</p>
      <pre><code>{`// Existing JSON API response:
// GET /api/v1/products/123
{
  "id": 123,
  "name": "Wireless Mouse",
  "price": 29.99,
  "category": "electronics",
  "inStock": true,
  "tags": ["wireless", "bluetooth", "ergonomic"]
}

// Step 1: Write matching .proto schema
syntax = "proto3";

package product.v1;

message Product {
  int32 id = 1;
  string name = 2;
  double price = 3;
  string category = 4;
  bool in_stock = 5;
  repeated string tags = 6;
}

// Generate code: protoc --go_out=. product.proto
// Now you have type-safe Product structs — even before switching to gRPC`}</code></pre>

      <h3>{ct.h3MigStep2}</h3>
      <p>{ct.migStep2Desc}</p>
      <pre><code>{`// grpc-gateway — serve REST + gRPC from one codebase

// product.proto with HTTP annotations
syntax = "proto3";

import "google/api/annotations.proto";

service ProductService {
  rpc GetProduct(GetProductRequest) returns (Product) {
    option (google.api.http) = {
      get: "/api/v1/products/{id}"  // REST endpoint
    };
  }
  rpc CreateProduct(CreateProductRequest) returns (Product) {
    option (google.api.http) = {
      post: "/api/v1/products"
      body: "*"
    };
  }
}

// Architecture:
//
// Browser/REST clients                 gRPC clients
//        |                                  |
//        v                                  |
//  [gRPC-Gateway]  ---- HTTP/JSON ----      |
//        |                                  |
//        +--------> [gRPC Server] <---------+
//                       |
//                   [Business Logic]`}</code></pre>

      <h3>{ct.h3MigStep3}</h3>
      <p>{ct.migStep3Desc}</p>
      <pre><code>{`// Migration architecture — gradual adoption
//
//  [Web Frontend]          [Mobile App]
//       |                       |
//   REST/JSON              gRPC/Protobuf (migrated!)
//       |                       |
//       v                       v
//  [API Gateway / gRPC-Gateway]
//       |
//       +--- gRPC ---> [User Service]     (migrated)
//       +--- gRPC ---> [Order Service]    (migrated)
//       +--- REST ---> [Legacy Payment]   (not yet migrated)
//       +--- gRPC ---> [Inventory Service] (new, born gRPC)

// Connect RPC — alternative that supports both protocols natively
// No proxy needed! Same handler serves gRPC + REST + Connect protocol

import (
    "connectrpc.com/connect"
    userv1connect "github.com/example/gen/user/v1/userv1connect"
)

func main() {
    mux := http.NewServeMux()
    path, handler := userv1connect.NewUserServiceHandler(&userServer{})
    mux.Handle(path, handler)
    // Serves gRPC, gRPC-Web, AND Connect protocol on same port
    http.ListenAndServe(":8080", h2c.NewHandler(mux, &http2.Server{}))
}`}</code></pre>

      <h3>{ct.h3MigStep4}</h3>
      <p>{ct.migStep4Desc}</p>

      <pre><code>{`// Client migration priority:
//
// 1. Mobile apps      — highest ROI (bandwidth savings)
// 2. Internal tools   — easy to control, low risk
// 3. Partner APIs     — provide .proto + generated SDKs
// 4. Public web API   — keep REST/JSON, add gRPC as option
//
// TypeScript client with Connect RPC (works in browsers!)
import { createClient } from "@connectrpc/connect";
import { createConnectTransport } from "@connectrpc/connect-web";
import { UserService } from "./gen/user/v1/user_connect";

const transport = createConnectTransport({
  baseUrl: "https://api.example.com",
});

const client = createClient(UserService, transport);

// Type-safe API call — auto-generated from .proto!
const user = await client.getUser({ id: 123 });
console.log(user.name); // TypeScript knows this is string`}</code></pre>

      <p dangerouslySetInnerHTML={{ __html: ct.migWarning }} />

      {/* ===== Section 13: FAQ ===== */}
      <div className="faq-section">
        <h2>{ct.h2Faq}</h2>
        <h3>{ct.faq1Q}</h3>
        <p>{ct.faq1A}</p>
        <h3>{ct.faq2Q}</h3>
        <p>{ct.faq2A}</p>
        <h3>{ct.faq3Q}</h3>
        <p dangerouslySetInnerHTML={{ __html: ct.faq3A }} />
        <h3>{ct.faq4Q}</h3>
        <p>{ct.faq4A}</p>
        <h3>{ct.faq5Q}</h3>
        <p>{ct.faq5A}</p>
      </div>

      <p style={{ marginTop: '2rem' }}>
        <Link href={`/${lang}/tools/json-to-protobuf`} style={{ fontWeight: 600 }}>
          {ct.linkJsonProtobuf}
        </Link>
      </p>
      <p>
        <Link href={`/${lang}/tools/json-formatter`} style={{ fontWeight: 600 }}>
          {ct.linkJsonFormatter}
        </Link>
      </p>
    </>
  );
}
