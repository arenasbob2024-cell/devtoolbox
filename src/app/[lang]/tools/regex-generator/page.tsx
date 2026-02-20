'use client';

import { useState, useMemo } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import Link from 'next/link';
import { useLang } from '@/i18n/LangContext';

/* ── i18n strings (7 langs) ───────────────────────────────────── */
const ui: Record<string, Record<string, string>> = {
  en: {
    title: 'Regex Generator',
    description: 'Generate regular expressions from common patterns. Click to copy ready-to-use regex for email, URL, phone, date, IP and more.',
    searchPlaceholder: 'Search patterns...',
    copyPattern: 'Copy',
    testBtn: 'Test',
    categoryAll: 'All',
    categoryIdentity: 'Identity',
    categoryWeb: 'Web',
    categoryNumbers: 'Numbers',
    categoryDateTime: 'Date & Time',
    categoryFormat: 'Format',
    patternCol: 'Pattern',
    exampleCol: 'Example Match',
    descCol: 'Description',
    inlineTesterTitle: 'Inline Pattern Tester',
    inlinePattern: 'Pattern',
    inlineTest: 'Test String',
    inlineTestPlaceholder: 'Enter text to test the pattern...',
    inlineResult: 'Result',
    inlineMatch: 'Match',
    inlineNoMatch: 'No match',
    cheatTitle: 'Complete Regex Cheat Sheet',
    cheatMeta: 'Metacharacters',
    cheatQuantifiers: 'Quantifiers',
    cheatAnchors: 'Anchors',
    cheatCharClass: 'Character Classes',
    cheatFlags: 'Flags',
    relatedTitle: 'Related Regex Tools',
    faqTitle: 'Frequently Asked Questions',
    faq1q: 'How to generate a regex pattern?',
    faq1a: 'Browse the pattern library above organized by category (Identity, Web, Numbers, Date/Time, Format). Each pattern includes the regex, an example match, and a description. Click "Copy" to copy the pattern to your clipboard, or click "Test" to load it into the inline tester where you can try it against your own text.',
    faq2q: 'What are the most common regex patterns?',
    faq2a: 'The most commonly used regex patterns include: email validation (matching user@domain.com format), URL matching (http/https links), phone number formats, date patterns (YYYY-MM-DD, MM/DD/YYYY), IP address validation (IPv4 and IPv6), password strength rules, and HTML tag matching. These patterns cover the vast majority of everyday regex needs in web development and data processing.',
    faq3q: 'What is the correct regex for email validation?',
    faq3a: 'A practical email regex is ^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$ which validates the basic structure: local part with allowed characters, @ symbol, domain name, and top-level domain of at least 2 characters. Note that fully RFC 5322 compliant email validation is extremely complex. For most applications, the simplified pattern above combined with sending a confirmation email provides the best user experience.',
  },
  zh: {
    title: '正则生成器',
    description: '从常用模式生成正则表达式。点击复制可直接使用的邮箱、URL、电话、日期、IP等正则。',
    searchPlaceholder: '搜索模式...',
    copyPattern: '复制',
    testBtn: '测试',
    categoryAll: '全部',
    categoryIdentity: '身份验证',
    categoryWeb: '网络',
    categoryNumbers: '数字',
    categoryDateTime: '日期与时间',
    categoryFormat: '格式',
    patternCol: '模式',
    exampleCol: '匹配示例',
    descCol: '描述',
    inlineTesterTitle: '内联模式测试',
    inlinePattern: '模式',
    inlineTest: '测试字符串',
    inlineTestPlaceholder: '输入要测试的文本...',
    inlineResult: '结果',
    inlineMatch: '匹配',
    inlineNoMatch: '不匹配',
    cheatTitle: '完整正则速查表',
    cheatMeta: '元字符',
    cheatQuantifiers: '量词',
    cheatAnchors: '锚点',
    cheatCharClass: '字符类',
    cheatFlags: '标志',
    relatedTitle: '相关正则工具',
    faqTitle: '常见问题',
    faq1q: '如何生成正则模式？',
    faq1a: '浏览上方按类别（身份验证、网络、数字、日期/时间、格式）组织的模式库。每个模式包含正则表达式、匹配示例和描述。点击"复制"将模式复制到剪贴板，或点击"测试"在内联测试器中尝试。',
    faq2q: '最常用的正则模式有哪些？',
    faq2a: '最常用的正则模式包括：邮箱验证、URL匹配、电话号码格式、日期模式（YYYY-MM-DD、MM/DD/YYYY）、IP地址验证（IPv4和IPv6）、密码强度规则和HTML标签匹配。这些模式涵盖了Web开发和数据处理中的大多数日常正则需求。',
    faq3q: '邮箱验证的正确正则是什么？',
    faq3a: '实用的邮箱正则是 ^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$，它验证基本结构：允许字符的本地部分、@符号、域名和至少2个字符的顶级域名。注意完全符合RFC 5322的邮箱验证极其复杂，简化模式加确认邮件是最佳实践。',
  },
  fr: {
    title: 'Generateur Regex',
    description: 'Generez des expressions regulieres a partir de modeles courants. Copiez des regex prets a utiliser pour email, URL, telephone et plus.',
    searchPlaceholder: 'Rechercher des modeles...',
    copyPattern: 'Copier',
    testBtn: 'Tester',
    categoryAll: 'Tout',
    categoryIdentity: 'Identite',
    categoryWeb: 'Web',
    categoryNumbers: 'Nombres',
    categoryDateTime: 'Date et heure',
    categoryFormat: 'Format',
    patternCol: 'Modele',
    exampleCol: 'Exemple',
    descCol: 'Description',
    inlineTesterTitle: 'Testeur integre',
    inlinePattern: 'Modele',
    inlineTest: 'Texte de test',
    inlineTestPlaceholder: 'Entrez le texte a tester...',
    inlineResult: 'Resultat',
    inlineMatch: 'Correspondance',
    inlineNoMatch: 'Pas de correspondance',
    cheatTitle: 'Aide-memoire Regex complet',
    cheatMeta: 'Metacaracteres',
    cheatQuantifiers: 'Quantificateurs',
    cheatAnchors: 'Ancres',
    cheatCharClass: 'Classes de caracteres',
    cheatFlags: 'Drapeaux',
    relatedTitle: 'Outils Regex connexes',
    faqTitle: 'Questions frequentes',
    faq1q: 'Comment generer un modele regex ?',
    faq1a: 'Parcourez la bibliotheque de modeles organisee par categorie. Cliquez sur "Copier" ou "Tester" pour essayer le modele.',
    faq2q: 'Quels sont les modeles regex les plus courants ?',
    faq2a: 'Email, URL, telephone, date, adresse IP, mot de passe et balises HTML sont les modeles les plus utilises.',
    faq3q: 'Quel est le bon regex pour la validation email ?',
    faq3a: 'Un regex pratique est ^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$ qui valide la structure de base.',
  },
  de: {
    title: 'Regex Generator',
    description: 'Regulaere Ausdruecke aus gaengigen Mustern generieren. Kopierbereite Regex fuer E-Mail, URL, Telefon und mehr.',
    searchPlaceholder: 'Muster suchen...',
    copyPattern: 'Kopieren',
    testBtn: 'Testen',
    categoryAll: 'Alle',
    categoryIdentity: 'Identitaet',
    categoryWeb: 'Web',
    categoryNumbers: 'Zahlen',
    categoryDateTime: 'Datum & Zeit',
    categoryFormat: 'Format',
    patternCol: 'Muster',
    exampleCol: 'Beispiel',
    descCol: 'Beschreibung',
    inlineTesterTitle: 'Inline-Tester',
    inlinePattern: 'Muster',
    inlineTest: 'Testtext',
    inlineTestPlaceholder: 'Text zum Testen eingeben...',
    inlineResult: 'Ergebnis',
    inlineMatch: 'Treffer',
    inlineNoMatch: 'Kein Treffer',
    cheatTitle: 'Vollstaendiges Regex-Nachschlagewerk',
    cheatMeta: 'Metazeichen',
    cheatQuantifiers: 'Quantifizierer',
    cheatAnchors: 'Anker',
    cheatCharClass: 'Zeichenklassen',
    cheatFlags: 'Flags',
    relatedTitle: 'Verwandte Regex-Tools',
    faqTitle: 'Haeufig gestellte Fragen',
    faq1q: 'Wie generiert man ein Regex-Muster?',
    faq1a: 'Durchsuchen Sie die nach Kategorien organisierte Musterbibliothek. Klicken Sie auf "Kopieren" oder "Testen".',
    faq2q: 'Was sind die gaengigsten Regex-Muster?',
    faq2a: 'E-Mail, URL, Telefon, Datum, IP-Adresse, Passwoerter und HTML-Tags sind die haeufigsten Muster.',
    faq3q: 'Wie lautet das korrekte Regex fuer E-Mail-Validierung?',
    faq3a: 'Ein praktisches E-Mail-Regex ist ^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$ fuer die grundlegende Strukturvalidierung.',
  },
  es: {
    title: 'Generador Regex',
    description: 'Genera expresiones regulares de patrones comunes. Copia regex listos para email, URL, telefono y mas.',
    searchPlaceholder: 'Buscar patrones...',
    copyPattern: 'Copiar',
    testBtn: 'Probar',
    categoryAll: 'Todos',
    categoryIdentity: 'Identidad',
    categoryWeb: 'Web',
    categoryNumbers: 'Numeros',
    categoryDateTime: 'Fecha y hora',
    categoryFormat: 'Formato',
    patternCol: 'Patron',
    exampleCol: 'Ejemplo',
    descCol: 'Descripcion',
    inlineTesterTitle: 'Probador integrado',
    inlinePattern: 'Patron',
    inlineTest: 'Texto de prueba',
    inlineTestPlaceholder: 'Ingresa texto para probar...',
    inlineResult: 'Resultado',
    inlineMatch: 'Coincidencia',
    inlineNoMatch: 'Sin coincidencia',
    cheatTitle: 'Hoja de referencia Regex completa',
    cheatMeta: 'Metacaracteres',
    cheatQuantifiers: 'Cuantificadores',
    cheatAnchors: 'Anclas',
    cheatCharClass: 'Clases de caracteres',
    cheatFlags: 'Flags',
    relatedTitle: 'Herramientas Regex relacionadas',
    faqTitle: 'Preguntas frecuentes',
    faq1q: 'Como generar un patron regex?',
    faq1a: 'Explore la biblioteca de patrones organizada por categorias. Haga clic en "Copiar" o "Probar".',
    faq2q: 'Cuales son los patrones regex mas comunes?',
    faq2a: 'Email, URL, telefono, fecha, IP, contrasena y etiquetas HTML son los patrones mas usados.',
    faq3q: 'Cual es el regex correcto para validar email?',
    faq3a: 'Un regex practico es ^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$ para validacion basica.',
  },
  ja: {
    title: '正規表現ジェネレーター',
    description: 'よく使うパターンから正規表現を生成。メール、URL、電話番号等のコピー可能な正規表現。',
    searchPlaceholder: 'パターンを検索...',
    copyPattern: 'コピー',
    testBtn: 'テスト',
    categoryAll: '全て',
    categoryIdentity: 'ID系',
    categoryWeb: 'Web',
    categoryNumbers: '数値',
    categoryDateTime: '日時',
    categoryFormat: '形式',
    patternCol: 'パターン',
    exampleCol: '例',
    descCol: '説明',
    inlineTesterTitle: 'インラインテスター',
    inlinePattern: 'パターン',
    inlineTest: 'テスト文字列',
    inlineTestPlaceholder: 'テストするテキストを入力...',
    inlineResult: '結果',
    inlineMatch: 'マッチ',
    inlineNoMatch: 'マッチなし',
    cheatTitle: '正規表現完全チートシート',
    cheatMeta: 'メタ文字',
    cheatQuantifiers: '量指定子',
    cheatAnchors: 'アンカー',
    cheatCharClass: '文字クラス',
    cheatFlags: 'フラグ',
    relatedTitle: '関連ツール',
    faqTitle: 'よくある質問',
    faq1q: '正規表現パターンの生成方法は？',
    faq1a: 'カテゴリ別に整理されたパターンライブラリを閲覧してください。「コピー」または「テスト」をクリックします。',
    faq2q: '最もよく使う正規表現パターンは？',
    faq2a: 'メール、URL、電話番号、日付、IPアドレス、パスワード、HTMLタグが最も一般的なパターンです。',
    faq3q: 'メール検証の正しい正規表現は？',
    faq3a: '実用的なメール正規表現は ^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$ で基本構造を検証します。',
  },
  ko: {
    title: '정규식 생성기',
    description: '자주 쓰는 패턴에서 정규 표현식을 생성합니다. 이메일, URL, 전화번호 등 바로 복사 가능한 정규식.',
    searchPlaceholder: '패턴 검색...',
    copyPattern: '복사',
    testBtn: '테스트',
    categoryAll: '전체',
    categoryIdentity: 'ID',
    categoryWeb: '웹',
    categoryNumbers: '숫자',
    categoryDateTime: '날짜/시간',
    categoryFormat: '형식',
    patternCol: '패턴',
    exampleCol: '예시',
    descCol: '설명',
    inlineTesterTitle: '인라인 테스터',
    inlinePattern: '패턴',
    inlineTest: '테스트 문자열',
    inlineTestPlaceholder: '테스트할 텍스트를 입력하세요...',
    inlineResult: '결과',
    inlineMatch: '매칭',
    inlineNoMatch: '매칭 없음',
    cheatTitle: '정규식 완전 치트시트',
    cheatMeta: '메타문자',
    cheatQuantifiers: '수량자',
    cheatAnchors: '앵커',
    cheatCharClass: '문자 클래스',
    cheatFlags: '플래그',
    relatedTitle: '관련 정규식 도구',
    faqTitle: '자주 묻는 질문',
    faq1q: '정규식 패턴을 생성하는 방법은?',
    faq1a: '카테고리별로 정리된 패턴 라이브러리를 탐색하세요. "복사" 또는 "테스트"를 클릭합니다.',
    faq2q: '가장 많이 쓰는 정규식 패턴은?',
    faq2a: '이메일, URL, 전화번호, 날짜, IP 주소, 비밀번호, HTML 태그가 가장 일반적인 패턴입니다.',
    faq3q: '이메일 검증을 위한 올바른 정규식은?',
    faq3a: '실용적인 이메일 정규식은 ^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$ 으로 기본 구조를 검증합니다.',
  },
};

/* ── Pattern library ──────────────────────────────────────────── */
interface RegexPattern {
  name: string;
  pattern: string;
  example: string;
  description: string;
  category: string;
}

const patterns: RegexPattern[] = [
  // Identity
  { name: 'Email', pattern: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$', example: 'user@example.com', description: 'Validates email address format', category: 'identity' },
  { name: 'Username', pattern: '^[a-zA-Z0-9_]{3,20}$', example: 'john_doe42', description: 'Alphanumeric username, 3-20 chars', category: 'identity' },
  { name: 'Password (Strong)', pattern: '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$', example: 'Str0ng!Pass', description: 'Min 8 chars, upper, lower, digit, special', category: 'identity' },
  { name: 'SSN (US)', pattern: '^\\d{3}-\\d{2}-\\d{4}$', example: '123-45-6789', description: 'US Social Security Number format', category: 'identity' },
  // Web
  { name: 'URL (HTTP/HTTPS)', pattern: 'https?://[\\w\\-]+(\\.[\\w\\-]+)+[/\\w\\-.~:?#\\[\\]@!$&\'()*+,;=%]*', example: 'https://example.com/path?q=1', description: 'Matches HTTP and HTTPS URLs', category: 'web' },
  { name: 'Domain Name', pattern: '^([a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\\.)+[a-zA-Z]{2,}$', example: 'sub.example.com', description: 'Valid domain name', category: 'web' },
  { name: 'IPv4 Address', pattern: '^(?:(?:25[0-5]|2[0-4]\\d|[01]?\\d\\d?)\\.){3}(?:25[0-5]|2[0-4]\\d|[01]?\\d\\d?)$', example: '192.168.1.1', description: 'Valid IPv4 address (0-255 per octet)', category: 'web' },
  { name: 'IPv6 Address', pattern: '^([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$', example: '2001:0db8:85a3:0000:0000:8a2e:0370:7334', description: 'Full IPv6 address format', category: 'web' },
  { name: 'MAC Address', pattern: '^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$', example: '01:23:45:67:89:AB', description: 'Hardware MAC address', category: 'web' },
  { name: 'HTML Tag', pattern: '<([a-zA-Z][a-zA-Z0-9]*)\\b[^>]*>(.*?)</\\1>', example: '<div class="x">text</div>', description: 'Matches paired HTML tags', category: 'web' },
  { name: 'Slug / URL Path', pattern: '^[a-z0-9]+(?:-[a-z0-9]+)*$', example: 'my-blog-post', description: 'URL-friendly slug format', category: 'web' },
  // Numbers
  { name: 'Integer', pattern: '^-?\\d+$', example: '-42', description: 'Positive or negative integer', category: 'numbers' },
  { name: 'Decimal Number', pattern: '^-?\\d+\\.\\d+$', example: '3.14', description: 'Decimal number with point', category: 'numbers' },
  { name: 'Phone (International)', pattern: '^\\+?[1-9]\\d{1,14}$', example: '+14155552671', description: 'E.164 international phone format', category: 'numbers' },
  { name: 'Phone (US)', pattern: '^\\(?\\d{3}\\)?[-.\\s]?\\d{3}[-.\\s]?\\d{4}$', example: '(415) 555-2671', description: 'US phone number formats', category: 'numbers' },
  { name: 'Credit Card', pattern: '^(?:4\\d{12}(?:\\d{3})?|5[1-5]\\d{14}|3[47]\\d{13}|6(?:011|5\\d{2})\\d{12})$', example: '4111111111111111', description: 'Visa, MC, Amex, Discover', category: 'numbers' },
  { name: 'Hex Color', pattern: '^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$', example: '#FF5733', description: 'CSS hex color code', category: 'numbers' },
  { name: 'ZIP Code (US)', pattern: '^\\d{5}(-\\d{4})?$', example: '94102-3456', description: 'US ZIP and ZIP+4 code', category: 'numbers' },
  // Date & Time
  { name: 'Date (YYYY-MM-DD)', pattern: '^\\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\\d|3[01])$', example: '2024-12-25', description: 'ISO 8601 date format', category: 'datetime' },
  { name: 'Date (MM/DD/YYYY)', pattern: '^(0[1-9]|1[0-2])/(0[1-9]|[12]\\d|3[01])/\\d{4}$', example: '12/25/2024', description: 'US date format', category: 'datetime' },
  { name: 'Date (DD.MM.YYYY)', pattern: '^(0[1-9]|[12]\\d|3[01])\\.(0[1-9]|1[0-2])\\.\\d{4}$', example: '25.12.2024', description: 'European date format', category: 'datetime' },
  { name: 'Time (24h)', pattern: '^([01]\\d|2[0-3]):[0-5]\\d(:[0-5]\\d)?$', example: '23:59:59', description: '24-hour time format', category: 'datetime' },
  { name: 'Time (12h)', pattern: '^(0?[1-9]|1[0-2]):[0-5]\\d\\s?(AM|PM|am|pm)$', example: '2:30 PM', description: '12-hour time with AM/PM', category: 'datetime' },
  { name: 'ISO 8601 DateTime', pattern: '^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}(\\.\\d+)?(Z|[+-]\\d{2}:\\d{2})?$', example: '2024-12-25T10:30:00Z', description: 'Full ISO 8601 datetime', category: 'datetime' },
  // Format
  { name: 'File Extension', pattern: '\\.(jpg|jpeg|png|gif|svg|webp|pdf|doc|docx|xls|xlsx|csv|json|xml|zip|tar|gz)$', example: 'photo.jpg', description: 'Common file extensions', category: 'format' },
  { name: 'Markdown Link', pattern: '\\[([^\\]]+)\\]\\(([^)]+)\\)', example: '[text](https://url.com)', description: 'Markdown hyperlink syntax', category: 'format' },
  { name: 'UUID v4', pattern: '^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$', example: 'a1b2c3d4-e5f6-4a7b-8c9d-e0f1a2b3c4d5', description: 'UUID version 4 format', category: 'format' },
  { name: 'Semantic Version', pattern: '^(0|[1-9]\\d*)\\.(0|[1-9]\\d*)\\.(0|[1-9]\\d*)(-[a-zA-Z0-9.]+)?(\\+[a-zA-Z0-9.]+)?$', example: '2.1.0-beta.1', description: 'SemVer format (major.minor.patch)', category: 'format' },
  { name: 'Base64 String', pattern: '^[A-Za-z0-9+/]+=*$', example: 'SGVsbG8gV29ybGQ=', description: 'Base64 encoded string', category: 'format' },
  { name: 'JSON Key-Value', pattern: '"([^"]+)"\\s*:\\s*"([^"]*)"', example: '"name": "John"', description: 'JSON string key-value pair', category: 'format' },
];

/* ── Cheat sheet data ─────────────────────────────────────────── */
const cheatMetaData = [
  ['.', 'Any character except newline'],
  ['\\d', 'Digit [0-9]'],
  ['\\D', 'Non-digit [^0-9]'],
  ['\\w', 'Word char [a-zA-Z0-9_]'],
  ['\\W', 'Non-word char'],
  ['\\s', 'Whitespace [\\t\\n\\r\\f\\v ]'],
  ['\\S', 'Non-whitespace'],
  ['\\b', 'Word boundary'],
  ['\\B', 'Non-word boundary'],
  ['\\\\', 'Literal backslash'],
];

const cheatQuantifierData = [
  ['*', 'Zero or more (greedy)'],
  ['+', 'One or more (greedy)'],
  ['?', 'Zero or one (optional)'],
  ['{n}', 'Exactly n times'],
  ['{n,}', 'n or more times'],
  ['{n,m}', 'Between n and m times'],
  ['*?', 'Zero or more (lazy)'],
  ['+?', 'One or more (lazy)'],
  ['??', 'Zero or one (lazy)'],
];

const cheatAnchorData = [
  ['^', 'Start of string (or line with m flag)'],
  ['$', 'End of string (or line with m flag)'],
  ['\\b', 'Word boundary'],
  ['\\B', 'Non-word boundary'],
  ['(?=...)', 'Positive lookahead'],
  ['(?!...)', 'Negative lookahead'],
  ['(?<=...)', 'Positive lookbehind'],
  ['(?<!...)', 'Negative lookbehind'],
];

const cheatCharClassData = [
  ['[abc]', 'Any of a, b, or c'],
  ['[^abc]', 'Not a, b, or c'],
  ['[a-z]', 'Range: a to z'],
  ['[A-Z]', 'Range: A to Z'],
  ['[0-9]', 'Range: 0 to 9'],
  ['[a-zA-Z0-9]', 'Alphanumeric'],
];

const cheatFlagData = [
  ['g', 'Global - find all matches'],
  ['i', 'Case-insensitive matching'],
  ['m', 'Multiline - ^ and $ match line boundaries'],
  ['s', 'DotAll - . matches newline too'],
  ['u', 'Unicode - full Unicode support'],
  ['y', 'Sticky - match from lastIndex only'],
];

export default function RegexGenerator() {
  const { lang } = useLang();
  const t = ui[lang] || ui.en;

  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [testerPattern, setTesterPattern] = useState('');
  const [testerText, setTesterText] = useState('');

  const categories = [
    { id: 'all', label: t.categoryAll },
    { id: 'identity', label: t.categoryIdentity },
    { id: 'web', label: t.categoryWeb },
    { id: 'numbers', label: t.categoryNumbers },
    { id: 'datetime', label: t.categoryDateTime },
    { id: 'format', label: t.categoryFormat },
  ];

  const filteredPatterns = useMemo(() => {
    return patterns.filter(p => {
      const matchCategory = activeCategory === 'all' || p.category === activeCategory;
      const matchSearch = !search || p.name.toLowerCase().includes(search.toLowerCase()) || p.description.toLowerCase().includes(search.toLowerCase()) || p.pattern.toLowerCase().includes(search.toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [search, activeCategory]);

  const testerResult = useMemo(() => {
    if (!testerPattern || !testerText) return null;
    try {
      const regex = new RegExp(testerPattern);
      return regex.test(testerText);
    } catch {
      return null;
    }
  }, [testerPattern, testerText]);

  const loadIntoTester = (pat: string) => {
    setTesterPattern(pat);
  };

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
    <ToolLayout title={t.title} description={t.description} toolId="regex-generator">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* Search */}
      <div style={{ marginBottom: 16 }}>
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder={t.searchPlaceholder}
          style={{ width: '100%', fontSize: 14 }}
        />
      </div>

      {/* Category Tabs */}
      <div style={{ display: 'flex', gap: 6, marginBottom: 20, flexWrap: 'wrap' }}>
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            style={{
              padding: '6px 14px', borderRadius: 6, fontSize: 12, fontWeight: 600, cursor: 'pointer',
              border: `1px solid ${activeCategory === cat.id ? 'var(--accent-blue)' : 'var(--border-color)'}`,
              background: activeCategory === cat.id ? 'rgba(59,130,246,0.1)' : 'transparent',
              color: activeCategory === cat.id ? 'var(--accent-blue)' : 'var(--text-secondary)',
            }}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Pattern Cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
        {filteredPatterns.map((p, idx) => (
          <div key={idx} style={{
            background: 'var(--bg-input)', borderRadius: 8, padding: '12px 16px',
            border: '1px solid var(--border-color)',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6, gap: 8 }}>
              <div>
                <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)' }}>{p.name}</span>
                <span style={{ fontSize: 11, color: 'var(--text-secondary)', marginLeft: 8 }}>{p.description}</span>
              </div>
              <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
                <button
                  onClick={() => loadIntoTester(p.pattern)}
                  style={{
                    padding: '4px 10px', borderRadius: 4, fontSize: 11, cursor: 'pointer',
                    border: '1px solid var(--accent-emerald)', background: 'rgba(16,185,129,0.1)',
                    color: 'var(--accent-emerald)', fontWeight: 600,
                  }}
                >
                  {t.testBtn}
                </button>
                <CopyButton text={p.pattern} label={t.copyPattern} />
              </div>
            </div>
            <code style={{
              display: 'block', fontSize: 12, fontFamily: 'monospace', color: 'var(--accent-blue)',
              background: 'var(--bg-card)', padding: '6px 10px', borderRadius: 4, wordBreak: 'break-all',
              marginBottom: 4,
            }}>
              {p.pattern}
            </code>
            <div style={{ fontSize: 11, color: 'var(--text-secondary)', fontFamily: 'monospace' }}>
              {t.exampleCol}: <span style={{ color: 'var(--accent-emerald)' }}>{p.example}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Inline Tester */}
      <div style={{
        background: 'var(--bg-card)', borderRadius: 10, padding: 20,
        border: '1px solid var(--border-color)', marginBottom: 24,
      }}>
        <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12 }}>{t.inlineTesterTitle}</h3>
        <div style={{ marginBottom: 12 }}>
          <label style={{ fontSize: 12, fontWeight: 600, display: 'block', marginBottom: 4 }}>{t.inlinePattern}</label>
          <input
            type="text"
            value={testerPattern}
            onChange={e => setTesterPattern(e.target.value)}
            style={{ width: '100%', fontFamily: 'monospace', fontSize: 13 }}
          />
        </div>
        <div style={{ marginBottom: 12 }}>
          <label style={{ fontSize: 12, fontWeight: 600, display: 'block', marginBottom: 4 }}>{t.inlineTest}</label>
          <input
            type="text"
            value={testerText}
            onChange={e => setTesterText(e.target.value)}
            placeholder={t.inlineTestPlaceholder}
            style={{ width: '100%', fontFamily: 'monospace', fontSize: 13 }}
          />
        </div>
        {testerPattern && testerText && (
          <div style={{
            padding: '8px 12px', borderRadius: 6, fontSize: 13, fontWeight: 600,
            background: testerResult === null ? 'var(--bg-input)' : testerResult ? 'rgba(16,185,129,0.1)' : 'rgba(244,63,94,0.1)',
            color: testerResult === null ? 'var(--text-secondary)' : testerResult ? 'var(--accent-emerald)' : 'var(--accent-rose)',
            border: `1px solid ${testerResult === null ? 'var(--border-color)' : testerResult ? 'rgba(16,185,129,0.3)' : 'rgba(244,63,94,0.3)'}`,
          }}>
            {t.inlineResult}: {testerResult === null ? t.invalidPattern || 'Invalid pattern' : testerResult ? `\u2713 ${t.inlineMatch}` : `\u2715 ${t.inlineNoMatch}`}
          </div>
        )}
      </div>

      {/* ── Cheat Sheet ──────────────────────────────────────── */}
      <div style={{ marginTop: 30, paddingTop: 24, borderTop: '1px solid var(--border-color)' }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16 }}>{t.cheatTitle}</h2>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 }}>
          {/* Metacharacters */}
          <div>
            <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 8, color: 'var(--accent-blue)' }}>{t.cheatMeta}</h3>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
              <tbody>
                {cheatMetaData.map(([sym, desc], i) => (
                  <tr key={i} style={{ borderBottom: '1px solid var(--border-color)' }}>
                    <td style={{ padding: '4px 8px', fontFamily: 'monospace', fontWeight: 600, color: 'var(--accent-emerald)', whiteSpace: 'nowrap' }}>{sym}</td>
                    <td style={{ padding: '4px 8px', color: 'var(--text-secondary)' }}>{desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Quantifiers */}
          <div>
            <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 8, color: 'var(--accent-blue)' }}>{t.cheatQuantifiers}</h3>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
              <tbody>
                {cheatQuantifierData.map(([sym, desc], i) => (
                  <tr key={i} style={{ borderBottom: '1px solid var(--border-color)' }}>
                    <td style={{ padding: '4px 8px', fontFamily: 'monospace', fontWeight: 600, color: 'var(--accent-emerald)', whiteSpace: 'nowrap' }}>{sym}</td>
                    <td style={{ padding: '4px 8px', color: 'var(--text-secondary)' }}>{desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 }}>
          {/* Anchors */}
          <div>
            <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 8, color: 'var(--accent-blue)' }}>{t.cheatAnchors}</h3>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
              <tbody>
                {cheatAnchorData.map(([sym, desc], i) => (
                  <tr key={i} style={{ borderBottom: '1px solid var(--border-color)' }}>
                    <td style={{ padding: '4px 8px', fontFamily: 'monospace', fontWeight: 600, color: 'var(--accent-emerald)', whiteSpace: 'nowrap' }}>{sym}</td>
                    <td style={{ padding: '4px 8px', color: 'var(--text-secondary)' }}>{desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Character Classes */}
          <div>
            <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 8, color: 'var(--accent-blue)' }}>{t.cheatCharClass}</h3>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12, marginBottom: 16 }}>
              <tbody>
                {cheatCharClassData.map(([sym, desc], i) => (
                  <tr key={i} style={{ borderBottom: '1px solid var(--border-color)' }}>
                    <td style={{ padding: '4px 8px', fontFamily: 'monospace', fontWeight: 600, color: 'var(--accent-emerald)', whiteSpace: 'nowrap' }}>{sym}</td>
                    <td style={{ padding: '4px 8px', color: 'var(--text-secondary)' }}>{desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 8, color: 'var(--accent-blue)' }}>{t.cheatFlags}</h3>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
              <tbody>
                {cheatFlagData.map(([sym, desc], i) => (
                  <tr key={i} style={{ borderBottom: '1px solid var(--border-color)' }}>
                    <td style={{ padding: '4px 8px', fontFamily: 'monospace', fontWeight: 600, color: 'var(--accent-emerald)', whiteSpace: 'nowrap' }}>{sym}</td>
                    <td style={{ padding: '4px 8px', color: 'var(--text-secondary)' }}>{desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
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
            { href: `/${lang}/tools/regex-matcher`, label: 'Regex Matcher' },
            { href: `/${lang}/tools/password-generator`, label: 'Password Generator' },
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
