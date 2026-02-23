'use client';
import React, { useState } from 'react';

const translations: Record<string, Record<string, string>> = {
  en: { title: 'HTML Encoder Online', subtitle: 'Encode & Decode HTML Entities Free', inputLabel: 'Input Text', outputLabel: 'Encoded Output', encodeBtn: 'Encode HTML', decodeBtn: 'Decode HTML', copyBtn: 'Copy', copied: 'Copied!', placeholder: 'Enter text with special characters like <, >, &, "', faqTitle: 'Frequently Asked Questions', faq1q: 'What are HTML entities?', faq1a: 'HTML entities are special codes used to represent characters that have special meaning in HTML, like < (&lt;), > (&gt;), & (&amp;), and " (&quot;).', faq2q: 'When should I encode HTML?', faq2a: 'Always encode user input before displaying it in HTML to prevent XSS attacks. Encode any text that might contain <, >, &, or " characters.', faq3q: 'What is the difference between HTML encoding and URL encoding?', faq3a: 'HTML encoding converts special HTML characters to entity codes (&lt;, &gt;, etc.). URL encoding converts characters for safe use in URLs (%3C, %3E, etc.). They serve different purposes.' },
  fr: { title: 'Encodeur HTML en Ligne', subtitle: 'Encoder et Décoder les Entités HTML Gratuitement', inputLabel: 'Texte d\'entrée', outputLabel: 'Sortie encodée', encodeBtn: 'Encoder HTML', decodeBtn: 'Décoder HTML', copyBtn: 'Copier', copied: 'Copié !', placeholder: 'Entrez du texte avec des caractères spéciaux comme <, >, &, "', faqTitle: 'Questions fréquentes', faq1q: 'Qu\'est-ce que les entités HTML ?', faq1a: 'Les entités HTML sont des codes spéciaux pour représenter des caractères ayant une signification spéciale en HTML.', faq2q: 'Quand dois-je encoder le HTML ?', faq2a: 'Toujours encoder les entrées utilisateur avant de les afficher en HTML pour prévenir les attaques XSS.', faq3q: 'Différence entre encodage HTML et URL ?', faq3a: 'L\'encodage HTML convertit les caractères spéciaux en codes d\'entités. L\'encodage URL les convertit pour utilisation dans les URLs.' },
  de: { title: 'HTML-Encoder Online', subtitle: 'HTML-Entitäten kostenlos kodieren und dekodieren', inputLabel: 'Eingabetext', outputLabel: 'Kodierte Ausgabe', encodeBtn: 'HTML kodieren', decodeBtn: 'HTML dekodieren', copyBtn: 'Kopieren', copied: 'Kopiert!', placeholder: 'Text mit Sonderzeichen eingeben wie <, >, &, "', faqTitle: 'Häufig gestellte Fragen', faq1q: 'Was sind HTML-Entitäten?', faq1a: 'HTML-Entitäten sind spezielle Codes für Zeichen mit besonderer Bedeutung in HTML.', faq2q: 'Wann sollte ich HTML kodieren?', faq2a: 'Immer Benutzereingaben kodieren, bevor sie in HTML angezeigt werden, um XSS-Angriffe zu verhindern.', faq3q: 'Unterschied zwischen HTML- und URL-Kodierung?', faq3a: 'HTML-Kodierung wandelt Sonderzeichen in Entity-Codes um. URL-Kodierung wandelt sie für die URL-Verwendung um.' },
  es: { title: 'Codificador HTML en Línea', subtitle: 'Codificar y Decodificar Entidades HTML Gratis', inputLabel: 'Texto de entrada', outputLabel: 'Salida codificada', encodeBtn: 'Codificar HTML', decodeBtn: 'Decodificar HTML', copyBtn: 'Copiar', copied: '¡Copiado!', placeholder: 'Ingrese texto con caracteres especiales como <, >, &, "', faqTitle: 'Preguntas frecuentes', faq1q: '¿Qué son las entidades HTML?', faq1a: 'Las entidades HTML son códigos especiales para representar caracteres con significado especial en HTML.', faq2q: '¿Cuándo debo codificar HTML?', faq2a: 'Siempre codifique la entrada del usuario antes de mostrarla en HTML para prevenir ataques XSS.', faq3q: '¿Diferencia entre codificación HTML y URL?', faq3a: 'La codificación HTML convierte caracteres especiales en códigos de entidad. La codificación URL los convierte para uso en URLs.' },
  it: { title: 'Codificatore HTML Online', subtitle: 'Codifica e Decodifica Entità HTML Gratis', inputLabel: 'Testo di input', outputLabel: 'Output codificato', encodeBtn: 'Codifica HTML', decodeBtn: 'Decodifica HTML', copyBtn: 'Copia', copied: 'Copiato!', placeholder: 'Inserisci testo con caratteri speciali come <, >, &, "', faqTitle: 'Domande frequenti', faq1q: 'Cosa sono le entità HTML?', faq1a: 'Le entità HTML sono codici speciali per caratteri con significato speciale in HTML.', faq2q: 'Quando devo codificare HTML?', faq2a: 'Codifica sempre l\'input utente prima di mostrarlo in HTML per prevenire attacchi XSS.', faq3q: 'Differenza tra codifica HTML e URL?', faq3a: 'La codifica HTML converte caratteri speciali in codici entità. La codifica URL li converte per l\'uso negli URL.' },
  pt: { title: 'Codificador HTML Online', subtitle: 'Codificar e Decodificar Entidades HTML Grátis', inputLabel: 'Texto de entrada', outputLabel: 'Saída codificada', encodeBtn: 'Codificar HTML', decodeBtn: 'Decodificar HTML', copyBtn: 'Copiar', copied: 'Copiado!', placeholder: 'Digite texto com caracteres especiais como <, >, &, "', faqTitle: 'Perguntas frequentes', faq1q: 'O que são entidades HTML?', faq1a: 'Entidades HTML são códigos especiais para caracteres com significado especial em HTML.', faq2q: 'Quando devo codificar HTML?', faq2a: 'Sempre codifique a entrada do usuário antes de exibi-la em HTML para prevenir ataques XSS.', faq3q: 'Diferença entre codificação HTML e URL?', faq3a: 'A codificação HTML converte caracteres especiais em códigos de entidade. A codificação URL os converte para uso em URLs.' },
  nl: { title: 'HTML-Encoder Online', subtitle: 'HTML-Entiteiten Gratis Encoderen en Decoderen', inputLabel: 'Invoertekst', outputLabel: 'Gecodeerde uitvoer', encodeBtn: 'HTML encoderen', decodeBtn: 'HTML decoderen', copyBtn: 'Kopiëren', copied: 'Gekopieerd!', placeholder: 'Voer tekst in met speciale tekens zoals <, >, &, "', faqTitle: 'Veelgestelde vragen', faq1q: 'Wat zijn HTML-entiteiten?', faq1a: 'HTML-entiteiten zijn speciale codes voor tekens met een speciale betekenis in HTML.', faq2q: 'Wanneer moet ik HTML encoderen?', faq2a: 'Altijd gebruikersinvoer encoderen voordat deze in HTML wordt weergegeven om XSS-aanvallen te voorkomen.', faq3q: 'Verschil tussen HTML- en URL-codering?', faq3a: 'HTML-codering converteert speciale tekens naar entiteitscodes. URL-codering converteert ze voor gebruik in URLs.' },
  pl: { title: 'Koder HTML Online', subtitle: 'Koduj i Dekoduj Encje HTML Za Darmo', inputLabel: 'Tekst wejściowy', outputLabel: 'Zakodowane wyjście', encodeBtn: 'Koduj HTML', decodeBtn: 'Dekoduj HTML', copyBtn: 'Kopiuj', copied: 'Skopiowano!', placeholder: 'Wprowadź tekst ze znakami specjalnymi jak <, >, &, "', faqTitle: 'Często zadawane pytania', faq1q: 'Co to są encje HTML?', faq1a: 'Encje HTML to specjalne kody dla znaków o specjalnym znaczeniu w HTML.', faq2q: 'Kiedy powinienem kodować HTML?', faq2a: 'Zawsze koduj dane użytkownika przed wyświetleniem ich w HTML, aby zapobiec atakom XSS.', faq3q: 'Różnica między kodowaniem HTML a URL?', faq3a: 'Kodowanie HTML konwertuje znaki specjalne na kody encji. Kodowanie URL konwertuje je do użycia w URL-ach.' },
  sv: { title: 'HTML-Kodare Online', subtitle: 'Koda och Avkoda HTML-Entiteter Gratis', inputLabel: 'Inmatningstext', outputLabel: 'Kodad utdata', encodeBtn: 'Koda HTML', decodeBtn: 'Avkoda HTML', copyBtn: 'Kopiera', copied: 'Kopierat!', placeholder: 'Ange text med specialtecken som <, >, &, "', faqTitle: 'Vanliga frågor', faq1q: 'Vad är HTML-entiteter?', faq1a: 'HTML-entiteter är speciella koder för tecken med speciell betydelse i HTML.', faq2q: 'När ska jag koda HTML?', faq2a: 'Koda alltid användarinmatning innan den visas i HTML för att förhindra XSS-attacker.', faq3q: 'Skillnad mellan HTML- och URL-kodning?', faq3a: 'HTML-kodning konverterar specialtecken till entitetskoder. URL-kodning konverterar dem för användning i URL:er.' },
  no: { title: 'HTML-Koder Online', subtitle: 'Kode og Dekode HTML-Enheter Gratis', inputLabel: 'Inntekst', outputLabel: 'Kodet utdata', encodeBtn: 'Kode HTML', decodeBtn: 'Dekode HTML', copyBtn: 'Kopier', copied: 'Kopiert!', placeholder: 'Skriv inn tekst med spesialtegn som <, >, &, "', faqTitle: 'Vanlige spørsmål', faq1q: 'Hva er HTML-enheter?', faq1a: 'HTML-enheter er spesielle koder for tegn med spesiell betydning i HTML.', faq2q: 'Når bør jeg kode HTML?', faq2a: 'Alltid kode brukerinndata før det vises i HTML for å forhindre XSS-angrep.', faq3q: 'Forskjell mellom HTML- og URL-koding?', faq3a: 'HTML-koding konverterer spesialtegn til enhetskoder. URL-koding konverterer dem for bruk i URL-er.' },
  zh: { title: 'HTML编码器在线', subtitle: '免费在线编码和解码HTML实体', inputLabel: '输入文本', outputLabel: '编码输出', encodeBtn: '编码HTML', decodeBtn: '解码HTML', copyBtn: '复制', copied: '已复制！', placeholder: '输入包含特殊字符的文本，如 <, >, &, "', faqTitle: '常见问题', faq1q: '什么是HTML实体？', faq1a: 'HTML实体是用于表示HTML中具有特殊含义的字符的特殊代码，如 < (&lt;)、> (&gt;)、& (&amp;)。', faq2q: '什么时候需要编码HTML？', faq2a: '在将用户输入显示为HTML之前始终进行编码，以防止XSS攻击。', faq3q: 'HTML编码和URL编码有什么区别？', faq3a: 'HTML编码将特殊字符转换为实体代码。URL编码将字符转换为URL安全格式。' },
  ja: { title: 'HTMLエンコーダーオンライン', subtitle: 'HTMLエンティティを無料でエンコード・デコード', inputLabel: '入力テキスト', outputLabel: 'エンコード出力', encodeBtn: 'HTMLエンコード', decodeBtn: 'HTMLデコード', copyBtn: 'コピー', copied: 'コピーしました！', placeholder: '<, >, &, "などの特殊文字を含むテキストを入力', faqTitle: 'よくある質問', faq1q: 'HTMLエンティティとは？', faq1a: 'HTMLエンティティはHTMLで特別な意味を持つ文字を表すための特殊なコードです。', faq2q: 'HTMLをエンコードする必要があるのはいつですか？', faq2a: 'XSS攻撃を防ぐために、HTMLに表示する前にユーザー入力を常にエンコードしてください。', faq3q: 'HTMLエンコードとURLエンコードの違いは？', faq3a: 'HTMLエンコードは特殊文字をエンティティコードに変換します。URLエンコードはURL用に変換します。' },
  ko: { title: 'HTML 인코더 온라인', subtitle: 'HTML 엔티티 무료 인코딩 및 디코딩', inputLabel: '입력 텍스트', outputLabel: '인코딩된 출력', encodeBtn: 'HTML 인코딩', decodeBtn: 'HTML 디코딩', copyBtn: '복사', copied: '복사됨!', placeholder: '<, >, &, "와 같은 특수 문자가 포함된 텍스트 입력', faqTitle: '자주 묻는 질문', faq1q: 'HTML 엔티티란?', faq1a: 'HTML 엔티티는 HTML에서 특별한 의미를 갖는 문자를 나타내는 특수 코드입니다.', faq2q: 'HTML을 인코딩해야 할 때는?', faq2a: 'XSS 공격을 방지하기 위해 HTML에 표시하기 전에 항상 사용자 입력을 인코딩하세요.', faq3q: 'HTML 인코딩과 URL 인코딩의 차이점은?', faq3a: 'HTML 인코딩은 특수 문자를 엔티티 코드로 변환합니다. URL 인코딩은 URL 사용을 위해 변환합니다.' },
  id: { title: 'HTML Encoder Online', subtitle: 'Encode dan Decode HTML Entities Gratis', inputLabel: 'Teks input', outputLabel: 'Output yang dikodekan', encodeBtn: 'Encode HTML', decodeBtn: 'Decode HTML', copyBtn: 'Salin', copied: 'Disalin!', placeholder: 'Masukkan teks dengan karakter khusus seperti <, >, &, "', faqTitle: 'Pertanyaan yang sering diajukan', faq1q: 'Apa itu entitas HTML?', faq1a: 'Entitas HTML adalah kode khusus untuk karakter yang memiliki arti khusus dalam HTML.', faq2q: 'Kapan harus mengkodekan HTML?', faq2a: 'Selalu kodekan input pengguna sebelum menampilkannya di HTML untuk mencegah serangan XSS.', faq3q: 'Perbedaan antara pengkodean HTML dan URL?', faq3a: 'Pengkodean HTML mengubah karakter khusus menjadi kode entitas. Pengkodean URL mengubahnya untuk penggunaan URL.' },
  th: { title: 'HTML Encoder ออนไลน์', subtitle: 'เข้ารหัสและถอดรหัส HTML Entities ฟรี', inputLabel: 'ข้อความนำเข้า', outputLabel: 'ผลลัพธ์ที่เข้ารหัส', encodeBtn: 'เข้ารหัส HTML', decodeBtn: 'ถอดรหัส HTML', copyBtn: 'คัดลอก', copied: 'คัดลอกแล้ว!', placeholder: 'ป้อนข้อความที่มีอักขระพิเศษเช่น <, >, &, "', faqTitle: 'คำถามที่พบบ่อย', faq1q: 'HTML entities คืออะไร?', faq1a: 'HTML entities คือรหัสพิเศษสำหรับอักขระที่มีความหมายพิเศษใน HTML', faq2q: 'เมื่อใดควรเข้ารหัส HTML?', faq2a: 'เข้ารหัส input ของผู้ใช้เสมอก่อนแสดงใน HTML เพื่อป้องกันการโจมตี XSS', faq3q: 'ความแตกต่างระหว่างการเข้ารหัส HTML และ URL?', faq3a: 'การเข้ารหัส HTML แปลงอักขระพิเศษเป็นรหัส entity การเข้ารหัส URL แปลงเพื่อใช้ใน URL' },
};

function encodeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .replace(/\//g, '&#x2F;');
}

function decodeHtml(str: string): string {
  return str
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#x2F;/g, '/');
}

export default function HtmlEncoderOnlinePage({ params }: { params: { lang: string } }) {
  const lang = params?.lang || 'en';
  const tr = translations[lang] || translations.en;
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);

  const handleEncode = () => setOutput(encodeHtml(input));
  const handleDecode = () => setOutput(decodeHtml(input));

  const handleCopy = async () => {
    if (!output) return;
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const examples = [
    { input: '<script>alert("XSS")</script>', encoded: '&lt;script&gt;alert(&quot;XSS&quot;)&lt;/script&gt;' },
    { input: 'AT&T <strong>bold</strong>', encoded: 'AT&amp;T &lt;strong&gt;bold&lt;/strong&gt;' },
    { input: '<a href="/page">Link</a>', encoded: '&lt;a href=&quot;/page&quot;&gt;Link&lt;/a&gt;' },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">{tr.title}</h1>
      <p className="text-blue-600 font-medium mb-6">{tr.subtitle}</p>

      <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6 shadow-sm">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">{tr.inputLabel}</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={tr.placeholder}
            className="w-full h-36 p-3 border border-gray-300 rounded-lg font-mono text-sm resize-y focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="flex gap-3 mb-4">
          <button
            onClick={handleEncode}
            className="px-5 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            {tr.encodeBtn}
          </button>
          <button
            onClick={handleDecode}
            className="px-5 py-2.5 bg-gray-600 text-white font-medium rounded-lg hover:bg-gray-700 transition-colors"
          >
            {tr.decodeBtn}
          </button>
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium text-gray-700">{tr.outputLabel}</label>
            <button
              onClick={handleCopy}
              disabled={!output}
              className="px-3 py-1.5 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              {copied ? tr.copied : tr.copyBtn}
            </button>
          </div>
          <textarea
            readOnly
            value={output}
            className="w-full h-36 p-3 border border-gray-300 rounded-lg font-mono text-sm bg-gray-50 resize-y"
          />
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Common HTML Encoding Examples</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50">
                <th className="text-left p-3 font-semibold text-gray-700 border-b">Character</th>
                <th className="text-left p-3 font-semibold text-gray-700 border-b">HTML Entity</th>
                <th className="text-left p-3 font-semibold text-gray-700 border-b">Description</th>
              </tr>
            </thead>
            <tbody>
              {[
                { char: '<', entity: '&lt;', desc: 'Less than' },
                { char: '>', entity: '&gt;', desc: 'Greater than' },
                { char: '&', entity: '&amp;', desc: 'Ampersand' },
                { char: '"', entity: '&quot;', desc: 'Double quote' },
                { char: "'", entity: '&#39;', desc: 'Single quote' },
                { char: '©', entity: '&copy;', desc: 'Copyright' },
                { char: '®', entity: '&reg;', desc: 'Registered' },
                { char: '—', entity: '&mdash;', desc: 'Em dash' },
              ].map((row) => (
                <tr key={row.char} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="p-3 font-mono font-bold text-red-600">{row.char}</td>
                  <td className="p-3 font-mono text-blue-600">{row.entity}</td>
                  <td className="p-3 text-gray-600">{row.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Real-World Examples</h2>
        <div className="space-y-4">
          {examples.map((ex, i) => (
            <div key={i} className="border rounded-lg overflow-hidden">
              <div className="bg-gray-50 px-3 py-2">
                <span className="text-xs font-medium text-gray-500">Input:</span>
                <code className="ml-2 text-sm font-mono text-red-600">{ex.input}</code>
              </div>
              <div className="px-3 py-2">
                <span className="text-xs font-medium text-gray-500">Encoded:</span>
                <code className="ml-2 text-sm font-mono text-blue-600">{ex.encoded}</code>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">{tr.faqTitle}</h2>
        <div className="space-y-4">
          {[
            { q: tr.faq1q, a: tr.faq1a },
            { q: tr.faq2q, a: tr.faq2a },
            { q: tr.faq3q, a: tr.faq3a },
          ].map((item, i) => (
            <div key={i} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
              <h3 className="font-semibold text-gray-900 mb-2">{item.q}</h3>
              <p className="text-gray-600 text-sm">{item.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
