'use client';

import { useState } from 'react';
import yaml from 'js-yaml';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import Link from 'next/link';
import { useLang } from '@/i18n/LangContext';

const sampleYaml = `# Kubernetes Deployment
apiVersion: apps/v1
kind: Deployment
metadata:
  name: web-app
  labels:
    app: web
    environment: production
spec:
  replicas: 3
  selector:
    matchLabels:
      app: web
  template:
    metadata:
      labels:
        app: web
    spec:
      containers:
        - name: web
          image: nginx:1.25
          ports:
            - containerPort: 80
          env:
            - name: NODE_ENV
              value: production
            - name: LOG_LEVEL
              value: info
          resources:
            limits:
              cpu: "500m"
              memory: "256Mi"
            requests:
              cpu: "100m"
              memory: "128Mi"`;

const ui: Record<string, Record<string, string>> = {
  en: {
    title: 'YAML to JSON Converter',
    description: 'Convert YAML to JSON online. Paste your YAML configuration and get clean, formatted JSON output instantly.',
    inputLabel: 'YAML Input',
    inputPlaceholder: 'Paste your YAML here...',
    outputLabel: 'JSON Output',
    outputPlaceholder: 'JSON output will appear here...',
    convert: 'Convert to JSON',
    clear: 'Clear',
    loadSample: 'Load Sample',
    indent: 'JSON Indent',
    spaces: 'spaces',
    tab: 'Tab',
    compact: 'Compact',
    valid: 'Conversion successful',
    error: 'YAML Parse Error',
    introTitle: 'Free Online YAML to JSON Converter',
    introText: 'This YAML to JSON converter takes your YAML input and converts it to well-formatted JSON. YAML (YAML Ain\'t Markup Language) is commonly used for configuration files in Kubernetes, Docker Compose, CI/CD pipelines, and other DevOps tools. This converter handles all YAML features including nested objects, arrays, multi-line strings, anchors, and aliases. Perfect for converting Kubernetes manifests, Ansible playbooks, or any YAML configuration to JSON format.',
    faqTitle: 'Frequently Asked Questions',
    faq1q: 'How do I convert YAML to JSON?',
    faq1a: 'Simply paste your YAML content into the input field and click "Convert to JSON". The tool parses the YAML syntax and generates equivalent JSON output with proper formatting. It handles nested objects, arrays, comments (which are removed in JSON), multi-line strings, and all YAML data types including strings, numbers, booleans, and null values.',
    faq2q: 'What YAML features are supported?',
    faq2a: 'This converter supports all standard YAML features: key-value pairs, nested objects, arrays (sequences), multi-line strings (literal and folded), anchors and aliases, comments (stripped in JSON output), and all YAML data types. It follows the YAML 1.2 specification for accurate conversion.',
    faq3q: 'Why convert YAML to JSON?',
    faq3a: 'JSON is the standard data format for APIs, web applications, and many programming languages. You might need to convert YAML to JSON when: working with APIs that only accept JSON, migrating configuration formats, debugging YAML by viewing it as JSON, or using the data in JavaScript/Python applications that prefer JSON input.',
    faq4q: 'Are YAML comments preserved in JSON?',
    faq4a: 'No, JSON does not support comments. When converting YAML to JSON, all comments (lines starting with #) are automatically removed. The data values are preserved exactly, but the documentary comments are lost. If you need to preserve comments, consider keeping the original YAML file alongside the generated JSON.',
    relatedTitle: 'Related Tools',
  },
  zh: {
    title: 'YAML 转 JSON 转换器',
    description: '在线将 YAML 转换为 JSON。粘贴 YAML 配置即可获得整洁的 JSON 输出。',
    inputLabel: 'YAML 输入',
    inputPlaceholder: '在此粘贴 YAML...',
    outputLabel: 'JSON 输出',
    outputPlaceholder: 'JSON 输出将显示在此...',
    convert: '转换为 JSON',
    clear: '清除',
    loadSample: '加载示例',
    indent: 'JSON 缩进',
    spaces: '空格',
    tab: '制表符',
    compact: '紧凑',
    valid: '转换成功',
    error: 'YAML 解析错误',
    introTitle: '免费在线 YAML 转 JSON 工具',
    introText: '这个 YAML 转 JSON 工具将 YAML 输入转换为格式整齐的 JSON。支持所有 YAML 特性，包括嵌套对象、数组、多行字符串。适合转换 Kubernetes 清单、Docker Compose 配置等。',
    faqTitle: '常见问题',
    faq1q: '如何将 YAML 转换为 JSON？',
    faq1a: '只需将 YAML 内容粘贴到输入框中并点击"转换为 JSON"。工具会解析 YAML 语法并生成等效的格式化 JSON 输出。',
    faq2q: '支持哪些 YAML 功能？',
    faq2a: '支持所有标准 YAML 功能：键值对、嵌套对象、数组、多行字符串、锚点和别名、注释等。',
    faq3q: '为什么要将 YAML 转换为 JSON？',
    faq3a: 'JSON 是 API 和 Web 应用的标准数据格式。在 API 只接受 JSON、迁移配置格式或调试时可能需要转换。',
    faq4q: 'YAML 注释在 JSON 中会保留吗？',
    faq4a: '不会。JSON 不支持注释，转换时所有注释都会被自动删除。数据值会完整保留。',
    relatedTitle: '相关工具',
  },
  fr: {
    title: 'Convertisseur YAML vers JSON',
    description: 'Convertissez YAML en JSON en ligne. Collez votre configuration YAML et obtenez du JSON formate.',
    inputLabel: 'Entree YAML', inputPlaceholder: 'Collez votre YAML ici...', outputLabel: 'Sortie JSON',
    outputPlaceholder: 'La sortie JSON apparaitra ici...', convert: 'Convertir en JSON', clear: 'Effacer',
    loadSample: 'Charger un exemple', indent: 'Indentation JSON', spaces: 'espaces', tab: 'Tab', compact: 'Compact',
    valid: 'Conversion reussie', error: 'Erreur de syntaxe YAML',
    introTitle: 'Convertisseur YAML vers JSON gratuit', introText: 'Ce convertisseur transforme votre YAML en JSON formate. Supporte toutes les fonctionnalites YAML.',
    faqTitle: 'Questions frequentes',
    faq1q: 'Comment convertir YAML en JSON ?', faq1a: 'Collez votre YAML et cliquez sur "Convertir en JSON". L\'outil analyse et genere du JSON formate.',
    faq2q: 'Quelles fonctionnalites YAML sont supportees ?', faq2a: 'Toutes les fonctionnalites standard: objets imbriques, tableaux, chaines multi-lignes, ancres et alias.',
    faq3q: 'Pourquoi convertir YAML en JSON ?', faq3a: 'JSON est le format standard pour les API et applications web qui n\'acceptent pas YAML.',
    faq4q: 'Les commentaires YAML sont-ils preserves ?', faq4a: 'Non, JSON ne supporte pas les commentaires. Ils sont supprimes lors de la conversion.',
    relatedTitle: 'Outils connexes',
  },
  de: {
    title: 'YAML zu JSON Konverter',
    description: 'YAML online in JSON konvertieren. YAML-Konfiguration einfuegen und formatierten JSON-Output erhalten.',
    inputLabel: 'YAML-Eingabe', inputPlaceholder: 'YAML hier einfuegen...', outputLabel: 'JSON-Ausgabe',
    outputPlaceholder: 'JSON-Ausgabe erscheint hier...', convert: 'In JSON konvertieren', clear: 'Loeschen',
    loadSample: 'Beispiel laden', indent: 'JSON-Einrueckung', spaces: 'Leerzeichen', tab: 'Tab', compact: 'Kompakt',
    valid: 'Konvertierung erfolgreich', error: 'YAML-Syntaxfehler',
    introTitle: 'Kostenloser YAML zu JSON Konverter', introText: 'Dieser Konverter wandelt YAML in formatierten JSON um. Unterstuetzt alle YAML-Funktionen.',
    faqTitle: 'Haeufig gestellte Fragen',
    faq1q: 'Wie konvertiert man YAML zu JSON?', faq1a: 'YAML einfuegen und "In JSON konvertieren" klicken.',
    faq2q: 'Welche YAML-Funktionen werden unterstuetzt?', faq2a: 'Alle Standard-Funktionen: verschachtelte Objekte, Arrays, mehrzeilige Strings, Anker und Aliase.',
    faq3q: 'Warum YAML zu JSON konvertieren?', faq3a: 'JSON ist das Standard-Format fuer APIs und Webanwendungen.',
    faq4q: 'Werden YAML-Kommentare beibehalten?', faq4a: 'Nein, JSON unterstuetzt keine Kommentare. Sie werden bei der Konvertierung entfernt.',
    relatedTitle: 'Verwandte Tools',
  },
  es: {
    title: 'Convertidor YAML a JSON',
    description: 'Convierte YAML a JSON en linea. Pega tu configuracion YAML y obtiene JSON formateado.',
    inputLabel: 'Entrada YAML', inputPlaceholder: 'Pega tu YAML aqui...', outputLabel: 'Salida JSON',
    outputPlaceholder: 'La salida JSON aparecera aqui...', convert: 'Convertir a JSON', clear: 'Limpiar',
    loadSample: 'Cargar ejemplo', indent: 'Indentacion JSON', spaces: 'espacios', tab: 'Tab', compact: 'Compacto',
    valid: 'Conversion exitosa', error: 'Error de sintaxis YAML',
    introTitle: 'Convertidor YAML a JSON gratuito', introText: 'Este convertidor transforma YAML en JSON formateado. Soporta todas las funcionalidades YAML.',
    faqTitle: 'Preguntas frecuentes',
    faq1q: 'Como convertir YAML a JSON?', faq1a: 'Pega tu YAML y haz clic en "Convertir a JSON".',
    faq2q: 'Que funcionalidades YAML se soportan?', faq2a: 'Todas las funcionalidades estandar: objetos anidados, arrays, cadenas multilinea, anclas y alias.',
    faq3q: 'Por que convertir YAML a JSON?', faq3a: 'JSON es el formato estandar para APIs y aplicaciones web.',
    faq4q: 'Se preservan los comentarios YAML?', faq4a: 'No, JSON no soporta comentarios. Se eliminan durante la conversion.',
    relatedTitle: 'Herramientas relacionadas',
  },
  ja: {
    title: 'YAML から JSON 変換ツール',
    description: 'YAML をオンラインで JSON に変換。YAML 設定を貼り付けて即座にフォーマットされた JSON を取得。',
    inputLabel: 'YAML 入力', inputPlaceholder: 'YAML をここに貼り付け...', outputLabel: 'JSON 出力',
    outputPlaceholder: 'JSON 出力がここに表示...', convert: 'JSON に変換', clear: 'クリア',
    loadSample: 'サンプル読込', indent: 'JSON インデント', spaces: 'スペース', tab: 'タブ', compact: 'コンパクト',
    valid: '変換成功', error: 'YAML 解析エラー',
    introTitle: '無料オンライン YAML から JSON 変換', introText: 'この変換ツールは YAML をフォーマットされた JSON に変換します。すべての YAML 機能をサポート。',
    faqTitle: 'よくある質問',
    faq1q: 'YAML を JSON に変換するには？', faq1a: 'YAML を貼り付けて「JSON に変換」をクリック。',
    faq2q: 'サポートされる YAML 機能は？', faq2a: 'ネストされたオブジェクト、配列、複数行文字列、アンカー、エイリアスなどすべての標準機能。',
    faq3q: 'なぜ YAML を JSON に変換？', faq3a: 'JSON は API や Web アプリケーションの標準フォーマットです。',
    faq4q: 'YAML のコメントは保持される？', faq4a: 'いいえ。JSON はコメントをサポートしないため、変換時に削除されます。',
    relatedTitle: '関連ツール',
  },
  ko: {
    title: 'YAML에서 JSON 변환기',
    description: 'YAML을 온라인으로 JSON으로 변환. YAML 설정을 붙여넣고 즉시 포맷된 JSON을 얻으세요.',
    inputLabel: 'YAML 입력', inputPlaceholder: 'YAML을 여기에 붙여넣기...', outputLabel: 'JSON 출력',
    outputPlaceholder: 'JSON 출력이 여기에 표시됩니다...', convert: 'JSON으로 변환', clear: '지우기',
    loadSample: '샘플 로드', indent: 'JSON 들여쓰기', spaces: '스페이스', tab: '탭', compact: '압축',
    valid: '변환 성공', error: 'YAML 구문 오류',
    introTitle: '무료 온라인 YAML에서 JSON 변환', introText: '이 변환기는 YAML을 포맷된 JSON으로 변환합니다. 모든 YAML 기능을 지원합니다.',
    faqTitle: '자주 묻는 질문',
    faq1q: 'YAML을 JSON으로 변환하는 방법은?', faq1a: 'YAML을 붙여넣고 "JSON으로 변환"을 클릭하세요.',
    faq2q: '지원되는 YAML 기능은?', faq2a: '중첩 객체, 배열, 여러 줄 문자열, 앵커 및 별칭 등 모든 표준 기능.',
    faq3q: '왜 YAML을 JSON으로 변환하나요?', faq3a: 'JSON은 API 및 웹 애플리케이션의 표준 형식입니다.',
    faq4q: 'YAML 주석이 보존되나요?', faq4a: '아니요. JSON은 주석을 지원하지 않아 변환 시 제거됩니다.',
    relatedTitle: '관련 도구',
  },
};

export default function YamlToJson() {
  const { lang } = useLang();
  const t = ui[lang] || ui.en;
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [indent, setIndent] = useState<string>('2');
  const [success, setSuccess] = useState(false);

  const handleConvert = () => {
    if (!input.trim()) return;
    try {
      const parsed = yaml.load(input);
      const indentVal = indent === 'compact' ? undefined : indent === 'tab' ? '\t' : Number(indent);
      setOutput(JSON.stringify(parsed, null, indentVal));
      setError('');
      setSuccess(true);
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : 'Invalid YAML';
      setError(msg);
      setOutput('');
      setSuccess(false);
    }
  };

  const loadSampleData = () => {
    setInput(sampleYaml);
    setOutput('');
    setError('');
    setSuccess(false);
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: t.faq1q, acceptedAnswer: { '@type': 'Answer', text: t.faq1a } },
      { '@type': 'Question', name: t.faq2q, acceptedAnswer: { '@type': 'Answer', text: t.faq2a } },
      { '@type': 'Question', name: t.faq3q, acceptedAnswer: { '@type': 'Answer', text: t.faq3a } },
      { '@type': 'Question', name: t.faq4q, acceptedAnswer: { '@type': 'Answer', text: t.faq4a } },
    ],
  };

  return (
    <ToolLayout title={t.title} description={t.description} toolId="yaml-to-json">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* Controls */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap', alignItems: 'center' }}>
        <button onClick={handleConvert} className="btn btn-primary">{t.convert}</button>
        <button onClick={() => { setInput(''); setOutput(''); setError(''); setSuccess(false); }} className="btn btn-secondary">{t.clear}</button>
        <button onClick={loadSampleData} className="btn btn-secondary">{t.loadSample}</button>
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 8 }}>
          <label style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{t.indent}:</label>
          <select value={indent} onChange={e => setIndent(e.target.value)} style={{ width: 120, padding: '4px 8px', fontSize: 12 }}>
            <option value="2">2 {t.spaces}</option>
            <option value="4">4 {t.spaces}</option>
            <option value="tab">{t.tab}</option>
            <option value="compact">{t.compact}</option>
          </select>
        </div>
      </div>

      {/* Status */}
      {(success || error) && (
        <div style={{
          background: error ? 'rgba(244,63,94,0.1)' : 'rgba(34,197,94,0.1)',
          border: `1px solid ${error ? 'rgba(244,63,94,0.3)' : 'rgba(34,197,94,0.3)'}`,
          borderRadius: 8, padding: '8px 14px', marginBottom: 16, fontSize: 13,
          color: error ? 'var(--accent-rose)' : '#22c55e',
        }}>
          {error ? `${t.error}: ${error}` : t.valid}
        </div>
      )}

      {/* Input / Output */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div>
          <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 8 }}>{t.inputLabel}</label>
          <textarea value={input} onChange={e => setInput(e.target.value)} placeholder={t.inputPlaceholder} style={{ minHeight: 420, fontFamily: 'monospace', fontSize: 13 }} />
        </div>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <label style={{ fontSize: 13, fontWeight: 600 }}>{t.outputLabel}</label>
            <CopyButton text={output} />
          </div>
          <textarea value={output} readOnly placeholder={t.outputPlaceholder} style={{ minHeight: 420, fontFamily: 'monospace', fontSize: 13, opacity: output ? 1 : 0.5 }} />
        </div>
      </div>

      {/* YAML → JSON direction indicator */}
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 12, margin: '20px 0', padding: '12px 0', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)' }}>
        <span style={{ padding: '6px 16px', borderRadius: 6, background: 'rgba(139,92,246,0.1)', color: '#8b5cf6', fontWeight: 700, fontSize: 14 }}>YAML</span>
        <span style={{ fontSize: 20, color: 'var(--text-secondary)' }}>&rarr;</span>
        <span style={{ padding: '6px 16px', borderRadius: 6, background: 'rgba(59,130,246,0.1)', color: '#3b82f6', fontWeight: 700, fontSize: 14 }}>JSON</span>
      </div>

      {/* SEO Content */}
      <div style={{ marginTop: 30, paddingTop: 24, borderTop: '1px solid var(--border-color)' }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 12 }}>{t.introTitle}</h2>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 20 }}>{t.introText}</p>

        <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{t.faqTitle}</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 24 }}>
          {[
            { q: t.faq1q, a: t.faq1a },
            { q: t.faq2q, a: t.faq2a },
            { q: t.faq3q, a: t.faq3a },
            { q: t.faq4q, a: t.faq4a },
          ].map((faq, idx) => (
            <details key={idx} style={{ border: '1px solid var(--border-color)', borderRadius: 8, overflow: 'hidden', background: 'var(--bg-input)' }}>
              <summary style={{ padding: '14px 16px', cursor: 'pointer', fontSize: 14, fontWeight: 600, color: 'var(--text-primary)' }}>{faq.q}</summary>
              <div style={{ padding: '0 16px 14px', fontSize: 13, lineHeight: 1.7, color: 'var(--text-secondary)' }}>{faq.a}</div>
            </details>
          ))}
        </div>

        <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{t.relatedTitle}</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {[
            { href: `/${lang}/tools/json-yaml`, label: 'JSON ↔ YAML Converter' },
            { href: `/${lang}/tools/yaml-json-converter`, label: 'YAML ↔ JSON Converter' },
            { href: `/${lang}/tools/yaml-validator`, label: 'YAML Validator' },
            { href: `/${lang}/tools/json-formatter`, label: 'JSON Formatter' },
          ].map((link) => (
            <Link key={link.href} href={link.href}
              style={{ display: 'inline-block', padding: '8px 16px', borderRadius: 8, border: '1px solid var(--border-color)', fontSize: 13, color: 'var(--accent-blue)', textDecoration: 'none', background: 'var(--bg-input)' }}>
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </ToolLayout>
  );
}
