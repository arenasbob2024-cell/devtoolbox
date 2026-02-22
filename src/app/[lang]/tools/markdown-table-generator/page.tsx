'use client';

import { useState, useCallback } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import { useLang } from '@/i18n/LangContext';

const ui: Record<string, Record<string, string>> = {
  en: {
    title: 'Markdown Table Generator',
    description: 'Create and edit Markdown tables visually. Add rows and columns, set alignment, and copy the formatted table syntax instantly.',
    rows: 'Rows', cols: 'Columns', addRow: 'Add Row', addCol: 'Add Column',
    removeRow: 'Remove Row', removeCol: 'Remove Col',
    alignment: 'Column Alignment', alignLeft: 'Left', alignCenter: 'Center', alignRight: 'Right',
    output: 'Markdown Output', preview: 'Preview', editor: 'Editor',
    loadSample: 'Load Sample', clear: 'Clear', copy: 'Copy Markdown',
    introTitle: 'Free Online Markdown Table Generator',
    introText: 'Generate properly formatted Markdown tables with ease. Edit cells directly in the visual editor, choose column alignment, and instantly get the correct Markdown table syntax. Perfect for README files, documentation, and GitHub wikis.',
    faqTitle: 'Frequently Asked Questions',
    faq1q: 'What is a Markdown table?',
    faq1a: 'A Markdown table is a way to display data in rows and columns using plain text. It uses pipe (|) characters to separate columns and hyphens (-) to create the header separator. Markdown tables are widely supported in GitHub, GitLab, Jupyter notebooks, and many documentation tools.',
    faq2q: 'How do I align columns in a Markdown table?',
    faq2a: 'Column alignment is controlled by the separator row. Use :--- for left alignment, :---: for center alignment, and ---: for right alignment. The colons indicate the alignment direction.',
    faq3q: 'Can I use Markdown formatting inside table cells?',
    faq3a: 'Yes, most Markdown parsers support inline formatting inside table cells, including bold (**text**), italic (*text*), inline code (`code`), and links ([text](url)). However, block-level elements like headings and lists are not supported inside cells.',
    faq4q: 'Where can I use Markdown tables?',
    faq4a: 'Markdown tables work in GitHub README files, GitLab wikis, Jupyter notebooks, documentation tools like MkDocs and Docusaurus, Slack messages, Discord, Notion, and many other platforms that support GitHub Flavored Markdown (GFM).',
    faq5q: 'Is there a limit to table size?',
    faq5a: 'There is no technical limit in the Markdown spec, but very large tables can become hard to read in plain text. For large datasets, consider using HTML tables or a database/spreadsheet tool instead.',
  },
  fr: {
    title: 'Generateur de Tableaux Markdown',
    description: 'Creez et editez des tableaux Markdown visuellement. Ajoutez des lignes et des colonnes, definissez l\'alignement et copiez la syntaxe du tableau.',
    rows: 'Lignes', cols: 'Colonnes', addRow: 'Ajouter Ligne', addCol: 'Ajouter Colonne',
    removeRow: 'Supprimer Ligne', removeCol: 'Supprimer Col',
    alignment: 'Alignement des Colonnes', alignLeft: 'Gauche', alignCenter: 'Centre', alignRight: 'Droite',
    output: 'Sortie Markdown', preview: 'Apercu', editor: 'Editeur',
    loadSample: 'Exemple', clear: 'Effacer', copy: 'Copier Markdown',
    introTitle: 'Generateur de Tableaux Markdown Gratuit',
    introText: 'Generez des tableaux Markdown correctement formates facilement.',
    faqTitle: 'Questions Frequemment Posees',
    faq1q: 'Qu\'est-ce qu\'un tableau Markdown?', faq1a: 'Un tableau Markdown affiche des donnees en lignes et colonnes en texte brut.',
    faq2q: 'Comment aligner les colonnes?', faq2a: 'Utilisez :--- pour gauche, :---: pour centre, ---: pour droite.',
    faq3q: 'Peut-on utiliser du formatage dans les cellules?', faq3a: 'Oui, le formatage inline est supporte dans les cellules.',
    faq4q: 'Ou utiliser les tableaux Markdown?', faq4a: 'GitHub, GitLab, Jupyter, MkDocs, Notion et autres.',
    faq5q: 'Y a-t-il une limite de taille?', faq5a: 'Pas de limite technique, mais les grands tableaux peuvent etre difficiles a lire.',
  },
  de: {
    title: 'Markdown Tabellen Generator',
    description: 'Erstellen und bearbeiten Sie Markdown-Tabellen visuell. Fuegen Sie Zeilen und Spalten hinzu und kopieren Sie die Tabellenstruktur.',
    rows: 'Zeilen', cols: 'Spalten', addRow: 'Zeile hinzufuegen', addCol: 'Spalte hinzufuegen',
    removeRow: 'Zeile entfernen', removeCol: 'Spalte entfernen',
    alignment: 'Spaltenausrichtung', alignLeft: 'Links', alignCenter: 'Zentriert', alignRight: 'Rechts',
    output: 'Markdown Ausgabe', preview: 'Vorschau', editor: 'Editor',
    loadSample: 'Beispiel', clear: 'Loeschen', copy: 'Markdown kopieren',
    introTitle: 'Kostenloser Markdown Tabellen Generator',
    introText: 'Generieren Sie korrekt formatierte Markdown-Tabellen ganz einfach.',
    faqTitle: 'Haeufig gestellte Fragen',
    faq1q: 'Was ist eine Markdown-Tabelle?', faq1a: 'Eine Markdown-Tabelle zeigt Daten in Zeilen und Spalten als Klartext an.',
    faq2q: 'Wie richte ich Spalten aus?', faq2a: 'Verwenden Sie :--- fuer links, :---: fuer zentriert, ---: fuer rechts.',
    faq3q: 'Kann ich Formatierung in Zellen verwenden?', faq3a: 'Ja, Inline-Formatierung wird in Zellen unterstuetzt.',
    faq4q: 'Wo kann ich Markdown-Tabellen verwenden?', faq4a: 'GitHub, GitLab, Jupyter, MkDocs, Notion und andere.',
    faq5q: 'Gibt es eine Groessenbeschraenkung?', faq5a: 'Keine technische Grenze, aber grosse Tabellen koennen schwer lesbar sein.',
  },
  it: {
    title: 'Generatore di Tabelle Markdown', description: 'Crea e modifica tabelle Markdown visivamente.',
    rows: 'Righe', cols: 'Colonne', addRow: 'Aggiungi Riga', addCol: 'Aggiungi Colonna',
    removeRow: 'Rimuovi Riga', removeCol: 'Rimuovi Col',
    alignment: 'Allineamento Colonne', alignLeft: 'Sinistra', alignCenter: 'Centro', alignRight: 'Destra',
    output: 'Output Markdown', preview: 'Anteprima', editor: 'Editor',
    loadSample: 'Esempio', clear: 'Cancella', copy: 'Copia Markdown',
    introTitle: 'Generatore di Tabelle Markdown Gratuito', introText: 'Genera tabelle Markdown correttamente formattate con facilita.',
    faqTitle: 'Domande Frequenti',
    faq1q: 'Cos\'e una tabella Markdown?', faq1a: 'Una tabella Markdown mostra dati in righe e colonne in testo normale.',
    faq2q: 'Come si allineano le colonne?', faq2a: 'Usa :--- per sinistra, :---: per centro, ---: per destra.',
    faq3q: 'Si puo usare la formattazione nelle celle?', faq3a: 'Si, la formattazione inline e supportata nelle celle.',
    faq4q: 'Dove posso usare le tabelle Markdown?', faq4a: 'GitHub, GitLab, Jupyter, MkDocs, Notion e altri.',
    faq5q: 'C\'e un limite di dimensione?', faq5a: 'Nessun limite tecnico, ma le tabelle grandi possono essere difficili da leggere.',
  },
  es: {
    title: 'Generador de Tablas Markdown', description: 'Crea y edita tablas Markdown visualmente.',
    rows: 'Filas', cols: 'Columnas', addRow: 'Agregar Fila', addCol: 'Agregar Columna',
    removeRow: 'Eliminar Fila', removeCol: 'Eliminar Col',
    alignment: 'Alineacion de Columnas', alignLeft: 'Izquierda', alignCenter: 'Centro', alignRight: 'Derecha',
    output: 'Salida Markdown', preview: 'Vista Previa', editor: 'Editor',
    loadSample: 'Ejemplo', clear: 'Limpiar', copy: 'Copiar Markdown',
    introTitle: 'Generador de Tablas Markdown Gratuito', introText: 'Genera tablas Markdown correctamente formateadas con facilidad.',
    faqTitle: 'Preguntas Frecuentes',
    faq1q: 'Que es una tabla Markdown?', faq1a: 'Una tabla Markdown muestra datos en filas y columnas en texto plano.',
    faq2q: 'Como alinear columnas?', faq2a: 'Usa :--- para izquierda, :---: para centro, ---: para derecha.',
    faq3q: 'Se puede usar formato en las celdas?', faq3a: 'Si, el formato inline es compatible en las celdas.',
    faq4q: 'Donde usar tablas Markdown?', faq4a: 'GitHub, GitLab, Jupyter, MkDocs, Notion y otros.',
    faq5q: 'Hay un limite de tamano?', faq5a: 'No hay limite tecnico, pero las tablas grandes pueden ser dificiles de leer.',
  },
  pt: {
    title: 'Gerador de Tabelas Markdown', description: 'Crie e edite tabelas Markdown visualmente.',
    rows: 'Linhas', cols: 'Colunas', addRow: 'Adicionar Linha', addCol: 'Adicionar Coluna',
    removeRow: 'Remover Linha', removeCol: 'Remover Col',
    alignment: 'Alinhamento de Colunas', alignLeft: 'Esquerda', alignCenter: 'Centro', alignRight: 'Direita',
    output: 'Saida Markdown', preview: 'Visualizacao', editor: 'Editor',
    loadSample: 'Exemplo', clear: 'Limpar', copy: 'Copiar Markdown',
    introTitle: 'Gerador de Tabelas Markdown Gratuito', introText: 'Gere tabelas Markdown corretamente formatadas com facilidade.',
    faqTitle: 'Perguntas Frequentes',
    faq1q: 'O que e uma tabela Markdown?', faq1a: 'Uma tabela Markdown exibe dados em linhas e colunas em texto simples.',
    faq2q: 'Como alinhar colunas?', faq2a: 'Use :--- para esquerda, :---: para centro, ---: para direita.',
    faq3q: 'Posso usar formatacao nas celulas?', faq3a: 'Sim, a formatacao inline e suportada nas celulas.',
    faq4q: 'Onde usar tabelas Markdown?', faq4a: 'GitHub, GitLab, Jupyter, MkDocs, Notion e outros.',
    faq5q: 'Ha um limite de tamanho?', faq5a: 'Nao ha limite tecnico, mas tabelas grandes podem ser dificeis de ler.',
  },
  nl: {
    title: 'Markdown Tabel Generator', description: 'Maak en bewerk Markdown-tabellen visueel.',
    rows: 'Rijen', cols: 'Kolommen', addRow: 'Rij Toevoegen', addCol: 'Kolom Toevoegen',
    removeRow: 'Rij Verwijderen', removeCol: 'Kolom Verw.',
    alignment: 'Kolomuitlijning', alignLeft: 'Links', alignCenter: 'Centreren', alignRight: 'Rechts',
    output: 'Markdown Uitvoer', preview: 'Voorbeeld', editor: 'Editor',
    loadSample: 'Voorbeeld', clear: 'Wissen', copy: 'Markdown Kopieren',
    introTitle: 'Gratis Markdown Tabel Generator', introText: 'Genereer correct opgemaakte Markdown-tabellen eenvoudig.',
    faqTitle: 'Veelgestelde Vragen',
    faq1q: 'Wat is een Markdown-tabel?', faq1a: 'Een Markdown-tabel toont gegevens in rijen en kolommen als platte tekst.',
    faq2q: 'Hoe richt ik kolommen uit?', faq2a: 'Gebruik :--- voor links, :---: voor centreren, ---: voor rechts.',
    faq3q: 'Kan ik opmaak in cellen gebruiken?', faq3a: 'Ja, inline-opmaak wordt ondersteund in cellen.',
    faq4q: 'Waar kan ik Markdown-tabellen gebruiken?', faq4a: 'GitHub, GitLab, Jupyter, MkDocs, Notion en andere.',
    faq5q: 'Is er een groottelimiet?', faq5a: 'Geen technische limiet, maar grote tabellen kunnen moeilijk leesbaar zijn.',
  },
  pl: {
    title: 'Generator Tabel Markdown', description: 'Tworzenie i edytowanie tabel Markdown wizualnie.',
    rows: 'Wiersze', cols: 'Kolumny', addRow: 'Dodaj Wiersz', addCol: 'Dodaj Kolumne',
    removeRow: 'Usun Wiersz', removeCol: 'Usun Kol.',
    alignment: 'Wyrownanie Kolumn', alignLeft: 'Lewo', alignCenter: 'Srodek', alignRight: 'Prawo',
    output: 'Wyjscie Markdown', preview: 'Podglad', editor: 'Edytor',
    loadSample: 'Przyklad', clear: 'Wyczysc', copy: 'Kopiuj Markdown',
    introTitle: 'Darmowy Generator Tabel Markdown', introText: 'Generuj poprawnie sformatowane tabele Markdown z latwoscia.',
    faqTitle: 'Czesto Zadawane Pytania',
    faq1q: 'Co to jest tabela Markdown?', faq1a: 'Tabela Markdown wyswietla dane w wierszach i kolumnach jako zwykly tekst.',
    faq2q: 'Jak wyrowac kolumny?', faq2a: 'Uzyj :--- dla lewej, :---: dla srodka, ---: dla prawej.',
    faq3q: 'Czy moge uzywac formatowania w komorach?', faq3a: 'Tak, formatowanie inline jest obslugiwane w komorkach.',
    faq4q: 'Gdzie uzywac tabel Markdown?', faq4a: 'GitHub, GitLab, Jupyter, MkDocs, Notion i inne.',
    faq5q: 'Czy jest limit rozmiaru?', faq5a: 'Brak limitu technicznego, ale duze tabele moga byc trudne do odczytania.',
  },
  sv: {
    title: 'Markdown Tabellgenerator', description: 'Skapa och redigera Markdown-tabeller visuellt.',
    rows: 'Rader', cols: 'Kolumner', addRow: 'Lagg till Rad', addCol: 'Lagg till Kolumn',
    removeRow: 'Ta bort Rad', removeCol: 'Ta bort Kol.',
    alignment: 'Kolumnjustering', alignLeft: 'Vanster', alignCenter: 'Centrera', alignRight: 'Hoger',
    output: 'Markdown Utdata', preview: 'Foerhandsvisning', editor: 'Redaktör',
    loadSample: 'Exempel', clear: 'Rensa', copy: 'Kopiera Markdown',
    introTitle: 'Gratis Markdown Tabellgenerator', introText: 'Generera korrekt formaterade Markdown-tabeller enkelt.',
    faqTitle: 'Vanliga Fragor',
    faq1q: 'Vad ar en Markdown-tabell?', faq1a: 'En Markdown-tabell visar data i rader och kolumner som oformaterad text.',
    faq2q: 'Hur justerar jag kolumner?', faq2a: 'Anvand :--- for vanster, :---: for centrera, ---: for hoger.',
    faq3q: 'Kan jag anvanda formatering i celler?', faq3a: 'Ja, inline-formatering stods i celler.',
    faq4q: 'Var kan jag anvanda Markdown-tabeller?', faq4a: 'GitHub, GitLab, Jupyter, MkDocs, Notion och andra.',
    faq5q: 'Finns det en storleksgrans?', faq5a: 'Ingen teknisk grans, men stora tabeller kan vara svar att lasa.',
  },
  no: {
    title: 'Markdown Tabellgenerator', description: 'Lag og rediger Markdown-tabeller visuelt.',
    rows: 'Rader', cols: 'Kolonner', addRow: 'Legg til Rad', addCol: 'Legg til Kolonne',
    removeRow: 'Fjern Rad', removeCol: 'Fjern Kol.',
    alignment: 'Kolonnejustering', alignLeft: 'Venstre', alignCenter: 'Senter', alignRight: 'Hoyre',
    output: 'Markdown Utdata', preview: 'Forhandsvisning', editor: 'Redaktor',
    loadSample: 'Eksempel', clear: 'Tøm', copy: 'Kopier Markdown',
    introTitle: 'Gratis Markdown Tabellgenerator', introText: 'Generer korrekt formaterte Markdown-tabeller enkelt.',
    faqTitle: 'Ofte Stilte Sporsmal',
    faq1q: 'Hva er en Markdown-tabell?', faq1a: 'En Markdown-tabell viser data i rader og kolonner som ren tekst.',
    faq2q: 'Hvordan justere kolonner?', faq2a: 'Bruk :--- for venstre, :---: for senter, ---: for hoyre.',
    faq3q: 'Kan jeg bruke formatering i celler?', faq3a: 'Ja, inline-formatering stotes i celler.',
    faq4q: 'Hvor kan jeg bruke Markdown-tabeller?', faq4a: 'GitHub, GitLab, Jupyter, MkDocs, Notion og andre.',
    faq5q: 'Er det en stoerrelsesbegrensning?', faq5a: 'Ingen teknisk grense, men store tabeller kan vaere vanskelige a lese.',
  },
  zh: {
    title: 'Markdown 表格生成器', description: '可视化创建和编辑 Markdown 表格，支持对齐设置，一键复制语法。',
    rows: '行数', cols: '列数', addRow: '添加行', addCol: '添加列',
    removeRow: '删除行', removeCol: '删除列',
    alignment: '列对齐', alignLeft: '左对齐', alignCenter: '居中', alignRight: '右对齐',
    output: 'Markdown 输出', preview: '预览', editor: '编辑器',
    loadSample: '加载示例', clear: '清除', copy: '复制 Markdown',
    introTitle: '免费在线 Markdown 表格生成器', introText: '轻松生成正确格式的 Markdown 表格，适用于 README、文档和 GitHub Wiki。',
    faqTitle: '常见问题',
    faq1q: '什么是 Markdown 表格？', faq1a: 'Markdown 表格使用管道符（|）分隔列，用连字符（-）创建标题分隔符，以纯文本形式显示表格数据。',
    faq2q: '如何对齐列？', faq2a: '使用 :--- 左对齐，:---: 居中，---: 右对齐。',
    faq3q: '单元格中可以使用格式化吗？', faq3a: '是的，支持粗体、斜体、行内代码和链接等内联格式。',
    faq4q: 'Markdown 表格可以用在哪里？', faq4a: 'GitHub、GitLab、Jupyter、MkDocs、Notion 等平台均支持。',
    faq5q: '有大小限制吗？', faq5a: '没有技术限制，但非常大的表格在纯文本中可能难以阅读。',
  },
  ja: {
    title: 'Markdown テーブルジェネレーター', description: 'Markdown テーブルを視覚的に作成・編集できます。',
    rows: '行数', cols: '列数', addRow: '行を追加', addCol: '列を追加',
    removeRow: '行を削除', removeCol: '列を削除',
    alignment: '列の配置', alignLeft: '左揃え', alignCenter: '中央揃え', alignRight: '右揃え',
    output: 'Markdown 出力', preview: 'プレビュー', editor: 'エディター',
    loadSample: 'サンプル', clear: 'クリア', copy: 'Markdown をコピー',
    introTitle: '無料オンライン Markdown テーブルジェネレーター', introText: '正しくフォーマットされた Markdown テーブルを簡単に生成できます。',
    faqTitle: 'よくある質問',
    faq1q: 'Markdown テーブルとは何ですか？', faq1a: 'Markdown テーブルはパイプ（|）で列を区切り、ハイフン（-）でヘッダーを作るプレーンテキスト形式の表です。',
    faq2q: '列の配置方法は？', faq2a: ':--- で左揃え、:---: で中央揃え、---: で右揃えになります。',
    faq3q: 'セル内でフォーマットを使えますか？', faq3a: 'はい、インラインフォーマット（太字、斜体、コードなど）がサポートされています。',
    faq4q: 'どこで使えますか？', faq4a: 'GitHub、GitLab、Jupyter、MkDocs、Notion などで使用できます。',
    faq5q: 'サイズ制限はありますか？', faq5a: '技術的な制限はありませんが、大きな表はプレーンテキストでは読みにくいです。',
  },
  ko: {
    title: 'Markdown 표 생성기', description: 'Markdown 표를 시각적으로 만들고 편집하세요.',
    rows: '행 수', cols: '열 수', addRow: '행 추가', addCol: '열 추가',
    removeRow: '행 삭제', removeCol: '열 삭제',
    alignment: '열 정렬', alignLeft: '왼쪽', alignCenter: '가운데', alignRight: '오른쪽',
    output: 'Markdown 출력', preview: '미리보기', editor: '편집기',
    loadSample: '샘플', clear: '초기화', copy: 'Markdown 복사',
    introTitle: '무료 온라인 Markdown 표 생성기', introText: '올바르게 형식화된 Markdown 표를 쉽게 생성하세요.',
    faqTitle: '자주 묻는 질문',
    faq1q: 'Markdown 표란 무엇인가요?', faq1a: 'Markdown 표는 파이프(|)로 열을 구분하고 하이픈(-)으로 헤더 구분선을 만드는 일반 텍스트 형식의 표입니다.',
    faq2q: '열을 정렬하는 방법은?', faq2a: ':--- 왼쪽, :---: 가운데, ---: 오른쪽 정렬입니다.',
    faq3q: '셀 안에서 서식을 사용할 수 있나요?', faq3a: '네, 인라인 서식(굵게, 기울임, 코드 등)이 지원됩니다.',
    faq4q: '어디서 사용할 수 있나요?', faq4a: 'GitHub, GitLab, Jupyter, MkDocs, Notion 등에서 사용할 수 있습니다.',
    faq5q: '크기 제한이 있나요?', faq5a: '기술적 제한은 없지만 매우 큰 표는 일반 텍스트로 읽기 어려울 수 있습니다.',
  },
  id: {
    title: 'Generator Tabel Markdown', description: 'Buat dan edit tabel Markdown secara visual.',
    rows: 'Baris', cols: 'Kolom', addRow: 'Tambah Baris', addCol: 'Tambah Kolom',
    removeRow: 'Hapus Baris', removeCol: 'Hapus Kol.',
    alignment: 'Perataan Kolom', alignLeft: 'Kiri', alignCenter: 'Tengah', alignRight: 'Kanan',
    output: 'Output Markdown', preview: 'Pratinjau', editor: 'Editor',
    loadSample: 'Contoh', clear: 'Bersihkan', copy: 'Salin Markdown',
    introTitle: 'Generator Tabel Markdown Gratis', introText: 'Buat tabel Markdown yang diformat dengan benar dengan mudah.',
    faqTitle: 'Pertanyaan Umum',
    faq1q: 'Apa itu tabel Markdown?', faq1a: 'Tabel Markdown menampilkan data dalam baris dan kolom menggunakan teks biasa dengan karakter pipa dan tanda hubung.',
    faq2q: 'Cara meratakan kolom?', faq2a: 'Gunakan :--- untuk kiri, :---: untuk tengah, ---: untuk kanan.',
    faq3q: 'Bisakah menggunakan pemformatan di sel?', faq3a: 'Ya, pemformatan inline didukung di dalam sel.',
    faq4q: 'Di mana bisa menggunakan tabel Markdown?', faq4a: 'GitHub, GitLab, Jupyter, MkDocs, Notion, dan lainnya.',
    faq5q: 'Apakah ada batas ukuran?', faq5a: 'Tidak ada batas teknis, tetapi tabel besar bisa sulit dibaca.',
  },
  th: {
    title: 'ตัวสร้างตาราง Markdown', description: 'สร้างและแก้ไขตาราง Markdown แบบภาพ',
    rows: 'แถว', cols: 'คอลัมน์', addRow: 'เพิ่มแถว', addCol: 'เพิ่มคอลัมน์',
    removeRow: 'ลบแถว', removeCol: 'ลบคอลัมน์',
    alignment: 'การจัดแนวคอลัมน์', alignLeft: 'ซ้าย', alignCenter: 'กึ่งกลาง', alignRight: 'ขวา',
    output: 'เอาต์พุต Markdown', preview: 'ตัวอย่าง', editor: 'ตัวแก้ไข',
    loadSample: 'โหลดตัวอย่าง', clear: 'ล้าง', copy: 'คัดลอก Markdown',
    introTitle: 'ตัวสร้างตาราง Markdown ฟรีออนไลน์', introText: 'สร้างตาราง Markdown ที่จัดรูปแบบถูกต้องได้อย่างง่ายดาย',
    faqTitle: 'คำถามที่พบบ่อย',
    faq1q: 'ตาราง Markdown คืออะไร?', faq1a: 'ตาราง Markdown แสดงข้อมูลในแถวและคอลัมน์โดยใช้ข้อความธรรมดาพร้อมอักขระไปป์และขีด',
    faq2q: 'วิธีจัดแนวคอลัมน์?', faq2a: 'ใช้ :--- สำหรับซ้าย :---: สำหรับกึ่งกลาง ---: สำหรับขวา',
    faq3q: 'ใช้การจัดรูปแบบในเซลล์ได้ไหม?', faq3a: 'ได้ การจัดรูปแบบแบบอินไลน์รองรับในเซลล์',
    faq4q: 'ใช้ตาราง Markdown ที่ไหนได้บ้าง?', faq4a: 'GitHub, GitLab, Jupyter, MkDocs, Notion และอื่นๆ',
    faq5q: 'มีขีดจำกัดขนาดไหม?', faq5a: 'ไม่มีขีดจำกัดทางเทคนิค แต่ตารางขนาดใหญ่อาจอ่านยากในข้อความธรรมดา',
  },
};

type CellAlignment = 'left' | 'center' | 'right';

function generateMarkdown(headers: string[], rows: string[][], alignments: CellAlignment[]): string {
  const colWidths = headers.map((h, i) => {
    const dataMax = rows.reduce((max, row) => Math.max(max, (row[i] || '').length), 0);
    return Math.max(h.length, dataMax, 3);
  });

  const pad = (s: string, w: number) => s.padEnd(w, ' ');
  const headerRow = '| ' + headers.map((h, i) => pad(h, colWidths[i])).join(' | ') + ' |';
  const sepRow = '| ' + alignments.map((a, i) => {
    const w = colWidths[i];
    if (a === 'center') return ':' + '-'.repeat(w - 2) + ':';
    if (a === 'right') return '-'.repeat(w - 1) + ':';
    return ':' + '-'.repeat(w - 1);
  }).join(' | ') + ' |';
  const dataRows = rows.map(row =>
    '| ' + headers.map((_, i) => pad(row[i] || '', colWidths[i])).join(' | ') + ' |'
  );
  return [headerRow, sepRow, ...dataRows].join('\n');
}

export default function MarkdownTableGenerator() {
  const { lang } = useLang();
  const t = ui[lang] || ui.en;

  const [headers, setHeaders] = useState(['Name', 'Type', 'Description']);
  const [rows, setRows] = useState([
    ['username', 'string', 'The user\'s display name'],
    ['age', 'number', 'User age in years'],
    ['active', 'boolean', 'Whether the account is active'],
  ]);
  const [alignments, setAlignments] = useState<CellAlignment[]>(['left', 'center', 'left']);
  const [activeTab, setActiveTab] = useState<'editor' | 'preview'>('editor');

  const markdown = generateMarkdown(headers, rows, alignments);

  const addRow = useCallback(() => {
    setRows(r => [...r, headers.map(() => '')]);
  }, [headers]);

  const removeRow = useCallback(() => {
    setRows(r => r.slice(0, -1));
  }, []);

  const addCol = useCallback(() => {
    setHeaders(h => [...h, `Col ${h.length + 1}`]);
    setAlignments(a => [...a, 'left']);
    setRows(r => r.map(row => [...row, '']));
  }, []);

  const removeCol = useCallback(() => {
    if (headers.length <= 1) return;
    setHeaders(h => h.slice(0, -1));
    setAlignments(a => a.slice(0, -1));
    setRows(r => r.map(row => row.slice(0, -1)));
  }, [headers]);

  const loadSample = () => {
    setHeaders(['Feature', 'Free', 'Pro', 'Enterprise']);
    setAlignments(['left', 'center', 'center', 'center']);
    setRows([
      ['Storage', '1 GB', '50 GB', 'Unlimited'],
      ['Users', '1', '5', 'Unlimited'],
      ['Support', 'Community', 'Email', '24/7 Phone'],
      ['API Access', 'No', 'Yes', 'Yes'],
    ]);
  };

  const clear = () => {
    setHeaders(['Column 1', 'Column 2', 'Column 3']);
    setAlignments(['left', 'left', 'left']);
    setRows([['', '', ''], ['', '', '']]);
  };

  const btnStyle = {
    padding: '6px 14px', borderRadius: 6, border: '1px solid var(--border-color)',
    background: 'var(--bg-input)', color: 'var(--text-primary)', cursor: 'pointer',
    fontSize: 12, fontWeight: 600,
  };

  return (
    <ToolLayout title={t.title} description={t.description} toolId="markdown-table-generator">
      {/* Toolbar */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
        <button onClick={addRow} style={btnStyle}>{t.addRow}</button>
        <button onClick={removeRow} style={btnStyle} disabled={rows.length <= 1}>{t.removeRow}</button>
        <button onClick={addCol} style={btnStyle}>{t.addCol}</button>
        <button onClick={removeCol} style={btnStyle} disabled={headers.length <= 1}>{t.removeCol}</button>
        <span style={{ borderLeft: '1px solid var(--border-color)', margin: '0 4px' }} />
        <button onClick={loadSample} style={btnStyle}>{t.loadSample}</button>
        <button onClick={clear} style={btnStyle}>{t.clear}</button>
        <span style={{ marginLeft: 'auto' }}>
          <CopyButton text={markdown} label={t.copy} />
        </span>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 0, marginBottom: 16, borderBottom: '1px solid var(--border-color)' }}>
        {(['editor', 'preview'] as const).map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)} style={{
            padding: '8px 20px', border: 'none', background: 'transparent',
            borderBottom: activeTab === tab ? '2px solid var(--accent-blue)' : '2px solid transparent',
            color: activeTab === tab ? 'var(--accent-blue)' : 'var(--text-secondary)',
            fontWeight: 600, cursor: 'pointer', fontSize: 13,
          }}>
            {tab === 'editor' ? t.editor : t.preview}
          </button>
        ))}
      </div>

      {activeTab === 'editor' && (
        <div style={{ overflowX: 'auto' }}>
          <table style={{ borderCollapse: 'collapse', width: '100%', fontSize: 13 }}>
            <thead>
              <tr>
                {headers.map((h, ci) => (
                  <th key={ci} style={{ padding: 4, border: '1px solid var(--border-color)' }}>
                    <input
                      value={h}
                      onChange={e => setHeaders(hs => hs.map((x, i) => i === ci ? e.target.value : x))}
                      style={{ width: '100%', padding: '4px 6px', fontWeight: 700, fontSize: 12, background: 'var(--bg-input)', border: 'none', color: 'var(--text-primary)', minWidth: 80 }}
                      placeholder={`Header ${ci + 1}`}
                    />
                    <select
                      value={alignments[ci]}
                      onChange={e => setAlignments(a => a.map((x, i) => i === ci ? e.target.value as CellAlignment : x))}
                      style={{ width: '100%', fontSize: 11, marginTop: 2, background: 'var(--bg-input)', border: '1px solid var(--border-color)', color: 'var(--text-secondary)', padding: '2px 4px' }}
                    >
                      <option value="left">{t.alignLeft}</option>
                      <option value="center">{t.alignCenter}</option>
                      <option value="right">{t.alignRight}</option>
                    </select>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, ri) => (
                <tr key={ri}>
                  {headers.map((_, ci) => (
                    <td key={ci} style={{ padding: 4, border: '1px solid var(--border-color)' }}>
                      <input
                        value={row[ci] || ''}
                        onChange={e => setRows(rs => rs.map((r, i) => i === ri ? r.map((c, j) => j === ci ? e.target.value : c) : r))}
                        style={{ width: '100%', padding: '4px 6px', fontSize: 12, background: 'var(--bg-input)', border: 'none', color: 'var(--text-primary)', minWidth: 80 }}
                        placeholder="..."
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'preview' && (
        <div>
          <div style={{ overflowX: 'auto', marginBottom: 16 }}>
            <table style={{ borderCollapse: 'collapse', width: '100%', fontSize: 13 }}>
              <thead>
                <tr style={{ background: 'var(--bg-input)' }}>
                  {headers.map((h, i) => (
                    <th key={i} style={{ padding: '8px 12px', border: '1px solid var(--border-color)', textAlign: alignments[i], fontWeight: 700 }}>{h || `Col ${i + 1}`}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row, ri) => (
                  <tr key={ri} style={{ background: ri % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.02)' }}>
                    {headers.map((_, ci) => (
                      <td key={ci} style={{ padding: '8px 12px', border: '1px solid var(--border-color)', textAlign: alignments[ci] }}>{row[ci] || ''}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Markdown Output */}
      <div style={{ marginTop: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
          <label style={{ fontSize: 13, fontWeight: 600 }}>{t.output}</label>
          <CopyButton text={markdown} />
        </div>
        <textarea value={markdown} readOnly style={{ minHeight: 150, fontFamily: 'monospace', fontSize: 12 }} />
      </div>

      {/* Intro */}
      <div style={{ marginTop: 28, paddingTop: 20, borderTop: '1px solid var(--border-color)' }}>
        <h2 style={{ fontSize: 17, fontWeight: 700, marginBottom: 10 }}>{t.introTitle}</h2>
        <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.7 }}>{t.introText}</p>
      </div>

      {/* FAQ */}
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
