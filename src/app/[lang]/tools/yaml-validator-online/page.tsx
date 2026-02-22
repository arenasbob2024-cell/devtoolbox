'use client';

import { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import Link from 'next/link';
import { useLang } from '@/i18n/LangContext';
import yaml from 'js-yaml';

const ui: Record<string, Record<string, string>> = {
  en: {
    title: 'YAML Validator Online',
    description: 'Validate YAML syntax online. Check for errors with line numbers and detailed error messages. Supports YAML 1.2 specification.',
    inputLabel: 'YAML Input',
    inputPlaceholder: 'Paste your YAML here to validate...',
    outputLabel: 'Parsed Output (JSON)',
    outputPlaceholder: 'Parsed JSON will appear here...',
    validateBtn: 'Validate YAML',
    clear: 'Clear',
    loadSample: 'Load Sample',
    valid: 'Valid YAML',
    invalid: 'Invalid YAML',
    line: 'Line',
    lines: 'lines',
    keys: 'keys',
    introTitle: 'Free Online YAML Validator',
    introText: 'Validate your YAML configuration files, Docker Compose files, Kubernetes manifests, GitHub Actions workflows, and more. This tool checks YAML syntax against the specification and highlights exact error locations with line numbers. When valid, it also shows the parsed JSON representation so you can verify the structure matches your intent.',
    cheatTitle: 'Common YAML Mistakes',
    ruleCol: 'Mistake',
    descCol: 'Fix',
    exampleCol: 'Example',
    rule1: 'Tabs for indentation',
    rule1Desc: 'Use spaces only (2 spaces recommended)',
    rule1Ex: 'key:\\n  value (not key:\\tvalue)',
    rule2: 'Inconsistent indentation',
    rule2Desc: 'Keep same number of spaces at each level',
    rule2Ex: 'parent:\\n  child1: a\\n  child2: b',
    rule3: 'Missing colon space',
    rule3Desc: 'Always put a space after the colon',
    rule3Ex: 'key: value (not key:value)',
    rule4: 'Unquoted special chars',
    rule4Desc: 'Quote strings with :, #, {, }, [, ], etc.',
    rule4Ex: 'msg: "Hello: World"',
    rule5: 'Duplicate keys',
    rule5Desc: 'Each key must be unique at the same level',
    rule5Ex: 'Use unique keys at each nesting level',
    faqTitle: 'Frequently Asked Questions',
    faq1q: 'What is YAML validation?',
    faq1a: 'YAML validation checks whether your YAML content conforms to the YAML specification. It verifies proper indentation (spaces only, no tabs), correct key-value syntax, valid data types, and proper nesting structure. Our validator pinpoints the exact line and column of any syntax errors.',
    faq2q: 'What YAML version does this validator support?',
    faq2a: 'This validator supports YAML 1.2 specification through the js-yaml library. It can handle all standard YAML features including anchors, aliases, multi-line strings (literal and folded blocks), and complex nested structures.',
    faq3q: 'Can I validate Kubernetes YAML files?',
    faq3a: 'Yes, you can validate the YAML syntax of Kubernetes manifests, Helm charts, Docker Compose files, GitHub Actions workflows, and any other YAML-based configuration. Note that this tool checks syntax only, not schema compliance for specific platforms.',
    faq4q: 'Why does YAML use spaces instead of tabs?',
    faq4a: 'The YAML specification explicitly forbids tab characters for indentation. This is because different editors display tabs at different widths, which could lead to ambiguous indentation. Spaces ensure consistent behavior across all environments. Use 2 spaces per indentation level as a common convention.',
    relatedTitle: 'Related Tools',
  },
  zh: {
    title: 'YAML 验证器在线',
    description: '在线验证 YAML 语法。显示行号和详细错误信息，支持 YAML 1.2 规范。',
    inputLabel: 'YAML 输入',
    inputPlaceholder: '在此粘贴要验证的 YAML...',
    outputLabel: '解析输出 (JSON)',
    outputPlaceholder: '解析后的 JSON 将显示在此...',
    validateBtn: '验证 YAML',
    clear: '清除',
    loadSample: '加载示例',
    valid: 'YAML 有效',
    invalid: 'YAML 无效',
    line: '行',
    lines: '行',
    keys: '个键',
    introTitle: '免费在线 YAML 验证器',
    introText: '验证 YAML 配置文件、Docker Compose 文件、Kubernetes 清单、GitHub Actions 工作流等。检测语法错误并显示精确行号。有效时还会显示解析后的 JSON 表示。',
    cheatTitle: '常见 YAML 错误',
    ruleCol: '错误', descCol: '修复方法', exampleCol: '示例',
    rule1: '使用 Tab 缩进', rule1Desc: '只能使用空格（推荐2个空格）', rule1Ex: 'key:\\n  value',
    rule2: '缩进不一致', rule2Desc: '每层保持相同空格数', rule2Ex: 'parent:\\n  child1: a\\n  child2: b',
    rule3: '冒号后缺少空格', rule3Desc: '冒号后始终加一个空格', rule3Ex: 'key: value',
    rule4: '特殊字符未加引号', rule4Desc: '包含:, #, {}等特殊字符的字符串需引号', rule4Ex: 'msg: "Hello: World"',
    rule5: '重复键名', rule5Desc: '同级别每个键必须唯一', rule5Ex: '在每个嵌套级别使用唯一键名',
    faqTitle: '常见问题',
    faq1q: '什么是 YAML 验证？', faq1a: 'YAML 验证检查内容是否符合 YAML 规范，包括缩进（只用空格，不用 Tab）、键值语法、数据类型和嵌套结构。',
    faq2q: '支持哪个 YAML 版本？', faq2a: '通过 js-yaml 库支持 YAML 1.2 规范，处理锚点、别名、多行字符串等所有标准特性。',
    faq3q: '能验证 Kubernetes YAML 文件吗？', faq3a: '可以验证 Kubernetes 清单、Docker Compose、GitHub Actions 等 YAML 文件的语法。但仅检查语法，不检查特定平台的 schema。',
    faq4q: '为什么 YAML 用空格而不用 Tab？', faq4a: 'YAML 规范明确禁止用 Tab 缩进，因为不同编辑器对 Tab 宽度的显示不同，可能导致缩进歧义。建议每级使用2个空格。',
    relatedTitle: '相关工具',
  },
  fr: {
    title: 'Validateur YAML en Ligne',
    description: 'Validez la syntaxe YAML en ligne. Verifiez les erreurs avec numeros de ligne et messages detailles.',
    inputLabel: 'Entree YAML', inputPlaceholder: 'Collez votre YAML ici...', outputLabel: 'Sortie analysee (JSON)',
    outputPlaceholder: 'Le JSON analyse apparaitra ici...', validateBtn: 'Valider YAML', clear: 'Effacer',
    loadSample: 'Charger un exemple', valid: 'YAML valide', invalid: 'YAML invalide', line: 'Ligne', lines: 'lignes', keys: 'cles',
    introTitle: 'Validateur YAML gratuit en ligne', introText: 'Validez vos fichiers YAML, Docker Compose, Kubernetes et GitHub Actions. Detecte les erreurs avec numeros de ligne.',
    cheatTitle: 'Erreurs YAML courantes', ruleCol: 'Erreur', descCol: 'Correction', exampleCol: 'Exemple',
    rule1: 'Tabulations', rule1Desc: 'Utiliser uniquement des espaces', rule1Ex: 'key:\\n  value',
    rule2: 'Indentation incoherente', rule2Desc: 'Meme nombre d\'espaces par niveau', rule2Ex: 'parent:\\n  child: val',
    rule3: 'Espace manquant apres :', rule3Desc: 'Toujours un espace apres les deux-points', rule3Ex: 'key: value',
    rule4: 'Caracteres speciaux non quotes', rule4Desc: 'Entourer de guillemets', rule4Ex: 'msg: "Hello: World"',
    rule5: 'Cles dupliquees', rule5Desc: 'Chaque cle doit etre unique au meme niveau', rule5Ex: 'Utilisez des cles uniques',
    faqTitle: 'Questions frequentes',
    faq1q: 'Qu\'est-ce que la validation YAML ?', faq1a: 'La validation YAML verifie la conformite a la specification YAML, y compris l\'indentation, la syntaxe et les types de donnees.',
    faq2q: 'Quelle version de YAML ?', faq2a: 'YAML 1.2 via la bibliotheque js-yaml, avec support des ancres, alias et chaines multi-lignes.',
    faq3q: 'Peut-on valider les fichiers Kubernetes ?', faq3a: 'Oui, la syntaxe YAML de tout fichier de configuration peut etre validee.',
    faq4q: 'Pourquoi des espaces et pas des tabulations ?', faq4a: 'La specification YAML interdit les tabulations pour eviter les ambiguites d\'indentation.',
    relatedTitle: 'Outils connexes',
  },
  de: {
    title: 'YAML Validator Online',
    description: 'YAML-Syntax online validieren. Fehler mit Zeilennummern und detaillierten Fehlermeldungen pruefen.',
    inputLabel: 'YAML-Eingabe', inputPlaceholder: 'YAML hier einfuegen...', outputLabel: 'Analysierte Ausgabe (JSON)',
    outputPlaceholder: 'Analysiertes JSON erscheint hier...', validateBtn: 'YAML validieren', clear: 'Loeschen',
    loadSample: 'Beispiel laden', valid: 'Gueltiges YAML', invalid: 'Ungueltiges YAML', line: 'Zeile', lines: 'Zeilen', keys: 'Schluessel',
    introTitle: 'Kostenloser YAML Validator', introText: 'Validieren Sie YAML-Konfigurationen, Docker Compose, Kubernetes und GitHub Actions. Zeigt Fehler mit Zeilennummern an.',
    cheatTitle: 'Haeufige YAML-Fehler', ruleCol: 'Fehler', descCol: 'Loesung', exampleCol: 'Beispiel',
    rule1: 'Tab-Einrueckung', rule1Desc: 'Nur Leerzeichen verwenden', rule1Ex: 'key:\\n  value',
    rule2: 'Inkonsistente Einrueckung', rule2Desc: 'Gleiche Anzahl Leerzeichen pro Ebene', rule2Ex: 'parent:\\n  child: val',
    rule3: 'Fehlender Doppelpunkt-Abstand', rule3Desc: 'Immer ein Leerzeichen nach dem Doppelpunkt', rule3Ex: 'key: value',
    rule4: 'Nicht-quotierte Sonderzeichen', rule4Desc: 'Anfuehrungszeichen verwenden', rule4Ex: 'msg: "Hello: World"',
    rule5: 'Doppelte Schluessel', rule5Desc: 'Jeder Schluessel muss auf gleicher Ebene einzigartig sein', rule5Ex: 'Einzigartige Schluessel verwenden',
    faqTitle: 'Haeufig gestellte Fragen',
    faq1q: 'Was ist YAML-Validierung?', faq1a: 'YAML-Validierung prueft die Konformitaet mit der YAML-Spezifikation einschliesslich Einrueckung, Syntax und Datentypen.',
    faq2q: 'Welche YAML-Version?', faq2a: 'YAML 1.2 ueber die js-yaml Bibliothek mit Unterstuetzung fuer Anker, Aliase und mehrzeilige Strings.',
    faq3q: 'Kubernetes-Dateien validieren?', faq3a: 'Ja, die YAML-Syntax jeder Konfigurationsdatei kann validiert werden.',
    faq4q: 'Warum Leerzeichen statt Tabs?', faq4a: 'Die YAML-Spezifikation verbietet Tabs um Einrueckungsambiguitaeten zu vermeiden.',
    relatedTitle: 'Verwandte Tools',
  },
  es: {
    title: 'Validador YAML en Linea',
    description: 'Valida la sintaxis YAML en linea. Comprueba errores con numeros de linea y mensajes detallados.',
    inputLabel: 'Entrada YAML', inputPlaceholder: 'Pega tu YAML aqui...', outputLabel: 'Salida analizada (JSON)',
    outputPlaceholder: 'El JSON analizado aparecera aqui...', validateBtn: 'Validar YAML', clear: 'Limpiar',
    loadSample: 'Cargar ejemplo', valid: 'YAML valido', invalid: 'YAML invalido', line: 'Linea', lines: 'lineas', keys: 'claves',
    introTitle: 'Validador YAML gratuito', introText: 'Valide archivos YAML, Docker Compose, Kubernetes y GitHub Actions. Detecta errores con numeros de linea.',
    cheatTitle: 'Errores YAML comunes', ruleCol: 'Error', descCol: 'Solucion', exampleCol: 'Ejemplo',
    rule1: 'Tabulaciones', rule1Desc: 'Usar solo espacios', rule1Ex: 'key:\\n  value',
    rule2: 'Indentacion inconsistente', rule2Desc: 'Mismos espacios por nivel', rule2Ex: 'parent:\\n  child: val',
    rule3: 'Espacio faltante tras :', rule3Desc: 'Siempre un espacio tras los dos puntos', rule3Ex: 'key: value',
    rule4: 'Caracteres especiales sin comillas', rule4Desc: 'Usar comillas', rule4Ex: 'msg: "Hello: World"',
    rule5: 'Claves duplicadas', rule5Desc: 'Cada clave debe ser unica al mismo nivel', rule5Ex: 'Use claves unicas',
    faqTitle: 'Preguntas frecuentes',
    faq1q: 'Que es la validacion YAML?', faq1a: 'Comprueba la conformidad con la especificacion YAML incluyendo indentacion, sintaxis y tipos de datos.',
    faq2q: 'Que version de YAML?', faq2a: 'YAML 1.2 via la biblioteca js-yaml con soporte para anclas, alias y cadenas multi-linea.',
    faq3q: 'Validar archivos Kubernetes?', faq3a: 'Si, la sintaxis YAML de cualquier archivo de configuracion puede ser validada.',
    faq4q: 'Por que espacios y no tabulaciones?', faq4a: 'La especificacion YAML prohibe las tabulaciones para evitar ambiguedades de indentacion.',
    relatedTitle: 'Herramientas relacionadas',
  },
  ja: {
    title: 'YAML バリデーターオンライン',
    description: 'オンラインで YAML 構文を検証。行番号と詳細なエラーメッセージでエラーを確認。',
    inputLabel: 'YAML 入力', inputPlaceholder: '検証する YAML をここに貼り付け...', outputLabel: '解析結果 (JSON)',
    outputPlaceholder: '解析された JSON がここに表示されます...', validateBtn: 'YAML を検証', clear: 'クリア',
    loadSample: 'サンプル読込', valid: '有効な YAML', invalid: '無効な YAML', line: '行', lines: '行', keys: 'キー',
    introTitle: '無料オンライン YAML バリデーター', introText: 'YAML 設定ファイル、Docker Compose、Kubernetes、GitHub Actions を検証します。行番号付きでエラーを検出。',
    cheatTitle: 'よくある YAML エラー', ruleCol: 'エラー', descCol: '修正方法', exampleCol: '例',
    rule1: 'タブインデント', rule1Desc: 'スペースのみ使用', rule1Ex: 'key:\\n  value',
    rule2: 'インデント不整合', rule2Desc: '各レベルで同じスペース数', rule2Ex: 'parent:\\n  child: val',
    rule3: 'コロン後のスペース不足', rule3Desc: 'コロンの後に必ずスペース', rule3Ex: 'key: value',
    rule4: '特殊文字の未クォート', rule4Desc: 'クォートで囲む', rule4Ex: 'msg: "Hello: World"',
    rule5: '重複キー', rule5Desc: '同じレベルでキーは一意に', rule5Ex: '一意のキーを使用',
    faqTitle: 'よくある質問',
    faq1q: 'YAML 検証とは？', faq1a: 'YAML 仕様への準拠をチェックします（インデント、構文、データ型）。',
    faq2q: '対応 YAML バージョンは？', faq2a: 'js-yaml ライブラリにより YAML 1.2 に対応。アンカー、エイリアス、複数行文字列をサポート。',
    faq3q: 'Kubernetes ファイルを検証できますか？', faq3a: 'はい、あらゆる YAML 設定ファイルの構文を検証できます。',
    faq4q: 'なぜタブでなくスペース？', faq4a: 'YAML 仕様はインデントの曖昧さを避けるためタブを禁止しています。',
    relatedTitle: '関連ツール',
  },
  ko: {
    title: 'YAML 검증기 온라인',
    description: '온라인으로 YAML 구문을 검증합니다. 줄 번호와 상세 오류 메시지로 오류를 확인합니다.',
    inputLabel: 'YAML 입력', inputPlaceholder: '검증할 YAML을 여기에 붙여넣기...', outputLabel: '파싱 결과 (JSON)',
    outputPlaceholder: '파싱된 JSON이 여기에 표시됩니다...', validateBtn: 'YAML 검증', clear: '지우기',
    loadSample: '샘플 로드', valid: '유효한 YAML', invalid: '유효하지 않은 YAML', line: '줄', lines: '줄', keys: '키',
    introTitle: '무료 온라인 YAML 검증기', introText: 'YAML 설정 파일, Docker Compose, Kubernetes, GitHub Actions를 검증합니다. 줄 번호와 함께 오류를 감지합니다.',
    cheatTitle: '일반적인 YAML 오류', ruleCol: '오류', descCol: '수정', exampleCol: '예시',
    rule1: '탭 들여쓰기', rule1Desc: '스페이스만 사용', rule1Ex: 'key:\\n  value',
    rule2: '들여쓰기 불일치', rule2Desc: '각 레벨에서 같은 스페이스 수', rule2Ex: 'parent:\\n  child: val',
    rule3: '콜론 뒤 스페이스 누락', rule3Desc: '콜론 뒤에 반드시 스페이스', rule3Ex: 'key: value',
    rule4: '특수 문자 미인용', rule4Desc: '따옴표로 감싸기', rule4Ex: 'msg: "Hello: World"',
    rule5: '중복 키', rule5Desc: '같은 레벨에서 키는 고유해야 함', rule5Ex: '고유한 키 사용',
    faqTitle: '자주 묻는 질문',
    faq1q: 'YAML 검증이란?', faq1a: 'YAML 사양 준수 여부를 확인합니다 (들여쓰기, 구문, 데이터 타입).',
    faq2q: '지원 YAML 버전은?', faq2a: 'js-yaml 라이브러리로 YAML 1.2를 지원합니다. 앵커, 별칭, 여러 줄 문자열 지원.',
    faq3q: 'Kubernetes 파일을 검증할 수 있나요?', faq3a: '네, 모든 YAML 설정 파일의 구문을 검증할 수 있습니다.',
    faq4q: '왜 탭이 아닌 스페이스인가요?', faq4a: 'YAML 사양은 들여쓰기 모호성을 피하기 위해 탭을 금지합니다.',
    relatedTitle: '관련 도구',
  },
};

export default function YamlValidatorOnline() {
  const { lang } = useLang();
  const t = ui[lang] || ui.en;
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [isValid, setIsValid] = useState<boolean | null>(null);

  const validate = () => {
    if (!input.trim()) return;
    try {
      const parsed = yaml.load(input);
      setOutput(JSON.stringify(parsed, null, 2));
      setError('');
      setIsValid(true);
    } catch (e: unknown) {
      if (e instanceof yaml.YAMLException) {
        const mark = e.mark;
        const lineInfo = mark ? ` (${t.line} ${mark.line + 1}:${mark.column + 1})` : '';
        setError(`${e.reason || e.message}${lineInfo}`);
      } else {
        setError(e instanceof Error ? e.message : 'Invalid YAML');
      }
      setOutput('');
      setIsValid(false);
    }
  };

  const loadSample = () => {
    setInput(`# Docker Compose example
version: "3.9"
services:
  web:
    image: nginx:alpine
    ports:
      - "8080:80"
    volumes:
      - ./html:/usr/share/nginx/html
    environment:
      - NGINX_HOST=example.com
      - NGINX_PORT=80
    restart: unless-stopped

  database:
    image: postgres:15
    environment:
      POSTGRES_DB: myapp
      POSTGRES_USER: admin
      POSTGRES_PASSWORD: secret123
    volumes:
      - db-data:/var/lib/postgresql/data

volumes:
  db-data:`);
    setOutput('');
    setError('');
    setIsValid(null);
  };

  const outputLines = output ? output.split('\n').length : 0;
  const keyCount = output ? (output.match(/"[^"]+"\s*:/g) || []).length : 0;

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
    <ToolLayout title={t.title} description={t.description} toolId="yaml-validator-online">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* Controls */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
        <button onClick={validate} className="btn btn-primary">{t.validateBtn}</button>
        <button onClick={() => { setInput(''); setOutput(''); setError(''); setIsValid(null); }} className="btn btn-secondary">{t.clear}</button>
        <button onClick={loadSample} className="btn btn-secondary">{t.loadSample}</button>
      </div>

      {/* Validation status */}
      {isValid !== null && (
        <div style={{
          background: isValid ? 'rgba(34,197,94,0.1)' : 'rgba(244,63,94,0.1)',
          border: `1px solid ${isValid ? 'rgba(34,197,94,0.3)' : 'rgba(244,63,94,0.3)'}`,
          borderRadius: 8, padding: '10px 14px', marginBottom: 16, fontSize: 13,
          color: isValid ? '#22c55e' : 'var(--accent-rose)',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 8,
        }}>
          <span>{isValid ? t.valid : `${t.invalid}: ${error}`}</span>
          {isValid && <span style={{ fontSize: 12, opacity: 0.7 }}>{outputLines} {t.lines} / {keyCount} {t.keys}</span>}
        </div>
      )}

      {/* Input / Output */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <label style={{ fontSize: 13, fontWeight: 600 }}>{t.inputLabel}</label>
          </div>
          <textarea value={input} onChange={e => setInput(e.target.value)} placeholder={t.inputPlaceholder}
            style={{ minHeight: 400, fontFamily: 'monospace', fontSize: 13 }} />
        </div>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <label style={{ fontSize: 13, fontWeight: 600 }}>{t.outputLabel}</label>
            <CopyButton text={output} />
          </div>
          <textarea value={output} readOnly placeholder={t.outputPlaceholder}
            style={{ minHeight: 400, fontFamily: 'monospace', fontSize: 13, opacity: output ? 1 : 0.5 }} />
        </div>
      </div>

      {/* SEO Content */}
      <div style={{ marginTop: 30, paddingTop: 24, borderTop: '1px solid var(--border-color)' }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 12 }}>{t.introTitle}</h2>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 20 }}>{t.introText}</p>

        <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{t.cheatTitle}</h3>
        <div style={{ overflowX: 'auto', marginBottom: 24 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--border-color)' }}>
                <th style={{ padding: '8px 12px', textAlign: 'left' }}>{t.ruleCol}</th>
                <th style={{ padding: '8px 12px', textAlign: 'left' }}>{t.descCol}</th>
                <th style={{ padding: '8px 12px', textAlign: 'left' }}>{t.exampleCol}</th>
              </tr>
            </thead>
            <tbody>
              {[
                [t.rule1, t.rule1Desc, t.rule1Ex],
                [t.rule2, t.rule2Desc, t.rule2Ex],
                [t.rule3, t.rule3Desc, t.rule3Ex],
                [t.rule4, t.rule4Desc, t.rule4Ex],
                [t.rule5, t.rule5Desc, t.rule5Ex],
              ].map(([rule, desc, ex], i) => (
                <tr key={i} style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '8px 12px', fontWeight: 600, whiteSpace: 'nowrap' }}>{rule}</td>
                  <td style={{ padding: '8px 12px', color: 'var(--text-secondary)' }}>{desc}</td>
                  <td style={{ padding: '8px 12px', fontFamily: 'monospace', fontSize: 12, color: 'var(--accent-blue)' }}>{ex}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

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
            { href: `/${lang}/tools/yaml-to-json`, label: 'YAML to JSON' },
            { href: `/${lang}/tools/json-to-yaml`, label: 'JSON to YAML' },
            { href: `/${lang}/tools/json-formatter-validator`, label: 'JSON Formatter & Validator' },
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
