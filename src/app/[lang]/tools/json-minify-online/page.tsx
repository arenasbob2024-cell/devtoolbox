'use client';

import { use, useState, useCallback } from 'react';

const strings: Record<string, Record<string, string>> = {
  en: {
    title: 'JSON Minifier Online',
    description: 'Paste JSON and minify it by removing all whitespace. See input/output size comparison instantly.',
    inputLabel: 'Input JSON',
    outputLabel: 'Minified JSON',
    inputPlaceholder: 'Paste your JSON here...',
    minify: 'Minify',
    clear: 'Clear',
    copy: 'Copy', copied: 'Copied!',
    paste: 'Paste',
    inputSize: 'Input Size',
    outputSize: 'Output Size',
    saved: 'Saved',
    chars: 'chars',
    error: 'Invalid JSON',
    introTitle: 'Free Online JSON Minifier',
    introText: 'Compress your JSON data by removing all unnecessary whitespace, line breaks, and indentation. This tool validates and minifies JSON instantly, showing the compression ratio so you know exactly how much space you saved.',
    faqTitle: 'Frequently Asked Questions',
  },
  zh: {
    title: 'JSON 在线压缩器',
    description: '粘贴 JSON 并移除所有空白字符进行压缩。即时查看输入/输出大小对比。',
    inputLabel: '输入 JSON',
    outputLabel: '压缩后的 JSON',
    inputPlaceholder: '在此粘贴您的 JSON...',
    minify: '压缩',
    clear: '清除',
    copy: '复制', copied: '已复制！',
    paste: '粘贴',
    inputSize: '输入大小',
    outputSize: '输出大小',
    saved: '节省',
    chars: '字符',
    error: 'JSON 格式无效',
    introTitle: '免费在线 JSON 压缩工具',
    introText: '通过移除所有不必要的空白、换行和缩进来压缩 JSON 数据。即时验证并压缩，显示压缩比。',
    faqTitle: '常见问题',
  },
  ja: {
    title: 'JSON ミニファイア オンライン',
    description: 'JSONを貼り付けて空白を全て削除しミニファイします。入出力サイズ比較を即座に確認。',
    inputLabel: '入力 JSON',
    outputLabel: 'ミニファイ済み JSON',
    inputPlaceholder: 'ここにJSONを貼り付け...',
    minify: 'ミニファイ',
    clear: 'クリア',
    copy: 'コピー', copied: 'コピー済み！',
    paste: '貼り付け',
    inputSize: '入力サイズ',
    outputSize: '出力サイズ',
    saved: '節約',
    chars: '文字',
    error: '無効なJSON',
    introTitle: '無料オンラインJSONミニファイア',
    introText: '不要な空白、改行、インデントを全て削除してJSONデータを圧縮します。即座に検証しミニファイし、圧縮率を表示します。',
    faqTitle: 'よくある質問',
  },
  ko: {
    title: 'JSON 압축기 온라인',
    description: 'JSON을 붙여넣고 모든 공백을 제거하여 압축합니다. 입출력 크기 비교를 즉시 확인하세요.',
    inputLabel: '입력 JSON',
    outputLabel: '압축된 JSON',
    inputPlaceholder: '여기에 JSON을 붙여넣으세요...',
    minify: '압축',
    clear: '지우기',
    copy: '복사', copied: '복사됨!',
    paste: '붙여넣기',
    inputSize: '입력 크기',
    outputSize: '출력 크기',
    saved: '절약',
    chars: '문자',
    error: '유효하지 않은 JSON',
    introTitle: '무료 온라인 JSON 압축기',
    introText: '불필요한 공백, 줄바꿈, 들여쓰기를 모두 제거하여 JSON 데이터를 압축합니다. 즉시 검증하고 압축하며 압축률을 표시합니다.',
    faqTitle: '자주 묻는 질문',
  },
  fr: {
    title: 'Minifieur JSON en Ligne',
    description: 'Collez du JSON et minifiez-le en supprimant tous les espaces. Comparaison instantanee des tailles.',
    inputLabel: 'JSON en entree',
    outputLabel: 'JSON minifie',
    inputPlaceholder: 'Collez votre JSON ici...',
    minify: 'Minifier',
    clear: 'Effacer',
    copy: 'Copier', copied: 'Copie !',
    paste: 'Coller',
    inputSize: 'Taille en entree',
    outputSize: 'Taille en sortie',
    saved: 'Economise',
    chars: 'car.',
    error: 'JSON invalide',
    introTitle: 'Minifieur JSON en ligne gratuit',
    introText: 'Compressez vos donnees JSON en supprimant tous les espaces, sauts de ligne et indentations inutiles. Validation et minification instantanees.',
    faqTitle: 'Questions frequentes',
  },
  de: {
    title: 'JSON Minifizierer Online',
    description: 'JSON einfugen und durch Entfernen aller Leerzeichen minifizieren. Sofortiger Groessenvergleich.',
    inputLabel: 'Eingabe-JSON',
    outputLabel: 'Minifiziertes JSON',
    inputPlaceholder: 'JSON hier einfugen...',
    minify: 'Minifizieren',
    clear: 'Loschen',
    copy: 'Kopieren', copied: 'Kopiert!',
    paste: 'Einfugen',
    inputSize: 'Eingabegroesse',
    outputSize: 'Ausgabegroesse',
    saved: 'Gespart',
    chars: 'Zeichen',
    error: 'Ungultiges JSON',
    introTitle: 'Kostenloser Online-JSON-Minifizierer',
    introText: 'Komprimieren Sie JSON-Daten durch Entfernen aller unnotigen Leerzeichen, Zeilenumbruche und Einruckungen. Sofortige Validierung und Minifizierung.',
    faqTitle: 'Haufig gestellte Fragen',
  },
  es: {
    title: 'Minificador JSON en Linea',
    description: 'Pegue JSON y minifiquelo eliminando todos los espacios en blanco. Comparacion instantanea de tamanos.',
    inputLabel: 'JSON de entrada',
    outputLabel: 'JSON minificado',
    inputPlaceholder: 'Pegue su JSON aqui...',
    minify: 'Minificar',
    clear: 'Limpiar',
    copy: 'Copiar', copied: 'Copiado!',
    paste: 'Pegar',
    inputSize: 'Tamano de entrada',
    outputSize: 'Tamano de salida',
    saved: 'Ahorrado',
    chars: 'car.',
    error: 'JSON invalido',
    introTitle: 'Minificador JSON en linea gratuito',
    introText: 'Comprima sus datos JSON eliminando todos los espacios, saltos de linea e indentaciones innecesarias. Validacion y minificacion instantaneas.',
    faqTitle: 'Preguntas frecuentes',
  },
  pt: {
    title: 'Minificador JSON Online',
    description: 'Cole JSON e minifique removendo todos os espacos em branco. Comparacao instantanea de tamanhos.',
    inputLabel: 'JSON de entrada',
    outputLabel: 'JSON minificado',
    inputPlaceholder: 'Cole seu JSON aqui...',
    minify: 'Minificar',
    clear: 'Limpar',
    copy: 'Copiar', copied: 'Copiado!',
    paste: 'Colar',
    inputSize: 'Tamanho de entrada',
    outputSize: 'Tamanho de saida',
    saved: 'Economizado',
    chars: 'car.',
    error: 'JSON invalido',
    introTitle: 'Minificador JSON online gratuito',
    introText: 'Comprima seus dados JSON removendo todos os espacos, quebras de linha e identacao desnecessarios. Validacao e minificacao instantaneas.',
    faqTitle: 'Perguntas frequentes',
  },
  it: {
    title: 'Minificatore JSON Online',
    description: 'Incolla JSON e minificalo rimuovendo tutti gli spazi. Confronto dimensioni istantaneo.',
    inputLabel: 'JSON in ingresso',
    outputLabel: 'JSON minificato',
    inputPlaceholder: 'Incolla il tuo JSON qui...',
    minify: 'Minifica',
    clear: 'Cancella',
    copy: 'Copia', copied: 'Copiato!',
    paste: 'Incolla',
    inputSize: 'Dimensione ingresso',
    outputSize: 'Dimensione uscita',
    saved: 'Risparmiato',
    chars: 'car.',
    error: 'JSON non valido',
    introTitle: 'Minificatore JSON online gratuito',
    introText: 'Comprimi i dati JSON rimuovendo tutti gli spazi, le interruzioni di riga e l\'indentazione non necessari. Validazione e minificazione istantanee.',
    faqTitle: 'Domande frequenti',
  },
  nl: {
    title: 'JSON Minifier Online',
    description: 'Plak JSON en verklein door alle witruimte te verwijderen. Direct groottevergelijking zien.',
    inputLabel: 'Invoer JSON',
    outputLabel: 'Verkleinde JSON',
    inputPlaceholder: 'Plak hier uw JSON...',
    minify: 'Verkleinen',
    clear: 'Wissen',
    copy: 'Kopieren', copied: 'Gekopieerd!',
    paste: 'Plakken',
    inputSize: 'Invoergrootte',
    outputSize: 'Uitvoergrootte',
    saved: 'Bespaard',
    chars: 'tekens',
    error: 'Ongeldige JSON',
    introTitle: 'Gratis online JSON minifier',
    introText: 'Comprimeer uw JSON-gegevens door alle onnodige witruimte, regeleinden en inspringing te verwijderen. Directe validatie en minificatie.',
    faqTitle: 'Veelgestelde vragen',
  },
  pl: {
    title: 'Minifikator JSON Online',
    description: 'Wklej JSON i zminifikuj usuwajac wszystkie biale znaki. Natychmiastowe porownanie rozmiarow.',
    inputLabel: 'JSON wejsciowy',
    outputLabel: 'Zminifikowany JSON',
    inputPlaceholder: 'Wklej tutaj swoj JSON...',
    minify: 'Minifikuj',
    clear: 'Wyczysc',
    copy: 'Kopiuj', copied: 'Skopiowano!',
    paste: 'Wklej',
    inputSize: 'Rozmiar wejsciowy',
    outputSize: 'Rozmiar wyjsciowy',
    saved: 'Zaoszczedzono',
    chars: 'znakow',
    error: 'Nieprawidlowy JSON',
    introTitle: 'Darmowy minifikator JSON online',
    introText: 'Skompresuj dane JSON usuwajac wszystkie niepotrzebne biale znaki, znaki nowej linii i wciecia. Natychmiastowa walidacja i minifikacja.',
    faqTitle: 'Czesto zadawane pytania',
  },
  sv: {
    title: 'JSON Minifierare Online',
    description: 'Klistra in JSON och minifiera genom att ta bort alla blanksteg. Se storlek jamforelse direkt.',
    inputLabel: 'Indata JSON',
    outputLabel: 'Minifierad JSON',
    inputPlaceholder: 'Klistra in din JSON har...',
    minify: 'Minifiera',
    clear: 'Rensa',
    copy: 'Kopiera', copied: 'Kopierad!',
    paste: 'Klistra in',
    inputSize: 'Indatastorlek',
    outputSize: 'Utdatastorlek',
    saved: 'Sparat',
    chars: 'tecken',
    error: 'Ogiltig JSON',
    introTitle: 'Gratis online JSON-minifierare',
    introText: 'Komprimera dina JSON-data genom att ta bort alla onodiga blanksteg, radbrytningar och indrag. Direkt validering och minifiering.',
    faqTitle: 'Vanliga fragor',
  },
  no: {
    title: 'JSON Minifiserer Online',
    description: 'Lim inn JSON og minifiser ved a fjerne alle mellomrom. Se storrelsessammenligning umiddelbart.',
    inputLabel: 'Inndata JSON',
    outputLabel: 'Minifisert JSON',
    inputPlaceholder: 'Lim inn JSON her...',
    minify: 'Minifiser',
    clear: 'Tøm',
    copy: 'Kopier', copied: 'Kopiert!',
    paste: 'Lim inn',
    inputSize: 'Inndatastorrelse',
    outputSize: 'Utdatastorrelse',
    saved: 'Spart',
    chars: 'tegn',
    error: 'Ugyldig JSON',
    introTitle: 'Gratis online JSON-minifiserer',
    introText: 'Komprimer JSON-data ved a fjerne alle unodvendige mellomrom, linjeskift og innrykk. Umiddelbar validering og minifisering.',
    faqTitle: 'Ofte stilte sporsmal',
  },
  id: {
    title: 'JSON Minifier Online',
    description: 'Tempel JSON dan perkecil dengan menghapus semua spasi. Lihat perbandingan ukuran secara instan.',
    inputLabel: 'Input JSON',
    outputLabel: 'JSON Diperkecil',
    inputPlaceholder: 'Tempel JSON Anda di sini...',
    minify: 'Perkecil',
    clear: 'Hapus',
    copy: 'Salin', copied: 'Disalin!',
    paste: 'Tempel',
    inputSize: 'Ukuran Input',
    outputSize: 'Ukuran Output',
    saved: 'Dihemat',
    chars: 'karakter',
    error: 'JSON tidak valid',
    introTitle: 'JSON Minifier Online Gratis',
    introText: 'Kompres data JSON dengan menghapus semua spasi, jeda baris, dan indentasi yang tidak perlu. Validasi dan minifikasi instan.',
    faqTitle: 'Pertanyaan yang Sering Diajukan',
  },
  th: {
    title: 'ตัวบีบอัด JSON ออนไลน์',
    description: 'วาง JSON แล้วบีบอัดโดยลบช่องว่างทั้งหมด ดูการเปรียบเทียบขนาดทันที',
    inputLabel: 'JSON ขาเข้า',
    outputLabel: 'JSON ที่บีบอัดแล้ว',
    inputPlaceholder: 'วาง JSON ของคุณที่นี่...',
    minify: 'บีบอัด',
    clear: 'ล้าง',
    copy: 'คัดลอก', copied: 'คัดลอกแล้ว!',
    paste: 'วาง',
    inputSize: 'ขนาดขาเข้า',
    outputSize: 'ขนาดขาออก',
    saved: 'ประหยัด',
    chars: 'ตัวอักษร',
    error: 'JSON ไม่ถูกต้อง',
    introTitle: 'ตัวบีบอัด JSON ออนไลน์ฟรี',
    introText: 'บีบอัดข้อมูล JSON โดยลบช่องว่าง การขึ้นบรรทัดใหม่ และการเยื้องที่ไม่จำเป็นทั้งหมด ตรวจสอบและบีบอัดทันที',
    faqTitle: 'คำถามที่พบบ่อย',
  },
};

const faqData: Record<string, Array<{ q: string; a: string }>> = {
  en: [
    { q: 'What does JSON minification do?', a: 'JSON minification removes all unnecessary whitespace, line breaks, indentation, and formatting from JSON data while preserving its structure and values. This reduces file size for faster network transfers and smaller storage.' },
    { q: 'Is the minified JSON still valid?', a: 'Yes. Minification only removes formatting characters (spaces, tabs, newlines) that are not part of string values. The resulting JSON is fully valid and equivalent to the original.' },
    { q: 'How much space can I save by minifying JSON?', a: 'Savings depend on how much formatting exists in the original. Typically you can save 20-60% of file size. Pretty-printed JSON with deep nesting saves more because it has more indentation whitespace.' },
    { q: 'Can I minify invalid JSON?', a: 'No. This tool validates JSON before minifying. If the input is not valid JSON, you will see an error message. Fix the syntax errors first, then minify.' },
    { q: 'Is my data secure when using this tool?', a: 'Yes. All processing happens entirely in your browser using JavaScript. No data is sent to any server. Your JSON never leaves your device.' },
  ],
  zh: [
    { q: 'JSON 压缩做什么？', a: 'JSON 压缩移除所有不必要的空白、换行、缩进和格式化，同时保留结构和值。这可以减小文件大小以加快网络传输。' },
    { q: '压缩后的 JSON 仍然有效吗？', a: '是的。压缩仅移除不属于字符串值的格式字符。结果完全有效且等价于原始数据。' },
    { q: '压缩 JSON 可以节省多少空间？', a: '取决于原始格式化程度。通常可以节省 20-60% 的文件大小。' },
    { q: '可以压缩无效的 JSON 吗？', a: '不可以。此工具在压缩前会验证 JSON。如果输入无效，会显示错误信息。' },
    { q: '使用此工具数据安全吗？', a: '是的。所有处理都在浏览器中完成，不会向任何服务器发送数据。' },
  ],
  ja: [
    { q: 'JSONミニファイとは何ですか？', a: 'JSONミニファイは、構造と値を保持しながら不要な空白、改行、インデント、フォーマットを全て削除します。ファイルサイズを削減し転送を高速化します。' },
    { q: 'ミニファイ後のJSONは有効ですか？', a: 'はい。ミニファイは文字列値の一部でないフォーマット文字のみ削除します。結果は完全に有効で元と同等です。' },
    { q: 'どのくらいスペースを節約できますか？', a: '元のフォーマットによりますが、通常20-60%のファイルサイズを節約できます。' },
    { q: '無効なJSONをミニファイできますか？', a: 'いいえ。このツールはミニファイ前にJSONを検証します。入力が無効な場合エラーメッセージが表示されます。' },
    { q: 'データは安全ですか？', a: 'はい。全ての処理はブラウザ内で行われ、サーバーにデータは送信されません。' },
  ],
  ko: [
    { q: 'JSON 압축이란 무엇인가요?', a: 'JSON 압축은 구조와 값을 유지하면서 불필요한 공백, 줄바꿈, 들여쓰기, 서식을 모두 제거합니다. 파일 크기를 줄여 네트워크 전송을 빠르게 합니다.' },
    { q: '압축된 JSON은 여전히 유효한가요?', a: '네. 압축은 문자열 값의 일부가 아닌 서식 문자만 제거합니다. 결과는 완전히 유효하며 원본과 동등합니다.' },
    { q: '얼마나 공간을 절약할 수 있나요?', a: '원본 서식에 따라 다르지만, 일반적으로 파일 크기의 20-60%를 절약할 수 있습니다.' },
    { q: '유효하지 않은 JSON을 압축할 수 있나요?', a: '아니요. 이 도구는 압축 전에 JSON을 검증합니다. 입력이 유효하지 않으면 오류 메시지가 표시됩니다.' },
    { q: '데이터는 안전한가요?', a: '네. 모든 처리는 브라우저에서 이루어지며 서버로 데이터가 전송되지 않습니다.' },
  ],
  fr: [
    { q: 'Que fait la minification JSON ?', a: 'La minification supprime tous les espaces, sauts de ligne et indentations inutiles tout en preservant la structure et les valeurs. Cela reduit la taille du fichier.' },
    { q: 'Le JSON minifie est-il toujours valide ?', a: 'Oui. La minification supprime uniquement les caracteres de formatage qui ne font pas partie des chaines de caracteres.' },
    { q: 'Combien d\'espace puis-je economiser ?', a: 'Generalement 20-60% selon le formatage original.' },
    { q: 'Puis-je minifier du JSON invalide ?', a: 'Non. L\'outil valide le JSON avant la minification. Un message d\'erreur apparait si l\'entree est invalide.' },
    { q: 'Mes donnees sont-elles securisees ?', a: 'Oui. Tout le traitement se fait dans votre navigateur. Aucune donnee n\'est envoyee a un serveur.' },
  ],
  de: [
    { q: 'Was macht JSON-Minifizierung?', a: 'JSON-Minifizierung entfernt alle unnotigen Leerzeichen, Zeilenumbruche und Einruckungen unter Beibehaltung der Struktur und Werte. Dies reduziert die Dateigroesse.' },
    { q: 'Ist das minifizierte JSON noch gultig?', a: 'Ja. Minifizierung entfernt nur Formatierungszeichen, die nicht Teil von Zeichenkettenwerten sind.' },
    { q: 'Wie viel Platz kann ich sparen?', a: 'In der Regel 20-60% je nach ursprunglicher Formatierung.' },
    { q: 'Kann ich ungultiges JSON minifizieren?', a: 'Nein. Das Tool validiert JSON vor der Minifizierung. Bei ungultiger Eingabe wird eine Fehlermeldung angezeigt.' },
    { q: 'Sind meine Daten sicher?', a: 'Ja. Alle Verarbeitung erfolgt im Browser. Keine Daten werden an Server gesendet.' },
  ],
  es: [
    { q: 'Que hace la minificacion JSON?', a: 'Elimina todos los espacios, saltos de linea e indentaciones innecesarios preservando la estructura y los valores. Reduce el tamano del archivo.' },
    { q: 'El JSON minificado sigue siendo valido?', a: 'Si. La minificacion solo elimina caracteres de formato que no son parte de valores de cadena.' },
    { q: 'Cuanto espacio puedo ahorrar?', a: 'Normalmente 20-60% dependiendo del formato original.' },
    { q: 'Puedo minificar JSON invalido?', a: 'No. La herramienta valida el JSON antes de minificar. Se muestra un mensaje de error si la entrada es invalida.' },
    { q: 'Mis datos estan seguros?', a: 'Si. Todo el procesamiento ocurre en su navegador. No se envian datos a ningun servidor.' },
  ],
  pt: [
    { q: 'O que faz a minificacao JSON?', a: 'Remove todos os espacos, quebras de linha e identacao desnecessarios preservando a estrutura e os valores. Reduz o tamanho do arquivo.' },
    { q: 'O JSON minificado ainda e valido?', a: 'Sim. A minificacao remove apenas caracteres de formatacao que nao fazem parte de valores de string.' },
    { q: 'Quanto espaco posso economizar?', a: 'Normalmente 20-60% dependendo da formatacao original.' },
    { q: 'Posso minificar JSON invalido?', a: 'Nao. A ferramenta valida o JSON antes de minificar. Uma mensagem de erro e exibida se a entrada for invalida.' },
    { q: 'Meus dados estao seguros?', a: 'Sim. Todo o processamento ocorre no seu navegador. Nenhum dado e enviado a servidores.' },
  ],
  it: [
    { q: 'Cosa fa la minificazione JSON?', a: 'Rimuove tutti gli spazi, le interruzioni di riga e l\'indentazione non necessari preservando struttura e valori. Riduce la dimensione del file.' },
    { q: 'Il JSON minificato e ancora valido?', a: 'Si. La minificazione rimuove solo i caratteri di formattazione che non fanno parte dei valori stringa.' },
    { q: 'Quanto spazio posso risparmiare?', a: 'In genere 20-60% a seconda della formattazione originale.' },
    { q: 'Posso minificare JSON non valido?', a: 'No. Lo strumento valida il JSON prima della minificazione. Un messaggio di errore viene mostrato se l\'input non e valido.' },
    { q: 'I miei dati sono al sicuro?', a: 'Si. Tutta l\'elaborazione avviene nel browser. Nessun dato viene inviato a server.' },
  ],
  nl: [
    { q: 'Wat doet JSON-minificatie?', a: 'JSON-minificatie verwijdert alle onnodige witruimte, regeleinden en inspringing met behoud van structuur en waarden. Dit verkleint de bestandsgrootte.' },
    { q: 'Is de verkleinde JSON nog geldig?', a: 'Ja. Minificatie verwijdert alleen opmaaktekens die geen deel uitmaken van tekenreekswaarden.' },
    { q: 'Hoeveel ruimte kan ik besparen?', a: 'Doorgaans 20-60% afhankelijk van de oorspronkelijke opmaak.' },
    { q: 'Kan ik ongeldige JSON verkleinen?', a: 'Nee. Het hulpmiddel valideert JSON voor minificatie. Een foutmelding verschijnt als de invoer ongeldig is.' },
    { q: 'Zijn mijn gegevens veilig?', a: 'Ja. Alle verwerking gebeurt in uw browser. Geen gegevens worden naar servers verzonden.' },
  ],
  pl: [
    { q: 'Co robi minifikacja JSON?', a: 'Minifikacja usuwa wszystkie niepotrzebne biale znaki, znaki nowej linii i wciecia, zachowujac strukture i wartosci. Zmniejsza rozmiar pliku.' },
    { q: 'Czy zminifikowany JSON jest nadal prawidlowy?', a: 'Tak. Minifikacja usuwa tylko znaki formatowania, ktore nie sa czescia wartosci tekstowych.' },
    { q: 'Ile miejsca moge zaoszczedzic?', a: 'Zazwyczaj 20-60% w zaleznosci od oryginalnego formatowania.' },
    { q: 'Czy moge zminifikowac nieprawidlowy JSON?', a: 'Nie. Narzedzie waliduje JSON przed minifikacja. Przy nieprawidlowym wejsciu wyswietlany jest komunikat o bledzie.' },
    { q: 'Czy moje dane sa bezpieczne?', a: 'Tak. Przetwarzanie odbywa sie w przegladarce. Zadne dane nie sa wysylane na serwery.' },
  ],
  sv: [
    { q: 'Vad gor JSON-minifiering?', a: 'JSON-minifiering tar bort alla onodiga blanksteg, radbrytningar och indrag med bibehallen struktur och varden. Minskar filstorleken.' },
    { q: 'Ar den minifierade JSON fortfarande giltig?', a: 'Ja. Minifiering tar bara bort formateringstecken som inte ar del av strangvarden.' },
    { q: 'Hur mycket utrymme kan jag spara?', a: 'Vanligtvis 20-60% beroende pa originalformatering.' },
    { q: 'Kan jag minifiera ogiltig JSON?', a: 'Nej. Verktyget validerar JSON fore minifiering. Felmeddelande visas om indata ar ogiltiga.' },
    { q: 'Ar mina data sakra?', a: 'Ja. All bearbetning sker i din webblasare. Inga data skickas till servrar.' },
  ],
  no: [
    { q: 'Hva gjor JSON-minifisering?', a: 'JSON-minifisering fjerner alle unodvendige mellomrom, linjeskift og innrykk samtidig som struktur og verdier bevares. Reduserer filstorrelsen.' },
    { q: 'Er den minifiserte JSON fortsatt gyldig?', a: 'Ja. Minifisering fjerner bare formateringstegn som ikke er del av strengverdier.' },
    { q: 'Hvor mye plass kan jeg spare?', a: 'Vanligvis 20-60% avhengig av original formatering.' },
    { q: 'Kan jeg minifisere ugyldig JSON?', a: 'Nei. Verktøyet validerer JSON for minifisering. Feilmelding vises hvis inndataene er ugyldige.' },
    { q: 'Er dataene mine trygge?', a: 'Ja. All behandling skjer i nettleseren din. Ingen data sendes til servere.' },
  ],
  id: [
    { q: 'Apa yang dilakukan minifikasi JSON?', a: 'Minifikasi JSON menghapus semua spasi, jeda baris, dan indentasi yang tidak perlu sambil mempertahankan struktur dan nilai. Mengurangi ukuran file.' },
    { q: 'Apakah JSON yang diminifikasi masih valid?', a: 'Ya. Minifikasi hanya menghapus karakter pemformatan yang bukan bagian dari nilai string.' },
    { q: 'Berapa banyak ruang yang bisa dihemat?', a: 'Biasanya 20-60% tergantung pada format aslinya.' },
    { q: 'Bisakah saya meminifikasi JSON yang tidak valid?', a: 'Tidak. Alat ini memvalidasi JSON sebelum minifikasi. Pesan error ditampilkan jika input tidak valid.' },
    { q: 'Apakah data saya aman?', a: 'Ya. Semua pemrosesan terjadi di browser Anda. Tidak ada data yang dikirim ke server.' },
  ],
  th: [
    { q: 'การบีบอัด JSON ทำอะไร?', a: 'การบีบอัด JSON ลบช่องว่าง การขึ้นบรรทัดใหม่ และการเยื้องที่ไม่จำเป็นทั้งหมดโดยรักษาโครงสร้างและค่า ลดขนาดไฟล์' },
    { q: 'JSON ที่บีบอัดแล้วยังถูกต้องอยู่หรือไม่?', a: 'ใช่ การบีบอัดลบเฉพาะอักขระการจัดรูปแบบที่ไม่ใช่ส่วนหนึ่งของค่าสตริง' },
    { q: 'ประหยัดพื้นที่ได้เท่าไร?', a: 'โดยทั่วไป 20-60% ขึ้นอยู่กับรูปแบบต้นฉบับ' },
    { q: 'สามารถบีบอัด JSON ที่ไม่ถูกต้องได้ไหม?', a: 'ไม่ได้ เครื่องมือนี้ตรวจสอบ JSON ก่อนบีบอัด ข้อความแสดงข้อผิดพลาดจะปรากฏหากข้อมูลไม่ถูกต้อง' },
    { q: 'ข้อมูลของฉันปลอดภัยหรือไม่?', a: 'ใช่ การประมวลผลทั้งหมดเกิดขึ้นในเบราว์เซอร์ของคุณ ไม่มีข้อมูลถูกส่งไปยังเซิร์ฟเวอร์' },
  ],
};

export default function JsonMinifyPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = use(params);
  const t = strings[lang] || strings.en;
  const faqs = faqData[lang] || faqData.en;

  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const handleMinify = useCallback(() => {
    setError('');
    setOutput('');
    if (!input.trim()) return;
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed));
    } catch {
      setError(t.error);
    }
  }, [input, t.error]);

  const handleCopy = useCallback(() => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }, [output]);

  const handlePaste = useCallback(async () => {
    try {
      const text = await navigator.clipboard.readText();
      setInput(text);
    } catch { /* clipboard access may fail */ }
  }, []);

  const inputSize = new Blob([input]).size;
  const outputSize = output ? new Blob([output]).size : 0;
  const savedPercent = inputSize > 0 && outputSize > 0 ? Math.round((1 - outputSize / inputSize) * 100) : 0;

  const btnStyle: React.CSSProperties = {
    padding: '8px 18px', borderRadius: 6, border: '1px solid var(--border-color)',
    background: 'var(--bg-card)', cursor: 'pointer', fontSize: 14, fontWeight: 600, color: 'inherit',
  };
  const primaryBtn: React.CSSProperties = {
    ...btnStyle, background: '#2563eb', color: '#fff', border: 'none',
  };
  const textareaStyle: React.CSSProperties = {
    width: '100%', minHeight: 200, padding: 12, borderRadius: 10, border: '1px solid var(--border-color)',
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

        {/* Input area */}
        <div style={{ marginBottom: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
            <label style={{ fontWeight: 600, fontSize: 14 }}>{t.inputLabel}</label>
            <button onClick={handlePaste} style={btnStyle}>{t.paste}</button>
          </div>
          <textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder={t.inputPlaceholder}
            style={textareaStyle}
          />
        </div>

        {/* Buttons */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
          <button onClick={handleMinify} style={primaryBtn}>{t.minify}</button>
          <button onClick={() => { setInput(''); setOutput(''); setError(''); }} style={btnStyle}>{t.clear}</button>
        </div>

        {/* Error */}
        {error && (
          <div style={{ padding: '10px 14px', marginBottom: 16, borderRadius: 8, background: '#fee2e2', color: '#dc2626', fontSize: 14 }}>
            {error}
          </div>
        )}

        {/* Output area */}
        {output && (
          <div style={{ marginBottom: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
              <label style={{ fontWeight: 600, fontSize: 14 }}>{t.outputLabel}</label>
              <button onClick={handleCopy} style={btnStyle}>
                {copied ? t.copied : t.copy}
              </button>
            </div>
            <textarea readOnly value={output} style={{ ...textareaStyle, minHeight: 120 }} />
          </div>
        )}

        {/* Size comparison */}
        {output && (
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 24 }}>
            <div style={{ flex: 1, padding: 14, background: 'var(--bg-card)', borderRadius: 10, border: '1px solid var(--border-color)', textAlign: 'center' }}>
              <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{t.inputSize}</div>
              <div style={{ fontSize: 20, fontWeight: 700, fontFamily: 'monospace' }}>{inputSize.toLocaleString()} <span style={{ fontSize: 12, fontWeight: 400 }}>{t.chars}</span></div>
            </div>
            <div style={{ flex: 1, padding: 14, background: 'var(--bg-card)', borderRadius: 10, border: '1px solid var(--border-color)', textAlign: 'center' }}>
              <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{t.outputSize}</div>
              <div style={{ fontSize: 20, fontWeight: 700, fontFamily: 'monospace' }}>{outputSize.toLocaleString()} <span style={{ fontSize: 12, fontWeight: 400 }}>{t.chars}</span></div>
            </div>
            <div style={{ flex: 1, padding: 14, background: 'var(--bg-card)', borderRadius: 10, border: '1px solid var(--border-color)', textAlign: 'center' }}>
              <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{t.saved}</div>
              <div style={{ fontSize: 20, fontWeight: 700, fontFamily: 'monospace', color: '#16a34a' }}>{savedPercent}%</div>
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
