'use client';

import { useState, useMemo } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import Link from 'next/link';
import { useLang } from '@/i18n/LangContext';

/* ── i18n strings (7 langs) ───────────────────────────────────── */
const ui: Record<string, Record<string, string>> = {
  en: {
    title: 'Regex Matcher',
    description: 'Find all regex matches in text with capture groups, named groups, and match positions. Detailed match table for every result.',
    patternLabel: 'Regex Pattern',
    patternPlaceholder: 'Enter regex with groups, e.g. (\\w+)@(\\w+\\.\\w+)',
    testLabel: 'Test String',
    testPlaceholder: 'Enter text to find all matches...',
    flagGlobal: 'g (Global)',
    flagCase: 'i (Case-insensitive)',
    flagMultiline: 'm (Multiline)',
    flagDotall: 's (DotAll)',
    invalidPattern: 'Invalid regex pattern',
    noMatches: 'No matches found',
    matchTableTitle: 'All Matches',
    colMatch: 'Match #',
    colFull: 'Full Match',
    colGroups: 'Groups',
    colPosition: 'Position',
    colLength: 'Length',
    groupNum: 'Group',
    namedGroup: 'Named',
    totalMatches: 'Total matches',
    cheatTitle: 'Capture Group Reference',
    cheatNumbered: 'Numbered Groups',
    cheatNamed: 'Named Groups',
    cheatNonCapture: 'Non-Capturing & Assertions',
    relatedTitle: 'Related Regex Tools',
    faqTitle: 'Frequently Asked Questions',
    faq1q: 'What are capture groups in regex?',
    faq1a: 'Capture groups are portions of a regex pattern enclosed in parentheses (...) that extract specific parts of a match. When a regex matches text, each capture group stores the text it matched separately. For example, the pattern (\\d{4})-(\\d{2})-(\\d{2}) matching "2024-01-15" creates three groups: "2024", "01", and "15". Groups are numbered starting from 1 based on the position of the opening parenthesis.',
    faq2q: 'What is the difference between named and numbered groups?',
    faq2a: 'Numbered groups are accessed by their position (Group 1, Group 2, etc.) and are created with simple parentheses (...). Named groups use the syntax (?<name>...) and can be accessed by name (e.g., groups.name in JavaScript). Named groups make regex more readable and maintainable, especially with many groups. Both types can be used simultaneously.',
    faq3q: 'How to extract data with regex capture groups?',
    faq3a: 'Use capture groups to define which parts of the pattern you want to extract. In JavaScript, use string.match(regex) for a single match or string.matchAll(regex) for all matches. Each match result contains an array where index 0 is the full match and subsequent indices are the captured groups. Named groups are available in match.groups object.',
  },
  zh: {
    title: '正则匹配器',
    description: '在文本中查找所有正则匹配，包含捕获组、命名组和匹配位置。每个结果都有详细的匹配表格。',
    patternLabel: '正则模式',
    patternPlaceholder: '输入带分组的正则，例如 (\\w+)@(\\w+\\.\\w+)',
    testLabel: '测试字符串',
    testPlaceholder: '输入要匹配的文本...',
    flagGlobal: 'g (全局)',
    flagCase: 'i (忽略大小写)',
    flagMultiline: 'm (多行)',
    flagDotall: 's (DotAll)',
    invalidPattern: '无效的正则模式',
    noMatches: '未找到匹配',
    matchTableTitle: '所有匹配',
    colMatch: '匹配 #',
    colFull: '完整匹配',
    colGroups: '分组',
    colPosition: '位置',
    colLength: '长度',
    groupNum: '分组',
    namedGroup: '命名',
    totalMatches: '匹配总数',
    cheatTitle: '捕获组参考',
    cheatNumbered: '编号分组',
    cheatNamed: '命名分组',
    cheatNonCapture: '非捕获组与断言',
    relatedTitle: '相关正则工具',
    faqTitle: '常见问题',
    faq1q: '什么是正则捕获组？',
    faq1a: '捕获组是正则模式中括号 (...) 包围的部分，用于提取匹配的特定部分。例如，模式 (\\d{4})-(\\d{2})-(\\d{2}) 匹配 "2024-01-15" 时创建三个组："2024"、"01"、"15"。组从1开始按左括号位置编号。',
    faq2q: '命名分组和编号分组有什么区别？',
    faq2a: '编号分组通过位置访问（组1、组2等），用简单括号 (...) 创建。命名分组使用语法 (?<名称>...)，可以通过名称访问。命名分组使正则更可读和可维护，特别是在有多个分组时。两种类型可以同时使用。',
    faq3q: '如何使用正则捕获组提取数据？',
    faq3a: '使用捕获组定义要提取的模式部分。在 JavaScript 中，使用 string.match(regex) 获取单个匹配或 string.matchAll(regex) 获取所有匹配。每个匹配结果包含一个数组，索引0是完整匹配，后续索引是捕获的分组。命名分组可通过 match.groups 对象访问。',
  },
  fr: {
    title: 'Regex Matcher',
    description: 'Trouvez toutes les correspondances regex avec groupes de capture, groupes nommes et positions.',
    patternLabel: 'Motif Regex',
    patternPlaceholder: 'Entrez regex avec groupes, ex. (\\w+)@(\\w+\\.\\w+)',
    testLabel: 'Texte de test',
    testPlaceholder: 'Entrez le texte pour trouver les correspondances...',
    flagGlobal: 'g (Global)',
    flagCase: 'i (Insensible)',
    flagMultiline: 'm (Multiligne)',
    flagDotall: 's (DotAll)',
    invalidPattern: 'Motif regex invalide',
    noMatches: 'Aucune correspondance',
    matchTableTitle: 'Toutes les correspondances',
    colMatch: 'Corr. #',
    colFull: 'Correspondance complete',
    colGroups: 'Groupes',
    colPosition: 'Position',
    colLength: 'Longueur',
    groupNum: 'Groupe',
    namedGroup: 'Nomme',
    totalMatches: 'Total correspondances',
    cheatTitle: 'Reference des groupes de capture',
    cheatNumbered: 'Groupes numerotes',
    cheatNamed: 'Groupes nommes',
    cheatNonCapture: 'Non-capturant et assertions',
    relatedTitle: 'Outils Regex connexes',
    faqTitle: 'Questions frequentes',
    faq1q: 'Que sont les groupes de capture en regex ?',
    faq1a: 'Les groupes de capture sont des portions de motif regex entre parentheses (...) qui extraient des parties specifiques. Chaque groupe stocke separement le texte correspondant.',
    faq2q: 'Difference entre groupes nommes et numerotes ?',
    faq2a: 'Les groupes numerotes sont acces par position. Les groupes nommes utilisent (?<nom>...) et sont accessibles par nom. Les deux peuvent etre combines.',
    faq3q: 'Comment extraire des donnees avec les groupes de capture ?',
    faq3a: 'Utilisez string.match(regex) ou string.matchAll(regex) en JavaScript. Le resultat contient la correspondance complete et les groupes captures.',
  },
  de: {
    title: 'Regex Matcher',
    description: 'Finden Sie alle Regex-Treffer mit Capture Groups, benannten Gruppen und Positionen.',
    patternLabel: 'Regex-Muster',
    patternPlaceholder: 'Regex mit Gruppen eingeben, z.B. (\\w+)@(\\w+\\.\\w+)',
    testLabel: 'Testtext',
    testPlaceholder: 'Text zum Suchen eingeben...',
    flagGlobal: 'g (Global)',
    flagCase: 'i (Gross-/Kleinschreibung)',
    flagMultiline: 'm (Mehrzeilig)',
    flagDotall: 's (DotAll)',
    invalidPattern: 'Ungueltiges Regex-Muster',
    noMatches: 'Keine Treffer gefunden',
    matchTableTitle: 'Alle Treffer',
    colMatch: 'Treffer #',
    colFull: 'Vollstaendiger Treffer',
    colGroups: 'Gruppen',
    colPosition: 'Position',
    colLength: 'Laenge',
    groupNum: 'Gruppe',
    namedGroup: 'Benannt',
    totalMatches: 'Treffer gesamt',
    cheatTitle: 'Capture Group Referenz',
    cheatNumbered: 'Nummerierte Gruppen',
    cheatNamed: 'Benannte Gruppen',
    cheatNonCapture: 'Nicht-erfassend & Assertions',
    relatedTitle: 'Verwandte Regex-Tools',
    faqTitle: 'Haeufig gestellte Fragen',
    faq1q: 'Was sind Capture Groups in Regex?',
    faq1a: 'Capture Groups sind Teile eines Regex-Musters in Klammern (...), die bestimmte Teile eines Treffers extrahieren. Jede Gruppe speichert den gefundenen Text separat.',
    faq2q: 'Unterschied zwischen benannten und nummerierten Gruppen?',
    faq2a: 'Nummerierte Gruppen werden ueber Position angesprochen. Benannte Gruppen verwenden (?<name>...) und sind ueber Namen zugaenglich. Beide koennen kombiniert werden.',
    faq3q: 'Wie extrahiert man Daten mit Capture Groups?',
    faq3a: 'Verwenden Sie string.match(regex) oder string.matchAll(regex) in JavaScript. Das Ergebnis enthaelt den vollstaendigen Treffer und die erfassten Gruppen.',
  },
  es: {
    title: 'Regex Matcher',
    description: 'Encuentra todas las coincidencias regex con grupos de captura, grupos nombrados y posiciones.',
    patternLabel: 'Patron Regex',
    patternPlaceholder: 'Introduce regex con grupos, ej. (\\w+)@(\\w+\\.\\w+)',
    testLabel: 'Texto de prueba',
    testPlaceholder: 'Introduce texto para buscar...',
    flagGlobal: 'g (Global)',
    flagCase: 'i (Sin distincion)',
    flagMultiline: 'm (Multilinea)',
    flagDotall: 's (DotAll)',
    invalidPattern: 'Patron regex invalido',
    noMatches: 'Sin coincidencias',
    matchTableTitle: 'Todas las coincidencias',
    colMatch: 'Coinc. #',
    colFull: 'Coincidencia completa',
    colGroups: 'Grupos',
    colPosition: 'Posicion',
    colLength: 'Longitud',
    groupNum: 'Grupo',
    namedGroup: 'Nombrado',
    totalMatches: 'Total coincidencias',
    cheatTitle: 'Referencia de grupos de captura',
    cheatNumbered: 'Grupos numerados',
    cheatNamed: 'Grupos nombrados',
    cheatNonCapture: 'No capturantes y aserciones',
    relatedTitle: 'Herramientas Regex relacionadas',
    faqTitle: 'Preguntas frecuentes',
    faq1q: 'Que son los grupos de captura en regex?',
    faq1a: 'Los grupos de captura son porciones de un patron regex entre parentesis (...) que extraen partes especificas de una coincidencia. Cada grupo almacena el texto coincidente por separado.',
    faq2q: 'Diferencia entre grupos nombrados y numerados?',
    faq2a: 'Los grupos numerados se acceden por posicion. Los grupos nombrados usan (?<nombre>...) y se acceden por nombre. Ambos pueden combinarse.',
    faq3q: 'Como extraer datos con grupos de captura?',
    faq3a: 'Use string.match(regex) o string.matchAll(regex) en JavaScript. El resultado contiene la coincidencia completa y los grupos capturados.',
  },
  ja: {
    title: '正規表現マッチャー',
    description: 'キャプチャグループ、名前付きグループ、位置情報と共に全正規表現マッチを検索します。',
    patternLabel: '正規表現パターン',
    patternPlaceholder: 'グループ付き正規表現を入力（例: (\\w+)@(\\w+\\.\\w+)）',
    testLabel: 'テスト文字列',
    testPlaceholder: 'マッチを検索するテキストを入力...',
    flagGlobal: 'g (グローバル)',
    flagCase: 'i (大文字小文字無視)',
    flagMultiline: 'm (複数行)',
    flagDotall: 's (DotAll)',
    invalidPattern: '無効な正規表現パターン',
    noMatches: 'マッチが見つかりません',
    matchTableTitle: '全マッチ',
    colMatch: 'マッチ #',
    colFull: '完全マッチ',
    colGroups: 'グループ',
    colPosition: '位置',
    colLength: '長さ',
    groupNum: 'グループ',
    namedGroup: '名前付き',
    totalMatches: 'マッチ合計',
    cheatTitle: 'キャプチャグループリファレンス',
    cheatNumbered: '番号付きグループ',
    cheatNamed: '名前付きグループ',
    cheatNonCapture: '非キャプチャとアサーション',
    relatedTitle: '関連ツール',
    faqTitle: 'よくある質問',
    faq1q: 'キャプチャグループとは？',
    faq1a: 'キャプチャグループは正規表現パターンの括弧 (...) で囲まれた部分で、マッチの特定部分を抽出します。各グループは一致したテキストを個別に保存します。',
    faq2q: '名前付きグループと番号付きグループの違いは？',
    faq2a: '番号付きグループは位置でアクセスします。名前付きグループは (?<名前>...) を使用し、名前でアクセスできます。両方を組み合わせて使用できます。',
    faq3q: 'キャプチャグループでデータを抽出するには？',
    faq3a: 'JavaScriptで string.match(regex) または string.matchAll(regex) を使用します。結果には完全なマッチとキャプチャされたグループが含まれます。',
  },
  ko: {
    title: '정규식 매처',
    description: '캡처 그룹, 명명된 그룹, 매칭 위치와 함께 모든 정규식 매칭을 찾습니다.',
    patternLabel: '정규식 패턴',
    patternPlaceholder: '그룹이 포함된 정규식 입력 (예: (\\w+)@(\\w+\\.\\w+))',
    testLabel: '테스트 문자열',
    testPlaceholder: '매칭을 찾을 텍스트를 입력하세요...',
    flagGlobal: 'g (전역)',
    flagCase: 'i (대소문자 무시)',
    flagMultiline: 'm (멀티라인)',
    flagDotall: 's (DotAll)',
    invalidPattern: '잘못된 정규식 패턴',
    noMatches: '매칭 없음',
    matchTableTitle: '모든 매칭',
    colMatch: '매칭 #',
    colFull: '전체 매칭',
    colGroups: '그룹',
    colPosition: '위치',
    colLength: '길이',
    groupNum: '그룹',
    namedGroup: '명명된',
    totalMatches: '전체 매칭 수',
    cheatTitle: '캡처 그룹 참조',
    cheatNumbered: '번호 그룹',
    cheatNamed: '명명된 그룹',
    cheatNonCapture: '비캡처 및 어서션',
    relatedTitle: '관련 정규식 도구',
    faqTitle: '자주 묻는 질문',
    faq1q: '정규식 캡처 그룹이란?',
    faq1a: '캡처 그룹은 정규식 패턴에서 괄호 (...)로 둘러싸인 부분으로, 매칭의 특정 부분을 추출합니다. 각 그룹은 매칭된 텍스트를 별도로 저장합니다.',
    faq2q: '명명된 그룹과 번호 그룹의 차이는?',
    faq2a: '번호 그룹은 위치로 접근합니다. 명명된 그룹은 (?<이름>...)을 사용하고 이름으로 접근할 수 있습니다. 둘 다 함께 사용할 수 있습니다.',
    faq3q: '캡처 그룹으로 데이터를 추출하는 방법은?',
    faq3a: 'JavaScript에서 string.match(regex) 또는 string.matchAll(regex)를 사용합니다. 결과에는 전체 매칭과 캡처된 그룹이 포함됩니다.',
  },
};

/* ── Cheat sheet data ─────────────────────────────────────────── */
const cheatNumberedData = [
  ['(abc)', 'Capturing group #1', 'Captures "abc"'],
  ['(a)(b)(c)', 'Three groups', 'Group 1="a", 2="b", 3="c"'],
  ['(\\d+)-(\\d+)', 'Two number groups', '"123-456" -> Group 1="123", 2="456"'],
  ['\\1, \\2', 'Backreference', 'Refers to group 1 and 2'],
];

const cheatNamedData = [
  ['(?<year>\\d{4})', 'Named group "year"', 'Access via groups.year'],
  ['(?<name>\\w+)', 'Named group "name"', 'Access via groups.name'],
  ['\\k<year>', 'Named backreference', 'Refers to named group "year"'],
];

const cheatNonCaptureData = [
  ['(?:abc)', 'Non-capturing group', 'Groups but does not capture'],
  ['(?=abc)', 'Positive lookahead', 'Asserts "abc" follows'],
  ['(?!abc)', 'Negative lookahead', 'Asserts "abc" does not follow'],
  ['(?<=abc)', 'Positive lookbehind', 'Asserts "abc" precedes'],
  ['(?<!abc)', 'Negative lookbehind', 'Asserts "abc" does not precede'],
];

interface DetailedMatch {
  fullMatch: string;
  index: number;
  length: number;
  groups: { name: string | null; value: string }[];
}

export default function RegexMatcher() {
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

  const matches = useMemo((): DetailedMatch[] => {
    if (!pattern || !testStr) { setError(''); return []; }
    try {
      const regex = new RegExp(pattern, flags.includes('g') ? flags : flags + 'g');
      setError('');
      const results: DetailedMatch[] = [];
      let match;
      while ((match = regex.exec(testStr)) !== null) {
        const groups: { name: string | null; value: string }[] = [];
        // Numbered groups
        for (let i = 1; i < match.length; i++) {
          groups.push({ name: null, value: match[i] ?? '' });
        }
        // Named groups
        if (match.groups) {
          const namedKeys = Object.keys(match.groups);
          for (const key of namedKeys) {
            // Find if already added as numbered and tag the name
            const val = match.groups[key] ?? '';
            const existingIdx = groups.findIndex(g => g.value === val && g.name === null);
            if (existingIdx !== -1) {
              groups[existingIdx].name = key;
            }
          }
        }
        results.push({
          fullMatch: match[0],
          index: match.index,
          length: match[0].length,
          groups,
        });
        if (!match[0]) break;
      }
      return results;
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : t.invalidPattern);
      return [];
    }
  }, [pattern, flags, testStr, t.invalidPattern]);

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
    <ToolLayout title={t.title} description={t.description} toolId="regex-matcher">
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

      {/* Error */}
      {error && (
        <div style={{
          background: 'rgba(244,63,94,0.1)', border: '1px solid rgba(244,63,94,0.3)',
          borderRadius: 8, padding: '10px 14px', marginBottom: 16, fontSize: 13, color: 'var(--accent-rose)', fontWeight: 600,
        }}>
          {'\u2715'} {error}
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

      {/* Match Summary */}
      {pattern && testStr && !error && (
        <div style={{
          background: matches.length > 0 ? 'rgba(16,185,129,0.1)' : 'var(--bg-input)',
          border: `1px solid ${matches.length > 0 ? 'rgba(16,185,129,0.3)' : 'var(--border-color)'}`,
          borderRadius: 8, padding: '10px 14px', marginBottom: 16, fontSize: 13, fontWeight: 600,
          color: matches.length > 0 ? 'var(--accent-emerald)' : 'var(--text-secondary)',
        }}>
          {matches.length > 0 ? `${t.totalMatches}: ${matches.length}` : t.noMatches}
        </div>
      )}

      {/* Match Table */}
      {matches.length > 0 && (
        <div style={{ marginBottom: 16 }}>
          <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 8 }}>{t.matchTableTitle}</label>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--border-color)', background: 'var(--bg-input)' }}>
                  <th style={{ padding: '8px 10px', textAlign: 'left', whiteSpace: 'nowrap' }}>{t.colMatch}</th>
                  <th style={{ padding: '8px 10px', textAlign: 'left' }}>{t.colFull}</th>
                  <th style={{ padding: '8px 10px', textAlign: 'left' }}>{t.colGroups}</th>
                  <th style={{ padding: '8px 10px', textAlign: 'center', whiteSpace: 'nowrap' }}>{t.colPosition}</th>
                  <th style={{ padding: '8px 10px', textAlign: 'center', whiteSpace: 'nowrap' }}>{t.colLength}</th>
                </tr>
              </thead>
              <tbody>
                {matches.map((m, idx) => (
                  <tr key={idx} style={{ borderBottom: '1px solid var(--border-color)' }}>
                    <td style={{ padding: '8px 10px', fontWeight: 600, color: 'var(--text-secondary)', fontFamily: 'monospace' }}>{idx + 1}</td>
                    <td style={{ padding: '8px 10px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <code style={{ color: 'var(--accent-blue)', fontSize: 12, background: 'rgba(59,130,246,0.1)', padding: '2px 6px', borderRadius: 4, wordBreak: 'break-all' }}>
                          {m.fullMatch}
                        </code>
                        <CopyButton text={m.fullMatch} />
                      </div>
                    </td>
                    <td style={{ padding: '8px 10px' }}>
                      {m.groups.length > 0 ? (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                          {m.groups.map((g, gi) => (
                            <div key={gi} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                              <span style={{ fontSize: 11, color: 'var(--text-secondary)', minWidth: 55 }}>
                                {t.groupNum} {gi + 1}{g.name ? ` (${g.name})` : ''}:
                              </span>
                              <code style={{ color: 'var(--accent-emerald)', fontSize: 11, background: 'rgba(16,185,129,0.1)', padding: '1px 4px', borderRadius: 3 }}>
                                {g.value || '(empty)'}
                              </code>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <span style={{ color: 'var(--text-secondary)', fontSize: 11 }}>-</span>
                      )}
                    </td>
                    <td style={{ padding: '8px 10px', textAlign: 'center', fontFamily: 'monospace', color: 'var(--text-secondary)' }}>{m.index}</td>
                    <td style={{ padding: '8px 10px', textAlign: 'center', fontFamily: 'monospace', color: 'var(--text-secondary)' }}>{m.length}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ── Cheat Sheet ──────────────────────────────────────── */}
      <div style={{ marginTop: 30, paddingTop: 24, borderTop: '1px solid var(--border-color)' }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16 }}>{t.cheatTitle}</h2>

        {/* Numbered Groups */}
        <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 8, color: 'var(--accent-blue)' }}>{t.cheatNumbered}</h3>
        <div style={{ overflowX: 'auto', marginBottom: 20 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--border-color)' }}>
                <th style={{ padding: '6px 10px', textAlign: 'left' }}>Pattern</th>
                <th style={{ padding: '6px 10px', textAlign: 'left' }}>Description</th>
                <th style={{ padding: '6px 10px', textAlign: 'left' }}>Example</th>
              </tr>
            </thead>
            <tbody>
              {cheatNumberedData.map(([pat, desc, ex], i) => (
                <tr key={i} style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '6px 10px', fontFamily: 'monospace', fontWeight: 600, color: 'var(--accent-emerald)', whiteSpace: 'nowrap' }}>{pat}</td>
                  <td style={{ padding: '6px 10px', color: 'var(--text-secondary)' }}>{desc}</td>
                  <td style={{ padding: '6px 10px', color: 'var(--text-secondary)', fontFamily: 'monospace', fontSize: 11 }}>{ex}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Named Groups */}
        <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 8, color: 'var(--accent-blue)' }}>{t.cheatNamed}</h3>
        <div style={{ overflowX: 'auto', marginBottom: 20 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--border-color)' }}>
                <th style={{ padding: '6px 10px', textAlign: 'left' }}>Pattern</th>
                <th style={{ padding: '6px 10px', textAlign: 'left' }}>Description</th>
                <th style={{ padding: '6px 10px', textAlign: 'left' }}>Example</th>
              </tr>
            </thead>
            <tbody>
              {cheatNamedData.map(([pat, desc, ex], i) => (
                <tr key={i} style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '6px 10px', fontFamily: 'monospace', fontWeight: 600, color: 'var(--accent-emerald)', whiteSpace: 'nowrap' }}>{pat}</td>
                  <td style={{ padding: '6px 10px', color: 'var(--text-secondary)' }}>{desc}</td>
                  <td style={{ padding: '6px 10px', color: 'var(--text-secondary)', fontFamily: 'monospace', fontSize: 11 }}>{ex}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Non-Capturing & Assertions */}
        <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 8, color: 'var(--accent-blue)' }}>{t.cheatNonCapture}</h3>
        <div style={{ overflowX: 'auto', marginBottom: 24 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--border-color)' }}>
                <th style={{ padding: '6px 10px', textAlign: 'left' }}>Pattern</th>
                <th style={{ padding: '6px 10px', textAlign: 'left' }}>Description</th>
                <th style={{ padding: '6px 10px', textAlign: 'left' }}>Behavior</th>
              </tr>
            </thead>
            <tbody>
              {cheatNonCaptureData.map(([pat, desc, ex], i) => (
                <tr key={i} style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '6px 10px', fontFamily: 'monospace', fontWeight: 600, color: 'var(--accent-emerald)', whiteSpace: 'nowrap' }}>{pat}</td>
                  <td style={{ padding: '6px 10px', color: 'var(--text-secondary)' }}>{desc}</td>
                  <td style={{ padding: '6px 10px', color: 'var(--text-secondary)', fontSize: 11 }}>{ex}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

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
            { href: `/${lang}/tools/regex-checker`, label: 'Regex Checker' },
            { href: `/${lang}/tools/regex-generator`, label: 'Regex Generator' },
            { href: `/${lang}/tools/text-diff`, label: 'Text Diff Checker' },
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
