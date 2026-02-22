'use client';

import { useState, useMemo } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import Link from 'next/link';
import { useLang } from '@/i18n/LangContext';

const ui: Record<string, Record<string, string>> = {
  en: {
    title: 'Regex Tester Online',
    description: 'Test regular expressions online with real-time matching, highlighting, and capture group support. Free regex tester for JavaScript, Python, and PCRE patterns.',
    patternLabel: 'Regular Expression',
    patternPlaceholder: 'Enter regex pattern, e.g. \\d{3}-\\d{4}',
    testLabel: 'Test String',
    testPlaceholder: 'Enter text to test against the regex pattern...',
    flagGlobal: 'g (Global)',
    flagCase: 'i (Case-insensitive)',
    flagMultiline: 'm (Multiline)',
    flagDotall: 's (DotAll)',
    matchCount: 'matches',
    matchSingle: 'match',
    matchFound: 'Match found',
    noMatch: 'No match',
    invalidPattern: 'Invalid pattern',
    highlightLabel: 'Highlighted Matches',
    detailsLabel: 'Match Details',
    atIndex: 'at index',
    groups: 'Groups',
    introTitle: 'Free Online Regex Tester',
    introText: 'Test and debug regular expressions in real time. Enter your regex pattern and test string to see matches highlighted instantly. This tool supports JavaScript regex syntax with flags for global, case-insensitive, multiline, and dotAll matching.',
    cheatTitle: 'Regex Cheat Sheet',
    charClass: 'Character Classes',
    anchors: 'Anchors & Boundaries',
    quantifiers: 'Quantifiers',
    groupsTitle: 'Groups & Lookaround',
    commonTitle: 'Common Regex Patterns',
    faqTitle: 'Frequently Asked Questions',
    faq1q: 'How to test a regex pattern online?',
    faq1a: 'Enter your regex pattern in the pattern field above, then type or paste your test string. The tester highlights all matches in real time, showing match count, positions, and capture groups. You can toggle flags (global, case-insensitive, multiline, dotAll) to modify matching behavior.',
    faq2q: 'What regex syntax does this tester support?',
    faq2a: 'This regex tester uses the JavaScript RegExp engine, which supports PCRE-like syntax including character classes (\\d, \\w, \\s), quantifiers (*, +, ?, {n,m}), anchors (^, $, \\b), groups ((...)  and (?:...)), lookahead (?=...) and lookbehind (?<=...), and Unicode properties.',
    faq3q: 'What are regex flags and when to use them?',
    faq3a: 'Regex flags modify matching behavior: g (global) finds all matches instead of stopping at the first; i (case-insensitive) ignores letter case; m (multiline) makes ^ and $ match line boundaries instead of string boundaries; s (dotAll) makes . match newline characters too.',
    faq4q: 'How to match an email address with regex?',
    faq4a: 'A common email regex pattern is: [a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}. This matches most email formats. For production use, consider using a dedicated email validation library instead of regex alone.',
    relatedTitle: 'Related Regex Tools',
  },
  zh: {
    title: '正则表达式在线测试器',
    description: '在线测试正则表达式，支持实时匹配、高亮显示和捕获组。免费的 JavaScript、Python 和 PCRE 正则测试工具。',
    patternLabel: '正则表达式',
    patternPlaceholder: '输入正则模式，例如 \\d{3}-\\d{4}',
    testLabel: '测试字符串',
    testPlaceholder: '输入要测试的文本...',
    flagGlobal: 'g (全局)',
    flagCase: 'i (忽略大小写)',
    flagMultiline: 'm (多行)',
    flagDotall: 's (DotAll)',
    matchCount: '个匹配',
    matchSingle: '个匹配',
    matchFound: '匹配成功',
    noMatch: '无匹配',
    invalidPattern: '无效模式',
    highlightLabel: '高亮匹配',
    detailsLabel: '匹配详情',
    atIndex: '位置',
    groups: '捕获组',
    introTitle: '免费在线正则表达式测试器',
    introText: '实时测试和调试正则表达式。输入正则模式和测试字符串，即可看到匹配项即时高亮显示。支持 JavaScript 正则语法，包括全局、忽略大小写、多行和 DotAll 标志。',
    cheatTitle: '正则速查表',
    charClass: '字符类',
    anchors: '锚点和边界',
    quantifiers: '量词',
    groupsTitle: '分组与环视',
    commonTitle: '常用正则模式',
    faqTitle: '常见问题',
    faq1q: '如何在线测试正则模式？',
    faq1a: '在上方的模式字段中输入正则表达式，然后输入或粘贴测试字符串。测试器会实时高亮所有匹配项，显示匹配数量、位置和捕获组。您可以切换标志来修改匹配行为。',
    faq2q: '此测试器支持什么正则语法？',
    faq2a: '此正则测试器使用 JavaScript RegExp 引擎，支持类 PCRE 语法，包括字符类（\\d、\\w、\\s）、量词（*、+、?、{n,m}）、锚点（^、$、\\b）、分组和环视。',
    faq3q: '正则标志是什么，何时使用？',
    faq3a: '正则标志修改匹配行为：g（全局）查找所有匹配；i（忽略大小写）；m（多行）使 ^ 和 $ 匹配行边界；s（DotAll）使 . 也匹配换行符。',
    faq4q: '如何用正则匹配电子邮件地址？',
    faq4a: '常用的电子邮件正则模式是：[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}。建议在生产环境中使用专门的邮箱验证库。',
    relatedTitle: '相关正则工具',
  },
  fr: {
    title: 'Testeur Regex en Ligne',
    description: 'Testez des expressions regulieres en ligne avec mise en surbrillance en temps reel et support des groupes de capture.',
    patternLabel: 'Expression Reguliere', patternPlaceholder: 'Entrez un motif regex, ex. \\d{3}-\\d{4}',
    testLabel: 'Texte de test', testPlaceholder: 'Entrez le texte a tester...',
    flagGlobal: 'g (Global)', flagCase: 'i (Insensible a la casse)', flagMultiline: 'm (Multiligne)', flagDotall: 's (DotAll)',
    matchCount: 'correspondances', matchSingle: 'correspondance', matchFound: 'Correspondance trouvee', noMatch: 'Aucune correspondance', invalidPattern: 'Motif invalide',
    highlightLabel: 'Correspondances surlignees', detailsLabel: 'Details des correspondances', atIndex: 'a l\'index', groups: 'Groupes',
    introTitle: 'Testeur Regex gratuit en ligne', introText: 'Testez et deboguez des expressions regulieres en temps reel dans votre navigateur.',
    cheatTitle: 'Aide-memoire Regex', charClass: 'Classes de caracteres', anchors: 'Ancres', quantifiers: 'Quantificateurs', groupsTitle: 'Groupes', commonTitle: 'Motifs regex courants',
    faqTitle: 'Questions frequentes',
    faq1q: 'Comment tester un motif regex en ligne ?', faq1a: 'Entrez votre motif et texte de test. Le testeur surligne les correspondances en temps reel.',
    faq2q: 'Quelle syntaxe regex est supportee ?', faq2a: 'Ce testeur utilise le moteur JavaScript RegExp avec une syntaxe similaire a PCRE.',
    faq3q: 'Que sont les drapeaux regex ?', faq3a: 'Les drapeaux modifient le comportement : g (global), i (insensible a la casse), m (multiligne), s (DotAll).',
    faq4q: 'Comment valider un email avec regex ?', faq4a: 'Utilisez le motif [a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}.',
    relatedTitle: 'Outils Regex connexes',
  },
  de: {
    title: 'Regex Tester Online',
    description: 'Testen Sie regulaere Ausdruecke online mit Echtzeit-Matching und Hervorhebung.',
    patternLabel: 'Regulaerer Ausdruck', patternPlaceholder: 'Regex-Muster eingeben, z.B. \\d{3}-\\d{4}',
    testLabel: 'Testtext', testPlaceholder: 'Text zum Testen eingeben...',
    flagGlobal: 'g (Global)', flagCase: 'i (Gross-/Kleinschreibung)', flagMultiline: 'm (Mehrzeilig)', flagDotall: 's (DotAll)',
    matchCount: 'Treffer', matchSingle: 'Treffer', matchFound: 'Treffer gefunden', noMatch: 'Kein Treffer', invalidPattern: 'Ungueltiges Muster',
    highlightLabel: 'Hervorgehobene Treffer', detailsLabel: 'Trefferdetails', atIndex: 'an Position', groups: 'Gruppen',
    introTitle: 'Kostenloser Online Regex Tester', introText: 'Testen und debuggen Sie regulaere Ausdruecke in Echtzeit in Ihrem Browser.',
    cheatTitle: 'Regex-Spickzettel', charClass: 'Zeichenklassen', anchors: 'Anker', quantifiers: 'Quantifizierer', groupsTitle: 'Gruppen', commonTitle: 'Gaengige Regex-Muster',
    faqTitle: 'Haeufig gestellte Fragen',
    faq1q: 'Wie teste ich ein Regex-Muster online?', faq1a: 'Geben Sie Ihr Muster und Testtext ein. Der Tester hebt Treffer in Echtzeit hervor.',
    faq2q: 'Welche Regex-Syntax wird unterstuetzt?', faq2a: 'Dieser Tester verwendet die JavaScript RegExp-Engine mit PCRE-aehnlicher Syntax.',
    faq3q: 'Was sind Regex-Flags?', faq3a: 'Flags aendern das Verhalten: g (global), i (Gross-/Kleinschreibung ignorieren), m (mehrzeilig), s (DotAll).',
    faq4q: 'Wie validiert man eine E-Mail mit Regex?', faq4a: 'Verwenden Sie [a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}.',
    relatedTitle: 'Verwandte Regex-Tools',
  },
  es: {
    title: 'Regex Tester Online',
    description: 'Prueba expresiones regulares en linea con coincidencias en tiempo real y resaltado.',
    patternLabel: 'Expresion Regular', patternPlaceholder: 'Introduce un patron regex, ej. \\d{3}-\\d{4}',
    testLabel: 'Texto de prueba', testPlaceholder: 'Introduce texto para probar...',
    flagGlobal: 'g (Global)', flagCase: 'i (Sin distincion)', flagMultiline: 'm (Multilinea)', flagDotall: 's (DotAll)',
    matchCount: 'coincidencias', matchSingle: 'coincidencia', matchFound: 'Coincidencia encontrada', noMatch: 'Sin coincidencia', invalidPattern: 'Patron invalido',
    highlightLabel: 'Coincidencias resaltadas', detailsLabel: 'Detalles', atIndex: 'en indice', groups: 'Grupos',
    introTitle: 'Tester Regex gratuito en linea', introText: 'Prueba y depura expresiones regulares en tiempo real en tu navegador.',
    cheatTitle: 'Hoja de trucos Regex', charClass: 'Clases de caracteres', anchors: 'Anclas', quantifiers: 'Cuantificadores', groupsTitle: 'Grupos', commonTitle: 'Patrones regex comunes',
    faqTitle: 'Preguntas frecuentes',
    faq1q: 'Como probar un patron regex en linea?', faq1a: 'Introduce tu patron y texto de prueba. El tester resalta coincidencias en tiempo real.',
    faq2q: 'Que sintaxis regex se soporta?', faq2a: 'Este tester usa el motor JavaScript RegExp con sintaxis similar a PCRE.',
    faq3q: 'Que son las banderas regex?', faq3a: 'Las banderas modifican el comportamiento: g (global), i (sin distincion), m (multilinea), s (DotAll).',
    faq4q: 'Como validar un email con regex?', faq4a: 'Usa [a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}.',
    relatedTitle: 'Herramientas Regex relacionadas',
  },
  ja: {
    title: '正規表現テスター オンライン',
    description: 'リアルタイムマッチングとハイライト付きで正規表現をオンラインテスト。JavaScript、Python正規表現を即座にテスト。',
    patternLabel: '正規表現', patternPlaceholder: '正規表現パターンを入力（例: \\d{3}-\\d{4}）',
    testLabel: 'テスト文字列', testPlaceholder: 'テストするテキストを入力...',
    flagGlobal: 'g (グローバル)', flagCase: 'i (大文字小文字無視)', flagMultiline: 'm (複数行)', flagDotall: 's (DotAll)',
    matchCount: '件のマッチ', matchSingle: '件のマッチ', matchFound: 'マッチあり', noMatch: 'マッチなし', invalidPattern: '無効なパターン',
    highlightLabel: 'ハイライト表示', detailsLabel: 'マッチ詳細', atIndex: '位置', groups: 'グループ',
    introTitle: '無料オンライン正規表現テスター', introText: 'ブラウザでリアルタイムに正規表現をテスト・デバッグ。',
    cheatTitle: '正規表現チートシート', charClass: '文字クラス', anchors: 'アンカー', quantifiers: '量指定子', groupsTitle: 'グループ', commonTitle: '一般的なパターン',
    faqTitle: 'よくある質問',
    faq1q: 'オンラインで正規表現をテストするには？', faq1a: 'パターンとテストテキストを入力してください。テスターがリアルタイムでマッチをハイライトします。',
    faq2q: 'どの正規表現構文に対応？', faq2a: 'このテスターはJavaScript RegExpエンジンを使用し、PCRE互換の構文に対応しています。',
    faq3q: '正規表現フラグとは？', faq3a: 'フラグは動作を変更します：g（グローバル）、i（大文字小文字無視）、m（複数行）、s（DotAll）。',
    faq4q: '正規表現でメールを検証するには？', faq4a: '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,} を使用します。',
    relatedTitle: '関連ツール',
  },
  ko: {
    title: '정규식 테스터 온라인',
    description: '실시간 매칭과 하이라이팅으로 정규 표현식을 온라인 테스트. JavaScript, Python 정규식을 즉시 테스트합니다.',
    patternLabel: '정규 표현식', patternPlaceholder: '정규식 패턴 입력 (예: \\d{3}-\\d{4})',
    testLabel: '테스트 문자열', testPlaceholder: '테스트할 텍스트를 입력하세요...',
    flagGlobal: 'g (전역)', flagCase: 'i (대소문자 무시)', flagMultiline: 'm (멀티라인)', flagDotall: 's (DotAll)',
    matchCount: '개 매칭', matchSingle: '개 매칭', matchFound: '매칭 발견', noMatch: '매칭 없음', invalidPattern: '잘못된 패턴',
    highlightLabel: '하이라이트된 매칭', detailsLabel: '매칭 상세', atIndex: '위치', groups: '그룹',
    introTitle: '무료 온라인 정규식 테스터', introText: '브라우저에서 실시간으로 정규 표현식을 테스트하고 디버깅합니다.',
    cheatTitle: '정규식 치트시트', charClass: '문자 클래스', anchors: '앵커', quantifiers: '수량자', groupsTitle: '그룹', commonTitle: '일반적인 패턴',
    faqTitle: '자주 묻는 질문',
    faq1q: '온라인에서 정규식을 테스트하는 방법은?', faq1a: '패턴과 테스트 텍스트를 입력하세요. 테스터가 실시간으로 매칭을 하이라이트합니다.',
    faq2q: '어떤 정규식 문법을 지원하나요?', faq2a: '이 테스터는 JavaScript RegExp 엔진을 사용하며 PCRE 호환 문법을 지원합니다.',
    faq3q: '정규식 플래그란?', faq3a: '플래그는 동작을 변경합니다: g(전역), i(대소문자 무시), m(멀티라인), s(DotAll).',
    faq4q: '정규식으로 이메일을 검증하는 방법은?', faq4a: '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}를 사용합니다.',
    relatedTitle: '관련 정규식 도구',
  },
};

const commonPatterns = [
  { name: 'Email', pattern: '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}' },
  { name: 'URL', pattern: 'https?:\\/\\/[\\w\\-._~:/?#\\[\\]@!$&\'()*+,;=%]+' },
  { name: 'Phone (US)', pattern: '\\(?\\d{3}\\)?[-.\\s]?\\d{3}[-.\\s]?\\d{4}' },
  { name: 'IPv4', pattern: '\\b\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\b' },
  { name: 'Date (YYYY-MM-DD)', pattern: '\\d{4}-(?:0[1-9]|1[0-2])-(?:0[1-9]|[12]\\d|3[01])' },
  { name: 'Hex Color', pattern: '#[0-9A-Fa-f]{3,8}' },
];

const cheatData = {
  charClass: [
    ['.', 'Any character'], ['\\d', 'Digit [0-9]'], ['\\D', 'Non-digit'],
    ['\\w', 'Word [a-zA-Z0-9_]'], ['\\W', 'Non-word'], ['\\s', 'Whitespace'], ['\\S', 'Non-whitespace'],
    ['[abc]', 'a, b, or c'], ['[^abc]', 'Not a, b, c'], ['[a-z]', 'Range a-z'],
  ],
  anchors: [
    ['^', 'Start of string/line'], ['$', 'End of string/line'], ['\\b', 'Word boundary'], ['\\B', 'Non-word boundary'],
  ],
  quantifiers: [
    ['*', '0 or more'], ['+', '1 or more'], ['?', '0 or 1'],
    ['{n}', 'Exactly n'], ['{n,}', 'n or more'], ['{n,m}', 'n to m'],
    ['*?', '0+ (lazy)'], ['+?', '1+ (lazy)'],
  ],
  groups: [
    ['(abc)', 'Capture group'], ['(?:abc)', 'Non-capturing'], ['a|b', 'Alternation'],
    ['(?=abc)', 'Positive lookahead'], ['(?!abc)', 'Negative lookahead'],
    ['(?<=abc)', 'Positive lookbehind'], ['(?<!abc)', 'Negative lookbehind'],
  ],
};

interface Match {
  text: string;
  index: number;
  groups: string[];
}

export default function RegexTesterOnline() {
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

  const matches = useMemo((): Match[] => {
    if (!pattern || !testStr) { setError(''); return []; }
    try {
      const regex = new RegExp(pattern, flags);
      setError('');
      const results: Match[] = [];
      if (flags.includes('g')) {
        let match;
        while ((match = regex.exec(testStr)) !== null) {
          results.push({ text: match[0], index: match.index, groups: match.slice(1) });
          if (!match[0]) break;
        }
      } else {
        const match = regex.exec(testStr);
        if (match) {
          results.push({ text: match[0], index: match.index, groups: match.slice(1) });
        }
      }
      return results;
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : t.invalidPattern);
      return [];
    }
  }, [pattern, flags, testStr, t.invalidPattern]);

  const highlightedParts = useMemo(() => {
    if (!pattern || !testStr || error) return null;
    try {
      const regex = new RegExp(pattern, flags.includes('g') ? flags : flags + 'g');
      const parts: { text: string; isMatch: boolean }[] = [];
      let lastIndex = 0;
      let match;
      while ((match = regex.exec(testStr)) !== null) {
        if (match.index > lastIndex) parts.push({ text: testStr.slice(lastIndex, match.index), isMatch: false });
        parts.push({ text: match[0], isMatch: true });
        lastIndex = match.index + match[0].length;
        if (!match[0]) break;
      }
      if (lastIndex < testStr.length) parts.push({ text: testStr.slice(lastIndex), isMatch: false });
      return parts.length > 0 ? parts : null;
    } catch { return null; }
  }, [pattern, flags, testStr, error]);

  const statusColor = error ? 'var(--accent-rose)' : matches.length > 0 ? 'var(--accent-emerald)' : 'var(--text-secondary)';
  const statusText = error ? t.invalidPattern : matches.length > 0
    ? `${matches.length} ${matches.length > 1 ? t.matchCount : t.matchSingle} - ${t.matchFound}`
    : (pattern && testStr ? t.noMatch : '');

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
    <ToolLayout title={t.title} description={t.description} toolId="regex-tester-online">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* Pattern */}
      <div style={{ marginBottom: 16 }}>
        <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 8 }}>{t.patternLabel}</label>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <span style={{ fontSize: 18, color: 'var(--text-secondary)' }}>/</span>
          <input type="text" value={pattern} onChange={e => setPattern(e.target.value)}
            placeholder={t.patternPlaceholder} style={{ flex: 1, fontFamily: 'monospace' }} />
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

      {/* Status */}
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
        <textarea value={testStr} onChange={e => setTestStr(e.target.value)}
          placeholder={t.testPlaceholder} style={{ minHeight: 150, fontFamily: 'monospace' }} />
      </div>

      {/* Highlighted */}
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
                background: part.isMatch ? 'rgba(59,130,246,0.3)' : 'transparent',
                borderRadius: part.isMatch ? 3 : 0,
                padding: part.isMatch ? '1px 2px' : 0,
                borderBottom: part.isMatch ? '2px solid var(--accent-blue)' : 'none',
              }}>{part.text}</span>
            ))}
          </div>
        </div>
      )}

      {/* Match Details */}
      {matches.length > 0 && (
        <div style={{ marginBottom: 16 }}>
          <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 8 }}>{t.detailsLabel}</label>
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
                  <span style={{ color: 'var(--text-secondary)' }}> {t.atIndex} {m.index}</span>
                  {m.groups.length > 0 && (
                    <span style={{ color: 'var(--accent-emerald)' }}> {t.groups}: [{m.groups.join(', ')}]</span>
                  )}
                </span>
                <CopyButton text={m.text} />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SEO Content */}
      <div style={{ marginTop: 30, paddingTop: 24, borderTop: '1px solid var(--border-color)' }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 12 }}>{t.introTitle}</h2>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 20 }}>{t.introText}</p>

        {/* Common patterns */}
        <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{t.commonTitle}</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 24 }}>
          {commonPatterns.map(cp => (
            <button key={cp.name} onClick={() => setPattern(cp.pattern)}
              style={{
                padding: '6px 14px', borderRadius: 6, border: '1px solid var(--border-color)',
                background: 'var(--bg-input)', fontSize: 12, cursor: 'pointer', color: 'var(--text-primary)',
              }}>
              {cp.name}
            </button>
          ))}
        </div>

        {/* Cheat sheet */}
        <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{t.cheatTitle}</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 }}>
          {Object.entries({ [t.charClass]: cheatData.charClass, [t.anchors]: cheatData.anchors, [t.quantifiers]: cheatData.quantifiers, [t.groupsTitle]: cheatData.groups }).map(([label, data]) => (
            <div key={label}>
              <h4 style={{ fontSize: 13, fontWeight: 600, marginBottom: 6, color: 'var(--accent-blue)' }}>{label}</h4>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
                <tbody>
                  {data.map(([sym, desc], i) => (
                    <tr key={i} style={{ borderBottom: '1px solid var(--border-color)' }}>
                      <td style={{ padding: '4px 8px', fontFamily: 'monospace', fontWeight: 600, color: 'var(--accent-emerald)', whiteSpace: 'nowrap' }}>{sym}</td>
                      <td style={{ padding: '4px 8px', color: 'var(--text-secondary)' }}>{desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>

        {/* FAQ */}
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

        {/* Related Tools */}
        <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{t.relatedTitle}</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {[
            { href: `/${lang}/tools/regex-tester`, label: 'Regex Tester' },
            { href: `/${lang}/tools/regex-checker`, label: 'Regex Checker' },
            { href: `/${lang}/tools/regex-matcher`, label: 'Regex Matcher' },
            { href: `/${lang}/tools/regex-generator`, label: 'Regex Generator' },
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
