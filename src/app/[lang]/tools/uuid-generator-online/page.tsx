'use client';

import { use, useState, useCallback } from 'react';

const strings: Record<string, Record<string, string>> = {
  en: {
    title: 'UUID Generator Online',
    description: 'Generate UUID v4 identifiers. Bulk generate 1 to 100 UUIDs at once, copy individual or all UUIDs.',
    count: 'Number of UUIDs',
    generate: 'Generate',
    copyAll: 'Copy All',
    clear: 'Clear',
    copy: 'Copy', copied: 'Copied!',
    timestamp: 'Generated at',
    uppercase: 'Uppercase',
    noBraces: 'Without braces',
    withBraces: 'With braces',
    total: 'Total',
    introTitle: 'Free Online UUID v4 Generator',
    introText: 'Generate cryptographically random UUID v4 identifiers instantly. Create up to 100 UUIDs at once with options for uppercase, braces formatting, and one-click copy. UUIDs (Universally Unique Identifiers) are 128-bit values used to uniquely identify resources in distributed systems.',
    faqTitle: 'Frequently Asked Questions',
  },
  zh: {
    title: 'UUID 在线生成器',
    description: '生成 UUID v4 标识符。批量生成 1 到 100 个 UUID，复制单个或全部。',
    count: 'UUID 数量',
    generate: '生成',
    copyAll: '全部复制',
    clear: '清除',
    copy: '复制', copied: '已复制！',
    timestamp: '生成时间',
    uppercase: '大写',
    noBraces: '不带花括号',
    withBraces: '带花括号',
    total: '总计',
    introTitle: '免费在线 UUID v4 生成器',
    introText: '即时生成加密随机的 UUID v4 标识符。一次最多创建 100 个 UUID，支持大写、花括号格式和一键复制。',
    faqTitle: '常见问题',
  },
  ja: {
    title: 'UUID オンラインジェネレーター',
    description: 'UUID v4 識別子を生成。一度に 1～100 個を一括生成、個別または全てコピー。',
    count: 'UUID の数',
    generate: '生成',
    copyAll: '全てコピー',
    clear: 'クリア',
    copy: 'コピー', copied: 'コピー済み！',
    timestamp: '生成時刻',
    uppercase: '大文字',
    noBraces: '括弧なし',
    withBraces: '括弧あり',
    total: '合計',
    introTitle: '無料オンライン UUID v4 ジェネレーター',
    introText: '暗号的にランダムな UUID v4 識別子を即座に生成します。一度に最大 100 個の UUID を作成でき、大文字や括弧フォーマットに対応。',
    faqTitle: 'よくある質問',
  },
  ko: {
    title: 'UUID 온라인 생성기',
    description: 'UUID v4 식별자를 생성합니다. 한 번에 1~100개 UUID를 일괄 생성하고 개별 또는 전체 복사.',
    count: 'UUID 수',
    generate: '생성',
    copyAll: '모두 복사',
    clear: '지우기',
    copy: '복사', copied: '복사됨!',
    timestamp: '생성 시간',
    uppercase: '대문자',
    noBraces: '중괄호 없이',
    withBraces: '중괄호 포함',
    total: '총',
    introTitle: '무료 온라인 UUID v4 생성기',
    introText: '암호학적으로 랜덤한 UUID v4 식별자를 즉시 생성합니다. 한 번에 최대 100개의 UUID를 만들 수 있으며 대문자 및 중괄호 형식을 지원합니다.',
    faqTitle: '자주 묻는 질문',
  },
  fr: {
    title: 'Generateur UUID en Ligne',
    description: 'Generez des identifiants UUID v4. Generation en masse de 1 a 100 UUID, copie individuelle ou groupee.',
    count: 'Nombre d\'UUID',
    generate: 'Generer',
    copyAll: 'Tout copier',
    clear: 'Effacer',
    copy: 'Copier', copied: 'Copie !',
    timestamp: 'Genere a',
    uppercase: 'Majuscules',
    noBraces: 'Sans accolades',
    withBraces: 'Avec accolades',
    total: 'Total',
    introTitle: 'Generateur UUID v4 en ligne gratuit',
    introText: 'Generez des identifiants UUID v4 aleatoires instantanement. Creez jusqu\'a 100 UUID a la fois avec options majuscules et accolades.',
    faqTitle: 'Questions frequentes',
  },
  de: {
    title: 'UUID Generator Online',
    description: 'UUID v4 Identifikatoren generieren. Massengenerierung von 1 bis 100 UUIDs, einzeln oder alle kopieren.',
    count: 'Anzahl UUIDs',
    generate: 'Generieren',
    copyAll: 'Alle kopieren',
    clear: 'Loschen',
    copy: 'Kopieren', copied: 'Kopiert!',
    timestamp: 'Generiert um',
    uppercase: 'Grossbuchstaben',
    noBraces: 'Ohne Klammern',
    withBraces: 'Mit Klammern',
    total: 'Gesamt',
    introTitle: 'Kostenloser Online UUID v4 Generator',
    introText: 'Generieren Sie sofort kryptografisch zufällige UUID v4 Identifikatoren. Erstellen Sie bis zu 100 UUIDs auf einmal.',
    faqTitle: 'Haufig gestellte Fragen',
  },
  es: {
    title: 'Generador UUID en Linea',
    description: 'Genere identificadores UUID v4. Generacion masiva de 1 a 100 UUID, copie individual o todos.',
    count: 'Numero de UUID',
    generate: 'Generar',
    copyAll: 'Copiar todos',
    clear: 'Limpiar',
    copy: 'Copiar', copied: 'Copiado!',
    timestamp: 'Generado a las',
    uppercase: 'Mayusculas',
    noBraces: 'Sin llaves',
    withBraces: 'Con llaves',
    total: 'Total',
    introTitle: 'Generador UUID v4 en linea gratuito',
    introText: 'Genere identificadores UUID v4 aleatorios al instante. Cree hasta 100 UUID a la vez con opciones de mayusculas y llaves.',
    faqTitle: 'Preguntas frecuentes',
  },
  pt: {
    title: 'Gerador UUID Online',
    description: 'Gere identificadores UUID v4. Geracao em massa de 1 a 100 UUIDs, copie individual ou todos.',
    count: 'Numero de UUIDs',
    generate: 'Gerar',
    copyAll: 'Copiar todos',
    clear: 'Limpar',
    copy: 'Copiar', copied: 'Copiado!',
    timestamp: 'Gerado em',
    uppercase: 'Maiusculas',
    noBraces: 'Sem chaves',
    withBraces: 'Com chaves',
    total: 'Total',
    introTitle: 'Gerador UUID v4 online gratuito',
    introText: 'Gere identificadores UUID v4 aleatorios instantaneamente. Crie ate 100 UUIDs de uma vez com opcoes de maiusculas e chaves.',
    faqTitle: 'Perguntas frequentes',
  },
  it: {
    title: 'Generatore UUID Online',
    description: 'Genera identificatori UUID v4. Generazione in massa da 1 a 100 UUID, copia singola o tutti.',
    count: 'Numero di UUID',
    generate: 'Genera',
    copyAll: 'Copia tutti',
    clear: 'Cancella',
    copy: 'Copia', copied: 'Copiato!',
    timestamp: 'Generato alle',
    uppercase: 'Maiuscole',
    noBraces: 'Senza parentesi',
    withBraces: 'Con parentesi',
    total: 'Totale',
    introTitle: 'Generatore UUID v4 online gratuito',
    introText: 'Genera identificatori UUID v4 casuali istantaneamente. Crea fino a 100 UUID alla volta con opzioni maiuscole e parentesi.',
    faqTitle: 'Domande frequenti',
  },
  nl: {
    title: 'UUID Generator Online',
    description: 'Genereer UUID v4 identificatoren. Bulkgeneratie van 1 tot 100 UUIDs, kopieer individueel of alles.',
    count: 'Aantal UUIDs',
    generate: 'Genereren',
    copyAll: 'Alles kopieren',
    clear: 'Wissen',
    copy: 'Kopieren', copied: 'Gekopieerd!',
    timestamp: 'Gegenereerd op',
    uppercase: 'Hoofdletters',
    noBraces: 'Zonder accolades',
    withBraces: 'Met accolades',
    total: 'Totaal',
    introTitle: 'Gratis online UUID v4 generator',
    introText: 'Genereer direct cryptografisch willekeurige UUID v4 identificatoren. Maak tot 100 UUIDs tegelijk met hoofdletters en accolades opties.',
    faqTitle: 'Veelgestelde vragen',
  },
  pl: {
    title: 'Generator UUID Online',
    description: 'Generuj identyfikatory UUID v4. Masowe generowanie od 1 do 100 UUID, kopiuj pojedynczo lub wszystkie.',
    count: 'Liczba UUID',
    generate: 'Generuj',
    copyAll: 'Kopiuj wszystkie',
    clear: 'Wyczysc',
    copy: 'Kopiuj', copied: 'Skopiowano!',
    timestamp: 'Wygenerowano o',
    uppercase: 'Wielkie litery',
    noBraces: 'Bez nawiasow',
    withBraces: 'Z nawiasami',
    total: 'Razem',
    introTitle: 'Darmowy generator UUID v4 online',
    introText: 'Generuj kryptograficznie losowe identyfikatory UUID v4 natychmiast. Tworzenie do 100 UUID naraz z opcjami wielkich liter i nawiasow.',
    faqTitle: 'Czesto zadawane pytania',
  },
  sv: {
    title: 'UUID Generator Online',
    description: 'Generera UUID v4 identifierare. Bulkgenerering av 1 till 100 UUIDs, kopiera individuellt eller alla.',
    count: 'Antal UUIDs',
    generate: 'Generera',
    copyAll: 'Kopiera alla',
    clear: 'Rensa',
    copy: 'Kopiera', copied: 'Kopierad!',
    timestamp: 'Genererad',
    uppercase: 'Versaler',
    noBraces: 'Utan klammerpar',
    withBraces: 'Med klammerpar',
    total: 'Totalt',
    introTitle: 'Gratis online UUID v4 generator',
    introText: 'Generera kryptografiskt slumpvisa UUID v4 identifierare direkt. Skapa upp till 100 UUIDs pa en gang.',
    faqTitle: 'Vanliga fragor',
  },
  no: {
    title: 'UUID Generator Online',
    description: 'Generer UUID v4 identifikatorer. Bulkgenerering av 1 til 100 UUIDs, kopier enkeltvis eller alle.',
    count: 'Antall UUIDs',
    generate: 'Generer',
    copyAll: 'Kopier alle',
    clear: 'Tøm',
    copy: 'Kopier', copied: 'Kopiert!',
    timestamp: 'Generert',
    uppercase: 'Store bokstaver',
    noBraces: 'Uten klammeparenteser',
    withBraces: 'Med klammeparenteser',
    total: 'Totalt',
    introTitle: 'Gratis online UUID v4 generator',
    introText: 'Generer kryptografisk tilfeldige UUID v4 identifikatorer umiddelbart. Opprett opptil 100 UUIDs om gangen.',
    faqTitle: 'Ofte stilte sporsmal',
  },
  id: {
    title: 'Generator UUID Online',
    description: 'Hasilkan identifier UUID v4. Generasi massal 1 hingga 100 UUID sekaligus, salin individu atau semua.',
    count: 'Jumlah UUID',
    generate: 'Hasilkan',
    copyAll: 'Salin Semua',
    clear: 'Hapus',
    copy: 'Salin', copied: 'Disalin!',
    timestamp: 'Dihasilkan pada',
    uppercase: 'Huruf besar',
    noBraces: 'Tanpa kurung kurawal',
    withBraces: 'Dengan kurung kurawal',
    total: 'Total',
    introTitle: 'Generator UUID v4 Online Gratis',
    introText: 'Hasilkan identifier UUID v4 acak secara kriptografis secara instan. Buat hingga 100 UUID sekaligus dengan opsi huruf besar dan kurung kurawal.',
    faqTitle: 'Pertanyaan yang Sering Diajukan',
  },
  th: {
    title: 'ตัวสร้าง UUID ออนไลน์',
    description: 'สร้างตัวระบุ UUID v4 สร้างจำนวนมาก 1 ถึง 100 UUID ในครั้งเดียว คัดลอกทีละตัวหรือทั้งหมด',
    count: 'จำนวน UUID',
    generate: 'สร้าง',
    copyAll: 'คัดลอกทั้งหมด',
    clear: 'ล้าง',
    copy: 'คัดลอก', copied: 'คัดลอกแล้ว!',
    timestamp: 'สร้างเมื่อ',
    uppercase: 'ตัวพิมพ์ใหญ่',
    noBraces: 'ไม่มีวงเล็บ',
    withBraces: 'มีวงเล็บ',
    total: 'ทั้งหมด',
    introTitle: 'ตัวสร้าง UUID v4 ออนไลน์ฟรี',
    introText: 'สร้างตัวระบุ UUID v4 แบบสุ่มเข้ารหัสทันที สร้างได้สูงสุด 100 UUID ในครั้งเดียวพร้อมตัวเลือกตัวพิมพ์ใหญ่และวงเล็บ',
    faqTitle: 'คำถามที่พบบ่อย',
  },
};

const faqData: Record<string, Array<{ q: string; a: string }>> = {
  en: [
    { q: 'What is a UUID v4?', a: 'UUID v4 (Universally Unique Identifier version 4) is a 128-bit random identifier formatted as 32 hexadecimal digits in five groups separated by hyphens (e.g., 550e8400-e29b-41d4-a716-446655440000). Version 4 UUIDs are generated using random or pseudo-random numbers.' },
    { q: 'How unique are UUID v4s?', a: 'UUID v4 uses 122 random bits, providing approximately 5.3 x 10^36 possible values. The probability of generating a duplicate is astronomically low - you would need to generate about 2.71 quintillion UUIDs to have a 50% chance of a single collision.' },
    { q: 'Can I generate multiple UUIDs at once?', a: 'Yes. Use the count slider or input to specify how many UUIDs you need (1 to 100). All UUIDs are generated instantly and you can copy them individually or all at once.' },
    { q: 'What are UUIDs used for?', a: 'UUIDs are used as primary keys in databases, session identifiers, API request IDs, distributed system identifiers, file names, and anywhere a unique identifier is needed without centralized coordination.' },
    { q: 'Is this generator secure?', a: 'Yes. This tool uses the browser\'s crypto.randomUUID() API or crypto.getRandomValues() which provides cryptographically secure random numbers. All generation happens locally in your browser.' },
  ],
  zh: [
    { q: '什么是 UUID v4？', a: 'UUID v4 是一种 128 位随机标识符，格式为 32 个十六进制数字分为 5 组，以连字符分隔。版本 4 UUID 使用随机数生成。' },
    { q: 'UUID v4 有多唯一？', a: 'UUID v4 使用 122 位随机比特，提供约 5.3 x 10^36 种可能值。生成重复的概率极低。' },
    { q: '可以一次生成多个 UUID 吗？', a: '可以。使用滑块指定数量（1 到 100），所有 UUID 即时生成，可单独或全部复制。' },
    { q: 'UUID 用于什么？', a: 'UUID 用作数据库主键、会话标识符、API 请求 ID、分布式系统标识符等需要唯一标识的场景。' },
    { q: '此生成器安全吗？', a: '是的。使用浏览器的 crypto.randomUUID() API，提供加密安全的随机数。所有生成都在浏览器本地完成。' },
  ],
  ja: [
    { q: 'UUID v4とは何ですか？', a: 'UUID v4は128ビットのランダム識別子で、32桁の16進数がハイフンで区切られた5つのグループとしてフォーマットされます。バージョン4はランダム数を使用して生成されます。' },
    { q: 'UUID v4はどれくらいユニークですか？', a: 'UUID v4は122ビットのランダムビットを使用し、約5.3 x 10^36の可能な値を提供します。重複する確率は天文学的に低いです。' },
    { q: '一度に複数のUUIDを生成できますか？', a: 'はい。スライダーで数量（1〜100）を指定でき、全てのUUIDが即座に生成されます。個別または一括でコピーできます。' },
    { q: 'UUIDは何に使われますか？', a: 'データベースの主キー、セッション識別子、APIリクエストID、分散システムの識別子などに使用されます。' },
    { q: 'このジェネレーターは安全ですか？', a: 'はい。ブラウザのcrypto.randomUUID() APIを使用し、暗号学的に安全な乱数を提供します。' },
  ],
  ko: [
    { q: 'UUID v4란 무엇인가요?', a: 'UUID v4는 128비트 랜덤 식별자로, 32개의 16진수 숫자가 하이픈으로 구분된 5개 그룹으로 포맷됩니다. 버전 4는 난수를 사용하여 생성됩니다.' },
    { q: 'UUID v4는 얼마나 고유한가요?', a: 'UUID v4는 122개의 랜덤 비트를 사용하여 약 5.3 x 10^36개의 가능한 값을 제공합니다. 중복 확률은 천문학적으로 낮습니다.' },
    { q: '한 번에 여러 UUID를 생성할 수 있나요?', a: '네. 슬라이더로 수량(1~100)을 지정할 수 있으며 모든 UUID가 즉시 생성됩니다.' },
    { q: 'UUID는 무엇에 사용되나요?', a: '데이터베이스 기본 키, 세션 식별자, API 요청 ID, 분산 시스템 식별자 등에 사용됩니다.' },
    { q: '이 생성기는 안전한가요?', a: '네. 브라우저의 crypto.randomUUID() API를 사용하여 암호학적으로 안전한 난수를 제공합니다.' },
  ],
  fr: [
    { q: 'Qu\'est-ce qu\'un UUID v4 ?', a: 'UUID v4 est un identifiant aleatoire de 128 bits formate en 32 chiffres hexadecimaux separes par des tirets. La version 4 est generee avec des nombres aleatoires.' },
    { q: 'A quel point les UUID v4 sont-ils uniques ?', a: 'UUID v4 utilise 122 bits aleatoires, offrant environ 5.3 x 10^36 valeurs possibles. La probabilite de collision est astronomiquement faible.' },
    { q: 'Puis-je generer plusieurs UUID a la fois ?', a: 'Oui. Specifiez le nombre souhaite (1 a 100). Tous les UUID sont generes instantanement.' },
    { q: 'A quoi servent les UUID ?', a: 'Cles primaires de bases de donnees, identifiants de session, identifiants d\'API, systemes distribues, etc.' },
    { q: 'Ce generateur est-il securise ?', a: 'Oui. Il utilise l\'API crypto.randomUUID() du navigateur pour des nombres aleatoires cryptographiquement surs.' },
  ],
  de: [
    { q: 'Was ist eine UUID v4?', a: 'UUID v4 ist ein 128-Bit-Zufallsidentifikator, formatiert als 32 Hexadezimalziffern in funf durch Bindestriche getrennten Gruppen. Version 4 wird mit Zufallszahlen generiert.' },
    { q: 'Wie einzigartig sind UUID v4s?', a: 'UUID v4 verwendet 122 zufallige Bits und bietet etwa 5.3 x 10^36 mogliche Werte. Die Kollisionswahrscheinlichkeit ist astronomisch gering.' },
    { q: 'Kann ich mehrere UUIDs auf einmal generieren?', a: 'Ja. Geben Sie die gewunschte Anzahl an (1 bis 100). Alle UUIDs werden sofort generiert.' },
    { q: 'Wofur werden UUIDs verwendet?', a: 'Datenbankprimarschlussel, Sitzungskennung, API-Anfrage-IDs, verteilte Systemkennung usw.' },
    { q: 'Ist dieser Generator sicher?', a: 'Ja. Er verwendet die crypto.randomUUID() API des Browsers fur kryptographisch sichere Zufallszahlen.' },
  ],
  es: [
    { q: 'Que es un UUID v4?', a: 'UUID v4 es un identificador aleatorio de 128 bits formateado como 32 digitos hexadecimales separados por guiones. La version 4 se genera con numeros aleatorios.' },
    { q: 'Que tan unicos son los UUID v4?', a: 'UUID v4 utiliza 122 bits aleatorios, proporcionando aproximadamente 5.3 x 10^36 valores posibles. La probabilidad de colision es astronomicamente baja.' },
    { q: 'Puedo generar multiples UUID a la vez?', a: 'Si. Especifique la cantidad deseada (1 a 100). Todos los UUID se generan instantaneamente.' },
    { q: 'Para que se usan los UUID?', a: 'Claves primarias de bases de datos, identificadores de sesion, IDs de solicitud API, sistemas distribuidos, etc.' },
    { q: 'Es seguro este generador?', a: 'Si. Utiliza la API crypto.randomUUID() del navegador para numeros aleatorios criptograficamente seguros.' },
  ],
  pt: [
    { q: 'O que e UUID v4?', a: 'UUID v4 e um identificador aleatorio de 128 bits formatado como 32 digitos hexadecimais separados por hifens. A versao 4 e gerada com numeros aleatorios.' },
    { q: 'Quao unicos sao os UUID v4?', a: 'UUID v4 usa 122 bits aleatorios, fornecendo aproximadamente 5.3 x 10^36 valores possiveis.' },
    { q: 'Posso gerar multiplos UUIDs de uma vez?', a: 'Sim. Especifique a quantidade desejada (1 a 100). Todos os UUIDs sao gerados instantaneamente.' },
    { q: 'Para que sao usados UUIDs?', a: 'Chaves primarias de banco de dados, identificadores de sessao, IDs de requisicao de API, sistemas distribuidos, etc.' },
    { q: 'Este gerador e seguro?', a: 'Sim. Utiliza a API crypto.randomUUID() do navegador para numeros aleatorios criptograficamente seguros.' },
  ],
  it: [
    { q: 'Cos\'e un UUID v4?', a: 'UUID v4 e un identificatore casuale a 128 bit formattato come 32 cifre esadecimali separate da trattini. La versione 4 e generata con numeri casuali.' },
    { q: 'Quanto sono unici gli UUID v4?', a: 'UUID v4 utilizza 122 bit casuali, fornendo circa 5.3 x 10^36 valori possibili.' },
    { q: 'Posso generare piu UUID alla volta?', a: 'Si. Specifica la quantita desiderata (1 a 100). Tutti gli UUID vengono generati istantaneamente.' },
    { q: 'A cosa servono gli UUID?', a: 'Chiavi primarie di database, identificatori di sessione, ID di richiesta API, sistemi distribuiti, ecc.' },
    { q: 'Questo generatore e sicuro?', a: 'Si. Utilizza l\'API crypto.randomUUID() del browser per numeri casuali crittograficamente sicuri.' },
  ],
  nl: [
    { q: 'Wat is een UUID v4?', a: 'UUID v4 is een 128-bit willekeurige identificator opgemaakt als 32 hexadecimale cijfers gescheiden door streepjes. Versie 4 wordt gegenereerd met willekeurige getallen.' },
    { q: 'Hoe uniek zijn UUID v4s?', a: 'UUID v4 gebruikt 122 willekeurige bits, wat ongeveer 5.3 x 10^36 mogelijke waarden oplevert.' },
    { q: 'Kan ik meerdere UUIDs tegelijk genereren?', a: 'Ja. Specificeer het gewenste aantal (1 tot 100). Alle UUIDs worden direct gegenereerd.' },
    { q: 'Waarvoor worden UUIDs gebruikt?', a: 'Database primaire sleutels, sessie-identificatoren, API-verzoek-IDs, gedistribueerde systemen, enz.' },
    { q: 'Is deze generator veilig?', a: 'Ja. Het gebruikt de crypto.randomUUID() API van de browser voor cryptografisch veilige willekeurige getallen.' },
  ],
  pl: [
    { q: 'Co to jest UUID v4?', a: 'UUID v4 to 128-bitowy losowy identyfikator sformatowany jako 32 cyfry szesnastkowe rozdzielone myslnikami. Wersja 4 jest generowana za pomoca liczb losowych.' },
    { q: 'Jak unikalne sa UUID v4?', a: 'UUID v4 uzywa 122 losowych bitow, dajac okolo 5.3 x 10^36 mozliwych wartosci.' },
    { q: 'Czy moge generowac wiele UUID na raz?', a: 'Tak. Okresl zadana ilosc (1 do 100). Wszystkie UUID sa generowane natychmiast.' },
    { q: 'Do czego sluza UUID?', a: 'Klucze glowne baz danych, identyfikatory sesji, ID zadan API, systemy rozproszone itp.' },
    { q: 'Czy ten generator jest bezpieczny?', a: 'Tak. Uzywa API crypto.randomUUID() przegladarki do kryptograficznie bezpiecznych liczb losowych.' },
  ],
  sv: [
    { q: 'Vad ar en UUID v4?', a: 'UUID v4 ar en 128-bitars slumpidentifierare formaterad som 32 hexadecimala siffror indelade i fem grupper atskilda med bindestreck. Version 4 genereras med slumptal.' },
    { q: 'Hur unika ar UUID v4?', a: 'UUID v4 anvander 122 slumpmassiga bitar, vilket ger cirka 5.3 x 10^36 mojliga varden.' },
    { q: 'Kan jag generera flera UUIDs pa en gang?', a: 'Ja. Ange onskat antal (1 till 100). Alla UUIDs genereras direkt.' },
    { q: 'Vad anvands UUIDs till?', a: 'Databasnycklar, sessionsidentifierare, API-forfragan-IDs, distribuerade system osv.' },
    { q: 'Ar denna generator saker?', a: 'Ja. Den anvander webbplasarens crypto.randomUUID() API for kryptografiskt sakra slumptal.' },
  ],
  no: [
    { q: 'Hva er en UUID v4?', a: 'UUID v4 er en 128-biters tilfeldig identifikator formatert som 32 heksadesimale sifre delt i fem grupper atskilt med bindestreker. Versjon 4 genereres med tilfeldige tall.' },
    { q: 'Hvor unike er UUID v4?', a: 'UUID v4 bruker 122 tilfeldige biter, noe som gir omtrent 5.3 x 10^36 mulige verdier.' },
    { q: 'Kan jeg generere flere UUIDs pa en gang?', a: 'Ja. Angi onsket antall (1 til 100). Alle UUIDs genereres umiddelbart.' },
    { q: 'Hva brukes UUIDs til?', a: 'Databasenokkler, sesjonsidentifikatorer, API-foresporsels-IDer, distribuerte systemer osv.' },
    { q: 'Er denne generatoren sikker?', a: 'Ja. Den bruker nettleserens crypto.randomUUID() API for kryptografisk sikre tilfeldige tall.' },
  ],
  id: [
    { q: 'Apa itu UUID v4?', a: 'UUID v4 adalah identifier acak 128-bit yang diformat sebagai 32 digit heksadesimal dalam lima grup yang dipisahkan tanda hubung. Versi 4 dihasilkan menggunakan angka acak.' },
    { q: 'Seberapa unik UUID v4?', a: 'UUID v4 menggunakan 122 bit acak, menyediakan sekitar 5.3 x 10^36 nilai yang mungkin.' },
    { q: 'Bisakah saya menghasilkan banyak UUID sekaligus?', a: 'Ya. Tentukan jumlah yang diinginkan (1 hingga 100). Semua UUID dihasilkan secara instan.' },
    { q: 'Untuk apa UUID digunakan?', a: 'Kunci primer database, identifier sesi, ID permintaan API, sistem terdistribusi, dll.' },
    { q: 'Apakah generator ini aman?', a: 'Ya. Menggunakan API crypto.randomUUID() browser untuk angka acak yang aman secara kriptografis.' },
  ],
  th: [
    { q: 'UUID v4 คืออะไร?', a: 'UUID v4 เป็นตัวระบุแบบสุ่ม 128 บิตจัดรูปแบบเป็นเลขฐานสิบหก 32 หลักแบ่งเป็น 5 กลุ่มคั่นด้วยขีดกลาง เวอร์ชัน 4 สร้างโดยใช้ตัวเลขสุ่ม' },
    { q: 'UUID v4 มีความเป็นเอกลักษณ์แค่ไหน?', a: 'UUID v4 ใช้ 122 บิตสุ่ม ให้ค่าที่เป็นไปได้ประมาณ 5.3 x 10^36 ค่า ความน่าจะเป็นของการซ้ำกันต่ำมาก' },
    { q: 'สามารถสร้าง UUID หลายตัวพร้อมกันได้ไหม?', a: 'ได้ ระบุจำนวนที่ต้องการ (1 ถึง 100) UUID ทั้งหมดจะถูกสร้างทันที' },
    { q: 'UUID ใช้ทำอะไร?', a: 'คีย์หลักฐานข้อมูล ตัวระบุเซสชัน ID คำขอ API ระบบกระจาย เป็นต้น' },
    { q: 'ตัวสร้างนี้ปลอดภัยหรือไม่?', a: 'ใช่ ใช้ API crypto.randomUUID() ของเบราว์เซอร์สำหรับตัวเลขสุ่มที่ปลอดภัยทางการเข้ารหัส' },
  ],
};

function generateUUIDv4(): string {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  // Fallback
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

interface UUIDEntry {
  uuid: string;
  timestamp: string;
}

export default function UuidGeneratorPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = use(params);
  const t = strings[lang] || strings.en;
  const faqs = faqData[lang] || faqData.en;

  const [count, setCount] = useState(5);
  const [uppercase, setUppercase] = useState(false);
  const [braces, setBraces] = useState(false);
  const [uuids, setUuids] = useState<UUIDEntry[]>([]);
  const [copiedIdx, setCopiedIdx] = useState(-1);
  const [copiedAll, setCopiedAll] = useState(false);

  const formatUuid = useCallback((uuid: string) => {
    let result = uppercase ? uuid.toUpperCase() : uuid;
    if (braces) result = `{${result}}`;
    return result;
  }, [uppercase, braces]);

  const handleGenerate = useCallback(() => {
    const now = new Date().toLocaleString();
    const newUuids: UUIDEntry[] = [];
    for (let i = 0; i < count; i++) {
      newUuids.push({ uuid: generateUUIDv4(), timestamp: now });
    }
    setUuids(newUuids);
    setCopiedIdx(-1);
    setCopiedAll(false);
  }, [count]);

  const copyOne = useCallback((uuid: string, idx: number) => {
    navigator.clipboard.writeText(formatUuid(uuid));
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(-1), 1500);
  }, [formatUuid]);

  const copyAll = useCallback(() => {
    const all = uuids.map(u => formatUuid(u.uuid)).join('\n');
    navigator.clipboard.writeText(all);
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 1500);
  }, [uuids, formatUuid]);

  const btnStyle: React.CSSProperties = {
    padding: '6px 14px', borderRadius: 6, border: '1px solid var(--border-color)',
    background: 'var(--bg-card)', cursor: 'pointer', fontSize: 13, color: 'inherit',
  };
  const primaryBtn: React.CSSProperties = {
    padding: '10px 24px', borderRadius: 6, border: 'none',
    background: '#2563eb', color: '#fff', cursor: 'pointer', fontSize: 15, fontWeight: 700,
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
          {/* Count */}
          <div style={{ marginBottom: 16 }}>
            <label style={{ fontWeight: 600, fontSize: 14, display: 'block', marginBottom: 6 }}>{t.count}: {count}</label>
            <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
              <input type="range" min={1} max={100} value={count} onChange={e => setCount(Number(e.target.value))} style={{ flex: 1 }} />
              <input type="number" min={1} max={100} value={count} onChange={e => setCount(Math.min(100, Math.max(1, Number(e.target.value))))}
                style={{ width: 60, padding: '6px 10px', borderRadius: 6, border: '1px solid var(--border-color)', background: 'var(--bg-card)', color: 'inherit', textAlign: 'center' }} />
            </div>
          </div>

          {/* Options */}
          <div style={{ display: 'flex', gap: 20, marginBottom: 16, flexWrap: 'wrap' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer', fontSize: 14 }}>
              <input type="checkbox" checked={uppercase} onChange={e => setUppercase(e.target.checked)} />
              {t.uppercase}
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer', fontSize: 14 }}>
              <input type="checkbox" checked={braces} onChange={e => setBraces(e.target.checked)} />
              {braces ? t.withBraces : t.noBraces}
            </label>
          </div>

          <div style={{ display: 'flex', gap: 8 }}>
            <button onClick={handleGenerate} style={primaryBtn}>{t.generate}</button>
            {uuids.length > 0 && (
              <>
                <button onClick={copyAll} style={btnStyle}>{copiedAll ? t.copied : t.copyAll}</button>
                <button onClick={() => setUuids([])} style={btnStyle}>{t.clear}</button>
              </>
            )}
          </div>
        </div>

        {/* UUID List */}
        {uuids.length > 0 && (
          <div style={{ marginBottom: 24 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <span style={{ fontSize: 14, fontWeight: 600 }}>{t.total}: {uuids.length}</span>
              {uuids[0] && <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{t.timestamp}: {uuids[0].timestamp}</span>}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              {uuids.map((entry, i) => (
                <div key={i} style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  padding: '8px 12px', background: 'var(--bg-card)', borderRadius: 8, border: '1px solid var(--border-color)',
                }}>
                  <code style={{ fontFamily: 'monospace', fontSize: 14, wordBreak: 'break-all' }}>{formatUuid(entry.uuid)}</code>
                  <button onClick={() => copyOne(entry.uuid, i)} style={{ ...btnStyle, marginLeft: 8, whiteSpace: 'nowrap' }}>
                    {copiedIdx === i ? t.copied : t.copy}
                  </button>
                </div>
              ))}
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
