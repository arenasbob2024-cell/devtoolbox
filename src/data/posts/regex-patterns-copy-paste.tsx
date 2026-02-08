import Link from 'next/link';

const rxT: Record<string, Record<string, string>> = {
  en: { intro: 'Stop writing regex patterns from scratch. Here are <strong>20 battle-tested patterns</strong> that cover the most common validation and extraction needs. Each pattern includes an explanation and example matches.', link_test: 'Test any pattern live with our Regex Tester →', h2_val: 'Validation Patterns', h2_ext: 'Extraction Patterns', h2_fmt: 'Format Patterns', h2_txt: 'Text Processing Patterns', h2_code: 'Using These Patterns in Code', link_validate: 'Test all these patterns live with our Regex Tester →', h2_faq: 'Frequently Asked Questions', faq1_q: 'Are these regex patterns compatible with all programming languages?', faq1_a: 'These patterns use standard regex syntax compatible with JavaScript, Python, Java, C#, Go, PHP, and Ruby. Minor syntax differences may exist. The core patterns work across all major languages.', faq2_q: 'Should I use regex for email validation in production?', faq2_a: 'For basic format checking, these patterns work well. However, the only way to truly validate an email is to send a confirmation email. Use regex for client-side UX validation, but never rely on it as the sole validation method.', faq3_q: 'What is the difference between greedy and lazy regex quantifiers?', faq3_a: 'Greedy quantifiers (*, +, ?) match as much text as possible. Lazy quantifiers (*?, +?, ??) match as little as possible. For example, given "<b>bold</b>", greedy <.*> matches the entire string, while lazy <.*?> matches only "<b>".', p_phone: 'Use this for international phone numbers. For US-specific, see pattern #4.', p_pwd: 'Requires: 8+ characters, uppercase, lowercase, digit, and special character.', p_ipv6: 'Matches full IPv6 addresses like', p_extract_email: 'Use with global flag (g) to find all email addresses in a block of text.', p_extract_url: 'A simpler, more forgiving URL pattern for extraction (not strict validation).', p_extract_html: 'Captures tag name and content. Use \\1 backreference for matching close tags.', p_extract_html_warn: 'Warning: For complex HTML parsing, use a proper parser like DOMParser or cheerio.', p_extract_num: 'Matches: integers and decimals, positive and negative.', p_cc_warn: 'For production, use a payment processor\'s validation — never validate cards with regex alone.', p_trim: 'Use with replace to trim:', p_spaces: 'Replace with single space:', p_md: 'Captures text between ** markers. Group 1 contains the bold text.', p_matches: 'Matches:', p_not_match: 'Does not match:' },
  fr: { intro: 'Arrêtez d\'écrire des regex depuis zéro. Voici <strong>20 motifs éprouvés</strong> pour validation et extraction.', link_test: 'Testez vos motifs avec notre Regex Tester →', h2_val: 'Motifs de validation', h2_ext: 'Motifs d\'extraction', h2_fmt: 'Motifs de format', h2_txt: 'Traitement de texte', h2_code: 'Utiliser ces motifs en code', link_validate: 'Testez tous ces motifs avec notre Regex Tester →', h2_faq: 'Questions fréquentes', faq1_q: 'Ces motifs sont-ils compatibles avec tous les langages ?', faq1_a: 'Ces motifs utilisent une syntaxe standard compatible avec JS, Python, Java, C#, Go, PHP, Ruby.', faq2_q: 'Utiliser regex pour valider les emails en production ?', faq2_a: 'Pour une vérification basique, ces motifs conviennent. La seule vraie validation est l\'envoi d\'un email de confirmation.', faq3_q: 'Différence entre quantificateurs gourmands et paresseux ?', faq3_a: 'Gourmands (*, +, ?) : correspondent au maximum. Paresseux (*?, +?, ??) : au minimum.', p_phone: 'Pour numéros internationaux. Pour les US, voir motif #4.', p_pwd: 'Exige : 8+ caractères, majuscule, minuscule, chiffre, caractère spécial.', p_ipv6: 'Correspond aux adresses IPv6 complètes comme', p_extract_email: 'Avec le flag global (g) pour trouver tous les emails.', p_extract_url: 'Motif URL plus simple pour l\'extraction.', p_extract_html: 'Capture le nom de balise et le contenu.', p_extract_html_warn: 'Pour du HTML complexe, utilisez un parser comme DOMParser ou cheerio.', p_extract_num: 'Entiers et décimaux, positifs et négatifs.', p_cc_warn: 'En production, utilisez un processeur de paiement.', p_trim: 'Utiliser avec replace pour trim :', p_spaces: 'Remplacer par un espace :', p_md: 'Capture le texte entre **.', p_matches: 'Correspond à :', p_not_match: 'Ne correspond pas à :' },
  de: { intro: 'Schreiben Sie keine Regex mehr von Grund auf. Hier sind <strong>20 bewährte Muster</strong>.', link_test: 'Muster mit unserem Regex Tester testen →', h2_val: 'Validierungsmuster', h2_ext: 'Extraktionsmuster', h2_fmt: 'Formatmuster', h2_txt: 'Textverarbeitung', h2_code: 'Muster im Code verwenden', link_validate: 'Alle Muster mit Regex Tester testen →', h2_faq: 'Häufige Fragen', faq1_q: 'Sind diese Muster mit allen Sprachen kompatibel?', faq1_a: 'Ja, Standard-Regex-Syntax für JS, Python, Java, C#, Go, PHP, Ruby.', faq2_q: 'Regex für E-Mail-Validierung in Produktion?', faq2_a: 'Für grundlegende Formatprüfung geeignet. Echte Validierung nur per Bestätigungs-E-Mail.', faq3_q: 'Unterschied zwischen gierigen und faulen Quantifikatoren?', faq3_a: 'Gierig (*, +, ?): maximale Übereinstimmung. Faul (*?, +?, ??): minimale.', p_phone: 'Für internationale Nummern. US-spezifisch: Muster #4.', p_pwd: 'Erfordert: 8+ Zeichen, Groß-/Kleinbuchstabe, Ziffer, Sonderzeichen.', p_ipv6: 'Vollständige IPv6-Adressen wie', p_extract_email: 'Mit global-Flag (g) alle E-Mails finden.', p_extract_url: 'Einfacheres URL-Muster zur Extraktion.', p_extract_html: 'Erfasst Tagname und Inhalt.', p_extract_html_warn: 'Für komplexes HTML: DOMParser oder cheerio verwenden.', p_extract_num: 'Ganzzahlen und Dezimalzahlen.', p_cc_warn: 'In Produktion: Zahlungsabwickler verwenden.', p_trim: 'Mit replace zum Trimmen:', p_spaces: 'Durch Einzelraum ersetzen:', p_md: 'Erfasst Text zwischen **.', p_matches: 'Passt:', p_not_match: 'Passt nicht:' },
  it: { intro: 'Smetti di scrivere regex da zero. Ecco <strong>20 pattern collaudati</strong>.', link_test: 'Testa i pattern con il nostro Regex Tester →', h2_val: 'Pattern di validazione', h2_ext: 'Pattern di estrazione', h2_fmt: 'Pattern di formato', h2_txt: 'Elaborazione testo', h2_code: 'Usare questi pattern nel codice', link_validate: 'Testa tutti i pattern con Regex Tester →', h2_faq: 'Domande frequenti', faq1_q: 'Questi pattern sono compatibili con tutti i linguaggi?', faq1_a: 'Sì, sintassi regex standard per JS, Python, Java, C#, Go, PHP, Ruby.', faq2_q: 'Usare regex per validare email in produzione?', faq2_a: 'Per controllo formato base va bene. Validazione vera solo con email di conferma.', faq3_q: 'Differenza tra quantificatori greedy e lazy?', faq3_a: 'Greedy (*, +, ?): massima corrispondenza. Lazy (*?, +?, ??): minima.', p_phone: 'Per numeri internazionali. US: vedi pattern #4.', p_pwd: 'Richiede: 8+ caratteri, maiuscola, minuscola, cifra, speciale.', p_ipv6: 'Indirizzi IPv6 completi come', p_extract_email: 'Con flag globale (g) trova tutti gli email.', p_extract_url: 'Pattern URL più semplice per estrazione.', p_extract_html: 'Cattura nome tag e contenuto.', p_extract_html_warn: 'Per HTML complesso: usare DOMParser o cheerio.', p_extract_num: 'Interi e decimali.', p_cc_warn: 'In produzione: usare processore di pagamento.', p_trim: 'Con replace per trim:', p_spaces: 'Sostituire con spazio singolo:', p_md: 'Cattura testo tra **.', p_matches: 'Corrisponde:', p_not_match: 'Non corrisponde:' },
  es: { intro: 'Deja de escribir regex desde cero. Aquí hay <strong>20 patrones probados</strong>.', link_test: 'Prueba patrones con nuestro Regex Tester →', h2_val: 'Patrones de validación', h2_ext: 'Patrones de extracción', h2_fmt: 'Patrones de formato', h2_txt: 'Procesamiento de texto', h2_code: 'Usar estos patrones en código', link_validate: 'Prueba todos los patrones con Regex Tester →', h2_faq: 'Preguntas frecuentes', faq1_q: '¿Estos patrones son compatibles con todos los lenguajes?', faq1_a: 'Sí, sintaxis regex estándar para JS, Python, Java, C#, Go, PHP, Ruby.', faq2_q: '¿Usar regex para validar email en producción?', faq2_a: 'Para verificación básica sirve. Validación real solo con email de confirmación.', faq3_q: '¿Diferencia entre cuantificadores greedy y lazy?', faq3_a: 'Greedy (*, +, ?): máxima coincidencia. Lazy (*?, +?, ??): mínima.', p_phone: 'Para números internacionales. US: ver patrón #4.', p_pwd: 'Requisitos: 8+ caracteres, mayúscula, minúscula, dígito, especial.', p_ipv6: 'Direcciones IPv6 completas como', p_extract_email: 'Con flag global (g) encuentra todos los emails.', p_extract_url: 'Patrón URL más simple para extracción.', p_extract_html: 'Captura nombre de etiqueta y contenido.', p_extract_html_warn: 'Para HTML complejo: usar DOMParser o cheerio.', p_extract_num: 'Enteros y decimales.', p_cc_warn: 'En producción: usar procesador de pagos.', p_trim: 'Con replace para trim:', p_spaces: 'Reemplazar por espacio único:', p_md: 'Captura texto entre **.', p_matches: 'Coincide:', p_not_match: 'No coincide:' },
  zh: { intro: '别再手写正则表达式了。这里整理了 <strong>20 个经过实战检验的 Regex 模式</strong>，覆盖最常见的校验和提取需求。每个模式都附带说明和匹配示例。', link_test: '使用我们的 Regex 测试器实时测试任意模式 →', h2_val: '校验模式', h2_ext: '提取模式', h2_fmt: '格式模式', h2_txt: '文本处理模式', h2_code: '在代码中使用这些模式', link_validate: '使用 Regex 测试器测试所有模式 →', h2_faq: '常见问题', faq1_q: '这些 Regex 模式是否兼容所有编程语言？', faq1_a: '这些模式使用标准正则语法，兼容 JavaScript、Python、Java、C#、Go、PHP、Ruby。语法细节可能有差异，但核心模式在主流语言中均可使用。', faq2_q: '生产环境是否应该用 Regex 验证邮箱？', faq2_a: '用于基本格式校验时，这些模式足够。但要真正验证邮箱，唯一可靠的方式是发送确认邮件。可将 Regex 用于客户端 UX 校验，但不要作为唯一验证手段。', faq3_q: '贪婪和懒惰量词有什么区别？', faq3_a: '贪婪量词（*、+、?）尽可能多地匹配。懒惰量词（*?、+?、??）尽可能少地匹配。例如对 "<b>bold</b>"，贪婪的 <.*> 会匹配整串，而懒惰的 <.*?> 只匹配 "<b>"。', p_phone: '适用于国际电话号码。美国号码见模式 #4。', p_pwd: '要求：8+ 字符，含大小写、数字和特殊字符。', p_ipv6: '匹配完整 IPv6 地址，如', p_extract_email: '配合全局标志 (g) 可找出文本中所有邮箱。', p_extract_url: '更宽松的 URL 模式，用于提取（非严格校验）。', p_extract_html: '捕获标签名和内容。使用 \\1 反向引用匹配闭合标签。', p_extract_html_warn: '警告：解析复杂 HTML 时应使用 DOMParser 或 cheerio 等解析器。', p_extract_num: '匹配整数和小数，支持正负。', p_cc_warn: '生产环境请使用支付处理商的验证，切勿仅靠 Regex 验证卡号。', p_trim: '配合 replace 去除首尾空白：', p_spaces: '替换为单个空格：', p_md: '捕获 ** 之间的文本，分组 1 为加粗内容。', p_matches: '匹配：', p_not_match: '不匹配：' },
  id: { intro: 'Berhenti menulis regex dari nol. Ini <strong>20 pola teruji</strong>.', link_test: 'Uji pola dengan Regex Tester kami →', h2_val: 'Pola Validasi', h2_ext: 'Pola Ekstraksi', h2_fmt: 'Pola Format', h2_txt: 'Pemrosesan Teks', h2_code: 'Menggunakan Pola dalam Kode', link_validate: 'Uji semua pola dengan Regex Tester →', h2_faq: 'Pertanyaan Umum', faq1_q: 'Apakah pola ini kompatibel dengan semua bahasa?', faq1_a: 'Ya, sintaks regex standar untuk JS, Python, Java, C#, Go, PHP, Ruby.', faq2_q: 'Gunakan regex untuk validasi email di produksi?', faq2_a: 'Untuk pemeriksaan format dasar, pola ini cukup. Validasi sejati hanya dengan email konfirmasi.', faq3_q: 'Perbedaan quantifier greedy dan lazy?', faq3_a: 'Greedy (*, +, ?): cocok sebanyak mungkin. Lazy (*?, +?, ??): seminimal mungkin.', p_phone: 'Untuk nomor internasional. US: lihat pola #4.', p_pwd: 'Persyaratan: 8+ karakter, huruf besar/kecil, angka, karakter khusus.', p_ipv6: 'Alamat IPv6 lengkap seperti', p_extract_email: 'Dengan flag global (g) temukan semua email.', p_extract_url: 'Pola URL lebih sederhana untuk ekstraksi.', p_extract_html: 'Menangkap nama tag dan konten.', p_extract_html_warn: 'Untuk HTML kompleks: gunakan DOMParser atau cheerio.', p_extract_num: 'Bilangan bulat dan desimal.', p_cc_warn: 'Di produksi: gunakan prosesor pembayaran.', p_trim: 'Dengan replace untuk trim:', p_spaces: 'Ganti dengan spasi tunggal:', p_md: 'Menangkap teks antara **.', p_matches: 'Cocok:', p_not_match: 'Tidak cocok:' },
  th: { intro: 'หยุดเขียน regex ตั้งแต่ศูนย์ นี่คือ <strong>20 รูปแบบที่ผ่านการทดสอบ</strong>', link_test: 'ทดสอบรูปแบบด้วย Regex Tester ของเรา →', h2_val: 'รูปแบบการตรวจสอบ', h2_ext: 'รูปแบบการดึงข้อมูล', h2_fmt: 'รูปแบบการจัดรูปแบบ', h2_txt: 'การประมวลผลข้อความ', h2_code: 'การใช้รูปแบบในโค้ด', link_validate: 'ทดสอบรูปแบบทั้งหมดด้วย Regex Tester →', h2_faq: 'คำถามที่พบบ่อย', faq1_q: 'รูปแบบเหล่านี้ใช้ได้กับทุกภาษาหรือไม่?', faq1_a: 'ได้ ใช้ไวยากรณ์ regex มาตรฐานสำหรับ JS, Python, Java, C#, Go, PHP, Ruby.', faq2_q: 'ใช้ regex ตรวจสอบอีเมลในโปรดักชัน?', faq2_a: 'สำหรับการตรวจสอบรูปแบบพื้นฐาน รูปแบบเหล่านี้เพียงพอ การตรวจสอบที่แท้จริงต้องส่งอีเมลยืนยัน.', faq3_q: 'ความแตกต่างระหว่าง greedy และ lazy quantifier?', faq3_a: 'Greedy (*, +, ?): ตรงกันมากที่สุด. Lazy (*?, +?, ??): น้อยที่สุด.', p_phone: 'สำหรับหมายเลขโทรศัพท์ระหว่างประเทศ US: ดูรูปแบบ #4', p_pwd: 'ต้องมี: 8+ ตัวอักษร ตัวพิมพ์ใหญ่/เล็ก ตัวเลข อักขระพิเศษ.', p_ipv6: 'ที่อยู่ IPv6 เต็มรูปแบบเช่น', p_extract_email: 'ใช้ flag global (g) หาอีเมลทั้งหมด.', p_extract_url: 'รูปแบบ URL ที่เรียบง่ายกว่าสำหรับการดึงข้อมูล.', p_extract_html: 'จับชื่อแท็กและเนื้อหา.', p_extract_html_warn: 'สำหรับ HTML ที่ซับซ้อน: ใช้ DOMParser หรือ cheerio.', p_extract_num: 'จำนวนเต็มและทศนิยม.', p_cc_warn: 'ในโปรดักชัน: ใช้ตัวประมวลผลการชำระเงิน.', p_trim: 'ใช้กับ replace เพื่อ trim:', p_spaces: 'แทนที่ด้วยช่องว่างเดียว:', p_md: 'จับข้อความระหว่าง **.', p_matches: 'ตรงกับ:', p_not_match: 'ไม่ตรงกับ:' },
};

export default function RegexPatterns({ lang }: { lang: string }) {
  const r = rxT[lang] || rxT['en'];
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: r.faq1_q, acceptedAnswer: { '@type': 'Answer', text: r.faq1_a } },
      { '@type': 'Question', name: r.faq2_q, acceptedAnswer: { '@type': 'Answer', text: r.faq2_a } },
      { '@type': 'Question', name: r.faq3_q, acceptedAnswer: { '@type': 'Answer', text: r.faq3_a } },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <p dangerouslySetInnerHTML={{ __html: r.intro }} />

      <p>
        <Link href={`/${lang}/tools/regex-tester`} style={{ fontWeight: 600 }}>
          {r.link_test}
        </Link>
      </p>

      <h2>{r.h2_val}</h2>

      <h3>1. Email Address</h3>
      <pre><code>{`^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$`}</code></pre>
      <p>{r.p_matches} <code>user@example.com</code>, <code>john.doe+tag@company.co.uk</code></p>
      <p>{r.p_not_match} <code>user@</code>, <code>@example.com</code>, <code>user@.com</code></p>

      <h3>2. URL (HTTP/HTTPS)</h3>
      <pre><code>{`^https?:\\/\\/(www\\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)$`}</code></pre>
      <p>{r.p_matches} <code>https://example.com</code>, <code>http://www.site.co.uk/path?q=1</code></p>

      <h3>3. Phone Number (International E.164)</h3>
      <pre><code>{`^\\+[1-9]\\d{1,14}$`}</code></pre>
      <p>{r.p_matches} <code>+14155552671</code>, <code>+442071234567</code></p>
      <p>{r.p_phone}</p>

      <h3>4. US Phone Number</h3>
      <pre><code>{`^(\\+1)?[\\s.-]?\\(?\\d{3}\\)?[\\s.-]?\\d{3}[\\s.-]?\\d{4}$`}</code></pre>
      <p>{r.p_matches} <code>(415) 555-2671</code>, <code>415-555-2671</code>, <code>+1 415.555.2671</code></p>

      <h3>5. Strong Password</h3>
      <pre><code>{`^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$`}</code></pre>
      <p>{r.p_pwd}</p>
      <p>{r.p_matches} <code>MyP@ss1word</code> | {r.p_not_match} <code>password</code>, <code>12345678</code></p>

      <h3>6. IPv4 Address</h3>
      <pre><code>{`^((25[0-5]|(2[0-4]|1\\d|[1-9]|)\\d)\\.?\\b){4}$`}</code></pre>
      <p>{r.p_matches} <code>192.168.1.1</code>, <code>10.0.0.255</code></p>
      <p>{r.p_not_match} <code>256.1.1.1</code>, <code>192.168.1</code></p>

      <h3>7. IPv6 Address (Simplified)</h3>
      <pre><code>{`^([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$`}</code></pre>
      <p>{r.p_ipv6} <code>2001:0db8:85a3:0000:0000:8a2e:0370:7334</code></p>

      <h3>8. Date (YYYY-MM-DD)</h3>
      <pre><code>{`^\\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\\d|3[01])$`}</code></pre>
      <p>{r.p_matches} <code>2026-01-15</code>, <code>2025-12-31</code></p>
      <p>{r.p_not_match} <code>2026-13-01</code>, <code>2026-00-15</code></p>

      <h2>{r.h2_ext}</h2>

      <h3>9. Extract All Emails from Text</h3>
      <pre><code>{`[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}`}</code></pre>
      <p>{r.p_extract_email}</p>

      <h3>10. Extract All URLs from Text</h3>
      <pre><code>{`https?:\\/\\/[^\\s<>\"']+`}</code></pre>
      <p>{r.p_extract_url}</p>

      <h3>11. Extract HTML Tags</h3>
      <pre><code>{`<([a-zA-Z][a-zA-Z0-9]*)\\b[^>]*>(.*?)<\\/\\1>`}</code></pre>
      <p>{r.p_extract_html}</p>
      <p><em>{r.p_extract_html_warn}</em></p>

      <h3>12. Extract Numbers from String</h3>
      <pre><code>{`-?\\d+\\.?\\d*`}</code></pre>
      <p>{r.p_extract_num} <code>42</code>, <code>-3.14</code>, <code>0.5</code></p>

      <h3>13. Extract Hashtags</h3>
      <pre><code>{`#[a-zA-Z0-9_]+`}</code></pre>
      <p>{r.p_matches} <code>#javascript</code>, <code>#dev_tools</code>, <code>#React18</code></p>

      <h2>{r.h2_fmt}</h2>

      <h3>14. Credit Card Number (Basic)</h3>
      <pre><code>{`^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|3[47][0-9]{13}|6(?:011|5[0-9]{2})[0-9]{12})$`}</code></pre>
      <p>{r.p_matches} Visa, Mastercard, Amex, Discover.</p>
      <p><em>{r.p_cc_warn}</em></p>

      <h3>15. Hex Color Code</h3>
      <pre><code>{`^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6}|[0-9A-Fa-f]{8})$`}</code></pre>
      <p>{r.p_matches} <code>#FFF</code>, <code>#FF5733</code>, <code>#FF573380</code></p>

      <h3>16. Semantic Version (SemVer)</h3>
      <pre><code>{`^(0|[1-9]\\d*)\\.(0|[1-9]\\d*)\\.(0|[1-9]\\d*)(?:-((?:0|[1-9]\\d*|\\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\\.(?:0|[1-9]\\d*|\\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\\+([0-9a-zA-Z-]+(?:\\.[0-9a-zA-Z-]+)*))?$`}</code></pre>
      <p>{r.p_matches} <code>1.0.0</code>, <code>2.1.3-beta.1</code>, <code>1.0.0+build.123</code></p>

      <h3>17. UUID (Any Version)</h3>
      <pre><code>{`^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$`}</code></pre>
      <p>{r.p_matches} <code>f47ac10b-58cc-4372-a567-0e02b2c3d479</code></p>

      <h2>{r.h2_txt}</h2>

      <h3>18. Trim Whitespace (Leading + Trailing)</h3>
      <pre><code>{`^\\s+|\\s+$`}</code></pre>
      <p>{r.p_trim} <code>text.replace(/^\\s+|\\s+$/g, &apos;&apos;)</code></p>

      <h3>19. Multiple Spaces to Single Space</h3>
      <pre><code>{`\\s{2,}`}</code></pre>
      <p>{r.p_spaces} <code>text.replace(/\\s&#123;2,&#125;/g, &apos; &apos;)</code></p>

      <h3>20. Markdown Bold Text</h3>
      <pre><code>{`\\*\\*(.+?)\\*\\*`}</code></pre>
      <p>{r.p_md}</p>

      <h2>{r.h2_code}</h2>
      <pre><code>{`// JavaScript
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$/;
emailRegex.test('user@example.com'); // true

// Python
import re
pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$'
re.match(pattern, 'user@example.com')  # Match object

// Java
Pattern pattern = Pattern.compile("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\\\.[a-zA-Z]{2,}$");
pattern.matcher("user@example.com").matches(); // true`}</code></pre>

      <p>
        <Link href={`/${lang}/tools/regex-tester`} style={{ fontWeight: 600 }}>
          {r.link_validate}
        </Link>
      </p>

      <div className="faq-section">
        <h2>{r.h2_faq}</h2>
        <h3>{r.faq1_q}</h3>
        <p>{r.faq1_a}</p>
        <h3>{r.faq2_q}</h3>
        <p>{r.faq2_a}</p>
        <h3>{r.faq3_q}</h3>
        <p>{r.faq3_a}</p>
      </div>
    </>
  );
}
