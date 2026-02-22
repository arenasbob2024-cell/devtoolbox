'use client';

import { useState, useCallback } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import Link from 'next/link';
import { useLang } from '@/i18n/LangContext';

const ui: Record<string, Record<string, string>> = {
  en: {
    title: 'Regex Builder & Tester',
    description: 'Build, test, and debug regular expressions with real-time matching, detailed explanations of each pattern part, and common regex templates.',
    patternLabel: 'Regular Expression',
    patternPlaceholder: 'Enter your regex pattern, e.g. ^[a-zA-Z0-9]+$',
    flagsLabel: 'Flags',
    testLabel: 'Test String',
    testPlaceholder: 'Enter text to test against...',
    matchesLabel: 'Matches',
    noMatches: 'No matches found.',
    explanationLabel: 'Pattern Explanation',
    templatesLabel: 'Common Templates',
    matchCount: 'matches found',
    fullMatch: 'Full match',
    group: 'Group',
    index: 'Index',
    clear: 'Clear',
    introTitle: 'Free Online Regex Builder & Tester',
    introText: 'This regex builder and tester lets you construct, test, and debug regular expressions in real time. Enter a pattern and test string to see matches highlighted instantly. Each part of your pattern is explained so you can learn and debug complex regex easily.',
    howTitle: 'How to Use the Regex Builder',
    step1: 'Enter a regular expression pattern in the pattern field',
    step2: 'Set regex flags (global, case-insensitive, multiline, etc.)',
    step3: 'Type or paste a test string to see matches highlighted in real time',
    step4: 'Read the pattern explanation to understand each part of your regex',
    faqTitle: 'Frequently Asked Questions',
    faq1q: 'What is a regular expression?',
    faq1a: 'A regular expression (regex) is a sequence of characters that defines a search pattern. It is used for string matching, searching, and text manipulation in programming languages, text editors, and command-line tools.',
    faq2q: 'What do the regex flags mean?',
    faq2a: 'Common flags: g (global) finds all matches instead of stopping at the first; i (case-insensitive) ignores letter case; m (multiline) makes ^ and $ match line boundaries; s (dotAll) makes . match newline characters.',
    faq3q: 'Why is my regex not matching?',
    faq3a: 'Common issues include missing the global flag, not escaping special characters (like . or $), incorrect character classes, or greedy vs lazy quantifiers. Check the pattern explanation to identify potential issues.',
    faq4q: 'Is my data processed on a server?',
    faq4a: 'No, all regex testing happens entirely in your browser using JavaScript. Your patterns and test strings are never sent to any server.',
    faq5q: 'What regex syntax is supported?',
    faq5a: 'This tool uses JavaScript regular expression syntax, which supports character classes, quantifiers, assertions, groups, backreferences, lookahead, and lookbehind. It covers the ECMAScript regex specification.',
    relatedTitle: 'Related Tools',
  },
  zh: {
    title: '正则表达式构建器与测试器',
    description: '实时构建、测试和调试正则表达式，详细解释每个模式部分，提供常用正则模板。',
    patternLabel: '正则表达式',
    patternPlaceholder: '输入正则模式，例如 ^[a-zA-Z0-9]+$',
    flagsLabel: '标志',
    testLabel: '测试字符串',
    testPlaceholder: '输入要测试的文本...',
    matchesLabel: '匹配结果',
    noMatches: '未找到匹配。',
    explanationLabel: '模式解释',
    templatesLabel: '常用模板',
    matchCount: '个匹配',
    fullMatch: '完整匹配',
    group: '分组',
    index: '索引',
    clear: '清除',
    introTitle: '免费在线正则表达式构建器',
    introText: '这个正则表达式构建器和测试器可以让你实时构建、测试和调试正则表达式。输入模式和测试字符串即可看到高亮的匹配结果。每个模式部分都有详细解释。',
    howTitle: '如何使用正则构建器',
    step1: '在模式字段中输入正则表达式',
    step2: '设置正则标志（全局、不区分大小写、多行等）',
    step3: '输入或粘贴测试字符串查看实时匹配',
    step4: '阅读模式解释了解正则各部分含义',
    faqTitle: '常见问题',
    faq1q: '什么是正则表达式？',
    faq1a: '正则表达式是定义搜索模式的字符序列。用于编程语言、文本编辑器和命令行工具中的字符串匹配、搜索和文本操作。',
    faq2q: '正则标志是什么意思？',
    faq2a: '常用标志：g（全局）查找所有匹配；i（不区分大小写）忽略字母大小写；m（多行）使 ^ 和 $ 匹配行边界；s（dotAll）使 . 匹配换行符。',
    faq3q: '为什么我的正则不匹配？',
    faq3a: '常见问题包括缺少全局标志、未转义特殊字符（如 . 或 $）、字符类不正确或贪婪与懒惰量词问题。查看模式解释以识别潜在问题。',
    faq4q: '数据是否在服务器上处理？',
    faq4a: '不是，所有正则测试完全在浏览器中使用 JavaScript 进行。你的模式和测试字符串永远不会发送到服务器。',
    faq5q: '支持哪些正则语法？',
    faq5a: '本工具使用 JavaScript 正则表达式语法，支持字符类、量词、断言、分组、反向引用、前瞻和后顾。',
    relatedTitle: '相关工具',
  },
  ja: {
    title: '正規表現ビルダー＆テスター',
    description: 'リアルタイムでの正規表現の構築、テスト、デバッグ。パターンの各部分の詳細な説明付き。',
    patternLabel: '正規表現',
    patternPlaceholder: '正規表現パターンを入力 例: ^[a-zA-Z0-9]+$',
    flagsLabel: 'フラグ',
    testLabel: 'テスト文字列',
    testPlaceholder: 'テストするテキストを入力...',
    matchesLabel: 'マッチ結果',
    noMatches: 'マッチが見つかりません。',
    explanationLabel: 'パターン解説',
    templatesLabel: 'よく使うテンプレート',
    matchCount: '件のマッチ',
    fullMatch: '完全一致',
    group: 'グループ',
    index: 'インデックス',
    clear: 'クリア',
    introTitle: '無料オンライン正規表現ビルダー',
    introText: 'この正規表現ビルダーとテスターで、リアルタイムで正規表現を構築、テスト、デバッグできます。パターンとテスト文字列を入力すると、マッチがハイライト表示されます。',
    howTitle: '正規表現ビルダーの使い方',
    step1: 'パターンフィールドに正規表現を入力',
    step2: 'フラグを設定（グローバル、大文字小文字無視、複数行など）',
    step3: 'テスト文字列を入力してリアルタイムマッチを確認',
    step4: 'パターン解説を読んで各部分を理解',
    faqTitle: 'よくある質問',
    faq1q: '正規表現とは何ですか？',
    faq1a: '正規表現は検索パターンを定義する文字列です。プログラミング言語、テキストエディタ、コマンドラインツールでの文字列マッチング、検索、テキスト操作に使用されます。',
    faq2q: 'フラグの意味は？',
    faq2a: '主なフラグ：g（グローバル）全てのマッチを検索、i（大小文字無視）、m（複数行）^ と $ が行境界にマッチ、s（dotAll）. が改行にマッチ。',
    faq3q: '正規表現がマッチしないのはなぜ？',
    faq3a: 'よくある問題：グローバルフラグの不足、特殊文字のエスケープ忘れ、文字クラスの誤り、貪欲vs怠惰量指定子の問題。パターン解説を確認してください。',
    faq4q: 'データはサーバーで処理されますか？',
    faq4a: 'いいえ、すべてのテストはブラウザ内のJavaScriptで行われます。データはサーバーに送信されません。',
    faq5q: 'どの正規表現構文がサポートされていますか？',
    faq5a: 'JavaScript正規表現構文をサポート。文字クラス、量指定子、アサーション、グループ、後方参照、先読み、後読みに対応。',
    relatedTitle: '関連ツール',
  },
  ko: {
    title: '정규식 빌더 & 테스터',
    description: '실시간 매칭으로 정규 표현식을 구축, 테스트, 디버그합니다. 패턴 각 부분의 상세한 설명을 제공합니다.',
    patternLabel: '정규 표현식',
    patternPlaceholder: '정규식 패턴을 입력하세요. 예: ^[a-zA-Z0-9]+$',
    flagsLabel: '플래그',
    testLabel: '테스트 문자열',
    testPlaceholder: '테스트할 텍스트를 입력하세요...',
    matchesLabel: '매치 결과',
    noMatches: '매치를 찾을 수 없습니다.',
    explanationLabel: '패턴 설명',
    templatesLabel: '자주 사용하는 템플릿',
    matchCount: '개 매치 발견',
    fullMatch: '전체 매치',
    group: '그룹',
    index: '인덱스',
    clear: '지우기',
    introTitle: '무료 온라인 정규식 빌더',
    introText: '이 정규식 빌더와 테스터로 실시간으로 정규 표현식을 구축, 테스트, 디버그할 수 있습니다. 패턴과 테스트 문자열을 입력하면 매치가 즉시 하이라이트됩니다.',
    howTitle: '정규식 빌더 사용 방법',
    step1: '패턴 필드에 정규 표현식을 입력',
    step2: '플래그 설정 (전역, 대소문자 무시, 다중 줄 등)',
    step3: '테스트 문자열을 입력하여 실시간 매치 확인',
    step4: '패턴 설명을 읽어 각 부분 이해',
    faqTitle: '자주 묻는 질문',
    faq1q: '정규 표현식이란 무엇인가요?',
    faq1a: '정규 표현식은 검색 패턴을 정의하는 문자 시퀀스입니다. 프로그래밍 언어, 텍스트 편집기, 명령줄 도구에서 문자열 매칭, 검색, 텍스트 조작에 사용됩니다.',
    faq2q: '정규식 플래그는 무슨 의미인가요?',
    faq2a: '주요 플래그: g(전역) 모든 매치 찾기, i(대소문자 무시), m(다중 줄) ^와 $가 줄 경계에 매치, s(dotAll) .이 줄바꿈에 매치.',
    faq3q: '정규식이 매치하지 않는 이유는?',
    faq3a: '일반적인 문제: 전역 플래그 누락, 특수 문자 이스케이프 미처리, 문자 클래스 오류, 탐욕적 vs 게으른 수량자 문제. 패턴 설명을 확인하세요.',
    faq4q: '데이터가 서버에서 처리되나요?',
    faq4a: '아니요, 모든 테스트는 브라우저 내 JavaScript로 수행됩니다. 데이터는 서버로 전송되지 않습니다.',
    faq5q: '어떤 정규식 구문이 지원되나요?',
    faq5a: 'JavaScript 정규식 구문을 지원합니다. 문자 클래스, 수량자, 단언, 그룹, 역참조, 전방탐색, 후방탐색을 지원합니다.',
    relatedTitle: '관련 도구',
  },
  fr: {
    title: 'Constructeur et Testeur de Regex',
    description: 'Construisez, testez et deboguez des expressions regulieres avec correspondance en temps reel et explications detaillees de chaque partie du motif.',
    patternLabel: 'Expression reguliere',
    patternPlaceholder: 'Entrez votre motif regex, ex. ^[a-zA-Z0-9]+$',
    flagsLabel: 'Drapeaux',
    testLabel: 'Chaine de test',
    testPlaceholder: 'Entrez le texte a tester...',
    matchesLabel: 'Correspondances',
    noMatches: 'Aucune correspondance trouvee.',
    explanationLabel: 'Explication du motif',
    templatesLabel: 'Modeles courants',
    matchCount: 'correspondances trouvees',
    fullMatch: 'Correspondance complete',
    group: 'Groupe',
    index: 'Index',
    clear: 'Effacer',
    introTitle: 'Constructeur de Regex en ligne gratuit',
    introText: "Ce constructeur et testeur de regex vous permet de construire, tester et deboguer des expressions regulieres en temps reel. Entrez un motif et une chaine de test pour voir les correspondances instantanement.",
    howTitle: 'Comment utiliser le constructeur de Regex',
    step1: 'Entrez un motif d\'expression reguliere dans le champ',
    step2: 'Definissez les drapeaux (global, insensible a la casse, multiligne, etc.)',
    step3: 'Tapez ou collez une chaine de test pour voir les correspondances',
    step4: "Lisez l'explication du motif pour comprendre chaque partie",
    faqTitle: 'Questions frequentes',
    faq1q: "Qu'est-ce qu'une expression reguliere ?",
    faq1a: "Une expression reguliere est une sequence de caracteres qui definit un motif de recherche. Elle est utilisee pour la correspondance de chaines, la recherche et la manipulation de texte.",
    faq2q: 'Que signifient les drapeaux regex ?',
    faq2a: 'Drapeaux courants : g (global) trouve toutes les correspondances ; i (insensible a la casse) ; m (multiligne) ; s (dotAll) fait correspondre . avec les retours a la ligne.',
    faq3q: 'Pourquoi mon regex ne correspond pas ?',
    faq3a: "Problemes courants : drapeau global manquant, caracteres speciaux non echappes, classes de caracteres incorrectes, quantificateurs gourmands vs paresseux.",
    faq4q: 'Mes donnees sont-elles traitees sur un serveur ?',
    faq4a: 'Non, tous les tests se font dans votre navigateur avec JavaScript. Aucune donnee n\'est envoyee a un serveur.',
    faq5q: 'Quelle syntaxe regex est supportee ?',
    faq5a: 'Cet outil utilise la syntaxe JavaScript des expressions regulieres, supportant les classes de caracteres, quantificateurs, assertions, groupes, references arriere, lookahead et lookbehind.',
    relatedTitle: 'Outils connexes',
  },
  de: {
    title: 'Regex Builder & Tester',
    description: 'Erstellen, testen und debuggen Sie regulaere Ausdruecke mit Echtzeit-Matching und detaillierten Erklaerungen jedes Musterteils.',
    patternLabel: 'Regulaerer Ausdruck',
    patternPlaceholder: 'Regex-Muster eingeben, z.B. ^[a-zA-Z0-9]+$',
    flagsLabel: 'Flags',
    testLabel: 'Testzeichenfolge',
    testPlaceholder: 'Zu testenden Text eingeben...',
    matchesLabel: 'Treffer',
    noMatches: 'Keine Treffer gefunden.',
    explanationLabel: 'Mustererklarung',
    templatesLabel: 'Gaengige Vorlagen',
    matchCount: 'Treffer gefunden',
    fullMatch: 'Vollstaendiger Treffer',
    group: 'Gruppe',
    index: 'Index',
    clear: 'Loeschen',
    introTitle: 'Kostenloser Online Regex Builder',
    introText: 'Dieser Regex Builder und Tester ermoeglicht es Ihnen, regulaere Ausdruecke in Echtzeit zu erstellen, testen und debuggen. Geben Sie ein Muster und eine Testzeichenfolge ein.',
    howTitle: 'So verwenden Sie den Regex Builder',
    step1: 'Geben Sie ein regulaeres Ausdrucksmuster in das Feld ein',
    step2: 'Setzen Sie Flags (global, Gross-/Kleinschreibung, mehrzeilig, etc.)',
    step3: 'Geben Sie eine Testzeichenfolge ein, um Treffer in Echtzeit zu sehen',
    step4: 'Lesen Sie die Mustererklarung, um jeden Teil zu verstehen',
    faqTitle: 'Haeufig gestellte Fragen',
    faq1q: 'Was ist ein regulaerer Ausdruck?',
    faq1a: 'Ein regulaerer Ausdruck ist eine Zeichenfolge, die ein Suchmuster definiert. Er wird fuer Zeichenfolgenabgleich, Suche und Textmanipulation verwendet.',
    faq2q: 'Was bedeuten die Regex-Flags?',
    faq2a: 'Gaengige Flags: g (global) findet alle Treffer; i (Gross-/Kleinschreibung ignorieren); m (mehrzeilig); s (dotAll) laesst . auch Zeilenumbrueche matchen.',
    faq3q: 'Warum matcht mein Regex nicht?',
    faq3a: 'Haeufige Probleme: fehlendes globales Flag, nicht escapte Sonderzeichen, falsche Zeichenklassen, gierige vs. faule Quantifizierer.',
    faq4q: 'Werden meine Daten auf einem Server verarbeitet?',
    faq4a: 'Nein, alle Tests laufen vollstaendig in Ihrem Browser mit JavaScript. Keine Daten werden an einen Server gesendet.',
    faq5q: 'Welche Regex-Syntax wird unterstuetzt?',
    faq5a: 'Dieses Tool verwendet JavaScript-Regex-Syntax mit Zeichenklassen, Quantifizierern, Assertions, Gruppen, Rueckverweisen, Lookahead und Lookbehind.',
    relatedTitle: 'Verwandte Tools',
  },
  es: {
    title: 'Constructor y Probador de Regex',
    description: 'Construye, prueba y depura expresiones regulares con coincidencia en tiempo real y explicaciones detalladas de cada parte del patron.',
    patternLabel: 'Expresion regular',
    patternPlaceholder: 'Ingresa tu patron regex, ej. ^[a-zA-Z0-9]+$',
    flagsLabel: 'Banderas',
    testLabel: 'Cadena de prueba',
    testPlaceholder: 'Ingresa texto para probar...',
    matchesLabel: 'Coincidencias',
    noMatches: 'No se encontraron coincidencias.',
    explanationLabel: 'Explicacion del patron',
    templatesLabel: 'Plantillas comunes',
    matchCount: 'coincidencias encontradas',
    fullMatch: 'Coincidencia completa',
    group: 'Grupo',
    index: 'Indice',
    clear: 'Limpiar',
    introTitle: 'Constructor de Regex en linea gratuito',
    introText: 'Este constructor y probador de regex te permite construir, probar y depurar expresiones regulares en tiempo real. Ingresa un patron y una cadena de prueba para ver las coincidencias al instante.',
    howTitle: 'Como usar el constructor de Regex',
    step1: 'Ingresa un patron de expresion regular en el campo',
    step2: 'Configura las banderas (global, insensible a mayusculas, multilinea, etc.)',
    step3: 'Escribe o pega una cadena de prueba para ver coincidencias en tiempo real',
    step4: 'Lee la explicacion del patron para entender cada parte',
    faqTitle: 'Preguntas frecuentes',
    faq1q: 'Que es una expresion regular?',
    faq1a: 'Una expresion regular es una secuencia de caracteres que define un patron de busqueda. Se usa para coincidencia de cadenas, busqueda y manipulacion de texto.',
    faq2q: 'Que significan las banderas regex?',
    faq2a: 'Banderas comunes: g (global) encuentra todas las coincidencias; i (insensible a mayusculas); m (multilinea); s (dotAll) hace que . coincida con saltos de linea.',
    faq3q: 'Por que mi regex no coincide?',
    faq3a: 'Problemas comunes: falta de bandera global, caracteres especiales sin escapar, clases de caracteres incorrectas, cuantificadores avariciosos vs perezosos.',
    faq4q: 'Se procesan mis datos en un servidor?',
    faq4a: 'No, todas las pruebas se realizan en tu navegador con JavaScript. Ningun dato se envia a un servidor.',
    faq5q: 'Que sintaxis regex se soporta?',
    faq5a: 'Esta herramienta usa sintaxis JavaScript de expresiones regulares, soportando clases de caracteres, cuantificadores, aserciones, grupos, referencias y lookahead/lookbehind.',
    relatedTitle: 'Herramientas relacionadas',
  },
  pt: {
    title: 'Construtor e Testador de Regex',
    description: 'Construa, teste e depure expressoes regulares com correspondencia em tempo real e explicacoes detalhadas de cada parte do padrao.',
    patternLabel: 'Expressao regular',
    patternPlaceholder: 'Digite seu padrao regex, ex. ^[a-zA-Z0-9]+$',
    flagsLabel: 'Flags',
    testLabel: 'String de teste',
    testPlaceholder: 'Digite texto para testar...',
    matchesLabel: 'Correspondencias',
    noMatches: 'Nenhuma correspondencia encontrada.',
    explanationLabel: 'Explicacao do padrao',
    templatesLabel: 'Modelos comuns',
    matchCount: 'correspondencias encontradas',
    fullMatch: 'Correspondencia completa',
    group: 'Grupo',
    index: 'Indice',
    clear: 'Limpar',
    introTitle: 'Construtor de Regex Online Gratuito',
    introText: 'Este construtor e testador de regex permite construir, testar e depurar expressoes regulares em tempo real. Digite um padrao e string de teste para ver correspondencias instantaneamente.',
    howTitle: 'Como usar o Construtor de Regex',
    step1: 'Digite um padrao de expressao regular no campo',
    step2: 'Configure as flags (global, case-insensitive, multilinha, etc.)',
    step3: 'Digite ou cole uma string de teste para ver correspondencias em tempo real',
    step4: 'Leia a explicacao do padrao para entender cada parte',
    faqTitle: 'Perguntas frequentes',
    faq1q: 'O que e uma expressao regular?',
    faq1a: 'Uma expressao regular e uma sequencia de caracteres que define um padrao de busca. E usada para correspondencia de strings, busca e manipulacao de texto.',
    faq2q: 'O que significam as flags regex?',
    faq2a: 'Flags comuns: g (global) encontra todas as correspondencias; i (case-insensitive); m (multilinha); s (dotAll) faz . corresponder a quebras de linha.',
    faq3q: 'Por que meu regex nao corresponde?',
    faq3a: 'Problemas comuns: flag global ausente, caracteres especiais nao escapados, classes de caracteres incorretas, quantificadores gananciosos vs preguicosos.',
    faq4q: 'Meus dados sao processados em um servidor?',
    faq4a: 'Nao, todos os testes sao feitos no seu navegador com JavaScript. Nenhum dado e enviado a um servidor.',
    faq5q: 'Qual sintaxe regex e suportada?',
    faq5a: 'Esta ferramenta usa sintaxe JavaScript de expressoes regulares, suportando classes de caracteres, quantificadores, assercoes, grupos, referencias e lookahead/lookbehind.',
    relatedTitle: 'Ferramentas relacionadas',
  },
  it: {
    title: 'Costruttore e Tester di Regex',
    description: 'Costruisci, testa e debug di espressioni regolari con corrispondenza in tempo reale e spiegazioni dettagliate di ogni parte del pattern.',
    patternLabel: 'Espressione regolare',
    patternPlaceholder: 'Inserisci il tuo pattern regex, es. ^[a-zA-Z0-9]+$',
    flagsLabel: 'Flag',
    testLabel: 'Stringa di test',
    testPlaceholder: 'Inserisci testo da testare...',
    matchesLabel: 'Corrispondenze',
    noMatches: 'Nessuna corrispondenza trovata.',
    explanationLabel: 'Spiegazione del pattern',
    templatesLabel: 'Template comuni',
    matchCount: 'corrispondenze trovate',
    fullMatch: 'Corrispondenza completa',
    group: 'Gruppo',
    index: 'Indice',
    clear: 'Cancella',
    introTitle: 'Costruttore di Regex Online Gratuito',
    introText: 'Questo costruttore e tester di regex ti permette di costruire, testare e fare il debug di espressioni regolari in tempo reale. Inserisci un pattern e una stringa di test.',
    howTitle: 'Come usare il Costruttore di Regex',
    step1: "Inserisci un pattern di espressione regolare nel campo",
    step2: 'Imposta le flag (globale, case-insensitive, multilinea, ecc.)',
    step3: 'Digita o incolla una stringa di test per vedere le corrispondenze in tempo reale',
    step4: 'Leggi la spiegazione del pattern per capire ogni parte',
    faqTitle: 'Domande frequenti',
    faq1q: "Cos'e un'espressione regolare?",
    faq1a: "Un'espressione regolare e una sequenza di caratteri che definisce un pattern di ricerca. Viene usata per il matching, la ricerca e la manipolazione del testo.",
    faq2q: 'Cosa significano le flag regex?',
    faq2a: 'Flag comuni: g (globale) trova tutte le corrispondenze; i (case-insensitive); m (multilinea); s (dotAll) fa corrispondere . ai caratteri di nuova riga.',
    faq3q: 'Perche il mio regex non corrisponde?',
    faq3a: 'Problemi comuni: flag globale mancante, caratteri speciali non escapati, classi di caratteri errate, quantificatori avidi vs pigri.',
    faq4q: 'I miei dati vengono elaborati su un server?',
    faq4a: 'No, tutti i test avvengono nel browser con JavaScript. Nessun dato viene inviato a un server.',
    faq5q: 'Quale sintassi regex e supportata?',
    faq5a: 'Questo strumento usa la sintassi JavaScript delle espressioni regolari, supportando classi di caratteri, quantificatori, asserzioni, gruppi, riferimenti e lookahead/lookbehind.',
    relatedTitle: 'Strumenti correlati',
  },
  nl: {
    title: 'Regex Builder & Tester',
    description: 'Bouw, test en debug reguliere expressies met realtime matching en gedetailleerde uitleg van elk patroononderdeel.',
    patternLabel: 'Reguliere expressie',
    patternPlaceholder: 'Voer uw regex-patroon in, bijv. ^[a-zA-Z0-9]+$',
    flagsLabel: 'Vlaggen',
    testLabel: 'Teststring',
    testPlaceholder: 'Voer tekst in om te testen...',
    matchesLabel: 'Overeenkomsten',
    noMatches: 'Geen overeenkomsten gevonden.',
    explanationLabel: 'Patroonuitleg',
    templatesLabel: 'Veelgebruikte sjablonen',
    matchCount: 'overeenkomsten gevonden',
    fullMatch: 'Volledige overeenkomst',
    group: 'Groep',
    index: 'Index',
    clear: 'Wissen',
    introTitle: 'Gratis Online Regex Builder',
    introText: 'Deze regex builder en tester laat je reguliere expressies in realtime bouwen, testen en debuggen. Voer een patroon en teststring in om overeenkomsten direct te zien.',
    howTitle: 'Hoe de Regex Builder te gebruiken',
    step1: 'Voer een regulier expressiepatroon in het veld in',
    step2: 'Stel vlaggen in (globaal, hoofdletterongevoelig, meerregelig, etc.)',
    step3: 'Typ of plak een teststring om realtime overeenkomsten te zien',
    step4: 'Lees de patroonuitleg om elk onderdeel te begrijpen',
    faqTitle: 'Veelgestelde vragen',
    faq1q: 'Wat is een reguliere expressie?',
    faq1a: 'Een reguliere expressie is een reeks tekens die een zoekpatroon definieert. Het wordt gebruikt voor string matching, zoeken en tekstmanipulatie.',
    faq2q: 'Wat betekenen de regex-vlaggen?',
    faq2a: 'Veelgebruikte vlaggen: g (globaal) vindt alle overeenkomsten; i (hoofdletterongevoelig); m (meerregelig); s (dotAll) laat . overeenkomen met nieuwe regels.',
    faq3q: 'Waarom komt mijn regex niet overeen?',
    faq3a: 'Veelvoorkomende problemen: ontbrekende globale vlag, niet-geescapete speciale tekens, onjuiste tekenklassen, hebzuchtige vs. luie kwantificeerders.',
    faq4q: 'Worden mijn gegevens op een server verwerkt?',
    faq4a: 'Nee, alle tests vinden plaats in uw browser met JavaScript. Geen data wordt naar een server gestuurd.',
    faq5q: 'Welke regex-syntaxis wordt ondersteund?',
    faq5a: 'Deze tool gebruikt JavaScript regex-syntaxis met tekenklassen, kwantificeerders, assertions, groepen, terugverwijzingen en lookahead/lookbehind.',
    relatedTitle: 'Gerelateerde tools',
  },
  pl: {
    title: 'Kreator i Tester Regex',
    description: 'Buduj, testuj i debuguj wyrazenia regularne z dopasowywaniem w czasie rzeczywistym i szczegolowymi wyjasnieniami kazdej czesci wzorca.',
    patternLabel: 'Wyrazenie regularne',
    patternPlaceholder: 'Wpisz wzorzec regex, np. ^[a-zA-Z0-9]+$',
    flagsLabel: 'Flagi',
    testLabel: 'Lancuch testowy',
    testPlaceholder: 'Wpisz tekst do przetestowania...',
    matchesLabel: 'Dopasowania',
    noMatches: 'Nie znaleziono dopasowan.',
    explanationLabel: 'Wyjasnienie wzorca',
    templatesLabel: 'Popularne szablony',
    matchCount: 'dopasowan znalezionych',
    fullMatch: 'Pelne dopasowanie',
    group: 'Grupa',
    index: 'Indeks',
    clear: 'Wyczysc',
    introTitle: 'Darmowy Kreator Regex Online',
    introText: 'Ten kreator i tester regex pozwala budowac, testowac i debugowac wyrazenia regularne w czasie rzeczywistym. Wpisz wzorzec i lancuch testowy.',
    howTitle: 'Jak korzystac z kreatora Regex',
    step1: 'Wpisz wzorzec wyrazenia regularnego w pole',
    step2: 'Ustaw flagi (globalny, bez rozrozniania wielkosci liter, wieloliniowy, itp.)',
    step3: 'Wpisz lub wklej lancuch testowy, aby zobaczyc dopasowania w czasie rzeczywistym',
    step4: 'Przeczytaj wyjasnienie wzorca, aby zrozumiec kazda czesc',
    faqTitle: 'Czesto zadawane pytania',
    faq1q: 'Co to jest wyrazenie regularne?',
    faq1a: 'Wyrazenie regularne to sekwencja znakow definiujaca wzorzec wyszukiwania. Jest uzywane do dopasowywania lancuchow, wyszukiwania i manipulacji tekstem.',
    faq2q: 'Co oznaczaja flagi regex?',
    faq2a: 'Popularne flagi: g (globalny) znajduje wszystkie dopasowania; i (bez rozrozniania wielkosci liter); m (wieloliniowy); s (dotAll) pozwala . dopasowac znaki nowej linii.',
    faq3q: 'Dlaczego moj regex nie dopasowuje?',
    faq3a: 'Typowe problemy: brak flagi globalnej, nieeskejpowane znaki specjalne, nieprawidlowe klasy znakow, zachlanne vs leniwe kwantyfikatory.',
    faq4q: 'Czy moje dane sa przetwarzane na serwerze?',
    faq4a: 'Nie, wszystkie testy odbywaja sie w przegladarce za pomoca JavaScript. Zadne dane nie sa wysylane na serwer.',
    faq5q: 'Jaka skladnia regex jest obslugiwana?',
    faq5a: 'To narzedzie uzywa skladni JavaScript wyrazen regularnych z klasami znakow, kwantyfikatorami, asercjami, grupami, referencjami i lookahead/lookbehind.',
    relatedTitle: 'Powiazane narzedzia',
  },
  sv: {
    title: 'Regex-byggare & Testare',
    description: 'Bygg, testa och felsok reguljara uttryck med realtidsmatchning och detaljerade forklaringar av varje monsterdel.',
    patternLabel: 'Reguljart uttryck',
    patternPlaceholder: 'Ange ditt regex-monster, t.ex. ^[a-zA-Z0-9]+$',
    flagsLabel: 'Flaggor',
    testLabel: 'Teststrang',
    testPlaceholder: 'Ange text att testa...',
    matchesLabel: 'Traffar',
    noMatches: 'Inga traffar hittades.',
    explanationLabel: 'Monsterforklaring',
    templatesLabel: 'Vanliga mallar',
    matchCount: 'traffar hittades',
    fullMatch: 'Fullstandig traff',
    group: 'Grupp',
    index: 'Index',
    clear: 'Rensa',
    introTitle: 'Gratis Regex-byggare Online',
    introText: 'Denna regex-byggare och testare later dig bygga, testa och felsoka reguljara uttryck i realtid. Ange ett monster och en teststrang for att se traffar direkt.',
    howTitle: 'Hur man anvander Regex-byggaren',
    step1: 'Ange ett reguljart uttrycksmonster i faltet',
    step2: 'Stall in flaggor (global, skiftlagesokanslig, flerradig, etc.)',
    step3: 'Skriv eller klistra in en teststrang for att se realtidstraffar',
    step4: 'Las monsterforklaringen for att forsta varje del',
    faqTitle: 'Vanliga fragor',
    faq1q: 'Vad ar ett reguljart uttryck?',
    faq1a: 'Ett reguljart uttryck ar en sekvens av tecken som definierar ett sokmonster. Det anvands for strangmatchning, sokning och textmanipulation.',
    faq2q: 'Vad betyder regex-flaggorna?',
    faq2a: 'Vanliga flaggor: g (global) hittar alla traffar; i (skiftlagesokanslig); m (flerradig); s (dotAll) later . matcha radbrytningar.',
    faq3q: 'Varfor matchar inte mitt regex?',
    faq3a: 'Vanliga problem: saknad global flagga, icke-escapade specialtecken, felaktiga teckenklasser, giriga vs lata kvantifierare.',
    faq4q: 'Bearbetas mina data pa en server?',
    faq4a: 'Nej, alla tester sker i din webblasare med JavaScript. Ingen data skickas till nagon server.',
    faq5q: 'Vilken regex-syntax stods?',
    faq5a: 'Detta verktyg anvander JavaScript regex-syntax med teckenklasser, kvantifierare, assertions, grupper, aterreferenser och lookahead/lookbehind.',
    relatedTitle: 'Relaterade verktyg',
  },
  no: {
    title: 'Regex-bygger & Tester',
    description: 'Bygg, test og feilsok regulaere uttrykk med sanntidsmatching og detaljerte forklaringer av hver monsterdel.',
    patternLabel: 'Regulaert uttrykk',
    patternPlaceholder: 'Skriv inn regex-monsteret ditt, f.eks. ^[a-zA-Z0-9]+$',
    flagsLabel: 'Flagg',
    testLabel: 'Teststreng',
    testPlaceholder: 'Skriv inn tekst for a teste...',
    matchesLabel: 'Treff',
    noMatches: 'Ingen treff funnet.',
    explanationLabel: 'Monsterforklaring',
    templatesLabel: 'Vanlige maler',
    matchCount: 'treff funnet',
    fullMatch: 'Fullstendig treff',
    group: 'Gruppe',
    index: 'Indeks',
    clear: 'Toom',
    introTitle: 'Gratis Regex-bygger Online',
    introText: 'Denne regex-byggeren og testeren lar deg bygge, teste og feilsoke regulaere uttrykk i sanntid. Skriv inn et monster og en teststreng for a se treff umiddelbart.',
    howTitle: 'Slik bruker du Regex-byggeren',
    step1: 'Skriv inn et regulaert uttrykkmonster i feltet',
    step2: 'Sett flagg (global, ufolsom for store/sma bokstaver, flerlinjet, etc.)',
    step3: 'Skriv eller lim inn en teststreng for a se sanntidstreff',
    step4: 'Les monsterforklaringen for a forsta hver del',
    faqTitle: 'Ofte stilte sporsmal',
    faq1q: 'Hva er et regulaert uttrykk?',
    faq1a: 'Et regulaert uttrykk er en sekvens av tegn som definerer et sokemonster. Det brukes til strengmatching, soking og tekstmanipulasjon.',
    faq2q: 'Hva betyr regex-flaggene?',
    faq2a: 'Vanlige flagg: g (global) finner alle treff; i (ufolsom for store/sma bokstaver); m (flerlinjet); s (dotAll) lar . matche linjeskift.',
    faq3q: 'Hvorfor matcher ikke mitt regex?',
    faq3a: 'Vanlige problemer: manglende globalt flagg, ikke-escapede spesialtegn, feil tegnklasser, graadige vs late kvantifiserere.',
    faq4q: 'Behandles dataene mine pa en server?',
    faq4a: 'Nei, alle tester skjer i nettleseren din med JavaScript. Ingen data sendes til noen server.',
    faq5q: 'Hvilken regex-syntaks stettes?',
    faq5a: 'Dette verktooyet bruker JavaScript regex-syntaks med tegnklasser, kvantifiserere, assertions, grupper, tilbakereferanser og lookahead/lookbehind.',
    relatedTitle: 'Relaterte verktoy',
  },
  id: {
    title: 'Pembuat & Penguji Regex',
    description: 'Bangun, uji, dan debug ekspresi reguler dengan pencocokan waktu nyata dan penjelasan detail setiap bagian pola.',
    patternLabel: 'Ekspresi reguler',
    patternPlaceholder: 'Masukkan pola regex Anda, misal ^[a-zA-Z0-9]+$',
    flagsLabel: 'Flag',
    testLabel: 'String uji',
    testPlaceholder: 'Masukkan teks untuk diuji...',
    matchesLabel: 'Kecocokan',
    noMatches: 'Tidak ditemukan kecocokan.',
    explanationLabel: 'Penjelasan pola',
    templatesLabel: 'Template umum',
    matchCount: 'kecocokan ditemukan',
    fullMatch: 'Kecocokan penuh',
    group: 'Grup',
    index: 'Indeks',
    clear: 'Hapus',
    introTitle: 'Pembuat Regex Online Gratis',
    introText: 'Pembuat dan penguji regex ini memungkinkan Anda membangun, menguji, dan debug ekspresi reguler secara waktu nyata. Masukkan pola dan string uji untuk melihat kecocokan secara instan.',
    howTitle: 'Cara menggunakan Pembuat Regex',
    step1: 'Masukkan pola ekspresi reguler di kolom',
    step2: 'Atur flag (global, case-insensitive, multiline, dll.)',
    step3: 'Ketik atau tempel string uji untuk melihat kecocokan waktu nyata',
    step4: 'Baca penjelasan pola untuk memahami setiap bagian',
    faqTitle: 'Pertanyaan yang sering diajukan',
    faq1q: 'Apa itu ekspresi reguler?',
    faq1a: 'Ekspresi reguler adalah urutan karakter yang mendefinisikan pola pencarian. Digunakan untuk pencocokan string, pencarian, dan manipulasi teks.',
    faq2q: 'Apa arti flag regex?',
    faq2a: 'Flag umum: g (global) menemukan semua kecocokan; i (case-insensitive); m (multiline); s (dotAll) membuat . cocok dengan baris baru.',
    faq3q: 'Mengapa regex saya tidak cocok?',
    faq3a: 'Masalah umum: flag global hilang, karakter khusus tidak di-escape, kelas karakter salah, quantifier rakus vs malas.',
    faq4q: 'Apakah data saya diproses di server?',
    faq4a: 'Tidak, semua pengujian terjadi di browser Anda dengan JavaScript. Tidak ada data yang dikirim ke server.',
    faq5q: 'Sintaks regex apa yang didukung?',
    faq5a: 'Alat ini menggunakan sintaks regex JavaScript dengan kelas karakter, quantifier, assertion, grup, referensi balik, dan lookahead/lookbehind.',
    relatedTitle: 'Alat terkait',
  },
  th: {
    title: 'เครื่องมือสร้างและทดสอบ Regex',
    description: 'สร้าง ทดสอบ และดีบักนิพจน์ทั่วไปพร้อมการจับคู่แบบเรียลไทม์และคำอธิบายรายละเอียดของแต่ละส่วนของรูปแบบ',
    patternLabel: 'นิพจน์ทั่วไป',
    patternPlaceholder: 'ป้อนรูปแบบ regex เช่น ^[a-zA-Z0-9]+$',
    flagsLabel: 'แฟล็ก',
    testLabel: 'สตริงทดสอบ',
    testPlaceholder: 'ป้อนข้อความเพื่อทดสอบ...',
    matchesLabel: 'ผลการจับคู่',
    noMatches: 'ไม่พบการจับคู่',
    explanationLabel: 'คำอธิบายรูปแบบ',
    templatesLabel: 'เทมเพลตทั่วไป',
    matchCount: 'การจับคู่ที่พบ',
    fullMatch: 'การจับคู่ทั้งหมด',
    group: 'กลุ่ม',
    index: 'ดัชนี',
    clear: 'ล้าง',
    introTitle: 'เครื่องมือสร้าง Regex ออนไลน์ฟรี',
    introText: 'เครื่องมือสร้างและทดสอบ regex นี้ช่วยให้คุณสร้าง ทดสอบ และดีบักนิพจน์ทั่วไปแบบเรียลไทม์ ป้อนรูปแบบและสตริงทดสอบเพื่อดูการจับคู่ทันที',
    howTitle: 'วิธีใช้เครื่องมือสร้าง Regex',
    step1: 'ป้อนรูปแบบนิพจน์ทั่วไปในช่อง',
    step2: 'ตั้งค่าแฟล็ก (global, case-insensitive, multiline ฯลฯ)',
    step3: 'พิมพ์หรือวางสตริงทดสอบเพื่อดูการจับคู่แบบเรียลไทม์',
    step4: 'อ่านคำอธิบายรูปแบบเพื่อทำความเข้าใจแต่ละส่วน',
    faqTitle: 'คำถามที่พบบ่อย',
    faq1q: 'นิพจน์ทั่วไปคืออะไร?',
    faq1a: 'นิพจน์ทั่วไปคือลำดับอักขระที่กำหนดรูปแบบการค้นหา ใช้สำหรับการจับคู่สตริง การค้นหา และการจัดการข้อความ',
    faq2q: 'แฟล็ก regex หมายถึงอะไร?',
    faq2a: 'แฟล็กทั่วไป: g (global) ค้นหาทุกการจับคู่; i (case-insensitive); m (multiline); s (dotAll) ทำให้ . จับคู่กับบรรทัดใหม่',
    faq3q: 'ทำไม regex ของฉันไม่จับคู่?',
    faq3a: 'ปัญหาทั่วไป: ขาดแฟล็ก global, อักขระพิเศษไม่ได้ escape, คลาสอักขระผิด, quantifier แบบโลภ vs ขี้เกียจ',
    faq4q: 'ข้อมูลของฉันถูกประมวลผลบนเซิร์ฟเวอร์หรือไม่?',
    faq4a: 'ไม่ การทดสอบทั้งหมดเกิดขึ้นในเบราว์เซอร์ด้วย JavaScript ไม่มีข้อมูลถูกส่งไปยังเซิร์ฟเวอร์',
    faq5q: 'รองรับไวยากรณ์ regex ใดบ้าง?',
    faq5a: 'เครื่องมือนี้ใช้ไวยากรณ์ regex ของ JavaScript รองรับคลาสอักขระ quantifier assertion กลุ่ม การอ้างอิงย้อนกลับ lookahead และ lookbehind',
    relatedTitle: 'เครื่องมือที่เกี่ยวข้อง',
  },
};

interface RegexMatch {
  value: string;
  index: number;
  groups: string[];
}

const templates = [
  { name: 'Email', pattern: '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}', flags: 'g' },
  { name: 'URL', pattern: 'https?:\\/\\/[\\w\\-]+(\\.[\\w\\-]+)+[\\/\\w\\-._~:?#[\\]@!$&\'()*+,;=%]*', flags: 'g' },
  { name: 'IPv4', pattern: '\\b(?:\\d{1,3}\\.){3}\\d{1,3}\\b', flags: 'g' },
  { name: 'Phone (US)', pattern: '\\(?\\d{3}\\)?[-.\\s]?\\d{3}[-.\\s]?\\d{4}', flags: 'g' },
  { name: 'Hex Color', pattern: '#(?:[0-9a-fA-F]{3}){1,2}\\b', flags: 'g' },
  { name: 'Date (YYYY-MM-DD)', pattern: '\\d{4}-(?:0[1-9]|1[0-2])-(?:0[1-9]|[12]\\d|3[01])', flags: 'g' },
];

function explainPattern(pattern: string): Array<{ token: string; explanation: string }> {
  const explanations: Array<{ token: string; explanation: string }> = [];
  let i = 0;
  while (i < pattern.length) {
    const ch = pattern[i];
    if (ch === '^') { explanations.push({ token: '^', explanation: 'Start of string/line' }); i++; }
    else if (ch === '$') { explanations.push({ token: '$', explanation: 'End of string/line' }); i++; }
    else if (ch === '.') { explanations.push({ token: '.', explanation: 'Any character except newline' }); i++; }
    else if (ch === '*') { explanations.push({ token: '*', explanation: 'Zero or more of preceding' }); i++; }
    else if (ch === '+') { explanations.push({ token: '+', explanation: 'One or more of preceding' }); i++; }
    else if (ch === '?') { explanations.push({ token: '?', explanation: 'Zero or one of preceding (optional)' }); i++; }
    else if (ch === '|') { explanations.push({ token: '|', explanation: 'Alternation (OR)' }); i++; }
    else if (ch === '\\' && i + 1 < pattern.length) {
      const next = pattern[i + 1];
      const escMap: Record<string, string> = { d: 'Digit [0-9]', D: 'Non-digit', w: 'Word char [a-zA-Z0-9_]', W: 'Non-word char', s: 'Whitespace', S: 'Non-whitespace', b: 'Word boundary', B: 'Non-word boundary', n: 'Newline', t: 'Tab' };
      explanations.push({ token: `\\${next}`, explanation: escMap[next] || `Escaped "${next}"` });
      i += 2;
    } else if (ch === '[') {
      let end = pattern.indexOf(']', i);
      if (end === -1) end = pattern.length;
      const cls = pattern.slice(i, end + 1);
      explanations.push({ token: cls, explanation: cls.startsWith('[^') ? `Any char NOT in ${cls}` : `Any char in ${cls}` });
      i = end + 1;
    } else if (ch === '(') {
      let label = 'Capturing group';
      if (pattern.slice(i).startsWith('(?:')) label = 'Non-capturing group';
      else if (pattern.slice(i).startsWith('(?=')) label = 'Positive lookahead';
      else if (pattern.slice(i).startsWith('(?!')) label = 'Negative lookahead';
      else if (pattern.slice(i).startsWith('(?<=')) label = 'Positive lookbehind';
      else if (pattern.slice(i).startsWith('(?<!')) label = 'Negative lookbehind';
      explanations.push({ token: ch, explanation: label });
      i++;
    } else if (ch === ')') {
      explanations.push({ token: ')', explanation: 'End of group' });
      i++;
    } else if (ch === '{') {
      let end = pattern.indexOf('}', i);
      if (end === -1) end = pattern.length;
      const q = pattern.slice(i, end + 1);
      explanations.push({ token: q, explanation: `Quantifier: repeat ${q}` });
      i = end + 1;
    } else {
      explanations.push({ token: ch, explanation: `Literal "${ch}"` });
      i++;
    }
  }
  return explanations;
}

export default function RegexBuilder() {
  const { lang } = useLang();
  const t = ui[lang] || ui.en;
  const [pattern, setPattern] = useState('');
  const [flags, setFlags] = useState('g');
  const [testString, setTestString] = useState('');

  const flagOptions = [
    { flag: 'g', label: 'Global' },
    { flag: 'i', label: 'Case Insensitive' },
    { flag: 'm', label: 'Multiline' },
    { flag: 's', label: 'DotAll' },
  ];

  const toggleFlag = useCallback((f: string) => {
    setFlags(prev => prev.includes(f) ? prev.replace(f, '') : prev + f);
  }, []);

  let matches: RegexMatch[] = [];
  let error = '';
  let highlightedText = testString;

  if (pattern) {
    try {
      const regex = new RegExp(pattern, flags);
      const allMatches: RegexMatch[] = [];
      let match;
      if (flags.includes('g')) {
        while ((match = regex.exec(testString)) !== null) {
          allMatches.push({ value: match[0], index: match.index, groups: match.slice(1) });
          if (!match[0]) break;
        }
      } else {
        match = regex.exec(testString);
        if (match) allMatches.push({ value: match[0], index: match.index, groups: match.slice(1) });
      }
      matches = allMatches;

      // Build highlighted text
      if (matches.length > 0 && testString) {
        let result = '';
        let lastIdx = 0;
        for (const m of matches) {
          const before = testString.slice(lastIdx, m.index).replace(/</g, '&lt;').replace(/>/g, '&gt;');
          const matched = m.value.replace(/</g, '&lt;').replace(/>/g, '&gt;');
          result += before + `<mark style="background:rgba(59,130,246,0.3);padding:1px 2px;border-radius:2px">${matched}</mark>`;
          lastIdx = m.index + m.value.length;
        }
        result += testString.slice(lastIdx).replace(/</g, '&lt;').replace(/>/g, '&gt;');
        highlightedText = result;
      }
    } catch (e) {
      error = (e as Error).message;
    }
  }

  const explanation = pattern ? explainPattern(pattern) : [];

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: t.faq1q, acceptedAnswer: { '@type': 'Answer', text: t.faq1a } },
      { '@type': 'Question', name: t.faq2q, acceptedAnswer: { '@type': 'Answer', text: t.faq2a } },
      { '@type': 'Question', name: t.faq3q, acceptedAnswer: { '@type': 'Answer', text: t.faq3a } },
      { '@type': 'Question', name: t.faq4q, acceptedAnswer: { '@type': 'Answer', text: t.faq4a } },
      { '@type': 'Question', name: t.faq5q, acceptedAnswer: { '@type': 'Answer', text: t.faq5a } },
    ],
  };

  return (
    <ToolLayout title={t.title} description={t.description} toolId="regex-builder">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* Pattern input */}
      <div style={{ marginBottom: 12 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
          <label style={{ fontSize: 13, fontWeight: 600 }}>{t.patternLabel}</label>
          <CopyButton text={pattern} />
        </div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <span style={{ fontSize: 18, color: 'var(--text-secondary)', fontFamily: 'monospace' }}>/</span>
          <input
            type="text"
            value={pattern}
            onChange={e => setPattern(e.target.value)}
            placeholder={t.patternPlaceholder}
            style={{
              flex: 1, padding: '10px 14px', borderRadius: 8, border: error ? '2px solid #ef4444' : '1px solid var(--border-color)',
              background: 'var(--bg-input)', color: 'var(--text-primary)', fontFamily: 'monospace', fontSize: 14,
            }}
          />
          <span style={{ fontSize: 18, color: 'var(--text-secondary)', fontFamily: 'monospace' }}>/{flags}</span>
        </div>
        {error && <p style={{ color: '#ef4444', fontSize: 12, marginTop: 6 }}>{error}</p>}
      </div>

      {/* Flags */}
      <div style={{ marginBottom: 16 }}>
        <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 6 }}>{t.flagsLabel}</label>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {flagOptions.map(opt => (
            <button
              key={opt.flag}
              onClick={() => toggleFlag(opt.flag)}
              style={{
                padding: '4px 12px', borderRadius: 6, border: '1px solid var(--border-color)', fontSize: 12, cursor: 'pointer',
                background: flags.includes(opt.flag) ? 'linear-gradient(135deg, var(--accent-blue), var(--accent-purple))' : 'var(--bg-input)',
                color: flags.includes(opt.flag) ? 'white' : 'var(--text-secondary)',
                fontFamily: 'monospace', transition: 'all 0.2s',
              }}
            >
              {opt.flag} - {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Templates */}
      <div style={{ marginBottom: 16 }}>
        <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 6 }}>{t.templatesLabel}</label>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {templates.map(tmpl => (
            <button
              key={tmpl.name}
              onClick={() => { setPattern(tmpl.pattern); setFlags(tmpl.flags); }}
              style={{
                padding: '4px 10px', borderRadius: 6, border: '1px solid var(--border-color)', fontSize: 12,
                cursor: 'pointer', background: 'var(--bg-input)', color: 'var(--accent-blue)', transition: 'all 0.2s',
              }}
            >
              {tmpl.name}
            </button>
          ))}
        </div>
      </div>

      {/* Test string */}
      <div style={{ marginBottom: 16 }}>
        <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 6 }}>{t.testLabel}</label>
        <textarea
          value={testString}
          onChange={e => setTestString(e.target.value)}
          placeholder={t.testPlaceholder}
          style={{ minHeight: 120, fontFamily: 'monospace', fontSize: 13, lineHeight: 1.6 }}
        />
      </div>

      {/* Highlighted output */}
      {testString && pattern && !error && (
        <div style={{ marginBottom: 16, padding: 16, borderRadius: 10, border: '1px solid var(--border-color)', background: 'var(--bg-card)', fontFamily: 'monospace', fontSize: 13, lineHeight: 1.8, whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}
          dangerouslySetInnerHTML={{ __html: highlightedText }}
        />
      )}

      {/* Matches */}
      <div style={{ marginBottom: 16 }}>
        <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 6 }}>
          {t.matchesLabel} {matches.length > 0 && <span style={{ fontWeight: 400, color: 'var(--text-secondary)' }}>({matches.length} {t.matchCount})</span>}
        </label>
        {matches.length === 0 && testString && pattern && !error && (
          <p style={{ color: 'var(--text-secondary)', fontSize: 13 }}>{t.noMatches}</p>
        )}
        {matches.length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {matches.map((m, idx) => (
              <div key={idx} style={{ padding: '8px 12px', borderRadius: 8, border: '1px solid var(--border-color)', background: 'var(--bg-input)', fontSize: 13, fontFamily: 'monospace' }}>
                <span style={{ color: 'var(--text-secondary)', marginRight: 8 }}>{t.index}: {m.index}</span>
                <span style={{ color: 'var(--accent-blue)', fontWeight: 600 }}>{t.fullMatch}: &quot;{m.value}&quot;</span>
                {m.groups.length > 0 && m.groups.map((g, gi) => (
                  <span key={gi} style={{ marginLeft: 12, color: 'var(--text-secondary)' }}>{t.group} {gi + 1}: &quot;{g}&quot;</span>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Pattern explanation */}
      {explanation.length > 0 && (
        <div style={{ marginBottom: 16 }}>
          <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 6 }}>{t.explanationLabel}</label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
            {explanation.map((exp, idx) => (
              <div key={idx} style={{ padding: '4px 8px', borderRadius: 6, border: '1px solid var(--border-color)', background: 'var(--bg-input)', fontSize: 12, cursor: 'default' }}
                title={exp.explanation}>
                <span style={{ fontFamily: 'monospace', fontWeight: 600, color: 'var(--accent-blue)' }}>{exp.token}</span>
                <span style={{ color: 'var(--text-secondary)', marginLeft: 4 }}>{exp.explanation}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div style={{ marginBottom: 16 }}>
        <button onClick={() => { setPattern(''); setFlags('g'); setTestString(''); }} className="btn btn-secondary" style={{ fontSize: 13 }}>{t.clear}</button>
      </div>

      {/* SEO Content */}
      <div style={{ marginTop: 30, paddingTop: 24, borderTop: '1px solid var(--border-color)' }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 12 }}>{t.introTitle}</h2>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 20 }}>{t.introText}</p>

        <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{t.howTitle}</h3>
        <ol style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.8, paddingLeft: 20, marginBottom: 24 }}>
          <li>{t.step1}</li>
          <li>{t.step2}</li>
          <li>{t.step3}</li>
          <li>{t.step4}</li>
        </ol>

        <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{t.faqTitle}</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 24 }}>
          {[
            { q: t.faq1q, a: t.faq1a },
            { q: t.faq2q, a: t.faq2a },
            { q: t.faq3q, a: t.faq3a },
            { q: t.faq4q, a: t.faq4a },
            { q: t.faq5q, a: t.faq5a },
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
            { href: `/${lang}/tools/escape-unescape`, label: 'Escape/Unescape' },
            { href: `/${lang}/tools/json-formatter`, label: 'JSON Formatter' },
            { href: `/${lang}/tools/text-diff`, label: 'Text Diff' },
            { href: `/${lang}/tools/url-parser`, label: 'URL Parser' },
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
