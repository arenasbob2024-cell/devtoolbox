export interface BlogPostMeta {
  title: string;
  description: string;
  readingTime: string;
  keywords: string[];
}

export interface BlogPost extends BlogPostMeta {
  slug: string;
  date: string;
  author: string;
  relatedTools: string[];
  relatedPosts: string[];
  translations: Partial<Record<string, BlogPostMeta>>;
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'uuid-v4-vs-v7-vs-ulid-vs-nanoid',
    title: 'UUID v4 vs UUID v7 vs ULID vs NanoID: Which ID Should You Use?',
    description: 'A comprehensive comparison of UUID v4, UUID v7, ULID, and NanoID for database primary keys, distributed systems, and frontend applications.',
    date: '2026-02-08',
    author: 'DevToolBox',
    readingTime: '10 min read',
    keywords: ['uuid v4 vs v7', 'uuid v7 vs ulid', 'nanoid vs uuid', 'unique id generator', 'database primary key'],
    relatedTools: ['uuid-generator'],
    relatedPosts: ['base64-encoding-real-world-uses'],
    translations: {
      fr: { title: 'UUID v4 vs UUID v7 vs ULID vs NanoID : Quel identifiant choisir ?', description: 'Comparaison complète de UUID v4, UUID v7, ULID et NanoID pour les clés primaires, les systèmes distribués et les applications frontend.', readingTime: '10 min de lecture', keywords: ['uuid v4 vs v7', 'uuid v7 vs ulid', 'nanoid vs uuid', 'générateur id unique', 'clé primaire base de données'] },
      de: { title: 'UUID v4 vs UUID v7 vs ULID vs NanoID: Welche ID sollten Sie verwenden?', description: 'Ein umfassender Vergleich von UUID v4, UUID v7, ULID und NanoID für Datenbank-Primärschlüssel, verteilte Systeme und Frontend-Anwendungen.', readingTime: '10 Min. Lesezeit', keywords: ['uuid v4 vs v7', 'uuid v7 vs ulid', 'nanoid vs uuid', 'Eindeutige ID Generator', 'Datenbank Primärschlüssel'] },
      it: { title: 'UUID v4 vs UUID v7 vs ULID vs NanoID: Quale ID dovresti usare?', description: 'Un confronto completo tra UUID v4, UUID v7, ULID e NanoID per chiavi primarie, sistemi distribuiti e applicazioni frontend.', readingTime: '10 min di lettura', keywords: ['uuid v4 vs v7', 'uuid v7 vs ulid', 'nanoid vs uuid', 'generatore id univoco', 'chiave primaria database'] },
      es: { title: 'UUID v4 vs UUID v7 vs ULID vs NanoID: ¿Qué ID deberías usar?', description: 'Comparación completa de UUID v4, UUID v7, ULID y NanoID para claves primarias, sistemas distribuidos y aplicaciones frontend.', readingTime: '10 min de lectura', keywords: ['uuid v4 vs v7', 'uuid v7 vs ulid', 'nanoid vs uuid', 'generador id único', 'clave primaria base de datos'] },
      zh: { title: 'UUID v4 vs UUID v7 vs ULID vs NanoID：你应该用哪种 ID？', description: '全面比较 UUID v4、UUID v7、ULID 和 NanoID，适用于数据库主键、分布式系统和前端应用。', readingTime: '10 分钟阅读', keywords: ['uuid v4 vs v7', 'uuid v7 vs ulid', 'nanoid vs uuid', '唯一ID生成器', '数据库主键'] },
      id: { title: 'UUID v4 vs UUID v7 vs ULID vs NanoID: ID Mana yang Harus Anda Gunakan?', description: 'Perbandingan lengkap UUID v4, UUID v7, ULID, dan NanoID untuk primary key database, sistem terdistribusi, dan aplikasi frontend.', readingTime: '10 menit baca', keywords: ['uuid v4 vs v7', 'uuid v7 vs ulid', 'nanoid vs uuid', 'generator id unik', 'primary key database'] },
      th: { title: 'UUID v4 vs UUID v7 vs ULID vs NanoID: คุณควรใช้ ID แบบไหน?', description: 'เปรียบเทียบ UUID v4, UUID v7, ULID และ NanoID สำหรับ primary key ฐานข้อมูล ระบบกระจาย และแอปพลิเคชัน frontend', readingTime: '10 นาทีในการอ่าน', keywords: ['uuid v4 vs v7', 'uuid v7 vs ulid', 'nanoid vs uuid', 'ตัวสร้าง id', 'primary key ฐานข้อมูล'] },
      pt: { title: 'UUID v4 vs UUID v7 vs ULID vs NanoID: Qual ID deve usar?', description: 'Comparação completa de UUID v4, v7, ULID e NanoID para chaves primárias, sistemas distribuídos e aplicações frontend.', readingTime: '10 min de leitura', keywords: ['uuid v4 vs v7', 'uuid v7 vs ulid', 'nanoid vs uuid', 'gerador id único', 'chave primária base de dados'] },
      nl: { title: 'UUID v4 vs UUID v7 vs ULID vs NanoID: Welke ID moet je kiezen?', description: 'Complete vergelijking van UUID v4, v7, ULID en NanoID voor primary keys, gedistribueerde systemen en frontend-apps.', readingTime: '10 min lezen', keywords: ['uuid v4 vs v7', 'uuid v7 vs ulid', 'nanoid vs uuid', 'unieke id generator', 'database primary key'] },
      pl: { title: 'UUID v4 vs UUID v7 vs ULID vs NanoID: Który identyfikator wybrać?', description: 'Pełne porównanie UUID v4, v7, ULID i NanoID dla kluczy głównych, systemów rozproszonych i aplikacji frontendowych.', readingTime: '10 min czytania', keywords: ['uuid v4 vs v7', 'uuid v7 vs ulid', 'nanoid vs uuid', 'generator id', 'klucz główny bazy danych'] },
      sv: { title: 'UUID v4 vs UUID v7 vs ULID vs NanoID: Vilket ID ska du använda?', description: 'En komplett jämförelse av UUID v4, v7, ULID och NanoID för primärnycklar, distribuerade system och frontend-appar.', readingTime: '10 min läsning', keywords: ['uuid v4 vs v7', 'uuid v7 vs ulid', 'nanoid vs uuid', 'unik id-generator', 'databasprimärnyckel'] },
      no: { title: 'UUID v4 vs UUID v7 vs ULID vs NanoID: Hvilket ID bør du bruke?', description: 'En komplett sammenligning av UUID v4, v7, ULID og NanoID for primærnøkler, distribuerte systemer og frontend-applikasjoner.', readingTime: '10 min lesning', keywords: ['uuid v4 vs v7', 'uuid v7 vs ulid', 'nanoid vs uuid', 'unik id-generator', 'database primærnøkkel'] },
      ja: { title: 'UUID v4 vs UUID v7 vs ULID vs NanoID: どのIDを使うべき？', description: 'データベースの主キー、分散システム、フロントエンドアプリ向けにUUID v4、v7、ULID、NanoIDを比較。', readingTime: '10分', keywords: ['uuid v4 vs v7', 'uuid v7 vs ulid', 'nanoid vs uuid', '一意ID生成', 'データベース主キー'] },
      ko: { title: 'UUID v4 vs UUID v7 vs ULID vs NanoID: 어떤 ID를 사용해야 할까?', description: '데이터베이스 기본 키, 분산 시스템, 프론트엔드 앱을 위한 UUID v4, v7, ULID, NanoID 종합 비교.', readingTime: '10분 읽기', keywords: ['uuid v4 vs v7', 'uuid v7 vs ulid', 'nanoid vs uuid', '고유 id 생성기', '데이터베이스 기본 키'] },
    },
  },
  {
    slug: 'cron-schedule-serverless-github-actions-vercel-cloudflare',
    title: 'Cron Schedule for Serverless: GitHub Actions, Vercel Cron, and Cloudflare Workers',
    description: 'Master cron expressions across serverless platforms. Learn syntax differences, timezone pitfalls, and copy-paste schedule examples.',
    date: '2026-02-08',
    author: 'DevToolBox',
    readingTime: '9 min read',
    keywords: ['github actions cron schedule', 'vercel cron job', 'cloudflare workers cron', 'serverless cron', 'cron expression examples'],
    relatedTools: ['cron-parser'],
    relatedPosts: ['docker-compose-yaml-errors'],
    translations: {
      fr: { title: 'Cron Serverless : GitHub Actions, Vercel Cron et Cloudflare Workers', description: 'Maîtrisez les expressions cron sur les plateformes serverless. Syntaxe, pièges de fuseaux horaires et exemples.', readingTime: '9 min de lecture', keywords: ['github actions cron', 'vercel cron job', 'cloudflare workers cron', 'cron serverless', 'expression cron exemples'] },
      de: { title: 'Cron für Serverless: GitHub Actions, Vercel Cron und Cloudflare Workers', description: 'Meistern Sie Cron-Ausdrücke auf Serverless-Plattformen. Syntax, Zeitzonenfallen und Beispiele.', readingTime: '9 Min. Lesezeit', keywords: ['github actions cron', 'vercel cron job', 'cloudflare workers cron', 'serverless cron', 'cron ausdruck beispiele'] },
      it: { title: 'Cron per Serverless: GitHub Actions, Vercel Cron e Cloudflare Workers', description: 'Padroneggia le espressioni cron sulle piattaforme serverless. Sintassi, insidie dei fusi orari ed esempi.', readingTime: '9 min di lettura', keywords: ['github actions cron', 'vercel cron job', 'cloudflare workers cron', 'cron serverless', 'espressioni cron esempi'] },
      es: { title: 'Cron para Serverless: GitHub Actions, Vercel Cron y Cloudflare Workers', description: 'Domina las expresiones cron en plataformas serverless. Sintaxis, errores de zona horaria y ejemplos.', readingTime: '9 min de lectura', keywords: ['github actions cron', 'vercel cron job', 'cloudflare workers cron', 'cron serverless', 'expresiones cron ejemplos'] },
      zh: { title: 'Serverless 平台的 Cron 调度：GitHub Actions、Vercel Cron 和 Cloudflare Workers', description: '掌握各 Serverless 平台的 Cron 表达式，了解语法差异、时区陷阱和实用调度示例。', readingTime: '9 分钟阅读', keywords: ['github actions cron', 'vercel cron job', 'cloudflare workers cron', 'serverless cron', 'cron 表达式示例'] },
      id: { title: 'Cron untuk Serverless: GitHub Actions, Vercel Cron, dan Cloudflare Workers', description: 'Kuasai ekspresi cron di platform serverless. Sintaks, jebakan timezone, dan contoh jadwal.', readingTime: '9 menit baca', keywords: ['github actions cron', 'vercel cron job', 'cloudflare workers cron', 'serverless cron', 'contoh ekspresi cron'] },
      th: { title: 'Cron สำหรับ Serverless: GitHub Actions, Vercel Cron และ Cloudflare Workers', description: 'เชี่ยวชาญ cron expression บนแพลตฟอร์ม serverless ไวยากรณ์ ข้อผิดพลาดเรื่อง timezone และตัวอย่าง', readingTime: '9 นาทีในการอ่าน', keywords: ['github actions cron', 'vercel cron job', 'cloudflare workers cron', 'serverless cron', 'ตัวอย่าง cron expression'] },
      pt: { title: 'Cron para Serverless: GitHub Actions, Vercel Cron e Cloudflare Workers', description: 'Domine expressões cron em plataformas serverless. Sintaxe, armadilhas de timezone e exemplos.', readingTime: '9 min de leitura', keywords: ['github actions cron', 'vercel cron job', 'cloudflare workers cron', 'cron serverless', 'exemplos expressão cron'] },
      nl: { title: 'Cron voor Serverless: GitHub Actions, Vercel Cron en Cloudflare Workers', description: 'Beheers cron-expressies op serverless platforms. Syntaxis, timezone-valkuilen en voorbeelden.', readingTime: '9 min lezen', keywords: ['github actions cron', 'vercel cron job', 'cloudflare workers cron', 'serverless cron', 'cron voorbeelden'] },
      pl: { title: 'Cron dla Serverless: GitHub Actions, Vercel Cron i Cloudflare Workers', description: 'Opanuj wyrażenia cron na platformach serverless. Składnia, pułapki stref czasowych i przykłady.', readingTime: '9 min czytania', keywords: ['github actions cron', 'vercel cron job', 'cloudflare workers cron', 'serverless cron', 'przykłady wyrażeń cron'] },
      sv: { title: 'Cron för Serverless: GitHub Actions, Vercel Cron och Cloudflare Workers', description: 'Behärska cron-uttryck på serverless-plattformar. Syntax, tidszonsfallgropar och exempel.', readingTime: '9 min läsning', keywords: ['github actions cron', 'vercel cron job', 'cloudflare workers cron', 'serverless cron', 'cron-exempel'] },
      no: { title: 'Cron for Serverless: GitHub Actions, Vercel Cron og Cloudflare Workers', description: 'Mestr cron-uttrykk på serverless-plattformer. Syntaks, tidssonefeller og eksempler.', readingTime: '9 min lesning', keywords: ['github actions cron', 'vercel cron job', 'cloudflare workers cron', 'serverless cron', 'cron-eksempler'] },
      ja: { title: 'ServerlessのCron: GitHub Actions、Vercel Cron、Cloudflare Workers', description: 'Serverlessプラットフォームでのcron式をマスター。構文の違い、タイムゾーンの落とし穴、コピペ可能な例。', readingTime: '9分', keywords: ['github actions cron', 'vercel cron job', 'cloudflare workers cron', 'serverless cron', 'cron式例'] },
      ko: { title: 'Serverless Cron: GitHub Actions, Vercel Cron, Cloudflare Workers', description: 'Serverless 플랫폼에서 cron 표현식 마스터. 구문 차이, 타임존 함정, 복사 가능한 예시.', readingTime: '9분 읽기', keywords: ['github actions cron', 'vercel cron job', 'cloudflare workers cron', 'serverless cron', 'cron 표현식 예시'] },
    },
  },
  {
    slug: 'base64-encoding-real-world-uses',
    title: 'Base64 Encoding in Practice: 7 Real-World Uses Every Developer Should Know',
    description: 'Discover 7 practical uses of Base64 encoding: from embedding images in HTML to Kubernetes secrets, JWT tokens, and data URIs.',
    date: '2026-02-08',
    author: 'DevToolBox',
    readingTime: '8 min read',
    keywords: ['base64 encoding use cases', 'why use base64', 'base64 real world examples', 'base64 kubernetes secrets', 'data uri base64'],
    relatedTools: ['base64', 'jwt-decoder'],
    relatedPosts: ['uuid-v4-vs-v7-vs-ulid-vs-nanoid'],
    translations: {
      fr: { title: 'Encodage Base64 en pratique : 7 utilisations que tout développeur devrait connaître', description: 'Découvrez 7 utilisations pratiques de l\'encodage Base64 : images intégrées, secrets Kubernetes, tokens JWT et URIs de données.', readingTime: '8 min de lecture', keywords: ['encodage base64 cas d\'utilisation', 'pourquoi utiliser base64', 'exemples base64', 'base64 kubernetes secrets', 'data uri base64'] },
      de: { title: 'Base64-Kodierung in der Praxis: 7 Anwendungsfälle, die jeder Entwickler kennen sollte', description: 'Entdecken Sie 7 praktische Anwendungen der Base64-Kodierung: eingebettete Bilder, Kubernetes-Secrets, JWT-Tokens und Data-URIs.', readingTime: '8 Min. Lesezeit', keywords: ['base64 kodierung anwendungsfälle', 'warum base64 verwenden', 'base64 beispiele', 'base64 kubernetes secrets', 'data uri base64'] },
      it: { title: 'Codifica Base64 in pratica: 7 usi che ogni sviluppatore dovrebbe conoscere', description: 'Scopri 7 usi pratici della codifica Base64: immagini incorporate, segreti Kubernetes, token JWT e URI dati.', readingTime: '8 min di lettura', keywords: ['codifica base64 casi d\'uso', 'perché usare base64', 'esempi base64', 'base64 kubernetes secrets', 'data uri base64'] },
      es: { title: 'Codificación Base64 en la práctica: 7 usos que todo desarrollador debería conocer', description: 'Descubre 7 usos prácticos de la codificación Base64: imágenes incrustadas, secretos Kubernetes, tokens JWT y URIs de datos.', readingTime: '8 min de lectura', keywords: ['codificación base64 casos de uso', 'por qué usar base64', 'ejemplos base64', 'base64 kubernetes secrets', 'data uri base64'] },
      zh: { title: 'Base64 编码实战：每个开发者都应该知道的 7 个真实用途', description: '发现 Base64 编码的 7 个实际应用：HTML 嵌入图片、Kubernetes Secrets、JWT Token、Data URI 等。', readingTime: '8 分钟阅读', keywords: ['base64 编码用途', '为什么使用 base64', 'base64 实际案例', 'base64 kubernetes secrets', 'data uri base64'] },
      id: { title: 'Encoding Base64 dalam Praktik: 7 Penggunaan yang Harus Diketahui Setiap Developer', description: 'Temukan 7 penggunaan praktis encoding Base64: gambar tertanam, Kubernetes secrets, token JWT, dan data URI.', readingTime: '8 menit baca', keywords: ['encoding base64 kasus penggunaan', 'kenapa pakai base64', 'contoh base64', 'base64 kubernetes secrets', 'data uri base64'] },
      th: { title: 'Base64 Encoding ในทางปฏิบัติ: 7 การใช้งานจริงที่นักพัฒนาทุกคนควรรู้', description: 'ค้นพบ 7 การใช้งานจริงของ Base64 encoding: ฝังรูปภาพ, Kubernetes secrets, JWT tokens และ data URI', readingTime: '8 นาทีในการอ่าน', keywords: ['base64 encoding use cases', 'ทำไมใช้ base64', 'ตัวอย่าง base64', 'base64 kubernetes secrets', 'data uri base64'] },
      pt: { title: 'Base64 em Prática: 7 Usos que Todo Desenvolvedor Deve Conhecer', description: 'Descubra 7 usos práticos de Base64: imagens em HTML, segredos Kubernetes, tokens JWT e data URIs.', readingTime: '8 min de leitura', keywords: ['base64 casos de uso', 'por que usar base64', 'exemplos base64', 'base64 kubernetes secrets', 'data uri base64'] },
      nl: { title: 'Base64 Encoding in Praktijk: 7 Gebruiken die Elke Ontwikkelaar Moet Kennen', description: 'Ontdek 7 praktische toepassingen van Base64: embedded images, Kubernetes secrets, JWT-tokens en data URIs.', readingTime: '8 min lezen', keywords: ['base64 use cases', 'waarom base64', 'base64 voorbeelden', 'base64 kubernetes secrets', 'data uri base64'] },
      pl: { title: 'Base64 w Praktyce: 7 Zastosowań, Które Każdy Programista Powinien Znać', description: 'Odkryj 7 praktycznych zastosowań Base64: obrazy w HTML, sekrety Kubernetes, tokeny JWT i data URIs.', readingTime: '8 min czytania', keywords: ['base64 zastosowania', 'po co base64', 'przykłady base64', 'base64 kubernetes secrets', 'data uri base64'] },
      sv: { title: 'Base64-kodning i Praktiken: 7 Användningar Varje Utvecklare Bör Känna Till', description: 'Upptäck 7 praktiska användningar av Base64: inbäddade bilder, Kubernetes-secrets, JWT-tokens och data URIs.', readingTime: '8 min läsning', keywords: ['base64 användningsfall', 'varför base64', 'base64-exempel', 'base64 kubernetes secrets', 'data uri base64'] },
      no: { title: 'Base64-encoding i Praksis: 7 Bruksområder Hver Utvikler Bør Kjenne', description: 'Oppdag 7 praktiske bruksområder for Base64: innebygde bilder, Kubernetes-secrets, JWT-tokens og data URIs.', readingTime: '8 min lesning', keywords: ['base64 bruksområder', 'hvorfor base64', 'base64-eksempler', 'base64 kubernetes secrets', 'data uri base64'] },
      ja: { title: 'Base64エンコーディング実践：開発者が知るべき7つの実用例', description: 'Base64の7つの実用例：HTML画像埋め込み、Kubernetesシークレット、JWTトークン、Data URI。', readingTime: '8分', keywords: ['base64 実用例', 'base64 なぜ', 'base64 例', 'base64 kubernetes secrets', 'data uri base64'] },
      ko: { title: 'Base64 인코딩 실전: 모든 개발자가 알아야 할 7가지 실제 활용', description: 'Base64의 7가지 실용 활용: HTML 이미지 삽입, Kubernetes 시크릿, JWT 토큰, Data URI.', readingTime: '8분 읽기', keywords: ['base64 활용 사례', 'base64 왜', 'base64 예제', 'base64 kubernetes secrets', 'data uri base64'] },
    },
  },
  {
    slug: 'regex-patterns-copy-paste-ready',
    title: '20 Regex Patterns Every Developer Needs: Copy-Paste Ready Examples',
    description: 'A curated collection of 20 battle-tested regex patterns for email, URL, phone, password, IP address, and more.',
    date: '2026-02-08',
    author: 'DevToolBox',
    readingTime: '11 min read',
    keywords: ['regex patterns copy paste', 'common regex examples', 'regex email validation', 'regex url validation', 'regex cheat sheet'],
    relatedTools: ['regex-tester'],
    relatedPosts: ['docker-compose-yaml-errors'],
    translations: {
      fr: { title: '20 patterns Regex indispensables : exemples prêts à copier-coller', description: 'Collection de 20 patterns regex éprouvés pour email, URL, téléphone, mot de passe, adresse IP et plus.', readingTime: '11 min de lecture', keywords: ['regex patterns copier coller', 'exemples regex courants', 'regex validation email', 'regex validation url', 'aide-mémoire regex'] },
      de: { title: '20 Regex-Muster, die jeder Entwickler braucht: Kopierfertige Beispiele', description: 'Eine kuratierte Sammlung von 20 bewährten Regex-Mustern für E-Mail, URL, Telefon, Passwort, IP-Adresse und mehr.', readingTime: '11 Min. Lesezeit', keywords: ['regex muster kopieren einfügen', 'häufige regex beispiele', 'regex email validierung', 'regex url validierung', 'regex spickzettel'] },
      it: { title: '20 Pattern Regex che ogni sviluppatore deve conoscere: Esempi pronti da copiare', description: 'Collezione di 20 pattern regex testati per email, URL, telefono, password, indirizzo IP e altro.', readingTime: '11 min di lettura', keywords: ['regex pattern copia incolla', 'esempi regex comuni', 'regex validazione email', 'regex validazione url', 'cheat sheet regex'] },
      es: { title: '20 Patrones Regex que todo desarrollador necesita: Ejemplos listos para copiar', description: 'Colección curada de 20 patrones regex probados para email, URL, teléfono, contraseña, dirección IP y más.', readingTime: '11 min de lectura', keywords: ['regex patrones copiar pegar', 'ejemplos regex comunes', 'regex validación email', 'regex validación url', 'hoja de referencia regex'] },
      zh: { title: '每个开发者都需要的 20 个 Regex 正则表达式：可直接复制粘贴的示例', description: '精选 20 个经过实战检验的正则表达式，涵盖邮箱、URL、手机号、密码、IP 地址等验证。', readingTime: '11 分钟阅读', keywords: ['正则表达式 复制粘贴', '常用正则示例', '正则 邮箱验证', '正则 URL 验证', '正则速查表'] },
      id: { title: '20 Pola Regex yang Dibutuhkan Setiap Developer: Contoh Siap Copy-Paste', description: 'Koleksi 20 pola regex teruji untuk email, URL, telepon, password, alamat IP, dan lainnya.', readingTime: '11 menit baca', keywords: ['regex pattern copy paste', 'contoh regex umum', 'regex validasi email', 'regex validasi url', 'cheat sheet regex'] },
      th: { title: '20 รูปแบบ Regex ที่นักพัฒนาทุกคนต้องมี: ตัวอย่างพร้อม Copy-Paste', description: 'คอลเลกชัน 20 รูปแบบ regex ที่ผ่านการทดสอบสำหรับอีเมล, URL, โทรศัพท์, รหัสผ่าน, IP address และอื่นๆ', readingTime: '11 นาทีในการอ่าน', keywords: ['regex pattern copy paste', 'ตัวอย่าง regex ทั่วไป', 'regex ตรวจสอบอีเมล', 'regex ตรวจสอบ url', 'regex cheat sheet'] },
      pt: { title: '20 Padrões Regex que Todo Desenvolvedor Precisa: Exemplos Prontos', description: 'Coleção de 20 padrões regex testados para email, URL, telefone, senha, endereço IP e mais.', readingTime: '11 min de leitura', keywords: ['regex padrões copiar', 'exemplos regex', 'regex validação email', 'regex validação url', 'cheat sheet regex'] },
      nl: { title: '20 Regex-patronen die Elke Ontwikkelaar Nodig Heeft: Copy-Paste Voorbeelden', description: 'Gecureerde collectie van 20 beproefde regex-patronen voor e-mail, URL, telefoon, wachtwoord, IP en meer.', readingTime: '11 min lezen', keywords: ['regex patronen kopiëren', 'veelgebruikte regex voorbeelden', 'regex e-mail validatie', 'regex url validatie', 'regex spiekbrief'] },
      pl: { title: '20 Wzorców Regex dla Każdego Programisty: Gotowe Przykłady', description: 'Kolekcja 20 sprawdzonych wzorców regex dla e-mail, URL, telefonu, hasła, adresu IP i innych.', readingTime: '11 min czytania', keywords: ['regex wzorce kopiuj', 'częste przykłady regex', 'regex walidacja email', 'regex walidacja url', 'ściągawka regex'] },
      sv: { title: '20 Regex-mönster Varje Utvecklare Behöver: Copy-Paste Exempel', description: 'En kuraterad samling av 20 beprövade regex-mönster för e-post, URL, telefon, lösenord, IP-adress och mer.', readingTime: '11 min läsning', keywords: ['regex mönster kopiera', 'vanliga regex-exempel', 'regex e-postvalidering', 'regex url-validering', 'regex-fuskblad'] },
      no: { title: '20 Regex-mønstre Hver Utvikler Trenger: Copy-Paste Eksempler', description: 'En kuratert samling av 20 utprøvde regex-mønstre for e-post, URL, telefon, passord, IP-adresse og mer.', readingTime: '11 min lesning', keywords: ['regex mønstre kopier', 'vanlige regex-eksempler', 'regex e-postvalidering', 'regex url-validering', 'regex jukseark'] },
      ja: { title: '開発者に必要な20のRegexパターン：コピペ可能な例', description: 'メール、URL、電話、パスワード、IPアドレスなど、20の実戦済み正規表現パターンの厳選コレクション。', readingTime: '11分', keywords: ['regex パターン コピペ', 'よく使うregex', 'regex メール検証', 'regex URL検証', 'regex チートシート'] },
      ko: { title: '개발자가 필요한 20가지 Regex 패턴: 복사 가능한 예시', description: '이메일, URL, 전화, 비밀번호, IP 주소 등 20가지 검증된 정규식 패턴 모음.', readingTime: '11분 읽기', keywords: ['regex 패턴 복사', '자주 쓰는 regex', 'regex 이메일 검증', 'regex url 검증', 'regex 치트시트'] },
    },
  },
  {
    slug: 'docker-compose-yaml-errors',
    title: 'Docker Compose YAML Validation: 10 Common Syntax Errors and How to Fix Them',
    description: 'Stop wasting time on Docker Compose YAML errors. Learn to identify and fix the 10 most common syntax mistakes.',
    date: '2026-02-08',
    author: 'DevToolBox',
    readingTime: '9 min read',
    keywords: ['docker compose yaml error', 'docker compose syntax error', 'invalid yaml docker compose', 'yaml validation', 'docker compose troubleshoot'],
    relatedTools: ['json-yaml', 'json-formatter'],
    relatedPosts: ['cron-schedule-serverless-github-actions-vercel-cloudflare'],
    translations: {
      fr: { title: 'Validation YAML Docker Compose : 10 erreurs de syntaxe courantes et comment les corriger', description: 'Arrêtez de perdre du temps avec les erreurs YAML Docker Compose. Apprenez à identifier et corriger les 10 erreurs les plus courantes.', readingTime: '9 min de lecture', keywords: ['docker compose erreur yaml', 'docker compose erreur syntaxe', 'yaml invalide docker compose', 'validation yaml', 'docker compose dépannage'] },
      de: { title: 'Docker Compose YAML-Validierung: 10 häufige Syntaxfehler und ihre Behebung', description: 'Verschwenden Sie keine Zeit mit Docker Compose YAML-Fehlern. Lernen Sie die 10 häufigsten Syntaxfehler zu erkennen und zu beheben.', readingTime: '9 Min. Lesezeit', keywords: ['docker compose yaml fehler', 'docker compose syntax fehler', 'ungültiges yaml docker compose', 'yaml validierung', 'docker compose fehlerbehebung'] },
      it: { title: 'Validazione YAML Docker Compose: 10 errori di sintassi comuni e come risolverli', description: 'Smetti di perdere tempo con errori YAML Docker Compose. Impara a identificare e correggere i 10 errori più comuni.', readingTime: '9 min di lettura', keywords: ['docker compose errore yaml', 'docker compose errore sintassi', 'yaml invalido docker compose', 'validazione yaml', 'docker compose risoluzione problemi'] },
      es: { title: 'Validación YAML Docker Compose: 10 errores de sintaxis comunes y cómo corregirlos', description: 'Deja de perder tiempo con errores YAML de Docker Compose. Aprende a identificar y corregir los 10 errores más comunes.', readingTime: '9 min de lectura', keywords: ['docker compose error yaml', 'docker compose error sintaxis', 'yaml inválido docker compose', 'validación yaml', 'docker compose solución problemas'] },
      zh: { title: 'Docker Compose YAML 验证：10 个常见语法错误及修复方法', description: '别再浪费时间在 Docker Compose YAML 错误上。学会识别和修复 10 个最常见的语法错误。', readingTime: '9 分钟阅读', keywords: ['docker compose yaml 错误', 'docker compose 语法错误', '无效 yaml docker compose', 'yaml 验证', 'docker compose 排错'] },
      id: { title: 'Validasi YAML Docker Compose: 10 Kesalahan Sintaks Umum dan Cara Memperbaikinya', description: 'Berhenti buang waktu dengan error YAML Docker Compose. Pelajari cara mengidentifikasi dan memperbaiki 10 kesalahan paling umum.', readingTime: '9 menit baca', keywords: ['docker compose yaml error', 'docker compose syntax error', 'yaml tidak valid docker compose', 'validasi yaml', 'docker compose troubleshoot'] },
      th: { title: 'การตรวจสอบ YAML Docker Compose: 10 ข้อผิดพลาดไวยากรณ์ที่พบบ่อยและวิธีแก้ไข', description: 'หยุดเสียเวลากับข้อผิดพลาด YAML Docker Compose เรียนรู้การระบุและแก้ไข 10 ข้อผิดพลาดที่พบบ่อยที่สุด', readingTime: '9 นาทีในการอ่าน', keywords: ['docker compose yaml error', 'docker compose syntax error', 'yaml ไม่ถูกต้อง docker compose', 'ตรวจสอบ yaml', 'docker compose แก้ปัญหา'] },
      pt: { title: 'Validação YAML Docker Compose: 10 Erros de Sintaxe Comuns e Como Corrigir', description: 'Pare de perder tempo com erros YAML do Docker Compose. Aprenda a identificar e corrigir os 10 erros mais comuns.', readingTime: '9 min de leitura', keywords: ['docker compose erro yaml', 'docker compose erro sintaxe', 'yaml inválido docker compose', 'validação yaml', 'docker compose solução problemas'] },
      nl: { title: 'Docker Compose YAML-validatie: 10 Veelvoorkomende Syntaxfouten en Oplossingen', description: 'Stop met tijd verspillen aan Docker Compose YAML-fouten. Leer de 10 meest voorkomende fouten te identificeren en oplossen.', readingTime: '9 min lezen', keywords: ['docker compose yaml fout', 'docker compose syntax fout', 'ongeldige yaml docker compose', 'yaml validatie', 'docker compose troubleshooting'] },
      pl: { title: 'Walidacja YAML Docker Compose: 10 Typowych Błędów Składni i Jak je Naprawić', description: 'Przestań tracić czas na błędy YAML Docker Compose. Naucz się rozpoznawać i naprawiać 10 najczęstszych błędów.', readingTime: '9 min czytania', keywords: ['docker compose błąd yaml', 'docker compose błąd składni', 'nieprawidłowy yaml docker compose', 'walidacja yaml', 'docker compose rozwiązywanie problemów'] },
      sv: { title: 'Docker Compose YAML-validering: 10 Vanliga Syntaxfel och Hur man Åtgärdar dem', description: 'Sluta slösa tid på Docker Compose YAML-fel. Lär dig identifiera och åtgärda de 10 vanligaste felen.', readingTime: '9 min läsning', keywords: ['docker compose yaml-fel', 'docker compose syntaxfel', 'ogiltig yaml docker compose', 'yaml-validering', 'docker compose felsökning'] },
      no: { title: 'Docker Compose YAML-validering: 10 Vanlige Syntaksfeil og Hvordan Fikse dem', description: 'Slutt å kaste bort tid på Docker Compose YAML-feil. Lær å identifisere og fikse de 10 vanligste feilene.', readingTime: '9 min lesning', keywords: ['docker compose yaml-feil', 'docker compose syntaksfeil', 'ugyldig yaml docker compose', 'yaml-validering', 'docker compose feilsøking'] },
      ja: { title: 'Docker Compose YAML検証：よくある10の構文エラーと修正方法', description: 'Docker Compose YAMLエラーで時間を無駄にしない。よくある10の構文ミスを特定・修正する方法。', readingTime: '9分', keywords: ['docker compose yaml エラー', 'docker compose 構文エラー', '無効な yaml docker compose', 'yaml 検証', 'docker compose トラブルシュート'] },
      ko: { title: 'Docker Compose YAML 검증: 흔한 10가지 구문 오류 및 수정 방법', description: 'Docker Compose YAML 오류로 시간 낭비하지 마세요. 가장 흔한 10가지 구문 오류 식별 및 수정 방법.', readingTime: '9분 읽기', keywords: ['docker compose yaml 오류', 'docker compose 구문 오류', '잘못된 yaml docker compose', 'yaml 검증', 'docker compose 문제 해결'] },
    },
  },
];

/** Get post with localized metadata */
export function getLocalizedPost(slug: string, lang: string): BlogPost | undefined {
  const post = blogPosts.find(p => p.slug === slug);
  if (!post) return undefined;
  if (lang === 'en' || !post.translations[lang]) return post;
  const t = post.translations[lang]!;
  return { ...post, title: t.title, description: t.description, readingTime: t.readingTime, keywords: t.keywords };
}

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find(p => p.slug === slug);
}

export function getAllSlugs(): string[] {
  return blogPosts.map(p => p.slug);
}
