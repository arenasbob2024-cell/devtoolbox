'use client';

import { use, useState, useCallback, useRef, useEffect } from 'react';

const strings: Record<string, Record<string, string>> = {
  en: {
    title: 'Color Picker Online',
    description: 'Pick any color visually, preview in real-time, and convert between HEX, RGB, and HSL formats.',
    hex: 'HEX', rgb: 'RGB', hsl: 'HSL',
    copy: 'Copy', copied: 'Copied!',
    hue: 'Hue', saturation: 'Saturation', lightness: 'Lightness',
    red: 'R', green: 'G', blue: 'B',
    preview: 'Color Preview',
    pickFromArea: 'Click or drag on the color area to pick a color',
    recentColors: 'Recent Colors',
    clearRecent: 'Clear',
    introTitle: 'Free Online Color Picker',
    introText: 'Select any color from the gradient area, adjust the hue slider, and get the color value in HEX, RGB, and HSL formats. Perfect for web designers, developers, and digital artists.',
    faqTitle: 'Frequently Asked Questions',
  },
  zh: {
    title: '在线颜色选择器',
    description: '可视化选择任何颜色，实时预览，并在 HEX、RGB 和 HSL 格式之间转换。',
    hex: 'HEX', rgb: 'RGB', hsl: 'HSL',
    copy: '复制', copied: '已复制！',
    hue: '色相', saturation: '饱和度', lightness: '亮度',
    red: 'R', green: 'G', blue: 'B',
    preview: '颜色预览',
    pickFromArea: '点击或拖拽颜色区域来选择颜色',
    recentColors: '最近颜色',
    clearRecent: '清除',
    introTitle: '免费在线颜色选择器',
    introText: '从渐变区域选择颜色，调整色相滑块，获取 HEX、RGB 和 HSL 格式的颜色值。',
    faqTitle: '常见问题',
  },
  ja: {
    title: 'オンラインカラーピッカー',
    description: '視覚的に色を選択し、リアルタイムでプレビューし、HEX、RGB、HSL形式間で変換します。',
    hex: 'HEX', rgb: 'RGB', hsl: 'HSL',
    copy: 'コピー', copied: 'コピー済み！',
    hue: '色相', saturation: '彩度', lightness: '明度',
    red: 'R', green: 'G', blue: 'B',
    preview: 'カラープレビュー',
    pickFromArea: 'カラーエリアをクリックまたはドラッグして色を選択',
    recentColors: '最近の色',
    clearRecent: 'クリア',
    introTitle: '無料オンラインカラーピッカー',
    introText: 'グラデーションエリアから色を選択し、色相スライダーを調整して、HEX、RGB、HSL形式で色の値を取得します。',
    faqTitle: 'よくある質問',
  },
  ko: {
    title: '온라인 색상 선택기',
    description: '시각적으로 색상을 선택하고 실시간 미리보기하며 HEX, RGB, HSL 형식 간 변환합니다.',
    hex: 'HEX', rgb: 'RGB', hsl: 'HSL',
    copy: '복사', copied: '복사됨!',
    hue: '색조', saturation: '채도', lightness: '명도',
    red: 'R', green: 'G', blue: 'B',
    preview: '색상 미리보기',
    pickFromArea: '색상 영역을 클릭하거나 드래그하여 색상을 선택하세요',
    recentColors: '최근 색상',
    clearRecent: '지우기',
    introTitle: '무료 온라인 색상 선택기',
    introText: '그라데이션 영역에서 색상을 선택하고, 색조 슬라이더를 조정하여 HEX, RGB, HSL 형식의 색상 값을 가져옵니다.',
    faqTitle: '자주 묻는 질문',
  },
  fr: {
    title: 'Selecteur de Couleurs en Ligne',
    description: 'Choisissez une couleur visuellement, previsualisation en temps reel, conversion entre HEX, RGB et HSL.',
    hex: 'HEX', rgb: 'RGB', hsl: 'HSL',
    copy: 'Copier', copied: 'Copie !',
    hue: 'Teinte', saturation: 'Saturation', lightness: 'Luminosite',
    red: 'R', green: 'V', blue: 'B',
    preview: 'Apercu de couleur',
    pickFromArea: 'Cliquez ou glissez sur la zone de couleur pour choisir',
    recentColors: 'Couleurs recentes',
    clearRecent: 'Effacer',
    introTitle: 'Selecteur de couleurs gratuit',
    introText: 'Selectionnez une couleur dans la zone de degrade, ajustez la teinte et obtenez la valeur en HEX, RGB et HSL.',
    faqTitle: 'Questions frequentes',
  },
  de: {
    title: 'Farbauswahl Online',
    description: 'Wahlen Sie eine Farbe visuell aus, Echtzeit-Vorschau, Konvertierung zwischen HEX, RGB und HSL.',
    hex: 'HEX', rgb: 'RGB', hsl: 'HSL',
    copy: 'Kopieren', copied: 'Kopiert!',
    hue: 'Farbton', saturation: 'Sattigung', lightness: 'Helligkeit',
    red: 'R', green: 'G', blue: 'B',
    preview: 'Farbvorschau',
    pickFromArea: 'Klicken oder ziehen Sie auf den Farbbereich',
    recentColors: 'Letzte Farben',
    clearRecent: 'Loschen',
    introTitle: 'Kostenlose Online-Farbauswahl',
    introText: 'Wahlen Sie eine Farbe aus dem Verlaufsbereich, passen Sie den Farbton an und erhalten Sie den Wert in HEX, RGB und HSL.',
    faqTitle: 'Haufig gestellte Fragen',
  },
  es: {
    title: 'Selector de Color en Linea',
    description: 'Seleccione cualquier color visualmente, vista previa en tiempo real, conversion entre HEX, RGB y HSL.',
    hex: 'HEX', rgb: 'RGB', hsl: 'HSL',
    copy: 'Copiar', copied: 'Copiado!',
    hue: 'Tono', saturation: 'Saturacion', lightness: 'Luminosidad',
    red: 'R', green: 'V', blue: 'A',
    preview: 'Vista previa del color',
    pickFromArea: 'Haga clic o arrastre en el area de color para seleccionar',
    recentColors: 'Colores recientes',
    clearRecent: 'Limpiar',
    introTitle: 'Selector de color gratuito',
    introText: 'Seleccione un color del area de degradado, ajuste el tono y obtenga el valor en HEX, RGB y HSL.',
    faqTitle: 'Preguntas frecuentes',
  },
  pt: {
    title: 'Seletor de Cores Online',
    description: 'Escolha qualquer cor visualmente, pre-visualizacao em tempo real, conversao entre HEX, RGB e HSL.',
    hex: 'HEX', rgb: 'RGB', hsl: 'HSL',
    copy: 'Copiar', copied: 'Copiado!',
    hue: 'Matiz', saturation: 'Saturacao', lightness: 'Luminosidade',
    red: 'R', green: 'G', blue: 'B',
    preview: 'Pre-visualizacao da cor',
    pickFromArea: 'Clique ou arraste na area de cor para selecionar',
    recentColors: 'Cores recentes',
    clearRecent: 'Limpar',
    introTitle: 'Seletor de cores online gratuito',
    introText: 'Selecione uma cor da area de gradiente, ajuste o matiz e obtenha o valor em HEX, RGB e HSL.',
    faqTitle: 'Perguntas frequentes',
  },
  it: {
    title: 'Selettore Colori Online',
    description: 'Scegli qualsiasi colore visivamente, anteprima in tempo reale, conversione tra HEX, RGB e HSL.',
    hex: 'HEX', rgb: 'RGB', hsl: 'HSL',
    copy: 'Copia', copied: 'Copiato!',
    hue: 'Tonalita', saturation: 'Saturazione', lightness: 'Luminosita',
    red: 'R', green: 'G', blue: 'B',
    preview: 'Anteprima colore',
    pickFromArea: 'Clicca o trascina nell\'area colore per selezionare',
    recentColors: 'Colori recenti',
    clearRecent: 'Cancella',
    introTitle: 'Selettore colori online gratuito',
    introText: 'Seleziona un colore dall\'area del gradiente, regola la tonalita e ottieni il valore in HEX, RGB e HSL.',
    faqTitle: 'Domande frequenti',
  },
  nl: {
    title: 'Online Kleurkiezer',
    description: 'Kies visueel een kleur, realtime voorbeeld, conversie tussen HEX, RGB en HSL.',
    hex: 'HEX', rgb: 'RGB', hsl: 'HSL',
    copy: 'Kopieren', copied: 'Gekopieerd!',
    hue: 'Tint', saturation: 'Verzadiging', lightness: 'Helderheid',
    red: 'R', green: 'G', blue: 'B',
    preview: 'Kleurvoorbeeld',
    pickFromArea: 'Klik of sleep op het kleurgebied om een kleur te kiezen',
    recentColors: 'Recente kleuren',
    clearRecent: 'Wissen',
    introTitle: 'Gratis online kleurkiezer',
    introText: 'Selecteer een kleur uit het verloopgebied, pas de tint aan en krijg de waarde in HEX, RGB en HSL.',
    faqTitle: 'Veelgestelde vragen',
  },
  pl: {
    title: 'Selektor Kolorow Online',
    description: 'Wybierz dowolny kolor wizualnie, podglad w czasie rzeczywistym, konwersja miedzy HEX, RGB i HSL.',
    hex: 'HEX', rgb: 'RGB', hsl: 'HSL',
    copy: 'Kopiuj', copied: 'Skopiowano!',
    hue: 'Odcien', saturation: 'Nasycenie', lightness: 'Jasnosc',
    red: 'R', green: 'G', blue: 'B',
    preview: 'Podglad koloru',
    pickFromArea: 'Kliknij lub przeciagnij w obszarze kolorow, aby wybrac kolor',
    recentColors: 'Ostatnie kolory',
    clearRecent: 'Wyczysc',
    introTitle: 'Darmowy selektor kolorow online',
    introText: 'Wybierz kolor z obszaru gradientu, dostosuj odcien i uzyskaj wartosc w HEX, RGB i HSL.',
    faqTitle: 'Czesto zadawane pytania',
  },
  sv: {
    title: 'Fargvaljare Online',
    description: 'Valj nagon farg visuellt, forhandsgranska i realtid, konvertera mellan HEX, RGB och HSL.',
    hex: 'HEX', rgb: 'RGB', hsl: 'HSL',
    copy: 'Kopiera', copied: 'Kopierad!',
    hue: 'Nyans', saturation: 'Mattnad', lightness: 'Ljushet',
    red: 'R', green: 'G', blue: 'B',
    preview: 'Fargforhandsvisning',
    pickFromArea: 'Klicka eller dra i fargomradet for att valja en farg',
    recentColors: 'Senaste farger',
    clearRecent: 'Rensa',
    introTitle: 'Gratis online fargvaljare',
    introText: 'Valj en farg fran gradientomradet, justera nyanser och fa vardet i HEX, RGB och HSL.',
    faqTitle: 'Vanliga fragor',
  },
  no: {
    title: 'Fargevelger Online',
    description: 'Velg hvilken som helst farge visuelt, forhandsvisning i sanntid, konvertering mellom HEX, RGB og HSL.',
    hex: 'HEX', rgb: 'RGB', hsl: 'HSL',
    copy: 'Kopier', copied: 'Kopiert!',
    hue: 'Fargetone', saturation: 'Metning', lightness: 'Lyshet',
    red: 'R', green: 'G', blue: 'B',
    preview: 'Fargeforhandsvisning',
    pickFromArea: 'Klikk eller dra i fargeomradet for a velge en farge',
    recentColors: 'Siste farger',
    clearRecent: 'Tøm',
    introTitle: 'Gratis online fargevelger',
    introText: 'Velg en farge fra gradientomradet, juster fargetonen og fa verdien i HEX, RGB og HSL.',
    faqTitle: 'Ofte stilte sporsmal',
  },
  id: {
    title: 'Pemilih Warna Online',
    description: 'Pilih warna secara visual, pratinjau real-time, konversi antara HEX, RGB, dan HSL.',
    hex: 'HEX', rgb: 'RGB', hsl: 'HSL',
    copy: 'Salin', copied: 'Disalin!',
    hue: 'Rona', saturation: 'Saturasi', lightness: 'Kecerahan',
    red: 'R', green: 'G', blue: 'B',
    preview: 'Pratinjau Warna',
    pickFromArea: 'Klik atau seret di area warna untuk memilih warna',
    recentColors: 'Warna Terbaru',
    clearRecent: 'Hapus',
    introTitle: 'Pemilih Warna Online Gratis',
    introText: 'Pilih warna dari area gradien, sesuaikan rona dan dapatkan nilai dalam HEX, RGB, dan HSL.',
    faqTitle: 'Pertanyaan yang Sering Diajukan',
  },
  th: {
    title: 'ตัวเลือกสีออนไลน์',
    description: 'เลือกสีใดก็ได้ด้วยตา ดูตัวอย่างแบบเรียลไทม์ แปลงระหว่าง HEX, RGB และ HSL',
    hex: 'HEX', rgb: 'RGB', hsl: 'HSL',
    copy: 'คัดลอก', copied: 'คัดลอกแล้ว!',
    hue: 'เฉดสี', saturation: 'ความอิ่มตัว', lightness: 'ความสว่าง',
    red: 'R', green: 'G', blue: 'B',
    preview: 'ตัวอย่างสี',
    pickFromArea: 'คลิกหรือลากบนพื้นที่สีเพื่อเลือกสี',
    recentColors: 'สีล่าสุด',
    clearRecent: 'ล้าง',
    introTitle: 'ตัวเลือกสีออนไลน์ฟรี',
    introText: 'เลือกสีจากพื้นที่ไล่ระดับ ปรับเฉดสี และรับค่าใน HEX, RGB และ HSL',
    faqTitle: 'คำถามที่พบบ่อย',
  },
};

const faqData: Record<string, Array<{ q: string; a: string }>> = {
  en: [
    { q: 'What color formats does this picker support?', a: 'This color picker supports HEX (e.g., #FF5733), RGB (e.g., rgb(255, 87, 51)), and HSL (e.g., hsl(11, 100%, 60%)). All formats update in real-time as you pick a color.' },
    { q: 'How do I pick a specific color?', a: 'Click or drag on the large gradient area to select saturation and lightness. Use the hue slider below to change the base color. You can also type exact values into the HEX, RGB, or HSL input fields.' },
    { q: 'Can I copy the color value?', a: 'Yes. Each color format (HEX, RGB, HSL) has a Copy button next to it. Click it to copy the value to your clipboard for use in CSS, design tools, or any other application.' },
    { q: 'What is the difference between HEX, RGB, and HSL?', a: 'HEX uses a hexadecimal notation (#RRGGBB). RGB specifies red, green, and blue channel values (0-255). HSL uses hue (0-360), saturation (0-100%), and lightness (0-100%) which is more intuitive for adjusting colors.' },
    { q: 'Is the color picker free to use?', a: 'Yes, this color picker is completely free to use with no registration required. Pick colors, convert formats, and copy values as many times as you need.' },
  ],
  zh: [
    { q: '这个选色器支持哪些颜色格式？', a: '支持 HEX（如 #FF5733）、RGB（如 rgb(255, 87, 51)）和 HSL（如 hsl(11, 100%, 60%)）。选择颜色时所有格式实时更新。' },
    { q: '如何选择特定颜色？', a: '在大渐变区域点击或拖拽可选择饱和度和亮度。使用下方的色相滑块更改基本颜色。也可以在输入框中直接输入精确值。' },
    { q: '可以复制颜色值吗？', a: '可以。每种格式旁都有复制按钮，点击即可复制到剪贴板。' },
    { q: 'HEX、RGB 和 HSL 有什么区别？', a: 'HEX 使用十六进制表示。RGB 指定红绿蓝通道值（0-255）。HSL 使用色相、饱和度和亮度，更直观。' },
    { q: '这个工具免费吗？', a: '是的，完全免费使用，无需注册。' },
  ],
  ja: [
    { q: 'このカラーピッカーはどの色形式に対応していますか？', a: 'HEX（例：#FF5733）、RGB（例：rgb(255, 87, 51)）、HSL（例：hsl(11, 100%, 60%)）に対応しています。色を選択するとすべての形式がリアルタイムで更新されます。' },
    { q: '特定の色を選ぶにはどうすればいいですか？', a: 'グラデーションエリアをクリックまたはドラッグして彩度と明度を選択し、色相スライダーで基本色を変更します。入力欄に直接値を入力することもできます。' },
    { q: '色の値をコピーできますか？', a: 'はい、各形式の横にあるコピーボタンをクリックしてクリップボードにコピーできます。' },
    { q: 'HEX、RGB、HSLの違いは何ですか？', a: 'HEXは16進数表記、RGBは赤緑青のチャンネル値（0-255）、HSLは色相・彩度・明度で直感的です。' },
    { q: 'このツールは無料ですか？', a: 'はい、完全に無料で登録不要です。' },
  ],
  ko: [
    { q: '이 색상 선택기는 어떤 색상 형식을 지원합니까?', a: 'HEX(예: #FF5733), RGB(예: rgb(255, 87, 51)), HSL(예: hsl(11, 100%, 60%))을 지원합니다. 색상을 선택하면 모든 형식이 실시간으로 업데이트됩니다.' },
    { q: '특정 색상을 선택하려면 어떻게 하나요?', a: '그라데이션 영역을 클릭하거나 드래그하여 채도와 명도를 선택하고, 색조 슬라이더로 기본 색상을 변경합니다. 입력란에 직접 값을 입력할 수도 있습니다.' },
    { q: '색상 값을 복사할 수 있나요?', a: '네, 각 형식 옆의 복사 버튼을 클릭하면 클립보드에 복사됩니다.' },
    { q: 'HEX, RGB, HSL의 차이점은 무엇인가요?', a: 'HEX는 16진수 표기, RGB는 빨강/초록/파랑 채널 값(0-255), HSL은 색조/채도/명도로 직관적입니다.' },
    { q: '이 도구는 무료인가요?', a: '네, 완전히 무료이며 등록이 필요 없습니다.' },
  ],
  fr: [
    { q: 'Quels formats de couleur ce selecteur prend-il en charge ?', a: 'Ce selecteur prend en charge HEX (ex : #FF5733), RGB (ex : rgb(255, 87, 51)) et HSL (ex : hsl(11, 100%, 60%)). Tous les formats se mettent a jour en temps reel.' },
    { q: 'Comment choisir une couleur specifique ?', a: 'Cliquez ou glissez sur la zone de degrade pour la saturation et la luminosite. Utilisez le curseur de teinte pour changer la couleur de base.' },
    { q: 'Puis-je copier la valeur de la couleur ?', a: 'Oui, chaque format a un bouton Copier a cote.' },
    { q: 'Quelle est la difference entre HEX, RGB et HSL ?', a: 'HEX utilise la notation hexadecimale. RGB specifie les canaux rouge, vert et bleu (0-255). HSL utilise la teinte, la saturation et la luminosite.' },
    { q: 'Ce selecteur est-il gratuit ?', a: 'Oui, completement gratuit et sans inscription.' },
  ],
  de: [
    { q: 'Welche Farbformate unterstutzt dieser Farbwahler?', a: 'Dieser Farbwahler unterstutzt HEX (z.B. #FF5733), RGB (z.B. rgb(255, 87, 51)) und HSL (z.B. hsl(11, 100%, 60%)). Alle Formate werden in Echtzeit aktualisiert.' },
    { q: 'Wie wahle ich eine bestimmte Farbe aus?', a: 'Klicken oder ziehen Sie auf den Verlaufsbereich fur Sattigung und Helligkeit. Verwenden Sie den Farbton-Regler, um die Grundfarbe zu andern.' },
    { q: 'Kann ich den Farbwert kopieren?', a: 'Ja, jedes Format hat einen Kopieren-Button daneben.' },
    { q: 'Was ist der Unterschied zwischen HEX, RGB und HSL?', a: 'HEX verwendet Hexadezimalnotation. RGB gibt Rot-, Grun- und Blaukanal-Werte an (0-255). HSL verwendet Farbton, Sattigung und Helligkeit.' },
    { q: 'Ist der Farbwahler kostenlos?', a: 'Ja, komplett kostenlos und ohne Registrierung.' },
  ],
  es: [
    { q: 'Que formatos de color admite este selector?', a: 'Admite HEX (ej: #FF5733), RGB (ej: rgb(255, 87, 51)) y HSL (ej: hsl(11, 100%, 60%)). Todos los formatos se actualizan en tiempo real.' },
    { q: 'Como selecciono un color especifico?', a: 'Haga clic o arrastre en el area de degradado para la saturacion y luminosidad. Use el control deslizante de tono para cambiar el color base.' },
    { q: 'Puedo copiar el valor del color?', a: 'Si, cada formato tiene un boton de Copiar al lado.' },
    { q: 'Cual es la diferencia entre HEX, RGB y HSL?', a: 'HEX usa notacion hexadecimal. RGB especifica canales rojo, verde y azul (0-255). HSL usa tono, saturacion y luminosidad.' },
    { q: 'Es gratuito este selector?', a: 'Si, completamente gratuito y sin registro.' },
  ],
  pt: [
    { q: 'Quais formatos de cor este seletor suporta?', a: 'Suporta HEX (ex: #FF5733), RGB (ex: rgb(255, 87, 51)) e HSL (ex: hsl(11, 100%, 60%)). Todos os formatos atualizam em tempo real.' },
    { q: 'Como selecionar uma cor especifica?', a: 'Clique ou arraste na area de gradiente para saturacao e luminosidade. Use o controle deslizante de matiz para mudar a cor base.' },
    { q: 'Posso copiar o valor da cor?', a: 'Sim, cada formato tem um botao Copiar ao lado.' },
    { q: 'Qual a diferenca entre HEX, RGB e HSL?', a: 'HEX usa notacao hexadecimal. RGB especifica canais vermelho, verde e azul (0-255). HSL usa matiz, saturacao e luminosidade.' },
    { q: 'Este seletor e gratuito?', a: 'Sim, completamente gratuito e sem registro.' },
  ],
  it: [
    { q: 'Quali formati di colore supporta questo selettore?', a: 'Supporta HEX (es: #FF5733), RGB (es: rgb(255, 87, 51)) e HSL (es: hsl(11, 100%, 60%)). Tutti i formati si aggiornano in tempo reale.' },
    { q: 'Come seleziono un colore specifico?', a: 'Clicca o trascina nell\'area del gradiente per saturazione e luminosita. Usa il cursore della tonalita per cambiare il colore base.' },
    { q: 'Posso copiare il valore del colore?', a: 'Si, ogni formato ha un pulsante Copia accanto.' },
    { q: 'Qual e la differenza tra HEX, RGB e HSL?', a: 'HEX usa notazione esadecimale. RGB specifica i canali rosso, verde e blu (0-255). HSL usa tonalita, saturazione e luminosita.' },
    { q: 'Questo selettore e gratuito?', a: 'Si, completamente gratuito e senza registrazione.' },
  ],
  nl: [
    { q: 'Welke kleurformaten ondersteunt deze kleurkiezer?', a: 'Ondersteunt HEX (bijv. #FF5733), RGB (bijv. rgb(255, 87, 51)) en HSL (bijv. hsl(11, 100%, 60%)). Alle formaten worden in realtime bijgewerkt.' },
    { q: 'Hoe kies ik een specifieke kleur?', a: 'Klik of sleep op het verloopgebied voor verzadiging en helderheid. Gebruik de tintschuifregelaar om de basiskleur te wijzigen.' },
    { q: 'Kan ik de kleurwaarde kopieren?', a: 'Ja, elk formaat heeft een Kopieren-knop ernaast.' },
    { q: 'Wat is het verschil tussen HEX, RGB en HSL?', a: 'HEX gebruikt hexadecimale notatie. RGB specificeert rood-, groen- en blauwkanaalwaarden (0-255). HSL gebruikt tint, verzadiging en helderheid.' },
    { q: 'Is de kleurkiezer gratis?', a: 'Ja, volledig gratis en zonder registratie.' },
  ],
  pl: [
    { q: 'Jakie formaty kolorow obsluguje ten selektor?', a: 'Obsluguje HEX (np. #FF5733), RGB (np. rgb(255, 87, 51)) i HSL (np. hsl(11, 100%, 60%)). Wszystkie formaty aktualizuja sie w czasie rzeczywistym.' },
    { q: 'Jak wybrac konkretny kolor?', a: 'Kliknij lub przeciagnij w obszarze gradientu, aby wybrac nasycenie i jasnosc. Uzyj suwaka odcienia, aby zmienic kolor bazowy.' },
    { q: 'Czy moge skopiowac wartosc koloru?', a: 'Tak, kazdy format ma przycisk Kopiuj obok.' },
    { q: 'Jaka jest roznica miedzy HEX, RGB i HSL?', a: 'HEX uzywa notacji szesnastkowej. RGB okresla kanaly czerwony, zielony i niebieski (0-255). HSL uzywa odcienia, nasycenia i jasnosci.' },
    { q: 'Czy ten selektor jest darmowy?', a: 'Tak, calkowicie darmowy i bez rejestracji.' },
  ],
  sv: [
    { q: 'Vilka fargformat stodjer denna fargvaljare?', a: 'Stodjer HEX (t.ex. #FF5733), RGB (t.ex. rgb(255, 87, 51)) och HSL (t.ex. hsl(11, 100%, 60%)). Alla format uppdateras i realtid.' },
    { q: 'Hur valjer jag en specifik farg?', a: 'Klicka eller dra i gradientomradet for mattnad och ljushet. Anvand nyansreglaget for att andra grundfargen.' },
    { q: 'Kan jag kopiera fargvardet?', a: 'Ja, varje format har en Kopiera-knapp bredvid sig.' },
    { q: 'Vad ar skillnaden mellan HEX, RGB och HSL?', a: 'HEX anvander hexadecimal notation. RGB anger rod, gron och bla kanalvarden (0-255). HSL anvander nyans, mattnad och ljushet.' },
    { q: 'Ar fargvaljaren gratis?', a: 'Ja, helt gratis och utan registrering.' },
  ],
  no: [
    { q: 'Hvilke fargeformater stotter denne fargevelgeren?', a: 'Stotter HEX (f.eks. #FF5733), RGB (f.eks. rgb(255, 87, 51)) og HSL (f.eks. hsl(11, 100%, 60%)). Alle formater oppdateres i sanntid.' },
    { q: 'Hvordan velger jeg en bestemt farge?', a: 'Klikk eller dra i gradientomradet for metning og lyshet. Bruk fargetoneglideren for a endre grunnfargen.' },
    { q: 'Kan jeg kopiere fargeverdien?', a: 'Ja, hvert format har en Kopier-knapp ved siden av.' },
    { q: 'Hva er forskjellen mellom HEX, RGB og HSL?', a: 'HEX bruker heksadesimal notasjon. RGB angir rod, gronn og bla kanalverdier (0-255). HSL bruker fargetone, metning og lyshet.' },
    { q: 'Er fargevelgeren gratis?', a: 'Ja, helt gratis og uten registrering.' },
  ],
  id: [
    { q: 'Format warna apa saja yang didukung pemilih warna ini?', a: 'Mendukung HEX (mis: #FF5733), RGB (mis: rgb(255, 87, 51)), dan HSL (mis: hsl(11, 100%, 60%)). Semua format diperbarui secara real-time.' },
    { q: 'Bagaimana cara memilih warna tertentu?', a: 'Klik atau seret di area gradien untuk saturasi dan kecerahan. Gunakan penggeser rona untuk mengubah warna dasar.' },
    { q: 'Bisakah saya menyalin nilai warna?', a: 'Ya, setiap format memiliki tombol Salin di sampingnya.' },
    { q: 'Apa perbedaan antara HEX, RGB, dan HSL?', a: 'HEX menggunakan notasi heksadesimal. RGB menentukan saluran merah, hijau, dan biru (0-255). HSL menggunakan rona, saturasi, dan kecerahan.' },
    { q: 'Apakah pemilih warna ini gratis?', a: 'Ya, sepenuhnya gratis dan tanpa registrasi.' },
  ],
  th: [
    { q: 'ตัวเลือกสีนี้รองรับรูปแบบสีอะไรบ้าง?', a: 'รองรับ HEX (เช่น #FF5733), RGB (เช่น rgb(255, 87, 51)) และ HSL (เช่น hsl(11, 100%, 60%)) ทุกรูปแบบอัปเดตแบบเรียลไทม์' },
    { q: 'เลือกสีเฉพาะได้อย่างไร?', a: 'คลิกหรือลากบนพื้นที่ไล่ระดับเพื่อเลือกความอิ่มตัวและความสว่าง ใช้แถบเลื่อนเฉดสีเพื่อเปลี่ยนสีพื้นฐาน' },
    { q: 'สามารถคัดลอกค่าสีได้ไหม?', a: 'ได้ แต่ละรูปแบบมีปุ่มคัดลอกอยู่ข้างๆ' },
    { q: 'HEX, RGB และ HSL ต่างกันอย่างไร?', a: 'HEX ใช้สัญกรณ์ฐานสิบหก RGB ระบุค่าช่องแดง เขียว น้ำเงิน (0-255) HSL ใช้เฉดสี ความอิ่มตัว และความสว่าง' },
    { q: 'ตัวเลือกสีนี้ฟรีหรือไม่?', a: 'ใช่ ฟรีทั้งหมดและไม่ต้องลงทะเบียน' },
  ],
};

function hslToRgb(h: number, s: number, l: number): [number, number, number] {
  s /= 100; l /= 100;
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;
  let r = 0, g = 0, b = 0;
  if (h < 60) { r = c; g = x; }
  else if (h < 120) { r = x; g = c; }
  else if (h < 180) { g = c; b = x; }
  else if (h < 240) { g = x; b = c; }
  else if (h < 300) { r = x; b = c; }
  else { r = c; b = x; }
  return [Math.round((r + m) * 255), Math.round((g + m) * 255), Math.round((b + m) * 255)];
}

function rgbToHsl(r: number, g: number, b: number): [number, number, number] {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  const l = (max + min) / 2;
  if (max === min) return [0, 0, Math.round(l * 100)];
  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  let h = 0;
  if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
  else if (max === g) h = ((b - r) / d + 2) / 6;
  else h = ((r - g) / d + 4) / 6;
  return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
}

function rgbToHex(r: number, g: number, b: number): string {
  return '#' + [r, g, b].map(x => x.toString(16).padStart(2, '0')).join('').toUpperCase();
}

function hexToRgb(hex: string): [number, number, number] | null {
  const m = hex.replace('#', '').match(/^([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);
  if (!m) return null;
  return [parseInt(m[1], 16), parseInt(m[2], 16), parseInt(m[3], 16)];
}

export default function ColorPickerPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = use(params);
  const t = strings[lang] || strings.en;
  const faqs = faqData[lang] || faqData.en;

  const [hue, setHue] = useState(0);
  const [saturation, setSaturation] = useState(100);
  const [lightness, setLightness] = useState(50);
  const [recentColors, setRecentColors] = useState<string[]>([]);
  const [copiedField, setCopiedField] = useState('');
  const [hexInput, setHexInput] = useState('#FF0000');

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isDragging = useRef(false);

  const [r, g, b] = hslToRgb(hue, saturation, lightness);
  const hexValue = rgbToHex(r, g, b);
  const rgbValue = `rgb(${r}, ${g}, ${b})`;
  const hslValue = `hsl(${hue}, ${saturation}%, ${lightness}%)`;

  const drawCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const w = canvas.width;
    const h = canvas.height;

    // Draw saturation-lightness gradient
    for (let x = 0; x < w; x++) {
      for (let y = 0; y < h; y++) {
        const s = (x / w) * 100;
        const l = 100 - (y / h) * 100;
        const [cr, cg, cb] = hslToRgb(hue, s, l);
        ctx.fillStyle = `rgb(${cr},${cg},${cb})`;
        ctx.fillRect(x, y, 1, 1);
      }
    }

    // Draw crosshair
    const cx = (saturation / 100) * w;
    const cy = ((100 - lightness) / 100) * h;
    ctx.strokeStyle = lightness > 50 ? '#000' : '#fff';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(cx, cy, 8, 0, Math.PI * 2);
    ctx.stroke();
  }, [hue, saturation, lightness]);

  useEffect(() => {
    drawCanvas();
  }, [drawCanvas]);

  const pickFromCanvas = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    const y = Math.max(0, Math.min(e.clientY - rect.top, rect.height));
    const s = Math.round((x / rect.width) * 100);
    const l = Math.round(100 - (y / rect.height) * 100);
    setSaturation(s);
    setLightness(l);
    const [nr, ng, nb] = hslToRgb(hue, s, l);
    setHexInput(rgbToHex(nr, ng, nb));
  }, [hue]);

  const handleMouseDown = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    isDragging.current = true;
    pickFromCanvas(e);
  }, [pickFromCanvas]);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    if (isDragging.current) pickFromCanvas(e);
  }, [pickFromCanvas]);

  const handleMouseUp = useCallback(() => {
    if (isDragging.current) {
      isDragging.current = false;
      const hex = rgbToHex(...hslToRgb(hue, saturation, lightness));
      setRecentColors(prev => {
        const filtered = prev.filter(c => c !== hex);
        return [hex, ...filtered].slice(0, 12);
      });
    }
  }, [hue, saturation, lightness]);

  const handleHexChange = useCallback((val: string) => {
    setHexInput(val);
    const rgb = hexToRgb(val);
    if (rgb) {
      const [h2, s2, l2] = rgbToHsl(...rgb);
      setHue(h2);
      setSaturation(s2);
      setLightness(l2);
    }
  }, []);

  const copyToClipboard = useCallback((text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(''), 1500);
  }, []);

  const btnStyle: React.CSSProperties = {
    padding: '6px 14px', borderRadius: 6, border: '1px solid var(--border-color)',
    background: 'var(--bg-card)', cursor: 'pointer', fontSize: 13, color: 'inherit',
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

        {/* Color area + controls */}
        <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', marginBottom: 24 }}>
          {/* Canvas gradient area */}
          <div style={{ flex: '1 1 360px' }}>
            <canvas
              ref={canvasRef}
              width={360}
              height={260}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              style={{ width: '100%', height: 260, borderRadius: 10, cursor: 'crosshair', border: '1px solid var(--border-color)' }}
            />
            <p style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 6 }}>{t.pickFromArea}</p>

            {/* Hue slider */}
            <div style={{ marginTop: 12 }}>
              <label style={{ fontSize: 13, fontWeight: 600 }}>{t.hue}: {hue}</label>
              <input
                type="range" min={0} max={359} value={hue}
                onChange={e => { setHue(Number(e.target.value)); const [nr, ng, nb] = hslToRgb(Number(e.target.value), saturation, lightness); setHexInput(rgbToHex(nr, ng, nb)); }}
                style={{ width: '100%', marginTop: 4, background: 'linear-gradient(to right, #f00 0%, #ff0 17%, #0f0 33%, #0ff 50%, #00f 67%, #f0f 83%, #f00 100%)', height: 12, borderRadius: 6, appearance: 'auto' as never }}
              />
            </div>
          </div>

          {/* Right panel: preview + values */}
          <div style={{ flex: '1 1 240px', display: 'flex', flexDirection: 'column', gap: 16 }}>
            {/* Color preview */}
            <div style={{ background: hexValue, width: '100%', height: 100, borderRadius: 10, border: '1px solid var(--border-color)' }} />

            {/* HEX input */}
            <div>
              <label style={{ fontSize: 13, fontWeight: 600 }}>{t.hex}</label>
              <div style={{ display: 'flex', gap: 6, marginTop: 4 }}>
                <input value={hexInput} onChange={e => handleHexChange(e.target.value)}
                  style={{ flex: 1, padding: '8px 12px', borderRadius: 6, border: '1px solid var(--border-color)', background: 'var(--bg-card)', color: 'inherit', fontFamily: 'monospace' }} />
                <button onClick={() => copyToClipboard(hexValue, 'hex')} style={btnStyle}>
                  {copiedField === 'hex' ? t.copied : t.copy}
                </button>
              </div>
            </div>

            {/* RGB */}
            <div>
              <label style={{ fontSize: 13, fontWeight: 600 }}>{t.rgb}</label>
              <div style={{ display: 'flex', gap: 6, marginTop: 4 }}>
                <input readOnly value={rgbValue}
                  style={{ flex: 1, padding: '8px 12px', borderRadius: 6, border: '1px solid var(--border-color)', background: 'var(--bg-card)', color: 'inherit', fontFamily: 'monospace' }} />
                <button onClick={() => copyToClipboard(rgbValue, 'rgb')} style={btnStyle}>
                  {copiedField === 'rgb' ? t.copied : t.copy}
                </button>
              </div>
            </div>

            {/* HSL */}
            <div>
              <label style={{ fontSize: 13, fontWeight: 600 }}>{t.hsl}</label>
              <div style={{ display: 'flex', gap: 6, marginTop: 4 }}>
                <input readOnly value={hslValue}
                  style={{ flex: 1, padding: '8px 12px', borderRadius: 6, border: '1px solid var(--border-color)', background: 'var(--bg-card)', color: 'inherit', fontFamily: 'monospace' }} />
                <button onClick={() => copyToClipboard(hslValue, 'hsl')} style={btnStyle}>
                  {copiedField === 'hsl' ? t.copied : t.copy}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Recent colors */}
        {recentColors.length > 0 && (
          <div style={{ marginBottom: 24, padding: 16, background: 'var(--bg-card)', borderRadius: 10, border: '1px solid var(--border-color)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
              <span style={{ fontSize: 14, fontWeight: 600 }}>{t.recentColors}</span>
              <button onClick={() => setRecentColors([])} style={{ ...btnStyle, fontSize: 12 }}>{t.clearRecent}</button>
            </div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {recentColors.map((c, i) => (
                <button key={i} onClick={() => handleHexChange(c)}
                  style={{ width: 36, height: 36, borderRadius: 8, background: c, border: '2px solid var(--border-color)', cursor: 'pointer' }}
                  title={c} />
              ))}
            </div>
          </div>
        )}

        {/* Intro section */}
        <div style={{ marginBottom: 24 }}>
          <h2 style={{ fontSize: 22, fontWeight: 600, marginBottom: 8 }}>{t.introTitle}</h2>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>{t.introText}</p>
        </div>

        {/* FAQ section */}
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
