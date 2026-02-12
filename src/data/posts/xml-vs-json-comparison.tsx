'use client';
import React from 'react';
import Link from 'next/link';

const t: Record<string, Record<string, string>> = {
  en: {
    intro: 'XML and JSON are the two most widely used data interchange formats in software development. While JSON has become the dominant choice for web APIs, XML remains essential in many enterprise and document-centric use cases. This guide provides a <strong>comprehensive comparison</strong> with side-by-side examples, a detailed feature table, performance benchmarks, and practical migration patterns.',
    linkXmlFormatter: 'Format and validate your XML instantly with our free XML Formatter tool \u2192',
    linkJsonFormatter: 'Format and validate JSON with our free JSON Formatter tool \u2192',

    // Section 1: Quick Answer
    h2Quick: 'Quick Answer: Which Should You Use?',
    quickDesc: '<strong>Use JSON</strong> when building REST APIs, web applications, configuration files, or working with NoSQL databases. JSON is lighter, faster to parse, and natively supported in JavaScript.<br/><br/><strong>Use XML</strong> when you need document markup, namespaces, schema validation, XSLT transformations, or working with enterprise systems (SOAP, RSS/Atom, SVG, XHTML). XML excels at representing mixed content and self-describing documents.',

    // Section 2: Syntax Comparison
    h2Syntax: 'Syntax Comparison: Same Data, Two Formats',
    syntaxDesc: 'Here is the same data structure expressed in both XML and JSON:',

    // Section 3: Feature Comparison
    h2Features: 'Feature Comparison Table',
    featFeature: 'Feature',
    featXml: 'XML',
    featJson: 'JSON',
    featSchema: 'Schema Validation',
    schemaXml: 'Yes \u2014 XSD, DTD, RelaxNG (very powerful)',
    schemaJson: 'Yes \u2014 JSON Schema (less mature)',
    featNamespaces: 'Namespaces',
    nsXml: 'Yes \u2014 built-in namespace support',
    nsJson: 'No \u2014 no native namespace concept',
    featComments: 'Comments',
    commentsXml: 'Yes \u2014 <!-- comment -->',
    commentsJson: 'No \u2014 not allowed in standard JSON',
    featAttributes: 'Attributes',
    attrXml: 'Yes \u2014 elements can have attributes',
    attrJson: 'No \u2014 only key-value pairs',
    featCdata: 'CDATA Sections',
    cdataXml: 'Yes \u2014 for raw/unescaped content',
    cdataJson: 'No \u2014 all strings are escaped',
    featXpath: 'Query Language',
    xpathXml: 'XPath, XQuery (powerful querying)',
    xpathJson: 'JSONPath, jq (simpler)',
    featSize: 'Data Size',
    sizeXml: 'Larger \u2014 verbose tags add overhead',
    sizeJson: 'Smaller \u2014 minimal syntax, less overhead',
    featReadability: 'Human Readability',
    readXml: 'Good \u2014 self-describing tags',
    readJson: 'Good \u2014 clean, less visual noise',
    featParseSpeed: 'Parse Speed',
    parseXml: 'Slower \u2014 complex DOM/SAX parsing',
    parseJson: 'Faster \u2014 simple grammar, native in JS',
    featBrowser: 'Browser Support',
    browserXml: 'Good \u2014 DOMParser, XSLT processor',
    browserJson: 'Excellent \u2014 native JSON.parse/stringify',
    featStreaming: 'Streaming',
    streamXml: 'Yes \u2014 SAX, StAX for large files',
    streamJson: 'Limited \u2014 needs streaming libraries',
    featValidation: 'Built-in Validation',
    validXml: 'Strong \u2014 DTD, XSD enforce structure',
    validJson: 'Basic \u2014 JSON Schema is optional',
    featTransform: 'Transformation',
    transformXml: 'XSLT \u2014 powerful transformation language',
    transformJson: 'No native equivalent \u2014 use code',
    featMixed: 'Mixed Content',
    mixedXml: 'Yes \u2014 text + elements can be interleaved',
    mixedJson: 'No \u2014 not designed for mixed content',
    featMetadata: 'Metadata',
    metaXml: 'Processing instructions, attributes, comments',
    metaJson: 'No built-in metadata mechanism',
    featDataTypes: 'Data Types',
    typesXml: 'All values are strings by default',
    typesJson: 'string, number, boolean, null, array, object',
    featEncoding: 'Encoding Declaration',
    encXml: 'Yes \u2014 <?xml encoding="UTF-8"?>',
    encJson: 'No \u2014 assumes UTF-8',
    featOrdering: 'Element Ordering',
    orderXml: 'Preserved \u2014 order is significant',
    orderJson: 'Objects unordered, arrays ordered',

    // Section 4: When to Use JSON
    h2WhenJson: 'When to Use JSON',
    whenJsonList: '<ul><li><strong>REST APIs</strong> \u2014 JSON is the universal payload format for modern web APIs (fetch, Axios, GraphQL)</li><li><strong>Configuration files</strong> \u2014 package.json, tsconfig.json, .eslintrc.json, composer.json</li><li><strong>NoSQL databases</strong> \u2014 MongoDB, CouchDB, DynamoDB store JSON-like documents natively</li><li><strong>Web applications</strong> \u2014 JavaScript/TypeScript can parse JSON natively with zero dependencies</li><li><strong>Real-time data</strong> \u2014 WebSocket messages, Server-Sent Events typically use JSON</li><li><strong>Mobile APIs</strong> \u2014 smaller payload size means faster transfers on mobile networks</li></ul>',

    // Section 5: When to Use XML
    h2WhenXml: 'When to Use XML',
    whenXmlList: '<ul><li><strong>SOAP web services</strong> \u2014 enterprise APIs still widely use XML-based SOAP protocols</li><li><strong>RSS/Atom feeds</strong> \u2014 syndication formats are XML-based</li><li><strong>SVG graphics</strong> \u2014 Scalable Vector Graphics is an XML vocabulary</li><li><strong>XHTML/HTML5</strong> \u2014 strict XHTML serialization uses XML syntax</li><li><strong>Enterprise integration</strong> \u2014 healthcare (HL7/FHIR), finance (FIX, XBRL), government (UBL)</li><li><strong>Document markup</strong> \u2014 DocBook, DITA, TEI for structured documents</li><li><strong>Office documents</strong> \u2014 OOXML (.docx, .xlsx) and ODF (.odt) are XML-based</li><li><strong>Configuration with validation</strong> \u2014 Maven pom.xml, Spring XML, Android manifests</li></ul>',

    // Section 6: Performance Benchmarks
    h2Perf: 'Performance Benchmarks',
    perfDesc: 'Typical performance characteristics when processing the same dataset (approximate values, actual results vary by implementation and data):',
    perfMetric: 'Metric',
    perfXml: 'XML',
    perfJson: 'JSON',
    perfParseTime: 'Parse Time (1MB file)',
    parseTimeXml: '~50\u201380ms',
    parseTimeJson: '~15\u201330ms',
    perfFileSize: 'File Size (same data)',
    fileSizeXml: '~1.0x (baseline)',
    fileSizeJson: '~0.5\u20130.7x',
    perfMemory: 'Memory Usage (DOM)',
    memoryXml: '~3\u20135x document size',
    memoryJson: '~2\u20133x document size',
    perfSerialize: 'Serialization Speed',
    serializeXml: 'Moderate',
    serializeJson: 'Fast (JSON.stringify)',
    perfStreamParse: 'Streaming Parse (1GB)',
    streamParseXml: 'SAX: efficient, low memory',
    streamParseJson: 'Requires external libraries',
    perfNote: 'Note: XML streaming parsers (SAX/StAX) can process very large files with constant memory. JSON streaming is possible but requires libraries like <code>json-stream</code> or <code>ijson</code>. For small payloads (&lt;100KB), the difference is negligible.',

    // Section 7: Parsing in Code
    h2Parsing: 'Parsing in Different Languages',
    h3ParseJs: 'JavaScript / TypeScript',
    h3ParsePython: 'Python',
    h3ParseJava: 'Java',
    h3ParseGo: 'Go',

    // Section 8: Migration
    h2Migration: 'Migration: XML to JSON Conversion Patterns',
    migrationDesc: 'Converting XML to JSON is not always straightforward because of fundamental differences. Here are the common patterns and gotchas:',
    h3MigPattern1: 'Simple Elements',
    h3MigPattern2: 'Attributes',
    h3MigPattern3: 'Mixed Content',
    h3MigPattern4: 'Repeated Elements',
    migWarning: '<strong>Important:</strong> There is no single "correct" way to convert XML to JSON. Different converters use different conventions (e.g., <code>@attr</code> vs <code>_attr</code> vs <code>$attr</code> for attributes). Always document your conversion convention and be consistent.',

    // Section 9: Alternatives
    h2Alternatives: 'Alternatives to XML and JSON',
    altDesc: 'While XML and JSON dominate, several other formats address specific needs:',
    altYaml: 'YAML',
    altYamlDesc: 'Human-friendly configuration format. Popular for Docker Compose, Kubernetes, CI/CD. Superset of JSON but with comments, multi-line strings, and cleaner syntax.',
    altToml: 'TOML',
    altTomlDesc: 'Minimal, unambiguous configuration format. Used by Rust (Cargo.toml), Python (pyproject.toml). Better than JSON for config, simpler than YAML.',
    altProtobuf: 'Protocol Buffers',
    altProtobufDesc: 'Google\'s binary serialization format. 3\u201310x smaller than JSON, much faster to parse. Requires a schema (.proto file). Ideal for microservice communication.',
    altMsgpack: 'MessagePack',
    altMsgpackDesc: 'Binary format compatible with JSON data types. Smaller and faster than JSON. No schema required. Good for caching, inter-service communication.',
    altAvro: 'Apache Avro',
    altAvroDesc: 'Binary format with schema evolution support. Popular in big data (Hadoop, Kafka). Schema is sent with data, enabling rich type information.',

    // Section 10: FAQ
    h2Faq: 'Frequently Asked Questions',
    faq1Q: 'Is JSON always faster than XML?',
    faq1A: 'For parsing, JSON is generally 2\u20134x faster than XML DOM parsing because JSON has a simpler grammar. However, XML SAX/StAX streaming parsers can process very large files more efficiently than non-streaming JSON parsers. For small payloads under 100KB, the speed difference is negligible. The real performance gain from JSON comes from smaller file sizes, which reduce network transfer time.',
    faq2Q: 'Can JSON replace XML completely?',
    faq2A: 'No. JSON cannot represent mixed content (text interleaved with markup), does not support namespaces, lacks a native transformation language like XSLT, and has weaker schema validation compared to XSD. Many industry standards (SOAP, RSS, SVG, Office formats, healthcare HL7) are XML-based and cannot be replaced. JSON is better for data interchange; XML is better for documents.',
    faq3Q: 'Why do REST APIs use JSON instead of XML?',
    faq3A: 'REST APIs adopted JSON because: (1) it is natively parsed by JavaScript in browsers, (2) it produces smaller payloads than XML, (3) the syntax is simpler and easier to read, (4) it maps directly to common programming data structures (objects, arrays). SOAP APIs historically used XML, but most new APIs prefer REST with JSON.',
    faq4Q: 'Should I use XML or JSON for configuration files?',
    faq4A: 'For most projects, JSON (or YAML/TOML) is preferred for configuration files because of simplicity and tooling. However, XML is still used for complex configurations that benefit from schema validation (Maven pom.xml, Spring XML, Android manifests). If you need comments in your config, use YAML, TOML, or XML \u2014 standard JSON does not support comments.',
    faq5Q: 'How do I convert XML to JSON?',
    faq5A: 'Use a library appropriate for your language: <code>xml2js</code> (Node.js), <code>xmltodict</code> (Python), <code>Jackson XML</code> (Java), or <code>encoding/xml</code> (Go). Be aware that XML attributes, namespaces, and mixed content have no direct JSON equivalent, so choose a convention (like using <code>@attr</code> for attributes) and document it. Our XML Formatter tool can help you inspect XML structure before conversion.',
  },
  zh: {
    intro: 'XML 和 JSON 是软件开发中使用最广泛的两种数据交换格式。虽然 JSON 已成为 Web API 的主流选择，但 XML 在许多企业级和文档导向的场景中仍然不可或缺。本指南提供<strong>全面的对比分析</strong>，包含并排示例、详细功能对比表、性能基准测试和实用的迁移模式。',
    linkXmlFormatter: '使用我们的免费 XML 格式化工具即时格式化和验证 XML \u2192',
    linkJsonFormatter: '使用我们的免费 JSON 格式化工具格式化和验证 JSON \u2192',

    // Section 1: Quick Answer
    h2Quick: '快速解答：应该使用哪个？',
    quickDesc: '<strong>使用 JSON</strong>：构建 REST API、Web 应用、配置文件，或使用 NoSQL 数据库时。JSON 更轻量、解析更快，且在 JavaScript 中原生支持。<br/><br/><strong>使用 XML</strong>：需要文档标记、命名空间、模式验证、XSLT 转换，或与企业系统（SOAP、RSS/Atom、SVG、XHTML）交互时。XML 擅长表示混合内容和自描述文档。',

    // Section 2: Syntax Comparison
    h2Syntax: '语法对比：相同数据，两种格式',
    syntaxDesc: '以下是用 XML 和 JSON 两种格式表达的相同数据结构：',

    // Section 3: Feature Comparison
    h2Features: '功能对比表',
    featFeature: '特性',
    featXml: 'XML',
    featJson: 'JSON',
    featSchema: '模式验证',
    schemaXml: '支持 \u2014 XSD、DTD、RelaxNG（非常强大）',
    schemaJson: '支持 \u2014 JSON Schema（较不成熟）',
    featNamespaces: '命名空间',
    nsXml: '支持 \u2014 内置命名空间机制',
    nsJson: '不支持 \u2014 无原生命名空间概念',
    featComments: '注释',
    commentsXml: '支持 \u2014 <!-- 注释 -->',
    commentsJson: '不支持 \u2014 标准 JSON 不允许注释',
    featAttributes: '属性',
    attrXml: '支持 \u2014 元素可以拥有属性',
    attrJson: '不支持 \u2014 只有键值对',
    featCdata: 'CDATA 区段',
    cdataXml: '支持 \u2014 用于原始/未转义内容',
    cdataJson: '不支持 \u2014 所有字符串都需转义',
    featXpath: '查询语言',
    xpathXml: 'XPath、XQuery（功能强大）',
    xpathJson: 'JSONPath、jq（较简单）',
    featSize: '数据大小',
    sizeXml: '较大 \u2014 冗长的标签增加开销',
    sizeJson: '较小 \u2014 最少语法，更少开销',
    featReadability: '可读性',
    readXml: '良好 \u2014 自描述的标签',
    readJson: '良好 \u2014 简洁，视觉噪音少',
    featParseSpeed: '解析速度',
    parseXml: '较慢 \u2014 复杂的 DOM/SAX 解析',
    parseJson: '较快 \u2014 语法简单，JS 原生支持',
    featBrowser: '浏览器支持',
    browserXml: '良好 \u2014 DOMParser、XSLT 处理器',
    browserJson: '优秀 \u2014 原生 JSON.parse/stringify',
    featStreaming: '流式处理',
    streamXml: '支持 \u2014 SAX、StAX 处理大文件',
    streamJson: '有限 \u2014 需要流式处理库',
    featValidation: '内置验证',
    validXml: '强大 \u2014 DTD、XSD 强制约束结构',
    validJson: '基本 \u2014 JSON Schema 是可选的',
    featTransform: '转换能力',
    transformXml: 'XSLT \u2014 强大的转换语言',
    transformJson: '无原生等价物 \u2014 需用代码实现',
    featMixed: '混合内容',
    mixedXml: '支持 \u2014 文本和元素可以交错',
    mixedJson: '不支持 \u2014 不适用于混合内容',
    featMetadata: '元数据',
    metaXml: '处理指令、属性、注释',
    metaJson: '无内置元数据机制',
    featDataTypes: '数据类型',
    typesXml: '所有值默认为字符串',
    typesJson: '字符串、数字、布尔值、null、数组、对象',
    featEncoding: '编码声明',
    encXml: '支持 \u2014 <?xml encoding="UTF-8"?>',
    encJson: '不支持 \u2014 默认 UTF-8',
    featOrdering: '元素顺序',
    orderXml: '保留 \u2014 顺序有意义',
    orderJson: '对象无序，数组有序',

    // Section 4: When to Use JSON
    h2WhenJson: '何时使用 JSON',
    whenJsonList: '<ul><li><strong>REST API</strong> \u2014 JSON 是现代 Web API 的通用载荷格式（fetch、Axios、GraphQL）</li><li><strong>配置文件</strong> \u2014 package.json、tsconfig.json、.eslintrc.json、composer.json</li><li><strong>NoSQL 数据库</strong> \u2014 MongoDB、CouchDB、DynamoDB 原生存储类 JSON 文档</li><li><strong>Web 应用</strong> \u2014 JavaScript/TypeScript 无需依赖即可原生解析 JSON</li><li><strong>实时数据</strong> \u2014 WebSocket 消息、Server-Sent Events 通常使用 JSON</li><li><strong>移动端 API</strong> \u2014 更小的载荷意味着在移动网络上更快的传输</li></ul>',

    // Section 5: When to Use XML
    h2WhenXml: '何时使用 XML',
    whenXmlList: '<ul><li><strong>SOAP Web 服务</strong> \u2014 企业级 API 仍广泛使用基于 XML 的 SOAP 协议</li><li><strong>RSS/Atom 订阅</strong> \u2014 内容聚合格式基于 XML</li><li><strong>SVG 图形</strong> \u2014 可缩放矢量图形是 XML 词汇表</li><li><strong>XHTML/HTML5</strong> \u2014 严格的 XHTML 序列化使用 XML 语法</li><li><strong>企业集成</strong> \u2014 医疗（HL7/FHIR）、金融（FIX、XBRL）、政府（UBL）</li><li><strong>文档标记</strong> \u2014 DocBook、DITA、TEI 用于结构化文档</li><li><strong>Office 文档</strong> \u2014 OOXML（.docx、.xlsx）和 ODF（.odt）基于 XML</li><li><strong>带验证的配置</strong> \u2014 Maven pom.xml、Spring XML、Android 清单</li></ul>',

    // Section 6: Performance Benchmarks
    h2Perf: '性能基准测试',
    perfDesc: '处理相同数据集的典型性能特征（近似值，实际结果因实现和数据而异）：',
    perfMetric: '指标',
    perfXml: 'XML',
    perfJson: 'JSON',
    perfParseTime: '解析时间（1MB 文件）',
    parseTimeXml: '~50\u201380ms',
    parseTimeJson: '~15\u201330ms',
    perfFileSize: '文件大小（相同数据）',
    fileSizeXml: '~1.0x（基准）',
    fileSizeJson: '~0.5\u20130.7x',
    perfMemory: '内存使用（DOM）',
    memoryXml: '约为文档大小的 3\u20135 倍',
    memoryJson: '约为文档大小的 2\u20133 倍',
    perfSerialize: '序列化速度',
    serializeXml: '中等',
    serializeJson: '快速（JSON.stringify）',
    perfStreamParse: '流式解析（1GB）',
    streamParseXml: 'SAX：高效、低内存',
    streamParseJson: '需要外部库支持',
    perfNote: '注意：XML 流式解析器（SAX/StAX）可以用恒定内存处理超大文件。JSON 流式解析也可行，但需要 <code>json-stream</code> 或 <code>ijson</code> 等库。对于小于 100KB 的载荷，差异可以忽略不计。',

    // Section 7: Parsing in Code
    h2Parsing: '不同语言中的解析方式',
    h3ParseJs: 'JavaScript / TypeScript',
    h3ParsePython: 'Python',
    h3ParseJava: 'Java',
    h3ParseGo: 'Go',

    // Section 8: Migration
    h2Migration: '迁移：XML 到 JSON 转换模式',
    migrationDesc: '由于两者的根本差异，将 XML 转换为 JSON 并不总是简单直接的。以下是常见的模式和注意事项：',
    h3MigPattern1: '简单元素',
    h3MigPattern2: '属性',
    h3MigPattern3: '混合内容',
    h3MigPattern4: '重复元素',
    migWarning: '<strong>重要提示：</strong>XML 转 JSON 没有唯一"正确"的方式。不同的转换器使用不同的约定（如属性的表示：<code>@attr</code>、<code>_attr</code> 或 <code>$attr</code>）。务必记录你的转换约定并保持一致。',

    // Section 9: Alternatives
    h2Alternatives: 'XML 和 JSON 的替代方案',
    altDesc: '虽然 XML 和 JSON 占据主导地位，但还有一些格式可以满足特定需求：',
    altYaml: 'YAML',
    altYamlDesc: '对人类友好的配置格式。广泛用于 Docker Compose、Kubernetes、CI/CD。是 JSON 的超集，但支持注释、多行字符串和更简洁的语法。',
    altToml: 'TOML',
    altTomlDesc: '最小化、无歧义的配置格式。用于 Rust（Cargo.toml）、Python（pyproject.toml）。比 JSON 更适合配置，比 YAML 更简单。',
    altProtobuf: 'Protocol Buffers',
    altProtobufDesc: 'Google 的二进制序列化格式。比 JSON 小 3\u201310 倍，解析速度更快。需要 Schema（.proto 文件）。适合微服务通信。',
    altMsgpack: 'MessagePack',
    altMsgpackDesc: '与 JSON 数据类型兼容的二进制格式。比 JSON 更小更快。无需 Schema。适合缓存、服务间通信。',
    altAvro: 'Apache Avro',
    altAvroDesc: '支持 Schema 演化的二进制格式。在大数据领域流行（Hadoop、Kafka）。Schema 随数据发送，支持丰富的类型信息。',

    // Section 10: FAQ
    h2Faq: '常见问题',
    faq1Q: 'JSON 总是比 XML 快吗？',
    faq1A: '在解析方面，JSON 通常比 XML DOM 解析快 2\u20134 倍，因为 JSON 的语法更简单。但是，XML 的 SAX/StAX 流式解析器处理超大文件时比非流式 JSON 解析器更高效。对于小于 100KB 的载荷，速度差异可以忽略。JSON 真正的性能优势来自更小的文件大小，减少了网络传输时间。',
    faq2Q: 'JSON 能完全替代 XML 吗？',
    faq2A: '不能。JSON 无法表示混合内容（文本与标记交错），不支持命名空间，缺少像 XSLT 这样的原生转换语言，且模式验证能力不如 XSD。许多行业标准（SOAP、RSS、SVG、Office 格式、医疗 HL7）都基于 XML，无法被替代。JSON 更适合数据交换，XML 更适合文档。',
    faq3Q: '为什么 REST API 使用 JSON 而不是 XML？',
    faq3A: 'REST API 采用 JSON 因为：(1) 浏览器中的 JavaScript 可原生解析；(2) 载荷比 XML 更小；(3) 语法更简单、更易读；(4) 可直接映射到常见的编程数据结构（对象、数组）。SOAP API 历来使用 XML，但大多数新 API 更倾向于使用 JSON 的 REST。',
    faq4Q: '配置文件应该用 XML 还是 JSON？',
    faq4A: '对大多数项目来说，JSON（或 YAML/TOML）因其简洁性和工具支持而更受青睐。但 XML 仍用于需要模式验证的复杂配置（Maven pom.xml、Spring XML、Android 清单）。如果配置中需要注释，请使用 YAML、TOML 或 XML——标准 JSON 不支持注释。',
    faq5Q: '如何将 XML 转换为 JSON？',
    faq5A: '使用适合你语言的库：<code>xml2js</code>（Node.js）、<code>xmltodict</code>（Python）、<code>Jackson XML</code>（Java）或 <code>encoding/xml</code>（Go）。注意 XML 属性、命名空间和混合内容在 JSON 中没有直接等价物，所以要选择一种约定（如用 <code>@attr</code> 表示属性）并加以文档化。我们的 XML 格式化工具可以帮你在转换前检查 XML 结构。',
  },
};

export default function XmlVsJson({ lang }: { lang: string }) {
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

  /* table row helper */
  const featureRows: Array<{ label: string; xml: string; json: string; xmlColor?: string; jsonColor?: string }> = [
    { label: ct.featSchema, xml: ct.schemaXml, json: ct.schemaJson, xmlColor: '#38a169', jsonColor: '#d69e2e' },
    { label: ct.featNamespaces, xml: ct.nsXml, json: ct.nsJson, xmlColor: '#38a169', jsonColor: '#e53e3e' },
    { label: ct.featComments, xml: ct.commentsXml, json: ct.commentsJson, xmlColor: '#38a169', jsonColor: '#e53e3e' },
    { label: ct.featAttributes, xml: ct.attrXml, json: ct.attrJson, xmlColor: '#38a169', jsonColor: '#e53e3e' },
    { label: ct.featCdata, xml: ct.cdataXml, json: ct.cdataJson, xmlColor: '#38a169', jsonColor: '#e53e3e' },
    { label: ct.featXpath, xml: ct.xpathXml, json: ct.xpathJson },
    { label: ct.featSize, xml: ct.sizeXml, json: ct.sizeJson, xmlColor: '#e53e3e', jsonColor: '#38a169' },
    { label: ct.featReadability, xml: ct.readXml, json: ct.readJson },
    { label: ct.featParseSpeed, xml: ct.parseXml, json: ct.parseJson, xmlColor: '#e53e3e', jsonColor: '#38a169' },
    { label: ct.featBrowser, xml: ct.browserXml, json: ct.browserJson, xmlColor: '#d69e2e', jsonColor: '#38a169' },
    { label: ct.featStreaming, xml: ct.streamXml, json: ct.streamJson, xmlColor: '#38a169', jsonColor: '#d69e2e' },
    { label: ct.featValidation, xml: ct.validXml, json: ct.validJson, xmlColor: '#38a169', jsonColor: '#d69e2e' },
    { label: ct.featTransform, xml: ct.transformXml, json: ct.transformJson, xmlColor: '#38a169', jsonColor: '#e53e3e' },
    { label: ct.featMixed, xml: ct.mixedXml, json: ct.mixedJson, xmlColor: '#38a169', jsonColor: '#e53e3e' },
    { label: ct.featMetadata, xml: ct.metaXml, json: ct.metaJson, xmlColor: '#38a169', jsonColor: '#e53e3e' },
    { label: ct.featDataTypes, xml: ct.typesXml, json: ct.typesJson },
    { label: ct.featEncoding, xml: ct.encXml, json: ct.encJson, xmlColor: '#38a169', jsonColor: '#e53e3e' },
    { label: ct.featOrdering, xml: ct.orderXml, json: ct.orderJson },
  ];

  const perfRows = [
    { label: ct.perfParseTime, xml: ct.parseTimeXml, json: ct.parseTimeJson },
    { label: ct.perfFileSize, xml: ct.fileSizeXml, json: ct.fileSizeJson },
    { label: ct.perfMemory, xml: ct.memoryXml, json: ct.memoryJson },
    { label: ct.perfSerialize, xml: ct.serializeXml, json: ct.serializeJson },
    { label: ct.perfStreamParse, xml: ct.streamParseXml, json: ct.streamParseJson },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <p dangerouslySetInnerHTML={{ __html: ct.intro }} />

      <p>
        <Link href={`/${lang}/tools/xml-formatter`} style={{ fontWeight: 600 }}>
          {ct.linkXmlFormatter}
        </Link>
      </p>

      {/* ===== Section 1: Quick Answer ===== */}
      <h2>{ct.h2Quick}</h2>
      <p dangerouslySetInnerHTML={{ __html: ct.quickDesc }} />

      {/* ===== Section 2: Syntax Comparison ===== */}
      <h2>{ct.h2Syntax}</h2>
      <p>{ct.syntaxDesc}</p>

      <h3>XML</h3>
      <pre><code>{`<?xml version="1.0" encoding="UTF-8"?>
<bookstore>
  <book isbn="978-0-13-468599-1" category="programming">
    <title lang="en">The Pragmatic Programmer</title>
    <authors>
      <author>David Thomas</author>
      <author>Andrew Hunt</author>
    </authors>
    <year>2019</year>
    <price currency="USD">49.95</price>
    <inStock>true</inStock>
    <tags>
      <tag>programming</tag>
      <tag>best-practices</tag>
      <tag>career</tag>
    </tags>
  </book>
</bookstore>`}</code></pre>

      <h3>JSON</h3>
      <pre><code>{`{
  "bookstore": {
    "books": [
      {
        "isbn": "978-0-13-468599-1",
        "category": "programming",
        "title": "The Pragmatic Programmer",
        "titleLang": "en",
        "authors": [
          "David Thomas",
          "Andrew Hunt"
        ],
        "year": 2019,
        "price": 49.95,
        "priceCurrency": "USD",
        "inStock": true,
        "tags": ["programming", "best-practices", "career"]
      }
    ]
  }
}`}</code></pre>

      {/* ===== Section 3: Feature Comparison Table ===== */}
      <h2>{ct.h2Features}</h2>

      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.95rem' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #e2e8f0' }}>
              <th style={{ textAlign: 'left', padding: '12px 16px', fontWeight: 700 }}>{ct.featFeature}</th>
              <th style={{ textAlign: 'left', padding: '12px 16px', fontWeight: 700 }}>{ct.featXml}</th>
              <th style={{ textAlign: 'left', padding: '12px 16px', fontWeight: 700 }}>{ct.featJson}</th>
            </tr>
          </thead>
          <tbody>
            {featureRows.map((row, i) => (
              <tr key={i} style={{ borderBottom: '1px solid #e2e8f0', background: i % 2 === 1 ? '#f7fafc' : undefined }}>
                <td style={{ padding: '10px 16px', fontWeight: 600 }}>{row.label}</td>
                <td style={{ padding: '10px 16px', color: row.xmlColor }}>{row.xml}</td>
                <td style={{ padding: '10px 16px', color: row.jsonColor }}>{row.json}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ===== Section 4: When to Use JSON ===== */}
      <h2>{ct.h2WhenJson}</h2>
      <div dangerouslySetInnerHTML={{ __html: ct.whenJsonList }} />

      <pre><code>{`// REST API response (JSON)
{
  "status": "success",
  "data": {
    "users": [
      { "id": 1, "name": "Alice", "email": "alice@example.com" },
      { "id": 2, "name": "Bob", "email": "bob@example.com" }
    ],
    "pagination": { "page": 1, "total": 42 }
  }
}

// package.json
{
  "name": "my-app",
  "version": "1.0.0",
  "scripts": {
    "dev": "next dev",
    "build": "next build"
  },
  "dependencies": {
    "react": "^19.0.0",
    "next": "^15.0.0"
  }
}`}</code></pre>

      {/* ===== Section 5: When to Use XML ===== */}
      <h2>{ct.h2WhenXml}</h2>
      <div dangerouslySetInnerHTML={{ __html: ct.whenXmlList }} />

      <pre><code>{`<!-- SOAP Request -->
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <GetStockPrice xmlns="http://example.com/stocks">
      <StockName>GOOG</StockName>
    </GetStockPrice>
  </soap:Body>
</soap:Envelope>

<!-- RSS Feed -->
<rss version="2.0">
  <channel>
    <title>DevToolBox Blog</title>
    <link>https://viadreams.cc/en/blog</link>
    <item>
      <title>XML vs JSON Comparison</title>
      <description>Complete guide...</description>
    </item>
  </channel>
</rss>

<!-- SVG -->
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <circle cx="50" cy="50" r="40" fill="#3b82f6" />
  <text x="50" y="55" text-anchor="middle" fill="white">SVG</text>
</svg>

<!-- Maven pom.xml -->
<project xmlns="http://maven.apache.org/POM/4.0.0">
  <modelVersion>4.0.0</modelVersion>
  <groupId>com.example</groupId>
  <artifactId>my-app</artifactId>
  <version>1.0-SNAPSHOT</version>
</project>`}</code></pre>

      {/* ===== Section 6: Performance Benchmarks ===== */}
      <h2>{ct.h2Perf}</h2>
      <p>{ct.perfDesc}</p>

      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.95rem' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #e2e8f0' }}>
              <th style={{ textAlign: 'left', padding: '12px 16px', fontWeight: 700 }}>{ct.perfMetric}</th>
              <th style={{ textAlign: 'left', padding: '12px 16px', fontWeight: 700 }}>{ct.perfXml}</th>
              <th style={{ textAlign: 'left', padding: '12px 16px', fontWeight: 700 }}>{ct.perfJson}</th>
            </tr>
          </thead>
          <tbody>
            {perfRows.map((row, i) => (
              <tr key={i} style={{ borderBottom: '1px solid #e2e8f0', background: i % 2 === 1 ? '#f7fafc' : undefined }}>
                <td style={{ padding: '10px 16px', fontWeight: 600 }}>{row.label}</td>
                <td style={{ padding: '10px 16px' }}>{row.xml}</td>
                <td style={{ padding: '10px 16px' }}>{row.json}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p dangerouslySetInnerHTML={{ __html: ct.perfNote }} />

      {/* ===== Section 7: Parsing in Code ===== */}
      <h2>{ct.h2Parsing}</h2>

      <h3>{ct.h3ParseJs}</h3>
      <pre><code>{`// --- JSON parsing (built-in) ---
const jsonStr = '{"name":"Alice","age":30}';
const obj = JSON.parse(jsonStr);
console.log(obj.name); // "Alice"

// Serialize back
const output = JSON.stringify(obj, null, 2);

// --- XML parsing (browser) ---
const xmlStr = '<user><name>Alice</name><age>30</age></user>';
const parser = new DOMParser();
const doc = parser.parseFromString(xmlStr, 'text/xml');
const name = doc.querySelector('name')?.textContent; // "Alice"

// --- XML parsing (Node.js with xml2js) ---
import { parseStringPromise } from 'xml2js';
const result = await parseStringPromise(xmlStr);
console.log(result.user.name[0]); // "Alice"`}</code></pre>

      <h3>{ct.h3ParsePython}</h3>
      <pre><code>{`import json
import xml.etree.ElementTree as ET

# --- JSON ---
json_str = '{"name": "Alice", "age": 30}'
data = json.loads(json_str)
print(data["name"])  # Alice

# Serialize
output = json.dumps(data, indent=2)

# --- XML ---
xml_str = '<user><name>Alice</name><age>30</age></user>'
root = ET.fromstring(xml_str)
print(root.find('name').text)  # Alice

# --- XML with xmltodict (pip install xmltodict) ---
import xmltodict
doc = xmltodict.parse(xml_str)
print(doc['user']['name'])  # Alice`}</code></pre>

      <h3>{ct.h3ParseJava}</h3>
      <pre><code>{`// --- JSON with Jackson ---
import com.fasterxml.jackson.databind.ObjectMapper;

ObjectMapper mapper = new ObjectMapper();
Map<String, Object> data = mapper.readValue(
    "{\\"name\\":\\"Alice\\",\\"age\\":30}",
    Map.class
);
System.out.println(data.get("name")); // Alice

// --- XML with Jackson XML ---
import com.fasterxml.jackson.dataformat.xml.XmlMapper;

XmlMapper xmlMapper = new XmlMapper();
Map<String, Object> xmlData = xmlMapper.readValue(
    "<user><name>Alice</name><age>30</age></user>",
    Map.class
);

// --- XML with DOM ---
import javax.xml.parsers.DocumentBuilderFactory;
import org.w3c.dom.Document;

DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
Document doc = factory.newDocumentBuilder().parse(
    new InputSource(new StringReader(xmlStr))
);
String name = doc.getElementsByTagName("name")
    .item(0).getTextContent(); // Alice`}</code></pre>

      <h3>{ct.h3ParseGo}</h3>
      <pre><code>{`package main

import (
    "encoding/json"
    "encoding/xml"
    "fmt"
)

// --- JSON ---
type User struct {
    Name string \`json:"name" xml:"name"\`
    Age  int    \`json:"age"  xml:"age"\`
}

func main() {
    // JSON
    jsonStr := []byte(\`{"name":"Alice","age":30}\`)
    var user User
    json.Unmarshal(jsonStr, &user)
    fmt.Println(user.Name) // Alice

    // XML
    xmlStr := []byte(\`<user><name>Alice</name><age>30</age></user>\`)
    var xmlUser User
    xml.Unmarshal(xmlStr, &xmlUser)
    fmt.Println(xmlUser.Name) // Alice
}`}</code></pre>

      {/* ===== Section 8: Migration ===== */}
      <h2>{ct.h2Migration}</h2>
      <p>{ct.migrationDesc}</p>

      <h3>{ct.h3MigPattern1}</h3>
      <pre><code>{`<!-- XML -->
<user>
  <name>Alice</name>
  <age>30</age>
  <active>true</active>
</user>

// JSON (straightforward mapping)
{
  "name": "Alice",
  "age": 30,
  "active": true
}`}</code></pre>

      <h3>{ct.h3MigPattern2}</h3>
      <pre><code>{`<!-- XML with attributes -->
<product id="123" category="electronics">
  <name>Laptop</name>
  <price currency="USD">999.99</price>
</product>

// JSON — Convention 1: prefix with @
{
  "@id": "123",
  "@category": "electronics",
  "name": "Laptop",
  "price": {
    "@currency": "USD",
    "#text": 999.99
  }
}

// JSON — Convention 2: flatten
{
  "id": "123",
  "category": "electronics",
  "name": "Laptop",
  "price": 999.99,
  "priceCurrency": "USD"
}`}</code></pre>

      <h3>{ct.h3MigPattern3}</h3>
      <pre><code>{`<!-- XML mixed content (text + elements interleaved) -->
<p>This is <b>bold</b> and <i>italic</i> text.</p>

// JSON — No clean way to represent this!
// Option 1: HTML string
{ "p": "This is <b>bold</b> and <i>italic</i> text." }

// Option 2: Array of segments (verbose)
{
  "p": [
    { "type": "text", "value": "This is " },
    { "type": "b", "value": "bold" },
    { "type": "text", "value": " and " },
    { "type": "i", "value": "italic" },
    { "type": "text", "value": " text." }
  ]
}`}</code></pre>

      <h3>{ct.h3MigPattern4}</h3>
      <pre><code>{`<!-- XML repeated elements -->
<users>
  <user>Alice</user>
  <user>Bob</user>
  <user>Charlie</user>
</users>

// JSON — Always use arrays for repeated elements
{
  "users": ["Alice", "Bob", "Charlie"]
}

// Watch out: single-element case in XML
<users>
  <user>Alice</user>
</users>
// Some converters output a string instead of array!
// BAD:  { "users": { "user": "Alice" } }
// GOOD: { "users": { "user": ["Alice"] } }
// Always force arrays for elements that can repeat.`}</code></pre>

      <p dangerouslySetInnerHTML={{ __html: ct.migWarning }} />

      {/* ===== Section 9: Alternatives ===== */}
      <h2>{ct.h2Alternatives}</h2>
      <p>{ct.altDesc}</p>

      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.95rem' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #e2e8f0' }}>
              <th style={{ textAlign: 'left', padding: '12px 16px', fontWeight: 700 }}>{lang === 'zh' ? '格式' : 'Format'}</th>
              <th style={{ textAlign: 'left', padding: '12px 16px', fontWeight: 700 }}>{lang === 'zh' ? '描述' : 'Description'}</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
              <td style={{ padding: '10px 16px', fontWeight: 600 }}>{ct.altYaml}</td>
              <td style={{ padding: '10px 16px' }}>{ct.altYamlDesc}</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e2e8f0', background: '#f7fafc' }}>
              <td style={{ padding: '10px 16px', fontWeight: 600 }}>{ct.altToml}</td>
              <td style={{ padding: '10px 16px' }}>{ct.altTomlDesc}</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
              <td style={{ padding: '10px 16px', fontWeight: 600 }}>{ct.altProtobuf}</td>
              <td style={{ padding: '10px 16px' }}>{ct.altProtobufDesc}</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e2e8f0', background: '#f7fafc' }}>
              <td style={{ padding: '10px 16px', fontWeight: 600 }}>{ct.altMsgpack}</td>
              <td style={{ padding: '10px 16px' }}>{ct.altMsgpackDesc}</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
              <td style={{ padding: '10px 16px', fontWeight: 600 }}>{ct.altAvro}</td>
              <td style={{ padding: '10px 16px' }}>{ct.altAvroDesc}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* ===== Section 10: FAQ ===== */}
      <div className="faq-section">
        <h2>{ct.h2Faq}</h2>
        <h3>{ct.faq1Q}</h3>
        <p>{ct.faq1A}</p>
        <h3>{ct.faq2Q}</h3>
        <p>{ct.faq2A}</p>
        <h3>{ct.faq3Q}</h3>
        <p>{ct.faq3A}</p>
        <h3>{ct.faq4Q}</h3>
        <p>{ct.faq4A}</p>
        <h3>{ct.faq5Q}</h3>
        <p>{ct.faq5A}</p>
      </div>

      <p style={{ marginTop: '2rem' }}>
        <Link href={`/${lang}/tools/xml-formatter`} style={{ fontWeight: 600 }}>
          {ct.linkXmlFormatter}
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
