import Link from 'next/link';

const t: Record<string, Record<string, string>> = {
  en: {
    intro: '<strong>XML to JSON</strong> conversion is one of the most common data transformation tasks in modern software development. As organizations migrate from legacy SOAP-based web services to RESTful APIs, the need to <strong>convert XML to JSON</strong> has skyrocketed. Whether you are dealing with enterprise configuration files, RSS feeds, or SOAP API responses, an efficient <strong>XML to JSON converter</strong> saves hours of manual work. This comprehensive guide covers everything from the underlying parsing mechanics to production-ready code examples in JavaScript, Python, Java, and Bash. If you need to <strong>convert XML to JSON online</strong> right now, our free tool handles it instantly with proper attribute mapping and namespace support.',
    linkTool: 'Try our free online XML to JSON converter tool instantly.',
    h2_what: 'What Is XML to JSON Conversion?',
    whatDesc1: '<strong>XML (Extensible Markup Language)</strong> and <strong>JSON (JavaScript Object Notation)</strong> are the two most widely used data interchange formats. XML dominated enterprise computing for decades, powering SOAP web services, configuration files, and document formats like SVG, XHTML, and RSS. JSON emerged as the lightweight alternative favored by web developers for its simplicity and native JavaScript compatibility. The need to <strong>convert XML to JSON</strong> arises in numerous real-world scenarios: migrating legacy SOAP services to REST APIs, consuming third-party XML feeds in modern frontend applications, transforming configuration files for cloud-native deployments, and processing XML-based data pipelines into JSON-friendly analytics platforms.',
    whatDesc2: 'An <strong>XML to JSON converter</strong> takes a well-formed XML document and transforms it into an equivalent JSON representation. This process involves mapping XML elements to JSON objects, handling XML attributes, text nodes, namespaces, CDATA sections, and mixed content. Because XML and JSON have fundamentally different data models (XML is a tree of named nodes with attributes; JSON is a tree of key-value pairs and arrays), the conversion is not always one-to-one. Different conversion conventions such as Badgerfish, Parker, and GData define specific rules for how attributes, text content, and namespaces map to JSON properties.',
    whatDesc3: 'The reverse operation, <strong>JSON to XML</strong> conversion, is equally important when integrating modern services with legacy XML-based systems. Understanding both directions gives you complete flexibility in data transformation pipelines. Common use cases include: SOAP-to-REST API gateway layers, ETL pipelines that ingest XML and output JSON for Elasticsearch or MongoDB, mobile applications that consume XML RSS feeds but prefer JSON internally, and infrastructure-as-code tools that need to convert between XML and JSON configuration formats.',
    h2_comparison: 'XML vs JSON: A Detailed Comparison',
    comparisonDesc: 'Before diving into conversion techniques, it is essential to understand the structural differences between XML and JSON. This comparison helps explain why certain edge cases arise during <strong>XML to JSON</strong> conversion:',
    comparisonTable: '<table><thead><tr><th>Feature</th><th>XML</th><th>JSON</th></tr></thead><tbody><tr><td>Syntax</td><td>Tag-based markup with opening/closing tags</td><td>Key-value pairs with curly braces and brackets</td></tr><tr><td>Attributes</td><td>Supported natively on elements (<code>&lt;item id="1"&gt;</code>)</td><td>No concept of attributes; everything is a property</td></tr><tr><td>Namespaces</td><td>Full namespace support via xmlns declarations</td><td>No native namespace support</td></tr><tr><td>Comments</td><td>Supported (<code>&lt;!-- comment --&gt;</code>)</td><td>Not supported in standard JSON</td></tr><tr><td>CDATA</td><td>Supported (<code>&lt;![CDATA[...]]&gt;</code>) for raw text</td><td>Not applicable; strings handle all text</td></tr><tr><td>Schema Validation</td><td>XSD, DTD, RelaxNG for strict validation</td><td>JSON Schema for validation</td></tr><tr><td>Human Readability</td><td>Verbose but self-describing</td><td>Compact and easy to read</td></tr><tr><td>File Size</td><td>Larger due to closing tags and attributes</td><td>30-50% smaller typically</td></tr><tr><td>Data Types</td><td>Everything is text; types via XSD</td><td>Native strings, numbers, booleans, null, arrays, objects</td></tr><tr><td>Array Handling</td><td>Repeated elements (implicit arrays)</td><td>Explicit array syntax with <code>[]</code></td></tr><tr><td>Parser Availability</td><td>DOM, SAX, StAX, XPath, XSLT</td><td>Native in JavaScript; lightweight parsers everywhere</td></tr><tr><td>Mixed Content</td><td>Text interspersed with child elements</td><td>No direct equivalent</td></tr></tbody></table>',
    h2_howWorks: 'How XML to JSON Conversion Works',
    howWorksDesc: 'The <strong>XML to JSON</strong> conversion process involves several key steps that an <strong>XML parser</strong> must handle. Understanding these steps helps you choose the right tool and anticipate edge cases:',
    howWorksSteps: '<ol><li><strong>Parse the XML document</strong>: The <strong>XML parser</strong> reads the input and builds a tree structure (DOM) or fires events (SAX/StAX). The parser validates well-formedness, resolves entities, and handles encoding declarations.</li><li><strong>Map elements to objects</strong>: Each XML element becomes a JSON object property. The element name becomes the key, and the content becomes the value. Nested elements become nested objects.</li><li><strong>Handle attributes</strong>: Since JSON has no concept of attributes, conventions use prefixed keys. The most common approach uses <code>@</code> or <code>$</code> prefix: <code>&lt;item id="1"&gt;</code> becomes <code>{"item": {"@id": "1"}}</code>.</li><li><strong>Process text nodes</strong>: When an element contains only text, it maps directly to a string value. When text coexists with child elements (mixed content), a special key like <code>#text</code> holds the text content.</li><li><strong>Convert repeated elements to arrays</strong>: XML uses repeated elements for collections: <code>&lt;item&gt;A&lt;/item&gt;&lt;item&gt;B&lt;/item&gt;</code>. In JSON, these become an array: <code>{"item": ["A", "B"]}</code>. Detecting when to use arrays is one of the trickiest parts of conversion.</li><li><strong>Handle namespaces</strong>: XML namespaces like <code>xmlns:soap="..."</code> can be preserved as prefixed keys (<code>soap:Envelope</code>) or stripped depending on your converter configuration.</li></ol>',
    howWorksConventions: 'Several established conventions define how XML structures map to JSON. The three most common are:',
    howWorksConventionsList: '<ul><li><strong>Badgerfish convention</strong>: Preserves all XML information including attributes (prefixed with <code>@</code>), text content (in <code>$</code> key), and namespaces. This is the most lossless conversion but produces verbose JSON. Example: <code>&lt;name lang="en"&gt;John&lt;/name&gt;</code> becomes <code>{"name": {"@lang": "en", "$": "John"}}</code>.</li><li><strong>Parker convention</strong>: Produces the most compact JSON by discarding attributes and converting text-only elements to simple values. Best when you do not need attributes. Example: <code>&lt;name&gt;John&lt;/name&gt;</code> becomes <code>{"name": "John"}</code>.</li><li><strong>GData convention</strong>: A middle ground used by Google APIs. Attributes use a <code>$</code> prefix, and text uses <code>$t</code>. Example: <code>&lt;name lang="en"&gt;John&lt;/name&gt;</code> becomes <code>{"name": {"$t": "John", "lang": "en"}}</code>.</li></ul>',
    h2_codeExamples: 'XML to JSON Code Examples',
    codeJsTitle: 'JavaScript: XML to JSON',
    codeJsDesc: 'In JavaScript, there are several approaches to <strong>XML to JSON</strong> conversion. The browser provides a built-in <code>DOMParser</code> for parsing XML, and popular npm packages like <code>fast-xml-parser</code> and <code>xml2js</code> offer robust conversion for <strong>xml to json javascript</strong> workflows:',
    codePyTitle: 'Python: XML to JSON',
    codePyDesc: 'For <strong>xml to json python</strong> conversion, the <code>xmltodict</code> library is the most popular choice. Python also offers built-in modules like <code>xml.etree.ElementTree</code> and security-focused <code>defusedxml</code> for production environments:',
    codeBashTitle: 'Bash / CLI: XML to JSON',
    codeBashDesc: 'For command-line workflows, tools like <code>xq</code> (from yq), <code>xmlstarlet</code>, and Python one-liners provide quick <strong>XML to JSON</strong> conversion directly from the terminal:',
    codeJavaTitle: 'Java: XML to JSON',
    codeJavaDesc: 'In Java, the Jackson XML module and the <code>org.json</code> library are the primary tools for <strong>XML to JSON</strong> conversion. JAXB can also be used for schema-driven conversions:',
    h2_jsonToXml: 'JSON to XML Conversion',
    jsonToXmlDesc1: 'The reverse direction, <strong>JSON to XML</strong> conversion, presents its own set of challenges. While XML-to-JSON is generally straightforward (map elements to objects), going from JSON to XML requires making decisions about how to represent JSON constructs in XML:',
    jsonToXmlDesc2: '<strong>Key challenges in JSON to XML conversion</strong>: JSON arrays have no direct XML equivalent and must be represented as repeated elements. JSON null values need a representation (empty element, xsi:nil, or omission). JSON booleans and numbers must be serialized as text. JSON property names may contain characters invalid in XML element names. The root element must be chosen or synthesized since JSON does not require one.',
    jsonToXmlDesc3: 'The following code examples show <strong>JSON to XML</strong> conversion in JavaScript and Python, handling arrays, nested objects, and special values:',
    h2_edgeCases: 'Handling Edge Cases in XML to JSON Conversion',
    edgeCasesDesc: 'Production-grade <strong>XML to JSON converters</strong> must handle numerous edge cases that can break naive implementations. Here are the most important ones to be aware of:',
    edgeCase1: '<strong>XML Attributes</strong>: The most common edge case. Attributes have no JSON equivalent, so converters must choose a convention (e.g., <code>@attr</code>, <code>$attr</code>, or <code>_attr</code> prefix). When an element has both attributes and text content, both must be preserved: <code>&lt;price currency="USD"&gt;29.99&lt;/price&gt;</code> becomes <code>{"price": {"@currency": "USD", "#text": "29.99"}}</code>.',
    edgeCase2: '<strong>CDATA Sections</strong>: CDATA sections (<code>&lt;![CDATA[raw content]]&gt;</code>) contain unparsed text that may include characters normally reserved in XML. Most converters treat CDATA content as regular text in the JSON output, but some use a special <code>#cdata-section</code> key to preserve the distinction.',
    edgeCase3: '<strong>Namespaces</strong>: XML namespaces add complexity with prefix declarations like <code>xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"</code>. Converters can preserve namespaces as part of element names (<code>soap:Envelope</code>), strip prefixes entirely, or map namespace URIs to JSON objects. The choice depends on whether downstream consumers need namespace information.',
    edgeCase4: '<strong>Mixed Content</strong>: Elements containing both text and child elements, like <code>&lt;p&gt;Hello &lt;b&gt;world&lt;/b&gt; today&lt;/p&gt;</code>, are particularly challenging. The text fragments between child elements must be captured, typically using indexed <code>#text</code> keys or an array of mixed content nodes.',
    edgeCase5: '<strong>Self-Closing Tags and Empty Elements</strong>: An empty element like <code>&lt;br/&gt;</code> or <code>&lt;item&gt;&lt;/item&gt;</code> can be converted to <code>null</code>, an empty string <code>""</code>, or an empty object <code>{}</code>. The choice affects downstream processing. Most converters default to <code>null</code> or <code>""</code>.',
    edgeCase6: '<strong>Repeated Elements (Array Detection)</strong>: One of the trickiest problems: <code>&lt;items&gt;&lt;item&gt;A&lt;/item&gt;&lt;/items&gt;</code> should produce <code>{"items": {"item": "A"}}</code> (a single string), but <code>&lt;items&gt;&lt;item&gt;A&lt;/item&gt;&lt;item&gt;B&lt;/item&gt;&lt;/items&gt;</code> should produce <code>{"items": {"item": ["A", "B"]}}</code> (an array). Without schema information, the converter only sees one element at a time and cannot know if more siblings follow. Solutions include always-array mode, schema-driven conversion, or two-pass parsing.',
    edgeCase7: '<strong>Whitespace Handling</strong>: Insignificant whitespace between elements (indentation, newlines) should typically be ignored, but whitespace inside text nodes is significant. The <code>xml:space="preserve"</code> attribute controls this behavior. Improper whitespace handling can produce unexpected empty text nodes in the JSON output.',
    edgeCase8: '<strong>XML Declaration and DTD</strong>: The XML declaration (<code>&lt;?xml version="1.0" encoding="UTF-8"?&gt;</code>) and DOCTYPE declarations are metadata that do not map to JSON properties. Processing instructions (<code>&lt;?pi target?&gt;</code>) are also typically dropped during conversion.',
    h2_security: 'XML Security Best Practices',
    securityDesc: 'When building an <strong>XML to JSON converter</strong> or working with any <strong>XML parser</strong>, security is paramount. XML has several well-known attack vectors that can compromise your application if not properly mitigated:',
    security1: '<strong>XXE (XML External Entity) Attacks</strong>: The most critical XML vulnerability. An attacker crafts an XML document with external entity declarations that reference local files or internal network resources: <code>&lt;!DOCTYPE foo [&lt;!ENTITY xxe SYSTEM "file:///etc/passwd"&gt;]&gt;&lt;data&gt;&amp;xxe;&lt;/data&gt;</code>. When the parser resolves the entity, it includes the file content in the parsed output. To prevent XXE: disable external entity processing in your XML parser, use <code>defusedxml</code> in Python, set <code>XMLConstants.FEATURE_SECURE_PROCESSING</code> in Java, and never pass untrusted XML to a parser with default settings.',
    security2: '<strong>Billion Laughs Attack (XML Bomb)</strong>: A denial-of-service attack that uses nested entity expansion to consume exponential memory. The attack defines entities that reference each other recursively: entity <code>lol9</code> references 10 copies of <code>lol8</code>, which references 10 copies of <code>lol7</code>, and so on. A tiny XML document can expand to gigabytes of text. Mitigation: limit entity expansion depth and total expansion size, or disable DTD processing entirely.',
    security3: '<strong>External Entity Injection via DTD</strong>: Even when direct XXE is blocked, attackers may use parameter entities and external DTD references to exfiltrate data. The attack fetches a malicious DTD from an attacker-controlled server, which then defines entities to send local file contents to another attacker endpoint. Prevention: disable all external DTD loading and parameter entity processing.',
    security4: '<strong>Secure XML Parser Configuration</strong>: Every major programming language requires explicit security configuration for XML parsers. In Python, use <code>defusedxml.parse()</code> instead of <code>xml.etree.ElementTree.parse()</code>. In Java, set features like <code>http://apache.org/xml/features/disallow-doctype-decl</code> to true. In JavaScript (Node.js), use <code>fast-xml-parser</code> with <code>processEntities: false</code> or configure <code>libxmljs</code> with <code>noent: false</code>. In .NET, use <code>XmlReaderSettings</code> with <code>DtdProcessing.Prohibit</code>. Always keep XML parsing libraries updated and follow the OWASP XML Security Cheat Sheet.',
    h2_faq: 'Frequently Asked Questions',
    faq1_q: 'What is the best way to convert XML to JSON?',
    faq1_a: 'The best approach depends on your language and use case. In JavaScript, fast-xml-parser is the fastest and most configurable option for xml to json conversion. In Python, xmltodict provides the simplest API with one-line conversion. For command-line use, xq (part of the yq package) converts XML to JSON directly in your terminal. For a quick one-off conversion, use an online XML to JSON converter tool. In all cases, make sure your XML parser has secure configuration to prevent XXE attacks and entity expansion vulnerabilities.',
    faq2_q: 'How are XML attributes handled in JSON conversion?',
    faq2_a: 'Since JSON has no concept of attributes, XML attributes are mapped to JSON properties using naming conventions. The most common convention prefixes attribute names with @ (e.g., @id, @class). Some converters use $ or _ prefixes instead. When an element has both attributes and text content, the text is stored in a special key like #text. For example, <price currency="USD">29.99</price> becomes {"price": {"@currency": "USD", "#text": "29.99"}}. Different conventions (Badgerfish, Parker, GData) handle attributes differently, so choose one that fits your downstream data processing needs.',
    faq3_q: 'Is XML to JSON conversion secure? What about XXE attacks?',
    faq3_a: 'XML parsing can be dangerous if not configured properly. The biggest risk is XXE (XML External Entity) attacks, where malicious XML documents reference local files or internal network resources. To convert XML to JSON securely: always disable external entity processing in your XML parser, use security-focused libraries like defusedxml in Python, set FEATURE_SECURE_PROCESSING in Java, disable DTD processing when not needed, and never parse untrusted XML with default parser settings. The Billion Laughs attack is another threat that uses recursive entity expansion for denial of service. Always validate and sanitize XML input before conversion.',
    conclusion: 'XML to JSON conversion is a fundamental data transformation skill for modern developers. Whether you are migrating SOAP APIs to REST, processing XML feeds, or building data pipelines, understanding the nuances of <strong>XML to JSON</strong> and <strong>JSON to XML</strong> conversion helps you handle edge cases and avoid common pitfalls. Use our free online tool for quick conversions, and follow the security best practices outlined above when processing untrusted XML in production.',
    linkToolBottom: 'Convert XML to JSON instantly with our free online tool.',
  },
  zh: {
    intro: '<strong>XML 到 JSON</strong> 转换是现代软件开发中最常见的数据转换任务之一。随着组织从传统的基于 SOAP 的 Web 服务迁移到 RESTful API，<strong>将 XML 转换为 JSON</strong> 的需求急剧增长。无论您处理的是企业配置文件、RSS 源还是 SOAP API 响应，高效的 XML 到 JSON 转换器可以节省大量手动工作时间。本综合指南涵盖了从底层解析机制到 JavaScript、Python、Java 和 Bash 的生产级代码示例的所有内容。',
    linkTool: '立即试用我们的免费在线 XML 到 JSON 转换工具。',
    h2_what: '什么是 XML 到 JSON 转换？',
    whatDesc1: '<strong>XML（可扩展标记语言）</strong>和 <strong>JSON（JavaScript 对象表示法）</strong>是两种最广泛使用的数据交换格式。XML 主导了企业计算数十年，驱动 SOAP Web 服务、配置文件和 SVG、XHTML、RSS 等文档格式。JSON 作为轻量级替代方案出现，因其简洁性和原生 JavaScript 兼容性而受到 Web 开发者的青睐。',
    whatDesc2: 'XML 到 JSON 转换器接收格式良好的 XML 文档并将其转换为等效的 JSON 表示。此过程涉及将 XML 元素映射为 JSON 对象、处理 XML 属性、文本节点、命名空间、CDATA 部分和混合内容。不同的转换约定（如 Badgerfish、Parker 和 GData）定义了属性、文本内容和命名空间如何映射到 JSON 属性的具体规则。',
    whatDesc3: '反向操作——JSON 到 XML 转换，在将现代服务与传统 XML 系统集成时同样重要。常见用例包括：SOAP 到 REST API 网关层、将 XML 数据导入 Elasticsearch 或 MongoDB 的 ETL 管道、消费 XML RSS 源的移动应用，以及需要在 XML 和 JSON 配置格式之间转换的基础设施即代码工具。',
    h2_comparison: 'XML 与 JSON：详细对比',
    comparisonDesc: '在深入转换技术之前，了解 XML 和 JSON 的结构差异至关重要。这个对比有助于解释为什么在 XML 到 JSON 转换过程中会出现某些边缘情况：',
    comparisonTable: '<table><thead><tr><th>特性</th><th>XML</th><th>JSON</th></tr></thead><tbody><tr><td>语法</td><td>基于标签的标记，有开始/结束标签</td><td>花括号和方括号的键值对</td></tr><tr><td>属性</td><td>元素上原生支持属性</td><td>没有属性概念，一切都是属性</td></tr><tr><td>命名空间</td><td>通过 xmlns 声明完全支持</td><td>无原生命名空间支持</td></tr><tr><td>注释</td><td>支持</td><td>标准 JSON 不支持</td></tr><tr><td>CDATA</td><td>支持原始文本</td><td>不适用，字符串处理所有文本</td></tr><tr><td>模式验证</td><td>XSD、DTD、RelaxNG</td><td>JSON Schema</td></tr><tr><td>可读性</td><td>冗长但自描述</td><td>紧凑易读</td></tr><tr><td>文件大小</td><td>由于关闭标签和属性较大</td><td>通常小 30-50%</td></tr><tr><td>解析器</td><td>DOM、SAX、StAX、XPath、XSLT</td><td>JavaScript 原生支持</td></tr></tbody></table>',
    h2_howWorks: 'XML 到 JSON 转换的工作原理',
    howWorksDesc: 'XML 到 JSON 转换过程涉及 XML 解析器必须处理的几个关键步骤：',
    howWorksSteps: '<ol><li><strong>解析 XML 文档</strong>：XML 解析器读取输入并构建树结构（DOM）或触发事件（SAX/StAX）。</li><li><strong>将元素映射为对象</strong>：每个 XML 元素成为 JSON 对象属性。</li><li><strong>处理属性</strong>：使用前缀（如 <code>@</code>）将属性映射为 JSON 键。</li><li><strong>处理文本节点</strong>：纯文本元素映射为字符串值，混合内容使用 <code>#text</code> 键。</li><li><strong>将重复元素转换为数组</strong>：XML 中的重复元素在 JSON 中变成数组。</li><li><strong>处理命名空间</strong>：保留为前缀键或根据配置去除。</li></ol>',
    howWorksConventions: '几种已建立的约定定义了 XML 结构如何映射到 JSON：',
    howWorksConventionsList: '<ul><li><strong>Badgerfish 约定</strong>：保留所有 XML 信息，包括属性（<code>@</code> 前缀）和文本内容（<code>$</code> 键）。最无损但产生冗长的 JSON。</li><li><strong>Parker 约定</strong>：产生最紧凑的 JSON，丢弃属性，将纯文本元素转换为简单值。</li><li><strong>GData 约定</strong>：Google API 使用的中间方案，属性使用 <code>$</code> 前缀，文本使用 <code>$t</code>。</li></ul>',
    h2_codeExamples: 'XML 到 JSON 代码示例',
    codeJsTitle: 'JavaScript：XML 到 JSON',
    codeJsDesc: '在 JavaScript 中，有多种方法可以进行 XML 到 JSON 转换。浏览器提供内置的 <code>DOMParser</code> 用于解析 XML，流行的 npm 包如 <code>fast-xml-parser</code> 和 <code>xml2js</code> 提供了强大的转换功能：',
    codePyTitle: 'Python：XML 到 JSON',
    codePyDesc: '对于 Python XML 到 JSON 转换，<code>xmltodict</code> 库是最流行的选择。Python 还提供了内置的 <code>xml.etree.ElementTree</code> 和面向安全的 <code>defusedxml</code>：',
    codeBashTitle: 'Bash / CLI：XML 到 JSON',
    codeBashDesc: '命令行工具如 <code>xq</code>（来自 yq）和 <code>xmlstarlet</code> 可直接在终端进行 XML 到 JSON 转换：',
    codeJavaTitle: 'Java：XML 到 JSON',
    codeJavaDesc: '在 Java 中，Jackson XML 模块和 <code>org.json</code> 库是 XML 到 JSON 转换的主要工具：',
    h2_jsonToXml: 'JSON 到 XML 转换',
    jsonToXmlDesc1: '反向的 JSON 到 XML 转换有其独特的挑战。虽然 XML 到 JSON 通常很直接，但从 JSON 到 XML 需要决定如何在 XML 中表示 JSON 结构：',
    jsonToXmlDesc2: '<strong>JSON 到 XML 转换的关键挑战</strong>：JSON 数组没有直接的 XML 等效物，必须表示为重复元素。JSON null 值需要表示（空元素或 xsi:nil）。JSON 属性名可能包含在 XML 元素名中无效的字符。',
    jsonToXmlDesc3: '以下代码示例展示了 JavaScript 和 Python 中的 JSON 到 XML 转换：',
    h2_edgeCases: 'XML 到 JSON 转换的边缘情况处理',
    edgeCasesDesc: '生产级 XML 到 JSON 转换器必须处理许多可能导致简单实现出错的边缘情况：',
    edgeCase1: '<strong>XML 属性</strong>：最常见的边缘情况。属性没有 JSON 等效物，转换器必须选择约定（如 <code>@attr</code> 前缀）。',
    edgeCase2: '<strong>CDATA 部分</strong>：包含未解析文本的 CDATA 部分，大多数转换器将其视为普通文本。',
    edgeCase3: '<strong>命名空间</strong>：XML 命名空间增加了复杂性，转换器可以保留、去除或映射命名空间。',
    edgeCase4: '<strong>混合内容</strong>：包含文本和子元素的元素特别具有挑战性。',
    edgeCase5: '<strong>自关闭标签和空元素</strong>：空元素可以转换为 <code>null</code>、空字符串或空对象。',
    edgeCase6: '<strong>重复元素（数组检测）</strong>：最棘手的问题之一，需要确定何时使用数组。',
    edgeCase7: '<strong>空白处理</strong>：元素间的无关紧要空白应被忽略，但文本节点内的空白是有意义的。',
    edgeCase8: '<strong>XML 声明和 DTD</strong>：XML 声明和 DOCTYPE 声明是元数据，不映射到 JSON 属性。',
    h2_security: 'XML 安全最佳实践',
    securityDesc: '构建 XML 到 JSON 转换器或使用任何 XML 解析器时，安全性至关重要。XML 有几个已知的攻击向量：',
    security1: '<strong>XXE（XML 外部实体）攻击</strong>：最关键的 XML 漏洞。攻击者制作包含外部实体声明的 XML 文档，引用本地文件或内部网络资源。预防方法：禁用外部实体处理。',
    security2: '<strong>十亿笑声攻击（XML 炸弹）</strong>：使用嵌套实体展开消耗指数级内存的拒绝服务攻击。缓解方法：限制实体展开深度和总展开大小。',
    security3: '<strong>通过 DTD 的外部实体注入</strong>：即使直接 XXE 被阻止，攻击者也可能使用参数实体和外部 DTD 引用来窃取数据。预防方法：禁用所有外部 DTD 加载。',
    security4: '<strong>安全的 XML 解析器配置</strong>：每种主要编程语言都需要为 XML 解析器进行显式安全配置。Python 使用 <code>defusedxml</code>，Java 设置安全特性，JavaScript 使用 <code>fast-xml-parser</code> 并禁用实体处理。',
    h2_faq: '常见问题',
    faq1_q: '将 XML 转换为 JSON 的最佳方法是什么？',
    faq1_a: '最佳方法取决于您的语言和用例。JavaScript 中 fast-xml-parser 最快且可配置性最强。Python 中 xmltodict 提供最简单的 API。命令行使用 xq（yq 包的一部分）。快速一次性转换可使用在线 XML 到 JSON 转换工具。所有情况下都要确保 XML 解析器有安全配置。',
    faq2_q: 'XML 属性在 JSON 转换中如何处理？',
    faq2_a: '由于 JSON 没有属性概念，XML 属性使用命名约定映射为 JSON 属性。最常见的约定是在属性名前加 @（如 @id、@class）。当元素同时有属性和文本内容时，文本存储在 #text 键中。',
    faq3_q: 'XML 到 JSON 转换安全吗？XXE 攻击怎么办？',
    faq3_a: '如果配置不当，XML 解析可能很危险。最大的风险是 XXE 攻击。安全转换的方法：禁用外部实体处理，使用 Python 的 defusedxml 等安全库，在 Java 中设置 FEATURE_SECURE_PROCESSING，不需要时禁用 DTD 处理。',
    conclusion: 'XML 到 JSON 转换是现代开发者的基本数据转换技能。无论您是迁移 SOAP API、处理 XML 源，还是构建数据管道，理解转换的细微差别有助于处理边缘情况和避免常见陷阱。使用我们的免费在线工具进行快速转换，处理不受信任的 XML 时遵循上述安全最佳实践。',
    linkToolBottom: '使用我们的免费在线工具即时将 XML 转换为 JSON。',
  },
  fr: {
    intro: '<strong>La conversion XML vers JSON</strong> est l\'une des taches de transformation de donnees les plus courantes dans le developpement logiciel moderne. Que vous traitiez des fichiers de configuration, des flux RSS ou des reponses d\'API SOAP, un convertisseur XML vers JSON efficace fait gagner des heures de travail. Ce guide couvre tout, des mecanismes d\'analyse aux exemples de code en JavaScript, Python, Java et Bash.',
    linkTool: 'Essayez notre outil gratuit de conversion XML vers JSON en ligne.',
    h2_what: 'Qu\'est-ce que la conversion XML vers JSON ?',
    whatDesc1: '<strong>XML</strong> et <strong>JSON</strong> sont les deux formats d\'echange de donnees les plus utilises. XML a domine l\'informatique d\'entreprise pendant des decennies. JSON est devenu l\'alternative legere preferee des developpeurs web.',
    whatDesc2: 'Un convertisseur XML vers JSON prend un document XML bien forme et le transforme en une representation JSON equivalente, en gerant les elements, attributs, espaces de noms et sections CDATA.',
    whatDesc3: 'L\'operation inverse, la conversion JSON vers XML, est tout aussi importante lors de l\'integration avec des systemes XML existants.',
    h2_comparison: 'XML vs JSON : comparaison detaillee',
    comparisonDesc: 'Comprendre les differences structurelles entre XML et JSON est essentiel avant de plonger dans les techniques de conversion :',
    comparisonTable: '<table><thead><tr><th>Caracteristique</th><th>XML</th><th>JSON</th></tr></thead><tbody><tr><td>Syntaxe</td><td>Balises d\'ouverture/fermeture</td><td>Paires cle-valeur</td></tr><tr><td>Attributs</td><td>Support natif</td><td>Pas de concept d\'attributs</td></tr><tr><td>Espaces de noms</td><td>Support complet via xmlns</td><td>Pas de support natif</td></tr><tr><td>Taille</td><td>Plus grand</td><td>30-50% plus petit</td></tr></tbody></table>',
    h2_howWorks: 'Comment fonctionne la conversion XML vers JSON',
    howWorksDesc: 'Le processus de conversion implique plusieurs etapes cles :',
    howWorksSteps: '<ol><li><strong>Analyser le document XML</strong> : Construction d\'un arbre DOM ou evenements SAX.</li><li><strong>Mapper les elements aux objets</strong> : Chaque element devient une propriete JSON.</li><li><strong>Gerer les attributs</strong> : Utilisation de prefixes comme <code>@</code>.</li><li><strong>Traiter les noeuds texte</strong> : Mappage direct en valeurs de chaine.</li><li><strong>Convertir les elements repetes en tableaux</strong>.</li><li><strong>Gerer les espaces de noms</strong>.</li></ol>',
    howWorksConventions: 'Plusieurs conventions definissent le mapping XML vers JSON :',
    howWorksConventionsList: '<ul><li><strong>Convention Badgerfish</strong> : Preserve toutes les informations XML.</li><li><strong>Convention Parker</strong> : JSON le plus compact.</li><li><strong>Convention GData</strong> : Solution intermediaire utilisee par Google.</li></ul>',
    h2_codeExamples: 'Exemples de code XML vers JSON',
    codeJsTitle: 'JavaScript : XML vers JSON',
    codeJsDesc: 'En JavaScript, <code>fast-xml-parser</code> et <code>xml2js</code> offrent une conversion robuste :',
    codePyTitle: 'Python : XML vers JSON',
    codePyDesc: 'En Python, <code>xmltodict</code> est le choix le plus populaire :',
    codeBashTitle: 'Bash / CLI : XML vers JSON',
    codeBashDesc: '<code>xq</code> (de yq) et <code>xmlstarlet</code> permettent la conversion en ligne de commande :',
    codeJavaTitle: 'Java : XML vers JSON',
    codeJavaDesc: 'En Java, Jackson XML et <code>org.json</code> sont les outils principaux :',
    h2_jsonToXml: 'Conversion JSON vers XML',
    jsonToXmlDesc1: 'La direction inverse presente ses propres defis :',
    jsonToXmlDesc2: '<strong>Defis cles</strong> : Les tableaux JSON n\'ont pas d\'equivalent XML direct. Les valeurs null necessite une representation. Les noms de proprietes peuvent etre invalides en XML.',
    jsonToXmlDesc3: 'Exemples de conversion JSON vers XML en JavaScript et Python :',
    h2_edgeCases: 'Gestion des cas limites',
    edgeCasesDesc: 'Les convertisseurs de qualite production doivent gerer de nombreux cas limites :',
    edgeCase1: '<strong>Attributs XML</strong> : Le cas limite le plus courant, necessitant des conventions de prefixe.',
    edgeCase2: '<strong>Sections CDATA</strong> : Contenu non analyse traite comme du texte normal.',
    edgeCase3: '<strong>Espaces de noms</strong> : Ajoutent de la complexite au mapping.',
    edgeCase4: '<strong>Contenu mixte</strong> : Elements contenant du texte et des sous-elements.',
    edgeCase5: '<strong>Elements vides</strong> : Peuvent etre convertis en null, chaine vide ou objet vide.',
    edgeCase6: '<strong>Detection de tableaux</strong> : Determiner quand utiliser des tableaux JSON.',
    edgeCase7: '<strong>Gestion des espaces blancs</strong> : Distinguer les espaces significatifs.',
    edgeCase8: '<strong>Declaration XML et DTD</strong> : Metadonnees non mappees en JSON.',
    h2_security: 'Bonnes pratiques de securite XML',
    securityDesc: 'La securite est primordiale lors du travail avec un analyseur XML :',
    security1: '<strong>Attaques XXE</strong> : Desactivez le traitement des entites externes.',
    security2: '<strong>Attaque Billion Laughs</strong> : Limitez l\'expansion des entites.',
    security3: '<strong>Injection via DTD</strong> : Desactivez le chargement DTD externe.',
    security4: '<strong>Configuration securisee</strong> : Chaque langage necessite une configuration de securite explicite pour les analyseurs XML.',
    h2_faq: 'Questions frequemment posees',
    faq1_q: 'Quelle est la meilleure methode pour convertir XML en JSON ?',
    faq1_a: 'Cela depend du langage. JavaScript : fast-xml-parser. Python : xmltodict. CLI : xq. Pour une conversion rapide, utilisez un outil en ligne.',
    faq2_q: 'Comment les attributs XML sont-ils geres en JSON ?',
    faq2_a: 'Les attributs sont mappes avec des prefixes comme @ (ex: @id). Le texte est stocke dans une cle #text quand il coexiste avec des attributs.',
    faq3_q: 'La conversion XML vers JSON est-elle sure ?',
    faq3_a: 'L\'analyse XML peut etre dangereuse sans configuration appropriee. Desactivez les entites externes, utilisez defusedxml en Python et configurez les parseurs de maniere securisee.',
    conclusion: 'La conversion XML vers JSON est une competence fondamentale pour les developpeurs modernes. Utilisez notre outil gratuit pour des conversions rapides.',
    linkToolBottom: 'Convertissez XML en JSON instantanement avec notre outil gratuit.',
  },
  de: {
    intro: '<strong>Die XML-zu-JSON-Konvertierung</strong> ist eine der haufigsten Datentransformationsaufgaben in der modernen Softwareentwicklung. Ob Sie Konfigurationsdateien, RSS-Feeds oder SOAP-API-Antworten verarbeiten, ein effizienter XML-zu-JSON-Konverter spart Stunden manueller Arbeit. Dieser Leitfaden deckt alles ab, von den Parsing-Mechanismen bis zu Codebeispielen in JavaScript, Python, Java und Bash.',
    linkTool: 'Testen Sie unser kostenloses Online XML-zu-JSON-Konvertierungstool.',
    h2_what: 'Was ist XML-zu-JSON-Konvertierung?',
    whatDesc1: '<strong>XML</strong> und <strong>JSON</strong> sind die beiden am weitesten verbreiteten Datenaustauschformate. XML dominierte die Unternehmens-IT uber Jahrzehnte. JSON wurde zur leichtgewichtigen Alternative, die von Webentwicklern bevorzugt wird.',
    whatDesc2: 'Ein XML-zu-JSON-Konverter nimmt ein wohlgeformtes XML-Dokument und transformiert es in eine aquivalente JSON-Darstellung, wobei Elemente, Attribute, Namensraume und CDATA-Abschnitte behandelt werden.',
    whatDesc3: 'Die umgekehrte Operation, JSON-zu-XML-Konvertierung, ist bei der Integration mit bestehenden XML-Systemen ebenso wichtig.',
    h2_comparison: 'XML vs JSON: Detaillierter Vergleich',
    comparisonDesc: 'Das Verstandnis der strukturellen Unterschiede zwischen XML und JSON ist wesentlich:',
    comparisonTable: '<table><thead><tr><th>Merkmal</th><th>XML</th><th>JSON</th></tr></thead><tbody><tr><td>Syntax</td><td>Tag-basiertes Markup</td><td>Schlussel-Wert-Paare</td></tr><tr><td>Attribute</td><td>Native Unterstutzung</td><td>Kein Attributkonzept</td></tr><tr><td>Namensraume</td><td>Volle Unterstutzung</td><td>Keine native Unterstutzung</td></tr><tr><td>Grosse</td><td>Grosser</td><td>30-50% kleiner</td></tr></tbody></table>',
    h2_howWorks: 'Wie XML-zu-JSON-Konvertierung funktioniert',
    howWorksDesc: 'Der Konvertierungsprozess umfasst mehrere Schluesselschritte:',
    howWorksSteps: '<ol><li><strong>XML-Dokument parsen</strong>: Aufbau eines DOM-Baums oder SAX-Ereignisse.</li><li><strong>Elemente auf Objekte abbilden</strong>: Jedes Element wird zur JSON-Eigenschaft.</li><li><strong>Attribute behandeln</strong>: Verwendung von Prafixen wie <code>@</code>.</li><li><strong>Textknoten verarbeiten</strong>: Direkte Zuordnung zu String-Werten.</li><li><strong>Wiederholte Elemente in Arrays umwandeln</strong>.</li><li><strong>Namensraume behandeln</strong>.</li></ol>',
    howWorksConventions: 'Verschiedene Konventionen definieren die XML-zu-JSON-Zuordnung:',
    howWorksConventionsList: '<ul><li><strong>Badgerfish-Konvention</strong>: Bewahrt alle XML-Informationen.</li><li><strong>Parker-Konvention</strong>: Kompaktestes JSON.</li><li><strong>GData-Konvention</strong>: Mittelweg, von Google verwendet.</li></ul>',
    h2_codeExamples: 'XML-zu-JSON-Codebeispiele',
    codeJsTitle: 'JavaScript: XML zu JSON',
    codeJsDesc: 'In JavaScript bieten <code>fast-xml-parser</code> und <code>xml2js</code> robuste Konvertierung:',
    codePyTitle: 'Python: XML zu JSON',
    codePyDesc: 'In Python ist <code>xmltodict</code> die beliebteste Wahl:',
    codeBashTitle: 'Bash / CLI: XML zu JSON',
    codeBashDesc: '<code>xq</code> (von yq) und <code>xmlstarlet</code> ermoglichen die Konvertierung in der Kommandozeile:',
    codeJavaTitle: 'Java: XML zu JSON',
    codeJavaDesc: 'In Java sind Jackson XML und <code>org.json</code> die Hauptwerkzeuge:',
    h2_jsonToXml: 'JSON-zu-XML-Konvertierung',
    jsonToXmlDesc1: 'Die umgekehrte Richtung hat eigene Herausforderungen:',
    jsonToXmlDesc2: '<strong>Hauptprobleme</strong>: JSON-Arrays haben kein direktes XML-Aquivalent. Null-Werte brauchen eine Darstellung. Eigenschaftsnamen konnen in XML ungultig sein.',
    jsonToXmlDesc3: 'Codebeispiele fur JSON-zu-XML-Konvertierung in JavaScript und Python:',
    h2_edgeCases: 'Umgang mit Sonderfallen',
    edgeCasesDesc: 'Produktionsreife Konverter mussen zahlreiche Sonderfalle behandeln:',
    edgeCase1: '<strong>XML-Attribute</strong>: Der haufigste Sonderfall mit Prafix-Konventionen.',
    edgeCase2: '<strong>CDATA-Abschnitte</strong>: Ungeparster Inhalt als normaler Text.',
    edgeCase3: '<strong>Namensraume</strong>: Erhohen die Komplexitat der Zuordnung.',
    edgeCase4: '<strong>Gemischter Inhalt</strong>: Elemente mit Text und Unterelementen.',
    edgeCase5: '<strong>Leere Elemente</strong>: Konnen zu null, leerem String oder leerem Objekt werden.',
    edgeCase6: '<strong>Array-Erkennung</strong>: Bestimmung, wann JSON-Arrays verwendet werden.',
    edgeCase7: '<strong>Leerzeichen-Behandlung</strong>: Unterscheidung signifikanter Leerzeichen.',
    edgeCase8: '<strong>XML-Deklaration und DTD</strong>: Metadaten ohne JSON-Zuordnung.',
    h2_security: 'XML-Sicherheits-Best-Practices',
    securityDesc: 'Sicherheit ist beim Arbeiten mit XML-Parsern von grosster Bedeutung:',
    security1: '<strong>XXE-Angriffe</strong>: Deaktivieren Sie die Verarbeitung externer Entitaten.',
    security2: '<strong>Billion-Laughs-Angriff</strong>: Begrenzen Sie die Entitatsexpansion.',
    security3: '<strong>DTD-basierte Injektion</strong>: Deaktivieren Sie das Laden externer DTDs.',
    security4: '<strong>Sichere Konfiguration</strong>: Jede Programmiersprache erfordert explizite Sicherheitskonfiguration fur XML-Parser.',
    h2_faq: 'Haufig gestellte Fragen',
    faq1_q: 'Was ist die beste Methode zur XML-zu-JSON-Konvertierung?',
    faq1_a: 'Das hangt von der Sprache ab. JavaScript: fast-xml-parser. Python: xmltodict. CLI: xq. Fur schnelle Konvertierung nutzen Sie ein Online-Tool.',
    faq2_q: 'Wie werden XML-Attribute in JSON behandelt?',
    faq2_a: 'Attribute werden mit Prafixen wie @ zugeordnet. Text wird in einem #text-Schlussel gespeichert, wenn er mit Attributen koexistiert.',
    faq3_q: 'Ist XML-zu-JSON-Konvertierung sicher?',
    faq3_a: 'XML-Parsing kann ohne korrekte Konfiguration gefahrlich sein. Deaktivieren Sie externe Entitaten, verwenden Sie defusedxml in Python und konfigurieren Sie Parser sicher.',
    conclusion: 'Die XML-zu-JSON-Konvertierung ist eine grundlegende Fahigkeit fur moderne Entwickler. Nutzen Sie unser kostenloses Tool fur schnelle Konvertierungen.',
    linkToolBottom: 'Konvertieren Sie XML sofort zu JSON mit unserem kostenlosen Online-Tool.',
  },
  es: {
    intro: '<strong>La conversion de XML a JSON</strong> es una de las tareas de transformacion de datos mas comunes en el desarrollo de software moderno. Ya sea que procese archivos de configuracion, feeds RSS o respuestas de API SOAP, un conversor eficiente de XML a JSON ahorra horas de trabajo manual. Esta guia cubre todo, desde los mecanismos de analisis hasta ejemplos de codigo en JavaScript, Python, Java y Bash.',
    linkTool: 'Prueba nuestra herramienta gratuita de conversion XML a JSON en linea.',
    h2_what: 'Que es la conversion de XML a JSON?',
    whatDesc1: '<strong>XML</strong> y <strong>JSON</strong> son los dos formatos de intercambio de datos mas utilizados. XML domino la informatica empresarial durante decadas. JSON surgio como la alternativa ligera preferida por los desarrolladores web.',
    whatDesc2: 'Un conversor de XML a JSON toma un documento XML bien formado y lo transforma en una representacion JSON equivalente, gestionando elementos, atributos, espacios de nombres y secciones CDATA.',
    whatDesc3: 'La operacion inversa, la conversion de JSON a XML, es igualmente importante al integrarse con sistemas XML existentes.',
    h2_comparison: 'XML vs JSON: comparacion detallada',
    comparisonDesc: 'Comprender las diferencias estructurales entre XML y JSON es esencial:',
    comparisonTable: '<table><thead><tr><th>Caracteristica</th><th>XML</th><th>JSON</th></tr></thead><tbody><tr><td>Sintaxis</td><td>Etiquetas de apertura/cierre</td><td>Pares clave-valor</td></tr><tr><td>Atributos</td><td>Soporte nativo</td><td>Sin concepto de atributos</td></tr><tr><td>Espacios de nombres</td><td>Soporte completo via xmlns</td><td>Sin soporte nativo</td></tr><tr><td>Tamano</td><td>Mayor</td><td>30-50% mas pequeno</td></tr></tbody></table>',
    h2_howWorks: 'Como funciona la conversion XML a JSON',
    howWorksDesc: 'El proceso de conversion involucra varios pasos clave:',
    howWorksSteps: '<ol><li><strong>Analizar el documento XML</strong>: Construccion de un arbol DOM o eventos SAX.</li><li><strong>Mapear elementos a objetos</strong>: Cada elemento se convierte en propiedad JSON.</li><li><strong>Manejar atributos</strong>: Uso de prefijos como <code>@</code>.</li><li><strong>Procesar nodos de texto</strong>: Mapeo directo a valores de cadena.</li><li><strong>Convertir elementos repetidos en arrays</strong>.</li><li><strong>Manejar espacios de nombres</strong>.</li></ol>',
    howWorksConventions: 'Varias convenciones definen el mapeo XML a JSON:',
    howWorksConventionsList: '<ul><li><strong>Convencion Badgerfish</strong>: Preserva toda la informacion XML.</li><li><strong>Convencion Parker</strong>: JSON mas compacto.</li><li><strong>Convencion GData</strong>: Solucion intermedia usada por Google.</li></ul>',
    h2_codeExamples: 'Ejemplos de codigo XML a JSON',
    codeJsTitle: 'JavaScript: XML a JSON',
    codeJsDesc: 'En JavaScript, <code>fast-xml-parser</code> y <code>xml2js</code> ofrecen conversion robusta:',
    codePyTitle: 'Python: XML a JSON',
    codePyDesc: 'En Python, <code>xmltodict</code> es la opcion mas popular:',
    codeBashTitle: 'Bash / CLI: XML a JSON',
    codeBashDesc: '<code>xq</code> (de yq) y <code>xmlstarlet</code> permiten la conversion en linea de comandos:',
    codeJavaTitle: 'Java: XML a JSON',
    codeJavaDesc: 'En Java, Jackson XML y <code>org.json</code> son las herramientas principales:',
    h2_jsonToXml: 'Conversion JSON a XML',
    jsonToXmlDesc1: 'La direccion inversa presenta sus propios desafios:',
    jsonToXmlDesc2: '<strong>Desafios clave</strong>: Los arrays JSON no tienen equivalente XML directo. Los valores null necesitan representacion. Los nombres de propiedades pueden ser invalidos en XML.',
    jsonToXmlDesc3: 'Ejemplos de conversion JSON a XML en JavaScript y Python:',
    h2_edgeCases: 'Manejo de casos extremos',
    edgeCasesDesc: 'Los conversores de calidad produccion deben manejar numerosos casos extremos:',
    edgeCase1: '<strong>Atributos XML</strong>: El caso extremo mas comun con convenciones de prefijo.',
    edgeCase2: '<strong>Secciones CDATA</strong>: Contenido sin analizar tratado como texto normal.',
    edgeCase3: '<strong>Espacios de nombres</strong>: Aumentan la complejidad del mapeo.',
    edgeCase4: '<strong>Contenido mixto</strong>: Elementos con texto y subelementos.',
    edgeCase5: '<strong>Elementos vacios</strong>: Pueden convertirse en null, cadena vacia u objeto vacio.',
    edgeCase6: '<strong>Deteccion de arrays</strong>: Determinar cuando usar arrays JSON.',
    edgeCase7: '<strong>Manejo de espacios en blanco</strong>: Distinguir espacios significativos.',
    edgeCase8: '<strong>Declaracion XML y DTD</strong>: Metadatos sin mapeo JSON.',
    h2_security: 'Mejores practicas de seguridad XML',
    securityDesc: 'La seguridad es primordial al trabajar con analizadores XML:',
    security1: '<strong>Ataques XXE</strong>: Deshabilite el procesamiento de entidades externas.',
    security2: '<strong>Ataque Billion Laughs</strong>: Limite la expansion de entidades.',
    security3: '<strong>Inyeccion via DTD</strong>: Deshabilite la carga de DTD externas.',
    security4: '<strong>Configuracion segura</strong>: Cada lenguaje requiere configuracion de seguridad explicita para los analizadores XML.',
    h2_faq: 'Preguntas frecuentes',
    faq1_q: 'Cual es la mejor forma de convertir XML a JSON?',
    faq1_a: 'Depende del lenguaje. JavaScript: fast-xml-parser. Python: xmltodict. CLI: xq. Para conversion rapida, use una herramienta en linea.',
    faq2_q: 'Como se manejan los atributos XML en JSON?',
    faq2_a: 'Los atributos se mapean con prefijos como @. El texto se almacena en una clave #text cuando coexiste con atributos.',
    faq3_q: 'Es segura la conversion XML a JSON?',
    faq3_a: 'El analisis XML puede ser peligroso sin configuracion adecuada. Deshabilite entidades externas, use defusedxml en Python y configure los parsers de forma segura.',
    conclusion: 'La conversion XML a JSON es una habilidad fundamental para desarrolladores modernos. Use nuestra herramienta gratuita para conversiones rapidas.',
    linkToolBottom: 'Convierta XML a JSON al instante con nuestra herramienta gratuita en linea.',
  },
  ja: {
    intro: '<strong>XMLからJSONへの変換</strong>は、現代のソフトウェア開発で最も一般的なデータ変換タスクの一つです。設定ファイル、RSSフィード、SOAP APIレスポンスを処理する場合でも、効率的なXMLからJSON変換ツールは手作業の時間を大幅に節約します。この包括的なガイドでは、パースメカニズムからJavaScript、Python、Java、Bashのコード例まですべてをカバーします。',
    linkTool: '無料オンラインXMLからJSON変換ツールをお試しください。',
    h2_what: 'XMLからJSON変換とは？',
    whatDesc1: '<strong>XML</strong>と<strong>JSON</strong>は最も広く使われている2つのデータ交換形式です。XMLは数十年にわたりエンタープライズコンピューティングを支配してきました。JSONはWeb開発者に好まれる軽量な代替手段として登場しました。',
    whatDesc2: 'XMLからJSON変換器は整形式のXMLドキュメントを受け取り、要素、属性、名前空間、CDATAセクションを処理しながら同等のJSON表現に変換します。',
    whatDesc3: '逆の操作であるJSONからXML変換は、既存のXMLシステムとの統合時に同様に重要です。',
    h2_comparison: 'XML vs JSON：詳細比較',
    comparisonDesc: '変換技術に入る前に、XMLとJSONの構造的違いを理解することが重要です：',
    comparisonTable: '<table><thead><tr><th>特性</th><th>XML</th><th>JSON</th></tr></thead><tbody><tr><td>構文</td><td>タグベースのマークアップ</td><td>キーバリューペア</td></tr><tr><td>属性</td><td>ネイティブサポート</td><td>属性の概念なし</td></tr><tr><td>名前空間</td><td>完全サポート</td><td>ネイティブサポートなし</td></tr><tr><td>サイズ</td><td>より大きい</td><td>30-50%小さい</td></tr></tbody></table>',
    h2_howWorks: 'XMLからJSON変換の仕組み',
    howWorksDesc: '変換プロセスにはいくつかの重要なステップがあります：',
    howWorksSteps: '<ol><li><strong>XMLドキュメントのパース</strong>：DOMツリーの構築またはSAXイベント。</li><li><strong>要素をオブジェクトにマッピング</strong>：各要素がJSONプロパティになります。</li><li><strong>属性の処理</strong>：<code>@</code>などのプレフィックスを使用。</li><li><strong>テキストノードの処理</strong>：文字列値への直接マッピング。</li><li><strong>繰り返し要素を配列に変換</strong>。</li><li><strong>名前空間の処理</strong>。</li></ol>',
    howWorksConventions: 'いくつかの確立された規約がXMLからJSONへのマッピングを定義します：',
    howWorksConventionsList: '<ul><li><strong>Badgerfish規約</strong>：すべてのXML情報を保持。</li><li><strong>Parker規約</strong>：最もコンパクトなJSON。</li><li><strong>GData規約</strong>：Googleが使用する中間的アプローチ。</li></ul>',
    h2_codeExamples: 'XMLからJSONコード例',
    codeJsTitle: 'JavaScript：XMLからJSON',
    codeJsDesc: 'JavaScriptでは<code>fast-xml-parser</code>と<code>xml2js</code>が堅牢な変換を提供します：',
    codePyTitle: 'Python：XMLからJSON',
    codePyDesc: 'Pythonでは<code>xmltodict</code>が最も人気の選択肢です：',
    codeBashTitle: 'Bash / CLI：XMLからJSON',
    codeBashDesc: '<code>xq</code>（yqから）と<code>xmlstarlet</code>でコマンドライン変換が可能です：',
    codeJavaTitle: 'Java：XMLからJSON',
    codeJavaDesc: 'JavaではJackson XMLと<code>org.json</code>が主要ツールです：',
    h2_jsonToXml: 'JSONからXML変換',
    jsonToXmlDesc1: '逆方向には固有の課題があります：',
    jsonToXmlDesc2: '<strong>主な課題</strong>：JSON配列にはXMLの直接的な等価物がありません。null値には表現が必要です。プロパティ名がXMLで無効な場合があります。',
    jsonToXmlDesc3: 'JavaScriptとPythonでのJSONからXML変換の例：',
    h2_edgeCases: 'エッジケースの処理',
    edgeCasesDesc: '本番品質の変換器は多数のエッジケースを処理する必要があります：',
    edgeCase1: '<strong>XML属性</strong>：最も一般的なエッジケースで、プレフィックス規約が必要。',
    edgeCase2: '<strong>CDATAセクション</strong>：パースされないコンテンツを通常のテキストとして処理。',
    edgeCase3: '<strong>名前空間</strong>：マッピングの複雑さを増加。',
    edgeCase4: '<strong>混合コンテンツ</strong>：テキストと子要素を含む要素。',
    edgeCase5: '<strong>空要素</strong>：null、空文字列、空オブジェクトに変換可能。',
    edgeCase6: '<strong>配列検出</strong>：JSON配列を使用するタイミングの判断。',
    edgeCase7: '<strong>空白処理</strong>：有意な空白の区別。',
    edgeCase8: '<strong>XML宣言とDTD</strong>：JSONにマッピングされないメタデータ。',
    h2_security: 'XMLセキュリティベストプラクティス',
    securityDesc: 'XMLパーサーを使用する際、セキュリティは最も重要です：',
    security1: '<strong>XXE攻撃</strong>：外部エンティティ処理を無効にしてください。',
    security2: '<strong>Billion Laughs攻撃</strong>：エンティティ展開を制限してください。',
    security3: '<strong>DTDベースのインジェクション</strong>：外部DTDの読み込みを無効に。',
    security4: '<strong>セキュアな設定</strong>：各プログラミング言語でXMLパーサーの明示的なセキュリティ設定が必要です。',
    h2_faq: 'よくある質問',
    faq1_q: 'XMLをJSONに変換する最良の方法は？',
    faq1_a: '言語によります。JavaScript：fast-xml-parser。Python：xmltodict。CLI：xq。素早い変換にはオンラインツールをご利用ください。',
    faq2_q: 'XML属性はJSON変換でどう処理されますか？',
    faq2_a: '属性は@などのプレフィックスでマッピングされます。属性とテキストが共存する場合、テキストは#textキーに格納されます。',
    faq3_q: 'XMLからJSON変換は安全ですか？',
    faq3_a: '適切な設定がないとXMLパースは危険です。外部エンティティを無効にし、Pythonではdefusedxmlを使用し、パーサーを安全に設定してください。',
    conclusion: 'XMLからJSON変換は現代の開発者にとって基本的なスキルです。無料オンラインツールで素早く変換を行えます。',
    linkToolBottom: '無料オンラインツールでXMLをJSONに即座に変換。',
  },
  ko: {
    intro: '<strong>XML에서 JSON으로의 변환</strong>은 현대 소프트웨어 개발에서 가장 일반적인 데이터 변환 작업 중 하나입니다. 구성 파일, RSS 피드 또는 SOAP API 응답을 처리하든, 효율적인 XML-JSON 변환기는 수작업 시간을 절약합니다. 이 포괄적인 가이드는 파싱 메커니즘부터 JavaScript, Python, Java, Bash의 코드 예제까지 모든 것을 다룹니다.',
    linkTool: '무료 온라인 XML-JSON 변환 도구를 사용해 보세요.',
    h2_what: 'XML에서 JSON 변환이란?',
    whatDesc1: '<strong>XML</strong>과 <strong>JSON</strong>은 가장 널리 사용되는 두 가지 데이터 교환 형식입니다. XML은 수십 년간 엔터프라이즈 컴퓨팅을 지배했습니다. JSON은 웹 개발자가 선호하는 경량 대안으로 등장했습니다.',
    whatDesc2: 'XML-JSON 변환기는 올바른 형식의 XML 문서를 받아 요소, 속성, 네임스페이스, CDATA 섹션을 처리하면서 동등한 JSON 표현으로 변환합니다.',
    whatDesc3: '역방향인 JSON에서 XML 변환은 기존 XML 시스템과 통합할 때 똑같이 중요합니다.',
    h2_comparison: 'XML vs JSON: 상세 비교',
    comparisonDesc: '변환 기술에 들어가기 전에 XML과 JSON의 구조적 차이를 이해하는 것이 중요합니다:',
    comparisonTable: '<table><thead><tr><th>특성</th><th>XML</th><th>JSON</th></tr></thead><tbody><tr><td>구문</td><td>태그 기반 마크업</td><td>키-값 쌍</td></tr><tr><td>속성</td><td>네이티브 지원</td><td>속성 개념 없음</td></tr><tr><td>네임스페이스</td><td>완전 지원</td><td>네이티브 지원 없음</td></tr><tr><td>크기</td><td>더 큼</td><td>30-50% 작음</td></tr></tbody></table>',
    h2_howWorks: 'XML에서 JSON 변환 작동 방식',
    howWorksDesc: '변환 프로세스에는 여러 핵심 단계가 있습니다:',
    howWorksSteps: '<ol><li><strong>XML 문서 파싱</strong>: DOM 트리 구축 또는 SAX 이벤트.</li><li><strong>요소를 객체에 매핑</strong>: 각 요소가 JSON 속성이 됩니다.</li><li><strong>속성 처리</strong>: <code>@</code> 등의 접두사 사용.</li><li><strong>텍스트 노드 처리</strong>: 문자열 값으로 직접 매핑.</li><li><strong>반복 요소를 배열로 변환</strong>.</li><li><strong>네임스페이스 처리</strong>.</li></ol>',
    howWorksConventions: '여러 확립된 규칙이 XML에서 JSON으로의 매핑을 정의합니다:',
    howWorksConventionsList: '<ul><li><strong>Badgerfish 규칙</strong>: 모든 XML 정보를 보존.</li><li><strong>Parker 규칙</strong>: 가장 컴팩트한 JSON.</li><li><strong>GData 규칙</strong>: Google이 사용하는 중간 접근법.</li></ul>',
    h2_codeExamples: 'XML에서 JSON 코드 예제',
    codeJsTitle: 'JavaScript: XML에서 JSON',
    codeJsDesc: 'JavaScript에서 <code>fast-xml-parser</code>와 <code>xml2js</code>가 견고한 변환을 제공합니다:',
    codePyTitle: 'Python: XML에서 JSON',
    codePyDesc: 'Python에서 <code>xmltodict</code>가 가장 인기 있는 선택입니다:',
    codeBashTitle: 'Bash / CLI: XML에서 JSON',
    codeBashDesc: '<code>xq</code>(yq에서)와 <code>xmlstarlet</code>으로 명령줄 변환이 가능합니다:',
    codeJavaTitle: 'Java: XML에서 JSON',
    codeJavaDesc: 'Java에서 Jackson XML과 <code>org.json</code>이 주요 도구입니다:',
    h2_jsonToXml: 'JSON에서 XML 변환',
    jsonToXmlDesc1: '역방향에는 고유한 과제가 있습니다:',
    jsonToXmlDesc2: '<strong>주요 과제</strong>: JSON 배열에는 XML의 직접적인 등가물이 없습니다. null 값에는 표현이 필요합니다. 속성 이름이 XML에서 유효하지 않을 수 있습니다.',
    jsonToXmlDesc3: 'JavaScript와 Python에서의 JSON-XML 변환 예제:',
    h2_edgeCases: '엣지 케이스 처리',
    edgeCasesDesc: '프로덕션 품질의 변환기는 수많은 엣지 케이스를 처리해야 합니다:',
    edgeCase1: '<strong>XML 속성</strong>: 접두사 규칙이 필요한 가장 일반적인 엣지 케이스.',
    edgeCase2: '<strong>CDATA 섹션</strong>: 파싱되지 않은 콘텐츠를 일반 텍스트로 처리.',
    edgeCase3: '<strong>네임스페이스</strong>: 매핑 복잡성 증가.',
    edgeCase4: '<strong>혼합 콘텐츠</strong>: 텍스트와 자식 요소를 포함하는 요소.',
    edgeCase5: '<strong>빈 요소</strong>: null, 빈 문자열 또는 빈 객체로 변환 가능.',
    edgeCase6: '<strong>배열 감지</strong>: JSON 배열 사용 시기 결정.',
    edgeCase7: '<strong>공백 처리</strong>: 유의미한 공백 구분.',
    edgeCase8: '<strong>XML 선언과 DTD</strong>: JSON에 매핑되지 않는 메타데이터.',
    h2_security: 'XML 보안 모범 사례',
    securityDesc: 'XML 파서를 다룰 때 보안은 가장 중요합니다:',
    security1: '<strong>XXE 공격</strong>: 외부 엔티티 처리를 비활성화하세요.',
    security2: '<strong>Billion Laughs 공격</strong>: 엔티티 확장을 제한하세요.',
    security3: '<strong>DTD 기반 인젝션</strong>: 외부 DTD 로딩을 비활성화.',
    security4: '<strong>보안 구성</strong>: 각 프로그래밍 언어에서 XML 파서의 명시적 보안 구성이 필요합니다.',
    h2_faq: '자주 묻는 질문',
    faq1_q: 'XML을 JSON으로 변환하는 가장 좋은 방법은?',
    faq1_a: '언어에 따라 다릅니다. JavaScript: fast-xml-parser. Python: xmltodict. CLI: xq. 빠른 변환에는 온라인 도구를 이용하세요.',
    faq2_q: 'XML 속성은 JSON 변환에서 어떻게 처리되나요?',
    faq2_a: '속성은 @ 같은 접두사로 매핑됩니다. 속성과 텍스트가 공존할 때 텍스트는 #text 키에 저장됩니다.',
    faq3_q: 'XML에서 JSON 변환은 안전한가요?',
    faq3_a: '적절한 설정 없이는 XML 파싱이 위험할 수 있습니다. 외부 엔티티를 비활성화하고 Python에서는 defusedxml을 사용하며 파서를 안전하게 설정하세요.',
    conclusion: 'XML에서 JSON 변환은 현대 개발자에게 필수적인 기술입니다. 무료 온라인 도구로 빠르게 변환을 수행하세요.',
    linkToolBottom: '무료 온라인 도구로 XML을 JSON으로 즉시 변환하세요.',
  },
};

export default function XmlToJsonConverterGuide({ lang }: { lang: string }) {
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
      <p><Link href={`/${lang}/tools/xml-to-json`} style={{ fontWeight: 600 }}>{s.linkTool}</Link></p>

      {/* Section 1: What is XML to JSON Conversion? */}
      <h2>{s.h2_what}</h2>
      <p dangerouslySetInnerHTML={{ __html: s.whatDesc1 }} />
      <p dangerouslySetInnerHTML={{ __html: s.whatDesc2 }} />
      <p dangerouslySetInnerHTML={{ __html: s.whatDesc3 }} />

      {/* Section 2: XML vs JSON Comparison */}
      <h2>{s.h2_comparison}</h2>
      <p dangerouslySetInnerHTML={{ __html: s.comparisonDesc }} />
      <div dangerouslySetInnerHTML={{ __html: s.comparisonTable }} />

      {/* Section 3: How XML to JSON Conversion Works */}
      <h2>{s.h2_howWorks}</h2>
      <p dangerouslySetInnerHTML={{ __html: s.howWorksDesc }} />
      <div dangerouslySetInnerHTML={{ __html: s.howWorksSteps }} />
      <p dangerouslySetInnerHTML={{ __html: s.howWorksConventions }} />
      <div dangerouslySetInnerHTML={{ __html: s.howWorksConventionsList }} />

      {/* Section 4: Code Examples */}
      <h2>{s.h2_codeExamples}</h2>

      <h3>{s.codeJsTitle}</h3>
      <p dangerouslySetInnerHTML={{ __html: s.codeJsDesc }} />
      <pre><code>{`// ===== Using fast-xml-parser (recommended) =====
// npm install fast-xml-parser

import { XMLParser, XMLBuilder } from 'fast-xml-parser';

const xml = \`<?xml version="1.0" encoding="UTF-8"?>
<bookstore>
  <book id="1" category="fiction">
    <title lang="en">The Great Gatsby</title>
    <author>F. Scott Fitzgerald</author>
    <price currency="USD">10.99</price>
    <year>1925</year>
  </book>
  <book id="2" category="non-fiction">
    <title lang="en">Sapiens</title>
    <author>Yuval Noah Harari</author>
    <price currency="USD">14.99</price>
    <year>2011</year>
  </book>
</bookstore>\`;

// Configure parser with attribute handling
const parser = new XMLParser({
  ignoreAttributes: false,       // preserve attributes
  attributeNamePrefix: '@_',     // prefix for attributes
  textNodeName: '#text',         // key for text content
  isArray: (name, jpath) => {    // force arrays for known collections
    return ['bookstore.book'].includes(jpath);
  },
});

const json = parser.parse(xml);
console.log(JSON.stringify(json, null, 2));
// Output:
// {
//   "bookstore": {
//     "book": [
//       {
//         "@_id": "1",
//         "@_category": "fiction",
//         "title": { "@_lang": "en", "#text": "The Great Gatsby" },
//         "author": "F. Scott Fitzgerald",
//         "price": { "@_currency": "USD", "#text": 10.99 },
//         "year": 1925
//       },
//       ...
//     ]
//   }
// }

// ===== Using DOMParser (browser built-in) =====

function xmlToJson(xmlString) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(xmlString, 'text/xml');

  function nodeToJson(node) {
    const obj = {};

    // Handle attributes
    if (node.attributes && node.attributes.length > 0) {
      for (let i = 0; i < node.attributes.length; i++) {
        const attr = node.attributes[i];
        obj['@' + attr.nodeName] = attr.nodeValue;
      }
    }

    // Handle child nodes
    if (node.childNodes && node.childNodes.length > 0) {
      for (let i = 0; i < node.childNodes.length; i++) {
        const child = node.childNodes[i];
        if (child.nodeType === 1) { // Element node
          const childObj = nodeToJson(child);
          if (obj[child.nodeName]) {
            // Convert to array if duplicate element names
            if (!Array.isArray(obj[child.nodeName])) {
              obj[child.nodeName] = [obj[child.nodeName]];
            }
            obj[child.nodeName].push(childObj);
          } else {
            obj[child.nodeName] = childObj;
          }
        } else if (child.nodeType === 3) { // Text node
          const text = child.nodeValue.trim();
          if (text) {
            if (Object.keys(obj).length === 0) return text;
            obj['#text'] = text;
          }
        } else if (child.nodeType === 4) { // CDATA section
          obj['#cdata'] = child.nodeValue;
        }
      }
    }
    return obj;
  }

  const root = doc.documentElement;
  const result = {};
  result[root.nodeName] = nodeToJson(root);
  return result;
}

// ===== Using xml2js (Node.js) =====
// npm install xml2js

import { parseString } from 'xml2js';

parseString(xml, {
  explicitArray: false,
  mergeAttrs: true,
  trim: true,
}, (err, result) => {
  if (err) throw err;
  console.log(JSON.stringify(result, null, 2));
});

// ===== Streaming large XML with sax (Node.js) =====
// npm install sax

import sax from 'sax';

const saxParser = sax.createStream(true, { trim: true });
const stack = [];
let current = {};

saxParser.on('opentag', (node) => {
  const obj = {};
  if (node.attributes) {
    for (const [key, value] of Object.entries(node.attributes)) {
      obj['@' + key] = value;
    }
  }
  stack.push(current);
  current[node.name] = obj;
  current = obj;
});

saxParser.on('text', (text) => {
  if (text.trim()) current['#text'] = text.trim();
});

saxParser.on('closetag', () => {
  current = stack.pop();
});`}</code></pre>

      <h3>{s.codePyTitle}</h3>
      <p dangerouslySetInnerHTML={{ __html: s.codePyDesc }} />
      <pre><code>{`# ===== Using xmltodict (most popular) =====
# pip install xmltodict

import xmltodict
import json

xml_string = """<?xml version="1.0" encoding="UTF-8"?>
<catalog>
  <product id="101" category="electronics">
    <name>Wireless Mouse</name>
    <price currency="USD">29.99</price>
    <specs>
      <weight unit="g">85</weight>
      <battery>AA</battery>
      <connectivity>Bluetooth 5.0</connectivity>
    </specs>
    <tags>
      <tag>wireless</tag>
      <tag>mouse</tag>
      <tag>bluetooth</tag>
    </tags>
  </product>
</catalog>
"""

# Convert XML to Python dict (then to JSON)
data = xmltodict.parse(xml_string)
json_output = json.dumps(data, indent=2, ensure_ascii=False)
print(json_output)
# Output:
# {
#   "catalog": {
#     "product": {
#       "@id": "101",
#       "@category": "electronics",
#       "name": "Wireless Mouse",
#       "price": { "@currency": "USD", "#text": "29.99" },
#       "specs": {
#         "weight": { "@unit": "g", "#text": "85" },
#         "battery": "AA",
#         "connectivity": "Bluetooth 5.0"
#       },
#       "tags": { "tag": ["wireless", "mouse", "bluetooth"] }
#     }
#   }
# }

# Force specific elements to always be lists
data = xmltodict.parse(xml_string, force_list=('product', 'tag'))

# ===== Using defusedxml for security =====
# pip install defusedxml

import defusedxml.ElementTree as ET

# Safe parsing - blocks XXE, entity expansion, etc.
tree = ET.fromstring(xml_string)

def element_to_dict(element):
    result = {}

    # Handle attributes
    if element.attrib:
        for key, value in element.attrib.items():
            result[f'@{key}'] = value

    # Handle child elements
    children = list(element)
    if children:
        for child in children:
            child_data = element_to_dict(child)
            if child.tag in result:
                # Convert to list for repeated elements
                if not isinstance(result[child.tag], list):
                    result[child.tag] = [result[child.tag]]
                result[child.tag].append(child_data)
            else:
                result[child.tag] = child_data
    elif element.text and element.text.strip():
        if result:  # Has attributes
            result['#text'] = element.text.strip()
        else:
            return element.text.strip()

    return result

root = tree
json_data = {root.tag: element_to_dict(root)}
print(json.dumps(json_data, indent=2))

# ===== Using lxml with XPath =====
# pip install lxml

from lxml import etree

tree = etree.fromstring(xml_string.encode())

# Extract specific data with XPath, output as JSON
products = []
for product in tree.xpath('//product'):
    products.append({
        'id': product.get('id'),
        'name': product.xpath('name/text()')[0],
        'price': float(product.xpath('price/text()')[0]),
        'currency': product.xpath('price/@currency')[0],
    })
print(json.dumps(products, indent=2))`}</code></pre>

      <h3>{s.codeBashTitle}</h3>
      <p dangerouslySetInnerHTML={{ __html: s.codeBashDesc }} />
      <pre><code>{`# ===== Using xq (part of yq, recommended) =====
# Install: pip install yq  OR  brew install yq

# Basic XML to JSON conversion
cat data.xml | xq .
# Or directly from a file
xq . data.xml

# Pretty-print with specific fields
xq '.catalog.product[] | {name: .name, price: .price}' data.xml

# Convert and save to file
xq . input.xml > output.json

# Extract specific values
xq -r '.catalog.product.name' data.xml

# ===== Using xmlstarlet =====
# Install: brew install xmlstarlet  OR  apt install xmlstarlet

# Select specific elements
xmlstarlet sel -t -v "//product/name" data.xml

# Convert to a flat key-value format
xmlstarlet sel -t \\
  -m "//product" \\
  -v "@id" -o "," \\
  -v "name" -o "," \\
  -v "price" -n data.xml

# ===== Python one-liners =====

# Quick XML to JSON from command line
python3 -c "
import xmltodict, json, sys
print(json.dumps(xmltodict.parse(sys.stdin.read()), indent=2))
" < data.xml

# Using built-in xml.etree (no pip install needed)
python3 -c "
import xml.etree.ElementTree as ET, json, sys
root = ET.parse(sys.stdin).getroot()
def to_dict(el):
    d = dict(el.attrib)
    children = list(el)
    if children:
        for c in children:
            cd = to_dict(c)
            if c.tag in d:
                if not isinstance(d[c.tag], list): d[c.tag] = [d[c.tag]]
                d[c.tag].append(cd)
            else: d[c.tag] = cd
    elif el.text and el.text.strip():
        if d: d['#text'] = el.text.strip()
        else: return el.text.strip()
    return d
print(json.dumps({root.tag: to_dict(root)}, indent=2))
" < data.xml

# ===== Using curl + xq for API responses =====

# Fetch XML API and convert to JSON
curl -s "https://api.example.com/data.xml" | xq .

# SOAP response to JSON
curl -s -X POST "https://api.example.com/soap" \\
  -H "Content-Type: text/xml" \\
  -d @request.xml | xq '.Envelope.Body'`}</code></pre>

      <h3>{s.codeJavaTitle}</h3>
      <p dangerouslySetInnerHTML={{ __html: s.codeJavaDesc }} />
      <pre><code>{`// ===== Using org.json (simple conversion) =====
// Maven: org.json:json:20231013

import org.json.JSONObject;
import org.json.XML;

public class XmlToJsonExample {
    public static void main(String[] args) {
        String xml = """
            <bookstore>
              <book id="1">
                <title>Clean Code</title>
                <author>Robert C. Martin</author>
                <price>32.99</price>
              </book>
            </bookstore>
            """;

        // Simple one-line conversion
        JSONObject json = XML.toJSONObject(xml);
        System.out.println(json.toString(2));

        // With configuration
        JSONObject jsonKeepStrings = XML.toJSONObject(xml, true);
        // true = keep all values as strings (no type coercion)
    }
}

// ===== Using Jackson XML (more control) =====
// Maven: com.fasterxml.jackson.dataformat:jackson-dataformat-xml

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.dataformat.xml.XmlMapper;

public class JacksonXmlExample {
    public static void main(String[] args) throws Exception {
        String xml = "<book id=\\"1\\"><title>Clean Code</title></book>";

        XmlMapper xmlMapper = new XmlMapper();
        JsonNode node = xmlMapper.readTree(xml.getBytes());

        ObjectMapper jsonMapper = new ObjectMapper();
        String json = jsonMapper
            .writerWithDefaultPrettyPrinter()
            .writeValueAsString(node);

        System.out.println(json);
    }
}

// ===== Secure XML parsing in Java =====

import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.XMLConstants;

DocumentBuilderFactory dbf = DocumentBuilderFactory.newInstance();

// Prevent XXE attacks
dbf.setFeature(XMLConstants.FEATURE_SECURE_PROCESSING, true);
dbf.setFeature(
    "http://apache.org/xml/features/disallow-doctype-decl", true);
dbf.setFeature(
    "http://xml.org/sax/features/external-general-entities", false);
dbf.setFeature(
    "http://xml.org/sax/features/external-parameter-entities", false);
dbf.setXIncludeAware(false);
dbf.setExpandEntityReferences(false);`}</code></pre>

      {/* Section 5: JSON to XML Conversion */}
      <h2>{s.h2_jsonToXml}</h2>
      <p dangerouslySetInnerHTML={{ __html: s.jsonToXmlDesc1 }} />
      <p dangerouslySetInnerHTML={{ __html: s.jsonToXmlDesc2 }} />
      <p dangerouslySetInnerHTML={{ __html: s.jsonToXmlDesc3 }} />
      <pre><code>{`// ===== JavaScript: JSON to XML =====

import { XMLBuilder } from 'fast-xml-parser';

const jsonData = {
  catalog: {
    product: [
      {
        '@_id': '101',
        name: 'Wireless Mouse',
        price: { '@_currency': 'USD', '#text': '29.99' },
        tags: { tag: ['wireless', 'mouse'] },
      },
      {
        '@_id': '102',
        name: 'Keyboard',
        price: { '@_currency': 'USD', '#text': '49.99' },
        tags: { tag: ['keyboard', 'mechanical'] },
      },
    ],
  },
};

const builder = new XMLBuilder({
  ignoreAttributes: false,
  attributeNamePrefix: '@_',
  textNodeName: '#text',
  format: true,           // pretty print
  indentBy: '  ',
  suppressEmptyNode: true,
});

const xml = builder.build(jsonData);
console.log(xml);

# ===== Python: JSON to XML =====

import xmltodict

json_data = {
    'catalog': {
        'product': {
            '@id': '101',
            'name': 'Wireless Mouse',
            'price': {'@currency': 'USD', '#text': '29.99'},
        }
    }
}

xml_output = xmltodict.unparse(json_data, pretty=True)
print(xml_output)
# Output:
# <?xml version="1.0" encoding="utf-8"?>
# <catalog>
#   <product id="101">
#     <name>Wireless Mouse</name>
#     <price currency="USD">29.99</price>
#   </product>
# </catalog>`}</code></pre>

      {/* Section 6: Handling Edge Cases */}
      <h2>{s.h2_edgeCases}</h2>
      <p dangerouslySetInnerHTML={{ __html: s.edgeCasesDesc }} />
      <p dangerouslySetInnerHTML={{ __html: s.edgeCase1 }} />
      <p dangerouslySetInnerHTML={{ __html: s.edgeCase2 }} />
      <p dangerouslySetInnerHTML={{ __html: s.edgeCase3 }} />
      <p dangerouslySetInnerHTML={{ __html: s.edgeCase4 }} />
      <p dangerouslySetInnerHTML={{ __html: s.edgeCase5 }} />
      <p dangerouslySetInnerHTML={{ __html: s.edgeCase6 }} />
      <p dangerouslySetInnerHTML={{ __html: s.edgeCase7 }} />
      <p dangerouslySetInnerHTML={{ __html: s.edgeCase8 }} />

      <pre><code>{`// Edge case examples: XML to JSON

// 1. Attributes + text content
// XML:  <price currency="USD">29.99</price>
// JSON: { "price": { "@currency": "USD", "#text": "29.99" } }

// 2. CDATA section
// XML:  <script><![CDATA[if (a < b) { alert("hello"); }]]></script>
// JSON: { "script": "if (a < b) { alert(\\"hello\\"); }" }

// 3. Namespaces
// XML:  <soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
//         <soap:Body><GetPrice><Item>Apple</Item></GetPrice></soap:Body>
//       </soap:Envelope>
// JSON: { "soap:Envelope": { "soap:Body": { "GetPrice": { "Item": "Apple" } } } }

// 4. Mixed content
// XML:  <p>Hello <b>world</b> today</p>
// JSON: { "p": { "#text": ["Hello ", " today"], "b": "world" } }

// 5. Self-closing / empty elements
// XML:  <br/>  OR  <item></item>
// JSON: { "br": null }  OR  { "item": "" }

// 6. Single vs multiple children (array detection)
// XML (one child):   <items><item>A</item></items>
// JSON (no array):   { "items": { "item": "A" } }
// XML (two children):<items><item>A</item><item>B</item></items>
// JSON (array):      { "items": { "item": ["A", "B"] } }
// Solution: use isArray option in fast-xml-parser or force_list in xmltodict

// 7. Whitespace preservation
// XML:  <code xml:space="preserve">  hello  world  </code>
// JSON: { "code": "  hello  world  " }

// 8. XML declaration (dropped in JSON)
// XML:  <?xml version="1.0" encoding="UTF-8"?>
// JSON: (not included in output)`}</code></pre>

      {/* Section 7: XML Security Best Practices */}
      <h2>{s.h2_security}</h2>
      <p dangerouslySetInnerHTML={{ __html: s.securityDesc }} />
      <p dangerouslySetInnerHTML={{ __html: s.security1 }} />
      <p dangerouslySetInnerHTML={{ __html: s.security2 }} />
      <p dangerouslySetInnerHTML={{ __html: s.security3 }} />
      <p dangerouslySetInnerHTML={{ __html: s.security4 }} />

      <pre><code>{`// ===== Secure XML parsing examples =====

// --- Python: Use defusedxml ---
# UNSAFE: xml.etree.ElementTree (vulnerable to XXE)
import xml.etree.ElementTree as ET  # DO NOT use with untrusted XML

# SAFE: defusedxml blocks all known XML attacks
import defusedxml.ElementTree as SafeET
tree = SafeET.fromstring(untrusted_xml)  # Safe!

# defusedxml blocks:
# - XML External Entity (XXE) attacks
# - Billion Laughs (entity expansion) attacks
# - External DTD retrieval
# - Decompression bombs

# --- Java: Secure DocumentBuilderFactory ---
import javax.xml.parsers.DocumentBuilderFactory;

DocumentBuilderFactory dbf = DocumentBuilderFactory.newInstance();
// Disable all dangerous features
dbf.setFeature(
    "http://apache.org/xml/features/disallow-doctype-decl", true);
dbf.setFeature(
    "http://xml.org/sax/features/external-general-entities", false);
dbf.setFeature(
    "http://xml.org/sax/features/external-parameter-entities", false);
dbf.setFeature(
    "http://apache.org/xml/features/nonvalidating/load-external-dtd",
    false);
dbf.setXIncludeAware(false);
dbf.setExpandEntityReferences(false);

// --- JavaScript (Node.js): fast-xml-parser ---
import { XMLParser } from 'fast-xml-parser';

const secureParser = new XMLParser({
  // fast-xml-parser does NOT process entities by default (safe)
  processEntities: false,       // explicitly disable
  htmlEntities: false,          // don't process HTML entities
  allowBooleanAttributes: false,
});

// --- .NET: Secure XmlReaderSettings ---
// XmlReaderSettings settings = new XmlReaderSettings();
// settings.DtdProcessing = DtdProcessing.Prohibit;
// settings.XmlResolver = null;

// === Example: XXE attack payload (for awareness) ===
// This malicious XML attempts to read /etc/passwd:
//
// <?xml version="1.0"?>
// <!DOCTYPE data [
//   <!ENTITY xxe SYSTEM "file:///etc/passwd">
// ]>
// <data>&xxe;</data>
//
// A vulnerable parser would include file contents in output.
// A secure parser rejects the DOCTYPE declaration entirely.

// === Example: Billion Laughs payload ===
// This XML expands to ~3 GB of text from a few hundred bytes:
//
// <?xml version="1.0"?>
// <!DOCTYPE lolz [
//   <!ENTITY lol "lol">
//   <!ENTITY lol2 "&lol;&lol;&lol;&lol;&lol;&lol;&lol;&lol;&lol;&lol;">
//   <!ENTITY lol3 "&lol2;&lol2;&lol2;&lol2;&lol2;&lol2;&lol2;&lol2;">
//   ...
// ]>
// <data>&lol9;</data>`}</code></pre>

      {/* Section 8: FAQ */}
      <h2>{s.h2_faq}</h2>
      <h3>{s.faq1_q}</h3>
      <p dangerouslySetInnerHTML={{ __html: s.faq1_a }} />
      <h3>{s.faq2_q}</h3>
      <p dangerouslySetInnerHTML={{ __html: s.faq2_a }} />
      <h3>{s.faq3_q}</h3>
      <p dangerouslySetInnerHTML={{ __html: s.faq3_a }} />

      <p style={{ marginTop: 32 }} dangerouslySetInnerHTML={{ __html: s.conclusion }} />
      <p>
        <Link href={`/${lang}/tools/xml-to-json`} style={{ fontWeight: 600 }}>{s.linkToolBottom}</Link>
        {' | '}
        <Link href={`/${lang}/tools/xml-formatter`} style={{ fontWeight: 600 }}>XML Formatter</Link>
        {' | '}
        <Link href={`/${lang}/tools/json-formatter`} style={{ fontWeight: 600 }}>JSON Formatter</Link>
      </p>
    </>
  );
}
