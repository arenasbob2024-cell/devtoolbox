const fs = require('fs');
const path = require('path');

const dictDir = path.join(__dirname, '..', 'src', 'i18n', 'dictionaries');

const toolTranslations = {
  en: {
    'saml-decoder': {
      name: 'SAML Decoder',
      description: 'Decode and inspect SAML responses and requests',
      pageTitle: 'SAML Decoder Online Free — Decode SAML Response & Request',
      pageDescription: 'Decode Base64-encoded SAML responses and requests to readable XML. Debug SSO authentication tokens with our free online SAML decoder tool.',
      samlResponse: 'SAML Response',
      samlRequest: 'SAML Request',
      encodedSaml: 'Encoded SAML',
      decodedXml: 'Decoded XML',
      inputPlaceholder: 'Paste your Base64-encoded SAML response or request here...',
      invalidSaml: 'Invalid SAML data. Could not decode to XML.',
      decodingError: 'Decoding error. Please check your input.',
      seoTitle: 'About SAML Decoder',
      seoContent: 'SAML (Security Assertion Markup Language) is an XML-based framework for exchanging authentication and authorization data between identity providers and service providers. SAML responses and requests are typically Base64-encoded. This tool decodes SAML tokens and formats the XML for easy reading. It supports both SAML Response (Base64 only) and SAML Request (Base64 + Deflate compression).'
    },
    'wifi-qr-generator': {
      name: 'WiFi QR Code Generator',
      description: 'Generate QR codes for WiFi network sharing',
      pageTitle: 'WiFi QR Code Generator — Share WiFi with QR Code Free',
      pageDescription: 'Generate a QR code for your WiFi network. Guests can scan to connect instantly. Supports WPA/WPA2, WEP, and open networks.',
      ssidLabel: 'Network Name (SSID)',
      ssidPlaceholder: 'Enter WiFi network name',
      ssidRequired: 'SSID (Network Name) is required',
      passwordLabel: 'Password',
      passwordPlaceholder: 'Enter WiFi password',
      noPasswordNeeded: 'No password needed',
      encryptionLabel: 'Encryption Type',
      noEncryption: 'None',
      hiddenNetwork: 'Hidden Network',
      generateBtn: 'Generate QR Code',
      downloadBtn: 'Download PNG',
      generationError: 'QR code generation error',
      previewPlaceholder: 'Fill in your WiFi details and click Generate to create a QR code',
      seoTitle: 'About WiFi QR Code Generator',
      seoContent: 'Generate QR codes for WiFi networks that allow anyone to connect instantly by scanning with their phone camera. Supports WPA/WPA2, WEP, and open networks. The QR code contains the SSID, password, and encryption type in a standard format recognized by iOS and Android devices.'
    },
    'xpath-tester': {
      name: 'XPath Tester',
      description: 'Test and evaluate XPath expressions against XML',
      pageTitle: 'XPath Tester Online — Evaluate XPath Expressions Free',
      pageDescription: 'Test XPath expressions against your XML data in real-time. Supports XPath 1.0 functions, node selection, and attribute queries. Free online XPath evaluator.',
      xpathExpression: 'XPath Expression',
      xpathPlaceholder: 'Enter XPath expression, e.g. //book/title',
      matchesFound: 'matches found',
      evaluate: 'Evaluate',
      loadSample: 'Sample',
      examples: 'Examples',
      xmlInput: 'XML Input',
      xmlPlaceholder: 'Paste your XML here...',
      xmlParseError: 'XML Parse Error',
      xpathError: 'XPath Error',
      results: 'Results',
      noResults: 'No matches found',
      seoTitle: 'About XPath Tester',
      seoContent: 'XPath (XML Path Language) is a query language for selecting nodes from XML documents. This online XPath tester lets you evaluate XPath expressions against your XML data in real-time. Supports XPath 1.0 functions including text(), count(), contains(), and more. Perfect for debugging XSLT transformations, web scraping selectors, and XML data extraction.'
    },
    'toml-json': {
      name: 'TOML ↔ JSON Converter',
      description: 'Convert between TOML and JSON formats',
      pageTitle: 'TOML to JSON Converter Online — Convert TOML ↔ JSON Free',
      pageDescription: 'Convert TOML to JSON and JSON to TOML online for free. Parse Cargo.toml, pyproject.toml, and other TOML configuration files.',
      convert: 'Convert',
      loadSample: 'Sample',
      conversionError: 'Conversion error. Please check your input.',
      tomlPlaceholder: 'Paste TOML here...',
      jsonPlaceholder: 'Paste JSON here...',
      seoTitle: 'About TOML to JSON Converter',
      seoContent: "TOML (Tom's Obvious Minimal Language) is a popular configuration file format used in Rust (Cargo.toml), Python (pyproject.toml), and many other tools. This converter transforms TOML to JSON and vice versa, making it easy to work with configuration data across different formats."
    },
    'protobuf-decoder': {
      name: 'Protobuf Decoder',
      description: 'Decode Protocol Buffers binary data without schema',
      pageTitle: 'Protobuf Decoder Online — Decode Protocol Buffers Free',
      pageDescription: 'Decode Protocol Buffers binary data without a .proto schema file. Inspect protobuf wire format from hex or Base64 input. Free online protobuf decoder.',
      encodedInput: 'Encoded Protobuf',
      decodedOutput: 'Decoded Fields',
      hexPlaceholder: 'Paste hex bytes here, e.g. 08 96 01...',
      base64Placeholder: 'Paste Base64 encoded protobuf...',
      loadSample: 'Sample',
      decodingError: 'Decoding error. Please check your input format.',
      seoTitle: 'About Protobuf Decoder',
      seoContent: 'Protocol Buffers (protobuf) is a binary serialization format developed by Google. This tool decodes raw protobuf binary data without requiring a .proto schema file. It identifies field numbers, wire types, and attempts to interpret values as strings, numbers, or nested messages. Supports hex and Base64 input formats.'
    },
    'ai-token-counter': {
      name: 'AI Token Counter',
      description: 'Count tokens and estimate API costs for AI models',
      pageTitle: 'AI Token Counter — Count Tokens for GPT, Claude, Gemini Free',
      pageDescription: 'Count tokens and estimate API costs for GPT-4, Claude, Gemini, Llama and other AI models. Free online token counter for LLM prompt optimization.',
      tokens: 'Tokens',
      characters: 'Characters',
      words: 'Words',
      lines: 'Lines',
      inputLabel: 'Enter your text',
      inputPlaceholder: 'Paste or type your text here to count tokens...',
      costEstimate: 'Cost Estimate by Model',
      model: 'Model',
      context: 'Context',
      inputCost: 'Input Cost',
      outputCost: 'Output Cost',
      disclaimer: '* Token count is an approximation (~4 characters per token for English). Actual tokenization varies by model. Prices are estimates based on published API pricing.',
      seoTitle: 'About AI Token Counter',
      seoContent: 'Tokens are the basic units that AI language models use to process text. This tool estimates the token count for your text across popular models like GPT-4, Claude, Gemini, and Llama. It also calculates the approximate API cost for each model. Useful for optimizing prompts, estimating API costs, and staying within context window limits.'
    }
  },
  zh: {
    'saml-decoder': {
      name: 'SAML 解码器',
      description: '解码和检查 SAML 响应和请求',
      pageTitle: 'SAML 解码器在线 — 免费解码 SAML 响应和请求',
      pageDescription: '将 Base64 编码的 SAML 响应和请求解码为可读的 XML。使用免费的在线 SAML 解码工具调试 SSO 身份验证令牌。',
      samlResponse: 'SAML 响应',
      samlRequest: 'SAML 请求',
      encodedSaml: '编码的 SAML',
      decodedXml: '解码的 XML',
      inputPlaceholder: '在此粘贴 Base64 编码的 SAML 响应或请求...',
      invalidSaml: '无效的 SAML 数据，无法解码为 XML。',
      decodingError: '解码错误，请检查输入。',
      seoTitle: '关于 SAML 解码器',
      seoContent: 'SAML（安全断言标记语言）是用于在身份提供者和服务提供者之间交换认证和授权数据的基于 XML 的框架。SAML 响应和请求通常是 Base64 编码的。此工具可解码 SAML 令牌并格式化 XML 以便于阅读。支持 SAML 响应（仅 Base64）和 SAML 请求（Base64 + Deflate 压缩）。'
    },
    'wifi-qr-generator': {
      name: 'WiFi 二维码生成器',
      description: '生成用于共享 WiFi 网络的二维码',
      pageTitle: 'WiFi 二维码生成器 — 免费用二维码分享 WiFi',
      pageDescription: '为您的 WiFi 网络生成二维码，访客扫码即可连接。支持 WPA/WPA2、WEP 和开放网络。',
      ssidLabel: '网络名称（SSID）',
      ssidPlaceholder: '输入 WiFi 网络名称',
      ssidRequired: '网络名称（SSID）不能为空',
      passwordLabel: '密码',
      passwordPlaceholder: '输入 WiFi 密码',
      noPasswordNeeded: '无需密码',
      encryptionLabel: '加密类型',
      noEncryption: '无',
      hiddenNetwork: '隐藏网络',
      generateBtn: '生成二维码',
      downloadBtn: '下载 PNG',
      generationError: '二维码生成错误',
      previewPlaceholder: '填写 WiFi 信息并点击生成按钮创建二维码',
      seoTitle: '关于 WiFi 二维码生成器',
      seoContent: '生成 WiFi 网络的二维码，任何人都可以通过手机摄像头扫描即时连接。支持 WPA/WPA2、WEP 和开放网络。二维码包含标准格式的 SSID、密码和加密类型，iOS 和 Android 设备均可识别。'
    },
    'xpath-tester': {
      name: 'XPath 测试器',
      description: '测试和评估 XML 的 XPath 表达式',
      pageTitle: 'XPath 在线测试器 — 免费评估 XPath 表达式',
      pageDescription: '实时测试 XML 数据的 XPath 表达式。支持 XPath 1.0 函数、节点选择和属性查询。免费在线 XPath 评估器。',
      xpathExpression: 'XPath 表达式',
      xpathPlaceholder: '输入 XPath 表达式，例如 //book/title',
      matchesFound: '个匹配结果',
      evaluate: '评估',
      loadSample: '示例',
      examples: '示例',
      xmlInput: 'XML 输入',
      xmlPlaceholder: '在此粘贴 XML...',
      xmlParseError: 'XML 解析错误',
      xpathError: 'XPath 错误',
      results: '结果',
      noResults: '未找到匹配结果',
      seoTitle: '关于 XPath 测试器',
      seoContent: 'XPath（XML 路径语言）是一种用于从 XML 文档中选择节点的查询语言。这个在线 XPath 测试器让您可以实时评估 XML 数据的 XPath 表达式。支持 XPath 1.0 函数，包括 text()、count()、contains() 等。适用于调试 XSLT 转换、网页抓取选择器和 XML 数据提取。'
    },
    'toml-json': {
      name: 'TOML ↔ JSON 转换器',
      description: '在 TOML 和 JSON 格式之间转换',
      pageTitle: 'TOML 转 JSON 在线转换器 — 免费 TOML ↔ JSON 互转',
      pageDescription: '在线免费将 TOML 转换为 JSON，或将 JSON 转换为 TOML。解析 Cargo.toml、pyproject.toml 等 TOML 配置文件。',
      convert: '转换',
      loadSample: '示例',
      conversionError: '转换错误，请检查输入。',
      tomlPlaceholder: '在此粘贴 TOML...',
      jsonPlaceholder: '在此粘贴 JSON...',
      seoTitle: '关于 TOML 转 JSON 转换器',
      seoContent: 'TOML（Tom 的显而易见的最小语言）是一种流行的配置文件格式，用于 Rust（Cargo.toml）、Python（pyproject.toml）等众多工具。此转换器可在 TOML 和 JSON 之间互相转换，方便跨格式处理配置数据。'
    },
    'protobuf-decoder': {
      name: 'Protobuf 解码器',
      description: '无需 Schema 解码 Protocol Buffers 二进制数据',
      pageTitle: 'Protobuf 解码器在线 — 免费解码 Protocol Buffers',
      pageDescription: '无需 .proto 架构文件即可解码 Protocol Buffers 二进制数据。从十六进制或 Base64 输入检查 protobuf 线格式。免费在线 protobuf 解码器。',
      encodedInput: '编码的 Protobuf',
      decodedOutput: '解码的字段',
      hexPlaceholder: '在此粘贴十六进制字节，例如 08 96 01...',
      base64Placeholder: '粘贴 Base64 编码的 protobuf...',
      loadSample: '示例',
      decodingError: '解码错误，请检查输入格式。',
      seoTitle: '关于 Protobuf 解码器',
      seoContent: 'Protocol Buffers（protobuf）是 Google 开发的二进制序列化格式。此工具无需 .proto 架构文件即可解码原始 protobuf 二进制数据。它可识别字段号、线类型，并尝试将值解释为字符串、数字或嵌套消息。支持十六进制和 Base64 输入格式。'
    },
    'ai-token-counter': {
      name: 'AI Token 计数器',
      description: '计算 Token 数量并估算 AI 模型 API 费用',
      pageTitle: 'AI Token 计数器 — 免费计算 GPT、Claude、Gemini Token',
      pageDescription: '计算 GPT-4、Claude、Gemini、Llama 等 AI 模型的 Token 数量并估算 API 费用。免费在线 LLM 提示词优化 Token 计数器。',
      tokens: 'Token 数',
      characters: '字符数',
      words: '单词数',
      lines: '行数',
      inputLabel: '输入文本',
      inputPlaceholder: '在此粘贴或输入文本以计算 Token 数...',
      costEstimate: '各模型费用估算',
      model: '模型',
      context: '上下文',
      inputCost: '输入费用',
      outputCost: '输出费用',
      disclaimer: '* Token 数为近似值（英文约 4 个字符一个 Token）。实际分词因模型而异。价格为基于公开 API 定价的估算。',
      seoTitle: '关于 AI Token 计数器',
      seoContent: 'Token 是 AI 语言模型处理文本的基本单位。此工具可估算 GPT-4、Claude、Gemini、Llama 等流行模型的文本 Token 数量，并计算各模型的大致 API 费用。适用于优化提示词、估算 API 成本和控制上下文窗口限制。'
    }
  },
  fr: {
    'saml-decoder': { name: 'Décodeur SAML', description: 'Décoder et inspecter les réponses et requêtes SAML', pageTitle: 'Décodeur SAML en ligne gratuit — Décoder réponse et requête SAML', pageDescription: 'Décodez les réponses et requêtes SAML encodées en Base64 en XML lisible. Déboguez les jetons d\'authentification SSO.' },
    'wifi-qr-generator': { name: 'Générateur QR Code WiFi', description: 'Générer des codes QR pour partager le WiFi', pageTitle: 'Générateur QR Code WiFi — Partagez votre WiFi gratuitement', pageDescription: 'Générez un code QR pour votre réseau WiFi. Les invités scannent pour se connecter instantanément.' },
    'xpath-tester': { name: 'Testeur XPath', description: 'Tester et évaluer des expressions XPath sur XML', pageTitle: 'Testeur XPath en ligne — Évaluer des expressions XPath', pageDescription: 'Testez des expressions XPath sur vos données XML en temps réel. Évaluateur XPath gratuit en ligne.' },
    'toml-json': { name: 'Convertisseur TOML ↔ JSON', description: 'Convertir entre les formats TOML et JSON', pageTitle: 'Convertisseur TOML vers JSON en ligne gratuit', pageDescription: 'Convertissez TOML en JSON et JSON en TOML en ligne gratuitement.' },
    'protobuf-decoder': { name: 'Décodeur Protobuf', description: 'Décoder les données binaires Protocol Buffers', pageTitle: 'Décodeur Protobuf en ligne gratuit', pageDescription: 'Décodez les données binaires Protocol Buffers sans fichier .proto.' },
    'ai-token-counter': { name: 'Compteur de Tokens IA', description: 'Compter les tokens et estimer les coûts API', pageTitle: 'Compteur de Tokens IA — GPT, Claude, Gemini', pageDescription: 'Comptez les tokens et estimez les coûts API pour GPT-4, Claude, Gemini et d\'autres modèles IA.' }
  },
  de: {
    'saml-decoder': { name: 'SAML Decoder', description: 'SAML-Antworten und -Anfragen dekodieren', pageTitle: 'SAML Decoder Online Kostenlos — SAML dekodieren', pageDescription: 'Dekodieren Sie Base64-kodierte SAML-Antworten und -Anfragen in lesbares XML.' },
    'wifi-qr-generator': { name: 'WLAN QR-Code Generator', description: 'QR-Codes für WLAN-Netzwerke generieren', pageTitle: 'WLAN QR-Code Generator — WLAN per QR-Code teilen', pageDescription: 'Generieren Sie einen QR-Code für Ihr WLAN-Netzwerk. Gäste scannen und verbinden sich sofort.' },
    'xpath-tester': { name: 'XPath Tester', description: 'XPath-Ausdrücke gegen XML testen', pageTitle: 'XPath Tester Online — XPath-Ausdrücke auswerten', pageDescription: 'Testen Sie XPath-Ausdrücke gegen Ihre XML-Daten in Echtzeit.' },
    'toml-json': { name: 'TOML ↔ JSON Konverter', description: 'Zwischen TOML und JSON konvertieren', pageTitle: 'TOML zu JSON Konverter Online Kostenlos', pageDescription: 'Konvertieren Sie TOML zu JSON und JSON zu TOML online kostenlos.' },
    'protobuf-decoder': { name: 'Protobuf Decoder', description: 'Protocol Buffers Binärdaten dekodieren', pageTitle: 'Protobuf Decoder Online Kostenlos', pageDescription: 'Dekodieren Sie Protocol Buffers Binärdaten ohne .proto Schema-Datei.' },
    'ai-token-counter': { name: 'KI Token Zähler', description: 'Tokens zählen und API-Kosten schätzen', pageTitle: 'KI Token Zähler — GPT, Claude, Gemini', pageDescription: 'Zählen Sie Tokens und schätzen Sie API-Kosten für GPT-4, Claude, Gemini und andere KI-Modelle.' }
  },
  it: {
    'saml-decoder': { name: 'Decodificatore SAML', description: 'Decodifica e ispeziona risposte e richieste SAML', pageTitle: 'Decodificatore SAML Online Gratuito', pageDescription: 'Decodifica le risposte e richieste SAML codificate in Base64 in XML leggibile.' },
    'wifi-qr-generator': { name: 'Generatore QR Code WiFi', description: 'Genera codici QR per la condivisione WiFi', pageTitle: 'Generatore QR Code WiFi — Condividi WiFi con QR Code', pageDescription: 'Genera un codice QR per la tua rete WiFi. Gli ospiti scansionano per connettersi istantaneamente.' },
    'xpath-tester': { name: 'Tester XPath', description: 'Testa e valuta espressioni XPath su XML', pageTitle: 'Tester XPath Online — Valuta espressioni XPath', pageDescription: 'Testa espressioni XPath sui tuoi dati XML in tempo reale.' },
    'toml-json': { name: 'Convertitore TOML ↔ JSON', description: 'Converti tra formati TOML e JSON', pageTitle: 'Convertitore TOML in JSON Online Gratuito', pageDescription: 'Converti TOML in JSON e JSON in TOML online gratuitamente.' },
    'protobuf-decoder': { name: 'Decodificatore Protobuf', description: 'Decodifica dati binari Protocol Buffers', pageTitle: 'Decodificatore Protobuf Online Gratuito', pageDescription: 'Decodifica dati binari Protocol Buffers senza file .proto.' },
    'ai-token-counter': { name: 'Contatore Token IA', description: 'Conta token e stima costi API', pageTitle: 'Contatore Token IA — GPT, Claude, Gemini', pageDescription: 'Conta i token e stima i costi API per GPT-4, Claude, Gemini e altri modelli IA.' }
  },
  es: {
    'saml-decoder': { name: 'Decodificador SAML', description: 'Decodificar e inspeccionar respuestas y solicitudes SAML', pageTitle: 'Decodificador SAML Online Gratis', pageDescription: 'Decodifique respuestas y solicitudes SAML codificadas en Base64 a XML legible.' },
    'wifi-qr-generator': { name: 'Generador de Código QR WiFi', description: 'Generar códigos QR para compartir WiFi', pageTitle: 'Generador de Código QR WiFi — Comparte WiFi con QR', pageDescription: 'Genera un código QR para tu red WiFi. Los invitados escanean para conectarse al instante.' },
    'xpath-tester': { name: 'Probador XPath', description: 'Probar y evaluar expresiones XPath en XML', pageTitle: 'Probador XPath Online — Evaluar expresiones XPath', pageDescription: 'Pruebe expresiones XPath contra sus datos XML en tiempo real.' },
    'toml-json': { name: 'Convertidor TOML ↔ JSON', description: 'Convertir entre formatos TOML y JSON', pageTitle: 'Convertidor TOML a JSON Online Gratis', pageDescription: 'Convierta TOML a JSON y JSON a TOML en línea gratis.' },
    'protobuf-decoder': { name: 'Decodificador Protobuf', description: 'Decodificar datos binarios Protocol Buffers', pageTitle: 'Decodificador Protobuf Online Gratis', pageDescription: 'Decodifique datos binarios Protocol Buffers sin archivo .proto.' },
    'ai-token-counter': { name: 'Contador de Tokens IA', description: 'Contar tokens y estimar costos de API', pageTitle: 'Contador de Tokens IA — GPT, Claude, Gemini', pageDescription: 'Cuente tokens y estime costos de API para GPT-4, Claude, Gemini y otros modelos IA.' }
  },
  pt: {
    'saml-decoder': { name: 'Decodificador SAML', description: 'Decodificar e inspecionar respostas e pedidos SAML', pageTitle: 'Decodificador SAML Online Grátis', pageDescription: 'Decodifique respostas e pedidos SAML codificados em Base64 para XML legível.' },
    'wifi-qr-generator': { name: 'Gerador de QR Code WiFi', description: 'Gerar códigos QR para partilha de WiFi', pageTitle: 'Gerador de QR Code WiFi — Partilhe WiFi com QR Code', pageDescription: 'Gere um código QR para a sua rede WiFi. Os convidados digitalizam para se ligarem instantaneamente.' },
    'xpath-tester': { name: 'Testador XPath', description: 'Testar e avaliar expressões XPath em XML', pageTitle: 'Testador XPath Online — Avaliar expressões XPath', pageDescription: 'Teste expressões XPath nos seus dados XML em tempo real.' },
    'toml-json': { name: 'Conversor TOML ↔ JSON', description: 'Converter entre formatos TOML e JSON', pageTitle: 'Conversor TOML para JSON Online Grátis', pageDescription: 'Converta TOML para JSON e JSON para TOML online gratuitamente.' },
    'protobuf-decoder': { name: 'Decodificador Protobuf', description: 'Decodificar dados binários Protocol Buffers', pageTitle: 'Decodificador Protobuf Online Grátis', pageDescription: 'Decodifique dados binários Protocol Buffers sem ficheiro .proto.' },
    'ai-token-counter': { name: 'Contador de Tokens IA', description: 'Contar tokens e estimar custos de API', pageTitle: 'Contador de Tokens IA — GPT, Claude, Gemini', pageDescription: 'Conte tokens e estime custos de API para GPT-4, Claude, Gemini e outros modelos IA.' }
  },
  nl: {
    'saml-decoder': { name: 'SAML Decoder', description: 'SAML-antwoorden en -verzoeken decoderen', pageTitle: 'SAML Decoder Online Gratis', pageDescription: 'Decodeer Base64-gecodeerde SAML-antwoorden en -verzoeken naar leesbare XML.' },
    'wifi-qr-generator': { name: 'WiFi QR-code Generator', description: 'QR-codes genereren voor WiFi-netwerken', pageTitle: 'WiFi QR-code Generator — Deel WiFi met QR-code', pageDescription: 'Genereer een QR-code voor uw WiFi-netwerk. Gasten scannen om direct verbinding te maken.' },
    'xpath-tester': { name: 'XPath Tester', description: 'XPath-expressies testen tegen XML', pageTitle: 'XPath Tester Online — XPath-expressies evalueren', pageDescription: 'Test XPath-expressies tegen uw XML-gegevens in realtime.' },
    'toml-json': { name: 'TOML ↔ JSON Converter', description: 'Converteren tussen TOML en JSON', pageTitle: 'TOML naar JSON Converter Online Gratis', pageDescription: 'Converteer TOML naar JSON en JSON naar TOML online gratis.' },
    'protobuf-decoder': { name: 'Protobuf Decoder', description: 'Protocol Buffers binaire gegevens decoderen', pageTitle: 'Protobuf Decoder Online Gratis', pageDescription: 'Decodeer Protocol Buffers binaire gegevens zonder .proto schema.' },
    'ai-token-counter': { name: 'AI Token Teller', description: 'Tokens tellen en API-kosten schatten', pageTitle: 'AI Token Teller — GPT, Claude, Gemini', pageDescription: 'Tel tokens en schat API-kosten voor GPT-4, Claude, Gemini en andere AI-modellen.' }
  },
  pl: {
    'saml-decoder': { name: 'Dekoder SAML', description: 'Dekoduj i sprawdź odpowiedzi i żądania SAML', pageTitle: 'Dekoder SAML Online Za Darmo', pageDescription: 'Dekoduj odpowiedzi i żądania SAML zakodowane w Base64 do czytelnego XML.' },
    'wifi-qr-generator': { name: 'Generator kodu QR WiFi', description: 'Generuj kody QR do udostępniania WiFi', pageTitle: 'Generator kodu QR WiFi — Udostępnij WiFi kodem QR', pageDescription: 'Wygeneruj kod QR dla swojej sieci WiFi. Goście skanują, aby połączyć się natychmiast.' },
    'xpath-tester': { name: 'Tester XPath', description: 'Testuj i ewaluuj wyrażenia XPath na XML', pageTitle: 'Tester XPath Online — Ewaluuj wyrażenia XPath', pageDescription: 'Testuj wyrażenia XPath na swoich danych XML w czasie rzeczywistym.' },
    'toml-json': { name: 'Konwerter TOML ↔ JSON', description: 'Konwertuj między formatami TOML i JSON', pageTitle: 'Konwerter TOML na JSON Online Za Darmo', pageDescription: 'Konwertuj TOML na JSON i JSON na TOML online za darmo.' },
    'protobuf-decoder': { name: 'Dekoder Protobuf', description: 'Dekoduj dane binarne Protocol Buffers', pageTitle: 'Dekoder Protobuf Online Za Darmo', pageDescription: 'Dekoduj dane binarne Protocol Buffers bez pliku schematu .proto.' },
    'ai-token-counter': { name: 'Licznik tokenów AI', description: 'Licz tokeny i szacuj koszty API', pageTitle: 'Licznik tokenów AI — GPT, Claude, Gemini', pageDescription: 'Licz tokeny i szacuj koszty API dla GPT-4, Claude, Gemini i innych modeli AI.' }
  },
  sv: {
    'saml-decoder': { name: 'SAML-avkodare', description: 'Avkoda och inspektera SAML-svar och -förfrågningar', pageTitle: 'SAML-avkodare Online Gratis', pageDescription: 'Avkoda Base64-kodade SAML-svar och -förfrågningar till läsbar XML.' },
    'wifi-qr-generator': { name: 'WiFi QR-kodgenerator', description: 'Generera QR-koder för WiFi-nätverk', pageTitle: 'WiFi QR-kodgenerator — Dela WiFi med QR-kod', pageDescription: 'Generera en QR-kod för ditt WiFi-nätverk. Gäster skannar för att ansluta direkt.' },
    'xpath-tester': { name: 'XPath-testare', description: 'Testa och utvärdera XPath-uttryck mot XML', pageTitle: 'XPath-testare Online — Utvärdera XPath-uttryck', pageDescription: 'Testa XPath-uttryck mot dina XML-data i realtid.' },
    'toml-json': { name: 'TOML ↔ JSON Konverterare', description: 'Konvertera mellan TOML och JSON', pageTitle: 'TOML till JSON Konverterare Online Gratis', pageDescription: 'Konvertera TOML till JSON och JSON till TOML online gratis.' },
    'protobuf-decoder': { name: 'Protobuf-avkodare', description: 'Avkoda Protocol Buffers binärdata', pageTitle: 'Protobuf-avkodare Online Gratis', pageDescription: 'Avkoda Protocol Buffers binärdata utan .proto schema.' },
    'ai-token-counter': { name: 'AI Token-räknare', description: 'Räkna tokens och uppskatta API-kostnader', pageTitle: 'AI Token-räknare — GPT, Claude, Gemini', pageDescription: 'Räkna tokens och uppskatta API-kostnader för GPT-4, Claude, Gemini och andra AI-modeller.' }
  },
  no: {
    'saml-decoder': { name: 'SAML-dekoder', description: 'Dekod og inspiser SAML-svar og -forespørsler', pageTitle: 'SAML-dekoder Online Gratis', pageDescription: 'Dekod Base64-kodede SAML-svar og -forespørsler til lesbar XML.' },
    'wifi-qr-generator': { name: 'WiFi QR-kodegenerator', description: 'Generer QR-koder for WiFi-nettverk', pageTitle: 'WiFi QR-kodegenerator — Del WiFi med QR-kode', pageDescription: 'Generer en QR-kode for WiFi-nettverket ditt. Gjester skanner for å koble seg til umiddelbart.' },
    'xpath-tester': { name: 'XPath-tester', description: 'Test og evaluer XPath-uttrykk mot XML', pageTitle: 'XPath-tester Online — Evaluer XPath-uttrykk', pageDescription: 'Test XPath-uttrykk mot XML-dataene dine i sanntid.' },
    'toml-json': { name: 'TOML ↔ JSON Konverterer', description: 'Konverter mellom TOML og JSON', pageTitle: 'TOML til JSON Konverterer Online Gratis', pageDescription: 'Konverter TOML til JSON og JSON til TOML online gratis.' },
    'protobuf-decoder': { name: 'Protobuf-dekoder', description: 'Dekod Protocol Buffers binærdata', pageTitle: 'Protobuf-dekoder Online Gratis', pageDescription: 'Dekod Protocol Buffers binærdata uten .proto skjema.' },
    'ai-token-counter': { name: 'AI Token-teller', description: 'Tell tokens og estimer API-kostnader', pageTitle: 'AI Token-teller — GPT, Claude, Gemini', pageDescription: 'Tell tokens og estimer API-kostnader for GPT-4, Claude, Gemini og andre AI-modeller.' }
  },
  ja: {
    'saml-decoder': { name: 'SAMLデコーダー', description: 'SAMLレスポンスとリクエストのデコードと検査', pageTitle: 'SAMLデコーダー オンライン無料 — SAMLレスポンス＆リクエストをデコード', pageDescription: 'Base64エンコードされたSAMLレスポンスとリクエストを読みやすいXMLにデコードします。' },
    'wifi-qr-generator': { name: 'WiFi QRコード生成器', description: 'WiFiネットワーク共有用QRコードを生成', pageTitle: 'WiFi QRコード生成器 — QRコードでWiFiを共有', pageDescription: 'WiFiネットワークのQRコードを生成。ゲストはスキャンして即座に接続できます。' },
    'xpath-tester': { name: 'XPathテスター', description: 'XMLに対するXPath式のテストと評価', pageTitle: 'XPathテスター オンライン — XPath式を評価', pageDescription: 'XMLデータに対するXPath式をリアルタイムでテスト。無料オンラインXPath評価ツール。' },
    'toml-json': { name: 'TOML ↔ JSON コンバーター', description: 'TOMLとJSON形式間の変換', pageTitle: 'TOML⇔JSON変換ツール オンライン無料', pageDescription: 'TOMLをJSONに、JSONをTOMLにオンラインで無料変換。' },
    'protobuf-decoder': { name: 'Protobufデコーダー', description: 'Protocol Buffersバイナリデータのデコード', pageTitle: 'Protobufデコーダー オンライン無料', pageDescription: '.protoスキーマなしでProtocol Buffersバイナリデータをデコード。' },
    'ai-token-counter': { name: 'AIトークンカウンター', description: 'トークン数をカウントしAPIコストを見積もり', pageTitle: 'AIトークンカウンター — GPT、Claude、Gemini', pageDescription: 'GPT-4、Claude、Gemini等のAIモデルのトークン数をカウントしAPIコストを見積もります。' }
  },
  ko: {
    'saml-decoder': { name: 'SAML 디코더', description: 'SAML 응답 및 요청 디코딩 및 검사', pageTitle: 'SAML 디코더 온라인 무료 — SAML 응답 및 요청 디코딩', pageDescription: 'Base64로 인코딩된 SAML 응답 및 요청을 읽기 쉬운 XML로 디코딩합니다.' },
    'wifi-qr-generator': { name: 'WiFi QR 코드 생성기', description: 'WiFi 네트워크 공유용 QR 코드 생성', pageTitle: 'WiFi QR 코드 생성기 — QR 코드로 WiFi 공유', pageDescription: 'WiFi 네트워크용 QR 코드를 생성하세요. 게스트가 스캔하여 즉시 연결할 수 있습니다.' },
    'xpath-tester': { name: 'XPath 테스터', description: 'XML에 대한 XPath 식 테스트 및 평가', pageTitle: 'XPath 테스터 온라인 — XPath 식 평가', pageDescription: 'XML 데이터에 대한 XPath 식을 실시간으로 테스트하세요.' },
    'toml-json': { name: 'TOML ↔ JSON 변환기', description: 'TOML과 JSON 형식 간 변환', pageTitle: 'TOML↔JSON 변환기 온라인 무료', pageDescription: 'TOML을 JSON으로, JSON을 TOML로 온라인에서 무료 변환.' },
    'protobuf-decoder': { name: 'Protobuf 디코더', description: 'Protocol Buffers 바이너리 데이터 디코딩', pageTitle: 'Protobuf 디코더 온라인 무료', pageDescription: '.proto 스키마 없이 Protocol Buffers 바이너리 데이터를 디코딩합니다.' },
    'ai-token-counter': { name: 'AI 토큰 카운터', description: '토큰 수 계산 및 API 비용 추정', pageTitle: 'AI 토큰 카운터 — GPT, Claude, Gemini', pageDescription: 'GPT-4, Claude, Gemini 등 AI 모델의 토큰 수를 계산하고 API 비용을 추정합니다.' }
  },
  id: {
    'saml-decoder': { name: 'Dekoder SAML', description: 'Dekode dan periksa respons dan permintaan SAML', pageTitle: 'Dekoder SAML Online Gratis', pageDescription: 'Dekode respons dan permintaan SAML yang dikodekan Base64 menjadi XML yang dapat dibaca.' },
    'wifi-qr-generator': { name: 'Generator Kode QR WiFi', description: 'Buat kode QR untuk berbagi WiFi', pageTitle: 'Generator Kode QR WiFi — Bagikan WiFi dengan Kode QR', pageDescription: 'Buat kode QR untuk jaringan WiFi Anda. Tamu memindai untuk terhubung secara instan.' },
    'xpath-tester': { name: 'Penguji XPath', description: 'Uji dan evaluasi ekspresi XPath pada XML', pageTitle: 'Penguji XPath Online — Evaluasi ekspresi XPath', pageDescription: 'Uji ekspresi XPath pada data XML Anda secara real-time.' },
    'toml-json': { name: 'Konverter TOML ↔ JSON', description: 'Konversi antara format TOML dan JSON', pageTitle: 'Konverter TOML ke JSON Online Gratis', pageDescription: 'Konversi TOML ke JSON dan JSON ke TOML secara online gratis.' },
    'protobuf-decoder': { name: 'Dekoder Protobuf', description: 'Dekode data biner Protocol Buffers', pageTitle: 'Dekoder Protobuf Online Gratis', pageDescription: 'Dekode data biner Protocol Buffers tanpa file skema .proto.' },
    'ai-token-counter': { name: 'Penghitung Token AI', description: 'Hitung token dan perkirakan biaya API', pageTitle: 'Penghitung Token AI — GPT, Claude, Gemini', pageDescription: 'Hitung token dan perkirakan biaya API untuk GPT-4, Claude, Gemini dan model AI lainnya.' }
  },
  th: {
    'saml-decoder': { name: 'ตัวถอดรหัส SAML', description: 'ถอดรหัสและตรวจสอบการตอบกลับและคำขอ SAML', pageTitle: 'ตัวถอดรหัส SAML ออนไลน์ฟรี', pageDescription: 'ถอดรหัสการตอบกลับและคำขอ SAML ที่เข้ารหัส Base64 เป็น XML ที่อ่านได้' },
    'wifi-qr-generator': { name: 'เครื่องสร้าง QR Code WiFi', description: 'สร้าง QR Code สำหรับแชร์ WiFi', pageTitle: 'เครื่องสร้าง QR Code WiFi — แชร์ WiFi ด้วย QR Code', pageDescription: 'สร้าง QR Code สำหรับเครือข่าย WiFi ของคุณ แขกสแกนเพื่อเชื่อมต่อทันที' },
    'xpath-tester': { name: 'ตัวทดสอบ XPath', description: 'ทดสอบและประเมินนิพจน์ XPath บน XML', pageTitle: 'ตัวทดสอบ XPath ออนไลน์ — ประเมินนิพจน์ XPath', pageDescription: 'ทดสอบนิพจน์ XPath กับข้อมูล XML ของคุณแบบเรียลไทม์' },
    'toml-json': { name: 'ตัวแปลง TOML ↔ JSON', description: 'แปลงระหว่างรูปแบบ TOML และ JSON', pageTitle: 'ตัวแปลง TOML เป็น JSON ออนไลน์ฟรี', pageDescription: 'แปลง TOML เป็น JSON และ JSON เป็น TOML ออนไลน์ฟรี' },
    'protobuf-decoder': { name: 'ตัวถอดรหัส Protobuf', description: 'ถอดรหัสข้อมูลไบนารี Protocol Buffers', pageTitle: 'ตัวถอดรหัส Protobuf ออนไลน์ฟรี', pageDescription: 'ถอดรหัสข้อมูลไบนารี Protocol Buffers โดยไม่ต้องใช้ไฟล์สคีมา .proto' },
    'ai-token-counter': { name: 'ตัวนับโทเค็น AI', description: 'นับโทเค็นและประมาณค่าใช้จ่าย API', pageTitle: 'ตัวนับโทเค็น AI — GPT, Claude, Gemini', pageDescription: 'นับโทเค็นและประมาณค่าใช้จ่าย API สำหรับ GPT-4, Claude, Gemini และโมเดล AI อื่นๆ' }
  }
};

// Process each language file
for (const [locale, tools] of Object.entries(toolTranslations)) {
  const filePath = path.join(dictDir, `${locale}.json`);
  if (!fs.existsSync(filePath)) {
    console.log(`Skipping ${locale}: file not found`);
    continue;
  }

  const content = fs.readFileSync(filePath, 'utf8');
  const dict = JSON.parse(content);

  for (const [toolId, translations] of Object.entries(tools)) {
    if (!dict.tools) dict.tools = {};
    // Only add if not already present
    if (!dict.tools[toolId]) {
      dict.tools[toolId] = translations;
      console.log(`Added ${toolId} to ${locale}`);
    } else {
      // Merge new keys
      dict.tools[toolId] = { ...dict.tools[toolId], ...translations };
      console.log(`Updated ${toolId} in ${locale}`);
    }
  }

  fs.writeFileSync(filePath, JSON.stringify(dict, null, 2) + '\n', 'utf8');
}

console.log('Done! All translations added.');
