'use client';

import { useState, useMemo } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import Link from 'next/link';
import { useLang } from '@/i18n/LangContext';

/* ── i18n strings (7 langs) ───────────────────────────────────── */
const ui: Record<string, Record<string, string>> = {
  en: {
    title: 'Regex Checker',
    description: 'Check and test regular expressions against text with real-time match highlighting. All processing happens in your browser.',
    patternLabel: 'Regex Pattern',
    patternPlaceholder: 'Enter regex pattern, e.g. \\d+',
    testLabel: 'Test String',
    testPlaceholder: 'Enter text to check against the regex pattern...',
    flagGlobal: 'g (Global)',
    flagCase: 'i (Case-insensitive)',
    flagMultiline: 'm (Multiline)',
    flagDotall: 's (DotAll)',
    statusMatch: 'Match found',
    statusNoMatch: 'No match',
    statusInvalid: 'Invalid pattern',
    matchCount: 'matches',
    matchSingle: 'match',
    highlightLabel: 'Highlighted Matches',
    matchListLabel: 'Match Details',
    atPosition: 'at position',
    cheatTitle: 'Regex Syntax Quick Reference',
    cheatChar: 'Character Classes',
    cheatAnchor: 'Anchors',
    cheatQuantifier: 'Quantifiers',
    cheatGroup: 'Groups & Alternation',
    relatedTitle: 'Related Regex Tools',
    faqTitle: 'Frequently Asked Questions',
    faq1q: 'What is a regular expression (regex)?',
    faq1a: 'A regular expression (regex) is a sequence of characters that defines a search pattern. It is used in programming and text editors to find, match, and manipulate strings. Regex can match simple literal text or complex patterns using special metacharacters like . (any character), \\d (digit), \\w (word character), and quantifiers like * (zero or more) and + (one or more).',
    faq2q: 'How to test regex patterns online?',
    faq2a: 'Enter your regex pattern in the pattern field and your test text below. The checker will instantly highlight all matches in your text and show match count, positions, and matched text. You can toggle flags like global (g), case-insensitive (i), multiline (m), and dotAll (s) to modify matching behavior.',
    faq3q: 'What is the difference between regex and glob patterns?',
    faq3a: 'Glob patterns are simpler wildcard patterns used mainly for file matching (e.g., *.txt matches all .txt files). Regex is much more powerful and expressive, supporting character classes, quantifiers, lookahead/lookbehind, capture groups, and alternation. Glob uses * for any characters and ? for a single character, while regex uses .* for any characters and . for a single character.',
  },
  zh: {
    title: '正则检查器',
    description: '实时高亮匹配，检查和测试正则表达式。所有处理在浏览器本地完成。',
    patternLabel: '正则模式',
    patternPlaceholder: '输入正则模式，例如 \\d+',
    testLabel: '测试字符串',
    testPlaceholder: '输入要匹配的文本...',
    flagGlobal: 'g (全局)',
    flagCase: 'i (忽略大小写)',
    flagMultiline: 'm (多行)',
    flagDotall: 's (单行/DotAll)',
    statusMatch: '匹配成功',
    statusNoMatch: '无匹配',
    statusInvalid: '无效模式',
    matchCount: '个匹配',
    matchSingle: '个匹配',
    highlightLabel: '高亮匹配',
    matchListLabel: '匹配详情',
    atPosition: '位置',
    cheatTitle: '正则语法速查表',
    cheatChar: '字符类',
    cheatAnchor: '锚点',
    cheatQuantifier: '量词',
    cheatGroup: '分组与交替',
    relatedTitle: '相关正则工具',
    faqTitle: '常见问题',
    faq1q: '什么是正则表达式？',
    faq1a: '正则表达式（regex）是定义搜索模式的字符序列。它用于编程和文本编辑器中查找、匹配和处理字符串。正则可以匹配简单的文字文本或使用特殊元字符（如 . \\d \\w）和量词（如 * +）来匹配复杂模式。',
    faq2q: '如何在线测试正则模式？',
    faq2a: '在模式字段中输入正则表达式，在下方输入测试文本。检查器会即时高亮所有匹配，并显示匹配数量、位置和匹配文本。您可以切换 g（全局）、i（忽略大小写）、m（多行）、s（DotAll）等标志来修改匹配行为。',
    faq3q: '正则和 glob 模式有什么区别？',
    faq3a: 'Glob 模式是主要用于文件匹配的简单通配符模式（例如 *.txt 匹配所有 .txt 文件）。正则更加强大和表达力丰富，支持字符类、量词、前瞻/后顾、捕获组和交替。Glob 使用 * 表示任意字符，? 表示单个字符，而正则使用 .* 表示任意字符，. 表示单个字符。',
  },
  fr: {
    title: 'Verificateur Regex',
    description: 'Verifiez et testez des expressions regulieres avec mise en surbrillance en temps reel. Tout le traitement se fait dans votre navigateur.',
    patternLabel: 'Motif Regex',
    patternPlaceholder: 'Entrez un motif regex, ex. \\d+',
    testLabel: 'Texte de test',
    testPlaceholder: 'Entrez le texte a verifier...',
    flagGlobal: 'g (Global)',
    flagCase: 'i (Insensible a la casse)',
    flagMultiline: 'm (Multiligne)',
    flagDotall: 's (DotAll)',
    statusMatch: 'Correspondance trouvee',
    statusNoMatch: 'Aucune correspondance',
    statusInvalid: 'Motif invalide',
    matchCount: 'correspondances',
    matchSingle: 'correspondance',
    highlightLabel: 'Correspondances surlignees',
    matchListLabel: 'Details des correspondances',
    atPosition: 'a la position',
    cheatTitle: 'Reference rapide de la syntaxe Regex',
    cheatChar: 'Classes de caracteres',
    cheatAnchor: 'Ancres',
    cheatQuantifier: 'Quantificateurs',
    cheatGroup: 'Groupes et alternance',
    relatedTitle: 'Outils Regex connexes',
    faqTitle: 'Questions frequentes',
    faq1q: "Qu'est-ce qu'une expression reguliere ?",
    faq1a: "Une expression reguliere (regex) est une sequence de caracteres definissant un motif de recherche. Elle est utilisee pour trouver, correspondre et manipuler des chaines de caracteres.",
    faq2q: 'Comment tester des motifs regex en ligne ?',
    faq2a: 'Entrez votre motif regex et votre texte de test. Le verificateur surlignera instantanement toutes les correspondances et affichera le nombre, les positions et le texte correspondant.',
    faq3q: 'Quelle est la difference entre regex et glob ?',
    faq3a: 'Les motifs glob sont des motifs simples utilises pour la correspondance de fichiers. Regex est beaucoup plus puissant avec classes de caracteres, quantificateurs, lookahead/lookbehind et groupes de capture.',
  },
  de: {
    title: 'Regex Checker',
    description: 'Regulaere Ausdruecke mit Echtzeit-Hervorhebung pruefen und testen. Alle Berechnungen erfolgen lokal im Browser.',
    patternLabel: 'Regex-Muster',
    patternPlaceholder: 'Regex-Muster eingeben, z.B. \\d+',
    testLabel: 'Testtext',
    testPlaceholder: 'Text zum Pruefen eingeben...',
    flagGlobal: 'g (Global)',
    flagCase: 'i (Gross-/Kleinschreibung ignorieren)',
    flagMultiline: 'm (Mehrzeilig)',
    flagDotall: 's (DotAll)',
    statusMatch: 'Treffer gefunden',
    statusNoMatch: 'Kein Treffer',
    statusInvalid: 'Ungueltiges Muster',
    matchCount: 'Treffer',
    matchSingle: 'Treffer',
    highlightLabel: 'Hervorgehobene Treffer',
    matchListLabel: 'Trefferdetails',
    atPosition: 'an Position',
    cheatTitle: 'Regex-Syntax Kurzreferenz',
    cheatChar: 'Zeichenklassen',
    cheatAnchor: 'Anker',
    cheatQuantifier: 'Quantifizierer',
    cheatGroup: 'Gruppen & Alternation',
    relatedTitle: 'Verwandte Regex-Tools',
    faqTitle: 'Haeufig gestellte Fragen',
    faq1q: 'Was ist ein regulaerer Ausdruck?',
    faq1a: 'Ein regulaerer Ausdruck (Regex) ist eine Zeichenfolge, die ein Suchmuster definiert. Er wird zum Suchen, Abgleichen und Bearbeiten von Zeichenketten verwendet.',
    faq2q: 'Wie teste ich Regex-Muster online?',
    faq2a: 'Geben Sie Ihr Regex-Muster und Ihren Testtext ein. Der Checker hebt sofort alle Treffer hervor und zeigt Anzahl, Positionen und gefundenen Text an.',
    faq3q: 'Was ist der Unterschied zwischen Regex und Glob?',
    faq3a: 'Glob-Muster sind einfache Platzhalter fuer Dateiabgleich. Regex ist viel maeechtiger mit Zeichenklassen, Quantifizierern, Lookahead/Lookbehind und Capture Groups.',
  },
  es: {
    title: 'Verificador Regex',
    description: 'Verifica y prueba expresiones regulares con resaltado en tiempo real. Todo el procesamiento se realiza en tu navegador.',
    patternLabel: 'Patron Regex',
    patternPlaceholder: 'Introduce un patron regex, ej. \\d+',
    testLabel: 'Texto de prueba',
    testPlaceholder: 'Introduce texto para verificar...',
    flagGlobal: 'g (Global)',
    flagCase: 'i (Sin distincion de mayusculas)',
    flagMultiline: 'm (Multilinea)',
    flagDotall: 's (DotAll)',
    statusMatch: 'Coincidencia encontrada',
    statusNoMatch: 'Sin coincidencia',
    statusInvalid: 'Patron invalido',
    matchCount: 'coincidencias',
    matchSingle: 'coincidencia',
    highlightLabel: 'Coincidencias resaltadas',
    matchListLabel: 'Detalles de coincidencias',
    atPosition: 'en posicion',
    cheatTitle: 'Referencia rapida de sintaxis Regex',
    cheatChar: 'Clases de caracteres',
    cheatAnchor: 'Anclas',
    cheatQuantifier: 'Cuantificadores',
    cheatGroup: 'Grupos y alternancia',
    relatedTitle: 'Herramientas Regex relacionadas',
    faqTitle: 'Preguntas frecuentes',
    faq1q: 'Que es una expresion regular?',
    faq1a: 'Una expresion regular (regex) es una secuencia de caracteres que define un patron de busqueda. Se usa para encontrar, coincidir y manipular cadenas de texto.',
    faq2q: 'Como probar patrones regex en linea?',
    faq2a: 'Ingresa tu patron regex y texto de prueba. El verificador resaltara todas las coincidencias y mostrara cantidad, posiciones y texto coincidente.',
    faq3q: 'Cual es la diferencia entre regex y glob?',
    faq3a: 'Los patrones glob son comodines simples para coincidencia de archivos. Regex es mucho mas potente con clases de caracteres, cuantificadores, lookahead/lookbehind y grupos de captura.',
  },
  ja: {
    title: '正規表現チェッカー',
    description: 'リアルタイムハイライト付きで正規表現をチェック・テスト。すべての処理はブラウザ内で完結します。',
    patternLabel: '正規表現パターン',
    patternPlaceholder: '正規表現パターンを入力（例: \\d+）',
    testLabel: 'テスト文字列',
    testPlaceholder: 'チェックするテキストを入力...',
    flagGlobal: 'g (グローバル)',
    flagCase: 'i (大文字小文字無視)',
    flagMultiline: 'm (複数行)',
    flagDotall: 's (DotAll)',
    statusMatch: 'マッチあり',
    statusNoMatch: 'マッチなし',
    statusInvalid: '無効なパターン',
    matchCount: '件のマッチ',
    matchSingle: '件のマッチ',
    highlightLabel: 'ハイライト表示',
    matchListLabel: 'マッチ詳細',
    atPosition: '位置',
    cheatTitle: '正規表現構文クイックリファレンス',
    cheatChar: '文字クラス',
    cheatAnchor: 'アンカー',
    cheatQuantifier: '量指定子',
    cheatGroup: 'グループと選択',
    relatedTitle: '関連ツール',
    faqTitle: 'よくある質問',
    faq1q: '正規表現とは？',
    faq1a: '正規表現（regex）は検索パターンを定義する文字列です。文字列の検索、マッチング、操作に使用されます。',
    faq2q: 'オンラインで正規表現をテストするには？',
    faq2a: 'パターンフィールドに正規表現を、テストテキストを入力してください。チェッカーが即座にすべてのマッチをハイライトし、数、位置、マッチしたテキストを表示します。',
    faq3q: '正規表現とglobパターンの違いは？',
    faq3a: 'globパターンはファイルマッチング用の単純なワイルドカードパターンです。正規表現はより強力で、文字クラス、量指定子、先読み/後読み、キャプチャグループをサポートします。',
  },
  ko: {
    title: '정규식 검사기',
    description: '실시간 매칭 하이라이트로 정규 표현식을 검사하고 테스트합니다. 모든 처리는 브라우저에서 이루어집니다.',
    patternLabel: '정규식 패턴',
    patternPlaceholder: '정규식 패턴 입력 (예: \\d+)',
    testLabel: '테스트 문자열',
    testPlaceholder: '검사할 텍스트를 입력하세요...',
    flagGlobal: 'g (전역)',
    flagCase: 'i (대소문자 무시)',
    flagMultiline: 'm (멀티라인)',
    flagDotall: 's (DotAll)',
    statusMatch: '매칭 발견',
    statusNoMatch: '매칭 없음',
    statusInvalid: '잘못된 패턴',
    matchCount: '개 매칭',
    matchSingle: '개 매칭',
    highlightLabel: '하이라이트된 매칭',
    matchListLabel: '매칭 상세',
    atPosition: '위치',
    cheatTitle: '정규식 구문 빠른 참조',
    cheatChar: '문자 클래스',
    cheatAnchor: '앵커',
    cheatQuantifier: '수량자',
    cheatGroup: '그룹 및 대체',
    relatedTitle: '관련 정규식 도구',
    faqTitle: '자주 묻는 질문',
    faq1q: '정규 표현식이란?',
    faq1a: '정규 표현식(regex)은 검색 패턴을 정의하는 문자열입니다. 문자열 검색, 매칭, 조작에 사용됩니다.',
    faq2q: '온라인에서 정규식을 테스트하는 방법은?',
    faq2a: '패턴 필드에 정규식을, 아래에 테스트 텍스트를 입력하세요. 검사기가 즉시 모든 매칭을 하이라이트하고 개수, 위치, 매칭된 텍스트를 표시합니다.',
    faq3q: '정규식과 glob 패턴의 차이는?',
    faq3a: 'glob 패턴은 파일 매칭용 단순 와일드카드 패턴입니다. 정규식은 문자 클래스, 수량자, 전방탐색/후방탐색, 캡처 그룹을 지원하여 훨씬 강력합니다.',
  },
};

/* ── Cheat sheet data ─────────────────────────────────────────── */
const cheatCharData = [
  ['.', 'Any character except newline'],
  ['\\d', 'Digit (0-9)'],
  ['\\D', 'Non-digit'],
  ['\\w', 'Word character (a-z, A-Z, 0-9, _)'],
  ['\\W', 'Non-word character'],
  ['\\s', 'Whitespace (space, tab, newline)'],
  ['\\S', 'Non-whitespace'],
  ['[abc]', 'Character set: a, b, or c'],
  ['[^abc]', 'Negated set: not a, b, or c'],
  ['[a-z]', 'Range: a to z'],
];

const cheatAnchorData = [
  ['^', 'Start of string / line'],
  ['$', 'End of string / line'],
  ['\\b', 'Word boundary'],
  ['\\B', 'Non-word boundary'],
];

const cheatQuantifierData = [
  ['*', 'Zero or more'],
  ['+', 'One or more'],
  ['?', 'Zero or one (optional)'],
  ['{n}', 'Exactly n times'],
  ['{n,}', 'n or more times'],
  ['{n,m}', 'Between n and m times'],
  ['*?', 'Zero or more (lazy)'],
  ['+?', 'One or more (lazy)'],
];

const cheatGroupData = [
  ['(abc)', 'Capture group'],
  ['(?:abc)', 'Non-capturing group'],
  ['a|b', 'Alternation: a or b'],
  ['(?=abc)', 'Positive lookahead'],
  ['(?!abc)', 'Negative lookahead'],
  ['(?<=abc)', 'Positive lookbehind'],
  ['(?<!abc)', 'Negative lookbehind'],
];

interface MatchResult {
  text: string;
  index: number;
  length: number;
}

export default function RegexChecker() {
  const { lang } = useLang();
  const t = ui[lang] || ui.en;

  const [pattern, setPattern] = useState('');
  const [testStr, setTestStr] = useState('');
  const [flags, setFlags] = useState('g');
  const [error, setError] = useState('');

  const flagOptions = [
    { value: 'g', label: t.flagGlobal },
    { value: 'i', label: t.flagCase },
    { value: 'm', label: t.flagMultiline },
    { value: 's', label: t.flagDotall },
  ];

  const toggleFlag = (f: string) => {
    setFlags(prev => prev.includes(f) ? prev.replace(f, '') : prev + f);
  };

  const matches = useMemo((): MatchResult[] => {
    if (!pattern || !testStr) { setError(''); return []; }
    try {
      const regex = new RegExp(pattern, flags);
      setError('');
      const results: MatchResult[] = [];
      if (flags.includes('g')) {
        let match;
        while ((match = regex.exec(testStr)) !== null) {
          results.push({ text: match[0], index: match.index, length: match[0].length });
          if (!match[0]) break;
        }
      } else {
        const match = regex.exec(testStr);
        if (match) {
          results.push({ text: match[0], index: match.index, length: match[0].length });
        }
      }
      return results;
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : t.statusInvalid);
      return [];
    }
  }, [pattern, flags, testStr, t.statusInvalid]);

  const highlightedParts = useMemo(() => {
    if (!pattern || !testStr || error) return null;
    try {
      const regex = new RegExp(pattern, flags.includes('g') ? flags : flags + 'g');
      const parts: { text: string; isMatch: boolean }[] = [];
      let lastIndex = 0;
      let match;
      while ((match = regex.exec(testStr)) !== null) {
        if (match.index > lastIndex) {
          parts.push({ text: testStr.slice(lastIndex, match.index), isMatch: false });
        }
        parts.push({ text: match[0], isMatch: true });
        lastIndex = match.index + match[0].length;
        if (!match[0]) break;
      }
      if (lastIndex < testStr.length) {
        parts.push({ text: testStr.slice(lastIndex), isMatch: false });
      }
      return parts.length > 0 ? parts : null;
    } catch {
      return null;
    }
  }, [pattern, flags, testStr, error]);

  const statusColor = error ? 'var(--accent-rose)' : matches.length > 0 ? 'var(--accent-emerald)' : 'var(--text-secondary)';
  const statusText = error ? t.statusInvalid : matches.length > 0 ? `${matches.length} ${matches.length > 1 ? t.matchCount : t.matchSingle} - ${t.statusMatch}` : (pattern && testStr ? t.statusNoMatch : '');

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: t.faq1q, acceptedAnswer: { '@type': 'Answer', text: t.faq1a } },
      { '@type': 'Question', name: t.faq2q, acceptedAnswer: { '@type': 'Answer', text: t.faq2a } },
      { '@type': 'Question', name: t.faq3q, acceptedAnswer: { '@type': 'Answer', text: t.faq3a } },
    ],
  };

  return (
    <ToolLayout title={t.title} description={t.description} toolId="regex-checker">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* Pattern Input */}
      <div style={{ marginBottom: 16 }}>
        <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 8 }}>{t.patternLabel}</label>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <span style={{ fontSize: 18, color: 'var(--text-secondary)' }}>/</span>
          <input
            type="text"
            value={pattern}
            onChange={e => setPattern(e.target.value)}
            placeholder={t.patternPlaceholder}
            style={{ flex: 1, fontFamily: 'monospace' }}
          />
          <span style={{ fontSize: 18, color: 'var(--text-secondary)' }}>/</span>
          <code style={{ fontSize: 14, color: 'var(--accent-blue)', minWidth: 40 }}>{flags || '-'}</code>
        </div>
      </div>

      {/* Flags */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
        {flagOptions.map(f => (
          <label key={f.value} style={{
            display: 'flex', alignItems: 'center', gap: 4, fontSize: 12,
            color: flags.includes(f.value) ? 'var(--accent-blue)' : 'var(--text-secondary)',
            cursor: 'pointer', padding: '4px 10px', borderRadius: 6,
            background: flags.includes(f.value) ? 'rgba(59,130,246,0.1)' : 'transparent',
            border: `1px solid ${flags.includes(f.value) ? 'var(--accent-blue)' : 'var(--border-color)'}`,
          }}>
            <input type="checkbox" checked={flags.includes(f.value)} onChange={() => toggleFlag(f.value)} style={{ display: 'none' }} />
            {f.label}
          </label>
        ))}
      </div>

      {/* Status Indicator */}
      {statusText && (
        <div style={{
          background: error ? 'rgba(244,63,94,0.1)' : matches.length > 0 ? 'rgba(16,185,129,0.1)' : 'var(--bg-input)',
          border: `1px solid ${error ? 'rgba(244,63,94,0.3)' : matches.length > 0 ? 'rgba(16,185,129,0.3)' : 'var(--border-color)'}`,
          borderRadius: 8, padding: '10px 14px', marginBottom: 16, fontSize: 13, color: statusColor, fontWeight: 600,
        }}>
          {error ? '\u2715 ' : matches.length > 0 ? '\u2713 ' : ''}{statusText}
        </div>
      )}

      {/* Test String */}
      <div style={{ marginBottom: 16 }}>
        <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 8 }}>{t.testLabel}</label>
        <textarea
          value={testStr}
          onChange={e => setTestStr(e.target.value)}
          placeholder={t.testPlaceholder}
          style={{ minHeight: 150, fontFamily: 'monospace' }}
        />
      </div>

      {/* Highlighted Matches */}
      {highlightedParts && (
        <div style={{ marginBottom: 16 }}>
          <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 8 }}>{t.highlightLabel}</label>
          <div style={{
            background: 'var(--bg-input)', borderRadius: 8, padding: '12px 16px',
            border: '1px solid var(--border-color)', fontFamily: 'monospace', fontSize: 13,
            lineHeight: 1.8, whiteSpace: 'pre-wrap', wordBreak: 'break-all',
          }}>
            {highlightedParts.map((part, i) => (
              <span key={i} style={{
                background: part.isMatch ? 'rgba(59, 130, 246, 0.3)' : 'transparent',
                borderRadius: part.isMatch ? 3 : 0,
                padding: part.isMatch ? '1px 2px' : 0,
                borderBottom: part.isMatch ? '2px solid var(--accent-blue)' : 'none',
              }}>{part.text}</span>
            ))}
          </div>
        </div>
      )}

      {/* Match List */}
      {matches.length > 0 && (
        <div style={{ marginBottom: 16 }}>
          <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 8 }}>{t.matchListLabel}</label>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {matches.map((m, i) => (
              <div key={i} style={{
                background: 'var(--bg-input)', borderRadius: 6, padding: '8px 12px',
                border: '1px solid var(--border-color)', fontSize: 12, fontFamily: 'monospace',
                display: 'flex', alignItems: 'center', gap: 8, justifyContent: 'space-between',
              }}>
                <span>
                  <span style={{ color: 'var(--text-secondary)' }}>#{i + 1} </span>
                  <span style={{ color: 'var(--accent-blue)' }}>&quot;{m.text}&quot;</span>
                  <span style={{ color: 'var(--text-secondary)' }}> {t.atPosition} {m.index} (len: {m.length})</span>
                </span>
                <CopyButton text={m.text} />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Cheat Sheet ──────────────────────────────────────── */}
      <div style={{ marginTop: 30, paddingTop: 24, borderTop: '1px solid var(--border-color)' }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16 }}>{t.cheatTitle}</h2>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 }}>
          {/* Character Classes */}
          <div>
            <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 8, color: 'var(--accent-blue)' }}>{t.cheatChar}</h3>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
              <tbody>
                {cheatCharData.map(([sym, desc], i) => (
                  <tr key={i} style={{ borderBottom: '1px solid var(--border-color)' }}>
                    <td style={{ padding: '5px 8px', fontFamily: 'monospace', fontWeight: 600, color: 'var(--accent-emerald)', whiteSpace: 'nowrap' }}>{sym}</td>
                    <td style={{ padding: '5px 8px', color: 'var(--text-secondary)' }}>{desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Anchors + Quantifiers */}
          <div>
            <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 8, color: 'var(--accent-blue)' }}>{t.cheatAnchor}</h3>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12, marginBottom: 16 }}>
              <tbody>
                {cheatAnchorData.map(([sym, desc], i) => (
                  <tr key={i} style={{ borderBottom: '1px solid var(--border-color)' }}>
                    <td style={{ padding: '5px 8px', fontFamily: 'monospace', fontWeight: 600, color: 'var(--accent-emerald)', whiteSpace: 'nowrap' }}>{sym}</td>
                    <td style={{ padding: '5px 8px', color: 'var(--text-secondary)' }}>{desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 8, color: 'var(--accent-blue)' }}>{t.cheatQuantifier}</h3>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
              <tbody>
                {cheatQuantifierData.map(([sym, desc], i) => (
                  <tr key={i} style={{ borderBottom: '1px solid var(--border-color)' }}>
                    <td style={{ padding: '5px 8px', fontFamily: 'monospace', fontWeight: 600, color: 'var(--accent-emerald)', whiteSpace: 'nowrap' }}>{sym}</td>
                    <td style={{ padding: '5px 8px', color: 'var(--text-secondary)' }}>{desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Groups */}
        <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 8, color: 'var(--accent-blue)' }}>{t.cheatGroup}</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12, marginBottom: 24 }}>
          <tbody>
            {cheatGroupData.map(([sym, desc], i) => (
              <tr key={i} style={{ borderBottom: '1px solid var(--border-color)' }}>
                <td style={{ padding: '5px 8px', fontFamily: 'monospace', fontWeight: 600, color: 'var(--accent-emerald)', whiteSpace: 'nowrap', width: 180 }}>{sym}</td>
                <td style={{ padding: '5px 8px', color: 'var(--text-secondary)' }}>{desc}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* FAQ */}
        <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{t.faqTitle}</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 20 }}>
          {[
            { q: t.faq1q, a: t.faq1a },
            { q: t.faq2q, a: t.faq2a },
            { q: t.faq3q, a: t.faq3a },
          ].map((faq, idx) => (
            <details key={idx} style={{ border: '1px solid var(--border-color)', borderRadius: 8, overflow: 'hidden', background: 'var(--bg-input)' }}>
              <summary style={{ padding: '14px 16px', cursor: 'pointer', fontSize: 14, fontWeight: 600, color: 'var(--text-primary)' }}>{faq.q}</summary>
              <div style={{ padding: '0 16px 14px', fontSize: 13, lineHeight: 1.7, color: 'var(--text-secondary)' }}>{faq.a}</div>
            </details>
          ))}
        </div>

        {/* Related Tools */}
        <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{t.relatedTitle}</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {[
            { href: `/${lang}/tools/regex-tester`, label: 'Regex Tester' },
            { href: `/${lang}/tools/regex-matcher`, label: 'Regex Matcher' },
            { href: `/${lang}/tools/regex-generator`, label: 'Regex Generator' },
            { href: `/${lang}/tools/escape-unescape`, label: 'Escape / Unescape' },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              style={{
                display: 'inline-block', padding: '8px 16px', borderRadius: 8,
                border: '1px solid var(--border-color)', fontSize: 13,
                color: 'var(--accent-blue)', textDecoration: 'none', background: 'var(--bg-input)',
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </ToolLayout>
  );
}
