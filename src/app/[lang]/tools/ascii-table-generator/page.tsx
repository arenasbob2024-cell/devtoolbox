'use client';

import { useState, useCallback } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import Link from 'next/link';
import { useLang } from '@/i18n/LangContext';

const ui: Record<string, Record<string, string>> = {
  en: {
    title: 'ASCII Table Generator',
    description: 'Generate ASCII art tables from CSV or delimiter-separated input with customizable borders and alignment.',
    inputLabel: 'Input Data (CSV or delimiter-separated)',
    inputPlaceholder: 'Name,Age,City\nAlice,30,New York\nBob,25,London\nCarol,35,Tokyo',
    delimiterLabel: 'Delimiter',
    alignLabel: 'Alignment',
    alignLeft: 'Left', alignCenter: 'Center', alignRight: 'Right',
    styleLabel: 'Border Style',
    styleClassic: 'Classic (+)', styleModern: 'Modern (Unicode)', styleSimple: 'Simple (-)',
    generateBtn: 'Generate Table', clear: 'Clear', loadSample: 'Load Sample',
    outputLabel: 'ASCII Table Output',
    firstRowHeader: 'First row as header',
    introTitle: 'Free Online ASCII Table Generator',
    introText: 'Convert CSV or tabular data into nicely formatted ASCII art tables. Supports multiple delimiter characters, three border styles, and left/center/right text alignment per column. Useful for terminal output, documentation, README files, code comments, and anywhere plain-text tables are needed.',
    tipTitle: 'ASCII Table Tips',
    tip1: 'Use a comma as delimiter for standard CSV files',
    tip2: 'Tab delimiter works well for data copied from spreadsheets',
    tip3: 'Unicode borders look great in modern terminals and Markdown renderers',
    tip4: 'Classic (+) style is compatible with all text editors and terminals',
    tip5: 'Paste your table output directly into README.md or documentation',
    faqTitle: 'Frequently Asked Questions',
    faq1q: 'What is an ASCII table?',
    faq1a: 'An ASCII table uses plain text characters like +, -, and | to draw table borders, creating a structured grid layout that is readable in any text editor or terminal. ASCII tables are commonly used in documentation, code comments, and command-line output.',
    faq2q: 'Which delimiters are supported?',
    faq2a: 'The tool supports comma (,), semicolon (;), tab (\t), and pipe (|) as delimiters. You can select the appropriate delimiter based on your input data format.',
    faq3q: 'How do Unicode borders differ from classic?',
    faq3a: 'Unicode borders use box-drawing characters (like ┌, ─, ┐, │, └, ┘) for a more polished look. Classic borders use standard ASCII characters (+, -, |) which work in all environments. Simple borders use minimal dashes.',
    faq4q: 'Can I generate tables for Markdown?',
    faq4a: 'Yes! The Simple style (-) output is compatible with many Markdown table parsers. You can also use Classic or Unicode styles in code blocks. Copy the output and paste it directly into your Markdown document.',
    faq5q: 'Is there a row or column limit?',
    faq5a: 'The tool handles any reasonable data size in your browser. For very large datasets (hundreds of rows or columns), performance may slow down. For production use with large datasets, consider a server-side solution.',
    relatedTitle: 'Related Tools',
  },
  zh: {
    title: 'ASCII 表格生成器', description: '从 CSV 或分隔符分隔的输入生成 ASCII 艺术表格，可自定义边框和对齐方式。',
    inputLabel: '输入数据（CSV 或分隔符分隔）', inputPlaceholder: '姓名,年龄,城市\n张三,30,北京\n李四,25,上海',
    delimiterLabel: '分隔符', alignLabel: '对齐', alignLeft: '左对齐', alignCenter: '居中', alignRight: '右对齐',
    styleLabel: '边框样式', styleClassic: '经典 (+)', styleModern: '现代（Unicode）', styleSimple: '简单 (-)',
    generateBtn: '生成表格', clear: '清除', loadSample: '加载示例', outputLabel: 'ASCII 表格输出', firstRowHeader: '第一行作为表头',
    introTitle: '免费在线 ASCII 表格生成器', introText: '将 CSV 或表格数据转换为格式化的 ASCII 艺术表格。',
    tipTitle: 'ASCII 表格技巧', tip1: '使用逗号作为标准 CSV 的分隔符', tip2: 'Tab 分隔符适用于电子表格复制的数据',
    tip3: 'Unicode 边框在现代终端效果很好', tip4: '经典 (+) 样式兼容所有文本编辑器', tip5: '可直接粘贴到 README.md 或文档中',
    faqTitle: '常见问题', faq1q: '什么是 ASCII 表格？', faq1a: 'ASCII 表格使用纯文本字符（如 +、- 和 |）绘制表格边框。',
    faq2q: '支持哪些分隔符？', faq2a: '支持逗号、分号、制表符和管道符作为分隔符。',
    faq3q: 'Unicode 边框和经典边框有何不同？', faq3a: 'Unicode 边框使用制表符绘制字符，经典边框使用标准 ASCII 字符。',
    faq4q: '可以为 Markdown 生成表格吗？', faq4a: '是的！简单样式与许多 Markdown 表格解析器兼容。',
    faq5q: '有行数或列数限制吗？', faq5a: '工具在浏览器中处理任何合理大小的数据。',
    relatedTitle: '相关工具',
  },
  fr: {
    title: 'Generateur de Tableaux ASCII', description: 'Generez des tableaux ASCII a partir d\'entrees CSV avec des bordures et un alignement personnalisables.',
    inputLabel: 'Donnees d\'entree (CSV)', inputPlaceholder: 'Nom,Age,Ville\nAlice,30,Paris\nBob,25,Lyon',
    delimiterLabel: 'Separateur', alignLabel: 'Alignement', alignLeft: 'Gauche', alignCenter: 'Centre', alignRight: 'Droite',
    styleLabel: 'Style de bordure', styleClassic: 'Classique (+)', styleModern: 'Moderne (Unicode)', styleSimple: 'Simple (-)',
    generateBtn: 'Generer tableau', clear: 'Effacer', loadSample: 'Charger exemple', outputLabel: 'Tableau ASCII', firstRowHeader: 'Premiere ligne comme en-tete',
    introTitle: 'Generateur de tableaux ASCII gratuit', introText: 'Convertissez des donnees CSV en tableaux ASCII formattes.',
    tipTitle: 'Conseils tableaux ASCII', tip1: 'Utilisez la virgule pour les fichiers CSV standard', tip2: 'Le tabulation fonctionne pour les donnees de tableurs',
    tip3: 'Les bordures Unicode sont belles dans les terminaux modernes', tip4: 'Le style classique est compatible partout', tip5: 'Collez directement dans README.md',
    faqTitle: 'Questions frequentes', faq1q: 'Qu\'est-ce qu\'un tableau ASCII?', faq1a: 'Un tableau ASCII utilise des caracteres texte pour dessiner des bordures.',
    faq2q: 'Quels separateurs sont supportes?', faq2a: 'Virgule, point-virgule, tabulation et pipe.',
    faq3q: 'Comment different les bordures Unicode?', faq3a: 'Unicode utilise des caracteres de dessin de boite.',
    faq4q: 'Puis-je generer des tableaux pour Markdown?', faq4a: 'Oui, le style Simple est compatible avec Markdown.',
    faq5q: 'Y a-t-il une limite de lignes?', faq5a: 'L\'outil gere les donnees raisonnables dans le navigateur.',
    relatedTitle: 'Outils connexes',
  },
  de: {
    title: 'ASCII Tabellen Generator', description: 'ASCII Tabellen aus CSV-Eingaben mit anpassbaren Rahmen und Ausrichtung erstellen.',
    inputLabel: 'Eingabedaten (CSV)', inputPlaceholder: 'Name,Alter,Stadt\nAlice,30,Berlin\nBob,25,Hamburg',
    delimiterLabel: 'Trennzeichen', alignLabel: 'Ausrichtung', alignLeft: 'Links', alignCenter: 'Mitte', alignRight: 'Rechts',
    styleLabel: 'Rahmenstil', styleClassic: 'Klassisch (+)', styleModern: 'Modern (Unicode)', styleSimple: 'Einfach (-)',
    generateBtn: 'Tabelle generieren', clear: 'Loeschen', loadSample: 'Beispiel laden', outputLabel: 'ASCII Tabelle', firstRowHeader: 'Erste Zeile als Kopfzeile',
    introTitle: 'Kostenloser ASCII Tabellen-Generator', introText: 'Konvertieren Sie CSV-Daten in formatierte ASCII-Tabellen.',
    tipTitle: 'ASCII Tabellen Tipps', tip1: 'Komma als Trennzeichen fuer Standard-CSV', tip2: 'Tab fuer Tabellenkalkulations-Daten',
    tip3: 'Unicode-Rahmen sehen in modernen Terminals gut aus', tip4: 'Klassischer Stil ueberall kompatibel', tip5: 'Direkt in README.md einfuegen',
    faqTitle: 'Haeufig gestellte Fragen', faq1q: 'Was ist eine ASCII-Tabelle?', faq1a: 'Eine ASCII-Tabelle verwendet Textzeichen zum Zeichnen von Raendern.',
    faq2q: 'Welche Trennzeichen werden unterstuetzt?', faq2a: 'Komma, Semikolon, Tabulator und Pipe.',
    faq3q: 'Wie unterscheiden sich Unicode-Rahmen?', faq3a: 'Unicode verwendet Box-Zeichen.',
    faq4q: 'Kann ich Tabellen fuer Markdown generieren?', faq4a: 'Ja, Simple-Stil ist mit Markdown kompatibel.',
    faq5q: 'Gibt es eine Zeilenbegrenzung?', faq5a: 'Das Tool verarbeitet angemessene Daten im Browser.',
    relatedTitle: 'Verwandte Tools',
  },
  es: {
    title: 'Generador de Tablas ASCII', description: 'Genera tablas ASCII desde entrada CSV con bordes y alineacion personalizables.',
    inputLabel: 'Datos de entrada (CSV)', inputPlaceholder: 'Nombre,Edad,Ciudad\nAlice,30,Madrid\nBob,25,Barcelona',
    delimiterLabel: 'Delimitador', alignLabel: 'Alineacion', alignLeft: 'Izquierda', alignCenter: 'Centro', alignRight: 'Derecha',
    styleLabel: 'Estilo de borde', styleClassic: 'Clasico (+)', styleModern: 'Moderno (Unicode)', styleSimple: 'Simple (-)',
    generateBtn: 'Generar tabla', clear: 'Limpiar', loadSample: 'Cargar ejemplo', outputLabel: 'Tabla ASCII', firstRowHeader: 'Primera fila como encabezado',
    introTitle: 'Generador de tablas ASCII gratuito', introText: 'Convierte datos CSV en tablas ASCII formateadas.',
    tipTitle: 'Consejos de tablas ASCII', tip1: 'Usa coma para archivos CSV estandar', tip2: 'Tab para datos de hojas de calculo',
    tip3: 'Bordes Unicode lucen bien en terminales modernas', tip4: 'Estilo clasico compatible en todos lados', tip5: 'Pega directamente en README.md',
    faqTitle: 'Preguntas frecuentes', faq1q: 'Que es una tabla ASCII?', faq1a: 'Una tabla ASCII usa caracteres de texto para dibujar bordes.',
    faq2q: 'Que delimitadores se soportan?', faq2a: 'Coma, punto y coma, tabulador y barra vertical.',
    faq3q: 'Como difieren los bordes Unicode?', faq3a: 'Unicode usa caracteres de dibujo de cuadros.',
    faq4q: 'Puedo generar tablas para Markdown?', faq4a: 'Si, el estilo Simple es compatible con Markdown.',
    faq5q: 'Hay limite de filas?', faq5a: 'La herramienta maneja datos razonables en el navegador.',
    relatedTitle: 'Herramientas relacionadas',
  },
  pt: {
    title: 'Gerador de Tabelas ASCII', description: 'Gera tabelas ASCII de entrada CSV com bordas e alinhamento personalizaveis.',
    inputLabel: 'Dados de entrada (CSV)', inputPlaceholder: 'Nome,Idade,Cidade\nAlice,30,Lisboa\nBob,25,Porto',
    delimiterLabel: 'Delimitador', alignLabel: 'Alinhamento', alignLeft: 'Esquerda', alignCenter: 'Centro', alignRight: 'Direita',
    styleLabel: 'Estilo de borda', styleClassic: 'Classico (+)', styleModern: 'Moderno (Unicode)', styleSimple: 'Simples (-)',
    generateBtn: 'Gerar tabela', clear: 'Limpar', loadSample: 'Carregar exemplo', outputLabel: 'Tabela ASCII', firstRowHeader: 'Primeira linha como cabecalho',
    introTitle: 'Gerador de tabelas ASCII gratuito', introText: 'Converta dados CSV em tabelas ASCII formatadas.',
    tipTitle: 'Dicas de tabelas ASCII', tip1: 'Use virgula para arquivos CSV padrao', tip2: 'Tab para dados de planilhas',
    tip3: 'Bordas Unicode ficam otimas em terminais modernos', tip4: 'Estilo classico compativel em todos os lugares', tip5: 'Cole diretamente no README.md',
    faqTitle: 'Perguntas frequentes', faq1q: 'O que e uma tabela ASCII?', faq1a: 'Uma tabela ASCII usa caracteres de texto para desenhar bordas.',
    faq2q: 'Quais delimitadores sao suportados?', faq2a: 'Virgula, ponto e virgula, tabulacao e barra vertical.',
    faq3q: 'Como as bordas Unicode diferem?', faq3a: 'Unicode usa caracteres de desenho de caixa.',
    faq4q: 'Posso gerar tabelas para Markdown?', faq4a: 'Sim, o estilo Simples e compativel com Markdown.',
    faq5q: 'Ha limite de linhas?', faq5a: 'A ferramenta lida com dados razoaveis no navegador.',
    relatedTitle: 'Ferramentas relacionadas',
  },
  it: {
    title: 'Generatore di Tabelle ASCII', description: 'Genera tabelle ASCII da input CSV con bordi e allineamento personalizzabili.',
    inputLabel: 'Dati di input (CSV)', inputPlaceholder: 'Nome,Eta,Citta\nAlice,30,Roma\nBob,25,Milano',
    delimiterLabel: 'Delimitatore', alignLabel: 'Allineamento', alignLeft: 'Sinistra', alignCenter: 'Centro', alignRight: 'Destra',
    styleLabel: 'Stile bordo', styleClassic: 'Classico (+)', styleModern: 'Moderno (Unicode)', styleSimple: 'Semplice (-)',
    generateBtn: 'Genera tabella', clear: 'Cancella', loadSample: 'Carica esempio', outputLabel: 'Tabella ASCII', firstRowHeader: 'Prima riga come intestazione',
    introTitle: 'Generatore di tabelle ASCII gratuito', introText: 'Converti dati CSV in tabelle ASCII formattate.',
    tipTitle: 'Suggerimenti tabelle ASCII', tip1: 'Usa la virgola per file CSV standard', tip2: 'Tab per dati da fogli di calcolo',
    tip3: 'I bordi Unicode sembrano ottimi nei terminali moderni', tip4: 'Lo stile classico e compatibile ovunque', tip5: 'Incolla direttamente in README.md',
    faqTitle: 'Domande frequenti', faq1q: 'Cos\'e una tabella ASCII?', faq1a: 'Una tabella ASCII usa caratteri di testo per disegnare bordi.',
    faq2q: 'Quali delimitatori sono supportati?', faq2a: 'Virgola, punto e virgola, tabulazione e pipe.',
    faq3q: 'Come differiscono i bordi Unicode?', faq3a: 'Unicode usa caratteri di disegno di box.',
    faq4q: 'Posso generare tabelle per Markdown?', faq4a: 'Si, lo stile Semplice e compatibile con Markdown.',
    faq5q: 'C\'e un limite di righe?', faq5a: 'Lo strumento gestisce dati ragionevoli nel browser.',
    relatedTitle: 'Strumenti correlati',
  },
  nl: {
    title: 'ASCII Tabelgenerator', description: 'Genereer ASCII-tabellen van CSV-invoer met aanpasbare randen en uitlijning.',
    inputLabel: 'Invoergegevens (CSV)', inputPlaceholder: 'Naam,Leeftijd,Stad\nAlice,30,Amsterdam\nBob,25,Rotterdam',
    delimiterLabel: 'Scheidingsteken', alignLabel: 'Uitlijning', alignLeft: 'Links', alignCenter: 'Midden', alignRight: 'Rechts',
    styleLabel: 'Randstijl', styleClassic: 'Klassiek (+)', styleModern: 'Modern (Unicode)', styleSimple: 'Eenvoudig (-)',
    generateBtn: 'Tabel genereren', clear: 'Wissen', loadSample: 'Voorbeeld laden', outputLabel: 'ASCII Tabel', firstRowHeader: 'Eerste rij als koptekst',
    introTitle: 'Gratis ASCII tabelgenerator', introText: 'Converteer CSV-gegevens naar geformatteerde ASCII-tabellen.',
    tipTitle: 'ASCII tabel tips', tip1: 'Gebruik komma voor standaard CSV-bestanden', tip2: 'Tab voor gekopieerde spreadsheetgegevens',
    tip3: 'Unicode-randen zien er geweldig uit in moderne terminals', tip4: 'Klassieke stijl overal compatibel', tip5: 'Plak direct in README.md',
    faqTitle: 'Veelgestelde vragen', faq1q: 'Wat is een ASCII-tabel?', faq1a: 'Een ASCII-tabel gebruikt teksttekens om tabelranden te tekenen.',
    faq2q: 'Welke scheidingstekens worden ondersteund?', faq2a: 'Komma, puntkomma, tab en pipe.',
    faq3q: 'Hoe verschillen Unicode-randen?', faq3a: 'Unicode gebruikt box-tekentekens.',
    faq4q: 'Kan ik tabellen voor Markdown genereren?', faq4a: 'Ja, de eenvoudige stijl is compatibel met Markdown.',
    faq5q: 'Is er een rijlimiet?', faq5a: 'Het hulpmiddel verwerkt redelijke gegevens in de browser.',
    relatedTitle: 'Gerelateerde tools',
  },
  pl: {
    title: 'Generator Tabel ASCII', description: 'Generuj tabele ASCII z wejscia CSV z konfigurowalnymi obramowaniami i wyrownaniem.',
    inputLabel: 'Dane wejsciowe (CSV)', inputPlaceholder: 'Imie,Wiek,Miasto\nAlicja,30,Warszawa\nBob,25,Krakow',
    delimiterLabel: 'Separator', alignLabel: 'Wyrownanie', alignLeft: 'Lewo', alignCenter: 'Srodek', alignRight: 'Prawo',
    styleLabel: 'Styl obramowania', styleClassic: 'Klasyczny (+)', styleModern: 'Nowoczesny (Unicode)', styleSimple: 'Prosty (-)',
    generateBtn: 'Generuj tabele', clear: 'Wyczysc', loadSample: 'Zaladuj przyklad', outputLabel: 'Tabela ASCII', firstRowHeader: 'Pierwszy wiersz jako naglowek',
    introTitle: 'Darmowy generator tabel ASCII', introText: 'Konwertuj dane CSV na sformatowane tabele ASCII.',
    tipTitle: 'Wskazowki dotyczace tabel ASCII', tip1: 'Uzyj przecinka dla standardowych plikow CSV', tip2: 'Tab dla danych ze skoroszytow',
    tip3: 'Obramowania Unicode wygladaja swietnie w nowoczesnych terminalach', tip4: 'Styl klasyczny kompatybilny wszedzie', tip5: 'Wklej bezposrednio do README.md',
    faqTitle: 'Czesto zadawane pytania', faq1q: 'Co to jest tabela ASCII?', faq1a: 'Tabela ASCII uzywa znakow tekstowych do rysowania ramek.',
    faq2q: 'Jakie separatory sa obslugiwane?', faq2a: 'Przecinek, srednik, tabulator i pipe.',
    faq3q: 'Jak roznia sie obramowania Unicode?', faq3a: 'Unicode uzywa znakow do rysowania skrzynek.',
    faq4q: 'Czy moge generowac tabele dla Markdown?', faq4a: 'Tak, styl prosty jest kompatybilny z Markdown.',
    faq5q: 'Czy istnieje limit wierszy?', faq5a: 'Narzedzie obsluguje rozsdane dane w przegladarce.',
    relatedTitle: 'Powiazane narzedzia',
  },
  sv: {
    title: 'ASCII Tabellgenerator', description: 'Generera ASCII-tabeller fran CSV-inmatning med anpassningsbara ramar och justering.',
    inputLabel: 'Indata (CSV)', inputPlaceholder: 'Namn,Alder,Stad\nAlice,30,Stockholm\nBob,25,Goteborg',
    delimiterLabel: 'Avgransare', alignLabel: 'Justering', alignLeft: 'Vanster', alignCenter: 'Mitten', alignRight: 'Hoeger',
    styleLabel: 'Ramstil', styleClassic: 'Klassisk (+)', styleModern: 'Modern (Unicode)', styleSimple: 'Enkel (-)',
    generateBtn: 'Generera tabell', clear: 'Rensa', loadSample: 'Ladda exempel', outputLabel: 'ASCII Tabell', firstRowHeader: 'Forsta raden som rubrik',
    introTitle: 'Gratis ASCII tabellgenerator', introText: 'Konvertera CSV-data till formaterade ASCII-tabeller.',
    tipTitle: 'ASCII tabells tips', tip1: 'Anvand komma for standard CSV-filer', tip2: 'Tab for kalkylbladsdata',
    tip3: 'Unicode-ramar ser bra ut i moderna terminaler', tip4: 'Klassisk stil kompatibel overallt', tip5: 'Klistra in direkt i README.md',
    faqTitle: 'Vanliga fragor', faq1q: 'Vad ar en ASCII-tabell?', faq1a: 'En ASCII-tabell anvander texttecken for att rita tabellramar.',
    faq2q: 'Vilka avgransare stods?', faq2a: 'Komma, semikolon, tab och pipe.',
    faq3q: 'Hur skiljer sig Unicode-ramar?', faq3a: 'Unicode anvander box-ritande tecken.',
    faq4q: 'Kan jag generera tabeller for Markdown?', faq4a: 'Ja, enkel stil ar kompatibel med Markdown.',
    faq5q: 'Finns det en radgrans?', faq5a: 'Verktyget hanterar rimliga data i webblaesaren.',
    relatedTitle: 'Relaterade verktyg',
  },
  no: {
    title: 'ASCII Tabellgenerator', description: 'Generer ASCII-tabeller fra CSV-inndata med tilpassbare rammer og justering.',
    inputLabel: 'Inndata (CSV)', inputPlaceholder: 'Navn,Alder,By\nAlice,30,Oslo\nBob,25,Bergen',
    delimiterLabel: 'Avgrenser', alignLabel: 'Justering', alignLeft: 'Venstre', alignCenter: 'Midt', alignRight: 'Hoyre',
    styleLabel: 'Rammestil', styleClassic: 'Klassisk (+)', styleModern: 'Moderne (Unicode)', styleSimple: 'Enkel (-)',
    generateBtn: 'Generer tabell', clear: 'Toemme', loadSample: 'Last eksempel', outputLabel: 'ASCII Tabell', firstRowHeader: 'Forste rad som overskrift',
    introTitle: 'Gratis ASCII tabellgenerator', introText: 'Konverter CSV-data til formaterte ASCII-tabeller.',
    tipTitle: 'ASCII tabell tips', tip1: 'Bruk komma for standard CSV-filer', tip2: 'Tab for regnearkdata',
    tip3: 'Unicode-rammer ser bra ut i moderne terminaler', tip4: 'Klassisk stil kompatibel overalt', tip5: 'Lim direkte inn i README.md',
    faqTitle: 'Vanlige spoersmaal', faq1q: 'Hva er en ASCII-tabell?', faq1a: 'En ASCII-tabell bruker teksttegn for aa tegne tabellerammer.',
    faq2q: 'Hvilke avgensere stoettes?', faq2a: 'Komma, semikolon, tab og pipe.',
    faq3q: 'Hvordan skiller Unicode-rammer seg?', faq3a: 'Unicode bruker boks-tegningstegn.',
    faq4q: 'Kan jeg generere tabeller for Markdown?', faq4a: 'Ja, enkel stil er kompatibel med Markdown.',
    faq5q: 'Er det en radgrense?', faq5a: 'Verktoeyet haandterer rimelige data i nettleseren.',
    relatedTitle: 'Relaterte verktoy',
  },
  ja: {
    title: 'ASCII テーブルジェネレーター', description: 'CSV 入力からカスタマイズ可能な枠線と整列を持つ ASCII テーブルを生成します。',
    inputLabel: '入力データ (CSV)', inputPlaceholder: '名前,年齢,都市\nアリス,30,東京\nボブ,25,大阪',
    delimiterLabel: '区切り文字', alignLabel: '整列', alignLeft: '左', alignCenter: '中央', alignRight: '右',
    styleLabel: '枠線スタイル', styleClassic: 'クラシック (+)', styleModern: 'モダン (Unicode)', styleSimple: 'シンプル (-)',
    generateBtn: 'テーブル生成', clear: 'クリア', loadSample: 'サンプル読込', outputLabel: 'ASCII テーブル出力', firstRowHeader: '最初の行をヘッダーとして使用',
    introTitle: '無料 ASCII テーブルジェネレーター', introText: 'CSV データをフォーマットされた ASCII テーブルに変換します。',
    tipTitle: 'ASCII テーブルのヒント', tip1: '標準 CSV にはカンマ区切りを使用', tip2: 'スプレッドシートのデータにはタブを使用',
    tip3: 'Unicode 枠線は現代のターミナルで映える', tip4: 'クラシックスタイルはどこでも互換性あり', tip5: 'README.md に直接貼り付け可能',
    faqTitle: 'よくある質問', faq1q: 'ASCII テーブルとは？', faq1a: 'ASCII テーブルはテキスト文字を使用してテーブルの枠を描きます。',
    faq2q: 'どの区切り文字がサポートされていますか？', faq2a: 'カンマ、セミコロン、タブ、パイプ。',
    faq3q: 'Unicode 枠線はどう違いますか？', faq3a: 'Unicode はボックス描画文字を使用します。',
    faq4q: 'Markdown 用のテーブルを生成できますか？', faq4a: 'はい、シンプルスタイルは Markdown と互換性があります。',
    faq5q: '行数の制限はありますか？', faq5a: 'ツールはブラウザで合理的なデータを処理します。',
    relatedTitle: '関連ツール',
  },
  ko: {
    title: 'ASCII 테이블 생성기', description: 'CSV 입력에서 사용자 정의 가능한 테두리와 정렬로 ASCII 테이블을 생성합니다.',
    inputLabel: '입력 데이터 (CSV)', inputPlaceholder: '이름,나이,도시\n앨리스,30,서울\n밥,25,부산',
    delimiterLabel: '구분자', alignLabel: '정렬', alignLeft: '왼쪽', alignCenter: '가운데', alignRight: '오른쪽',
    styleLabel: '테두리 스타일', styleClassic: '클래식 (+)', styleModern: '모던 (유니코드)', styleSimple: '단순 (-)',
    generateBtn: '테이블 생성', clear: '지우기', loadSample: '샘플 로드', outputLabel: 'ASCII 테이블 출력', firstRowHeader: '첫 번째 행을 헤더로 사용',
    introTitle: '무료 ASCII 테이블 생성기', introText: 'CSV 데이터를 형식화된 ASCII 테이블로 변환합니다.',
    tipTitle: 'ASCII 테이블 팁', tip1: '표준 CSV에는 쉼표를 구분자로 사용', tip2: '스프레드시트 데이터에는 탭을 사용',
    tip3: '유니코드 테두리는 최신 터미널에서 멋져 보임', tip4: '클래식 스타일은 어디서나 호환', tip5: '직접 README.md에 붙여넣기 가능',
    faqTitle: '자주 묻는 질문', faq1q: 'ASCII 테이블이란?', faq1a: 'ASCII 테이블은 텍스트 문자를 사용하여 테이블 테두리를 그립니다.',
    faq2q: '어떤 구분자가 지원되나요?', faq2a: '쉼표, 세미콜론, 탭, 파이프.',
    faq3q: '유니코드 테두리는 어떻게 다른가요?', faq3a: '유니코드는 박스 그리기 문자를 사용합니다.',
    faq4q: 'Markdown용 테이블을 생성할 수 있나요?', faq4a: '네, 단순 스타일은 Markdown과 호환됩니다.',
    faq5q: '행 제한이 있나요?', faq5a: '도구는 브라우저에서 적절한 데이터를 처리합니다.',
    relatedTitle: '관련 도구',
  },
  id: {
    title: 'Generator Tabel ASCII', description: 'Hasilkan tabel ASCII dari input CSV dengan batas dan penyelarasan yang dapat disesuaikan.',
    inputLabel: 'Data masukan (CSV)', inputPlaceholder: 'Nama,Usia,Kota\nAlice,30,Jakarta\nBob,25,Bandung',
    delimiterLabel: 'Pemisah', alignLabel: 'Penyelarasan', alignLeft: 'Kiri', alignCenter: 'Tengah', alignRight: 'Kanan',
    styleLabel: 'Gaya batas', styleClassic: 'Klasik (+)', styleModern: 'Modern (Unicode)', styleSimple: 'Sederhana (-)',
    generateBtn: 'Buat tabel', clear: 'Hapus', loadSample: 'Muat contoh', outputLabel: 'Output Tabel ASCII', firstRowHeader: 'Baris pertama sebagai header',
    introTitle: 'Generator tabel ASCII gratis', introText: 'Konversi data CSV menjadi tabel ASCII yang diformat.',
    tipTitle: 'Tips tabel ASCII', tip1: 'Gunakan koma untuk file CSV standar', tip2: 'Tab untuk data spreadsheet',
    tip3: 'Batas Unicode terlihat bagus di terminal modern', tip4: 'Gaya klasik kompatibel di mana saja', tip5: 'Tempel langsung ke README.md',
    faqTitle: 'Pertanyaan yang Sering Diajukan', faq1q: 'Apa itu tabel ASCII?', faq1a: 'Tabel ASCII menggunakan karakter teks untuk menggambar batas tabel.',
    faq2q: 'Pemisah apa yang didukung?', faq2a: 'Koma, titik koma, tab, dan pipe.',
    faq3q: 'Bagaimana perbedaan batas Unicode?', faq3a: 'Unicode menggunakan karakter gambar kotak.',
    faq4q: 'Bisakah saya membuat tabel untuk Markdown?', faq4a: 'Ya, gaya sederhana kompatibel dengan Markdown.',
    faq5q: 'Apakah ada batas baris?', faq5a: 'Alat menangani data yang wajar di browser.',
    relatedTitle: 'Alat terkait',
  },
  th: {
    title: 'เครื่องมือสร้างตาราง ASCII', description: 'สร้างตาราง ASCII จากอินพุต CSV ด้วยขอบและการจัดตำแหน่งที่กำหนดเอง',
    inputLabel: 'ข้อมูลอินพุต (CSV)', inputPlaceholder: 'ชื่อ,อายุ,เมือง\nอลิซ,30,กรุงเทพ\nบ็อบ,25,เชียงใหม่',
    delimiterLabel: 'ตัวคั่น', alignLabel: 'การจัดตำแหน่ง', alignLeft: 'ซ้าย', alignCenter: 'กลาง', alignRight: 'ขวา',
    styleLabel: 'สไตล์ขอบ', styleClassic: 'คลาสสิค (+)', styleModern: 'ทันสมัย (Unicode)', styleSimple: 'เรียบง่าย (-)',
    generateBtn: 'สร้างตาราง', clear: 'ล้าง', loadSample: 'โหลดตัวอย่าง', outputLabel: 'ผลลัพธ์ตาราง ASCII', firstRowHeader: 'แถวแรกเป็นส่วนหัว',
    introTitle: 'เครื่องมือสร้างตาราง ASCII ฟรี', introText: 'แปลงข้อมูล CSV เป็นตาราง ASCII ที่จัดรูปแบบแล้ว',
    tipTitle: 'เคล็ดลับตาราง ASCII', tip1: 'ใช้จุลภาคสำหรับไฟล์ CSV มาตรฐาน', tip2: 'Tab สำหรับข้อมูลสเปรดชีต',
    tip3: 'ขอบ Unicode ดูดีในเทอร์มินัลสมัยใหม่', tip4: 'สไตล์คลาสสิคเข้ากันได้ทุกที่', tip5: 'วางลงใน README.md ได้โดยตรง',
    faqTitle: 'คำถามที่พบบ่อย', faq1q: 'ตาราง ASCII คืออะไร?', faq1a: 'ตาราง ASCII ใช้อักขระข้อความเพื่อวาดขอบตาราง',
    faq2q: 'รองรับตัวคั่นใดบ้าง?', faq2a: 'จุลภาค เซมิโคลอน แท็บ และไปป์',
    faq3q: 'ขอบ Unicode ต่างกันอย่างไร?', faq3a: 'Unicode ใช้อักขระวาดกล่อง',
    faq4q: 'ฉันสามารถสร้างตารางสำหรับ Markdown ได้ไหม?', faq4a: 'ได้ สไตล์เรียบง่ายเข้ากันได้กับ Markdown',
    faq5q: 'มีขีดจำกัดแถวหรือไม่?', faq5a: 'เครื่องมือจัดการข้อมูลที่สมเหตุสมผลในเบราว์เซอร์',
    relatedTitle: 'เครื่องมือที่เกี่ยวข้อง',
  },
};

const SAMPLE = `Name,Age,City,Role\nAlice,30,New York,Engineer\nBob,25,London,Designer\nCarol,35,Tokyo,Manager\nDave,28,Sydney,Developer`;

type BorderStyle = 'classic' | 'modern' | 'simple';
type Alignment = 'left' | 'center' | 'right';

function buildAsciiTable(rows: string[][], hasHeader: boolean, align: Alignment, style: BorderStyle): string {
  if (rows.length === 0) return '';
  const colCount = Math.max(...rows.map(r => r.length));
  const widths: number[] = Array(colCount).fill(0);
  rows.forEach(row => {
    row.forEach((cell, i) => {
      widths[i] = Math.max(widths[i] || 0, cell.length + 2);
    });
  });

  const pad = (text: string, width: number): string => {
    const padded = text.length >= width - 2 ? text : text;
    if (align === 'left') return ' ' + padded.padEnd(width - 2) + ' ';
    if (align === 'right') return ' ' + padded.padStart(width - 2) + ' ';
    const total = width - 2 - padded.length;
    const left = Math.floor(total / 2);
    const right = total - left;
    return ' ' + ' '.repeat(left) + padded + ' '.repeat(right) + ' ';
  };

  if (style === 'classic') {
    const sep = '+' + widths.map(w => '-'.repeat(w)).join('+') + '+';
    const row = (r: string[]) => '|' + widths.map((w, i) => pad(r[i] || '', w)).join('|') + '|';
    const lines: string[] = [sep];
    rows.forEach((r, idx) => {
      lines.push(row(r));
      if (hasHeader && idx === 0) lines.push(sep);
    });
    lines.push(sep);
    return lines.join('\n');
  }

  if (style === 'modern') {
    const topBorder = '\u250c' + widths.map(w => '\u2500'.repeat(w)).join('\u252c') + '\u2510';
    const midBorder = '\u251c' + widths.map(w => '\u2500'.repeat(w)).join('\u253c') + '\u2524';
    const botBorder = '\u2514' + widths.map(w => '\u2500'.repeat(w)).join('\u2534') + '\u2518';
    const row = (r: string[]) => '\u2502' + widths.map((w, i) => pad(r[i] || '', w)).join('\u2502') + '\u2502';
    const lines: string[] = [topBorder];
    rows.forEach((r, idx) => {
      lines.push(row(r));
      if (hasHeader && idx === 0) lines.push(midBorder);
    });
    lines.push(botBorder);
    return lines.join('\n');
  }

  // simple
  const sep = widths.map(w => '-'.repeat(w)).join(' ');
  const row = (r: string[]) => widths.map((w, i) => pad(r[i] || '', w).trim().padEnd(w - 2)).join('  ');
  const lines: string[] = [];
  rows.forEach((r, idx) => {
    lines.push(row(r));
    if (hasHeader && idx === 0) lines.push(sep);
  });
  return lines.join('\n');
}

export default function AsciiTableGenerator() {
  const { lang } = useLang();
  const t = ui[lang] || ui.en;
  const [input, setInput] = useState('');
  const [delimiter, setDelimiter] = useState(',');
  const [align, setAlign] = useState<Alignment>('left');
  const [style, setStyle] = useState<BorderStyle>('classic');
  const [hasHeader, setHasHeader] = useState(true);
  const [output, setOutput] = useState('');

  const generate = useCallback(() => {
    const lines = input.trim().split('\n');
    const rows = lines.map(line => line.split(delimiter === '\\t' ? '\t' : delimiter));
    setOutput(buildAsciiTable(rows, hasHeader, align, style));
  }, [input, delimiter, align, style, hasHeader]);

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: t.faq1q, acceptedAnswer: { '@type': 'Answer', text: t.faq1a } },
      { '@type': 'Question', name: t.faq2q, acceptedAnswer: { '@type': 'Answer', text: t.faq2a } },
      { '@type': 'Question', name: t.faq3q, acceptedAnswer: { '@type': 'Answer', text: t.faq3a } },
      { '@type': 'Question', name: t.faq4q, acceptedAnswer: { '@type': 'Answer', text: t.faq4a } },
      { '@type': 'Question', name: t.faq5q, acceptedAnswer: { '@type': 'Answer', text: t.faq5a } },
    ],
  };

  return (
    <ToolLayout title={t.title} description={t.description} toolId="ascii-table-generator">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap', alignItems: 'center' }}>
        <button onClick={generate} className="btn btn-primary">{t.generateBtn}</button>
        <button onClick={() => { setInput(SAMPLE); }} className="btn btn-secondary">{t.loadSample}</button>
        <button onClick={() => { setInput(''); setOutput(''); }} className="btn btn-secondary">{t.clear}</button>

        <select value={delimiter} onChange={e => setDelimiter(e.target.value)} style={{ fontSize: 13, padding: '6px 10px', borderRadius: 6, border: '1px solid var(--border-color)', background: 'var(--bg-input)', color: 'var(--text-primary)' }}>
          <option value=",">, (comma)</option>
          <option value=";">; (semicolon)</option>
          <option value="\t">Tab</option>
          <option value="|">| (pipe)</option>
        </select>

        <select value={align} onChange={e => setAlign(e.target.value as Alignment)} style={{ fontSize: 13, padding: '6px 10px', borderRadius: 6, border: '1px solid var(--border-color)', background: 'var(--bg-input)', color: 'var(--text-primary)' }}>
          <option value="left">{t.alignLeft}</option>
          <option value="center">{t.alignCenter}</option>
          <option value="right">{t.alignRight}</option>
        </select>

        <select value={style} onChange={e => setStyle(e.target.value as BorderStyle)} style={{ fontSize: 13, padding: '6px 10px', borderRadius: 6, border: '1px solid var(--border-color)', background: 'var(--bg-input)', color: 'var(--text-primary)' }}>
          <option value="classic">{t.styleClassic}</option>
          <option value="modern">{t.styleModern}</option>
          <option value="simple">{t.styleSimple}</option>
        </select>

        <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, cursor: 'pointer' }}>
          <input type="checkbox" checked={hasHeader} onChange={e => setHasHeader(e.target.checked)} />
          {t.firstRowHeader}
        </label>
      </div>

      <div style={{ marginBottom: 16 }}>
        <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 6 }}>{t.inputLabel}</label>
        <textarea value={input} onChange={e => setInput(e.target.value)} placeholder={t.inputPlaceholder} style={{ minHeight: 150, fontFamily: 'monospace', fontSize: 13 }} />
      </div>

      {output && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
            <label style={{ fontSize: 13, fontWeight: 600 }}>{t.outputLabel}</label>
            <CopyButton text={output} />
          </div>
          <pre style={{ background: 'var(--bg-input)', border: '1px solid var(--border-color)', borderRadius: 8, padding: 16, overflowX: 'auto', fontSize: 13, lineHeight: 1.5, color: 'var(--text-primary)', margin: 0 }}>{output}</pre>
        </div>
      )}

      <div style={{ marginTop: 30, paddingTop: 24, borderTop: '1px solid var(--border-color)' }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 12 }}>{t.introTitle}</h2>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 20 }}>{t.introText}</p>
        <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{t.tipTitle}</h3>
        <ul style={{ paddingLeft: 20, marginBottom: 24, fontSize: 13, lineHeight: 2, color: 'var(--text-secondary)' }}>
          <li>{t.tip1}</li><li>{t.tip2}</li><li>{t.tip3}</li><li>{t.tip4}</li><li>{t.tip5}</li>
        </ul>
        <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{t.faqTitle}</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 24 }}>
          {[{ q: t.faq1q, a: t.faq1a }, { q: t.faq2q, a: t.faq2a }, { q: t.faq3q, a: t.faq3a }, { q: t.faq4q, a: t.faq4a }, { q: t.faq5q, a: t.faq5a }].map((faq, idx) => (
            <details key={idx} style={{ border: '1px solid var(--border-color)', borderRadius: 8, overflow: 'hidden', background: 'var(--bg-input)' }}>
              <summary style={{ padding: '14px 16px', cursor: 'pointer', fontSize: 14, fontWeight: 600 }}>{faq.q}</summary>
              <div style={{ padding: '0 16px 14px', fontSize: 13, lineHeight: 1.7, color: 'var(--text-secondary)' }}>{faq.a}</div>
            </details>
          ))}
        </div>
        <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{t.relatedTitle}</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {[
            { href: `/${lang}/tools/html-table`, label: 'HTML Table Generator' },
            { href: `/${lang}/tools/csv-json`, label: 'CSV to JSON Converter' },
            { href: `/${lang}/tools/ascii-art`, label: 'ASCII Art Generator' },
            { href: `/${lang}/tools/markdown-link-checker`, label: 'Markdown Link Checker' },
          ].map(link => (
            <Link key={link.href} href={link.href} style={{ display: 'inline-block', padding: '8px 16px', borderRadius: 8, border: '1px solid var(--border-color)', fontSize: 13, color: 'var(--accent-blue)', textDecoration: 'none', background: 'var(--bg-input)' }}>
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </ToolLayout>
  );
}
