'use client';

import { useState, useMemo } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import Link from 'next/link';
import { useLang } from '@/i18n/LangContext';

const ui: Record<string, Record<string, string>> = {
  en: {
    title: 'String Utilities', description: 'Trim, reverse, capitalize, count words/chars/lines, find/replace, and more string manipulation tools.',
    inputLabel: 'Input Text', outputLabel: 'Output', statsLabel: 'Statistics',
    chars: 'Characters', words: 'Words', lines: 'Lines', bytes: 'Bytes',
    trim: 'Trim', reverse: 'Reverse', uppercase: 'UPPERCASE', lowercase: 'lowercase',
    titleCase: 'Title Case', camelCase: 'camelCase', snakeCase: 'snake_case', kebabCase: 'kebab-case',
    removeSpaces: 'Remove Extra Spaces', removeNewlines: 'Remove Newlines', removeDuplicates: 'Remove Duplicate Lines',
    sortLines: 'Sort Lines A-Z', sortLinesDesc: 'Sort Lines Z-A', shuffleLines: 'Shuffle Lines',
    countChars: 'Count Chars', reverseLines: 'Reverse Lines', addLineNumbers: 'Add Line Numbers',
    findLabel: 'Find', replaceLabel: 'Replace', replaceBtn: 'Replace All', regexMode: 'Regex mode',
    clear: 'Clear', loadSample: 'Load Sample', copyOutput: 'Copy Output',
    introTitle: 'Free Online String Utilities',
    introText: 'A comprehensive set of string manipulation tools for developers. Instantly transform text with one-click operations: change case (UPPER, lower, Title, camelCase, snake_case, kebab-case), clean up whitespace, sort and deduplicate lines, find and replace with optional regex support, and get character/word/line/byte statistics. All processing happens in your browser with no data sent to servers.',
    tipTitle: 'String Manipulation Tips',
    tip1: 'Use camelCase for JavaScript variable names and function parameters',
    tip2: 'Use snake_case for Python variable names and database column names',
    tip3: 'Use kebab-case for CSS class names and HTML attributes',
    tip4: 'Use Title Case for headings, titles, and proper nouns',
    tip5: 'Remove duplicate lines to clean up log files or deduplicate data',
    faqTitle: 'Frequently Asked Questions',
    faq1q: 'What is the difference between camelCase and PascalCase?',
    faq1a: 'camelCase starts with a lowercase letter and capitalizes each subsequent word: myVariableName. PascalCase (also called UpperCamelCase) capitalizes every word including the first: MyClassName. camelCase is common for JavaScript variables, PascalCase for class names and React components.',
    faq2q: 'How does the find and replace work?',
    faq2a: 'Type your search term in the Find field and your replacement in the Replace field, then click Replace All. In regex mode, you can use regular expressions for powerful pattern matching. For example, \\d+ matches any sequence of digits, and \\n matches newlines.',
    faq3q: 'What does byte count measure?',
    faq3a: 'Byte count measures the number of bytes the text occupies when encoded as UTF-8. ASCII characters are 1 byte each. Most European characters with accents are 2 bytes. Chinese, Japanese, and Korean characters are typically 3 bytes each. Emojis are usually 4 bytes.',
    faq4q: 'How does Remove Duplicate Lines work?',
    faq4a: 'Remove Duplicate Lines keeps only the first occurrence of each unique line, removing subsequent duplicates. The comparison is case-sensitive, so "Hello" and "hello" are treated as different lines. Empty lines are also deduplicated.',
    faq5q: 'Can I process large amounts of text?',
    faq5a: 'Yes, all processing is done in your browser using JavaScript. For very large texts (millions of characters), there may be a brief delay as the browser processes the text. For production use with very large files, consider a server-side or command-line tool.',
    relatedTitle: 'Related Tools',
  },
  zh: {
    title: '字符串工具', description: '修剪、反转、大写、统计词数/字符/行数、查找替换等字符串处理工具。',
    inputLabel: '输入文本', outputLabel: '输出', statsLabel: '统计信息',
    chars: '字符', words: '单词', lines: '行', bytes: '字节',
    trim: '修剪', reverse: '反转', uppercase: '大写', lowercase: '小写',
    titleCase: '标题大小写', camelCase: '驼峰命名', snakeCase: '下划线命名', kebabCase: '连字符命名',
    removeSpaces: '删除多余空格', removeNewlines: '删除换行', removeDuplicates: '删除重复行',
    sortLines: '升序排序', sortLinesDesc: '降序排序', shuffleLines: '随机排序',
    countChars: '计数字符', reverseLines: '反转行', addLineNumbers: '添加行号',
    findLabel: '查找', replaceLabel: '替换', replaceBtn: '全部替换', regexMode: '正则模式',
    clear: '清除', loadSample: '加载示例', copyOutput: '复制输出',
    introTitle: '免费在线字符串工具', introText: '为开发者提供全面的字符串处理工具。',
    tipTitle: '字符串处理技巧', tip1: '使用 camelCase 命名 JavaScript 变量', tip2: '使用 snake_case 命名 Python 变量和数据库字段',
    tip3: '使用 kebab-case 命名 CSS 类和 HTML 属性', tip4: '使用标题大小写处理标题和专有名词', tip5: '删除重复行以清理日志文件或去除重复数据',
    faqTitle: '常见问题', faq1q: 'camelCase 和 PascalCase 有什么区别？', faq1a: 'camelCase 以小写字母开头，PascalCase 每个单词都大写。',
    faq2q: '查找替换如何工作？', faq2a: '输入查找词和替换词，点击全部替换。支持正则表达式模式。',
    faq3q: '字节数统计什么？', faq3a: 'UTF-8 编码的字节数。ASCII 字符 1 字节，中文字符通常 3 字节。',
    faq4q: '删除重复行如何工作？', faq4a: '只保留每个唯一行的第一次出现，区分大小写。',
    faq5q: '可以处理大量文本吗？', faq5a: '是的，所有处理在浏览器中完成，超大文本可能有短暂延迟。',
    relatedTitle: '相关工具',
  },
  fr: {
    title: 'Utilitaires de Chaines', description: 'Couper, inverser, capitaliser, compter mots/caracteres/lignes et plus.',
    inputLabel: 'Texte d\'entree', outputLabel: 'Sortie', statsLabel: 'Statistiques',
    chars: 'Caracteres', words: 'Mots', lines: 'Lignes', bytes: 'Octets',
    trim: 'Couper', reverse: 'Inverser', uppercase: 'MAJUSCULES', lowercase: 'minuscules',
    titleCase: 'Titre', camelCase: 'camelCase', snakeCase: 'snake_case', kebabCase: 'kebab-case',
    removeSpaces: 'Supprimer espaces', removeNewlines: 'Supprimer sauts de ligne', removeDuplicates: 'Supprimer doublons',
    sortLines: 'Trier A-Z', sortLinesDesc: 'Trier Z-A', shuffleLines: 'Melanger',
    countChars: 'Compter chars', reverseLines: 'Inverser lignes', addLineNumbers: 'Ajouter numeros',
    findLabel: 'Rechercher', replaceLabel: 'Remplacer', replaceBtn: 'Tout remplacer', regexMode: 'Mode regex',
    clear: 'Effacer', loadSample: 'Charger exemple', copyOutput: 'Copier sortie',
    introTitle: 'Utilitaires de chaines gratuits', introText: 'Un ensemble complet d\'outils de manipulation de chaines pour les developpeurs.',
    tipTitle: 'Conseils manipulation de chaines', tip1: 'Utilisez camelCase pour les variables JavaScript', tip2: 'Utilisez snake_case pour les variables Python',
    tip3: 'Utilisez kebab-case pour les classes CSS', tip4: 'Utilisez Title Case pour les titres', tip5: 'Supprimez les doublons pour nettoyer les fichiers journaux',
    faqTitle: 'Questions frequentes', faq1q: 'Difference entre camelCase et PascalCase?', faq1a: 'camelCase commence en minuscule, PascalCase capitalise chaque mot.',
    faq2q: 'Comment fonctionne le remplacement?', faq2a: 'Entrez le terme et le remplacement, cliquez sur Tout remplacer. Mode regex disponible.',
    faq3q: 'Que mesure le nombre d\'octets?', faq3a: 'Octets en UTF-8. ASCII = 1 octet, caracteres europeens = 2 octets.',
    faq4q: 'Comment supprimer les doublons?', faq4a: 'Conserve la premiere occurrence de chaque ligne unique, sensible a la casse.',
    faq5q: 'Puis-je traiter de grands textes?', faq5a: 'Oui, tout est traite dans le navigateur. Grands textes peuvent etre lents.',
    relatedTitle: 'Outils connexes',
  },
  de: {
    title: 'Zeichenketten-Dienstprogramme', description: 'Kuerzen, Umkehren, Grossschreiben, Woerter/Zeichen zaehlen und mehr.',
    inputLabel: 'Eingabetext', outputLabel: 'Ausgabe', statsLabel: 'Statistiken',
    chars: 'Zeichen', words: 'Woerter', lines: 'Zeilen', bytes: 'Bytes',
    trim: 'Kuerzen', reverse: 'Umkehren', uppercase: 'GROSSBUCHSTABEN', lowercase: 'kleinbuchstaben',
    titleCase: 'Titelschreibung', camelCase: 'camelCase', snakeCase: 'snake_case', kebabCase: 'kebab-case',
    removeSpaces: 'Extraspaces entfernen', removeNewlines: 'Zeilenumbrueche entfernen', removeDuplicates: 'Duplikate entfernen',
    sortLines: 'Zeilen A-Z', sortLinesDesc: 'Zeilen Z-A', shuffleLines: 'Mischen',
    countChars: 'Zeichen zaehlen', reverseLines: 'Zeilen umkehren', addLineNumbers: 'Zeilennummern',
    findLabel: 'Suchen', replaceLabel: 'Ersetzen', replaceBtn: 'Alle ersetzen', regexMode: 'Regex-Modus',
    clear: 'Loeschen', loadSample: 'Beispiel laden', copyOutput: 'Ausgabe kopieren',
    introTitle: 'Kostenlose Zeichenketten-Dienstprogramme', introText: 'Umfassende Textmanipulations-Tools fuer Entwickler.',
    tipTitle: 'Tipps zur Textmanipulation', tip1: 'camelCase fuer JavaScript-Variablen', tip2: 'snake_case fuer Python-Variablen',
    tip3: 'kebab-case fuer CSS-Klassen', tip4: 'Titelschreibung fuer Ueberschriften', tip5: 'Duplikate entfernen fuer Log-Bereinigung',
    faqTitle: 'Haeufig gestellte Fragen', faq1q: 'Unterschied camelCase vs PascalCase?', faq1a: 'camelCase beginnt klein, PascalCase jedes Wort gross.',
    faq2q: 'Wie funktioniert Suchen und Ersetzen?', faq2a: 'Suchbegriff eingeben, ersetzen klicken. Regex-Modus verfuegbar.',
    faq3q: 'Was misst die Byte-Anzahl?', faq3a: 'Bytes in UTF-8. ASCII = 1 Byte, europaeische Zeichen = 2 Bytes.',
    faq4q: 'Wie werden Duplikate entfernt?', faq4a: 'Behaelt das erste Vorkommen jeder eindeutigen Zeile.',
    faq5q: 'Kann ich grosse Texte verarbeiten?', faq5a: 'Ja, alles im Browser. Sehr grosse Texte koennen langsam sein.',
    relatedTitle: 'Verwandte Tools',
  },
  es: {
    title: 'Utilidades de Cadenas', description: 'Recortar, invertir, capitalizar, contar palabras/caracteres/lineas y mas.',
    inputLabel: 'Texto de entrada', outputLabel: 'Salida', statsLabel: 'Estadisticas',
    chars: 'Caracteres', words: 'Palabras', lines: 'Lineas', bytes: 'Bytes',
    trim: 'Recortar', reverse: 'Invertir', uppercase: 'MAYUSCULAS', lowercase: 'minusculas',
    titleCase: 'Titulo', camelCase: 'camelCase', snakeCase: 'snake_case', kebabCase: 'kebab-case',
    removeSpaces: 'Quitar espacios extra', removeNewlines: 'Quitar saltos de linea', removeDuplicates: 'Quitar duplicados',
    sortLines: 'Ordenar A-Z', sortLinesDesc: 'Ordenar Z-A', shuffleLines: 'Mezclar',
    countChars: 'Contar chars', reverseLines: 'Invertir lineas', addLineNumbers: 'Numerar lineas',
    findLabel: 'Buscar', replaceLabel: 'Reemplazar', replaceBtn: 'Reemplazar todo', regexMode: 'Modo regex',
    clear: 'Limpiar', loadSample: 'Cargar ejemplo', copyOutput: 'Copiar salida',
    introTitle: 'Utilidades de cadenas gratuitas', introText: 'Un conjunto completo de herramientas de manipulacion de cadenas para desarrolladores.',
    tipTitle: 'Consejos manipulacion de cadenas', tip1: 'camelCase para variables JavaScript', tip2: 'snake_case para variables Python',
    tip3: 'kebab-case para clases CSS', tip4: 'Title Case para titulos', tip5: 'Quita duplicados para limpiar logs',
    faqTitle: 'Preguntas frecuentes', faq1q: 'Diferencia camelCase vs PascalCase?', faq1a: 'camelCase empieza en minuscula, PascalCase cada palabra en mayuscula.',
    faq2q: 'Como funciona buscar y reemplazar?', faq2a: 'Ingresa termino y reemplazo, haz clic en Reemplazar todo. Modo regex disponible.',
    faq3q: 'Que mide el conteo de bytes?', faq3a: 'Bytes en UTF-8. ASCII = 1 byte, caracteres europeos = 2 bytes.',
    faq4q: 'Como funciona quitar duplicados?', faq4a: 'Mantiene la primera ocurrencia de cada linea unica.',
    faq5q: 'Puedo procesar textos grandes?', faq5a: 'Si, todo en el navegador. Textos muy grandes pueden ser lentos.',
    relatedTitle: 'Herramientas relacionadas',
  },
  pt: {
    title: 'Utilitarios de String', description: 'Cortar, reverter, capitalizar, contar palavras/caracteres/linhas e mais.',
    inputLabel: 'Texto de entrada', outputLabel: 'Saida', statsLabel: 'Estatisticas',
    chars: 'Caracteres', words: 'Palavras', lines: 'Linhas', bytes: 'Bytes',
    trim: 'Cortar', reverse: 'Reverter', uppercase: 'MAIUSCULAS', lowercase: 'minusculas',
    titleCase: 'Titulo', camelCase: 'camelCase', snakeCase: 'snake_case', kebabCase: 'kebab-case',
    removeSpaces: 'Remover espacos extra', removeNewlines: 'Remover quebras', removeDuplicates: 'Remover duplicatas',
    sortLines: 'Ordenar A-Z', sortLinesDesc: 'Ordenar Z-A', shuffleLines: 'Embaralhar',
    countChars: 'Contar chars', reverseLines: 'Reverter linhas', addLineNumbers: 'Numerar linhas',
    findLabel: 'Localizar', replaceLabel: 'Substituir', replaceBtn: 'Substituir tudo', regexMode: 'Modo regex',
    clear: 'Limpar', loadSample: 'Carregar exemplo', copyOutput: 'Copiar saida',
    introTitle: 'Utilitarios de string gratuitos', introText: 'Um conjunto abrangente de ferramentas de manipulacao de strings para desenvolvedores.',
    tipTitle: 'Dicas de manipulacao de strings', tip1: 'camelCase para variaveis JavaScript', tip2: 'snake_case para variaveis Python',
    tip3: 'kebab-case para classes CSS', tip4: 'Title Case para titulos', tip5: 'Remova duplicatas para limpar logs',
    faqTitle: 'Perguntas frequentes', faq1q: 'Diferenca entre camelCase e PascalCase?', faq1a: 'camelCase comeca em minuscula, PascalCase cada palavra em maiuscula.',
    faq2q: 'Como funciona localizar e substituir?', faq2a: 'Digite o termo e substituto, clique em Substituir tudo. Modo regex disponivel.',
    faq3q: 'O que mede a contagem de bytes?', faq3a: 'Bytes em UTF-8. ASCII = 1 byte, caracteres europeus = 2 bytes.',
    faq4q: 'Como remover duplicatas funciona?', faq4a: 'Mantém a primeira ocorrência de cada linha única.',
    faq5q: 'Posso processar textos grandes?', faq5a: 'Sim, tudo no navegador. Textos muito grandes podem ser lentos.',
    relatedTitle: 'Ferramentas relacionadas',
  },
  it: {
    title: 'Utilita Stringhe', description: 'Taglia, inverti, capitalizza, conta parole/caratteri/righe e altro.',
    inputLabel: 'Testo di input', outputLabel: 'Output', statsLabel: 'Statistiche',
    chars: 'Caratteri', words: 'Parole', lines: 'Righe', bytes: 'Byte',
    trim: 'Ritaglia', reverse: 'Inverti', uppercase: 'MAIUSCOLO', lowercase: 'minuscolo',
    titleCase: 'Titolo', camelCase: 'camelCase', snakeCase: 'snake_case', kebabCase: 'kebab-case',
    removeSpaces: 'Rimuovi spazi extra', removeNewlines: 'Rimuovi a capo', removeDuplicates: 'Rimuovi duplicati',
    sortLines: 'Ordina A-Z', sortLinesDesc: 'Ordina Z-A', shuffleLines: 'Mescola',
    countChars: 'Conta chars', reverseLines: 'Inverti righe', addLineNumbers: 'Aggiungi numeri',
    findLabel: 'Trova', replaceLabel: 'Sostituisci', replaceBtn: 'Sostituisci tutto', regexMode: 'Modalita regex',
    clear: 'Cancella', loadSample: 'Carica esempio', copyOutput: 'Copia output',
    introTitle: 'Utilita stringhe gratuite', introText: 'Un set completo di strumenti di manipolazione delle stringhe per sviluppatori.',
    tipTitle: 'Suggerimenti manipolazione stringhe', tip1: 'camelCase per variabili JavaScript', tip2: 'snake_case per variabili Python',
    tip3: 'kebab-case per classi CSS', tip4: 'Title Case per titoli', tip5: 'Rimuovi duplicati per pulire i log',
    faqTitle: 'Domande frequenti', faq1q: 'Differenza tra camelCase e PascalCase?', faq1a: 'camelCase inizia in minuscolo, PascalCase ogni parola in maiuscolo.',
    faq2q: 'Come funziona trova e sostituisci?', faq2a: 'Inserisci termine e sostituzione, clicca Sostituisci tutto. Modalita regex disponibile.',
    faq3q: 'Cosa misura il conteggio dei byte?', faq3a: 'Byte in UTF-8. ASCII = 1 byte, caratteri europei = 2 byte.',
    faq4q: 'Come funziona rimuovi duplicati?', faq4a: 'Mantiene la prima occorrenza di ogni riga unica.',
    faq5q: 'Posso elaborare testi grandi?', faq5a: 'Si, tutto nel browser. Testi molto grandi possono essere lenti.',
    relatedTitle: 'Strumenti correlati',
  },
  nl: {
    title: 'String Hulpmiddelen', description: 'Trimmen, omdraaien, kapitaliseren, woorden/tekens/regels tellen en meer.',
    inputLabel: 'Invoertekst', outputLabel: 'Uitvoer', statsLabel: 'Statistieken',
    chars: 'Tekens', words: 'Woorden', lines: 'Regels', bytes: 'Bytes',
    trim: 'Trimmen', reverse: 'Omdraaien', uppercase: 'HOOFDLETTERS', lowercase: 'kleine letters',
    titleCase: 'Titelstijl', camelCase: 'camelCase', snakeCase: 'snake_case', kebabCase: 'kebab-case',
    removeSpaces: 'Extra spaties verwijderen', removeNewlines: 'Regeleinden verwijderen', removeDuplicates: 'Duplicaten verwijderen',
    sortLines: 'Sorteren A-Z', sortLinesDesc: 'Sorteren Z-A', shuffleLines: 'Schudden',
    countChars: 'Tekens tellen', reverseLines: 'Regels omkeren', addLineNumbers: 'Regelnummers',
    findLabel: 'Zoeken', replaceLabel: 'Vervangen', replaceBtn: 'Alles vervangen', regexMode: 'Regex-modus',
    clear: 'Wissen', loadSample: 'Voorbeeld laden', copyOutput: 'Uitvoer kopieren',
    introTitle: 'Gratis string hulpmiddelen', introText: 'Een uitgebreide set tekstmanipulatietools voor ontwikkelaars.',
    tipTitle: 'Tips tekstmanipulatie', tip1: 'camelCase voor JavaScript-variabelen', tip2: 'snake_case voor Python-variabelen',
    tip3: 'kebab-case voor CSS-klassen', tip4: 'Titelstijl voor koppen', tip5: 'Duplicaten verwijderen om logbestanden op te schonen',
    faqTitle: 'Veelgestelde vragen', faq1q: 'Verschil camelCase vs PascalCase?', faq1a: 'camelCase begint met kleine letter, PascalCase elk woord met hoofdletter.',
    faq2q: 'Hoe werkt zoeken en vervangen?', faq2a: 'Voer zoekterm en vervanging in, klik op Alles vervangen. Regex-modus beschikbaar.',
    faq3q: 'Wat meet het byte-aantal?', faq3a: 'Bytes in UTF-8. ASCII = 1 byte, Europese tekens = 2 bytes.',
    faq4q: 'Hoe werkt duplicaten verwijderen?', faq4a: 'Behoudt de eerste instantie van elke unieke regel.',
    faq5q: 'Kan ik grote teksten verwerken?', faq5a: 'Ja, alles in de browser. Zeer grote teksten kunnen traag zijn.',
    relatedTitle: 'Gerelateerde tools',
  },
  pl: {
    title: 'Narzedzia do Ciagow', description: 'Przycinanie, odwracanie, wielkie litery, liczenie slow/znakow/wierszy i wiecej.',
    inputLabel: 'Tekst wejsciowy', outputLabel: 'Wyjscie', statsLabel: 'Statystyki',
    chars: 'Znaki', words: 'Slowa', lines: 'Wiersze', bytes: 'Bajty',
    trim: 'Przytnij', reverse: 'Odwroc', uppercase: 'WIELKIE LITERY', lowercase: 'male litery',
    titleCase: 'Tytul', camelCase: 'camelCase', snakeCase: 'snake_case', kebabCase: 'kebab-case',
    removeSpaces: 'Usun dodatkowe spacje', removeNewlines: 'Usun znaki nowej linii', removeDuplicates: 'Usun duplikaty',
    sortLines: 'Sortuj A-Z', sortLinesDesc: 'Sortuj Z-A', shuffleLines: 'Losuj',
    countChars: 'Licz znaki', reverseLines: 'Odwroc wiersze', addLineNumbers: 'Numeruj wiersze',
    findLabel: 'Znajdz', replaceLabel: 'Zastap', replaceBtn: 'Zastap wszystko', regexMode: 'Tryb regex',
    clear: 'Wyczysc', loadSample: 'Zaladuj przyklad', copyOutput: 'Kopiuj wyjscie',
    introTitle: 'Darmowe narzedzia do ciagow', introText: 'Kompleksowy zestaw narzedzi do manipulacji tekstem dla programistow.',
    tipTitle: 'Wskazowki manipulacji tekstem', tip1: 'camelCase dla zmiennych JavaScript', tip2: 'snake_case dla zmiennych Python',
    tip3: 'kebab-case dla klas CSS', tip4: 'Title Case dla tytulow', tip5: 'Usun duplikaty aby oczyscic logi',
    faqTitle: 'Czesto zadawane pytania', faq1q: 'Roznica camelCase vs PascalCase?', faq1a: 'camelCase zaczyna malymi literami, PascalCase kazde slowo z wielkiej.',
    faq2q: 'Jak dziala znajdz i zastap?', faq2a: 'Wpisz szukany termin i zamiennik, kliknij Zastap wszystko. Tryb regex dostepny.',
    faq3q: 'Co mierzy liczba bajtow?', faq3a: 'Bajty w UTF-8. ASCII = 1 bajt, znaki europejskie = 2 bajty.',
    faq4q: 'Jak dziala usuwanie duplikatow?', faq4a: 'Zachowuje pierwsze wystapienie kazdego unikalnego wiersza.',
    faq5q: 'Czy moge przetwarzyc duze teksty?', faq5a: 'Tak, wszystko w przegladarce. Bardzo duze teksty moga byc wolne.',
    relatedTitle: 'Powiazane narzedzia',
  },
  sv: {
    title: 'Strangverktyg', description: 'Trimma, vanda, kapitalisera, rakna ord/tecken/rader och mer.',
    inputLabel: 'Indata', outputLabel: 'Utdata', statsLabel: 'Statistik',
    chars: 'Tecken', words: 'Ord', lines: 'Rader', bytes: 'Byte',
    trim: 'Trimma', reverse: 'Vanda', uppercase: 'VERSALER', lowercase: 'gemener',
    titleCase: 'Titelstil', camelCase: 'camelCase', snakeCase: 'snake_case', kebabCase: 'kebab-case',
    removeSpaces: 'Ta bort extra mellanslag', removeNewlines: 'Ta bort radbrytningar', removeDuplicates: 'Ta bort duplikat',
    sortLines: 'Sortera A-O', sortLinesDesc: 'Sortera O-A', shuffleLines: 'Blanda',
    countChars: 'Raekna tecken', reverseLines: 'Vanda rader', addLineNumbers: 'Lagg till radnummer',
    findLabel: 'Hitta', replaceLabel: 'Ersaett', replaceBtn: 'Ersaett allt', regexMode: 'Regex-laege',
    clear: 'Rensa', loadSample: 'Ladda exempel', copyOutput: 'Kopiera utdata',
    introTitle: 'Gratis strangverktyg', introText: 'En komplett uppsattning textmanipuleringsverktyg for utvecklare.',
    tipTitle: 'Tips for textmanipulation', tip1: 'camelCase for JavaScript-variabler', tip2: 'snake_case for Python-variabler',
    tip3: 'kebab-case for CSS-klasser', tip4: 'Titelstil for rubriker', tip5: 'Ta bort duplikat for att rensa loggar',
    faqTitle: 'Vanliga fragor', faq1q: 'Skillnad mellan camelCase och PascalCase?', faq1a: 'camelCase boerjar med liten bokstav, PascalCase varje ord med stor.',
    faq2q: 'Hur fungerar hitta och ersaett?', faq2a: 'Ange sokterm och ersaettning, klicka pa Ersaett allt. Regex-laege tillgaengligt.',
    faq3q: 'Vad mater byte-raeningen?', faq3a: 'Byte i UTF-8. ASCII = 1 byte, europeiska tecken = 2 byte.',
    faq4q: 'Hur fungerar ta bort duplikat?', faq4a: 'Behaaller den foersta foerekomsten av varje unik rad.',
    faq5q: 'Kan jag behandla stora texter?', faq5a: 'Ja, allt i webblaesaren. Mycket stora texter kan vara langsamma.',
    relatedTitle: 'Relaterade verktyg',
  },
  no: {
    title: 'Strengverktoy', description: 'Klippe, snu, kapitalisere, telle ord/tegn/linjer og mer.',
    inputLabel: 'Inndatakst', outputLabel: 'Utdata', statsLabel: 'Statistikk',
    chars: 'Tegn', words: 'Ord', lines: 'Linjer', bytes: 'Byte',
    trim: 'Klippe', reverse: 'Snu', uppercase: 'STORE BOKSTAVER', lowercase: 'sma bokstaver',
    titleCase: 'Titelstil', camelCase: 'camelCase', snakeCase: 'snake_case', kebabCase: 'kebab-case',
    removeSpaces: 'Fjern ekstra mellomrom', removeNewlines: 'Fjern linjeskift', removeDuplicates: 'Fjern duplikater',
    sortLines: 'Sorter A-A', sortLinesDesc: 'Sorter A-A omvendt', shuffleLines: 'Bland',
    countChars: 'Tell tegn', reverseLines: 'Snu linjer', addLineNumbers: 'Legg til linjenumre',
    findLabel: 'Finn', replaceLabel: 'Erstatt', replaceBtn: 'Erstatt alle', regexMode: 'Regex-modus',
    clear: 'Toemme', loadSample: 'Last eksempel', copyOutput: 'Kopier utdata',
    introTitle: 'Gratis strengverktoy', introText: 'Et komplett sett med tekstmanipuleringsverktoy for utviklere.',
    tipTitle: 'Tips tekstmanipulering', tip1: 'camelCase for JavaScript-variabler', tip2: 'snake_case for Python-variabler',
    tip3: 'kebab-case for CSS-klasser', tip4: 'Titelstil for overskrifter', tip5: 'Fjern duplikater for aa rydde opp i logger',
    faqTitle: 'Vanlige spoersmaal', faq1q: 'Forskjell mellom camelCase og PascalCase?', faq1a: 'camelCase starter med liten bokstav, PascalCase hvert ord med stor.',
    faq2q: 'Hvordan fungerer finn og erstatt?', faq2a: 'Skriv inn soketerm og erstatning, klikk Erstatt alle. Regex-modus tilgjengelig.',
    faq3q: 'Hva maler byte-tellingen?', faq3a: 'Byte i UTF-8. ASCII = 1 byte, europeiske tegn = 2 byte.',
    faq4q: 'Hvordan fungerer fjern duplikater?', faq4a: 'Beholder forste forekomst av hver unik linje.',
    faq5q: 'Kan jeg behandle store tekster?', faq5a: 'Ja, alt i nettleseren. Svart store tekster kan vaere trege.',
    relatedTitle: 'Relaterte verktoy',
  },
  ja: {
    title: '文字列ユーティリティ', description: 'トリム、逆順、大文字化、単語/文字/行数カウント、検索/置換など。',
    inputLabel: '入力テキスト', outputLabel: '出力', statsLabel: '統計情報',
    chars: '文字', words: '単語', lines: '行', bytes: 'バイト',
    trim: 'トリム', reverse: '逆順', uppercase: '大文字', lowercase: '小文字',
    titleCase: 'タイトル形式', camelCase: 'camelCase', snakeCase: 'snake_case', kebabCase: 'kebab-case',
    removeSpaces: '余分スペース削除', removeNewlines: '改行削除', removeDuplicates: '重複行削除',
    sortLines: '行 A-Z 順', sortLinesDesc: '行 Z-A 順', shuffleLines: 'ランダム',
    countChars: '文字数カウント', reverseLines: '行を逆順', addLineNumbers: '行番号追加',
    findLabel: '検索', replaceLabel: '置換', replaceBtn: 'すべて置換', regexMode: '正規表現モード',
    clear: 'クリア', loadSample: 'サンプル読込', copyOutput: '出力コピー',
    introTitle: '無料文字列ユーティリティ', introText: '開発者向けの包括的な文字列操作ツールセット。',
    tipTitle: '文字列操作のヒント', tip1: 'JavaScriptの変数には camelCase を使用', tip2: 'Pythonの変数には snake_case を使用',
    tip3: 'CSSクラスには kebab-case を使用', tip4: 'タイトルには Title Case を使用', tip5: '重複行の削除でログファイルをクリーンアップ',
    faqTitle: 'よくある質問', faq1q: 'camelCase と PascalCase の違いは？', faq1a: 'camelCase は小文字で始まり、PascalCase は各単語の頭が大文字です。',
    faq2q: '検索置換はどう機能しますか？', faq2a: '検索語と置換語を入力してすべて置換をクリック。正規表現モードも利用可能。',
    faq3q: 'バイト数は何を測りますか？', faq3a: 'UTF-8 でのバイト数。ASCII = 1バイト、日本語 = 3バイト。',
    faq4q: '重複行の削除はどう機能しますか？', faq4a: '各ユニーク行の最初の出現のみを保持します。',
    faq5q: '大きなテキストを処理できますか？', faq5a: 'はい、すべてブラウザ内で処理されます。非常に大きなテキストは遅くなる場合があります。',
    relatedTitle: '関連ツール',
  },
  ko: {
    title: '문자열 유틸리티', description: '자르기, 뒤집기, 대문자화, 단어/문자/줄 수 세기, 찾기/바꾸기 등.',
    inputLabel: '입력 텍스트', outputLabel: '출력', statsLabel: '통계',
    chars: '문자', words: '단어', lines: '줄', bytes: '바이트',
    trim: '공백 제거', reverse: '뒤집기', uppercase: '대문자', lowercase: '소문자',
    titleCase: '제목 형식', camelCase: 'camelCase', snakeCase: 'snake_case', kebabCase: 'kebab-case',
    removeSpaces: '여분 공백 제거', removeNewlines: '줄바꿈 제거', removeDuplicates: '중복 줄 제거',
    sortLines: '줄 A-Z 정렬', sortLinesDesc: '줄 Z-A 정렬', shuffleLines: '섞기',
    countChars: '문자 세기', reverseLines: '줄 뒤집기', addLineNumbers: '줄 번호 추가',
    findLabel: '찾기', replaceLabel: '바꾸기', replaceBtn: '모두 바꾸기', regexMode: '정규식 모드',
    clear: '지우기', loadSample: '샘플 로드', copyOutput: '출력 복사',
    introTitle: '무료 문자열 유틸리티', introText: '개발자를 위한 포괄적인 문자열 조작 도구 세트.',
    tipTitle: '문자열 조작 팁', tip1: 'JavaScript 변수에는 camelCase 사용', tip2: 'Python 변수에는 snake_case 사용',
    tip3: 'CSS 클래스에는 kebab-case 사용', tip4: '제목에는 Title Case 사용', tip5: '중복 줄 제거로 로그 파일 정리',
    faqTitle: '자주 묻는 질문', faq1q: 'camelCase와 PascalCase의 차이점?', faq1a: 'camelCase는 소문자로 시작하고, PascalCase는 모든 단어가 대문자로 시작합니다.',
    faq2q: '찾기 및 바꾸기는 어떻게 작동하나요?', faq2a: '검색어와 바꿀 내용을 입력하고 모두 바꾸기를 클릭. 정규식 모드도 가능.',
    faq3q: '바이트 수는 무엇을 측정하나요?', faq3a: 'UTF-8의 바이트 수. ASCII = 1바이트, 한글 = 3바이트.',
    faq4q: '중복 줄 제거는 어떻게 작동하나요?', faq4a: '각 고유 줄의 첫 번째 출현만 유지합니다.',
    faq5q: '큰 텍스트를 처리할 수 있나요?', faq5a: '네, 모든 처리가 브라우저에서 이루어집니다. 매우 큰 텍스트는 느릴 수 있습니다.',
    relatedTitle: '관련 도구',
  },
  id: {
    title: 'Utilitas String', description: 'Potong, balik, kapitalisasi, hitung kata/karakter/baris, cari/ganti dan lebih.',
    inputLabel: 'Teks masukan', outputLabel: 'Keluaran', statsLabel: 'Statistik',
    chars: 'Karakter', words: 'Kata', lines: 'Baris', bytes: 'Byte',
    trim: 'Potong', reverse: 'Balik', uppercase: 'HURUF BESAR', lowercase: 'huruf kecil',
    titleCase: 'Judul', camelCase: 'camelCase', snakeCase: 'snake_case', kebabCase: 'kebab-case',
    removeSpaces: 'Hapus spasi ekstra', removeNewlines: 'Hapus baris baru', removeDuplicates: 'Hapus duplikat',
    sortLines: 'Urutkan A-Z', sortLinesDesc: 'Urutkan Z-A', shuffleLines: 'Acak',
    countChars: 'Hitung karakter', reverseLines: 'Balikkan baris', addLineNumbers: 'Tambah nomor baris',
    findLabel: 'Cari', replaceLabel: 'Ganti', replaceBtn: 'Ganti semua', regexMode: 'Mode regex',
    clear: 'Hapus', loadSample: 'Muat contoh', copyOutput: 'Salin keluaran',
    introTitle: 'Utilitas string gratis', introText: 'Seperangkat alat manipulasi string yang komprehensif untuk pengembang.',
    tipTitle: 'Tips manipulasi string', tip1: 'camelCase untuk variabel JavaScript', tip2: 'snake_case untuk variabel Python',
    tip3: 'kebab-case untuk kelas CSS', tip4: 'Title Case untuk judul', tip5: 'Hapus duplikat untuk membersihkan log',
    faqTitle: 'Pertanyaan yang Sering Diajukan', faq1q: 'Perbedaan camelCase vs PascalCase?', faq1a: 'camelCase mulai huruf kecil, PascalCase setiap kata huruf besar.',
    faq2q: 'Bagaimana cari dan ganti bekerja?', faq2a: 'Masukkan istilah dan pengganti, klik Ganti semua. Mode regex tersedia.',
    faq3q: 'Apa yang diukur hitungan byte?', faq3a: 'Byte dalam UTF-8. ASCII = 1 byte, karakter Eropa = 2 byte.',
    faq4q: 'Bagaimana hapus duplikat bekerja?', faq4a: 'Menyimpan kemunculan pertama setiap baris unik.',
    faq5q: 'Bisakah saya memproses teks besar?', faq5a: 'Ya, semua diproses di browser. Teks sangat besar mungkin lambat.',
    relatedTitle: 'Alat terkait',
  },
  th: {
    title: 'ยูทิลิตี้สตริง', description: 'ตัด พลิก ทำตัวพิมพ์ใหญ่ นับคำ/อักขระ/บรรทัด ค้นหา/แทนที่ และอื่นๆ',
    inputLabel: 'ข้อความอินพุต', outputLabel: 'ผลลัพธ์', statsLabel: 'สถิติ',
    chars: 'อักขระ', words: 'คำ', lines: 'บรรทัด', bytes: 'ไบต์',
    trim: 'ตัดช่องว่าง', reverse: 'พลิก', uppercase: 'ตัวพิมพ์ใหญ่', lowercase: 'ตัวพิมพ์เล็ก',
    titleCase: 'รูปแบบชื่อเรื่อง', camelCase: 'camelCase', snakeCase: 'snake_case', kebabCase: 'kebab-case',
    removeSpaces: 'ลบช่องว่างพิเศษ', removeNewlines: 'ลบบรรทัดใหม่', removeDuplicates: 'ลบบรรทัดซ้ำ',
    sortLines: 'เรียง A-Z', sortLinesDesc: 'เรียง Z-A', shuffleLines: 'สุ่ม',
    countChars: 'นับอักขระ', reverseLines: 'พลิกบรรทัด', addLineNumbers: 'เพิ่มเลขบรรทัด',
    findLabel: 'ค้นหา', replaceLabel: 'แทนที่', replaceBtn: 'แทนที่ทั้งหมด', regexMode: 'โหมด Regex',
    clear: 'ล้าง', loadSample: 'โหลดตัวอย่าง', copyOutput: 'คัดลอกผลลัพธ์',
    introTitle: 'ยูทิลิตี้สตริงฟรี', introText: 'ชุดเครื่องมือจัดการสตริงที่ครอบคลุมสำหรับนักพัฒนา',
    tipTitle: 'เคล็ดลับการจัดการสตริง', tip1: 'ใช้ camelCase สำหรับตัวแปร JavaScript', tip2: 'ใช้ snake_case สำหรับตัวแปร Python',
    tip3: 'ใช้ kebab-case สำหรับคลาส CSS', tip4: 'ใช้ Title Case สำหรับหัวข้อ', tip5: 'ลบบรรทัดซ้ำเพื่อล้างไฟล์บันทึก',
    faqTitle: 'คำถามที่พบบ่อย', faq1q: 'ความแตกต่างระหว่าง camelCase และ PascalCase?', faq1a: 'camelCase เริ่มด้วยตัวพิมพ์เล็ก PascalCase ทุกคำขึ้นต้นด้วยตัวพิมพ์ใหญ่',
    faq2q: 'การค้นหาและแทนที่ทำงานอย่างไร?', faq2a: 'ป้อนคำค้นหาและแทนที่ คลิกแทนที่ทั้งหมด รองรับโหมด Regex',
    faq3q: 'จำนวนไบต์วัดอะไร?', faq3a: 'ไบต์ใน UTF-8 ASCII = 1 ไบต์ อักขระยุโรป = 2 ไบต์ ภาษาไทย = 3 ไบต์',
    faq4q: 'การลบบรรทัดซ้ำทำงานอย่างไร?', faq4a: 'เก็บบรรทัดแรกของแต่ละบรรทัดที่ไม่ซ้ำกัน',
    faq5q: 'สามารถประมวลผลข้อความขนาดใหญ่ได้ไหม?', faq5a: 'ได้ ประมวลผลทั้งหมดในเบราว์เซอร์ ข้อความขนาดใหญ่มากอาจช้า',
    relatedTitle: 'เครื่องมือที่เกี่ยวข้อง',
  },
};

const SAMPLE_TEXT = `Hello World, this is a sample text.
  It has leading spaces and trailing spaces.  
hello world, this is a sample text.
Duplicate Line
Duplicate Line
Another unique line.
yet another line here`;

function toTitleCase(str: string): string {
  return str.replace(/\w\S*/g, w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase());
}
function toCamelCase(str: string): string {
  return str.replace(/[-_\s]+(.)/g, (_, c) => c.toUpperCase()).replace(/^(.)/, c => c.toLowerCase());
}
function toSnakeCase(str: string): string {
  return str.replace(/([A-Z])/g, '_$1').replace(/[-\s]+/g, '_').replace(/^_/, '').toLowerCase();
}
function toKebabCase(str: string): string {
  return str.replace(/([A-Z])/g, '-$1').replace(/[_\s]+/g, '-').replace(/^-/, '').toLowerCase();
}

export default function StringUtilities() {
  const { lang } = useLang();
  const t = ui[lang] || ui.en;
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [findStr, setFindStr] = useState('');
  const [replaceStr, setReplaceStr] = useState('');
  const [regexMode, setRegexMode] = useState(false);

  const stats = useMemo(() => {
    const text = input;
    return {
      chars: text.length,
      words: text.trim() === '' ? 0 : text.trim().split(/\s+/).length,
      lines: text === '' ? 0 : text.split('\n').length,
      bytes: new TextEncoder().encode(text).length,
    };
  }, [input]);

  const apply = (fn: (s: string) => string) => { setOutput(fn(input)); };

  const handleReplace = () => {
    if (!findStr) return;
    try {
      const pattern = regexMode ? new RegExp(findStr, 'g') : findStr;
      setOutput(input.split(pattern).join(replaceStr));
    } catch { setOutput(input); }
  };

  const ops = [
    { label: t.trim, fn: (s: string) => s.trim() },
    { label: t.reverse, fn: (s: string) => s.split('').reverse().join('') },
    { label: t.uppercase, fn: (s: string) => s.toUpperCase() },
    { label: t.lowercase, fn: (s: string) => s.toLowerCase() },
    { label: t.titleCase, fn: toTitleCase },
    { label: t.camelCase, fn: toCamelCase },
    { label: t.snakeCase, fn: toSnakeCase },
    { label: t.kebabCase, fn: toKebabCase },
    { label: t.removeSpaces, fn: (s: string) => s.replace(/[ \t]+/g, ' ').replace(/^ /gm, '').replace(/ $/gm, '') },
    { label: t.removeNewlines, fn: (s: string) => s.replace(/\n+/g, ' ') },
    { label: t.removeDuplicates, fn: (s: string) => [...new Set(s.split('\n'))].join('\n') },
    { label: t.sortLines, fn: (s: string) => s.split('\n').sort().join('\n') },
    { label: t.sortLinesDesc, fn: (s: string) => s.split('\n').sort().reverse().join('\n') },
    { label: t.reverseLines, fn: (s: string) => s.split('\n').reverse().join('\n') },
    { label: t.addLineNumbers, fn: (s: string) => s.split('\n').map((l, i) => `${i + 1}. ${l}`).join('\n') },
  ];

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
    <ToolLayout title={t.title} description={t.description} toolId="string-utilities">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        <button onClick={() => { setInput(SAMPLE_TEXT); setOutput(''); }} className="btn btn-secondary">{t.loadSample}</button>
        <button onClick={() => { setInput(''); setOutput(''); }} className="btn btn-secondary">{t.clear}</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
        <div>
          <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 6 }}>{t.inputLabel}</label>
          <textarea value={input} onChange={e => setInput(e.target.value)} style={{ minHeight: 180, fontFamily: 'monospace', fontSize: 13 }} placeholder="Enter text here..." />
          <div style={{ display: 'flex', gap: 16, marginTop: 8, fontSize: 12, color: 'var(--text-secondary)' }}>
            <span>{t.chars}: <strong>{stats.chars}</strong></span>
            <span>{t.words}: <strong>{stats.words}</strong></span>
            <span>{t.lines}: <strong>{stats.lines}</strong></span>
            <span>{t.bytes}: <strong>{stats.bytes}</strong></span>
          </div>
        </div>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
            <label style={{ fontSize: 13, fontWeight: 600 }}>{t.outputLabel}</label>
            <CopyButton text={output} />
          </div>
          <textarea value={output} readOnly style={{ minHeight: 180, fontFamily: 'monospace', fontSize: 13, background: 'var(--bg-input)' }} />
        </div>
      </div>

      <div style={{ marginBottom: 16 }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 12 }}>
          {ops.map(op => (
            <button key={op.label} onClick={() => apply(op.fn)} className="btn btn-secondary" style={{ fontSize: 12, padding: '5px 10px' }}>
              {op.label}
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
          <input value={findStr} onChange={e => setFindStr(e.target.value)} placeholder={t.findLabel} style={{ width: 160, fontSize: 13 }} />
          <input value={replaceStr} onChange={e => setReplaceStr(e.target.value)} placeholder={t.replaceLabel} style={{ width: 160, fontSize: 13 }} />
          <button onClick={handleReplace} className="btn btn-primary" style={{ fontSize: 12 }}>{t.replaceBtn}</button>
          <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, cursor: 'pointer' }}>
            <input type="checkbox" checked={regexMode} onChange={e => setRegexMode(e.target.checked)} />
            {t.regexMode}
          </label>
        </div>
      </div>

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
            { href: `/${lang}/tools/escape-unescape`, label: 'Escape/Unescape' },
            { href: `/${lang}/tools/markdown-link-checker`, label: 'Markdown Link Checker' },
            { href: `/${lang}/tools/yaml-validator-online`, label: 'YAML Validator' },
            { href: `/${lang}/tools/json-formatter`, label: 'JSON Formatter' },
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
