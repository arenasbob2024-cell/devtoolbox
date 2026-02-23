'use client';
import React from 'react';
import Link from 'next/link';

const t: Record<string, Record<string, string>> = {
  en: {
    title: 'JavaScript Obfuscator Online',
    subtitle: 'Protect Your JS Code — Free & Browser-Based',
    intro: 'JavaScript obfuscation transforms your readable code into a version that\'s difficult to understand and reverse-engineer, while keeping full functionality. Use this tool to protect proprietary algorithms, API keys embedded in client-side code, or sensitive business logic.',
    whatIs: 'What is JavaScript Obfuscation?',
    whatIsText: 'Obfuscation renames variables to meaningless names, removes whitespace and comments, and can encode string literals. The result is functionally identical code that\'s much harder for humans to read.',
    howToUse: 'How to Use This Tool',
    step1: 'Paste your JavaScript code in the box below',
    step2: 'Click "Go to JavaScript Minifier" to process your code',
    step3: 'Copy the obfuscated output and use it in your project',
    note: 'Note: Our JavaScript Minifier tool provides minification which is the first step of obfuscation — removing whitespace, comments, and shortening variable names.',
    faq: 'Frequently Asked Questions',
    faq1q: 'Is JavaScript obfuscation the same as encryption?',
    faq1a: 'No. Obfuscation makes code harder to read but doesn\'t truly encrypt it. A determined developer can still reverse-engineer obfuscated code. For true security, never store secrets in client-side JavaScript.',
    faq2q: 'Will obfuscated code run slower?',
    faq2a: 'Modern JavaScript engines optimize code at runtime, so obfuscated code typically runs at the same speed. However, heavily obfuscated code may take slightly longer to parse.',
    faq3q: 'What\'s the difference between minification and obfuscation?',
    faq3a: 'Minification removes whitespace and shortens names to reduce file size. Obfuscation goes further by using misleading names, encoding strings, and adding dummy code to prevent reverse engineering.',
    faq4q: 'Can obfuscated code be de-obfuscated?',
    faq4a: 'Yes. Tools like de4js and js-beautify can partially restore obfuscated code. Obfuscation is a deterrent, not an absolute protection.',
    cta: 'Go to JavaScript Minifier →',
    relatedTitle: 'Related Tools',
  },
  fr: {
    title: 'Obfuscateur JavaScript en Ligne',
    subtitle: 'Protégez Votre Code JS — Gratuit & Sans Installation',
    intro: 'L\'obfuscation JavaScript transforme votre code lisible en une version difficile à comprendre, tout en conservant toutes les fonctionnalités.',
    whatIs: 'Qu\'est-ce que l\'obfuscation JavaScript ?',
    whatIsText: 'L\'obfuscation renomme les variables, supprime les espaces et peut encoder les chaînes. Le résultat est un code fonctionnellement identique mais beaucoup plus difficile à lire.',
    howToUse: 'Comment utiliser cet outil',
    step1: 'Collez votre code JavaScript dans la zone ci-dessous',
    step2: 'Cliquez sur "Aller au Minifieur JavaScript"',
    step3: 'Copiez le résultat et utilisez-le dans votre projet',
    note: 'Note : Notre outil de minification JavaScript fournit la première étape de l\'obfuscation.',
    faq: 'Questions fréquentes',
    faq1q: 'L\'obfuscation est-elle la même chose que le chiffrement ?',
    faq1a: 'Non. L\'obfuscation rend le code plus difficile à lire mais ne le chiffre pas vraiment.',
    faq2q: 'Le code obfusqué est-il plus lent ?',
    faq2a: 'Les moteurs JavaScript modernes optimisent le code au moment de l\'exécution, donc le code obfusqué s\'exécute généralement à la même vitesse.',
    faq3q: 'Quelle est la différence entre minification et obfuscation ?',
    faq3a: 'La minification supprime les espaces et raccourcit les noms. L\'obfuscation va plus loin en utilisant des noms trompeurs.',
    faq4q: 'Le code obfusqué peut-il être désObfusqué ?',
    faq4a: 'Oui. Des outils peuvent partiellement restaurer le code obfusqué. C\'est une dissuasion, pas une protection absolue.',
    cta: 'Aller au Minifieur JavaScript →',
    relatedTitle: 'Outils associés',
  },
  de: {
    title: 'JavaScript Obfuskator Online',
    subtitle: 'Schützen Sie Ihren JS-Code — Kostenlos & Browser-Basiert',
    intro: 'JavaScript-Obfuskierung verwandelt Ihren lesbaren Code in eine Version, die schwer zu verstehen und zu reverse-engineeren ist.',
    whatIs: 'Was ist JavaScript-Obfuskierung?',
    whatIsText: 'Obfuskierung benennt Variablen um, entfernt Leerzeichen und kann String-Literale kodieren.',
    howToUse: 'Verwendung dieses Tools',
    step1: 'Fügen Sie Ihren JavaScript-Code in das Feld ein',
    step2: 'Klicken Sie auf "Zum JavaScript-Minifier"',
    step3: 'Kopieren Sie das Ergebnis und verwenden Sie es in Ihrem Projekt',
    note: 'Hinweis: Unser JavaScript-Minifier bietet Minifizierung als ersten Schritt der Obfuskierung.',
    faq: 'Häufig gestellte Fragen',
    faq1q: 'Ist Obfuskierung dasselbe wie Verschlüsselung?',
    faq1a: 'Nein. Obfuskierung macht Code schwerer lesbar, verschlüsselt ihn aber nicht wirklich.',
    faq2q: 'Läuft obfuskierter Code langsamer?',
    faq2a: 'Moderne JavaScript-Engines optimieren Code zur Laufzeit, daher läuft obfuskierter Code normalerweise gleich schnell.',
    faq3q: 'Was ist der Unterschied zwischen Minifizierung und Obfuskierung?',
    faq3a: 'Minifizierung entfernt Leerzeichen. Obfuskierung geht weiter mit irreführenden Namen.',
    faq4q: 'Kann obfuskierter Code de-obfuskiert werden?',
    faq4a: 'Ja. Tools können obfuskierten Code teilweise wiederherstellen.',
    cta: 'Zum JavaScript-Minifier →',
    relatedTitle: 'Verwandte Tools',
  },
  es: { title: 'Ofuscador JavaScript Online', subtitle: 'Proteja Su Código JS — Gratis', intro: 'La ofuscación de JavaScript transforma su código legible en una versión difícil de entender.', whatIs: '¿Qué es la ofuscación JavaScript?', whatIsText: 'La ofuscación renombra variables, elimina espacios y puede codificar cadenas de texto.', howToUse: 'Cómo usar esta herramienta', step1: 'Pegue su código JavaScript', step2: 'Haga clic en el enlace al minificador', step3: 'Copie el resultado', note: 'Nota: Nuestro minificador JavaScript proporciona el primer paso de ofuscación.', faq: 'Preguntas frecuentes', faq1q: '¿Es lo mismo la ofuscación que el cifrado?', faq1a: 'No. La ofuscación hace el código más difícil de leer pero no lo cifra realmente.', faq2q: '¿El código ofuscado es más lento?', faq2a: 'Los motores JavaScript modernos optimizan el código en tiempo de ejecución.', faq3q: '¿Diferencia entre minificación y ofuscación?', faq3a: 'La minificación elimina espacios. La ofuscación va más allá con nombres engañosos.', faq4q: '¿Se puede des-ofuscar el código?', faq4a: 'Sí. Existen herramientas que pueden restaurar parcialmente el código.', cta: 'Ir al Minificador JavaScript →', relatedTitle: 'Herramientas relacionadas' },
  it: { title: 'Offuscatore JavaScript Online', subtitle: 'Proteggi Il Tuo Codice JS — Gratis', intro: 'L\'offuscamento JavaScript trasforma il tuo codice leggibile in una versione difficile da capire.', whatIs: 'Cos\'è l\'offuscamento JavaScript?', whatIsText: 'L\'offuscamento rinomina le variabili, rimuove gli spazi e può codificare le stringhe.', howToUse: 'Come usare questo strumento', step1: 'Incolla il tuo codice JavaScript', step2: 'Clicca sul link al minificatore', step3: 'Copia il risultato', note: 'Nota: Il nostro minificatore JavaScript fornisce il primo passo dell\'offuscamento.', faq: 'Domande frequenti', faq1q: 'L\'offuscamento è uguale alla crittografia?', faq1a: 'No. L\'offuscamento rende il codice più difficile da leggere ma non lo cripta veramente.', faq2q: 'Il codice offuscato è più lento?', faq2a: 'I motori JavaScript moderni ottimizzano il codice a runtime.', faq3q: 'Differenza tra minificazione e offuscamento?', faq3a: 'La minificazione rimuove gli spazi. L\'offuscamento va oltre.', faq4q: 'Il codice offuscato può essere de-offuscato?', faq4a: 'Sì. Gli strumenti possono ripristinare parzialmente il codice offuscato.', cta: 'Vai al Minificatore JavaScript →', relatedTitle: 'Strumenti correlati' },
  pt: { title: 'Ofuscador JavaScript Online', subtitle: 'Proteja Seu Código JS — Grátis', intro: 'A ofuscação JavaScript transforma seu código legível em uma versão difícil de entender.', whatIs: 'O que é ofuscação JavaScript?', whatIsText: 'A ofuscação renomeia variáveis, remove espaços e pode codificar strings.', howToUse: 'Como usar esta ferramenta', step1: 'Cole seu código JavaScript', step2: 'Clique no link para o minificador', step3: 'Copie o resultado', note: 'Nota: Nosso minificador JavaScript fornece o primeiro passo da ofuscação.', faq: 'Perguntas frequentes', faq1q: 'Ofuscação é o mesmo que criptografia?', faq1a: 'Não. A ofuscação torna o código mais difícil de ler, mas não o criptografa realmente.', faq2q: 'O código ofuscado é mais lento?', faq2a: 'Os mecanismos JavaScript modernos otimizam o código em tempo de execução.', faq3q: 'Diferença entre minificação e ofuscação?', faq3a: 'A minificação remove espaços. A ofuscação vai além.', faq4q: 'O código ofuscado pode ser des-ofuscado?', faq4a: 'Sim. Ferramentas podem restaurar parcialmente o código.', cta: 'Ir para o Minificador JavaScript →', relatedTitle: 'Ferramentas relacionadas' },
  nl: { title: 'JavaScript Obfuscator Online', subtitle: 'Bescherm Uw JS-Code — Gratis', intro: 'JavaScript-obfuscatie transformeert uw leesbare code naar een versie die moeilijk te begrijpen is.', whatIs: 'Wat is JavaScript-obfuscatie?', whatIsText: 'Obfuscatie hernoemt variabelen, verwijdert witruimte en kan strings coderen.', howToUse: 'Hoe dit hulpmiddel te gebruiken', step1: 'Plak uw JavaScript-code', step2: 'Klik op de link naar de minifier', step3: 'Kopieer het resultaat', note: 'Opmerking: Onze JavaScript-minifier biedt de eerste stap van obfuscatie.', faq: 'Veelgestelde vragen', faq1q: 'Is obfuscatie hetzelfde als versleuteling?', faq1a: 'Nee. Obfuscatie maakt code moeilijker leesbaar maar versleutelt het niet echt.', faq2q: 'Loopt geobfusceerde code langzamer?', faq2a: 'Moderne JavaScript-engines optimaliseren code tijdens runtime.', faq3q: 'Verschil tussen minificatie en obfuscatie?', faq3a: 'Minificatie verwijdert witruimte. Obfuscatie gaat verder.', faq4q: 'Kan geobfusceerde code worden gedeobfusceerd?', faq4a: 'Ja. Tools kunnen geobfusceerde code gedeeltelijk herstellen.', cta: 'Naar JavaScript Minifier →', relatedTitle: 'Gerelateerde tools' },
  pl: { title: 'Obfuskator JavaScript Online', subtitle: 'Chroń Swój Kod JS — Za Darmo', intro: 'Obfuskacja JavaScript przekształca Twój czytelny kod w wersję trudną do zrozumienia.', whatIs: 'Co to jest obfuskacja JavaScript?', whatIsText: 'Obfuskacja zmienia nazwy zmiennych, usuwa białe znaki i może kodować ciągi.', howToUse: 'Jak korzystać z tego narzędzia', step1: 'Wklej swój kod JavaScript', step2: 'Kliknij link do minifikatora', step3: 'Skopiuj wynik', note: 'Uwaga: Nasz minifikator JavaScript zapewnia pierwszy krok obfuskacji.', faq: 'Często zadawane pytania', faq1q: 'Czy obfuskacja to to samo co szyfrowanie?', faq1a: 'Nie. Obfuskacja utrudnia czytanie kodu, ale nie szyfruje go naprawdę.', faq2q: 'Czy obfuskowany kod działa wolniej?', faq2a: 'Nowoczesne silniki JavaScript optymalizują kod w czasie wykonywania.', faq3q: 'Różnica między minifikacją a obfuskacją?', faq3a: 'Minifikacja usuwa białe znaki. Obfuskacja idzie dalej.', faq4q: 'Czy obfuskowany kod można odwrócić?', faq4a: 'Tak. Narzędzia mogą częściowo przywrócić obfuskowany kod.', cta: 'Przejdź do Minifikatora JavaScript →', relatedTitle: 'Powiązane narzędzia' },
  sv: { title: 'JavaScript Obfuskator Online', subtitle: 'Skydda Din JS-Kod — Gratis', intro: 'JavaScript-obfuskering förvandlar din läsbara kod till en version som är svår att förstå.', whatIs: 'Vad är JavaScript-obfuskering?', whatIsText: 'Obfuskering byter namn på variabler, tar bort blanksteg och kan koda strängar.', howToUse: 'Hur man använder detta verktyg', step1: 'Klistra in din JavaScript-kod', step2: 'Klicka på länken till minifieraren', step3: 'Kopiera resultatet', note: 'Obs: Vår JavaScript-minifierare ger det första steget av obfuskering.', faq: 'Vanliga frågor', faq1q: 'Är obfuskering detsamma som kryptering?', faq1a: 'Nej. Obfuskering gör koden svårare att läsa men krypterar den inte riktigt.', faq2q: 'Körs obfuskerad kod långsammare?', faq2a: 'Moderna JavaScript-motorer optimerar kod under körning.', faq3q: 'Skillnad mellan minifiering och obfuskering?', faq3a: 'Minifiering tar bort blanksteg. Obfuskering går längre.', faq4q: 'Kan obfuskerad kod återställas?', faq4a: 'Ja. Verktyg kan delvis återställa obfuskerad kod.', cta: 'Gå till JavaScript-minifieraren →', relatedTitle: 'Relaterade verktyg' },
  no: { title: 'JavaScript Obfuskator Online', subtitle: 'Beskytt Din JS-Kode — Gratis', intro: 'JavaScript-obfuskering transformerer din lesbare kode til en versjon som er vanskelig å forstå.', whatIs: 'Hva er JavaScript-obfuskering?', whatIsText: 'Obfuskering gir variabler nye navn, fjerner mellomrom og kan kode strenger.', howToUse: 'Slik bruker du dette verktøyet', step1: 'Lim inn JavaScript-koden din', step2: 'Klikk på lenken til minifikatoren', step3: 'Kopier resultatet', note: 'Merk: Vår JavaScript-minifikator gir det første trinnet i obfuskering.', faq: 'Vanlige spørsmål', faq1q: 'Er obfuskering det samme som kryptering?', faq1a: 'Nei. Obfuskering gjør koden vanskeligere å lese men krypterer den ikke virkelig.', faq2q: 'Kjører obfuskert kode saktere?', faq2a: 'Moderne JavaScript-motorer optimaliserer kode under kjøring.', faq3q: 'Forskjell mellom minifisering og obfuskering?', faq3a: 'Minifisering fjerner mellomrom. Obfuskering går lenger.', faq4q: 'Kan obfuskert kode reverseres?', faq4a: 'Ja. Verktøy kan delvis gjenopprette obfuskert kode.', cta: 'Gå til JavaScript-minifikator →', relatedTitle: 'Relaterte verktøy' },
  zh: { title: '在线JavaScript混淆器', subtitle: '保护您的JS代码 — 免费使用', intro: 'JavaScript混淆将您的可读代码转换为难以理解和逆向工程的版本，同时保持完整功能。', whatIs: '什么是JavaScript混淆？', whatIsText: '混淆将变量重命名为无意义的名称，删除空白和注释，并可以编码字符串文字。', howToUse: '如何使用此工具', step1: '将您的JavaScript代码粘贴到下面', step2: '点击"跳转到JavaScript压缩器"', step3: '复制混淆后的结果', note: '注意：我们的JavaScript压缩器提供压缩功能，这是混淆的第一步。', faq: '常见问题', faq1q: 'JavaScript混淆与加密相同吗？', faq1a: '不同。混淆使代码更难读，但并不真正加密它。', faq2q: '混淆后的代码会运行更慢吗？', faq2a: '现代JavaScript引擎在运行时优化代码，所以混淆后的代码通常运行速度相同。', faq3q: '压缩和混淆有什么区别？', faq3a: '压缩删除空白。混淆通过使用误导性名称更进一步。', faq4q: '混淆后的代码能被反混淆吗？', faq4a: '是的。工具可以部分恢复混淆的代码。', cta: '跳转到JavaScript压缩器 →', relatedTitle: '相关工具' },
  ja: { title: 'JavaScriptオブファスケーターオンライン', subtitle: 'JSコードを保護 — 無料', intro: 'JavaScriptの難読化は、読み取り可能なコードを理解しにくいバージョンに変換します。', whatIs: 'JavaScriptの難読化とは？', whatIsText: '難読化は変数を意味のない名前に変更し、空白やコメントを削除します。', howToUse: 'このツールの使い方', step1: 'JavaScriptコードを貼り付ける', step2: 'JavaScriptミニファイアーへのリンクをクリック', step3: '結果をコピー', note: '注意：JavaScriptミニファイアーは難読化の最初のステップを提供します。', faq: 'よくある質問', faq1q: '難読化と暗号化は同じですか？', faq1a: 'いいえ。難読化はコードを読みにくくしますが、本当に暗号化するわけではありません。', faq2q: '難読化されたコードは遅いですか？', faq2a: '最新のJavaScriptエンジンはランタイムでコードを最適化するため、通常同じ速度で実行されます。', faq3q: 'ミニファイと難読化の違いは？', faq3a: 'ミニファイは空白を削除します。難読化はさらに進んで誤解を招く名前を使います。', faq4q: '難読化されたコードは復元できますか？', faq4a: 'はい。ツールで部分的に復元できます。', cta: 'JavaScriptミニファイアーへ →', relatedTitle: '関連ツール' },
  ko: { title: '온라인 JavaScript 난독화 도구', subtitle: 'JS 코드 보호 — 무료', intro: 'JavaScript 난독화는 읽기 가능한 코드를 이해하기 어려운 버전으로 변환합니다.', whatIs: 'JavaScript 난독화란?', whatIsText: '난독화는 변수 이름을 변경하고, 공백을 제거하며, 문자열을 인코딩할 수 있습니다.', howToUse: '이 도구 사용 방법', step1: 'JavaScript 코드 붙여넣기', step2: 'JavaScript 압축기 링크 클릭', step3: '결과 복사', note: '참고: JavaScript 압축기는 난독화의 첫 번째 단계를 제공합니다.', faq: '자주 묻는 질문', faq1q: '난독화와 암호화는 같은가요?', faq1a: '아니요. 난독화는 코드를 읽기 어렵게 만들지만 실제로 암호화하지는 않습니다.', faq2q: '난독화된 코드는 더 느린가요?', faq2a: '최신 JavaScript 엔진은 런타임에 코드를 최적화하므로 일반적으로 동일한 속도로 실행됩니다.', faq3q: '축소와 난독화의 차이점은?', faq3a: '축소는 공백을 제거합니다. 난독화는 더 나아가 오해를 불러일으키는 이름을 사용합니다.', faq4q: '난독화된 코드를 복원할 수 있나요?', faq4a: '네. 도구로 부분적으로 복원할 수 있습니다.', cta: 'JavaScript 압축기로 이동 →', relatedTitle: '관련 도구' },
  id: { title: 'Obfuskator JavaScript Online', subtitle: 'Lindungi Kode JS Anda — Gratis', intro: 'Obfuskasi JavaScript mengubah kode yang dapat dibaca menjadi versi yang sulit dipahami.', whatIs: 'Apa itu obfuskasi JavaScript?', whatIsText: 'Obfuskasi mengganti nama variabel, menghapus spasi dan dapat mengkodekan string.', howToUse: 'Cara menggunakan alat ini', step1: 'Tempel kode JavaScript Anda', step2: 'Klik tautan ke minifier', step3: 'Salin hasilnya', note: 'Catatan: Minifier JavaScript kami menyediakan langkah pertama obfuskasi.', faq: 'Pertanyaan yang sering diajukan', faq1q: 'Apakah obfuskasi sama dengan enkripsi?', faq1a: 'Tidak. Obfuskasi membuat kode lebih sulit dibaca tetapi tidak benar-benar mengenkripsinya.', faq2q: 'Apakah kode yang diobfuskasi lebih lambat?', faq2a: 'Mesin JavaScript modern mengoptimalkan kode pada runtime.', faq3q: 'Perbedaan antara minifikasi dan obfuskasi?', faq3a: 'Minifikasi menghapus spasi. Obfuskasi lebih jauh.', faq4q: 'Bisakah kode yang diobfuskasi dikembalikan?', faq4a: 'Ya. Alat dapat memulihkan sebagian kode yang diobfuskasi.', cta: 'Pergi ke Minifier JavaScript →', relatedTitle: 'Alat terkait' },
  th: { title: 'JavaScript Obfuscator ออนไลน์', subtitle: 'ปกป้องโค้ด JS ของคุณ — ฟรี', intro: 'การ obfuscate JavaScript แปลงโค้ดที่อ่านได้เป็นเวอร์ชันที่เข้าใจยาก', whatIs: 'JavaScript Obfuscation คืออะไร?', whatIsText: 'Obfuscation เปลี่ยนชื่อตัวแปร ลบช่องว่าง และสามารถเข้ารหัสสตริงได้', howToUse: 'วิธีใช้เครื่องมือนี้', step1: 'วางโค้ด JavaScript ของคุณ', step2: 'คลิกลิงก์ไปยัง JavaScript Minifier', step3: 'คัดลอกผลลัพธ์', note: 'หมายเหตุ: JavaScript Minifier ของเราให้ขั้นตอนแรกของ obfuscation', faq: 'คำถามที่พบบ่อย', faq1q: 'Obfuscation เหมือนกับการเข้ารหัสหรือไม่?', faq1a: 'ไม่ Obfuscation ทำให้โค้ดอ่านยากขึ้น แต่ไม่ได้เข้ารหัสจริงๆ', faq2q: 'โค้ดที่ obfuscate แล้วทำงานช้าลงหรือไม่?', faq2a: 'เครื่องมือ JavaScript สมัยใหม่ปรับโค้ดให้เหมาะสมที่ runtime', faq3q: 'ความแตกต่างระหว่าง minification และ obfuscation?', faq3a: 'Minification ลบช่องว่าง Obfuscation ไปไกลกว่าด้วยชื่อที่ทำให้เข้าใจผิด', faq4q: 'โค้ดที่ obfuscate แล้วสามารถกู้คืนได้หรือไม่?', faq4a: 'ได้ เครื่องมือสามารถกู้คืนโค้ดที่ obfuscate ได้บางส่วน', cta: 'ไปที่ JavaScript Minifier →', relatedTitle: 'เครื่องมือที่เกี่ยวข้อง' },
};

export default function JavaScriptObfuscatorOnlinePage({ params }: { params: { lang: string } }) {
  const lang = params?.lang || 'en';
  const tr = t[lang] || t.en;

  const steps = [tr.step1, tr.step2, tr.step3];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">{tr.title}</h1>
      <p className="text-blue-600 font-medium mb-6">{tr.subtitle}</p>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
        <p className="text-gray-700 leading-relaxed">{tr.intro}</p>
      </div>

      <div className="text-center mb-8">
        <a
          href={`/${lang}/tools/javascript-minifier`}
          className="inline-block px-8 py-4 bg-blue-600 text-white text-lg font-semibold rounded-xl hover:bg-blue-700 transition-colors shadow-md"
        >
          {tr.cta}
        </a>
        <p className="text-sm text-gray-500 mt-2">{tr.note}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">{tr.whatIs}</h2>
          <p className="text-gray-600">{tr.whatIsText}</p>

          <div className="mt-4 space-y-2">
            {['Variable renaming (a → _0x1a2b)', 'String encoding ("hello" → \'\\x68\\x65\\x6c\\x6c\\x6f\')', 'Dead code injection', 'Control flow flattening'].map((item, i) => (
              <div key={i} className="flex items-start gap-2">
                <span className="text-green-500 font-bold mt-0.5">✓</span>
                <span className="text-sm text-gray-600">{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">{tr.howToUse}</h2>
          <ol className="space-y-3">
            {steps.map((step, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="flex-shrink-0 w-7 h-7 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  {i + 1}
                </span>
                <span className="text-gray-600 mt-0.5">{step}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Before vs After Obfuscation</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-medium text-gray-500 mb-2">Original Code</p>
            <pre className="bg-gray-50 border rounded p-3 text-xs font-mono overflow-x-auto text-gray-800">
{`function calculateTotal(price, tax) {
  const total = price * (1 + tax);
  return Math.round(total * 100) / 100;
}`}
            </pre>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500 mb-2">Minified Code</p>
            <pre className="bg-gray-900 text-green-400 rounded p-3 text-xs font-mono overflow-x-auto">
{`function calculateTotal(a,b){const c=a*(1+b);return Math.round(c*100)/100;}`}
            </pre>
          </div>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-6">{tr.faq}</h2>
        <div className="space-y-4">
          {[
            { q: tr.faq1q, a: tr.faq1a },
            { q: tr.faq2q, a: tr.faq2a },
            { q: tr.faq3q, a: tr.faq3a },
            { q: tr.faq4q, a: tr.faq4a },
          ].map((item, i) => (
            <div key={i} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
              <h3 className="font-semibold text-gray-900 mb-2">{item.q}</h3>
              <p className="text-gray-600 text-sm">{item.a}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">{tr.relatedTitle}</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {[
            { href: `/${lang}/tools/javascript-minifier`, label: 'JS Minifier' },
            { href: `/${lang}/tools/css-minifier`, label: 'CSS Minifier' },
            { href: `/${lang}/tools/html-minifier`, label: 'HTML Minifier' },
            { href: `/${lang}/tools/base64-encode`, label: 'Base64 Encoder' },
            { href: `/${lang}/tools/json-formatter`, label: 'JSON Formatter' },
            { href: `/${lang}/tools/url-encoder`, label: 'URL Encoder' },
          ].map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-center p-3 bg-white border border-gray-200 rounded-lg hover:border-blue-400 hover:text-blue-600 text-sm font-medium text-gray-700 transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
