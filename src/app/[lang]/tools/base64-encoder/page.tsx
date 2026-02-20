'use client';

import { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import Link from 'next/link';
import { useLang } from '@/i18n/LangContext';

const t: Record<string, Record<string, string>> = {
  en: {
    title: 'Base64 Encoder',
    description: 'Encode text and strings to Base64 format instantly. Supports full UTF-8 character set including emojis and international characters.',
    inputLabel: 'Text to Encode',
    outputLabel: 'Base64 Output',
    inputPlaceholder: 'Enter text to encode to Base64...',
    encode: 'Encode',
    clear: 'Clear',
    cheatTitle: 'Base64 Alphabet Reference',
    cheatDesc: 'Base64 uses 64 characters to represent binary data as ASCII text. The encoding alphabet consists of A-Z, a-z, 0-9, + and /. The = character is used for padding.',
    intro: 'Base64 encoding converts binary data into a safe ASCII string representation. Use this free online base64 encoder to encode any text, including UTF-8 strings with special characters, to base64 format. Base64 encoding is commonly used in data URIs, email attachments (MIME), and embedding binary data in JSON or XML.',
    faq1q: 'What is Base64 encoding?',
    faq1a: 'Base64 encoding is a method of converting binary data into a text format using 64 printable ASCII characters (A-Z, a-z, 0-9, +, /). It increases data size by approximately 33% but ensures safe transmission through text-only channels like email, URLs, and JSON.',
    faq2q: 'When should I use Base64 encoding?',
    faq2a: 'Use Base64 encoding when you need to embed binary data (images, files) in text-based formats like HTML, CSS, or JSON. It is also used in email attachments (MIME), data URIs, HTTP Basic Authentication, and storing binary data in databases that only support text.',
    faq3q: 'What is the difference between Base64 and URL encoding?',
    faq3a: 'Base64 converts binary data to ASCII text using a 64-character alphabet, increasing size by ~33%. URL encoding (percent-encoding) replaces unsafe URL characters with %XX hex values. Base64 is for binary-to-text conversion; URL encoding is for making strings safe in URLs. They serve different purposes and can be used together.',
    crossLinks: 'Related Base64 Tools',
    errorMsg: 'Encoding error. Please check your input.',
    charCount: 'characters',
    byteCount: 'bytes',
  },
  zh: {
    title: 'Base64 编码器',
    description: '即时将文本和字符串编码为 Base64 格式。支持完整的 UTF-8 字符集，包括表情符号和国际字符。',
    inputLabel: '待编码文本',
    outputLabel: 'Base64 输出',
    inputPlaceholder: '输入要编码为 Base64 的文本...',
    encode: '编码',
    clear: '清除',
    cheatTitle: 'Base64 字母表参考',
    cheatDesc: 'Base64 使用 64 个字符将二进制数据表示为 ASCII 文本。编码字母表由 A-Z、a-z、0-9、+ 和 / 组成。= 字符用于填充。',
    intro: 'Base64 编码将二进制数据转换为安全的 ASCII 字符串。使用此免费在线 base64 编码器将任何文本（包括带有特殊字符的 UTF-8 字符串）编码为 base64 格式。',
    faq1q: '什么是 Base64 编码？',
    faq1a: 'Base64 编码是一种将二进制数据转换为文本格式的方法，使用 64 个可打印的 ASCII 字符（A-Z、a-z、0-9、+、/）。数据大小会增加约 33%，但确保数据能通过纯文本通道安全传输。',
    faq2q: '什么时候应该使用 Base64 编码？',
    faq2a: '当需要在基于文本的格式（如 HTML、CSS 或 JSON）中嵌入二进制数据（图片、文件）时使用 Base64 编码。它也用于电子邮件附件（MIME）、数据 URI、HTTP 基本认证等场景。',
    faq3q: 'Base64 和 URL 编码有什么区别？',
    faq3a: 'Base64 使用 64 字符字母表将二进制数据转换为 ASCII 文本。URL 编码将不安全的 URL 字符替换为 %XX 十六进制值。两者用途不同，可以组合使用。',
    crossLinks: '相关 Base64 工具',
    errorMsg: '编码错误，请检查输入。',
    charCount: '字符',
    byteCount: '字节',
  },
  fr: { title: 'Encodeur Base64', description: 'Encodez du texte en Base64 instantanement.', inputLabel: 'Texte a encoder', outputLabel: 'Sortie Base64', inputPlaceholder: 'Entrez le texte a encoder...', encode: 'Encoder', clear: 'Effacer', cheatTitle: 'Reference Alphabet Base64', cheatDesc: 'Base64 utilise 64 caracteres pour representer les donnees binaires en texte ASCII.', intro: 'L\'encodage Base64 convertit les donnees binaires en une representation de chaine ASCII sure. Utilisez cet encodeur base64 en ligne gratuit pour encoder tout texte en format base64.', faq1q: 'Qu\'est-ce que l\'encodage Base64 ?', faq1a: 'L\'encodage Base64 est une methode de conversion de donnees binaires en format texte utilisant 64 caracteres ASCII imprimables.', faq2q: 'Quand utiliser l\'encodage Base64 ?', faq2a: 'Utilisez l\'encodage Base64 pour integrer des donnees binaires dans des formats textuels comme HTML, CSS ou JSON.', faq3q: 'Quelle est la difference entre Base64 et l\'encodage URL ?', faq3a: 'Base64 convertit les donnees binaires en texte ASCII. L\'encodage URL remplace les caracteres non surs par des valeurs hexadecimales %XX.', crossLinks: 'Outils Base64 associes', errorMsg: 'Erreur d\'encodage.', charCount: 'caracteres', byteCount: 'octets' },
  de: { title: 'Base64 Encoder', description: 'Text sofort in Base64 kodieren.', inputLabel: 'Text zum Kodieren', outputLabel: 'Base64 Ausgabe', inputPlaceholder: 'Text zum Kodieren eingeben...', encode: 'Kodieren', clear: 'Loschen', cheatTitle: 'Base64 Alphabet Referenz', cheatDesc: 'Base64 verwendet 64 Zeichen zur Darstellung binarer Daten als ASCII-Text.', intro: 'Base64 Kodierung wandelt binare Daten in eine sichere ASCII-Zeichenkette um. Verwenden Sie dieses kostenlose Online-Base64-Encoding-Tool.', faq1q: 'Was ist Base64-Kodierung?', faq1a: 'Base64-Kodierung ist eine Methode zur Konvertierung binarer Daten in ein Textformat mit 64 druckbaren ASCII-Zeichen.', faq2q: 'Wann sollte ich Base64 verwenden?', faq2a: 'Verwenden Sie Base64 zum Einbetten binarer Daten in textbasierte Formate wie HTML, CSS oder JSON.', faq3q: 'Was ist der Unterschied zwischen Base64 und URL-Kodierung?', faq3a: 'Base64 konvertiert binare Daten in ASCII-Text. URL-Kodierung ersetzt unsichere Zeichen durch %XX-Hexadezimalwerte.', crossLinks: 'Verwandte Base64 Tools', errorMsg: 'Kodierungsfehler.', charCount: 'Zeichen', byteCount: 'Bytes' },
  es: { title: 'Codificador Base64', description: 'Codifica texto a Base64 al instante.', inputLabel: 'Texto a codificar', outputLabel: 'Salida Base64', inputPlaceholder: 'Ingresa el texto a codificar...', encode: 'Codificar', clear: 'Limpiar', cheatTitle: 'Referencia del Alfabeto Base64', cheatDesc: 'Base64 usa 64 caracteres para representar datos binarios como texto ASCII.', intro: 'La codificacion Base64 convierte datos binarios en una representacion segura de cadena ASCII. Utilice este codificador base64 en linea gratuito.', faq1q: 'Que es la codificacion Base64?', faq1a: 'La codificacion Base64 convierte datos binarios en formato de texto usando 64 caracteres ASCII imprimibles.', faq2q: 'Cuando usar la codificacion Base64?', faq2a: 'Use Base64 para incrustar datos binarios en formatos de texto como HTML, CSS o JSON.', faq3q: 'Cual es la diferencia entre Base64 y codificacion URL?', faq3a: 'Base64 convierte datos binarios en texto ASCII. La codificacion URL reemplaza caracteres inseguros con valores hexadecimales %XX.', crossLinks: 'Herramientas Base64 relacionadas', errorMsg: 'Error de codificacion.', charCount: 'caracteres', byteCount: 'bytes' },
  ja: { title: 'Base64 エンコーダー', description: 'テキストを即座にBase64形式にエンコード。', inputLabel: 'エンコードするテキスト', outputLabel: 'Base64 出力', inputPlaceholder: 'Base64にエンコードするテキストを入力...', encode: 'エンコード', clear: 'クリア', cheatTitle: 'Base64 アルファベット参照', cheatDesc: 'Base64は64文字を使用してバイナリデータをASCIIテキストとして表現します。', intro: 'Base64エンコーディングはバイナリデータを安全なASCII文字列に変換します。この無料オンラインbase64エンコーダーをご利用ください。', faq1q: 'Base64エンコーディングとは？', faq1a: 'Base64エンコーディングは、64の印刷可能なASCII文字を使用してバイナリデータをテキスト形式に変換する方法です。', faq2q: 'Base64をいつ使うべき？', faq2a: 'HTML、CSS、JSONなどのテキストベースのフォーマットにバイナリデータを埋め込む必要がある場合に使用します。', faq3q: 'Base64とURLエンコーディングの違いは？', faq3a: 'Base64はバイナリデータをASCIIテキストに変換します。URLエンコーディングは安全でない文字を%XX16進値に置き換えます。', crossLinks: '関連Base64ツール', errorMsg: 'エンコードエラー。', charCount: '文字', byteCount: 'バイト' },
  ko: { title: 'Base64 인코더', description: '텍스트를 즉시 Base64 형식으로 인코딩합니다.', inputLabel: '인코딩할 텍스트', outputLabel: 'Base64 출력', inputPlaceholder: 'Base64로 인코딩할 텍스트 입력...', encode: '인코딩', clear: '지우기', cheatTitle: 'Base64 알파벳 참조', cheatDesc: 'Base64는 64개의 문자를 사용하여 바이너리 데이터를 ASCII 텍스트로 표현합니다.', intro: 'Base64 인코딩은 바이너리 데이터를 안전한 ASCII 문자열로 변환합니다. 이 무료 온라인 base64 인코더를 사용하세요.', faq1q: 'Base64 인코딩이란?', faq1a: 'Base64 인코딩은 64개의 인쇄 가능한 ASCII 문자를 사용하여 바이너리 데이터를 텍스트 형식으로 변환하는 방법입니다.', faq2q: 'Base64를 언제 사용해야 하나요?', faq2a: 'HTML, CSS, JSON과 같은 텍스트 기반 형식에 바이너리 데이터를 삽입해야 할 때 사용합니다.', faq3q: 'Base64와 URL 인코딩의 차이점은?', faq3a: 'Base64는 바이너리 데이터를 ASCII 텍스트로 변환합니다. URL 인코딩은 안전하지 않은 문자를 %XX 16진수 값으로 대체합니다.', crossLinks: '관련 Base64 도구', errorMsg: '인코딩 오류.', charCount: '문자', byteCount: '바이트' },
  it: { title: 'Encoder Base64', description: 'Codifica testo in Base64 istantaneamente.', inputLabel: 'Testo da codificare', outputLabel: 'Output Base64', inputPlaceholder: 'Inserisci il testo da codificare...', encode: 'Codifica', clear: 'Cancella', cheatTitle: 'Riferimento Alfabeto Base64', cheatDesc: 'Base64 usa 64 caratteri per rappresentare dati binari come testo ASCII.', intro: 'La codifica Base64 converte i dati binari in una rappresentazione stringa ASCII sicura.', faq1q: 'Cos\'e la codifica Base64?', faq1a: 'La codifica Base64 converte i dati binari in formato testo usando 64 caratteri ASCII stampabili.', faq2q: 'Quando usare la codifica Base64?', faq2a: 'Usa Base64 per incorporare dati binari in formati testuali come HTML, CSS o JSON.', faq3q: 'Differenza tra Base64 e codifica URL?', faq3a: 'Base64 converte dati binari in testo ASCII. La codifica URL sostituisce i caratteri non sicuri con valori esadecimali %XX.', crossLinks: 'Strumenti Base64 correlati', errorMsg: 'Errore di codifica.', charCount: 'caratteri', byteCount: 'byte' },
  pt: { title: 'Codificador Base64', description: 'Codifique texto em Base64 instantaneamente.', inputLabel: 'Texto para codificar', outputLabel: 'Saida Base64', inputPlaceholder: 'Digite o texto para codificar...', encode: 'Codificar', clear: 'Limpar', cheatTitle: 'Referencia do Alfabeto Base64', cheatDesc: 'Base64 usa 64 caracteres para representar dados binarios como texto ASCII.', intro: 'A codificacao Base64 converte dados binarios em uma representacao segura de string ASCII.', faq1q: 'O que e codificacao Base64?', faq1a: 'Codificacao Base64 converte dados binarios em formato texto usando 64 caracteres ASCII imprimiveis.', faq2q: 'Quando usar codificacao Base64?', faq2a: 'Use Base64 para incorporar dados binarios em formatos de texto como HTML, CSS ou JSON.', faq3q: 'Diferenca entre Base64 e codificacao URL?', faq3a: 'Base64 converte dados binarios em texto ASCII. Codificacao URL substitui caracteres inseguros por valores hexadecimais %XX.', crossLinks: 'Ferramentas Base64 relacionadas', errorMsg: 'Erro de codificacao.', charCount: 'caracteres', byteCount: 'bytes' },
  nl: { title: 'Base64 Encoder', description: 'Codeer tekst direct naar Base64.', inputLabel: 'Tekst om te coderen', outputLabel: 'Base64 Uitvoer', inputPlaceholder: 'Voer tekst in om te coderen...', encode: 'Coderen', clear: 'Wissen', cheatTitle: 'Base64 Alfabet Referentie', cheatDesc: 'Base64 gebruikt 64 tekens om binaire gegevens als ASCII-tekst weer te geven.', intro: 'Base64-codering zet binaire gegevens om in een veilige ASCII-tekenreeks.', faq1q: 'Wat is Base64-codering?', faq1a: 'Base64-codering converteert binaire gegevens naar tekstformaat met 64 afdrukbare ASCII-tekens.', faq2q: 'Wanneer Base64 gebruiken?', faq2a: 'Gebruik Base64 om binaire gegevens in te bedden in tekstformaten zoals HTML, CSS of JSON.', faq3q: 'Verschil tussen Base64 en URL-codering?', faq3a: 'Base64 converteert binaire gegevens naar ASCII-tekst. URL-codering vervangt onveilige tekens door %XX hexadecimale waarden.', crossLinks: 'Gerelateerde Base64 Tools', errorMsg: 'Coderingsfout.', charCount: 'tekens', byteCount: 'bytes' },
  pl: { title: 'Enkoder Base64', description: 'Koduj tekst do Base64 natychmiast.', inputLabel: 'Tekst do zakodowania', outputLabel: 'Wynik Base64', inputPlaceholder: 'Wprowadz tekst do zakodowania...', encode: 'Koduj', clear: 'Wyczysc', cheatTitle: 'Alfabet Base64', cheatDesc: 'Base64 uzywa 64 znakow do reprezentowania danych binarnych jako tekst ASCII.', intro: 'Kodowanie Base64 konwertuje dane binarne na bezpieczny ciag ASCII.', faq1q: 'Czym jest kodowanie Base64?', faq1a: 'Kodowanie Base64 konwertuje dane binarne do formatu tekstowego za pomoca 64 drukowalnych znakow ASCII.', faq2q: 'Kiedy uzywac Base64?', faq2a: 'Uzywaj Base64 do osadzania danych binarnych w formatach tekstowych jak HTML, CSS lub JSON.', faq3q: 'Roznica miedzy Base64 a kodowaniem URL?', faq3a: 'Base64 konwertuje dane binarne na tekst ASCII. Kodowanie URL zastepuje niebezpieczne znaki wartosciami szesnastkowymi %XX.', crossLinks: 'Powiazane narzedzia Base64', errorMsg: 'Blad kodowania.', charCount: 'znakow', byteCount: 'bajtow' },
  sv: { title: 'Base64 Encoder', description: 'Koda text till Base64 direkt.', inputLabel: 'Text att koda', outputLabel: 'Base64 Utdata', inputPlaceholder: 'Ange text att koda...', encode: 'Koda', clear: 'Rensa', cheatTitle: 'Base64 Alfabet Referens', cheatDesc: 'Base64 anvander 64 tecken for att representera binara data som ASCII-text.', intro: 'Base64-kodning konverterar binara data till en saker ASCII-strangrepresentation.', faq1q: 'Vad ar Base64-kodning?', faq1a: 'Base64-kodning konverterar binara data till textformat med 64 utskrivbara ASCII-tecken.', faq2q: 'Nar anvanda Base64?', faq2a: 'Anvand Base64 for att badda in binara data i textformat som HTML, CSS eller JSON.', faq3q: 'Skillnad mellan Base64 och URL-kodning?', faq3a: 'Base64 konverterar binara data till ASCII-text. URL-kodning ersatter osakra tecken med %XX hexadecimala varden.', crossLinks: 'Relaterade Base64-verktyg', errorMsg: 'Kodningsfel.', charCount: 'tecken', byteCount: 'bytes' },
  no: { title: 'Base64 Encoder', description: 'Kod tekst til Base64 umiddelbart.', inputLabel: 'Tekst a kode', outputLabel: 'Base64 Utdata', inputPlaceholder: 'Skriv inn tekst a kode...', encode: 'Kod', clear: 'Slett', cheatTitle: 'Base64 Alfabet Referanse', cheatDesc: 'Base64 bruker 64 tegn for a representere binare data som ASCII-tekst.', intro: 'Base64-koding konverterer binare data til en sikker ASCII-strengrepresentasjon.', faq1q: 'Hva er Base64-koding?', faq1a: 'Base64-koding konverterer binare data til tekstformat med 64 utskrivbare ASCII-tegn.', faq2q: 'Nar bruke Base64?', faq2a: 'Bruk Base64 for a bygge inn binare data i tekstformater som HTML, CSS eller JSON.', faq3q: 'Forskjell mellom Base64 og URL-koding?', faq3a: 'Base64 konverterer binare data til ASCII-tekst. URL-koding erstatter usikre tegn med %XX heksadesimale verdier.', crossLinks: 'Relaterte Base64-verktoy', errorMsg: 'Kodingsfeil.', charCount: 'tegn', byteCount: 'bytes' },
  id: { title: 'Base64 Encoder', description: 'Encode teks ke Base64 secara instan.', inputLabel: 'Teks untuk di-encode', outputLabel: 'Output Base64', inputPlaceholder: 'Masukkan teks untuk di-encode...', encode: 'Encode', clear: 'Hapus', cheatTitle: 'Referensi Alfabet Base64', cheatDesc: 'Base64 menggunakan 64 karakter untuk merepresentasikan data biner sebagai teks ASCII.', intro: 'Encoding Base64 mengubah data biner menjadi representasi string ASCII yang aman.', faq1q: 'Apa itu encoding Base64?', faq1a: 'Encoding Base64 mengubah data biner menjadi format teks menggunakan 64 karakter ASCII yang dapat dicetak.', faq2q: 'Kapan menggunakan Base64?', faq2a: 'Gunakan Base64 untuk menyisipkan data biner dalam format teks seperti HTML, CSS atau JSON.', faq3q: 'Perbedaan Base64 dan URL encoding?', faq3a: 'Base64 mengubah data biner menjadi teks ASCII. URL encoding mengganti karakter tidak aman dengan nilai heksadesimal %XX.', crossLinks: 'Alat Base64 Terkait', errorMsg: 'Error encoding.', charCount: 'karakter', byteCount: 'byte' },
  th: { title: 'Base64 Encoder', description: 'เข้ารหัสข้อความเป็น Base64 ทันที', inputLabel: 'ข้อความที่ต้องการเข้ารหัส', outputLabel: 'ผลลัพธ์ Base64', inputPlaceholder: 'ป้อนข้อความที่ต้องการเข้ารหัส...', encode: 'เข้ารหัส', clear: 'ล้าง', cheatTitle: 'ตารางอักขระ Base64', cheatDesc: 'Base64 ใช้ 64 อักขระเพื่อแสดงข้อมูลไบนารีเป็นข้อความ ASCII', intro: 'การเข้ารหัส Base64 แปลงข้อมูลไบนารีเป็นสตริง ASCII ที่ปลอดภัย', faq1q: 'การเข้ารหัส Base64 คืออะไร?', faq1a: 'การเข้ารหัส Base64 เป็นวิธีแปลงข้อมูลไบนารีเป็นรูปแบบข้อความโดยใช้อักขระ ASCII 64 ตัว', faq2q: 'เมื่อไหร่ควรใช้ Base64?', faq2a: 'ใช้ Base64 เมื่อต้องฝังข้อมูลไบนารีในรูปแบบข้อความเช่น HTML, CSS หรือ JSON', faq3q: 'Base64 กับ URL encoding ต่างกันอย่างไร?', faq3a: 'Base64 แปลงข้อมูลไบนารีเป็นข้อความ ASCII URL encoding แทนที่อักขระที่ไม่ปลอดภัยด้วยค่าฐานสิบหก %XX', crossLinks: 'เครื่องมือ Base64 ที่เกี่ยวข้อง', errorMsg: 'ข้อผิดพลาดในการเข้ารหัส', charCount: 'อักขระ', byteCount: 'ไบต์' },
};

const base64Alphabet = [
  { range: '0-25', chars: 'A B C D E F G H I J K L M N O P Q R S T U V W X Y Z' },
  { range: '26-51', chars: 'a b c d e f g h i j k l m n o p q r s t u v w x y z' },
  { range: '52-61', chars: '0 1 2 3 4 5 6 7 8 9' },
  { range: '62', chars: '+' },
  { range: '63', chars: '/' },
  { range: 'Pad', chars: '=' },
];

export default function Base64EncoderPage() {
  const { lang } = useLang();
  const ui = t[lang] || t.en;
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');

  const handleEncode = () => {
    try {
      setError('');
      if (!input) { setOutput(''); return; }
      setOutput(btoa(unescape(encodeURIComponent(input))));
    } catch {
      setError(ui.errorMsg);
      setOutput('');
    }
  };

  const handleClear = () => {
    setInput('');
    setOutput('');
    setError('');
  };

  const inputBytes = new TextEncoder().encode(input).length;

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: ui.faq1q, acceptedAnswer: { '@type': 'Answer', text: ui.faq1a } },
      { '@type': 'Question', name: ui.faq2q, acceptedAnswer: { '@type': 'Answer', text: ui.faq2a } },
      { '@type': 'Question', name: ui.faq3q, acceptedAnswer: { '@type': 'Answer', text: ui.faq3a } },
    ],
  };

  return (
    <ToolLayout title={ui.title} description={ui.description} toolId="base64-encoder">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* Intro */}
      <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 20 }}>
        {ui.intro}
      </p>

      {/* Tool UI */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        <button onClick={handleEncode} className="btn btn-primary">{ui.encode} &rarr;</button>
        <button onClick={handleClear} className="btn btn-secondary">{ui.clear}</button>
      </div>

      {error && (
        <div style={{ background: 'rgba(244,63,94,0.1)', border: '1px solid rgba(244,63,94,0.3)', borderRadius: 8, padding: '10px 14px', marginBottom: 16, fontSize: 13, color: 'var(--accent-rose)' }}>
          {error}
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
            <label style={{ fontSize: 13, fontWeight: 600 }}>{ui.inputLabel}</label>
            <span style={{ fontSize: 11, color: 'var(--text-secondary)' }}>{input.length} {ui.charCount} / {inputBytes} {ui.byteCount}</span>
          </div>
          <textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) handleEncode(); }}
            placeholder={ui.inputPlaceholder}
            style={{ minHeight: 250 }}
          />
        </div>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
            <label style={{ fontSize: 13, fontWeight: 600 }}>{ui.outputLabel}</label>
            <CopyButton text={output} />
          </div>
          <textarea
            value={output}
            readOnly
            style={{ minHeight: 250, opacity: output ? 1 : 0.5 }}
          />
        </div>
      </div>

      {/* Cheat Sheet */}
      <div style={{ marginTop: 30, paddingTop: 20, borderTop: '1px solid var(--border-color)' }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>{ui.cheatTitle}</h2>
        <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 16, lineHeight: 1.6 }}>{ui.cheatDesc}</p>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--border-color)' }}>
                <th style={{ padding: '8px 12px', textAlign: 'left', color: 'var(--text-secondary)', fontWeight: 600 }}>Index</th>
                <th style={{ padding: '8px 12px', textAlign: 'left', color: 'var(--text-secondary)', fontWeight: 600 }}>Characters</th>
              </tr>
            </thead>
            <tbody>
              {base64Alphabet.map((row, i) => (
                <tr key={i} style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '8px 12px', fontFamily: 'monospace', fontWeight: 600, color: 'var(--accent-blue)' }}>{row.range}</td>
                  <td style={{ padding: '8px 12px', fontFamily: 'monospace', letterSpacing: 2 }}>{row.chars}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Cross Links */}
      <div style={{ marginTop: 24, paddingTop: 16, borderTop: '1px solid var(--border-color)' }}>
        <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 12, color: 'var(--text-secondary)' }}>{ui.crossLinks}</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {[
            { href: `/${lang}/tools/base64`, label: 'Base64 Encoder/Decoder' },
            { href: `/${lang}/tools/base64-decoder`, label: 'Base64 Decoder' },
            { href: `/${lang}/tools/base64-to-hex`, label: 'Base64 to Hex' },
            { href: `/${lang}/tools/string-to-base64`, label: 'String to Base64' },
            { href: `/${lang}/tools/image-base64`, label: 'Image Base64' },
          ].map(link => (
            <Link key={link.href} href={link.href} style={{ fontSize: 12, color: 'var(--accent-blue)', textDecoration: 'none', padding: '4px 10px', borderRadius: 6, border: '1px solid var(--border-color)', background: 'var(--bg-card)' }}>
              {link.label}
            </Link>
          ))}
        </div>
      </div>

      {/* FAQ */}
      <div style={{ marginTop: 24, paddingTop: 16, borderTop: '1px solid var(--border-color)' }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 14 }}>FAQ</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {[
            { q: ui.faq1q, a: ui.faq1a },
            { q: ui.faq2q, a: ui.faq2a },
            { q: ui.faq3q, a: ui.faq3a },
          ].map((faq, idx) => (
            <details key={idx} style={{ border: '1px solid var(--border-color)', borderRadius: 8, overflow: 'hidden', background: 'var(--bg-input)' }}>
              <summary style={{ padding: '14px 16px', cursor: 'pointer', fontSize: 14, fontWeight: 600, color: 'var(--text-primary)' }}>
                {faq.q}
              </summary>
              <div style={{ padding: '0 16px 14px', fontSize: 13, lineHeight: 1.7, color: 'var(--text-secondary)' }}>
                {faq.a}
              </div>
            </details>
          ))}
        </div>
      </div>
    </ToolLayout>
  );
}
