'use client';

import { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import { useLang } from '@/i18n/LangContext';

const ui: Record<string, Record<string, string>> = {
  en: {
    title: 'CSS Specificity Calculator', description: 'Calculate CSS selector specificity scores and understand the cascade. Compare multiple selectors to debug styling conflicts.',
    inputLabel: 'CSS Selector', addSelector: 'Add Selector', clearAll: 'Clear All',
    specificity: 'Specificity', inline: 'Inline', id: 'IDs', class: 'Classes/Attrs/Pseudo',
    element: 'Elements/Pseudo-elements', result: 'Score', compare: 'Comparison',
    higher: 'Higher specificity wins', examples: 'Examples', clickExample: 'Click to try:',
    introTitle: 'CSS Specificity Calculator & Guide',
    introText: 'CSS specificity determines which style rules apply when multiple rules target the same element. The specificity score is calculated based on the selector components: inline styles, IDs, classes/attributes/pseudo-classes, and elements/pseudo-elements. Understanding specificity is essential for writing maintainable CSS and avoiding !important overuse.',
    faqTitle: 'Frequently Asked Questions',
    faq1q: 'What is CSS specificity?', faq1a: 'CSS specificity is a weight given to each CSS selector to determine which styles take precedence when multiple rules apply to the same element. Specificity is calculated as a score of four numbers: (inline, ID, class/attr/pseudo-class, element/pseudo-element). A higher score wins. If specificity is equal, the later rule in the stylesheet wins.',
    faq2q: 'How is specificity calculated?', faq2a: 'Specificity is calculated as 4 values: (a, b, c, d). "a" is 1 if inline style, 0 otherwise. "b" counts ID selectors. "c" counts class selectors, attribute selectors, and pseudo-classes (like :hover). "d" counts type selectors (HTML elements) and pseudo-elements (like ::before). The universal selector (*) has zero specificity.',
    faq3q: 'What beats what in specificity?', faq3a: 'Inline styles (1,0,0,0) beat ID selectors (0,1,0,0) which beat class/attribute/pseudo-class selectors (0,0,1,0) which beat element selectors (0,0,0,1). !important overrides all specificity. When specificity is equal, the declaration that appears last in the CSS wins.',
    faq4q: 'When should I use !important?', faq4a: 'Use !important sparingly. It makes CSS hard to maintain because it overrides all other specificity. Good use cases include overriding third-party library styles, utility classes that must always apply, and accessibility-related styles. Instead of !important, try using more specific selectors or restructuring your CSS.',
    faq5q: 'Does the universal selector affect specificity?', faq5a: 'No, the universal selector (*), combinators (+, >, ~, ||, and space), and the :is() pseudo-class have zero specificity. The :not(), :has(), and :is() pseudo-classes themselves have zero specificity, but their arguments do contribute to specificity.',
  },
  fr: {
    title: 'Calculateur de Specificite CSS', description: 'Calculez les scores de specificite des selecteurs CSS.',
    inputLabel: 'Selecteur CSS', addSelector: 'Ajouter Selecteur', clearAll: 'Tout Effacer',
    specificity: 'Specificite', inline: 'Inline', id: 'IDs', class: 'Classes/Attrs/Pseudo',
    element: 'Elements/Pseudo-elements', result: 'Score', compare: 'Comparaison',
    higher: 'Specificite plus haute gagne', examples: 'Exemples', clickExample: 'Cliquer pour essayer:',
    introTitle: 'Calculateur de Specificite CSS', introText: 'La specificite CSS determine quelles regles de style s\'appliquent quand plusieurs regles ciblent le meme element.',
    faqTitle: 'Questions Frequemment Posees',
    faq1q: 'Qu\'est-ce que la specificite CSS?', faq1a: 'La specificite CSS est un poids donne a chaque selecteur pour determiner quels styles ont la priorite.',
    faq2q: 'Comment est calculee la specificite?', faq2a: 'La specificite est calculee comme 4 valeurs: inline, ID, classe/attr/pseudo-classe, element.',
    faq3q: 'Qu\'est-ce qui bat quoi?', faq3a: 'Inline > ID > class/attr/pseudo > element. !important remplace tout.',
    faq4q: 'Quand utiliser !important?', faq4a: 'Utilisez !important avec parcimonie. Il rend le CSS difficile a maintenir.',
    faq5q: 'Le selecteur universel affecte-t-il la specificite?', faq5a: 'Non, * a une specificite nulle.',
  },
  de: {
    title: 'CSS Spezifitaet Rechner', description: 'Berechnen Sie CSS-Selektor-Spezifitaets-Scores.',
    inputLabel: 'CSS Selektor', addSelector: 'Selektor hinzufuegen', clearAll: 'Alle loeschen',
    specificity: 'Spezifitaet', inline: 'Inline', id: 'IDs', class: 'Klassen/Attrs/Pseudo',
    element: 'Elemente/Pseudo-Elemente', result: 'Score', compare: 'Vergleich',
    higher: 'Hoehere Spezifitaet gewinnt', examples: 'Beispiele', clickExample: 'Klicken zum Ausprobieren:',
    introTitle: 'CSS Spezifitaet Rechner', introText: 'CSS-Spezifitaet bestimmt, welche Stilregeln angewendet werden.',
    faqTitle: 'Haeufig Gestellte Fragen',
    faq1q: 'Was ist CSS-Spezifitaet?', faq1a: 'CSS-Spezifitaet ist ein Gewicht, das jedem Selektor gegeben wird, um zu bestimmen, welche Stile Vorrang haben.',
    faq2q: 'Wie wird Spezifitaet berechnet?', faq2a: 'Spezifitaet wird als 4 Werte berechnet: Inline, ID, Klasse/Attr/Pseudo, Element.',
    faq3q: 'Was schlaegt was?', faq3a: 'Inline > ID > Klasse/Attr/Pseudo > Element. !important ueberschreibt alles.',
    faq4q: 'Wann !important verwenden?', faq4a: 'Sparsam verwenden. Es macht CSS schwer wartbar.',
    faq5q: 'Beeinflusst der universelle Selektor die Spezifitaet?', faq5a: 'Nein, * hat eine Spezifitaet von null.',
  },
  it: { title: 'Calcolatore Specificita CSS', description: 'Calcola i punteggi di specificita dei selettori CSS.', inputLabel: 'Selettore CSS', addSelector: 'Aggiungi Selettore', clearAll: 'Cancella Tutto', specificity: 'Specificita', inline: 'Inline', id: 'ID', class: 'Classi/Attr/Pseudo', element: 'Elementi/Pseudo', result: 'Punteggio', compare: 'Confronto', higher: 'Specificita piu alta vince', examples: 'Esempi', clickExample: 'Clicca per provare:', introTitle: 'Calcolatore Specificita CSS', introText: 'La specificita CSS determina quali regole si applicano quando piu regole mirano allo stesso elemento.', faqTitle: 'Domande Frequenti', faq1q: 'Cosa e la specificita CSS?', faq1a: 'La specificita CSS e un peso dato a ogni selettore per determinare quali stili hanno la precedenza.', faq2q: 'Come si calcola?', faq2a: 'Come 4 valori: inline, ID, classe/attr/pseudo, elemento.', faq3q: 'Cosa batte cosa?', faq3a: 'Inline > ID > classe/attr/pseudo > elemento.', faq4q: 'Quando usare !important?', faq4a: 'Usarlo con parsimonia.', faq5q: 'Il selettore universale influisce?', faq5a: 'No, * ha specificita zero.' },
  es: { title: 'Calculadora de Especificidad CSS', description: 'Calcula los puntajes de especificidad de los selectores CSS.', inputLabel: 'Selector CSS', addSelector: 'Agregar Selector', clearAll: 'Limpiar Todo', specificity: 'Especificidad', inline: 'Inline', id: 'IDs', class: 'Clases/Attrs/Pseudo', element: 'Elementos/Pseudo', result: 'Puntaje', compare: 'Comparacion', higher: 'Mayor especificidad gana', examples: 'Ejemplos', clickExample: 'Clic para probar:', introTitle: 'Calculadora de Especificidad CSS', introText: 'La especificidad CSS determina que reglas se aplican cuando varias reglas apuntan al mismo elemento.', faqTitle: 'Preguntas Frecuentes', faq1q: 'Que es la especificidad CSS?', faq1a: 'La especificidad CSS es un peso dado a cada selector para determinar que estilos tienen prioridad.', faq2q: 'Como se calcula?', faq2a: 'Como 4 valores: inline, ID, clase/attr/pseudo, elemento.', faq3q: 'Que gana?', faq3a: 'Inline > ID > clase/attr/pseudo > elemento.', faq4q: 'Cuando usar !important?', faq4a: 'Usarlo con moderacion.', faq5q: 'El selector universal afecta?', faq5a: 'No, * tiene especificidad cero.' },
  pt: { title: 'Calculadora de Especificidade CSS', description: 'Calcule as pontuacoes de especificidade dos seletores CSS.', inputLabel: 'Seletor CSS', addSelector: 'Adicionar Seletor', clearAll: 'Limpar Tudo', specificity: 'Especificidade', inline: 'Inline', id: 'IDs', class: 'Classes/Attrs/Pseudo', element: 'Elementos/Pseudo', result: 'Pontuacao', compare: 'Comparacao', higher: 'Maior especificidade ganha', examples: 'Exemplos', clickExample: 'Clique para testar:', introTitle: 'Calculadora de Especificidade CSS', introText: 'A especificidade CSS determina quais regras se aplicam quando varias regras visam o mesmo elemento.', faqTitle: 'Perguntas Frequentes', faq1q: 'O que e especificidade CSS?', faq1a: 'A especificidade CSS e um peso dado a cada seletor para determinar quais estilos tem prioridade.', faq2q: 'Como e calculada?', faq2a: 'Como 4 valores: inline, ID, classe/attr/pseudo, elemento.', faq3q: 'O que vence?', faq3a: 'Inline > ID > classe/attr/pseudo > elemento.', faq4q: 'Quando usar !important?', faq4a: 'Use com moderacao.', faq5q: 'O seletor universal afeta?', faq5a: 'Nao, * tem especificidade zero.' },
  nl: { title: 'CSS Specificiteit Calculator', description: 'Bereken CSS selector specificiteit scores.', inputLabel: 'CSS Selector', addSelector: 'Selector Toevoegen', clearAll: 'Alles Wissen', specificity: 'Specificiteit', inline: 'Inline', id: 'IDs', class: 'Klassen/Attrs/Pseudo', element: 'Elementen/Pseudo', result: 'Score', compare: 'Vergelijking', higher: 'Hogere specificiteit wint', examples: 'Voorbeelden', clickExample: 'Klik om te proberen:', introTitle: 'CSS Specificiteit Calculator', introText: 'CSS specificiteit bepaalt welke stijlregels worden toegepast.', faqTitle: 'Veelgestelde Vragen', faq1q: 'Wat is CSS specificiteit?', faq1a: 'CSS specificiteit is een gewicht gegeven aan elke selector.', faq2q: 'Hoe berekend?', faq2a: 'Als 4 waarden: inline, ID, klasse/attr/pseudo, element.', faq3q: 'Wat wint?', faq3a: 'Inline > ID > klasse/attr/pseudo > element.', faq4q: 'Wanneer !important?', faq4a: 'Spaarzaam gebruiken.', faq5q: 'Universele selector?', faq5a: 'Nee, * heeft nul specificiteit.' },
  pl: { title: 'Kalkulator Specyficznosci CSS', description: 'Oblicz wyniki specyficznosci selektorow CSS.', inputLabel: 'Selektor CSS', addSelector: 'Dodaj Selektor', clearAll: 'Wyczysc Wszystko', specificity: 'Specyficznosc', inline: 'Inline', id: 'IDs', class: 'Klasy/Atryb/Pseudo', element: 'Elementy/Pseudo', result: 'Wynik', compare: 'Porownanie', higher: 'Wyzsza specyficznosc wygrywa', examples: 'Przyklady', clickExample: 'Kliknij, aby wyprobowac:', introTitle: 'Kalkulator Specyficznosci CSS', introText: 'Specyficznosc CSS okresla, ktore reguly stylowania sa stosowane.', faqTitle: 'FAQ', faq1q: 'Co to specyficznosc CSS?', faq1a: 'Waga nadana kazdemu selektorowi.', faq2q: 'Jak obliczona?', faq2a: 'Jako 4 wartosci.', faq3q: 'Co wygrywa?', faq3a: 'Inline > ID > klasa > element.', faq4q: 'Kiedy !important?', faq4a: 'Uzyc oszczednie.', faq5q: 'Selektor uniwersalny?', faq5a: 'Nie, * ma zero.' },
  sv: { title: 'CSS Specificitetskalkylator', description: 'Berakna CSS-selektor specificitetspoang.', inputLabel: 'CSS Selektor', addSelector: 'Lagg till Selektor', clearAll: 'Rensa Allt', specificity: 'Specificitet', inline: 'Inline', id: 'IDs', class: 'Klasser/Attr/Pseudo', element: 'Element/Pseudo', result: 'Poaeng', compare: 'Jamforelse', higher: 'Hoegre specificitet vinner', examples: 'Exempel', clickExample: 'Klicka for att prova:', introTitle: 'CSS Specificitetskalkylator', introText: 'CSS-specificitet bestammer vilka stilregler som tillampas.', faqTitle: 'Vanliga Fragor', faq1q: 'Vad ar CSS specificitet?', faq1a: 'En vikt given till varje selektor.', faq2q: 'Hur beraknad?', faq2a: 'Som 4 varden.', faq3q: 'Vad vinner?', faq3a: 'Inline > ID > klass > element.', faq4q: 'Nar !important?', faq4a: 'Anvand sparsamt.', faq5q: 'Universell selektor?', faq5a: 'Nej, * har noll.' },
  no: { title: 'CSS Spesifisitetskalkulator', description: 'Beregn CSS selector spesifisitetspoeng.', inputLabel: 'CSS Selektor', addSelector: 'Legg til Selektor', clearAll: 'Slett Alt', specificity: 'Spesifisitet', inline: 'Inline', id: 'IDs', class: 'Klasser/Attr/Pseudo', element: 'Elementer/Pseudo', result: 'Poeng', compare: 'Sammenligning', higher: 'Hoeyere spesifisitet vinner', examples: 'Eksempler', clickExample: 'Klikk for a prøve:', introTitle: 'CSS Spesifisitetskalkulator', introText: 'CSS-spesifisitet bestemmer hvilke stilregler som gjelder.', faqTitle: 'Vanlige Sporsmal', faq1q: 'Hva er CSS spesifisitet?', faq1a: 'En vekt gitt til hver selektor.', faq2q: 'Hvordan beregnet?', faq2a: 'Som 4 verdier.', faq3q: 'Hva vinner?', faq3a: 'Inline > ID > klasse > element.', faq4q: 'Nar !important?', faq4a: 'Bruk sparsomt.', faq5q: 'Universell selektor?', faq5a: 'Nei, * har null.' },
  zh: {
    title: 'CSS 优先级计算器', description: '计算 CSS 选择器的优先级分数，理解层叠规则，调试样式冲突。',
    inputLabel: 'CSS 选择器', addSelector: '添加选择器', clearAll: '全部清除',
    specificity: '优先级', inline: '内联', id: 'ID', class: '类/属性/伪类',
    element: '元素/伪元素', result: '分数', compare: '比较',
    higher: '优先级高的优先', examples: '示例', clickExample: '点击试用：',
    introTitle: 'CSS 优先级计算器与指南',
    introText: 'CSS 优先级决定当多个规则针对同一元素时应用哪些样式。优先级由四个数字组成：内联样式、ID 数量、类/属性/伪类数量、元素/伪元素数量。理解优先级对于编写可维护的 CSS 至关重要。',
    faqTitle: '常见问题',
    faq1q: '什么是 CSS 优先级？', faq1a: 'CSS 优先级是给每个选择器的权重，决定当多个规则应用于同一元素时哪些样式优先。分数越高越优先。',
    faq2q: '优先级如何计算？', faq2a: '优先级计算为 4 个值：内联样式、ID 数量、类/属性/伪类数量、元素/伪元素数量。',
    faq3q: '谁优先？', faq3a: '内联 > ID > 类/属性/伪类 > 元素。!important 覆盖所有优先级。',
    faq4q: '何时使用 !important？', faq4a: '谨慎使用 !important，它使 CSS 难以维护。',
    faq5q: '通配符选择器影响优先级吗？', faq5a: '不影响，* 的优先级为零。',
  },
  ja: {
    title: 'CSS 詳細度計算ツール', description: 'CSS セレクターの詳細度スコアを計算します。',
    inputLabel: 'CSS セレクター', addSelector: 'セレクターを追加', clearAll: 'すべてクリア',
    specificity: '詳細度', inline: 'インライン', id: 'ID', class: 'クラス/属性/疑似',
    element: '要素/疑似要素', result: 'スコア', compare: '比較',
    higher: '詳細度が高い方が優先', examples: '例', clickExample: 'クリックして試す:',
    introTitle: 'CSS 詳細度計算ツール', introText: 'CSS 詳細度は、複数のルールが同じ要素に適用される場合にどのスタイルが優先されるかを決定します。',
    faqTitle: 'よくある質問',
    faq1q: 'CSS 詳細度とは何ですか？', faq1a: 'CSS 詳細度は各セレクターに与えられる重みです。スコアが高いほど優先されます。',
    faq2q: '詳細度の計算方法は？', faq2a: '4つの値として計算：インライン、ID数、クラス/属性/疑似クラス数、要素数。',
    faq3q: '何が優先されますか？', faq3a: 'インライン > ID > クラス/属性/疑似 > 要素。!important はすべてを上書きします。',
    faq4q: '!important はいつ使うべきですか？', faq4a: '!important は CSS のメンテナンスを困難にするため、慎重に使用してください。',
    faq5q: 'ユニバーサルセレクターは詳細度に影響しますか？', faq5a: 'いいえ、* の詳細度はゼロです。',
  },
  ko: {
    title: 'CSS 명시도 계산기', description: 'CSS 선택자의 명시도 점수를 계산하세요.',
    inputLabel: 'CSS 선택자', addSelector: '선택자 추가', clearAll: '모두 지우기',
    specificity: '명시도', inline: '인라인', id: 'ID', class: '클래스/속성/가상',
    element: '요소/가상 요소', result: '점수', compare: '비교',
    higher: '명시도가 높을수록 우선', examples: '예시', clickExample: '클릭하여 시도:',
    introTitle: 'CSS 명시도 계산기', introText: 'CSS 명시도는 여러 규칙이 동일한 요소를 대상으로 할 때 어떤 스타일이 적용될지 결정합니다.',
    faqTitle: '자주 묻는 질문',
    faq1q: 'CSS 명시도란 무엇인가요?', faq1a: 'CSS 명시도는 각 선택자에 부여된 가중치로, 여러 규칙이 충돌할 때 어떤 스타일이 우선하는지 결정합니다.',
    faq2q: '명시도는 어떻게 계산되나요?', faq2a: '4개의 값으로 계산됩니다: 인라인, ID 수, 클래스/속성/가상 클래스 수, 요소 수.',
    faq3q: '무엇이 이기나요?', faq3a: '인라인 > ID > 클래스/속성/가상 > 요소. !important는 모든 것을 재정의합니다.',
    faq4q: '!important는 언제 사용해야 하나요?', faq4a: 'CSS 유지 관리를 어렵게 만들므로 신중하게 사용하세요.',
    faq5q: '유니버설 선택자는 명시도에 영향을 주나요?', faq5a: '아니요, *의 명시도는 0입니다.',
  },
  id: { title: 'Kalkulator Spesifisitas CSS', description: 'Hitung skor spesifisitas selektor CSS.', inputLabel: 'Selektor CSS', addSelector: 'Tambah Selektor', clearAll: 'Hapus Semua', specificity: 'Spesifisitas', inline: 'Inline', id: 'ID', class: 'Kelas/Attr/Pseudo', element: 'Elemen/Pseudo', result: 'Skor', compare: 'Perbandingan', higher: 'Spesifisitas lebih tinggi menang', examples: 'Contoh', clickExample: 'Klik untuk mencoba:', introTitle: 'Kalkulator Spesifisitas CSS', introText: 'Spesifisitas CSS menentukan aturan mana yang diterapkan.', faqTitle: 'FAQ', faq1q: 'Apa itu spesifisitas CSS?', faq1a: 'Bobot yang diberikan pada setiap selektor.', faq2q: 'Cara menghitung?', faq2a: 'Sebagai 4 nilai.', faq3q: 'Apa yang menang?', faq3a: 'Inline > ID > kelas > elemen.', faq4q: 'Kapan !important?', faq4a: 'Gunakan hemat.', faq5q: 'Selektor universal?', faq5a: 'Tidak, * bernilai nol.' },
  th: { title: 'เครื่องคำนวณความเฉพาะเจาะจง CSS', description: 'คำนวณคะแนนความเฉพาะเจาะจงของ CSS selector', inputLabel: 'CSS Selector', addSelector: 'เพิ่ม Selector', clearAll: 'ล้างทั้งหมด', specificity: 'ความเฉพาะเจาะจง', inline: 'Inline', id: 'ID', class: 'Class/Attr/Pseudo', element: 'Element/Pseudo', result: 'คะแนน', compare: 'เปรียบเทียบ', higher: 'คะแนนสูงกว่าชนะ', examples: 'ตัวอย่าง', clickExample: 'คลิกเพื่อลอง:', introTitle: 'เครื่องคำนวณความเฉพาะเจาะจง CSS', introText: 'ความเฉพาะเจาะจง CSS กำหนดกฎใดที่ใช้เมื่อหลายกฎกำหนดเป้าหมายที่องค์ประกอบเดียวกัน', faqTitle: 'คำถามที่พบบ่อย', faq1q: 'ความเฉพาะเจาะจง CSS คืออะไร?', faq1a: 'น้ำหนักที่กำหนดให้กับแต่ละ selector', faq2q: 'คำนวณอย่างไร?', faq2a: 'เป็น 4 ค่า', faq3q: 'อะไรชนะ?', faq3a: 'Inline > ID > class > element', faq4q: 'เมื่อไหร่ใช้ !important?', faq4a: 'ใช้อย่างประหยัด', faq5q: 'Universal selector?', faq5a: 'ไม่ * มีค่าเป็นศูนย์' },
};

interface SpecificityResult {
  selector: string;
  inline: number;
  ids: number;
  classes: number;
  elements: number;
  total: string;
}

function calculateSpecificity(selector: string): Omit<SpecificityResult, 'selector' | 'total'> {
  let s = selector.trim();
  // Remove pseudo-element content and attribute values
  s = s.replace(/::[\w-]+/g, ' PSEUDOELEMENT');
  s = s.replace(/:[\w-]+(\([^)]*\))?/g, ' PSEUDOCLASS');
  s = s.replace(/\[[^\]]*\]/g, ' ATTRIBUTE');

  const ids = (s.match(/#[\w-]+/g) || []).length;
  const classes = (s.match(/\.[\w-]+/g) || []).length +
    (s.match(/ATTRIBUTE/g) || []).length +
    (s.match(/PSEUDOCLASS/g) || []).length;
  const elements = (s.match(/(?<![#.[\w-])(?:^|[\s>+~])([a-zA-Z][\w-]*)(?![#.\[(])/g) || [])
    .filter(m => !['and', 'or', 'not', 'is', 'has', 'where', 'PSEUDOELEMENT', 'PSEUDOCLASS', 'ATTRIBUTE'].includes(m.trim())).length +
    (s.match(/PSEUDOELEMENT/g) || []).length;

  return { inline: 0, ids, classes, elements };
}

const EXAMPLES = [
  { sel: '*', label: 'Universal' },
  { sel: 'p', label: 'Element' },
  { sel: '.class', label: 'Class' },
  { sel: '#id', label: 'ID' },
  { sel: 'p.class', label: 'Element + Class' },
  { sel: '#id .class', label: 'ID + Class' },
  { sel: 'div > p + .class[type="text"]', label: 'Complex' },
  { sel: 'nav ul li a.active', label: 'Chain' },
];

export default function CssSpecificityCalculator() {
  const { lang } = useLang();
  const t = ui[lang] || ui.en;
  const [selectors, setSelectors] = useState<string[]>(['h1 .title', '#main .nav > a:hover']);
  const [input, setInput] = useState('');

  const results: SpecificityResult[] = selectors.map(sel => {
    const spec = calculateSpecificity(sel);
    return { selector: sel, ...spec, total: `(0,${spec.ids},${spec.classes},${spec.elements})` };
  });

  const addSelector = () => {
    if (input.trim()) {
      setSelectors(s => [...s, input.trim()]);
      setInput('');
    }
  };

  const scoreToNum = (r: SpecificityResult) => r.ids * 1000 + r.classes * 100 + r.elements * 10;
  const maxScore = Math.max(...results.map(scoreToNum), 1);

  const tagColors: Record<number, string> = { 0: '#94a3b8', 1: '#22c55e', 2: '#3b82f6', 3: '#f59e0b' };

  return (
    <ToolLayout title={t.title} description={t.description} toolId="css-specificity-calculator">
      {/* Input */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        <input
          value={input} onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && addSelector()}
          placeholder=".nav > a:hover"
          style={{ flex: 1, padding: '8px 12px', fontSize: 13, fontFamily: 'monospace' }}
        />
        <button onClick={addSelector} className="btn btn-primary">{t.addSelector}</button>
        <button onClick={() => setSelectors([])} className="btn btn-secondary">{t.clearAll}</button>
      </div>

      {/* Examples */}
      <div style={{ marginBottom: 20 }}>
        <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 8 }}>{t.clickExample}</div>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {EXAMPLES.map(ex => (
            <button key={ex.sel} onClick={() => setSelectors(s => [...s, ex.sel])} style={{
              padding: '4px 10px', borderRadius: 4, border: '1px solid var(--border-color)',
              background: 'var(--bg-input)', fontSize: 11, fontFamily: 'monospace', cursor: 'pointer', color: 'var(--text-primary)',
            }}>
              {ex.sel}
            </button>
          ))}
        </div>
      </div>

      {/* Results */}
      {results.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {results.map((r, i) => {
            const score = scoreToNum(r);
            const pct = (score / maxScore) * 100;
            return (
              <div key={i} style={{ background: 'var(--bg-input)', borderRadius: 10, padding: 16, border: '1px solid var(--border-color)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                  <code style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)' }}>{r.selector}</code>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontSize: 14, fontWeight: 700, fontFamily: 'monospace', color: 'var(--accent-blue)' }}>{r.total}</span>
                    <button onClick={() => setSelectors(s => s.filter((_, idx) => idx !== i))} style={{ padding: '2px 8px', fontSize: 11, border: '1px solid var(--border-color)', borderRadius: 4, background: 'transparent', cursor: 'pointer', color: 'var(--text-secondary)' }}>✕</button>
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10, marginBottom: 12 }}>
                  {[
                    { label: t.inline, val: r.inline, color: tagColors[0] },
                    { label: t.id, val: r.ids, color: tagColors[3] },
                    { label: t.class, val: r.classes, color: tagColors[2] },
                    { label: t.element, val: r.elements, color: tagColors[1] },
                  ].map(({ label, val, color }) => (
                    <div key={label} style={{ textAlign: 'center', padding: '10px 6px', borderRadius: 8, border: `1px solid ${color}30`, background: `${color}10` }}>
                      <div style={{ fontSize: 22, fontWeight: 800, color }}>{val}</div>
                      <div style={{ fontSize: 10, color: 'var(--text-secondary)', marginTop: 4, lineHeight: 1.3 }}>{label}</div>
                    </div>
                  ))}
                </div>
                <div style={{ height: 6, background: 'var(--border-color)', borderRadius: 3, overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${pct}%`, background: 'var(--accent-blue)', borderRadius: 3, transition: 'width 0.3s' }} />
                </div>
              </div>
            );
          })}
        </div>
      )}

      {results.length === 0 && (
        <div style={{ textAlign: 'center', padding: 40, color: 'var(--text-secondary)', fontSize: 14 }}>
          Enter a CSS selector above to calculate its specificity score.
        </div>
      )}

      {/* Intro */}
      <div style={{ marginTop: 28, paddingTop: 20, borderTop: '1px solid var(--border-color)' }}>
        <h2 style={{ fontSize: 17, fontWeight: 700, marginBottom: 10 }}>{t.introTitle}</h2>
        <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.7 }}>{t.introText}</p>
      </div>

      {/* FAQ */}
      <div style={{ marginTop: 24 }}>
        <h2 style={{ fontSize: 17, fontWeight: 700, marginBottom: 12 }}>{t.faqTitle}</h2>
        {[1, 2, 3, 4, 5].map(n => (
          <details key={n} style={{ border: '1px solid var(--border-color)', borderRadius: 8, marginBottom: 8, overflow: 'hidden', background: 'var(--bg-input)' }}>
            <summary style={{ padding: '12px 16px', cursor: 'pointer', fontSize: 14, fontWeight: 600 }}>
              {t[`faq${n}q` as keyof typeof t]}
            </summary>
            <div style={{ padding: '0 16px 12px', fontSize: 13, lineHeight: 1.7, color: 'var(--text-secondary)' }}>
              {t[`faq${n}a` as keyof typeof t]}
            </div>
          </details>
        ))}
      </div>
    </ToolLayout>
  );
}
