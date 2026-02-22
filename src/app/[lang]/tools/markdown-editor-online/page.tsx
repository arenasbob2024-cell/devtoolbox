'use client';

import { useState, useCallback, useRef } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import Link from 'next/link';
import { useLang } from '@/i18n/LangContext';

const ui: Record<string, Record<string, string>> = {
  en: {
    title: 'Online Markdown Editor',
    description: 'Write Markdown with real-time preview. Split pane editor with syntax highlighting, export to HTML, and copy rendered output.',
    editorLabel: 'Markdown',
    previewLabel: 'Preview',
    placeholder: '# Hello World\n\nStart writing your **Markdown** here...\n\n## Features\n- Real-time preview\n- Export to HTML\n- Split pane view\n\n> This is a blockquote\n\n```js\nconsole.log("Hello!");\n```\n\n| Column A | Column B |\n|----------|----------|\n| Cell 1   | Cell 2   |',
    exportHtml: 'Export HTML',
    copyMd: 'Copy Markdown',
    clear: 'Clear',
    wordCount: 'Words',
    charCount: 'Characters',
    lineCount: 'Lines',
    introTitle: 'Free Online Markdown Editor',
    introText: 'This online Markdown editor provides a split-pane writing experience with real-time preview. Write Markdown on the left and instantly see the formatted output on the right. Export your content to HTML or copy the Markdown source. Perfect for README files, documentation, blog posts, and notes.',
    howTitle: 'How to Use the Markdown Editor',
    step1: 'Type or paste Markdown text in the editor panel on the left',
    step2: 'See the formatted preview update in real time on the right',
    step3: 'Use the toolbar to export HTML or copy your Markdown source',
    step4: 'The word, character, and line counters update automatically',
    faqTitle: 'Frequently Asked Questions',
    faq1q: 'What is Markdown?',
    faq1a: 'Markdown is a lightweight markup language created by John Gruber. It lets you write formatted text using plain text syntax. Common uses include README files, documentation, blog posts, and forum comments. Markdown files use the .md or .markdown extension.',
    faq2q: 'What Markdown syntax is supported?',
    faq2a: 'This editor supports standard Markdown including headings, bold, italic, links, images, code blocks, blockquotes, ordered and unordered lists, tables, horizontal rules, and inline code. It covers the CommonMark specification.',
    faq3q: 'Can I export my Markdown to HTML?',
    faq3a: 'Yes, click the "Export HTML" button to get the rendered HTML output. You can copy the HTML and use it in any webpage, email template, or content management system.',
    faq4q: 'Is my data stored on a server?',
    faq4a: 'No, all processing happens entirely in your browser. Your Markdown content is never sent to any server. You can use this editor offline once the page is loaded.',
    faq5q: 'Can I use this for GitHub README files?',
    faq5a: 'Yes, this editor uses standard Markdown syntax that is fully compatible with GitHub Flavored Markdown. You can write your README here and then copy the Markdown to your repository.',
    relatedTitle: 'Related Tools',
  },
  zh: {
    title: '在线 Markdown 编辑器',
    description: '实时预览的 Markdown 编辑器。分栏编辑，语法高亮，导出 HTML，复制渲染结果。',
    editorLabel: 'Markdown',
    previewLabel: '预览',
    placeholder: '# 你好世界\n\n在这里开始编写 **Markdown**...\n\n## 功能\n- 实时预览\n- 导出 HTML\n- 分栏视图\n\n> 这是一段引用\n\n```js\nconsole.log("你好!");\n```\n\n| 列 A | 列 B |\n|------|------|\n| 单元格 1 | 单元格 2 |',
    exportHtml: '导出 HTML',
    copyMd: '复制 Markdown',
    clear: '清除',
    wordCount: '字数',
    charCount: '字符数',
    lineCount: '行数',
    introTitle: '免费在线 Markdown 编辑器',
    introText: '这款在线 Markdown 编辑器提供分栏实时预览的编写体验。在左侧编写 Markdown，右侧即时查看格式化输出。支持导出 HTML 或复制源码，适合编写 README 文件、文档、博客和笔记。',
    howTitle: '如何使用 Markdown 编辑器',
    step1: '在左侧编辑面板中输入或粘贴 Markdown 文本',
    step2: '右侧预览面板实时更新格式化内容',
    step3: '使用工具栏导出 HTML 或复制 Markdown 源码',
    step4: '字数、字符数和行数计数器自动更新',
    faqTitle: '常见问题',
    faq1q: '什么是 Markdown？',
    faq1a: 'Markdown 是一种由 John Gruber 创建的轻量级标记语言。它允许你使用纯文本语法编写格式化文本。常见用途包括 README 文件、文档、博客和论坛评论。',
    faq2q: '支持哪些 Markdown 语法？',
    faq2a: '本编辑器支持标准 Markdown，包括标题、粗体、斜体、链接、图片、代码块、引用、有序和无序列表、表格、水平线和行内代码。',
    faq3q: '可以导出 HTML 吗？',
    faq3a: '可以，点击"导出 HTML"按钮即可获取渲染后的 HTML 输出。你可以复制 HTML 用于网页、邮件模板或内容管理系统。',
    faq4q: '我的数据会存储在服务器上吗？',
    faq4a: '不会，所有处理完全在你的浏览器中进行。你的 Markdown 内容永远不会发送到任何服务器。',
    faq5q: '可以用来编写 GitHub README 吗？',
    faq5a: '可以，本编辑器使用与 GitHub Flavored Markdown 完全兼容的标准 Markdown 语法。',
    relatedTitle: '相关工具',
  },
  ja: {
    title: 'オンライン Markdown エディタ',
    description: 'リアルタイムプレビュー付きMarkdownエディタ。分割ペイン、HTML出力、レンダリング結果のコピー。',
    editorLabel: 'Markdown',
    previewLabel: 'プレビュー',
    placeholder: '# こんにちは\n\nここで **Markdown** を書き始めましょう...\n\n## 機能\n- リアルタイムプレビュー\n- HTMLエクスポート\n- 分割ビュー',
    exportHtml: 'HTMLをエクスポート',
    copyMd: 'Markdownをコピー',
    clear: 'クリア',
    wordCount: '単語数',
    charCount: '文字数',
    lineCount: '行数',
    introTitle: '無料オンラインMarkdownエディタ',
    introText: 'このオンラインMarkdownエディタは、リアルタイムプレビュー付きの分割ペイン編集体験を提供します。左側でMarkdownを書くと、右側にフォーマット済み出力が即座に表示されます。',
    howTitle: 'Markdownエディタの使い方',
    step1: '左側のエディタパネルにMarkdownテキストを入力または貼り付け',
    step2: '右側のプレビューがリアルタイムで更新されます',
    step3: 'ツールバーでHTMLエクスポートまたはMarkdownのコピー',
    step4: '単語数、文字数、行数カウンターが自動更新されます',
    faqTitle: 'よくある質問',
    faq1q: 'Markdownとは何ですか？',
    faq1a: 'Markdownはプレーンテキスト構文でフォーマットされたテキストを書くことができる軽量マークアップ言語です。README、ドキュメント、ブログ記事に広く使用されています。',
    faq2q: 'どのMarkdown構文がサポートされていますか？',
    faq2a: '見出し、太字、斜体、リンク、画像、コードブロック、引用、リスト、テーブル、水平線、インラインコードをサポートしています。',
    faq3q: 'HTMLにエクスポートできますか？',
    faq3a: 'はい、「HTMLをエクスポート」ボタンをクリックしてレンダリング済みHTML出力を取得できます。',
    faq4q: 'データはサーバーに保存されますか？',
    faq4a: 'いいえ、すべての処理はブラウザ内で行われます。コンテンツはサーバーに送信されません。',
    faq5q: 'GitHub READMEに使えますか？',
    faq5a: 'はい、このエディタはGitHub Flavored Markdownと互換性のある標準Markdown構文を使用しています。',
    relatedTitle: '関連ツール',
  },
  ko: {
    title: '온라인 Markdown 에디터',
    description: '실시간 미리보기가 있는 Markdown 편집기. 분할 창, HTML 내보내기, 렌더링 결과 복사.',
    editorLabel: 'Markdown',
    previewLabel: '미리보기',
    placeholder: '# 안녕하세요\n\n여기에서 **Markdown**을 작성하세요...\n\n## 기능\n- 실시간 미리보기\n- HTML 내보내기\n- 분할 보기',
    exportHtml: 'HTML 내보내기',
    copyMd: 'Markdown 복사',
    clear: '지우기',
    wordCount: '단어 수',
    charCount: '문자 수',
    lineCount: '줄 수',
    introTitle: '무료 온라인 Markdown 에디터',
    introText: '이 온라인 Markdown 에디터는 실시간 미리보기와 함께 분할 창 편집 환경을 제공합니다. 왼쪽에서 Markdown을 작성하면 오른쪽에 포맷된 출력이 즉시 표시됩니다.',
    howTitle: 'Markdown 에디터 사용 방법',
    step1: '왼쪽 편집기 패널에 Markdown 텍스트를 입력하거나 붙여넣기',
    step2: '오른쪽 미리보기가 실시간으로 업데이트됩니다',
    step3: '도구 모음에서 HTML 내보내기 또는 Markdown 복사',
    step4: '단어 수, 문자 수, 줄 수 카운터가 자동 업데이트됩니다',
    faqTitle: '자주 묻는 질문',
    faq1q: 'Markdown이란 무엇인가요?',
    faq1a: 'Markdown은 일반 텍스트 구문으로 서식 있는 텍스트를 작성할 수 있는 경량 마크업 언어입니다. README, 문서, 블로그 게시물에 널리 사용됩니다.',
    faq2q: '어떤 Markdown 구문이 지원되나요?',
    faq2a: '제목, 굵게, 기울임꼴, 링크, 이미지, 코드 블록, 인용, 목록, 표, 수평선, 인라인 코드를 지원합니다.',
    faq3q: 'HTML로 내보낼 수 있나요?',
    faq3a: '네, "HTML 내보내기" 버튼을 클릭하면 렌더링된 HTML 출력을 얻을 수 있습니다.',
    faq4q: '데이터가 서버에 저장되나요?',
    faq4a: '아니요, 모든 처리는 브라우저에서 이루어집니다. 콘텐츠는 서버로 전송되지 않습니다.',
    faq5q: 'GitHub README에 사용할 수 있나요?',
    faq5a: '네, 이 에디터는 GitHub Flavored Markdown과 호환되는 표준 Markdown 구문을 사용합니다.',
    relatedTitle: '관련 도구',
  },
  fr: {
    title: 'Editeur Markdown en ligne',
    description: 'Editeur Markdown avec apercu en temps reel. Panneau divise, export HTML et copie du rendu.',
    editorLabel: 'Markdown',
    previewLabel: 'Apercu',
    placeholder: '# Bonjour\n\nCommencez a ecrire votre **Markdown** ici...\n\n## Fonctionnalites\n- Apercu en temps reel\n- Export HTML\n- Vue divisee',
    exportHtml: 'Exporter HTML',
    copyMd: 'Copier Markdown',
    clear: 'Effacer',
    wordCount: 'Mots',
    charCount: 'Caracteres',
    lineCount: 'Lignes',
    introTitle: 'Editeur Markdown en ligne gratuit',
    introText: "Cet editeur Markdown en ligne offre une experience d'ecriture en panneau divise avec apercu en temps reel. Ecrivez du Markdown a gauche et voyez le resultat formate a droite. Exportez en HTML ou copiez le source.",
    howTitle: "Comment utiliser l'editeur Markdown",
    step1: 'Tapez ou collez du texte Markdown dans le panneau de gauche',
    step2: "L'apercu se met a jour en temps reel a droite",
    step3: 'Utilisez la barre pour exporter HTML ou copier le Markdown',
    step4: 'Les compteurs de mots, caracteres et lignes se mettent a jour automatiquement',
    faqTitle: 'Questions frequentes',
    faq1q: "Qu'est-ce que Markdown ?",
    faq1a: "Markdown est un langage de balisage leger qui permet d'ecrire du texte formate avec une syntaxe en texte brut. Il est utilise pour les fichiers README, la documentation et les articles de blog.",
    faq2q: 'Quelle syntaxe Markdown est supportee ?',
    faq2a: "Cet editeur supporte les titres, le gras, l'italique, les liens, images, blocs de code, citations, listes, tableaux, lignes horizontales et code en ligne.",
    faq3q: 'Puis-je exporter en HTML ?',
    faq3a: 'Oui, cliquez sur "Exporter HTML" pour obtenir le rendu HTML. Vous pouvez copier le HTML pour vos pages web.',
    faq4q: 'Mes donnees sont-elles stockees sur un serveur ?',
    faq4a: "Non, tout le traitement se fait dans votre navigateur. Votre contenu n'est jamais envoye a un serveur.",
    faq5q: 'Puis-je utiliser ceci pour les README GitHub ?',
    faq5a: 'Oui, cet editeur utilise une syntaxe Markdown standard compatible avec GitHub Flavored Markdown.',
    relatedTitle: 'Outils connexes',
  },
  de: {
    title: 'Online Markdown Editor',
    description: 'Markdown-Editor mit Echtzeit-Vorschau. Geteilte Ansicht, HTML-Export und Kopieren der gerenderten Ausgabe.',
    editorLabel: 'Markdown',
    previewLabel: 'Vorschau',
    placeholder: '# Hallo Welt\n\nBeginnen Sie hier **Markdown** zu schreiben...\n\n## Funktionen\n- Echtzeit-Vorschau\n- HTML-Export\n- Geteilte Ansicht',
    exportHtml: 'HTML exportieren',
    copyMd: 'Markdown kopieren',
    clear: 'Loeschen',
    wordCount: 'Woerter',
    charCount: 'Zeichen',
    lineCount: 'Zeilen',
    introTitle: 'Kostenloser Online Markdown Editor',
    introText: 'Dieser Online Markdown Editor bietet eine geteilte Ansicht mit Echtzeit-Vorschau. Schreiben Sie Markdown links und sehen Sie die formatierte Ausgabe sofort rechts. Exportieren Sie nach HTML oder kopieren Sie den Quelltext.',
    howTitle: 'So verwenden Sie den Markdown Editor',
    step1: 'Geben Sie Markdown-Text im linken Editor-Bereich ein oder fuegen Sie ihn ein',
    step2: 'Die Vorschau aktualisiert sich in Echtzeit auf der rechten Seite',
    step3: 'Verwenden Sie die Symbolleiste zum HTML-Export oder Markdown-Kopieren',
    step4: 'Wort-, Zeichen- und Zeilenzaehler aktualisieren sich automatisch',
    faqTitle: 'Haeufig gestellte Fragen',
    faq1q: 'Was ist Markdown?',
    faq1a: 'Markdown ist eine leichtgewichtige Auszeichnungssprache, mit der Sie formatierten Text mit Klartext-Syntax schreiben koennen. Sie wird fuer README-Dateien, Dokumentation und Blog-Beitraege verwendet.',
    faq2q: 'Welche Markdown-Syntax wird unterstuetzt?',
    faq2a: 'Dieser Editor unterstuetzt Ueberschriften, Fett, Kursiv, Links, Bilder, Codebloecke, Zitate, Listen, Tabellen, horizontale Linien und Inline-Code.',
    faq3q: 'Kann ich nach HTML exportieren?',
    faq3a: 'Ja, klicken Sie auf "HTML exportieren", um die gerenderte HTML-Ausgabe zu erhalten.',
    faq4q: 'Werden meine Daten auf einem Server gespeichert?',
    faq4a: 'Nein, die gesamte Verarbeitung erfolgt in Ihrem Browser. Ihre Inhalte werden nie an einen Server gesendet.',
    faq5q: 'Kann ich dies fuer GitHub READMEs verwenden?',
    faq5a: 'Ja, dieser Editor verwendet Standard-Markdown-Syntax, die mit GitHub Flavored Markdown kompatibel ist.',
    relatedTitle: 'Verwandte Tools',
  },
  es: {
    title: 'Editor Markdown en linea',
    description: 'Editor Markdown con vista previa en tiempo real. Panel dividido, exportar a HTML y copiar resultado renderizado.',
    editorLabel: 'Markdown',
    previewLabel: 'Vista previa',
    placeholder: '# Hola Mundo\n\nComienza a escribir **Markdown** aqui...\n\n## Caracteristicas\n- Vista previa en tiempo real\n- Exportar a HTML\n- Vista dividida',
    exportHtml: 'Exportar HTML',
    copyMd: 'Copiar Markdown',
    clear: 'Limpiar',
    wordCount: 'Palabras',
    charCount: 'Caracteres',
    lineCount: 'Lineas',
    introTitle: 'Editor Markdown en linea gratuito',
    introText: 'Este editor Markdown en linea ofrece una experiencia de escritura en panel dividido con vista previa en tiempo real. Escribe Markdown a la izquierda y ve el resultado formateado a la derecha.',
    howTitle: 'Como usar el editor Markdown',
    step1: 'Escribe o pega texto Markdown en el panel izquierdo',
    step2: 'La vista previa se actualiza en tiempo real a la derecha',
    step3: 'Usa la barra para exportar HTML o copiar el Markdown',
    step4: 'Los contadores de palabras, caracteres y lineas se actualizan automaticamente',
    faqTitle: 'Preguntas frecuentes',
    faq1q: 'Que es Markdown?',
    faq1a: 'Markdown es un lenguaje de marcado ligero que permite escribir texto formateado con sintaxis de texto plano. Se usa para archivos README, documentacion y publicaciones de blog.',
    faq2q: 'Que sintaxis Markdown se soporta?',
    faq2a: 'Este editor soporta encabezados, negrita, cursiva, enlaces, imagenes, bloques de codigo, citas, listas, tablas, lineas horizontales y codigo en linea.',
    faq3q: 'Puedo exportar a HTML?',
    faq3a: 'Si, haz clic en "Exportar HTML" para obtener la salida HTML renderizada.',
    faq4q: 'Se almacenan mis datos en un servidor?',
    faq4a: 'No, todo el procesamiento se realiza en tu navegador. Tu contenido nunca se envia a ningun servidor.',
    faq5q: 'Puedo usarlo para README de GitHub?',
    faq5a: 'Si, este editor usa sintaxis Markdown estandar compatible con GitHub Flavored Markdown.',
    relatedTitle: 'Herramientas relacionadas',
  },
  pt: {
    title: 'Editor Markdown Online',
    description: 'Editor Markdown com visualizacao em tempo real. Painel dividido, exportar HTML e copiar resultado renderizado.',
    editorLabel: 'Markdown',
    previewLabel: 'Visualizacao',
    placeholder: '# Ola Mundo\n\nComece a escrever **Markdown** aqui...\n\n## Recursos\n- Visualizacao em tempo real\n- Exportar HTML\n- Vista dividida',
    exportHtml: 'Exportar HTML',
    copyMd: 'Copiar Markdown',
    clear: 'Limpar',
    wordCount: 'Palavras',
    charCount: 'Caracteres',
    lineCount: 'Linhas',
    introTitle: 'Editor Markdown Online Gratuito',
    introText: 'Este editor Markdown online oferece uma experiencia de escrita em painel dividido com visualizacao em tempo real. Escreva Markdown a esquerda e veja a saida formatada a direita.',
    howTitle: 'Como usar o editor Markdown',
    step1: 'Digite ou cole texto Markdown no painel esquerdo',
    step2: 'A visualizacao atualiza em tempo real a direita',
    step3: 'Use a barra para exportar HTML ou copiar o Markdown',
    step4: 'Os contadores de palavras, caracteres e linhas atualizam automaticamente',
    faqTitle: 'Perguntas frequentes',
    faq1q: 'O que e Markdown?',
    faq1a: 'Markdown e uma linguagem de marcacao leve que permite escrever texto formatado com sintaxe de texto simples. E usado para arquivos README, documentacao e posts de blog.',
    faq2q: 'Qual sintaxe Markdown e suportada?',
    faq2a: 'Este editor suporta titulos, negrito, italico, links, imagens, blocos de codigo, citacoes, listas, tabelas, linhas horizontais e codigo em linha.',
    faq3q: 'Posso exportar para HTML?',
    faq3a: 'Sim, clique em "Exportar HTML" para obter a saida HTML renderizada.',
    faq4q: 'Meus dados sao armazenados em um servidor?',
    faq4a: 'Nao, todo o processamento acontece no seu navegador. Seu conteudo nunca e enviado a nenhum servidor.',
    faq5q: 'Posso usar para README do GitHub?',
    faq5a: 'Sim, este editor usa sintaxe Markdown padrao compativel com GitHub Flavored Markdown.',
    relatedTitle: 'Ferramentas relacionadas',
  },
  it: {
    title: 'Editor Markdown Online',
    description: 'Editor Markdown con anteprima in tempo reale. Pannello diviso, esportazione HTML e copia del risultato.',
    editorLabel: 'Markdown',
    previewLabel: 'Anteprima',
    placeholder: '# Ciao Mondo\n\nInizia a scrivere **Markdown** qui...\n\n## Funzionalita\n- Anteprima in tempo reale\n- Esportazione HTML\n- Vista divisa',
    exportHtml: 'Esporta HTML',
    copyMd: 'Copia Markdown',
    clear: 'Cancella',
    wordCount: 'Parole',
    charCount: 'Caratteri',
    lineCount: 'Righe',
    introTitle: 'Editor Markdown Online Gratuito',
    introText: "Questo editor Markdown online offre un'esperienza di scrittura a pannello diviso con anteprima in tempo reale. Scrivi Markdown a sinistra e vedi l'output formattato a destra.",
    howTitle: "Come usare l'editor Markdown",
    step1: 'Digita o incolla testo Markdown nel pannello sinistro',
    step2: "L'anteprima si aggiorna in tempo reale a destra",
    step3: 'Usa la barra per esportare HTML o copiare il Markdown',
    step4: 'I contatori di parole, caratteri e righe si aggiornano automaticamente',
    faqTitle: 'Domande frequenti',
    faq1q: "Cos'e Markdown?",
    faq1a: 'Markdown e un linguaggio di markup leggero che permette di scrivere testo formattato con sintassi in testo semplice. Viene usato per file README, documentazione e articoli di blog.',
    faq2q: 'Quale sintassi Markdown e supportata?',
    faq2a: 'Questo editor supporta intestazioni, grassetto, corsivo, link, immagini, blocchi di codice, citazioni, liste, tabelle, linee orizzontali e codice inline.',
    faq3q: 'Posso esportare in HTML?',
    faq3a: 'Si, clicca "Esporta HTML" per ottenere l\'output HTML renderizzato.',
    faq4q: 'I miei dati vengono memorizzati su un server?',
    faq4a: 'No, tutta l\'elaborazione avviene nel browser. I tuoi contenuti non vengono mai inviati a nessun server.',
    faq5q: 'Posso usarlo per README di GitHub?',
    faq5a: 'Si, questo editor usa sintassi Markdown standard compatibile con GitHub Flavored Markdown.',
    relatedTitle: 'Strumenti correlati',
  },
  nl: {
    title: 'Online Markdown Editor',
    description: 'Markdown editor met realtime voorbeeld. Gesplitst paneel, HTML-export en kopieer gerenderde uitvoer.',
    editorLabel: 'Markdown',
    previewLabel: 'Voorbeeld',
    placeholder: '# Hallo Wereld\n\nBegin hier **Markdown** te schrijven...\n\n## Functies\n- Realtime voorbeeld\n- HTML exporteren\n- Gesplitste weergave',
    exportHtml: 'HTML exporteren',
    copyMd: 'Markdown kopieren',
    clear: 'Wissen',
    wordCount: 'Woorden',
    charCount: 'Tekens',
    lineCount: 'Regels',
    introTitle: 'Gratis Online Markdown Editor',
    introText: 'Deze online Markdown editor biedt een gesplitst paneel schrijfervaring met realtime voorbeeld. Schrijf Markdown links en zie de geformatteerde uitvoer rechts.',
    howTitle: 'Hoe de Markdown Editor te gebruiken',
    step1: 'Typ of plak Markdown tekst in het linker paneel',
    step2: 'Het voorbeeld wordt in realtime rechts bijgewerkt',
    step3: 'Gebruik de werkbalk om HTML te exporteren of Markdown te kopieren',
    step4: 'De woord-, teken- en regeltellers worden automatisch bijgewerkt',
    faqTitle: 'Veelgestelde vragen',
    faq1q: 'Wat is Markdown?',
    faq1a: 'Markdown is een lichtgewicht opmaaktaal waarmee je geformatteerde tekst kunt schrijven met platte tekstsyntaxis. Het wordt gebruikt voor README-bestanden, documentatie en blogposts.',
    faq2q: 'Welke Markdown-syntaxis wordt ondersteund?',
    faq2a: 'Deze editor ondersteunt koppen, vet, cursief, links, afbeeldingen, codeblokken, citaten, lijsten, tabellen, horizontale lijnen en inline code.',
    faq3q: 'Kan ik exporteren naar HTML?',
    faq3a: 'Ja, klik op "HTML exporteren" om de gerenderde HTML-uitvoer te krijgen.',
    faq4q: 'Worden mijn gegevens op een server opgeslagen?',
    faq4a: 'Nee, alle verwerking vindt plaats in uw browser. Uw inhoud wordt nooit naar een server gestuurd.',
    faq5q: 'Kan ik dit gebruiken voor GitHub READMEs?',
    faq5a: 'Ja, deze editor gebruikt standaard Markdown-syntaxis die compatibel is met GitHub Flavored Markdown.',
    relatedTitle: 'Gerelateerde tools',
  },
  pl: {
    title: 'Edytor Markdown Online',
    description: 'Edytor Markdown z podgladem w czasie rzeczywistym. Podzielony panel, eksport HTML i kopiowanie.',
    editorLabel: 'Markdown',
    previewLabel: 'Podglad',
    placeholder: '# Witaj Swiecie\n\nZacznij pisac **Markdown** tutaj...\n\n## Funkcje\n- Podglad w czasie rzeczywistym\n- Eksport HTML\n- Widok podzielony',
    exportHtml: 'Eksportuj HTML',
    copyMd: 'Kopiuj Markdown',
    clear: 'Wyczysc',
    wordCount: 'Slowa',
    charCount: 'Znaki',
    lineCount: 'Linie',
    introTitle: 'Darmowy Edytor Markdown Online',
    introText: 'Ten edytor Markdown online oferuje podzielony panel pisania z podgladem w czasie rzeczywistym. Pisz Markdown po lewej i natychmiast zobacz sformatowany wynik po prawej.',
    howTitle: 'Jak korzystac z edytora Markdown',
    step1: 'Wpisz lub wklej tekst Markdown w lewym panelu',
    step2: 'Podglad aktualizuje sie w czasie rzeczywistym po prawej',
    step3: 'Uzyj paska narzedzi do eksportu HTML lub kopiowania Markdown',
    step4: 'Liczniki slow, znakow i linii aktualizuja sie automatycznie',
    faqTitle: 'Czesto zadawane pytania',
    faq1q: 'Co to jest Markdown?',
    faq1a: 'Markdown to lekki jezyk znacznikow, ktory pozwala pisac sformatowany tekst za pomoca skladni zwyklego tekstu. Jest uzywany do plikow README, dokumentacji i wpisow na blogu.',
    faq2q: 'Jaka skladnia Markdown jest obslugiwana?',
    faq2a: 'Ten edytor obsluguje naglowki, pogrubienie, kursywe, linki, obrazy, bloki kodu, cytaty, listy, tabele, linie poziome i kod inline.',
    faq3q: 'Czy moge eksportowac do HTML?',
    faq3a: 'Tak, kliknij "Eksportuj HTML", aby uzyskac wyrenderowany wynik HTML.',
    faq4q: 'Czy moje dane sa przechowywane na serwerze?',
    faq4a: 'Nie, cale przetwarzanie odbywa sie w przegladarce. Twoja zawartosc nigdy nie jest wysylana na serwer.',
    faq5q: 'Czy moge uzywac tego do README na GitHubie?',
    faq5a: 'Tak, ten edytor uzywa standardowej skladni Markdown kompatybilnej z GitHub Flavored Markdown.',
    relatedTitle: 'Powiazane narzedzia',
  },
  sv: {
    title: 'Markdown-redigerare Online',
    description: 'Markdown-redigerare med realtidsforhandsvisning. Delad vy, HTML-export och kopiering av renderad utdata.',
    editorLabel: 'Markdown',
    previewLabel: 'Forhandsvisning',
    placeholder: '# Hej Varlden\n\nBorja skriva **Markdown** har...\n\n## Funktioner\n- Realtidsforhandsvisning\n- HTML-export\n- Delad vy',
    exportHtml: 'Exportera HTML',
    copyMd: 'Kopiera Markdown',
    clear: 'Rensa',
    wordCount: 'Ord',
    charCount: 'Tecken',
    lineCount: 'Rader',
    introTitle: 'Gratis Markdown-redigerare Online',
    introText: 'Denna online Markdown-redigerare erbjuder en delad skrivupplevelse med realtidsforhandsvisning. Skriv Markdown till vanster och se den formaterade utdatan till hoger.',
    howTitle: 'Hur man anvander Markdown-redigeraren',
    step1: 'Skriv eller klistra in Markdown-text i vanstra panelen',
    step2: 'Forhandsvisningen uppdateras i realtid till hoger',
    step3: 'Anvand verktygsfaltot for att exportera HTML eller kopiera Markdown',
    step4: 'Ord-, tecken- och radraknare uppdateras automatiskt',
    faqTitle: 'Vanliga fragor',
    faq1q: 'Vad ar Markdown?',
    faq1a: 'Markdown ar ett lattviktigt markeringssprak som later dig skriva formaterad text med ren textsyntax. Det anvands for README-filer, dokumentation och blogginlagg.',
    faq2q: 'Vilken Markdown-syntax stods?',
    faq2a: 'Denna redigerare stodjer rubriker, fetstil, kursiv, lankar, bilder, kodblock, citat, listor, tabeller, horisontella linjer och inline-kod.',
    faq3q: 'Kan jag exportera till HTML?',
    faq3a: 'Ja, klicka pa "Exportera HTML" for att fa den renderade HTML-utdatan.',
    faq4q: 'Lagras mina data pa en server?',
    faq4a: 'Nej, all bearbetning sker i din webblasare. Ditt innehall skickas aldrig till nagon server.',
    faq5q: 'Kan jag anvanda detta for GitHub READMEs?',
    faq5a: 'Ja, denna redigerare anvander standard Markdown-syntax som ar kompatibel med GitHub Flavored Markdown.',
    relatedTitle: 'Relaterade verktyg',
  },
  no: {
    title: 'Markdown-redigerer Online',
    description: 'Markdown-redigerer med sanntidsforhandsvisning. Delt panel, HTML-eksport og kopiering av gjengitt utdata.',
    editorLabel: 'Markdown',
    previewLabel: 'Forhandsvisning',
    placeholder: '# Hei Verden\n\nBegynn a skrive **Markdown** her...\n\n## Funksjoner\n- Sanntidsforhandsvisning\n- HTML-eksport\n- Delt visning',
    exportHtml: 'Eksporter HTML',
    copyMd: 'Kopier Markdown',
    clear: 'Toom',
    wordCount: 'Ord',
    charCount: 'Tegn',
    lineCount: 'Linjer',
    introTitle: 'Gratis Markdown-redigerer Online',
    introText: 'Denne online Markdown-redigereren tilbyr en delt skrivopplevelse med sanntidsforhandsvisning. Skriv Markdown til venstre og se den formaterte utdataen til hoyre.',
    howTitle: 'Slik bruker du Markdown-redigereren',
    step1: 'Skriv eller lim inn Markdown-tekst i venstre panel',
    step2: 'Forhandsvisningen oppdateres i sanntid til hoyre',
    step3: 'Bruk verktoylinja for a eksportere HTML eller kopiere Markdown',
    step4: 'Ord-, tegn- og linjetellere oppdateres automatisk',
    faqTitle: 'Ofte stilte sporsmal',
    faq1q: 'Hva er Markdown?',
    faq1a: 'Markdown er et lettvekts markeringssprak som lar deg skrive formatert tekst med ren tekstsyntaks. Det brukes til README-filer, dokumentasjon og blogginnlegg.',
    faq2q: 'Hvilken Markdown-syntaks stettes?',
    faq2a: 'Denne redigereren stetter overskrifter, fet skrift, kursiv, lenker, bilder, kodeblokker, sitater, lister, tabeller, horisontale linjer og inline-kode.',
    faq3q: 'Kan jeg eksportere til HTML?',
    faq3a: 'Ja, klikk pa "Eksporter HTML" for a fa den gjengitte HTML-utdataen.',
    faq4q: 'Lagres dataene mine pa en server?',
    faq4a: 'Nei, all behandling skjer i nettleseren din. Innholdet ditt sendes aldri til noen server.',
    faq5q: 'Kan jeg bruke dette for GitHub READMEs?',
    faq5a: 'Ja, denne redigereren bruker standard Markdown-syntaks som er kompatibel med GitHub Flavored Markdown.',
    relatedTitle: 'Relaterte verktoy',
  },
  id: {
    title: 'Editor Markdown Online',
    description: 'Editor Markdown dengan pratinjau waktu nyata. Panel terpisah, ekspor HTML, dan salin hasil render.',
    editorLabel: 'Markdown',
    previewLabel: 'Pratinjau',
    placeholder: '# Halo Dunia\n\nMulai menulis **Markdown** di sini...\n\n## Fitur\n- Pratinjau waktu nyata\n- Ekspor HTML\n- Tampilan terpisah',
    exportHtml: 'Ekspor HTML',
    copyMd: 'Salin Markdown',
    clear: 'Hapus',
    wordCount: 'Kata',
    charCount: 'Karakter',
    lineCount: 'Baris',
    introTitle: 'Editor Markdown Online Gratis',
    introText: 'Editor Markdown online ini menyediakan pengalaman menulis panel terpisah dengan pratinjau waktu nyata. Tulis Markdown di kiri dan lihat output terformat di kanan.',
    howTitle: 'Cara menggunakan Editor Markdown',
    step1: 'Ketik atau tempel teks Markdown di panel kiri',
    step2: 'Pratinjau diperbarui secara waktu nyata di kanan',
    step3: 'Gunakan toolbar untuk mengekspor HTML atau menyalin Markdown',
    step4: 'Penghitung kata, karakter, dan baris diperbarui otomatis',
    faqTitle: 'Pertanyaan yang sering diajukan',
    faq1q: 'Apa itu Markdown?',
    faq1a: 'Markdown adalah bahasa markup ringan yang memungkinkan Anda menulis teks berformat dengan sintaks teks biasa. Digunakan untuk file README, dokumentasi, dan posting blog.',
    faq2q: 'Sintaks Markdown apa yang didukung?',
    faq2a: 'Editor ini mendukung heading, tebal, miring, tautan, gambar, blok kode, kutipan, daftar, tabel, garis horizontal, dan kode inline.',
    faq3q: 'Bisakah saya mengekspor ke HTML?',
    faq3a: 'Ya, klik "Ekspor HTML" untuk mendapatkan output HTML yang dirender.',
    faq4q: 'Apakah data saya disimpan di server?',
    faq4a: 'Tidak, semua pemrosesan terjadi di browser Anda. Konten Anda tidak pernah dikirim ke server manapun.',
    faq5q: 'Bisakah saya menggunakan ini untuk README GitHub?',
    faq5a: 'Ya, editor ini menggunakan sintaks Markdown standar yang kompatibel dengan GitHub Flavored Markdown.',
    relatedTitle: 'Alat terkait',
  },
  th: {
    title: 'Markdown Editor ออนไลน์',
    description: 'เครื่องมือแก้ไข Markdown พร้อมตัวอย่างแบบเรียลไทม์ แบ่งหน้าจอ ส่งออก HTML และคัดลอกผลลัพธ์',
    editorLabel: 'Markdown',
    previewLabel: 'ตัวอย่าง',
    placeholder: '# สวัสดีชาวโลก\n\nเริ่มเขียน **Markdown** ที่นี่...\n\n## คุณสมบัติ\n- ตัวอย่างแบบเรียลไทม์\n- ส่งออก HTML\n- มุมมองแบ่งหน้าจอ',
    exportHtml: 'ส่งออก HTML',
    copyMd: 'คัดลอก Markdown',
    clear: 'ล้าง',
    wordCount: 'คำ',
    charCount: 'ตัวอักษร',
    lineCount: 'บรรทัด',
    introTitle: 'Markdown Editor ออนไลน์ฟรี',
    introText: 'เครื่องมือแก้ไข Markdown ออนไลน์นี้มีประสบการณ์การเขียนแบบแบ่งหน้าจอพร้อมตัวอย่างแบบเรียลไทม์ เขียน Markdown ด้านซ้ายและดูผลลัพธ์ที่จัดรูปแบบด้านขวา',
    howTitle: 'วิธีใช้ Markdown Editor',
    step1: 'พิมพ์หรือวางข้อความ Markdown ในแผงด้านซ้าย',
    step2: 'ตัวอย่างอัปเดตแบบเรียลไทม์ด้านขวา',
    step3: 'ใช้แถบเครื่องมือเพื่อส่งออก HTML หรือคัดลอก Markdown',
    step4: 'ตัวนับคำ ตัวอักษร และบรรทัดอัปเดตอัตโนมัติ',
    faqTitle: 'คำถามที่พบบ่อย',
    faq1q: 'Markdown คืออะไร?',
    faq1a: 'Markdown เป็นภาษามาร์กอัปน้ำหนักเบาที่ช่วยให้คุณเขียนข้อความที่จัดรูปแบบด้วยไวยากรณ์ข้อความธรรมดา ใช้สำหรับไฟล์ README เอกสาร และบล็อกโพสต์',
    faq2q: 'รองรับไวยากรณ์ Markdown ใดบ้าง?',
    faq2a: 'เครื่องมือนี้รองรับหัวข้อ ตัวหนา ตัวเอียง ลิงก์ รูปภาพ บล็อกโค้ด การอ้างอิง รายการ ตาราง เส้นแนวนอน และโค้ดอินไลน์',
    faq3q: 'สามารถส่งออกเป็น HTML ได้ไหม?',
    faq3a: 'ได้ คลิก "ส่งออก HTML" เพื่อรับผลลัพธ์ HTML ที่เรนเดอร์แล้ว',
    faq4q: 'ข้อมูลของฉันถูกเก็บบนเซิร์ฟเวอร์หรือไม่?',
    faq4a: 'ไม่ การประมวลผลทั้งหมดเกิดขึ้นในเบราว์เซอร์ของคุณ เนื้อหาของคุณจะไม่ถูกส่งไปยังเซิร์ฟเวอร์ใดๆ',
    faq5q: 'สามารถใช้สำหรับ GitHub README ได้ไหม?',
    faq5a: 'ได้ เครื่องมือนี้ใช้ไวยากรณ์ Markdown มาตรฐานที่เข้ากันได้กับ GitHub Flavored Markdown',
    relatedTitle: 'เครื่องมือที่เกี่ยวข้อง',
  },
};

function parseMarkdown(md: string): string {
  let html = md
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  // Code blocks
  html = html.replace(/```(\w*)\n([\s\S]*?)```/g, (_m, _lang, code) =>
    `<pre style="background:var(--bg-input);padding:12px;border-radius:8px;overflow-x:auto;border:1px solid var(--border-color);font-size:13px"><code>${code.trim()}</code></pre>`
  );

  // Inline code
  html = html.replace(/`([^`]+)`/g, '<code style="background:var(--bg-input);padding:2px 6px;border-radius:4px;font-size:13px">$1</code>');

  // Tables
  html = html.replace(/^(\|.+\|)\n(\|[-| :]+\|)\n((?:\|.+\|\n?)*)/gm, (_m, header: string, _sep: string, body: string) => {
    const ths = header.split('|').filter((c: string) => c.trim()).map((c: string) => `<th style="border:1px solid var(--border-color);padding:8px 12px;text-align:left">${c.trim()}</th>`).join('');
    const rows = body.trim().split('\n').map((row: string) => {
      const tds = row.split('|').filter((c: string) => c.trim()).map((c: string) => `<td style="border:1px solid var(--border-color);padding:8px 12px">${c.trim()}</td>`).join('');
      return `<tr>${tds}</tr>`;
    }).join('');
    return `<table style="border-collapse:collapse;width:100%;margin:12px 0"><thead><tr>${ths}</tr></thead><tbody>${rows}</tbody></table>`;
  });

  // Headings
  html = html.replace(/^######\s+(.+)$/gm, '<h6 style="font-size:13px;margin:16px 0 8px">$1</h6>');
  html = html.replace(/^#####\s+(.+)$/gm, '<h5 style="font-size:14px;margin:16px 0 8px">$1</h5>');
  html = html.replace(/^####\s+(.+)$/gm, '<h4 style="font-size:15px;margin:16px 0 8px">$1</h4>');
  html = html.replace(/^###\s+(.+)$/gm, '<h3 style="font-size:17px;margin:16px 0 8px;font-weight:600">$1</h3>');
  html = html.replace(/^##\s+(.+)$/gm, '<h2 style="font-size:20px;margin:20px 0 8px;font-weight:700">$1</h2>');
  html = html.replace(/^#\s+(.+)$/gm, '<h1 style="font-size:24px;margin:20px 0 10px;font-weight:700">$1</h1>');

  // Horizontal rule
  html = html.replace(/^---$/gm, '<hr style="border:none;border-top:1px solid var(--border-color);margin:16px 0" />');

  // Blockquote
  html = html.replace(/^&gt;\s+(.+)$/gm, '<blockquote style="border-left:3px solid var(--accent-blue);padding:8px 16px;margin:12px 0;color:var(--text-secondary)">$1</blockquote>');

  // Bold and italic
  html = html.replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>');
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');

  // Images
  html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" style="max-width:100%;border-radius:4px" />');

  // Links
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" style="color:var(--accent-blue);text-decoration:underline" target="_blank" rel="noopener">$1</a>');

  // Unordered lists
  html = html.replace(/^[-*]\s+(.+)$/gm, '<li style="margin:4px 0">$1</li>');
  html = html.replace(/((?:<li[^>]*>.*<\/li>\n?)+)/g, '<ul style="padding-left:20px;margin:8px 0">$1</ul>');

  // Ordered lists
  html = html.replace(/^\d+\.\s+(.+)$/gm, '<li style="margin:4px 0">$1</li>');

  // Paragraphs
  html = html.replace(/^(?!<[a-z])((?!^\s*$).+)$/gm, '<p style="margin:8px 0;line-height:1.7">$1</p>');

  // Clean up empty lines
  html = html.replace(/\n{2,}/g, '\n');

  return html;
}

export default function MarkdownEditorOnline() {
  const { lang } = useLang();
  const t = ui[lang] || ui.en;
  const defaultMd = t.placeholder;
  const [markdown, setMarkdown] = useState(defaultMd);
  const [htmlOutput, setHtmlOutput] = useState('');
  const [showHtmlExport, setShowHtmlExport] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);

  const rendered = parseMarkdown(markdown);

  const wordCount = markdown.trim() ? markdown.trim().split(/\s+/).length : 0;
  const charCount = markdown.length;
  const lineCount = markdown.split('\n').length;

  const handleExportHtml = useCallback(() => {
    setHtmlOutput(rendered);
    setShowHtmlExport(true);
  }, [rendered]);

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
    <ToolLayout title={t.title} description={t.description} toolId="markdown-editor-online">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* Toolbar */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 12, flexWrap: 'wrap', alignItems: 'center' }}>
        <button onClick={handleExportHtml} className="btn btn-primary" style={{ fontSize: 13 }}>{t.exportHtml}</button>
        <CopyButton text={markdown} label={t.copyMd} />
        <button onClick={() => { setMarkdown(''); setShowHtmlExport(false); }} className="btn btn-secondary" style={{ fontSize: 13 }}>{t.clear}</button>
        <div style={{ marginLeft: 'auto', fontSize: 12, color: 'var(--text-secondary)', display: 'flex', gap: 16 }}>
          <span>{t.wordCount}: {wordCount}</span>
          <span>{t.charCount}: {charCount}</span>
          <span>{t.lineCount}: {lineCount}</span>
        </div>
      </div>

      {/* Split pane editor */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16, minHeight: 400 }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label style={{ fontSize: 13, fontWeight: 600, marginBottom: 6 }}>{t.editorLabel}</label>
          <textarea
            value={markdown}
            onChange={e => setMarkdown(e.target.value)}
            style={{
              flex: 1, minHeight: 400, fontFamily: 'monospace', fontSize: 13, lineHeight: 1.6,
              padding: 16, borderRadius: 10, border: '1px solid var(--border-color)',
              background: 'var(--bg-card)', color: 'var(--text-primary)', resize: 'vertical',
            }}
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label style={{ fontSize: 13, fontWeight: 600, marginBottom: 6 }}>{t.previewLabel}</label>
          <div
            ref={previewRef}
            dangerouslySetInnerHTML={{ __html: rendered }}
            style={{
              flex: 1, minHeight: 400, padding: 16, borderRadius: 10,
              border: '1px solid var(--border-color)', background: 'var(--bg-card)',
              overflow: 'auto', fontSize: 14, lineHeight: 1.7, color: 'var(--text-primary)',
            }}
          />
        </div>
      </div>

      {/* HTML Export Panel */}
      {showHtmlExport && (
        <div style={{ marginBottom: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <label style={{ fontSize: 13, fontWeight: 600 }}>HTML</label>
            <CopyButton text={htmlOutput} />
          </div>
          <textarea
            value={htmlOutput}
            readOnly
            style={{ minHeight: 150, fontFamily: 'monospace', fontSize: 12 }}
          />
        </div>
      )}

      {/* SEO Content */}
      <div style={{ marginTop: 30, paddingTop: 24, borderTop: '1px solid var(--border-color)' }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 12 }}>{t.introTitle}</h2>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 20 }}>{t.introText}</p>

        <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{t.howTitle}</h3>
        <ol style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.8, paddingLeft: 20, marginBottom: 24 }}>
          <li>{t.step1}</li>
          <li>{t.step2}</li>
          <li>{t.step3}</li>
          <li>{t.step4}</li>
        </ol>

        <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{t.faqTitle}</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 24 }}>
          {[
            { q: t.faq1q, a: t.faq1a },
            { q: t.faq2q, a: t.faq2a },
            { q: t.faq3q, a: t.faq3a },
            { q: t.faq4q, a: t.faq4a },
            { q: t.faq5q, a: t.faq5a },
          ].map((faq, idx) => (
            <details key={idx} style={{ border: '1px solid var(--border-color)', borderRadius: 8, overflow: 'hidden', background: 'var(--bg-input)' }}>
              <summary style={{ padding: '14px 16px', cursor: 'pointer', fontSize: 14, fontWeight: 600, color: 'var(--text-primary)' }}>{faq.q}</summary>
              <div style={{ padding: '0 16px 14px', fontSize: 13, lineHeight: 1.7, color: 'var(--text-secondary)' }}>{faq.a}</div>
            </details>
          ))}
        </div>

        <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{t.relatedTitle}</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {[
            { href: `/${lang}/tools/json-formatter`, label: 'JSON Formatter' },
            { href: `/${lang}/tools/html-entity`, label: 'HTML Entity Encoder' },
            { href: `/${lang}/tools/escape-unescape`, label: 'Escape/Unescape' },
            { href: `/${lang}/tools/lorem-ipsum-generator`, label: 'Lorem Ipsum Generator' },
          ].map((link) => (
            <Link key={link.href} href={link.href}
              style={{ display: 'inline-block', padding: '8px 16px', borderRadius: 8, border: '1px solid var(--border-color)', fontSize: 13, color: 'var(--accent-blue)', textDecoration: 'none', background: 'var(--bg-input)' }}>
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </ToolLayout>
  );
}
