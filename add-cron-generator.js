const fs = require('fs');
const path = require('path');

// Directory containing all JSON files
const dictDir = path.join(__dirname, 'src/i18n/dictionaries');

// Cron-generator translations for all languages
const cronGeneratorTranslations = {
  en: {
    name: "Cron Expression Generator",
    description: "Build, validate, and understand cron expressions with a visual editor",
    pageTitle: "Cron Expression Generator - Build & Validate Cron Schedules Online",
    pageDescription: "Free online cron expression generator and validator. Build cron schedules visually, see next run times, and understand cron syntax with our easy-to-use tool.",
    presetsTitle: "Common Presets",
    customPlaceholder: "Enter cron expression (e.g. */5 * * * *)",
    parseBtn: "Parse",
    minute: "Minute",
    hour: "Hour",
    dayOfMonth: "Day (Month)",
    month: "Month",
    dayOfWeek: "Day (Week)",
    nextRunsTitle: "Next 5 Scheduled Runs",
    seoTitle: "What is a Cron Expression?",
    seoContent: "A cron expression is a string of five fields representing a schedule for automated tasks in Unix-like systems. The five fields are: minute (0-59), hour (0-23), day of month (1-31), month (1-12), and day of week (0-6, where 0 is Sunday). Special characters include * (any value), / (step values), - (ranges), and , (lists). Cron expressions are widely used in Linux crontab, Kubernetes CronJobs, AWS CloudWatch Events, GitHub Actions, and many other scheduling systems. Our free online cron expression generator helps you build, validate, and understand cron schedules visually."
  },
  fr: {
    name: "Générateur d'Expression Cron",
    description: "Créez, validez et comprenez les expressions cron avec un éditeur visuel",
    pageTitle: "Générateur d'Expression Cron - Créer et Valider des Planifications Cron en Ligne",
    pageDescription: "Générateur et validateur d'expressions cron gratuit en ligne. Créez des planifications cron visuellement et comprenez la syntaxe cron.",
    presetsTitle: "Présets Courants",
    customPlaceholder: "Entrez une expression cron (p. ex. */5 * * * *)",
    parseBtn: "Analyser",
    minute: "Minute",
    hour: "Heure",
    dayOfMonth: "Jour (Mois)",
    month: "Mois",
    dayOfWeek: "Jour (Semaine)",
    nextRunsTitle: "5 Prochaines Exécutions Planifiées",
    seoTitle: "Qu'est-ce qu'une Expression Cron?",
    seoContent: "Une expression cron est une chaîne de cinq champs représentant un calendrier pour les tâches automatisées dans les systèmes de type Unix. Les cinq champs sont: minute (0-59), heure (0-23), jour du mois (1-31), mois (1-12), et jour de la semaine (0-6, où 0 est dimanche). Les caractères spéciaux incluent * (toute valeur), / (valeurs de pas), - (plages), et , (listes). Les expressions cron sont largement utilisées dans crontab Linux, Kubernetes CronJobs, AWS CloudWatch Events, GitHub Actions, et de nombreux autres systèmes de planification. Notre générateur d'expressions cron gratuit en ligne vous aide à créer, valider et comprendre les calendriers cron visuellement."
  },
  de: {
    name: "Cron-Ausdruck-Generator",
    description: "Erstellen, validieren und verstehen Sie Cron-Ausdrücke mit einem visuellen Editor",
    pageTitle: "Cron-Ausdruck-Generator - Cron-Zeitpläne Online Erstellen und Validieren",
    pageDescription: "Kostenloser Online Cron-Ausdruck-Generator und -Validator. Erstellen Sie Cron-Zeitpläne visuell und verstehen Sie die Cron-Syntax.",
    presetsTitle: "Häufige Voreinstellungen",
    customPlaceholder: "Geben Sie einen Cron-Ausdruck ein (z. B. */5 * * * *)",
    parseBtn: "Analysieren",
    minute: "Minute",
    hour: "Stunde",
    dayOfMonth: "Tag (Monat)",
    month: "Monat",
    dayOfWeek: "Tag (Woche)",
    nextRunsTitle: "Nächste 5 geplanten Ausführungen",
    seoTitle: "Was ist ein Cron-Ausdruck?",
    seoContent: "Ein Cron-Ausdruck ist eine Zeichenkette mit fünf Feldern, die einen Zeitplan für automatisierte Aufgaben in Unix-ähnlichen Systemen darstellt. Die fünf Felder sind: Minute (0-59), Stunde (0-23), Tag des Monats (1-31), Monat (1-12) und Tag der Woche (0-6, wobei 0 Sonntag ist). Spezielle Zeichen sind * (beliebiger Wert), / (Schrittweite), - (Bereiche) und , (Listen). Cron-Ausdrücke werden häufig in Linux crontab, Kubernetes CronJobs, AWS CloudWatch Events, GitHub Actions und vielen anderen Planungssystemen verwendet. Unser kostenloser Online Cron-Ausdruck-Generator hilft Ihnen, Cron-Zeitpläne visuell zu erstellen, zu validieren und zu verstehen."
  },
  it: {
    name: "Generatore di Espressioni Cron",
    description: "Crea, valida e comprendi le espressioni cron con un editor visivo",
    pageTitle: "Generatore di Espressioni Cron - Crea e Valida Pianificazioni Cron Online",
    pageDescription: "Generatore e validatore di espressioni cron gratuito online. Crea pianificazioni cron visivamente e comprendi la sintassi cron.",
    presetsTitle: "Predefiniti Comuni",
    customPlaceholder: "Inserisci un'espressione cron (p. es. */5 * * * *)",
    parseBtn: "Analizza",
    minute: "Minuto",
    hour: "Ora",
    dayOfMonth: "Giorno (Mese)",
    month: "Mese",
    dayOfWeek: "Giorno (Settimana)",
    nextRunsTitle: "Prossime 5 Esecuzioni Programmate",
    seoTitle: "Che cos'è un'Espressione Cron?",
    seoContent: "Un'espressione cron è una stringa di cinque campi che rappresenta una pianificazione per attività automatizzate in sistemi simili a Unix. I cinque campi sono: minuto (0-59), ora (0-23), giorno del mese (1-31), mese (1-12) e giorno della settimana (0-6, dove 0 è domenica). I caratteri speciali includono * (qualsiasi valore), / (valori di passo), - (intervalli) e , (elenchi). Le espressioni cron sono ampiamente utilizzate in crontab Linux, Kubernetes CronJobs, AWS CloudWatch Events, GitHub Actions e molti altri sistemi di pianificazione. Il nostro generatore gratuito di espressioni cron online ti aiuta a creare, convalidare e comprendere visivamente i programmi cron."
  },
  es: {
    name: "Generador de Expresiones Cron",
    description: "Crea, valida y comprende expresiones cron con un editor visual",
    pageTitle: "Generador de Expresiones Cron - Crear y Validar Programaciones Cron en Línea",
    pageDescription: "Generador y validador de expresiones cron gratuito en línea. Cree programaciones cron visualmente y comprenda la sintaxis cron.",
    presetsTitle: "Preajustes Comunes",
    customPlaceholder: "Ingrese una expresión cron (p. ej. */5 * * * *)",
    parseBtn: "Analizar",
    minute: "Minuto",
    hour: "Hora",
    dayOfMonth: "Día (Mes)",
    month: "Mes",
    dayOfWeek: "Día (Semana)",
    nextRunsTitle: "Próximas 5 Ejecuciones Programadas",
    seoTitle: "¿Qué es una Expresión Cron?",
    seoContent: "Una expresión cron es una cadena de cinco campos que representa un horario para tareas automatizadas en sistemas tipo Unix. Los cinco campos son: minuto (0-59), hora (0-23), día del mes (1-31), mes (1-12) y día de la semana (0-6, donde 0 es domingo). Los caracteres especiales incluyen * (cualquier valor), / (valores de paso), - (intervalos) y , (listas). Las expresiones cron se usan ampliamente en crontab de Linux, Kubernetes CronJobs, AWS CloudWatch Events, GitHub Actions y muchos otros sistemas de programación. Nuestro generador gratuito de expresiones cron en línea le ayuda a crear, validar y comprender visualmente los horarios cron."
  },
  pt: {
    name: "Gerador de Expressões Cron",
    description: "Crie, valide e compreenda expressões cron com um editor visual",
    pageTitle: "Gerador de Expressões Cron - Criar e Validar Agendamentos Cron Online",
    pageDescription: "Gerador e validador de expressões cron gratuito online. Crie agendamentos cron visualmente e entenda a sintaxe cron.",
    presetsTitle: "Predefinições Comuns",
    customPlaceholder: "Digite uma expressão cron (p. ex. */5 * * * *)",
    parseBtn: "Analisar",
    minute: "Minuto",
    hour: "Hora",
    dayOfMonth: "Dia (Mês)",
    month: "Mês",
    dayOfWeek: "Dia (Semana)",
    nextRunsTitle: "Próximas 5 Execuções Agendadas",
    seoTitle: "O que é uma Expressão Cron?",
    seoContent: "Uma expressão cron é uma string de cinco campos que representa um agendamento para tarefas automatizadas em sistemas tipo Unix. Os cinco campos são: minuto (0-59), hora (0-23), dia do mês (1-31), mês (1-12) e dia da semana (0-6, onde 0 é domingo). Caracteres especiais incluem * (qualquer valor), / (valores de passo), - (intervalos) e , (listas). Expressões cron são amplamente usadas em crontab do Linux, Kubernetes CronJobs, AWS CloudWatch Events, GitHub Actions e muitos outros sistemas de agendamento. Nosso gerador gratuito de expressões cron online ajuda você a criar, validar e entender agendamentos cron visualmente."
  },
  nl: {
    name: "Cron Expressie Generator",
    description: "Maak, valideer en begrijp cron-expressies met een visuele editor",
    pageTitle: "Cron Expressie Generator - Bouw en Valideer Cron Schema's Online",
    pageDescription: "Gratis online cron expressie generator en validator. Bouw cron schema's visueel en begrijp cron syntaxis.",
    presetsTitle: "Veelgebruikte Voorinstellingen",
    customPlaceholder: "Voer cron-expressie in (bijv. */5 * * * *)",
    parseBtn: "Parseren",
    minute: "Minuut",
    hour: "Uur",
    dayOfMonth: "Dag (Maand)",
    month: "Maand",
    dayOfWeek: "Dag (Week)",
    nextRunsTitle: "Volgende 5 Geplande Uitvoeringen",
    seoTitle: "Wat is een Cron-expressie?",
    seoContent: "Een cron-expressie is een string van vijf velden die een schema voor geautomatiseerde taken in Unix-achtige systemen vertegenwoordigt. De vijf velden zijn: minuut (0-59), uur (0-23), dag van de maand (1-31), maand (1-12) en dag van de week (0-6, waarbij 0 zondag is). Speciale tekens omvatten * (elke waarde), / (stapwaarden), - (bereiken) en , (lijsten). Cron-expressies worden veel gebruikt in Linux crontab, Kubernetes CronJobs, AWS CloudWatch Events, GitHub Actions en vele andere planningssystemen. Onze gratis online cron-expressie generator helpt u cron-schema's visueel te maken, valideren en begrijpen."
  },
  pl: {
    name: "Generator Wyrażeń Cron",
    description: "Twórz, waliduj i zrozum wyrażenia cron za pomocą edytora wizualnego",
    pageTitle: "Generator Wyrażeń Cron - Tworzenie i Walidacja Harmonogramów Cron Online",
    pageDescription: "Darmowy generator i walidator wyrażeń cron online. Twórz harmonogramy cron wizualnie i zrozum składnię cron.",
    presetsTitle: "Popularne Predykcje",
    customPlaceholder: "Wpisz wyrażenie cron (np. */5 * * * *)",
    parseBtn: "Analizuj",
    minute: "Minuta",
    hour: "Godzina",
    dayOfMonth: "Dzień (Miesiąc)",
    month: "Miesiąc",
    dayOfWeek: "Dzień (Tydzień)",
    nextRunsTitle: "Następne 5 Zaplanowanych Uruchomień",
    seoTitle: "Co to jest wyrażenie Cron?",
    seoContent: "Wyrażenie cron to ciąg pięciu pól reprezentujących harmonogram dla zadań automatycznych w systemach typu Unix. Pięć pól to: minuta (0-59), godzina (0-23), dzień miesiąca (1-31), miesiąc (1-12) i dzień tygodnia (0-6, gdzie 0 to niedziela). Znaki specjalne obejmują * (dowolna wartość), / (wartości kroku), - (zakresy) i , (listy). Wyrażenia cron są szeroko stosowane w crontab Linuksa, Kubernetes CronJobs, AWS CloudWatch Events, GitHub Actions i wielu innych systemach planowania. Nasz darmowy generator wyrażeń cron online pomaga tworzyć, walidować i wizualnie zrozumieć harmonogramy cron."
  },
  sv: {
    name: "Cron-uttrycksgenerator",
    description: "Skapa, validera och förstå cron-uttryck med en visuell editor",
    pageTitle: "Cron-uttrycksgenerator - Bygg och Validera Cron-scheman Online",
    pageDescription: "Gratis cron-uttrycksgenerator och validator online. Bygg cron-scheman visuellt och förstå cron-syntax.",
    presetsTitle: "Vanliga Förinställningar",
    customPlaceholder: "Ange cron-uttryck (t.ex. */5 * * * *)",
    parseBtn: "Tolka",
    minute: "Minut",
    hour: "Timme",
    dayOfMonth: "Dag (Månad)",
    month: "Månad",
    dayOfWeek: "Dag (Vecka)",
    nextRunsTitle: "Nästa 5 Schemalagda Körningar",
    seoTitle: "Vad är ett Cron-uttryck?",
    seoContent: "Ett cron-uttryck är en sträng av fem fält som representerar ett schema för automatiserade uppgifter i Unix-liknande system. De fem fälten är: minut (0-59), timme (0-23), dag i månaden (1-31), månad (1-12) och dag i veckan (0-6, där 0 är söndag). Specialtecken inkluderar * (vilket värde som helst), / (stegvärden), - (intervall) och , (listor). Cron-uttryck används ofta i Linux crontab, Kubernetes CronJobs, AWS CloudWatch Events, GitHub Actions och många andra schemaläggningssystem. Vår gratis online cron-uttrycksgenerator hjälper dig att skapa, validera och visuellt förstå cron-scheman."
  },
  no: {
    name: "Cron-uttrykk Generator",
    description: "Opprett, valider og forstå cron-uttrykk med en visuell editor",
    pageTitle: "Cron-uttrykk Generator - Bygg og Valider Cron-tidsplaner Online",
    pageDescription: "Gratis cron-uttrykk generator og validator online. Bygg cron-tidsplaner visuelt og forstå cron-syntaks.",
    presetsTitle: "Vanlige Forhåndsinnstillinger",
    customPlaceholder: "Skriv inn cron-uttrykk (f.eks. */5 * * * *)",
    parseBtn: "Analyser",
    minute: "Minutt",
    hour: "Time",
    dayOfMonth: "Dag (Måned)",
    month: "Måned",
    dayOfWeek: "Dag (Uke)",
    nextRunsTitle: "Neste 5 Planlagte Kjøringer",
    seoTitle: "Hva er et Cron-uttrykk?",
    seoContent: "Et cron-uttrykk er en streng med fem felt som representerer en tidsplan for automatiserte oppgaver i Unix-lignende systemer. De fem feltene er: minutt (0-59), time (0-23), dag i måneden (1-31), måned (1-12) og dag i uken (0-6, der 0 er søndag). Spesialtegn inkluderer * (enhver verdi), / (trinnverdier), - (intervaller) og , (lister). Cron-uttrykk brukes mye i Linux crontab, Kubernetes CronJobs, AWS CloudWatch Events, GitHub Actions og mange andre planleggingssystemer. Vår gratis online cron-uttrykk generator hjelper deg med å opprette, validere og forstå cron-tidsplaner visuelt."
  },
  zh: {
    name: "Cron 表达式生成器",
    description: "使用可视化编辑器创建、验证和理解 Cron 表达式",
    pageTitle: "Cron 表达式生成器 - 在线创建和验证 Cron 定时任务",
    pageDescription: "免费在线 Cron 表达式生成器和验证器。可视化创建 Cron 定时计划，查看下次运行时间，轻松理解 Cron 语法。",
    presetsTitle: "常用预设",
    customPlaceholder: "输入 Cron 表达式（例如 */5 * * * *）",
    parseBtn: "解析",
    minute: "分钟",
    hour: "小时",
    dayOfMonth: "日期",
    month: "月份",
    dayOfWeek: "周日",
    nextRunsTitle: "接下来 5 次运行时间",
    seoTitle: "什么是 Cron 表达式?",
    seoContent: "Cron 表达式是一个五字段字符串，代表在类 Unix 系统中自动化任务的计划。五个字段分别为：分钟 (0-59)、小时 (0-23)、月份中的日期 (1-31)、月份 (1-12) 和周几 (0-6，其中 0 是星期日)。特殊字符包括 * (任何值)、/ (步长值)、- (范围) 和 , (列表)。Cron 表达式被广泛用于 Linux crontab、Kubernetes CronJobs、AWS CloudWatch Events、GitHub Actions 和许多其他调度系统。我们的免费在线 Cron 表达式生成器可帮助您直观地创建、验证和理解 Cron 时间表。"
  },
  ja: {
    name: "Cron式ジェネレーター",
    description: "ビジュアルエディタでCron式を作成、検証、理解します",
    pageTitle: "Cron式ジェネレーター - Cronスケジュールをオンラインで作成・検証",
    pageDescription: "無料オンラインCron式ジェネレーターとバリデーター。Cronスケジュールを視覚的に作成し、Cron構文を理解しましょう。",
    presetsTitle: "一般的なプリセット",
    customPlaceholder: "Cron式を入力（例：*/5 * * * *）",
    parseBtn: "解析",
    minute: "分",
    hour: "時",
    dayOfMonth: "日（月）",
    month: "月",
    dayOfWeek: "曜日",
    nextRunsTitle: "次の5回の実行予定",
    seoTitle: "Cron式とは？",
    seoContent: "Cron式はUnix系システムにおいて自動化されたタスクのスケジュールを表す5つのフィールドからなる文字列です。5つのフィールドは：分（0-59）、時（0-23）、日付（1-31）、月（1-12）、曜日（0-6、0は日曜日）です。特殊文字には*（任意の値）、/（ステップ値）、-（範囲）、,（リスト）があります。Cron式はLinux crontab、Kubernetes CronJobs、AWS CloudWatch Events、GitHub Actions、その他多くのスケジューリングシステムで広く使用されています。当社の無料オンラインCron式ジェネレーターは、Cronスケジュールを視覚的に作成、検証、理解するのに役立ちます。"
  },
  ko: {
    name: "Cron 표현식 생성기",
    description: "시각적 편집기로 Cron 표현식을 만들고, 검증하고, 이해합니다",
    pageTitle: "Cron 표현식 생성기 - 온라인으로 Cron 스케줄 생성 및 검증",
    pageDescription: "무료 온라인 Cron 표현식 생성기 및 검증기. 시각적으로 Cron 스케줄을 만들고 Cron 구문을 이해하세요.",
    presetsTitle: "일반적인 사전 설정",
    customPlaceholder: "Cron 표현식 입력 (예: */5 * * * *)",
    parseBtn: "분석",
    minute: "분",
    hour: "시간",
    dayOfMonth: "날짜(월)",
    month: "월",
    dayOfWeek: "요일",
    nextRunsTitle: "다음 5개 예정된 실행",
    seoTitle: "Cron 표현식이란?",
    seoContent: "Cron 표현식은 Unix 계열 시스템에서 자동화된 작업의 일정을 나타내는 5개 필드의 문자열입니다. 5개 필드는 다음과 같습니다: 분(0-59), 시간(0-23), 월간 날짜(1-31), 월(1-12), 요일(0-6, 0은 일요일). 특수 문자에는 *(모든 값), /(단계 값), -(범위), ,(목록)이 포함됩니다. Cron 표현식은 Linux crontab, Kubernetes CronJobs, AWS CloudWatch Events, GitHub Actions 및 많은 다른 스케줄링 시스템에서 널리 사용됩니다. 당사의 무료 온라인 Cron 표현식 생성기는 Cron 스케줄을 시각적으로 만들고, 검증하고, 이해하는 데 도움이 됩니다."
  },
  id: {
    name: "Generator Ekspresi Cron",
    description: "Buat, validasi, dan pahami ekspresi cron dengan editor visual",
    pageTitle: "Generator Ekspresi Cron - Buat dan Validasi Jadwal Cron Online",
    pageDescription: "Generator dan validator ekspresi cron gratis online. Buat jadwal cron secara visual dan pahami sintaks cron.",
    presetsTitle: "Preset Umum",
    customPlaceholder: "Masukkan ekspresi cron (misalnya */5 * * * *)",
    parseBtn: "Parse",
    minute: "Menit",
    hour: "Jam",
    dayOfMonth: "Hari (Bulan)",
    month: "Bulan",
    dayOfWeek: "Hari (Minggu)",
    nextRunsTitle: "5 Waktu Eksekusi Terjadwal Berikutnya",
    seoTitle: "Apa itu Ekspresi Cron?",
    seoContent: "Ekspresi cron adalah string lima bidang yang mewakili jadwal untuk tugas otomatis dalam sistem mirip Unix. Lima bidang tersebut adalah: menit (0-59), jam (0-23), hari dalam sebulan (1-31), bulan (1-12), dan hari dalam minggu (0-6, di mana 0 adalah Minggu). Karakter khusus mencakup * (nilai apa pun), / (nilai langkah), - (rentang), dan , (daftar). Ekspresi cron banyak digunakan dalam crontab Linux, Kubernetes CronJobs, AWS CloudWatch Events, GitHub Actions, dan banyak sistem penjadwalan lainnya. Generator ekspresi cron online gratis kami membantu Anda membuat, memvalidasi, dan memahami jadwal cron secara visual."
  },
  th: {
    name: "เครื่องสร้าง Cron Expression",
    description: "สร้าง ตรวจสอบ และทำความเข้าใจ Cron Expression ด้วยตัวแก้ไขแบบภาพ",
    pageTitle: "เครื่องสร้าง Cron Expression - สร้างและตรวจสอบ Cron Schedule ออนไลน์",
    pageDescription: "เครื่องสร้างและตรวจสอบ Cron Expression ออนไลน์ฟรี สร้างตาราง Cron แบบเห็นภาพและเข้าใจไวยากรณ์ Cron",
    presetsTitle: "พรีเซตทั่วไป",
    customPlaceholder: "ป้อน Cron Expression (เช่น */5 * * * *)",
    parseBtn: "วิเคราะห์",
    minute: "นาที",
    hour: "ชั่วโมง",
    dayOfMonth: "วัน (เดือน)",
    month: "เดือน",
    dayOfWeek: "วัน (สัปดาห์)",
    nextRunsTitle: "การรันตามกำหนดการ 5 รายการถัดไป",
    seoTitle: "Cron Expression คืออะไร?",
    seoContent: "Cron Expression เป็นสตริงของห้าฟิลด์ที่แสดงตารางเวลาสำหรับงานอัตโนมัติในระบบที่เหมือน Unix ห้าฟิลด์ได้แก่: นาที (0-59), ชั่วโมง (0-23), วันของเดือน (1-31), เดือน (1-12), และวันของสัปดาห์ (0-6 โดยที่ 0 คือวันอาทิตย์) อักขระพิเศษรวมถึง * (ค่าใด ๆ), / (ค่าขั้นตอน), - (ช่วง), และ , (รายการ) Cron Expression ถูกใช้กันอย่างแพร่หลายใน Linux crontab, Kubernetes CronJobs, AWS CloudWatch Events, GitHub Actions และระบบการจัดกำหนดการอื่น ๆ อีกมากมาย เครื่องสร้าง Cron Expression ออนไลน์ฟรีของเราช่วยให้คุณสร้าง ตรวจสอบ และทำความเข้าใจตาราง Cron แบบภาพ"
  }
};

// Process each language file
const languageFiles = fs.readdirSync(dictDir).filter(file => file.endsWith('.json'));

languageFiles.forEach(file => {
  const filePath = path.join(dictDir, file);
  const lang = file.replace('.json', '');

  try {
    // Read the file with UTF-8 encoding
    const content = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(content);

    // Ensure tools object exists
    if (!data.tools) {
      data.tools = {};
    }

    // Add cron-generator if it doesn't exist
    if (!data.tools['cron-generator']) {
      data.tools['cron-generator'] = cronGeneratorTranslations[lang];
      console.log(`✓ Added cron-generator to ${file}`);
    } else {
      console.log(`✗ cron-generator already exists in ${file}, skipping`);
    }

    // Write the file back with UTF-8 encoding and proper formatting
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n', 'utf8');
  } catch (error) {
    console.error(`Error processing ${file}:`, error.message);
  }
});

console.log('\n✓ All dictionary files updated successfully!');
