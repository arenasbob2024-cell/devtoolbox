'use client';

import { useState, useMemo } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import Link from 'next/link';
import { useLang } from '@/i18n/LangContext';

const ui: Record<string, Record<string, string>> = {
  en: {
    title: 'JSONPath Tester',
    description: 'Test JSONPath expressions against JSON data with real-time results. Debug and validate JSONPath queries.',
    jsonInput: 'JSON Data',
    pathInput: 'JSONPath Expression',
    result: 'Result',
    matches: 'matches',
    noMatch: 'No matches found',
    invalidJson: 'Invalid JSON',
    invalidPath: 'Invalid JSONPath expression',
    examples: 'Example Expressions',
    sampleData: 'Load Sample Data',
    clear: 'Clear',
    reference: 'JSONPath Reference',
    introTitle: 'Free Online JSONPath Expression Tester',
    introText: 'Test and debug JSONPath expressions against JSON data with instant results. JSONPath is a query language for JSON, similar to XPath for XML. Use it to extract specific values, filter arrays, and navigate complex JSON structures. All processing happens in your browser with no data sent to any server.',
    tipTitle: 'JSONPath Tips',
    tip1: '$ represents the root object or array',
    tip2: 'Use dot notation $.store.book or bracket notation $[\'store\'][\'book\']',
    tip3: '[*] selects all elements in an array',
    tip4: '[0] selects the first element, [-1] selects the last',
    tip5: '[?(@.price < 10)] filters elements by condition',
    faqTitle: 'Frequently Asked Questions',
    faq1q: 'What is JSONPath?',
    faq1a: 'JSONPath is a query language for JSON data, similar to XPath for XML. It provides a way to navigate and extract data from JSON structures using path expressions. It was introduced by Stefan Goessner and is widely used in API testing, data extraction, and configuration.',
    faq2q: 'What does $ mean in JSONPath?',
    faq2a: 'The $ symbol represents the root element of the JSON document. All JSONPath expressions start with $ to indicate they begin at the top level. For example, $.name accesses the "name" property of the root object.',
    faq3q: 'How do I filter array elements?',
    faq3a: 'Use filter expressions with the [?()] syntax. For example, $.books[?(@.price < 20)] selects all books with price less than 20. The @ symbol refers to the current element being evaluated.',
    faq4q: 'What is the difference between . and ..?',
    faq4a: 'A single dot (.) accesses direct child properties, while double dots (..) perform a recursive descent, searching all descendants at any depth. For example, $..name finds all "name" properties anywhere in the document.',
    faq5q: 'Is this tool free?',
    faq5a: 'Yes, completely free. All JSONPath evaluation happens client-side in your browser. Your data never leaves your machine.',
    relatedTitle: 'Related Tools',
  },
  zh: {
    title: 'JSONPath 测试工具',
    description: '使用实时结果测试 JSONPath 表达式。',
    jsonInput: 'JSON 数据', pathInput: 'JSONPath 表达式', result: '结果', matches: '个匹配', noMatch: '未找到匹配', invalidJson: '无效的 JSON', invalidPath: '无效的 JSONPath 表达式',
    examples: '示例表达式', sampleData: '加载示例数据', clear: '清除', reference: 'JSONPath 参考',
    introTitle: '免费在线 JSONPath 测试工具', introText: '使用即时结果测试和调试 JSONPath 表达式。JSONPath 是 JSON 的查询语言，类似于 XML 的 XPath。所有处理都在浏览器端完成。',
    tipTitle: '提示', tip1: '$ 代表根对象或数组', tip2: '使用点表示法 $.store.book 或括号表示法', tip3: '[*] 选择数组中的所有元素', tip4: '[0] 选择第一个元素，[-1] 选择最后一个', tip5: '[?(@.price < 10)] 按条件过滤元素',
    faqTitle: '常见问题',
    faq1q: '什么是 JSONPath？', faq1a: 'JSONPath 是 JSON 数据的查询语言，类似于 XML 的 XPath，用于导航和提取 JSON 结构中的数据。',
    faq2q: '$ 在 JSONPath 中是什么意思？', faq2a: '$ 符号代表 JSON 文档的根元素。所有 JSONPath 表达式都以 $ 开头。',
    faq3q: '如何过滤数组元素？', faq3a: '使用过滤表达式 [?()] 语法，例如 $.books[?(@.price < 20)]。',
    faq4q: '. 和 .. 的区别是什么？', faq4a: '单点(.)访问直接子属性，双点(..)递归搜索所有后代。',
    faq5q: '免费吗？', faq5a: '完全免费。所有 JSONPath 计算都在浏览器端完成。',
    relatedTitle: '相关工具',
  },
  fr: {
    title: 'Testeur JSONPath', description: 'Testez les expressions JSONPath sur des donnees JSON.',
    jsonInput: 'Donnees JSON', pathInput: 'Expression JSONPath', result: 'Resultat', matches: 'correspondances', noMatch: 'Aucune correspondance', invalidJson: 'JSON invalide', invalidPath: 'Expression JSONPath invalide',
    examples: 'Exemples', sampleData: 'Charger l\'exemple', clear: 'Effacer', reference: 'Reference JSONPath',
    introTitle: 'Testeur JSONPath gratuit', introText: 'Testez et deboguez des expressions JSONPath avec des resultats instantanes.',
    tipTitle: 'Conseils', tip1: '$ represente l\'objet racine', tip2: 'Notation par points ou par crochets', tip3: '[*] selectionne tous les elements', tip4: '[0] selectionne le premier', tip5: '[?(@.prix < 10)] filtre par condition',
    faqTitle: 'FAQ', faq1q: 'Qu\'est-ce que JSONPath?', faq1a: 'JSONPath est un langage de requete pour les donnees JSON.',
    faq2q: 'Que signifie $?', faq2a: '$ represente l\'element racine du document JSON.',
    faq3q: 'Comment filtrer?', faq3a: 'Utilisez la syntaxe [?()], par exemple $.livres[?(@.prix < 20)].',
    faq4q: 'Difference entre . et ..?', faq4a: '. accede aux enfants directs, .. recherche tous les descendants.',
    faq5q: 'Est-ce gratuit?', faq5a: 'Oui, entierement gratuit.',
    relatedTitle: 'Outils connexes',
  },
  de: {
    title: 'JSONPath Tester', description: 'Testen Sie JSONPath-Ausdruecke gegen JSON-Daten.',
    jsonInput: 'JSON-Daten', pathInput: 'JSONPath-Ausdruck', result: 'Ergebnis', matches: 'Treffer', noMatch: 'Keine Treffer', invalidJson: 'Ungueltiges JSON', invalidPath: 'Ungueltiger JSONPath-Ausdruck',
    examples: 'Beispielausdruecke', sampleData: 'Beispieldaten laden', clear: 'Loeschen', reference: 'JSONPath-Referenz',
    introTitle: 'Kostenloser JSONPath Tester', introText: 'Testen und debuggen Sie JSONPath-Ausdruecke mit sofortigen Ergebnissen.',
    tipTitle: 'Tipps', tip1: '$ steht fuer das Wurzelobjekt', tip2: 'Punkt- oder Klammernotation', tip3: '[*] waehlt alle Elemente', tip4: '[0] waehlt das erste Element', tip5: '[?(@.preis < 10)] filtert nach Bedingung',
    faqTitle: 'FAQ', faq1q: 'Was ist JSONPath?', faq1a: 'JSONPath ist eine Abfragesprache fuer JSON-Daten.',
    faq2q: 'Was bedeutet $?', faq2a: '$ steht fuer das Wurzelelement des JSON-Dokuments.',
    faq3q: 'Wie filtere ich?', faq3a: 'Verwenden Sie die [?()]-Syntax.',
    faq4q: 'Unterschied zwischen . und ..?', faq4a: '. greift auf direkte Kinder zu, .. sucht alle Nachkommen.',
    faq5q: 'Ist es kostenlos?', faq5a: 'Ja, komplett kostenlos.',
    relatedTitle: 'Verwandte Tools',
  },
  es: {
    title: 'Probador JSONPath', description: 'Pruebe expresiones JSONPath contra datos JSON.',
    jsonInput: 'Datos JSON', pathInput: 'Expresion JSONPath', result: 'Resultado', matches: 'coincidencias', noMatch: 'Sin coincidencias', invalidJson: 'JSON invalido', invalidPath: 'Expresion JSONPath invalida',
    examples: 'Ejemplos', sampleData: 'Cargar ejemplo', clear: 'Limpiar', reference: 'Referencia JSONPath',
    introTitle: 'Probador JSONPath gratuito', introText: 'Pruebe y depure expresiones JSONPath con resultados instantaneos.',
    tipTitle: 'Consejos', tip1: '$ representa el objeto raiz', tip2: 'Notacion de puntos o corchetes', tip3: '[*] selecciona todos los elementos', tip4: '[0] selecciona el primero', tip5: '[?(@.precio < 10)] filtra por condicion',
    faqTitle: 'FAQ', faq1q: 'Que es JSONPath?', faq1a: 'JSONPath es un lenguaje de consulta para datos JSON.',
    faq2q: 'Que significa $?', faq2a: '$ representa el elemento raiz del documento JSON.',
    faq3q: 'Como filtrar?', faq3a: 'Use la sintaxis [?()].',
    faq4q: 'Diferencia entre . y ..?', faq4a: '. accede a hijos directos, .. busca todos los descendientes.',
    faq5q: 'Es gratis?', faq5a: 'Si, completamente gratis.',
    relatedTitle: 'Herramientas relacionadas',
  },
  it: {
    title: 'Tester JSONPath', description: 'Testa espressioni JSONPath su dati JSON.',
    jsonInput: 'Dati JSON', pathInput: 'Espressione JSONPath', result: 'Risultato', matches: 'corrispondenze', noMatch: 'Nessuna corrispondenza', invalidJson: 'JSON non valido', invalidPath: 'Espressione JSONPath non valida',
    examples: 'Esempi', sampleData: 'Carica esempio', clear: 'Cancella', reference: 'Riferimento JSONPath',
    introTitle: 'Tester JSONPath gratuito', introText: 'Testa e debug espressioni JSONPath con risultati istantanei.',
    tipTitle: 'Suggerimenti', tip1: '$ rappresenta l\'oggetto radice', tip2: 'Notazione a punti o parentesi', tip3: '[*] seleziona tutti gli elementi', tip4: '[0] seleziona il primo', tip5: '[?(@.prezzo < 10)] filtra per condizione',
    faqTitle: 'FAQ', faq1q: 'Cos\'e JSONPath?', faq1a: 'JSONPath e un linguaggio di query per dati JSON.',
    faq2q: 'Cosa significa $?', faq2a: '$ rappresenta l\'elemento radice del documento JSON.',
    faq3q: 'Come filtrare?', faq3a: 'Usa la sintassi [?()].',
    faq4q: 'Differenza tra . e ..?', faq4a: '. accede ai figli diretti, .. cerca tutti i discendenti.',
    faq5q: 'E gratuito?', faq5a: 'Si, completamente gratuito.',
    relatedTitle: 'Strumenti correlati',
  },
  pt: {
    title: 'Testador JSONPath', description: 'Teste expressoes JSONPath contra dados JSON.',
    jsonInput: 'Dados JSON', pathInput: 'Expressao JSONPath', result: 'Resultado', matches: 'correspondencias', noMatch: 'Sem correspondencias', invalidJson: 'JSON invalido', invalidPath: 'Expressao JSONPath invalida',
    examples: 'Exemplos', sampleData: 'Carregar exemplo', clear: 'Limpar', reference: 'Referencia JSONPath',
    introTitle: 'Testador JSONPath gratuito', introText: 'Teste e depure expressoes JSONPath com resultados instantaneos.',
    tipTitle: 'Dicas', tip1: '$ representa o objeto raiz', tip2: 'Notacao de pontos ou colchetes', tip3: '[*] seleciona todos os elementos', tip4: '[0] seleciona o primeiro', tip5: '[?(@.preco < 10)] filtra por condicao',
    faqTitle: 'FAQ', faq1q: 'O que e JSONPath?', faq1a: 'JSONPath e uma linguagem de consulta para dados JSON.',
    faq2q: 'O que significa $?', faq2a: '$ representa o elemento raiz do documento JSON.',
    faq3q: 'Como filtrar?', faq3a: 'Use a sintaxe [?()].',
    faq4q: 'Diferenca entre . e ..?', faq4a: '. acessa filhos diretos, .. busca todos os descendentes.',
    faq5q: 'E gratuito?', faq5a: 'Sim, completamente gratuito.',
    relatedTitle: 'Ferramentas relacionadas',
  },
  nl: {
    title: 'JSONPath Tester', description: 'Test JSONPath-expressies tegen JSON-data.',
    jsonInput: 'JSON-data', pathInput: 'JSONPath-expressie', result: 'Resultaat', matches: 'overeenkomsten', noMatch: 'Geen overeenkomsten', invalidJson: 'Ongeldig JSON', invalidPath: 'Ongeldige JSONPath-expressie',
    examples: 'Voorbeelden', sampleData: 'Voorbeelddata laden', clear: 'Wis', reference: 'JSONPath-referentie',
    introTitle: 'Gratis JSONPath tester', introText: 'Test en debug JSONPath-expressies met directe resultaten.',
    tipTitle: 'Tips', tip1: '$ vertegenwoordigt het root-object', tip2: 'Punt- of haakjesnotatie', tip3: '[*] selecteert alle elementen', tip4: '[0] selecteert het eerste', tip5: '[?(@.prijs < 10)] filtert op voorwaarde',
    faqTitle: 'FAQ', faq1q: 'Wat is JSONPath?', faq1a: 'JSONPath is een querytaal voor JSON-data.',
    faq2q: 'Wat betekent $?', faq2a: '$ vertegenwoordigt het root-element.',
    faq3q: 'Hoe filteren?', faq3a: 'Gebruik de [?()]-syntax.',
    faq4q: 'Verschil tussen . en ..?', faq4a: '. benadert directe kinderen, .. doorzoekt alle nakomelingen.',
    faq5q: 'Is het gratis?', faq5a: 'Ja, volledig gratis.',
    relatedTitle: 'Gerelateerde tools',
  },
  pl: {
    title: 'Tester JSONPath', description: 'Testuj wyrazenia JSONPath na danych JSON.',
    jsonInput: 'Dane JSON', pathInput: 'Wyrazenie JSONPath', result: 'Wynik', matches: 'dopasowania', noMatch: 'Brak dopasowan', invalidJson: 'Nieprawidlowy JSON', invalidPath: 'Nieprawidlowe wyrazenie JSONPath',
    examples: 'Przyklady', sampleData: 'Zaladuj przyklad', clear: 'Wyczysc', reference: 'Referencja JSONPath',
    introTitle: 'Darmowy tester JSONPath', introText: 'Testuj i debuguj wyrazenia JSONPath z natychmiastowymi wynikami.',
    tipTitle: 'Wskazowki', tip1: '$ reprezentuje obiekt glowny', tip2: 'Notacja punktowa lub nawiasowa', tip3: '[*] wybiera wszystkie elementy', tip4: '[0] wybiera pierwszy', tip5: '[?(@.cena < 10)] filtruje po warunku',
    faqTitle: 'FAQ', faq1q: 'Czym jest JSONPath?', faq1a: 'JSONPath to jezyk zapytan dla danych JSON.',
    faq2q: 'Co oznacza $?', faq2a: '$ reprezentuje element glowny dokumentu JSON.',
    faq3q: 'Jak filtrowac?', faq3a: 'Uzyj skladni [?()].',
    faq4q: 'Roznica miedzy . i ..?', faq4a: '. uzyskuje dostep do bezposrednich dzieci, .. przeszukuje wszystkich potomkow.',
    faq5q: 'Czy jest darmowe?', faq5a: 'Tak, calkowicie darmowe.',
    relatedTitle: 'Powiazane narzedzia',
  },
  sv: {
    title: 'JSONPath Testare', description: 'Testa JSONPath-uttryck mot JSON-data.',
    jsonInput: 'JSON-data', pathInput: 'JSONPath-uttryck', result: 'Resultat', matches: 'traeffar', noMatch: 'Inga traeffar', invalidJson: 'Ogiltig JSON', invalidPath: 'Ogiltigt JSONPath-uttryck',
    examples: 'Exempel', sampleData: 'Ladda exempeldata', clear: 'Rensa', reference: 'JSONPath-referens',
    introTitle: 'Gratis JSONPath-testare', introText: 'Testa och felsok JSONPath-uttryck med omedelbara resultat.',
    tipTitle: 'Tips', tip1: '$ representerar rotobjektet', tip2: 'Punkt- eller klammernotation', tip3: '[*] vaeljer alla element', tip4: '[0] vaeljer det foersta', tip5: '[?(@.pris < 10)] filtrerar paa villkor',
    faqTitle: 'FAQ', faq1q: 'Vad aer JSONPath?', faq1a: 'JSONPath aer ett fraagesprak foer JSON-data.',
    faq2q: 'Vad betyder $?', faq2a: '$ representerar rotelementet.',
    faq3q: 'Hur filtrerar man?', faq3a: 'Anvaend [?()]-syntax.',
    faq4q: 'Skillnad mellan . och ..?', faq4a: '. naar direkta barn, .. soeker alla aettlingar.',
    faq5q: 'Aer det gratis?', faq5a: 'Ja, helt gratis.',
    relatedTitle: 'Relaterade verktyg',
  },
  no: {
    title: 'JSONPath Tester', description: 'Test JSONPath-uttrykk mot JSON-data.',
    jsonInput: 'JSON-data', pathInput: 'JSONPath-uttrykk', result: 'Resultat', matches: 'treff', noMatch: 'Ingen treff', invalidJson: 'Ugyldig JSON', invalidPath: 'Ugyldig JSONPath-uttrykk',
    examples: 'Eksempler', sampleData: 'Last eksempeldata', clear: 'Toem', reference: 'JSONPath-referanse',
    introTitle: 'Gratis JSONPath-tester', introText: 'Test og feilsoek JSONPath-uttrykk med umiddelbare resultater.',
    tipTitle: 'Tips', tip1: '$ representerer rotobjektet', tip2: 'Punkt- eller klammenotasjon', tip3: '[*] velger alle elementer', tip4: '[0] velger det foerste', tip5: '[?(@.pris < 10)] filtrerer paa betingelse',
    faqTitle: 'FAQ', faq1q: 'Hva er JSONPath?', faq1a: 'JSONPath er et spoerresprak for JSON-data.',
    faq2q: 'Hva betyr $?', faq2a: '$ representerer rotelementet.',
    faq3q: 'Hvordan filtrere?', faq3a: 'Bruk [?()]-syntaks.',
    faq4q: 'Forskjell mellom . og ..?', faq4a: '. naar direkte barn, .. soeker alle etterkommere.',
    faq5q: 'Er det gratis?', faq5a: 'Ja, helt gratis.',
    relatedTitle: 'Relaterte verktoy',
  },
  ja: {
    title: 'JSONPath テスター', description: 'リアルタイム結果でJSONPath式をテスト。',
    jsonInput: 'JSON データ', pathInput: 'JSONPath 式', result: '結果', matches: '件の一致', noMatch: '一致なし', invalidJson: '無効な JSON', invalidPath: '無効な JSONPath 式',
    examples: '式の例', sampleData: 'サンプルデータ', clear: 'クリア', reference: 'JSONPath リファレンス',
    introTitle: '無料 JSONPath テスター', introText: 'JSONPath式をリアルタイムでテスト・デバッグ。',
    tipTitle: 'ヒント', tip1: '$ はルートオブジェクト', tip2: 'ドット記法またはブラケット記法', tip3: '[*] は全要素を選択', tip4: '[0] は最初の要素', tip5: '[?(@.price < 10)] で条件フィルタ',
    faqTitle: 'FAQ', faq1q: 'JSONPathとは？', faq1a: 'JSONPathはJSON用のクエリ言語です。',
    faq2q: '$の意味は？', faq2a: '$はJSONドキュメントのルート要素を表します。',
    faq3q: 'フィルタリングするには？', faq3a: '[?()]構文を使います。',
    faq4q: '.と..の違いは？', faq4a: '.は直接の子にアクセス、..は全ての子孫を検索。',
    faq5q: '無料ですか？', faq5a: 'はい、完全に無料です。',
    relatedTitle: '関連ツール',
  },
  ko: {
    title: 'JSONPath 테스터', description: '실시간 결과로 JSONPath 표현식을 테스트합니다.',
    jsonInput: 'JSON 데이터', pathInput: 'JSONPath 표현식', result: '결과', matches: '개 일치', noMatch: '일치 없음', invalidJson: '잘못된 JSON', invalidPath: '잘못된 JSONPath 표현식',
    examples: '예제', sampleData: '샘플 데이터 로드', clear: '지우기', reference: 'JSONPath 참조',
    introTitle: '무료 JSONPath 테스터', introText: '실시간으로 JSONPath 표현식을 테스트하고 디버그합니다.',
    tipTitle: '팁', tip1: '$는 루트 객체', tip2: '점 표기법 또는 브래킷 표기법', tip3: '[*]는 모든 요소 선택', tip4: '[0]은 첫 번째 요소', tip5: '[?(@.price < 10)]로 조건 필터',
    faqTitle: 'FAQ', faq1q: 'JSONPath란?', faq1a: 'JSONPath는 JSON 데이터를 위한 쿼리 언어입니다.',
    faq2q: '$의 의미는?', faq2a: '$는 JSON 문서의 루트 요소를 나타냅니다.',
    faq3q: '필터링하려면?', faq3a: '[?()] 구문을 사용합니다.',
    faq4q: '.과 ..의 차이?', faq4a: '.은 직접 자식에 접근, ..은 모든 하위 요소를 검색.',
    faq5q: '무료인가요?', faq5a: '네, 완전히 무료입니다.',
    relatedTitle: '관련 도구',
  },
  id: {
    title: 'Penguji JSONPath', description: 'Uji ekspresi JSONPath terhadap data JSON.',
    jsonInput: 'Data JSON', pathInput: 'Ekspresi JSONPath', result: 'Hasil', matches: 'kecocokan', noMatch: 'Tidak ada kecocokan', invalidJson: 'JSON tidak valid', invalidPath: 'Ekspresi JSONPath tidak valid',
    examples: 'Contoh', sampleData: 'Muat contoh data', clear: 'Hapus', reference: 'Referensi JSONPath',
    introTitle: 'Penguji JSONPath gratis', introText: 'Uji dan debug ekspresi JSONPath dengan hasil instan.',
    tipTitle: 'Tips', tip1: '$ mewakili objek root', tip2: 'Notasi titik atau kurung', tip3: '[*] memilih semua elemen', tip4: '[0] memilih yang pertama', tip5: '[?(@.harga < 10)] memfilter berdasarkan kondisi',
    faqTitle: 'FAQ', faq1q: 'Apa itu JSONPath?', faq1a: 'JSONPath adalah bahasa query untuk data JSON.',
    faq2q: 'Apa arti $?', faq2a: '$ mewakili elemen root dokumen JSON.',
    faq3q: 'Bagaimana memfilter?', faq3a: 'Gunakan sintaks [?()].',
    faq4q: 'Perbedaan . dan ..?', faq4a: '. mengakses anak langsung, .. mencari semua keturunan.',
    faq5q: 'Apakah gratis?', faq5a: 'Ya, sepenuhnya gratis.',
    relatedTitle: 'Alat terkait',
  },
  th: {
    title: 'JSONPath Tester', description: 'ทดสอบนิพจน์ JSONPath กับข้อมูล JSON',
    jsonInput: 'ข้อมูล JSON', pathInput: 'นิพจน์ JSONPath', result: 'ผลลัพธ์', matches: 'รายการที่ตรงกัน', noMatch: 'ไม่พบรายการที่ตรงกัน', invalidJson: 'JSON ไม่ถูกต้อง', invalidPath: 'นิพจน์ JSONPath ไม่ถูกต้อง',
    examples: 'ตัวอย่าง', sampleData: 'โหลดข้อมูลตัวอย่าง', clear: 'ล้าง', reference: 'อ้างอิง JSONPath',
    introTitle: 'เครื่องมือทดสอบ JSONPath ฟรี', introText: 'ทดสอบและดีบักนิพจน์ JSONPath พร้อมผลลัพธ์ทันที',
    tipTitle: 'เคล็ดลับ', tip1: '$ แทนอ็อบเจกต์ราก', tip2: 'ใช้จุดหรือวงเล็บ', tip3: '[*] เลือกทุกองค์ประกอบ', tip4: '[0] เลือกตัวแรก', tip5: '[?(@.price < 10)] กรองตามเงื่อนไข',
    faqTitle: 'คำถามที่พบบ่อย', faq1q: 'JSONPath คืออะไร?', faq1a: 'JSONPath เป็นภาษาสอบถามสำหรับข้อมูล JSON',
    faq2q: '$ หมายถึงอะไร?', faq2a: '$ แทนองค์ประกอบรากของเอกสาร JSON',
    faq3q: 'กรองอย่างไร?', faq3a: 'ใช้ไวยากรณ์ [?()]',
    faq4q: 'ต่างกันยังไงระหว่าง . กับ ..?', faq4a: '. เข้าถึงลูกโดยตรง .. ค้นหาลูกหลานทั้งหมด',
    faq5q: 'ฟรีไหม?', faq5a: 'ใช่ ฟรีทั้งหมด',
    relatedTitle: 'เครื่องมือที่เกี่ยวข้อง',
  },
};

const SAMPLE_JSON = `{
  "store": {
    "book": [
      { "category": "reference", "author": "Nigel Rees", "title": "Sayings of the Century", "price": 8.95 },
      { "category": "fiction", "author": "Evelyn Waugh", "title": "Sword of Honour", "price": 12.99 },
      { "category": "fiction", "author": "Herman Melville", "title": "Moby Dick", "price": 8.99 },
      { "category": "fiction", "author": "J. R. R. Tolkien", "title": "The Lord of the Rings", "price": 22.99 }
    ],
    "bicycle": { "color": "red", "price": 19.95 }
  }
}`;

const EXAMPLES = [
  { path: '$.store.book[*].author', desc: 'All authors' },
  { path: '$.store.book[0]', desc: 'First book' },
  { path: '$.store.book[-1]', desc: 'Last book' },
  { path: '$.store.book[0,1]', desc: 'First two books' },
  { path: '$..price', desc: 'All prices (recursive)' },
  { path: '$..author', desc: 'All authors (recursive)' },
  { path: '$.store.book[*].title', desc: 'All titles' },
  { path: '$.store.bicycle.color', desc: 'Bicycle color' },
];

const REFERENCE = [
  { op: '$', desc: 'Root object/element' },
  { op: '.', desc: 'Child operator' },
  { op: '..', desc: 'Recursive descent' },
  { op: '*', desc: 'Wildcard (all children)' },
  { op: '[n]', desc: 'Array index' },
  { op: '[start:end]', desc: 'Array slice' },
  { op: '[?()]', desc: 'Filter expression' },
  { op: '@', desc: 'Current element in filter' },
];

function evaluateJsonPath(data: unknown, path: string): unknown[] {
  try {
    if (!path.startsWith('$')) return [];
    const tokens = tokenizePath(path.slice(1));
    let current: unknown[] = [data];
    for (const token of tokens) {
      const next: unknown[] = [];
      for (const item of current) {
        if (token.type === 'child' && item && typeof item === 'object') {
          const val = (item as Record<string, unknown>)[token.key];
          if (val !== undefined) next.push(val);
        } else if (token.type === 'index' && Array.isArray(item)) {
          const idx = token.index < 0 ? item.length + token.index : token.index;
          if (idx >= 0 && idx < item.length) next.push(item[idx]);
        } else if (token.type === 'indices' && Array.isArray(item)) {
          for (const idx of token.indices) {
            const i = idx < 0 ? item.length + idx : idx;
            if (i >= 0 && i < item.length) next.push(item[i]);
          }
        } else if (token.type === 'wildcard' && Array.isArray(item)) {
          next.push(...item);
        } else if (token.type === 'wildcard' && item && typeof item === 'object') {
          next.push(...Object.values(item as Record<string, unknown>));
        } else if (token.type === 'recursive') {
          const collect = (obj: unknown) => {
            if (obj && typeof obj === 'object') {
              const entries = Array.isArray(obj) ? obj : Object.values(obj as Record<string, unknown>);
              for (const v of entries) {
                if (typeof v === 'object' && v !== null) {
                  if (token.key && !Array.isArray(v) && (v as Record<string, unknown>)[token.key] !== undefined) {
                    next.push((v as Record<string, unknown>)[token.key]);
                  }
                  collect(v);
                } else if (!token.key) {
                  next.push(v);
                }
              }
              if (token.key && !Array.isArray(obj) && (obj as Record<string, unknown>)[token.key] !== undefined) {
                next.push((obj as Record<string, unknown>)[token.key]);
              }
            }
          };
          collect(item);
        }
      }
      current = next;
    }
    return current;
  } catch {
    return [];
  }
}

interface Token {
  type: 'child' | 'index' | 'indices' | 'wildcard' | 'recursive';
  key: string;
  index: number;
  indices: number[];
}

function tokenizePath(path: string): Token[] {
  const tokens: Token[] = [];
  let i = 0;
  while (i < path.length) {
    if (path[i] === '.') {
      if (path[i + 1] === '.') {
        i += 2;
        let key = '';
        while (i < path.length && path[i] !== '.' && path[i] !== '[') { key += path[i]; i++; }
        tokens.push({ type: 'recursive', key, index: 0, indices: [] });
      } else {
        i++;
        let key = '';
        while (i < path.length && path[i] !== '.' && path[i] !== '[') { key += path[i]; i++; }
        if (key === '*') tokens.push({ type: 'wildcard', key: '', index: 0, indices: [] });
        else if (key) tokens.push({ type: 'child', key, index: 0, indices: [] });
      }
    } else if (path[i] === '[') {
      i++;
      let content = '';
      while (i < path.length && path[i] !== ']') { content += path[i]; i++; }
      i++; // skip ]
      if (content === '*') {
        tokens.push({ type: 'wildcard', key: '', index: 0, indices: [] });
      } else if (content.includes(',')) {
        const indices = content.split(',').map(s => parseInt(s.trim()));
        tokens.push({ type: 'indices', key: '', index: 0, indices });
      } else if (content.startsWith("'") || content.startsWith('"')) {
        const key = content.replace(/['"]/g, '');
        tokens.push({ type: 'child', key, index: 0, indices: [] });
      } else {
        const idx = parseInt(content);
        if (!isNaN(idx)) tokens.push({ type: 'index', key: '', index: idx, indices: [] });
      }
    } else { i++; }
  }
  return tokens;
}

export default function JsonPathTester() {
  const { lang } = useLang();
  const t = ui[lang] || ui.en;
  const [jsonInput, setJsonInput] = useState(SAMPLE_JSON);
  const [pathInput, setPathInput] = useState('$.store.book[*].author');

  const { parsed, jsonError } = useMemo(() => {
    try { return { parsed: JSON.parse(jsonInput), jsonError: null }; }
    catch (e) { return { parsed: null, jsonError: (e as Error).message }; }
  }, [jsonInput]);

  const results = useMemo(() => {
    if (!parsed || !pathInput) return [];
    return evaluateJsonPath(parsed, pathInput);
  }, [parsed, pathInput]);

  const resultText = useMemo(() => {
    if (jsonError) return t.invalidJson;
    if (!pathInput) return '';
    try { return JSON.stringify(results, null, 2); } catch { return t.invalidPath; }
  }, [results, jsonError, pathInput, t]);

  const faqSchema = {
    '@context': 'https://schema.org', '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: t.faq1q, acceptedAnswer: { '@type': 'Answer', text: t.faq1a } },
      { '@type': 'Question', name: t.faq2q, acceptedAnswer: { '@type': 'Answer', text: t.faq2a } },
      { '@type': 'Question', name: t.faq3q, acceptedAnswer: { '@type': 'Answer', text: t.faq3a } },
      { '@type': 'Question', name: t.faq4q, acceptedAnswer: { '@type': 'Answer', text: t.faq4a } },
      { '@type': 'Question', name: t.faq5q, acceptedAnswer: { '@type': 'Answer', text: t.faq5a } },
    ],
  };

  return (
    <ToolLayout title={t.title} description={t.description} toolId="json-path-tester">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* JSONPath input */}
      <div style={{ marginBottom: 16 }}>
        <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 6 }}>{t.pathInput}</label>
        <div style={{ display: 'flex', gap: 8 }}>
          <input type="text" value={pathInput} onChange={e => setPathInput(e.target.value)}
            placeholder="$.store.book[*].author"
            style={{ flex: 1, padding: '10px 14px', fontSize: 14, borderRadius: 8, border: '1px solid var(--border-color)', background: 'var(--bg-input)', color: 'var(--text-primary)', fontFamily: 'monospace' }} />
          <CopyButton text={pathInput} />
        </div>
      </div>

      {/* JSON Input */}
      <div style={{ marginBottom: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
          <label style={{ fontSize: 13, fontWeight: 600 }}>{t.jsonInput}</label>
          <div style={{ display: 'flex', gap: 8 }}>
            <button onClick={() => setJsonInput(SAMPLE_JSON)} className="btn btn-secondary" style={{ fontSize: 11, padding: '4px 10px' }}>{t.sampleData}</button>
            <button onClick={() => { setJsonInput(''); setPathInput('$'); }} className="btn btn-secondary" style={{ fontSize: 11, padding: '4px 10px' }}>{t.clear}</button>
          </div>
        </div>
        <textarea value={jsonInput} onChange={e => setJsonInput(e.target.value)} rows={12}
          style={{ width: '100%', padding: '12px 14px', fontSize: 12, borderRadius: 8, border: `1px solid ${jsonError ? '#ef4444' : 'var(--border-color)'}`, background: 'var(--bg-input)', color: 'var(--text-primary)', fontFamily: 'monospace', resize: 'vertical', lineHeight: 1.5 }} />
        {jsonError && <div style={{ fontSize: 11, color: '#ef4444', marginTop: 4 }}>{t.invalidJson}: {jsonError}</div>}
      </div>

      {/* Result */}
      <div style={{ marginBottom: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
          <label style={{ fontSize: 13, fontWeight: 600 }}>
            {t.result} {!jsonError && results.length > 0 && <span style={{ fontSize: 11, color: 'var(--accent-blue)', fontWeight: 400, marginLeft: 8 }}>{results.length} {t.matches}</span>}
          </label>
          <CopyButton text={resultText} />
        </div>
        <pre style={{
          background: '#0a0a0a', color: results.length > 0 ? '#22c55e' : '#ef4444',
          padding: 16, borderRadius: 8, fontSize: 12, fontFamily: 'monospace', overflow: 'auto', lineHeight: 1.5,
          border: '1px solid var(--border-color)', minHeight: 80, whiteSpace: 'pre-wrap', margin: 0,
        }}>
          {jsonError ? t.invalidJson : results.length === 0 ? t.noMatch : resultText}
        </pre>
      </div>

      {/* Example expressions */}
      <div style={{ marginBottom: 16 }}>
        <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 6 }}>{t.examples}</label>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 6 }}>
          {EXAMPLES.map(ex => (
            <button key={ex.path} onClick={() => setPathInput(ex.path)}
              style={{ padding: '8px 12px', borderRadius: 8, fontSize: 12, cursor: 'pointer', border: pathInput === ex.path ? '2px solid var(--accent-blue)' : '1px solid var(--border-color)', background: pathInput === ex.path ? 'rgba(59,130,246,0.1)' : 'var(--bg-input)', color: 'var(--text-primary)', textAlign: 'left', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8 }}>
              <code style={{ fontSize: 11, color: 'var(--accent-blue)' }}>{ex.path}</code>
              <span style={{ fontSize: 10, color: 'var(--text-secondary)', whiteSpace: 'nowrap' }}>{ex.desc}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Reference */}
      <div style={{ marginBottom: 16 }}>
        <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 6 }}>{t.reference}</label>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
            <tbody>
              {REFERENCE.map((r, i) => (
                <tr key={i} style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '8px 12px', fontFamily: 'monospace', fontWeight: 600, color: 'var(--accent-blue)', width: 120 }}>{r.op}</td>
                  <td style={{ padding: '8px 12px', color: 'var(--text-secondary)' }}>{r.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* SEO Content */}
      <div style={{ marginTop: 30, paddingTop: 24, borderTop: '1px solid var(--border-color)' }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 12 }}>{t.introTitle}</h2>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 20 }}>{t.introText}</p>
        <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{t.tipTitle}</h3>
        <ul style={{ paddingLeft: 20, marginBottom: 24, fontSize: 13, lineHeight: 2, color: 'var(--text-secondary)' }}>
          <li>{t.tip1}</li><li>{t.tip2}</li><li>{t.tip3}</li><li>{t.tip4}</li><li>{t.tip5}</li>
        </ul>
        <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{t.faqTitle}</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 24 }}>
          {[{ q: t.faq1q, a: t.faq1a }, { q: t.faq2q, a: t.faq2a }, { q: t.faq3q, a: t.faq3a }, { q: t.faq4q, a: t.faq4a }, { q: t.faq5q, a: t.faq5a }].map((faq, idx) => (
            <details key={idx} style={{ border: '1px solid var(--border-color)', borderRadius: 8, overflow: 'hidden', background: 'var(--bg-input)' }}>
              <summary style={{ padding: '14px 16px', cursor: 'pointer', fontSize: 14, fontWeight: 600, color: 'var(--text-primary)' }}>{faq.q}</summary>
              <div style={{ padding: '0 16px 14px', fontSize: 13, lineHeight: 1.7, color: 'var(--text-secondary)' }}>{faq.a}</div>
            </details>
          ))}
        </div>
        <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{t.relatedTitle}</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {[
            { href: `/${lang}/tools/json-formatter`, label: 'JSON Formatter' },
            { href: `/${lang}/tools/json-to-typescript`, label: 'JSON to TypeScript' },
            { href: `/${lang}/tools/json-diff-tool`, label: 'JSON Diff' },
            { href: `/${lang}/tools/json-schema`, label: 'JSON Schema Generator' },
          ].map(link => (
            <Link key={link.href} href={link.href} style={{ display: 'inline-block', padding: '8px 16px', borderRadius: 8, border: '1px solid var(--border-color)', fontSize: 13, color: 'var(--accent-blue)', textDecoration: 'none', background: 'var(--bg-input)' }}>
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </ToolLayout>
  );
}
