'use client';

import { use, useState, useCallback } from 'react';

const LOREM_WORDS = [
  'lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit',
  'sed', 'do', 'eiusmod', 'tempor', 'incididunt', 'ut', 'labore', 'et', 'dolore',
  'magna', 'aliqua', 'enim', 'ad', 'minim', 'veniam', 'quis', 'nostrud',
  'exercitation', 'ullamco', 'laboris', 'nisi', 'aliquip', 'ex', 'ea', 'commodo',
  'consequat', 'duis', 'aute', 'irure', 'in', 'reprehenderit', 'voluptate',
  'velit', 'esse', 'cillum', 'fugiat', 'nulla', 'pariatur', 'excepteur', 'sint',
  'occaecat', 'cupidatat', 'non', 'proident', 'sunt', 'culpa', 'qui', 'officia',
  'deserunt', 'mollit', 'anim', 'id', 'est', 'laborum', 'perspiciatis', 'unde',
  'omnis', 'iste', 'natus', 'error', 'voluptatem', 'accusantium', 'doloremque',
  'laudantium', 'totam', 'rem', 'aperiam', 'eaque', 'ipsa', 'quae', 'ab', 'illo',
  'inventore', 'veritatis', 'quasi', 'architecto', 'beatae', 'vitae', 'dicta',
  'explicabo', 'nemo', 'ipsam', 'quia', 'voluptas', 'aspernatur', 'aut', 'odit',
  'fugit', 'consequuntur', 'magni', 'dolores', 'eos', 'ratione', 'sequi', 'nesciunt',
  'neque', 'porro', 'quisquam', 'dolorem', 'adipisci', 'numquam', 'eius', 'modi',
  'tempora', 'magnam', 'aliquam', 'quaerat', 'minima', 'nostrum', 'exercitationem',
  'ullam', 'corporis', 'suscipit', 'laboriosam', 'nihil', 'hic', 'tenetur',
  'sapiente', 'delectus', 'reiciendis', 'voluptatibus', 'maiores', 'alias',
];

const FIRST_SENTENCE = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';

function randomWord(): string {
  return LOREM_WORDS[Math.floor(Math.random() * LOREM_WORDS.length)];
}

function generateSentence(): string {
  const len = 8 + Math.floor(Math.random() * 12);
  const words = Array.from({ length: len }, () => randomWord());
  words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1);
  return words.join(' ') + '.';
}

function generateParagraph(): string {
  const sentenceCount = 4 + Math.floor(Math.random() * 4);
  return Array.from({ length: sentenceCount }, () => generateSentence()).join(' ');
}

const strings: Record<string, Record<string, string>> = {
  en: {
    title: 'Lorem Ipsum Generator',
    description: 'Generate placeholder text for designs, mockups, and layouts. Choose paragraphs, sentences, or words.',
    mode: 'Mode',
    paragraphs: 'Paragraphs',
    sentences: 'Sentences',
    words: 'Words',
    count: 'Count',
    startWithLorem: 'Start with "Lorem ipsum..."',
    generate: 'Generate',
    copy: 'Copy', copied: 'Copied!',
    output: 'Generated Text',
    introTitle: 'Free Lorem Ipsum Generator',
    introText: 'Generate classic Lorem Ipsum placeholder text for your web designs, mockups, and content layouts. Choose the number of paragraphs, sentences, or words you need and copy the result instantly.',
    faqTitle: 'Frequently Asked Questions',
  },
  zh: {
    title: 'Lorem Ipsum 生成器',
    description: '为设计、模型和布局生成占位文本。选择段落、句子或单词数量。',
    mode: '模式',
    paragraphs: '段落',
    sentences: '句子',
    words: '单词',
    count: '数量',
    startWithLorem: '以 "Lorem ipsum..." 开头',
    generate: '生成',
    copy: '复制', copied: '已复制！',
    output: '生成的文本',
    introTitle: '免费 Lorem Ipsum 生成器',
    introText: '为网页设计、模型和内容布局生成经典的 Lorem Ipsum 占位文本。选择所需的段落、句子或单词数量，即时复制结果。',
    faqTitle: '常见问题',
  },
  ja: {
    title: 'Lorem Ipsum ジェネレーター',
    description: 'デザイン、モックアップ、レイアウト用のプレースホルダーテキストを生成。段落、文、単語を選択。',
    mode: 'モード',
    paragraphs: '段落',
    sentences: '文',
    words: '単語',
    count: '数量',
    startWithLorem: '"Lorem ipsum..." で始める',
    generate: '生成',
    copy: 'コピー', copied: 'コピー済み！',
    output: '生成されたテキスト',
    introTitle: '無料 Lorem Ipsum ジェネレーター',
    introText: 'ウェブデザイン、モックアップ、コンテンツレイアウト用のクラシックな Lorem Ipsum プレースホルダーテキストを生成します。',
    faqTitle: 'よくある質問',
  },
  ko: {
    title: 'Lorem Ipsum 생성기',
    description: '디자인, 목업, 레이아웃을 위한 자리 표시 텍스트를 생성합니다. 문단, 문장, 단어를 선택하세요.',
    mode: '모드',
    paragraphs: '문단',
    sentences: '문장',
    words: '단어',
    count: '수량',
    startWithLorem: '"Lorem ipsum..."으로 시작',
    generate: '생성',
    copy: '복사', copied: '복사됨!',
    output: '생성된 텍스트',
    introTitle: '무료 Lorem Ipsum 생성기',
    introText: '웹 디자인, 목업, 콘텐츠 레이아웃을 위한 클래식 Lorem Ipsum 자리 표시 텍스트를 생성합니다.',
    faqTitle: '자주 묻는 질문',
  },
  fr: {
    title: 'Generateur Lorem Ipsum',
    description: 'Generez du texte d\'espace reserve pour vos designs, maquettes et mises en page.',
    mode: 'Mode',
    paragraphs: 'Paragraphes',
    sentences: 'Phrases',
    words: 'Mots',
    count: 'Nombre',
    startWithLorem: 'Commencer par "Lorem ipsum..."',
    generate: 'Generer',
    copy: 'Copier', copied: 'Copie !',
    output: 'Texte genere',
    introTitle: 'Generateur Lorem Ipsum gratuit',
    introText: 'Generez du texte Lorem Ipsum classique pour vos designs web, maquettes et mises en page. Choisissez le nombre de paragraphes, phrases ou mots.',
    faqTitle: 'Questions frequentes',
  },
  de: {
    title: 'Lorem Ipsum Generator',
    description: 'Platzhaltertext fur Designs, Mockups und Layouts generieren. Absatze, Satze oder Worter wahlen.',
    mode: 'Modus',
    paragraphs: 'Absatze',
    sentences: 'Satze',
    words: 'Worter',
    count: 'Anzahl',
    startWithLorem: 'Mit "Lorem ipsum..." beginnen',
    generate: 'Generieren',
    copy: 'Kopieren', copied: 'Kopiert!',
    output: 'Generierter Text',
    introTitle: 'Kostenloser Lorem Ipsum Generator',
    introText: 'Generieren Sie klassischen Lorem Ipsum Platzhaltertext fur Ihre Webdesigns, Mockups und Content-Layouts.',
    faqTitle: 'Haufig gestellte Fragen',
  },
  es: {
    title: 'Generador Lorem Ipsum',
    description: 'Genere texto de relleno para disenos, maquetas y diseños. Elija parrafos, oraciones o palabras.',
    mode: 'Modo',
    paragraphs: 'Parrafos',
    sentences: 'Oraciones',
    words: 'Palabras',
    count: 'Cantidad',
    startWithLorem: 'Empezar con "Lorem ipsum..."',
    generate: 'Generar',
    copy: 'Copiar', copied: 'Copiado!',
    output: 'Texto generado',
    introTitle: 'Generador Lorem Ipsum gratuito',
    introText: 'Genere texto Lorem Ipsum clasico para sus diseños web, maquetas y layouts de contenido.',
    faqTitle: 'Preguntas frecuentes',
  },
  pt: {
    title: 'Gerador Lorem Ipsum',
    description: 'Gere texto de preenchimento para designs, mockups e layouts. Escolha paragrafos, frases ou palavras.',
    mode: 'Modo',
    paragraphs: 'Paragrafos',
    sentences: 'Frases',
    words: 'Palavras',
    count: 'Quantidade',
    startWithLorem: 'Comecar com "Lorem ipsum..."',
    generate: 'Gerar',
    copy: 'Copiar', copied: 'Copiado!',
    output: 'Texto gerado',
    introTitle: 'Gerador Lorem Ipsum gratuito',
    introText: 'Gere texto Lorem Ipsum classico para seus designs web, mockups e layouts de conteudo.',
    faqTitle: 'Perguntas frequentes',
  },
  it: {
    title: 'Generatore Lorem Ipsum',
    description: 'Genera testo segnaposto per design, mockup e layout. Scegli paragrafi, frasi o parole.',
    mode: 'Modalita',
    paragraphs: 'Paragrafi',
    sentences: 'Frasi',
    words: 'Parole',
    count: 'Quantita',
    startWithLorem: 'Inizia con "Lorem ipsum..."',
    generate: 'Genera',
    copy: 'Copia', copied: 'Copiato!',
    output: 'Testo generato',
    introTitle: 'Generatore Lorem Ipsum gratuito',
    introText: 'Genera testo Lorem Ipsum classico per i tuoi web design, mockup e layout di contenuto.',
    faqTitle: 'Domande frequenti',
  },
  nl: {
    title: 'Lorem Ipsum Generator',
    description: 'Genereer placeholdertekst voor ontwerpen, mockups en lay-outs. Kies alinea\'s, zinnen of woorden.',
    mode: 'Modus',
    paragraphs: 'Alinea\'s',
    sentences: 'Zinnen',
    words: 'Woorden',
    count: 'Aantal',
    startWithLorem: 'Begin met "Lorem ipsum..."',
    generate: 'Genereren',
    copy: 'Kopieren', copied: 'Gekopieerd!',
    output: 'Gegenereerde tekst',
    introTitle: 'Gratis Lorem Ipsum Generator',
    introText: 'Genereer klassieke Lorem Ipsum placeholdertekst voor uw webontwerpen, mockups en content-layouts.',
    faqTitle: 'Veelgestelde vragen',
  },
  pl: {
    title: 'Generator Lorem Ipsum',
    description: 'Generuj tekst zastepczy dla projektow, makiet i ukladow. Wybierz akapity, zdania lub slowa.',
    mode: 'Tryb',
    paragraphs: 'Akapity',
    sentences: 'Zdania',
    words: 'Slowa',
    count: 'Ilosc',
    startWithLorem: 'Zacznij od "Lorem ipsum..."',
    generate: 'Generuj',
    copy: 'Kopiuj', copied: 'Skopiowano!',
    output: 'Wygenerowany tekst',
    introTitle: 'Darmowy generator Lorem Ipsum',
    introText: 'Generuj klasyczny tekst Lorem Ipsum dla swoich projektow webowych, makiet i ukladow tresci.',
    faqTitle: 'Czesto zadawane pytania',
  },
  sv: {
    title: 'Lorem Ipsum Generator',
    description: 'Generera platshallaretext for designer, mockups och layouter. Valj stycken, meningar eller ord.',
    mode: 'Lage',
    paragraphs: 'Stycken',
    sentences: 'Meningar',
    words: 'Ord',
    count: 'Antal',
    startWithLorem: 'Borja med "Lorem ipsum..."',
    generate: 'Generera',
    copy: 'Kopiera', copied: 'Kopierad!',
    output: 'Genererad text',
    introTitle: 'Gratis Lorem Ipsum Generator',
    introText: 'Generera klassisk Lorem Ipsum platshallaretext for dina webbdesigner, mockups och innehallslayouter.',
    faqTitle: 'Vanliga fragor',
  },
  no: {
    title: 'Lorem Ipsum Generator',
    description: 'Generer plassholdertekst for design, mockups og oppsett. Velg avsnitt, setninger eller ord.',
    mode: 'Modus',
    paragraphs: 'Avsnitt',
    sentences: 'Setninger',
    words: 'Ord',
    count: 'Antall',
    startWithLorem: 'Start med "Lorem ipsum..."',
    generate: 'Generer',
    copy: 'Kopier', copied: 'Kopiert!',
    output: 'Generert tekst',
    introTitle: 'Gratis Lorem Ipsum Generator',
    introText: 'Generer klassisk Lorem Ipsum plassholdertekst for dine webdesign, mockups og innholdslayouter.',
    faqTitle: 'Ofte stilte sporsmal',
  },
  id: {
    title: 'Generator Lorem Ipsum',
    description: 'Hasilkan teks placeholder untuk desain, mockup, dan tata letak. Pilih paragraf, kalimat, atau kata.',
    mode: 'Mode',
    paragraphs: 'Paragraf',
    sentences: 'Kalimat',
    words: 'Kata',
    count: 'Jumlah',
    startWithLorem: 'Mulai dengan "Lorem ipsum..."',
    generate: 'Hasilkan',
    copy: 'Salin', copied: 'Disalin!',
    output: 'Teks yang Dihasilkan',
    introTitle: 'Generator Lorem Ipsum Gratis',
    introText: 'Hasilkan teks Lorem Ipsum klasik untuk desain web, mockup, dan tata letak konten Anda.',
    faqTitle: 'Pertanyaan yang Sering Diajukan',
  },
  th: {
    title: 'ตัวสร้าง Lorem Ipsum',
    description: 'สร้างข้อความตัวอย่างสำหรับการออกแบบ เลือกย่อหน้า ประโยค หรือคำ',
    mode: 'โหมด',
    paragraphs: 'ย่อหน้า',
    sentences: 'ประโยค',
    words: 'คำ',
    count: 'จำนวน',
    startWithLorem: 'เริ่มต้นด้วย "Lorem ipsum..."',
    generate: 'สร้าง',
    copy: 'คัดลอก', copied: 'คัดลอกแล้ว!',
    output: 'ข้อความที่สร้างขึ้น',
    introTitle: 'ตัวสร้าง Lorem Ipsum ฟรี',
    introText: 'สร้างข้อความ Lorem Ipsum คลาสสิกสำหรับการออกแบบเว็บ เลย์เอาต์เนื้อหา',
    faqTitle: 'คำถามที่พบบ่อย',
  },
};

const faqData: Record<string, Array<{ q: string; a: string }>> = {
  en: [
    { q: 'What is Lorem Ipsum?', a: 'Lorem Ipsum is dummy text used in the printing and typesetting industry since the 1500s. It is used as placeholder text to demonstrate the visual form of a document without relying on meaningful content.' },
    { q: 'Why use Lorem Ipsum instead of real text?', a: 'Lorem Ipsum prevents readers from being distracted by readable content when evaluating layouts and designs. It has a roughly normal distribution of letters, making it look like real text without conveying meaning.' },
    { q: 'Can I choose the amount of text generated?', a: 'Yes. You can select the mode (paragraphs, sentences, or words) and specify the exact count you need. The tool generates the requested amount instantly.' },
    { q: 'Does the generated text always start with "Lorem ipsum"?', a: 'By default, yes. You can toggle the option to start with "Lorem ipsum dolor sit amet..." or generate fully randomized placeholder text.' },
    { q: 'Is this tool free to use?', a: 'Yes, this Lorem Ipsum generator is completely free with no limits on how many times you can generate text. All processing happens in your browser.' },
  ],
  zh: [
    { q: '什么是 Lorem Ipsum？', a: 'Lorem Ipsum 是自1500年代以来印刷和排版行业使用的虚拟文本。用作占位文本来展示文档的视觉形式。' },
    { q: '为什么使用 Lorem Ipsum 而不是真实文本？', a: 'Lorem Ipsum 防止读者在评估布局和设计时被可读内容分散注意力。它的字母分布接近正常文本。' },
    { q: '可以选择生成的文本量吗？', a: '可以。选择模式（段落、句子或单词）并指定所需数量，工具会即时生成。' },
    { q: '生成的文本总是以 "Lorem ipsum" 开头吗？', a: '默认是的。可以切换选项来决定是否以 "Lorem ipsum dolor sit amet..." 开头。' },
    { q: '这个工具免费吗？', a: '是的，完全免费，没有使用次数限制。' },
  ],
  ja: [
    { q: 'Lorem Ipsumとは何ですか？', a: 'Lorem Ipsumは1500年代から印刷・組版業界で使用されているダミーテキストです。意味のある内容に頼らずにドキュメントの視覚的形式を示すプレースホルダーテキストとして使用されます。' },
    { q: 'なぜ実際のテキストではなくLorem Ipsumを使うのですか？', a: 'レイアウトやデザインを評価する際に読者が内容に気を取られるのを防ぎます。文字の分布が実際のテキストに近いためです。' },
    { q: '生成するテキスト量を選べますか？', a: 'はい。モード（段落、文、単語）を選択し、必要な数を指定できます。' },
    { q: '生成されたテキストは常に "Lorem ipsum" で始まりますか？', a: 'デフォルトではそうです。オプションで切り替えることができます。' },
    { q: 'このツールは無料ですか？', a: 'はい、完全に無料で使用回数に制限はありません。' },
  ],
  ko: [
    { q: 'Lorem Ipsum이란 무엇인가요?', a: 'Lorem Ipsum은 1500년대부터 인쇄 및 조판 업계에서 사용된 더미 텍스트입니다. 의미 있는 콘텐츠 없이 문서의 시각적 형태를 보여주는 자리 표시 텍스트입니다.' },
    { q: '왜 실제 텍스트 대신 Lorem Ipsum을 사용하나요?', a: '레이아웃과 디자인을 평가할 때 읽을 수 있는 내용으로 주의가 분산되는 것을 방지합니다.' },
    { q: '생성할 텍스트 양을 선택할 수 있나요?', a: '네. 모드(문단, 문장, 단어)를 선택하고 필요한 수량을 지정할 수 있습니다.' },
    { q: '생성된 텍스트는 항상 "Lorem ipsum"으로 시작하나요?', a: '기본적으로 그렇습니다. 옵션을 전환하여 변경할 수 있습니다.' },
    { q: '이 도구는 무료인가요?', a: '네, 완전히 무료이며 사용 횟수 제한이 없습니다.' },
  ],
  fr: [
    { q: 'Qu\'est-ce que Lorem Ipsum ?', a: 'Lorem Ipsum est un texte fictif utilise dans l\'industrie de l\'impression depuis les annees 1500 comme texte de remplissage pour montrer la forme visuelle d\'un document.' },
    { q: 'Pourquoi utiliser Lorem Ipsum plutot que du vrai texte ?', a: 'Lorem Ipsum empeche les lecteurs d\'etre distraits par un contenu lisible lors de l\'evaluation des mises en page et des designs.' },
    { q: 'Puis-je choisir la quantite de texte ?', a: 'Oui. Selectionnez le mode (paragraphes, phrases ou mots) et specifiez le nombre exact.' },
    { q: 'Le texte commence-t-il toujours par "Lorem ipsum" ?', a: 'Par defaut, oui. Vous pouvez desactiver cette option.' },
    { q: 'Cet outil est-il gratuit ?', a: 'Oui, completement gratuit et sans limite d\'utilisation.' },
  ],
  de: [
    { q: 'Was ist Lorem Ipsum?', a: 'Lorem Ipsum ist ein Blindtext, der seit den 1500er Jahren in der Druck- und Satzbranche verwendet wird, um die visuelle Form eines Dokuments darzustellen.' },
    { q: 'Warum Lorem Ipsum statt echtem Text verwenden?', a: 'Lorem Ipsum verhindert, dass Leser bei der Bewertung von Layouts und Designs durch lesbaren Inhalt abgelenkt werden.' },
    { q: 'Kann ich die Textmenge wahlen?', a: 'Ja. Wahlen Sie den Modus (Absatze, Satze oder Worter) und geben Sie die genaue Anzahl an.' },
    { q: 'Beginnt der Text immer mit "Lorem ipsum"?', a: 'Standardmassig ja. Sie konnen diese Option deaktivieren.' },
    { q: 'Ist dieses Tool kostenlos?', a: 'Ja, komplett kostenlos und ohne Nutzungsbeschrankung.' },
  ],
  es: [
    { q: 'Que es Lorem Ipsum?', a: 'Lorem Ipsum es un texto ficticio utilizado en la industria de la impresion desde los anos 1500 como texto de relleno para mostrar la forma visual de un documento.' },
    { q: 'Por que usar Lorem Ipsum en vez de texto real?', a: 'Lorem Ipsum evita que los lectores se distraigan con contenido legible al evaluar disenos y maquetas.' },
    { q: 'Puedo elegir la cantidad de texto?', a: 'Si. Seleccione el modo (parrafos, oraciones o palabras) y especifique la cantidad exacta.' },
    { q: 'El texto siempre empieza con "Lorem ipsum"?', a: 'Por defecto, si. Puede desactivar esta opcion.' },
    { q: 'Esta herramienta es gratuita?', a: 'Si, completamente gratuita y sin limites de uso.' },
  ],
  pt: [
    { q: 'O que e Lorem Ipsum?', a: 'Lorem Ipsum e um texto ficticio usado na industria grafica desde os anos 1500 como texto de preenchimento para mostrar a forma visual de um documento.' },
    { q: 'Por que usar Lorem Ipsum em vez de texto real?', a: 'Lorem Ipsum evita que leitores se distraiam com conteudo legivel ao avaliar layouts e designs.' },
    { q: 'Posso escolher a quantidade de texto?', a: 'Sim. Selecione o modo (paragrafos, frases ou palavras) e especifique a quantidade exata.' },
    { q: 'O texto sempre comeca com "Lorem ipsum"?', a: 'Por padrao, sim. Voce pode desativar essa opcao.' },
    { q: 'Esta ferramenta e gratuita?', a: 'Sim, completamente gratuita e sem limites de uso.' },
  ],
  it: [
    { q: 'Cos\'e Lorem Ipsum?', a: 'Lorem Ipsum e un testo fittizio usato nell\'industria della stampa dal 1500 come testo segnaposto per mostrare la forma visiva di un documento.' },
    { q: 'Perche usare Lorem Ipsum invece di testo vero?', a: 'Lorem Ipsum impedisce ai lettori di essere distratti dal contenuto leggibile durante la valutazione di layout e design.' },
    { q: 'Posso scegliere la quantita di testo?', a: 'Si. Seleziona la modalita (paragrafi, frasi o parole) e specifica la quantita esatta.' },
    { q: 'Il testo inizia sempre con "Lorem ipsum"?', a: 'Per impostazione predefinita si. Puoi disattivare questa opzione.' },
    { q: 'Questo strumento e gratuito?', a: 'Si, completamente gratuito e senza limiti di utilizzo.' },
  ],
  nl: [
    { q: 'Wat is Lorem Ipsum?', a: 'Lorem Ipsum is een fictieve tekst die sinds de jaren 1500 in de druk- en zetindustrie wordt gebruikt als opvultekst om de visuele vorm van een document te tonen.' },
    { q: 'Waarom Lorem Ipsum gebruiken in plaats van echte tekst?', a: 'Lorem Ipsum voorkomt dat lezers worden afgeleid door leesbare inhoud bij het evalueren van lay-outs en ontwerpen.' },
    { q: 'Kan ik de hoeveelheid tekst kiezen?', a: 'Ja. Selecteer de modus (alinea\'s, zinnen of woorden) en geef het exacte aantal aan.' },
    { q: 'Begint de tekst altijd met "Lorem ipsum"?', a: 'Standaard wel. U kunt deze optie uitschakelen.' },
    { q: 'Is dit hulpmiddel gratis?', a: 'Ja, volledig gratis en zonder gebruikslimiet.' },
  ],
  pl: [
    { q: 'Czym jest Lorem Ipsum?', a: 'Lorem Ipsum to fikcyjny tekst uzywany w branzy drukarskiej od lat 1500-tych jako tekst zastepczy do prezentacji wizualnej formy dokumentu.' },
    { q: 'Dlaczego uzywac Lorem Ipsum zamiast prawdziwego tekstu?', a: 'Lorem Ipsum zapobiega rozpraszaniu czytelnikow czytelna trescia podczas oceny ukladow i projektow.' },
    { q: 'Czy moge wybrac ilosc tekstu?', a: 'Tak. Wybierz tryb (akapity, zdania lub slowa) i podaj dokladna ilosc.' },
    { q: 'Czy tekst zawsze zaczyna sie od "Lorem ipsum"?', a: 'Domyslnie tak. Mozesz wylac te opcje.' },
    { q: 'Czy to narzedzie jest darmowe?', a: 'Tak, calkowicie darmowe i bez limitow uzytkowania.' },
  ],
  sv: [
    { q: 'Vad ar Lorem Ipsum?', a: 'Lorem Ipsum ar en fiktiv text som anvants i tryck- och satsindustrin sedan 1500-talet som platshallaretext for att visa den visuella formen av ett dokument.' },
    { q: 'Varfor anvanda Lorem Ipsum istallet for riktig text?', a: 'Lorem Ipsum forhindrar lasare fran att distraheras av lasbar text vid utvardering av layouter och designer.' },
    { q: 'Kan jag valja mangden text?', a: 'Ja. Valj lage (stycken, meningar eller ord) och ange det exakta antalet.' },
    { q: 'Borjar texten alltid med "Lorem ipsum"?', a: 'Som standard, ja. Du kan inaktivera detta alternativ.' },
    { q: 'Ar detta verktyg gratis?', a: 'Ja, helt gratis och utan begransning.' },
  ],
  no: [
    { q: 'Hva er Lorem Ipsum?', a: 'Lorem Ipsum er en fiktiv tekst som har vaert brukt i trykke- og settebransjen siden 1500-tallet som plassholdertekst for a vise den visuelle formen til et dokument.' },
    { q: 'Hvorfor bruke Lorem Ipsum i stedet for ekte tekst?', a: 'Lorem Ipsum forhindrer lesere fra a bli distrahert av lesbar tekst ved evaluering av layout og design.' },
    { q: 'Kan jeg velge mengden tekst?', a: 'Ja. Velg modus (avsnitt, setninger eller ord) og angi det noyaktige antallet.' },
    { q: 'Starter teksten alltid med "Lorem ipsum"?', a: 'Som standard, ja. Du kan deaktivere dette alternativet.' },
    { q: 'Er dette verktøyet gratis?', a: 'Ja, helt gratis og uten begrensning.' },
  ],
  id: [
    { q: 'Apa itu Lorem Ipsum?', a: 'Lorem Ipsum adalah teks fiksi yang digunakan dalam industri percetakan sejak tahun 1500-an sebagai teks placeholder untuk menunjukkan bentuk visual dokumen.' },
    { q: 'Mengapa menggunakan Lorem Ipsum daripada teks asli?', a: 'Lorem Ipsum mencegah pembaca terganggu oleh konten yang bisa dibaca saat mengevaluasi tata letak dan desain.' },
    { q: 'Bisakah saya memilih jumlah teks?', a: 'Ya. Pilih mode (paragraf, kalimat, atau kata) dan tentukan jumlah yang tepat.' },
    { q: 'Apakah teks selalu dimulai dengan "Lorem ipsum"?', a: 'Secara default, ya. Anda dapat menonaktifkan opsi ini.' },
    { q: 'Apakah alat ini gratis?', a: 'Ya, sepenuhnya gratis dan tanpa batasan penggunaan.' },
  ],
  th: [
    { q: 'Lorem Ipsum คืออะไร?', a: 'Lorem Ipsum คือข้อความจำลองที่ใช้ในอุตสาหกรรมการพิมพ์ตั้งแต่ศตวรรษที่ 15 เป็นข้อความตัวอย่างเพื่อแสดงรูปแบบภาพของเอกสาร' },
    { q: 'ทำไมใช้ Lorem Ipsum แทนข้อความจริง?', a: 'Lorem Ipsum ป้องกันไม่ให้ผู้อ่านถูกเบี่ยงเบนโดยเนื้อหาที่อ่านได้เมื่อประเมินเลย์เอาต์และการออกแบบ' },
    { q: 'เลือกปริมาณข้อความได้ไหม?', a: 'ได้ เลือกโหมด (ย่อหน้า ประโยค หรือคำ) แล้วระบุจำนวนที่ต้องการ' },
    { q: 'ข้อความเริ่มด้วย "Lorem ipsum" เสมอไหม?', a: 'ค่าเริ่มต้นใช่ คุณสามารถปิดตัวเลือกนี้ได้' },
    { q: 'เครื่องมือนี้ฟรีหรือไม่?', a: 'ใช่ ฟรีทั้งหมดและไม่มีข้อจำกัดในการใช้งาน' },
  ],
};

export default function LoremIpsumPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = use(params);
  const t = strings[lang] || strings.en;
  const faqs = faqData[lang] || faqData.en;

  const [mode, setMode] = useState<'paragraphs' | 'sentences' | 'words'>('paragraphs');
  const [count, setCount] = useState(3);
  const [startWithLorem, setStartWithLorem] = useState(true);
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);

  const handleGenerate = useCallback(() => {
    let result = '';
    if (mode === 'paragraphs') {
      const paragraphs: string[] = [];
      for (let i = 0; i < count; i++) {
        let p = generateParagraph();
        if (i === 0 && startWithLorem) {
          p = FIRST_SENTENCE + ' ' + p;
        }
        paragraphs.push(p);
      }
      result = paragraphs.join('\n\n');
    } else if (mode === 'sentences') {
      const sentences: string[] = [];
      for (let i = 0; i < count; i++) {
        if (i === 0 && startWithLorem) {
          sentences.push(FIRST_SENTENCE);
        } else {
          sentences.push(generateSentence());
        }
      }
      result = sentences.join(' ');
    } else {
      const words: string[] = [];
      if (startWithLorem) {
        const loremStart = FIRST_SENTENCE.replace('.', '').split(' ');
        for (let i = 0; i < Math.min(count, loremStart.length); i++) {
          words.push(loremStart[i]);
        }
      }
      while (words.length < count) {
        words.push(randomWord());
      }
      result = words.slice(0, count).join(' ') + '.';
    }
    setOutput(result);
  }, [mode, count, startWithLorem]);

  const handleCopy = useCallback(() => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }, [output]);

  const btnStyle: React.CSSProperties = {
    padding: '8px 18px', borderRadius: 6, border: '1px solid var(--border-color)',
    background: 'var(--bg-card)', cursor: 'pointer', fontSize: 14, fontWeight: 600, color: 'inherit',
  };
  const primaryBtn: React.CSSProperties = {
    ...btnStyle, background: '#2563eb', color: '#fff', border: 'none',
  };
  const activeModeBtn: React.CSSProperties = {
    ...btnStyle, background: '#2563eb', color: '#fff', border: '1px solid #2563eb',
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org', '@type': 'FAQPage',
        mainEntity: faqs.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
      }) }} />
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '20px 16px' }}>
        <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>{t.title}</h1>
        <p style={{ color: 'var(--text-secondary)', marginBottom: 24 }}>{t.description}</p>

        {/* Controls */}
        <div style={{ padding: 20, background: 'var(--bg-card)', borderRadius: 10, border: '1px solid var(--border-color)', marginBottom: 20 }}>
          {/* Mode selection */}
          <div style={{ marginBottom: 16 }}>
            <label style={{ fontWeight: 600, fontSize: 14, marginBottom: 8, display: 'block' }}>{t.mode}</label>
            <div style={{ display: 'flex', gap: 8 }}>
              <button onClick={() => setMode('paragraphs')} style={mode === 'paragraphs' ? activeModeBtn : btnStyle}>{t.paragraphs}</button>
              <button onClick={() => setMode('sentences')} style={mode === 'sentences' ? activeModeBtn : btnStyle}>{t.sentences}</button>
              <button onClick={() => setMode('words')} style={mode === 'words' ? activeModeBtn : btnStyle}>{t.words}</button>
            </div>
          </div>

          {/* Count */}
          <div style={{ marginBottom: 16 }}>
            <label style={{ fontWeight: 600, fontSize: 14, marginBottom: 8, display: 'block' }}>{t.count}: {count}</label>
            <input
              type="range" min={1} max={mode === 'words' ? 500 : mode === 'sentences' ? 50 : 20} value={count}
              onChange={e => setCount(Number(e.target.value))}
              style={{ width: '100%' }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'var(--text-secondary)' }}>
              <span>1</span>
              <span>{mode === 'words' ? 500 : mode === 'sentences' ? 50 : 20}</span>
            </div>
          </div>

          {/* Start with Lorem */}
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontSize: 14 }}>
              <input type="checkbox" checked={startWithLorem} onChange={e => setStartWithLorem(e.target.checked)} />
              {t.startWithLorem}
            </label>
          </div>

          <button onClick={handleGenerate} style={primaryBtn}>{t.generate}</button>
        </div>

        {/* Output */}
        {output && (
          <div style={{ marginBottom: 24 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
              <label style={{ fontWeight: 600, fontSize: 14 }}>{t.output}</label>
              <button onClick={handleCopy} style={btnStyle}>
                {copied ? t.copied : t.copy}
              </button>
            </div>
            <div style={{
              padding: 16, background: 'var(--bg-card)', borderRadius: 10, border: '1px solid var(--border-color)',
              whiteSpace: 'pre-wrap', lineHeight: 1.7, fontSize: 14, maxHeight: 400, overflow: 'auto',
            }}>
              {output}
            </div>
          </div>
        )}

        {/* Intro */}
        <div style={{ marginBottom: 24 }}>
          <h2 style={{ fontSize: 22, fontWeight: 600, marginBottom: 8 }}>{t.introTitle}</h2>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>{t.introText}</p>
        </div>

        {/* FAQ */}
        <div style={{ marginBottom: 24 }}>
          <h2 style={{ fontSize: 22, fontWeight: 600, marginBottom: 16 }}>{t.faqTitle}</h2>
          {faqs.map((faq, i) => (
            <details key={i} style={{ marginBottom: 8, padding: '12px 16px', background: 'var(--bg-card)', borderRadius: 10, border: '1px solid var(--border-color)' }}>
              <summary style={{ cursor: 'pointer', fontWeight: 600 }}>{faq.q}</summary>
              <p style={{ marginTop: 8, color: 'var(--text-secondary)', lineHeight: 1.6 }}>{faq.a}</p>
            </details>
          ))}
        </div>
      </div>
    </>
  );
}
