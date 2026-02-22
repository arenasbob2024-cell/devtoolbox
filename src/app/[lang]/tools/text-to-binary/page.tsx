'use client';

import { use, useState, useCallback } from 'react';

const strings: Record<string, Record<string, string>> = {
  en: {
    title: 'Text to Binary Converter',
    description: 'Convert text to binary and binary to text. Supports ASCII encoding with space-separated binary output.',
    textLabel: 'Text',
    binaryLabel: 'Binary',
    textPlaceholder: 'Enter text here...',
    binaryPlaceholder: 'Enter binary here (e.g., 01001000 01101001)...',
    textToBinary: 'Text to Binary',
    binaryToText: 'Binary to Text',
    copy: 'Copy', copied: 'Copied!',
    clear: 'Clear',
    swap: 'Swap',
    charCount: 'Characters',
    byteCount: 'Bytes',
    error: 'Invalid binary input. Use only 0 and 1, separated by spaces.',
    introTitle: 'Free Text to Binary Converter',
    introText: 'Convert any text to its binary representation using ASCII encoding, or decode binary back to readable text. Each character is represented as an 8-bit binary number separated by spaces for easy reading.',
    faqTitle: 'Frequently Asked Questions',
  },
  zh: {
    title: '文本转二进制转换器',
    description: '文本转二进制和二进制转文本。支持 ASCII 编码，输出以空格分隔的二进制。',
    textLabel: '文本',
    binaryLabel: '二进制',
    textPlaceholder: '在此输入文本...',
    binaryPlaceholder: '在此输入二进制（如 01001000 01101001）...',
    textToBinary: '文本转二进制',
    binaryToText: '二进制转文本',
    copy: '复制', copied: '已复制！',
    clear: '清除',
    swap: '交换',
    charCount: '字符数',
    byteCount: '字节数',
    error: '无效的二进制输入。仅使用 0 和 1，以空格分隔。',
    introTitle: '免费文本转二进制转换器',
    introText: '使用 ASCII 编码将任何文本转换为二进制表示，或将二进制解码回可读文本。每个字符表示为一个以空格分隔的8位二进制数。',
    faqTitle: '常见问题',
  },
  ja: {
    title: 'テキストからバイナリ変換器',
    description: 'テキストをバイナリに、バイナリをテキストに変換。ASCIIエンコーディングをサポート。',
    textLabel: 'テキスト',
    binaryLabel: 'バイナリ',
    textPlaceholder: 'ここにテキストを入力...',
    binaryPlaceholder: 'ここにバイナリを入力（例：01001000 01101001）...',
    textToBinary: 'テキストからバイナリ',
    binaryToText: 'バイナリからテキスト',
    copy: 'コピー', copied: 'コピー済み！',
    clear: 'クリア',
    swap: '入れ替え',
    charCount: '文字数',
    byteCount: 'バイト数',
    error: '無効なバイナリ入力。0と1のみ使用し、スペースで区切ってください。',
    introTitle: '無料テキストからバイナリ変換器',
    introText: 'ASCIIエンコーディングを使用してテキストをバイナリ表現に変換、またはバイナリを読み取り可能なテキストにデコードします。',
    faqTitle: 'よくある質問',
  },
  ko: {
    title: '텍스트-바이너리 변환기',
    description: '텍스트를 바이너리로, 바이너리를 텍스트로 변환. ASCII 인코딩 지원.',
    textLabel: '텍스트',
    binaryLabel: '바이너리',
    textPlaceholder: '여기에 텍스트를 입력하세요...',
    binaryPlaceholder: '여기에 바이너리를 입력하세요 (예: 01001000 01101001)...',
    textToBinary: '텍스트에서 바이너리로',
    binaryToText: '바이너리에서 텍스트로',
    copy: '복사', copied: '복사됨!',
    clear: '지우기',
    swap: '교환',
    charCount: '문자 수',
    byteCount: '바이트 수',
    error: '유효하지 않은 바이너리 입력. 0과 1만 사용하고 공백으로 구분하세요.',
    introTitle: '무료 텍스트-바이너리 변환기',
    introText: 'ASCII 인코딩을 사용하여 텍스트를 바이너리로 변환하거나 바이너리를 읽을 수 있는 텍스트로 디코딩합니다.',
    faqTitle: '자주 묻는 질문',
  },
  fr: {
    title: 'Convertisseur Texte en Binaire',
    description: 'Convertissez texte en binaire et binaire en texte. Supporte l\'encodage ASCII.',
    textLabel: 'Texte',
    binaryLabel: 'Binaire',
    textPlaceholder: 'Entrez le texte ici...',
    binaryPlaceholder: 'Entrez le binaire ici (ex: 01001000 01101001)...',
    textToBinary: 'Texte vers binaire',
    binaryToText: 'Binaire vers texte',
    copy: 'Copier', copied: 'Copie !',
    clear: 'Effacer',
    swap: 'Echanger',
    charCount: 'Caracteres',
    byteCount: 'Octets',
    error: 'Entree binaire invalide. Utilisez uniquement 0 et 1, separes par des espaces.',
    introTitle: 'Convertisseur texte en binaire gratuit',
    introText: 'Convertissez du texte en representation binaire avec encodage ASCII, ou decodez du binaire en texte lisible.',
    faqTitle: 'Questions frequentes',
  },
  de: {
    title: 'Text zu Binar Konverter',
    description: 'Text in Binar und Binar in Text umwandeln. Unterstutzt ASCII-Kodierung.',
    textLabel: 'Text',
    binaryLabel: 'Binar',
    textPlaceholder: 'Text hier eingeben...',
    binaryPlaceholder: 'Binar hier eingeben (z.B. 01001000 01101001)...',
    textToBinary: 'Text zu Binar',
    binaryToText: 'Binar zu Text',
    copy: 'Kopieren', copied: 'Kopiert!',
    clear: 'Loschen',
    swap: 'Tauschen',
    charCount: 'Zeichen',
    byteCount: 'Bytes',
    error: 'Ungultige Binareingabe. Verwenden Sie nur 0 und 1, durch Leerzeichen getrennt.',
    introTitle: 'Kostenloser Text-zu-Binar-Konverter',
    introText: 'Konvertieren Sie Text in seine binare Darstellung mit ASCII-Kodierung oder dekodieren Sie Binar zuruck in lesbaren Text.',
    faqTitle: 'Haufig gestellte Fragen',
  },
  es: {
    title: 'Convertidor Texto a Binario',
    description: 'Convierta texto a binario y binario a texto. Soporta codificacion ASCII.',
    textLabel: 'Texto',
    binaryLabel: 'Binario',
    textPlaceholder: 'Ingrese texto aqui...',
    binaryPlaceholder: 'Ingrese binario aqui (ej: 01001000 01101001)...',
    textToBinary: 'Texto a binario',
    binaryToText: 'Binario a texto',
    copy: 'Copiar', copied: 'Copiado!',
    clear: 'Limpiar',
    swap: 'Intercambiar',
    charCount: 'Caracteres',
    byteCount: 'Bytes',
    error: 'Entrada binaria invalida. Use solo 0 y 1, separados por espacios.',
    introTitle: 'Convertidor texto a binario gratuito',
    introText: 'Convierta texto a su representacion binaria usando codificacion ASCII, o decodifique binario a texto legible.',
    faqTitle: 'Preguntas frecuentes',
  },
  pt: {
    title: 'Conversor Texto para Binario',
    description: 'Converta texto para binario e binario para texto. Suporta codificacao ASCII.',
    textLabel: 'Texto',
    binaryLabel: 'Binario',
    textPlaceholder: 'Digite texto aqui...',
    binaryPlaceholder: 'Digite binario aqui (ex: 01001000 01101001)...',
    textToBinary: 'Texto para binario',
    binaryToText: 'Binario para texto',
    copy: 'Copiar', copied: 'Copiado!',
    clear: 'Limpar',
    swap: 'Trocar',
    charCount: 'Caracteres',
    byteCount: 'Bytes',
    error: 'Entrada binaria invalida. Use apenas 0 e 1, separados por espacos.',
    introTitle: 'Conversor texto para binario gratuito',
    introText: 'Converta texto para representacao binaria usando codificacao ASCII, ou decodifique binario para texto legivel.',
    faqTitle: 'Perguntas frequentes',
  },
  it: {
    title: 'Convertitore Testo in Binario',
    description: 'Converti testo in binario e binario in testo. Supporta codifica ASCII.',
    textLabel: 'Testo',
    binaryLabel: 'Binario',
    textPlaceholder: 'Inserisci il testo qui...',
    binaryPlaceholder: 'Inserisci il binario qui (es: 01001000 01101001)...',
    textToBinary: 'Testo in binario',
    binaryToText: 'Binario in testo',
    copy: 'Copia', copied: 'Copiato!',
    clear: 'Cancella',
    swap: 'Scambia',
    charCount: 'Caratteri',
    byteCount: 'Byte',
    error: 'Input binario non valido. Usa solo 0 e 1, separati da spazi.',
    introTitle: 'Convertitore testo in binario gratuito',
    introText: 'Converti testo nella sua rappresentazione binaria usando la codifica ASCII, o decodifica il binario in testo leggibile.',
    faqTitle: 'Domande frequenti',
  },
  nl: {
    title: 'Tekst naar Binair Converter',
    description: 'Converteer tekst naar binair en binair naar tekst. Ondersteunt ASCII-codering.',
    textLabel: 'Tekst',
    binaryLabel: 'Binair',
    textPlaceholder: 'Voer hier tekst in...',
    binaryPlaceholder: 'Voer hier binair in (bijv. 01001000 01101001)...',
    textToBinary: 'Tekst naar binair',
    binaryToText: 'Binair naar tekst',
    copy: 'Kopieren', copied: 'Gekopieerd!',
    clear: 'Wissen',
    swap: 'Wisselen',
    charCount: 'Tekens',
    byteCount: 'Bytes',
    error: 'Ongeldige binaire invoer. Gebruik alleen 0 en 1, gescheiden door spaties.',
    introTitle: 'Gratis tekst naar binair converter',
    introText: 'Converteer tekst naar binaire weergave met ASCII-codering, of decodeer binair terug naar leesbare tekst.',
    faqTitle: 'Veelgestelde vragen',
  },
  pl: {
    title: 'Konwerter Tekstu na Binarny',
    description: 'Konwertuj tekst na binarny i binarny na tekst. Obsluguje kodowanie ASCII.',
    textLabel: 'Tekst',
    binaryLabel: 'Binarny',
    textPlaceholder: 'Wpisz tekst tutaj...',
    binaryPlaceholder: 'Wpisz binarny tutaj (np. 01001000 01101001)...',
    textToBinary: 'Tekst na binarny',
    binaryToText: 'Binarny na tekst',
    copy: 'Kopiuj', copied: 'Skopiowano!',
    clear: 'Wyczysc',
    swap: 'Zamien',
    charCount: 'Znaki',
    byteCount: 'Bajty',
    error: 'Nieprawidlowe dane binarne. Uzywaj tylko 0 i 1, oddzielonych spacjami.',
    introTitle: 'Darmowy konwerter tekstu na binarny',
    introText: 'Konwertuj tekst na reprezentacje binarna za pomoca kodowania ASCII lub dekoduj dane binarne z powrotem na czytelny tekst.',
    faqTitle: 'Czesto zadawane pytania',
  },
  sv: {
    title: 'Text till Binar Konverterare',
    description: 'Konvertera text till binart och binart till text. Stodjer ASCII-kodning.',
    textLabel: 'Text',
    binaryLabel: 'Binar',
    textPlaceholder: 'Ange text har...',
    binaryPlaceholder: 'Ange binart har (t.ex. 01001000 01101001)...',
    textToBinary: 'Text till binar',
    binaryToText: 'Binar till text',
    copy: 'Kopiera', copied: 'Kopierad!',
    clear: 'Rensa',
    swap: 'Byt',
    charCount: 'Tecken',
    byteCount: 'Bytes',
    error: 'Ogiltig binar indata. Anvand endast 0 och 1, atskilda med mellanslag.',
    introTitle: 'Gratis text till binar konverterare',
    introText: 'Konvertera text till binar representation med ASCII-kodning, eller avkoda binart tillbaka till lasbar text.',
    faqTitle: 'Vanliga fragor',
  },
  no: {
    title: 'Tekst til Binaer Konverterer',
    description: 'Konverter tekst til binaert og binaert til tekst. Stotter ASCII-koding.',
    textLabel: 'Tekst',
    binaryLabel: 'Binaer',
    textPlaceholder: 'Skriv inn tekst her...',
    binaryPlaceholder: 'Skriv inn binaert her (f.eks. 01001000 01101001)...',
    textToBinary: 'Tekst til binaer',
    binaryToText: 'Binaer til tekst',
    copy: 'Kopier', copied: 'Kopiert!',
    clear: 'Tøm',
    swap: 'Bytt',
    charCount: 'Tegn',
    byteCount: 'Bytes',
    error: 'Ugyldig binaer inndata. Bruk kun 0 og 1, atskilt med mellomrom.',
    introTitle: 'Gratis tekst til binaer konverterer',
    introText: 'Konverter tekst til binaer representasjon med ASCII-koding, eller dekod binaert tilbake til lesbar tekst.',
    faqTitle: 'Ofte stilte sporsmal',
  },
  id: {
    title: 'Konverter Teks ke Biner',
    description: 'Konversi teks ke biner dan biner ke teks. Mendukung encoding ASCII.',
    textLabel: 'Teks',
    binaryLabel: 'Biner',
    textPlaceholder: 'Masukkan teks di sini...',
    binaryPlaceholder: 'Masukkan biner di sini (mis: 01001000 01101001)...',
    textToBinary: 'Teks ke biner',
    binaryToText: 'Biner ke teks',
    copy: 'Salin', copied: 'Disalin!',
    clear: 'Hapus',
    swap: 'Tukar',
    charCount: 'Karakter',
    byteCount: 'Byte',
    error: 'Input biner tidak valid. Gunakan hanya 0 dan 1, dipisahkan oleh spasi.',
    introTitle: 'Konverter teks ke biner gratis',
    introText: 'Konversi teks ke representasi biner menggunakan encoding ASCII, atau dekode biner kembali ke teks yang dapat dibaca.',
    faqTitle: 'Pertanyaan yang Sering Diajukan',
  },
  th: {
    title: 'ตัวแปลงข้อความเป็นไบนารี',
    description: 'แปลงข้อความเป็นไบนารีและไบนารีเป็นข้อความ รองรับการเข้ารหัส ASCII',
    textLabel: 'ข้อความ',
    binaryLabel: 'ไบนารี',
    textPlaceholder: 'ใส่ข้อความที่นี่...',
    binaryPlaceholder: 'ใส่ไบนารีที่นี่ (เช่น 01001000 01101001)...',
    textToBinary: 'ข้อความเป็นไบนารี',
    binaryToText: 'ไบนารีเป็นข้อความ',
    copy: 'คัดลอก', copied: 'คัดลอกแล้ว!',
    clear: 'ล้าง',
    swap: 'สลับ',
    charCount: 'ตัวอักษร',
    byteCount: 'ไบต์',
    error: 'อินพุตไบนารีไม่ถูกต้อง ใช้เฉพาะ 0 และ 1 คั่นด้วยช่องว่าง',
    introTitle: 'ตัวแปลงข้อความเป็นไบนารีฟรี',
    introText: 'แปลงข้อความเป็นรูปแบบไบนารีโดยใช้การเข้ารหัส ASCII หรือถอดรหัสไบนารีกลับเป็นข้อความที่อ่านได้',
    faqTitle: 'คำถามที่พบบ่อย',
  },
};

const faqData: Record<string, Array<{ q: string; a: string }>> = {
  en: [
    { q: 'How does text to binary conversion work?', a: 'Each character in the text is converted to its ASCII code (a number from 0 to 127), then that number is represented in binary (base-2). For example, the letter "A" has ASCII code 65, which is 01000001 in binary. Each character becomes an 8-bit binary number.' },
    { q: 'What encoding does this tool use?', a: 'This tool uses ASCII encoding, which represents 128 characters including English letters, digits, and common symbols. Each character is encoded as an 8-bit (1 byte) binary value.' },
    { q: 'Why are there spaces between binary bytes?', a: 'Spaces separate each 8-bit binary byte for readability. Without spaces, the binary string would be a continuous stream of 0s and 1s that is difficult to parse visually. Each space-separated group represents one character.' },
    { q: 'Can I convert binary back to text?', a: 'Yes. Paste or type space-separated binary bytes (groups of 8 digits using only 0 and 1) and click "Binary to Text" to decode them back to readable text.' },
    { q: 'Is this tool free and private?', a: 'Yes, this tool is completely free. All conversion happens in your browser using JavaScript. No data is sent to any server, so your text remains private.' },
  ],
  zh: [
    { q: '文本转二进制是如何工作的？', a: '文本中的每个字符被转换为其 ASCII 码（0-127），然后该数字以二进制表示。例如字母 "A" 的 ASCII 码是 65，二进制是 01000001。' },
    { q: '此工具使用什么编码？', a: '使用 ASCII 编码，表示 128 个字符，包括英文字母、数字和常见符号。每个字符编码为 8 位二进制值。' },
    { q: '为什么二进制字节之间有空格？', a: '空格分隔每个 8 位二进制字节以提高可读性。每个空格分隔的组代表一个字符。' },
    { q: '可以将二进制转换回文本吗？', a: '可以。粘贴以空格分隔的二进制字节，点击"二进制转文本"即可解码。' },
    { q: '此工具免费且保护隐私吗？', a: '是的，完全免费。所有转换在浏览器中进行，不向服务器发送数据。' },
  ],
  ja: [
    { q: 'テキストからバイナリへの変換はどのように機能しますか？', a: 'テキストの各文字がASCIIコード（0-127の数値）に変換され、その数値が2進数で表されます。例えば "A" はASCIIコード65で、バイナリでは01000001です。' },
    { q: 'このツールはどのエンコーディングを使用しますか？', a: 'ASCIIエンコーディングを使用し、英字、数字、一般的な記号を含む128文字を表します。各文字は8ビットのバイナリ値としてエンコードされます。' },
    { q: 'なぜバイナリバイト間にスペースがあるのですか？', a: '読みやすさのために各8ビットバイナリバイトをスペースで区切ります。各スペース区切りのグループが1文字を表します。' },
    { q: 'バイナリをテキストに変換できますか？', a: 'はい。スペースで区切られたバイナリバイトを貼り付けて「バイナリからテキスト」をクリックしてください。' },
    { q: 'このツールは無料でプライベートですか？', a: 'はい、完全に無料です。全ての変換はブラウザで行われ、サーバーにデータは送信されません。' },
  ],
  ko: [
    { q: '텍스트에서 바이너리로의 변환은 어떻게 작동하나요?', a: '텍스트의 각 문자가 ASCII 코드(0-127 숫자)로 변환된 다음 2진수로 표현됩니다. 예를 들어 "A"는 ASCII 코드 65이며 바이너리로 01000001입니다.' },
    { q: '이 도구는 어떤 인코딩을 사용하나요?', a: 'ASCII 인코딩을 사용하여 영문자, 숫자, 일반 기호를 포함한 128개 문자를 나타냅니다.' },
    { q: '바이너리 바이트 사이에 왜 공백이 있나요?', a: '가독성을 위해 각 8비트 바이너리 바이트를 공백으로 구분합니다. 각 공백으로 구분된 그룹이 하나의 문자를 나타냅니다.' },
    { q: '바이너리를 텍스트로 다시 변환할 수 있나요?', a: '네. 공백으로 구분된 바이너리 바이트를 붙여넣고 "바이너리에서 텍스트로"를 클릭하세요.' },
    { q: '이 도구는 무료이고 프라이버시가 보장되나요?', a: '네, 완전히 무료입니다. 모든 변환은 브라우저에서 이루어지며 서버로 데이터가 전송되지 않습니다.' },
  ],
  fr: [
    { q: 'Comment fonctionne la conversion texte en binaire ?', a: 'Chaque caractere est converti en son code ASCII (0-127) puis ce nombre est represente en binaire. Par exemple "A" a le code ASCII 65, soit 01000001 en binaire.' },
    { q: 'Quel encodage cet outil utilise-t-il ?', a: 'L\'encodage ASCII, representant 128 caracteres incluant lettres, chiffres et symboles courants. Chaque caractere fait 8 bits.' },
    { q: 'Pourquoi des espaces entre les octets binaires ?', a: 'Les espaces separent chaque octet de 8 bits pour la lisibilite. Chaque groupe separe represente un caractere.' },
    { q: 'Puis-je convertir du binaire en texte ?', a: 'Oui. Collez des octets binaires separes par des espaces et cliquez sur "Binaire vers texte".' },
    { q: 'Cet outil est-il gratuit et prive ?', a: 'Oui, completement gratuit. Tout se passe dans votre navigateur, aucune donnee n\'est envoyee.' },
  ],
  de: [
    { q: 'Wie funktioniert die Text-zu-Binar-Konvertierung?', a: 'Jedes Zeichen wird in seinen ASCII-Code (0-127) umgewandelt und dann binar dargestellt. Zum Beispiel hat "A" den ASCII-Code 65, binar 01000001.' },
    { q: 'Welche Kodierung verwendet dieses Tool?', a: 'ASCII-Kodierung mit 128 Zeichen einschliesslich Buchstaben, Ziffern und gangigen Symbolen. Jedes Zeichen ist 8 Bit.' },
    { q: 'Warum Leerzeichen zwischen den Binar-Bytes?', a: 'Leerzeichen trennen jedes 8-Bit-Byte fur die Lesbarkeit. Jede Gruppe steht fur ein Zeichen.' },
    { q: 'Kann ich Binar in Text umwandeln?', a: 'Ja. Fugen Sie durch Leerzeichen getrennte Binar-Bytes ein und klicken Sie auf "Binar zu Text".' },
    { q: 'Ist dieses Tool kostenlos und privat?', a: 'Ja, komplett kostenlos. Alles lauft in Ihrem Browser, keine Daten werden gesendet.' },
  ],
  es: [
    { q: 'Como funciona la conversion de texto a binario?', a: 'Cada caracter se convierte a su codigo ASCII (0-127) y luego se representa en binario. Por ejemplo "A" tiene codigo ASCII 65, que es 01000001 en binario.' },
    { q: 'Que codificacion usa esta herramienta?', a: 'Codificacion ASCII con 128 caracteres incluyendo letras, digitos y simbolos comunes. Cada caracter es de 8 bits.' },
    { q: 'Por que hay espacios entre los bytes binarios?', a: 'Los espacios separan cada byte de 8 bits para legibilidad. Cada grupo separado representa un caracter.' },
    { q: 'Puedo convertir binario a texto?', a: 'Si. Pegue bytes binarios separados por espacios y haga clic en "Binario a texto".' },
    { q: 'Esta herramienta es gratuita y privada?', a: 'Si, completamente gratuita. Todo se procesa en su navegador sin enviar datos.' },
  ],
  pt: [
    { q: 'Como funciona a conversao de texto para binario?', a: 'Cada caractere e convertido em seu codigo ASCII (0-127) e entao representado em binario. Por exemplo "A" tem codigo ASCII 65, que e 01000001 em binario.' },
    { q: 'Que codificacao esta ferramenta usa?', a: 'Codificacao ASCII com 128 caracteres incluindo letras, digitos e simbolos comuns. Cada caractere e de 8 bits.' },
    { q: 'Por que ha espacos entre os bytes binarios?', a: 'Espacos separam cada byte de 8 bits para legibilidade. Cada grupo separado representa um caractere.' },
    { q: 'Posso converter binario para texto?', a: 'Sim. Cole bytes binarios separados por espacos e clique em "Binario para texto".' },
    { q: 'Esta ferramenta e gratuita e privada?', a: 'Sim, completamente gratuita. Tudo e processado no navegador sem enviar dados.' },
  ],
  it: [
    { q: 'Come funziona la conversione testo-binario?', a: 'Ogni carattere viene convertito nel suo codice ASCII (0-127) e poi rappresentato in binario. Ad esempio "A" ha codice ASCII 65, che e 01000001 in binario.' },
    { q: 'Quale codifica usa questo strumento?', a: 'Codifica ASCII con 128 caratteri incluse lettere, cifre e simboli comuni. Ogni carattere e di 8 bit.' },
    { q: 'Perche ci sono spazi tra i byte binari?', a: 'Gli spazi separano ogni byte di 8 bit per la leggibilita. Ogni gruppo separato rappresenta un carattere.' },
    { q: 'Posso convertire il binario in testo?', a: 'Si. Incolla byte binari separati da spazi e clicca "Binario in testo".' },
    { q: 'Questo strumento e gratuito e privato?', a: 'Si, completamente gratuito. Tutto viene elaborato nel browser senza inviare dati.' },
  ],
  nl: [
    { q: 'Hoe werkt tekst-naar-binair conversie?', a: 'Elk teken wordt omgezet naar zijn ASCII-code (0-127) en dan binair weergegeven. Bijvoorbeeld "A" heeft ASCII-code 65, binair 01000001.' },
    { q: 'Welke codering gebruikt dit hulpmiddel?', a: 'ASCII-codering met 128 tekens inclusief letters, cijfers en veelgebruikte symbolen. Elk teken is 8 bits.' },
    { q: 'Waarom spaties tussen de binaire bytes?', a: 'Spaties scheiden elke 8-bit byte voor leesbaarheid. Elke gescheiden groep vertegenwoordigt een teken.' },
    { q: 'Kan ik binair naar tekst converteren?', a: 'Ja. Plak door spaties gescheiden binaire bytes en klik op "Binair naar tekst".' },
    { q: 'Is dit hulpmiddel gratis en prive?', a: 'Ja, volledig gratis. Alles wordt in uw browser verwerkt zonder gegevens te verzenden.' },
  ],
  pl: [
    { q: 'Jak dziala konwersja tekstu na binarny?', a: 'Kazdy znak jest konwertowany na swoj kod ASCII (0-127), a nastepnie reprezentowany binarnie. Na przyklad "A" ma kod ASCII 65, binarnie 01000001.' },
    { q: 'Jakie kodowanie uzywa to narzedzie?', a: 'Kodowanie ASCII z 128 znakami, w tym litery, cyfry i popularne symbole. Kazdy znak ma 8 bitow.' },
    { q: 'Dlaczego sa spacje miedzy bajtami binarnymi?', a: 'Spacje oddzielaja kazdy 8-bitowy bajt dla czytelnosci. Kazda oddzielona grupa reprezentuje jeden znak.' },
    { q: 'Czy moge konwertowac binarny na tekst?', a: 'Tak. Wklej bajty binarne oddzielone spacjami i kliknij "Binarny na tekst".' },
    { q: 'Czy to narzedzie jest darmowe i prywatne?', a: 'Tak, calkowicie darmowe. Wszystko odbywa sie w przegladarce bez wysylania danych.' },
  ],
  sv: [
    { q: 'Hur fungerar text-till-binar konvertering?', a: 'Varje tecken konverteras till sin ASCII-kod (0-127) och representeras sedan binart. Till exempel har "A" ASCII-kod 65, binart 01000001.' },
    { q: 'Vilken kodning anvander detta verktyg?', a: 'ASCII-kodning med 128 tecken inklusive bokstaver, siffror och vanliga symboler. Varje tecken ar 8 bitar.' },
    { q: 'Varfor mellanslag mellan de binara byten?', a: 'Mellanslag separerar varje 8-bitars byte for lasbarhet. Varje separerad grupp representerar ett tecken.' },
    { q: 'Kan jag konvertera binart till text?', a: 'Ja. Klistra in mellanslagsseparerade binara bytes och klicka "Binar till text".' },
    { q: 'Ar detta verktyg gratis och privat?', a: 'Ja, helt gratis. Allt bearbetas i din webblasare utan att skicka data.' },
  ],
  no: [
    { q: 'Hvordan fungerer tekst-til-binaer konvertering?', a: 'Hvert tegn konverteres til sin ASCII-kode (0-127) og representeres deretter binaert. For eksempel har "A" ASCII-kode 65, binaert 01000001.' },
    { q: 'Hvilken koding bruker dette verktøyet?', a: 'ASCII-koding med 128 tegn inkludert bokstaver, sifre og vanlige symboler. Hvert tegn er 8 biter.' },
    { q: 'Hvorfor mellomrom mellom binaere bytes?', a: 'Mellomrom skiller hver 8-bits byte for lesbarhet. Hver separert gruppe representerer ett tegn.' },
    { q: 'Kan jeg konvertere binaert til tekst?', a: 'Ja. Lim inn mellomromseparerte binaere bytes og klikk "Binaer til tekst".' },
    { q: 'Er dette verktøyet gratis og privat?', a: 'Ja, helt gratis. Alt behandles i nettleseren din uten a sende data.' },
  ],
  id: [
    { q: 'Bagaimana cara kerja konversi teks ke biner?', a: 'Setiap karakter dikonversi ke kode ASCII-nya (0-127) lalu direpresentasikan dalam biner. Misalnya "A" memiliki kode ASCII 65, yaitu 01000001 dalam biner.' },
    { q: 'Encoding apa yang digunakan alat ini?', a: 'Encoding ASCII dengan 128 karakter termasuk huruf, angka, dan simbol umum. Setiap karakter adalah 8 bit.' },
    { q: 'Mengapa ada spasi antara byte biner?', a: 'Spasi memisahkan setiap byte 8-bit untuk keterbacaan. Setiap kelompok yang dipisahkan mewakili satu karakter.' },
    { q: 'Bisakah saya mengkonversi biner ke teks?', a: 'Ya. Tempel byte biner yang dipisahkan spasi dan klik "Biner ke teks".' },
    { q: 'Apakah alat ini gratis dan privat?', a: 'Ya, sepenuhnya gratis. Semua diproses di browser tanpa mengirim data.' },
  ],
  th: [
    { q: 'การแปลงข้อความเป็นไบนารีทำงานอย่างไร?', a: 'อักขระแต่ละตัวจะถูกแปลงเป็นรหัส ASCII (0-127) แล้วแสดงเป็นเลขฐานสอง เช่น "A" มีรหัส ASCII 65 ซึ่งเป็น 01000001 ในไบนารี' },
    { q: 'เครื่องมือนี้ใช้การเข้ารหัสอะไร?', a: 'การเข้ารหัส ASCII ที่แสดง 128 อักขระรวมถึงตัวอักษร ตัวเลข และสัญลักษณ์ทั่วไป แต่ละอักขระเป็น 8 บิต' },
    { q: 'ทำไมมีช่องว่างระหว่างไบต์ไบนารี?', a: 'ช่องว่างแยกแต่ละไบต์ 8 บิตเพื่อความสามารถในการอ่าน แต่ละกลุ่มที่แยกกันแสดงถึงอักขระหนึ่งตัว' },
    { q: 'สามารถแปลงไบนารีกลับเป็นข้อความได้ไหม?', a: 'ได้ วางไบต์ไบนารีที่คั่นด้วยช่องว่างแล้วคลิก "ไบนารีเป็นข้อความ"' },
    { q: 'เครื่องมือนี้ฟรีและเป็นส่วนตัวหรือไม่?', a: 'ใช่ ฟรีทั้งหมด ทุกอย่างประมวลผลในเบราว์เซอร์โดยไม่ส่งข้อมูล' },
  ],
};

function textToBinary(text: string): string {
  return text.split('').map(char => {
    const code = char.charCodeAt(0);
    return code.toString(2).padStart(8, '0');
  }).join(' ');
}

function binaryToText(binary: string): string | null {
  const bytes = binary.trim().split(/\s+/);
  const chars: string[] = [];
  for (const byte of bytes) {
    if (!/^[01]{1,8}$/.test(byte)) return null;
    chars.push(String.fromCharCode(parseInt(byte, 2)));
  }
  return chars.join('');
}

export default function TextToBinaryPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = use(params);
  const t = strings[lang] || strings.en;
  const faqs = faqData[lang] || faqData.en;

  const [text, setText] = useState('');
  const [binary, setBinary] = useState('');
  const [error, setError] = useState('');
  const [copiedField, setCopiedField] = useState('');

  const handleTextToBinary = useCallback(() => {
    setError('');
    if (!text) return;
    setBinary(textToBinary(text));
  }, [text]);

  const handleBinaryToText = useCallback(() => {
    setError('');
    if (!binary) return;
    const result = binaryToText(binary);
    if (result === null) {
      setError(t.error);
    } else {
      setText(result);
    }
  }, [binary, t.error]);

  const handleSwap = useCallback(() => {
    setError('');
    const oldText = text;
    const oldBinary = binary;
    setText(oldBinary);
    setBinary(oldText);
  }, [text, binary]);

  const copyToClipboard = useCallback((val: string, field: string) => {
    navigator.clipboard.writeText(val);
    setCopiedField(field);
    setTimeout(() => setCopiedField(''), 1500);
  }, []);

  const btnStyle: React.CSSProperties = {
    padding: '8px 18px', borderRadius: 6, border: '1px solid var(--border-color)',
    background: 'var(--bg-card)', cursor: 'pointer', fontSize: 14, fontWeight: 600, color: 'inherit',
  };
  const primaryBtn: React.CSSProperties = {
    ...btnStyle, background: '#2563eb', color: '#fff', border: 'none',
  };
  const textareaStyle: React.CSSProperties = {
    width: '100%', minHeight: 140, padding: 12, borderRadius: 10, border: '1px solid var(--border-color)',
    background: 'var(--bg-card)', color: 'inherit', fontFamily: 'monospace', fontSize: 13, resize: 'vertical',
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

        {/* Text input */}
        <div style={{ marginBottom: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
            <label style={{ fontWeight: 600, fontSize: 14 }}>{t.textLabel}</label>
            <div style={{ display: 'flex', gap: 6 }}>
              <span style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: '32px' }}>{text.length} {t.charCount}</span>
              <button onClick={() => copyToClipboard(text, 'text')} style={btnStyle}>
                {copiedField === 'text' ? t.copied : t.copy}
              </button>
            </div>
          </div>
          <textarea
            value={text} onChange={e => setText(e.target.value)}
            placeholder={t.textPlaceholder}
            style={textareaStyle}
          />
        </div>

        {/* Action buttons */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap', justifyContent: 'center' }}>
          <button onClick={handleTextToBinary} style={primaryBtn}>{t.textToBinary}</button>
          <button onClick={handleSwap} style={btnStyle}>{t.swap}</button>
          <button onClick={handleBinaryToText} style={primaryBtn}>{t.binaryToText}</button>
          <button onClick={() => { setText(''); setBinary(''); setError(''); }} style={btnStyle}>{t.clear}</button>
        </div>

        {/* Error */}
        {error && (
          <div style={{ padding: '10px 14px', marginBottom: 16, borderRadius: 8, background: '#fee2e2', color: '#dc2626', fontSize: 14 }}>
            {error}
          </div>
        )}

        {/* Binary input/output */}
        <div style={{ marginBottom: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
            <label style={{ fontWeight: 600, fontSize: 14 }}>{t.binaryLabel}</label>
            <div style={{ display: 'flex', gap: 6 }}>
              <span style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: '32px' }}>{binary ? binary.split(' ').length : 0} {t.byteCount}</span>
              <button onClick={() => copyToClipboard(binary, 'binary')} style={btnStyle}>
                {copiedField === 'binary' ? t.copied : t.copy}
              </button>
            </div>
          </div>
          <textarea
            value={binary} onChange={e => setBinary(e.target.value)}
            placeholder={t.binaryPlaceholder}
            style={{ ...textareaStyle, wordBreak: 'break-all' }}
          />
        </div>

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
