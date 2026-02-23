'use client';
import React, { useState } from 'react';

const t: Record<string, Record<string, string>> = {
  en: { title: 'URL Encoder Online', subtitle: 'Encode & Decode URLs Instantly — Free', inputLabel: 'Input URL / Text', outputLabel: 'Encoded Output', encodeBtn: 'URL Encode', decodeBtn: 'URL Decode', copyBtn: 'Copy', copied: 'Copied!', placeholder: 'Enter URL or text to encode...', desc: 'URL encoding (percent-encoding) converts characters that are not allowed in URLs into a format that can be transmitted over the Internet. Special characters are replaced with a percent sign (%) followed by two hexadecimal digits.', faq: 'FAQ', faq1q: 'What is URL encoding?', faq1a: 'URL encoding replaces unsafe ASCII characters with "%" followed by two hexadecimal digits. For example, a space becomes %20, and < becomes %3C. This ensures the URL remains valid across all systems.', faq2q: 'When do I need URL encoding?', faq2a: 'You need URL encoding when passing special characters in query parameters (?, &, =), form submissions, API calls, or any time characters like spaces, &, #, or non-ASCII characters appear in a URL.', faq3q: 'What is the difference between encodeURI and encodeURIComponent in JavaScript?', faq3a: 'encodeURI encodes a full URL and skips characters like : / ? # & = . encodeURIComponent encodes a URL component (like a query parameter value) and encodes those characters too. Use encodeURIComponent for individual values.', relatedTitle: 'Related Tools' },
  fr: { title: 'Encodeur URL en Ligne', subtitle: 'Encodez et Décodez les URLs Instantanément — Gratuit', inputLabel: 'URL / Texte d\'entrée', outputLabel: 'Sortie encodée', encodeBtn: 'Encoder URL', decodeBtn: 'Décoder URL', copyBtn: 'Copier', copied: 'Copié!', placeholder: 'Entrez l\'URL ou le texte à encoder...', desc: 'L\'encodage URL convertit les caractères non autorisés dans les URLs en un format pouvant être transmis sur Internet.', faq: 'FAQ', faq1q: 'Qu\'est-ce que l\'encodage URL ?', faq1a: 'L\'encodage URL remplace les caractères ASCII non sûrs par "%" suivi de deux chiffres hexadécimaux.', faq2q: 'Quand ai-je besoin de l\'encodage URL ?', faq2a: 'Vous avez besoin de l\'encodage URL lors du passage de caractères spéciaux dans les paramètres de requête.', faq3q: 'Différence entre encodeURI et encodeURIComponent en JavaScript ?', faq3a: 'encodeURI encode une URL complète. encodeURIComponent encode un composant d\'URL. Utilisez encodeURIComponent pour les valeurs individuelles.', relatedTitle: 'Outils associés' },
  de: { title: 'URL-Encoder Online', subtitle: 'URLs sofort kodieren und dekodieren — Kostenlos', inputLabel: 'Eingangs-URL / Text', outputLabel: 'Kodierte Ausgabe', encodeBtn: 'URL kodieren', decodeBtn: 'URL dekodieren', copyBtn: 'Kopieren', copied: 'Kopiert!', placeholder: 'URL oder Text zum Kodieren eingeben...', desc: 'URL-Kodierung konvertiert nicht erlaubte Zeichen in URLs in ein Format, das über das Internet übertragen werden kann.', faq: 'FAQ', faq1q: 'Was ist URL-Kodierung?', faq1a: 'URL-Kodierung ersetzt unsichere ASCII-Zeichen durch "%" gefolgt von zwei hexadezimalen Ziffern.', faq2q: 'Wann brauche ich URL-Kodierung?', faq2a: 'Sie benötigen URL-Kodierung beim Übergeben von Sonderzeichen in Query-Parametern.', faq3q: 'Unterschied zwischen encodeURI und encodeURIComponent in JavaScript?', faq3a: 'encodeURI kodiert eine vollständige URL. encodeURIComponent kodiert einen URL-Komponenten. Verwenden Sie encodeURIComponent für einzelne Werte.', relatedTitle: 'Verwandte Tools' },
  es: { title: 'Codificador URL Online', subtitle: 'Codifique y Decodifique URLs Instantáneamente — Gratis', inputLabel: 'URL / Texto de entrada', outputLabel: 'Salida codificada', encodeBtn: 'Codificar URL', decodeBtn: 'Decodificar URL', copyBtn: 'Copiar', copied: '¡Copiado!', placeholder: 'Ingrese URL o texto para codificar...', desc: 'La codificación URL convierte caracteres no permitidos en URLs en un formato que se puede transmitir por Internet.', faq: 'FAQ', faq1q: '¿Qué es la codificación URL?', faq1a: 'La codificación URL reemplaza caracteres ASCII no seguros con "%" seguido de dos dígitos hexadecimales.', faq2q: '¿Cuándo necesito la codificación URL?', faq2a: 'Necesita codificación URL cuando pasa caracteres especiales en parámetros de consulta.', faq3q: '¿Diferencia entre encodeURI y encodeURIComponent en JavaScript?', faq3a: 'encodeURI codifica una URL completa. encodeURIComponent codifica un componente de URL. Use encodeURIComponent para valores individuales.', relatedTitle: 'Herramientas relacionadas' },
  it: { title: 'Codificatore URL Online', subtitle: 'Codifica e Decodifica URL Istantaneamente — Gratis', inputLabel: 'URL / Testo di input', outputLabel: 'Output codificato', encodeBtn: 'Codifica URL', decodeBtn: 'Decodifica URL', copyBtn: 'Copia', copied: 'Copiato!', placeholder: 'Inserisci URL o testo da codificare...', desc: 'La codifica URL converte i caratteri non consentiti negli URL in un formato che può essere trasmesso su Internet.', faq: 'FAQ', faq1q: 'Cos\'è la codifica URL?', faq1a: 'La codifica URL sostituisce i caratteri ASCII non sicuri con "%" seguito da due cifre esadecimali.', faq2q: 'Quando ho bisogno della codifica URL?', faq2a: 'Hai bisogno della codifica URL quando passi caratteri speciali nei parametri di query.', faq3q: 'Differenza tra encodeURI e encodeURIComponent in JavaScript?', faq3a: 'encodeURI codifica un URL completo. encodeURIComponent codifica un componente URL. Usa encodeURIComponent per valori individuali.', relatedTitle: 'Strumenti correlati' },
  pt: { title: 'Codificador URL Online', subtitle: 'Codifique e Decodifique URLs Instantaneamente — Grátis', inputLabel: 'URL / Texto de entrada', outputLabel: 'Saída codificada', encodeBtn: 'Codificar URL', decodeBtn: 'Decodificar URL', copyBtn: 'Copiar', copied: 'Copiado!', placeholder: 'Digite URL ou texto para codificar...', desc: 'A codificação URL converte caracteres não permitidos em URLs em um formato que pode ser transmitido pela Internet.', faq: 'FAQ', faq1q: 'O que é codificação URL?', faq1a: 'A codificação URL substitui caracteres ASCII não seguros por "%" seguido de dois dígitos hexadecimais.', faq2q: 'Quando preciso de codificação URL?', faq2a: 'Você precisa de codificação URL ao passar caracteres especiais em parâmetros de consulta.', faq3q: 'Diferença entre encodeURI e encodeURIComponent em JavaScript?', faq3a: 'encodeURI codifica uma URL completa. encodeURIComponent codifica um componente de URL. Use encodeURIComponent para valores individuais.', relatedTitle: 'Ferramentas relacionadas' },
  nl: { title: 'URL-Encoder Online', subtitle: 'URL\'s Onmiddellijk Encoderen en Decoderen — Gratis', inputLabel: 'Invoer URL / Tekst', outputLabel: 'Gecodeerde uitvoer', encodeBtn: 'URL encoderen', decodeBtn: 'URL decoderen', copyBtn: 'Kopiëren', copied: 'Gekopieerd!', placeholder: 'Voer URL of tekst in om te coderen...', desc: 'URL-codering converteert niet-toegestane tekens in URL\'s naar een formaat dat via internet kan worden verzonden.', faq: 'FAQ', faq1q: 'Wat is URL-codering?', faq1a: 'URL-codering vervangt onveilige ASCII-tekens door "%" gevolgd door twee hexadecimale cijfers.', faq2q: 'Wanneer heb ik URL-codering nodig?', faq2a: 'U heeft URL-codering nodig bij het doorgeven van speciale tekens in queryparameters.', faq3q: 'Verschil tussen encodeURI en encodeURIComponent in JavaScript?', faq3a: 'encodeURI codeert een volledige URL. encodeURIComponent codeert een URL-component. Gebruik encodeURIComponent voor individuele waarden.', relatedTitle: 'Gerelateerde tools' },
  pl: { title: 'Koder URL Online', subtitle: 'Koduj i Dekoduj URL-e Natychmiastowo — Bezpłatnie', inputLabel: 'Wejściowy URL / Tekst', outputLabel: 'Zakodowane wyjście', encodeBtn: 'Koduj URL', decodeBtn: 'Dekoduj URL', copyBtn: 'Kopiuj', copied: 'Skopiowano!', placeholder: 'Wprowadź URL lub tekst do zakodowania...', desc: 'Kodowanie URL konwertuje niedozwolone znaki w URL-ach na format, który może być przesyłany przez Internet.', faq: 'FAQ', faq1q: 'Co to jest kodowanie URL?', faq1a: 'Kodowanie URL zastępuje niebezpieczne znaki ASCII przez "%" i dwie cyfry szesnastkowe.', faq2q: 'Kiedy potrzebuję kodowania URL?', faq2a: 'Kodowania URL potrzebujesz przy przekazywaniu znaków specjalnych w parametrach zapytania.', faq3q: 'Różnica między encodeURI a encodeURIComponent w JavaScript?', faq3a: 'encodeURI koduje cały URL. encodeURIComponent koduje komponent URL. Użyj encodeURIComponent dla poszczególnych wartości.', relatedTitle: 'Powiązane narzędzia' },
  sv: { title: 'URL-Kodare Online', subtitle: 'Koda och Avkoda URL:er Omedelbart — Gratis', inputLabel: 'Inmatnings-URL / Text', outputLabel: 'Kodad utdata', encodeBtn: 'Koda URL', decodeBtn: 'Avkoda URL', copyBtn: 'Kopiera', copied: 'Kopierat!', placeholder: 'Ange URL eller text att koda...', desc: 'URL-kodning konverterar otillåtna tecken i URL:er till ett format som kan sändas via Internet.', faq: 'FAQ', faq1q: 'Vad är URL-kodning?', faq1a: 'URL-kodning ersätter osäkra ASCII-tecken med "%" följt av två hexadecimala siffror.', faq2q: 'När behöver jag URL-kodning?', faq2a: 'Du behöver URL-kodning när du skickar specialtecken i frågeparametrar.', faq3q: 'Skillnad mellan encodeURI och encodeURIComponent i JavaScript?', faq3a: 'encodeURI kodar en fullständig URL. encodeURIComponent kodar en URL-komponent. Använd encodeURIComponent för enskilda värden.', relatedTitle: 'Relaterade verktyg' },
  no: { title: 'URL-Koder Online', subtitle: 'Kode og Dekode URL-er Umiddelbart — Gratis', inputLabel: 'Inngangs-URL / Tekst', outputLabel: 'Kodet utdata', encodeBtn: 'Kode URL', decodeBtn: 'Dekode URL', copyBtn: 'Kopier', copied: 'Kopiert!', placeholder: 'Skriv inn URL eller tekst å kode...', desc: 'URL-koding konverterer ikke-tillatte tegn i URL-er til et format som kan overføres via Internett.', faq: 'FAQ', faq1q: 'Hva er URL-koding?', faq1a: 'URL-koding erstatter usikre ASCII-tegn med "%" etterfulgt av to heksadesimale sifre.', faq2q: 'Når trenger jeg URL-koding?', faq2a: 'Du trenger URL-koding når du sender spesialtegn i spørringsparametere.', faq3q: 'Forskjell mellom encodeURI og encodeURIComponent i JavaScript?', faq3a: 'encodeURI koder en full URL. encodeURIComponent koder en URL-komponent. Bruk encodeURIComponent for individuelle verdier.', relatedTitle: 'Relaterte verktøy' },
  zh: { title: 'URL编码器在线', subtitle: '即时编码和解码URL — 免费', inputLabel: '输入URL/文本', outputLabel: '编码输出', encodeBtn: 'URL编码', decodeBtn: 'URL解码', copyBtn: '复制', copied: '已复制！', placeholder: '输入要编码的URL或文本...', desc: 'URL编码（百分比编码）将URL中不允许的字符转换为可以通过互联网传输的格式。', faq: '常见问题', faq1q: '什么是URL编码？', faq1a: 'URL编码用"%"后跟两个十六进制数字替换不安全的ASCII字符。例如，空格变为%20。', faq2q: '什么时候需要URL编码？', faq2a: '在查询参数中传递特殊字符、表单提交或API调用时需要URL编码。', faq3q: 'JavaScript中encodeURI和encodeURIComponent有什么区别？', faq3a: 'encodeURI编码完整URL。encodeURIComponent编码URL组件。对单个值使用encodeURIComponent。', relatedTitle: '相关工具' },
  ja: { title: 'URLエンコーダーオンライン', subtitle: 'URLを瞬時にエンコード・デコード — 無料', inputLabel: '入力URL / テキスト', outputLabel: 'エンコード出力', encodeBtn: 'URLエンコード', decodeBtn: 'URLデコード', copyBtn: 'コピー', copied: 'コピーしました！', placeholder: 'エンコードするURLまたはテキストを入力...', desc: 'URLエンコード（パーセントエンコード）は、URLで許可されていない文字をインターネット経由で送信できる形式に変換します。', faq: 'よくある質問', faq1q: 'URLエンコードとは？', faq1a: 'URLエンコードは安全でないASCII文字を"%"と2桁の16進数で置き換えます。', faq2q: 'URLエンコードが必要なのはいつですか？', faq2a: 'クエリパラメータで特殊文字を渡す際、フォーム送信、APIコールでURLエンコードが必要です。', faq3q: 'JavaScriptのencodeURIとencodeURIComponentの違いは？', faq3a: 'encodeURIは完全なURLをエンコードします。encodeURIComponentはURLコンポーネントをエンコードします。', relatedTitle: '関連ツール' },
  ko: { title: 'URL 인코더 온라인', subtitle: 'URL 즉시 인코딩 및 디코딩 — 무료', inputLabel: '입력 URL / 텍스트', outputLabel: '인코딩된 출력', encodeBtn: 'URL 인코딩', decodeBtn: 'URL 디코딩', copyBtn: '복사', copied: '복사됨!', placeholder: '인코딩할 URL 또는 텍스트 입력...', desc: 'URL 인코딩(퍼센트 인코딩)은 URL에서 허용되지 않는 문자를 인터넷을 통해 전송할 수 있는 형식으로 변환합니다.', faq: 'FAQ', faq1q: 'URL 인코딩이란?', faq1a: 'URL 인코딩은 안전하지 않은 ASCII 문자를 "%" 다음에 두 개의 16진수로 바꿉니다.', faq2q: 'URL 인코딩이 필요한 경우는?', faq2a: '쿼리 파라미터에서 특수 문자를 전달할 때, 폼 제출, API 호출 시 URL 인코딩이 필요합니다.', faq3q: 'JavaScript에서 encodeURI와 encodeURIComponent의 차이점은?', faq3a: 'encodeURI는 전체 URL을 인코딩합니다. encodeURIComponent는 URL 구성 요소를 인코딩합니다.', relatedTitle: '관련 도구' },
  id: { title: 'URL Encoder Online', subtitle: 'Encode dan Decode URL Secara Instan — Gratis', inputLabel: 'URL / Teks input', outputLabel: 'Output yang dikodekan', encodeBtn: 'Encode URL', decodeBtn: 'Decode URL', copyBtn: 'Salin', copied: 'Disalin!', placeholder: 'Masukkan URL atau teks untuk dikodekan...', desc: 'Pengkodean URL mengonversi karakter yang tidak diizinkan dalam URL ke format yang dapat dikirimkan melalui Internet.', faq: 'FAQ', faq1q: 'Apa itu pengkodean URL?', faq1a: 'Pengkodean URL mengganti karakter ASCII yang tidak aman dengan "%" diikuti dua digit heksadesimal.', faq2q: 'Kapan saya memerlukan pengkodean URL?', faq2a: 'Anda memerlukan pengkodean URL saat meneruskan karakter khusus dalam parameter kueri.', faq3q: 'Perbedaan antara encodeURI dan encodeURIComponent dalam JavaScript?', faq3a: 'encodeURI mengkodekan URL lengkap. encodeURIComponent mengkodekan komponen URL. Gunakan encodeURIComponent untuk nilai individual.', relatedTitle: 'Alat terkait' },
  th: { title: 'URL Encoder ออนไลน์', subtitle: 'เข้ารหัสและถอดรหัส URL ทันที — ฟรี', inputLabel: 'URL / ข้อความนำเข้า', outputLabel: 'ผลลัพธ์ที่เข้ารหัส', encodeBtn: 'เข้ารหัส URL', decodeBtn: 'ถอดรหัส URL', copyBtn: 'คัดลอก', copied: 'คัดลอกแล้ว!', placeholder: 'ป้อน URL หรือข้อความที่จะเข้ารหัส...', desc: 'การเข้ารหัส URL แปลงอักขระที่ไม่อนุญาตใน URL เป็นรูปแบบที่สามารถส่งผ่านอินเทอร์เน็ตได้', faq: 'คำถามที่พบบ่อย', faq1q: 'การเข้ารหัส URL คืออะไร?', faq1a: 'การเข้ารหัส URL แทนที่อักขระ ASCII ที่ไม่ปลอดภัยด้วย "%" ตามด้วยเลขฐานสิบหกสองหลัก', faq2q: 'เมื่อใดต้องการการเข้ารหัส URL?', faq2a: 'คุณต้องการการเข้ารหัส URL เมื่อส่งอักขระพิเศษในพารามิเตอร์ query', faq3q: 'ความแตกต่างระหว่าง encodeURI และ encodeURIComponent ใน JavaScript?', faq3a: 'encodeURI เข้ารหัส URL ทั้งหมด encodeURIComponent เข้ารหัสส่วนประกอบ URL ใช้ encodeURIComponent สำหรับค่าเดี่ยว', relatedTitle: 'เครื่องมือที่เกี่ยวข้อง' },
};

export default function UrlEncoderOnlinePage({ params }: { params: { lang: string } }) {
  const lang = params?.lang || 'en';
  const tr = t[lang] || t.en;
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);

  const handleEncode = () => {
    try {
      setOutput(encodeURIComponent(input));
    } catch {
      setOutput('Error encoding input');
    }
  };

  const handleDecode = () => {
    try {
      setOutput(decodeURIComponent(input));
    } catch {
      setOutput('Error decoding input (invalid percent-encoding)');
    }
  };

  const handleCopy = async () => {
    if (!output) return;
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

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
            className="w-full h-28 p-3 border border-gray-300 rounded-lg font-mono text-sm resize-y focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="flex gap-3 mb-4">
          <button onClick={handleEncode} className="px-5 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors">
            {tr.encodeBtn}
          </button>
          <button onClick={handleDecode} className="px-5 py-2.5 bg-gray-600 text-white font-medium rounded-lg hover:bg-gray-700 transition-colors">
            {tr.decodeBtn}
          </button>
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium text-gray-700">{tr.outputLabel}</label>
            <button onClick={handleCopy} disabled={!output} className="px-3 py-1.5 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors">
              {copied ? tr.copied : tr.copyBtn}
            </button>
          </div>
          <textarea readOnly value={output} className="w-full h-28 p-3 border border-gray-300 rounded-lg font-mono text-sm bg-gray-50 resize-y" />
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
        <p className="text-gray-700 text-sm">{tr.desc}</p>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Common URL Encoding Examples</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50">
                <th className="text-left p-3 font-semibold text-gray-700 border-b">Character</th>
                <th className="text-left p-3 font-semibold text-gray-700 border-b">Encoded</th>
                <th className="text-left p-3 font-semibold text-gray-700 border-b">When used</th>
              </tr>
            </thead>
            <tbody>
              {[
                { char: ' (space)', encoded: '%20', when: 'Spaces in URLs' },
                { char: '&', encoded: '%26', when: 'Ampersand in query params' },
                { char: '=', encoded: '%3D', when: 'Equals sign in param values' },
                { char: '+', encoded: '%2B', when: 'Plus sign' },
                { char: '#', encoded: '%23', when: 'Hash/fragment delimiter' },
                { char: '/', encoded: '%2F', when: 'Forward slash in values' },
                { char: '?', encoded: '%3F', when: 'Question mark in values' },
                { char: '@', encoded: '%40', when: 'At sign in values' },
              ].map((row) => (
                <tr key={row.char} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="p-3 font-mono font-bold text-red-600">{row.char}</td>
                  <td className="p-3 font-mono text-blue-600">{row.encoded}</td>
                  <td className="p-3 text-gray-600 text-xs">{row.when}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">{tr.faq}</h2>
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

      <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">{tr.relatedTitle}</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {[
            { href: `/${lang}/tools/url-encoder`, label: 'URL Encoder Full' },
            { href: `/${lang}/tools/base64-encode`, label: 'Base64 Encoder' },
            { href: `/${lang}/tools/html-encoder-online`, label: 'HTML Encoder' },
            { href: `/${lang}/tools/jwt-decoder`, label: 'JWT Decoder' },
            { href: `/${lang}/tools/json-formatter`, label: 'JSON Formatter' },
            { href: `/${lang}/tools/query-string-parser`, label: 'Query String Parser' },
          ].map((link) => (
            <a key={link.href} href={link.href} className="text-center p-3 bg-white border border-gray-200 rounded-lg hover:border-blue-400 hover:text-blue-600 text-sm font-medium text-gray-700 transition-colors">
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
