'use client';

import { useState, useCallback } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import { useLang } from '@/i18n/LangContext';

const ui: Record<string, Record<string, string>> = {
  en: {
    title: 'SVG to CSS Converter', description: 'Convert SVG code to CSS background-image data URI. Perfect for using SVG icons and backgrounds directly in your CSS stylesheets.',
    inputLabel: 'SVG Code', outputLabel: 'CSS Output', convert: 'Convert to CSS', clear: 'Clear', loadSample: 'Load Sample',
    outputType: 'Output Type', dataUri: 'data: URI', base64: 'Base64', urlEncoded: 'URL-Encoded',
    preview: 'Preview', cssProperty: 'CSS Property', cssClass: 'Full CSS Class',
    previewBg: 'Preview Background', noSvg: 'Enter SVG code to preview',
    introTitle: 'SVG to CSS Data URI Converter',
    introText: 'Convert SVG code to CSS background-image data URIs for use in stylesheets. Data URIs allow you to embed SVG graphics directly in your CSS without separate HTTP requests, improving performance. This is especially useful for SVG icons, patterns, and simple illustrations that you want to use as CSS backgrounds.',
    faqTitle: 'Frequently Asked Questions',
    faq1q: 'Why use SVG as CSS background?', faq1a: 'Using SVG as a CSS background with data URIs eliminates extra HTTP requests, making your site faster. It also allows easy color customization through CSS variables and keeps your SVG assets in your stylesheet. This is ideal for icons, patterns, separators, and decorative elements.',
    faq2q: 'What is a data URI?', faq2a: 'A data URI is a way to embed small files directly in a document as a base64 or URL-encoded string. For SVG, the data URI looks like: url("data:image/svg+xml,..."). This allows the browser to display the image without making an additional HTTP request to load a separate file.',
    faq3q: 'Should I use base64 or URL encoding?', faq3a: 'URL encoding (percent-encoding) is generally more efficient than base64 for SVG because SVG is XML text. Base64 increases file size by about 33%, while URL encoding typically results in a smaller output. However, some older browsers handle base64 SVGs better. URL encoding is recommended for modern projects.',
    faq4q: 'Can I use CSS custom properties with SVG?', faq4a: 'When SVG is embedded as a data URI, CSS custom properties (variables) cannot directly change SVG fill colors because the SVG is treated as an external image. To use dynamic colors, consider using inline SVG in HTML or setting SVG colors before converting to a data URI.',
    faq5q: 'What SVG elements work as CSS backgrounds?', faq5a: 'All valid SVG elements work as CSS backgrounds: shapes (rect, circle, path), text, groups (g), defs with symbols, gradients, filters, and patterns. Ensure your SVG has a viewBox attribute for proper scaling. Avoid external references (images, fonts) as they may not load when embedded as a data URI.',
  },
  fr: {
    title: 'Convertisseur SVG en CSS', description: 'Convertissez le code SVG en data URI CSS background-image.',
    inputLabel: 'Code SVG', outputLabel: 'Sortie CSS', convert: 'Convertir en CSS', clear: 'Effacer', loadSample: 'Exemple',
    outputType: 'Type de Sortie', dataUri: 'data: URI', base64: 'Base64', urlEncoded: 'URL-Encode',
    preview: 'Apercu', cssProperty: 'Propriete CSS', cssClass: 'Classe CSS Complete',
    previewBg: 'Apercu du Fond', noSvg: 'Entrez le code SVG pour apercu',
    introTitle: 'Convertisseur SVG en Data URI CSS',
    introText: 'Convertissez le code SVG en data URI CSS background-image pour une utilisation dans les feuilles de style.',
    faqTitle: 'Questions Frequemment Posees',
    faq1q: 'Pourquoi utiliser SVG comme fond CSS?', faq1a: 'Cela elimine les requetes HTTP supplementaires et ameliore les performances.',
    faq2q: 'Qu\'est-ce qu\'un data URI?', faq2a: 'Un data URI permet d\'integrer de petits fichiers directement dans un document sous forme de chaine codee.',
    faq3q: 'Base64 ou encodage URL?', faq3a: 'L\'encodage URL est generalement plus efficace pour SVG que base64.',
    faq4q: 'Puis-je utiliser des variables CSS avec SVG?', faq4a: 'Pas directement dans un data URI. Utilisez SVG inline pour les couleurs dynamiques.',
    faq5q: 'Quels elements SVG fonctionnent?', faq5a: 'Tous les elements SVG valides fonctionnent. Assurez-vous que votre SVG a un attribut viewBox.',
  },
  de: {
    title: 'SVG zu CSS Konverter', description: 'SVG-Code in CSS background-image data URI konvertieren.',
    inputLabel: 'SVG-Code', outputLabel: 'CSS-Ausgabe', convert: 'In CSS konvertieren', clear: 'Loeschen', loadSample: 'Beispiel',
    outputType: 'Ausgabetyp', dataUri: 'data: URI', base64: 'Base64', urlEncoded: 'URL-Kodiert',
    preview: 'Vorschau', cssProperty: 'CSS-Eigenschaft', cssClass: 'Vollstaendige CSS-Klasse',
    previewBg: 'Hintergrundvorschau', noSvg: 'SVG-Code eingeben fuer Vorschau',
    introTitle: 'SVG zu CSS Data URI Konverter',
    introText: 'SVG-Code in CSS background-image data URIs fuer die Verwendung in Stylesheets konvertieren.',
    faqTitle: 'Haeufig Gestellte Fragen',
    faq1q: 'Warum SVG als CSS-Hintergrund?', faq1a: 'Eliminiert zusaetzliche HTTP-Anfragen und verbessert die Leistung.',
    faq2q: 'Was ist ein data URI?', faq2a: 'Ein data URI ermoeglicht das Einbetten kleiner Dateien direkt in ein Dokument.',
    faq3q: 'Base64 oder URL-Kodierung?', faq3a: 'URL-Kodierung ist fuer SVG effizienter als Base64.',
    faq4q: 'Kann ich CSS-Variablen verwenden?', faq4a: 'Nicht direkt in einem data URI. Verwenden Sie Inline-SVG fuer dynamische Farben.',
    faq5q: 'Welche SVG-Elemente funktionieren?', faq5a: 'Alle gueltigen SVG-Elemente. Stellen Sie sicher, dass Ihr SVG ein viewBox-Attribut hat.',
  },
  it: { title: 'Convertitore SVG in CSS', description: 'Converti codice SVG in data URI CSS background-image.', inputLabel: 'Codice SVG', outputLabel: 'Output CSS', convert: 'Converti in CSS', clear: 'Cancella', loadSample: 'Esempio', outputType: 'Tipo Output', dataUri: 'data: URI', base64: 'Base64', urlEncoded: 'URL-Encoded', preview: 'Anteprima', cssProperty: 'Proprieta CSS', cssClass: 'Classe CSS Completa', previewBg: 'Anteprima Sfondo', noSvg: 'Inserisci codice SVG per anteprima', introTitle: 'Convertitore SVG in Data URI CSS', introText: 'Converti codice SVG in data URI CSS background-image per l\'uso nei fogli di stile.', faqTitle: 'Domande Frequenti', faq1q: 'Perche usare SVG come sfondo CSS?', faq1a: 'Elimina richieste HTTP aggiuntive e migliora le prestazioni.', faq2q: 'Cos\'e un data URI?', faq2a: 'Un data URI permette di incorporare file piccoli direttamente in un documento.', faq3q: 'Base64 o URL encoding?', faq3a: 'L\'URL encoding e generalmente piu efficiente per SVG rispetto a base64.', faq4q: 'Posso usare variabili CSS?', faq4a: 'Non direttamente in un data URI. Usa SVG inline per colori dinamici.', faq5q: 'Quali elementi SVG funzionano?', faq5a: 'Tutti gli elementi SVG validi. Assicurati che il tuo SVG abbia un attributo viewBox.' },
  es: { title: 'Convertidor SVG a CSS', description: 'Convierte codigo SVG en data URI CSS background-image.', inputLabel: 'Codigo SVG', outputLabel: 'Salida CSS', convert: 'Convertir a CSS', clear: 'Limpiar', loadSample: 'Ejemplo', outputType: 'Tipo de Salida', dataUri: 'data: URI', base64: 'Base64', urlEncoded: 'URL-Codificado', preview: 'Vista Previa', cssProperty: 'Propiedad CSS', cssClass: 'Clase CSS Completa', previewBg: 'Vista Previa de Fondo', noSvg: 'Ingresa codigo SVG para vista previa', introTitle: 'Convertidor SVG a Data URI CSS', introText: 'Convierte codigo SVG en data URIs CSS background-image para uso en hojas de estilo.', faqTitle: 'Preguntas Frecuentes', faq1q: '¿Por que usar SVG como fondo CSS?', faq1a: 'Elimina solicitudes HTTP adicionales y mejora el rendimiento.', faq2q: '¿Que es un data URI?', faq2a: 'Un data URI permite incrustar archivos pequenos directamente en un documento.', faq3q: '¿Base64 o codificacion URL?', faq3a: 'La codificacion URL es generalmente mas eficiente para SVG que base64.', faq4q: '¿Puedo usar variables CSS?', faq4a: 'No directamente en un data URI. Usa SVG en linea para colores dinamicos.', faq5q: '¿Que elementos SVG funcionan?', faq5a: 'Todos los elementos SVG validos. Asegurate que tu SVG tenga un atributo viewBox.' },
  pt: { title: 'Conversor SVG para CSS', description: 'Converta codigo SVG em data URI CSS background-image.', inputLabel: 'Codigo SVG', outputLabel: 'Saida CSS', convert: 'Converter para CSS', clear: 'Limpar', loadSample: 'Exemplo', outputType: 'Tipo de Saida', dataUri: 'data: URI', base64: 'Base64', urlEncoded: 'URL-Codificado', preview: 'Visualizacao', cssProperty: 'Propriedade CSS', cssClass: 'Classe CSS Completa', previewBg: 'Visualizacao de Fundo', noSvg: 'Insira codigo SVG para visualizacao', introTitle: 'Conversor SVG para Data URI CSS', introText: 'Converta codigo SVG em data URIs CSS background-image para uso em folhas de estilo.', faqTitle: 'Perguntas Frequentes', faq1q: 'Por que usar SVG como fundo CSS?', faq1a: 'Elimina requisicoes HTTP adicionais e melhora o desempenho.', faq2q: 'O que e um data URI?', faq2a: 'Um data URI permite incorporar arquivos pequenos diretamente em um documento.', faq3q: 'Base64 ou codificacao URL?', faq3a: 'A codificacao URL e geralmente mais eficiente para SVG do que base64.', faq4q: 'Posso usar variaveis CSS?', faq4a: 'Nao diretamente em um data URI. Use SVG inline para cores dinamicas.', faq5q: 'Quais elementos SVG funcionam?', faq5a: 'Todos os elementos SVG validos. Certifique-se que seu SVG tem um atributo viewBox.' },
  nl: { title: 'SVG naar CSS Converter', description: 'Converteer SVG-code naar CSS background-image data URI.', inputLabel: 'SVG-Code', outputLabel: 'CSS Uitvoer', convert: 'Naar CSS', clear: 'Wissen', loadSample: 'Voorbeeld', outputType: 'Uitvoertype', dataUri: 'data: URI', base64: 'Base64', urlEncoded: 'URL-Gecodeerd', preview: 'Voorbeeld', cssProperty: 'CSS Eigenschap', cssClass: 'Volledige CSS Klasse', previewBg: 'Achtergrondvoorbeeld', noSvg: 'Voer SVG-code in voor voorbeeld', introTitle: 'SVG naar CSS Data URI Converter', introText: 'Converteer SVG-code naar CSS background-image data URIs voor gebruik in stylesheets.', faqTitle: 'Veelgestelde Vragen', faq1q: 'Waarom SVG als CSS-achtergrond?', faq1a: 'Elimineert extra HTTP-verzoeken en verbetert de prestaties.', faq2q: 'Wat is een data URI?', faq2a: 'Een data URI maakt het mogelijk om kleine bestanden direct in een document in te sluiten.', faq3q: 'Base64 of URL-codering?', faq3a: 'URL-codering is over het algemeen efficienter voor SVG dan base64.', faq4q: 'Kan ik CSS-variabelen gebruiken?', faq4a: 'Niet direct in een data URI. Gebruik inline SVG voor dynamische kleuren.', faq5q: 'Welke SVG-elementen werken?', faq5a: 'Alle geldige SVG-elementen. Zorg ervoor dat uw SVG een viewBox-attribuut heeft.' },
  pl: { title: 'Konwerter SVG do CSS', description: 'Konwertuj kod SVG na data URI CSS background-image.', inputLabel: 'Kod SVG', outputLabel: 'Wyjscie CSS', convert: 'Konwertuj do CSS', clear: 'Wyczysc', loadSample: 'Przyklad', outputType: 'Typ Wyjscia', dataUri: 'data: URI', base64: 'Base64', urlEncoded: 'URL-Zakodowany', preview: 'Podglad', cssProperty: 'Wlasciwosc CSS', cssClass: 'Pelna Klasa CSS', previewBg: 'Podglad Tla', noSvg: 'Wprowadz kod SVG, aby zobaczyc podglad', introTitle: 'Konwerter SVG do CSS Data URI', introText: 'Konwertuj kod SVG na data URIs CSS background-image do uzycia w arkuszach stylow.', faqTitle: 'FAQ', faq1q: 'Dlaczego uzywac SVG jako tlo CSS?', faq1a: 'Eliminuje dodatkowe zadania HTTP i poprawia wydajnosc.', faq2q: 'Co to jest data URI?', faq2a: 'Data URI umozliwia osadzanie malych plikow bezposrednio w dokumencie.', faq3q: 'Base64 czy kodowanie URL?', faq3a: 'Kodowanie URL jest zazwyczaj bardziej wydajne dla SVG niz base64.', faq4q: 'Czy moge uzywac zmiennych CSS?', faq4a: 'Nie bezposrednio w data URI. Uzyj SVG inline dla dynamicznych kolorow.', faq5q: 'Jakie elementy SVG dzialaja?', faq5a: 'Wszystkie prawidlowe elementy SVG. Upewnij sie, ze Twoje SVG ma atrybut viewBox.' },
  sv: { title: 'SVG till CSS Konverterare', description: 'Konvertera SVG-kod till CSS background-image data URI.', inputLabel: 'SVG-Kod', outputLabel: 'CSS Utdata', convert: 'Konvertera till CSS', clear: 'Rensa', loadSample: 'Exempel', outputType: 'Utdatatyp', dataUri: 'data: URI', base64: 'Base64', urlEncoded: 'URL-Kodad', preview: 'Foerhandsvisning', cssProperty: 'CSS Egenskap', cssClass: 'Fullstaendig CSS Klass', previewBg: 'Bakgrundsfoerhandsvisning', noSvg: 'Ange SVG-kod foer foerhandsvisning', introTitle: 'SVG till CSS Data URI Konverterare', introText: 'Konvertera SVG-kod till CSS background-image data URIs foer anvandning i stilark.', faqTitle: 'Vanliga Fragor', faq1q: 'Varfor anvanda SVG som CSS-bakgrund?', faq1a: 'Eliminerar extra HTTP-forfragan och foerbattrar prestandan.', faq2q: 'Vad ar en data URI?', faq2a: 'En data URI moejliggoer inbaeddning av sma filer direkt i ett dokument.', faq3q: 'Base64 eller URL-kodning?', faq3a: 'URL-kodning ar generellt mer effektivt for SVG an base64.', faq4q: 'Kan jag anvanda CSS-variabler?', faq4a: 'Inte direkt i en data URI. Anvand inline SVG for dynamiska faerger.', faq5q: 'Vilka SVG-element fungerar?', faq5a: 'Alla giltiga SVG-element. Se till att din SVG har ett viewBox-attribut.' },
  no: { title: 'SVG til CSS Konverter', description: 'Konverter SVG-kode til CSS background-image data URI.', inputLabel: 'SVG-Kode', outputLabel: 'CSS Utdata', convert: 'Konverter til CSS', clear: 'Tom', loadSample: 'Eksempel', outputType: 'Utdatatype', dataUri: 'data: URI', base64: 'Base64', urlEncoded: 'URL-Kodet', preview: 'Forhandsvisning', cssProperty: 'CSS Egenskap', cssClass: 'Fullstendig CSS Klasse', previewBg: 'Bakgrunnsforhandsvisning', noSvg: 'Skriv inn SVG-kode for forhandsvisning', introTitle: 'SVG til CSS Data URI Konverter', introText: 'Konverter SVG-kode til CSS background-image data URIs for bruk i stilark.', faqTitle: 'Vanlige Sporsmal', faq1q: 'Hvorfor bruke SVG som CSS-bakgrunn?', faq1a: 'Eliminerer ekstra HTTP-forsporsler og forbedrer ytelsen.', faq2q: 'Hva er en data URI?', faq2a: 'En data URI gjor det mulig a legge inn sma filer direkte i et dokument.', faq3q: 'Base64 eller URL-koding?', faq3a: 'URL-koding er generelt mer effektivt for SVG enn base64.', faq4q: 'Kan jeg bruke CSS-variabler?', faq4a: 'Ikke direkte i en data URI. Bruk inline SVG for dynamiske farger.', faq5q: 'Hvilke SVG-elementer fungerer?', faq5a: 'Alle gyldige SVG-elementer. Sorg for at SVG-en din har et viewBox-attributt.' },
  zh: {
    title: 'SVG 转 CSS 转换器', description: '将 SVG 代码转换为 CSS background-image data URI，直接在样式表中使用 SVG 图形。',
    inputLabel: 'SVG 代码', outputLabel: 'CSS 输出', convert: '转换为 CSS', clear: '清除', loadSample: '加载示例',
    outputType: '输出类型', dataUri: 'data: URI', base64: 'Base64', urlEncoded: 'URL 编码',
    preview: '预览', cssProperty: 'CSS 属性', cssClass: '完整 CSS 类',
    previewBg: '背景预览', noSvg: '请输入 SVG 代码以预览',
    introTitle: 'SVG 转 CSS Data URI 转换器',
    introText: '将 SVG 代码转换为 CSS background-image data URI，用于样式表中。Data URI 允许您直接在 CSS 中嵌入 SVG 图形，无需额外的 HTTP 请求，提升页面性能。',
    faqTitle: '常见问题',
    faq1q: '为什么将 SVG 用作 CSS 背景？', faq1a: '使用 data URI 将 SVG 作为 CSS 背景可以消除额外的 HTTP 请求，提升网站性能，并允许通过 CSS 轻松自定义。',
    faq2q: '什么是 data URI？', faq2a: 'Data URI 是一种将小文件直接嵌入文档的方式，以 base64 或 URL 编码字符串表示。',
    faq3q: '应该使用 base64 还是 URL 编码？', faq3a: '对于 SVG，URL 编码通常比 base64 更高效，因为 base64 会增加约 33% 的文件大小。',
    faq4q: '能在 SVG 中使用 CSS 自定义属性吗？', faq4a: '在 data URI 中不能直接使用 CSS 变量更改 SVG 颜色。如需动态颜色，请考虑使用内联 SVG。',
    faq5q: '哪些 SVG 元素可以用作 CSS 背景？', faq5a: '所有有效的 SVG 元素都可以，包括形状、文本、渐变和图案。确保您的 SVG 有 viewBox 属性。',
  },
  ja: {
    title: 'SVG から CSS への変換', description: 'SVG コードを CSS background-image データ URI に変換します。',
    inputLabel: 'SVG コード', outputLabel: 'CSS 出力', convert: 'CSS に変換', clear: 'クリア', loadSample: 'サンプル',
    outputType: '出力タイプ', dataUri: 'data: URI', base64: 'Base64', urlEncoded: 'URL エンコード',
    preview: 'プレビュー', cssProperty: 'CSS プロパティ', cssClass: '完全な CSS クラス',
    previewBg: '背景プレビュー', noSvg: 'プレビューするには SVG コードを入力してください',
    introTitle: 'SVG から CSS データ URI 変換ツール',
    introText: 'スタイルシートで使用するための CSS background-image データ URI に SVG コードを変換します。',
    faqTitle: 'よくある質問',
    faq1q: 'SVG を CSS 背景として使う理由は？', faq1a: 'データ URI を使うことで追加の HTTP リクエストが不要になり、パフォーマンスが向上します。',
    faq2q: 'データ URI とは何ですか？', faq2a: '小さなファイルをbase64またはURLエンコード文字列としてドキュメントに直接埋め込む方法です。',
    faq3q: 'Base64 と URL エンコード、どちらが良いですか？', faq3a: 'SVG の場合、URL エンコードは base64 より一般的に効率的です。',
    faq4q: 'CSS カスタムプロパティは使えますか？', faq4a: 'データ URI 内では直接使えません。動的な色には HTML のインライン SVG を使用してください。',
    faq5q: 'どの SVG 要素が機能しますか？', faq5a: 'すべての有効な SVG 要素。SVG に viewBox 属性があることを確認してください。',
  },
  ko: {
    title: 'SVG를 CSS로 변환기', description: 'SVG 코드를 CSS background-image data URI로 변환하세요.',
    inputLabel: 'SVG 코드', outputLabel: 'CSS 출력', convert: 'CSS로 변환', clear: '초기화', loadSample: '샘플',
    outputType: '출력 유형', dataUri: 'data: URI', base64: 'Base64', urlEncoded: 'URL 인코딩',
    preview: '미리보기', cssProperty: 'CSS 속성', cssClass: '전체 CSS 클래스',
    previewBg: '배경 미리보기', noSvg: '미리보기를 위해 SVG 코드를 입력하세요',
    introTitle: 'SVG를 CSS Data URI로 변환기',
    introText: '스타일시트에서 사용할 CSS background-image data URI로 SVG 코드를 변환하세요.',
    faqTitle: '자주 묻는 질문',
    faq1q: 'SVG를 CSS 배경으로 사용하는 이유는?', faq1a: 'data URI를 사용하면 추가 HTTP 요청이 없어 성능이 향상됩니다.',
    faq2q: 'data URI란 무엇인가요?', faq2a: 'base64 또는 URL 인코딩 문자열로 작은 파일을 문서에 직접 삽입하는 방법입니다.',
    faq3q: 'Base64와 URL 인코딩 중 무엇이 더 좋나요?', faq3a: 'SVG의 경우 URL 인코딩이 base64보다 일반적으로 효율적입니다.',
    faq4q: 'CSS 사용자 정의 속성을 사용할 수 있나요?', faq4a: 'data URI에서는 직접 사용할 수 없습니다. 동적 색상에는 인라인 SVG를 사용하세요.',
    faq5q: '어떤 SVG 요소가 작동하나요?', faq5a: '모든 유효한 SVG 요소가 작동합니다. SVG에 viewBox 속성이 있는지 확인하세요.',
  },
  id: { title: 'Konverter SVG ke CSS', description: 'Konversi kode SVG ke data URI CSS background-image.', inputLabel: 'Kode SVG', outputLabel: 'Output CSS', convert: 'Konversi ke CSS', clear: 'Bersihkan', loadSample: 'Contoh', outputType: 'Jenis Output', dataUri: 'data: URI', base64: 'Base64', urlEncoded: 'URL-Encoded', preview: 'Pratinjau', cssProperty: 'Properti CSS', cssClass: 'Kelas CSS Lengkap', previewBg: 'Pratinjau Latar Belakang', noSvg: 'Masukkan kode SVG untuk pratinjau', introTitle: 'Konverter SVG ke CSS Data URI', introText: 'Konversi kode SVG ke data URI CSS background-image untuk digunakan dalam stylesheet.', faqTitle: 'FAQ', faq1q: 'Mengapa menggunakan SVG sebagai latar belakang CSS?', faq1a: 'Menghilangkan permintaan HTTP tambahan dan meningkatkan kinerja.', faq2q: 'Apa itu data URI?', faq2a: 'Data URI memungkinkan penyematan file kecil langsung ke dalam dokumen.', faq3q: 'Base64 atau URL encoding?', faq3a: 'URL encoding umumnya lebih efisien untuk SVG daripada base64.', faq4q: 'Bisakah menggunakan variabel CSS?', faq4a: 'Tidak langsung dalam data URI. Gunakan SVG inline untuk warna dinamis.', faq5q: 'Elemen SVG apa yang berfungsi?', faq5a: 'Semua elemen SVG yang valid. Pastikan SVG Anda memiliki atribut viewBox.' },
  th: { title: 'ตัวแปลง SVG เป็น CSS', description: 'แปลงโค้ด SVG เป็น data URI CSS background-image', inputLabel: 'โค้ด SVG', outputLabel: 'เอาต์พุต CSS', convert: 'แปลงเป็น CSS', clear: 'ล้าง', loadSample: 'ตัวอย่าง', outputType: 'ประเภทเอาต์พุต', dataUri: 'data: URI', base64: 'Base64', urlEncoded: 'URL-Encoded', preview: 'ตัวอย่าง', cssProperty: 'คุณสมบัติ CSS', cssClass: 'คลาส CSS สมบูรณ์', previewBg: 'ตัวอย่างพื้นหลัง', noSvg: 'ป้อนโค้ด SVG เพื่อดูตัวอย่าง', introTitle: 'ตัวแปลง SVG เป็น CSS Data URI', introText: 'แปลงโค้ด SVG เป็น data URI CSS background-image สำหรับใช้ใน stylesheet', faqTitle: 'คำถามที่พบบ่อย', faq1q: 'ทำไมต้องใช้ SVG เป็นพื้นหลัง CSS?', faq1a: 'ลดคำขอ HTTP เพิ่มเติมและปรับปรุงประสิทธิภาพ', faq2q: 'data URI คืออะไร?', faq2a: 'data URI ช่วยให้ฝังไฟล์ขนาดเล็กโดยตรงในเอกสาร', faq3q: 'Base64 หรือ URL encoding?', faq3a: 'URL encoding โดยทั่วไปมีประสิทธิภาพมากกว่า base64 สำหรับ SVG', faq4q: 'ใช้ CSS custom properties ได้ไหม?', faq4a: 'ไม่ตรงใน data URI ใช้ SVG แบบอินไลน์สำหรับสีไดนามิก', faq5q: 'SVG element ใดที่ใช้งานได้?', faq5a: 'SVG element ที่ถูกต้องทั้งหมด ตรวจสอบให้แน่ใจว่า SVG มี viewBox attribute' },
};

const SAMPLE_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <circle cx="50" cy="50" r="40" fill="#3b82f6" opacity="0.8"/>
  <polygon points="50,15 61,35 85,35 67,57 75,80 50,65 25,80 33,57 15,35 39,35"
    fill="#f59e0b" opacity="0.9"/>
</svg>`;

type OutputType = 'dataUri' | 'base64' | 'urlEncoded';

function svgToDataUri(svg: string, type: OutputType): string {
  const cleaned = svg.trim();
  if (type === 'base64') {
    try {
      const b64 = btoa(unescape(encodeURIComponent(cleaned)));
      return `url("data:image/svg+xml;base64,${b64}")`;
    } catch {
      return '';
    }
  }
  // URL encode
  const encoded = cleaned
    .replace(/"/g, "'")
    .replace(/</g, '%3C')
    .replace(/>/g, '%3E')
    .replace(/#/g, '%23')
    .replace(/\s+/g, ' ')
    .trim();
  return `url("data:image/svg+xml,${encoded}")`;
}

export default function SvgToCssConverter() {
  const { lang } = useLang();
  const t = ui[lang] || ui.en;
  const [input, setInput] = useState(SAMPLE_SVG);
  const [outputType, setOutputType] = useState<OutputType>('urlEncoded');
  const [outputMode, setOutputMode] = useState<'property' | 'class'>('property');

  const dataUri = svgToDataUri(input, outputType);
  const cssOutput = outputMode === 'property'
    ? `background-image: ${dataUri};`
    : `.element {\n  background-image: ${dataUri};\n  background-size: contain;\n  background-repeat: no-repeat;\n  background-position: center;\n}`;

  const previewStyle = dataUri ? { backgroundImage: dataUri, backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundPosition: 'center' } : {};

  return (
    <ToolLayout title={t.title} description={t.description} toolId="svg-to-css-converter">
      <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap', alignItems: 'center' }}>
        <button onClick={() => setInput(SAMPLE_SVG)} className="btn btn-secondary">{t.loadSample}</button>
        <button onClick={() => setInput('')} className="btn btn-secondary">{t.clear}</button>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 8, alignItems: 'center' }}>
          <label style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{t.outputType}:</label>
          <select value={outputType} onChange={e => setOutputType(e.target.value as OutputType)} style={{ padding: '4px 8px', fontSize: 12 }}>
            <option value="urlEncoded">{t.urlEncoded}</option>
            <option value="base64">{t.base64}</option>
          </select>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div>
          <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 8 }}>{t.inputLabel}</label>
          <textarea value={input} onChange={e => setInput(e.target.value)} placeholder='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">...</svg>' style={{ minHeight: 300, fontFamily: 'monospace', fontSize: 12 }} />
        </div>
        <div>
          <div style={{ display: 'flex', gap: 8, marginBottom: 8, alignItems: 'center' }}>
            <label style={{ fontSize: 13, fontWeight: 600 }}>{t.outputLabel}</label>
            <div style={{ marginLeft: 'auto', display: 'flex', gap: 4 }}>
              <button onClick={() => setOutputMode('property')} style={{ padding: '3px 10px', fontSize: 11, borderRadius: 4, border: '1px solid var(--border-color)', background: outputMode === 'property' ? 'var(--accent-blue)' : 'var(--bg-input)', color: outputMode === 'property' ? 'white' : 'var(--text-primary)', cursor: 'pointer' }}>{t.cssProperty}</button>
              <button onClick={() => setOutputMode('class')} style={{ padding: '3px 10px', fontSize: 11, borderRadius: 4, border: '1px solid var(--border-color)', background: outputMode === 'class' ? 'var(--accent-blue)' : 'var(--bg-input)', color: outputMode === 'class' ? 'white' : 'var(--text-primary)', cursor: 'pointer' }}>{t.cssClass}</button>
            </div>
          </div>
          <textarea value={cssOutput} readOnly style={{ minHeight: 180, fontFamily: 'monospace', fontSize: 11, opacity: cssOutput ? 1 : 0.5 }} />
          <div style={{ marginTop: 8 }}>
            <CopyButton text={cssOutput} />
          </div>
        </div>
      </div>

      {/* Preview */}
      <div style={{ marginTop: 20 }}>
        <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 8 }}>{t.previewBg}</label>
        <div style={{ height: 160, borderRadius: 10, border: '1px solid var(--border-color)', background: 'var(--bg-input)', display: 'flex', alignItems: 'center', justifyContent: 'center', ...previewStyle }}>
          {!dataUri && <span style={{ color: 'var(--text-secondary)', fontSize: 13 }}>{t.noSvg}</span>}
        </div>
        {/* Inline SVG preview */}
        {input.trim() && (
          <div style={{ marginTop: 12, display: 'flex', gap: 16, alignItems: 'flex-start' }}>
            <div>
              <div style={{ fontSize: 11, color: 'var(--text-secondary)', marginBottom: 6 }}>Inline SVG (original):</div>
              <div dangerouslySetInnerHTML={{ __html: input }} style={{ width: 80, height: 80 }} />
            </div>
          </div>
        )}
      </div>

      <div style={{ marginTop: 28, paddingTop: 20, borderTop: '1px solid var(--border-color)' }}>
        <h2 style={{ fontSize: 17, fontWeight: 700, marginBottom: 10 }}>{t.introTitle}</h2>
        <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.7 }}>{t.introText}</p>
      </div>

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
