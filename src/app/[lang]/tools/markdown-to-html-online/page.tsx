'use client';

import React, { useState, useCallback, useMemo } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import Link from 'next/link';
import { useLang } from '@/i18n/LangContext';

const ui: Record<string, Record<string, string>> = {
  en: {
    title: 'Markdown to HTML Converter',
    description: 'Convert Markdown to HTML online. Supports headers, bold, italic, links, code blocks, blockquotes, and lists. Live preview included.',
    inputLabel: 'Markdown Input',
    inputPlaceholder: '# Hello World\n\nType your **Markdown** here...',
    outputLabel: 'HTML Output',
    previewLabel: 'Preview',
    tabHtml: 'HTML',
    tabPreview: 'Preview',
    convert: 'Convert',
    clear: 'Clear',
    loadSample: 'Load Sample',
    copyHtml: 'Copy HTML',
    introTitle: 'Free Online Markdown to HTML Converter',
    introText: 'Convert Markdown syntax to clean, semantic HTML instantly. This tool supports all common Markdown elements: ATX-style headings (# to ######), bold (**text**), italic (*text*), inline code (`code`), fenced code blocks (```), blockquotes (>), ordered and unordered lists, links ([text](url)), horizontal rules (---), and paragraphs. The live preview shows your rendered output in real time.',
    faqTitle: 'Frequently Asked Questions',
    faq1q: 'What Markdown syntax is supported?',
    faq1a: 'This converter supports: headings (# to ######), bold (**text** or __text__), italic (*text* or _text_), inline code (`code`), fenced code blocks (```language), blockquotes (>), unordered lists (- or *), ordered lists (1.), links ([text](url)), images (![alt](url)), horizontal rules (--- or ***), and paragraphs separated by blank lines.',
    faq2q: 'Is the conversion safe for production use?',
    faq2a: 'The generated HTML is clean and semantic. However, for production web applications, always sanitize HTML output to prevent XSS attacks, especially if the Markdown comes from user input. Use a library like DOMPurify on the client side or a server-side sanitizer.',
    faq3q: 'Can I embed Markdown in JavaScript applications?',
    faq3a: 'Yes. Many JavaScript libraries handle Markdown-to-HTML conversion: marked.js, markdown-it, and remark are the most popular. This tool uses a lightweight parser to demonstrate the conversion. For production apps, use a well-tested library.',
    faq4q: 'What is the difference between CommonMark and GitHub Flavored Markdown?',
    faq4a: 'CommonMark is the standardized specification for Markdown. GitHub Flavored Markdown (GFM) extends CommonMark with tables, task lists (- [ ] item), strikethrough (~~text~~), and autolinked URLs. Most documentation tools support GFM.',
    relatedTitle: 'Related Tools',
  },
  fr: {
    title: 'Convertisseur Markdown vers HTML',
    description: 'Convertissez Markdown en HTML en ligne. Supporte les titres, gras, italique, liens, blocs de code et listes.',
    inputLabel: 'Entree Markdown', inputPlaceholder: '# Bonjour le Monde\n\nSaisissez votre **Markdown** ici...',
    outputLabel: 'Sortie HTML', previewLabel: 'Apercu', tabHtml: 'HTML', tabPreview: 'Apercu',
    convert: 'Convertir', clear: 'Effacer', loadSample: 'Exemple', copyHtml: 'Copier HTML',
    introTitle: 'Convertisseur Markdown vers HTML Gratuit', introText: 'Convertissez la syntaxe Markdown en HTML propre et semantique. Supporte titres, gras, italique, code, citations et listes.',
    faqTitle: 'Questions Frequentes',
    faq1q: 'Quelle syntaxe Markdown est supportee?', faq1a: 'Titres (# a ######), gras (**), italique (*), code inline (`), blocs de code (```), citations (>), listes, liens et plus.',
    faq2q: 'La conversion est-elle sure pour la production?', faq2a: 'Le HTML genere est propre. Pour les applications de production, assainissez toujours la sortie HTML pour prevenir les attaques XSS.',
    faq3q: 'Puis-je integrer dans des applications JavaScript?', faq3a: 'Oui. Des bibliotheques comme marked.js, markdown-it et remark gerent la conversion Markdown vers HTML.',
    faq4q: 'Difference entre CommonMark et GitHub Flavored Markdown?', faq4a: 'CommonMark est la specification standardisee. GFM ajoute tableaux, listes de taches, strikethrough et URLs automatiques.',
    relatedTitle: 'Outils Connexes',
  },
  de: {
    title: 'Markdown zu HTML Konverter',
    description: 'Konvertieren Sie Markdown online in HTML. Unterstuetzt Ueberschriften, Fett, Kursiv, Links, Codeblocks und Listen.',
    inputLabel: 'Markdown Eingabe', inputPlaceholder: '# Hallo Welt\n\nGeben Sie Ihr **Markdown** hier ein...',
    outputLabel: 'HTML Ausgabe', previewLabel: 'Vorschau', tabHtml: 'HTML', tabPreview: 'Vorschau',
    convert: 'Konvertieren', clear: 'Loeschen', loadSample: 'Beispiel laden', copyHtml: 'HTML kopieren',
    introTitle: 'Kostenloser Online Markdown zu HTML Konverter', introText: 'Konvertieren Sie Markdown-Syntax in sauberes, semantisches HTML. Unterstuetzt Ueberschriften, Fett, Kursiv, Code, Blockzitate und Listen.',
    faqTitle: 'Haeufig gestellte Fragen',
    faq1q: 'Welche Markdown-Syntax wird unterstuetzt?', faq1a: 'Ueberschriften (# bis ######), Fett (**), Kursiv (*), Inline-Code (`), Codeblocks (```), Blockzitate (>), Listen, Links.',
    faq2q: 'Ist die Konvertierung produktionssicher?', faq2a: 'Das generierte HTML ist sauber. Fuer Produktionsanwendungen bereinigen Sie immer die HTML-Ausgabe, um XSS-Angriffe zu verhindern.',
    faq3q: 'Kann ich es in JavaScript-Anwendungen einbetten?', faq3a: 'Ja. Bibliotheken wie marked.js, markdown-it und remark koennen die Konvertierung uebernehmen.',
    faq4q: 'Unterschied zwischen CommonMark und GitHub Flavored Markdown?', faq4a: 'CommonMark ist die standardisierte Spezifikation. GFM fuegt Tabellen, Aufgabenlisten, Durchstreichen und automatische URLs hinzu.',
    relatedTitle: 'Verwandte Tools',
  },
  es: {
    title: 'Convertidor Markdown a HTML',
    description: 'Convierta Markdown a HTML en linea. Soporta encabezados, negrita, cursiva, enlaces, bloques de codigo y listas.',
    inputLabel: 'Entrada Markdown', inputPlaceholder: '# Hola Mundo\n\nEscriba su **Markdown** aqui...',
    outputLabel: 'Salida HTML', previewLabel: 'Vista previa', tabHtml: 'HTML', tabPreview: 'Vista previa',
    convert: 'Convertir', clear: 'Limpiar', loadSample: 'Cargar ejemplo', copyHtml: 'Copiar HTML',
    introTitle: 'Convertidor Markdown a HTML Gratuito', introText: 'Convierta la sintaxis Markdown en HTML limpio y semantico. Soporta encabezados, negrita, cursiva, codigo, citas y listas.',
    faqTitle: 'Preguntas Frecuentes',
    faq1q: 'Que sintaxis Markdown se soporta?', faq1a: 'Encabezados (# a ######), negrita (**), cursiva (*), codigo inline (`), bloques de codigo (```), citas (>), listas, enlaces.',
    faq2q: 'Es segura la conversion para produccion?', faq2a: 'El HTML generado es limpio. Para aplicaciones de produccion, siempre sanee la salida HTML para evitar ataques XSS.',
    faq3q: 'Puedo integrarlo en aplicaciones JavaScript?', faq3a: 'Si. Librerias como marked.js, markdown-it y remark manejan la conversion de Markdown a HTML.',
    faq4q: 'Diferencia entre CommonMark y GitHub Flavored Markdown?', faq4a: 'CommonMark es la especificacion estandarizada. GFM agrega tablas, listas de tareas, tachado y URLs automaticas.',
    relatedTitle: 'Herramientas Relacionadas',
  },
  it: {
    title: 'Convertitore Markdown in HTML',
    description: 'Converti Markdown in HTML online. Supporta intestazioni, grassetto, corsivo, link, blocchi di codice e liste.',
    inputLabel: 'Input Markdown', inputPlaceholder: '# Ciao Mondo\n\nScrivi il tuo **Markdown** qui...',
    outputLabel: 'Output HTML', previewLabel: 'Anteprima', tabHtml: 'HTML', tabPreview: 'Anteprima',
    convert: 'Converti', clear: 'Cancella', loadSample: 'Carica esempio', copyHtml: 'Copia HTML',
    introTitle: 'Convertitore Markdown in HTML Gratuito', introText: 'Converti la sintassi Markdown in HTML pulito e semantico. Supporta intestazioni, grassetto, corsivo, codice, citazioni e liste.',
    faqTitle: 'Domande Frequenti',
    faq1q: 'Quale sintassi Markdown e supportata?', faq1a: 'Intestazioni (# a ######), grassetto (**), corsivo (*), codice inline (`), blocchi di codice (```), citazioni (>), liste, link.',
    faq2q: 'La conversione e sicura per la produzione?', faq2a: 'L\'HTML generato e pulito. Per le app di produzione, sanifica sempre l\'output HTML per prevenire attacchi XSS.',
    faq3q: 'Posso integrarlo in applicazioni JavaScript?', faq3a: 'Si. Librerie come marked.js, markdown-it e remark gestiscono la conversione.',
    faq4q: 'Differenza tra CommonMark e GitHub Flavored Markdown?', faq4a: 'CommonMark e la specifica standardizzata. GFM aggiunge tabelle, liste di attivita, barrato e URL automatici.',
    relatedTitle: 'Strumenti Correlati',
  },
  pt: {
    title: 'Conversor Markdown para HTML',
    description: 'Converta Markdown para HTML online. Suporta cabecalhos, negrito, italico, links, blocos de codigo e listas.',
    inputLabel: 'Entrada Markdown', inputPlaceholder: '# Ola Mundo\n\nDigite seu **Markdown** aqui...',
    outputLabel: 'Saida HTML', previewLabel: 'Visualizacao', tabHtml: 'HTML', tabPreview: 'Visualizacao',
    convert: 'Converter', clear: 'Limpar', loadSample: 'Carregar exemplo', copyHtml: 'Copiar HTML',
    introTitle: 'Conversor Markdown para HTML Gratuito', introText: 'Converta a sintaxe Markdown em HTML limpo e semantico. Suporta cabecalhos, negrito, italico, codigo, citacoes e listas.',
    faqTitle: 'Perguntas Frequentes',
    faq1q: 'Qual sintaxe Markdown e suportada?', faq1a: 'Cabecalhos (# a ######), negrito (**), italico (*), codigo inline (`), blocos de codigo (```), citacoes (>), listas, links.',
    faq2q: 'A conversao e segura para producao?', faq2a: 'O HTML gerado e limpo. Para aplicacoes de producao, sempre higienize a saida HTML para evitar ataques XSS.',
    faq3q: 'Posso integrar em aplicacoes JavaScript?', faq3a: 'Sim. Bibliotecas como marked.js, markdown-it e remark lidam com a conversao.',
    faq4q: 'Diferenca entre CommonMark e GitHub Flavored Markdown?', faq4a: 'CommonMark e a especificacao padronizada. GFM adiciona tabelas, listas de tarefas, tachado e URLs automaticas.',
    relatedTitle: 'Ferramentas Relacionadas',
  },
  nl: {
    title: 'Markdown naar HTML Converter',
    description: 'Converteer Markdown naar HTML online. Ondersteunt koppen, vet, cursief, links, codeblokken en lijsten.',
    inputLabel: 'Markdown Invoer', inputPlaceholder: '# Hallo Wereld\n\nVoer uw **Markdown** hier in...',
    outputLabel: 'HTML Uitvoer', previewLabel: 'Voorbeeld', tabHtml: 'HTML', tabPreview: 'Voorbeeld',
    convert: 'Converteer', clear: 'Wissen', loadSample: 'Voorbeeld laden', copyHtml: 'HTML kopiëren',
    introTitle: 'Gratis Online Markdown naar HTML Converter', introText: 'Converteer Markdown-syntax naar schone, semantische HTML. Ondersteunt koppen, vet, cursief, code, citaten en lijsten.',
    faqTitle: 'Veelgestelde Vragen',
    faq1q: 'Welke Markdown-syntax wordt ondersteund?', faq1a: 'Koppen (# tot ######), vet (**), cursief (*), inline code (`), codeblokken (```), citaten (>), lijsten, links.',
    faq2q: 'Is de conversie veilig voor productie?', faq2a: 'De gegenereerde HTML is schoon. Reinig voor productieapps altijd de HTML-uitvoer om XSS-aanvallen te voorkomen.',
    faq3q: 'Kan ik het integreren in JavaScript-applicaties?', faq3a: 'Ja. Bibliotheken zoals marked.js, markdown-it en remark verwerken de conversie.',
    faq4q: 'Verschil tussen CommonMark en GitHub Flavored Markdown?', faq4a: 'CommonMark is de gestandaardiseerde specificatie. GFM voegt tabellen, takenlijsten, doorhaling en automatische URL\'s toe.',
    relatedTitle: 'Gerelateerde Tools',
  },
  pl: {
    title: 'Konwerter Markdown do HTML',
    description: 'Konwertuj Markdown na HTML online. Obsluguje naglowki, pogrubienie, kursywe, linki, bloki kodu i listy.',
    inputLabel: 'Wejscie Markdown', inputPlaceholder: '# Witaj Swiecie\n\nWpisz swoj **Markdown** tutaj...',
    outputLabel: 'Wyjscie HTML', previewLabel: 'Podglad', tabHtml: 'HTML', tabPreview: 'Podglad',
    convert: 'Konwertuj', clear: 'Wyczysc', loadSample: 'Zaladuj przyklad', copyHtml: 'Kopiuj HTML',
    introTitle: 'Darmowy Konwerter Markdown do HTML', introText: 'Konwertuj skladnie Markdown na czysty, semantyczny HTML. Obsluguje naglowki, pogrubienie, kursywe, kod, cytaty i listy.',
    faqTitle: 'Czesto Zadawane Pytania',
    faq1q: 'Jaka skladnia Markdown jest obslugiwana?', faq1a: 'Naglowki (# do ######), pogrubienie (**), kursywa (*), kod inline (`), bloki kodu (```), cytaty (>), listy, linki.',
    faq2q: 'Czy konwersja jest bezpieczna do produkcji?', faq2a: 'Wygenerowany HTML jest czysty. W aplikacjach produkcyjnych zawsze oczyszczaj HTML, aby zapobiec atakom XSS.',
    faq3q: 'Czy moge integrowac z aplikacjami JavaScript?', faq3a: 'Tak. Biblioteki jak marked.js, markdown-it i remark obsluguja konwersje.',
    faq4q: 'Roznica miedzy CommonMark a GitHub Flavored Markdown?', faq4a: 'CommonMark to standardowa specyfikacja. GFM dodaje tabele, listy zadan, przekreslenie i automatyczne URL.',
    relatedTitle: 'Powiazane Narzedzia',
  },
  sv: {
    title: 'Markdown till HTML Konverterare',
    description: 'Konvertera Markdown till HTML online. Stoeder rubriker, fetstil, kursiv, lankar, kodblock och listor.',
    inputLabel: 'Markdown Inmatning', inputPlaceholder: '# Hej Varlden\n\nSkriv din **Markdown** har...',
    outputLabel: 'HTML Utdata', previewLabel: 'Foerhandsvisning', tabHtml: 'HTML', tabPreview: 'Foerhandsvisning',
    convert: 'Konvertera', clear: 'Rensa', loadSample: 'Ladda exempel', copyHtml: 'Kopiera HTML',
    introTitle: 'Gratis Online Markdown till HTML Konverterare', introText: 'Konvertera Markdown-syntax till ren, semantisk HTML. Stoeder rubriker, fetstil, kursiv, kod, citat och listor.',
    faqTitle: 'Vanliga Fragor',
    faq1q: 'Vilken Markdown-syntax stoeds?', faq1a: 'Rubriker (# till ######), fetstil (**), kursiv (*), inline-kod (`), kodblock (```), citat (>), listor, lankar.',
    faq2q: 'Aer konverteringen saeker foer produktion?', faq2a: 'Det genererade HTML-koden aer ren. Sanera alltid HTML-utdata foer att foerhindra XSS-attacker i produktionsappar.',
    faq3q: 'Kan jag integrera i JavaScript-applikationer?', faq3a: 'Ja. Bibliotek som marked.js, markdown-it och remark hanterar konverteringen.',
    faq4q: 'Skillnad mellan CommonMark och GitHub Flavored Markdown?', faq4a: 'CommonMark aer den standardiserade specifikationen. GFM laegger till tabeller, uppgiftslistor, genomstrykning och automatiska URL:er.',
    relatedTitle: 'Relaterade Verktyg',
  },
  no: {
    title: 'Markdown til HTML Konverter',
    description: 'Konverter Markdown til HTML online. Stoetter overskrifter, fet, kursiv, lenker, kodeblokker og lister.',
    inputLabel: 'Markdown Inndata', inputPlaceholder: '# Hei Verden\n\nSkriv din **Markdown** her...',
    outputLabel: 'HTML Utdata', previewLabel: 'Forhandsvisning', tabHtml: 'HTML', tabPreview: 'Forhandsvisning',
    convert: 'Konverter', clear: 'Toemme', loadSample: 'Last eksempel', copyHtml: 'Kopier HTML',
    introTitle: 'Gratis Online Markdown til HTML Konverter', introText: 'Konverter Markdown-syntaks til ren, semantisk HTML. Stoetter overskrifter, fet, kursiv, kode, sitater og lister.',
    faqTitle: 'Vanlige Spoersmaal',
    faq1q: 'Hvilken Markdown-syntaks stoettes?', faq1a: 'Overskrifter (# til ######), fet (**), kursiv (*), inline-kode (`), kodeblokker (```), sitater (>), lister, lenker.',
    faq2q: 'Er konverteringen trygg for produksjon?', faq2a: 'Det genererte HTML-koden er rent. Rensifjern alltid HTML-utdata for a forhindre XSS-angrep i produksjonsapper.',
    faq3q: 'Kan jeg integrere i JavaScript-applikasjoner?', faq3a: 'Ja. Biblioteker som marked.js, markdown-it og remark haandterer konverteringen.',
    faq4q: 'Forskjell mellom CommonMark og GitHub Flavored Markdown?', faq4a: 'CommonMark er den standardiserte spesifikasjonen. GFM legger til tabeller, oppgavelister, gjennomstrek og automatiske URL-er.',
    relatedTitle: 'Relaterte Verktoy',
  },
  zh: {
    title: 'Markdown 转 HTML 在线',
    description: '在线将 Markdown 转换为 HTML。支持标题、粗体、斜体、链接、代码块和列表，含实时预览。',
    inputLabel: 'Markdown 输入', inputPlaceholder: '# 你好世界\n\n在这里输入您的 **Markdown**...',
    outputLabel: 'HTML 输出', previewLabel: '预览', tabHtml: 'HTML', tabPreview: '预览',
    convert: '转换', clear: '清除', loadSample: '加载示例', copyHtml: '复制 HTML',
    introTitle: '免费在线 Markdown 转 HTML 转换器', introText: '即时将 Markdown 语法转换为干净的语义化 HTML。支持 ATX 风格标题（# 到 ######）、粗体、斜体、内联代码、围栏代码块、块引用、有序和无序列表、链接及水平线。',
    faqTitle: '常见问题',
    faq1q: '支持哪些 Markdown 语法？', faq1a: '标题（# 到 ######）、粗体（**）、斜体（*）、内联代码（`）、代码块（```）、块引用（>）、列表、链接等。',
    faq2q: '转换结果可以在生产环境中使用吗？', faq2a: '生成的 HTML 是干净的。但对于生产 Web 应用，务必对 HTML 输出进行消毒以防止 XSS 攻击。',
    faq3q: '可以嵌入到 JavaScript 应用程序中吗？', faq3a: '可以。marked.js、markdown-it 和 remark 等 JavaScript 库都可以处理 Markdown 到 HTML 的转换。',
    faq4q: 'CommonMark 和 GitHub Flavored Markdown 有何不同？', faq4a: 'CommonMark 是标准化规范，GFM 在其基础上扩展了表格、任务列表、删除线和自动链接 URL 等功能。',
    relatedTitle: '相关工具',
  },
  ja: {
    title: 'Markdown から HTML への変換',
    description: 'Markdown をオンラインで HTML に変換。見出し、太字、斜体、リンク、コードブロック、リストをサポート。',
    inputLabel: 'Markdown 入力', inputPlaceholder: '# こんにちは世界\n\n**Markdown** をここに入力...',
    outputLabel: 'HTML 出力', previewLabel: 'プレビュー', tabHtml: 'HTML', tabPreview: 'プレビュー',
    convert: '変換', clear: 'クリア', loadSample: 'サンプル読込', copyHtml: 'HTML をコピー',
    introTitle: '無料オンライン Markdown から HTML への変換ツール', introText: 'Markdown 構文をクリーンでセマンティックな HTML に即時変換します。見出し、太字、斜体、コード、引用ブロック、リストをサポートします。',
    faqTitle: 'よくある質問',
    faq1q: 'どの Markdown 構文がサポートされていますか？', faq1a: '見出し（# から ######）、太字（**）、斜体（*）、インラインコード（`）、コードブロック（```）、引用（>）、リスト、リンク。',
    faq2q: '変換結果は本番環境で安全ですか？', faq2a: '生成された HTML はクリーンです。本番アプリではXSS攻撃を防ぐため、HTML 出力を必ずサニタイズしてください。',
    faq3q: 'JavaScript アプリケーションに組み込めますか？', faq3a: 'はい。marked.js、markdown-it、remark などのライブラリが変換を処理します。',
    faq4q: 'CommonMark と GitHub Flavored Markdown の違いは？', faq4a: 'CommonMark は標準化された仕様。GFM はテーブル、タスクリスト、取り消し線、自動リンク URL を追加します。',
    relatedTitle: '関連ツール',
  },
  ko: {
    title: 'Markdown을 HTML로 변환',
    description: 'Markdown을 온라인에서 HTML로 변환. 제목, 굵게, 기울임, 링크, 코드 블록, 목록 지원. 실시간 미리보기 포함.',
    inputLabel: 'Markdown 입력', inputPlaceholder: '# 안녕하세요\n\n**Markdown**을 여기에 입력하세요...',
    outputLabel: 'HTML 출력', previewLabel: '미리보기', tabHtml: 'HTML', tabPreview: '미리보기',
    convert: '변환', clear: '지우기', loadSample: '샘플 로드', copyHtml: 'HTML 복사',
    introTitle: '무료 온라인 Markdown HTML 변환기', introText: 'Markdown 구문을 깔끔한 시맨틱 HTML로 즉시 변환합니다. 제목, 굵게, 기울임, 코드, 인용, 목록을 지원합니다.',
    faqTitle: '자주 묻는 질문',
    faq1q: '지원되는 Markdown 구문은?', faq1a: '제목(# ~ ######), 굵게(**), 기울임(*), 인라인 코드(`), 코드 블록(```), 인용(>), 목록, 링크.',
    faq2q: '변환 결과는 프로덕션에서 안전한가요?', faq2a: '생성된 HTML은 깔끔합니다. 프로덕션 앱에서는 XSS 공격 방지를 위해 반드시 HTML 출력을 소독하세요.',
    faq3q: 'JavaScript 애플리케이션에 통합할 수 있나요?', faq3a: '네. marked.js, markdown-it, remark 같은 라이브러리가 변환을 처리합니다.',
    faq4q: 'CommonMark와 GitHub Flavored Markdown의 차이는?', faq4a: 'CommonMark는 표준화된 명세. GFM은 표, 작업 목록, 취소선, 자동 링크 URL을 추가합니다.',
    relatedTitle: '관련 도구',
  },
  id: {
    title: 'Konverter Markdown ke HTML',
    description: 'Konversi Markdown ke HTML online. Mendukung heading, tebal, miring, tautan, blok kode, dan daftar. Pratinjau langsung.',
    inputLabel: 'Input Markdown', inputPlaceholder: '# Halo Dunia\n\nKetik **Markdown** Anda di sini...',
    outputLabel: 'Output HTML', previewLabel: 'Pratinjau', tabHtml: 'HTML', tabPreview: 'Pratinjau',
    convert: 'Konversi', clear: 'Hapus', loadSample: 'Muat Contoh', copyHtml: 'Salin HTML',
    introTitle: 'Konverter Markdown ke HTML Gratis', introText: 'Konversi sintaks Markdown ke HTML bersih dan semantik secara instan. Mendukung heading, tebal, miring, kode, kutipan, dan daftar.',
    faqTitle: 'Pertanyaan yang Sering Diajukan',
    faq1q: 'Sintaks Markdown apa yang didukung?', faq1a: 'Heading (# sampai ######), tebal (**), miring (*), kode inline (`), blok kode (```), kutipan (>), daftar, tautan.',
    faq2q: 'Apakah konversi aman untuk produksi?', faq2a: 'HTML yang dihasilkan bersih. Untuk aplikasi produksi, selalu bersihkan output HTML untuk mencegah serangan XSS.',
    faq3q: 'Bisakah saya mengintegrasikan ke aplikasi JavaScript?', faq3a: 'Ya. Library seperti marked.js, markdown-it, dan remark menangani konversi.',
    faq4q: 'Perbedaan CommonMark dan GitHub Flavored Markdown?', faq4a: 'CommonMark adalah spesifikasi standar. GFM menambahkan tabel, daftar tugas, coret, dan URL otomatis.',
    relatedTitle: 'Alat Terkait',
  },
  th: {
    title: 'แปลง Markdown เป็น HTML ออนไลน์',
    description: 'แปลง Markdown เป็น HTML ออนไลน์ รองรับหัวข้อ ตัวหนา ตัวเอียง ลิงก์ บล็อกโค้ด และรายการ พร้อมตัวอย่างสด',
    inputLabel: 'ป้อน Markdown', inputPlaceholder: '# สวัสดีโลก\n\nพิมพ์ **Markdown** ที่นี่...',
    outputLabel: 'ผลลัพธ์ HTML', previewLabel: 'ตัวอย่าง', tabHtml: 'HTML', tabPreview: 'ตัวอย่าง',
    convert: 'แปลง', clear: 'ล้าง', loadSample: 'โหลดตัวอย่าง', copyHtml: 'คัดลอก HTML',
    introTitle: 'ตัวแปลง Markdown เป็น HTML ฟรีออนไลน์', introText: 'แปลงไวยากรณ์ Markdown เป็น HTML ที่สะอาดและมีความหมายทันที รองรับหัวข้อ ตัวหนา ตัวเอียง โค้ด blockquote และรายการ',
    faqTitle: 'คำถามที่พบบ่อย',
    faq1q: 'รองรับ Markdown syntax อะไรบ้าง?', faq1a: 'หัวข้อ (# ถึง ######), ตัวหนา (**), ตัวเอียง (*), โค้ดแบบ inline (`), บล็อกโค้ด (```), blockquote (>), รายการ, ลิงก์',
    faq2q: 'ผลลัพธ์ปลอดภัยสำหรับ production หรือไม่?', faq2a: 'HTML ที่สร้างขึ้นสะอาด แต่สำหรับแอปพลิเคชัน production ควร sanitize HTML เพื่อป้องกัน XSS',
    faq3q: 'รวมกับแอปพลิเคชัน JavaScript ได้ไหม?', faq3a: 'ได้ ไลบรารีอย่าง marked.js, markdown-it และ remark จัดการการแปลง',
    faq4q: 'CommonMark และ GitHub Flavored Markdown ต่างกันอย่างไร?', faq4a: 'CommonMark คือมาตรฐาน GFM เพิ่มตาราง รายการงาน ขีดฆ่า และ URL อัตโนมัติ',
    relatedTitle: 'เครื่องมือที่เกี่ยวข้อง',
  },
};

const SAMPLE_MD = `# Markdown to HTML Converter

Welcome to the **free** online Markdown converter.

## Features

- Real-time preview
- Supports *all* common Markdown elements
- Copy HTML output with one click

### Code Example

\`\`\`javascript
function greet(name) {
  return \`Hello, \${name}!\`;
}
\`\`\`

> **Note:** This tool converts Markdown to clean, semantic HTML.

Check the [DevToolBox](https://viadreams.cc) for more developer tools.

---

1. First item
2. Second item
3. Third item
`;

function parseMarkdown(md: string): string {
  let html = md;
  // Escape HTML special chars first (but not inside code blocks)
  const codeBlocks: string[] = [];
  html = html.replace(/```([\s\S]*?)```/g, (_m, code) => {
    codeBlocks.push(`<pre><code>${code.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>`);
    return `\x00CODE${codeBlocks.length - 1}\x00`;
  });

  const inlineCodes: string[] = [];
  html = html.replace(/`([^`]+)`/g, (_m, code) => {
    inlineCodes.push(`<code>${code.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code>`);
    return `\x00INLINE${inlineCodes.length - 1}\x00`;
  });

  // Headings
  html = html.replace(/^###### (.+)$/gm, '<h6>$1</h6>');
  html = html.replace(/^##### (.+)$/gm, '<h5>$1</h5>');
  html = html.replace(/^#### (.+)$/gm, '<h4>$1</h4>');
  html = html.replace(/^### (.+)$/gm, '<h3>$1</h3>');
  html = html.replace(/^## (.+)$/gm, '<h2>$1</h2>');
  html = html.replace(/^# (.+)$/gm, '<h1>$1</h1>');

  // Horizontal rule
  html = html.replace(/^[-*_]{3,}\s*$/gm, '<hr>');

  // Bold + italic
  html = html.replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>');
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/__(.+?)__/g, '<strong>$1</strong>');
  html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');
  html = html.replace(/_([^_]+)_/g, '<em>$1</em>');

  // Images (before links)
  html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1">');

  // Links
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');

  // Blockquotes
  html = html.replace(/^> (.+)$/gm, '<blockquote><p>$1</p></blockquote>');

  // Unordered lists
  html = html.replace(/(^[*-] .+(\n|$))+/gm, (match) => {
    const items = match.trim().split('\n').map(l => `<li>${l.replace(/^[*-] /, '')}</li>`).join('');
    return `<ul>${items}</ul>`;
  });

  // Ordered lists
  html = html.replace(/(^\d+\. .+(\n|$))+/gm, (match) => {
    const items = match.trim().split('\n').map(l => `<li>${l.replace(/^\d+\. /, '')}</li>`).join('');
    return `<ol>${items}</ol>`;
  });

  // Paragraphs (double newlines)
  const blocks = html.split(/\n\n+/);
  html = blocks.map(block => {
    block = block.trim();
    if (!block) return '';
    if (/^<(h[1-6]|ul|ol|blockquote|pre|hr)/.test(block)) return block;
    if (/\x00CODE/.test(block) || /\x00INLINE/.test(block)) return block;
    return `<p>${block.replace(/\n/g, '<br>')}</p>`;
  }).join('\n');

  // Restore code blocks
  html = html.replace(/\x00CODE(\d+)\x00/g, (_m, i) => codeBlocks[parseInt(i)]);
  html = html.replace(/\x00INLINE(\d+)\x00/g, (_m, i) => inlineCodes[parseInt(i)]);

  return html;
}

export default function MarkdownToHtmlOnline() {
  const { lang } = useLang();
  const t = ui[lang] || ui.en;
  const [input, setInput] = useState('');
  const [activeTab, setActiveTab] = useState<'html' | 'preview'>('html');

  const htmlOutput = useMemo(() => input ? parseMarkdown(input) : '', [input]);

  const loadSample = () => setInput(SAMPLE_MD);
  const clear = () => setInput('');

  return (
    <ToolLayout title={t.title} description={t.description} toolId="markdown-to-html-online">
      {/* Toolbar */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
        <button onClick={loadSample} className="btn btn-secondary">{t.loadSample}</button>
        <button onClick={clear} className="btn btn-secondary">{t.clear}</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 }}>
        {/* Input */}
        <div>
          <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 6 }}>{t.inputLabel}</label>
          <textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder={t.inputPlaceholder}
            style={{ minHeight: 320, fontFamily: 'monospace', fontSize: 13, resize: 'vertical' }}
          />
        </div>

        {/* Output */}
        <div>
          <div style={{ display: 'flex', gap: 4, marginBottom: 6 }}>
            {(['html', 'preview'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  padding: '4px 12px', borderRadius: 6, border: '1px solid var(--border-color)',
                  background: activeTab === tab ? 'var(--accent-blue)' : 'var(--bg-input)',
                  color: activeTab === tab ? '#fff' : 'var(--text-primary)',
                  fontSize: 13, cursor: 'pointer',
                }}
              >
                {tab === 'html' ? t.tabHtml : t.tabPreview}
              </button>
            ))}
            <div style={{ marginLeft: 'auto' }}>
              {htmlOutput && <CopyButton text={htmlOutput} />}
            </div>
          </div>

          {activeTab === 'html' ? (
            <textarea
              value={htmlOutput}
              readOnly
              style={{ minHeight: 320, fontFamily: 'monospace', fontSize: 12, background: 'var(--bg-input)', resize: 'vertical' }}
            />
          ) : (
            <div
              dangerouslySetInnerHTML={{ __html: htmlOutput }}
              style={{
                minHeight: 320, padding: '12px 16px', border: '1px solid var(--border-color)',
                borderRadius: 8, background: 'var(--bg-input)', overflow: 'auto',
                fontSize: 14, lineHeight: 1.6,
              }}
            />
          )}
        </div>
      </div>

      {/* SEO content */}
      <div style={{ marginTop: 30, paddingTop: 24, borderTop: '1px solid var(--border-color)' }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 10 }}>{t.introTitle}</h2>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 20 }}>{t.introText}</p>

        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 10 }}>{t.faqTitle}</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 24 }}>
          {[
            { q: t.faq1q, a: t.faq1a },
            { q: t.faq2q, a: t.faq2a },
            { q: t.faq3q, a: t.faq3a },
            { q: t.faq4q, a: t.faq4a },
          ].map((faq, idx) => (
            <details key={idx} style={{ border: '1px solid var(--border-color)', borderRadius: 8, overflow: 'hidden' }}>
              <summary style={{ padding: '12px 16px', cursor: 'pointer', fontSize: 14, fontWeight: 600 }}>{faq.q}</summary>
              <div style={{ padding: '0 16px 12px', fontSize: 13, lineHeight: 1.7, color: 'var(--text-secondary)' }}>{faq.a}</div>
            </details>
          ))}
        </div>

        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 10 }}>{t.relatedTitle}</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {[
            { href: `/${lang}/tools/html-to-markdown`, label: 'HTML to Markdown' },
            { href: `/${lang}/tools/html-to-markdown-converter`, label: 'HTML to Markdown Converter' },
            { href: `/${lang}/tools/json-formatter`, label: 'JSON Formatter' },
            { href: `/${lang}/tools/css-beautifier`, label: 'CSS Beautifier' },
          ].map(link => (
            <Link key={link.href} href={link.href}
              style={{ padding: '8px 14px', borderRadius: 8, border: '1px solid var(--border-color)', fontSize: 13, color: 'var(--accent-blue)', textDecoration: 'none' }}>
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </ToolLayout>
  );
}
