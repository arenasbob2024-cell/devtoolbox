import { notFound } from 'next/navigation';
import { Fragment } from 'react';
import { i18n, type Locale } from '@/i18n/config';
import { getDictionary, getUIDictionary } from '@/i18n/getDictionary';
import { LangProvider } from '@/i18n/LangContext';
import { tools, type Tool } from '@/lib/tools';
import Link from 'next/link';
import type { Metadata } from 'next';
import AdSlot from '@/components/AdSlot';
import SponsorCta from '@/components/SponsorCta';
import PartnerOfferStrip from '@/components/PartnerOfferStrip';

// Category filter configuration
const categoryConfigs: Record<string, {
  filterCategories: string[];
  filterKeywords: string[];
}> = {
  'json-tools': { filterCategories: ['json'], filterKeywords: ['json'] },
  'css-tools': { filterCategories: ['css'], filterKeywords: ['css', 'tailwind'] },
  'converter-tools': { filterCategories: ['converter'], filterKeywords: [] },
  'encoder-decoder-tools': { filterCategories: ['encoder', 'encoding'], filterKeywords: ['encode', 'decode', 'hash'] },
  'formatter-tools': { filterCategories: ['formatter'], filterKeywords: ['formatter', 'beautifier', 'prettifier'] },
  'generator-tools': { filterCategories: ['generator', 'generators'], filterKeywords: ['generator'] },
  'text-tools': { filterCategories: ['text'], filterKeywords: ['text', 'string', 'word', 'character', 'counter', 'diff'] },
  'web-tools': { filterCategories: ['web', 'network'], filterKeywords: ['http', 'api', 'dns', 'cors', 'webhook', 'meta-tag', 'og-', 'sitemap', 'robots'] },
  'image-tools': { filterCategories: [], filterKeywords: ['image', 'img', 'png', 'jpg', 'svg', 'webp', 'favicon', 'icon', 'color', 'pixel'] },
  'security-tools': { filterCategories: [], filterKeywords: ['hash', 'password', 'jwt', 'bcrypt', 'hmac', 'sha', 'md5', 'ssl', 'cert', 'saml', 'oauth', 'totp', 'htpasswd', 'pem'] },
  'devops-tools': { filterCategories: ['developer'], filterKeywords: ['docker', 'kubernetes', 'nginx', 'terraform', 'helm', 'systemd', 'cron', 'git', 'dockerfile', 'github-actions', 'openapi'] },
  'markdown-tools': { filterCategories: ['markdown'], filterKeywords: ['markdown', 'md-'] },
};

const validSlugs = Object.keys(categoryConfigs);

// SEO metadata per category per language
const categoryMeta: Record<string, Record<string, { title: string; description: string; h1: string }>> = {
  'json-tools': {
    en: { title: 'Free Online JSON Tools - Formatter, Validator, Converter & More', description: 'Collection of 50+ free online JSON tools: formatter, validator, converter, diff checker, schema generator, and more. No signup required.', h1: 'Free Online JSON Tools' },
    zh: { title: '免费在线 JSON 工具合集 - 格式化、验证、转换', description: '50+ 免费在线 JSON 工具：格式化器、验证器、转换器、差异比较、Schema 生成器等。无需注册。', h1: '免费在线 JSON 工具' },
    ja: { title: '無料オンラインJSONツール集 - フォーマッター・バリデーター・コンバーター', description: '50以上の無料オンラインJSONツール：フォーマッター、バリデーター、コンバーターなど。登録不要。', h1: '無料オンラインJSONツール' },
    ko: { title: '무료 온라인 JSON 도구 모음 - 포매터, 검증기, 변환기', description: '50개 이상의 무료 온라인 JSON 도구: 포매터, 검증기, 변환기 등. 가입 불필요.', h1: '무료 온라인 JSON 도구' },
    fr: { title: 'Outils JSON en ligne gratuits - Formateur, Validateur, Convertisseur', description: 'Plus de 50 outils JSON gratuits en ligne : formateur, validateur, convertisseur et plus encore.', h1: 'Outils JSON en ligne gratuits' },
    de: { title: 'Kostenlose Online JSON-Tools - Formatierer, Validator, Konverter', description: 'Über 50 kostenlose Online JSON-Tools: Formatierer, Validator, Konverter und mehr. Keine Anmeldung nötig.', h1: 'Kostenlose Online JSON-Tools' },
    es: { title: 'Herramientas JSON en línea gratuitas - Formateador, Validador, Convertidor', description: 'Más de 50 herramientas JSON gratuitas en línea: formateador, validador, convertidor y más.', h1: 'Herramientas JSON gratuitas' },
    pt: { title: 'Ferramentas JSON Online Gratuitas - Formatador, Validador, Conversor', description: 'Mais de 50 ferramentas JSON gratuitas online: formatador, validador, conversor e mais.', h1: 'Ferramentas JSON Online Gratuitas' },
    it: { title: 'Strumenti JSON Online Gratuiti - Formattatore, Validatore, Convertitore', description: 'Oltre 50 strumenti JSON gratuiti online: formattatore, validatore, convertitore e altro.', h1: 'Strumenti JSON Online Gratuiti' },
  },
  'css-tools': {
    en: { title: 'Free Online CSS Tools - Generators, Converters & Formatters', description: 'Free CSS tools: gradient generator, flexbox playground, grid generator, Tailwind converter, animation builder, and more.', h1: 'Free Online CSS Tools' },
    zh: { title: '免费在线 CSS 工具 - 生成器、转换器、格式化', description: '免费 CSS 工具：渐变生成器、Flexbox 工具、Grid 生成器、Tailwind 转换器、动画构建器等。', h1: '免费在线 CSS 工具' },
    fr: { title: 'Outils CSS en ligne gratuits - Générateurs, Convertisseurs, Formatage', description: 'Outils CSS gratuits : générateur de gradient, playground Flexbox, générateur Grid, convertisseur Tailwind, constructeur d\'animations, et plus.', h1: 'Outils CSS en ligne gratuits' },
    de: { title: 'Kostenlose Online CSS-Tools - Generatoren, Konverter, Formatierer', description: 'Kostenlose CSS-Tools: Gradient-Generator, Flexbox-Playground, Grid-Generator, Tailwind-Konverter, Animation-Builder und mehr.', h1: 'Kostenlose Online CSS-Tools' },
    es: { title: 'Herramientas CSS en línea gratuitas - Generadores, Convertidores', description: 'Herramientas CSS gratuitas: generador de gradiente, playground de Flexbox, generador Grid, convertidor Tailwind, constructor de animaciones y más.', h1: 'Herramientas CSS en línea gratuitas' },
    pt: { title: 'Ferramentas CSS Online Gratuitas - Geradores, Conversores', description: 'Ferramentas CSS gratuitas: gerador de gradiente, playground Flexbox, gerador de Grid, conversor Tailwind, construtor de animações e mais.', h1: 'Ferramentas CSS Online Gratuitas' },
    it: { title: 'Strumenti CSS Online Gratuiti - Generatori, Convertitori', description: 'Strumenti CSS gratuiti: generatore di gradienti, playground Flexbox, generatore Grid, convertitore Tailwind, costruttore di animazioni e altro.', h1: 'Strumenti CSS Online Gratuiti' },
    ja: { title: '無料オンラインCSSツール - ジェネレーター・コンバーター・フォーマッター', description: '無料CSSツール：グラデーションジェネレーター、Flexboxプレイグラウンド、Gridジェネレーター、Tailwindコンバーターなど。', h1: '無料オンラインCSSツール' },
    ko: { title: '무료 온라인 CSS 도구 - 생성기, 변환기, 포매터', description: '무료 CSS 도구: 그라디언트 생성기, Flexbox 플레이그라운드, Grid 생성기, Tailwind 변환기 등.', h1: '무료 온라인 CSS 도구' },
  },
  'converter-tools': {
    en: { title: 'Free Online Code & Data Converters - 100+ Format Converters', description: 'Convert between data formats instantly: JSON to YAML, XML to JSON, TypeScript to JavaScript, and 100+ more converters. Free, no signup.', h1: 'Free Online Code & Data Converters' },
    zh: { title: '免费在线代码和数据转换器 - 100+ 格式转换工具', description: '即时转换各种数据格式：JSON 转 YAML、XML 转 JSON、TypeScript 转 JavaScript 等。', h1: '免费在线代码和数据转换工具' },
    fr: { title: 'Convertisseurs de code et de données en ligne gratuits - 100+ outils', description: 'Convertissez instantanément entre formats de données : JSON vers YAML, XML vers JSON, TypeScript vers JavaScript et 100+ autres convertisseurs.', h1: 'Convertisseurs de code en ligne gratuits' },
    de: { title: 'Kostenlose Online Code- & Daten-Konverter - 100+ Format-Konverter', description: 'Konvertieren Sie sofort zwischen Datenformaten: JSON zu YAML, XML zu JSON, TypeScript zu JavaScript und 100+ weitere Konverter.', h1: 'Kostenlose Online Code-Konverter' },
    es: { title: 'Convertidores de código y datos en línea gratuitos - 100+ herramientas', description: 'Convierta entre formatos de datos al instante: JSON a YAML, XML a JSON, TypeScript a JavaScript y 100+ más.', h1: 'Convertidores de código en línea gratuitos' },
    pt: { title: 'Conversores Online de Código e Dados Gratuitos - 100+ Ferramentas', description: 'Converta instantaneamente entre formatos de dados: JSON para YAML, XML para JSON, TypeScript para JavaScript e 100+ mais.', h1: 'Conversores Online de Código Gratuitos' },
    it: { title: 'Convertitori Online Gratuiti di Codice e Dati - 100+ Strumenti', description: 'Converti istantaneamente tra formati di dati: JSON in YAML, XML in JSON, TypeScript in JavaScript e 100+ altri.', h1: 'Convertitori Online Gratuiti di Codice' },
    ja: { title: '無料オンラインコード＆データコンバーター - 100以上のフォーマット変換', description: 'データフォーマット間で即座に変換：JSON→YAML、XML→JSON、TypeScript→JavaScriptなど100種類以上。', h1: '無料オンラインコード＆データコンバーター' },
    ko: { title: '무료 온라인 코드 및 데이터 변환기 - 100+ 포맷 변환', description: '데이터 포맷을 즉시 변환: JSON→YAML, XML→JSON, TypeScript→JavaScript 및 100개 이상.', h1: '무료 온라인 코드 변환기' },
  },
  'encoder-decoder-tools': {
    en: { title: 'Free Online Encoder & Decoder Tools - Base64, URL, Hash & More', description: 'Encode and decode data online: Base64, URL encoding, HTML entities, hashing (MD5, SHA-256), JWT, and more.', h1: 'Free Online Encoder & Decoder Tools' },
    zh: { title: '免费在线编码解码工具 - Base64、URL、Hash 等', description: '在线编码和解码数据：Base64、URL 编码、HTML 实体、哈希（MD5、SHA-256）、JWT 等。', h1: '免费在线编码解码工具' },
    fr: { title: 'Encodeurs et décodeurs en ligne gratuits - Base64, URL, Hash', description: 'Encodez et décodez des données en ligne : Base64, encodage URL, entités HTML, hachage (MD5, SHA-256), JWT et plus.', h1: 'Encodeurs et décodeurs en ligne gratuits' },
    de: { title: 'Kostenlose Online Encoder & Decoder - Base64, URL, Hash und mehr', description: 'Kodieren und dekodieren Sie Daten online: Base64, URL-Kodierung, HTML-Entities, Hashing (MD5, SHA-256), JWT und mehr.', h1: 'Kostenlose Online Encoder & Decoder' },
    es: { title: 'Codificadores y decodificadores en línea gratuitos - Base64, URL, Hash', description: 'Codifique y decodifique datos en línea: Base64, codificación URL, entidades HTML, hashing (MD5, SHA-256), JWT y más.', h1: 'Codificadores y decodificadores gratuitos' },
    pt: { title: 'Codificadores e Decodificadores Online Gratuitos - Base64, URL, Hash', description: 'Codifique e decodifique dados online: Base64, codificação URL, entidades HTML, hashing (MD5, SHA-256), JWT e mais.', h1: 'Codificadores e Decodificadores Online Gratuitos' },
    it: { title: 'Codificatori e Decodificatori Online Gratuiti - Base64, URL, Hash', description: 'Codifica e decodifica dati online: Base64, codifica URL, entità HTML, hashing (MD5, SHA-256), JWT e altro.', h1: 'Codificatori e Decodificatori Online Gratuiti' },
    ja: { title: '無料オンラインエンコーダー＆デコーダー - Base64、URL、Hashなど', description: 'オンラインでデータをエンコード・デコード：Base64、URLエンコード、HTMLエンティティ、ハッシュ（MD5、SHA-256）、JWTなど。', h1: '無料オンラインエンコーダー＆デコーダー' },
    ko: { title: '무료 온라인 인코더 및 디코더 - Base64, URL, Hash', description: '온라인에서 데이터 인코딩/디코딩: Base64, URL 인코딩, HTML 엔티티, 해시(MD5, SHA-256), JWT 등.', h1: '무료 온라인 인코더 및 디코더' },
  },
  'formatter-tools': {
    en: { title: 'Free Online Code Formatters & Beautifiers - JSON, SQL, HTML, CSS', description: 'Format and beautify your code online: JSON, SQL, HTML, CSS, XML, JavaScript, Python formatters. Free code formatting tools.', h1: 'Free Online Code Formatters & Beautifiers' },
    zh: { title: '免费在线代码格式化工具 - JSON、SQL、HTML、CSS', description: '在线格式化和美化代码：JSON、SQL、HTML、CSS、XML、JavaScript 格式化。', h1: '免费在线代码格式化工具' },
    fr: { title: 'Formateurs et embellisseurs de code en ligne gratuits', description: 'Formatez et embellissez votre code en ligne : JSON, SQL, HTML, CSS, XML, JavaScript, Python. Outils de formatage gratuits.', h1: 'Formateurs de code en ligne gratuits' },
    de: { title: 'Kostenlose Online Code-Formatierer & Beautifier - JSON, SQL, HTML', description: 'Formatieren und verschönern Sie Ihren Code online: JSON, SQL, HTML, CSS, XML, JavaScript, Python. Kostenlose Tools.', h1: 'Kostenlose Online Code-Formatierer' },
    es: { title: 'Formateadores y embellecedores de código en línea gratuitos', description: 'Formatee y embellezca su código en línea: JSON, SQL, HTML, CSS, XML, JavaScript, Python. Herramientas gratuitas.', h1: 'Formateadores de código en línea gratuitos' },
    pt: { title: 'Formatadores e Embelezadores de Código Online Gratuitos', description: 'Formate e embeleze seu código online: JSON, SQL, HTML, CSS, XML, JavaScript, Python. Ferramentas gratuitas.', h1: 'Formatadores de Código Online Gratuitos' },
    it: { title: 'Formattatori e Abbellitori di Codice Online Gratuiti', description: 'Formatta e abbellisci il tuo codice online: JSON, SQL, HTML, CSS, XML, JavaScript, Python. Strumenti gratuiti.', h1: 'Formattatori di Codice Online Gratuiti' },
    ja: { title: '無料オンラインコードフォーマッター - JSON、SQL、HTML、CSS', description: 'コードをオンラインでフォーマット・整形：JSON、SQL、HTML、CSS、XML、JavaScript、Python。無料ツール。', h1: '無料オンラインコードフォーマッター' },
    ko: { title: '무료 온라인 코드 포매터 - JSON, SQL, HTML, CSS', description: '온라인에서 코드 포맷팅 및 정렬: JSON, SQL, HTML, CSS, XML, JavaScript, Python. 무료 도구.', h1: '무료 온라인 코드 포매터' },
  },
  'generator-tools': {
    en: { title: 'Free Online Generator Tools - UUID, Password, QR Code & More', description: 'Generate UUIDs, passwords, QR codes, lorem ipsum, fake data, hashes, and more. All generators are free with no signup.', h1: 'Free Online Generator Tools' },
    zh: { title: '免费在线生成器工具 - UUID、密码、二维码等', description: '生成 UUID、密码、二维码、占位文本、模拟数据、哈希等。所有生成器工具免费无需注册。', h1: '免费在线生成器工具' },
    fr: { title: 'Outils générateurs en ligne gratuits - UUID, mot de passe, QR code', description: 'Générez des UUID, mots de passe, QR codes, lorem ipsum, données factices, hachages et plus. Tous les générateurs sont gratuits.', h1: 'Outils générateurs en ligne gratuits' },
    de: { title: 'Kostenlose Online Generator-Tools - UUID, Passwort, QR-Code', description: 'Generieren Sie UUIDs, Passwörter, QR-Codes, Lorem Ipsum, Fake-Daten, Hashes und mehr. Alle Generatoren sind kostenlos.', h1: 'Kostenlose Online Generator-Tools' },
    es: { title: 'Herramientas generadoras en línea gratuitas - UUID, contraseña, QR', description: 'Genere UUIDs, contraseñas, códigos QR, lorem ipsum, datos falsos, hashes y más. Todos los generadores son gratuitos.', h1: 'Herramientas generadoras gratuitas' },
    pt: { title: 'Ferramentas Geradoras Online Gratuitas - UUID, Senha, QR Code', description: 'Gere UUIDs, senhas, códigos QR, lorem ipsum, dados falsos, hashes e mais. Todos os geradores são gratuitos.', h1: 'Ferramentas Geradoras Online Gratuitas' },
    it: { title: 'Strumenti Generatori Online Gratuiti - UUID, Password, QR Code', description: 'Genera UUID, password, codici QR, lorem ipsum, dati fittizi, hash e altro. Tutti i generatori sono gratuiti.', h1: 'Strumenti Generatori Online Gratuiti' },
    ja: { title: '無料オンラインジェネレーターツール - UUID、パスワード、QRコード', description: 'UUID、パスワード、QRコード、Lorem Ipsum、ダミーデータ、ハッシュなどを生成。すべて無料で登録不要。', h1: '無料オンラインジェネレーターツール' },
    ko: { title: '무료 온라인 생성기 도구 - UUID, 비밀번호, QR 코드', description: 'UUID, 비밀번호, QR 코드, Lorem Ipsum, 가짜 데이터, 해시 등 생성. 모두 무료, 가입 불필요.', h1: '무료 온라인 생성기 도구' },
  },
  'text-tools': {
    en: { title: 'Free Online Text Tools - Counter, Diff Checker, Converter & More', description: 'Online text tools: word counter, text diff checker, case converter, line sorter, regex tester, ASCII converter, and more.', h1: 'Free Online Text Tools' },
    zh: { title: '免费在线文本工具 - 计数器、差异比较、转换等', description: '在线文本处理工具：字数统计、文本差异比较、大小写转换、行排序、正则测试等。', h1: '免费在线文本工具' },
    fr: { title: 'Outils texte en ligne gratuits - Compteur, Diff, Convertisseur', description: 'Outils texte en ligne : compteur de mots, comparaison de texte, conversion de casse, tri de lignes, testeur regex, convertisseur ASCII.', h1: 'Outils texte en ligne gratuits' },
    de: { title: 'Kostenlose Online Text-Tools - Zähler, Diff-Checker, Konverter', description: 'Online Text-Tools: Wortzähler, Text-Diff-Checker, Case-Konverter, Zeilen-Sortierer, Regex-Tester, ASCII-Konverter.', h1: 'Kostenlose Online Text-Tools' },
    es: { title: 'Herramientas de texto en línea gratuitas - Contador, Diff, Convertidor', description: 'Herramientas de texto: contador de palabras, comparador diff, convertidor de mayúsculas, clasificador de líneas, tester regex.', h1: 'Herramientas de texto en línea gratuitas' },
    pt: { title: 'Ferramentas de Texto Online Gratuitas - Contador, Diff, Conversor', description: 'Ferramentas de texto: contador de palavras, comparador diff, conversor de caixa, ordenador de linhas, testador regex.', h1: 'Ferramentas de Texto Online Gratuitas' },
    it: { title: 'Strumenti di Testo Online Gratuiti - Contatore, Diff, Convertitore', description: 'Strumenti di testo: contatore di parole, comparatore diff, convertitore di maiuscole, ordinatore di righe, tester regex.', h1: 'Strumenti di Testo Online Gratuiti' },
    ja: { title: '無料オンラインテキストツール - カウンター、Diffチェッカー、コンバーター', description: 'オンラインテキストツール：文字数カウンター、差分チェッカー、大文字小文字変換、行ソート、正規表現テスター。', h1: '無料オンラインテキストツール' },
    ko: { title: '무료 온라인 텍스트 도구 - 카운터, Diff 체커, 변환기', description: '온라인 텍스트 도구: 단어 카운터, 텍스트 Diff 체커, 대소문자 변환기, 줄 정렬기, 정규식 테스터.', h1: '무료 온라인 텍스트 도구' },
  },
  'web-tools': {
    en: { title: 'Free Online Web Developer Tools - HTTP, API, DNS & SEO Tools', description: 'Web development utilities: HTTP header checker, API tester, DNS lookup, CORS tester, meta tag generator, robots.txt generator, and more.', h1: 'Free Online Web Developer Tools' },
    zh: { title: '免费在线 Web 开发工具 - HTTP、API、DNS、SEO', description: 'Web 开发工具：HTTP 头检查、API 测试、DNS 查询、CORS 测试、Meta 标签生成器等。', h1: '免费在线 Web 开发工具' },
    fr: { title: 'Outils de développement web en ligne gratuits - HTTP, API, DNS, SEO', description: 'Utilitaires de développement web : vérificateur d\'en-tête HTTP, testeur API, lookup DNS, testeur CORS, générateur meta tag.', h1: 'Outils de développement web en ligne gratuits' },
    de: { title: 'Kostenlose Online Web-Entwickler-Tools - HTTP, API, DNS, SEO', description: 'Webentwicklungs-Utilities: HTTP-Header-Checker, API-Tester, DNS-Lookup, CORS-Tester, Meta-Tag-Generator und mehr.', h1: 'Kostenlose Online Web-Entwickler-Tools' },
    es: { title: 'Herramientas de desarrollo web en línea gratuitas - HTTP, API, DNS, SEO', description: 'Utilidades de desarrollo web: verificador de encabezados HTTP, tester API, lookup DNS, tester CORS, generador meta tag.', h1: 'Herramientas de desarrollo web gratuitas' },
    pt: { title: 'Ferramentas de Desenvolvimento Web Online Gratuitas - HTTP, API, DNS', description: 'Utilitários de desenvolvimento web: verificador de cabeçalhos HTTP, testador API, lookup DNS, testador CORS, gerador meta tag.', h1: 'Ferramentas de Desenvolvimento Web Gratuitas' },
    it: { title: 'Strumenti di Sviluppo Web Online Gratuiti - HTTP, API, DNS, SEO', description: 'Utilità per lo sviluppo web: verificatore header HTTP, tester API, lookup DNS, tester CORS, generatore meta tag.', h1: 'Strumenti di Sviluppo Web Online Gratuiti' },
    ja: { title: '無料オンラインWeb開発ツール - HTTP、API、DNS、SEO', description: 'Web開発ユーティリティ：HTTPヘッダーチェッカー、APIテスター、DNSルックアップ、CORSテスター、メタタグジェネレーター。', h1: '無料オンラインWeb開発ツール' },
    ko: { title: '무료 온라인 웹 개발자 도구 - HTTP, API, DNS, SEO', description: '웹 개발 유틸리티: HTTP 헤더 체커, API 테스터, DNS 조회, CORS 테스터, 메타 태그 생성기.', h1: '무료 온라인 웹 개발자 도구' },
  },
  'image-tools': {
    en: { title: 'Free Online Image Tools - Converter, Compressor, Resizer & Color Tools', description: 'Process images online: format conversion, compression, resizing, cropping, favicon generation, Base64 encoding, and color tools.', h1: 'Free Online Image & Color Tools' },
    zh: { title: '免费在线图片工具 - 转换、压缩、调整大小、颜色工具', description: '在线处理图片：格式转换、压缩、调整大小、裁剪、图标生成、Base64 编码和颜色工具。', h1: '免费在线图片和颜色工具' },
    fr: { title: 'Outils d\'image en ligne gratuits - Convertisseur, Compresseur, Couleurs', description: 'Traitez vos images en ligne : conversion de format, compression, redimensionnement, recadrage, génération de favicon, encodage Base64.', h1: 'Outils d\'image et de couleur gratuits' },
    de: { title: 'Kostenlose Online Bild-Tools - Konverter, Kompressor, Größenänderung', description: 'Bilder online bearbeiten: Formatkonvertierung, Komprimierung, Größenänderung, Zuschneiden, Favicon-Generierung, Base64.', h1: 'Kostenlose Online Bild- & Farb-Tools' },
    es: { title: 'Herramientas de imagen en línea gratuitas - Convertidor, Compresor', description: 'Procese imágenes en línea: conversión de formato, compresión, redimensionamiento, recorte, generación de favicon, Base64.', h1: 'Herramientas de imagen y color gratuitas' },
    pt: { title: 'Ferramentas de Imagem Online Gratuitas - Conversor, Compressor', description: 'Processe imagens online: conversão de formato, compressão, redimensionamento, corte, geração de favicon, Base64.', h1: 'Ferramentas de Imagem Online Gratuitas' },
    it: { title: 'Strumenti Immagine Online Gratuiti - Convertitore, Compressore', description: 'Elabora immagini online: conversione formato, compressione, ridimensionamento, ritaglio, generazione favicon, Base64.', h1: 'Strumenti Immagine Online Gratuiti' },
    ja: { title: '無料オンライン画像ツール - コンバーター、圧縮、リサイザー', description: '画像をオンラインで処理：フォーマット変換、圧縮、リサイズ、トリミング、Favicon生成、Base64エンコード。', h1: '無料オンライン画像＆カラーツール' },
    ko: { title: '무료 온라인 이미지 도구 - 변환기, 압축기, 크기 조정', description: '온라인 이미지 처리: 포맷 변환, 압축, 크기 조정, 자르기, 파비콘 생성, Base64 인코딩.', h1: '무료 온라인 이미지 및 색상 도구' },
  },
  'security-tools': {
    en: { title: 'Free Online Security Tools - Hash, JWT, SSL, Password & Encryption', description: 'Online security tools: hash generators (MD5, SHA), JWT decoder, password generator, SSL checker, bcrypt, HMAC, and more.', h1: 'Free Online Security Tools' },
    zh: { title: '免费在线安全工具 - 哈希、JWT、SSL、密码、加密', description: '在线安全工具：哈希生成器（MD5、SHA）、JWT 解码器、密码生成器、SSL 检查、bcrypt 等。', h1: '免费在线安全工具' },
    fr: { title: 'Outils de sécurité en ligne gratuits - Hash, JWT, SSL, Mot de passe', description: 'Outils de sécurité en ligne : générateurs de hash (MD5, SHA), décodeur JWT, générateur de mot de passe, vérificateur SSL, bcrypt, HMAC.', h1: 'Outils de sécurité en ligne gratuits' },
    de: { title: 'Kostenlose Online Sicherheits-Tools - Hash, JWT, SSL, Passwort', description: 'Online Sicherheits-Tools: Hash-Generatoren (MD5, SHA), JWT-Decoder, Passwort-Generator, SSL-Checker, bcrypt, HMAC.', h1: 'Kostenlose Online Sicherheits-Tools' },
    es: { title: 'Herramientas de seguridad en línea gratuitas - Hash, JWT, SSL', description: 'Herramientas de seguridad: generadores de hash (MD5, SHA), decodificador JWT, generador de contraseñas, verificador SSL, bcrypt.', h1: 'Herramientas de seguridad gratuitas' },
    pt: { title: 'Ferramentas de Segurança Online Gratuitas - Hash, JWT, SSL', description: 'Ferramentas de segurança: geradores de hash (MD5, SHA), decodificador JWT, gerador de senhas, verificador SSL, bcrypt.', h1: 'Ferramentas de Segurança Online Gratuitas' },
    it: { title: 'Strumenti di Sicurezza Online Gratuiti - Hash, JWT, SSL, Password', description: 'Strumenti di sicurezza: generatori di hash (MD5, SHA), decodificatore JWT, generatore password, verificatore SSL, bcrypt.', h1: 'Strumenti di Sicurezza Online Gratuiti' },
    ja: { title: '無料オンラインセキュリティツール - ハッシュ、JWT、SSL、パスワード', description: 'オンラインセキュリティツール：ハッシュジェネレーター（MD5、SHA）、JWTデコーダー、パスワードジェネレーター、SSLチェッカー、bcrypt。', h1: '無料オンラインセキュリティツール' },
    ko: { title: '무료 온라인 보안 도구 - 해시, JWT, SSL, 비밀번호, 암호화', description: '온라인 보안 도구: 해시 생성기(MD5, SHA), JWT 디코더, 비밀번호 생성기, SSL 체커, bcrypt, HMAC.', h1: '무료 온라인 보안 도구' },
  },
  'devops-tools': {
    en: { title: 'Free Online DevOps Tools - Docker, Kubernetes, Nginx, Terraform & CI/CD', description: 'DevOps utilities: Docker Compose generator, Kubernetes YAML validator, Nginx config, Terraform formatter, GitHub Actions, and more.', h1: 'Free Online DevOps Tools' },
    zh: { title: '免费在线 DevOps 工具 - Docker、K8s、Nginx、Terraform', description: 'DevOps 工具：Docker Compose 生成器、K8s YAML 验证、Nginx 配置、Terraform 格式化等。', h1: '免费在线 DevOps 工具' },
    fr: { title: 'Outils DevOps en ligne gratuits - Docker, Kubernetes, Nginx, Terraform', description: 'Utilitaires DevOps : générateur Docker Compose, validateur Kubernetes YAML, config Nginx, formateur Terraform, GitHub Actions.', h1: 'Outils DevOps en ligne gratuits' },
    de: { title: 'Kostenlose Online DevOps-Tools - Docker, Kubernetes, Nginx, Terraform', description: 'DevOps-Utilities: Docker Compose Generator, Kubernetes YAML Validator, Nginx Config, Terraform Formatter, GitHub Actions.', h1: 'Kostenlose Online DevOps-Tools' },
    es: { title: 'Herramientas DevOps en línea gratuitas - Docker, Kubernetes, Nginx', description: 'Utilidades DevOps: generador Docker Compose, validador Kubernetes YAML, config Nginx, formateador Terraform, GitHub Actions.', h1: 'Herramientas DevOps gratuitas' },
    pt: { title: 'Ferramentas DevOps Online Gratuitas - Docker, Kubernetes, Nginx', description: 'Utilitários DevOps: gerador Docker Compose, validador Kubernetes YAML, config Nginx, formatador Terraform, GitHub Actions.', h1: 'Ferramentas DevOps Online Gratuitas' },
    it: { title: 'Strumenti DevOps Online Gratuiti - Docker, Kubernetes, Nginx', description: 'Utilità DevOps: generatore Docker Compose, validatore Kubernetes YAML, config Nginx, formattatore Terraform, GitHub Actions.', h1: 'Strumenti DevOps Online Gratuiti' },
    ja: { title: '無料オンラインDevOpsツール - Docker、Kubernetes、Nginx、Terraform', description: 'DevOpsユーティリティ：Docker Composeジェネレーター、Kubernetes YAMLバリデーター、Nginx設定、Terraformフォーマッター、GitHub Actions。', h1: '無料オンラインDevOpsツール' },
    ko: { title: '무료 온라인 DevOps 도구 - Docker, Kubernetes, Nginx, Terraform', description: 'DevOps 유틸리티: Docker Compose 생성기, Kubernetes YAML 검증기, Nginx 설정, Terraform 포매터, GitHub Actions.', h1: '무료 온라인 DevOps 도구' },
  },
  'markdown-tools': {
    en: { title: 'Free Online Markdown Tools - Editor, Preview, Converter & More', description: 'Markdown tools: live editor, preview, table generator, HTML converter, link checker, and PDF export. Free markdown utilities.', h1: 'Free Online Markdown Tools' },
    zh: { title: '免费在线 Markdown 工具 - 编辑器、预览、转换', description: 'Markdown 在线工具：实时编辑器、预览、表格生成、HTML 转换、链接检查、PDF 导出。', h1: '免费在线 Markdown 工具' },
    fr: { title: 'Outils Markdown en ligne gratuits - Éditeur, Aperçu, Convertisseur', description: 'Outils Markdown : éditeur en direct, aperçu, générateur de tableau, convertisseur HTML, vérificateur de liens, export PDF.', h1: 'Outils Markdown en ligne gratuits' },
    de: { title: 'Kostenlose Online Markdown-Tools - Editor, Vorschau, Konverter', description: 'Markdown-Tools: Live-Editor, Vorschau, Tabellengenerator, HTML-Konverter, Link-Checker und PDF-Export.', h1: 'Kostenlose Online Markdown-Tools' },
    es: { title: 'Herramientas Markdown en línea gratuitas - Editor, Vista previa', description: 'Herramientas Markdown: editor en vivo, vista previa, generador de tablas, convertidor HTML, verificador de enlaces, export PDF.', h1: 'Herramientas Markdown gratuitas' },
    pt: { title: 'Ferramentas Markdown Online Gratuitas - Editor, Visualização', description: 'Ferramentas Markdown: editor ao vivo, visualização, gerador de tabelas, conversor HTML, verificador de links, export PDF.', h1: 'Ferramentas Markdown Online Gratuitas' },
    it: { title: 'Strumenti Markdown Online Gratuiti - Editor, Anteprima, Convertitore', description: 'Strumenti Markdown: editor live, anteprima, generatore di tabelle, convertitore HTML, verificatore link, export PDF.', h1: 'Strumenti Markdown Online Gratuiti' },
    ja: { title: '無料オンラインMarkdownツール - エディター、プレビュー、コンバーター', description: 'Markdownツール：ライブエディター、プレビュー、テーブルジェネレーター、HTMLコンバーター、リンクチェッカー、PDFエクスポート。', h1: '無料オンラインMarkdownツール' },
    ko: { title: '무료 온라인 Markdown 도구 - 편집기, 미리보기, 변환기', description: 'Markdown 도구: 라이브 편집기, 미리보기, 테이블 생성기, HTML 변환기, 링크 체커, PDF 내보내기.', h1: '무료 온라인 Markdown 도구' },
  },
};

export async function generateStaticParams() {
  // Pre-render all currently enabled locales for all categories.
  // These are high-priority aggregate landing pages for long-tail queries.
  return i18n.locales.flatMap(lang =>
    validSlugs.map(slug => ({ lang, slug }))
  );
}

function getToolsForCategory(slug: string): Tool[] {
  const config = categoryConfigs[slug];
  if (!config) return [];

  const seen = new Set<string>();
  return tools.filter(tool => {
    if (seen.has(tool.id)) return false;
    let match = false;
    if (config.filterCategories.length > 0 && config.filterCategories.includes(tool.category)) {
      match = true;
    }
    if (!match && config.filterKeywords.length > 0) {
      match = config.filterKeywords.some(kw =>
        tool.id.toLowerCase().includes(kw) ||
        tool.name.toLowerCase().includes(kw) ||
        (tool.keywords && tool.keywords.some((k: string) => k.toLowerCase().includes(kw)))
      );
    }
    if (match) seen.add(tool.id);
    return match;
  });
}

interface PageProps {
  params: Promise<{ lang: string; slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!validSlugs.includes(slug)) return {};

  const meta = categoryMeta[slug]?.[lang] || categoryMeta[slug]?.['en'];
  if (!meta) return {};

  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: `https://viadreams.cc/${lang}/category/${slug}/`,
      languages: Object.fromEntries(
        i18n.locales.map(l => [l, `https://viadreams.cc/${l}/category/${slug}/`])
      ),
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: `https://viadreams.cc/${lang}/category/${slug}/`,
      siteName: 'DevToolBox',
      type: 'website',
    },
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { lang: rawLang, slug } = await params;

  if (!i18n.locales.includes(rawLang as Locale) || !validSlugs.includes(slug)) {
    notFound();
  }

  const lang = rawLang as Locale;
  const dict = await getDictionary(lang);
  const ui = await getUIDictionary(lang);
  const categoryTools = getToolsForCategory(slug);
  const meta = categoryMeta[slug]?.[lang] || categoryMeta[slug]?.['en'];
  const categoryKeywords = [
    slug,
    meta?.h1 || '',
    ...categoryConfigs[slug].filterCategories,
    ...categoryConfigs[slug].filterKeywords,
  ];

  const isZh = lang === 'zh';

  // JSON-LD CollectionPage + ItemList
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        name: meta?.title || slug,
        description: meta?.description || '',
        url: `https://viadreams.cc/${lang}/category/${slug}/`,
      },
      {
        '@type': 'ItemList',
        numberOfItems: categoryTools.length,
        itemListElement: categoryTools.slice(0, 50).map((tool, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          url: `https://viadreams.cc/${lang}/tools/${tool.id}/`,
          name: dict.tools?.[tool.id]?.name || tool.name,
        })),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `https://viadreams.cc/${lang}/` },
          { '@type': 'ListItem', position: 2, name: meta?.h1 || slug, item: `https://viadreams.cc/${lang}/category/${slug}/` },
        ],
      },
    ],
  };

  const toolCount = categoryTools.length;

  return (
    <LangProvider lang={lang} dict={{...dict, ...ui}}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Breadcrumbs */}
        <nav className="mb-6 text-sm text-gray-400" aria-label="Breadcrumb">
          <Link href={`/${lang}`} className="hover:text-blue-400 transition-colors">Home</Link>
          <span className="mx-2 text-gray-600">/</span>
          <span className="text-gray-200">{meta?.h1 || slug}</span>
        </nav>

        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
          {meta?.h1 || slug}
        </h1>
        <p className="text-gray-400 mb-2 max-w-3xl text-lg">
          {meta?.description || ''}
        </p>
        <p className="text-sm text-gray-500 mb-8">
          {isZh ? `${toolCount} 个工具可用` : `${toolCount} tools available`}
        </p>

        <AdSlot size="leaderboard" placement="category-top" category={slug} />
        <SponsorCta placement="category-top-sponsor" category={slug} id="category-sponsor" />
        <PartnerOfferStrip
          category={slug}
          keywords={categoryKeywords}
          placement="category-partner-strip"
        />

        {/* Tools grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
          {categoryTools.map((tool, index) => {
            const toolDict = dict.tools?.[tool.id];
            return (
              <Fragment key={tool.id}>
                {index === 9 && categoryTools.length > 15 && (
                  <div className="sm:col-span-2 lg:col-span-3">
                    <AdSlot
                      size="leaderboard"
                      placement="category-mid"
                      category={slug}
                      fallbackToSponsor
                      style={{ marginTop: 8, marginBottom: 8 }}
                    />
                  </div>
                )}
                <Link
                  href={`/${lang}/tools/${tool.id}`}
                  className="group block p-5 rounded-xl bg-gray-800/50 border border-gray-700/50 hover:border-blue-500/50 hover:bg-gray-800/80 transition-all duration-200"
                >
                  <div className="flex items-start gap-3">
                    <span className="text-2xl flex-shrink-0">{tool.icon}</span>
                    <div className="min-w-0">
                      <h2 className="text-white font-medium group-hover:text-blue-400 transition-colors truncate">
                        {toolDict?.name || tool.name}
                      </h2>
                      <p className="text-sm text-gray-400 mt-1 line-clamp-2">
                        {toolDict?.description || tool.description}
                      </p>
                    </div>
                  </div>
                </Link>
              </Fragment>
            );
          })}
        </div>

        {/* SEO content block */}
        <section className="mt-16 border-t border-gray-800 pt-8">
          <h2 className="text-xl font-semibold text-white mb-4">
            {isZh ? `关于${meta?.h1 || '这些工具'}` : `About ${meta?.h1 || 'These Tools'}`}
          </h2>
          <div className="text-gray-400 space-y-3 max-w-3xl">
            <p>
              {isZh
                ? `DevToolBox 提供一系列免费的在线开发者工具，帮助你高效完成日常开发任务。此分类下共有 ${toolCount} 个工具，全部在浏览器中运行，无需安装任何软件。你的数据不会发送到服务器，确保隐私安全。`
                : `DevToolBox provides a collection of free online developer tools to help you efficiently complete everyday development tasks. This category includes ${toolCount} tools, all running directly in your browser with no installation required. Your data stays on your device and is never sent to our servers, ensuring complete privacy.`
              }
            </p>
            <p>
              {isZh
                ? '所有工具完全免费，无需注册或登录。支持 15 种语言，随时随地使用。'
                : 'All tools are completely free with no registration or login required. Available in 15 languages for developers worldwide.'
              }
            </p>
          </div>
        </section>

        <AdSlot
          size="leaderboard"
          placement="category-bottom"
          category={slug}
          fallbackToSponsor
          style={{ marginTop: 36 }}
        />

        {/* Cross-linking to other categories */}
        <section className="mt-12">
          <h2 className="text-lg font-semibold text-white mb-4">
            {isZh ? '浏览其他工具类别' : 'Browse Other Tool Categories'}
          </h2>
          <div className="flex flex-wrap gap-2">
            {validSlugs.filter(s => s !== slug).map(s => {
              const sMeta = categoryMeta[s]?.[lang] || categoryMeta[s]?.['en'];
              return (
                <Link
                  key={s}
                  href={`/${lang}/category/${s}`}
                  className="px-3 py-1.5 rounded-full bg-gray-800 border border-gray-700 text-sm text-gray-300 hover:border-blue-500/50 hover:text-blue-400 transition-all"
                >
                  {sMeta?.h1 || s}
                </Link>
              );
            })}
          </div>
        </section>
      </div>
    </LangProvider>
  );
}
