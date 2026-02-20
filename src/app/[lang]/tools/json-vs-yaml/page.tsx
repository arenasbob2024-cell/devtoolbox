'use client';

import Link from 'next/link';
import { useLang } from '@/i18n/LangContext';
import ToolLayout from '@/components/ToolLayout';

const t: Record<string, Record<string, string>> = {
  en: {
    title: 'JSON vs YAML',
    description: 'A detailed comparison of JSON and YAML data formats to help you choose the right one for your project.',
    intro: 'JSON and YAML are two popular data serialization formats. JSON is the dominant format for APIs and web data exchange, while YAML is preferred for configuration files due to its readability. Here are their key differences.',
    tableFeature: 'Feature', tableJson: 'JSON', tableYaml: 'YAML',
    syntax: 'Syntax', synJson: 'Braces and brackets {}[]', synYaml: 'Indentation-based',
    comments: 'Comments', comJson: 'Not supported', comYaml: 'Supported (#)',
    readability: 'Readability', readJson: 'Moderate', readYaml: 'Excellent',
    dataTypes: 'Data Types', dtJson: 'String, Number, Boolean, Null, Array, Object', dtYaml: 'All JSON types + Date, Binary, etc.',
    fileSize: 'File Size', fsJson: 'Slightly larger (quotes, braces)', fsYaml: 'Smaller (no quotes/braces needed)',
    parsing: 'Parsing Speed', psJson: 'Very fast', psYaml: 'Slower (complex grammar)',
    useCase: 'Primary Use', ucJson: 'APIs, web data, configs', ucYaml: 'Config files, CI/CD, Kubernetes',
    whatIsJson: 'What is JSON?',
    jsonText: 'JSON (JavaScript Object Notation) is a lightweight data interchange format. It uses key-value pairs with curly braces for objects and square brackets for arrays. JSON is language-independent, human-readable, and natively supported by JavaScript. It has become the standard for REST APIs and web data exchange.',
    whatIsYaml: 'What is YAML?',
    yamlText: 'YAML (YAML Ain\'t Markup Language) is a human-readable data serialization format. It uses indentation instead of brackets and supports comments with #. YAML is a superset of JSON, meaning any valid JSON is also valid YAML. It is widely used for configuration files (Docker Compose, Kubernetes, GitHub Actions, Ansible).',
    whenJson: 'When to Use JSON',
    jsonUse1: 'REST API request/response payloads',
    jsonUse2: 'Web application data exchange',
    jsonUse3: 'Package manifests (package.json, tsconfig.json)',
    jsonUse4: 'Data storage and databases (MongoDB, CouchDB)',
    jsonUse5: 'When parsing speed is critical',
    whenYaml: 'When to Use YAML',
    yamlUse1: 'Docker Compose configuration',
    yamlUse2: 'Kubernetes manifests',
    yamlUse3: 'GitHub Actions / CI/CD pipelines',
    yamlUse4: 'Ansible playbooks',
    yamlUse5: 'Configuration files that need comments',
    verdict: 'TL;DR / Verdict',
    verdictText: 'Use JSON for APIs and data exchange where parsing speed matters. Use YAML for configuration files where readability and comments are valuable. YAML is a superset of JSON, so you can always convert between them.',
    tryTools: 'Try Our Format Tools',
    faqTitle: 'Frequently Asked Questions',
    faq1q: 'Is YAML a superset of JSON?',
    faq1a: 'Yes, YAML 1.2 is a superset of JSON, meaning any valid JSON document is also a valid YAML document. However, YAML supports additional features like comments, anchors, aliases, and more data types that JSON does not support.',
    faq2q: 'Which is faster to parse: JSON or YAML?',
    faq2a: 'JSON is significantly faster to parse than YAML. JSON has a simpler grammar with fewer rules, making parsers more efficient. YAML\'s indentation-based syntax and complex features make parsing more computationally expensive.',
    faq3q: 'Can I use comments in JSON?',
    faq3a: 'Standard JSON (RFC 8259) does not support comments. Some tools like JSON5 and JSONC (used in VS Code settings) add comment support, but these are non-standard extensions. If you need comments, YAML or TOML may be better choices.',
  },
  zh: {
    title: 'JSON vs YAML',
    description: 'JSON 与 YAML 数据格式的详细对比，帮助你选择合适的格式。',
    intro: 'JSON 和 YAML 是两种流行的数据序列化格式。JSON 是 API 和 Web 数据交换的主流格式，YAML 因可读性好而被用于配置文件。',
    tableFeature: '特性', tableJson: 'JSON', tableYaml: 'YAML',
    syntax: '语法', synJson: '花括号和方括号 {}[]', synYaml: '基于缩进',
    comments: '注释', comJson: '不支持', comYaml: '支持（#）',
    readability: '可读性', readJson: '中等', readYaml: '优秀',
    dataTypes: '数据类型', dtJson: '字符串、数字、布尔、空值、数组、对象', dtYaml: '所有 JSON 类型 + 日期、二进制等',
    fileSize: '文件大小', fsJson: '稍大（引号、花括号）', fsYaml: '更小（无需引号/花括号）',
    parsing: '解析速度', psJson: '非常快', psYaml: '较慢（复杂语法）',
    useCase: '主要用途', ucJson: 'API、Web 数据、配置', ucYaml: '配置文件、CI/CD、K8s',
    whatIsJson: '什么是 JSON？', jsonText: 'JSON 是轻量级数据交换格式，使用键值对。已成为 REST API 和 Web 数据交换的标准。',
    whatIsYaml: '什么是 YAML？', yamlText: 'YAML 使用缩进而非括号，支持注释。是 JSON 的超集，广泛用于配置文件。',
    whenJson: '何时使用 JSON', jsonUse1: 'REST API 请求/响应', jsonUse2: 'Web 数据交换', jsonUse3: '包清单文件', jsonUse4: '数据存储', jsonUse5: '需要快速解析时',
    whenYaml: '何时使用 YAML', yamlUse1: 'Docker Compose 配置', yamlUse2: 'Kubernetes 清单', yamlUse3: 'CI/CD 管道', yamlUse4: 'Ansible 剧本', yamlUse5: '需要注释的配置文件',
    verdict: '总结', verdictText: 'API 和数据交换用 JSON。配置文件用 YAML。两者可以互相转换。',
    tryTools: '试试我们的格式化工具',
    faqTitle: '常见问题',
    faq1q: 'YAML 是 JSON 的超集吗？', faq1a: '是的，YAML 1.2 是 JSON 的超集，任何有效的 JSON 也是有效的 YAML。',
    faq2q: 'JSON 和 YAML 哪个解析更快？', faq2a: 'JSON 解析显著快于 YAML，因为语法更简单。',
    faq3q: 'JSON 可以使用注释吗？', faq3a: '标准 JSON 不支持注释。JSON5 和 JSONC 添加了注释支持，但这些是非标准扩展。',
  },
  fr: {
    title: 'JSON vs YAML', description: 'Comparaison de JSON et YAML.',
    intro: 'JSON et YAML sont deux formats de serialisation populaires.', tableFeature: 'Caracteristique', tableJson: 'JSON', tableYaml: 'YAML',
    syntax: 'Syntaxe', synJson: 'Accolades et crochets {}[]', synYaml: 'Basee sur l\'indentation', comments: 'Commentaires', comJson: 'Non supportes', comYaml: 'Supportes (#)', readability: 'Lisibilite', readJson: 'Moderee', readYaml: 'Excellente', dataTypes: 'Types de donnees', dtJson: 'String, Number, Boolean, Null, Array, Object', dtYaml: 'Tous les types JSON + Date, Binary', fileSize: 'Taille', fsJson: 'Legerement plus grand', fsYaml: 'Plus petit', parsing: 'Vitesse de parsing', psJson: 'Tres rapide', psYaml: 'Plus lent', useCase: 'Utilisation', ucJson: 'APIs, donnees web', ucYaml: 'Fichiers de config, CI/CD, K8s',
    whatIsJson: 'Qu\'est-ce que JSON ?', jsonText: 'JSON est un format d\'echange de donnees leger, standard pour les APIs REST.', whatIsYaml: 'Qu\'est-ce que YAML ?', yamlText: 'YAML utilise l\'indentation au lieu des accolades et supporte les commentaires.',
    whenJson: 'Quand utiliser JSON', jsonUse1: 'APIs REST', jsonUse2: 'Echange de donnees web', jsonUse3: 'Manifestes de paquets', jsonUse4: 'Stockage de donnees', jsonUse5: 'Parsing rapide requis',
    whenYaml: 'Quand utiliser YAML', yamlUse1: 'Docker Compose', yamlUse2: 'Kubernetes', yamlUse3: 'CI/CD', yamlUse4: 'Ansible', yamlUse5: 'Configs avec commentaires',
    verdict: 'Resume', verdictText: 'JSON pour les APIs. YAML pour les fichiers de configuration.', tryTools: 'Essayez nos outils de formatage', faqTitle: 'Questions frequentes',
    faq1q: 'YAML est-il un sur-ensemble de JSON ?', faq1a: 'Oui, YAML 1.2 est un sur-ensemble de JSON.', faq2q: 'JSON ou YAML, lequel est plus rapide ?', faq2a: 'JSON est significativement plus rapide a parser.', faq3q: 'Peut-on utiliser des commentaires en JSON ?', faq3a: 'Le JSON standard ne supporte pas les commentaires.',
  },
  de: {
    title: 'JSON vs YAML', description: 'Vergleich von JSON und YAML.',
    intro: 'JSON und YAML sind zwei populaere Serialisierungsformate.', tableFeature: 'Eigenschaft', tableJson: 'JSON', tableYaml: 'YAML',
    syntax: 'Syntax', synJson: 'Klammern {}[]', synYaml: 'Einrueckungsbasiert', comments: 'Kommentare', comJson: 'Nicht unterstuetzt', comYaml: 'Unterstuetzt (#)', readability: 'Lesbarkeit', readJson: 'Mittel', readYaml: 'Ausgezeichnet', dataTypes: 'Datentypen', dtJson: 'String, Number, Boolean, Null, Array, Object', dtYaml: 'Alle JSON-Typen + Datum, Binaer', fileSize: 'Dateigroesse', fsJson: 'Etwas groesser', fsYaml: 'Kleiner', parsing: 'Parsing-Geschwindigkeit', psJson: 'Sehr schnell', psYaml: 'Langsamer', useCase: 'Verwendung', ucJson: 'APIs, Web-Daten', ucYaml: 'Config-Dateien, CI/CD, K8s',
    whatIsJson: 'Was ist JSON?', jsonText: 'JSON ist ein leichtgewichtiges Datenaustauschformat, Standard fuer REST APIs.', whatIsYaml: 'Was ist YAML?', yamlText: 'YAML verwendet Einrueckung statt Klammern und unterstuetzt Kommentare.',
    whenJson: 'Wann JSON verwenden', jsonUse1: 'REST APIs', jsonUse2: 'Web-Datenaustausch', jsonUse3: 'Paketmanifeste', jsonUse4: 'Datenspeicherung', jsonUse5: 'Schnelles Parsing erforderlich',
    whenYaml: 'Wann YAML verwenden', yamlUse1: 'Docker Compose', yamlUse2: 'Kubernetes', yamlUse3: 'CI/CD', yamlUse4: 'Ansible', yamlUse5: 'Configs mit Kommentaren',
    verdict: 'Fazit', verdictText: 'JSON fuer APIs. YAML fuer Konfigurationsdateien.', tryTools: 'Probieren Sie unsere Formatierungstools', faqTitle: 'Haeufig gestellte Fragen',
    faq1q: 'Ist YAML eine Obermenge von JSON?', faq1a: 'Ja, YAML 1.2 ist eine Obermenge von JSON.', faq2q: 'JSON oder YAML, was ist schneller?', faq2a: 'JSON ist deutlich schneller zu parsen.', faq3q: 'Kann man Kommentare in JSON verwenden?', faq3a: 'Standard-JSON unterstuetzt keine Kommentare.',
  },
  es: {
    title: 'JSON vs YAML', description: 'Comparacion de JSON y YAML.',
    intro: 'JSON y YAML son dos formatos de serializacion populares.', tableFeature: 'Caracteristica', tableJson: 'JSON', tableYaml: 'YAML',
    syntax: 'Sintaxis', synJson: 'Llaves y corchetes {}[]', synYaml: 'Basada en indentacion', comments: 'Comentarios', comJson: 'No soportados', comYaml: 'Soportados (#)', readability: 'Legibilidad', readJson: 'Moderada', readYaml: 'Excelente', dataTypes: 'Tipos de datos', dtJson: 'String, Number, Boolean, Null, Array, Object', dtYaml: 'Todos los tipos JSON + Date, Binary', fileSize: 'Tamano', fsJson: 'Ligeramente mayor', fsYaml: 'Menor', parsing: 'Velocidad de analisis', psJson: 'Muy rapida', psYaml: 'Mas lenta', useCase: 'Uso', ucJson: 'APIs, datos web', ucYaml: 'Archivos de config, CI/CD, K8s',
    whatIsJson: 'Que es JSON?', jsonText: 'JSON es un formato ligero de intercambio de datos, estandar para APIs REST.', whatIsYaml: 'Que es YAML?', yamlText: 'YAML usa indentacion en lugar de llaves y soporta comentarios.',
    whenJson: 'Cuando usar JSON', jsonUse1: 'APIs REST', jsonUse2: 'Intercambio de datos web', jsonUse3: 'Manifiestos de paquetes', jsonUse4: 'Almacenamiento de datos', jsonUse5: 'Parsing rapido requerido',
    whenYaml: 'Cuando usar YAML', yamlUse1: 'Docker Compose', yamlUse2: 'Kubernetes', yamlUse3: 'CI/CD', yamlUse4: 'Ansible', yamlUse5: 'Configs con comentarios',
    verdict: 'Resumen', verdictText: 'JSON para APIs. YAML para archivos de configuracion.', tryTools: 'Prueba nuestras herramientas de formato', faqTitle: 'Preguntas frecuentes',
    faq1q: 'YAML es un superconjunto de JSON?', faq1a: 'Si, YAML 1.2 es un superconjunto de JSON.', faq2q: 'JSON o YAML, cual es mas rapido?', faq2a: 'JSON es significativamente mas rapido de analizar.', faq3q: 'Se pueden usar comentarios en JSON?', faq3a: 'El JSON estandar no soporta comentarios.',
  },
  ja: {
    title: 'JSON vs YAML', description: 'JSONとYAMLの詳細な比較。',
    intro: 'JSONとYAMLは2つの人気のあるデータシリアライゼーション形式です。', tableFeature: '特性', tableJson: 'JSON', tableYaml: 'YAML',
    syntax: '構文', synJson: '波括弧と角括弧 {}[]', synYaml: 'インデントベース', comments: 'コメント', comJson: '非対応', comYaml: '対応（#）', readability: '可読性', readJson: '普通', readYaml: '優秀', dataTypes: 'データ型', dtJson: 'String, Number, Boolean, Null, Array, Object', dtYaml: '全JSON型 + Date, Binaryなど', fileSize: 'ファイルサイズ', fsJson: 'やや大きい', fsYaml: '小さい', parsing: 'パース速度', psJson: '非常に速い', psYaml: '遅い', useCase: '用途', ucJson: 'API、Webデータ', ucYaml: '設定ファイル、CI/CD、K8s',
    whatIsJson: 'JSONとは？', jsonText: 'JSONは軽量なデータ交換フォーマットで、REST APIの標準です。', whatIsYaml: 'YAMLとは？', yamlText: 'YAMLはインデントベースの構文でコメントをサポートします。',
    whenJson: 'JSONを使う場合', jsonUse1: 'REST API', jsonUse2: 'Webデータ交換', jsonUse3: 'パッケージマニフェスト', jsonUse4: 'データストレージ', jsonUse5: '高速パースが必要な時',
    whenYaml: 'YAMLを使う場合', yamlUse1: 'Docker Compose', yamlUse2: 'Kubernetes', yamlUse3: 'CI/CD', yamlUse4: 'Ansible', yamlUse5: 'コメントが必要な設定',
    verdict: 'まとめ', verdictText: 'APIにはJSON。設定ファイルにはYAML。', tryTools: 'フォーマットツールを試す', faqTitle: 'よくある質問',
    faq1q: 'YAMLはJSONのスーパーセットですか？', faq1a: 'はい、YAML 1.2はJSONのスーパーセットです。', faq2q: 'JSONとYAML、どちらが速いですか？', faq2a: 'JSONのパースはYAMLより大幅に速いです。', faq3q: 'JSONでコメントは使えますか？', faq3a: '標準JSONはコメントをサポートしていません。',
  },
  ko: {
    title: 'JSON vs YAML', description: 'JSON과 YAML의 상세 비교.',
    intro: 'JSON과 YAML은 두 가지 인기 있는 데이터 직렬화 형식입니다.', tableFeature: '특성', tableJson: 'JSON', tableYaml: 'YAML',
    syntax: '구문', synJson: '중괄호와 대괄호 {}[]', synYaml: '들여쓰기 기반', comments: '주석', comJson: '미지원', comYaml: '지원 (#)', readability: '가독성', readJson: '보통', readYaml: '우수', dataTypes: '데이터 유형', dtJson: 'String, Number, Boolean, Null, Array, Object', dtYaml: '모든 JSON 유형 + Date, Binary 등', fileSize: '파일 크기', fsJson: '약간 더 큼', fsYaml: '더 작음', parsing: '파싱 속도', psJson: '매우 빠름', psYaml: '느림', useCase: '용도', ucJson: 'API, 웹 데이터', ucYaml: '설정 파일, CI/CD, K8s',
    whatIsJson: 'JSON이란?', jsonText: 'JSON은 경량 데이터 교환 형식으로 REST API의 표준입니다.', whatIsYaml: 'YAML이란?', yamlText: 'YAML은 들여쓰기 기반 구문을 사용하고 주석을 지원합니다.',
    whenJson: 'JSON을 사용할 때', jsonUse1: 'REST API', jsonUse2: '웹 데이터 교환', jsonUse3: '패키지 매니페스트', jsonUse4: '데이터 저장', jsonUse5: '빠른 파싱이 필요할 때',
    whenYaml: 'YAML을 사용할 때', yamlUse1: 'Docker Compose', yamlUse2: 'Kubernetes', yamlUse3: 'CI/CD', yamlUse4: 'Ansible', yamlUse5: '주석이 필요한 설정',
    verdict: '요약', verdictText: 'API에는 JSON. 설정 파일에는 YAML.', tryTools: '포맷 도구 사용해보기', faqTitle: '자주 묻는 질문',
    faq1q: 'YAML은 JSON의 상위 집합인가요?', faq1a: '네, YAML 1.2는 JSON의 상위 집합입니다.', faq2q: 'JSON과 YAML 중 어떤 것이 더 빠른가요?', faq2a: 'JSON 파싱이 YAML보다 훨씬 빠릅니다.', faq3q: 'JSON에서 주석을 사용할 수 있나요?', faq3a: '표준 JSON은 주석을 지원하지 않습니다.',
  },
};

const tableStyle = { width: '100%', borderCollapse: 'collapse' as const, fontSize: 14 };
const thStyle = { padding: '10px 14px', textAlign: 'left' as const, borderBottom: '2px solid var(--border-color)', fontWeight: 700 };
const tdStyle = { padding: '10px 14px', borderBottom: '1px solid var(--border-color)' };
const sectionStyle = { marginTop: 32 };
const h2Style = { fontSize: 22, fontWeight: 700, marginBottom: 12 };
const h3Style = { fontSize: 17, fontWeight: 600, marginBottom: 8 };
const pStyle = { fontSize: 14, lineHeight: 1.8, color: 'var(--text-secondary)', marginBottom: 16 };
const ulStyle = { fontSize: 14, lineHeight: 1.8, color: 'var(--text-secondary)', paddingLeft: 20, marginBottom: 16 };
const cardStyle = { background: 'var(--bg-card)', borderRadius: 12, padding: 20, border: '1px solid var(--border-color)', marginBottom: 16 };

export default function JsonVsYaml() {
  const { lang } = useLang();
  const ui = t[lang] || t.en;
  const faqSchema = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: [
    { '@type': 'Question', name: ui.faq1q, acceptedAnswer: { '@type': 'Answer', text: ui.faq1a } },
    { '@type': 'Question', name: ui.faq2q, acceptedAnswer: { '@type': 'Answer', text: ui.faq2a } },
    { '@type': 'Question', name: ui.faq3q, acceptedAnswer: { '@type': 'Answer', text: ui.faq3a } },
  ]};
  return (
    <ToolLayout title={ui.title} description={ui.description} toolId="json-vs-yaml">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <p style={pStyle}>{ui.intro}</p>
      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={tableStyle}><thead><tr><th style={thStyle}>{ui.tableFeature}</th><th style={thStyle}>{ui.tableJson}</th><th style={thStyle}>{ui.tableYaml}</th></tr></thead>
          <tbody>{[[ui.syntax,ui.synJson,ui.synYaml],[ui.comments,ui.comJson,ui.comYaml],[ui.readability,ui.readJson,ui.readYaml],[ui.dataTypes,ui.dtJson,ui.dtYaml],[ui.fileSize,ui.fsJson,ui.fsYaml],[ui.parsing,ui.psJson,ui.psYaml],[ui.useCase,ui.ucJson,ui.ucYaml]].map(([f,a,b],i)=>(<tr key={i}><td style={{...tdStyle,fontWeight:600}}>{f}</td><td style={tdStyle}>{a}</td><td style={tdStyle}>{b}</td></tr>))}</tbody>
        </table>
      </div>
      <div style={sectionStyle}><h2 style={h2Style}>{ui.whatIsJson}</h2><p style={pStyle}>{ui.jsonText}</p></div>
      <div style={sectionStyle}><h2 style={h2Style}>{ui.whatIsYaml}</h2><p style={pStyle}>{ui.yamlText}</p></div>
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))',gap:16,...sectionStyle}}>
        <div style={cardStyle}><h3 style={h3Style}>{ui.whenJson}</h3><ul style={ulStyle}><li>{ui.jsonUse1}</li><li>{ui.jsonUse2}</li><li>{ui.jsonUse3}</li><li>{ui.jsonUse4}</li><li>{ui.jsonUse5}</li></ul></div>
        <div style={cardStyle}><h3 style={h3Style}>{ui.whenYaml}</h3><ul style={ulStyle}><li>{ui.yamlUse1}</li><li>{ui.yamlUse2}</li><li>{ui.yamlUse3}</li><li>{ui.yamlUse4}</li><li>{ui.yamlUse5}</li></ul></div>
      </div>
      <div style={{...cardStyle,background:'var(--bg-input)',...sectionStyle}}><h2 style={h2Style}>{ui.verdict}</h2><p style={{...pStyle,fontWeight:500}}>{ui.verdictText}</p></div>
      <div style={sectionStyle}><h2 style={h2Style}>{ui.tryTools}</h2>
        <div style={{display:'flex',flexWrap:'wrap',gap:8}}>
          {[{href:`/${lang}/tools/json-formatter`,label:'JSON Formatter'},{href:`/${lang}/tools/yaml-validator`,label:'YAML Validator'},{href:`/${lang}/tools/json-yaml`,label:'JSON ↔ YAML'},{href:`/${lang}/tools/yaml-json-converter`,label:'YAML-JSON Converter'}].map(link=>(<Link key={link.href} href={link.href} style={{display:'inline-block',padding:'8px 16px',borderRadius:8,border:'1px solid var(--border-color)',fontSize:13,color:'var(--accent-blue)',textDecoration:'none',background:'var(--bg-input)'}}>{link.label}</Link>))}
        </div>
      </div>
      <div style={sectionStyle}><h2 style={h2Style}>{ui.faqTitle}</h2>
        <div style={{display:'flex',flexDirection:'column',gap:8}}>
          {[{q:ui.faq1q,a:ui.faq1a},{q:ui.faq2q,a:ui.faq2a},{q:ui.faq3q,a:ui.faq3a}].map((faq,idx)=>(<details key={idx} style={{border:'1px solid var(--border-color)',borderRadius:8,overflow:'hidden',background:'var(--bg-input)'}}><summary style={{padding:'14px 16px',cursor:'pointer',fontSize:14,fontWeight:600}}>{faq.q}</summary><div style={{padding:'0 16px 14px',fontSize:13,lineHeight:1.7,color:'var(--text-secondary)'}}>{faq.a}</div></details>))}
        </div>
      </div>
    </ToolLayout>
  );
}
